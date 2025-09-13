import React from 'react';

const TestSimple: React.FC = () => {
  return (
    <div /* TODO: Move to external CSS */ style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧪 Simple Test Component</h1>
      <p>If you can see this, React is working!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
};

export default TestSimple;
