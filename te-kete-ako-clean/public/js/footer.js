// Te Kete Ako - Footer Enhancement Script
// Adds interactive features to the site footer

document.addEventListener('DOMContentLoaded', function() {
    initializeFooter();
});

function initializeFooter() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    
    // Add dynamic copyright year
    updateCopyrightYear();
    
    // Add footer link analytics
    trackFooterInteractions();
    
    // Add accessibility improvements
    enhanceFooterA11y();
}

function updateCopyrightYear() {
    const copyrightElements = document.querySelectorAll('.footer-bottom span, .copyright');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
        if (element.textContent.includes('©') && !element.textContent.includes(currentYear)) {
            element.textContent = element.textContent.replace(/© \d{4}/, `© ${currentYear}`);
        }
    });
}

function trackFooterInteractions() {
    const footerLinks = document.querySelectorAll('.site-footer a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.textContent.trim();
            const href = this.getAttribute('href');
            
            // Log for analytics (could integrate with actual analytics service)
            console.log('Footer link clicked:', { text: linkText, href: href });
        });
    });
}

function enhanceFooterA11y() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    
    // Ensure footer has proper landmark role
    if (!footer.getAttribute('role')) {
        footer.setAttribute('role', 'contentinfo');
    }
    
    // Add skip to footer functionality
    const skipToFooter = document.querySelector('a[href="#footer"]');
    if (skipToFooter) {
        skipToFooter.addEventListener('click', function(e) {
            e.preventDefault();
            footer.focus();
            footer.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Export for global access
window.TeKeteAkoFooter = {
    updateCopyrightYear,
    trackFooterInteractions,
    enhanceFooterA11y
};