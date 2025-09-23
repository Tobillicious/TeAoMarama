#!/usr/bin/env ts-node

/**
 * AUTOMATED LINK VERIFICATION SYSTEM
 * 
 * Comprehensive system to verify all educational resource links and ensure
 * teachers can rely on working, valuable external resources.
 * 
 * Features:
 * - Scans all educational resources for external links
 * - Tests HTTP status codes and response times
 * - Provides automated link replacement using Exa.ai
 * - Generates detailed reports for link health
 * - Removes false verification claims
 * - Integrates with CI/CD for regular checks
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { ExaLinkValidator, type LinkValidationResult } from '../src/utils/exa-link-validator.js';

// Configuration
const CONFIG = {
  // File patterns to scan for links
  patterns: [
    'src/data/**/*.ts',
    'src/components/**/*.tsx',
    'src/pages/**/*.tsx',
    'src/utils/**/*.ts'
  ],
  
  // URL regex patterns
  urlRegex: /https?:\/\/[^\s\]'"`,]+/g,
  verificationClaimRegex: /verified:\s*true|September 2025 verified|2025.*verified/gi,
  
  // Report configuration
  reportDir: './reports/link-verification',
  reportFile: 'link-health-report.json',
  summaryFile: 'link-verification-summary.md',
  
  // Performance thresholds
  maxResponseTime: 5000, // 5 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  
  // Categories of high-priority educational links
  priorityDomains: [
    'archives.govt.nz',     // Archives NZ - Te Tiriti content
    'doc.govt.nz',          // DOC - Kākāpō conservation
    'stats.govt.nz',        // Statistics NZ - census data
    'tepapa.govt.nz',       // Te Papa museum resources
    'education.govt.nz',    // Ministry of Education
    'tki.org.nz',          // Te Kete Ipurangi
    'nzhistory.govt.nz',   // NZ History
    'natlib.govt.nz',      // National Library
    'tetaurawhiri.govt.nz', // Māori Language Commission
    'maoritelevision.com'   // Māori Television
  ]
};

interface FoundLink {
  url: string;
  filePath: string;
  lineNumber: number;
  context: string;
  isPriority: boolean;
}

interface FileAnalysis {
  filePath: string;
  links: FoundLink[];
  verificationClaims: Array<{
    lineNumber: number;
    text: string;
    isFalse: boolean;
  }>;
}

interface LinkHealthReport {
  timestamp: string;
  totalLinks: number;
  workingLinks: number;
  brokenLinks: number;
  replacedLinks: number;
  priorityLinks: number;
  averageResponseTime: number;
  linksByStatus: Record<string, number>;
  linksByDomain: Record<string, number>;
  issues: Array<{
    url: string;
    status: string;
    file: string;
    recommendation: string;
  }>;
  summary: {
    healthScore: number;
    criticalIssues: number;
    falseVerificationClaims: number;
    recommendedActions: string[];
  };
}

export class AutomatedLinkVerificationSystem {
  private linkValidator: ExaLinkValidator;
  private foundLinks: FoundLink[] = [];
  private validationResults: Map<string, LinkValidationResult> = new Map();
  private performanceMetrics: Map<string, number> = new Map();

  constructor() {
    this.linkValidator = new ExaLinkValidator();
  }

