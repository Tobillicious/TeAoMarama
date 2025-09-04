import { ArrowRight, BookOpen, Brain, Heart, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

// Add Inter font for professional typography
const LandingPage: React.FC = () => {
  useEffect(() => {
    // Load Inter font for professional appearance
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    setIsVisible(true);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: <Brain className="feature-icon" />,
      title: 'AI-Powered Learning',
      maoriTitle: 'Te Ako Mātauranga',
      description: 'Personalized educational pathways enhanced by artificial intelligence',
      color: 'var(--feature-1)',
    },
    {
      icon: <Heart className="feature-icon" />,
      title: 'Cultural Integration',
      maoriTitle: 'Te Whakaurunga Tikanga',
      description: 'Deep integration of Te Ao Māori principles and cultural wisdom',
      color: 'var(--feature-2)',
    },
    {
      icon: <Zap className="feature-icon" />,
      title: 'Performance Excellence',
      maoriTitle: 'Te Hiranga Ako',
      description: 'Advanced analytics and optimization for maximum learning outcomes',
      color: 'var(--feature-3)',
    },
  ];

  const stats = [
    { number: '1000+', label: 'Educational Resources', maoriLabel: 'Rauemi Ako' },
    { number: '95%', label: 'Cultural Alignment', maoriLabel: 'Te Tautika Tikanga' },
    { number: '81+', label: 'AI Systems Coordinated', maoriLabel: 'Pūnaha Mātauranga' },
    { number: '24/7', label: 'Learning Support', maoriLabel: 'Tautoko Ako' },
  ];

  return (
    <div className={`landing-page ${isVisible ? 'visible' : ''}`}>
      {/* Navigation Header */}
      <header className="landing-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">Te Kura o TeAoMarama</span>
          </div>
          <nav className="header-nav">
            <Link to="/quality-lessons" className="nav-link">
              Quality Lessons
            </Link>
            <Link to="/cultural-learning-modules" className="nav-link">
              Cultural Learning
            </Link>
            <Link to="/login" className="nav-link login-btn">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Te Kura o TeAoMarama
              <span className="hero-subtitle">The School of Enlightenment</span>
            </h1>
            <p className="hero-description">
              An AI-powered educational platform that honors Te Ao Māori while delivering
              cutting-edge learning experiences for students and teachers.
            </p>
            <div className="hero-actions">
              <Link to="/quality-lessons" className="cta-button primary">
                <BookOpen size={20} />
                Explore Quality Lessons
                <ArrowRight size={20} />
              </Link>
              <Link to="/te-kete-ako-resources" className="cta-button secondary">
                <BookOpen size={20} />
                TeKeteAko Resources
              </Link>
              <Link to="/cultural-learning-modules" className="cta-button secondary">
                <Heart size={20} />
                Cultural Learning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Platform Features</h2>
          <p className="section-subtitle">
            Discover the powerful tools and capabilities that make Te Kura o TeAoMarama the future
            of culturally-integrated education.
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                style={{ '--feature-color': feature.color } as React.CSSProperties}
              >
                {feature.icon}
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-maori-title">{feature.maoriTitle}</p>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <h2 className="stats-title">Platform Impact</h2>
          <p className="stats-subtitle">
            Real numbers that demonstrate our commitment to educational excellence.
          </p>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-maori-label">{stat.maoriLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Transform Education?</h2>
          <p className="cta-description">
            Join thousands of educators and students who are already experiencing the future of
            culturally-integrated, AI-powered learning.
          </p>
          <div className="cta-buttons">
            <Link to="/login" className="cta-button primary">
              Get Started Today
              <ArrowRight size={20} />
            </Link>
            <Link to="/educational-platform" className="cta-button secondary">
              Explore Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">🌿 Te Kura o TeAoMarama</div>
          <p className="footer-text">
            Empowering education through cultural wisdom and artificial intelligence. Building the
            future of learning, one lesson at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
