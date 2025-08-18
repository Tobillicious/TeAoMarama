# AUTH SYSTEM README - Te Kete Ako Authentication
## Production-Ready Authentication Implementation Guide

### 🎯 Overview
Te Kete Ako uses a standardized Supabase authentication system with UMD loading, singleton guards, and robust error handling. This documentation provides the essential contracts and patterns for implementing authentication across all pages.

---

## 📋 Include Contract - Standard Authentication Stack

### Required Script Inclusion Pattern
Every authenticated page MUST include scripts in this exact order:

```html
<!-- Step 1: Environment Configuration (MUST be first) -->
<script src="js/env-config.js"></script>

<!-- Step 2: Supabase UMD Library (with CSP fallback) -->
<script src="vendor/supabase.min.js" defer></script>

<!-- Step 3: Core Authentication System -->
<script src="js/supabase-client.js"></script>
<script src="js/auth-enhanced.js"></script>

<!-- Step 4: Resilience Layer (Production Only) -->
<script src="js/auth-resilience.js"></script>
```

### Critical Loading Requirements
- **env-config.js** MUST load first to establish environment variables
- **supabase.min.js** MUST use `defer` attribute to prevent blocking
- **supabase-client.js** handles singleton initialization and CDN fallbacks
- **auth-enhanced.js** provides the main TeKeteAuthSystem class
- **auth-resilience.js** adds production-grade error recovery

---

## 🔒 Singleton Guards Implementation

### TeKeteAuthSystem Singleton Pattern
The authentication system uses a singleton pattern to prevent duplicate initialization:

```javascript
// Global singleton instance in auth-enhanced.js
window.TeKeteAuthSystem = window.TeKeteAuthSystem || (function () {
    const instance = new TeKeteAuthSystem();
    return instance;
})();

// Backward compatibility alias
window.teKeteAuth = window.TeKeteAuthSystem;
```

### Supabase Client Singleton (supabase-client.js)
```javascript
// Prevent duplicate client initialization
if (window.supabaseClient) return;

// Single client instance with retry logic
let supabaseClient = null;
let initializationPromise = null;

async function getSupabaseClient() {
    if (supabaseClient) return supabaseClient;
    
    if (!initializationPromise) {
        initializationPromise = initializeSupabaseClient();
    }
    
    return await initializationPromise;
}
```

### Environment Configuration Singleton (env-config.js)
```javascript
// Single initialization guard
if (window.__TKA_ENV__) return;
window.__TKA_ENV__ = true;
```

---

## 📦 UMD File Management

### Vendored Supabase UMD
- **Location**: `/vendor/supabase.min.js`
- **Version**: Latest stable Supabase UMD build
- **Purpose**: Self-hosted to avoid CDN dependency issues
- **MIME Type**: `application/javascript` (configured in server)

### UMD Loading Strategy
```javascript
// Wait for Supabase CDN with fallback (supabase-client.js)
let attempts = 0;
while (!window.supabase && attempts < 50) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
}

if (!window.supabase) {
    console.error('❌ Supabase CDN not loaded after 5 seconds - falling back to basic functionality');
    // Fallback: create mock client for testing
    window.supabase = {
        createClient: () => ({
            auth: {
                getUser: () => Promise.resolve({ data: { user: null } }),
                signInWithPassword: () => Promise.resolve({ error: { message: 'CDN loading issue' } })
            }
        })
    };
}
```

---

## 🛡️ Content Security Policy (CSP) Configuration

### Production CSP Header (Required)
```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self'; 
    script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com; 
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
    font-src 'self' https://fonts.gstatic.com; 
    img-src 'self' data: https:; 
    connect-src 'self' https://nlgldaqtubrlcqddppbq.supabase.co;
">
```

### CSP Domains Explanation
- **script-src**: Allows self-hosted scripts + CDN fallbacks
- **connect-src**: Permits Supabase API connections
- **unsafe-inline**: Required for dynamic auth UI updates
- **cdn.jsdelivr.net + unpkg.com**: Backup CDN sources

### CSP Fallback Strategy
If CSP blocks Supabase loading, the system automatically provides a mock client to prevent JavaScript errors while displaying appropriate error messages to users.

---

## 💡 Usage Examples

