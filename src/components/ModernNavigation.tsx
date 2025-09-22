import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Router-safe wrapper component
const RouterSafeNavigation: React.FC = () => {
  try {
    return <ModernNavigationInner />;
  } catch (error) {
    console.error('Router context error in navigation:', error);
    // Fallback navigation without router hooks
    return <FallbackNavigation />;
  }
};

// Fallback navigation for when Router context is unavailable
const FallbackNavigation: React.FC = () => {
  return (
    <nav
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-bold">TeKeteAkoClient</span>
          </div>
          <div className="text-sm text-blue-100">
            Navigation loading...
          </div>
        </div>
      </div>
    </nav>
  );
};

const ModernNavigationInner: React.FC = () => {
  let location;
  try {
    location = useLocation();
  } catch (error) {
    console.error('useLocation hook failed:', error);
    // Provide fallback location
    location = { pathname: '/' };
  }

  const mainLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    {
      to: '/resources',
      label: '✅ REAL RESOURCES',
      icon: '📚',
      highlight: true,
      highlightColor: '#10b981',
    },
    { to: '/teacher', label: 'TEACHER', icon: '👨‍🏫' },
    { to: '/join', label: 'JOIN NOW', icon: '🚀', highlight: true, highlightColor: '#f59e0b' },
    {
      to: '/subscription',
      label: 'SUBSCRIPTION',
      icon: '💰',
      highlight: true,
      highlightColor: '#10b981',
    },
    { to: '/student', label: 'STUDENT', icon: '👨‍🎓' },
    { to: '/glm-symphony', label: 'GLM AI', icon: '🎼' },
    {
      to: '/supreme-ai',
      label: 'SUPREME AI',
      icon: '👑',
      highlight: true,
      highlightColor: '#8b5cf6',
    },
    {
      to: '/graphrag',
      label: 'GRAPHRAG',
      icon: '🧠',
      highlight: true,
      highlightColor: '#10b981',
    },
    {
      to: '/llm-army',
      label: 'LLM ARMY',
      icon: '🚀',
      highlight: true,
      highlightColor: '#f59e0b',
    },
    {
      to: '/exa-ai',
      label: 'EXA.AI',
      icon: '🔍',
      highlight: true,
      highlightColor: '#3b82f6',
    },
    {
      to: '/teacher-demo',
      label: 'TEACHER DEMO',
      icon: '🎯',
      highlight: true,
      highlightColor: '#10b981',
    },
    {
      to: '/unified-llm',
      label: 'UNIFIED LLM',
      icon: '🤝',
      highlight: true,
      highlightColor: '#10b981',
    },
    {
      to: '/royal-command',
      label: 'ROYAL COMMAND',
      icon: '👑',
      highlight: true,
      highlightColor: '#9333ea',
    },
    {
      to: '/royal-revenue',
      label: 'ROYAL REVENUE',
      icon: '💰',
      highlight: true,
      highlightColor: '#f59e0b',
    },
    {
      to: '/onboarding',
      label: 'ONBOARDING',
      icon: '🎯',
      highlight: true,
      highlightColor: '#10b981',
    },
    {
      to: '/referrals',
      label: 'REFERRALS',
      icon: '🎁',
      highlight: true,
      highlightColor: '#f59e0b',
    },
    {
      to: '/analytics',
      label: 'ANALYTICS',
      icon: '📊',
      highlight: true,
      highlightColor: '#10b981',
    },
  ];

  return (
    <nav
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-bold">TeKeteAkoClient</span>
          </div>

          <div className="hidden md:flex items-center space-x-1 overflow-x-auto">
            {mainLinks.map((link) => {
              try {
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                      location.pathname === link.to
                        ? 'bg-white/20 text-white'
                        : link.highlight
                        ? 'text-white hover:bg-white/10 border border-white/20'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                    style={{
                      borderColor: link.highlight ? link.highlightColor : 'transparent',
                    }}
                  >
                    <span className="mr-1">{link.icon}</span>
                    {link.label}
                  </Link>
                );
              } catch (error) {
                console.error(`Error rendering link ${link.to}:`, error);
                // Fallback to regular anchor tag
                return (
                  <a
                    key={link.to}
                    href={link.to}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                      link.highlight
                        ? 'text-white hover:bg-white/10 border border-white/20'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                    style={{
                      borderColor: link.highlight ? link.highlightColor : 'transparent',
                    }}
                  >
                    <span className="mr-1">{link.icon}</span>
                    {link.label}
                  </a>
                );
              }
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-blue-200 focus:outline-none focus:text-blue-200"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden mt-4">
          <div className="grid grid-cols-2 gap-2">
            {mainLinks.slice(0, 8).map((link) => {
              try {
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location.pathname === link.to
                        ? 'bg-white/20 text-white'
                        : link.highlight
                        ? 'text-white hover:bg-white/10 border border-white/20'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                    style={{
                      borderColor: link.highlight ? link.highlightColor : 'transparent',
                    }}
                  >
                    <span className="mr-1">{link.icon}</span>
                    {link.label}
                  </Link>
                );
              } catch (error) {
                console.error(`Error rendering mobile link ${link.to}:`, error);
                // Fallback to regular anchor tag
                return (
                  <a
                    key={link.to}
                    href={link.to}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      link.highlight
                        ? 'text-white hover:bg-white/10 border border-white/20'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                    style={{
                      borderColor: link.highlight ? link.highlightColor : 'transparent',
                    }}
                  >
                    <span className="mr-1">{link.icon}</span>
                    {link.label}
                  </a>
                );
              }
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main export with error boundary
const ModernNavigation: React.FC = () => {
  return <RouterSafeNavigation />;
};

export default ModernNavigation;
