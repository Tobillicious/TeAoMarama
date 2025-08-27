import React, { useState } from 'react';
import './Year8AcademicVocab.css';

interface VocabularyUnit {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'academic' | 'cultural' | 'disciplinary' | 'contextual';
  wordCount: number;
  culturalElements: string[];
  nceaAlignment: string[];
  activities: string[];
}

const Year8AcademicVocab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Enhanced Year 8 Academic Vocabulary with Cultural Integration
  const vocabularyUnits: VocabularyUnit[] = [
    {
      id: 'unit-1',
      title: 'Te Reo Māori Academic Terms',
      description:
        'Master essential Māori academic vocabulary for formal writing, presentations, and cultural contexts.',
      difficulty: 'intermediate',
      category: 'cultural',
      wordCount: 50,
      culturalElements: ['Te Reo Māori', 'Academic Language', 'Cultural Context', 'Formal Speech'],
      nceaAlignment: ['Level 1 English 1.1', 'Level 1 English 1.2'],
      activities: ['Vocabulary Games', 'Cultural Context Exercises', 'Formal Writing Practice'],
    },
    {
      id: 'unit-2',
      title: 'Disciplinary Language: Science & Technology',
      description:
        'Develop specialized vocabulary for scientific inquiry, technological processes, and academic discourse.',
      difficulty: 'advanced',
      category: 'disciplinary',
      wordCount: 75,
      culturalElements: [
        'Scientific Method',
        'Technological Innovation',
        'Academic Discourse',
        'Critical Analysis',
      ],
      nceaAlignment: ['Level 1 Science 1.1', 'Level 1 Science 1.2'],
      activities: ['Lab Report Writing', 'Scientific Presentations', 'Technical Documentation'],
    },
    {
      id: 'unit-3',
      title: 'Social Studies Academic Language',
      description:
        'Master vocabulary essential for analyzing historical events, social issues, and cultural phenomena.',
      difficulty: 'intermediate',
      category: 'disciplinary',
      wordCount: 60,
      culturalElements: [
        'Historical Analysis',
        'Social Justice',
        'Cultural Studies',
        'Political Discourse',
      ],
      nceaAlignment: ['Level 1 Social Studies 1.1', 'Level 1 Social Studies 1.2'],
      activities: [
        'Historical Essay Writing',
        'Social Issue Analysis',
        'Cultural Research Projects',
      ],
    },
    {
      id: 'unit-4',
      title: 'Mathematical Academic Language',
      description:
        'Develop precise mathematical vocabulary for problem-solving, proofs, and mathematical communication.',
      difficulty: 'intermediate',
      category: 'disciplinary',
      wordCount: 45,
      culturalElements: [
        'Mathematical Reasoning',
        'Problem-Solving',
        'Logical Thinking',
        'Precision',
      ],
      nceaAlignment: ['Level 1 Mathematics 1.1', 'Level 1 Mathematics 1.2'],
      activities: [
        'Mathematical Proofs',
        'Problem-Solving Strategies',
        'Mathematical Communication',
      ],
    },
    {
      id: 'unit-5',
      title: 'Pacific Academic Vocabulary',
      description:
        'Learn academic terms from Pacific languages and cultures for cross-cultural communication and research.',
      difficulty: 'beginner',
      category: 'cultural',
      wordCount: 40,
      culturalElements: [
        'Pacific Languages',
        'Cross-cultural Communication',
        'Cultural Research',
        'Community Knowledge',
      ],
      nceaAlignment: ['Level 1 English 1.3', 'Level 1 Social Studies 1.3'],
      activities: [
        'Cultural Research Projects',
        'Community Interviews',
        'Cross-cultural Presentations',
      ],
    },
    {
      id: 'unit-6',
      title: 'Critical Analysis Vocabulary',
      description:
        'Master vocabulary for critical thinking, argumentation, and analytical writing across all subjects.',
      difficulty: 'advanced',
      category: 'academic',
      wordCount: 55,
      culturalElements: [
        'Critical Thinking',
        'Argumentation',
        'Analytical Writing',
        'Intellectual Discourse',
      ],
      nceaAlignment: ['Level 1 English 1.4', 'Level 1 English 1.5'],
      activities: ['Critical Essays', 'Debate Preparation', 'Analytical Presentations'],
    },
  ];

  const filteredUnits = vocabularyUnits.filter((unit) => {
    const matchesSearch =
      unit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || unit.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || unit.difficulty === selectedDifficulty;

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
      case 'academic':
        return '📚';
      case 'cultural':
        return '🏛️';
      case 'disciplinary':
        return '🔬';
      case 'contextual':
        return '🌍';
      default:
        return '📝';
    }
  };

  return (
    <div className="year8-academic-vocab-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-visual">
          <div className="cultural-pattern"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Year 8</span>
            <span>Academic Vocabulary</span>
          </h1>
          <p className="hero-subtitle">Mastering Language for Academic Excellence</p>
          <p className="hero-description">
            Develop sophisticated academic vocabulary across all subjects, with special focus on
            cultural language and disciplinary terminology.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Vocabulary Units</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">325</span>
              <span className="stat-label">Academic Words</span>
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
                placeholder="Search vocabulary units, categories, or cultural elements..."
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
                className={`filter-btn ${selectedCategory === 'academic' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('academic')}
              >
                <span className="filter-icon">📚</span>
                Academic
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'cultural' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('cultural')}
              >
                <span className="filter-icon">🏛️</span>
                Cultural
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'disciplinary' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('disciplinary')}
              >
                <span className="filter-icon">🔬</span>
                Disciplinary
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'contextual' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('contextual')}
              >
                <span className="filter-icon">🌍</span>
                Contextual
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

      {/* Vocabulary Units Section */}
      <section className="vocabulary-section">
        <div className="container">
          <h2 className="section-title">Vocabulary Units</h2>
          <div className="vocabulary-grid">
            {filteredUnits.map((unit) => (
              <div key={unit.id} className="vocabulary-card">
                <div className="vocabulary-header">
                  <span className="vocabulary-badge">
                    {getCategoryIcon(unit.category)} {unit.category}
                  </span>
                  <span
                    className="vocabulary-difficulty"
                    style={{ backgroundColor: getDifficultyColor(unit.difficulty) }}
                  >
                    {unit.difficulty}
                  </span>
                </div>
                <h3 className="vocabulary-title">{unit.title}</h3>
                <p className="vocabulary-description">{unit.description}</p>

                <div className="vocabulary-metrics">
                  <div className="metric">
                    <span className="metric-icon">📝</span>
                    <span className="metric-value">{unit.wordCount} words</span>
                  </div>
                </div>

                <div className="vocabulary-cultural">
                  <h4>Cultural Elements</h4>
                  <p>{unit.culturalElements.join(', ')}</p>
                </div>

                <div className="vocabulary-ncea">
                  <h4>NCEA Alignment</h4>
                  <p>{unit.nceaAlignment.join(', ')}</p>
                </div>

                <div className="vocabulary-activities">
                  <h4>Learning Activities</h4>
                  <ul className="activities-list">
                    {unit.activities.map((activity, index) => (
                      <li key={index} className="activity-item">
                        <span className="activity-icon">🎯</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="explore-vocabulary-btn">Explore Unit</button>
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
              <h3>Cultural Language Mastery</h3>
              <p>
                Develop proficiency in Māori and Pacific academic vocabulary for authentic cultural
                communication and understanding.
              </p>
            </div>
            <div className="cultural-item">
              <h3>Disciplinary Excellence</h3>
              <p>
                Master specialized vocabulary across all subject areas for academic success and
                professional communication.
              </p>
            </div>
            <div className="cultural-item">
              <h3>Academic Confidence</h3>
              <p>
                Build confidence in using sophisticated academic language for presentations, essays,
                and formal communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Master Academic Vocabulary?</h2>
          <p className="cta-description">
            Start developing sophisticated academic language skills that will prepare you for
            success across all subjects and cultural contexts.
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

export default Year8AcademicVocab;
