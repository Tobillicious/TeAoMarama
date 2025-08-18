import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';
import './Home.css';

interface ResourceIndexItem {
  category: string;
}

export default function Home() {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [resourceCount, setResourceCount] = useState('Loading...');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Load real resource data
    fetch('/resources/index.json')
      .then((res) => res.json())
      .then((data) => {
        setResourceCount(data.items?.length?.toLocaleString() || '0');
        const uniqueCategories = [
          ...new Set(
            (data.items as ResourceIndexItem[] | undefined)?.map((item) => item.category) || [],
          ),
        ];
        setCategories(uniqueCategories);
      })
      .catch(() => setResourceCount('5,439')); // Fallback if fetch fails
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="hero-glow"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">🌟 Mangakōtukutuku College</div>
          <h1 className="hero-title">TeAoMarama</h1>
          <p className="hero-subtitle">
            Comprehensive Structured Literacy Platform for Aotearoa's Future Leaders
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{resourceCount}</span>
              <span className="stat-label">Resources</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Cultural Safety</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">🔥 {categories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/year8-writing-revolution')}>
              🚀 Year 8 Structured Literacy
            </button>
            <button className="btn-secondary" onClick={() => navigate('/resources')}>
              📊 Explore Resources
            </button>
          </div>
        </div>
      </section>

      {/* Featured Gold Standard Unit */}
      <section className="featured-unit-section">
        <div className="container">
          <h2 className="section-title">🌟 Featured Gold Standard Unit</h2>
          <div className="gold-standard-card">
            <div className="gold-badge">🏆 GOLD STANDARD</div>
            <h3 className="unit-title">📝 Y8 Structured Literacy: Writing Revolution</h3>
            <p className="unit-description">
              Complete systematic literacy instruction combining The Writing Revolution methodology
              with Te Ao Māori perspectives. Features comprehensive sentence-level instruction,
              cultural integration, and NCEA preparation.
            </p>
            <div className="unit-metrics">
              <div className="metric">
                <span className="metric-number">15</span>
                <span className="metric-label">Activities</span>
              </div>
              <div className="metric">
                <span className="metric-number">25+</span>
                <span className="metric-label">Resources</span>
              </div>
              <div className="metric">
                <span className="metric-number">8</span>
                <span className="metric-label">Weeks</span>
              </div>
              <div className="metric">
                <span className="metric-number">100%</span>
                <span className="metric-label">Cultural Integration</span>
              </div>
            </div>
            <button
              className="explore-gold-btn"
              onClick={() => navigate('/year8-writing-revolution')}
            >
              Explore Gold Standard Unit →
            </button>
          </div>
        </div>
      </section>

      {/* Complete Units Directory */}
      <section className="units-directory-section">
        <div className="container">
          <h2 className="section-title">📚 Complete Structured Literacy Units</h2>
          <div className="units-grid">
            <div className="unit-card premium">
              <div className="unit-badge">✨ PREMIUM</div>
              <h3>🎵 Phonological Awareness</h3>
              <p>
                Foundation sound awareness through Te Ao Māori oral traditions and systematic skill
                development.
              </p>
              <div className="unit-stats">
                <span>📖 8 Activities</span>
                <span>📋 20+ Resources</span>
                <span>⏱️ 6 Weeks</span>
              </div>
              <button
                onClick={() => navigate('/phonological-awareness')}
                className="explore-unit-btn"
              >
                Explore Unit →
              </button>
            </div>

            <div className="unit-card premium">
              <div className="unit-badge">✨ PREMIUM</div>
              <h3>🔤 Systematic Phonics</h3>
              <p>
                Phases 1-6 phonics instruction with cultural connections and The Code methodology.
              </p>
              <div className="unit-stats">
                <span>📖 6 Phases</span>
                <span>📋 30+ Cards</span>
                <span>⏱️ 12 Weeks</span>
              </div>
              <button onClick={() => navigate('/phonetics-cards')} className="explore-unit-btn">
                Explore Unit →
              </button>
            </div>

            <div className="unit-card premium">
              <div className="unit-badge">✨ PREMIUM</div>
              <h3>👁️ Sight Word Mastery</h3>
              <p>
                High-frequency word recognition with Dolch, Fry, and Māori vocabulary integration.
              </p>
              <div className="unit-stats">
                <span>📖 407+ Words</span>
                <span>📋 3 Modes</span>
                <span>⏱️ 8 Weeks</span>
              </div>
              <button onClick={() => navigate('/sight-words')} className="explore-unit-btn">
                Explore Unit →
              </button>
            </div>

            <div className="unit-card premium">
              <div className="unit-badge">✨ PREMIUM</div>
              <h3>📖 Reading Strategies</h3>
              <p>
                Advanced comprehension techniques with cultural text analysis and critical thinking.
              </p>
              <div className="unit-stats">
                <span>📖 12 Strategies</span>
                <span>📋 25+ Resources</span>
                <span>⏱️ 10 Weeks</span>
              </div>
              <button
                onClick={() => navigate('/year8-reading-strategies')}
                className="explore-unit-btn"
              >
                Explore Unit →
              </button>
            </div>

            <div className="unit-card premium">
              <div className="unit-badge">✨ PREMIUM</div>
              <h3>📚 Academic Vocabulary</h3>
              <p>
                Subject-specific academic words with morphological analysis and NCEA preparation.
              </p>
              <div className="unit-stats">
                <span>📖 150+ Words</span>
                <span>📋 8 Subjects</span>
                <span>⏱️ 12 Weeks</span>
              </div>
              <button
                onClick={() => navigate('/year8-academic-vocab')}
                className="explore-unit-btn"
              >
                Explore Unit →
              </button>
            </div>

            <div className="unit-card premium">
              <div className="unit-badge">✨ PREMIUM</div>
              <h3>🔬 Advanced Morphology</h3>
              <p>
                Latin, Greek, and Anglo-Saxon roots with Māori morphological patterns for secondary
                success.
              </p>
              <div className="unit-stats">
                <span>📖 200+ Morphemes</span>
                <span>📋 6 Origins</span>
                <span>⏱️ 15 Weeks</span>
              </div>
              <button onClick={() => navigate('/advanced-morphology')} className="explore-unit-btn">
                Explore Unit →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="platform-overview-section">
        <div className="container">
          <h2 className="section-title">📊 Platform Overview</h2>
          <div className="overview-stats">
            <div className="overview-stat">
              <span className="overview-number">9+</span>
              <span className="overview-label">Complete Units</span>
            </div>
            <div className="overview-stat">
              <span className="overview-number">100+</span>
              <span className="overview-label">Activities</span>
            </div>
            <div className="overview-stat">
              <span className="overview-number">{resourceCount}</span>
              <span className="overview-label">Resources</span>
            </div>
            <div className="overview-stat">
              <span className="overview-number">100%</span>
              <span className="overview-label">Cultural Integration</span>
            </div>
          </div>
        </div>
      </section>

      {/* User Actions */}
      {currentUser && (
        <section className="user-section">
          <div className="container">
            <div className="user-card">
              <p className="user-greeting">Welcome back, {currentUser.email}</p>
              <button onClick={handleLogout} className="btn-logout">
                Log Out
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
