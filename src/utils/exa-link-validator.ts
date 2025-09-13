/**
 * EXA.AI LINK VALIDATOR
 *
 * Validates and finds working external links for teaching resources
 * using Exa.ai's search capabilities designed for LLM integration
 */

import { Exa } from 'exa-js';

export interface LinkValidationResult {
  originalUrl: string;
  workingUrl?: string;
  status: 'working' | 'broken' | 'replaced' | 'not_found';
  title?: string;
  description?: string;
  source?: string;
  lastChecked: string;
}

export interface ResourceLink {
  url: string;
  title: string;
  description: string;
  type: 'government' | 'educational' | 'cultural' | 'archive' | 'museum' | 'other';
}

export class ExaLinkValidator {
  private exa: Exa;
  private cache: Map<string, LinkValidationResult> = new Map();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  constructor(apiKey?: string) {
    const key = apiKey || process.env.EXA_API_KEY;
    if (!key) {
      console.warn('⚠️ Exa API key not found. Link validation will be limited.');
    }
    this.exa = new Exa(key);
  }

  /**
   * Validate a single URL and find working alternatives if broken
   */
  async validateUrl(url: string): Promise<LinkValidationResult> {
    // Check cache first
    const cached = this.cache.get(url);
    if (cached && this.isCacheValid(cached.lastChecked)) {
      return cached;
    }

    try {
      // First, try to check if the original URL works
      const isWorking = await this.checkUrlStatus(url);

      if (isWorking) {
        const result: LinkValidationResult = {
          originalUrl: url,
          workingUrl: url,
          status: 'working',
          lastChecked: new Date().toISOString(),
        };
        this.cache.set(url, result);
        return result;
      }

      // If broken, try to find a working alternative
      const alternative = await this.findAlternativeUrl(url);

      const result: LinkValidationResult = {
        originalUrl: url,
        workingUrl: alternative?.url,
        status: alternative ? 'replaced' : 'broken',
        title: alternative?.title,
        description: alternative?.description,
        source: alternative?.type,
        lastChecked: new Date().toISOString(),
      };

      this.cache.set(url, result);
      return result;
    } catch (error) {
      console.error(`Error validating URL ${url}:`, error);
      const result: LinkValidationResult = {
        originalUrl: url,
        status: 'not_found',
        lastChecked: new Date().toISOString(),
      };
      this.cache.set(url, result);
      return result;
    }
  }

  /**
   * Find working alternatives for broken URLs using Exa.ai search
   */
  private async findAlternativeUrl(brokenUrl: string): Promise<ResourceLink | null> {
    try {
      // Extract key terms from the URL for search
      const searchTerms = this.extractSearchTerms(brokenUrl);

      // Search for alternatives using Exa.ai
      const searchResults = await this.exa.searchAndContents(searchTerms, {
        numResults: 5,
        useAutoprompt: true,
        type: 'neural',
      });

      // Find the best alternative
      for (const result of searchResults.results) {
        if (result.url && (await this.checkUrlStatus(result.url))) {
          return {
            url: result.url,
            title: result.title || 'Alternative Resource',
            description: result.text?.substring(0, 200) || 'Educational resource',
            type: this.classifyUrlType(result.url),
          };
        }
      }

      return null;
    } catch (error) {
      console.error('Error finding alternative URL:', error);
      return null;
    }
  }

