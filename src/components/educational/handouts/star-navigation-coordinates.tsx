import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface StarNavigationCoordinatesProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const StarNavigationCoordinates: React.FC<StarNavigationCoordinatesProps> = ({
  culturalContext = "Traditional navigation and astronomical knowledge",
  yearLevel = "Year 8-10",
  subject = "Mathematics, Science"
}) => {
  return (
    <div className="star-navigation-coordinates">
      <Card title="Star Navigation Coordinates | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Star Navigation Coordinates | Te Kete Ako</h1>
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
        <h1 class="cultural-title" class="wiley-hero-title">Star Navigation Coordinates</h1>
        <p class="cultural-text">Placeholder handout. Full content coming soon.</p>
      </div>
    </section>
  ` }}
          />
        </div>
      </Card>
    </div>
  );
};

export default StarNavigationCoordinates;
