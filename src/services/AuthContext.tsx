import { 
  useState, 
  useEffect, 
  useCallback, 
  useMemo,
  type ReactNode 
} from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import type { User, AuthError, UserCredential } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, FirebaseService } from '../firebaseConfig';
import { AuthContext } from './AuthContextObject.tsx';
import { userRoleService, type UserProfile } from './UserRoleService';
import { writeEpisode } from '../ai/provenance';

interface AuthProviderProps {
  children: ReactNode;
}

// Enhanced authentication state interface
interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  isOnline: boolean;
  lastActivity: Date | null;
}

// Cultural context for Te Ao Māori integration
interface CulturalContext {
  whakataukiOfTheDay?: string;
  culturalCalendar?: {
    event: string;
    date: string;
    significance: string;
  }[];
  preferredLanguage: 'en' | 'mi' | 'both';
}

// Enhanced error handling
class AuthErrorHandler {
  static getErrorMessage(error: AuthError | Error, culturalContext?: 'mi' | 'en'): string {
    if (culturalContext === 'mi') {
      return AuthErrorHandler.getMaoriErrorMessage(error);
    }
    return AuthErrorHandler.getEnglishErrorMessage(error);
  }

  private static getMaoriErrorMessage(error: AuthError | Error): string {
    const errorMap: Record<string, string> = {
      'auth/user-not-found': 'Kāore i kitea te kaiwhakamahi',
      'auth/wrong-password': 'He hē te kupuhipa',
      'auth/email-already-in-use': 'Kua whakamahia kētia tēnei īmēra',
      'auth/weak-password': 'He māngere te kupuhipa',
      'auth/invalid-email': 'He muhu te īmēra',
      'auth/too-many-requests': 'He maha rawa ngā tono',
      'auth/network-request-failed': 'I rahua te hononga',
      'default': 'I puta he raru. Me ngana anō.'
    };

    if ('code' in error) {
      return errorMap[error.code] || errorMap.default;
    }
    
    return errorMap.default;
  }

