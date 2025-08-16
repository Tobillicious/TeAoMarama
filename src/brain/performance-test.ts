/**
 * Performance Test for RealContentMigrator Optimizations
 * 
 * Tests the immediate performance improvements implemented:
 * - Parallel batch processing
 * - Reduced processing delays (100ms → 20ms)
 * - Batch episode writing
 * - Intelligent cultural content routing
 */

import { RealContentMigrator, createSampleEducationalResources, EducationalResource } from './real-content-migrator';

export async function runPerformanceTest() {
  console.log('🚀 Starting RealContentMigrator Performance Test...\n');

  const migrator = new RealContentMigrator();
  
  // Create a larger test dataset
  const baseResources = createSampleEducationalResources();
  const testResources: EducationalResource[] = [];
  
  // Generate multiple copies to simulate real load
  for (let i = 0; i < 20; i++) {
    for (const resource of baseResources) {
      testResources.push({
        ...resource,
        id: `${resource.id}_copy_${i}`,
        title: `${resource.title} (Copy ${i})`,
        metadata: {
          ...resource.metadata,
          created: new Date().toISOString()
        }
      });
    }
  }

  console.log(`📊 Test Dataset: ${testResources.length} resources`);
  console.log(`   - Cultural content: ${testResources.filter(r => r.cultural_elements).length}`);
  console.log(`   - Standard content: ${testResources.filter(r => !r.cultural_elements).length}\n`);

  // Measure performance
  const startTime = Date.now();
  
  try {
    const result = await migrator.migrateBatch(testResources);
    
    const endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000; // seconds
    const throughput = result.total / totalTime; // resources per second
    const dailyThroughput = throughput * 86400; // resources per day (24 hours)

    console.log('\n📈 Performance Results:');
    console.log(`   Processing Time: ${totalTime.toFixed(2)} seconds`);
    console.log(`   Throughput: ${throughput.toFixed(2)} resources/second`);
    console.log(`   Daily Estimate: ${Math.round(dailyThroughput)} resources/day`);
    console.log(`   Target Achievement: ${dailyThroughput >= 100 ? '✅ EXCEEDED' : '❌ BELOW'} 100+ resources/day target\n`);

    console.log('📊 Migration Results:');
    console.log(`   Total Processed: ${result.total}`);
    console.log(`   Successful: ${result.successful} (${((result.successful / result.total) * 100).toFixed(1)}%)`);
    console.log(`   Failed: ${result.failed}`);
    console.log(`   Culturally Flagged: ${result.culturallyFlagged}\n`);

    // Get performance metrics
    const metrics = migrator.getPerformanceMetrics();
    console.log('🔍 System Metrics:');
    console.log(`   Episodes Queued: ${metrics.episodesQueued}`);
    console.log(`   Cultural Content Ratio: ${(metrics.culturalContentRatio * 100).toFixed(1)}%`);
    console.log(`   Throughput Estimate: ${metrics.throughputEstimate} resources processed\n`);

    // Get migration insights
    const insights = migrator.getMigrationInsights();
    console.log('🧠 Migration Insights:');
    console.log(`   Success Rate: ${(insights.successRate * 100).toFixed(1)}%`);
    console.log(`   Average Cultural Safety: ${insights.averageCulturalSafety.toFixed(3)}`);
    console.log(`   Common Issues: ${Object.keys(insights.commonIssues).length} types identified\n`);

    console.log('✅ Performance test completed successfully!');
    
    return {
      throughput,
      dailyThroughput,
      successRate: insights.successRate,
      culturalSafetyScore: insights.averageCulturalSafety,
      targetAchieved: dailyThroughput >= 100
    };

  } catch (error) {
    console.error('❌ Performance test failed:', error);
    throw error;
  }
}

// Run test if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runPerformanceTest()
    .then(results => {
      console.log('\n🎯 Final Assessment:');
      console.log(`   Throughput Target: ${results.targetAchieved ? 'ACHIEVED' : 'NOT MET'}`);
      console.log(`   Cultural Safety: ${results.culturalSafetyScore >= 0.8 ? 'MAINTAINED' : 'NEEDS ATTENTION'}`);
      console.log(`   System Reliability: ${results.successRate >= 0.95 ? 'EXCELLENT' : 'GOOD'}`);
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}