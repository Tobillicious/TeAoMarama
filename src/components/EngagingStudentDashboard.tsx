import {
  Award,
  BookOpen,
  CheckCircle,
  MessageCircle,
  Play,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './EngagingStudentDashboard.css';

interface StudentStats {
  level: number;
  xp: number;
  nextLevelXp: number;
  weeklyProgress: number;
  weeklyGoal: number;
  totalPoints: number;
  streak: number;
  completedLessons: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  dateEarned?: string;
}

interface RecentActivity {
  id: string;
  type: 'lesson' | 'quiz' | 'assignment' | 'achievement';
  title: string;
  points: number;
  timestamp: string;
}

const EngagingStudentDashboard: React.FC = () => {
  const [stats, setStats] = useState<StudentStats>({
    level: 8,
    xp: 2450,
    nextLevelXp: 3000,
    weeklyProgress: 7,
    weeklyGoal: 10,
    totalPoints: 12450,
    streak: 12,
    completedLessons: 47,
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🌟',
      earned: true,
      dateEarned: '2024-01-15',
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Complete 7 lessons in a week',
      icon: '⚡',
      earned: true,
      dateEarned: '2024-01-20',
    },
    {
      id: '3',
      title: 'Perfect Score',
      description: 'Get 100% on a quiz',
      icon: '🎯',
      earned: false,
    },
    {
      id: '4',
      title: 'Social Learner',
      description: 'Participate in 5 discussions',
      icon: '💬',
      earned: false,
    },
  ]);

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'lesson',
      title: 'Māori Culture and Traditions',
      points: 150,
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      type: 'quiz',
      title: 'Mathematics: Fractions',
      points: 200,
      timestamp: '1 day ago',
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Week Warrior',
      points: 500,
      timestamp: '2 days ago',
    },
    {
      id: '4',
      type: 'lesson',
      title: 'Science: Ecosystems',
      points: 175,
      timestamp: '3 days ago',
    },
  ]);

  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements' | 'progress'>(
    'overview',
  );

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        xp: prev.xp + Math.floor(Math.random() * 10),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getXpPercentage = () => {
    return (stats.xp / stats.nextLevelXp) * 100;
  };

  const getWeeklyProgressPercentage = () => {
    return (stats.weeklyProgress / stats.weeklyGoal) * 100;
  };

  const getLevelIcon = (level: number) => {
    switch (true) {
      case level >= 10:
        return '👑';
      case level >= 7:
        return '⭐';
      case level >= 4:
        return '🌟';
      case level >= 2:
        return '⭐';
      default:
        return '⚪';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-4 h-4" />;
      case 'quiz':
        return <Target className="w-4 h-4" />;
      case 'assignment':
        return <Users className="w-4 h-4" />;
      case 'achievement':
        return <Award className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="engaging-student-dashboard">
      {/* Header with Level and XP */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="student-info">
            <div className="level-display">
              <span className="level-icon">{getLevelIcon(stats.level)}</span>
              <div className="level-details">
                <h1>Level {stats.level}</h1>
                <p>{stats.xp.toLocaleString()} XP</p>
              </div>
            </div>
            <div className="xp-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${getXpPercentage()}%` }}></div>
              </div>
              <span className="xp-remaining">{stats.nextLevelXp - stats.xp} XP to next level</span>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <Trophy className="stat-icon" />
              <span>{stats.totalPoints.toLocaleString()}</span>
              <small>Total Points</small>
            </div>
            <div className="stat-item">
              <Zap className="stat-icon" />
              <span>{stats.streak}</span>
              <small>Day Streak</small>
            </div>
            <div className="stat-item">
              <BookOpen className="stat-icon" />
              <span>{stats.completedLessons}</span>
              <small>Lessons</small>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button
          className={`nav-tab ${selectedTab === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedTab('overview')}
        >
          <Star className="tab-icon" />
          Overview
        </button>
        <button
          className={`nav-tab ${selectedTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setSelectedTab('achievements')}
        >
          <Award className="tab-icon" />
          Achievements
        </button>
        <button
          className={`nav-tab ${selectedTab === 'progress' ? 'active' : ''}`}
          onClick={() => setSelectedTab('progress')}
        >
          <TrendingUp className="tab-icon" />
          Progress
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {selectedTab === 'overview' && (
          <div className="overview-section">
            {/* Quick Actions */}
            <section className="quick-actions">
              <h2>Continue Learning</h2>
              <div className="action-cards">
                <div className="action-card">
                  <BookOpen className="action-icon" />
                  <h3>Māori Culture</h3>
                  <p>Continue your cultural journey</p>
                  <button className="action-button">
                    <Play className="w-4 h-4" />
                    Resume
                  </button>
                </div>
                <div className="action-card">
                  <Target className="action-icon" />
                  <h3>Math Challenge</h3>
                  <p>Test your problem-solving skills</p>
                  <button className="action-button">
                    <Play className="w-4 h-4" />
                    Start Quiz
                  </button>
                </div>
                <div className="action-card">
                  <Users className="action-icon" />
                  <h3>Group Study</h3>
                  <p>Join your classmates</p>
                  <button className="action-button">
                    <MessageCircle className="w-4 h-4" />
                    Join
                  </button>
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                    <div className="activity-content">
                      <h4>{activity.title}</h4>
                      <p className="activity-time">{activity.timestamp}</p>
                    </div>
                    <div className="activity-points">+{activity.points}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {selectedTab === 'achievements' && (
          <div className="achievements-section">
            <h2>Your Achievements</h2>
            <div className="achievements-grid">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                  {achievement.earned && (
                    <div className="achievement-date">
                      <CheckCircle className="w-4 h-4" />
                      <span>Earned {achievement.dateEarned}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'progress' && (
          <div className="progress-section">
            <h2>Your Progress</h2>
            <div className="progress-stats">
              <div className="progress-card">
                <h3>Weekly Goal</h3>
                <div className="progress-display">
                  <div className="circular-progress">
                    <div className="progress-circle">
                      <span className="progress-text">
                        {stats.weeklyProgress}/{stats.weeklyGoal}
                      </span>
                    </div>
                  </div>
                </div>
                <p>Keep the momentum going!</p>
              </div>

              <div className="progress-card">
                <h3>Total Points</h3>
                <div className="points-display">
                  <Star />
                  <span>{stats.totalPoints.toLocaleString()}</span>
                </div>
                <p>Earned through learning activities</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EngagingStudentDashboard;
