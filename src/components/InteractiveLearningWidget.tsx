import React, { useState, useRef } from 'react';

interface LearningActivity {
  id: string;
  title: string;
  titleTe: string;
  type: 'drag-drop' | 'matching' | 'timeline' | 'scenario';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  culturalElements: string[];
  instructions: string;
  instructionsTe: string;
  data: unknown;
}

export function InteractiveLearningWidget({ activity }: { activity: LearningActivity }) {
  const [progress, setProgress] = useState(0);
  const [culturalMode, setCulturalMode] = useState(false);
  const [completed, setCompleted] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleActivityComplete = (score: number) => {
    setProgress(score);
    if (score >= 80) {
      setCompleted(true);
      // Announce completion for screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.textContent = 'Activity completed successfully!';
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
  };

  return (
    <div 
      ref={widgetRef}
      className="interactive-learning-widget"
      role="application"
      aria-label={`Interactive learning activity: ${activity.title}`}
    >
      <div className="widget-header">
        <h3>{culturalMode ? activity.titleTe : activity.title}</h3>
        <div className="widget-controls">
          <button
            onClick={() => setCulturalMode(!culturalMode)}
            className="cultural-toggle"
            aria-label="Toggle Te Reo Māori mode"
          >
            {culturalMode ? 'English' : 'Te Reo'}
          </button>
        </div>
      </div>

      <div className="progress-indicator" role="progressbar" 
           aria-valuenow={progress} aria-valuemax={100}>
        <div 
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
        <span className="sr-only">{progress}% complete</span>
      </div>

      <div className="activity-content">
        <p className="instructions">
          {culturalMode ? activity.instructionsTe : activity.instructions}
        </p>

        {activity.culturalElements.length > 0 && (
          <div className="cultural-elements">
            <h4>🌿 Cultural Elements in this Activity:</h4>
            <ul>
              {activity.culturalElements.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="activity-area" role="main">
          {/* Activity-specific content would be rendered here based on type */}
          <div className="placeholder-activity">
            <p>Interactive {activity.type} activity would be implemented here</p>
            <button 
              onClick={() => handleActivityComplete(85)}
              className="complete-button"
            >
              Complete Activity
            </button>
          </div>
        </div>
      </div>

      {completed && (
        <div className="completion-celebration" role="alert">
          <h4>🎉 Excellent work!</h4>
          <p>You've successfully completed this learning activity.</p>
          <div className="cultural-appreciation">
            <p>🌿 Your engagement with cultural elements enhances understanding.</p>
          </div>
        </div>
      )}
    </div>
  );
}