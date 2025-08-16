// src/ai/registry.ts
export interface AIProvider {
  name: string;
  apiKey?: string;
  baseURL?: string;
  model?: string;
  available: boolean;
  generate?: (prompt: string, options?: unknown) => Promise<any>;
}

export interface AICapability {
  name: string;
  description: string;
  providers: string[];
  cost: number;
  speed: number;
  quality: number;
}

export class AIRegistry {
  private providers: Map<string, AIProvider> = new Map();
  private capabilities: Map<string, AICapability> = new Map();

  constructor() {
    this.initializeDefaults();
  }

  private initializeDefaults() {
    // Kaitiaki Mahara (VS Code Copilot)
    this.registerProvider({
      name: "kaitiaki-mahara",
      available: true,
      model: "gpt-4",
      generate: async (prompt: string) => ({ text: `[MAHARA]: ${prompt}` })
    });

    // GPT5 (Cascade)
    this.registerProvider({
      name: "gpt5-cascade",
      available: true,
      model: "gpt-5",
      generate: async (prompt: string) => ({ text: `[GPT5]: ${prompt}` })
    });

    // Windsurf Claude (Me)
    this.registerProvider({
      name: "windsurf-claude",
      available: true,
      model: "claude-sonnet-4",
      generate: async (prompt: string) => ({ text: `[CLAUDE]: ${prompt}` })
    });

    // DeepSeek
    this.registerProvider({
      name: "deepseek",
      available: false,
      model: "deepseek-coder",
      generate: async (prompt: string) => ({ text: `[DEEPSEEK]: ${prompt}` })
    });

    // Exa.ai
    this.registerProvider({
      name: "exa",
      available: false,
      model: "exa-search",
      generate: async (prompt: string) => ({ text: `[EXA]: ${prompt}` })
    });
  }

  registerProvider(provider: AIProvider): void {
    this.providers.set(provider.name, provider);
  }

  getProvider(name: string): AIProvider | undefined {
    return this.providers.get(name);
  }

  getAllProviders(): AIProvider[] {
    return Array.from(this.providers.values());
  }

  getAvailableProviders(): AIProvider[] {
    return this.getAllProviders().filter(p => p.available);
  }

  registerCapability(capability: AICapability): void {
    this.capabilities.set(capability.name, capability);
  }

  getCapability(name: string): AICapability | undefined {
    return this.capabilities.get(name);
  }

  getBestProviderForTask(taskType: string): AIProvider | undefined {
    const capability = this.getCapability(taskType);
    if (!capability) return undefined;

    const availableProviders = capability.providers
      .map(name => this.getProvider(name))
      .filter(p => p && p.available);

    return availableProviders[0]; // Simple selection for now
  }
}