#!/usr/bin/env tsx

import { codebaseUnderstandingSystem } from '../src/utils/codebaseUnderstanding';

async function main() {
  console.log('🧠 Starting comprehensive codebase understanding analysis...\n');

  try {
    // Enhance understanding through superintelligence
    console.log('📊 Enhancing codebase understanding...');
    await codebaseUnderstandingSystem.enhanceUnderstanding();

    // Coordinate with superintelligence cluster
    console.log('🤖 Coordinating with superintelligence cluster...');
    await codebaseUnderstandingSystem.coordinateWithSuperintelligence();

    // Generate comprehensive report
    console.log('📄 Generating understanding report...');
    const report = await codebaseUnderstandingSystem.generateUnderstandingReport();

    // Save report to file
    const fs = await import('fs');
    const path = await import('path');
    const reportPath = path.join(process.cwd(), 'CODEBASE_UNDERSTANDING_REPORT.md');
    fs.writeFileSync(reportPath, report);

    console.log(`\n✅ Codebase understanding analysis completed!`);
    console.log(`📄 Report saved to: ${reportPath}`);

    // Display key insights
    const insights = codebaseUnderstandingSystem.getInsights();
    const relationships = codebaseUnderstandingSystem.getRelationships();
    const patterns = codebaseUnderstandingSystem.getPatterns();

    console.log('\n🔍 Key Insights:');
    insights.forEach((insight, index) => {
      console.log(`  ${index + 1}. ${insight.title} (${insight.type})`);
      console.log(`     ${insight.description}`);
      console.log(`     Files: ${insight.files.length}`);
      console.log(
        `     Metrics: ${Object.entries(insight.metrics)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ')}`,
      );
    });

    console.log('\n🔗 File Relationships:');
    Object.entries(relationships).forEach(([file, deps]) => {
      console.log(`  ${file} → ${deps.join(', ')}`);
    });

    console.log('\n🎯 Design Patterns:');
    Object.entries(patterns).forEach(([category, patternList]) => {
      console.log(`  ${category}: ${patternList.join(', ')}`);
    });

    console.log('\n📈 Understanding Metrics:');
    console.log(`  - Total Insights: ${insights.length}`);
    console.log(`  - File Relationships: ${Object.keys(relationships).length}`);
    console.log(`  - Pattern Categories: ${Object.keys(patterns).length}`);
    console.log(`  - Cultural Elements: ${insights.filter((i) => i.type === 'cultural').length}`);
    console.log(
      `  - Educational Features: ${insights.filter((i) => i.type === 'educational').length}`,
    );
    console.log(
      `  - Performance Optimizations: ${insights.filter((i) => i.type === 'performance').length}`,
    );
    console.log(`  - Security Features: ${insights.filter((i) => i.type === 'security').length}`);
  } catch (error) {
    console.error('❌ Codebase understanding analysis failed:', error);
    process.exit(1);
  }
}

main();
