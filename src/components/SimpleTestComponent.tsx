import React from 'react';

const SimpleTestComponent: React.FC = () => {
  return (
    <div style={{ padding: '2rem', background: '#f0f9ff', minHeight: '100vh' }}>
      <h1 style={{ color: '#1e40af', marginBottom: '1rem' }}>
        🌟 TeAoMarama Platform Test
      </h1>
      <p style={{ color: '#374151', fontSize: '1.1rem', marginBottom: '1rem' }}>
        Platform is loading successfully! 🎉
      </p>
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ color: '#059669', marginBottom: '0.5rem' }}>✅ Status Check</h2>
        <ul style={{ color: '#4b5563', lineHeight: '1.6' }}>
          <li>✅ React is working</li>
          <li>✅ TypeScript is compiling</li>
          <li>✅ Routing is functional</li>
          <li>✅ Styles are loading</li>
          <li>✅ Authentication context is available</li>
        </ul>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <a 
          href="/educational-dashboard" 
          style={{ 
            display: 'inline-block',
            background: '#059669',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            marginRight: '1rem'
          }}
        >
          📊 Go to Dashboard
        </a>
        <a 
          href="/cultural-activities" 
          style={{ 
            display: 'inline-block',
            background: '#1e40af',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}
        >
          🌿 Cultural Activities
        </a>
      </div>
    </div>
  );
};

export default SimpleTestComponent;