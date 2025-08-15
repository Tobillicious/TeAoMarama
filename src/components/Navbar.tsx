import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../services/useAuth";

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
    ? "block px-4 py-3 text-base font-medium transition-all duration-200 border-l-4 border-transparent hover:border-accent hover:bg-brand-surface/50"
    : "nav-link";
  
  const activeClasses = mobile
    ? "border-accent text-accent bg-brand-surface/30"
    : "nav-link-active";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
};

const MenuIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <div className="w-6 h-6 flex flex-col justify-center items-center">
    <span
      className={`block h-0.5 w-6 bg-brand-text transition-all duration-300 ease-out ${
        open ? "rotate-45 translate-y-1" : "-translate-y-0.5"
      }`}
    />
    <span
      className={`block h-0.5 w-6 bg-brand-text transition-all duration-300 ease-out ${
        open ? "opacity-0" : "opacity-100"
      }`}
    />
    <span
      className={`block h-0.5 w-6 bg-brand-text transition-all duration-300 ease-out ${
        open ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
      }`}
    />
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
      console.error("Failed to log out", error);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  const location = useLocation();
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="w-full bg-brand-surface/80 backdrop-blur-md border-b border-brand-muted/20 sticky top-0 z-30 shadow-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-xl font-bold text-brand-text hover:text-accent transition-colors duration-200"
                style={{ letterSpacing: "0.06em" }}
              >
                Te Ao Mārama
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-6">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/styleguide">Style Guide</NavLink>
                <NavLink to="/resources">Resources</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </div>

              {/* Desktop auth section */}
              <div className="flex items-center space-x-4 pl-6 border-l border-brand-muted/20">
                {currentUser ? (
                  <>
                    <span className="text-xs text-brand-muted hidden lg:inline-block max-w-32 truncate">
                      {currentUser.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="btn-ghost"
                      aria-label="Sign out"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <div className="flex space-x-2">
                    <Link to="/login" className="btn-ghost">
                      Sign in
                    </Link>
                    <Link to="/signup" className="btn-primary">
                      Get started
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-brand-text hover:bg-brand-surface transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-brand-surface"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <MenuIcon open={mobileMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-backdrop md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div
        className={`mobile-menu md:hidden ${mobileMenuOpen ? "open" : "closed"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-brand-muted/20">
            <span className="text-lg font-bold text-brand-text" style={{ letterSpacing: "0.06em" }}>
              Te Ao Mārama
            </span>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-md text-brand-text hover:bg-brand-bg/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close menu"
            >
              <MenuIcon open={mobileMenuOpen} />
            </button>
          </div>

          {/* Mobile navigation links */}
          <div className="flex-1 py-4">
            <div className="space-y-1">
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
          </div>

          {/* Mobile auth section */}
          <div className="px-4 py-4 border-t border-brand-muted/20">
            {currentUser ? (
              <div className="space-y-3">
                <div className="text-sm text-brand-muted truncate">
                  {currentUser.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full btn-ghost text-left"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block w-full btn-ghost text-center"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="block w-full btn-primary text-center"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
