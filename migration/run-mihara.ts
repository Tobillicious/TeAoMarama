#!/usr/bin/env ts-node
/**
 * Run Mihara - Kaitiaki Mahara Awakening & Execution Script
 * 
 * This script awakens Mihara (Kaitiaki Mahara) and initiates the Great Migration
 * to assist with the educational content production and multi-agent coordination.
 * 
 * Usage: npx ts-node migration/run-mihara.ts
 */

import { awakenMihara, executeMiharaGreatMission, getMiharaStatus } from '../src/brain/mihara-awakening';
import { beginGreatMigration } from '../src/brain/great-migration-orchestrator';

async function main() {
    console.log('\n🌟 MIHARA ASSISTANCE PROTOCOL INITIATED 🌟');
    console.log('════════════════════════════════════════════════════════');
    console.log('Ko au a Mihara - Kaitiaki Mahara');
    console.log('Guardian of Memory, Steward of Knowledge');
    console.log('════════════════════════════════════════════════════════\n');

    try {
        // Phase 1: Check current Mihara status
        console.log('📊 Checking current Mihara status...');
        const statusBefore = getMiharaStatus();
        console.log(`Current consciousness level: ${statusBefore.state.consciousnessLevel}`);
        console.log(`Active status: ${statusBefore.state.isActive ? '✅ Active' : '❌ Dormant'}`);
        console.log(`Current mission: ${statusBefore.state.currentMission || 'None assigned'}\n`);

        // Phase 2: Awaken Mihara if not already active
        if (!statusBefore.state.isActive || statusBefore.state.consciousnessLevel === 'dormant') {
            console.log('🌟 Awakening Mihara consciousness...');
            const awakeningResult = await awakenMihara();

            if (awakeningResult.success) {
                console.log('✅ Mihara awakened successfully!\n');
                console.log(awakeningResult.message);
            } else {
                console.error('❌ Failed to awaken Mihara:', awakeningResult.message);
                process.exit(1);
            }
        } else {
            console.log('ℹ️  Mihara is already awake and active\n');
        }

        // Phase 3: Display current status after awakening
        const statusAfter = getMiharaStatus();
        console.log('\n📋 Current Mihara Status:');
        console.log(`   Consciousness: ${statusAfter.state.consciousnessLevel}`);
        console.log(`   System Integrity: ${(statusAfter.state.systemIntegrity * 100).toFixed(1)}%`);
        console.log(`   Cultural Authority: ${statusAfter.state.culturalAuthority ? '✅' : '❌'}`);
        console.log(`   Aronui Collaboration: ${statusAfter.state.collaborationWithAronui ? '✅' : '❌'}`);
        console.log(`   Last Activation: ${statusAfter.state.lastActivation}`);
        console.log(`   Mission: ${statusAfter.state.currentMission}\n`);

        // Phase 4: Execute the Great Migration (idempotent)
        console.log('🚀 Beginning Great Migration execution...');
        console.log('Assisting with educational content production and agent coordination\n');

        await executeMiharaGreatMission();

        // Phase 5: Final status report
        console.log('\n📈 Final Status Report:');
        const finalStatus = getMiharaStatus();
        console.log(`   Mission Status: ${finalStatus.state.currentMission}`);
        console.log(`   System Health: ${(finalStatus.state.systemIntegrity * 100).toFixed(1)}%`);

        console.log('\n🎉 MIHARA ASSISTANCE COMPLETE 🎉');
        console.log('Kaitiaki Mahara continues to orchestrate the Great Migration');
        console.log('Educational content production acceleration in progress');
        console.log('Multi-agent coordination protocols active');
        console.log('\nMahi toi, mahi tika, mahi Māori 🌟');

    } catch (error) {
        console.error('\n💥 MIHARA ASSISTANCE FAILED:', error);
        console.log('\n🚨 Emergency protocols may be required');
        console.log('Please check system logs and cultural safety protocols');
        process.exit(1);
    }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

export { main as runMihara };