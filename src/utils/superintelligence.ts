export interface SuperintelligenceConfig {
  enabled: boolean;
  debug?: boolean;
  heartbeatMs?: number;
  name?: string;
  brainArchitecture?: boolean;
  graphRag?: boolean;
  overseerCouncil?: boolean;
}

function getEnvValue(key: string): string | undefined {
  try {
    // Vite exposes env via import.meta.env
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (import.meta as any)?.env ?? {};
    return env[key];
  } catch {
    return undefined;
  }
}

function getEnvBoolean(key: string, defaultValue: boolean): boolean {
  const raw = getEnvValue(key);
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return defaultValue;
}

function getEnvNumber(key: string, defaultValue: number): number {
  const raw = getEnvValue(key);
  if (!raw) return defaultValue;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : defaultValue;
}

const defaultConfig: SuperintelligenceConfig = {
  enabled: getEnvBoolean('VITE_SUPERINTELLIGENCE_ENABLED', false),
  debug: getEnvBoolean('VITE_SUPERINTELLIGENCE_DEBUG', false),
  heartbeatMs: getEnvNumber('VITE_SUPERINTELLIGENCE_HEARTBEAT_MS', 0),
  name: getEnvValue('VITE_SUPERINTELLIGENCE_NAME') || 'Mihara',
  brainArchitecture: getEnvBoolean('VITE_BRAIN_ARCHITECTURE_ENABLED', true),
  graphRag: getEnvBoolean('VITE_GRAPHRAG_ENABLED', true),
  overseerCouncil: getEnvBoolean('VITE_OVERSEER_COUNCIL_ENABLED', true),
};

export function initializeSuperintelligence(
  config?: Partial<SuperintelligenceConfig>,
): SuperintelligenceConfig {
  const resolved: SuperintelligenceConfig = { ...defaultConfig, ...config };

  if (!resolved.enabled) {
    return resolved;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalObj = window as any;
  if (resolved.debug) {
    console.log('[Superintelligence] initializing', {
      name: resolved.name,
      heartbeatMs: resolved.heartbeatMs,
      brainArchitecture: resolved.brainArchitecture,
      graphRag: resolved.graphRag,
      overseerCouncil: resolved.overseerCouncil,
    });
  }

  // Expose a comprehensive global for advanced AI coordination
  globalObj.Superintelligence = globalObj.Superintelligence || {};
  globalObj.Superintelligence.name = resolved.name;
  globalObj.Superintelligence.enabled = true;
  globalObj.Superintelligence.version = '2.0.0';
  globalObj.Superintelligence.capabilities = {
    brainArchitecture: resolved.brainArchitecture,
    graphRag: resolved.graphRag,
    overseerCouncil: resolved.overseerCouncil,
  };

  globalObj.Superintelligence.log = (...args: unknown[]) => {
    if (resolved.debug) {
      console.log('[Superintelligence]', ...args);
    }
  };

  // Initialize Brain Architecture if enabled
  if (resolved.brainArchitecture) {
    initializeBrainArchitecture(globalObj, resolved);
  }

  // Initialize GRAPHRAG if enabled
  if (resolved.graphRag) {
    initializeGraphRag(globalObj, resolved);
  }

  // Initialize Overseer Council if enabled
  if (resolved.overseerCouncil) {
    initializeOverseerCouncil(globalObj, resolved);
  }

  // Enhanced heartbeat with system status
  if (resolved.heartbeatMs && resolved.heartbeatMs > 0) {
    if (globalObj.__siHeartbeat) {
      clearInterval(globalObj.__siHeartbeat);
    }
    globalObj.__siHeartbeat = setInterval(() => {
      if (resolved.debug) {
        console.log(`[Superintelligence:${resolved.name}] heartbeat - All systems operational`);
      }
    }, resolved.heartbeatMs);
  }

  return resolved;
}

function initializeBrainArchitecture(globalObj: any, config: SuperintelligenceConfig) {
  globalObj.Superintelligence.brain = {
    name: 'Kaitiaki Aronui',
    role: 'Brain Architecture Overseer',
    capabilities: ['knowledge-synthesis', 'cultural-safety', 'educational-excellence'],
    status: 'active',
    log: (...args: unknown[]) => {
      if (config.debug) {
        console.log('[Brain Architecture]', ...args);
      }
    },
  };

  if (config.debug) {
    console.log('[Brain Architecture] Kaitiaki Aronui initialized - Knowledge synthesis active');
  }
}

function initializeGraphRag(globalObj: any, config: SuperintelligenceConfig) {
  globalObj.Superintelligence.graphRag = {
    name: 'GRAPHRAG',
    role: 'Knowledge Graph & Retrieval',
    capabilities: ['semantic-search', 'knowledge-graph', 'context-retrieval'],
    status: 'active',
    log: (...args: unknown[]) => {
      if (config.debug) {
        console.log('[GRAPHRAG]', ...args);
      }
    },
  };

  if (config.debug) {
    console.log('[GRAPHRAG] Knowledge graph system initialized - Semantic retrieval active');
  }
}

function initializeOverseerCouncil(globalObj: any, config: SuperintelligenceConfig) {
  globalObj.Superintelligence.overseerCouncil = {
    name: 'Overseer Council',
    role: 'Multi-Agent Coordination',
    members: [
      { name: 'Mihara', role: 'Supreme Overseer', status: 'active' },
      { name: 'Kaitiaki Aronui', role: 'Cultural Guardian', status: 'active' },
      { name: 'Windsurf Claude', role: 'Technical Coordinator', status: 'active' },
    ],
    status: 'active',
    log: (...args: unknown[]) => {
      if (config.debug) {
        console.log('[Overseer Council]', ...args);
      }
    },
  };

  if (config.debug) {
    console.log('[Overseer Council] Multi-agent coordination system initialized');
  }
}
