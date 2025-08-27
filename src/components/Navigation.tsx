import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/next-level-design-system.css';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation-container nav-next-level">
      <div className="nav-brand">
        <Link to="/" className="nav-logo nav-brand-next-level">
          🧠 Te Kura o TeAoMarama
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          🏠 Platform Overview
        </Link>
        <Link to="/educational-dashboard" className="nav-link">
          📊 Advanced Dashboard
        </Link>
        <Link to="/cultural-activities" className="nav-link">
          🌿 Cultural Activities
        </Link>
        <Link to="/educational-platform" className="nav-link">
          📚 Educational Platform
        </Link>
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
        <div className="nav-dropdown">
          <span className="nav-dropdown-trigger">🔧 Tools</span>
          <div className="nav-dropdown-content">
            <Link to="/analytics" className="dropdown-link">
              📊 Analytics
            </Link>
            <Link to="/collaboration" className="dropdown-link">
              👥 Collaboration
            </Link>
            <Link to="/multimedia" className="dropdown-link">
              🎬 Multimedia Studio
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
