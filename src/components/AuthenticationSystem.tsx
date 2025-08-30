import React, { useEffect, useState } from 'react';
import './AuthenticationSystem.css';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin' | 'cultural-leader';
  culturalBackground: string;
  permissions: string[];
  profile: {
    avatar: string;
    teReoLevel: 'beginner' | 'intermediate' | 'advanced' | 'fluent';
    culturalEngagement: number;
    preferences: {
      language: 'en' | 'mi' | 'both';
      culturalContent: boolean;
      accessibility: boolean;
    };
  };
  lastLogin: string;
  isActive: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const AuthenticationSystem: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const [currentView, setCurrentView] = useState<'login' | 'register' | 'profile' | 'security'>(
    'login',
  );
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'student' as const,
    culturalBackground: '',
    teReoLevel: 'beginner' as const,
    languagePreference: 'en' as const,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Check for existing session
    checkExistingSession();
  }, []);

  const checkExistingSession = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser: User = {
        id: 'user-001',
        email: formData.email,
        name: 'Aria Tāne',
        role: 'student',
        culturalBackground: 'Māori, Pacific',
        permissions: ['read', 'write', 'cultural-content'],
        profile: {
          avatar: '👩‍🎓',
          teReoLevel: 'intermediate',
          culturalEngagement: 85,
          preferences: {
            language: 'both',
            culturalContent: true,
            accessibility: true,
          },
        },
        lastLogin: new Date().toISOString(),
        isActive: true,
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      setCurrentView('profile');
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please check your credentials.',
      }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setAuthState((prev) => ({
        ...prev,
        error: 'Passwords do not match.',
      }));
      return;
    }

    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newUser: User = {
        id: `user-${Date.now()}`,
        email: formData.email,
        name: formData.name,
        role: formData.role,
        culturalBackground: formData.culturalBackground,
        permissions: ['read'],
        profile: {
          avatar: '👤',
          teReoLevel: formData.teReoLevel,
          culturalEngagement: 0,
          preferences: {
            language: formData.languagePreference,
            culturalContent: true,
            accessibility: true,
          },
        },
        lastLogin: new Date().toISOString(),
        isActive: true,
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      setCurrentView('profile');
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Registration failed. Please try again.',
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    setCurrentView('login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: 'student',
      culturalBackground: '',
      teReoLevel: 'beginner',
      languagePreference: 'en',
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return '👩‍🎓';
      case 'teacher':
        return '👨‍🏫';
      case 'admin':
        return '👨‍💼';
      case 'cultural-leader':
        return '🏛️';
      default:
        return '👤';
    }
  };

  const getTeReoLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return '#ef4444';
      case 'intermediate':
        return '#f59e0b';
      case 'advanced':
        return '#10b981';
      case 'fluent':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  if (authState.isAuthenticated && authState.user) {
    return (
      <div className="authentication-system">
        <div className="auth-header">
          <h1>🔐 Authentication System</h1>
          <p>Welcome back, {authState.user.name}!</p>
        </div>

        <div className="auth-navigation">
          <button
            className={`nav-btn ${currentView === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentView('profile')}
          >
            👤 Profile
          </button>
          <button
            className={`nav-btn ${currentView === 'security' ? 'active' : ''}`}
            onClick={() => setCurrentView('security')}
          >
            🔒 Security
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>

        <div className="auth-content">
          {currentView === 'profile' && (
            <div className="profile-section">
              <div className="profile-header">
                <div className="profile-avatar">{authState.user.profile.avatar}</div>
                <div className="profile-info">
                  <h2>{authState.user.name}</h2>
                  <p className="user-role">
                    {getRoleIcon(authState.user.role)}{' '}
                    {authState.user.role.charAt(0).toUpperCase() + authState.user.role.slice(1)}
                  </p>
                  <p className="user-email">{authState.user.email}</p>
                </div>
              </div>

              <div className="profile-details">
                <div className="detail-card">
                  <h3>Cultural Background</h3>
                  <p>{authState.user.culturalBackground}</p>
                </div>

                <div className="detail-card">
                  <h3>Te Reo Māori Level</h3>
                  <div className="te-reo-level">
                    <span
                      className="level-badge"
                      style={{
                        backgroundColor: getTeReoLevelColor(authState.user.profile.teReoLevel),
                      }}
                    >
                      {authState.user.profile.teReoLevel.charAt(0).toUpperCase() +
                        authState.user.profile.teReoLevel.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="detail-card">
                  <h3>Cultural Engagement</h3>
                  <div className="engagement-meter">
                    <div className="meter-bar">
                      <div
                        className="meter-fill"
                        style={{ width: `${authState.user.profile.culturalEngagement}%` }}
                      ></div>
                    </div>
                    <span>{authState.user.profile.culturalEngagement}%</span>
                  </div>
                </div>

                <div className="detail-card">
                  <h3>Preferences</h3>
                  <div className="preferences">
                    <div className="preference-item">
                      <span>Language:</span>
                      <span>
                        {authState.user.profile.preferences.language === 'both'
                          ? 'English & Te Reo'
                          : authState.user.profile.preferences.language === 'mi'
                          ? 'Te Reo Māori'
                          : 'English'}
                      </span>
                    </div>
                    <div className="preference-item">
                      <span>Cultural Content:</span>
                      <span>
                        {authState.user.profile.preferences.culturalContent
                          ? '✅ Enabled'
                          : '❌ Disabled'}
                      </span>
                    </div>
                    <div className="preference-item">
                      <span>Accessibility:</span>
                      <span>
                        {authState.user.profile.preferences.accessibility
                          ? '✅ Enabled'
                          : '❌ Disabled'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-card">
                  <h3>Permissions</h3>
                  <div className="permissions-list">
                    {authState.user.permissions.map((permission, index) => (
                      <span key={index} className="permission-badge">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'security' && (
            <div className="security-section">
              <h2>🔒 Security Settings</h2>

              <div className="security-options">
                <div className="security-card">
                  <h3>Change Password</h3>
                  <form className="password-form">
                    <div className="form-group">
                      <label>Current Password</label>
                      <input type="password" placeholder="Enter current password" />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="password" placeholder="Enter new password" />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input type="password" placeholder="Confirm new password" />
                    </div>
                    <button type="submit" className="btn-primary">
                      Update Password
                    </button>
                  </form>
                </div>

                <div className="security-card">
                  <h3>Two-Factor Authentication</h3>
                  <div className="two-factor-status">
                    <span className="status-indicator disabled">❌ Disabled</span>
                    <button className="btn-secondary">Enable 2FA</button>
                  </div>
                </div>

                <div className="security-card">
                  <h3>Session Management</h3>
                  <div className="session-info">
                    <p>Last Login: {new Date(authState.user.lastLogin).toLocaleString()}</p>
                    <button className="btn-secondary">View All Sessions</button>
                  </div>
                </div>

                <div className="security-card">
                  <h3>Privacy Settings</h3>
                  <div className="privacy-options">
                    <div className="privacy-item">
                      <span>Profile Visibility</span>
                      <select defaultValue="friends">
                        <option value="public">Public</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                    <div className="privacy-item">
                      <span>Cultural Content Sharing</span>
                      <select defaultValue="enabled">
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="authentication-system">
      <div className="auth-header">
        <h1>🔐 Authentication System</h1>
        <p>Welcome to our culturally integrated learning platform</p>
      </div>

      <div className="auth-navigation">
        <button
          className={`nav-btn ${currentView === 'login' ? 'active' : ''}`}
          onClick={() => setCurrentView('login')}
        >
          🔑 Login
        </button>
        <button
          className={`nav-btn ${currentView === 'register' ? 'active' : ''}`}
          onClick={() => setCurrentView('register')}
        >
          ✨ Register
        </button>
      </div>

      <div className="auth-content">
        {currentView === 'login' && (
          <div className="login-section">
            <h2>Welcome Back</h2>
            <p>Kia ora! Please sign in to continue your learning journey.</p>

            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {authState.error && <div className="error-message">{authState.error}</div>}

              <button type="submit" className="btn-primary" disabled={authState.isLoading}>
                {authState.isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="form-footer">
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        )}

        {currentView === 'register' && (
          <div className="register-section">
            <h2>Join Our Community</h2>
            <p>Create your account and begin your cultural learning journey.</p>

            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="student">👩‍🎓 Student</option>
                  <option value="teacher">👨‍🏫 Teacher</option>
                  <option value="admin">👨‍💼 Administrator</option>
                  <option value="cultural-leader">🏛️ Cultural Leader</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="culturalBackground">Cultural Background</label>
                <input
                  type="text"
                  id="culturalBackground"
                  name="culturalBackground"
                  value={formData.culturalBackground}
                  onChange={handleInputChange}
                  placeholder="e.g., Māori, Pacific, Pākehā, etc."
                />
              </div>

              <div className="form-group">
                <label htmlFor="teReoLevel">Te Reo Māori Level</label>
                <select
                  id="teReoLevel"
                  name="teReoLevel"
                  value={formData.teReoLevel}
                  onChange={handleInputChange}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="fluent">Fluent</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="languagePreference">Language Preference</label>
                <select
                  id="languagePreference"
                  name="languagePreference"
                  value={formData.languagePreference}
                  onChange={handleInputChange}
                >
                  <option value="en">English</option>
                  <option value="mi">Te Reo Māori</option>
                  <option value="both">Both Languages</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {authState.error && <div className="error-message">{authState.error}</div>}

              <button type="submit" className="btn-primary" disabled={authState.isLoading}>
                {authState.isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticationSystem;
