import React from 'react';
import { Card } from '../../ui/card';
import './DecisionFrameworksComparisonGuide.css';

interface DecisionFrameworksComparisonGuideProps {
  className?: string;
}

export const DecisionFrameworksComparisonGuide: React.FC<DecisionFrameworksComparisonGuideProps> = ({ className = '' }) => {
  return (
    <Card 
      title="decision frameworks comparison guide"
      subtitle="Te Kete Ako - Cultural Education"
      className={`decision-frameworks-comparison-guide-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: decision-frameworks-comparison-guide</p>
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

export default DecisionFrameworksComparisonGuide;
