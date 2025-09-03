import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CulturalContext } from '../types/cultural';
import { getCulturalGuidance } from '../utils/cultural-context-utils';

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
  defaultContext,
}: CulturalContextProviderProps) {
  const [context, setContext] = useState<CulturalContext>({
    teReoMode: false,
    culturalSafetyLevel: 'basic',
    preferredLearningStyle: 'mixed',
    culturalBackground: '',
    accessibilityNeeds: [],
    ...defaultContext,
  });

  const updateContext = (updates: Partial<CulturalContext>) => {
    setContext((prev) => ({ ...prev, ...updates }));
  };

  // Load saved cultural preferences
  useEffect(() => {
    const saved = localStorage.getItem('culturalContext');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContext((prev) => ({ ...prev, ...parsed }));
      } catch {
        console.warn('Could not load saved cultural context');
      }
    }
  }, []);

  // Save cultural preferences
  useEffect(() => {
    localStorage.setItem('culturalContext', JSON.stringify(context));
  }, [context]);

  return (
    <CulturalContextContext.Provider
      value={{
        context,
        updateContext,
        getCulturalGuidance: () => getCulturalGuidance(context),
      }}
    >
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

export function CulturalGuidancePanel() {
  const { getCulturalGuidance } = useCulturalContext();
  const guidance = getCulturalGuidance('general');

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
