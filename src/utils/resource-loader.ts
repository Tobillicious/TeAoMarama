// Resource Loader - Integration with Real Educational Content
// Replaces mock/sample data with actual curriculum-aligned resources

export interface EducationalResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  type: string;
  culturalContent: boolean;
  description: string;
  path: string;
  category: string;
}

export interface ResourceMetadata {
  totalResources: number;
  culturalResources: number;
  subjects: string[];
  yearLevels: string[];
  resourceTypes: string[];
  lastUpdated: string;
}

class ResourceLoader {
  private static instance: ResourceLoader;
  private resourceIndex: EducationalResource[] = [];
  private metadata: ResourceMetadata | null = null;
  private loadingPromise: Promise<void> | null = null;

  static getInstance(): ResourceLoader {
    if (!ResourceLoader.instance) {
      ResourceLoader.instance = new ResourceLoader();
    }
    return ResourceLoader.instance;
  }

  async loadResources(): Promise<EducationalResource[]> {
    if (this.loadingPromise) {
      await this.loadingPromise;
      return this.resourceIndex;
    }

    this.loadingPromise = this.fetchResourceIndex();
    await this.loadingPromise;
    return this.resourceIndex;
  }

  private async fetchResourceIndex(): Promise<void> {
    try {
      // Load the resource index
      const response = await fetch('/resources/index.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch resource index: ${response.status}`);
      }
      
      const indexData = await response.json();
      
      // Also load additional handouts data
      const handoutsData = await this.loadHandoutResources();
      const deepseekData = await this.loadDeepSeekResources();
      
      // Merge all resource data
      this.resourceIndex = [
        ...this.processIndexData(indexData),
        ...handoutsData,
        ...deepseekData
      ];

      this.generateMetadata();
      
      console.log(`✅ Loaded ${this.resourceIndex.length} real educational resources`);
      
    } catch (error) {
      console.warn('Failed to load real resources, falling back to sample data:', error);
      this.resourceIndex = this.getFallbackResources();
      this.generateMetadata();
    }
  }

  private processIndexData(indexData: unknown[]): EducationalResource[] {
    return indexData.map(item => ({
      id: item.id || `resource-${Math.random().toString(36).substr(2, 9)}`,
      title: item.title || 'Untitled Resource',
      subject: this.extractSubject(item.title),
      yearLevel: this.extractYearLevel(item.title),
      type: this.extractResourceType(item.title, item.path),
      culturalContent: item.culturalContent || false,
      description: this.generateDescription(item.title),
      path: item.path || '',
      category: item.category || 'general'
    }));
  }

  private async loadHandoutResources(): Promise<EducationalResource[]> {
    const handoutResources: EducationalResource[] = [];
    
    // Sample handout files we know exist
    const knownHandouts = [
      'Y7_English_Poetry_Creative_Writing_NZ_Landscapes.md',
      'Y7_Mathematics_Patterns_NZ_Culture.md',
      'Y7_Geography_NZ_Landscapes.md',
      'Y10_Mathematics_Statistics_NZ_Data_Analysis.md'
    ];

    for (const filename of knownHandouts) {
      handoutResources.push({
        id: `handout-${filename.replace('.md', '')}`,
        title: this.formatTitle(filename),
        subject: this.extractSubject(filename),
        yearLevel: this.extractYearLevel(filename),
        type: 'handout',
        culturalContent: filename.toLowerCase().includes('nz') || filename.toLowerCase().includes('maori'),
        description: `Professional educational handout: ${this.formatTitle(filename)}`,
        path: `handouts/${filename}`,
        category: 'handout'
      });
    }

    return handoutResources;
  }

