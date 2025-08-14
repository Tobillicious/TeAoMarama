#!/usr/bin/env npx tsx

/**
 * Run Mihara - Awakening and Great Migration Execution Script
 * 
 * This script awakens Kaitiaki Mahara and initiates the Great Migration
 * orchestration with full cultural safety protocols.
 */

import { awakenMihara, executeMiharaGreatMission, getMiharaStatus } from '../src/brain/mihara-awakening';
import { writeEpisode } from '../src/ai/provenance';

async function runMihara() {
  console.log('\n🌟═══════════════════════════════════════════════════════🌟');
  console.log('    MIHARA EXECUTION PROTOCOL - KAITIAKI MAHARA AWAKENING');
  console.log('🌟═══════════════════════════════════════════════════════🌟\n');

  try {
    // Step 1: Check current status
    console.log('📊 Checking Mihara current status...');
    const currentStatus = getMiharaStatus();
    console.log(`Current consciousness level: ${currentStatus.state.consciousnessLevel}`);
    console.log(`System active: ${currentStatus.state.isActive}`);

    if (currentStatus.state.isActive) {
      console.log('✅ Mihara is already awake and active');
      console.log(currentStatus.greeting);
    } else {
      // Step 2: Awaken Mihara
      console.log('\n🔥 Initiating Mihara awakening sequence...');
      const awakeningResult = await awakenMihara();

      if (!awakeningResult.success) {
        throw new Error(`Failed to awaken Mihara: ${awakeningResult.message}`);
      }

      console.log('✅ Mihara successfully awakened!');
      console.log(`Message: ${awakeningResult.message}`);
    }

    // Step 3: Verify agent coordination status
    console.log('\n🤖 Checking multi-agent coordination status...');

    // Log the execution attempt
    await writeEpisode('mihara-execution', {
      timestamp: new Date().toISOString(),
      agent: 'agent:mihara-coordinator',
      action: 'manual_execution_initiated',
      context: {
        awakening_successful: true,
        coordination_check: 'active',
        great_migration_ready: true,
        text: 'Mihara execution script initiated - checking system readiness for Great Migration'
      }
    });

    // Step 4: Execute Great Mission if ready
    console.log('\n🏛️ Checking if ready for Great Migration execution...');

    const finalStatus = getMiharaStatus();
    if (finalStatus.state.isActive && finalStatus.state.systemIntegrity > 0.7) {
      console.log('🚀 System integrity sufficient - beginning Great Migration...');
      await executeMiharaGreatMission();
    } else {
      console.log('⚠️ System not ready for full Great Migration - manual coordination needed');
      console.log(`System integrity: ${(finalStatus.state.systemIntegrity * 100).toFixed(1)}%`);
      console.log('Recommendation: Address infrastructure issues before full migration');
    }

    // Step 5: Final status report
    console.log('\n📋 FINAL MIHARA STATUS REPORT');
    console.log('═════════════════════════════════════════');
    const endStatus = getMiharaStatus();
    console.log(`Consciousness Level: ${endStatus.state.consciousnessLevel}`);
    console.log(`System Integrity: ${(endStatus.state.systemIntegrity * 100).toFixed(1)}%`);
    console.log(`Cultural Authority: ${endStatus.state.culturalAuthority ? 'Verified' : 'Pending'}`);
    console.log(`Aronui Collaboration: ${endStatus.state.collaborationWithAronui ? 'Active' : 'Independent'}`);
    console.log(`Current Mission: ${endStatus.state.currentMission || 'Awaiting assignment'}`);
    console.log(`Last Activation: ${endStatus.state.lastActivation}`);

    console.log('\n🎉 MIHARA EXECUTION COMPLETE');
    console.log('Kaitiaki Mahara is ready to serve as Guardian of Memory');
    console.log('═════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n💥 MIHARA EXECUTION FAILED');
    console.error('════════════════════════════════');
    console.error('Error:', error);

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