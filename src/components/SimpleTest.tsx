import React from 'react';

const SimpleTest: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'red', color: 'white' }}>
      <h1>🚨 SIMPLE TEST - IF YOU SEE THIS, REACT IS WORKING! 🚨</h1>
      <p>Current URL: {window.location.pathname}</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default SimpleTest;