### Basic Authentication Check
```javascript
// Wait for auth system to initialize
document.addEventListener('DOMContentLoaded', async () => {
    // System handles initialization automatically
    
    // Check auth state
    if (window.teKeteAuth.isSignedIn()) {
        console.log('User logged in:', window.teKeteAuth.getCurrentUser());
        showAuthenticatedContent();
    } else {
        showLoginRequired();
    }
});
```

### Login Implementation
```javascript
async function handleLogin(email, password) {
    try {
        // Wait for auth system if needed
        if (!window.teKeteAuth || window.teKeteAuth.authState === 'loading') {
            showError('Auth system still loading. Please wait and try again.');
            return;
        }

        const result = await window.teKeteAuth.signIn(email, password);
        showSuccess('Login successful! Redirecting...');
        
        setTimeout(() => {
            window.location.href = '/my-kete.html';
        }, 1000);
        
    } catch (error) {
        console.error('Login error:', error);
        showError(getAuthErrorMessage(error));
    }
}
```

### Auth State Listener
```javascript
// Listen for authentication changes
window.addEventListener('teKeteAuthChange', (event) => {
    const { event: authEvent, user, state } = event.detail;
    
    switch (authEvent) {
        case 'signed_in':
            updateUIForSignedInUser(user);
            break;
        case 'signed_out':
            updateUIForSignedOutUser();
            break;
    }
});
```

### Role-Based Access Control
```javascript
// Check user role
if (window.teKeteAuth.hasRole('teacher')) {
    showTeacherDashboard();
} else if (window.teKeteAuth.hasRole('admin')) {
    showAdminPanel();
} else {
    showStudentDashboard();
}
```

### Session Validation
```javascript
// Manual session check (automatic validation runs every 5 minutes)
async function validateSession() {
    try {
        const isValid = await window.teKeteAuth.validateCurrentSession();
        if (!isValid) {
            console.warn('Session expired, redirecting to login');
            window.location.href = '/login.html';
        }
    } catch (error) {
        console.error('Session validation error:', error);
    }
}
```

---

## 🔧 Error Handling Patterns

### Standard Error Messages
```javascript
function getAuthErrorMessage(error) {
    switch (error.message) {
        case 'Invalid login credentials':
            return 'Email or password is incorrect. Please check and try again.';
        case 'Email not confirmed':
            return 'Please check your email and click the confirmation link before signing in.';
        case 'Too many requests':
            return 'Too many login attempts. Please wait a few minutes and try again.';
        case 'Network error':
            return 'Connection problem. Please check your internet and try again.';
        default:
            return 'Unable to sign in. Please try again or contact support.';
    }
}
```

### Auth State Error Recovery
```javascript
// Automatic retry on initialization failure
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
```

---

## 🏗️ Implementation Checklist

### For New Pages Requiring Auth:
- [ ] Include all 5 scripts in correct order
- [ ] Add CSP meta tag with Supabase domain
- [ ] Implement auth state checking
- [ ] Add `.auth-required` and `.auth-content` elements for UI control
- [ ] Handle loading, signed-in, signed-out, and error states
- [ ] Test with and without network connectivity

### For Debugging Auth Issues:
1. Check browser console for initialization errors
2. Verify all script files load successfully (Network tab)
3. Confirm `window.teKeteAuth` is available
4. Check `window.teKeteAuth.authState` value
5. Verify Supabase environment variables are loaded
6. Test CSP allows required connections

---

## 📞 Support & Troubleshooting

### Common Issues:
- **"Auth system not initialized"**: Check script loading order and timing
- **"Supabase CDN failed to load"**: Verify CSP allows CDN domains
- **"Environment configuration not loaded"**: Ensure env-config.js loads first
- **Session validation fails**: Check Supabase connection and token expiry

### Debug Authentication State:
```javascript
// Add to any page for debugging
console.log('Auth Debug:', {
    authSystemAvailable: !!window.teKeteAuth,
    authState: window.teKeteAuth?.authState,
    currentUser: window.teKeteAuth?.getCurrentUser(),
    environmentLoaded: !!window.ENV,
    supabaseAvailable: !!window.supabase
});
```

This authentication system provides enterprise-grade reliability with educational usability - follow these patterns to ensure consistent, secure authentication across all Te Kete Ako pages.