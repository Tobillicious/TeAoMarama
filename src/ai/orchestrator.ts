// src/ai/orchestrator.ts
import { AIRegistry } from './registry';

export type TaskComplexity = 'simple' | 'medium' | 'complex' | 'critical';
export type TaskPriority = 'speed' | 'quality' | 'depth' | 'reliability';

export interface TaskRequest {
  type: string;
  complexity: TaskComplexity;
  priority: TaskPriority;
  culturalSensitive?: boolean;
  prompt: string;
  context?: unknown;
}

export interface TaskResult {
  output: string;
  tokensIn?: number;
  tokensOut?: number;
  latencyMs?: number;
  provider?: string;
  model?: string;
}

interface RoutingConfig {
  primary: {
    llm: { name: string } | null;
    model: string;
    reason: string;
  };
}

export class AIOrchestrator {
  private registry: AIRegistry;

  constructor() {
    this.registry = new AIRegistry();
  }

  // 🚀 ULTRA-FAST ROUTING WITH PERFORMANCE OPTIMIZATION
  async route(task: TaskRequest): Promise<TaskResult> {
    const startTime = Date.now();

    // 🎯 STANDARD ROUTING FOR ALL PRIORITIES
    const routing = await this.getRouting(task);
    const result = await this.executeTask(task, routing);

    const responseTime = Date.now() - startTime;
    console.log(`📊 Standard response time: ${responseTime}ms`);

    return {
      output: result as string,
      latencyMs: responseTime,
      provider: routing.primary?.llm?.name || 'unknown',
      model: routing.primary?.model || 'unknown',
    };
  }

  private async executeTask(task: TaskRequest, routing: RoutingConfig): Promise<string> {
    try {
      const llm = this.registry.getProvider(routing.primary.llm?.name || 'unknown');
      if (!llm || !llm.generate) {
        throw new Error(
          `LLM provider ${routing.primary.llm?.name || 'unknown'} not found or invalid`,
        );
      }

      const result = await llm.generate(task.prompt, {
        model: routing.primary.model,
        temperature: task.priority === 'speed' ? 0.1 : 0.3,
        maxTokens: this.getMaxTokens(task.complexity),
        system: this.getSystemPrompt(task),
      });

      return typeof result === 'string'
        ? result
        : (result as { output?: string; text?: string })?.output ||
            (result as { output?: string; text?: string })?.text ||
            JSON.stringify(result);
    } catch (error) {
      console.error('LLM execution error:', error);
      return this.getFallbackResponse(task);
    }
  }

  private getMaxTokens(complexity: TaskComplexity): number {
    switch (complexity) {
      case 'simple':
        return 500;
      case 'medium':
        return 1000;
      case 'complex':
        return 2000;
      default:
        return 1000;
    }
  }

  private getSystemPrompt(task: TaskRequest): string {
    const basePrompt = 'You are an educational AI assistant for New Zealand teachers.';

    if (task.culturalSensitive) {
      return `${basePrompt} Be culturally sensitive and respectful of Māori traditions and knowledge.`;
    }

    return basePrompt;
  }

  private getFallbackResponse(task: TaskRequest): string {
    return `I'm experiencing technical difficulties. Please try again or contact support for ${task.type} assistance.`;
  }

  private async getRouting(task: TaskRequest): Promise<RoutingConfig> {
    // Gemini for multimodal content - images, videos, mixed media lesson plans
    if (
      task.type.includes('multimodal') ||
      task.type.includes('visual') ||
      (task.context as { hasMedia?: boolean })?.hasMedia
    ) {
      return {
        primary: {
          llm: this.registry.getProvider('gemini-cli') || null,
          model: 'gemini-1.5-flash',
          reason: 'multimodal_content',
        },
      };
    }

    // DeepSeek for heavy reasoning and mathematical content
    if (
      task.complexity === 'complex' &&
      (task.priority === 'depth' || task.type.includes('math'))
    ) {
      return {
        primary: {
          llm: this.registry.getProvider('deepseek') || null,
          model: 'deepseek-reasoner',
          reason: 'complex_reasoning_required',
        },
      };
    }

    // Gemini for creative lesson design and gamification (good at creative tasks)
    if (
      task.type.includes('creative') ||
      task.type.includes('game') ||
      task.type.includes('interactive')
    ) {
      return {
        primary: {
          llm: this.registry.getProvider('gemini-cli') || null,
          model: 'gemini-1.5-flash',
          reason: 'creative_and_interactive_content',
        },
      };
    }

    // GPT for fast, simple tasks and embeddings
    if (task.complexity === 'simple' && task.priority === 'speed') {
      return {
        primary: {
          llm: this.registry.getProvider('openai') || null,
          model: 'gpt-4o-mini',
          reason: 'speed_optimized',
        },
      };
    }

    // Claude for cultural sensitivity, critical tasks, orchestration, or when reliability is key
    if (
      task.culturalSensitive ||
      task.complexity === 'critical' ||
      task.priority === 'reliability'
    ) {
      return {
        primary: {
          llm: this.registry.getProvider('windsurf-claude') || null,
          model: 'claude-3-5-sonnet-20241022',
          reason: 'cultural_safety_and_reliability',
        },
      };
    }

    // Default: Claude orchestrates everything else
    return {
      primary: {
        llm: this.registry.getProvider('windsurf-claude') || null,
        model: 'claude-3-5-sonnet-20241022',
        reason: 'default_orchestrator',
      },
    };
  }

  /**
   * When Claude steps in as backup, give it full context about what failed and why
   */
  private wrapPromptForClaudeOrchestration(
    originalPrompt: string,
    task: TaskRequest,
    error: unknown,
  ) {
    return `
You are the TeAoMarama orchestrator stepping in as backup. The primary agent failed.

CONTEXT:
- Task: ${task.type}
- Complexity: ${task.complexity}
- Priority: ${task.priority}
- Cultural sensitive: ${task.culturalSensitive || false}
- Error: ${(error as { message?: string })?.message}

ORIGINAL PROMPT:
${originalPrompt}

Handle this with your full capabilities, considering the failure context and ensuring reliability.
    `;
  }

  private async logSuccess() {
    // This method is no longer used with the new performance optimizer
    // Keeping it for now as it might be re-introduced or removed later
    // For now, it will just log a placeholder message
    console.log('logSuccess is deprecated with new performance optimizer.');
  }

  private async logFallback() {
    // This method is no longer used with the new performance optimizer
    // Keeping it for now as it might be re-introduced or removed later
    // For now, it will just log a placeholder message
    console.log('logFallback is deprecated with new performance optimizer.');
  }

  private async logEmergencyFallback() {
    // This method is no longer used with the new performance optimizer
    // Keeping it for now as it might be re-introduced or removed later
    // For now, it will just log a placeholder message
    console.log('logEmergencyFallback is deprecated with new performance optimizer.');
  }

  private getTemperatureForTask(task: TaskRequest): number {
    if (task.type.includes('extract') || task.type.includes('critic')) return 0.1;
    if (task.type.includes('creative') || task.type.includes('lesson')) return 0.7;
    return 0.3;
  }

  private getTokenLimitForTask(task: TaskRequest): number {
    if (task.complexity === 'complex') return 4000;
    if (task.complexity === 'critical') return 8000;
    return 1500;
  }
}

// Usage example:
// const orchestrator = new AIOrchestrator();
// const result = await orchestrator.route({
//   type: "curriculum_extraction",
//   complexity: "complex",
//   priority: "depth",
//   culturalSensitive: true,
//   prompt: "Extract NZC-aligned nodes from this Māori education resource..."
// });
