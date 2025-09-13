import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Star, 
  Trophy, 
  Zap, 
  Target, 
  Users, 
  Clock, 
  Award,
  Play,
  CheckCircle,
  TrendingUp,
  Heart,
  Brain,
  Sparkles,
  Gamepad2,
  Calendar,
  Bell
} from 'lucide-react';
import CulturalIntegrationEnhancer from './CulturalIntegrationEnhancer';
import './EngagingStudentDashboard.css';

interface StudentStats {
  totalPoints: number;
  currentStreak: number;
  lessonsCompleted: number;
  achievements: number;
  culturalEngagement: number;
  weeklyGoal: number;
  weeklyProgress: number;
  level: number;
  xp: number;
  nextLevelXp: number;
}

interface LearningModule {
  id: string;
  title: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  culturalContent: boolean;
  completed: boolean;
  progress: number;
  points: number;
  icon: string;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  points: number;
}

const EngagingStudentDashboard: React.FC = () => {
  const [stats, setStats] = useState<StudentStats>({
    totalPoints: 1250,
    currentStreak: 7,
    lessonsCompleted: 24,
    achievements: 8,
    culturalEngagement: 92,
    weeklyGoal: 5,
    weeklyProgress: 3,
    level: 12,
    xp: 2400,
    nextLevelXp: 3000,
  });

  const [showTeReo, setShowTeReo] = useState(false);

  const [learningModules] = useState<LearningModule[]>([
    {
      id: '1',
      title: 'Māori Perspectives in Science',
      subject: 'Science',
      difficulty: 'intermediate',
      estimatedTime: 45,
      culturalContent: true,
      completed: false,
      progress: 60,
      points: 150,
      icon: '🌱',
      color: '#10b981'
    },
    {
      id: '2',
      title: 'Te Reo Mathematics',
      subject: 'Mathematics',
      difficulty: 'beginner',
      estimatedTime: 30,
      culturalContent: true,
      completed: false,
      progress: 0,
      points: 100,
      icon: '📐',
      color: '#3b82f6'
    },
    {
      id: '3',
      title: 'Cultural Storytelling',
      subject: 'English',
      difficulty: 'advanced',
      estimatedTime: 60,
      culturalContent: true,
      completed: true,
      progress: 100,
      points: 200,
      icon: '📚',
      color: '#8b5cf6'
    },
    {
      id: '4',
      title: 'Traditional Arts & Crafts',
      subject: 'Arts',
      difficulty: 'intermediate',
      estimatedTime: 90,
      culturalContent: true,
      completed: false,
      progress: 25,
      points: 180,
      icon: '🎨',
      color: '#f59e0b'
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Cultural Explorer',
      description: 'Complete 5 cultural modules',
      icon: '🌿',
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      points: 100
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      unlocked: true,
      progress: 7,
      maxProgress: 7,
      points: 150
    },
    {
      id: '3',
      title: 'Te Reo Champion',
      description: 'Complete 10 Te Reo lessons',
      icon: '🗣️',
      unlocked: false,
      progress: 7,
      maxProgress: 10,
      points: 200
    },
    {
      id: '4',
      title: 'Science Scholar',
      description: 'Master 3 science modules',
      icon: '🔬',
      unlocked: false,
      progress: 1,
      maxProgress: 3,
      points: 250
    }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'learning' | 'achievements' | 'progress'>('overview');

  const getLevelProgress = () => {
    return (stats.xp / stats.nextLevelXp) * 100;
  };

  const getWeeklyProgress = () => {
    return (stats.weeklyProgress / stats.weeklyGoal) * 100;
  };

  // // const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '🟢';
      case 'intermediate': return '🟡';
      case 'advanced': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="engaging-student-dashboard">
      {/* Header with Level and XP */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="student-info">
            <div className="avatar">
              <span className="avatar-emoji">🎓</span>
              <div className="level-badge">Lv.{stats.level}</div>
            </div>
            <div className="student-details">
              <h1>{showTeReo ? 'Kia ora, Ākonga! 🌟' : 'Kia ora, Student! 🌟'}</h1>
              <p>{showTeReo ? 'Kua rite koe mō te haerenga ako o tēnei rā?' : 'Ready for today\'s learning adventure?'}</p>
            </div>
            
            <div className="cultural-toggle">
              <button 
                className={`te-reo-toggle ${showTeReo ? 'active' : ''}`}
                onClick={() => setShowTeReo(!showTeReo)}
                title={showTeReo ? 'Switch to English' : 'Te Reo Māori'}
              >
                {showTeReo ? 'EN' : 'MĀ'}
              </button>
            </div>
          </div>
          
          <div className="xp-progress">
            <div className="xp-info">
              <span className="xp-current">{stats.xp}</span>
              <span className="xp-separator">/</span>
              <span className="xp-max">{stats.nextLevelXp}</span>
            </div>
            <div className="xp-bar">
              <div 
                className="xp-fill" 
                style={{ width: `${getLevelProgress()}%` }}
              ></div>
            </div>
            <div className="level-up-indicator">
              {getLevelProgress() > 80 && <Sparkles className="sparkle-icon" />}
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="stat-card points">
          <div className="stat-icon">
            <Star />
          </div>
          <div className="stat-content">
            <h3>Total Points</h3>
            <div className="stat-value">{stats.totalPoints.toLocaleString()}</div>
          </div>
        </div>

        <div className="stat-card streak">
          <div className="stat-icon">
            <Zap />
          </div>
          <div className="stat-content">
            <h3>Learning Streak</h3>
            <div className="stat-value">{stats.currentStreak} days</div>
          </div>
        </div>

        <div className="stat-card lessons">
          <div className="stat-icon">
            <BookOpen />
          </div>
          <div className="stat-content">
            <h3>Lessons Done</h3>
            <div className="stat-value">{stats.lessonsCompleted}</div>
          </div>
        </div>

        <div className="stat-card achievements">
          <div className="stat-icon">
            <Trophy />
          </div>
          <div className="stat-content">
            <h3>Achievements</h3>
            <div className="stat-value">{stats.achievements}</div>
          </div>
        </div>
      </section>

      {/* Weekly Goal Progress */}
      <section className="weekly-goal">
        <div className="goal-header">
          <h2>This Week's Goal</h2>
          <span className="goal-progress">{stats.weeklyProgress}/{stats.weeklyGoal} lessons</span>
        </div>
        <div className="goal-bar">
          <div 
            className="goal-fill" 
            style={{ width: `${getWeeklyProgress()}%` }}
          ></div>
        </div>
        <p className="goal-motivation">
          {getWeeklyProgress() >= 100 
            ? "🎉 Amazing! You've reached your weekly goal!" 
            : `Keep going! ${stats.weeklyGoal - stats.weeklyProgress} more lessons to reach your goal!`
          }
        </p>
      </section>

      {/* Navigation Tabs */}
      <nav className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Target />
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'learning' ? 'active' : ''}`}
          onClick={() => setActiveTab('learning')}
        >
          <BookOpen />
          Learning
        </button>
        <button 
          className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <Award />
          Achievements
        </button>
        <button 
          className={`tab ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <TrendingUp />
          Progress
        </button>
      </nav>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            {/* Cultural Integration Enhancer */}
            <CulturalIntegrationEnhancer 
              context="dashboard" 
              showTeReo={showTeReo}
              onCulturalElementClick={(element) => {
                console.log('Cultural element clicked:', element);
              }}
            />
            
            <div className="quick-actions">
              <h2>Continue Your Journey</h2>
              <div className="action-cards">
                {learningModules
                  .filter(module => !module.completed)
                  .slice(0, 2)
                  .map(module => (
                    <div key={module.id} className="action-card">
                      <div className="action-icon" /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: module.color }}>
                        {module.icon}
                      </div>
                      <div className="action-content">
                        <h3>{module.title}</h3>
                        <p>{module.subject} • {module.estimatedTime} min</p>
                        <div className="action-progress">
                          <div 
                            className="progress-bar"
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                        <button className="continue-btn">
                          <Play />
                          Continue
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="recent-achievements">
              <h2>Recent Achievements</h2>
              <div className="achievement-list">
                {achievements
                  .filter(achievement => achievement.unlocked)
                  .slice(0, 3)
                  .map(achievement => (
                    <div key={achievement.id} className="achievement-item unlocked">
                      <div className="achievement-icon">{achievement.icon}</div>
                      <div className="achievement-content">
                        <h4>{achievement.title}</h4>
                        <p>{achievement.description}</p>
                        <span className="achievement-points">+{achievement.points} points</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="learning-content">
            <h2>Your Learning Modules</h2>
            <div className="modules-grid">
              {learningModules.map(module => (
                <div key={module.id} className={`module-card ${module.completed ? 'completed' : ''}`}>
                  <div className="module-header">
                    <div className="module-icon" /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: module.color }}>
                      {module.icon}
                    </div>
                    <div className="module-info">
                      <h3>{module.title}</h3>
                      <p>{module.subject}</p>
                    </div>
                    <div className="module-status">
                      {module.completed ? (
                        <CheckCircle className="status-icon completed" />
                      ) : (
                        <div className="difficulty-indicator">
                          {getDifficultyIcon(module.difficulty)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="module-details">
                    <div className="module-meta">
                      <span className="time">
                        <Clock />
                        {module.estimatedTime} min
                      </span>
                      <span className="points">
                        <Star />
                        {module.points} pts
                      </span>
                      {module.culturalContent && (
                        <span className="cultural">
                          <Heart />
                          Cultural
                        </span>
                      )}
                    </div>
                    
                    <div className="module-progress">
                      <div className="progress-label">
                        Progress: {module.progress}%
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <button 
                      className={`module-btn ${module.completed ? 'completed' : 'start'}`}
                    >
                      {module.completed ? (
                        <>
                          <CheckCircle />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play />
                          {module.progress > 0 ? 'Continue' : 'Start'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-content">
            <h2>Your Achievements</h2>
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div key={achievement.id} className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                    <div className="achievement-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <div className="achievement-reward">
                      <Star />
                      {achievement.points} points
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="progress-content">
            <h2>Your Learning Progress</h2>
            <div className="progress-stats">
              <div className="progress-card">
                <h3>Cultural Engagement</h3>
                <div className="progress-circle">
                  <div className="circle-progress" style={{ '--progress': `${stats.culturalEngagement}%` } as React.CSSProperties}>
                    <span>{stats.culturalEngagement}%</span>
                  </div>
                </div>
                <p>Your engagement with Te Ao Māori content</p>
              </div>
              
              <div className="progress-card">
                <h3>Learning Streak</h3>
                <div className="streak-display">
                  <div className="streak-number">{stats.currentStreak}</div>
                  <div className="streak-label">days</div>
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
      </div>
    </div>
  );
};

export default EngagingStudentDashboard;
