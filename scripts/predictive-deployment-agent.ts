#!/usr/bin/env npx tsx

/**
 * 🔮 PREDICTIVE DEPLOYMENT AGENT
 * Kaitiaki Rangatira - Predictive Intelligence System
 * 
 * Analyzes git changes before deployment to predict potential issues
 * Guided by tikanga principles for wise decision-making
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface PredictionResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  issues: string[];
  recommendations: string[];
  culturalConsiderations: string[];
  shouldProceed: boolean;
}

interface FileAnalysis {
  filePath: string;
  changeType: 'added' | 'modified' | 'deleted';
  riskFactors: string[];
  lines: {added: number, removed: number};
}

class PredictiveDeploymentAgent {
  private readonly HIGH_RISK_FILES = [
    'package.json',
    'vite.config.ts',
    'tsconfig.json',
    '.env',
    'src/main.tsx',
    'src/App.tsx'
  ];

  private readonly CULTURAL_CONTENT_PATTERNS = [
    /māori/i,
    /tikanga/i,
    /kaitiaki/i,
    /mātauranga/i,
    /whakapapa/i,
    /manaakitanga/i,
    /te ao mārama/i,
    /iwi/i,
    /hapū/i,
    /marae/i
  ];

  async analyzePendingChanges(): Promise<PredictionResult> {
    const result: PredictionResult = {
      riskLevel: 'LOW',
      issues: [],
      recommendations: [],
      culturalConsiderations: [],
      shouldProceed: true
    };

    try {
      // Analyze git changes
      const changedFiles = this.getChangedFiles();
      console.log(`\n🔍 Analyzing ${changedFiles.length} changed files...`);

      // Check for high-risk file modifications
      await this.analyzeFileChanges(changedFiles, result);

      // Analyze package.json changes
      await this.analyzePackageChanges(result);

      // Check for cultural content changes
      await this.analyzeCulturalContent(changedFiles, result);

      // Analyze build configuration changes
      await this.analyzeBuildConfig(changedFiles, result);

      // Determine overall risk level
      this.determineOverallRisk(result);

      return result;

    } catch (error) {
      result.riskLevel = 'CRITICAL';
      result.issues.push(`Analysis failed: ${error}`);
      result.shouldProceed = false;
      return result;
    }
  }

  private getChangedFiles(): FileAnalysis[] {
    const files: FileAnalysis[] = [];

    try {
      // Get staged files
      const stagedOutput = execSync('git diff --cached --name-status', { encoding: 'utf8' });
      if (stagedOutput) {
        stagedOutput.split('\n').filter(line => line).forEach(line => {
          const [status, filePath] = line.split('\t');
          files.push({
            filePath,
            changeType: this.mapGitStatus(status),
            riskFactors: [],
            lines: this.getLineChanges(filePath, true)
          });
        });
      }

      // Get unstaged files
      const unstagedOutput = execSync('git diff --name-status', { encoding: 'utf8' });
      if (unstagedOutput) {
        unstagedOutput.split('\n').filter(line => line).forEach(line => {
          const [status, filePath] = line.split('\t');
          if (!files.find(f => f.filePath === filePath)) {
            files.push({
              filePath,
              changeType: this.mapGitStatus(status),
              riskFactors: [],
              lines: this.getLineChanges(filePath, false)
            });
          }
        });
      }

      // Get untracked files
      const untrackedOutput = execSync('git ls-files --others --exclude-standard', { encoding: 'utf8' });
      if (untrackedOutput) {
        untrackedOutput.split('\n').filter(line => line).forEach(filePath => {
          if (!files.find(f => f.filePath === filePath)) {
            files.push({
              filePath,
              changeType: 'added',
              riskFactors: [],
              lines: this.getFileSize(filePath)
            });
          }
        });
      }

    } catch (error) {
      console.warn('Warning: Could not get changed files:', error);
    }

    return files;
  }

  private mapGitStatus(status: string): 'added' | 'modified' | 'deleted' {
    switch (status[0]) {
      case 'A': return 'added';
      case 'M': return 'modified';
      case 'D': return 'deleted';
      default: return 'modified';
    }
  }

  private getLineChanges(filePath: string, staged: boolean): {added: number, removed: number} {
    try {
      const diffCommand = staged ? 
        `git diff --cached --numstat "${filePath}"` :
        `git diff --numstat "${filePath}"`;
      
      const output = execSync(diffCommand, { encoding: 'utf8' });
      const [added, removed] = output.split('\t');
      
      return {
        added: parseInt(added) || 0,
        removed: parseInt(removed) || 0
      };
    } catch {
      return { added: 0, removed: 0 };
    }
  }

  private getFileSize(filePath: string): {added: number, removed: number} {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n').length;
      return { added: lines, removed: 0 };
    } catch {
      return { added: 0, removed: 0 };
    }
  }

  private async analyzeFileChanges(changedFiles: FileAnalysis[], result: PredictionResult): Promise<void> {
    for (const file of changedFiles) {
      // Check if it's a high-risk file
      if (this.HIGH_RISK_FILES.some(riskFile => file.filePath.includes(riskFile))) {
        file.riskFactors.push('High-risk system file');
        result.issues.push(`⚠️  High-risk file modified: ${file.filePath}`);
      }

      // Check for large changes
      const totalChanges = file.lines.added + file.lines.removed;
      if (totalChanges > 100) {
        file.riskFactors.push('Large change set');
        result.issues.push(`📊 Large change set in ${file.filePath}: +${file.lines.added}/-${file.lines.removed}`);
      }

      // Check file extension risks
      if (file.filePath.endsWith('.tsx') || file.filePath.endsWith('.ts')) {
        if (file.lines.added > 50) {
          result.recommendations.push(`🔍 Consider breaking down large changes in ${file.filePath}`);
        }
      }

      // Check for new script files
      if (file.changeType === 'added' && file.filePath.includes('scripts/')) {
        result.recommendations.push(`🧪 New script detected: ${file.filePath} - ensure proper testing`);
      }
    }
  }

  private async analyzePackageChanges(result: PredictionResult): Promise<void> {
    try {
      const packageDiff = execSync('git diff package.json', { encoding: 'utf8' });
      if (packageDiff) {
        // Check for new dependencies
        if (packageDiff.includes('+"') && packageDiff.includes('"dependencies"')) {
          result.issues.push('🔗 New dependencies added - verify compatibility');
          result.recommendations.push('Run npm install and test build process');
        }

        // Check for version changes
        if (packageDiff.includes('version')) {
          result.recommendations.push('📦 Version change detected - update changelog');
        }

        // Check for script changes
        if (packageDiff.includes('"scripts"')) {
          result.issues.push('⚙️  Build scripts modified - verify deployment process');
        }
      }
    } catch (error) {
      // No package.json changes or file doesn't exist
    }
  }

  private async analyzeCulturalContent(changedFiles: FileAnalysis[], result: PredictionResult): Promise<void> {
    for (const file of changedFiles) {
      if (file.filePath.endsWith('.tsx') || file.filePath.endsWith('.ts') || file.filePath.endsWith('.md')) {
        try {
          let content = '';
          
          if (file.changeType !== 'deleted') {
            content = fs.readFileSync(file.filePath, 'utf8');
          } else {
            // For deleted files, we can't easily check content
            continue;
          }

          // Check for cultural content
          const hasCulturalContent = this.CULTURAL_CONTENT_PATTERNS.some(pattern => 
            pattern.test(content)
          );

          if (hasCulturalContent) {
            result.culturalConsiderations.push(
              `🌿 Cultural content in ${file.filePath} - ensure tikanga compliance`
            );
            
            // Add cultural safety recommendations
            result.recommendations.push(
              `Kaitiaki check: Review ${file.filePath} for cultural appropriateness`
            );
          }
        } catch (error) {
          // Could not read file
        }
      }
    }
  }

  private async analyzeBuildConfig(changedFiles: FileAnalysis[], result: PredictionResult): Promise<void> {
    const buildFiles = ['vite.config.ts', 'tsconfig.json', 'postcss.config.js', 'tailwind.config.js'];
    
    for (const file of changedFiles) {
      if (buildFiles.some(buildFile => file.filePath.includes(buildFile))) {
        result.issues.push(`⚙️  Build configuration change: ${file.filePath}`);
        result.recommendations.push('Test build process before deployment');
      }
    }
  }

  private determineOverallRisk(result: PredictionResult): void {
    const issueCount = result.issues.length;
    const hasCriticalIssues = result.issues.some(issue => 
      issue.includes('High-risk') || issue.includes('Build configuration')
    );

    if (hasCriticalIssues || issueCount >= 5) {
      result.riskLevel = 'HIGH';
      result.shouldProceed = false;
      result.recommendations.unshift('🚨 High risk deployment - manual review recommended');
    } else if (issueCount >= 3) {
      result.riskLevel = 'MEDIUM';
      result.recommendations.unshift('⚠️  Medium risk - proceed with caution');
    } else if (issueCount >= 1) {
      result.riskLevel = 'LOW';
    }

    // Cultural considerations always require careful review
    if (result.culturalConsiderations.length > 0) {
      if (result.riskLevel === 'LOW') {
        result.riskLevel = 'MEDIUM';
      }
      result.recommendations.unshift('🌿 Cultural content changes - kaitiaki review required');
    }
  }

  displayResults(result: PredictionResult): void {
    console.log('\n🔮 PREDICTIVE DEPLOYMENT ANALYSIS');
    console.log('=====================================');
    
    console.log(`\n📊 Risk Level: ${result.riskLevel}`);
    console.log(`✅ Should Proceed: ${result.shouldProceed ? 'YES' : 'NO'}`);

    if (result.issues.length > 0) {
      console.log('\n⚠️  Potential Issues:');
      result.issues.forEach(issue => console.log(`   ${issue}`));
    }

    if (result.culturalConsiderations.length > 0) {
      console.log('\n🌿 Cultural Considerations:');
      result.culturalConsiderations.forEach(consideration => 
        console.log(`   ${consideration}`)
      );
    }

    if (result.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      result.recommendations.forEach(rec => console.log(`   ${rec}`));
    }

    console.log('\n=====================================');
  }
}

// Main execution
async function main() {
  console.log('🔮 Kaitiaki Rangatira - Predictive Deployment Analysis');
  console.log('Guided by tikanga principles for wise decision-making\n');

  const agent = new PredictiveDeploymentAgent();
  const result = await agent.analyzePendingChanges();
  
  agent.displayResults(result);

  // Exit with appropriate code
  process.exit(result.shouldProceed ? 0 : 1);
}

// Execute if run directly
main().catch(error => {
  console.error('❌ Predictive analysis failed:', error);
  process.exit(1);
});

export { PredictiveDeploymentAgent };