import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';
import './StudentDashboard.css';

interface LearningModule {
  id: string;
  title: string;
  subject: string;
  progress: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  culturalElements: string[];
  isCompleted: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'academic' | 'cultural' | 'collaboration';
}

interface RecentActivity {
  id: string;
  activity: string;
  subject: string;
  timestamp: string;
  score?: number;
}

const StudentDashboard: React.FC = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [learningModules, setLearningModules] = useState<LearningModule[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== 'student') {
      navigate('/');
      return;
    }

    // Simulate loading student data
    const loadStudentData = async () => {
      setLoading(true);

      // Mock data - in real app, this would come from Firebase
      const mockModules: LearningModule[] = [
        {
          id: '1',
          title: 'Narrative Structure in Pūrākau',
          subject: 'English',
          progress: 75,
          difficulty: 'intermediate',
          estimatedTime: '45 min',
          culturalElements: ['Te Reo Māori', 'Māori storytelling'],
          isCompleted: false,
        },
        {
          id: '2',
          title: 'Academic Vocabulary Building',
          subject: 'English',
          progress: 100,
          difficulty: 'beginner',
          estimatedTime: '30 min',
          culturalElements: ['Cultural context'],
          isCompleted: true,
        },
        {
          id: '3',
          title: 'Critical Literacy in Media',
          subject: 'Social Studies',
          progress: 45,
          difficulty: 'advanced',
          estimatedTime: '60 min',
          culturalElements: ['Media representation', 'Cultural bias'],
          isCompleted: false,
        },
        {
          id: '4',
          title: 'Statistics with NZ Data',
          subject: 'Mathematics',
          progress: 0,
          difficulty: 'intermediate',
          estimatedTime: '50 min',
          culturalElements: ['Māori population data'],
          isCompleted: false,
        },
      ];

      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'Te Reo Learner',
          description: 'Completed your first Te Reo Māori lesson',
          icon: '🌿',
          earnedDate: '2024-12-15',
          category: 'cultural',
        },
        {
          id: '2',
          title: 'Vocabulary Master',
          description: 'Mastered 50 academic vocabulary words',
          icon: '📚',
          earnedDate: '2024-12-14',
          category: 'academic',
        },
        {
          id: '3',
          title: 'Team Player',
          description: 'Collaborated on 5 group projects',
          icon: '🤝',
          earnedDate: '2024-12-12',
          category: 'collaboration',
        },
      ];

      const mockActivity: RecentActivity[] = [
        {
          id: '1',
          activity: 'Completed: Academic Vocabulary Quiz',
          subject: 'English',
          timestamp: '2 hours ago',
          score: 92,
        },
        {
          id: '2',
          activity: 'Started: Narrative Structure in Pūrākau',
          subject: 'English',
          timestamp: '1 day ago',
        },
        {
          id: '3',
          activity: 'Completed: Cultural Context Exercise',
          subject: 'Social Studies',
          timestamp: '2 days ago',
          score: 88,
        },
      ];

      setTimeout(() => {
        setLearningModules(mockModules);
        setAchievements(mockAchievements);
        setRecentActivity(mockActivity);
        setLoading(false);
      }, 1000);
    };

    loadStudentData();
  }, [role, navigate]);

  const handleModuleClick = (moduleId: string) => {
    navigate(`/learning-module/${moduleId}`);
  };

  const handleQuickAccess = (subject: string) => {
    navigate(`/year8-${subject.toLowerCase()}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return '#2196F3';
      case 'cultural':
        return '#4CAF50';
      case 'collaboration':
        return '#FF9800';
      default:
        return '#666';
    }
  };

  if (loading) {
    return (
      <div className="student-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your learning dashboard, Ākonga...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Ākonga Dashboard</h1>
          <p className="welcome-message">
            Kia ora, {user?.displayName || user?.email}! Ready to learn?
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => navigate('/interactive-learning')}>
            Start Learning
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
          className={`tab ${activeTab === 'learning' ? 'active' : ''}`}
          onClick={() => setActiveTab('learning')}
        >
          Learning Modules
        </button>
        <button
          className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button
          className={`tab ${activeTab === 'cultural' ? 'active' : ''}`}
          onClick={() => setActiveTab('cultural')}
        >
          Cultural Journey
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Learning Progress</h3>
                <div className="stat-value">
                  {Math.round(
                    learningModules.reduce((acc, m) => acc + m.progress, 0) /
                      learningModules.length,
                  )}
                  %
                </div>
                <p>Overall completion</p>
              </div>
              <div className="stat-card">
                <h3>Modules Completed</h3>
                <div className="stat-value">
                  {learningModules.filter((m) => m.isCompleted).length}
                </div>
                <p>Out of {learningModules.length} modules</p>
              </div>
              <div className="stat-card">
                <h3>Achievements</h3>
                <div className="stat-value">{achievements.length}</div>
                <p>Badges earned</p>
              </div>
              <div className="stat-card">
                <h3>Cultural Elements</h3>
                <div className="stat-value">
                  {learningModules.reduce((acc, m) => acc + m.culturalElements.length, 0)}
                </div>
                <p>Te Reo & cultural learning</p>
              </div>
            </div>

            <div className="quick-access">
              <h3>Quick Access to Year 8 Content</h3>
              <div className="access-buttons">
                <button className="access-btn" onClick={() => handleQuickAccess('writing')}>
                  📝 Writing Units
                </button>
                <button className="access-btn" onClick={() => handleQuickAccess('reading')}>
                  📖 Reading Units
                </button>
                <button
                  className="access-btn"
                  onClick={() => handleQuickAccess('critical-literacy')}
                >
                  🧠 Critical Literacy
                </button>
                <button className="access-btn" onClick={() => navigate('/interactive-assessment')}>
                  📊 Assessments
                </button>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-content">
                      <div className="activity-title">{activity.activity}</div>
                      <div className="activity-meta">
                        <span className="activity-subject">{activity.subject}</span>
                        <span className="activity-time">{activity.timestamp}</span>
                        {activity.score && (
                          <span className="activity-score">Score: {activity.score}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="learning-tab">
            <h3>Learning Modules</h3>
            <div className="modules-grid">
              {learningModules.map((module) => (
                <div
                  key={module.id}
                  className="module-card"
                  onClick={() => handleModuleClick(module.id)}
                >
                  <div className="module-header">
                    <h4>{module.title}</h4>
                    <div className="module-badge">
                      <span
                        className="difficulty-badge"
                        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getDifficultyColor(module.difficulty) }}
                      >
                        {module.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="module-subject">{module.subject}</div>

                  <div className="module-progress">
                    <div className="progress-label">Progress</div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill progress-fill-dynamic"
                        style={{ '--progress-width': `${module.progress}%` } as React.CSSProperties}
                      ></div>
                    </div>
                    <div className="progress-text">{module.progress}%</div>
                  </div>

                  <div className="module-details">
                    <div className="detail-item">
                      <span className="detail-label">⏱️ Time:</span>
                      <span className="detail-value">{module.estimatedTime}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">🌿 Cultural:</span>
                      <span className="detail-value">
                        {module.culturalElements.length} elements
                      </span>
                    </div>
                  </div>

                  <div className="cultural-elements">
                    {module.culturalElements.map((element, index) => (
                      <span key={index} className="cultural-tag">
                        {element}
                      </span>
                    ))}
                  </div>

                  {module.isCompleted && <div className="completion-badge">✅ Completed</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-tab">
            <h3>Your Achievements</h3>
            <div className="achievements-grid">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                    <div className="achievement-meta">
                      <span
                        className="category-badge"
                        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getCategoryColor(achievement.category) }}
                      >
                        {achievement.category}
                      </span>
                      <span className="earned-date">Earned: {achievement.earnedDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cultural' && (
          <div className="cultural-tab">
            <h3>Your Cultural Learning Journey</h3>
            <div className="cultural-content">
              <div className="cultural-stats">
                <div className="cultural-stat">
                  <h4>Te Reo Māori Progress</h4>
                  <div className="stat-value">78%</div>
                  <p>Language learning journey</p>
                </div>
                <div className="cultural-stat">
                  <h4>Cultural Understanding</h4>
                  <div className="stat-value">85%</div>
                  <p>Māori and Pacific perspectives</p>
                </div>
                <div className="cultural-stat">
                  <h4>Community Connection</h4>
                  <div className="stat-value">72%</div>
                  <p>Local cultural engagement</p>
                </div>
              </div>

              <div className="cultural-resources">
                <h4>Continue Your Cultural Journey</h4>
                <div className="resource-links">
                  <button
                    className="resource-btn"
                    onClick={() => navigate('/cultural-learning-modules')}
                  >
                    🌿 Cultural Learning Modules
                  </button>
                  <button className="resource-btn" onClick={() => navigate('/te-reo-practice')}>
                    🗣️ Te Reo Practice
                  </button>
                  <button className="resource-btn" onClick={() => navigate('/community-stories')}>
                    📖 Community Stories
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
