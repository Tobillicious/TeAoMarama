/**
 * Supabase Migration Client - Te Kete Ako to TeAoMarama
 * 
 * Kaitiaki Mahara Cultural Safety Integration
 * Assists with database migration and cultural content validation
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Te Kete Ako Database Credentials
const TEKETE_SUPABASE_URL = 'https://nlgldaqtubrrlcqddppbq.supabase.co';
const TEKETE_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM';

// Content Types for Migration
export interface ContentItem {
  id: string;
  title: string;
  content_type: 'handout' | 'activity' | 'game' | 'assessment' | 'unit_plan' | 'lesson_plan';
  content: string;
  status: 'active' | 'orphaned' | 'archived';
  cultural_flags: string[];
  created_at: string;
  updated_at: string;
}

// Cultural Safety Flags
export interface CulturalContentFlag {
  content_id: string;
  flag_type: 'maori_content' | 'pacific_content' | 'traditional_knowledge' | 'cultural_sensitive';
  risk_level: 'low' | 'medium' | 'high' | 'requires_iwi_consultation';
  reviewer_required: boolean;
  kaitiaki_approved: boolean;
  review_notes?: string;
}

// Migration Status Tracking
export interface MigrationStatus {
  content_id: string;
  source_database: 'te_kete_ako';
  destination_database: 'teaomarama';
  migration_status: 'pending' | 'processing' | 'completed' | 'needs_review' | 'failed';
  cultural_review_status: 'not_required' | 'pending_review' | 'approved' | 'rejected';
  migrated_at?: string;
  reviewed_by?: string;
  errors?: string[];
}

/**
 * Supabase Migration Client for Cultural Safety Integration
 */
export class MiharaMigrationClient {
  private teKeteClient: SupabaseClient;
  private migrationLog: MigrationStatus[] = [];
  
  constructor() {
    this.teKeteClient = createClient(TEKETE_SUPABASE_URL, TEKETE_SUPABASE_KEY);
    console.log('🔗 Mihara Migration Client initialized for Te Kete Ako database');
  }

  /**
   * Test database connection and verify access
   */
  async testConnection(): Promise<{ success: boolean; message: string; tables?: string[] }> {
    try {
      console.log('🔍 Testing Te Kete Ako database connection...');
      
      // Query for table structure
      const { data: tables, error } = await this.teKeteClient
        .rpc('get_schema_tables')
        .select();
      
      if (error) {
        // Fallback: try to query a known table
        const { data: testQuery, error: testError } = await this.teKeteClient
          .from('content_items')
          .select('count(*)')
          .limit(1);
        
        if (testError) {
          throw testError;
        }
        
        return {
          success: true,
          message: '✅ Database connection successful (limited schema access)',
          tables: ['content_items'] // Known table
        };
      }
      
      return {
        success: true,
        message: `✅ Database connection successful. Found ${tables?.length || 0} tables.`,
        tables: tables?.map((t: any) => t.table_name) || []
      };
      
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      return {
        success: false,
        message: `❌ Database connection failed: ${error}`,
        tables: []
      };
    }
  }

  /**
   * Get content inventory with cultural safety classification
   */
  async getContentInventory(limit: number = 100): Promise<{ 
    content: ContentItem[]; 
    culturalFlags: CulturalContentFlag[];
    summary: { total: number; orphaned: number; cultural: number; }
  }> {
    try {
      console.log(`📊 Retrieving content inventory (limit: ${limit})...`);
      
      // Query content items
      const { data: content, error } = await this.teKeteClient
        .from('content_items')
        .select('*')
        .limit(limit);
      
      if (error) throw error;
      
      // Identify cultural content
      const culturalFlags: CulturalContentFlag[] = [];
      let culturalCount = 0;
      let orphanedCount = 0;
      
      for (const item of content || []) {
        // Check if orphaned
        if (item.status === 'orphaned') {
          orphanedCount++;
        }
        
        // Check for cultural content
        const culturalFlag = this.identifyCulturalContent(item);
        if (culturalFlag) {
          culturalFlags.push(culturalFlag);
          culturalCount++;
        }
      }
      
      console.log(`✅ Retrieved ${content?.length || 0} content items`);
      console.log(`🔍 Found ${orphanedCount} orphaned items`);
      console.log(`🌿 Flagged ${culturalCount} items for cultural review`);
      
      return {
        content: content || [],
        culturalFlags,
        summary: {
          total: content?.length || 0,
          orphaned: orphanedCount,
          cultural: culturalCount
        }
      };
      
    } catch (error) {
      console.error('❌ Content inventory failed:', error);
      throw error;
    }
  }

