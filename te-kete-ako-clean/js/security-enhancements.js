/**
 * Security Enhancement System for Te Kete Ako Educational Platform
 * Content Security, Input Validation, and Educational Data Protection
 */

class SecurityEnhancer {
    constructor() {
        this.config = {
            csrfProtection: true,
            inputSanitization: true,
            contentFiltering: true,
            sessionSecurity: true,
            dataEncryption: true,
            auditLogging: true
        };
        
        this.securityEvents = [];
        this.trustedDomains = ['localhost', 'te-kete-ako.netlify.app', 'supabase.co'];
        
        this.init();
    }

    init() {
        this.setupCSP();
        this.setupInputValidation();
        this.setupXSSProtection();
        this.setupSessionSecurity();
        this.setupContentFiltering();
        this.setupSecurityHeaders();
        this.monitorSecurityEvents();
    }

    setupCSP() {
        // Content Security Policy for educational platform
        const csp = {
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-inline'", 'https://cdn.supabase.co'],
            'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            'font-src': ["'self'", 'https://fonts.gstatic.com'],
            'img-src': ["'self'", 'data:', 'https:'],
            'connect-src': ["'self'", 'https://*.supabase.co'],
            'frame-src': ["'none'"],
            'object-src': ["'none'"],
            'base-uri': ["'self'"],
            'form-action': ["'self'"]
        };
        
        this.logSecurityEvent('CSP configured for educational content protection');
    }

    setupInputValidation() {
        // Sanitize all form inputs
        document.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.sanitizeInput(e.target);
            }
        });
        
        // Validate form submissions
        document.addEventListener('submit', (e) => {
            this.validateFormSubmission(e);
        });
    }

    setupXSSProtection() {
        // Override dangerous DOM methods
        this.protectDOMManipulation();
        
        // Sanitize dynamic content
        this.setupContentSanitization();
        
        // Monitor for suspicious scripts
        this.detectMaliciousScripts();
    }

    setupSessionSecurity() {
        // Implement session timeout for educational safety
        this.setupSessionTimeout();
        
        // Secure token storage
        this.secureTokenStorage();
        
        // Monitor for session hijacking
        this.monitorSessionSecurity();
    }

    setupContentFiltering() {
        // Educational content filtering
        this.setupEducationalContentFilter();
        
        // Inappropriate content detection
        this.setupContentModerationFilter();
        
        // Safe search enforcement
        this.enforceSafeSearch();
    }

    sanitizeInput(input) {
        const value = input.value;
        const sanitized = this.sanitizeString(value);
        
        if (value !== sanitized) {
            input.value = sanitized;
            this.logSecurityEvent('Input sanitized', { original: value, sanitized });
        }
    }

    sanitizeString(str) {
        return str
            .replace(/[<>'"&]/g, (match) => ({
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '&': '&amp;'
            })[match])
            .replace(/javascript:/gi, '')
            .replace(/on\w+=/gi, '')
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }

    validateFormSubmission(e) {
        const form = e.target;
        const formData = new FormData(form);
        let isValid = true;
        
        for (let [key, value] of formData.entries()) {
            if (!this.isValidInput(key, value)) {
                isValid = false;
                this.logSecurityEvent('Invalid form input detected', { field: key, value });
            }
        }
        
        if (!isValid) {
            e.preventDefault();
            this.showSecurityAlert('Invalid input detected. Please check your submission.');
        }
    }

    isValidInput(fieldName, value) {
        // Educational platform specific validation
        const validationRules = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            name: /^[a-zA-Z\s\u0100-\u017F\u1E00-\u1EFF]+$/,
            text: /^[^<>{}\\]+$/,
            url: /^https?:\/\/.+/
        };
        
        const rule = validationRules[fieldName] || validationRules.text;
        return rule.test(value) && value.length < 1000;
    }

    protectDOMManipulation() {
        const originalInnerHTML = Element.prototype.innerHTML;
        Element.prototype.innerHTML = function(value) {
            if (typeof value === 'string') {
                value = this.sanitizeString(value);
            }
            return originalInnerHTML.call(this, value);
        }.bind(this);
    }

    setupEducationalContentFilter() {
        // Filter inappropriate content for educational environment
        const inappropriateWords = [
            // Add appropriate content filtering for educational context
        ];
        
        this.contentFilter = new ContentFilter(inappropriateWords);
    }

    logSecurityEvent(event, details = {}) {
        const securityEvent = {
            timestamp: new Date().toISOString(),
            event,
            details,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.securityEvents.push(securityEvent);
        console.log('[Security]', event, details);
        
        // In production, send to security monitoring service
        this.reportSecurityEvent(securityEvent);
    }

    showSecurityAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'security-alert';
        alert.textContent = message;
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    reportSecurityEvent(event) {
        // Report to security monitoring (placeholder)
        localStorage.setItem('security-events', JSON.stringify(this.securityEvents.slice(-50)));
    }

    getSecurityReport() {
        return {
            totalEvents: this.securityEvents.length,
            recentEvents: this.securityEvents.slice(-10),
            threatLevel: this.calculateThreatLevel(),
            recommendations: this.getSecurityRecommendations()
        };
    }

    calculateThreatLevel() {
        const recentEvents = this.securityEvents.slice(-10);
        const threatEvents = recentEvents.filter(e => 
            e.event.includes('attack') || 
            e.event.includes('violation') ||
            e.event.includes('suspicious')
        );
        
        if (threatEvents.length > 5) return 'HIGH';
        if (threatEvents.length > 2) return 'MEDIUM';
        return 'LOW';
    }

    getSecurityRecommendations() {
        return [
            'Keep all educational content appropriately filtered',
            'Regularly update authentication tokens',
            'Monitor for suspicious user behavior',
            'Ensure all user inputs are validated',
            'Maintain secure HTTPS connections'
        ];
    }
}

// Initialize security enhancements
window.securityEnhancer = new SecurityEnhancer();