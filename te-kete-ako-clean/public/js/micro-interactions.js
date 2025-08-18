/**
 * SOPHISTICATED MICRO-INTERACTIONS SYSTEM
 * "Absolute next level gorgeous application" - Interactive Excellence
 * 
 * Features:
 * - Butter-smooth animations with cultural significance
 * - Intelligent hover states and focus indicators  
 * - Parallax scrolling effects
 * - Interactive particles and floating elements
 * - Professional page transitions
 * - Advanced cursor interactions
 */

class MicroInteractionsSystem {
    constructor() {
        this.interactions = new Map();
        this.animationId = null;
        this.scrollY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }

    init() {
        if (this.isReducedMotion) {
            console.log('✨ Micro-interactions: Reduced motion mode active');
            this.initAccessibleInteractions();
            return;
        }

        console.log('✨ Micro-interactions: Initializing sophisticated animation system');
        
        this.setupGlobalAnimationFrame();
        this.initializeFloatingElements();
        this.setupHoverEffects();
        this.initializeParallaxScrolling();
        this.setupPageTransitions();
        this.initializeCursorEffects();
        this.setupButtonAnimations();
        this.initializeCardInteractions();
        this.setupNavigationEffects();
        this.initializeLoadingAnimations();
    }

    setupGlobalAnimationFrame() {
        const animate = () => {
            this.updateAnimations();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }

    updateAnimations() {
        this.updateFloatingElements();
        this.updateParallax();
        this.updateCursorEffects();
    }

    initializeFloatingElements() {
        // Create beautiful floating cultural elements
        const hero = document.querySelector('.hero-section, .hero-modern');
        if (!hero) return;

        // Remove existing floating elements to prevent duplicates
        const existingFloaters = hero.querySelectorAll('.floating-element');
        existingFloaters.forEach(el => el.remove());

        const floatingElements = [
            { symbol: '🌿', size: 20, speed: 0.02, amplitude: 15 },
            { symbol: '✨', size: 16, speed: 0.025, amplitude: 20 },
            { symbol: '🦋', size: 18, speed: 0.018, amplitude: 12 },
            { symbol: '🌺', size: 22, speed: 0.022, amplitude: 18 },
            { symbol: '💫', size: 14, speed: 0.028, amplitude: 25 }
        ];

        floatingElements.forEach((config, index) => {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = config.symbol;
            element.style.cssText = `
                position: absolute;
                font-size: ${config.size}px;
                opacity: 0.6;
                pointer-events: none;
                z-index: 1;
                transition: all 0.3s ease;
                user-select: none;
            `;
            
            // Random positioning
            element.style.left = Math.random() * 80 + 10 + '%';
            element.style.top = Math.random() * 60 + 20 + '%';
            
            element.dataset.speed = config.speed;
            element.dataset.amplitude = config.amplitude;
            element.dataset.offset = index * Math.PI / 3;
            
            hero.appendChild(element);
        });
    }

    updateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        const time = Date.now() * 0.001;
        
        floatingElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed);
            const amplitude = parseFloat(element.dataset.amplitude);
            const offset = parseFloat(element.dataset.offset);
            
            const y = Math.sin(time * speed + offset) * amplitude;
            const x = Math.cos(time * speed * 0.7 + offset) * (amplitude * 0.5);
            const rotation = Math.sin(time * speed * 0.5 + offset) * 10;
            
