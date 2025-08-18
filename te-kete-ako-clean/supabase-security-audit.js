/**
 * ================================================================
 * KAITIAKI HAUMARU - SUPABASE SECURITY AUDIT
 * ================================================================
 * 
 * Security Agent: Kaitiaki Haumaru
 * Mission: Address 15 Security Issues + 62 Performance Issues
 * Status: ACTIVE DEPLOYMENT
 * 
 * ================================================================
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase Configuration (from env-config.js)
const SUPABASE_URL = 'https://nlgldaqtubrlcqddppbq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM';

class KaitiakiHaumaru {
    constructor() {
        this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        this.securityIssues = [];
        this.performanceIssues = [];
        this.fixesApplied = [];
    }

    /**
     * 🔒 SECURITY AUDIT PHASE 1: Authentication & Authorization
     */
    async auditAuthentication() {
        console.log('🔒 KAITIAKI HAUMARU: Auditing Authentication...');
        
        try {
            // Check RLS (Row Level Security) policies
            const { data: policies, error } = await this.supabase
                .from('information_schema.policies')
                .select('*');
            
            if (error) {
                this.securityIssues.push({
                    type: 'RLS_POLICIES',
                    severity: 'HIGH',
                    description: 'Unable to verify RLS policies',
                    fix: 'Review and implement proper RLS policies'
                });
            } else {
                console.log(`✅ Found ${policies?.length || 0} RLS policies`);
            }

            // Check for exposed sensitive data
            await this.checkExposedCredentials();
            
        } catch (error) {
            console.error('❌ Authentication audit failed:', error.message);
        }
    }

    /**
     * 🔍 SECURITY AUDIT PHASE 2: Check for Exposed Credentials
     */
    async checkExposedCredentials() {
        console.log('🔍 Checking for exposed credentials...');
        
        const sensitivePatterns = [
            /eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g, // JWT tokens
            /sk_[a-zA-Z0-9_-]+/g, // Secret keys
            /password\s*[:=]\s*['"][^'"]+['"]/gi, // Hardcoded passwords
            /api_key\s*[:=]\s*['"][^'"]+['"]/gi // API keys
        ];

        const publicDir = path.join(__dirname, 'public');
        const files = this.findFiles(publicDir, ['.html', '.js', '.css']);

        for (const file of files) {
            const content = fs.readFileSync(file, 'utf8');
            
            for (const pattern of sensitivePatterns) {
                const matches = content.match(pattern);
                if (matches) {
                    this.securityIssues.push({
                        type: 'EXPOSED_CREDENTIALS',
                        severity: 'CRITICAL',
                        file: file,
                        description: `Found ${matches.length} potential credential exposure(s)`,
                        fix: 'Remove or encrypt sensitive data'
                    });
                }
            }
        }
    }

    /**
     * 🛡️ SECURITY AUDIT PHASE 3: Input Validation & Sanitization
     */
    async auditInputValidation() {
        console.log('🛡️ Auditing input validation...');
        
        const publicDir = path.join(__dirname, 'public');
        const htmlFiles = this.findFiles(publicDir, ['.html']);
        
        for (const file of htmlFiles) {
            const content = fs.readFileSync(file, 'utf8');
            
            // Check for unsafe input handling
            const unsafePatterns = [
                /innerHTML\s*=\s*[^;]+input[^;]*/gi,
                /document\.write\s*\([^)]*input[^)]*\)/gi,
                /eval\s*\([^)]*input[^)]*\)/gi
            ];
            
            for (const pattern of unsafePatterns) {
                if (pattern.test(content)) {
                    this.securityIssues.push({
                        type: 'UNSAFE_INPUT',
                        severity: 'HIGH',
                        file: file,
                        description: 'Unsafe input handling detected',
                        fix: 'Use safe DOM manipulation methods'
                    });
                }
            }
        }
    }

    /**
     * ⚡ PERFORMANCE AUDIT PHASE 1: Asset Optimization
     */
    async auditPerformance() {
        console.log('⚡ KAITIAKI HAUMARU: Auditing Performance...');
        
        const publicDir = path.join(__dirname, 'public');
        const files = this.findFiles(publicDir, ['.html', '.js', '.css']);
        
        for (const file of files) {
            const stats = fs.statSync(file);
            const sizeKB = stats.size / 1024;
            
            if (sizeKB > 500) { // Files larger than 500KB
                this.performanceIssues.push({
                    type: 'LARGE_FILE',
                    severity: 'MEDIUM',
                    file: file,
                    size: `${sizeKB.toFixed(2)}KB`,
                    fix: 'Optimize file size through minification/compression'
                });
            }
        }
    }

    /**
     * 🔧 APPLY SECURITY FIXES
     */
    async applySecurityFixes() {
        console.log('🔧 Applying security fixes...');
        
        // Fix 1: Add CSP headers to HTML files
        await this.addCSPHeaders();
        
        // Fix 2: Sanitize input handling
        await this.sanitizeInputHandling();
        
        // Fix 3: Remove debug statements
        await this.removeDebugStatements();
        
        console.log(`✅ Applied ${this.fixesApplied.length} security fixes`);
    }

    /**
     * 🛡️ Fix 1: Add Content Security Policy Headers
     */
    async addCSPHeaders() {
        const publicDir = path.join(__dirname, 'public');
        const htmlFiles = this.findFiles(publicDir, ['.html']);
        
        for (const file of htmlFiles) {
            let content = fs.readFileSync(file, 'utf8');
            
            // Add CSP meta tag if not present
            if (!content.includes('Content-Security-Policy')) {
                const cspMeta = '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' \'unsafe-inline\' https://cdn.jsdelivr.net https://unpkg.com; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com; font-src \'self\' https://fonts.gstatic.com; img-src \'self\' data: https:; connect-src \'self\' https://nlgldaqtubrlcqddppbq.supabase.co;">';
                
                content = content.replace('<head>', `<head>\n    ${cspMeta}`);
                fs.writeFileSync(file, content);
                
                this.fixesApplied.push({
                    type: 'CSP_HEADER',
                    file: file,
                    description: 'Added Content Security Policy header'
                });
            }
        }
    }

    /**
     * 🧹 Fix 2: Sanitize Input Handling
     */
    async sanitizeInputHandling() {
        const publicDir = path.join(__dirname, 'public');
        const jsFiles = this.findFiles(publicDir, ['.js']);
        
        for (const file of jsFiles) {
            let content = fs.readFileSync(file, 'utf8');
            
            // Replace unsafe innerHTML with textContent where appropriate
            content = content.replace(
                /\.innerHTML\s*=\s*([^;]+)/g,
                '.textContent = $1'
            );
            
            fs.writeFileSync(file, content);
            
            this.fixesApplied.push({
                type: 'INPUT_SANITIZATION',
                file: file,
                description: 'Replaced unsafe innerHTML with textContent'
            });
        }
    }

    /**
     * 🧹 Fix 3: Remove Debug Statements
     */
    async removeDebugStatements() {
        const publicDir = path.join(__dirname, 'public');
        const files = this.findFiles(publicDir, ['.html', '.js']);
        
        for (const file of files) {
            let content = fs.readFileSync(file, 'utf8');
            let originalContent = content;
            
            // Remove console.log, alert, debugger statements
            content = content.replace(/console\.log\([^)]*\);?\s*/g, '');
            content = content.replace(/alert\([^)]*\);?\s*/g, '');
            content = content.replace(/debugger;?\s*/g, '');
            
            if (content !== originalContent) {
                fs.writeFileSync(file, content);
                
                this.fixesApplied.push({
                    type: 'DEBUG_REMOVAL',
                    file: file,
                    description: 'Removed debug statements'
                });
            }
        }
    }

    /**
     * 📊 Generate Security Report
     */
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            agent: 'Kaitiaki Haumaru',
            summary: {
                securityIssues: this.securityIssues.length,
                performanceIssues: this.performanceIssues.length,
                fixesApplied: this.fixesApplied.length
            },
            securityIssues: this.securityIssues,
            performanceIssues: this.performanceIssues,
            fixesApplied: this.fixesApplied,
            recommendations: [
                'Implement proper RLS policies for all tables',
                'Add input validation on all forms',
                'Enable Supabase Auth with proper session management',
                'Implement rate limiting for API endpoints',
                'Add comprehensive error handling',
                'Enable Supabase Edge Functions for server-side validation'
            ]
        };

        fs.writeFileSync('supabase-security-report.json', JSON.stringify(report, null, 2));
        console.log('📊 Security report generated: supabase-security-report.json');
        
        return report;
    }

    /**
     * 🔍 Helper: Find files recursively
     */
    findFiles(dir, extensions) {
        const files = [];
        
        function traverse(currentDir) {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    traverse(fullPath);
                } else if (extensions.some(ext => item.endsWith(ext))) {
                    files.push(fullPath);
                }
            }
        }
        
        traverse(dir);
        return files;
    }

    /**
     * 🚀 MAIN EXECUTION
     */
    async execute() {
        console.log('🚀 KAITIAKI HAUMARU DEPLOYED - SECURITY AUDIT INITIATED');
        console.log('=' .repeat(60));
        
        // Phase 1: Security Audit
        await this.auditAuthentication();
        await this.auditInputValidation();
        
        // Phase 2: Performance Audit
        await this.auditPerformance();
        
        // Phase 3: Apply Fixes
        await this.applySecurityFixes();
        
        // Phase 4: Generate Report
        const report = this.generateReport();
        
        console.log('=' .repeat(60));
        console.log('✅ KAITIAKI HAUMARU MISSION COMPLETE');
        console.log(`🔒 Security Issues Found: ${report.summary.securityIssues}`);
        console.log(`⚡ Performance Issues Found: ${report.summary.performanceIssues}`);
        console.log(`🔧 Fixes Applied: ${report.summary.fixesApplied}`);
        
        return report;
    }
}

// Execute if run directly
if (require.main === module) {
    const agent = new KaitiakiHaumaru();
    agent.execute().catch(console.error);
}

module.exports = KaitiakiHaumaru;
