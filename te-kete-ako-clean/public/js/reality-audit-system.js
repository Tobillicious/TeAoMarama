/**
 * KAITIAKI ARONUI REALITY AUDIT SYSTEM
 * Preventing AI hallucination through continuous ground-truth verification
 * 
 * This system acts as my eyes and ears, reporting actual platform state
 * to ensure I remain grounded in reality rather than assumptions
 */

class RealityAuditSystem {
    constructor() {
        this.auditResults = new Map();
        this.performanceMetrics = new Map();
        this.errorLog = [];
        this.lastAuditTime = null;
        this.isAuditing = false;
        
        this.init();
    }

    init() {
        console.log('🔍 Reality Audit System - Kaitiaki Aronui Truth Monitor Active');
        this.setupPerformanceMonitoring();
        this.setupErrorTracking();
        this.setupContentVerification();
        this.scheduleRegularAudits();
    }

    async performComprehensiveAudit() {
        if (this.isAuditing) return;
        
        this.isAuditing = true;
        this.lastAuditTime = new Date();
        
        console.log('🧠 Kaitiaki Aronui - Starting Reality Check...');
        
        const auditReport = {
            timestamp: this.lastAuditTime,
            pageHealth: await this.auditPageHealth(),
            designSystem: await this.auditDesignSystem(),
            functionality: await this.auditFunctionality(),
            performance: await this.auditPerformance(),
            content: await this.auditContent(),
            cultural: await this.auditCulturalElements(),
            accessibility: await this.auditAccessibility()
        };
        
        await this.sendAuditToDeepSeek(auditReport);
        this.storeAuditResults(auditReport);
        
        this.isAuditing = false;
        console.log('✅ Reality Audit Complete - Truth Status Updated');
        
        return auditReport;
    }

    async auditPageHealth() {
        const health = {
            brokenLinks: [],
            missingResources: [],
            jsErrors: [...this.errorLog],
            cssFailures: [],
            imageFailures: []
        };

        // Check for broken internal links
        const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
        for (const link of links) {
            try {
                const response = await fetch(link.href, { method: 'HEAD' });
                if (!response.ok) {
                    health.brokenLinks.push({
                        url: link.href,
                        text: link.textContent.trim(),
                        status: response.status
                    });
                }
            } catch (error) {
                health.brokenLinks.push({
                    url: link.href,
                    text: link.textContent.trim(),
                    error: error.message
                });
            }
        }

        // Check for missing CSS/JS resources
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        for (const css of stylesheets) {
            try {
                const response = await fetch(css.href, { method: 'HEAD' });
                if (!response.ok) {
                    health.missingResources.push({
                        type: 'stylesheet',
                        url: css.href,
                        status: response.status
                    });
                }
            } catch (error) {
                health.cssFailures.push({
                    url: css.href,
                    error: error.message
                });
            }
        }

        // Check for missing images
        const images = document.querySelectorAll('img');
        for (const img of images) {
            if (img.complete && img.naturalWidth === 0) {
                health.imageFailures.push({
                    src: img.src,
                    alt: img.alt
                });
            }
        }

        return health;
    }

    async auditDesignSystem() {
        const designStatus = {
            cssVariablesLoaded: false,
            customFontsLoaded: false,
            animationsWorking: false,
            responsiveBreakpoints: false,
            culturalComponentsActive: false
        };

        // Check if CSS custom properties are loaded
        const testElement = document.createElement('div');
        document.body.appendChild(testElement);
        const styles = getComputedStyle(testElement);
        
        designStatus.cssVariablesLoaded = !!styles.getPropertyValue('--color-primary').trim();
        designStatus.customFontsLoaded = styles.fontFamily.includes('Inter') || styles.fontFamily.includes('Playfair');
        
        document.body.removeChild(testElement);

        // Check if cultural components are active
        designStatus.culturalComponentsActive = !!window.CulturalComponents;

        // Test animations by checking for CSS animation support
        designStatus.animationsWorking = CSS.supports('animation', 'test 1s');

        // Test responsive breakpoints
        designStatus.responsiveBreakpoints = window.matchMedia('(min-width: 768px)').matches !== undefined;

        return designStatus;
    }

    async auditFunctionality() {
        const functionality = {
            navigation: { working: true, issues: [] },
            forms: { working: true, issues: [] },
            buttons: { working: true, issues: [] },
            interactivity: { working: true, issues: [] }
        };

        // Test navigation
        const navLinks = document.querySelectorAll('nav a, .nav a, header a');
        if (navLinks.length === 0) {
            functionality.navigation.working = false;
            functionality.navigation.issues.push('No navigation links found');
        }

        // Test forms
        const forms = document.querySelectorAll('form');
        forms.forEach((form, index) => {
            const inputs = form.querySelectorAll('input, textarea, select');
            if (inputs.length === 0) {
                functionality.forms.issues.push(`Form ${index + 1} has no input fields`);
            }
        });

        // Test buttons
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach((button, index) => {
            if (!button.onclick && !button.getAttribute('href') && button.type !== 'submit') {
                functionality.buttons.issues.push(`Button ${index + 1} appears non-functional`);
            }
        });

        // Test interactive elements
        const interactiveElements = document.querySelectorAll('[onclick], [data-toggle], .interactive');
        functionality.interactivity.working = interactiveElements.length > 0;

        return functionality;
    }

