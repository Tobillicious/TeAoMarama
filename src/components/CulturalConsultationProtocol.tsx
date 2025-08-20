import React, { useState } from 'react'
import './CulturalConsultationProtocol.css'

interface ConsultationStatus {,
id: string,
iwi: string,
topic: string,
status: 'pending' | 'in-progress' | 'completed' | 'review',
lastUpdated: string
  kaumatua?: string
  feedback?: string}
interface CulturalConsultationProtocolProps {className?: string
  variant?: 'full' | 'summary' | 'widget'}

// Mock data for demonstration
const consultationData: ConsultationStatus[] = [
  {,
id: '001',,
iwi: 'Ngāti Tuwharetoa',,
topic: 'Traditional Mathematics Concepts',,
status: 'completed',,
lastUpdated: '2024-08-15',,
kaumatua: 'Uncle Joe Tamaki',,
feedback: 'Excellent integration of traditional counting systems with modern curriculum'
  },
  {,
id: '002',,
iwi: 'Te Arawa',,
topic: 'Geothermal Science Education',,
status: 'in-progress',,
lastUpdated: '2024-08-16',,
kaumatua: 'Auntie Mary Te Rito'
  },
  {,
id: '003',,
iwi: 'Waikato-Tainui',,
topic: 'River Ecosystem Studies',,
status: 'pending',,
lastUpdated: '2024-08-17'
  }
]

const postcolonialPrinciples = [
  {,
title: "Tino Rangatiratanga",,
description: "Self-determination in educational content and delivery",,
icon: "👑"
  },
  {,
title: "Mana Whenua",,
description: "Recognition of territorial and cultural authority",,
icon: "🌍"
  },
  {,
title: "Whakapapa",,
description: "Genealogical connections to knowledge systems",,
icon: "🌳"
  },
  {,
title: "Tikanga Māori",,
description: "Correct cultural protocols and practices",,
icon: "⚖️"
  }
]

