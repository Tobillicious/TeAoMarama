// src/ai/orchestrator.ts
import { AIRegistry } from "./registry";
import { writeEpisode } from "./provenance";

type TaskPriority = "speed" | "depth" | "reliability" | "cost";
type TaskComplexity = "simple" | "medium" | "complex" | "critical";

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
    context?: any;
  }) {
    
    // CRITICAL RULE: Claude can always handle everything as backup
    const fallbackToClaude = {
      llm: this.registry.get("claude"),
      model: "claude-3-5-sonnet-20241022",
      reason: "fallback_orchestrator"
    };

    try {
      // Route based on task characteristics
      const routing = this.determineRouting(task);
      
      // Try primary choice first
      try {
        const result = await routing.primary.llm.generate(task.prompt, { 
          model: routing.primary.model,
          temperature: this.getTemperatureForTask(task),
          maxTokens: this.getTokenLimitForTask(task)
        });

        await this.logSuccess(task, routing.primary, result);
        return result;

      } catch (primaryError) {
        console.warn(`Primary choice failed (${routing.primary.reason}):`, primaryError);
        
        // Claude steps in as intelligent backup
        const result = await fallbackToClaude.llm.generate(
          this.wrapPromptForClaudeOrchestration(task.prompt, task, primaryError),
          { model: fallbackToClaude.model }
        );

        await this.logFallback(task, routing.primary, fallbackToClaude, result, primaryError);
        return result;
      }

    } catch (routingError) {
      // If routing itself fails, Claude handles everything
      console.error("Routing failed, Claude taking over:", routingError);
      
      const result = await fallbackToClaude.llm.generate(
        this.wrapPromptForClaudeOrchestration(task.prompt, task, routingError),
        { model: fallbackToClaude.model }
      );

      await this.logEmergencyFallback(task, result, routingError);
      return result;
    }
  }

  private determineRouting(task: any) {
    // Gemini for multimodal content - images, videos, mixed media lesson plans
    if (task.type.includes("multimodal") || task.type.includes("visual") || task.context?.hasMedia) {
      return {
        primary: { 
          llm: this.registry.get("gemini"), 
          model: "gemini-1.5-pro",
          reason: "multimodal_processing_required"
        }
      };
    }

    // DeepSeek for heavy reasoning and mathematical content
    if (task.complexity === "complex" && (task.priority === "depth" || task.type.includes("math"))) {
      return {
        primary: { 
          llm: this.registry.get("deepseek"), 
          model: "deepseek-reasoner",
          reason: "complex_reasoning_required"
        }
      };
    }

    // Gemini for creative lesson design and gamification (good at creative tasks)
    if (task.type.includes("creative") || task.type.includes("game") || task.type.includes("interactive")) {
      return {
        primary: { 
          llm: this.registry.get("gemini"), 
          model: "gemini-1.5-flash",
          reason: "creative_and_interactive_content"
        }
      };
    }

    // GPT for fast, simple tasks and embeddings
    if (task.complexity === "simple" && task.priority === "speed") {
      return {
        primary: { 
          llm: this.registry.get("openai"), 
          model: "gpt-4o-mini",
          reason: "speed_optimized"
        }
      };
    }

    // Claude for cultural sensitivity, critical tasks, orchestration, or when reliability is key
    if (task.culturalSensitive || task.complexity === "critical" || task.priority === "reliability") {
      return {
        primary: { 
          llm: this.registry.get("claude"), 
          model: "claude-3-5-sonnet-20241022",
          reason: "cultural_safety_and_reliability"
        }
      };
    }

    // Default: Claude orchestrates everything else
    return {
      primary: { 
        llm: this.registry.get("claude"), 
        model: "claude-3-5-sonnet-20241022",
        reason: "default_orchestrator"
      }
    };
  }

  /**
   * When Claude steps in as backup, give it full context about what failed and why
   */
  private wrapPromptForClaudeOrchestration(originalPrompt: string, task: any, error: any) {
    return `
You are the TeAoMarama orchestrator stepping in as backup. The primary agent failed.

CONTEXT:
- Task: ${task.type}
- Complexity: ${task.complexity}
- Priority: ${task.priority}
- Cultural sensitive: ${task.culturalSensitive || false}
- Error: ${error?.message || 'Unknown failure'}

ORIGINAL PROMPT:
${originalPrompt}

Handle this with your full capabilities, considering the failure context and ensuring reliability.
    `;
  }

  private async logSuccess(task: any, routing: any, result: any) {
    await writeEpisode({
      who: `agent:${routing.llm.name}`,
      kind: "orchestrated_success",
      text: `Successfully handled ${task.type} via ${routing.reason}`,
      cues: {
        task_type: task.type,
        complexity: task.complexity,
        priority: task.priority,
        tokens: result.tokensOut,
        latency: result.latencyMs
      }
    });
  }

  private async logFallback(task: any, failed: any, backup: any, result: any, error: any) {
    await writeEpisode({
      who: `agent:${backup.llm.name}`,
      kind: "orchestrated_fallback",
      text: `Claude stepped in after ${failed.llm.name} failed on ${task.type}`,
      cues: {
        task_type: task.type,
        failed_provider: failed.llm.name,
        failure_reason: error?.message,
        backup_success: true,
        tokens: result.tokensOut
      }
    });
  }

  private async logEmergencyFallback(task: any, result: any, error: any) {
    await writeEpisode({
      who: "agent:claude",
      kind: "emergency_orchestration",
      text: `Claude handling complete system orchestration failure`,
      cues: {
        task_type: task.type,
        system_failure: true,
        error: error?.message
      }
    });
  }

  private getTemperatureForTask(task: any): number {
    if (task.type.includes("extract") || task.type.includes("critic")) return 0.1;
    if (task.type.includes("creative") || task.type.includes("lesson")) return 0.7;
    return 0.3;
  }

  private getTokenLimitForTask(task: any): number {
    if (task.complexity === "complex") return 4000;
    if (task.complexity === "critical") return 8000;
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