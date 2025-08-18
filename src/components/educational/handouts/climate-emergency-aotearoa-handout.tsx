import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface ClimateEmergencyAotearoaHandoutProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const ClimateEmergencyAotearoaHandout: React.FC<ClimateEmergencyAotearoaHandoutProps> = ({
  culturalContext = "Māori cultural knowledge and Aotearoa context",
  yearLevel = "Year 9-10",
  subject = "Science, Social Studies"
}) => {
  return (
    <div className="climate-emergency-aotearoa-handout">
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
        <p>This handout supports the video "Declaring a Climate Emergency".</p>
        <p><a href="https://www.youtube.com/watch?v=A-sA182-yoA" target="_blank" rel="noopener">Watch the video</a></p>
        
        <h2 class="wiley-section-title">Key Discussion Points</h2>
        <ul>
            <li>What does it mean for a government to declare a "climate emergency"?</li>
            <li>What are the concerns of the young people featured in the video?</li>
            <li>What actions do they believe are necessary to address climate change?</li>
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
  );
};

export default ClimateEmergencyAotearoaHandout;
