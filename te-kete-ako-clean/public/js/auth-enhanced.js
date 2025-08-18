/**
 * ================================================================
 * ENHANCED AUTHENTICATION SYSTEM - TE KETE AKO PRODUCTION
 * ================================================================
 * 
 * Professional-grade authentication for Mangakōtukutuku College
 * - Robust error handling and retry logic
 * - Role-based access control (student/teacher/admin)
 * - Session management with proper expiration
 * - Performance optimized for 1000+ users
 * 
 * ================================================================
 */

class TeKeteAuthSystem {
    constructor() {
        this.supabase = null;
        this.currentUser = null;
        this.authState = 'loading';
        this.retryAttempts = 0;
        this.maxRetries = 3;
        this.sessionCheckInterval = null;
        
        this.init();
    }

    async init() {
        try {
            // Wait for environment config to load
            await this.waitForEnvironmentConfig();
            
            // Initialize Supabase client
            await this.initializeSupabase();
            
            // Setup auth state management
            this.setupAuthStateListener();
            
            // Check current session
            await this.checkCurrentSession();
            
            // Setup periodic session validation
            this.setupSessionValidation();
            
            } catch (error) {
            console.error('❌ Auth system initialization failed:', error);
            this.handleAuthError(error);
        }
    }

    async waitForEnvironmentConfig(timeout = 5000) {
        const start = Date.now();
        
        while (!window.ENV && (Date.now() - start) < timeout) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (!window.ENV) {
            throw new Error('Environment configuration not loaded');
        }
    }

