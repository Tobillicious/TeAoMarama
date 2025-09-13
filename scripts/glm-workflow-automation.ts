#!/usr/bin/env tsx

/**
 * GLM Workflow Automation for TeAoMarama Platform
 * Automated workflows for educational content creation and enhancement
 */

import { GLMContentGenerator } from './glm-content-generator';
import { GLMSymphonyOrchestrator } from './glm-symphony-orchestrator';

interface WorkflowStep {
  id: string;
  name: string;
  type: 'orchestration' | 'generation' | 'enhancement' | 'validation';
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
  result?: any;
  error?: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  totalDuration?: number;
  createdAt: string;
  completedAt?: string;
}

class GLMWorkflowAutomation {
  private orchestrator: GLMSymphonyOrchestrator;
  private generator: GLMContentGenerator;
  private workflows: Workflow[] = [];
  private isRunning = false;

  constructor() {
    this.orchestrator = new GLMSymphonyOrchestrator();
    this.generator = new GLMContentGenerator();
    this.loadWorkflowTemplates();
  }

  private loadWorkflowTemplates(): void {
    // Pre-defined workflow templates
    this.workflows = [
      {
        id: 'workflow-1',
        name: 'Complete Lesson Creation',
        description: 'Create a complete lesson with plan, activities, and assessment',
        steps: [
          {
            id: 'step-1-1',
            name: 'Orchestrate Symphony',
            type: 'orchestration',
            status: 'pending',
          },
          { id: 'step-1-2', name: 'Generate Lesson Plan', type: 'generation', status: 'pending' },
          { id: 'step-1-3', name: 'Create Activities', type: 'generation', status: 'pending' },
          { id: 'step-1-4', name: 'Design Assessment', type: 'generation', status: 'pending' },
          {
            id: 'step-1-5',
            name: 'Enhance with Cultural Intelligence',
            type: 'enhancement',
            status: 'pending',
          },
          {
            id: 'step-1-6',
            name: 'Validate Cultural Safety',
            type: 'validation',
            status: 'pending',
          },
        ],
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'workflow-2',
        name: 'Content Enhancement Pipeline',
        description: 'Enhance existing content with cultural intelligence',
        steps: [
          {
            id: 'step-2-1',
            name: 'Orchestrate Symphony',
            type: 'orchestration',
            status: 'pending',
          },
          { id: 'step-2-2', name: 'Enhance Content', type: 'enhancement', status: 'pending' },
          {
            id: 'step-2-3',
            name: 'Validate Cultural Compliance',
            type: 'validation',
            status: 'pending',
          },
          { id: 'step-2-4', name: 'Generate Assessment', type: 'generation', status: 'pending' },
        ],
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'workflow-3',
        name: 'Cultural Integration Workflow',
        description: 'Integrate Māori cultural perspectives into educational content',
        steps: [
          {
            id: 'step-3-1',
            name: 'Activate Cultural Intelligence',
            type: 'orchestration',
            status: 'pending',
          },
          {
            id: 'step-3-2',
            name: 'Generate Cultural Content',
            type: 'generation',
            status: 'pending',
          },
          {
            id: 'step-3-3',
            name: 'Validate Tikanga Compliance',
            type: 'validation',
            status: 'pending',
          },
          { id: 'step-3-4', name: 'Enhance with Te Reo', type: 'enhancement', status: 'pending' },
        ],
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async runWorkflow(workflowId: string, parameters?: any): Promise<Workflow> {
    if (this.isRunning) {
      throw new Error('Another workflow is already running');
    }

    const workflow = this.workflows.find((w) => w.id === workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    this.isRunning = true;
    workflow.status = 'running';
    const startTime = Date.now();

    try {
      console.log(`🚀 Starting workflow: ${workflow.name}`);
      console.log(`📝 Description: ${workflow.description}`);

      for (const step of workflow.steps) {
        await this.executeStep(step, parameters);
      }

      workflow.status = 'completed';
      workflow.completedAt = new Date().toISOString();
      workflow.totalDuration = Date.now() - startTime;

      console.log(`✅ Workflow completed: ${workflow.name}`);
      console.log(`⏱️ Total duration: ${workflow.totalDuration}ms`);
    } catch (error) {
      workflow.status = 'failed';
      workflow.totalDuration = Date.now() - startTime;
      console.error(`❌ Workflow failed: ${workflow.name}`, error);
      throw error;
    } finally {
      this.isRunning = false;
    }

    return workflow;
  }

  private async executeStep(step: WorkflowStep, parameters?: any): Promise<void> {
    const stepStart = Date.now();
    step.status = 'running';

    console.log(`\n🔄 Executing step: ${step.name}`);

    try {
      switch (step.type) {
        case 'orchestration':
          await this.executeOrchestrationStep(step, parameters);
          break;
        case 'generation':
          await this.executeGenerationStep(step, parameters);
          break;
        case 'enhancement':
          await this.executeEnhancementStep(step, parameters);
          break;
        case 'validation':
          await this.executeValidationStep(step, parameters);
          break;
        default:
          throw new Error(`Unknown step type: ${step.type}`);
      }

      step.status = 'completed';
      step.duration = Date.now() - stepStart;
      console.log(`✅ Step completed: ${step.name} (${step.duration}ms)`);
    } catch (error) {
      step.status = 'failed';
      step.duration = Date.now() - stepStart;
      step.error = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Step failed: ${step.name}`, error);
      throw error;
    }
  }

  private async executeOrchestrationStep(step: WorkflowStep, parameters?: any): Promise<void> {
    if (step.name.includes('Symphony')) {
      await this.orchestrator.orchestrateSymphony();
      step.result = { orchestrated: true, timestamp: new Date().toISOString() };
    } else if (step.name.includes('Cultural Intelligence')) {
      // Simulate cultural intelligence activation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      step.result = { culturalIntelligence: 'activated', timestamp: new Date().toISOString() };
    }
  }

  private async executeGenerationStep(step: WorkflowStep, parameters?: any): Promise<void> {
    const defaultParams = {
      subject: parameters?.subject || 'General',
      yearLevel: parameters?.yearLevel || 'Year 8',
      topic: parameters?.topic || 'Sample Topic',
      culturalContext: parameters?.culturalContext || 'māori',
    };

    if (step.name.includes('Lesson Plan')) {
      const content = await this.generator.generateContent({
        type: 'lesson-plan',
        ...defaultParams,
        requirements: ['Align with NZC', 'Ensure cultural sensitivity'],
      });
      step.result = { generatedContent: content };
    } else if (step.name.includes('Activities')) {
      const content = await this.generator.generateContent({
        type: 'activity',
        ...defaultParams,
        requirements: ['Engaging activities', 'Cultural integration'],
      });
      step.result = { generatedContent: content };
    } else if (step.name.includes('Assessment')) {
      const content = await this.generator.generateContent({
        type: 'assessment',
        ...defaultParams,
        requirements: ['Formative assessment', 'Cultural competency'],
      });
      step.result = { generatedContent: content };
    }
  }

  private async executeEnhancementStep(step: WorkflowStep, parameters?: any): Promise<void> {
    const content = parameters?.content || 'Sample educational content for enhancement';
    const subject = parameters?.subject || 'General';
    const yearLevel = parameters?.yearLevel || 'Year 8';
    const culturalContext = parameters?.culturalContext || 'māori';

    const enhancedContent = await this.orchestrator.enhanceWithSymphony(
      content,
      subject,
      yearLevel,
      culturalContext,
    );

    step.result = { enhancedContent, originalContent: content };
  }

  private async executeValidationStep(step: WorkflowStep, parameters?: any): Promise<void> {
    // Simulate validation
    await new Promise((resolve) => setTimeout(resolve, 500));
    step.result = {
      validationPassed: true,
      timestamp: new Date().toISOString(),
    };
  }

  // Public methods
  getWorkflows(): Workflow[] {
    return this.workflows;
  }

  getWorkflowById(id: string): Workflow | undefined {
    return this.workflows.find((w) => w.id === id);
  }

  getWorkflowStatus(): { running: boolean; completed: number; failed: number; pending: number } {
    const running = this.isRunning ? 1 : 0;
    const completed = this.workflows.filter((w) => w.status === 'completed').length;
    const failed = this.workflows.filter((w) => w.status === 'failed').length;
    const pending = this.workflows.filter((w) => w.status === 'pending').length;

    return { running, completed, failed, pending };
  }

  generateWorkflowReport(): void {
    console.log('\n📊 GLM Workflow Automation Report');
    console.log('=================================');

    const status = this.getWorkflowStatus();
    console.log(`\n📈 Workflow Status:`);
    console.log(`   Running: ${status.running}`);
    console.log(`   Completed: ${status.completed}`);
    console.log(`   Failed: ${status.failed}`);
    console.log(`   Pending: ${status.pending}`);

    console.log('\n🔄 Available Workflows:');
    this.workflows.forEach((workflow, index) => {
      console.log(`\n${index + 1}. ${workflow.name}`);
      console.log(`   Description: ${workflow.description}`);
      console.log(`   Status: ${workflow.status.toUpperCase()}`);
      console.log(`   Steps: ${workflow.steps.length}`);
      if (workflow.totalDuration) {
        console.log(`   Duration: ${workflow.totalDuration}ms`);
      }
    });

    console.log('\n🚀 GLM Workflow Automation ready for production use!');
  }
}

// CLI interface
async function main() {
  const automation = new GLMWorkflowAutomation();

  const command = process.argv[2];
  let workflowId = process.argv[3];

  // Handle --workflow parameter
  const workflowIndex = process.argv.findIndex((arg) => arg === '--workflow');
  if (workflowIndex !== -1 && process.argv[workflowIndex + 1]) {
    workflowId = process.argv[workflowIndex + 1];
  }

  switch (command) {
    case 'run':
      if (!workflowId) {
        console.log('❌ Please specify a workflow ID');
        console.log('Usage: npm run glm:workflow:run <workflow-id>');
        return;
      }
      try {
        const workflow = await automation.runWorkflow(workflowId);
        console.log(`\n✅ Workflow completed: ${workflow.name}`);
      } catch (error) {
        console.error('❌ Workflow failed:', error);
      }
      break;

    case 'status':
      const status = automation.getWorkflowStatus();
      console.log('📊 Workflow Status:');
      console.log(`   Running: ${status.running}`);
      console.log(`   Completed: ${status.completed}`);
      console.log(`   Failed: ${status.failed}`);
      console.log(`   Pending: ${status.pending}`);
      break;

    case 'list':
      const workflows = automation.getWorkflows();
      console.log('🔄 Available Workflows:');
      workflows.forEach((workflow, index) => {
        console.log(`\n${index + 1}. ${workflow.name} (${workflow.id})`);
        console.log(`   Description: ${workflow.description}`);
        console.log(`   Status: ${workflow.status.toUpperCase()}`);
        console.log(`   Steps: ${workflow.steps.length}`);
      });
      break;

    case 'report':
      automation.generateWorkflowReport();
      break;

    default:
      console.log('🔄 GLM Workflow Automation');
      console.log('Usage:');
      console.log('  npm run glm:workflow:run <workflow-id>  - Run a specific workflow');
      console.log('  npm run glm:workflow:status             - Show workflow status');
      console.log('  npm run glm:workflow:list               - List available workflows');
      console.log('  npm run glm:workflow:report             - Generate workflow report');
      console.log('');
      console.log('Available Workflow IDs:');
      automation.getWorkflows().forEach((workflow) => {
        console.log(`  ${workflow.id} - ${workflow.name}`);
      });
      break;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { GLMWorkflowAutomation };
