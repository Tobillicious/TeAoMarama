import React from 'react';

const App: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🔄 System Restart Recovery</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Te Ao Mārama Platform</p>
        <div
          style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '20px',
            borderRadius: '15px',
            marginTop: '20px',
          }}
        >
          <h3 style={{ marginBottom: '10px' }}>✅ Recovery Status</h3>
          <p style={{ margin: 0 }}>React app successfully mounted after system restart</p>
        </div>
      </div>
    </div>
  );
};

export default App;
