import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation: React.FC = () => {
  return (
    <nav className="navigation-container">
      <div className="nav-brand">
        <Link to="/" className="nav-logo">Te Kete Ako</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
    </nav>
  );
}

export default Navigation;