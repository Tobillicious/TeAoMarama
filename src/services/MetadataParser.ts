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
    tikangaElements?: string[];
  };
  tags: string[];
  difficulty: string;
}

export interface ParsedResource {
  id: string;
  title: string;
  relativePath: string;
  category: string;
  sizeBytes: number;
  modifiedAt: string;
  metadata: ResourceMetadata;
  searchableText?: string;
  preview?: string;
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

  private static readonly CULTURAL_SAFETY_PATTERNS = {
    consultation: /sacred|tapu|whakapapa|karakia|waiata|haka|marae|tangi/i,
    review: /māori|maori|iwi|hapu|whanau|tikanga|kawa|mana/i,
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
    const yearLevel = [
      this.extractMetadataField(content, 'Year Level') || this.inferYearLevel(content),
    ];
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
    const tags = this.generateTags(content, subject, yearLevel[0] || 'Mixed Levels');

    // Infer difficulty level
    const difficulty = this.inferDifficulty(yearLevel[0] || 'Mixed Levels');

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
   * Parse resources from index.json with enhanced metadata (optimized for performance)
   */
  static async parseResourcesFromIndex(
    indexPath: string = '/resources/index.json',
  ): Promise<ParsedResource[]> {
    try {
      console.log(`🔄 Loading resource index from ${indexPath}`);
      
      // Handle both browser and Node.js environments
      const url = indexPath.startsWith('http') ? indexPath : 
        (typeof window !== 'undefined' ? indexPath : `http://localhost:5173${indexPath}`);
      
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to load ${indexPath}: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`📊 Raw index data:`, { 
        hasItems: !!data.items, 
        itemsCount: data.items?.length || 0,
        generatedAt: data.generatedAt 
      });
      
      const items = Array.isArray(data.items) ? data.items : [];
      if (items.length === 0) {
        console.warn('⚠️ No items found in index.json');
        return [];
      }

      const parsedResources: ParsedResource[] = [];

      // OPTIMIZED: Use metadata from filename and title instead of fetching each file
      for (const item of items) {
        try {
          // Extract metadata from filename and title (much faster than fetching files)
          const metadata = this.parseMetadataFromFilename(item.title, item.relativePath, item.category);

          const parsedResource: ParsedResource = {
            ...item,
            metadata,
            searchableText: this.createSearchableTextFromBasicInfo(item.title, metadata),
            preview: this.generatePreviewFromTitle(item.title),
          };

          parsedResources.push(parsedResource);
        } catch (error) {
          console.warn(`Failed to parse resource ${item.relativePath}:`, error);
          // Add basic resource with minimal metadata
          const basicMetadata: ResourceMetadata = {
            title: item.title,
            subject: this.inferSubject(item.title),
            yearLevel: [this.inferYearLevel(item.title)],
            resourceType: this.inferResourceType(item.category, item.relativePath),
            culturalSafetyLevel: 'clean',
            culturalSafetyIcon: '🟢',
            nzcAlignment: [],
            learningObjectives: [],
            culturalContent: {
              hasMaoriContent: this.detectMaoriContent(item.title),
              culturalSensitivityLevel: 'clean',
              iwiConsultation: false,
            },
            tags: this.generateTagsFromBasicInfo(item.title, item.category),
            difficulty: 'intermediate',
          };

          parsedResources.push({
            ...item,
            metadata: basicMetadata,
            searchableText: item.title,
            preview: this.generatePreviewFromTitle(item.title),
          });
        }
      }

      console.log(`✅ Successfully parsed ${parsedResources.length} resources`);
      return parsedResources;
    } catch (error) {
      console.error('❌ Failed to parse resources from index:', error);
      return [];
    }
  }

  /**
   * Parse metadata from filename and title (optimized approach)
   */
  private static parseMetadataFromFilename(
    title: string, 
    relativePath: string, 
    category: string
  ): ResourceMetadata {
    // Clean title
    const cleanTitle = title.replace(/^\*\*|\*\*$/g, '').trim();
    
    // Extract information from filename
    const filename = relativePath.split('/').pop() || '';
    const fullText = `${cleanTitle} ${filename} ${category}`;
    
    // Extract metadata using patterns
    const subject = this.extractSubjectFromText(fullText);
    const yearLevel = [this.extractYearLevelFromText(fullText)];
    const resourceType = this.inferResourceType(category, relativePath);
    
    // Cultural safety analysis
    const culturalSafety = this.analyzeCulturalSafetyFromText(fullText);
    
    // Generate tags and content analysis
    const tags = this.generateTagsFromBasicInfo(fullText, category);
    const hasMaoriContent = this.detectMaoriContent(fullText);
    
    return {
      title: cleanTitle,
      subject,
      yearLevel,
      resourceType,
      culturalSafetyLevel: culturalSafety.level,
      culturalSafetyIcon: culturalSafety.icon,
      nzcAlignment: this.extractNZCFromText(fullText),
      learningObjectives: [],
      culturalContent: {
        hasMaoriContent,
        culturalSensitivityLevel: hasMaoriContent ? 'review' : 'clean',
        iwiConsultation: culturalSafety.level === 'consultation',
      },
      tags,
      difficulty: this.inferDifficultyFromYearLevel(yearLevel[0]),
    };
  }

