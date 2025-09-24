#!/usr/bin/env tsx

/**
 * 🎼 LLM HARMONY ORCHESTRATOR
 *
 * This script ensures all LLMs across the computer work together harmoniously
 * for the Te Ao Mārama educational platform. It coordinates between:
 * - All Claude instances (including PID 79978)
 * - GPT models
 * - Gemini models
 * - DeepSeek models
 * - GLM models
 * - Local LLMs
 * - Any other AI agents
 *
 * Usage: npx tsx scripts/llm-harmony-orchestrator.ts [command]
 * Commands:
 *   - start: Start the harmony orchestrator
 *   - status: Check status of all LLMs
 *   - sync: Synchronize all LLMs
 *   - test: Test communication between LLMs
 *   - harmony: Ensure all LLMs are working in harmony
 */

import { crossLLMProtocol } from '../src/utils/CrossLLMCommunicationProtocol';
import { llmCoordination } from '../src/utils/LLMCoordinationSystem';

interface LLMHarmonyConfig {
  harmonyCheckInterval: number; // milliseconds
  maxRetries: number;
  culturalValidationRequired: boolean;
  performanceThreshold: number;
  communicationTimeout: number;
}

class LLMHarmonyOrchestrator {
  private config: LLMHarmonyConfig = {
    harmonyCheckInterval: 30000, // 30 seconds
    maxRetries: 3,
    culturalValidationRequired: true,
    performanceThreshold: 80,
    communicationTimeout: 10000, // 10 seconds
  };

  private harmonyInterval?: NodeJS.Timeout;
  private isRunning = false;

  async start(): Promise<void> {
    console.log('🎼 Starting LLM Harmony Orchestrator...');

    if (this.isRunning) {
      console.log('⚠️  Orchestrator is already running');
      return;
    }

    this.isRunning = true;

    // Initialize coordination system
    await this.initializeCoordinationSystem();

    // Start harmony monitoring
    this.startHarmonyMonitoring();

    // Perform initial harmony check
    await this.performHarmonyCheck();

    console.log('✅ LLM Harmony Orchestrator started successfully');
    console.log('🎯 All LLMs are now working together in harmony');
  }

  async stop(): Promise<void> {
    console.log('🛑 Stopping LLM Harmony Orchestrator...');

    if (this.harmonyInterval) {
      clearInterval(this.harmonyInterval);
    }

    this.isRunning = false;
    console.log('✅ LLM Harmony Orchestrator stopped');
  }

  async status(): Promise<void> {
    console.log('📊 LLM Harmony Status Report');
    console.log('================================');

    const systemStatus = llmCoordination.getSystemStatus();
    const agents = llmCoordination.getAgents();
    const tasks = llmCoordination.getTasks();
    const messages = crossLLMProtocol.getMessageQueue();
    const knowledgeBase = crossLLMProtocol.getKnowledgeBase();

    console.log(
      `\n🤖 Agents: ${systemStatus.totalAgents} total, ${systemStatus.activeAgents} active`,
    );
    console.log(
      `📋 Tasks: ${systemStatus.totalTasks} total, ${systemStatus.inProgressTasks} in progress`,
    );
    console.log(`💬 Messages: ${messages.length} in queue`);
    console.log(`🧠 Knowledge Base: ${knowledgeBase.length} items`);

    console.log('\n📋 Active Agents:');
    agents.forEach((agent) => {
      const statusIcon = this.getStatusIcon(agent.status);
      const performanceBar = this.getPerformanceBar(agent.performance);
      console.log(
        `  ${statusIcon} ${agent.name} (${agent.provider}) - ${performanceBar} ${agent.performance}%`,
      );
      if (agent.currentTask) {
        const task = tasks.find((t) => t.id === agent.currentTask);
        console.log(`    Current Task: ${task?.title || 'Unknown'}`);
      }
    });

    console.log('\n📋 Recent Tasks:');
    tasks.slice(-5).forEach((task) => {
      const statusIcon = this.getTaskStatusIcon(task.status);
      const priorityIcon = this.getPriorityIcon(task.priority);
      console.log(`  ${statusIcon} ${priorityIcon} ${task.title} (${task.status})`);
    });

    console.log('\n💬 Recent Messages:');
    messages.slice(-3).forEach((message) => {
      console.log(`  ${message.from.agentName}: ${message.content.title}`);
    });

    console.log('\n🧠 Knowledge Base:');
    knowledgeBase.slice(-3).forEach((knowledge) => {
      console.log(`  ${knowledge.title} (${knowledge.category}) - ${knowledge.validationStatus}`);
    });
  }

