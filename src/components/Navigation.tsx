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
        <Link to="/educational-resources" className="nav-link">
          📚 Educational Resources
        </Link>
        <Link to="/educational-platform" className="nav-link">
          🎓 Educational Platform
        </Link>
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
            <Link to="/wisdom-evolution" className="dropdown-link">
              🌟 Wisdom Evolution
            </Link>
            <Link to="/student-dashboard" className="dropdown-link">
              🎓 Student Dashboard
            </Link>
            <Link to="/teaching-quality" className="dropdown-link">
              📚 Teaching Quality
            </Link>
            <Link to="/database-integration" className="dropdown-link">
              🗄️ Database Integration
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
