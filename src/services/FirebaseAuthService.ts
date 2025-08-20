/**
 * Firebase Authentication Service
 * Comprehensive authentication utilities for Te Ao Mārama platform
 * Integrates with enhanced Firebase configuration and cultural context
 */
import {User,
AuthError,
sendPasswordResetEmail,
confirmPasswordReset,
sendEmailVerification,
updatePassword,
updateEmail,
updateProfile,
deleteUser,
EmailAuthProvider,
reauthenticateWithCredential,
linkWithCredential,
unlink,
multiFactor,
PhoneAuthProvider} from 'firebase/auth'
import {doc,
collection,
addDoc,
updateDoc,
deleteDoc,
serverTimestamp,
increment} from 'firebase/firestore'
import {auth, db, FirebaseService} from '../firebaseConfig'
import {userRoleService, type UserProfile} from './UserRoleService'
import {writeEpisode} from '../ai/provenance'

// Enhanced authentication result interfaces
export interface AuthOperation {,
success: boolean
  error?: {,
code: string,
message: string
    culturalMessage?: string}
  data?: unknown
}
export interface PasswordValidation {,
isValid: boolean,
score: number // 0-100,
requirements: {,
minLength: boolean,
hasUppercase: boolean,
hasLowercase: boolean,
hasNumbers: boolean,
hasSymbols: boolean,
notCommon: boolean},
suggestions: string[]
}
export interface SecurityEvent {,
type: 'login' | 'logout' | 'password_change' | 'email_change' | 'failed_login' | 'suspicious_activity',
timestamp: Date
  userAgent?: string
  ipAddress?: string
  location?: string,
success: boolean
  details?: Record<string, unknown>}

/**
 * Comprehensive Firebase Authentication Service
 */
export class FirebaseAuthService {
private static instance: FirebaseAuthService
  private failedAttempts = new Map<string, number>()
  private suspiciousActivity = new Map<string, SecurityEvent[]>()
  
private constructor() {
    // Private constructor for singleton pattern
  }
static getInstance(): FirebaseAuthService {
if (!FirebaseAuthService.instance) {
FirebaseAuthService.instance = new FirebaseAuthService()
    }
return FirebaseAuthService.instance
  }

  /**
   * Enhanced password validation with cultural context
   */
validatePassword(password: string, culturalContext?: 'mi' | 'en'): PasswordValidation {
const validation: PasswordValidation = {,
isValid: false,,
score: 0,,
requirements: {,
minLength: password.length >= 8,,
hasUppercase: /[A-Z]/.test(password),,
hasLowercase: /[a-z]/.test(password),,
hasNumbers: /\d/.test(password),,
hasSymbols: /[!@#$%^&*()_+\-=\[\]{}':"\\|,.<>\/?]/.test(password),,
notCommon: !this.isCommonPassword(password)
      },,
suggestions: []
    }

    // Calculate score
let score = 0
    Object.values(validation.requirements).forEach(met => {
if (met) score += 16.67 // Each requirement is worth ~16.67 points (100/6)
    })

    // Length bonus
if (password.length >= 12) score += 10
    if (password.length >= 16) score += 10

validation.score = Math.min(100, Math.round(score))
    validation.isValid = validation.score >= 80

    // Generate suggestions based on culture
if (!validation.requirements.minLength) {
validation.suggestions.push(
culturalContext === 'mi' 
          ? 'Me roa ake te kupuhipa - 8 pū raina roa' 
          : 'Password must be at least 8 characters long'
      )
    }
if (!validation.requirements.hasUppercase || !validation.requirements.hasLowercase) {
validation.suggestions.push(
culturalContext === 'mi'
          ? 'Whakamahia ngā mata roroa me ngā mata iti'
          : 'Use both uppercase and lowercase letters'
      )
    }
if (!validation.requirements.hasNumbers) {
validation.suggestions.push(
culturalContext === 'mi'
          ? 'Whakaurua he tau'
          : 'Include at least one number'
      )
    }
if (!validation.requirements.hasSymbols) {
validation.suggestions.push(
culturalContext === 'mi'
          ? 'Whakaurua he tohu motuhake (!@#$...)'
          : 'Include a special character (!@#$...)'
      )
    }
return validation
  }

  /**
   * Enhanced password reset with cultural messaging
   */
async resetPassword(email: string, culturalContext?: 'mi' | 'en'): Promise<AuthOperation> {
try {
await sendPasswordResetEmail(auth, email, {,
url: `${window.location.origin}/login`,,
handleCodeInApp: false
      })

      // Log password reset request
await this.logSecurityEvent({,
type: 'password_change',,
timestamp: new Date(),,
success: true,,
details: { email }
      })

await writeEpisode('auth-password-reset', {,
timestamp: new Date().toISOString(),,
agent: 'agent:firebase-auth',,
action: 'password_reset_requested',,
context: {
email,;
culturalContext,;,
text: 'Password reset email sent successfully'
        }
      })

return {,
success: true,,
data: {,
message: culturalContext === 'mi' 
            ? 'Kua tukuna te īmēra whakatika kupuhipa'
            : 'Password reset email sent successfully'
        }
      }
    } catch (error) {
const authError = error as AuthError
      
await this.logSecurityEvent({,
type: 'password_change',,
timestamp: new Date(),,
success: false,,
details: { email, error: authError.code }
      })

return {,
success: false,,
error: {,
code: authError.code,;,
message: authError.message,;,
culturalMessage: culturalContext === 'mi'
            ? 'I hē te tukunga o te īmēra whakatika kupuhipa'
            : 'Failed to send password reset email'
        }
      }
    }
  }

  /**
   * Check if password is in common password list
   */
private isCommonPassword(password: string): boolean {
const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123',
      'password123', 'admin', 'letmein', 'welcome', 'monkey'
    ]
    return commonPasswords.includes(password.toLowerCase())
  }

  /**
   * Log security events for monitoring
   */
private async logSecurityEvent(event: SecurityEvent): Promise<void> {
try {
const eventRef = collection(db, 'security_events')
      await addDoc(eventRef, {
        ...event,;,
timestamp: serverTimestamp()
      })
    } catch (error) {
console.warn('Failed to log security event: ', error)
    }
  }
}

// Export singleton instance
export const _firebaseAuthService = FirebaseAuthService.getInstance()
