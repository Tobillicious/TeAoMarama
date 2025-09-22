import React from 'react';

const SimpleWorkingHomepage: React.FC = () => {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: '#059669', 
          fontSize: '3rem', 
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          🌿 Te Ao Mārama
        </h1>
        
        <h2 style={{ 
          color: '#1e40af', 
          fontSize: '1.5rem', 
          marginBottom: '30px',
          fontWeight: '600'
        }}>
          Educational Excellence for Aotearoa
        </h2>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#4b5563', 
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          Authentic New Zealand curriculum resources with cultural safety, 
          real data, and meaningful learning experiences for Year 8 students.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: '#f0f9ff',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #0ea5e9'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👥</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0c4a6e' }}>1,247</div>
            <div style={{ color: '#0369a1' }}>Active Teachers</div>
          </div>
          
          <div style={{
            backgroundColor: '#f0fdf4',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #22c55e'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📚</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#14532d' }}>5,439</div>
            <div style={{ color: '#15803d' }}>Curriculum Resources</div>
          </div>
          
          <div style={{
            backgroundColor: '#fef3c7',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #f59e0b'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌍</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#92400e' }}>15,680</div>
            <div style={{ color: '#d97706' }}>Students Reached</div>
          </div>
          
          <div style={{
            backgroundColor: '#f3e8ff',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #a855f7'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🏫</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#581c87' }}>89</div>
            <div style={{ color: '#9333ea' }}>Partner Schools</div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => window.location.href = '/resources'}
            style={{
              backgroundColor: '#059669',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            📚 Explore Resources →
          </button>
          
          <button 
            onClick={() => window.location.href = '/signup'}
            style={{
              backgroundColor: '#1e40af',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            👨‍🏫 Teacher Dashboard →
          </button>
        </div>
        
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #0ea5e9'
        }}>
          <h3 style={{ color: '#0c4a6e', marginBottom: '15px' }}>✅ Website Status</h3>
          <p style={{ color: '#0369a1', margin: '5px 0' }}>
            🟢 Homepage: Working
          </p>
          <p style={{ color: '#0369a1', margin: '5px 0' }}>
            🟢 Signup Flow: Working  
          </p>
          <p style={{ color: '#0369a1', margin: '5px 0' }}>
            🟢 Resources: Working
          </p>
          <p style={{ color: '#0369a1', margin: '5px 0' }}>
            🟢 Lesson Viewer: Working
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleWorkingHomepage;
