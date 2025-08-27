import React, { useState } from 'react';
import './Year8CriticalLiteracy.css';

interface CriticalSkill {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'analysis' | 'evaluation' | 'synthesis' | 'cultural';
  duration: string;
  activities: number;
  culturalElements: string[];
  nceaAlignment: string[];
  skills: string[];
}

const Year8CriticalLiteracy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Enhanced Year 8 Critical Literacy with Cultural Integration
  const criticalSkills: CriticalSkill[] = [
    {
      id: 'skill-1',
      title: 'Cultural Text Analysis: Māori and Pacific Perspectives',
      description: 'Develop critical analysis skills to examine texts through Māori and Pacific cultural lenses, understanding multiple perspectives and worldviews.',
      difficulty: 'intermediate',
      category: 'cultural',
      duration: '5 weeks',
      activities: 12,
      culturalElements: ['Māori Worldview', 'Pacific Perspectives', 'Cultural Analysis', 'Multiple Perspectives'],
      nceaAlignment: ['Level 1 English 1.1', 'Level 1 English 1.2'],
      skills: ['Cultural Analysis', 'Perspective Taking', 'Critical Reading', 'Cultural Context']
    },
    {
      id: 'skill-2',
      title: 'Media Literacy: Digital and Traditional Media',
      description: 'Master critical evaluation of digital media, traditional texts, and multimedia content for bias, credibility, and cultural representation.',
      difficulty: 'advanced',
      category: 'evaluation',
      duration: '6 weeks',
      activities: 15,
      culturalElements: ['Media Bias', 'Cultural Representation', 'Digital Literacy', 'Critical Evaluation'],
      nceaAlignment: ['Level 1 English 1.3', 'Level 1 English 1.4'],
      skills: ['Media Analysis', 'Bias Detection', 'Credibility Assessment', 'Digital Literacy']
    },
    {
      id: 'skill-3',
      title: 'Argument Analysis: Logic and Reasoning',
      description: 'Develop skills to analyze arguments, identify logical fallacies, and evaluate evidence across cultural and academic contexts.',
      difficulty: 'intermediate',
      category: 'analysis',
      duration: '4 weeks',
      activities: 10,
      culturalElements: ['Logical Reasoning', 'Argument Structure', 'Evidence Evaluation', 'Cultural Logic'],
      nceaAlignment: ['Level 1 English 1.5', 'Level 1 English 1.6'],
      skills: ['Argument Analysis', 'Logical Fallacies', 'Evidence Evaluation', 'Critical Thinking']
    },
    {
      id: 'skill-4',
      title: 'Text Synthesis: Connecting Ideas Across Cultures',
      description: 'Learn to synthesize information from multiple sources, connecting ideas across cultural contexts and academic disciplines.',
      difficulty: 'advanced',
      category: 'synthesis',
      duration: '5 weeks',
      activities: 14,
      culturalElements: ['Cross-cultural Synthesis', 'Multiple Sources', 'Cultural Connections', 'Academic Integration'],
      nceaAlignment: ['Level 1 English 1.7', 'Level 1 English 1.8'],
      skills: ['Information Synthesis', 'Cross-cultural Analysis', 'Source Integration', 'Academic Writing']
    },
    {
      id: 'skill-5',
      title: 'Critical Reading: Deep Text Analysis',
      description: 'Master advanced reading strategies to analyze texts for meaning, purpose, audience, and cultural significance.',
      difficulty: 'intermediate',
      category: 'analysis',
      duration: '4 weeks',
      activities: 11,
      culturalElements: ['Deep Reading', 'Cultural Significance', 'Authorial Intent', 'Audience Analysis'],
      nceaAlignment: ['Level 1 English 1.9', 'Level 1 English 1.10'],
      skills: ['Deep Reading', 'Text Analysis', 'Authorial Intent', 'Audience Awareness']
    },
    {
      id: 'skill-6',
      title: 'Social Justice Literacy: Advocacy and Action',
      description: 'Develop critical literacy skills to analyze social issues, advocate for justice, and take informed action in communities.',
      difficulty: 'advanced',
      category: 'cultural',
      duration: '6 weeks',
      activities: 13,
      culturalElements: ['Social Justice', 'Community Action', 'Advocacy Skills', 'Cultural Advocacy'],
      nceaAlignment: ['Level 1 English 1.11', 'Level 1 English 1.12'],
      skills: ['Social Analysis', 'Advocacy Writing', 'Community Action', 'Cultural Leadership']
    }
  ];

  const filteredSkills = criticalSkills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || skill.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'var(--color-kowhai)';
      case 'intermediate': return 'var(--color-pounamu)';
      case 'advanced': return 'var(--color-primary)';
      default: return 'var(--color-pounamu)';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'analysis': return '🔍';
      case 'evaluation': return '⚖️';
      case 'synthesis': return '🔗';
      case 'cultural': return '🏛️';
      default: return '🧠';
    }
  };

  return (
    <div className="year8-critical-literacy-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-visual">
          <div className="cultural-pattern"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Year 8</span>
            <span>Critical Literacy</span>
          </h1>
          <p className="hero-subtitle">Mastering Advanced Critical Thinking</p>
          <p className="hero-description">
            Develop sophisticated critical literacy skills to analyze, evaluate, and synthesize 
            information across cultural contexts and academic disciplines.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Critical Skills</span>
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
                placeholder="Search critical skills, categories, or cultural elements..."
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
                <span className="filter-icon">🧠</span>
                All Categories
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'analysis' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('analysis')}
              >
                <span className="filter-icon">🔍</span>
                Analysis
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'evaluation' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('evaluation')}
              >
                <span className="filter-icon">⚖️</span>
                Evaluation
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'synthesis' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('synthesis')}
              >
                <span className="filter-icon">🔗</span>
                Synthesis
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
                <span className="difficulty-icon">🧠</span>
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
                className={`difficulty-btn ${selectedDifficulty === 'intermediate' ? 'active' : ''}`}
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

      {/* Critical Skills Section */}
      <section className="critical-section">
        <div className="container">
          <h2 className="section-title">Critical Literacy Skills</h2>
          <div className="critical-grid">
            {filteredSkills.map((skill) => (
              <div key={skill.id} className="critical-card">
                <div className="critical-header">
                  <span className="critical-badge">{getCategoryIcon(skill.category)} {skill.category}</span>
                  <span 
                    className="critical-difficulty"
                    style={{ backgroundColor: getDifficultyColor(skill.difficulty) }}
                  >
                    {skill.difficulty}
                  </span>
                </div>
                <h3 className="critical-title">{skill.title}</h3>
                <p className="critical-description">{skill.description}</p>
                
                <div className="critical-metrics">
                  <div className="metric">
                    <span className="metric-icon">⏱️</span>
                    <span className="metric-value">{skill.duration}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-icon">🧠</span>
                    <span className="metric-value">{skill.activities} activities</span>
                  </div>
                </div>

                <div className="critical-cultural">
                  <h4>Cultural Elements</h4>
                  <p>{skill.culturalElements.join(', ')}</p>
                </div>

                <div className="critical-ncea">
                  <h4>NCEA Alignment</h4>
                  <p>{skill.nceaAlignment.join(', ')}</p>
                </div>

                <div className="critical-skills">
                  <h4>Key Skills</h4>
                  <ul className="skills-list">
                    {skill.skills.map((skillItem, index) => (
                      <li key={index} className="skill-item">
                        <span className="skill-icon">🎯</span>
                        {skillItem}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="explore-critical-btn">
                  Explore Skill
                </button>
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
                <li><strong>English:</strong> Use a range of strategies to understand, interpret, and evaluate written texts.</li>
                <li><strong>English:</strong> Show a developing understanding of how language features are used for effect.</li>
                <li><strong>English:</strong> Show a developing understanding of ideas within, across, and beyond texts.</li>
                <li><strong>English:</strong> Show a developing understanding of how texts are shaped for different purposes and audiences.</li>
                <li><strong>English:</strong> Show a developing understanding of how to use writing conventions appropriately.</li>
              </ul>
            </div>
            <div className="curriculum-item">
              <h3>NCEA Level 1 Achievement Standards</h3>
              <ul className="ncea-list">
                <li><strong>1.1:</strong> Demonstrate understanding of specified aspect(s) of studied written text(s)</li>
                <li><strong>1.2:</strong> Demonstrate understanding of specified aspect(s) of studied visual or oral text(s)</li>
                <li><strong>1.3:</strong> Demonstrate understanding of significant aspects of unfamiliar written text(s)</li>
                <li><strong>1.4:</strong> Demonstrate understanding of significant aspects of unfamiliar visual or oral text(s)</li>
                <li><strong>1.5:</strong> Develop ideas in writing using a range of language features</li>
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
              <h3>Cultural Critical Thinking</h3>
              <p>Develop critical literacy skills that respect and incorporate Māori and Pacific cultural perspectives and worldviews.</p>
            </div>
            <div className="cultural-item">
              <h3>Academic Excellence</h3>
              <p>Master advanced critical thinking skills for academic success and informed decision-making across all subjects.</p>
            </div>
            <div className="cultural-item">
              <h3>Social Responsibility</h3>
              <p>Use critical literacy skills to analyze social issues, advocate for justice, and contribute positively to communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Master Critical Literacy?</h2>
          <p className="cta-description">
            Start developing sophisticated critical thinking skills that will prepare you 
            for academic success and informed citizenship in a diverse world.
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

export default Year8CriticalLiteracy;
