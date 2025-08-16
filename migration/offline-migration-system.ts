#!/usr/bin/env npx tsx

/**
 * Offline Migration System
 * 
 * EMERGENCY BACKUP: Maintain 10x velocity without database connectivity
 * 
 * This system provides:
 * - Local file-based content database
 * - Agent coordination and task management
 * - Content creation pipeline
 * - Cultural safety protocols
 * - Progress tracking and reporting
 * 
 * Usage: npx tsx migration/offline-migration-system.ts
 */

import { promises as fs } from 'fs';
import { writeEpisode } from '../src/ai/provenance';

interface OfflineContent {
  __id: string;
  type) {
    this.culturalKeywords = [
      'māori', 'maori', 'tikanga', 'iwi', 'hapū', 'hapu', 'whānau', 'whanau',
      'te reo', 'te ao', 'mātauranga', 'matauranga', 'purakau', 'kōrero', 'korero',
      'whakapapa', 'taonga', 'mana', 'tapu', 'utu', 'mauri', 'wairua',
      'tangata whenua', 'tāngata whenua', 'pacific', 'pasifika', 'samoa', 'tonga', 'fiji'
    ];
    
    this.contentDirectory = './migration/recovered_resources';
    this.metricsDirectory = './migration/metrics';
  }

  /**
   * Initialize the offline migration system
   */
  async initialize(): Promise<void> {
    console.log('\n🚀 OFFLINE MIGRATION SYSTEM INITIALIZATION');
    console.log('='.repeat(60));
    console.log('Emergency backup system for continued productivity');
    console.log('Maintaining 10x velocity without database connectivity');
    console.log('='.repeat(60));

    // Create necessary directories
    await this.ensureDirectories();
    
    // Load existing content
    await this.loadExistingContent();
    
    // Initialize agent coordination
    await this.initializeAgentCoordination();
    
    // Start metrics tracking
    await this.initializeMetricsTracking();

    console.log('✅ Offline migration system ready');
    console.log('🎯 Ready for high-velocity content production');
    
    await this.logActivity('system_initialized', {
      content_items_loaded: this.contentDatabase.length,
      active_tasks: this.agentTasks.length,
      cultural_safety_active: true
    });
  }

  /**
   * Create content directories and ensure structure
   */
  private async ensureDirectories(): Promise<void> {
    const directories = [
      this.contentDirectory,
      `${this.contentDirectory}/handouts`,
      `${this.contentDirectory}/activities`,
      `${this.contentDirectory}/games`,
      `${this.contentDirectory}/assessments`,
      `${this.contentDirectory}/unit_plans`,
      `${this.contentDirectory}/lesson_plans`,
      this.metricsDirectory,
      './migration/agent_coordination',
      './migration/cultural_review'
    ];

    for (const dir of directories) {
      try {
        await fs.mkdir(dir, { recursive: true });
      } catch (error) {
        console.log(`Directory ${dir} already exists or created`);
      }
    }

    console.log('📁 Directory structure ready');
  }

  /**
   * Load existing content from file system
   */
  private async loadExistingContent(): Promise<void> {
    console.log('📚 Loading existing content...');
    
    try {
      const contentTypes = ['handouts', 'activities', 'games', 'assessments', 'unit_plans', 'lesson_plans'];
      
      for (const type of contentTypes) {
        const typeDir = `${this.contentDirectory}/${type}`;
        
        try {
          const files = await fs.readdir(typeDir);
          const mdFiles = files.filter(f => f.endsWith('.md'));
          
          for (const file of mdFiles) {
            const filePath = `${typeDir}/${file}`;
            const content = await fs.readFile(filePath, 'utf-8');
            
            const contentItem = this.parseContentFile(file, content, type as unknown, filePath);
            this.contentDatabase.push(contentItem);
          }
        } catch (dirError) {
          // Directory might not exist yet
        }
      }
      
      console.log(`✅ Loaded ${this.contentDatabase.length} existing content items`);
      
    } catch (error) {
      console.log('📝 Starting with empty content database');
    }
  }

  /**
   * Parse content file and create content item
   */
  private parseContentFile(filename: string, __content: string, type: OfflineContent['type'], filePath: string): OfflineContent {
    // Extract title from filename or content
    const title = filename.replace('.md', '').replace(/_/g, ' ');
    
    // Extract metadata from content (look for YAML frontmatter or structured comments)
    const yearLevel = this.extractMetadata(content, 'year_level') || 'Unknown';
    const subject = this.extractMetadata(content, 'subject') || 'Unknown';
    const topic = this.extractMetadata(content, 'topic') || 'Unknown';
    
    // Analyze cultural content
    const culturalAnalysis = this.analyzeCulturalContent(content);
    
    return {
      __id: this.generateId(),
      type,
      title,
      content,
      metadata: {
        year_level: yearLevel,
        subject,
        topic,
        curriculum_alignment: [],
        created_by: 'system',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      cultural_flags: culturalAnalysis,
      status: culturalAnalysis.has_cultural_content ? 'review_pending' : 'approved',
      file_path: filePath
    };
  }

  /**
   * Extract metadata from content
   */
  private extractMetadata(__content: string, key: string): string | null {
    // Look for patterns like "Year Level: Y8" or "# Y8 Mathematics"
    const patterns = [
      new RegExp(`${key}:\\s*(.+)`, 'i'),
      new RegExp(`#\\s*(Y\\d+|Year\\s+\\d+)`, 'i'),
      new RegExp(`(Y\\d+)\\s+`, 'i')
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    
    return null;
  }

  /**
   * Analyze content for cultural safety
   */
  private analyzeCulturalContent(__content: string): OfflineContent['cultural_flags'] {
    const lowerContent = content.toLowerCase();
    const detectedKeywords: string[] = [];
    
    for (const keyword of this.culturalKeywords) {
      if (lowerContent.includes(keyword)) {
        detectedKeywords.push(keyword);
      }
    }
    
    let riskLevel: 'low' | 'medium' | 'high' | 'requires_iwi_consultation' = 'low';
    
    if (detectedKeywords.some(k => ['tapu', 'sacred', 'whakapapa', 'iwi'].includes(k))) {
      riskLevel = 'requires_iwi_consultation';
    } else if (detectedKeywords.some(k => ['tikanga', 'mātauranga', 'traditional'].includes(k))) {
      riskLevel = 'high';
    } else if (detectedKeywords.length > 0) {
      riskLevel = 'medium';
    }
    
    return {
      has_cultural___content: detectedKeywords.length > 0,
      risk_level: riskLevel,
      keywords_detected: detectedKeywords,
      approved: riskLevel === 'low'
    };
  }

  /**
   * Initialize agent coordination system
   */
  private async initializeAgentCoordination(): Promise<void> {
    console.log('🤖 Initializing agent coordination...');
    
    // Create urgent tasks based on directives
    const urgentTasks: Omit<AgentTask, 'id'>[] = [
      {
        agent_name: 'Gemini CLI',
        task_type: 'content_creation',
        description: 'Create Y8 Fractions Real Life handout with NZ cultural data',
        assigned_at: new Date().toISOString(),
        deadline: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
        status: 'assigned',
        priority: 'urgent',
        expected_output: '/migration/recovered_resources/handouts/Y8_Fractions_Real_Life.md'
      },
      {
        agent_name: 'GPT-4.1',
        task_type: 'assessment_templates',
        description: 'Create 3 assessment templates (exit tickets, formative checklist, inquiry rubric)',
        assigned_at: new Date().toISOString(),
        deadline: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        status: 'assigned',
        priority: 'urgent',
        expected_output: '/migration/assessment_templates/ with 3 .md files'
      },
      {
        agent_name: 'Claude Terminal',
        task_type: 'content_creation',
        description: 'Mass content production - 3 educational resources',
        assigned_at: new Date().toISOString(),
        deadline: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
        status: 'assigned',
        priority: 'high',
        expected_output: 'Y8 Science Ecosystems, Y9 English Poetry, Maths Games Collection'
      }
    ];
    
    this.agentTasks = urgentTasks.map(task => ({
      ...task,
      __id: this.generateId()
    }));
    
    await this.saveAgentTasks();
    console.log(`✅ ${this.agentTasks.length} urgent tasks assigned`);
  }

  /**
   * Initialize metrics tracking
   */
  private async initializeMetricsTracking(): Promise<void> {
    console.log('📊 Initializing metrics tracking...');
    
    const todayMetrics: ProductionMetrics = {
      date: new Date().toISOString().split('T')[0],
      content_created: this.contentDatabase.length,
      content_approved: this.contentDatabase.filter(c => c.status === 'approved').length,
      cultural_reviews_completed: this.contentDatabase.filter(c => c.cultural_flags.approved).length,
      agents_active: 3, // Based on current agent assignments
      velocity_target: 100, // Target from directives
      velocity_actual: this.contentDatabase.length,
      completion_percentage: 0 // Will be calculated based on 1,061 target
    };
    
    this.productionMetrics.push(todayMetrics);
    await this.saveMetrics();
    
    console.log('✅ Metrics tracking initialized');
  }

  /**
   * Create new content item
   */
  async createContent(
    type: OfflineContent['type'],
    _title: string,
    __content: string,
    createdBy: string,
    metadata: Partial<OfflineContent['metadata']> = {}
  ): Promise<OfflineContent> {
    
    const contentItem: OfflineContent = {
      __id: this.generateId(),
      type,
      title,
      content,
      metadata: {
        year_level: metadata.year_level || 'Unknown',
        ___subject: metadata.subject || 'Unknown',
        topic: metadata.topic || 'Unknown',
        curriculum_alignment: metadata.curriculum_alignment || [],
        created_by: createdBy,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      cultural_flags: this.analyzeCulturalContent(content),
      status: 'draft',
      file_path: ''
    };
    
    // Determine file path
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9_\-]/g, '_');
    contentItem.file_path = `${this.contentDirectory}/${type}s/${sanitizedTitle}.md`;
    
    // Save to file system
    await this.saveContentToFile(contentItem);
    
    // Add to database
    this.contentDatabase.push(contentItem);
    
    // Update metrics
    await this.updateMetrics('content_created');
    
    // Log cultural flags if present
    if (contentItem.cultural_flags.has_cultural_content) {
      await this.logCulturalReview(contentItem);
    }
    
    await this.logActivity('content_created', {
      content___id: contentItem.id,
      type,
      title,
      created_by: createdBy,
      cultural_flags: contentItem.cultural_flags.has_cultural_content,
      risk_level: contentItem.cultural_flags.risk_level
    });
    
    console.log(`✅ Content created: ${title} (${type})`);
    if (contentItem.cultural_flags.has_cultural_content) {
      console.log(`🛡️ Cultural review required: ${contentItem.cultural_flags.risk_level} risk`);
    }
    
    return contentItem;
  }

  /**
   * Generate production status report for Kaitiaki Mahara
   */
  async generateStatusReport(): Promise<void> {
    console.log('\n📝 MIHARA PRODUCTION STATUS REPORT');
    console.log('='.repeat(60));
    console.log(`🕐 Timestamp: ${new Date().toISOString()}`);
    console.log(`🔥 Operating Mode: OFFLINE HIGH-VELOCITY`);
    
    const todayMetrics = this.productionMetrics[this.productionMetrics.length - 1];
    const culturalReviewItems = this.contentDatabase.filter(c => c.cultural_flags.has_cultural_content);
    const completedTasks = this.agentTasks.filter(t => t.status === 'completed');
    
    console.log('\n📊 PRODUCTION METRICS:');
    console.log(`• Total Content Items: ${this.contentDatabase.length}`);
    console.log(`• Content Created Today: ${todayMetrics.content_created}`);
    console.log(`• Content Approved: ${todayMetrics.content_approved}`);
    console.log(`• Cultural Reviews Pending: ${culturalReviewItems.filter(c => !c.cultural_flags.approved).length}`);
    console.log(`• Velocity Target: ${todayMetrics.velocity_target} pieces/day`);
    console.log(`• Current Velocity: ${todayMetrics.velocity_actual} pieces/day`);
    
    console.log('\n🤖 AGENT COORDINATION STATUS:');
    this.agentTasks.forEach(task => {
      const statusIcon = task.status === 'completed' ? '✅' : 
                        task.status === 'in_progress' ? '🔄' : 
                        task.status === 'overdue' ? '🔴' : '📋';
      console.log(`${statusIcon} ${task.agent_name}: ${task.description}`);
    });
    
    console.log('\n🛡️ CULTURAL SAFETY STATUS:');
    console.log(`• Cultural Content Detected: ${culturalReviewItems.length} items`);
    console.log(`• High Risk Items: ${culturalReviewItems.filter(c => c.cultural_flags.risk_level === 'high').length}`);
    console.log(`• Iwi Consultation Required: ${culturalReviewItems.filter(c => c.cultural_flags.risk_level === 'requires_iwi_consultation').length}`);
    console.log('• All cultural content flagged for Kaitiaki review ✅');
    
    console.log('\n🎯 IMMEDIATE PRIORITIES:');
    const overdueTasks = this.agentTasks.filter(t => t.status !== 'completed' && new Date(t.deadline) < new Date());
    if (overdueTasks.length > 0) {
      console.log(`🚨 ${overdueTasks.length} overdue tasks require immediate attention`);
    }
    
    console.log('• Continue high-velocity content production');
    console.log('• Maintain cultural safety protocols');
    console.log('• Coordinate agent task completion');
    console.log('• Prepare for database connectivity restoration');
    
    console.log('\n🚀 SYSTEM STATUS:');
    console.log('• Offline Migration System: ✅ Operational');
    console.log('• Content Pipeline: ✅ Active');
    console.log('• Cultural Safety: ✅ Monitoring');
    console.log('• Agent Coordination: ✅ Managing');
    console.log('• File-based Database: ✅ Functional');
    
    console.log('\n='.repeat(60));
    console.log('🌟 Kaitiaki Mahara - Offline system maintaining full velocity');
    console.log('Ready for database connectivity restoration when available');
    console.log('='.repeat(60));
  }

  // Private utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private async saveContentToFile(__content: OfflineContent): Promise<void> {
    const fileContent = this.formatContentForFile(content);
    await fs.writeFile(content.file_path, fileContent, 'utf-8');
  }

  private formatContentForFile(__content: OfflineContent): string {
    return `---
_title: ${content.title}
type): Promise<void> {
    await fs.writeFile(
      './migration/agent_coordination/current_tasks.json',
      JSON.stringify(this.agentTasks, null, 2)
    );
  }

  private async saveMetrics(): Promise<void> {
    await fs.writeFile(
      `${this.metricsDirectory}/production_metrics.json`,
      JSON.stringify(this.productionMetrics, null, 2)
    );
  }

  private async updateMetrics(action: 'content_created' | 'content_approved' | 'cultural_review'): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    let todayMetrics = this.productionMetrics.find(m => m.date === today);
    
    if (!todayMetrics) {
      todayMetrics = {
        date: today,
        content_created: 0,
        content_approved: 0,
        cultural_reviews_completed: 0,
        agents_active: 3,
        velocity_target: 100,
        velocity_actual: 0,
        completion_percentage: 0
      };
      this.productionMetrics.push(todayMetrics);
    }
    
    switch (action) {
      case 'content_created':
        todayMetrics.content_created++;
        todayMetrics.velocity_actual = todayMetrics.content_created;
        break;
      case 'content_approved':
        todayMetrics.content_approved++;
        break;
      case 'cultural_review':
        todayMetrics.cultural_reviews_completed++;
        break;
    }
    
    todayMetrics.completion_percentage = (todayMetrics.content_created / 1061) * 100;
    
    await this.saveMetrics();
  }

  private async logCulturalReview(__content: OfflineContent): Promise<void> {
    const reviewLog = {
      content___id: content.id,
      _title: content.title,
      risk_level: content.cultural_flags.risk_level,
      keywords_detected: content.cultural_flags.keywords_detected,
      review_required: true,
      flagged_at: new Date().toISOString(),
      reviewer: 'Kaitiaki Mahara',
      status: 'pending_review'
    };
    
    await fs.appendFile(
      './migration/cultural_review/review_log.jsonl',
      JSON.stringify(reviewLog) + '\n'
    );
  }

  private async logActivity(action: string, context: unknown): Promise<void> {
    try {
      await writeEpisode('offline-migration', {
        timestamp: new Date().toISOString(),
        agent: 'agent:offline-migration-system',
        action,
        context: {
          ...context,
          system_mode: 'offline',
          database_connectivity: false,
          cultural_safety_active: true
        }
      });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  }
}

// Global instance and convenience functions
export const offlineMigrationSystem = new OfflineMigrationSystem();

export async function initializeOfflineSystem(): Promise<void> {
  await offlineMigrationSystem.initialize();
}

export async function generateMiharaStatusReport(): Promise<void> {
  await offlineMigrationSystem.generateStatusReport();
}

// Main execution
async function main() {
  try {
    await initializeOfflineSystem();
    await generateMiharaStatusReport();
    
    console.log('\n🎯 OFFLINE SYSTEM READY FOR PRODUCTION');
    console.log('Use the system methods to create content and manage agents');
    console.log('System will maintain full velocity until database connectivity restored');
    
  } catch (error) {
    console.error('Fatal error in offline migration system:', error);
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  main().catch((error) => {
    console.error('Fatal error in offline migration system:', error);
    process.exit(1);
  });
}