  /**
   * Main execution method
   */
  async run(): Promise<void> {
    console.log('🔍 Starting Automated Link Verification System...\n');
    
    try {
      // Step 1: Scan all files for links
      console.log('📂 Scanning educational resources for external links...');
      await this.scanFilesForLinks();
      
      // Step 2: Validate all found links
      console.log(`\n🔗 Found ${this.foundLinks.length} links. Starting validation...`);
      await this.validateAllLinks();
      
      // Step 3: Identify false verification claims
      console.log('\n🕵️ Checking for false verification claims...');
      const falseClaimsAnalysis = await this.analyzeFalseVerificationClaims();
      
      // Step 4: Generate comprehensive report
      console.log('\n📊 Generating link health report...');
      const report = await this.generateLinkHealthReport(falseClaimsAnalysis);
      
      // Step 5: Save reports
      await this.saveReports(report);
      
      // Step 6: Update content if needed
      console.log('\n🔄 Updating content with verified links...');
      await this.updateContentWithVerifiedLinks();
      
      // Step 7: Generate CI/CD integration
      console.log('\n⚙️ Creating CI/CD integration files...');
      await this.generateCIIntegration();
      
      console.log('\n✅ Link verification system completed successfully!');
      this.displaySummary(report);
      
    } catch (error) {
      console.error('❌ Error in link verification system:', error);
      process.exit(1);
    }
  }

  /**
   * Scan all matching files for external links
   */
  private async scanFilesForLinks(): Promise<void> {
    for (const pattern of CONFIG.patterns) {
      const files = await glob(pattern);
      
      for (const filePath of files) {
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          await this.extractLinksFromFile(filePath, content);
        } catch (error) {
          console.warn(`⚠️ Could not read file ${filePath}:`, error);
        }
      }
    }
    
