// Service Worker for Te Kete Ako - Warp 9 Performance
const CACHE_NAME = 'te-kete-ako-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.css',
  '/src/styles/critical.css',
  '/src/styles/globals.css',
  '/vite.svg',
];

// API endpoints to cache
const API_CACHE = ['/api/resources', '/api/assessments', '/api/activities'];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache static assets:', error);
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      }),
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle API requests with cache-first strategy
  if (API_CACHE.some((api) => url.pathname.startsWith(api))) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static assets with cache-first strategy
  if (STATIC_ASSETS.includes(url.pathname) || url.pathname.startsWith('/src/')) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  // Handle other requests with network-first strategy
  event.respondWith(handleNetworkFirstRequest(request));
});

// Cache-first strategy for static assets
async function handleStaticRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Static request failed:', error);
    return new Response('Offline - Static content not available', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

// Cache-first strategy for API requests
async function handleApiRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Return cached response but update in background
      fetch(request).then(async (response) => {
        if (response.ok) {
          const cache = await caches.open(DYNAMIC_CACHE);
          cache.put(request, response);
        }
      });
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('API request failed:', error);
    return new Response('Offline - API not available', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

// Network-first strategy for other requests
async function handleNetworkFirstRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Network request failed:', error);

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Perform background sync tasks
    console.log('Performing background sync...');

    // Example: Sync offline data
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      await syncOfflineData(offlineData);
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New content available!',
    icon: '/vite.svg',
    badge: '/vite.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'View Content',
        icon: '/vite.svg',
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/vite.svg',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification('Te Kete Ako', options));
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Utility functions
async function getOfflineData() {
  // Implementation for getting offline data
  return [];
}

async function syncOfflineData(data) {
  // Implementation for syncing offline data
  console.log('Syncing offline data:', data);
}

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
