/**
 * Content Validation and Enrichment Pipeline
 * 
 * This system validates, enriches, and quality-assures all migrated content:
 * - Curriculum alignment validation
 * - Cultural safety checks  
 * - Pedagogical Content Knowledge (PCK) enrichment
 * - Rich text identification and enhancement
 * - Assessment integration
 * - Scaffolding generation
 */

import fs from 'fs';
import path from 'path';

export interface ValidationResult {
  isValid: boolean;
  confidence: number;
  issues: ValidationIssue[];
  enrichments: EnrichmentSuggestion[];
  culturalFlags: CulturalFlag[];
  quality_score: number; // 0-1
}

export interface ValidationIssue {
  severity: 'critical' | 'major' | 'minor' | 'suggestion';
  category: 'curriculum' | 'cultural' | 'pedagogical' | 'accessibility' | 'technical';
  description: string;
  suggestion: string;
  auto_fixable: boolean;
}

export interface EnrichmentSuggestion {
  type: 'pck' | 'scaffolding' | 'differentiation' | 'assessment' | 'cultural_connection' | 'rich_text';
  description: string;
  implementation: string;
  priority: 'high' | 'medium' | 'low';
  estimated_impact: number; // 0-1
}

export interface CulturalFlag {
  type: 'te_reo_usage' | 'tikanga_reference' | 'cultural_sensitivity' | 'iwi_specific' | 'sacred_knowledge';
  severity: 'info' | 'review_needed' | 'iwi_consultation_required';
  description: string;
  recommendation: string;
}

export interface ContentItem {
  id: string;
  type: 'unit_plan' | 'lesson_plan' | 'handout' | 'activity' | 'game' | 'assessment';
  title: string;
  content: any;
  source: 'teketeako_migration' | 'generated' | 'human_created';
  curriculum_alignment: string[];
  year_level: number[];
  subject: string;
}

export class ContentValidationPipeline {
  private curriculumStandards: any;
  private culturalKeywords: string[];
  private qualityThresholds: { [key: string]: number };

  private teReoMacronMap: { [key: string]: string };

  constructor() {
    this.curriculumStandards = this.loadCurriculumStandards();
    this.culturalKeywords = [
      'māori', 'tikanga', 'kawa', 'marae', 'iwi', 'hapū', 'whānau', 'whakapapa',
      'mana', 'tapu', 'noa', 'utu', 'manaakitanga', 'wairuatanga', 'kotahitanga',
      'purakau', 'kōrero', 'waiata', 'haka', 'karakia', 'hongi', 'pōwhiri',
      'tangata whenua', 'tino rangatiratanga', 'te tiriti', 'waitangi'
    ];
    this.qualityThresholds = {
      curriculum_alignment: 0.8,
      cultural_safety: 0.9,
      pedagogical_quality: 0.7,
      accessibility: 0.8,
      overall_quality: 0.75
    };
    this.teReoMacronMap = {
      'maori': 'māori',
      'whanau': 'whānau',
      'korero': 'kōrero',
      'waiata': 'waiata',
      'karakia': 'karakia',
      'powhiri': 'pōwhiri',
      'aroha': 'aroha',
      'mana': 'mana',
      'tapu': 'tapu',
      'iwi': 'iwi',
      'hapu': 'hapū',
      'reo': 'reo',
      'kai': 'kai',
      'pakeha': 'pākehā'
    };
  }

  async validateContent(item: ContentItem): Promise<ValidationResult> {
    console.log(`🔍 Validating ${item.type}: ${item.title}`);

    const result: ValidationResult = {
      isValid: true,
      confidence: 1.0,
      issues: [],
      enrichments: [],
      culturalFlags: [],
      quality_score: 0
    };

    // Run all validation checks
    await Promise.all([
      this.validateCurriculumAlignment(item, result),
      this.validateCulturalSafety(item, result),
      this.validatePedagogicalQuality(item, result),
      this.validateAccessibility(item, result),
      this.identifyEnrichmentOpportunities(item, result)
    ]);

    // Calculate overall quality score
    result.quality_score = this.calculateQualityScore(result);
    
    // Determine if content is valid
    result.isValid = result.quality_score >= this.qualityThresholds.overall_quality &&
                     !result.issues.some(i => i.severity === 'critical');

    console.log(`   Quality Score: ${(result.quality_score * 100).toFixed(1)}%`);
    console.log(`   Issues: ${result.issues.length}, Enrichments: ${result.enrichments.length}, Cultural Flags: ${result.culturalFlags.length}`);

    return result;
  }

