import React, { useState, useEffect } from 'react';
import { useEducation } from '../contexts/EducationContext';

const WorkingStudentDashboard: React.FC = () => {
  const { students, assignments, grades, classes, resources, getGradesForStudent } = useEducation();
  const [currentStudent, setCurrentStudent] = useState(students[0] || null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'assignments' | 'grades' | 'resources'>('overview');

  // Get student's data
  const studentGrades = currentStudent ? getGradesForStudent(currentStudent.id) : [];
  const studentClass = classes.find(c => c.studentIds.includes(currentStudent?.id || ''));
  const upcomingAssignments = assignments.filter(a => new Date(a.dueDate) > new Date()).slice(0, 3);

  if (!currentStudent) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#1e40af' }}>👋 Welcome to Te Ao Mārama</h2>
          <p style={{ color: '#6b7280' }}>Please log in to access your student dashboard</p>
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
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Header with student info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '3rem' }}>{currentStudent.avatar}</div>
            <div>
              <h1 style={{ color: '#1e40af', fontSize: '2rem', margin: '0 0 5px 0' }}>
                Kia ora, {currentStudent.name.split(' ')[0]}!
              </h1>
              <p style={{ color: '#6b7280', margin: 0 }}>
                {currentStudent.yearLevel} • {studentClass?.name || 'Your Class'} • {currentStudent.attendance}% attendance
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              value={currentStudent.id}
              onChange={(e) => setCurrentStudent(students.find(s => s.id === e.target.value) || students[0])}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                fontSize: '0.9rem'
              }}
            >
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation tabs */}
        <div style={{ marginBottom: '30px', borderBottom: '2px solid #f3f4f6' }}>
          {(['overview', 'assignments', 'grades', 'resources'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              style={{
                padding: '12px 24px',
                border: 'none',
                background: selectedTab === tab ? '#1e40af' : 'transparent',
                color: selectedTab === tab ? 'white' : '#6b7280',
                borderRadius: '8px 8px 0 0',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginRight: '10px',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div>
            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {[
                { icon: '📚', title: 'Assignments Due', value: upcomingAssignments.length.toString(), subtitle: 'This week', color: '#f59e0b' },
                { icon: '✅', title: 'Completed', value: studentGrades.length.toString(), subtitle: 'Total assignments', color: '#10b981' },
                { icon: '📈', title: 'Average Grade', value: studentGrades.length ? Math.round(studentGrades.reduce((sum, g) => sum + (g.pointsEarned / 100 * 100), 0) / studentGrades.length) + '%' : 'N/A', subtitle: 'Current term', color: '#3b82f6' },
                { icon: '🎯', title: 'Attendance', value: currentStudent.attendance + '%', subtitle: 'This term', color: '#8b5cf6' }
              ].map((stat, index) => (
                <div key={index} style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '20px',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: `3px solid ${stat.color}20`
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{stat.icon}</div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color, margin: '0 0 5px 0' }}>
                    {stat.value}
                  </h3>
                  <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', margin: '0 0 5px 0' }}>
                    {stat.title}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>
                    {stat.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Upcoming Assignments */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#1e40af', fontSize: '1.3rem', marginBottom: '15px' }}>📋 Upcoming Assignments</h3>
              {upcomingAssignments.length > 0 ? upcomingAssignments.map(assignment => (
                <div key={assignment.id} style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '15px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ color: '#374151', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>
                      {assignment.title}
                    </h4>
                    <span style={{
                      background: '#fef3c7',
                      color: '#92400e',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      Due {assignment.dueDate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#6b7280' }}>
                    <span>📚 {assignment.subject}</span>
                    <span>⭐ {assignment.totalPoints} points</span>
                    <span>📊 {assignment.weight}% of grade</span>
                  </div>
                </div>
              )) : (
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>🎉 No upcoming assignments! Great work staying on top of things.</p>
              )}
            </div>

            {/* Personal Goals */}
            <div>
              <h3 style={{ color: '#1e40af', fontSize: '1.3rem', marginBottom: '15px' }}>🎯 My Goals</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                {currentStudent.goals?.map((goal, index) => (
                  <div key={index} style={{
                    background: '#ecfdf5',
                    borderRadius: '12px',
                    padding: '15px',
                    border: '2px solid #10b981'
                  }}>
                    <p style={{ color: '#047857', fontWeight: 'bold', margin: 0 }}>{goal}</p>
                  </div>
                )) || <p style={{ color: '#6b7280' }}>No goals set yet</p>}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'assignments' && (
          <div>
            <h3 style={{ color: '#1e40af', fontSize: '1.3rem', marginBottom: '20px' }}>📚 All Assignments</h3>
            {assignments.map(assignment => (
              <div key={assignment.id} style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '15px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ color: '#374151', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>
                    {assignment.title}
                  </h4>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      background: new Date(assignment.dueDate) > new Date() ? '#dcfce7' : '#fef2f2',
                      color: new Date(assignment.dueDate) > new Date() ? '#166534' : '#dc2626',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {assignment.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <p style={{ color: '#6b7280', marginBottom: '10px' }}>{assignment.description}</p>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#6b7280' }}>
                  <span>📅 Due: {assignment.dueDate}</span>
                  <span>⭐ Points: {assignment.totalPoints}</span>
                  <span>📊 Weight: {assignment.weight}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'grades' && (
          <div>
            <h3 style={{ color: '#1e40af', fontSize: '1.3rem', marginBottom: '20px' }}>📊 My Grades</h3>
            {studentGrades.length > 0 ? studentGrades.map(grade => {
              const assignment = assignments.find(a => a.id === grade.assignmentId);
              const percentage = Math.round((grade.pointsEarned / (assignment?.totalPoints || 100)) * 100);
              return (
                <div key={`${grade.studentId}-${grade.assignmentId}`} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '15px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ color: '#374151', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>
                      {assignment?.title || 'Assignment'}
                    </h4>
                    <div style={{
                      background: percentage >= 80 ? '#dcfce7' : percentage >= 60 ? '#fef3c7' : '#fef2f2',
                      color: percentage >= 80 ? '#166534' : percentage >= 60 ? '#92400e' : '#dc2626',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '1.1rem',
                      fontWeight: 'bold'
                    }}>
                      {percentage}%
                    </div>
                  </div>
                  <p style={{ color: '#6b7280', marginBottom: '10px' }}>{grade.feedback}</p>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#6b7280' }}>
                    <span>📝 {grade.pointsEarned}/{assignment?.totalPoints || 100} points</span>
                    <span>📅 Graded: {grade.gradedDate}</span>
                    <span>✅ Status: {grade.status}</span>
                  </div>
                </div>
              );
            }) : (
              <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No grades available yet.</p>
            )}
          </div>
        )}

        {selectedTab === 'resources' && (
          <div>
            <h3 style={{ color: '#1e40af', fontSize: '1.3rem', marginBottom: '20px' }}>📖 Learning Resources</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {resources.slice(0, 6).map(resource => (
                <div key={resource.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{resource.thumbnail}</div>
                  <h4 style={{ color: '#374151', fontSize: '1rem', fontWeight: 'bold', marginBottom: '10px' }}>
                    {resource.title}
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '15px' }}>
                    {resource.description}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                    {resource.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        background: '#f3f4f6',
                        color: '#374151',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#6b7280' }}>
                    <span>⭐ {resource.rating}/5</span>
                    <span>⏱️ {resource.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkingStudentDashboard;
