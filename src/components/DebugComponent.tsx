import React from 'react';

const DebugComponent: React.FC = () => {
  console.log('DebugComponent rendering!');
  
  return (
    <div style={{ 
      padding: '20px', 
      background: 'red', 
      color: 'white', 
      fontSize: '24px',
      minHeight: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 9999
    }}>
      <h1>🚨 DEBUG: Component Rendered Successfully! 🚨</h1>
      <p>If you can see this, React is working</p>
      <p>Time: {new Date().toISOString()}</p>
      <p>Browser: {navigator.userAgent}</p>
    </div>
  );
};

export default DebugComponent;