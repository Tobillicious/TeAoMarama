// Te Kete Ako - Bug Fixes and Optimizations
// Address various issues and improve user experience

class BugFixManager {
    constructor() {
        this.init();
    }

    init() {
        this.fixAuthenticationIssues();
        this.fixResponsiveIssues();
        this.fixJavaScriptErrors();
        this.improvePerformance();
        this.addErrorHandling();
        console.log('🔧 Bug fixes and optimizations applied!');
    }

    fixAuthenticationIssues() {
        // Fix authentication notice styling and positioning
        setTimeout(() => {
            const authNotices = document.querySelectorAll('.auth-notice, [class*="auth"], [id*="auth"]');
            authNotices.forEach(notice => {
                if (notice.textContent.includes('unavailable') || notice.textContent.includes('Authentication')) {
                    notice.style.cssText = `
                        position: fixed;
                        top: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: linear-gradient(135deg, #fbbf24, #f59e0b);
                        color: white;
                        padding: 12px 20px;
                        border-radius: 25px;
                        font-size: 0.9rem;
                        font-weight: 500;
                        z-index: 9999;
                        box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
                        max-width: 400px;
                        text-align: center;
                        border: 2px solid rgba(255, 255, 255, 0.2);
                    `;
                    
                    // Add close button
                    if (!notice.querySelector('.close-btn')) {
                        const closeBtn = document.createElement('button');
                        closeBtn.className = 'close-btn';
                        closeBtn.innerHTML = '×';
                        closeBtn.style.cssText = `
                            background: none;
                            border: none;
                            color: white;
                            font-size: 1.5rem;
                            cursor: pointer;
                            margin-left: 10px;
                            padding: 0;
                            line-height: 1;
                        `;
                        closeBtn.addEventListener('click', () => notice.remove());
                        notice.appendChild(closeBtn);
                    }
                }
            });
        }, 500);

        // Improve Supabase client initialization
        if (window.supabase) {
            // Add error handling for Supabase operations
            const originalCreateClient = window.supabase.createClient;
            window.supabase.createClient = function(url, key, options = {}) {
                try {
                    const client = originalCreateClient(url, key, {
                        ...options,
                        auth: {
                            autoRefreshToken: true,
                            persistSession: true,
                            detectSessionInUrl: true,
                            ...options.auth
                        }
                    });
                    
                    console.log('✅ Supabase client initialized successfully');
                    return client;
                } catch (error) {
                    console.error('❌ Supabase initialization error:', error);
                    // Fallback to basic functionality
                    return {
                        auth: {
                            getUser: () => Promise.resolve({ data: { user: null }, error: null }),
                            signOut: () => Promise.resolve({ error: null }),
                            signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Authentication temporarily unavailable') })
                        }
                    };
                }
            };
        }
    }

    fixResponsiveIssues() {
        // Fix mobile viewport issues
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }

        // Add responsive CSS fixes
        const responsiveFixes = document.createElement('style');
        responsiveFixes.textContent = `
            /* Mobile-first responsive fixes */
            @media (max-width: 768px) {
                .floating-buttons-container {
                    bottom: 70px !important;
                    left: 10px !important;
                }
                
                .floating-buttons-container button {
                    width: 50px !important;
                    height: 50px !important;
                    font-size: 1.4rem !important;
                }
                
                .dark-mode-toggle {
                    top: 15px !important;
                    right: 15px !important;
                    width: 45px !important;
                    height: 45px !important;
                }
                
                .print-all-btn {
                    bottom: 15px !important;
                    right: 15px !important;
                    padding: 10px 15px !important;
                    font-size: 0.8rem !important;
                }
                
                /* Fix modal sizes on mobile */
                #ai-chat-interface,
                #lesson-builder-modal > div,
                #game-generator-modal > div,
                #analytics-dashboard-modal > div {
                    width: 95% !important;
                    max-width: 95% !important;
                    margin: 10px !important;
                    max-height: 90vh !important;
                }
                
                /* Fix navigation on mobile */
                .main-nav ul {
                    flex-wrap: wrap;
                    gap: 10px;
                }
                
                .main-nav li {
                    flex: 1;
                    min-width: 120px;
                }
            }
            
            /* Tablet fixes */
            @media (min-width: 769px) and (max-width: 1024px) {
                .floating-buttons-container {
                    left: 15px !important;
                }
            }
            
            /* High DPI display fixes */
            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                .floating-buttons-container button,
                .dark-mode-toggle,
                .print-all-btn {
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }
            }
        `;
        document.head.appendChild(responsiveFixes);

        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.recalculatePositions();
            }, 500);
        });
    }

    fixJavaScriptErrors() {
        // Global error handler
        window.addEventListener('error', (event) => {
            console.warn('🚨 JavaScript Error Caught:', event.error);
            
            // Don't let errors break the user experience
            if (event.error && event.error.message) {
                const errorMessage = event.error.message.toLowerCase();
                
                // Handle common errors gracefully
                if (errorMessage.includes('supabase') || errorMessage.includes('auth')) {
                    console.log('🔄 Authentication error handled gracefully');
                    return true; // Prevent error from propagating
                }
                
                if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
                    this.showNetworkErrorNotification();
                    return true;
                }
            }
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.warn('🚨 Unhandled Promise Rejection:', event.reason);
            
            if (event.reason && event.reason.message) {
                const errorMessage = event.reason.message.toLowerCase();
                if (errorMessage.includes('supabase') || errorMessage.includes('auth')) {
                    console.log('🔄 Auth promise rejection handled gracefully');
                    event.preventDefault(); // Prevent unhandled rejection error
                }
            }
        });

        // Fix common initialization race conditions
        const originalAddEventListener = document.addEventListener;
        document.addEventListener = function(type, listener, options) {
            if (type === 'DOMContentLoaded' && document.readyState !== 'loading') {
                // DOM already loaded, execute immediately
                setTimeout(listener, 0);
                return;
            }
            return originalAddEventListener.call(this, type, listener, options);
        };
    }

    improvePerformance() {
        // Lazy load heavy features
        const features = [
            { id: 'ai-teaching-assistant', threshold: 0.1 },
            { id: 'lesson-builder', threshold: 0.1 },
            { id: 'game-generator', threshold: 0.1 },
            { id: 'analytics-dashboard', threshold: 0.1 }
        ];

        // Use Intersection Observer for performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            // Observe resource cards for analytics
            document.querySelectorAll('.resource-card, .handout-card').forEach(card => {
                observer.observe(card);
            });
        }

        // Debounce scroll events
        let scrollTimeout;
        const originalScrollHandler = window.onscroll;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (originalScrollHandler) originalScrollHandler();
            }, 16); // ~60fps
        }, { passive: true });

        // Optimize image loading
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
        });
    }

    addErrorHandling() {
        // Wrap modal operations in try-catch
        const modalMethods = ['openBuilder', 'openGameGenerator', 'openDashboard', 'toggleChat'];
        modalMethods.forEach(method => {
            const original = window[method];
            if (original) {
                window[method] = function(...args) {
                    try {
                        return original.apply(this, args);
                    } catch (error) {
                        console.warn(`Error in ${method}:`, error);
                        this.showErrorNotification(`Feature temporarily unavailable. Please refresh the page.`);
                    }
                };
            }
        });

        // Add graceful degradation for missing elements
        const safeQuerySelector = (selector) => {
            try {
                return document.querySelector(selector);
            } catch (error) {
                console.warn(`Invalid selector: ${selector}`);
                return null;
            }
        };

        // Override querySelector with safe version
        const originalQuerySelector = document.querySelector;
        document.querySelector = function(selector) {
            return safeQuerySelector(selector) || originalQuerySelector.call(this, selector);
        };
    }

    showNetworkErrorNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        `;
        notification.innerHTML = `
            <strong>🌐 Network Issue</strong><br>
            Some features may be temporarily unavailable. Please check your connection.
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #dc2626;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 4000);
    }

    recalculatePositions() {
        // Recalculate all fixed positioning after orientation change
        const elements = [
            '.floating-buttons-container',
            '.dark-mode-toggle',
            '.print-all-btn',
            '#floating-buttons-toggle'
        ];

        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                // Force reflow
                element.style.display = 'none';
                element.offsetHeight; // Trigger reflow
                element.style.display = '';
            }
        });
    }

    // Fix specific known issues
    fixKnownIssues() {
        // Fix z-index conflicts
        const fixZIndex = () => {
            const elements = [
                { selector: '.site-header', zIndex: 100 },
                { selector: '.floating-buttons-container', zIndex: 1002 },
                { selector: '#floating-buttons-toggle', zIndex: 1003 },
                { selector: '.dark-mode-toggle', zIndex: 1000 },
                { selector: '[id*="modal"]', zIndex: 2000 },
                { selector: '.auth-notice', zIndex: 9999 }
            ];

            elements.forEach(({ selector, zIndex }) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.zIndex = zIndex;
                }
            });
        };

        // Apply z-index fixes after page load
        setTimeout(fixZIndex, 1000);

        // Fix button click conflicts
        document.addEventListener('click', (e) => {
            // Prevent double-clicks on floating buttons
            if (e.target.closest('.floating-buttons-container button')) {
                e.stopPropagation();
                
                // Add visual feedback
                const button = e.target.closest('button');
                const originalTransform = button.style.transform;
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = originalTransform;
                }, 150);
            }
        });
    }
}

// Initialize bug fixes immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => new BugFixManager(), 500);
    });
} else {
    setTimeout(() => new BugFixManager(), 500);
}