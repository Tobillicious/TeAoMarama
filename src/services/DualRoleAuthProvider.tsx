import type { User as FirebaseUser, UserCredential } from 'firebase/auth';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile,  } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth, db } from '../firebaseConfig';

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

interface SignUpData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  school?: string;
  grade?: string;
  subjects?: string[];
  iwiAffiliations?: string[];
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

  // User management
  updateUserProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  getUserRole: () => UserRole | null;
  hasPermission: (permission: string) => boolean;
  
  // Additional methods needed by components
  switchToDemoMode?: () => void;
  getRoleBasedFeatures?: () => string[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a DualRoleAuthProvider');
  }
  return context;
};

interface DualRoleAuthProviderProps {
  children: ReactNode;
}

// Check if Firebase environment variables are available
const hasFirebaseConfig =
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'your_actual_api_key_here';

export const DualRoleAuthProvider: React.FC<DualRoleAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to get user profile from Firestore
  const getUserProfile = async (uid: string): Promise<Partial<User> | null> => {
    if (!db) return null;

    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as Partial<User>;
      }
    } catch (error) {
      console.warn(
        '⚠️ Failed to get user profile from Firestore (continuing with local auth):',
        error,
      );
    }
    return null;
  };

  // Helper function to save user profile to Firestore
  const saveUserProfile = async (uid: string, userData: Partial<User>): Promise<boolean> => {
    if (!db) return false;

    try {
      await setDoc(
        doc(db, 'users', uid),
        {
          ...userData,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
      return true;
    } catch (error) {
      console.warn(
        '⚠️ Failed to save user profile to Firestore (continuing with local auth):',
        error,
      );
      return false;
    }
  };

  // Initialize auth state
  useEffect(() => {
    if (!auth || !hasFirebaseConfig) {
      console.warn('⚠️ Firebase Authentication is not properly configured - running in demo mode');
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Get user profile from Firestore (optional)
          const userProfile = await getUserProfile(firebaseUser.uid);

          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name:
              firebaseUser.displayName ||
              userProfile?.name ||
              firebaseUser.email?.split('@')[0] ||
              'User',
            role: userProfile?.role || 'student',
            culturalClearance: userProfile?.culturalClearance || 'basic',
            school: userProfile?.school || '',
            grade: userProfile?.grade || '',
            subjects: userProfile?.subjects || [],
            iwiAffiliations: userProfile?.iwiAffiliations || [],
            createdAt:
              userProfile?.createdAt ||
              firebaseUser.metadata.creationTime ||
              new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          };

          setCurrentUser(user);
          setIsAuthenticated(true);

          // Try to update last login (optional - don't fail if it doesn't work)
          saveUserProfile(firebaseUser.uid, { lastLogin: new Date().toISOString() }).catch(() => {
            // Silently continue if Firestore update fails
          });

          console.log(`🌟 Welcome back, ${user.name || user.email}! (${user.role})`);
        } catch (error) {
          console.warn('⚠️ Error setting up user profile (continuing with basic auth):', error);
          // Fallback to basic user setup
          const basicUser: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            role: 'student',
            culturalClearance: 'basic',
            createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          };
          setCurrentUser(basicUser);
          setIsAuthenticated(true);
        }
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
        console.log('👋 No user logged in.');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      if (!auth || !hasFirebaseConfig) {
        throw new Error(
          'Firebase Authentication is not properly configured. Please contact support.',
        );
      }

      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user: FirebaseUser = userCredential.user;

      if (user) {
        // Try to update user profile (optional - don't fail if it doesn't work)
        saveUserProfile(user.uid, {
          email: user.email || '',
          name: user.displayName || email.split('@')[0],
          role: role,
          lastLogin: new Date().toISOString(),
        }).catch(() => {
          // Silently continue if Firestore update fails
        });

        console.log(`🎓 Login successful: ${user.displayName || user.email} (${role})`);
        return { success: true };
      }

      return { success: false, error: 'Login failed unexpectedly' };
    } catch (error: unknown) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed';

      if (error instanceof Error) {
        // Handle specific Firebase auth errors
        if (error.message.includes('user-not-found')) {
          errorMessage = 'No account found with this email address';
        } else if (error.message.includes('wrong-password')) {
          errorMessage = 'Incorrect password';
        } else if (error.message.includes('invalid-email')) {
          errorMessage = 'Invalid email address';
        } else if (error.message.includes('too-many-requests')) {
          errorMessage = 'Too many failed attempts. Please try again later';
        } else {
          errorMessage = error.message;
        }
      }

      return { success: false, error: errorMessage };
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
      if (!auth || !hasFirebaseConfig) {
        throw new Error(
          'Firebase Authentication is not properly configured. Please contact support.',
        );
      }

      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      const user: FirebaseUser = userCredential.user;

      if (user) {
        // Update display name
        await updateProfile(user, {
          displayName: userData.name,
        }).catch(() => {
          // Silently continue if Firestore update fails
        });

        // Save complete user profile to Firestore
        const userProfile: User = {
          id: user.uid,
          email: user.email || '',
          name: userData.name,
          role: userData.role,
          culturalClearance: userData.role === 'teacher' ? 'approved' : 'basic',
          school: userData.school || '',
          grade: userData.grade || '',
          subjects: userData.subjects || [],
          iwiAffiliations: userData.iwiAffiliations || [],
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        await saveUserProfile(user.uid, userProfile);

        console.log(`🎉 Account created successfully: ${userData.name} (${userData.role})`);
        return { success: true };
      }

      return { success: false, error: 'Account creation failed unexpectedly' };
    } catch (error: unknown) {
      console.error('Sign up error:', error);
      let errorMessage = 'Account creation failed';

      if (error instanceof Error) {
        if (error.message.includes('email-already-in-use')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else if (error.message.includes('invalid-email')) {
          errorMessage = 'Please enter a valid email address.';
        } else if (error.message.includes('weak-password')) {
          errorMessage = 'Password should be at least 6 characters long.';
        } else if (error.message.includes('network-request-failed')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else {
          errorMessage = error.message;
        }
      }

      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (
    updates: Partial<User>,
  ): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser || !auth?.currentUser) {
      return { success: false, error: 'No user logged in' };
    }

    try {
      // Update Firebase profile if name is being updated
      if (updates.name && updates.name !== currentUser.name) {
        await updateProfile(auth.currentUser, {
          displayName: updates.name,
        }).catch(() => {
          // Silently continue if Firestore update fails
        });
      }

      // Update Firestore profile
      await saveUserProfile(currentUser.id, updates);

      // Update local state
      setCurrentUser({
        ...currentUser,
        ...updates,
      });

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Profile update failed',
      };
    }
  };

  const getUserRole = (): UserRole | null => {
    return currentUser?.role || null;
  };

  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false;

    const rolePermissions: Record<UserRole, string[]> = {
      student: ['read_content', 'take_assessments', 'view_progress'],
      teacher: ['read_content', 'create_content', 'grade_assessments', 'manage_class'],
      admin: ['read_content', 'create_content', 'manage_users', 'system_config'],
      kaitiaki: ['all_permissions', 'cultural_oversight', 'content_approval'],
    };

    const userPermissions = rolePermissions[currentUser.role] || [];
    return userPermissions.includes(permission) || userPermissions.includes('all_permissions');
  };

  const switchToDemoMode = (): void => {
    console.log('🎯 Demo mode activated');
    // Demo mode implementation - can be expanded as needed
  };

  const getRoleBasedFeatures = (): string[] => {
    if (!currentUser) return [];
    
    const roleFeatures: Record<UserRole, string[]> = {
      student: ['lessons', 'assessments', 'progress'],
      teacher: ['create_lessons', 'grade_assessments', 'class_management', 'analytics'],
      admin: ['user_management', 'system_config', 'reports', 'all_features'],
      kaitiaki: ['cultural_oversight', 'content_approval', 'all_features'],
    };

    return roleFeatures[currentUser.role] || [];
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    currentUser,
    isLoading,
    login,
    logout,
    signUp,
    updateUserProfile,
    getUserRole,
    hasPermission,
    switchToDemoMode,
    getRoleBasedFeatures,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default DualRoleAuthProvider;
