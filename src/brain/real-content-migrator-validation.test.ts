/**
 * RealContentMigrator Validation Tests
 * 
 * Comprehensive test suite for the optimized RealContentMigrator system
 * ensuring both performance improvements and cultural safety preservation.
 * 
 * Tests verify:
 * - Performance targets (100+ resources/day)
 * - Cultural safety protocol maintenance
 * - System stability under load
 * - Intelligent content routing
 * - Episode batching functionality
 */

import { RealContentMigrator, EducationalResource, MigrationResult } from './real-content-migrator';
import { TeKeteAkoMigrationBrain } from './migration-intelligence';
import { DiplomaticMigration } from './kaitiaki-protocol';

// Test configuration constants
const TEST_CONFIG = {
  PERFORMANCE_TARGET_RESOURCES_PER_SECOND: 1.16, // 100+ resources/day
  CULTURAL_SAFETY_MINIMUM_SCORE: 0.8,
  SUCCESS_RATE_MINIMUM: 0.95,
  BATCH_SIZE_DEFAULT: 5,
  CULTURAL_ROUTING_THRESHOLD: 0.5,
  LOAD_TEST_RESOURCE_COUNT: 500,
  PERFORMANCE_TEST_RESOURCE_COUNT: 100
};

// Mock implementations for controlled testing
class MockTeKeteAkoMigrationBrain extends TeKeteAkoMigrationBrain {
  async analyzeMigrationTask(resource: EducationalResource): Promise<any> {
    const culturalScore = resource.cultural_elements ? 0.85 : 0.95;
    return {
      culturalSafetyScore: culturalScore,
      riskAssessment: { overall: 'low' },
      recommendations: ['Standard processing recommendations'],
      insights: resource.cultural_elements ? [{ type: 'cultural' }] : [{ type: 'standard' }]
    };
  }
}

class MockDiplomaticMigration extends DiplomaticMigration {
  async validateCulturalMigration(resource: EducationalResource): Promise<any> {
    const requiresConsultation = resource.cultural_elements?.sacred_content || 
                                resource.cultural_elements?.consultation_required;
    return {
      approved: !requiresConsultation,
      guidance: requiresConsultation ? ['Iwi consultation required'] : []
    };
  }
}

// Test data generators
function createTestResource(
  id: string, 
  type: EducationalResource['type'] = 'handout', 
  culturalElements?: EducationalResource['cultural_elements']
): EducationalResource {
  return {
    id,
    title: `Test Resource ${id}`,
    type,
    level: 'Y8',
    curriculum_areas: ['Mathematics'],
    content: `Test content for resource ${id}`,
    cultural_elements: culturalElements,
    metadata: {
      author: 'Test Author',
      created: new Date().toISOString(),
      last_modified: new Date().toISOString()
    }
  };
}

function createCulturalTestResource(id: string, sacred: boolean = false): EducationalResource {
  return createTestResource(id, 'cultural_content', {
    te_reo_maori: true,
    tikanga_maori: true,
    iwi_specific: false,
    sacred_content: sacred,
    consultation_required: sacred
  });
}

function createSacredTestResource(id: string): EducationalResource {
  return createTestResource(id, 'purakau', {
    te_reo_maori: true,
    tikanga_maori: true,
    iwi_specific: true,
    sacred_content: true,
    consultation_required: true
  });
}

function createLargeTestDataset(count: number): EducationalResource[] {
  const resources: EducationalResource[] = [];
  
  for (let i = 0; i < count; i++) {
    const isCultural = i % 3 === 0; // 33% cultural content
    const isSacred = i % 10 === 0; // 10% sacred content
    
    if (isSacred) {
      resources.push(createSacredTestResource(`sacred_${i}`));
    } else if (isCultural) {
      resources.push(createCulturalTestResource(`cultural_${i}`));
    } else {
      resources.push(createTestResource(`standard_${i}`));
    }
  }
  
  return resources;
}

// Test class implementation
class RealContentMigratorValidationTests {
  private migrator: RealContentMigrator;

  constructor() {
    this.migrator = new RealContentMigrator();
    // Replace with mocks for controlled testing
    (this.migrator as any).migrationBrain = new MockTeKeteAkoMigrationBrain();
    (this.migrator as any).diplomacy = new MockDiplomaticMigration();
  }

