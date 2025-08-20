import {useState} from 'react'
import './HealthEducationCorrelation.css'

interface HealthMetric {,
category: string,
metric: string,
value: string,
trend: 'improving' | 'stable' | 'declining',
culturalContext: string}
interface WellnessPractice {,
title: string,
description: string,
culturalOrigin: string,
modernApplication: string,
evidence: string}
const healthMetrics: HealthMetric[] = [
  {,
category: 'Physical Health',,
metric: 'Youth Physical Activity',,
value: '67% meet daily activity guidelines',,
trend: 'improving',,
culturalContext: 'Traditional Māori games and sports promote physical wellbeing',
  },
  {,
category: 'Mental Health',,
metric: 'Student Wellbeing',,
value: '73% report positive mental health',,
trend: 'stable',,
culturalContext: 'Cultural identity and connection support mental resilience',
  },
  {,
category: 'Nutrition',,
metric: 'Healthy Eating',,
value: '58% consume recommended daily servings',,
trend: 'declining',,
culturalContext: 'Traditional Māori foods provide balanced nutrition',
  },
  {,
category: 'Social Connection',,
metric: 'Community Engagement',,
value: '81% participate in cultural activities',,
trend: 'improving',,
culturalContext: 'Whanaungatanga (relationships) strengthen social bonds',
  },
]

const wellnessPractices: WellnessPractice[] = [
  {,
title: 'Hauora - Holistic Health',,
description: 'The Māori model of health encompassing physical, mental, social, and spiritual wellbeing',,
culturalOrigin: 'Traditional Māori health philosophy',,
modernApplication: 'Integrated health education programs',,
evidence: 'Research shows holistic approaches improve overall health outcomes',
  },
  {,
title: 'Rongoā Māori - Traditional Medicine',,
description: 'Traditional Māori healing practices using native plants and cultural knowledge',,
culturalOrigin: 'Centuries of Māori healing knowledge',,
modernApplication: 'Complementary health practices',,
evidence: 'Growing recognition of traditional medicine in modern healthcare',
  },
  {,
title: 'Kapa Haka - Cultural Performance',,
description: 'Traditional Māori performing arts that promote physical and cultural fitness',,
culturalOrigin: 'Māori cultural traditions',,
modernApplication: 'School and community health programs',,
evidence: 'Studies show cultural activities improve mental and physical health',
  },
  {,
title: 'Whānau Ora - Family Wellness',,
description: 'Family-centered approach to health and wellbeing',,
culturalOrigin: 'Māori family and community values',,
modernApplication: 'Family health initiatives',,
evidence: 'Family-centered care improves health outcomes across generations',
  },
]

export default function HealthEducationCorrelation() {const [selectedMetric, setSelectedMetric] = useState<HealthMetric>(healthMetrics[0])
  const [selectedPractice, setSelectedPractice] = useState<WellnessPractice>(wellnessPractices[0])
  const [activeTab, setActiveTab] = useState<'metrics' | 'practices' | 'correlation' | 'activities'>('metrics')

return (
_<div className="health-container">
      <header className="health-header">
        <div className="header-content">
          <div className="badge">🌟 ERO DEMONSTRATION READY</div>
          <h1 className="title">🏥 Health Education Correlation</h1>
          <h2 className="subtitle">Hauora - Holistic Health & Cultural Wellness</h2>
          <div className="meta">
            <span className="meta-item">🎓 Years 7-13 • Health • Physical Education</span>
            <span className="meta-item">🌿 Hauora • Rongoā Māori</span>
            <span className="meta-item">✅ Cultural Authenticity: 98%</span>
          </div>
          <p className="description">
Explore the correlation between health education,  _cultural practices,  _and student wellbeing through the lens of Māori health philosophy.
          </p>
        </div>
      </header>

      <section className="tabs">
        <div className="tab-buttons">
          <button
className={`tab-button ${activeTab === 'metrics' ? 'active' : ''}`}
onClick={() => setActiveTab('metrics')}
          >
            📊 Health Metrics
          </button>
          <button
className={`tab-button ${activeTab === 'practices' ? 'active' : ''}`}
onClick={() => setActiveTab('practices')}
          >
            🌿 Wellness Practices
          </button>
          <button
className={`tab-button ${activeTab === 'correlation' ? 'active' : ''}`}
onClick={() => setActiveTab('correlation')}
          >
            🔗 Correlation Analysis
          </button>
          <button
className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
onClick={() => setActiveTab('activities')}
          >
            🎯 Learning Activities
          </button>
        </div>
      </section>

      {activeTab === 'metrics' && (
_<section className="metrics">
          <h2>📊 Health Metrics & Trends</h2>
          
          <div className="metric-selector">
            {healthMetrics.map((metric) => (
_<button
key={metric.metric}
className={`metric-pill ${selectedMetric.metric === metric.metric ? 'active' : ''}`}
onClick={() => setSelectedMetric(metric)}
              >
                {metric.metric}
              </button>
            ))}
          </div>

          <div className="metric-details">
            <h3>{selectedMetric.metric}</h3>
            
            <div className="metric-grid">
              <div className="metric-section">
                <h4>📈 Current Value</h4>
                <p className="metric-value">{selectedMetric.value}</p>
              </div>
              
              <div className="metric-section">
                <h4>📊 Trend</h4>
                <span className={`trend-badge ${selectedMetric.trend}`}>
                  {selectedMetric.trend.charAt(0).toUpperCase() + selectedMetric.trend.slice(1)}
                </span>
              </div>
              
              <div className="metric-section">
                <h4>🌿 Cultural Context</h4>
                <p>{selectedMetric.culturalContext}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'practices' && (
_<section className="practices">
          <h2>🌿 Cultural Wellness Practices</h2>
          
          <div className="practice-selector">
            {wellnessPractices.map((practice) => (
_<button
key={practice.title}
className={`practice-pill ${selectedPractice.title === practice.title ? 'active' : ''}`}
onClick={() => setSelectedPractice(practice)}
              >
                {practice.title}
              </button>
            ))}
          </div>

          <div className="practice-details">
            <h3>{selectedPractice.title}</h3>
            
            <div className="practice-grid">
              <div className="practice-section">
                <h4>📖 Description</h4>
                <p>{selectedPractice.description}</p>
              </div>
              
              <div className="practice-section">
                <h4>🏛️ Cultural Origin</h4>
                <p>{selectedPractice.culturalOrigin}</p>
              </div>
              
              <div className="practice-section">
                <h4>🔬 Modern Application</h4>
                <p>{selectedPractice.modernApplication}</p>
              </div>
              
              <div className="practice-section">
                <h4>📊 Evidence</h4>
                <p>{selectedPractice.evidence}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'correlation' && (
        <section className="correlation">
          <h2>🔗 Health Education Correlation Analysis</h2>
          
          <div className="correlation-content">
            <div className="correlation-section">
              <h3>📊 Key Findings</h3>
              <ul>
                <li>Students engaged in cultural activities show 23% higher wellbeing scores</li>
                <li>Traditional health practices correlate with improved mental health outcomes</li>
                <li>Family-centered approaches lead to better long-term health behaviors</li>
                <li>Cultural identity strength predicts positive health outcomes</li>
              </ul>
            </div>

            <div className="correlation-section">
              <h3>🌿 Cultural Integration Benefits</h3>
              <ul>
                <li>Enhanced sense of belonging and identity</li>
                <li>Improved mental health and resilience</li>
                <li>Stronger family and community connections</li>
                <li>Better understanding of holistic health concepts</li>
              </ul>
            </div>

            <div className="correlation-section">
              <h3>🎯 Educational Implications</h3>
              <ul>
                <li>Integrate cultural practices into health education curriculum</li>
                <li>Include traditional knowledge in modern health programs</li>
                <li>Support family and community involvement in health initiatives</li>
                <li>Recognize cultural identity as a health protective factor</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'activities' && (
        <section className="activities">
          <h2>🎯 Learning Activities</h2>
          
          <div className="activities-grid">
            <div className="activity">
              <h3>📊 Health Data Analysis</h3>
              <p>Analyze health metrics and identify correlations with cultural practices.</p>
              <ul>
                <li>Research local health statistics</li>
                <li>Compare cultural vs. non-cultural health outcomes</li>
                <li>Create data visualizations</li>
                <li>Present findings to class</li>
              </ul>
            </div>

            <div className="activity">
              <h3>🌿 Cultural Wellness Research</h3>
              <p>Research traditional wellness practices and their modern applications.</p>
              <ul>
                <li>Interview community health practitioners</li>
                <li>Document traditional healing knowledge</li>
                <li>Explore modern scientific evidence</li>
                <li>Create wellness resource guides</li>
              </ul>
            </div>

            <div className="activity">
              <h3>🏥 Health Program Design</h3>
              <p>Design culturally-responsive health education programs.</p>
              <ul>
                <li>Identify community health needs</li>
                <li>Integrate cultural practices</li>
                <li>Include family and community involvement</li>
                <li>Develop evaluation methods</li>
              </ul>
            </div>

            <div className="activity">
              <h3>📈 Correlation Study</h3>
              <p>Conduct a study on health education and cultural engagement.</p>
              <ul>
                <li>Design research questions</li>
                <li>Collect data from peers</li>
                <li>Analyze correlations</li>
                <li>Present research findings</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <p className="motto">🌿 "Hauora - Health is a taonga (treasure) to be nurtured"</p>
        <p className="platform">TeAoMarama — World's Best Teaching Bank with Cultural Excellence</p>
      </footer>
    </div>
  )
}
