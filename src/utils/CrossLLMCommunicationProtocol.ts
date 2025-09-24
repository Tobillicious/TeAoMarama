/**
 * 🌐 CROSS-LLM COMMUNICATION PROTOCOL
 *
 * This protocol ensures all LLMs across the computer can communicate
 * and coordinate effectively for the Te Ao Mārama platform.
 *
 * Features:
 * - Universal message format
 * - Cultural safety validation
 * - Task delegation and coordination
 * - Knowledge sharing protocols
 * - Performance monitoring
 * - Conflict resolution
 */

export interface UniversalMessage {
  id: string;
  timestamp: string;
  from: {
    agentId: string;
    agentName: string;
    provider: string;
    model: string;
    pid?: number;
  };
  to: {
    agentId?: string; // undefined for broadcast
    agentName?: string;
    provider?: string;
    broadcast?: boolean;
  };
  type:
    | 'task_request'
    | 'task_response'
    | 'knowledge_share'
    | 'status_update'
    | 'cultural_guidance'
    | 'error_report'
    | 'coordination_signal';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  content: {
    title: string;
    description: string;
    data?: any;
    culturalContext?: {
      requiresValidation: boolean;
      culturalElements: string[];
      language: 'english' | 'te_reo_maori' | 'bilingual';
    };
  };
  metadata: {
    sessionId: string;
    taskId?: string;
    dependencies?: string[];
    estimatedDuration?: number;
    culturalSafetyLevel: 'basic' | 'intermediate' | 'advanced' | 'expert';
  };
  signature: string; // For verification
}

export interface CulturalValidationResult {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
  culturalElements: string[];
  safetyLevel: 'safe' | 'caution' | 'unsafe';
}

export interface TaskDelegationRequest {
  taskId: string;
  title: string;
  description: string;
  requirements: {
    capabilities: string[];
    culturalCompetency: number;
    estimatedDuration: number;
    priority: 'low' | 'medium' | 'high' | 'urgent';
  };
  context: {
    educationalLevel: string;
    subject: string;
    culturalElements: string[];
  };
}

export interface KnowledgeShare {
  knowledgeId: string;
  category: 'technical' | 'cultural' | 'educational' | 'process' | 'best_practice';
  title: string;
  content: string;
  culturalContext?: string;
  validationStatus: 'pending' | 'validated' | 'rejected';
  sharedBy: string;
  applicableTo: string[];
}

class CrossLLMCommunicationProtocol {
  private messageQueue: UniversalMessage[] = [];
  private knowledgeBase: Map<string, KnowledgeShare> = new Map();
  private culturalValidators: Map<string, (content: any) => CulturalValidationResult> = new Map();
  private activeSessions: Map<string, any> = new Map();
  private performanceMetrics: Map<string, any> = new Map();

  constructor() {
    this.initializeCulturalValidators();
    this.startMessageProcessor();
  }

  private initializeCulturalValidators(): void {
    // Te Ao Māori cultural validator
    this.culturalValidators.set('te_ao_maori', (content: any) => {
      const issues: string[] = [];
      const suggestions: string[] = [];
      let safetyLevel: 'safe' | 'caution' | 'unsafe' = 'safe';

      // Check for cultural sensitivity
      if (typeof content === 'string') {
        const text = content.toLowerCase();

        // Check for inappropriate cultural references
        if (text.includes('maori') && !text.includes('māori')) {
          issues.push('Incorrect spelling of Māori');
          suggestions.push('Use "Māori" with macron');
        }

        if (text.includes('tribe') || text.includes('tribal')) {
          issues.push('Use of outdated terminology');
          suggestions.push('Use "iwi" or "hapū" instead of "tribe"');
        }

        if (text.includes('myth') || text.includes('legend')) {
          issues.push('Inappropriate terminology for traditional knowledge');
          suggestions.push('Use "pūrākau" or "traditional knowledge"');
        }
      }

      // Check cultural elements
      const culturalElements: string[] = [];
      if (content.culturalElements) {
        culturalElements.push(...content.culturalElements);
      }

      // Determine safety level
      if (issues.length === 0) {
        safetyLevel = 'safe';
      } else if (issues.length <= 2) {
        safetyLevel = 'caution';
      } else {
        safetyLevel = 'unsafe';
      }

      return {
        isValid: safetyLevel !== 'unsafe',
        issues,
        suggestions,
        culturalElements,
        safetyLevel,
      };
    });

    // Pacific cultural validator
    this.culturalValidators.set('pacific', (content: any) => {
      const issues: string[] = [];
      const suggestions: string[] = [];
      const safetyLevel: 'safe' | 'caution' | 'unsafe' = 'safe';

      // Similar validation logic for Pacific cultures
      if (typeof content === 'string') {
        const text = content.toLowerCase();

        if (text.includes('island') && !text.includes('pacific island')) {
          issues.push('Consider using "Pacific Island" for clarity');
        }
      }

      return {
        isValid: safetyLevel !== 'unsafe',
        issues,
        suggestions,
        culturalElements: ['Pacific perspectives'],
        safetyLevel,
      };
    });
  }

  private startMessageProcessor(): void {
    setInterval(() => {
      this.processMessageQueue();
    }, 1000); // Process every second
  }

  private async processMessageQueue(): Promise<void> {
    if (this.messageQueue.length === 0) return;

    const message = this.messageQueue.shift();
    if (!message) return;

    try {
      // Validate message
      if (!this.validateMessage(message)) {
        console.error('Invalid message received:', message);
        return;
      }

      // Cultural validation if required
      if (message.content.culturalContext?.requiresValidation) {
        const validation = await this.validateCulturalContent(message.content);
        if (!validation.isValid) {
          await this.sendErrorResponse(message, 'Cultural validation failed', validation.issues);
          return;
        }
      }

      // Process based on message type
      switch (message.type) {
        case 'task_request':
          await this.handleTaskRequest(message);
          break;
        case 'task_response':
          await this.handleTaskResponse(message);
          break;
        case 'knowledge_share':
          await this.handleKnowledgeShare(message);
          break;
        case 'status_update':
          await this.handleStatusUpdate(message);
          break;
        case 'cultural_guidance':
          await this.handleCulturalGuidance(message);
          break;
        case 'error_report':
          await this.handleErrorReport(message);
          break;
        case 'coordination_signal':
          await this.handleCoordinationSignal(message);
          break;
      }

      // Update performance metrics
      this.updatePerformanceMetrics(message);
    } catch (error) {
      console.error('Error processing message:', error);
      await this.sendErrorResponse(message, 'Processing error', [error.message]);
    }
  }

  private validateMessage(message: UniversalMessage): boolean {
    // Basic validation
    if (!message.id || !message.timestamp || !message.from || !message.to || !message.content) {
      return false;
    }

    // Check signature
    if (!this.verifySignature(message)) {
      return false;
    }

    return true;
  }

  private verifySignature(message: UniversalMessage): boolean {
    // Simple signature verification (in production, use proper cryptographic signatures)
    const expectedSignature = this.generateSignature(message);
    return message.signature === expectedSignature;
  }

  private generateSignature(message: UniversalMessage): string {
    // Simple signature generation (in production, use proper cryptographic signatures)
    const data = `${message.id}${message.timestamp}${message.from.agentId}${message.content.title}`;
    return btoa(data).substring(0, 16);
  }

  private async validateCulturalContent(content: any): Promise<CulturalValidationResult> {
    const results: CulturalValidationResult[] = [];

    for (const [culture, validator] of this.culturalValidators) {
      const result = validator(content);
      results.push(result);
    }

    // Combine results
    const combinedResult: CulturalValidationResult = {
      isValid: results.every((r) => r.isValid),
      issues: results.flatMap((r) => r.issues),
      suggestions: results.flatMap((r) => r.suggestions),
      culturalElements: results.flatMap((r) => r.culturalElements),
      safetyLevel: results.some((r) => r.safetyLevel === 'unsafe')
        ? 'unsafe'
        : results.some((r) => r.safetyLevel === 'caution')
        ? 'caution'
        : 'safe',
    };

    return combinedResult;
  }

  private async handleTaskRequest(message: UniversalMessage): Promise<void> {
    console.log(`📋 Task request from ${message.from.agentName}: ${message.content.title}`);

    // Find suitable agent for the task
    const suitableAgent = await this.findSuitableAgent(message.content.data);

    if (suitableAgent) {
      // Forward task to suitable agent
      await this.forwardMessage(message, suitableAgent);
    } else {
      // No suitable agent found
      await this.sendErrorResponse(message, 'No suitable agent found', []);
    }
  }

  private async handleTaskResponse(message: UniversalMessage): Promise<void> {
    console.log(`✅ Task response from ${message.from.agentName}: ${message.content.title}`);

    // Update task status
    if (message.metadata.taskId) {
      // Update task in coordination system
      console.log(`Task ${message.metadata.taskId} completed by ${message.from.agentName}`);
    }
  }

  private async handleKnowledgeShare(message: UniversalMessage): Promise<void> {
    console.log(`🧠 Knowledge shared by ${message.from.agentName}: ${message.content.title}`);

    const knowledge: KnowledgeShare = {
      knowledgeId: `knowledge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      category: message.content.data.category || 'technical',
      title: message.content.title,
      content: message.content.description,
      culturalContext: message.content.culturalContext?.culturalElements.join(', '),
      validationStatus: 'pending',
      sharedBy: message.from.agentId,
      applicableTo: message.content.data.applicableTo || [],
    };

    this.knowledgeBase.set(knowledge.knowledgeId, knowledge);

    // Broadcast knowledge to relevant agents
    await this.broadcastKnowledge(knowledge);
  }

  private async handleStatusUpdate(message: UniversalMessage): Promise<void> {
    console.log(`📊 Status update from ${message.from.agentName}: ${message.content.title}`);

    // Update agent status
    this.updateAgentStatus(message.from.agentId, message.content.data);
  }

  private async handleCulturalGuidance(message: UniversalMessage): Promise<void> {
    console.log(`🌿 Cultural guidance from ${message.from.agentName}: ${message.content.title}`);

    // Forward to cultural guardian if not already from them
    if (message.from.agentId !== 'glm-cultural-guardian') {
      await this.forwardMessage(message, 'glm-cultural-guardian');
    }
  }

  private async handleErrorReport(message: UniversalMessage): Promise<void> {
    console.error(`❌ Error report from ${message.from.agentName}: ${message.content.title}`);
    console.error('Error details:', message.content.data);

    // Log error and potentially escalate
    this.logError(message);
  }

  private async handleCoordinationSignal(message: UniversalMessage): Promise<void> {
    console.log(`🎯 Coordination signal from ${message.from.agentName}: ${message.content.title}`);

    // Handle coordination signals
    switch (message.content.data.signal) {
      case 'sync_request':
        await this.handleSyncRequest(message);
        break;
      case 'resource_request':
        await this.handleResourceRequest(message);
        break;
      case 'collaboration_request':
        await this.handleCollaborationRequest(message);
        break;
    }
  }

  private async findSuitableAgent(taskData: any): Promise<string | null> {
    // Simple agent matching logic
    // In production, this would be more sophisticated

    if (taskData.category === 'development') {
      return 'claude-code-79978';
    } else if (taskData.category === 'content') {
      return 'gemini-content';
    } else if (taskData.culturalRequirements?.length > 0) {
      return 'glm-cultural-guardian';
    } else if (taskData.category === 'analysis') {
      return 'deepseek-problem-solver';
    }

    return 'claude-main'; // Default to main overseer
  }

  private async forwardMessage(
    originalMessage: UniversalMessage,
    targetAgent: string,
  ): Promise<void> {
    const forwardedMessage: UniversalMessage = {
      ...originalMessage,
      to: { agentId: targetAgent },
      from: {
        ...originalMessage.from,
        agentId: 'communication-protocol',
        agentName: 'Communication Protocol',
        provider: 'system',
        model: 'protocol-v1',
      },
    };

    this.messageQueue.push(forwardedMessage);
  }

  private async sendErrorResponse(
    originalMessage: UniversalMessage,
    error: string,
    details: string[],
  ): Promise<void> {
    const errorMessage: UniversalMessage = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      from: {
        agentId: 'communication-protocol',
        agentName: 'Communication Protocol',
        provider: 'system',
        model: 'protocol-v1',
      },
      to: { agentId: originalMessage.from.agentId },
      type: 'error_report',
      priority: 'high',
      content: {
        title: 'Error Response',
        description: error,
        data: { details, originalMessageId: originalMessage.id },
      },
      metadata: {
        sessionId: originalMessage.metadata.sessionId,
        culturalSafetyLevel: 'basic',
      },
      signature: '',
    };

    errorMessage.signature = this.generateSignature(errorMessage);
    this.messageQueue.push(errorMessage);
  }

  private async broadcastKnowledge(knowledge: KnowledgeShare): Promise<void> {
    const broadcastMessage: UniversalMessage = {
      id: `broadcast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      from: {
        agentId: 'communication-protocol',
        agentName: 'Communication Protocol',
        provider: 'system',
        model: 'protocol-v1',
      },
      to: { broadcast: true },
      type: 'knowledge_share',
      priority: 'medium',
      content: {
        title: `New Knowledge: ${knowledge.title}`,
        description: knowledge.content,
        data: { knowledge },
      },
      metadata: {
        sessionId: `session_${Date.now()}`,
        culturalSafetyLevel: 'basic',
      },
      signature: '',
    };

    broadcastMessage.signature = this.generateSignature(broadcastMessage);
    this.messageQueue.push(broadcastMessage);
  }