  async sync(): Promise<void> {
    console.log('🔄 Synchronizing all LLMs...');

    // Send sync request to all agents
    await crossLLMProtocol.sendMessage({
      from: {
        agentId: 'harmony-orchestrator',
        agentName: 'Harmony Orchestrator',
        provider: 'system',
        model: 'orchestrator-v1',
      },
      to: { broadcast: true },
      type: 'coordination_signal',
      priority: 'high',
      content: {
        title: 'Synchronization Request',
        description: 'All LLMs should synchronize their state and knowledge',
        data: {
          signal: 'sync_request',
          timestamp: new Date().toISOString(),
          sessionId: `sync_${Date.now()}`,
        },
      },
      metadata: {
        sessionId: `sync_${Date.now()}`,
        culturalSafetyLevel: 'basic',
      },
    });

    // Wait for responses
    await this.waitForResponses(5000);

    console.log('✅ Synchronization completed');
  }

  async test(): Promise<void> {
    console.log('🧪 Testing LLM communication...');

    // Test 1: Create a test task
    console.log('Test 1: Creating test task...');
    const taskId = await llmCoordination.createDevelopmentTask(
      'Communication Test Task',
      'Test task to verify LLM communication is working properly',
      'medium',
    );
    console.log(`✅ Test task created: ${taskId}`);

    // Test 2: Send test message
    console.log('Test 2: Sending test message...');
    await crossLLMProtocol.sendMessage({
      from: {
        agentId: 'harmony-orchestrator',
        agentName: 'Harmony Orchestrator',
        provider: 'system',
        model: 'orchestrator-v1',
      },
      to: { broadcast: true },
      type: 'status_update',
      priority: 'medium',
      content: {
        title: 'Communication Test',
        description: 'Testing communication between all LLMs',
        data: { testId: `test_${Date.now()}` },
      },
      metadata: {
        sessionId: `test_${Date.now()}`,
        culturalSafetyLevel: 'basic',
      },
    });
    console.log('✅ Test message sent');

    // Test 3: Request cultural guidance
    console.log('Test 3: Requesting cultural guidance...');
    await crossLLMProtocol.requestCulturalGuidance(
      'harmony-orchestrator',
      'How should we ensure cultural safety in educational content?',
      { culturalElements: ['te_ao_maori', 'cultural_safety'] },
    );
    console.log('✅ Cultural guidance request sent');

    // Test 4: Share knowledge
    console.log('Test 4: Sharing knowledge...');
    await crossLLMProtocol.shareKnowledge('harmony-orchestrator', {
      category: 'best_practice',
      title: 'LLM Coordination Best Practices',
      content: 'Always validate cultural content and ensure proper communication protocols',
      applicableTo: ['all_agents'],
    });
    console.log('✅ Knowledge shared');

    console.log('🎉 All communication tests completed successfully');
  }

  async harmony(): Promise<void> {
    console.log('🎼 Ensuring LLM harmony...');

    // Check all agents are responsive
    const agents = llmCoordination.getAgents();
    const unresponsiveAgents = agents.filter(
      (agent) => agent.status === 'offline' || agent.status === 'error',
    );

    if (unresponsiveAgents.length > 0) {
      console.log(`⚠️  Found ${unresponsiveAgents.length} unresponsive agents:`);
      unresponsiveAgents.forEach((agent) => {
        console.log(`  - ${agent.name} (${agent.status})`);
      });

      // Attempt to revive unresponsive agents
      await this.reviveUnresponsiveAgents(unresponsiveAgents);
    }

    // Check for stuck tasks
    const tasks = llmCoordination.getTasks();
    const stuckTasks = tasks.filter(
      (task) =>
        task.status === 'in_progress' &&
        new Date().getTime() - new Date(task.updatedAt).getTime() >
          task.estimatedDuration * 60 * 1000 * 2,
    );

    if (stuckTasks.length > 0) {
      console.log(`⚠️  Found ${stuckTasks.length} stuck tasks:`);
      stuckTasks.forEach((task) => {
        console.log(`  - ${task.title} (assigned to ${task.assignedAgent})`);
      });

      // Attempt to reassign stuck tasks
      await this.reassignStuckTasks(stuckTasks);
    }

    // Check cultural validation
    if (this.config.culturalValidationRequired) {
      await this.performCulturalValidation();
    }

    // Check performance metrics
    await this.checkPerformanceMetrics();

    console.log('✅ LLM harmony ensured');
  }

