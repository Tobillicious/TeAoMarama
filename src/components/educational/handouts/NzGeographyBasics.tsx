import React from 'react';
import { Card } from '../../ui/Card';
import './NzGeographyBasics.css';

interface NzGeographyBasicsProps {
  className?: string;
}

export const NzGeographyBasics: React.FC<NzGeographyBasicsProps> = ({ className = '' }) => {
  return (
    <Card 
      title="nz geography basics"
      subtitle="Te Kete Ako - Cultural Education"
      className={`nz-geography-basics-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: nz-geography-basics</p>
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

export default NzGeographyBasics;
