/**
 * Performance Cache Manager for Te Kete Ako
 * Optimized for Chromebook deployment with sub-2-second load times
 * Provides intelligent caching for GraphRAG queries and resource discovery
 */

class PerformanceCacheManager {
    constructor(options = {}) {
        this.config = {
            maxCacheSize: options.maxCacheSize || 50, // Max cached queries
            cacheExpiry: options.cacheExpiry || 30 * 60 * 1000, // 30 minutes
            compressionEnabled: options.compressionEnabled !== false,
            offlineMode: options.offlineMode || false,
            debugMode: options.debugMode || false
        };
        
        this.cache = new Map();
        this.accessTimes = new Map();
        this.compressionSupported = this.checkCompressionSupport();
        
        // Performance metrics tracking
        this.metrics = {
            cacheHits: 0,
            cacheMisses: 0,
            totalQueries: 0,
            averageResponseTime: 0,
            compressionRatio: 0
        };
        
        this.initializeCache();
        this.startMaintenanceTimer();
    }

    /**
     * Initialize cache from localStorage if available
     */
    initializeCache() {
        try {
            const savedCache = localStorage.getItem('tkako_query_cache');
            const savedMetrics = localStorage.getItem('tkako_metrics');
            
            if (savedCache) {
                const cacheData = JSON.parse(savedCache);
                const now = Date.now();
                
                // Restore non-expired cache entries
                Object.entries(cacheData).forEach(([key, entry]) => {
                    if (now - entry.timestamp < this.config.cacheExpiry) {
                        this.cache.set(key, entry);
                        this.accessTimes.set(key, entry.timestamp);
                    }
                });
            }
            
            if (savedMetrics) {
                this.metrics = { ...this.metrics, ...JSON.parse(savedMetrics) };
            }
            
            if (this.config.debugMode) {
                console.log(`📦 Cache initialized with ${this.cache.size} entries`);
            }
        } catch (error) {
            console.warn('Cache initialization failed:', error);
        }
    }

    /**
     * Generate cache key for GraphRAG queries
     */
    generateCacheKey(query, options = {}) {
        const keyObject = {
            query: query.toLowerCase().trim(),
            matchCount: options.match_count || 5,
            culturalContext: options.cultural_context || 'te_ao_maori',
            threshold: options.threshold || 0.6
        };
        
        return btoa(JSON.stringify(keyObject)).replace(/[+/=]/g, '');
    }

    /**
     * Check if compression is supported
     */
    checkCompressionSupport() {
        return typeof CompressionStream !== 'undefined' && 
               typeof DecompressionStream !== 'undefined';
    }

    /**
     * Compress data using streams (if supported)
     */
    async compressData(data) {
        if (!this.compressionSupported || !this.config.compressionEnabled) {
            return { compressed: false, data: JSON.stringify(data) };
        }

        try {
            const jsonString = JSON.stringify(data);
            const stream = new CompressionStream('gzip');
            const writer = stream.writable.getWriter();
            const reader = stream.readable.getReader();
            
            writer.write(new TextEncoder().encode(jsonString));
            writer.close();
            
            const chunks = [];
            let result = await reader.read();
            while (!result.done) {
                chunks.push(result.value);
                result = await reader.read();
            }
            
            const compressedData = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
            let offset = 0;
            chunks.forEach(chunk => {
                compressedData.set(chunk, offset);
                offset += chunk.length;
            });
            
            const compressionRatio = compressedData.length / jsonString.length;
            this.metrics.compressionRatio = (this.metrics.compressionRatio + compressionRatio) / 2;
            
            return {
                compressed: true,
                data: Array.from(compressedData),
                originalSize: jsonString.length,
                compressedSize: compressedData.length
            };
        } catch (error) {
            console.warn('Compression failed, storing uncompressed:', error);
            return { compressed: false, data: JSON.stringify(data) };
        }
    }

    /**
     * Decompress data using streams
     */
    async decompressData(compressedEntry) {
        if (!compressedEntry.compressed) {
            return JSON.parse(compressedEntry.data);
        }

        try {
            const compressedArray = new Uint8Array(compressedEntry.data);
            const stream = new DecompressionStream('gzip');
            const writer = stream.writable.getWriter();
            const reader = stream.readable.getReader();
            
            writer.write(compressedArray);
            writer.close();
            
            const chunks = [];
            let result = await reader.read();
            while (!result.done) {
                chunks.push(result.value);
                result = await reader.read();
            }
            
            const decompressed = new TextDecoder().decode(
                new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0))
                    .map((_, i) => chunks.reduce((acc, chunk) => [...acc, ...chunk], [])[i])
            );
            
