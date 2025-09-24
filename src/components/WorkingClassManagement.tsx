import React, { useState } from 'react';

const WorkingClassManagement: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('year8-social');
  const [selectedStudent, setSelectedStudent] = useState('');

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
          marginBottom: '25px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '10px', margin: '0 0 10px 0' }}>
                👥 Class Management
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>
                Manage your classes, track student progress, and maintain engagement
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
                ➕ Add New Class
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
                📊 Export Reports
              </button>
            </div>
          </div>
        </div>

        {/* Class Selector */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '25px',
          marginBottom: '25px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#1e40af', fontSize: '1.3rem', marginBottom: '15px' }}>
            🎯 Select Class
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {[
              { id: 'year8-social', name: 'Year 8 Social Studies', students: 28, subject: 'Social Studies', active: 'Te Tiriti Unit' },
              { id: 'year9-science', name: 'Year 9 Science', students: 31, subject: 'Science', active: 'Ecosystem Study' },
              { id: 'year10-math', name: 'Year 10 Mathematics', students: 30, subject: 'Mathematics', active: 'Statistics Unit' }
            ].map((classItem) => (
              <button
                key={classItem.id}
                onClick={() => setSelectedClass(classItem.id)}
                style={{
                  background: selectedClass === classItem.id 
                    ? 'linear-gradient(135deg, #1e40af 0%, #059669 100%)'
                    : 'white',
                  color: selectedClass === classItem.id ? 'white' : '#374151',
                  border: selectedClass === classItem.id ? 'none' : '2px solid #e5e7eb',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  {classItem.name}
                </h4>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', opacity: 0.9 }}>
                  {classItem.students} students • {classItem.subject}
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>
                  Currently: {classItem.active}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
          {/* Student Roster */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              📋 Student Roster
            </h3>

            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="🔍 Search students..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {[
                { name: 'Aroha Patel', engagement: 95, progress: 82, cultural: 98, status: 'Present' },
                { name: 'James Wilson', engagement: 87, progress: 79, cultural: 91, status: 'Present' },
                { name: 'Mere Tāmaki', engagement: 92, progress: 88, cultural: 97, status: 'Present' },
                { name: 'David Chen', engagement: 78, progress: 85, cultural: 89, status: 'Absent' },
                { name: 'Kiri Johnson', engagement: 94, progress: 91, cultural: 96, status: 'Present' },
                { name: 'Alex Morgan', engagement: 83, progress: 76, cultural: 88, status: 'Present' }
              ].map((student, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedStudent(student.name)}
                  style={{
                    border: selectedStudent === student.name ? '2px solid #1e40af' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '15px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    background: selectedStudent === student.name ? '#f0f9ff' : 'white'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ color: '#374151', margin: 0, fontSize: '1rem' }}>
                      {student.name}
                    </h4>
                    <span style={{
                      background: student.status === 'Present' ? '#dcfce7' : '#fef2f2',
                      color: student.status === 'Present' ? '#166534' : '#dc2626',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {student.status}
                    </span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#6b7280' }}>Engagement</div>
                      <div style={{ color: '#10b981', fontWeight: 'bold' }}>{student.engagement}%</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#6b7280' }}>Progress</div>
                      <div style={{ color: '#3b82f6', fontWeight: 'bold' }}>{student.progress}%</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#6b7280' }}>Cultural</div>
                      <div style={{ color: '#8b5cf6', fontWeight: 'bold' }}>{student.cultural}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '15px'
            }}>
              👥 Manage All Students
            </button>
          </div>

          {/* Attendance Tracking */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              ✅ Attendance Tracking
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ color: '#374151', margin: 0 }}>Today's Attendance</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{
                    background: '#dcfce7',
                    color: '#166534',
                    border: 'none',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}>
                    Mark All Present
                  </button>
                  <button style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}>
                    Export
                  </button>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '10px',
                marginBottom: '20px'
              }}>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', color: '#10b981' }}>25</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Present</div>
                </div>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', color: '#dc2626' }}>2</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Absent</div>
                </div>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', color: '#f59e0b' }}>1</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Late</div>
                </div>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', color: '#3b82f6' }}>89%</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Rate</div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#374151', marginBottom: '10px' }}>Weekly Trends</h4>
              <div style={{
                background: '#f8fafc',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                  <span>Monday</span><span style={{ color: '#10b981' }}>94%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                  <span>Tuesday</span><span style={{ color: '#10b981' }}>91%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                  <span>Wednesday</span><span style={{ color: '#10b981' }}>89%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                  <span>Thursday</span><span style={{ color: '#f59e0b' }}>87%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>Friday</span><span style={{ color: '#10b981' }}>92%</span>
                </div>
              </div>
            </div>

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #059669 0%, #1e40af 100%)',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              📈 View Detailed Reports
            </button>
          </div>

          {/* Behavior & Engagement */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              🌟 Behavior & Engagement
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#374151', marginBottom: '15px' }}>Class Overview</h4>
              
              <div style={{
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                border: '1px solid #10b981',
                borderRadius: '12px',
                padding: '15px',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏆</span>
                  <strong style={{ color: '#065f46' }}>Outstanding Class Engagement!</strong>
                </div>
                <p style={{ color: '#047857', margin: 0, fontSize: '0.9rem' }}>
                  This class maintains 94% average engagement with excellent cultural participation.
                </p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ color: '#374151', marginBottom: '10px', fontSize: '1rem' }}>Positive Behaviors This Week</h5>
                {[
                  '🌿 Excellent use of Te Reo Māori in discussions',
                  '🤝 Strong collaborative learning in group work',
                  '📚 Consistent completion of cultural research tasks',
                  '💬 Respectful classroom conversations'
                ].map((behavior, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '5px',
                    fontSize: '0.9rem',
                    color: '#374151'
                  }}>
                    <span>{behavior}</span>
                  </div>
                ))}
              </div>

              <div>
                <h5 style={{ color: '#374151', marginBottom: '10px', fontSize: '1rem' }}>Areas for Growth</h5>
                {[
                  '⏰ Some students arriving late to class',
                  '📖 Encourage more independent reading'
                ].map((area, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '5px',
                    fontSize: '0.9rem',
                    color: '#6b7280'
                  }}>
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              🎯 Behavior Analytics
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

            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { icon: '📝', title: 'Record Behavior Note', desc: 'Log positive or concerning behaviors', color: '#3b82f6' },
                { icon: '📞', title: 'Contact Parent/Whānau', desc: 'Send updates or arrange meetings', color: '#10b981' },
                { icon: '🎯', title: 'Set Learning Goals', desc: 'Individual or class objectives', color: '#8b5cf6' },
                { icon: '📊', title: 'Generate Report Card', desc: 'Progress summaries for families', color: '#f59e0b' },
                { icon: '🌿', title: 'Cultural Check-in', desc: 'Assess cultural safety & inclusion', color: '#059669' },
                { icon: '👥', title: 'Group Students', desc: 'Create learning groups', color: '#06b6d4' }
              ].map((action, index) => (
                <button key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  background: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: `${action.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    {action.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#374151', marginBottom: '2px', fontSize: '0.9rem' }}>
                      {action.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {action.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingClassManagement;