import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EducationProvider } from './contexts/EducationContext';

// Simple working homepage without complex dependencies
const SimpleHomepage = () => (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
    }}
  >
    <div
      style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '600px',
      }}
    >
      <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
        🌿 Te Ao Mārama
      </h1>
      <p style={{ color: '#6b7280', fontSize: '1.2rem', marginBottom: '30px' }}>
        Educational Resources Platform
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <div
          style={{
            background: '#f8fafc',
            padding: '20px',
            borderRadius: '15px',
            border: '2px solid #e2e8f0',
          }}
        >
          <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>📚 Resources</h3>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>5,000+ educational resources</p>
        </div>

        <div
          style={{
            background: '#f0f9ff',
            padding: '20px',
            borderRadius: '15px',
            border: '2px solid #0ea5e9',
          }}
        >
          <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>🎓 Teachers</h3>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>For NZ educators</p>
        </div>
      </div>

      <div
        style={{
          background: '#ecfdf5',
          padding: '20px',
          borderRadius: '15px',
          border: '2px solid #10b981',
        }}
      >
        <h3 style={{ color: '#059669', marginBottom: '10px' }}>✅ Platform Status</h3>
        <p style={{ color: '#047857', margin: 0 }}>
          React app is working! Complex components have been simplified to ensure stability.
        </p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <EducationProvider>
      <Routes>
        <Route path="/" element={<SimpleHomepage />} />
        <Route path="*" element={<SimpleHomepage />} />
      </Routes>
    </EducationProvider>
  );
};

export default App;