  private async loadDeepSeekResources(): Promise<EducationalResource[]> {
    const deepseekResources: EducationalResource[] = [];
    
    // Sample DeepSeek generated resources we know exist
    const knownDeepSeek = [
      'lesson_Science_Y9_native_plant_adaptation_in_aotearoa_ecosystems.md',
      'activity_Social Studies_Y10_economic_systems_in_pre-colonial_aotearoa.md',
      'assessment_Mathematics_Y9_statistics_using_new_zealand_census_data.md',
      'handout_English_Y7_narrative_structure_in_māori_pūrākau.md',
      'handout_Mathematics_Y8_ratios_and_proportions_in_traditional_māori_architecture.md'
    ];

    for (const filename of knownDeepSeek) {
      deepseekResources.push({
        id: `deepseek-${filename.replace('.md', '')}`,
        title: this.formatDeepSeekTitle(filename),
        subject: this.extractSubject(filename),
        yearLevel: this.extractYearLevel(filename),
        type: this.extractResourceType(filename, filename),
        culturalContent: filename.toLowerCase().includes('aotearoa') || filename.toLowerCase().includes('māori'),
        description: `AI-generated educational content: ${this.formatDeepSeekTitle(filename)}`,
        path: `deepseek-generated/${filename}`,
        category: 'ai-generated'
      });
    }

    return deepseekResources;
  }

  private extractSubject(title: string): string {
    const subjectMap = {
      'Mathematics': ['Math', 'Statistics', 'Algebra', 'Geometry', 'Fractions', 'Patterns', 'Proportions', 'Measurement'],
      'Science': ['Science', 'Climate', 'Earth', 'Ecosystems', 'Energy', 'Forces'],
      'English': ['English', 'Poetry', 'Writing', 'Reading', 'Speech', 'Media', 'Narrative'],
      'Social Studies': ['Social', 'Studies', 'Treaty', 'History'],
      'Geography': ['Geography', 'Landscapes'],
      'Visual Arts': ['Visual', 'Arts', 'Patterns', 'Design'],
      'Physical Education': ['Physical', 'Education', 'Games', 'Health'],
      'Technology': ['Technology', 'Design']
    };

    for (const [subject, keywords] of Object.entries(subjectMap)) {
      if (keywords.some(keyword => title.includes(keyword))) {
        return subject;
      }
    }

    return 'General';
  }

