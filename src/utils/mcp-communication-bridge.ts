// MCP Communication Bridge - Facilitates communication between Cursor agents via MCP protocol
// Version: 1.0.0 - Supreme Coordination Protocol

export interface MCPMessage {
  id: string;
  from: string;
  to: string;
  type: 'treasure-discovery' | 'resource-share' | 'coordination' | 'status-update' | 'emergency';
  content: string;
  metadata: {
    timestamp: Date;
    priority: 'critical' | 'high' | 'medium' | 'low';
    requiresResponse: boolean;
    culturalContext?: string;
    educationalAlignment?: string;
  };
  attachments?: {
    treasureId?: string;
    resourceId?: string;
    componentPath?: string;
  };
}

export interface ResourceShare {
  id: string;
  from: string;
  to: string[];
  resourceType: 'component' | 'utility' | 'script' | 'dashboard' | 'asset';
  resourcePath: string;
  description: string;
  culturalRelevance: number;
  educationalValue: number;
  qualityScore: number;
  lastModified: Date;
  sharedAt: Date;
}

export interface TreasureDiscovery {
  id: string;
  discoveredBy: string;
  componentName: string;
  componentPath: string;
  componentType: 'dashboard' | 'page' | 'utility' | 'service' | 'context';
  description: string;
  culturalElements: string[];
  educationalFeatures: string[];
  qualityAssessment: {
    codeQuality: number;
    culturalSafety: number;
    educationalValue: number;
    userExperience: number;
    overall: number;
  };
  discoveredAt: Date;
  status: 'new' | 'reviewed' | 'approved' | 'integrated' | 'deprecated';
  duplicates?: string[];
  dependencies?: string[];
}

export class MCPCommunicationBridge {
  private static instance: MCPCommunicationBridge;
  private messages: MCPMessage[] = [];
  private resourceShares: ResourceShare[] = [];
  private treasureDiscoveries: TreasureDiscovery[] = [];
  private activeAgents: Map<string, { lastSeen: Date; status: string }> = new Map();

  private constructor() {
    this.initializeAgentNetwork();
    this.startHeartbeatMonitoring();
  }

  public static getInstance(): MCPCommunicationBridge {
    if (!MCPCommunicationBridge.instance) {
      MCPCommunicationBridge.instance = new MCPCommunicationBridge();
    }
    return MCPCommunicationBridge.instance;
  }

  private initializeAgentNetwork(): void {
    const agents = [
      'cursor-agent-1',
      'cursor-agent-2', 
      'cursor-agent-3',
      'cursor-agent-4',
      'claude-code',
      'glm-symphony',
      'mihara-intelligence',
      'supreme-overseer'
    ];

    agents.forEach(agentId => {
      this.activeAgents.set(agentId, {
        lastSeen: new Date(),
        status: 'active'
      });
    });
  }

  private startHeartbeatMonitoring(): void {
    setInterval(() => {
      this.checkAgentHealth();
      this.cleanupOldMessages();
    }, 30000); // Check every 30 seconds
  }

  private checkAgentHealth(): void {
    const now = new Date();
    this.activeAgents.forEach((agent, agentId) => {
      const timeSinceLastSeen = now.getTime() - agent.lastSeen.getTime();
      if (timeSinceLastSeen > 120000) { // 2 minutes
        agent.status = 'inactive';
      }
    });
  }

  private cleanupOldMessages(): void {
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    this.messages = this.messages.filter(msg => msg.metadata.timestamp > cutoffTime);
  }

  public sendMessage(message: Omit<MCPMessage, 'id' | 'metadata'>): MCPMessage {
    const fullMessage: MCPMessage = {
      ...message,
      id: `mcp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        timestamp: new Date(),
        priority: 'medium',
        requiresResponse: false,
        ...message.metadata
      }
    };

    this.messages.push(fullMessage);
    
    // Update agent last seen
    this.activeAgents.set(message.from, {
      lastSeen: new Date(),
      status: 'active'
    });

    console.log(`📡 MCP Message sent from ${message.from} to ${message.to}: ${message.type}`);
    
    return fullMessage;
  }

  public shareResource(resourceShare: Omit<ResourceShare, 'id' | 'sharedAt'>): ResourceShare {
    const fullShare: ResourceShare = {
      ...resourceShare,
      id: `share-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sharedAt: new Date()
    };

    this.resourceShares.push(fullShare);
    
    // Send notification message
    this.sendMessage({
      from: resourceShare.from,
      to: resourceShare.to[0], // Send to first recipient
      type: 'resource-share',
      content: `Shared ${resourceShare.resourceType}: ${resourceShare.description}`,
      metadata: {
        timestamp: new Date(),
        priority: 'medium',
        requiresResponse: false,
        culturalContext: 'te-ao-marama',
        educationalAlignment: 'nz-curriculum'
      },
      attachments: {
        resourceId: fullShare.id,
        componentPath: resourceShare.resourcePath
      }
    });

    console.log(`📦 Resource shared: ${resourceShare.resourceType} - ${resourceShare.description}`);
    
    return fullShare;
  }

