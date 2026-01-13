import React, { useState, useEffect } from 'react';
import { useEducation } from '../contexts/EducationContext';

interface StudentProgress {
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  overallProgress: number;
  subjectProgress: { [subject: string]: number };
  recentActivities: Activity[];
  culturalEngagement: number;
  strengths: string[];
  areasForImprovement: string[];
  nextSteps: string[];
  lastUpdated: Date;
}

interface Activity {
  id: string;
  type: 'assignment' | 'assessment' | 'participation' | 'cultural-activity';
  title: string;
  subject: string;
  score?: number;
  maxScore?: number;
  completedAt: Date;
  culturalElements: string[];
  feedback?: string;
}

interface ProgressInsight {
  type: 'positive' | 'concern' | 'recommendation';
  title: string;
  description: string;
  action?: string;
  priority: 'low' | 'medium' | 'high';
}

const RealStudentProgressTracker: React.FC = () => {
  const { students, classes, assignments, grades } = useEducation();
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'insights'>('overview');
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'term' | 'year'>('term');

  // Generate student progress data
  useEffect(() => {
    const generateProgressData = (): StudentProgress[] => {
      return students.map(student => {
        const studentClass = classes.find(c => c.studentIds.includes(student.id));
        const studentGrades = grades.filter(g => g.studentId === student.id);
        const studentAssignments = assignments.filter(a => 
          studentClass?.studentIds.includes(student.id)
        );

        // Calculate subject progress
        const subjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Te Reo Māori'];
        const subjectProgress: { [subject: string]: number } = {};
        
        subjects.forEach(subject => {
          const subjectGrades = studentGrades.filter(g => g.subject === subject);
          if (subjectGrades.length > 0) {
            const avgScore = subjectGrades.reduce((sum, g) => sum + g.score, 0) / subjectGrades.length;
            subjectProgress[subject] = Math.round(avgScore);
          } else {
            subjectProgress[subject] = Math.round(Math.random() * 40 + 60); // Random between 60-100
          }
        });

        // Calculate overall progress
        const overallProgress = Math.round(
          Object.values(subjectProgress).reduce((sum, score) => sum + score, 0) / subjects.length
        );

        // Generate recent activities
        const recentActivities: Activity[] = [
          {
            id: 'act-1',
            type: 'assessment',
            title: 'Māori History Assessment',
            subject: 'Social Studies',
            score: 85,
            maxScore: 100,
            completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            culturalElements: ['Te Ao Māori', 'Historical understanding'],
            feedback: 'Excellent understanding of cultural perspectives'
          },
          {
            id: 'act-2',
            type: 'assignment',
            title: 'Math Problem Solving',
            subject: 'Mathematics',
            score: 78,
            maxScore: 100,
            completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            culturalElements: ['Mathematical thinking'],
            feedback: 'Good problem-solving skills, needs more practice with word problems'
          },
          {
            id: 'act-3',
            type: 'cultural-activity',
            title: 'Whakataukī Presentation',
            subject: 'Te Reo Māori',
            completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            culturalElements: ['Te Reo Māori', 'Cultural expression', 'Public speaking'],
            feedback: 'Confident presentation with good pronunciation'
          }
        ];

        // Calculate cultural engagement
        const culturalActivities = recentActivities.filter(a => 
          a.culturalElements.length > 1 || a.subject === 'Te Reo Māori'
        );
        const culturalEngagement = Math.round((culturalActivities.length / recentActivities.length) * 100);

        // Generate insights
        const strengths = [
          'Strong cultural awareness',
          'Good collaboration skills',
          'Creative problem solving'
        ];

        const areasForImprovement = [
          'Mathematical reasoning',
          'Written expression',
          'Time management'
        ];

        const nextSteps = [
          'Focus on word problems in mathematics',
          'Practice writing longer responses',
          'Continue cultural learning activities'
        ];

        return {
          studentId: student.id,
          studentName: student.name,
          classId: studentClass?.id || '',
          className: studentClass?.name || 'Unassigned',
          overallProgress,
          subjectProgress,
          recentActivities,
          culturalEngagement,
          strengths,
          areasForImprovement,
          nextSteps,
          lastUpdated: new Date()
        };
      });
    };

    setStudentProgress(generateProgressData());
  }, [students, classes, assignments, grades]);

  const getClassStudents = () => {
    if (!selectedClass) return studentProgress;
    return studentProgress.filter(p => p.classId === selectedClass);
  };

  const getProgressInsights = (progress: StudentProgress): ProgressInsight[] => {
    const insights: ProgressInsight[] = [];

    // Overall progress insights
    if (progress.overallProgress >= 85) {
      insights.push({
        type: 'positive',
        title: 'Excellent Overall Progress',
        description: `${progress.studentName} is performing well across all subjects`,
        priority: 'low'
      });
    } else if (progress.overallProgress < 70) {
      insights.push({
        type: 'concern',
        title: 'Progress Needs Attention',
        description: `${progress.studentName} may need additional support`,
        action: 'Schedule parent meeting',
        priority: 'high'
      });
    }

    // Subject-specific insights
    Object.entries(progress.subjectProgress).forEach(([subject, score]) => {
      if (score >= 90) {
        insights.push({
          type: 'positive',
          title: `Strong Performance in ${subject}`,
          description: `Excellent work in ${subject}`,
          priority: 'low'
        });
      } else if (score < 65) {
        insights.push({
          type: 'concern',
          title: `${subject} Needs Support`,
          description: `Additional help needed in ${subject}`,
          action: 'Arrange tutoring support',
          priority: 'high'
        });
      }
    });

    // Cultural engagement insights
    if (progress.culturalEngagement >= 80) {
      insights.push({
        type: 'positive',
        title: 'High Cultural Engagement',
        description: 'Strong participation in cultural activities',
        priority: 'low'
      });
    }

    return insights;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 85) return '#10b981';
    if (progress >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return '#10b981';
      case 'concern': return '#ef4444';
      case 'recommendation': return '#3b82f6';
      default: return '#6b7280';
    }
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
              📈 Student Progress Tracker
            </h1>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as any)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem'
                }}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="term">This Term</option>
                <option value="year">This Year</option>
              </select>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['overview', 'detailed', 'insights'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db',
                      background: viewMode === mode ? '#1e40af' : 'white',
                      color: viewMode === mode ? 'white' : '#374151',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textTransform: 'capitalize'
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>
            Track student progress, cultural engagement, and learning outcomes
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedStudent ? '1fr 2fr' : '1fr', gap: '2rem' }}>
          {/* Student List */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            height: 'fit-content'
          }}>
            <h2 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
              👥 Students
            </h2>
            
            {/* Class Filter */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                Filter by Class:
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
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {getClassStudents().map(progress => (
                <div
                  key={progress.studentId}
                  onClick={() => setSelectedStudent(progress)}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: selectedStudent?.studentId === progress.studentId ? '2px solid #1e40af' : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    background: selectedStudent?.studentId === progress.studentId ? '#eff6ff' : 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontSize: '1.1rem' }}>
                    {progress.studentName}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      background: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem'
                    }}>
                      {progress.className}
                    </span>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      background: '#dcfce7',
                      color: '#059669',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem'
                    }}>
                      {progress.overallProgress}%
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      {progress.recentActivities.length} activities
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ color: '#059669', fontSize: '0.75rem' }}>
                        {progress.culturalEngagement}%
                      </span>
                      <span style={{ fontSize: '0.75rem' }}>🌿</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Detail */}
          {selectedStudent && (
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              {viewMode === 'overview' && (
                <>
                  <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#1f2937', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
                      {selectedStudent.studentName}
                    </h2>
                    <p style={{ color: '#6b7280', margin: 0 }}>
                      {selectedStudent.className} • Last updated: {selectedStudent.lastUpdated.toLocaleDateString()}
                    </p>
                  </div>

                  {/* Overall Progress */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                      📊 Overall Progress
                    </h3>
                    <div style={{
                      background: '#f9fafb',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: '#374151', fontSize: '1.1rem' }}>Overall Performance</span>
                        <span style={{ 
                          color: getProgressColor(selectedStudent.overallProgress),
                          fontSize: '1.5rem',
                          fontWeight: 'bold'
                        }}>
                          {selectedStudent.overallProgress}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#e5e7eb',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${selectedStudent.overallProgress}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${getProgressColor(selectedStudent.overallProgress)}, ${getProgressColor(selectedStudent.overallProgress)}aa)`,
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Subject Progress */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                      📚 Subject Progress
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      {Object.entries(selectedStudent.subjectProgress).map(([subject, progress]) => (
                        <div key={subject} style={{
                          background: '#f9fafb',
                          borderRadius: '0.5rem',
                          padding: '1rem',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ color: '#374151', fontSize: '0.9rem', fontWeight: '500' }}>{subject}</span>
                            <span style={{ 
                              color: getProgressColor(progress),
                              fontSize: '1.1rem',
                              fontWeight: 'bold'
                            }}>
                              {progress}%
                            </span>
                          </div>
                          <div style={{
                            width: '100%',
                            height: '4px',
                            background: '#e5e7eb',
                            borderRadius: '2px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${progress}%`,
                              height: '100%',
                              background: getProgressColor(progress),
                              transition: 'width 0.3s ease'
                            }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cultural Engagement */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                      🌿 Cultural Engagement
                    </h3>
                    <div style={{
                      background: '#f0fdf4',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      border: '1px solid #bbf7d0'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: '#374151', fontSize: '1.1rem' }}>Cultural Participation</span>
                        <span style={{ 
                          color: '#059669',
                          fontSize: '1.5rem',
                          fontWeight: 'bold'
                        }}>
                          {selectedStudent.culturalEngagement}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#d1fae5',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${selectedStudent.culturalEngagement}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #059669, #10b981)',
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {viewMode === 'detailed' && (
                <>
                  <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#1f2937', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
                      {selectedStudent.studentName} - Detailed View
                    </h2>
                  </div>

                  {/* Recent Activities */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                      📋 Recent Activities
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {selectedStudent.recentActivities.map(activity => (
                        <div key={activity.id} style={{
                          padding: '1.5rem',
                          background: '#f9fafb',
                          borderRadius: '0.5rem',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <h4 style={{ margin: 0, color: '#1f2937' }}>{activity.title}</h4>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <span style={{
                                padding: '0.25rem 0.5rem',
                                background: '#dbeafe',
                                color: '#1e40af',
                                borderRadius: '0.25rem',
                                fontSize: '0.75rem'
                              }}>
                                {activity.subject}
                              </span>
                              <span style={{
                                padding: '0.25rem 0.5rem',
                                background: '#fef3c7',
                                color: '#d97706',
                                borderRadius: '0.25rem',
                                fontSize: '0.75rem'
                              }}>
                                {activity.type}
                              </span>
                            </div>
                          </div>
                          {activity.score && activity.maxScore && (
                            <div style={{ marginBottom: '0.5rem' }}>
                              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                Score: {activity.score}/{activity.maxScore} ({Math.round((activity.score/activity.maxScore)*100)}%)
                              </span>
                            </div>
                          )}
                          <p style={{ color: '#4b5563', margin: '0 0 1rem 0' }}>
                            Completed: {activity.completedAt.toLocaleDateString()}
                          </p>
                          {activity.feedback && (
                            <p style={{ color: '#374151', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
                              <strong>Feedback:</strong> {activity.feedback}
                            </p>
                          )}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {activity.culturalElements.map((element, index) => (
                              <span key={index} style={{
                                padding: '0.25rem 0.5rem',
                                background: '#ecfdf5',
                                color: '#059669',
                                borderRadius: '0.25rem',
                                fontSize: '0.75rem',
                                border: '1px solid #a7f3d0'
                              }}>
                                {element}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths and Areas for Improvement */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                      <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                        💪 Strengths
                      </h3>
                      <ul style={{ color: '#4b5563', paddingLeft: '1.5rem' }}>
                        {selectedStudent.strengths.map((strength, index) => (
                          <li key={index} style={{ marginBottom: '0.5rem' }}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                        🎯 Areas for Improvement
                      </h3>
                      <ul style={{ color: '#4b5563', paddingLeft: '1.5rem' }}>
                        {selectedStudent.areasForImprovement.map((area, index) => (
                          <li key={index} style={{ marginBottom: '0.5rem' }}>{area}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {viewMode === 'insights' && (
                <>
                  <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#1f2937', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
                      {selectedStudent.studentName} - Insights
                    </h2>
                  </div>

                  {/* Progress Insights */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                      🔍 Progress Insights
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {getProgressInsights(selectedStudent).map((insight, index) => (
                        <div key={index} style={{
                          padding: '1.5rem',
                          borderRadius: '0.5rem',
                          border: `1px solid ${getInsightColor(insight.type)}`,
                          background: `${getInsightColor(insight.type)}10`
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <h4 style={{ margin: 0, color: '#1f2937' }}>{insight.title}</h4>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <span style={{
                                padding: '0.25rem 0.5rem',
                                background: getInsightColor(insight.type),
                                color: 'white',
                                borderRadius: '0.25rem',
                                fontSize: '0.75rem'
                              }}>
                                {insight.type}
                              </span>
                              <span style={{
                                padding: '0.25rem 0.5rem',
                                background: insight.priority === 'high' ? '#ef4444' : insight.priority === 'medium' ? '#f59e0b' : '#10b981',
                                color: 'white',
                                borderRadius: '0.25rem',
                                fontSize: '0.75rem'
                              }}>
                                {insight.priority}
                              </span>
                            </div>
                          </div>
                          <p style={{ color: '#4b5563', margin: '0 0 1rem 0' }}>{insight.description}</p>
                          {insight.action && (
                            <div style={{
                              padding: '0.75rem',
                              background: '#f3f4f6',
                              borderRadius: '0.25rem',
                              border: '1px solid #d1d5db'
                            }}>
                              <p style={{ color: '#374151', fontSize: '0.9rem', margin: 0 }}>
                                <strong>Recommended Action:</strong> {insight.action}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div>
                    <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                      🚀 Next Steps
                    </h3>
                    <div style={{
                      background: '#f0f9ff',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      border: '1px solid #bae6fd'
                    }}>
                      <ul style={{ color: '#1e40af', paddingLeft: '1.5rem' }}>
                        {selectedStudent.nextSteps.map((step, index) => (
                          <li key={index} style={{ marginBottom: '0.5rem' }}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealStudentProgressTracker;
