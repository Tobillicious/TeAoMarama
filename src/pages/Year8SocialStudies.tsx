import { useState } from 'react';
import './Year8SocialStudies.css';

interface SocialStudiesUnit {
  id: string;
  title: string;
  subtitle: string;
  topic: 'history' | 'geography' | 'civics' | 'cultural-studies' | 'economics' | 'environmental';
  duration: string;
  difficulty: 'foundation' | 'developing' | 'advanced';
  description: string;
  learningObjectives: string[];
  culturalContext: string;
  nceaAlignment: string;
  activities: string[];
  multimedia: string[];
}

const socialStudiesUnits: SocialStudiesUnit[] = [
  {
    id: 'te-tiriti-o-waitangi',
    title: 'Te Tiriti o Waitangi: Understanding Our Foundation',
    subtitle: 'Exploring the Treaty and its impact on Aotearoa New Zealand',
    topic: 'history',
    duration: '8 weeks',
    difficulty: 'foundation',
    description: 'Comprehensive exploration of Te Tiriti o Waitangi, its historical context, significance, and ongoing impact on New Zealand society. Students develop deep understanding of Treaty principles and their application in modern Aotearoa.',
    learningObjectives: [
      'Understand the historical context leading to the signing of Te Tiriti o Waitangi',
      'Analyze the different versions and interpretations of the Treaty',
      'Explore the impact of Treaty breaches and their consequences',
      'Examine contemporary Treaty settlements and their significance',
      'Develop critical thinking about Treaty principles in modern society',
    ],
    culturalContext: 'This unit honors Māori perspectives and knowledge systems, incorporating authentic voices and cultural protocols. Students engage with both historical and contemporary Māori viewpoints on Te Tiriti.',
    nceaAlignment: 'Builds foundation for NCEA Level 1 History standards, particularly AS 91001 and AS 91002.',
    activities: [
      'Te Tiriti Timeline Creation',
      'Contemporary Treaty Issues Debate',
      'Treaty Settlement Research Project',
      'Cultural Protocol Learning',
      'Community Consultation Simulation',
    ],
    multimedia: [
      'Interactive Treaty Timeline',
      'Video: Contemporary Treaty Perspectives',
      'Podcast: Māori Voices on Te Tiriti',
      'Slideshow: Historical Context',
      'Digital Map: Treaty Sites',
    ],
  },
  {
    id: 'maori-culture-contemporary',
    title: 'Māori Culture in Contemporary Aotearoa',
    subtitle: 'Exploring the vibrancy and evolution of Māori culture today',
    topic: 'cultural-studies',
    duration: '6 weeks',
    difficulty: 'developing',
    description: 'Students explore the dynamic nature of Māori culture in contemporary New Zealand, examining how traditional knowledge and practices continue to evolve and thrive in modern society.',
    learningObjectives: [
      'Understand the diversity and complexity of contemporary Māori culture',
      'Explore how traditional knowledge adapts to modern contexts',
      'Analyze the role of Māori culture in New Zealand identity',
      'Examine contemporary Māori leadership and innovation',
      'Develop appreciation for cultural diversity and resilience',
    ],
    culturalContext: 'This unit celebrates the vibrancy and resilience of Māori culture, incorporating authentic voices and contemporary perspectives while honoring traditional knowledge systems.',
    nceaAlignment: 'Supports NCEA Level 1 Social Studies standards, particularly AS 91040 and AS 91041.',
    activities: [
      'Contemporary Māori Leadership Study',
      'Cultural Innovation Research',
      'Traditional Knowledge Adaptation Project',
      'Māori Media Analysis',
      'Cultural Celebration Planning',
    ],
    multimedia: [
      'Video: Contemporary Māori Leaders',
      'Podcast: Māori Voices Today',
      'Interactive: Cultural Innovation Timeline',
      'Slideshow: Traditional Knowledge in Modern Context',
      'Digital Gallery: Contemporary Māori Art',
    ],
  },
  {
    id: 'new-zealand-geography',
    title: 'Aotearoa New Zealand: Our Geographic Story',
    subtitle: 'Exploring the physical and human geography of our country',
    topic: 'geography',
    duration: '7 weeks',
    difficulty: 'foundation',
    description: 'Students explore the diverse geography of Aotearoa New Zealand, from physical landscapes to human settlements, understanding how geography shapes our identity and way of life.',
    learningObjectives: [
      'Understand the physical geography of New Zealand',
      'Explore how geography influences human settlement patterns',
      'Analyze environmental challenges and opportunities',
      'Examine the relationship between people and place',
      'Develop geographic thinking and spatial awareness',
    ],
    culturalContext: 'This unit incorporates Māori perspectives on land, water, and place, honoring the deep connection between Māori and the whenua (land).',
    nceaAlignment: 'Builds foundation for NCEA Level 1 Geography standards, particularly AS 91007 and AS 91008.',
    activities: [
      'Local Place Study',
      'Geographic Feature Analysis',
      'Environmental Impact Assessment',
      'Settlement Pattern Investigation',
      'Cultural Landscape Mapping',
    ],
    multimedia: [
      'Interactive New Zealand Geography Map',
      'Video: Our Geographic Story',
      'Podcast: Place and Identity',
      'Slideshow: Physical Geography Features',
      'Digital Atlas: Cultural Landscapes',
    ],
  },
  {
    id: 'democracy-citizenship',
    title: 'Democracy and Citizenship in Aotearoa',
    subtitle: 'Understanding our democratic system and civic responsibilities',
    topic: 'civics',
    duration: '6 weeks',
    difficulty: 'developing',
    description: 'Students explore New Zealand\'s democratic system, understanding how government works, the role of citizens, and how to participate effectively in our democracy.',
    learningObjectives: [
      'Understand New Zealand\'s democratic system',
      'Explore the role of government and citizens',
      'Analyze current political issues and debates',
      'Develop civic participation skills',
      'Examine the Treaty relationship in governance',
    ],
    culturalContext: 'This unit examines how Te Tiriti o Waitangi influences our democratic system and governance, incorporating Māori perspectives on citizenship and participation.',
    nceaAlignment: 'Supports NCEA Level 1 Social Studies standards, particularly AS 91037 and AS 91038.',
    activities: [
      'School Democracy Simulation',
      'Political Issue Analysis',
      'Civic Participation Project',
      'Government Structure Investigation',
      'Treaty and Governance Study',
    ],
    multimedia: [
      'Interactive Democracy Simulation',
      'Video: Our Democratic System',
      'Podcast: Civic Participation',
      'Slideshow: Government Structure',
      'Digital: Political Process Timeline',
    ],
  },
  {
    id: 'environmental-sustainability',
    title: 'Environmental Sustainability: Kaitiakitanga in Action',
    subtitle: 'Exploring environmental challenges and sustainable solutions',
    topic: 'environmental',
    duration: '7 weeks',
    difficulty: 'advanced',
    description: 'Students explore environmental challenges facing New Zealand and the world, examining sustainable solutions and the role of kaitiakitanga (guardianship) in environmental protection.',
    learningObjectives: [
      'Understand key environmental challenges',
      'Explore sustainable solutions and practices',
      'Analyze the role of kaitiakitanga in environmental protection',
      'Examine global and local environmental issues',
      'Develop environmental action plans',
    ],
    culturalContext: 'This unit centers kaitiakitanga (guardianship) as a fundamental principle, incorporating Māori environmental knowledge and practices throughout.',
    nceaAlignment: 'Supports NCEA Level 1 Geography standards, particularly AS 91007 and AS 91008.',
    activities: [
      'Environmental Action Project',
      'Kaitiakitanga Principles Study',
      'Sustainable Practice Investigation',
      'Environmental Impact Assessment',
      'Community Environmental Initiative',
    ],
    multimedia: [
      'Video: Kaitiakitanga in Action',
      'Interactive Environmental Challenge Simulator',
      'Podcast: Environmental Guardianship',
      'Slideshow: Sustainable Solutions',
      'Digital: Environmental Impact Mapping',
    ],
  },
];

