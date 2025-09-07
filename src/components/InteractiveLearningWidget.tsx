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
           aria-valuenow={Math.round(progress)} aria-valuemax={100}>
        <div 
          className="progress-bar progress-bar-dynamic"
          style={{ '--progress-width': `${progress}%` } as React.CSSProperties}
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
          <div className="interactive-activity">
            {activity.type === 'drag-drop' && (
              <div className="drag-drop-zone">
                <div className="drag-items">
                  <div className="drag-item">Te Reo Māori</div>
                  <div className="drag-item">English</div>
                  <div className="drag-item">Tikanga</div>
                </div>
                <div className="drop-zones">
                  <div className="drop-zone">Language</div>
                  <div className="drop-zone">Culture</div>
                </div>
                <button 
                  onClick={() => handleActivityComplete(85)}
                  className="complete-button"
                >
                  Submit Matches
                </button>
              </div>
            )}
            {activity.type === 'matching' && (
              <div className="matching-activity">
                <div className="matching-pairs">
                  <div className="match-column">
                    <button className="match-item">Kia ora</button>
                    <button className="match-item">Whānau</button>
                    <button className="match-item">Aroha</button>
                  </div>
                  <div className="match-column">
                    <button className="match-item">Family</button>
                    <button className="match-item">Love</button>
                    <button className="match-item">Hello</button>
                  </div>
                </div>
                <button 
                  onClick={() => handleActivityComplete(90)}
                  className="complete-button"
                >
                  Check Matches
                </button>
              </div>
            )}
            {activity.type === 'timeline' && (
              <div className="timeline-activity">
                <div className="timeline-events">
                  <div className="timeline-item">1769 - Captain Cook arrives</div>
                  <div className="timeline-item">1840 - Treaty of Waitangi</div>
                  <div className="timeline-item">1987 - Te Reo becomes official language</div>
                </div>
                <button 
                  onClick={() => handleActivityComplete(80)}
                  className="complete-button"
                >
                  Complete Timeline
                </button>
              </div>
            )}
            {activity.type === 'scenario' && (
              <div className="scenario-activity">
                <div className="scenario-content">
                  <p>🌿 Cultural Scenario: You're invited to a hui (meeting). What would be appropriate?</p>
                  <div className="scenario-options">
                    <button className="scenario-option">Remove shoes before entering</button>
                    <button className="scenario-option">Wait to be welcomed</button>
                    <button className="scenario-option">Bring koha (gift)</button>
                  </div>
                </div>
                <button 
                  onClick={() => handleActivityComplete(95)}
                  className="complete-button"
                >
                  Submit Response
                </button>
              </div>
            )}
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