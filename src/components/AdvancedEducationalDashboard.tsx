import React, { useEffect, useState } from 'react';
import './AdvancedEducationalDashboard.css';

interface Student {
  id: string;
  name: string;
  year: number;
  subjects: string[];
  progress: number;
  culturalEngagement: number;
  lastActivity: Date;
  notifications: number;
  achievements: string[];
}

interface Lesson {
  id: string;
  title: string;
  subject: string;
  year: number;
  duration: number;
  culturalElements: string[];
  status: 'draft' | 'published' | 'archived';
  views: number;
  rating: number;
  completionRate: number;
  culturalImpact: number;
}

interface Analytics {
  totalStudents: number;
  activeUsers: number;
  lessonsCompleted: number;
  culturalEngagement: number;
  averageProgress: number;
  topSubjects: string[];
  culturalInsights: {
    totalCulturalActivities: number;
    culturalAchievements: number;
    culturalMentors: number;
    culturalEvents: number;
  };
}

interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'cultural' | 'progress';
  message: string;
  timestamp: Date;
  read: boolean;
}

const AdvancedEducationalDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalStudents: 0,
    activeUsers: 0,
    lessonsCompleted: 0,
    culturalEngagement: 0,
    averageProgress: 0,
    topSubjects: [],
    culturalInsights: {
      totalCulturalActivities: 0,
      culturalAchievements: 0,
      culturalMentors: 0,
      culturalEvents: 0,
    },
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedView, setSelectedView] = useState<
    'overview' | 'students' | 'lessons' | 'analytics' | 'cultural' | 'notifications'
  >('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState<number | 'all'>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Aroha Smith',
        year: 8,
        subjects: ['Te Reo Māori', 'Mathematics', 'Science'],
        progress: 85,
        culturalEngagement: 92,
        lastActivity: new Date(),
        notifications: 3,
        achievements: ['Cultural Leader', 'Te Reo Excellence', 'Kaitiaki Award'],
      },
      {
        id: '2',
        name: 'Kai Johnson',
        year: 9,
        subjects: ['Te Reo Māori', 'English', 'Social Studies'],
        progress: 78,
        culturalEngagement: 88,
        lastActivity: new Date(Date.now() - 86400000),
        notifications: 1,
        achievements: ['Cultural Explorer', 'Whakapapa Scholar'],
      },
      {
        id: '3',
        name: 'Mana Williams',
        year: 10,
        subjects: ['Te Reo Māori', 'Mathematics', 'Art'],
        progress: 91,
        culturalEngagement: 95,
        lastActivity: new Date(),
        notifications: 5,
        achievements: ['Cultural Ambassador', 'Tikanga Master', 'Rongoā Expert'],
      },
      {
        id: '4',
        name: 'Tia Brown',
        year: 7,
        subjects: ['Te Reo Māori', 'Mathematics', 'Science'],
        progress: 72,
        culturalEngagement: 85,
        lastActivity: new Date(Date.now() - 172800000),
        notifications: 2,
        achievements: ['Cultural Beginner'],
      },
    ];

    const mockLessons: Lesson[] = [
      {
        id: '1',
        title: 'Te Ao Māori: Understanding Our World',
        subject: 'Te Reo Māori',
        year: 8,
        duration: 45,
        culturalElements: ['Tikanga', 'Whakapapa', 'Kaitiakitanga'],
        status: 'published',
        views: 1250,
        rating: 4.8,
        completionRate: 92,
        culturalImpact: 95,
      },
      {
        id: '2',
        title: 'Mathematical Patterns in Māori Art',
        subject: 'Mathematics',
        year: 9,
        duration: 60,
        culturalElements: ['Kowhaiwhai', 'Geometry', 'Symmetry'],
        status: 'published',
        views: 890,
        rating: 4.6,
        completionRate: 88,
        culturalImpact: 87,
      },
      {
        id: '3',
        title: 'Traditional Māori Medicine and Science',
        subject: 'Science',
        year: 10,
        duration: 75,
        culturalElements: ['Rongoā', 'Botany', 'Chemistry'],
        status: 'published',
        views: 1100,
        rating: 4.9,
        completionRate: 95,
        culturalImpact: 98,
      },
      {
        id: '4',
        title: 'Whakapapa: Our Family Stories',
        subject: 'Social Studies',
        year: 7,
        duration: 50,
        culturalElements: ['Whakapapa', 'Genealogy', 'History'],
        status: 'published',
        views: 750,
        rating: 4.7,
        completionRate: 85,
        culturalImpact: 90,
      },
    ];

    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'achievement',
        message: 'Aroha Smith earned the "Cultural Leader" achievement!',
        timestamp: new Date(Date.now() - 300000),
        read: false,
      },
      {
        id: '2',
        type: 'cultural',
        message: 'New cultural activity available: "Traditional Weaving Workshop"',
        timestamp: new Date(Date.now() - 900000),
        read: false,
      },
      {
        id: '3',
        type: 'progress',
        message: 'Kai Johnson completed 5 lessons this week',
        timestamp: new Date(Date.now() - 1800000),
        read: true,
      },
      {
        id: '4',
        type: 'reminder',
        message: 'Cultural assessment due tomorrow for Year 8 students',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
      },
    ];

    setStudents(mockStudents);
    setLessons(mockLessons);
    setNotifications(mockNotifications);
    setAnalytics({
      totalStudents: mockStudents.length,
      activeUsers: mockStudents.filter((s) => s.lastActivity > new Date(Date.now() - 86400000))
        .length,
      lessonsCompleted: 156,
      culturalEngagement: 89,
      averageProgress: 85,
      topSubjects: ['Te Reo Māori', 'Mathematics', 'Science'],
      culturalInsights: {
        totalCulturalActivities: 24,
        culturalAchievements: 156,
        culturalMentors: 8,
        culturalEvents: 12,
      },
    });
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === 'all' || student.year === filterYear;
    const matchesSubject = filterSubject === 'all' || student.subjects.includes(filterSubject);
    return matchesSearch && matchesYear && matchesSubject;
  });

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === 'all' || lesson.year === filterYear;
    const matchesSubject = filterSubject === 'all' || lesson.subject === filterSubject;
    return matchesSearch && matchesYear && matchesSubject;
  });

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return '#10b981';
    if (progress >= 80) return '#3b82f6';
    if (progress >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getCulturalEngagementColor = (engagement: number) => {
    if (engagement >= 90) return '#8b5cf6';
    if (engagement >= 80) return '#06b6d4';
    if (engagement >= 70) return '#f97316';
    return '#dc2626';
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement': return '🏆';
      case 'cultural': return '🌿';
      case 'progress': return '📈';
      case 'reminder': return '⏰';
      default: return '📢';
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div className="advanced-educational-dashboard">
      <div className="dashboard-header">
        <div className="header-top">
          <div className="header-title">
            <h1>🌟 Te Kura o TeAoMarama - Advanced Educational Dashboard</h1>
            <p>Comprehensive educational management and cultural integration platform</p>
          </div>
          <div className="header-actions">
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔 Notifications
              {unreadNotifications > 0 && (
                <span className="notification-badge">{unreadNotifications}</span>
              )}
            </button>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{analytics.totalStudents}</span>
            <span className="stat-label">Total Students</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{analytics.activeUsers}</span>
            <span className="stat-label">Active Users</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{analytics.lessonsCompleted}</span>
            <span className="stat-label">Lessons Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{analytics.culturalEngagement}%</span>
            <span className="stat-label">Cultural Engagement</span>
          </div>
        </div>
      </div>

      {showNotifications && (
        <div className="notifications-panel">
          <div className="notifications-header">
            <h3>Notifications ({unreadNotifications} unread)</h3>
            <button onClick={() => setShowNotifications(false)}>✕</button>
          </div>
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <span className="notification-icon">{getNotificationIcon(notification.type)}</span>
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {notification.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-controls">
        <div className="view-selector">
          <button
            className={selectedView === 'overview' ? 'active' : ''}
            onClick={() => setSelectedView('overview')}
          >
            Overview
          </button>
          <button
            className={selectedView === 'students' ? 'active' : ''}
            onClick={() => setSelectedView('students')}
          >
            Students
          </button>
          <button
            className={selectedView === 'lessons' ? 'active' : ''}
            onClick={() => setSelectedView('lessons')}
          >
            Lessons
          </button>
          <button
            className={selectedView === 'analytics' ? 'active' : ''}
            onClick={() => setSelectedView('analytics')}
          >
            Analytics
          </button>
          <button
            className={selectedView === 'cultural' ? 'active' : ''}
            onClick={() => setSelectedView('cultural')}
          >
            Cultural Insights
          </button>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search students, lessons, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterYear}
            onChange={(e) =>
              setFilterYear(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="filter-select"
          >
            <option value="all">All Years</option>
            <option value={7}>Year 7</option>
            <option value={8}>Year 8</option>
            <option value={9}>Year 9</option>
            <option value={10}>Year 10</option>
          </select>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Subjects</option>
            <option value="Te Reo Māori">Te Reo Māori</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Social Studies">Social Studies</option>
          </select>
        </div>
      </div>

      <div className="dashboard-content">
        {selectedView === 'overview' && (
          <div className="overview-grid">
            <div className="overview-card">
              <h3>Student Progress Overview</h3>
              <div className="progress-summary">
                <div className="progress-item">
                  <span>Average Progress</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${analytics.averageProgress}%`,
                        backgroundColor: getProgressColor(analytics.averageProgress),
                      }}
                    ></div>
                  </div>
                  <span>{analytics.averageProgress}%</span>
                </div>
                <div className="progress-item">
                  <span>Cultural Engagement</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${analytics.culturalEngagement}%`,
                        backgroundColor: getCulturalEngagementColor(analytics.culturalEngagement),
                      }}
                    ></div>
                  </div>
                  <span>{analytics.culturalEngagement}%</span>
                </div>
              </div>
            </div>

            <div className="overview-card">
              <h3>Top Performing Subjects</h3>
              <div className="subject-list">
                {analytics.topSubjects.map((subject, index) => (
                  <div key={subject} className="subject-item">
                    <span className="subject-rank">#{index + 1}</span>
                    <span className="subject-name">{subject}</span>
                    <span className="subject-score">95%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overview-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-time">2 min ago</span>
                  <span className="activity-text">
                    Aroha Smith completed "Te Ao Māori: Understanding Our World"
                  </span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">15 min ago</span>
                  <span className="activity-text">
                    Kai Johnson started "Mathematical Patterns in Māori Art"
                  </span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">1 hour ago</span>
                  <span className="activity-text">
                    Mana Williams achieved 95% in Cultural Engagement
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'students' && (
          <div className="students-grid">
            {filteredStudents.map((student) => (
              <div key={student.id} className="student-card">
                <div className="student-header">
                  <h3>{student.name}</h3>
                  <div className="student-meta">
                    <span className="student-year">Year {student.year}</span>
                    {student.notifications > 0 && (
                      <span className="notification-indicator">{student.notifications}</span>
                    )}
                  </div>
                </div>
                <div className="student-subjects">
                  {student.subjects.map((subject) => (
                    <span key={subject} className="subject-tag">
                      {subject}
                    </span>
                  ))}
                </div>
                <div className="student-progress">
                  <div className="progress-item">
                    <span>Progress</span>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${student.progress}%`,
                          backgroundColor: getProgressColor(student.progress),
                        }}
                      ></div>
                    </div>
                    <span>{student.progress}%</span>
                  </div>
                  <div className="progress-item">
                    <span>Cultural Engagement</span>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${student.culturalEngagement}%`,
                          backgroundColor: getCulturalEngagementColor(student.culturalEngagement),
                        }}
                      ></div>
                    </div>
                    <span>{student.culturalEngagement}%</span>
                  </div>
                </div>
                <div className="student-achievements">
                  <h4>Achievements</h4>
                  <div className="achievements-list">
                    {student.achievements.map((achievement) => (
                      <span key={achievement} className="achievement-tag">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="student-activity">
                  <span>Last active: {student.lastActivity.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedView === 'lessons' && (
          <div className="lessons-grid">
            {filteredLessons.map((lesson) => (
              <div key={lesson.id} className="lesson-card">
                <div className="lesson-header">
                  <h3>{lesson.title}</h3>
                  <span className={`lesson-status ${lesson.status}`}>{lesson.status}</span>
                </div>
                <div className="lesson-meta">
                  <span className="lesson-subject">{lesson.subject}</span>
                  <span className="lesson-year">Year {lesson.year}</span>
                  <span className="lesson-duration">{lesson.duration} min</span>
                </div>
                <div className="lesson-cultural-elements">
                  {lesson.culturalElements.map((element) => (
                    <span key={element} className="cultural-tag">
                      {element}
                    </span>
                  ))}
                </div>
                <div className="lesson-stats">
                  <div className="stat">
                    <span className="stat-label">Views</span>
                    <span className="stat-value">{lesson.views}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Rating</span>
                    <span className="stat-value">{lesson.rating}/5</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Completion</span>
                    <span className="stat-value">{lesson.completionRate}%</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Cultural Impact</span>
                    <span className="stat-value">{lesson.culturalImpact}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedView === 'cultural' && (
          <div className="cultural-insights-grid">
            <div className="cultural-card">
              <h3>🌿 Cultural Activities</h3>
              <div className="cultural-stats">
                <div className="cultural-stat">
                  <span className="cultural-number">{analytics.culturalInsights.totalCulturalActivities}</span>
                  <span className="cultural-label">Total Activities</span>
                </div>
                <div className="cultural-stat">
                  <span className="cultural-number">{analytics.culturalInsights.culturalAchievements}</span>
                  <span className="cultural-label">Achievements</span>
                </div>
                <div className="cultural-stat">
                  <span className="cultural-number">{analytics.culturalInsights.culturalMentors}</span>
                  <span className="cultural-label">Mentors</span>
                </div>
                <div className="cultural-stat">
                  <span className="cultural-number">{analytics.culturalInsights.culturalEvents}</span>
                  <span className="cultural-label">Events</span>
                </div>
              </div>
            </div>

            <div className="cultural-card">
              <h3>🏆 Cultural Achievements</h3>
              <div className="achievements-showcase">
                <div className="achievement-item">
                  <span className="achievement-icon">🌿</span>
                  <div className="achievement-info">
                    <h4>Kaitiaki Award</h4>
                    <p>Environmental stewardship excellence</p>
                  </div>
                </div>
                <div className="achievement-item">
                  <span className="achievement-icon">📚</span>
                  <div className="achievement-info">
                    <h4>Te Reo Master</h4>
                    <p>Advanced language proficiency</p>
                  </div>
                </div>
                <div className="achievement-item">
                  <span className="achievement-icon">🎨</span>
                  <div className="achievement-info">
                    <h4>Cultural Artist</h4>
                    <p>Traditional arts and crafts mastery</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="cultural-card">
              <h3>📈 Cultural Engagement Trends</h3>
              <div className="cultural-trends">
                <div className="trend-item">
                  <span>Te Reo Māori</span>
                  <div className="trend-bar">
                    <div className="trend-fill" style={{ width: '95%' }}></div>
                  </div>
                  <span>95%</span>
                </div>
                <div className="trend-item">
                  <span>Traditional Arts</span>
                  <div className="trend-bar">
                    <div className="trend-fill" style={{ width: '88%' }}></div>
                  </div>
                  <span>88%</span>
                </div>
                <div className="trend-item">
                  <span>Cultural History</span>
                  <div className="trend-bar">
                    <div className="trend-fill" style={{ width: '92%' }}></div>
                  </div>
                  <span>92%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'analytics' && (
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>Student Distribution by Year</h3>
              <div className="chart-placeholder">
                <div className="chart-bar" style={{ height: '60%' }}>
                  <span>Year 7</span>
                  <span>25%</span>
                </div>
                <div className="chart-bar" style={{ height: '80%' }}>
                  <span>Year 8</span>
                  <span>35%</span>
                </div>
                <div className="chart-bar" style={{ height: '70%' }}>
                  <span>Year 9</span>
                  <span>25%</span>
                </div>
                <div className="chart-bar" style={{ height: '50%' }}>
                  <span>Year 10</span>
                  <span>15%</span>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <h3>Subject Performance</h3>
              <div className="performance-list">
                <div className="performance-item">
                  <span>Te Reo Māori</span>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{ width: '95%' }}></div>
                  </div>
                  <span>95%</span>
                </div>
                <div className="performance-item">
                  <span>Mathematics</span>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{ width: '88%' }}></div>
                  </div>
                  <span>88%</span>
                </div>
                <div className="performance-item">
                  <span>Science</span>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{ width: '92%' }}></div>
                  </div>
                  <span>92%</span>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <h3>Cultural Engagement Trends</h3>
              <div className="trend-chart">
                <div className="trend-line">
                  <div className="trend-point" style={{ left: '10%', top: '20%' }}></div>
                  <div className="trend-point" style={{ left: '30%', top: '35%' }}></div>
                  <div className="trend-point" style={{ left: '50%', top: '45%' }}></div>
                  <div className="trend-point" style={{ left: '70%', top: '60%' }}></div>
                  <div className="trend-point" style={{ left: '90%', top: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedEducationalDashboard;
