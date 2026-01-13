import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Simple test component
const TestComponent = () => {
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
      <h1>👑 Debug App Working!</h1>
      <p>React is functioning correctly.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
};

const App: React.FC = () => {
  console.log('App component rendering...');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestComponent />} />
        <Route path="/test" element={<TestComponent />} />
        <Route path="*" element={<TestComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
