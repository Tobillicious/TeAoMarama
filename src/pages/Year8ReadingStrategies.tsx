import React, { useEffect, useState } from 'react';
import './Year8ReadingStrategies.css';

interface ReadingStrategy {
  id: string;
  title: string;
  description: string;
  category: 'comprehension' | 'vocabulary' | 'fluency' | 'critical-thinking';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  culturalElements: string[];
  activities: ReadingActivity[];
  resources: string[];
  estimatedTime: number;
}

interface ReadingActivity {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'group' | 'assessment';
  duration: number;
  materials: string[];
  instructions: string[];
}

const Year8ReadingStrategies: React.FC = () => {
  const [strategies, setStrategies] = useState<ReadingStrategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<ReadingStrategy | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [studentProgress, setStudentProgress] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Mock data for Year 8 Reading Strategies
    const mockStrategies: ReadingStrategy[] = [
      {
        id: '1',
        title: 'Whakapapa Reading: Understanding Cultural Context',
        description:
          'Learn to read and interpret texts through the lens of Māori genealogy and cultural heritage, developing deeper comprehension skills.',
        category: 'comprehension',
        difficulty: 'Intermediate',
        culturalElements: ['Whakapapa', 'Cultural Context', 'Storytelling'],
        activities: [
          {
            id: '1a',
            title: 'Family Tree Reading',
            description: 'Read and analyze family genealogy texts',
            type: 'individual',
            duration: 30,
            materials: ['Genealogy charts', 'Family stories', 'Cultural context guide'],
            instructions: [
              'Read the provided whakapapa text',
              'Identify key family relationships',
              'Analyze cultural significance',
              'Create your own family connection',
            ],
          },
        ],
        resources: ['Whakapapa templates', 'Cultural reading guides', 'Family story examples'],
        estimatedTime: 45,
      },
      {
        id: '2',
        title: 'Kōrero Analysis: Oral Tradition to Written Text',
        description:
          'Develop skills to analyze how oral storytelling traditions translate to written form, enhancing reading comprehension.',
        category: 'comprehension',
        difficulty: 'Intermediate',
        culturalElements: ['Kōrero', 'Oral Tradition', 'Narrative Structure'],
        activities: [
          {
            id: '2a',
            title: 'Story Circle Analysis',
            description: 'Compare oral and written versions of traditional stories',
            type: 'group',
            duration: 40,
            materials: ['Audio recordings', 'Written texts', 'Comparison charts'],
            instructions: [
              'Listen to oral storytelling',
              'Read written version',
              'Compare narrative elements',
              'Discuss cultural differences',
            ],
          },
        ],
        resources: ['Audio recordings', 'Traditional stories', 'Analysis frameworks'],
        estimatedTime: 50,
      },
      {
        id: '3',
        title: 'Mātauranga Vocabulary: Academic Language Building',
        description:
          'Build academic vocabulary through Māori knowledge systems and traditional concepts.',
        category: 'vocabulary',
        difficulty: 'Beginner',
        culturalElements: ['Mātauranga', 'Academic Language', 'Traditional Knowledge'],
        activities: [
          {
            id: '3a',
            title: 'Knowledge Word Walls',
            description: 'Create vocabulary walls with Māori academic terms',
            type: 'individual',
            duration: 25,
            materials: ['Word cards', 'Definition sheets', 'Cultural context'],
            instructions: [
              'Research Māori academic terms',
              'Create word cards with definitions',
              'Add cultural context',
              'Build classroom word wall',
            ],
          },
        ],
        resources: ['Vocabulary lists', 'Cultural dictionaries', 'Academic term guides'],
        estimatedTime: 35,
      },
      {
        id: '4',
        title: 'Tikanga Reading: Cultural Protocol Comprehension',
        description:
          'Learn to read and understand texts about cultural protocols and traditional practices.',
        category: 'comprehension',
        difficulty: 'Advanced',
        culturalElements: ['Tikanga', 'Cultural Protocols', 'Traditional Practices'],
        activities: [
          {
            id: '4a',
            title: 'Protocol Analysis',
            description: 'Analyze texts about cultural protocols',
            type: 'assessment',
            duration: 45,
            materials: ['Protocol texts', 'Analysis frameworks', 'Cultural guides'],
            instructions: [
              'Read protocol descriptions',
              'Identify key cultural elements',
              'Analyze significance',
              'Write reflection',
            ],
          },
        ],
        resources: ['Protocol guides', 'Cultural texts', 'Analysis templates'],
        estimatedTime: 55,
      },
      {
        id: '5',
        title: 'Kaitiakitanga Reading: Environmental Guardianship',
        description:
          'Develop reading skills through texts about environmental guardianship and sustainability.',
        category: 'critical-thinking',
        difficulty: 'Intermediate',
        culturalElements: ['Kaitiakitanga', 'Environmental Care', 'Sustainability'],
        activities: [
          {
            id: '5a',
            title: 'Guardianship Stories',
            description: 'Read and analyze environmental guardianship narratives',
            type: 'group',
            duration: 35,
            materials: ['Environmental texts', 'Discussion guides', 'Action plans'],
            instructions: [
              'Read guardianship stories',
              'Identify environmental themes',
              'Discuss modern applications',
              'Create action plans',
            ],
          },
        ],
        resources: ['Environmental texts', 'Guardianship stories', 'Discussion guides'],
        estimatedTime: 40,
      },
      {
        id: '6',
        title: 'Rongoā Reading: Traditional Medicine Texts',
        description:
          'Enhance reading skills through traditional Māori medicine and healing practices.',
        category: 'vocabulary',
        difficulty: 'Advanced',
        culturalElements: ['Rongoā', 'Traditional Medicine', 'Healing Practices'],
        activities: [
          {
            id: '6a',
            title: 'Medicine Text Analysis',
            description: 'Read and analyze traditional medicine texts',
            type: 'individual',
            duration: 30,
            materials: ['Medicine texts', 'Plant guides', 'Cultural context'],
            instructions: [
              'Read traditional medicine texts',
              'Identify plant names and uses',
              'Understand cultural significance',
              'Create plant identification guide',
            ],
          },
        ],
        resources: ['Medicine texts', 'Plant identification guides', 'Cultural context'],
        estimatedTime: 45,
      },
    ];

    setStrategies(mockStrategies);

    // Initialize student progress
    const progress: { [key: string]: number } = {};
    mockStrategies.forEach((strategy) => {
      progress[strategy.id] = Math.floor(Math.random() * 100);
    });
    setStudentProgress(progress);
  }, []);

  const filteredStrategies = strategies.filter((strategy) => {
    const matchesSearch =
      strategy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      strategy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || strategy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'comprehension':
        return '#667eea';
      case 'vocabulary':
        return '#f093fb';
      case 'fluency':
        return '#4facfe';
      case 'critical-thinking':
        return '#43e97b';
      default:
        return '#667eea';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#10b981';
      case 'Intermediate':
        return '#f59e0b';
      case 'Advanced':
        return '#ef4444';
      default:
        return '#10b981';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#f59e0b';
    if (progress >= 40) return '#f97316';
    return '#ef4444';
  };

  const startStrategy = (strategyId: string) => {
    const strategy = strategies.find((s) => s.id === strategyId);
    if (strategy) {
      setSelectedStrategy(strategy);
    }
  };

  const updateProgress = (strategyId: string, progress: number) => {
    setStudentProgress((prev) => ({
      ...prev,
      [strategyId]: Math.min(100, prev[strategyId] + progress),
    }));
  };

  return (
    <div className="year8-reading-strategies">
      <div className="reading-header">
        <h1>📚 Year 8 Reading Strategies</h1>
        <p>
          Develop advanced reading skills through Māori cultural context and traditional knowledge
          systems
        </p>

        <div className="reading-stats">
          <div className="stat-item">
            <span className="stat-number">{strategies.length}</span>
            <span className="stat-label">Reading Strategies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {Math.round(
                Object.values(studentProgress).reduce((sum, p) => sum + p, 0) /
                  Object.keys(studentProgress).length,
              )}
            </span>
            <span className="stat-label">Average Progress</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {Object.values(studentProgress).filter((p) => p >= 80).length}
            </span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      <div className="reading-filters">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search reading strategies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
            aria-label="Filter by reading category"
          >
            <option value="all">All Categories</option>
            <option value="comprehension">Comprehension</option>
            <option value="vocabulary">Vocabulary</option>
            <option value="fluency">Fluency</option>
            <option value="critical-thinking">Critical Thinking</option>
          </select>
        </div>
      </div>

      {selectedStrategy ? (
        <div className="strategy-detail">
          <div className="detail-header">
            <button className="back-btn" onClick={() => setSelectedStrategy(null)}>
              ← Back to Strategies
            </button>
            <h2>{selectedStrategy.title}</h2>
            <div className="strategy-meta">
              <span
                className="category-badge"
                /* TODO: Move to external CSS */ style={{ backgroundColor: getCategoryColor(selectedStrategy.category) }}
              >
                {selectedStrategy.category}
              </span>
              <span
                className="difficulty-badge"
                /* TODO: Move to external CSS */ style={{ backgroundColor: getDifficultyColor(selectedStrategy.difficulty) }}
              >
                {selectedStrategy.difficulty}
              </span>
              <span className="time-badge">⏱️ {selectedStrategy.estimatedTime} min</span>
            </div>
          </div>

          <div className="strategy-content">
            <div className="strategy-description">
              <h3>Description</h3>
              <p>{selectedStrategy.description}</p>
            </div>

            <div className="cultural-elements">
              <h3>Cultural Elements</h3>
              <div className="cultural-tags">
                {selectedStrategy.culturalElements.map((element) => (
                  <span key={element} className="cultural-tag">
                    {element}
                  </span>
                ))}
              </div>
            </div>

            <div className="strategy-activities">
              <h3>Learning Activities</h3>
              {selectedStrategy.activities.map((activity) => (
                <div key={activity.id} className="activity-card">
                  <div className="activity-header">
                    <h4>{activity.title}</h4>
                    <span className="activity-type">{activity.type}</span>
                  </div>
                  <p>{activity.description}</p>
                  <div className="activity-details">
                    <span>⏱️ {activity.duration} min</span>
                    <span>📚 {activity.materials.length} materials</span>
                  </div>
                  <div className="activity-instructions">
                    <h5>Instructions:</h5>
                    <ol>
                      {activity.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>

            <div className="strategy-resources">
              <h3>Resources</h3>
              <ul>
                {selectedStrategy.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>

            <div className="strategy-actions">
              <button className="start-btn" onClick={() => updateProgress(selectedStrategy.id, 10)}>
                Start Learning
              </button>
              <button
                className="complete-btn"
                onClick={() => updateProgress(selectedStrategy.id, 100)}
              >
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="strategies-grid">
          {filteredStrategies.map((strategy) => (
            <div key={strategy.id} className="strategy-card">
              <div className="strategy-header">
                <div
                  className="strategy-category"
                  /* TODO: Move to external CSS */ style={{ backgroundColor: getCategoryColor(strategy.category) }}
                >
                  {strategy.category}
                </div>
                <div
                  className="strategy-difficulty"
                  /* TODO: Move to external CSS */ style={{ backgroundColor: getDifficultyColor(strategy.difficulty) }}
                >
                  {strategy.difficulty}
                </div>
              </div>

              <div className="strategy-content">
                <h3>{strategy.title}</h3>
                <p>{strategy.description}</p>

                <div className="strategy-meta">
                  <span>⏱️ {strategy.estimatedTime} min</span>
                  <span>🎯 {strategy.activities.length} activities</span>
                  <span>📚 {strategy.resources.length} resources</span>
                </div>

                <div className="cultural-elements">
                  {strategy.culturalElements.map((element) => (
                    <span key={element} className="cultural-tag">
                      {element}
                    </span>
                  ))}
                </div>

                <div className="progress-section">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${studentProgress[strategy.id]}%`,
                        backgroundColor: getProgressColor(studentProgress[strategy.id]),
                      }}
                    />
                  </div>
                  <span className="progress-text">{studentProgress[strategy.id]}% Complete</span>
                </div>
              </div>

              <div className="strategy-actions">
                <button className="view-btn" onClick={() => startStrategy(strategy.id)}>
                  View Strategy
                </button>
                {studentProgress[strategy.id] < 100 && (
                  <button className="continue-btn" onClick={() => updateProgress(strategy.id, 20)}>
                    Continue Learning
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredStrategies.length === 0 && (
        <div className="no-strategies">
          <h3>No reading strategies found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default Year8ReadingStrategies;
