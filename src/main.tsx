import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { initializeSuperintelligence } from './utils/superintelligence';

// Simple performance monitoring
const performanceMonitor = {
  getMetrics: () => ({
    fcp: performance.now(),
    lcp: performance.now(),
    fid: 0,
    cls: 0,
    ttfb: 0,
    fmp: 0,
  }),
};

// Performance analytics setup
if (typeof window !== 'undefined') {
  // Send initial performance data
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.getMetrics();
    }, 1000);
  });
}

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // You can show a notification to the user here
              }
            });
          }
        });
      })
      .catch(() => {
        // Service worker registration failed
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// Initialize superintelligence after root mounts to avoid blocking first paint
if (typeof window !== 'undefined') {
  // Use env-driven defaults; override here as needed
  initializeSuperintelligence();
}
