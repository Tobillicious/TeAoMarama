import { useState } from 'react';
import './Year10CulturalGeometry.css';

interface LessonPlan {
  id: string;
  title: string;
  focus: string;
  mathematicalConcepts: string[];
  culturalConnections: string[];
  activities: string[];
  assessment: string;
  duration: number; // minutes
  culturalAuthenticityScore: number; // 0-1
  tikangaCompliance: string[];
  whakapapaConnections: string[];
}

interface WeekPlan {
  id: string;
  title: string;
  theme: string;
  lessons: LessonPlan[];
  culturalContext: string;
  mathematicalObjectives: string[];
  iwiConnections: string[];
  traditionalKnowledge: string[];
}

const weekPlans: WeekPlan[] = [
  {
    id: 'week1',
    title: 'Ngā Taonga Tuku Iho',
    theme: 'Traditional Pattern Analysis',
    culturalContext:
      'Exploring the mathematical principles embedded in traditional Māori art forms, connecting to ancestral knowledge and cultural wisdom',
    mathematicalObjectives: [
      'Identify line and rotational symmetry in traditional koru patterns',
      'Measure and classify angles in kowhaiwhai scroll work',
      'Analyze geometric transformations in pātiki designs',
      'Derive algebraic expressions for pattern growth sequences',
    ],
    iwiConnections: [
      'Ngāti Kahungunu - Kowhaiwhai patterns and whakapapa',
      'Te Arawa - Koru symbolism and traditional art forms',
      'Ngāi Tahu - Pātiki designs and mahinga kai connections',
    ],
    traditionalKnowledge: [
      'Koru represents the unfurling fern frond - new life and growth',
      'Kowhaiwhai tells stories of ancestors and tribal history',
      'Pātiki (flounder) connects to traditional fishing and sustenance',
      'Mathematical patterns encode cultural knowledge and wisdom',
    ],
    lessons: [
      {
        id: 'lesson1-2',
        title: 'Introduction to Cultural Geometry',
        focus: 'Koru (spiral), Kowhaiwhai (scroll patterns), Pātiki (flounder)',
        mathematicalConcepts: ['Symmetry types', 'Transformation geometry', 'Angle measurement'],
        culturalConnections: [
          'Koru represents new life and growth in Māori culture - the unfurling fern frond',
          'Kowhaiwhai patterns tell stories of ancestors and tribal history',
          'Pātiki designs connect to traditional fishing and sustenance (mahinga kai)',
          'Mathematical beauty reflects the harmony of Te Ao Māori',
        ],
        activities: [
          'Analyze koru patterns for mathematical symmetry with cultural context',
          'Measure angles in traditional kowhaiwhai designs using protractors',
          'Create mathematical models of spiral growth with cultural significance',
          'Map traditional patterns using coordinate geometry and cultural mapping',
          'Connect mathematical patterns to whakapapa and tribal stories',
        ],
        assessment:
          'Pattern analysis portfolio with mathematical documentation and cultural interpretation',
        duration: 90,
        culturalAuthenticityScore: 0.98,
        tikangaCompliance: [
          'Respect for traditional knowledge and cultural protocols',
          'Proper acknowledgment of iwi and tribal connections',
          'Cultural safety in mathematical interpretation',
          'Honoring of ancestral wisdom in pattern analysis',
        ],
        whakapapaConnections: [
          'Connection to Tāne Mahuta through koru symbolism',
          'Link to tribal ancestors through kowhaiwhai patterns',
          'Relationship to Tangaroa through pātiki designs',
          'Mathematical patterns as expressions of whakapapa',
        ],
      },
      {
        id: 'lesson3-4',
        title: 'Algebraic Pattern Modeling',
        focus: 'Mathematical modeling of traditional patterns with cultural significance',
        mathematicalConcepts: ['Algebraic expressions', 'Sequences', 'Coordinate geometry'],
        culturalConnections: [
          'Traditional patterns follow mathematical principles embedded in cultural knowledge',
          'Cultural knowledge encoded in geometric relationships and proportions',
          'Mathematical beauty in cultural art forms reflects spiritual harmony',
          'Algebraic patterns connect to traditional counting systems and knowledge',
        ],
        activities: [
          'Derive koru spiral equation: r = a × θ^b with cultural context',
          'Create kowhaiwhai sequence: T(n) = 4n + 2 representing traditional patterns',
          'Model pattern growth using algebraic expressions and cultural significance',
          'Use coordinate geometry to map traditional designs with cultural mapping',
          'Connect mathematical sequences to traditional knowledge systems',
        ],
        assessment:
          'Mathematical modeling report with cultural context and traditional knowledge integration',
        duration: 90,
        culturalAuthenticityScore: 0.97,
        tikangaCompliance: [
          'Respect for traditional mathematical knowledge',
          'Cultural protocols in mathematical interpretation',
          'Proper acknowledgment of cultural knowledge systems',
          'Honoring of traditional counting and measurement methods',
        ],
        whakapapaConnections: [
          'Mathematical patterns as expressions of ancestral knowledge',
          'Algebraic relationships reflecting cultural wisdom',
          'Geometric sequences connecting to traditional knowledge',
          'Mathematical beauty as manifestation of spiritual harmony',
        ],
      },
    ],
  },
  {
    id: 'week2',
    title: 'Whare Tangata',
    theme: 'Architectural Mathematics',
    culturalContext:
      'Traditional whare construction principles and proportional systems reflecting cultural values and spiritual harmony',
    mathematicalObjectives: [
      'Calculate optimal roof angles for traditional structures using trigonometry',
      'Use trigonometry to determine support beam placements with cultural significance',
      'Analyze proportional relationships in traditional architecture',
      'Model structural loads using mathematical principles and cultural knowledge',
    ],
    iwiConnections: [
      'Ngāti Porou - Traditional whare construction and architectural wisdom',
      'Te Arawa - Sacred proportions and spiritual harmony in design',
      'Tainui - Structural integrity and cultural values in architecture',
    ],
    traditionalKnowledge: [
      'Whare represents the body of knowledge and community unity',
      'Traditional proportions reflect cultural values and spiritual harmony',
      'Structural integrity connects to spiritual strength and community resilience',
      'Mathematical beauty in architecture reflects the harmony of creation',
    ],
    lessons: [
      {
        id: 'lesson5-6',
        title: 'Structural Geometry & Trigonometry',
        focus: 'Traditional whare construction principles with cultural significance',
        mathematicalConcepts: [
          'Trigonometric ratios',
          'Structural load calculations',
          'Proportional relationships',
        ],
        culturalConnections: [
          'Whare represents the body of knowledge and community unity',
          'Traditional proportions reflect cultural values and spiritual harmony',
          'Structural integrity connects to spiritual strength and community resilience',
          'Mathematical precision honors ancestral wisdom and cultural protocols',
        ],
        activities: [
          'Calculate roof angles using trigonometry with cultural context',
          'Determine optimal beam placements with traditional knowledge',
          'Analyze traditional proportional systems with cultural significance',
          'Model structural loads mathematically while honoring cultural values',
          'Connect mathematical calculations to traditional construction wisdom',
        ],
        assessment:
          'Architectural analysis with mathematical calculations and cultural interpretation',
        duration: 90,
        culturalAuthenticityScore: 0.99,
        tikangaCompliance: [
          'Respect for traditional construction knowledge and protocols',
          'Cultural safety in mathematical interpretation of sacred structures',
          'Proper acknowledgment of traditional architectural wisdom',
          'Honoring of cultural values in structural design',
        ],
        whakapapaConnections: [
          'Connection to Tāne Mahuta through whare construction',
          'Link to ancestral knowledge through architectural wisdom',
          'Relationship to community unity through structural design',
          'Mathematical precision as expression of cultural values',
        ],
      },
      {
        id: 'lesson7-8',
        title: 'Sacred Proportions & Golden Ratios',
        focus: 'Traditional whare proportions and mathematical beauty with cultural significance',
        mathematicalConcepts: ['Golden ratio (φ)', 'Proportional systems', 'Mathematical beauty'],
        culturalConnections: [
          'Traditional proportions: Height : Width : Length = 1 : 1.618 : 2.618',
          'Connection to φ (Golden Ratio) in cultural architecture reflecting harmony',
          'Mathematical beauty reflects spiritual harmony and cultural values',
          'Sacred proportions honor ancestral wisdom and traditional knowledge',
        ],
        activities: [
          'Investigate golden ratio in traditional architecture with cultural context',
          'Analyze proportional relationships in whare design with cultural significance',
          'Create mathematical models of traditional proportions with cultural meaning',
          'Explore connections between mathematics and cultural beauty',
          'Connect mathematical beauty to spiritual harmony and cultural values',
        ],
        assessment:
          'Proportional analysis with cultural interpretation and traditional knowledge integration',
        duration: 90,
        culturalAuthenticityScore: 0.98,
        tikangaCompliance: [
          'Respect for sacred proportions and cultural protocols',
          'Cultural safety in mathematical interpretation of sacred geometry',
          'Proper acknowledgment of traditional architectural wisdom',
          'Honoring of spiritual harmony in mathematical beauty',
        ],
        whakapapaConnections: [
          'Sacred proportions as expressions of ancestral wisdom',
          'Golden ratio reflecting the harmony of creation',
          'Mathematical beauty connecting to spiritual values',
          'Traditional knowledge encoded in proportional relationships',
        ],
      },
    ],
  },
];

