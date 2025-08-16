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

// Te Kete Ako Database Credentials (provided by Kaitiaki Mahara)
const TEKETE_SUPABASE_URL = 'https://nlgldaqtubrrlcqddppbq.supabase.co';
const TEKETE_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM';

export interface ContentMigration {
  source_id: string;
  content_type: 'handout' | 'activity' | 'game' | 'assessment' | 'unit_plan' | 'lesson_plan';
  original_data: unknown;
  migrated_data: unknown;
  cultural_flags: string[];
  migration_status: 'pending' | 'processing' | 'completed' | 'needs_review';
  created_at?: string;
  updated_at?: string;
}

export interface CulturalContentFlag {
  content_id: string;
  flag_type: 'maori_content' | 'pacific_content' | 'traditional_knowledge' | 'iwi_specific' | 'sacred_content';
  risk_level: 'low' | 'medium' | 'high' | 'requires_iwi_consultation';
  keywords_detected: string[];
  reviewer_required: boolean;
  kaitiaki_approved: boolean;
  review_notes?: string;
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
  broken_links: number;
  placeholder_content: number;
  last_updated: string;
}

/**
 * Te Kete Ako Database Client with Cultural Safety Protocols
 */
export class TeKeteAkoClient {
  private client: SupabaseClient;
  private culturalKeywords: string[];

  constructor() {
    this.client = createClient(TEKETE_SUPABASE_URL, TEKETE_SUPABASE_KEY);
    
    // Cultural content detection keywords
    this.culturalKeywords = [
      'māori', 'maori', 'tikanga', 'iwi', 'hapū', 'hapu', 'whānau', 'whanau',
      'te reo', 'te ao', 'mātauranga', 'matauranga', 'purakau', 'kōrero', 'korero',
      'whakapapa', 'taonga', 'mana', 'tapu', 'utu', 'mauri', 'wairua',
      'tangata whenua', 'tāngata whenua', 'pacific', 'pasifika', 'samoa', 'tonga', 'fiji'
    ];
  }

  /**
   * Test database connection and health
   */
  async testConnection(): Promise<{ success: boolean; message: string; metadata?: unknown }> {
    try {
      console.log('🔍 Testing Te Kete Ako database connection...');
      
      const { data, error } = await this.client
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .limit(5);

      if (error) {
        await this.logActivity('connection_test_failed', { error: error.message });
        return {
          success: false,
          message: `Connection failed: ${error.message}`
        };
      }

      await this.logActivity('connection_test_success', { 
        tables_found: data?.length || 0,
        sample_tables: data?.map(t => t.table_name).slice(0, 3)
      });

      return {
        success: true,
        message: `✅ Connection successful! Found ${data?.length || 0} tables`,
        metadata: { tables: data }
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logActivity('connection_test_error', { error: errorMessage });
      
      return {
        success: false,
        message: `Connection error: ${errorMessage}`
      };
    }
  }

  /**
   * Analyze database schema structure
   */
  async analyzeDatabaseSchema(): Promise<DatabaseSchema[]> {
    console.log('📊 Analyzing Te Kete Ako database schema...');

    try {
      const { data, error } = await this.client
        .from('information_schema.columns')
        .select('table_name, column_name, data_type, is_nullable, column_default')
        .eq('table_schema', 'public')
        .order('table_name')
        .order('ordinal_position');

      if (error) {
        throw new Error(`Schema analysis failed: ${error.message}`);
      }

      await this.logActivity('schema_analysis_complete', {
        tables_analyzed: [...new Set(data?.map(col => col.table_name))].length,
        total_columns: data?.length || 0
      });

      return data as DatabaseSchema[];

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logActivity('schema_analysis_failed', { error: errorMessage });
      throw error;
    }
  }

  /**
   * Create comprehensive content inventory
   */
  async createContentInventory(): Promise<ContentInventory> {
    console.log('📋 Creating comprehensive content inventory...');

    try {
      // Try common table names for content
      const contentTables = ['content_items', 'resources', 'units', 'lessons', 'activities'];
      let totalRecords = 0;
      const contentTypes: Record<string, number> = {};
      let culturalContentCount = 0;

      for (const tableName of contentTables) {
        try {
          const { data, error } = await this.client
            .from(tableName)
            .select('id, title, content_type, content, status')
            .limit(1000);

          if (!error && data) {
            totalRecords += data.length;
            
            // Analyze content types and cultural content
            for (const item of data) {
              const type = item.content_type || 'unknown';
              contentTypes[type] = (contentTypes[type] || 0) + 1;

              // Check for cultural content
              const textContent = `${item.title || ''} ${item.content || ''}`.toLowerCase();
              if (this.culturalKeywords.some(keyword => textContent.includes(keyword))) {
                culturalContentCount++;
              }
            }
          }
        } catch (tableError) {
          // Table might not exist, continue with next one
          console.log(`Table ${tableName} not accessible, continuing...`);
        }
      }

      const inventory: ContentInventory = {
        total_records: totalRecords,
        content_types: contentTypes,
        cultural_content_count: culturalContentCount,
        broken_links: 0, // Will be analyzed in separate scan
        placeholder_content: 0, // Will be analyzed in separate scan
        last_updated: new Date().toISOString()
      };

      await this.logActivity('content_inventory_complete', inventory);

      return inventory;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logActivity('content_inventory_failed', { error: errorMessage });
      throw error;
    }
  }

  /**
   * Identify and flag cultural content for review
   */
  async scanForCulturalContent(tableName: string, limit: number = 100): Promise<CulturalContentFlag[]> {
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
        const textContent = `${item.title || ''} ${item.content || ''} ${item.description || ''}`.toLowerCase();
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

          if (detectedKeywords.some(k => ['tapu', 'sacred', 'whakapapa', 'iwi'].includes(k))) {
            riskLevel = 'requires_iwi_consultation';
            flagType = 'sacred_content';
          } else if (detectedKeywords.some(k => ['tikanga', 'mātauranga', 'traditional'].includes(k))) {
            riskLevel = 'high';
            flagType = 'traditional_knowledge';
          } else if (detectedKeywords.some(k => ['pacific', 'pasifika', 'samoa', 'tonga'].includes(k))) {
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
            review_notes: `Auto-detected cultural content - requires Kaitiaki Mahara review`
          });
        }
      }

      await this.logActivity('cultural_content_scan', {
        table_scanned: tableName,
        items_scanned: data?.length || 0,
        cultural_flags_created: flags.length,
        high_risk_items: flags.filter(f => f.risk_level === 'high' || f.risk_level === 'requires_iwi_consultation').length
      });

      return flags;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logActivity('cultural_scan_failed', { table: tableName, error: errorMessage });
      throw error;
    }
  }

  /**
   * Log activity for provenance tracking
   */
  private async logActivity(action: string, context: unknown): Promise<void> {
    try {
      await writeEpisode('te-kete-ako-migration', {
        timestamp: new Date().toISOString(),
        agent: 'agent:tekete-ako-client',
        action,
        context: {
          ...context,
          database_url: TEKETE_SUPABASE_URL,
          cultural_safety_active: true
        }
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