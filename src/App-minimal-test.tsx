import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>🚨 MINIMAL TEST APP 🚨</h1>
        <p>If you see this, React Router is working!</p>
        <Routes>
          <Route path="/" element={<div>HOME PAGE</div>} />
          <Route path="/supreme-overseer" element={<div>SUPREME OVERSEER PAGE</div>} />
          <Route path="/test" element={<div>TEST PAGE</div>} />
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
