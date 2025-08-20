import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface TreatyOfWaitangiHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const TreatyOfWaitangiHandout: React.FC<TreatyOfWaitangiHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="treaty-of-waitangi-handout">
      <Card title="Handout: The Treaty of Waitangi" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Handout: The Treaty of Waitangi</h1>
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
        <h1 class="wiley-hero-title">Handout: The Treaty of Waitangi</h1>
        <p>This handout supports the video "The Treaty of Waitangi explained, simply".</p>
        <p><a href="https: //www.youtube.com/watch?v=a-yXA-a-t1E" target="_blank" rel="noopener">Watch the video</a></p>
        
        <h2 class="wiley-section-title">Key Discussion Points</h2>
        <ul>
            <li>What are the three main articles of the Treaty of Waitangi?</li>
            <li>What are the key differences between the English and Māori versions of the Treaty?</li>
            <li>Why is the Treaty of Waitangi still important today?</li>
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

export default TreatyOfWaitangiHandout
