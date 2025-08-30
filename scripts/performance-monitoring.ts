#!/usr/bin/env tsx

/**
 * Performance Monitoring and Alerting System
 *
 * Monitors site performance metrics and sends alerts when thresholds are exceeded
 */

import { chromium } from 'playwright';

interface PerformanceMetric {
  timestamp: string;
  url: string;
  metricType: 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'Load Time';
  value: number;
  threshold: number;
  status: 'good' | 'needs-improvement' | 'poor';
}

class PerformanceMonitor {
  private baseUrl: string;
  private metrics: PerformanceMetric[] = [];

  // Core Web Vitals thresholds (Google recommendations)
  private thresholds = {
    LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
    FID: { good: 100, poor: 300 }, // First Input Delay (ms)
    CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
    TTFB: { good: 800, poor: 1800 }, // Time to First Byte (ms)
    'Load Time': { good: 3000, poor: 5000 }, // Total load time (ms)
  };

  constructor(baseUrl: string = 'https://teao-marama.web.app') {
    this.baseUrl = baseUrl;
  }

  async monitorPerformance() {
    console.log('📈 Starting performance monitoring...');

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Monitor key pages
    const criticalPages = [
      { path: '/', name: 'Landing Page' },
      { path: '/test', name: 'System Test' },
      { path: '/cultural-learning-modules', name: 'Cultural Learning' },
      { path: '/assessment-framework', name: 'Assessment Framework' },
      { path: '/educational-dashboard', name: 'Educational Dashboard' },
    ];

    for (const { path, name } of criticalPages) {
      try {
        console.log(`🔍 Monitoring ${name} (${path})...`);

        await this.measurePagePerformance(page, `${this.baseUrl}${path}`, name);

        // Wait between measurements
        await page.waitForTimeout(2000);
      } catch (error) {
        console.error(`❌ Failed to monitor ${name}:`, error);
      }
    }

    await browser.close();

    // Generate performance report
    await this.generatePerformanceReport();
  }

