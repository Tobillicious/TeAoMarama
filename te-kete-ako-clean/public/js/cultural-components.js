/**
 * TE KETE AKO CULTURAL COMPONENT LIBRARY
 * Interactive components inspired by Māori art and React.dev design
 * 
 * Kaitiaki Aronui - Guardian of Educational Wisdom
 * Design Philosophy: Digital taonga with living interactions
 */

class CulturalComponentSystem {
    constructor() {
        this.components = new Map();
        this.animations = new WeakMap();
        this.observers = new WeakMap();
        this.init();
    }

    init() {
        console.log('🌿 Kaitiaki Aronui - Cultural Components Awakening');
        this.setupGlobalStyles();
        this.initializeComponents();
        this.setupIntersectionObserver();
        this.setupResizeObserver();
    }

    setupGlobalStyles() {
        // Inject critical CSS animations
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            /* Kowhaiwhai Drawing Animation */
            @keyframes drawKowhaiwhai {
                0% {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                }
                100% {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 0;
                }
            }

            /* Tukutuku Pattern Reveal */
            @keyframes revealTukutuku {
                0% {
                    clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
                }
                100% {
                    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
                }
            }

            /* Whakapapa Connection Lines */
            @keyframes connectWhakapapa {
                0% {
                    transform: scaleX(0);
                    transform-origin: left;
                }
                50% {
                    transform: scaleX(1);
                }
                100% {
                    transform: scaleX(1);
                    opacity: 0.7;
                }
            }

            /* Mauri Pulse - Living Energy */
            @keyframes mauriPulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.05);
                    opacity: 0.8;
                }
            }

            /* Ocean Wave Motion */
            @keyframes oceanWave {
                0%, 100% {
                    transform: translateX(0px) translateY(0px);
                }
                33% {
                    transform: translateX(5px) translateY(-2px);
                }
                66% {
                    transform: translateX(-5px) translateY(2px);
                }
            }

            /* Growing Tree Animation */
            @keyframes growTree {
                0% {
                    transform: scaleY(0);
                    transform-origin: bottom;
                }
                100% {
                    transform: scaleY(1);
                }
            }

            /* Card Hover Effects */
            .cultural-card {
                transition: all 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
                border-radius: 1rem;
                background: linear-gradient(145deg, #ffffff, #f8f9fa);
                box-shadow: 0 4px 6px rgba(27, 67, 50, 0.07), 0 2px 4px rgba(27, 67, 50, 0.06);
                position: relative;
                overflow: hidden;
            }

            .cultural-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, #F18F01, #1B7F5A, #2E86AB);
                transition: left 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            .cultural-card:hover::before {
                left: 0%;
            }

            .cultural-card:hover {
                transform: translateY(-4px) scale(1.02);
                box-shadow: 0 20px 25px rgba(27, 67, 50, 0.08), 0 8px 10px rgba(27, 67, 50, 0.04);
            }

            /* Button Components */
            .btn-cultural {
                background: linear-gradient(135deg, #1B4332, #2D5A4C);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.75rem;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .btn-cultural::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 600ms;
            }

            .btn-cultural:hover::before {
                left: 100%;
            }

            .btn-cultural:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(27, 67, 50, 0.3);
            }

            /* Loading Animations */
            .loading-tukutuku {
                width: 40px;
                height: 40px;
                background: conic-gradient(from 0deg, #F18F01, #1B7F5A, #2E86AB, #F18F01);
                border-radius: 50%;
                animation: spin 2s linear infinite;
                position: relative;
            }

            .loading-tukutuku::before {
                content: '';
                position: absolute;
                top: 3px;
                left: 3px;
                right: 3px;
                bottom: 3px;
                background: white;
                border-radius: 50%;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            /* Scroll Progress Indicator */
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, #F18F01, #1B7F5A, #2E86AB);
                transform-origin: left;
                z-index: 1000;
                transition: transform 100ms ease-out;
            }

            /* Navigation Enhancement */
            .nav-cultural {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid rgba(27, 67, 50, 0.1);
                transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .nav-cultural.scrolled {
                background: rgba(255, 255, 255, 0.98);
                box-shadow: 0 4px 20px rgba(27, 67, 50, 0.08);
            }

            /* Interactive Tooltips */
            .cultural-tooltip {
                position: relative;
                cursor: pointer;
            }

            .cultural-tooltip::after {
                content: attr(data-tooltip);
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(-5px);
                background: #1B4332;
                color: white;
                padding: 0.5rem 0.75rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 200ms, transform 200ms;
                box-shadow: 0 4px 12px rgba(27, 67, 50, 0.2);
            }

            .cultural-tooltip:hover::after {
                opacity: 1;
                transform: translateX(-50%) translateY(-10px);
            }

            /* Form Enhancements */
            .input-cultural {
                width: 100%;
                padding: 0.75rem 1rem;
                border: 2px solid rgba(27, 67, 50, 0.2);
                border-radius: 0.5rem;
                font-size: 1rem;
                transition: all 200ms ease;
                background: white;
            }

            .input-cultural:focus {
                outline: none;
                border-color: #1B7F5A;
                box-shadow: 0 0 0 3px rgba(27, 127, 90, 0.1);
            }

            /* Status Indicators */
            .status-success { color: #1B7F5A; }
            .status-warning { color: #F18F01; }
            .status-error { color: #d83c3e; }
            .status-info { color: #2E86AB; }

            /* Responsive Grid System */
            .cultural-grid {
                display: grid;
                gap: 1.5rem;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            }

            @media (max-width: 768px) {
                .cultural-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    initializeComponents() {
        // Initialize all components when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeAllComponents();
            });
        } else {
            this.initializeAllComponents();
        }
    }

    initializeAllComponents() {
        this.setupScrollProgress();
        this.setupNavigationEffects();
        this.setupCardAnimations();
        this.setupButtonEnhancements();
        this.setupTooltips();
        this.setupFormEnhancements();
        this.setupLoadingStates();
        this.setupPageTransitions();
        this.setupKowhaiwhaiBorders();
        this.setupTukutukuPatterns();
    }

    setupScrollProgress() {
        // Create scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        let ticking = false;
        const updateProgress = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrolled / maxScroll, 1);
            progressBar.style.transform = `scaleX(${progress})`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        });
    }

    setupNavigationEffects() {
        const nav = document.querySelector('header, nav, .site-header');
        if (!nav) return;

        nav.classList.add('nav-cultural');

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    setupCardAnimations() {
        const cards = document.querySelectorAll('.lesson-card, .handout-card, .unit-card, .resource-card');
        
        cards.forEach(card => {
            if (!card.classList.contains('cultural-card')) {
                card.classList.add('cultural-card');
            }
        });
    }

    setupButtonEnhancements() {
        const buttons = document.querySelectorAll('button, .btn, .button');
        
        buttons.forEach(btn => {
            if (!btn.classList.contains('btn-cultural')) {
                btn.classList.add('btn-cultural');
            }
        });
    }

    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.classList.add('cultural-tooltip');
        });
    }

    setupFormEnhancements() {
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea');
        
        inputs.forEach(input => {
            input.classList.add('input-cultural');
            
            // Add floating label effect
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                const wrapper = document.createElement('div');
                wrapper.style.position = 'relative';
                input.parentNode.insertBefore(wrapper, input);
                wrapper.appendChild(input);
                wrapper.appendChild(label);
                
                label.style.position = 'absolute';
                label.style.top = '0.75rem';
                label.style.left = '1rem';
                label.style.transition = 'all 200ms ease';
                label.style.pointerEvents = 'none';
                label.style.color = 'rgba(27, 67, 50, 0.6)';
                
                const updateLabel = () => {
                    if (input.value || input === document.activeElement) {
                        label.style.transform = 'translateY(-1.5rem) scale(0.875)';
                        label.style.color = '#1B7F5A';
                    } else {
                        label.style.transform = 'translateY(0) scale(1)';
                        label.style.color = 'rgba(27, 67, 50, 0.6)';
                    }
                };
                
                input.addEventListener('focus', updateLabel);
                input.addEventListener('blur', updateLabel);
                input.addEventListener('input', updateLabel);
                updateLabel();
            }
        });
    }

    setupLoadingStates() {
        // Add loading animations to form submissions and API calls
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    const loader = document.createElement('div');
                    loader.className = 'loading-tukutuku';
                    loader.style.width = '20px';
                    loader.style.height = '20px';
                    loader.style.display = 'inline-block';
                    loader.style.marginRight = '0.5rem';
                    
                    submitBtn.textContent = 'Te whakarato ana...';
                    submitBtn.prepend(loader);
                    submitBtn.disabled = true;
                    
                    // Reset after 3 seconds (adjust based on your needs)
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });
        });
    }

    setupPageTransitions() {
        // Add smooth page transitions for internal links
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add fade transition effect
                document.body.style.transition = 'opacity 200ms ease';
                document.body.style.opacity = '0.9';
                
                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 200);
            });
        });
    }

    setupKowhaiwhaiBorders() {
        // Add animated Kowhaiwhai borders to special elements
        const specialElements = document.querySelectorAll('.whakataukī, .karakia, .mihi, .cultural-quote');
        
        specialElements.forEach(element => {
            const border = document.createElement('div');
            border.style.position = 'absolute';
            border.style.top = '0';
            border.style.left = '0';
            border.style.right = '0';
            border.style.height = '3px';
            border.style.background = 'linear-gradient(90deg, #F18F01, #1B7F5A, #2E86AB)';
            border.style.borderRadius = '1.5px';
            border.style.animation = 'drawKowhaiwhai 2s ease-in-out';
            
            if (element.style.position !== 'absolute') {
                element.style.position = 'relative';
            }
            element.appendChild(border);
        });
    }

    setupTukutukuPatterns() {
        // Add subtle Tukutuku pattern backgrounds to content areas
        const contentAreas = document.querySelectorAll('.lesson-content, .handout-content, .main-content');
        
        contentAreas.forEach(area => {
            const pattern = document.createElement('div');
            pattern.style.position = 'absolute';
            pattern.style.top = '0';
            pattern.style.left = '0';
            pattern.style.right = '0';
            pattern.style.bottom = '0';
            pattern.style.opacity = '0.03';
            pattern.style.backgroundImage = `
                repeating-linear-gradient(45deg, #1B4332 0px, #1B4332 1px, transparent 1px, transparent 20px),
                repeating-linear-gradient(-45deg, #F18F01 0px, #F18F01 1px, transparent 1px, transparent 20px)
            `;
            pattern.style.pointerEvents = 'none';
            pattern.style.zIndex = '-1';
            
            if (area.style.position !== 'absolute') {
                area.style.position = 'relative';
            }
            area.appendChild(pattern);
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'mauriPulse 2s ease-in-out infinite';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.cultural-card, h1, h2, h3');
        animateElements.forEach(el => {
            el.style.opacity = '0.8';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 500ms ease, transform 500ms ease';
            observer.observe(el);
        });
    }

    setupResizeObserver() {
        if ('ResizeObserver' in window) {
            const resizeObserver = new ResizeObserver(entries => {
                // Adjust component layouts on resize
                entries.forEach(entry => {
                    const { width } = entry.contentRect;
                    
                    // Responsive component adjustments
                    if (width < 768) {
                        entry.target.classList.add('mobile-layout');
                    } else {
                        entry.target.classList.remove('mobile-layout');
                    }
                });
            });

            // Observe main content areas
            const mainAreas = document.querySelectorAll('main, .content-area, .main-container');
            mainAreas.forEach(area => resizeObserver.observe(area));
        }
    }

    // Public API for adding custom components
    addComponent(name, component) {
        this.components.set(name, component);
        console.log(`🌿 Cultural component registered: ${name}`);
    }

    // Initialize specific component
    initComponent(selector, componentName) {
        const elements = document.querySelectorAll(selector);
        const component = this.components.get(componentName);
        
        if (component) {
            elements.forEach(el => component.init(el));
        }
    }

    // Utility functions for common animations
    animateIn(element, animation = 'mauriPulse') {
        element.style.animation = `${animation} 1s ease forwards`;
    }

    animateOut(element, animation = 'fadeOut') {
        element.style.animation = `${animation} 0.5s ease forwards`;
    }

    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            const paintTiming = performance.getEntriesByType('paint');
            const navigationTiming = performance.getEntriesByType('navigation')[0];
            
            console.log('🌿 Cultural Components Performance:', {
                firstPaint: paintTiming[0]?.startTime,
                firstContentfulPaint: paintTiming[1]?.startTime,
                domContentLoaded: navigationTiming.domContentLoadedEventEnd,
                loadComplete: navigationTiming.loadEventEnd
            });
        }
    }
}

// Initialize the Cultural Component System
const culturalComponents = new CulturalComponentSystem();

// Expose to global scope for external integration
window.CulturalComponents = culturalComponents;

// Performance measurement after initialization
setTimeout(() => {
    culturalComponents.measurePerformance();
}, 1000);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CulturalComponentSystem;
}

console.log('🌿 Kaitiaki Aronui Cultural Components - Ready for Digital Transformation');