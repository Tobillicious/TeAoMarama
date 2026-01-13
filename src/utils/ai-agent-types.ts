/**
 * AI Agent Types - Clean exports for Supreme Overseer System
 */

export interface AIAgent {
  id: string;
  name: string;
  model: string;
  specialization: string;
  status: 'active' | 'idle' | 'processing' | 'error';
  performance: number;
  culturalIntelligence: number;
  educationalValue: number;
  currentTask?: string;
  taskHistory: TaskExecution[];
  capabilities: string[];
  learningRate: number;
  evolutionLevel: number;
}

export interface TaskExecution {
  id: string;
  task: string;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'completed' | 'failed';
  result?: any;
  performance: number;
  culturalAlignment: number;
  educationalImpact: number;
}

export interface TreasureHuntStrategy {
  id: string;
  name: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  targetAreas: string[];
  expectedOutcomes: string[];
  culturalFocus: boolean;
  educationalFocus: boolean;
  assignedAgents: string[];
  progress: number;
  status: 'planning' | 'active' | 'completed' | 'paused';
}
