import React from 'react';

const WorkingStudentDashboard: React.FC = () => {
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
          🎓 Student Dashboard
        </h1>
        <p style={{ color: '#374151', fontSize: '1.2rem', marginBottom: '30px' }}>
          Track your progress and complete assignments
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>📚 My Assignments</h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>View and complete your assignments</p>
            <div style={{ marginBottom: '10px' }}>
              <p style={{ color: '#374151', fontWeight: 'bold' }}>Math - Algebra</p>
              <p style={{ color: '#059669' }}>Due: Tomorrow</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ color: '#374151', fontWeight: 'bold' }}>Science - Ecosystems</p>
              <p style={{ color: '#ca8a04' }}>Due: Friday</p>
            </div>
            <button style={{ background: '#1e40af', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
              View All
            </button>
          </div>
          
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>🏆 Achievements</h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>Your learning achievements and badges</p>
            <div style={{ marginBottom: '10px' }}>
              <p style={{ color: '#374151' }}>⭐ Perfect Attendance - Week 3</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ color: '#374151' }}>🎯 Math Master - Algebra Unit</p>
            </div>
            <button style={{ background: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
              View All
            </button>
          </div>
          
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>📊 Progress</h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>Track your learning progress</p>
            <div style={{ marginBottom: '10px' }}>
              <p style={{ color: '#374151', marginBottom: '5px' }}>Mathematics</p>
              <div style={{ background: '#e2e8f0', height: '8px', borderRadius: '4px' }}>
                <div style={{ background: '#1e40af', height: '100%', width: '85%', borderRadius: '4px' }}></div>
              </div>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>85%</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ color: '#374151', marginBottom: '5px' }}>Science</p>
              <div style={{ background: '#e2e8f0', height: '8px', borderRadius: '4px' }}>
                <div style={{ background: '#059669', height: '100%', width: '72%', borderRadius: '4px' }}></div>
              </div>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>72%</p>
            </div>
            <button style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingStudentDashboard;
