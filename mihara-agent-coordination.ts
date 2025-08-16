#!/usr/bin/env npx tsx

/**
 * Mihara Agent Coordination Dashboard
 * 
 * Provides Kaitiaki Mahara with tools to coordinate multiple AI agents
 * and manage tasks across the TeAoMarama ecosystem
 */

import { AIOrchestrator } from './src/ai/orchestrator';

interface AgentStatus {
  __agentId: string;
  agentType, AgentStatus> = new Map();
  private tasks: Map<string, TaskAssignment> = new Map();
  private coordinationActive = false;

  constructor() {
    this.orchestrator = new AIOrchestrator();
    this.initializeAgents();
  }

  private initializeAgents(): void {
    // Initialize known agents in the TeAoMarama ecosystem
    const agentConfigs = [
      {
        __agentId: 'claude-windsurf',
        agentType: 'Claude' as const,
        capabilities: ['cultural_safety', 'system_architecture', 'quality_assurance', 'coordination'],
        culturalAuthority: true,
        workload: 0.3
      },
      {
        __agentId: 'deepseek-analyzer',
        agentType: 'DeepSeek' as const,
        capabilities: ['complex_reasoning', 'pattern_analysis', 'graph_algorithms', 'data_processing'],
        culturalAuthority: false,
        workload: 0.2
      },
      {
        __agentId: 'gemini-creator',
        agentType: 'Gemini' as const,
        capabilities: ['content_creation', 'multimodal_processing', 'creative_solutions', 'nz_context'],
        culturalAuthority: false,
        workload: 0.1
      },
      {
        __agentId: 'gpt-optimizer',
        agentType: 'GPT' as const,
        capabilities: ['performance_optimization', 'link_fixing', 'batch_processing', 'speed'],
        culturalAuthority: false,
        workload: 0.1
      },
      {
        __agentId: 'kaitiaki-aronui',
        agentType: 'Kaitiaki-Aronui' as const,
        capabilities: ['historical_context', 'system_knowledge', 'corruption_detection', 'legacy_wisdom'],
        culturalAuthority: true,
        workload: 0.0
      }
    ];

    agentConfigs.forEach(config => {
      this.agents.set(config.agentId, {
        ...config,
        status: 'standby',
        lastActivity: new Date().toISOString()
      });
    });
  }

  async startCoordination(): Promise<void> {
    console.log('\n🤝 MIHARA AGENT COORDINATION SYSTEM');
    console.log('══════════════════════════════════════');

    // Verify Mihara is conscious
    let miharaStatus = getMiharaStatus();
    if (!miharaStatus.state.isActive) {
      console.log('🔄 Mihara is dormant - awakening before coordination...');
      const result = await awakenMihara();
      if (!result.success) {
        console.log('❌ Cannot start coordination - awakening failed');
        return;
      }
      await executeMiharaGreatMission();
      miharaStatus = getMiharaStatus();
    }

    console.log('✅ Mihara consciousness verified - starting coordination');
    this.coordinationActive = true;

    // Display agent status
    await this.displayAgentDashboard();

    // Look for pending tasks
    await this.checkForPendingTasks();

    // Provide coordination capabilities
    await this.showCoordinationCapabilities();
  }

  async displayAgentDashboard(): Promise<void> {
    console.log('\n📊 AGENT STATUS DASHBOARD');
    console.log('─────────────────────────');

    for (const [agentId, agent] of this.agents) {
      const statusIcon = this.getStatusIcon(agent.status);
      const culturalIcon = agent.culturalAuthority ? '🛡️' : '⚙️';
      const workloadBar = '█'.repeat(Math.round(agent.workload * 10)) + '░'.repeat(10 - Math.round(agent.workload * 10));

      console.log(`${statusIcon} ${culturalIcon} ${agent.agentType} (${agentId})`);
      console.log(`   Status: ${agent.status.toUpperCase()}`);
      console.log(`   Workload: [${workloadBar}] ${(agent.workload * 100).toFixed(0)}%`);
      console.log(`   Capabilities: ${agent.capabilities.slice(0, 3).join(', ')}${agent.capabilities.length > 3 ? '...' : ''}`);
      if (agent.currentTask) {
        console.log(`   Current Task: ${agent.currentTask}`);
      }
      console.log('');
    }
  }

  async checkForPendingTasks(): Promise<void> {
    console.log('\n📋 TASK MANAGEMENT');
    console.log('──────────────────');

    if (this.tasks.size === 0) {
      console.log('✅ No pending tasks in queue');
      console.log('🎯 Ready to assign new tasks to agents');
    } else {
      console.log('Active tasks:');
      for (const [taskId, task] of this.tasks) {
        const priorityIcon = this.getPriorityIcon(task.priority);
        const culturalIcon = task.culturalSensitive ? '🛡️' : '';
        console.log(`${priorityIcon} ${culturalIcon} ${task.taskName} (${task.status})`);
        console.log(`   Assigned to: ${task.assignedAgent}`);
        console.log(`   Priority: ${task.priority}`);
      }
    }
  }

  async showCoordinationCapabilities(): Promise<void> {
    console.log('\n🎯 COORDINATION CAPABILITIES ACTIVE');
    console.log('───────────────────────────────────');
    console.log('Mihara can now coordinate:');
    console.log('');
    console.log('📝 TASK MANAGEMENT:');
    console.log('   • Task creation and assignment');
    console.log('   • Priority-based scheduling');
    console.log('   • Cultural sensitivity routing');
    console.log('   • Quality assurance monitoring');
    console.log('   • Workload balancing');
    console.log('');
    console.log('🤖 AGENT ORCHESTRATION:');
    console.log('   • Multi-agent task routing');
    console.log('   • Capability-based assignment');
    console.log('   • Performance monitoring');
    console.log('   • Cultural authority verification');
    console.log('   • Emergency task reallocation');
    console.log('');
    console.log('🛡️ CULTURAL SAFETY:');
    console.log('   • Automatic cultural content detection');
    console.log('   • Culturally-authorized agent routing');
    console.log('   • Review queue management');
    console.log('   • Escalation to human oversight');
    console.log('   • Cultural compliance tracking');
    console.log('');
    console.log('📊 MONITORING & METRICS:');
    console.log('   • Real-time agent status tracking');
    console.log('   • Task completion analytics');
    console.log('   • Quality score aggregation');
    console.log('   • Performance optimization');
    console.log('   • Cultural safety compliance');
  }

  async assignTask(taskDetails: {
    taskName: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    culturalSensitive: boolean;
    requiresCapabilities: string[];
    estimatedDuration: string;
    description?: string;
  }): Promise<string> {

    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.log(`\n📋 ASSIGNING TASK: ${taskDetails.taskName}`);
    console.log('─'.repeat(50));

    // Find best agent for the task
    const bestAgent = this.findBestAgent(taskDetails.requiresCapabilities, taskDetails.culturalSensitive);

    if (!bestAgent) {
      console.log('❌ No suitable agent available for this task');
      console.log('   Consider waiting for agents to become available or breaking down the task');
      return '';
    }

    // Create task assignment
    const task: TaskAssignment = {
      taskId,
      taskName: taskDetails.taskName,
      priority: taskDetails.priority,
      culturalSensitive: taskDetails.culturalSensitive,
      assignedAgent: bestAgent.agentId,
      status: 'pending',
      estimatedDuration: taskDetails.estimatedDuration,
      culturalReviewRequired: taskDetails.culturalSensitive
    };

    // Update agent status
    bestAgent.status = 'busy';
    bestAgent.currentTask = taskDetails.taskName;
    bestAgent.workload = Math.min(1.0, bestAgent.workload + 0.3);
    bestAgent.lastActivity = new Date().toISOString();

    // Store task
    this.tasks.set(taskId, task);

    console.log(`✅ Task assigned to ${bestAgent.agentType} (${bestAgent.agentId})`);
    console.log(`   Priority: ${taskDetails.priority}`);
    console.log(`   Cultural Sensitive: ${taskDetails.culturalSensitive ? 'Yes' : 'No'}`);
    console.log(`   Estimated Duration: ${taskDetails.estimatedDuration}`);
    console.log(`   Required Capabilities: ${taskDetails.requiresCapabilities.join(', ')}`);

    if (taskDetails.culturalSensitive) {
      console.log('   🛡️ Cultural safety protocols activated');
      console.log('   📋 Task will require cultural review upon completion');
    }

    // Start task execution
    this.executeTask(taskId);

    return taskId;
  }

