/**
 * Te Kete Ako Service Worker - Performance Optimized for Chromebooks
 * Provides offline functionality and intelligent caching for educational resources
 */

const CACHE_VERSION = 'tkako-v1.2.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const OFFLINE_CACHE = `${CACHE_VERSION}-offline`;

// Core resources that should be cached immediately
const STATIC_RESOURCES = [
    '/',
    '/index.html',
    '/offline.html',
    '/css/main.css',
    '/css/mobile-revolution.css',
    '/js/mobile-revolution.js',
    '/js/performance-cache-manager.js',
    '/js/auth-ui.js',
    '/manifest.json',
    '/icons/icon-192x192.png'
];

// Essential educational resources for offline access
const ESSENTIAL_RESOURCES = [
    '/handouts.html',
    '/lessons.html',
    '/games.html',
    '/subjects.html',
    '/handouts/treaty-of-waitangi-handout.html',
    '/handouts/haka-comprehension-handout.html',
    '/handouts/writers-toolkit-peel-argument-handout.html',
    '/games/te-reo-wordle.html',
    '/lessons/writers-toolkit/'
];

// Network-first resources (always try to get fresh content)
const NETWORK_FIRST_PATTERNS = [
    /\.netlify\/functions\//,
    /api\./,
    /supabase/,
    /googleapis/
];

// Cache-first resources (images, fonts, etc.)
const CACHE_FIRST_PATTERNS = [
    /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
    /\.(?:woff|woff2|ttf|eot)$/i,
    /fonts\.googleapis\.com/,
    /fonts\.gstatic\.com/
];

// Performance monitoring
let performanceMetrics = {
    cacheHits: 0,
    networkRequests: 0,
    offlineRequests: 0,
    totalRequests: 0,
    averageResponseTime: 0
};

/**
 * Install event - cache static resources immediately
 */
self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            // Cache static resources
            caches.open(STATIC_CACHE).then(cache => {
                return cache.addAll(STATIC_RESOURCES);
            }),
            
            // Cache essential educational resources
            caches.open(OFFLINE_CACHE).then(cache => {
                return cache.addAll(ESSENTIAL_RESOURCES.map(url => {
                    return new Request(url, { 
                        cache: 'reload',
                        headers: {
                            'Cache-Control': 'no-cache'
                        }
                    });
                })).catch(err => {
                    console.warn('Some essential resources failed to cache:', err);
                });
            }),
            
            // Skip waiting to activate immediately
            self.skipWaiting()
        ])
    );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => cacheName.startsWith('tkako-') && !cacheName.includes(CACHE_VERSION))
                        .map(cacheName => {
                            return caches.delete(cacheName);
                        })
                );
            }),
            
            // Take control of all pages immediately
            self.clients.claim()
        ])
    );
});

/**
 * Fetch event - intelligent caching strategy
 */
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    performanceMetrics.totalRequests++;
    
    event.respondWith(
        handleRequest(request)
            .then(response => {
                updatePerformanceMetrics(response);
                return response;
            })
            .catch(error => {
                console.warn('Request failed:', request.url, error);
                return handleOfflineRequest(request);
            })
    );
});

/**
 * Handle request with appropriate caching strategy
 */
async function handleRequest(request) {
    const url = new URL(request.url);
    const startTime = Date.now();
    
    // Network-first for API calls and dynamic content
    if (isNetworkFirst(url)) {
        return await networkFirstStrategy(request);
    }
    
    // Cache-first for static assets
    if (isCacheFirst(url)) {
        return await cacheFirstStrategy(request);
    }
    
    // Stale-while-revalidate for HTML pages
    if (url.pathname.endsWith('.html') || url.pathname === '/') {
        return await staleWhileRevalidateStrategy(request);
    }
    
    // Default to network with cache fallback
    return await networkWithCacheFallbackStrategy(request);
}

/**
 * Network-first strategy for dynamic content
 */
async function networkFirstStrategy(request) {
    try {
        const networkResponse = await fetch(request);
        performanceMetrics.networkRequests++;
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // Fallback to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            performanceMetrics.cacheHits++;
            return cachedResponse;
        }
        throw error;
    }
}

/**
 * Cache-first strategy for static assets
 */
async function cacheFirstStrategy(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        performanceMetrics.cacheHits++;
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        performanceMetrics.networkRequests++;
        
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        throw error;
    }
}

/**
 * Stale-while-revalidate strategy for HTML content
 */
async function staleWhileRevalidateStrategy(request) {
    const cachedResponse = await caches.match(request);
    
    const networkPromise = fetch(request)
        .then(networkResponse => {
            if (networkResponse.ok && networkResponse.body) {
                const cache = caches.open(DYNAMIC_CACHE);
                cache.then(cache => cache.put(request, networkResponse.clone()));
            }
            return networkResponse.clone();
        })
        .catch(() => null);
    
    if (cachedResponse) {
        performanceMetrics.cacheHits++;
        // Return cached version immediately, update in background
        networkPromise.then(() => {}); // Background update
        return cachedResponse;
    }
    
    // If no cache, wait for network
    const networkResponse = await networkPromise;
    if (networkResponse) {
        performanceMetrics.networkRequests++;
        return networkResponse;
    }
    
    throw new Error('Network and cache both failed');
}

/**
 * Network with cache fallback strategy
 */
async function networkWithCacheFallbackStrategy(request) {
    try {
        const networkResponse = await fetch(request);
        performanceMetrics.networkRequests++;
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            performanceMetrics.cacheHits++;
            return cachedResponse;
        }
        throw error;
    }
}

/**
 * Handle offline requests
 */
async function handleOfflineRequest(request) {
    const url = new URL(request.url);
    performanceMetrics.offlineRequests++;
    
    // For HTML pages, return offline page
    if (request.headers.get('accept').includes('text/html')) {
        const offlinePage = await caches.match('/offline.html');
        return offlinePage || new Response('Offline - Please check your connection', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
    
    // For other resources, return a minimal response
    return new Response('Resource unavailable offline', {
        status: 503,
        statusText: 'Service Unavailable'
    });
}

/**
 * Check if request should use network-first strategy
 */
function isNetworkFirst(url) {
    return NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url.href));
}

/**
 * Check if request should use cache-first strategy
 */
function isCacheFirst(url) {
    return CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url.href));
}

/**
 * Update performance metrics
 */
function updatePerformanceMetrics(response) {
    if (response && response.ok) {
        // Could track response times here if needed
    }
}

/**
 * Background sync for improved offline experience
 */
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Prefetch popular resources when online
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const popularResources = [
            '/handouts/treaty-of-waitangi-handout.html',
            '/handouts/haka-comprehension-handout.html',
            '/games/te-reo-wordle.html'
        ];
        
        await Promise.all(
            popularResources.map(url => 
                fetch(url).then(response => {
                    if (response.ok) {
                        return cache.put(url, response);
                    }
                }).catch(() => {
                    // Ignore failures during background sync
                })
            )
        );
        
        } catch (error) {
        console.warn('Background sync failed:', error);
    }
}

/**
 * Message handler for cache management
 */
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'GET_PERFORMANCE_METRICS') {
        event.ports[0].postMessage(performanceMetrics);
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHES') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => cacheName.startsWith('tkako-'))
                        .map(cacheName => caches.delete(cacheName))
                );
            }).then(() => {
                event.ports[0].postMessage({ success: true });
            })
        );
    }
});

