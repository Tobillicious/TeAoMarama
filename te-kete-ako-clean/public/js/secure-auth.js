/**
 * Te Kete Ako - Secure Authentication System
 * Chief Auditor: Kaitiaki Aronui
 * Purpose: Replace amateur localStorage auth with secure session management
 */

class SecureAuth {
    constructor() {
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.refreshThreshold = 5 * 60 * 1000; // 5 minutes before expiry
        this.init();
    }

    init() {
        // Check for existing secure session
        this.checkSession();
        
        // Set up periodic session checks
        setInterval(() => this.checkSession(), 60000); // Check every minute
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.checkSession();
            }
        });
    }

    // Secure session storage using sessionStorage with encryption
    setSecureSession(key, value) {
        try {
            const encrypted = this.encrypt(JSON.stringify(value));
            sessionStorage.setItem(`secure_${key}`, encrypted);
            sessionStorage.setItem(`secure_${key}_expiry`, Date.now() + this.sessionTimeout);
        } catch (error) {
            console.error('Session storage error:', error);
            this.clearSession();
        }
    }

    getSecureSession(key) {
        try {
            const encrypted = sessionStorage.getItem(`secure_${key}`);
            const expiry = sessionStorage.getItem(`secure_${key}_expiry`);
            
            if (!encrypted || !expiry) {
                return null;
            }

            if (Date.now() > parseInt(expiry)) {
                this.clearSession();
                return null;
            }

            return JSON.parse(this.decrypt(encrypted));
        } catch (error) {
            console.error('Session retrieval error:', error);
            this.clearSession();
            return null;
        }
    }

    // Simple encryption for session data
    encrypt(text) {
        // In production, use proper encryption library
        return btoa(encodeURIComponent(text));
    }

    decrypt(encrypted) {
        // In production, use proper decryption library
        return decodeURIComponent(atob(encrypted));
    }

    // Secure login with proper validation
    async login(credentials) {
        try {
            // Validate input
            if (!credentials.email || !credentials.password) {
                throw new Error('Invalid credentials');
            }

            // Sanitize inputs
            const sanitizedEmail = this.sanitizeInput(credentials.email);
            const sanitizedPassword = this.sanitizeInput(credentials.password);

            // API call would go here
            const response = await this.authenticateUser(sanitizedEmail, sanitizedPassword);
            
            if (response.success) {
                // Store secure session
                this.setSecureSession('user', response.user);
                this.setSecureSession('token', response.token);
                this.setSecureSession('refreshToken', response.refreshToken);
                
                // Set up automatic token refresh
                this.scheduleTokenRefresh();
                
                return { success: true, user: response.user };
            } else {
                throw new Error(response.message || 'Authentication failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error.message };
        }
    }

    // Secure logout
    logout() {
        try {
            // Clear all session data
            this.clearSession();
            
            // Redirect to login
            window.location.href = '/login.html';
        } catch (error) {
            console.error('Logout error:', error);
            // Force redirect even if error
            window.location.href = '/login.html';
        }
    }

    // Check session validity
    checkSession() {
        const user = this.getSecureSession('user');
        const token = this.getSecureSession('token');
        
        if (!user || !token) {
            this.redirectToLogin();
            return false;
        }

        // Check if token needs refresh
        const expiry = sessionStorage.getItem('secure_token_expiry');
        if (expiry && Date.now() > parseInt(expiry) - this.refreshThreshold) {
            this.refreshToken();
        }

        return true;
    }

    // Clear all session data
    clearSession() {
        const keys = Object.keys(sessionStorage);
        keys.forEach(key => {
            if (key.startsWith('secure_')) {
                sessionStorage.removeItem(key);
            }
        });
    }

    // Schedule automatic token refresh
    scheduleTokenRefresh() {
        setTimeout(() => {
            this.refreshToken();
        }, this.sessionTimeout - this.refreshThreshold);
    }

    // Refresh authentication token
    async refreshToken() {
        try {
            const refreshToken = this.getSecureSession('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            // API call to refresh token
            const response = await this.refreshUserToken(refreshToken);
            
            if (response.success) {
                this.setSecureSession('token', response.token);
                this.setSecureSession('refreshToken', response.refreshToken);
                this.scheduleTokenRefresh();
            } else {
                throw new Error('Token refresh failed');
            }
        } catch (error) {
            console.error('Token refresh error:', error);
            this.logout();
        }
    }

    // Input sanitization
    sanitizeInput(input) {
        if (typeof input !== 'string') {
            return '';
        }
        
        // Remove potentially dangerous characters
        return input
            .replace(/[<>]/g, '') // Remove < and >
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .trim();
    }

    // Mock API calls (replace with real API endpoints)
    async authenticateUser(email, password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock validation
        if (email === 'admin@mangakotukutuku.school.nz' && password === 'secure123') {
            return {
                success: true,
                user: {
                    id: 1,
                    email: email,
                    name: 'Admin User',
                    role: 'teacher'
                },
                token: 'mock-jwt-token-' + Date.now(),
                refreshToken: 'mock-refresh-token-' + Date.now()
            };
        } else {
            return {
                success: false,
                message: 'Invalid credentials'
            };
        }
    }

    async refreshUserToken(refreshToken) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now()
        };
    }

    // Redirect to login if session invalid
    redirectToLogin() {
        if (window.location.pathname !== '/login.html') {
            window.location.href = '/login.html';
        }
    }

    // Get current user
    getCurrentUser() {
        return this.getSecureSession('user');
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.checkSession();
    }

    // Check user role
    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    }
}

// Initialize secure authentication
const secureAuth = new SecureAuth();

// Export for use in other modules
window.SecureAuth = SecureAuth;
window.secureAuth = secureAuth;
