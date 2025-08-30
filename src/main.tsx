import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { DualRoleAuthProvider } from './services/DualRoleAuthProvider';

// Core Web Vitals optimized performance monitoring
const performanceMonitor = {
  getMetrics: () => {
    if (typeof window === 'undefined') return null;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType('paint');

    return {
      ttfb: navigation ? navigation.responseStart - navigation.fetchStart : 0,
      fcp: paintEntries.find((entry) => entry.name === 'first-contentful-paint')?.startTime || 0,
      domContentLoaded: navigation
        ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
        : 0,
      loadComplete: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
    };
  },
  logVitals: () => {
    if (typeof window === 'undefined') return;

    // Use Web Vitals API for accurate measurements
    try {
      import('web-vitals')
        .then(({ onFCP, onLCP, onCLS, onTTFB }) => {
          onFCP((metric: { value: number }) => console.log('🎯 FCP:', metric.value, 'ms'));
          onLCP((metric: { value: number }) => console.log('🎯 LCP:', metric.value, 'ms'));
          onCLS((metric: { value: number }) => console.log('🎯 CLS:', metric.value));
          onTTFB((metric: { value: number }) => console.log('🎯 TTFB:', metric.value, 'ms'));
        })
        .catch(() => {
          // Fallback to basic performance measurement
          const metrics = performanceMonitor.getMetrics();
          console.log('📊 Performance Metrics:', metrics);
        });
    } catch {
      // Basic fallback
      console.log('⚡ Performance monitoring initialized');
    }
  },
};

// Optimized resource hints and prefetch
if (typeof window !== 'undefined') {
  // Preload critical routes after initial load
  window.addEventListener('load', () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Prefetch educational platform route (most common)
        import('./pages/EducationalPlatform').catch(() => {});
        // Prefetch critical components
        import('./components/Navigation').catch(() => {});
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        import('./pages/EducationalPlatform').catch(() => {});
      }, 1000);
    }

    // Log performance metrics after page is fully loaded
    setTimeout(() => performanceMonitor.logVitals(), 1000);
  });

  // Preload on user interaction
  let hasPreloaded = false;
  const preloadOnInteraction = () => {
    if (hasPreloaded) return;
    hasPreloaded = true;

    // Preload AI components only when user shows intent
    import('./utils/superintelligence').catch(() => {});
    import('./utils/performance-monitor').catch(() => {});
  };

  ['mousedown', 'touchstart', 'keydown'].forEach((event) => {
    window.addEventListener(event, preloadOnInteraction, { once: true, passive: true });
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

// Optimize initial render for Core Web Vitals
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Use concurrent features for better performance
root.render(
  <React.StrictMode>
    <DualRoleAuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DualRoleAuthProvider>
  </React.StrictMode>,
);

// Remove blocking initialization - moved to App.tsx with async loading
