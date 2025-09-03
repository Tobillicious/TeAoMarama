import React, { useEffect, useState } from 'react';
import './AssessmentSystem.css';

interface AssessmentQuestion {
  id: string;
  type:
    | 'multiple-choice'
    | 'short-answer'
    | 'essay'
    | 'matching'
    | 'true-false'
    | 'cultural-reflection';
  question: string;
  points: number;
  options?: string[];
  correctAnswer?: string | string[];
  culturalContext?: string;
  assessmentCriteria?: {
    excellent: string;
    good: string;
    satisfactory: string;
    needsImprovement: string;
  };
}

interface Assessment {
  id: string;
  title: string;
  lessonId: string;
  subject: string;
  yearLevel: string;
  totalPoints: number;
  timeLimit: number; // in minutes
  culturalSafety: {
    protocols: string[];
    considerations: string[];
  };
  questions: AssessmentQuestion[];
}

interface AssessmentSystemProps {
  lessonId?: string;
  assessmentId?: string;
}

interface AssessmentResults {
  totalScore: number;
  maxScore: number;
  percentage: number;
  questions: {
    questionId: string;
    score: number;
    maxPoints: number;
    answer: string | string[];
    feedback: string;
  }[];
  culturalSafetyChecked: boolean;
}

const AssessmentSystem: React.FC<AssessmentSystemProps> = ({ lessonId, assessmentId }) => {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessment();
  }, [lessonId, assessmentId]);

  useEffect(() => {
    if (assessment && assessment.timeLimit && timeRemaining === null) {
      setTimeRemaining(assessment.timeLimit * 60);
    }
  }, [assessment, timeRemaining]);

  useEffect(() => {
    if (assessment && assessment.timeLimit && timeRemaining !== null && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev! - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      // Auto-submit when time runs out
      setIsSubmitted(true);
    }
  }, [timeRemaining, assessment]);

  const loadAssessment = async () => {
    setLoading(true);

    // Sample assessment data
    const sampleAssessment: Assessment = {
      id: 'assessment-y7-treaty',
      title: 'Treaty of Waitangi Understanding Assessment',
      lessonId: 'y7-treaty-waitangi',
      subject: 'Social Studies',
      yearLevel: 'Year 7',
      totalPoints: 50,
      timeLimit: 45,
      culturalSafety: {
        protocols: [
          'Approach with cultural humility and respect',
          'Acknowledge multiple perspectives',
          'Recognize ongoing impacts of historical events',
        ],
        considerations: [
          'This assessment includes culturally sensitive content',
          'Students should feel safe to express their understanding respectfully',
          "Consider students' own cultural backgrounds in responses",
        ],
      },
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'When was the Treaty of Waitangi signed?',
          points: 5,
          options: ['February 5, 1840', 'February 6, 1840', 'February 7, 1840', 'February 8, 1840'],
          correctAnswer: 'February 6, 1840',
        },
        {
          id: 'q2',
          type: 'cultural-reflection',
          question:
            'Explain why the Treaty of Waitangi remains significant to New Zealand today. Consider both Māori and non-Māori perspectives.',
          points: 15,
          culturalContext:
            'This question requires understanding of ongoing Treaty relationships and cultural sensitivity.',
          assessmentCriteria: {
            excellent:
              'Demonstrates deep understanding of Treaty partnership, acknowledges Māori tino rangatiratanga, shows cultural awareness',
            good: 'Shows good understanding of Treaty significance, mentions multiple perspectives with some cultural awareness',
            satisfactory:
              'Basic understanding of Treaty importance with limited perspective analysis',
            needsImprovement:
              'Minimal understanding, lacks cultural sensitivity or multiple perspectives',
          },
        },
        {
          id: 'q3',
          type: 'short-answer',
          question:
            'List three key differences between the English and Te Reo Māori versions of the Treaty.',
          points: 10,
          correctAnswer: [
            'Translation of sovereignty vs tino rangatiratanga',
            'Concept of ownership vs guardianship',
            'Rights and privileges interpretation differences',
          ],
        },
        {
          id: 'q4',
          type: 'essay',
          question:
            'Analyze how the Treaty of Waitangi has influenced modern New Zealand society. Provide specific examples.',
          points: 20,
          assessmentCriteria: {
            excellent:
              'Comprehensive analysis with specific examples, demonstrates understanding of Treaty principles in modern context',
            good: 'Good analysis with some examples, shows understanding of modern Treaty applications',
            satisfactory: 'Basic analysis with limited examples',
            needsImprovement: 'Minimal analysis, lacks specific examples or understanding',
          },
        },
      ],
    };

    setAssessment(sampleAssessment);
    setLoading(false);
  };

  const startAssessment = () => {
    // setIsStarted(true); // This state is no longer used
  };

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleQuestionNavigation = (questionIndex: number) => {
    if (assessment && assessment.questions.length > 0) {
      setCurrentQuestion(questionIndex);
    }
  };

  const submitAssessment = async () => {
    setIsSubmitted(true);

    // Calculate results
    let totalScore = 0;
    const questionResults: AssessmentResults['questions'] = assessment!.questions.map(
      (question) => {
        const response = answers[question.id];
        let score = 0;

        if (response) {
          if (question.type === 'multiple-choice' || question.type === 'true-false') {
            score = response === question.correctAnswer ? question.points : 0;
          } else {
            // For open-ended questions, would need teacher review
            score = question.points * 0.8; // Placeholder
          }
        }

        totalScore += score;

        return {
          questionId: question.id,
          score,
          maxPoints: question.points,
          answer: response || '',
          feedback: generateFeedback(question, response),
        };
      },
    );

    setResults({
      totalScore,
      maxScore: assessment!.totalPoints,
      percentage: Math.round((totalScore / assessment!.totalPoints) * 100),
      questions: questionResults,
      culturalSafetyChecked: true,
    });
  };

  const generateFeedback = (question: AssessmentQuestion, answer: string | string[]): string => {
    if (question.type === 'cultural-reflection' || question.type === 'essay') {
      return 'This response will be reviewed by your teacher with cultural advisors to ensure appropriate feedback.';
    }

    if (question.type === 'multiple-choice') {
      return answer === question.correctAnswer
        ? 'Correct! Well done.'
        : `Incorrect. The correct answer is: ${question.correctAnswer}`;
    }

    return 'Response recorded for teacher review.';
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="assessment-loading">
        <div className="loading-spinner">📝</div>
        <h2>Loading Assessment</h2>
        <p>Preparing your culturally responsive assessment...</p>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="assessment-error">
        <h2>❌ Assessment Not Found</h2>
        <p>This assessment is not available or may be in development.</p>
      </div>
    );
  }

  if (!assessment.timeLimit) {
    return (
      <div className="assessment-error">
        <h2>❌ Assessment Time Limit Not Set</h2>
        <p>This assessment does not have a time limit set.</p>
      </div>
    );
  }

  if (!assessment.questions || assessment.questions.length === 0) {
    return (
      <div className="assessment-error">
        <h2>❌ No Questions Found</h2>
        <p>This assessment does not contain any questions.</p>
      </div>
    );
  }

  if (!isSubmitted && timeRemaining === null) {
    return (
      <div className="assessment-intro">
        <div className="assessment-header">
          <h1>{assessment.title}</h1>
          <div className="assessment-meta">
            <span className="subject-badge">{assessment.subject}</span>
            <span className="year-badge">{assessment.yearLevel}</span>
            <span className="points-badge">{assessment.totalPoints} points</span>
            <span className="time-badge">{assessment.timeLimit} minutes</span>
          </div>
        </div>

        <div className="cultural-safety-notice">
          <div className="notice-icon">🌿</div>
          <div className="notice-content">
            <h3>Cultural Safety Protocols</h3>
            <ul>
              {assessment.culturalSafety.protocols.map((protocol, index) => (
                <li key={index}>{protocol}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="assessment-instructions">
          <h3>📋 Instructions</h3>
          <ul>
            <li>Read each question carefully</li>
            <li>Consider cultural perspectives in your responses</li>
            <li>You have {assessment.timeLimit} minutes to complete</li>
            <li>Some questions require cultural sensitivity in responses</li>
            <li>Click "Submit" when finished or time runs out</li>
          </ul>
        </div>

        <div className="start-actions">
          <button className="start-btn" onClick={startAssessment}>
            🚀 Start Assessment
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted && results) {
    return (
      <div className="assessment-results">
        <div className="results-header">
          <h1>📊 Assessment Results</h1>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-percentage">{results.percentage}%</span>
              <span className="score-fraction">
                {results.totalScore}/{results.maxScore}
              </span>
            </div>
          </div>
        </div>

        <div className="results-breakdown">
          <h3>Question Breakdown</h3>
          {results.questions.map((result, index) => (
            <div key={result.questionId} className="question-result">
              <div className="question-header">
                <span className="question-number">Q{index + 1}</span>
                <span className="question-score">
                  {result.score}/{result.maxPoints} points
                </span>
              </div>
              <p className="question-feedback">{result.feedback}</p>
            </div>
          ))}
        </div>

        <div className="cultural-feedback">
          <div className="feedback-icon">🌿</div>
          <div className="feedback-content">
            <h3>Cultural Learning Reflection</h3>
            <p>
              Your responses demonstrate engagement with cultural content. Remember that
              understanding Te Ao Māori perspectives is an ongoing journey of learning and respect.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = assessment.questions[currentQuestion];

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <div className="progress-section">
          <div className="question-progress">
            Question {currentQuestion + 1} of {assessment.questions.length}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / assessment.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="time-remaining">⏰ {formatTime(timeRemaining!)}</div>
      </div>

      <div className="question-container">
        <div className="question-header">
          <h2>{currentQ.question}</h2>
          <div className="question-meta">
            <span className="points-badge">{currentQ.points} points</span>
            {currentQ.culturalContext && (
              <span className="cultural-badge">🌿 Cultural Sensitivity Required</span>
            )}
          </div>
        </div>

        {currentQ.culturalContext && (
          <div className="cultural-context">
            <div className="context-icon">🌿</div>
            <p>{currentQ.culturalContext}</p>
          </div>
        )}

        <div className="question-input">
          {currentQ.type === 'multiple-choice' && (
            <div className="multiple-choice">
              {currentQ.options?.map((option, index) => (
                <label key={index} className="choice-option">
                  <input
                    type="radio"
                    name={`question-${currentQ.id}`}
                    value={option}
                    onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                  />
                  <span className="choice-text">{option}</span>
                </label>
              ))}
            </div>
          )}

          {(currentQ.type === 'short-answer' || currentQ.type === 'cultural-reflection') && (
            <textarea
              className="text-response"
              placeholder="Enter your response here..."
              rows={currentQ.type === 'cultural-reflection' ? 6 : 3}
              onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
            />
          )}

          {currentQ.type === 'essay' && (
            <textarea
              className="essay-response"
              placeholder="Provide a detailed response with examples and analysis..."
              rows={10}
              onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
            />
          )}
        </div>

        {currentQ.assessmentCriteria && (
          <div className="assessment-criteria">
            <h4>Assessment Criteria</h4>
            <div className="criteria-grid">
              <div className="criteria-level excellent">
                <strong>Excellent:</strong> {currentQ.assessmentCriteria.excellent}
              </div>
              <div className="criteria-level good">
                <strong>Good:</strong> {currentQ.assessmentCriteria.good}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="navigation-controls">
        <button
          className="nav-btn prev"
          disabled={currentQuestion === 0}
          onClick={() => handleQuestionNavigation(currentQuestion - 1)}
        >
          ← Previous
        </button>

        {currentQuestion < assessment.questions.length - 1 ? (
          <button
            className="nav-btn next"
            onClick={() => handleQuestionNavigation(currentQuestion + 1)}
          >
            Next →
          </button>
        ) : (
          <button className="submit-btn" onClick={submitAssessment}>
            📝 Submit Assessment
          </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentSystem;
