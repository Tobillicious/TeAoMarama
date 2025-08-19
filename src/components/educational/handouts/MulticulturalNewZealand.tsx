import React from 'react';
import { Card } from '../../ui/Card';
import './MulticulturalNewZealand.css';

interface MulticulturalNewZealandProps {
  className?: string;
}

export const MulticulturalNewZealand: React.FC<MulticulturalNewZealandProps> = ({ className = '' }) => {
  return (
    <Card 
      title="multicultural new zealand"
      subtitle="Te Kete Ako - Cultural Education"
      className={`multicultural-new-zealand-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: multicultural-new-zealand</p>
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