  private static getEnglishErrorMessage(error: AuthError | Error): string {
    const errorMap: Record<string, string> = {
      'auth/user-not-found': 'No account found with this email address. Would you like to create one?',
      'auth/wrong-password': 'Incorrect password. Please try again or reset your password.',
      'auth/email-already-in-use': 'An account already exists with this email address.',
      'auth/weak-password': 'Password should be at least 6 characters long.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/popup-closed-by-user': 'Sign-in cancelled. Please try again.',
      'auth/popup-blocked': 'Pop-up blocked. Please allow pop-ups for this site.',
      'default': 'Authentication failed. Please try again.'
    };

    if ('code' in error) {
      return errorMap[error.code] || errorMap.default;
    }
    
    return error.message || errorMap.default;
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Enhanced state management
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
    isOnline: true,
    lastActivity: null
  });

  const [culturalContext, setCulturalContext] = useState<CulturalContext>({
    preferredLanguage: 'both'
  });

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setAuthState(prev => ({ ...prev, isOnline: true }));
    };
    
    const handleOffline = () => {
      setAuthState(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Activity tracking for session management
  const updateActivity = useCallback(() => {
    setAuthState(prev => ({ ...prev, lastActivity: new Date() }));
  }, []);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    const throttledUpdate = throttle(updateActivity, 30000); // Update every 30 seconds max

    events.forEach(event => {
      document.addEventListener(event, throttledUpdate);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, throttledUpdate);
      });
    };
  }, [updateActivity]);

  // Enhanced Firebase auth state listener
  useEffect(() => {
    if (!FirebaseService.isReady()) {
      console.warn('⚠️  Firebase services not ready, skipping auth state listener');
      setAuthState(prev => ({ ...prev, loading: false }));
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));
        
        if (user) {
          // Get enhanced user profile
          const profile = await userRoleService.getUserProfile(user);
          
          // Set cultural preferences based on profile
          setCulturalContext(prev => ({
            ...prev,
            preferredLanguage: profile.metadata.culturalAffiliation?.includes('Māori') 
              ? 'both' : 'en'
          }));

          // Log successful authentication
          await writeEpisode('auth-provider', {
            timestamp: new Date().toISOString(),
            agent: 'agent:auth-provider',
            action: 'user_authenticated',
            context: {
              user_id: user.uid,
              role: profile.role,
              email_verified: user.emailVerified,
              sign_in_method: user.providerData[0]?.providerId || 'email',
              text: `User authenticated: ${profile.role} - ${user.email}`
            }
          });

          setAuthState(prev => ({
            ...prev,
            user,
            profile,
            loading: false,
            lastActivity: new Date()
          }));
        } else {
          // Clear user session
          userRoleService.clearCache();
          setAuthState(prev => ({
            ...prev,
            user: null,
            profile: null,
            loading: false
          }));
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        const errorMessage = AuthErrorHandler.getErrorMessage(
          error as AuthError, 
          culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en'
        );
        
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage
        }));
      }
    }, (error) => {
      console.error('Auth state listener error:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: AuthErrorHandler.getErrorMessage(error, culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en')
      }));
    });

    return unsubscribe;
  }, [culturalContext.preferredLanguage]);

  // Enhanced authentication methods
  const signUp = useCallback(async (email: string, password: string, additionalData?: {
    displayName?: string;
    role?: 'teacher' | 'student';
    culturalAffiliation?: string;
    school?: string;
  }) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      // Update profile if display name provided
      if (additionalData?.displayName) {
        await updateProfile(user, {
          displayName: additionalData.displayName
        });
      }

      // Send email verification
      await sendEmailVerification(user);

      // Save additional user data to Firestore
      if (additionalData) {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          ...additionalData,
          email: user.email,
          createdAt: serverTimestamp(),
          emailVerified: false,
          onboardingCompleted: false
        });
      }

      // Log successful registration
      await writeEpisode('auth-provider', {
        timestamp: new Date().toISOString(),
        agent: 'agent:auth-provider',
        action: 'user_registered',
        context: {
          user_id: user.uid,
          email: user.email,
          role: additionalData?.role || 'guest',
          text: `New user registered: ${user.email}`
        }
      });

      return { data: { user }, error: null };
    } catch (error) {
      const errorMessage = AuthErrorHandler.getErrorMessage(
        error as AuthError,
        culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en'
      );
      
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { data: { user: null }, error: { message: errorMessage } };
    }
  }, [culturalContext.preferredLanguage]);

  const logIn = useCallback(async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      return { data: { user }, error: null };
    } catch (error) {
      const errorMessage = AuthErrorHandler.getErrorMessage(
        error as AuthError,
        culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en'
      );
      
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { data: { user: null }, error: { message: errorMessage } };
    }
  }, [culturalContext.preferredLanguage]);

  const signInWithGoogle = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const provider = new GoogleAuthProvider();
      // Add custom parameters for better UX
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const userCredential = await signInWithPopup(auth, provider);
      const { user } = userCredential;

      // Check if this is a new user and needs role setup
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        // This will trigger the role selection flow
        return { data: { user, needsRoleSetup: true }, error: null };
      }

      return { data: { user }, error: null };
    } catch (error) {
      const errorMessage = AuthErrorHandler.getErrorMessage(
        error as AuthError,
        culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en'
      );
      
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { data: { user: null }, error: { message: errorMessage } };
    }
  }, [culturalContext.preferredLanguage]);

  const logOut = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      await signOut(auth);
      userRoleService.clearCache();
      
      // Log successful logout
      await writeEpisode('auth-provider', {
        timestamp: new Date().toISOString(),
        agent: 'agent:auth-provider',
        action: 'user_logged_out',
        context: {
          text: 'User logged out successfully'
        }
      });

      return { error: null };
    } catch (error) {
      const errorMessage = AuthErrorHandler.getErrorMessage(
        error as AuthError,
        culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en'
      );
      
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { error: { message: errorMessage } };
    }
  }, [culturalContext.preferredLanguage]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, error: null };
    } catch (error) {
      const errorMessage = AuthErrorHandler.getErrorMessage(
        error as AuthError,
        culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en'
      );
      return { success: false, error: { message: errorMessage } };
    }
  }, [culturalContext.preferredLanguage]);

  const updateUserProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!authState.user) return { success: false, error: { message: 'No user logged in' } };

    try {
      await userRoleService.updateProfile(authState.user.uid, updates);
      
      // Update local state
      setAuthState(prev => ({
        ...prev,
        profile: prev.profile ? { ...prev.profile, ...updates } : null
      }));

      return { success: true, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      return { success: false, error: { message: errorMessage } };
    }
  }, [authState.user]);

  // Memoized context value for performance
  const contextValue = useMemo(() => ({
    currentUser: authState.user,
    session: authState.user, // Firebase User as session
    profile: authState.profile,
    loading: authState.loading,
    error: authState.error,
    isOnline: authState.isOnline,
    lastActivity: authState.lastActivity,
    culturalContext,
    setCulturalContext,
    signUp,
    logIn,
    signInWithGoogle,
    logOut,
    resetPassword,
    updateUserProfile,
    // Utility methods
    hasPermission: (resource: string, action: string, context?: { resourceId?: string }) => {
      return authState.profile ? 
        userRoleService.hasPermission(authState.profile, resource, action, context) : 
        false;
    },
    getDashboardRoute: () => {
      return authState.profile ? 
        userRoleService.getDashboardRoute(authState.profile.role) : 
        '/';
    },
    canAccessCulturalContent: (level: 'low' | 'medium' | 'high' | 'critical') => {
      return authState.profile ? 
        userRoleService.canAccessCulturalContent(authState.profile, level) : 
        false;
    }
  }), [
    authState, 
    culturalContext,
    signUp, 
    logIn, 
    signInWithGoogle,
    logOut, 
    resetPassword, 
    updateUserProfile
  ]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// Utility function for throttling
function throttle<T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}
