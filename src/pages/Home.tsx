import { useState } from 'react';
import { Link } from 'react-router-dom';
import MegaNavigation from '../components/navigation/MegaNavigation';
import EnhancedFirebaseAuth from '../components/auth/EnhancedFirebaseAuth';
import './Home.css';

interface Achievement {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const achievements: Achievement[] = [
  {
    id: 'resources',
    title: 'Educational Resources',
    value: '5,439+',
    description: 'Comprehensive teaching materials across 8 subjects',
    icon: '📚',
  },
  {
    id: 'cultural',
    title: 'Cultural Resources',
    value: '3,372',
    description: 'Authentic Māori integration and cultural content',
    icon: '🌿',
  },
  {
    id: 'priority',
    title: 'High Priority',
    value: '370',
    description: 'Ready-to-use classroom resources',
    icon: '⭐',
  },
  {
    id: 'subjects',
    title: 'Subject Areas',
    value: '8',
    description: 'English, Math, Science, Social Studies, PE, Arts, Technology, Te Reo Māori',
    icon: '🎯',
  },
];

const features: Feature[] = [
  {
    id: 'year8-literacy',
    title: 'Year 8 Critical Literacy',
    description:
      'Comprehensive literacy units with Liz Kane methodologies and cultural integration',
    icon: '📖',
    link: '/year8-critical-literacy',
  },
  {
    id: 'reading-units',
    title: 'Reading Units',
    description: 'Structured literacy approach with "The Writing Revolution" and "The Code"',
    icon: '🎯',
    link: '/year8-reading-units',
  },
  {
    id: 'resources',
    title: 'Resource Bank',
    description: '5,439+ searchable educational resources with cultural context',
    icon: '📚',
    link: '/resources',
  },
  {
    id: 'dashboard',
    title: 'Teacher Dashboard',
    description: 'Professional tools for lesson planning and assessment',
    icon: '📊',
    link: '/dashboard',
  },
];

const Home = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="home-container">
      {/* Hero Section - Clean & Beautiful */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="hero-glow"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">🌿 New Zealand's Premier Educational Platform</div>
            <h1 className="hero-title">
              TeAoMarama
              <span className="hero-subtitle">260+ Educational Components Ready to Use</span>
            </h1>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">260+</span>
                <span className="stat-label">Components</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5,439</span>
                <span className="stat-label">Resources</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Cultural Safety</span>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="/resources" className="btn-primary">
                Explore All Components
              </Link>
              <button 
                onClick={() => setShowAuth(!showAuth)}
                className="btn-secondary"
              >
                Sign In / Register
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      {showAuth && (
        <section className="auth-section">
          <div className="container">
            <div className="auth-container">
              <EnhancedFirebaseAuth 
                onAuthSuccess={(user) => {
                  console.log('User authenticated:', user);
                  setShowAuth(false);
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Featured Gold Standard Unit */}
      <section className="featured-unit-section">
        <div className="container">
          <div className="gold-standard-card">
            <div className="gold-badge">⭐ FEATURED EXCELLENCE</div>
            <h2 className="unit-title">Year 8 Writing Revolution</h2>
            <p className="unit-description">
              Our flagship literacy program combining The Writing Revolution methodology with 
              authentic Māori cultural integration. Perfect for ERO demonstrations.
            </p>
            <div className="unit-metrics">
              <div className="metric">
                <span className="metric-number">45</span>
                <span className="metric-label">Lessons</span>
              </div>
              <div className="metric">
                <span className="metric-number">98%</span>
                <span className="metric-label">Cultural Authenticity</span>
              </div>
              <div className="metric">
                <span className="metric-number">NCEA</span>
                <span className="metric-label">Ready</span>
              </div>
            </div>
            <Link to="/year8-writing-revolution" className="explore-gold-btn">
              Explore Writing Revolution
            </Link>
          </div>
        </div>
      </section>

      {/* MegaNavigation - The Heart of Our Platform */}
      <section className="navigation-showcase-section">
        <div className="container">
          <h2 className="section-title">Explore All 260+ Educational Components</h2>
          <p className="section-subtitle">
            Browse by category, search by topic, or discover new resources. 
            Every component is culturally integrated and curriculum-aligned.
          </p>
          <MegaNavigation className="homepage-navigation" />
        </div>
      </section>

      {/* Quick Access Units */}
      <section className="units-directory-section">
        <div className="container">
          <h2 className="section-title">Quick Access to Popular Units</h2>
          <div className="units-grid">
            <div className="unit-card premium">
              <div className="unit-badge">PREMIUM</div>
              <h3>Year 8 Critical Literacy</h3>
              <p>Comprehensive literacy units with Liz Kane methodologies and cultural integration for advanced learners.</p>
              <div className="unit-stats">
                <span>45 Lessons</span>
                <span>NCEA Aligned</span>
                <span>Cultural Focus</span>
              </div>
              <Link to="/year8-critical-literacy" className="explore-unit-btn">Explore Unit</Link>
            </div>
            
            <div className="unit-card">
              <div className="unit-badge">POPULAR</div>
              <h3>Reading Strategies</h3>
              <p>Structured literacy approach with "The Writing Revolution" and "The Code" methodologies.</p>
              <div className="unit-stats">
                <span>32 Lessons</span>
                <span>Evidence-Based</span>
                <span>Ready to Use</span>
              </div>
              <Link to="/year8-reading-strategies" className="explore-unit-btn">Explore Unit</Link>
            </div>
            
            <div className="unit-card">
              <div className="unit-badge">CULTURAL</div>
              <h3>Māori Astronomy Navigation</h3>
              <p>Traditional navigation and astronomical knowledge integrated with modern science concepts.</p>
              <div className="unit-stats">
                <span>Traditional Knowledge</span>
                <span>STEM Integration</span>
                <span>Year 8-10</span>
              </div>
              <Link to="/maori-astronomy-navigation" className="explore-unit-btn">Explore Unit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="platform-overview-section">
        <div className="container">
          <h2 className="section-title">Platform Overview</h2>
          <div className="overview-stats">
            <div className="overview-stat">
              <span className="overview-number">260+</span>
              <span className="overview-label">Educational Components</span>
            </div>
            <div className="overview-stat">
              <span className="overview-number">5,439</span>
              <span className="overview-label">Teaching Resources</span>
            </div>
            <div className="overview-stat">
              <span className="overview-number">3,372</span>
              <span className="overview-label">Cultural Resources</span>
            </div>
            <div className="overview-stat">
              <span className="overview-number">8</span>
              <span className="overview-label">Subject Areas</span>
            </div>
          </div>
        </div>
      </section>

      {/* NCEA Preparation Section */}
      <section className="ncea-section">
        <div className="container">
          <h2 className="section-title">NCEA Level 1 Preparation</h2>
          <div className="ncea-content">
            <div className="ncea-standards">
              <h3>English Standards Alignment</h3>
              <div className="standards-grid">
                <div className="standard-card">
                  <h4>AS 90052</h4>
                  <p>Produce creative writing</p>
                </div>
                <div className="standard-card">
                  <h4>AS 90053</h4>
                  <p>Produce formal writing</p>
                </div>
                <div className="standard-card">
                  <h4>AS 90849</h4>
                  <p>Show understanding of written texts</p>
                </div>
                <div className="standard-card">
                  <h4>AS 90850</h4>
                  <p>Show understanding of visual/oral texts</p>
                </div>
              </div>
            </div>
            <div className="ncea-cultural">
              <h3>Cultural Competency</h3>
              <ul className="cultural-competency-list">
                <li>
                  <strong>Mana ōrite mo te mātauranga Māori:</strong> Equal status for Māori
                  knowledge
                </li>
                <li>
                  <strong>Te Tiriti o Waitangi:</strong> Treaty principles integration
                </li>
                <li>
                  <strong>Cultural Safety:</strong> Respectful and appropriate content
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Transform Your Teaching?</h2>
          <p className="cta-description">
            Join thousands of New Zealand teachers using TeAoMarama to deliver culturally
            responsive, curriculum-aligned education.
          </p>
          <div className="cta-buttons">
            <Link to="/resources" className="cta-button primary large">
              Start Exploring
            </Link>
            <Link to="/year8-critical-literacy" className="cta-button secondary large">
              View Year 8 Units
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