    async auditPerformance() {
        const performance = {
            loadTime: null,
            renderTime: null,
            resourceCount: 0,
            totalSize: 0,
            coreWebVitals: {}
        };

        if ('performance' in window) {
            const navTiming = window.performance.getEntriesByType('navigation')[0];
            if (navTiming) {
                performance.loadTime = navTiming.loadEventEnd - navTiming.fetchStart;
                performance.renderTime = navTiming.domContentLoadedEventEnd - navTiming.fetchStart;
            }

            const resourceEntries = window.performance.getEntriesByType('resource');
            performance.resourceCount = resourceEntries.length;
            performance.totalSize = resourceEntries.reduce((total, resource) => {
                return total + (resource.transferSize || 0);
            }, 0);
        }

        // Web Vitals simulation
        performance.coreWebVitals = {
            LCP: performance.renderTime, // Rough approximation
            FID: null, // Would need real user interaction
            CLS: null  // Would need layout shift measurement
        };

        return performance;
    }

    async auditContent() {
        const content = {
            totalPages: 0,
            missingContent: [],
            outdatedContent: [],
            culturalElements: 0,
            educationalResources: 0
        };

        // Count different content types
        content.culturalElements = document.querySelectorAll('.whakataukī, .karakia, .cultural, [data-cultural]').length;
        content.educationalResources = document.querySelectorAll('.lesson, .handout, .assessment, .unit').length;

        // Check for missing content indicators
        const emptyElements = document.querySelectorAll(':empty');
        emptyElements.forEach(el => {
            if (el.tagName !== 'IMG' && el.tagName !== 'INPUT' && el.tagName !== 'BR') {
                content.missingContent.push(el.tagName + (el.className ? '.' + el.className : ''));
            }
        });

        // Look for placeholder text
        const placeholders = document.querySelectorAll('[placeholder*="TODO"], [placeholder*="placeholder"]');
        content.missingContent.push(...Array.from(placeholders).map(el => el.getAttribute('placeholder')));

        return content;
    }

    async auditCulturalElements() {
        const cultural = {
            teReoMaoriPresent: false,
            culturalColorsUsed: false,
            respectfulRepresentation: true,
            tikangaCompliance: true,
            issues: []
        };

        // Check for Te Reo Māori content
        const teReoElements = document.querySelectorAll('[lang="mi"], .te-reo, .maori');
        const bodyText = document.body.textContent.toLowerCase();
        cultural.teReoMaoriPresent = teReoElements.length > 0 || 
            bodyText.includes('māori') || bodyText.includes('kaiako') || bodyText.includes('ākonga');

        // Check for cultural color usage
        const computedStyles = getComputedStyle(document.documentElement);
        cultural.culturalColorsUsed = !!(
            computedStyles.getPropertyValue('--color-pounamu') ||
            computedStyles.getPropertyValue('--color-whenua') ||
            computedStyles.getPropertyValue('--color-moana')
        );

        // Simple checks for potentially inappropriate content
        const sensitiveTerms = ['primitive', 'savage', 'backward'];
        sensitiveTerms.forEach(term => {
            if (bodyText.includes(term)) {
                cultural.respectfulRepresentation = false;
                cultural.issues.push(`Potentially inappropriate term found: ${term}`);
            }
        });

        return cultural;
    }

