import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';
import '../styles/next-level-design-system.css';
import './Navigation.css';

const EnhancedNavigation: React.FC = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const getRoleBasedNavigation = () => {
    if (!isAuthenticated || !currentUser) {
      return {
        primaryLinks: [
          { to: '/', label: '🏠 Platform Overview', icon: '🏠' },
          { to: '/login', label: '🔐 Sign In', icon: '🔐' },
        ],
        secondaryLinks: [
          { to: '/about', label: 'About', icon: 'ℹ️' },
          { to: '/contact', label: 'Contact', icon: '📞' },
        ],
      };
    }

    // const roleFeatures = getRoleBasedFeatures(currentUser.role); // Not currently used
    const isTeacher = currentUser.role === 'teacher';
    const isStudent = currentUser.role === 'student';
    const isAdmin = currentUser.role === 'admin';

    if (isTeacher) {
      return {
        primaryLinks: [
          { to: '/teacher-dashboard', label: '📊 Teacher Dashboard', icon: '📊' },
          { to: '/lesson-planner', label: '📝 Lesson Planner', icon: '📝' },
          { to: '/student-progress', label: '📈 Student Progress', icon: '📈' },
          { to: '/assessment-creator', label: '✅ Assessment Creator', icon: '✅' },
        ],
        secondaryLinks: [
          { to: '/cultural-resources', label: '🌿 Cultural Resources', icon: '🌿' },
          { to: '/professional-development', label: '🎓 Professional Development', icon: '🎓' },
          { to: '/analytics', label: '📊 Analytics', icon: '📊' },
          { to: '/content-library', label: '📚 Content Library', icon: '📚' },
          { to: '/collaboration-hub', label: '👥 Collaboration Hub', icon: '👥' },
          { to: '/multimedia-studio', label: '🎬 Multimedia Studio', icon: '🎬' },
        ],
      };
    }

    if (isStudent) {
      return {
        primaryLinks: [
          { to: '/student-dashboard', label: '🎓 Student Dashboard', icon: '🎓' },
          { to: '/my-learning', label: '📚 My Learning', icon: '📚' },
          { to: '/assignments', label: '📝 Assignments', icon: '📝' },
          { to: '/progress-tracker', label: '📈 Progress Tracker', icon: '📈' },
        ],
        secondaryLinks: [
          { to: '/cultural-activities', label: '🌿 Cultural Activities', icon: '🌿' },
          { to: '/games', label: '🎮 Educational Games', icon: '🎮' },
          { to: '/resources', label: '📖 Resources', icon: '📖' },
          { to: '/peer-collaboration', label: '👥 Peer Collaboration', icon: '👥' },
        ],
      };
    }

    if (isAdmin) {
      return {
        primaryLinks: [
          { to: '/admin-dashboard', label: '⚙️ Admin Dashboard', icon: '⚙️' },
          { to: '/user-management', label: '👥 User Management', icon: '👥' },
          { to: '/system-analytics', label: '📊 System Analytics', icon: '📊' },
          { to: '/content-moderation', label: '🛡️ Content Moderation', icon: '🛡️' },
        ],
        secondaryLinks: [
          { to: '/cultural-oversight', label: '🌿 Cultural Oversight', icon: '🌿' },
          { to: '/platform-settings', label: '⚙️ Platform Settings', icon: '⚙️' },
          { to: '/backup-restore', label: '💾 Backup & Restore', icon: '💾' },
          { to: '/audit-logs', label: '📋 Audit Logs', icon: '📋' },
        ],
      };
    }

    return {
      primaryLinks: [
        { to: '/', label: '🏠 Platform Overview', icon: '🏠' },
        { to: '/login', label: '🔐 Sign In', icon: '🔐' },
      ],
      secondaryLinks: [
        { to: '/about', label: 'About', icon: 'ℹ️' },
        { to: '/contact', label: 'Contact', icon: '📞' },
      ],
    };
  };

  const { primaryLinks, secondaryLinks } = getRoleBasedNavigation();

  return (
    <nav className="navigation-container nav-next-level">
      <div className="nav-brand">
        <Link to="/" className="nav-logo nav-brand-next-level">
          🧠 Te Kura o TeAoMarama
        </Link>
        {isAuthenticated && currentUser && (
          <div className="user-info">
            <span className="user-role">{currentUser.role}</span>
            <span className="user-name">{currentUser.name || currentUser.email}</span>
          </div>
        )}
      </div>

      <div className="nav-links">
        {/* Primary Navigation Links */}
        {primaryLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}

        {/* Secondary Navigation Dropdown */}
        {secondaryLinks.length > 0 && (
          <div className="nav-dropdown">
            <span className="nav-dropdown-trigger">🔧 More Tools</span>
            <div className="nav-dropdown-content">
              {secondaryLinks.map((link) => (
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

        {/* Year 8 Content Dropdown (for all users) */}
        <div className="nav-dropdown">
          <span className="nav-dropdown-trigger">📚 Year 8 Content</span>
          <div className="nav-dropdown-content">
            <Link to="/year8-social-studies" className="dropdown-link">
              📖 Social Studies
            </Link>
            <Link to="/year8-reading" className="dropdown-link">
              📚 Reading Strategies
            </Link>
            <Link to="/year8-writing" className="dropdown-link">
              ✍️ Writing Revolution
            </Link>
            <Link to="/year8-vocab" className="dropdown-link">
              📝 Academic Vocabulary
            </Link>
            <Link to="/year8-critical-literacy" className="dropdown-link">
              🔍 Critical Literacy
            </Link>
          </div>
        </div>

        {/* Authentication Links */}
        {isAuthenticated ? (
          <>
            <Link to="/educational-resources" className="nav-link">
              📚 Educational Resources
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
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default EnhancedNavigation;
