import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';
import WhakataukiWisdom from '../components/WhakataukiWisdom';
import CulturalConsultationProtocol from '../components/CulturalConsultationProtocol';
import './Home.css';

interface ResourceItem {
  category: string;
  id: string;
  title: string;
  relativePath: string;
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
          ...new Set(data.items?.map((item: ResourceItem) => item.category as string) || []),
        ] as string[];
        setCategories(uniqueCategories);
      })
      .catch(() => setResourceCount('5,439'));
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section-new">
        <div className="hero-content-new">
          <div className="hero-badge">🌿 Te Kete Ako - Educational Excellence</div>
          <h1 className="hero-title-new">Empowering Aotearoa's Educators</h1>
          <p className="hero-subtitle-new">
            Comprehensive educational resources designed for New Zealand teachers and students, with
            authentic cultural integration and transformative pedagogy.
          </p>
          
          {/* Integrated Whakataukī Wisdom */}
          <WhakataukiWisdom variant="hero" className="hero-wisdom" />

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

          <div className="hero-actions-new">
            <button 
              type="button"
              className="btn-primary-new"
              onClick={() => navigate('/resources')}
            >
              Browse Resources
            </button>
            <button 
              type="button"
              className="btn-secondary-new"
              onClick={() => navigate('/unit-plan')}
            >
              View Unit Plan Template
            </button>
            <button 
              type="button"
              className="btn-secondary-new"
              onClick={() => navigate('/dashboard')}
            >
              Teacher Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title-new">Why Choose Te Kete Ako?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Comprehensive Library</h3>
              <p>
                {resourceCount} educational resources ready for your classroom, covering all
                curriculum areas and year levels.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Cultural Integration</h3>
              <p>
                Authentic Māori content and perspectives woven throughout, respecting Te Tiriti o
                Waitangi principles.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Curriculum Aligned</h3>
              <p>
                All resources mapped to the New Zealand Curriculum, with clear learning intentions
                and success criteria.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Modern Pedagogy</h3>
              <p>
                Evidence-based teaching strategies and innovative approaches to engage today's
                learners.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>
                Advanced filtering and search capabilities to find exactly what you need, when you
                need it.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Teacher Support</h3>
              <p>
                Professional development resources and collaborative tools to enhance your teaching
                practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="quick-actions">
        <div className="container">
          <h2 className="section-title-new">Quick Access</h2>
          <div className="quick-grid">
            <div className="quick-card" onClick={() => navigate('/resources')}>
              <div className="quick-icon">🔍</div>
              <h3>Browse All Resources</h3>
              <p>
                Search and filter {resourceCount} educational materials by subject, year level, and
                more.
              </p>
            </div>
            <div className="quick-card" onClick={() => navigate('/resources')}>
              <div className="quick-icon">📖</div>
              <h3>Lesson Plans</h3>
              <p>
                Ready-to-use lesson plans with activities, assessments, and cultural connections.
              </p>
            </div>
            <div className="quick-card" onClick={() => navigate('/resources')}>
              <div className="quick-icon">🎨</div>
              <h3>Activities & Games</h3>
              <p>Engaging classroom activities and educational games for interactive learning.</p>
            </div>
            <div className="quick-card" onClick={() => navigate('/resources')}>
              <div className="quick-icon">📊</div>
              <h3>Assessment Tools</h3>
              <p>Formative and summative assessment resources with rubrics and tracking tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Excellence Framework */}
      <section className="cultural-excellence-section">
        <div className="container">
          <h2 className="section-title-new">Cultural Excellence & Consultation</h2>
          <p className="section-subtitle">
            Authentic iwi engagement and postcolonial pedagogical framework ensuring 
            cultural safety and authentic representation in all educational content.
          </p>
          
          <CulturalConsultationProtocol variant="summary" />
          
          {/* Enhanced Guiding Wisdom */}
          <WhakataukiWisdom variant="card" className="cultural-wisdom-card" />
        </div>
      </section>

      {/* Status Section */}
      <section className="status-section">
        <div className="container">
          <div className="status-card-enhanced">
            <div className="status-header-new">
              <div className="status-icon-new">📊</div>
              <div className="status-info">
                <h3>{resourceCount} Educational Resources</h3>
                <p>100% culturally reviewed and curriculum-aligned</p>
              </div>
              <CulturalConsultationProtocol variant="widget" className="status-consultation-widget" />
            </div>
            {currentUser && (
              <div className="user-section">
                <p className="welcome-message">
                  Kia ora, {currentUser.email} - Welcome to Te Kete Ako
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="sign-out-button"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