  private async validateCurriculumAlignment(item: ContentItem, result: ValidationResult): Promise<void> {
    if (!item.curriculum_alignment || item.curriculum_alignment.length === 0) {
      result.issues.push({
        severity: 'critical',
        category: 'curriculum',
        description: 'No curriculum alignment specified',
        suggestion: 'Map content to specific NZC/Te Mātaiaho/NZ Histories standards',
        auto_fixable: false
      });
      return;
    }

    // Check if aligned standards exist in our curriculum database
    const validStandards = item.curriculum_alignment.filter(standardId => 
      this.curriculumStandards.some((s: any) => s.id === standardId)
    );

    if (validStandards.length < item.curriculum_alignment.length) {
      result.issues.push({
        severity: 'major',
        category: 'curriculum',
        description: 'Some curriculum alignments reference invalid standard IDs',
        suggestion: 'Update alignment to use valid curriculum standard identifiers',
        auto_fixable: true
      });
    }

    // Check for explicit learning progressions
    if (item.type === 'unit_plan' && !this.hasExplicitProgressions(item.content)) {
      result.enrichments.push({
        type: 'pck',
        description: 'Add explicit learning progressions showing how understanding builds',
        implementation: 'Include progression statements for key concepts and skills',
        priority: 'high',
        estimated_impact: 0.8
      });
    }
  }

  private async validateCulturalSafety(item: ContentItem, result: ValidationResult): Promise<void> {
    const content_text = JSON.stringify(item.content).toLowerCase();
    
    // Check for cultural keywords that need review
    this.culturalKeywords.forEach(keyword => {
      if (content_text.includes(keyword)) {
        const severity = this.getCulturalSeverity(keyword);
        result.culturalFlags.push({
          type: this.getCulturalType(keyword),
          severity,
          description: `Content references "${keyword}" - cultural review recommended`,
          recommendation: severity === 'iwi_consultation_required' ? 
            'Consult with local iwi before publishing' :
            'Review for cultural accuracy and appropriateness'
        });
      }
    });

    // Check for te reo usage without macrons
    const teReoWithoutMacrons = this.detectTeReoWithoutMacrons(content_text);
    if (teReoWithoutMacrons.length > 0) {
      result.issues.push({
        severity: 'major',
        category: 'cultural',
        description: `Te reo Māori words missing macrons: ${teReoWithoutMacrons.join(', ')}`,
        suggestion: 'Add appropriate macrons to te reo Māori words for correct pronunciation',
        auto_fixable: true
      });
    }

    // Check for cultural perspectives inclusion
    if ((item.subject === 'Social Studies' || item.subject === 'Aotearoa New Zealand Histories') 
        && !this.hasCulturalPerspectives(item.content)) {
      result.enrichments.push({
        type: 'cultural_connection',
        description: 'Include mātauranga Māori and diverse cultural perspectives',
        implementation: 'Add perspective analysis activities and cultural context information',
        priority: 'high',
        estimated_impact: 0.9
      });
    }
  }

  private async validatePedagogicalQuality(item: ContentItem, result: ValidationResult): Promise<void> {
    // Check for scaffolding strategies
    if (!this.hasAdequateScaffolding(item.content)) {
      result.enrichments.push({
        type: 'scaffolding',
        description: 'Add scaffolding strategies for diverse learners',
        implementation: 'Include graphic organizers, sentence starters, model examples',
        priority: 'high',
        estimated_impact: 0.7
      });
    }

    // Check for differentiation approaches
    if (!this.hasDifferentiation(item.content)) {
      result.enrichments.push({
        type: 'differentiation',
        description: 'Add differentiation for multiple ability levels',
        implementation: 'Include support activities, extension tasks, and choice options',
        priority: 'medium',
        estimated_impact: 0.6
      });
    }

    // Check for assessment integration
    if (item.type === 'lesson_plan' && !this.hasFormativeAssessment(item.content)) {
      result.issues.push({
        severity: 'major',
        category: 'pedagogical',
        description: 'Lesson lacks formative assessment strategies',
        suggestion: 'Add exit tickets, quick checks, or peer feedback opportunities',
        auto_fixable: false
      });
    }

    // Check for "What a good one looks like" examples
    if (item.type === 'lesson_plan' && !this.hasExemplars(item.content)) {
      result.enrichments.push({
        type: 'pck',
        description: 'Add "What a good one looks like" examples',
        implementation: 'Include exemplars and success criteria with visual examples',
        priority: 'high',
        estimated_impact: 0.8
      });
    }
  }

