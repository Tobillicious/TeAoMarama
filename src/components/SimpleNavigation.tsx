import React from 'react';
import type { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const SimpleNavigation: React.FC = () => {
  // Temporarily disable auth to show real content
  const isAuthenticated = false;
  const currentUser = null;
  const location = useLocation();

  const mainLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    {
      to: '/working-resources',
      label: '✅ WORKING RESOURCES',
      icon: '📚',
      highlight: true,
      highlightColor: '#10b981',
    },
    { to: '/teacher', label: 'TEACHER DASHBOARD', icon: '👨‍🏫', highlight: true },
    {
      to: '/student',
      label: 'STUDENT DASHBOARD',
      icon: '👨‍🎓',
      highlight: true,
      highlightColor: '#059669',
    },
    { to: '/cultural-learning-modules', label: 'Cultural Learning', icon: '🌿' },
    { to: '/advanced-analytics', label: 'Analytics', icon: '📊' },
    {
      to: '/teacher-demo',
      label: '🎓 Teacher Demo',
      icon: '🎓',
      highlight: true,
      highlightColor: '#059669',
    },
  ];

  return (
    <nav
      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #059669 100%)',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
        }}
      >
        🌟 Te Kura o TeAoMarama
      </Link>

      {/* Navigation Links */}
      <div
        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {mainLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.4rem 0.8rem',
              borderRadius: '0.375rem',
              background: link.highlight
                ? link.highlightColor || '#dc2626'
                : location.pathname === link.to
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(255, 255, 255, 0.1)',
              border: link.highlight
                ? `2px solid ${
                    link.highlightColor === '#059669'
                      ? '#10b981'
                      : link.highlightColor === '#7c3aed'
                      ? '#8b5cf6'
                      : link.highlightColor === '#f59e0b'
                      ? '#fbbf24'
                      : '#fbbf24'
                  }`
                : '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: link.highlight ? '0.75rem' : '0.875rem',
              fontWeight: link.highlight ? 'bold' : 'normal',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'all 0.2s',
              boxShadow: link.highlight
                ? `0 4px 8px ${
                    link.highlightColor === '#059669'
                      ? 'rgba(5, 150, 105, 0.3)'
                      : link.highlightColor === '#7c3aed'
                      ? 'rgba(124, 58, 237, 0.3)'
                      : link.highlightColor === '#f59e0b'
                      ? 'rgba(245, 158, 11, 0.3)'
                      : 'rgba(220, 38, 38, 0.3)'
                  }`
                : 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                location.pathname === link.to
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}

        {/* Auth Section */}
        {isAuthenticated && currentUser ? (
          <div
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginLeft: '0.5rem',
            }}
          >
            <span
              /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                color: 'white',
                fontSize: '0.875rem',
                opacity: 0.9,
              }}
            >
              {currentUser.role === 'teacher' ? '👨‍🏫' : '👨‍🎓'} {currentUser.name || currentUser.email}
            </span>
            <button
              onClick={handleLogout}
              /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '0.4rem 0.8rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '0.4rem 0.8rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              textDecoration: 'none',
              marginLeft: '0.5rem',
            }}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default SimpleNavigation;
