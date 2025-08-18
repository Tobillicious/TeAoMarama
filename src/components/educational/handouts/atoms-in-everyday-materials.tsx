import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface AtomsInEverydayMaterialsProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const AtomsInEverydayMaterials: React.FC<AtomsInEverydayMaterialsProps> = ({
  culturalContext = "Educational content with cultural integration",
  yearLevel = "Year 9-10",
  subject = "Science"
}) => {
  return (
    <div className="atoms-in-everyday-materials">
      <Card title="Atoms In Everyday Materials | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Atoms In Everyday Materials | Te Kete Ako</h1>
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
        <h1 class="cultural-title" class="wiley-hero-title">Atoms In Everyday Materials</h1>
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

export default AtomsInEverydayMaterials;
