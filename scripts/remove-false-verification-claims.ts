#!/usr/bin/env ts-node

/**
 * FALSE VERIFICATION CLAIMS REMOVER
 * 
 * Identifies and removes false "September 2025 verified" claims and other
 * misleading verification statements from educational content.
 * 
 * This script ensures accuracy and maintains credibility with NZ educators.
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

interface FalseClaimMatch {
  file: string;
  lineNumber: number;
  originalLine: string;
  claimText: string;
  suggestedReplacement: string;
  severity: 'high' | 'medium' | 'low';
}

interface RemovalReport {
  timestamp: string;
  filesScanned: number;
  falseClaimsFound: number;
  claimsRemoved: number;
  fileModifications: Array<{
    file: string;
    modificationsCount: number;
    originalBackupPath: string;
  }>;
  patterns: {
    pattern: string;
    matches: number;
    description: string;
  }[];
  summary: {
    credibilityImpact: 'high' | 'medium' | 'low';
    recommendedActions: string[];
  };
}

const FALSE_CLAIM_PATTERNS = [
  {
    pattern: /verified:\s*true/gi,
    description: 'Generic verification claims without validation',
    severity: 'medium' as const,
    replacement: 'verified: false // Requires manual verification',
    shouldReplace: false // Let's review these manually
  },
  {
    pattern: /September\s+2025\s+verified/gi,
    description: 'False future date verification claims',
    severity: 'high' as const,
    replacement: '// Link verification required',
    shouldReplace: true
  },
  {
    pattern: /2025.*verified|verified.*2025/gi,
    description: 'Any 2025 verification claims (potentially false)',
    severity: 'high' as const,
    replacement: '// Link verification required',
    shouldReplace: true
  },
  {
    pattern: /✅\s*(verified|working|tested)/gi,
    description: 'Check mark verification claims',
    severity: 'medium' as const,
    replacement: '// Status check required',
    shouldReplace: false
  },
  {
    pattern: /last\s+checked:\s*\d{4}-\d{2}-\d{2}/gi,
    description: 'Potentially outdated check dates',
    severity: 'low' as const,
    replacement: '// Verification date required',
    shouldReplace: false
  },
  {
    pattern: /status:\s*["']?working["']?/gi,
    description: 'Hardcoded working status claims',
    severity: 'medium' as const,
    replacement: 'status: "unknown" // Requires verification',
    shouldReplace: false
  }
];

const SCAN_PATTERNS = [
  'src/data/**/*.ts',
  'src/components/**/*.tsx',
  'src/pages/**/*.tsx',
  'src/utils/**/*.ts',
  '*.md',
  'docs/**/*.md'
];

const BACKUP_DIR = './backups/false-claims-removal';

export class FalseVerificationClaimsRemover {
  private foundClaims: FalseClaimMatch[] = [];
  private modifiedFiles: Map<string, number> = new Map();

  /**
   * Main execution method
   */
  async run(): Promise<void> {
    console.log('🕵️ Starting False Verification Claims Analysis...\n');
    
    try {
      // Step 1: Create backup directory
      await fs.mkdir(BACKUP_DIR, { recursive: true });
      
      // Step 2: Scan all files for false claims
      console.log('📂 Scanning files for false verification claims...');
      await this.scanAllFiles();
      
      // Step 3: Analyze and categorize claims
      console.log('\n🔍 Analyzing found claims...');
      const analysis = this.analyzeClaims();
      
      // Step 4: Create backups before modification
      console.log('\n💾 Creating backups...');
      await this.createBackups();
      
      // Step 5: Remove false claims
      console.log('\n🧹 Removing false verification claims...');
      await this.removeFalseClaims();
      
      // Step 6: Generate report
      console.log('\n📊 Generating removal report...');
      const report = await this.generateRemovalReport(analysis);
      
      // Step 7: Save report
      await this.saveReport(report);
      
      console.log('\n✅ False verification claims removal completed!');
      this.displaySummary(report);
      
    } catch (error) {
      console.error('❌ Error in false claims removal:', error);
      process.exit(1);
    }
  }

  /**
   * Scan all matching files for false verification claims
   */
  private async scanAllFiles(): Promise<void> {
    for (const pattern of SCAN_PATTERNS) {
      try {
        const files = await glob(pattern);
        
        for (const filePath of files) {
          await this.scanFileForFalseClaims(filePath);
        }
      } catch (error) {
        console.warn(`⚠️ Could not scan pattern ${pattern}:`, error);
      }
    }
    
    console.log(`📊 Found ${this.foundClaims.length} potential false claims across files`);
  }

