#!/usr/bin/env tsx

/**
 * Comprehensive QA Workflow for Te Ao Mārama Educational Platform
 * 
 * This script identifies critical functionality issues that should be caught
 * before deployment and implements a robust testing workflow.
 */

interface QATest {
  id: string;
  name: string;
  category: 'build' | 'runtime' | 'functionality' | 'accessibility' | 'performance';
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  test: () => Promise<{ passed: boolean; details: string; suggestion?: string }>;
}

interface QAReport {
  timestamp: string;
  totalTests: number;
  passed: number;
  failed: number;
  critical: number;
  categories: Record<string, { passed: number; failed: number }>;
  results: Array<{
    test: QATest;
    result: { passed: boolean; details: string; suggestion?: string };
  }>;
  overallStatus: 'PASS' | 'FAIL' | 'WARNING';
  recommendations: string[];
}

const qaTests: QATest[] = [
  {
    id: 'build-success',
    name: 'Build Process Success',
    category: 'build',
    priority: 'critical',
    description: 'Verify the build process completes without errors',
    test: async () => {
      try {
        // Check if dist folder exists and has content
        const fs = await import('fs').then(m => m.promises);
        const path = await import('path');
        
        const distPath = path.join(process.cwd(), 'dist');
        const distExists = await fs.access(distPath).then(() => true).catch(() => false);
        
        if (!distExists) {
          return {
            passed: false,
            details: 'Dist folder not found - build may have failed',
            suggestion: 'Run npm run build and check for errors'
          };
        }
        
        const files = await fs.readdir(distPath);
        const hasIndex = files.includes('index.html');
        const hasAssets = files.some(f => f === 'assets');
        
        if (!hasIndex || !hasAssets) {
          return {
            passed: false,
            details: `Missing critical files: index.html: ${hasIndex}, assets: ${hasAssets}`,
            suggestion: 'Check build configuration and ensure all assets are generated'
          };
        }
        
        return {
          passed: true,
          details: `Build successful: ${files.length} files generated`
        };
      } catch (error) {
        return {
          passed: false,
          details: `Build check failed: ${error}`,
          suggestion: 'Verify file system permissions and build process'
        };
      }
    }
  },
  
  {
    id: 'typescript-errors',
    name: 'TypeScript Compilation',
    category: 'build',
    priority: 'critical',
    description: 'Check for TypeScript compilation errors',
    test: async () => {
      try {
        const { execSync } = await import('child_process');
        
        // Run TypeScript check
        const result = execSync('npx tsc --noEmit --skipLibCheck', { 
          encoding: 'utf8',
          cwd: process.cwd()
        });
        
        return {
          passed: true,
          details: 'TypeScript compilation successful'
        };
      } catch (error) {
        const errorOutput = error instanceof Error ? error.message : String(error);
        return {
          passed: false,
          details: `TypeScript errors found: ${errorOutput}`,
          suggestion: 'Fix TypeScript errors before deployment'
        };
      }
    }
  },
  
  {
    id: 'missing-imports',
    name: 'Missing Import Detection',
    category: 'build',
    priority: 'high',
    description: 'Detect missing imports that could cause runtime errors',
    test: async () => {
      try {
        const fs = await import('fs').then(m => m.promises);
        const path = await import('path');
        
        // Check key files for potential import issues
        const criticalFiles = [
          'src/App.tsx',
          'src/main.tsx',
          'src/services/DualRoleAuthProvider.tsx'
        ];
        
        const issues: string[] = [];
        
        for (const file of criticalFiles) {
          const filePath = path.join(process.cwd(), file);
          try {
            const content = await fs.readFile(filePath, 'utf8');
            
            // Check for common import issues
            if (content.includes("import") && content.includes("from ''")) {
              issues.push(`${file}: Empty import path found`);
            }
            
            // Check for missing semicolons after imports
            const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));
            for (const line of importLines) {
              if (!line.trim().endsWith(';') && !line.includes('//')) {
                issues.push(`${file}: Missing semicolon in import: ${line.trim()}`);
              }
            }
            
          } catch (fileError) {
            issues.push(`${file}: File not found or unreadable`);
          }
        }
        
        if (issues.length > 0) {
          return {
            passed: false,
            details: issues.join(', '),
            suggestion: 'Fix import issues to prevent runtime errors'
          };
        }
        
        return {
          passed: true,
          details: 'No critical import issues found'
        };
      } catch (error) {
        return {
          passed: false,
          details: `Import check failed: ${error}`,
          suggestion: 'Manually review import statements in critical files'
        };
      }
    }
  },
  
  {
    id: 'auth-provider-integration',
    name: 'Authentication Provider Integration',
    category: 'functionality',
    priority: 'critical',
    description: 'Verify authentication provider is properly integrated',
    test: async () => {
      try {
        const fs = await import('fs').then(m => m.promises);
        const path = await import('path');
        
        // Check main.tsx for auth provider wrapper
        const mainPath = path.join(process.cwd(), 'src/main.tsx');
        const mainContent = await fs.readFile(mainPath, 'utf8');
        
        if (!mainContent.includes('DualRoleAuthProvider')) {
          return {
            passed: false,
            details: 'DualRoleAuthProvider not found in main.tsx',
            suggestion: 'Wrap App component with DualRoleAuthProvider'
          };
        }
        
        // Check if auth service exists
        const authPath = path.join(process.cwd(), 'src/services/DualRoleAuthProvider.tsx');
        const authExists = await fs.access(authPath).then(() => true).catch(() => false);
        
        if (!authExists) {
          return {
            passed: false,
            details: 'DualRoleAuthProvider.tsx file not found',
            suggestion: 'Create authentication provider service'
          };
        }
        
        return {
          passed: true,
          details: 'Authentication provider properly integrated'
        };
      } catch (error) {
        return {
          passed: false,
          details: `Auth integration check failed: ${error}`,
          suggestion: 'Verify authentication setup'
        };
      }
    }
  },
  
  {
    id: 'route-configuration',
    name: 'Route Configuration',
    category: 'functionality',
    priority: 'high',
    description: 'Verify all routes are properly configured',
    test: async () => {
      try {
        const fs = await import('fs').then(m => m.promises);
        const path = await import('path');
        
        const appPath = path.join(process.cwd(), 'src/App.tsx');
        const appContent = await fs.readFile(appPath, 'utf8');
        
        // Check for critical routes
        const criticalRoutes = ['/', '/login', '/teacher-dashboard', '/student-dashboard'];
        const missingRoutes = criticalRoutes.filter(route => 
          !appContent.includes(`path="${route}"`)
        );
        
        if (missingRoutes.length > 0) {
          return {
            passed: false,
            details: `Missing routes: ${missingRoutes.join(', ')}`,
            suggestion: 'Add missing routes to App.tsx'
          };
        }
        
        // Check for broken component imports
        const routeLines = appContent.split('\n').filter(line => 
          line.includes('<Route') && line.includes('element=')
        );
        
        const brokenRoutes: string[] = [];
        for (const line of routeLines) {
          const componentMatch = line.match(/element=\{<(\w+)/);
          if (componentMatch) {
            const componentName = componentMatch[1];
            if (!appContent.includes(`import ${componentName}`) && 
                !appContent.includes(`import {.*${componentName}.*}`)) {
              brokenRoutes.push(componentName);
            }
          }
        }
        
        if (brokenRoutes.length > 0) {
          return {
            passed: false,
            details: `Components not imported: ${brokenRoutes.join(', ')}`,
            suggestion: 'Import missing components or fix route definitions'
          };
        }
        
        return {
          passed: true,
          details: `${criticalRoutes.length} critical routes configured correctly`
        };
      } catch (error) {
        return {
          passed: false,
          details: `Route check failed: ${error}`,
          suggestion: 'Manually verify route configuration in App.tsx'
        };
      }
    }
  },
  
  {
    id: 'cultural-components',
    name: 'Cultural Components Availability',
    category: 'functionality',
    priority: 'high',
    description: 'Verify cultural learning components are available',
    test: async () => {
      try {
        const fs = await import('fs').then(m => m.promises);
        const path = await import('path');
        
        const criticalCulturalComponents = [
          'src/components/CulturalLearningModules.tsx',
          'src/components/AdvancedWisdomAccelerator.tsx',
          'src/components/AssessmentFramework.tsx'
        ];
        
        const missingComponents: string[] = [];
        
        for (const component of criticalCulturalComponents) {
          const componentPath = path.join(process.cwd(), component);
          const exists = await fs.access(componentPath).then(() => true).catch(() => false);
          
          if (!exists) {
            missingComponents.push(component);
          }
        }
        
        if (missingComponents.length > 0) {
          return {
            passed: false,
            details: `Missing cultural components: ${missingComponents.join(', ')}`,
            suggestion: 'Restore missing cultural learning components'
          };
        }
        
        return {
          passed: true,
          details: `All ${criticalCulturalComponents.length} cultural components available`
        };
      } catch (error) {
        return {
          passed: false,
          details: `Cultural components check failed: ${error}`,
          suggestion: 'Verify cultural component files exist'
        };
      }
    }
  },
  
  {
    id: 'deployment-config',
    name: 'Deployment Configuration',
    category: 'build',
    priority: 'medium',
    description: 'Check deployment configuration files',
    test: async () => {
      try {
        const fs = await import('fs').then(m => m.promises);
        const path = await import('path');
        
        const configFiles = [
          { file: 'firebase.json', required: true },
          { file: '.firebaserc', required: true },
          { file: 'package.json', required: true }
        ];
        
        const issues: string[] = [];
        
        for (const { file, required } of configFiles) {
          const filePath = path.join(process.cwd(), file);
          const exists = await fs.access(filePath).then(() => true).catch(() => false);
          
          if (!exists && required) {
            issues.push(`Missing ${file}`);
          }
        }
        
        if (issues.length > 0) {
          return {
            passed: false,
            details: issues.join(', '),
            suggestion: 'Create missing deployment configuration files'
          };
        }
        
        return {
          passed: true,
          details: 'All deployment configuration files present'
        };
      } catch (error) {
        return {
          passed: false,
          details: `Deployment config check failed: ${error}`,
          suggestion: 'Verify deployment configuration'
        };
      }
    }
  }
];

