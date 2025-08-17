/**
 * Metadata Parser Service
 * Extracts structured metadata from educational resource files
 */

export interface ResourceMetadata {
  title: string;
  subject: string;
  yearLevel: string[];
  resourceType: string;
  duration?: string;
  culturalSafetyLevel: string;
  culturalSafetyIcon: string;
  curriculumArea?: string;
  nzcAlignment: string[];
  learningObjectives: string[];
  culturalContent: {
    hasMaoriContent: boolean;
    culturalSensitivityLevel: string;
    iwiConsultation: boolean;
  };
  tags: string[];
  difficulty: string;
}

export class MetadataParser {
  private static readonly SUBJECT_PATTERNS = {
    english: /english|literacy|reading|writing|language arts/i,
    science: /science|physics|chemistry|biology|ecology/i,
    'social studies': /social studies|history|geography|civics/i,
    'te reo māori': /te reo|māori|maori language/i,
    technology: /technology|digital|programming|coding/i,
    health: /health|pe|physical education|wellness/i,
    arts: /arts|music|drama|visual arts/i,
  };

  private static readonly YEAR_LEVEL_PATTERNS = {
    'Year 7': /year\s*7|y7/i,
    'Year 8': /year\s*8|y8/i,
    'Year 9': /year\s*9|y9/i,
    'Year 10': /year\s*10|y10/i,
    'Year 11': /year\s*11|y11/i,
    'Year 12': /year\s*12|y12/i,
    'Year 13': /year\s*13|y13/i,
  };

  /**
   * Parse metadata from a resource file content
   */
  static parseFromContent(content: string): ResourceMetadata {
    const lines = content.split('\n');

    // Extract title (first non-empty line, usually starts with #)
    const title = this.extractTitle(lines);

    // Extract structured metadata from the header section
    const subject = this.extractMetadataField(content, 'Subject') || this.inferSubject(content);
    const yearLevel =
      this.extractMetadataField(content, 'Year Level') || this.inferYearLevel(content);
    const resourceType = this.extractMetadataField(content, 'Resource Type') || 'Handout';
    const duration = this.extractMetadataField(content, 'Duration');
    const curriculumArea = this.extractMetadataField(content, 'Curriculum Area');

    // Extract cultural safety information
    const culturalSafety = this.extractCulturalSafety(content);

    // Extract curriculum alignment
    const nzcAlignment = this.extractCurriculumAlignment(content);

    // Extract learning objectives
    const learningObjectives = this.extractLearningObjectives(content);

    // Extract cultural content information
    const culturalContent = this.extractCulturalContent(content);

    // Generate tags based on content
    const tags = this.generateTags(content, subject, yearLevel);

    // Infer difficulty level
    const difficulty = this.inferDifficulty(yearLevel, content);

    return {
      title,
      subject,
      yearLevel,
      resourceType,
      duration,
      culturalSafetyLevel: culturalSafety.level,
      culturalSafetyIcon: culturalSafety.icon,
      curriculumArea,
      nzcAlignment,
      learningObjectives,
      culturalContent,
      tags,
      difficulty,
    };
  }

  /**
   * Parse resources from index.json with enhanced metadata
   */
  static async parseResourcesFromIndex(
    indexPath: string = '/resources/index.json',
  ): Promise<ParsedResource[]> {
    try {
      const response = await fetch(indexPath, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Failed to load ${indexPath}`);

      const data = await response.json();
      const items = Array.isArray(data.items) ? data.items : [];

      const parsedResources: ParsedResource[] = [];

      // Parse each resource file to extract metadata
      for (const item of items) {
        try {
          // Fetch the actual resource content
          const resourceResponse = await fetch(`/${item.relativePath}`, { cache: 'no-store' });
          if (resourceResponse.ok) {
            const content = await resourceResponse.text();
            const metadata = this.parseFromContent(content);

            const parsedResource: ParsedResource = {
              ...item,
              metadata,
              searchableText: this.createSearchableText(content, metadata),
              preview: this.extractPreview(content),
            };

            parsedResources.push(parsedResource);
          }
        } catch (error) {
          console.warn(`Failed to parse resource ${item.relativePath}:`, error);
          // Add basic resource with minimal metadata
          const basicMetadata: ResourceMetadata = {
            __title: item.title,
            _____subject: this.inferSubject(item.title),
            yearLevel: this.inferYearLevel(item.title),
            resourceType: 'Handout',
            culturalSafetyLevel: 'clean',
            culturalSafetyIcon: '🟢',
          };

          parsedResources.push({
            ...item,
            metadata: basicMetadata,
            searchableText: item.title,
            preview: 'Preview not available',
          });
        }
      }

      return parsedResources;
    } catch (error) {
      console.error('Failed to parse resources from index:', error);
      return [];
    }
  }

  // Private helper methods
  private static extractTitle(lines: string[]): string {
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) {
        return trimmed.replace(/^#+\s*/, '').trim();
      }
      if (trimmed && !trimmed.startsWith('*') && !trimmed.startsWith('**')) {
        return trimmed;
      }
    }
    return 'Untitled Resource';
  }

  private static extractMetadataField(content: string, fieldName: string): string | undefined {
    const pattern = new RegExp(`\\*\\*${fieldName}\\*\\*:?\\s*(.+)`, 'i');
    const match = content.match(pattern);
    return match ? match[1].trim() : undefined;
  }

  private static inferSubject(text: string): string {
    for (const [subject, pattern] of Object.entries(this.SUBJECT_PATTERNS)) {
      if (pattern.test(text)) {
        return subject.charAt(0).toUpperCase() + subject.slice(1);
      }
    }
    return 'General';
  }

  private static inferYearLevel(text: string): string {
    for (const [yearLevel, pattern] of Object.entries(this.YEAR_LEVEL_PATTERNS)) {
      if (pattern.test(text)) {
        return yearLevel;
      }
    }
    return 'Mixed Levels';
  }

  private static extractCulturalSafety(content: string): {
    level: 'clean' | 'review' | 'consultation';
    icon: string;
  } {
    if (this.CULTURAL_SAFETY_PATTERNS.consultation.test(content)) {
      return { level: 'consultation', icon: '🔴' };
    }
    if (this.CULTURAL_SAFETY_PATTERNS.review.test(content)) {
      return { level: 'review', icon: '🟡' };
    }
    return { level: 'clean', icon: '🟢' };
  }

  private static extractCurriculumAlignment(content: string): string[] {
    const alignment: string[] = [];

    // Look for NZ Curriculum codes
    const nzcPattern = /\b[A-Z]\d+-\d+\b/g;
    const matches = content.match(nzcPattern);
    if (matches) {
      alignment.push(...matches);
    }

    // Look for curriculum level references
    const levelPattern = /Level\s+(\d+)/gi;
    const levelMatches = content.match(levelPattern);
    if (levelMatches) {
      alignment.push(...levelMatches);
    }

    return [...new Set(alignment)]; // Remove duplicates
  }

  private static extractLearningObjectives(content: string): string[] {
    const objectives: string[] = [];

    // Look for learning objectives section
    const objectivesSection = content.match(
      /(?:Learning Objectives?|Objectives?):?\s*\n([\s\S]*?)(?:\n\n|\n---)/i,
    );
    if (objectivesSection) {
      const lines = objectivesSection[1].split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.match(/^\d+\./)) {
          objectives.push(trimmed.replace(/^[-•\d.\s]+/, '').trim());
        }
      }
    }

    return objectives;
  }

  private static extractCulturalContent(content: string): ResourceMetadata['culturalContent'] {
    const hasMaoriContent = /māori|maori|te\s+reo|tikanga|iwi|hapū|whānau|aotearoa/i.test(content);

    let tikangaElements: string[] = [];
    if (hasMaoriContent) {
      const tikangaPattern = /(?:tikanga|cultural)\s+elements?:?\s*([^\n]+)/i;
      const match = content.match(tikangaPattern);
      if (match) {
        tikangaElements = match[1]
          .split(/[,;]/)
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    const requiresIwiReview = /iwi\s+review|consultation|🔴|critical/i.test(content);

    return {
      hasMaoriContent,
      tikangaElements: tikangaElements.length > 0 ? tikangaElements : undefined,
      requiresIwiReview,
    };
  }

  private static generateTags(content: string, subject: string, yearLevel: string): string[] {
    const tags: string[] = [subject.toLowerCase(), yearLevel.toLowerCase()];

    // Add content-based tags
    const contentTags = [
      { pattern: /interactive|activity|hands-on/i, tag: 'interactive' },
      { pattern: /assessment|test|quiz|evaluation/i, tag: 'assessment' },
      { pattern: /group work|collaboration|team/i, tag: 'collaborative' },
      { pattern: /māori|cultural|tikanga/i, tag: 'cultural' },
      { pattern: /real.world|authentic|practical/i, tag: 'practical' },
      { pattern: /differentiat|adapt|scaffold/i, tag: 'differentiated' },
      { pattern: /digital|technology|online/i, tag: 'digital' },
    ];

    for (const { pattern, tag } of contentTags) {
      if (pattern.test(content)) {
        tags.push(tag);
      }
    }

    return [...new Set(tags)]; // Remove duplicates
  }

  private static inferDifficulty(
    yearLevel: string,
  ): 'beginner' | 'intermediate' | 'advanced' {
    // Extract year number
    const yearMatch = yearLevel.match(/(\d+)/);
    const year = yearMatch ? parseInt(yearMatch[1]) : 8;

    // Basic mapping by year level
    if (year <= 8) return 'beginner';
    if (year <= 10) return 'intermediate';
    return 'advanced';
  }

  private static createSearchableText(content: string, metadata: ResourceMetadata): string {
    const searchableFields = [
      metadata.title,
      metadata.subject,
      metadata.yearLevel,
      metadata.resourceType,
      metadata.curriculumArea,
      ...(metadata.learningObjectives || []),
      ...(metadata.tags || []),
      ...(metadata.nzcAlignment || []),
      content.replace(/[#*\-_]/g, ' ').replace(/\s+/g, ' '),
    ];

    return searchableFields.filter(Boolean).join(' ').toLowerCase();
  }

  private static extractPreview(content: string): string {
    // Extract first few lines of meaningful content
    const lines = content.split('\n');
    let preview = '';
    let foundContent = false;

    for (const line of lines) {
      const trimmed = line.trim();

      // Skip headers, metadata, and separators
      if (
        trimmed.startsWith('#') ||
        trimmed.startsWith('**') ||
        trimmed.startsWith('---') ||
        trimmed.startsWith('*Resource Type*') ||
        trimmed === ''
      ) {
        continue;
      }

      if (!foundContent && trimmed.length > 20) {
        foundContent = true;
        preview = trimmed;
        break;
      }
    }

    return preview || 'No preview available';
  }
}
