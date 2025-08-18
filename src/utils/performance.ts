// Performance optimization utilities for Warp 9 speed

// Global gtag interface declaration
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      eventName: string,
      parameters?: Record<string, unknown>,
    ) => void;
  }
}

export interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  fmp: number;
}

// Extended PerformanceEntry interface for first-input events
interface FirstInputPerformanceEntry extends PerformanceEntry {
  processingStart: number;
}

// Layout shift performance entry interface
interface LayoutShiftPerformanceEntry extends PerformanceEntry {
  value: number;
}

export interface PerformanceObserver {
  disconnect(): void;
  observe(options: PerformanceObserverInit): void;
}

// Core Web Vitals monitoring
export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initObservers();
  }

  private initObservers() {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    // First Contentful Paint
    this.observeMetric('paint', (entry) => {
      if (entry.name === 'first-contentful-paint') {
        this.metrics.fcp = entry.startTime;
        this.logMetric('FCP', entry.startTime);
      }
    });

    // Largest Contentful Paint
    this.observeMetric('largest-contentful-paint', (entry) => {
      this.metrics.lcp = entry.startTime;
      this.logMetric('LCP', entry.startTime);
    });

    // First Input Delay
    this.observeMetric('first-input', (entry) => {
      const firstInputEntry = entry as FirstInputPerformanceEntry;
      this.metrics.fid = firstInputEntry.processingStart - firstInputEntry.startTime;
      this.logMetric('FID', this.metrics.fid);
    });

    // Cumulative Layout Shift
    this.observeMetric('layout-shift', (entry) => {
      if (!this.metrics.cls) this.metrics.cls = 0;
      const layoutShiftEntry = entry as LayoutShiftPerformanceEntry;
      this.metrics.cls += layoutShiftEntry.value;
      this.logMetric('CLS', this.metrics.cls);
    });

    // Time to First Byte
    this.observeMetric('navigation', (entry) => {
      const navEntry = entry as PerformanceNavigationTiming;
      this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
      this.logMetric('TTFB', this.metrics.ttfb);
    });
  }

  private observeMetric(entryType: string, callback: (entry: PerformanceEntry) => void) {
    try {
      const observer = new window.PerformanceObserver((list: PerformanceObserverEntryList) => {
        for (const entry of list.getEntries()) {
          callback(entry);
        }
      });
      observer.observe({ entryTypes: [entryType] });
      this.observers.push(observer);
    } catch (error) {
      console.warn(`Failed to observe ${entryType}:`, error);
    }
  }

  private logMetric(name: string, value: number) {
    console.log(`🚀 ${name}: ${value.toFixed(2)}ms`);

    // Send to analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        page_location: window.location.href,
      });
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public disconnect() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

// Lazy loading utility
export class LazyLoader {
  private static instance: LazyLoader;
  private intersectionObserver: IntersectionObserver | null = null;

  private constructor() {
    this.initIntersectionObserver();
  }

  public static getInstance(): LazyLoader {
    if (!LazyLoader.instance) {
      LazyLoader.instance = new LazyLoader();
    }
    return LazyLoader.instance;
  }

  private initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported');
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            this.loadElement(target);
            this.intersectionObserver?.unobserve(target);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      },
    );
  }

  private loadElement(element: HTMLElement) {
    const src = element.getAttribute('data-src');
    const srcset = element.getAttribute('data-srcset');

    if (src) {
      if (element.tagName === 'IMG') {
        (element as HTMLImageElement).src = src;
        if (srcset) {
          (element as HTMLImageElement).srcset = srcset;
        }
      } else if (element.tagName === 'VIDEO') {
        (element as HTMLVideoElement).src = src;
      }
    }

    element.classList.remove('lazy');
    element.classList.add('loaded');
  }

  public observe(element: HTMLElement) {
    if (this.intersectionObserver) {
      this.intersectionObserver.observe(element);
    }
  }

  public unobserve(element: HTMLElement) {
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(element);
    }
  }
}

// Resource preloading utility
export class ResourcePreloader {
  private static preloadedResources = new Set<string>();

  public static preloadImage(src: string): Promise<void> {
    if (this.preloadedResources.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  public static preloadScript(src: string): Promise<void> {
    if (this.preloadedResources.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  public static preloadStylesheet(href: string): Promise<void> {
    if (this.preloadedResources.has(href)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => {
        this.preloadedResources.add(href);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }
}

// Memory management utility
export class MemoryManager {
  private static instance: MemoryManager;
  private cleanupTasks: (() => void)[] = [];

  private constructor() {
    this.setupMemoryMonitoring();
  }

  public static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  private setupMemoryMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (
          performance as Performance & {
            memory?: { usedJSHeapSize?: number; totalJSHeapSize?: number };
          }
        ).memory;
        const usedMB = memory?.usedJSHeapSize ? memory.usedJSHeapSize / 1024 / 1024 : 0;
        const totalMB = memory?.totalJSHeapSize ? memory.totalJSHeapSize / 1024 / 1024 : 0;

        if (usedMB > totalMB * 0.8) {
          console.warn('High memory usage detected:', usedMB.toFixed(2), 'MB');
          this.cleanup();
        }
      }, 30000); // Check every 30 seconds
    }
  }

  public addCleanupTask(task: () => void) {
    this.cleanupTasks.push(task);
  }

  public cleanup() {
    console.log('🧹 Performing memory cleanup...');
    this.cleanupTasks.forEach((task) => {
      try {
        task();
      } catch (error) {
        console.error('Cleanup task failed:', error);
      }
    });
    this.cleanupTasks = [];
  }
}

// Performance optimization hooks
export const usePerformanceOptimization = () => {
  const preloadCriticalResources = () => {
    // Preload critical images
    ResourcePreloader.preloadImage('/vite.svg');

    // Preload critical stylesheets
    ResourcePreloader.preloadStylesheet('/src/styles/critical.css');
  };

  const optimizeImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const lazyLoader = LazyLoader.getInstance();

    images.forEach((img) => {
      lazyLoader.observe(img as HTMLElement);
    });
  };

  const setupMemoryCleanup = () => {
    const memoryManager = MemoryManager.getInstance();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      memoryManager.cleanup();
    });
  };

  return {
    preloadCriticalResources,
    optimizeImages,
    setupMemoryCleanup,
  };
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  const monitor = new PerformanceMonitor();

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    monitor.disconnect();
  });

  return monitor;
};

// Performance analytics
export const sendPerformanceData = (metrics: Partial<PerformanceMetrics>) => {
  // Send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'performance_data', {
      ...metrics,
      page_location: window.location.href,
      timestamp: Date.now(),
    });
  }

  // Log to console for development
  console.log('📊 Performance Metrics:', metrics);
};
