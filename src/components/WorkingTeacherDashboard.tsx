import React from 'react';
import { useEducation } from '../contexts/EducationContext';

const WorkingTeacherDashboard: React.FC = () => {
  const { classes, students, assignments, resources, getStudentById } = useEducation();
  
  // Calculate real metrics from current class
  const currentClass = classes[0]; // Use first class for now
  const currentClassStudents = currentClass ? students.filter(s => currentClass.studentIds.includes(s.id)) : [];
  const totalAssignments = assignments.length;
  const totalResources = resources.length;
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '10px', margin: '0 0 10px 0' }}>
                🌿 Kia ora, Sarah!
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>
                Welcome back to Te Ao Mārama • Auckland Grammar School
              </p>
            </div>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <button style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                📝 Create New Lesson
              </button>
              <button style={{
                background: 'transparent',
                color: '#1e40af',
                border: '2px solid #1e40af',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                📊 View Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {[
            { icon: '📚', title: 'Assignments', value: totalAssignments.toString(), subtitle: `Active assignments`, color: '#3b82f6' },
            { icon: '👥', title: 'Total Students', value: currentClassStudents.length.toString(), subtitle: `In ${currentClass?.name || 'current class'}`, color: '#10b981' },
            { icon: '🌿', title: 'Resources', value: totalResources.toString(), subtitle: 'Available resources', color: '#8b5cf6' },
            { icon: '📈', title: 'Classes', value: classes.length.toString(), subtitle: 'Active classes', color: '#f59e0b' }
          ].map((stat, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{stat.icon}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: stat.color, marginBottom: '5px' }}>
                {stat.value}
              </div>
              <div style={{ fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>{stat.title}</div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{stat.subtitle}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
          {/* Recent Lessons */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              📖 Recent Lesson Activity
            </h3>
            
            {assignments.slice(0, 3).map((assignment, index) => (
              <div key={index} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '15px',
                transition: 'all 0.3s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h4 style={{ color: '#374151', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>
                    {assignment.title}
                  </h4>
                  <span style={{
                    background: '#dcfce7',
                    color: '#166534',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#6b7280' }}>
                  <span>📚 Subject: <strong>{assignment.subject}</strong></span>
                  <span>⏰ Due: <strong>{assignment.dueDate}</strong></span>
                  <span>📊 Points: <strong>{assignment.totalPoints}</strong></span>
                </div>
              </div>
            ))}

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}>
              View All Lessons
            </button>
          </div>

          {/* Class Management */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              👥 My Classes
            </h3>
            
            {classes.map((classItem, index) => {
              const classStudents = students.filter(s => classItem.studentIds.includes(s.id));
              return (
              <div key={index} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ color: '#374151', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>
                    {classItem.name}
                  </h4>
                  <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    {classStudents.length} students
                  </span>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '5px' }}>
                    Room: <strong>{classItem.room}</strong> • Schedule: <strong>{classItem.schedule}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      flex: 1,
                      background: '#e5e7eb',
                      height: '8px',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        height: '100%',
                        width: `75%`,
                        borderRadius: '4px'
                      }}></div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#10b981' }}>
                      75%
                    </span>
                  </div>
                </div>
              </div>
              );
            })}

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #059669 0%, #1e40af 100%)',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}>
              Manage All Classes
            </button>
          </div>

          {/* Quick Actions */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              ⚡ Quick Actions
            </h3>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {[
                { icon: '📝', title: 'Create Assessment', desc: 'NCEA-aligned rubrics', color: '#3b82f6' },
                { icon: '📊', title: 'Student Reports', desc: 'Progress and engagement', color: '#10b981' },
                { icon: '🌿', title: 'Cultural Resources', desc: 'Te Ao Māori content', color: '#8b5cf6' },
                { icon: '👨‍👩‍👧‍👦', title: 'Parent Communication', desc: 'Send updates home', color: '#f59e0b' },
                { icon: '📚', title: 'Resource Library', desc: 'Browse curriculum content', color: '#ef4444' },
                { icon: '🤝', title: 'Collaborate', desc: 'Connect with colleagues', color: '#06b6d4' }
              ].map((action, index) => (
                <button key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '15px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'left'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: `${action.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {action.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#374151', marginBottom: '2px' }}>
                      {action.title}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                      {action.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cultural Insights */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              🌿 Cultural Integration Insights
            </h3>
            
            <div style={{
              background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
              border: '1px solid #10b981'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>🏆</span>
                <strong style={{ color: '#065f46' }}>Excellent Cultural Integration!</strong>
              </div>
              <p style={{ color: '#047857', margin: 0, fontSize: '0.9rem' }}>
                Your lessons consistently maintain 96% cultural safety compliance. 
                Students are engaging deeply with Te Ao Māori perspectives.
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#374151', marginBottom: '15px' }}>This Week's Cultural Highlights</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span>🌿</span>
                  <span style={{ fontSize: '0.9rem' }}>Te Tiriti discussions showing deep student understanding</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span>🎯</span>
                  <span style={{ fontSize: '0.9rem' }}>Increased use of Te Reo Māori in classroom activities</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span>👥</span>
                  <span style={{ fontSize: '0.9rem' }}>Students connecting with their whakapapa through lessons</span>
                </li>
              </ul>
            </div>

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              View Cultural Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingTeacherDashboard;