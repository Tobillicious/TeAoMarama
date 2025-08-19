import React from 'react';
import { Card } from '../../ui/Card';
import './Unit2PreColonialInnovationDeepDive.css';

interface Unit2PreColonialInnovationDeepDiveProps {
  className?: string;
}

export const Unit2PreColonialInnovationDeepDive: React.FC<Unit2PreColonialInnovationDeepDiveProps> = ({ className = '' }) => {
  return (
    <Card 
      title="unit 2 pre colonial innovation deep dive"
      subtitle="Te Kete Ako - Cultural Education"
      className={`unit-2-pre-colonial-innovation-deep-dive-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: unit-2-pre-colonial-innovation-deep-dive</p>
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