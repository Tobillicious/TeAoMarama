import React from 'react';
import { createRoot } from 'react-dom/client';

console.log('🧪 Test React script starting...');

// Test if React is available
console.log('React available:', React);

// Test if we can find the root element
const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

if (rootElement) {
  console.log('🚀 Creating React root...');
  const root = createRoot(rootElement);
  console.log('✅ React root created:', root);

  console.log('🎨 Rendering test component...');
  root.render(
    <div /* TODO: Move to external CSS */ style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <h1 /* TODO: Move to external CSS */ style={{ color: '#1e40af' }}>🧪 React Test</h1>
      <p /* TODO: Move to external CSS */ style={{ fontSize: '1.2rem' }}>✅ React is working!</p>
      <p /* TODO: Move to external CSS */ style={{ color: '#059669' }}>📚 TeAoMarama Platform</p>
      <p /* TODO: Move to external CSS */ style={{ color: '#7c3aed' }}>🤖 GLM-4.5 and Z1 models ready</p>
      <p /* TODO: Move to external CSS */ style={{ color: '#666' }}>⏰ {new Date().toLocaleString()}</p>
    </div>,
  );
  console.log('✅ Test component rendered!');
} else {
  console.error('❌ Root element not found!');
}
