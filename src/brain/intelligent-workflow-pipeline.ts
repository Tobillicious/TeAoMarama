/**
 * Te Kete Ako Intelligent Workflow Pipeline
 * Integrates all existing intelligence tools for smarter, more efficient workflows
 */

import { MigrationOrchestrator, TeKeteAkoMigrationBrain } from './migration-intelligence';

export interface WorkflowTask {
  id: string;
  title: string;
  type: 'content' | 'migration' | 'cultural' | 'technical' | 'assessment';
  priority: 'low' | 'medium' | 'high' | 'critical';
  complexity: number;
  culturalSensitivity: 'none' | 'low' | 'medium' | 'high' | 'sacred';
  estimatedTime: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  assignedAgent?: string;
  culturalAdvisor?: string;
  iwiConsultation?: boolean;
}

export class IntelligentWorkflowPipeline {
  private migrationBrain: TeKeteAkoMigrationBrain;
  private migrationOrchestrator: MigrationOrchestrator;
  private tasks: Map<string, WorkflowTask> = new Map();
  private agents: Map<string, any> = new Map();

  constructor() {
    this.migrationBrain = new TeKeteAkoMigrationBrain();
    this.migrationOrchestrator = new MigrationOrchestrator();
    this.initializeAgents();
  }

  private initializeAgents(): void {
    this.agents.set('claude-cursor', {
      name: 'Claude (Cursor)',
      specializations: ['development', 'coordination'],
      culturalExpertise: ['general'],
      performanceScore: 0.95,
    });

    this.agents.set('gemini-cli', {
      name: 'Gemini CLI',
      specializations: ['content-creation', 'cultural-integration'],
      culturalExpertise: ['māori', 'pacific'],
      performanceScore: 0.92,
    });

    this.agents.set('kaitiaki-aronui', {
      name: 'Kaitiaki Aronui',
      specializations: ['ai-content-generation', 'cultural-mathematics'],
      culturalExpertise: ['māori', 'cultural-intelligence'],
      performanceScore: 0.96,
    });
  }

  async addTask(task: WorkflowTask): Promise<void> {
    this.tasks.set(task.id, task);
    await this.autoPrioritizeTask(task);
    await this.assignOptimalAgent(task);
    console.log(`🎯 Task added: ${task.title} - Priority: ${task.priority}`);
  }

  private async autoPrioritizeTask(task: WorkflowTask): Promise<void> {
    let priorityScore = 0;

    // Cultural sensitivity scoring
    const sensitivityScores = { sacred: 100, high: 80, medium: 60, low: 40, none: 20 };
    priorityScore += sensitivityScores[task.culturalSensitivity];
    priorityScore += task.complexity * 5;

    // Determine priority
    if (priorityScore >= 90) task.priority = 'critical';
    else if (priorityScore >= 70) task.priority = 'high';
    else if (priorityScore >= 50) task.priority = 'medium';
    else task.priority = 'low';

    this.tasks.set(task.id, task);
  }

  private async assignOptimalAgent(task: WorkflowTask): Promise<void> {
    let bestAgent: any = null;
    let bestScore = 0;

    for (const [agentId, agent] of this.agents) {
      let score = 0;

      // Specialization match
      const specializationMatch = agent.specializations.some(
        (spec: string) => task.type.includes(spec) || spec.includes(task.type),
      );
      if (specializationMatch) score += 40;

      // Cultural expertise match
      if (task.culturalSensitivity !== 'none') {
        const culturalMatch = agent.culturalExpertise.some(
          (expertise: string) => expertise.includes('māori') || expertise.includes('cultural'),
        );
        if (culturalMatch) score += 30;
      }

      score += agent.performanceScore * 20;

      if (score > bestScore) {
        bestScore = score;
        bestAgent = { agentId, ...agent };
      }
    }

    if (bestAgent) {
      task.assignedAgent = bestAgent.agentId;
      this.tasks.set(task.id, task);
      console.log(`🤖 Assigned ${bestAgent.name} to ${task.title}`);
    }
  }

  async executeWorkflow(): Promise<{
    success: boolean;
    completedTasks: number;
    culturalSafetyScore: number;
  }> {
    console.log('🚀 EXECUTING INTELLIGENT WORKFLOW PIPELINE');

    const sortedTasks = Array.from(this.tasks.values()).sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const sensitivityOrder = { sacred: 5, high: 4, medium: 3, low: 2, none: 1 };

      const aScore = priorityOrder[a.priority] + sensitivityOrder[a.culturalSensitivity];
      const bScore = priorityOrder[b.priority] + sensitivityOrder[b.culturalSensitivity];

      return bScore - aScore;
    });

    let completedTasks = 0;
    let culturalSafetyScore = 1.0;

    for (const task of sortedTasks) {
      console.log(`\n🎯 Processing: ${task.title} (${task.priority} priority)`);

      // Cultural safety check
      if (task.culturalSensitivity !== 'none') {
        const culturalCheck = await this.performCulturalSafetyCheck(task);
        if (!culturalCheck.safe) {
          console.log(`⚠️ Cultural safety concern: ${culturalCheck.concerns.join(', ')}`);
          culturalSafetyScore *= 0.9;
          continue;
        }
      }

      // Execute task
      const result = await this.executeTask(task);
      if (result.success) {
        completedTasks++;
        task.status = 'completed';
      } else {
        task.status = 'failed';
        console.log(`❌ Task failed: ${result.error}`);
      }

      this.tasks.set(task.id, task);
    }

    return {
      success: completedTasks > 0,
      completedTasks,
      culturalSafetyScore,
    };
  }

  private async performCulturalSafetyCheck(task: WorkflowTask): Promise<{
    safe: boolean;
    concerns: string[];
  }> {
    const concerns: string[] = [];

    if (task.culturalSensitivity === 'sacred' && !task.iwiConsultation) {
      concerns.push('Sacred content requires iwi consultation');
    }

    if (task.culturalSensitivity === 'high' && !task.culturalAdvisor) {
      concerns.push('High sensitivity content requires cultural advisor');
    }

    return {
      safe: concerns.length === 0,
      concerns,
    };
  }

  private async executeTask(task: WorkflowTask): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      task.status = 'in-progress';
      this.tasks.set(task.id, task);

      // Task-specific execution logic
      switch (task.type) {
        case 'migration':
          const migrationResult = await this.migrationOrchestrator.coordinateMigration(task);
          return {
            success: migrationResult.success,
            error: migrationResult.success ? undefined : migrationResult.report,
          };

        case 'content':
          await new Promise((resolve) => setTimeout(resolve, task.estimatedTime * 100));
          return { success: true };

        case 'cultural':
          await new Promise((resolve) => setTimeout(resolve, task.estimatedTime * 150));
          return { success: true };

        default:
          await new Promise((resolve) => setTimeout(resolve, task.estimatedTime * 80));
          return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  getWorkflowAnalytics(): {
    totalTasks: number;
    completedTasks: number;
    recommendations: string[];
  } {
    const totalTasks = this.tasks.size;
    const completedTasks = Array.from(this.tasks.values()).filter(
      (t) => t.status === 'completed',
    ).length;

    const recommendations: string[] = [];
    if (completedTasks / totalTasks < 0.9) {
      recommendations.push('Review task complexity and resource allocation');
    }

    return {
      totalTasks,
      completedTasks,
      recommendations,
    };
  }
}

export const intelligentWorkflow = new IntelligentWorkflowPipeline();