  /**
   * Scan a single file for false verification claims
   */
  private async scanFileForFalseClaims(filePath: string): Promise<void> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        FALSE_CLAIM_PATTERNS.forEach(pattern => {
          const matches = line.match(pattern.pattern);
          if (matches) {
            matches.forEach(match => {
              this.foundClaims.push({
                file: filePath,
                lineNumber: index + 1,
                originalLine: line,
                claimText: match,
                suggestedReplacement: pattern.replacement,
                severity: pattern.severity
              });
            });
          }
        });
      });
    } catch (error) {
      console.warn(`⚠️ Could not read file ${filePath}:`, error);
    }
  }

  /**
   * Analyze found claims and categorize by severity
   */
  private analyzeClaims() {
    const analysis = {
      high: this.foundClaims.filter(claim => claim.severity === 'high'),
      medium: this.foundClaims.filter(claim => claim.severity === 'medium'),
      low: this.foundClaims.filter(claim => claim.severity === 'low')
    };
    
    console.log(`   High severity: ${analysis.high.length} (immediate removal required)`);
    console.log(`   Medium severity: ${analysis.medium.length} (review required)`);
    console.log(`   Low severity: ${analysis.low.length} (monitoring required)`);
    
    return analysis;
  }

  /**
   * Create backups of files that will be modified
   */
  private async createBackups(): Promise<void> {
    const filesToBackup = [...new Set(this.foundClaims.map(claim => claim.file))];
    
    for (const filePath of filesToBackup) {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const backupPath = path.join(
          BACKUP_DIR, 
          `${path.basename(filePath)}.${Date.now()}.backup`
        );
        await fs.writeFile(backupPath, content);
        console.log(`   💾 Backed up: ${filePath} → ${backupPath}`);
      } catch (error) {
        console.warn(`⚠️ Could not backup ${filePath}:`, error);
      }
    }
  }

  /**
   * Remove false verification claims from files
   */
  private async removeFalseClaims(): Promise<void> {
    // Group claims by file for efficient processing
    const claimsByFile = new Map<string, FalseClaimMatch[]>();
    
    this.foundClaims.forEach(claim => {
      if (!claimsByFile.has(claim.file)) {
        claimsByFile.set(claim.file, []);
      }
      claimsByFile.get(claim.file)!.push(claim);
    });

    for (const [filePath, claims] of claimsByFile) {
      try {
        await this.processFileForRemoval(filePath, claims);
      } catch (error) {
        console.warn(`⚠️ Could not process ${filePath}:`, error);
      }
    }
  }

  /**
   * Process a single file for false claim removal
   */
  private async processFileForRemoval(filePath: string, claims: FalseClaimMatch[]): Promise<void> {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    let modificationsCount = 0;
    
    // Sort claims by line number (descending) to avoid line number shifts
    const sortedClaims = claims.sort((a, b) => b.lineNumber - a.lineNumber);
    
    for (const claim of sortedClaims) {
      // Only remove high-severity false claims automatically
      if (claim.severity === 'high') {
        const lineIndex = claim.lineNumber - 1;
        if (lineIndex >= 0 && lineIndex < lines.length) {
          const originalLine = lines[lineIndex];
          
          // Find the pattern that matches this claim
          const matchingPattern = FALSE_CLAIM_PATTERNS.find(pattern =>
            pattern.pattern.test(claim.claimText) && pattern.shouldReplace
          );
          
          if (matchingPattern) {
            // Replace the false claim with a comment
            const newLine = originalLine.replace(
              matchingPattern.pattern,
              matchingPattern.replacement
            );
            
            if (newLine !== originalLine) {
              lines[lineIndex] = newLine;
              modificationsCount++;
              console.log(`   🧹 Removed from ${filePath}:${claim.lineNumber}: "${claim.claimText}"`);
            }
          }
        }
      }
    }
    
    if (modificationsCount > 0) {
      const newContent = lines.join('\n');
      await fs.writeFile(filePath, newContent);
      this.modifiedFiles.set(filePath, modificationsCount);
      console.log(`   ✅ Modified ${filePath}: ${modificationsCount} false claims removed`);
    }
  }

  /**
   * Generate comprehensive removal report
   */
  private async generateRemovalReport(analysis: any): Promise<RemovalReport> {
    const now = new Date().toISOString();
    const filesScanned = [...new Set(this.foundClaims.map(claim => claim.file))].length;
    const claimsRemoved = Array.from(this.modifiedFiles.values()).reduce((sum, count) => sum + count, 0);
    
    // Generate pattern statistics
    const patternStats = FALSE_CLAIM_PATTERNS.map(pattern => ({
      pattern: pattern.pattern.source,
      matches: this.foundClaims.filter(claim => 
        pattern.pattern.test(claim.claimText)
      ).length,
      description: pattern.description
    }));
    
    // Determine credibility impact
    const highSeverityClaims = this.foundClaims.filter(claim => claim.severity === 'high').length;
    const credibilityImpact = highSeverityClaims > 5 ? 'high' : 
                             highSeverityClaims > 0 ? 'medium' : 'low';
    
    // Generate recommendations
    const recommendedActions: string[] = [];
    if (analysis.high.length > 0) {
      recommendedActions.push(`Review ${analysis.high.length} high-severity false claims`);
    }
    if (analysis.medium.length > 0) {
      recommendedActions.push(`Manually verify ${analysis.medium.length} medium-severity claims`);
    }
    if (claimsRemoved < this.foundClaims.length) {
      recommendedActions.push('Complete manual review of remaining verification claims');
    }
    recommendedActions.push('Implement automated link verification system');
    recommendedActions.push('Establish verification protocols for new content');
    
    return {
      timestamp: now,
      filesScanned,
      falseClaimsFound: this.foundClaims.length,
      claimsRemoved,
      fileModifications: Array.from(this.modifiedFiles.entries()).map(([file, count]) => ({
        file,
        modificationsCount: count,
        originalBackupPath: path.join(BACKUP_DIR, `${path.basename(file)}.backup`)
      })),
      patterns: patternStats,
      summary: {
        credibilityImpact,
        recommendedActions
      }
    };
  }

  /**
   * Save the removal report
   */
  private async saveReport(report: RemovalReport): Promise<void> {
    const reportDir = './reports/false-claims-removal';
    await fs.mkdir(reportDir, { recursive: true });
    
    // Save JSON report
    const jsonPath = path.join(reportDir, 'false-claims-removal-report.json');
    await fs.writeFile(jsonPath, JSON.stringify(report, null, 2));
    
    // Generate and save markdown summary
    const markdownPath = path.join(reportDir, 'false-claims-removal-summary.md');
    const markdownContent = this.generateMarkdownSummary(report);
    await fs.writeFile(markdownPath, markdownContent);
    
    console.log(`📄 Reports saved:`);
    console.log(`   JSON: ${jsonPath}`);
    console.log(`   Summary: ${markdownPath}`);
  }

  /**
   * Generate markdown summary report
   */
  private generateMarkdownSummary(report: RemovalReport): string {
    return `# False Verification Claims Removal Report

**Generated:** ${new Date(report.timestamp).toLocaleString()}
**Credibility Impact:** ${report.summary.credibilityImpact.toUpperCase()} ${report.summary.credibilityImpact === 'high' ? '🔴' : report.summary.credibilityImpact === 'medium' ? '🟡' : '🟢'}

## Summary

- **Files Scanned:** ${report.filesScanned}
- **False Claims Found:** ${report.falseClaimsFound}
- **Claims Automatically Removed:** ${report.claimsRemoved}
- **Files Modified:** ${report.fileModifications.length}

## Impact Assessment

${report.summary.credibilityImpact === 'high' ? 
  '🔴 **HIGH IMPACT**: Multiple false verification claims were damaging teacher credibility. Immediate action was required.' :
  report.summary.credibilityImpact === 'medium' ?
  '🟡 **MEDIUM IMPACT**: Some false claims found that could mislead teachers.' :
  '🟢 **LOW IMPACT**: Minimal false claims detected.'
}

## Pattern Analysis

${report.patterns.map(pattern => 
  `### ${pattern.description}
- **Pattern:** \`${pattern.pattern}\`
- **Matches Found:** ${pattern.matches}
`).join('\n')}

