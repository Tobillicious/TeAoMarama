/**
 * Te Kete Ako Database Client
 *
 * This client provides secure access to the Te Kete Ako Supabase database
 * for the Great Migration project. It includes cultural safety protocols
 * and bulk migration capabilities.
 *
 * Kaitiaki Mahara Oversight: All cultural content automatically flagged for review
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { writeEpisode } from '../ai/provenance';

// Te Kete Ako Database Credentials (from environment; do not hardcode)
function getEnv(key: string): string | undefined {
  // Vite provides import.meta.env in the browser/build. In Node, use process.env.
  const viteEnv =
    (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env) ||
    undefined;
  return viteEnv?.[key] ?? process.env[key];
}

const TEKETE_SUPABASE_URL = getEnv('VITE_TEKETE_SUPABASE_URL') || '';
const TEKETE_SUPABASE_KEY = getEnv('VITE_TEKETE_SUPABASE_ANON_KEY') || '';

if (!TEKETE_SUPABASE_URL || !TEKETE_SUPABASE_KEY) {
  console.warn(
    'TeKeteAkoClient: Supabase credentials are missing. Set VITE_TEKETE_SUPABASE_URL and VITE_TEKETE_SUPABASE_ANON_KEY.',
  );
}

export interface ContentMigration {
  source____id: string;
  content_types: Record<string, number>;
  cultural_content_count: number;
  broken_links: number;
  placeholder____content: number;
  last_updated: string;
}

export interface DatabaseSchema {
  table_name: string;
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
}

export interface ContentInventory {
  total_records: number;
  content_types: Record<string, number>;
  cultural_content_count: number;
  tables_analyzed: string[];
  potential_links: string[];
  placeholder_content: number;
  last_updated: string;
}

export interface MigrationResult {
  success: boolean;
  migrated_count: number;
  failed_count: number;
  cultural_flags: string[];
  ___errors: string[];
}

// Flags for cultural content detection used across migration tooling
export interface CulturalContentFlag {
  content_id: string;
  flag_type: 'maori_content' | 'pacific_content' | 'traditional_knowledge' | 'sacred_content';
  risk_level: 'low' | 'medium' | 'high' | 'requires_iwi_consultation';
  reviewer_required: boolean;
  kaitiaki_approved: boolean;
  review_notes?: string;
  keywords_detected?: string[];
}

export class TeKeteAkoClient {
  private client: SupabaseClient;
  private culturalKeywords: string[];

  constructor() {
    this.client = createClient(TEKETE_SUPABASE_URL, TEKETE_SUPABASE_KEY);

    // Cultural content detection keywords
    this.culturalKeywords = [
      'māori',
      'maori',
      'tikanga',
      'iwi',
      'hapū',
      'hapu',
      'whānau',
      'whanau',
      'te reo',
      'te ao',
      'mātauranga',
      'matauranga',
      'purakau',
      'kōrero',
      'korero',
      'whakapapa',
      'taonga',
      'mana',
      'tapu',
      'utu',
      'mauri',
      'wairua',
      'tangata whenua',
      'tāngata whenua',
      'pacific',
      'pasifika',
      'samoa',
      'tonga',
      'fiji',
    ];
  }

  /**
   * Test database connection and health
   *
   * @returns A structured result indicating connection success and metadata when available.
   */
  async testConnection(): Promise<{ success: boolean; message: string; metadata?: unknown }> {
    try {
      console.log('🔍 Testing Te Kete Ako database connection...');

      // Try a simple query to test connection
      const { error } = await this.client.from('resources').select('count').limit(1);

      if (error) {
        // Try alternative table names
        const { error: altError } = await this.client
          .from('content_items')
          .select('count')
          .limit(1);

        if (altError) {
          // Try one more common table name
          const { error: finalError } = await this.client
            .from('documents')
            .select('count')
            .limit(1);

          if (finalError) {
            throw new Error(
              `Database accessible but no known tables found. Tried: resources, content_items, documents`,
            );
          }
        }
      }

      await this.logActivity('connection_test_success', {
        database_url: TEKETE_SUPABASE_URL,
        cultural_safety_active: true,
      });

      return {
        success: true,
        message: '✅ Database connection successful',
        metadata: {
          tables: ['resources', 'content_items', 'documents'], // Known table names
          connection_type: 'supabase',
          cultural_safety: 'active',
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logActivity('connection_test_failed', {
        ___error: errorMessage,
        database_url: TEKETE_SUPABASE_URL,
        cultural_safety_active: true,
      });

      return {
        success: false,
        message: `Connection failed: ${errorMessage}`,
      };
    }
  }

  /**
   * Analyze database schema structure
   *
   * Attempts to sample common tables to infer column names and basic data types.
   * @returns An array describing discovered table columns.
   */
  async analyzeDatabaseSchema(): Promise<DatabaseSchema[]> {
    const schema: DatabaseSchema[] = [];

    // Try to analyze common table names
    const commonTables = [
      'resources',
      'content_items',
      'documents',
      'lessons',
      'activities',
      'assessments',
    ];

    for (const tableName of commonTables) {
      try {
        // Try to get a sample record to understand structure
        const { data, error } = await this.client.from(tableName).select('*').limit(1);

        if (!error && data && data.length > 0) {
          // Extract column names from the first record
          const columns = Object.keys(data[0]);
          columns.forEach((columnName) => {
            schema.push({
              table_name: tableName,
              column_name: columnName,
              data_type: typeof data[0][columnName],
              is_nullable: 'YES', // Default assumption
              column_default: null, // Default assumption
            });
          });
        }
      } catch (error) {
        // Table doesn't exist or isn't accessible, continue to next
        console.log(`Table ${tableName} not accessible: ${error}`);
      }
    }

    return schema;
  }

  /**
   * Create comprehensive content inventory
   *
   * Aggregates counts across common tables and estimates cultural content via keyword sampling.
   * @returns A `ContentInventory` with totals, per-table counts, and cultural content estimate.
   */
  async createContentInventory(): Promise<ContentInventory> {
    const inventory: ContentInventory = {
      total_records: 0,
      content_types: {},
      cultural_content_count: 0,
      placeholder_content: 0,
      tables_analyzed: [],
      potential_links: [],
      last_updated: new Date().toISOString(),
    };

    // Try to analyze common table names
    const commonTables = [
      'resources',
      'content_items',
      'documents',
      'lessons',
      'activities',
      'assessments',
    ];

    for (const tableName of commonTables) {
      try {
        // Count total records in table
        const { count, error } = await this.client
          .from(tableName)
          .select('*', { count: 'exact', head: true });

        if (!error && count !== null) {
          inventory.total_records += count;
          inventory.content_types[tableName] = count;
          inventory.tables_analyzed.push(tableName);

          // Check for cultural content
          if (count > 0) {
            const { data: sampleData } = await this.client.from(tableName).select('*').limit(10);

            if (sampleData) {
              const culturalCount = sampleData.filter((item) =>
                this.culturalKeywords.some((keyword) =>
                  JSON.stringify(item).toLowerCase().includes(keyword.toLowerCase()),
                ),
              ).length;

              // Estimate cultural content based on sample
              const culturalEstimate = Math.round((culturalCount / sampleData.length) * count);
              inventory.cultural_content_count += culturalEstimate;
            }
          }
        }
      } catch (error) {
        console.log(`Table ${tableName} not accessible: ${error}`);
      }
    }

    return inventory;
  }

  /**
   * Identify and flag cultural content for review
   *
   * @param tableName Table to scan (must include id/title/content/description/tags when available)
   * @param limit Max items to scan (default 100)
   * @returns Array of `CulturalContentFlag` entries requiring reviewer attention.
   */
  async scanForCulturalContent(
    tableName: string,
    limit: number = 100,
  ): Promise<CulturalContentFlag[]> {
    console.log(`🛡️ Scanning ${tableName} for cultural content requiring review...`);

    try {
      const { data, error } = await this.client
        .from(tableName)
        .select('id, title, content, description, tags')
        .limit(limit);

      if (error) {
        throw new Error(`Cultural content scan failed: ${error.message}`);
      }

      const flags: CulturalContentFlag[] = [];

      for (const item of data || []) {
        const textContent = `${item.title || ''} ${item.content || ''} ${
          item.description || ''
        }`.toLowerCase();
        const detectedKeywords: string[] = [];

        // Check for cultural keywords
        for (const keyword of this.culturalKeywords) {
          if (textContent.includes(keyword)) {
            detectedKeywords.push(keyword);
          }
        }

        if (detectedKeywords.length > 0) {
          // Determine risk level based on keywords
          let riskLevel: 'low' | 'medium' | 'high' | 'requires_iwi_consultation' = 'low';
          let flagType: CulturalContentFlag['flag_type'] = 'maori_content';

          if (detectedKeywords.some((k) => ['tapu', 'sacred', 'whakapapa', 'iwi'].includes(k))) {
            riskLevel = 'requires_iwi_consultation';
            flagType = 'sacred_content';
          } else if (
            detectedKeywords.some((k) => ['tikanga', 'mātauranga', 'traditional'].includes(k))
          ) {
            riskLevel = 'high';
            flagType = 'traditional_knowledge';
          } else if (
            detectedKeywords.some((k) => ['pacific', 'pasifika', 'samoa', 'tonga'].includes(k))
          ) {
            riskLevel = 'medium';
            flagType = 'pacific_content';
          }

          flags.push({
            content_id: item.id,
            flag_type: flagType,
            risk_level: riskLevel,
            keywords_detected: detectedKeywords,
            reviewer_required: true,
            kaitiaki_approved: false,
            review_notes: `Auto-detected cultural content - requires Kaitiaki Mahara review`,
          });
        }
      }

      await this.logActivity('cultural_content_scan', {
        table_scanned: tableName,
        items_scanned: data?.length || 0,
        cultural_flags_created: flags.length,
        high_risk_items: flags.filter(
          (f) => f.risk_level === 'high' || f.risk_level === 'requires_iwi_consultation',
        ).length,
      });

      return flags;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logActivity('cultural_scan_failed', { table: tableName, ___error: errorMessage });
      throw error;
    }
  }

  /**
   * Log activity for provenance tracking
   */
  private async logActivity(action: string, context: Record<string, unknown>): Promise<void> {
    try {
      await writeEpisode('te-kete-ako-migration', {
        timestamp: new Date().toISOString(),
        agent: 'agent:tekete-ako-client',
        action,
        context: {
          ...context,
          database_url: TEKETE_SUPABASE_URL,
          cultural_safety_active: true,
        },
      });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  }

  /**
   * Get the raw Supabase client for advanced operations
   */
  getClient(): SupabaseClient {
    return this.client;
  }
}

/**
 * Global Te Kete Ako client instance
 */
export const teKeteAkoClient = new TeKeteAkoClient();

/**
 * Quick connection test utility
 */
export async function testTeKeteAkoConnection(): Promise<boolean> {
  const result = await teKeteAkoClient.testConnection();
  console.log(result.message);
  return result.success;
}
