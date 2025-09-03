export interface CulturalContext {
  teReoMode: boolean;
  culturalSafetyLevel: 'basic' | 'intermediate' | 'advanced';
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  culturalBackground: string;
  accessibilityNeeds: string[];
}
