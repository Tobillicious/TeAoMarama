import { ArrowRight, BookOpen, Brain, Heart, Star, Target, Users, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirebaseHealth } from '../firebaseConfig';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState<string>('Checking...');

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);

    // Check Firebase status
    getFirebaseHealth().then((health: { status: string }) => {
      setFirebaseStatus(health.status);
    });

    return () => clearInterval(interval);
  }, []);

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
            <div className="firebase-status">Firebase: {firebaseStatus}</div>
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
              <Link to="/cultural-learning-modules" className="cta-button secondary">
                Cultural Learning
              </Link>
            </div>

            {/* Quick Access to Educational Content */}
            <div className="quick-access">
              <h3>Quick Access to Year 8 Content</h3>
              <div className="quick-access-buttons">
                <Link to="/year8-social-studies" className="quick-access-btn">
                  Social Studies
                </Link>
                <Link to="/year8-reading" className="quick-access-btn">
                  Reading Strategies
                </Link>
                <Link to="/year8-academic-vocab" className="quick-access-btn">
                  Academic Vocabulary
                </Link>
                <Link to="/year8-writing-units" className="quick-access-btn">
                  Writing Units
                </Link>
                <Link to="/year8-critical-literacy" className="quick-access-btn">
                  Critical Literacy
                </Link>
                <Link to="/year8-reading-units" className="quick-access-btn">
                  Reading Units
                </Link>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="feature-showcase">
              <div className={`feature-card active feature-${currentFeature + 1}`}>
                {features[currentFeature].icon}
                <h3>{features[currentFeature].title}</h3>
                <h4>{features[currentFeature].maoriTitle}</h4>
                <p>{features[currentFeature].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-maori">{stat.maoriLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Platform Features</h2>
            <p className="maori-subtitle">Ngā Āhuatanga o Te Pūnaha</p>
          </div>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Users className="feature-icon" />
              </div>
              <h3>Student Dashboard</h3>
              <p>Personalized learning pathways with real-time progress tracking</p>
              <Link to="/student-dashboard" className="feature-link">
                Explore Dashboard <ArrowRight size={16} />
              </Link>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <BookOpen className="feature-icon" />
              </div>
              <h3>Teacher Resources</h3>
              <p>Comprehensive teaching materials and assessment tools</p>
              <Link to="/teacher-dashboard" className="feature-link">
                Access Resources <ArrowRight size={16} />
              </Link>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Brain className="feature-icon" />
              </div>
              <h3>AI Lesson Generator</h3>
              <p>Create culturally-integrated lessons with AI assistance</p>
              <Link to="/educational-platform" className="feature-link">
                View Educational Platform <ArrowRight size={16} />
              </Link>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Target className="feature-icon" />
              </div>
              <h3>Assessment Framework</h3>
              <p>Holistic assessment tools that honor cultural knowledge</p>
              <Link to="/assessment-framework" className="feature-link">
                View Framework <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Integration Section */}
      <section className="cultural-section">
        <div className="container">
          <div className="cultural-content">
            <div className="cultural-text">
              <h2>Te Ao Māori Integration</h2>
              <p className="maori-subtitle">Te Whakaurunga o Te Ao Māori</p>
              <p>
                Our platform deeply integrates Te Ao Māori principles, ensuring that cultural wisdom
                and contemporary education work in harmony. Every feature is designed with respect
                for tikanga Māori and the preservation of traditional knowledge.
              </p>
              <div className="cultural-principles">
                <div className="principle">
                  <Heart className="principle-icon" />
                  <div>
                    <h4>Manaakitanga</h4>
                    <p>Creating welcoming and inclusive learning environments</p>
                  </div>
                </div>
                <div className="principle">
                  <Star className="principle-icon" />
                  <div>
                    <h4>Kaitiakitanga</h4>
                    <p>Caring for knowledge and ensuring its preservation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="cultural-visual">
              <div className="cultural-pattern"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Begin Your Learning Journey?</h2>
            <p>Join thousands of students and teachers already using our platform</p>
            <div className="cta-actions">
              <Link to="/educational-platform" className="cta-button primary large">
                <BookOpen size={24} />
                Start Learning Today
                <ArrowRight size={24} />
              </Link>
              <Link to="/login" className="cta-button secondary large">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Te Kura o TeAoMarama</h3>
              <p>The School of Enlightenment</p>
              <p>AI-powered education with cultural wisdom</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/quality-lessons">Quality Lessons</Link>
              <Link to="/cultural-learning-modules">Cultural Learning</Link>
              <Link to="/educational-resources">Resources</Link>
            </div>
            <div className="footer-section">
              <h4>Platform</h4>
              <Link to="/student-dashboard">Student Dashboard</Link>
              <Link to="/teacher-dashboard">Teacher Dashboard</Link>
              <Link to="/assessment-framework">Assessment</Link>
            </div>
            <div className="footer-section">
              <h4>Advanced Features</h4>
              <Link to="/advanced-analytics">Analytics</Link>
              <Link to="/multimedia">Multimedia Studio</Link>
              <Link to="/collaboration">Collaboration Hub</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Te Kura o TeAoMarama. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
