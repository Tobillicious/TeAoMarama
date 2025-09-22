import {
  ArrowDown,
  ArrowUp,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  Download,
  Eye,
  Filter,
  Minus,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';

interface AnalyticsData {
  totalStudents: number;
  activeStudents: number;
  completedLessons: number;
  averageRating: number;
  culturalIntegration: number;
  engagementRate: number;
  weeklyProgress: number;
  monthlyGrowth: number;
}

interface StudentPerformance {
  id: string;
  name: string;
  progress: number;
  rating: number;
  lessonsCompleted: number;
  culturalEngagement: number;
  trend: 'up' | 'down' | 'stable';
}

interface LessonAnalytics {
  id: string;
  title: string;
  completionRate: number;
  averageRating: number;
  culturalElements: number;
  studentEngagement: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const TeacherAnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalStudents: 28,
    activeStudents: 24,
    completedLessons: 156,
    averageRating: 4.7,
    culturalIntegration: 92,
    engagementRate: 87,
    weeklyProgress: 12,
    monthlyGrowth: 23,
  });

  const [studentPerformance, setStudentPerformance] = useState<StudentPerformance[]>([
    {
      id: '1',
      name: 'Aroha Williams',
      progress: 95,
      rating: 4.9,
      lessonsCompleted: 15,
      culturalEngagement: 98,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Wiremu Thompson',
      progress: 78,
      rating: 4.6,
      lessonsCompleted: 12,
      culturalEngagement: 85,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Hine Smith',
      progress: 45,
      rating: 4.2,
      lessonsCompleted: 8,
      culturalEngagement: 72,
      trend: 'down',
    },
    {
      id: '4',
      name: 'Tama Brown',
      progress: 67,
      rating: 4.4,
      lessonsCompleted: 10,
      culturalEngagement: 78,
      trend: 'stable',
    },
  ]);

  const [lessonAnalytics, setLessonAnalytics] = useState<LessonAnalytics[]>([
    {
      id: '1',
      title: 'Te Tiriti o Waitangi Unit',
      completionRate: 89,
      averageRating: 4.8,
      culturalElements: 12,
      studentEngagement: 94,
      difficulty: 'intermediate',
    },
    {
      id: '2',
      title: 'Kākāpō Conservation Science',
      completionRate: 76,
      averageRating: 4.6,
      culturalElements: 8,
      studentEngagement: 87,
      difficulty: 'beginner',
    },
    {
      id: '3',
      title: 'Māori Patterns in Mathematics',
      completionRate: 95,
      averageRating: 4.9,
      culturalElements: 15,
      studentEngagement: 96,
      difficulty: 'intermediate',
    },
  ]);

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
    statChange: {
      fontSize: '12px',
      fontWeight: '600',
      marginTop: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '24px',
    },
    fullWidthSection: {
      gridColumn: '1 / -1',
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
    studentStats: {
      fontSize: '14px',
      color: '#6b7280',
      display: 'flex',
      gap: '16px',
    },
    trendIcon: {
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
    },
    lessonCard: {
      background: 'rgba(249, 250, 251, 0.8)',
      borderRadius: '16px',
      padding: '20px',
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
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '16px',
    },
    metric: {
      textAlign: 'center' as const,
    },
    metricValue: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '4px',
    },
    metricLabel: {
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '500',
    },
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' };
      case 'down':
        return { background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white' };
      case 'stable':
        return { background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)', color: 'white' };
      default:
        return { background: '#e5e7eb', color: '#6b7280' };
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp size={16} />;
      case 'down':
        return <ArrowDown size={16} />;
      case 'stable':
        return <Minus size={16} />;
      default:
        return <Minus size={16} />;
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
            <h1 style={styles.welcome}>Analytics Dashboard 📊</h1>
            <p style={styles.subtitle}>
              Comprehensive insights into your teaching and student performance
            </p>
          </div>
          <div style={styles.headerActions}>
            <button
              style={{
                ...styles.actionButton,
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
              }}
            >
              <Filter size={16} />
              Filter
            </button>
            <button
              style={{
                ...styles.actionButton,
                background: 'rgba(107, 114, 128, 0.1)',
                color: '#6b7280',
              }}
            >
              <Download size={16} />
              Export
            </button>
            <button
              style={{
                ...styles.actionButton,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                color: 'white',
              }}
            >
              <RefreshCw size={16} />
              Refresh
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
              <Users size={24} color="white" />
            </div>
            <div style={styles.statValue}>{analyticsData.totalStudents}</div>
            <div style={styles.statLabel}>Total Students</div>
            <div style={{ ...styles.statChange, color: '#10b981' }}>
              <ArrowUp size={12} />+{analyticsData.monthlyGrowth}% this month
            </div>
          </div>

          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              }}
            >
              <BookOpen size={24} color="white" />
            </div>
            <div style={styles.statValue}>{analyticsData.completedLessons}</div>
            <div style={styles.statLabel}>Lessons Completed</div>
            <div style={{ ...styles.statChange, color: '#10b981' }}>
              <ArrowUp size={12} />+{analyticsData.weeklyProgress}% this week
            </div>
          </div>

          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              }}
            >
              <Award size={24} color="white" />
            </div>
            <div style={styles.statValue}>{analyticsData.averageRating}</div>
            <div style={styles.statLabel}>Average Rating</div>
            <div style={{ ...styles.statChange, color: '#10b981' }}>
              <ArrowUp size={12} />
              +0.2 this month
            </div>
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
            <div style={styles.statValue}>{analyticsData.culturalIntegration}%</div>
            <div style={styles.statLabel}>Cultural Integration</div>
            <div style={{ ...styles.statChange, color: '#10b981' }}>
              <ArrowUp size={12} />
              +5% this month
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.contentGrid}>
        {/* Student Performance */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              <Users size={20} color="#3b82f6" />
              Student Performance
            </h2>
            <button
              style={{
                ...styles.actionButton,
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
              }}
            >
              <Eye size={16} />
              View All
            </button>
          </div>

          {studentPerformance.map((student) => (
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
              <div style={styles.studentAvatar}>{student.name.charAt(0)}</div>
              <div style={styles.studentInfo}>
                <div style={styles.studentName}>{student.name}</div>
                <div style={styles.studentStats}>
                  <span>{student.progress}% complete</span>
                  <span>•</span>
                  <span>{student.lessonsCompleted} lessons</span>
                  <span>•</span>
                  <span>{student.rating}★ rating</span>
                  <span>•</span>
                  <span>{student.culturalEngagement}% cultural</span>
                </div>
              </div>
              <div
                style={{
                  ...styles.trendIcon,
                  ...getTrendColor(student.trend),
                }}
              >
                {getTrendIcon(student.trend)}
              </div>
            </div>
          ))}
        </div>

        {/* Lesson Analytics */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              <BookOpen size={20} color="#10b981" />
              Lesson Analytics
            </h2>
            <button
              style={{
                ...styles.actionButton,
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
              }}
            >
              <Eye size={16} />
              View All
            </button>
          </div>

          {lessonAnalytics.map((lesson) => (
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
                    <span style={{ color: getDifficultyColor(lesson.difficulty) }}>
                      {lesson.difficulty}
                    </span>
                    <span>•</span>
                    <span>{lesson.culturalElements} cultural elements</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={16} color="#f59e0b" fill="currentColor" />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>
                      {lesson.averageRating}
                    </span>
                  </div>
                </div>
              </div>

              <div style={styles.metricsGrid}>
                <div style={styles.metric}>
                  <div style={styles.metricValue}>{lesson.completionRate}%</div>
                  <div style={styles.metricLabel}>Completion</div>
                </div>
                <div style={styles.metric}>
                  <div style={styles.metricValue}>{lesson.studentEngagement}%</div>
                  <div style={styles.metricLabel}>Engagement</div>
                </div>
                <div style={styles.metric}>
                  <div style={styles.metricValue}>{lesson.culturalElements}</div>
                  <div style={styles.metricLabel}>Cultural</div>
                </div>
                <div style={styles.metric}>
                  <div style={styles.metricValue}>{lesson.averageRating}</div>
                  <div style={styles.metricLabel}>Rating</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Width Section - Cultural Integration Overview */}
      <div style={{ ...styles.section, ...styles.fullWidthSection }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <Sparkles size={20} color="#f59e0b" />
            Cultural Integration Overview
          </h2>
          <button
            style={{
              ...styles.actionButton,
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
            }}
          >
            <Calendar size={16} />
            View Timeline
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              }}
            >
              <Target size={24} color="white" />
            </div>
            <div style={styles.statValue}>92%</div>
            <div style={styles.statLabel}>Cultural Integration Score</div>
            <div style={{ ...styles.statChange, color: '#10b981' }}>
              <ArrowUp size={12} />
              +8% this month
            </div>
          </div>

          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              }}
            >
              <TrendingUp size={24} color="white" />
            </div>
            <div style={styles.statValue}>87%</div>
            <div style={styles.statLabel}>Student Engagement</div>
            <div style={{ ...styles.statChange, color: '#10b981' }}>
              <ArrowUp size={12} />
              +12% this month
            </div>
          </div>

          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              }}
            >
              <Clock size={24} color="white" />
            </div>
            <div style={styles.statValue}>24</div>
            <div style={styles.statLabel}>Active Students</div>
            <div style={{ ...styles.statChange, color: '#10b981' }}>
              <ArrowUp size={12} />
              +3 this week
            </div>
          </div>

          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              }}
            >
              <BarChart3 size={24} color="white" />
            </div>
            <div style={styles.statValue}>156</div>
            <div style={styles.statLabel}>Total Lessons</div>
            <div style={{ ...styles.statChange, color: '#10b981' }}>
              <ArrowUp size={12} />
              +23 this month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAnalyticsDashboard;