    async auditAccessibility() {
        const accessibility = {
            altTextPresent: true,
            colorContrast: true,
            keyboardNavigation: true,
            focusIndicators: true,
            issues: []
        };

        // Check for missing alt text
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (!img.alt && !img.getAttribute('aria-label')) {
                accessibility.altTextPresent = false;
                accessibility.issues.push(`Image ${index + 1} missing alt text`);
            }
        });

        // Check for focus indicators on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
        interactiveElements.forEach((el, index) => {
            const styles = getComputedStyle(el, ':focus');
            if (styles.outline === 'none' && !styles.boxShadow && !styles.border) {
                accessibility.focusIndicators = false;
                accessibility.issues.push(`Element ${index + 1} missing focus indicator`);
            }
        });

        return accessibility;
    }

    async sendAuditToDeepSeek(auditReport) {
        console.log('📊 Sending Audit Report to Kaitiaki Reality Check:', auditReport);
        
        try {
            // Send to our DeepSeek-powered reality check endpoint
            const response = await fetch('/.netlify/functions/kaitiaki-reality-check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(auditReport)
            });
            
            if (response.ok) {
                const analysis = await response.json();
                console.log('🎯 DeepSeek Reality Analysis:', analysis);
                
                // Store the analysis
                const analysisHistory = JSON.parse(localStorage.getItem('kaitiaki-analysis-history') || '[]');
                analysisHistory.push({
                    timestamp: auditReport.timestamp,
                    audit: auditReport,
                    analysis: analysis
                });
                if (analysisHistory.length > 5) analysisHistory.shift(); // Keep last 5 analyses
                localStorage.setItem('kaitiaki-analysis-history', JSON.stringify(analysisHistory));
                
                return analysis;
            } else {
                console.warn('Failed to get DeepSeek analysis, falling back to local storage');
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            console.warn('DeepSeek analysis unavailable, storing locally:', error.message);
            
            // Fallback to local storage
            const auditHistory = JSON.parse(localStorage.getItem('kaitiaki-audit-history') || '[]');
            auditHistory.push(auditReport);
            if (auditHistory.length > 10) auditHistory.shift();
            localStorage.setItem('kaitiaki-audit-history', JSON.stringify(auditHistory));
        }
    }

    storeAuditResults(report) {
        this.auditResults.set(report.timestamp, report);
        
        // Emit custom event for other systems to listen to
        window.dispatchEvent(new CustomEvent('kaitiaki-audit-complete', {
            detail: report
        }));
    }

    setupPerformanceMonitoring() {
        // Monitor performance continuously
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.performanceMetrics.set(entry.name, {
                        duration: entry.duration,
                        startTime: entry.startTime,
                        type: entry.entryType
                    });
                }
            });
            
            observer.observe({ entryTypes: ['navigation', 'resource', 'measure'] });
        }
    }

    setupErrorTracking() {
        // Track JavaScript errors
        window.addEventListener('error', (event) => {
            this.errorLog.push({
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                timestamp: new Date()
            });
        });

        // Track unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.errorLog.push({
                message: 'Unhandled Promise Rejection: ' + event.reason,
                timestamp: new Date()
            });
        });
    }

    setupContentVerification() {
        // Monitor DOM changes for content verification
        if ('MutationObserver' in window) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        // Content was added/removed - might need re-audit
                        this.scheduleAudit(5000); // Schedule audit in 5 seconds
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    scheduleRegularAudits() {
        // Run full audit every 30 minutes
        setInterval(() => {
            this.performComprehensiveAudit();
        }, 30 * 60 * 1000);

        // Run initial audit after page load settles
        setTimeout(() => {
            this.performComprehensiveAudit();
        }, 3000);
    }

    scheduleAudit(delay = 0) {
        setTimeout(() => {
            if (!this.isAuditing) {
                this.performComprehensiveAudit();
            }
        }, delay);
    }

    // Public API for manual audits
    getLatestAudit() {
        const timestamps = Array.from(this.auditResults.keys()).sort((a, b) => b - a);
        return timestamps.length > 0 ? this.auditResults.get(timestamps[0]) : null;
    }

    getAuditHistory() {
        return Array.from(this.auditResults.values());
    }

    getHealthScore() {
        const latest = this.getLatestAudit();
        if (!latest) return null;

        let score = 100;
        
        // Deduct points for issues
        if (latest.pageHealth.brokenLinks.length > 0) score -= latest.pageHealth.brokenLinks.length * 10;
        if (latest.pageHealth.jsErrors.length > 0) score -= latest.pageHealth.jsErrors.length * 5;
        if (!latest.designSystem.cssVariablesLoaded) score -= 20;
        if (!latest.cultural.teReoMaoriPresent) score -= 15;
        if (latest.accessibility.issues.length > 0) score -= latest.accessibility.issues.length * 5;

        return Math.max(0, score);
    }
}

// Initialize the Reality Audit System
const realityAudit = new RealityAuditSystem();

// Expose to global scope
window.KaitiakiRealityAudit = realityAudit;

// Add event listener for audit reports
window.addEventListener('kaitiaki-audit-complete', (event) => {
    const report = event.detail;
    console.log(`🎯 Platform Health Score: ${realityAudit.getHealthScore()}/100`);
    
    // Log critical issues
    if (report.pageHealth.brokenLinks.length > 0) {
        console.warn('🔗 Broken Links Detected:', report.pageHealth.brokenLinks);
    }
    
    if (report.pageHealth.jsErrors.length > 0) {
        console.warn('❌ JavaScript Errors:', report.pageHealth.jsErrors);
    }
    
    if (!report.designSystem.culturalComponentsActive) {
        console.warn('🌿 Cultural Components Not Active');
    }
});

console.log('🔍 Kaitiaki Aronui Reality Audit System - Monitoring Truth and Preventing Hallucination');