            return JSON.parse(decompressed);
        } catch (error) {
            console.error('Decompression failed:', error);
            throw error;
        }
    }

    /**
     * Cache GraphRAG query result with intelligent storage optimization
     */
    async cacheQuery(query, options, result) {
        const cacheKey = this.generateCacheKey(query, options);
        const timestamp = Date.now();
        
        try {
            const compressedResult = await this.compressData(result);
            
            const cacheEntry = {
                query,
                options,
                result: compressedResult,
                timestamp,
                hits: 0,
                responseTime: result.responseTime || 0
            };
            
            // Ensure cache doesn't exceed maximum size
            if (this.cache.size >= this.config.maxCacheSize) {
                this.evictLeastRecentlyUsed();
            }
            
            this.cache.set(cacheKey, cacheEntry);
            this.accessTimes.set(cacheKey, timestamp);
            
            // Persist to localStorage for offline access
            this.persistCache();
            
            if (this.config.debugMode) {
                console.log(`💾 Cached query: ${query.substring(0, 50)}...`);
            }
        } catch (error) {
            console.warn('Failed to cache query:', error);
        }
    }

    /**
     * Retrieve cached query result
     */
    async getCachedQuery(query, options) {
        const cacheKey = this.generateCacheKey(query, options);
        const entry = this.cache.get(cacheKey);
        
        if (!entry) {
            this.metrics.cacheMisses++;
            return null;
        }
        
        const now = Date.now();
        
        // Check if entry has expired
        if (now - entry.timestamp > this.config.cacheExpiry) {
            this.cache.delete(cacheKey);
            this.accessTimes.delete(cacheKey);
            this.metrics.cacheMisses++;
            return null;
        }
        
        // Update access time and hit count
        entry.hits++;
        this.accessTimes.set(cacheKey, now);
        this.metrics.cacheHits++;
        
        try {
            const decompressedResult = await this.decompressData(entry.result);
            
            if (this.config.debugMode) {
                console.log(`🎯 Cache hit: ${query.substring(0, 50)}...`);
            }
            
            return {
                ...decompressedResult,
                fromCache: true,
                cacheHits: entry.hits,
                originalTimestamp: entry.timestamp
            };
        } catch (error) {
            console.warn('Failed to decompress cached result:', error);
            this.cache.delete(cacheKey);
            this.accessTimes.delete(cacheKey);
            return null;
        }
    }

    /**
     * Evict least recently used cache entries
     */
    evictLeastRecentlyUsed() {
        if (this.cache.size === 0) return;
        
        let oldestKey = null;
        let oldestTime = Infinity;
        
        for (const [key, time] of this.accessTimes.entries()) {
            if (time < oldestTime) {
                oldestTime = time;
                oldestKey = key;
            }
        }
        
        if (oldestKey) {
            this.cache.delete(oldestKey);
            this.accessTimes.delete(oldestKey);
            
            if (this.config.debugMode) {
                console.log(`🗑️ Evicted cache entry: ${oldestKey}`);
            }
        }
    }

    /**
     * Persist cache to localStorage
     */
    persistCache() {
        try {
            const cacheObject = {};
            for (const [key, entry] of this.cache.entries()) {
                cacheObject[key] = entry;
            }
            
            localStorage.setItem('tkako_query_cache', JSON.stringify(cacheObject));
            localStorage.setItem('tkako_metrics', JSON.stringify(this.metrics));
        } catch (error) {
            console.warn('Failed to persist cache:', error);
        }
    }

    /**
     * Clear all cached data
     */
    clearCache() {
        this.cache.clear();
        this.accessTimes.clear();
        localStorage.removeItem('tkako_query_cache');
        localStorage.removeItem('tkako_metrics');
        
        this.metrics = {
            cacheHits: 0,
            cacheMisses: 0,
            totalQueries: 0,
            averageResponseTime: 0,
            compressionRatio: 0
        };
        
        if (this.config.debugMode) {
            console.log('🧹 Cache cleared');
        }
    }

    /**
     * Get cache performance statistics
     */
    getPerformanceStats() {
        const hitRate = this.metrics.totalQueries > 0 
            ? (this.metrics.cacheHits / this.metrics.totalQueries) * 100 
            : 0;
            
        return {
            ...this.metrics,
            hitRate: Math.round(hitRate * 100) / 100,
            cacheSize: this.cache.size,
            maxCacheSize: this.config.maxCacheSize,
            compressionSupported: this.compressionSupported
        };
    }

    /**
     * Preload popular queries for offline access
     */
    async preloadPopularQueries() {
        const popularQueries = [
            { query: "Te Tiriti Waitangi resources", options: {} },
            { query: "Māori cultural resources", options: {} },
            { query: "New Zealand curriculum aligned lessons", options: {} },
            { query: "Year 8 social studies activities", options: {} },
            { query: "English writing activities", options: {} }
        ];

        const preloadPromises = popularQueries.map(async ({ query, options }) => {
            const cached = await this.getCachedQuery(query, options);
            if (!cached) {
                // Would normally fetch and cache, but for now just log
                if (this.config.debugMode) {
                    console.log(`🔄 Preloading popular query: ${query}`);
                }
            }
        });

        await Promise.all(preloadPromises);
    }

    /**
     * Start maintenance timer for cache cleanup
     */
    startMaintenanceTimer() {
        // Run maintenance every 10 minutes
        setInterval(() => {
            this.runMaintenance();
        }, 10 * 60 * 1000);
    }

    /**
     * Run maintenance tasks
     */
    runMaintenance() {
        const now = Date.now();
        let expiredCount = 0;

        // Remove expired entries
        for (const [key, entry] of this.cache.entries()) {
            if (now - entry.timestamp > this.config.cacheExpiry) {
                this.cache.delete(key);
                this.accessTimes.delete(key);
                expiredCount++;
            }
        }

        // Persist updated cache
        if (expiredCount > 0) {
            this.persistCache();
            
            if (this.config.debugMode) {
                console.log(`🧹 Maintenance: removed ${expiredCount} expired entries`);
            }
        }
    }

    /**
     * Update metrics after query completion
     */
    updateMetrics(responseTime) {
        this.metrics.totalQueries++;
        this.metrics.averageResponseTime = 
            (this.metrics.averageResponseTime * (this.metrics.totalQueries - 1) + responseTime) / this.metrics.totalQueries;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceCacheManager;
} else if (typeof window !== 'undefined') {
    window.PerformanceCacheManager = PerformanceCacheManager;
}