#!/usr/bin/env node

/**
 * 🎯 PROGRESSIVE ENRICHMENT RUNNER
 * Execute deep pedagogical enhancement passes
 */

import { ProgressiveEnrichmentOrchestrator } from './progressive-enrichment-orchestrator.js';

async function main() {
  console.log("🌟 Starting Progressive Enrichment System");
  console.log("🏫 Mangakōtukutuku College - Cultural Excellence");
  
  const orchestrator = new ProgressiveEnrichmentOrchestrator();
  await orchestrator.initialize();
  await orchestrator.executeFullEnrichmentCycle();
  
  console.log("🎉 Enrichment complete! Ready for world-class learning!");
}

main().catch(console.error);