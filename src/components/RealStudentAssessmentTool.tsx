import React, { useState, useEffect } from 'react';
import { useEducation } from '../contexts/EducationContext';

interface Assessment {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  type: 'formative' | 'summative' | 'diagnostic' | 'peer';
  questions: Question[];
  totalMarks: number;
  timeLimit: number; // in minutes
  instructions: string;
  culturalElements: string[];
  createdAt: Date;
  author: string;
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'essay' | 'practical';
  question: string;
  options?: string[];
  correctAnswer?: string;
  marks: number;
  culturalContext?: string;
  rubric?: {
    achieved: string;
    merit: string;
    excellence: string;
  };
}

interface StudentResponse {
  studentId: string;
  studentName: string;
  responses: { [questionId: string]: string };
  score: number;
  completedAt: Date;
  feedback?: string;
}

const RealStudentAssessmentTool: React.FC = () => {
  const { students, classes } = useEducation();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [studentResponses, setStudentResponses] = useState<StudentResponse[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newAssessment, setNewAssessment] = useState<Partial<Assessment>>({
    title: '',
    subject: '',
    yearLevel: '',
    type: 'formative',
    questions: [],
    totalMarks: 0,
    timeLimit: 60,
    instructions: '',
    culturalElements: []
  });

  // Sample assessments
  useEffect(() => {
    const sampleAssessments: Assessment[] = [
      {
        id: 'assess-1',
        title: 'Māori History and Culture Assessment',
        subject: 'Social Studies',
        yearLevel: 'Year 7-8',
        type: 'formative',
        totalMarks: 25,
        timeLimit: 45,
        instructions: 'Answer all questions. Consider cultural perspectives in your responses.',
        culturalElements: ['Te Ao Māori', 'Historical perspectives', 'Cultural understanding'],
        author: 'Te Ao Mārama Teacher',
        createdAt: new Date(),
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What does "tangata whenua" mean?',
            options: ['People of the land', 'Foreign people', 'Ancient people', 'Warrior people'],
            correctAnswer: 'People of the land',
            marks: 2,
            culturalContext: 'Understanding of Māori identity and connection to land'
          },
          {
            id: 'q2',
            type: 'short-answer',
            question: 'Explain the significance of the Treaty of Waitangi in New Zealand history.',
            marks: 8,
            culturalContext: 'Historical understanding and cultural perspective',
            rubric: {
              achieved: 'Basic understanding of the Treaty',
              merit: 'Clear explanation with historical context',
              excellence: 'Comprehensive analysis with cultural insights'
            }
          },
          {
            id: 'q3',
            type: 'essay',
            question: 'How has Māori culture influenced modern New Zealand society? Provide specific examples.',
            marks: 15,
            culturalContext: 'Cultural awareness and contemporary understanding',
            rubric: {
              achieved: 'Lists some cultural influences',
              merit: 'Explains influences with examples',
              excellence: 'Analyses impact with critical thinking and cultural sensitivity'
            }
          }
        ]
      },
      {
        id: 'assess-2',
        title: 'Mathematics Problem Solving',
        subject: 'Mathematics',
        yearLevel: 'Year 9-10',
        type: 'summative',
        totalMarks: 30,
        timeLimit: 60,
        instructions: 'Show all working. Use culturally relevant examples where possible.',
        culturalElements: ['Mathematical thinking', 'Problem solving', 'Cultural applications'],
        author: 'Te Ao Mārama Teacher',
        createdAt: new Date(),
        questions: [
          {
            id: 'q4',
            type: 'short-answer',
            question: 'A wharenui (meeting house) has a floor area of 120m². If the length is 15m, what is the width?',
            marks: 5,
            culturalContext: 'Mathematical application to cultural contexts'
          },
          {
            id: 'q5',
            type: 'practical',
            question: 'Design a pattern using traditional Māori geometric shapes. Calculate the area of your design.',
            marks: 25,
            culturalContext: 'Creative application of mathematics with cultural elements'
          }
        ]
      }
    ];
    setAssessments(sampleAssessments);
  }, []);

  const handleCreateAssessment = () => {
    if (!newAssessment.title || !newAssessment.subject || !newAssessment.yearLevel) {
      alert('Please fill in all required fields');
      return;
    }

    const assessment: Assessment = {
      id: `assess-${Date.now()}`,
      title: newAssessment.title!,
      subject: newAssessment.subject!,
      yearLevel: newAssessment.yearLevel!,
      type: newAssessment.type!,
      questions: newAssessment.questions || [],
      totalMarks: newAssessment.totalMarks || 0,
      timeLimit: newAssessment.timeLimit || 60,
      instructions: newAssessment.instructions || '',
      culturalElements: newAssessment.culturalElements || [],
      author: 'Te Ao Mārama Teacher',
      createdAt: new Date()
    };

    setAssessments(prev => [assessment, ...prev]);
    setNewAssessment({
      title: '',
      subject: '',
      yearLevel: '',
      type: 'formative',
      questions: [],
      totalMarks: 0,
      timeLimit: 60,
      instructions: '',
      culturalElements: []
    });
    setIsCreating(false);
  };

  const handleAddQuestion = () => {
    const question: Question = {
      id: `q-${Date.now()}`,
      type: 'short-answer',
      question: '',
      marks: 1,
      culturalContext: ''
    };
    setNewAssessment(prev => ({
      ...prev,
      questions: [...(prev.questions || []), question]
    }));
  };

  const handleQuestionChange = (questionId: string, field: string, value: any) => {
    setNewAssessment(prev => ({
      ...prev,
      questions: prev.questions?.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  const getClassStudents = () => {
    const selectedClassData = classes.find(c => c.id === selectedClass);
    return selectedClassData ? students.filter(s => selectedClassData.studentIds.includes(s.id)) : [];
  };

  const getAssessmentStats = (assessment: Assessment) => {
    const responses = studentResponses.filter(r => 
      assessments.find(a => a.id === assessment.id)
    );
    const avgScore = responses.length > 0 
      ? responses.reduce((sum, r) => sum + r.score, 0) / responses.length 
      : 0;
    return {
      totalResponses: responses.length,
      averageScore: avgScore,
      completionRate: responses.length / getClassStudents().length * 100
    };
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h1 style={{ color: '#1e40af', fontSize: '2.5rem', margin: 0 }}>
              📊 Student Assessment Tool
            </h1>
            <button
              onClick={() => setIsCreating(true)}
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ➕ Create Assessment
            </button>
          </div>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>
            Create, manage, and analyze student assessments with cultural integration
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedAssessment ? '1fr 2fr' : '1fr', gap: '2rem' }}>
          {/* Assessment List */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            height: 'fit-content'
          }}>
            <h2 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
              📋 Assessments
            </h2>
            
            {/* Class Selection */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                Select Class:
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem'
                }}
              >
                <option value="">Select a class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {assessments.map(assessment => {
                const stats = getAssessmentStats(assessment);
                return (
                  <div
                    key={assessment.id}
                    onClick={() => setSelectedAssessment(assessment)}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: selectedAssessment?.id === assessment.id ? '2px solid #1e40af' : '1px solid #e5e7eb',
                      cursor: 'pointer',
                      background: selectedAssessment?.id === assessment.id ? '#eff6ff' : 'white',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontSize: '1.1rem' }}>
                      {assessment.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        background: '#dbeafe',
                        color: '#1e40af',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem'
                      }}>
                        {assessment.subject}
                      </span>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        background: '#dcfce7',
                        color: '#059669',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem'
                      }}>
                        {assessment.yearLevel}
                      </span>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        background: '#fef3c7',
                        color: '#d97706',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem'
                      }}>
                        {assessment.type}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                        {assessment.totalMarks} marks • {assessment.timeLimit} min
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#059669', fontSize: '0.75rem' }}>
                          {stats.totalResponses} responses
                        </span>
                        <span style={{ color: '#1e40af', fontSize: '0.75rem' }}>
                          {Math.round(stats.averageScore)}% avg
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assessment Detail */}
          {selectedAssessment && (
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#1f2937', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
                  {selectedAssessment.title}
                </h2>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: '#dbeafe',
                    color: '#1e40af',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {selectedAssessment.subject}
                  </span>
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: '#dcfce7',
                    color: '#059669',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {selectedAssessment.yearLevel}
                  </span>
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: '#fef3c7',
                    color: '#d97706',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {selectedAssessment.type}
                  </span>
                </div>
                <p style={{ color: '#6b7280', margin: 0 }}>
                  {selectedAssessment.totalMarks} marks • {selectedAssessment.timeLimit} minutes • {selectedAssessment.questions.length} questions
                </p>
              </div>

              {/* Instructions */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                  📋 Instructions
                </h3>
                <p style={{ color: '#4b5563', background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', margin: 0 }}>
                  {selectedAssessment.instructions}
                </p>
              </div>

              {/* Cultural Elements */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                  🌿 Cultural Integration
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedAssessment.culturalElements.map((element, index) => (
                    <span key={index} style={{
                      padding: '0.5rem 1rem',
                      background: '#ecfdf5',
                      color: '#059669',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem',
                      border: '1px solid #a7f3d0'
                    }}>
                      {element}
                    </span>
                  ))}
                </div>
              </div>

              {/* Questions */}
              <div>
                <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                  ❓ Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedAssessment.questions.map((question, index) => (
                    <div key={question.id} style={{
                      padding: '1.5rem',
                      background: '#f9fafb',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, color: '#1f2937' }}>
                          Question {index + 1} ({question.marks} marks)
                        </h4>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          background: '#dbeafe',
                          color: '#1e40af',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem'
                        }}>
                          {question.type}
                        </span>
                      </div>
                      <p style={{ color: '#4b5563', margin: '0 0 1rem 0' }}>{question.question}</p>
                      
                      {question.options && (
                        <div style={{ marginBottom: '1rem' }}>
                          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>Options:</p>
                          <ul style={{ color: '#4b5563', paddingLeft: '1.5rem' }}>
                            {question.options.map((option, optIndex) => (
                              <li key={optIndex}>{option}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {question.culturalContext && (
                        <div style={{
                          padding: '0.75rem',
                          background: '#ecfdf5',
                          borderRadius: '0.5rem',
                          border: '1px solid #a7f3d0',
                          marginBottom: '1rem'
                        }}>
                          <p style={{ color: '#059669', fontSize: '0.875rem', margin: 0 }}>
                            <strong>Cultural Context:</strong> {question.culturalContext}
                          </p>
                        </div>
                      )}

                      {question.rubric && (
                        <div style={{ marginTop: '1rem' }}>
                          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>Marking Rubric:</p>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                            <div style={{ padding: '0.5rem', background: '#fef2f2', borderRadius: '0.25rem', border: '1px solid #fecaca' }}>
                              <p style={{ color: '#dc2626', fontSize: '0.75rem', margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Achieved</p>
                              <p style={{ color: '#7f1d1d', fontSize: '0.75rem', margin: 0 }}>{question.rubric.achieved}</p>
                            </div>
                            <div style={{ padding: '0.5rem', background: '#fef3c7', borderRadius: '0.25rem', border: '1px solid #fed7aa' }}>
                              <p style={{ color: '#d97706', fontSize: '0.75rem', margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Merit</p>
                              <p style={{ color: '#92400e', fontSize: '0.75rem', margin: 0 }}>{question.rubric.merit}</p>
                            </div>
                            <div style={{ padding: '0.5rem', background: '#f0fdf4', borderRadius: '0.25rem', border: '1px solid #bbf7d0' }}>
                              <p style={{ color: '#059669', fontSize: '0.75rem', margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Excellence</p>
                              <p style={{ color: '#14532d', fontSize: '0.75rem', margin: 0 }}>{question.rubric.excellence}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Create Assessment Modal */}
        {isCreating && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <h2 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                Create New Assessment
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                    Assessment Title
                  </label>
                  <input
                    type="text"
                    value={newAssessment.title || ''}
                    onChange={(e) => setNewAssessment(prev => ({ ...prev, title: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem'
                    }}
                    placeholder="Enter assessment title"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                      Subject
                    </label>
                    <select
                      value={newAssessment.subject || ''}
                      onChange={(e) => setNewAssessment(prev => ({ ...prev, subject: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="">Select Subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="English">English</option>
                      <option value="Science">Science</option>
                      <option value="Social Studies">Social Studies</option>
                      <option value="Te Reo Māori">Te Reo Māori</option>
                      <option value="Art">Art</option>
                      <option value="Physical Education">Physical Education</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                      Year Level
                    </label>
                    <select
                      value={newAssessment.yearLevel || ''}
                      onChange={(e) => setNewAssessment(prev => ({ ...prev, yearLevel: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="">Select Year Level</option>
                      <option value="Year 1-3">Year 1-3</option>
                      <option value="Year 4-6">Year 4-6</option>
                      <option value="Year 7-8">Year 7-8</option>
                      <option value="Year 9-10">Year 9-10</option>
                      <option value="Year 11-13">Year 11-13</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                    Instructions
                  </label>
                  <textarea
                    value={newAssessment.instructions || ''}
                    onChange={(e) => setNewAssessment(prev => ({ ...prev, instructions: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem',
                      minHeight: '100px',
                      resize: 'vertical'
                    }}
                    placeholder="Enter assessment instructions..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={handleCreateAssessment}
                    style={{
                      background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  >
                    Create Assessment
                  </button>
                  <button
                    onClick={() => setIsCreating(false)}
                    style={{
                      background: '#6b7280',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealStudentAssessmentTool;
