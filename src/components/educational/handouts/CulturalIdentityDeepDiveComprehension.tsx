import React from 'react';
import { Card } from '../../ui/Card';
import './CulturalIdentityDeepDiveComprehension.css';

interface CulturalIdentityDeepDiveComprehensionProps {
  className?: string;
}

export const CulturalIdentityDeepDiveComprehension: React.FC<CulturalIdentityDeepDiveComprehensionProps> = ({ className = '' }) => {
  return (
    <Card 
      title="cultural identity deep dive comprehension"
      subtitle="Te Kete Ako - Cultural Education"
      className={`cultural-identity-deep-dive-comprehension-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: cultural-identity-deep-dive-comprehension</p>
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

export default CulturalIdentityDeepDiveComprehension;
