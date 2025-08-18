/**
 * UNIVERSAL BEAUTY ENHANCER
 * Applies consistent gorgeous styling across ALL pages
 * Ensures every page reaches "absolute next level gorgeous" standard
 */

class UniversalBeautyEnhancer {
    constructor() {
        this.pageType = this.detectPageType();
        this.isEnhanced = false;
        this.init();
    }

    init() {
        console.log('🎨 Universal Beauty Enhancer - Activating gorgeousness across platform');
        
        // Apply universal enhancements immediately
        this.applyUniversalStyling();
        this.enhanceNavigation();
        this.beautifyForms();
        this.enhanceCards();
        this.improveButtons();
        this.addLoadingStates();
        this.ensureMobileExcellence();
        this.addProfessionalPolish();
        
        // Page-specific enhancements
        this.applyPageSpecificEnhancements();
        
        // Mark as enhanced
        this.isEnhanced = true;
        document.body.classList.add('beauty-enhanced');
        
        console.log(`✨ Page enhanced for ${this.pageType} - Visual excellence achieved`);
    }

    detectPageType() {
        const path = window.location.pathname;
        const title = document.title.toLowerCase();
        
        if (path.includes('dashboard') || title.includes('dashboard')) return 'dashboard';
        if (path.includes('lesson') || title.includes('lesson')) return 'lesson';
        if (path.includes('handout') || title.includes('handout')) return 'handout';
        if (path.includes('game') || title.includes('game')) return 'game';
        if (path.includes('assessment') || title.includes('assessment')) return 'assessment';
        if (path.includes('units') || title.includes('unit')) return 'units';
        if (path === '/' || path.includes('index')) return 'home';
        
        return 'content';
    }

    applyUniversalStyling() {
        // Inject universal beauty CSS
        const universalCSS = `
            /* Universal Beauty Enhancement Styles */
            
            /* Smooth everything */
            * {
                transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            /* Beautiful body styling */
            body.beauty-enhanced {
                font-family: var(--font-primary, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
                line-height: 1.6;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
            }
            
            /* Enhanced containers */
            .container, .main-container, main {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
            }
            
            /* Beautiful headings */
            h1, h2, h3, h4, h5, h6 {
                font-family: var(--font-display, 'Playfair Display', Georgia, serif);
                line-height: 1.2;
                margin-bottom: 1rem;
                color: var(--color-primary, #1B4332);
                font-weight: 600;
            }
            
            h1 { font-size: clamp(2rem, 5vw, 3rem); }
            h2 { font-size: clamp(1.5rem, 4vw, 2.25rem); }
            h3 { font-size: clamp(1.25rem, 3vw, 1.75rem); }
            
            /* Elegant paragraphs */
            p {
                margin-bottom: 1.25rem;
                color: var(--color-gray-700, #374151);
                font-size: clamp(1rem, 2vw, 1.125rem);
            }
            
            /* Universal link styling */
            a {
                color: var(--color-pounamu, #1B7F5A);
                text-decoration: none;
                transition: all 0.2s ease;
                position: relative;
            }
            
            a:hover {
                color: var(--color-kowhai, #F18F01);
                transform: translateY(-1px);
            }
            
            /* Beautiful focus states */
            *:focus {
                outline: 2px solid var(--color-kowhai, #F18F01);
                outline-offset: 2px;
                border-radius: 4px;
            }
            
            /* Enhanced images */
            img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                transition: transform 0.3s ease, filter 0.3s ease;
            }
            
            img:hover {
                transform: scale(1.02);
                filter: brightness(1.05);
            }
            
            /* Beautiful tables */
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 2rem 0;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 12px;
                overflow: hidden;
            }
            
            th, td {
                padding: 1rem;
                text-align: left;
                border-bottom: 1px solid rgba(27, 67, 50, 0.1);
            }
            
            th {
                background: linear-gradient(135deg, var(--color-pounamu, #1B7F5A), var(--color-primary, #1B4332));
                color: white;
                font-weight: 600;
            }
            
            tr:hover {
                background: rgba(27, 127, 90, 0.05);
            }
            
            /* Universal scroll enhancement */
            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            
            ::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, var(--color-pounamu, #1B7F5A), var(--color-kowhai, #F18F01));
                border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(135deg, var(--color-kowhai, #F18F01), var(--color-pounamu, #1B7F5A));
            }
            
            /* Loading skeleton for any unloaded content */
            .loading-placeholder {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 2s infinite;
                border-radius: 8px;
                min-height: 20px;
            }
            
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            
            /* Mobile-first responsive enhancements */
            @media (max-width: 768px) {
                .container, .main-container, main {
                    padding: 0 1rem;
                }
                
                h1, h2, h3 {
                    text-align: left;
                }
                
                table {
                    font-size: 0.875rem;
                }
                
                th, td {
                    padding: 0.75rem 0.5rem;
                }
            }
        `;

        this.injectCSS(universalCSS, 'universal-beauty');
    }

