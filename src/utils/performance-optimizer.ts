/**
 * Performance Optimization Utilities
 * Lightweight performance monitoring and optimization
 */

// Memory optimization hook
export const useMemoryOptimization = () => {
  // Simple memory cleanup
  const cleanup = () => {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      // Force garbage collection if available
      if (window.gc) {
        window.gc();
      }
    }
  };

  return { cleanup };
};

// Performance monitoring
export const performanceMonitor = {
  // Measure component render time
  measureRender: (componentName: string, startTime: number) => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    if (renderTime > 100) {
      // Log slow renders
      console.warn(`🐌 Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`);
    }

    return renderTime;
  },

  // Measure API calls
  measureAPI: async (apiName: string, apiCall: () => Promise<any>) => {
    const startTime = performance.now();
    try {
      const result = await apiCall();
      const endTime = performance.now();
      const duration = endTime - startTime;

      if (duration > 1000) {
        // Log slow API calls
        console.warn(`🐌 Slow API: ${apiName} took ${duration.toFixed(2)}ms`);
      }

      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.error(`❌ API Error: ${apiName} failed after ${duration.toFixed(2)}ms`, error);
      throw error;
    }
  },

  // Get performance metrics
  getMetrics: () => {
    if (typeof window === 'undefined') return null;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    return {
      loadTime: navigation?.loadEventEnd - navigation?.loadEventStart,
      domContentLoaded:
        navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
      firstPaint: paint.find((entry) => entry.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find((entry) => entry.name === 'first-contentful-paint')
        ?.startTime,
    };
  },
};

// Service worker registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('✅ Service Worker registered:', registration);
      return registration;
    } catch (error) {
      console.warn('⚠️ Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

// Image optimization
export const optimizeImage = (src: string, width?: number, height?: number) => {
  // Simple image optimization - in production, use a CDN
  if (width && height) {
    return `${src}?w=${width}&h=${height}&q=80`;
  }
  return src;
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
