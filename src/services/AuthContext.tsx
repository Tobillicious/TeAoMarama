import type { AuthError, User, UserCredential } from 'firebase/auth'
import {createUserWithEmailAndPassword,
GoogleAuthProvider,
onAuthStateChanged,
sendEmailVerification,
sendPasswordResetEmail,
signInWithEmailAndPassword,
signInWithPopup,
signOut,
updateProfile,} from 'firebase/auth'
import {doc, getDoc, serverTimestamp, setDoc} from 'firebase/firestore'
import {useCallback, useEffect, useMemo, useState, type ReactNode} from 'react'
import {writeEpisode} from '../ai/provenance'
import {auth, db, FirebaseService} from '../firebaseConfig'
import {AuthContext} from './AuthContextObject.tsx'
import {userRoleService, type UserProfile} from './UserRoleService'

interface AuthProviderProps {,
children: ReactNode}

// Enhanced authentication state interface
interface AuthState {,
user: User | null,
profile: UserProfile | null,
loading: boolean,
error: string | null,
isOnline: boolean,
lastActivity: Date | null}

// Cultural context for Te Ao Māori integration
interface CulturalContext {whakataukiOfTheDay?: string
  culturalCalendar?: {,
event: string,
date: string,
significance: string}[],
preferredLanguage: 'en' | 'mi' | 'both'
}

