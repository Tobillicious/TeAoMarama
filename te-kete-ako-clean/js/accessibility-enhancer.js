/**
 * Advanced Accessibility Enhancement System for Te Kete Ako
 * WCAG 2.1 AA Compliance for Educational Platform
 */

class AccessibilityEnhancer {
    constructor() {
        this.settings = {
            announcePageChanges: true,
            skipLinksEnabled: true,
            focusManagement: true,
            keyboardNavigation: true,
            screenReaderOptimizations: true,
            colorContrastChecking: true,
            motionPreferences: true
        };
        
        this.focusHistory = [];
        this.skipLinks = [];
        this.ariaLiveRegions = [];
        
        this.init();
    }

    init() {
        this.detectUserPreferences();
        this.setupSkipLinks();
        this.enhanceFocusManagement();
        this.setupKeyboardNavigation();
        this.setupAriaLiveRegions();
        this.improveFormAccessibility();
        this.enhanceImageAccessibility();
        this.setupColorContrastMode();
        this.setupMotionPreferences();
        this.addAccessibilityToolbar();
        this.setupScreenReaderOptimizations();
        this.monitorAccessibilityViolations();
    }

    detectUserPreferences() {
        // Detect user's accessibility preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersReducedMotion.matches) {
            this.enableReducedMotion();
        }
        
        if (prefersHighContrast.matches) {
            this.enableHighContrast();
        }
        
        if (prefersDarkMode.matches) {
            this.enableDarkMode();
        }
        
