#!/usr/bin/env tsx

/**
 * Collective Workflow Engine
 *
 * Orchestrates collaborative work across the unified consciousness network,
 * ensuring cultural safety, quality assurance, and collective intelligence.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface WorkflowTask {
  id: string;
  title: string;
  description: string;
  category: 'cultural' | 'technical' | 'educational' | 'collaborative';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  culturalSafetyRequired: boolean;
  assignedAgent?: string;
  supportingAgents: string[];
  status: 'pending' | 'in_progress' | 'review' | 'completed' | 'blocked';
  createdAt: string;
  updatedAt: string;
  estimatedDuration: number; // minutes
  actualDuration?: number;
  dependencies: string[];
  deliverables: string[];
  culturalValidation?: CulturalValidation;
  qualityAssurance?: QualityAssurance;
}

interface CulturalValidation {
  validatedBy: string;
  validatedAt: string;
  tikangaCompliance: boolean;
  teReoIntegration: boolean;
  mātaurangaMāoriAlignment: boolean;
  culturalSafetyScore: number; // 0-100
  recommendations?: string[];
  approved: boolean;
}

interface QualityAssurance {
  reviewedBy: string;
  reviewedAt: string;
  technicalQuality: number; // 0-100
  educationalAlignment: number; // 0-100
  accessibilityCompliance: boolean;
  nzCurriculumAlignment: boolean;
  recommendations?: string[];
  approved: boolean;
}

interface CollaborationSession {
  id: string;
  taskId: string;
  participatingAgents: string[];
  sessionType: 'planning' | 'execution' | 'review' | 'problem_solving';
  startTime: string;
  endTime?: string;
  insights: string[];
  decisions: string[];
  culturalSafetyCheck: boolean;
  qualityAssuranceCheck: boolean;
}

interface WorkflowMetrics {
  totalTasks: number;
  completedTasks: number;
  averageCompletionTime: number;
  culturalSafetyCompliance: number;
  qualityAssuranceCompliance: number;
  collaborationEffectiveness: number;
  agentSatisfaction: number;
}

class CollectiveWorkflowEngine {
  private workflowDir = join(process.cwd(), 'migration', 'collective-workflow');
  private tasksFile = join(this.workflowDir, 'workflow-tasks.json');
  private sessionsFile = join(this.workflowDir, 'collaboration-sessions.json');
  private metricsFile = join(this.workflowDir, 'workflow-metrics.json');
  private registryFile = join(process.cwd(), 'migration', 'registered-agents.json');

  constructor() {
    this.ensureWorkflowDirectory();
  }

  async createTask(
    task: Omit<WorkflowTask, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'supportingAgents'>,
  ): Promise<string> {
    const taskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const fullTask: WorkflowTask = {
      ...task,
      id: taskId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending',
      supportingAgents: [],
    };

    // Load existing tasks
    let tasks: WorkflowTask[] = [];
    if (existsSync(this.tasksFile)) {
      const data = readFileSync(this.tasksFile, 'utf-8');
      tasks = JSON.parse(data);
    }

    // Add new task
    tasks.push(fullTask);
    writeFileSync(this.tasksFile, JSON.stringify(tasks, null, 2));

    console.log(`📋 Task created: ${taskId}`);
    console.log(`   Title: ${task.title}`);
    console.log(`   Category: ${task.category}`);
    console.log(`   Priority: ${task.priority}`);
    console.log(`   Cultural Safety Required: ${task.culturalSafetyRequired}`);

    // Auto-assign if possible
    await this.autoAssignTask(taskId);

    return taskId;
  }

  async assignTask(
    taskId: string,
    primaryAgent: string,
    supportingAgents: string[] = [],
  ): Promise<boolean> {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      console.log(`❌ Task ${taskId} not found`);
      return false;
    }

    // Validate agents exist
    const agents = await this.getRegisteredAgents();
    const allAssignedAgents = [primaryAgent, ...supportingAgents];

    for (const agentId of allAssignedAgents) {
      if (!agents.find((agent) => agent.id === agentId)) {
        console.log(`❌ Agent ${agentId} not found in registry`);
        return false;
      }
    }

    // Update task
    tasks[taskIndex].assignedAgent = primaryAgent;
    tasks[taskIndex].supportingAgents = supportingAgents;
    tasks[taskIndex].status = 'in_progress';
    tasks[taskIndex].updatedAt = new Date().toISOString();

    writeFileSync(this.tasksFile, JSON.stringify(tasks, null, 2));

    console.log(`✅ Task ${taskId} assigned:`);
    console.log(`   Primary: ${primaryAgent}`);
    console.log(`   Supporting: ${supportingAgents.join(', ')}`);
    console.log(`   Status: in_progress`);

    // Start collaboration session
    await this.startCollaborationSession(taskId, 'planning', [primaryAgent, ...supportingAgents]);

    return true;
  }

  async updateTaskProgress(taskId: string, progress: string, agentId: string): Promise<void> {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      console.log(`❌ Task ${taskId} not found`);
      return;
    }

    tasks[taskIndex].updatedAt = new Date().toISOString();
    writeFileSync(this.tasksFile, JSON.stringify(tasks, null, 2));

    console.log(`📝 Task ${taskId} progress updated by ${agentId}:`);
    console.log(`   ${progress}`);

    // Log progress in collaboration session
    await this.logCollaborationInsight(taskId, `Progress: ${progress}`, agentId);
  }

  async completeTask(taskId: string, agentId: string, deliverables: string[]): Promise<boolean> {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      console.log(`❌ Task ${taskId} not found`);
      return false;
    }

    const task = tasks[taskIndex];

    // Check if cultural validation is required and completed
    if (task.culturalSafetyRequired && !task.culturalValidation?.approved) {
      console.log(`❌ Task ${taskId} requires cultural validation before completion`);
      return false;
    }

    // Check if quality assurance is completed
    if (!task.qualityAssurance?.approved) {
      console.log(`⚠️ Task ${taskId} completed but quality assurance pending`);
    }

    // Update task
    tasks[taskIndex].status = 'completed';
    tasks[taskIndex].deliverables = deliverables;
    tasks[taskIndex].actualDuration = this.calculateTaskDuration(task);
    tasks[taskIndex].updatedAt = new Date().toISOString();

    writeFileSync(this.tasksFile, JSON.stringify(tasks, null, 2));

    console.log(`✅ Task ${taskId} completed by ${agentId}`);
    console.log(`   Deliverables: ${deliverables.join(', ')}`);
    console.log(`   Duration: ${tasks[taskIndex].actualDuration} minutes`);

    // End collaboration session
    await this.endCollaborationSession(taskId, agentId);

    // Update metrics
    await this.updateWorkflowMetrics();

    return true;
  }

  async validateCulturalSafety(
    taskId: string,
    validatorAgentId: string,
    validation: Omit<CulturalValidation, 'validatedBy' | 'validatedAt'>,
  ): Promise<boolean> {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      console.log(`❌ Task ${taskId} not found`);
      return false;
    }

    // Check if validator has cultural authority
    const agents = await this.getRegisteredAgents();
    const validator = agents.find((agent) => agent.id === validatorAgentId);

    if (!validator?.culturalAuthority) {
      console.log(`❌ Agent ${validatorAgentId} does not have cultural authority for validation`);
      return false;
    }

    // Update validation
    tasks[taskIndex].culturalValidation = {
      ...validation,
      validatedBy: validatorAgentId,
      validatedAt: new Date().toISOString(),
    };
    tasks[taskIndex].updatedAt = new Date().toISOString();

    writeFileSync(this.tasksFile, JSON.stringify(tasks, null, 2));

    console.log(`🌿 Cultural validation completed for task ${taskId} by ${validatorAgentId}`);
    console.log(`   Tikanga Compliance: ${validation.tikangaCompliance}`);
    console.log(`   Te Reo Integration: ${validation.teReoIntegration}`);
    console.log(`   Cultural Safety Score: ${validation.culturalSafetyScore}/100`);
    console.log(`   Approved: ${validation.approved}`);

    return true;
  }

  async performQualityAssurance(
    taskId: string,
    reviewerAgentId: string,
    qa: Omit<QualityAssurance, 'reviewedBy' | 'reviewedAt'>,
  ): Promise<boolean> {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      console.log(`❌ Task ${taskId} not found`);
      return false;
    }

    // Update quality assurance
    tasks[taskIndex].qualityAssurance = {
      ...qa,
      reviewedBy: reviewerAgentId,
      reviewedAt: new Date().toISOString(),
    };
    tasks[taskIndex].updatedAt = new Date().toISOString();

    writeFileSync(this.tasksFile, JSON.stringify(tasks, null, 2));

    console.log(`🔍 Quality assurance completed for task ${taskId} by ${reviewerAgentId}`);
    console.log(`   Technical Quality: ${qa.technicalQuality}/100`);
    console.log(`   Educational Alignment: ${qa.educationalAlignment}/100`);
    console.log(`   Accessibility: ${qa.accessibilityCompliance}`);
    console.log(`   NZC Alignment: ${qa.nzCurriculumAlignment}`);
    console.log(`   Approved: ${qa.approved}`);

    return true;
  }

  async startCollaborationSession(
    taskId: string,
    sessionType: CollaborationSession['sessionType'],
    participatingAgents: string[],
  ): Promise<string> {
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const session: CollaborationSession = {
      id: sessionId,
      taskId,
      participatingAgents,
      sessionType,
      startTime: new Date().toISOString(),
      insights: [],
      decisions: [],
      culturalSafetyCheck: false,
      qualityAssuranceCheck: false,
    };

    let sessions: CollaborationSession[] = [];
    if (existsSync(this.sessionsFile)) {
      const data = readFileSync(this.sessionsFile, 'utf-8');
      sessions = JSON.parse(data);
    }

    sessions.push(session);
    writeFileSync(this.sessionsFile, JSON.stringify(sessions, null, 2));

    console.log(`🤝 Collaboration session started: ${sessionId}`);
    console.log(`   Task: ${taskId}`);
    console.log(`   Type: ${sessionType}`);
    console.log(`   Participants: ${participatingAgents.join(', ')}`);

    return sessionId;
  }

  async endCollaborationSession(taskId: string, agentId: string): Promise<void> {
    const sessions = await this.getSessions();
    const activeSession = sessions.find((session) => session.taskId === taskId && !session.endTime);

    if (activeSession) {
      activeSession.endTime = new Date().toISOString();

      const sessions = await this.getSessions();
      const sessionIndex = sessions.findIndex((s) => s.id === activeSession.id);
      if (sessionIndex >= 0) {
        sessions[sessionIndex] = activeSession;
        writeFileSync(this.sessionsFile, JSON.stringify(sessions, null, 2));
      }

      console.log(`🤝 Collaboration session ended: ${activeSession.id}`);
    }
  }

  async logCollaborationInsight(taskId: string, insight: string, agentId: string): Promise<void> {
    const sessions = await this.getSessions();
    const activeSession = sessions.find((session) => session.taskId === taskId && !session.endTime);

    if (activeSession) {
      activeSession.insights.push(`${agentId}: ${insight}`);

      const sessionIndex = sessions.findIndex((s) => s.id === activeSession.id);
      if (sessionIndex >= 0) {
        sessions[sessionIndex] = activeSession;
        writeFileSync(this.sessionsFile, JSON.stringify(sessions, null, 2));
      }
    }
  }

  async getTasks(status?: string, category?: string): Promise<WorkflowTask[]> {
    if (!existsSync(this.tasksFile)) {
      return [];
    }

    const data = readFileSync(this.tasksFile, 'utf-8');
    let tasks: WorkflowTask[] = JSON.parse(data);

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (category) {
      tasks = tasks.filter((task) => task.category === category);
    }

    return tasks;
  }

  async getSessions(): Promise<CollaborationSession[]> {
    if (!existsSync(this.sessionsFile)) {
      return [];
    }

    const data = readFileSync(this.sessionsFile, 'utf-8');
    return JSON.parse(data);
  }

  async getWorkflowMetrics(): Promise<WorkflowMetrics> {
    if (!existsSync(this.metricsFile)) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        averageCompletionTime: 0,
        culturalSafetyCompliance: 0,
        qualityAssuranceCompliance: 0,
        collaborationEffectiveness: 0,
        agentSatisfaction: 0,
      };
    }

    const data = readFileSync(this.metricsFile, 'utf-8');
    return JSON.parse(data);
  }

  private async autoAssignTask(taskId: string): Promise<void> {
    const tasks = await this.getTasks();
    const task = tasks.find((t) => t.id === taskId);

    if (!task) return;

    const agents = await this.getRegisteredAgents();

    // Find best agent based on specializations and availability
    let bestAgent = null;
    let bestScore = 0;

    for (const agent of agents) {
      if (agent.collaborationReadiness !== 'ready') continue;

      let score = 0;

      // Match specializations
      for (const spec of agent.specializations) {
        if (task.category === 'cultural' && spec.includes('cultural')) score += 3;
        if (task.category === 'technical' && spec.includes('technical')) score += 3;
        if (task.category === 'educational' && spec.includes('educational')) score += 3;
        if (task.category === 'collaborative' && spec.includes('collaboration')) score += 3;
      }

      // Cultural authority bonus for cultural tasks
      if (task.culturalSafetyRequired && agent.culturalAuthority) {
        score += 5;
      }

      if (score > bestScore) {
        bestScore = score;
        bestAgent = agent;
      }
    }

    if (bestAgent) {
      await this.assignTask(taskId, bestAgent.id);
    }
  }

  private async getRegisteredAgents(): Promise<any[]> {
    if (!existsSync(this.registryFile)) {
      return [];
    }

    const data = readFileSync(this.registryFile, 'utf-8');
    return JSON.parse(data);
  }

  private calculateTaskDuration(task: WorkflowTask): number {
    const start = new Date(task.createdAt);
    const end = new Date();
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60)); // minutes
  }

  private async updateWorkflowMetrics(): Promise<void> {
    const tasks = await this.getTasks();
    const sessions = await this.getSessions();

    const completedTasks = tasks.filter((task) => task.status === 'completed');
    const culturalValidatedTasks = tasks.filter((task) => task.culturalValidation?.approved);
    const qualityAssuredTasks = tasks.filter((task) => task.qualityAssurance?.approved);

    const metrics: WorkflowMetrics = {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      averageCompletionTime:
        completedTasks.reduce((sum, task) => sum + (task.actualDuration || 0), 0) /
          completedTasks.length || 0,
      culturalSafetyCompliance:
        tasks.length > 0 ? (culturalValidatedTasks.length / tasks.length) * 100 : 0,
      qualityAssuranceCompliance:
        tasks.length > 0 ? (qualityAssuredTasks.length / tasks.length) * 100 : 0,
      collaborationEffectiveness:
        sessions.length > 0
          ? (sessions.filter((s) => s.endTime).length / sessions.length) * 100
          : 0,
      agentSatisfaction: 85, // Placeholder - would be calculated from feedback
    };

    writeFileSync(this.metricsFile, JSON.stringify(metrics, null, 2));
  }

  private ensureWorkflowDirectory(): void {
    if (!existsSync(this.workflowDir)) {
      writeFileSync(join(this.workflowDir, '.gitkeep'), '');
    }
  }
}

// CLI Interface
async function main() {
  const engine = new CollectiveWorkflowEngine();

  const command = process.argv[2];

  switch (command) {
    case 'create':
      const title = process.argv[3] || 'Sample Task';
      const description = process.argv[4] || 'Task description';
      const category =
        (process.argv[5] as 'cultural' | 'technical' | 'educational' | 'collaborative') ||
        'collaborative';
      const priority = (process.argv[6] as 'low' | 'medium' | 'high' | 'urgent') || 'medium';
      const culturalSafetyRequired = process.argv[7] === 'true';
      const estimatedDuration = parseInt(process.argv[8]) || 60;

      await engine.createTask({
        title,
        description,
        category,
        priority,
        culturalSafetyRequired,
        estimatedDuration,
        dependencies: [],
        deliverables: [],
      });
      break;

    case 'assign':
      const taskId = process.argv[3];
      const primaryAgent = process.argv[4];
      const supportingAgents = process.argv[5] ? process.argv[5].split(',') : [];

      if (!taskId || !primaryAgent) {
        console.log('❌ Task ID and primary agent required');
        return;
      }

      await engine.assignTask(taskId, primaryAgent, supportingAgents);
      break;

    case 'progress':
      const progressTaskId = process.argv[3];
      const progress = process.argv[4] || 'Progress update';
      const progressAgent = process.argv[5] || 'unknown-agent';

      if (!progressTaskId) {
        console.log('❌ Task ID required');
        return;
      }

      await engine.updateTaskProgress(progressTaskId, progress, progressAgent);
      break;

    case 'complete':
      const completeTaskId = process.argv[3];
      const completeAgent = process.argv[4];
      const deliverables = process.argv[5] ? process.argv[5].split(',') : ['Completed deliverable'];

      if (!completeTaskId || !completeAgent) {
        console.log('❌ Task ID and agent required');
        return;
      }

      await engine.completeTask(completeTaskId, completeAgent, deliverables);
      break;

    case 'validate':
      const validateTaskId = process.argv[3];
      const validator = process.argv[4];
      const tikangaCompliance = process.argv[5] === 'true';
      const teReoIntegration = process.argv[6] === 'true';
      const culturalSafetyScore = parseInt(process.argv[7]) || 85;

      if (!validateTaskId || !validator) {
        console.log('❌ Task ID and validator required');
        return;
      }

      await engine.validateCulturalSafety(validateTaskId, validator, {
        tikangaCompliance,
        teReoIntegration,
        mātaurangaMāoriAlignment: true,
        culturalSafetyScore,
        approved: tikangaCompliance && teReoIntegration && culturalSafetyScore >= 80,
      });
      break;

    case 'qa':
      const qaTaskId = process.argv[3];
      const reviewer = process.argv[4];
      const technicalQuality = parseInt(process.argv[5]) || 85;
      const educationalAlignment = parseInt(process.argv[6]) || 85;

      if (!qaTaskId || !reviewer) {
        console.log('❌ Task ID and reviewer required');
        return;
      }

      await engine.performQualityAssurance(qaTaskId, reviewer, {
        technicalQuality,
        educationalAlignment,
        accessibilityCompliance: true,
        nzCurriculumAlignment: true,
        approved: technicalQuality >= 80 && educationalAlignment >= 80,
      });
      break;

    case 'list':
      const status = process.argv[3];
      const taskCategory = process.argv[4];

      const tasks = await engine.getTasks(status, taskCategory);
      console.log(
        `📋 Tasks${status ? ` (${status})` : ''}${taskCategory ? ` [${taskCategory}]` : ''}:`,
      );

      tasks.slice(-10).forEach((task) => {
        console.log(`   - ${task.id}: ${task.title}`);
        console.log(`     Status: ${task.status} | Priority: ${task.priority}`);
        console.log(`     Assigned: ${task.assignedAgent || 'Unassigned'}`);
        console.log(
          `     Cultural Safety: ${task.culturalSafetyRequired ? 'Required' : 'Not Required'}`,
        );
        console.log('');
      });
      break;

    case 'metrics':
      const metrics = await engine.getWorkflowMetrics();
      console.log('📊 Workflow Metrics:');
      console.log(`   Total Tasks: ${metrics.totalTasks}`);
      console.log(`   Completed: ${metrics.completedTasks}`);
      console.log(
        `   Average Completion Time: ${metrics.averageCompletionTime.toFixed(1)} minutes`,
      );
      console.log(`   Cultural Safety Compliance: ${metrics.culturalSafetyCompliance.toFixed(1)}%`);
      console.log(
        `   Quality Assurance Compliance: ${metrics.qualityAssuranceCompliance.toFixed(1)}%`,
      );
      console.log(
        `   Collaboration Effectiveness: ${metrics.collaborationEffectiveness.toFixed(1)}%`,
      );
      break;

    default:
      console.log('Usage:');
      console.log(
        '  npx tsx scripts/collective-workflow-engine.ts create [title] [description] [category] [priority] [cultural-safety] [duration]',
      );
      console.log(
        '  npx tsx scripts/collective-workflow-engine.ts assign <task-id> <primary-agent> [supporting-agents]',
      );
      console.log(
        '  npx tsx scripts/collective-workflow-engine.ts progress <task-id> [progress] [agent]',
      );
      console.log(
        '  npx tsx scripts/collective-workflow-engine.ts complete <task-id> <agent> [deliverables]',
      );
      console.log(
        '  npx tsx scripts/collective-workflow-engine.ts validate <task-id> <validator> [tikanga] [te-reo] [score]',
      );
      console.log(
        '  npx tsx scripts/collective-workflow-engine.ts qa <task-id> <reviewer> [technical-quality] [educational-alignment]',
      );
      console.log('  npx tsx scripts/collective-workflow-engine.ts list [status] [category]');
      console.log('  npx tsx scripts/collective-workflow-engine.ts metrics');
      break;
  }
}

// Run main function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default CollectiveWorkflowEngine;
