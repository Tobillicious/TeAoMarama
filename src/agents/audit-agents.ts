/**
 * Cheap Audit Agents - Fast, specialized agents for quality assurance
 * 
 * These lightweight agents run specific audits using fast models
 * to catch issues early and maintain professional standards.
 */

import { AIOrchestrator } from '../ai/orchestrator';

interface AuditResult {
  category: string;
  status: 'pass' | 'warn' | 'fail';
  score: number; // 0-100
  issues: AuditIssue[];
  suggestions: string[];
  timestamp: string;
}

interface AuditIssue {
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  location?: string;
  code?: string;
}

/**
 * CSS/Tailwind Audit Agent - Fast checks for styling issues
 */
export class CSSAuditAgent {
  private orchestrator: AIOrchestrator;

  constructor() {
    this.orchestrator = new AIOrchestrator();
  }

  async auditStyling(files: { path: string; content: string }[]): Promise<AuditResult> {
    const prompt = `
You are a fast CSS/Tailwind audit agent. Check these files for common styling issues:

FILES:
${files.map(f => `${f.path}:\n${f.content.slice(0, 2000)}`).join('\n\n')}

Check for:
1. Tailwind CSS conflicts with regular CSS
2. Missing @tailwind directives
3. Unused CSS custom properties
4. Responsive design issues
5. Color contrast problems
6. Layout consistency

Return JSON with issues found and quick fixes.
Format: { "issues": [{"severity": "high", "message": "Description", "location": "file:line"}], "suggestions": ["Quick fix 1", "Fix 2"] }
    `;

    try {
      const result = await this.orchestrator.route({
        type: "css_audit",
        complexity: "simple", 
        priority: "speed",
        culturalSensitive: false,
        prompt
      });

      // Parse result and format as AuditResult
      const parsed = this.parseAuditResponse(result);
      
      return {
        category: 'CSS/Styling',
        status: parsed.issues.filter(i => i.severity === 'critical' || i.severity === 'high').length > 0 ? 'fail' : 
                parsed.issues.length > 0 ? 'warn' : 'pass',
        score: Math.max(0, 100 - (parsed.issues.length * 10)),
        issues: parsed.issues,
        suggestions: parsed.suggestions,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      return {
        category: 'CSS/Styling',
        status: 'fail',
        score: 0,
        issues: [{ severity: 'critical', message: `Audit failed: ${error}` }],
        suggestions: ['Fix audit system and retry'],
        timestamp: new Date().toISOString()
      };
    }
  }

  private parseAuditResponse(response: unknown): { issues: AuditIssue[]; suggestions: string[] } {
    try {
      if (typeof response === 'string') {
        // Try to extract JSON from string response
        const jsonMatch = response.match(/\{.*\}/s);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            issues: parsed.issues || [],
            suggestions: parsed.suggestions || []
          };
        }
      }
      
      return {
        issues: (response as any)?.issues || [],
        suggestions: (response as any)?.suggestions || []
      };
    } catch {
      // Fallback parsing
      return {
        issues: [{ severity: 'medium', message: 'Could not parse audit results - manual review needed' }],
        suggestions: ['Review audit system output parsing']
      };
    }
  }
}

/**
 * Navigation Audit Agent - Check navigation UX and accessibility
 */
export class NavigationAuditAgent {
  private orchestrator: AIOrchestrator;

  constructor() {
    this.orchestrator = new AIOrchestrator();
  }

  async auditNavigation(componentFiles: { path: string; content: string }[]): Promise<AuditResult> {
    const prompt = `
You are a UX audit agent focused on navigation. Review these navigation components:

COMPONENTS:
${componentFiles.map(f => `${f.path}:\n${f.content}`).join('\n\n')}

Check for:
1. Accessibility (ARIA labels, keyboard nav)
2. Mobile responsiveness
3. Clear navigation hierarchy
4. Consistent styling
5. Missing navigation items
6. User flow issues

Return JSON with specific actionable issues and improvements.
    `;

    const result = await this.orchestrator.route({
      type: "navigation_audit",
      complexity: "simple",
      priority: "speed", 
      culturalSensitive: false,
      prompt
    });

    const parsed = this.parseAuditResponse(result);
    
    return {
      category: 'Navigation/UX',
      status: parsed.issues.filter(i => i.severity === 'high').length > 0 ? 'fail' : 
              parsed.issues.length > 0 ? 'warn' : 'pass',
      score: Math.max(0, 100 - (parsed.issues.length * 12)),
      issues: parsed.issues,
      suggestions: parsed.suggestions,
      timestamp: new Date().toISOString()
    };
  }

