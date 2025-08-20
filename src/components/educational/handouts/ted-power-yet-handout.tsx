import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface TedPowerYetHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const TedPowerYetHandout: React.FC<TedPowerYetHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="ted-power-yet-handout">
      <Card title="Handout: The Power of Yet" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Handout: The Power of Yet</h1>
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
        <h1 class="wiley-hero-title">Handout: The Power of Yet</h1>
        <p>This handout supports the TED talk "The Power of Yet" by Carol Dweck.</p>
        <p><a href="https://www.youtube.com/watch?v=J-swZaKN2Ic" target="_blank" rel="noopener">Watch the video</a></p>
        
        <h2 class="wiley-section-title">Key Discussion Points</h2>
        <ul>
            <li>What is the difference between a "fixed mindset" and a "growth mindset"?</li>
            <li>How can the phrase "not yet" change our approach to challenges?</li>
            <li>What are some ways you can apply the "power of yet" in your own learning?</li>
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

export default TedPowerYetHandout