  private async measurePagePerformance(page: any, url: string, pageName: string) {
    // Clear cache to get realistic measurements
    await page.goto('about:blank');
    await page.evaluate(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => registration.unregister());
        });
      }
    });

    const startTime = Date.now();

    // Navigate to page and wait for load
    await page.goto(url, { waitUntil: 'networkidle' });

    const loadTime = Date.now() - startTime;

    // Record load time
    this.recordMetric(url, 'Load Time', loadTime);

    // Measure Core Web Vitals
    try {
      const webVitals = await page.evaluate(() => {
        return new Promise((resolve) => {
          const metrics = {
            LCP: 0,
            FID: 0,
            CLS: 0,
            TTFB: 0,
          };

          // Largest Contentful Paint
          if ('PerformanceObserver' in window) {
            try {
              const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                metrics.LCP = lastEntry?.startTime || 0;
              });
              lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

              // First Input Delay
              const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry: PerformanceEntry) => {
                  if ('processingStart' in entry && 'startTime' in entry) {
                    metrics.FID = (entry as any).processingStart - entry.startTime;
                  }
                });
              });
              fidObserver.observe({ entryTypes: ['first-input'] });

              // Cumulative Layout Shift
              const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry: any) => {
                  if (!entry.hadRecentInput) {
                    metrics.CLS += entry.value;
                  }
                });
              });
              clsObserver.observe({ entryTypes: ['layout-shift'] });

              // TTFB from navigation timing
              const navigation = performance.getEntriesByType('navigation')[0] as any;
              if (navigation) {
                metrics.TTFB = navigation.responseStart - navigation.requestStart;
              }
            } catch (e) {
              console.warn('Performance monitoring error:', e);
            }
          }

          // Wait for metrics to be collected
          setTimeout(() => resolve(metrics), 3000);
        });
      });

      // Record Web Vitals metrics
      if (webVitals.LCP > 0) this.recordMetric(url, 'LCP', webVitals.LCP);
      if (webVitals.FID > 0) this.recordMetric(url, 'FID', webVitals.FID);
      if (webVitals.CLS > 0) this.recordMetric(url, 'CLS', webVitals.CLS * 1000); // Convert to ms for consistency
      if (webVitals.TTFB > 0) this.recordMetric(url, 'TTFB', webVitals.TTFB);
    } catch (error) {
      console.warn(`⚠️  Could not measure Web Vitals for ${pageName}:`, error);
    }

    console.log(`✅ ${pageName}: Load time ${loadTime}ms`);
  }

  private recordMetric(url: string, metricType: keyof typeof this.thresholds, value: number) {
    const threshold = this.thresholds[metricType];
    let status: 'good' | 'needs-improvement' | 'poor';

    if (value <= threshold.good) {
      status = 'good';
    } else if (value <= threshold.poor) {
      status = 'needs-improvement';
    } else {
      status = 'poor';
    }

    this.metrics.push({
      timestamp: new Date().toISOString(),
      url,
      metricType,
      value,
      threshold: threshold.poor,
      status,
    });

    // Log performance issues
    if (status === 'poor') {
      console.log(`🔴 POOR: ${metricType} = ${value}ms (threshold: ${threshold.poor}ms) on ${url}`);
    } else if (status === 'needs-improvement') {
      console.log(`🟡 NEEDS IMPROVEMENT: ${metricType} = ${value}ms on ${url}`);
    }
  }

  private async generatePerformanceReport() {
    console.log('\n📊 Performance Monitoring Report');
    console.log('='.repeat(50));

    if (this.metrics.length === 0) {
      console.log('⚠️  No performance metrics collected');
      return;
    }

    // Group metrics by status
    const statusGroups = this.metrics.reduce((acc, metric) => {
      if (!acc[metric.status]) {
        acc[metric.status] = [];
      }
      acc[metric.status].push(metric);
      return acc;
    }, {} as Record<string, PerformanceMetric[]>);

    // Summary
    console.log(`Total metrics collected: ${this.metrics.length}`);
    console.log(`✅ Good: ${statusGroups.good?.length || 0}`);
    console.log(`🟡 Needs Improvement: ${statusGroups['needs-improvement']?.length || 0}`);
    console.log(`🔴 Poor: ${statusGroups.poor?.length || 0}`);

    // Show poor performing metrics
    if (statusGroups.poor) {
      console.log('\n🔴 CRITICAL PERFORMANCE ISSUES:');
      statusGroups.poor.forEach((metric) => {
        console.log(`  - ${metric.metricType}: ${metric.value}ms on ${metric.url}`);
        console.log(`    Threshold: ${metric.threshold}ms`);
      });
    }

    // Show metrics needing improvement
    if (statusGroups['needs-improvement']) {
      console.log('\n🟡 PERFORMANCE IMPROVEMENTS NEEDED:');
      statusGroups['needs-improvement'].forEach((metric) => {
        console.log(`  - ${metric.metricType}: ${metric.value}ms on ${metric.url}`);
      });
    }

    // Calculate average load times by page
    const loadTimesByUrl = this.metrics
      .filter((m) => m.metricType === 'Load Time')
      .reduce((acc, metric) => {
        if (!acc[metric.url]) {
          acc[metric.url] = [];
        }
        acc[metric.url].push(metric.value);
        return acc;
      }, {} as Record<string, number[]>);

    console.log('\n📈 AVERAGE LOAD TIMES BY PAGE:');
    Object.entries(loadTimesByUrl).forEach(([url, times]) => {
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      const status = avgTime <= 3000 ? '✅' : avgTime <= 5000 ? '🟡' : '🔴';
      console.log(`${status} ${url}: ${Math.round(avgTime)}ms`);
    });

    // Save detailed report
    const reportPath = 'performance-monitoring-report.json';
    const fs = await import('fs');
    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          summary: {
            totalMetrics: this.metrics.length,
            good: statusGroups.good?.length || 0,
            needsImprovement: statusGroups['needs-improvement']?.length || 0,
            poor: statusGroups.poor?.length || 0,
          },
          metrics: this.metrics,
          averageLoadTimes: Object.entries(loadTimesByUrl).map(([url, times]) => ({
            url,
            averageLoadTime: times.reduce((a, b) => a + b, 0) / times.length,
            measurements: times.length,
          })),
        },
        null,
        2,
      ),
    );

    console.log(`\n💾 Detailed report saved to ${reportPath}`);

    // Alert on critical issues
    const criticalIssues = statusGroups.poor?.length || 0;
    if (criticalIssues > 0) {
      console.log(`\n🚨 ALERT: ${criticalIssues} critical performance issues detected!`);
      console.log('   Consider immediate optimization or infrastructure scaling.');
    }
  }
}

// Run monitoring if called directly
const runAsModule = import.meta.url === `file://${process.argv[1]}`;
if (runAsModule) {
  const monitor = new PerformanceMonitor();
  monitor.monitorPerformance().catch(console.error);
}

export default PerformanceMonitor;
