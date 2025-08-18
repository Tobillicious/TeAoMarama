import React from 'react';
import ReactDOM from 'react-dom/client';
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

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered successfully:', registration);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🔄 New version available');
                // You can show a notification to the user here
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('❌ Service Worker registration failed:', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
