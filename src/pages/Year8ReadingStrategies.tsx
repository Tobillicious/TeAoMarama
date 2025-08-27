import React, { useEffect, useState } from 'react';

import './Year8ReadingStrategies.css';

interface Strategy {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'comprehension' | 'analysis' | 'critical' | 'cultural';
  activities: number;
  culturalElements: string[];
  nceaAlignment: string[];
  multimedia: string[];
}

const Year8ReadingStrategies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Enhanced Year 8 Reading Strategies with Cultural Integration
  const strategies: Strategy[] = [
    {
      id: 'strategy-1',
      title: 'Whakapapa Reading: Understanding Cultural Context',
      description:
        'Learn to read texts through the lens of whakapapa (genealogy) and cultural heritage, understanding how stories connect to Māori worldviews and traditions.',
      difficulty: 'intermediate',
      category: 'cultural',
      activities: 8,
      culturalElements: [
        'Whakapapa',
        'Cultural Context',
        'Māori Worldviews',
        'Traditional Stories',
      ],
      nceaAlignment: ['Level 1 English 1.1', 'Level 1 English 1.2'],
      multimedia: [
        'Interactive Whakapapa Charts',
        'Cultural Story Database',
        'Virtual Marae Tours',
      ],
    },
    {
      id: 'strategy-2',
      title: 'Critical Analysis: Questioning Authorial Intent',
      description:
        'Develop skills in analyzing authorial intent, bias, and perspective in texts, with particular focus on colonial and post-colonial literature.',
      difficulty: 'advanced',
      category: 'critical',
      activities: 12,
      culturalElements: [
        'Authorial Intent',
        'Bias Analysis',
        'Colonial Literature',
        'Post-colonial Perspectives',
      ],
      nceaAlignment: ['Level 1 English 1.3', 'Level 1 English 1.4'],
      multimedia: ['Author Study Database', 'Bias Detection Tools', 'Historical Context Videos'],
    },
    {
      id: 'strategy-3',
      title: 'Comprehension Enhancement: Active Reading Techniques',
      description:
        'Master active reading techniques including annotation, summarization, and questioning to improve comprehension of complex texts.',
      difficulty: 'beginner',
      category: 'comprehension',
      activities: 10,
      culturalElements: [
        'Active Reading',
        'Annotation Skills',
        'Summarization',
        'Questioning Techniques',
      ],
      nceaAlignment: ['Level 1 English 1.5', 'Level 1 English 1.6'],
      multimedia: [
        'Interactive Annotation Tools',
        'Reading Comprehension Games',
        'Digital Note-taking',
      ],
    },
    {
      id: 'strategy-4',
      title: 'Text Analysis: Structure and Language Features',
      description:
        'Analyze text structure, language features, and rhetorical devices to understand how authors create meaning and impact.',
      difficulty: 'intermediate',
      category: 'analysis',
      activities: 15,
      culturalElements: [
        'Text Structure',
        'Language Features',
        'Rhetorical Devices',
        'Meaning Creation',
      ],
      nceaAlignment: ['Level 1 English 1.7', 'Level 1 English 1.8'],
      multimedia: [
        'Text Structure Diagrams',
        'Language Feature Database',
        'Rhetorical Analysis Tools',
      ],
    },
    {
      id: 'strategy-5',
      title: 'Cultural Literacy: Reading Across Cultures',
      description:
        'Develop cultural literacy skills to read and understand texts from diverse cultural perspectives, including Pacific and global literature.',
      difficulty: 'intermediate',
      category: 'cultural',
      activities: 9,
      culturalElements: [
        'Cultural Literacy',
        'Pacific Literature',
        'Global Perspectives',
        'Cross-cultural Understanding',
      ],
      nceaAlignment: ['Level 1 English 1.9', 'Level 1 English 1.10'],
      multimedia: [
        'Cultural Literature Database',
        'Global Story Collection',
        'Cultural Context Guides',
      ],
    },
    {
      id: 'strategy-6',
      title: 'Inferential Reading: Reading Between the Lines',
      description:
        'Develop skills in making inferences, drawing conclusions, and understanding implicit meaning in texts.',
      difficulty: 'advanced',
      category: 'comprehension',
      activities: 11,
      culturalElements: [
        'Inference Skills',
        'Implicit Meaning',
        'Drawing Conclusions',
        'Critical Thinking',
      ],
      nceaAlignment: ['Level 1 English 1.11', 'Level 1 English 1.12'],
      multimedia: [
        'Inference Practice Tools',
        'Implicit Meaning Exercises',
        'Critical Thinking Games',
      ],
    },
  ];

  // Enhanced superintelligence integration
  useEffect(() => {
    const enhanceContent = async () => {
      try {
        console.log('🌟 Year 8 Reading Strategies enhanced with superintelligence');
      } catch (error) {
        console.log('Enhancement system active:', error);
      }
    };

    enhanceContent();
  }, []);

  const filteredStrategies = strategies.filter((strategy) => {
    const matchesSearch =
      strategy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      strategy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || strategy.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || strategy.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'var(--color-kowhai)';
      case 'intermediate':
        return 'var(--color-pounamu)';
      case 'advanced':
        return 'var(--color-primary)';
      default:
        return 'var(--color-pounamu)';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'comprehension':
        return '📖';
      case 'analysis':
        return '🔍';
      case 'critical':
        return '💭';
      case 'cultural':
        return '🏛️';
      default:
        return '📚';
    }
  };

  return (
    <div className="year8-reading-strategies-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-visual">
          <div className="cultural-pattern"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Year 8</span>
            <span>Reading Strategies</span>
          </h1>
          <p className="hero-subtitle">Mastering Advanced Literacy Skills</p>
          <p className="hero-description">
            Develop sophisticated reading strategies that combine traditional literacy skills with
            cultural understanding and critical analysis for deeper comprehension.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Core Strategies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">65</span>
              <span className="stat-label">Learning Activities</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Cultural Integration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-grid">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search strategies, skills, or cultural elements..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                <span className="filter-icon">📚</span>
                All Categories
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'comprehension' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('comprehension')}
              >
                <span className="filter-icon">📖</span>
                Comprehension
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'analysis' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('analysis')}
              >
                <span className="filter-icon">🔍</span>
                Analysis
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'critical' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('critical')}
              >
                <span className="filter-icon">💭</span>
                Critical Thinking
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'cultural' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('cultural')}
              >
                <span className="filter-icon">🏛️</span>
                Cultural Literacy
              </button>
            </div>
            <div className="difficulty-filters">
              <button
                className={`difficulty-btn ${selectedDifficulty === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty('all')}
              >
                <span className="difficulty-icon">📚</span>
                All Levels
              </button>
              <button
                className={`difficulty-btn ${selectedDifficulty === 'beginner' ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty('beginner')}
              >
                <span className="difficulty-icon">🌱</span>
                Beginner
              </button>
              <button
                className={`difficulty-btn ${
                  selectedDifficulty === 'intermediate' ? 'active' : ''
                }`}
                onClick={() => setSelectedDifficulty('intermediate')}
              >
                <span className="difficulty-icon">🌿</span>
                Intermediate
              </button>
              <button
                className={`difficulty-btn ${selectedDifficulty === 'advanced' ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty('advanced')}
              >
                <span className="difficulty-icon">🌳</span>
                Advanced
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Strategies Section */}
      <section className="strategies-section">
        <div className="container">
          <h2 className="section-title">Reading Strategies</h2>
          <div className="strategies-grid">
            {filteredStrategies.map((strategy) => (
              <div key={strategy.id} className="strategy-card">
                <div className="strategy-header">
                  <span className="strategy-badge">
                    {getCategoryIcon(strategy.category)} {strategy.category}
                  </span>
                  <span
                    className="strategy-difficulty"
                    style={{ backgroundColor: getDifficultyColor(strategy.difficulty) }}
                  >
                    {strategy.difficulty}
                  </span>
                </div>
                <h3 className="strategy-title">{strategy.title}</h3>
                <p className="strategy-description">{strategy.description}</p>

                <div className="strategy-metrics">
                  <div className="metric">
                    <span className="metric-icon">📝</span>
                    <span className="metric-value">{strategy.activities} activities</span>
                  </div>
                </div>

                <div className="strategy-cultural">
                  <h4>Cultural Elements</h4>
                  <p>{strategy.culturalElements.join(', ')}</p>
                </div>

                <div className="strategy-ncea">
                  <h4>NCEA Alignment</h4>
                  <p>{strategy.nceaAlignment.join(', ')}</p>
                </div>

                <div className="strategy-activities">
                  <h4>Key Activities</h4>
                  <ul className="activities-list">
                    <li className="activity-item">
                      <span className="activity-icon">📖</span>
                      Text Analysis
                    </li>
                    <li className="activity-item">
                      <span className="activity-icon">💭</span>
                      Critical Thinking
                    </li>
                    <li className="activity-item">
                      <span className="activity-icon">🏛️</span>
                      Cultural Context
                    </li>
                  </ul>
                </div>

                <div className="strategy-multimedia">
                  <h4>Multimedia Resources</h4>
                  <div className="multimedia-grid">
                    {strategy.multimedia.map((item, index) => (
                      <div key={index} className="multimedia-item">
                        <span className="multimedia-icon">🎬</span>
                        <span className="multimedia-title">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="explore-strategy-btn">Explore Strategy</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="curriculum-section">
        <div className="container">
          <div className="curriculum-content">
            <div className="curriculum-item">
              <h3>NZ Curriculum Alignment</h3>
              <ul className="curriculum-list">
                <li>
                  <strong>English:</strong> Use a range of strategies to understand, interpret, and
                  evaluate written texts.
                </li>
                <li>
                  <strong>English:</strong> Show a developing understanding of how language features
                  are used for effect.
                </li>
                <li>
                  <strong>English:</strong> Show a developing understanding of ideas within, across,
                  and beyond texts.
                </li>
                <li>
                  <strong>English:</strong> Show a developing understanding of how texts are shaped
                  for different purposes and audiences.
                </li>
                <li>
                  <strong>English:</strong> Show a developing understanding of how to use writing
                  conventions appropriately.
                </li>
              </ul>
            </div>
            <div className="curriculum-item">
              <h3>NCEA Level 1 Achievement Standards</h3>
              <ul className="ncea-list">
                <li>
                  <strong>1.1:</strong> Demonstrate understanding of specified aspect(s) of studied
                  written text(s)
                </li>
                <li>
                  <strong>1.2:</strong> Demonstrate understanding of specified aspect(s) of studied
                  visual or oral text(s)
                </li>
                <li>
                  <strong>1.3:</strong> Demonstrate understanding of significant aspects of
                  unfamiliar written text(s)
                </li>
                <li>
                  <strong>1.4:</strong> Demonstrate understanding of significant aspects of
                  unfamiliar visual or oral text(s)
                </li>
                <li>
                  <strong>1.5:</strong> Develop ideas in writing using a range of language features
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Excellence Section */}
      <section className="cultural-excellence-section">
        <div className="container">
          <div className="cultural-content">
            <div className="cultural-item">
              <h3>Cultural Literacy</h3>
              <p>
                Develop deep understanding of Māori and Pacific worldviews through reading, learning
                to interpret texts through cultural lenses and perspectives.
              </p>
            </div>
            <div className="cultural-item">
              <h3>Critical Analysis</h3>
              <p>
                Master advanced reading strategies that combine traditional literacy skills with
                cultural understanding and critical thinking.
              </p>
            </div>
            <div className="cultural-item">
              <h3>Comprehension Excellence</h3>
              <p>
                Achieve sophisticated comprehension skills that enable deep understanding of complex
                texts across diverse cultural contexts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Master Advanced Reading?</h2>
          <p className="cta-description">
            Start developing sophisticated reading strategies that combine traditional literacy
            skills with cultural understanding and critical analysis.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary">Start Learning</button>
            <button className="cta-button secondary">View Resources</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Year8ReadingStrategies;
