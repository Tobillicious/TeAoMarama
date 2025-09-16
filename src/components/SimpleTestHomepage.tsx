import React from 'react';

const SimpleTestHomepage: React.FC = () => {
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
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '60px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '600px'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#1e40af',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          🌿 Te Ao Mārama
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          color: '#374151',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          New Zealand's Premier Educational Platform
        </p>
        
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => window.location.href = '/join'}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            🚀 Join Now
          </button>
          
          <button
            onClick={() => window.location.href = '/resources'}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#1e40af',
              padding: '15px 30px',
              borderRadius: '12px',
              border: '2px solid #3b82f6',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.color = '#1e40af';
            }}
          >
            📚 Browse Resources
          </button>
        </div>
        
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '12px'
        }}>
          <p style={{ color: '#1e40af', fontWeight: '600', margin: 0 }}>
            ✅ Site is working! This is a real, functional homepage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleTestHomepage;