export const CulturalConsultationProtocol: React.FC<CulturalConsultationProtocolProps> = (_{
className = '', 
_variant = 'full'
}) => {
const [activeTab, setActiveTab] = useState<'consultations' | 'principles' | 'guidelines'>('consultations')

const getStatusColor = (_status: ConsultationStatus['status']) => {
switch (status) {
case 'completed':
return 'var(--color-success)'
      case 'in-progress':
return 'var(--color-primary)'
      case 'pending':
return 'var(--color-warning)'
      case 'review':
return 'var(--color-info)',
default:
return 'var(--color-neutral-500)'
    }
  }

const getStatusText = (_status: ConsultationStatus['status']) => {
switch (status) {
case 'completed':
return 'Completed'
      case 'in-progress':
return 'In Progress'
      case 'pending':
return 'Pending'
      case 'review':
return 'Under Review',
default:
return 'Unknown'
    }
  }

if (variant === 'widget') {
return (
      <div className={`cultural-consultation-widget ${className}`}>
        <div className="widget-header">
          <div className="widget-icon">🤝</div>
          <div className="widget-info">
            <h4>Cultural Consultation</h4>
            <p>{consultationData.filter(c => c.status === 'completed').length} of {consultationData.length} completed</p>
          </div>
        </div>
        <div className="widget-progress">
          <div 
className="progress-bar"
style={{ ,
width: `${(consultationData.filter(c => c.status === 'completed').length / consultationData.length) * 100}%` 
            }}
          />
        </div>
      </div>
    )
  }
return (
    <div className={`cultural-consultation-protocol cultural-consultation-${variant} ${className}`}>
      <div className="consultation-header">
        <div className="header-content">
          <div className="header-icon">🤝</div>
          <div className="header-text">
            <h2>Cultural Consultation Protocol</h2>
            <p>Authentic Iwi engagement and postcolonial pedagogical framework</p>
          </div>
        </div>
        <div className="consultation-stats">
          <div className="stat">
            <span className="stat-number">{consultationData.length}</span>
            <span className="stat-label">Active Consultations</span>
          </div>
          <div className="stat">
            <span className="stat-number">{consultationData.filter(c => c.status === 'completed').length}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      <div className="consultation-tabs">
        <button
className={`tab-button ${activeTab === 'consultations' ? 'active' : ''}`}
onClick={() => setActiveTab('consultations')}
        >
          <span className="tab-icon">📋</span>
Iwi Consultations
        </button>
        <button
className={`tab-button ${activeTab === 'principles' ? 'active' : ''}`}
onClick={() => setActiveTab('principles')}
        >
          <span className="tab-icon">🌱</span>
Postcolonial Principles
        </button>
        <button
className={`tab-button ${activeTab === 'guidelines' ? 'active' : ''}`}
onClick={() => setActiveTab('guidelines')}
        >
          <span className="tab-icon">📖</span>
Guidelines
        </button>
      </div>

      <div className="consultation-content">
        {activeTab === 'consultations' && (
_<div className="consultations-list">
            {consultationData.map((consultation) => (
              <div key={consultation.id} className="consultation-card">
                <div className="consultation-header-card">
                  <div className="consultation-info">
                    <h3>{consultation.iwi}</h3>
                    <p className="consultation-topic">{consultation.topic}</p>
                  </div>
                  <div 
className="consultation-status"
style={{ backgroundColor: getStatusColor(consultation.status) }}
                  >
                    {getStatusText(consultation.status)}
                  </div>
                </div>
                <div className="consultation-details">
                  <div className="detail-item">
                    <span className="detail-label">Last Updated:</span>
                    <span className="detail-value">{consultation.lastUpdated}</span>
                  </div>
                  {consultation.kaumatua && (
                    <div className="detail-item">
                      <span className="detail-label">Kaumātua:</span>
                      <span className="detail-value">{consultation.kaumatua}</span>
                    </div>
                  )}
                  {consultation.feedback && (
                    <div className="consultation-feedback">
                      <span className="feedback-label">Feedback:</span>
                      <p className="feedback-text">"{consultation.feedback}"</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'principles' && (
_<div className="principles-grid">
            {postcolonialPrinciples.map((principle,  _index) => (
              <div key={index} className="principle-card">
                <div className="principle-icon">{principle.icon}</div>
                <h3 className="principle-title">{principle.title}</h3>
                <p className="principle-description">{principle.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'guidelines' && (
          <div className="guidelines-content">
            <div className="guideline-section">
              <h3>🌿 Cultural Safety Protocol</h3>
              <ul>
                <li>All educational content must be reviewed by relevant iwi representatives</li>
                <li>Kaumātua guidance is sought for culturally sensitive topics</li>
                <li>Traditional knowledge is shared with appropriate permissions</li>
                <li>Community voice is prioritized in educational design</li>
              </ul>
            </div>
            
            <div className="guideline-section">
              <h3>🤝 Consultation Process</h3>
              <ol>
                <li><strong>Initial Engagement: </strong> Contact appropriate iwi through proper channels</li>
                <li><strong>Hui Planning:</strong> Organize face-to-face meetings with cultural protocols</li>
                <li><strong>Content Review:</strong> Collaborative review of educational materials</li>
                <li><strong>Feedback Integration:</strong> Incorporate cultural insights and corrections</li>
                <li><strong>Ongoing Relationship:</strong> Maintain long-term partnership beyond project completion</li>
              </ol>
            </div>

            <div className="guideline-section">
              <h3>📚 Postcolonial Pedagogical Framework</h3>
              <ul>
                <li>Decolonize curriculum through indigenous knowledge systems</li>
                <li>Challenge Western-centric educational assumptions</li>
                <li>Validate multiple ways of knowing and learning</li>
                <li>Integrate traditional and contemporary knowledge</li>
                <li>Empower indigenous voices and perspectives</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CulturalConsultationProtocol