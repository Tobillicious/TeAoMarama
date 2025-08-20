#!/usr/bin/env tsx
/**
 * 🔍 COMPREHENSIVE CODEBASE AUDIT - IDENTIFY CLEANUP NEEDS
 */

import { readdir, readFile, stat } from 'fs/promises';
interface AuditResult {
  category: string;
  issues: string[];
  count: number;
}

async function comprehensiveAudit(): Promise<void> {
  console.log('🔍 COMPREHENSIVE CODEBASE AUDIT STARTED');
  console.log('='.repeat(60));

  const results: AuditResult[] = [];

  try {
    // 1. Audit resource migration status
    console.log('\n📊 1. RESOURCE MIGRATION AUDIT');
    const _teKetePath = 'te-kete-ako-clean/public/handouts';
    const _targetPath = 'src/components/educational/handouts';

    try {
      const _teKeteFiles = await readdir(_teKetePath);
      const _teKeteHandouts = _teKeteFiles.filter((f) => f.endsWith('.html') && !f.startsWith('.'));

      const _migratedFiles = await readdir(_targetPath);
      const _migratedComponents = _migratedFiles.filter((f) => f.endsWith('.tsx'));

      const _unmigratedCount = _teKeteHandouts.length - _migratedComponents.length;

      results.push({
        category: 'Resource Migration',
        issues: _unmigratedCount > 0 ? [`${_unmigratedCount} handouts not migrated`] : [],
        count: _unmigratedCount,
      });

      console.log(`  ✅ Te Kete Ako handouts: ${_teKeteHandouts.length}`);
      console.log(`  ✅ Migrated components: ${_migratedComponents.length}`);
      console.log(`  ${_unmigratedCount > 0 ? '⚠️' : '✅'} Unmigrated: ${_unmigratedCount}`);
    } catch {
      console.log('  ❌ Could not audit resource migration');
    }

    // 2. Audit linting issues
    console.log('\n📊 2. LINTING AUDIT');
    try {
      const { execSync } = await import('child_process');
      const _lintOutput = execSync('npm run lint 2>&1', { encoding: 'utf8' });
      const _errorLines = _lintOutput.split('\n').filter((line) => line.includes('error'));
      const _warningLines = _lintOutput.split('\n').filter((line) => line.includes('warning'));

      const _criticalErrors = _errorLines.filter(
        (line) =>
          !line.includes('te-kete-ako-clean') &&
          !line.includes('scripts/') &&
          line.includes('src/'),
      );

      results.push({
        category: 'Linting Issues',
        issues: _criticalErrors.slice(0, 5),
        count: _criticalErrors.length,
      });

      console.log(`  ⚠️ Total errors: ${_errorLines.length}`);
      console.log(`  ⚠️ Total warnings: ${_warningLines.length}`);
      console.log(`  ⚠️ Critical errors (src/): ${_criticalErrors.length}`);
    } catch {
      console.log('  ❌ Could not run linting audit');
    }

    // 3. Audit file structure
    console.log('\n📊 3. FILE STRUCTURE AUDIT');
    const orphanedFiles: string[] = [];
    const missingFiles: string[] = [];

    // Check for orphaned files in various directories
    const _directoriesToCheck = [
      'src/components',
      'src/pages',
      'src/services',
      'migration',
      'scripts',
    ];

    for (const dir of _directoriesToCheck) {
      try {
        const _files = await readdir(dir);
        const _tsxFiles = _files.filter((f) => f.endsWith('.tsx'));
        const _cssFiles = _files.filter((f) => f.endsWith('.css'));

        // Check for orphaned CSS files
        for (const cssFile of _cssFiles) {
          const _componentFile = cssFile.replace('.css', '.tsx');
          if (!_tsxFiles.includes(_componentFile)) {
            orphanedFiles.push(`${dir}/${cssFile}`);
          }
        }

        // Check for components without CSS
        for (const tsxFile of _tsxFiles) {
          const _cssFile = tsxFile.replace('.tsx', '.css');
          if (!_cssFiles.includes(_cssFile)) {
            missingFiles.push(`${dir}/${_cssFile}`);
          }
        }
      } catch {
        // Directory doesn't exist, skip
      }
    }

    results.push({
      category: 'File Structure',
      issues: [...orphanedFiles.slice(0, 3), ...missingFiles.slice(0, 3)],
      count: orphanedFiles.length + missingFiles.length,
    });

    console.log(`  ⚠️ Orphaned files: ${orphanedFiles.length}`);
    console.log(`  ⚠️ Missing files: ${missingFiles.length}`);

    // 4. Audit build performance
    console.log('\n📊 4. BUILD PERFORMANCE AUDIT');
    try {
      const { execSync } = await import('child_process');
      const _startTime = Date.now();
      execSync('npm run build', { stdio: 'pipe' });
      const _buildTime = (Date.now() - _startTime) / 1000;

      results.push({
        category: 'Build Performance',
        issues: _buildTime > 20 ? [`Build time: ${_buildTime}s (slow)`] : [],
        count: _buildTime > 20 ? 1 : 0,
      });

      console.log(`  ✅ Build time: ${_buildTime}s`);
      console.log(
        `  ${_buildTime > 20 ? '⚠️' : '✅'} Performance: ${
          _buildTime > 20 ? 'Needs optimization' : 'Good'
        }`,
      );
    } catch {
      console.log('  ❌ Could not audit build performance');
    }

    // 5. Audit documentation
    console.log('\n📊 5. DOCUMENTATION AUDIT');
    const _requiredDocs = [
      'README.md',
      'migration/AGENT_COORDINATION_BOARD.md',
      'migration/agent_coordination/agent_sync_status.md',
      'docs/FIREBASE_AUTHENTICATION_SETUP.md',
    ];

    const missingDocs: string[] = [];
    for (const doc of _requiredDocs) {
      try {
        await stat(doc);
      } catch {
        missingDocs.push(doc);
      }
    }

    results.push({
      category: 'Documentation',
      issues: missingDocs,
      count: missingDocs.length,
    });

    console.log(`  ⚠️ Missing documentation: ${missingDocs.length}`);
    if (missingDocs.length > 0) {
      missingDocs.forEach((doc) => console.log(`    - ${doc}`));
    }

    // 6. Audit context files
    console.log('\n📊 6. CONTEXT FILES AUDIT');
    const _contextFiles = [
      'migration/LLM_UNIVERSAL_ONBOARDING.md',
      'migration/LLM_QUICK_REFERENCE.md',
      'migration/COMPLETE_SYNTHESIS_MISSION.md',
    ];

    const outdatedContext: string[] = [];
    for (const file of _contextFiles) {
      try {
        const _content = await readFile(file, 'utf8');
        const _lastUpdated = _content.match(/Date.*(\d{4}-\d{2}-\d{2})/);
        if (_lastUpdated) {
          const _date = new Date(_lastUpdated[1]);
          const _daysSinceUpdate = (Date.now() - _date.getTime()) / (1000 * 60 * 60 * 24);
          if (_daysSinceUpdate > 7) {
            outdatedContext.push(`${file} (${Math.floor(_daysSinceUpdate)} days old)`);
          }
        }
      } catch {
        outdatedContext.push(`${file} (missing)`);
      }
    }

    results.push({
      category: 'Context Files',
      issues: outdatedContext,
      count: outdatedContext.length,
    });

    console.log(`  ⚠️ Outdated context files: ${outdatedContext.length}`);
    if (outdatedContext.length > 0) {
      outdatedContext.forEach((file) => console.log(`    - ${file}`));
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 AUDIT SUMMARY');
    console.log('='.repeat(60));

    const _totalIssues = results.reduce((sum, result) => sum + result.count, 0);

    results.forEach((result) => {
      const _status = result.count === 0 ? '✅' : '⚠️';
      console.log(`${_status} ${result.category}: ${result.count} issues`);
      if (result.issues.length > 0) {
        result.issues.forEach((issue) => console.log(`    - ${issue}`));
      }
    });

    console.log('\n' + '='.repeat(60));
    console.log(`🎯 TOTAL ISSUES FOUND: ${_totalIssues}`);
    console.log(`📊 OVERALL STATUS: ${_totalIssues === 0 ? '✅ EXCELLENT' : '⚠️ NEEDS ATTENTION'}`);

    if (_totalIssues > 0) {
      console.log('\n🚀 RECOMMENDED NEXT STEPS:');
      console.log('1. Fix critical linting errors in src/ directory');
      console.log('2. Update outdated context documentation');
      console.log('3. Clean up orphaned files');
      console.log('4. Optimize build performance if needed');
      console.log('5. Complete resource migration');
    }
  } catch (error) {
    console.error('❌ Comprehensive audit failed:', error);
  }
}

if (import.meta.main) {
  comprehensiveAudit();
}
