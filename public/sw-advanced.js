
// Advanced Service Worker - Te Kura o TeAoMarama
// Intelligent caching and offline-first educational platform

const CACHE_NAME = 'teaomarama-v1.0.0';
const DYNAMIC_CACHE = 'teaomarama-dynamic-v1';

// Critical resources for offline education
const CRITICAL_RESOURCES = [
  '/',
  '/about',
  '/contact',
  '/migration-dashboard',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/manifest.json'
];

// Educational content caching strategy
const EDUCATIONAL_PATTERNS = [
  /\/resources\//,
  /\/handouts\//,
  /\/assessments\//,
  /\/cultural\//
];

// Intelligent caching with cultural priority
self.addEventListener('install', event => {
  console.log('🚀 TeAoMarama SW: Installing with cultural intelligence');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CRITICAL_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

// Cultural-aware fetch strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Priority caching for Māori content
  if (request.url.includes('maori') || request.url.includes('tikanga')) {
    event.respondWith(cacheFirstStrategy(request, 'cultural-priority'));
    return;
  }
  
  // Educational resources get stale-while-revalidate
  if (EDUCATIONAL_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
  
  // Default network-first for dynamic content
  event.respondWith(networkFirstStrategy(request));
});

async function cacheFirstStrategy(request, cacheName = CACHE_NAME) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;
  
  const networkResponse = await fetch(request);
  const cache = await caches.open(cacheName);
  cache.put(request, networkResponse.clone());
  return networkResponse;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const networkResponsePromise = fetch(request)
    .then(response => {
      cache.put(request, response.clone());
      return response;
    });
  
  return cachedResponse || networkResponsePromise;
}

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    return caches.match(request);
  }
}

console.log('🌿 TeAoMarama Service Worker: Cultural intelligence active');
