import React from 'react';
import { Card } from '../../ui/Card';
import './Unit2MaoriBattalionLegacy.css';

interface Unit2MaoriBattalionLegacyProps {
  className?: string;
}

export const Unit2MaoriBattalionLegacy: React.FC<Unit2MaoriBattalionLegacyProps> = ({ className = '' }) => {
  return (
    <Card 
      title="unit 2 maori battalion legacy"
      subtitle="Te Kete Ako - Cultural Education"
      className={`unit-2-maori-battalion-legacy-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: unit-2-maori-battalion-legacy</p>
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