  private parseAuditResponse(response: unknown): { issues: AuditIssue[]; suggestions: string[] } {
    // Same parsing logic as CSS agent
    try {
      const jsonMatch = typeof response === 'string' ? response.match(/\{.*\}/s) : null;
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : response;
      
      return {
        issues: parsed?.issues || [],
        suggestions: parsed?.suggestions || []
      };
    } catch {
      return {
        issues: [{ severity: 'medium', message: 'Navigation audit parsing failed' }],
        suggestions: ['Manual navigation review needed']
      };
    }
  }
}

/**
 * Performance Audit Agent - Quick performance checks
 */
export class PerformanceAuditAgent {
  private orchestrator: AIOrchestrator;

  constructor() {
    this.orchestrator = new AIOrchestrator();
  }

  async auditPerformance(appFiles: { path: string; content: string }[]): Promise<AuditResult> {
    const prompt = `
You are a performance audit agent. Check these React app files for performance issues:

FILES:
${appFiles.map(f => `${f.path}:\n${f.content.slice(0, 1500)}`).join('\n\n')}

Look for:
1. Large bundle imports 
2. Missing React.memo() for expensive components
3. Unnecessary re-renders
4. Large images without optimization
5. Blocking CSS/JS
6. Memory leaks (useEffect cleanup)

Return JSON with performance recommendations.
    `;

    const result = await this.orchestrator.route({
      type: "performance_audit",
      complexity: "simple",
      priority: "speed",
      culturalSensitive: false,
      prompt
    });

    const parsed = this.parseAuditResponse(result);
    
    return {
      category: 'Performance',
      status: parsed.issues.filter(i => i.severity === 'high').length > 0 ? 'fail' :
              parsed.issues.length > 3 ? 'warn' : 'pass',
      score: Math.max(0, 100 - (parsed.issues.length * 8)),
      issues: parsed.issues,
      suggestions: parsed.suggestions,
      timestamp: new Date().toISOString()
    };
  }

  private parseAuditResponse(response: unknown): { issues: AuditIssue[]; suggestions: string[] } {
    try {
      const jsonMatch = typeof response === 'string' ? response.match(/\{.*\}/s) : null;
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : response;
      
      return {
        issues: parsed?.issues || [],
        suggestions: parsed?.suggestions || []
      };
    } catch {
      return {
        issues: [{ severity: 'low', message: 'Performance audit needs manual review' }],
        suggestions: ['Run lighthouse audit for detailed performance metrics']
      };
    }
  }
}

/**
 * Accessibility Audit Agent - A11y compliance checks
 */
export class AccessibilityAuditAgent {
  private orchestrator: AIOrchestrator;

  constructor() {
    this.orchestrator = new AIOrchestrator();
  }

  async auditAccessibility(componentFiles: { path: string; content: string }[]): Promise<AuditResult> {
    const prompt = `
You are an accessibility audit agent. Check these React components for a11y issues:

COMPONENTS:
${componentFiles.map(f => `${f.path}:\n${f.content}`).join('\n\n')}

Check for:
1. Missing alt text on images
2. Missing ARIA labels and roles
3. Color contrast issues
4. Keyboard navigation support
5. Focus management
6. Screen reader compatibility
7. Form accessibility

Return JSON with specific accessibility violations and fixes.
    `;

    const result = await this.orchestrator.route({
      type: "accessibility_audit",
      complexity: "simple",
      priority: "speed",
      culturalSensitive: false,
      prompt
    });

    const parsed = this.parseAuditResponse(result);
    
    return {
      category: 'Accessibility',
      status: parsed.issues.filter(i => i.severity === 'critical' || i.severity === 'high').length > 0 ? 'fail' :
              parsed.issues.length > 0 ? 'warn' : 'pass',
      score: Math.max(0, 100 - (parsed.issues.length * 15)), // A11y is critical
      issues: parsed.issues,
      suggestions: parsed.suggestions,
      timestamp: new Date().toISOString()
    };
  }

  private parseAuditResponse(response: unknown): { issues: AuditIssue[]; suggestions: string[] } {
    try {
      const jsonMatch = typeof response === 'string' ? response.match(/\{.*\}/s) : null;
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : response;
      
      return {
        issues: parsed?.issues || [],
        suggestions: parsed?.suggestions || []
      };
    } catch {
      return {
        issues: [{ severity: 'medium', message: 'A11y audit parsing failed - manual review needed' }],
        suggestions: ['Run axe-core or WAVE tool for detailed accessibility audit']
      };
    }
  }
}