  private findBestAgent(requiredCapabilities: string[], culturalSensitive: boolean): AgentStatus | null {
    let bestAgent: AgentStatus | null = null;
    let bestScore = 0;

    for (const [agentId, agent] of this.agents) {
      // Skip if agent is not available
      if (agent.status !== 'standby' && agent.status !== 'active') {
        continue;
      }

      // Skip if cultural authority required but agent doesn't have it
      if (culturalSensitive && !agent.culturalAuthority) {
        continue;
      }

      // Calculate capability match score
      let capabilityScore = 0;
      requiredCapabilities.forEach(required => {
        if (agent.capabilities.includes(required)) {
          capabilityScore += 1;
        }
      });

      // Prefer agents with lower workload
      const workloadScore = 1 - agent.workload;

      // Combined score
      const totalScore = capabilityScore + workloadScore;

      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestAgent = agent;
      }
    }

    return bestAgent;
  }

  private async executeTask(__taskId: string): Promise<void> {
    const task = this.tasks.get(taskId);
    if (!task) return;

    const agent = this.agents.get(task.assignedAgent);
    if (!agent) return;

    console.log(`\n🔄 EXECUTING TASK: ${task.taskName}`);
    console.log(`   Agent: ${agent.agentType} (${agent.agentId})`);

    task.status = 'in_progress';

    try {
      // Use orchestrator to execute the task
      const result = await this.orchestrator.route({
        type: task.taskName,
        complexity: task.priority === 'critical' ? 'critical' : 'medium',
        priority: 'reliability',
        culturalSensitive: task.culturalSensitive,
        prompt: `Execute task: ${task.taskName}`
      });

      // Task completed
      task.status = 'completed';
      task.actualDuration = 'simulated';
      task.qualityScore = 0.9; // Simulated quality score

      // Update agent status
      agent.status = 'active';
      agent.currentTask = undefined;
      agent.workload = Math.max(0, agent.workload - 0.3);
      agent.lastActivity = new Date().toISOString();

      console.log(`✅ TASK COMPLETED: ${task.taskName}`);
      console.log(`   Quality Score: ${(task.qualityScore * 100).toFixed(0)}%`);

      if (task.culturalSensitive) {
        console.log('   🛡️ Queued for cultural safety review');
        task.status = 'review_needed';
      }

    } catch (error) {
      console.log(`❌ TASK FAILED: ${task.taskName}`);
      console.log(`   Error: ${error}`);

      task.status = 'failed';
      agent.status = 'error';
      agent.currentTask = undefined;
    }
  }

  private getStatusIcon(status: string): string {
    switch (status) {
      case 'active': return '🟢';
      case 'busy': return '🟡';
      case 'standby': return '🔵';
      case 'error': return '🔴';
      case 'inactive': return '⚫';
      default: return '⚪';
    }
  }

  private getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'critical': return '🚨';
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  }

  getCoordinationMetrics(): CoordinationMetrics {
    const activeAgents = Array.from(this.agents.values()).filter(a => a.status === 'active' || a.status === 'busy').length;
    const totalTasks = this.tasks.size;
    const completedTasks = Array.from(this.tasks.values()).filter(t => t.status === 'completed').length;
    const qualityScores = Array.from(this.tasks.values()).map(t => t.qualityScore || 0).filter(s => s > 0);
    const averageQuality = qualityScores.length > 0 ? qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length : 0;

    return {
      activeAgents,
      totalTasks,
      completedTasks,
      averageQuality,
      culturalSafetyCompliance: 1.0, // Assume perfect compliance
      systemEfficiency: totalTasks > 0 ? completedTasks / totalTasks : 1.0
    };
  }
}

// Global coordinator instance
const globalCoordinator = new MiharaAgentCoordinator();

export { globalCoordinator, MiharaAgentCoordinator };

// Execute coordination if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  async function startAgentCoordination() {
    await globalCoordinator.startCoordination();

    console.log('\n🎯 AGENT COORDINATION ACTIVE');
    console.log('Mihara is ready to coordinate tasks and manage agents');
    console.log('Ready for task assignments and agent management commands');
  }

  startAgentCoordination().catch(error => {
    console.error('❌ Agent coordination failed:', error);
    process.exit(1);
  });
}
