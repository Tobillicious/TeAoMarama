import React, { useEffect, useState } from 'react';
import './AuthenticationSystem.css';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin' | 'kaitiaki';
  culturalPreferences: {
    teReoLevel: 'beginner' | 'intermediate' | 'advanced' | 'fluent';
    culturalFocus: string[];
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  };
  securitySettings: {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    passwordLastChanged: Date;
  };
  profile: {
    avatar: string;
    bio: string;
    location: string;
    whakapapa?: string;
  };
}

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const AuthenticationSystem: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    currentUser: null,
    isLoading: false,
    error: null,
    success: null,
  });

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'profile' | 'security'>(
    'login',
  );
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'student' as User['role'],
    teReoLevel: 'beginner' as User['culturalPreferences']['teReoLevel'],
    culturalFocus: [] as string[],
    learningStyle: 'mixed' as User['culturalPreferences']['learningStyle'],
  });

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    location: '',
    whakapapapa: '',
  });

  // Cultural preferences state
  const [culturalPreferences, setCulturalPreferences] = useState({
    teReoLevel: 'beginner' as User['culturalPreferences']['teReoLevel'],
    culturalFocus: [] as string[],
    learningStyle: 'mixed' as User['culturalPreferences']['learningStyle'],
  });

  const culturalFocusOptions = [
    'Te Reo Māori',
    'Tikanga Māori',
    'Māori History',
    'Contemporary Māori Issues',
    'Māori Arts & Culture',
    'Environmental Kaitiakitanga',
    'Māori Leadership',
    'Whakapapa & Genealogy',
  ];

  const learningStyleOptions = [
    { value: 'visual', label: 'Visual Learning', icon: '👁️' },
    { value: 'auditory', label: 'Auditory Learning', icon: '👂' },
    { value: 'kinesthetic', label: 'Hands-on Learning', icon: '✋' },
    { value: 'mixed', label: 'Mixed Learning Styles', icon: '🔄' },
  ];

  const teReoLevelOptions = [
    { value: 'beginner', label: 'Beginner - Kōrero iti', icon: '🌱' },
    { value: 'intermediate', label: 'Intermediate - Kōrero āwhina', icon: '🌿' },
    { value: 'advanced', label: 'Advanced - Kōrero pai', icon: '🌳' },
    { value: 'fluent', label: 'Fluent - Kōrero tino pai', icon: '🌲' },
  ];

  // Initialize profile data when user is authenticated
  useEffect(() => {
    if (authState.currentUser) {
      setProfileData({
        name: authState.currentUser.name,
        bio: authState.currentUser.profile.bio,
        location: authState.currentUser.profile.location,
        whakapapapa: authState.currentUser.profile.whakapapa || '',
      });
      setCulturalPreferences({
        teReoLevel: authState.currentUser.culturalPreferences.teReoLevel,
        culturalFocus: [...authState.currentUser.culturalPreferences.culturalFocus],
        learningStyle: authState.currentUser.culturalPreferences.learningStyle,
      });
    }
  }, [authState.currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCulturalFocusChange = (focus: string) => {
    setCulturalPreferences((prev) => ({
      ...prev,
      culturalFocus: prev.culturalFocus.includes(focus)
        ? prev.culturalFocus.filter((f) => f !== focus)
        : [...prev.culturalFocus, focus],
    }));
  };

  const handleCulturalPreferenceChange = (
    field: keyof User['culturalPreferences'],
    value: User['culturalPreferences'][keyof User['culturalPreferences']],
  ) => {
    setCulturalPreferences((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setAuthState((prev) => ({ ...prev, error: 'Please fill in all required fields.' }));
      return false;
    }

    if (formData.password.length < 8) {
      setAuthState((prev) => ({ ...prev, error: 'Password must be at least 8 characters long.' }));
      return false;
    }

    if (activeTab === 'register') {
      if (!formData.name) {
        setAuthState((prev) => ({ ...prev, error: 'Please enter your full name.' }));
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setAuthState((prev) => ({ ...prev, error: 'Passwords do not match.' }));
        return false;
      }
    }

    return true;
  };

  const clearMessages = () => {
    setAuthState((prev) => ({ ...prev, error: null, success: null }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!validateForm()) return;

    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Mock authentication logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: '1',
        email: formData.email,
        name: 'Test User',
        role: formData.role,
        culturalPreferences: {
          teReoLevel: formData.teReoLevel,
          culturalFocus: formData.culturalFocus,
          learningStyle: formData.learningStyle,
        },
        securitySettings: {
          twoFactorEnabled: false,
          sessionTimeout: 30,
          passwordLastChanged: new Date(),
        },
        profile: {
          avatar: '/api/placeholder/150',
          bio: 'Kia ora! I am passionate about Māori education and cultural learning.',
          location: 'Aotearoa New Zealand',
          whakapapa: 'Ngāti Kahungunu, Ngāti Porou',
        },
      };

      setAuthState({
        isAuthenticated: true,
        currentUser: mockUser,
        isLoading: false,
        error: null,
        success: 'Welcome back! You have been successfully logged in.',
      });
    } catch {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Authentication failed. Please check your credentials.',
      }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!validateForm()) return;

    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Mock registration logic
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser: User = {
        id: '2',
        email: formData.email,
        name: formData.name,
        role: formData.role,
        culturalPreferences: {
          teReoLevel: formData.teReoLevel,
          culturalFocus: formData.culturalFocus,
          learningStyle: formData.learningStyle,
        },
        securitySettings: {
          twoFactorEnabled: false,
          sessionTimeout: 30,
          passwordLastChanged: new Date(),
        },
        profile: {
          avatar: '/api/placeholder/150',
          bio: 'Welcome to our learning community!',
          location: 'Aotearoa New Zealand',
        },
      };

      setAuthState({
        isAuthenticated: true,
        currentUser: mockUser,
        isLoading: false,
        error: null,
        success: 'Account created successfully! Welcome to our Māori cultural learning platform.',
      });
    } catch {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Registration failed. Please try again.',
      }));
    }
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      currentUser: null,
      isLoading: false,
      error: null,
      success: 'You have been successfully logged out.',
    });
    setActiveTab('login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: 'student',
      teReoLevel: 'beginner',
      culturalFocus: [],
      learningStyle: 'mixed',
    });
  };

  const updateProfile = async () => {
    if (!authState.currentUser) {
      setAuthState((prev) => ({ ...prev, error: 'Cannot update profile: no authenticated user' }));
      return;
    }

    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAuthState((prev) => ({
        ...prev,
        currentUser: prev.currentUser
          ? {
              ...prev.currentUser,
              name: profileData.name,
              profile: {
                ...prev.currentUser.profile,
                bio: profileData.bio,
                location: profileData.location,
                whakapapa: profileData.whakapapapa,
              },
            }
          : null,
        isLoading: false,
        success: 'Profile updated successfully!',
      }));
    } catch {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update profile. Please try again.',
      }));
    }
  };

  const updateCulturalPreferences = async () => {
    if (!authState.currentUser) {
      setAuthState((prev) => ({
        ...prev,
        error: 'Cannot update preferences: no authenticated user',
      }));
      return;
    }

    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAuthState((prev) => ({
        ...prev,
        currentUser: prev.currentUser
          ? {
              ...prev.currentUser,
              culturalPreferences: culturalPreferences,
            }
          : null,
        isLoading: false,
        success: 'Cultural preferences updated successfully!',
      }));
    } catch {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update cultural preferences. Please try again.',
      }));
    }
  };

  const updateSecuritySettings = async (updates: Partial<User['securitySettings']>) => {
    if (!authState.currentUser) {
      setAuthState((prev) => ({
        ...prev,
        error: 'Cannot update security settings: no authenticated user',
      }));
      return;
    }

    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAuthState((prev) => ({
        ...prev,
        currentUser: prev.currentUser
          ? {
              ...prev.currentUser,
              securitySettings: { ...prev.currentUser.securitySettings, ...updates },
            }
          : null,
        isLoading: false,
        success: 'Security settings updated successfully!',
      }));
    } catch {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update security settings. Please try again.',
      }));
    }
  };

  if (authState.isAuthenticated && authState.currentUser) {
    return (
      <div className="auth-system">
        <div className="auth-container">
          <div className="auth-header">
            <h1>🔐 User Profile & Settings</h1>
            <p>Manage your account and cultural preferences</p>
          </div>

          {authState.error && (
            <div className="auth-error">
              <span>⚠️ {authState.error}</span>
            </div>
          )}

          {authState.success && (
            <div className="auth-success">
              <span>✅ {authState.success}</span>
            </div>
          )}

          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
              aria-label="Profile settings tab"
            >
              👤 Profile
            </button>
            <button
              className={`auth-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
              aria-label="Security settings tab"
            >
              🔒 Security
            </button>
            <button className="auth-logout-btn" onClick={handleLogout} aria-label="Logout">
              🚪 Logout
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="auth-content">
              <div className="profile-section">
                <h2>Personal Information</h2>
                <div className="profile-grid">
                  <div className="profile-avatar">
                    <img src={authState.currentUser.profile.avatar} alt="User avatar" />
                    <button className="change-avatar-btn">Change Avatar</button>
                  </div>
                  <div className="profile-details">
                    <div className="form-group">
                      <label htmlFor="profile-name">Full Name</label>
                      <input
                        type="text"
                        id="profile-name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileInputChange}
                        aria-label="Full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="profile-bio">Bio</label>
                      <textarea
                        id="profile-bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileInputChange}
                        rows={3}
                        aria-label="User bio"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="profile-location">Location</label>
                      <input
                        type="text"
                        id="profile-location"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileInputChange}
                        aria-label="Location"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="profile-whakapapa">Whakapapa (Optional)</label>
                      <input
                        type="text"
                        id="profile-whakapapa"
                        name="whakapapapa"
                        value={profileData.whakapapapa}
                        onChange={handleProfileInputChange}
                        placeholder="e.g., Ngāti Kahungunu, Ngāti Porou"
                        aria-label="Whakapapa"
                      />
                    </div>
                    <button
                      className="auth-submit-btn"
                      onClick={updateProfile}
                      disabled={authState.isLoading}
                    >
                      {authState.isLoading ? '🔄 Updating...' : '💾 Save Profile'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="cultural-preferences-section">
                <h2>Cultural Learning Preferences</h2>
                <div className="preferences-grid">
                  <div className="form-group">
                    <label htmlFor="te-reo-level">Te Reo Māori Level</label>
                    <select
                      id="te-reo-level"
                      value={culturalPreferences.teReoLevel}
                      onChange={(e) =>
                        handleCulturalPreferenceChange(
                          'teReoLevel',
                          e.target.value as User['culturalPreferences']['teReoLevel'],
                        )
                      }
                      aria-label="Te Reo Māori proficiency level"
                    >
                      {teReoLevelOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Cultural Focus Areas</label>
                    <div className="checkbox-grid">
                      {culturalFocusOptions.map((focus) => (
                        <label key={focus} className="checkbox-item">
                          <input
                            type="checkbox"
                            checked={culturalPreferences.culturalFocus.includes(focus)}
                            onChange={() => handleCulturalFocusChange(focus)}
                            aria-label={`Select ${focus} as cultural focus area`}
                          />
                          <span>{focus}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="learning-style">Preferred Learning Style</label>
                    <select
                      id="learning-style"
                      value={culturalPreferences.learningStyle}
                      onChange={(e) =>
                        handleCulturalPreferenceChange(
                          'learningStyle',
                          e.target.value as User['culturalPreferences']['learningStyle'],
                        )
                      }
                      aria-label="Preferred learning style"
                    >
                      {learningStyleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="auth-submit-btn"
                    onClick={updateCulturalPreferences}
                    disabled={authState.isLoading}
                  >
                    {authState.isLoading ? '🔄 Updating...' : '💾 Save Preferences'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="auth-content">
              <div className="security-section">
                <h2>Security Settings</h2>
                <div className="security-grid">
                  <div className="security-item">
                    <div className="security-info">
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={authState.currentUser.securitySettings.twoFactorEnabled}
                        onChange={(e) =>
                          updateSecuritySettings({ twoFactorEnabled: e.target.checked })
                        }
                        aria-label="Enable two-factor authentication"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="security-item">
                    <div className="security-info">
                      <h3>Session Timeout</h3>
                      <p>Automatically log out after inactivity</p>
                    </div>
                    <select
                      value={authState.currentUser.securitySettings.sessionTimeout}
                      onChange={(e) =>
                        updateSecuritySettings({ sessionTimeout: parseInt(e.target.value) })
                      }
                      aria-label="Session timeout duration"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                    </select>
                  </div>

                  <div className="security-item">
                    <div className="security-info">
                      <h3>Password Last Changed</h3>
                      <p>
                        Last password update:{' '}
                        {authState.currentUser.securitySettings.passwordLastChanged.toLocaleDateString()}
                      </p>
                    </div>
                    <button className="change-password-btn">Change Password</button>
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
    <div className="auth-system">
      <div className="auth-container">
        <div className="auth-header">
          <h1>🔐 Authentication System</h1>
          <p>Welcome to our Māori cultural learning platform</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
            aria-label="Login tab"
          >
            🚪 Login
          </button>
          <button
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
            aria-label="Register tab"
          >
            ✨ Register
          </button>
        </div>

        {authState.error && (
          <div className="auth-error">
            <span>⚠️ {authState.error}</span>
          </div>
        )}

        {authState.success && (
          <div className="auth-success">
            <span>✅ {authState.success}</span>
          </div>
        )}

        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <input
                type="email"
                id="login-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-label="Email address for login"
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
                aria-label="Password for login"
              />
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={authState.isLoading}
              aria-label="Login to account"
            >
              {authState.isLoading ? '🔄 Logging in...' : '🚪 Login'}
            </button>
          </form>
        )}

        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label htmlFor="register-name">Full Name</label>
              <input
                type="text"
                id="register-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                aria-label="Full name for registration"
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email Address</label>
              <input
                type="email"
                id="register-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-label="Email address for registration"
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-role">Role</label>
              <select
                id="register-role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                aria-label="User role selection"
              >
                <option value="student">👨‍🎓 Student</option>
                <option value="teacher">👨‍🏫 Teacher</option>
                <option value="admin">👨‍💼 Administrator</option>
                <option value="kaitiaki">🌿 Kaitiaki (Cultural Guardian)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input
                type="password"
                id="register-password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
                aria-label="Password for registration"
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-confirm-password">Confirm Password</label>
              <input
                type="password"
                id="register-confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                aria-label="Confirm password for registration"
              />
            </div>

            <div className="cultural-preferences-section">
              <h3>Cultural Learning Preferences</h3>

              <div className="form-group">
                <label htmlFor="te-reo-level-register">Te Reo Māori Level</label>
                <select
                  id="te-reo-level-register"
                  name="teReoLevel"
                  value={formData.teReoLevel}
                  onChange={handleInputChange}
                  aria-label="Te Reo Māori proficiency level for registration"
                >
                  {teReoLevelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Cultural Focus Areas (Select all that apply)</label>
                <div className="checkbox-grid">
                  {culturalFocusOptions.map((focus) => (
                    <label key={focus} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.culturalFocus.includes(focus)}
                        onChange={() => handleCulturalFocusChange(focus)}
                        aria-label={`Select ${focus} as cultural focus area`}
                      />
                      <span>{focus}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="learning-style-register">Preferred Learning Style</label>
                <select
                  id="learning-style-register"
                  name="learningStyle"
                  value={formData.learningStyle}
                  onChange={handleInputChange}
                  aria-label="Preferred learning style for registration"
                >
                  {learningStyleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={authState.isLoading}
              aria-label="Register new account"
            >
              {authState.isLoading ? '🔄 Creating Account...' : '✨ Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthenticationSystem;
