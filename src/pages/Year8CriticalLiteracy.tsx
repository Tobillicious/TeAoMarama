import {useState} from 'react'
import {Link} from 'react-router-dom'
import './Year8CriticalLiteracy.css'

interface LiteracyComponent {,
id: string,
title: string,
description: string,
path: string,
features: string[],
culturalIntegration: string,
nceaAlignment: string,
difficulty: 'foundation' | 'developing' | 'advanced',
timeEstimate: string,
materials: string[]}
const literacyComponents: LiteracyComponent[] = [
  {,
id: 'writing-revolution',,
title: 'Writing Revolution',,
description: 'Systematic approach to building sentence and paragraph writing skills through structured activities and cultural integration.',,
path: '/year8-writing-revolution',,
features: [
      'Sentence expansion and combining',
      'Paragraph development strategies',
      'Cultural context integration',
      'NCEA writing preparation',
      'Te Reo Māori vocabulary building',
    ],;,
culturalIntegration: 'Incorporates Māori cultural contexts, traditional knowledge, and Te Reo Māori vocabulary in all writing activities.',,
nceaAlignment: 'Builds foundation skills for NCEA Level 1 English writing standards, including detailed description and analysis.',,
difficulty: 'foundation',,
timeEstimate: '30-45 minutes per session',,
materials: [
      'Writing prompts',
      'Cultural vocabulary lists',
      'Sentence pattern cards',
      'Revision checklists',
    ],
  },
  {,
id: 'reading-strategies',,
title: 'Reading Strategies',,
description: 'Comprehensive reading comprehension strategies for before, during, and after reading with cultural responsiveness.',,
path: '/year8-reading-strategies',,
features: [
      'Preview and prediction techniques',
      'Think-aloud protocols',
      'Cultural text analysis',
      'Vocabulary development',
      'Comprehension monitoring',
    ],;,
culturalIntegration: 'Uses Māori texts, cultural knowledge, and diverse perspectives to build reading comprehension skills.',,
nceaAlignment: 'Develops critical reading skills essential for NCEA Level 1 English text analysis and interpretation.',,
difficulty: 'developing',,
timeEstimate: '25-40 minutes per strategy',,
materials: [
      'Text samples',
      'Graphic organizers',
      'Cultural context guides',
      'Comprehension questions',
    ],
  },
  {,
id: 'academic-vocabulary',,
title: 'Academic Vocabulary',,
description: 'Subject-specific vocabulary development across curriculum areas with cultural and linguistic integration.',,
path: '/year8-academic-vocab',,
features: [
      'Subject-specific word lists',
      'Contextual learning activities',
      'Cultural vocabulary integration',
      'Word analysis strategies',
      'Cross-curricular connections',
    ],;,
culturalIntegration: 'Includes Te Reo Māori academic terms, cultural concepts, and bilingual vocabulary development.',,
nceaAlignment: 'Builds vocabulary essential for success across all NCEA Level 1 subjects and assessments.',,
difficulty: 'developing',,
timeEstimate: '20-30 minutes per session',,
materials: [
      'Vocabulary cards',
      'Context examples',
      'Cultural glossaries',
      'Practice activities',
    ],
  },
]

