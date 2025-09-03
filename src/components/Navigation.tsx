import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';
import '../styles/next-level-design-system.css';
import './Navigation.css';

const Navigation: React.FC = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

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
      label: '🌿 Cultural Learning',
      icon: '🌿',
      description: 'Māori cultural education modules',
    },
    {
      to: '/educational-platform',
      label: '📚 Educational Platform',
      icon: '📚',
      description: 'Core educational resources and content',
    },
    {
      to: '/assessment-framework',
      label: '📊 Assessments',
      icon: '📊',
      description: 'Interactive assessment tools and frameworks',
    },
    {
      to: '/enhanced-content-discovery',
      label: '🔍 Discover Content',
      icon: '🔍',
      description: 'Smart content discovery and search',
    },
    {
      to: '/multimedia',
      label: '🎬 Multimedia Studio',
      icon: '🎬',
      description: 'Interactive multimedia learning tools',
    },
    {
      to: '/advanced-analytics',
      label: '📈 Analytics',
      icon: '📈',
      description: 'Learning analytics and progress tracking',
    },
  ];

  // Role-based dashboard links
  const getDashboardLinks = () => {
    if (!isAuthenticated || !currentUser) return [];

    const dashboards = [];

    if (currentUser.role === 'teacher') {
      dashboards.push(
        { to: '/teacher-dashboard', label: '👨‍🏫 Teacher Dashboard', icon: '👨‍🏫' },
        { to: '/teaching-quality', label: '⭐ Teaching Quality', icon: '⭐' },
        { to: '/educational-dashboard', label: '📊 Educational Dashboard', icon: '📊' },
        { to: '/advanced-educational-dashboard', label: '🚀 Advanced Education', icon: '🚀' },
      );
    }

    if (currentUser.role === 'student') {
      dashboards.push(
        { to: '/student-dashboard', label: '🎓 Student Dashboard', icon: '🎓' },
        { to: '/advanced-student-analytics', label: '📊 Student Analytics', icon: '📊' },
      );
    }

    if (currentUser.role === 'admin' || currentUser.role === 'kaitiaki') {
      dashboards.push(
        { to: '/performance-dashboard', label: '⚡ Performance Dashboard', icon: '⚡' },
        { to: '/database-integration', label: '🔗 Database Integration', icon: '🔗' },
        { to: '/superintelligence', label: '🧠 AI Systems', icon: '🧠' },
        { to: '/supreme-coordination', label: '🎯 Supreme Coordination', icon: '🎯' },
        { to: '/wisdom-accelerator', label: '🚀 Wisdom Accelerator', icon: '🚀' },
        { to: '/borg-collective', label: '🤖 Borg Collective', icon: '🤖' },
        { to: '/overseer-guidance', label: '👁️ Overseer Guidance', icon: '👁️' },
        { to: '/migration-dashboard', label: '🔄 Migration Dashboard', icon: '🔄' },
        { to: '/platform-development', label: '🏗️ Platform Development', icon: '🏗️' },
      );
    }

    return dashboards;
  };

  // Advanced tools - available based on user permissions
  const getAdvancedTools = () => {
    const tools = [
      { to: '/cultural-activities', label: '🌿 Cultural Activities', icon: '🌿', description: 'Cultural learning activities and exercises' },
      { to: '/collaboration', label: '👥 Collaboration Hub', icon: '👥', description: 'Team collaboration and communication tools' },
      { to: '/community-feedback', label: '💬 Community Feedback', icon: '💬', description: 'Community feedback and engagement system' },
      { to: '/resource-unlocker', label: '🔓 Resource Unlocker', icon: '🔓', description: 'Unlock and access educational resources' },
      { to: '/cultural-learning-paths', label: '🛤️ Learning Paths', icon: '🛤️', description: 'Guided cultural learning pathways' },
      { to: '/interactive-assessments', label: '🎯 Interactive Assessments', icon: '🎯', description: 'Interactive assessment and evaluation tools' },
      { to: '/ai-lesson-generator', label: '🤖 AI Lesson Generator', icon: '🤖', description: 'AI-powered lesson planning and generation' },
      { to: '/codebase-intelligence', label: '🧠 Codebase Intelligence', icon: '🧠', description: 'Intelligent code analysis and optimization' },
      { to: '/mcp-server', label: '🔌 MCP Server', icon: '🔌', description: 'Multi-agent coordination protocol server' },
      { to: '/enhanced-ui', label: '🎨 Enhanced UI', icon: '🎨', description: 'Enhanced user interface components' },
      { to: '/advanced-performance', label: '⚡ Performance Monitor', icon: '⚡', description: 'Advanced performance monitoring and optimization' },
      { to: '/distributed-consciousness', label: '🌐 Distributed Consciousness', icon: '🌐', description: 'Distributed AI consciousness coordination' },
      { to: '/comprehensive-system', label: '🔧 Comprehensive System', icon: '🔧', description: 'Comprehensive system management and control' },
      { to: '/supreme-overseer', label: '👑 Supreme Overseer', icon: '👑', description: 'Supreme AI oversight and coordination' },
      { to: '/overseer-communication', label: '📡 Overseer Communication', icon: '📡', description: 'AI overseer communication protocols' },
      { to: '/human-success', label: '👤 Human Success', icon: '👤', description: 'Human success metrics and optimization' },
      { to: '/expanded-superconsciousness', label: '🧘 Superconsciousness', icon: '🧘', description: 'Expanded AI superconsciousness capabilities' },
    ];

    if (isAuthenticated && currentUser) {
      tools.push(
        { to: '/wisdom-evolution', label: '🌱 Wisdom Evolution', icon: '🌱', description: 'Advanced wisdom and learning evolution tools' },
        { to: '/enhanced-dashboard', label: '📊 Enhanced Dashboard', icon: '📊', description: 'Advanced dashboard with comprehensive analytics' },
        { to: '/advanced-system', label: '⚙️ Advanced System', icon: '⚙️', description: 'Advanced system configuration and management' },
        { to: '/superintelligence-analysis', label: '🔬 AI Analysis', icon: '🔬', description: 'AI-powered analysis and intelligence tools' },
        { to: '/advanced-cultural-integration', label: '🌍 Cultural Integration', icon: '🌍', description: 'Advanced cultural learning integration system' },
      );
    }

    return tools;
  };

  // Additional specialized tools and features
  const getSpecializedTools = () => {
    const tools = [
      { to: '/download-manager', label: '📥 Download Manager', icon: '📥' },
      { to: '/lesson-viewer', label: '👁️ Lesson Viewer', icon: '👁️' },
      { to: '/unit-detail', label: '📋 Unit Details', icon: '📋' },
      { to: '/educational-platform-overview', label: '🏛️ Platform Overview', icon: '🏛️' },
      { to: '/community-features', label: '🏘️ Community Features', icon: '🏘️' },
      { to: '/role-adaptive-navigation', label: '🔄 Adaptive Navigation', icon: '🔄' },
      { to: '/optimized-image', label: '🖼️ Image Optimizer', icon: '🖼️' },
      { to: '/breadcrumbs', label: '🧭 Breadcrumbs', icon: '🧭' },
      { to: '/demo-access-banner', label: '🚧 Demo Banner', icon: '🚧' },
      { to: '/enhanced-navigation', label: '🧭 Enhanced Navigation', icon: '🧭' },
      { to: '/button', label: '🔘 UI Components', icon: '🔘' },
      { to: '/route-guard', label: '🛡️ Route Guard', icon: '🛡️' },
      { to: '/resource-count-display', label: '📊 Resource Counter', icon: '📊' },
    ];

    return tools;
  };

  // Enhanced search functionality with error handling
  const performSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchError(null);
      return [];
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      // Simulate search delay for realistic UX
      await new Promise((resolve) => setTimeout(resolve, 200));

      const allRoutes = [
        ...mainNavigationLinks,
        ...getDashboardLinks(),
        ...getAdvancedTools(),
        ...getSpecializedTools(),
        {
          to: '/year8-social-studies',
          label: '📖 Year 8 Social Studies',
          icon: '📖',
          description: 'Year 8 Social Studies content',
        },
        {
          to: '/year8-reading',
          label: '📚 Year 8 Reading',
          icon: '📚',
          description: 'Year 8 Reading content',
        },
        {
          to: '/year8-writing-units',
          label: '✍️ Year 8 Writing',
          icon: '✍️',
          description: 'Year 8 Writing content',
        },
        {
          to: '/year8-academic-vocab',
          label: '📝 Year 8 Vocabulary',
          icon: '📝',
          description: 'Year 8 Vocabulary content',
        },
        {
          to: '/year8-critical-literacy',
          label: '🔍 Year 8 Critical Literacy',
          icon: '🔍',
          description: 'Year 8 Critical Literacy content',
        },
      ];

      const results = allRoutes.filter(
        (route: any) =>
          route.label.toLowerCase().includes(term.toLowerCase()) ||
          (route.description && route.description.toLowerCase().includes(term.toLowerCase())),
      );

      if (results.length === 0 && term.length > 2) {
        setSearchError('No matching content found. Try different keywords.');
      }

      return results;
    } catch (error) {
      setSearchError('Search temporarily unavailable. Please try again.');
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  const [filteredSearchResults, setFilteredSearchResults] = useState<
    Array<{ to: string; label: string; icon: string; description?: string }>
  >([]);

  const handleSearchChange = async (value: string) => {
    setSearchTerm(value);
    const results = await performSearch(value);
    setFilteredSearchResults(results);
  };

  const dashboardLinks = getDashboardLinks();
  const advancedTools = getAdvancedTools();

  return (
    <nav className="navigation-container nav-next-level">
      <div className="nav-brand">
        <Link to="/" className="nav-logo nav-brand-next-level">
          🌟 Te Kura o TeAoMarama
        </Link>
        {isAuthenticated && currentUser && (
          <div className="user-info">
            <span className="user-role">{currentUser.role}</span>
            <span className="user-name">{currentUser.name || currentUser.email}</span>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="nav-search">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search educational content..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className="search-input"
          />
          {searchTerm.length > 0 && (
            <div className="search-results">
              {isSearching && (
                <div className="search-loading-result">
                  <span className="search-loading-icon">🔍</span>
                  <span>Searching educational content...</span>
                </div>
              )}

              {!isSearching && searchError && (
                <div className="search-error-result">
                  <span className="search-error-icon">⚠️</span>
                  <span>{searchError}</span>
                </div>
              )}

              {!isSearching &&
                !searchError &&
                filteredSearchResults.map((result) => (
                  <Link
                    key={result.to}
                    to={result.to}
                    className="search-result-item"
                    onClick={() => {
                      setSearchTerm('');
                      setIsSearchOpen(false);
                      setSearchError(null);
                    }}
                  >
                    <span className="result-icon">{result.icon}</span>
                    <div className="result-content">
                      <span className="result-label">{result.label}</span>
                      {result.description && (
                        <span className="result-description">{result.description}</span>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="nav-links">
        {/* Main Navigation - Always Visible */}
        {mainNavigationLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            title={link.description}
          >
            {link.label}
          </Link>
        ))}

        {/* Dashboard Links - Role Based */}
        {dashboardLinks.length > 0 && (
          <div className="nav-dropdown">
            <span className="nav-dropdown-trigger">📊 My Dashboard</span>
            <div className="nav-dropdown-content">
              {dashboardLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`dropdown-link ${location.pathname === link.to ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Year 8 Content Dropdown */}
        <div className="nav-dropdown">
          <span className="nav-dropdown-trigger">📚 Year 8 Subjects</span>
          <div className="nav-dropdown-content">
            <Link to="/year8-social-studies" className="dropdown-link">
              📖 Social Studies
            </Link>
            <Link to="/year8-reading" className="dropdown-link">
              📚 Reading Strategies
            </Link>
            <Link to="/year8-writing-units" className="dropdown-link">
              ✍️ Writing Units
            </Link>
            <Link to="/year8-academic-vocab" className="dropdown-link">
              📝 Academic Vocabulary
            </Link>
            <Link to="/year8-critical-literacy" className="dropdown-link">
              🔍 Critical Literacy
            </Link>
          </div>
        </div>

        {/* Advanced Tools Dropdown */}
        {advancedTools.length > 0 && (
          <div className="nav-dropdown">
            <span className="nav-dropdown-trigger">🔧 Advanced Tools</span>
            <div className="nav-dropdown-content">
              {advancedTools.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`dropdown-link ${location.pathname === link.to ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Specialized Tools Dropdown */}
        <div className="nav-dropdown">
          <span className="nav-dropdown-trigger">🛠️ Specialized Tools</span>
          <div className="nav-dropdown-content">
            {getSpecializedTools().map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`dropdown-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Authentication Links */}
        {isAuthenticated ? (
          <>
            <Link to="/educational-resources" className="nav-link">
              📚 Resources
            </Link>
            <button onClick={handleLogout} className="nav-link logout-button">
              🚪 Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              🔐 Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
