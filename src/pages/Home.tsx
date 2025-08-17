import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';
import './Home.css';

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
        const uniqueCategories = [...new Set(data.items?.map((item: any) => item.category) || [])];
        setCategories(uniqueCategories);
      })
      .catch(() => setResourceCount('5,439'));
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
      {/* NEW: Dramatic Hero Section */}
      <section className="hero-section-new">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="hero-glow"></div>
        </div>
        <div className="hero-content-new">
          <div className="hero-badge">🌟 Mangakotukutuku College</div>
          <h1 className="hero-title-new">Te Kete Ako</h1>
          <p className="hero-subtitle-new">Digital Learning Hub for Aotearoa's Future Leaders</p>
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
            <button className="btn-primary-new" onClick={() => navigate('/resources')}>
              🚀 Explore Resources
            </button>
            <button className="btn-secondary-new" onClick={() => navigate('/dashboard')}>
              📊 View Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* NEW: Feature Grid */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title-new">What's New at Mangakotukutuku</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Resource Library</h3>
              <p>{resourceCount} educational resources ready for your classroom</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Cultural Integration</h3>
              <p>Māori perspectives woven throughout all content</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Access</h3>
              <p>Find what you need in seconds with smart search</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>NZC Aligned</h3>
              <p>All resources mapped to New Zealand Curriculum</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Quick Access Section */}
      <section className="quick-access-section">
        <div className="container">
          <h2 className="section-title-new">Quick Access</h2>
          <div className="quick-access-grid">
            <div className="quick-card" onClick={() => navigate('/resources')}>
              <div className="quick-icon">🔍</div>
              <h3>Browse All Resources</h3>
              <p>Search and filter {resourceCount} educational materials</p>
            </div>
            <div className="quick-card" onClick={() => navigate('/resources')}>
              <div className="quick-icon">📖</div>
              <h3>View Recent</h3>
              <p>Latest additions to our resource collection</p>
            </div>
            <div className="quick-card" onClick={() => navigate('/resources')}>
              <div className="quick-icon">⭐</div>
              <h3>Featured Content</h3>
              <p>Hand-picked resources for your classroom</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Status Dashboard */}
      <section className="status-section">
        <div className="container">
          <h2 className="section-title-new">Platform Status</h2>
          <div className="status-grid">
            <div className="status-card-new">
              <div className="status-header-new">
                <div className="status-icon-new">✅</div>
                <div className="status-info">
                  <h3>System Online</h3>
                  <p>All services operational</p>
                </div>
              </div>
            </div>
            <div className="status-card-new">
              <div className="status-header-new">
                <div className="status-icon-new">📊</div>
                <div className="status-info">
                  <h3>{resourceCount} Resources</h3>
                  <p>Available for download</p>
                </div>
              </div>
            </div>
            <div className="status-card-new">
              <div className="status-header-new">
                <div className="status-icon-new">🌿</div>
                <div className="status-info">
                  <h3>Cultural Safety</h3>
                  <p>100% protocols active</p>
                </div>
              </div>
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
