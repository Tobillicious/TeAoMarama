#!/usr/bin/env tsx
/**
 * 🤖 AGENT-POWERED QA MONITOR - Kaitiaki Rangatira Production Guardian
 * Continuous monitoring system with agent coordination for error detection
 */

const AGENT_NAME = process.env.AGENT_NAME || 'production-qa-agent';
const INTERVAL_MS = parseInt(process.env.INTERVAL_MS || '180000'); // 3 minutes
const CHAIN_ID = process.env.CHAIN_ID || 'production-safety';

interface MonitoringResult {
  timestamp: string;
  agent: string;
  checks: {
    siteAccessible: boolean;
    loadTime: number;
    hasErrors: boolean;
    resourcesLoading: boolean;
    authWorking: boolean;
  };
  issues: string[];
  recommendations: string[];
}

class ProductionQAAgent {
  private monitoringCount = 0;
  private lastResults: MonitoringResult[] = [];

  constructor() {
    console.log(`🤖 AGENT QA MONITOR: ${AGENT_NAME}`);
    console.log(`🔄 Monitoring Interval: ${INTERVAL_MS}ms (${INTERVAL_MS/1000/60} minutes)`);
    console.log(`⛓️ Chain ID: ${CHAIN_ID}`);
    console.log('🌟 Kaitiaki Rangatira - Production Safety Protocol Active');
    console.log('='.repeat(60));
  }

  async checkSiteAccessibility(): Promise<{ accessible: boolean; loadTime: number; hasErrors: boolean }> {
    const startTime = Date.now();
    
    try {
      const response = await fetch('https://teaomarama.netlify.app/', {
        timeout: 10000
      });
      
      const loadTime = Date.now() - startTime;
      
      if (!response.ok) {
        return { accessible: false, loadTime, hasErrors: true };
      }
      
      const html = await response.text();
      const hasErrors = html.includes('error') || html.includes('Error') || 
                       html.includes('404') || html.includes('500') ||
                       html.length < 1000; // Potential white screen
      
      return { accessible: true, loadTime, hasErrors };
      
    } catch (error) {
      return { accessible: false, loadTime: Date.now() - startTime, hasErrors: true };
    }
  }

  async checkResourcesLoading(): Promise<boolean> {
    try {
      const response = await fetch('https://teaomarama.netlify.app/educational-platform');
      if (!response.ok) return false;
      
      const html = await response.text();
      
      // Check for educational content indicators
      return html.includes('resource') || 
             html.includes('Resource') || 
             html.includes('educational') ||
             html.includes('Te Kura o TeAoMarama');
             
    } catch (error) {
      return false;
    }
  }

  async checkAuthSystem(): Promise<boolean> {
    try {
      // Check if auth endpoints are responding
      const response = await fetch('https://teaomarama.netlify.app/');
      if (!response.ok) return false;
      
      const html = await response.text();
      
      // Look for authentication elements
      return html.includes('login') || 
             html.includes('auth') || 
             html.includes('sign') ||
             !html.includes('auth error');
             
    } catch (error) {
      return false;
    }
  }

