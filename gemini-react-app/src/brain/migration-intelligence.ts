/**
 * Migration Intelligence System
 * Te Kete Ako Migration Brain - Cultural and pedagogical intelligence
 */

import { writeEpisode } from '../ai/provenance';
import { AgentRole, MigrationResource } from './great-migration-orchestrator';

export interface CulturalKnowledge {
  maoriContent: boolean;
  culturalSensitivity: 'low' | 'medium' | 'high' | 'critical';
  tikangaElements: string[];
  languageElements: {
    teReoMaori: boolean;
    bilingual: boolean;
    culturalTerms: string[];
  };
  traditionalKnowledge: boolean;
}

export interface TeachingContext {
  subject: string;
  _subject: string;
  nzCurriculumAlignment: string[];
  pedagogicalApproach: string[];
  learningObjectives: string[];
  assessmentCriteria: string[];
}

export interface MigrationIntelligenceData {
  resourceId: string;
  culturalAnalysis: CulturalKnowledge;
  pedagogicalContext: TeachingContext;
  migrationPriority: string;
  requiredReview: boolean;
  estimatedComplexity: number;
  recommendedAgent: string;
}

export class TeKeteAkoMigrationBrain {
  private intelligenceDatabase: Map<string, MigrationIntelligenceData>;
  private culturalSafetyProtocols: Map<string, boolean>;

  constructor() {
    this.intelligenceDatabase = new Map();
    this.culturalSafetyProtocols = new Map();
    this.initializeCulturalProtocols();
  }

  private initializeCulturalProtocols(): void {
    // Core cultural safety protocols
    this.culturalSafetyProtocols.set('maori-content-review', true);
    this.culturalSafetyProtocols.set('tikanga-validation', true);
    this.culturalSafetyProtocols.set('te-reo-accuracy', true);
    this.culturalSafetyProtocols.set('traditional-knowledge-respect', true);
    this.culturalSafetyProtocols.set('community-consultation', true);
  }

  async analyzeResource(resource: MigrationResource): Promise<MigrationIntelligenceData> {
    console.log(`🧠 Analyzing resource: ${resource.title}`);

    const culturalAnalysis = await this.performCulturalAnalysis(resource);
    const pedagogicalContext = await this.analyzePedagogicalContext(resource);

    const intelligence: MigrationIntelligenceData = {
      resourceId: resource.id,
      culturalAnalysis,
      pedagogicalContext,
      migrationPriority: this.determinePriority(resource, culturalAnalysis),
      requiredReview: this.determineRequiredReview(culturalAnalysis),
      estimatedComplexity: this.calculateComplexity(resource, culturalAnalysis),
      recommendedAgent: this.recommendAgent(resource, culturalAnalysis),
    };

    this.intelligenceDatabase.set(resource.id, intelligence);

    await writeEpisode('decision', {
      agent: 'TeKeteAkoMigrationBrain',
      context: {
        phase: 'resource-analysis',
        _details: {
          resourceId,
          title: resource.title,
          priority: intelligence.migrationPriority,
          complexity: intelligence.estimatedComplexity,
        },
        metadata: { culturalContent: culturalAnalysis.maoriContent },
      },
      outcome: {
        success: true,
        message: `Resource analysis complete - Priority: ${intelligence.migrationPriority}`,
        data: { intelligence },
      },
    });

    return intelligence;
  }

  private async performCulturalAnalysis(resource: MigrationResource): Promise<CulturalKnowledge> {
    // Simulate cultural analysis based on resource characteristics
    const hasMaoriContent =
      resource.culturalContent ||
      resource.title.toLowerCase().includes('māori') ||
      resource.title.toLowerCase().includes('aotearoa') ||
      resource.subject.toLowerCase().includes('social studies');

    return {
      maoriContent: hasMaoriContent,
      culturalSensitivity: hasMaoriContent ? 'high' : 'medium',
      tikangaElements: hasMaoriContent ? ['whakatōhea', 'manaakitanga', 'whakapapa'] : [],
      languageElements: {
        teReoMaori: hasMaoriContent,
        bilingual: hasMaoriContent,
        culturalTerms: hasMaoriContent ? ['tamariki', 'whānau', 'iwi'] : [],
      },
      traditionalKnowledge: hasMaoriContent && resource.subject.toLowerCase().includes('social'),
    };
  }

  private async analyzePedagogicalContext(resource: MigrationResource): Promise<TeachingContext> {
    return {
      yearLevel: resource.yearLevel,
      _subject: resource.subject,
      nzCurriculumAlignment: this.getNZCurriculumAlignment(resource.subject, resource.yearLevel),
      pedagogicalApproach: ['inquiry-based', 'culturally-responsive', 'collaborative'],
      learningObjectives: [`${resource.subject} understanding at ${resource.yearLevel} level`],
      assessmentCriteria: ['understanding', 'application', 'cultural-awareness'],
    };
  }

  private getNZCurriculumAlignment(subject: string): string[] {
    const alignments: Record<string, string[]> = {
      Mathematics: ['Number and Algebra', 'Geometry and Measurement', 'Statistics'],
      English: ['Speaking and Listening', 'Reading', 'Writing'],
      Science: ['Living World', 'Physical World', 'Material World', 'Planet Earth and Beyond'],
      'Social Studies': [
        'Identity Culture and Organisation',
        'Place and Environment',
        'Time Continuity and Change',
      ],
    };

    return alignments[subject] || ['General Curriculum'];
  }

  private determinePriority(
    resource: MigrationResource,
    cultural: CulturalKnowledge,
  ): 'urgent' | 'high' | 'medium' | 'low' {
    if (cultural.maoriContent && cultural.traditionalKnowledge) return 'urgent';
    if (cultural.culturalSensitivity === 'high') return 'high';
    if (resource.type === 'assessment') return 'high';
    return 'medium';
  }

  private determineRequiredReview(
    cultural: CulturalKnowledge,
  ): 'cultural' | 'pedagogical' | 'technical' | 'none' {
    if (cultural.maoriContent || cultural.traditionalKnowledge) return 'cultural';
    return 'pedagogical';
  }

  private calculateComplexity(resource: MigrationResource, cultural: CulturalKnowledge): number {
    let complexity = 3; // Base complexity

    if (cultural.maoriContent) complexity += 3;
    if (cultural.traditionalKnowledge) complexity += 2;
    if (resource.type === 'multimedia') complexity += 2;
    if (cultural.culturalSensitivity === 'critical') complexity += 3;

    return Math.min(complexity, 10);
  }

  private recommendAgent(resource: MigrationResource, cultural: CulturalKnowledge): string {
    if (cultural.maoriContent && cultural.traditionalKnowledge)
      return 'Kaitiaki-Cultural-Specialist';
    if (resource.type === 'assessment') return 'GPT-4.1-Assessment-Expert';
    if (resource.type === 'multimedia') return 'Gemini-Multimodal-Specialist';
    return 'General-Migration-Agent';
  }

  getIntelligence(resourceId: string): MigrationIntelligence | undefined {
    return this.intelligenceDatabase.get(resourceId);
  }

  getAllIntelligence(): MigrationIntelligence[] {
    return Array.from(this.intelligenceDatabase.values());
  }

  getCulturalSafetyStatus(): { protocol: string; active: boolean }[] {
    return Array.from(this.culturalSafetyProtocols.entries()).map(([protocol, active]) => ({
      protocol,
      active,
    }));
  }
}

export class MigrationOrchestrator {
  private brain: TeKeteAkoMigrationBrain;
  private activeAgents: Map<string, AgentRole>;

  constructor() {
    this.brain = new TeKeteAkoMigrationBrain();
    this.activeAgents = new Map();
  }

  async processResource(resource: MigrationResource): Promise<MigrationIntelligence> {
    return await this.brain.analyzeResource(resource);
  }

  registerAgent(agent: AgentRole): void {
    this.activeAgents.set(agent.name, agent);
    console.log(`🤖 Agent registered: ${agent.name} - ${agent.capability}`);
  }

  getRecommendation(
    resourceId: string,
  ): { agent: string; priority: string; complexity: number } | null {
    const intelligence = this.brain.getIntelligence(resourceId);
    if (!intelligence) return null;

    return {
      agent: intelligence.recommendedAgent,
      priority: intelligence.migrationPriority,
      complexity: intelligence.estimatedComplexity,
    };
  }

  getBrainStatus(): {
    totalAnalyzed: number;
    culturalProtocols: { protocol: string; active: boolean }[];
    activeAgents: string[];
  } {
    return {
      totalAnalyzed: this.brain.getAllIntelligence().length,
      culturalProtocols: this.brain.getCulturalSafetyStatus(),
      activeAgents: Array.from(this.activeAgents.keys()),
    };
  }
}

// Global migration brain instance
const globalMigrationBrain = new TeKeteAkoMigrationBrain();
const globalMigrationOrchestrator = new MigrationOrchestrator();

export { globalMigrationBrain, globalMigrationOrchestrator };
