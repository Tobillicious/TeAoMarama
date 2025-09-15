// Supreme API Coordination System for Te Ao Mārama
// Manages GLM, Exa.ai, and all API integrations with intelligent routing and caching

export interface APIEndpoint {
  name: string;
  url: string;
  status: 'active' | 'degraded' | 'offline';
  lastCheck: number;
  responseTime: number;
  reliability: number;
}

export interface APIRequest {
  id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: unknown;
  priority: 'low' | 'normal' | 'high' | 'critical';
  retries: number;
  culturalContext?: boolean;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  cached: boolean;
  responseTime: number;
  endpoint: string;
}

class SupremeAPICoordinator {
  private endpoints: Map<string, APIEndpoint>;
  private requestQueue: APIRequest[];
  private cache: Map<string, { data: unknown; expires: number }>;
  private rateLimits: Map<string, { count: number; resetTime: number }>;
  private circuitBreakers: Map<string, { failures: number; lastFailure: number; state: 'closed' | 'open' | 'half-open' }>;

  constructor() {
    this.endpoints = new Map();
    this.requestQueue = [];
    this.cache = new Map();
    this.rateLimits = new Map();
    this.circuitBreakers = new Map();
    this.initializeEndpoints();
    this.startHealthChecking();
  }

  private initializeEndpoints() {
    // GLM API endpoints
    this.registerEndpoint({
      name: 'GLM_CHAT',
      url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      status: 'active',
      lastCheck: 0,
      responseTime: 0,
      reliability: 100,
    });

    // Exa.ai endpoints
    this.registerEndpoint({
      name: 'EXA_SEARCH',
      url: 'https://api.exa.ai/search',
      status: 'active',
      lastCheck: 0,
      responseTime: 0,
      reliability: 100,
    });

    this.registerEndpoint({
      name: 'EXA_CONTENTS',
      url: 'https://api.exa.ai/contents',
      status: 'active',
      lastCheck: 0,
      responseTime: 0,
      reliability: 100,
    });

    // Cultural validation endpoints
    this.registerEndpoint({
      name: 'CULTURAL_VALIDATOR',
      url: '/api/cultural/validate',
      status: 'active',
      lastCheck: 0,
      responseTime: 0,
      reliability: 100,
    });

    console.log('🚀 Supreme API Coordinator initialized with', this.endpoints.size, 'endpoints');
  }

  private registerEndpoint(endpoint: APIEndpoint) {
    this.endpoints.set(endpoint.name, endpoint);
    this.circuitBreakers.set(endpoint.name, {
      failures: 0,
      lastFailure: 0,
      state: 'closed',
    });
    console.log('📡 Registered endpoint:', endpoint.name);
  }

  private startHealthChecking() {
    setInterval(() => {
      this.checkEndpointHealth();
    }, 30000); // Check every 30 seconds
  }

  private async checkEndpointHealth() {
    for (const [name, endpoint] of this.endpoints) {
      try {
        const start = performance.now();
        const response = await fetch(endpoint.url.includes('bigmodel') ? endpoint.url : endpoint.url + '/health', {
          method: 'GET',
          timeout: 5000,
        } as any);

        const responseTime = performance.now() - start;
        
        if (response.ok) {
          endpoint.status = responseTime < 1000 ? 'active' : 'degraded';
          endpoint.responseTime = responseTime;
          endpoint.reliability = Math.min(100, endpoint.reliability + 1);
          
          // Reset circuit breaker on success
          const breaker = this.circuitBreakers.get(name);
          if (breaker && breaker.state === 'half-open') {
            breaker.state = 'closed';
            breaker.failures = 0;
          }
        } else {
          this.handleEndpointFailure(name, endpoint);
        }
        
        endpoint.lastCheck = Date.now();
      } catch (error) {
        this.handleEndpointFailure(name, endpoint);
      }
    }
  }