## Modified Files

${report.fileModifications.length > 0 ?
  report.fileModifications.map(mod => 
    `- **${mod.file}**: ${mod.modificationsCount} modifications
  - Backup: ${mod.originalBackupPath}`
  ).join('\n') :
  'No files were automatically modified.'
}

## Recommended Actions

${report.summary.recommendedActions.map(action => `- [ ] ${action}`).join('\n')}

## Next Steps

1. **Review Remaining Claims**: Manually verify any claims not automatically removed
2. **Implement Verification System**: Set up automated link checking
3. **Update Processes**: Establish verification protocols for new content
4. **Monitor**: Regular checks to prevent future false claims

---

*This report ensures the credibility and accuracy of educational resources for New Zealand teachers.*
`;
  }

  /**
   * Display summary in console
   */
  private displaySummary(report: RemovalReport): void {
    console.log('\n📊 FALSE CLAIMS REMOVAL SUMMARY');
    console.log('================================');
    console.log(`Files Scanned: ${report.filesScanned}`);
    console.log(`False Claims Found: ${report.falseClaimsFound}`);
    console.log(`Claims Removed: ${report.claimsRemoved}`);
    console.log(`Files Modified: ${report.fileModifications.length}`);
    console.log(`Credibility Impact: ${report.summary.credibilityImpact.toUpperCase()}`);
    
    if (report.claimsRemoved > 0) {
      console.log('\n✅ IMPROVEMENT ACHIEVED:');
      console.log(`   • Removed ${report.claimsRemoved} false verification claims`);
      console.log('   • Enhanced teacher credibility and trust');
      console.log('   • Improved accuracy of educational resources');
    }
    
    if (report.summary.recommendedActions.length > 0) {
      console.log('\n🎯 NEXT ACTIONS REQUIRED:');
      report.summary.recommendedActions.forEach(action => {
        console.log(`   • ${action}`);
      });
    }
    
    if (report.fileModifications.length > 0) {
      console.log('\n📁 BACKUPS CREATED:');
      console.log(`   All modified files backed up to: ${BACKUP_DIR}`);
    }
  }
}

// Run the system if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const remover = new FalseVerificationClaimsRemover();
  remover.run().catch(console.error);
}

export default FalseVerificationClaimsRemover;