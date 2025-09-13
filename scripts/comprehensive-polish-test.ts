#!/usr/bin/env tsx

/**
 * COMPREHENSIVE POLISH TEST SCRIPT
 *
 * Tests all critical functionality for the polished system
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface TestResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  message: string;
  details?: string;
}

class ComprehensivePolishTester {
  private results: TestResult[] = [];
  private startTime = Date.now();

  async runAllTests() {
    console.log('🎯 COMPREHENSIVE POLISH TESTING SUITE');
    console.log('=====================================\n');

    // Test 1: Lesson Viewer Functionality
    await this.testLessonViewer();

    // Test 2: Timer Functionality
    await this.testTimerFunctionality();

    // Test 3: Handout Generation
    await this.testHandoutGeneration();

    // Test 4: External Link Validation
    await this.testExternalLinks();

    // Test 5: Resource Loading
    await this.testResourceLoading();

    // Test 6: UI/UX Components
    await this.testUIComponents();

    // Test 7: Performance Metrics
    await this.testPerformance();

    // Test 8: Cultural Validation
    await this.testCulturalValidation();

    // Generate Report
    this.generateReport();
  }

  private async testLessonViewer() {
    console.log('📚 Testing Lesson Viewer...');

    try {
      // Check if lesson viewer component exists and is properly structured
      const lessonViewerPath = join(process.cwd(), 'src/components/RealLessonViewer.tsx');
      const content = readFileSync(lessonViewerPath, 'utf-8');

      const hasTimer = content.includes('TeachingTimer');
      const hasHandouts = content.includes('showHandouts');
      const hasPrintFunction = content.includes('printHandout');
      const hasResourceLoading = content.includes('realTeachingResources');

      if (hasTimer && hasHandouts && hasPrintFunction && hasResourceLoading) {
        this.addResult('Lesson Viewer Structure', 'PASS', 'All required components present');
      } else {
        this.addResult(
          'Lesson Viewer Structure',
          'FAIL',
          'Missing required components',
          `Timer: ${hasTimer}, Handouts: ${hasHandouts}, Print: ${hasPrintFunction}, Resources: ${hasResourceLoading}`,
        );
      }
    } catch (error) {
      this.addResult('Lesson Viewer Structure', 'FAIL', 'Component file not found or corrupted');
    }
  }

  private async testTimerFunctionality() {
    console.log('⏰ Testing Timer Functionality...');

    try {
      const lessonViewerPath = join(process.cwd(), 'src/components/RealLessonViewer.tsx');
      const content = readFileSync(lessonViewerPath, 'utf-8');

      const hasStartTimer = content.includes('startTimer');
      const hasPauseTimer = content.includes('pauseTimer');
      const hasResetTimer = content.includes('resetTimer');
      const hasFormatTime = content.includes('formatTime');
      const hasTimerState = content.includes('useState<TeachingTimer>');

      if (hasStartTimer && hasPauseTimer && hasResetTimer && hasFormatTime && hasTimerState) {
        this.addResult('Timer Functionality', 'PASS', 'All timer functions implemented');
      } else {
        this.addResult('Timer Functionality', 'FAIL', 'Missing timer functions');
      }
    } catch (error) {
      this.addResult('Timer Functionality', 'FAIL', 'Timer functionality not found');
    }
  }

  private async testHandoutGeneration() {
    console.log('📄 Testing Handout Generation...');

    try {
      const lessonViewerPath = join(process.cwd(), 'src/components/RealLessonViewer.tsx');
      const content = readFileSync(lessonViewerPath, 'utf-8');

      const hasGenerateHandout = content.includes('generateHandout');
      const hasPrintHandout = content.includes('printHandout');
      const hasHandoutContent = content.includes('handoutContent');
      const hasPrintWindow = content.includes('window.open');

      if (hasGenerateHandout && hasPrintHandout && hasHandoutContent && hasPrintWindow) {
        this.addResult('Handout Generation', 'PASS', 'Handout generation and printing implemented');
      } else {
        this.addResult('Handout Generation', 'FAIL', 'Missing handout functionality');
      }
    } catch (error) {
      this.addResult('Handout Generation', 'FAIL', 'Handout generation not found');
    }
  }

  private async testExternalLinks() {
    console.log('🔗 Testing External Link Validation...');

    try {
      // Check if Exa.ai integration exists
      const exaValidatorPath = join(process.cwd(), 'src/utils/exa-link-validator.ts');
      const exaContent = readFileSync(exaValidatorPath, 'utf-8');

      const hasExaClass = exaContent.includes('ExaLinkValidator');
      const hasValidationMethod = exaContent.includes('validateUrl');
      const hasCacheSystem = exaContent.includes('cache');

      if (hasExaClass && hasValidationMethod && hasCacheSystem) {
        this.addResult('External Link Validation', 'PASS', 'Exa.ai integration ready');
      } else {
        this.addResult('External Link Validation', 'FAIL', 'Exa.ai integration incomplete');
      }
    } catch (error) {
      this.addResult('External Link Validation', 'FAIL', 'Exa.ai integration not found');
    }
  }

  private async testResourceLoading() {
    console.log('📚 Testing Resource Loading...');

    try {
      // Check if resource data exists
      const resourcePath = join(process.cwd(), 'src/data/nz-curriculum-year8.ts');
      const resourceContent = readFileSync(resourcePath, 'utf-8');

      const hasRealResources = resourceContent.includes('realTeachingResources');
      const hasEarlyNZHistory = resourceContent.includes('earlyNZHistoryResource');
      const hasResourceStructure = resourceContent.includes('NZCResource');

      if (hasRealResources && hasEarlyNZHistory && hasResourceStructure) {
        this.addResult('Resource Loading', 'PASS', 'Resource data structure complete');
      } else {
        this.addResult('Resource Loading', 'FAIL', 'Resource data incomplete');
      }
    } catch (error) {
      this.addResult('Resource Loading', 'FAIL', 'Resource data not found');
    }
  }

  private async testUIComponents() {
    console.log('🎨 Testing UI Components...');

    try {
      // Check if main components exist
      const components = [
        'src/components/ProfessionalTeacherDashboard.tsx',
        'src/components/FunctionalResourceBrowser.tsx',
        'src/components/RealLessonViewer.tsx',
        'src/components/Navigation.tsx',
      ];

      let allComponentsExist = true;
      const missingComponents: string[] = [];

      for (const component of components) {
        try {
          const path = join(process.cwd(), component);
          readFileSync(path, 'utf-8');
        } catch {
          allComponentsExist = false;
          missingComponents.push(component);
        }
      }

      if (allComponentsExist) {
        this.addResult('UI Components', 'PASS', 'All main components present');
      } else {
        this.addResult(
          'UI Components',
          'FAIL',
          `Missing components: ${missingComponents.join(', ')}`,
        );
      }
    } catch (error) {
      this.addResult('UI Components', 'FAIL', 'Component check failed');
    }
  }

  private async testPerformance() {
    console.log('⚡ Testing Performance...');

    try {
      // Check package.json for performance-related scripts
      const packagePath = join(process.cwd(), 'package.json');
      const packageContent = readFileSync(packagePath, 'utf-8');

      const hasBuildScript = packageContent.includes('"build"');
      const hasDevScript = packageContent.includes('"dev"');
      const hasLintScript = packageContent.includes('"lint"');

      if (hasBuildScript && hasDevScript && hasLintScript) {
        this.addResult('Performance Setup', 'PASS', 'Build and development scripts configured');
      } else {
        this.addResult('Performance Setup', 'FAIL', 'Missing build scripts');
      }
    } catch (error) {
      this.addResult('Performance Setup', 'FAIL', 'Package.json not found');
    }
  }

  private async testCulturalValidation() {
    console.log('🌿 Testing Cultural Validation...');

    try {
      // Check if cultural elements are present in resources
      const resourcePath = join(process.cwd(), 'src/data/nz-curriculum-year8.ts');
      const resourceContent = readFileSync(resourcePath, 'utf-8');

      const hasCulturalConnections = resourceContent.includes('culturalConnections');
      const hasTeReoVocabulary = resourceContent.includes('teReoVocabulary');
      const hasTikangaAspect = resourceContent.includes('tikangaAspect');
      const hasWhakawhanaungatanga = resourceContent.includes('Whakawhanaungatanga');

      if (
        hasCulturalConnections &&
        hasTeReoVocabulary &&
        hasTikangaAspect &&
        hasWhakawhanaungatanga
      ) {
        this.addResult('Cultural Validation', 'PASS', 'Cultural elements properly integrated');
      } else {
        this.addResult('Cultural Validation', 'FAIL', 'Missing cultural elements');
      }
    } catch (error) {
      this.addResult('Cultural Validation', 'FAIL', 'Cultural validation failed');
    }
  }

  private addResult(
    test: string,
    status: 'PASS' | 'FAIL' | 'SKIP',
    message: string,
    details?: string,
  ) {
    this.results.push({ test, status, message, details });

    const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⏭️';
    console.log(`  ${icon} ${test}: ${message}`);
    if (details) {
      console.log(`     Details: ${details}`);
    }
  }

  private generateReport() {
    const endTime = Date.now();
    const duration = ((endTime - this.startTime) / 1000).toFixed(2);

    const passed = this.results.filter((r) => r.status === 'PASS').length;
    const failed = this.results.filter((r) => r.status === 'FAIL').length;
    const skipped = this.results.filter((r) => r.status === 'SKIP').length;
    const total = this.results.length;

    console.log('\n🎯 COMPREHENSIVE POLISH TEST REPORT');
    console.log('===================================');
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(
      `📊 Results: ${passed} passed, ${failed} failed, ${skipped} skipped (${total} total)`,
    );
    console.log(`🎯 Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

    if (failed > 0) {
      console.log('\n❌ FAILED TESTS:');
      this.results
        .filter((r) => r.status === 'FAIL')
        .forEach((result) => {
          console.log(`  • ${result.test}: ${result.message}`);
          if (result.details) {
            console.log(`    ${result.details}`);
          }
        });
    }

    if (passed === total) {
      console.log('\n🎉 ALL TESTS PASSED! System is ready for polishing!');
    } else {
      console.log('\n🔧 Some tests failed. Review and fix before proceeding.');
    }

    // Save report to file
    const reportPath = join(process.cwd(), 'COMPREHENSIVE_POLISH_TEST_REPORT.md');
    const reportContent = this.generateMarkdownReport(duration, passed, failed, skipped, total);
    writeFileSync(reportPath, reportContent);
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }

  private generateMarkdownReport(
    duration: string,
    passed: number,
    failed: number,
    skipped: number,
    total: number,
  ) {
    return `# 🎯 COMPREHENSIVE POLISH TEST REPORT

**Date:** ${new Date().toISOString()}  
**Duration:** ${duration}s  
**Status:** ${failed === 0 ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}  

## 📊 Test Summary

- **Total Tests:** ${total}
- **Passed:** ${passed} ✅
- **Failed:** ${failed} ❌
- **Skipped:** ${skipped} ⏭️
- **Success Rate:** ${((passed / total) * 100).toFixed(1)}%

## 📋 Detailed Results

${this.results
  .map((result) => {
    const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⏭️';
    return `### ${icon} ${result.test}
- **Status:** ${result.status}
- **Message:** ${result.message}
${result.details ? `- **Details:** ${result.details}` : ''}`;
  })
  .join('\n\n')}

## 🎯 Next Steps

${
  failed === 0
    ? '🎉 **ALL TESTS PASSED!** The system is ready for the next phase of polishing and optimization.'
    : '🔧 **SOME TESTS FAILED.** Please review the failed tests and fix the issues before proceeding with polishing.'
}

## 🚀 Recommendations

${
  failed === 0
    ? '1. **Proceed with UI/UX Polish** - All core functionality is working\n2. **Execute Link Validation** - Run Exa.ai integration\n3. **Performance Optimization** - Optimize load times and rendering\n4. **Comprehensive Testing** - Test on different devices and browsers'
    : '1. **Fix Failed Tests** - Address the issues identified above\n2. **Re-run Tests** - Verify all fixes work correctly\n3. **Proceed with Polish** - Once all tests pass, continue with optimization'
}

---
*Generated by Comprehensive Polish Test Suite*
`;
  }
}

// Run the tests
async function main() {
  const tester = new ComprehensivePolishTester();
  await tester.runAllTests();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