  private handleEndpointFailure(name: string, endpoint: APIEndpoint) {
    endpoint.status = 'offline';
    endpoint.reliability = Math.max(0, endpoint.reliability - 5);
    
    const breaker = this.circuitBreakers.get(name);
    if (breaker) {
      breaker.failures++;
      breaker.lastFailure = Date.now();
      
      if (breaker.failures >= 5) {
        breaker.state = 'open';
      }
    }
    
    console.warn('⚠️ Endpoint failure:', name, 'Reliability:', endpoint.reliability + '%');
  }

  // Intelligent request routing with circuit breaker pattern
  async executeRequest<T>(request: APIRequest): Promise<APIResponse<T>> {
    const endpoint = this.endpoints.get(request.endpoint);
    if (!endpoint) {
      return {
        success: false,
        error: 'Unknown endpoint',
        cached: false,
        responseTime: 0,
        endpoint: request.endpoint,
      };
    }

    // Check circuit breaker
    const breaker = this.circuitBreakers.get(request.endpoint);
    if (breaker?.state === 'open') {
      if (Date.now() - breaker.lastFailure > 60000) { // 1 minute cooldown
        breaker.state = 'half-open';
      } else {
        return this.tryFallback<T>(request);
      }
    }

    // Check cache first
    const cacheKey = this.generateCacheKey(request);
    const cached = await this.getFromCache<T>(cacheKey);
    if (cached) {
      return cached;
    }

    // Rate limiting check
    if (!this.checkRateLimit(request.endpoint)) {
      this.requestQueue.push(request);
      return {
        success: false,
        error: 'Rate limited - queued for later',
        cached: false,
        responseTime: 0,
        endpoint: request.endpoint,
      };
    }

    try {
      const response = await this.performRequest<T>(request, endpoint);
      
      // Cache successful responses
      if (response.success) {
        await this.setCache(cacheKey, response, this.getCacheTTL(request));
      }
      
      return response;
    } catch (error) {
      this.handleEndpointFailure(request.endpoint, endpoint);
      return this.tryFallback<T>(request);
    }
  }

  private async performRequest<T>(request: APIRequest, endpoint: APIEndpoint): Promise<APIResponse<T>> {
    const start = performance.now();
    
    // Special handling for different API types
    if (request.endpoint.includes('GLM')) {
      return this.executeGLMRequest<T>(request, endpoint);
    } else if (request.endpoint.includes('EXA')) {
      return this.executeExaRequest<T>(request, endpoint);
    } else {
      return this.executeGenericRequest<T>(request, endpoint);
    }
  }

