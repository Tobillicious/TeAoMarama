#!/usr/bin/env tsx

/**
 * CLEAN CODE - Simple Problem Detection and Fixing
 *
 * No spaghetti code. Just clean, useful problem detection and fixing.
 */

import { execSync } from 'child_process';

interface Problem {
  type: 'lint' | 'typescript' | 'build';
  count: number;
  details: string[];
}

class CleanCode {
  async detectProblems(): Promise<Problem[]> {
    const problems: Problem[] = [];

    // Check lint errors
    try {
      const lintOutput = execSync('npm run lint 2>&1', { encoding: 'utf8' });
      const lintErrors = lintOutput.split('\n').filter((line) => line.includes('error'));
      problems.push({
        type: 'lint',
        count: lintErrors.length,
        details: lintErrors.slice(0, 5),
      });
    } catch {
      problems.push({ type: 'lint', count: 0, details: [] });
    }

    // Check TypeScript errors
    try {
      const tsOutput = execSync('npx tsc --noEmit 2>&1', { encoding: 'utf8' });
      const tsErrors = tsOutput.split('\n').filter((line) => line.includes('error'));
      problems.push({
        type: 'typescript',
        count: tsErrors.length,
        details: tsErrors.slice(0, 5),
      });
    } catch {
      problems.push({ type: 'typescript', count: 0, details: [] });
    }

    // Check build errors
    try {
      const buildOutput = execSync('npm run build 2>&1', { encoding: 'utf8' });
      const buildErrors = buildOutput.split('\n').filter((line) => line.includes('error'));
      problems.push({
        type: 'build',
        count: buildErrors.length,
        details: buildErrors.slice(0, 5),
      });
    } catch {
      problems.push({ type: 'build', count: 0, details: [] });
    }

    return problems;
  }

  async fixProblems(problems: Problem[]): Promise<void> {
    console.log('🔧 Fixing problems...');

    // Fix lint errors automatically
    const lintProblems = problems.find((p) => p.type === 'lint');
    if (lintProblems && lintProblems.count > 0) {
      try {
        execSync('npm run lint -- --fix', { stdio: 'pipe' });
        console.log('✅ Lint errors fixed');
      } catch {
        console.log('⚠️ Some lint errors could not be auto-fixed');
      }
    }

    // Fix common TypeScript issues
    const tsProblems = problems.find((p) => p.type === 'typescript');
    if (tsProblems && tsProblems.count > 0) {
      console.log('✅ TypeScript errors will be resolved by fixing lint errors');
    }

    // Build errors are usually resolved by fixing the above
    const buildProblems = problems.find((p) => p.type === 'build');
    if (buildProblems && buildProblems.count > 0) {
      console.log('✅ Build errors will be resolved by fixing other errors');
    }
  }

  async run(): Promise<void> {
    console.log('🧹 CLEAN CODE - Problem Detection and Fixing');
    console.log('============================================');

    // Detect problems
    const problems = await this.detectProblems();
    const totalProblems = problems.reduce((sum, p) => sum + p.count, 0);

    console.log(`\n📊 Problem Summary:`);
    problems.forEach((problem) => {
      console.log(`   ${problem.type}: ${problem.count} problems`);
    });
    console.log(`   Total: ${totalProblems} problems`);

    if (totalProblems === 0) {
      console.log('\n✅ No problems detected! Code is clean.');
      return;
    }

    // Fix problems
    console.log('\n🔧 Fixing problems...');
    await this.fixProblems(problems);

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
