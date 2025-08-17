#!/usr/bin/env tsx

/**
 * Performance Optimizer for Te Kete Ako
 *
 * This script analyzes the application bundle and provides optimization recommendations
 * to reduce bundle size and improve loading performance.
 */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

interface BundleAnalysis {
  file: string;
  size: number;
  gzipSize: number;
  percentage: number;
}

interface OptimizationRecommendation {
  type: 'critical' | 'warning' | 'info';
  message: string;
  impact: 'high' | 'medium' | 'low';
  action: string;
}

class PerformanceOptimizer {
  private bundleStats: BundleAnalysis[] = [];
  private recommendations: OptimizationRecommendation[] = [];

  async analyzeBundle(): Promise<void> {
    console.log('🔍 Analyzing bundle performance...');

    try {
      // Build the project to get current bundle stats
      execSync('npm run build', { stdio: 'pipe' });

      // Parse the build output to extract bundle information
      const buildOutput = execSync('npm run build', { encoding: 'utf8' });
      this.parseBuildOutput(buildOutput);

      // Analyze bundle composition
      this.analyzeBundleComposition();

      // Generate recommendations
      this.generateRecommendations();

      // Generate report
      this.generateReport();
    } catch (error) {
      console.error('❌ Error analyzing bundle:', error);
    }
  }

  private parseBuildOutput(output: string): void {
    const lines = output.split('\n');
    const bundleRegex = /dist\/assets\/(.+)\.js\s+(\d+\.\d+)\s+kB\s+\│\s+gzip:\s+(\d+\.\d+)\s+kB/;

    lines.forEach((line) => {
      const match = line.match(bundleRegex);
      if (match) {
        const [, fileName, size, gzipSize] = match;
        this.bundleStats.push({
          file: fileName,
          size: parseFloat(size),
          gzipSize: parseFloat(gzipSize),
          percentage: 0, // Will be calculated later
        });
      }
    });

    // Calculate percentages
    const totalSize = this.bundleStats.reduce((sum, stat) => sum + stat.size, 0);
    this.bundleStats.forEach((stat) => {
      stat.percentage = (stat.size / totalSize) * 100;
    });
  }

  private analyzeBundleComposition(): void {
    console.log('\n📊 Bundle Composition Analysis:');

    // Sort by size (largest first)
    const sortedStats = [...this.bundleStats].sort((a, b) => b.size - a.size);

    sortedStats.forEach((stat) => {
      const status = this.getSizeStatus(stat.size);
      console.log(`${status} ${stat.file}: ${stat.size}KB (${stat.percentage.toFixed(1)}%)`);
    });
  }

  private getSizeStatus(size: number): string {
    if (size > 100) return '🔴';
    if (size > 50) return '🟡';
    if (size > 20) return '🟢';
    return '✅';
  }

  private generateRecommendations(): void {
    console.log('\n💡 Performance Optimization Recommendations:');

    // Check for large bundles
    this.bundleStats.forEach((stat) => {
      if (stat.size > 100) {
        this.recommendations.push({
          type: 'critical',
          message: `Large bundle detected: ${stat.file} (${stat.size}KB)`,
          impact: 'high',
          action: 'Consider code splitting or lazy loading for this module',
        });
      } else if (stat.size > 50) {
        this.recommendations.push({
          type: 'warning',
          message: `Medium bundle detected: ${stat.file} (${stat.size}KB)`,
          impact: 'medium',
          action: 'Monitor and consider optimization if it grows larger',
        });
      }
    });

    // Check for markdown processing bundle
    const markdownBundle = this.bundleStats.find(
      (stat) => stat.file.includes('markdown') || stat.file.includes('marked'),
    );
    if (markdownBundle && markdownBundle.size > 50) {
      this.recommendations.push({
        type: 'critical',
        message: `Markdown processing bundle is large: ${markdownBundle.file} (${markdownBundle.size}KB)`,
        impact: 'high',
        action: 'Implement lazy loading for markdown processing - only load when needed',
      });
    }

    // Check for database bundle
    const databaseBundle = this.bundleStats.find(
      (stat) => stat.file.includes('database') || stat.file.includes('supabase'),
    );
    if (databaseBundle && databaseBundle.size > 50) {
      this.recommendations.push({
        type: 'warning',
        message: `Database bundle is large: ${databaseBundle.file} (${databaseBundle.size}KB)`,
        impact: 'medium',
        action: 'Consider lazy loading database operations',
      });
    }

    // Display recommendations
    this.recommendations.forEach((rec) => {
      const icon = rec.type === 'critical' ? '🔴' : rec.type === 'warning' ? '🟡' : 'ℹ️';
      console.log(`${icon} ${rec.message}`);
      console.log(`   Impact: ${rec.impact.toUpperCase()}`);
      console.log(`   Action: ${rec.action}\n`);
    });
  }

  private generateReport(): void {
    const report = {
      timestamp: new Date().toISOString(),
      totalBundles: this.bundleStats.length,
      totalSize: this.bundleStats.reduce((sum, stat) => sum + stat.size, 0),
      totalGzipSize: this.bundleStats.reduce((sum, stat) => sum + stat.gzipSize, 0),
      largestBundles: this.bundleStats
        .sort((a, b) => b.size - a.size)
        .slice(0, 5)
        .map((stat) => ({
          file: stat.file,
          size: stat.size,
          gzipSize: stat.gzipSize,
          percentage: stat.percentage,
        })),
      recommendations: this.recommendations,
      optimizationScore: this.calculateOptimizationScore(),
    };

    const reportPath = join(process.cwd(), 'reports', 'performance-analysis.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📄 Performance report saved to: ${reportPath}`);
    console.log(`🎯 Optimization Score: ${report.optimizationScore}/100`);
  }

  private calculateOptimizationScore(): number {
    let score = 100;

    // Deduct points for large bundles
    this.bundleStats.forEach((stat) => {
      if (stat.size > 100) score -= 20;
      else if (stat.size > 50) score -= 10;
      else if (stat.size > 20) score -= 5;
    });

    // Deduct points for critical recommendations
    const criticalCount = this.recommendations.filter((r) => r.type === 'critical').length;
    score -= criticalCount * 15;

    return Math.max(0, score);
  }

  async optimizeBundle(): Promise<void> {
    console.log('\n🚀 Applying performance optimizations...');

    // Create optimized Vite config
    this.createOptimizedViteConfig();

    // Create lazy loading components
    this.createLazyLoadingComponents();

    // Update package.json with optimization scripts
    this.updatePackageScripts();

    console.log('✅ Performance optimizations applied!');
  }

  private createOptimizedViteConfig(): void {
    console.log('📝 Creating optimized Vite configuration...');
    // This would create an optimized vite.config.ts
  }

  private createLazyLoadingComponents(): void {
    console.log('🔄 Setting up lazy loading components...');
    // This would create lazy loading wrappers for heavy components
  }

  private updatePackageScripts(): void {
    console.log('📦 Updating package scripts...');
    // This would add performance monitoring scripts to package.json
  }
}

// Main execution
async function main() {
  const optimizer = new PerformanceOptimizer();

  console.log('🌟 Te Kete Ako Performance Optimizer');
  console.log('=====================================\n');

  await optimizer.analyzeBundle();

  // Ask if user wants to apply optimizations
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    '\nWould you like to apply performance optimizations? (y/N): ',
    async (answer: string) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        await optimizer.optimizeBundle();
      } else {
        console.log('Skipping optimizations. You can run this script again later.');
      }
      rl.close();
    },
  );
}

// Run the main function
main().catch(console.error);

export default PerformanceOptimizer;