  /**
   * RCM-01: Parallel Batch Processing Performance Verification
   */
  async testParallelBatchProcessingPerformance(): Promise<{
    passed: boolean;
    metrics: any;
    details: string;
  }> {
    console.log('🚀 RCM-01: Testing parallel batch processing performance...');

    const testResources = createLargeTestDataset(TEST_CONFIG.PERFORMANCE_TEST_RESOURCE_COUNT);
    const startTime = Date.now();

    try {
      const result = await this.migrator.migrateBatch(testResources);
      const endTime = Date.now();
      
      const processingTime = (endTime - startTime) / 1000; // seconds
      const throughput = result.total / processingTime;
      const dailyThroughput = throughput * 86400; // 24 hours
      
      const passed = throughput >= TEST_CONFIG.PERFORMANCE_TARGET_RESOURCES_PER_SECOND &&
                     result.successful / result.total >= TEST_CONFIG.SUCCESS_RATE_MINIMUM;

      return {
        passed,
        metrics: {
          processingTime,
          throughput,
          dailyThroughput,
          successRate: result.successful / result.total,
          totalProcessed: result.total
        },
        details: `Throughput: ${throughput.toFixed(2)} res/sec, Daily: ${Math.round(dailyThroughput)} res/day`
      };
    } catch (error) {
      return {
        passed: false,
        metrics: {},
        details: `Test failed with error: ${error}`
      };
    }
  }

  /**
   * RCM-02: Cultural Safety Protocol Validation During Optimization
   */
  async testCulturalSafetyProtocolValidation(): Promise<{
    passed: boolean;
    metrics: any;
    details: string;
  }> {
    console.log('🎭 RCM-02: Testing cultural safety protocol validation...');

    const testResources = [
      createSacredTestResource('sacred_test'),
      createCulturalTestResource('cultural_test'),
      createTestResource('standard_test')
    ];

    try {
      const results: MigrationResult[] = [];
      for (const resource of testResources) {
        const result = await this.migrator.migrateEducationalResource(resource);
        results.push(result);
      }

      // Verify cultural safety requirements
      const sacredResult = results.find(r => r.resource_id === 'sacred_test');
      const culturalResult = results.find(r => r.resource_id === 'cultural_test');
      const standardResult = results.find(r => r.resource_id === 'standard_test');

      const sacredPassed = sacredResult && 
                          sacredResult.cultural_safety_score >= TEST_CONFIG.CULTURAL_SAFETY_MINIMUM_SCORE &&
                          sacredResult.issues_detected.some(issue => issue.includes('Sacred content'));

      const culturalPassed = culturalResult &&
                            culturalResult.cultural_safety_score >= TEST_CONFIG.CULTURAL_SAFETY_MINIMUM_SCORE;

      const standardPassed = standardResult && standardResult.success;

      const passed = !!(sacredPassed && culturalPassed && standardPassed);

      return {
        passed,
        metrics: {
          sacredContentSafetyScore: sacredResult?.cultural_safety_score || 0,
          culturalContentSafetyScore: culturalResult?.cultural_safety_score || 0,
          standardContentSafetyScore: standardResult?.cultural_safety_score || 0,
          sacredContentFlagged: sacredResult?.issues_detected.length || 0
        },
        details: `Sacred: ${sacredPassed}, Cultural: ${culturalPassed}, Standard: ${standardPassed}`
      };
    } catch (error) {
      return {
        passed: false,
        metrics: {},
        details: `Test failed with error: ${error}`
      };
    }
  }

  /**
   * RCM-03: Episode Batching Functionality Testing
   */
  async testEpisodeBatchingFunctionality(): Promise<{
    passed: boolean;
    metrics: any;
    details: string;
  }> {
    console.log('📝 RCM-03: Testing episode batching functionality...');

    const testResources = createLargeTestDataset(25); // Generate enough for batching
    let episodeCount = 0;

    // Mock episode writing to count episodes
    const originalFlushBatch = (this.migrator as any).flushEpisodeBatch;
    (this.migrator as any).flushEpisodeBatch = async function() {
      episodeCount += this.episodeBatch.length;
      this.episodeBatch = [];
    };

    try {
      await this.migrator.migrateBatch(testResources);
      
      // Restore original method
      (this.migrator as any).flushEpisodeBatch = originalFlushBatch;

      const metrics = this.migrator.getPerformanceMetrics();
      const passed = episodeCount >= testResources.length; // Should have at least one episode per resource

      return {
        passed,
        metrics: {
          episodeCount,
          resourceCount: testResources.length,
          episodesQueued: metrics.episodesQueued
        },
        details: `Episodes processed: ${episodeCount}, Resources: ${testResources.length}`
      };
    } catch (error) {
      return {
        passed: false,
        metrics: {},
        details: `Test failed with error: ${error}`
      };
    }
  }

