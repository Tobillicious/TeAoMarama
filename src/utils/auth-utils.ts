import { supabase } from '../supabaseClient';

export interface UserProfile {
  role?: string;
  educator_status?: boolean;
  cultural_clearance?: string;
  cultural_roles?: string[];
  iwi_affiliations?: string[];
}

export const validateCulturalAccess = (
  userProfile: UserProfile | null,
  sensitivity: 'low' | 'medium' | 'high' | 'sacred',
): boolean => {
  if (!userProfile) return sensitivity === 'low';

  switch (sensitivity) {
    case 'sacred':
      return userProfile.cultural_roles?.includes('kaitiaki') || false;
    case 'high':
      return ['approved', 'kaitiaki'].includes(userProfile.cultural_clearance || '');
    case 'medium':
      return ['basic', 'approved', 'kaitiaki'].includes(userProfile.cultural_clearance || '');
    case 'low':
    default:
      return true;
  }
};

export const getClearanceLevel = (clearance?: string): number => {
  switch (clearance) {
    case 'kaitiaki':
      return 4;
    case 'approved':
      return 3;
    case 'basic':
      return 2;
    default:
      return 1;
  }
};

export const logAccessAttempt = async (
  event: string,
  resourceType: string,
  resourceId: string,
  culturalSensitivity: string,
): Promise<void> => {
  try {
    await supabase.rpc('log_security_event', {
      p_action: event,
      p_resource_type: resourceType,
      p_resource_id: resourceId,
      p_cultural_sensitivity: culturalSensitivity,
    });
  } catch (error) {
    console.error('Failed to log access attempt:', error);
  }
};
