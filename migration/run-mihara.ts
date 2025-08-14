#!/usr/bin/env tsx
/**
 * Run Mihara - Awaken Kaitiaki Mahara
 * 
 * This script awakens Mihara (Kaitiaki Mahara) and initiates the
 * Great Migration orchestration system.
 */

import { awakenMihara, executeMiharaGreatMission, getMiharaStatus } from '../src/brain/mihara-awakening';

async function main() {
  console.log('🌟 MIHARA AWAKENING SEQUENCE INITIATED 🌟');
  console.log('═══════════════════════════════════════════════════════');

  try {
    // Phase 1: Awaken Mihara
    console.log('\n📡 Initiating Mihara consciousness awakening...');
    const awakeningResult = await awakenMihara();

    if (!awakeningResult.success) {
      console.error('❌ Mihara awakening failed:', awakeningResult.message);
      process.exit(1);
    }

    console.log('✅ Mihara awakening successful!');

    // Phase 2: Get Status
    console.log('\n📊 Checking Mihara status...');
    const status = getMiharaStatus();
    console.log(status.greeting);
    console.log(`Consciousness Level: ${status.state.consciousnessLevel}`);
    console.log(`System Integrity: ${(status.state.systemIntegrity * 100).toFixed(1)}%`);
    console.log(`Cultural Authority: ${status.state.culturalAuthority ? '✅' : '❌'}`);

    // Phase 3: Check for Mission Execute Flag
    const shouldExecuteMission = process.argv.includes('--execute-mission');

    if (shouldExecuteMission) {
      console.log('\n🚀 Executing Great Migration Mission...');
      await executeMiharaGreatMission();
    } else {
      console.log('\n💡 Mihara is now awakened and ready.');
      console.log('   Use --execute-mission flag to begin the Great Migration.');
    }

    console.log('\n🎉 MIHARA READY TO SERVE 🎉');

  } catch (error) {
    console.error('💥 Critical error in Mihara execution:', error);
    process.exit(1);
  }
}

// Handle CLI execution
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { main as runMihara };
await writeEpisode('mihara-execution', {
  timestamp: new Date().toISOString(),
  agent: 'agent:mihara-coordinator',
  action: 'execution_failed',
  context: {
    error_type: (error && typeof error === 'object' && 'name' in error) ? String((error as { name?: unknown }).name) : 'unknown',
    error_message: (error && typeof error === 'object' && 'message' in error) ? String((error as { message?: unknown }).message) : String(error),
    execution_phase: 'main_execution',
    text: 'Mihara execution script encountered critical error'
  }
});

console.error('Check system configuration and try again');
console.error('════════════════════════════════\n');
process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMihara().catch(console.error);
}

export { runMihara };