import React, { useEffect, useState } from 'react';
import './CulturalLearningModules.css';

interface CulturalModule {
  id: string;
  title: string;
  teReoTitle: string;
  category:
    | 'te-reo'
    | 'tikanga'
    | 'traditional-knowledge'
    | 'cultural-arts'
    | 'history'
    | 'environmental';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  description: string;
  teReoDescription: string;
  culturalElements: string[];
  learningObjectives: string[];
  resources: string[];
  culturalSignificance: string;
  completionRate: number;
  rating: number;
  enrolledStudents: number;
  culturalImpact: number;
  facilitator: string;
  prerequisites: string[];
  culturalProtocols: string[];
}

interface StudentProgress {
  studentId: string;
  studentName: string;
  moduleId: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  culturalEngagement: number;
  teReoUsage: number;
  lastActivity: Date;
  achievements: string[];
}

interface CulturalAchievement {
  id: string;
  title: string;
  teReoTitle: string;
  description: string;
  category: string;
  difficulty: number;
  culturalValue: number;
  unlockedBy: string[];
}

const CulturalLearningModules: React.FC = () => {
  const [modules, setModules] = useState<CulturalModule[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [achievements, setAchievements] = useState<CulturalAchievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading cultural learning data
    const mockModules: CulturalModule[] = [
      {
        id: '1',
        title: 'Te Reo Māori Fundamentals',
        teReoTitle: 'Ngā Tīmatanga o Te Reo Māori',
        category: 'te-reo',
        level: 'beginner',
        duration: 60,
        description:
          'Learn the basics of Te Reo Māori including greetings, numbers, and common phrases.',
        teReoDescription:
          'Ako i ngā tīmatanga o Te Reo Māori me ngā mihi, ngā tau, me ngā kīanga noa.',
        culturalElements: ['Greetings', 'Numbers', 'Basic Phrases', 'Pronunciation'],
        learningObjectives: [
          'Master basic greetings and farewells',
          'Count from 1-100 in Te Reo Māori',
          'Use common everyday phrases',
          'Understand proper pronunciation',
        ],
        resources: [
          'Audio recordings',
          'Interactive exercises',
          'Cultural context videos',
          'Practice worksheets',
        ],
        culturalSignificance:
          'Te Reo Māori is the foundation of Māori culture and identity. Learning the language connects us to our ancestors and cultural heritage.',
        completionRate: 85,
        rating: 4.8,
        enrolledStudents: 45,
        culturalImpact: 92,
        facilitator: 'Whaea Aroha',
        prerequisites: [],
        culturalProtocols: [
          'Karakia before learning',
          'Respect for the language',
          'Cultural sensitivity',
        ],
      },
      {
        id: '2',
        title: 'Tikanga - Cultural Protocols',
        teReoTitle: 'Tikanga - Ngā Kawa o Te Ao Māori',
        category: 'tikanga',
        level: 'intermediate',
        duration: 90,
        description:
          'Learn about Māori customs, protocols, and cultural practices that guide daily life.',
        teReoDescription:
          'Ako i ngā tikanga, ngā kawa, me ngā mahi ahurea o Te Ao Māori e arahi ana i te ao o ia rā.',
        culturalElements: [
          'Marae protocols',
          'Cultural ceremonies',
          'Respect and mana',
          'Traditional customs',
        ],
        learningObjectives: [
          'Understand marae protocols and etiquette',
          'Learn about cultural ceremonies and their significance',
          'Develop respect for cultural practices',
          'Apply tikanga in daily life',
        ],
        resources: [
          'Marae visits',
          'Cultural workshops',
          'Traditional stories',
          'Interactive scenarios',
        ],
        culturalSignificance:
          'Tikanga provides the framework for how we interact with each other and our environment, maintaining cultural integrity and respect.',
        completionRate: 78,
        rating: 4.9,
        enrolledStudents: 32,
        culturalImpact: 96,
        facilitator: 'Kaumātua Hone',
        prerequisites: ['Basic Te Reo Māori understanding'],
        culturalProtocols: ['Manaakitanga', 'Whanaungatanga', 'Kaitiakitanga', 'Rangatiratanga'],
      },
      {
        id: '3',
        title: 'Traditional Māori Arts',
        teReoTitle: 'Ngā Toi Māori',
        category: 'cultural-arts',
        level: 'intermediate',
        duration: 120,
        description:
          'Explore traditional Māori arts including weaving, carving, and traditional patterns.',
        teReoDescription:
          'Tūhura i ngā toi Māori tuku iho pērā i te raranga, te whakairo, me ngā tauira tuku iho.',
        culturalElements: [
          'Weaving techniques',
          'Carving patterns',
          'Traditional designs',
          'Cultural symbolism',
        ],
        learningObjectives: [
          'Learn basic weaving techniques',
          'Understand carving patterns and meanings',
          'Create traditional designs',
          'Connect with cultural heritage through art',
        ],
        resources: [
          'Traditional materials',
          'Expert demonstrations',
          'Cultural stories',
          'Hands-on workshops',
        ],
        culturalSignificance:
          'Traditional arts carry the stories, knowledge, and identity of our ancestors, preserving cultural heritage for future generations.',
        completionRate: 72,
        rating: 4.7,
        enrolledStudents: 28,
        culturalImpact: 94,
        facilitator: 'Toi Artist Mana',
        prerequisites: ['Cultural appreciation', 'Basic manual skills'],
        culturalProtocols: [
          'Respect for materials',
          'Cultural permission',
          'Traditional techniques',
          'Story sharing',
        ],
      },
      {
        id: '4',
        title: 'Māori History and Whakapapa',
        teReoTitle: 'Te Hītori Māori me Te Whakapapa',
        category: 'history',
        level: 'advanced',
        duration: 150,
        description:
          'Explore Māori history, genealogy, and the importance of whakapapa in cultural identity.',
        teReoDescription:
          'Tūhura i te hītori Māori, te whakapapa, me te hiranga o te whakapapa ki te tuakiri ahurea.',
        culturalElements: ['Whakapapa', 'Tribal history', 'Migration stories', 'Cultural identity'],
        learningObjectives: [
          'Understand the concept of whakapapa',
          'Learn about tribal histories and migrations',
          'Explore cultural identity through genealogy',
          'Connect personal history to cultural heritage',
        ],
        resources: [
          'Genealogical records',
          'Historical documents',
          'Oral histories',
          'Cultural maps',
        ],
        culturalSignificance:
          'Whakapapa connects us to our ancestors, our land, and our cultural identity, providing a foundation for understanding who we are.',
        completionRate: 68,
        rating: 4.9,
        enrolledStudents: 22,
        culturalImpact: 98,
        facilitator: 'Kaumātua Tama',
        prerequisites: ['Intermediate Te Reo Māori', 'Cultural understanding'],
        culturalProtocols: [
          'Sacred knowledge protocols',
          'Respect for ancestors',
          'Cultural permission',
          'Storytelling protocols',
        ],
      },
      {
        id: '5',
        title: 'Environmental Kaitiakitanga',
        teReoTitle: 'Te Kaitiakitanga o Te Taiao',
        category: 'environmental',
        level: 'intermediate',
        duration: 100,
        description: 'Learn about Māori environmental stewardship and sustainable practices.',
        teReoDescription: 'Ako i te kaitiakitanga Māori me ngā mahi taiao e mau tonu ana.',
        culturalElements: [
          'Environmental care',
          'Sustainable practices',
          'Traditional knowledge',
          'Land connection',
        ],
        learningObjectives: [
          'Understand kaitiakitanga principles',
          'Learn sustainable environmental practices',
          'Connect with traditional environmental knowledge',
          'Apply cultural environmental values',
        ],
        resources: [
          'Field trips',
          'Traditional knowledge sharing',
          'Environmental projects',
          'Cultural workshops',
        ],
        culturalSignificance:
          'Kaitiakitanga embodies our responsibility to care for the environment, ensuring sustainability for future generations.',
        completionRate: 81,
        rating: 4.6,
        enrolledStudents: 38,
        culturalImpact: 89,
        facilitator: 'Kaitiaki Aroha',
        prerequisites: ['Basic cultural understanding'],
        culturalProtocols: [
          'Environmental respect',
          'Sustainable practices',
          'Cultural permission',
          'Land connection',
        ],
      },
      {
        id: '6',
        title: 'Advanced Te Reo Māori',
        teReoTitle: 'Te Reo Māori Mātanga',
        category: 'te-reo',
        level: 'advanced',
        duration: 180,
        description:
          'Advanced Te Reo Māori including complex grammar, traditional stories, and cultural expressions.',
        teReoDescription:
          'Te Reo Māori mātanga me te tātai reo, ngā kōrero tuku iho, me ngā kīanga ahurea.',
        culturalElements: [
          'Advanced grammar',
          'Traditional stories',
          'Cultural expressions',
          'Poetry and song',
        ],
        learningObjectives: [
          'Master advanced Te Reo Māori grammar',
          'Understand and tell traditional stories',
          'Use cultural expressions and idioms',
          'Appreciate Māori poetry and song',
        ],
        resources: [
          'Traditional texts',
          'Advanced exercises',
          'Cultural immersion',
          'Storytelling workshops',
        ],
        culturalSignificance:
          'Advanced Te Reo Māori connects us deeply to our cultural heritage and traditional knowledge systems.',
        completionRate: 65,
        rating: 4.8,
        enrolledStudents: 18,
        culturalImpact: 95,
        facilitator: 'Kaiako Hine',
        prerequisites: ['Intermediate Te Reo Māori', 'Cultural understanding'],
        culturalProtocols: [
          'Language respect',
          'Cultural sensitivity',
          'Traditional knowledge protocols',
          'Storytelling respect',
        ],
      },
    ];

    const mockStudentProgress: StudentProgress[] = [
      {
        studentId: '1',
        studentName: 'Aroha Smith',
        moduleId: '1',
        progress: 85,
        completedLessons: 17,
        totalLessons: 20,
        culturalEngagement: 92,
        teReoUsage: 88,
        lastActivity: new Date(),
        achievements: ['First Greeting', 'Number Master', 'Cultural Respect'],
      },
      {
        studentId: '2',
        studentName: 'Kai Johnson',
        moduleId: '2',
        progress: 78,
        completedLessons: 14,
        totalLessons: 18,
        culturalEngagement: 87,
        teReoUsage: 75,
        lastActivity: new Date(Date.now() - 86400000),
        achievements: ['Marae Protocol', 'Cultural Understanding'],
      },
      {
        studentId: '3',
        studentName: 'Mana Williams',
        moduleId: '3',
        progress: 72,
        completedLessons: 12,
        totalLessons: 16,
        culturalEngagement: 94,
        teReoUsage: 82,
        lastActivity: new Date(),
        achievements: ['Weaving Beginner', 'Pattern Recognition', 'Cultural Artist'],
      },
    ];

    const mockAchievements: CulturalAchievement[] = [
      {
        id: '1',
        title: 'Te Reo Pioneer',
        teReoTitle: 'Te Kaitiaki Reo',
        description: 'Completed basic Te Reo Māori module with excellence',
        category: 'te-reo',
        difficulty: 1,
        culturalValue: 85,
        unlockedBy: ['Te Reo Māori Fundamentals'],
      },
      {
        id: '2',
        title: 'Tikanga Guardian',
        teReoTitle: 'Te Kaitiaki Tikanga',
        description: 'Demonstrated deep understanding of cultural protocols',
        category: 'tikanga',
        difficulty: 2,
        culturalValue: 92,
        unlockedBy: ['Tikanga - Cultural Protocols'],
      },
      {
        id: '3',
        title: 'Traditional Artist',
        teReoTitle: 'Te Kaiwhakairo',
        description: 'Created traditional Māori art with cultural authenticity',
        category: 'cultural-arts',
        difficulty: 2,
        culturalValue: 88,
        unlockedBy: ['Traditional Māori Arts'],
      },
      {
        id: '4',
        title: 'Whakapapa Keeper',
        teReoTitle: 'Te Kaitiaki Whakapapa',
        description: 'Connected deeply with ancestral knowledge and genealogy',
        category: 'history',
        difficulty: 3,
        culturalValue: 95,
        unlockedBy: ['Māori History and Whakapapa'],
      },
      {
        id: '5',
        title: 'Environmental Guardian',
        teReoTitle: 'Te Kaitiaki Taiao',
        description: 'Demonstrated commitment to environmental stewardship',
        category: 'environmental',
        difficulty: 2,
        culturalValue: 90,
        unlockedBy: ['Environmental Kaitiakitanga'],
      },
    ];

    setModules(mockModules);
    setStudentProgress(mockStudentProgress);
    setAchievements(mockAchievements);
    setIsLoading(false);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'te-reo':
        return '🗣️';
      case 'tikanga':
        return '📜';
      case 'traditional-knowledge':
        return '🌿';
      case 'cultural-arts':
        return '🎨';
      case 'history':
        return '📚';
      case 'environmental':
        return '🌍';
      default:
        return '🌟';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
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

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return '#10b981';
    if (progress >= 80) return '#3b82f6';
    if (progress >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const filteredModules = modules.filter((module) => {
    const categoryMatch = selectedCategory === 'all' || module.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || module.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  if (isLoading) {
    return (
      <div className="cultural-learning-modules">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Cultural Learning Modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cultural-learning-modules">
      <div className="modules-header">
        <h1>🌿 Cultural Learning Modules - Ngā Akoranga Ahurea</h1>
        <p>Comprehensive Te Reo Māori and cultural learning experiences</p>
      </div>

      <div className="modules-controls">
        <div className="filter-section">
          <div className="filter-group">
            <label>Category:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="te-reo">Te Reo Māori</option>
              <option value="tikanga">Tikanga</option>
              <option value="traditional-knowledge">Traditional Knowledge</option>
              <option value="cultural-arts">Cultural Arts</option>
              <option value="history">History</option>
              <option value="environmental">Environmental</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Level:</label>
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      <div className="modules-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <h3>Total Modules</h3>
            <span className="stat-value">{modules.length}</span>
          </div>
          <div className="stat-card">
            <h3>Active Students</h3>
            <span className="stat-value">{studentProgress.length}</span>
          </div>
          <div className="stat-card">
            <h3>Average Completion</h3>
            <span className="stat-value">
              {Math.round(
                modules.reduce((sum, module) => sum + module.completionRate, 0) / modules.length,
              )}
              %
            </span>
          </div>
          <div className="stat-card">
            <h3>Cultural Impact</h3>
            <span className="stat-value">
              {Math.round(
                modules.reduce((sum, module) => sum + module.culturalImpact, 0) / modules.length,
              )}
              %
            </span>
          </div>
        </div>
      </div>

      <div className="modules-grid">
        {filteredModules.map((module) => (
          <div key={module.id} className="module-card">
            <div className="module-header">
              <span className="category-icon">{getCategoryIcon(module.category)}</span>
              <h3>{module.title}</h3>
              <span className="te-reo-title">{module.teReoTitle}</span>
              <div className="module-badges">
                <span
                  className="level-badge"
                  style={{ backgroundColor: getLevelColor(module.level) }}
                >
                  {module.level.toUpperCase()}
                </span>
                <span className="duration-badge">{module.duration} min</span>
              </div>
            </div>

            <div className="module-content">
              <div className="module-description">
                <p>{module.description}</p>
                <p className="te-reo-description">{module.teReoDescription}</p>
              </div>

              <div className="module-metrics">
                <div className="metric-row">
                  <span>Completion Rate:</span>
                  <span style={{ color: getProgressColor(module.completionRate) }}>
                    {module.completionRate}%
                  </span>
                </div>
                <div className="metric-row">
                  <span>Rating:</span>
                  <span>⭐ {module.rating}/5</span>
                </div>
                <div className="metric-row">
                  <span>Enrolled Students:</span>
                  <span>{module.enrolledStudents}</span>
                </div>
                <div className="metric-row">
                  <span>Cultural Impact:</span>
                  <span style={{ color: getProgressColor(module.culturalImpact) }}>
                    {module.culturalImpact}%
                  </span>
                </div>
              </div>

              <div className="module-details">
                <div className="detail-section">
                  <h4>Learning Objectives</h4>
                  <ul>
                    {module.learningObjectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h4>Cultural Elements</h4>
                  <div className="cultural-elements">
                    {module.culturalElements.map((element) => (
                      <span key={element} className="cultural-element-tag">
                        {element}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Cultural Significance</h4>
                  <p className="cultural-significance">{module.culturalSignificance}</p>
                </div>

                <div className="detail-section">
                  <h4>Cultural Protocols</h4>
                  <div className="cultural-protocols">
                    {module.culturalProtocols.map((protocol) => (
                      <span key={protocol} className="protocol-tag">
                        {protocol}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="module-actions">
                <button className="action-btn primary">Enroll Now</button>
                <button className="action-btn secondary">View Details</button>
                <button className="action-btn secondary">Preview Module</button>
              </div>

              <div className="module-facilitator">
                <span>Facilitated by: {module.facilitator}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="student-progress-section">
        <h2>👥 Student Progress</h2>
        <div className="progress-grid">
          {studentProgress.map((progress) => {
            const module = modules.find((m) => m.id === progress.moduleId);
            return (
              <div key={progress.studentId} className="progress-card">
                <div className="progress-header">
                  <h4>{progress.studentName}</h4>
                  <span className="module-name">{module?.title}</span>
                </div>
                <div className="progress-metrics">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${progress.progress}%`,
                        backgroundColor: getProgressColor(progress.progress),
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">{progress.progress}% Complete</span>
                </div>
                <div className="progress-details">
                  <div className="detail-row">
                    <span>Lessons:</span>
                    <span>
                      {progress.completedLessons}/{progress.totalLessons}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Cultural Engagement:</span>
                    <span style={{ color: getProgressColor(progress.culturalEngagement) }}>
                      {progress.culturalEngagement}%
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Te Reo Usage:</span>
                    <span style={{ color: getProgressColor(progress.teReoUsage) }}>
                      {progress.teReoUsage}%
                    </span>
                  </div>
                </div>
                <div className="achievements-section">
                  <h5>Achievements:</h5>
                  <div className="achievements-list">
                    {progress.achievements.map((achievement) => (
                      <span key={achievement} className="achievement-tag">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="achievements-section">
        <h2>🏆 Cultural Achievements</h2>
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-header">
                <h4>{achievement.title}</h4>
                <span className="te-reo-title">{achievement.teReoTitle}</span>
              </div>
              <p className="achievement-description">{achievement.description}</p>
              <div className="achievement-metrics">
                <div className="metric">
                  <span>Difficulty:</span>
                  <span className="difficulty-stars">{'⭐'.repeat(achievement.difficulty)}</span>
                </div>
                <div className="metric">
                  <span>Cultural Value:</span>
                  <span style={{ color: getProgressColor(achievement.culturalValue) }}>
                    {achievement.culturalValue}%
                  </span>
                </div>
              </div>
              <div className="achievement-category">
                <span className="category-tag">{achievement.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CulturalLearningModules;
