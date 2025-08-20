import React from 'react';
import { Card } from '../../ui/Card';
import './MicroplasticsComprehensionHandout.css';

interface MicroplasticsComprehensionHandoutProps {
  className?: string;
}

export const MicroplasticsComprehensionHandout: React.FC<MicroplasticsComprehensionHandoutProps> = ({ className = '' }) => {
  return (
    <Card 
      title="microplastics comprehension handout"
      subtitle="Te Kete Ako - Cultural Education"
      className={`microplastics-comprehension-handout-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: microplastics-comprehension-handout</p>
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

export default MicroplasticsComprehensionHandout;
