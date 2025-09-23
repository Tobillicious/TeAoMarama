import React, { useState, useEffect, useMemo } from 'react';
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
  Map,
  Compass,
  Mountain,
  Leaf,
  Sun,
  Moon,
  Eye,
} from 'lucide-react';
import styles from './EnhancedStudentDashboard.module.css';

// Enhanced interfaces for comprehensive student experience
interface StudentProfile {
  id: string;
  name: string;
  yearLevel: number;
  iwi?: string;
  preferredLanguage: 'en' | 'mi';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  culturalConnection: number; // 0-100
}

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
  maoriWordsLearned: number;
  communityConnections: number;
}

interface CulturalLearningModule {
  id: string;
  title: string;
  titleMaori: string;
  subject: string;
  progress: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  culturalElements: string[];
  completed: boolean;
  type: 'tikanga' | 'te-reo' | 'whakapapa' | 'science' | 'mathematics' | 'social-studies';
  thumbnail: string;
  nzCurriculumLevel: number;
  realWorldContext: string;
  whanuSupport: boolean;
}

interface CulturalAchievement {
  id: string;
  title: string;
  titleMaori: string;
  description: string;
  descriptionMaori: string;
  icon: string;
  unlocked: boolean;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  culturalSignificance: string;
  dateUnlocked?: string;
}

interface WhanuConnection {
  id: string;
  type: 'parent' | 'caregiver' | 'whanau' | 'teacher' | 'mentor';
  name: string;
  lastContact: string;
  supportLevel: 'high' | 'medium' | 'low';
  culturalRole?: string;
}

const EnhancedStudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('journey');
  const [showTeReo, setShowTeReo] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock student profile - in real app would come from auth/database
  const [studentProfile] = useState<StudentProfile>({
    id: '1',
    name: 'Aroha Patel',
    yearLevel: 8,
    iwi: 'Ngāti Tūwharetoa',
    preferredLanguage: 'en',
    learningStyle: 'visual',
    culturalConnection: 85,
  });

  // Enhanced stats for authentic learning journey
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
    maoriWordsLearned: 156,
    communityConnections: 4,
  });

  // Real NZ curriculum-aligned learning modules with cultural integration
  const [learningModules] = useState<CulturalLearningModule[]>([
    {
      id: '1',
      title: 'Te Tiriti o Waitangi: Foundation of Aotearoa',
      titleMaori: 'Te Tiriti o Waitangi: Te Tūāpapa o Aotearoa',
      subject: 'Social Studies',
      progress: 85,
      duration: '4-6 weeks',
      difficulty: 'intermediate',
      culturalElements: ['Treaty principles', 'Sovereignty', 'Partnership', 'Te reo Māori'],
      completed: false,
      type: 'social-studies',
      thumbnail: '🌿',
      nzCurriculumLevel: 4,
      realWorldContext: 'Understanding contemporary NZ society and governance',
      whanuSupport: true,
    },
    {
      id: '2',
      title: 'Kākāpō Conservation: Science in Action',
      titleMaori: 'Tiaki Kākāpō: Pūtaiao i te Mahi',
      subject: 'Science',
      progress: 65,
      duration: '3-4 weeks',
      difficulty: 'beginner',
      culturalElements: ['Kaitiakitanga', 'Native species', 'Conservation ethics'],
      completed: false,
      type: 'science',
      thumbnail: '🐦',
      nzCurriculumLevel: 3,
      realWorldContext: 'Working with Department of Conservation programs',
      whanuSupport: false,
    },
    {
      id: '3',
      title: 'Māori Geometric Patterns in Mathematics',
      titleMaori: 'Ngā Tahua Tapatoru Māori i te Pāngarau',
      subject: 'Mathematics',
      progress: 100,
      duration: '2-3 weeks',
      difficulty: 'intermediate',
      culturalElements: ['Kowhaiwhai', 'Tukutuku patterns', 'Sacred geometry'],
      completed: true,
      type: 'mathematics',
      thumbnail: '📐',
      nzCurriculumLevel: 4,
      realWorldContext: 'Designing for marae and community buildings',
      whanuSupport: true,
    },
    {
      id: '4',
      title: 'Storytelling Traditions: Pūrākau and Narrative',
      titleMaori: 'Ngā Tikanga Kōrero: Pūrākau me ngā Kōrero',
      subject: 'English',
      progress: 35,
      duration: '5-6 weeks',
      difficulty: 'advanced',
      culturalElements: ['Oral tradition', 'Whakapapa', 'Cultural metaphors'],
      completed: false,
      type: 'te-reo',
      thumbnail: '📖',
      nzCurriculumLevel: 5,
      realWorldContext: 'Preserving and sharing community stories',
      whanuSupport: true,
    },
  ]);

  // Meaningful cultural achievements with authentic significance
  const [achievements] = useState<CulturalAchievement[]>([
    {
      id: '1',
      title: 'Cultural Explorer',
      titleMaori: 'Kaitirotiro Ahurea',
      description: 'Completed 5 cultural learning modules with deep understanding',
      descriptionMaori: 'I whakaoti ai i ngā akomanga ahurea 5 me te mārama hōhonu',
      icon: '🌿',
      unlocked: true,
      points: 100,
      rarity: 'common',
      culturalSignificance: 'Beginning to understand Te Ao Māori perspectives',
      dateUnlocked: '2024-11-15',
    },
    {
      id: '2',
      title: 'Te Reo Champion',
      titleMaori: 'Toa Te Reo',
      description: 'Maintained 10-day Te Reo learning streak',
      descriptionMaori: 'I tiaki ai i te raina ako Te Reo 10 rā',
      icon: '⭐',
      unlocked: true,
      points: 150,
      rarity: 'rare',
      culturalSignificance: 'Commitment to language revitalisation',
      dateUnlocked: '2024-11-20',
    },
    {
      id: '3',
      title: 'Whakapapa Keeper',
      titleMaori: 'Kaitiaki Whakapapa',
      description: 'Researched and documented family connections',
      descriptionMaori: 'I rangahau ai, i tuhituhi hoki ngā hononga whānau',
      icon: '🌳',
      unlocked: false,
      points: 200,
      rarity: 'epic',
      culturalSignificance: 'Understanding genealogical connections to whenua',
    },
    {
      id: '4',
      title: 'Kaitiaki Guardian',
      titleMaori: 'Kaitiaki Tiaki',
      description: 'Led environmental project showing kaitiakitanga',
      descriptionMaori: 'I arahi ai i te kaupapa taiao whakaatu kaitiakitanga',
      icon: '🌍',
      unlocked: false,
      points: 250,
      rarity: 'legendary',
      culturalSignificance: 'Demonstrating guardianship responsibilities',
    },
  ]);

  // Whānau and community connections for holistic support
  const [whanuConnections] = useState<WhanuConnection[]>([
    {
      id: '1',
      type: 'parent',
      name: 'Mere Patel',
      lastContact: '2 hours ago',
      supportLevel: 'high',
      culturalRole: 'Cultural knowledge keeper',
    },
    {
      id: '2',
      type: 'teacher',
      name: 'Mr. Thompson',
      lastContact: '1 day ago',
      supportLevel: 'high',
    },
    {
      id: '3',
      type: 'mentor',
      name: 'Koro Jim',
      lastContact: '3 days ago',
      supportLevel: 'medium',
      culturalRole: 'Te reo tutor',
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Age-appropriate interface adaptation
  const isPrimaryStudent = studentProfile.yearLevel <= 6;
  const isSecondaryStudent = studentProfile.yearLevel >= 7;

  // Dynamic content based on year level and cultural preferences
  const getContextualGreeting = () => {
    const hour = currentTime.getHours();
    const timeGreeting = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
    
    if (showTeReo) {
      const greetings = {
        morning: 'Ata mārie',
        afternoon: 'Rā mārie', 
        evening: 'Pō mārie'
      };
      return `${greetings[timeGreeting]}, ${studentProfile.name}! 🌅`;
    }
    
    const encouragements = isPrimaryStudent 
      ? ['Amazing learner', 'Curious explorer', 'Bright star', 'Cultural champion']
      : ['Dedicated scholar', 'Future leader', 'Critical thinker', 'Change maker'];
    
    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    return `Good ${timeGreeting}, ${randomEncouragement}! 🌟`;
  };

  const getProgressMotivation = () => {
    if (showTeReo) {
      return 'Kaua e mutu! He roa ai tō haere!';
    }
    
    return isPrimaryStudent 
      ? "You're doing amazing! Keep exploring and learning!"
      : "Excellent progress! Your dedication to learning inspires others.";
  };

  // Progress calculations
  const getLevelProgress = () => (stats.xp / stats.nextLevelXp) * 100;
  const getWeeklyProgress = () => (stats.weeklyProgress / stats.weeklyGoal) * 100;
  const getCulturalProficiency = () => (stats.teReoProficiency + stats.culturalEngagement) / 2;

  // Visual elements based on year level
  const cardClassName = isPrimaryStudent ? styles.primaryCard : styles.secondaryCard;
  const headerClassName = isPrimaryStudent ? styles.primaryHeader : styles.secondaryHeader;

  return (
    <div className={`${styles.dashboardContainer} ${isPrimaryStudent ? styles.primary : styles.secondary}`}>
      {/* Enhanced Cultural Header */}
      <header className={`${styles.header} ${headerClassName}`}>
        <div className={styles.headerContent}>
          <div className={styles.studentInfo}>
            <div className={styles.avatar}>
              {isPrimaryStudent ? '🎓' : '🎯'}
              <div className={styles.levelBadge}>
                {showTeReo ? 'Taumata' : 'Level'} {stats.level}
              </div>
              {studentProfile.iwi && (
                <div className={styles.iwiConnection}>{studentProfile.iwi}</div>
              )}
            </div>
            <div>
              <h1 className={styles.welcome}>{getContextualGreeting()}</h1>
              <p className={styles.subtitle}>{getProgressMotivation()}</p>
              {studentProfile.iwi && (
                <p className={styles.culturalConnection}>
                  {showTeReo ? 'Whakapapa:' : 'Connected to:'} {studentProfile.iwi}
                </p>
              )}
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              className={`${styles.toggleButton} ${showTeReo ? styles.activeToggle : ''}`}
              onClick={() => setShowTeReo(!showTeReo)}
              title={showTeReo ? 'Switch to English' : 'Kōrero Māori'}
            >
              {showTeReo ? 'EN' : 'MĀ'}
            </button>
            <div className={styles.xpProgress}>
              <div className={styles.xpInfo}>
                <span>{stats.xp}</span> / <span>{stats.nextLevelXp} XP</span>
                <Eye className={styles.visibilityIcon} size={16} />
              </div>
              <div className={styles.xpBar}>
                <div className={styles.xpFill} style={{ width: `${getLevelProgress()}%` }}></div>
              </div>
              <span className={styles.progressText}>
                {showTeReo ? 'Ki te taumata hou' : 'To next level'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Cultural Stats Overview */}
      <section className={styles.statsOverview}>
        <div className={`${styles.statCard} ${cardClassName}`}>
          <div className={styles.statIcon}><Star /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalPoints}</div>
            <div className={styles.statLabel}>
              {showTeReo ? 'Ngā Mata' : 'Total Points'}
            </div>
          </div>
        </div>
        <div className={`${styles.statCard} ${cardClassName}`}>
          <div className={styles.statIcon}><Flame /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.currentStreak}</div>
            <div className={styles.statLabel}>
              {showTeReo ? 'Raina Rā' : 'Day Streak'}
            </div>
          </div>
        </div>
        <div className={`${styles.statCard} ${cardClassName}`}>
          <div className={styles.statIcon}><Leaf /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.maoriWordsLearned}</div>
            <div className={styles.statLabel}>
              {showTeReo ? 'Kupu Māori' : 'Māori Words'}
            </div>
          </div>
        </div>
        <div className={`${styles.statCard} ${cardClassName}`}>
          <div className={styles.statIcon}><Users /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.communityConnections}</div>
            <div className={styles.statLabel}>
              {showTeReo ? 'Hononga Hapori' : 'Community Links'}
            </div>
          </div>
        </div>
      </section>

      <div className={styles.contentGrid}>
        {/* Main Learning Journey */}
        <main className={styles.mainContent}>
          <nav className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'journey' ? styles.activeTab : ''}`} 
              onClick={() => setActiveTab('journey')}
            >
              <Compass size={16} /> 
              {showTeReo ? 'Takahanga' : 'My Journey'}
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'learning' ? styles.activeTab : ''}`} 
              onClick={() => setActiveTab('learning')}
            >
              <BookOpen size={16} /> 
              {showTeReo ? 'Ako' : 'Learning'}
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'whanau' ? styles.activeTab : ''}`} 
              onClick={() => setActiveTab('whanau')}
            >
              <Heart size={16} /> 
              {showTeReo ? 'Whānau' : 'Family'}
            </button>
          </nav>

          <div className={styles.tabContent}>
            {activeTab === 'journey' && (
              <section>
                <h2 className={styles.sectionTitle}>
                  {showTeReo ? 'Whakamua tō Takahanga' : 'Continue Your Learning Journey'}
                </h2>
                
                {/* Cultural Learning Path Visualization */}
                <div className={styles.learningPath}>
                  <div className={styles.pathHeader}>
                    <Mountain className={styles.pathIcon} />
                    <span>
                      {showTeReo ? 'Tō Ara Ako' : 'Your Learning Path'}
                    </span>
                  </div>
                </div>

                {learningModules.filter(module => !module.completed).map(module => (
                  <div key={module.id} className={`${styles.moduleCard} ${cardClassName}`}>
                    <div className={styles.moduleHeader}>
                      <div className={styles.moduleThumbnail}>{module.thumbnail}</div>
                      <div className={styles.moduleInfo}>
                        <h3 className={styles.moduleTitle}>
                          {showTeReo ? module.titleMaori : module.title}
                        </h3>
                        <div className={styles.moduleMeta}>
                          <span>{module.subject}</span> • 
                          <span>{module.duration}</span> • 
                          <span className={styles[module.difficulty]}>{module.difficulty}</span>
                          {module.whanuSupport && (
                            <span className={styles.whanuSupport}>
                              <Heart size={12} /> 
                              {showTeReo ? 'Tautoko Whānau' : 'Whānau Support'}
                            </span>
                          )}
                        </div>
                        <div className={styles.culturalElements}>
                          {module.culturalElements.slice(0, 3).map((element, idx) => (
                            <span key={idx} className={styles.culturalTag}>
                              🌿 {element}
                            </span>
                          ))}
                        </div>
                        <div className={styles.realWorldContext}>
                          <Compass size={14} />
                          <span>{module.realWorldContext}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.moduleProgress}>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${module.progress}%` }}></div>
                      </div>
                      <span>{module.progress}% {showTeReo ? 'oti' : 'complete'}</span>
                    </div>
                    <button className={`${styles.actionButton} ${isPrimaryStudent ? styles.primaryButton : styles.secondaryButton}`}>
                      <Play size={16} /> 
                      {showTeReo ? 'Haere Tonu' : 'Continue Learning'}
                    </button>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'learning' && (
              <section>
                <h2 className={styles.sectionTitle}>
                  {showTeReo ? 'Katoa ngā Akomanga' : 'All Learning Modules'}
                </h2>
                
                <div className={styles.curriculumLevel}>
                  <Target className={styles.curriculumIcon} />
                  <span>
                    {showTeReo ? 'Taumata' : 'NZ Curriculum Level'}: {studentProfile.yearLevel <= 2 ? '1' : studentProfile.yearLevel <= 4 ? '2-3' : studentProfile.yearLevel <= 6 ? '3-4' : studentProfile.yearLevel <= 8 ? '4-5' : '5-6'}
                  </span>
                </div>

                {learningModules.map(module => (
                  <div key={module.id} className={`${styles.moduleCard} ${cardClassName} ${module.completed ? styles.completed : ''}`}>
                    <div className={styles.moduleHeader}>
                      <div className={styles.moduleThumbnail}>{module.thumbnail}</div>
                      <div className={styles.moduleInfo}>
                        <h3 className={styles.moduleTitle}>
                          {showTeReo ? module.titleMaori : module.title}
                        </h3>
                        <div className={styles.moduleMeta}>
                          <span>{module.subject}</span> • 
                          <span>Level {module.nzCurriculumLevel}</span> • 
                          <span>{module.duration}</span>
                        </div>
                        <div className={styles.culturalElements}>
                          {module.culturalElements.map((element, idx) => (
                            <span key={idx} className={styles.culturalTag}>
                              🌿 {element}
                            </span>
                          ))}
                        </div>
                      </div>
                      {module.completed && (
                        <div className={styles.completedBadge}>
                          <CheckCircle size={16}/> 
                          {showTeReo ? 'Oti' : 'Completed'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'whanau' && (
              <section>
                <h2 className={styles.sectionTitle}>
                  {showTeReo ? 'Ōu Whānau me ngā Hononga' : 'Your Whānau & Connections'}
                </h2>
                
                <div className={styles.whanuGrid}>
                  {whanuConnections.map(connection => (
                    <div key={connection.id} className={`${styles.connectionCard} ${cardClassName}`}>
                      <div className={styles.connectionHeader}>
                        <div className={styles.connectionAvatar}>
                          {connection.type === 'parent' ? '👩' : 
                           connection.type === 'teacher' ? '👨‍🏫' : 
                           connection.type === 'mentor' ? '👴' : '👥'}
                        </div>
                        <div>
                          <h4 className={styles.connectionName}>{connection.name}</h4>
                          <p className={styles.connectionRole}>
                            {showTeReo ? 
                              (connection.type === 'parent' ? 'Whaea/Matua' : 
                               connection.type === 'teacher' ? 'Kaiako' : 
                               connection.type === 'mentor' ? 'Kaiawhina' : 'Whānau') 
                              : connection.type}
                          </p>
                          {connection.culturalRole && (
                            <p className={styles.culturalRole}>
                              <Leaf size={12} /> {connection.culturalRole}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={styles.connectionMeta}>
                        <span className={styles.lastContact}>
                          {showTeReo ? 'Wā mutunga:' : 'Last contact:'} {connection.lastContact}
                        </span>
                        <span className={`${styles.supportLevel} ${styles[connection.supportLevel]}`}>
                          {connection.supportLevel} {showTeReo ? 'tautoko' : 'support'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Whānau Learning Progress Sharing */}
                <div className={styles.whanuSharing}>
                  <h3>{showTeReo ? 'Tiritiri ki a Whānau' : 'Share with Whānau'}</h3>
                  <p>{showTeReo ? 
                    'Ka taea e koe te tiritiri i tō ahu ki ō whānau kia mōhio ai rātou ki tō koke.' :
                    'You can share your progress with whānau so they can celebrate your achievements.'
                  }</p>
                  <button className={`${styles.shareButton} ${isPrimaryStudent ? styles.primaryButton : styles.secondaryButton}`}>
                    <Heart size={16} />
                    {showTeReo ? 'Tiritiri Ahu' : 'Share Progress'}
                  </button>
                </div>
              </section>
            )}
          </div>
        </main>

        {/* Enhanced Cultural Sidebar */}
        <aside className={styles.sidebar}>
          {/* Weekly Cultural Goal */}
          <div className={`${styles.sidebarSection} ${cardClassName}`}>
            <h2 className={styles.sectionTitle}>
              {showTeReo ? 'Whāinga o te Wiki' : 'Weekly Goal'}
            </h2>
            <div className={styles.weeklyGoal}>
              <div className={styles.goalInfo}>
                <span>{stats.weeklyProgress} / {stats.weeklyGoal} {showTeReo ? 'akomanga' : 'lessons'}</span>
                <span>{getWeeklyProgress().toFixed(0)}%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${getWeeklyProgress()}%` }}></div>
              </div>
              <p className={styles.goalMotivation}>
                {showTeReo ? 'Kaha ai! Kia kino ai!' : 'Keep going! You\'re doing great!'}
              </p>
            </div>
          </div>

          {/* Cultural Achievements */}
          <div className={`${styles.sidebarSection} ${cardClassName}`}>
            <h2 className={styles.sectionTitle}>
              {showTeReo ? 'Ngā Whakatutukitanga' : 'Cultural Achievements'}
            </h2>
            {achievements.filter(ach => ach.unlocked).slice(0, 3).map(achievement => (
              <div key={achievement.id} className={`${styles.achievementCard} ${styles[achievement.rarity]}`}>
                <div className={styles.achievementIcon}>{achievement.icon}</div>
                <div>
                  <h4 className={styles.achievementTitle}>
                    {showTeReo ? achievement.titleMaori : achievement.title}
                  </h4>
                  <p className={styles.achievementDesc}>
                    {showTeReo ? achievement.descriptionMaori : achievement.description}
                  </p>
                  <p className={styles.culturalSignificance}>
                    <Leaf size={12} /> {achievement.culturalSignificance}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Te Reo & Cultural Progress */}
          <div className={`${styles.sidebarSection} ${cardClassName}`}>
            <h2 className={styles.sectionTitle}>
              {showTeReo ? 'Ahurea me te Reo' : 'Cultural & Language'}
            </h2>
            <div className={styles.culturalProgressSection}>
              <div className={styles.culturalProgress}>
                <div className={styles.progressCircle} style={{'--progress': `${stats.culturalEngagement}%`} as React.CSSProperties}>
                  <span>{stats.culturalEngagement}%</span>
                </div>
                <p>{showTeReo ? 'Whakatōhea Ahurea' : 'Cultural Engagement'}</p>
              </div>
              <div className={styles.culturalProgress}>
                <div className={styles.progressCircle} style={{'--progress': `${stats.teReoProficiency}%`} as React.CSSProperties}>
                  <span>{stats.teReoProficiency}%</span>
                </div>
                <p>{showTeReo ? 'Māori reo' : 'Te Reo Proficiency'}</p>
              </div>
            </div>
            
            <div className={styles.culturalInsight}>
              <Sparkles className={styles.insightIcon} />
              <p>
                {showTeReo ? 
                  'He rangatira koe i te ao Māori! Whakamaua kia kaha ai!' :
                  'You\'re becoming a cultural leader! Keep embracing Te Ao Māori!'}
              </p>
            </div>
          </div>

          {/* Time and Seasonal Connection */}
          <div className={`${styles.sidebarSection} ${cardClassName}`}>
            <h2 className={styles.sectionTitle}>
              {showTeReo ? 'Te Wā' : 'Time & Season'}
            </h2>
            <div className={styles.timeConnection}>
              {currentTime.getHours() < 12 ? <Sun size={24} /> : <Moon size={24} />}
              <div>
                <p className={styles.timeDisplay}>
                  {currentTime.toLocaleTimeString('en-NZ', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
                <p className={styles.seasonalMessage}>
                  {showTeReo ? 'He taima pai tēnei mō te ako' : 'Perfect time for learning'}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EnhancedStudentDashboard;