async function runQAWorkflow(): Promise<QAReport> {
  console.log('🔍 Starting Comprehensive QA Workflow for Te Ao Mārama...\n');
  
  const report: QAReport = {
    timestamp: new Date().toISOString(),
    totalTests: qaTests.length,
    passed: 0,
    failed: 0,
    critical: 0,
    categories: {},
    results: [],
    overallStatus: 'PASS',
    recommendations: []
  };
  
  // Initialize category counters
  for (const test of qaTests) {
    if (!report.categories[test.category]) {
      report.categories[test.category] = { passed: 0, failed: 0 };
    }
  }
  
  // Run all tests
  for (const test of qaTests) {
    console.log(`Running: ${test.name} (${test.priority})...`);
    
    try {
      const result = await test.test();
      
      report.results.push({ test, result });
      
      if (result.passed) {
        report.passed++;
        report.categories[test.category].passed++;
        console.log(`✅ ${test.name}: ${result.details}`);
      } else {
        report.failed++;
        report.categories[test.category].failed++;
        
        if (test.priority === 'critical') {
          report.critical++;
          console.log(`❌ CRITICAL: ${test.name}: ${result.details}`);
        } else {
          console.log(`⚠️  ${test.priority.toUpperCase()}: ${test.name}: ${result.details}`);
        }
        
        if (result.suggestion) {
          report.recommendations.push(`${test.name}: ${result.suggestion}`);
        }
      }
    } catch (error) {
      report.failed++;
      report.categories[test.category].failed++;
      console.log(`💥 ERROR in ${test.name}: ${error}`);
      report.recommendations.push(`${test.name}: Fix test execution error`);
    }
    
    console.log('');
  }
  
  // Determine overall status
  if (report.critical > 0) {
    report.overallStatus = 'FAIL';
  } else if (report.failed > 0) {
    report.overallStatus = 'WARNING';
  }
  
  // Generate summary
  console.log('📊 QA WORKFLOW SUMMARY');
  console.log('='.repeat(50));
  console.log(`Overall Status: ${report.overallStatus}`);
  console.log(`Tests: ${report.passed}/${report.totalTests} passed`);
  console.log(`Critical Issues: ${report.critical}`);
  console.log(`Failed Tests: ${report.failed}`);
  console.log('');
  
  // Category breakdown
  console.log('📋 BY CATEGORY:');
  for (const [category, stats] of Object.entries(report.categories)) {
    console.log(`${category}: ${stats.passed}/${stats.passed + stats.failed} passed`);
  }
  console.log('');
  
  // Recommendations
  if (report.recommendations.length > 0) {
    console.log('💡 RECOMMENDATIONS:');
    report.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
    console.log('');
  }
  
  // Save report
  const fs = await import('fs').then(m => m.promises);
  const reportPath = `qa-report-${Date.now()}.json`;
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Report saved to: ${reportPath}`);
  
  return report;
}

// Export for use as module or run directly
export { runQAWorkflow, QAReport, QATest };

// Run if called directly
if (require.main === module) {
  runQAWorkflow()
    .then(report => {
      process.exit(report.overallStatus === 'FAIL' ? 1 : 0);
    })
    .catch(error => {
      console.error('💥 QA Workflow failed:', error);
      process.exit(1);
    });
}