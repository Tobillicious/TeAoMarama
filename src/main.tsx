import ReactDOM from 'react-dom/client';
import App from './App-systematic-development';

console.log('🌿 Starting Te Ao Mārama Platform...');

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
  console.log('✅ Te Ao Mārama Platform initialized');
} else {
  console.error('Root element not found!');
}
