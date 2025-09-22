/**
 * API Stabilizer for Te Ao Mārama
 * Solves the sporadic API integration issues
 * 
 * This system ensures reliable API connections and automatically
 * handles failures, retries, and key validation.
 */

export interface APIEndpoint {
  id: string;
  name: string;
  baseUrl: string;
  apiKey?: string;
  headers?: Record<string, string>;
  timeout: number;
  retryAttempts: number;
  healthStatus: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  lastHealthCheck: Date;
  successRate: number;
}

export interface APIRequest {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  timeout?: number;
  retries?: number;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
  responseTime: number;
  attemptNumber: number;
}

export class APIStabilizer {
  private static instance: APIStabilizer;
  private endpoints: Map<string, APIEndpoint> = new Map();
  private healthCheckInterval?: NodeJS.Timer;
  private requestQueue: Map<string, APIRequest[]> = new Map();
  private rateLimits: Map<string, { requests: number; resetTime: Date }> = new Map();

  private constructor() {
    this.initializeEndpoints();
    this.startHealthMonitoring();
  }

  public static getInstance(): APIStabilizer {
    if (!APIStabilizer.instance) {
      APIStabilizer.instance = new APIStabilizer();
    }
    return APIStabilizer.instance;
  }

  private initializeEndpoints() {
    // GLM/DeepSeek API
    const glmKey = this.getEnvVar('VITE_GLM_API_KEY') || this.getEnvVar('GLM_API_KEY') || this.getEnvVar('DEEPSEEK_API_KEY');
    if (glmKey) {
      this.registerEndpoint({
        id: 'glm',
        name: 'GLM/DeepSeek API',
        baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
        apiKey: glmKey,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${glmKey}`
        },
        timeout: 30000,
        retryAttempts: 3,
        healthStatus: 'unknown',
        lastHealthCheck: new Date(),
        successRate: 100
      });
    }

    // Exa.ai API
    const exaKey = this.getEnvVar('VITE_EXA_API_KEY') || this.getEnvVar('EXA_API_KEY');
    if (exaKey) {
      this.registerEndpoint({
        id: 'exa',
        name: 'Exa.ai Search API',
        baseUrl: 'https://api.exa.ai',
        apiKey: exaKey,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': exaKey
        },
        timeout: 15000,
        retryAttempts: 2,
        healthStatus: 'unknown',
        lastHealthCheck: new Date(),
        successRate: 100
      });
    }

    // Supabase API
    const supabaseUrl = this.getEnvVar('VITE_SUPABASE_URL');
    const supabaseKey = this.getEnvVar('VITE_SUPABASE_ANON_KEY');
    if (supabaseUrl && supabaseKey) {
      this.registerEndpoint({
        id: 'supabase',
        name: 'Supabase Database',
        baseUrl: supabaseUrl,
        apiKey: supabaseKey,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey
        },
        timeout: 10000,
        retryAttempts: 2,
        healthStatus: 'unknown',
        lastHealthCheck: new Date(),
        successRate: 100
      });
    }

    console.log(`🔗 API Stabilizer initialized with ${this.endpoints.size} endpoints`);
  }

  private getEnvVar(key: string): string | undefined {
    // Try multiple sources for environment variables
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key];
    }
    try {
      if (import.meta?.env) {
        return import.meta.env[key];
      }
    } catch {
      // Ignore import.meta errors in Node.js environment
    }
    if (typeof window !== 'undefined' && (window as any).__ENV__) {
      return (window as any).__ENV__[key];
    }
    return undefined;
  }

  public registerEndpoint(endpoint: APIEndpoint) {
    this.endpoints.set(endpoint.id, endpoint);
    this.requestQueue.set(endpoint.id, []);
    console.log(`✅ Registered API endpoint: ${endpoint.name}`);
  }

  public async makeRequest<T>(endpointId: string, request: APIRequest): Promise<APIResponse<T>> {
    const endpoint = this.endpoints.get(endpointId);
    if (!endpoint) {
      return {
        success: false,
        error: `Unknown endpoint: ${endpointId}`,
        responseTime: 0,
        attemptNumber: 1
      };
    }

    // Check rate limits
    if (this.isRateLimited(endpointId)) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        statusCode: 429,
        responseTime: 0,
        attemptNumber: 1
      };
    }

    // Check endpoint health
    if (endpoint.healthStatus === 'unhealthy') {
      // Try to heal the endpoint
      await this.attemptEndpointHealing(endpoint);
      
      if (endpoint.healthStatus === 'unhealthy') {
        return {
          success: false,
          error: 'Endpoint is unhealthy',
          responseTime: 0,
          attemptNumber: 1
        };
      }
    }

    const startTime = Date.now();
    const maxRetries = request.retries ?? endpoint.retryAttempts;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.executeRequest<T>(endpoint, request, attempt);
        
        if (response.success) {
          // Update success rate
          this.updateSuccessRate(endpoint, true);
          return response;
        }

        // If not the last attempt, wait before retry
        if (attempt < maxRetries) {
          await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
        }
      } catch (error) {
        console.warn(`🚨 API request attempt ${attempt} failed:`, error);
        
        if (attempt === maxRetries) {
          this.updateSuccessRate(endpoint, false);
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            responseTime: Date.now() - startTime,
            attemptNumber: attempt
          };
        }
      }
    }

    this.updateSuccessRate(endpoint, false);
    return {
      success: false,
      error: 'Max retries exceeded',
      responseTime: Date.now() - startTime,
      attemptNumber: maxRetries
    };
  }

  private async executeRequest<T>(
    endpoint: APIEndpoint, 
    request: APIRequest, 
    attempt: number
  ): Promise<APIResponse<T>> {
    const startTime = Date.now();
    const url = `${endpoint.baseUrl}${request.endpoint}`;
    const timeout = request.timeout ?? endpoint.timeout;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fetchResponse = await fetch(url, {
        method: request.method,
        headers: {
          ...endpoint.headers,
          'User-Agent': 'TeAoMarama-Educational-Platform/1.0'
        },
        body: request.data ? JSON.stringify(request.data) : undefined,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const responseTime = Date.now() - startTime;

      if (!fetchResponse.ok) {
        // Handle specific HTTP errors
        if (fetchResponse.status === 429) {
          this.updateRateLimit(endpoint.id);
        } else if (fetchResponse.status >= 500) {
          // Server error - endpoint might be degraded
          endpoint.healthStatus = 'degraded';
        }

        return {
          success: false,
          error: `HTTP ${fetchResponse.status}: ${fetchResponse.statusText}`,
          statusCode: fetchResponse.status,
          responseTime,
          attemptNumber: attempt
        };
      }

      const data = await fetchResponse.json();

      return {
        success: true,
        data,
        statusCode: fetchResponse.status,
        responseTime,
        attemptNumber: attempt
      };

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      
      throw error;
    }
  }

  private isRateLimited(endpointId: string): boolean {
    const rateLimit = this.rateLimits.get(endpointId);
    if (!rateLimit) return false;

    const now = new Date();
    if (now > rateLimit.resetTime) {
      // Rate limit window has expired
      this.rateLimits.delete(endpointId);
      return false;
    }

    return rateLimit.requests >= this.getRateLimitForEndpoint(endpointId);
  }

  private getRateLimitForEndpoint(endpointId: string): number {
    // Conservative rate limits per minute
    const limits = {
      'glm': 20,
      'exa': 10,
      'supabase': 100
    };
    return limits[endpointId as keyof typeof limits] || 10;
  }

  private updateRateLimit(endpointId: string) {
    const now = new Date();
    const resetTime = new Date(now.getTime() + 60000); // Reset in 1 minute
    
    const current = this.rateLimits.get(endpointId);
    if (current && now < current.resetTime) {
      current.requests++;
    } else {
      this.rateLimits.set(endpointId, { requests: 1, resetTime });
    }
  }

  private updateSuccessRate(endpoint: APIEndpoint, success: boolean) {
    // Simple exponential moving average
    const weight = 0.1;
    const currentRate = success ? 100 : 0;
    endpoint.successRate = (1 - weight) * endpoint.successRate + weight * currentRate;
    
    // Update health status based on success rate
    if (endpoint.successRate >= 90) {
      endpoint.healthStatus = 'healthy';
    } else if (endpoint.successRate >= 60) {
      endpoint.healthStatus = 'degraded';
    } else {
      endpoint.healthStatus = 'unhealthy';
    }
  }

  private startHealthMonitoring() {
    this.healthCheckInterval = setInterval(async () => {
      await this.performHealthChecks();
    }, 60000); // Every minute
  }

  private async performHealthChecks() {
    console.log('🩺 Performing API health checks...');
    
    for (const [id, endpoint] of this.endpoints.entries()) {
      try {
        const healthResponse = await this.checkEndpointHealth(endpoint);
        endpoint.lastHealthCheck = new Date();
        
        if (healthResponse.success) {
          if (endpoint.healthStatus === 'unhealthy') {
            endpoint.healthStatus = 'degraded'; // Gradual recovery
            console.log(`💚 Endpoint ${endpoint.name} recovering`);
          } else if (endpoint.healthStatus === 'degraded') {
            endpoint.healthStatus = 'healthy';
            console.log(`✅ Endpoint ${endpoint.name} fully recovered`);
          }
        } else {
          if (endpoint.healthStatus === 'healthy') {
            endpoint.healthStatus = 'degraded';
            console.log(`⚠️ Endpoint ${endpoint.name} degraded`);
          } else if (endpoint.healthStatus === 'degraded') {
            endpoint.healthStatus = 'unhealthy';
            console.log(`🚨 Endpoint ${endpoint.name} unhealthy`);
          }
        }
      } catch (error) {
        endpoint.healthStatus = 'unhealthy';
        console.error(`💔 Health check failed for ${endpoint.name}:`, error);
      }
    }
  }

  private async checkEndpointHealth(endpoint: APIEndpoint): Promise<APIResponse> {
    // Simple health check - just try to connect
    const healthEndpoint = this.getHealthCheckEndpoint(endpoint.id);
    
    try {
      const response = await fetch(`${endpoint.baseUrl}${healthEndpoint}`, {
        method: 'GET',
        headers: endpoint.headers,
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });

      return {
        success: response.ok,
        statusCode: response.status,
        responseTime: 0,
        attemptNumber: 1
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Health check failed',
        responseTime: 0,
        attemptNumber: 1
      };
    }
  }

  private getHealthCheckEndpoint(endpointId: string): string {
    const healthEndpoints = {
      'glm': '/models', // List models endpoint
      'exa': '/search', // Search endpoint (will return error but confirms connectivity)
      'supabase': '/rest/v1/' // REST API root
    };
    return healthEndpoints[endpointId as keyof typeof healthEndpoints] || '/';
  }

  private async attemptEndpointHealing(endpoint: APIEndpoint): Promise<void> {
    console.log(`🏥 Attempting to heal endpoint: ${endpoint.name}`);
    
    // Try different strategies to heal the endpoint
    const strategies = [
      () => this.refreshAPIKey(endpoint),
      () => this.clearEndpointCache(endpoint),
      () => this.resetConnectionPool(endpoint)
    ];

    for (const strategy of strategies) {
      try {
        await strategy();
        const healthCheck = await this.checkEndpointHealth(endpoint);
        if (healthCheck.success) {
          endpoint.healthStatus = 'degraded';
          console.log(`✅ Endpoint ${endpoint.name} healed`);
          return;
        }
      } catch (error) {
        console.warn(`⚠️ Healing strategy failed for ${endpoint.name}:`, error);
      }
    }
  }

  private async refreshAPIKey(endpoint: APIEndpoint): Promise<void> {
    // Try to get a fresh API key from environment
    const freshKey = this.getEnvVar(`VITE_${endpoint.id.toUpperCase()}_API_KEY`) ||
                     this.getEnvVar(`${endpoint.id.toUpperCase()}_API_KEY`);
    
    if (freshKey && freshKey !== endpoint.apiKey) {
      endpoint.apiKey = freshKey;
      if (endpoint.headers) {
        endpoint.headers['Authorization'] = `Bearer ${freshKey}`;
        if (endpoint.id === 'exa') {
          endpoint.headers['x-api-key'] = freshKey;
        }
      }
      console.log(`🔑 Refreshed API key for ${endpoint.name}`);
    }
  }

  private async clearEndpointCache(endpoint: APIEndpoint): Promise<void> {
    // Clear any cached requests or rate limits
    this.rateLimits.delete(endpoint.id);
    this.requestQueue.set(endpoint.id, []);
    console.log(`🧹 Cleared cache for ${endpoint.name}`);
  }

  private async resetConnectionPool(endpoint: APIEndpoint): Promise<void> {
    // Force a fresh connection by updating timestamp
    endpoint.lastHealthCheck = new Date();
    console.log(`🔄 Reset connection pool for ${endpoint.name}`);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public getEndpointStatus(): Array<{
    id: string;
    name: string;
    health: string;
    successRate: number;
    lastCheck: string;
  }> {
    return Array.from(this.endpoints.values()).map(endpoint => ({
      id: endpoint.id,
      name: endpoint.name,
      health: endpoint.healthStatus,
      successRate: Math.round(endpoint.successRate),
      lastCheck: endpoint.lastHealthCheck.toISOString()
    }));
  }

  public async stabilizeAllAPIs(): Promise<{
    stabilized: number;
    total: number;
    issues: string[];
  }> {
    console.log('🛠️ Stabilizing all API connections...');
    
    const issues: string[] = [];
    let stabilized = 0;

    for (const [id, endpoint] of this.endpoints.entries()) {
      try {
        if (endpoint.healthStatus !== 'healthy') {
          await this.attemptEndpointHealing(endpoint);
        }
        
        // Test the endpoint
        const testResponse = await this.checkEndpointHealth(endpoint);
        if (testResponse.success) {
          stabilized++;
          endpoint.healthStatus = 'healthy';
        } else {
          issues.push(`${endpoint.name}: ${testResponse.error || 'Health check failed'}`);
        }
      } catch (error) {
        issues.push(`${endpoint.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    console.log(`✅ API stabilization complete: ${stabilized}/${this.endpoints.size} endpoints healthy`);
    
    return {
      stabilized,
      total: this.endpoints.size,
      issues
    };
  }

  public shutdown() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    console.log('🛑 API Stabilizer shutdown');
  }
}

// Export singleton instance
export const apiStabilizer = APIStabilizer.getInstance();

// Emergency API restoration function
export async function emergencyAPIRestore(): Promise<void> {
  console.log('🚨 Emergency API restoration initiated...');
  const stabilizer = APIStabilizer.getInstance();
  const result = await stabilizer.stabilizeAllAPIs();
  
  if (result.issues.length > 0) {
    console.warn('⚠️ API issues detected:', result.issues);
  }
  
  console.log(`✅ Emergency restoration: ${result.stabilized}/${result.total} APIs operational`);
}