import React from 'react';
import { Card } from '../../ui/Card';
import './FutureOfTourismComprehensionHandout.css';

interface FutureOfTourismComprehensionHandoutProps {
  className?: string;
}

export const FutureOfTourismComprehensionHandout: React.FC<FutureOfTourismComprehensionHandoutProps> = ({ className = '' }) => {
  return (
    <Card 
      title="future of tourism comprehension handout"
      subtitle="Te Kete Ako - Cultural Education"
      className={`future-of-tourism-comprehension-handout-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: future-of-tourism-comprehension-handout</p>
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

export default FutureOfTourismComprehensionHandout;
