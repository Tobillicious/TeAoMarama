import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
  type UserCredential,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth } from '../firebaseConfig';

// Check if Firebase environment variables are available
const hasFirebaseConfig =
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'your_actual_api_key_here';

// User roles and their capabilities
export type UserRole = 'teacher' | 'student' | 'admin' | 'kaitiaki';
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
    kaitiaki: {
      id: 'demo-kaitiaki-001',
      email: 'kaitiaki@teaomarama.nz',
      name: 'Kaitiaki Aronui',
      role: 'kaitiaki',
      culturalClearance: 'kaitiaki',
      school: 'Te Kura o TeAoMarama',
      iwiAffiliations: ['Ngāti Tūwharetoa', 'Te Arawa'],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    },
  };

  // Initialize auth state
  useEffect(() => {
    // Only listen to Firebase auth state if Firebase is properly configured
    if (auth && hasFirebaseConfig) {
      const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
        if (user) {
          setCurrentUser({
            id: user.uid,
            email: user.email || '',
            name: user.displayName || '',
            role: 'student', // Default role, will be updated on login
            culturalClearance: 'basic', // Default clearance, will be updated on login
            createdAt: user.metadata.creationTime || '',
            lastLogin: user.metadata.lastSignInTime || '',
          });
          setIsAuthenticated(true);
          console.log(`🌟 Welcome back, ${user.displayName || user.email}!`);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
          console.log('👋 No user logged in.');
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    } else {
      // No Firebase auth - set loading to false
      console.log('🔄 No Firebase authentication available');
      setIsLoading(false);
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Demo mode - bypass Firebase authentication
      if (!auth || !hasFirebaseConfig) {
        // Use demo user for the selected role
        const demoUser = demoUsers[role] || demoUsers.student;
        setCurrentUser({
          ...demoUser,
          email: email,
          role: role,
        });
        setIsAuthenticated(true);
        console.log(`🎭 Demo login successful: ${email} (${role})`);
        return { success: true };
      }

      // Try Firebase authentication first
      try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user: FirebaseUser = userCredential.user;

        if (user) {
          setCurrentUser({
            id: user.uid,
            email: user.email || '',
            name: user.displayName || '',
            role: role, // Use the role passed to the function
            culturalClearance: 'basic', // Default clearance, will be updated on login
            createdAt: user.metadata.creationTime || '',
            lastLogin: user.metadata.lastSignInTime || '',
          });
          setIsAuthenticated(true);
          console.log(`🎓 Firebase login successful: ${user.displayName || user.email} (${role})`);
          return { success: true };
        }
      } catch (firebaseError: unknown) {
        console.warn('Firebase authentication failed, falling back to demo mode:', firebaseError);
        
        // Check if it's an auth/invalid-credential or other auth error
        const isAuthError = firebaseError instanceof Error && 
          (firebaseError.message.includes('auth/invalid-credential') ||
           firebaseError.message.includes('auth/user-not-found') ||
           firebaseError.message.includes('auth/wrong-password'));
        
        // If it's an auth error, try demo mode as fallback
        if (isAuthError) {
          console.log('🎭 Falling back to demo mode due to Firebase auth error');
          
          // Use demo credentials or accept any demo email format
          if (email.includes('demo') || email.includes('teaomarama') || 
              email.includes('teacher') || email.includes('student') ||
              email.includes('kaitiaki') || email.includes('admin')) {
            const demoUser = demoUsers[role] || demoUsers.student;
            setCurrentUser({
              ...demoUser,
              email: email,
              role: role,
            });
            setIsAuthenticated(true);
            console.log(`🎭 Demo fallback successful: ${email} (${role})`);
            return { success: true };
          }
        }
        
        // Re-throw the Firebase error if it's not handled
        throw firebaseError;
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error: unknown) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      
      // Enhanced error messages for better UX
      if (errorMessage.includes('auth/invalid-credential')) {
        return { success: false, error: 'Invalid credentials. Try demo mode with any @teaomarama.nz email.' };
      } else if (errorMessage.includes('auth/user-not-found')) {
        return { success: false, error: 'User not found. Try demo mode or register a new account.' };
      } else if (errorMessage.includes('auth/wrong-password')) {
        return { success: false, error: 'Incorrect password. Try demo mode for testing.' };
      }
      
      return { success: false, error: `${errorMessage}. Demo mode available - use any @teaomarama.nz email.` };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    if (auth && hasFirebaseConfig) {
      await signOut(auth);
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
    console.log('👋 Logged out successfully');
  };

  const signUp = async (userData: SignUpData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      const user: FirebaseUser = userCredential.user;

      if (user) {
        setCurrentUser({
          id: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          role: userData.role,
          culturalClearance: userData.role === 'teacher' ? 'approved' : 'basic',
          createdAt: user.metadata.creationTime || '',
          lastLogin: user.metadata.lastSignInTime || '',
        });
        setIsAuthenticated(true);
        console.log(`🎉 Account created: ${user.displayName || user.email} (${userData.role})`);
        return { success: true };
      }
      return { success: false, error: 'Sign up failed' };
    } catch (error: unknown) {
      console.error('Sign up error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const switchToDemoMode = () => {
    const user = demoUsers.teacher; // Default to teacher demo
    setCurrentUser(user);
    setIsAuthenticated(true);
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

      case 'kaitiaki':
        return {
          dashboard: '/kaitiaki-dashboard',
          availablePages: [
            '/kaitiaki-dashboard',
            '/cultural-oversight',
            '/sacred-content',
            '/iwi-coordination',
            '/cultural-validation',
            '/spiritual-protocols',
            '/cultural-safety',
            '/tikanga-management',
          ],
          contentAccess: ['all', 'sacred'],
          culturalAccess: ['basic', 'approved', 'kaitiaki', 'sacred'],
          analytics: true,
          contentCreation: true,
          studentManagement: false,
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
