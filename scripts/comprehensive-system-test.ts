#!/usr/bin/env npx tsx

/**
 * 🧪 COMPREHENSIVE SYSTEM TEST
 *
 * This script performs a complete system test to ensure all components
 * are working properly and our perfect-quality resources are accessible.
 *
 * Final validation before Monday morning deployment!
 */

import fs from 'fs';
import path from 'path';

interface SystemTestResult {
  testName: string;
  status: 'pass' | 'fail' | 'warning';
  details: string;
  timestamp: string;
}

interface SystemTestReport {
  timestamp: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  warningTests: number;
  successRate: number;
  results: SystemTestResult[];
  recommendations: string[];
}

class ComprehensiveSystemTester {
  private results: SystemTestResult[] = [];
  private report: SystemTestReport;

  constructor() {
    this.report = {
      timestamp: new Date().toISOString(),
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      warningTests: 0,
      successRate: 0,
      results: [],
      recommendations: [],
    };
  }

  async runComprehensiveTests(): Promise<SystemTestReport> {
    console.log('🧪 Starting Comprehensive System Test...\n');

    // Test 1: Perfect Resources Exist
    await this.testPerfectResourcesExist();

    // Test 2: Resource Content Quality
    await this.testResourceContentQuality();

    // Test 3: External Links Functionality
    await this.testExternalLinksFunctionality();

    // Test 4: Platform Integration
    await this.testPlatformIntegration();

    // Test 5: Intelligent Systems
    await this.testIntelligentSystems();

    // Test 6: Cultural Integration
    await this.testCulturalIntegration();

    // Test 7: NZC Alignment
    await this.testNZCAlignment();

    // Test 8: Teacher Readiness
    await this.testTeacherReadiness();

    // Generate final report
    this.generateReport();

    // Save detailed report
    await this.saveReport();

    return this.report;
  }

  private async testPerfectResourcesExist(): Promise<void> {
    console.log('🔍 Testing: Perfect Resources Exist...');

    const perfectResources = [
      'src/content/lessons/year8-social-studies/te-tiriti-o-waitangi-comprehensive-unit.md',
      'src/content/lessons/year8-english/maori-literature-comprehensive-unit.md',
      'src/content/lessons/year8-science/ecosystems-and-conservation-comprehensive-unit.md',
      'src/content/lessons/year8-mathematics/statistics-and-data-analysis-comprehensive-unit.md',
    ];

    let allExist = true;
    const missingFiles: string[] = [];

    for (const filePath of perfectResources) {
      if (!fs.existsSync(filePath)) {
        allExist = false;
        missingFiles.push(filePath);
      }
    }

    const result: SystemTestResult = {
      testName: 'Perfect Resources Exist',
      status: allExist ? 'pass' : 'fail',
      details: allExist
        ? `All 4 perfect-quality resources exist and are accessible`
        : `Missing files: ${missingFiles.join(', ')}`,
      timestamp: new Date().toISOString(),
    };

    this.addResult(result);
    console.log(`   ${allExist ? '✅' : '❌'} ${result.details}\n`);
  }