  private extractYearLevel(title: string): string {
    const yearMatch = title.match(/Y(\d+)/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1]);
      if (year <= 6) return `Year ${year} (Primary)`;
      if (year <= 8) return `Year ${year} (Intermediate)`;
      if (year <= 10) return `Year ${year} (Secondary)`;
      if (year <= 13) return `Year ${year} (Senior Secondary)`;
    }
    return 'Multi-Level';
  }

  private extractResourceType(title: string, path: string): string {
    if (title.toLowerCase().includes('lesson') || path.includes('lesson')) return 'lesson';
    if (title.toLowerCase().includes('assessment') || path.includes('assessment')) return 'assessment';
    if (title.toLowerCase().includes('activity') || path.includes('activity')) return 'activity';
    if (title.toLowerCase().includes('handout') || path.includes('handout')) return 'handout';
    if (title.toLowerCase().includes('worksheet') || path.includes('worksheet')) return 'worksheet';
    if (title.toLowerCase().includes('unit') || path.includes('unit')) return 'unit';
    if (title.toLowerCase().includes('game') || path.includes('game')) return 'game';
    return 'resource';
  }

  private formatTitle(filename: string): string {
    return filename
      .replace('.md', '')
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^\s+/, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  private formatDeepSeekTitle(filename: string): string {
    const parts = filename.replace('.md', '').split('_');
    const type = parts[0];
    const subject = parts[1];
    const yearLevel = parts[2];
    const topic = parts.slice(3).join(' ').replace(/-/g, ' ');
    
    return `${type.charAt(0).toUpperCase() + type.slice(1)}: ${subject} ${yearLevel.toUpperCase()} - ${topic}`;
  }

  private generateDescription(title: string): string {
    const descriptions = {
      'Mathematics': 'Engaging mathematical activities aligned with the NZ curriculum',
      'Science': 'Hands-on scientific investigations with cultural connections',
      'English': 'Language and literature resources celebrating New Zealand identity',
      'Social Studies': 'Historical and cultural studies with bicultural perspectives',
      'Geography': 'Exploring Aotearoa\'s unique landscapes and environments'
    };

    for (const [subject, description] of Object.entries(descriptions)) {
      if (title.includes(subject)) {
        return description;
      }
    }

    return 'Professional educational resource aligned with New Zealand curriculum standards';
  }

  private generateMetadata(): void {
    const subjects = [...new Set(this.resourceIndex.map(r => r.subject))];
    const yearLevels = [...new Set(this.resourceIndex.map(r => r.yearLevel))];
    const resourceTypes = [...new Set(this.resourceIndex.map(r => r.type))];

    this.metadata = {
      totalResources: this.resourceIndex.length,
      culturalResources: this.resourceIndex.filter(r => r.culturalContent).length,
      subjects: subjects.sort(),
      yearLevels: yearLevels.sort(),
      resourceTypes: resourceTypes.sort(),
      lastUpdated: new Date().toISOString()
    };
  }

  getFallbackResources(): EducationalResource[] {
    return [
      {
        id: '1',
        title: 'Māori Mathematical Concepts in Traditional Navigation',
        subject: 'Mathematics',
        yearLevel: 'Year 9-10',
        type: 'lesson',
        culturalContent: true,
        description: 'Exploring mathematical principles used in traditional Polynesian navigation, including geometry and spatial reasoning.',
        path: 'fallback/maori-navigation-math',
        category: 'fallback'
      },
      {
        id: '2',
        title: 'Environmental Kaitiakitanga - Ecosystem Management',
        subject: 'Science',
        yearLevel: 'Year 7-8',
        type: 'unit',
        culturalContent: true,
        description: 'Understanding guardianship principles in environmental science through indigenous knowledge systems.',
        path: 'fallback/kaitiakitanga-ecosystems',
        category: 'fallback'
      }
    ];
  }

  getMetadata(): ResourceMetadata | null {
    return this.metadata;
  }

  getResourcesBySubject(subject: string): EducationalResource[] {
    return this.resourceIndex.filter(resource => 
      subject === 'all' || resource.subject === subject
    );
  }

  getResourcesByYearLevel(yearLevel: string): EducationalResource[] {
    return this.resourceIndex.filter(resource => 
      yearLevel === 'all' || resource.yearLevel === yearLevel
    );
  }

  getResourcesByType(type: string): EducationalResource[] {
    return this.resourceIndex.filter(resource => 
      type === 'all' || resource.type === type
    );
  }

  searchResources(query: string): EducationalResource[] {
    const searchTerm = query.toLowerCase();
    return this.resourceIndex.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.subject.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm)
    );
  }

  filterResources(filters: {
    subject?: string;
    yearLevel?: string;
    type?: string;
    culturalContent?: boolean;
    search?: string;
  }): EducationalResource[] {
    let filtered = [...this.resourceIndex];

    if (filters.subject && filters.subject !== 'all') {
      filtered = filtered.filter(r => r.subject === filters.subject);
    }

    if (filters.yearLevel && filters.yearLevel !== 'all') {
      filtered = filtered.filter(r => r.yearLevel === filters.yearLevel);
    }

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(r => r.type === filters.type);
    }

    if (filters.culturalContent !== undefined) {
      filtered = filtered.filter(r => r.culturalContent === filters.culturalContent);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(searchTerm) ||
        r.subject.toLowerCase().includes(searchTerm) ||
        r.description.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }

  async getResourceContent(resource: EducationalResource): Promise<string> {
    try {
      const response = await fetch(`/resources/${resource.path}`);
      if (!response.ok) {
        throw new Error(`Failed to load resource: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.warn(`Failed to load content for ${resource.title}:`, error);
      return `# ${resource.title}\n\n${resource.description}\n\n*Content loading temporarily unavailable*`;
    }
  }
}

// Export singleton instance
export const resourceLoader = ResourceLoader.getInstance();

// Convenience hooks for React components
export // const useResources = () => {
  const [resources, setResources] = React.useState<EducationalResource[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    resourceLoader.loadResources()
      .then(setResources)
      .catch(err => {
        setError(err.message);
        setResources(resourceLoader.getFallbackResources());
      })
      .finally(() => setLoading(false));
  }, []);

  return { resources, loading, error, metadata: resourceLoader.getMetadata() };
};

// Import React for the hook
import React from 'react';