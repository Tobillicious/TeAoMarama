// Service Worker for Mangakōtukutuku College Platform
// Provides offline functionality and content caching

const CACHE_NAME = 'mangakotukutuku-college-v1';
const STATIC_CACHE = 'static-v1';
const CONTENT_CACHE = 'content-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/src/pages/LandingPage.css',
  '/src/components/UnifiedContentDiscovery.css',
  '/src/components/ContentPreviewModal.css',
  '/src/components/TeKeteAkoResourceExplorer.css',
  '/src/components/ProfessionalLessonTemplate.css'
];

// Content files to cache
const CONTENT_FILES = [
  '/resources/te-kete-ako-clean/math_worksheets/',
  '/resources/te-kete-ako-clean/dist/units/urds/',
  '/resources/te-kete-ako-clean/dist/guided-inquiry-unit/',
  '/resources/toolkits/',
  '/resources/deepseek-generated/',
  '/resources/games/'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Caching static files...');
        return cache.addAll(STATIC_FILES);
      }),
      caches.open(CONTENT_CACHE).then((cache) => {
        console.log('Content cache ready...');
        return Promise.resolve();
      })
    ])
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== CONTENT_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all clients immediately
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // Handle different types of requests
  if (isStaticFile(request)) {
    event.respondWith(handleStaticRequest(request));
  } else if (isContentFile(request)) {
    event.respondWith(handleContentRequest(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request));
  } else {
    event.respondWith(handlePageRequest(request));
  }
});

// Check if request is for static files
function isStaticFile(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/);
}

// Check if request is for content files
function isContentFile(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/resources/') || url.pathname.endsWith('.md');
}

// Check if request is for API
function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/');
}

// Handle static file requests
async function handleStaticRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fetch from network
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Static request failed:', error);
    return new Response('Offline - Static file not available', { status: 503 });
  }
}

// Handle content file requests
async function handleContentRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fetch from network
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CONTENT_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Content request failed:', error);
    
    // Return offline page for content
    return new Response(
      JSON.stringify({
        error: 'Content not available offline',
        message: 'This content requires an internet connection'
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle API requests
async function handleAPIRequest(request) {
  try {
    // Always try network first for API requests
    const networkResponse = await fetch(request);
    
    // Cache successful GET responses
    if (networkResponse.ok && request.method === 'GET') {
      const cache = await caches.open(CONTENT_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('API request failed:', error);
    
    // Try cache for GET requests
    if (request.method === 'GET') {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    return new Response(
      JSON.stringify({
        error: 'API not available offline',
        message: 'This feature requires an internet connection'
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle page requests
async function handlePageRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Page request failed:', error);
    
    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    const offlinePage = await caches.match('/');
    if (offlinePage) {
      return offlinePage;
    }
    
    return new Response('Offline - Page not available', { status: 503 });
  }
}

// Background sync for content updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent());
  }
});

// Sync content in background
async function syncContent() {
  try {
    console.log('Syncing content in background...');
    
    // Update content cache with latest resources
    const cache = await caches.open(CONTENT_CACHE);
    
    // Add new content files to cache
    for (const contentPath of CONTENT_FILES) {
      try {
        const response = await fetch(contentPath);
        if (response.ok) {
          await cache.put(contentPath, response);
        }
      } catch (error) {
        console.warn('Failed to sync content:', contentPath, error);
      }
    }
    
    console.log('Content sync completed');
  } catch (error) {
    console.error('Content sync failed:', error);
  }
}

// Push notifications for content updates
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'New content available',
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      tag: 'content-update',
      actions: [
        {
          action: 'view',
          title: 'View Content',
          icon: '/icon-192x192.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Mangakōtukutuku College', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/unified-content-discovery')
    );
  }
});

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_CONTENT') {
    const { content } = event.data;
    cacheContent(content);
  } else if (event.data && event.data.type === 'CLEAR_CACHE') {
    clearAllCaches();
  }
});

// Cache content programmatically
async function cacheContent(content) {
  try {
    const cache = await caches.open(CONTENT_CACHE);
    await cache.put(content.url, content.response);
    console.log('Content cached:', content.url);
  } catch (error) {
    console.error('Failed to cache content:', error);
  }
}

// Clear all caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
  } catch (error) {
    console.error('Failed to clear caches:', error);
  }
}