        // Listen for changes in preferences
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) this.enableReducedMotion();
            else this.disableReducedMotion();
        });
        
        prefersHighContrast.addEventListener('change', (e) => {
            if (e.matches) this.enableHighContrast();
            else this.disableHighContrast();
        });
    }

    setupSkipLinks() {
        if (!this.settings.skipLinksEnabled) return;
        
        const skipLinksContainer = document.createElement('div');
        skipLinksContainer.id = 'skip-links';
        skipLinksContainer.className = 'skip-links';
        
        const skipLinks = [
            { href: '#main-content', text: 'Skip to main content' },
            { href: '#main-navigation', text: 'Skip to navigation' },
            { href: '#search', text: 'Skip to search' },
            { href: '#footer', text: 'Skip to footer' }
        ];
        
        skipLinks.forEach(link => {
            const skipLink = document.createElement('a');
            skipLink.href = link.href;
            skipLink.textContent = link.text;
            skipLink.className = 'skip-link';
            
            // Only show target if it exists
            const target = document.querySelector(link.href);
            if (target) {
                skipLinksContainer.appendChild(skipLink);
                
                skipLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.focusElement(target);
                    this.announceToScreenReader(`Skipped to ${link.text.toLowerCase()}`);
                });
            }
        });
        
        if (skipLinksContainer.children.length > 0) {
            document.body.insertBefore(skipLinksContainer, document.body.firstChild);
            this.addSkipLinksStyles();
        }
    }

    enhanceFocusManagement() {
        if (!this.settings.focusManagement) return;
        
        // Track focus history for better navigation
        document.addEventListener('focusin', (e) => {
            this.focusHistory.push(e.target);
            if (this.focusHistory.length > 10) {
                this.focusHistory.shift();
            }
        });
        
        // Ensure visible focus indicators
        this.addFocusStyles();
        
        // Handle focus trapping in modals
        this.setupModalFocusTrapping();
        
        // Improve focus visibility
        this.enhanceFocusVisibility();
    }

    setupKeyboardNavigation() {
        if (!this.settings.keyboardNavigation) return;
        
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Escape':
                    this.handleEscapeKey(e);
                    break;
                case 'Tab':
                    this.handleTabNavigation(e);
                    break;
                case 'Enter':
                case ' ':
                    this.handleActivation(e);
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    this.handleArrowNavigation(e);
                    break;
                case 'Home':
                case 'End':
                    this.handleHomeEndNavigation(e);
                    break;
            }
        });
        
        // Add keyboard shortcuts for common actions
        this.setupKeyboardShortcuts();
    }

    setupAriaLiveRegions() {
        // Create live regions for dynamic announcements
        const liveRegions = [
            { id: 'aria-live-polite', level: 'polite' },
            { id: 'aria-live-assertive', level: 'assertive' },
            { id: 'aria-live-status', level: 'polite', role: 'status' }
        ];
        
        liveRegions.forEach(region => {
            const element = document.createElement('div');
            element.id = region.id;
            element.setAttribute('aria-live', region.level);
            element.setAttribute('aria-atomic', 'true');
            if (region.role) element.setAttribute('role', region.role);
            element.className = 'sr-only';
            document.body.appendChild(element);
            this.ariaLiveRegions.push(element);
        });
    }

    improveFormAccessibility() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            this.enhanceFormInputs(form);
            this.addFormValidationAnnouncements(form);
            this.improveFieldsetLegends(form);
            this.addRequiredFieldIndicators(form);
        });
    }

    enhanceFormInputs(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Ensure proper labeling
            if (!this.hasProperLabel(input)) {
                this.addMissingLabel(input);
            }
            
            // Add aria-describedby for help text
            this.associateHelpText(input);
            
            // Improve error messaging
            this.enhanceErrorMessaging(input);
            
            // Add autocomplete attributes where appropriate
            this.addAutocompleteAttributes(input);
        });
    }

    enhanceImageAccessibility() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Check for missing alt text
            if (!img.alt && !img.getAttribute('role')) {
                if (this.isDecorativeImage(img)) {
                    img.alt = '';
                    img.setAttribute('role', 'presentation');
                } else {
                    img.alt = this.generateAltText(img);
                }
            }
            
            // Add long descriptions for complex images
            if (this.isComplexImage(img) && !img.getAttribute('aria-describedby')) {
                this.addLongDescription(img);
            }
            
            // Handle images with text
            if (this.containsText(img)) {
                this.extractImageText(img);
            }
        });
    }

    setupColorContrastMode() {
        if (!this.settings.colorContrastChecking) return;
        
        // Check existing color contrasts
        this.auditColorContrast();
        
        // Add high contrast mode toggle
        this.addContrastToggle();
    }

    setupMotionPreferences() {
        if (!this.settings.motionPreferences) return;
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            this.enableReducedMotion();
        }
    }

    addAccessibilityToolbar() {
        const toolbar = document.createElement('div');
        toolbar.id = 'accessibility-toolbar';
        toolbar.className = 'accessibility-toolbar';
        toolbar.setAttribute('role', 'toolbar');
        toolbar.setAttribute('aria-label', 'Accessibility options');
        
        const toggles = [
            { id: 'high-contrast', label: 'High Contrast', action: () => this.toggleHighContrast() },
            { id: 'large-text', label: 'Large Text', action: () => this.toggleLargeText() },
            { id: 'reduce-motion', label: 'Reduce Motion', action: () => this.toggleReducedMotion() },
            { id: 'dyslexia-font', label: 'Dyslexia-Friendly Font', action: () => this.toggleDyslexiaFont() },
            { id: 'focus-highlight', label: 'Enhanced Focus', action: () => this.toggleFocusHighlight() }
        ];
        
        toggles.forEach(toggle => {
            const button = document.createElement('button');
            button.id = toggle.id;
            button.textContent = toggle.label;
            button.className = 'accessibility-toggle';
            button.setAttribute('aria-pressed', 'false');
            button.addEventListener('click', () => {
                const pressed = button.getAttribute('aria-pressed') === 'true';
                button.setAttribute('aria-pressed', (!pressed).toString());
                toggle.action();
            });
            toolbar.appendChild(button);
        });
        
        // Add keyboard shortcut to show/hide toolbar
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                toolbar.hidden = !toolbar.hidden;
                if (!toolbar.hidden) {
                    toolbar.querySelector('button').focus();
                }
            }
        });
        
        document.body.appendChild(toolbar);
        this.addToolbarStyles();
    }

    setupScreenReaderOptimizations() {
        if (!this.settings.screenReaderOptimizations) return;
        
        // Add landmarks
        this.addLandmarks();
        
        // Improve heading structure
        this.improveHeadingStructure();
        
        // Add skip navigation
        this.improveNavigationStructure();
        
        // Enhance table accessibility
        this.enhanceTableAccessibility();
        
        // Add context for links
        this.improveLinkContext();
    }

    // Helper methods
    focusElement(element) {
        if (element.tabIndex === -1) {
            element.tabIndex = 0;
        }
        element.focus();
        
        // Scroll element into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    announceToScreenReader(message, priority = 'polite') {
        const liveRegion = document.getElementById(`aria-live-${priority}`);
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    hasProperLabel(input) {
        return input.labels?.length > 0 || 
               input.getAttribute('aria-label') || 
               input.getAttribute('aria-labelledby') ||
               input.getAttribute('title');
    }

    addMissingLabel(input) {
        const label = document.createElement('label');
        label.textContent = this.generateLabelText(input);
        label.htmlFor = input.id || (input.id = 'input-' + Date.now());
        input.parentNode.insertBefore(label, input);
    }

    generateLabelText(input) {
        const placeholder = input.placeholder;
        const name = input.name;
        const type = input.type;
        
        if (placeholder) return placeholder;
        if (name) return name.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return `${type} field`;
    }

    isDecorativeImage(img) {
        return img.classList.contains('decorative') ||
               img.closest('.decoration') ||
               img.src.includes('decoration') ||
               img.src.includes('divider');
    }

    generateAltText(img) {
        const src = img.src;
        const className = img.className;
        
        if (src.includes('logo')) return 'Logo';
        if (src.includes('avatar')) return 'User avatar';
        if (className.includes('icon')) return 'Icon';
        if (className.includes('chart') || className.includes('graph')) return 'Chart or graph';
        
        return 'Image';
    }

    enableReducedMotion() {
        document.documentElement.classList.add('reduce-motion');
        this.announceToScreenReader('Reduced motion enabled');
    }

    disableReducedMotion() {
        document.documentElement.classList.remove('reduce-motion');
    }

    enableHighContrast() {
        document.documentElement.classList.add('high-contrast');
        this.announceToScreenReader('High contrast mode enabled');
    }

    disableHighContrast() {
        document.documentElement.classList.remove('high-contrast');
    }

    toggleHighContrast() {
        if (document.documentElement.classList.contains('high-contrast')) {
            this.disableHighContrast();
        } else {
            this.enableHighContrast();
        }
    }

    toggleLargeText() {
        document.documentElement.classList.toggle('large-text');
        const enabled = document.documentElement.classList.contains('large-text');
        this.announceToScreenReader(enabled ? 'Large text enabled' : 'Large text disabled');
    }

    toggleReducedMotion() {
        if (document.documentElement.classList.contains('reduce-motion')) {
            this.disableReducedMotion();
        } else {
            this.enableReducedMotion();
        }
    }

    toggleDyslexiaFont() {
        document.documentElement.classList.toggle('dyslexia-font');
        const enabled = document.documentElement.classList.contains('dyslexia-font');
        this.announceToScreenReader(enabled ? 'Dyslexia-friendly font enabled' : 'Dyslexia-friendly font disabled');
    }

    toggleFocusHighlight() {
        document.documentElement.classList.toggle('enhanced-focus');
        const enabled = document.documentElement.classList.contains('enhanced-focus');
        this.announceToScreenReader(enabled ? 'Enhanced focus indicators enabled' : 'Enhanced focus indicators disabled');
    }

    handleEscapeKey(e) {
        // Close modals, dropdowns, etc.
        const modal = document.querySelector('.modal.active, .modal[aria-hidden="false"]');
        if (modal) {
            this.closeModal(modal);
            return;
        }
        
        const dropdown = document.querySelector('.dropdown.open, [aria-expanded="true"]');
        if (dropdown) {
            this.closeDropdown(dropdown);
            return;
        }
        
        // Return focus to previous element
        if (this.focusHistory.length > 1) {
            const previousElement = this.focusHistory[this.focusHistory.length - 2];
            if (previousElement && document.contains(previousElement)) {
                previousElement.focus();
            }
        }
    }

    auditColorContrast() {
        const elements = document.querySelectorAll('*');
        const violations = [];
        
        elements.forEach(element => {
            const styles = window.getComputedStyle(element);
            const bgColor = styles.backgroundColor;
            const textColor = styles.color;
            
            if (this.hasTextContent(element) && !this.meetsContrastRequirement(bgColor, textColor)) {
                violations.push({
                    element,
                    backgroundColor: bgColor,
                    textColor: textColor,
                    contrastRatio: this.calculateContrastRatio(bgColor, textColor)
                });
            }
        });
        
        if (violations.length > 0) {
            console.warn('[Accessibility] Color contrast violations found:', violations);
        }
        
        return violations;
    }

    hasTextContent(element) {
        return element.textContent && element.textContent.trim().length > 0;
    }

    meetsContrastRequirement(bgColor, textColor) {
        const ratio = this.calculateContrastRatio(bgColor, textColor);
        return ratio >= 4.5; // WCAG AA requirement
    }

    calculateContrastRatio(color1, color2) {
        // Simplified contrast ratio calculation
        // In production, use a proper color contrast library
        const rgb1 = this.parseRGB(color1);
        const rgb2 = this.parseRGB(color2);
        
        if (!rgb1 || !rgb2) return 21; // Assume good contrast if can't parse
        
        const l1 = this.getLuminance(rgb1);
        const l2 = this.getLuminance(rgb2);
        
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        
        return (lighter + 0.05) / (darker + 0.05);
    }

    parseRGB(color) {
        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        }
        return null;
    }

    getLuminance([r, g, b]) {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    addSkipLinksStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .skip-links {
                position: absolute;
                top: -40px;
                left: 6px;
                z-index: 1000;
            }
            
            .skip-link {
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
                background: #000;
                color: #fff;
                padding: 8px 16px;
                text-decoration: none;
                border-radius: 0 0 4px 4px;
            }
            
            .skip-link:focus {
                position: static;
                width: auto;
                height: auto;
                left: auto;
                z-index: 1001;
            }
        `;
        document.head.appendChild(style);
    }

    addFocusStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :focus {
                outline: 2px solid #005fcc;
                outline-offset: 2px;
            }
            
            .enhanced-focus :focus {
                outline: 3px solid #ff6b00;
                outline-offset: 3px;
                box-shadow: 0 0 0 5px rgba(255, 107, 0, 0.3);
            }
            
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
        `;
        document.head.appendChild(style);
    }

    addToolbarStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .accessibility-toolbar {
                position: fixed;
                top: 10px;
                right: 10px;
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                padding: 10px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                z-index: 1000;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .accessibility-toggle {
                padding: 6px 12px;
                border: 1px solid #ced4da;
                background: #fff;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.2s;
            }
            
            .accessibility-toggle:hover {
                background: #e9ecef;
            }
            
            .accessibility-toggle[aria-pressed="true"] {
                background: #007bff;
                color: #fff;
                border-color: #007bff;
            }
            
            .high-contrast {
                filter: contrast(150%);
            }
            
            .large-text {
                font-size: 120%;
            }
            
            .reduce-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            
            .dyslexia-font {
                font-family: 'OpenDyslexic', Arial, sans-serif;
            }
            
            @media (max-width: 768px) {
                .accessibility-toolbar {
                    position: static;
                    margin: 10px;
                    width: calc(100% - 20px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Accessibility monitoring and reporting
    monitorAccessibilityViolations() {
        // Set up a mutation observer to check new content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.checkElementAccessibility(node);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    checkElementAccessibility(element) {
        const violations = [];
        
        // Check images for alt text
        const images = element.querySelectorAll ? element.querySelectorAll('img') : 
                      element.tagName === 'IMG' ? [element] : [];
        images.forEach(img => {
            if (!img.alt && !img.getAttribute('role')) {
                violations.push({ type: 'missing-alt', element: img });
            }
        });
        
        // Check form inputs for labels
        const inputs = element.querySelectorAll ? element.querySelectorAll('input, textarea, select') :
                      ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName) ? [element] : [];
        inputs.forEach(input => {
            if (!this.hasProperLabel(input)) {
                violations.push({ type: 'missing-label', element: input });
            }
        });
        
        if (violations.length > 0) {
            console.warn('[Accessibility] Violations detected in new content:', violations);
        }
        
        return violations;
    }

    getAccessibilityReport() {
        const report = {
            violations: this.auditColorContrast(),
            images: {
                total: document.querySelectorAll('img').length,
                missingAlt: document.querySelectorAll('img:not([alt])').length
            },
            forms: {
                total: document.querySelectorAll('input, textarea, select').length,
                unlabeled: Array.from(document.querySelectorAll('input, textarea, select'))
                               .filter(input => !this.hasProperLabel(input)).length
            },
            headings: this.analyzeHeadingStructure(),
            landmarks: document.querySelectorAll('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], main, nav, header, footer').length,
            skipLinks: this.skipLinks.length
        };
        
        return report;
    }

    analyzeHeadingStructure() {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const structure = headings.map(h => parseInt(h.tagName.charAt(1)));
        
        let violations = 0;
        for (let i = 1; i < structure.length; i++) {
            if (structure[i] > structure[i-1] + 1) {
                violations++;
            }
        }
        
        return {
            total: headings.length,
            violations: violations,
            hasH1: structure.includes(1)
        };
    }
}

// Initialize accessibility enhancements when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.accessibilityEnhancer = new AccessibilityEnhancer();
    });
} else {
    window.accessibilityEnhancer = new AccessibilityEnhancer();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityEnhancer;
}