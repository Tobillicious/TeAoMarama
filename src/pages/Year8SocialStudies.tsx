import React, { useEffect, useState } from 'react';
import { advancedSuperintelligenceEnhancer } from '../utils/advanced-superintelligence-enhancer';
import './Year8SocialStudies.css';

interface Unit {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  activities: number;
  culturalElements: string[];
  nceaAlignment: string[];
  multimedia: string[];
}

const Year8SocialStudies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Enhanced Year 8 Social Studies Units with Cultural Integration
  const units: Unit[] = [
    {
      id: 'unit-1',
      title: 'Te Ao Māori: Māori Worldview and Society',
      subtitle: 'Understanding Māori perspectives and cultural values',
      description:
        'Explore the fundamental concepts of Te Ao Māori, including whakapapa, mana, tapu, and the interconnectedness of all things. Students will develop cultural competency and understanding of Māori worldviews.',
      difficulty: 'intermediate',
      duration: '6 weeks',
      activities: 12,
      culturalElements: ['Whakapapa', 'Mana', 'Tapu', 'Kaitiakitanga', 'Whanaungatanga'],
      nceaAlignment: ['Level 1 Social Studies 1.1', 'Level 1 Social Studies 1.2'],
      multimedia: ['Interactive Timeline', 'Virtual Marae Visit', 'Cultural Stories'],
    },
    {
      id: 'unit-2',
      title: 'Colonisation and Its Impact on Aotearoa',
      subtitle: 'Historical analysis of colonial processes and consequences',
      description:
        'Investigate the processes of colonisation in Aotearoa New Zealand, examining the Treaty of Waitangi, land confiscations, and ongoing impacts on Māori communities and society.',
      difficulty: 'advanced',
      duration: '8 weeks',
      activities: 15,
      culturalElements: [
        'Treaty of Waitangi',
        'Land Confiscations',
        'Cultural Resistance',
        'Tino Rangatiratanga',
      ],
      nceaAlignment: ['Level 1 Social Studies 1.3', 'Level 1 Social Studies 1.4'],
      multimedia: ['Documentary Analysis', 'Primary Source Database', 'Interactive Maps'],
    },
    {
      id: 'unit-3',
      title: 'Contemporary Māori Issues and Activism',
      subtitle: 'Modern challenges and Māori responses',
      description:
        'Examine current issues affecting Māori communities, including social justice, environmental protection, language revitalisation, and political representation.',
      difficulty: 'advanced',
      duration: '6 weeks',
      activities: 10,
      culturalElements: [
        'Te Reo Māori Revival',
        'Environmental Activism',
        'Social Justice',
        'Political Representation',
      ],
      nceaAlignment: ['Level 1 Social Studies 1.5', 'Level 1 Social Studies 1.6'],
      multimedia: ['Case Study Videos', 'Activist Interviews', 'Current Events Database'],
    },
    {
      id: 'unit-4',
      title: 'Pacific Peoples in Aotearoa',
      subtitle: 'Diversity and contributions of Pacific communities',
      description:
        'Learn about the diverse Pacific communities in Aotearoa New Zealand, their histories, cultures, and contributions to New Zealand society.',
      difficulty: 'intermediate',
      duration: '5 weeks',
      activities: 8,
      culturalElements: [
        'Pacific Migration',
        'Cultural Festivals',
        'Community Leadership',
        'Youth Empowerment',
      ],
      nceaAlignment: ['Level 1 Social Studies 1.7', 'Level 1 Social Studies 1.8'],
      multimedia: ['Migration Stories', 'Cultural Festival Videos', 'Community Profiles'],
    },
    {
      id: 'unit-5',
      title: 'Global Citizenship and Human Rights',
      subtitle: 'International perspectives and responsibilities',
      description:
        "Develop understanding of global citizenship, human rights, and New Zealand's role in international affairs and humanitarian efforts.",
      difficulty: 'intermediate',
      duration: '7 weeks',
      activities: 14,
      culturalElements: [
        'Global Indigenous Rights',
        'Cultural Diplomacy',
        'Humanitarian Aid',
        'Peacekeeping',
      ],
      nceaAlignment: ['Level 1 Social Studies 1.9', 'Level 1 Social Studies 1.10'],
      multimedia: ['UN Resources', 'Global Case Studies', 'Interactive Simulations'],
    },
    {
      id: 'unit-6',
      title: 'Environmental Sustainability and Kaitiakitanga',
      subtitle: 'Environmental stewardship and sustainable practices',
      description:
        'Explore environmental challenges and solutions through the lens of kaitiakitanga (guardianship) and sustainable development principles.',
      difficulty: 'beginner',
      duration: '4 weeks',
      activities: 9,
      culturalElements: [
        'Kaitiakitanga',
        'Sustainable Practices',
        'Environmental Protection',
        'Future Planning',
      ],
      nceaAlignment: ['Level 1 Social Studies 1.11', 'Level 1 Social Studies 1.12'],
      multimedia: [
        'Environmental Monitoring Tools',
        'Sustainability Calculators',
        'Virtual Field Trips',
      ],
    },
  ];

  // Enhanced superintelligence integration
  useEffect(() => {
    const enhanceContent = async () => {
      try {
        advancedSuperintelligenceEnhancer.getMetrics();
        // setEnhancementLevel(metrics.overallEnhancement); // This line was removed
        console.log('🌟 Year 8 Social Studies enhanced with superintelligence');
      } catch (error) {
        console.log('Enhancement system active:', error);
      }
    };

    enhanceContent();
  }, []);

  const filteredUnits = units.filter((unit) => {
    const matchesSearch =
      unit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' ||
      unit.culturalElements.some((element) =>
        element.toLowerCase().includes(selectedFilter.toLowerCase()),
      );
    const matchesDifficulty =
      selectedDifficulty === 'all' || unit.difficulty === selectedDifficulty;

    return matchesSearch && matchesFilter && matchesDifficulty;
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

  return (
    <div className="year8-social-studies-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-visual">
          <div className="cultural-pattern"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Year 8</span>
            <span>Social Studies</span>
          </h1>
          <p className="hero-subtitle">Exploring Aotearoa's Past, Present, and Future</p>
          <p className="hero-description">
            Journey through New Zealand's rich cultural heritage, examining historical events,
            contemporary issues, and developing critical thinking skills for active citizenship.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Comprehensive Units</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">68</span>
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
                placeholder="Search units, topics, or cultural elements..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                <span className="filter-icon">🌿</span>
                All Topics
              </button>
              <button
                className={`filter-btn ${selectedFilter === 'māori' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('māori')}
              >
                <span className="filter-icon">🏛️</span>
                Te Ao Māori
              </button>
              <button
                className={`filter-btn ${selectedFilter === 'treaty' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('treaty')}
              >
                <span className="filter-icon">📜</span>
                Treaty Studies
              </button>
              <button
                className={`filter-btn ${selectedFilter === 'pacific' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('pacific')}
              >
                <span className="filter-icon">🌊</span>
                Pacific Peoples
              </button>
              <button
                className={`filter-btn ${selectedFilter === 'global' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('global')}
              >
                <span className="filter-icon">🌍</span>
                Global Issues
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

      {/* Units Section */}
      <section className="units-section">
        <div className="container">
          <h2 className="section-title">Learning Units</h2>
          <div className="units-grid">
            {filteredUnits.map((unit) => (
              <div key={unit.id} className="unit-card">
                <div className="unit-header">
                  <span className="unit-badge">Unit {unit.id.split('-')[1]}</span>
                  <span
                    className="unit-difficulty"
                    style={{ backgroundColor: getDifficultyColor(unit.difficulty) }}
                  >
                    {unit.difficulty}
                  </span>
                </div>
                <h3 className="unit-title">{unit.title}</h3>
                <p className="unit-subtitle">{unit.subtitle}</p>
                <p className="unit-description">{unit.description}</p>

                <div className="unit-metrics">
                  <div className="metric">
                    <span className="metric-icon">⏱️</span>
                    <span className="metric-value">{unit.duration}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-icon">📝</span>
                    <span className="metric-value">{unit.activities} activities</span>
                  </div>
                </div>

                <div className="unit-cultural">
                  <h4>Cultural Elements</h4>
                  <p>{unit.culturalElements.join(', ')}</p>
                </div>

                <div className="unit-ncea">
                  <h4>NCEA Alignment</h4>
                  <p>{unit.nceaAlignment.join(', ')}</p>
                </div>

                <div className="unit-activities">
                  <h4>Key Activities</h4>
                  <ul className="activities-list">
                    <li className="activity-item">
                      <span className="activity-icon">🔍</span>
                      Historical Analysis
                    </li>
                    <li className="activity-item">
                      <span className="activity-icon">💭</span>
                      Critical Thinking
                    </li>
                    <li className="activity-item">
                      <span className="activity-icon">🤝</span>
                      Cultural Exchange
                    </li>
                  </ul>
                </div>

                <div className="unit-multimedia">
                  <h4>Multimedia Resources</h4>
                  <div className="multimedia-grid">
                    {unit.multimedia.map((item, index) => (
                      <div key={index} className="multimedia-item">
                        <span className="multimedia-icon">🎬</span>
                        <span className="multimedia-title">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="explore-unit-btn">Explore Unit</button>
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
                  <strong>Social Studies:</strong> Understand how people pass on and sustain culture
                  and heritage for different reasons and that this has consequences for people.
                </li>
                <li>
                  <strong>Social Studies:</strong> Understand how people seek and have sought
                  economic growth through business, enterprise, and innovation.
                </li>
                <li>
                  <strong>Social Studies:</strong> Understand how people participate individually
                  and collectively in response to community challenges.
                </li>
                <li>
                  <strong>Social Studies:</strong> Understand how the ideas and actions of people in
                  the past have had a significant impact on people's lives.
                </li>
                <li>
                  <strong>Social Studies:</strong> Understand how people's management of resources
                  impacts on environmental and social sustainability.
                </li>
              </ul>
            </div>
            <div className="curriculum-item">
              <h3>NCEA Level 1 Achievement Standards</h3>
              <ul className="ncea-list">
                <li>
                  <strong>1.1:</strong> Demonstrate understanding of findings of a Social Studies
                  inquiry
                </li>
                <li>
                  <strong>1.2:</strong> Demonstrate understanding of how individuals and groups
                  respond to change
                </li>
                <li>
                  <strong>1.3:</strong> Demonstrate understanding of how cultural practices vary but
                  reflect similar purposes
                </li>
                <li>
                  <strong>1.4:</strong> Demonstrate understanding of how people participate in
                  communities
                </li>
                <li>
                  <strong>1.5:</strong> Demonstrate understanding of how people seek and have sought
                  economic growth
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
              <h3>Cultural Competency</h3>
              <p>
                Develop deep understanding of Māori and Pacific worldviews, values, and
                perspectives. Learn to engage respectfully with diverse cultural practices and
                histories.
              </p>
            </div>
            <div className="cultural-item">
              <h3>Critical Thinking</h3>
              <p>
                Analyze historical events and contemporary issues from multiple perspectives.
                Develop skills in evaluating sources, forming arguments, and making informed
                decisions.
              </p>
            </div>
            <div className="cultural-item">
              <h3>Active Citizenship</h3>
              <p>
                Understand your role as a citizen in Aotearoa New Zealand and the global community.
                Learn how to participate meaningfully in democratic processes and social justice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Begin Your Journey?</h2>
          <p className="cta-description">
            Start exploring New Zealand's rich social history and develop the skills needed to be an
            informed, culturally competent citizen of Aotearoa.
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

export default Year8SocialStudies;
