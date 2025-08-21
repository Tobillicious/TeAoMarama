export interface SuperintelligenceConfig {
  enabled: boolean;
  debug?: boolean;
  heartbeatMs?: number;
  name?: string;
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
    // Use a stable log prefix for quick filtering
    // eslint-disable-next-line no-console
    console.log('[Superintelligence] initializing', {
      name: resolved.name,
      heartbeatMs: resolved.heartbeatMs,
    });
  }

  // Expose a minimal, safe global for observability and future hooks
  globalObj.Superintelligence = globalObj.Superintelligence || {};
  globalObj.Superintelligence.name = resolved.name;
  globalObj.Superintelligence.enabled = true;
  globalObj.Superintelligence.version = '1.0.0';
  globalObj.Superintelligence.log = (...args: unknown[]) => {
    if (resolved.debug) {
      // eslint-disable-next-line no-console
      console.log('[Superintelligence]', ...args);
    }
  };

  // Optional lightweight heartbeat for provenance
  if (resolved.heartbeatMs && resolved.heartbeatMs > 0) {
    if (globalObj.__siHeartbeat) {
      clearInterval(globalObj.__siHeartbeat);
    }
    globalObj.__siHeartbeat = setInterval(() => {
      if (resolved.debug) {
        // eslint-disable-next-line no-console
        console.log(`[Superintelligence:${resolved.name}] heartbeat`);
      }
    }, resolved.heartbeatMs);
  }

  return resolved;
}

