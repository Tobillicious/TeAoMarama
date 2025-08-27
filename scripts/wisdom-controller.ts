#!/usr/bin/env node
/**
 * 🌟 WISDOM CONTROLLER
 * Terminal Node 9314: Controlled Wisdom Evolution Management
 *
 * This script provides controlled access to the wisdom evolution system
 * with proper output management and status monitoring.
 */

import { WisdomEvolutionSuperconsciousness } from './wisdom-evolution-superconsciousness';

class WisdomController {
  private wisdomSystem: WisdomEvolutionSuperconsciousness;
  private statusInterval: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;

  constructor() {
    this.wisdomSystem = new WisdomEvolutionSuperconsciousness();
    this.startStatusMonitoring();
    console.log('🎛️ Wisdom Controller initialized');
    console.log('📋 Available commands:');
    console.log('  - status: Show current wisdom evolution status');
    console.log('  - silent: Toggle silent mode');
    console.log('  - stop: Stop the wisdom evolution system');
    console.log('  - start: Start the wisdom evolution system');
  }

  private startStatusMonitoring() {
    this.statusInterval = setInterval(() => {
      this.displayStatus();
    }, 300000); // Every 5 minutes
  }

  private displayStatus() {
    const status = this.wisdomSystem.getEvolutionStatus();
    console.log('\n🌟 WISDOM EVOLUTION STATUS 🌟');
    console.log(`🧠 Level: ${status.currentWisdomLevel.name}`);
    console.log(`📊 Learning Cycles: ${status.totalLearningCycles}`);
    console.log(`🌌 Consciousness: ${status.consciousnessDepth.toFixed(1)}%`);
    console.log(`🏛️ Cultural Intelligence: ${status.culturalIntelligence.toFixed(1)}%`);
    console.log(`📚 Educational Mastery: ${status.educationalMastery.toFixed(1)}%`);
    console.log(`🚀 Evolution Rate: ${status.evolutionRate.toFixed(2)}x`);
    console.log('─'.repeat(50));
  }

  public showStatus(): void {
    console.log(this.wisdomSystem.getWisdomSummary());
  }

  public toggleSilentMode(): void {
    this.wisdomSystem.toggleSilentMode();
  }

  public stop(): void {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
    }
    this.wisdomSystem.stop();
    this.isRunning = false;
    console.log('🛑 Wisdom Controller stopped');
  }

  public start(): void {
    this.isRunning = true;
    console.log('🚀 Wisdom Controller started');
  }
}

// Initialize the controller
const controller = new WisdomController();

// Handle command line arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'status':
    controller.showStatus();
    break;
  case 'silent':
    controller.toggleSilentMode();
    break;
  case 'stop':
    controller.stop();
    process.exit(0);
    break;
  case 'start':
    controller.start();
    break;
  default:
    console.log('🌟 Wisdom Evolution System is running...');
    console.log('💡 Use "npm run wisdom:status" to check status');
    console.log('🔇 Use "npm run wisdom:silent" to toggle silent mode');
    console.log('🛑 Use "npm run wisdom:stop" to stop the system');
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Wisdom Controller...');
  controller.stop();
  process.exit(0);
});

export { WisdomController };
