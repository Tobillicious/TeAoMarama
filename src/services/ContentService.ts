/**
 * Content Service for Human-Readable Educational Content
 *
 * This service provides access to the converted human-readable content files
 * and manages the content metadata for the browser interface.
 */

export interface ContentFile {
  id: string;
  title: string;
  type: string;
  subject: string;
  yearLevel: string;
  duration: string;
  depth: string;
  createdAt: string;
  path: string;
  culturalContext?: string;
  learningObjectives?: string[];
  activities?: string[];
  resources?: string[];
  assessment?: {
    type: string;
    tasks: string[];
  };
  nzcAlignment?: string[];
}

export interface ContentStats {
  multimedia: number;
  unitPlans: number;
  lessons: number;
  assessments: number;
  total: number;
}

class ContentService {
  private contentCache: ContentFile[] = [];
  private statsCache: ContentStats | null = null;

  /**
   * Load all content files from the human-readable-content directory
   */
  async loadAllContent(): Promise<ContentFile[]> {
    if (this.contentCache.length > 0) {
      return this.contentCache;
    }

    try {
      // In a real implementation, this would fetch from the actual file system
      // For now, we'll return mock data that represents the actual converted content
      const mockContent: ContentFile[] = [
        // Multimedia Content Examples
        {
          id: 'multimedia-1755687803840-hg4x2acnb',
          title:
            'Year 9 Social Studies: Community Voices Podcast - Interactive Multimedia Experience',
          type: 'multimedia',
          subject: 'Social Studies',
          yearLevel: 'Year 9',
          duration: '30-45 minutes',
          depth: 'extending',
          createdAt: '2025-08-20',
          path: '/human-readable-content/multimedia/multimedia-1755687803840-hg4x2acnb.md',
          culturalContext:
            'Developing interactive social studies multimedia that explores the history, culture, and contemporary issues of Ngāti Kahungunu and the broader Aotearoa context through engaging digital experiences.',
          learningObjectives: [
            'Engage with interactive social studies multimedia through cultural and local context',
            'Apply traditional knowledge and modern methods to social studies challenges',
            'Connect multimedia learning to local environment, community, and cultural heritage',
            'Demonstrate respect for Māori and Pacific perspectives and values',
            'Use Te Reo Māori appropriately in social studies multimedia contexts',
          ],
          activities: [
            'Cultural mapping and social studies analysis',
            'Traditional knowledge workshop and social studies integration',
            'Environmental investigation using social studies methods',
            'Community interview project on social studies applications',
            'Sustainability challenge with social studies solutions',
            'Cultural artifact study through social studies lens',
          ],
          resources: [
            'Interactive historical timeline software',
            'Virtual reality community tours',
            'Digital archive and primary source databases',
            'Interactive mapping and timeline tools',
            'Treaty of Waitangi interactive resources',
          ],
          assessment: {
            type: 'Formative and Summative Digital Assessment',
            tasks: [
              'Formative: Teacher observation during interactive multimedia exploration and digital discussions',
              'Formative: Peer feedback through digital collaboration platforms and self-reflection on learning progress',
              'Summative: Student digital presentation demonstrating understanding, cultural connection, and community application',
              'Summative: Digital portfolio of work showing growth in knowledge, skills, and cultural understanding',
            ],
          },
          nzcAlignment: [
            'Social Studies: Identity, Culture, and Organisation (Level 4-5)',
            'Social Studies: Place and Environment (Level 4-5)',
            'Social Studies: Continuity and Change (Level 4-5)',
            'Te Tiriti o Waitangi: Historical and contemporary perspectives',
          ],
        },
        {
          id: 'multimedia-1755687828863-wcw6gjdm0',
          title: 'Year 8 Te Reo Māori: Interactive Waiata Learning Experience',
          type: 'multimedia',
          subject: 'Te Reo Māori',
          yearLevel: 'Year 8',
          duration: '25-35 minutes',
          depth: 'developing',
          createdAt: '2025-08-20',
          path: '/human-readable-content/multimedia/multimedia-1755687828863-wcw6gjdm0.md',
          culturalContext:
            'Creating interactive multimedia experiences that connect Te Reo Māori language learning to traditional waiata, cultural practices, and community values through engaging digital platforms.',
          learningObjectives: [
            'Develop Te Reo Māori language skills through interactive multimedia',
            'Connect language learning to traditional waiata and cultural practices',
            'Apply cultural protocols and tikanga in digital learning environments',
            'Demonstrate respect for Māori cultural values and traditions',
            'Use appropriate Te Reo Māori in multimedia contexts',
          ],
          activities: [
            'Interactive waiata learning and pronunciation practice',
            'Cultural protocol workshops and tikanga integration',
            'Digital storytelling using Te Reo Māori',
            'Community connection projects and cultural sharing',
            'Traditional knowledge exploration through multimedia',
            'Cultural artifact study and language application',
          ],
          resources: [
            'Interactive waiata learning software',
            'Te Reo Māori pronunciation guides',
            'Cultural protocol digital resources',
            'Traditional knowledge multimedia archives',
            'Community connection platforms',
          ],
          assessment: {
            type: 'Cultural and Language Assessment',
            tasks: [
              'Formative: Regular pronunciation and cultural protocol checks',
              'Formative: Peer collaboration and cultural sharing activities',
              'Summative: Interactive presentation demonstrating language and cultural understanding',
              'Summative: Digital portfolio showing growth in Te Reo Māori and cultural competency',
            ],
          },
          nzcAlignment: [
            'Learning Languages: Communication (Level 4-5)',
            'Learning Languages: Language Knowledge (Level 4-5)',
            'Te Tiriti o Waitangi: Language revitalization and cultural identity',
          ],
        },

        // Unit Plan Examples
        {
          id: 'unit-1755686912327-htyywrqth',
          title: 'Year 7 Te Reo Māori: Kaitiakitanga in Action - Comprehensive Learning Journey',
          type: 'unit-plan',
          subject: 'Te Reo Māori',
          yearLevel: 'Year 7',
          duration: '4-6 weeks',
          depth: 'mastery',
          createdAt: '2025-08-20',
          path: '/human-readable-content/unit-plans/unit-1755686912327-htyywrqth.md',
          culturalContext:
            'Creating comprehensive Te Reo Māori unit plans that connect language learning to local traditions, stories, and community practices through integrated, culturally-responsive learning experiences.',
          learningObjectives: [
            'Develop comprehensive understanding of te reo māori concepts through integrated, culturally-responsive learning',
            'Apply traditional knowledge and modern methods to te reo māori challenges',
            'Connect learning to local environment, community, and cultural heritage',
            'Demonstrate respect for Māori and Pacific perspectives and values',
            'Use Te Reo Māori appropriately in te reo māori contexts',
          ],
          activities: [
            'Cultural mapping and te reo māori analysis',
            'Traditional knowledge workshop and te reo māori integration',
            'Environmental investigation using te reo māori methods',
            'Community interview project on te reo māori applications',
            'Sustainability challenge with te reo māori solutions',
            'Cultural artifact study through te reo māori lens',
          ],
          resources: [
            'Local Te Reo Māori speakers and teachers',
            'Traditional waiata and haka resources',
            'Cultural protocols and tikanga guides',
            'Audio recording equipment for pronunciation',
            'Te Reo Māori dictionaries and language apps',
          ],
          assessment: {
            type: 'Comprehensive Integrated Assessment',
            tasks: [
              'Formative: Regular check-ins, observations, and feedback throughout the unit',
              'Formative: Peer collaboration and self-reflection on learning progress',
              'Summative: Comprehensive project demonstrating understanding, cultural connection, and community application',
              'Summative: Portfolio of work showing growth in knowledge, skills, and cultural understanding',
            ],
          },
          nzcAlignment: [
            'Learning Languages: Communication (Level 4-5)',
            'Learning Languages: Language Knowledge (Level 4-5)',
            'Te Tiriti o Waitangi: Language revitalization and cultural identity',
          ],
        },

        // Lesson Plan Examples
        {
          id: 'lesson-1755683030316-kqepwjlxz',
          title: 'Year 6 Mathematics: Te Reo Māori Numbers and Counting',
          type: 'lesson',
          subject: 'Mathematics',
          yearLevel: 'Year 6',
          duration: '45 minutes',
          depth: 'developing',
          createdAt: '2025-08-20',
          path: '/human-readable-content/lessons/lesson-1755683030316-kqepwjlxz.md',
          culturalContext:
            'Integrating Te Reo Māori number systems and counting practices with mathematical concepts to create culturally-responsive learning experiences that honor traditional knowledge.',
          learningObjectives: [
            'Learn Te Reo Māori numbers and counting systems',
            'Apply mathematical concepts using Te Reo Māori terminology',
            'Connect traditional counting practices to modern mathematics',
            'Demonstrate respect for Māori mathematical knowledge',
            'Use appropriate Te Reo Māori in mathematical contexts',
          ],
          activities: [
            'Te Reo Māori number recognition and pronunciation',
            'Traditional counting games and activities',
            'Mathematical problem-solving using Te Reo Māori',
            'Cultural story integration with mathematical concepts',
            'Community counting practices exploration',
            'Digital tools for Te Reo Māori mathematics',
          ],
          resources: [
            'Te Reo Māori number charts and visual aids',
            'Traditional counting tools and materials',
            'Mathematical games in Te Reo Māori',
            'Cultural stories with mathematical themes',
            'Digital mathematics applications',
          ],
          assessment: {
            type: 'Formative and Summative Assessment',
            tasks: [
              'Formative: Regular number recognition and pronunciation checks',
              'Formative: Peer collaboration in mathematical activities',
              'Summative: Mathematical problem-solving demonstration using Te Reo Māori',
              'Summative: Portfolio showing growth in both mathematics and Te Reo Māori',
            ],
          },
          nzcAlignment: [
            'Mathematics and Statistics: Number and Algebra (Level 3-4)',
            'Learning Languages: Communication (Level 3-4)',
            'Te Tiriti o Waitangi: Cultural knowledge and language integration',
          ],
        },

        // Assessment Examples
        {
          id: 'assessment-1755691492714-ce65x98et',
          title: 'Year 7 Te Reo Māori: Cultural Competency Assessment',
          type: 'assessment',
          subject: 'Te Reo Māori',
          yearLevel: 'Year 7',
          duration: '60 minutes',
          depth: 'mastery',
          createdAt: '2025-08-20',
          path: '/human-readable-content/assessments/assessment-1755691492714-ce65x98et.md',
          culturalContext:
            'Comprehensive assessment framework that evaluates both Te Reo Māori language proficiency and cultural competency, ensuring authentic and respectful evaluation methods.',
          learningObjectives: [
            'Demonstrate proficiency in Te Reo Māori language skills',
            'Show understanding of cultural protocols and tikanga',
            'Apply cultural knowledge in appropriate contexts',
            'Demonstrate respect for Māori values and traditions',
            'Use Te Reo Māori appropriately in various situations',
          ],
          activities: [
            'Oral language assessment and pronunciation evaluation',
            'Cultural protocol demonstration and understanding',
            'Written Te Reo Māori comprehension and expression',
            'Cultural knowledge application and respect demonstration',
            'Community interaction and cultural sharing',
            'Reflection on cultural learning journey',
          ],
          resources: [
            'Te Reo Māori assessment rubrics and criteria',
            'Cultural protocol evaluation frameworks',
            'Audio recording equipment for language assessment',
            'Cultural knowledge validation tools',
            'Community feedback and evaluation systems',
          ],
          assessment: {
            type: 'Comprehensive Cultural and Language Assessment',
            tasks: [
              'Formative: Regular language and cultural competency checks',
              'Formative: Peer evaluation and community feedback',
              'Summative: Comprehensive demonstration of language and cultural proficiency',
              'Summative: Portfolio assessment showing growth and cultural understanding',
            ],
          },
          nzcAlignment: [
            'Learning Languages: Communication (Level 4-5)',
            'Learning Languages: Language Knowledge (Level 4-5)',
            'Te Tiriti o Waitangi: Cultural competency and language proficiency',
          ],
        },
      ];

      this.contentCache = mockContent;
      return this.contentCache;
    } catch (error) {
      console.error('Error loading content:', error);
      throw new Error('Failed to load content files');
    }
  }

  /**
   * Get content statistics
   */
  async getContentStats(): Promise<ContentStats> {
    if (this.statsCache) {
      return this.statsCache;
    }

    const content = await this.loadAllContent();
    const stats: ContentStats = {
      multimedia: content.filter((c) => c.type === 'multimedia').length,
      unitPlans: content.filter((c) => c.type === 'unit-plan').length,
      lessons: content.filter((c) => c.type === 'lesson').length,
      assessments: content.filter((c) => c.type === 'assessment').length,
      total: content.length,
    };

    this.statsCache = stats;
    return stats;
  }

  /**
   * Search content by term
   */
  async searchContent(searchTerm: string): Promise<ContentFile[]> {
    const content = await this.loadAllContent();

    if (!searchTerm.trim()) {
      return content;
    }

    const term = searchTerm.toLowerCase();
    return content.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.subject.toLowerCase().includes(term) ||
        item.yearLevel.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term) ||
        (item.culturalContext && item.culturalContext.toLowerCase().includes(term)),
    );
  }

  /**
   * Filter content by criteria
   */
  async filterContent(filters: {
    type?: string;
    subject?: string;
    yearLevel?: string;
    depth?: string;
  }): Promise<ContentFile[]> {
    const content = await this.loadAllContent();

    return content.filter((item) => {
      if (filters.type && filters.type !== 'all' && item.type !== filters.type) {
        return false;
      }
      if (filters.subject && filters.subject !== 'all' && item.subject !== filters.subject) {
        return false;
      }
      if (
        filters.yearLevel &&
        filters.yearLevel !== 'all' &&
        item.yearLevel !== filters.yearLevel
      ) {
        return false;
      }
      if (filters.depth && filters.depth !== 'all' && item.depth !== filters.depth) {
        return false;
      }
      return true;
    });
  }

  /**
   * Get content by ID
   */
  async getContentById(id: string): Promise<ContentFile | null> {
    const content = await this.loadAllContent();
    return content.find((item) => item.id === id) || null;
  }

  /**
   * Get content by type
   */
  async getContentByType(type: string): Promise<ContentFile[]> {
    const content = await this.loadAllContent();
    return content.filter((item) => item.type === type);
  }

  /**
   * Get unique values for filter options
   */
  async getFilterOptions(): Promise<{
    subjects: string[];
    yearLevels: string[];
    depths: string[];
    types: string[];
  }> {
    const content = await this.loadAllContent();

    return {
      subjects: [...new Set(content.map((item) => item.subject))].sort(),
      yearLevels: [...new Set(content.map((item) => item.yearLevel))].sort(),
      depths: [...new Set(content.map((item) => item.depth))].sort(),
      types: [...new Set(content.map((item) => item.type))].sort(),
    };
  }

  /**
   * Clear cache (useful for development)
   */
  clearCache(): void {
    this.contentCache = [];
    this.statsCache = null;
  }
}

// Export singleton instance
export const contentService = new ContentService();
export default contentService;
