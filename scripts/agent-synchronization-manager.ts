#!/usr/bin/env tsx

/**
 * Agent Synchronization & State Management System
 *
 * This system ensures all Cursor agents maintain synchronized state across the
 * distributed network, enabling seamless coordination and preventing conflicts.
 *
 * Features:
 * - Real-time state synchronization
 * - Conflict detection and resolution
 * - Cultural safety state validation
 * - Performance optimization
 * - Distributed consensus mechanisms
 */

import { existsSync, readFileSync, watch, writeFileSync } from 'fs';
import { join } from 'path';

interface AgentState {
  agentId: string;
  agentName: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR' | 'MAINTENANCE';
  currentTask?: string;
  progress?: number;
  lastUpdate: string;
  culturalSafetyStatus: 'VALIDATED' | 'PENDING' | 'ISSUE';
  performanceMetrics: {
    responseTime: number;
    taskCompletionRate: number;
    errorRate: number;
    culturalCompliance: number;
  };
  workingOn: {
    files: string[];
    tasks: string[];
    resources: string[];
  };
  capabilities: string[];
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

interface SystemState {
  networkStatus: 'HARMONY' | 'COORDINATING' | 'CONFLICT' | 'DEGRADED';
  activeAgents: number;
  totalAgents: number;
  culturalSafetyScore: number;
  performanceScore: number;
  lastSynchronization: string;
  conflicts: string[];
  criticalIssues: string[];
}

interface SynchronizationEvent {
  eventId: string;
  timestamp: string;
  agentId: string;
  eventType: 'STATE_UPDATE' | 'CONFLICT_DETECTED' | 'CULTURAL_SAFETY_ALERT' | 'PERFORMANCE_ISSUE';
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  resolution?: string;
  resolvedAt?: string;
}

class AgentSynchronizationManager {
  private sharedMemoryPath: string;
  private statePath: string;
  private eventsPath: string;
  private agents: Map<string, AgentState> = new Map();
  private systemState: SystemState;
  private events: SynchronizationEvent[] = [];
  private watchers: Map<string, any> = new Map();