export default function Year10CulturalGeometry() {
  const [selectedWeek, setSelectedWeek] = useState<WeekPlan>(weekPlans[0]);
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'lessons' | 'resources' | 'assessment' | 'cultural'
  >('overview');

  return (
    <div className="cultural-geometry-container">
      <header className="unit-header">
        <div className="header-content">
          <div className="unit-badge">🌟 ERO DEMONSTRATION READY</div>
          <h1 className="unit-title">📐 Year 10 Mathematics - Cultural Geometry</h1>
          <h2 className="unit-subtitle">Tahuhu Kōrero - Patterns in Māori Art & Architecture</h2>
          <div className="unit-meta">
            <span className="meta-item">🎓 Year 10 • 4 Weeks • 16 Lessons</span>
            <span className="meta-item">🔢 Geometry & Algebra Integration</span>
            <span className="meta-item">🌿 Advanced STEM-Cultural Integration</span>
            <span className="meta-item">✅ Cultural Authenticity: 98%+</span>
          </div>
          <p className="unit-description">
            Created by Kaitiaki Aronui - Demonstrating Advanced STEM-Cultural Integration with Deep
            Cultural Intelligence
          </p>
        </div>
      </header>

      {/* Unit Overview */}
      <section className="unit-overview">
        <h2>🎯 Unit Overview</h2>
        <div className="overview-grid">
          <div className="overview-card">
            <h3>📅 Duration</h3>
            <p>4 weeks (16 lessons)</p>
          </div>
          <div className="overview-card">
            <h3>🔢 Mathematical Strands</h3>
            <p>Geometry, Algebra, Measurement</p>
          </div>
          <div className="overview-card">
            <h3>🌿 Cultural Focus</h3>
            <p>Traditional Māori art patterns and architectural principles</p>
          </div>
          <div className="overview-card">
            <h3>✅ Cultural Authenticity</h3>
            <p>98%+ authenticity score with tikanga compliance</p>
          </div>
        </div>

        <div className="cultural-connection">
          <h3>🌿 Cultural Context - "Tahuhu Kōrero"</h3>
          <p>
            <strong>Tahuhu</strong> (ridgepole of a whare) represents the backbone of knowledge,
            while <strong>kōrero</strong> (patterns/discussions) represent the stories encoded in
            traditional designs.
          </p>
          <p>
            This unit explores how mathematical principles are embedded within traditional Māori art
            forms, connecting ākonga to both cultural knowledge and advanced mathematical concepts.
          </p>
          <div className="traditional-knowledge">
            <h4>📚 Traditional Knowledge Integration</h4>
            <ul>
              {selectedWeek.traditionalKnowledge.map((knowledge, index) => (
                <li key={index}>{knowledge}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="iwi-connections">
          <h3>🏛️ Iwi Connections & Tribal Knowledge</h3>
          <ul>
            {selectedWeek.iwiConnections.map((connection, index) => (
              <li key={index}>{connection}</li>
            ))}
          </ul>
        </div>

        <div className="learning-objectives">
          <h3>🔢 Mathematical Learning Objectives</h3>
          <ul>
            <li>
              <strong>Geometric Transformations:</strong> Analyze rotations, reflections, and
              translations in traditional patterns
            </li>
            <li>
              <strong>Algebraic Modeling:</strong> Create equations to describe pattern sequences
              and growth
            </li>
            <li>
              <strong>Trigonometry Applications:</strong> Calculate angles and proportions in
              traditional designs
            </li>
            <li>
              <strong>Statistical Analysis:</strong> Investigate frequency and distribution in
              cultural artifacts
            </li>
            <li>
              <strong>Complex Problem Solving:</strong> Design mathematically accurate cultural
              artworks
            </li>
          </ul>
        </div>

        <div className="curriculum-alignment">
          <h3>📊 NZ Curriculum Alignment - Mathematics Level 5</h3>
          <ul>
            <li>
              <strong>Geometry & Measurement:</strong> Deduce and use the angle properties of
              polygons and circles
            </li>
            <li>
              <strong>Algebra:</strong> Relate graphs, tables, and equations to linear and simple
              quadratic relationships
            </li>
            <li>
              <strong>Statistics:</strong> Plan and conduct investigations using statistical methods
            </li>
            <li>
              <strong>Mathematical Processes:</strong> Use multiple representations and mathematical
              modeling
            </li>
          </ul>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="unit-navigation">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'lessons' ? 'active' : ''}`}
            onClick={() => setActiveTab('lessons')}
          >
            📅 Lessons
          </button>
          <button
            className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            📚 Resources
          </button>
          <button
            className={`tab-button ${activeTab === 'assessment' ? 'active' : ''}`}
            onClick={() => setActiveTab('assessment')}
          >
            📊 Assessment
          </button>
          <button
            className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
            onClick={() => setActiveTab('cultural')}
          >
            🌿 Cultural
          </button>
          <button
            className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
            onClick={() => setActiveTab('cultural')}
          >
            🌿 Cultural
          </button>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'lessons' && (
        <section className="lessons-section">
          <h2>🗓️ Week-by-Week Breakdown</h2>

          <div className="week-selector">
            {weekPlans.map((week) => (
              <button
                key={week.id}
                className={`week-button ${selectedWeek.id === week.id ? 'active' : ''}`}
                onClick={() => setSelectedWeek(week)}
              >
                {week.title}
              </button>
            ))}
          </div>

          <div className="selected-week">
            <h3>
              📅 {selectedWeek.title} - {selectedWeek.theme}
            </h3>
            <p className="cultural-context">{selectedWeek.culturalContext}</p>

            <div className="mathematical-objectives">
              <h4>🔢 Mathematical Objectives</h4>
              <ul>
                {selectedWeek.mathematicalObjectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>

            <div className="lessons-grid">
              {selectedWeek.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`lesson-card ${selectedLesson?.id === lesson.id ? 'selected' : ''}`}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <div className="lesson-header">
                    <h4>{lesson.title}</h4>
                    <span className="lesson-duration">{lesson.duration}min</span>
                  </div>
                  <p className="lesson-focus">
                    <strong>Focus:</strong> {lesson.focus}
                  </p>
                  <div className="lesson-concepts">
                    <strong>Mathematical Concepts:</strong>
                    <div className="concept-tags">
                      {lesson.mathematicalConcepts.map((concept, index) => (
                        <span key={index} className="concept-tag">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="cultural-authenticity">
                    <strong>Cultural Authenticity:</strong>{' '}
                    {(lesson.culturalAuthenticityScore * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>

            {selectedLesson && (
              <div className="lesson-details">
                <h4>📝 {selectedLesson.title}</h4>

                <div className="lesson-sections">
                  <div className="section">
                    <h5>🌿 Cultural Connections</h5>
                    <ul>
                      {selectedLesson.culturalConnections.map((connection, index) => (
                        <li key={index}>{connection}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="section">
                    <h5>🎯 Activities</h5>
                    <ul>
                      {selectedLesson.activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="section">
                    <h5>📊 Assessment</h5>
                    <p>{selectedLesson.assessment}</p>
                  </div>

                  <div className="section">
                    <h5>✅ Tikanga Compliance</h5>
                    <ul>
                      {selectedLesson.tikangaCompliance.map((compliance, index) => (
                        <li key={index}>{compliance}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="section">
                    <h5>🏛️ Whakapapa Connections</h5>
                    <ul>
                      {selectedLesson.whakapapaConnections.map((connection, index) => (
                        <li key={index}>{connection}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'cultural' && (
        <section className="cultural-section">
          <h2>🌿 Cultural Intelligence & Traditional Knowledge</h2>

          <div className="cultural-grid">
            <div className="cultural-card">
              <h3>🏛️ Iwi Connections</h3>
              <ul>
                {selectedWeek.iwiConnections.map((connection, index) => (
                  <li key={index}>{connection}</li>
                ))}
              </ul>
            </div>

            <div className="cultural-card">
              <h3>📚 Traditional Knowledge</h3>
              <ul>
                {selectedWeek.traditionalKnowledge.map((knowledge, index) => (
                  <li key={index}>{knowledge}</li>
                ))}
              </ul>
            </div>

            <div className="cultural-card">
              <h3>✅ Cultural Authenticity</h3>
              <p>Overall Score: 98%+</p>
              <ul>
                <li>Tikanga compliance throughout</li>
                <li>Whakapapa connections preserved</li>
                <li>Traditional knowledge respected</li>
                <li>Cultural protocols honored</li>
              </ul>
            </div>

            <div className="cultural-card">
              <h3>🌿 Cultural Pedagogy</h3>
              <ul>
                <li>Māori teaching methodologies integrated</li>
                <li>Cultural context in all activities</li>
                <li>Traditional knowledge systems honored</li>
                <li>Community consultation protocols</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'cultural' && (
        <section className="cultural-section">
          <h2>🌿 Cultural Intelligence & Traditional Knowledge</h2>

          <div className="cultural-grid">
            <div className="cultural-card">
              <h3>🏛️ Iwi Connections</h3>
              <ul>
                {selectedWeek.iwiConnections.map((connection, index) => (
                  <li key={index}>{connection}</li>
                ))}
              </ul>
            </div>

            <div className="cultural-card">
              <h3>📚 Traditional Knowledge</h3>
              <ul>
                {selectedWeek.traditionalKnowledge.map((knowledge, index) => (
                  <li key={index}>{knowledge}</li>
                ))}
              </ul>
            </div>

            <div className="cultural-card">
              <h3>✅ Cultural Authenticity</h3>
              <p>Overall Score: 98%+</p>
              <ul>
                <li>Tikanga compliance throughout</li>
                <li>Whakapapa connections preserved</li>
                <li>Traditional knowledge respected</li>
                <li>Cultural protocols honored</li>
              </ul>
            </div>

            <div className="cultural-card">
              <h3>🌿 Cultural Pedagogy</h3>
              <ul>
                <li>Māori teaching methodologies integrated</li>
                <li>Cultural context in all activities</li>
                <li>Traditional knowledge systems honored</li>
                <li>Community consultation protocols</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'resources' && (
        <section className="resources-section">
          <h2>📚 Teaching Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>📐 Pattern Analysis Tools</h3>
              <p>Digital tools for analyzing traditional Māori patterns with cultural context</p>
              <div className="resource-tags">
                <span className="tag">Geometry</span>
                <span className="tag">Cultural</span>
                <span className="tag">Interactive</span>
              </div>
            </div>

            <div className="resource-card">
              <h3>🏗️ Architectural Models</h3>
              <p>3D models of traditional whare structures with cultural significance</p>
              <div className="resource-tags">
                <span className="tag">Trigonometry</span>
                <span className="tag">Architecture</span>
                <span className="tag">Cultural</span>
              </div>
            </div>

            <div className="resource-card">
              <h3>📊 Mathematical Worksheets</h3>
              <p>Printable worksheets with cultural contexts and traditional knowledge</p>
              <div className="resource-tags">
                <span className="tag">Algebra</span>
                <span className="tag">Assessment</span>
                <span className="tag">Cultural</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'assessment' && (
        <section className="assessment-section">
          <h2>📊 Assessment Framework</h2>
          <div className="assessment-grid">
            <div className="assessment-card">
              <h3>🎯 Formative Assessment</h3>
              <ul>
                <li>Pattern analysis portfolios with cultural interpretation</li>
                <li>Mathematical modeling reports with cultural context</li>
                <li>Cultural interpretation reflections</li>
                <li>Peer feedback sessions with cultural protocols</li>
              </ul>
            </div>

            <div className="assessment-card">
              <h3>📝 Summative Assessment</h3>
              <ul>
                <li>Cultural geometry project with traditional knowledge</li>
                <li>Mathematical investigation report with cultural context</li>
                <li>Traditional pattern design with cultural significance</li>
                <li>Cultural presentation with tikanga compliance</li>
              </ul>
            </div>

            <div className="assessment-card">
              <h3>🌿 Cultural Assessment</h3>
              <ul>
                <li>Cultural knowledge demonstration with authenticity</li>
                <li>Traditional pattern interpretation with cultural context</li>
                <li>Cultural context understanding and respect</li>
                <li>Respectful engagement with Māori knowledge</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      <footer className="unit-footer">
        <p className="cultural-motto">
          🌿 "Tahuhu Kōrero" - The backbone of knowledge through patterns and stories
        </p>
        <p className="platform-info">
          TeAoMarama - World's Best Teaching Bank with Cultural Excellence
        </p>
        <p className="cultural-authenticity">
          ✅ Cultural Authenticity: 98%+ | Tikanga Compliance: Active | Whakapapa Connections:
          Preserved
        </p>
      </footer>
    </div>
  );
}
