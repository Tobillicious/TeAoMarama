export interface EnrichedResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  description: string;
  culturalElements: number;
  [key: string]: any;
}

export interface RealResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  type: 'handout' | 'lesson' | 'assessment' | 'activity';
  filename: string;
  path: string;
  culturalElements: number;
  description: string;
  content?: any;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
}