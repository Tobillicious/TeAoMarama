import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Star,
  Clock,
  Play,
  CheckCircle,
  Heart,
  Users,
  Zap,
  Trophy,
  Sparkles,
  Flame,
  Calendar,
  BarChart3,
} from 'lucide-react';
import styles from './StudentDashboard.module.css';

// Merged and enhanced interfaces from all versions
interface StudentStats {
  level: number;
  xp: number;
  nextLevelXp: number;
  totalPoints: number;
  currentStreak: number;
  lessonsCompleted: number;
  totalLessons: number;
  achievements: number;
  culturalEngagement: number;
  teReoProficiency: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface Lesson {
  id: string;
  title: string;
  subject: string;
  progress: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  culturalElements: number;
  completed: boolean;
  type: 'tikanga' | 'te-reo' | 'whakapapa' | 'science';
  thumbnail: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UpcomingAssignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
}

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showTeReo, setShowTeReo] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data synthesized from all versions
  const [stats] = useState<StudentStats>({
    level: 12,
    xp: 2400,
    nextLevelXp: 3000,
    totalPoints: 1250,
    currentStreak: 12,
    lessonsCompleted: 47,
    totalLessons: 63,
    achievements: 8,
    culturalEngagement: 92,
    teReoProficiency: 85,
    weeklyGoal: 5,
    weeklyProgress: 3,
  });

  const [lessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Te Tiriti o Waitangi Unit',
      subject: 'Social Studies',
      progress: 85,
      duration: '4-6 weeks',
      difficulty: 'intermediate',
      culturalElements: 12,
      completed: false,
      type: 'tikanga',
      thumbnail: '🌿',
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
      type: 'science',
      thumbnail: '🐦',
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
      type: 'te-reo',
      thumbnail: '📐',
    },
  ]);

  const [achievements] = useState<Achievement[]>([
    { id: '1', title: 'Cultural Explorer', description: 'Completed 5 cultural modules', icon: '🌿', unlocked: true, points: 100, rarity: 'common' },
    { id: '2', title: 'Te Reo Champion', description: 'Maintained 10-day streak', icon: '⭐', unlocked: true, points: 150, rarity: 'rare' },
    { id: '3', title: 'Whakapapa Keeper', description: 'Traced family lineage', icon: '🌳', unlocked: false, points: 200, rarity: 'epic' },
    { id: '4', title: 'Kaitiaki Guardian', description: 'Environmental project leadership', icon: '🌍', unlocked: false, points: 250, rarity: 'legendary' },
  ]);
  
  const [assignments] = useState<UpcomingAssignment[]>([
      { id: '1', title: 'Whakapapa Presentation', subject: 'Cultural Studies', dueDate: 'Tomorrow', priority: 'high', progress: 75 },
      { id: '2', title: 'Te Reo Conversation', subject: 'Language Arts', dueDate: 'Friday', priority: 'medium', progress: 40 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getLevelProgress = () => (stats.xp / stats.nextLevelXp) * 100;
  const getWeeklyProgress = () => (stats.weeklyProgress / stats.weeklyGoal) * 100;

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (showTeReo) {
      if (hour < 12) return 'Ata mārie, Ākonga! 🌅';
      if (hour < 17) return 'Rā mārie, Ākonga! ☀️';
      return 'Pō mārie, Ākonga! 🌙';
    }
    return hour < 12 ? 'Good morning, Student! 🌅' : hour < 17 ? 'Good afternoon, Student! ☀️' : 'Good evening, Student! 🌙';
  };

  const getDifficultyClass = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    if (difficulty === 'beginner') return styles.beginner;
    if (difficulty === 'intermediate') return styles.intermediate;
    return styles.advanced;
  };
  
  const getRarityClass = (rarity: 'common' | 'rare' | 'epic' | 'legendary') => {
    if (rarity === 'common') return styles.common;
    if (rarity === 'rare') return styles.rare;
    if (rarity === 'epic') return styles.epic;
    return styles.legendary;
  };

  const getPriorityClass = (priority: 'high' | 'medium' | 'low') => {
    if (priority === 'high') return styles.high;
    if (priority === 'medium') return styles.medium;
    return styles.low;
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.studentInfo}>
            <div className={styles.avatar}>
              🎓
              <div className={styles.levelBadge}>Lv.{stats.level}</div>
            </div>
            <div>
              <h1 className={styles.welcome}>{getGreeting()}</h1>
              <p className={styles.subtitle}>
                {showTeReo ? 'Kua rite koe mō te haerenga ako o tēnei rā?' : "Ready for today's learning adventure?"}
              </p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              className={`${styles.toggleButton} ${showTeReo ? styles.activeToggle : ''}`}
              onClick={() => setShowTeReo(!showTeReo)}
              title={showTeReo ? 'Switch to English' : 'Te Reo Māori'}
            >
              {showTeReo ? 'EN' : 'MĀ'}
            </button>
            <div className={styles.xpProgress}>
              <div className={styles.xpInfo}>
                <span>{stats.xp}</span> / <span>{stats.nextLevelXp} XP</span>
              </div>
              <div className={styles.xpBar}>
                <div className={styles.xpFill} style={{ width: `${getLevelProgress()}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <section className={styles.statsOverview}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Star /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalPoints}</div>
            <div className={styles.statLabel}>Total Points</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Flame /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.currentStreak}</div>
            <div className={styles.statLabel}>Day Streak</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><BookOpen /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.lessonsCompleted}</div>
            <div className={styles.statLabel}>Lessons Done</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Trophy /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.achievements}</div>
            <div className={styles.statLabel}>Achievements</div>
          </div>
        </div>
      </section>

      <div className={styles.contentGrid}>
        {/* Main Content */}
        <main className={styles.mainContent}>
          <nav className={styles.tabs}>
            <button className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`} onClick={() => setActiveTab('overview')}><BarChart3 size={16} /> Overview</button>
            <button className={`${styles.tab} ${activeTab === 'learning' ? styles.activeTab : ''}`} onClick={() => setActiveTab('learning')}><BookOpen size={16} /> My Learning</button>
            <button className={`${styles.tab} ${activeTab === 'assignments' ? styles.activeTab : ''}`} onClick={() => setActiveTab('assignments')}><Target size={16} /> Assignments</button>
          </nav>

          <div className={styles.tabContent}>
            {activeTab === 'overview' && (
              <section>
                <h2 className={styles.sectionTitle}>Continue Your Journey</h2>
                {lessons.filter(l => !l.completed).map(lesson => (
                  <div key={lesson.id} className={styles.lessonCard}>
                    <div className={styles.lessonHeader}>
                      <div className={styles.lessonThumbnail}>{lesson.thumbnail}</div>
                      <div>
                        <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                        <div className={styles.lessonMeta}>
                          <span>{lesson.subject}</span> • <span>{lesson.duration}</span> • <span className={getDifficultyClass(lesson.difficulty)}>{lesson.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.lessonProgress}>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${lesson.progress}%` }}></div>
                      </div>
                      <span>{lesson.progress}% complete</span>
                    </div>
                    <button className={styles.actionButton}><Play size={16} /> Continue Lesson</button>
                  </div>
                ))}
              </section>
            )}
            {activeTab === 'learning' && (
              <section>
                <h2 className={styles.sectionTitle}>All Lessons</h2>
                {lessons.map(lesson => (
                  <div key={lesson.id} className={`${styles.lessonCard} ${lesson.completed ? styles.completed : ''}`}>
                     <div className={styles.lessonHeader}>
                      <div className={styles.lessonThumbnail}>{lesson.thumbnail}</div>
                      <div>
                        <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                        <div className={styles.lessonMeta}>
                          <span>{lesson.subject}</span> • <span>{lesson.duration}</span> • <span className={getDifficultyClass(lesson.difficulty)}>{lesson.difficulty}</span>
                        </div>
                      </div>
                      {lesson.completed && <div className={styles.completedBadge}><CheckCircle size={16}/> Completed</div>}
                    </div>
                  </div>
                ))}
              </section>
            )}
            {activeTab === 'assignments' && (
              <section>
                <h2 className={styles.sectionTitle}>Upcoming Assignments</h2>
                {assignments.map(assignment => (
                  <div key={assignment.id} className={styles.assignmentCard}>
                    <div>
                      <h3 className={styles.assignmentTitle}>{assignment.title}</h3>
                      <div className={styles.assignmentMeta}>
                        <span>{assignment.subject}</span> • <span className={getPriorityClass(assignment.priority)}>{assignment.priority} priority</span>
                      </div>
                    </div>
                    <div className={styles.assignmentDue}>Due: {assignment.dueDate}</div>
                  </div>
                ))}
              </section>
            )}
          </div>
        </main>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h2 className={styles.sectionTitle}>Weekly Goal</h2>
            <div className={styles.weeklyGoal}>
              <div className={styles.goalInfo}>
                <span>{stats.weeklyProgress} / {stats.weeklyGoal} lessons</span>
                <span>{getWeeklyProgress().toFixed(0)}%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${getWeeklyProgress()}%` }}></div>
              </div>
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h2 className={styles.sectionTitle}>Achievements</h2>
            {achievements.filter(a => a.unlocked).slice(0, 3).map(ach => (
              <div key={ach.id} className={`${styles.achievementCard} ${getRarityClass(ach.rarity)}`}>
                <div className={styles.achievementIcon}>{ach.icon}</div>
                <div>
                  <h4 className={styles.achievementTitle}>{ach.title}</h4>
                  <p className={styles.achievementDesc}>{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.sidebarSection}>
            <h2 className={styles.sectionTitle}>Cultural Progress</h2>
            <div className={styles.culturalProgress}>
                <div className={styles.progressCircle} style={{'--progress': `${stats.culturalEngagement}%`} as React.CSSProperties}>
                    <span>{stats.culturalEngagement}%</span>
                </div>
                <p>Cultural Engagement</p>
            </div>
             <div className={styles.culturalProgress}>
                <div className={styles.progressCircle} style={{'--progress': `${stats.teReoProficiency}%`} as React.CSSProperties}>
                    <span>{stats.teReoProficiency}%</span>
                </div>
                <p>Te Reo Proficiency</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StudentDashboard;
