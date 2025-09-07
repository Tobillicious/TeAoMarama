import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';
import './TeacherDashboard.css';

interface Student {
  id: string;
  name: string;
  progress: number;
  lastActivity: string;
  culturalEngagement: number;
}

interface Class {
  id: string;
  name: string;
  studentCount: number;
  averageProgress: number;
  nextLesson: string;
}

const TeacherDashboard: React.FC = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== 'teacher') {
      navigate('/');
      return;
    }

    // Simulate loading teacher data
    const loadTeacherData = async () => {
      setLoading(true);

      // Mock data - in real app, this would come from Firebase
      const mockStudents: Student[] = [
        {
          id: '1',
          name: 'Aroha Smith',
          progress: 85,
          lastActivity: '2 hours ago',
          culturalEngagement: 92,
        },
        {
          id: '2',
          name: 'Kai Johnson',
          progress: 78,
          lastActivity: '1 day ago',
          culturalEngagement: 88,
        },
        {
          id: '3',
          name: 'Mana Williams',
          progress: 92,
          lastActivity: '3 hours ago',
          culturalEngagement: 95,
        },
        {
          id: '4',
          name: 'Tui Brown',
          progress: 67,
          lastActivity: '2 days ago',
          culturalEngagement: 82,
        },
        {
          id: '5',
          name: 'Hina Davis',
          progress: 89,
          lastActivity: '1 hour ago',
          culturalEngagement: 90,
        },
      ];

      const mockClasses: Class[] = [
        {
          id: '1',
          name: 'Year 8A - Te Reo Māori',
          studentCount: 24,
          averageProgress: 82,
          nextLesson: 'Narrative Structure in Pūrākau',
        },
        {
          id: '2',
          name: 'Year 8B - English',
          studentCount: 22,
          averageProgress: 78,
          nextLesson: 'Academic Vocabulary Building',
        },
        {
          id: '3',
          name: 'Year 8C - Social Studies',
          studentCount: 26,
          averageProgress: 85,
          nextLesson: 'Critical Literacy in Media',
        },
      ];

      setTimeout(() => {
        setStudents(mockStudents);
        setClasses(mockClasses);
        setLoading(false);
      }, 1000);
    };

    loadTeacherData();
  }, [role, navigate]);

  const handleStudentClick = (studentId: string) => {
    navigate(`/student-progress/${studentId}`);
  };

  const handleClassClick = (classId: string) => {
    navigate(`/class-management/${classId}`);
  };

  const handleCreateLesson = () => {
    navigate('/lesson-planner');
  };

  if (loading) {
    return (
      <div className="teacher-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard, Kaiako...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Kaiako Dashboard</h1>
          <p className="welcome-message">
            Kia ora, {user?.displayName || user?.email}! Welcome to your teaching hub.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleCreateLesson}>
            Create New Lesson
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
          className={`tab ${activeTab === 'classes' ? 'active' : ''}`}
          onClick={() => setActiveTab('classes')}
        >
          My Classes
        </button>
        <button
          className={`tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Student Progress
        </button>
        <button
          className={`tab ${activeTab === 'cultural' ? 'active' : ''}`}
          onClick={() => setActiveTab('cultural')}
        >
          Cultural Integration
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Students</h3>
                <div className="stat-value">{students.length}</div>
                <p>Across all classes</p>
              </div>
              <div className="stat-card">
                <h3>Average Progress</h3>
                <div className="stat-value">
                  {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
                </div>
                <p>Class performance</p>
              </div>
              <div className="stat-card">
                <h3>Cultural Engagement</h3>
                <div className="stat-value">
                  {Math.round(
                    students.reduce((acc, s) => acc + s.culturalEngagement, 0) / students.length,
                  )}
                  %
                </div>
                <p>Te Reo & cultural learning</p>
              </div>
              <div className="stat-card">
                <h3>Active Classes</h3>
                <div className="stat-value">{classes.length}</div>
                <p>Currently teaching</p>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => navigate('/year8-writing')}>
                  Year 8 Writing Units
                </button>
                <button className="action-btn" onClick={() => navigate('/year8-reading')}>
                  Year 8 Reading Units
                </button>
                <button className="action-btn" onClick={() => navigate('/year8-critical-literacy')}>
                  Critical Literacy
                </button>
                <button className="action-btn" onClick={() => navigate('/assessment-framework')}>
                  Assessment Tools
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="classes-tab">
            <h3>My Classes</h3>
            <div className="classes-grid">
              {classes.map((classItem) => (
                <div
                  key={classItem.id}
                  className="class-card"
                  onClick={() => handleClassClick(classItem.id)}
                >
                  <h4>{classItem.name}</h4>
                  <div className="class-stats">
                    <div className="class-stat">
                      <span className="stat-label">Students:</span>
                      <span className="stat-value">{classItem.studentCount}</span>
                    </div>
                    <div className="class-stat">
                      <span className="stat-label">Progress:</span>
                      <span className="stat-value">{classItem.averageProgress}%</span>
                    </div>
                  </div>
                  <div className="next-lesson">
                    <strong>Next Lesson:</strong> {classItem.nextLesson}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="students-tab">
            <h3>Student Progress</h3>
            <div className="students-table">
              <div className="table-header">
                <div>Student Name</div>
                <div>Progress</div>
                <div>Cultural Engagement</div>
                <div>Last Activity</div>
                <div>Actions</div>
              </div>
              {students.map((student) => (
                <div
                  key={student.id}
                  className="table-row"
                  onClick={() => handleStudentClick(student.id)}
                >
                  <div className="student-name">{student.name}</div>
                  <div className="progress-cell">
                    <div className="progress-bar">
                      <div
                        className="progress-fill progress-fill-dynamic"
                        style={
                          { '--progress-width': `${student.progress}%` } as React.CSSProperties
                        }
                      ></div>
                    </div>
                    <span className="progress-text">{student.progress}%</span>
                  </div>
                  <div className="cultural-engagement">
                    <div className="progress-bar">
                      <div
                        className="progress-fill progress-fill-dynamic cultural-progress"
                        style={
                          {
                            '--progress-width': `${student.culturalEngagement}%`,
                          } as React.CSSProperties
                        }
                      ></div>
                    </div>
                    <span className="progress-text">{student.culturalEngagement}%</span>
                  </div>
                  <div className="last-activity">{student.lastActivity}</div>
                  <div className="actions">
                    <button className="btn-small">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cultural' && (
          <div className="cultural-tab">
            <h3>Cultural Integration Dashboard</h3>
            <div className="cultural-content">
              <div className="cultural-stats">
                <div className="cultural-stat">
                  <h4>Te Reo Māori Usage</h4>
                  <div className="stat-value">87%</div>
                  <p>Average across all lessons</p>
                </div>
                <div className="cultural-stat">
                  <h4>Cultural Protocols</h4>
                  <div className="stat-value">94%</div>
                  <p>Properly implemented</p>
                </div>
                <div className="cultural-stat">
                  <h4>Community Engagement</h4>
                  <div className="stat-value">76%</div>
                  <p>Local partnerships active</p>
                </div>
              </div>

              <div className="cultural-resources">
                <h4>Cultural Resources</h4>
                <div className="resource-links">
                  <button
                    className="resource-btn"
                    onClick={() => navigate('/cultural-learning-modules')}
                  >
                    Cultural Learning Modules
                  </button>
                  <button
                    className="resource-btn"
                    onClick={() => navigate('/community-partnerships')}
                  >
                    Community Partnerships
                  </button>
                  <button
                    className="resource-btn"
                    onClick={() => navigate('/cultural-safety-guidelines')}
                  >
                    Cultural Safety Guidelines
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

export default TeacherDashboard;
