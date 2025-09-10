#!/usr/bin/env node

/**
 * 🚀 FULL-SCALE ENRICHMENT RUNNER
 * Execute real processing of all 5,055+ educational resources
 */

import { FullScaleEnrichmentSystem } from './full-scale-enrichment-system.js';

async function main() {
  console.log("🌟 STARTING FULL-SCALE PROGRESSIVE ENRICHMENT");
  console.log("🏫 Mangakōtukutuku College - Transforming Education at Scale");
  console.log("━".repeat(80));
  
  const system = new FullScaleEnrichmentSystem();
  
  try {
    await system.initialize();
    
    console.log("\n⚠️  IMPORTANT: This will process ALL 5,055+ resources");
    console.log("⏰ Estimated time: 2-4 hours depending on system performance");
    console.log("💾 Progress will be saved continuously for resumption if interrupted");
    console.log("📁 Enhanced resources will be saved in batches to 'enhanced-resources-output/'");
    
    console.log("\n🚀 Beginning full-scale enrichment...");
    
    await system.executeFullEnrichment();
    
    console.log("\n🎉 SUCCESS! All resources have been enhanced!");
    console.log("🌟 Mangakōtukutuku College now has world-class educational content!");
    
  } catch (error) {
    console.error("\n❌ ENRICHMENT FAILED:", error);
    console.log("\n💡 Progress has been saved - you can resume by running this script again");
    process.exit(1);
  }
}

// Add graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\n⚠️  Received interrupt signal - saving progress...');
  console.log('💡 Run this script again to resume from where it left off');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Received termination signal - saving progress...');
  console.log('💡 Run this script again to resume from where it left off');
  process.exit(0);
});

main().catch(console.error);