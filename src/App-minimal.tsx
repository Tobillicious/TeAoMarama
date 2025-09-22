import React from 'react';
import { Routes, Route } from 'react-router-dom';

const MinimalHomepage = () => {
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
        <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
          🌿 Te Ao Mārama
        </h1>
        <p style={{ color: '#374151', fontSize: '1.2rem', marginBottom: '30px' }}>
          New Zealand's Educational Platform - WORKING!
        </p>
        <button
          onClick={() => window.location.href = '/join'}
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '1.1rem',
            cursor: 'pointer'
          }}
        >
          🚀 Join Now
        </button>
        <div style={{ marginTop: '20px', color: '#059669', fontWeight: 'bold' }}>
          ✅ THIS IS REAL CONTENT FOR HUMANS!
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MinimalHomepage />} />
        <Route path="*" element={<MinimalHomepage />} />
      </Routes>
    </div>
  );
}

export default App;

