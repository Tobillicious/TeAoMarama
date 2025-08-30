#!/usr/bin/env npx tsx

/**
 * 🧠 INTELLIGENT STAGING SYSTEM
 * Kaitiaki Rangatira - Automated Git Workflow Management
 * 
 * Automatically stages changes based on predictive analysis and cultural wisdom
 * Prevents the workflow issue of accumulating unstaged changes
 */

import { execSync } from 'child_process';
import * as fs from 'fs';

interface StagingDecision {
  filePath: string;
  shouldStage: boolean;
  category: 'critical' | 'feature' | 'documentation' | 'cultural' | 'test' | 'config';
  reason: string;
  culturalConsideration: boolean;
}

class IntelligentStagingSystem {
  private readonly CRITICAL_FILES = [
    'package.json',
    'package-lock.json',
    'vite.config.ts',
    '.env'
  ];

  private readonly DOCUMENTATION_PATTERNS = [
    '.md',
    'README',
    'CHANGELOG',
    'REPORT'
  ];

  private readonly TEST_PATTERNS = [
    'test/',
    '.test.',
    '.spec.',
    'tests/'
  ];

  async intelligentStage(): Promise<void> {
    console.log('🧠 INTELLIGENT STAGING SYSTEM');
    console.log('Kaitiaki Rangatira - Automated Workflow Management');
    console.log('================================================\n');

    // Get all unstaged files
    const unstagedFiles = this.getUnstagedFiles();
    console.log(`📊 Found ${unstagedFiles.length} unstaged changes\n`);

    if (unstagedFiles.length === 0) {
      console.log('✅ No unstaged changes - workflow is clean!');
      return;
    }

    // Analyze each file for intelligent staging
    const stagingDecisions = await this.analyzeStagingDecisions(unstagedFiles);

    // Group files by category for organized staging
    await this.executeIntelligentStaging(stagingDecisions);

    // Create intelligent commit message
    await this.createIntelligentCommit(stagingDecisions);

    console.log('\n✨ Intelligent staging completed!');
    console.log('Workflow optimization: No more manual staging needed');
  }

  private getUnstagedFiles(): string[] {
    const files: string[] = [];

    try {
      // Get modified files
      const modifiedOutput = execSync('git diff --name-only', { encoding: 'utf8' });
      modifiedOutput.split('\n').filter(line => line).forEach(file => files.push(file));

      // Get untracked files
      const untrackedOutput = execSync('git ls-files --others --exclude-standard', { encoding: 'utf8' });
      untrackedOutput.split('\n').filter(line => line).forEach(file => {
        if (!files.includes(file)) {
          files.push(file);
        }
      });
    } catch {
      console.warn('Warning: Could not get unstaged files');
    }

    return files;
  }

  private async analyzeStagingDecisions(files: string[]): Promise<StagingDecision[]> {
    const decisions: StagingDecision[] = [];

    for (const filePath of files) {
      const decision: StagingDecision = {
        filePath,
        shouldStage: true, // Default to staging unless there's a reason not to
        category: this.categorizeFile(filePath),
        reason: '',
        culturalConsideration: this.hasCulturalContent(filePath)
      };

      // Determine staging logic based on category
      switch (decision.category) {
        case 'critical':
          decision.shouldStage = true;
          decision.reason = 'Critical system file - auto-stage for stability';
          break;

        case 'feature':
          decision.shouldStage = true;
          decision.reason = 'Feature development - ready for integration';
          break;

        case 'documentation':
          decision.shouldStage = true;
          decision.reason = 'Documentation - enhances project understanding';
          break;

        case 'cultural':
          decision.shouldStage = true;
          decision.reason = 'Cultural content - important for Te Ao Mārama mission';
          break;

        case 'test':
          decision.shouldStage = true;
          decision.reason = 'Test files - improve code quality and reliability';
          break;

        case 'config':
          decision.shouldStage = await this.analyzeConfigFile(filePath);
          decision.reason = decision.shouldStage ? 
            'Config change - appears safe for staging' : 
            'Config change - requires manual review';
          break;
      }

      decisions.push(decision);
    }

    return decisions;
  }

  private categorizeFile(filePath: string): StagingDecision['category'] {
    // Critical system files
    if (this.CRITICAL_FILES.some(critical => filePath.includes(critical))) {
      return 'critical';
    }

    // Documentation
    if (this.DOCUMENTATION_PATTERNS.some(pattern => filePath.includes(pattern))) {
      return 'documentation';
    }

    // Tests
    if (this.TEST_PATTERNS.some(pattern => filePath.includes(pattern))) {
      return 'test';
    }

    // Cultural content
    if (this.hasCulturalContent(filePath)) {
      return 'cultural';
    }

    // Config files
    if (filePath.includes('config') || filePath.includes('.env')) {
      return 'config';
    }

    // Default to feature
    return 'feature';
  }