            element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        });
    }

    setupHoverEffects() {
        // Enhanced hover effects for cards and buttons
        const interactiveElements = document.querySelectorAll('.card, .btn, .quick-link, .feature-card');
        
        interactiveElements.forEach(element => {
            if (element.dataset.hoverEnhanced) return; // Avoid duplicate setup
            element.dataset.hoverEnhanced = 'true';

            element.addEventListener('mouseenter', (e) => {
                this.onElementHover(e.target, true);
            });

            element.addEventListener('mouseleave', (e) => {
                this.onElementHover(e.target, false);
            });

            element.addEventListener('mousemove', (e) => {
                this.onElementMouseMove(e);
            });
        });
    }

    onElementHover(element, isEntering) {
        if (isEntering) {
            element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.transform = 'translateY(-4px) scale(1.02)';
            element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(27, 127, 90, 0.1)';
            
            // Add ripple effect
            this.createRipple(element);
        } else {
            element.style.transform = 'translateY(0) scale(1)';
            element.style.boxShadow = '';
        }
    }

    onElementMouseMove(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        e.target.style.transform = `translateY(-4px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(241, 143, 1, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
        `;

        // Ensure relative positioning for ripple container
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }

        element.appendChild(ripple);

        // Add ripple animation keyframes if not already present
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(10);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    initializeParallaxScrolling() {
        const parallaxElements = [
            { selector: '.hero-section::before', speed: 0.5 },
            { selector: '.floating-element', speed: 0.8 },
            { selector: '.feature-card', speed: 0.9 }
        ];

        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset;
        });
    }

    updateParallax() {
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.3 + index * 0.1;
            const yOffset = this.scrollY * speed;
            const currentTransform = element.style.transform || '';
            
            // Preserve existing transforms and add parallax
            if (currentTransform.includes('translate')) {
                // Extract existing translate values and combine with parallax
                element.style.transform = currentTransform.replace(/translateY\([^)]+\)/, '') + 
                                        ` translateY(${yOffset}px)`;
            }
        });
    }

    setupPageTransitions() {
        // Smooth page transitions for internal links
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
        
        internalLinks.forEach(link => {
            if (link.dataset.transitionEnhanced) return;
            link.dataset.transitionEnhanced = 'true';
            
            link.addEventListener('click', (e) => {
                // Don't interfere with external links or hash links
                if (link.href.includes('#') || link.target === '_blank') return;
                
                // Create fade transition
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0.9';
                
                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 300);
            });
        });
    }

    initializeCursorEffects() {
        // Custom cursor for interactive elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(241, 143, 1, 0.4), rgba(27, 127, 90, 0.2));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Show cursor on interactive elements
        const interactiveSelectors = '.btn, .card, .nav-link, button, a';
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(interactiveSelectors)) {
                cursor.style.opacity = '1';
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            } else {
                cursor.style.opacity = '0';
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    }

    updateCursorEffects() {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.left = this.mouseX + 'px';
            cursor.style.top = this.mouseY + 'px';
        }
    }

    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn, button');
        
        buttons.forEach(button => {
            if (button.dataset.animationEnhanced) return;
            button.dataset.animationEnhanced = 'true';
            
            button.addEventListener('click', () => {
                this.createButtonPulse(button);
            });
        });
    }

    createButtonPulse(button) {
        const pulse = document.createElement('div');
        pulse.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.3);
            border-radius: inherit;
            top: 0;
            left: 0;
            animation: buttonPulse 0.4s ease-out;
            pointer-events: none;
        `;

        if (getComputedStyle(button).position === 'static') {
            button.style.position = 'relative';
        }

        button.appendChild(pulse);

        // Add pulse animation
        if (!document.querySelector('#button-pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'button-pulse-animation';
            style.textContent = `
                @keyframes buttonPulse {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            if (pulse.parentNode) {
                pulse.parentNode.removeChild(pulse);
            }
        }, 400);
    }

    initializeCardInteractions() {
        const cards = document.querySelectorAll('.card, .feature-card, .quick-link');
        
        cards.forEach(card => {
            if (card.dataset.cardEnhanced) return;
            card.dataset.cardEnhanced = 'true';
            
            // Add subtle glow on focus/hover
            card.addEventListener('mouseenter', () => {
                card.style.filter = 'brightness(1.02) saturate(1.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.filter = '';
            });
        });
    }

    setupNavigationEffects() {
        const navLinks = document.querySelectorAll('.nav-link, nav a');
        
        navLinks.forEach(link => {
            if (link.dataset.navEnhanced) return;
            link.dataset.navEnhanced = 'true';
            
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-1px)';
                link.style.filter = 'brightness(1.1)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
                link.style.filter = '';
            });
        });
    }

    initializeLoadingAnimations() {
        // Add skeleton loading for images
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (img.dataset.loadingEnhanced) return;
            img.dataset.loadingEnhanced = 'true';
            
            if (!img.complete) {
                img.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
                img.style.backgroundSize = '200% 100%';
                img.style.animation = 'shimmer 2s infinite linear';
                
                img.addEventListener('load', () => {
                    img.style.background = '';
                    img.style.animation = '';
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 10);
                });
            }
        });

        // Add shimmer animation if not present
        if (!document.querySelector('#shimmer-animation')) {
            const style = document.createElement('style');
            style.id = 'shimmer-animation';
            style.textContent = `
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initAccessibleInteractions() {
        // Reduced motion alternatives
        const style = document.createElement('style');
        style.textContent = `
            .btn:hover, .card:hover {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                transform: none !important;
            }
            
            .btn:focus, .card:focus {
                outline: 2px solid var(--color-kowhai, #F18F01) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Public API
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Clean up floating elements
        document.querySelectorAll('.floating-element, .custom-cursor').forEach(el => el.remove());
        
        console.log('✨ Micro-interactions system destroyed');
    }

    addCustomInteraction(selector, config) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            this.interactions.set(element, config);
        });
    }

    // Performance monitoring
    getPerformanceMetrics() {
        return {
            activeAnimations: document.querySelectorAll('[style*="animation"]').length,
            floatingElements: document.querySelectorAll('.floating-element').length,
            enhancedElements: document.querySelectorAll('[data-hover-enhanced]').length,
            reducedMotionMode: this.isReducedMotion
        };
    }
}

// Initialize micro-interactions system
const microInteractions = new MicroInteractionsSystem();

// Expose to global scope
window.MicroInteractions = microInteractions;

// Re-initialize on page changes (for SPA-like behavior)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        microInteractions.setupHoverEffects();
        microInteractions.setupButtonAnimations();
    }, 500);
});

console.log('✨ Sophisticated Micro-Interactions System - Interactive excellence ready');