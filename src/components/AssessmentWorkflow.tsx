import React, { useEffect, useState } from 'react';
import { useEducation } from '../contexts/EducationContext';

interface AssessmentQuestion {
  id: string;
  type:
    | 'multiple_choice'
    | 'short_answer'
    | 'essay'
    | 'true_false'
    | 'matching'
    | 'cultural_reflection';
  question: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  culturalContext?: string;
  points: number;
  timeLimit?: number; // in seconds
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  subject: string;
  yearLevel: string;
  questions: AssessmentQuestion[];
  totalPoints: number;
  timeLimit: number; // in minutes
  culturalThemes: string[];
  assessmentType: 'formative' | 'summative' | 'diagnostic' | 'cultural_competency';
  createdAt: string;
  status: 'draft' | 'active' | 'completed';
}

interface StudentResponse {
  questionId: string;
  answer: string;
  timeSpent: number;
  confidence?: number;
  culturalReflection?: string;
}

const AssessmentWorkflow: React.FC = () => {
  const { students, classes, resources } = useEducation();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentResponses, setStudentResponses] = useState<StudentResponse[]>([]);
  const [selectedStudent, setSelectedStudent] = useState(students[0] || null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [assessmentMode, setAssessmentMode] = useState<'create' | 'take' | 'review'>('create');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample assessments with cultural integration
  useEffect(() => {
    const sampleAssessments: Assessment[] = [
      {
        id: 'assessment-1',
        title: 'Te Ao Māori Social Studies Assessment',
        description: 'Understanding Māori perspectives in New Zealand history',
        subject: 'Social Studies',
        yearLevel: 'Year 8',
        totalPoints: 100,
        timeLimit: 45,
        culturalThemes: ['Te Tiriti o Waitangi', 'Kaitiakitanga', 'Whanaungatanga'],
        assessmentType: 'cultural_competency',
        status: 'active',
        createdAt: '2024-01-15',
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'What does "Kaitiakitanga" mean in Te Ao Māori?',
            options: [
              'Guardianship and protection of the environment',
              'Traditional Māori warfare',
              'Māori language learning',
              'Ancient Māori navigation',
            ],
            correctAnswer: 'Guardianship and protection of the environment',
            explanation:
              'Kaitiakitanga is a fundamental concept in Te Ao Māori meaning guardianship and protection of the environment for future generations.',
            culturalContext:
              'This concept is central to Māori environmental philosophy and is increasingly recognized in New Zealand law.',
            points: 20,
          },
          {
            id: 'q2',
            type: 'cultural_reflection',
            question:
              'Reflect on how the concept of Kaitiakitanga could be applied in your local community. What actions could you take?',
            points: 30,
            timeLimit: 300,
          },
          {
            id: 'q3',
            type: 'true_false',
            question: 'The Treaty of Waitangi was signed in 1840.',
            correctAnswer: 'true',
            explanation: 'The Treaty of Waitangi was indeed signed on 6 February 1840.',
            culturalContext:
              "This date is now celebrated as Waitangi Day, New Zealand's national day.",
            points: 15,
          },
          {
            id: 'q4',
            type: 'essay',
            question:
              'Explain the significance of Whanaungatanga (relationships and connections) in Māori culture and how it influences community life.',
            points: 35,
            timeLimit: 600,
            culturalContext:
              'Whanaungatanga emphasizes the importance of relationships, family connections, and community bonds in Māori society.',
          },
        ],
      },
    ];
    setAssessments(sampleAssessments);
  }, []);

  // Timer effect for assessments
  useEffect(() => {
    if (currentAssessment && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentAssessment, timeRemaining]);

  const startAssessment = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setTimeRemaining(assessment.timeLimit * 60);
    setCurrentQuestionIndex(0);
    setStudentResponses([]);
    setAssessmentMode('take');
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setStudentResponses((prev) => {
      const existing = prev.find((r) => r.questionId === questionId);
      if (existing) {
        return prev.map((r) => (r.questionId === questionId ? { ...r, answer } : r));
      }
      return [...prev, { questionId, answer, timeSpent: 0 }];
    });
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);

    // Simulate grading process with cultural competency evaluation
    const gradedResponses = studentResponses.map((response) => {
      const question = currentAssessment?.questions.find((q) => q.id === response.questionId);
      let score = 0;

      if (question?.type === 'multiple_choice' || question?.type === 'true_false') {
        score = response.answer === question.correctAnswer ? question.points : 0;
      } else {
        // For essay and cultural reflection questions, give partial credit
        score = Math.floor(question?.points || 0 * 0.8); // Simplified scoring
      }

      return {
        ...response,
        score,
        feedback: generateCulturalFeedback(question, response.answer),
      };
    });

    // Update student's grades in the context
    const totalScore = gradedResponses.reduce((sum, r) => sum + r.score, 0);

    console.log('Assessment completed:', {
      student: selectedStudent?.name,
      assessment: currentAssessment?.title,
      score: totalScore,
      responses: gradedResponses,
    });

    setIsSubmitting(false);
    setAssessmentMode('review');
  };

  const generateCulturalFeedback = (
    question: AssessmentQuestion | undefined,
    answer: string,
  ): string => {
    if (!question) return 'No feedback available.';

    if (question.culturalContext) {
      return `Tino pai! Your response shows understanding of ${question.culturalContext}. Consider exploring how this connects to your own cultural background.`;
    }

    return 'Well done! Keep exploring the connections between different cultural perspectives.';
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!selectedStudent) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ color: '#1e40af' }}>👋 Welcome to Assessment Center</h2>
          <p style={{ color: '#6b7280' }}>Please select a student to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <div>
              <h1 style={{ color: '#1e40af', fontSize: '2.5rem', margin: '0 0 10px 0' }}>
                📝 Assessment Center
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>
                Interactive learning assessments with cultural integration
              </p>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <select
                value={selectedStudent.id}
                onChange={(e) =>
                  setSelectedStudent(students.find((s) => s.id === e.target.value) || students[0])
                }
                style={{
                  padding: '10px 15px',
                  borderRadius: '10px',
                  border: '2px solid #e5e7eb',
                  fontSize: '1rem',
                  background: 'white',
                }}
              >
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
              <div
                style={{
                  background: '#f3f4f6',
                  padding: '10px 15px',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  color: '#374151',
                }}
              >
                Kia ora, {selectedStudent.name.split(' ')[0]}! 👋
              </div>
            </div>
          </div>

          {/* Mode Selector */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {(['create', 'take', 'review'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setAssessmentMode(mode)}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  background: assessmentMode === mode ? '#1e40af' : '#f3f4f6',
                  color: assessmentMode === mode ? 'white' : '#374151',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {mode === 'create'
                  ? '📝 Create Assessment'
                  : mode === 'take'
                  ? '🎯 Take Assessment'
                  : '📊 Review Results'}
              </button>
            ))}
          </div>

          {/* Timer Display */}
          {currentAssessment && timeRemaining > 0 && (
            <div
              style={{
                background: timeRemaining < 300 ? '#fef2f2' : '#f0f9ff',
                border: `2px solid ${timeRemaining < 300 ? '#dc2626' : '#0ea5e9'}`,
                borderRadius: '10px',
                padding: '15px',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              <h3
                style={{
                  color: timeRemaining < 300 ? '#dc2626' : '#0ea5e9',
                  margin: '0 0 5px 0',
                  fontSize: '1.5rem',
                }}
              >
                ⏰ Time Remaining: {formatTime(timeRemaining)}
              </h3>
              <p style={{ color: '#6b7280', margin: 0 }}>{currentAssessment.title}</p>
            </div>
          )}
        </div>

        {/* Assessment Content */}
        {assessmentMode === 'create' && (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ color: '#1e40af', marginBottom: '20px' }}>📝 Create New Assessment</h2>
            <p style={{ color: '#6b7280', marginBottom: '30px' }}>
              Design culturally-integrated assessments that honor Te Ao Māori perspectives while
              meeting curriculum requirements.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
              }}
            >
              <div
                style={{
                  background: '#f8fafc',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '2px solid #e2e8f0',
                }}
              >
                <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>🎯 Assessment Types</h3>
                <ul style={{ color: '#374151', lineHeight: '1.6' }}>
                  <li>
                    <strong>Formative:</strong> Ongoing learning checks
                  </li>
                  <li>
                    <strong>Summative:</strong> End-of-unit evaluations
                  </li>
                  <li>
                    <strong>Cultural Competency:</strong> Te Ao Māori integration
                  </li>
                  <li>
                    <strong>Diagnostic:</strong> Learning needs assessment
                  </li>
                </ul>
              </div>

              <div
                style={{
                  background: '#f0f9ff',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '2px solid #0ea5e9',
                }}
              >
                <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>🌿 Cultural Integration</h3>
                <ul style={{ color: '#374151', lineHeight: '1.6' }}>
                  <li>Te Tiriti o Waitangi principles</li>
                  <li>Māori perspectives and values</li>
                  <li>Cultural reflection questions</li>
                  <li>Whanaungatanga connections</li>
                </ul>
              </div>
            </div>

            <button
              style={{
                background: '#1e40af',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '20px',
              }}
            >
              🚀 Start Creating Assessment
            </button>
          </div>
        )}

        {assessmentMode === 'take' && !currentAssessment && (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ color: '#1e40af', marginBottom: '20px' }}>🎯 Available Assessments</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  style={{
                    background: '#f8fafc',
                    borderRadius: '15px',
                    padding: '25px',
                    border: '2px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#1e40af';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onClick={() => startAssessment(assessment)}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px',
                    }}
                  >
                    <div>
                      <h3 style={{ color: '#1e40af', fontSize: '1.3rem', margin: '0 0 10px 0' }}>
                        {assessment.title}
                      </h3>
                      <p style={{ color: '#6b7280', margin: '0 0 15px 0' }}>
                        {assessment.description}
                      </p>
                    </div>
                    <div
                      style={{
                        background: '#1e40af',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {assessment.assessmentType.toUpperCase()}
                    </div>
                  </div>

                  <div
                    style={{ display: 'flex', gap: '20px', marginBottom: '15px', flexWrap: 'wrap' }}
                  >
                    <span style={{ color: '#374151' }}>📚 {assessment.subject}</span>
                    <span style={{ color: '#374151' }}>🎓 {assessment.yearLevel}</span>
                    <span style={{ color: '#374151' }}>⭐ {assessment.totalPoints} points</span>
                    <span style={{ color: '#374151' }}>⏱️ {assessment.timeLimit} minutes</span>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>🌿 Cultural Themes:</h4>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {assessment.culturalThemes.map((theme) => (
                        <span
                          key={theme}
                          style={{
                            background: '#ecfdf5',
                            color: '#047857',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                          }}
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    🚀 Start Assessment
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {assessmentMode === 'take' && currentAssessment && (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#1e40af', marginBottom: '10px' }}>
                Question {currentQuestionIndex + 1} of {currentAssessment.questions.length}
              </h2>
              <div
                style={{
                  background: '#f3f4f6',
                  height: '8px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    background: '#1e40af',
                    height: '100%',
                    width: `${
                      ((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100
                    }%`,
                    transition: 'width 0.3s ease',
                  }}
                ></div>
              </div>
            </div>

            {currentAssessment.questions[currentQuestionIndex] && (
              <div>
                {(() => {
                  const question = currentAssessment.questions[currentQuestionIndex];
                  const currentResponse = studentResponses.find(
                    (r) => r.questionId === question.id,
                  );

                  return (
                    <div>
                      <div
                        style={{
                          background: '#f8fafc',
                          borderRadius: '15px',
                          padding: '25px',
                          marginBottom: '20px',
                          border: '2px solid #e2e8f0',
                        }}
                      >
                        <h3 style={{ color: '#1e40af', fontSize: '1.2rem', marginBottom: '15px' }}>
                          {question.question}
                        </h3>

                        {question.culturalContext && (
                          <div
                            style={{
                              background: '#ecfdf5',
                              borderRadius: '10px',
                              padding: '15px',
                              marginBottom: '20px',
                              border: '2px solid #10b981',
                            }}
                          >
                            <h4 style={{ color: '#047857', margin: '0 0 10px 0' }}>
                              🌿 Cultural Context:
                            </h4>
                            <p style={{ color: '#065f46', margin: 0 }}>
                              {question.culturalContext}
                            </p>
                          </div>
                        )}

                        {question.type === 'multiple_choice' && question.options && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {question.options.map((option, index) => (
                              <label
                                key={index}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '12px',
                                  borderRadius: '8px',
                                  border: '2px solid #e5e7eb',
                                  cursor: 'pointer',
                                  background:
                                    currentResponse?.answer === option ? '#f0f9ff' : 'white',
                                }}
                              >
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  value={option}
                                  checked={currentResponse?.answer === option}
                                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                  style={{ marginRight: '10px' }}
                                />
                                {option}
                              </label>
                            ))}
                          </div>
                        )}

                        {question.type === 'essay' && (
                          <textarea
                            value={currentResponse?.answer || ''}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            placeholder="Write your response here..."
                            style={{
                              width: '100%',
                              minHeight: '200px',
                              padding: '15px',
                              borderRadius: '10px',
                              border: '2px solid #e5e7eb',
                              fontSize: '1rem',
                              fontFamily: 'inherit',
                              resize: 'vertical',
                            }}
                          />
                        )}

                        {question.type === 'cultural_reflection' && (
                          <div>
                            <textarea
                              value={currentResponse?.answer || ''}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              placeholder="Share your thoughts and reflections on how this connects to your own experiences and cultural background..."
                              style={{
                                width: '100%',
                                minHeight: '250px',
                                padding: '15px',
                                borderRadius: '10px',
                                border: '2px solid #e5e7eb',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                              }}
                            />
                            <p
                              style={{
                                color: '#6b7280',
                                fontSize: '0.9rem',
                                marginTop: '10px',
                                fontStyle: 'italic',
                              }}
                            >
                              Take time to reflect on your personal connection to this topic and how
                              it relates to your own cultural background.
                            </p>
                          </div>
                        )}

                        <div
                          style={{
                            marginTop: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                            ⭐ {question.points} points
                            {question.timeLimit && ` • ⏱️ ${question.timeLimit} seconds`}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}
                      >
                        <button
                          onClick={() =>
                            setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
                          }
                          disabled={currentQuestionIndex === 0}
                          style={{
                            background: currentQuestionIndex === 0 ? '#f3f4f6' : '#6b7280',
                            color: currentQuestionIndex === 0 ? '#9ca3af' : 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                          }}
                        >
                          ← Previous
                        </button>

                        {currentQuestionIndex === currentAssessment.questions.length - 1 ? (
                          <button
                            onClick={handleSubmitAssessment}
                            disabled={isSubmitting}
                            style={{
                              background: isSubmitting ? '#9ca3af' : '#10b981',
                              color: 'white',
                              border: 'none',
                              padding: '12px 24px',
                              borderRadius: '8px',
                              fontSize: '1rem',
                              fontWeight: 'bold',
                              cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            }}
                          >
                            {isSubmitting ? '⏳ Submitting...' : '✅ Submit Assessment'}
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              setCurrentQuestionIndex(
                                Math.min(
                                  currentAssessment.questions.length - 1,
                                  currentQuestionIndex + 1,
                                ),
                              )
                            }
                            style={{
                              background: '#1e40af',
                              color: 'white',
                              border: 'none',
                              padding: '12px 24px',
                              borderRadius: '8px',
                              fontSize: '1rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                            }}
                          >
                            Next →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {assessmentMode === 'review' && (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ color: '#1e40af', marginBottom: '20px' }}>📊 Assessment Results</h2>
            <div
              style={{
                background: '#f0f9ff',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '20px',
                border: '2px solid #0ea5e9',
              }}
            >
              <h3 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>
                Tino pai, {selectedStudent.name}! 🌟
              </h3>
              <p style={{ color: '#374151', margin: 0 }}>
                You've completed the assessment. Your responses show thoughtful engagement with the
                cultural content.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentAssessment(null);
                setAssessmentMode('take');
                setStudentResponses([]);
              }}
              style={{
                background: '#1e40af',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              🎯 Take Another Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentWorkflow;
