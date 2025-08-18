import React, { useState } from 'react';
import './StructuredLiteracyUnits.css';

interface Unit {
  id: string;
  title: string;
  phase: string;
  yearLevel: string;
  duration: string;
  focus: string;
  description: string;
  skills: string[];
  culturalFocus: string;
  assessments: string[];
  resources: string[];
  difficulty: 'foundation' | 'developing' | 'secure';
  status: 'draft' | 'ready' | 'piloted';
}

const structuredLiteracyUnits: Unit[] = [
  {
    id: 'phase1-foundation',
    title: 'Tuatahi - First Sounds Foundation',
    phase: 'Phase 1',
    yearLevel: 'Year 1-2 / Catch-up Year 3-5',
    duration: '6 weeks (18 lessons)',
    focus: 'Phonological awareness & environmental sounds',
    description: 'Building foundational listening skills and sound awareness through cultural storytelling and environmental connections.',
    skills: [
      'Environmental sound discrimination',
      'Rhythm and rhyme patterns',
      'Voice sounds and oral blending',
      'Alliteration and sound play'
    ],
    culturalFocus: 'Traditional waiata, nature sounds from Te Taiao, oral storytelling traditions',
    assessments: [
      'Environmental sound identification',
      'Rhyme recognition tasks',
      'Sound discrimination activities',
      'Oral language sample analysis'
    ],
    resources: [
      'Environmental sound cards',
      'Traditional waiata recordings',
      'Cultural story sound maps',
      'Nature walk sound journals'
    ],
    difficulty: 'foundation',
    status: 'ready'
  },
  {
    id: 'phase2-cvc',
    title: 'Kupu Poto - Short Word Mastery',
    phase: 'Phase 2',
    yearLevel: 'Year 1-3 / Catch-up Year 4-6',
    duration: '8 weeks (24 lessons)',
    focus: 'CVC patterns & basic phonics',
    description: 'Systematic introduction to letter-sound correspondences through culturally relevant vocabulary.',
    skills: [
      'Single letter sounds (s,a,t,i,p,n)',
      'CVC word blending and segmenting',
      'Basic sight word recognition',
      'Simple sentence construction'
    ],
    culturalFocus: 'Māori CVC patterns, family words (whānau terms), basic kupu',
    assessments: [
      'Letter sound correspondence checks',
      'CVC word reading fluency',
      'Spelling pattern assessments',
      'Sentence writing samples'
    ],
    resources: [
      'Cultural CVC word cards',
      'Māori-English cognate lists',
      'Family vocabulary sets',
      'Simple story templates'
    ],
    difficulty: 'foundation',
    status: 'ready'
  },
  {
    id: 'phase3-digraphs',
    title: 'Rerenga Rua - Two Letter Journeys',
    phase: 'Phase 3',
    yearLevel: 'Year 2-4 / Catch-up Year 5-8',
    duration: '10 weeks (30 lessons)',
    focus: 'Consonant digraphs & vowel teams',
    description: 'Exploring two-letter combinations through place names and traditional stories.',
    skills: [
      'Consonant digraphs (ch, sh, th, ng)',
      'Vowel digraphs (ai, ee, oa)',
      'Initial and final blends',
      'Compound sentence writing'
    ],
    culturalFocus: 'New Zealand place names, traditional story patterns, whakatauki with digraphs',
    assessments: [
      'Digraph recognition tasks',
      'Nonsense word decoding',
      'Place name pronunciation',
      'Story retelling assessments'
    ],
    resources: [
      'NZ place name cards',
      'Traditional story excerpts',
      'Digraph pattern books',
      'Cultural writing frames'
    ],
    difficulty: 'developing',
    status: 'ready'
  },
  {
    id: 'phase4-advanced',
    title: 'Rerenga Roa - Long Pattern Mastery',
    phase: 'Phase 4',
    yearLevel: 'Year 3-5 / Catch-up Year 6-8',
    duration: '12 weeks (36 lessons)',
    focus: 'CVCC/CCVC patterns & complex structures',
    description: 'Advanced phonics patterns integrated with cultural texts and complex vocabulary.',
    skills: [
      'Adjacent consonants (CVCC, CCVC)',
      'Long vowel patterns (a-e, i-e, o-e)',
      'Complex consonant clusters',
      'Multi-syllabic word attack'
    ],
    culturalFocus: 'Traditional mōteatea analysis, complex Māori vocabulary patterns',
    assessments: [
      'Complex pattern decoding',
      'Multi-syllabic word reading',
      'Cultural text comprehension',
      'Advanced writing samples'
    ],
    resources: [
      'Mōteatea excerpts adapted',
      'Complex pattern cards',
      'Multi-syllabic word lists',
      'Cultural research templates'
    ],
    difficulty: 'developing',
    status: 'piloted'
  },
  {
    id: 'phase5-alternatives',
    title: 'Huarahi Maha - Many Pathways',
    phase: 'Phase 5',
    yearLevel: 'Year 4-6 / Catch-up Year 7-9',
    duration: '14 weeks (42 lessons)',
    focus: 'Alternative spellings & advanced patterns',
    description: 'Exploring multiple spellings for sounds through diverse cultural and academic texts.',
    skills: [
      'Alternative spellings for phonemes',
      'Split digraphs (a-e, i-e, o-e, u-e)',
      'Advanced vowel teams',
      'Morphological awareness'
    ],
    culturalFocus: 'Academic Māori texts, historical documents, poetry analysis',
    assessments: [
      'Alternative spelling choices',
      'Academic vocabulary tests',
      'Text analysis projects',
      'Independent writing portfolios'
    ],
    resources: [
      'Historical text excerpts',
      'Academic vocabulary lists',
      'Poetry analysis guides',
      'Independent research frameworks'
    ],
    difficulty: 'secure',
    status: 'draft'
  },
  {
    id: 'phase6-morphology',
    title: 'Punga Kupu - Word Building',
    phase: 'Phase 6',
    yearLevel: 'Year 5-8 / Extension all levels',
    duration: '16 weeks (48 lessons)',
    focus: 'Prefixes, suffixes & word structure',
    description: 'Advanced morphological analysis connecting English and Māori word-building patterns.',
    skills: [
      'Common prefixes (un-, re-, pre-)',
      'Suffix patterns (-ing, -ed, -tion)',
      'Root word identification',
      'Etymology exploration'
    ],
    culturalFocus: 'Comparative morphology Māori-English, academic register development',
    assessments: [
      'Morphological analysis tasks',
      'Etymology research projects',
      'Academic writing assessments',
      'Vocabulary growth measures'
    ],
    resources: [
      'Morphology comparison charts',
      'Etymology investigation tools',
      'Academic writing scaffolds',
      'Cross-linguistic analysis guides'
    ],
    difficulty: 'secure',
    status: 'draft'
  }
];

