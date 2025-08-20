import React from 'react';
import { Card } from '../../ui/card';
import './PromptEngineering101.css';

interface PromptEngineering101Props {
  className?: string;
}

export const PromptEngineering101: React.FC<PromptEngineering101Props> = ({ className = '' }) => {
  return (
    <Card 
      title="prompt engineering 101"
      subtitle="Te Kete Ako - Cultural Education"
      className={`prompt-engineering-101-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: prompt-engineering-101</p>
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

export default PromptEngineering101;
