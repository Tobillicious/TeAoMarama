import React from 'react';
import { useAuth } from '../services/DualRoleAuthProvider';
import { supabase } from '../supabaseClient';
import { AuthGuard } from '../components/AuthGuard';

// Higher-order component for route protection
export const withAuthGuard = (
  Component: React.ComponentType<any>,
  options: { requireEducator?: boolean; requireKaitiaki?: boolean; clearanceLevel?: string },
) => {
  return (props: Record<string, unknown>) => (
    <AuthGuard {...options}>
      <Component {...props} />
    </AuthGuard>
  );
};

// Hook for checking cultural permissions in components
export const useCulturalPermissions = () => {
  const { currentUser } = useAuth();
  const [permissions, setPermissions] = React.useState({
    canAccessSacred: false,
    canAccessHigh: false,
    culturalClearance: 'none',
    isKaitiaki: false,
    isEducator: false,
  });

  const loadPermissions = React.useCallback(async () => {
    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('role, educator_status, cultural_clearance, cultural_roles')
        .eq('user_id', currentUser?.id)
        .single();

      if (data) {
        setPermissions({
          canAccessSacred: data.cultural_roles?.includes('kaitiaki') || false,
          canAccessHigh: ['approved', 'kaitiaki'].includes(data.cultural_clearance) || false,
          culturalClearance: data.cultural_clearance || 'none',
          isKaitiaki: data.cultural_roles?.includes('kaitiaki') || false,
          isEducator: data.educator_status || data.role === 'educator',
        });
      }
    } catch (error) {
      console.error('Error loading cultural permissions:', error);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (currentUser) {
      loadPermissions();
    }
  }, [currentUser, loadPermissions]);

  return permissions;
};