  /**
   * RCM-04: Intelligent Routing of Cultural vs Standard Content
   */
  async testIntelligentContentRouting(): Promise<{
    passed: boolean;
    metrics: any;
    details: string;
  }> {
    console.log('🎯 RCM-04: Testing intelligent content routing...');

    const testResources = [
      ...Array.from({ length: 10 }, (_, i) => createTestResource(`standard_${i}`)),
      ...Array.from({ length: 10 }, (_, i) => createCulturalTestResource(`cultural_${i}`)),
      ...Array.from({ length: 5 }, (_, i) => createSacredTestResource(`sacred_${i}`))
    ];

    try {
      // Test the routing logic directly
      const routingMethod = (this.migrator as any).routeContentByCulturalComplexity.bind(this.migrator);
      const { culturalContent, standardContent } = routingMethod(testResources);

      // Verify routing decisions
      const culturalCount = culturalContent.length;
      const standardCount = standardContent.length;
      const totalCount = testResources.length;

      // Cultural content should include all cultural and sacred resources
      const expectedCulturalCount = 15; // 10 cultural + 5 sacred
      const expectedStandardCount = 10;

      const passed = culturalCount === expectedCulturalCount && 
                     standardCount === expectedStandardCount &&
                     (culturalCount + standardCount) === totalCount;

      return {
        passed,
        metrics: {
          culturalCount,
          standardCount,
          totalCount,
          routingAccuracy: passed ? 100 : 0
        },
        details: `Cultural: ${culturalCount}/${expectedCulturalCount}, Standard: ${standardCount}/${expectedStandardCount}`
      };
    } catch (error) {
      return {
        passed: false,
        metrics: {},
        details: `Test failed with error: ${error}`
      };
    }
  }

  /**
   * RCM-05: Performance Metrics Accuracy Verification
   */
  async testPerformanceMetricsAccuracy(): Promise<{
    passed: boolean;
    metrics: any;
    details: string;
  }> {
    console.log('📊 RCM-05: Testing performance metrics accuracy...');

    const testResources = createLargeTestDataset(50);
    const culturalResourceCount = testResources.filter(r => r.cultural_elements).length;
    const expectedCulturalRatio = culturalResourceCount / testResources.length;

    try {
      await this.migrator.migrateBatch(testResources);
      
      const metrics = this.migrator.getPerformanceMetrics();
      const insights = this.migrator.getMigrationInsights();

      // Verify metric accuracy
      const culturalRatioAccuracy = Math.abs(metrics.culturalContentRatio - expectedCulturalRatio) < 0.1;
      const throughputRealistic = metrics.throughputEstimate === testResources.length;
      const insightsAccurate = insights.totalProcessed === testResources.length;

      const passed = culturalRatioAccuracy && throughputRealistic && insightsAccurate;

      return {
        passed,
        metrics: {
          expectedCulturalRatio,
          actualCulturalRatio: metrics.culturalContentRatio,
          expectedThroughput: testResources.length,
          actualThroughput: metrics.throughputEstimate,
          insightsTotal: insights.totalProcessed
        },
        details: `Cultural ratio accuracy: ${culturalRatioAccuracy}, Throughput: ${throughputRealistic}`
      };
    } catch (error) {
      return {
        passed: false,
        metrics: {},
        details: `Test failed with error: ${error}`
      };
    }
  }

