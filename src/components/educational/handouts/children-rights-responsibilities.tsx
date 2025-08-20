import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface ChildrenRightsResponsibilitiesProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const ChildrenRightsResponsibilities: React.FC<ChildrenRightsResponsibilitiesProps> = (_{
culturalContext = "Cultural rights and community responsibilities", 
_yearLevel = "Year 7-10", 
_subject = "Social Studies"
}) => {
return (
    <div className="children-rights-responsibilities">
      <Card title="Children Rights Responsibilities | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Children Rights Responsibilities | Te Kete Ako</h1>
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
        <h1 class="cultural-title" class="wiley-hero-title">Children Rights Responsibilities</h1>
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

export default ChildrenRightsResponsibilities