  constructor() {
    this.sharedMemoryPath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'shared_memory_system.json',
    );
    this.statePath = join(process.cwd(), 'migration', 'agent_coordination', 'system_state.json');
    this.eventsPath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'synchronization_events.json',
    );
    this.systemState = this.initializeSystemState();
    this.loadExistingState();
    this.startStateMonitoring();
  }

  private initializeSystemState(): SystemState {
    return {
      networkStatus: 'HARMONY',
      activeAgents: 0,
      totalAgents: 0,
      culturalSafetyScore: 100,
      performanceScore: 100,
      lastSynchronization: new Date().toISOString(),
      conflicts: [],
      criticalIssues: [],
    };
  }

  private loadExistingState(): void {
    try {
      // Load agent states from shared memory
      if (existsSync(this.sharedMemoryPath)) {
        const sharedMemory = JSON.parse(readFileSync(this.sharedMemoryPath, 'utf8'));
        const agentRegistry = sharedMemory.agentRegistry;

        Object.entries(agentRegistry).forEach(([key, agent]: [string, any]) => {
          this.agents.set(agent.id, {
            agentId: agent.id,
            agentName: agent.name,
            status: agent.status || 'ACTIVE',
            currentTask: agent.currentTask,
            progress: agent.progress,
            lastUpdate: agent.lastHeartbeat || new Date().toISOString(),
            culturalSafetyStatus: agent.culturalSafetyStatus || 'VALIDATED',
            performanceMetrics: {
              responseTime: agent.performanceMetrics?.responseTime || 1.0,
              taskCompletionRate: agent.performanceMetrics?.taskCompletionRate || 100,
              errorRate: agent.performanceMetrics?.errorRate || 0,
              culturalCompliance: agent.performanceMetrics?.culturalCompliance || 100,
            },
            workingOn: {
              files: agent.workingOn?.files || [],
              tasks: agent.workingOn?.tasks || [],
              resources: agent.workingOn?.resources || [],
            },
            capabilities: agent.capabilities || [],
            priority: agent.priority || 'MEDIUM',
          });
        });
      }

      // Load system state
      if (existsSync(this.statePath)) {
        const stateData = JSON.parse(readFileSync(this.statePath, 'utf8'));
        this.systemState = { ...this.systemState, ...stateData };
      }

      // Load synchronization events
      if (existsSync(this.eventsPath)) {
        const eventsData = JSON.parse(readFileSync(this.eventsPath, 'utf8'));
        this.events = eventsData.events || [];
      }

      this.updateSystemState();
    } catch (error) {
      console.error('Error loading existing state:', error);
    }
  }

  private startStateMonitoring(): void {
    // Monitor shared memory file for changes
    if (existsSync(this.sharedMemoryPath)) {
      const watcher = watch(this.sharedMemoryPath, async (eventType) => {
        if (eventType === 'change') {
          await this.handleStateChange();
        }
      });
      this.watchers.set('sharedMemory', watcher);
    }

    // Periodic state synchronization
    setInterval(async () => {
      await this.synchronizeState();
    }, 30000); // Every 30 seconds

    // Conflict detection
    setInterval(async () => {
      await this.detectConflicts();
    }, 10000); // Every 10 seconds
  }

  private async handleStateChange(): Promise<void> {
    try {
      const sharedMemory = JSON.parse(readFileSync(this.sharedMemoryPath, 'utf8'));
      const agentRegistry = sharedMemory.agentRegistry;

      // Update agent states
      Object.entries(agentRegistry).forEach(([key, agent]: [string, any]) => {
        const existingAgent = this.agents.get(agent.id);
        if (existingAgent) {
          // Check for significant changes
          if (this.hasSignificantChange(existingAgent, agent)) {
            await this.logSynchronizationEvent({
              eventId: `sync-${Date.now()}-${agent.id}`,
              timestamp: new Date().toISOString(),
              agentId: agent.id,
              eventType: 'STATE_UPDATE',
              description: `Agent ${agent.name} state updated`,
              severity: 'LOW',
            });
          }

          // Update agent state
          this.agents.set(agent.id, {
            ...existingAgent,
            status: agent.status || existingAgent.status,
            currentTask: agent.currentTask || existingAgent.currentTask,
            progress: agent.progress || existingAgent.progress,
            lastUpdate: agent.lastHeartbeat || existingAgent.lastUpdate,
            culturalSafetyStatus: agent.culturalSafetyStatus || existingAgent.culturalSafetyStatus,
          });
        }
      });

      this.updateSystemState();
    } catch (error) {
      console.error('Error handling state change:', error);
    }
  }

  private hasSignificantChange(existing: AgentState, updated: any): boolean {
    return (
      existing.status !== updated.status ||
      existing.currentTask !== updated.currentTask ||
      existing.progress !== updated.progress ||
      existing.culturalSafetyStatus !== updated.culturalSafetyStatus
    );
  }

  public async updateAgentState(agentId: string, stateUpdate: Partial<AgentState>): Promise<void> {
    const existingAgent = this.agents.get(agentId);
    if (!existingAgent) {
      console.warn(`Agent ${agentId} not found in registry`);
      return;
    }

    const updatedAgent = {
      ...existingAgent,
      ...stateUpdate,
      lastUpdate: new Date().toISOString(),
    };

    this.agents.set(agentId, updatedAgent);
    this.updateSystemState();
    this.saveState();

    await this.logSynchronizationEvent({
      eventId: `update-${Date.now()}-${agentId}`,
      timestamp: new Date().toISOString(),
      agentId: agentId,
      eventType: 'STATE_UPDATE',
      description: `Agent ${updatedAgent.agentName} state updated: ${JSON.stringify(stateUpdate)}`,
      severity: 'LOW',
    });
  }

  private updateSystemState(): void {
    const now = new Date();
    const activeAgents = Array.from(this.agents.values()).filter((agent) => {
      const lastUpdate = new Date(agent.lastUpdate);
      const timeSinceUpdate = now.getTime() - lastUpdate.getTime();
      return timeSinceUpdate < 300000; // 5 minutes threshold
    });

    this.systemState.activeAgents = activeAgents.length;
    this.systemState.totalAgents = this.agents.size;
    this.systemState.lastSynchronization = now.toISOString();

    // Calculate cultural safety score
    const culturalSafetyValidated = Array.from(this.agents.values()).filter(
      (agent) => agent.culturalSafetyStatus === 'VALIDATED',
    ).length;
    this.systemState.culturalSafetyScore = Math.round(
      (culturalSafetyValidated / this.agents.size) * 100,
    );

    // Calculate performance score
    const averagePerformance =
      Array.from(this.agents.values()).reduce(
        (sum, agent) => sum + agent.performanceMetrics.taskCompletionRate,
        0,
      ) / this.agents.size;
    this.systemState.performanceScore = Math.round(averagePerformance);

    // Update network status
    if (this.systemState.criticalIssues.length > 0) {
      this.systemState.networkStatus = 'CONFLICT';
    } else if (this.systemState.activeAgents < this.systemState.totalAgents * 0.8) {
      this.systemState.networkStatus = 'DEGRADED';
    } else if (this.systemState.culturalSafetyScore < 100) {
      this.systemState.networkStatus = 'COORDINATING';
    } else {
      this.systemState.networkStatus = 'HARMONY';
    }
  }

  private async detectConflicts(): Promise<void> {
    const conflicts: string[] = [];

    // Check for file conflicts
    const fileUsage = new Map<string, string[]>();
    this.agents.forEach((agent) => {
      agent.workingOn.files.forEach((file) => {
        if (!fileUsage.has(file)) {
          fileUsage.set(file, []);
        }
        fileUsage.get(file)!.push(agent.agentId);
      });
    });

    fileUsage.forEach((agents, file) => {
      if (agents.length > 1) {
        conflicts.push(`FILE_CONFLICT: Multiple agents working on ${file}: ${agents.join(', ')}`);
      }
    });

    // Check for task conflicts
    const taskUsage = new Map<string, string[]>();
    this.agents.forEach((agent) => {
      if (agent.currentTask) {
        if (!taskUsage.has(agent.currentTask)) {
          taskUsage.set(agent.currentTask, []);
        }
        taskUsage.get(agent.currentTask)!.push(agent.agentId);
      }
    });

    taskUsage.forEach((agents, task) => {
      if (agents.length > 1) {
        conflicts.push(`TASK_CONFLICT: Multiple agents working on "${task}": ${agents.join(', ')}`);
      }
    });

    // Check for cultural safety issues
    this.agents.forEach((agent) => {
      if (agent.culturalSafetyStatus === 'ISSUE') {
        conflicts.push(`CULTURAL_SAFETY: ${agent.agentName} has cultural safety issues`);
      }
    });

    // Update conflicts
    if (
      conflicts.length !== this.systemState.conflicts.length ||
      !conflicts.every((conflict, index) => conflict === this.systemState.conflicts[index])
    ) {
      this.systemState.conflicts = conflicts;

      if (conflicts.length > 0) {
        await this.logSynchronizationEvent({
          eventId: `conflict-${Date.now()}`,
          timestamp: new Date().toISOString(),
          agentId: 'system',
          eventType: 'CONFLICT_DETECTED',
          description: `Detected ${conflicts.length} conflicts: ${conflicts.join('; ')}`,
          severity: conflicts.some((c) => c.includes('CULTURAL_SAFETY')) ? 'CRITICAL' : 'HIGH',
        });
      }
    }
  }

  private async logSynchronizationEvent(event: SynchronizationEvent): Promise<void> {
    this.events.push(event);

    // Keep only last 1000 events
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }

    this.saveEvents();

    // Log to console
    console.log(`[SYNC] ${event.eventType}: ${event.description} (${event.severity})`);

    // Log to provenance system if available
    try {
      // Dynamic import for ES module compatibility
      const provenanceModule = await import('../src/ai/provenance');
      if (provenanceModule.writeEpisode) {
        provenanceModule.writeEpisode({
          agent: event.agentId,
          action: 'synchronization_event',
          timestamp: event.timestamp,
          metadata: {
            eventType: event.eventType,
            description: event.description,
            severity: event.severity,
          },
        });
      }
    } catch (error) {
      // Provenance system not available, continue without it
    }
  }

  private saveState(): void {
    try {
      const stateData = {
        systemState: this.systemState,
        agents: Object.fromEntries(this.agents),
        lastSaved: new Date().toISOString(),
      };

      writeFileSync(this.statePath, JSON.stringify(stateData, null, 2));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }

  private saveEvents(): void {
    try {
      const eventsData = {
        events: this.events,
        lastSaved: new Date().toISOString(),
      };

      writeFileSync(this.eventsPath, JSON.stringify(eventsData, null, 2));
    } catch (error) {
      console.error('Error saving events:', error);
    }
  }

  private async synchronizeState(): Promise<void> {
    this.updateSystemState();
    await this.detectConflicts();
    this.saveState();

    await this.logSynchronizationEvent({
      eventId: `sync-${Date.now()}`,
      timestamp: new Date().toISOString(),
      agentId: 'system',
      eventType: 'STATE_UPDATE',
      description: 'Periodic state synchronization completed',
      severity: 'LOW',
    });
  }

  public getSystemState(): SystemState {
    return this.systemState;
  }

  public getAgentState(agentId: string): AgentState | undefined {
    return this.agents.get(agentId);
  }

  public getAllAgents(): AgentState[] {
    return Array.from(this.agents.values());
  }

  public getRecentEvents(limit: number = 50): SynchronizationEvent[] {
    return this.events.slice(-limit);
  }

  public async resolveConflict(conflictId: string, resolution: string): Promise<void> {
    const conflict = this.systemState.conflicts.find((c) => c.includes(conflictId));
    if (conflict) {
      this.systemState.conflicts = this.systemState.conflicts.filter((c) => c !== conflict);

      await this.logSynchronizationEvent({
        eventId: `resolve-${Date.now()}`,
        timestamp: new Date().toISOString(),
        agentId: 'system',
        eventType: 'CONFLICT_DETECTED',
        description: `Conflict resolved: ${conflict}`,
        severity: 'LOW',
        resolution: resolution,
        resolvedAt: new Date().toISOString(),
      });
    }
  }

  public generateSynchronizationReport(): string {
    const state = this.getSystemState();
    const recentEvents = this.getRecentEvents(20);

    let report = `# 🔄 AGENT SYNCHRONIZATION REPORT\n\n`;
    report += `**Generated**: ${new Date().toISOString()}\n`;
    report += `**Network Status**: ${state.networkStatus}\n`;
    report += `**Active Agents**: ${state.activeAgents}/${state.totalAgents}\n`;
    report += `**Cultural Safety Score**: ${state.culturalSafetyScore}%\n`;
    report += `**Performance Score**: ${state.performanceScore}%\n`;
    report += `**Last Synchronization**: ${state.lastSynchronization}\n\n`;

    if (state.conflicts.length > 0) {
      report += `## 🚨 ACTIVE CONFLICTS\n\n`;
      state.conflicts.forEach((conflict) => {
        report += `- ${conflict}\n`;
      });
      report += `\n`;
    }

    if (state.criticalIssues.length > 0) {
      report += `## ⚠️ CRITICAL ISSUES\n\n`;
      state.criticalIssues.forEach((issue) => {
        report += `- ${issue}\n`;
      });
      report += `\n`;
    }

    report += `## 📊 AGENT STATUS\n\n`;
    this.agents.forEach((agent) => {
      const lastUpdate = new Date(agent.lastUpdate);
      const timeSince = Math.round((Date.now() - lastUpdate.getTime()) / 1000);

      report += `### ${agent.agentName} (${agent.agentId})\n`;
      report += `- **Status**: ${agent.status}\n`;
      report += `- **Priority**: ${agent.priority}\n`;
      report += `- **Last Update**: ${timeSince}s ago\n`;
      report += `- **Current Task**: ${agent.currentTask || 'Standby'}\n`;
      if (agent.progress !== undefined) {
        report += `- **Progress**: ${agent.progress}%\n`;
      }
      report += `- **Cultural Safety**: ${agent.culturalSafetyStatus}\n`;
      report += `- **Performance**: ${agent.performanceMetrics.taskCompletionRate}% completion rate\n\n`;
    });

    report += `## 📈 RECENT EVENTS\n\n`;
    recentEvents.forEach((event) => {
      const timestamp = new Date(event.timestamp).toLocaleString();
      report += `- **${timestamp}**: ${event.description} (${event.severity})\n`;
    });

    return report;
  }

  public cleanup(): void {
    this.watchers.forEach((watcher) => watcher.close());
    this.watchers.clear();
  }
}

// Export for use in other modules
export { AgentState, AgentSynchronizationManager, SynchronizationEvent, SystemState };

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const manager = new AgentSynchronizationManager();

  // Generate and display synchronization report
  const report = manager.generateSynchronizationReport();
  console.log(report);

  // Save report to file
  const reportPath = join(
    process.cwd(),
    'migration',
    'agent_coordination',
    'synchronization_report.md',
  );
  writeFileSync(reportPath, report);
  console.log(`\n📊 Synchronization report saved to: ${reportPath}`);

  // Cleanup on exit
  process.on('SIGINT', () => {
    console.log('\n🔄 Cleaning up synchronization manager...');
    manager.cleanup();
    process.exit(0);
  });
}
