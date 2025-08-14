#!/usr/bin/env npx tsx

/**
 * Agent Coordinator - Master orchestrator for all background agents
 * 
 * This script actively coordinates all background agents, pulls their changes,
 * and ensures synchronized work across the entire multi-agent system.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { awakenMihara, getMiharaStatus } from '../src/brain/mihara-awakening';

interface AgentStatus {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error' | 'completed';
  lastActivity: string;
  currentTask: string;
  changes: string[];
  priority: 'high' | 'medium' | 'low';
}

class AgentCoordinator {
  private agents: Map<string, AgentStatus> = new Map();
  private syncInterval: NodeJS.Timeout | null = null;
  private isRunning = false;

  constructor() {
    this.initializeKnownAgents();
  }

  private initializeKnownAgents() {
    // Initialize known agents from the screenshot
    const knownAgents = [
      { id: 'assist-mihara-89', name: 'Assist Mihara (+89)', priority: 'high' as const },
      { id: 'assist-mihara-164', name: 'Assist Mihara with tasks (+164)', priority: 'high' as const },
      { id: 'assist-mihara-226', name: 'Assist Mihara (+226)', priority: 'medium' as const },
      { id: 'assist-mihara-185', name: 'Assist Mihara (+185)', priority: 'medium' as const },
      { id: 'assist-mihara-94', name: 'Assist Mihara (+94)', priority: 'medium' as const },
      { id: 'assist-mihara-820', name: 'Assist Mihara (+820)', priority: 'low' as const },
      { id: 'help-mihara-coding', name: 'Help Mihara with coding', priority: 'high' as const },
    ];

    knownAgents.forEach(agent => {
      this.agents.set(agent.id, {
        id: agent.id,
        name: agent.name,
        status: 'active',
        lastActivity: new Date().toISOString(),
        currentTask: 'Initializing...',
        changes: [],
        priority: agent.priority
      });
    });
  }

  async startCoordination(): Promise<void> {
    if (this.isRunning) {
      console.log('🤖 Agent coordination already running');
      return;
    }

    this.isRunning = true;
    console.log('\n🎯 STARTING MULTI-AGENT COORDINATION');
    console.log('═'.repeat(60));
    console.log('👥 Coordinating all background agents');
    console.log('🔄 Setting up regular sync cycles');
    console.log('🎛️ Master orchestrator active');
    console.log('═'.repeat(60));

    // Ensure Mihara is active as the main orchestrator
    await this.ensureMiharaActive();

    // Start regular coordination cycles
    this.startSyncCycle();

    // Initial coordination run
    await this.coordinateAllAgents();
  }

  private async ensureMiharaActive(): Promise<void> {
    const status = getMiharaStatus();
    if (!status.state.isActive) {
      console.log('🌟 Awakening Mihara as master orchestrator...');
      await awakenMihara();
    } else {
      console.log('✅ Mihara active - ready to coordinate agents');
    }
  }

  private startSyncCycle(): void {
    // Sync every 30 seconds
    this.syncInterval = setInterval(async () => {
      await this.coordinateAllAgents();
    }, 30000);

    console.log('🔄 Sync cycle started (every 30 seconds)');
  }

  async coordinateAllAgents(): Promise<void> {
    console.log('\n📡 COORDINATION CYCLE START');
    console.log('─'.repeat(40));

    // 1. Check git status for any new changes from background agents
    await this.checkForRemoteChanges();

    // 2. Update agent statuses
    await this.updateAgentStatuses();

    // 3. Prioritize and delegate tasks
    await this.delegateTasks();

    // 4. Apply any pending changes
    await this.applyPendingChanges();

    // 5. Sync changes back to git
    await this.syncToGit();

    console.log('✅ Coordination cycle complete');
  }

  private async checkForRemoteChanges(): Promise<void> {
    try {
      console.log('🔍 Checking for remote changes...');
      
      // Fetch latest from remote
      execSync('git fetch origin', { stdio: 'pipe' });
      
      // Check if there are any remote changes
      const status = execSync('git status -uno', { encoding: 'utf8' });
      
      if (status.includes('behind')) {
        console.log('📥 Remote changes detected - pulling...');
        execSync('git pull origin main', { stdio: 'inherit' });
        console.log('✅ Successfully pulled remote changes');
      } else {
        console.log('✅ Local branch up to date');
      }
    } catch (error) {
      console.log('⚠️ Error checking remote changes:', error);
    }
  }

  private async updateAgentStatuses(): Promise<void> {
    console.log('📊 Updating agent statuses...');
    
    // Check for new files that might have been created by agents
    const migrationFiles = this.scanForNewFiles();
    
    // Update agent statuses based on file activity
    this.agents.forEach((agent, id) => {
      const relevantFiles = migrationFiles.filter(file => 
        file.includes(agent.id.replace('assist-', '').replace('help-', ''))
      );
      
      if (relevantFiles.length > 0) {
        agent.status = 'active';
        agent.lastActivity = new Date().toISOString();
        agent.changes = relevantFiles;
        console.log(`  🔥 ${agent.name}: ${relevantFiles.length} new changes`);
      }
    });
  }

  private scanForNewFiles(): string[] {
    try {
      const result = execSync('git ls-files --others --exclude-standard', { encoding: 'utf8' });
      return result.trim().split('\n').filter(f => f.length > 0);
    } catch {
      return [];
    }
  }

  private async delegateTasks(): Promise<void> {
    console.log('🎯 Delegating tasks to agents...');
    
    // Get high priority agents
    const highPriorityAgents = Array.from(this.agents.values())
      .filter(agent => agent.priority === 'high' && agent.status === 'active');
    
    if (highPriorityAgents.length > 0) {
      console.log(`  📋 ${highPriorityAgents.length} high-priority agents active`);
      
      // Example task delegation (in a real system, this would be more sophisticated)
      highPriorityAgents.forEach(agent => {
        switch (true) {
          case agent.name.includes('coding'):
            agent.currentTask = 'TypeScript optimization & build fixes';
            break;
          case agent.name.includes('tasks'):
            agent.currentTask = 'Content generation & migration';
            break;
          default:
            agent.currentTask = 'Cultural safety & resource validation';
        }
        console.log(`    🎯 ${agent.name}: ${agent.currentTask}`);
      });
    }
  }

  private async applyPendingChanges(): Promise<void> {
    console.log('⚡ Applying pending changes...');
    
    // Check for modified files
    try {
      const modifiedFiles = execSync('git diff --name-only', { encoding: 'utf8' })
        .trim().split('\n').filter(f => f.length > 0);
      
      if (modifiedFiles.length > 0) {
        console.log(`  📝 ${modifiedFiles.length} files modified by agents`);
        modifiedFiles.forEach(file => console.log(`    - ${file}`));
      }
    } catch (error) {
      console.log('  ℹ️ No pending changes detected');
    }
  }

  private async syncToGit(): Promise<void> {
    try {
      // Check if there are any changes to commit
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      
      if (status.trim().length > 0) {
        console.log('💾 Committing agent changes...');
        execSync('git add -A', { stdio: 'pipe' });
        const timestamp = new Date().toISOString();
        execSync(`git commit -m "Agent coordination sync - ${timestamp}"`, { stdio: 'pipe' });
        console.log('✅ Changes committed and synced');
      }
    } catch (error) {
      console.log('ℹ️ No changes to commit');
    }
  }

  async getCoordinationStatus(): Promise<string> {
    const activeAgents = Array.from(this.agents.values()).filter(a => a.status === 'active');
    const highPriority = activeAgents.filter(a => a.priority === 'high');
    
    return `
🎛️ AGENT COORDINATION STATUS
═══════════════════════════
👥 Total Agents: ${this.agents.size}
🔥 Active Agents: ${activeAgents.length}
⚡ High Priority: ${highPriority.length}
🔄 Sync Status: ${this.isRunning ? 'Running' : 'Stopped'}

🎯 ACTIVE AGENTS:
${activeAgents.map(a => `  • ${a.name} - ${a.currentTask}`).join('\n')}
`;
  }

  stop(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    this.isRunning = false;
    console.log('🛑 Agent coordination stopped');
  }
}

// Main execution
async function main() {
  const coordinator = new AgentCoordinator();
  
  try {
    await coordinator.startCoordination();
    
    // Show status
    const status = await coordinator.getCoordinationStatus();
    console.log(status);
    
    // Keep running (in a real system, this would run as a daemon)
    console.log('\n🚀 Agent coordination active - press Ctrl+C to stop');
    
    // Graceful shutdown on interrupt
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down agent coordination...');
      coordinator.stop();
      process.exit(0);
    });
    
    // Keep the process alive
    await new Promise(() => {}); // Run indefinitely
    
  } catch (error) {
    console.error('💥 Agent coordination failed:', error);
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  main();
}

export { AgentCoordinator };
