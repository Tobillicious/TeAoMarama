import { ArrowLeft, BookOpen, CheckCircle, Clock, Globe, Play, Target, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './WorkingLessonViewer.css';

interface Lesson {
  id: string;
  title: string;
  type: string;
  subject: string;
  yearLevel: string;
  culturalContext: string;
  depth: string;
  learningObjectives: string[];
  activities: string[];
  resources: string[];
  assessment: string;
  duration: string;
  nzcAlignment: string[];
  createdAt: string;
}

interface WorkingLessonViewerProps {
  lessonId?: string;
}

const WorkingLessonViewer: React.FC<WorkingLessonViewerProps> = ({ lessonId: propLessonId }) => {
  const { lessonId: paramLessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState<string>('');

  const actualLessonId = propLessonId || paramLessonId;

  useEffect(() => {
    const loadLesson = async () => {
      if (!actualLessonId) {
        setError('No lesson ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Try to load the specific lesson
        const lessonFiles = import.meta.glob('../content/lessons/*.json', { eager: true });
        const lessonPath = Object.keys(lessonFiles).find(
          (path) =>
            path.includes(actualLessonId) || path.includes(actualLessonId.replace('lesson-', '')),
        );

        if (lessonPath) {
          const module = lessonFiles[lessonPath];
          const lessonData = module.default || module;
          setLesson(lessonData);
        } else {
          // Fallback: create a sample lesson for demonstration
          setLesson({
            id: actualLessonId,
            title: 'Sample Lesson: Te Ao Māori Mathematics',
            type: 'lesson',
            subject: 'Mathematics',
            yearLevel: 'Year 8',
            culturalContext: 'Māori mathematical concepts and traditional knowledge',
            depth: 'extending',
            learningObjectives: [
              'Understand Māori mathematical concepts',
              'Apply traditional knowledge to modern problems',
              'Connect cultural values with mathematical thinking',
              'Develop cultural competency through mathematics',
            ],
            activities: [
              'Whakapapa (genealogy) mathematics exploration',
              'Traditional measurement systems study',
              'Environmental mathematics through kaitiakitanga lens',
              'Community mathematics project',
              'Cultural pattern recognition and analysis',
            ],
            resources: [
              'Māori mathematical knowledge databases',
              'Traditional knowledge holder consultations',
              'Environmental monitoring tools',
              'Community engagement platforms',
              'Cultural learning resources',
            ],
            assessment: 'Cultural mathematics portfolio and community presentation',
            duration: '4-6 weeks',
            nzcAlignment: [
              'Te Tiriti o Waitangi applications',
              'Cultural diversity and inclusion',
              'Environmental sustainability',
              'Community participation',
            ],
            createdAt: new Date().toISOString(),
          });
        }
      } catch (err) {
        setError('Failed to load lesson');
        console.error('Error loading lesson:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLesson();
  }, [actualLessonId]);

  const handleActivityComplete = (index: number) => {
    setCompletedActivities((prev) => new Set([...prev, index]));
  };

  const handleStartLesson = () => {
    setCurrentActivityIndex(0);
  };

  const handleNextActivity = () => {
    if (currentActivityIndex < (lesson?.activities.length || 0) - 1) {
      setCurrentActivityIndex((prev) => prev + 1);
    }
  };

  const handlePreviousActivity = () => {
    if (currentActivityIndex > 0) {
      setCurrentActivityIndex((prev) => prev - 1);
    }
  };

  const getProgressPercentage = () => {
    if (!lesson) return 0;
    return Math.round((completedActivities.size / lesson.activities.length) * 100);
  };

  if (isLoading) {
    return (
      <div className="lesson-viewer-loading">
        <div className="loading-spinner"></div>
        <p>Loading your lesson...</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="lesson-viewer-error">
        <h2>Unable to load lesson</h2>
        <p>{error || 'Lesson not found'}</p>
        <button onClick={() => navigate('/educational-platform')} className="back-btn">
          <ArrowLeft size={16} />
          Back to Platform
        </button>
      </div>
    );
  }

  return (
    <div className="working-lesson-viewer">
      {/* Header */}
      <div className="lesson-header">
        <button onClick={() => navigate('/educational-platform')} className="back-btn">
          <ArrowLeft size={16} />
          Back to Platform
        </button>

        <div className="lesson-title-section">
          <h1>{lesson.title}</h1>
          <div className="lesson-meta">
            <span className="meta-item">
              <BookOpen size={16} />
              {lesson.subject}
            </span>
            <span className="meta-item">
              <Users size={16} />
              {lesson.yearLevel}
            </span>
            <span className="meta-item">
              <Clock size={16} />
              {lesson.duration}
            </span>
            <span className="meta-item">
              <Target size={16} />
              {lesson.depth}
            </span>
          </div>
        </div>

        <div className="lesson-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>
          <span className="progress-text">{getProgressPercentage()}% Complete</span>
        </div>
      </div>

      {/* Cultural Context */}
      <div className="cultural-context-section">
        <h2>🌿 Cultural Context</h2>
        <p>{lesson.culturalContext}</p>
        <div className="nzc-alignment">
          <h3>NZ Curriculum Alignment</h3>
          <div className="alignment-tags">
            {lesson.nzcAlignment.map((alignment, index) => (
              <span key={index} className="alignment-tag">
                {alignment}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="learning-objectives-section">
        <h2>🎯 Learning Objectives</h2>
        <div className="objectives-grid">
          {lesson.learningObjectives.map((objective, index) => (
            <div key={index} className="objective-card">
              <CheckCircle size={20} />
              <span>{objective}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Activities */}
      <div className="activities-section">
        <h2>🚀 Learning Activities</h2>

        {currentActivityIndex === 0 ? (
          <div className="lesson-intro">
            <h3>Ready to begin?</h3>
            <p>
              This lesson contains {lesson.activities.length} activities designed to help you
              achieve the learning objectives.
            </p>
            <button onClick={handleStartLesson} className="start-lesson-btn">
              <Play size={16} />
              Start Lesson
            </button>
          </div>
        ) : (
          <div className="current-activity">
            <div className="activity-navigation">
              <button
                onClick={handlePreviousActivity}
                disabled={currentActivityIndex === 0}
                className="nav-btn"
              >
                ← Previous
              </button>

              <span className="activity-counter">
                Activity {currentActivityIndex} of {lesson.activities.length}
              </span>

              <button
                onClick={handleNextActivity}
                disabled={currentActivityIndex === lesson.activities.length - 1}
                className="nav-btn"
              >
                Next →
              </button>
            </div>

            <div className="activity-content">
              <h3>{lesson.activities[currentActivityIndex - 1]}</h3>

              <div className="activity-actions">
                <button
                  onClick={() => handleActivityComplete(currentActivityIndex - 1)}
                  className={`complete-btn ${
                    completedActivities.has(currentActivityIndex - 1) ? 'completed' : ''
                  }`}
                >
                  {completedActivities.has(currentActivityIndex - 1)
                    ? '✓ Completed'
                    : 'Mark Complete'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="activities-overview">
          <h3>All Activities</h3>
          <div className="activities-list">
            {lesson.activities.map((activity, index) => (
              <div
                key={index}
                className={`activity-item ${completedActivities.has(index) ? 'completed' : ''} ${
                  index === currentActivityIndex - 1 ? 'current' : ''
                }`}
                onClick={() => setCurrentActivityIndex(index + 1)}
              >
                <span className="activity-number">{index + 1}</span>
                <span className="activity-title">{activity}</span>
                {completedActivities.has(index) && (
                  <CheckCircle size={16} className="completed-icon" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="resources-section">
        <h2>📚 Resources & Materials</h2>
        <div className="resources-grid">
          {lesson.resources.map((resource, index) => (
            <div key={index} className="resource-card">
              <Globe size={20} />
              <span>{resource}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment */}
      <div className="assessment-section">
        <h2>📊 Assessment</h2>
        <div className="assessment-info">
          <p>{lesson.assessment}</p>
        </div>
      </div>

      {/* Notes */}
      <div className="notes-section">
        <h2>📝 Your Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your notes, reflections, and learning insights here..."
          className="notes-textarea"
        />
        <button
          onClick={() => localStorage.setItem(`lesson-notes-${lesson.id}`, notes)}
          className="save-notes-btn"
        >
          Save Notes
        </button>
      </div>
    </div>
  );
};

export default WorkingLessonViewer;