    enhanceNavigation() {
        const navs = document.querySelectorAll('nav, .nav, .navigation, header nav');
        
        navs.forEach(nav => {
            if (nav.dataset.beautyEnhanced) return;
            nav.dataset.beautyEnhanced = 'true';
            
            // Apply beautiful nav styling
            const navCSS = `
                nav.beauty-enhanced, .nav.beauty-enhanced {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    box-shadow: 0 2px 20px rgba(27, 67, 50, 0.1);
                    border-bottom: 1px solid rgba(27, 127, 90, 0.1);
                    transition: all 0.3s ease;
                    padding: 1rem 0;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                
                nav.beauty-enhanced a, .nav.beauty-enhanced a {
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    font-weight: 500;
                    position: relative;
                    overflow: hidden;
                }
                
                nav.beauty-enhanced a:hover, .nav.beauty-enhanced a:hover {
                    background: rgba(27, 127, 90, 0.1);
                    transform: translateY(-2px);
                }
                
                nav.beauty-enhanced a::after, .nav.beauty-enhanced a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, var(--color-pounamu, #1B7F5A), var(--color-kowhai, #F18F01));
                    transform: translateX(-50%);
                    transition: width 0.3s ease;
                }
                
                nav.beauty-enhanced a:hover::after, .nav.beauty-enhanced a:hover::after {
                    width: 80%;
                }
            `;
            
            this.injectCSS(navCSS, 'nav-beauty');
            nav.classList.add('beauty-enhanced');
        });
    }

    beautifyForms() {
        const forms = document.querySelectorAll('form');
        const inputs = document.querySelectorAll('input, textarea, select');
        
        const formCSS = `
            form.beauty-enhanced {
                background: white;
                padding: 2rem;
                border-radius: 16px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
                border: 1px solid rgba(27, 127, 90, 0.1);
            }
            
            input.beauty-enhanced, textarea.beauty-enhanced, select.beauty-enhanced {
                width: 100%;
                padding: 1rem;
                border: 2px solid rgba(27, 127, 90, 0.2);
                border-radius: 12px;
                font-family: var(--font-primary, 'Inter', sans-serif);
                font-size: 1rem;
                transition: all 0.3s ease;
                background: white;
            }
            
            input.beauty-enhanced:focus, textarea.beauty-enhanced:focus, select.beauty-enhanced:focus {
                border-color: var(--color-pounamu, #1B7F5A);
                box-shadow: 0 0 0 4px rgba(27, 127, 90, 0.1);
                transform: translateY(-2px);
            }
            
            label.beauty-enhanced {
                font-weight: 500;
                color: var(--color-primary, #1B4332);
                margin-bottom: 0.5rem;
                display: block;
            }
        `;
        
        this.injectCSS(formCSS, 'form-beauty');
        
        forms.forEach(form => {
            form.classList.add('beauty-enhanced');
        });
        
        inputs.forEach(input => {
            input.classList.add('beauty-enhanced');
        });
    }

