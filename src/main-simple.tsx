import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('🌿 Starting Te Ao Mārama Platform (Simple)...');

// Try to find the root element
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (rootElement) {
  console.log('Root element found, creating root...');
  const root = ReactDOM.createRoot(rootElement);

  console.log('Root created, attempting render...');

  // Try to render a simple div
  root.render(
    React.createElement(
      'div',
      {
        style: {
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          color: 'white',
          fontSize: '2rem',
          textAlign: 'center',
          padding: '40px',
        },
      },
      '🔄 Simple React Test - Te Ao Mārama Platform',
    ),
  );

  console.log('Render completed');
} else {
  console.error('Root element not found!');
}

console.log('✅ Te Ao Mārama Platform initialized (Simple)');