  /**
   * RCM-06: System Stability Under High Load Conditions
   */
  async testSystemStabilityUnderLoad(): Promise<{
    passed: boolean;
    metrics: any;
    details: string;
  }> {
    console.log('🏋️ RCM-06: Testing system stability under load...');

    const testResources = createLargeTestDataset(TEST_CONFIG.LOAD_TEST_RESOURCE_COUNT);
    const startMemory = process.memoryUsage();
    let memoryStable = true;
    let errorCount = 0;

    try {
      const result = await this.migrator.migrateBatch(testResources);
      
      const endMemory = process.memoryUsage();
      const memoryIncrease = (endMemory.heapUsed - startMemory.heapUsed) / (1024 * 1024); // MB
      
      // Consider memory stable if increase is less than 50MB for large dataset
      memoryStable = memoryIncrease < 50;
      errorCount = result.failed;

      const successRate = result.successful / result.total;
      const culturalSafetyMaintained = result.results.every(r => 
        !r.migrated_content?.cultural_elements || r.cultural_safety_score >= TEST_CONFIG.CULTURAL_SAFETY_MINIMUM_SCORE
      );

      const passed = memoryStable && 
                     successRate >= TEST_CONFIG.SUCCESS_RATE_MINIMUM && 
                     culturalSafetyMaintained;

      return {
        passed,
        metrics: {
          memoryIncreaseMB: memoryIncrease,
          successRate,
          errorCount,
          resourcesProcessed: result.total,
          culturalSafetyMaintained
        },
        details: `Memory: +${memoryIncrease.toFixed(2)}MB, Success: ${(successRate * 100).toFixed(1)}%`
      };
    } catch (error) {
      return {
        passed: false,
        metrics: { errorCount: 1 },
        details: `Load test failed with error: ${error}`
      };
    }
  }

  /**
   * RCM-07: Cultural Content Priority Preservation
   */
  async testCulturalContentPriorityPreservation(): Promise<{
    passed: boolean;
    metrics: any;
    details: string;
  }> {
    console.log('🏛️ RCM-07: Testing cultural content priority preservation...');

    const testResources = [
      createSacredTestResource('sacred_priority'),
      createCulturalTestResource('cultural_priority'),
      createTestResource('standard_1'),
      createTestResource('standard_2')
    ];

    try {
      const results: MigrationResult[] = [];
      for (const resource of testResources) {
        const result = await this.migrator.migrateEducationalResource(resource);
        results.push(result);
      }

      // Check that cultural content maintains high safety scores
      const culturalResults = results.filter(r => 
        r.resource_id.includes('sacred_') || r.resource_id.includes('cultural_')
      );

      const allCulturalSafe = culturalResults.every(r => 
        r.cultural_safety_score >= TEST_CONFIG.CULTURAL_SAFETY_MINIMUM_SCORE
      );

      const sacredContentFlagged = results.find(r => r.resource_id === 'sacred_priority')
        ?.issues_detected.some(issue => issue.includes('Sacred content')) || false;

      const passed = allCulturalSafe && sacredContentFlagged;

      return {
        passed,
        metrics: {
          culturalResourceCount: culturalResults.length,
          averageCulturalSafetyScore: culturalResults.reduce((sum, r) => sum + r.cultural_safety_score, 0) / culturalResults.length,
          sacredContentFlagged,
          allCulturalSafe
        },
        details: `Cultural safety maintained: ${allCulturalSafe}, Sacred flagged: ${sacredContentFlagged}`
      };
    } catch (error) {
      return {
        passed: false,
        metrics: {},
        details: `Test failed with error: ${error}`
      };
    }
  }

  /**
   * RCM-08: Throughput Target Achievement Validation
   */
  async testThroughputTargetAchievement(): Promise<{
    passed: boolean;
    metrics: any;
    details: string;
  }> {
    console.log('🎯 RCM-08: Testing throughput target achievement...');

    const testResources = createLargeTestDataset(TEST_CONFIG.PERFORMANCE_TEST_RESOURCE_COUNT);
    const startTime = Date.now();

    try {
      const result = await this.migrator.migrateBatch(testResources);
      const endTime = Date.now();

      const processingTime = (endTime - startTime) / 1000;
      const throughput = result.total / processingTime;
      const dailyThroughput = throughput * 86400;

      const targetAchieved = dailyThroughput >= 100;
      const throughputExceeded = throughput >= TEST_CONFIG.PERFORMANCE_TARGET_RESOURCES_PER_SECOND;

      return {
        passed: targetAchieved && throughputExceeded,
        metrics: {
          throughput,
          dailyThroughput,
          targetAchieved,
          processingTime,
          resourcesPerSecond: throughput
        },
        details: `Daily throughput: ${Math.round(dailyThroughput)} resources (target: 100+)`
      };
    } catch (error) {
      return {
        passed: false,
        metrics: {},
        details: `Test failed with error: ${error}`
      };
    }
  }

