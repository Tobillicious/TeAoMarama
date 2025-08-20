import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface KaitiakitangaKidsProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const KaitiakitangaKids: React.FC<KaitiakitangaKidsProps> = (_{
culturalContext = "Environmental guardianship and kaitiakitanga", 
_yearLevel = "Year 7-9", 
_subject = "Science,  _Social Studies"
}) => {
return (
    <div className="kaitiakitanga-kids">
      <Card title="Kaitiakitanga Kids | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Kaitiakitanga Kids | Te Kete Ako</h1>
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
        <h1 class="cultural-title" class="wiley-hero-title">Kaitiakitanga Kids</h1>
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

export default KaitiakitangaKids
