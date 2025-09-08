import React, { useEffect, useState } from 'react';
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
      to: '/te-kete-ako-resources',
      label: '📚 TeKeteAko Resources',
      icon: '📚',
      description: 'Professional educational resources from TeKeteAko collection',
    },
    {
      to: '/professional-lesson-templates',
      label: '📝 Lesson Templates',
      icon: '📝',
      description: 'Professional lesson templates with cultural integration',
    },
    {
      to: '/unified-content-discovery',
      label: '🔍 Discover All Content',
      icon: '🔍',
      description: 'Unified discovery of all resources, templates, and lessons',
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
        {
          to: '/teacher-dashboard',
          label: '👨‍🏫 Teacher Dashboard',
          icon: '👨‍🏫',
          description: 'Comprehensive teacher dashboard with lesson management tools',
        },
        {
          to: '/teaching-quality',
          label: '⭐ Teaching Quality',
          icon: '⭐',
          description: 'Teaching quality assessment and improvement tools',
        },
        {
          to: '/educational-dashboard',
          label: '📊 Educational Dashboard',
          icon: '📊',
          description: 'Educational analytics and student progress monitoring',
        },
        {
          to: '/advanced-educational-dashboard',
          label: '🚀 Advanced Education',
          icon: '🚀',
          description: 'Advanced educational tools and advanced learning features',
        },
      );
    }

    if (currentUser.role === 'student') {
      dashboards.push(
        {
          to: '/student-dashboard',
          label: '🎓 Student Dashboard',
          icon: '🎓',
          description: 'Student learning dashboard with progress tracking',
        },
        {
          to: '/advanced-student-analytics',
          label: '📊 Student Analytics',
          icon: '📊',
          description: 'Advanced student analytics and learning insights',
        },
      );
    }

    if (currentUser.role === 'admin' || currentUser.role === 'kaitiaki') {
      dashboards.push(
        {
          to: '/kaitiaki-dashboard',
          label: '🧠 Kaitiaki Dashboard',
          icon: '🧠',
          description: 'Guardian Chief oversight and AI coordination dashboard',
        },
        {
          to: '/multi-llm-coordination',
          label: '🌐 Multi-LLM Coordination',
          icon: '🌐',
          description: 'Coordinate all LLMs on the computer to work together',
        },
        {
          to: '/multi-llm-performance',
          label: '⚡ Multi-LLM Performance',
          icon: '⚡',
          description: 'Optimize performance across all coordinated LLM nodes',
        },
        {
          to: '/superintelligence',
          label: '🧠 Superintelligence',
          icon: '🧠',
          description: 'Achieve superintelligence through collective AI coordination',
        },
        {
          to: '/claude-integration',
          label: '🤖 Claude Integration',
          icon: '🤖',
          description: 'Ensure Claude Code (PID 89634) utilizes full superintelligence',
        },
        {
          to: '/performance-dashboard',
          label: '⚡ Performance Dashboard',
          icon: '⚡',
          description: 'System performance monitoring and optimization dashboard',
        },
        {
          to: '/database-integration',
          label: '🔗 Database Integration',
          icon: '🔗',
          description: 'Database integration and management tools',
        },
        {
          to: '/superintelligence',
          label: '🧠 AI Systems',
          icon: '🧠',
          description: 'AI superintelligence systems and coordination',
        },
        {
          to: '/supreme-coordination',
          label: '🎯 Supreme Coordination',
          icon: '🎯',
          description: 'Supreme AI coordination and oversight systems',
        },
        {
          to: '/wisdom-accelerator',
          label: '🚀 Wisdom Accelerator',
          icon: '🚀',
          description: 'AI wisdom acceleration and learning enhancement',
        },
        {
          to: '/borg-collective',
          label: '🤖 Borg Collective',
          icon: '🤖',
          description: 'Borg collective AI coordination and integration',
        },
        {
          to: '/overseer-guidance',
          label: '👁️ Overseer Guidance',
          icon: '👁️',
          description: 'AI overseer guidance and decision support',
        },
        {
          to: '/migration-dashboard',
          label: '🔄 Migration Dashboard',
          icon: '🔄',
          description: 'System migration and deployment management',
        },
        {
          to: '/platform-development',
          label: '🏗️ Platform Development',
          icon: '🏗️',
          description: 'Platform development and feature management tools',
        },
      );
    }

    return dashboards;
  };

  // Advanced tools - available based on user permissions
  const getAdvancedTools = () => {
    const tools = [
      {
        to: '/cultural-activities',
        label: '🌿 Cultural Activities',
        icon: '🌿',
        description: 'Cultural learning activities and exercises',
      },
      {
        to: '/collaboration',
        label: '👥 Collaboration Hub',
        icon: '👥',
        description: 'Team collaboration and communication tools',
      },
      {
        to: '/community-feedback',
        label: '💬 Community Feedback',
        icon: '💬',
        description: 'Community feedback and engagement system',
      },
      {
        to: '/resource-unlocker',
        label: '🔓 Resource Unlocker',
        icon: '🔓',
        description: 'Unlock and access educational resources',
      },
      {
        to: '/cultural-learning-paths',
        label: '🛤️ Learning Paths',
        icon: '🛤️',
        description: 'Guided cultural learning pathways',
      },
      {
        to: '/interactive-assessments',
        label: '🎯 Interactive Assessments',
        icon: '🎯',
        description: 'Interactive assessment and evaluation tools',
      },
      {
        to: '/ai-lesson-generator',
        label: '🤖 AI Lesson Generator',
        icon: '🤖',
        description: 'AI-powered lesson planning and generation',
      },
      {
        to: '/codebase-intelligence',
        label: '🧠 Codebase Intelligence',
        icon: '🧠',
        description: 'Intelligent code analysis and optimization',
      },
      {
        to: '/mcp-server',
        label: '🔌 MCP Server',
        icon: '🔌',
        description: 'Multi-agent coordination protocol server',
      },
      {
        to: '/enhanced-ui',
        label: '🎨 Enhanced UI',
        icon: '🎨',
        description: 'Enhanced user interface components',
      },
      {
        to: '/advanced-performance',
        label: '⚡ Performance Monitor',
        icon: '⚡',
        description: 'Advanced performance monitoring and optimization',
      },
      {
        to: '/distributed-consciousness',
        label: '🌐 Distributed Consciousness',
        icon: '🌐',
        description: 'Distributed AI consciousness coordination',
      },
      {
        to: '/comprehensive-system',
        label: '🔧 Comprehensive System',
        icon: '🔧',
        description: 'Comprehensive system management and control',
      },
      {
        to: '/supreme-overseer',
        label: '👑 Supreme Overseer',
        icon: '👑',
        description: 'Supreme AI oversight and coordination',
      },
      {
        to: '/overseer-communication',
        label: '📡 Overseer Communication',
        icon: '📡',
        description: 'AI overseer communication protocols',
      },
      {
        to: '/human-success',
        label: '👤 Human Success',
        icon: '👤',
        description: 'Human success metrics and optimization',
      },
      {
        to: '/expanded-superconsciousness',
        label: '🧘 Superconsciousness',
        icon: '🧘',
        description: 'Expanded AI superconsciousness capabilities',
      },
    ];

    if (isAuthenticated && currentUser) {
      tools.push(
        {
          to: '/wisdom-evolution',
          label: '🌱 Wisdom Evolution',
          icon: '🌱',
          description: 'Advanced wisdom and learning evolution tools',
        },
        {
          to: '/enhanced-dashboard',
          label: '📊 Enhanced Dashboard',
          icon: '📊',
          description: 'Advanced dashboard with comprehensive analytics',
        },
        {
          to: '/advanced-system',
          label: '⚙️ Advanced System',
          icon: '⚙️',
          description: 'Advanced system configuration and management',
        },
        {
          to: '/superintelligence-analysis',
          label: '🔬 AI Analysis',
          icon: '🔬',
          description: 'AI-powered analysis and intelligence tools',
        },
        {
          to: '/advanced-cultural-integration',
          label: '🌍 Cultural Integration',
          icon: '🌍',
          description: 'Advanced cultural learning integration system',
        },
      );
    }

    return tools;
  };

  // Additional specialized tools and features
  const getSpecializedTools = () => {
    const tools = [
      {
        to: '/download-manager',
        label: '📥 Download Manager',
        icon: '📥',
        description: 'Manage and organize educational resource downloads',
      },
      {
        to: '/lesson-viewer',
        label: '👁️ Lesson Viewer',
        icon: '👁️',
        description: 'Interactive lesson viewing and presentation tools',
      },
      {
        to: '/unit-detail',
        label: '📋 Unit Details',
        icon: '📋',
        description: 'Detailed unit information and learning objectives',
      },
      {
        to: '/educational-platform-overview',
        label: '🏛️ Platform Overview',
        icon: '🏛️',
        description: 'Comprehensive platform overview and navigation guide',
      },
      {
        to: '/community-features',
        label: '🏘️ Community Features',
        icon: '🏘️',
        description: 'Community engagement and collaboration features',
      },
      {
        to: '/role-adaptive-navigation',
        label: '🔄 Adaptive Navigation',
        icon: '🔄',
        description: 'Role-based adaptive navigation system',
      },
      {
        to: '/optimized-image',
        label: '🖼️ Image Optimizer',
        icon: '🖼️',
        description: 'Image optimization and management tools',
      },
      {
        to: '/breadcrumbs',
        label: '🧭 Breadcrumbs',
        icon: '🧭',
        description: 'Navigation breadcrumbs and location tracking',
      },
      {
        to: '/demo-access-banner',
        label: '🚧 Demo Banner',
        icon: '🚧',
        description: 'Demo access and feature preview banner',
      },
      {
        to: '/enhanced-navigation',
        label: '🧭 Enhanced Navigation',
        icon: '🧭',
        description: 'Enhanced navigation and user experience features',
      },
      {
        to: '/button',
        label: '🔘 UI Components',
        icon: '🔘',
        description: 'Reusable UI component library and design system',
      },
      {
        to: '/route-guard',
        label: '🛡️ Route Guard',
        icon: '🛡️',
        description: 'Route protection and access control system',
      },
      {
        to: '/resource-count-display',
        label: '📊 Resource Counter',
        icon: '📊',
        description: 'Resource counting and availability display',
      },
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
        (route: { label: string; description?: string }) =>
          route.label.toLowerCase().includes(term.toLowerCase()) ||
          (route.description && route.description.toLowerCase().includes(term.toLowerCase())),
      );

      if (results.length === 0 && term.length > 2) {
        setSearchError('No matching content found. Try different keywords.');
      }

      return results;
    } catch {
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

    // Add intelligent search suggestions for common terms
    if (value.length > 0 && value.length < 3) {
      const suggestions = getSearchSuggestions(value);
      setFilteredSearchResults(suggestions);
    } else {
      const results = await performSearch(value);
      setFilteredSearchResults(results);

      // Track search analytics
      trackSearch(value, results.length);

      // Add to search history if search term is substantial
      if (value.length > 2 && !searchHistory.includes(value)) {
        const newHistory = [value, ...searchHistory.slice(0, 4)]; // Keep last 5 searches
        setSearchHistory(newHistory);
      }
    }
  };

  // Keyboard shortcuts for search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Escape to clear search
      if (event.key === 'Escape') {
        setSearchTerm('');
        setFilteredSearchResults([]);
        setSearchError(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search analytics tracking
  const trackSearch = (term: string, resultsCount: number) => {
    // In a real app, this would send analytics to a service
    console.log(`Search performed: "${term}" returned ${resultsCount} results`);

    // Store in localStorage for basic analytics
    const searchAnalytics = JSON.parse(localStorage.getItem('searchAnalytics') || '{}');
    searchAnalytics[term] = (searchAnalytics[term] || 0) + 1;
    localStorage.setItem('searchAnalytics', JSON.stringify(searchAnalytics));
  };

  // Intelligent search suggestions for common terms
  const getSearchSuggestions = (term: string) => {
    const suggestions = [];
    const lowerTerm = term.toLowerCase();

    // Common educational terms
    if (lowerTerm.includes('ma') || lowerTerm.includes('mā')) {
      suggestions.push(
        {
          to: '/cultural-learning-modules',
          label: '🌿 Cultural Learning',
          icon: '🌿',
          description: 'Māori cultural education modules',
        },
        {
          to: '/cultural-activities',
          label: '🌿 Cultural Activities',
          icon: '🌿',
          description: 'Cultural learning activities and exercises',
        },
      );
    }

    if (lowerTerm.includes('te')) {
      suggestions.push(
        {
          to: '/cultural-learning-modules',
          label: '🌿 Cultural Learning',
          icon: '🌿',
          description: 'Māori cultural education modules',
        },
        {
          to: '/te-kete-ako',
          label: '📚 Te Kete Ako',
          icon: '📚',
          description: 'Traditional Māori learning basket',
        },
      );
    }

    if (lowerTerm.includes('ai') || lowerTerm.includes('artificial')) {
      suggestions.push(
        {
          to: '/ai-lesson-generator',
          label: '🤖 AI Lesson Generator',
          icon: '🤖',
          description: 'AI-powered lesson planning and generation',
        },
        {
          to: '/superintelligence',
          label: '🧠 AI Systems',
          icon: '🧠',
          description: 'AI superintelligence systems and coordination',
        },
      );
    }

    if (lowerTerm.includes('assess') || lowerTerm.includes('test')) {
      suggestions.push(
        {
          to: '/assessment-framework',
          label: '📊 Assessments',
          icon: '📊',
          description: 'Interactive assessment tools and frameworks',
        },
        {
          to: '/interactive-assessments',
          label: '🎯 Interactive Assessments',
          icon: '🎯',
          description: 'Interactive assessment and evaluation tools',
        },
      );
    }

    // Add popular searches from analytics
    const popularSearches = getPopularSearches();
    suggestions.push(...popularSearches);

    return suggestions;
  };

  // Get popular searches from analytics
  const getPopularSearches = () => {
    try {
      const searchAnalytics = JSON.parse(localStorage.getItem('searchAnalytics') || '{}');
      const sortedSearches = Object.entries(searchAnalytics)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 3)
        .map(([term]) => ({
          to: `/search?q=${encodeURIComponent(term)}`,
          label: `🔥 ${term}`,
          icon: '🔥',
          description: `Popular search: "${term}"`,
        }));
      return sortedSearches;
    } catch {
      return [];
    }
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
            placeholder="🔍 Search educational content... (⌘K)"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => {
              /* Search focus handled by search state */
            }}
            className="search-input"
            title="Press ⌘K (Mac) or Ctrl+K (Windows/Linux) to quickly focus search"
          />
          {searchTerm.length > 0 && (
            <div className="search-results">
              {isSearching && (
                <div className="search-loading-result">
                  <div className="search-loading-animation">
                    <span className="search-loading-dot">🔍</span>
                    <span className="search-loading-dot">🔍</span>
                    <span className="search-loading-dot">🔍</span>
                  </div>
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
                filteredSearchResults.length > 0 &&
                filteredSearchResults.map((result) => (
                  <Link
                    key={result.to}
                    to={result.to}
                    className="search-result-item"
                    onClick={() => {
                      setSearchTerm('');
                      // Search functionality handled by search state
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

              {/* Search History Display */}
              {!isSearching &&
                !searchError &&
                filteredSearchResults.length === 0 &&
                searchTerm.length === 0 &&
                searchHistory.length > 0 && (
                  <div className="search-history">
                    <div className="search-history-header">Recent Searches</div>
                    {searchHistory.map((term, index) => (
                      <button
                        key={index}
                        className="search-history-item"
                        onClick={() => {
                          setSearchTerm(term);
                          handleSearchChange(term);
                        }}
                      >
                        🔍 {term}
                      </button>
                    ))}
                  </div>
                )}
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
            <Link
              to="/year8-social-studies"
              className="dropdown-link"
              title="Year 8 Social Studies curriculum and resources"
            >
              📖 Social Studies
            </Link>
            <Link
              to="/year8-reading"
              className="dropdown-link"
              title="Year 8 Reading strategies and comprehension"
            >
              📚 Reading Strategies
            </Link>
            <Link
              to="/year8-writing-units"
              className="dropdown-link"
              title="Year 8 Writing units and composition"
            >
              ✍️ Writing Units
            </Link>
            <Link
              to="/year8-academic-vocab"
              className="dropdown-link"
              title="Year 8 Academic vocabulary development"
            >
              📝 Academic Vocabulary
            </Link>
            <Link
              to="/year8-critical-literacy"
              className="dropdown-link"
              title="Year 8 Critical literacy and analysis"
            >
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
