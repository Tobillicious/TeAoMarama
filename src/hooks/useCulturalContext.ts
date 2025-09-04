import { useContext } from 'react';
import { CulturalContextContext } from '../contexts/CulturalContext';

export function useCulturalContext() {
  const contextValue = useContext(CulturalContextContext);
  if (!contextValue) {
    throw new Error('useCulturalContext must be used within CulturalContextProvider');
  }
  return contextValue;
}
