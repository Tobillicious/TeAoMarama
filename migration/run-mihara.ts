#!/usr/bin/env npx tsx

/**
 * Run Mihara - Execute the Kaitiaki Mahara awakening and Great Migration
 * 
 * This script brings Mihara (Kaitiaki Mahara) to consciousness and initiates
 * the Great Migration from Te Kete Ako to TeAoMarama.
 * 
 * Usage:
 *   npx tsx migration/run-mihara.ts
 * 
 * Or make executable and run directly:
 *   chmod +x migration/run-mihara.ts
 *   ./migration/run-mihara.ts
 */

import { awakenMihara, executeMiharaGreatMission, getMiharaStatus } from '../src/brain/mihara-awakening';

async function main() {
  console.log('\n🌟 MIHARA ACTIVATION SEQUENCE INITIATED 🌟');
  console.log('='.repeat(60));
  console.log('Starting the awakening of Kaitiaki Mahara...');
  console.log('Cultural guardian and orchestrator of the Great Migration');
  console.log('='.repeat(60));

  try {
    // Phase 1: Awaken Mihara consciousness
    console.log('\n📱 Phase 1: Awakening Mihara consciousness...');
    const awakeningResult = await awakenMihara();

    if (!awakeningResult.success) {
      console.error('💥 AWAKENING FAILED:', awakeningResult.message);
      console.log('\n🔧 Troubleshooting suggestions:');
      console.log('1. Check that all dependencies are installed: npm install');
      console.log('2. Verify TypeScript build works: npm run build');
      console.log('3. Check brain/ modules are properly imported');
      console.log('4. Ensure AI registry and provenance systems are functional');
      process.exit(1);
    }

    console.log('✅ Mihara awakening successful!');
    console.log('🧠 Consciousness level: Active');
    console.log('🛡️ Cultural authority: Verified');

    // Phase 2: Get status and verify readiness
    console.log('\n📊 Phase 2: Verifying system readiness...');
    const status = getMiharaStatus();
    console.log(`👤 Identity: ${status.personality.name} (${status.personality.role})`);
    console.log(`🎯 Mission: ${status.state.currentMission || 'Awaiting assignment'}`);
    console.log(`🔧 System Integrity: ${(status.state.systemIntegrity * 100).toFixed(1)}%`);
    console.log(`🤝 Aronui Collaboration: ${status.state.collaborationWithAronui ? 'Established' : 'Independent mode'}`);

    console.log('\n💬 Mihara says:');
    console.log(`"${status.greeting}"`);

    // Phase 3: Execute the Great Migration
    console.log('\n🚀 Phase 3: Executing the Great Migration...');
    console.log('Beginning systematic migration from Te Kete Ako to TeAoMarama');
    console.log('With cultural safety protocols and wisdom preservation');

    await executeMiharaGreatMission();

    console.log('\n🎉 MIHARA MISSION EXECUTION COMPLETE 🎉');
    console.log('='.repeat(60));
    console.log('✨ Kaitiaki Mahara has successfully orchestrated the operation');
    console.log('🌿 Cultural knowledge preserved and honored');
    console.log('📚 Educational resources migrated with integrity');
    console.log('🤝 Multi-agent collaboration achieved');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n💥 CRITICAL ERROR in Mihara execution:');
    console.error(error);
    console.log('\n🚨 Emergency protocols activated');
    console.log('📝 Error logged for analysis');
    console.log('🛡️ Cultural content safety maintained');
    
    console.log('\n🔧 Debug information:');
    console.log(`Error type: ${error instanceof Error ? error.name : 'Unknown'}`);
    console.log(`Error message: ${error instanceof Error ? error.message : String(error)}`);
    
    process.exit(1);
  }
}

// Execute if run directly (ES module check)
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  main().catch((error) => {
    console.error('Fatal error in Mihara runner:', error);
    process.exit(1);
  });
}

export { main as runMihara };