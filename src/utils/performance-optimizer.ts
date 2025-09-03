// Performance Optimization Utilities - Te Kura o TeAoMarama

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Lazy loading utility
export const createLazyLoader = <T extends React.ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) => {
  return React.lazy(loader);
};

// Debounce hook for search and input optimization
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Virtual scrolling for large lists
export const useVirtualScrolling = (
  items: any[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return {
      items: items.slice(startIndex, endIndex),
      startIndex,
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight
    };
  }, [items, itemHeight, containerHeight, scrollTop]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return { visibleItems, handleScroll };
};

// Image lazy loading with intersection observer
export const useImageLazyLoading = () => {
  const [ref, setRef] = useState<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref]);

  const imgRef = useCallback((node: HTMLImageElement) => {
    if (node) setRef(node);
  }, []);

  return { imgRef, isLoaded, isInView, setIsLoaded };
};

// Bundle splitting configuration
export const bundleSplitConfig = {
  chunks: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      chunks: 'all',
      priority: 10
    },
    common: {
      name: 'common',
      minChunks: 2,
      priority: 5,
      reuseExistingChunk: true
    },
    cultural: {
      test: /cultural/i,
      name: 'cultural-modules',
      chunks: 'all',
      priority: 8
    },
    assessment: {
      test: /assessment/i,
      name: 'assessment-system',
      chunks: 'all',
      priority: 8
    }
  }
};

// Memoization helper for expensive calculations
export const useMemoizedCalculation = <T, P extends any[]>(
  fn: (...args: P) => T,
  deps: P
): T => {
  return useMemo(() => fn(...deps), deps);
};

// Resource preloading
export const preloadResource = (href: string, as: string = 'script') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Critical CSS inlining utility
export const inlineCriticalCSS = (css: string) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.insertBefore(style, document.head.firstChild);
};

// Service Worker registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      return registration;
    } catch (error) {
      console.log('SW registration failed: ', error);
      return null;
    }
  }
  return null;
};

// Performance monitoring
export const performanceMonitor = {
  measureLCP: () => {
    return new Promise((resolve) => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
  },

  measureFID: () => {
    return new Promise((resolve) => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const firstEntry = entries[0] as any; // Type assertion for performance entry
        resolve(firstEntry.processingStart - firstEntry.startTime);
      }).observe({ entryTypes: ['first-input'] });
    });
  },

  measureCLS: () => {
    return new Promise((resolve) => {
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as any; // Type assertion for layout shift entry
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        resolve(clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    });
  }
};

// Code splitting helpers
export const lazyLoadComponent = (importFn: () => Promise<any>) => {
  return React.lazy(() => importFn().catch(() => ({ 
    default: () => React.createElement('div', null, 'Component failed to load')
  })));
};

// Memory usage optimization
export const useMemoryOptimization = () => {
  const cleanup = useCallback(() => {
    // Clear unnecessary data from memory
    if (window.performance && (window.performance as any).memory) {
      const memory = (window.performance as any).memory;
      if (memory.usedJSHeapSize / memory.totalJSHeapSize > 0.8) {
        // Trigger garbage collection if available
        if ('gc' in window && typeof (window as any).gc === 'function') {
          (window as any).gc();
        }
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(cleanup, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [cleanup]);

  return cleanup;
};

export default {
  useDebounce,
  useVirtualScrolling,
  useImageLazyLoading,
  useMemoizedCalculation,
  performanceMonitor,
  registerServiceWorker,
  preloadResource,
  useMemoryOptimization
};