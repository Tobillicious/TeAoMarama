import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'red', color: 'white', minHeight: '100vh' }}>
      <h1>🚨 SUPER SIMPLE TEST 🚨</h1>
      <p>Current URL: {window.location.pathname}</p>
      <p>If you see this, React is working!</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default App;