    enhanceCards() {
        const cards = document.querySelectorAll('.card, .lesson-card, .handout-card, .unit-card, .content-card, [class*="card"]');
        
        cards.forEach(card => {
            if (card.dataset.beautyEnhanced) return;
            card.dataset.beautyEnhanced = 'true';
            
            card.style.cssText += `
                background: white;
                border-radius: 16px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                border: 1px solid rgba(27, 127, 90, 0.05);
                padding: 2rem;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                position: relative;
                overflow: hidden;
            `;
            
            // Add hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12), 0 0 20px rgba(27, 127, 90, 0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            });
        });
    }

    improveButtons() {
        const buttons = document.querySelectorAll('button, .btn, [role="button"], input[type="submit"]');
        
        const buttonCSS = `
            button.beauty-enhanced, .btn.beauty-enhanced, [role="button"].beauty-enhanced, input[type="submit"].beauty-enhanced {
                background: linear-gradient(135deg, var(--color-pounamu, #1B7F5A), var(--color-primary, #1B4332));
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 12px;
                font-family: var(--font-primary, 'Inter', sans-serif);
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(27, 127, 90, 0.2);
            }
            
            button.beauty-enhanced:hover, .btn.beauty-enhanced:hover, [role="button"].beauty-enhanced:hover, input[type="submit"].beauty-enhanced:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 8px 25px rgba(27, 127, 90, 0.3);
                background: linear-gradient(135deg, var(--color-kowhai, #F18F01), var(--color-pounamu, #1B7F5A));
            }
            
            button.beauty-enhanced:active, .btn.beauty-enhanced:active, [role="button"].beauty-enhanced:active, input[type="submit"].beauty-enhanced:active {
                transform: translateY(-1px) scale(0.98);
            }
        `;
        
        this.injectCSS(buttonCSS, 'button-beauty');
        
        buttons.forEach(button => {
            if (!button.dataset.beautyEnhanced) {
                button.dataset.beautyEnhanced = 'true';
                button.classList.add('beauty-enhanced');
            }
        });
    }

