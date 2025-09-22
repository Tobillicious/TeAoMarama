import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle,
  Play,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';

interface Lesson {
  id: string;
  title: string;
  subject: string;
  progress: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  culturalElements: number;
  completed: boolean;
  nextDue: string;
  rating: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress: number;
  maxProgress: number;
}

const BeautifulStudentDashboard: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Te Tiriti o Waitangi Unit',
      subject: 'Social Studies',
      progress: 85,
      duration: '4-6 weeks',
      difficulty: 'intermediate',
      culturalElements: 12,
      completed: false,
      nextDue: 'Tomorrow',
      rating: 4.8,
    },
    {
      id: '2',
      title: 'Kākāpō Conservation Science',
      subject: 'Science',
      progress: 45,
      duration: '3-4 weeks',
      difficulty: 'beginner',
      culturalElements: 8,
      completed: false,
      nextDue: 'Next week',
      rating: 4.6,
    },
    {
      id: '3',
      title: 'Māori Patterns in Mathematics',
      subject: 'Mathematics',
      progress: 100,
      duration: '2-3 weeks',
      difficulty: 'intermediate',
      culturalElements: 15,
      completed: true,
      nextDue: 'Completed',
      rating: 4.9,
    },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Cultural Explorer',
      description: 'Complete 5 lessons with cultural elements',
      icon: '🌟',
      earned: true,
      progress: 5,
      maxProgress: 5,
    },
    {
      id: '2',
      title: 'Math Master',
      description: 'Complete all mathematics lessons',
      icon: '🧮',
      earned: false,
      progress: 1,
      maxProgress: 3,
    },
    {
      id: '3',
      title: 'Science Scholar',
      description: 'Complete 3 science lessons',
      icon: '🔬',
      earned: false,
      progress: 1,
      maxProgress: 3,
    },
  ]);

  const [stats, setStats] = useState({
    totalLessons: 12,
    completedLessons: 8,
    averageRating: 4.7,
    culturalPoints: 156,
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
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginTop: '24px',
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
    achievementCard: {
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
    achievementIcon: {
      fontSize: '32px',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '12px',
    },
    achievementInfo: {
      flex: 1,
    },
    achievementTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '4px',
    },
    achievementDescription: {
      fontSize: '14px',
      color: '#6b7280',
    },
    achievementProgress: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '4px',
    },
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
        <div>
          <h1 style={styles.welcome}>Kia ora, Aroha! 👋</h1>
          <p style={styles.subtitle}>Ready to continue your learning journey with Te Ao Mārama?</p>
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
            <div style={styles.statValue}>
              {stats.completedLessons}/{stats.totalLessons}
            </div>
            <div style={styles.statLabel}>Lessons Completed</div>
          </div>

          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              }}
            >
              <Star size={24} color="white" />
            </div>
            <div style={styles.statValue}>{stats.averageRating}</div>
            <div style={styles.statLabel}>Average Rating</div>
          </div>

          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              }}
            >
              <Sparkles size={24} color="white" />
            </div>
            <div style={styles.statValue}>{stats.culturalPoints}</div>
            <div style={styles.statLabel}>Cultural Points</div>
          </div>

          <div style={styles.statCard}>
            <div
              style={{
                ...styles.statIcon,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              }}
            >
              <Award size={24} color="white" />
            </div>
            <div style={styles.statValue}>3</div>
            <div style={styles.statLabel}>Achievements</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.contentGrid}>
        <div style={styles.mainContent}>
          {/* My Lessons */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <BookOpen size={20} color="#3b82f6" />
                My Lessons
              </h2>
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
                    {lesson.completed && (
                      <div
                        style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: 'white',
                        }}
                      >
                        <CheckCircle size={12} />
                      </div>
                    )}
                  </div>
                </div>

                <div style={styles.lessonProgress}>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${lesson.progress}%`,
                      }}
                    />
                  </div>
                  <div style={styles.progressText}>
                    <span>{lesson.progress}% complete</span>
                    <span>Next due: {lesson.nextDue}</span>
                  </div>
                </div>

                {!lesson.completed && (
                  <button
                    style={{
                      ...styles.actionButton,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      color: 'white',
                      marginTop: '12px',
                    }}
                  >
                    <Play size={16} />
                    Continue Lesson
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Achievements */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <Award size={20} color="#f59e0b" />
                Achievements
              </h2>
            </div>

            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                style={{
                  ...styles.achievementCard,
                  opacity: achievement.earned ? 1 : 0.6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.background = 'rgba(249, 250, 251, 0.8)';
                }}
              >
                <div style={styles.achievementIcon}>{achievement.icon}</div>
                <div style={styles.achievementInfo}>
                  <div style={styles.achievementTitle}>{achievement.title}</div>
                  <div style={styles.achievementDescription}>{achievement.description}</div>
                  {!achievement.earned && (
                    <div style={styles.achievementProgress}>
                      {achievement.progress}/{achievement.maxProgress} completed
                    </div>
                  )}
                </div>
                {achievement.earned && (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'white',
                    }}
                  >
                    <CheckCircle size={12} />
                  </div>
                )}
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
                <Play size={16} />
                Start New Lesson
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
                View Progress
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
                Study Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulStudentDashboard;
