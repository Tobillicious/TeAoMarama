import { useState } from 'react';
import './Year8ReadingUnits.css';

interface ReadingUnit {
  id: string;
  title: string;
  subtitle: string;
  approach: 'writing-revolution' | 'the-code' | 'structured-literacy' | 'cultural-integration';
  duration: string;
  difficulty: 'foundation' | 'developing' | 'advanced';
  description: string;
  learningObjectives: string[];
  culturalContext: string;
  nceaAlignment: string;
  activities: ReadingActivity[];
  assessment: AssessmentItem[];
  resources: string[];
}

interface ReadingActivity {
  id: string;
  name: string;
  type:
    | 'before-reading'
    | 'during-reading'
    | 'after-reading'
    | 'vocabulary'
    | 'comprehension'
    | 'writing';
  duration: string;
  description: string;
  steps: string[];
  materials: string[];
  culturalIntegration: string;
  differentiation: string[];
}

interface AssessmentItem {
  type: 'formative' | 'summative' | 'self-assessment';
  description: string;
  criteria: string[];
  culturalConsiderations: string;
}

const readingUnits: ReadingUnit[] = [
  {
    id: 'sentence-expansion-revolution',
    title: 'Sentence Expansion Revolution',
    subtitle: 'Building Complex Sentences with Cultural Context',
    approach: 'writing-revolution',
    duration: '6 weeks',
    difficulty: 'foundation',
    description:
      "Systematic approach to sentence development using Liz Kane's Writing Revolution methodology, integrated with Māori cultural contexts and Te Reo Māori vocabulary.",
    learningObjectives: [
      'Transform simple sentences into complex, detailed sentences',
      'Incorporate cultural knowledge and Te Reo Māori vocabulary',
      'Build sentence variety and sophistication',
      'Develop descriptive writing skills for NCEA preparation',
    ],
    culturalContext:
      'Uses Māori cultural contexts, traditional knowledge, and authentic Te Reo Māori vocabulary to build sentence complexity while honoring cultural protocols.',
    nceaAlignment:
      'Builds foundation skills for NCEA Level 1 English writing standards, particularly detailed description and analysis.',
    activities: [
      {
        id: 'kernel-sentence-expansion',
        name: 'Kernel Sentence Expansion',
        type: 'before-reading',
        duration: '20 minutes',
        description:
          'Start with basic kernel sentences and systematically add details using the 5W1H framework with cultural integration.',
        steps: [
          'Present a kernel sentence (e.g., "The tūī flew.")',
          'Ask: Who? What? When? Where? Why? How?',
          'Add cultural context: "The native tūī flew through the sacred kōwhai tree."',
          'Add time and place: "Yesterday, the native tūī flew gracefully through the golden kōwhai tree in our school garden."',
          'Add purpose and detail: "Yesterday, the native tūī flew gracefully through the golden kōwhai tree in our school garden, searching for nectar to feed its young."',
        ],
        materials: [
          'Kernel sentence cards',
          'Cultural vocabulary lists',
          'Question prompts',
          'Whiteboard',
        ],
        culturalIntegration:
          'Incorporates Māori bird species, native plants, and cultural concepts in sentence expansion.',
        differentiation: [
          'Foundation: Focus on 2-3 detail additions',
          'Developing: Add 4-5 details with cultural context',
          'Advanced: Create compound-complex sentences with multiple cultural references',
        ],
      },
      {
        id: 'appositive-practice',
        name: 'Appositive Practice with Cultural Figures',
        type: 'during-reading',
        duration: '25 minutes',
        description:
          'Add detailed information using appositive phrases about Māori cultural figures and concepts.',
        steps: [
          'Identify nouns to elaborate on',
          'Create appositive phrases with cultural information',
          'Place appositives next to nouns with proper punctuation',
          'Check sentence clarity and cultural accuracy',
        ],
        materials: ['Cultural figure cards', 'Appositive examples', 'Practice worksheets'],
        culturalIntegration:
          'Uses Māori historical figures, cultural concepts, and traditional knowledge in appositive practice.',
        differentiation: [
          'Foundation: Simple appositives with basic cultural terms',
          'Developing: Complex appositives with historical context',
          'Advanced: Multiple appositives with detailed cultural explanations',
        ],
      },
    ],
    assessment: [
      {
        type: 'formative',
        description: 'Sentence expansion checkpoints throughout the unit',
        criteria: [
          'Sentence complexity increases systematically',
          'Cultural context is appropriately integrated',
          'Te Reo Māori vocabulary is used correctly',
          'Grammar and punctuation are accurate',
        ],
        culturalConsiderations:
          'Ensure cultural accuracy and respect in all sentence examples and assessments.',
      },
    ],
    resources: [
      'Liz Kane Writing Revolution materials',
      'Māori cultural vocabulary lists',
      'Sentence pattern cards',
      'Cultural context guides',
    ],
  },
  {
    id: 'the-code-phonological',
    title: 'The Code: Phonological Awareness',
    subtitle: 'Systematic Phonics with Cultural Integration',
    approach: 'the-code',
    duration: '4 weeks',
    difficulty: 'foundation',
    description:
      "Liz Kane's systematic phonics approach integrated with Te Reo Māori phonology and cultural vocabulary building.",
    learningObjectives: [
      'Master systematic phonics patterns',
      'Apply phonics to Te Reo Māori vocabulary',
      'Build phonological awareness across languages',
      'Develop decoding skills for complex texts',
    ],
    culturalContext:
      'Integrates Māori phonology, pronunciation patterns, and cultural vocabulary into systematic phonics instruction.',
    nceaAlignment:
      'Builds essential reading skills for NCEA Level 1 text analysis and comprehension.',
    activities: [
      {
        id: 'phoneme-grapheme-mapping',
        name: 'Phoneme-Grapheme Mapping with Māori Words',
        type: 'vocabulary',
        duration: '30 minutes',
        description:
          'Map sounds to letters using both English and Te Reo Māori words to build phonological awareness.',
        steps: [
          'Present target phoneme (e.g., /k/)',
          'Show English words: cat, kite, book',
          'Show Māori words: kai, kōwhai, kauri',
          'Map phoneme-grapheme correspondences',
          'Practice blending and segmenting',
        ],
        materials: ['Phoneme cards', 'Māori vocabulary cards', 'Mapping grids', 'Sound boxes'],
        culturalIntegration:
          'Uses authentic Māori words and proper pronunciation to build phonological awareness.',
        differentiation: [
          'Foundation: Focus on common phonemes',
          'Developing: Include digraphs and blends',
          'Advanced: Complex phoneme patterns and Māori-specific sounds',
        ],
      },
      {
        id: 'syllable-division',
        name: 'Syllable Division with Cultural Words',
        type: 'comprehension',
        duration: '25 minutes',
        description: 'Practice syllable division using Māori place names and cultural terms.',
        steps: [
          'Identify syllable patterns in Māori words',
          'Divide words into syllables',
          'Practice reading multisyllabic words',
          'Connect to cultural meanings',
        ],
        materials: ['Syllable cards', 'Māori place names', 'Cultural terms list'],
        culturalIntegration:
          'Uses authentic Māori place names and cultural terms to teach syllable division.',
        differentiation: [
          'Foundation: Simple 2-3 syllable words',
          'Developing: Complex multisyllabic words',
          'Advanced: Compound words and phrases',
        ],
      },
    ],
    assessment: [
      {
        type: 'summative',
        description: 'Phonological awareness assessment with cultural vocabulary',
        criteria: [
          'Accurate phoneme-grapheme mapping',
          'Correct pronunciation of Māori words',
          'Syllable division accuracy',
          'Cultural vocabulary recognition',
        ],
        culturalConsiderations:
          'Ensure proper pronunciation and cultural respect in all assessments.',
      },
    ],
    resources: [
      'Liz Kane The Code materials',
      'Māori pronunciation guides',
      'Phonological awareness games',
      'Cultural vocabulary cards',
    ],
  },
  {
    id: 'structured-literacy-comprehension',
    title: 'Structured Literacy Comprehension',
    subtitle: 'Systematic Reading Strategies with Cultural Texts',
    approach: 'structured-literacy',
    duration: '5 weeks',
    difficulty: 'developing',
    description:
      'Comprehensive reading comprehension strategies using structured literacy approaches with authentic Māori and Pacific texts.',
    learningObjectives: [
      'Apply systematic reading strategies',
      'Analyze cultural texts with sensitivity',
      'Build comprehension monitoring skills',
      'Develop critical thinking about diverse perspectives',
    ],
    culturalContext:
      'Uses authentic Māori and Pacific texts, stories, and perspectives to build comprehension skills while honoring cultural protocols.',
    nceaAlignment:
      'Develops critical reading skills essential for NCEA Level 1 English text analysis and interpretation.',
    activities: [
      {
        id: 'think-aloud-protocol',
        name: 'Think-Aloud Protocol with Cultural Texts',
        type: 'during-reading',
        duration: '35 minutes',
        description:
          'Model thinking processes while reading cultural texts to build comprehension strategies.',
        steps: [
          'Select appropriate cultural text',
          'Model thinking aloud while reading',
          'Share cultural connections and questions',
          'Demonstrate comprehension monitoring',
          'Validate diverse perspectives',
        ],
        materials: ['Cultural text selection', 'Think-aloud prompts', 'Comprehension questions'],
        culturalIntegration:
          'Uses authentic Māori and Pacific texts with proper cultural protocols and respect.',
        differentiation: [
          'Foundation: Simple texts with basic strategies',
          'Developing: Complex texts with multiple strategies',
          'Advanced: Multiple texts with comparative analysis',
        ],
      },
      {
        id: 'kwa-chart-cultural',
        name: 'KWA Chart with Cultural Knowledge',
        type: 'before-reading',
        duration: '20 minutes',
        description:
          'Organize prior knowledge and learning goals using cultural knowledge frameworks.',
        steps: [
          'What do I already Know about this cultural topic?',
          'What do I Want to learn about this culture?',
          'What have I Acquired/learned after reading?',
        ],
        materials: ['KWA chart templates', 'Cultural context guides', 'Background information'],
        culturalIntegration:
          'Incorporates mātauranga Māori and cultural knowledge in the "Know" column.',
        differentiation: [
          'Foundation: Basic cultural concepts',
          'Developing: Historical and contemporary contexts',
          'Advanced: Complex cultural analysis and synthesis',
        ],
      },
    ],
    assessment: [
      {
        type: 'self-assessment',
        description: 'Comprehension strategy self-reflection',
        criteria: [
          'Strategy use effectiveness',
          'Cultural sensitivity and respect',
          'Comprehension monitoring',
          'Critical thinking development',
        ],
        culturalConsiderations:
          'Ensure cultural protocols are followed and diverse perspectives are valued.',
      },
    ],
    resources: [
      'Authentic Māori and Pacific texts',
      'Cultural context guides',
      'Comprehension strategy cards',
      'Graphic organizers',
    ],
  },
  {
    id: 'cultural-vocabulary-integration',
    title: 'Cultural Vocabulary Integration',
    subtitle: 'Building Academic Language with Cultural Context',
    approach: 'cultural-integration',
    duration: '4 weeks',
    difficulty: 'developing',
    description:
      'Systematic vocabulary development integrating Te Reo Māori academic terms, cultural concepts, and bilingual language building.',
    learningObjectives: [
      'Master academic vocabulary across subjects',
      'Integrate Te Reo Māori academic terms',
      'Build cultural concept vocabulary',
      'Develop bilingual language skills',
    ],
    culturalContext:
      'Incorporates authentic Te Reo Māori academic terms, cultural concepts, and traditional knowledge into vocabulary instruction.',
    nceaAlignment:
      'Builds vocabulary essential for success across all NCEA Level 1 subjects and assessments.',
    activities: [
      {
        id: 'word-analysis-cultural',
        name: 'Word Analysis with Cultural Roots',
        type: 'vocabulary',
        duration: '25 minutes',
        description:
          'Analyze word structure and meaning using both English and Māori word origins.',
        steps: [
          'Identify word parts and origins',
          'Connect to cultural meanings',
          'Build word families',
          'Practice in context',
        ],
        materials: ['Word analysis cards', 'Cultural etymology guides', 'Context examples'],
        culturalIntegration:
          'Uses Māori word origins and cultural meanings to build vocabulary understanding.',
        differentiation: [
          'Foundation: Basic word analysis',
          'Developing: Complex word origins',
          'Advanced: Comparative language analysis',
        ],
      },
      {
        id: 'semantic-mapping',
        name: 'Semantic Mapping with Cultural Concepts',
        type: 'after-reading',
        duration: '30 minutes',
        description:
          'Create semantic maps connecting vocabulary to cultural concepts and contexts.',
        steps: [
          'Select key vocabulary words',
          'Identify cultural connections',
          'Create semantic relationships',
          'Build concept networks',
        ],
        materials: ['Semantic mapping templates', 'Cultural concept cards', 'Relationship markers'],
        culturalIntegration: 'Connects vocabulary to authentic cultural concepts and contexts.',
        differentiation: [
          'Foundation: Simple concept maps',
          'Developing: Complex relationship networks',
          'Advanced: Multi-dimensional concept analysis',
        ],
      },
    ],
    assessment: [
      {
        type: 'formative',
        description: 'Vocabulary development checkpoints',
        criteria: [
          'Vocabulary acquisition and use',
          'Cultural context understanding',
          'Bilingual language development',
          'Academic language proficiency',
        ],
        culturalConsiderations:
          'Ensure cultural accuracy and appropriate use of Te Reo Māori terms.',
      },
    ],
    resources: [
      'Te Reo Māori academic glossaries',
      'Cultural concept guides',
      'Vocabulary development games',
      'Bilingual dictionaries',
    ],
  },
];