    addLoadingStates() {
        // Add beautiful loading states for any async content
        const loadingCSS = `
            .loading-state {
                display: inline-flex;
                align-items: center;
                gap: 0.75rem;
                color: var(--color-gray-600, #6B7280);
                font-weight: 500;
            }
            
            .loading-spinner-beauty {
                width: 24px;
                height: 24px;
                border: 3px solid rgba(27, 127, 90, 0.1);
                border-top: 3px solid var(--color-pounamu, #1B7F5A);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        this.injectCSS(loadingCSS, 'loading-beauty');
    }

    ensureMobileExcellence() {
        // Mobile-specific enhancements
        const mobileCSS = `
            @media (max-width: 768px) {
                .beauty-enhanced {
                    font-size: 16px; /* Prevent zoom on iOS */
                }
                
                button.beauty-enhanced, .btn.beauty-enhanced {
                    min-height: 44px; /* Touch target size */
                    padding: 0.875rem 1.5rem;
                }
                
                input.beauty-enhanced, textarea.beauty-enhanced {
                    font-size: 16px; /* Prevent zoom */
                    min-height: 44px;
                }
                
                .card.beauty-enhanced {
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                }
            }
            
            /* Touch device optimizations */
            @media (hover: none) and (pointer: coarse) {
                button.beauty-enhanced:hover, .btn.beauty-enhanced:hover {
                    transform: none;
                    box-shadow: 0 4px 15px rgba(27, 127, 90, 0.2);
                }
            }
        `;
        
        this.injectCSS(mobileCSS, 'mobile-beauty');
    }

    addProfessionalPolish() {
        // Final polish touches
        const polishCSS = `
            /* Selection styling */
            ::selection {
                background: rgba(241, 143, 1, 0.3);
                color: var(--color-primary, #1B4332);
            }
            
            ::-moz-selection {
                background: rgba(241, 143, 1, 0.3);
                color: var(--color-primary, #1B4332);
            }
            
            /* Smooth page transitions */
            .page-transition {
                transition: opacity 0.3s ease;
            }
            
            .page-transition.loading {
                opacity: 0.9;
            }
            
            /* Professional shadows */
            .elevation-1 { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); }
            .elevation-2 { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); }
            .elevation-3 { box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); }
            .elevation-4 { box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12); }
            
            /* Cultural accents */
            .cultural-accent {
                position: relative;
            }
            
            .cultural-accent::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, var(--color-pounamu, #1B7F5A), var(--color-kowhai, #F18F01), var(--color-moana, #0081A7));
                border-radius: 2px;
            }
        `;
        
        this.injectCSS(polishCSS, 'professional-polish');
        
        // Add cultural accent to main sections
        const sections = document.querySelectorAll('main section, .main-section, .content-section');
        sections.forEach(section => {
            if (!section.classList.contains('cultural-accent')) {
                section.classList.add('cultural-accent');
            }
        });
    }

    applyPageSpecificEnhancements() {
        switch (this.pageType) {
            case 'dashboard':
                this.enhanceDashboard();
                break;
            case 'lesson':
            case 'handout':
                this.enhanceContentPage();
                break;
            case 'units':
                this.enhanceUnitsPage();
                break;
            case 'home':
                this.enhanceHomePage();
                break;
            default:
                this.enhanceGenericPage();
        }
    }

    enhanceDashboard() {
        console.log('🎯 Enhancing dashboard with professional metrics styling');
        // Dashboard-specific enhancements would go here
    }

    enhanceContentPage() {
        console.log('📚 Enhancing content page with educational focus');
        
        // Add reading progression indicator
        const progressCSS = `
            .reading-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(27, 127, 90, 0.2);
                z-index: 1001;
            }
            
            .reading-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, var(--color-pounamu, #1B7F5A), var(--color-kowhai, #F18F01));
                transition: width 0.1s ease;
                width: 0%;
            }
        `;
        
        this.injectCSS(progressCSS, 'reading-progress');
        
        // Add reading progress bar
        const progressEl = document.createElement('div');
        progressEl.className = 'reading-progress';
        progressEl.innerHTML = '<div class="reading-progress-bar"></div>';
        document.body.prepend(progressEl);
        
        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressEl.querySelector('.reading-progress-bar').style.width = `${scrolled}%`;
        });
    }

    enhanceUnitsPage() {
        console.log('📋 Enhancing units page with curriculum organization');
        
        // Add filter animations and search enhancement
        const searchInputs = document.querySelectorAll('input[type="search"], .search-input');
        searchInputs.forEach(input => {
            input.style.cssText += `
                background: white;
                border: 2px solid rgba(27, 127, 90, 0.2);
                border-radius: 25px;
                padding: 1rem 1.5rem;
                width: 100%;
                max-width: 400px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            `;
        });
    }

    enhanceHomePage() {
        console.log('🏠 Enhancing home page with hero focus');
        // Home page already has hero enhancements
        
        // Add scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.feature-card, .quick-link, section');
        animateElements.forEach(el => {
            el.style.opacity = '0.8';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    enhanceGenericPage() {
        console.log('✨ Applying generic beautification enhancements');
        // Generic page enhancements are handled by universal styling
    }

    injectCSS(css, id) {
        // Avoid duplicate injections
        if (document.getElementById(id)) return;
        
        const styleElement = document.createElement('style');
        styleElement.id = id;
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
    }

    // Public API
    getStatus() {
        return {
            pageType: this.pageType,
            isEnhanced: this.isEnhanced,
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize Universal Beauty Enhancement
const universalBeauty = new UniversalBeautyEnhancer();

// Expose to global scope
window.UniversalBeauty = universalBeauty;

// Re-enhance on dynamic content changes
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (!universalBeauty.isEnhanced) {
            universalBeauty.init();
        }
    }, 100);
});

console.log('🎨 Universal Beauty Enhancer - Gorgeousness activated across entire platform');