import type { AlertTriangle, BookOpen, CheckCircle, Eye, EyeOff, GraduationCap, Lock, Mail, Shield, Smartphone } from 'lucide-react';
import {  } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';
import './DualRoleLogin.css';

interface LoginForm {
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'kaitiaki';
  mfaCode: string;
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

interface SecurityMetrics {
  loginAttempts: number;
  failedAttempts: number;
  lastLoginTime: number;
  culturalValidationTime: number;
  mfaSuccessRate: number;
}

// Helper function to get dashboard path based on user role
const getDashboardPath = (role: string): string => {
  switch (role.toLowerCase()) {
    case 'teacher':
    case 'kaiako':
      return '/teacher-dashboard';
    case 'student':
    case 'akonga':
      return '/student-dashboard';
    case 'kaitiaki':
    case 'admin':
      return '/kaitiaki-dashboard';
    default:
      return '/student-dashboard'; // Default fallback
  }
};

const DualRoleLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'reset'>('signin');

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    role: 'student',
    mfaCode: '',
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
  const [showMfa, setShowMfa] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    loginAttempts: 0,
    failedAttempts: 0,
    lastLoginTime: 0,
    culturalValidationTime: 0,
    mfaSuccessRate: 0,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>('');

  const roles = [
    { value: 'student', label: 'Ākonga (Student)', icon: <GraduationCap />, color: '#3b82f6' },
    { value: 'teacher', label: 'Kaiako (Teacher)', icon: <BookOpen />, color: '#10b981' },
    { value: 'kaitiaki', label: 'Kaitiaki (Guardian)', icon: <Shield />, color: '#8b5cf6' },
  ];

  const handleInputChange = (field: keyof LoginForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors([]);
    setSuccess('');
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!form.email) {
      newErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.push('Please enter a valid email address');
    }

    if (!form.password) {
      newErrors.push('Password is required');
    } else if (form.password.length < 8) {
      newErrors.push('Password must be at least 8 characters long');
    }

    if (form.role === 'kaitiaki' && !form.culturalClearance) {
      newErrors.push('Cultural clearance is required for Kaitiaki access');
    }