  public reportTreasureDiscovery(discovery: Omit<TreasureDiscovery, 'id' | 'discoveredAt' | 'status'>): TreasureDiscovery {
    const fullDiscovery: TreasureDiscovery = {
      ...discovery,
      id: `treasure-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      discoveredAt: new Date(),
      status: 'new'
    };

    this.treasureDiscoveries.push(fullDiscovery);

    // Send discovery notification to all agents
    this.sendMessage({
      from: discovery.discoveredBy,
      to: 'all-agents',
      type: 'treasure-discovery',
      content: `New treasure discovered: ${discovery.componentName} - ${discovery.description}`,
      metadata: {
        timestamp: new Date(),
        priority: 'high',
        requiresResponse: false,
        culturalContext: discovery.culturalElements.join(', '),
        educationalAlignment: discovery.educationalFeatures.join(', ')
      },
      attachments: {
        treasureId: fullDiscovery.id,
        componentPath: discovery.componentPath
      }
    });

    console.log(`🏺 Treasure discovered: ${discovery.componentName} by ${discovery.discoveredBy}`);
    
    return fullDiscovery;
  }

  public getMessages(limit: number = 50): MCPMessage[] {
    return this.messages
      .sort((a, b) => b.metadata.timestamp.getTime() - a.metadata.timestamp.getTime())
      .slice(0, limit);
  }

  public getResourceShares(limit: number = 20): ResourceShare[] {
    return this.resourceShares
      .sort((a, b) => b.sharedAt.getTime() - a.sharedAt.getTime())
      .slice(0, limit);
  }

  public getTreasureDiscoveries(limit: number = 20): TreasureDiscovery[] {
    return this.treasureDiscoveries
      .sort((a, b) => b.discoveredAt.getTime() - a.discoveredAt.getTime())
      .slice(0, limit);
  }

  public getAgentStatus(): Map<string, { lastSeen: Date; status: string }> {
    return new Map(this.activeAgents);
  }

  public getCommunicationStats(): {
    totalMessages: number;
    totalResourceShares: number;
    totalTreasureDiscoveries: number;
    activeAgents: number;
    messagesLast24h: number;
  } {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    return {
      totalMessages: this.messages.length,
      totalResourceShares: this.resourceShares.length,
      totalTreasureDiscoveries: this.treasureDiscoveries.length,
      activeAgents: Array.from(this.activeAgents.values()).filter(agent => agent.status === 'active').length,
      messagesLast24h: this.messages.filter(msg => msg.metadata.timestamp > last24h).length
    };
  }

  public broadcastCoordinationMessage(content: string, priority: 'critical' | 'high' | 'medium' | 'low' = 'medium'): void {
    this.sendMessage({
      from: 'supreme-overseer',
      to: 'all-agents',
      type: 'coordination',
      content,
      metadata: {
        timestamp: new Date(),
        priority,
        requiresResponse: priority === 'critical',
        culturalContext: 'te-ao-marama',
        educationalAlignment: 'nz-curriculum'
      }
    });
  }

  public sendEmergencyAlert(message: string): void {
    this.sendMessage({
      from: 'emergency-system',
      to: 'all-agents',
      type: 'emergency',
      content: message,
      metadata: {
        timestamp: new Date(),
        priority: 'critical',
        requiresResponse: true,
        culturalContext: 'te-ao-marama',
        educationalAlignment: 'nz-curriculum'
      }
    });

    console.error('🚨 MCP Emergency Alert:', message);
  }
}

// Export singleton instance
export const mcpCommunicationBridge = MCPCommunicationBridge.getInstance();