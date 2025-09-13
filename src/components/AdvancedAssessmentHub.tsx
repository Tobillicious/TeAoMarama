import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle, Clock, Users, Target, Star, TrendingUp, Award, Brain, Heart } from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  type: 'formative' | 'summative' | 'diagnostic' | 'cultural-reflection';
  subject: string;
  yearLevel: string;
  culturalFocus: boolean;
  timeLimit: number; // minutes
  totalQuestions: number;
  completedBy: number;
  averageScore: number;
  culturalEngagement: number;
  status: 'active' | 'draft' | 'archived';
  createdBy: string;
  createdDate: Date;
  tikangaCompliant: boolean;
}

interface StudentAssessment {
  studentId: string;
  studentName: string;
  assessmentId: string;
  score: number;
  culturalReflectionScore: number;
  timeSpent: number;
  completedDate: Date;
  strengths: string[];
  areasForGrowth: string[];
  culturalConnections: string[];
}

interface AssessmentMetrics {
  totalAssessments: number;
  activeAssessments: number;
  averageCompletionRate: number;
  culturalEngagementAverage: number;
  studentParticipation: number;
  tikangaCompliance: number;
}

const AdvancedAssessmentHub: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [studentResults, setStudentResults] = useState<StudentAssessment[]>([]);
  const [metrics, setMetrics] = useState<AssessmentMetrics | null>(null);
  const [selectedView, setSelectedView] = useState<'overview' | 'create' | 'results' | 'cultural'>('overview');
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);

  useEffect(() => {
    generateAssessmentData();
  }, []);

  const generateAssessmentData = () => {
    const sampleAssessments: Assessment[] = [
      {
        id: 'assess-1',
        title: 'Te Reo Māori Language Proficiency',
        type: 'formative',
        subject: 'Te Reo Māori',
        yearLevel: 'Year 8',
        culturalFocus: true,
        timeLimit: 30,
        totalQuestions: 20,
        completedBy: 24,
        averageScore: 87,
        culturalEngagement: 95,
        status: 'active',
        createdBy: 'Whaea Sarah',
        createdDate: new Date(Date.now() - 86400000 * 2),
        tikangaCompliant: true
      },
      {
        id: 'assess-2',
        title: 'Environmental Science with Māori Perspectives',
        type: 'summative',
        subject: 'Science',
        yearLevel: 'Year 8',
        culturalFocus: true,
        timeLimit: 60,
        totalQuestions: 35,
        completedBy: 21,
        averageScore: 76,
        culturalEngagement: 82,
        status: 'active',
        createdBy: 'Mr. Johnson',
        createdDate: new Date(Date.now() - 86400000 * 5),
        tikangaCompliant: true
      },
      {
        id: 'assess-3',
        title: 'Cultural Identity Reflection',
        type: 'cultural-reflection',
        subject: 'Social Studies',
        yearLevel: 'Year 8',
        culturalFocus: true,
        timeLimit: 45,
        totalQuestions: 15,
        completedBy: 28,
        averageScore: 92,
        culturalEngagement: 98,
        status: 'active',
        createdBy: 'Matua Tane',
        createdDate: new Date(Date.now() - 86400000 * 1),
        tikangaCompliant: true
      },
      {
        id: 'assess-4',
        title: 'Mathematics Problem Solving',
        type: 'diagnostic',
        subject: 'Mathematics',
        yearLevel: 'Year 8',
        culturalFocus: false,
        timeLimit: 40,
        totalQuestions: 25,
        completedBy: 19,
        averageScore: 73,
        culturalEngagement: 45,
        status: 'draft',
        createdBy: 'Ms. Chen',
        createdDate: new Date(Date.now() - 86400000 * 3),
        tikangaCompliant: false
      }
    ];

    const sampleResults: StudentAssessment[] = [
      {
        studentId: 'student-1',
        studentName: 'Aroha Williams',
        assessmentId: 'assess-1',
        score: 95,
        culturalReflectionScore: 100,
        timeSpent: 28,
        completedDate: new Date(Date.now() - 3600000),
        strengths: ['Te Reo pronunciation', 'Cultural understanding', 'Grammar application'],
        areasForGrowth: ['Vocabulary expansion'],
        culturalConnections: ['Family whakapapa', 'Traditional stories', 'Community involvement']
      },
      {
        studentId: 'student-2',
        studentName: 'James Thompson',
        assessmentId: 'assess-2',
        score: 78,
        culturalReflectionScore: 72,
        timeSpent: 55,
        completedDate: new Date(Date.now() - 7200000),
        strengths: ['Scientific method', 'Data analysis'],
        areasForGrowth: ['Cultural integration', 'Environmental connections'],
        culturalConnections: ['Local ecosystem awareness']
      },
      {
        studentId: 'student-3',
        studentName: 'Mere Patel',
        assessmentId: 'assess-3',
        score: 98,
        culturalReflectionScore: 95,
        timeSpent: 42,
        completedDate: new Date(Date.now() - 1800000),
        strengths: ['Cultural identity', 'Reflection skills', 'Community connection'],
        areasForGrowth: ['Historical context'],
        culturalConnections: ['Cultural practices', 'Language heritage', 'Traditional knowledge']
      }
    ];

    const calculatedMetrics: AssessmentMetrics = {
      totalAssessments: sampleAssessments.length,
      activeAssessments: sampleAssessments.filter(a => a.status === 'active').length,
      averageCompletionRate: 87,
      culturalEngagementAverage: Math.round(
        sampleAssessments.reduce((sum, a) => sum + a.culturalEngagement, 0) / sampleAssessments.length
      ),
      studentParticipation: 92,
      tikangaCompliance: Math.round(
        (sampleAssessments.filter(a => a.tikangaCompliant).length / sampleAssessments.length) * 100
      )
    };

    setAssessments(sampleAssessments);
    setStudentResults(sampleResults);
    setMetrics(calculatedMetrics);
    setSelectedAssessment('assess-1');
  };

  const getAssessmentTypeColor = (type: Assessment['type']) => {
    switch (type) {
      case 'formative': return { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' };
      case 'summative': return { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' };
      case 'diagnostic': return { bg: '#f3e8ff', text: '#7c2d12', border: '#a855f7' };
      case 'cultural-reflection': return { bg: '#d1fae5', text: '#065f46', border: '#059669' };
      default: return { bg: '#f3f4f6', text: '#374151', border: '#6b7280' };
    }
  };

  const getStatusIcon = (status: Assessment['status']) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} /* TODO: Move to external CSS */ style={{ color: '#059669' }} />;
      case 'draft': return <Clock size={16} /* TODO: Move to external CSS */ style={{ color: '#f59e0b' }} />;
      case 'archived': return <BookOpen size={16} /* TODO: Move to external CSS */ style={{ color: '#6b7280' }} />;
      default: return null;
    }
  };

  const selectedAssessmentData = assessments.find(a => a.id === selectedAssessment);
  const relatedResults = studentResults.filter(r => r.assessmentId === selectedAssessment);

  return (
    <div /* TODO: Move to external CSS */ style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%)',
      padding: '1.5rem'
    }}>
      <div /* TODO: Move to external CSS */ style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div /* TODO: Move to external CSS */ style={{ 
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h1 /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700', color: '#1a365d', margin: '0 0 0.5rem 0' }}>
                🎯 Advanced Assessment Hub
              </h1>
              <p /* TODO: Move to external CSS */ style={{ color: '#4a5568', margin: 0 }}>
                Culturally responsive assessment and evaluation system
              </p>
            </div>
            
            <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div /* TODO: Move to external CSS */ style={{ 
                background: '#d1fae5',
                color: '#065f46',
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                🌿 Tikanga Compliant
              </div>
              <button
                /* TODO: Move to external CSS */ style={{
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                + Create Assessment
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '1rem' }}>
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'create', label: 'Create', icon: '✏️' },
              { id: 'results', label: 'Results', icon: '📈' },
              { id: 'cultural', label: 'Cultural Insights', icon: '🌿' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id as any)}
                /* TODO: Move to external CSS */ style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: selectedView === tab.id ? '#059669' : '#f7fafc',
                  color: selectedView === tab.id ? 'white' : '#4a5568',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Dashboard */}
        {metrics && (
          <div /* TODO: Move to external CSS */ style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div /* TODO: Move to external CSS */ style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <Target size={32} /* TODO: Move to external CSS */ style={{ marginBottom: '0.5rem' }} />
              <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700' }}>{metrics.activeAssessments}</div>
              <div /* TODO: Move to external CSS */ style={{ opacity: 0.9 }}>Active Assessments</div>
            </div>

            <div /* TODO: Move to external CSS */ style={{ 
              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <TrendingUp size={32} /* TODO: Move to external CSS */ style={{ marginBottom: '0.5rem' }} />
              <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700' }}>{metrics.averageCompletionRate}%</div>
              <div /* TODO: Move to external CSS */ style={{ opacity: 0.9 }}>Completion Rate</div>
            </div>

            <div /* TODO: Move to external CSS */ style={{ 
              background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <Heart size={32} /* TODO: Move to external CSS */ style={{ marginBottom: '0.5rem' }} />
              <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700' }}>{metrics.culturalEngagementAverage}%</div>
              <div /* TODO: Move to external CSS */ style={{ opacity: 0.9 }}>Cultural Engagement</div>
            </div>

            <div /* TODO: Move to external CSS */ style={{ 
              background: 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <Users size={32} /* TODO: Move to external CSS */ style={{ marginBottom: '0.5rem' }} />
              <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700' }}>{metrics.studentParticipation}%</div>
              <div /* TODO: Move to external CSS */ style={{ opacity: 0.9 }}>Student Participation</div>
            </div>
          </div>
        )}

        <div /* TODO: Move to external CSS */ style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
          {/* Main Content */}
          <div /* TODO: Move to external CSS */ style={{ 
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0'
          }}>
            {selectedView === 'overview' && (
              <div>
                <h3 /* TODO: Move to external CSS */ style={{ margin: '0 0 1.5rem 0', color: '#1a365d', fontWeight: '600' }}>
                  Assessment Library
                </h3>
                
                <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {assessments.map(assessment => {
                    const typeStyle = getAssessmentTypeColor(assessment.type);
                    return (
                      <div 
                        key={assessment.id}
                        onClick={() => setSelectedAssessment(assessment.id)}
                        style={{
                          padding: '1.5rem',
                          background: selectedAssessment === assessment.id ? '#f0fdfa' : '#f8fafc',
                          border: `2px solid ${selectedAssessment === assessment.id ? '#059669' : '#e2e8f0'}`,
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div /* TODO: Move to external CSS */ style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                          <div>
                            <h4 /* TODO: Move to external CSS */ style={{ margin: '0 0 0.5rem 0', color: '#2d3748', fontWeight: '600' }}>
                              {assessment.title}
                            </h4>
                            <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                              <span /* TODO: Move to external CSS */ style={{
                                ...typeStyle,
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                background: typeStyle.bg,
                                color: typeStyle.text
                              }}>
                                {assessment.type.replace('-', ' ').toUpperCase()}
                              </span>
                              {assessment.culturalFocus && (
                                <span /* TODO: Move to external CSS */ style={{
                                  background: '#d1fae5',
                                  color: '#065f46',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '12px',
                                  fontSize: '0.75rem',
                                  fontWeight: '600'
                                }}>
                                  🌿 Cultural Focus
                                </span>
                              )}
                            </div>
                            <p /* TODO: Move to external CSS */ style={{ color: '#6b7280', margin: '0', fontSize: '0.9rem' }}>
                              {assessment.subject} • {assessment.yearLevel} • {assessment.timeLimit} minutes
                            </p>
                          </div>
                          
                          <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {getStatusIcon(assessment.status)}
                            <span /* TODO: Move to external CSS */ style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'capitalize' }}>
                              {assessment.status}
                            </span>
                          </div>
                        </div>
                        
                        <div /* TODO: Move to external CSS */ style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                          <div /* TODO: Move to external CSS */ style={{ textAlign: 'center', padding: '0.5rem', background: '#f7fafc', borderRadius: '6px' }}>
                            <div /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#2d3748' }}>{assessment.completedBy}</div>
                            <div /* TODO: Move to external CSS */ style={{ fontSize: '0.75rem', color: '#6b7280' }}>Completed</div>
                          </div>
                          <div /* TODO: Move to external CSS */ style={{ textAlign: 'center', padding: '0.5rem', background: '#f7fafc', borderRadius: '6px' }}>
                            <div /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#2d3748' }}>{assessment.averageScore}%</div>
                            <div /* TODO: Move to external CSS */ style={{ fontSize: '0.75rem', color: '#6b7280' }}>Avg Score</div>
                          </div>
                          <div /* TODO: Move to external CSS */ style={{ textAlign: 'center', padding: '0.5rem', background: '#f7fafc', borderRadius: '6px' }}>
                            <div /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#2d3748' }}>{assessment.culturalEngagement}%</div>
                            <div /* TODO: Move to external CSS */ style={{ fontSize: '0.75rem', color: '#6b7280' }}>Cultural Eng.</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedView === 'create' && (
              <div /* TODO: Move to external CSS */ style={{ textAlign: 'center', padding: '3rem' }}>
                <div /* TODO: Move to external CSS */ style={{ fontSize: '3rem', marginBottom: '1rem' }}>✏️</div>
                <h3 /* TODO: Move to external CSS */ style={{ color: '#1a365d', margin: '0 0 1rem 0' }}>Assessment Creator</h3>
                <p /* TODO: Move to external CSS */ style={{ color: '#4a5568', margin: '0 0 2rem 0' }}>
                  Create culturally responsive assessments with tikanga Māori integration
                </p>
                
                <div /* TODO: Move to external CSS */ style={{
                  background: '#fef3c7',
                  border: '1px solid #f59e0b',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'left'
                }}>
                  <h4 /* TODO: Move to external CSS */ style={{ color: '#92400e', margin: '0 0 1rem 0' }}>
                    Cultural Assessment Guidelines
                  </h4>
                  <ul /* TODO: Move to external CSS */ style={{ color: '#a16207', margin: 0, paddingLeft: '1.5rem' }}>
                    <li>Include Te Ao Māori perspectives</li>
                    <li>Ensure cultural safety and respect</li>
                    <li>Allow for diverse ways of knowing</li>
                    <li>Provide culturally relevant contexts</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedView === 'results' && selectedAssessmentData && (
              <div>
                <h3 /* TODO: Move to external CSS */ style={{ margin: '0 0 1.5rem 0', color: '#1a365d', fontWeight: '600' }}>
                  Results: {selectedAssessmentData.title}
                </h3>
                
                <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {relatedResults.map(result => (
                    <div 
                      key={`${result.studentId}-${result.assessmentId}`}
                      /* TODO: Move to external CSS */ style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px'
                      }}
                    >
                      <div /* TODO: Move to external CSS */ style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 /* TODO: Move to external CSS */ style={{ margin: 0, color: '#2d3748', fontWeight: '600' }}>
                          {result.studentName}
                        </h4>
                        <div /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '1rem' }}>
                          <div /* TODO: Move to external CSS */ style={{ textAlign: 'center' }}>
                            <div /* TODO: Move to external CSS */ style={{ fontSize: '1.2rem', fontWeight: '700', color: '#059669' }}>
                              {result.score}%
                            </div>
                            <div /* TODO: Move to external CSS */ style={{ fontSize: '0.75rem', color: '#6b7280' }}>Score</div>
                          </div>
                          <div /* TODO: Move to external CSS */ style={{ textAlign: 'center' }}>
                            <div /* TODO: Move to external CSS */ style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ea580c' }}>
                              {result.culturalReflectionScore}%
                            </div>
                            <div /* TODO: Move to external CSS */ style={{ fontSize: '0.75rem', color: '#6b7280' }}>Cultural</div>
                          </div>
                        </div>
                      </div>
                      
                      <div /* TODO: Move to external CSS */ style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <div>
                          <h5 /* TODO: Move to external CSS */ style={{ margin: '0 0 0.5rem 0', color: '#059669', fontSize: '0.9rem', fontWeight: '600' }}>
                            ✅ Strengths
                          </h5>
                          <ul /* TODO: Move to external CSS */ style={{ margin: 0, paddingLeft: '1rem', color: '#4a5568', fontSize: '0.85rem' }}>
                            {result.strengths.map((strength, index) => (
                              <li key={index}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 /* TODO: Move to external CSS */ style={{ margin: '0 0 0.5rem 0', color: '#ea580c', fontSize: '0.9rem', fontWeight: '600' }}>
                            🎯 Areas for Growth
                          </h5>
                          <ul /* TODO: Move to external CSS */ style={{ margin: 0, paddingLeft: '1rem', color: '#4a5568', fontSize: '0.85rem' }}>
                            {result.areasForGrowth.map((area, index) => (
                              <li key={index}>{area}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedView === 'cultural' && (
              <div>
                <h3 /* TODO: Move to external CSS */ style={{ margin: '0 0 1.5rem 0', color: '#1a365d', fontWeight: '600' }}>
                  🌿 Cultural Intelligence Insights
                </h3>
                
                <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div /* TODO: Move to external CSS */ style={{
                    background: '#f0fdfa',
                    border: '1px solid #059669',
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}>
                    <h4 /* TODO: Move to external CSS */ style={{ color: '#065f46', margin: '0 0 1rem 0' }}>
                      Cultural Engagement Analysis
                    </h4>
                    <p /* TODO: Move to external CSS */ style={{ color: '#047857', margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
                      Students show strong cultural connections when assessments include:
                    </p>
                    <ul /* TODO: Move to external CSS */ style={{ color: '#065f46', margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Local environmental contexts</li>
                      <li>Whakataukī and traditional stories</li>
                      <li>Community and whakapapa connections</li>
                      <li>Practical applications of traditional knowledge</li>
                    </ul>
                  </div>

                  <div /* TODO: Move to external CSS */ style={{
                    background: '#fffbeb',
                    border: '1px solid #f59e0b',
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}>
                    <h4 /* TODO: Move to external CSS */ style={{ color: '#92400e', margin: '0 0 1rem 0' }}>
                      Recommendations for Enhancement
                    </h4>
                    <ul /* TODO: Move to external CSS */ style={{ color: '#a16207', margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Increase cultural context in mathematics assessments</li>
                      <li>Include more Te Reo Māori vocabulary integration</li>
                      <li>Provide options for oral assessment formats</li>
                      <li>Connect learning to local iwi knowledge</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div /* TODO: Move to external CSS */ style={{ 
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            height: 'fit-content'
          }}>
            <h3 /* TODO: Move to external CSS */ style={{ margin: '0 0 1rem 0', color: '#1a365d', fontWeight: '600' }}>
              🏆 Recent Achievements
            </h3>
            
            <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div /* TODO: Move to external CSS */ style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#fef3c7',
                borderRadius: '8px'
              }}>
                <Award size={24} /* TODO: Move to external CSS */ style={{ color: '#f59e0b' }} />
                <div>
                  <div /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#92400e', fontSize: '0.9rem' }}>
                    Cultural Excellence
                  </div>
                  <div /* TODO: Move to external CSS */ style={{ fontSize: '0.8rem', color: '#a16207' }}>
                    Mere Patel - 98% Cultural Reflection
                  </div>
                </div>
              </div>

              <div /* TODO: Move to external CSS */ style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#d1fae5',
                borderRadius: '8px'
              }}>
                <Star size={24} /* TODO: Move to external CSS */ style={{ color: '#059669' }} />
                <div>
                  <div /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#065f46', fontSize: '0.9rem' }}>
                    Te Reo Mastery
                  </div>
                  <div /* TODO: Move to external CSS */ style={{ fontSize: '0.8rem', color: '#047857' }}>
                    Aroha Williams - Perfect Pronunciation
                  </div>
                </div>
              </div>

              <div /* TODO: Move to external CSS */ style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#dbeafe',
                borderRadius: '8px'
              }}>
                <Brain size={24} /* TODO: Move to external CSS */ style={{ color: '#3b82f6' }} />
                <div>
                  <div /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#1e40af', fontSize: '0.9rem' }}>
                    Critical Thinking
                  </div>
                  <div /* TODO: Move to external CSS */ style={{ fontSize: '0.8rem', color: '#1d4ed8' }}>
                    Class Average - 85% Problem Solving
                  </div>
                </div>
              </div>
            </div>

            <div /* TODO: Move to external CSS */ style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#f0fdfa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div /* TODO: Move to external CSS */ style={{ fontSize: '0.9rem', fontWeight: '600', color: '#065f46', marginBottom: '0.5rem' }}>
                Tikanga Compliance Score
              </div>
              <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700', color: '#059669' }}>
                {metrics?.tikangaCompliance}%
              </div>
              <div /* TODO: Move to external CSS */ style={{ fontSize: '0.8rem', color: '#047857' }}>
                Excellent cultural integration
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAssessmentHub;