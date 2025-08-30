#!/usr/bin/env tsx

/**
 * Runtime Error Monitoring System
 * 
 * Monitors production site for runtime errors and performance issues
 */

import { chromium } from 'playwright';

interface ErrorReport {
  timestamp: string;
  url: string;
  errorType: 'console' | 'network' | 'performance';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

class RuntimeMonitor {
  private baseUrl: string;
  private errors: ErrorReport[] = [];

  constructor(baseUrl: string = 'https://teao-marama.web.app') {
    this.baseUrl = baseUrl;
  }

  async monitorSite() {
    console.log('🔍 Starting runtime monitoring...');
    
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Set up error monitoring
    page.on('console', msg => {
      if (msg.type() === 'error') {
        this.logError({
          timestamp: new Date().toISOString(),
          url: page.url(),
          errorType: 'console',
          message: msg.text(),
          severity: this.categorizeError(msg.text())
        });
      }
    });

    page.on('requestfailed', request => {
      this.logError({
        timestamp: new Date().toISOString(),
        url: request.url(),
        errorType: 'network',
        message: `Failed request: ${request.url()} - ${request.failure()?.errorText}`,
        severity: 'high'
      });
    });

    // Monitor key pages
    const criticalPages = [
      '/',
      '/test',
      '/cultural-learning-modules',
      '/assessment-framework',
      '/educational-dashboard'
    ];

    for (const pagePath of criticalPages) {
      try {
        console.log(`📊 Monitoring ${pagePath}...`);
        
        const startTime = Date.now();
        await page.goto(`${this.baseUrl}${pagePath}`, { waitUntil: 'networkidle' });
        const loadTime = Date.now() - startTime;

        // Performance monitoring
        if (loadTime > 5000) {
          this.logError({
            timestamp: new Date().toISOString(),
            url: `${this.baseUrl}${pagePath}`,
            errorType: 'performance',
            message: `Slow page load: ${loadTime}ms`,
            severity: loadTime > 10000 ? 'high' : 'medium'
          });
        }

        // Wait for page to settle
        await page.waitForTimeout(2000);

      } catch (error) {
        this.logError({
          timestamp: new Date().toISOString(),
          url: `${this.baseUrl}${pagePath}`,
          errorType: 'console',
          message: `Page load failed: ${error}`,
          severity: 'critical'
        });
      }
    }

    await browser.close();
    
    // Generate report
    this.generateReport();
  }

  private categorizeError(message: string): 'low' | 'medium' | 'high' | 'critical' {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('failed to fetch') || 
        lowerMessage.includes('network error') ||
        lowerMessage.includes('uncaught')) {
      return 'critical';
    }
    
    if (lowerMessage.includes('warning') || 
        lowerMessage.includes('deprecated')) {
      return 'low';
    }
    
    if (lowerMessage.includes('error')) {
      return 'high';
    }
    
    return 'medium';
  }

  private logError(error: ErrorReport) {
    this.errors.push(error);
    
    const severityEmoji = {
      low: '⚠️',
      medium: '🟡',
      high: '🔴',
      critical: '💥'
    };

    console.log(`${severityEmoji[error.severity]} [${error.errorType}] ${error.message}`);
  }

  private generateReport() {
    console.log('\n📋 Runtime Monitoring Report');
    console.log('=' .repeat(50));
    
    if (this.errors.length === 0) {
      console.log('✅ No runtime errors detected!');
      return;
    }

    const groupedErrors = this.errors.reduce((acc, error) => {
      if (!acc[error.severity]) {
        acc[error.severity] = [];
      }
      acc[error.severity].push(error);
      return acc;
    }, {} as Record<string, ErrorReport[]>);

    const priorities = ['critical', 'high', 'medium', 'low'];
    
    for (const severity of priorities) {
      if (groupedErrors[severity]) {
        console.log(`\n${severity.toUpperCase()} (${groupedErrors[severity].length}):`);
        groupedErrors[severity].forEach(error => {
          console.log(`  - ${error.message}`);
          console.log(`    URL: ${error.url}`);
          console.log(`    Time: ${error.timestamp}`);
        });
      }
    }

    // Save report to file
    const reportPath = 'runtime-monitoring-report.json';
    const fs = require('fs');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalErrors: this.errors.length,
      errorsBySeverity: Object.keys(groupedErrors).reduce((acc, key) => {
        acc[key] = groupedErrors[key].length;
        return acc;
      }, {} as Record<string, number>),
      errors: this.errors
    }, null, 2));

    console.log(`\n💾 Full report saved to ${reportPath}`);
  }
}

// Run monitoring if called directly
const runAsModule = import.meta.url === `file://${process.argv[1]}`;
if (runAsModule) {
  const monitor = new RuntimeMonitor();
  monitor.monitorSite().catch(console.error);
}

export default RuntimeMonitor;