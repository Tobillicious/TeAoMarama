#!/usr/bin/env ts-node

/**
 * DEMO LINK VERIFICATION SYSTEM
 * 
 * Demonstrates the automated link verification system without requiring external APIs.
 * Shows the complete functionality and generates sample reports.
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

interface FoundLink {
  url: string;
  filePath: string;
  lineNumber: number;
  context: string;
  isPriority: boolean;
}

interface LinkValidationResult {
  originalUrl: string;
  workingUrl?: string;
  status: 'working' | 'broken' | 'replaced' | 'not_found';
  title?: string;
  description?: string;
  source?: string;
  lastChecked: string;
  responseTime: number;
}

const PRIORITY_DOMAINS = [
  'archives.govt.nz',
  'doc.govt.nz',
  'stats.govt.nz',
  'tepapa.govt.nz',
  'education.govt.nz',
  'tki.org.nz',
  'nzhistory.govt.nz',
  'natlib.govt.nz',
  'tetaurawhiri.govt.nz',
  'maoritelevision.com'
];

const SCAN_PATTERNS = [
  'src/data/**/*.ts',
  'src/components/**/*.tsx'
];

export class DemoLinkVerificationSystem {
  private foundLinks: FoundLink[] = [];

  async run(): Promise<void> {
    console.log('🔍 Demo: Educational Link Verification System\n');
    
    // Step 1: Scan for links
    console.log('📂 Scanning educational resources for external links...');
    await this.scanFilesForLinks();
    
    // Step 2: Simulate validation
    console.log(`\n🔗 Found ${this.foundLinks.length} links. Simulating validation...\n`);
    const results = await this.simulateValidation();
    
    // Step 3: Generate demo report
    console.log('📊 Generating demonstration report...\n');
    await this.generateDemoReport(results);
    
    console.log('✅ Demo completed! Check reports/demo/ for results.\n');
  }

  private async scanFilesForLinks(): Promise<void> {
    for (const pattern of SCAN_PATTERNS) {
      try {
        const files = await glob(pattern);
        
        for (const filePath of files) {
          await this.extractLinksFromFile(filePath);
        }
      } catch (error) {
        console.warn(`⚠️ Could not scan pattern ${pattern}:`, error);
      }
    }
    
    console.log(`📊 Found ${this.foundLinks.length} unique external links`);
    
    // Show sample of found links
    const priorityLinks = this.foundLinks.filter(link => link.isPriority);
    console.log(`   - Priority educational domains: ${priorityLinks.length}`);
    console.log(`   - General external links: ${this.foundLinks.length - priorityLinks.length}`);
    
    if (priorityLinks.length > 0) {
      console.log('\n🎯 Sample priority educational links found:');
      priorityLinks.slice(0, 5).forEach(link => {
        console.log(`   • ${link.url} (${path.basename(link.filePath)}:${link.lineNumber})`);
      });
    }
  }

  private async extractLinksFromFile(filePath: string): Promise<void> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n');
      const urlRegex = /https?:\/\/[^\s\]'"`,]+/g;
      
      lines.forEach((line, index) => {
        const matches = line.match(urlRegex);
        if (matches) {
          matches.forEach(url => {
            const cleanUrl = url.replace(/['"`,\]]+$/, '');
            const isPriority = PRIORITY_DOMAINS.some(domain => cleanUrl.includes(domain));
            
            // Avoid duplicates
            if (!this.foundLinks.some(link => link.url === cleanUrl)) {
              this.foundLinks.push({
                url: cleanUrl,
                filePath,
                lineNumber: index + 1,
                context: line.trim(),
                isPriority
              });
            }
          });
        }
      });
    } catch (error) {
      console.warn(`⚠️ Could not read file ${filePath}:`, error);
    }
  }

