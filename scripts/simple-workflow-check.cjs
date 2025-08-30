#!/usr/bin/env node

/**
 * Simple Workflow Check for Te Ao Mārama
 * Identifies critical functionality issues
 */

const fs = require('fs').promises;
const path = require('path');

const criticalIssues = [];
const warnings = [];

async function checkWorkflow() {
  console.log('🔍 Running Simple Workflow Check...\n');
  
  // 1. Check if build succeeded
  try {
    await fs.access(path.join(__dirname, '..', 'dist', 'index.html'));
    console.log('✅ Build: dist/index.html exists');
  } catch {
    criticalIssues.push('Build failed - dist/index.html missing');
    console.log('❌ CRITICAL: Build failed - dist/index.html missing');
  }
  
  // 2. Check if critical components exist
  const criticalComponents = [
    'src/App.tsx',
    'src/main.tsx',
    'src/services/DualRoleAuthProvider.tsx',
    'src/components/SystemTest.tsx',
    'src/components/CulturalLearningModules.tsx'
  ];
  
  for (const component of criticalComponents) {
    try {
      await fs.access(path.join(__dirname, '..', component));
      console.log(`✅ Component: ${component} exists`);
    } catch {
      criticalIssues.push(`Missing critical component: ${component}`);
      console.log(`❌ CRITICAL: Missing ${component}`);
    }
  }
  
  // 3. Check App.tsx for potential issues
  try {
    const appContent = await fs.readFile(path.join(__dirname, '..', 'src', 'App.tsx'), 'utf8');
    
    // Check for missing imports
    const imports = appContent.match(/import\s+.*\s+from\s+['"]([^'"]*)['"]/g) || [];
    const missingImports = [];
    
    for (const importLine of imports) {
      const match = importLine.match(/from\s+['"]([^'"]*)['"]/);
      if (match) {
        const importPath = match[1];
        if (importPath.startsWith('./') || importPath.startsWith('../')) {
          try {
            const fullPath = path.resolve(path.join(__dirname, '..', 'src'), importPath + '.tsx');
            await fs.access(fullPath);
          } catch {
            try {
              const fullPath = path.resolve(path.join(__dirname, '..', 'src'), importPath + '.ts');
              await fs.access(fullPath);
            } catch {
              try {
                const fullPath = path.resolve(path.join(__dirname, '..', 'src'), importPath, 'index.tsx');
                await fs.access(fullPath);
              } catch {
                missingImports.push(importPath);
              }
            }
          }
        }
      }
    }
    
    if (missingImports.length > 0) {
      criticalIssues.push(`Missing imported files in App.tsx: ${missingImports.join(', ')}`);
      console.log(`❌ CRITICAL: Missing imports in App.tsx: ${missingImports.join(', ')}`);
    } else {
      console.log('✅ App.tsx: All imports found');
    }
    
    // Check for route issues
    const routes = appContent.match(/<Route\s+path="([^"]*)"\s+element=\{<(\w+)/g) || [];
    console.log(`✅ Routes: Found ${routes.length} routes configured`);
    
  } catch (error) {
    criticalIssues.push(`Error reading App.tsx: ${error.message}`);
  }
  
  // 4. Check main.tsx for auth provider
  try {
    const mainContent = await fs.readFile(path.join(__dirname, '..', 'src', 'main.tsx'), 'utf8');
    
    if (mainContent.includes('DualRoleAuthProvider')) {
      console.log('✅ Auth: DualRoleAuthProvider is wrapped in main.tsx');
    } else {
      warnings.push('DualRoleAuthProvider not found in main.tsx');
      console.log('⚠️  WARNING: DualRoleAuthProvider not found in main.tsx');
    }
  } catch (error) {
    criticalIssues.push(`Error reading main.tsx: ${error.message}`);
  }
  
  // 5. Check deployment config
  try {
    await fs.access(path.join(__dirname, '..', 'firebase.json'));
    console.log('✅ Deploy: firebase.json exists');
  } catch {
    warnings.push('firebase.json missing');
    console.log('⚠️  WARNING: firebase.json missing');
  }
  
  try {
    await fs.access(path.join(__dirname, '..', '.firebaserc'));
    console.log('✅ Deploy: .firebaserc exists');
  } catch {
    warnings.push('.firebaserc missing');
    console.log('⚠️  WARNING: .firebaserc missing');
  }
  
  // Summary
  console.log('\n📊 WORKFLOW CHECK SUMMARY');
  console.log('='.repeat(40));
  console.log(`Critical Issues: ${criticalIssues.length}`);
  console.log(`Warnings: ${warnings.length}`);
  
  if (criticalIssues.length > 0) {
    console.log('\n❌ CRITICAL ISSUES:');
    criticalIssues.forEach((issue, i) => console.log(`${i + 1}. ${issue}`));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach((warning, i) => console.log(`${i + 1}. ${warning}`));
  }
  
  if (criticalIssues.length === 0 && warnings.length === 0) {
    console.log('\n🎉 All workflow checks passed!');
    console.log('The deployment should be working correctly.');
    console.log('\n💡 If functionality is still not working, the issues may be:');
    console.log('1. Runtime JavaScript errors in the browser');
    console.log('2. Network/CORS issues');
    console.log('3. Browser cache issues');
    console.log('4. Component logic errors that only appear during user interaction');
    console.log('\n🔧 Next steps:');
    console.log('1. Open browser dev tools on https://teao-marama.web.app');
    console.log('2. Check Console tab for JavaScript errors');
    console.log('3. Check Network tab for failed requests');
    console.log('4. Try hard refresh (Cmd/Ctrl + Shift + R)');
  }
  
  return {
    status: criticalIssues.length === 0 ? 'PASS' : 'FAIL',
    criticalIssues,
    warnings
  };
}

// Run the check
checkWorkflow()
  .then(result => {
    process.exit(result.status === 'FAIL' ? 1 : 0);
  })
  .catch(error => {
    console.error('💥 Workflow check failed:', error);
    process.exit(1);
  });