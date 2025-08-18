// Homepage specific functionality for Te Kete Ako
document.addEventListener('DOMContentLoaded', function() {
    // Initialize homepage features
    initializeHomepageStats();
    initializeFeaturedResources();
    initializeNewsCards();
});

function initializeHomepageStats() {
    // Animate the stats numbers on scroll or page load
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(statNumber => {
        // Add gentle fade-in animation
        statNumber.style.opacity = '0';
        setTimeout(() => {
            statNumber.style.opacity = '1';
            statNumber.style.transition = 'opacity 0.5s ease-in-out';
        }, 200);
    });
}

function initializeFeaturedResources() {
    // Add hover effects and analytics tracking for featured resources
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Track featured resource clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'featured_resource_click', {
                    'resource_title': this.querySelector('.card-title')?.textContent || 'Unknown',
                    'resource_url': this.href
                });
            }
        });
    });
}

function initializeNewsCards() {
    // Add interaction tracking for news cards
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Cultural pattern animation for hero section
function initializeCulturalPattern() {
    const pattern = document.querySelector('.hero-cultural-pattern');
    if (pattern) {
        // Add subtle animation to cultural pattern
        pattern.style.backgroundImage = `
            radial-gradient(circle at 20% 50%, var(--color-primary-light) 2px, transparent 2px),
            radial-gradient(circle at 40% 20%, var(--color-secondary-light) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, var(--color-accent-light) 1px, transparent 1px)
        `;
        pattern.style.backgroundSize = '50px 50px, 30px 30px, 40px 40px';
        pattern.style.opacity = '0.1';
    }
}

// Initialize cultural pattern after DOM load
document.addEventListener('DOMContentLoaded', initializeCulturalPattern);