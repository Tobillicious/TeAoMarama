import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';
import '../styles/kaitiaki-dashboard.css';
import '../styles/next-level-design-system.css';
import './Navigation.css';

const Navigation: React.FC = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleLogout = async () => {
    await logout();
  };

  // Main navigation - accessible to all users
  const mainNavigationLinks = [
    { to: '/', label: '🏠 Home', icon: '🏠', description: 'Platform overview and getting started' },
    {
      to: '/quality-lessons',
      label: '🌟 Quality Lessons',
      icon: '🌟',
      description: 'High-quality, fully developed educational content',
    },
    {
      to: '/cultural-learning-modules',
      label: '🌺 Cultural Learning',
      icon: '🌺',
      description: 'Authentic cultural learning experiences',
    },
    {
      to: '/resources',
      label: '📚 Resources',
      icon: '📚',
      description: 'Comprehensive educational resources',
    },
    {
      to: '/human-content',
      label: '📖 Human Content',
      icon: '📖',
      description: 'Human-readable educational content (1,398+ files)',
    },
    {
      to: '/about',
      label: 'ℹ️ About',
      icon: 'ℹ️',
      description: 'Learn about our platform and mission',
    },
  ];

  // Teacher-specific navigation
  const teacherNavigationLinks = [
    {
      to: '/teacher',
      label: '👨‍🏫 Teacher Dashboard',
      icon: '👨‍🏫',
      description: 'Professional teaching tools and resources',
    },
    {
      to: '/lesson-planner',
      label: '📝 Lesson Planner',
      icon: '📝',
      description: 'Plan and organize your lessons',
    },
    {
      to: '/assessment-tools',
      label: '📊 Assessment Tools',
      icon: '📊',
      description: 'Create and manage assessments',
    },
    {
      to: '/cultural-advisor',
      label: '👥 Cultural Advisor',
      icon: '👥',
      description: 'Cultural guidance and support',
    },
  ];

  // Student-specific navigation
  const studentNavigationLinks = [
    {
      to: '/student',
      label: '🎓 Student Dashboard',
      icon: '🎓',
      description: 'Your learning journey and progress',
    },
    {
      to: '/assignments',
      label: '📋 Assignments',
      icon: '📋',
      description: 'View and submit assignments',
    },
    {
      to: '/progress',
      label: '📈 Progress',
      icon: '📈',
      description: 'Track your learning progress',
    },
    {
      to: '/cultural-journey',
      label: '🌺 Cultural Journey',
      icon: '🌺',
      description: 'Explore your cultural learning path',
    },
  ];

  // Handle search functionality
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      // Add to search history
      setSearchHistory((prev) => [searchTerm, ...prev.slice(0, 4)]);

      // Here you would implement actual search logic
      console.log('Searching for:', searchTerm);

      // Simulate search delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setSearchError('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Get current user role
  const userRole = currentUser?.role || 'guest';

  return (
    <nav className="kaitiaki-navigation">
      <div className="nav-container">
        {/* Logo and Brand */}
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">🌺</span>
            <span className="brand-text">Te Ao Marama</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="nav-search">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search resources, lessons, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" disabled={isSearching} className="search-button">
                {isSearching ? '🔍' : '🔍'}
              </button>
            </div>
            {searchError && <div className="search-error">{searchError}</div>}
          </form>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          {/* Main Navigation */}
          <div className="nav-section">
            {mainNavigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                title={link.description}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-label">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Role-specific Navigation */}
          {userRole === 'teacher' && (
            <div className="nav-section teacher-nav">
              {teacherNavigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link teacher-link ${
                    location.pathname === link.to ? 'active' : ''
                  }`}
                  title={link.description}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                </Link>
              ))}
            </div>
          )}

          {userRole === 'student' && (
            <div className="nav-section student-nav">
              {studentNavigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link student-link ${
                    location.pathname === link.to ? 'active' : ''
                  }`}
                  title={link.description}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Authentication */}
          <div className="nav-section auth-nav">
            {isAuthenticated ? (
              <>
                <span className="user-welcome">Welcome, {currentUser?.name || 'User'}!</span>
                <button onClick={handleLogout} className="nav-link logout-link">
                  <span className="nav-icon">🚪</span>
                  <span className="nav-label">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link login-link">
                <span className="nav-icon">🔐</span>
                <span className="nav-label">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
