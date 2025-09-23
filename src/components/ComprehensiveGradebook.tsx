import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  yearLevel: string;
  class: string;
  studentId: string;
  email?: string;
  parentEmail?: string;
  culturalBackground?: string;
  learningNeeds?: string[];
  attendance: number;
  lastActive: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  type: 'assessment' | 'homework' | 'project' | 'participation' | 'quiz' | 'test';
  dueDate: string;
  totalPoints: number;
  weight: number;
  description: string;
  rubric?: string;
}

interface Grade {
  studentId: string;
  assignmentId: string;
  pointsEarned: number;
  feedback?: string;
  submittedDate?: string;
  gradedDate: string;
  status: 'submitted' | 'graded' | 'late' | 'missing';
}

const ComprehensiveGradebook: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Aroha Thompson',
      yearLevel: 'Year 8',
      class: 'Room 12',
      studentId: 'STU001',
      email: 'aroha.thompson@school.nz',
      parentEmail: 'parent.thompson@email.com',
      culturalBackground: 'Māori',
      learningNeeds: ['Visual learner', 'Extra time for assessments'],
      attendance: 95,
      lastActive: '2024-01-15'
    },
    {
      id: '2',
      name: 'James Chen',
      yearLevel: 'Year 8',
      class: 'Room 12',
      studentId: 'STU002',
      email: 'james.chen@school.nz',
      parentEmail: 'parent.chen@email.com',
      culturalBackground: 'Chinese',
      learningNeeds: ['Auditory learner'],
      attendance: 98,
      lastActive: '2024-01-15'
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      yearLevel: 'Year 8',
      class: 'Room 12',
      studentId: 'STU003',
      email: 'sofia.rodriguez@school.nz',
      parentEmail: 'parent.rodriguez@email.com',
      culturalBackground: 'Filipino',
      learningNeeds: ['Kinesthetic learner', 'Small group work'],
      attendance: 92,
      lastActive: '2024-01-14'
    }
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Māori Settlement Patterns Research',
      subject: 'Social Studies',
      type: 'project',
      dueDate: '2024-01-20',
      totalPoints: 100,
      weight: 25,
      description: 'Research project on early Māori settlement patterns with cultural perspectives',
      rubric: 'Achieved/Merit/Excellence criteria with cultural competency indicators'
    },
    {
      id: '2',
      title: 'Te Reo Māori Speaking Assessment',
      subject: 'Te Reo Māori',
      type: 'assessment',
      dueDate: '2024-01-18',
      totalPoints: 50,
      weight: 20,
      description: 'Oral presentation in te reo Māori with cultural protocols',
      rubric: 'Speaking fluency, cultural knowledge, pronunciation accuracy'
    },
    {
      id: '3',
      title: 'Environmental Science Quiz',
      subject: 'Science',
      type: 'quiz',
      dueDate: '2024-01-16',
      totalPoints: 30,
      weight: 15,
      description: 'Quiz on kaitiakitanga principles and environmental stewardship'
    }
  ]);

  const [grades, setGrades] = useState<Grade[]>([
    {
      studentId: '1',
      assignmentId: '1',
      pointsEarned: 85,
      feedback: 'Excellent research with strong cultural perspectives. Well-presented findings.',
      submittedDate: '2024-01-19',
      gradedDate: '2024-01-20',
      status: 'graded'
    },
    {
      studentId: '2',
      assignmentId: '1',
      pointsEarned: 92,
      feedback: 'Outstanding work with comprehensive analysis and cultural integration.',
      submittedDate: '2024-01-19',
      gradedDate: '2024-01-20',
      status: 'graded'
    },
    {
      studentId: '3',
      assignmentId: '1',
      pointsEarned: 78,
      feedback: 'Good research but could strengthen cultural connections. Consider more primary sources.',
      submittedDate: '2024-01-20',
      gradedDate: '2024-01-20',
      status: 'graded'
    },
    {
      studentId: '1',
      assignmentId: '2',
      pointsEarned: 45,
      feedback: 'Strong cultural knowledge and good pronunciation. Keep practicing fluency.',
      submittedDate: '2024-01-17',
      gradedDate: '2024-01-18',
      status: 'graded'
    },
    {
      studentId: '2',
      assignmentId: '2',
      pointsEarned: 38,
      feedback: 'Good effort with basic vocabulary. Focus on sentence structure and cultural protocols.',
      submittedDate: '2024-01-18',
      gradedDate: '2024-01-18',
      status: 'graded'
    },
    {
      studentId: '3',
      assignmentId: '2',
      pointsEarned: 42,
      feedback: 'Excellent pronunciation and cultural understanding. Well-prepared presentation.',
      submittedDate: '2024-01-17',
      gradedDate: '2024-01-18',
      status: 'graded'
    }
  ]);

  const [selectedClass, setSelectedClass] = useState('Room 12');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'analytics'>('overview');

  const getStudentGrade = (studentId: string, assignmentId: string) => {
    return grades.find(g => g.studentId === studentId && g.assignmentId === assignmentId);
  };

  const getStudentAverage = (studentId: string) => {
    const studentGrades = grades.filter(g => g.studentId === studentId);
    if (studentGrades.length === 0) return 0;
    
    const totalPoints = studentGrades.reduce((sum, grade) => {
      const assignment = assignments.find(a => a.id === grade.assignmentId);
      return sum + (assignment ? grade.pointsEarned / assignment.totalPoints * 100 : 0);
    }, 0);
    
    return totalPoints / studentGrades.length;
  };

  const getClassAverage = () => {
    const studentAverages = students.map(student => getStudentAverage(student.id));
    return studentAverages.reduce((sum, avg) => sum + avg, 0) / studentAverages.length;
  };

  const getAssignmentStats = (assignmentId: string) => {
    const assignmentGrades = grades.filter(g => g.assignmentId === assignmentId);
    if (assignmentGrades.length === 0) return { average: 0, highest: 0, lowest: 0 };
    
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return { average: 0, highest: 0, lowest: 0 };
    
    const percentages = assignmentGrades.map(grade => (grade.pointsEarned / assignment.totalPoints) * 100);
    return {
      average: percentages.reduce((sum, p) => sum + p, 0) / percentages.length,
      highest: Math.max(...percentages),
      lowest: Math.min(...percentages)
    };
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          borderBottom: '3px solid #667eea',
          paddingBottom: '20px'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#2d3748',
            margin: '0 0 10px 0',
            fontWeight: '700'
          }}>
            📊 Comprehensive Gradebook
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#4a5568',
            margin: '0'
          }}>
            Track student progress, manage grades, and analyze performance data
          </p>
        </div>

        {/* Controls */}
        <div style={{
          background: '#f7fafc',
          padding: '25px',
          borderRadius: '15px',
          marginBottom: '30px',
          border: '2px solid #e2e8f0'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white'
                }}
              >
                <option value="Room 12">Room 12</option>
                <option value="Room 15">Room 15</option>
                <option value="Room 18">Room 18</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white'
                }}
              >
                <option value="All Subjects">All Subjects</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Te Reo Māori">Te Reo Māori</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
                View Mode
              </label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white'
                }}
              >
                <option value="overview">Overview</option>
                <option value="detailed">Detailed</option>
                <option value="analytics">Analytics</option>
              </select>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              + Add Assignment
            </button>
            <button
              style={{
                background: 'linear-gradient(135deg, #48bb78, #38a169)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Export Grades
            </button>
            <button
              style={{
                background: 'linear-gradient(135deg, #ed8936, #dd6b20)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{students.length}</h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Students</p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            color: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{assignments.length}</h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Assignments</p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            color: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{getClassAverage().toFixed(1)}%</h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Class Average</p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
            color: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%
            </h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Avg Attendance</p>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === 'overview' && (
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Student Overview</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {students.map((student) => {
                const average = getStudentAverage(student.id);
                const recentGrades = grades.filter(g => g.studentId === student.id).slice(-3);
                
                return (
                  <div
                    key={student.id}
                    style={{
                      background: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '15px',
                      padding: '25px',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <div>
                        <h3 style={{ color: '#2d3748', margin: '0 0 5px 0', fontSize: '1.4rem' }}>
                          {student.name}
                        </h3>
                        <div style={{ display: 'flex', gap: '15px', color: '#718096', fontSize: '0.95rem', marginBottom: '10px' }}>
                          <span>👤 {student.studentId}</span>
                          <span>📚 {student.yearLevel}</span>
                          <span>🏠 {student.class}</span>
                          <span>📅 {student.attendance}% attendance</span>
                        </div>
                        {student.culturalBackground && (
                          <p style={{ color: '#4a5568', margin: '0 0 10px 0', fontSize: '0.9rem' }}>
                            Cultural Background: {student.culturalBackground}
                          </p>
                        )}
                        {student.learningNeeds && student.learningNeeds.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                            {student.learningNeeds.map((need, index) => (
                              <span
                                key={index}
                                style={{
                                  background: '#e2e8f0',
                                  color: '#4a5568',
                                  padding: '3px 8px',
                                  borderRadius: '10px',
                                  fontSize: '0.8rem'
                                }}
                              >
                                {need}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          background: average >= 80 ? '#48bb78' : average >= 60 ? '#ed8936' : '#e53e3e',
                          color: 'white',
                          padding: '10px 20px',
                          borderRadius: '20px',
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          marginBottom: '10px'
                        }}>
                          {average.toFixed(1)}%
                        </div>
                        <button style={{
                          background: '#4299e1',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}>
                          View Details
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ color: '#4a5568', marginBottom: '10px' }}>Recent Grades:</h4>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        {recentGrades.map((grade) => {
                          const assignment = assignments.find(a => a.id === grade.assignmentId);
                          const percentage = assignment ? (grade.pointsEarned / assignment.totalPoints) * 100 : 0;
                          
                          return (
                            <div
                              key={grade.assignmentId}
                              style={{
                                background: '#f7fafc',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                minWidth: '120px'
                              }}
                            >
                              <div style={{ fontSize: '0.9rem', color: '#4a5568', marginBottom: '5px' }}>
                                {assignment?.title}
                              </div>
                              <div style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: percentage >= 80 ? '#48bb78' : percentage >= 60 ? '#ed8936' : '#e53e3e'
                              }}>
                                {percentage.toFixed(1)}%
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === 'detailed' && (
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Detailed Gradebook</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
                <thead>
                  <tr style={{ background: '#667eea', color: 'white' }}>
                    <th style={{ padding: '15px', textAlign: 'left', border: 'none' }}>Student</th>
                    {assignments.map((assignment) => (
                      <th key={assignment.id} style={{ padding: '15px', textAlign: 'center', border: 'none', minWidth: '120px' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                          {assignment.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: '0.8' }}>
                          {assignment.subject} • {assignment.totalPoints}pts
                        </div>
                      </th>
                    ))}
                    <th style={{ padding: '15px', textAlign: 'center', border: 'none' }}>Average</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id} style={{ background: index % 2 === 0 ? 'white' : '#f7fafc' }}>
                      <td style={{ padding: '15px', border: 'none', borderBottom: '1px solid #e2e8f0' }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#2d3748' }}>{student.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#718096' }}>{student.studentId}</div>
                        </div>
                      </td>
                      {assignments.map((assignment) => {
                        const grade = getStudentGrade(student.id, assignment.id);
                        const percentage = grade ? (grade.pointsEarned / assignment.totalPoints) * 100 : 0;
                        
                        return (
                          <td key={assignment.id} style={{ padding: '15px', textAlign: 'center', border: 'none', borderBottom: '1px solid #e2e8f0' }}>
                            {grade ? (
                              <div>
                                <div style={{
                                  fontSize: '1.1rem',
                                  fontWeight: '600',
                                  color: percentage >= 80 ? '#48bb78' : percentage >= 60 ? '#ed8936' : '#e53e3e'
                                }}>
                                  {grade.pointsEarned}/{assignment.totalPoints}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                                  {percentage.toFixed(1)}%
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#718096', marginTop: '2px' }}>
                                  {grade.status}
                                </div>
                              </div>
                            ) : (
                              <div style={{ color: '#cbd5e0', fontSize: '0.9rem' }}>-</div>
                            )}
                          </td>
                        );
                      })}
                      <td style={{ padding: '15px', textAlign: 'center', border: 'none', borderBottom: '1px solid #e2e8f0' }}>
                        <div style={{
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          color: getStudentAverage(student.id) >= 80 ? '#48bb78' : getStudentAverage(student.id) >= 60 ? '#ed8936' : '#e53e3e'
                        }}>
                          {getStudentAverage(student.id).toFixed(1)}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === 'analytics' && (
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Performance Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <h3 style={{ color: '#4a5568', marginBottom: '15px' }}>Assignment Performance</h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  {assignments.map((assignment) => {
                    const stats = getAssignmentStats(assignment.id);
                    return (
                      <div
                        key={assignment.id}
                        style={{
                          background: 'white',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '20px',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
                        }}
                      >
                        <h4 style={{ color: '#2d3748', margin: '0 0 10px 0' }}>{assignment.title}</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', textAlign: 'center' }}>
                          <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#667eea' }}>
                              {stats.average.toFixed(1)}%
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#718096' }}>Average</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#48bb78' }}>
                              {stats.highest.toFixed(1)}%
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#718096' }}>Highest</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#e53e3e' }}>
                              {stats.lowest.toFixed(1)}%
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#718096' }}>Lowest</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 style={{ color: '#4a5568', marginBottom: '15px' }}>Student Performance Distribution</h3>
                <div style={{ background: 'white', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {students.map((student) => {
                      const average = getStudentAverage(student.id);
                      return (
                        <div key={student.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ minWidth: '120px', fontSize: '0.9rem', color: '#4a5568' }}>
                            {student.name}
                          </div>
                          <div style={{ flex: 1, background: '#e2e8f0', height: '20px', borderRadius: '10px', overflow: 'hidden' }}>
                            <div
                              style={{
                                width: `${average}%`,
                                height: '100%',
                                background: average >= 80 ? '#48bb78' : average >= 60 ? '#ed8936' : '#e53e3e',
                                transition: 'width 0.3s ease'
                              }}
                            />
                          </div>
                          <div style={{ minWidth: '40px', textAlign: 'right', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' }}>
                            {average.toFixed(1)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComprehensiveGradebook;
