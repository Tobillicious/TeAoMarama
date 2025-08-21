import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Welcome to Te Kete Ako</h1>
        <p>Educational excellence with cultural intelligence</p>
        <div className="hero-actions">
          <Link to="/about" className="btn btn-primary">
            Learn More
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Get Started
          </Link>
          <Link to="/migration-dashboard" className="btn btn-accent">
            Migration Status
          </Link>
        </div>
      </header>
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <h3>📚 Educational Resources</h3>
            <p>10,892 curated educational materials</p>
            <small>Fully indexed and categorized</small>
          </div>
          <div className="feature-card">
            <h3>🌿 Cultural Integration</h3>
            <p>6,740 culturally authentic Māori resources</p>
            <small>With cultural safety protocols</small>
          </div>
          <div className="feature-card">
            <h3>🎯 High Quality</h3>
            <p>6,740 high-priority resources ready for use</p>
            <small>Quality assured and validated</small>
          </div>
          <div className="feature-card">
            <h3>🚀 Migration Progress</h3>
            <p>All resources processed and indexed</p>
            <small>Ready for deployment</small>
          </div>
        </div>
      </section>
      <section className="status-section">
        <h2>System Status</h2>
        <div className="status-grid">
          <div className="status-item success">
            <span className="status-icon">✅</span>
            <span>Resource Indexing: Complete</span>
          </div>
          <div className="status-item success">
            <span className="status-icon">✅</span>
            <span>Cultural Review: Active</span>
          </div>
          <div className="status-item success">
            <span className="status-icon">✅</span>
            <span>Migration System: Operational</span>
          </div>
          <div className="status-item warning">
            <span className="status-icon">⚠️</span>
            <span>Code Quality: 95 errors remaining</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
