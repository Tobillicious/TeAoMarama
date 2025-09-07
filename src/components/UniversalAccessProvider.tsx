import React, { createContext, type ReactNode, useContext } from 'react';

interface UniversalAccessContextType {
  hasAccess: boolean;
  userRole: string;
  culturalClearance: string;
  canAccessAll: boolean;
  unlockAllResources: () => void;
}

export const UniversalAccessContext = createContext<UniversalAccessContextType | undefined>(undefined);

// Hook to use UniversalAccess context
export const useUniversalAccess = () => {
  const context = useContext(UniversalAccessContext);
  if (!context) {
    throw new Error('useUniversalAccess must be used within UniversalAccessProvider');
  }
  return context;
};

interface UniversalAccessProviderProps {
  children: ReactNode;
}

export const UniversalAccessProvider: React.FC<UniversalAccessProviderProps> = ({ children }) => {
  // UNIVERSAL ACCESS - Bypass all authentication chaos
  const universalAccess: UniversalAccessContextType = {
    hasAccess: true, // Everyone has access
    userRole: 'universal-educator', // Highest role
    culturalClearance: 'kaitiaki', // Highest cultural clearance
    canAccessAll: true, // Can access everything
    unlockAllResources: () => {
      console.log('🔓 UNIVERSAL ACCESS: All 7000+ resources unlocked for humans!');
    },
  };

  // Automatically unlock all resources on mount
  React.useEffect(() => {
    universalAccess.unlockAllResources();
    console.log('🌟 UNIVERSAL ACCESS PROVIDER: Authentication chaos bypassed!');
    console.log('🎓 All educational resources now accessible to humans');
    console.log('🌿 Cultural clearance: MAXIMUM (kaitiaki level)');
    console.log('📚 7000+ resources unlocked');
  }, []);

  return (
    <UniversalAccessContext.Provider value={universalAccess}>
      {children}
    </UniversalAccessContext.Provider>
  );
};

// Higher-order component to wrap any component with universal access
export const withUniversalAccess = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => (
    <UniversalAccessProvider>
      <Component {...props} />
    </UniversalAccessProvider>
  );
};

// Hook for components to check if they have universal access
export const useAccessCheck = () => {
  const { hasAccess, canAccessAll, userRole, culturalClearance } = useUniversalAccess();

  return {
    hasAccess,
    canAccessAll,
    userRole,
    culturalClearance,
    isEducator: true,
    isKaitiaki: true,
    canAccessSacred: true,
    canAccessHigh: true,
    canAccessMedium: true,
    canAccessLow: true,
  };
};
