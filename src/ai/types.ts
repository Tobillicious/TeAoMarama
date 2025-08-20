export interface TaskRequest {
  type: string;
  complexity?: "low" | "medium" | "high"
  priority?: "low" | "medium" | "high" | "critical" | "quality"
  data?: unknown;
  agentId?: string;
  timestamp?: number;
}

export interface TaskResult {
  success: boolean;
  data?: unknown;
  error?: string;
  duration: number;
  agent: string;
  timestamp?: number;
}

export interface AgentStatus {
  id: string;
  name: string;
  type: string;
  status: "idle" | "busy" | "error" | "offline"
  currentTask?: string;
  tasksCompleted: number;
  lastActivity: Date;
  performance: {
    avgResponseTime: number;
    successRate: number;
    errorCount: number;
  }
}

export interface QAProblem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high" | "critical"
  status: "pending" | "in_progress" | "reviewed" | "resolved" | "failed"
  assignedAgent?: string;
  assignedAt?: Date;
  completedAt?: Date;
  result?: {
    issues: string[];
    recommendations: string[];
    score: number;
  }
}

export interface OverseerConfig {
  maxConcurrentAgents: number;
  heartbeatInterval: number;
  statusUpdateInterval: number;
  escalationThreshold: number;
  communicationChannels: string[];
}

export interface AgentCommunication {
  from: string;
  to: string;
  type: "task_assignment" | "status_update" | "problem_escalation" | "coordination" | "heartbeat"
  data: unknown;
  timestamp: Date;
  priority: "low" | "medium" | "high" | "critical"
}