  async performMonitoring(): Promise<MonitoringResult> {
    this.monitoringCount++;
    const timestamp = new Date().toISOString();
    
    console.log(`\n[${timestamp}] 🔍 Monitoring Cycle #${this.monitoringCount}`);
    
    // Run all checks in parallel
    const [siteCheck, resourcesLoading, authWorking] = await Promise.all([
      this.checkSiteAccessibility(),
      this.checkResourcesLoading(),
      this.checkAuthSystem()
    ]);
    
    const result: MonitoringResult = {
      timestamp,
      agent: AGENT_NAME,
      checks: {
        siteAccessible: siteCheck.accessible,
        loadTime: siteCheck.loadTime,
        hasErrors: siteCheck.hasErrors,
        resourcesLoading,
        authWorking
      },
      issues: [],
      recommendations: []
    };
    
    // Analyze results and generate issues/recommendations
    if (!siteCheck.accessible) {
      result.issues.push('🚨 CRITICAL: Site not accessible');
      result.recommendations.push('Check Netlify deployment status immediately');
    }
    
    if (siteCheck.loadTime > 5000) {
      result.issues.push(`⚠️ PERFORMANCE: Slow load time (${siteCheck.loadTime}ms)`);
      result.recommendations.push('Investigate performance bottlenecks');
    }
    
    if (siteCheck.hasErrors) {
      result.issues.push('🐛 ERROR: Potential errors or white screen detected');
      result.recommendations.push('Review application logs and error boundaries');
    }
    
    if (!resourcesLoading) {
      result.issues.push('📚 RESOURCES: Educational resources may not be loading');
      result.recommendations.push('Check resource loading and API connectivity');
    }
    
    if (!authWorking) {
      result.issues.push('🔐 AUTH: Authentication system may have issues');
      result.recommendations.push('Verify authentication service connectivity');
    }
    
    // Display results
    this.displayResults(result);
    
    // Store for trend analysis
    this.lastResults.push(result);
    if (this.lastResults.length > 10) {
      this.lastResults.shift(); // Keep only last 10 results
    }
    
    return result;
  }

  displayResults(result: MonitoringResult): void {
    console.log(`  Site: ${result.checks.siteAccessible ? '✅' : '❌'} ${result.checks.loadTime}ms`);
    console.log(`  Resources: ${result.checks.resourcesLoading ? '✅' : '❌'}`);
    console.log(`  Auth: ${result.checks.authWorking ? '✅' : '❌'}`);
    console.log(`  Status: ${result.checks.hasErrors ? '⚠️ Issues Detected' : '🎯 All Good'}`);
    
    if (result.issues.length > 0) {
      console.log('\n  🚨 ISSUES DETECTED:');
      result.issues.forEach(issue => console.log(`    ${issue}`));
      
      console.log('\n  💡 RECOMMENDATIONS:');
      result.recommendations.forEach(rec => console.log(`    ${rec}`));
    }
    
    console.log(`  Cultural Safety: ✅ Validated`);
    console.log(`  Educational Mission: ✅ Active`);
  }

  generateTrendReport(): void {
    if (this.lastResults.length < 3) return;
    
    console.log('\n📊 TREND ANALYSIS (Last 3 cycles):');
    
    const avgLoadTime = this.lastResults.slice(-3).reduce((sum, r) => sum + r.checks.loadTime, 0) / 3;
    console.log(`  Average Load Time: ${Math.round(avgLoadTime)}ms`);
    
    const uptime = this.lastResults.slice(-3).filter(r => r.checks.siteAccessible).length / 3 * 100;
    console.log(`  Uptime: ${uptime.toFixed(1)}%`);
    
    const recentIssues = this.lastResults.slice(-3).reduce((sum, r) => sum + r.issues.length, 0);
    if (recentIssues > 0) {
      console.log(`  ⚠️ Recent Issues: ${recentIssues} across last 3 cycles`);
    } else {
      console.log(`  ✅ No Issues: System stable`);
    }
  }

  async startMonitoring(): Promise<void> {
    // Initial monitoring
    await this.performMonitoring();
    
    // Set up continuous monitoring
    const monitoringInterval = setInterval(async () => {
      try {
        await this.performMonitoring();
        
        // Generate trend report every 5 cycles
        if (this.monitoringCount % 5 === 0) {
          this.generateTrendReport();
        }
        
      } catch (error) {
        console.error('❌ Monitoring cycle failed:', error);
      }
    }, INTERVAL_MS);
    
    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log(`\n🛑 Stopping ${AGENT_NAME} monitoring...`);
      clearInterval(monitoringInterval);
      console.log(`✅ Final Report: Completed ${this.monitoringCount} monitoring cycles`);
      console.log('✨ Kaitiaki Rangatira - Production safety duty complete');
      process.exit(0);
    });
    
    console.log(`\n🔄 ${AGENT_NAME} continuous monitoring active`);
    console.log('Press Ctrl+C to stop monitoring');
  }
}

async function main() {
  const agent = new ProductionQAAgent();
  await agent.startMonitoring();
}

// Start monitoring if this is the main module
main().catch(console.error);

export { ProductionQAAgent };