  /**
   * RCM-09: Error Handling and Failover Mechanisms
   */
  async testErrorHandlingAndFailover(): Promise<{
    passed: boolean;
    metrics: any;
    details: string;
  }> {
    console.log('🛡️ RCM-09: Testing error handling and failover mechanisms...');

    // Create resources that might cause errors
    const testResources = [
      createTestResource('normal_resource'),
      createCulturalTestResource('cultural_resource'),
      // Simulate error-prone resource
      { ...createTestResource('error_resource'), content: '' } // Empty content might cause issues
    ];

    try {
      const result = await this.migrator.migrateBatch(testResources);

      // System should handle errors gracefully
      const errorHandled = result.total === testResources.length; // All resources attempted
      const someSuccessful = result.successful > 0; // At least some succeeded
      const errorsReported = result.failed >= 0; // Error count is valid

      const passed = errorHandled && someSuccessful && errorsReported;

      return {
        passed,
        metrics: {
          totalAttempted: result.total,
          successful: result.successful,
          failed: result.failed,
          errorHandlingSuccess: errorHandled
        },
        details: `Handled ${result.total} resources, ${result.successful} successful, ${result.failed} failed`
      };
    } catch (error) {
      return {
        passed: false,
        metrics: {},
        details: `Error handling test failed: ${error}`
      };
    }
  }

  /**
   * RCM-10: Cultural Complexity Scoring Accuracy
   */
  async testCulturalComplexityScoring(): Promise<{
    passed: boolean;
    metrics: any;
    details: string;
  }> {
    console.log('🧮 RCM-10: Testing cultural complexity scoring accuracy...');

    const testResources = [
      createTestResource('standard_simple'), // Should score low
      createCulturalTestResource('cultural_medium'), // Should score medium-high
      createSacredTestResource('sacred_high'), // Should score very high
      createTestResource('standard_with_terms') // Standard with cultural terms
    ];

    // Add cultural terms to the last resource
    testResources[3].content = 'This lesson discusses whakapapa and mana in New Zealand context.';

    try {
      const complexityMethod = (this.migrator as any).calculateCulturalComplexity.bind(this.migrator);
      
      const scores = testResources.map(resource => ({
        id: resource.id,
        score: complexityMethod(resource)
      }));

      // Verify scoring logic
      const standardScore = scores.find(s => s.id === 'standard_simple')?.score || 0;
      const culturalScore = scores.find(s => s.id === 'cultural_medium')?.score || 0;
      const sacredScore = scores.find(s => s.id === 'sacred_high')?.score || 0;
      const termsScore = scores.find(s => s.id === 'standard_with_terms')?.score || 0;

      // Sacred content should score highest
      const sacredScoreCorrect = sacredScore > 0.8;
      // Cultural content should score above threshold
      const culturalScoreCorrect = culturalScore > TEST_CONFIG.CULTURAL_ROUTING_THRESHOLD;
      // Standard content should score low
      const standardScoreCorrect = standardScore <= TEST_CONFIG.CULTURAL_ROUTING_THRESHOLD;
      // Content with cultural terms should score higher than plain standard
      const termsScoreCorrect = termsScore > standardScore;

      const passed = sacredScoreCorrect && culturalScoreCorrect && 
                     standardScoreCorrect && termsScoreCorrect;

      return {
        passed,
        metrics: {
          standardScore,
          culturalScore,
          sacredScore,
          termsScore,
          scoringAccuracy: passed ? 100 : 0
        },
        details: `Scores - Standard: ${standardScore.toFixed(2)}, Cultural: ${culturalScore.toFixed(2)}, Sacred: ${sacredScore.toFixed(2)}`
      };
    } catch (error) {
      return {
        passed: false,
        metrics: {},
        details: `Test failed with error: ${error}`
      };
    }
  }

