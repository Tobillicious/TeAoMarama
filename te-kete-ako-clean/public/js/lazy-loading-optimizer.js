/**
 * Lazy Loading Optimizer for Te Kete Ako
 * Optimized for Chromebook performance and slow internet connections
 * Implements intelligent image loading, content prioritization, and bandwidth adaptation
 */

class LazyLoadingOptimizer {
    constructor(options = {}) {
        this.config = {
            rootMargin: options.rootMargin || '50px',
            threshold: options.threshold || 0.1,
            enableWebP: options.enableWebP !== false,
            enableBandwidthDetection: options.enableBandwidthDetection !== false,
            enablePrefetch: options.enablePrefetch !== false,
            debugMode: options.debugMode || false,
            placeholderColor: options.placeholderColor || '#f0f0f0',
            fadeInDuration: options.fadeInDuration || 300
        };

        this.observer = null;
        this.networkSpeed = 'fast'; // fast, slow, offline
        this.imageQueue = new Set();
        this.loadedImages = new Set();
        
        this.init();
    }

    /**
     * Initialize the lazy loading system
     */
    init() {
        if ('IntersectionObserver' in window) {
            this.setupObserver();
        } else {
            // Fallback for older browsers
            this.fallbackLazyLoad();
        }

        if (this.config.enableBandwidthDetection) {
            this.detectNetworkSpeed();
        }

        this.setupImageOptimization();
        this.setupContentPrioritization();
        
        // Start observing existing images
        this.observeImages();
        
        if (this.config.debugMode) {
            console.log('🚀 Lazy loading optimizer initialized');
        }
    }

