import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App-Minimal-Working';
import './index.css';

console.log('🌿 Starting Te Ao Mārama Platform...');

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

console.log('✅ Te Ao Mārama Platform initialized');
