import React, { useState } from 'react';

const WorkingAnalyticsDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedClass, setSelectedClass] = useState('all');

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
                📊 Analytics Dashboard
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>
                Track student progress, engagement, and cultural learning outcomes
              </p>
            </div>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                style={{
                  padding: '12px 20px',
                  border: '2px solid #1e40af',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#1e40af',
                  background: 'white'
                }}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="term">This Term</option>
                <option value="year">This Year</option>
              </select>
              <button style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                📈 Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {[
            { 
              title: 'Student Engagement', 
              value: '94%', 
              change: '+3%', 
              trend: 'up',
              icon: '📈', 
              color: '#10b981',
              subtitle: 'Above school average'
            },
            { 
              title: 'Cultural Safety Score', 
              value: '96%', 
              change: '+2%', 
              trend: 'up',
              icon: '🌿', 
              color: '#059669',
              subtitle: 'Excellent tikanga integration'
            },
            { 
              title: 'Assessment Completion', 
              value: '89%', 
              change: '+5%', 
              trend: 'up',
              icon: '📋', 
              color: '#3b82f6',
              subtitle: 'On-time submissions'
            },
            { 
              title: 'Learning Progress', 
              value: '87%', 
              change: '+4%', 
              trend: 'up',
              icon: '🎯', 
              color: '#8b5cf6',
              subtitle: 'Curriculum objectives met'
            },
            { 
              title: 'Parent Engagement', 
              value: '95%', 
              change: '+8%', 
              trend: 'up',
              icon: '👨‍👩‍👧‍👦', 
              color: '#f59e0b',
              subtitle: 'Family communication rate'
            },
            { 
              title: 'Attendance Rate', 
              value: '91%', 
              change: '-1%', 
              trend: 'down',
              icon: '✅', 
              color: '#ef4444',
              subtitle: 'Needs attention'
            }
          ].map((metric, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: metric.trend === 'up' ? '#10b981' : '#ef4444',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}>
                <span>{metric.trend === 'up' ? '↗️' : '↘️'}</span>
                {metric.change}
              </div>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{metric.icon}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: metric.color, marginBottom: '5px' }}>
                {metric.value}
              </div>
              <div style={{ fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>{metric.title}</div>
              <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{metric.subtitle}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px' }}>
          {/* Student Performance Trends */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            gridColumn: 'span 2'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              📈 Student Performance Trends
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {/* Academic Performance Chart */}
              <div style={{
                background: '#f8fafc',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ color: '#374151', marginBottom: '15px', fontSize: '1.1rem' }}>Academic Achievement</h4>
                <div style={{ height: '200px', display: 'flex', alignItems: 'end', gap: '8px', marginBottom: '15px' }}>
                  {[
                    { month: 'Mar', value: 78, color: '#3b82f6' },
                    { month: 'Apr', value: 82, color: '#3b82f6' },
                    { month: 'May', value: 85, color: '#10b981' },
                    { month: 'Jun', value: 87, color: '#10b981' },
                    { month: 'Jul', value: 89, color: '#059669' },
                    { month: 'Aug', value: 91, color: '#059669' }
                  ].map((bar, index) => (
                    <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div 
                        style={{
                          width: '100%',
                          height: `${(bar.value / 100) * 180}px`,
                          background: bar.color,
                          borderRadius: '4px 4px 0 0',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          paddingBottom: '5px'
                        }}
                      >
                        {bar.value}%
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{bar.month}</div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>
                  ↗️ 13% improvement this term
                </div>
              </div>

              {/* Cultural Engagement */}
              <div style={{
                background: '#f8fafc',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ color: '#374151', marginBottom: '15px', fontSize: '1.1rem' }}>Cultural Engagement</h4>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                    border: '1px solid #10b981',
                    borderRadius: '12px',
                    padding: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌿</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#065f46' }}>96%</div>
                    <div style={{ color: '#047857', fontSize: '0.9rem' }}>Cultural Safety Score</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.9rem', color: '#374151' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>🗣️ Te Reo Usage</span>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>89%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>🏛️ Cultural Context</span>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>94%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>🤝 Tikanga Integration</span>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>97%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>👥 Community Connection</span>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Class Performance Comparison */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              🏫 Class Performance
            </h3>

            <div style={{ marginBottom: '15px' }}>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                <option value="all">All Classes</option>
                <option value="year8-social">Year 8 Social Studies</option>
                <option value="year9-science">Year 9 Science</option>
                <option value="year10-math">Year 10 Mathematics</option>
              </select>
            </div>

            {[
              { 
                class: 'Year 8 Social Studies', 
                students: 28, 
                avgScore: 87, 
                engagement: 94,
                cultural: 98,
                status: 'excellent'
              },
              { 
                class: 'Year 9 Science', 
                students: 31, 
                avgScore: 84, 
                engagement: 89,
                cultural: 92,
                status: 'good'
              },
              { 
                class: 'Year 10 Mathematics', 
                students: 30, 
                avgScore: 79, 
                engagement: 85,
                cultural: 88,
                status: 'improving'
              }
            ].map((classData, index) => (
              <div key={index} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '15px',
                background: '#f8fafc'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ color: '#374151', margin: 0, fontSize: '1.1rem' }}>
                    {classData.class}
                  </h4>
                  <span style={{
                    background: classData.status === 'excellent' ? '#dcfce7' : 
                               classData.status === 'good' ? '#fef3c7' : '#dbeafe',
                    color: classData.status === 'excellent' ? '#166534' : 
                           classData.status === 'good' ? '#92400e' : '#1e40af',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}>
                    {classData.status}
                  </span>
                </div>
                
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '10px' }}>
                  {classData.students} students
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#6b7280' }}>Avg Score</div>
                    <div style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '1.1rem' }}>{classData.avgScore}%</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#6b7280' }}>Engagement</div>
                    <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem' }}>{classData.engagement}%</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#6b7280' }}>Cultural</div>
                    <div style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '1.1rem' }}>{classData.cultural}%</div>
                  </div>
                </div>
              </div>
            ))}

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}>
              📊 Detailed Class Analytics
            </button>
          </div>

          {/* Assessment Analytics */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              📋 Assessment Analytics
            </h3>

            <div style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              border: '1px solid #3b82f6',
              borderRadius: '12px',
              padding: '15px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.5rem' }}>🎯</span>
                <strong style={{ color: '#1e3a8a' }}>Strong Assessment Performance</strong>
              </div>
              <p style={{ color: '#1e40af', margin: 0, fontSize: '0.9rem' }}>
                89% completion rate with 87% average score across all assessments.
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#374151', marginBottom: '15px', fontSize: '1rem' }}>Recent Assessment Results</h4>
              
              {[
                { name: 'Te Tiriti Research Project', subject: 'Social Studies', avgScore: 92, completion: 96, type: 'Summative' },
                { name: 'Ecosystem Analysis', subject: 'Science', avgScore: 85, completion: 89, type: 'Formative' },
                { name: 'Statistical Investigation', subject: 'Mathematics', avgScore: 78, completion: 87, type: 'NCEA' },
                { name: 'Cultural Poetry Analysis', subject: 'English', avgScore: 88, completion: 94, type: 'Summative' }
              ].map((assessment, index) => (
                <div key={index} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px',
                  background: '#f8fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#374151', fontSize: '0.9rem' }}>
                        {assessment.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        {assessment.subject} • {assessment.type}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: '#3b82f6' }}>Avg: {assessment.avgScore}%</span>
                    <span style={{ color: '#10b981' }}>Complete: {assessment.completion}%</span>
                  </div>
                </div>
              ))}
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
              📈 Assessment Reports
            </button>
          </div>

          {/* Learning Objectives Progress */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              🎯 Learning Objectives
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#374151', marginBottom: '15px', fontSize: '1rem' }}>NZ Curriculum Progress</h4>
              
              {[
                { objective: 'Historical Knowledge & Understanding', progress: 89, color: '#10b981' },
                { objective: 'Cultural Perspectives & Values', progress: 96, color: '#059669' },
                { objective: 'Research & Communication Skills', progress: 84, color: '#3b82f6' },
                { objective: 'Critical Thinking & Analysis', progress: 87, color: '#8b5cf6' },
                { objective: 'Collaborative Learning', progress: 92, color: '#f59e0b' }
              ].map((objective, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 'bold' }}>
                      {objective.objective}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: objective.color, fontWeight: 'bold' }}>
                      {objective.progress}%
                    </span>
                  </div>
                  <div style={{
                    background: '#f3f4f6',
                    height: '8px',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: objective.color,
                      height: '100%',
                      width: `${objective.progress}%`,
                      borderRadius: '4px',
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: '#f0f9ff',
              border: '1px solid #0ea5e9',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '15px'
            }}>
              <h4 style={{ color: '#0c4a6e', fontSize: '0.9rem', marginBottom: '5px' }}>
                💡 Key Insights
              </h4>
              <ul style={{ color: '#0369a1', fontSize: '0.8rem', margin: 0, paddingLeft: '15px' }}>
                <li>Cultural perspectives showing strongest performance</li>
                <li>Research skills present growth opportunity</li>
                <li>Collaborative learning exceeding expectations</li>
              </ul>
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
              🎯 Objective Details
            </button>
          </div>

          {/* Student Support Alerts */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              🚨 Student Support Alerts
            </h3>

            {[
              {
                student: 'David Chen',
                class: 'Year 8 Social Studies',
                issue: 'Attendance declining',
                priority: 'medium',
                action: 'Family contact suggested',
                icon: '⏰'
              },
              {
                student: 'Alex Morgan',
                class: 'Year 10 Mathematics',
                issue: 'Assessment submissions late',
                priority: 'low',
                action: 'Study support offered',
                icon: '📚'
              },
              {
                student: 'Emma Taylor',
                class: 'Year 9 Science',
                issue: 'Engagement dropping',
                priority: 'medium',
                action: 'Cultural check-in needed',
                icon: '🌿'
              }
            ].map((alert, index) => (
              <div key={index} style={{
                border: `2px solid ${alert.priority === 'high' ? '#ef4444' : alert.priority === 'medium' ? '#f59e0b' : '#3b82f6'}`,
                borderRadius: '12px',
                padding: '15px',
                marginBottom: '12px',
                background: alert.priority === 'high' ? '#fef2f2' : alert.priority === 'medium' ? '#fefbf2' : '#eff6ff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{alert.icon}</span>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#374151', fontSize: '1rem' }}>
                      {alert.student}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {alert.class}
                    </div>
                  </div>
                  <span style={{
                    marginLeft: 'auto',
                    background: alert.priority === 'high' ? '#ef4444' : alert.priority === 'medium' ? '#f59e0b' : '#3b82f6',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {alert.priority}
                  </span>
                </div>
                <div style={{ color: '#374151', fontSize: '0.9rem', marginBottom: '5px' }}>
                  {alert.issue}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                  💡 {alert.action}
                </div>
              </div>
            ))}

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}>
              🚨 All Support Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingAnalyticsDashboard;