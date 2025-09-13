import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  MessageCircle,
  PieChart,
  Play,
  Plus,
  Search,
  Settings,
  Star,
  Target,
  TrendingUp,
  Upload,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';
import './ProfessionalTeacherDashboard.css';

interface StudentProgress {
  id: string;
  name: string;
  yearLevel: string;
  overallProgress: number;
  recentActivity: string;
  culturalEngagement: number;
  strengths: string[];
  needsSupport: string[];
}

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  duration: string;
  status: 'draft' | 'published' | 'in-progress';
  culturalElements: number;
  lastModified: string;
}

interface ClassroomStats {
  totalStudents: number;
  activeStudents: number;
  averageProgress: number;
  pendingAssessments: number;
  culturalResourcesUsed: number;
  lessonPlansCreated: number;
  weeklyEngagement: number;
  parentNotifications: number;
}

const ProfessionalTeacherDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - in real app this would come from Firebase
  const [stats] = useState<ClassroomStats>({
    totalStudents: 28,
    activeStudents: 24,
    averageProgress: 73,
    pendingAssessments: 6,
    culturalResourcesUsed: 42,
    lessonPlansCreated: 12,
    weeklyEngagement: 89,
    parentNotifications: 3,
  });

  const [studentProgress] = useState<StudentProgress[]>([
    {
      id: '1',
      name: 'Aroha Williams',
      yearLevel: 'Year 8',
      overallProgress: 85,
      recentActivity: 'Completed Te Reo vocabulary assessment',
      culturalEngagement: 92,
      strengths: ['Cultural knowledge', 'Critical thinking'],
      needsSupport: ['Mathematics application'],
    },
    {
      id: '2',
      name: 'James Thompson',
      yearLevel: 'Year 8',
      overallProgress: 67,
      recentActivity: 'Started social studies project',
      culturalEngagement: 58,
      strengths: ['Writing skills', 'Research'],
      needsSupport: ['Cultural connections', 'Engagement'],
    },
    {
      id: '3',
      name: 'Mere Patel',
      yearLevel: 'Year 8',
      overallProgress: 91,
      recentActivity: 'Completed advanced literacy module',
      culturalEngagement: 87,
      strengths: ['Leadership', 'Te Reo Māori', 'Academic excellence'],
      needsSupport: ['Peer collaboration'],
    },
  ]);

  const [lessonPlans] = useState<LessonPlan[]>([
    {
      id: '1',
      title: 'Māori Perspectives in Science',
      subject: 'Science',
      yearLevel: 'Year 8',
      duration: '50 mins',
      status: 'published',
      culturalElements: 4,
      lastModified: '2 hours ago',
    },
    {
      id: '2',
      title: 'Critical Literacy: Media Representation',
      subject: 'English',
      yearLevel: 'Year 8',
      duration: '60 mins',
      status: 'draft',
      culturalElements: 3,
      lastModified: '1 day ago',
    },
    {
      id: '3',
      title: 'Statistical Analysis with NZ Data',
      subject: 'Mathematics',
      yearLevel: 'Year 8',
      duration: '45 mins',
      status: 'in-progress',
      culturalElements: 2,
      lastModified: '3 hours ago',
    },
  ]);

  // Authentication removed for direct access
  // useEffect(() => {
  //   if (!currentUser || currentUser.role !== 'teacher') {
  //     navigate('/login');
  //   }
  // }, [currentUser, navigate]);

  const quickActions = [
    {
      title: "Start Today's Lesson",
      icon: <Play />,
      description: 'Launch your next lesson instantly',
      action: () => navigate('/lesson-launcher'),
      color: '#059669',
      priority: 'high',
    },
    {
      title: 'Quick Assessment',
      icon: <Target />,
      description: 'Create instant formative assessment',
      action: () => navigate('/quick-assessment'),
      color: '#dc2626',
      priority: 'high',
    },
    {
      title: 'Student Check-in',
      icon: <Users />,
      description: 'See who needs support right now',
      action: () => setActiveTab('students'),
      color: '#3b82f6',
      priority: 'high',
    },
    {
      title: 'Cultural Connection',
      icon: <BookOpen />,
      description: 'Find Te Ao Māori resources',
      action: () => navigate('/cultural-resources'),
      color: '#7c3aed',
      priority: 'medium',
    },
    {
      title: 'Parent Update',
      icon: <MessageCircle />,
      description: 'Send quick family communication',
      action: () => navigate('/parent-communication'),
      color: '#059669',
      priority: 'medium',
    },
    {
      title: 'Plan Tomorrow',
      icon: <Calendar />,
      description: "Prepare next day's activities",
      action: () => navigate('/lesson-planner'),
      color: '#d97706',
      priority: 'low',
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#059669';
    if (progress >= 60) return '#d97706';
    return '#dc2626';
  };

  const getStatusColor = (status: LessonPlan['status']) => {
    switch (status) {
      case 'published':
        return '#059669';
      case 'in-progress':
        return '#d97706';
      case 'draft':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const filteredStudents = studentProgress.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="professional-teacher-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Kia ora, Professional Kaiako! 👨‍🏫</h1>
            <p className="header-subtitle">
              Your Teaching Command Center - Mangakotukutuku College
            </p>
            <div className="quick-status">
              <span className="status-indicator active">●</span>
              <span>
                Ready to teach •{' '}
                {new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          <div className="header-actions">
            <button className="notification-btn" title="Notifications">
              <Bell />
              {stats.parentNotifications > 0 && (
                <span className="notification-badge">{stats.parentNotifications}</span>
              )}
            </button>
            <button
              className="profile-btn"
              onClick={() => setActiveTab('settings')}
              title="Settings"
            >
              <Settings />
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav" role="navigation" aria-label="Dashboard navigation">
        <button
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Activity />
          Overview
        </button>
        <button
          className={`nav-tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          <Users />
          Students ({stats.totalStudents})
        </button>
        <button
          className={`nav-tab ${activeTab === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          <BookOpen />
          Lesson Plans ({lessonPlans.length})
        </button>
        <button
          className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 />
          Analytics
        </button>
        <button
          className={`nav-tab ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          <FileText />
          Resources
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-content">
            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon">
                  <Users />
                </div>
                <div className="stat-content">
                  <h3>Active Students</h3>
                  <div className="stat-value">
                    {stats.activeStudents}/{stats.totalStudents}
                  </div>
                  <p className="stat-change positive">+2 this week</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <TrendingUp />
                </div>
                <div className="stat-content">
                  <h3>Average Progress</h3>
                  <div className="stat-value">{stats.averageProgress}%</div>
                  <p className="stat-change positive">+5% this month</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <Target />
                </div>
                <div className="stat-content">
                  <h3>Pending Assessments</h3>
                  <div className="stat-value">{stats.pendingAssessments}</div>
                  <p className="stat-change neutral">Due this week</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <Star />
                </div>
                <div className="stat-content">
                  <h3>Cultural Resources</h3>
                  <div className="stat-value">{stats.culturalResourcesUsed}</div>
                  <p className="stat-change positive">Used this term</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <section className="quick-actions-section">
              <h2>Today's Teaching Tools</h2>
              <div className="quick-actions-grid">
                {quickActions
                  .sort((a, b) => {
                    const priorityOrder: { [key: string]: number } = { high: 0, medium: 1, low: 2 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                  })
                  .map((action, index) => (
                    <button
                      key={index}
                      className={`quick-action-card priority-${action.priority}`}
                      onClick={action.action}
                      style={{ borderTopColor: action.color }}
                    >
                      <div className="action-icon" style={{ color: action.color }}>
                        {action.icon}
                      </div>
                      <h3>{action.title}</h3>
                      <p>{action.description}</p>
                      <div className="priority-badge">{action.priority}</div>
                    </button>
                  ))}
              </div>
            </section>

            {/* Recent Activity & Alerts */}
            <div className="recent-section">
              <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <CheckCircle className="activity-icon success" />
                    <div className="activity-content">
                      <h4>Lesson Plan Published</h4>
                      <p>"Māori Perspectives in Science" is now live</p>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <Users className="activity-icon primary" />
                    <div className="activity-content">
                      <h4>Student Progress Updated</h4>
                      <p>3 students completed cultural modules</p>
                      <span className="activity-time">4 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <MessageCircle className="activity-icon info" />
                    <div className="activity-content">
                      <h4>Parent Notification Sent</h4>
                      <p>Weekly progress reports delivered</p>
                      <span className="activity-time">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="alerts-section">
                <h2>Important Alerts</h2>
                <div className="alert-item warning">
                  <AlertTriangle className="alert-icon" />
                  <div className="alert-content">
                    <h4>Cultural Safety Review</h4>
                    <p>2 resources need cultural validation</p>
                    <button className="alert-action">Review Now</button>
                  </div>
                </div>
                <div className="alert-item info">
                  <Bell className="alert-icon" />
                  <div className="alert-content">
                    <h4>Professional Development</h4>
                    <p>New Te Reo modules available</p>
                    <button className="alert-action">Explore</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="students-content">
            <div className="students-header">
              <h2>Student Progress Overview</h2>
              <div className="students-controls">
                <div className="search-bar">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="filter-btn">
                  <Filter />
                  Filter
                </button>
                <button className="export-btn">
                  <Download />
                  Export
                </button>
              </div>
            </div>

            <div className="students-grid">
              {filteredStudents.map((student) => (
                <div key={student.id} className="student-card">
                  <div className="student-header">
                    <div className="student-info">
                      <h3>{student.name}</h3>
                      <p>{student.yearLevel}</p>
                    </div>
                    <button className="student-details-btn">
                      <Eye />
                    </button>
                  </div>

                  <div className="progress-section">
                    <div className="progress-item">
                      <span>Overall Progress</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${student.overallProgress}%`,
                            backgroundColor: getProgressColor(student.overallProgress),
                          }}
                        />
                      </div>
                      <span className="progress-value">{student.overallProgress}%</span>
                    </div>

                    <div className="progress-item">
                      <span>Cultural Engagement</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${student.culturalEngagement}%`,
                            backgroundColor: '#7c3aed',
                          }}
                        />
                      </div>
                      <span className="progress-value">{student.culturalEngagement}%</span>
                    </div>
                  </div>

                  <div className="student-activity">
                    <p className="recent-activity">
                      <Clock className="activity-clock" />
                      {student.recentActivity}
                    </p>
                  </div>

                  <div className="student-strengths">
                    <div className="strengths">
                      <h4>Strengths:</h4>
                      <div className="tags">
                        {student.strengths.map((strength, index) => (
                          <span key={index} className="tag positive">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>

                    {student.needsSupport.length > 0 && (
                      <div className="needs-support">
                        <h4>Needs Support:</h4>
                        <div className="tags">
                          {student.needsSupport.map((need, index) => (
                            <span key={index} className="tag attention">
                              {need}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lesson Plans Tab */}
        {activeTab === 'lessons' && (
          <div className="lessons-content">
            <div className="lessons-header">
              <h2>Lesson Plans</h2>
              <div className="lessons-controls">
                <button className="create-lesson-btn primary">
                  <Plus />
                  Create New Lesson
                </button>
                <button className="import-btn">
                  <Upload />
                  Import
                </button>
              </div>
            </div>

            <div className="lessons-grid">
              {lessonPlans.map((lesson) => (
                <div key={lesson.id} className="lesson-card">
                  <div className="lesson-header">
                    <div className="lesson-info">
                      <h3>{lesson.title}</h3>
                      <p>
                        {lesson.subject} • {lesson.yearLevel}
                      </p>
                    </div>
                    <span
                      className="lesson-status"
                      style={{ backgroundColor: getStatusColor(lesson.status) }}
                    >
                      {lesson.status}
                    </span>
                  </div>

                  <div className="lesson-details">
                    <div className="lesson-meta">
                      <span>
                        <Clock /> {lesson.duration}
                      </span>
                      <span>
                        <Star /> {lesson.culturalElements} cultural elements
                      </span>
                    </div>

                    <p className="last-modified">Modified {lesson.lastModified}</p>
                  </div>

                  <div className="lesson-actions">
                    <button className="lesson-action-btn">
                      <Eye />
                      View
                    </button>
                    <button className="lesson-action-btn">
                      <FileText />
                      Edit
                    </button>
                    <button className="lesson-action-btn">
                      <Users />
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="analytics-content">
            <h2>Class Analytics & Insights</h2>

            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Weekly Engagement</h3>
                <div className="engagement-chart">
                  <div className="chart-placeholder">
                    <PieChart size={80} />
                    <div className="chart-value">{stats.weeklyEngagement}%</div>
                  </div>
                  <p>Students actively engaged this week</p>
                </div>
              </div>

              <div className="analytics-card">
                <h3>Cultural Integration Success</h3>
                <div className="cultural-metrics">
                  <div className="metric">
                    <span>Resources Used</span>
                    <span className="metric-value">{stats.culturalResourcesUsed}</span>
                  </div>
                  <div className="metric">
                    <span>Te Reo Engagement</span>
                    <span className="metric-value">87%</span>
                  </div>
                  <div className="metric">
                    <span>Cultural Competency</span>
                    <span className="metric-value">92%</span>
                  </div>
                </div>
              </div>

              <div className="analytics-card wide">
                <h3>Subject Performance Trends</h3>
                <div className="performance-trends">
                  <div className="trend-item">
                    <span>English</span>
                    <div className="trend-bar">
                      <div className="trend-fill" style={{ width: '85%' }}></div>
                    </div>
                    <span>85%</span>
                  </div>
                  <div className="trend-item">
                    <span>Mathematics</span>
                    <div className="trend-bar">
                      <div className="trend-fill" style={{ width: '73%' }}></div>
                    </div>
                    <span>73%</span>
                  </div>
                  <div className="trend-item">
                    <span>Science</span>
                    <div className="trend-bar">
                      <div className="trend-fill" style={{ width: '79%' }}></div>
                    </div>
                    <span>79%</span>
                  </div>
                  <div className="trend-item">
                    <span>Social Studies</span>
                    <div className="trend-bar">
                      <div className="trend-fill" style={{ width: '91%' }}></div>
                    </div>
                    <span>91%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="resources-content">
            <h2>Teaching Resources & Materials</h2>
            <p>Access to 3,063+ culturally-responsive educational resources</p>

            <div className="resources-quick-access">
              <button
                className="resource-quick-btn"
                onClick={() => navigate('/te-kete-ako-resources')}
              >
                <BookOpen />
                <span>Te Kete Ako Collection</span>
                <ChevronRight />
              </button>

              <button
                className="resource-quick-btn"
                onClick={() => navigate('/cultural-learning-modules')}
              >
                <Star />
                <span>Cultural Learning Modules</span>
                <ChevronRight />
              </button>

              <button className="resource-quick-btn" onClick={() => navigate('/assessment-tools')}>
                <Target />
                <span>Assessment Tools</span>
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfessionalTeacherDashboard;
