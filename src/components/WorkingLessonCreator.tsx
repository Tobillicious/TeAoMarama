import React from 'react';

const WorkingLessonCreator: React.FC = () => {
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
        <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
          📝 Lesson Creator
        </h1>
        <p style={{ color: '#374151', fontSize: '1.2rem', marginBottom: '30px' }}>
          Create engaging lessons for your students
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h3 style={{ color: '#1e40af', marginBottom: '20px' }}>Lesson Details</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#374151', marginBottom: '5px', fontWeight: 'bold' }}>
                Lesson Title
              </label>
              <input
                type="text"
                placeholder="Enter lesson title"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#374151', marginBottom: '5px', fontWeight: 'bold' }}>
                Subject
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              >
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
                <option>Social Studies</option>
                <option>Te Reo Māori</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#374151', marginBottom: '5px', fontWeight: 'bold' }}>
                Year Level
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              >
                <option>Year 1-2</option>
                <option>Year 3-4</option>
                <option>Year 5-6</option>
                <option>Year 7-8</option>
                <option>Year 9-10</option>
                <option>Year 11-13</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#374151', marginBottom: '5px', fontWeight: 'bold' }}>
                Learning Objectives
              </label>
              <textarea
                placeholder="What will students learn?"
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>
          
          <div>
            <h3 style={{ color: '#1e40af', marginBottom: '20px' }}>Lesson Content</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#374151', marginBottom: '5px', fontWeight: 'bold' }}>
                Introduction
              </label>
              <textarea
                placeholder="How will you introduce the lesson?"
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#374151', marginBottom: '5px', fontWeight: 'bold' }}>
                Main Activities
              </label>
              <textarea
                placeholder="What activities will students do?"
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#374151', marginBottom: '5px', fontWeight: 'bold' }}>
                Assessment
              </label>
              <textarea
                placeholder="How will you assess learning?"
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                style={{
                  background: '#1e40af',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                Save Lesson
              </button>
              <button
                style={{
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingLessonCreator;
