import React from 'react';
import { Card } from '../../ui/card';
import './Year9StarterPackAlphaBuild.css';

interface Year9StarterPackAlphaBuildProps {
  className?: string;
}

export const Year9StarterPackAlphaBuild: React.FC<Year9StarterPackAlphaBuildProps> = ({ className = '' }) => {
  return (
    <Card 
      title="year 9 starter pack alpha build"
      subtitle="Te Kete Ako - Cultural Education"
      className={`year-9-starter-pack-alpha-build-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: year-9-starter-pack-alpha-build</p>
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

export default Year9StarterPackAlphaBuild;
