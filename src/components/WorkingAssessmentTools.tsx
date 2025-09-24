import React, { useState } from 'react';

const WorkingAssessmentTools: React.FC = () => {
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '10px' }}>
            📊 Assessment Tools
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Create NCEA-aligned assessments with cultural integration and rubrics
          </p>
        </div>

        {/* Assessment Type Selection */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px' }}>
            🎯 Choose Assessment Type
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px',
            marginBottom: '20px'
          }}>
            {[
              {
                type: 'formative',
                title: 'Formative Assessment',
                description: 'Ongoing feedback during learning',
                icon: '📝',
                color: '#3b82f6'
              },
              {
                type: 'summative',
                title: 'Summative Assessment',
                description: 'Final evaluation of learning',
                icon: '📋',
                color: '#10b981'
              },
              {
                type: 'ncea',
                title: 'NCEA Standards',
                description: 'NZQA-aligned achievement standards',
                icon: '🏆',
                color: '#8b5cf6'
              },
              {
                type: 'cultural',
                title: 'Cultural Assessment',
                description: 'Te Ao Māori perspectives and values',
                icon: '🌿',
                color: '#059669'
              }
            ].map((assessment) => (
              <button
                key={assessment.type}
                onClick={() => setSelectedAssessmentType(assessment.type)}
                style={{
                  background: selectedAssessmentType === assessment.type 
                    ? `linear-gradient(135deg, ${assessment.color} 0%, ${assessment.color}aa 100%)`
                    : 'white',
                  color: selectedAssessmentType === assessment.type ? 'white' : '#374151',
                  border: selectedAssessmentType === assessment.type 
                    ? 'none' 
                    : `2px solid ${assessment.color}`,
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{assessment.icon}</div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  {assessment.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                  {assessment.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px' }}>
          {/* Assessment Builder */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px' }}>
              🔧 Assessment Builder
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
                Assessment Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Te Tiriti o Waitangi Research Project"
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
                Subject & Year Level
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                <select style={{
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}>
                  <option>Social Studies</option>
                  <option>English</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>Te Reo Māori</option>
                </select>
                <select style={{
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}>
                  <option>Year 8</option>
                  <option>Year 9</option>
                  <option>Year 10</option>
                  <option>Year 11</option>
                  <option>Year 12</option>
                  <option>Year 13</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
                Learning Objectives
              </label>
              <textarea
                placeholder="What will students demonstrate through this assessment?"
                style={{
                  width: '100%',
                  height: '80px',
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
                🌿 Cultural Integration Requirements
              </h4>
              <textarea
                placeholder="How will this assessment honor Te Ao Māori perspectives and values?"
                style={{
                  width: '100%',
                  height: '60px',
                  padding: '8px',
                  border: '1px solid #10b981',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  background: 'white'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
                📝 Create Assessment
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
            </div>
          </div>

          {/* Rubric Generator */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px' }}>
              📐 Rubric Generator
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#374151', marginBottom: '15px' }}>Assessment Criteria</h4>
              
              {[
                'Understanding of key concepts',
                'Research and evidence quality',
                'Cultural perspectives integration',
                'Communication and presentation'
              ].map((criteria, index) => (
                <div key={index} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ color: '#374151' }}>{criteria}</strong>
                    <select style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                      <option>25%</option>
                      <option>20%</option>
                      <option>30%</option>
                      <option>15%</option>
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px', fontSize: '0.8rem' }}>
                    <div style={{ background: '#fef2f2', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>
                      <strong>Not Achieved</strong>
                    </div>
                    <div style={{ background: '#fef3c7', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>
                      <strong>Developing</strong>
                    </div>
                    <div style={{ background: '#ecfdf5', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>
                      <strong>Achieved</strong>
                    </div>
                    <div style={{ background: '#eff6ff', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>
                      <strong>Excellence</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '15px'
            }}>
              🎯 Generate Full Rubric
            </button>

            <div style={{
              background: '#f0f9ff',
              border: '1px solid #0ea5e9',
              borderRadius: '8px',
              padding: '12px'
            }}>
              <h4 style={{ color: '#0c4a6e', fontSize: '0.9rem', marginBottom: '5px' }}>
                💡 NCEA Alignment
              </h4>
              <p style={{ color: '#0369a1', fontSize: '0.8rem', margin: 0 }}>
                This assessment will be automatically aligned with relevant NCEA Achievement Standards
                and include cultural competency indicators.
              </p>
            </div>
          </div>

          {/* Recent Assessments */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px' }}>
              📂 Recent Assessments
            </h3>

            {[
              { 
                title: 'Te Tiriti Research Project', 
                subject: 'Social Studies Y8', 
                type: 'Summative',
                students: 28,
                status: 'Active'
              },
              { 
                title: 'Ecosystem Analysis', 
                subject: 'Science Y9', 
                type: 'Formative',
                students: 31,
                status: 'Marking'
              },
              { 
                title: 'Poetry Analysis', 
                subject: 'English Y10', 
                type: 'NCEA',
                students: 25,
                status: 'Completed'
              }
            ].map((assessment, index) => (
              <div key={index} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '15px',
                marginBottom: '10px',
                transition: 'all 0.3s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ color: '#374151', margin: 0, fontSize: '1rem' }}>
                    {assessment.title}
                  </h4>
                  <span style={{
                    background: assessment.status === 'Active' ? '#dcfce7' : 
                               assessment.status === 'Marking' ? '#fef3c7' : '#dbeafe',
                    color: assessment.status === 'Active' ? '#166534' : 
                           assessment.status === 'Marking' ? '#92400e' : '#1e40af',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {assessment.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '5px' }}>
                  {assessment.subject} • {assessment.type} • {assessment.students} students
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}>
                    Edit
                  </button>
                  <button style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}>
                    Results
                  </button>
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
              View All Assessments
            </button>
          </div>

          {/* Assessment Templates */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '20px' }}>
              📋 Quick Templates
            </h3>

            {[
              { name: 'Essay Assessment', icon: '📝', subjects: ['English', 'Social Studies'] },
              { name: 'Science Report', icon: '🔬', subjects: ['Science'] },
              { name: 'Mathematical Investigation', icon: '📊', subjects: ['Mathematics'] },
              { name: 'Cultural Research Project', icon: '🌿', subjects: ['Te Reo Māori', 'Social Studies'] },
              { name: 'Oral Presentation', icon: '🗣️', subjects: ['All Subjects'] },
              { name: 'Peer Assessment', icon: '👥', subjects: ['All Subjects'] }
            ].map((template, index) => (
              <button key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                width: '100%',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{template.icon}</span>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#374151', marginBottom: '2px' }}>
                    {template.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    {template.subjects.join(', ')}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingAssessmentTools;