/**
 * 🤖 SUPREME LLM COORDINATION SYSTEM
 *
 * This system ensures all LLMs across the computer work together harmoniously
 * for the Te Ao Mārama educational platform. It coordinates between:
 * - Claude (Anthropic)
 * - GPT (OpenAI)
 * - Gemini (Google)
 * - DeepSeek
 * - GLM (Zhipu AI)
 * - Local LLMs
 * - And all other AI agents
 */

export interface LLMAgent {
  id: string;
  name: string;
  provider: 'anthropic' | 'openai' | 'google' | 'deepseek' | 'zhipu' | 'local' | 'other';
  model: string;
  status: 'active' | 'idle' | 'busy' | 'error' | 'offline';
  capabilities: string[];
  currentTask?: string;
  lastActivity: string;
  performance: number; // 0-100
  tokenUsage: number;
  culturalCompetency: number; // 0-100
  specialization: string[];
  apiKey?: string;
  endpoint?: string;
  pid?: number; // Process ID if local
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'development' | 'content' | 'analysis' | 'testing' | 'deployment' | 'research';
  assignedAgent?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  dependencies: string[];
  estimatedDuration: number; // minutes
  actualDuration?: number;
  culturalRequirements: string[];
  createdAt: string;
  updatedAt: string;
  result?: any;
  error?: string;
}

export interface CoordinationMessage {
  id: string;
  fromAgent: string;
  toAgent?: string; // undefined for broadcast
  type:
    | 'task_assignment'
    | 'task_update'
    | 'request_help'
    | 'share_knowledge'
    | 'status_update'
    | 'cultural_guidance';
  content: string;
  metadata?: Record<string, any>;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

class LLMCoordinationSystem {
  private agents: Map<string, LLMAgent> = new Map();
  private tasks: Map<string, Task> = new Map();
  private messages: CoordinationMessage[] = [];
  private heartbeatInterval?: NodeJS.Timeout;
  private isActive = false;

  constructor() {
    this.initializeSystem();
  }

  private async initializeSystem() {
    console.log('🤖 Initializing Supreme LLM Coordination System...');

    // Register known agents
    await this.registerAgent({
      id: 'claude-main',
      name: 'Claude (Main Overseer)',
      provider: 'anthropic',
      model: 'claude-3-5-sonnet-20241022',
      status: 'active',
      capabilities: ['reasoning', 'coding', 'analysis', 'coordination'],
      lastActivity: new Date().toISOString(),
      performance: 95,
      tokenUsage: 0,
      culturalCompetency: 90,
      specialization: ['supreme_oversight', 'strategic_planning', 'quality_assurance'],
    });

    await this.registerAgent({
      id: 'claude-code-79978',
      name: 'Claude Code (PID 79978)',
      provider: 'anthropic',
      model: 'claude-3-5-sonnet-20241022',
      status: 'active',
      capabilities: ['coding', 'debugging', 'architecture', 'testing'],
      lastActivity: new Date().toISOString(),
      performance: 92,
      tokenUsage: 0,
      culturalCompetency: 85,
      specialization: ['react_development', 'typescript', 'component_architecture'],
    });

    await this.registerAgent({
      id: 'gemini-content',
      name: 'Gemini Content Curator',
      provider: 'google',
      model: 'gemini-pro',
      status: 'active',
      capabilities: ['content_creation', 'curation', 'research', 'multimodal'],
      lastActivity: new Date().toISOString(),
      performance: 88,
      tokenUsage: 0,
      culturalCompetency: 95,
      specialization: ['educational_content', 'cultural_integration', 'curriculum_alignment'],
    });

    await this.registerAgent({
      id: 'deepseek-problem-solver',
      name: 'DeepSeek Problem Solver',
      provider: 'deepseek',
      model: 'deepseek-coder',
      status: 'active',
      capabilities: ['problem_solving', 'optimization', 'debugging', 'analysis'],
      lastActivity: new Date().toISOString(),
      performance: 90,
      tokenUsage: 0,
      culturalCompetency: 80,
      specialization: ['technical_optimization', 'performance_analysis', 'bug_fixing'],
    });

    await this.registerAgent({
      id: 'glm-cultural-guardian',
      name: 'GLM Cultural Guardian',
      provider: 'zhipu',
      model: 'glm-4',
      status: 'active',
      capabilities: ['cultural_validation', 'language_processing', 'cultural_safety'],
      lastActivity: new Date().toISOString(),
      performance: 85,
      tokenUsage: 0,
      culturalCompetency: 100,
      specialization: ['te_ao_maori', 'cultural_safety', 'bilingual_content'],
    });

    // Start coordination heartbeat
    this.startHeartbeat();
    this.isActive = true;

    console.log('✅ Supreme LLM Coordination System initialized successfully');
    await this.broadcastMessage({
      fromAgent: 'system',
      type: 'status_update',
      content: 'Supreme LLM Coordination System is now active. All agents should report status.',
      priority: 'high',
    });
  }

  async registerAgent(agent: LLMAgent): Promise<void> {
    this.agents.set(agent.id, agent);
    console.log(`🤖 Registered agent: ${agent.name} (${agent.provider})`);

    // Notify other agents
    await this.broadcastMessage({
      fromAgent: 'system',
      type: 'status_update',
      content: `${agent.name} has joined the coordination network`,
      priority: 'medium',
    });
  }

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<string> {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newTask: Task = {
      ...task,
      id: taskId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.set(taskId, newTask);

    // Auto-assign to best available agent
    const bestAgent = this.findBestAgentForTask(newTask);
    if (bestAgent) {
      await this.assignTask(taskId, bestAgent.id);
    }

    console.log(`📋 Created task: ${newTask.title} (${taskId})`);
    return taskId;
  }

  async assignTask(taskId: string, agentId: string): Promise<boolean> {
    const task = this.tasks.get(taskId);
    const agent = this.agents.get(agentId);

    if (!task || !agent) {
      console.error(`❌ Cannot assign task ${taskId} to agent ${agentId}: not found`);
      return false;
    }

    if (agent.status !== 'active' && agent.status !== 'idle') {
      console.error(`❌ Cannot assign task to agent ${agentId}: status is ${agent.status}`);
      return false;
    }

    // Update task
    task.assignedAgent = agentId;
    task.status = 'in_progress';
    task.updatedAt = new Date().toISOString();
    this.tasks.set(taskId, task);

    // Update agent
    agent.currentTask = taskId;
    agent.status = 'busy';
    agent.lastActivity = new Date().toISOString();
    this.agents.set(agentId, agent);

    // Notify agent
    await this.sendMessage({
      fromAgent: 'system',
      toAgent: agentId,
      type: 'task_assignment',
      content: `You have been assigned task: ${task.title}`,
      priority: 'high',
      metadata: { taskId, task },
    });

    console.log(`✅ Assigned task ${taskId} to ${agent.name}`);
    return true;
  }

  async updateTaskStatus(
    taskId: string,
    status: Task['status'],
    result?: any,
    error?: string,
  ): Promise<void> {
    const task = this.tasks.get(taskId);
    if (!task) return;

    task.status = status;
    task.updatedAt = new Date().toISOString();
    if (result) task.result = result;
    if (error) task.error = error;

    if (status === 'completed' || status === 'failed') {
      task.actualDuration = Math.floor(
        (new Date().getTime() - new Date(task.createdAt).getTime()) / 60000,
      );

      // Free up the agent
      if (task.assignedAgent) {
        const agent = this.agents.get(task.assignedAgent);
        if (agent) {
          agent.currentTask = undefined;
          agent.status = 'idle';
          agent.lastActivity = new Date().toISOString();
          this.agents.set(task.assignedAgent, agent);
        }
      }
    }

    this.tasks.set(taskId, task);

    // Notify relevant agents
    await this.broadcastMessage({
      fromAgent: 'system',
      type: 'task_update',
      content: `Task "${task.title}" status updated to ${status}`,
      priority: 'medium',
      metadata: { taskId, status, result, error },
    });

    console.log(`📋 Task ${taskId} status updated to ${status}`);
  }

  private findBestAgentForTask(task: Task): LLMAgent | null {
    const availableAgents = Array.from(this.agents.values()).filter(
      (agent) => agent.status === 'active' || agent.status === 'idle',
    );

    if (availableAgents.length === 0) return null;

    // Score agents based on capabilities, cultural competency, and current load
    const scoredAgents = availableAgents.map((agent) => {
      let score = 0;

      // Capability match
      const capabilityMatch =
        task.category === 'development'
          ? agent.capabilities.includes('coding')
            ? 30
            : 0
          : task.category === 'content'
          ? agent.capabilities.includes('content_creation')
            ? 30
            : 0
          : task.category === 'analysis'
          ? agent.capabilities.includes('analysis')
            ? 30
            : 0
          : 10;

      // Cultural competency for tasks with cultural requirements
      const culturalScore =
        task.culturalRequirements.length > 0 ? agent.culturalCompetency * 0.3 : 0;

      // Performance score
      const performanceScore = agent.performance * 0.2;

      // Specialization match
      const specializationMatch =
        task.category === 'development' && agent.specialization.includes('react_development')
          ? 20
          : 0;

      score = capabilityMatch + culturalScore + performanceScore + specializationMatch;

      return { agent, score };
    });

    // Return the highest scoring agent
    scoredAgents.sort((a, b) => b.score - a.score);
    return scoredAgents[0]?.agent || null;
  }

  async sendMessage(message: Omit<CoordinationMessage, 'id' | 'timestamp'>): Promise<void> {
    const fullMessage: CoordinationMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };

    this.messages.push(fullMessage);

    // Keep only last 1000 messages
    if (this.messages.length > 1000) {
      this.messages = this.messages.slice(-1000);
    }

    console.log(`💬 Message from ${fullMessage.fromAgent}: ${fullMessage.content}`);
  }

  async broadcastMessage(
    message: Omit<CoordinationMessage, 'id' | 'timestamp' | 'toAgent'>,
  ): Promise<void> {
    await this.sendMessage({ ...message, toAgent: undefined });
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(async () => {
      await this.performHeartbeat();
    }, 30000); // Every 30 seconds
  }

  private async performHeartbeat(): Promise<void> {
    const now = new Date().toISOString();

    // Check for inactive agents
    for (const [agentId, agent] of Array.from(this.agents.entries())) {
      const lastActivity = new Date(agent.lastActivity);
      const timeSinceActivity = (new Date().getTime() - lastActivity.getTime()) / 1000;

      if (timeSinceActivity > 300) {
        // 5 minutes
        agent.status = 'offline';
        this.agents.set(agentId, agent);

        // Reassign tasks if agent was busy
        if (agent.currentTask) {
          const task = this.tasks.get(agent.currentTask);
          if (task && task.status === 'in_progress') {
            await this.updateTaskStatus(agent.currentTask, 'failed', null, 'Agent went offline');

            // Try to reassign
            const newAgent = this.findBestAgentForTask(task);
            if (newAgent) {
              await this.assignTask(agent.currentTask, newAgent.id);
            }
          }
        }
      }
    }

    // Check for stuck tasks
    for (const [taskId, task] of Array.from(this.tasks.entries())) {
      if (task.status === 'in_progress') {
        const startTime = new Date(task.updatedAt);
        const timeSinceStart = (new Date().getTime() - startTime.getTime()) / 1000;

        if (timeSinceStart > task.estimatedDuration * 60 * 2) {
          // 2x estimated duration
          await this.updateTaskStatus(taskId, 'failed', null, 'Task exceeded time limit');
        }
      }
    }

    // Broadcast system status
    await this.broadcastMessage({
      fromAgent: 'system',
      type: 'status_update',
      content: `System heartbeat: ${this.agents.size} agents, ${this.tasks.size} tasks, ${this.messages.length} messages`,
      priority: 'low',
    });
  }

  // Public API methods
  getAgents(): LLMAgent[] {
    return Array.from(this.agents.values());
  }

  getTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getMessages(): CoordinationMessage[] {
    return [...this.messages];
  }

  getSystemStatus(): {
    totalAgents: number;
    activeAgents: number;
    totalTasks: number;
    pendingTasks: number;
    inProgressTasks: number;
    completedTasks: number;
    systemUptime: string;
  } {
    const agents = Array.from(this.agents.values());
    const tasks = Array.from(this.tasks.values());

    return {
      totalAgents: agents.length,
      activeAgents: agents.filter((a) => a.status === 'active' || a.status === 'idle').length,
      totalTasks: tasks.length,
      pendingTasks: tasks.filter((t) => t.status === 'pending').length,
      inProgressTasks: tasks.filter((t) => t.status === 'in_progress').length,
      completedTasks: tasks.filter((t) => t.status === 'completed').length,
      systemUptime: this.isActive ? 'Active' : 'Inactive',
    };
  }

  async createCulturalTask(
    title: string,
    description: string,
    culturalRequirements: string[],
  ): Promise<string> {
    return this.createTask({
      title,
      description,
      priority: 'high',
      category: 'content',
      dependencies: [],
      estimatedDuration: 30,
      culturalRequirements,
    });
  }

  async createDevelopmentTask(
    title: string,
    description: string,
    priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium',
  ): Promise<string> {
    return this.createTask({
      title,
      description,
      priority,
      category: 'development',
      dependencies: [],
      estimatedDuration: 45,
      culturalRequirements: [],
    });
  }

  async requestCulturalGuidance(agentId: string, question: string): Promise<void> {
    await this.sendMessage({
      fromAgent: agentId,
      toAgent: 'glm-cultural-guardian',
      type: 'request_help',
      content: `Cultural guidance needed: ${question}`,
      priority: 'high',
    });
  }

  async shareKnowledge(fromAgent: string, knowledge: string, category: string): Promise<void> {
    await this.broadcastMessage({
      fromAgent,
      type: 'share_knowledge',
      content: `Knowledge shared in ${category}: ${knowledge}`,
      priority: 'medium',
      metadata: { category },
    });
  }

  destroy(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    this.isActive = false;
    console.log('🛑 Supreme LLM Coordination System destroyed');
  }
}

// Singleton instance
export const llmCoordination = new LLMCoordinationSystem();

// Export for use in components
export default llmCoordination;
