import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';

const SimpleNavigation: React.FC = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const mainLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/quality-lessons', label: 'Quality Lessons', icon: '⭐' },
    { to: '/cultural-learning-modules', label: 'Cultural Learning', icon: '🌿' },
    { to: '/educational-platform', label: 'Educational Platform', icon: '📚' },
    { to: '/te-kete-ako-resources', label: 'TeKeteAko Resources', icon: '📖' },
    { to: '/advanced-analytics', label: 'Analytics', icon: '📊' },
  ];

  return (
    <nav style={{ 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #059669 100%)', 
      padding: '0.5rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.5rem'
    }}>
      {/* Logo */}
      <Link 
        to="/" 
        style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '1.2rem', 
          fontWeight: 'bold',
          whiteSpace: 'nowrap'
        }}
      >
        🌟 Te Kura o TeAoMarama
      </Link>

      {/* Navigation Links */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {mainLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.4rem 0.8rem',
              borderRadius: '0.375rem',
              background: location.pathname === link.to ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = location.pathname === link.to ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}

        {/* Auth Section */}
        {isAuthenticated && currentUser ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginLeft: '0.5rem'
          }}>
            <span style={{ 
              color: 'white', 
              fontSize: '0.875rem',
              opacity: 0.9
            }}>
              {currentUser.role === 'teacher' ? '👨‍🏫' : '👨‍🎓'} {currentUser.name || currentUser.email}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '0.4rem 0.8rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '0.4rem 0.8rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              textDecoration: 'none',
              marginLeft: '0.5rem'
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