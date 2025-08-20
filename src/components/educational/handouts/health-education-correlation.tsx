import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface HealthEducationCorrelationProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const HealthEducationCorrelation: React.FC<HealthEducationCorrelationProps> = (_{
culturalContext = "Health and wellbeing in cultural context", 
_yearLevel = "Year 7-9", 
_subject = "Health & Physical Education"
}) => {
return (
    <div className="health-education-correlation">
      <Card title="Health Education Correlation | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Health Education Correlation | Te Kete Ako</h1>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌿 {culturalContext}</span>
          </div>
        </div>

        <div className="handout-content">
          <div 
className="te-kete-content"
dangerouslySetInnerHTML={{ __html: `
    <section class="cultural-section">
      <div class="cultural-content">
        <h1 class="cultural-title" class="wiley-hero-title">Health Education Correlation</h1>
        <p class="cultural-text">Placeholder handout. Full content coming soon.</p>
      </div>
    </section>
  ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default HealthEducationCorrelation
