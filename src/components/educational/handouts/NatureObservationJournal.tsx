import React from 'react';
import { Card } from '../../ui/Card';
import './NatureObservationJournal.css';

interface NatureObservationJournalProps {
  className?: string;
}

export const NatureObservationJournal: React.FC<NatureObservationJournalProps> = ({ className = '' }) => {
  return (
    <Card 
      title="nature observation journal"
      subtitle="Te Kete Ako - Cultural Education"
      className={`nature-observation-journal-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: nature-observation-journal</p>
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