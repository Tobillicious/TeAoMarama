import { AlertTriangle, CheckCircle, Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';
import './AuthenticationTabs.css';

interface LoginForm {
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'kaitiaki';
  culturalClearance: boolean;
}

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'teacher' | 'kaitiaki';
  culturalClearance: boolean;
}

interface PasswordResetForm {
  email: string;
}

const AuthenticationTabs: React.FC = () => {
  const navigate = useNavigate();
  const { login, signUp, isAuthenticated, currentUser, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'reset'>('signin');

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
    role: 'student',
    culturalClearance: false,
  });

  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    culturalClearance: false,
  });

  const [resetForm, setResetForm] = useState<PasswordResetForm>({
    email: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const combinedLoading = isLoading || authLoading;
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>('');

  const roles = [
    { value: 'student', label: 'Ākonga (Student)', icon: <Shield />, color: '#3b82f6' },
    { value: 'teacher', label: 'Kaiako (Teacher)', icon: <Shield />, color: '#10b981' },
    { value: 'kaitiaki', label: 'Kaitiaki (Guardian)', icon: <Shield />, color: '#8b5cf6' },
  ];

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      // Use the role-based router to handle all role-based redirects
      navigate('/dashboard');
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleLogin = async (credentials: LoginForm) => {
    if (!credentials.email || !credentials.password) {
      setErrors(['Please fill in all fields']);
      return;
    }

    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      const result = await login(credentials.email, credentials.password, credentials.role);

      if (result.success) {
        setSuccess(
          `Login successful! Welcome ${
            credentials.role === 'teacher'
              ? 'Kaiako'
              : credentials.role === 'kaitiaki'
              ? 'Kaitiaki'
              : 'Ākonga'
          }!`,
        );
        // Navigation will happen in useEffect when isAuthenticated changes
      } else {
        setErrors([result.error || 'Login failed. Please try again.']);
      }
    } catch (error: unknown) {
      console.error('Login error:', error);
      setErrors(['Login failed. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (userData: SignUpForm) => {
    if (!userData.email || !userData.password || !userData.confirmPassword) {
      setErrors(['Please fill in all fields']);
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setErrors(['Passwords do not match']);
      return;
    }

    if (userData.password.length < 8) {
      setErrors(['Password must be at least 8 characters long']);
      return;
    }

    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      const result = await signUp({
        email: userData.email,
        password: userData.password,
        name: userData.email.split('@')[0], // Default name from email
        role: userData.role,
        iwiAffiliations: userData.culturalClearance
          ? ['Cultural clearance acknowledged']
          : undefined,
      });

      if (result.success) {
        setSuccess('Account created successfully! You are now logged in.');
        // Navigation will happen in useEffect when isAuthenticated changes

        // Reset form
        setSignUpForm({
          email: '',
          password: '',
          confirmPassword: '',
          role: 'student',
          culturalClearance: false,
        });
      } else {
        setErrors([result.error || 'Failed to create account. Please try again.']);
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setErrors(['Failed to create account. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (email: string) => {
    if (!email) {
      setErrors(['Please enter your email address']);
      return;
    }

    setErrors(['Password reset functionality is not available at this time.']);
  };

  const handleRoleChange = (role: 'student' | 'teacher' | 'kaitiaki') => {
    setLoginForm((prev) => ({ ...prev, role }));
  };

  const handleCulturalClearanceChange = (hasClearance: boolean) => {
    setLoginForm((prev) => ({ ...prev, culturalClearance: hasClearance }));
  };

  return (
    <div className="auth-tabs-container">
      <div className="auth-card">
        <div className="auth-header">
          <Shield className="header-icon" />
          <h1>Te Kura o TeAoMarama</h1>
          <p>Secure Authentication with Cultural Safety</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
          <button
            className={`auth-tab ${activeTab === 'reset' ? 'active' : ''}`}
            onClick={() => setActiveTab('reset')}
          >
            Reset Password
          </button>
        </div>

        {/* Sign In Tab */}
        {activeTab === 'signin' && (
          <div className="auth-content">
            <div className="role-selector">
              <h3>Select Your Role</h3>
              <div className="role-options">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    className={`role-option ${loginForm.role === role.value ? 'selected' : ''}`}
                    onClick={() =>
                      handleRoleChange(role.value as 'student' | 'teacher' | 'kaitiaki')
                    }
                    /* TODO: Move to external CSS */ style={{ borderColor: role.color }}
                  >
                    <div className="role-icon" /* TODO: Move to external CSS */ style={{ color: role.color }}>
                      {role.icon}
                    </div>
                    <span>{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={loginForm.email}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                disabled={combinedLoading}
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                disabled={combinedLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={combinedLoading}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {loginForm.role === 'kaitiaki' && (
              <div className="cultural-clearance">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={loginForm.culturalClearance}
                    onChange={(e) => handleCulturalClearanceChange(e.target.checked)}
                    disabled={combinedLoading}
                  />
                  <span>I have cultural clearance for Kaitiaki access</span>
                </label>
              </div>
            )}

            {errors.length > 0 && (
              <div className="error-messages">
                {errors.map((error, index) => (
                  <div key={index} className="error-message">
                    <AlertTriangle className="error-icon" />
                    {error}
                  </div>
                ))}
              </div>
            )}

            {success && (
              <div className="success-message">
                <CheckCircle className="success-icon" />
                {success}
              </div>
            )}

            <button
              className="auth-button"
              onClick={() => handleLogin(loginForm)}
              disabled={combinedLoading}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        )}

        {/* Sign Up Tab */}
        {activeTab === 'signup' && (
          <div className="auth-content">
            <div className="role-selector">
              <h3>Select Your Role</h3>
              <div className="role-options">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    className={`role-option ${signUpForm.role === role.value ? 'selected' : ''}`}
                    onClick={() =>
                      setSignUpForm((prev) => ({
                        ...prev,
                        role: role.value as 'student' | 'teacher' | 'kaitiaki',
                      }))
                    }
                    /* TODO: Move to external CSS */ style={{ borderColor: role.color }}
                  >
                    <div className="role-icon" /* TODO: Move to external CSS */ style={{ color: role.color }}>
                      {role.icon}
                    </div>
                    <span>{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={signUpForm.email}
                onChange={(e) => setSignUpForm((prev) => ({ ...prev, email: e.target.value }))}
                disabled={combinedLoading}
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={signUpForm.password}
                onChange={(e) => setSignUpForm((prev) => ({ ...prev, password: e.target.value }))}
                disabled={combinedLoading}
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={signUpForm.confirmPassword}
                onChange={(e) =>
                  setSignUpForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
                disabled={combinedLoading}
              />
            </div>

            {signUpForm.role === 'kaitiaki' && (
              <div className="cultural-clearance">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={signUpForm.culturalClearance}
                    onChange={(e) =>
                      setSignUpForm((prev) => ({ ...prev, culturalClearance: e.target.checked }))
                    }
                    disabled={combinedLoading}
                  />
                  <span>I have cultural clearance for Kaitiaki access</span>
                </label>
              </div>
            )}

            {errors.length > 0 && (
              <div className="error-messages">
                {errors.map((error, index) => (
                  <div key={index} className="error-message">
                    <AlertTriangle className="error-icon" />
                    {error}
                  </div>
                ))}
              </div>
            )}

            {success && (
              <div className="success-message">
                <CheckCircle className="success-icon" />
                {success}
              </div>
            )}

            <button
              className="auth-button"
              onClick={() => handleSignUp(signUpForm)}
              disabled={combinedLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        )}

        {/* Password Reset Tab */}
        {activeTab === 'reset' && (
          <div className="auth-content">
            <h3>Reset Your Password</h3>
            <p>Enter your email address and we'll send you a password reset link.</p>

            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={resetForm.email}
                onChange={(e) => setResetForm((prev) => ({ ...prev, email: e.target.value }))}
                disabled={combinedLoading}
              />
            </div>

            {errors.length > 0 && (
              <div className="error-messages">
                {errors.map((error, index) => (
                  <div key={index} className="error-message">
                    <AlertTriangle className="error-icon" />
                    {error}
                  </div>
                ))}
              </div>
            )}

            {success && (
              <div className="success-message">
                <CheckCircle className="success-icon" />
                {success}
              </div>
            )}

            <button
              className="auth-button"
              onClick={() => handlePasswordReset(resetForm.email)}
              disabled={combinedLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticationTabs;
