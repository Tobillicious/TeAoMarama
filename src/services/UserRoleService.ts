/**
 * User Role Service - Manages teacher/student roles and permissions
 * Integrates with Firebase Auth and provides role-based access control
 */

import type { User } from 'firebase/auth';
import { writeEpisode } from '../ai/provenance';

export type UserRole = 'teacher' | 'student' | 'admin' | 'guest';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  school?: string;
  department?: string;
  yearLevel?: string; // For students
  subjects?: string[]; // For teachers
  permissions: Permission[];
  metadata: {
    createdAt: string;
    lastLogin: string;
    loginCount: number;
    verified: boolean;
    onboardingCompleted: boolean;
  };
}

export interface Permission {
  resource: 'resources' | 'students' | 'analytics' | 'cultural_content' | 'admin';
  actions: ('read' | 'write' | 'delete' | 'approve')[];
  conditions?: {
    own_content_only?: boolean;
    year_level_restriction?: string[];
    subject_restriction?: string[];
  };
}

/**
 * User Role and Permission Management Service
 */
export class UserRoleService {
  private roleCache = new Map<string, UserProfile>();
  
  /**
   * Determine user role from Firebase user and domain patterns
   */
  async determineUserRole(user: User): Promise<UserRole> {
    try {
      // Check email domain patterns
      const email = user.email?.toLowerCase() || '';
      
      // Teacher patterns (adjust for your school's domain)
      const teacherPatterns = [
        '@mangakōtukutuku.school.nz',
        '@staff.mangakotukutuku.nz',
        '.teacher@',
        '.staff@'
      ];
      
      // Student patterns  
      const studentPatterns = [
        '@student.mangakotukutuku.nz',
        '@students.mangakotukutuku.nz'
      ];
      
      // Admin patterns
      const adminPatterns = [
        'admin@',
        'principal@',
        'it@'
      ];
      
      // Check patterns
      if (adminPatterns.some(pattern => email.includes(pattern))) {
        return 'admin';
      }
      
      if (teacherPatterns.some(pattern => email.includes(pattern))) {
        return 'teacher';
      }
      
      if (studentPatterns.some(pattern => email.includes(pattern))) {
        return 'student';
      }
      
      // Default fallback - could also prompt user to select role
      return 'guest';
      
    } catch (error) {
      console.error('Error determining user role:', error);
      return 'guest';
    }
  }

  /**
   * Get full user profile with permissions
   */
  async getUserProfile(user: User): Promise<UserProfile> {
    try {
      // Check cache first
      if (this.roleCache.has(user.uid)) {
        return this.roleCache.get(user.uid)!;
      }

      const role = await this.determineUserRole(user);
      const permissions = this.getPermissionsForRole(role);
      
      const profile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        role,
        school: 'Mangakōtukutuku College', // Could be dynamic based on email domain
        department: role === 'teacher' ? this.inferDepartmentFromEmail(user.email || undefined) : undefined,
        yearLevel: role === 'student' ? this.inferYearLevelFromEmail(user.email || undefined) : undefined,
        subjects: role === 'teacher' ? this.inferSubjectsFromProfile(user) : undefined,
        permissions,
        metadata: {
          createdAt: user.metadata.creationTime || new Date().toISOString(),
          lastLogin: user.metadata.lastSignInTime || new Date().toISOString(),
          loginCount: 1, // Would track this in real database
          verified: user.emailVerified,
          onboardingCompleted: false // Would track this in user settings
        }
      };

      // Cache the profile
      this.roleCache.set(user.uid, profile);

      // Log the user profile creation
      await writeEpisode('user-role-service', {
        timestamp: new Date().toISOString(),
        agent: 'agent:auth-system',
        action: 'user_profile_created',
        context: {
          user_id: user.uid,
          role: role,
          email_domain: user.email?.split('@')[1],
          permissions_count: permissions.length,
          text: `User profile created for ${role}: ${user.email}`
        }
      });

      return profile;

    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  /**
   * Check if user has specific permission
   */
  hasPermission(
    profile: UserProfile, 
    resource: string, 
    action: string,
    context?: { resourceId?: string; resourceType?: string }
  ): boolean {
    try {
      const permission = profile.permissions.find(p => p.resource === resource);
      if (!permission) return false;
      
      if (!permission.actions.includes(action as unknown)) return false;
      
      // Check conditions
      if (permission.conditions) {
        const { conditions } = permission;
        
        // Own content only restriction
        if (conditions.own_content_only && context?.resourceId) {
          // Would check if resource belongs to user - simplified for now
          return true;
        }
        
        // Year level restrictions for students
        if (conditions.year_level_restriction && profile.yearLevel) {
          return conditions.year_level_restriction.includes(profile.yearLevel);
        }
        
        // Subject restrictions for teachers
        if (conditions.subject_restriction && profile.subjects) {
          return profile.subjects.some(subject => 
            conditions.subject_restriction?.includes(subject)
          );
        }
      }
      
      return true;
      
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }

  /**
   * Get appropriate dashboard route based on user role
   */
  getDashboardRoute(role: UserRole): string {
    switch (role) {
      case 'teacher':
      case 'admin':
        return '/dashboard';
      case 'student':
        return '/student-dashboard';
      default:
        return '/';
    }
  }

  /**
   * Check if user can access cultural content
   */
  canAccessCulturalContent(profile: UserProfile, sensitivityLevel: 'low' | 'medium' | 'high' | 'critical'): boolean {
    // Teachers can access all levels
    if (profile.role === 'teacher' || profile.role === 'admin') {
      return true;
    }
    
    // Students can access low and medium, but need approval for high/critical
    if (profile.role === 'student') {
      return sensitivityLevel === 'low' || sensitivityLevel === 'medium';
    }
    
    return false;
  }

  /**
   * Get filtered resources based on user role and permissions
   */
  filterResourcesByRole(resources: unknown[], profile: UserProfile): unknown[] {
    return resources.filter(resource => {
      // Admin can see everything
      if (profile.role === 'admin') return true;
      
      // Cultural content filtering
      if (resource.culturalContent?.hasMaoriContent) {
        return this.canAccessCulturalContent(
          profile, 
          resource.culturalContent.culturalSensitivityLevel
        );
      }
      
      // Year level filtering for students
      if (profile.role === 'student' && profile.yearLevel) {
        return resource.yearLevel?.includes(profile.yearLevel) || 
               resource.yearLevel?.length === 0;
      }
      
      // Subject filtering for teachers (optional - teachers might want to see all subjects)
      // if (profile.role === 'teacher' && profile.subjects) {
      //   return profile.subjects.includes(resource.subject);
      // }
      
      return true;
    });
  }

  // Private helper methods
  private getPermissionsForRole(role: UserRole): Permission[] {
    const permissions: Record<UserRole, Permission[]> = {
      admin: [
        {
          resource: 'resources',
          actions: ['read', 'write', 'delete', 'approve']
        },
        {
          resource: 'students',
          actions: ['read', 'write']
        },
        {
          resource: 'analytics',
          actions: ['read']
        },
        {
          resource: 'cultural_content',
          actions: ['read', 'write', 'approve']
        },
        {
          resource: 'admin',
          actions: ['read', 'write']
        }
      ],
      teacher: [
        {
          resource: 'resources',
          actions: ['read', 'write'],
          conditions: {
            own_content_only: false // Teachers can see all resources
          }
        },
        {
          resource: 'students',
          actions: ['read'],
          conditions: {
            own_content_only: true // Only their own students
          }
        },
        {
          resource: 'analytics',
          actions: ['read'],
          conditions: {
            own_content_only: true
          }
        },
        {
          resource: 'cultural_content',
          actions: ['read']
        }
      ],
      student: [
        {
          resource: 'resources',
          actions: ['read'],
          conditions: {
            year_level_restriction: ['Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13']
          }
        }
      ],
      guest: [
        {
          resource: 'resources',
          actions: ['read'],
          conditions: {
            own_content_only: false
          }
        }
      ]
    };
    
    return permissions[role] || permissions.guest;
  }

  private inferDepartmentFromEmail(email?: string): string | undefined {
    if (!email) return undefined;
    
    const departmentPatterns: Record<string, string> = {
      'math': 'Mathematics',
      'science': 'Science', 
      'english': 'English',
      'history': 'Social Studies',
      'tereo': 'Te Reo Māori',
      'maori': 'Te Reo Māori',
      'pe': 'Physical Education',
      'art': 'Arts',
      'tech': 'Technology'
    };
    
    const emailLower = email.toLowerCase();
    for (const [pattern, department] of Object.entries(departmentPatterns)) {
      if (emailLower.includes(pattern)) {
        return department;
      }
    }
    
    return undefined;
  }

  private inferYearLevelFromEmail(email?: string): string | undefined {
    if (!email) return undefined;
    
    const yearPatterns = [
      'year9', 'year10', 'year11', 'year12', 'year13',
      'y9', 'y10', 'y11', 'y12', 'y13'
    ];
    
    const emailLower = email.toLowerCase();
    for (const pattern of yearPatterns) {
      if (emailLower.includes(pattern)) {
        const yearNumber = pattern.match(/\d+/)?.[0];
        return yearNumber ? `Year ${yearNumber}` : undefined;
      }
    }
    
    return undefined;
  }

  private inferSubjectsFromProfile(user: User): string[] {
    // Would integrate with school's information system
    // For now, return common subjects based on email patterns
    const email = user.email?.toLowerCase() || '';
    const subjects: string[] = [];
    
    if (email.includes('math')) subjects.push('Mathematics');
    if (email.includes('science')) subjects.push('Science');
    if (email.includes('english')) subjects.push('English');
    if (email.includes('history') || email.includes('social')) subjects.push('Social Studies');
    if (email.includes('tereo') || email.includes('maori')) subjects.push('Te Reo Māori');
    
    return subjects.length > 0 ? subjects : ['General']; // Default
  }

  /**
   * Update user profile (would integrate with backend database)
   */
  async updateProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const currentProfile = this.roleCache.get(uid);
      if (currentProfile) {
        const updatedProfile = { ...currentProfile, ...updates };
        this.roleCache.set(uid, updatedProfile);
        
        await writeEpisode('user-role-service', {
          timestamp: new Date().toISOString(),
          agent: 'agent:auth-system',
          action: 'profile_updated',
          context: {
            user_id: uid,
            updated_fields: Object.keys(updates),
            text: `User profile updated for ${currentProfile.role}`
          }
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  /**
   * Clear user cache (on logout)
   */
  clearCache(uid?: string): void {
    if (uid) {
      this.roleCache.delete(uid);
    } else {
      this.roleCache.clear();
    }
  }
}

// Global service instance
export const userRoleService = new UserRoleService();