const Year8ReadingUnits = () => {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    'all' | 'writing-revolution' | 'the-code' | 'structured-literacy' | 'cultural-integration'
  >('all');

  const filteredUnits = readingUnits.filter((unit) => filter === 'all' || unit.approach === filter);

  const getApproachIcon = (approach: string) => {
    switch (approach) {
      case 'writing-revolution':
        return '✍️';
      case 'the-code':
        return '🔤';
      case 'structured-literacy':
        return '📚';
      case 'cultural-integration':
        return '🌿';
      default:
        return '📖';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'foundation':
        return 'var(--color-primary)';
      case 'developing':
        return 'var(--color-pounamu)';
      case 'advanced':
        return 'var(--color-deep-purple)';
      default:
        return 'var(--color-neutral-600)';
    }
  };

  return (
    <div className="year8-reading-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Year 8 Reading Units
            <span className="cultural-accent">Inspired by Liz Kane</span>
          </h1>
          <p className="hero-description">
            Comprehensive reading instruction based on "The Writing Revolution" and "The Code"
            methodologies, integrated with authentic Māori cultural contexts and Te Reo Māori
            language development.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Core Units</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Cultural Integration</span>
            </div>
            <div className="stat">
              <span className="stat-number">Liz Kane</span>
              <span className="stat-label">Methodology</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Approaches
          </button>
          <button
            className={`filter-btn ${filter === 'writing-revolution' ? 'active' : ''}`}
            onClick={() => setFilter('writing-revolution')}
          >
            Writing Revolution
          </button>
          <button
            className={`filter-btn ${filter === 'the-code' ? 'active' : ''}`}
            onClick={() => setFilter('the-code')}
          >
            The Code
          </button>
          <button
            className={`filter-btn ${filter === 'structured-literacy' ? 'active' : ''}`}
            onClick={() => setFilter('structured-literacy')}
          >
            Structured Literacy
          </button>
          <button
            className={`filter-btn ${filter === 'cultural-integration' ? 'active' : ''}`}
            onClick={() => setFilter('cultural-integration')}
          >
            Cultural Integration
          </button>
        </div>
      </section>

      {/* Units Grid */}
      <section className="units-section">
        <div className="units-grid">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className={`unit-card ${unit.approach} ${selectedUnit === unit.id ? 'selected' : ''}`}
              onClick={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
            >
              <div className="unit-header">
                <div className="unit-icon">{getApproachIcon(unit.approach)}</div>
                <div className="unit-info">
                  <h3 className="unit-title">{unit.title}</h3>
                  <p className="unit-subtitle">{unit.subtitle}</p>
                  <div className="unit-meta">
                    <span className="unit-duration">{unit.duration}</span>
                    <span
                      className="unit-difficulty"
                      style={{ color: getDifficultyColor(unit.difficulty) }}
                    >
                      {unit.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <p className="unit-description">{unit.description}</p>

              <div className="unit-objectives">
                <h4>Learning Objectives:</h4>
                <ul>
                  {unit.learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              {selectedUnit === unit.id && (
                <div className="unit-details">
                  <div className="detail-section">
                    <h4>Cultural Context:</h4>
                    <p>{unit.culturalContext}</p>
                  </div>

                  <div className="detail-section">
                    <h4>NCEA Alignment:</h4>
                    <p>{unit.nceaAlignment}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Key Activities:</h4>
                    <div className="activities-list">
                      {unit.activities.map((activity) => (
                        <div key={activity.id} className="activity-item">
                          <h5>{activity.name}</h5>
                          <p>{activity.description}</p>
                          <div className="activity-meta">
                            <span className="activity-type">{activity.type}</span>
                            <span className="activity-duration">{activity.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Assessment:</h4>
                    <div className="assessment-list">
                      {unit.assessment.map((item, index) => (
                        <div key={index} className="assessment-item">
                          <h5>{item.type}</h5>
                          <p>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Resources:</h4>
                    <ul className="resources-list">
                      {unit.resources.map((resource, index) => (
                        <li key={index}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="unit-actions">
                <button
                  className="expand-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUnit(selectedUnit === unit.id ? null : unit.id);
                  }}
                >
                  {selectedUnit === unit.id ? 'Show Less' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="methodology-section">
        <div className="methodology-content">
          <h2 className="section-title">
            Liz Kane Methodologies
            <span className="maori-text">Ngā Tikanga Ako</span>
          </h2>
          <div className="methodology-grid">
            <div className="methodology-item">
              <h3>✍️ The Writing Revolution</h3>
              <p>
                Systematic approach to sentence and paragraph development that builds writing skills
                progressively through structured activities.
              </p>
            </div>
            <div className="methodology-item">
              <h3>🔤 The Code</h3>
              <p>
                Evidence-based systematic phonics instruction that develops phonological awareness
                and decoding skills systematically.
              </p>
            </div>
            <div className="methodology-item">
              <h3>📚 Structured Literacy</h3>
              <p>
                Comprehensive approach to reading instruction that integrates phonics, vocabulary,
                comprehension, and fluency.
              </p>
            </div>
            <div className="methodology-item">
              <h3>🌿 Cultural Integration</h3>
              <p>
                Authentic integration of Māori cultural contexts, Te Reo Māori vocabulary, and
                traditional knowledge into literacy instruction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Implement?</h2>
          <p>Choose a unit to begin your Year 8 reading instruction journey</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Start with Writing Revolution</button>
            <button className="cta-btn secondary">Begin with The Code</button>
            <button className="cta-btn secondary">Explore Structured Literacy</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Year8ReadingUnits;
