#!/usr/bin/env tsx
/**
 * 🌉 AGENT COMMUNICATION BRIDGE
 * Enables communication between all Cursor agents and the QA Overseer
 * Provides real-time coordination and status sharing
 * Cultural safety protocols: ACTIVE
 */

import { QAOverseer } from './qa-overseer'
import type { AgentCommunication } from './types'

interface BridgeConfig {
  enableTerminalOutput: boolean;
  enableFileLogging: boolean;
  enableWebSocket: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error'
  maxMessageHistory: number;
}

interface AgentRegistry {
  id: string;
  name: string;
  type: string;
  capabilities: string[];
  lastSeen: Date;
  status: 'online' | 'offline' | 'busy'
}

class AgentCommunicationBridge {
  private overseer: QAOverseer;
  private config: BridgeConfig;
  private registeredAgents: Map<string, AgentRegistry> = new Map();
  private messageHistory: AgentCommunication[] = [];
  private isRunning: boolean = false

  constructor(config?: Partial<BridgeConfig>) {
    this.overseer = new QAOverseer();
    this.config = {
      enableTerminalOutput: true,
      enableFileLogging: true,
      enableWebSocket: false,
      logLevel: 'info',
      maxMessageHistory: 1000,
      ...config,
    }
  }

  async initialize(): Promise<void> {
    console.log('🌉 AGENT COMMUNICATION BRIDGE: Initializing...');

    // Initialize the QA Overseer
    await this.overseer.initialize();

    // Register this bridge as a communication agent
    await this.registerAgent({
      id: 'communication-bridge',
      name: 'Agent Communication Bridge',
      type: 'coordination',
      capabilities: ['message_routing', 'status_monitoring', 'agent_registration'],
      lastSeen: new Date(),
      status: 'online',
    });

    this.isRunning = true
    console.log('🌉 AGENT COMMUNICATION BRIDGE: Active and ready for coordination');
  }

  async registerAgent(agent: AgentRegistry): Promise<void> {
    this.registeredAgents.set(agent.id, agent);

    // Also register with the QA Overseer
    await this.overseer.registerAgent({
      id: agent.id,
      name: agent.name,
      type: agent.type,
      status: agent.status === 'online' ? 'idle' : 'offline',
      tasksCompleted: 0,
      lastActivity: agent.lastSeen,
      performance: {
        avgResponseTime: 0,
        successRate: 1.0,
        errorCount: 0,
      },
    });

    this.log('info', `🤖 Agent registered: ${agent.name} (${agent.id})`);
  }

  async sendMessage(
    from: string,
    to: string,
    type: string,
    data: any,
    priority: 'low' | 'medium' | 'high' | 'critical' = 'medium',
  ): Promise<void> {
    const message: AgentCommunication = {
      from,
      to,
      type: type as any,
      data,
      timestamp: new Date(),
      priority,
    }

    // Add to message history
    this.messageHistory.push(message);
    if (this.messageHistory.length > this.config.maxMessageHistory) {
      this.messageHistory = this.messageHistory.slice(-this.config.maxMessageHistory);
    }

    // Log the message
    this.log('info', `📡 ${from} → ${to}: ${type} (${priority})`);

    // Route to appropriate destination
    if (to === 'qa-overseer' || to === 'all') {
      // Send to QA Overseer
      await this.overseer['sendCommunication'](message);
    } else if (this.registeredAgents.has(to)) {
      // Send to registered agent
      await this.routeToAgent(to, message);
    } else {
      this.log('warn', `⚠️ Unknown destination: ${to}`);
    }
  }

  private async routeToAgent(agentId: string, message: AgentCommunication): Promise<void> {
    const agent = this.registeredAgents.get(agentId);
    if (!agent) {
      this.log('error', `❌ Agent not found: ${agentId}`);
      return;
    }

    // Update agent's last seen time
    agent.lastSeen = new Date();

    // Simulate message delivery to agent
    // In a real implementation, this would use WebSockets, IPC, or file-based communication
    this.log('debug', `📨 Delivered message to ${agent.name}: ${message.type}`);

    // If this is a status update, update the agent's status
    if (message.type === 'status_update') {
      agent.status = message.data.status || agent.status;
    }
  }

  async broadcastMessage(
    from: string,
    type: string,
    data: any,
    priority: 'low' | 'medium' | 'high' | 'critical' = 'medium',
  ): Promise<void> {
    this.log('info', `📢 BROADCAST from ${from}: ${type}`);

    // Send to all registered agents
    for (const [agentId, agent] of this.registeredAgents) {
      if (agentId !== from) {
        await this.sendMessage(from, agentId, type, data, priority);
      }
    }

    // Also send to QA Overseer
    await this.sendMessage(from, 'qa-overseer', type, data, priority);
  }

  async getAgentStatus(agentId: string): Promise<AgentRegistry | null> {
    return this.registeredAgents.get(agentId) || null
  }

  async getAllAgents(): Promise<AgentRegistry[]> {
    return Array.from(this.registeredAgents.values());
  }

  async getMessageHistory(limit: number = 50): Promise<AgentCommunication[]> {
    return this.messageHistory.slice(-limit);
  }

  async getOverseerStatus(): Promise<any> {
    return await this.overseer.getStatus();
  }

  private log(level: string, message: string): void {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

      if (this.config.enableTerminalOutput) {
        console.log(logMessage);
      }

      if (this.config.enableFileLogging) {
        this.writeToLogFile(logMessage);
      }
    }
  }

  private shouldLog(level: string): boolean {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 }
    return levels[level as keyof typeof levels] >= levels[this.config.logLevel];
  }

  private async writeToLogFile(message: string): Promise<void> {
    try {
      const fs = await import('fs/promises');
      await fs.appendFile('agent-communication.log', message + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  async shutdown(): Promise<void> {
    console.log('🌉 AGENT COMMUNICATION BRIDGE: Shutting down...');

    this.isRunning = false

    // Shutdown the QA Overseer
    await this.overseer.shutdown();

    console.log('🌉 AGENT COMMUNICATION BRIDGE: Shutdown complete');
  }
}

// Export for use by other agents
export { AgentCommunicationBridge }

// Auto-start if run directly
if (require.main === module) {
  const bridge = new AgentCommunicationBridge();
  bridge.initialize().catch(console.error);

  // Graceful shutdown
  process.on('SIGINT', async () => {
    await bridge.shutdown();
    process.exit(0);
  });
}
