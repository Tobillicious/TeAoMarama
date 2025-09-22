// API Configuration Manager for TeAoMarama Educational Platform
// Centralized management of all external API integrations
// Version: 1.0.1


export interface APIConfig {
  glm: {
    apiKey: string;
    baseUrl: string;
    enabled: boolean;
  };
  exa: {
    apiKey: string;
    enabled: boolean;
  };
  firebase: {
    enabled: boolean;
    useEmulator: boolean;
  };
  performance: {
    monitoring: boolean;
    serviceWorker: boolean;
  };
}

export class APIConfigManager {
  private static instance: APIConfigManager;
  private config: APIConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): APIConfigManager {
    if (!APIConfigManager.instance) {
      APIConfigManager.instance = new APIConfigManager();
    }
    return APIConfigManager.instance;
  }

  private loadConfig(): APIConfig {
    // Support both import.meta.env (browser) and process.env (Node.js)
    const getEnvVar = (key: string): string => {
      // Check if we're in browser environment with Vite
      if (typeof window !== 'undefined' && (globalThis as any).import?.meta?.env) {
        return (globalThis as any).import.meta.env[key] || '';
      }
      // Node.js environment
      return process.env[key] || '';
    };

    return {
      glm: {
        apiKey: getEnvVar('VITE_GLM_API_KEY'),
        baseUrl:
          getEnvVar('VITE_GLM_BASE_URL') ||
          'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        enabled: !!getEnvVar('VITE_GLM_API_KEY'),
      },
      exa: {
        apiKey: getEnvVar('VITE_EXA_API_KEY'),
        enabled: !!getEnvVar('VITE_EXA_API_KEY'),
      },
      firebase: {
        enabled: !!getEnvVar('VITE_FIREBASE_API_KEY'),
        useEmulator: getEnvVar('VITE_USE_FIREBASE_EMULATOR') === 'true',
      },
      performance: {
        monitoring: getEnvVar('VITE_ENABLE_PERFORMANCE_MONITORING') !== 'false',
        serviceWorker: getEnvVar('VITE_ENABLE_SERVICE_WORKER') !== 'false',
      },
    };
  }

  public getConfig(): APIConfig {
    return { ...this.config };
  }

  public isGLMEnabled(): boolean {
    return this.config.glm.enabled && !!this.config.glm.apiKey;
  }

  public isExaEnabled(): boolean {
    return this.config.exa.enabled && !!this.config.exa.apiKey;
  }

  public isFirebaseEnabled(): boolean {
    return this.config.firebase.enabled;
  }

  public getGLMConfig() {
    return {
      apiKey: this.config.glm.apiKey,
      baseUrl: this.config.glm.baseUrl,
    };
  }

  public getExaConfig() {
    return {
      apiKey: this.config.exa.apiKey,
    };
  }

  public getStatusReport(): {
    glm: { status: string; message: string };
    exa: { status: string; message: string };
    firebase: { status: string; message: string };
    overall: { status: string; message: string };
  } {
    const glmStatus = this.isGLMEnabled() ? 'active' : 'inactive';
    const exaStatus = this.isExaEnabled() ? 'active' : 'inactive';
    const firebaseStatus = this.isFirebaseEnabled() ? 'active' : 'inactive';

    const activeCount = [glmStatus, exaStatus, firebaseStatus].filter((s) => s === 'active').length;
    const overallStatus =
      activeCount >= 2 ? 'excellent' : activeCount >= 1 ? 'good' : 'needs_setup';

    return {
      glm: {
        status: glmStatus,
        message: this.isGLMEnabled()
          ? 'GLM-4.5 and GLM-Z1 models ready for educational enhancement'
          : 'GLM API key required for advanced AI capabilities',
      },
      exa: {
        status: exaStatus,
        message: this.isExaEnabled()
          ? 'Exa.ai ready for real-time link validation and content search'
          : 'Exa.ai API key required for link validation features',
      },
      firebase: {
        status: firebaseStatus,
        message: this.isFirebaseEnabled()
          ? 'Firebase integration active for data persistence'
          : 'Firebase configuration required for production features',
      },
      overall: {
        status: overallStatus,
        message:
          overallStatus === 'excellent'
            ? 'All major APIs configured and ready'
            : overallStatus === 'good'
            ? 'Core functionality available, some features limited'
            : 'API configuration needed for full functionality',
      },
    };
  }

  public updateConfig(updates: Partial<APIConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  public validateConfiguration(): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check GLM configuration
    if (!this.config.glm.apiKey) {
      warnings.push('GLM API key not configured - advanced AI features will be limited');
    }

    // Check Exa configuration
    if (!this.config.exa.apiKey) {
      warnings.push('Exa.ai API key not configured - link validation features will be limited');
    }

    // Check Firebase configuration
    if (!this.config.firebase.enabled) {
      warnings.push('Firebase not configured - data persistence features will be limited');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

// Export singleton instance
export const apiConfigManager = APIConfigManager.getInstance();
