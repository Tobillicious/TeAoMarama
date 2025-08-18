import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    description: 'Comprehensive literacy units with Liz Kane methodologies and cultural integration',
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

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            🌿 TeAoMarama
            <span className="hero-subtitle">Educational Resources Platform</span>
          </h1>
          <p className="hero-description">
            Comprehensive educational resources for New Zealand teachers and students, 
            with deep cultural integration and curriculum alignment.
          </p>
          <div className="hero-cta">
            <Link to="/resources" className="cta-button primary">
              Explore Resources
            </Link>
            <Link to="/year8-critical-literacy" className="cta-button secondary">
              Year 8 Literacy
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="cultural-pattern"></div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <h2 className="section-title">Platform Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-value">{achievement.value}</div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            {features.map((feature) => (
              <Link
                key={feature.id}
                to={feature.link}
                className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Excellence Section */}
      <section className="cultural-section">
        <div className="container">
          <h2 className="section-title">Cultural Excellence</h2>
          <div className="cultural-content">
            <div className="cultural-text">
              <h3>Māori Integration & Cultural Safety</h3>
              <ul className="cultural-list">
                <li><strong>Tikanga:</strong> Cultural protocols and practices</li>
                <li><strong>Te Reo Māori:</strong> Authentic language usage</li>
                <li><strong>Mātauranga Māori:</strong> Traditional knowledge systems</li>
                <li><strong>Ako:</strong> Reciprocal learning approaches</li>
              </ul>
              <p className="cultural-description">
                Every resource includes cultural connections and is reviewed for cultural appropriateness, 
                ensuring respectful representation of Māori knowledge and community consultation protocols.
              </p>
            </div>
            <div className="cultural-visual">
              <div className="cultural-symbols">
                <span className="symbol">🌿</span>
                <span className="symbol">🌊</span>
                <span className="symbol">🏔️</span>
                <span className="symbol">⭐</span>
              </div>
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
                <li><strong>Mana ōrite mo te mātauranga Māori:</strong> Equal status for Māori knowledge</li>
                <li><strong>Te Tiriti o Waitangi:</strong> Treaty principles integration</li>
                <li><strong>Cultural Safety:</strong> Respectful and appropriate content</li>
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
            Join thousands of New Zealand teachers using TeAoMarama to deliver 
            culturally responsive, curriculum-aligned education.
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
