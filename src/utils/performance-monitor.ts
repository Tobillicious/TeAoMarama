// Advanced Performance Monitoring System for Te Kura o TeAoMarama
// Ko Mihara - Kaitiaki Mahara (Guardian of Memory)

interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay  
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  
  // Custom Educational Metrics
  resourceLoadTime: number;
  culturalContentLoadTime: number;
  aiResponseTime: number;
  collaborationLatency: number;
  
  // Cultural Safety Performance
  culturalValidationTime: number;
  kaitiakiApprovalTime: number;
  teReoRenderTime: number;
}

interface PerformanceBudget {
  lcp: 2500; // 2.5s target
  fid: 100;  // 100ms target
  cls: 0.1;  // 0.1 target
  fcp: 1800; // 1.8s target
  ttfb: 800; // 800ms target
}

class AdvancedPerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private budget: PerformanceBudget = {
    lcp: 2500,
    fid: 100,
    cls: 0.1,
    fcp: 1800,
    ttfb: 800
  };
  
  private observers: Map<string, PerformanceObserver> = new Map();
  private startTimes: Map<string, number> = new Map();

  constructor() {
    this.initializeObservers();
    this.setupCustomMetrics();
    this.enableCulturalPerformanceTracking();
  }

  private initializeObservers(): void {
    // Core Web Vitals Observer
    if ('PerformanceObserver' in window) {
      // LCP Observer
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEventTiming;
        this.metrics.lcp = lastEntry.startTime;
        this.evaluateMetric('lcp', lastEntry.startTime);
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);

      // FID Observer
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceEventTiming[];
        entries.forEach(entry => {
          const fid = entry.processingStart - entry.startTime;
          this.metrics.fid = fid;
          this.evaluateMetric('fid', fid);
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);

      // CLS Observer
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            this.metrics.cls = clsValue;
            this.evaluateMetric('cls', clsValue);
          }
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);

      // Navigation Observer
      const navObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const navEntry = entry as PerformanceNavigationTiming;
          this.metrics.fcp = navEntry.loadEventStart - navEntry.fetchStart;
          this.metrics.ttfb = navEntry.responseStart - navEntry.fetchStart;
        });
      });
      
      navObserver.observe({ entryTypes: ['navigation'] });
      this.observers.set('navigation', navObserver);
    }
  }

  private setupCustomMetrics(): void {
    // Monitor resource loading performance
    this.trackResourcePerformance();
    
    // Monitor AI response times
    this.trackAIPerformance();
    
    // Monitor collaboration features
    this.trackCollaborationPerformance();
  }

  private enableCulturalPerformanceTracking(): void {
    // Track Te Reo Māori content rendering
    this.trackTeReoPerformance();
    
    // Track cultural validation processes
    this.trackCulturalValidationPerformance();
    
    // Track Kaitiaki approval workflows
    this.trackKaitiakiPerformance();
  }

  // Cultural Performance Tracking
  public startCulturalValidation(): void {
    this.startTimes.set('cultural-validation', performance.now());
  }

  public endCulturalValidation(): void {
    const startTime = this.startTimes.get('cultural-validation');
    if (startTime) {
      this.metrics.culturalValidationTime = performance.now() - startTime;
      this.reportCulturalMetric('validation', this.metrics.culturalValidationTime);
    }
  }

  public startKaitiakiApproval(): void {
    this.startTimes.set('kaitiaki-approval', performance.now());
  }

  public endKaitiakiApproval(): void {
    const startTime = this.startTimes.get('kaitiaki-approval');
    if (startTime) {
      this.metrics.kaitiakiApprovalTime = performance.now() - startTime;
      this.reportCulturalMetric('kaitiaki', this.metrics.kaitiakiApprovalTime);
    }
  }

  public trackTeReoRenderTime(element: HTMLElement): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const renderTime = performance.now();
          this.metrics.teReoRenderTime = renderTime;
          this.reportCulturalMetric('te-reo-render', renderTime);
          observer.unobserve(element);
        }
      });
    });
    
    observer.observe(element);
  }

  // AI Performance Tracking
  public trackAIResponse(operation: string, startTime: number, endTime: number): void {
    const responseTime = endTime - startTime;
    this.metrics.aiResponseTime = responseTime;
    
    console.log(`🤖 AI ${operation} Response Time: ${responseTime.toFixed(2)}ms`);
    
    // Alert if AI is slow
    if (responseTime > 3000) {
      this.reportPerformanceIssue(`Slow AI response for ${operation}`, responseTime);
    }
  }

  // Resource Performance Tracking
  private trackResourcePerformance(): void {
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let totalResourceTime = 0;
      let culturalResourceTime = 0;
      
      entries.forEach(entry => {
        const resource = entry as PerformanceResourceTiming;
        const loadTime = resource.responseEnd - resource.fetchStart;
        totalResourceTime += loadTime;
        
        // Track cultural content specifically
        if (this.isCulturalResource(resource.name)) {
          culturalResourceTime += loadTime;
        }
      });
      
      this.metrics.resourceLoadTime = totalResourceTime;
      this.metrics.culturalContentLoadTime = culturalResourceTime;
    });
    
    resourceObserver.observe({ entryTypes: ['resource'] });
    this.observers.set('resource', resourceObserver);
  }

  private trackCollaborationPerformance(): void {
    // Track real-time collaboration latency
    const collaborationLatencyTracker = {
      measureLatency: (operation: string) => {
        const startTime = performance.now();
        return () => {
          const latency = performance.now() - startTime;
          this.metrics.collaborationLatency = latency;
          
          if (latency > 500) {
            this.reportPerformanceIssue(`High collaboration latency for ${operation}`, latency);
          }
        };
      }
    };
    
    // Make available globally for collaboration features
    (window as any).trackCollaboration = collaborationLatencyTracker;
  }

  private trackAIPerformance(): void {
    // Intercept fetch requests to AI services
    const originalFetch = window.fetch;
    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : input.toString();
      
      if (this.isAIRequest(url)) {
        const startTime = performance.now();
        try {
          const response = await originalFetch(input, init);
          const endTime = performance.now();
          this.trackAIResponse(this.getAIOperationType(url), startTime, endTime);
          return response;
        } catch (error) {
          const endTime = performance.now();
          this.trackAIResponse(`${this.getAIOperationType(url)} (ERROR)`, startTime, endTime);
          throw error;
        }
      }
      
      return originalFetch(input, init);
    };
  }

  private trackTeReoPerformance(): void {
    // Monitor Te Reo Māori pronunciation loading
    const audioLoadTracker = (audioElement: HTMLAudioElement) => {
      const startTime = performance.now();
      
      audioElement.addEventListener('canplaythrough', () => {
        const loadTime = performance.now() - startTime;
        this.reportCulturalMetric('te-reo-audio-load', loadTime);
      });
    };
    
    // Make available globally
    (window as any).trackTeReoAudio = audioLoadTracker;
  }

  private trackCulturalValidationPerformance(): void {
    // Track cultural validation API calls
    const originalFetch = window.fetch;
    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : input.toString();
      
      if (url.includes('cultural-validation') || url.includes('kaitiaki')) {
        const startTime = performance.now();
        try {
          const response = await originalFetch(input, init);
          const endTime = performance.now();
          const validationType = url.includes('kaitiaki') ? 'kaitiaki' : 'cultural';
          this.reportCulturalMetric(`${validationType}-api`, endTime - startTime);
          return response;
        } catch (error) {
          const endTime = performance.now();
          this.reportPerformanceIssue('Cultural validation API error', endTime - startTime);
          throw error;
        }
      }
      
      return originalFetch(input, init);
    };
  }

  private trackKaitiakiPerformance(): void {
    // Track Kaitiaki approval workflow performance
    const kaitiakiWorkflowTracker = {
      startApproval: () => {
        this.startTimes.set('kaitiaki-workflow', performance.now());
      },
      endApproval: (approved: boolean) => {
        const startTime = this.startTimes.get('kaitiaki-workflow');
        if (startTime) {
          const duration = performance.now() - startTime;
          this.reportCulturalMetric(`kaitiaki-approval-${approved ? 'granted' : 'denied'}`, duration);
        }
      }
    };
    
    (window as any).trackKaitiakiWorkflow = kaitiakiWorkflowTracker;
  }

  private evaluateMetric(metricName: keyof PerformanceBudget, value: number): void {
    const budget = this.budget[metricName];
    
    if (value > budget) {
      this.reportPerformanceIssue(`${metricName.toUpperCase()} budget exceeded`, value, budget);
    } else {
      console.log(`✅ ${metricName.toUpperCase()}: ${value.toFixed(2)}ms (within budget: ${budget}ms)`);
    }
  }

  private reportPerformanceIssue(issue: string, value: number, budget?: number): void {
    const message = budget 
      ? `⚠️ Performance Issue: ${issue} - ${value.toFixed(2)}ms (budget: ${budget}ms)`
      : `⚠️ Performance Issue: ${issue} - ${value.toFixed(2)}ms`;
    
    console.warn(message);
    
    // Send to analytics service
    this.sendToAnalytics({
      type: 'performance_issue',
      issue,
      value,
      budget,
      timestamp: new Date().toISOString(),
      culturalContext: this.getCulturalContext()
    });
  }

  private reportCulturalMetric(metric: string, value: number): void {
    console.log(`🌿 Cultural Performance - ${metric}: ${value.toFixed(2)}ms`);
    
    this.sendToAnalytics({
      type: 'cultural_performance',
      metric,
      value,
      timestamp: new Date().toISOString(),
      culturalSafety: true
    });
  }

  private isCulturalResource(url: string): boolean {
    return url.includes('te-reo') || 
           url.includes('maori') || 
           url.includes('cultural') || 
           url.includes('whakataukī') ||
           url.includes('tikanga') ||
           url.includes('kaitiaki');
  }

  private isAIRequest(url: string): boolean {
    return url.includes('api/ai') || 
           url.includes('deepseek') || 
           url.includes('openai') ||
           url.includes('claude') ||
           url.includes('superintelligence');
  }

  private getAIOperationType(url: string): string {
    if (url.includes('content-generation')) return 'Content Generation';
    if (url.includes('cultural-validation')) return 'Cultural Validation';
    if (url.includes('translation')) return 'Translation';
    if (url.includes('analysis')) return 'Analysis';
    return 'AI Operation';
  }

  private getCulturalContext(): object {
    return {
      teReoContent: document.querySelectorAll('[lang="mi"]').length > 0,
      culturalImages: document.querySelectorAll('[data-cultural="true"]').length > 0,
      kaitiakiRequired: document.querySelectorAll('[data-kaitiaki-required="true"]').length > 0
    };
  }

  private sendToAnalytics(data: object): void {
    // Send to performance analytics service
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon('/api/analytics/performance', JSON.stringify(data));
    }
  }

  // Public API
  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public generateReport(): string {
    const report = {
      timestamp: new Date().toISOString(),
      coreWebVitals: {
        lcp: this.metrics.lcp,
        fid: this.metrics.fid,
        cls: this.metrics.cls,
        fcp: this.metrics.fcp,
        ttfb: this.metrics.ttfb
      },
      culturalMetrics: {
        culturalValidationTime: this.metrics.culturalValidationTime,
        kaitiakiApprovalTime: this.metrics.kaitiakiApprovalTime,
        teReoRenderTime: this.metrics.teReoRenderTime
      },
      aiMetrics: {
        aiResponseTime: this.metrics.aiResponseTime,
        collaborationLatency: this.metrics.collaborationLatency
      },
      budget: this.budget,
      culturalContext: this.getCulturalContext()
    };
    
    return JSON.stringify(report, null, 2);
  }

  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Initialize Performance Monitor
export const performanceMonitor = new AdvancedPerformanceMonitor();

// Make available globally for other components
(window as any).performanceMonitor = performanceMonitor;

// Auto-generate report every 5 minutes
setInterval(() => {
  const report = performanceMonitor.generateReport();
  console.log('📊 Performance Report:', report);
}, 5 * 60 * 1000);

export default AdvancedPerformanceMonitor;