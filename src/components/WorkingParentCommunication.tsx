import React, { useState } from 'react';

const WorkingParentCommunication: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [messageType, setMessageType] = useState('positive');

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
                👨‍👩‍👧‍👦 Parent & Whānau Communication
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>
                Build strong partnerships with families and communities
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
                ✉️ New Message
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
                📅 Schedule Meeting
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px' }}>
          {/* Message Composer */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            gridColumn: 'span 2'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              ✉️ Compose Message
            </h3>

            {/* Message Type Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#374151' }}>
                Message Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {[
                  { type: 'positive', label: '🌟 Positive News', color: '#10b981' },
                  { type: 'progress', label: '📈 Progress Update', color: '#3b82f6' },
                  { type: 'concern', label: '⚠️ Concern', color: '#f59e0b' },
                  { type: 'invitation', label: '🎉 Event Invitation', color: '#8b5cf6' }
                ].map((type) => (
                  <button
                    key={type.type}
                    onClick={() => setMessageType(type.type)}
                    style={{
                      background: messageType === type.type ? type.color : 'white',
                      color: messageType === type.type ? 'white' : '#374151',
                      border: `2px solid ${type.color}`,
                      padding: '10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
                  Student *
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}>
                  <option>Select Student</option>
                  <option>Aroha Patel</option>
                  <option>James Wilson</option>
                  <option>Mere Tāmaki</option>
                  <option>David Chen</option>
                  <option>Kiri Johnson</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
                  Recipients
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}>
                  <option>Both Parents/Caregivers</option>
                  <option>Primary Contact Only</option>
                  <option>Whānau Group</option>
                  <option>Emergency Contacts</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
                  Language Preference
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}>
                  <option>English</option>
                  <option>Te Reo Māori</option>
                  <option>Auto-Translate</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
                Subject Line *
              </label>
              <input
                type="text"
                placeholder="e.g., Excellent work in Te Tiriti o Waitangi unit"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
                Message Content *
              </label>
              <textarea
                placeholder="Kia ora whānau,

I wanted to share some wonderful news about [Student Name]'s progress in our Social Studies unit on Te Tiriti o Waitangi..."
                style={{
                  width: '100%',
                  height: '120px',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{
              background: '#ecfdf5',
              border: '2px solid #10b981',
              borderRadius: '12px',
              padding: '15px',
              marginBottom: '20px'
            }}>
              <h4 style={{ color: '#065f46', marginBottom: '8px', fontSize: '1rem' }}>
                🌿 Cultural Considerations
              </h4>
              <ul style={{ color: '#047857', fontSize: '0.9rem', margin: 0, paddingLeft: '20px' }}>
                <li>Use inclusive greetings like "Kia ora whānau"</li>
                <li>Acknowledge cultural achievements and perspectives</li>
                <li>Respect family structures and communication preferences</li>
                <li>Consider offering meetings on marae or culturally appropriate spaces</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <button style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
                flex: 1
              }}>
                📤 Send Message
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
                💾 Save Draft
              </button>
              <button style={{
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                📋 Use Template
              </button>
            </div>
          </div>

          {/* Communication Templates */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              📋 Quick Templates
            </h3>

            {[
              { title: 'Academic Achievement', icon: '🏆', type: 'positive', preview: 'Celebrating excellent work and progress...' },
              { title: 'Behavior Recognition', icon: '🌟', type: 'positive', preview: 'Acknowledging positive behavior and values...' },
              { title: 'Cultural Participation', icon: '🌿', type: 'positive', preview: 'Highlighting cultural engagement and respect...' },
              { title: 'Progress Check-in', icon: '📊', type: 'progress', preview: 'Sharing learning progress and next steps...' },
              { title: 'Event Invitation', icon: '🎉', type: 'invitation', preview: 'Inviting whānau to school events...' },
              { title: 'Meeting Request', icon: '🤝', type: 'progress', preview: 'Requesting parent-teacher conference...' },
              { title: 'Homework Support', icon: '📚', type: 'progress', preview: 'Suggestions for home learning support...' },
              { title: 'Concern Discussion', icon: '💬', type: 'concern', preview: 'Addressing concerns with care and respect...' }
            ].map((template, index) => (
              <button 
                key={index}
                onClick={() => setSelectedTemplate(template.title)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  background: selectedTemplate === template.title ? '#f0f9ff' : 'white',
                  border: selectedTemplate === template.title ? '2px solid #1e40af' : '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '15px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{template.icon}</span>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#374151', marginBottom: '3px' }}>
                    {template.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    {template.preview}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Recent Communications */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              💬 Recent Communications
            </h3>

            {[
              { 
                student: 'Aroha Patel', 
                subject: 'Excellent Te Tiriti research', 
                type: 'Positive',
                sent: '2 hours ago',
                status: 'Read',
                response: true
              },
              { 
                student: 'James Wilson', 
                subject: 'Science fair invitation', 
                type: 'Event',
                sent: '1 day ago',
                status: 'Delivered',
                response: false
              },
              { 
                student: 'Mere Tāmaki', 
                subject: 'Cultural leadership recognition', 
                type: 'Positive',
                sent: '3 days ago',
                status: 'Read',
                response: true
              },
              { 
                student: 'David Chen', 
                subject: 'Math progress check-in', 
                type: 'Progress',
                sent: '1 week ago',
                status: 'Read',
                response: false
              }
            ].map((comm, index) => (
              <div key={index} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '15px',
                marginBottom: '12px',
                transition: 'all 0.3s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ color: '#374151', margin: 0, fontSize: '1rem' }}>
                    {comm.student}
                  </h4>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {comm.response && <span style={{ fontSize: '1rem' }}>💬</span>}
                    <span style={{
                      background: comm.status === 'Read' ? '#dcfce7' : '#fef3c7',
                      color: comm.status === 'Read' ? '#166534' : '#92400e',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>
                      {comm.status}
                    </span>
                  </div>
                </div>
                <div style={{ color: '#374151', fontSize: '0.9rem', marginBottom: '8px' }}>
                  {comm.subject}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6b7280' }}>
                  <span>{comm.type}</span>
                  <span>{comm.sent}</span>
                </div>
              </div>
            ))}

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #059669 0%, #1e40af 100%)',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}>
              📧 View All Messages
            </button>
          </div>

          {/* Meeting Scheduler */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              📅 Schedule Meetings
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#374151', marginBottom: '15px', fontSize: '1rem' }}>Upcoming Meetings</h4>
              
              {[
                { parent: 'Mr & Mrs Patel', student: 'Aroha', time: 'Today 3:30pm', type: 'Progress Meeting' },
                { parent: 'Whaea Wilson', student: 'James', time: 'Tomorrow 2:00pm', type: 'Cultural Check-in' },
                { parent: 'Tāmaki Whānau', student: 'Mere', time: 'Friday 1:00pm', type: 'Goal Setting' }
              ].map((meeting, index) => (
                <div key={index} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px',
                  background: '#f8fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#374151', fontSize: '0.9rem' }}>
                        {meeting.parent}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        Re: {meeting.student} • {meeting.type}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 'bold' }}>
                      {meeting.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#374151', marginBottom: '10px', fontSize: '1rem' }}>Quick Schedule</h4>
              <div style={{ display: 'grid', gap: '8px' }}>
                <select style={{
                  padding: '10px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}>
                  <option>Select Student/Family</option>
                  <option>Aroha Patel - Family</option>
                  <option>James Wilson - Whaea Wilson</option>
                  <option>Mere Tāmaki - Whānau</option>
                </select>
                <input
                  type="datetime-local"
                  style={{
                    padding: '10px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                />
                <select style={{
                  padding: '10px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}>
                  <option>Meeting Type</option>
                  <option>Progress Discussion</option>
                  <option>Behavior Support</option>
                  <option>Cultural Consultation</option>
                  <option>Goal Setting</option>
                </select>
              </div>
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
              📅 Schedule Meeting
            </button>
          </div>

          {/* Communication Analytics */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px', margin: '0 0 20px 0' }}>
              📊 Communication Insights
            </h3>

            <div style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              border: '1px solid #10b981',
              borderRadius: '12px',
              padding: '15px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.5rem' }}>📈</span>
                <strong style={{ color: '#065f46' }}>Excellent Family Engagement!</strong>
              </div>
              <p style={{ color: '#047857', margin: 0, fontSize: '0.9rem' }}>
                95% response rate from families this month. Strong whānau connections!
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#374151', marginBottom: '15px', fontSize: '1rem' }}>This Month's Stats</h4>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                marginBottom: '15px'
              }}>
                <div style={{ textAlign: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.2rem', color: '#10b981', fontWeight: 'bold' }}>47</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Messages Sent</div>
                </div>
                <div style={{ textAlign: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.2rem', color: '#3b82f6', fontWeight: 'bold' }}>95%</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Response Rate</div>
                </div>
                <div style={{ textAlign: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.2rem', color: '#8b5cf6', fontWeight: 'bold' }}>12</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Meetings Held</div>
                </div>
                <div style={{ textAlign: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.2rem', color: '#f59e0b', fontWeight: 'bold' }}>8.2</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Avg Rating</div>
                </div>
              </div>

              <div>
                <h5 style={{ color: '#374151', marginBottom: '10px', fontSize: '0.9rem' }}>Popular Communication Types</h5>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span>🌟 Positive Feedback</span><span>65%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span>📊 Progress Updates</span><span>20%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span>🎉 Event Invitations</span><span>10%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>💬 Concerns</span><span>5%</span>
                  </div>
                </div>
              </div>
            </div>

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              📈 Detailed Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingParentCommunication;