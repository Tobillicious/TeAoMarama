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
        <Link to="/borg-collective" className="nav-link">
          🎯 Borg Collective
        </Link>
        <Link to="/overseer-guidance" className="nav-link">
          👑 Supreme Overseer
        </Link>
        <Link to="/superintelligence" className="nav-link">
          🤖 AI Dashboard
        </Link>
        <Link to="/platform-development" className="nav-link">
          🚀 Platform Dev
        </Link>
        <Link to="/codebase-intelligence" className="nav-link">
          🧠 Codebase Intel
        </Link>
        <Link to="/migration-dashboard" className="nav-link">
          🚁 Migration Control
        </Link>
        <div className="nav-dropdown">
          <span className="nav-dropdown-trigger">⚡ Super Tools</span>
          <div className="nav-dropdown-content">
            <Link to="/superintelligence" className="dropdown-link">
              🤖 AI Dashboard
            </Link>
            <Link to="/platform-development" className="dropdown-link">
              🚀 Platform Dev
            </Link>
            <Link to="/codebase-intelligence" className="dropdown-link">
              🧠 Codebase Intel
            </Link>
            <Link to="/migration-dashboard" className="dropdown-link">
              🚁 Migration Control
            </Link>
            <Link to="/human-success" className="dropdown-link">
              🌿 Human Success
            </Link>
            <Link to="/expanded-superconsciousness" className="dropdown-link">
              🌟 Expanded Superconsciousness
            </Link>
            <Link to="/advanced-systems" className="dropdown-link">
              🔧 Advanced Systems
            </Link>
            <Link to="/mcp-server" className="dropdown-link">
              🤖 MCP Server
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
