import React, { useState } from 'react';

interface AssessmentQuestion {
  id: string;
  question: string;
  questionTe: string; // Te Reo Māori translation
  options: Array<{
    text: string;
    textTe: string;
    correct: boolean;
    explanation: string;
    culturalContext?: string;
  }>;
  difficulty: 'easy' | 'medium' | 'hard';
  culturalRelevance: 'low' | 'medium' | 'high';
}

interface EnhancedAssessmentProps {
  questions: AssessmentQuestion[];
  onComplete: (results: AssessmentResults) => void;
  culturalMode?: boolean;
  accessibilityMode?: boolean;
}

interface AssessmentResults {
  score: number;
  totalQuestions: number;
  culturalEngagement: number;
  recommendations: string[];
  culturalInsights: string[];
}

export function EnhancedAssessment({
  questions,
  onComplete,
  culturalMode = false,
}: EnhancedAssessmentProps) {
  const [currentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [culturalInsights, setCulturalInsights] = useState<string[]>([]);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));

    // Show immediate cultural context if relevant
    const question = questions.find((q) => q.id === questionId);
    const selectedOption = question?.options[answerIndex];

    if (selectedOption?.culturalContext) {
      setCulturalInsights((prev) => [...prev, selectedOption.culturalContext!]);
    }

    setShowFeedback(true);
  };

  const calculateResults = (): AssessmentResults => {
    let correct = 0;
    let culturalEngagement = 0;
    const recommendations: string[] = [];

    questions.forEach((question) => {
      const selectedIndex = selectedAnswers[question.id];
      if (selectedIndex !== undefined) {
        const selectedOption = question.options[selectedIndex];
        if (selectedOption.correct) {
          correct++;
        }

        if (question.culturalRelevance === 'high') {
          culturalEngagement += selectedOption.correct ? 20 : 10;
        }
      }
    });

    // Generate personalized recommendations
    const scorePercentage = (correct / questions.length) * 100;
    if (scorePercentage < 70) {
      recommendations.push('Consider reviewing the fundamental concepts');
      recommendations.push('Take advantage of cultural context explanations');
    }
    if (culturalEngagement < 60) {
      recommendations.push('Explore more cultural connections in your learning');
      recommendations.push('Engage with Te Reo Māori content for deeper understanding');
    }

    return {
      score: correct,
      totalQuestions: questions.length,
      culturalEngagement: Math.min(100, culturalEngagement),
      recommendations,
      culturalInsights: [...new Set(culturalInsights)],
    };
  };

  return (
    <div className="enhanced-assessment" role="main" aria-label="Interactive Assessment">
      <div
        className="assessment-progress"
        role="progressbar"
        aria-valuenow={currentQuestion + 1}
        aria-valuemax={questions.length}
        aria-valuetext={`Question ${currentQuestion + 1} of ${questions.length}`}
      >
        <div className="progress-bar">
          <div
            className="progress-fill progress-fill-dynamic"
            style={
              {
                '--progress-width': `${((currentQuestion + 1) / questions.length) * 100}%`,
              } as React.CSSProperties
            }
          />
        </div>
        <span className="progress-text">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      {currentQuestion < questions.length ? (
        <div className="question-container">
          <h2 className="question-title">
            {culturalMode
              ? questions[currentQuestion].questionTe
              : questions[currentQuestion].question}
          </h2>

          <div className="question-options" role="radiogroup">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswers[questions[currentQuestion].id] === index ? 'selected' : ''
                }`}
                onClick={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                aria-describedby={showFeedback ? `feedback-${index}` : undefined}
              >
                {culturalMode ? option.textTe : option.text}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="feedback-section" role="region" aria-label="Answer Feedback">
              {questions[currentQuestion].options.map(
                (option, index) =>
                  selectedAnswers[questions[currentQuestion].id] === index && (
                    <div
                      key={index}
                      id={`feedback-${index}`}
                      className={`feedback ${option.correct ? 'correct' : 'incorrect'}`}
                    >
                      <p>{option.explanation}</p>
                      {option.culturalContext && (
                        <div className="cultural-context">
                          <h4>🌿 Cultural Context</h4>
                          <p>{option.culturalContext}</p>
                        </div>
                      )}
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="results-container">
          <h2>Assessment Complete!</h2>
          <div className="results-summary">
            {(() => {
              const results = calculateResults();
              onComplete(results);
              return (
                <div>
                  <p>
                    Score: {results.score}/{results.totalQuestions}
                  </p>
                  <p>Cultural Engagement: {results.culturalEngagement}%</p>
                  <div className="recommendations">
                    <h3>Recommendations:</h3>
                    {results.recommendations.map((rec, i) => (
                      <p key={i}>• {rec}</p>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
