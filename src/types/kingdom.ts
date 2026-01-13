// 👑 KINGDOM TYPE DEFINITIONS
// Te Kura o TeAoMarama - TypeScript Definitions

export interface Teacher {
  id: string;
  name: string;
  email: string;
  school: string;
  subjects: string[];
  experience: string;
  subscription: SubscriptionTier;
  culturalProfile: CulturalProfile;
}

export interface Student {
  id: string;
  name: string;
  year: number;
  subjects: string[];
  progress: ProgressMetrics;
  culturalConnections: CulturalConnection[];
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  year: number;
  content: LessonContent;
  culturalElements: CulturalElement[];
  nzcAlignment: NZCAlignment;
  assessment: AssessmentCriteria;
}

export interface CulturalProfile {
  teReoLevel: 'beginner' | 'intermediate' | 'advanced' | 'fluent';
  culturalConnections: string[];
  tikangaKnowledge: string[];
  communityInvolvement: string[];
}

export interface ProgressMetrics {
  academic: number;
  cultural: number;
  social: number;
  emotional: number;
  overall: number;
}

export interface CulturalConnection {
  type: 'whakapapa' | 'whenua' | 'wairua' | 'tikanga';
  description: string;
  significance: string;
}

export interface CulturalElement {
  type: 'teReo' | 'tikanga' | 'whakapapa' | 'whenua' | 'wairua';
  content: string;
  context: string;
  significance: string;
}

export interface NZCAlignment {
  level: number;
  strands: string[];
  achievementObjectives: string[];
  keyCompetencies: string[];
}

export interface AssessmentCriteria {
  type: 'formative' | 'summative' | 'peer' | 'self';
  criteria: string[];
  rubrics: Rubric[];
}

export interface Rubric {
  level: 'notAchieved' | 'achieved' | 'merit' | 'excellence';
  description: string;
  indicators: string[];
}

export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'school' | 'enterprise';

export interface RevenueMetrics {
  monthlyRevenue: number;
  subscribers: number;
  conversionRate: number;
  churnRate: number;
  arpu: number;
}

export interface KingdomAIAgent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'maintenance';
  capabilities: string[];
  performance: PerformanceMetrics;
}

export interface PerformanceMetrics {
  efficiency: number;
  accuracy: number;
  culturalSafety: number;
  userSatisfaction: number;
}

// Kingdom-specific types
export interface KingdomStatus {
  totalAgents: number;
  activeAgents: number;
  coordinationLevel: number;
  culturalCompliance: number;
  revenueGrowth: number;
}

export interface OverseerCommand {
  id: string;
  type: 'deploy' | 'optimize' | 'coordinate' | 'analyze';
  target: string;
  parameters: Record<string, any>;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  timestamp: string;
}
