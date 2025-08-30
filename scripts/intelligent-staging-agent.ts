#!/usr/bin/env tsx
/**
 * 🧠 INTELLIGENT STAGING AGENT - Kaitiaki Rangatira Git Lifecycle Management
 * Smart auto-staging system that understands production vs temporary files
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, readFileSync } from 'fs';

const execAsync = promisify(exec);

interface StagingRule {
  pattern: RegExp;
  action: 'stage' | 'ignore' | 'review' | 'delete';
  reason: string;
  category: 'production' | 'documentation' | 'temporary' | 'infrastructure';
}

class IntelligentStagingAgent {
  private stagingRules: StagingRule[] = [
    // PRODUCTION - Always stage
    { pattern: /^src\//, action: 'stage', reason: 'Production source code', category: 'production' },
    { pattern: /^(package\.json|tsconfig\.|vite\.config\.)/, action: 'stage', reason: 'Build configuration', category: 'infrastructure' },
    { pattern: /^scripts\/(agent-qa-monitor|pre-deploy-health-check)\.ts$/, action: 'stage', reason: 'Production monitoring tools', category: 'infrastructure' },
    
    // DOCUMENTATION - Review first
    { pattern: /^(OVERSEER_QUICKSTART|KAITIAKI_RANGATIRA_MANIFEST|PRODUCTION_PIPELINE_SUCCESS)\.md$/, action: 'stage', reason: 'Essential documentation', category: 'documentation' },
    { pattern: /^SESSION_STRATEGIC_PLANS\.md$/, action: 'stage', reason: 'Strategic planning docs', category: 'documentation' },
    
    // TEMPORARY/REPORTS - Handle intelligently
    { pattern: /.*_REPORT\.md$/, action: 'delete', reason: 'Temporary report file', category: 'temporary' },
    { pattern: /.*_STATUS.*\.md$/, action: 'delete', reason: 'Temporary status file', category: 'temporary' },
    { pattern: /^archive\//, action: 'stage', reason: 'Archived files for history', category: 'infrastructure' },
    
    // INFRASTRUCTURE - Review
    { pattern: /^scripts\/intelligent-staging-agent\.ts$/, action: 'stage', reason: 'This staging system itself', category: 'infrastructure' },
    { pattern: /^\.env$/, action: 'ignore', reason: 'Environment variables - security risk', category: 'infrastructure' },
    
    // NEW COMPONENTS - Review
    { pattern: /^src\/components\/.*\.tsx?$/, action: 'review', reason: 'New component needs review', category: 'production' },
    { pattern: /^src\/utils\/.*\.ts$/, action: 'review', reason: 'New utility needs review', category: 'production' }
  ];

  async analyzeGitStatus(): Promise<{
    modified: string[];
    deleted: string[];
    untracked: string[];
  }> {
    const { stdout } = await execAsync('git status --porcelain');
    
    const files = {
      modified: [],
      deleted: [],
      untracked: []
    } as any;

    for (const line of stdout.split('\n')) {
      if (!line.trim()) continue;
      
      const status = line.substring(0, 2);
      const filepath = line.substring(3);
      
      if (status.includes('M')) files.modified.push(filepath);
      else if (status.includes('D')) files.deleted.push(filepath);
      else if (status.includes('??')) files.untracked.push(filepath);
    }
    
    return files;
  }

  categorizeFile(filepath: string): { action: string; reason: string; category: string } {
    for (const rule of this.stagingRules) {
      if (rule.pattern.test(filepath)) {
        return {
          action: rule.action,
          reason: rule.reason,
          category: rule.category
        };
      }
    }
    
    // Default: review unknown files
    return {
      action: 'review',
      reason: 'Unknown file type - needs human review',
      category: 'unknown'
    };
  }

  async executeStaging(): Promise<void> {
    console.log('🧠 INTELLIGENT STAGING AGENT - Kaitiaki Rangatira');
    console.log('='.repeat(60));
    
    const files = await this.analyzeGitStatus();
    const allFiles = [...files.modified, ...files.deleted, ...files.untracked];
    
    console.log(`📊 Found ${allFiles.length} unstaged changes:`);
    console.log(`  Modified: ${files.modified.length}`);
    console.log(`  Deleted: ${files.deleted.length}`);  
    console.log(`  Untracked: ${files.untracked.length}`);
    console.log('');

    const actions = {
      stage: [] as string[],
      ignore: [] as string[],
      review: [] as string[],
      delete: [] as string[]
    };

    // Categorize all files
    for (const filepath of allFiles) {
      const { action, reason, category } = this.categorizeFile(filepath);
      actions[action as keyof typeof actions].push(filepath);
      
      const emoji = {
        stage: '✅',
        ignore: '⚠️',
        review: '🔍', 
        delete: '🗑️'
      }[action as keyof typeof actions];
      
      console.log(`${emoji} ${action.toUpperCase()}: ${filepath}`);
      console.log(`   → ${reason} (${category})`);
    }

    console.log('');
    console.log('📋 STAGING SUMMARY:');
    console.log(`  Will Stage: ${actions.stage.length} files`);
    console.log(`  Will Ignore: ${actions.ignore.length} files`);
    console.log(`  Need Review: ${actions.review.length} files`);
    console.log(`  Will Delete: ${actions.delete.length} files`);
    console.log('');

    // Execute staging actions
    if (actions.stage.length > 0) {
      console.log('✅ STAGING PRODUCTION FILES...');
      for (const file of actions.stage) {
        try {
          await execAsync(`git add "${file}"`);
          console.log(`  ✓ Staged: ${file}`);
        } catch (error) {
          console.log(`  ✗ Failed to stage: ${file}`);
        }
      }
      console.log('');
    }

    // Handle deletions (confirm they're properly staged as deletions)
    if (actions.delete.length > 0) {
      console.log('🗑️ HANDLING DELETED FILES...');
      for (const file of actions.delete) {
        try {
          await execAsync(`git add "${file}"`); // Stage the deletion
          console.log(`  ✓ Staged deletion: ${file}`);
        } catch (error) {
          console.log(`  ✗ Failed to stage deletion: ${file}`);
        }
      }
      console.log('');
    }

    // Report review items
    if (actions.review.length > 0) {
      console.log('🔍 FILES NEEDING HUMAN REVIEW:');
      for (const file of actions.review) {
        const { reason } = this.categorizeFile(file);
        console.log(`  📋 ${file} - ${reason}`);
      }
      console.log('');
      console.log('💡 Review these files and stage manually if appropriate:');
      console.log('   git add <filename>  # to stage after review');
      console.log('');
    }

    // Report ignored items  
    if (actions.ignore.length > 0) {
      console.log('⚠️ FILES BEING IGNORED:');
      actions.ignore.forEach(file => {
        const { reason } = this.categorizeFile(file);
        console.log(`  🚫 ${file} - ${reason}`);
      });
      console.log('');
    }

    // Final git status
    console.log('📊 FINAL GIT STATUS:');
    const { stdout: finalStatus } = await execAsync('git status --short');
    console.log(finalStatus || '  (No remaining changes)');
  }

  async generateCommitMessage(): Promise<string> {
    const { stdout } = await execAsync('git diff --staged --name-only');
    const stagedFiles = stdout.trim().split('\n').filter(f => f);
    
    const categories = {
      production: [],
      documentation: [],
      infrastructure: [],
      cleanup: []
    } as any;

    for (const file of stagedFiles) {
      const { category } = this.categorizeFile(file);
      if (category === 'temporary') {
        categories.cleanup.push(file);
      } else {
        categories[category as keyof typeof categories]?.push(file);
      }
    }

    let message = '🤖 INTELLIGENT STAGING: ';
    const parts = [];

    if (categories.production.length > 0) {
      parts.push(`Enhanced production components (${categories.production.length} files)`);
    }
    if (categories.infrastructure.length > 0) {
      parts.push(`Infrastructure improvements (${categories.infrastructure.length} files)`);
    }
    if (categories.documentation.length > 0) {
      parts.push(`Documentation updates (${categories.documentation.length} files)`);  
    }
    if (categories.cleanup.length > 0) {
      parts.push(`Repository cleanup (${categories.cleanup.length} files)`);
    }

    message += parts.join(', ');

    message += '\n\n🧠 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>';

    return message;
  }
}

async function main() {
  const agent = new IntelligentStagingAgent();
  await agent.executeStaging();
  
  const commitMsg = await agent.generateCommitMessage();
  console.log('💬 SUGGESTED COMMIT MESSAGE:');
  console.log('─'.repeat(50));
  console.log(commitMsg);
  console.log('─'.repeat(50));
  console.log('');
  console.log('🚀 To commit with this message:');
  console.log(`git commit -m "${commitMsg.replace(/\n/g, '\\n')}"`);
}

// Start if this is the main module
main().catch(console.error);

export { IntelligentStagingAgent };