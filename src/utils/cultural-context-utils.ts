import { type CulturalContext } from '../types/cultural';

export const getCulturalGuidance = (context: CulturalContext): string[] => {
  const guidance: string[] = [];

  // Provide cultural guidance based on context
  if (context.culturalSafetyLevel === 'advanced') {
    guidance.push('Content includes deep cultural protocols and tikanga');
    guidance.push('Requires understanding of whakapapa and cultural connections');
  }

  if (context.teReoMode) {
    guidance.push('Content presented with Te Reo Māori integration');
    guidance.push('Cultural concepts explained in traditional context');
  }

  switch (context.preferredLearningStyle) {
    case 'visual':
      guidance.push('Visual representations and diagrams emphasized');
      break;
    case 'auditory':
      guidance.push('Audio explanations and kōrero (storytelling) included');
      break;
    case 'kinesthetic':
      guidance.push('Hands-on activities and interactive elements featured');
      break;
    case 'mixed':
      guidance.push('Multi-modal approach for comprehensive learning');
      break;
  }

  return guidance;
};
