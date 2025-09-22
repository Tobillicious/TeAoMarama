import {
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  Plus,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';

interface Lesson {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  duration: string;
  completed: boolean;
  studentsCompleted: number;
  totalStudents: number;
  rating: number;
  lastUsed: string;
  culturalElements: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Student {
  id: string;
  name: string;
  progress: number;
  lastActive: string;
  completedLessons: number;
  avatar: string;
  performance: 'excellent' | 'good' | 'needs-support';
}

const BeautifulTeacherDashboard: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Te Tiriti o Waitangi Unit',
      subject: 'Social Studies',
      yearLevel: 'Year 8',
      duration: '4-6 weeks',
      completed: true,
      studentsCompleted: 24,
      totalStudents: 28,
      rating: 4.8,
      lastUsed: '2 days ago',
      culturalElements: 12,
      difficulty: 'intermediate',
    },
    {
      id: '2',
      title: 'Kākāpō Conservation Science',
      subject: 'Science',
      yearLevel: 'Year 8',
      duration: '3-4 weeks',
      completed: false,
      studentsCompleted: 8,
      totalStudents: 28,
      rating: 4.6,
      lastUsed: '1 week ago',
      culturalElements: 8,
      difficulty: 'beginner',
    },
    {
      id: '3',
      title: 'Māori Patterns in Mathematics',
      subject: 'Mathematics',
      yearLevel: 'Year 8',
      duration: '2-3 weeks',
      completed: true,
      studentsCompleted: 26,
      totalStudents: 28,
      rating: 4.9,
      lastUsed: '3 days ago',
      culturalElements: 15,
      difficulty: 'intermediate',
    },
  ]);

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Aroha Williams',
      progress: 85,
      lastActive: '2 hours ago',
      completedLessons: 12,
      avatar: '👩‍🎓',
      performance: 'excellent',
    },
    {
      id: '2',
      name: 'Wiremu Thompson',
      progress: 72,
      lastActive: '1 day ago',
      completedLessons: 9,
      avatar: '👨‍🎓',
      performance: 'good',
    },
    {
      id: '3',
      name: 'Hine Smith',
      progress: 45,
      lastActive: '3 days ago',
      completedLessons: 6,
      avatar: '👩‍🎓',
      performance: 'needs-support',
    },
  ]);

  const [stats, setStats] = useState({
    totalLessons: 15,
    activeStudents: 28,
    completionRate: 78,
    culturalIntegration: 92,
  });

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '24px 32px',
      marginBottom: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    },
    headerTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    welcome: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
    },
    headerActions: {
      display: 'flex',
      gap: '12px',
    },
    actionButton: {
      padding: '12px 20px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '32px',
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
    },
    statIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
    },
    statValue: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#1f2937',
      marginBottom: '4px',
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500',
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px',
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '24px',
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '24px',
    },
    section: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    lessonCard: {
      background: 'rgba(249, 250, 251, 0.8)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '16px',
      border: '1px solid rgba(229, 231, 235, 0.5)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    lessonHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px',
    },
    lessonTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '4px',
    },
    lessonMeta: {
      fontSize: '14px',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    lessonProgress: {
      marginBottom: '16px',
    },
    progressBar: {
      width: '100%',
      height: '8px',
      background: 'rgba(229, 231, 235, 0.5)',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '8px',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      borderRadius: '4px',
      transition: 'width 0.3s ease',
    },
    progressText: {
      fontSize: '12px',
      color: '#6b7280',
      display: 'flex',
      justifyContent: 'space-between',
    },
    studentCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px',
      background: 'rgba(249, 250, 251, 0.8)',
      borderRadius: '12px',
      marginBottom: '12px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    studentAvatar: {
      fontSize: '32px',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '12px',
    },
    studentInfo: {
      flex: 1,
    },
    studentName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '4px',
    },
    studentProgress: {
      fontSize: '14px',
      color: '#6b7280',
    },
    performanceBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
    },
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' };
      case 'good':
        return { background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white' };
      case 'needs-support':
        return { background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' };
      default:
        return { background: '#e5e7eb', color: '#6b7280' };
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#10b981';
      case 'intermediate':
        return '#3b82f6';
      case 'advanced':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <div>
            <h1 style={styles.welcome}>Kia ora, Sarah! 👋</h1>
            <p style={styles.subtitle}>Welcome back to your Te Ao Mārama teaching dashboard</p>
          </div>
          <div style={styles.headerActions}>
            <button
              style={{
                ...styles.actionButton,
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
              }}
            >
              <Bell size={16} />
              Notifications
            </button>
            <button
              style={{
                ...styles.actionButton,
                background: 'rgba(107, 114, 128, 0.1)',
                color: '#6b7280',
              }}
            >
              <Settings size={16} />
              Settings
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              }}
            >
              <BookOpen size={24} color="white" />
            </div>
            <div style={styles.statValue}>{stats.totalLessons}</div>
            <div style={styles.statLabel}>Active Lessons</div>
          </div>

          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              }}
            >
              <Users size={24} color="white" />
            </div>
            <div style={styles.statValue}>{stats.activeStudents}</div>
            <div style={styles.statLabel}>Active Students</div>
          </div>

          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              }}
            >
              <TrendingUp size={24} color="white" />
            </div>
            <div style={styles.statValue}>{stats.completionRate}%</div>
            <div style={styles.statLabel}>Completion Rate</div>
          </div>

          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              }}
            >
              <Sparkles size={24} color="white" />
            </div>
            <div style={styles.statValue}>{stats.culturalIntegration}%</div>
            <div style={styles.statLabel}>Cultural Integration</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.contentGrid}>
        <div style={styles.mainContent}>
          {/* Recent Lessons */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <BookOpen size={20} color="#3b82f6" />
                Recent Lessons
              </h2>
              <button
                style={{
                  ...styles.actionButton,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  color: 'white',
                }}
              >
                <Plus size={16} />
                New Lesson
              </button>
            </div>

            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                style={styles.lessonCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={styles.lessonHeader}>
                  <div>
                    <h3 style={styles.lessonTitle}>{lesson.title}</h3>
                    <div style={styles.lessonMeta}>
                      <span>{lesson.subject}</span>
                      <span>•</span>
                      <span>{lesson.yearLevel}</span>
                      <span>•</span>
                      <span>{lesson.duration}</span>
                      <span>•</span>
                      <span style={{ color: getDifficultyColor(lesson.difficulty) }}>
                        {lesson.difficulty}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={16} color="#f59e0b" fill="currentColor" />
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{lesson.rating}</span>
                    </div>
                    <div
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#3b82f6',
                      }}
                    >
                      {lesson.culturalElements} cultural
                    </div>
                  </div>
                </div>

                <div style={styles.lessonProgress}>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${(lesson.studentsCompleted / lesson.totalStudents) * 100}%`,
                      }}
                    />
                  </div>
                  <div style={styles.progressText}>
                    <span>
                      {lesson.studentsCompleted} of {lesson.totalStudents} students completed
                    </span>
                    <span>Last used: {lesson.lastUsed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Student Progress */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <Users size={20} color="#10b981" />
                Student Progress
              </h2>
            </div>

            {students.map((student) => (
              <div
                key={student.id}
                style={styles.studentCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.background = 'rgba(249, 250, 251, 0.8)';
                }}
              >
                <div style={styles.studentAvatar}>{student.avatar}</div>
                <div style={styles.studentInfo}>
                  <div style={styles.studentName}>{student.name}</div>
                  <div style={styles.studentProgress}>
                    {student.progress}% complete • {student.completedLessons} lessons
                  </div>
                </div>
                <div
                  style={{
                    ...styles.performanceBadge,
                    ...getPerformanceColor(student.performance),
                  }}
                >
                  {student.performance.replace('-', ' ')}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <Zap size={20} color="#f59e0b" />
                Quick Actions
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                style={{
                  ...styles.actionButton,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  width: '100%',
                  justifyContent: 'flex-start',
                }}
              >
                <Plus size={16} />
                Create New Lesson
              </button>
              <button
                style={{
                  ...styles.actionButton,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  width: '100%',
                  justifyContent: 'flex-start',
                }}
              >
                <BarChart3 size={16} />
                View Analytics
              </button>
              <button
                style={{
                  ...styles.actionButton,
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: 'white',
                  width: '100%',
                  justifyContent: 'flex-start',
                }}
              >
                <Calendar size={16} />
                Schedule Lessons
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulTeacherDashboard;
