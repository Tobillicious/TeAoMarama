/**
 * MOBILE REVOLUTION - JavaScript Functionality
 * Cultural Navigation Enhancement
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Elements
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileClose = document.querySelector('.mobile-nav-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Cultural touch feedback elements
    const touchFeedbackElements = document.querySelectorAll('.cultural-touch-feedback');
    
    if (!mobileToggle || !mobileOverlay) {
        return;
    }
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = mobileToggle.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    // Open mobile menu with cultural greeting
    function openMobileMenu() {
        mobileToggle.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Focus management for accessibility
        setTimeout(() => {
            const firstLink = mobileOverlay.querySelector('.mobile-nav-link');
            if (firstLink) {
                firstLink.focus();
            }
        }, 100);
        
        // Add entrance animation delay for cultural effect
        const navItems = mobileOverlay.querySelectorAll('.mobile-nav-item');
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 + (index * 50)); // Staggered entrance
        });
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Return focus to toggle button
        mobileToggle.focus();
    }
    
    // Event Listeners
    mobileToggle.addEventListener('click', toggleMobileMenu);
    mobileClose.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking navigation links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 100); // Small delay for visual feedback
        });
    });
    
    // Close menu when clicking overlay background
    mobileOverlay.addEventListener('click', function(e) {
        if (e.target === mobileOverlay) {
            closeMobileMenu();
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Cultural Touch Feedback Enhancement
    touchFeedbackElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            // Add cultural touch ripple effect
            const rect = element.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(64, 224, 208, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'cultural-ripple 0.6s linear';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            ripple.style.pointerEvents = 'none';
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Mobile Navigation Accessibility Enhancements
    function handleMobileNavKeyboard(e) {
        if (!mobileOverlay.classList.contains('active')) return;
        
        const focusableElements = mobileOverlay.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Tab navigation cycling
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
    
    document.addEventListener('keydown', handleMobileNavKeyboard);
    
    // Enhanced Mobile Gestures (for touch devices)
    let touchStartX = 0;
    let touchStartY = 0;
    
    // Swipe to close mobile menu
    mobileOverlay.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    mobileOverlay.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Detect swipe right to close (cultural gesture)
        if (deltaX > 100 && Math.abs(deltaY) < 100) {
            closeMobileMenu();
        }
    });
    
    // Add CSS animations for cultural ripple effect
    if (!document.querySelector('#cultural-mobile-styles')) {
        const style = document.createElement('style');
        style.id = 'cultural-mobile-styles';
        style.textContent = `
            @keyframes cultural-ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .mobile-nav-link {
                position: relative;
                overflow: hidden;
            }
            
            /* Enhanced visual feedback for mobile interactions */
            .mobile-nav-link:active {
                transform: translateX(4px) scale(0.98);
                background: rgba(64, 224, 208, 0.2);
            }
            
            /* Improved focus states for keyboard navigation */
            .mobile-nav-link:focus {
                outline: 2px solid rgba(245, 166, 35, 0.8);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
    
    });

// Viewport height adjustment for mobile browsers
function setMobileViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setMobileViewportHeight);
setMobileViewportHeight();