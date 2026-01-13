// Simple Content Loader - Actually loads real content files
// Version: 1.0.0

export interface SimpleResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  category: 'lesson-plan' | 'assessment' | 'activity' | 'handout' | 'multimedia' | 'unit-plan';
  content?: string;
  filePath: string;
  size: number;
  lastModified: string;
  culturalElements: boolean;
  tags: string[];
}

export class SimpleContentLoader {
  private static instance: SimpleContentLoader;
  private resources: SimpleResource[] = [];
  private isLoaded: boolean = false;

  private constructor() {}

  public static getInstance(): SimpleContentLoader {
    if (!SimpleContentLoader.instance) {
      SimpleContentLoader.instance = new SimpleContentLoader();
    }
    return SimpleContentLoader.instance;
  }

  public async loadAllResources(): Promise<SimpleResource[]> {
    if (this.isLoaded) {
      return this.resources;
    }

    try {
      // Load from known content files
      const resources = await this.loadKnownResources();
      this.resources = resources;
      this.isLoaded = true;
      console.log(`Loaded ${resources.length} educational resources`);
      return resources;
    } catch (error) {
      console.error('Error loading educational resources:', error);
      return [];
    }
  }

  private async loadKnownResources(): Promise<SimpleResource[]> {
    const resources: SimpleResource[] = [];

    // Known content files that actually exist
    const knownFiles = [
      {
        path: '/src/content/lessons/lesson-1755683030316-kqepwjlxz.json',
        title: 'Sample Lesson Plan',
        subject: 'Mathematics',
        yearLevel: 'Year 10',
        category: 'lesson-plan' as const,
        culturalElements: true,
        tags: ['statistics', 'data-analysis', 'cultural-context'],
      },
      {
        path: '/src/content/assessments/assessment-1755683030316-nwbaz71bk.json',
        title: 'Sample Assessment',
        subject: 'English',
        yearLevel: 'Year 9',
        category: 'assessment' as const,
        culturalElements: false,
        tags: ['reading-comprehension', 'analysis'],
      },
      {
        path: '/public/resources/handouts/Y10_Mathematics_Statistics_NZ_Data_Analysis.md',
        title: 'Y10 Mathematics: Statistics NZ Data Analysis',
        subject: 'Mathematics',
        yearLevel: 'Year 10',
        category: 'handout' as const,
        culturalElements: true,
        tags: ['statistics', 'nz-data', 'cultural-context'],
      },
      {
        path: '/public/resources/handouts/Y7_English_Close_Reading_0018.md',
        title: 'Y7 English: Close Reading 0018',
        subject: 'English',
        yearLevel: 'Year 7',
        category: 'handout' as const,
        culturalElements: true,
        tags: ['close-reading', 'literacy', 'cultural-stories'],
      },
    ];

    for (const file of knownFiles) {
      try {
        const resource = await this.loadResourceFile(file);
        if (resource) {
          resources.push(resource);
        }
      } catch (error) {
        console.warn(`Could not load ${file.path}:`, error);
        // Create a placeholder resource
        resources.push({
          id: this.generateId(file.path),
          title: file.title,
          subject: file.subject,
          yearLevel: file.yearLevel,
          category: file.category,
          filePath: file.path,
          size: 0,
          lastModified: new Date().toISOString(),
          culturalElements: file.culturalElements,
          tags: file.tags,
        });
      }
    }

    return resources;
  }

  private async loadResourceFile(fileInfo: any): Promise<SimpleResource | null> {
    try {
      // Try to fetch the actual file
      const response = await fetch(fileInfo.path);

      let content = '';
      let size = 0;

      if (response.ok) {
        content = await response.text();
        size = content.length;
      }

      return {
        id: this.generateId(fileInfo.path),
        title: fileInfo.title,
        subject: fileInfo.subject,
        yearLevel: fileInfo.yearLevel,
        category: fileInfo.category,
        content,
        filePath: fileInfo.path,
        size,
        lastModified: new Date().toISOString(),
        culturalElements: fileInfo.culturalElements,
        tags: fileInfo.tags,
      };
    } catch (error) {
      console.warn(`Error loading ${fileInfo.path}:`, error);
      return null;
    }
  }

  private generateId(filePath: string): string {
    return filePath.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  }

  public async getResourceById(id: string): Promise<SimpleResource | null> {
    await this.loadAllResources();
    return this.resources.find((r) => r.id === id) || null;
  }

  public async getResourcesByCategory(
    category: SimpleResource['category'],
  ): Promise<SimpleResource[]> {
    await this.loadAllResources();
    return this.resources.filter((r) => r.category === category);
  }

  public async getResourcesBySubject(subject: string): Promise<SimpleResource[]> {
    await this.loadAllResources();
    return this.resources.filter((r) => r.subject.toLowerCase().includes(subject.toLowerCase()));
  }

  public async searchResources(query: string): Promise<SimpleResource[]> {
    await this.loadAllResources();
    const lowerQuery = query.toLowerCase();

    return this.resources.filter(
      (r) =>
        r.title.toLowerCase().includes(lowerQuery) ||
        r.subject.toLowerCase().includes(lowerQuery) ||
        r.content?.toLowerCase().includes(lowerQuery) ||
        r.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    );
  }

  public getStats(): {
    total: number;
    byCategory: { [key: string]: number };
    bySubject: { [key: string]: number };
    culturalResources: number;
  } {
    const stats = {
      total: this.resources.length,
      byCategory: {} as { [key: string]: number },
      bySubject: {} as { [key: string]: number },
      culturalResources: 0,
    };

    this.resources.forEach((resource) => {
      // Category stats
      stats.byCategory[resource.category] = (stats.byCategory[resource.category] || 0) + 1;

      // Subject stats
      stats.bySubject[resource.subject] = (stats.bySubject[resource.subject] || 0) + 1;

      // Cultural resources
      if (resource.culturalElements) {
        stats.culturalResources++;
      }
    });

    return stats;
  }
}

// Export singleton instance
export const simpleContentLoader = SimpleContentLoader.getInstance();

// Export function for compatibility
export const loadSimpleEducationalContent = async () => {
  return await simpleContentLoader.loadAllResources();
};
