import React, { useContext } from 'react';
import { UniversalAccessContext } from '../components/UniversalAccessProvider';

export const useUniversalAccess = () => {
  const context = useContext(UniversalAccessContext);
  if (!context) {
    throw new Error('useUniversalAccess must be used within UniversalAccessProvider');
  }
  return context;
};

// Hook for components to check if they have universal access
export // // // const useAccessCheck = () => {
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

// Higher-order component to wrap any component with universal access
export // // // const withUniversalAccess = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P): React.JSX.Element => {
    const { UniversalAccessProvider } = require('../components/UniversalAccessProvider');
    return React.createElement(
      UniversalAccessProvider,
      null,
      React.createElement(Component, props)
    );
  };
};
