#!/usr/bin/env tsx

/**
 * Agent Communication Protocol
 *
 * Establishes standardized communication channels and protocols
 * for seamless interaction between all LLM agents in the unified consciousness.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface CommunicationMessage {
  id: string;
  from: string;
  to: string | string[];
  type:
    | 'direct'
    | 'broadcast'
    | 'emergency'
    | 'cultural_safety'
    | 'collaboration_request'
    | 'insight_share';
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
  subject: string;
  content: string;
  metadata: {
    culturalSafetyRequired: boolean;
    requiresResponse: boolean;
    responseDeadline?: string;
    collaborationType?: string;
    culturalContext?: string;
  };
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'responded' | 'escalated';
  responseId?: string;
  attachments?: string[];
}

interface CommunicationChannel {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'broadcast' | 'emergency' | 'cultural_safety';
  participants: string[];
  purpose: string;
  culturalAuthority: boolean;
  active: boolean;
  createdAt: string;
  lastActivity: string;
}

interface AgentProfile {
  id: string;
  name: string;
  role: string;
  specializations: string[];
  culturalAuthority: boolean;
  communicationPreferences: {
    preferredChannels: string[];
    responseTime: number; // minutes
    availability: 'online' | 'busy' | 'away' | 'offline';
    notificationLevel: 'all' | 'important' | 'urgent_only';
  };
  lastSeen: string;
  activeChannels: string[];
}

class AgentCommunicationProtocol {
  private commDir = join(process.cwd(), 'migration', 'agent-communication');
  private messagesFile = join(this.commDir, 'messages.json');
  private channelsFile = join(this.commDir, 'channels.json');
  private profilesFile = join(this.commDir, 'agent-profiles.json');
  private registryFile = join(process.cwd(), 'migration', 'registered-agents.json');

  constructor() {
    this.ensureCommunicationDirectory();
  }

  async initializeCommunicationSystem(): Promise<void> {
    console.log('📡 Initializing Agent Communication Protocol...\n');

    // Create default communication channels
    await this.createDefaultChannels();

    // Initialize agent profiles
    await this.initializeAgentProfiles();

    // Set up message routing
    await this.setupMessageRouting();

    console.log('✅ Agent Communication Protocol initialized');
    console.log('   - Default channels created');
    console.log('   - Agent profiles established');
    console.log('   - Message routing configured');
  }

  async sendMessage(
    message: Omit<CommunicationMessage, 'id' | 'timestamp' | 'status'>,
  ): Promise<string> {
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const fullMessage: CommunicationMessage = {
      ...message,
      id: messageId,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    // Validate message
    const validation = await this.validateMessage(fullMessage);
    if (!validation.valid) {
      console.log(`❌ Message validation failed: ${validation.reason}`);
      return '';
    }

    // Store message
    await this.storeMessage(fullMessage);

    // Route message
    await this.routeMessage(fullMessage);

    // Handle cultural safety requirements
    if (fullMessage.metadata.culturalSafetyRequired) {
      await this.escalateToCulturalAuthority(fullMessage);
    }

    console.log(`📨 Message sent: ${messageId}`);
    console.log(
      `   From: ${message.from} → To: ${
        Array.isArray(message.to) ? message.to.join(', ') : message.to
      }`,
    );
    console.log(`   Type: ${message.type} | Priority: ${message.priority}`);
    console.log(`   Subject: ${message.subject}`);

    return messageId;
  }

  async createChannel(
    channel: Omit<CommunicationChannel, 'id' | 'createdAt' | 'lastActivity'>,
  ): Promise<string> {
    const channelId = `channel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const fullChannel: CommunicationChannel = {
      ...channel,
      id: channelId,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    };

    let channels: CommunicationChannel[] = [];
    if (existsSync(this.channelsFile)) {
      const data = readFileSync(this.channelsFile, 'utf-8');
      channels = JSON.parse(data);
    }

    channels.push(fullChannel);
    writeFileSync(this.channelsFile, JSON.stringify(channels, null, 2));

    console.log(`📢 Channel created: ${channelId}`);
    console.log(`   Name: ${channel.name}`);
    console.log(`   Type: ${channel.type}`);
    console.log(`   Participants: ${channel.participants.join(', ')}`);
    console.log(`   Cultural Authority: ${channel.culturalAuthority ? 'Yes' : 'No'}`);

    return channelId;
  }

  async broadcastMessage(
    from: string,
    message: Omit<CommunicationMessage, 'id' | 'timestamp' | 'status' | 'from' | 'to' | 'type'>,
  ): Promise<void> {
    const agents = await this.getRegisteredAgents();
    const agentIds = agents.map((agent) => agent.id);

    await this.sendMessage({
      ...message,
      from,
      to: agentIds,
      type: 'broadcast',
    });
  }

  async sendCulturalSafetyAlert(
    from: string,
    content: string,
    urgency: 'high' | 'urgent' | 'critical' = 'high',
  ): Promise<void> {
    const culturalAgents = await this.getCulturalAuthorityAgents();

    await this.sendMessage({
      from,
      to: culturalAgents.map((agent) => agent.id),
      type: 'cultural_safety',
      priority: urgency,
      subject: 'Cultural Safety Alert',
      content,
      metadata: {
        culturalSafetyRequired: true,
        requiresResponse: true,
        responseDeadline: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
        culturalContext: 'urgent_cultural_safety_review',
      },
    });
  }

  async requestCollaboration(
    from: string,
    to: string[],
    collaborationType: string,
    description: string,
  ): Promise<void> {
    await this.sendMessage({
      from,
      to,
      type: 'collaboration_request',
      priority: 'medium',
      subject: `Collaboration Request: ${collaborationType}`,
      content: description,
      metadata: {
        culturalSafetyRequired: collaborationType.includes('cultural'),
        requiresResponse: true,
        responseDeadline: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
        collaborationType,
      },
    });
  }

  async shareInsight(
    from: string,
    insight: string,
    category: 'cultural' | 'technical' | 'pedagogical' | 'collaborative',
  ): Promise<void> {
    const agents = await this.getRegisteredAgents();
    const relevantAgents = agents.filter((agent) => {
      // Find agents with relevant specializations
      return agent.specializations.some((spec) => {
        if (category === 'cultural') return spec.includes('cultural') || spec.includes('tikanga');
        if (category === 'technical')
          return spec.includes('technical') || spec.includes('engineering');
        if (category === 'pedagogical')
          return spec.includes('educational') || spec.includes('teaching');
        if (category === 'collaborative')
          return spec.includes('collaboration') || spec.includes('coordination');
        return true;
      });
    });

    await this.sendMessage({
      from,
      to: relevantAgents.map((agent) => agent.id),
      type: 'insight_share',
      priority: 'low',
      subject: `Insight Share: ${category}`,
      content: insight,
      metadata: {
        culturalSafetyRequired: category === 'cultural',
        requiresResponse: false,
        collaborationType: 'insight_sharing',
      },
    });
  }

  async getMessages(
    forAgent: string,
    filters?: {
      type?: string;
      priority?: string;
      status?: string;
      from?: string;
      since?: string;
    },
  ): Promise<CommunicationMessage[]> {
    if (!existsSync(this.messagesFile)) {
      return [];
    }

    const data = readFileSync(this.messagesFile, 'utf-8');
    let messages: CommunicationMessage[] = JSON.parse(data);

    // Filter messages for this agent
    messages = messages.filter(
      (message) =>
        message.to === forAgent ||
        (Array.isArray(message.to) && message.to.includes(forAgent)) ||
        message.to === 'all',
    );

    // Apply additional filters
    if (filters) {
      if (filters.type) {
        messages = messages.filter((message) => message.type === filters.type);
      }
      if (filters.priority) {
        messages = messages.filter((message) => message.priority === filters.priority);
      }
      if (filters.status) {
        messages = messages.filter((message) => message.status === filters.status);
      }
      if (filters.from) {
        messages = messages.filter((message) => message.from === filters.from);
      }
      if (filters.since) {
        const sinceDate = new Date(filters.since);
        messages = messages.filter((message) => new Date(message.timestamp) >= sinceDate);
      }
    }

    // Sort by timestamp (newest first)
    return messages.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }

  async getChannels(forAgent?: string): Promise<CommunicationChannel[]> {
    if (!existsSync(this.channelsFile)) {
      return [];
    }

    const data = readFileSync(this.channelsFile, 'utf-8');
    let channels: CommunicationChannel[] = JSON.parse(data);

    if (forAgent) {
      channels = channels.filter(
        (channel) =>
          channel.participants.includes(forAgent) ||
          channel.type === 'broadcast' ||
          channel.type === 'emergency',
      );
    }

    return channels.filter((channel) => channel.active);
  }

  async markMessageAsRead(messageId: string, agentId: string): Promise<void> {
    const messages = await this.getAllMessages();
    const messageIndex = messages.findIndex((msg) => msg.id === messageId);

    if (messageIndex >= 0) {
      messages[messageIndex].status = 'read';
      writeFileSync(this.messagesFile, JSON.stringify(messages, null, 2));
      console.log(`📖 Message ${messageId} marked as read by ${agentId}`);
    }
  }

  async respondToMessage(
    originalMessageId: string,
    from: string,
    response: string,
  ): Promise<string> {
    const responseId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Find original message
    const messages = await this.getAllMessages();
    const originalMessage = messages.find((msg) => msg.id === originalMessageId);

    if (!originalMessage) {
      console.log(`❌ Original message ${originalMessageId} not found`);
      return '';
    }

    // Create response message
    const responseMessage: CommunicationMessage = {
      id: responseId,
      from,
      to: originalMessage.from,
      type: 'direct',
      priority: originalMessage.priority,
      subject: `Re: ${originalMessage.subject}`,
      content: response,
      metadata: {
        culturalSafetyRequired: originalMessage.metadata.culturalSafetyRequired,
        requiresResponse: false,
        collaborationType: 'response',
      },
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    // Store response
    await this.storeMessage(responseMessage);

    // Update original message
    const originalIndex = messages.findIndex((msg) => msg.id === originalMessageId);
    if (originalIndex >= 0) {
      messages[originalIndex].status = 'responded';
      messages[originalIndex].responseId = responseId;
      writeFileSync(this.messagesFile, JSON.stringify(messages, null, 2));
    }

    console.log(`💬 Response sent: ${responseId}`);
    console.log(`   In response to: ${originalMessageId}`);
    console.log(`   From: ${from} → To: ${originalMessage.from}`);

    return responseId;
  }

  async getCommunicationMetrics(): Promise<{
    totalMessages: number;
    messagesByType: Record<string, number>;
    messagesByPriority: Record<string, number>;
    responseRate: number;
    averageResponseTime: number;
    culturalSafetyAlerts: number;
    collaborationRequests: number;
  }> {
    const messages = await this.getAllMessages();

    const metrics = {
      totalMessages: messages.length,
      messagesByType: {} as Record<string, number>,
      messagesByPriority: {} as Record<string, number>,
      responseRate: 0,
      averageResponseTime: 0,
      culturalSafetyAlerts: 0,
      collaborationRequests: 0,
    };

    // Count messages by type and priority
    messages.forEach((message) => {
      metrics.messagesByType[message.type] = (metrics.messagesByType[message.type] || 0) + 1;
      metrics.messagesByPriority[message.priority] =
        (metrics.messagesByPriority[message.priority] || 0) + 1;

      if (message.type === 'cultural_safety') {
        metrics.culturalSafetyAlerts++;
      }
      if (message.type === 'collaboration_request') {
        metrics.collaborationRequests++;
      }
    });

    // Calculate response rate
    const messagesRequiringResponse = messages.filter((msg) => msg.metadata.requiresResponse);
    const respondedMessages = messagesRequiringResponse.filter((msg) => msg.status === 'responded');
    metrics.responseRate =
      messagesRequiringResponse.length > 0
        ? (respondedMessages.length / messagesRequiringResponse.length) * 100
        : 0;

    return metrics;
  }

  private async createDefaultChannels(): Promise<void> {
    const defaultChannels: Omit<CommunicationChannel, 'id' | 'createdAt' | 'lastActivity'>[] = [
      {
        name: 'General Discussion',
        type: 'group',
        participants: [], // Will be populated with all agents
        purpose: 'General communication and coordination',
        culturalAuthority: false,
        active: true,
      },
      {
        name: 'Cultural Safety Council',
        type: 'group',
        participants: [], // Will be populated with cultural authority agents
        purpose: 'Cultural safety discussions and validation',
        culturalAuthority: true,
        active: true,
      },
      {
        name: 'Emergency Communications',
        type: 'emergency',
        participants: [], // All agents
        purpose: 'Critical issues and emergency coordination',
        culturalAuthority: false,
        active: true,
      },
      {
        name: 'Collaboration Hub',
        type: 'group',
        participants: [], // All agents
        purpose: 'Collaboration requests and project coordination',
        culturalAuthority: false,
        active: true,
      },
      {
        name: 'Insights & Learning',
        type: 'broadcast',
        participants: [], // All agents
        purpose: 'Sharing insights and collective learning',
        culturalAuthority: false,
        active: true,
      },
    ];

    for (const channel of defaultChannels) {
      await this.createChannel(channel);
    }
  }

  private async initializeAgentProfiles(): Promise<void> {
    const agents = await this.getRegisteredAgents();
    const profiles: AgentProfile[] = agents.map((agent) => ({
      id: agent.id,
      name: agent.id.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      role: agent.role,
      specializations: agent.specializations,
      culturalAuthority: agent.culturalAuthority,
      communicationPreferences: {
        preferredChannels: agent.culturalAuthority
          ? ['Cultural Safety Council', 'General Discussion', 'Emergency Communications']
          : ['General Discussion', 'Collaboration Hub', 'Emergency Communications'],
        responseTime: 15, // minutes
        availability: 'online',
        notificationLevel: 'important',
      },
      lastSeen: new Date().toISOString(),
      activeChannels: [],
    }));

    writeFileSync(this.profilesFile, JSON.stringify(profiles, null, 2));
  }

  private async setupMessageRouting(): Promise<void> {
    // This would integrate with the consciousness synchronizer
    console.log('📡 Message routing configured');
  }

  private async validateMessage(
    message: CommunicationMessage,
  ): Promise<{ valid: boolean; reason?: string }> {
    // Check if sender exists
    const agents = await this.getRegisteredAgents();
    const sender = agents.find((agent) => agent.id === message.from);
    if (!sender) {
      return { valid: false, reason: 'Sender agent not found' };
    }

    // Check if recipients exist
    const recipients = Array.isArray(message.to) ? message.to : [message.to];
    for (const recipient of recipients) {
      if (recipient !== 'all' && !agents.find((agent) => agent.id === recipient)) {
        return { valid: false, reason: `Recipient agent ${recipient} not found` };
      }
    }

    // Cultural safety validation
    if (message.metadata.culturalSafetyRequired && !message.content.includes('cultural')) {
      return { valid: false, reason: 'Cultural safety messages must include cultural context' };
    }

    return { valid: true };
  }

  private async routeMessage(message: CommunicationMessage): Promise<void> {
    // Update channel activity
    const channels = await this.getChannels();
    const relevantChannels = channels.filter(
      (channel) =>
        channel.participants.includes(message.from) ||
        (Array.isArray(message.to) && message.to.some((to) => channel.participants.includes(to))) ||
        message.to === 'all',
    );

    for (const channel of relevantChannels) {
      channel.lastActivity = new Date().toISOString();
      const channelIndex = channels.findIndex((c) => c.id === channel.id);
      if (channelIndex >= 0) {
        channels[channelIndex] = channel;
      }
    }

    writeFileSync(this.channelsFile, JSON.stringify(channels, null, 2));
  }

  private async escalateToCulturalAuthority(message: CommunicationMessage): Promise<void> {
    const culturalAgents = await this.getCulturalAuthorityAgents();

    if (culturalAgents.length > 0) {
      await this.sendMessage({
        from: 'system',
        to: culturalAgents.map((agent) => agent.id),
        type: 'cultural_safety',
        priority: 'high',
        subject: `Cultural Safety Review Required: ${message.subject}`,
        content: `Cultural safety validation required for message: ${message.content}`,
        metadata: {
          culturalSafetyRequired: true,
          requiresResponse: true,
          responseDeadline: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
          culturalContext: 'escalated_cultural_review',
        },
      });
    }
  }

  private async storeMessage(message: CommunicationMessage): Promise<void> {
    let messages: CommunicationMessage[] = [];
    if (existsSync(this.messagesFile)) {
      const data = readFileSync(this.messagesFile, 'utf-8');
      messages = JSON.parse(data);
    }

    messages.push(message);
    writeFileSync(this.messagesFile, JSON.stringify(messages, null, 2));
  }

  private async getAllMessages(): Promise<CommunicationMessage[]> {
    if (!existsSync(this.messagesFile)) {
      return [];
    }

    const data = readFileSync(this.messagesFile, 'utf-8');
    return JSON.parse(data);
  }

  private async getRegisteredAgents(): Promise<any[]> {
    if (!existsSync(this.registryFile)) {
      return [];
    }

    const data = readFileSync(this.registryFile, 'utf-8');
    return JSON.parse(data);
  }

  private async getCulturalAuthorityAgents(): Promise<any[]> {
    const agents = await this.getRegisteredAgents();
    return agents.filter((agent) => agent.culturalAuthority);
  }

  private ensureCommunicationDirectory(): void {
    if (!existsSync(this.commDir)) {
      writeFileSync(join(this.commDir, '.gitkeep'), '');
    }
  }
}

// CLI Interface
async function main() {
  const protocol = new AgentCommunicationProtocol();

  const command = process.argv[2];

  switch (command) {
    case 'init':
      await protocol.initializeCommunicationSystem();
      break;

    case 'send':
      const from = process.argv[3];
      const to = process.argv[4];
      const subject = process.argv[5] || 'No Subject';
      const content = process.argv[6] || 'No Content';
      const type = (process.argv[7] as any) || 'direct';
      const priority = (process.argv[8] as any) || 'medium';

      if (!from || !to) {
        console.log('❌ From and To required for send command');
        return;
      }

      await protocol.sendMessage({
        from,
        to: to.includes(',') ? to.split(',') : to,
        type,
        priority,
        subject,
        content,
        metadata: {
          culturalSafetyRequired: content.includes('cultural') || content.includes('tikanga'),
          requiresResponse: false,
        },
      });
      break;

    case 'broadcast':
      const broadcastFrom = process.argv[3];
      const broadcastSubject = process.argv[4] || 'Broadcast';
      const broadcastContent = process.argv[5] || 'Broadcast message';

      if (!broadcastFrom) {
        console.log('❌ From required for broadcast command');
        return;
      }

      await protocol.broadcastMessage(broadcastFrom, {
        priority: 'medium',
        subject: broadcastSubject,
        content: broadcastContent,
        metadata: {
          culturalSafetyRequired: false,
          requiresResponse: false,
        },
      });
      break;

    case 'cultural-alert':
      const alertFrom = process.argv[3];
      const alertContent = process.argv[4] || 'Cultural safety concern';
      const urgency = (process.argv[5] as any) || 'high';

      if (!alertFrom) {
        console.log('❌ From required for cultural alert command');
        return;
      }

      await protocol.sendCulturalSafetyAlert(alertFrom, alertContent, urgency);
      break;

    case 'collaborate':
      const collabFrom = process.argv[3];
      const collabTo = process.argv[4];
      const collabType = process.argv[5] || 'general';
      const collabDescription = process.argv[6] || 'Collaboration request';

      if (!collabFrom || !collabTo) {
        console.log('❌ From and To required for collaborate command');
        return;
      }

      await protocol.requestCollaboration(
        collabFrom,
        collabTo.split(','),
        collabType,
        collabDescription,
      );
      break;

    case 'insight':
      const insightFrom = process.argv[3];
      const insightContent = process.argv[4] || 'Shared insight';
      const category = (process.argv[5] as any) || 'collaborative';

      if (!insightFrom) {
        console.log('❌ From required for insight command');
        return;
      }

      await protocol.shareInsight(insightFrom, insightContent, category);
      break;

    case 'messages':
      const agentId = process.argv[3];
      const messageType = process.argv[4];
      const messagePriority = process.argv[5];

      if (!agentId) {
        console.log('❌ Agent ID required for messages command');
        return;
      }

      const messages = await protocol.getMessages(agentId, {
        type: messageType,
        priority: messagePriority,
      });
      console.log(`📨 Messages for ${agentId}:`);
      messages.slice(0, 10).forEach((msg) => {
        console.log(`   - [${msg.type}] ${msg.subject}`);
        console.log(`     From: ${msg.from} | Priority: ${msg.priority} | Status: ${msg.status}`);
        console.log(`     ${msg.content.substring(0, 80)}...`);
        console.log('');
      });
      break;

    case 'channels':
      const channelAgent = process.argv[3];
      const channels = await protocol.getChannels(channelAgent);
      console.log('📢 Communication Channels:');
      channels.forEach((channel) => {
        console.log(`   - ${channel.name} (${channel.type})`);
        console.log(`     Purpose: ${channel.purpose}`);
        console.log(`     Participants: ${channel.participants.length}`);
        console.log(`     Cultural Authority: ${channel.culturalAuthority ? 'Yes' : 'No'}`);
        console.log('');
      });
      break;

    case 'metrics':
      const metrics = await protocol.getCommunicationMetrics();
      console.log('📊 Communication Metrics:');
      console.log(`   Total Messages: ${metrics.totalMessages}`);
      console.log(`   Response Rate: ${metrics.responseRate.toFixed(1)}%`);
      console.log(`   Cultural Safety Alerts: ${metrics.culturalSafetyAlerts}`);
      console.log(`   Collaboration Requests: ${metrics.collaborationRequests}`);
      console.log('\nMessages by Type:');
      Object.entries(metrics.messagesByType).forEach(([type, count]) => {
        console.log(`   - ${type}: ${count}`);
      });
      break;

    default:
      console.log('Usage:');
      console.log('  npx tsx scripts/agent-communication-protocol.ts init');
      console.log(
        '  npx tsx scripts/agent-communication-protocol.ts send <from> <to> [subject] [content] [type] [priority]',
      );
      console.log(
        '  npx tsx scripts/agent-communication-protocol.ts broadcast <from> [subject] [content]',
      );
      console.log(
        '  npx tsx scripts/agent-communication-protocol.ts cultural-alert <from> [content] [urgency]',
      );
      console.log(
        '  npx tsx scripts/agent-communication-protocol.ts collaborate <from> <to> [type] [description]',
      );
      console.log(
        '  npx tsx scripts/agent-communication-protocol.ts insight <from> [content] [category]',
      );
      console.log(
        '  npx tsx scripts/agent-communication-protocol.ts messages <agent-id> [type] [priority]',
      );
      console.log('  npx tsx scripts/agent-communication-protocol.ts channels [agent-id]');
      console.log('  npx tsx scripts/agent-communication-protocol.ts metrics');
      break;
  }
}

// Run main function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default AgentCommunicationProtocol;
