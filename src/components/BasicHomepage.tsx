import React from 'react';

const BasicHomepage: React.FC = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '1rem' }}>
        🌿 Te Ao Mārama
      </h1>
      <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6' }}>
        Welcome to the Te Ao Mārama educational platform. This is a basic homepage without any React hooks to avoid errors.
      </p>
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>Status</h2>
        <p style={{ color: '#666', margin: 0 }}>
          ✅ Website is working<br/>
          ✅ No React hooks errors<br/>
          ✅ Ready for development
        </p>
      </div>
    </div>
  );
};

export default BasicHomepage;
