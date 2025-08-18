/**
 * ================================================================
 * SUPABASE AUTHENTICATION - TE KETE AKO
 * ================================================================
 * 
 * Unified Supabase auth system for both authentication AND GraphRAG
 * Features: Login, Signup, Email Verification, Password Reset
 * Integrates with your existing Netlify functions
 * 
 * ================================================================
 */

// Load environment configuration first
if (!window.ENV) {
    console.warn('Environment config not loaded, using defaults');
    window.ENV = {};
}

// Supabase configuration
const supabaseUrl = window.ENV?.SUPABASE_URL || 'https://nlgldaqtubrlcqddppbq.supabase.co';
const supabaseKey = window.ENV?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM';

// Initialize Supabase client (will be set when CDN loads)
let supabase = null;
let currentUser = null;

/**
 * Initialize Supabase client once CDN is loaded
 */
function initializeSupabase() {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        // Set up auth state listener
        setupAuthStateListener();
        
        // Check current session
        checkCurrentSession();
        
        return true;
    }
    return false;
}

/**
 * Setup auth state change listener
 */
function setupAuthStateListener() {
    if (!supabase) return;
    
    supabase.auth.onAuthStateChange((event, session) => {
        currentUser = session?.user || null;
        // Update UI based on auth state
        updateAuthUI(currentUser);
        
        // Handle different auth events
        if (event === 'SIGNED_IN') {
            handleSignInSuccess(currentUser);
        } else if (event === 'SIGNED_OUT') {
            handleSignOutSuccess();
        }
    });
}

/**
 * Check current session on page load
 */
async function checkCurrentSession() {
    if (!supabase) return;
    
    try {
        const { data: { session } } = await supabase.auth.getSession();
        currentUser = session?.user || null;
        updateAuthUI(currentUser);
    } catch (error) {
        console.error('Session check error:', error);
    }
}

/**
 * Display error messages inline
 */
function showError(message, elementId = 'error-message') {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.className = 'message error show';
    } else {
        console.error(message);
        // Fallback
    }
}

/**
 * Display success messages
 */
function showSuccess(message, elementId = 'success-message') {
    const successElement = document.getElementById(elementId);
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
        successElement.className = 'message success show';
    } else {
        // Fallback
    }
}

/**
 * Clear all messages
 */
function clearMessages() {
    const errorElement = document.getElementById('error-message');
    const successElement = document.getElementById('success-message');
    
    if (errorElement) {
        errorElement.style.display = 'none';
        errorElement.textContent = '';
    }
    if (successElement) {
        successElement.style.display = 'none';
        successElement.textContent = '';
    }
}

/**
 * Show loading state for buttons
 */
function setLoadingState(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (button) {
        if (isLoading) {
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = 'Loading...';
        } else {
            button.disabled = false;
            button.textContent = button.dataset.originalText || button.textContent;
        }
    }
}

/**
 * Register new user with email and password using Netlify function
 */
async function handleSignup(email, password, confirmPassword, displayName, schoolName = '', yearLevel = '', role = 'student') {
    clearMessages();
    
    // Validation
    if (!email || !password || !displayName) {
        showError('Please fill in all required fields.');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match.');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long.');
        return;
    }
    
    setLoadingState('signup-btn', true);
    
    try {
        // Call your Netlify function for registration
        const response = await fetch('/.netlify/functions/auth-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                displayName,
                schoolName,
                yearLevel: yearLevel ? parseInt(yearLevel) : null,
                role
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Account created successfully! Please check your email to verify your account.');
            
            // Redirect to verification page after short delay
            setTimeout(() => {
                window.location.href = '/verify-email.html';
            }, 2000);
        } else {
            showError(data.message || 'Failed to create account.');
        }
        
    } catch (error) {
        console.error('Signup error:', error);
        showError('Failed to create account. Please try again.');
    } finally {
        setLoadingState('signup-btn', false);
    }
}

/**
 * Sign in existing user using Netlify function
 */
async function handleLogin(email, password) {
    clearMessages();
    
    if (!email || !password) {
        showError('Please enter both email and password.');
        return;
    }
    
    setLoadingState('login-btn', true);
    
    try {
        // Call your Netlify function for login
        const response = await fetch('/.netlify/functions/auth-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store tokens if needed (Supabase handles this automatically)
            showSuccess('Login successful! Redirecting...');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = '/my-kete.html';
            }, 1000);
        } else {
            showError(data.message || 'Invalid email or password.');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showError('Failed to sign in. Please try again.');
    } finally {
        setLoadingState('login-btn', false);
    }
}

/**
 * Sign out current user
 */
async function handleLogout() {
    if (!supabase) {
        console.error('Supabase not initialized');
        return;
    }
    
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        // Redirect to home page
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Logout error:', error);
        showError('Failed to sign out. Please try again.');
    }
}

/**
 * Send password reset email using Netlify function
 */
