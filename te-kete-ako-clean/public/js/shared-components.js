// Te Kete Ako - Shared Components
// Core UI components used across the platform

// Mobile navigation toggle
function toggleMobileNav() {
    const nav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const body = document.body;
    
    if (nav && overlay) {
        nav.classList.toggle('mobile-active');
        overlay.classList.toggle('active');
        body.classList.toggle('nav-open');
    }
}

function closeMobileNav() {
    const nav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const body = document.body;
    
    if (nav && overlay) {
        nav.classList.remove('mobile-active');
        overlay.classList.remove('active');
        body.classList.remove('nav-open');
    }
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile nav button
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Handle mobile nav overlay click
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileNav);
    }
    
    // Smooth scroll for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Auto-hide mobile nav on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
});

// Print optimization
function optimizeForPrint() {
    // Hide non-essential elements for printing
    const noprint = document.querySelectorAll('.no-print');
    noprint.forEach(el => el.style.display = 'none');
}

// Export functions for use by other scripts
window.TeKeteAko = {
    toggleMobileNav,
    closeMobileNav,
    optimizeForPrint
};