/**
 * Audit Orchestrator - Runs all audits and generates comprehensive report
 */
export class AuditOrchestrator {
  private cssAgent: CSSAuditAgent;
  private navAgent: NavigationAuditAgent;
  private perfAgent: PerformanceAuditAgent;
  private a11yAgent: AccessibilityAuditAgent;

  constructor() {
    this.cssAgent = new CSSAuditAgent();
    this.navAgent = new NavigationAuditAgent();
    this.perfAgent = new PerformanceAuditAgent();
    this.a11yAgent = new AccessibilityAuditAgent();
  }

  async runFullAudit(projectFiles: { [category: string]: { path: string; content: string }[] }): Promise<{
    overall: 'pass' | 'warn' | 'fail';
    score: number;
    results: AuditResult[];
    summary: string;
    priority_fixes: string[];
  }> {
    console.log('🔍 Running comprehensive audit with specialized agents...');
    
    const results: AuditResult[] = [];

    // Run audits in parallel for speed
    const auditPromises = [
      this.cssAgent.auditStyling(projectFiles.styles || []),
      this.navAgent.auditNavigation(projectFiles.navigation || []),
      this.perfAgent.auditPerformance(projectFiles.app || []),
      this.a11yAgent.auditAccessibility(projectFiles.components || [])
    ];

    const auditResults = await Promise.allSettled(auditPromises);
    
    auditResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        const categories = ['CSS/Styling', 'Navigation/UX', 'Performance', 'Accessibility'];
        results.push({
          category: categories[index],
          status: 'fail',
          score: 0,
          issues: [{ severity: 'critical', message: `Audit failed: ${result.reason}` }],
          suggestions: ['Fix audit system'],
          timestamp: new Date().toISOString()
        });
      }
    });

    // Calculate overall score and status
    const overallScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    const criticalIssues = results.flatMap(r => r.issues.filter(i => i.severity === 'critical'));
    const highIssues = results.flatMap(r => r.issues.filter(i => i.severity === 'high'));

    const overall = criticalIssues.length > 0 ? 'fail' : 
                   highIssues.length > 2 ? 'warn' : 'pass';

    // Generate priority fixes
    const priorityFixes = [
      ...criticalIssues.slice(0, 3).map(i => `CRITICAL: ${i.message}`),
      ...highIssues.slice(0, 3).map(i => `HIGH: ${i.message}`)
    ];

    const summary = this.generateSummary(results, overallScore, overall);

    console.log(`✅ Audit complete - Overall status: ${overall} (${overallScore.toFixed(0)}/100)`);

    return {
      overall,
      score: overallScore,
      results,
      summary,
      priority_fixes: priorityFixes
    };
  }

  private generateSummary(results: AuditResult[], score: number, status: string): string {
    const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
    const passCount = results.filter(r => r.status === 'pass').length;
    
    return `
Audit Summary (${score.toFixed(0)}/100 - ${status.toUpperCase()}):
- ${passCount}/${results.length} categories passed
- ${totalIssues} total issues found
- Categories: ${results.map(r => `${r.category} (${r.status})`).join(', ')}

${status === 'fail' ? '🚨 Critical issues need immediate attention' : 
  status === 'warn' ? '⚠️ Some improvements recommended' : 
  '✅ All audits passed - great work!'}
    `.trim();
  }
}

/**
 * Quick audit runner for immediate feedback
 */
export async function runQuickAudit(files: { path: string; content: string }[]): Promise<void> {
  const cssFiles = files.filter(f => f.path.includes('.css') || f.path.includes('style'));
  const componentFiles = files.filter(f => f.path.includes('.tsx') || f.path.includes('.jsx'));
  
  const orchestrator = new AuditOrchestrator();
  
  const auditResult = await orchestrator.runFullAudit({
    styles: cssFiles,
    navigation: componentFiles.filter(f => f.path.includes('Nav') || f.path.includes('nav')),
    app: componentFiles,
    components: componentFiles
  });

  console.log('\n📊 QUICK AUDIT RESULTS');
  console.log('═══════════════════════');
  console.log(auditResult.summary);
  
  if (auditResult.priority_fixes.length > 0) {
    console.log('\n🔧 PRIORITY FIXES:');
    auditResult.priority_fixes.forEach(fix => console.log(`  • ${fix}`));
  }
  
  console.log('\n💡 Run full audit for detailed breakdown');
}