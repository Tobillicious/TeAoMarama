import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UltraSimpleHomepage from './components/UltraSimpleHomepage';
import TestComponent from './components/TestComponent';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header style={{ padding: '1rem', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          <h1>🌿 Te Ao Mārama Platform</h1>
          <nav style={{ marginTop: '1rem' }}>
            <a href="/" style={{ marginRight: '1rem', color: '#0066cc' }}>
              Home
            </a>
            <a href="/test" style={{ marginRight: '1rem', color: '#0066cc' }}>
              Test
            </a>
          </nav>
        </header>
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<UltraSimpleHomepage />} />
            <Route path="/test" element={<TestComponent />} />
            <Route path="*" element={<UltraSimpleHomepage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;