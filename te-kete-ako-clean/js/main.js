/**
 * Te Kete Ako - Main JavaScript
 * Core functionality and initialization
 */

// Initialize Te Kete Ako when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 Te Kete Ako initialized - World\'s first culturally-grounded AI educational platform');
    
    // Initialize components
    initializeNavigation();
    initializeAuth();
    initializePWA();
    initializeAnalytics();
});

/**
 * Navigation enhancements
 */
function initializeNavigation() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = '#2C5F41';
            link.style.fontWeight = '600';
        }
    });

    // Mobile navigation toggle if needed
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
        });
    }
}

/**
 * Authentication helpers
 */
async function initializeAuth() {
    // Wait for Supabase client to be available
    if (typeof supabase === 'undefined') {
        console.log('Supabase client not yet available, waiting...');
        setTimeout(initializeAuth, 100);
        return;
    }
    
    try {
        // Check if user is logged in with Supabase
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            // User is logged in
            updateAuthState(user);
        } else {
            // User is not logged in
            updateAuthState(null);
        }
    } catch (error) {
        console.log('Auth check failed:', error);
        updateAuthState(null);
    }
}

function updateAuthState(user) {
    // Update navigation for logged-in users
    const authNavItems = document.querySelectorAll('.auth-nav');
    
    authNavItems.forEach(item => {
        if (user) {
            // Replace login/register with user info and logout
            item.innerHTML = `
                <a href="#" onclick="window.TeKeteAko.logout(); return false;">
                    <span class="nav-icon">👤</span>
                    <span class="nav-text-en">${user.email.split('@')[0]}</span>
                    <span class="nav-text-mi" lang="mi">Whakatere</span>
                </a>
            `;
        } else {
            // Show login/register buttons for non-authenticated users
            if (item.querySelector('.login-btn')) {
                item.innerHTML = `
                    <a href="login.html" class="login-btn">
                        <span class="nav-icon">🔐</span>
                        <span class="nav-text-en">Login</span>
                        <span class="nav-text-mi" lang="mi">Takiuru</span>
                    </a>
                `;
            } else if (item.querySelector('.register-btn')) {
                item.innerHTML = `
                    <a href="register.html" class="register-btn">
                        <span class="nav-icon">📝</span>
                        <span class="nav-text-en">Register</span>
                        <span class="nav-text-mi" lang="mi">Rēhita</span>
                    </a>
                `;
            }
        }
    });
}

/**
 * PWA initialization
 */
function initializePWA() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('📱 PWA: Service Worker registered successfully');
            })
            .catch(error => {
                console.log('❌ PWA: Service Worker registration failed:', error);
            });
    }
}

/**
 * Analytics initialization
 */
async function initializeAnalytics() {
    // Track page views and user interactions
    if (window.authHelpers) {
        try {
            const user = await window.authHelpers.getCurrentUser();
            if (user) {
                // Track authenticated user analytics
                trackPageView(user);
            } else {
                // Track anonymous user analytics
                trackPageView();
            }
        } catch (error) {
            console.log('Analytics auth check failed:', error);
            trackPageView();
        }
    } else {
        trackPageView();
    }
    
    // Track general site usage
    trackSiteInteractions();
}

function trackPageView(user = null) {
    const pageData = {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        user_id: user ? user.id : null,
        device_type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
    };
    
    // Send to analytics endpoint (if implemented)
    console.log('📊 Page view tracked:', pageData);
}

function trackSiteInteractions() {
    // Track clicks on key elements
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button');
        
        if (target) {
            const interactionData = {
                element: target.tagName.toLowerCase(),
                text: target.textContent?.trim(),
                href: target.href || null,
                timestamp: new Date().toISOString()
            };
            
            console.log('🖱️ Interaction tracked:', interactionData);
        }
    });
}

/**
 * Utility functions
 */

// Show loading state
function showLoading(element) {
    if (element) {
        element.disabled = true;
        element.innerHTML = '<div class="spinner"></div> Loading...';
    }
}

// Hide loading state
function hideLoading(element, originalText) {
    if (element) {
        element.disabled = false;
        element.innerHTML = originalText;
    }
}

// Show message to user
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Check if user has specific role
async function hasRole(requiredRole) {
    try {
        if (window.authHelpers) {
            const user = await window.authHelpers.getCurrentUser();
            if (!user) return false;
            
            // For now, we'll treat all authenticated users as teachers
            // In future, this would check user metadata or a profiles table
            return requiredRole === 'teacher';
        }
        return false;
    } catch (error) {
        console.error('Role check error:', error);
        return false;
    }
}

// Redirect based on user role
async function redirectToDashboard() {
    try {
        if (window.authHelpers) {
            const isLoggedIn = await window.authHelpers.isLoggedIn();
            if (!isLoggedIn) {
                window.location.href = 'login.html';
                return;
            }
            
            // For now, redirect all authenticated users to homepage
            // In future, this would check user role from profiles table
            window.location.href = 'index.html';
        } else {
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Dashboard redirect error:', error);
        window.location.href = 'login.html';
    }
}

// Logout function
async function logout() {
    try {
        // Use Supabase auth helper
        if (window.authHelpers) {
            await window.authHelpers.signOut();
        }
        
        showMessage('Successfully logged out', 'success');
        updateAuthState(null);
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } catch (error) {
        console.error('Logout error:', error);
        showMessage('Error logging out', 'error');
    }
}

// Global error handler
window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript error:', e.error);
    
    // Don't show errors to users in production
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        showMessage(`Error: ${e.error.message}`, 'error');
    }
});

// Export functions for other scripts
window.TeKeteAko = {
    showLoading,
    hideLoading,
    showMessage,
    formatDate,
    hasRole,
    redirectToDashboard,
    logout,
    trackPageView
};

console.log('🚀 Te Kete Ako main.js loaded successfully');