  private async simulateValidation(): Promise<LinkValidationResult[]> {
    const results: LinkValidationResult[] = [];
    
    for (const link of this.foundLinks) {
      // Simulate different outcomes based on domain patterns
      let status: LinkValidationResult['status'] = 'working';
      let responseTime = 1000 + Math.random() * 3000; // 1-4 seconds
      
      // Simulate some failures for demo purposes
      if (Math.random() < 0.1) { // 10% broken links
        status = 'broken';
        responseTime = 5000; // Timeout
      } else if (Math.random() < 0.05) { // 5% replaced
        status = 'replaced';
      }
      
      // Priority domains are more reliable
      if (link.isPriority && Math.random() < 0.9) {
        status = 'working';
        responseTime = 800 + Math.random() * 1200; // Faster response
      }
      
      const result: LinkValidationResult = {
        originalUrl: link.url,
        status,
        lastChecked: new Date().toISOString(),
        responseTime: Math.round(responseTime)
      };
      
      if (status === 'replaced') {
        result.workingUrl = link.url.replace(/\/old\//, '/new/');
        result.title = 'Alternative Educational Resource';
      }
      
      results.push(result);
      
      // Show progress for priority links
      if (link.isPriority) {
        const statusEmoji = status === 'working' ? '✅' : status === 'broken' ? '❌' : '🔄';
        console.log(`   ${statusEmoji} ${link.url} (${status}, ${result.responseTime}ms)`);
      }
    }
    
    return results;
  }

  private async generateDemoReport(results: LinkValidationResult[]): Promise<void> {
    const reportDir = './reports/demo';
    await fs.mkdir(reportDir, { recursive: true });
    
    // Calculate statistics
    const totalLinks = results.length;
    const workingLinks = results.filter(r => r.status === 'working').length;
    const brokenLinks = results.filter(r => r.status === 'broken').length;
    const replacedLinks = results.filter(r => r.status === 'replaced').length;
    const priorityLinks = this.foundLinks.filter(link => link.isPriority).length;
    
    const healthScore = Math.round((workingLinks / totalLinks) * 100);
    const avgResponseTime = Math.round(
      results.reduce((sum, r) => sum + r.responseTime, 0) / results.length
    );
    
    // Generate demonstration report
    const demoReport = {
      demo: true,
      timestamp: new Date().toISOString(),
      summary: {
        healthScore,
        totalLinks,
        workingLinks,
        brokenLinks,
        replacedLinks,
        priorityLinks,
        avgResponseTime,
        credibilityStatus: healthScore >= 90 ? 'Excellent' : healthScore >= 70 ? 'Good' : 'Needs Attention'
      },
      priorityDomains: this.analyzePriorityDomains(results),
      issues: this.identifyIssues(results),
      recommendations: this.generateRecommendations(healthScore, brokenLinks)
    };
    
    // Save JSON report
    await fs.writeFile(
      path.join(reportDir, 'demo-link-health-report.json'),
      JSON.stringify(demoReport, null, 2)
    );
    
    // Generate markdown summary
    const markdownSummary = this.generateMarkdownSummary(demoReport);
    await fs.writeFile(
      path.join(reportDir, 'demo-verification-summary.md'),
      markdownSummary
    );
    
    console.log('📄 Demo reports generated:');
    console.log(`   • JSON Report: ${reportDir}/demo-link-health-report.json`);
    console.log(`   • Summary: ${reportDir}/demo-verification-summary.md`);
    
    // Display key metrics
    this.displaySummary(demoReport);
  }

  private analyzePriorityDomains(results: LinkValidationResult[]) {
    const domainHealth: Record<string, any> = {};
    
    PRIORITY_DOMAINS.forEach(domain => {
      const domainLinks = this.foundLinks.filter(link => link.url.includes(domain));
      const domainResults = results.filter(result => 
        domainLinks.some(link => link.url === result.originalUrl)
      );
      
      if (domainResults.length > 0) {
        const working = domainResults.filter(r => r.status === 'working').length;
        domainHealth[domain] = {
          total: domainResults.length,
          working,
          percentage: Math.round((working / domainResults.length) * 100),
          avgResponseTime: Math.round(
            domainResults.reduce((sum, r) => sum + r.responseTime, 0) / domainResults.length
          )
        };
      }
    });
    
    return domainHealth;
  }

  private identifyIssues(results: LinkValidationResult[]) {
    return results
      .filter(result => result.status !== 'working')
      .map(result => {
        const link = this.foundLinks.find(l => l.url === result.originalUrl);
        return {
          url: result.originalUrl,
          status: result.status,
          file: link?.filePath || 'unknown',
          priority: link?.isPriority ? 'high' : 'medium',
          recommendation: result.status === 'broken' 
            ? 'Find alternative resource or remove'
            : 'Review replacement suggestion'
        };
      });
  }

  private generateRecommendations(healthScore: number, brokenLinks: number): string[] {
    const recommendations = [];
    
    if (healthScore < 90) {
      recommendations.push('Improve link health score to maintain teacher credibility');
    }
    
    if (brokenLinks > 0) {
      recommendations.push(`Fix ${brokenLinks} broken links immediately`);
    }
    
    recommendations.push('Set up daily automated verification');
    recommendations.push('Configure Exa.ai API for intelligent link replacement');
    recommendations.push('Monitor priority educational domains closely');
    
    if (healthScore < 70) {
      recommendations.push('🚨 CRITICAL: Immediate action required for teacher credibility');
    }
    
    return recommendations;
  }

  private generateMarkdownSummary(report: any): string {
    return `# Demo: Educational Link Verification Report

**Generated:** ${new Date(report.timestamp).toLocaleString()}
**Health Score:** ${report.summary.healthScore}% (${report.summary.credibilityStatus})

## 📊 Summary Statistics

- **Total Educational Links:** ${report.summary.totalLinks}
- **Working Links:** ${report.summary.workingLinks} (${Math.round((report.summary.workingLinks/report.summary.totalLinks)*100)}%)
- **Broken Links:** ${report.summary.brokenLinks}
- **Replaced Links:** ${report.summary.replacedLinks}
- **Priority Educational Domains:** ${report.summary.priorityLinks}
- **Average Response Time:** ${report.summary.avgResponseTime}ms

## 🎯 Priority Domain Health

${Object.entries(report.priorityDomains).map(([domain, health]: [string, any]) => 
  `### ${domain}
- **Links:** ${health.working}/${health.total} working (${health.percentage}%)
- **Performance:** ${health.avgResponseTime}ms average response
- **Status:** ${health.percentage >= 90 ? '✅ Excellent' : health.percentage >= 70 ? '⚠️ Good' : '❌ Needs Attention'}`
).join('\n\n')}

## 🚨 Issues Requiring Attention

${report.issues.length > 0 ? 
  report.issues.map((issue: any) => 
    `- **${issue.url}** (${issue.priority} priority)
  - Status: ${issue.status}
  - File: ${issue.file}
  - Action: ${issue.recommendation}`
  ).join('\n') :
  '✅ No critical issues found!'
}

## 📋 Recommendations

${report.recommendations.map((rec: string) => `- [ ] ${rec}`).join('\n')}

## 🔧 Next Steps

1. **Set up API Key**: Configure EXA_API_KEY for intelligent link replacement
2. **Enable Automation**: Set up daily verification via GitHub Actions
3. **Monitor Dashboard**: Use Link Health Dashboard for real-time monitoring
4. **Review Priority Links**: Focus on government and educational domains

---

> **This is a demonstration of the automated link verification system. 
> The actual system provides real-time validation and intelligent link replacement 
> to ensure educational resource reliability for New Zealand teachers.**

## 🎯 Why This Matters

- **Teacher Credibility**: Working links maintain professional trust
- **Student Access**: Guaranteed access to educational materials
- **Cultural Preservation**: Reliable access to Māori resources
- **Professional Standards**: High-quality educational platform
`;
  }

  private displaySummary(report: any): void {
    console.log('🎯 DEMO VERIFICATION RESULTS');
    console.log('============================');
    console.log(`Health Score: ${report.summary.healthScore}% (${report.summary.credibilityStatus})`);
    console.log(`Educational Links: ${report.summary.totalLinks} total`);
    console.log(`Working: ${report.summary.workingLinks} | Broken: ${report.summary.brokenLinks} | Replaced: ${report.summary.replacedLinks}`);
    console.log(`Priority Domains: ${report.summary.priorityLinks} educational links`);
    console.log(`Performance: ${report.summary.avgResponseTime}ms average response`);
    
    if (report.issues.length > 0) {
      console.log(`\n⚠️ Issues Found: ${report.issues.length} links need attention`);
    }
    
    console.log('\n🔧 SYSTEM CAPABILITIES DEMONSTRATED:');
    console.log('   ✅ Automated link discovery in educational content');
    console.log('   ✅ Priority domain identification (govt.nz, education sites)');
    console.log('   ✅ Health score calculation and reporting');
    console.log('   ✅ Performance monitoring and response time tracking');
    console.log('   ✅ Issue detection and recommendation generation');
    console.log('   ✅ Professional reporting for educational credibility');
    
    console.log('\n🚀 TO ENABLE FULL FUNCTIONALITY:');
    console.log('   1. Set EXA_API_KEY environment variable');
    console.log('   2. Run: npm run verify-links');
    console.log('   3. Enable daily automation via GitHub Actions');
    console.log('   4. Monitor via Link Health Dashboard');
  }
}

// Run demo if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const demo = new DemoLinkVerificationSystem();
  demo.run().catch(console.error);
}

export default DemoLinkVerificationSystem;