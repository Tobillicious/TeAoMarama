import {createContext} from 'react'
import type { User } from 'firebase/auth'
import type { UserProfile } from './UserRoleService'

// Cultural context interface for Te Ao Māori integration
export interface CulturalContext {whakataukiOfTheDay?: string
  culturalCalendar?: {,
event: string,
date: string,
significance: string}[],
preferredLanguage: 'en' | 'mi' | 'both'
}

// Enhanced authentication result interfaces
export interface AuthResult {,
data: {,
user: User | null
    needsRoleSetup?: boolean},
error: {,
message: string
  } | null
}
export interface PasswordResetResult {,
success: boolean,
error: {,
message: string} | null
}
export interface ProfileUpdateResult {,
success: boolean,
error: {,
message: string} | null
}

// Enhanced AuthContext with comprehensive authentication features
export interface AuthContextType {// Core authentication state,
currentUser: User | null,
session: User | null // Firebase User as session,
profile: UserProfile | null,
loading: boolean,
error: string | null
  
  // Connection and activity tracking,
isOnline: boolean,
lastActivity: Date | null
  
  // Cultural context for Te Ao Māori integration,
culturalContext: CulturalContext,
setCulturalContext: (_context: Partial<CulturalContext>) => void
  
  // Authentication methods,
signUp: (,
_email: string,  ,
_password: string,  
_additionalData?: {
displayName?: string
      role?: 'teacher' | 'student'
      culturalAffiliation?: string
      school?: string}
  ) => Promise<AuthResult>
  ,
logIn: (_email: string,  _password: string) => Promise<AuthResult>
  ,
signInWithGoogle: () => Promise<AuthResult>
  ,
logOut: () => Promise<{ error: { message: string } | null }>
  ,
resetPassword: (_email: string) => Promise<PasswordResetResult>
  ,
updateUserProfile: (_updates: Partial<UserProfile>) => Promise<ProfileUpdateResult>
  
  // Permission and role-based access methods,
hasPermission: (,
_resource: string,  ,
_action: string,  
_context?: { resourceId?: string resourceType?: string }
  ) => boolean
  ,
getDashboardRoute: () => string
  ,
canAccessCulturalContent: (_level: 'low' | 'medium' | 'high' | 'critical') => boolean
}
export const _AuthContext = createContext<AuthContextType | undefined>(undefined)

// Type guards for better type safety
export const _isTeacher = (profile: UserProfile | null): profile is UserProfile & { role: 'teacher' } => {
return profile?.role === 'teacher'
}

export const _isStudent = (profile: UserProfile | null): profile is UserProfile & { role: 'student' } => {
return profile?.role === 'student'
}

export const _isAdmin = (profile: UserProfile | null): profile is UserProfile & { role: 'admin' } => {
return profile?.role === 'admin'
}

export const _hasRole = (profile: UserProfile | null, role: UserProfile['role']): boolean => {
return profile?.role === role
}

// Cultural sensitivity helpers
export const _getCulturalGreeting = (culturalContext: CulturalContext, timeOfDay: 'morning' | 'afternoon' | 'evening'): string => {
if (culturalContext.preferredLanguage === 'mi' || culturalContext.preferredLanguage === 'both') {
const greetings = {,
morning: 'Kia ora! Mōrena',,
afternoon: 'Kia ora',,
evening: 'Kia ora. Pō marie'
    }
    return greetings[timeOfDay]
  }
const greetings = {,
morning: 'Good morning',,
afternoon: 'Good afternoon', ,
evening: 'Good evening'
  }
  
return greetings[timeOfDay]
}

export const _getErrorMessageInPreferredLanguage = (,
errorKey: string, ,
culturalContext: CulturalContext
): string => {
const errorMessages = {
    'auth/user-not-found': {,
en: 'No account found with this email address.',,
mi: 'Kāore i kitea te kaiwhakamahi nā tēnei īmēra.'
    },
    'auth/wrong-password': {,
en: 'Incorrect password. Please try again.',,
mi: 'He hē te kupuhipa. Me ngana anō.'
    },
    'auth/email-already-in-use': {,
en: 'An account already exists with this email address.',,
mi: 'He tahua kē kua oti ke hanga mā tēnei īmēra.'
    },
    'default': {,
en: 'An error occurred. Please try again.',,
mi: 'I puta he raru. Me ngana anō.'
    }
  }
  
const messages = errorMessages[errorKey as keyof typeof errorMessages] || errorMessages.default
  
if (culturalContext.preferredLanguage === 'mi') {
return messages.mi
  }
return messages.en
}
