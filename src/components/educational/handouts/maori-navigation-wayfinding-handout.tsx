import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface MaoriNavigationWayfindingHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const MaoriNavigationWayfindingHandout: React.FC<MaoriNavigationWayfindingHandoutProps> = (_{
culturalContext = "Māori cultural knowledge and Aotearoa context", 
_yearLevel = "Year 8-10", 
_subject = "Mathematics,  _Science"
}) => {
return (
    <div className="maori-navigation-wayfinding-handout">
      <Card title="Handout: Māori Navigation" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Handout: Māori Navigation</h1>
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
        <h1 class="wiley-hero-title">Handout: Māori Navigation</h1>
        <p>This handout supports the video "The Art of Wayfinding".</p>
        <p><a href="https://www.youtube.com/watch?v=p-Zk-LQJ4sI" target="_blank" rel="noopener">Watch the video</a></p>
        
        <h2 class="wiley-section-title">Key Discussion Points</h2>
        <ul>
            <li>What is "wayfinding" and how does it differ from modern navigation?</li>
            <li>What natural signs do wayfinders use to navigate the ocean?</li>
            <li>Why is the revival of waka hourua and wayfinding important for Māori culture?</li>
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

export default MaoriNavigationWayfindingHandout
