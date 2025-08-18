/**
 * ================================================================
 * AUTHENTICATION RESILIENCE LAYER - TE KETE AKO PRODUCTION
 * ================================================================
 * 
 * Advanced error handling, session recovery, and auth state management
 * - Network error recovery with exponential backoff
 * - Session persistence across browser restarts  
 * - Automatic token refresh with retry logic
 * - Multi-tab synchronization
 * - Offline capability detection
 * 
 * ================================================================
 */

class AuthResilienceManager {
    constructor() {
        this.networkRetries = 0;
        this.maxNetworkRetries = 5;
        this.tokenRefreshAttempts = 0;
        this.maxTokenRefreshAttempts = 3;
        this.sessionValidationInterval = null;
        this.networkStatusInterval = null;
        this.isOnline = navigator.onLine;
        this.sessionStorageKey = 'te-kete-auth-backup';
        
        this.initialize();
    }

    initialize() {
        // Network status monitoring
        this.setupNetworkMonitoring();
        
        // Multi-tab synchronization
        this.setupMultiTabSync();
        
        // Session backup and recovery
        this.setupSessionBackup();
        
        // Enhanced error handling
        this.setupErrorHandling();
        
        }

    setupNetworkMonitoring() {
        // Online/offline event listeners
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.handleNetworkReconnection();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.handleNetworkDisconnection();
        });

        // Periodic network health check
        this.networkStatusInterval = setInterval(() => {
            this.checkNetworkHealth();
        }, 30000); // Check every 30 seconds
    }

    setupMultiTabSync() {
        // Listen for storage events (multi-tab sync)
        window.addEventListener('storage', (event) => {
            if (event.key === 'supabase.auth.token') {
                this.handleAuthTokenChange();
            }
        });

        // Broadcast auth state changes to other tabs
        window.addEventListener('beforeunload', () => {
            this.broadcastAuthState();
        });
    }

    setupSessionBackup() {
        // Backup session data periodically
        setInterval(() => {
            this.backupSessionData();
        }, 60000); // Every minute

        // Attempt session recovery on page load
        this.attemptSessionRecovery();
    }

    setupErrorHandling() {
        // Global error handler for auth-related errors
        window.addEventListener('unhandledrejection', (event) => {
            if (this.isAuthRelatedError(event.reason)) {
                this.handleAuthError(event.reason);
                event.preventDefault();
            }
        });
    }

    async handleNetworkReconnection() {
        if (window.teKeteAuth) {
            try {
                await window.teKeteAuth.validateCurrentSession();
                this.networkRetries = 0; // Reset retry counter
            } catch (error) {
                console.warn('Auth validation failed after reconnection:', error);
                this.scheduleRetry(() => this.handleNetworkReconnection(), 5000);
            }
        }
    }

    handleNetworkDisconnection() {
        // Show offline indicator
        this.showOfflineIndicator();
        
        // Cache current auth state
        this.cacheCurrentAuthState();
    }

    async checkNetworkHealth() {
        if (!this.isOnline) return;

        try {
            const response = await fetch('/health-check.json', { 
                method: 'HEAD',
                cache: 'no-cache',
                timeout: 5000 
            });
            
            if (!response.ok) {
                throw new Error('Health check failed');
            }
            
            // Network is healthy
            this.hideOfflineIndicator();
            
        } catch (error) {
            console.warn('Network health check failed:', error);
            this.isOnline = false;
            this.handleNetworkDisconnection();
        }
    }

    async handleAuthTokenChange() {
        if (window.teKeteAuth) {
            // Re-check auth state
            await window.teKeteAuth.checkCurrentSession();
        }
    }

    broadcastAuthState() {
        if (window.teKeteAuth && window.teKeteAuth.currentUser) {
            localStorage.setItem('te-kete-last-auth-state', JSON.stringify({
                timestamp: Date.now(),
                userId: window.teKeteAuth.currentUser.id,
                email: window.teKeteAuth.currentUser.email,
                authState: window.teKeteAuth.authState
            }));
        }
    }

    backupSessionData() {
        if (!window.teKeteAuth || !window.teKeteAuth.currentUser) return;

        const backupData = {
            timestamp: Date.now(),
            user: {
                id: window.teKeteAuth.currentUser.id,
                email: window.teKeteAuth.currentUser.email,
                profile: window.teKeteAuth.currentUser.profile
            },
            authState: window.teKeteAuth.authState
        };

        try {
            sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(backupData));
        } catch (error) {
            console.warn('Session backup failed:', error);
        }
    }

    attemptSessionRecovery() {
        try {
            const backupData = sessionStorage.getItem(this.sessionStorageKey);
            if (backupData) {
                const data = JSON.parse(backupData);
                
                // Check if backup is recent (within 1 hour)
                if (Date.now() - data.timestamp < 3600000) {
                    this.recoverFromBackup(data);
                }
            }
        } catch (error) {
            console.warn('Session recovery failed:', error);
        }
    }

    async recoverFromBackup(backupData) {
        if (window.teKeteAuth && window.teKeteAuth.authState === 'loading') {
            // Wait for auth system to finish loading
            await new Promise(resolve => {
                const checkAuth = () => {
                    if (window.teKeteAuth.authState !== 'loading') {
                        resolve();
                    } else {
                        setTimeout(checkAuth, 100);
                    }
                };
                checkAuth();
            });

            // If still not authenticated, try to restore from backup
            if (!window.teKeteAuth.isSignedIn()) {
                // Trigger a fresh session check
                await window.teKeteAuth.checkCurrentSession();
            }
        }
    }

    cacheCurrentAuthState() {
        if (window.teKeteAuth && window.teKeteAuth.currentUser) {
            const cacheData = {
                timestamp: Date.now(),
                user: window.teKeteAuth.currentUser,
                authState: window.teKeteAuth.authState
            };
            
            try {
                localStorage.setItem('te-kete-offline-cache', JSON.stringify(cacheData));
            } catch (error) {
                console.warn('Failed to cache auth state:', error);
            }
        }
    }

    isAuthRelatedError(error) {
        if (!error || typeof error.message !== 'string') return false;
        
        const authErrorPatterns = [
            'authentication',
            'unauthorized',
            'invalid_token',
            'session_not_found',
            'supabase'
        ];
        
        return authErrorPatterns.some(pattern => 
            error.message.toLowerCase().includes(pattern)
        );
    }

    async handleAuthError(error) {
        console.error('🚨 Auth error detected:', error);
        
        // Increment retry counter
        this.tokenRefreshAttempts++;
        
        if (this.tokenRefreshAttempts <= this.maxTokenRefreshAttempts) {
            console.log(`🔄 Auth error recovery attempt ${this.tokenRefreshAttempts}/${this.maxTokenRefreshAttempts}`);
            
            try {
                if (window.teKeteAuth) {
                    await window.teKeteAuth.checkCurrentSession();
                }
            } catch (recoveryError) {
                console.error('Auth recovery failed:', recoveryError);
                this.scheduleRetry(() => this.handleAuthError(error), 
                    Math.pow(2, this.tokenRefreshAttempts) * 1000); // Exponential backoff
            }
        } else {
            // Max retries reached - force re-authentication
            this.forceReAuthentication();
        }
    }

    forceReAuthentication() {
        // Clear all auth data
        if (window.teKeteAuth) {
            window.teKeteAuth.signOut();
        }
        
        // Clear storage
        localStorage.removeItem('te-kete-auth-backup');
        sessionStorage.removeItem(this.sessionStorageKey);
        
        // Show re-authentication modal or redirect
        this.showReAuthenticationModal();
    }

    scheduleRetry(callback, delay) {
        setTimeout(() => {
            if (this.isOnline && this.networkRetries < this.maxNetworkRetries) {
                this.networkRetries++;
                callback();
            }
        }, delay);
    }

    showOfflineIndicator() {
        // Create or show offline indicator
        let indicator = document.getElementById('offline-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'offline-indicator';
            indicator.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #ff6b35;
                color: white;
                text-align: center;
                padding: 10px;
                font-weight: bold;
                z-index: 9999;
            `;
            indicator.textContent = '📴 You are currently offline. Some features may be limited.';
            document.body.appendChild(indicator);
        }
        indicator.style.display = 'block';
    }

    hideOfflineIndicator() {
        const indicator = document.getElementById('offline-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }

    showReAuthenticationModal() {
        // Create modal for re-authentication
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        modal.textContent = `
            <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 400px; text-align: center;">
                <h2 style="color: #2d5a87; margin-bottom: 1rem;">🔐 Session Expired</h2>
                <p>Your session has expired for security reasons. Please sign in again to continue.</p>
                <button onclick="window.location.href='/login.html'" 
                        style="background: #2d5a87; color: white; border: none; padding: 1rem 2rem; 
                               border-radius: 25px; font-size: 1rem; cursor: pointer; margin-top: 1rem;">
                    Sign In Again
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Public methods for integration
    async enhanceAuthSystem() {
        if (!window.teKeteAuth) return;

        // Add resilience methods to the main auth system
        const originalSignIn = window.teKeteAuth.signIn.bind(window.teKeteAuth);
        window.teKeteAuth.signIn = async (email, password) => {
            try {
                const result = await originalSignIn(email, password);
                this.tokenRefreshAttempts = 0; // Reset on successful sign in
                return result;
            } catch (error) {
                await this.handleAuthError(error);
                throw error;
            }
        };

        // Enhanced session validation
        const originalValidateSession = window.teKeteAuth.validateCurrentSession.bind(window.teKeteAuth);
        window.teKeteAuth.validateCurrentSession = async () => {
            try {
                return await originalValidateSession();
            } catch (error) {
                if (this.isOnline) {
                    await this.handleAuthError(error);
                }
                throw error;
            }
        };
    }

    cleanup() {
        if (this.sessionValidationInterval) {
            clearInterval(this.sessionValidationInterval);
        }
        if (this.networkStatusInterval) {
            clearInterval(this.networkStatusInterval);
        }
    }
}

// Initialize resilience manager
window.authResilience = new AuthResilienceManager();

// Enhance auth system when it's ready
document.addEventListener('DOMContentLoaded', () => {
    const enhanceWhenReady = () => {
        if (window.teKeteAuth) {
            window.authResilience.enhanceAuthSystem();
        } else {
            setTimeout(enhanceWhenReady, 100);
        }
    };
    enhanceWhenReady();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    window.authResilience.cleanup();
});

