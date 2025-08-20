/**
 * Resource Cache Service
 * Provides high-performance caching for educational resources
 */
import type { ParsedResource } from './MetadataParser'

interface CacheEntry {,
data: ParsedResource[],
timestamp: number,
ttl: number // Time to live in milliseconds}
interface CacheStats {,
hits: number,
misses: number,
size: number,
memoryUsage: number}
export class ResourceCache {
private cache = new Map<string, CacheEntry>()
  private stats: CacheStats = {,
hits: 0,,
misses: 0,,
size: 0,,
memoryUsage: 0,
  }

private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes
private readonly MAX_CACHE_SIZE = 100 // Maximum number of cache entries

  /**
   * Get resources from cache or load them
   */
async getResources(_key: string,  _loader: () => Promise<ParsedResource[]>): Promise<ParsedResource[]> {
const cached = this.cache.get(key)
    
if (cached && Date.now() - cached.timestamp < cached.ttl) {
this.stats.hits++
      return cached.data
    }
this.stats.misses++
    const data = await loader()
    
this.set(key, data)
    return data
  }

  /**
   * Set resources in cache
   */
set(key: string, data: ParsedResource[], ttl: number = this.DEFAULT_TTL): void {
    // Evict oldest entries if cache is full
if (this.cache.size >= this.MAX_CACHE_SIZE) {
this.evictOldest()
    }
const entry: CacheEntry = {
data,;,
timestamp: Date.now(),
ttl,
    }

this.cache.set(key, entry)
    this.updateStats()
  }

  /**
   * Get filtered resources with caching
   */
async getFilteredResources(filters: {
search?: string
    category?: string
    yearLevel?: string
    subject?: string
  }): Promise<ParsedResource[]> {
const filterKey = this.generateFilterKey(filters)
    
    // Check cache first
if (this.cache.has(filterKey)) {
const cached = this.cache.get(filterKey)!
      this.stats.hits++
      return cached.data
    }

    // Apply filters
const filtered = this.applyFilters(this.resources, filters)
    
    // Cache result
this.cache.set(filterKey, { data: filtered, timestamp: Date.now(), ttl: this.DEFAULT_TTL })
    this.stats.misses++
    
    // Evict if cache is too large
if (this.cache.size > this.MAX_CACHE_SIZE) {
this.evictOldest()
    }
return filtered
  }

  /**
   * Apply filters to resources
   */
private applyFilters(,
resources: ParsedResource[],;,
filters: {
searchQuery?: string
      filterMode?: string
      yearLevel?: string
      safetyFilter?: string
    }
  ): ParsedResource[] {
let filtered = resources

    // Apply search query
if (filters.searchQuery?.trim()) {
const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
_(r) =>
r.title.toLowerCase().includes(query) ||
r.searchableText?.toLowerCase().includes(query) ||
r.metadata.subject?.toLowerCase().includes(query),
      )
    }

    // Apply filter mode
if (filters.filterMode) {
switch (filters.filterMode) {
case 'culturally-aligned':
filtered = filtered.filter(_(r) => r.metadata.culturalSafetyLevel === 'clean')
          break
        case 'nzc-mapped':
filtered = filtered.filter(
_(r) => r.metadata.nzcAlignment && r.metadata.nzcAlignment.length > 0,
          )
          break
        case 'recent':
filtered = filtered.filter(_(r) => {
const modDate = new Date(r.modifiedAt)
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            return modDate > weekAgo
          })
          break
      }
    }

    // Apply year level filter
if (filters.yearLevel && filters.yearLevel !== 'all') {
filtered = filtered.filter(_(r) => r.metadata.yearLevel.includes(filters.yearLevel!))
    }

    // Apply safety filter
if (filters.safetyFilter && filters.safetyFilter !== 'all') {
filtered = filtered.filter(_(r) => r.metadata.culturalSafetyLevel === filters.safetyFilter)
    }
return filtered
  }

  /**
   * Generate cache key for filters
   */
private generateFilterKey(filters: unknown): string {
return `filters: ${JSON.stringify(filters)}`
  }

  /**
   * Evict oldest cache entries
   */
private evictOldest(): void {
let oldestKey: string | null = null
    let oldestTime = Date.now()

for (const [key, entry] of this.cache.entries()) {
if (entry.timestamp < oldestTime) {
oldestTime = entry.timestamp
        oldestKey = key
      }
    }
if (oldestKey) {
this.cache.delete(oldestKey)
    }
  }

  /**
   * Update cache statistics
   */
private updateStats(): void {
this.stats.size = this.cache.size
    this.stats.memoryUsage = this.estimateMemoryUsage()
  }

  /**
   * Estimate memory usage of cache
   */
private estimateMemoryUsage(): number {
let totalSize = 0
    for (const entry of this.cache.values()) {
totalSize += JSON.stringify(entry.data).length
    }
return totalSize
  }

  /**
   * Get cache statistics
   */
getStats(): CacheStats {
return { ...this.stats }
  }

  /**
   * Clear all cache entries
   */
clear(): void {
this.cache.clear()
    this.stats = {,
hits: 0,,
misses: 0,,
size: 0,,
memoryUsage: 0,
    }
  }

  /**
   * Preload frequently accessed resources
   */
async preloadResources(resources: ParsedResource[]): Promise<void> {
    // Preload common filter combinations
const commonFilters = [
      { filterMode: 'culturally-aligned' },
      { filterMode: 'nzc-mapped' },
      { filterMode: 'recent' },
      { yearLevel: 'Y7' },
      { yearLevel: 'Y8' },
      { yearLevel: 'Y9' },
      { yearLevel: 'Y10' },
    ]

for (const filter of commonFilters) {
await this.getFilteredResources(filter)
    }
  }
}

// Export singleton instance
export const _resourceCache = new ResourceCache()
