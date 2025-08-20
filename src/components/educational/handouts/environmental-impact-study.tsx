import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface EnvironmentalImpactStudyProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const EnvironmentalImpactStudy: React.FC<EnvironmentalImpactStudyProps> = (_{
culturalContext = "Environmental stewardship and climate action", 
_yearLevel = "Year 8-9", 
_subject = "Science,  _Social Studies"
}) => {
return (
    <div className="environmental-impact-study">
      <Card title="Environmental Impact Study | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Environmental Impact Study | Te Kete Ako</h1>
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
        <h1 class="cultural-title" class="wiley-hero-title">Environmental Impact Study</h1>
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

export default EnvironmentalImpactStudy
