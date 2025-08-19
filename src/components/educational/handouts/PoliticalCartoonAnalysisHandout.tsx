import React from 'react';
import { Card } from '../../ui/Card';
import './PoliticalCartoonAnalysisHandout.css';

interface PoliticalCartoonAnalysisHandoutProps {
  className?: string;
}

export const PoliticalCartoonAnalysisHandout: React.FC<PoliticalCartoonAnalysisHandoutProps> = ({ className = '' }) => {
  return (
    <Card 
      title="political cartoon analysis handout"
      subtitle="Te Kete Ako - Cultural Education"
      className={`political-cartoon-analysis-handout-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: political-cartoon-analysis-handout</p>
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