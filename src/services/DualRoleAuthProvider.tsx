import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// User roles and their capabilities
export type UserRole = 'teacher' | 'student' | 'admin';
export type CulturalClearance = 'basic' | 'approved' | 'kaitiaki';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  culturalClearance: CulturalClearance;
  school?: string;
  grade?: string;
  subjects?: string[];
  iwiAffiliations?: string[];
  createdAt: string;
  lastLogin: string;
}

interface AuthContextType {
  // Authentication state
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;

  // Authentication methods
  login: (
    email: string,
    password: string,
    role: UserRole,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  signUp: (userData: SignUpData) => Promise<{ success: boolean; error?: string }>;

  // Role-based access
  isTeacher: boolean;
  isStudent: boolean;
  isAdmin: boolean;

  // Cultural access
  culturalClearance: CulturalClearance;
  canAccessSacred: boolean;
  canAccessHigh: boolean;

  // Quick access methods
  switchToDemoMode: () => void;
  getRoleBasedFeatures: () => RoleFeatures;
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  school?: string;
  grade?: string;
  subjects?: string[];
}

interface RoleFeatures {
  dashboard: string;
  availablePages: string[];
  contentAccess: string[];
  culturalAccess: string[];
  analytics: boolean;
  contentCreation: boolean;
  studentManagement: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within DualRoleAuthProvider');
  }
  return context;
};

interface DualRoleAuthProviderProps {
  children: ReactNode;
}

export const DualRoleAuthProvider: React.FC<DualRoleAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Demo users for testing
  const demoUsers: Record<UserRole, User> = {
    teacher: {
      id: 'demo-teacher-001',
      email: 'teacher@teaomarama.nz',
      name: 'Whaea Sarah',
      role: 'teacher',
      culturalClearance: 'kaitiaki',
      school: 'Te Kura o TeAoMarama',
      subjects: ['Te Reo Māori', 'Social Studies', 'English'],
      iwiAffiliations: ['Ngāti Porou', 'Te Arawa'],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    },
    student: {
      id: 'demo-student-001',
      email: 'student@teaomarama.nz',
      name: 'Tama James',
      role: 'student',
      culturalClearance: 'approved',
      school: 'Te Kura o TeAoMarama',
      grade: 'Year 8',
      subjects: ['Te Reo Māori', 'Mathematics', 'Science'],
      iwiAffiliations: ['Ngāti Kahungunu'],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    },
    admin: {
      id: 'demo-admin-001',
      email: 'admin@teaomarama.nz',
      name: 'Kaiwhakahaere',
      role: 'admin',
      culturalClearance: 'kaitiaki',
      school: 'Te Kura o TeAoMarama',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    },
  };

  // Initialize auth state
  useEffect(() => {
    const savedUser = localStorage.getItem('teaomarama_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
        console.log(`🌟 Welcome back, ${user.name} (${user.role})!`);
      } catch (error) {
        console.error('Failed to restore user session:', error);
        localStorage.removeItem('teaomarama_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo login logic - in real app, this would validate against backend
      if (email.includes('demo') || email.includes('teaomarama')) {
        const user = demoUsers[role];
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
          localStorage.setItem('teaomarama_user', JSON.stringify(user));

          console.log(`🎓 Login successful: ${user.name} (${user.role})`);
          console.log(`🌿 Cultural clearance: ${user.culturalClearance}`);
          console.log(
            `📚 Access granted to ${
              getRoleBasedFeatures(user.role).availablePages.length
            } features`,
          );

          return { success: true };
        }
      }

      // Real authentication would go here
      return { success: false, error: 'Invalid credentials' };
    } catch {
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('teaomarama_user');
    console.log('👋 Logged out successfully');
  };

  const signUp = async (userData: SignUpData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        culturalClearance: userData.role === 'teacher' ? 'approved' : 'basic',
        school: userData.school,
        grade: userData.grade,
        subjects: userData.subjects,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('teaomarama_user', JSON.stringify(newUser));

      console.log(`🎉 Account created: ${newUser.name} (${newUser.role})`);
      return { success: true };
    } catch {
      return { success: false, error: 'Sign up failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const switchToDemoMode = () => {
    const user = demoUsers.teacher; // Default to teacher demo
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('teaomarama_user', JSON.stringify(user));
    console.log('🎭 Switched to demo mode');
  };

  const getRoleBasedFeatures = (role: UserRole = currentUser?.role || 'student'): RoleFeatures => {
    switch (role) {
      case 'teacher':
        return {
          dashboard: '/teacher-dashboard',
          availablePages: [
            '/teacher-dashboard',
            '/lesson-planner',
            '/student-progress',
            '/assessment-creator',
            '/cultural-resources',
            '/professional-development',
            '/analytics',
            '/content-library',
            '/collaboration-hub',
            '/multimedia-studio',
          ],
          contentAccess: ['all'],
          culturalAccess: ['basic', 'approved', 'kaitiaki', 'sacred'],
          analytics: true,
          contentCreation: true,
          studentManagement: true,
        };

      case 'student':
        return {
          dashboard: '/student-dashboard',
          availablePages: [
            '/student-dashboard',
            '/my-learning',
            '/assignments',
            '/cultural-activities',
            '/games',
            '/progress-tracker',
            '/resources',
            '/peer-collaboration',
          ],
          contentAccess: ['assigned', 'public', 'cultural-basic'],
          culturalAccess: ['basic', 'approved'],
          analytics: false,
          contentCreation: false,
          studentManagement: false,
        };

      case 'admin':
        return {
          dashboard: '/admin-dashboard',
          availablePages: [
            '/admin-dashboard',
            '/user-management',
            '/system-analytics',
            '/content-moderation',
            '/cultural-oversight',
            '/platform-settings',
            '/backup-restore',
            '/audit-logs',
          ],
          contentAccess: ['all'],
          culturalAccess: ['basic', 'approved', 'kaitiaki', 'sacred'],
          analytics: true,
          contentCreation: true,
          studentManagement: true,
        };

      default:
        return getRoleBasedFeatures('student');
    }
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    currentUser,
    isLoading,
    login,
    logout,
    signUp,
    isTeacher: currentUser?.role === 'teacher',
    isStudent: currentUser?.role === 'student',
    isAdmin: currentUser?.role === 'admin',
    culturalClearance: currentUser?.culturalClearance || 'basic',
    canAccessSacred: currentUser?.culturalClearance === 'kaitiaki',
    canAccessHigh: ['approved', 'kaitiaki'].includes(currentUser?.culturalClearance || 'basic'),
    switchToDemoMode,
    getRoleBasedFeatures,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
