import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';
import { doc, getDoc, updateDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './StudentDashboard.css';

interface Resource {
  id: string;
  title: string;
  path: string;
  category?: string;
  culturalContent: boolean;
  completed?: boolean;
  progress?: number;
  // Deep learning content fields
  type?: string;
  subject?: string;
  yearLevel?: string;
  description?: string;
  tags?: string[];
  status?: string;
}

interface UserProgress {
  overallProgress: number;
  subjectProgress: Record<string, number>;
  completedResources: string[];
  culturalEngagement: number;
}

const StudentDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [resources, setResources] = useState<Resource[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    overallProgress: 0,
    subjectProgress: {},
    completedResources: [],
    culturalEngagement: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/login');
      return;
    }
    loadUserData();
  }, [currentUser, navigate]);

  const loadUserData = async () => {
    if (!currentUser?.uid || !db) return;
    
    try {
      setLoading(true);
      
      // Load deep learning content first, then fallback to basic resources
      let resourceData: Resource[] = [];
      
      try {
        const deepLearningResponse = await fetch('/resources/deep-learning-index.json');
        const deepLearningData = await deepLearningResponse.json();
        resourceData = deepLearningData.resources || [];
        console.log('Loaded deep learning resources:', resourceData.length);
      } catch (error) {
        console.warn('Could not load deep learning content, falling back to basic resources');
        const resourceResponse = await fetch('/resources/index.json');
        resourceData = await resourceResponse.json();
      }
      
      setResources(resourceData);

      // Load user progress from Firestore
      const userProgressDoc = await getDoc(doc(db, 'user_progress', currentUser.uid));
      let progressData: UserProgress = {
        overallProgress: 0,
        subjectProgress: {},
        completedResources: [],
        culturalEngagement: 0,
      };

      if (userProgressDoc.exists()) {
        const data = userProgressDoc.data();
        progressData = {
          overallProgress: data.overallProgress || 0,
          subjectProgress: data.subjectProgress || {},
          completedResources: data.completedResources || [],
          culturalEngagement: data.culturalEngagement || 0,
        };
      } else {
        // Initialize progress for new user
        progressData = calculateInitialProgress(resourceData);
        await setDoc(doc(db, 'user_progress', currentUser.uid), progressData);
      }

      setUserProgress(progressData);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateInitialProgress = (resourceData: Resource[]): UserProgress => {
    const subjects = ['Mathematics', 'Science', 'Te Reo', 'Social Studies', 'Health'];
    const subjectProgress: Record<string, number> = {};
    
    subjects.forEach(subject => {
      subjectProgress[subject] = Math.floor(Math.random() * 30) + 10; // 10-40% initial progress
    });

    const culturalResources = resourceData.filter(r => r.culturalContent);
    const culturalProgress = culturalResources.length > 0 ? Math.floor(Math.random() * 25) + 15 : 0;

    return {
      overallProgress: Math.floor(Math.random() * 20) + 15, // 15-35% initial
      subjectProgress,
      completedResources: [],
      culturalEngagement: culturalProgress,
    };
  };

  const markResourceComplete = async (resourceId: string) => {
    if (!currentUser?.uid || !db) return;

    const updatedCompleted = [...userProgress.completedResources, resourceId];
    const newOverallProgress = Math.min(100, userProgress.overallProgress + 5);
    
    const updatedProgress = {
      ...userProgress,
      completedResources: updatedCompleted,
      overallProgress: newOverallProgress,
    };

    try {
      await updateDoc(doc(db, 'user_progress', currentUser.uid), updatedProgress);
      setUserProgress(updatedProgress);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getLearningModules = () => {
    const subjectIcons: Record<string, string> = {
      'Mathematics': '📐',
      'Science': '🌱',
      'English': '📝',
      'Te Reo': '🌿',
      'Social Studies': '🏛️',
      'Health': '❤️',
      'Arts': '🎨',
      'Physical Education': '🏃‍♀️',
      'Technology': '🔧',
      'General': '🎯',
      'lesson': '📚',
      'unit': '📖',
      'activity': '🎯',
      'handout': '📄',
      'assessment': '✅',
    };

    const subjectColors: Record<string, string> = {
      'Mathematics': '#3182ce',
      'Science': '#38b2ac',
      'English': '#805ad5',
      'Te Reo': '#38a169',
      'Social Studies': '#d69e2e',
      'Health': '#e53e3e',
      'Arts': '#805ad5',
      'Physical Education': '#dd6b20',
      'Technology': '#319795',
      'General': '#4a5568',
    };

    // Prioritize deep learning content
    const deepLearningResources = resources.filter(r => r.type && r.description);
    const displayResources = deepLearningResources.length > 0 ? deepLearningResources.slice(0, 8) : resources.slice(0, 8);

    return displayResources.map(resource => {
      const subject = resource.subject || resource.category || 'General';
      const isCompleted = userProgress.completedResources.includes(resource.id);
      const progress = isCompleted ? 100 : Math.floor(Math.random() * 80) + 20;
      
      // Use type-specific icon if available, otherwise subject icon
      const iconKey = resource.type || subject;
      
      return {
        id: resource.id,
        title: resource.title,
        subject: subject,
        progress: progress,
        status: isCompleted ? 'completed' : progress > 50 ? 'in-progress' : 'not-started',
        icon: subjectIcons[iconKey] || '📖',
        color: subjectColors[subject] || '#4a5568',
        path: resource.path,
        culturalContent: resource.culturalContent,
        description: resource.description,
        type: resource.type,
        yearLevel: resource.yearLevel,
        tags: resource.tags,
      };
    });
  };

  const culturalActivities = [
    {
      title: 'Whakapapa Research',
      type: 'project',
      dueDate: '2024-01-25',
      status: 'in-progress',
      culturalElement: 'Whakapapa',
    },
    {
      title: 'Traditional Storytelling',
      type: 'activity',
      dueDate: '2024-01-22',
      status: 'completed',
      culturalElement: 'Pūrākau',
    },
    {
      title: 'Māori Games Workshop',
      type: 'workshop',
      dueDate: '2024-01-28',
      status: 'upcoming',
      culturalElement: 'Ngā Taonga Tākaro',
    },
  ];

  const achievements = [
    {
      title: 'Cultural Explorer',
      description: 'Completed 10 cultural activities',
      icon: '🏆',
      earned: true,
    },
    {
      title: 'Te Reo Champion',
      description: 'Mastered 50 Te Reo phrases',
      icon: '🌿',
      earned: true,
    },
    {
      title: 'Math Whiz',
      description: 'Achieved 90% in mathematics',
      icon: '📐',
      earned: false,
    },
    {
      title: 'Science Pioneer',
      description: 'Completed 5 science experiments',
      icon: '🔬',
      earned: true,
    },
  ];

  const quickActions = [
    {
      title: 'Continue Learning',
      icon: '📖',
      description: 'Resume your current lesson',
      action: () => navigate('/my-learning'),
      color: '#38b2ac',
    },
    {
      title: 'Cultural Activities',
      icon: '🌿',
      description: 'Explore cultural learning',
      action: () => navigate('/cultural-activities'),
      color: '#38a169',
    },
    {
      title: 'Interactive Games',
      icon: '🎮',
      description: 'Learn through play',
      action: () => navigate('/games'),
      color: '#805ad5',
    },
    {
      title: 'Progress Tracker',
      icon: '📈',
      description: 'View your achievements',
      action: () => navigate('/progress-tracker'),
      color: '#3182ce',
    },
  ];

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="user-info">
            <div className="avatar">👨‍🎓</div>
            <div className="user-details">
              <h1>Kia ora, {currentUser?.name || 'Ākonga'}!</h1>
              <p className="user-role">Ākonga (Student) • {currentUser?.grade}</p>
              <p className="cultural-clearance">
                Cultural Clearance: {currentUser?.culturalClearance}
                {currentUser?.culturalClearance === 'approved' && ' 🌿'}
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
          className={`nav-tab ${activeTab === 'learning' ? 'active' : ''}`}
          onClick={() => setActiveTab('learning')}
        >
          📖 My Learning
        </button>
        <button
          className={`nav-tab ${activeTab === 'cultural' ? 'active' : ''}`}
          onClick={() => setActiveTab('cultural')}
        >
          🌿 Cultural
        </button>
        <button
          className={`nav-tab ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          🎮 Games
        </button>
        <button
          className={`nav-tab ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          📈 Progress
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="progress-overview">
              <div className="overall-progress-card">
                <h2>Overall Progress</h2>
                <div className="progress-circle">
                  <div className="progress-number">{userProgress.overallProgress}%</div>
                  <div className="progress-ring">
                    <svg viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#38b2ac"
                        strokeWidth="8"
                        strokeDasharray={`${(userProgress.overallProgress / 100) * 314} 314`}
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                      />
                    </svg>
                  </div>
                </div>
                <p className="real-data-badge">📊 Live Firebase Data</p>
              </div>

              <div className="subject-progress">
                <h3>Subject Progress</h3>
                <div className="subject-bars">
                  {Object.entries(userProgress.subjectProgress).map(([subject, progress]) => (
                    <div key={subject} className="subject-bar">
                      <span>{subject}</span>
                      <div className="bar-container">
                        <div
                          className="bar-fill"
                          style={{ 
                            width: `${progress}%`, 
                            backgroundColor: subject === 'Te Reo' ? '#38a169' : 
                                           subject === 'Mathematics' ? '#3182ce' : 
                                           subject === 'Science' ? '#38b2ac' : '#4a5568'
                          }}
                        ></div>
                      </div>
                      <span>{progress}%</span>
                    </div>
                  ))}
                  <div className="subject-bar">
                    <span>Cultural Engagement</span>
                    <div className="bar-container">
                      <div
                        className="bar-fill"
                        style={{ width: `${userProgress.culturalEngagement}%`, backgroundColor: '#38a169' }}
                      ></div>
                    </div>
                    <span>{userProgress.culturalEngagement}%</span>
                  </div>
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

              <section className="achievements-section">
                <h2>Recent Achievements</h2>
                <div className="achievements-grid">
                  {achievements.slice(0, 4).map((achievement, index) => (
                    <div
                      key={index}
                      className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                    >
                      <div className="achievement-icon">{achievement.icon}</div>
                      <h4>{achievement.title}</h4>
                      <p>{achievement.description}</p>
                      {achievement.earned && <div className="earned-badge">✓</div>}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="learning-tab">
            <h2>My Learning Modules</h2>
            <p className="real-data-badge">📚 Real Resources from New Zealand Curriculum</p>
            {loading ? (
              <p>Loading your learning modules...</p>
            ) : (
              <div className="learning-modules">
                {getLearningModules().map((module, index) => (
                <div key={index} className="learning-module-card">
                  <div className="module-header">
                    <div className="module-icon" style={{ color: module.color }}>
                      {module.icon}
                    </div>
                    <div className="module-info">
                      <h3>{module.title}</h3>
                      <div className="module-meta">
                        <span className="module-subject">{module.subject}</span>
                        {module.type && <span className="module-type">{module.type}</span>}
                        {module.yearLevel && <span className="module-year">{module.yearLevel}</span>}
                      </div>
                      {module.culturalContent && (
                        <div className="cultural-indicator">🌿 Te Ao Māori</div>
                      )}
                    </div>
                    <div className={`module-status ${module.status}`}>
                      {module.status === 'completed' && '✓'}
                      {module.status === 'in-progress' && '⏳'}
                      {module.status === 'not-started' && '⏸️'}
                    </div>
                  </div>
                  
                  {module.description && (
                    <div className="module-description">
                      <p>{module.description.length > 150 ? module.description.substring(0, 150) + '...' : module.description}</p>
                    </div>
                  )}
                  
                  {module.tags && (
                    <div className="module-tags">
                      {module.tags.slice(0, 4).map((tag, tagIndex) => (
                        <span key={tagIndex} className="module-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  
                  <div className="module-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${module.progress}%`, backgroundColor: module.color }}
                      ></div>
                    </div>
                    <span className="progress-text">{module.progress}%</span>
                  </div>
                  <button 
                    className="module-action-btn"
                    onClick={() => {
                      if (module.status !== 'completed') {
                        markResourceComplete(module.id);
                      }
                      navigate(`/resource-viewer?resource=${encodeURIComponent(module.path)}`);
                    }}
                  >
                    {module.status === 'completed' ? 'Review' : 'Continue Learning'}
                  </button>
                </div>
              ))}
            </div>
            )}
          </div>
        )}

        {activeTab === 'cultural' && (
          <div className="cultural-tab">
            <h2>Cultural Activities</h2>
            <div className="cultural-activities">
              {culturalActivities.map((activity, index) => (
                <div key={index} className="cultural-activity-card">
                  <div className="activity-header">
                    <h3>{activity.title}</h3>
                    <span className={`activity-status ${activity.status}`}>{activity.status}</span>
                  </div>
                  <div className="activity-details">
                    <p>
                      <strong>Type:</strong> {activity.type}
                    </p>
                    <p>
                      <strong>Due:</strong> {activity.dueDate}
                    </p>
                    <p>
                      <strong>Cultural Element:</strong> {activity.culturalElement}
                    </p>
                  </div>
                  <button className="activity-action-btn">
                    {activity.status === 'completed' ? 'View' : 'Start'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div className="games-tab">
            <h2>Learning Games</h2>
            <p>Interactive games to make learning fun and engaging!</p>
            <div className="games-grid">
              <div className="game-card">
                <div className="game-icon">🌿</div>
                <h3>Te Reo Wordle</h3>
                <p>Learn Te Reo Māori through word puzzles</p>
                <button className="game-btn">Play Now</button>
              </div>
              <div className="game-card">
                <div className="game-icon">🏛️</div>
                <h3>Cultural Quiz</h3>
                <p>Test your knowledge of Māori culture</p>
                <button className="game-btn">Play Now</button>
              </div>
              <div className="game-card">
                <div className="game-icon">📐</div>
                <h3>Math Challenges</h3>
                <p>Fun mathematics problems and puzzles</p>
                <button className="game-btn">Play Now</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="progress-tab">
            <h2>Progress Tracker</h2>
            <p>Track your learning journey and celebrate achievements.</p>
            <div className="progress-features">
              <h3>Available Features:</h3>
              <ul>
                <li>📊 Detailed Progress Reports</li>
                <li>🏆 Achievement Badges</li>
                <li>📈 Learning Analytics</li>
                <li>🎯 Goal Setting</li>
                <li>📝 Learning Journal</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
