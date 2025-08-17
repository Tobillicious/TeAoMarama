import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './services/AuthContext';
import { initPerformanceMonitoring, MemoryManager, ResourcePreloader } from './utils/performance';

// Initialize performance monitoring
const performanceMonitor = initPerformanceMonitoring();

// Performance optimization setup
const memoryManager = MemoryManager.getInstance();

// Preload critical resources
ResourcePreloader.preloadImage('/vite.svg');
ResourcePreloader.preloadStylesheet('/src/styles/critical.css');

// Setup memory cleanup
memoryManager.addCleanupTask(() => {
  // Cleanup tasks
});

// Performance analytics setup
if (typeof window !== 'undefined') {
  // Send initial performance data
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = performanceMonitor.getMetrics();
      console.log('🚀 Initial Performance Metrics:', metrics);
    }, 1000);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
