#!/usr/bin/env node
/**
 * 🔍 QUICK CODEBASE AUDIT - IDENTIFY CLEANUP NEEDS
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function quickAudit() {
  console.log('🔍 QUICK CODEBASE AUDIT STARTED');
  console.log('='.repeat(60));

  const issues = [];

  try {
    // 1. Check linting issues
    console.log('\n📊 1. LINTING AUDIT');
    try {
      const lintOutput = execSync('npm run lint 2>&1', { encoding: 'utf8' });
      const errorLines = lintOutput.split('\n').filter(line => line.includes('error'));
      const warningLines = lintOutput.split('\n').filter(line => line.includes('warning'));
      
      const criticalErrors = errorLines.filter(line => 
        !line.includes('te-kete-ako-clean') && 
        !line.includes('scripts/') &&
        line.includes('src/')
      );
      
      console.log(`  ⚠️ Total errors: ${errorLines.length}`);
      console.log(`  ⚠️ Total warnings: ${warningLines.length}`);
      console.log(`  ⚠️ Critical errors (src/): ${criticalErrors.length}`);
      
      if (criticalErrors.length > 0) {
        issues.push(`Critical linting errors: ${criticalErrors.length}`);
        criticalErrors.slice(0, 3).forEach(error => {
          console.log(`    - ${error.trim()}`);
        });
      }
    } catch (error) {
      console.log('  ❌ Could not run linting audit');
    }

    // 2. Check build status
    console.log('\n📊 2. BUILD STATUS AUDIT');
    try {
      const startTime = Date.now();
      execSync('npm run build', { stdio: 'pipe' });
      const buildTime = (Date.now() - startTime) / 1000;
      
      console.log(`  ✅ Build time: ${buildTime}s`);
      console.log(`  ${buildTime > 20 ? '⚠️' : '✅'} Performance: ${buildTime > 20 ? 'Needs optimization' : 'Good'}`);
      
      if (buildTime > 20) {
        issues.push(`Slow build time: ${buildTime}s`);
      }
    } catch (error) {
      console.log('  ❌ Build failed');
      issues.push('Build failure detected');
    }

    // 3. Check for orphaned files
    console.log('\n📊 3. FILE STRUCTURE AUDIT');
    const directoriesToCheck = ['src/components', 'src/pages', 'src/services'];
    let orphanedFiles = 0;
    let missingCSS = 0;
    
    for (const dir of directoriesToCheck) {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        const tsxFiles = files.filter(f => f.endsWith('.tsx'));
        const cssFiles = files.filter(f => f.endsWith('.css'));
        
        // Check for orphaned CSS files
        for (const cssFile of cssFiles) {
          const componentFile = cssFile.replace('.css', '.tsx');
          if (!tsxFiles.includes(componentFile)) {
            orphanedFiles++;
          }
        }
        
        // Check for components without CSS
        for (const tsxFile of tsxFiles) {
          const cssFile = tsxFile.replace('.tsx', '.css');
          if (!cssFiles.includes(cssFile)) {
            missingCSS++;
          }
        }
      }
    }
    
    console.log(`  ⚠️ Orphaned files: ${orphanedFiles}`);
    console.log(`  ⚠️ Missing CSS files: ${missingCSS}`);
    
    if (orphanedFiles > 0) {
      issues.push(`Orphaned files: ${orphanedFiles}`);
    }
    if (missingCSS > 0) {
      issues.push(`Missing CSS files: ${missingCSS}`);
    }

    // 4. Check documentation
    console.log('\n📊 4. DOCUMENTATION AUDIT');
    const requiredDocs = [
      'README.md',
      'migration/AGENT_COORDINATION_BOARD.md',
      'migration/agent_coordination/agent_sync_status.md'
    ];
    
    const missingDocs = [];
    for (const doc of requiredDocs) {
      if (!fs.existsSync(doc)) {
        missingDocs.push(doc);
      }
    }
    
    console.log(`  ⚠️ Missing documentation: ${missingDocs.length}`);
    if (missingDocs.length > 0) {
      missingDocs.forEach(doc => console.log(`    - ${doc}`));
      issues.push(`Missing documentation: ${missingDocs.length} files`);
    }

    // 5. Check context files
    console.log('\n📊 5. CONTEXT FILES AUDIT');
    const contextFiles = [
      'migration/LLM_UNIVERSAL_ONBOARDING.md',
      'migration/LLM_QUICK_REFERENCE.md',
      'migration/COMPLETE_SYNTHESIS_MISSION.md'
    ];
    
    const outdatedContext = [];
    for (const file of contextFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const lastUpdated = content.match(/Date.*(\d{4}-\d{2}-\d{2})/);
        if (lastUpdated) {
          const date = new Date(lastUpdated[1]);
          const daysSinceUpdate = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
          if (daysSinceUpdate > 7) {
            outdatedContext.push(`${file} (${Math.floor(daysSinceUpdate)} days old)`);
          }
        }
      } else {
        outdatedContext.push(`${file} (missing)`);
      }
    }
    
    console.log(`  ⚠️ Outdated context files: ${outdatedContext.length}`);
    if (outdatedContext.length > 0) {
      outdatedContext.forEach(file => console.log(`    - ${file}`));
      issues.push(`Outdated context files: ${outdatedContext.length}`);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 AUDIT SUMMARY');
    console.log('='.repeat(60));
    
    if (issues.length === 0) {
      console.log('✅ EXCELLENT - No issues found!');
    } else {
      console.log(`⚠️ ${issues.length} issues found:`);
      issues.forEach(issue => console.log(`  - ${issue}`));
      
      console.log('\n🚀 RECOMMENDED NEXT STEPS:');
      console.log('1. Fix critical linting errors in src/ directory');
      console.log('2. Update outdated context documentation');
      console.log('3. Clean up orphaned files');
      console.log('4. Optimize build performance if needed');
      console.log('5. Complete resource migration');
    }

  } catch (error) {
    console.error('❌ Quick audit failed:', error.message);
  }
}

quickAudit();
