import React from 'react';
import { Card } from '../../ui/card';
import './TreatyStoriesAnalysis.css';

interface TreatyStoriesAnalysisProps {
  className?: string;
}

export const TreatyStoriesAnalysis: React.FC<TreatyStoriesAnalysisProps> = ({ className = '' }) => {
  return (
    <Card 
      title="treaty stories analysis"
      subtitle="Te Kete Ako - Cultural Education"
      className={`treaty-stories-analysis-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: treaty-stories-analysis</p>
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

export default TreatyStoriesAnalysis;