  private async validateAccessibility(item: ContentItem, result: ValidationResult): Promise<void> {
    // Check reading level appropriateness
    const readingLevel = this.assessReadingLevel(item.content);
    if (readingLevel > item.year_level[0] + 2) { // More than 2 years above year level
      result.issues.push({
        severity: 'major',
        category: 'accessibility',
        description: `Reading level too high for target year level`,
        suggestion: 'Simplify language while maintaining academic rigor',
        auto_fixable: true
      });
    }

    // Check for visual supports
    if (!this.hasVisualSupports(item.content)) {
      result.enrichments.push({
        type: 'scaffolding',
        description: 'Add visual supports for diverse learners',
        implementation: 'Include diagrams, graphic organizers, or visual vocabulary',
        priority: 'medium',
        estimated_impact: 0.5
      });
    }

    // Check for multiple means of representation/engagement/expression
    if (!this.hasUDLPrinciples(item.content)) {
      result.enrichments.push({
        type: 'differentiation',
        description: 'Apply Universal Design for Learning principles',
        implementation: 'Provide multiple ways to access, engage with, and express learning',
        priority: 'medium',
        estimated_impact: 0.6
      });
    }
  }

  private async identifyEnrichmentOpportunities(item: ContentItem, result: ValidationResult): Promise<void> {
    // Identify opportunities for rich texts
    if (item.subject === 'Mathematics' && !this.hasRichMathematicalTexts(item.content)) {
      result.enrichments.push({
        type: 'rich_text',
        description: 'Add rich mathematical texts with multiple uses',
        implementation: 'Include real-world graphs, tables, or statistics that can be used in multiple ways',
        priority: 'high',
        estimated_impact: 0.8
      });
    }

    // Research Inquiry Project opportunities
    if (item.type === 'unit_plan' && !this.hasResearchInquiry(item.content)) {
      result.enrichments.push({
        type: 'assessment',
        description: 'Add Research Inquiry Project component',
        implementation: 'Design scaffolded inquiry project with community connections',
        priority: 'high',
        estimated_impact: 0.9
      });
    }

    // Local context connections
    if (!this.hasLocalConnections(item.content)) {
      result.enrichments.push({
        type: 'cultural_connection',
        description: 'Connect to local community and context',
        implementation: 'Add local examples, community connections, or place-based learning',
        priority: 'medium',
        estimated_impact: 0.7
      });
    }
  }

  // Auto-enrichment methods
  async enrichContent(item: ContentItem, enrichments: EnrichmentSuggestion[]): Promise<ContentItem> {
    console.log(`🔧 Enriching ${item.type}: ${item.title}`);
    
    const enrichedItem = { ...item };
    
    for (const enrichment of enrichments.filter(e => e.priority === 'high')) {
      switch (enrichment.type) {
        case 'scaffolding':
          enrichedItem.content = await this.addScaffolding(enrichedItem.content);
          break;
        case 'differentiation':
          enrichedItem.content = await this.addDifferentiation(enrichedItem.content);
          break;
        case 'assessment':
          enrichedItem.content = await this.addAssessmentStrategies(enrichedItem.content);
          break;
        case 'rich_text':
          enrichedItem.content = await this.addRichTexts(enrichedItem.content, item.subject);
          break;
        case 'cultural_connection':
          enrichedItem.content = await this.addCulturalConnections(enrichedItem.content, item.subject);
          break;
      }
    }

    console.log(`   ✅ Applied ${enrichments.filter(e => e.priority === 'high').length} high-priority enrichments`);
    return enrichedItem;
  }

  // Helper methods (implementations would be more detailed)
  private loadCurriculumStandards(): any {
    try {
      const data = fs.readFileSync('./migration/CURRICULUM_EXTRACTION_LOG.json', 'utf8');
      return JSON.parse(data).standards;
    } catch (error) {
      console.warn('Could not load curriculum standards, using empty array');
      return [];
    }
  }

  private calculateQualityScore(result: ValidationResult): number {
    let score = 1.0;
    
    // Deduct for issues
    result.issues.forEach(issue => {
      switch (issue.severity) {
        case 'critical': score -= 0.3; break;
        case 'major': score -= 0.15; break;
        case 'minor': score -= 0.05; break;
      }
    });

    // Boost for enrichment potential
    const highImpactEnrichments = result.enrichments.filter(e => e.estimated_impact > 0.7);
    score += highImpactEnrichments.length * 0.05;

    return Math.max(0, Math.min(1, score));
  }

  private getCulturalSeverity(keyword: string): CulturalFlag['severity'] {
    const highSensitivity = ['tapu', 'sacred', 'karakia', 'marae'];
    const mediumSensitivity = ['tikanga', 'iwi', 'whakapapa'];
    
    if (highSensitivity.includes(keyword)) return 'iwi_consultation_required';
    if (mediumSensitivity.includes(keyword)) return 'review_needed';
    return 'info';
  }

  private getCulturalType(keyword: string): CulturalFlag['type'] {
    if (['iwi', 'hapū', 'whānau'].includes(keyword)) return 'iwi_specific';
    if (['tapu', 'karakia', 'sacred'].includes(keyword)) return 'sacred_knowledge';
    if (['tikanga', 'kawa', 'mana'].includes(keyword)) return 'tikanga_reference';
    return 'cultural_sensitivity';
  }

  // Placeholder helper methods (would be implemented with more sophistication)
  private hasExplicitProgressions(content: any): boolean { return false; }
  private detectTeReoWithoutMacrons(text: string): string[] {
    const missingMacrons: string[] = [];
    for (const plain in this.teReoMacronMap) {
      const macron = this.teReoMacronMap[plain];
      // Word boundary regex to avoid matching parts of words
      const plainRegex = new RegExp(`\b${plain}\b`, 'gi');
      const macronRegex = new RegExp(`\b${macron}\b`, 'gi');
      
      if (plainRegex.test(text) && !macronRegex.test(text)) {
        missingMacrons.push(plain);
      }
    }
    return missingMacrons;
  }
  private hasCulturalPerspectives(content: any): boolean { return false; }
  private hasAdequateScaffolding(content: any): boolean {
    const contentString = JSON.stringify(content).toLowerCase();
    const scaffoldingKeywords = [
      'scaffold', 'graphic organizer', 'sentence starter', 'writing frame',
      'checklist', 'step-by-step', 'guided practice', 'vocabulary list'
    ];
    return scaffoldingKeywords.some(keyword => contentString.includes(keyword));
  }
  private hasDifferentiation(content: any): boolean {
    const contentString = JSON.stringify(content).toLowerCase();
    const differentiationKeywords = [
      'differentiation', 'extension task', 'support activity', 'for all learners',
      'for all abilities', 'choice board', 'tiered activity'
    ];
    return differentiationKeywords.some(keyword => contentString.includes(keyword));
  }
  private hasFormativeAssessment(content: any): boolean {
    const contentString = JSON.stringify(content).toLowerCase();
    const assessmentKeywords = [
      'formative assessment', 'exit ticket', 'success criteria', 'learning intentions',
      'walt', 'wala', 'quick check', 'peer feedback', 'self-assessment'
    ];
    return assessmentKeywords.some(keyword => contentString.includes(keyword));
  }
  private hasExemplars(content: any): boolean {
    const contentString = JSON.stringify(content).toLowerCase();
    const exemplarKeywords = [
      'exemplar', 'w.a.g.o.l.l', 'wagoll', 'what a good one looks like',
      'model answer', 'example', 'sample response'
    ];
    return exemplarKeywords.some(keyword => contentString.includes(keyword));
  }
  private assessReadingLevel(content: any): number { return 8; }
  private hasVisualSupports(content: any): boolean { return false; }
  private hasUDLPrinciples(content: any): boolean { return false; }
  private hasRichMathematicalTexts(content: any): boolean { return false; }
  private hasResearchInquiry(content: any): boolean { return false; }
  private hasLocalConnections(content: any): boolean { return false; }

  private async addScaffolding(content: any): Promise<any> { return content; }
  private async addDifferentiation(content: any): Promise<any> { return content; }
  private async addAssessmentStrategies(content: any): Promise<any> { return content; }
  private async addRichTexts(content: any, subject: string): Promise<any> { return content; }
  private async addCulturalConnections(content: any, subject: string): Promise<any> { return content; }
}

// Factory function for pipeline usage
export async function validateAndEnrichContent(item: ContentItem): Promise<{ 
  validationResult: ValidationResult; 
  enrichedItem: ContentItem; 
}> {
  const pipeline = new ContentValidationPipeline();
  const validationResult = await pipeline.validateContent(item);
  
  // Only enrich if validation passes basic quality
  let enrichedItem = item;
  if (validationResult.quality_score > 0.5) {
    enrichedItem = await pipeline.enrichContent(item, validationResult.enrichments);
  }

  return { validationResult, enrichedItem };
}