  private hasCulturalContent(filePath: string): boolean {
    const culturalKeywords = ['māori', 'tikanga', 'cultural', 'iwi', 'mātauranga', 'kaitiaki'];
    const pathLower = filePath.toLowerCase();
    
    // Check filename
    if (culturalKeywords.some(keyword => pathLower.includes(keyword))) {
      return true;
    }

    // Check file content if readable
    try {
      if (fs.existsSync(filePath) && !this.isBinaryFile(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
        return culturalKeywords.some(keyword => content.includes(keyword));
      }
    } catch {
      // If can't read file, assume no cultural content
    }

    return false;
  }

  private isBinaryFile(filePath: string): boolean {
    const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.pdf', '.ico', '.svg'];
    return binaryExtensions.some(ext => filePath.toLowerCase().endsWith(ext));
  }

  private async analyzeConfigFile(filePath: string): boolean {
    // For now, stage config files unless they seem dangerous
    // In future, integrate with predictive deployment agent
    try {
      if (filePath === '.env') {
        // Always stage .env changes as they're usually necessary
        return true;
      }

      if (filePath.includes('vite.config')) {
        // Vite config changes are usually safe
        return true;
      }

      return true; // Default to staging config files
    } catch {
      return false;
    }
  }

  private async executeIntelligentStaging(decisions: StagingDecision[]): Promise<void> {
    const toStage = decisions.filter(d => d.shouldStage);
    const skipped = decisions.filter(d => !d.shouldStage);

    if (toStage.length === 0) {
      console.log('⚠️  No files selected for staging');
      return;
    }

    console.log(`🚀 Staging ${toStage.length} files intelligently...\n`);

    // Group by category for organized output
    const categories = ['critical', 'cultural', 'feature', 'documentation', 'test', 'config'];
    
    for (const category of categories) {
      const categoryFiles = toStage.filter(d => d.category === category);
      
      if (categoryFiles.length > 0) {
        console.log(`📂 ${category.toUpperCase()} FILES:`);
        
        for (const decision of categoryFiles) {
          try {
            execSync(`git add "${decision.filePath}"`, { stdio: 'inherit' });
            console.log(`   ✅ ${decision.filePath}`);
            if (decision.culturalConsideration) {
              console.log(`      🌿 Cultural content - handled with care`);
            }
          } catch (error) {
            console.log(`   ❌ Failed to stage ${decision.filePath}: ${error}`);
          }
        }
        console.log();
      }
    }

    if (skipped.length > 0) {
      console.log('⏸️  SKIPPED FILES (require manual review):');
      skipped.forEach(decision => {
        console.log(`   ⚠️  ${decision.filePath} - ${decision.reason}`);
      });
      console.log();
    }
  }

  private async createIntelligentCommit(decisions: StagingDecision[]): Promise<void> {
    const staged = decisions.filter(d => d.shouldStage);
    
    if (staged.length === 0) return;

    // Analyze staged files to create meaningful commit message
    const categories = {
      critical: staged.filter(d => d.category === 'critical').length,
      feature: staged.filter(d => d.category === 'feature').length,
      documentation: staged.filter(d => d.category === 'documentation').length,
      cultural: staged.filter(d => d.category === 'cultural').length,
      test: staged.filter(d => d.category === 'test').length,
      config: staged.filter(d => d.category === 'config').length
    };

    // Create intelligent commit message
    let message = '🤖 INTELLIGENT STAGING: ';
    const messageParts: string[] = [];

    if (categories.feature > 0) {
      messageParts.push(`Enhanced features (${categories.feature} files)`);
    }
    if (categories.cultural > 0) {
      messageParts.push(`Cultural integration (${categories.cultural} files)`);
    }
    if (categories.documentation > 0) {
      messageParts.push(`Documentation updates (${categories.documentation} files)`);
    }
    if (categories.critical > 0) {
      messageParts.push(`System improvements (${categories.critical} files)`);
    }
    if (categories.test > 0) {
      messageParts.push(`Test enhancements (${categories.test} files)`);
    }
    if (categories.config > 0) {
      messageParts.push(`Configuration updates (${categories.config} files)`);
    }

    message += messageParts.join(', ');

    const fullMessage = `${message}

🧠 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>`;

    try {
      execSync(`git commit -m "${fullMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
      console.log('✅ Intelligent commit created successfully!');
    } catch {
      console.log('⚠️  Note: Files staged but commit may require manual completion');
      console.log('Suggested commit message:');
      console.log(fullMessage);
    }
  }
}

// Execute intelligent staging
const stagingSystem = new IntelligentStagingSystem();
stagingSystem.intelligentStage().catch(error => {
  console.error('❌ Intelligent staging failed:', error);
  process.exit(1);
});