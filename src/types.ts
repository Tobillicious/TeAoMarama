export interface EnrichedResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  description: string;
  culturalElements: number;
  [key: string]: unknown;
}

export interface QualityMetrics {
  qualityScore: number;
  culturalSafety: number;
  accessibility: number;
  educationalValue: number;
  culturalAuthenticity?: number;
  pedagogicalDepth?: number;
  progressiveIndex?: number;
  passesCompleted?: number;
  isComplete?: boolean;
}

export interface RealResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  type: 'handout' | 'lesson' | 'assessment' | 'activity' | 'unit-plan' | 'multimedia';
  filename?: string;
  path?: string;
  culturalElements: number;
  description: string;
  content?: unknown;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  qualityMetrics?: QualityMetrics;
}

export interface ActualLessonContent {
  title: string;
  subject: string;
  yearLevel: string;
  depth: string;
  description?: string;
  content?: string;
  culturalElements?: number;
  culturalContext?: string;
  learningObjectives?: string[];
  [key: string]: unknown;
}