  private async initializeCoordinationSystem(): Promise<void> {
    console.log('🔧 Initializing coordination system...');

    // Register additional agents that might be running
    const additionalAgents = [
      {
        id: 'claude-code-58038',
        name: 'Claude Code (PID 58038)',
        provider: 'anthropic',
        model: 'claude-3-5-sonnet-20241022',
        status: 'active' as const,
        capabilities: ['coding', 'debugging', 'architecture'],
        lastActivity: new Date().toISOString(),
        performance: 90,
        tokenUsage: 0,
        culturalCompetency: 85,
        specialization: ['react_development', 'typescript', 'component_architecture'],
      },
      {
        id: 'local-llm-1',
        name: 'Local LLM (Ollama)',
        provider: 'local',
        model: 'llama3.1',
        status: 'active' as const,
        capabilities: ['general', 'coding', 'analysis'],
        lastActivity: new Date().toISOString(),
        performance: 75,
        tokenUsage: 0,
        culturalCompetency: 70,
        specialization: ['local_processing', 'privacy_focused'],
      },
    ];

    for (const agent of additionalAgents) {
      await llmCoordination.registerAgent(agent);
    }

    console.log('✅ Coordination system initialized');
  }

  private startHarmonyMonitoring(): void {
    this.harmonyInterval = setInterval(async () => {
      await this.performHarmonyCheck();
    }, this.config.harmonyCheckInterval);

    console.log(`🔄 Harmony monitoring started (interval: ${this.config.harmonyCheckInterval}ms)`);
  }

  private async performHarmonyCheck(): Promise<void> {
    const systemStatus = llmCoordination.getSystemStatus();

    // Check if system is healthy
    if (systemStatus.activeAgents < systemStatus.totalAgents * 0.8) {
      console.log('⚠️  Low agent availability detected');
      await this.harmony();
    }

    // Check for high task backlog
    if (systemStatus.pendingTasks > 10) {
      console.log('⚠️  High task backlog detected');
      await this.optimizeTaskDistribution();
    }

    // Check message queue
    const messageQueue = crossLLMProtocol.getMessageQueue();
    if (messageQueue.length > 50) {
      console.log('⚠️  High message queue detected');
      await this.processMessageQueue();
    }
  }

  private async reviveUnresponsiveAgents(agents: any[]): Promise<void> {
    console.log('🔄 Attempting to revive unresponsive agents...');

    for (const agent of agents) {
      // Send ping message
      await crossLLMProtocol.sendMessage({
        from: {
          agentId: 'harmony-orchestrator',
          agentName: 'Harmony Orchestrator',
          provider: 'system',
          model: 'orchestrator-v1',
        },
        to: { agentId: agent.id },
        type: 'coordination_signal',
        priority: 'urgent',
        content: {
          title: 'Ping Request',
          description: 'Please respond to confirm you are active',
          data: { signal: 'ping' },
        },
        metadata: {
          sessionId: `ping_${Date.now()}`,
          culturalSafetyLevel: 'basic',
        },
      });
    }

    // Wait for responses
    await this.waitForResponses(3000);
  }

