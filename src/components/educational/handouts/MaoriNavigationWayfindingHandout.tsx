import React from 'react';
import { Card } from '../../ui/Card';
import './MaoriNavigationWayfindingHandout.css';

interface MaoriNavigationWayfindingHandoutProps {
  className?: string;
}

export const MaoriNavigationWayfindingHandout: React.FC<MaoriNavigationWayfindingHandoutProps> = ({ className = '' }) => {
  return (
    <Card 
      title="maori navigation wayfinding handout"
      subtitle="Te Kete Ako - Cultural Education"
      className={`maori-navigation-wayfinding-handout-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: maori-navigation-wayfinding-handout</p>
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

export default MaoriNavigationWayfindingHandout;
