import type { User } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import './EnhancedFirebaseAuth.css';

interface UserRole {
  role: 'student' | 'teacher' | 'admin';
  school?: string;
  yearLevel?: string;
  subjects?: string[];
  culturalAffiliation?: string;
}

interface AuthUser extends User {
  role?: 'student' | 'teacher' | 'admin';
  culturalContext?: string;
}

interface EnhancedFirebaseAuthProps {
  onAuthSuccess?: (user: AuthUser) => void;
  className?: string;
}

const EnhancedFirebaseAuth: React.FC<EnhancedFirebaseAuthProps> = ({
  onAuthSuccess,
  className = '',
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'role-select'>('login');
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    school: '',
    yearLevel: '',
    subjects: [] as string[],
    culturalAffiliation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get user role and additional data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data() as UserRole;

        const authUser: AuthUser = {
          ...user,
          role: userData?.role || 'student',
          culturalContext: userData?.culturalAffiliation || 'General',
        };

        setCurrentUser(authUser);
        onAuthSuccess?.(authUser);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, [onAuthSuccess]);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (authMode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      if (!formData.displayName) {
        setError('Display name is required');
        return false;
      }
    }

    return true;
  };

  const saveUserData = async (user: User, role: 'student' | 'teacher') => {
    const userData: UserRole & {
      email: string;
      displayName: string;
      createdAt: Date;
    } = {
      role,
      email: user.email || '',
      displayName: formData.displayName || user.displayName || '',
      school: formData.school,
      yearLevel: role === 'student' ? formData.yearLevel : undefined,
      subjects: role === 'teacher' ? formData.subjects : undefined,
      culturalAffiliation: formData.culturalAffiliation,
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'users', user.uid), userData);
  };

  const handleEmailAuth = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      let userCredential;

      if (authMode === 'login') {
        userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        );
        await saveUserData(userCredential.user, userType);
      }

      // Handle successful authentication
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userData = userDoc.data() as UserRole;

      const authUser: AuthUser = {
        ...userCredential.user,
        role: userData?.role || userType,
        culturalContext: userData?.culturalAffiliation || formData.culturalAffiliation,
      };

      setCurrentUser(authUser);
      onAuthSuccess?.(authUser);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      // Check if user exists, if not, show role selection
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

      if (!userDoc.exists()) {
        setAuthMode('role-select');
        setLoading(false);
        return;
      }

      const userData = userDoc.data() as UserRole;
      const authUser: AuthUser = {
        ...userCredential.user,
        role: userData?.role || 'student',
        culturalContext: userData?.culturalAffiliation || 'General',
      };

      setCurrentUser(authUser);
      onAuthSuccess?.(authUser);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = async (role: 'student' | 'teacher') => {
    if (!auth.currentUser) return;

    setLoading(true);
    try {
      await saveUserData(auth.currentUser, role);

      const authUser: AuthUser = {
        ...auth.currentUser,
        role,
        culturalContext: formData.culturalAffiliation || 'General',
      };

      setCurrentUser(authUser);
      onAuthSuccess?.(authUser);
      setAuthMode('login');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  if (currentUser) {
    return (
      <div className={`firebase-auth authenticated ${className}`}>
        <div className="auth-user-info">
          <div>
            <p className="auth-user-name">
              Kia ora, {currentUser.displayName || currentUser.email}!
            </p>
            <p className="auth-user-meta">
              {currentUser.role === 'teacher' ? '👩‍🏫 Kaiako' : '👨‍🎓 Ākonga'} •{' '}
              {currentUser.culturalContext}
            </p>
          </div>
          <button onClick={handleSignOut} className="auth-signout-button">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  if (authMode === 'role-select') {
    return (
      <div className={`firebase-auth role-select ${className}`}>
        <h3 className="auth-title">Choose Your Role - Kōwhiri tō tūranga</h3>

        <div className="auth-role-buttons">
          <button
            onClick={() => handleRoleSelection('student')}
            disabled={loading}
            className="auth-role-button student"
          >
            <div>
              <div className="auth-role-icon">👨‍🎓</div>
              <h4 className="auth-role-title">Student / Ākonga</h4>
              <p className="auth-role-description">Access learning materials and activities</p>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelection('teacher')}
            disabled={loading}
            className="auth-role-button teacher"
          >
            <div>
              <div className="auth-role-icon">👩‍🏫</div>
              <h4 className="auth-role-title">Teacher / Kaiako</h4>
              <p className="auth-role-description">Access teaching resources and planning tools</p>
            </div>
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}
      </div>
    );
  }

  return (
    <div className={`firebase-auth ${className}`}>
      <div className="auth-header">
        <h2 className="auth-title">🌿 TeAoMarama</h2>
        <p className="auth-subtitle">
          {authMode === 'login' ? 'Sign in to your account' : 'Create your account'}
        </p>
      </div>

      {/* User Type Selection for Registration */}
      {authMode === 'register' && (
        <div className="auth-user-type-selection">
          <label className="auth-user-type-label">I am a:</label>
          <div className="auth-user-type-buttons">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`auth-user-type-button ${userType === 'student' ? 'active' : ''}`}
            >
              👨‍🎓 Student / Ākonga
            </button>
            <button
              type="button"
              onClick={() => setUserType('teacher')}
              className={`auth-user-type-button ${userType === 'teacher' ? 'active' : ''}`}
            >
              👩‍🏫 Teacher / Kaiako
            </button>
          </div>
        </div>
      )}

      {/* Google Sign In */}
      <button onClick={handleGoogleAuth} disabled={loading} className="auth-google-button">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="auth-divider">or</div>

      {/* Email Form Fields */}
      <div className="auth-form-fields">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className="auth-input"
        />
      </div>

      {/* Registration Additional Fields */}
      {authMode === 'register' && (
        <div className="auth-form-fields">
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="auth-input"
          />

          <input
            type="text"
            placeholder="Display Name"
            value={formData.displayName}
            onChange={(e) => handleInputChange('displayName', e.target.value)}
            className="auth-input"
          />

          <input
            type="text"
            placeholder="School (optional)"
            value={formData.school}
            onChange={(e) => handleInputChange('school', e.target.value)}
            className="auth-input"
          />

          <select
            value={formData.culturalAffiliation}
            onChange={(e) => handleInputChange('culturalAffiliation', e.target.value)}
            aria-label="Cultural Affiliation"
            className="auth-select"
          >
            <option value="">Cultural Affiliation (optional)</option>
            <option value="Māori">Māori</option>
            <option value="Pacific Islander">Pacific Islander</option>
            <option value="European/Pākehā">European/Pākehā</option>
            <option value="Asian">Asian</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      )}

      {/* Submit Button */}
      <button onClick={handleEmailAuth} disabled={loading} className="auth-submit-button">
        {loading ? 'Loading...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
      </button>

      {/* Toggle Auth Mode */}
      <div className="auth-toggle-container">
        <button
          onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          className="auth-toggle-button"
        >
          {authMode === 'login'
            ? "Don't have an account? Sign up"
            : 'Already have an account? Sign in'}
        </button>
      </div>

      {/* Error Display */}
      {error && <div className="auth-error">{error}</div>}
    </div>
  );
};

export default EnhancedFirebaseAuth;
