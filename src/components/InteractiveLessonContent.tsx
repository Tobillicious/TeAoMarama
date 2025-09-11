import { ArrowRight, BookOpen, CheckCircle, Play, Star, Users } from 'lucide-react';
import React, { useState } from 'react';
import './InteractiveLessonContent.css';

interface LessonActivity {
  title: string;
  description: string;
}

interface InteractiveLessonProps {
  lessonData: {
    id: string;
    title: string;
    subject: string;
    yearLevel: string;
    culturalContext: string;
    learningObjectives: string[];
    activities: LessonActivity[];
    resources: string[];
    duration: string;
  };
}

const InteractiveLessonContent: React.FC<InteractiveLessonProps> = ({ lessonData }) => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());
  const [studentResponses, setStudentResponses] = useState<{[key: number]: string}>({});

  const markActivityComplete = (activityIndex: number) => {
    setCompletedActivities(prev => new Set([...prev, activityIndex]));
  };

  const handleStudentResponse = (activityIndex: number, response: string) => {
    setStudentResponses(prev => ({
      ...prev,
      [activityIndex]: response
    }));
  };

  const renderActivityContent = (activity: LessonActivity, index: number) => {
    const isCompleted = completedActivities.has(index);
    
    // Build interactive content based on the activity description
    switch (index) {
      case 0: // "He Kōrero mō Te Awa | The Story of Our Stream"
        return (
          <div className="interactive-activity">
            <div className="activity-header">
              <h3>🏞️ {activity.title}</h3>
              <div className="cultural-note">
                <strong>Cultural Context:</strong> We're learning about Te Awa o Mangakōtukutuku through respectful exploration of Ngāti Kahungunu perspectives.
              </div>
            </div>
            
            <div className="activity-content">
              <div className="multimedia-section">
                <h4>📸 Historical Exploration</h4>
                <div className="image-gallery">
                  <div className="placeholder-image">
                    <span>Historical photographs of Mangakōtukutuku Stream (1900s)</span>
                  </div>
                  <div className="placeholder-image">
                    <span>Traditional maps showing waterway significance</span>
                  </div>
                  <div className="placeholder-image">
                    <span>Modern conservation efforts</span>
                  </div>
                </div>
              </div>

              <div className="analysis-section">
                <h4>🔍 Language Analysis Task</h4>
                <p><strong>Your Task:</strong> Examine how the stream has been described across different time periods.</p>
                
                <div className="text-samples">
                  <div className="text-sample">
                    <h5>1920s Newspaper Account:</h5>
                    <blockquote>
                      "The Mangakōtukutuku provides vital transport and sustenance to local Māori communities, its clear waters supporting abundant fish life."
                    </blockquote>
                  </div>
                  
                  <div className="text-sample">
                    <h5>2020s Council Report:</h5>
                    <blockquote>
                      "Urgent action required to restore water quality in Mangakōtukutuku catchment due to agricultural runoff and urban development impacts."
                    </blockquote>
                  </div>
                </div>

                <div className="student-task">
                  <label htmlFor={`response-${index}`}>
                    <strong>Compare the language used:</strong> What persuasive techniques do you notice? How do cultural values show through?
                  </label>
                  <textarea
                    id={`response-${index}`}
                    value={studentResponses[index] || ''}
                    onChange={(e) => handleStudentResponse(index, e.target.value)}
                    placeholder="Write your analysis here... (minimum 100 words)"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // "Te Reo Kairangi | Language of Persuasion"
        return (
          <div className="interactive-activity">
            <div className="activity-header">
              <h3>💬 {activity.title}</h3>
            </div>
            
            <div className="activity-content">
              <div className="persuasion-toolkit">
                <h4>🛠️ Persuasive Language Toolkit</h4>
                <div className="technique-cards">
                  <div className="technique-card">
                    <h5>Emotional Appeals (Pathos)</h5>
                    <p>"Our children deserve clean waterways"</p>
                    <button className="example-btn">See Examples</button>
                  </div>
                  <div className="technique-card">
                    <h5>Evidence & Logic (Logos)</h5>
                    <p>"Water quality decreased 40% since 2010"</p>
                    <button className="example-btn">See Examples</button>
                  </div>
                  <div className="technique-card">
                    <h5>Cultural Authority (Ethos)</h5>
                    <p>"Kaitiaki responsibilities passed down through generations"</p>
                    <button className="example-btn">See Examples</button>
                  </div>
                </div>
              </div>

              <div className="practice-section">
                <h4>✏️ Practice Activity</h4>
                <p>Read this council submission and identify persuasive techniques:</p>
                <div className="practice-text">
                  <blockquote>
                    "As tangata whenua and kaitiaki of this waterway for over 600 years, we urge immediate action to protect Te Awa o Mangakōtukutuku. Recent testing shows nitrate levels have tripled, threatening both cultural practices and community health. Our mokopuna deserve the same pure waters that sustained our ancestors."
                  </blockquote>
                </div>

                <div className="technique-identifier">
                  <p><strong>Click on techniques you identify:</strong></p>
                  <div className="technique-buttons">
                    <button className="technique-btn">Cultural Authority</button>
                    <button className="technique-btn">Emotional Appeal</button>
                    <button className="technique-btn">Statistical Evidence</button>
                    <button className="technique-btn">Future Generations</button>
                    <button className="technique-btn">Historical Connection</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // "Hui with Kaitiaki | Learning from Guardians"
        return (
          <div className="interactive-activity">
            <div className="activity-header">
              <h3>🤝 {activity.title}</h3>
            </div>
            
            <div className="activity-content">
              <div className="preparation-section">
                <h4>📝 Interview Preparation</h4>
                <p>Prepare thoughtful questions for local kaitiaki and council representatives.</p>
                
                <div className="question-builder">
                  <h5>Question Categories:</h5>
                  <div className="question-prompts">
                    <div className="prompt-category">
                      <h6>Cultural Perspectives:</h6>
                      <ul>
                        <li>"What does kaitiakitanga mean in practice for this waterway?"</li>
                        <li>"How do traditional practices guide restoration efforts?"</li>
                      </ul>
                    </div>
                    <div className="prompt-category">
                      <h6>Current Challenges:</h6>
                      <ul>
                        <li>"What are the biggest threats to stream health today?"</li>
                        <li>"How do you balance development with conservation?"</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="student-questions">
                  <label htmlFor={`questions-${index}`}>
                    <strong>Write 5 questions you would ask:</strong>
                  </label>
                  <textarea
                    id={`questions-${index}`}
                    value={studentResponses[index] || ''}
                    onChange={(e) => handleStudentResponse(index, e.target.value)}
                    placeholder="1. [Your question here]&#10;2. &#10;3. &#10;4. &#10;5. "
                    rows={6}
                  />
                </div>
              </div>

              <div className="simulated-interview">
                <h4>🎥 Simulated Interview Responses</h4>
                <div className="interview-video">
                  <div className="video-placeholder">
                    <Play size={48} />
                    <p>Interactive Interview with Local Kaitiaki</p>
                    <button className="play-btn">Start Interview Simulation</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // "He Korero Whakamanawa | Crafting Our Speeches"
        return (
          <div className="interactive-activity">
            <div className="activity-header">
              <h3>🎤 {activity.title}</h3>
            </div>
            
            <div className="activity-content">
              <div className="speech-builder">
                <h4>📝 Speech Structure Guide</h4>
                <div className="structure-template">
                  <div className="speech-section">
                    <h5>1. Opening (30 seconds)</h5>
                    <p>Hook + Cultural acknowledgment + Thesis</p>
                    <textarea 
                      placeholder="Write your opening..."
                      rows={3}
                    />
                  </div>
                  <div className="speech-section">
                    <h5>2. Problem (1 minute)</h5>
                    <p>Evidence + Impact + Cultural significance</p>
                    <textarea 
                      placeholder="Describe the problem..."
                      rows={3}
                    />
                  </div>
                  <div className="speech-section">
                    <h5>3. Solutions (1 minute)</h5>
                    <p>Practical actions + Community involvement</p>
                    <textarea 
                      placeholder="Propose solutions..."
                      rows={3}
                    />
                  </div>
                  <div className="speech-section">
                    <h5>4. Call to Action (30 seconds)</h5>
                    <p>Specific ask + Inspirational close</p>
                    <textarea 
                      placeholder="Your call to action..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="practice-tools">
                  <h4>🎯 Practice Tools</h4>
                  <div className="tool-buttons">
                    <button className="tool-btn">
                      <span>🎙️</span>
                      Record Practice
                    </button>
                    <button className="tool-btn">
                      <span>⏱️</span>
                      Timer (3 min)
                    </button>
                    <button className="tool-btn">
                      <span>📊</span>
                      Feedback Form
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // "Te Whakatairanga | Campaign Presentation"
        return (
          <div className="interactive-activity">
            <div className="activity-header">
              <h3>🎨 {activity.title}</h3>
            </div>
            
            <div className="activity-content">
              <div className="campaign-builder">
                <h4>🎨 Campaign Development Kit</h4>
                <div className="campaign-components">
                  <div className="component-card">
                    <h5>📱 Social Media Campaign</h5>
                    <div className="mock-social">
                      <div className="post-template">
                        <input placeholder="Hashtag for your campaign" />
                        <textarea placeholder="Write your post content..." rows={3} />
                        <div className="image-upload">
                          <span>📷 Add compelling image</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="component-card">
                    <h5>📄 Community Flyer</h5>
                    <div className="flyer-designer">
                      <input placeholder="Compelling headline" />
                      <textarea placeholder="Key message for community..." rows={4} />
                      <input placeholder="Contact information / Action steps" />
                    </div>
                  </div>

                  <div className="component-card">
                    <h5>🏛️ Council Presentation</h5>
                    <div className="presentation-outline">
                      <input placeholder="Title slide" />
                      <textarea placeholder="3 key points with evidence..." rows={4} />
                      <input placeholder="Specific request to council" />
                    </div>
                  </div>
                </div>

                <div className="presentation-practice">
                  <h4>🎤 Present to Authentic Audience</h4>
                  <div className="audience-feedback">
                    <div className="feedback-form">
                      <h5>Audience Feedback Form</h5>
                      <div className="criteria">
                        <label>
                          <input type="checkbox" /> Clear problem identification
                        </label>
                        <label>
                          <input type="checkbox" /> Culturally respectful approach
                        </label>
                        <label>
                          <input type="checkbox" /> Evidence-based arguments
                        </label>
                        <label>
                          <input type="checkbox" /> Actionable solutions
                        </label>
                        <label>
                          <input type="checkbox" /> Engaging delivery
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="interactive-activity">
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
            <div className="student-task">
              <textarea
                value={studentResponses[index] || ''}
                onChange={(e) => handleStudentResponse(index, e.target.value)}
                placeholder="Your response..."
                rows={4}
              />
            </div>
          </div>
        );
    }
  };

  const progressPercentage = (completedActivities.size / lessonData.activities.length) * 100;

  return (
    <div className="interactive-lesson">
      {/* Lesson Header */}
      <div className="lesson-header">
        <div className="cultural-banner">
          <span className="cultural-icon">🌿</span>
          <div className="cultural-text">
            <h1>{lessonData.title}</h1>
            <p className="cultural-context">{lessonData.culturalContext}</p>
          </div>
        </div>
        
        <div className="lesson-meta">
          <span className="subject-badge">{lessonData.subject}</span>
          <span className="year-badge">{lessonData.yearLevel}</span>
          <span className="duration-badge">{lessonData.duration}</span>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="progress-section">
        <div className="progress-header">
          <h3>📊 Your Learning Journey</h3>
          <span className="progress-text">{completedActivities.size} of {lessonData.activities.length} activities completed</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="activity-indicators">
          {lessonData.activities.map((_, index) => (
            <div 
              key={index}
              className={`activity-indicator ${completedActivities.has(index) ? 'completed' : ''} ${currentActivity === index ? 'current' : ''}`}
              onClick={() => setCurrentActivity(index)}
            >
              {completedActivities.has(index) ? <CheckCircle size={16} /> : <span>{index + 1}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="objectives-section">
        <h3>🎯 What You'll Learn</h3>
        <ul className="objectives-list">
          {lessonData.learningObjectives.map((objective, index) => (
            <li key={index}>
              <Star size={16} />
              {objective}
            </li>
          ))}
        </ul>
      </div>

      {/* Current Activity */}
      <div className="current-activity">
        <div className="activity-navigation">
          <button 
            onClick={() => setCurrentActivity(Math.max(0, currentActivity - 1))}
            disabled={currentActivity === 0}
            className="nav-btn"
          >
            ← Previous
          </button>
          
          <span className="activity-counter">
            Activity {currentActivity + 1} of {lessonData.activities.length}
          </span>
          
          <button 
            onClick={() => setCurrentActivity(Math.min(lessonData.activities.length - 1, currentActivity + 1))}
            disabled={currentActivity === lessonData.activities.length - 1}
            className="nav-btn"
          >
            Next →
          </button>
        </div>

        <div className="activity-content">
          {renderActivityContent(lessonData.activities[currentActivity], currentActivity)}
        </div>

        <div className="activity-actions">
          <button
            onClick={() => markActivityComplete(currentActivity)}
            disabled={completedActivities.has(currentActivity)}
            className={`complete-btn ${completedActivities.has(currentActivity) ? 'completed' : ''}`}
          >
            {completedActivities.has(currentActivity) ? (
              <>
                <CheckCircle size={20} />
                Activity Completed
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Mark Complete
              </>
            )}
          </button>

          {currentActivity < lessonData.activities.length - 1 && (
            <button
              onClick={() => setCurrentActivity(currentActivity + 1)}
              className="next-activity-btn"
            >
              Continue to Next Activity
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Resources Section */}
      <div className="resources-section">
        <h3>📚 Learning Resources</h3>
        <div className="resources-grid">
          {lessonData.resources.map((resource, index) => (
            <div key={index} className="resource-card">
              <BookOpen size={20} />
              <span>{resource}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Summary */}
      {completedActivities.size === lessonData.activities.length && (
        <div className="completion-section">
          <div className="completion-celebration">
            <h2>🎉 Lesson Complete!</h2>
            <p>You've successfully completed all activities in this culturally-authentic lesson.</p>
            <div className="next-steps">
              <h4>Next Steps:</h4>
              <ul>
                <li>Review your responses and reflections</li>
                <li>Share your campaign with the community</li>
                <li>Continue your journey as a kaitiaki</li>
              </ul>
            </div>
            <button className="celebration-btn">
              <Users size={20} />
              Share Your Learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveLessonContent;