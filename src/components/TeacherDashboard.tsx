import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';
import './TeacherDashboard.css';

const TeacherDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats] = useState({
    totalStudents: 127,
    activeLessons: 8,
    pendingAssessments: 12,
    culturalResources: 3420,
    completedActivities: 89,
  });

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'teacher') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const quickActions = [
    {
      title: 'Create Lesson Plan',
      icon: '📝',
      description: 'Design engaging lessons with cultural integration',
      action: () => navigate('/lesson-planner'),
      color: '#38b2ac',
    },
    {
      title: 'Student Progress',
      icon: '📊',
      description: 'Monitor individual and class performance',
      action: () => navigate('/student-progress'),
      color: '#3182ce',
    },
    {
      title: 'Assessment Creator',
      icon: '🎯',
      description: 'Build culturally-responsive assessments',
      action: () => navigate('/assessment-creator'),
      color: '#d69e2e',
    },
    {
      title: 'Cultural Resources',
      icon: '🌿',
      description: 'Access 7000+ cultural and educational materials',
      action: () => navigate('/cultural-resources'),
      color: '#38a169',
    },
    {
      title: 'Professional Development',
      icon: '🎓',
      description: 'Enhance teaching skills and cultural competency',
      action: () => navigate('/professional-development'),
      color: '#805ad5',
    },
    {
      title: 'Collaboration Hub',
      icon: '🤝',
      description: 'Connect with other educators',
      action: () => navigate('/collaboration-hub'),
      color: '#e53e3e',
    },
  ];

  const recentActivities = [
    {
      type: 'lesson',
      title: 'Te Reo Māori - Greetings & Introductions',
      date: '2024-01-15',
      status: 'completed',
    },
    {
      type: 'assessment',
      title: 'Year 8 Social Studies - Pre-colonial Aotearoa',
      date: '2024-01-14',
      status: 'pending',
    },
    {
      type: 'resource',
      title: 'Cultural Protocol Guidelines',
      date: '2024-01-13',
      status: 'reviewed',
    },
  ];

  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="user-info">
            <div className="avatar">👩‍🏫</div>
            <div className="user-details">
              <h1>Kia ora, {currentUser?.name || 'Kaiako'}!</h1>
              <p className="user-role">Kaiako (Teacher) • {currentUser?.school}</p>
              <p className="cultural-clearance">
                Cultural Clearance: {currentUser?.culturalClearance}
                {currentUser?.culturalClearance === 'kaitiaki' && ' 🌿'}
              </p>
            </div>
          </div>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <button className="settings-btn">⚙️</button>
            <button className="logout-btn" onClick={handleLogout}>
              👋 Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`nav-tab ${activeTab === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          📝 Lessons
        </button>
        <button
          className={`nav-tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          👥 Students
        </button>
        <button
          className={`nav-tab ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          📚 Resources
        </button>
        <button
          className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>{stats.totalStudents}</h3>
                  <p>Total Students</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-content">
                  <h3>{stats.activeLessons}</h3>
                  <p>Active Lessons</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-content">
                  <h3>{stats.pendingAssessments}</h3>
                  <p>Pending Assessments</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌿</div>
                <div className="stat-content">
                  <h3>{stats.culturalResources.toLocaleString()}</h3>
                  <p>Cultural Resources</p>
                </div>
              </div>
            </div>

            <div className="content-sections">
              <section className="quick-actions-section">
                <h2>Quick Actions</h2>
                <div className="quick-actions-grid">
                  {quickActions.map((action, index) => (
                    <div
                      key={index}
                      className="quick-action-card"
                      onClick={action.action}
                      style={{ '--action-color': action.color } as React.CSSProperties}
                    >
                      <div className="action-icon">{action.icon}</div>
                      <h3>{action.title}</h3>
                      <p>{action.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="recent-activities-section">
                <h2>Recent Activities</h2>
                <div className="activities-list">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        {activity.type === 'lesson' && '📝'}
                        {activity.type === 'assessment' && '🎯'}
                        {activity.type === 'resource' && '📚'}
                      </div>
                      <div className="activity-content">
                        <h4>{activity.title}</h4>
                        <p className="activity-date">{activity.date}</p>
                      </div>
                      <div className={`activity-status ${activity.status}`}>{activity.status}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="lessons-tab">
            <h2>Lesson Management</h2>
            <p>Access to all lesson planning tools and cultural content creation.</p>
            <div className="feature-access">
              <h3>Available Features:</h3>
              <ul>
                <li>📝 AI-Powered Lesson Generator</li>
                <li>🎯 Assessment Creation Tools</li>
                <li>🌿 Cultural Integration Guidelines</li>
                <li>📊 Progress Tracking</li>
                <li>🤝 Collaborative Planning</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="students-tab">
            <h2>Student Management</h2>
            <p>Monitor student progress and provide personalized support.</p>
            <div className="feature-access">
              <h3>Available Features:</h3>
              <ul>
                <li>📊 Individual Progress Tracking</li>
                <li>📈 Class Performance Analytics</li>
                <li>🎯 Assessment Results</li>
                <li>📝 Feedback System</li>
                <li>👥 Group Management</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="resources-tab">
            <h2>Educational Resources</h2>
            <p>Access to 7000+ cultural and educational resources.</p>
            <div className="resource-categories">
              <div className="resource-category">
                <h3>📚 Content Library</h3>
                <p>3,420+ educational materials</p>
              </div>
              <div className="resource-category">
                <h3>🌿 Cultural Resources</h3>
                <p>2,180+ cultural materials</p>
              </div>
              <div className="resource-category">
                <h3>🎮 Interactive Activities</h3>
                <p>1,400+ engaging activities</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-tab">
            <h2>Analytics & Insights</h2>
            <p>Comprehensive analytics for informed teaching decisions.</p>
            <div className="feature-access">
              <h3>Available Features:</h3>
              <ul>
                <li>📊 Student Performance Analytics</li>
                <li>📈 Learning Outcome Tracking</li>
                <li>🎯 Assessment Effectiveness</li>
                <li>🌿 Cultural Engagement Metrics</li>
                <li>📝 Content Usage Analytics</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;
