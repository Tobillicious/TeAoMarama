import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/useAuth';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, mobile = false, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses = mobile
    ? 'mobile-nav-link'
    : 'nav-link';

  const activeClasses = mobile
    ? 'mobile-nav-link-active'
    : 'active';

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
};

const MenuIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <div className="menu-icon">
    <span className={`menu-icon-line ${open ? 'rotate-45' : ''}`} />
    <span className={`menu-icon-line ${open ? 'opacity-0' : ''}`} />
    <span className={`menu-icon-line ${open ? '-rotate-45' : ''}`} />
  </div>
);

export const Navbar: React.FC = () => {
  const { currentUser, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const location = useLocation();
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="nav-enhanced">
        <div className="nav-container">
          {/* Logo and brand */}
          <Link to="/" className="nav-brand">
            Te Ao Mārama
          </Link>

          {/* Desktop navigation */}
          <div className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/styleguide">Style Guide</NavLink>
            <NavLink to="/resources">Resources</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>

            {/* Desktop auth section */}
            {currentUser ? (
              <>
                <span className="user-email">{currentUser.email}</span>
                <button onClick={handleLogout} className="form-button logout-nav-button">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Sign in
                </Link>
                <Link to="/signup" className="form-button signup-nav-button">
                  Get started
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-button"
              aria-label="Toggle navigation menu"
            >
              <MenuIcon open={mobileMenuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
        <div className="mobile-menu-content">
          {/* Mobile menu header */}
          <div className="mobile-menu-header">
            <span className="mobile-menu-title">Te Ao Mārama</span>
            <button
              onClick={closeMobileMenu}
              className="mobile-menu-close"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Mobile navigation links */}
          <div className="mobile-menu-nav">
            <NavLink to="/" mobile onClick={closeMobileMenu}>
              Home
            </NavLink>
            <NavLink to="/styleguide" mobile onClick={closeMobileMenu}>
              Style Guide
            </NavLink>
            <NavLink to="/resources" mobile onClick={closeMobileMenu}>
              Resources
            </NavLink>
            <NavLink to="/dashboard" mobile onClick={closeMobileMenu}>
              Dashboard
            </NavLink>
          </div>

          {/* Mobile auth section */}
          <div className="mobile-menu-auth">
            {currentUser ? (
              <>
                <div className="mobile-user-email">{currentUser.email}</div>
                <button onClick={handleLogout} className="form-button mobile-logout-button">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="form-button mobile-auth-button"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="form-button mobile-auth-button"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;