    /**
     * Setup intersection observer for lazy loading
     */
    setupObserver() {
        const observerOptions = {
            root: null,
            rootMargin: this.config.rootMargin,
            threshold: this.config.threshold
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
    }

    /**
     * Observe all images on the page
     */
    observeImages() {
        const images = document.querySelectorAll('img[data-src], img[data-srcset]');
        const backgrounds = document.querySelectorAll('[data-bg-src]');
        
        images.forEach(img => {
            this.setupImagePlaceholder(img);
            if (this.observer) {
                this.observer.observe(img);
            }
        });

        backgrounds.forEach(el => {
            if (this.observer) {
                this.observer.observe(el);
            }
        });

        if (this.config.debugMode) {
            console.log(`📸 Observing ${images.length} images and ${backgrounds.length} background elements`);
        }
    }

    /**
     * Setup image placeholder with loading animation
     */
    setupImagePlaceholder(img) {
        if (img.dataset.placeholderSetup) return;

        const placeholder = this.createPlaceholder(img);
        img.style.background = `${this.config.placeholderColor} url("data:image/svg+xml,${encodeURIComponent(placeholder)}") center/cover no-repeat`;
        img.style.minHeight = '100px';
        img.dataset.placeholderSetup = 'true';
    }

    /**
     * Create SVG placeholder with loading animation
     */
    createPlaceholder(img) {
        const width = img.dataset.width || 400;
        const height = img.dataset.height || 300;
        
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <rect width="100%" height="100%" fill="${this.config.placeholderColor}"/>
            <rect x="20%" y="40%" width="60%" height="4" fill="#ddd" rx="2">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
            </rect>
            <rect x="20%" y="50%" width="40%" height="4" fill="#ddd" rx="2">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="0.5s" repeatCount="indefinite"/>
            </rect>
            <circle cx="50%" cy="30%" r="15" fill="#ddd">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="1s" repeatCount="indefinite"/>
            </circle>
        </svg>`;
    }

    /**
     * Load image with optimization based on network conditions
     */
    async loadImage(element) {
        const isImg = element.tagName === 'IMG';
        const src = element.dataset.src;
        const srcset = element.dataset.srcset;
        const bgSrc = element.dataset.bgSrc;

        if (!src && !srcset && !bgSrc) return;

        try {
            let optimizedSrc = src || bgSrc;
            
            // Apply network-based optimizations
            if (this.networkSpeed === 'slow') {
                optimizedSrc = this.getOptimizedImageUrl(optimizedSrc, 'low');
            } else if (this.networkSpeed === 'fast') {
                optimizedSrc = this.getOptimizedImageUrl(optimizedSrc, 'high');
            }

            const startTime = performance.now();
            
            if (isImg) {
                await this.loadImageElement(element, optimizedSrc, srcset);
            } else {
                await this.loadBackgroundImage(element, optimizedSrc);
            }

            const loadTime = performance.now() - startTime;
            this.trackImagePerformance(optimizedSrc, loadTime);
            
            this.loadedImages.add(element);
            
            if (this.config.debugMode) {
                console.log(`✅ Image loaded in ${loadTime.toFixed(2)}ms:`, optimizedSrc);
            }
        } catch (error) {
            console.warn('Failed to load image:', error);
            this.handleImageError(element);
        }
    }

    /**
     * Load image element with fade-in animation
     */
    loadImageElement(img, src, srcset) {
        return new Promise((resolve, reject) => {
            const tempImg = new Image();
            
            tempImg.onload = () => {
                img.src = src;
                if (srcset) img.srcset = srcset;
                
                // Fade in animation
                img.style.opacity = '0';
                img.style.transition = `opacity ${this.config.fadeInDuration}ms ease-in-out`;
                
                requestAnimationFrame(() => {
                    img.style.opacity = '1';
                    img.style.background = 'none';
                });
                
                resolve();
            };
            
            tempImg.onerror = reject;
            tempImg.src = src;
        });
    }

    /**
     * Load background image
     */
    loadBackgroundImage(element, src) {
        return new Promise((resolve, reject) => {
            const tempImg = new Image();
            
            tempImg.onload = () => {
                element.style.backgroundImage = `url(${src})`;
                element.style.opacity = '0';
                element.style.transition = `opacity ${this.config.fadeInDuration}ms ease-in-out`;
                
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                });
                
                resolve();
            };
            
            tempImg.onerror = reject;
            tempImg.src = src;
        });
    }

    /**
     * Get optimized image URL based on network conditions and device
     */
    getOptimizedImageUrl(src, quality = 'medium') {
        if (!src || src.startsWith('data:')) return src;

        // Simple quality-based optimization
        const params = new URLSearchParams();
        
        switch (quality) {
            case 'low':
                params.set('w', '400');
                params.set('q', '60');
                break;
            case 'medium':
                params.set('w', '800');
                params.set('q', '75');
                break;
            case 'high':
                params.set('w', '1200');
                params.set('q', '85');
                break;
        }

        // Add WebP support if available
        if (this.config.enableWebP && this.supportsWebP()) {
            params.set('f', 'webp');
        }

        // For external services that support URL-based optimization
        if (src.includes('unsplash') || src.includes('cloudinary') || src.includes('imgix')) {
            const separator = src.includes('?') ? '&' : '?';
            return `${src}${separator}${params.toString()}`;
        }

        return src;
    }

    /**
     * Check WebP support
     */
    supportsWebP() {
        if (this._webpSupport !== undefined) return this._webpSupport;
        
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, 1, 1);
        this._webpSupport = canvas.toDataURL('image/webp').startsWith('data:image/webp');
        
        return this._webpSupport;
    }

    /**
     * Detect network speed for adaptive loading
     */
    detectNetworkSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            const updateNetworkSpeed = () => {
                if (connection.effectiveType === '4g') {
                    this.networkSpeed = 'fast';
                } else if (connection.effectiveType === '3g' || connection.effectiveType === '2g') {
                    this.networkSpeed = 'slow';
                } else {
                    this.networkSpeed = 'medium';
                }
                
                if (this.config.debugMode) {
                    console.log(`🌐 Network speed detected: ${this.networkSpeed} (${connection.effectiveType})`);
                }
            };
            
            updateNetworkSpeed();
            connection.addEventListener('change', updateNetworkSpeed);
        } else {
            // Fallback: measure load time of a small image
            this.measureNetworkSpeed();
        }
    }

    /**
     * Measure network speed using a small test image
     */
    measureNetworkSpeed() {
        const testImage = new Image();
        const startTime = performance.now();
        
        testImage.onload = () => {
            const loadTime = performance.now() - startTime;
            
            if (loadTime < 100) {
                this.networkSpeed = 'fast';
            } else if (loadTime < 300) {
                this.networkSpeed = 'medium';
            } else {
                this.networkSpeed = 'slow';
            }
            
            if (this.config.debugMode) {
                console.log(`🌐 Network speed measured: ${this.networkSpeed} (${loadTime.toFixed(2)}ms)`);
            }
        };
        
        // Use a small 1x1 transparent pixel
        testImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }

    /**
     * Setup content prioritization based on viewport
     */
    setupContentPrioritization() {
        const criticalImages = document.querySelectorAll('.hero img, .featured img, [data-priority="high"]');
        
        criticalImages.forEach(img => {
            if (img.dataset.src) {
                this.loadImage(img);
            }
        });
    }

    /**
     * Setup image optimization features
     */
    setupImageOptimization() {
        // Preload critical images
        const criticalImages = document.querySelectorAll('[data-preload="true"]');
        criticalImages.forEach(img => {
            if (img.dataset.src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.dataset.src;
                document.head.appendChild(link);
            }
        });
    }

    /**
     * Handle image loading errors
     */
    handleImageError(element) {
        element.style.background = `${this.config.placeholderColor} url("data:image/svg+xml,${encodeURIComponent(this.getErrorPlaceholder())}") center/cover no-repeat`;
        
        if (element.tagName === 'IMG') {
            element.alt = element.alt || 'Image failed to load';
        }
    }

    /**
     * Get error placeholder SVG
     */
    getErrorPlaceholder() {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
            <rect width="100%" height="100%" fill="#f0f0f0"/>
            <text x="50%" y="50%" text-anchor="middle" fill="#999" font-family="Arial, sans-serif" font-size="14">
                Image unavailable
            </text>
        </svg>`;
    }

    /**
     * Track image performance metrics
     */
    trackImagePerformance(src, loadTime) {
        if (!window.imageMetrics) {
            window.imageMetrics = {
                totalImages: 0,
                totalLoadTime: 0,
                errors: 0
            };
        }

        window.imageMetrics.totalImages++;
        window.imageMetrics.totalLoadTime += loadTime;
    }

    /**
     * Fallback lazy loading for browsers without IntersectionObserver
     */
    fallbackLazyLoad() {
        const images = document.querySelectorAll('img[data-src], [data-bg-src]');
        
        const lazyLoad = () => {
            images.forEach(element => {
                if (this.isInViewport(element) && !this.loadedImages.has(element)) {
                    this.loadImage(element);
                }
            });
        };

        // Load images on scroll and resize with throttling
        let ticking = false;
        const scrollListener = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    lazyLoad();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollListener);
        window.addEventListener('resize', scrollListener);
        window.addEventListener('orientationchange', scrollListener);
        
        // Initial load
        lazyLoad();
    }

