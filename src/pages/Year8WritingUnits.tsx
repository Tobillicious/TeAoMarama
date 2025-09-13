import React, { useState } from 'react';
import './Year8WritingUnits.css';

interface WritingUnit {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'narrative' | 'expository' | 'persuasive' | 'cultural';
  duration: string;
  activities: number;
  culturalElements: string[];
  nceaAlignment: string[];
  skills: string[];
}

const Year8WritingUnits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Enhanced Year 8 Writing Units with Cultural Integration
  const writingUnits: WritingUnit[] = [
    {
      id: 'unit-1',
      title: 'Whakapapa Narratives: Cultural Storytelling',
      description:
        'Learn to write compelling narratives that incorporate Māori cultural elements, whakapapa (genealogy), and traditional storytelling techniques.',
      difficulty: 'intermediate',
      category: 'cultural',
      duration: '4 weeks',
      activities: 12,
      culturalElements: [
        'Whakapapa',
        'Cultural Storytelling',
        'Māori Narratives',
        'Traditional Knowledge',
      ],
      nceaAlignment: ['Level 1 English 1.5', 'Level 1 English 1.6'],
      skills: [
        'Narrative Structure',
        'Cultural Context',
        'Character Development',
        'Descriptive Writing',
      ],
    },
    {
      id: 'unit-2',
      title: 'Expository Writing: Research and Analysis',
      description:
        'Master expository writing techniques for research papers, analytical essays, and informative texts with cultural perspectives.',
      difficulty: 'advanced',
      category: 'expository',
      duration: '6 weeks',
      activities: 15,
      culturalElements: [
        'Research Methods',
        'Cultural Analysis',
        'Academic Writing',
        'Critical Thinking',
      ],
      nceaAlignment: ['Level 1 English 1.7', 'Level 1 English 1.8'],
      skills: ['Research Skills', 'Analytical Writing', 'Citation Methods', 'Argument Development'],
    },
    {
      id: 'unit-3',
      title: 'Persuasive Writing: Social Justice Advocacy',
      description:
        'Develop persuasive writing skills to advocate for social justice, cultural rights, and community issues.',
      difficulty: 'intermediate',
      category: 'persuasive',
      duration: '5 weeks',
      activities: 10,
      culturalElements: [
        'Social Justice',
        'Cultural Rights',
        'Community Advocacy',
        'Persuasive Techniques',
      ],
      nceaAlignment: ['Level 1 English 1.9', 'Level 1 English 1.10'],
      skills: ['Persuasive Techniques', 'Argument Structure', 'Evidence Use', 'Audience Awareness'],
    },
    {
      id: 'unit-4',
      title: 'Creative Writing: Pacific Voices',
      description:
        'Explore creative writing through Pacific perspectives, incorporating traditional stories, modern themes, and cultural expression.',
      difficulty: 'beginner',
      category: 'narrative',
      duration: '4 weeks',
      activities: 8,
      culturalElements: [
        'Pacific Literature',
        'Creative Expression',
        'Cultural Themes',
        'Modern Narratives',
      ],
      nceaAlignment: ['Level 1 English 1.11', 'Level 1 English 1.12'],
      skills: [
        'Creative Writing',
        'Cultural Expression',
        'Imagery and Metaphor',
        'Voice Development',
      ],
    },
    {
      id: 'unit-5',
      title: 'Academic Writing: Formal Communication',
      description:
        'Master formal academic writing conventions, including essays, reports, and professional communication.',
      difficulty: 'advanced',
      category: 'expository',
      duration: '5 weeks',
      activities: 14,
      culturalElements: [
        'Academic Conventions',
        'Formal Communication',
        'Professional Standards',
        'Cultural Sensitivity',
      ],
      nceaAlignment: ['Level 1 English 1.13', 'Level 1 English 1.14'],
      skills: [
        'Academic Conventions',
        'Formal Tone',
        'Structure and Organization',
        'Professional Communication',
      ],
    },
    {
      id: 'unit-6',
      title: 'Digital Writing: Multimedia Storytelling',
      description:
        'Learn to create digital content, multimedia presentations, and interactive stories that incorporate cultural elements.',
      difficulty: 'intermediate',
      category: 'cultural',
      duration: '4 weeks',
      activities: 11,
      culturalElements: [
        'Digital Storytelling',
        'Multimedia Content',
        'Cultural Expression',
        'Technology Integration',
      ],
      nceaAlignment: ['Level 1 English 1.15', 'Level 1 English 1.16'],
      skills: [
        'Digital Writing',
        'Multimedia Skills',
        'Interactive Content',
        'Cultural Integration',
      ],
    },
  ];

  const filteredUnits = writingUnits.filter((unit) => {
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
      case 'narrative':
        return '📖';
      case 'expository':
        return '📝';
      case 'persuasive':
        return '💭';
      case 'cultural':
        return '🏛️';
      default:
        return '✍️';
    }
  };

  return (
    <div className="year8-writing-units-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-visual">
          <div className="cultural-pattern"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Year 8</span>
            <span>Writing Units</span>
          </h1>
          <p className="hero-subtitle">Mastering Advanced Writing Skills</p>
          <p className="hero-description">
            Develop sophisticated writing skills across multiple genres, with special focus on
            cultural expression and academic excellence.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Writing Units</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">70</span>
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
                placeholder="Search writing units, categories, or cultural elements..."
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
                <span className="filter-icon">✍️</span>
                All Categories
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'narrative' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('narrative')}
              >
                <span className="filter-icon">📖</span>
                Narrative
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'expository' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('expository')}
              >
                <span className="filter-icon">📝</span>
                Expository
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'persuasive' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('persuasive')}
              >
                <span className="filter-icon">💭</span>
                Persuasive
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'cultural' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('cultural')}
              >
                <span className="filter-icon">🏛️</span>
                Cultural
              </button>
            </div>
            <div className="difficulty-filters">
              <button
                className={`difficulty-btn ${selectedDifficulty === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty('all')}
              >
                <span className="difficulty-icon">✍️</span>
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

      {/* Writing Units Section */}
      <section className="writing-section">
        <div className="container">
          <h2 className="section-title">Writing Units</h2>
          <div className="writing-grid">
            {filteredUnits.map((unit) => (
              <div key={unit.id} className="writing-card">
                <div className="writing-header">
                  <span className="writing-badge">
                    {getCategoryIcon(unit.category)} {unit.category}
                  </span>
                  <span
                    className="writing-difficulty"
                    /* TODO: Move to external CSS */ style={{ backgroundColor: getDifficultyColor(unit.difficulty) }}
                  >
                    {unit.difficulty}
                  </span>
                </div>
                <h3 className="writing-title">{unit.title}</h3>
                <p className="writing-description">{unit.description}</p>

                <div className="writing-metrics">
                  <div className="metric">
                    <span className="metric-icon">⏱️</span>
                    <span className="metric-value">{unit.duration}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-icon">📝</span>
                    <span className="metric-value">{unit.activities} activities</span>
                  </div>
                </div>

                <div className="writing-cultural">
                  <h4>Cultural Elements</h4>
                  <p>{unit.culturalElements.join(', ')}</p>
                </div>

                <div className="writing-ncea">
                  <h4>NCEA Alignment</h4>
                  <p>{unit.nceaAlignment.join(', ')}</p>
                </div>

                <div className="writing-skills">
                  <h4>Key Skills</h4>
                  <ul className="skills-list">
                    {unit.skills.map((skill, index) => (
                      <li key={index} className="skill-item">
                        <span className="skill-icon">🎯</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="explore-writing-btn">Explore Unit</button>
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
                  <strong>1.5:</strong> Develop ideas in writing using a range of language features
                </li>
                <li>
                  <strong>1.6:</strong> Create a crafted and controlled visual and verbal text
                </li>
                <li>
                  <strong>1.7:</strong> Create a crafted and controlled visual and verbal text
                </li>
                <li>
                  <strong>1.8:</strong> Create a crafted and controlled visual and verbal text
                </li>
                <li>
                  <strong>1.9:</strong> Create a crafted and controlled visual and verbal text
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
              <h3>Cultural Expression</h3>
              <p>
                Develop writing skills that authentically incorporate Māori and Pacific cultural
                perspectives and storytelling traditions.
              </p>
            </div>
            <div className="cultural-item">
              <h3>Academic Excellence</h3>
              <p>
                Master advanced writing techniques across multiple genres for academic success and
                professional communication.
              </p>
            </div>
            <div className="cultural-item">
              <h3>Creative Voice</h3>
              <p>
                Find and develop your unique writing voice while respecting and incorporating
                cultural traditions and modern perspectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Master Advanced Writing?</h2>
          <p className="cta-description">
            Start developing sophisticated writing skills that will prepare you for academic success
            and cultural expression across all genres.
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

export default Year8WritingUnits;
