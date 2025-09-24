import React from 'react';

const SimpleTestApp: React.FC = () => {
  return (
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
        }}
      >
        <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
          🚨 SITE AUDIT MODE
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.2rem', marginBottom: '30px' }}>
          React is working! The issue is with the complex App.tsx
        </p>
        <div
          style={{
            background: '#f3f4f6',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>🔍 Issues Found:</h3>
          <ul style={{ color: '#374151', textAlign: 'left' }}>
            <li>Complex component imports causing failures</li>
            <li>EducationContext may have initialization issues</li>
            <li>RealAssessmentBrowser/RealResourceBrowser imports failing</li>
            <li>Multiple lazy-loaded components causing bundle issues</li>
          </ul>
        </div>
        <p style={{ color: '#059669', fontWeight: 'bold' }}>
          ✅ React is functioning correctly - the problem is in the App architecture
        </p>
      </div>
    </div>
  );
};

export default SimpleTestApp;
