import React, { createContext, useContext, useState, useEffect } from 'react';

interface CulturalContext {
  teReoMode: boolean;
  culturalSafetyLevel: 'basic' | 'intermediate' | 'advanced';
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  culturalBackground: string;
  accessibilityNeeds: string[];
}

interface CulturalContextProviderProps {
  children: React.ReactNode;
  defaultContext?: Partial<CulturalContext>;
}

const CulturalContextContext = createContext<{
  context: CulturalContext;
  updateContext: (updates: Partial<CulturalContext>) => void;
  getCulturalGuidance: (contentType: string) => string[];
} | null>(null);

export function CulturalContextProvider({ 
  children, 
  defaultContext 
}: CulturalContextProviderProps) {
  const [context, setContext] = useState<CulturalContext>({
    teReoMode: false,
    culturalSafetyLevel: 'basic',
    preferredLearningStyle: 'mixed',
    culturalBackground: '',
    accessibilityNeeds: [],
    ...defaultContext
  });

  const updateContext = (updates: Partial<CulturalContext>) => {
    setContext(prev => ({ ...prev, ...updates }));
  };

  const getCulturalGuidance = (contentType: string): string[] => {
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

  // Load saved cultural preferences
  useEffect(() => {
    const saved = localStorage.getItem('culturalContext');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContext(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Could not load saved cultural context');
      }
    }
  }, []);

  // Save cultural preferences
  useEffect(() => {
    localStorage.setItem('culturalContext', JSON.stringify(context));
  }, [context]);

  return (
    <CulturalContextContext.Provider value={{
      context,
      updateContext,
      getCulturalGuidance
    }}>
      {children}
    </CulturalContextContext.Provider>
  );
}

export function useCulturalContext() {
  const contextValue = useContext(CulturalContextContext);
  if (!contextValue) {
    throw new Error('useCulturalContext must be used within CulturalContextProvider');
  }
  return contextValue;
}

export function CulturalGuidancePanel({ contentType }: { contentType: string }) {
  const { context, getCulturalGuidance } = useCulturalContext();
  const guidance = getCulturalGuidance(contentType);

  if (guidance.length === 0) return null;

  return (
    <div className="cultural-guidance-panel" role="complementary">
      <h4>🌿 Cultural Guidance</h4>
      <ul>
        {guidance.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}