async function handlePasswordReset(email) {
    clearMessages();
    
    if (!email) {
        showError('Please enter your email address.');
        return;
    }
    
    setLoadingState('reset-btn', true);
    
    try {
        // Call your Netlify function for password reset
        const response = await fetch('/.netlify/functions/auth-forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Password reset email sent! Check your inbox for further instructions.');
        } else {
            showError(data.message || 'Failed to send password reset email.');
        }
        
    } catch (error) {
        console.error('Password reset error:', error);
        showError('Failed to send password reset email. Please try again.');
    } finally {
        setLoadingState('reset-btn', false);
    }
}

/**
 * Get current user JWT token for API calls
 */
async function getCurrentUserToken() {
    if (!supabase || !currentUser) return null;
    
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return session?.access_token || null;
    } catch (error) {
        console.error('Token retrieval error:', error);
        return null;
    }
}

/**
 * Fetch data from API with auth token
 */
async function fetchWithAuth(url, options = {}) {
    const token = await getCurrentUserToken();
    if (!token) {
        throw new Error('User not authenticated');
    }
    
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    return fetch(url, {
        ...options,
        headers
    });
}

/**
 * Check if current page should be protected
 */
function shouldProtectPage() {
    const currentPath = window.location.pathname;
    const publicPages = [
        '/login.html',
        '/register-simple.html', 
        '/register.html',
        '/forgot-password.html',
        '/verify-email.html',
        '/index.html',
        '/'
    ];
    
    return !publicPages.some(page => currentPath.endsWith(page));
}

/**
 * Handle successful sign in
 */
function handleSignInSuccess(user) {
    document.body.classList.add('logged-in');
    document.body.classList.remove('logged-out');
    
    // Check email verification for protected pages
    if (shouldProtectPage() && !user.email_confirmed_at) {
        window.location.href = '/verify-email.html';
        return;
    }
}

/**
 * Handle successful sign out
 */
function handleSignOutSuccess() {
    document.body.classList.add('logged-out');
    document.body.classList.remove('logged-in');
    
    // Redirect to login if on protected page
    if (shouldProtectPage()) {
        window.location.href = '/login.html';
        return;
    }
}

/**
 * Update UI based on auth state
 */
function updateAuthUI(user) {
    // Update navigation
    const loginLinks = document.querySelectorAll('.login-link, .login-btn');
    const logoutLinks = document.querySelectorAll('.logout-link, .logout-btn');
    const userDisplays = document.querySelectorAll('.user-display');
    const authNavItems = document.querySelectorAll('.auth-nav');
    const myKeteLinks = document.querySelectorAll('.my-kete-link');
    
    if (user) {
        // Show logout, hide login
        loginLinks.forEach(link => {
            const parent = link.closest('li');
            if (parent) parent.style.display = 'none';
            else link.style.display = 'none';
        });
        
        logoutLinks.forEach(link => {
            const parent = link.closest('li');
            if (parent) parent.style.display = 'block';
            else link.style.display = 'block';
        });
        
        // Show My Kete links
        myKeteLinks.forEach(link => {
            link.style.display = 'block';
        });
        
        // Show user info
        userDisplays.forEach(display => {
            display.textContent = user.user_metadata?.display_name || user.email;
            display.style.display = 'block';
        });
        
    } else {
        // Show login, hide logout
        loginLinks.forEach(link => {
            const parent = link.closest('li');
            if (parent) parent.style.display = 'block';
            else link.style.display = 'block';
        });
        
        logoutLinks.forEach(link => {
            const parent = link.closest('li');
            if (parent) parent.style.display = 'none';
            else link.style.display = 'none';
        });
        
        // Hide My Kete links
        myKeteLinks.forEach(link => {
            link.style.display = 'none';
        });
        
        // Hide user info
        userDisplays.forEach(display => {
            display.style.display = 'none';
        });
    }
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            handleLogin(email, password);
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const displayName = document.getElementById('display-name').value;
            const schoolName = document.getElementById('school-name')?.value || '';
            const yearLevel = document.getElementById('year-level')?.value || '';
            const role = document.getElementById('role')?.value || 'student';
            handleSignup(email, password, confirmPassword, displayName, schoolName, yearLevel, role);
        });
    }
    
    // Password reset form
    const resetForm = document.getElementById('reset-form');
    if (resetForm) {
        resetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            handlePasswordReset(email);
        });
    }
    
    // Logout buttons
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    });
}

/**
 * Initialize the authentication system
 */
function initialize() {
    // Try to initialize Supabase immediately
    if (!initializeSupabase()) {
        // If not available, wait for Supabase CDN to load
        const checkSupabase = setInterval(() => {
            if (initializeSupabase()) {
                clearInterval(checkSupabase);
            }
        }, 100);
        
        // Timeout after 10 seconds
        setTimeout(() => {
            clearInterval(checkSupabase);
            if (!supabase) {
                console.error('Failed to load Supabase');
                showError('Authentication system failed to load. Please refresh the page.');
            }
        }, 10000);
    }
    
    // Initialize event listeners
    initializeEventListeners();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// Export functions for global use
window.TeKeteAuth = {
    handleLogin,
    handleSignup,
    handleLogout,
    handlePasswordReset,
    getCurrentUserToken,
    fetchWithAuth,
    supabase: () => supabase,
    currentUser: () => currentUser
};

