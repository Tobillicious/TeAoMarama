import type { ContentItem } from './content-indexer';

// Performance optimization utilities for content loading and caching
export class ContentPerformanceOptimizer {
  private static instance: ContentPerformanceOptimizer;
  private contentCache = new Map<string, ContentItem[]>();
  private searchCache = new Map<string, ContentItem[]>();
  private filterCache = new Map<string, ContentItem[]>();
  private readonly CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes
  private cacheTimestamps = new Map<string, number>();

  static getInstance(): ContentPerformanceOptimizer {
    if (!ContentPerformanceOptimizer.instance) {
      ContentPerformanceOptimizer.instance = new ContentPerformanceOptimizer();
    }
    return ContentPerformanceOptimizer.instance;
  }

  // Cache content with timestamp
  private setCache(key: string, data: ContentItem[]): void {
    this.contentCache.set(key, data);
    this.cacheTimestamps.set(key, Date.now());
  }

  // Get cached content if not expired
  private getCache(key: string): ContentItem[] | null {
    const timestamp = this.cacheTimestamps.get(key);
    if (!timestamp || Date.now() - timestamp > this.CACHE_EXPIRY) {
      this.contentCache.delete(key);
      this.cacheTimestamps.delete(key);
      return null;
    }
    return this.contentCache.get(key) || null;
  }

  // Optimized content loading with caching
  async loadContentWithCache(loader: () => Promise<ContentItem[]>): Promise<ContentItem[]> {
    const cacheKey = 'all-content';
    const cached = this.getCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const content = await loader();
      this.setCache(cacheKey, content);
      return content;
    } catch (error) {
      console.error('Error loading content:', error);
      return [];
    }
  }

  // Optimized search with caching
  searchWithCache(content: ContentItem[], query: string): ContentItem[] {
    const cacheKey = `search-${query}`;
    const cached = this.searchCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const results = this.performSearch(content, query);
    this.searchCache.set(cacheKey, results);
    
    // Limit search cache size
    if (this.searchCache.size > 100) {
      const firstKey = this.searchCache.keys().next().value;
      this.searchCache.delete(firstKey);
    }
    
    return results;
  }

  // Optimized filtering with caching
  filterWithCache(content: ContentItem[], filterType: string, filterValue: string): ContentItem[] {
    const cacheKey = `${filterType}-${filterValue}`;
    const cached = this.filterCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const results = this.performFilter(content, filterType, filterValue);
    this.filterCache.set(cacheKey, results);
    
    // Limit filter cache size
    if (this.filterCache.size > 50) {
      const firstKey = this.filterCache.keys().next().value;
      this.filterCache.delete(firstKey);
    }
    
    return results;
  }

  // Perform search with debouncing
  private performSearch(content: ContentItem[], query: string): ContentItem[] {
    if (!query.trim()) return content;
    
    const searchTerm = query.toLowerCase();
    return content.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.subject.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      (item.culturalContext && item.culturalContext.toLowerCase().includes(searchTerm)) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }

  // Perform filtering
  private performFilter(content: ContentItem[], filterType: string, filterValue: string): ContentItem[] {
    if (filterValue === 'all') return content;
    
    switch (filterType) {
      case 'category':
        return content.filter(item => item.category === filterValue);
      case 'subject':
        return content.filter(item => item.subject === filterValue);
      case 'type':
        return content.filter(item => item.type === filterValue);
      default:
        return content;
    }
  }

  // Clear all caches
  clearCache(): void {
    this.contentCache.clear();
    this.searchCache.clear();
    this.filterCache.clear();
    this.cacheTimestamps.clear();
  }

  // Get cache statistics
  getCacheStats(): { contentCache: number; searchCache: number; filterCache: number } {
    return {
      contentCache: this.contentCache.size,
      searchCache: this.searchCache.size,
      filterCache: this.filterCache.size
    };
  }
}

// Debounce utility for search
export function debounce<T extends (...args: unknown[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Virtual scrolling utility for large content lists
export class VirtualScroller {
  private containerHeight: number = 0;
  private itemHeight: number = 0;
  private scrollTop: number = 0;
  private totalItems: number = 0;

  constructor(containerHeight: number, itemHeight: number) {
    this.containerHeight = containerHeight;
    this.itemHeight = itemHeight;
  }

  updateScroll(scrollTop: number): void {
    this.scrollTop = scrollTop;
  }

  getVisibleRange(): { start: number; end: number } {
    const start = Math.floor(this.scrollTop / this.itemHeight);
    const end = Math.min(
      start + Math.ceil(this.containerHeight / this.itemHeight) + 1,
      this.totalItems
    );
    return { start, end };
  }

  setTotalItems(totalItems: number): void {
    this.totalItems = totalItems;
  }

  getTotalHeight(): number {
    return this.totalItems * this.itemHeight;
  }
}

// Image lazy loading utility
export class ImageLazyLoader {
  private observer: IntersectionObserver;
  private loadedImages = new Set<string>();

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src && !this.loadedImages.has(src)) {
              img.src = src;
              img.classList.remove('lazy');
              this.loadedImages.add(src);
              this.observer.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );
  }

  observe(img: HTMLImageElement): void {
    this.observer.observe(img);
  }

  unobserve(img: HTMLImageElement): void {
    this.observer.unobserve(img);
  }

  disconnect(): void {
    this.observer.disconnect();
  }
}

// Bundle size optimization utilities
export const bundleOptimizer = {
  // Preload critical resources
  preloadCriticalResources: () => {
    const criticalResources = [
      '/src/components/UnifiedContentDiscovery.tsx',
      '/src/components/ContentPreviewModal.tsx',
      '/src/utils/content-indexer.tsx'
    ];

    criticalResources.forEach(resource => {
  const link = document.createElement('link');
  link.rel = 'preload';
      link.href = resource;
      link.as = 'script';
  document.head.appendChild(link);
    });
  },

  // Prefetch non-critical resources
  prefetchResources: () => {
    const nonCriticalResources = [
      '/src/components/TeKeteAkoResourceExplorer.tsx',
      '/src/components/ProfessionalLessonTemplate.tsx'
    ];

    // Prefetch after initial load
    setTimeout(() => {
      nonCriticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        link.as = 'script';
        document.head.appendChild(link);
      });
    }, 2000);
  }
};

// Performance monitoring
export // // // const performanceMonitor = {
  measureLCP: () => {
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP monitoring not supported:', error);
    }
  },

  measureFID: () => {
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID monitoring not supported:', error);
    }
  },

  measureCLS: () => {
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          console.log('CLS:', entry.value);
        });
      }).observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS monitoring not supported:', error);
    }
  }
};

// Memory optimization hook
export // // // const useMemoryOptimization = () => {
  const optimizer = ContentPerformanceOptimizer.getInstance();
  
  return {
    clearCache: () => optimizer.clearCache(),
    getCacheStats: () => optimizer.getCacheStats(),
    preloadCriticalResources: bundleOptimizer.preloadCriticalResources,
    prefetchResources: bundleOptimizer.prefetchResources
  };
};

// Service worker registration
export // // // const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  }
};