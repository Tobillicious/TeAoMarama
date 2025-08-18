import React from 'react';
import { Card } from '../Card';
import '../../../styles/te-kete-synthesis.css';

interface TeKeteHandoutProps {
  title: string;
  content: string;
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

export const TeKeteHandout: React.FC<TeKeteHandoutProps> = ({
  title,
  content,
  culturalContext,
  yearLevel,
  subject
}) => {
  return (
    <Card className="te-kete-handout">
      <div className="handout-header">
        <h2 className="handout-title">{title}</h2>
        {yearLevel && <span className="year-badge">{yearLevel}</span>}
        {subject && <span className="subject-badge">{subject}</span>}
      </div>
      
      {culturalContext && (
        <div className="cultural-context">
          <div className="cultural-icon">🌿</div>
          <p className="cultural-text">{culturalContext}</p>
        </div>
      )}
      
      <div 
        className="handout-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      <div className="handout-footer">
        <span className="te-kete-attribution">
          Te Kete Ako - Whaowhia te kete mātauranga
        </span>
      </div>
    </Card>
  );
};