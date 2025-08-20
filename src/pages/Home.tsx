import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Welcome to Te Kete Ako</h1>
        <p>Educational excellence with cultural intelligence</p>
        <div className="hero-actions">
          <Link to="/about" className="btn btn-primary">Learn More</Link>
          <Link to="/contact" className="btn btn-secondary">Get Started</Link>
        </div>
      </header>
      
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <h3>📚 Educational Resources</h3>
            <p>5,439 curated educational materials</p>
          </div>
          <div className="feature-card">
            <h3>🌿 Cultural Integration</h3>
            <p>3,372 culturally authentic Māori resources</p>
          </div>
          <div className="feature-card">
            <h3>🎯 High Quality</h3>
            <p>370 high-priority resources ready for use</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
