
// Authentication Guards - Te Kura o TeAoMarama
// Cultural sensitivity and educational access controls

import { useAuth } from '../services/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireEducator?: boolean;
  requireCulturalClearance?: 'basic' | 'approved' | 'kaitiaki';
  culturalSensitivity?: 'low' | 'medium' | 'high' | 'sacred';
}

interface UserProfile {
  role: string;
  educator_status: boolean;
  cultural_clearance: string;
  cultural_roles: string[];
  iwi_affiliations: string[];
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
  requireEducator = false,
  requireCulturalClearance,
  culturalSensitivity = 'low'
}) => {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const loadUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role, educator_status, cultural_clearance, cultural_roles, iwi_affiliations')
        .eq('user_id', currentUser?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading user profile:', error);
        setAccessDenied(true);
      } else {
        setUserProfile(data);
        
        // Check access permissions
        const hasAccess = await validateAccess(data);
        setAccessDenied(!hasAccess);
      }
    } catch (error) {
      console.error('Profile loading error:', error);
      setAccessDenied(true);
    } finally {
      setLoading(false);
    }
  };

  const validateAccess = async (profile: UserProfile | null): Promise<boolean> => {
    if (!profile && requireAuth) return false;

    // Check educator requirement
    if (requireEducator && (!profile?.educator_status && profile?.role !== 'educator')) {
      await logAccessAttempt('EDUCATOR_REQUIRED', false);
      return false;
    }

    // Check cultural clearance
    if (requireCulturalClearance) {
      const clearanceLevel = getClearanceLevel(profile?.cultural_clearance);
      const requiredLevel = getClearanceLevel(requireCulturalClearance);
      
      if (clearanceLevel < requiredLevel) {
        await logAccessAttempt('INSUFFICIENT_CULTURAL_CLEARANCE', false);
        return false;
      }
    }

    // Check cultural sensitivity access
    if (culturalSensitivity === 'sacred' && !profile?.cultural_roles?.includes('kaitiaki')) {
      await logAccessAttempt('SACRED_CONTENT_ACCESS_DENIED', false);
      return false;
    }

    if (culturalSensitivity === 'high' && 
        !['approved', 'kaitiaki'].includes(profile?.cultural_clearance || '')) {
      await logAccessAttempt('HIGH_SENSITIVITY_ACCESS_DENIED', false);
      return false;
    }

    await logAccessAttempt('ACCESS_GRANTED', true);
    return true;
  };

  const getClearanceLevel = (clearance: string): number => {
    switch (clearance) {
      case 'kaitiaki': return 4;
      case 'approved': return 3;
      case 'basic': return 2;
      default: return 1;
    }
  };

  const logAccessAttempt = async (event: string, success: boolean) => {
    try {
      await supabase.rpc('log_security_event', {
        p_action: event,
        p_resource_type: 'page_access',
        p_resource_id: location.pathname,
        p_cultural_sensitivity: culturalSensitivity
      });
    } catch (error) {
      console.error('Failed to log access attempt:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pounamu mx-auto mb-4"></div>
          <p className="text-gray-600">Validating cultural protocols...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (accessDenied) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
            
            {requireCulturalClearance && (
              <p className="text-gray-600 mb-4">
                This content requires cultural clearance level: <strong>{requireCulturalClearance}</strong>
              </p>
            )}
            
            {culturalSensitivity === 'high' && (
              <p className="text-gray-600 mb-4">
                🌿 This content contains culturally sensitive material that requires special permissions to access.
              </p>
            )}
            
            {culturalSensitivity === 'sacred' && (
              <p className="text-gray-600 mb-4">
                🙏 This sacred content is restricted to authorized kaitiaki only. Please contact your cultural advisor.
              </p>
            )}
            
            {requireEducator && (
              <p className="text-gray-600 mb-4">
                👩‍🏫 This area is restricted to verified educators and teaching professionals.
              </p>
            )}
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => window.history.back()}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
            
            <a 
              href="/contact?subject=cultural-clearance"
              className="block w-full px-4 py-2 bg-pounamu text-white rounded-md hover:bg-pounamu-dark transition-colors"
            >
              Request Cultural Clearance
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Higher-order component for route protection
export const withAuthGuard = (
  Component: React.ComponentType,
  options: Omit<AuthGuardProps, 'children'>
) => {
  return (props: any) => (
    <AuthGuard {...options}>
      <Component {...props} />
    </AuthGuard>
  );
};

// Hook for checking cultural permissions in components
export const useCulturalPermissions = () => {
  const { currentUser } = useAuth();
  const [permissions, setPermissions] = useState({
    canAccessSacred: false,
    canAccessHigh: false,
    culturalClearance: 'none',
    isKaitiaki: false,
    isEducator: false
  });

  useEffect(() => {
    if (currentUser) {
      loadPermissions();
    }
  }, [currentUser]);

  const loadPermissions = async () => {
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
          isEducator: data.educator_status || data.role === 'educator'
        });
      }
    } catch (error) {
      console.error('Error loading cultural permissions:', error);
    }
  };

  return permissions;
};