// Enhanced error handling
class AuthErrorHandler {
static getErrorMessage(error: AuthError | Error, culturalContext?: 'mi' | 'en'): string {
if (culturalContext === 'mi') {
return AuthErrorHandler.getMaoriErrorMessage(error)
    }
return AuthErrorHandler.getEnglishErrorMessage(error)
  }
private static getMaoriErrorMessage(error: AuthError | Error): string {
const errorMap: Record<string, string> = {
      'auth/user-not-found': 'Kāore i kitea te kaiwhakamahi',
      'auth/wrong-password': 'He hē te kupuhipa',
      'auth/email-already-in-use': 'Kua whakamahia kētia tēnei īmēra',
      'auth/weak-password': 'He māngere te kupuhipa',
      'auth/invalid-email': 'He muhu te īmēra',
      'auth/too-many-requests': 'He maha rawa ngā tono',
      'auth/network-request-failed': 'I rahua te hononga',,
default: 'I puta he raru. Me ngana anō.',
    }

if ('code' in error) {
return errorMap[error.code] || errorMap.default
    }
return errorMap.default
  }
private static getEnglishErrorMessage(error: AuthError | Error): string {
const errorMap: Record<string, string> = {
      'auth/user-not-found':
        'No account found with this email address. Would you like to create one?',
      'auth/wrong-password': 'Incorrect password. Please try again or reset your password.',
      'auth/email-already-in-use': 'An account already exists with this email address.',
      'auth/weak-password': 'Password should be at least 6 characters long.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/popup-closed-by-user': 'Sign-in cancelled. Please try again.',
      'auth/popup-blocked': 'Pop-up blocked. Please allow pop-ups for this site.',,
default: 'Authentication failed. Please try again.',
    }

if ('code' in error) {
return errorMap[error.code] || errorMap.default
    }
return error.message || errorMap.default
  }
}
export function AuthProvider(__{ children }: AuthProviderProps) {// Enhanced state management
const [authState, setAuthState] = useState<AuthState>({,
user: null,,
profile: null,,
loading: true,,
error: null,,
isOnline: true,,
lastActivity: null,})

const [culturalContext, setCulturalContext] = useState<CulturalContext>({,
preferredLanguage: 'both',
  })

  // Network status monitoring
useEffect_(() => {
const handleOnline = () => {
setAuthState(_(prev) => ({ ...prev, isOnline: true }))
    }

const handleOffline = () => {
setAuthState(_(prev) => ({ ...prev, isOnline: false }))
    }

window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

return () => {
window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Activity tracking for session management
const updateActivity = useCallback_(() => {
setAuthState(_(prev) => ({ ...prev, lastActivity: new Date() }))
  }, [])

useEffect_(() => {
const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    const throttledUpdate = throttle(updateActivity, 30000) // Update every 30 seconds max
events.forEach(_(event) => {
document.addEventListener(event, throttledUpdate)
    })

return () => {
events.forEach(_(event) => {
document.removeEventListener(event, throttledUpdate)
      })
    }
  }, [updateActivity])

  // Enhanced Firebase auth state listener
useEffect_(() => {
if (!FirebaseService.isReady()) {
console.warn('⚠️  Firebase services not ready, skipping auth state listener')
      setAuthState(_(prev) => ({ ...prev, loading: false }))
      return
    }
const unsubscribe = onAuthStateChanged(
_auth, 
_async (user) => {
try {
setAuthState(_(prev) => ({ ...prev, loading: true, error: null }))

if (user) {
            // Get enhanced user profile
const profile = await userRoleService.getUserProfile(user)

            // Set cultural preferences based on profile
setCulturalContext({,
preferredLanguage: (
profile.metadata as { culturalAffiliation?: string }
              )?.culturalAffiliation?.includes('Māori')
                ? 'both'
                : 'en',
            })

            // Log successful authentication
await writeEpisode('auth-provider', {,
timestamp: new Date().toISOString(),,
agent: 'agent:auth-provider',,
action: 'user_authenticated',,
context: {,
user_id: user.uid,;,
role: profile.role,;,
email_verified: user.emailVerified,;,
sign_in_method: user.providerData[0]?.providerId || 'email',,
text: `User authenticated: ${profile.role} - ${user.email}`,
              },
            })

setAuthState(_(prev) => ({
              ...prev,;
user,;
profile,;,
loading: false,,
lastActivity: new Date(),
            }))
          } else {
            // Clear user session
userRoleService.clearCache()
            setAuthState(_(prev) => ({
              ...prev,;,
user: null,,
profile: null,,
loading: false,
            }))
          }
        } catch (error) {
console.error('Auth state change error: ', error)
          const errorMessage = AuthErrorHandler.getErrorMessage(
error as AuthError,;
culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en',
          )

setAuthState(_(prev) => ({
            ...prev,;,
loading: false,,
error: errorMessage,
          }))
        }
      },
      (error) => {
console.error('Auth state listener error: ', error)
        setAuthState(_(prev) => ({
          ...prev,;,
loading: false,,
error: AuthErrorHandler.getErrorMessage(
error,;
culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en',
          ),
        }))
      },
    )

return unsubscribe
  }, [culturalContext.preferredLanguage])

  // Enhanced authentication methods
const signUp = useCallback(
_async (,
email: string, ,
_password: string, 
_additionalData?: {
displayName?: string
        role?: 'teacher' | 'student'
        culturalAffiliation?: string
        school?: string
      }, 
    ) => {
try {
setAuthState(_(prev) => ({ ...prev, loading: true, error: null }))

const userCredential: UserCredential = await createUserWithEmailAndPassword(
auth,;
email,;
password,
        )
        const { user } = userCredential

        // Update profile if display name provided
if (additionalData?.displayName) {
await updateProfile(user, {,
displayName: additionalData.displayName,
          })
        }

        // Send email verification
await sendEmailVerification(user)

        // Save additional user data to Firestore
if (additionalData) {
const userDocRef = doc(db, 'users', user.uid)
          await setDoc(userDocRef, {
            ...additionalData,;,
email: user.email,;,
createdAt: serverTimestamp(),,
emailVerified: false,,
onboardingCompleted: false,
          })
        }

        // Log successful registration
await writeEpisode('auth-provider', {,
timestamp: new Date().toISOString(),,
agent: 'agent:auth-provider',,
action: 'user_registered',,
context: {,
user_id: user.uid,;,
email: user.email,;,
role: additionalData?.role || 'guest',,
text: `New user registered: ${user.email}`,
          },
        })

return { data: { user }, error: null }
      } catch (error) {
const errorMessage = AuthErrorHandler.getErrorMessage(
error as AuthError,;
culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en',
        )

setAuthState(_(prev) => ({ ...prev, loading: false, error: errorMessage }))
        return { data: { user: null }, error: { message: errorMessage } }
      }
    },
    [culturalContext.preferredLanguage],
  )

const logIn = useCallback(
_async (email: string,  _password: string) => {
try {
setAuthState(_(prev) => ({ ...prev, loading: true, error: null }))

const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const { user } = userCredential

return { data: { user }, error: null }
      } catch (error) {
const errorMessage = AuthErrorHandler.getErrorMessage(
error as AuthError,;
culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en',
        )

setAuthState(_(prev) => ({ ...prev, loading: false, error: errorMessage }))
        return { data: { user: null }, error: { message: errorMessage } }
      }
    },
    [culturalContext.preferredLanguage],
  )

const signInWithGoogle = useCallback(_async () => {
try {
setAuthState(_(prev) => ({ ...prev, loading: true, error: null }))

const provider = new GoogleAuthProvider()
      // Add custom parameters for better UX
provider.setCustomParameters({,
prompt: 'select_account',
      })

const userCredential = await signInWithPopup(auth, provider)
      const { user } = userCredential

      // Check if this is a new user and needs role setup
const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (!userDoc.exists()) {
        // This will trigger the role selection flow
return { data: { user, needsRoleSetup: true }, error: null }
      }
return { data: { user }, error: null }
    } catch (error) {
const errorMessage = AuthErrorHandler.getErrorMessage(
error as AuthError,;
culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en',
      )

setAuthState(_(prev) => ({ ...prev, loading: false, error: errorMessage }))
      return { data: { user: null }, error: { message: errorMessage } }
    }
  }, [culturalContext.preferredLanguage])

const logOut = useCallback(_async () => {
try {
setAuthState(_(prev) => ({ ...prev, loading: true, error: null }))

await signOut(auth)
      userRoleService.clearCache()

      // Log successful logout
await writeEpisode('auth-provider', {,
timestamp: new Date().toISOString(),,
agent: 'agent:auth-provider',,
action: 'user_logged_out',,
context: {,
text: 'User logged out successfully',
        },
      })

return { error: null }
    } catch (error) {
const errorMessage = AuthErrorHandler.getErrorMessage(
error as AuthError,;
culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en',
      )

setAuthState(_(prev) => ({ ...prev, loading: false, error: errorMessage }))
      return { error: { message: errorMessage } }
    }
  }, [culturalContext.preferredLanguage])

const resetPassword = useCallback(
_async (email: string) => {
try {
await sendPasswordResetEmail(auth, email)
        return { success: true, error: null }
      } catch (error) {
const errorMessage = AuthErrorHandler.getErrorMessage(
error as AuthError,;
culturalContext.preferredLanguage === 'mi' ? 'mi' : 'en',
        )
        return { success: false, error: { message: errorMessage } }
      }
    },
    [culturalContext.preferredLanguage],
  )

const updateUserProfile = useCallback(
_async (updates: Partial<UserProfile>) => {
if (!authState.user) return { success: false, error: { message: 'No user logged in' } }

try {
await userRoleService.updateProfile(authState.user.uid, updates)

        // Update local state
setAuthState(_(prev) => ({
          ...prev,;,
profile: prev.profile ? { ...prev.profile, ...updates } : null,
        }))

return { success: true, error: null }
      } catch (error) {
const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
        return { success: false, error: { message: errorMessage } }
      }
    },
    [authState.user],
  )

  // Wrapper function for setCulturalContext to match interface
const setCulturalContextWrapper = useCallback(_(context: Partial<CulturalContext>) => {
setCulturalContext(_(prev) => ({ ...prev, ...context }))
  }, [])

  // Memoized context value for performance
const contextValue = useMemo(
_() => (_{,
currentUser: authState.user, ,
_session: authState.user,  _// Firebase User as session,
profile: authState.profile, ,
_loading: authState.loading, ,
_error: authState.error, ,
_isOnline: authState.isOnline, ,
_lastActivity: authState.lastActivity, 
_culturalContext, ,
_setCulturalContext: setCulturalContextWrapper, 
signUp, 
logIn, 
signInWithGoogle, 
logOut, 
resetPassword, 
updateUserProfile, 
_// Utility methods,
hasPermission: (resource: string,  _action: string,  _context?: { resourceId?: string }) => {
return authState.profile
          ? userRoleService.hasPermission(authState.profile, resource, action, context)
          : false
      },,
getDashboardRoute: () => {
return authState.profile ? userRoleService.getDashboardRoute(authState.profile.role) : '/'
      },,
canAccessCulturalContent: (_level: 'low' | 'medium' | 'high' | 'critical') => {
return authState.profile
          ? userRoleService.canAccessCulturalContent(authState.profile, level)
          : false
      },
    }),
    [
authState,;
culturalContext,;
setCulturalContextWrapper,;
signUp,;
logIn,;
signInWithGoogle,;
logOut,;
resetPassword,;
updateUserProfile,
    ],
  )

return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// Utility function for throttling}
function throttle<T extends (_...args: Parameters<T>) => void>(,
func: T,;,
delay: number,
): (_...args: Parameters<T>) => void {
let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastExecTime = 0

return (_...args: Parameters<T>) => {
const currentTime = Date.now()

if (currentTime - lastExecTime > delay) {
func(...args)
      lastExecTime = currentTime
    } else {
if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout_(() => {
func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}
