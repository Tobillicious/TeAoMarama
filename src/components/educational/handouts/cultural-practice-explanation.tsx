import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface CulturalPracticeExplanationProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const CulturalPracticeExplanation: React.FC<CulturalPracticeExplanationProps> = ({
  culturalContext = "Cultural practices and traditional knowledge",
  yearLevel = "Year 7-10",
  subject = "Cross-curricular"
}) => {
  return (
    <div className="cultural-practice-explanation">
      <Card title="Cultural Practice Explanation | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Cultural Practice Explanation | Te Kete Ako</h1>
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
        <h1 class="cultural-title" class="wiley-hero-title">Cultural Practice Explanation</h1>
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

export default CulturalPracticeExplanation;
