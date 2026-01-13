// Content indexing utilities for TeAoMarama platform
export interface ContentItem {
  id: string;
  title: string;
  description: string;
  subject: string;
  yearLevel: string;
  type: 'lesson' | 'activity' | 'assessment' | 'resource';
  culturalContext?: 'māori' | 'pacific' | 'multicultural' | 'general';
  tags: string[];
  filePath: string;
  lastModified: string;
  quality: number;
  accessibility: boolean;
}

export class ContentIndexer {
  private static instance: ContentIndexer;
  private contentIndex: Map<string, ContentItem> = new Map();

  static getInstance(): ContentIndexer {
    if (!ContentIndexer.instance) {
      ContentIndexer.instance = new ContentIndexer();
    }
    return ContentIndexer.instance;
  }

  // Index content items
  indexContent(items: ContentItem[]): void {
    items.forEach((item) => {
      this.contentIndex.set(item.id, item);
    });
  }

  // Search content by query
  searchContent(query: string): ContentItem[] {
    const results: ContentItem[] = [];
    const searchTerm = query.toLowerCase();

    for (const item of this.contentIndex.values()) {
      if (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.subject.toLowerCase().includes(searchTerm) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      ) {
        results.push(item);
      }
    }

    return results;
  }

  // Get content by ID
  getContentById(id: string): ContentItem | undefined {
    return this.contentIndex.get(id);
  }

  // Get all content
  getAllContent(): ContentItem[] {
    return Array.from(this.contentIndex.values());
  }

  // Filter content by criteria
  filterContent(filters: {
    subject?: string;
    yearLevel?: string;
    type?: string;
    culturalContext?: string;
  }): ContentItem[] {
    const results: ContentItem[] = [];

    for (const item of this.contentIndex.values()) {
      let matches = true;

      if (filters.subject && item.subject !== filters.subject) {
        matches = false;
      }
      if (filters.yearLevel && item.yearLevel !== filters.yearLevel) {
        matches = false;
      }
      if (filters.type && item.type !== filters.type) {
        matches = false;
      }
      if (filters.culturalContext && item.culturalContext !== filters.culturalContext) {
        matches = false;
      }

      if (matches) {
        results.push(item);
      }
    }

    return results;
  }
}

// Export utility functions for compatibility
export async function loadAllIndexedContent(): Promise<ContentItem[]> {
  const indexer = new ContentIndexer();
  return await indexer.loadAllContent();
}

export function searchContent(content: ContentItem[], query: string): ContentItem[] {
  const indexer = new ContentIndexer();
  return indexer.search(content, query);
}

export function filterContentByCategory(content: ContentItem[], category: string): ContentItem[] {
  const indexer = new ContentIndexer();
  return indexer.filter(content, { category });
}

export function filterContentBySubject(content: ContentItem[], subject: string): ContentItem[] {
  const indexer = new ContentIndexer();
  return indexer.filter(content, { subject });
}

export function sortContent(content: ContentItem[], sortBy: string): ContentItem[] {
  const indexer = new ContentIndexer();
  return indexer.sort(content, sortBy as any);
}
