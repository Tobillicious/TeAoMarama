import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface ArtOfHakaHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const ArtOfHakaHandout: React.FC<ArtOfHakaHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="art-of-haka-handout">
      <Card title="Handout: The Art of Haka" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Handout: The Art of Haka</h1>
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
        <h1 class="wiley-hero-title">Handout: The Art of Haka</h1>
        <p>This handout supports the video "Kapa Haka | NPR".</p>
        <p><a href="https://www.youtube.com/watch?v=QIwLu22b6QU" target="_blank" rel="noopener">Watch the video</a></p>
        
        <h2 class="wiley-section-title">Key Discussion Points</h2>
        <ul>
            <li>What are the different elements of a Kapa Haka performance?</li>
            <li>What is the cultural significance of the Haka?</li>
            <li>How does the Haka connect to Māori identity and storytelling?</li>
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

export default ArtOfHakaHandout
