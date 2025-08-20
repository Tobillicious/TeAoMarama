import React from 'react';
import { Card } from '../../ui/card';
import './GeneticModificationComprehensionHandout.css';

interface GeneticModificationComprehensionHandoutProps {
  className?: string;
}

export const GeneticModificationComprehensionHandout: React.FC<GeneticModificationComprehensionHandoutProps> = ({ className = '' }) => {
  return (
    <Card 
      title="genetic modification comprehension handout"
      subtitle="Te Kete Ako - Cultural Education"
      className={`genetic-modification-comprehension-handout-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: genetic-modification-comprehension-handout</p>
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

export default GeneticModificationComprehensionHandout;