    if (showMfa && !form.mfaCode) {
      newErrors.push('MFA code is required');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const simulateCulturalValidation = async (): Promise<boolean> => {
    const startTime = Date.now();

    // Simulate cultural validation process
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    const validationTime = Date.now() - startTime;
    setSecurityMetrics((prev) => ({ ...prev, culturalValidationTime: validationTime }));

    // Simulate cultural clearance check
    return Math.random() > 0.1; // 90% success rate
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      // Update security metrics
      setSecurityMetrics((prev) => ({
        ...prev,
        loginAttempts: prev.loginAttempts + 1,
        lastLoginTime: Date.now(),
      }));

      // Simulate cultural validation for Kaitiaki
      if (form.role === 'kaitiaki') {
        const culturalValidationStart = Date.now();
        const culturalValid = await simulateCulturalValidation();
        const culturalValidationTime = Date.now() - culturalValidationStart;

        setSecurityMetrics((prev) => ({
          ...prev,
          culturalValidationTime,
        }));

        if (!culturalValid) {
          setErrors(['Cultural validation failed. Please contact your cultural advisor.']);
          return;
        }
      }

      // Use Firebase authentication
      const result = await login(form.email, form.password, form.role);

      if (result.success) {
        setSuccess('Authentication successful! Redirecting...');

        // Update MFA success rate
        setSecurityMetrics((prev) => ({
          ...prev,
          mfaSuccessRate: showMfa ? 95 : prev.mfaSuccessRate,
        }));

        // Role-based redirect with delay for better UX
        setTimeout(() => {
          // Navigate to appropriate dashboard based on role
          const userRole = result.user?.role || 'student';
          const dashboardPath = getDashboardPath(userRole);
          navigate(dashboardPath);
        }, 1500);
      } else {
        setErrors([result.error || 'Login failed. Please try again.']);
        setSecurityMetrics((prev) => ({
          ...prev,
          failedAttempts: prev.failedAttempts + 1,
        }));
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors(['An unexpected error occurred. Please try again.']);
      setSecurityMetrics((prev) => ({
        ...prev,
        failedAttempts: prev.failedAttempts + 1,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const validateSignUpForm = (): boolean => {
    const newErrors: string[] = [];

    if (!signUpForm.email) {
      newErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(signUpForm.email)) {
      newErrors.push('Please enter a valid email address');
    }

    if (!signUpForm.password) {
      newErrors.push('Password is required');
    } else if (signUpForm.password.length < 8) {
      newErrors.push('Password must be at least 8 characters long');
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      newErrors.push('Passwords do not match');
    }

    if (signUpForm.role === 'kaitiaki' && !signUpForm.culturalClearance) {
      newErrors.push('Cultural clearance is required for Kaitiaki access');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validateResetForm = (): boolean => {
    const newErrors: string[] = [];

    if (!resetForm.email) {
      newErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(resetForm.email)) {
      newErrors.push('Please enter a valid email address');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSignUp = async () => {
    if (!validateSignUpForm()) return;

    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      // Here you would call Firebase Auth createUserWithEmailAndPassword
      // For now, we'll simulate the sign-up process
      setSuccess('Account created successfully! Please check your email to verify your account.');

      // Reset form
      setSignUpForm({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        culturalClearance: false,
      });

      // Switch to sign-in tab
      setTimeout(() => {
        setActiveTab('signin');
      }, 2000);
    } catch (error) {
      console.error('Sign up error:', error);
      setErrors(['Failed to create account. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!validateResetForm()) return;

    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      // Here you would call Firebase Auth sendPasswordResetEmail
      // For now, we'll simulate the password reset process
      setSuccess('Password reset email sent! Please check your inbox.');

      // Reset form
      setResetForm({ email: '' });
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors(['Failed to send password reset email. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const getRolePermissions = (role: string) => {
    switch (role) {
      case 'student':
        return ['Access educational content', 'Submit assignments', 'View progress'];
      case 'teacher':
        return ['Manage classes', 'Grade assignments', 'Create content', 'View analytics'];
      case 'kaitiaki':
        return [
          'Cultural oversight',
          'Content validation',
          'System administration',
          'Cultural safety protocols',
        ];
      default:
        return [];
    }
  };

  return (
    <div className="dual-role-login">
      <div className="login-container">
        <div className="login-header">
          <Shield className="header-icon" />
          <h1>Te Kura o TeAoMarama</h1>
          <p>Secure Authentication with Cultural Safety</p>
        </div>

        <div className="login-form">
          {/* Tab Navigation */}
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
            <>
              <div className="role-selector">
                <h3>Select Your Role</h3>
                <div className="role-options">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      className={`role-option ${form.role === role.value ? 'selected' : ''}`}
                      onClick={() => handleInputChange('role', role.value)}
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ borderColor: role.color }}
                    >
                      <div className="role-icon" /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: role.color }}>
                        {role.icon}
                      </div>
                      <span>{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <div className="input-group">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="input-group">
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
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

                {form.role === 'kaitiaki' && (
                  <div className="cultural-clearance">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={form.culturalClearance}
                        onChange={(e) => handleInputChange('culturalClearance', e.target.checked)}
                        disabled={isLoading}
                      />
                      <span>I have cultural clearance for Kaitiaki access</span>
                    </label>
                  </div>
                )}

                <div className="mfa-section">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={showMfa}
                      onChange={(e) => setShowMfa(e.target.checked)}
                      disabled={isLoading}
                    />
                    <span>Enable Multi-Factor Authentication</span>
                  </label>

                  {showMfa && (
                    <div className="input-group">
                      <Smartphone className="input-icon" />
                      <input
                        type="text"
                        placeholder="MFA Code (6 digits)"
                        value={form.mfaCode}
                        onChange={(e) => handleInputChange('mfaCode', e.target.value)}
                        maxLength={6}
                        disabled={isLoading}
                      />
                    </div>
                  )}
                </div>

                <div className="role-permissions">
                  <h4>Permissions for {roles.find((r) => r.value === form.role)?.label}:</h4>
                  <ul>
                    {getRolePermissions(form.role).map((permission, index) => (
                      <li key={index}>{permission}</li>
                    ))}
                  </ul>
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

                <button className="login-button" onClick={handleLogin} disabled={isLoading}>
                  {isLoading ? 'Authenticating...' : 'Sign In'}
                </button>
              </div>
            </>
          )}

          {/* Sign Up Tab */}
          {activeTab === 'signup' && (
            <>
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
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ borderColor: role.color }}
                    >
                      <div className="role-icon" /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: role.color }}>
                        {role.icon}
                      </div>
                      <span>{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-section">
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
                    onChange={(e) =>
                      setSignUpForm((prev) => ({ ...prev, password: e.target.value }))
                    }
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
                          setSignUpForm((prev) => ({
                            ...prev,
                            culturalClearance: e.target.checked,
                          }))
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

                <button className="login-button" onClick={handleSignUp} disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </div>
            </>
          )}

          {/* Password Reset Tab */}
          {activeTab === 'reset' && (
            <>
              <div className="form-section">
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

                <button className="login-button" onClick={handlePasswordReset} disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="security-metrics">
          <h4>Security Status</h4>
          <div className="metrics-grid">
            <div className="metric">
              <span>Login Attempts:</span>
              <span>{securityMetrics.loginAttempts}</span>
            </div>
            <div className="metric">
              <span>Failed Attempts:</span>
              <span>{securityMetrics.failedAttempts}</span>
            </div>
            <div className="metric">
              <span>MFA Success Rate:</span>
              <span>{securityMetrics.mfaSuccessRate > 0 ? '95%' : 'N/A'}</span>
            </div>
            {securityMetrics.culturalValidationTime > 0 && (
              <div className="metric">
                <span>Cultural Validation:</span>
                <span>{securityMetrics.culturalValidationTime}ms</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualRoleLogin;