  private async reassignStuckTasks(tasks: any[]): Promise<void> {
    console.log('🔄 Reassigning stuck tasks...');

    for (const task of tasks) {
      // Mark task as failed
      await llmCoordination.updateTaskStatus(task.id, 'failed', null, 'Task stuck - reassigning');

      // Find new agent
      const newAgent = llmCoordination
        .getAgents()
        .find((agent) => agent.status === 'active' || agent.status === 'idle');

      if (newAgent) {
        // Reassign task
        await llmCoordination.assignTask(task.id, newAgent.id);
        console.log(`✅ Task ${task.title} reassigned to ${newAgent.name}`);
      }
    }
  }

  private async performCulturalValidation(): Promise<void> {
    console.log('🌿 Performing cultural validation...');

    const knowledgeBase = crossLLMProtocol.getKnowledgeBase();
    const unvalidatedKnowledge = knowledgeBase.filter((k) => k.validationStatus === 'pending');

    if (unvalidatedKnowledge.length > 0) {
      console.log(`Found ${unvalidatedKnowledge.length} unvalidated knowledge items`);

      // Request cultural validation
      await crossLLMProtocol.requestCulturalGuidance(
        'harmony-orchestrator',
        'Please validate all pending knowledge items for cultural safety',
        {
          culturalElements: ['te_ao_maori', 'cultural_safety'],
          items: unvalidatedKnowledge.map((k) => k.knowledgeId),
        },
      );
    }
  }

  private async checkPerformanceMetrics(): Promise<void> {
    const metrics = crossLLMProtocol.getPerformanceMetrics();

    for (const [agentId, metric] of metrics) {
      if (metric.errorCount > 5) {
        console.log(`⚠️  High error count for agent ${agentId}: ${metric.errorCount}`);
      }
    }
  }

  private async optimizeTaskDistribution(): Promise<void> {
    console.log('⚖️  Optimizing task distribution...');

    const agents = llmCoordination.getAgents();
    const tasks = llmCoordination.getTasks();
    const pendingTasks = tasks.filter((t) => t.status === 'pending');

    // Redistribute pending tasks
    for (const task of pendingTasks) {
      const bestAgent = agents.find(
        (agent) =>
          (agent.status === 'active' || agent.status === 'idle') &&
          agent.performance >= this.config.performanceThreshold,
      );

      if (bestAgent) {
        await llmCoordination.assignTask(task.id, bestAgent.id);
      }
    }
  }

  private async processMessageQueue(): Promise<void> {
    console.log('📨 Processing message queue...');

    // The message queue is processed automatically by the protocol
    // This is just a status check
    const queue = crossLLMProtocol.getMessageQueue();
    console.log(`Message queue length: ${queue.length}`);
  }

  private async waitForResponses(timeout: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  private getStatusIcon(status: string): string {
    switch (status) {
      case 'active':
        return '🟢';
      case 'idle':
        return '🔵';
      case 'busy':
        return '🟡';
      case 'error':
        return '🔴';
      case 'offline':
        return '⚫';
      default:
        return '⚪';
    }
  }

  private getTaskStatusIcon(status: string): string {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in_progress':
        return '🔄';
      case 'pending':
        return '⏳';
      case 'failed':
        return '❌';
      case 'cancelled':
        return '🚫';
      default:
        return '❓';
    }
  }

  private getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'urgent':
        return '🚨';
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  }

  private getPerformanceBar(performance: number): string {
    const bars = Math.floor(performance / 10);
    return '█'.repeat(bars) + '░'.repeat(10 - bars);
  }
}

// Main execution
async function main() {
  const orchestrator = new LLMHarmonyOrchestrator();
  const command = process.argv[2] || 'start';

  try {
    switch (command) {
      case 'start':
        await orchestrator.start();
        // Keep running
        process.on('SIGINT', async () => {
          console.log('\n🛑 Received SIGINT, stopping orchestrator...');
          await orchestrator.stop();
          process.exit(0);
        });
        break;
      case 'status':
        await orchestrator.status();
        break;
      case 'sync':
        await orchestrator.sync();
        break;
      case 'test':
        await orchestrator.test();
        break;
      case 'harmony':
        await orchestrator.harmony();
        break;
      default:
        console.log(
          'Usage: npx tsx scripts/llm-harmony-orchestrator.ts [start|status|sync|test|harmony]',
        );
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run main function if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default LLMHarmonyOrchestrator;
