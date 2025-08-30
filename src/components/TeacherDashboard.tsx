import React, { useEffect, useState } from 'react';
import './TeacherDashboard.css';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  culturalBackground: string;
  avatar: string;
  classes: Array<{
    id: string;
    name: string;
    yearLevel: number;
    studentCount: number;
    averageProgress: number;
    culturalEngagement: number;
    nextLesson: string;
    culturalElements: string[];
  }>;
  students: Array<{
    id: string;
    name: string;
    yearLevel: number;
    culturalBackground: string;
    progress: number;
    culturalEngagement: number;
    recentActivity: string;
    needsAttention: boolean;
  }>;
  assessments: Array<{
    id: string;
    title: string;
    type: 'formative' | 'summative' | 'cultural' | 'project';
    dueDate: string;
    classId: string;
    status: 'draft' | 'published' | 'graded';
    culturalElements: string[];
  }>;
  culturalInsights: {
    teReoIntegration: number;
    tikangaCompliance: number;
    culturalContent: number;
    communityEngagement: number;
    studentCulturalGrowth: number;
  };
  notifications: Array<{
    id: string;
    type: 'student' | 'assessment' | 'cultural' | 'system';
    message: string;
    timestamp: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

const TeacherDashboard: React.FC = () => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [selectedView, setSelectedView] = useState<
    'overview' | 'classes' | 'students' | 'assessments' | 'cultural' | 'notifications'
  >('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading teacher data
    const loadTeacherData = () => {
      const mockTeacher: Teacher = {
        id: 'teacher-001',
        name: 'Whaea Sarah Kāretu',
        subject: 'English & Te Reo Māori',
        culturalBackground: 'Māori, Pākehā',
        avatar: '👩‍🏫',
        classes: [
          {
            id: 'class-001',
            name: 'Year 8A - English & Cultural Studies',
            yearLevel: 8,
            studentCount: 24,
            averageProgress: 87,
            culturalEngagement: 92,
            nextLesson: 'Whakapapa: Māori Genealogy',
            culturalElements: ['Whakapapa', 'Māori Identity', 'Cultural Storytelling'],
          },
          {
            id: 'class-002',
            name: 'Year 8B - Reading & Writing',
            yearLevel: 8,
            studentCount: 22,
            averageProgress: 83,
            culturalEngagement: 89,
            nextLesson: 'Contemporary NZ Literature',
            culturalElements: ['NZ Identity', 'Cultural Diversity', 'Modern Themes'],
          },
          {
            id: 'class-003',
            name: 'Year 8C - Academic Vocabulary',
            yearLevel: 8,
            studentCount: 26,
            averageProgress: 91,
            culturalEngagement: 85,
            nextLesson: 'Subject-Specific Terms',
            culturalElements: ['Academic Language', 'Cultural Context', 'Subject Integration'],
          },
        ],
        students: [
          {
            id: 'student-001',
            name: 'Aria Tāne',
            yearLevel: 8,
            culturalBackground: 'Māori, Pacific',
            progress: 92,
            culturalEngagement: 94,
            recentActivity: 'Completed Whakapapa research project',
            needsAttention: false,
          },
          {
            id: 'student-002',
            name: 'Kai Smith',
            yearLevel: 8,
            culturalBackground: 'Pākehā',
            progress: 78,
            culturalEngagement: 82,
            recentActivity: 'Submitted cultural story assignment',
            needsAttention: true,
          },
          {
            id: 'student-003',
            name: 'Hana Patel',
            yearLevel: 8,
            culturalBackground: 'Indian, NZ',
            progress: 95,
            culturalEngagement: 88,
            recentActivity: 'Led cultural discussion group',
            needsAttention: false,
          },
          {
            id: 'student-004',
            name: 'Tama Williams',
            yearLevel: 8,
            culturalBackground: 'Māori',
            progress: 85,
            culturalEngagement: 96,
            recentActivity: 'Presented traditional story',
            needsAttention: false,
          },
        ],
        assessments: [
          {
            id: 'assess-001',
            title: 'Whakapapa Research Project',
            type: 'project',
            dueDate: '2024-01-25',
            classId: 'class-001',
            status: 'published',
            culturalElements: ['Whakapapa', 'Māori Identity', 'Research Skills'],
          },
          {
            id: 'assess-002',
            title: 'Critical Literacy Quiz',
            type: 'formative',
            dueDate: '2024-01-22',
            classId: 'class-002',
            status: 'draft',
            culturalElements: ['Critical Thinking', 'Cultural Analysis'],
          },
          {
            id: 'assess-003',
            title: 'Cultural Story Writing',
            type: 'cultural',
            dueDate: '2024-01-28',
            classId: 'class-001',
            status: 'published',
            culturalElements: ['Creative Writing', 'Cultural Expression'],
          },
          {
            id: 'assess-004',
            title: 'Academic Vocabulary Test',
            type: 'summative',
            dueDate: '2024-02-01',
            classId: 'class-003',
            status: 'graded',
            culturalElements: ['Academic Language', 'Subject Integration'],
          },
        ],
        culturalInsights: {
          teReoIntegration: 88,
          tikangaCompliance: 92,
          culturalContent: 85,
          communityEngagement: 90,
          studentCulturalGrowth: 87,
        },
        notifications: [
          {
            id: 'notif-001',
            type: 'student',
            message: 'Kai Smith needs support with cultural content integration',
            timestamp: '2024-01-20 14:30',
            priority: 'high',
          },
          {
            id: 'notif-002',
            type: 'assessment',
            message: 'Whakapapa Research Project due in 5 days',
            timestamp: '2024-01-20 12:15',
            priority: 'medium',
          },
          {
            id: 'notif-003',
            type: 'cultural',
            message: 'Cultural festival planning meeting tomorrow',
            timestamp: '2024-01-20 10:45',
            priority: 'medium',
          },
          {
            id: 'notif-004',
            type: 'system',
            message: 'New cultural resources available in library',
            timestamp: '2024-01-20 09:20',
            priority: 'low',
          },
        ],
      };

      setTeacher(mockTeacher);
      setIsLoading(false);
    };

    loadTeacherData();
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return '#10b981';
    if (progress >= 80) return '#f59e0b';
    if (progress >= 70) return '#ef4444';
    return '#6b7280';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'student':
        return '👨‍🎓';
      case 'assessment':
        return '📝';
      case 'cultural':
        return '🌿';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  const getAssessmentStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return '#6b7280';
      case 'published':
        return '#10b981';
      case 'graded':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  if (isLoading) {
    return (
      <div className="teacher-dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your teaching dashboard...</p>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="teacher-dashboard-error">
        <h2>Error Loading Dashboard</h2>
        <p>Unable to load your teacher information. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="teacher-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="teacher-info">
          <div className="teacher-avatar">{teacher.avatar}</div>
          <div className="teacher-details">
            <h1>Kia ora, {teacher.name}!</h1>
            <p>
              {teacher.subject} • {teacher.culturalBackground}
            </p>
            <div className="teacher-stats">
              <div className="stat-item">
                <span className="stat-number">{teacher.classes.length}</span>
                <span className="stat-label">Classes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{teacher.students.length}</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{teacher.assessments.length}</span>
                <span className="stat-label">Assessments</span>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-actions">
          <button className="action-btn primary">Create Assessment</button>
          <button className="action-btn secondary">Plan Lesson</button>
          <button className="action-btn secondary">View Resources</button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${selectedView === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedView('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab-btn ${selectedView === 'classes' ? 'active' : ''}`}
          onClick={() => setSelectedView('classes')}
        >
          🏫 My Classes
        </button>
        <button
          className={`tab-btn ${selectedView === 'students' ? 'active' : ''}`}
          onClick={() => setSelectedView('students')}
        >
          👨‍🎓 Students
        </button>
        <button
          className={`tab-btn ${selectedView === 'assessments' ? 'active' : ''}`}
          onClick={() => setSelectedView('assessments')}
        >
          📝 Assessments
        </button>
        <button
          className={`tab-btn ${selectedView === 'cultural' ? 'active' : ''}`}
          onClick={() => setSelectedView('cultural')}
        >
          🌿 Cultural Insights
        </button>
        <button
          className={`tab-btn ${selectedView === 'notifications' ? 'active' : ''}`}
          onClick={() => setSelectedView('notifications')}
        >
          🔔 Notifications
        </button>
      </div>

      {/* Content Sections */}
      <div className="dashboard-content">
        {selectedView === 'overview' && (
          <div className="overview-section">
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Class Performance</h3>
                <div className="performance-metrics">
                  {teacher.classes.map((cls) => (
                    <div key={cls.id} className="class-metric">
                      <div className="class-info">
                        <h4>{cls.name}</h4>
                        <p>{cls.studentCount} students</p>
                      </div>
                      <div className="class-progress">
                        <div className="progress-item">
                          <span>Progress: {cls.averageProgress}%</span>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${cls.averageProgress}%`,
                                backgroundColor: getProgressColor(cls.averageProgress),
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="progress-item">
                          <span>Cultural: {cls.culturalEngagement}%</span>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${cls.culturalEngagement}%`,
                                backgroundColor: getProgressColor(cls.culturalEngagement),
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overview-card">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  <button className="quick-action-btn">
                    <span className="action-icon">📝</span>
                    Create Assessment
                  </button>
                  <button className="quick-action-btn">
                    <span className="action-icon">📚</span>
                    Plan Lesson
                  </button>
                  <button className="quick-action-btn">
                    <span className="action-icon">👨‍🎓</span>
                    Monitor Students
                  </button>
                  <button className="quick-action-btn">
                    <span className="action-icon">🌿</span>
                    Cultural Resources
                  </button>
                  <button className="quick-action-btn">
                    <span className="action-icon">📊</span>
                    View Analytics
                  </button>
                  <button className="quick-action-btn">
                    <span className="action-icon">👥</span>
                    Collaborate
                  </button>
                </div>
              </div>

              <div className="overview-card">
                <h3>Recent Activity</h3>
                <div className="recent-activity">
                  {teacher.students.slice(0, 5).map((student) => (
                    <div key={student.id} className="activity-item">
                      <div className="activity-avatar">👨‍🎓</div>
                      <div className="activity-content">
                        <p>
                          <strong>{student.name}</strong>
                        </p>
                        <p className="activity-text">{student.recentActivity}</p>
                        <span className="activity-time">2 hours ago</span>
                      </div>
                      {student.needsAttention && <div className="attention-badge">⚠️</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'classes' && (
          <div className="classes-section">
            <h2>My Classes</h2>
            <div className="classes-grid">
              {teacher.classes.map((cls) => (
                <div key={cls.id} className="class-card">
                  <div className="class-header">
                    <h3>{cls.name}</h3>
                    <span className="class-year">Year {cls.yearLevel}</span>
                  </div>
                  <div className="class-stats">
                    <div className="stat">
                      <span className="stat-number">{cls.studentCount}</span>
                      <span className="stat-label">Students</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{cls.averageProgress}%</span>
                      <span className="stat-label">Progress</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{cls.culturalEngagement}%</span>
                      <span className="stat-label">Cultural</span>
                    </div>
                  </div>
                  <div className="class-details">
                    <p>
                      <strong>Next Lesson:</strong> {cls.nextLesson}
                    </p>
                    <div className="cultural-elements">
                      <strong>Cultural Elements:</strong>
                      <div className="element-tags">
                        {cls.culturalElements.map((element, index) => (
                          <span key={index} className="element-tag">
                            {element}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="class-actions">
                    <button className="class-btn primary">View Class</button>
                    <button className="class-btn secondary">Plan Lesson</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'students' && (
          <div className="students-section">
            <h2>Student Management</h2>
            <div className="students-grid">
              {teacher.students.map((student) => (
                <div
                  key={student.id}
                  className={`student-card ${student.needsAttention ? 'needs-attention' : ''}`}
                >
                  <div className="student-header">
                    <div className="student-avatar">👨‍🎓</div>
                    <div className="student-info">
                      <h3>{student.name}</h3>
                      <p>
                        Year {student.yearLevel} • {student.culturalBackground}
                      </p>
                    </div>
                    {student.needsAttention && <div className="attention-indicator">⚠️</div>}
                  </div>
                  <div className="student-progress">
                    <div className="progress-item">
                      <span>Academic Progress</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${student.progress}%`,
                            backgroundColor: getProgressColor(student.progress),
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">{student.progress}%</span>
                    </div>
                    <div className="progress-item">
                      <span>Cultural Engagement</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${student.culturalEngagement}%`,
                            backgroundColor: getProgressColor(student.culturalEngagement),
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">{student.culturalEngagement}%</span>
                    </div>
                  </div>
                  <div className="student-activity">
                    <p>
                      <strong>Recent Activity:</strong> {student.recentActivity}
                    </p>
                  </div>
                  <div className="student-actions">
                    <button className="student-btn">View Profile</button>
                    <button className="student-btn">Send Message</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'assessments' && (
          <div className="assessments-section">
            <h2>Assessment Management</h2>
            <div className="assessments-grid">
              {teacher.assessments.map((assessment) => (
                <div key={assessment.id} className="assessment-card">
                  <div className="assessment-header">
                    <h3>{assessment.title}</h3>
                    <span
                      className={`status-badge ${assessment.status}`}
                      style={{ backgroundColor: getAssessmentStatusColor(assessment.status) }}
                    >
                      {assessment.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="assessment-details">
                    <p>
                      <strong>Type:</strong> {assessment.type}
                    </p>
                    <p>
                      <strong>Due Date:</strong> {assessment.dueDate}
                    </p>
                    <p>
                      <strong>Class:</strong>{' '}
                      {teacher.classes.find((c) => c.id === assessment.classId)?.name}
                    </p>
                  </div>
                  <div className="cultural-elements">
                    <strong>Cultural Elements:</strong>
                    <div className="element-tags">
                      {assessment.culturalElements.map((element, index) => (
                        <span key={index} className="element-tag">
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="assessment-actions">
                    <button className="assessment-btn primary">Edit Assessment</button>
                    <button className="assessment-btn secondary">View Submissions</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'cultural' && (
          <div className="cultural-section">
            <h2>Cultural Insights</h2>
            <div className="cultural-metrics">
              <div className="cultural-card">
                <h3>Te Reo Integration</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${teacher.culturalInsights.teReoIntegration}%`,
                        backgroundColor: getProgressColor(
                          teacher.culturalInsights.teReoIntegration,
                        ),
                      }}
                    ></div>
                  </div>
                  <span>{teacher.culturalInsights.teReoIntegration}%</span>
                </div>
              </div>
              <div className="cultural-card">
                <h3>Tikanga Compliance</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${teacher.culturalInsights.tikangaCompliance}%`,
                        backgroundColor: getProgressColor(
                          teacher.culturalInsights.tikangaCompliance,
                        ),
                      }}
                    ></div>
                  </div>
                  <span>{teacher.culturalInsights.tikangaCompliance}%</span>
                </div>
              </div>
              <div className="cultural-card">
                <h3>Cultural Content</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${teacher.culturalInsights.culturalContent}%`,
                        backgroundColor: getProgressColor(teacher.culturalInsights.culturalContent),
                      }}
                    ></div>
                  </div>
                  <span>{teacher.culturalInsights.culturalContent}%</span>
                </div>
              </div>
              <div className="cultural-card">
                <h3>Community Engagement</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${teacher.culturalInsights.communityEngagement}%`,
                        backgroundColor: getProgressColor(
                          teacher.culturalInsights.communityEngagement,
                        ),
                      }}
                    ></div>
                  </div>
                  <span>{teacher.culturalInsights.communityEngagement}%</span>
                </div>
              </div>
              <div className="cultural-card">
                <h3>Student Cultural Growth</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${teacher.culturalInsights.studentCulturalGrowth}%`,
                        backgroundColor: getProgressColor(
                          teacher.culturalInsights.studentCulturalGrowth,
                        ),
                      }}
                    ></div>
                  </div>
                  <span>{teacher.culturalInsights.studentCulturalGrowth}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'notifications' && (
          <div className="notifications-section">
            <h2>Notifications</h2>
            <div className="notifications-list">
              {teacher.notifications.map((notification) => (
                <div key={notification.id} className="notification-card">
                  <div className="notification-icon">{getNotificationIcon(notification.type)}</div>
                  <div className="notification-content">
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">{notification.timestamp}</span>
                  </div>
                  <div
                    className="priority-indicator"
                    style={{ backgroundColor: getPriorityColor(notification.priority) }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
