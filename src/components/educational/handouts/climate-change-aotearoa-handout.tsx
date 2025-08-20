import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface ClimateChangeAotearoaHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const ClimateChangeAotearoaHandout: React.FC<ClimateChangeAotearoaHandoutProps> = (_{
culturalContext = "Māori cultural knowledge and Aotearoa context", 
_yearLevel = "Year 9-10", 
_subject = "Science,  _Social Studies"
}) => {
return (
    <div className="climate-change-aotearoa-handout">
      <Card title="Handout: Climate Change in Aotearoa" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Handout: Climate Change in Aotearoa</h1>
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
        <h1 class="wiley-hero-title">Handout: Climate Change in Aotearoa</h1>
        <p>This handout supports the video "Climate Change in Aotearoa".</p>
        <p><a href="https://www.youtube.com/watch?v=HtTMSCVFbFg" target="_blank" rel="noopener">Watch the video</a></p>
        
        <h2 class="wiley-section-title">Key Discussion Points</h2>
        <ul>
            <li>What are the main impacts of climate change discussed in the video?</li>
            <li>How are young people in New Zealand responding to the climate crisis?</li>
            <li>What solutions or actions are proposed in the video?</li>
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

export default ClimateChangeAotearoaHandout
