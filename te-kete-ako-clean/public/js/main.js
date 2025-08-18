// Te Kete Ako - Main Application JavaScript
// Core application logic and initialization

document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    initializeApp();
    
    // Set up error handling
    setupErrorHandling();
    
    // Initialize accessibility features
    initializeA11y();
    
    console.log('🧺 Te Kete Ako initialized successfully');
});

function initializeApp() {
    // Basic app initialization
    setupNavigation();
    setupPrintStyles();
    setupFormEnhancements();
}

function setupNavigation() {
    // Enhance navigation with keyboard support
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Set active nav state
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.main-nav a');
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        }
    });
}

function setupPrintStyles() {
    // Optimize page for printing
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
}

function setupFormEnhancements() {
    // Basic form validation and UX improvements
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                const firstError = this.querySelector('.error');
                if (firstError) firstError.focus();
            }
        });
    });
}

function setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Te Kete Ako Error:', e.error);
        // Could integrate with analytics here
    });
}

function initializeA11y() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
    // Focus management for modals and overlays
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile nav or any overlays
            if (window.TeKeteAko && window.TeKeteAko.closeMobileNav) {
                window.TeKeteAko.closeMobileNav();
            }
        }
    });
}