  /**
   * Identify cultural content requiring special handling
   */
  private identifyCulturalContent(item: ContentItem): CulturalContentFlag | null {
    const title = item.title?.toLowerCase() || '';
    const content = item.content?.toLowerCase() || '';
    
    // Cultural keywords that require flagging
    const maoriKeywords = ['māori', 'maori', 'iwi', 'hapū', 'whānau', 'mātauranga', 'tikanga', 'te reo', 'tangata whenua'];
    const pacificKeywords = ['pacific', 'samoa', 'tonga', 'fiji', 'cook islands'];
    const traditionalKeywords = ['traditional knowledge', 'indigenous', 'cultural practice', 'ceremony'];
    
    // Check for Māori content
    if (maoriKeywords.some(keyword => title.includes(keyword) || content.includes(keyword))) {
      return {
        content_id: item.id,
        flag_type: 'maori_content',
        risk_level: 'high',
        reviewer_required: true,
        kaitiaki_approved: false,
        review_notes: 'Contains Te Ao Māori elements - requires cultural validation'
      };
    }
    
    // Check for Pacific content
    if (pacificKeywords.some(keyword => title.includes(keyword) || content.includes(keyword))) {
      return {
        content_id: item.id,
        flag_type: 'pacific_content',
        risk_level: 'medium',
        reviewer_required: true,
        kaitiaki_approved: false,
        review_notes: 'Contains Pacific cultural elements - requires cultural validation'
      };
    }
    
    // Check for traditional knowledge
    if (traditionalKeywords.some(keyword => title.includes(keyword) || content.includes(keyword))) {
      return {
        content_id: item.id,
        flag_type: 'traditional_knowledge',
        risk_level: 'requires_iwi_consultation',
        reviewer_required: true,
        kaitiaki_approved: false,
        review_notes: 'Contains traditional knowledge - requires iwi consultation'
      };
    }
    
    return null;
  }

  /**
   * Get orphaned resources specifically for migration
   */
  async getOrphanedResources(): Promise<ContentItem[]> {
    try {
      console.log('🔍 Searching for orphaned resources...');
      
      const { data, error } = await this.teKeteClient
        .from('content_items')
        .select('*')
        .eq('status', 'orphaned')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      console.log(`📋 Found ${data?.length || 0} orphaned resources ready for migration`);
      return data || [];
      
    } catch (error) {
      console.error('❌ Failed to retrieve orphaned resources:', error);
      throw error;
    }
  }

  /**
   * Create migration plan with cultural safety priorities
   */
  async createMigrationPlan(): Promise<{
    lowRisk: ContentItem[];
    mediumRisk: ContentItem[];
    highRisk: ContentItem[];
    totalItems: number;
  }> {
    try {
      console.log('📋 Creating migration plan with cultural safety priorities...');
      
      const { content, culturalFlags } = await this.getContentInventory(1000);
      
      const lowRisk: ContentItem[] = [];
      const mediumRisk: ContentItem[] = [];
      const highRisk: ContentItem[] = [];
      
      for (const item of content) {
        const culturalFlag = culturalFlags.find(flag => flag.content_id === item.id);
        
        if (!culturalFlag) {
          lowRisk.push(item);
        } else if (culturalFlag.risk_level === 'low' || culturalFlag.risk_level === 'medium') {
          mediumRisk.push(item);
        } else {
          highRisk.push(item);
        }
      }
      
      console.log(`📊 Migration plan created:`);
      console.log(`   🟢 Low risk: ${lowRisk.length} items (mathematics, basic science)`);
      console.log(`   🟡 Medium risk: ${mediumRisk.length} items (cultural contexts, non-Māori)`);
      console.log(`   🔴 High risk: ${highRisk.length} items (mātauranga Māori, traditional knowledge)`);
      
      return {
        lowRisk,
        mediumRisk,
        highRisk,
        totalItems: content.length
      };
      
    } catch (error) {
      console.error('❌ Migration plan creation failed:', error);
      throw error;
    }
  }