  /**
   * Extract search terms from a URL for finding alternatives
   */
  private extractSearchTerms(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter((part) => part.length > 0);
      const domain = urlObj.hostname;

      // Create search terms based on domain and path
      let searchTerms = '';

      if (domain.includes('archives.govt.nz')) {
        searchTerms = 'Archives New Zealand Te Tiriti o Waitangi Treaty documents';
      } else if (domain.includes('doc.govt.nz')) {
        searchTerms = 'Department of Conservation New Zealand wildlife conservation';
      } else if (domain.includes('stats.govt.nz')) {
        searchTerms = 'Statistics New Zealand census data population';
      } else if (domain.includes('tepapa.govt.nz')) {
        searchTerms = 'Te Papa Museum New Zealand culture history';
      } else if (domain.includes('nzhistory.govt.nz')) {
        searchTerms = 'New Zealand history Te Tiriti Treaty Waitangi';
      } else if (domain.includes('education.govt.nz')) {
        searchTerms = 'New Zealand education curriculum resources';
      } else {
        // Generic search based on path
        searchTerms = pathParts.join(' ') + ' New Zealand education';
      }

      return searchTerms;
    } catch (error) {
      return 'New Zealand education resources';
    }
  }

  /**
   * Classify URL type based on domain
   */
  private classifyUrlType(url: string): ResourceLink['type'] {
    const domain = url.toLowerCase();

    if (domain.includes('govt.nz') || domain.includes('government')) {
      return 'government';
    } else if (
      domain.includes('education') ||
      domain.includes('school') ||
      domain.includes('university')
    ) {
      return 'educational';
    } else if (
      domain.includes('museum') ||
      domain.includes('tepapa') ||
      domain.includes('cultural')
    ) {
      return 'cultural';
    } else if (domain.includes('archive') || domain.includes('history')) {
      return 'archive';
    } else if (domain.includes('museum')) {
      return 'museum';
    } else {
      return 'other';
    }
  }

  /**
   * Check if a URL is accessible
   */
  private async checkUrlStatus(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        timeout: 5000,
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if cache entry is still valid
   */
  private isCacheValid(lastChecked: string): boolean {
    const lastCheckedTime = new Date(lastChecked).getTime();
    const now = Date.now();
    return now - lastCheckedTime < this.CACHE_DURATION;
  }

  /**
   * Validate multiple URLs in batch
   */
  async validateUrls(urls: string[]): Promise<LinkValidationResult[]> {
    const results = await Promise.all(urls.map((url) => this.validateUrl(url)));
    return results;
  }

  /**
   * Get specific NZ government and educational resources
   */
  async findNZResources(query: string, type?: ResourceLink['type']): Promise<ResourceLink[]> {
    try {
      const searchQuery = `${query} site:govt.nz OR site:education.govt.nz OR site:tepapa.govt.nz OR site:doc.govt.nz OR site:stats.govt.nz`;

      const searchResults = await this.exa.searchAndContents(searchQuery, {
        numResults: 10,
        useAutoprompt: true,
        type: 'neural',
      });

      const resources: ResourceLink[] = [];

      for (const result of searchResults.results) {
        if (result.url && (await this.checkUrlStatus(result.url))) {
          const resourceType = this.classifyUrlType(result.url);

          if (!type || resourceType === type) {
            resources.push({
              url: result.url,
              title: result.title || 'New Zealand Resource',
              description:
                result.text?.substring(0, 200) || 'Educational resource from New Zealand',
              type: resourceType,
            });
          }
        }
      }

      return resources;
    } catch (error) {
      console.error('Error finding NZ resources:', error);
      return [];
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { total: number; valid: number; expired: number } {
    const now = Date.now();
    let valid = 0;
    let expired = 0;

    for (const result of this.cache.values()) {
      if (this.isCacheValid(result.lastChecked)) {
        valid++;
      } else {
        expired++;
      }
    }

    return {
      total: this.cache.size,
      valid,
      expired,
    };
  }

  /**
   * Clear expired cache entries
   */
  clearExpiredCache(): void {
    const now = Date.now();
    for (const [url, result] of this.cache.entries()) {
      if (!this.isCacheValid(result.lastChecked)) {
        this.cache.delete(url);
      }
    }
  }
}

// Export singleton instance
const exaLinkValidator = new ExaLinkValidator();
export { exaLinkValidator };

// Export types for external use
export type { LinkValidationResult, ResourceLink };
