import React, { useState } from 'react';
import { useEducation } from '../contexts/EducationContext';

interface Parent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  relationship: 'mother' | 'father' | 'guardian' | 'grandparent' | 'other';
  children: string[]; // Student IDs
  preferredLanguage: string;
  culturalBackground?: string;
}

const ParentPortal: React.FC = () => {
  const { students, teachers, classes, assignments, grades, notifications } = useEducation();
  
  const [currentParent] = useState<Parent>({
    id: '1',
    name: 'Maria Thompson',
    email: 'maria.thompson@email.com',
    phone: '+64 21 123 4567',
    relationship: 'mother',
    children: ['1'], // Aroha Thompson
    preferredLanguage: 'English',
    culturalBackground: 'Māori'
  });

  const [selectedChild, setSelectedChild] = useState('1');
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'assignments' | 'communication' | 'attendance'>('overview');

  const currentStudent = students.find(s => s.id === selectedChild);
  const studentClasses = classes.filter(c => c.studentIds.includes(selectedChild));
  const studentAssignments = assignments.filter(a => 
    studentClasses.some(c => c.id === a.classId)
  );
  const studentGrades = grades.filter(g => g.studentId === selectedChild);
  const studentNotifications = notifications.filter(n => 
    n.metadata?.studentId === selectedChild
  );

  const getStudentAverage = () => {
    if (studentGrades.length === 0) return 0;
    
    const totalPoints = studentGrades.reduce((sum, grade) => {
      const assignment = assignments.find(a => a.id === grade.assignmentId);
      return sum + (assignment ? grade.pointsEarned / assignment.totalPoints * 100 : 0);
    }, 0);
    
    return totalPoints / studentGrades.length;
  };

  const getRecentAssignments = () => {
    return studentAssignments
      .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
      .slice(0, 5);
  };

  const getUpcomingAssignments = () => {
    const today = new Date();
    return studentAssignments
      .filter(a => new Date(a.dueDate) > today)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3);
  };

  const getAttendanceRate = () => {
    return currentStudent?.attendance || 0;
  };

  const getGradeColor = (grade?: number) => {
    if (!grade) return '#718096';
    if (grade >= 80) return '#48bb78';
    if (grade >= 60) return '#ed8936';
    return '#e53e3e';
  };

  const getGradeText = (grade?: number) => {
    if (!grade) return 'Not graded';
    if (grade >= 80) return 'Excellence';
    if (grade >= 60) return 'Merit';
    return 'Achieved';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          borderBottom: '3px solid #667eea',
          paddingBottom: '20px'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              color: '#2d3748',
              margin: '0 0 5px 0',
              fontWeight: '700'
            }}>
              👨‍👩‍👧‍👦 Parent Portal
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#4a5568',
              margin: '0'
            }}>
              Welcome, {currentParent.name} - Stay connected with your child's education
            </p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
              {currentParent.relationship.charAt(0).toUpperCase() + currentParent.relationship.slice(1)}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>
              {currentParent.culturalBackground}
            </div>
          </div>
        </div>

        {/* Child Selection */}
        <div style={{
          background: '#f7fafc',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '30px',
          border: '2px solid #e2e8f0'
        }}>
          <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>Select Child</h3>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {currentParent.children.map(childId => {
              const child = students.find(s => s.id === childId);
              if (!child) return null;
              
              return (
                <button
                  key={childId}
                  onClick={() => setSelectedChild(childId)}
                  style={{
                    background: selectedChild === childId ? '#667eea' : 'white',
                    color: selectedChild === childId ? 'white' : '#4a5568',
                    border: `2px solid ${selectedChild === childId ? '#667eea' : '#e2e8f0'}`,
                    padding: '15px 20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{child.avatar}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '600' }}>{child.name}</div>
                    <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>
                      {child.yearLevel} • {child.class}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '5px',
          marginBottom: '30px',
          background: '#f7fafc',
          padding: '5px',
          borderRadius: '12px',
          border: '2px solid #e2e8f0'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'progress', label: 'Progress', icon: '📈' },
            { id: 'assignments', label: 'Assignments', icon: '📝' },
            { id: 'communication', label: 'Communication', icon: '💬' },
            { id: 'attendance', label: 'Attendance', icon: '📅' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: activeTab === tab.id ? '#667eea' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#4a5568',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>
              Overview for {currentStudent?.name}
            </h2>
            
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
                <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
                  {getStudentAverage().toFixed(1)}%
                </h3>
                <p style={{ margin: '0', opacity: '0.9' }}>Overall Average</p>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
                  {getAttendanceRate()}%
                </h3>
                <p style={{ margin: '0', opacity: '0.9' }}>Attendance</p>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
                  {studentAssignments.length}
                </h3>
                <p style={{ margin: '0', opacity: '0.9' }}>Total Assignments</p>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
                  {studentGrades.filter(g => g.status === 'graded').length}
                </h3>
                <p style={{ margin: '0', opacity: '0.9' }}>Graded</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Recent Activity</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {getRecentAssignments().map(assignment => {
                  const grade = studentGrades.find(g => g.assignmentId === assignment.id);
                  const teacher = teachers.find(t => t.id === assignment.teacherId);
                  
                  return (
                    <div
                      key={assignment.id}
                      style={{
                        background: '#f7fafc',
                        padding: '15px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <h4 style={{ color: '#2d3748', margin: '0 0 5px 0' }}>
                          {assignment.title}
                        </h4>
                        <p style={{ color: '#718096', margin: '0', fontSize: '0.9rem' }}>
                          {assignment.subject} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          {teacher && ` • Teacher: ${teacher.name}`}
                        </p>
                      </div>
                      {grade && (
                        <div style={{
                          background: getGradeColor(grade.pointsEarned / assignment.totalPoints * 100),
                          color: 'white',
                          padding: '8px 12px',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          textAlign: 'center'
                        }}>
                          <div>{grade.pointsEarned}/{assignment.totalPoints}</div>
                          <div style={{ fontSize: '0.7rem' }}>
                            {getGradeText(grade.pointsEarned / assignment.totalPoints * 100)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>
              Academic Progress for {currentStudent?.name}
            </h2>
            
            <div style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Subject Performance</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {studentClasses.map(cls => {
                  const classAssignments = studentAssignments.filter(a => a.classId === cls.id);
                  const classGrades = studentGrades.filter(g => 
                    classAssignments.some(a => a.id === g.assignmentId)
                  );
                  
                  const classAverage = classGrades.length > 0 
                    ? classGrades.reduce((sum, grade) => {
                        const assignment = assignments.find(a => a.id === grade.assignmentId);
                        return sum + (assignment ? grade.pointsEarned / assignment.totalPoints * 100 : 0);
                      }, 0) / classGrades.length
                    : 0;
                  
                  return (
                    <div
                      key={cls.id}
                      style={{
                        background: '#f7fafc',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h4 style={{ color: '#2d3748', margin: '0' }}>{cls.subject}</h4>
                        <div style={{
                          background: getGradeColor(classAverage),
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '15px',
                          fontSize: '1.1rem',
                          fontWeight: '600'
                        }}>
                          {classAverage.toFixed(1)}%
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#667eea' }}>
                            {classAssignments.length}
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#718096' }}>Assignments</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#48bb78' }}>
                            {classGrades.filter(g => g.status === 'graded').length}
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#718096' }}>Graded</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ed8936' }}>
                            {classGrades.filter(g => g.status === 'late').length}
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#718096' }}>Late</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>
              Assignments for {currentStudent?.name}
            </h2>
            
            {/* Upcoming Assignments */}
            <div style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Upcoming Assignments</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {getUpcomingAssignments().map(assignment => {
                  const teacher = teachers.find(t => t.id === assignment.teacherId);
                  const daysUntilDue = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div
                      key={assignment.id}
                      style={{
                        background: '#f0f9ff',
                        border: '2px solid #3b82f6',
                        padding: '20px',
                        borderRadius: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <h4 style={{ color: '#2d3748', margin: '0' }}>{assignment.title}</h4>
                        <div style={{
                          background: daysUntilDue <= 3 ? '#e53e3e' : '#ed8936',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '10px',
                          fontSize: '0.9rem',
                          fontWeight: '500'
                        }}>
                          {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''} left
                        </div>
                      </div>
                      <p style={{ color: '#4a5568', margin: '0 0 10px 0' }}>
                        {assignment.description}
                      </p>
                      <div style={{ display: 'flex', gap: '15px', color: '#718096', fontSize: '0.9rem' }}>
                        <span>📚 {assignment.subject}</span>
                        <span>📅 Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        <span>📊 {assignment.totalPoints} points</span>
                        {teacher && <span>👨‍🏫 {teacher.name}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All Assignments */}
            <div style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>All Assignments</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f7fafc' }}>
                      <th style={{ padding: '15px', textAlign: 'left', border: 'none' }}>Assignment</th>
                      <th style={{ padding: '15px', textAlign: 'left', border: 'none' }}>Subject</th>
                      <th style={{ padding: '15px', textAlign: 'center', border: 'none' }}>Due Date</th>
                      <th style={{ padding: '15px', textAlign: 'center', border: 'none' }}>Status</th>
                      <th style={{ padding: '15px', textAlign: 'center', border: 'none' }}>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentAssignments.map((assignment, index) => {
                      const grade = studentGrades.find(g => g.assignmentId === assignment.id);
                      const teacher = teachers.find(t => t.id === assignment.teacherId);
                      const isOverdue = new Date(assignment.dueDate) < new Date() && !grade;
                      
                      return (
                        <tr key={assignment.id} style={{ background: index % 2 === 0 ? 'white' : '#f7fafc' }}>
                          <td style={{ padding: '15px', border: 'none', borderBottom: '1px solid #e2e8f0' }}>
                            <div>
                              <div style={{ fontWeight: '600', color: '#2d3748' }}>{assignment.title}</div>
                              <div style={{ fontSize: '0.9rem', color: '#718096' }}>
                                {teacher?.name} • {assignment.totalPoints} points
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '15px', border: 'none', borderBottom: '1px solid #e2e8f0' }}>
                            {assignment.subject}
                          </td>
                          <td style={{ padding: '15px', textAlign: 'center', border: 'none', borderBottom: '1px solid #e2e8f0' }}>
                            {new Date(assignment.dueDate).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '15px', textAlign: 'center', border: 'none', borderBottom: '1px solid #e2e8f0' }}>
                            {grade ? (
                              <span style={{
                                background: '#48bb78',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: '500'
                              }}>
                                Graded
                              </span>
                            ) : isOverdue ? (
                              <span style={{
                                background: '#e53e3e',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: '500'
                              }}>
                                Overdue
                              </span>
                            ) : (
                              <span style={{
                                background: '#ed8936',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: '500'
                              }}>
                                Pending
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '15px', textAlign: 'center', border: 'none', borderBottom: '1px solid #e2e8f0' }}>
                            {grade ? (
                              <div style={{
                                background: getGradeColor(grade.pointsEarned / assignment.totalPoints * 100),
                                color: 'white',
                                padding: '6px 12px',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                              }}>
                                {grade.pointsEarned}/{assignment.totalPoints}
                              </div>
                            ) : (
                              <span style={{ color: '#cbd5e0' }}>-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communication' && (
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>
              Communication with Teachers
            </h2>
            
            <div style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Send Message</h3>
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
                    To Teacher
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'white'
                  }}>
                    <option value="">Select a teacher...</option>
                    {studentClasses.map(cls => {
                      const teacher = teachers.find(t => t.id === cls.teacherId);
                      return teacher ? (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} - {cls.subject}
                        </option>
                      ) : null;
                    })}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Message subject..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
                    Message
                  </label>
                  <textarea
                    placeholder="Type your message here..."
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: 'white',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <button style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  alignSelf: 'flex-start'
                }}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>
              Attendance for {currentStudent?.name}
            </h2>
            
            <div style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #48bb78, #38a169)',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
                    {getAttendanceRate()}%
                  </h3>
                  <p style={{ margin: '0', opacity: '0.9' }}>Overall Attendance</p>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
                    {currentStudent?.lastActive ? new Date(currentStudent.lastActive).toLocaleDateString() : 'N/A'}
                  </h3>
                  <p style={{ margin: '0', opacity: '0.9' }}>Last Active</p>
                </div>
              </div>
              
              <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Attendance by Subject</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {studentClasses.map(cls => {
                  const teacher = teachers.find(t => t.id === cls.teacherId);
                  
                  return (
                    <div
                      key={cls.id}
                      style={{
                        background: '#f7fafc',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <h4 style={{ color: '#2d3748', margin: '0 0 5px 0' }}>{cls.subject}</h4>
                        <p style={{ color: '#718096', margin: '0', fontSize: '0.9rem' }}>
                          {teacher?.name} • {cls.schedule}
                        </p>
                      </div>
                      <div style={{
                        background: getAttendanceRate() >= 90 ? '#48bb78' : getAttendanceRate() >= 80 ? '#ed8936' : '#e53e3e',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '15px',
                        fontSize: '1.1rem',
                        fontWeight: '600'
                      }}>
                        {getAttendanceRate()}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentPortal;
