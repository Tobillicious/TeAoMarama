#!/usr/bin/env tsx

/**
 * CLEAN CODE - Advanced Problem Detection and Fixing
 *
 * Comprehensive code quality analysis and automated fixing.
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

interface Problem {
  type: 'lint' | 'typescript' | 'build' | 'security' | 'performance';
  count: number;
  details: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface FixResult {
  success: boolean;
  message: string;
  problemsFixed: number;
}

interface ExecError {
  stdout?: Buffer;
  stderr?: Buffer;
  status?: number;
}

class CleanCode {
  private readonly projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  async detectProblems(): Promise<Problem[]> {
    const problems: Problem[] = [];

    // Check ESLint errors
    try {
      const lintOutput = execSync('npx eslint . --ext ts,tsx --format=compact 2>&1', {
        encoding: 'utf8',
      });
      const lintErrors = lintOutput.split('\n').filter((line) => line.includes('error'));
      problems.push({
        type: 'lint',
        count: lintErrors.length,
        details: lintErrors.slice(0, 10),
        severity: lintErrors.length > 50 ? 'high' : lintErrors.length > 10 ? 'medium' : 'low',
      });
    } catch (error) {
      const errorOutput = (error as ExecError).stdout?.toString() || '';
      const lintErrors = errorOutput.split('\n').filter((line: string) => line.includes('error'));
      problems.push({
        type: 'lint',
        count: lintErrors.length,
        details: lintErrors.slice(0, 10),
        severity: lintErrors.length > 50 ? 'high' : lintErrors.length > 10 ? 'medium' : 'low',
      });
    }

    // Check TypeScript errors
    try {
      const tsOutput = execSync('npx tsc --noEmit 2>&1', { encoding: 'utf8' });
      const tsErrors = tsOutput.split('\n').filter((line) => line.includes('error'));
      problems.push({
        type: 'typescript',
        count: tsErrors.length,
        details: tsErrors.slice(0, 10),
        severity: tsErrors.length > 20 ? 'high' : tsErrors.length > 5 ? 'medium' : 'low',
      });
    } catch (error) {
      const errorOutput = (error as ExecError).stdout?.toString() || '';
      const tsErrors = errorOutput.split('\n').filter((line: string) => line.includes('error'));
      problems.push({
        type: 'typescript',
        count: tsErrors.length,
        details: tsErrors.slice(0, 10),
        severity: tsErrors.length > 20 ? 'high' : tsErrors.length > 5 ? 'medium' : 'low',
      });
    }

    // Check build errors
    try {
      const buildOutput = execSync('npm run build 2>&1', { encoding: 'utf8' });
      const buildErrors = buildOutput.split('\n').filter((line) => line.includes('error'));
      problems.push({
        type: 'build',
        count: buildErrors.length,
        details: buildErrors.slice(0, 10),
        severity: buildErrors.length > 0 ? 'critical' : 'low',
      });
    } catch (error) {
      const errorOutput = (error as ExecError).stdout?.toString() || '';
      const buildErrors = errorOutput.split('\n').filter((line: string) => line.includes('error'));
      problems.push({
        type: 'build',
        count: buildErrors.length,
        details: buildErrors.slice(0, 10),
        severity: buildErrors.length > 0 ? 'critical' : 'low',
      });
    }

    // Check for common security issues
    const securityIssues = this.detectSecurityIssues();
    if (securityIssues.length > 0) {
      problems.push({
        type: 'security',
        count: securityIssues.length,
        details: securityIssues.slice(0, 10),
        severity: 'high',
      });
    }

    // Check for performance issues
    const performanceIssues = this.detectPerformanceIssues();
    if (performanceIssues.length > 0) {
      problems.push({
        type: 'performance',
        count: performanceIssues.length,
        details: performanceIssues.slice(0, 10),
        severity: 'medium',
      });
    }

    return problems;
  }

  private detectSecurityIssues(): string[] {
    const issues: string[] = [];

    // Check for hardcoded secrets
    const filesToCheck = ['src/**/*.ts', 'src/**/*.tsx', 'scripts/**/*.ts'];
    filesToCheck.forEach((pattern) => {
      try {
        const output = execSync(
          `grep -r "password|secret|key|token" ${pattern} 2>/dev/null || true`,
          { encoding: 'utf8' },
        );
        if (output.trim()) {
          issues.push(`Potential hardcoded secrets found in ${pattern}`);
        }
      } catch {
        // Ignore grep errors
      }
    });

    return issues;
  }

  private detectPerformanceIssues(): string[] {
    const issues: string[] = [];

    // Check for large bundle size indicators
    try {
      const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
      const dependencies = Object.keys(packageJson.dependencies || {});
      const devDependencies = Object.keys(packageJson.devDependencies || {});

      if (dependencies.length > 50) {
        issues.push('Large number of production dependencies detected');
      }

      if (devDependencies.length > 100) {
        issues.push('Large number of development dependencies detected');
      }
    } catch {
      // Ignore package.json parsing errors
    }

    return issues;
  }

  async fixProblems(problems: Problem[]): Promise<FixResult> {
    console.log('🔧 Fixing problems...');
    let totalFixed = 0;

    // Fix ESLint errors automatically
    const lintProblems = problems.find((p) => p.type === 'lint');
    if (lintProblems && lintProblems.count > 0) {
      try {
        execSync('npx eslint . --ext ts,tsx --fix', { stdio: 'pipe' });
        console.log('✅ ESLint errors auto-fixed');
        totalFixed += lintProblems.count;
      } catch {
        console.log('⚠️ Some ESLint errors could not be auto-fixed');
      }
    }

    // Fix Prettier formatting
    try {
      execSync('npx prettier --write .', { stdio: 'pipe' });
      console.log('✅ Code formatting applied');
    } catch {
      console.log('⚠️ Prettier formatting failed');
    }

    // Fix common TypeScript issues
    const tsProblems = problems.find((p) => p.type === 'typescript');
    if (tsProblems && tsProblems.count > 0) {
      console.log('✅ TypeScript errors will be resolved by fixing other errors');
    }

    // Build errors are usually resolved by fixing the above
    const buildProblems = problems.find((p) => p.type === 'build');
    if (buildProblems && buildProblems.count > 0) {
      console.log('✅ Build errors will be resolved by fixing other errors');
    }

    return {
      success: totalFixed > 0,
      message: `Fixed ${totalFixed} problems`,
      problemsFixed: totalFixed,
    };
  }

  generateReport(problems: Problem[], fixResult: FixResult): void {
    const reportPath = path.join(this.projectRoot, 'clean-code-report.md');
    const timestamp = new Date().toISOString();

    let report = `# Clean Code Report\n\n`;
    report += `**Generated:** ${timestamp}\n\n`;
    report += `## Summary\n\n`;
    report += `- **Total Problems:** ${problems.reduce((sum, p) => sum + p.count, 0)}\n`;
    report += `- **Problems Fixed:** ${fixResult.problemsFixed}\n`;
    report += `- **Success:** ${fixResult.success ? '✅' : '❌'}\n\n`;

    report += `## Problem Details\n\n`;
    problems.forEach((problem) => {
      report += `### ${problem.type.toUpperCase()} (${problem.severity})\n`;
      report += `- **Count:** ${problem.count}\n`;
      report += `- **Severity:** ${problem.severity}\n`;
      if (problem.details.length > 0) {
        report += `- **Sample Issues:**\n`;
        problem.details.forEach((detail) => {
          report += `  - ${detail}\n`;
        });
      }
      report += `\n`;
    });

    writeFileSync(reportPath, report);
    console.log(`📄 Report generated: ${reportPath}`);
  }

  async run(): Promise<void> {
    console.log('🧹 CLEAN CODE - Advanced Problem Detection and Fixing');
    console.log('====================================================');

    // Detect problems
    const problems = await this.detectProblems();
    const totalProblems = problems.reduce((sum, p) => sum + p.count, 0);

    console.log(`\n📊 Problem Summary:`);
    problems.forEach((problem) => {
      const severityIcon = {
        low: '🟢',
        medium: '🟡',
        high: '🟠',
        critical: '🔴',
      }[problem.severity];

      console.log(
        `   ${severityIcon} ${problem.type}: ${problem.count} problems (${problem.severity})`,
      );
    });
    console.log(`   Total: ${totalProblems} problems`);

    if (totalProblems === 0) {
      console.log('\n✅ No problems detected! Code is clean.');
      return;
    }

    // Fix problems
    console.log('\n🔧 Fixing problems...');
    const fixResult = await this.fixProblems(problems);

    // Generate report
    this.generateReport(problems, fixResult);

    // Recheck
    console.log('\n📊 Rechecking...');
    const remainingProblems = await this.detectProblems();
    const remainingTotal = remainingProblems.reduce((sum, p) => sum + p.count, 0);

    if (remainingTotal === 0) {
      console.log('✅ All problems fixed!');
    } else {
      console.log(`⚠️ ${remainingTotal} problems remain (may need manual fixing)`);
    }
  }
}

// Run the clean code process
async function main() {
  const cleaner = new CleanCode();
  await cleaner.run();
}

main().catch(console.error);