  private updateAgentStatus(agentId: string, statusData: any): void {
    // Update agent status in coordination system
    console.log(`Agent ${agentId} status updated:`, statusData);
  }

  private logError(message: UniversalMessage): void {
    // Log error for analysis
    console.error('Error logged:', {
      agent: message.from.agentName,
      error: message.content.title,
      details: message.content.data,
      timestamp: message.timestamp,
    });
  }

  private updatePerformanceMetrics(message: UniversalMessage): void {
    const agentId = message.from.agentId;
    const metrics = this.performanceMetrics.get(agentId) || {
      messageCount: 0,
      lastActivity: new Date().toISOString(),
      averageResponseTime: 0,
      errorCount: 0,
    };

    metrics.messageCount++;
    metrics.lastActivity = new Date().toISOString();

    if (message.type === 'error_report') {
      metrics.errorCount++;
    }

    this.performanceMetrics.set(agentId, metrics);
  }

  // Public API methods
  async sendMessage(
    message: Omit<UniversalMessage, 'id' | 'timestamp' | 'signature'>,
  ): Promise<void> {
    const fullMessage: UniversalMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      signature: '',
    };

    fullMessage.signature = this.generateSignature(fullMessage);
    this.messageQueue.push(fullMessage);
  }

  async requestCulturalGuidance(agentId: string, question: string, context: any): Promise<void> {
    await this.sendMessage({
      from: {
        agentId,
        agentName: 'Requesting Agent',
        provider: 'unknown',
        model: 'unknown',
      },
      to: { agentId: 'glm-cultural-guardian' },
      type: 'cultural_guidance',
      priority: 'high',
      content: {
        title: 'Cultural Guidance Request',
        description: question,
        data: context,
        culturalContext: {
          requiresValidation: true,
          culturalElements: context.culturalElements || [],
          language: 'english',
        },
      },
      metadata: {
        sessionId: `session_${Date.now()}`,
        culturalSafetyLevel: 'advanced',
      },
    });
  }

  async shareKnowledge(
    agentId: string,
    knowledge: Omit<KnowledgeShare, 'knowledgeId' | 'sharedBy' | 'validationStatus'>,
  ): Promise<void> {
    await this.sendMessage({
      from: {
        agentId,
        agentName: 'Knowledge Sharer',
        provider: 'unknown',
        model: 'unknown',
      },
      to: { broadcast: true },
      type: 'knowledge_share',
      priority: 'medium',
      content: {
        title: `Knowledge Share: ${knowledge.title}`,
        description: knowledge.content,
        data: knowledge,
      },
      metadata: {
        sessionId: `session_${Date.now()}`,
        culturalSafetyLevel: 'intermediate',
      },
    });
  }

  getKnowledgeBase(): KnowledgeShare[] {
    return Array.from(this.knowledgeBase.values());
  }

  getPerformanceMetrics(): Map<string, any> {
    return new Map(this.performanceMetrics);
  }

  getMessageQueue(): UniversalMessage[] {
    return [...this.messageQueue];
  }
}

// Singleton instance
export const crossLLMProtocol = new CrossLLMCommunicationProtocol();

// Export for use in components
export default crossLLMProtocol;
