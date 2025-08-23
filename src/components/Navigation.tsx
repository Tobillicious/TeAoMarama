import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation-container">
      <div className="nav-brand">
        <Link to="/" className="nav-logo">
          🧠 Te Kura o TeAoMarama
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/educational-platform" className="nav-link">
          📚 Educational Platform
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
        <Link to="/human-success" className="nav-link">
          🌿 Human Success
        </Link>
        <Link to="/superintelligence" className="nav-link">
          🤖 AI Dashboard
        </Link>
        <Link to="/platform-development" className="nav-link">
          🚀 Platform Dev
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
