/**
 * Performance Monitoring and Analytics for Te Kete Ako
 * Educational Platform Optimization
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoad: {},
            resources: {},
            interactions: {},
            accessibility: {},
            errors: []
        };
        
        this.init();
    }

    init() {
        if (typeof window !== 'undefined') {
            this.setupPerformanceObserver();
            this.setupNavigationTiming();
            this.setupResourceTiming();
            this.setupUserInteractionTracking();
            this.setupAccessibilityChecks();
            this.setupErrorTracking();
            this.setupConnectionMonitoring();
            
            // Send metrics when page is about to unload
            window.addEventListener('beforeunload', () => {
                this.sendMetrics();
            });
            
            // Send metrics periodically for long sessions
            setInterval(() => {
                this.sendMetrics();
            }, 300000); // Every 5 minutes
        }
    }

    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            // Monitor Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.pageLoad.lcp = lastEntry.startTime;
                
                if (lastEntry.startTime > 2500) {
                    console.warn('[Performance] LCP is slow:', lastEntry.startTime + 'ms');
                    this.optimizeLCP();
                }
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Monitor First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    this.metrics.pageLoad.fid = entry.processingStart - entry.startTime;
                    
                    if (entry.processingStart - entry.startTime > 100) {
                        console.warn('[Performance] FID is slow:', entry.processingStart - entry.startTime + 'ms');
                        this.optimizeFID();
                    }
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Monitor Cumulative Layout Shift (CLS)
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                this.metrics.pageLoad.cls = clsValue;
                
                if (clsValue > 0.1) {
                    console.warn('[Performance] CLS is high:', clsValue);
                    this.optimizeCLS();
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    }

    setupNavigationTiming() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                
                this.metrics.pageLoad.dns = navigation.domainLookupEnd - navigation.domainLookupStart;
                this.metrics.pageLoad.connection = navigation.connectEnd - navigation.connectStart;
                this.metrics.pageLoad.request = navigation.responseStart - navigation.requestStart;
                this.metrics.pageLoad.response = navigation.responseEnd - navigation.responseStart;
                this.metrics.pageLoad.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart;
                this.metrics.pageLoad.loadComplete = navigation.loadEventEnd - navigation.navigationStart;
                
                // Alert on slow performance
                if (this.metrics.pageLoad.loadComplete > 3000) {
                    console.warn('[Performance] Page load is slow:', this.metrics.pageLoad.loadComplete + 'ms');
                    this.suggestOptimizations();
                }
                
                this.logPerformanceMetrics();
            }, 1000);
        });
    }

    setupResourceTiming() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                const resourceType = this.getResourceType(entry.name);
                
                if (!this.metrics.resources[resourceType]) {
                    this.metrics.resources[resourceType] = {
                        count: 0,
                        totalSize: 0,
                        avgLoadTime: 0,
                        slowResources: []
                    };
                }
                
                const loadTime = entry.responseEnd - entry.startTime;
                this.metrics.resources[resourceType].count++;
                this.metrics.resources[resourceType].totalSize += entry.transferSize || 0;
                this.metrics.resources[resourceType].avgLoadTime = 
                    (this.metrics.resources[resourceType].avgLoadTime * (this.metrics.resources[resourceType].count - 1) + loadTime) / 
                    this.metrics.resources[resourceType].count;
                
                // Track slow resources
                if (loadTime > 1000) {
                    this.metrics.resources[resourceType].slowResources.push({
                        url: entry.name,
                        loadTime: loadTime,
                        size: entry.transferSize
                    });
                }
            });
        });
        
        observer.observe({ entryTypes: ['resource'] });
    }

    setupUserInteractionTracking() {
        // Track clicks on educational content
        document.addEventListener('click', (event) => {
            const target = event.target;
            const interaction = this.getInteractionType(target);
            
            if (interaction) {
                if (!this.metrics.interactions[interaction.type]) {
                    this.metrics.interactions[interaction.type] = 0;
                }
                this.metrics.interactions[interaction.type]++;
                
                // Track time spent on educational resources
                if (interaction.type === 'handout' || interaction.type === 'lesson') {
                    this.trackResourceEngagement(interaction.resource);
                }
            }
        }, { passive: true });

        // Track scroll depth for engagement analytics
        this.setupScrollTracking();
    }

    setupScrollTracking() {
        let maxScroll = 0;
        let scrollTimer;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                if (scrollPercent > maxScroll) {
                    maxScroll = scrollPercent;
                    this.metrics.interactions.maxScrollDepth = maxScroll;
                }
            }, 100);
        }, { passive: true });
    }

    setupAccessibilityChecks() {
        // Check for common accessibility issues
        setTimeout(() => {
            this.checkColorContrast();
            this.checkImageAltText();
            this.checkFormLabels();
            this.checkHeadingStructure();
            this.checkFocusManagement();
            this.checkKeyboardNavigation();
        }, 2000);
    }

    setupErrorTracking() {
        // Track JavaScript errors
        window.addEventListener('error', (event) => {
            this.metrics.errors.push({
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error ? event.error.stack : null,
                timestamp: Date.now()
            });
        });

        // Track unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.metrics.errors.push({
                type: 'promise',
                message: event.reason,
                timestamp: Date.now()
            });
        });

        // Track network errors
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                if (!response.ok) {
                    this.metrics.errors.push({
                        type: 'network',
                        status: response.status,
                        url: args[0],
                        timestamp: Date.now()
                    });
                }
                return response;
            } catch (error) {
                this.metrics.errors.push({
                    type: 'network',
                    message: error.message,
                    url: args[0],
                    timestamp: Date.now()
                });
                throw error;
            }
        };
    }

    setupConnectionMonitoring() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            this.metrics.connection = {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt
            };

            connection.addEventListener('change', () => {
                this.metrics.connection = {
                    effectiveType: connection.effectiveType,
                    downlink: connection.downlink,
                    rtt: connection.rtt
                };
                
                // Optimize for slow connections
                if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                    this.enableDataSaverMode();
                }
            });
        }
    }

    // Optimization methods
    optimizeLCP() {
        // Lazy load images below the fold
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach((img, index) => {
            if (index > 2) { // Skip first 3 images
                img.loading = 'lazy';
            }
        });

        // Preload critical resources
        this.preloadCriticalResources();
    }

    optimizeFID() {
        // Defer non-critical JavaScript
        this.deferNonCriticalJS();
        
        // Break up long tasks
        this.optimizeLongTasks();
    }

    optimizeCLS() {
        // Add dimensions to images without them
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            img.style.aspectRatio = '16/9'; // Default aspect ratio
        });

        // Reserve space for dynamic content
        this.reserveSpaceForDynamicContent();
    }

    enableDataSaverMode() {
        // Reduce image quality
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.src && !img.dataset.optimized) {
                img.dataset.originalSrc = img.src;
                img.src = this.optimizeImageUrl(img.src);
                img.dataset.optimized = 'true';
            }
        });

        // Disable auto-loading videos
        const videos = document.querySelectorAll('video[autoplay]');
        videos.forEach(video => {
            video.removeAttribute('autoplay');
            video.preload = 'none';
        });
    }

    // Accessibility checking methods
    checkColorContrast() {
        // This would require more complex color analysis
        // For now, just flag potential issues
        const elementsToCheck = document.querySelectorAll('a, button, .btn');
        let contrastIssues = 0;
        
        elementsToCheck.forEach(element => {
            const styles = window.getComputedStyle(element);
            const bgColor = styles.backgroundColor;
            const textColor = styles.color;
            
            // Simple check - more sophisticated analysis needed for production
            if (bgColor === 'rgb(255, 255, 255)' && textColor === 'rgb(211, 211, 211)') {
                contrastIssues++;
            }
        });
        
        this.metrics.accessibility.contrastIssues = contrastIssues;
    }

    checkImageAltText() {
        const images = document.querySelectorAll('img');
        let missingAlt = 0;
        
        images.forEach(img => {
            if (!img.alt || img.alt.trim() === '') {
                missingAlt++;
            }
        });
        
        this.metrics.accessibility.missingAltText = missingAlt;
    }

    checkFormLabels() {
        const inputs = document.querySelectorAll('input, textarea, select');
        let missingLabels = 0;
        
        inputs.forEach(input => {
            const hasLabel = document.querySelector(`label[for="${input.id}"]`) || 
                            input.closest('label') ||
                            input.getAttribute('aria-label') ||
                            input.getAttribute('aria-labelledby');
            
            if (!hasLabel) {
                missingLabels++;
            }
        });
        
        this.metrics.accessibility.missingLabels = missingLabels;
    }

    checkHeadingStructure() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let structureIssues = 0;
        let lastLevel = 0;
        
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.substr(1));
            if (level > lastLevel + 1) {
                structureIssues++;
            }
            lastLevel = level;
        });
        
        this.metrics.accessibility.headingStructureIssues = structureIssues;
    }

    checkFocusManagement() {
        let focusableElements = 0;
        let elementsWithFocusIndicator = 0;
        
        const focusable = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
        focusableElements = focusable.length;
        
        focusable.forEach(element => {
            const styles = window.getComputedStyle(element, ':focus');
            if (styles.outline !== 'none' || styles.boxShadow !== 'none') {
                elementsWithFocusIndicator++;
            }
        });
        
        this.metrics.accessibility.focusIndicatorCoverage = Math.round((elementsWithFocusIndicator / focusableElements) * 100);
    }

    checkKeyboardNavigation() {
        // This would require user interaction testing
        // For now, just check if elements are keyboard accessible
        const interactiveElements = document.querySelectorAll('div[onclick], span[onclick]');
        this.metrics.accessibility.nonKeyboardAccessibleElements = interactiveElements.length;
    }

    // Helper methods
    getResourceType(url) {
        if (url.includes('.css')) return 'css';
        if (url.includes('.js')) return 'javascript';
        if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) return 'image';
        if (url.match(/\.(woff|woff2|ttf|eot)$/i)) return 'font';
        if (url.includes('.html')) return 'html';
        return 'other';
    }

    getInteractionType(element) {
        if (element.closest('.handout-card')) {
            return { type: 'handout', resource: element.closest('.handout-card').dataset.resource };
        }
        if (element.closest('.lesson-card')) {
            return { type: 'lesson', resource: element.closest('.lesson-card').dataset.resource };
        }
        if (element.closest('.game-card')) {
            return { type: 'game', resource: element.closest('.game-card').dataset.resource };
        }
        if (element.tagName === 'A') {
            return { type: 'link', resource: element.href };
        }
        return null;
    }

    trackResourceEngagement(resource) {
        if (!resource) return;
        
        const startTime = Date.now();
        const trackingKey = `engagement_${resource}`;
        
        // Track time spent on page
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - startTime;
            localStorage.setItem(trackingKey, timeSpent.toString());
        });
    }

    preloadCriticalResources() {
        const criticalResources = [
            '/css/main.css',
            '/js/enhanced-header.js',
            '/icons/icon-192x192.png'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = this.getPreloadType(resource);
            document.head.appendChild(link);
        });
    }

    getPreloadType(resource) {
        if (resource.includes('.css')) return 'style';
        if (resource.includes('.js')) return 'script';
        if (resource.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) return 'image';
        if (resource.match(/\.(woff|woff2|ttf|eot)$/i)) return 'font';
        return 'fetch';
    }

    deferNonCriticalJS() {
        const scripts = document.querySelectorAll('script[src]:not([defer]):not([async])');
        scripts.forEach(script => {
            if (!this.isCriticalScript(script.src)) {
                script.defer = true;
            }
        });
    }

    isCriticalScript(src) {
        const criticalScripts = [
            'enhanced-header.js',
            'supabase-client.js',
            'auth-ui.js'
        ];
        
        return criticalScripts.some(critical => src.includes(critical));
    }

    optimizeLongTasks() {
        // This would require code splitting and task scheduling
        // For now, just add a basic yield mechanism
        if (window.requestIdleCallback) {
            window.requestIdleCallback(() => {
                // Perform non-critical work during idle time
                this.performMaintenanceTasks();
            });
        }
    }

    performMaintenanceTasks() {
        // Clean up unused DOM elements
        this.cleanupUnusedElements();
        
        // Optimize images
        this.optimizeVisibleImages();
        
        // Prefetch likely next pages
        this.prefetchLikelyPages();
    }

    cleanupUnusedElements() {
        // Remove hidden elements that are no longer needed
        const hiddenElements = document.querySelectorAll('[style*="display: none"]');
        hiddenElements.forEach(element => {
            if (element.dataset.cleanup !== 'false') {
                element.remove();
            }
        });
    }

    optimizeVisibleImages() {
        const images = document.querySelectorAll('img');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => observer.observe(img));
    }

    prefetchLikelyPages() {
        // Prefetch pages that are likely to be visited next
        const links = document.querySelectorAll('a[href]');
        const likelyPages = [];
        
        links.forEach(link => {
            const href = link.href;
            if (href.includes('handouts') || href.includes('games') || href.includes('lessons')) {
                likelyPages.push(href);
            }
        });
        
        // Prefetch top 3 most likely pages
        likelyPages.slice(0, 3).forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
        });
    }

    optimizeImageUrl(url) {
        // This would integrate with an image optimization service
        // For now, just add quality parameter for supported formats
        if (url.includes('.jpg') || url.includes('.jpeg')) {
            return url + (url.includes('?') ? '&' : '?') + 'quality=75';
        }
        return url;
    }

    reserveSpaceForDynamicContent() {
        // Add min-height to containers that will have dynamic content
        const dynamicContainers = document.querySelectorAll('.dynamic-content, .loading-placeholder');
        dynamicContainers.forEach(container => {
            if (!container.style.minHeight) {
                container.style.minHeight = '200px';
            }
        });
    }

    logPerformanceMetrics() {
        console.group('[Performance] Page Load Metrics');
        console.log('DNS Lookup:', this.metrics.pageLoad.dns + 'ms');
        console.log('Connection:', this.metrics.pageLoad.connection + 'ms');
        console.log('Request:', this.metrics.pageLoad.request + 'ms');
        console.log('Response:', this.metrics.pageLoad.response + 'ms');
        console.log('DOM Content Loaded:', this.metrics.pageLoad.domContentLoaded + 'ms');
        console.log('Load Complete:', this.metrics.pageLoad.loadComplete + 'ms');
        console.groupEnd();

        if (this.metrics.pageLoad.lcp) {
            console.log('[Performance] LCP:', this.metrics.pageLoad.lcp + 'ms');
        }
        if (this.metrics.pageLoad.fid) {
            console.log('[Performance] FID:', this.metrics.pageLoad.fid + 'ms');
        }
        if (this.metrics.pageLoad.cls) {
            console.log('[Performance] CLS:', this.metrics.pageLoad.cls);
        }
    }

    suggestOptimizations() {
        const suggestions = [];
        
        if (this.metrics.pageLoad.loadComplete > 3000) {
            suggestions.push('Consider implementing lazy loading for images');
            suggestions.push('Minify CSS and JavaScript files');
            suggestions.push('Enable compression on the server');
        }
        
        if (this.metrics.accessibility.missingAltText > 0) {
            suggestions.push(`Add alt text to ${this.metrics.accessibility.missingAltText} images`);
        }
        
        if (this.metrics.accessibility.focusIndicatorCoverage < 80) {
            suggestions.push('Improve focus indicators for better keyboard navigation');
        }
        
        if (suggestions.length > 0) {
            console.group('[Performance] Optimization Suggestions');
            suggestions.forEach(suggestion => console.log('•', suggestion));
            console.groupEnd();
        }
    }

    sendMetrics() {
        // In a real implementation, this would send metrics to an analytics service
        console.log('[Performance] Metrics collected:', this.metrics);
        
        // Store metrics locally for development
        localStorage.setItem('te-kete-ako-metrics', JSON.stringify({
            ...this.metrics,
            timestamp: Date.now(),
            url: window.location.href
        }));
    }

    getMetricsReport() {
        return {
            summary: {
                pageLoadTime: this.metrics.pageLoad.loadComplete,
                accessibility: {
                    score: this.calculateAccessibilityScore(),
                    issues: this.getAccessibilityIssues()
                },
                performance: {
                    score: this.calculatePerformanceScore(),
                    issues: this.getPerformanceIssues()
                },
                errors: this.metrics.errors.length
            },
            details: this.metrics
        };
    }

    calculateAccessibilityScore() {
        let score = 100;
        score -= this.metrics.accessibility.missingAltText * 5;
        score -= this.metrics.accessibility.missingLabels * 10;
        score -= this.metrics.accessibility.headingStructureIssues * 5;
        score -= this.metrics.accessibility.contrastIssues * 10;
        score -= this.metrics.accessibility.nonKeyboardAccessibleElements * 15;
        
        return Math.max(0, score);
    }

    calculatePerformanceScore() {
        let score = 100;
        
        if (this.metrics.pageLoad.loadComplete > 2000) score -= 20;
        if (this.metrics.pageLoad.loadComplete > 4000) score -= 30;
        if (this.metrics.pageLoad.lcp > 2500) score -= 25;
        if (this.metrics.pageLoad.fid > 100) score -= 25;
        if (this.metrics.pageLoad.cls > 0.1) score -= 20;
        
        return Math.max(0, score);
    }

    getAccessibilityIssues() {
        const issues = [];
        if (this.metrics.accessibility.missingAltText > 0) {
            issues.push(`${this.metrics.accessibility.missingAltText} images missing alt text`);
        }
        if (this.metrics.accessibility.missingLabels > 0) {
            issues.push(`${this.metrics.accessibility.missingLabels} form inputs missing labels`);
        }
        if (this.metrics.accessibility.headingStructureIssues > 0) {
            issues.push('Heading structure issues detected');
        }
        if (this.metrics.accessibility.focusIndicatorCoverage < 80) {
            issues.push('Poor focus indicator coverage');
        }
        return issues;
    }

    getPerformanceIssues() {
        const issues = [];
        if (this.metrics.pageLoad.loadComplete > 3000) {
            issues.push('Slow page load time');
        }
        if (this.metrics.pageLoad.lcp > 2500) {
            issues.push('Poor Largest Contentful Paint');
        }
        if (this.metrics.pageLoad.fid > 100) {
            issues.push('Poor First Input Delay');
        }
        if (this.metrics.pageLoad.cls > 0.1) {
            issues.push('High Cumulative Layout Shift');
        }
        return issues;
    }
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
    window.performanceMonitor = new PerformanceMonitor();
    
    // Add global method to get performance report
    window.getPerformanceReport = function() {
        return window.performanceMonitor.getMetricsReport();
    };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}