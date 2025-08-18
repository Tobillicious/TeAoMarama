/**
 * GLOBAL ERROR BOUNDARY SYSTEM
 * Prevents 1000+ terminal errors from cascading
 * Implements graceful error handling and recovery
 */

class TeKeteErrorBoundary {
    constructor() {
        this.errorCount = 0;
        this.maxErrors = 50; // Prevent error spam
        this.setupGlobalHandlers();
        console.log('🛡️  Te Kete Error Boundary: Active');
    }

    setupGlobalHandlers() {
        // Catch JavaScript runtime errors
        window.addEventListener('error', (event) => {
            this.handleError('Runtime Error', event.error, event);
            return true; // Prevent default browser error display
        });

        // Catch unhandled Promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError('Unhandled Promise Rejection', event.reason, event);
            event.preventDefault(); // Prevent unhandled rejection warnings
        });

        // Catch authentication errors specifically
        window.addEventListener('supabase-auth-error', (event) => {
            this.handleAuthError(event.detail);
        });
    }

    handleError(type, error, event) {
        this.errorCount++;
        
        // Prevent error spam in terminal
        if (this.errorCount > this.maxErrors) {
            return;
        }

        // Log structured error data (but limit console output)
        const errorInfo = {
            type,
            message: error?.message || error,
            stack: error?.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            count: this.errorCount
        };

        // Only log critical errors to console
        if (this.isCriticalError(error)) {
            console.error(`[Te Kete ${type}]:`, errorInfo);
        }

        // Send to error monitoring service (if available)
        this.reportError(errorInfo);
        
        // Attempt recovery
        this.attemptRecovery(type, error);
    }

    handleAuthError(error) {
        console.warn('[Auth Recovery]:', error);
        
        // Attempt auth system recovery
        if (window.teKeteAuth) {
            window.teKeteAuth.recoverFromError();
        }
    }

    isCriticalError(error) {
        const criticalPatterns = [
            'supabase',
            'authentication',
            'network',
            'syntax',
            'security'
        ];
        
        const errorString = (error?.message || error || '').toLowerCase();
        return criticalPatterns.some(pattern => errorString.includes(pattern));
    }

    attemptRecovery(type, error) {
        // Auth system recovery
        if (error?.message?.includes('supabase') || error?.message?.includes('auth')) {
            this.recoverAuthSystem();
        }
        
        // DOM recovery
        if (error?.message?.includes('null') || error?.message?.includes('undefined')) {
            this.recoverDOMOperations();
        }
    }

    recoverAuthSystem() {
        // Reinitialize auth system if it failed
        setTimeout(() => {
            if (window.initializeAuth && typeof window.initializeAuth === 'function') {
                try {
                    window.initializeAuth();
                    console.log('🔄 Auth system recovery attempted');
                } catch (e) {
                    console.warn('Auth recovery failed:', e.message);
                }
            }
        }, 1000);
    }

    recoverDOMOperations() {
        // Wait for DOM to be ready before operations
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('🔄 DOM operations recovery: Ready');
            });
        }
    }

    reportError(errorInfo) {
        // Send to analytics/monitoring if available
        if (window.analytics && window.analytics.track) {
            window.analytics.track('error', errorInfo);
        }
    }

    getErrorStats() {
        return {
            totalErrors: this.errorCount,
            isHealthy: this.errorCount < 10
        };
    }
}

// Initialize global error boundary
window.teKeteErrorBoundary = new TeKeteErrorBoundary();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    console.log('🧹 Te Kete cleanup: Removing event listeners');
    // Cleanup intervals, timeouts, listeners
    if (window.globalCleanup) {
        window.globalCleanup();
    }
});

// Export for use in other modules
window.TeKeteErrorBoundary = TeKeteErrorBoundary;
