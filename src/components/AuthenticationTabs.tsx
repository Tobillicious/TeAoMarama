import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Shield,
} from 'lucide-react';
import React, { useState } from 'react';
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
  const { login } = useAuth();
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
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>('');

  const roles = [
    { value: 'student', label: 'Ākonga (Student)', icon: <GraduationCap />, color: '#3b82f6' },
    { value: 'teacher', label: 'Kaiako (Teacher)', icon: <BookOpen />, color: '#10b981' },
    { value: 'kaitiaki', label: 'Kaitiaki (Guardian)', icon: <Shield />, color: '#8b5cf6' },
  ];

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
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/teacher-dashboard');
        }, 1500);
      } else {
        setErrors([result.error || 'Login failed. Please try again.']);
      }
    } catch (error) {
      setErrors(['An unexpected error occurred. Please try again.']);
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
      // Here you would call Firebase Auth createUserWithEmailAndPassword
      setSuccess('Account created successfully! Please check your email to verify your account.');

      // Reset form and switch to sign-in
      setSignUpForm({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        culturalClearance: false,
      });

      setTimeout(() => {
        setActiveTab('signin');
      }, 2000);
    } catch (error) {
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

    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      // Here you would call Firebase Auth sendPasswordResetEmail
      setSuccess('Password reset email sent! Please check your inbox.');
      setResetForm({ email: '' });
    } catch (error) {
      setErrors(['Failed to send password reset email. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (role: 'student' | 'teacher' | 'kaitiaki') => {
    setLoginForm((prev) => ({ ...prev, role }));
  };

  const handleCulturalClearanceChange = (hasClearance: boolean) => {
    setLoginForm((prev) => ({ ...prev, culturalClearance: hasClearance }));
  };

  return (
    <div className="auth-tabs-container">
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
                  onClick={() => handleRoleChange(role.value as 'student' | 'teacher' | 'kaitiaki')}
                  style={{ borderColor: role.color }}
                >
                  <div className="role-icon" style={{ color: role.color }}>
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
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
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
                  onChange={(e) =>
                    handleCulturalClearanceChange(e.target.checked)
                  }
                  disabled={isLoading}
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

          <button className="auth-button" onClick={() => handleLogin(loginForm)} disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
          
          {/* Demo Mode Helper */}
          <div className="demo-mode-helper" style={{ 
            marginTop: '1rem', 
            padding: '0.75rem', 
            backgroundColor: '#fef3cd', 
            border: '1px solid #facc15',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: '#92400e'
          }}>
            <strong>🎭 Demo Mode Available:</strong><br/>
            Use any email containing: @teaomarama.nz, demo, teacher, student, or kaitiaki<br/>
            <em>Password can be anything for demo users</em>
          </div>
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
                  onClick={() => setSignUpForm((prev) => ({ ...prev, role: role.value as 'student' | 'teacher' | 'kaitiaki' }))}
                  style={{ borderColor: role.color }}
                >
                  <div className="role-icon" style={{ color: role.color }}>
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
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={signUpForm.password}
              onChange={(e) => setSignUpForm((prev) => ({ ...prev, password: e.target.value }))}
              disabled={isLoading}
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
              disabled={isLoading}
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
                  disabled={isLoading}
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

          <button className="auth-button" onClick={() => handleSignUp(signUpForm)} disabled={isLoading}>
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
              disabled={isLoading}
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

          <button className="auth-button" onClick={() => handlePasswordReset(resetForm.email)} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthenticationTabs;
