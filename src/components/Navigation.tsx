import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/resources', label: 'Resources', icon: '📚' },
    { path: '/year8-critical-literacy', label: 'Year 8 Literacy', icon: '��' },
    { path: '/year8-reading-units', label: 'Reading Units', icon: '📖' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
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
        <button type="button" onClick={() => navigate('/')} className="brand-button">
          🌿 TeAoMarama
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
