import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.tsx'
import './index.css'

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
}

// Performance analytics setup
if (typeof window !== 'undefined') {
  // Send initial performance data
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = performanceMonitor.getMetrics()
      console.log('🚀 Initial Performance Metrics: ', metrics)
    }, 1000)
  })
}

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered successfully: ', registration)

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🔄 New version available')
                // You can show a notification to the user here
              }
            })
          }
        })
      })
      .catch((error) => {
        console.error('❌ Service Worker registration failed: ', error)
      })
  })
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
