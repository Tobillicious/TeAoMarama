import React, { useState } from 'react';
import './Year8ReadingUnits.css';

interface ReadingUnit {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'fiction' | 'non-fiction' | 'poetry' | 'cultural';
  duration: string;
  activities: number;
  culturalElements: string[];
  nceaAlignment: string[];
  skills: string[];
}

const Year8ReadingUnits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Enhanced Year 8 Reading Units with Cultural Integration
  const readingUnits: ReadingUnit[] = [
    {
      id: 'unit-1',
      title: 'Whakapapa: Māori Genealogy and Storytelling',
      description:
        'Explore Māori whakapapa through traditional and contemporary texts, understanding the importance of genealogy and cultural identity.',
      difficulty: 'intermediate',
      category: 'cultural',
      duration: '6 weeks',
      activities: 14,
      culturalElements: ['Whakapapa', 'Māori Identity', 'Cultural Storytelling', 'Genealogy'],
      nceaAlignment: ['Level 1 English 1.1', 'Level 1 English 1.2'],
      skills: [
        'Cultural Reading',
        'Identity Analysis',
        'Genealogical Understanding',
        'Cultural Context',
      ],
    },
    {
      id: 'unit-2',
      title: 'Contemporary New Zealand Literature',
      description:
        'Analyze contemporary New Zealand texts, exploring themes of identity, belonging, and cultural diversity in modern society.',
      difficulty: 'advanced',
      category: 'fiction',
      duration: '5 weeks',
      activities: 12,
      culturalElements: ['NZ Identity', 'Cultural Diversity', 'Modern Society', 'Belonging'],
      nceaAlignment: ['Level 1 English 1.3', 'Level 1 English 1.4'],
      skills: [
        'Contemporary Analysis',
        'Identity Exploration',
        'Cultural Diversity',
        'Modern Themes',
      ],
    },
    {
      id: 'unit-3',
      title: 'Pacific Literature and Oral Traditions',
      description:
        'Discover Pacific literature and oral storytelling traditions, understanding the rich cultural heritage of Pacific peoples.',
      difficulty: 'intermediate',
      category: 'cultural',
      duration: '4 weeks',
      activities: 10,
      culturalElements: [
        'Pacific Traditions',
        'Oral Storytelling',
        'Cultural Heritage',
        'Pacific Identity',
      ],
      nceaAlignment: ['Level 1 English 1.5', 'Level 1 English 1.6'],
      skills: [
        'Oral Traditions',
        'Cultural Heritage',
        'Pacific Literature',
        'Storytelling Analysis',
      ],
    },
    {
      id: 'unit-4',
      title: 'Environmental Literature and Sustainability',
      description:
        'Read texts about environmental issues and sustainability, exploring our relationship with the natural world.',
      difficulty: 'advanced',
      category: 'non-fiction',
      duration: '5 weeks',
      activities: 13,
      culturalElements: [
        'Environmental Awareness',
        'Sustainability',
        'Natural World',
        'Cultural Connection',
      ],
      nceaAlignment: ['Level 1 English 1.7', 'Level 1 English 1.8'],
      skills: [
        'Environmental Literacy',
        'Sustainability Analysis',
        'Natural World Connection',
        'Critical Reading',
      ],
    },
    {
      id: 'unit-5',
      title: 'Poetry and Creative Expression',
      description:
        'Analyze poetry from diverse cultural perspectives, exploring creative expression and linguistic artistry.',
      difficulty: 'intermediate',
      category: 'poetry',
      duration: '4 weeks',
      activities: 11,
      culturalElements: [
        'Poetic Expression',
        'Cultural Perspectives',
        'Linguistic Artistry',
        'Creative Writing',
      ],
      nceaAlignment: ['Level 1 English 1.9', 'Level 1 English 1.10'],
      skills: ['Poetry Analysis', 'Creative Expression', 'Linguistic Artistry', 'Cultural Poetry'],
    },
    {
      id: 'unit-6',
      title: 'Digital Literacy and Media Texts',
      description:
        'Develop skills in reading and analyzing digital texts, multimedia content, and online media.',
      difficulty: 'advanced',
      category: 'non-fiction',
      duration: '6 weeks',
      activities: 15,
      culturalElements: [
        'Digital Literacy',
        'Media Analysis',
        'Online Content',
        'Digital Citizenship',
      ],
      nceaAlignment: ['Level 1 English 1.11', 'Level 1 English 1.12'],
      skills: ['Digital Literacy', 'Media Analysis', 'Online Reading', 'Digital Citizenship'],
    },
  ];

  const filteredUnits = readingUnits.filter((unit) => {
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
      case 'fiction':
        return '📚';
      case 'non-fiction':
        return '📖';
      case 'poetry':
        return '📝';
      case 'cultural':
        return '🏛️';
      default:
        return '📖';
    }
  };

  return (
    <div className="year8-reading-units-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-visual">
          <div className="cultural-pattern"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Year 8</span>
            <span>Reading Units</span>
          </h1>
          <p className="hero-subtitle">Exploring Literature Across Cultures</p>
          <p className="hero-description">
            Develop advanced reading skills through diverse texts, exploring cultural perspectives,
            contemporary issues, and literary traditions from Aotearoa and beyond.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Reading Units</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">75</span>
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
                placeholder="Search reading units, categories, or cultural elements..."
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
                <span className="filter-icon">📖</span>
                All Categories
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'fiction' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('fiction')}
              >
                <span className="filter-icon">📚</span>
                Fiction
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'non-fiction' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('non-fiction')}
              >
                <span className="filter-icon">📖</span>
                Non-Fiction
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'poetry' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('poetry')}
              >
                <span className="filter-icon">📝</span>
                Poetry
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
                <span className="difficulty-icon">📖</span>
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

      {/* Reading Units Section */}
      <section className="reading-section">
        <div className="container">
          <h2 className="section-title">Reading Units</h2>
          <div className="reading-grid">
            {filteredUnits.map((unit) => (
              <div key={unit.id} className="reading-card">
                <div className="reading-header">
                  <span className="reading-badge">
                    {getCategoryIcon(unit.category)} {unit.category}
                  </span>
                  <span
                    className="reading-difficulty"
                    style={{ backgroundColor: getDifficultyColor(unit.difficulty) }}
                  >
                    {unit.difficulty}
                  </span>
                </div>
                <h3 className="reading-title">{unit.title}</h3>
                <p className="reading-description">{unit.description}</p>

                <div className="reading-metrics">
                  <div className="metric">
                    <span className="metric-icon">⏱️</span>
                    <span className="metric-value">{unit.duration}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-icon">📖</span>
                    <span className="metric-value">{unit.activities} activities</span>
                  </div>
                </div>

                <div className="reading-cultural">
                  <h4>Cultural Elements</h4>
                  <p>{unit.culturalElements.join(', ')}</p>
                </div>

                <div className="reading-ncea">
                  <h4>NCEA Alignment</h4>
                  <p>{unit.nceaAlignment.join(', ')}</p>
                </div>

                <div className="reading-skills">
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

                <button className="explore-reading-btn">Explore Unit</button>
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
              <h3>Cultural Reading</h3>
              <p>
                Develop reading skills that respect and incorporate Māori and Pacific cultural
                perspectives and worldviews.
              </p>
            </div>
            <div className="cultural-item">
              <h3>Literary Excellence</h3>
              <p>
                Master advanced reading comprehension skills for academic success and informed
                citizenship.
              </p>
            </div>
            <div className="cultural-item">
              <h3>Cultural Identity</h3>
              <p>
                Use reading skills to explore cultural identity, belonging, and diversity in
                Aotearoa New Zealand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Explore Literature?</h2>
          <p className="cta-description">
            Start developing advanced reading skills that will prepare you for academic success and
            cultural understanding in a diverse world.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary">Start Reading</button>
            <button className="cta-button secondary">View Resources</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Year8ReadingUnits;
