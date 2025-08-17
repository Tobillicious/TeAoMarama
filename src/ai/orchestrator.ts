// src/ai/orchestrator.ts
import { writeEpisode } from './provenance';
import { AIRegistry } from './registry';

type TaskPriority = 'speed' | 'depth' | 'reliability' | 'cost';
type TaskComplexity = 'simple' | 'medium' | 'complex' | 'critical';

export class AIOrchestrator {
  private registry: AIRegistry;

  constructor() {
    this.registry = new AIRegistry();
  }

  /**
   * Claude (me) as the intelligent router and fallback coordinator
   */
  async route(task: {
    type: string;
    complexity: TaskComplexity;
    priority: TaskPriority;
    culturalSensitive?: boolean;
    prompt: string;
    context?: unknown;
  }) {
    // CRITICAL RULE: Claude can always handle everything as backup
    const fallbackToClaude = {
      llm: this.registry.getProvider('windsurf-claude'),
      model: 'claude-3-5-sonnet-20241022',
      reason: 'fallback_orchestrator',
    };

    try {
      // Route based on task characteristics
      const routing = await this.getRouting(task);
      if (typeof routing === 'object' && routing !== null && 'llm' in routing) {
        const route = routing as { llm?: { name: string } };
        console.log(`Routing to: ${route.llm?.name || 'unknown'}`);
      }

      // Try primary choice first
      try {
        const result = await routing.primary.llm?.generate?.(task.prompt, {
          model: routing.primary.model,
          temperature: this.getTemperatureForTask(task),
          maxTokens: this.getTokenLimitForTask(task),
        });

        await this.logSuccess(task, routing.primary, result);
        return result;
      } catch (primaryError) {
        console.warn(`Primary choice failed (${routing.primary.reason}):`, primaryError);

        // Claude steps in as intelligent backup
        const result = await fallbackToClaude.llm?.generate?.(
          this.wrapPromptForClaudeOrchestration(task.prompt, task, primaryError),
          { model: fallbackToClaude.model },
        );

        await this.logFallback(task, routing.primary, fallbackToClaude, result, primaryError);
        return result;
      }
    } catch (routingError) {
      // If routing itself fails, Claude handles everything
      console.error('Routing failed, Claude taking over:', routingError);

      const result = await fallbackToClaude.llm?.generate?.(
        this.wrapPromptForClaudeOrchestration(task.prompt, task, routingError),
        { model: fallbackToClaude.model },
      );

      await this.logEmergencyFallback(task, result, routingError);
      return result;
    }
  }

  private async getRouting(task: {
    type: string;
    complexity: TaskComplexity;
    priority: TaskPriority;
    culturalSensitive?: boolean;
    prompt: string;
    context?: unknown;
  }) {
    // Gemini for multimodal content - images, videos, mixed media lesson plans
    if (
      task.type.includes('multimodal') ||
      task.type.includes('visual') ||
      (task.context as { hasMedia?: boolean })?.hasMedia
    ) {
      return {
        primary: {
          llm: this.registry.getProvider('gemini-cli'),
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
          llm: this.registry.getProvider('deepseek'),
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
          llm: this.registry.getProvider('gemini-cli'),
          model: 'gemini-1.5-flash',
          reason: 'creative_and_interactive_content',
        },
      };
    }

    // GPT for fast, simple tasks and embeddings
    if (task.complexity === 'simple' && task.priority === 'speed') {
      return {
        primary: {
          llm: this.registry.getProvider('openai'),
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
          llm: this.registry.getProvider('windsurf-claude'),
          model: 'claude-3-5-sonnet-20241022',
          reason: 'cultural_safety_and_reliability',
        },
      };
    }

    // Default: Claude orchestrates everything else
    return {
      primary: {
        llm: this.registry.getProvider('windsurf-claude'),
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
    task: {
      type: string;
      complexity: TaskComplexity;
      priority: TaskPriority;
      culturalSensitive?: boolean;
      prompt: string;
      context?: unknown;
    },
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

  private async logSuccess(
    task: {
      type: string;
      complexity: TaskComplexity;
      priority: TaskPriority;
      culturalSensitive?: boolean;
      prompt: string;
      context?: unknown;
    },
    routing: { llm?: { name: string } },
    result: unknown,
  ) {
    await writeEpisode('orchestrator', {
      timestamp: new Date().toISOString(),
      agent: `agent:${routing.llm?.name || 'unknown'}`,
      action: 'orchestrated_success',
      context: {
        task_type: task.type,
        complexity: task.complexity,
        priority: task.priority,
        tokens: (result as { tokensOut?: number })?.tokensOut,
        latency: (result as { latencyMs?: number })?.latencyMs,
      },
      result: result,
    });
  }

  private async logFallback(
    task: {
      type: string;
      complexity: TaskComplexity;
      priority: TaskPriority;
      culturalSensitive?: boolean;
      prompt: string;
      context?: unknown;
    },
    failed: { llm?: { name: string } },
    backup: { llm?: { name: string } },
    result: unknown,
    error: unknown,
  ) {
    await writeEpisode('orchestrator', {
      timestamp: new Date().toISOString(),
      agent: `agent:${backup.llm?.name || 'unknown'}`,
      action: 'orchestrated_fallback',
      context: {
        task_type: task.type,
        failed_provider: failed.llm?.name,
        failure_reason: (error as { message?: string })?.message,
        backup_success: true,
        tokens: (result as { tokensOut?: number })?.tokensOut,
      },
      result: result,
    });
  }

  private async logEmergencyFallback(
    task: {
      type: string;
      complexity: TaskComplexity;
      priority: TaskPriority;
      culturalSensitive?: boolean;
      prompt: string;
      context?: unknown;
    },
    _result: unknown,
    error: unknown,
  ) {
    await writeEpisode('orchestrator', {
      timestamp: new Date().toISOString(),
      agent: 'agent:claude',
      action: 'emergency_orchestration',
      context: {
        task_type: task.type,
        system_failure: true,
        error: (error as { message?: string })?.message,
      },
    });
  }

  private getTemperatureForTask(task: {
    type: string;
    complexity: TaskComplexity;
    priority: TaskPriority;
    culturalSensitive?: boolean;
    prompt: string;
    context?: unknown;
  }): number {
    if (task.type.includes('extract') || task.type.includes('critic')) return 0.1;
    if (task.type.includes('creative') || task.type.includes('lesson')) return 0.7;
    return 0.3;
  }

  private getTokenLimitForTask(task: {
    type: string;
    complexity: TaskComplexity;
    priority: TaskPriority;
    culturalSensitive?: boolean;
    prompt: string;
    context?: unknown;
  }): number {
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
