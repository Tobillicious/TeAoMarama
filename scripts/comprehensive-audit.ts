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
  console.log('=' .repeat(60));

  const results: AuditResult[] = [];

  try {
    // 1. Audit resource migration status
    console.log('\n📊 1. RESOURCE MIGRATION AUDIT');
    const teKetePath = 'te-kete-ako-clean/public/handouts';
    const targetPath = 'src/components/educational/handouts';
    
    try {
      const teKeteFiles = await readdir(teKetePath);
      const teKeteHandouts = teKeteFiles.filter(f => f.endsWith('.html') && !f.startsWith('.'));
      
      const migratedFiles = await readdir(targetPath);
      const migratedComponents = migratedFiles.filter(f => f.endsWith('.tsx'));
      
      const unmigratedCount = teKeteHandouts.length - migratedComponents.length;
      
      results.push({
        category: 'Resource Migration',
        issues: unmigratedCount > 0 ? [`${unmigratedCount} handouts not migrated`] : [],
        count: unmigratedCount
      });
      
      console.log(`  ✅ Te Kete Ako handouts: ${teKeteHandouts.length}`);
      console.log(`  ✅ Migrated components: ${migratedComponents.length}`);
      console.log(`  ${unmigratedCount > 0 ? '⚠️' : '✅'} Unmigrated: ${unmigratedCount}`);
    } catch {
      console.log('  ❌ Could not audit resource migration');
    }

    // 2. Audit linting issues
    console.log('\n📊 2. LINTING AUDIT');
    try {
      const { execSync } = await import('child_process');
      const lintOutput = execSync('npm run lint 2>&1', { encoding: 'utf8' });
      const errorLines = lintOutput.split('\n').filter(line => line.includes('error'));
      const warningLines = lintOutput.split('\n').filter(line => line.includes('warning'));
      
      const criticalErrors = errorLines.filter(line => 
        !line.includes('te-kete-ako-clean') && 
        !line.includes('scripts/') &&
        line.includes('src/')
      );
      
      results.push({
        category: 'Linting Issues',
        issues: criticalErrors.slice(0, 5),
        count: criticalErrors.length
      });
      
      console.log(`  ⚠️ Total errors: ${errorLines.length}`);
      console.log(`  ⚠️ Total warnings: ${warningLines.length}`);
      console.log(`  ⚠️ Critical errors (src/): ${criticalErrors.length}`);
    } catch {
      console.log('  ❌ Could not run linting audit');
    }

    // 3. Audit file structure
    console.log('\n📊 3. FILE STRUCTURE AUDIT');
    const orphanedFiles: string[] = [];
    const missingFiles: string[] = [];
    
    // Check for orphaned files in various directories
    const directoriesToCheck = [
      'src/components',
      'src/pages',
      'src/services',
      'migration',
      'scripts'
    ];
    
    for (const dir of directoriesToCheck) {
      try {
        const files = await readdir(dir);
        const tsxFiles = files.filter(f => f.endsWith('.tsx'));
        const cssFiles = files.filter(f => f.endsWith('.css'));
        
        // Check for orphaned CSS files
        for (const cssFile of cssFiles) {
          const componentFile = cssFile.replace('.css', '.tsx');
          if (!tsxFiles.includes(componentFile)) {
            orphanedFiles.push(`${dir}/${cssFile}`);
          }
        }
        
        // Check for components without CSS
        for (const tsxFile of tsxFiles) {
          const cssFile = tsxFile.replace('.tsx', '.css');
          if (!cssFiles.includes(cssFile)) {
            missingFiles.push(`${dir}/${cssFile}`);
          }
        }
             } catch {
         // Directory doesn't exist, skip
       }
    }
    
    results.push({
      category: 'File Structure',
      issues: [...orphanedFiles.slice(0, 3), ...missingFiles.slice(0, 3)],
      count: orphanedFiles.length + missingFiles.length
    });
    
    console.log(`  ⚠️ Orphaned files: ${orphanedFiles.length}`);
    console.log(`  ⚠️ Missing files: ${missingFiles.length}`);

    // 4. Audit build performance
    console.log('\n📊 4. BUILD PERFORMANCE AUDIT');
    try {
      const { execSync } = await import('child_process');
      const startTime = Date.now();
      execSync('npm run build', { stdio: 'pipe' });
      const buildTime = (Date.now() - startTime) / 1000;
      
      results.push({
        category: 'Build Performance',
        issues: buildTime > 20 ? [`Build time: ${buildTime}s (slow)`] : [],
        count: buildTime > 20 ? 1 : 0
      });
      
      console.log(`  ✅ Build time: ${buildTime}s`);
      console.log(`  ${buildTime > 20 ? '⚠️' : '✅'} Performance: ${buildTime > 20 ? 'Needs optimization' : 'Good'}`);
    } catch {
      console.log('  ❌ Could not audit build performance');
    }

    // 5. Audit documentation
    console.log('\n📊 5. DOCUMENTATION AUDIT');
    const requiredDocs = [
      'README.md',
      'migration/AGENT_COORDINATION_BOARD.md',
      'migration/agent_coordination/agent_sync_status.md',
      'docs/FIREBASE_AUTHENTICATION_SETUP.md'
    ];
    
    const missingDocs: string[] = [];
    for (const doc of requiredDocs) {
      try {
        await stat(doc);
      } catch {
        missingDocs.push(doc);
      }
    }
    
    results.push({
      category: 'Documentation',
      issues: missingDocs,
      count: missingDocs.length
    });
    
    console.log(`  ⚠️ Missing documentation: ${missingDocs.length}`);
    if (missingDocs.length > 0) {
      missingDocs.forEach(doc => console.log(`    - ${doc}`));
    }

    // 6. Audit context files
    console.log('\n📊 6. CONTEXT FILES AUDIT');
    const contextFiles = [
      'migration/LLM_UNIVERSAL_ONBOARDING.md',
      'migration/LLM_QUICK_REFERENCE.md',
      'migration/COMPLETE_SYNTHESIS_MISSION.md'
    ];
    
    const outdatedContext: string[] = [];
    for (const file of contextFiles) {
      try {
        const content = await readFile(file, 'utf8');
        const lastUpdated = content.match(/Date.*(\d{4}-\d{2}-\d{2})/);
        if (lastUpdated) {
          const date = new Date(lastUpdated[1]);
          const daysSinceUpdate = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
          if (daysSinceUpdate > 7) {
            outdatedContext.push(`${file} (${Math.floor(daysSinceUpdate)} days old)`);
          }
        }
      } catch {
        outdatedContext.push(`${file} (missing)`);
      }
    }
    
    results.push({
      category: 'Context Files',
      issues: outdatedContext,
      count: outdatedContext.length
    });
    
    console.log(`  ⚠️ Outdated context files: ${outdatedContext.length}`);
    if (outdatedContext.length > 0) {
      outdatedContext.forEach(file => console.log(`    - ${file}`));
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 AUDIT SUMMARY');
    console.log('='.repeat(60));
    
    const totalIssues = results.reduce((sum, result) => sum + result.count, 0);
    
    results.forEach(result => {
      const status = result.count === 0 ? '✅' : '⚠️';
      console.log(`${status} ${result.category}: ${result.count} issues`);
      if (result.issues.length > 0) {
        result.issues.forEach(issue => console.log(`    - ${issue}`));
      }
    });
    
    console.log('\n' + '='.repeat(60));
    console.log(`🎯 TOTAL ISSUES FOUND: ${totalIssues}`);
    console.log(`📊 OVERALL STATUS: ${totalIssues === 0 ? '✅ EXCELLENT' : '⚠️ NEEDS ATTENTION'}`);
    
    if (totalIssues > 0) {
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
