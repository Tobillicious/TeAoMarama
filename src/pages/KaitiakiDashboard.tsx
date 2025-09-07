import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';
import './KaitiakiDashboard.css';

interface CulturalProtocol {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'review';
  lastReview: string;
  compliance: number;
  category: 'te-reo' | 'tikanga' | 'community' | 'safety';
}

const KaitiakiDashboard: React.FC = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== 'kaitiaki') {
      navigate('/');
      return;
    }
    setLoading(false);
  }, [role, navigate]);

  if (loading) {
    return (
      <div className="kaitiaki-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your cultural oversight dashboard, Kaitiaki...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kaitiaki-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Kaitiaki Dashboard</h1>
          <p className="welcome-message">
            Kia ora, {user?.displayName || user?.email}! Your cultural guidance is valued.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => navigate('/cultural-oversight')}>
            Cultural Oversight
          </button>
        </div>
      </header>

      <nav className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'protocols' ? 'active' : ''}`}
          onClick={() => setActiveTab('protocols')}
        >
          Cultural Protocols
        </button>
        <button
          className={`tab ${activeTab === 'partnerships' ? 'active' : ''}`}
          onClick={() => setActiveTab('partnerships')}
        >
          Community Partnerships
        </button>
        <button
          className={`tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Cultural Events
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Cultural Protocols</h3>
                <div className="stat-value">4</div>
                <p>Active protocols</p>
              </div>
              <div className="stat-card">
                <h3>Community Partnerships</h3>
                <div className="stat-value">4</div>
                <p>Active relationships</p>
              </div>
              <div className="stat-card">
                <h3>Cultural Events</h3>
                <div className="stat-value">2</div>
                <p>Upcoming events</p>
              </div>
              <div className="stat-card">
                <h3>Cultural Safety</h3>
                <div className="stat-value">92%</div>
                <p>Protocol compliance</p>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Cultural Resources</h3>
              <div className="action-buttons">
                <button
                  className="action-btn"
                  onClick={() => navigate('/cultural-learning-modules')}
                >
                  Cultural Learning Modules
                </button>
                <button className="action-btn" onClick={() => navigate('/community-partnerships')}>
                  Community Partnerships
                </button>
                <button
                  className="action-btn"
                  onClick={() => navigate('/cultural-safety-guidelines')}
                >
                  Cultural Safety Guidelines
                </button>
                <button className="action-btn" onClick={() => navigate('/te-reo-resources')}>
                  Te Reo Resources
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'protocols' && (
          <div className="protocols-tab">
            <h3>Cultural Protocols</h3>
            <p>Protocol management coming soon...</p>
          </div>
        )}

        {activeTab === 'partnerships' && (
          <div className="partnerships-tab">
            <h3>Community Partnerships</h3>
            <p>Partnership management coming soon...</p>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-tab">
            <h3>Cultural Events</h3>
            <p>Event management coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default KaitiakiDashboard;