  // Helper methods for optimized parsing
  private static extractSubjectFromText(text: string): string {
    // Try to extract subject from filename patterns first
    const subjectPatterns = [
      /[_\s]Mathematics?[_\s]/i,
      /[_\s]Science[_\s]/i,
      /[_\s]English[_\s]/i,
      /[_\s]Social[\s_]Studies[_\s]/i,
      /[_\s]Te[\s_]Reo[_\s]/i,
      /[_\s]Technology[_\s]/i,
      /[_\s]Health[_\s]/i,
      /[_\s]Arts?[_\s]/i,
    ];
    
    for (const pattern of subjectPatterns) {
      if (pattern.test(text)) {
        const match = text.match(pattern);
        if (match) {
          return match[0].replace(/[_\s]/g, '').replace(/s$/, ''); // Clean up
        }
      }
    }
    
    // Fallback to general inference
    return this.inferSubject(text);
  }

  private static extractYearLevelFromText(text: string): string {
    // Look for Y7, Y8, Year 7, etc. patterns
    const yearPatterns = [
      /\bY(\d{1,2})\b/i,
      /\bYear[\s_](\d{1,2})\b/i,
    ];
    
    for (const pattern of yearPatterns) {
      const match = text.match(pattern);
      if (match) {
        return `Year ${match[1]}`;
      }
    }
    
    return this.inferYearLevel(text);
  }

  private static inferResourceType(category: string, path: string): string {
    const typeMap: Record<string, string> = {
      'handouts': 'Handout',
      'games': 'Activity',
      'assessments': 'Assessment',
      'lessons': 'Lesson Plan',
      'activities': 'Activity',
      'deepseek-generated': 'Resource'
    };
    
    // Check category first
    if (typeMap[category]) {
      return typeMap[category];
    }
    
    // Check filename patterns
    const filename = path.toLowerCase();
    if (filename.includes('activity')) return 'Activity';
    if (filename.includes('assessment')) return 'Assessment';
    if (filename.includes('lesson')) return 'Lesson Plan';
    if (filename.includes('handout')) return 'Handout';
    if (filename.includes('game')) return 'Activity';
    
    return 'Resource';
  }

  private static analyzeCulturalSafetyFromText(text: string): {
    level: 'clean' | 'review' | 'consultation';
    icon: string;
  } {
    // High sensitivity terms
    if (/\b(tapu|sacred|karakia|whakapapa|marae|tangi|waiata|haka)\b/i.test(text)) {
      return { level: 'consultation', icon: '🔴' };
    }
    
    // Medium sensitivity terms  
    if (/\b(māori|maori|iwi|hapū|whānau|tikanga|kawa|mana|aotearoa)\b/i.test(text)) {
      return { level: 'review', icon: '🟡' };
    }
    
    return { level: 'clean', icon: '🟢' };
  }

  private static extractNZCFromText(text: string): string[] {
    const nzcPattern = /\b[A-Z]\d+-\d+\b/g;
    const matches = text.match(nzcPattern) || [];
    return [...new Set(matches)];
  }

  private static detectMaoriContent(text: string): boolean {
    return /\b(māori|maori|te[\s_]reo|tikanga|iwi|hapū|whānau|aotearoa|pūrākau|kōrero)\b/i.test(text);
  }

  private static generateTagsFromBasicInfo(text: string, category: string): string[] {
    const tags: string[] = [category];
    
    const tagPatterns = [
      { pattern: /interactive|activity|hands-on/i, tag: 'interactive' },
      { pattern: /assessment|test|quiz/i, tag: 'assessment' },
      { pattern: /group|collaboration|team/i, tag: 'collaborative' },
      { pattern: /māori|cultural|tikanga/i, tag: 'cultural' },
      { pattern: /real.world|authentic|practical/i, tag: 'practical' },
      { pattern: /digital|technology|online/i, tag: 'digital' },
    ];
    
    for (const { pattern, tag } of tagPatterns) {
      if (pattern.test(text)) {
        tags.push(tag);
      }
    }
    
    return [...new Set(tags)];
  }

  private static createSearchableTextFromBasicInfo(title: string, metadata: ResourceMetadata): string {
    return [
      title,
      metadata.subject,
      metadata.yearLevel.join(' '),
      metadata.resourceType,
      ...metadata.tags,
    ].filter(Boolean).join(' ').toLowerCase();
  }

  private static generatePreviewFromTitle(title: string): string {
    // Clean and extract meaningful preview from title
    const cleanTitle = title.replace(/^\*\*|\*\*$|^#+\s*/g, '').trim();
    return cleanTitle.length > 100 ? cleanTitle.substring(0, 100) + '...' : cleanTitle;
  }

  private static inferDifficultyFromYearLevel(yearLevel: string): 'beginner' | 'intermediate' | 'advanced' {
    const yearMatch = yearLevel.match(/(\d+)/);
    const year = yearMatch ? parseInt(yearMatch[1]) : 8;
    
    if (year <= 8) return 'beginner';
    if (year <= 10) return 'intermediate';
    return 'advanced';
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
      culturalSensitivityLevel: hasMaoriContent ? 'review' : 'clean',
      iwiConsultation: requiresIwiReview,
      tikangaElements: tikangaElements.length > 0 ? tikangaElements : undefined,
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

  private static inferDifficulty(yearLevel: string): 'beginner' | 'intermediate' | 'advanced' {
    // Extract year number
    const yearMatch = yearLevel.match(/(\d+)/);
    const year = yearMatch ? parseInt(yearMatch[1]) : 8;

    // Basic mapping by year level
    if (year <= 8) return 'beginner';
    if (year <= 10) return 'intermediate';
    return 'advanced';
  }

}