    async initializeSupabase() {
        // Wait for Supabase CDN to load
        let attempts = 0;
        while (!window.supabase && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.supabase) {
            throw new Error('Supabase CDN failed to load');
        }

        const supabaseUrl = window.ENV?.SUPABASE_URL || 'https://nlgldaqtubrlcqddppbq.supabase.co';
        const supabaseKey = window.ENV?.SUPABASE_ANON_KEY;

        if (!supabaseKey || supabaseKey === 'ENVIRONMENT_VARIABLE_REQUIRED') {
            throw new Error('Supabase API key not configured');
        }

        this.supabase = window.supabase.createClient(supabaseUrl, supabaseKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true
            }
        });

        }

    setupAuthStateListener() {
        if (!this.supabase) return;

        this.supabase.auth.onAuthStateChange(async (event, session) => {
            switch (event) {
                case 'SIGNED_IN':
                    await this.handleSignIn(session);
                    break;
                case 'SIGNED_OUT':
                    this.handleSignOut();
                    break;
                case 'TOKEN_REFRESHED':
                    break;
                case 'USER_UPDATED':
                    await this.handleUserUpdate(session);
                    break;
                case 'PASSWORD_RECOVERY':
                    break;
            }
        });
    }

    async checkCurrentSession() {
        if (!this.supabase) return;

        try {
            const { data: { session }, error } = await this.supabase.auth.getSession();
            
            if (error) {
                console.error('❌ Session check error:', error);
                this.authState = 'error';
                return;
            }

            if (session && session.user) {
                await this.handleSignIn(session);
            } else {
                this.authState = 'signed_out';
                this.updateUI();
            }
        } catch (error) {
            console.error('❌ Session check failed:', error);
            this.authState = 'error';
            this.updateUI();
        }
    }

    async handleSignIn(session) {
        this.currentUser = session.user;
        this.authState = 'signed_in';
        
        try {
            // Get user profile with role information
            const { data: profile, error } = await this.supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.warn('Profile fetch error:', error);
            } else if (profile) {
                this.currentUser.profile = profile;
            }
        } catch (error) {
            console.warn('Profile loading error:', error);
        }

        this.updateUI();
        this.notifyAuthChange('signed_in');
    }

    handleSignOut() {
        this.currentUser = null;
        this.authState = 'signed_out';
        this.updateUI();
        this.notifyAuthChange('signed_out');
    }

    async handleUserUpdate(session) {
        if (session?.user) {
            this.currentUser = session.user;
            this.updateUI();
        }
    }

    setupSessionValidation() {
        // Validate session every 5 minutes
        this.sessionCheckInterval = setInterval(async () => {
            if (this.authState === 'signed_in') {
                await this.validateCurrentSession();
            }
        }, 5 * 60 * 1000);
    }

    async validateCurrentSession() {
        if (!this.supabase) return;

        try {
            const { data: { user }, error } = await this.supabase.auth.getUser();
            
            if (error || !user) {
                console.warn('⚠️ Session validation failed, signing out');
                await this.signOut();
            }
        } catch (error) {
            console.error('❌ Session validation error:', error);
        }
    }

    updateUI() {
        const authRequiredElements = document.querySelectorAll('.auth-required');
        const authContentElements = document.querySelectorAll('.auth-content');
        const userInfoElements = document.querySelectorAll('.user-info');

        switch (this.authState) {
            case 'loading':
                authRequiredElements.forEach(el => el.style.display = 'none');
                authContentElements.forEach(el => el.style.display = 'none');
                break;
                
            case 'signed_in':
                authRequiredElements.forEach(el => el.style.display = 'none');
                authContentElements.forEach(el => el.style.display = 'block');
                this.updateUserInfo();
                break;
                
            case 'signed_out':
                authRequiredElements.forEach(el => el.style.display = 'block');
                authContentElements.forEach(el => el.style.display = 'none');
                break;
                
            case 'error':
                this.showErrorState();
                break;
        }
    }

    updateUserInfo() {
        const userInfoElements = document.querySelectorAll('.user-info');
        const userName = this.currentUser?.email || 'User';
        const userRole = this.currentUser?.profile?.role || 'student';
        
        userInfoElements.forEach(el => {
            el.textContent = `
                <span class="user-email">${userName}</span>
                <span class="user-role">${userRole}</span>
                <button onclick="teKeteAuth.signOut()" class="btn-secondary">Sign Out</button>
            `;
        });
    }

    showErrorState() {
        const errorMessage = `
            <div class="auth-error">
                <h3>⚠️ Authentication Error</h3>
                <p>Unable to connect to authentication service. Please refresh the page or try again later.</p>
                <button onclick="location.reload()" class="btn-primary">Refresh Page</button>
            </div>
        `;
        
        document.querySelectorAll('.auth-required, .auth-content').forEach(el => {
            el.textContent = errorMessage;
            el.style.display = 'block';
        });
    }

    handleAuthError(error) {
        this.retryAttempts++;
        
        if (this.retryAttempts < this.maxRetries) {
            console.log(`🔄 Retrying auth initialization (attempt ${this.retryAttempts + 1}/${this.maxRetries})`);
            setTimeout(() => this.init(), 2000);
        } else {
            console.error('❌ Auth system failed after maximum retries');
            this.authState = 'error';
            this.updateUI();
        }
    }

    notifyAuthChange(event) {
        // Dispatch custom event for other components to listen to
        window.dispatchEvent(new CustomEvent('teKeteAuthChange', {
            detail: { event, user: this.currentUser, state: this.authState }
        }));
    }

    // Public API methods
    async signIn(email, password) {
        if (!this.supabase) throw new Error('Auth system not initialized');
        
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        return data;
    }

    async signUp(email, password, userData = {}) {
        if (!this.supabase) throw new Error('Auth system not initialized');
        
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
            options: {
                data: userData
            }
        });
        
        if (error) throw error;
        return data;
    }

    async signOut() {
        if (!this.supabase) return;
        
        const { error } = await this.supabase.auth.signOut();
        if (error) {
            console.error('Sign out error:', error);
        }
        
        // Clear session validation interval
        if (this.sessionCheckInterval) {
            clearInterval(this.sessionCheckInterval);
            this.sessionCheckInterval = null;
        }
    }

    async resetPassword(email) {
        if (!this.supabase) throw new Error('Auth system not initialized');
        
        const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/reset-password.html'
        });
        
        if (error) throw error;
        return data;
    }

    // Utility methods
    isSignedIn() {
        return this.authState === 'signed_in' && this.currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getUserRole() {
        return this.currentUser?.profile?.role || 'student';
    }

    hasRole(role) {
        return this.getUserRole() === role;
    }

    // Cleanup on page unload
    cleanup() {
        if (this.sessionCheckInterval) {
            clearInterval(this.sessionCheckInterval);
        }
    }
}

// Global singleton instance
window.TeKeteAuthSystem = window.TeKeteAuthSystem || (function () {
    const instance = new TeKeteAuthSystem();
    return instance;
})();

// Maintain backward compatibility
window.teKeteAuth = window.TeKeteAuthSystem;

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    window.teKeteAuth.cleanup();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeKeteAuthSystem;
}