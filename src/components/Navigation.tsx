import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/resources', label: 'Resources', icon: '📚' },
    { path: '/unit-plan', label: 'Unit Plans', icon: '📋' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/mihara', label: 'Mihara AI', icon: '🧠' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation-container">
      <div className="nav-brand">
        <button 
          type="button"
          onClick={() => navigate('/')}
          className="brand-button"
        >
          🌿 Te Kete Ako
        </button>
      </div>

      {/* Mobile menu button */}
      <button 
        type="button"
        className="mobile-menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      {/* Navigation items */}
      <div className={`nav-items ${isMenuOpen ? 'nav-items-open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.path}
            type="button"
            className={`nav-item ${isCurrentPath(item.path) ? 'nav-item-active' : ''}`}
            onClick={() => handleNavigation(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}