    /**
     * Check if element is in viewport (fallback method)
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const margin = 50; // Match rootMargin
        
        return (
            rect.top >= -margin &&
            rect.left >= -margin &&
            rect.bottom <= window.innerHeight + margin &&
            rect.right <= window.innerWidth + margin
        );
    }

    /**
     * Get performance statistics
     */
    getPerformanceStats() {
        const metrics = window.imageMetrics || { totalImages: 0, totalLoadTime: 0, errors: 0 };
        const averageLoadTime = metrics.totalImages > 0 ? metrics.totalLoadTime / metrics.totalImages : 0;
        
        return {
            totalImages: metrics.totalImages,
            averageLoadTime: Math.round(averageLoadTime),
            errors: metrics.errors,
            networkSpeed: this.networkSpeed,
            webpSupported: this.supportsWebP()
        };
    }

    /**
     * Refresh observer for dynamically added images
     */
    refresh() {
        this.observeImages();
        
        if (this.config.debugMode) {
            console.log('🔄 Lazy loading observer refreshed');
        }
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.lazyLoader = new LazyLoadingOptimizer({ debugMode: true });
    });
} else {
    window.lazyLoader = new LazyLoadingOptimizer({ debugMode: true });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LazyLoadingOptimizer;
} else if (typeof window !== 'undefined') {
    window.LazyLoadingOptimizer = LazyLoadingOptimizer;
}