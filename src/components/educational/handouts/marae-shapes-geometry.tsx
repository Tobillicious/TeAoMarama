import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface MaraeShapesGeometryProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const MaraeShapesGeometry: React.FC<MaraeShapesGeometryProps> = ({
  culturalContext = "Mathematical concepts in cultural context",
  yearLevel = "Year 7-8",
  subject = "Mathematics"
}) => {
  return (
    <div className="marae-shapes-geometry">
      <Card title="Marae Shapes Geometry | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Marae Shapes Geometry | Te Kete Ako</h1>
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
        <h1 class="cultural-title" class="wiley-hero-title">Marae Shapes Geometry</h1>
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

export default MaraeShapesGeometry;
