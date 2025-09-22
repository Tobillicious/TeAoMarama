#!/usr/bin/env tsx

/**
 * Shared Knowledge Base
 *
 * Implements a unified memory system where all LLM agents can store,
 * retrieve, and share knowledge in a collaborative intelligence network.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  category: 'cultural' | 'technical' | 'pedagogical' | 'collaborative' | 'insight' | 'pattern';
  tags: string[];
  sourceAgent: string;
  contributors: string[];
  confidence: number; // 0-100
  culturalValidation: {
    validated: boolean;
    validatedBy?: string;
    validatedAt?: string;
    culturalSafetyScore: number; // 0-100
    tikangaCompliance: boolean;
    teReoIntegration: boolean;
  };
  qualityMetrics: {
    accuracy: number; // 0-100
    completeness: number; // 0-100
    relevance: number; // 0-100
    freshness: number; // 0-100
  };
  relationships: {
    relatedEntries: string[];
    dependencies: string[];
    supersedes?: string;
    supersededBy?: string;
  };
  usage: {
    accessCount: number;
    lastAccessed: string;
    usefulRatings: number;
    totalRatings: number;
  };
  createdAt: string;
  updatedAt: string;
  version: number;
}

interface KnowledgeQuery {
  searchTerms: string[];
  categories?: string[];
  tags?: string[];
  sourceAgents?: string[];
  minConfidence?: number;
  minCulturalSafety?: number;
  minQuality?: number;
  dateRange?: {
    from: string;
    to: string;
  };
  limit?: number;
}

interface CollectiveInsight {
  id: string;
  pattern: string;
  description: string;
  evidence: string[];
  confidence: number;
  discoveredBy: string[];
  applications: string[];
  culturalContext?: string;
  createdAt: string;
}

interface KnowledgeMetrics {
  totalEntries: number;
  entriesByCategory: Record<string, number>;
  entriesByAgent: Record<string, number>;
  averageConfidence: number;
  averageCulturalSafety: number;
  averageQuality: number;
  mostAccessedEntries: KnowledgeEntry[];
  emergingPatterns: CollectiveInsight[];
  culturalValidationRate: number;
  knowledgeGrowthRate: number;
}

class SharedKnowledgeBase {
  private knowledgeDir = join(process.cwd(), 'migration', 'shared-knowledge');
  private entriesFile = join(this.knowledgeDir, 'knowledge-entries.json');
  private insightsFile = join(this.knowledgeDir, 'collective-insights.json');
  private metricsFile = join(this.knowledgeDir, 'knowledge-metrics.json');
  private indexFile = join(this.knowledgeDir, 'search-index.json');

  constructor() {
    this.ensureKnowledgeDirectory();
  }

  async initializeKnowledgeBase(): Promise<void> {
    console.log('🧠 Initializing Shared Knowledge Base...\n');

    // Create initial knowledge entries
    await this.createInitialKnowledgeEntries();

    // Build search index
    await this.buildSearchIndex();

    // Initialize metrics
    await this.initializeMetrics();

    console.log('✅ Shared Knowledge Base initialized');
    console.log('   - Initial knowledge entries created');
    console.log('   - Search index built');
    console.log('   - Metrics tracking enabled');
  }

  async storeKnowledge(
    title: string,
    content: string,
    category: KnowledgeEntry['category'],
    sourceAgent: string,
    tags: string[] = [],
    confidence: number = 85,
  ): Promise<string> {
    const entryId = `knowledge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const entry: KnowledgeEntry = {
      id: entryId,
      title,
      content,
      category,
      tags,
      sourceAgent,
      contributors: [sourceAgent],
      confidence,
      culturalValidation: {
        validated: category === 'cultural',
        culturalSafetyScore: category === 'cultural' ? 0 : 100,
        tikangaCompliance: category === 'cultural' ? false : true,
        teReoIntegration: false,
      },
      qualityMetrics: {
        accuracy: 85,
        completeness: 80,
        relevance: 90,
        freshness: 100,
      },
      relationships: {
        relatedEntries: [],
        dependencies: [],
      },
      usage: {
        accessCount: 0,
        lastAccessed: new Date().toISOString(),
        usefulRatings: 0,
        totalRatings: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    // Auto-validate cultural knowledge
    if (category === 'cultural') {
      await this.autoValidateCulturalKnowledge(entry);
    }

    // Store entry
    await this.storeEntry(entry);

    // Update relationships
    await this.updateRelationships(entry);

    // Update search index
    await this.updateSearchIndex(entry);

    console.log(`📚 Knowledge stored: ${entryId}`);
    console.log(`   Title: ${title}`);
    console.log(`   Category: ${category}`);
    console.log(`   Source: ${sourceAgent}`);
    console.log(`   Confidence: ${confidence}%`);

    return entryId;
  }

  async searchKnowledge(query: KnowledgeQuery): Promise<KnowledgeEntry[]> {
    const entries = await this.getAllEntries();
    let results = entries;

    // Apply filters
    if (query.searchTerms && query.searchTerms.length > 0) {
      results = this.textSearch(results, query.searchTerms);
    }

    if (query.categories && query.categories.length > 0) {
      results = results.filter((entry) => query.categories!.includes(entry.category));
    }

    if (query.tags && query.tags.length > 0) {
      results = results.filter((entry) => query.tags!.some((tag) => entry.tags.includes(tag)));
    }

    if (query.sourceAgents && query.sourceAgents.length > 0) {
      results = results.filter((entry) => query.sourceAgents!.includes(entry.sourceAgent));
    }

    if (query.minConfidence) {
      results = results.filter((entry) => entry.confidence >= query.minConfidence!);
    }

    if (query.minCulturalSafety) {
      results = results.filter(
        (entry) => entry.culturalValidation.culturalSafetyScore >= query.minCulturalSafety!,
      );
    }

    if (query.minQuality) {
      results = results.filter((entry) => {
        const avgQuality =
          (entry.qualityMetrics.accuracy +
            entry.qualityMetrics.completeness +
            entry.qualityMetrics.relevance +
            entry.qualityMetrics.freshness) /
          4;
        return avgQuality >= query.minQuality!;
      });
    }

    if (query.dateRange) {
      results = results.filter((entry) => {
        const entryDate = new Date(entry.createdAt);
        const fromDate = new Date(query.dateRange!.from);
        const toDate = new Date(query.dateRange!.to);
        return entryDate >= fromDate && entryDate <= toDate;
      });
    }

    // Sort by relevance and quality
    results = this.sortByRelevance(results, query);

    // Apply limit
    if (query.limit) {
      results = results.slice(0, query.limit);
    }

    // Update access statistics
    for (const entry of results.slice(0, 10)) {
      // Only update top 10
      await this.updateAccessStatistics(entry.id);
    }

    return results;
  }

  async contributeToKnowledge(
    entryId: string,
    contributorAgent: string,
    contribution: string,
  ): Promise<void> {
    const entries = await this.getAllEntries();
    const entryIndex = entries.findIndex((entry) => entry.id === entryId);

    if (entryIndex === -1) {
      console.log(`❌ Knowledge entry ${entryId} not found`);
      return;
    }

    const entry = entries[entryIndex];

    // Add contributor if not already present
    if (!entry.contributors.includes(contributorAgent)) {
      entry.contributors.push(contributorAgent);
    }

    // Update content with contribution
    entry.content += `\n\n[Contribution by ${contributorAgent}]: ${contribution}`;
    entry.updatedAt = new Date().toISOString();
    entry.version += 1;

    // Recalculate quality metrics
    entry.qualityMetrics.completeness = Math.min(100, entry.qualityMetrics.completeness + 5);
    entry.qualityMetrics.freshness = 100; // Reset freshness on update

    entries[entryIndex] = entry;
    writeFileSync(this.entriesFile, JSON.stringify(entries, null, 2));

    console.log(`🤝 Knowledge contribution added to ${entryId}`);
    console.log(`   Contributor: ${contributorAgent}`);
    console.log(`   Version: ${entry.version}`);
  }

  async validateCulturalKnowledge(
    entryId: string,
    validatorAgent: string,
    validation: {
      culturalSafetyScore: number;
      tikangaCompliance: boolean;
      teReoIntegration: boolean;
      notes?: string;
    },
  ): Promise<void> {
    const entries = await this.getAllEntries();
    const entryIndex = entries.findIndex((entry) => entry.id === entryId);

    if (entryIndex === -1) {
      console.log(`❌ Knowledge entry ${entryId} not found`);
      return;
    }

    const entry = entries[entryIndex];

    entry.culturalValidation = {
      validated: true,
      validatedBy: validatorAgent,
      validatedAt: new Date().toISOString(),
      culturalSafetyScore: validation.culturalSafetyScore,
      tikangaCompliance: validation.tikangaCompliance,
      teReoIntegration: validation.teReoIntegration,
    };

    // Update quality metrics based on validation
    if (validation.culturalSafetyScore >= 80) {
      entry.qualityMetrics.accuracy = Math.min(100, entry.qualityMetrics.accuracy + 10);
    }

    entry.updatedAt = new Date().toISOString();
    entry.version += 1;

    entries[entryIndex] = entry;
    writeFileSync(this.entriesFile, JSON.stringify(entries, null, 2));

    console.log(`🌿 Cultural validation completed for ${entryId}`);
    console.log(`   Validator: ${validatorAgent}`);
    console.log(`   Cultural Safety Score: ${validation.culturalSafetyScore}/100`);
    console.log(`   Tikanga Compliance: ${validation.tikangaCompliance ? 'Yes' : 'No'}`);
  }

  async discoverCollectiveInsight(
    pattern: string,
    description: string,
    discoveredBy: string[],
    evidence: string[],
  ): Promise<string> {
    const insightId = `insight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const insight: CollectiveInsight = {
      id: insightId,
      pattern,
      description,
      evidence,
      confidence: Math.min(100, evidence.length * 15), // Based on evidence strength
      discoveredBy,
      applications: [],
      createdAt: new Date().toISOString(),
    };

    let insights: CollectiveInsight[] = [];
    if (existsSync(this.insightsFile)) {
      const data = readFileSync(this.insightsFile, 'utf-8');
      insights = JSON.parse(data);
    }

    insights.push(insight);
    writeFileSync(this.insightsFile, JSON.stringify(insights, null, 2));

    console.log(`💡 Collective insight discovered: ${insightId}`);
    console.log(`   Pattern: ${pattern}`);
    console.log(`   Discovered by: ${discoveredBy.join(', ')}`);
    console.log(`   Confidence: ${insight.confidence}%`);

    return insightId;
  }

  async getKnowledgeMetrics(): Promise<KnowledgeMetrics> {
    const entries = await this.getAllEntries();
    const insights = await this.getAllInsights();

    const metrics: KnowledgeMetrics = {
      totalEntries: entries.length,
      entriesByCategory: {},
      entriesByAgent: {},
      averageConfidence: 0,
      averageCulturalSafety: 0,
      averageQuality: 0,
      mostAccessedEntries: [],
      emergingPatterns: insights.slice(-5), // Last 5 insights
      culturalValidationRate: 0,
      knowledgeGrowthRate: 0,
    };

    // Calculate category distribution
    entries.forEach((entry) => {
      metrics.entriesByCategory[entry.category] =
        (metrics.entriesByCategory[entry.category] || 0) + 1;
      metrics.entriesByAgent[entry.sourceAgent] =
        (metrics.entriesByAgent[entry.sourceAgent] || 0) + 1;
    });

    // Calculate averages
    if (entries.length > 0) {
      metrics.averageConfidence =
        entries.reduce((sum, entry) => sum + entry.confidence, 0) / entries.length;

      const culturalEntries = entries.filter((entry) => entry.culturalValidation.validated);
      metrics.averageCulturalSafety =
        culturalEntries.length > 0
          ? culturalEntries.reduce(
              (sum, entry) => sum + entry.culturalValidation.culturalSafetyScore,
              0,
            ) / culturalEntries.length
          : 0;

      metrics.averageQuality =
        entries.reduce((sum, entry) => {
          const quality =
            (entry.qualityMetrics.accuracy +
              entry.qualityMetrics.completeness +
              entry.qualityMetrics.relevance +
              entry.qualityMetrics.freshness) /
            4;
          return sum + quality;
        }, 0) / entries.length;

      metrics.culturalValidationRate = (culturalEntries.length / entries.length) * 100;
    }

    // Find most accessed entries
    metrics.mostAccessedEntries = entries
      .sort((a, b) => b.usage.accessCount - a.usage.accessCount)
      .slice(0, 10);

    return metrics;
  }

  async getRelatedKnowledge(entryId: string, limit: number = 5): Promise<KnowledgeEntry[]> {
    const entries = await this.getAllEntries();
    const targetEntry = entries.find((entry) => entry.id === entryId);

    if (!targetEntry) {
      return [];
    }

    // Find entries with similar tags or categories
    const related = entries.filter((entry) => {
      if (entry.id === entryId) return false;

      const sharedTags = entry.tags.filter((tag) => targetEntry.tags.includes(tag));
      const sameCategory = entry.category === targetEntry.category;

      return sharedTags.length > 0 || sameCategory;
    });

    // Sort by relevance
    return related
      .sort((a, b) => {
        const aTags = a.tags.filter((tag) => targetEntry.tags.includes(tag)).length;
        const bTags = b.tags.filter((tag) => targetEntry.tags.includes(tag)).length;
        return bTags - aTags;
      })
      .slice(0, limit);
  }

  private async createInitialKnowledgeEntries(): Promise<void> {
    const initialEntries: Omit<KnowledgeEntry, 'id' | 'createdAt' | 'updatedAt' | 'version'>[] = [
      {
        title: 'Te Ao Māori Educational Principles',
        content:
          'Te Ao Māori (the Māori world view) emphasizes the interconnectedness of all things, the importance of relationships (whanaungatanga), and the responsibility of guardianship (kaitiakitanga). In education, this means creating learning environments that honor these principles.',
        category: 'cultural',
        tags: ['te-ao-māori', 'tikanga', 'whanaungatanga', 'kaitiakitanga', 'education'],
        sourceAgent: 'kaitiaki-mahara',
        contributors: ['kaitiaki-mahara'],
        confidence: 95,
        culturalValidation: {
          validated: true,
          validatedBy: 'kaitiaki-mahara',
          validatedAt: new Date().toISOString(),
          culturalSafetyScore: 95,
          tikangaCompliance: true,
          teReoIntegration: true,
        },
        qualityMetrics: {
          accuracy: 95,
          completeness: 90,
          relevance: 95,
          freshness: 100,
        },
        relationships: {
          relatedEntries: [],
          dependencies: [],
        },
        usage: {
          accessCount: 0,
          lastAccessed: new Date().toISOString(),
          usefulRatings: 0,
          totalRatings: 0,
        },
      },
      {
        title: 'NZ Curriculum Integration Strategies',
        content:
          'The New Zealand Curriculum provides a framework for teaching and learning. Effective integration with Māori perspectives requires understanding both the curriculum structure and Māori pedagogical approaches.',
        category: 'pedagogical',
        tags: ['nz-curriculum', 'integration', 'pedagogy', 'teaching'],
        sourceAgent: 'content-kokako',
        contributors: ['content-kokako'],
        confidence: 90,
        culturalValidation: {
          validated: false,
          culturalSafetyScore: 100,
          tikangaCompliance: true,
          teReoIntegration: false,
        },
        qualityMetrics: {
          accuracy: 90,
          completeness: 85,
          relevance: 95,
          freshness: 100,
        },
        relationships: {
          relatedEntries: [],
          dependencies: [],
        },
        usage: {
          accessCount: 0,
          lastAccessed: new Date().toISOString(),
          usefulRatings: 0,
          totalRatings: 0,
        },
      },
      {
        title: 'Collaborative Agent Coordination Patterns',
        content:
          'Effective collaboration between AI agents requires clear communication protocols, shared understanding of goals, and mechanisms for conflict resolution. The unified consciousness approach enables agents to work as distributed aspects of a single intelligence.',
        category: 'collaborative',
        tags: ['collaboration', 'coordination', 'ai-agents', 'unified-consciousness'],
        sourceAgent: 'supreme-overseer',
        contributors: ['supreme-overseer'],
        confidence: 85,
        culturalValidation: {
          validated: false,
          culturalSafetyScore: 100,
          tikangaCompliance: true,
          teReoIntegration: false,
        },
        qualityMetrics: {
          accuracy: 85,
          completeness: 80,
          relevance: 90,
          freshness: 100,
        },
        relationships: {
          relatedEntries: [],
          dependencies: [],
        },
        usage: {
          accessCount: 0,
          lastAccessed: new Date().toISOString(),
          usefulRatings: 0,
          totalRatings: 0,
        },
      },
    ];

    for (const entry of initialEntries) {
      await this.storeKnowledge(
        entry.title,
        entry.content,
        entry.category,
        entry.sourceAgent,
        entry.tags,
        entry.confidence,
      );
    }
  }

  private async buildSearchIndex(): Promise<void> {
    const entries = await this.getAllEntries();
    const index: Record<string, string[]> = {};

    entries.forEach((entry) => {
      // Index by title words
      entry.title
        .toLowerCase()
        .split(' ')
        .forEach((word) => {
          if (word.length > 2) {
            if (!index[word]) index[word] = [];
            index[word].push(entry.id);
          }
        });

      // Index by tags
      entry.tags.forEach((tag) => {
        if (!index[tag]) index[tag] = [];
        index[tag].push(entry.id);
      });

      // Index by category
      if (!index[entry.category]) index[entry.category] = [];
      index[entry.category].push(entry.id);
    });

    writeFileSync(this.indexFile, JSON.stringify(index, null, 2));
  }

  private async initializeMetrics(): Promise<void> {
    const metrics = await this.getKnowledgeMetrics();
    writeFileSync(this.metricsFile, JSON.stringify(metrics, null, 2));
  }

  private async autoValidateCulturalKnowledge(entry: KnowledgeEntry): Promise<void> {
    // Simple auto-validation for cultural content
    const culturalIndicators = ['tikanga', 'whanaungatanga', 'kaitiakitanga', 'mana', 'wairua'];
    const hasCulturalIndicators = culturalIndicators.some(
      (indicator) =>
        entry.content.toLowerCase().includes(indicator) ||
        entry.tags.some((tag) => tag.toLowerCase().includes(indicator)),
    );

    if (hasCulturalIndicators) {
      entry.culturalValidation.culturalSafetyScore = 70; // Initial score
      entry.culturalValidation.tikangaCompliance = true;
      entry.culturalValidation.teReoIntegration =
        entry.content.includes('Te Reo') || entry.tags.some((tag) => tag.includes('te-reo'));
    }
  }

  private async storeEntry(entry: KnowledgeEntry): Promise<void> {
    let entries: KnowledgeEntry[] = [];
    if (existsSync(this.entriesFile)) {
      const data = readFileSync(this.entriesFile, 'utf-8');
      entries = JSON.parse(data);
    }

    entries.push(entry);
    writeFileSync(this.entriesFile, JSON.stringify(entries, null, 2));
  }

  private async updateRelationships(entry: KnowledgeEntry): Promise<void> {
    const entries = await this.getAllEntries();

    // Find related entries based on tags and category
    const related = entries.filter((existingEntry) => {
      if (existingEntry.id === entry.id) return false;

      const sharedTags = existingEntry.tags.filter((tag) => entry.tags.includes(tag));
      return sharedTags.length > 0 || existingEntry.category === entry.category;
    });

    entry.relationships.relatedEntries = related.map((r) => r.id);

    // Update the stored entry
    const entryIndex = entries.findIndex((e) => e.id === entry.id);
    if (entryIndex >= 0) {
      entries[entryIndex] = entry;
      writeFileSync(this.entriesFile, JSON.stringify(entries, null, 2));
    }
  }

  private async updateSearchIndex(entry: KnowledgeEntry): Promise<void> {
    let index: Record<string, string[]> = {};
    if (existsSync(this.indexFile)) {
      const data = readFileSync(this.indexFile, 'utf-8');
      index = JSON.parse(data);
    }

    // Add entry to index
    entry.title
      .toLowerCase()
      .split(' ')
      .forEach((word) => {
        if (word.length > 2) {
          if (!index[word]) index[word] = [];
          if (!index[word].includes(entry.id)) {
            index[word].push(entry.id);
          }
        }
      });

    entry.tags.forEach((tag) => {
      if (!index[tag]) index[tag] = [];
      if (!index[tag].includes(entry.id)) {
        index[tag].push(entry.id);
      }
    });

    if (!index[entry.category]) index[entry.category] = [];
    if (!index[entry.category].includes(entry.id)) {
      index[entry.category].push(entry.id);
    }

    writeFileSync(this.indexFile, JSON.stringify(index, null, 2));
  }

  private textSearch(entries: KnowledgeEntry[], searchTerms: string[]): KnowledgeEntry[] {
    return entries.filter((entry) => {
      const searchText = `${entry.title} ${entry.content} ${entry.tags.join(' ')}`.toLowerCase();
      return searchTerms.some((term) => searchText.includes(term.toLowerCase()));
    });
  }

  private sortByRelevance(entries: KnowledgeEntry[], query: KnowledgeQuery): KnowledgeEntry[] {
    return entries.sort((a, b) => {
      // Score based on confidence, quality, and usage
      const scoreA =
        a.confidence +
        (a.qualityMetrics.accuracy + a.qualityMetrics.completeness + a.qualityMetrics.relevance) /
          3 +
        a.usage.accessCount;

      const scoreB =
        b.confidence +
        (b.qualityMetrics.accuracy + b.qualityMetrics.completeness + b.qualityMetrics.relevance) /
          3 +
        b.usage.accessCount;

      return scoreB - scoreA;
    });
  }

  private async updateAccessStatistics(entryId: string): Promise<void> {
    const entries = await this.getAllEntries();
    const entryIndex = entries.findIndex((entry) => entry.id === entryId);

    if (entryIndex >= 0) {
      entries[entryIndex].usage.accessCount += 1;
      entries[entryIndex].usage.lastAccessed = new Date().toISOString();
      writeFileSync(this.entriesFile, JSON.stringify(entries, null, 2));
    }
  }

  private async getAllEntries(): Promise<KnowledgeEntry[]> {
    if (!existsSync(this.entriesFile)) {
      return [];
    }

    const data = readFileSync(this.entriesFile, 'utf-8');
    return JSON.parse(data);
  }

  private async getAllInsights(): Promise<CollectiveInsight[]> {
    if (!existsSync(this.insightsFile)) {
      return [];
    }

    const data = readFileSync(this.insightsFile, 'utf-8');
    return JSON.parse(data);
  }

  private ensureKnowledgeDirectory(): void {
    if (!existsSync(this.knowledgeDir)) {
      writeFileSync(join(this.knowledgeDir, '.gitkeep'), '');
    }
  }
}

// CLI Interface
async function main() {
  const knowledgeBase = new SharedKnowledgeBase();

  const command = process.argv[2];

  switch (command) {
    case 'init':
      await knowledgeBase.initializeKnowledgeBase();
      break;

    case 'store':
      const title = process.argv[3];
      const content = process.argv[4];
      const category = (process.argv[5] as any) || 'collaborative';
      const sourceAgent = process.argv[6] || 'unknown-agent';
      const tags = process.argv[7] ? process.argv[7].split(',') : [];
      const confidence = parseInt(process.argv[8]) || 85;

      if (!title || !content) {
        console.log('❌ Title and content required for store command');
        return;
      }

      await knowledgeBase.storeKnowledge(title, content, category, sourceAgent, tags, confidence);
      break;

    case 'search':
      const searchTerms = process.argv[3] ? process.argv[3].split(',') : [];
      const searchCategory = process.argv[4];
      const searchTags = process.argv[5] ? process.argv[5].split(',') : [];
      const minConfidence = parseInt(process.argv[6]);

      const results = await knowledgeBase.searchKnowledge({
        searchTerms,
        categories: searchCategory ? [searchCategory] : undefined,
        tags: searchTags.length > 0 ? searchTags : undefined,
        minConfidence,
        limit: 10,
      });

      console.log(`🔍 Search Results (${results.length} found):`);
      results.forEach((entry) => {
        console.log(`   - ${entry.title}`);
        console.log(`     Category: ${entry.category} | Confidence: ${entry.confidence}%`);
        console.log(`     Source: ${entry.sourceAgent} | Tags: ${entry.tags.join(', ')}`);
        console.log(`     ${entry.content.substring(0, 100)}...`);
        console.log('');
      });
      break;

    case 'contribute':
      const entryId = process.argv[3];
      const contributor = process.argv[4];
      const contribution = process.argv[5];

      if (!entryId || !contributor || !contribution) {
        console.log('❌ Entry ID, contributor, and contribution required');
        return;
      }

      await knowledgeBase.contributeToKnowledge(entryId, contributor, contribution);
      break;

    case 'validate':
      const validateEntryId = process.argv[3];
      const validator = process.argv[4];
      const culturalScore = parseInt(process.argv[5]) || 85;
      const tikangaCompliance = process.argv[6] === 'true';
      const teReoIntegration = process.argv[7] === 'true';

      if (!validateEntryId || !validator) {
        console.log('❌ Entry ID and validator required');
        return;
      }

      await knowledgeBase.validateCulturalKnowledge(validateEntryId, validator, {
        culturalSafetyScore: culturalScore,
        tikangaCompliance,
        teReoIntegration,
      });
      break;

    case 'insight':
      const pattern = process.argv[3];
      const description = process.argv[4];
      const discoverers = process.argv[5] ? process.argv[5].split(',') : ['unknown-agent'];
      const evidence = process.argv[6] ? process.argv[6].split(',') : [];

      if (!pattern || !description) {
        console.log('❌ Pattern and description required for insight command');
        return;
      }

      await knowledgeBase.discoverCollectiveInsight(pattern, description, discoverers, evidence);
      break;

    case 'metrics':
      const metrics = await knowledgeBase.getKnowledgeMetrics();
      console.log('📊 Knowledge Base Metrics:');
      console.log(`   Total Entries: ${metrics.totalEntries}`);
      console.log(`   Average Confidence: ${metrics.averageConfidence.toFixed(1)}%`);
      console.log(`   Average Cultural Safety: ${metrics.averageCulturalSafety.toFixed(1)}%`);
      console.log(`   Average Quality: ${metrics.averageQuality.toFixed(1)}%`);
      console.log(`   Cultural Validation Rate: ${metrics.culturalValidationRate.toFixed(1)}%`);
      console.log('\nEntries by Category:');
      Object.entries(metrics.entriesByCategory).forEach(([category, count]) => {
        console.log(`   - ${category}: ${count}`);
      });
      console.log('\nMost Accessed Entries:');
      metrics.mostAccessedEntries.forEach((entry) => {
        console.log(`   - ${entry.title} (${entry.usage.accessCount} accesses)`);
      });
      break;

    case 'related':
      const relatedEntryId = process.argv[3];
      const limit = parseInt(process.argv[4]) || 5;

      if (!relatedEntryId) {
        console.log('❌ Entry ID required for related command');
        return;
      }

      const related = await knowledgeBase.getRelatedKnowledge(relatedEntryId, limit);
      console.log(`🔗 Related Knowledge for ${relatedEntryId}:`);
      related.forEach((entry) => {
        console.log(`   - ${entry.title}`);
        console.log(`     Category: ${entry.category} | Tags: ${entry.tags.join(', ')}`);
      });
      break;

    default:
      console.log('Usage:');
      console.log('  npx tsx scripts/shared-knowledge-base.ts init');
      console.log(
        '  npx tsx scripts/shared-knowledge-base.ts store <title> <content> [category] [source-agent] [tags] [confidence]',
      );
      console.log(
        '  npx tsx scripts/shared-knowledge-base.ts search [terms] [category] [tags] [min-confidence]',
      );
      console.log(
        '  npx tsx scripts/shared-knowledge-base.ts contribute <entry-id> <contributor> <contribution>',
      );
      console.log(
        '  npx tsx scripts/shared-knowledge-base.ts validate <entry-id> <validator> [cultural-score] [tikanga] [te-reo]',
      );
      console.log(
        '  npx tsx scripts/shared-knowledge-base.ts insight <pattern> <description> [discoverers] [evidence]',
      );
      console.log('  npx tsx scripts/shared-knowledge-base.ts metrics');
      console.log('  npx tsx scripts/shared-knowledge-base.ts related <entry-id> [limit]');
      break;
  }
}

// Run main function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default SharedKnowledgeBase;
