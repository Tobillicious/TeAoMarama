import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#1e40af',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>👑 Test Component Working!</h1>
      <p>If you can see this, React is working correctly.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
};

export default TestComponent;
