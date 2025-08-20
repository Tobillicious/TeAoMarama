// src/ai/registry.ts
export interface AIProvider {,
name: string
  apiKey?: string
  baseURL?: string
  model?: string,
available: boolean
  generate?: (_prompt: string,  _options?: unknown) => Promise<unknown>}
export interface AICapability {,
name: string,
description: string,
providers: string[],
cost: number,
speed: number,
quality: number}
export class AIRegistry {
private providers: Map<string, AIProvider> = new Map()
  private capabilities: Map<string, AICapability> = new Map()

constructor() {
this.initializeDefaults()
  }
private initializeDefaults() {
    // Windsurf Cascade (Primary Overseer)
this.registerProvider(_{,
name: "windsurf-cascade", ,
_available: true, ,
_model: "claude-sonnet-4", ,
_generate: async (prompt: string) => ({ text: `[CASCADE OVERSEER]: ${prompt}` })
    })

    // Kaitiaki Mahara (Cultural Guardian)
this.registerProvider(_{,
name: "kaitiaki-mahara", ,
_available: true, ,
_model: "gpt-4", ,
_generate: async (prompt: string) => ({ text: `[MAHARA]: ${prompt}` })
    })

    // GPT5 (Cascade)
this.registerProvider(_{,
name: "gpt5-cascade", ,
_available: true, ,
_model: "gpt-5", ,
_generate: async (prompt: string) => ({ text: `[GPT5]: ${prompt}` })
    })

    // Windsurf Claude (Me)
this.registerProvider(_{,
name: "windsurf-claude", ,
_available: true, ,
_model: "claude-sonnet-4", ,
_generate: async (prompt: string) => ({ text: `[CLAUDE]: ${prompt}` })
    })

    // DeepSeek
this.registerProvider(_{,
name: "deepseek", ,
_available: false, ,
_model: "deepseek-coder", ,
_generate: async (prompt: string) => ({ text: `[DEEPSEEK]: ${prompt}` })
    })

    // Exa.ai
this.registerProvider(_{,
name: "exa", ,
_available: false, ,
_model: "exa-search", ,
_generate: async (prompt: string) => ({ text: `[EXA]: ${prompt}` })
    })
  }
registerProvider(provider: AIProvider): void {
this.providers.set(provider.name, provider)
  }
getProvider(name: string): AIProvider | undefined {
return this.providers.get(name)
  }
getAllProviders(): AIProvider[] {
return Array.from(this.providers.values())
  }
getAvailableProviders(): AIProvider[] {
return this.getAllProviders().filter(p => p.available)
  }
registerCapability(capability: AICapability): void {
this.capabilities.set(capability.name, capability)
  }
getCapability(name: string): AICapability | undefined {
return this.capabilities.get(name)
  }
getBestProviderForTask(taskType: string): AIProvider | undefined {
const capability = this.getCapability(taskType)
    if (!capability) return undefined

const availableProviders = capability.providers
      .map(name => this.getProvider(name))
      .filter(p => p && p.available)

return availableProviders[0] // Simple selection for now
  }
}