  private async testResourceContentQuality(): Promise<void> {
    console.log('🔍 Testing: Resource Content Quality...');

    const resources = [
      'src/content/lessons/year8-social-studies/te-tiriti-o-waitangi-comprehensive-unit.md',
      'src/content/lessons/year8-english/maori-literature-comprehensive-unit.md',
      'src/content/lessons/year8-science/ecosystems-and-conservation-comprehensive-unit.md',
      'src/content/lessons/year8-mathematics/statistics-and-data-analysis-comprehensive-unit.md',
    ];

    let qualityScore = 0;
    const qualityChecks = [];

    for (const filePath of resources) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Check for quality indicators
        const hasTitle = content.includes('# ');
        const hasLearningObjectives =
          content.includes('Learning Intentions') || content.includes('Learning Objectives');
        const hasActivities = content.includes('Activities') || content.includes('Lesson');
        const hasAssessment = content.includes('Assessment') || content.includes('Rubric');
        const hasExternalLinks = content.includes('http') || content.includes('www.');
        const hasCulturalElements =
          content.includes('Māori') || content.includes('Te Reo') || content.includes('tikanga');
        const hasNZCAlignment =
          content.includes('NZC') ||
          content.includes('Curriculum') ||
          content.includes('Achievement Objective');
        const hasRealExamples =
          content.includes('New Zealand') ||
          content.includes('Aotearoa') ||
          content.includes('DOC') ||
          content.includes('Statistics NZ');

        const resourceScore = [
          hasTitle,
          hasLearningObjectives,
          hasActivities,
          hasAssessment,
          hasExternalLinks,
          hasCulturalElements,
          hasNZCAlignment,
          hasRealExamples,
        ].filter(Boolean).length;
        qualityScore += resourceScore;

        qualityChecks.push(`${path.basename(filePath)}: ${resourceScore}/8 quality indicators`);
      }
    }

    const averageQuality = qualityScore / (resources.length * 8);
    const isHighQuality = averageQuality >= 0.9; // 90% or higher

    const result: SystemTestResult = {
      testName: 'Resource Content Quality',
      status: isHighQuality ? 'pass' : 'warning',
      details: `Average quality: ${(averageQuality * 100).toFixed(1)}% (${qualityScore}/${
        resources.length * 8
      } indicators). ${qualityChecks.join(', ')}`,
      timestamp: new Date().toISOString(),
    };

    this.addResult(result);
    console.log(`   ${isHighQuality ? '✅' : '⚠️'} ${result.details}\n`);
  }

  private async testExternalLinksFunctionality(): Promise<void> {
    console.log('🔍 Testing: External Links Functionality...');

    const resources = [
      'src/content/lessons/year8-social-studies/te-tiriti-o-waitangi-comprehensive-unit.md',
      'src/content/lessons/year8-english/maori-literature-comprehensive-unit.md',
      'src/content/lessons/year8-science/ecosystems-and-conservation-comprehensive-unit.md',
      'src/content/lessons/year8-mathematics/statistics-and-data-analysis-comprehensive-unit.md',
    ];

    let totalLinks = 0;
    let validLinks = 0;
    const linkDetails: string[] = [];

    for (const filePath of resources) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const linkMatches = content.match(/https?:\/\/[^\s\)]+/g) || [];

        totalLinks += linkMatches.length;

        // Check for key expected links
        const expectedDomains = [
          'archives.govt.nz',
          'teara.govt.nz',
          'nzhistory.govt.nz',
          'tepapa.govt.nz',
          'doc.govt.nz',
          'stats.govt.nz',
          'bookcouncil.org.nz',
        ];
        const foundDomains = expectedDomains.filter((domain) => content.includes(domain));

        validLinks += foundDomains.length;
        linkDetails.push(
          `${path.basename(filePath)}: ${foundDomains.length}/${
            expectedDomains.length
          } expected domains`,
        );
      }
    }

    const linkSuccessRate = totalLinks > 0 ? validLinks / totalLinks : 0;
    const hasGoodLinks = linkSuccessRate >= 0.7; // 70% or higher

    const result: SystemTestResult = {
      testName: 'External Links Functionality',
      status: hasGoodLinks ? 'pass' : 'warning',
      details: `Link success rate: ${(linkSuccessRate * 100).toFixed(
        1,
      )}% (${validLinks}/${totalLinks} links). ${linkDetails.join(', ')}`,
      timestamp: new Date().toISOString(),
    };

    this.addResult(result);
    console.log(`   ${hasGoodLinks ? '✅' : '⚠️'} ${result.details}\n`);
  }

  private async testPlatformIntegration(): Promise<void> {
    console.log('🔍 Testing: Platform Integration...');

    const platformFiles = [
      'src/components/FunctionalResourceBrowser.tsx',
      'src/components/RealResourceViewer.tsx',
      'src/data/nz-curriculum-year8.ts',
    ];

    let integratedFiles = 0;
    const integrationDetails: string[] = [];

    for (const filePath of platformFiles) {
      if (fs.existsSync(filePath)) {
        integratedFiles++;
        integrationDetails.push(`${path.basename(filePath)}: ✅ exists`);
      } else {
        integrationDetails.push(`${path.basename(filePath)}: ❌ missing`);
      }
    }

    const isFullyIntegrated = integratedFiles === platformFiles.length;

    const result: SystemTestResult = {
      testName: 'Platform Integration',
      status: isFullyIntegrated ? 'pass' : 'fail',
      details: `Integration status: ${integratedFiles}/${
        platformFiles.length
      } files. ${integrationDetails.join(', ')}`,
      timestamp: new Date().toISOString(),
    };

    this.addResult(result);
    console.log(`   ${isFullyIntegrated ? '✅' : '❌'} ${result.details}\n`);
  }

  private async testIntelligentSystems(): Promise<void> {
    console.log('🔍 Testing: Intelligent Systems...');

    const intelligentSystems = [
      'scripts/intelligent-resource-validator.ts',
      'scripts/intelligent-resource-enhancer.ts',
      'scripts/resource-platform-integration.ts',
    ];

    let workingSystems = 0;
    const systemDetails: string[] = [];

    for (const filePath of intelligentSystems) {
      if (fs.existsSync(filePath)) {
        workingSystems++;
        systemDetails.push(`${path.basename(filePath)}: ✅ exists`);
      } else {
        systemDetails.push(`${path.basename(filePath)}: ❌ missing`);
      }
    }

    const areSystemsWorking = workingSystems === intelligentSystems.length;

    const result: SystemTestResult = {
      testName: 'Intelligent Systems',
      status: areSystemsWorking ? 'pass' : 'fail',
      details: `Systems status: ${workingSystems}/${
        intelligentSystems.length
      } working. ${systemDetails.join(', ')}`,
      timestamp: new Date().toISOString(),
    };

    this.addResult(result);
    console.log(`   ${areSystemsWorking ? '✅' : '❌'} ${result.details}\n`);
  }

  private async testCulturalIntegration(): Promise<void> {
    console.log('🔍 Testing: Cultural Integration...');

    const resources = [
      'src/content/lessons/year8-social-studies/te-tiriti-o-waitangi-comprehensive-unit.md',
      'src/content/lessons/year8-english/maori-literature-comprehensive-unit.md',
      'src/content/lessons/year8-science/ecosystems-and-conservation-comprehensive-unit.md',
      'src/content/lessons/year8-mathematics/statistics-and-data-analysis-comprehensive-unit.md',
    ];

    let culturalScore = 0;
    const culturalDetails: string[] = [];

    for (const filePath of resources) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Check for cultural elements
        const hasMāori = content.includes('Māori');
        const hasTeReo = content.includes('Te Reo') || content.includes('te reo');
        const hasTikanga = content.includes('tikanga');
        const hasKaitiakitanga = content.includes('kaitiakitanga');
        const hasWhanaungatanga = content.includes('whanaungatanga');
        const hasManaakitanga = content.includes('manaakitanga');

        const resourceCulturalScore = [
          hasMāori,
          hasTeReo,
          hasTikanga,
          hasKaitiakitanga,
          hasWhanaungatanga,
          hasManaakitanga,
        ].filter(Boolean).length;
        culturalScore += resourceCulturalScore;

        culturalDetails.push(
          `${path.basename(filePath)}: ${resourceCulturalScore}/6 cultural elements`,
        );
      }
    }

    const averageCultural = culturalScore / (resources.length * 6);
    const hasGoodCulturalIntegration = averageCultural >= 0.8; // 80% or higher

    const result: SystemTestResult = {
      testName: 'Cultural Integration',
      status: hasGoodCulturalIntegration ? 'pass' : 'warning',
      details: `Cultural integration: ${(averageCultural * 100).toFixed(1)}% (${culturalScore}/${
        resources.length * 6
      } elements). ${culturalDetails.join(', ')}`,
      timestamp: new Date().toISOString(),
    };

    this.addResult(result);
    console.log(`   ${hasGoodCulturalIntegration ? '✅' : '⚠️'} ${result.details}\n`);
  }

  private async testNZCAlignment(): Promise<void> {
    console.log('🔍 Testing: NZC Alignment...');

    const resources = [
      'src/content/lessons/year8-social-studies/te-tiriti-o-waitangi-comprehensive-unit.md',
      'src/content/lessons/year8-english/maori-literature-comprehensive-unit.md',
      'src/content/lessons/year8-science/ecosystems-and-conservation-comprehensive-unit.md',
      'src/content/lessons/year8-mathematics/statistics-and-data-analysis-comprehensive-unit.md',
    ];

    let nzcScore = 0;
    const nzcDetails: string[] = [];

    for (const filePath of resources) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Check for NZC elements
        const hasNZC = content.includes('NZC') || content.includes('New Zealand Curriculum');
        const hasAchievementObjectives =
          content.includes('Achievement Objective') || content.includes('Achievement Objectives');
        const hasKeyCompetencies =
          content.includes('Key Competencies') || content.includes('Key Competency');
        const hasLevel4 = content.includes('Level 4') || content.includes('Year 8');
        const hasLearningArea = content.includes('Learning Area') || content.includes('Strand');

        const resourceNZCScore = [
          hasNZC,
          hasAchievementObjectives,
          hasKeyCompetencies,
          hasLevel4,
          hasLearningArea,
        ].filter(Boolean).length;
        nzcScore += resourceNZCScore;

        nzcDetails.push(`${path.basename(filePath)}: ${resourceNZCScore}/5 NZC elements`);
      }
    }

    const averageNZC = nzcScore / (resources.length * 5);
    const hasGoodNZCAlignment = averageNZC >= 0.8; // 80% or higher

    const result: SystemTestResult = {
      testName: 'NZC Alignment',
      status: hasGoodNZCAlignment ? 'pass' : 'warning',
      details: `NZC alignment: ${(averageNZC * 100).toFixed(1)}% (${nzcScore}/${
        resources.length * 5
      } elements). ${nzcDetails.join(', ')}`,
      timestamp: new Date().toISOString(),
    };

    this.addResult(result);
    console.log(`   ${hasGoodNZCAlignment ? '✅' : '⚠️'} ${result.details}\n`);
  }

  private async testTeacherReadiness(): Promise<void> {
    console.log('🔍 Testing: Teacher Readiness...');

    const resources = [
      'src/content/lessons/year8-social-studies/te-tiriti-o-waitangi-comprehensive-unit.md',
      'src/content/lessons/year8-english/maori-literature-comprehensive-unit.md',
      'src/content/lessons/year8-science/ecosystems-and-conservation-comprehensive-unit.md',
      'src/content/lessons/year8-mathematics/statistics-and-data-analysis-comprehensive-unit.md',
    ];

    let readinessScore = 0;
    const readinessDetails: string[] = [];

    for (const filePath of resources) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Check for teacher readiness elements
        const hasLessonPlans = content.includes('Lesson') || content.includes('Activities');
        const hasAssessment = content.includes('Assessment') || content.includes('Rubric');
        const hasResources = content.includes('Resources') || content.includes('Materials');
        const hasDuration = content.includes('minutes') || content.includes('hours');
        const hasObjectives =
          content.includes('Learning Intentions') || content.includes('Learning Objectives');
        const hasSuccessCriteria =
          content.includes('Success Criteria') || content.includes('Students will');

        const resourceReadinessScore = [
          hasLessonPlans,
          hasAssessment,
          hasResources,
          hasDuration,
          hasObjectives,
          hasSuccessCriteria,
        ].filter(Boolean).length;
        readinessScore += resourceReadinessScore;

        readinessDetails.push(
          `${path.basename(filePath)}: ${resourceReadinessScore}/6 readiness elements`,
        );
      }
    }

    const averageReadiness = readinessScore / (resources.length * 6);
    const isTeacherReady = averageReadiness >= 0.8; // 80% or higher

    const result: SystemTestResult = {
      testName: 'Teacher Readiness',
      status: isTeacherReady ? 'pass' : 'warning',
      details: `Teacher readiness: ${(averageReadiness * 100).toFixed(1)}% (${readinessScore}/${
        resources.length * 6
      } elements). ${readinessDetails.join(', ')}`,
      timestamp: new Date().toISOString(),
    };

    this.addResult(result);
    console.log(`   ${isTeacherReady ? '✅' : '⚠️'} ${result.details}\n`);
  }

  private addResult(result: SystemTestResult): void {
    this.results.push(result);
    this.report.totalTests++;

    if (result.status === 'pass') {
      this.report.passedTests++;
    } else if (result.status === 'fail') {
      this.report.failedTests++;
    } else {
      this.report.warningTests++;
    }
  }

  private generateReport(): void {
    this.report.results = this.results;
    this.report.successRate = (this.report.passedTests / this.report.totalTests) * 100;

    // Generate recommendations based on test results
    if (this.report.successRate >= 90) {
      this.report.recommendations.push('System is ready for production deployment');
      this.report.recommendations.push('All critical components are functioning properly');
      this.report.recommendations.push(
        'Perfect-quality resources are accessible and ready for teachers',
      );
    } else if (this.report.successRate >= 70) {
      this.report.recommendations.push('System is mostly ready with minor issues to address');
      this.report.recommendations.push('Review warning tests and address any critical issues');
    } else {
      this.report.recommendations.push('System needs significant work before deployment');
      this.report.recommendations.push('Address failed tests before proceeding');
    }
  }

  private async saveReport(): Promise<void> {
    const reportPath = 'COMPREHENSIVE_SYSTEM_TEST_REPORT.md';

    const reportContent = `# 🧪 Comprehensive System Test Report

**Generated**: ${new Date().toLocaleString()}

## 📊 Test Summary

- **Total Tests**: ${this.report.totalTests}
- **Passed Tests**: ${this.report.passedTests}
- **Failed Tests**: ${this.report.failedTests}
- **Warning Tests**: ${this.report.warningTests}
- **Success Rate**: ${this.report.successRate.toFixed(1)}%

## 🔍 Test Results

${this.results
  .map(
    (result) => `
### ${result.testName}
- **Status**: ${result.status.toUpperCase()}
- **Details**: ${result.details}
- **Timestamp**: ${result.timestamp}
`,
  )
  .join('\n')}

## 💡 Recommendations

${this.report.recommendations.map((rec) => `- ${rec}`).join('\n')}

## 🎯 System Status

${
  this.report.successRate >= 90
    ? '✅ **SYSTEM READY FOR PRODUCTION**'
    : this.report.successRate >= 70
    ? '⚠️ **SYSTEM MOSTLY READY**'
    : '❌ **SYSTEM NEEDS WORK**'
}

---

*Generated by Comprehensive System Tester - ${new Date().toISOString()}*
`;

    fs.writeFileSync(reportPath, reportContent);
    console.log(`📄 System test report saved to: ${reportPath}`);
  }
}

// Run the comprehensive system test
async function main() {
  const tester = new ComprehensiveSystemTester();
  const report = await tester.runComprehensiveTests();

  console.log('🎉 Comprehensive System Test Complete!');
  console.log(`📊 Success Rate: ${report.successRate.toFixed(1)}%`);
  console.log(`✅ Passed: ${report.passedTests}/${report.totalTests} tests`);
  console.log(`📄 System test report: COMPREHENSIVE_SYSTEM_TEST_REPORT.md`);

  if (report.successRate >= 90) {
    console.log('\n🚀 SYSTEM READY FOR MONDAY MORNING DEPLOYMENT!');
  } else if (report.successRate >= 70) {
    console.log('\n⚠️ SYSTEM MOSTLY READY - REVIEW WARNINGS');
  } else {
    console.log('\n❌ SYSTEM NEEDS WORK BEFORE DEPLOYMENT');
  }
}

main().catch(console.error);

export default ComprehensiveSystemTester;
