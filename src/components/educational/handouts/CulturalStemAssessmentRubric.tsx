import React from 'react';
import { Card } from '../../ui/Card';
import './CulturalStemAssessmentRubric.css';

interface CulturalStemAssessmentRubricProps {
  className?: string;
}

export const CulturalStemAssessmentRubric: React.FC<CulturalStemAssessmentRubricProps> = ({ className = '' }) => {
  return (
    <Card 
      title="cultural stem assessment rubric"
      subtitle="Te Kete Ako - Cultural Education"
      className={`cultural-stem-assessment-rubric-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: cultural-stem-assessment-rubric</p>
        </div>

        <div className="cultural-footer">
          <div className="footer-content">
            <span className="footer-icon">🌿</span>
            <p>Honouring the cultural heritage of Aotearoa New Zealand</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CulturalStemAssessmentRubric;