export default function StructuredLiteracyUnits() {
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  const filteredUnits = structuredLiteracyUnits.filter(unit => {
    if (selectedPhase !== 'all' && !unit.phase.includes(selectedPhase)) return false;
    if (selectedDifficulty !== 'all' && unit.difficulty !== selectedDifficulty) return false;
    if (selectedStatus !== 'all' && unit.status !== selectedStatus) return false;
    return true;
  });

  const toggleUnit = (unitId: string) => {
    setExpandedUnit(expandedUnit === unitId ? null : unitId);
  };

  const getPhaseColor = (phase: string) => {
    const colors = {
      'Phase 1': '#e8f5e8',
      'Phase 2': '#fff3e0', 
      'Phase 3': '#e3f2fd',
      'Phase 4': '#f3e5f5',
      'Phase 5': '#fce4ec',
      'Phase 6': '#e0f2f1'
    };
    return colors[phase as keyof typeof colors] || '#f5f5f5';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'foundation': return '#4caf50';
      case 'developing': return '#ff9800';
      case 'secure': return '#2196f3';
      default: return '#666';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#9e9e9e';
      case 'ready': return '#4caf50';
      case 'piloted': return '#2196f3';
      default: return '#666';
    }
  };

  return (
    <div className="structured-units-container">
      <header className="units-header">
        <h1 className="units-title">📚 Structured Literacy Unit Progression</h1>
        <p className="units-subtitle">
          Comprehensive phonics progression following The Code methodology with cultural integration
        </p>
      </header>

      {/* Cultural Framework */}
      <section className="cultural-framework">
        <h2>🌿 Systematic Progression Philosophy</h2>
        <p>
          Our structured literacy units follow Liz Kane's Code progression while honoring Te Reo Māori phonological 
          patterns and cultural knowledge systems. Each phase builds systematically on previous learning while 
          maintaining authentic cultural connections.
        </p>
        <div className="framework-highlight">
          <strong>Progression Principle:</strong> "Mā te kōkiri tonu, ka eke" - Through persistent effort, success is achieved.
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <h3>🎯 Filter Units</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="phase-filter">Phase:</label>
            <select 
              id="phase-filter"
              value={selectedPhase} 
              onChange={(e) => setSelectedPhase(e.target.value)}
            >
              <option value="all">All Phases</option>
              <option value="1">Phase 1 - Foundation</option>
              <option value="2">Phase 2 - CVC</option>
              <option value="3">Phase 3 - Digraphs</option>
              <option value="4">Phase 4 - Complex</option>
              <option value="5">Phase 5 - Alternatives</option>
              <option value="6">Phase 6 - Morphology</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="difficulty-filter">Difficulty:</label>
            <select 
              id="difficulty-filter"
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="foundation">Foundation</option>
              <option value="developing">Developing</option>
              <option value="secure">Secure</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select 
              id="status-filter"
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="ready">Ready to Use</option>
              <option value="piloted">Piloted</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
        
        <div className="filter-results">
          <span className="results-count">{filteredUnits.length} units available</span>
        </div>
      </section>

      {/* Units Grid */}
      <section className="units-grid-section">
        <h3>📋 Unit Progression ({filteredUnits.length})</h3>
        <div className="units-grid">
          {filteredUnits.map((unit) => (
            <div 
              key={unit.id} 
              className="unit-card"
              style={{ backgroundColor: getPhaseColor(unit.phase) }}
            >
              <div 
                className="unit-header"
                onClick={() => toggleUnit(unit.id)}
              >
                <div className="unit-badges">
                  <span className="phase-badge">{unit.phase}</span>
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(unit.difficulty) }}
                  >
                    {unit.difficulty}
                  </span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(unit.status) }}
                  >
                    {unit.status}
                  </span>
                </div>
                
                <h3 className="unit-title">{unit.title}</h3>
                <div className="unit-meta">
                  <span className="year-level">{unit.yearLevel}</span>
                  <span className="duration">{unit.duration}</span>
                </div>
                <p className="unit-focus">{unit.focus}</p>
                
                <span className="expand-icon">
                  {expandedUnit === unit.id ? '▼' : '▶'}
                </span>
              </div>

              {expandedUnit === unit.id && (
                <div className="unit-details">
                  <div className="unit-description">
                    <h4>📖 Description</h4>
                    <p>{unit.description}</p>
                  </div>

                  <div className="skills-section">
                    <h4>🎯 Key Skills</h4>
                    <ul className="skills-list">
                      {unit.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="cultural-focus">
                    <h4>🌿 Cultural Focus</h4>
                    <p>{unit.culturalFocus}</p>
                  </div>

                  <div className="details-grid">
                    <div className="assessments-section">
                      <h4>📊 Assessments</h4>
                      <ul>
                        {unit.assessments.map((assessment, index) => (
                          <li key={index}>{assessment}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="resources-section">
                      <h4>📋 Key Resources</h4>
                      <ul>
                        {unit.resources.map((resource, index) => (
                          <li key={index}>{resource}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="unit-actions">
                    <button className="action-btn primary">
                      📖 View Full Unit
                    </button>
                    <button className="action-btn secondary">
                      📋 Download Resources
                    </button>
                    <button className="action-btn tertiary">
                      📝 Adaptation Notes
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="implementation-guide">
        <h3>🚀 Implementation Guide</h3>
        <div className="guide-grid">
          <div className="guide-card">
            <h4>📈 Progression Principles</h4>
            <ul>
              <li>Follow systematic phase progression</li>
              <li>Ensure 80% mastery before advancing</li>
              <li>Integrate cultural connections authentically</li>
              <li>Adapt for individual learning needs</li>
              <li>Maintain explicit instruction focus</li>
            </ul>
          </div>
          
          <div className="guide-card">
            <h4>🎯 Assessment Strategy</h4>
            <ul>
              <li>Use initial assessments for placement</li>
              <li>Monitor progress weekly</li>
              <li>Track cultural engagement</li>
              <li>Document breakthrough moments</li>
              <li>Celebrate bilingual strengths</li>
            </ul>
          </div>
          
          <div className="guide-card">
            <h4>🌿 Cultural Integration</h4>
            <ul>
              <li>Start with familiar cultural sounds</li>
              <li>Use traditional stories as contexts</li>
              <li>Honor oral tradition alongside written</li>
              <li>Connect to place and identity</li>
              <li>Involve whānau in learning journey</li>
            </ul>
          </div>

          <div className="guide-card">
            <h4>👥 Differentiation</h4>
            <ul>
              <li>Provide multiple entry points</li>
              <li>Offer extension activities</li>
              <li>Support struggling learners</li>
              <li>Use flexible grouping</li>
              <li>Celebrate diverse pathways</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Progression Overview */}
      <section className="progression-overview">
        <h3>📊 Complete Progression Map</h3>
        <div className="progression-timeline">
          {structuredLiteracyUnits.map((unit, index) => (
            <div key={unit.id} className="timeline-item">
              <div 
                className="timeline-marker"
                style={{ backgroundColor: getPhaseColor(unit.phase) }}
              >
                {index + 1}
              </div>
              <div className="timeline-content">
                <h4>{unit.title}</h4>
                <p>{unit.phase} - {unit.focus}</p>
                <span className="timeline-duration">{unit.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="units-footer">
        <div className="pld-connection">
          <h4>🎓 Professional Learning Support</h4>
          <p>
            These units provide scaffolded progression for implementing structured literacy 
            across diverse learners while maintaining cultural authenticity and engagement.
          </p>
        </div>
        <p className="cultural-motto">🌿 "He kōrero, he mahi, he tipu" - Through speaking, working, and growing together</p>
        <p className="platform-info">Te Kete Ako - Systematic Literacy Excellence for Aotearoa</p>
      </footer>
    </div>
  );
}