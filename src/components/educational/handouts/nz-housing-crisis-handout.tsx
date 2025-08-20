import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface NzHousingCrisisHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const NzHousingCrisisHandout: React.FC<NzHousingCrisisHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="nz-housing-crisis-handout">
      <Card title="Handout: NZ Housing Crisis" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Handout: NZ Housing Crisis</h1>
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
    <div class="container">
        <h1 class="wiley-hero-title">Handout: NZ Housing Crisis</h1>
        <p>This handout supports the video "Inside New Zealand's housing crisis".</p>
        <p><a href="https://www.youtube.com/watch?v=r-F-4F_i8mE" target="_blank" rel="noopener">Watch the video</a></p>
        
        <h2 class="wiley-section-title">Key Discussion Points</h2>
        <ul>
            <li>What are the main factors contributing to the housing crisis in New Zealand?</li>
            <li>How does the housing crisis affect young people and families?</li>
            <li>What are some of the potential solutions discussed in the video?</li>
        </ul>
    </div>

    <!-- Load Supabase Client -->
    <script src="js/supabase-client.js"></script>
    <!-- Load Auth UI -->
    <script src="js/auth-enhanced.js"></script>
` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default NzHousingCrisisHandout
