// Performance monitoring and Core Web Vitals tracking
export interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fcp: number; // First Contentful Paint
  tbt: number; // Total Blocking Time
  si: number; // Speed Index
}

export interface PerformanceReport {
  timestamp: number;
  metrics: PerformanceMetrics;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  recommendations: string[];
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    fcp: 0,
    tbt: 0,
    si: 0,
  };

  private observers: PerformanceObserver[] = [];
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (this.isInitialized || !('PerformanceObserver' in window)) {
      return;
    }

    this.setupLCPObserver();
    this.setupFIDObserver();
    this.setupCLSObserver();
    this.setupNavigationObserver();
    this.setupPaintObserver();

    this.isInitialized = true;
  }

  private setupLCPObserver(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry;
        this.metrics.lcp = lastEntry.startTime;
        this.logMetric('LCP', this.metrics.lcp);
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('LCP observer setup failed:', error);
    }
  }

  private setupFIDObserver(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'first-input') {
            const firstInput = entry as PerformanceEventTiming;
            this.metrics.fid = firstInput.processingStart - firstInput.startTime;
            this.logMetric('FID', this.metrics.fid);
          }
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FID observer setup failed:', error);
    }
  }

  private setupCLSObserver(): void {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (
            entry.entryType === 'layout-shift' &&
            !(entry as PerformanceEntry & { hadRecentInput?: boolean }).hadRecentInput
          ) {
            clsValue += (entry as PerformanceEntry & { value: number }).value;
            this.metrics.cls = clsValue;
            this.logMetric('CLS', this.metrics.cls);
          }
        });
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('CLS observer setup failed:', error);
    }
  }

  private setupNavigationObserver(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navigation = entry as PerformanceNavigationTiming;
            this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
            this.logMetric('TTFB', this.metrics.ttfb);
          }
        });
      });

      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Navigation observer setup failed:', error);
    }
  }

  private setupPaintObserver(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'paint') {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime;
              this.logMetric('FCP', this.metrics.fcp);
            }
          }
        });
      });

      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Paint observer setup failed:', error);
    }
  }

  private logMetric(name: string, value: number): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${name}: ${value.toFixed(2)}ms`);
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public calculateScore(): number {
    const scores = {
      lcp: this.calculateLCPScore(),
      fid: this.calculateFIDScore(),
      cls: this.calculateCLSScore(),
      fcp: this.calculateFCPScore(),
      tbt: this.calculateTBTScore(),
    };

    return (
      Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length
    );
  }

  private calculateLCPScore(): number {
    if (this.metrics.lcp <= 2500) return 100;
    if (this.metrics.lcp <= 4000) return 75;
    if (this.metrics.lcp <= 6000) return 50;
    return 25;
  }

  private calculateFIDScore(): number {
    if (this.metrics.fid <= 100) return 100;
    if (this.metrics.fid <= 300) return 75;
    if (this.metrics.fid <= 500) return 50;
    return 25;
  }

  private calculateCLSScore(): number {
    if (this.metrics.cls <= 0.1) return 100;
    if (this.metrics.cls <= 0.25) return 75;
    if (this.metrics.cls <= 0.5) return 50;
    return 25;
  }

  private calculateFCPScore(): number {
    if (this.metrics.fcp <= 1800) return 100;
    if (this.metrics.fcp <= 3000) return 75;
    if (this.metrics.fcp <= 5000) return 50;
    return 25;
  }

  private calculateTBTScore(): number {
    if (this.metrics.tbt <= 200) return 100;
    if (this.metrics.tbt <= 600) return 75;
    if (this.metrics.tbt <= 1000) return 50;
    return 25;
  }

  public getGrade(): 'A' | 'B' | 'C' | 'D' | 'F' {
    const score = this.calculateScore();
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  public getRecommendations(): string[] {
    const recommendations: string[] = [];
    const metrics = this.getMetrics();

    if (metrics.lcp > 2500) {
      recommendations.push(
        'Optimize Largest Contentful Paint: Compress images, use WebP format, implement lazy loading',
      );
    }

    if (metrics.fid > 100) {
      recommendations.push(
        'Reduce First Input Delay: Minimize JavaScript execution, split long tasks, optimize event handlers',
      );
    }

    if (metrics.cls > 0.1) {
      recommendations.push(
        'Improve Cumulative Layout Shift: Set image dimensions, optimize font loading, avoid dynamic content insertion',
      );
    }

    if (metrics.fcp > 1800) {
      recommendations.push(
        'Speed up First Contentful Paint: Optimize critical rendering path, reduce server response time',
      );
    }

    if (metrics.ttfb > 600) {
      recommendations.push(
        'Reduce Time to First Byte: Optimize server performance, use CDN, implement caching',
      );
    }

    return recommendations;
  }

  public generateReport(): PerformanceReport {
    return {
      timestamp: Date.now(),
      metrics: this.getMetrics(),
      score: this.calculateScore(),
      grade: this.getGrade(),
      recommendations: this.getRecommendations(),
    };
  }

  public disconnect(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.isInitialized = false;
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export for use in components
export default performanceMonitor;