  /**
   * Run all validation tests
   */
  async runAllTests(): Promise<{
    overallPassed: boolean;
    testResults: Array<{
      testId: string;
      testName: string;
      passed: boolean;
      metrics: any;
      details: string;
    }>;
    summary: {
      totalTests: number;
      passedTests: number;
      failedTests: number;
      culturalSafetyMaintained: boolean;
      performanceTargetAchieved: boolean;
    };
  }> {
    console.log('🧪 Starting RealContentMigrator Validation Test Suite...\n');

    const tests = [
      { id: 'RCM-01', name: 'Parallel Batch Processing Performance', method: this.testParallelBatchProcessingPerformance },
      { id: 'RCM-02', name: 'Cultural Safety Protocol Validation', method: this.testCulturalSafetyProtocolValidation },
      { id: 'RCM-03', name: 'Episode Batching Functionality', method: this.testEpisodeBatchingFunctionality },
      { id: 'RCM-04', name: 'Intelligent Content Routing', method: this.testIntelligentContentRouting },
      { id: 'RCM-05', name: 'Performance Metrics Accuracy', method: this.testPerformanceMetricsAccuracy },
      { id: 'RCM-06', name: 'System Stability Under Load', method: this.testSystemStabilityUnderLoad },
      { id: 'RCM-07', name: 'Cultural Content Priority Preservation', method: this.testCulturalContentPriorityPreservation },
      { id: 'RCM-08', name: 'Throughput Target Achievement', method: this.testThroughputTargetAchievement },
      { id: 'RCM-09', name: 'Error Handling and Failover', method: this.testErrorHandlingAndFailover },
      { id: 'RCM-10', name: 'Cultural Complexity Scoring', method: this.testCulturalComplexityScoring }
    ];

    const testResults = [];
    let passedTests = 0;
    let culturalSafetyMaintained = true;
    let performanceTargetAchieved = true;

    for (const test of tests) {
      try {
        const result = await test.method.call(this);
        testResults.push({
          testId: test.id,
          testName: test.name,
          passed: result.passed,
          metrics: result.metrics,
          details: result.details
        });

        if (result.passed) {
          passedTests++;
          console.log(`✅ ${test.id}: ${test.name} - PASSED`);
        } else {
          console.log(`❌ ${test.id}: ${test.name} - FAILED: ${result.details}`);
          
          // Track specific failure types
          if (test.id === 'RCM-02' || test.id === 'RCM-07') {
            culturalSafetyMaintained = false;
          }
          if (test.id === 'RCM-01' || test.id === 'RCM-08') {
            performanceTargetAchieved = false;
          }
        }
      } catch (error) {
        testResults.push({
          testId: test.id,
          testName: test.name,
          passed: false,
          metrics: {},
          details: `Test execution failed: ${error}`
        });
        console.log(`💥 ${test.id}: ${test.name} - ERROR: ${error}`);
      }
      
      console.log(''); // Add spacing between tests
    }

    const overallPassed = passedTests === tests.length;

    console.log('📋 Test Suite Summary:');
    console.log(`   Total Tests: ${tests.length}`);
    console.log(`   Passed: ${passedTests}`);
    console.log(`   Failed: ${tests.length - passedTests}`);
    console.log(`   Cultural Safety Maintained: ${culturalSafetyMaintained ? '✅' : '❌'}`);
    console.log(`   Performance Target Achieved: ${performanceTargetAchieved ? '✅' : '❌'}`);
    console.log(`   Overall Result: ${overallPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

    return {
      overallPassed,
      testResults,
      summary: {
        totalTests: tests.length,
        passedTests,
        failedTests: tests.length - passedTests,
        culturalSafetyMaintained,
        performanceTargetAchieved
      }
    };
  }
}

// Export test runner function
export async function runRealContentMigratorValidationTests(): Promise<void> {
  const testSuite = new RealContentMigratorValidationTests();
  const results = await testSuite.runAllTests();
  
  if (!results.overallPassed) {
    throw new Error(`Validation tests failed: ${results.summary.failedTests}/${results.summary.totalTests} tests failed`);
  }
  
  console.log('\n🎉 All RealContentMigrator validation tests passed successfully!');
  console.log('   ✅ Performance targets achieved');
  console.log('   ✅ Cultural safety protocols maintained');
  console.log('   ✅ System stability verified');
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runRealContentMigratorValidationTests()
    .then(() => {
      console.log('\n🎯 Validation Complete: System ready for production deployment');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Validation Failed:', error.message);
      process.exit(1);
    });
}