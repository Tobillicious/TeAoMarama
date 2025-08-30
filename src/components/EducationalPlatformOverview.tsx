import React from 'react';
import { Link } from 'react-router-dom';
import './EducationalPlatformOverview.css';

const EducationalPlatformOverview: React.FC = () => {
  const features = [
    {
      id: 1,
      title: 'Advanced Educational Dashboard',
      description:
        'Comprehensive analytics and student progress tracking with real-time notifications and cultural insights.',
      path: '/educational-dashboard',
      icon: '📊',
      color: '#667eea',
    },
    {
      id: 2,
      title: 'Cultural Learning Activities',
      description:
        'Interactive cultural activities covering Te Reo Māori, traditional arts, history, science, and environmental stewardship.',
      path: '/cultural-activities',
      icon: '🌿',
      color: '#f093fb',
    },
    {
      id: 3,
      title: 'Educational Platform',
      description:
        'Core educational content management with lesson plans, assessments, and multimedia resources.',
      path: '/educational-platform',
      icon: '📚',
      color: '#4facfe',
    },
    {
      id: 4,
      title: 'AI-Powered Learning Assistant',
      description: 'Intelligent learning support with personalized recommendations and progress tracking.',
      path: '/superintelligence',
      icon: '🧠',
      color: '#43e97b',
    },
  ];

  const culturalElements = [
    { name: 'Te Reo Māori', description: 'Language learning and cultural communication' },
    { name: 'Tikanga', description: 'Traditional customs and protocols' },
    { name: 'Whakapapa', description: 'Genealogy and family connections' },
    { name: 'Kaitiakitanga', description: 'Environmental guardianship' },
    { name: 'Rongoā', description: 'Traditional Māori medicine' },
    { name: 'Matariki', description: 'Māori astronomy and navigation' },
  ];

  return (
    <div className="educational-platform-overview">
      <div className="overview-header">
        <h1>Te Kura o TeAoMarama - Educational Platform</h1>
        <p>Comprehensive Māori cultural education with modern technology integration</p>
      </div>

      <div className="platform-features">
        <h2>Platform Features</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className={`feature-card color-${feature.id}`}>
              <div className={`feature-icon color-${feature.id}`}>{feature.icon}</div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.path} className="feature-link">
                  Explore Feature →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cultural-integration">
        <h2>Cultural Integration</h2>
        <div className="cultural-elements-grid">
          {culturalElements.map((element, index) => (
            <div key={index} className="cultural-element-card">
              <h4>{element.name}</h4>
              <p>{element.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="platform-stats">
        <h2>Platform Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">4</div>
            <div className="stat-label">Core Features</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">6</div>
            <div className="stat-label">Cultural Elements</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Cultural Integration</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">⚡</div>
            <div className="stat-label">Performance Optimized</div>
          </div>
        </div>
      </div>

      <div className="quick-access">
        <h2>Quick Access</h2>
        <div className="quick-links">
          <Link to="/educational-dashboard" className="quick-link primary">
            Launch Dashboard
          </Link>
          <Link to="/cultural-activities" className="quick-link secondary">
            View Activities
          </Link>
          <Link to="/educational-platform" className="quick-link secondary">
            Browse Content
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EducationalPlatformOverview;
