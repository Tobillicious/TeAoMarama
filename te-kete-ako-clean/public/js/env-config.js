// Te Kete Ako - Environment Configuration
// This file sets up environment variables for frontend use securely

(function () {
    if (window.__TKA_ENV__) return;
    window.__TKA_ENV__ = true;
    window.TKA = window.TKA || {};
    
    window.ENV = window.ENV || {};
    window.ENV.SUPABASE_URL = window.ENV.SUPABASE_URL || 'https://nlgldaqtubrlcqddppbq.supabase.co';
    window.ENV.SUPABASE_ANON_KEY = window.ENV.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM';

// Configuration loader - checks multiple sources
function loadEnvironmentConfig() {
    // For production deployment, these should come from build-time injection
    // For local development, use the .env file values
    
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname === '';
    
    if (isDevelopment) {
        // Development environment - load from .env equivalent
        window.ENV.SUPABASE_URL = 'https://nlgldaqtubrlcqddppbq.supabase.co';
        window.ENV.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM';
        window.ENV.NEO4J_URI = 'neo4j+s://cd5763ca.databases.neo4j.io';
        window.ENV.NODE_ENV = 'development';
        
        } else {
        // Production environment - use hardcoded values for Netlify
        window.ENV.SUPABASE_URL = 'https://nlgldaqtubrlcqddppbq.supabase.co';
        window.ENV.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM';
        window.ENV.NODE_ENV = 'production';
        }
    
    // Set environment flags
    window.ENV.IS_DEVELOPMENT = isDevelopment;
    window.ENV.IS_CONFIGURED = true;
}

// Configuration validation
function validateConfiguration() {
    const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
    const missing = required.filter(key => 
        !window.ENV[key] || window.ENV[key] === 'ENVIRONMENT_VARIABLE_REQUIRED'
    );
    
    if (missing.length > 0) {
        console.error('❌ Missing environment variables:', missing);
        return false;
    }
    
    return true;
}

// Initialize configuration
loadEnvironmentConfig();
const isConfigured = validateConfiguration();

// Export helpers
window.checkEnvironmentConfig = validateConfiguration;
window.isEnvironmentConfigured = () => isConfigured;

// Development helper
if (window.ENV.IS_DEVELOPMENT) {
    window.setDevEnvironment = function(config) {
        Object.assign(window.ENV, config);
        };
}

})();

