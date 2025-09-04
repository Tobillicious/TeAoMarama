import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import type { CulturalContext as CulturalContextType } from '../types/cultural';
import { getCulturalGuidance } from '../utils/cultural-context-utils';

interface CulturalContextProviderProps {
  children: ReactNode;
  defaultContext?: Partial<CulturalContextType>;
}

export const CulturalContextContext = createContext<{
  context: CulturalContextType;
  updateContext: (updates: Partial<CulturalContextType>) => void;
  getCulturalGuidance: () => string[];
} | null>(null);

export const CulturalContextProvider: React.FC<CulturalContextProviderProps> = ({
  children,
  defaultContext = {},
}) => {
  const [context, setContext] = useState<CulturalContextType>({
    teReoMode: false,
    culturalSafetyLevel: 'basic',
    preferredLearningStyle: 'mixed',
    culturalBackground: '',
    accessibilityNeeds: [],
    ...defaultContext,
  });

  const updateContext = (updates: Partial<CulturalContextType>) => {
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
};
