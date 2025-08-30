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
  Smartphone,
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DualRoleLogin.css';

interface LoginForm {
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'kaitiaki';
  mfaCode: string;
  culturalClearance: boolean;
}

interface SecurityMetrics {
  loginAttempts: number;
  failedAttempts: number;
  lastLoginTime: number;
  culturalValidationTime: number;
  mfaSuccessRate: number;
}

const DualRoleLogin: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    role: 'student',
    mfaCode: '',
    culturalClearance: false,
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

  const simulateMFA = async (): Promise<boolean> => {
    // Simulate MFA verification
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

    // Simulate MFA success rate
    const success = Math.random() > 0.05; // 95% success rate
    setSecurityMetrics((prev) => ({
      ...prev,
      mfaSuccessRate: success ? prev.mfaSuccessRate + 1 : prev.mfaSuccessRate,
    }));

    return success;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      // Update security metrics
      setSecurityMetrics((prev) => ({
        ...prev,
        loginAttempts: prev.loginAttempts + 1,
      }));

      // Step 1: Cultural validation for Kaitiaki
      if (form.role === 'kaitiaki') {
        setSuccess('Validating cultural clearance...');
        const culturalValid = await simulateCulturalValidation();

        if (!culturalValid) {
          setErrors(['Cultural clearance denied. Please contact your cultural advisor.']);
          setSecurityMetrics((prev) => ({
            ...prev,
            failedAttempts: prev.failedAttempts + 1,
          }));
          setIsLoading(false);
          return;
        }
      }

      // Step 2: MFA verification
      if (showMfa) {
        setSuccess('Verifying MFA code...');
        const mfaValid = await simulateMFA();

        if (!mfaValid) {
          setErrors(['Invalid MFA code. Please try again.']);
          setSecurityMetrics((prev) => ({
            ...prev,
            failedAttempts: prev.failedAttempts + 1,
          }));
          setIsLoading(false);
          return;
        }
      }

      // Step 3: Final authentication
      setSuccess('Authenticating...');
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate authentication success
      setSecurityMetrics((prev) => ({
        ...prev,
        lastLoginTime: Date.now(),
      }));

      setSuccess('Authentication successful! Redirecting...');

      // Redirect based on role
      setTimeout(() => {
        switch (form.role) {
          case 'student':
            navigate('/student-dashboard');
            break;
          case 'teacher':
            navigate('/teacher-dashboard');
            break;
          case 'kaitiaki':
            navigate('/supreme-coordination');
            break;
        }
      }, 1500);
    } catch {
      setErrors(['Authentication failed. Please try again.']);
      setSecurityMetrics((prev) => ({
        ...prev,
        failedAttempts: prev.failedAttempts + 1,
      }));
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
          <div className="role-selector">
            <h3>Select Your Role</h3>
            <div className="role-options">
              {roles.map((role) => (
                <button
                  key={role.value}
                  className={`role-option ${form.role === role.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('role', role.value)}
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