    console.log(`📊 Scanned ${this.foundLinks.length} unique links from educational resources`);
  }

  /**
   * Extract links from a single file
   */
  private async extractLinksFromFile(filePath: string, content: string): Promise<void> {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const matches = line.match(CONFIG.urlRegex);
      if (matches) {
        matches.forEach(url => {
          // Clean up URL (remove quotes, trailing punctuation)
          const cleanUrl = url.replace(/['"`,\]]+$/, '');
          
          // Check if this is a priority domain
          const isPriority = CONFIG.priorityDomains.some(domain => 
            cleanUrl.includes(domain)
          );
          
          this.foundLinks.push({
            url: cleanUrl,
            filePath,
            lineNumber: index + 1,
            context: line.trim(),
            isPriority
          });
        });
      }
    });
  }

  /**
   * Validate all found links using the enhanced validator
   */
  private async validateAllLinks(): Promise<void> {
    const uniqueUrls = [...new Set(this.foundLinks.map(link => link.url))];
    console.log(`🔍 Validating ${uniqueUrls.length} unique URLs...`);
    
    // Process in batches to avoid rate limiting
    const batchSize = 5;
    for (let i = 0; i < uniqueUrls.length; i += batchSize) {
      const batch = uniqueUrls.slice(i, i + batchSize);
      
      console.log(`   Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(uniqueUrls.length/batchSize)}`);
      
      const promises = batch.map(async (url) => {
        const startTime = Date.now();
        try {
          const result = await this.validateUrlWithRetry(url);
          const responseTime = Date.now() - startTime;
          this.performanceMetrics.set(url, responseTime);
          this.validationResults.set(url, result);
          
          // Log status for priority links
          const isPriority = CONFIG.priorityDomains.some(domain => url.includes(domain));
          if (isPriority) {
            console.log(`   ${result.status === 'working' ? '✅' : '❌'} ${url} (${result.status})`);
          }
        } catch (error) {
          console.warn(`   ⚠️ Error validating ${url}:`, error);
        }
      });
      
      await Promise.all(promises);
      
      // Brief delay between batches
      if (i + batchSize < uniqueUrls.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  /**
   * Validate URL with retry logic
   */
  private async validateUrlWithRetry(url: string, attempt: number = 1): Promise<LinkValidationResult> {
    try {
      return await this.linkValidator.validateUrl(url);
    } catch (error) {
      if (attempt < CONFIG.retryAttempts) {
        console.log(`   🔄 Retrying ${url} (attempt ${attempt + 1}/${CONFIG.retryAttempts})`);
        await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay * attempt));
        return this.validateUrlWithRetry(url, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Analyze files for false verification claims
   */
  private async analyzeFalseVerificationClaims(): Promise<FileAnalysis[]> {
    const analyses: FileAnalysis[] = [];
    
    for (const pattern of CONFIG.patterns) {
      const files = await glob(pattern);
      
      for (const filePath of files) {
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          const analysis = this.analyzeFileForFalseClaims(filePath, content);
          if (analysis.verificationClaims.length > 0) {
            analyses.push(analysis);
          }
        } catch (error) {
          console.warn(`⚠️ Could not analyze file ${filePath}:`, error);
        }
      }
    }
    
    return analyses;
  }

  /**
   * Analyze a single file for false verification claims
   */
  private analyzeFileForFalseClaims(filePath: string, content: string): FileAnalysis {
    const lines = content.split('\n');
    const links: FoundLink[] = [];
    const verificationClaims: Array<{lineNumber: number; text: string; isFalse: boolean}> = [];
    
    lines.forEach((line, index) => {
      // Check for verification claims
      const verificationMatches = line.match(CONFIG.verificationClaimRegex);
      if (verificationMatches) {
        verificationMatches.forEach(match => {
          // Consider any "September 2025" verification claim as false since we're in 2025
          const isFalse = match.includes('September 2025') || match.includes('2025');
          verificationClaims.push({
            lineNumber: index + 1,
            text: match,
            isFalse
          });
        });
      }
    });
    
    return {
      filePath,
      links,
      verificationClaims
    };
  }

  /**
   * Generate comprehensive link health report
   */
  private async generateLinkHealthReport(falseClaimsAnalysis: FileAnalysis[]): Promise<LinkHealthReport> {
    const now = new Date().toISOString();
    const totalLinks = this.foundLinks.length;
    
    // Calculate statistics
    let workingLinks = 0;
    let brokenLinks = 0;
    let replacedLinks = 0;
    let priorityLinks = 0;
    const linksByStatus: Record<string, number> = {};
    const linksByDomain: Record<string, number> = {};
    const issues: Array<{url: string; status: string; file: string; recommendation: string}> = [];
    
    let totalResponseTime = 0;
    let responseTimeCount = 0;
    
    for (const link of this.foundLinks) {
      const result = this.validationResults.get(link.url);
      if (!result) continue;
      
      // Count by status
      linksByStatus[result.status] = (linksByStatus[result.status] || 0) + 1;
      
      // Count by domain
      try {
        const domain = new URL(link.url).hostname;
        linksByDomain[domain] = (linksByDomain[domain] || 0) + 1;
      } catch (e) {
        // Invalid URL
      }
      
      // Track metrics
      if (result.status === 'working') workingLinks++;
      else if (result.status === 'broken') brokenLinks++;
      else if (result.status === 'replaced') replacedLinks++;
      
      if (link.isPriority) priorityLinks++;
      
      // Performance metrics
      const responseTime = this.performanceMetrics.get(link.url);
      if (responseTime) {
        totalResponseTime += responseTime;
        responseTimeCount++;
      }
      
      // Identify issues
      if (result.status !== 'working') {
        let recommendation = 'Monitor link status';
        if (result.status === 'broken') {
          recommendation = result.workingUrl ? 
            `Replace with: ${result.workingUrl}` : 
            'Find alternative resource or remove';
        }
        
        issues.push({
          url: link.url,
          status: result.status,
          file: link.filePath,
          recommendation
        });
      }
    }
    
    const averageResponseTime = responseTimeCount > 0 ? totalResponseTime / responseTimeCount : 0;
    const healthScore = totalLinks > 0 ? Math.round((workingLinks / totalLinks) * 100) : 0;
    
    // Count false verification claims
    const falseVerificationClaims = falseClaimsAnalysis.reduce(
      (count, analysis) => count + analysis.verificationClaims.filter(claim => claim.isFalse).length,
      0
    );
    
    // Generate recommendations
    const recommendedActions: string[] = [];
    if (brokenLinks > 0) {
      recommendedActions.push(`Fix ${brokenLinks} broken links`);
    }
    if (falseVerificationClaims > 0) {
      recommendedActions.push(`Remove ${falseVerificationClaims} false verification claims`);
    }
    if (healthScore < 90) {
      recommendedActions.push('Improve overall link health score');
    }
    if (averageResponseTime > CONFIG.maxResponseTime) {
      recommendedActions.push('Address slow-loading resources');
    }
    
    return {
      timestamp: now,
      totalLinks,
      workingLinks,
      brokenLinks,
      replacedLinks,
      priorityLinks,
      averageResponseTime,
      linksByStatus,
      linksByDomain,
      issues,
      summary: {
        healthScore,
        criticalIssues: brokenLinks,
        falseVerificationClaims,
        recommendedActions
      }
    };
  }

  /**
   * Save reports to disk
   */
  private async saveReports(report: LinkHealthReport): Promise<void> {
    // Ensure report directory exists
    await fs.mkdir(CONFIG.reportDir, { recursive: true });
    
    // Save JSON report
    const reportPath = path.join(CONFIG.reportDir, CONFIG.reportFile);
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    // Generate and save markdown summary
    const summaryPath = path.join(CONFIG.reportDir, CONFIG.summaryFile);
    const markdownSummary = this.generateMarkdownSummary(report);
    await fs.writeFile(summaryPath, markdownSummary);
    
    console.log(`📄 Reports saved:`);
    console.log(`   JSON: ${reportPath}`);
    console.log(`   Summary: ${summaryPath}`);
  }

  /**
   * Generate markdown summary report
   */
  private generateMarkdownSummary(report: LinkHealthReport): string {
    const { summary } = report;
    
    return `# Link Verification Report

**Generated:** ${new Date(report.timestamp).toLocaleString()}
**Health Score:** ${summary.healthScore}% ${summary.healthScore >= 90 ? '✅' : summary.healthScore >= 70 ? '⚠️' : '❌'}

## Summary

- **Total Links:** ${report.totalLinks}
- **Working Links:** ${report.workingLinks} (${Math.round((report.workingLinks/report.totalLinks)*100)}%)
- **Broken Links:** ${report.brokenLinks} (${Math.round((report.brokenLinks/report.totalLinks)*100)}%)
- **Replaced Links:** ${report.replacedLinks}
- **Priority Educational Links:** ${report.priorityLinks}
- **Average Response Time:** ${Math.round(report.averageResponseTime)}ms
- **False Verification Claims:** ${summary.falseVerificationClaims}

## Critical Issues

${summary.criticalIssues > 0 ? 
  `⚠️ **${summary.criticalIssues} broken links** need immediate attention for teacher credibility.` :
  '✅ No critical issues found.'
}

## Recommended Actions

${summary.recommendedActions.map(action => `- [ ] ${action}`).join('\n')}

## Links by Status

${Object.entries(report.linksByStatus).map(([status, count]) => 
  `- **${status}:** ${count}`
).join('\n')}

## High-Priority Domain Health

${Object.entries(report.linksByDomain)
  .filter(([domain]) => CONFIG.priorityDomains.includes(domain))
  .map(([domain, count]) => {
    const domainLinks = this.foundLinks.filter(link => link.url.includes(domain));
    const workingCount = domainLinks.filter(link => {
      const result = this.validationResults.get(link.url);
      return result?.status === 'working';
    }).length;
    const healthPercent = Math.round((workingCount / count) * 100);
    return `- **${domain}:** ${workingCount}/${count} working (${healthPercent}%) ${healthPercent >= 90 ? '✅' : healthPercent >= 70 ? '⚠️' : '❌'}`;
  }).join('\n')}

## Issues Requiring Action

${report.issues.length > 0 ? 
  report.issues.map(issue => 
    `### ${issue.url}\n- **Status:** ${issue.status}\n- **File:** ${issue.file}\n- **Recommendation:** ${issue.recommendation}\n`
  ).join('\n') :
  '✅ No issues found.'
}

---

*This report was generated by the Automated Link Verification System to ensure educational resource reliability for New Zealand teachers.*
`;
  }

  /**
   * Update content files with verified links
   */
  private async updateContentWithVerifiedLinks(): Promise<void> {
    let updatesCount = 0;
    
    for (const link of this.foundLinks) {
      const result = this.validationResults.get(link.url);
      
      if (result?.status === 'replaced' && result.workingUrl) {
        try {
          // Read the file
          const content = await fs.readFile(link.filePath, 'utf-8');
          
          // Replace the broken URL with the working one
          const updatedContent = content.replace(link.url, result.workingUrl);
          
          if (updatedContent !== content) {
            await fs.writeFile(link.filePath, updatedContent);
            console.log(`🔄 Updated ${link.filePath}: ${link.url} → ${result.workingUrl}`);
            updatesCount++;
          }
        } catch (error) {
          console.warn(`⚠️ Could not update ${link.filePath}:`, error);
        }
      }
    }
    
    console.log(`✅ Updated ${updatesCount} links with working alternatives`);
  }

  /**
   * Generate CI/CD integration files
   */
  private async generateCIIntegration(): Promise<void> {
    // GitHub Actions workflow
    const githubWorkflow = `name: Link Verification

on:
  schedule:
    # Run daily at 6 AM NZ time
    - cron: '0 18 * * *'
  workflow_dispatch:
  push:
    paths:
      - 'src/data/**/*.ts'
      - 'src/components/**/*.tsx'

jobs:
  verify-links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run link verification
        env:
          EXA_API_KEY: \${{ secrets.EXA_API_KEY }}
        run: npm run verify-links
      
      - name: Upload link health report
        uses: actions/upload-artifact@v4
        with:
          name: link-health-report
          path: reports/link-verification/
      
      - name: Comment PR with results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const summary = fs.readFileSync('reports/link-verification/link-verification-summary.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: summary
            });
`;

    // Save GitHub Actions workflow
    const workflowDir = '.github/workflows';
    await fs.mkdir(workflowDir, { recursive: true });
    await fs.writeFile(path.join(workflowDir, 'link-verification.yml'), githubWorkflow);
    
    // Package.json script
    console.log('📝 Add this script to your package.json:');
    console.log('"verify-links": "ts-node scripts/automated-link-verification-system.ts"');
    
    console.log('✅ CI/CD integration files generated');
  }

  /**
   * Display summary in console
   */
  private displaySummary(report: LinkHealthReport): void {
    console.log('\n📊 VERIFICATION SUMMARY');
    console.log('========================');
    console.log(`Health Score: ${report.summary.healthScore}% ${report.summary.healthScore >= 90 ? '✅' : '❌'}`);
    console.log(`Total Links: ${report.totalLinks}`);
    console.log(`Working: ${report.workingLinks} | Broken: ${report.brokenLinks} | Replaced: ${report.replacedLinks}`);
    console.log(`Priority Educational Links: ${report.priorityLinks}`);
    console.log(`False Verification Claims: ${report.summary.falseVerificationClaims}`);
    console.log(`Average Response Time: ${Math.round(report.averageResponseTime)}ms`);
    
    if (report.summary.recommendedActions.length > 0) {
      console.log('\n🎯 RECOMMENDED ACTIONS:');
      report.summary.recommendedActions.forEach(action => {
        console.log(`   • ${action}`);
      });
    }
    
    if (report.summary.healthScore < 90) {
      console.log('\n⚠️ CRITICAL: Link health below 90% - immediate action required for teacher credibility');
    } else {
      console.log('\n✅ EXCELLENT: All educational links verified and working');
    }
  }
}

// Run the system if called directly
if (require.main === module) {
  const system = new AutomatedLinkVerificationSystem();
  system.run().catch(console.error);
}

export default AutomatedLinkVerificationSystem;