  private async executeGLMRequest<T>(request: APIRequest, endpoint: APIEndpoint): Promise<APIResponse<T>> {
    const start = performance.now();
    
    const headers = {
      'Authorization': `Bearer ${process.env.GLM_API_KEY}`,
      'Content-Type': 'application/json',
    };

    let requestBody;
    if (request.culturalContext) {
      // Enhance with cultural safety prompts
      requestBody = {
        ...request.payload,
        messages: [
          {
            role: 'system',
            content: 'You are an educational assistant focused on New Zealand curriculum with deep respect for Māori culture and tikanga. Always provide culturally safe and appropriate responses.',
          },
          ...(request.payload as any)?.messages || [],
        ],
      };
    } else {
      requestBody = request.payload;
    }

    try {
      const response = await fetch(endpoint.url, {
        method: request.method,
        headers,
        body: JSON.stringify(requestBody),
      });

      const responseTime = performance.now() - start;
      
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          data: data as T,
          cached: false,
          responseTime,
          endpoint: request.endpoint,
        };
      } else {
        throw new Error(`GLM API error: ${response.status}`);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'GLM request failed',
        cached: false,
        responseTime: performance.now() - start,
        endpoint: request.endpoint,
      };
    }
  }

  private async executeExaRequest<T>(request: APIRequest, endpoint: APIEndpoint): Promise<APIResponse<T>> {
    const start = performance.now();
    
    const headers = {
      'x-api-key': process.env.EXA_API_KEY || '',
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(endpoint.url, {
        method: request.method,
        headers,
        body: request.method !== 'GET' ? JSON.stringify(request.payload) : undefined,
      });

      const responseTime = performance.now() - start;
      
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          data: data as T,
          cached: false,
          responseTime,
          endpoint: request.endpoint,
        };
      } else {
        throw new Error(`Exa API error: ${response.status}`);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Exa request failed',
        cached: false,
        responseTime: performance.now() - start,
        endpoint: request.endpoint,
      };
    }
  }

  private async executeGenericRequest<T>(request: APIRequest, endpoint: APIEndpoint): Promise<APIResponse<T>> {
    const start = performance.now();
    
    try {
      const response = await fetch(endpoint.url, {
        method: request.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: request.method !== 'GET' ? JSON.stringify(request.payload) : undefined,
      });

      const responseTime = performance.now() - start;
      
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          data: data as T,
          cached: false,
          responseTime,
          endpoint: request.endpoint,
        };
      } else {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Request failed',
        cached: false,
        responseTime: performance.now() - start,
        endpoint: request.endpoint,
      };
    }
  }

  private async tryFallback<T>(request: APIRequest): Promise<APIResponse<T>> {
    // Try cached version if available
    const cacheKey = this.generateCacheKey(request);
    const staleCache = this.cache.get(cacheKey);
    
    if (staleCache) {
      console.log('📦 Using stale cache for failed request:', request.endpoint);
      return {
        success: true,
        data: staleCache.data as T,
        cached: true,
        responseTime: 0,
        endpoint: request.endpoint,
      };
    }

    return {
      success: false,
      error: 'No fallback available',
      cached: false,
      responseTime: 0,
      endpoint: request.endpoint,
    };
  }

  // Advanced caching system
  private generateCacheKey(request: APIRequest): string {
    const payload = request.payload ? JSON.stringify(request.payload) : '';
    return `${request.endpoint}_${request.method}_${payload}`.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 100);
  }

  private async getFromCache<T>(key: string): Promise<APIResponse<T> | null> {
    const entry = this.cache.get(key);
    if (!entry || Date.now() > entry.expires) {
      return null;
    }

    return {
      success: true,
      data: entry.data as T,
      cached: true,
      responseTime: 0,
      endpoint: 'cache',
    };
  }

  private async setCache(key: string, response: APIResponse<unknown>, ttlMinutes: number): Promise<void> {
    const expires = Date.now() + (ttlMinutes * 60 * 1000);
    this.cache.set(key, {
      data: response.data,
      expires,
    });

    // Clean cache if it gets too large
    if (this.cache.size > 10000) {
      this.cleanCache();
    }
  }

  private getCacheTTL(request: APIRequest): number {
    // Different cache durations based on request type
    if (request.endpoint.includes('CULTURAL')) return 60; // 1 hour
    if (request.endpoint.includes('EXA')) return 30; // 30 minutes
    if (request.endpoint.includes('GLM')) return 15; // 15 minutes
    return 10; // Default 10 minutes
  }

  private cleanCache(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expires) {
        this.cache.delete(key);
      }
    }
  }

  // Rate limiting
  private checkRateLimit(endpoint: string): boolean {
    const now = Date.now();
    const limit = this.rateLimits.get(endpoint);

    if (!limit || now > limit.resetTime) {
      this.rateLimits.set(endpoint, {
        count: 1,
        resetTime: now + 60000, // 1 minute
      });
      return true;
    }

    if (limit.count >= this.getRateLimit(endpoint)) {
      return false;
    }

    limit.count++;
    return true;
  }

  private getRateLimit(endpoint: string): number {
    // Different limits for different endpoints
    if (endpoint.includes('GLM')) return 30; // 30 requests per minute
    if (endpoint.includes('EXA')) return 60; // 60 requests per minute
    return 100; // Default 100 requests per minute
  }

  // Queue processing for rate-limited requests
  private async processQueue(): Promise<void> {
    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift();
      if (request && this.checkRateLimit(request.endpoint)) {
        await this.executeRequest(request);
      }
      
      // Small delay to prevent overwhelming
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Public API methods
  async enhanceContent(content: string, culturalContext = true): Promise<string | null> {
    const request: APIRequest = {
      id: `enhance_${Date.now()}`,
      endpoint: 'GLM_CHAT',
      method: 'POST',
      payload: {
        model: 'glm-4',
        messages: [
          {
            role: 'user',
            content: `Enhance this educational content with cultural context and educational value: ${content}`,
          },
        ],
        temperature: 0.7,
      },
      priority: 'normal',
      retries: 3,
      culturalContext,
    };

    const response = await this.executeRequest<{ choices: Array<{ message: { content: string } }> }>(request);
    
    if (response.success && response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content;
    }
    
    return null;
  }

  async validateLinks(urls: string[]): Promise<Array<{ url: string; valid: boolean; title?: string }>> {
    const request: APIRequest = {
      id: `validate_${Date.now()}`,
      endpoint: 'EXA_CONTENTS',
      method: 'POST',
      payload: {
        ids: urls,
        contents: {
          text: true,
          highlights: false,
          summary: false,
        },
      },
      priority: 'high',
      retries: 2,
    };

    const response = await this.executeRequest<{ results: Array<{ url: string; text: string; title: string }> }>(request);
    
    if (response.success && response.data?.results) {
      return response.data.results.map(result => ({
        url: result.url,
        valid: true,
        title: result.title,
      }));
    }
    
    return urls.map(url => ({ url, valid: false }));
  }

  // System status and metrics
  getSystemStatus() {
    const endpointStatus = Array.from(this.endpoints.entries()).map(([name, endpoint]) => ({
      name,
      status: endpoint.status,
      reliability: endpoint.reliability,
      responseTime: endpoint.responseTime,
    }));

    const circuitBreakerStatus = Array.from(this.circuitBreakers.entries()).map(([name, breaker]) => ({
      name,
      state: breaker.state,
      failures: breaker.failures,
    }));

    return {
      endpoints: endpointStatus,
      circuitBreakers: circuitBreakerStatus,
      cacheSize: this.cache.size,
      queueLength: this.requestQueue.length,
      overallHealth: this.calculateOverallHealth(),
    };
  }

  private calculateOverallHealth(): number {
    const activeEndpoints = Array.from(this.endpoints.values()).filter(e => e.status === 'active').length;
    const totalEndpoints = this.endpoints.size;
    return Math.round((activeEndpoints / totalEndpoints) * 100);
  }

  // Emergency procedures
  async emergencyRestart(): Promise<void> {
    console.log('🚨 Emergency API coordinator restart');
    
    // Clear all caches
    this.cache.clear();
    this.rateLimits.clear();
    this.requestQueue.length = 0;
    
    // Reset circuit breakers
    for (const breaker of this.circuitBreakers.values()) {
      breaker.state = 'closed';
      breaker.failures = 0;
    }
    
    // Force health check
    await this.checkEndpointHealth();
    
    console.log('✅ Emergency restart complete');
  }
}

// Global instance
export const supremeAPICoordinator = new SupremeAPICoordinator();

// Convenience functions
export const enhanceEducationalContent = (content: string): Promise<string | null> => {
  return supremeAPICoordinator.enhanceContent(content, true);
};

export const validateExternalLinks = (urls: string[]) => {
  return supremeAPICoordinator.validateLinks(urls);
};

export const getAPIStatus = () => {
  return supremeAPICoordinator.getSystemStatus();
};

console.log('🌟 Supreme API Coordinator ready for massive scale deployment');