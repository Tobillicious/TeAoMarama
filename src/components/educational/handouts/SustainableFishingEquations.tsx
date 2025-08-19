import React from 'react';
import { Card } from '../../ui/Card';
import './SustainableFishingEquations.css';

interface SustainableFishingEquationsProps {
  className?: string;
}

export const SustainableFishingEquations: React.FC<SustainableFishingEquationsProps> = ({ className = '' }) => {
  return (
    <Card 
      title="sustainable fishing equations"
      subtitle="Te Kete Ako - Cultural Education"
      className={`sustainable-fishing-equations-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: sustainable-fishing-equations</p>
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