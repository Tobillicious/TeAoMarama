/**
 * Image Optimization System for Te Kete Ako
 * Handles lazy loading, compression, and responsive images for educational content
 */

class ImageOptimizer {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        
        this.supportedFormats = {
            webp: this.supportsWebP(),
            avif: this.supportsAVIF()
        };
        
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.optimizeExistingImages();
        this.setupResponsiveImages();
        this.preloadCriticalImages();
        this.setupImageErrorHandling();
    }

    setupLazyLoading() {
        // Use native lazy loading if supported, otherwise use Intersection Observer
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
                img.loading = 'lazy';
                img.removeAttribute('data-src');
            });
        } else {
            this.setupIntersectionObserver();
        }
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, this.observerOptions);

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // Create optimized source URL
        const optimizedSrc = this.getOptimizedImageUrl(src, img);
        
        // Create new image element to test loading
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            img.src = optimizedSrc;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            
            // Trigger custom event for tracking
            img.dispatchEvent(new CustomEvent('imageLoaded', {
                detail: { originalSrc: src, optimizedSrc: optimizedSrc }
            }));
        };
        
        imageLoader.onerror = () => {
            // Fallback to original source
            img.src = src;
            img.classList.add('error');
            console.warn('[Image] Failed to load optimized image, using fallback:', src);
        };
        
        imageLoader.src = optimizedSrc;
    }

    getOptimizedImageUrl(src, img) {
        // Get container dimensions for responsive sizing
        const container = img.parentElement;
        const containerWidth = container ? container.offsetWidth : img.width || 800;
        const devicePixelRatio = window.devicePixelRatio || 1;
        const targetWidth = Math.ceil(containerWidth * devicePixelRatio);
        
        // Choose best format based on browser support
        let format = 'jpg';
        if (this.supportedFormats.avif && this.shouldUseAVIF(src)) {
            format = 'avif';
        } else if (this.supportedFormats.webp && this.shouldUseWebP(src)) {
            format = 'webp';
        }
        
        // For educational content, we'll use URL parameters to request optimized versions
        // In a production environment, this would integrate with a CDN or image service
        const url = new URL(src, window.location.origin);
        
        // Add optimization parameters
        url.searchParams.set('w', targetWidth);
        url.searchParams.set('q', this.getOptimalQuality(img));
        url.searchParams.set('f', format);
        
        return url.toString();
    }

    getOptimalQuality(img) {
        // Determine quality based on connection speed and content type
        const connection = navigator.connection;
        let baseQuality = 85;
        
        if (connection) {
            switch (connection.effectiveType) {
                case 'slow-2g':
                case '2g':
                    baseQuality = 60;
                    break;
                case '3g':
                    baseQuality = 75;
                    break;
                case '4g':
                    baseQuality = 90;
                    break;
            }
        }
        
        // Adjust quality based on image context
        if (img.classList.contains('hero-image') || img.classList.contains('featured-image')) {
            return Math.min(baseQuality + 10, 95);
        }
        
        if (img.classList.contains('thumbnail') || img.classList.contains('icon')) {
            return Math.max(baseQuality - 15, 50);
        }
        
        return baseQuality;
    }

    optimizeExistingImages() {
        const images = document.querySelectorAll('img:not([data-optimized])');
        
        images.forEach(img => {
            // Add loading attribute for browser-native lazy loading
            if (!img.hasAttribute('loading') && !this.isCriticalImage(img)) {
                img.loading = 'lazy';
            }
            
            // Add proper dimensions to prevent layout shift
            if (!img.width && !img.height && !img.style.width && !img.style.height) {
                this.addImageDimensions(img);
            }
            
            // Add error handling
            if (!img.onerror) {
                img.onerror = () => this.handleImageError(img);
            }
            
            img.dataset.optimized = 'true';
        });
    }

    addImageDimensions(img) {
        // If we can't determine dimensions, add a default aspect ratio
        if (!img.naturalWidth && !img.complete) {
            img.onload = () => {
                if (!img.style.aspectRatio && img.naturalWidth && img.naturalHeight) {
                    img.style.aspectRatio = `${img.naturalWidth}/${img.naturalHeight}`;
                }
            };
        } else if (img.naturalWidth && img.naturalHeight) {
            img.style.aspectRatio = `${img.naturalWidth}/${img.naturalHeight}`;
        } else {
            // Default aspect ratio for educational images
            img.style.aspectRatio = '16/9';
        }
    }

    setupResponsiveImages() {
        const images = document.querySelectorAll('img[data-responsive]');
        
        images.forEach(img => {
            const breakpoints = [320, 640, 960, 1280, 1920];
            const srcset = breakpoints.map(width => {
                const optimizedUrl = this.getOptimizedImageUrl(img.src || img.dataset.src, img);
                const url = new URL(optimizedUrl);
                url.searchParams.set('w', width);
                return `${url.toString()} ${width}w`;
            }).join(', ');
            
            img.srcset = srcset;
            img.sizes = this.generateSizesAttribute(img);
        });
    }

    generateSizesAttribute(img) {
        // Generate responsive sizes based on image context
        if (img.classList.contains('hero-image')) {
            return '100vw';
        }
        
        if (img.classList.contains('thumbnail')) {
            return '(max-width: 768px) 50vw, 25vw';
        }
        
        if (img.classList.contains('content-image')) {
            return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
        }
        
        // Default sizes for educational content
        return '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw';
    }

    preloadCriticalImages() {
        // Preload above-the-fold images
        const criticalImages = document.querySelectorAll('img.critical, .hero img, .featured-content img');
        
        criticalImages.forEach((img, index) => {
            if (index < 3) { // Only preload first 3 critical images
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.src || img.dataset.src;
                
                if (img.srcset) {
                    link.imagesrcset = img.srcset;
                    link.imagesizes = img.sizes || '100vw';
                }
                
                document.head.appendChild(link);
            }
        });
    }

    setupImageErrorHandling() {
        // Global error handler for failed image loads
        document.addEventListener('error', (event) => {
            if (event.target.tagName === 'IMG') {
                this.handleImageError(event.target);
            }
        }, true);
    }

    handleImageError(img) {
        if (img.dataset.fallbackAttempted) return;
        
        img.dataset.fallbackAttempted = 'true';
        
        // Try different fallback strategies
        if (img.dataset.fallback) {
            img.src = img.dataset.fallback;
        } else if (img.classList.contains('user-avatar')) {
            img.src = '/images/default-avatar.svg';
        } else if (img.classList.contains('educational-image')) {
            img.src = '/images/placeholder-educational.svg';
        } else {
            // Create a placeholder
            this.createPlaceholder(img);
        }
        
        img.classList.add('image-error');
        console.warn('[Image] Failed to load:', img.src);
    }

    createPlaceholder(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.offsetWidth || 300;
        canvas.height = img.offsetHeight || 200;
        
        // Draw placeholder
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#999';
        ctx.font = '14px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Image unavailable', canvas.width / 2, canvas.height / 2);
        
        img.src = canvas.toDataURL();
    }

    isCriticalImage(img) {
        // Determine if image is critical for initial page render
        const rect = img.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        return rect.top < viewportHeight || 
               img.classList.contains('critical') ||
               img.classList.contains('hero-image') ||
               img.closest('.above-fold');
    }

    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    supportsAVIF() {
        const avif = new Image();
        avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
        return new Promise((resolve) => {
            avif.onload = () => resolve(true);
            avif.onerror = () => resolve(false);
        });
    }

    shouldUseWebP(src) {
        // Don't convert SVGs or already optimized formats
        return !src.includes('.svg') && !src.includes('.webp') && !src.includes('.avif');
    }

    shouldUseAVIF(src) {
        // AVIF is newer and more efficient, but check for compatibility
        return !src.includes('.svg') && !src.includes('.avif') && this.supportedFormats.avif;
    }

    // Performance monitoring for images
    trackImagePerformance() {
        const images = document.querySelectorAll('img');
        const metrics = {
            totalImages: images.length,
            loadedImages: 0,
            errorImages: 0,
            avgLoadTime: 0,
            largestImage: 0
        };

        images.forEach(img => {
            const startTime = performance.now();
            
            img.addEventListener('load', () => {
                const loadTime = performance.now() - startTime;
                metrics.loadedImages++;
                metrics.avgLoadTime = (metrics.avgLoadTime * (metrics.loadedImages - 1) + loadTime) / metrics.loadedImages;
                
                // Track largest image size (estimated)
                const size = img.naturalWidth * img.naturalHeight;
                if (size > metrics.largestImage) {
                    metrics.largestImage = size;
                }
            });
            
            img.addEventListener('error', () => {
                metrics.errorImages++;
            });
        });

        return metrics;
    }

    // Method to manually optimize all images on page
    optimizeAllImages() {
        const images = document.querySelectorAll('img');
        let optimizedCount = 0;
        
        images.forEach(img => {
            if (!img.dataset.optimized) {
                this.loadImage(img);
                optimizedCount++;
            }
        });
        
        console.log(`[Image] Optimized ${optimizedCount} images`);
        return optimizedCount;
    }

    // Data saver mode for slow connections
    enableDataSaverMode() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Reduce quality for all images
            if (img.src && !img.dataset.dataSaver) {
                const url = new URL(img.src);
                url.searchParams.set('q', '50'); // Low quality
                url.searchParams.set('w', '400'); // Max width
                img.src = url.toString();
                img.dataset.dataSaver = 'true';
            }
        });
        
        // Disable auto-loading for non-critical images
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.removeAttribute('loading');
            img.style.display = 'none';
            
            // Add click-to-load functionality
            const loadButton = document.createElement('button');
            loadButton.textContent = 'Load Image';
            loadButton.className = 'load-image-btn';
            loadButton.onclick = () => {
                img.style.display = '';
                img.loading = 'lazy';
                loadButton.remove();
            };
            
            img.parentNode.insertBefore(loadButton, img);
        });
    }

    // Get optimization statistics
    getOptimizationStats() {
        const images = document.querySelectorAll('img');
        const stats = {
            total: images.length,
            optimized: document.querySelectorAll('img[data-optimized]').length,
            lazy: document.querySelectorAll('img[loading="lazy"]').length,
            responsive: document.querySelectorAll('img[srcset]').length,
            errors: document.querySelectorAll('img.image-error').length,
            webpSupport: this.supportedFormats.webp,
            avifSupport: this.supportedFormats.avif
        };
        
        stats.optimizationRate = Math.round((stats.optimized / stats.total) * 100);
        
        return stats;
    }
}

// Initialize image optimization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.imageOptimizer = new ImageOptimizer();
    });
} else {
    window.imageOptimizer = new ImageOptimizer();
}

// Monitor connection changes and adjust image quality accordingly
if ('connection' in navigator) {
    navigator.connection.addEventListener('change', () => {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            if (window.imageOptimizer) {
                window.imageOptimizer.enableDataSaverMode();
            }
        }
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageOptimizer;
}