const Year8SocialStudies = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnits = socialStudiesUnits.filter((unit) => {
    const matchesTopic = selectedTopic === 'all' || unit.topic === selectedTopic;
    const matchesDifficulty = selectedDifficulty === 'all' || unit.difficulty === selectedDifficulty;
    const matchesSearch = unit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTopic && matchesDifficulty && matchesSearch;
  });

  const topics = [
    { id: 'all', label: 'All Topics', icon: '🌍' },
    { id: 'history', label: 'History', icon: '📚' },
    { id: 'geography', label: 'Geography', icon: '🗺️' },
    { id: 'civics', label: 'Civics', icon: '🏛️' },
    { id: 'cultural-studies', label: 'Cultural Studies', icon: '🌿' },
    { id: 'economics', label: 'Economics', icon: '💰' },
    { id: 'environmental', label: 'Environmental', icon: '🌱' },
  ];

  const difficulties = [
    { id: 'all', label: 'All Levels', icon: '📊' },
    { id: 'foundation', label: 'Foundation', icon: '🌱' },
    { id: 'developing', label: 'Developing', icon: '🌿' },
    { id: 'advanced', label: 'Advanced', icon: '🌳' },
  ];

  return (
    <div className="year8-social-studies-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            🌍 Year 8 Social Studies
            <span className="hero-subtitle">Exploring Aotearoa New Zealand and Our World</span>
          </h1>
          <p className="hero-description">
            Comprehensive social studies units covering New Zealand history, geography, civics, and cultural studies. 
            All content integrates curriculum requirements with authentic Māori perspectives and cultural responsiveness.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{socialStudiesUnits.length}</span>
              <span className="stat-label">Units</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Cultural Integration</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">NCEA</span>
              <span className="stat-label">Aligned</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="cultural-pattern"></div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-grid">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-buttons">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`filter-btn ${selectedTopic === topic.id ? 'active' : ''}`}
                >
                  <span className="filter-icon">{topic.icon}</span>
                  {topic.label}
                </button>
              ))}
            </div>
            <div className="difficulty-filters">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`difficulty-btn ${selectedDifficulty === difficulty.id ? 'active' : ''}`}
                >
                  <span className="difficulty-icon">{difficulty.icon}</span>
                  {difficulty.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Units Grid */}
      <section className="units-section">
        <div className="container">
          <h2 className="section-title">Social Studies Units</h2>
          <div className="units-grid">
            {filteredUnits.map((unit) => (
              <div key={unit.id} className="unit-card">
                <div className="unit-header">
                  <div className="unit-badge">{unit.topic.toUpperCase()}</div>
                  <div className="unit-difficulty">{unit.difficulty}</div>
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
                    <span className="metric-icon">📚</span>
                    <span className="metric-value">{unit.activities.length} Activities</span>
                  </div>
                  <div className="metric">
                    <span className="metric-icon">🎯</span>
                    <span className="metric-value">{unit.learningObjectives.length} Objectives</span>
                  </div>
                </div>

                <div className="unit-cultural">
                  <h4>Cultural Integration</h4>
                  <p>{unit.culturalContext}</p>
                </div>

                <div className="unit-ncea">
                  <h4>NCEA Alignment</h4>
                  <p>{unit.nceaAlignment}</p>
                </div>

                <div className="unit-activities">
                  <h4>Key Activities</h4>
                  <ul className="activities-list">
                    {unit.activities.slice(0, 3).map((activity, index) => (
                      <li key={index} className="activity-item">
                        <span className="activity-icon">🎯</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="unit-multimedia">
                  <h4>Multimedia Resources</h4>
                  <div className="multimedia-grid">
                    {unit.multimedia.slice(0, 3).map((resource, index) => (
                      <div key={index} className="multimedia-item">
                        <span className="multimedia-icon">📊</span>
                        <span className="multimedia-title">{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="explore-unit-btn">
                  Explore Unit →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Integration Section */}
      <section className="curriculum-section">
        <div className="container">
          <h2 className="section-title">Curriculum Integration</h2>
          <div className="curriculum-content">
            <div className="curriculum-item">
              <h3>New Zealand Curriculum Alignment</h3>
              <ul className="curriculum-list">
                <li><strong>Social Sciences:</strong> Understand how societies work and how people can participate as critical, active, informed, and responsible citizens</li>
                <li><strong>Key Competencies:</strong> Thinking, Using language, symbols, and texts, Managing self, Relating to others, Participating and contributing</li>
                <li><strong>Values:</strong> Excellence, Innovation, inquiry, and curiosity, Diversity, Equity, Community and participation, Ecological sustainability, Integrity, Respect</li>
                <li><strong>Principles:</strong> Treaty of Waitangi, Cultural diversity, Inclusion, Learning to learn, Community engagement, Coherence, Future focus</li>
              </ul>
            </div>
            <div className="curriculum-item">
              <h3>NCEA Level 1 Preparation</h3>
              <ul className="ncea-list">
                <li><strong>History:</strong> AS 91001, AS 91002 - Understanding significant events and places</li>
                <li><strong>Geography:</strong> AS 91007, AS 91008 - Geographic understanding of environments and population</li>
                <li><strong>Social Studies:</strong> AS 91037, AS 91038 - Social studies concepts and inquiry</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Excellence Section */}
      <section className="cultural-excellence-section">
        <div className="container">
          <h2 className="section-title">Cultural Excellence</h2>
          <div className="cultural-content">
            <div className="cultural-item">
              <h3>Māori Perspectives Integration</h3>
              <p>Every unit incorporates authentic Māori perspectives, honoring traditional knowledge systems and cultural protocols. Students engage with both historical and contemporary Māori viewpoints.</p>
            </div>
            <div className="cultural-item">
              <h3>Cultural Safety</h3>
              <p>All content is reviewed for cultural appropriateness, ensuring respectful representation of Māori knowledge and community consultation protocols.</p>
            </div>
            <div className="cultural-item">
              <h3>Te Tiriti o Waitangi</h3>
              <p>The Treaty relationship is central to our social studies approach, examining how Treaty principles influence governance, citizenship, and social relationships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Explore Our Social World?</h2>
          <p className="cta-description">
            Dive into comprehensive social studies units that connect curriculum requirements with authentic cultural perspectives.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary">
              Start Learning
            </button>
            <button className="cta-button secondary">
              View All Units
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Year8SocialStudies;