const Year8CriticalLiteracy = () => {
const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'foundation' | 'developing' | 'advanced'>('all')

const filteredComponents = literacyComponents.filter(
_(component) => filter === 'all' || component.difficulty === filter,
  )

return (
_<div className="year8-critical-literacy">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
Year 8 Critical Literacy
            <span className="cultural-accent">Kōrero Tuatahi</span>
          </h1>
          <p className="hero-description">
Comprehensive literacy development through culturally responsive,  _curriculum-integrated
approaches that prepare students for NCEA success while honoring Te Ao Māori.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Core Components</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Cultural Integration</span>
            </div>
            <div className="stat">
              <span className="stat-number">NCEA</span>
              <span className="stat-label">Aligned</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Filter */}
      <section className="filter-section">
        <div className="filter-container">
          <button
className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
onClick={() => setFilter('all')}
          >
All Components
          </button>
          <button
className={`filter-btn ${filter === 'foundation' ? 'active' : ''}`}
onClick={() => setFilter('foundation')}
          >
Foundation
          </button>
          <button
className={`filter-btn ${filter === 'developing' ? 'active' : ''}`}
onClick={() => setFilter('developing')}
          >
Developing
          </button>
          <button
className={`filter-btn ${filter === 'advanced' ? 'active' : ''}`}
onClick={() => setFilter('advanced')}
          >
Advanced
          </button>
        </div>
      </section>

      {/* Components Grid */}
      <section className="components-section">
        <div className="components-grid">
          {filteredComponents.map(_(component) => (
_<div
key={component.id}
className={`component-card ${component.difficulty} ${
selectedComponent === component.id ? 'selected' : ''
              }`}
onClick={() =>
setSelectedComponent(selectedComponent === component.id ? null : component.id)
              }
            >
              <div className="component-header">
                <h3 className="component-title">{component.title}</h3>
                <span className={`difficulty-badge ${component.difficulty}`}>
                  {component.difficulty}
                </span>
              </div>

              <p className="component-description">{component.description}</p>

              <div className="component-features">
                <h4>Key Features: </h4>
                <ul>
                  {component.features.slice(0, 3).map(_(feature,  _index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="component-details">
                <div className="detail-item">
                  <strong>Cultural Integration: </strong>
                  <p>{component.culturalIntegration}</p>
                </div>

                <div className="detail-item">
                  <strong>NCEA Alignment:</strong>
                  <p>{component.nceaAlignment}</p>
                </div>

                <div className="detail-item">
                  <strong>Time Estimate:</strong>
                  <span>{component.timeEstimate}</span>
                </div>
              </div>

              <div className="component-actions">
                <Link to={component.path} className="explore-btn">
Explore Component
                </Link>
                <button className="details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cultural Integration Section */}
      <section className="cultural-section">
        <div className="cultural-content">
          <h2 className="section-title">
Cultural Integration
            <span className="maori-text">Whakawhanaungatanga</span>
          </h2>
          <div className="cultural-grid">
            <div className="cultural-item">
              <h3>Te Reo Māori</h3>
              <p>Integrated vocabulary and language learning across all literacy components</p>
            </div>
            <div className="cultural-item">
              <h3>Mātauranga Māori</h3>
              <p>Traditional knowledge and cultural concepts embedded in learning activities</p>
            </div>
            <div className="cultural-item">
              <h3>Cultural Contexts</h3>
              <p>Authentic Māori and Pacific texts, stories, and perspectives</p>
            </div>
            <div className="cultural-item">
              <h3>Bilingual Approach</h3>
              <p>Supporting both English and Te Reo Māori literacy development</p>
            </div>
          </div>
        </div>
      </section>

      {/* NCEA Preparation Section */}
      <section className="ncea-section">
        <div className="ncea-content">
          <h2 className="section-title">
NCEA Preparation
            <span className="maori-text">Whakatōtanga</span>
          </h2>
          <div className="ncea-grid">
            <div className="ncea-item">
              <h3>Level 1 English</h3>
              <ul>
                <li>Writing standards preparation</li>
                <li>Text analysis skills</li>
                <li>Critical thinking development</li>
              </ul>
            </div>
            <div className="ncea-item">
              <h3>Cross-Curricular</h3>
              <ul>
                <li>Academic vocabulary</li>
                <li>Research skills</li>
                <li>Communication standards</li>
              </ul>
            </div>
            <div className="ncea-item">
              <h3>Assessment Ready</h3>
              <ul>
                <li>Formal writing skills</li>
                <li>Text interpretation</li>
                <li>Cultural competency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Explore?</h2>
          <p>Choose a component to begin your Year 8 Critical Literacy journey</p>
          <div className="cta-buttons">
            <Link to="/year8-writing-revolution" className="cta-btn primary">
Start with Writing
            </Link>
            <Link to="/year8-reading-strategies" className="cta-btn secondary">
Begin Reading
            </Link>
            <Link to="/year8-academic-vocab" className="cta-btn secondary">
Build Vocabulary
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Year8CriticalLiteracy
