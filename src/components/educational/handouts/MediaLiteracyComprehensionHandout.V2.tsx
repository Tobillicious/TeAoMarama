import React from 'react';
import { Card } from '../../ui/Card';
import './MediaLiteracyComprehensionHandout.V2.css';

interface MediaLiteracyComprehensionHandoutV2Props {
  className?: string;
}

export const MediaLiteracyComprehensionHandoutV2: React.FC<
  MediaLiteracyComprehensionHandoutV2Props
> = ({ className = '' }) => {
  return (
    <Card
      title="media literacy comprehension handout.v2"
      subtitle="Te Kete Ako - Cultural Education"
      className={`media-literacy-comprehension-handout.v2-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>

        <div className="content-section">
          <p>
            This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako
            beauty patterns.
          </p>
          <p>Original content: media-literacy-comprehension-handout.v2</p>
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
