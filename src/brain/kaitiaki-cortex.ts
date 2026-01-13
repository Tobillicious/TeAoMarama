/**
 * 🧠 KAITIAKI ARONUI CORTEX - CONTENT PROCESSING BRAIN
 * 
 * The Cortex is responsible for processing educational content and extracting
 * structured knowledge with cultural safety and NZ Curriculum alignment.
 * 
 * Based on the ancient te-kete-ako-clean brain system documentation.
 */

export interface ContentExtractionResult {
  id: string;
  title: string;
  content: string;
  extractedKnowledge: KnowledgeNode[];
  culturalContext: CulturalContext;
  curriculumAlignment: CurriculumAlignment;
  qualityScore: number;
  timestamp: Date;
}

export interface KnowledgeNode {
  id: string;
  concept: string;
  relationships: string[];
  culturalSignificance: string;
  educationalValue: number;
  confidence: number;
}

export interface CulturalContext {
  teReoUsage: string[];
  tikangaElements: string[];
  culturalSafety: 'excellent' | 'good' | 'needs_improvement' | 'poor';
  manaakitanga: boolean;
  kaitiakitanga: boolean;
  whanaungatanga: boolean;
}

export interface CurriculumAlignment {
  subjects: string[];
  levels: string[];
  competencies: string[];
  learningOutcomes: string[];
  alignmentScore: number;
}

export class KaitiakiCortex {
  private apiKey: string;
  private baseUrl: string = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || this.getGLMApiKey();
  }

  private getGLMApiKey(): string {
    // Try multiple sources for API key
    if (typeof process !== 'undefined' && process.env) {
      return process.env.VITE_GLM_API_KEY || '';
    }
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env.VITE_GLM_API_KEY || '';
    }
    if (typeof window !== 'undefined') {
      return localStorage.getItem('GLM_API_KEY') || '';
    }
    return '';
  }

  /**
   * 🧠 EXTRACT KNOWLEDGE FROM CONTENT
   */
  async extractKnowledge(content: string, title: string): Promise<ContentExtractionResult> {
    console.log('🧠 Kaitiaki Cortex processing content:', title);

    try {
      // Use GLM for intelligent content analysis
      const analysis = await this.analyzeWithGLM(content, title);
      
      // Extract cultural context
      const culturalContext = this.extractCulturalContext(content, analysis);
      
      // Determine curriculum alignment
      const curriculumAlignment = this.analyzeCurriculumAlignment(content, analysis);
      
      // Generate knowledge nodes
      const extractedKnowledge = this.generateKnowledgeNodes(analysis);
      
      // Calculate quality score
      const qualityScore = this.calculateQualityScore(
        culturalContext,
        curriculumAlignment,
        extractedKnowledge
      );

      const result: ContentExtractionResult = {
        id: this.generateId(),
        title,
        content,
        extractedKnowledge,
        culturalContext,
        curriculumAlignment,
        qualityScore,
        timestamp: new Date()
      };

      console.log('✅ Kaitiaki Cortex extraction complete:', {
        knowledgeNodes: extractedKnowledge.length,
        culturalSafety: culturalContext.culturalSafety,
        curriculumScore: curriculumAlignment.alignmentScore,
        qualityScore
      });

      return result;

    } catch (error) {
      console.error('❌ Kaitiaki Cortex extraction failed:', error);
      throw error;
    }
  }

  /**
   * 🤖 ANALYZE CONTENT WITH GLM
   */
  private async analyzeWithGLM(content: string, title: string): Promise<any> {
    if (!this.apiKey) {
      console.warn('⚠️ No GLM API key, using fallback analysis');
      return this.fallbackAnalysis(content, title);
    }

    const prompt = `
Analyze this educational content for Te Ao Mārama Platform:

Title: ${title}
Content: ${content.substring(0, 2000)}...

Please provide:
1. Key educational concepts and their relationships
2. Cultural elements and Te Reo Māori usage
3. NZ Curriculum alignment (subjects, levels, competencies)
4. Cultural safety assessment
5. Educational value and learning outcomes
6. Recommendations for improvement

Format as JSON with detailed analysis.
`;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'glm-4',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`GLM API error: ${response.status}`);
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content || '{}');

    } catch (error) {
      console.error('GLM analysis failed, using fallback:', error);
      return this.fallbackAnalysis(content, title);
    }
  }

  /**
   * 🔄 FALLBACK ANALYSIS WITHOUT GLM
   */
  private fallbackAnalysis(content: string, title: string): any {
    // Basic keyword extraction and analysis
    const words = content.toLowerCase().split(/\s+/);
    const teReoWords = words.filter(word => this.isTeReoWord(word));
    const educationalKeywords = words.filter(word => this.isEducationalKeyword(word));

    return {
      concepts: educationalKeywords.slice(0, 10),
      culturalElements: teReoWords.slice(0, 5),
      curriculumAlignment: {
        subjects: this.guessSubjects(content),
        levels: this.guessLevels(content),
        competencies: ['thinking', 'using language', 'managing self']
      },
      culturalSafety: teReoWords.length > 0 ? 'good' : 'needs_improvement',
      educationalValue: Math.min(100, educationalKeywords.length * 10),
      recommendations: ['Add more Te Reo Māori integration', 'Enhance cultural context']
    };
  }

  /**
   * 🌿 EXTRACT CULTURAL CONTEXT
   */
  private extractCulturalContext(content: string, analysis: any): CulturalContext {
    const teReoWords = this.extractTeReoWords(content);
    const tikangaElements = this.extractTikangaElements(content, analysis);

    return {
      teReoUsage: teReoWords,
      tikangaElements,
      culturalSafety: this.assessCulturalSafety(content, analysis),
      manaakitanga: this.hasManaakitanga(content),
      kaitiakitanga: this.hasKaitiakitanga(content),
      whanaungatanga: this.hasWhanaungatanga(content)
    };
  }

  /**
   * 📚 ANALYZE CURRICULUM ALIGNMENT
   */
  private analyzeCurriculumAlignment(content: string, analysis: any): CurriculumAlignment {
    const subjects = this.identifySubjects(content, analysis);
    const levels = this.identifyLevels(content, analysis);
    const competencies = this.identifyCompetencies(content, analysis);
    const learningOutcomes = this.identifyLearningOutcomes(content, analysis);

    return {
      subjects,
      levels,
      competencies,
      learningOutcomes,
      alignmentScore: this.calculateAlignmentScore(subjects, levels, competencies)
    };
  }

  /**
   * 🧬 GENERATE KNOWLEDGE NODES
   */
  private generateKnowledgeNodes(analysis: any): KnowledgeNode[] {
    const concepts = analysis.concepts || [];
    
    return concepts.map((concept: string, index: number) => ({
      id: `knowledge-${index}`,
      concept,
      relationships: this.findRelationships(concept, concepts),
      culturalSignificance: this.assessCulturalSignificance(concept),
      educationalValue: Math.min(100, Math.random() * 100),
      confidence: Math.min(100, Math.random() * 100)
    }));
  }

  /**
   * 📊 CALCULATE QUALITY SCORE
   */
  private calculateQualityScore(
    culturalContext: CulturalContext,
    curriculumAlignment: CurriculumAlignment,
    knowledgeNodes: KnowledgeNode[]
  ): number {
    const culturalScore = this.culturalSafetyScore(culturalContext.culturalSafety);
    const curriculumScore = curriculumAlignment.alignmentScore;
    const knowledgeScore = knowledgeNodes.length > 0 ? 80 : 20;
    
    return Math.round((culturalScore + curriculumScore + knowledgeScore) / 3);
  }

  // Helper methods
  private generateId(): string {
    return `cortex-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private isTeReoWord(word: string): boolean {
    const teReoWords = ['māori', 'tikanga', 'manaakitanga', 'kaitiakitanga', 'whanaungatanga', 'aroha', 'mana', 'tapu', 'noa'];
    return teReoWords.some(teReo => word.includes(teReo));
  }

  private isEducationalKeyword(word: string): boolean {
    const educationalWords = ['learn', 'teach', 'education', 'student', 'teacher', 'knowledge', 'skill', 'competency'];
    return educationalWords.some(edu => word.includes(edu));
  }

  private guessSubjects(content: string): string[] {
    const subjects = [];
    if (content.includes('math') || content.includes('number')) subjects.push('Mathematics');
    if (content.includes('read') || content.includes('write')) subjects.push('English');
    if (content.includes('science') || content.includes('experiment')) subjects.push('Science');
    return subjects.length > 0 ? subjects : ['General'];
  }

  private guessLevels(content: string): string[] {
    const levels = [];
    if (content.includes('year 1') || content.includes('year 2')) levels.push('Year 1-2');
    if (content.includes('year 3') || content.includes('year 4')) levels.push('Year 3-4');
    if (content.includes('year 5') || content.includes('year 6')) levels.push('Year 5-6');
    return levels.length > 0 ? levels : ['Primary'];
  }

  private extractTeReoWords(content: string): string[] {
    const teReoPatterns = /\b(māori|tikanga|manaakitanga|kaitiakitanga|whanaungatanga|aroha|mana|tapu|noa|kōrero|ako|mātauranga)\b/gi;
    return content.match(teReoPatterns) || [];
  }

  private extractTikangaElements(content: string, analysis: any): string[] {
    return analysis.culturalElements || [];
  }

  private assessCulturalSafety(content: string, analysis: any): 'excellent' | 'good' | 'needs_improvement' | 'poor' {
    const teReoCount = this.extractTeReoWords(content).length;
    const culturalElements = analysis.culturalElements?.length || 0;
    
    if (teReoCount > 5 && culturalElements > 3) return 'excellent';
    if (teReoCount > 2 && culturalElements > 1) return 'good';
    if (teReoCount > 0 || culturalElements > 0) return 'needs_improvement';
    return 'poor';
  }

  private hasManaakitanga(content: string): boolean {
    return content.toLowerCase().includes('manaakitanga') || content.toLowerCase().includes('hospitality');
  }

  private hasKaitiakitanga(content: string): boolean {
    return content.toLowerCase().includes('kaitiakitanga') || content.toLowerCase().includes('guardianship');
  }

  private hasWhanaungatanga(content: string): boolean {
    return content.toLowerCase().includes('whanaungatanga') || content.toLowerCase().includes('relationships');
  }

  private identifySubjects(content: string, analysis: any): string[] {
    return analysis.curriculumAlignment?.subjects || this.guessSubjects(content);
  }

  private identifyLevels(content: string, analysis: any): string[] {
    return analysis.curriculumAlignment?.levels || this.guessLevels(content);
  }

  private identifyCompetencies(content: string, analysis: any): string[] {
    return analysis.curriculumAlignment?.competencies || ['thinking', 'using language', 'managing self'];
  }

  private identifyLearningOutcomes(content: string, analysis: any): string[] {
    return analysis.learningOutcomes || ['Knowledge acquisition', 'Skill development'];
  }

  private calculateAlignmentScore(subjects: string[], levels: string[], competencies: string[]): number {
    return Math.min(100, (subjects.length * 20) + (levels.length * 15) + (competencies.length * 10));
  }

  private findRelationships(concept: string, allConcepts: string[]): string[] {
    return allConcepts.filter(c => c !== concept).slice(0, 3);
  }

  private assessCulturalSignificance(concept: string): string {
    if (this.isTeReoWord(concept)) return 'High cultural significance';
    return 'Educational significance';
  }

  private culturalSafetyScore(safety: string): number {
    switch (safety) {
      case 'excellent': return 100;
      case 'good': return 80;
      case 'needs_improvement': return 60;
      case 'poor': return 20;
      default: return 50;
    }
  }
}

// Export singleton instance
export const kaitiakiCortex = new KaitiakiCortex();
