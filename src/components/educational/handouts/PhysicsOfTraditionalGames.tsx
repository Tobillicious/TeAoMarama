import React from 'react';
import { Card } from '../../ui/Card';
import './PhysicsOfTraditionalGames.css';

interface PhysicsOfTraditionalGamesProps {
  className?: string;
}

export const PhysicsOfTraditionalGames: React.FC<PhysicsOfTraditionalGamesProps> = ({ className = '' }) => {
  return (
    <Card 
      title="physics of traditional games"
      subtitle="Te Kete Ako - Cultural Education"
      className={`physics-of-traditional-games-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: physics-of-traditional-games</p>
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

export default PhysicsOfTraditionalGames;
