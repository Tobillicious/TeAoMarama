import React, { useEffect, useState } from 'react';
import './StudentDashboard.css';

interface Student {
  id: string;
  name: string;
  yearLevel: number;
  culturalBackground: string;
  avatar: string;
  progress: {
    overall: number;
    reading: number;
    writing: number;
    vocabulary: number;
    criticalLiteracy: number;
    culturalEngagement: number;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'academic' | 'cultural' | 'leadership' | 'creativity';
    icon: string;
  }>;
  currentCourses: Array<{
    id: string;
    title: string;
    subject: string;
    progress: number;
    nextLesson: string;
    culturalElements: string[];
  }>;
  upcomingTasks: Array<{
    id: string;
    title: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    type: 'assignment' | 'quiz' | 'project' | 'cultural';
  }>;
  culturalInsights: {
    teReoProgress: number;
    tikangaKnowledge: number;
    culturalProjects: number;
    communityEngagement: number;
  };
}

const StudentDashboard: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [selectedView, setSelectedView] = useState<
    'overview' | 'courses' | 'achievements' | 'cultural' | 'tasks'
  >('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading student data
    const loadStudentData = () => {
      const mockStudent: Student = {
        id: 'student-001',
        name: 'Aria Tāne',
        yearLevel: 8,
        culturalBackground: 'Māori, Pacific',
        avatar: '👩‍🎓',
        progress: {
          overall: 87,
          reading: 92,
          writing: 85,
          vocabulary: 89,
          criticalLiteracy: 91,
          culturalEngagement: 94,
        },
        achievements: [
          {
            id: 'ach-001',
            title: 'Te Reo Māori Excellence',
            description: 'Completed advanced Te Reo Māori module with distinction',
            date: '2024-01-15',
            type: 'cultural',
            icon: '🌿',
          },
          {
            id: 'ach-002',
            title: 'Reading Champion',
            description: 'Read 50 books this term, including 15 Māori and Pacific texts',
            date: '2024-01-10',
            type: 'academic',
            icon: '📚',
          },
          {
            id: 'ach-003',
            title: 'Cultural Leadership',
            description: 'Led school cultural festival planning committee',
            date: '2024-01-05',
            type: 'leadership',
            icon: '🏛️',
          },
          {
            id: 'ach-004',
            title: 'Creative Writing Award',
            description: 'Won school creative writing competition with cultural story',
            date: '2023-12-20',
            type: 'creativity',
            icon: '✍️',
          },
        ],
        currentCourses: [
          {
            id: 'course-001',
            title: 'Whakapapa: Māori Genealogy',
            subject: 'Reading',
            progress: 75,
            nextLesson: 'Traditional Storytelling Methods',
            culturalElements: ['Whakapapa', 'Māori Identity', 'Cultural Storytelling'],
          },
          {
            id: 'course-002',
            title: 'Contemporary NZ Literature',
            subject: 'Writing',
            progress: 60,
            nextLesson: 'Identity and Belonging',
            culturalElements: ['NZ Identity', 'Cultural Diversity', 'Modern Themes'],
          },
          {
            id: 'course-003',
            title: 'Academic Vocabulary Mastery',
            subject: 'Vocabulary',
            progress: 85,
            nextLesson: 'Subject-Specific Terms',
            culturalElements: ['Academic Language', 'Cultural Context', 'Subject Integration'],
          },
        ],
        upcomingTasks: [
          {
            id: 'task-001',
            title: 'Whakapapa Research Project',
            dueDate: '2024-01-25',
            priority: 'high',
            type: 'project',
          },
          {
            id: 'task-002',
            title: 'Critical Literacy Quiz',
            dueDate: '2024-01-22',
            priority: 'medium',
            type: 'quiz',
          },
          {
            id: 'task-003',
            title: 'Cultural Story Writing',
            dueDate: '2024-01-28',
            priority: 'high',
            type: 'assignment',
          },
          {
            id: 'task-004',
            title: 'Community Cultural Event',
            dueDate: '2024-02-01',
            priority: 'medium',
            type: 'cultural',
          },
        ],
        culturalInsights: {
          teReoProgress: 78,
          tikangaKnowledge: 85,
          culturalProjects: 92,
          communityEngagement: 88,
        },
      };

      setStudent(mockStudent);
      setIsLoading(false);
    };

    loadStudentData();
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

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return '📚';
      case 'cultural':
        return '🌿';
      case 'leadership':
        return '🏛️';
      case 'creativity':
        return '✍️';
      default:
        return '🏆';
    }
  };

  if (isLoading) {
    return (
      <div className="student-dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your personalized dashboard...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="student-dashboard-error">
        <h2>Error Loading Dashboard</h2>
        <p>Unable to load your student information. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="student-info">
          <div className="student-avatar">{student.avatar}</div>
          <div className="student-details">
            <h1>Kia ora, {student.name}!</h1>
            <p>
              Year {student.yearLevel} Student • {student.culturalBackground}
            </p>
            <div className="overall-progress">
              <span className="progress-label">Overall Progress</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${student.progress.overall}%`,
                    backgroundColor: getProgressColor(student.progress.overall),
                  }}
                ></div>
              </div>
              <span className="progress-percentage">{student.progress.overall}%</span>
            </div>
          </div>
        </div>
        <div className="dashboard-actions">
          <button className="action-btn primary">Continue Learning</button>
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
          className={`tab-btn ${selectedView === 'courses' ? 'active' : ''}`}
          onClick={() => setSelectedView('courses')}
        >
          📚 My Courses
        </button>
        <button
          className={`tab-btn ${selectedView === 'achievements' ? 'active' : ''}`}
          onClick={() => setSelectedView('achievements')}
        >
          🏆 Achievements
        </button>
        <button
          className={`tab-btn ${selectedView === 'cultural' ? 'active' : ''}`}
          onClick={() => setSelectedView('cultural')}
        >
          🌿 Cultural Journey
        </button>
        <button
          className={`tab-btn ${selectedView === 'tasks' ? 'active' : ''}`}
          onClick={() => setSelectedView('tasks')}
        >
          📋 Tasks & Deadlines
        </button>
      </div>

      {/* Content Sections */}
      <div className="dashboard-content">
        {selectedView === 'overview' && (
          <div className="overview-section">
            <div className="progress-grid">
              <div className="progress-card">
                <h3>Reading Progress</h3>
                <div className="progress-circle">
                  <span className="progress-number">{student.progress.reading}%</span>
                </div>
                <p>Advanced comprehension skills</p>
              </div>
              <div className="progress-card">
                <h3>Writing Progress</h3>
                <div className="progress-circle">
                  <span className="progress-number">{student.progress.writing}%</span>
                </div>
                <p>Creative and academic writing</p>
              </div>
              <div className="progress-card">
                <h3>Vocabulary Mastery</h3>
                <div className="progress-circle">
                  <span className="progress-number">{student.progress.vocabulary}%</span>
                </div>
                <p>Academic and cultural terms</p>
              </div>
              <div className="progress-card">
                <h3>Critical Literacy</h3>
                <div className="progress-circle">
                  <span className="progress-number">{student.progress.criticalLiteracy}%</span>
                </div>
                <p>Analytical thinking skills</p>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-grid">
                <button className="quick-action-btn">
                  <span className="action-icon">📚</span>
                  Continue Reading
                </button>
                <button className="quick-action-btn">
                  <span className="action-icon">✍️</span>
                  Start Writing
                </button>
                <button className="quick-action-btn">
                  <span className="action-icon">🌿</span>
                  Cultural Activity
                </button>
                <button className="quick-action-btn">
                  <span className="action-icon">📋</span>
                  View Tasks
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'courses' && (
          <div className="courses-section">
            <h2>My Current Courses</h2>
            <div className="courses-grid">
              {student.currentCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-header">
                    <h3>{course.title}</h3>
                    <span className="course-subject">{course.subject}</span>
                  </div>
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${course.progress}%`,
                          backgroundColor: getProgressColor(course.progress),
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">{course.progress}% Complete</span>
                  </div>
                  <div className="course-details">
                    <p>
                      <strong>Next Lesson:</strong> {course.nextLesson}
                    </p>
                    <div className="cultural-elements">
                      <strong>Cultural Elements:</strong>
                      <div className="element-tags">
                        {course.culturalElements.map((element, index) => (
                          <span key={index} className="element-tag">
                            {element}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="continue-course-btn">Continue Course</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'achievements' && (
          <div className="achievements-section">
            <h2>My Achievements</h2>
            <div className="achievements-grid">
              {student.achievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                    <span className="achievement-date">{achievement.date}</span>
                    <span className={`achievement-type ${achievement.type}`}>
                      {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'cultural' && (
          <div className="cultural-section">
            <h2>Cultural Journey</h2>
            <div className="cultural-metrics">
              <div className="cultural-card">
                <h3>Te Reo Māori Progress</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${student.culturalInsights.teReoProgress}%`,
                        backgroundColor: getProgressColor(student.culturalInsights.teReoProgress),
                      }}
                    ></div>
                  </div>
                  <span>{student.culturalInsights.teReoProgress}%</span>
                </div>
              </div>
              <div className="cultural-card">
                <h3>Tikanga Knowledge</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${student.culturalInsights.tikangaKnowledge}%`,
                        backgroundColor: getProgressColor(
                          student.culturalInsights.tikangaKnowledge,
                        ),
                      }}
                    ></div>
                  </div>
                  <span>{student.culturalInsights.tikangaKnowledge}%</span>
                </div>
              </div>
              <div className="cultural-card">
                <h3>Cultural Projects</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${student.culturalInsights.culturalProjects}%`,
                        backgroundColor: getProgressColor(
                          student.culturalInsights.culturalProjects,
                        ),
                      }}
                    ></div>
                  </div>
                  <span>{student.culturalInsights.culturalProjects}%</span>
                </div>
              </div>
              <div className="cultural-card">
                <h3>Community Engagement</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${student.culturalInsights.communityEngagement}%`,
                        backgroundColor: getProgressColor(
                          student.culturalInsights.communityEngagement,
                        ),
                      }}
                    ></div>
                  </div>
                  <span>{student.culturalInsights.communityEngagement}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'tasks' && (
          <div className="tasks-section">
            <h2>Upcoming Tasks & Deadlines</h2>
            <div className="tasks-grid">
              {student.upcomingTasks.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span
                      className={`priority-badge ${task.priority}`}
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="task-details">
                    <p>
                      <strong>Due:</strong> {task.dueDate}
                    </p>
                    <p>
                      <strong>Type:</strong> {task.type}
                    </p>
                  </div>
                  <button className="view-task-btn">View Task</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