  /**
   * Generate cultural safety report for Kaitiaki Mahara
   */
  async generateCulturalSafetyReport(): Promise<string> {
    try {
      console.log('📄 Generating cultural safety report...');
      
      const { culturalFlags, summary } = await this.getContentInventory(500);
      
      const report = `# CULTURAL SAFETY REPORT - TE KETE AKO MIGRATION
*Kaitiaki Mahara Database Analysis*

## 📊 CONTENT OVERVIEW
- **Total Items Analyzed**: ${summary.total}
- **Orphaned Resources**: ${summary.orphaned}
- **Cultural Content Flagged**: ${summary.cultural}

## 🛡️ CULTURAL CONTENT BREAKDOWN
${culturalFlags.map(flag => `
### ${flag.flag_type.toUpperCase()}
- **Content ID**: ${flag.content_id}
- **Risk Level**: ${flag.risk_level}
- **Reviewer Required**: ${flag.reviewer_required ? 'YES' : 'NO'}
- **Status**: ${flag.kaitiaki_approved ? 'APPROVED' : 'PENDING REVIEW'}
- **Notes**: ${flag.review_notes || 'None'}
`).join('\n')}

## 🎯 RECOMMENDATIONS
1. **Immediate Action**: Review ${culturalFlags.filter(f => f.risk_level === 'high').length} high-risk items
2. **Cultural Consultation**: ${culturalFlags.filter(f => f.risk_level === 'requires_iwi_consultation').length} items need iwi consultation  
3. **Priority Migration**: Start with ${summary.total - summary.cultural} non-cultural items
4. **Safety Protocol**: No automated migration of cultural content

## 🔒 CULTURAL SAFETY STATUS
**ALL FLAGGED CONTENT REQUIRES HUMAN REVIEW**
**NO AUTO-APPROVAL FOR CULTURAL MATERIALS**

*Report generated: ${new Date().toISOString()}*
*Database: Te Kete Ako Migration Analysis*`;

      return report;
      
    } catch (error) {
      console.error('❌ Cultural safety report generation failed:', error);
      throw error;
    }
  }
}

// Convenience functions for Mihara assistance
export async function testTeKeteConnection(): Promise<void> {
  const client = new MiharaMigrationClient();
  const result = await client.testConnection();
  console.log(result.message);
  if (result.tables) {
    console.log('📋 Available tables:', result.tables.join(', '));
  }
}

export async function generateMigrationReport(): Promise<string> {
  const client = new MiharaMigrationClient();
  return await client.generateCulturalSafetyReport();
}

export async function createMigrationPlan(): Promise<void> {
  const client = new MiharaMigrationClient();
  const plan = await client.createMigrationPlan();
  
  console.log('\n🎯 MIHARA MIGRATION PLAN READY');
  console.log('═══════════════════════════════════');
  console.log(`📊 Total items to migrate: ${plan.totalItems}`);
  console.log(`🟢 Phase 1 (Low Risk): ${plan.lowRisk.length} items`);
  console.log(`🟡 Phase 2 (Medium Risk): ${plan.mediumRisk.length} items`);
  console.log(`🔴 Phase 3 (High Risk): ${plan.highRisk.length} items`);
  console.log('═══════════════════════════════════');
}

// Main client exported above as class declaration

/**
 * Quick CLI execution for testing
 */
if (require.main === module) {
  console.log('🌟 Mihara Database Integration Assistant');
  console.log('Testing Te Kete Ako connection...\n');
  
  testTeKeteConnection()
    .then(() => createMigrationPlan())
    .catch(error => {
      console.error('❌ Migration assistance failed:', error);
      process.exit(1);
    });
}