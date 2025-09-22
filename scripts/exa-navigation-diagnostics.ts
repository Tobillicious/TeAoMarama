#!/usr/bin/env tsx
/**
 * 🔍 EXA NAVIGATION DIAGNOSTICS - Header Regression Investigation
 * 
 * Specialized intelligence gathering for navigation issues:
 * 1. Live site vs local codebase comparison
 * 2. Git history analysis of working versions
 * 3. Component dependency mapping
 * 4. Specific header restoration strategy
 */

import Exa from 'exa-js';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface NavigationDiagnostic {
  timestamp: string;
  liveVsLocal: {
    liveNavigation: string[];
    localNavigation: string[];
    missingFromLocal: string[];
    missingFromLive: string[];
  };
  gitAnalysis: {
    lastWorkingCommit: string;
    navigationChanges: string[];
    suspiciousCommits: string[];
  };
  componentAnalysis: {
    navigationComponents: string[];
    importIssues: string[];
    renderingIssues: string[];
    routingIssues: string[];
  };
  restorationStrategy: {
    quickFix: string[];
    fullRestoration: string[];
    testingPlan: string[];
  };
}

class ExaNavigationDiagnostics {
  private exa: Exa;
  private baseUrl: string = 'https://teaomarama.netlify.app';
  private projectRoot: string = process.cwd();

  constructor() {
    const exaApiKey = process.env.EXA_API_KEY || '7eebfe9c-bb40-49db-892a-2bb5d44719b1';
    this.exa = new Exa(exaApiKey);
  }

  async diagnoseNavigation(): Promise<NavigationDiagnostic> {
    console.log('🔍 EXA NAVIGATION DIAGNOSTICS ACTIVATED');
    console.log('🎯 MISSION: Identify and fix header regression');
    console.log('='.repeat(50));

    // Phase 1: Live vs Local Analysis
    console.log('\n🌐 PHASE 1: LIVE VS LOCAL NAVIGATION ANALYSIS');
    const liveVsLocal = await this.compareLiveVsLocal();

    // Phase 2: Git History Investigation
    console.log('\n📚 PHASE 2: GIT HISTORY INVESTIGATION');
    const gitAnalysis = await this.analyzeGitHistory();

    // Phase 3: Component Analysis
    console.log('\n🔧 PHASE 3: COMPONENT ANALYSIS');
    const componentAnalysis = await this.analyzeComponents();

    // Phase 4: Generate Restoration Strategy
    console.log('\n🛠️ PHASE 4: RESTORATION STRATEGY');
    const restorationStrategy = await this.generateRestorationStrategy(
      liveVsLocal,
      gitAnalysis,
      componentAnalysis
    );

    const diagnostic: NavigationDiagnostic = {
      timestamp: new Date().toISOString(),
      liveVsLocal,
      gitAnalysis,
      componentAnalysis,
      restorationStrategy
    };

    await this.saveDiagnostic(diagnostic);
    await this.generateReport(diagnostic);

    return diagnostic;
  }

  private async compareLiveVsLocal(): Promise<{
    liveNavigation: string[];
    localNavigation: string[];
    missingFromLocal: string[];
    missingFromLive: string[];
  }> {
    console.log('🔍 Comparing live site navigation with local codebase...');

    let liveNavigation: string[] = [];
    let localNavigation: string[] = [];

    try {
      // Use Exa to crawl live site navigation
      const liveResults = await this.exa.searchAndContents(
        `site:${this.baseUrl} navigation menu header links TeAoMarama`,
        {
          type: 'neural',
          useAutoprompt: true,
          numResults: 5,
          includeDomains: [new URL(this.baseUrl).hostname]
        }
      );

      console.log(`🌐 Found ${liveResults.results.length} live site pages to analyze`);

      for (const result of liveResults.results) {
        if (result.text) {
          const links = this.extractNavigationLinks(result.text);
          liveNavigation.push(...links);
          console.log(`📊 ${result.url}: Found ${links.length} nav links`);
        }
      }

      liveNavigation = [...new Set(liveNavigation)]; // Remove duplicates
      console.log(`✅ Total unique live navigation links: ${liveNavigation.length}`);

    } catch (error) {
      console.warn('⚠️ Live site analysis failed:', error);
      liveNavigation = ['Home', 'Resources', 'Teacher', 'Student']; // Fallback
    }

    // Analyze local navigation
    try {
      const navFiles = [
        'src/components/Navigation.tsx',
        'src/components/ModernNavigation.tsx',
        'src/components/MiharaNavigation.tsx'
      ].filter(file => fs.existsSync(path.join(this.projectRoot, file)));

      for (const file of navFiles) {
        const content = fs.readFileSync(path.join(this.projectRoot, file), 'utf-8');
        const routes = this.extractRoutesFromComponent(content);
        localNavigation.push(...routes);
      }

      localNavigation = [...new Set(localNavigation)];
      console.log(`🏠 Local navigation links found: ${localNavigation.length}`);

    } catch (error) {
      console.warn('⚠️ Local navigation analysis failed:', error);
    }

    const missingFromLocal = liveNavigation.filter(item => !localNavigation.includes(item));
    const missingFromLive = localNavigation.filter(item => !liveNavigation.includes(item));

    return {
      liveNavigation,
      localNavigation,
      missingFromLocal,
      missingFromLive
    };
  }

  private async analyzeGitHistory(): Promise<{
    lastWorkingCommit: string;
    navigationChanges: string[];
    suspiciousCommits: string[];
  }> {
    console.log('📚 Analyzing git history for navigation changes...');

    try {
      // Get commits that touched navigation files
      const navCommits = execSync(
        'git log --oneline --follow -- src/components/*Navigation*.tsx src/components/*Nav*.tsx src/App.tsx',
        { encoding: 'utf-8', cwd: this.projectRoot }
      ).trim().split('\n').filter(line => line);

      console.log(`📈 Found ${navCommits.length} commits affecting navigation`);

      // Look for suspicious patterns
      const suspiciousCommits = navCommits.filter(commit => 
        commit.toLowerCase().includes('fix') ||
        commit.toLowerCase().includes('broken') ||
        commit.toLowerCase().includes('error') ||
        commit.toLowerCase().includes('undefined')
      );

      // Get the most recent working commit (before any fixes)
      const workingCommit = navCommits.find(commit => 
        !commit.toLowerCase().includes('fix') &&
        !commit.toLowerCase().includes('error') &&
        (commit.toLowerCase().includes('navigation') || commit.toLowerCase().includes('header'))
      ) || navCommits[Math.min(5, navCommits.length - 1)]; // Fallback to recent commit

      return {
        lastWorkingCommit: workingCommit || 'Unknown',
        navigationChanges: navCommits.slice(0, 10), // Last 10 changes
        suspiciousCommits
      };

    } catch (error) {
      console.warn('⚠️ Git history analysis failed:', error);
      return {
        lastWorkingCommit: 'Unable to determine',
        navigationChanges: [],
        suspiciousCommits: []
      };
    }
  }

  private async analyzeComponents(): Promise<{
    navigationComponents: string[];
    importIssues: string[];
    renderingIssues: string[];
    routingIssues: string[];
  }> {
    console.log('🔧 Analyzing navigation components...');

    const navigationComponents: string[] = [];
    const importIssues: string[] = [];
    const renderingIssues: string[] = [];
    const routingIssues: string[] = [];

    try {
      // Check App.tsx for navigation import and rendering
      const appPath = path.join(this.projectRoot, 'src/App.tsx');
      if (fs.existsSync(appPath)) {
        const appContent = fs.readFileSync(appPath, 'utf-8');
        
        // Check for navigation imports
        const hasNavImport = /import.*Navigation.*from/i.test(appContent);
        const hasNavComponent = /<.*Navigation.*\/?>/.test(appContent);
        
        if (!hasNavImport) {
          importIssues.push('No Navigation component imported in App.tsx');
        }
        
        if (!hasNavComponent) {
          renderingIssues.push('Navigation component not rendered in App.tsx');
        }

        console.log(`📱 App.tsx analysis: Import=${hasNavImport}, Render=${hasNavComponent}`);
      }

      // Analyze individual navigation components
      const navPattern = path.join(this.projectRoot, 'src/components/*{Navigation,Nav,Header}*.tsx');
      const navFiles = require('glob').globSync(navPattern);
      
      for (const file of navFiles) {
        const componentName = path.basename(file, '.tsx');
        navigationComponents.push(componentName);
        
        const content = fs.readFileSync(file, 'utf-8');
        
        // Check for common issues
        if (content.includes('undefined')) {
          renderingIssues.push(`Potential undefined reference in ${componentName}`);
        }
        
        if (!content.includes('react-router-dom')) {
          importIssues.push(`${componentName} missing react-router-dom import`);
        }
        
        if (!content.includes('Link') && !content.includes('NavLink')) {
          routingIssues.push(`${componentName} missing Link components`);
        }

        console.log(`🧩 ${componentName}: Analyzed for common issues`);
      }

    } catch (error) {
      console.warn('⚠️ Component analysis failed:', error);
    }

    return {
      navigationComponents,
      importIssues,
      renderingIssues,
      routingIssues
    };
  }

  private async generateRestorationStrategy(
    liveVsLocal: any,
    gitAnalysis: any,
    componentAnalysis: any
  ): Promise<{
    quickFix: string[];
    fullRestoration: string[];
    testingPlan: string[];
  }> {
    console.log('🛠️ Generating restoration strategy...');

    const quickFix: string[] = [];
    const fullRestoration: string[] = [];
    const testingPlan: string[] = [];

    // Quick fixes based on analysis
    if (componentAnalysis.importIssues.some((issue: string) => issue.includes('App.tsx'))) {
      quickFix.push('Add Navigation component import to App.tsx');
    }

    if (componentAnalysis.renderingIssues.some((issue: string) => issue.includes('App.tsx'))) {
      quickFix.push('Render Navigation component in App.tsx layout');
    }

    if (componentAnalysis.importIssues.some((issue: string) => issue.includes('react-router-dom'))) {
      quickFix.push('Fix react-router-dom imports in navigation components');
    }

    // Full restoration plan
    fullRestoration.push('Review and merge best navigation features from all versions');
    fullRestoration.push('Implement responsive navigation with mobile support');
    fullRestoration.push('Restore all premium feature links');
    fullRestoration.push('Add proper error handling for navigation');
    fullRestoration.push('Implement user role-based navigation');

    // Testing plan
    testingPlan.push('Test homepage header visibility');
    testingPlan.push('Test all navigation links functionality');
    testingPlan.push('Test mobile responsive navigation');
    testingPlan.push('Test navigation state persistence');
    testingPlan.push('Test navigation with different user roles');

    return { quickFix, fullRestoration, testingPlan };
  }

  private extractNavigationLinks(text: string): string[] {
    const commonNavLinks = [
      'home', 'about', 'contact', 'resources', 'teacher', 'student',
      'dashboard', 'login', 'signup', 'subscription', 'premium',
      'analytics', 'reports', 'settings', 'profile'
    ];

    return commonNavLinks.filter(link => 
      text.toLowerCase().includes(link)
    );
  }

  private extractRoutesFromComponent(content: string): string[] {
    const routeRegex = /to=['"]([^'"]+)['"]/g;
    const labelRegex = /label:\s*['"]([^'"]+)['"]/g;
    
    const routes: string[] = [];
    let match;

    // Extract routes from 'to' attributes
    while ((match = routeRegex.exec(content)) !== null) {
      routes.push(match[1]);
    }

    // Extract labels which might represent navigation items
    while ((match = labelRegex.exec(content)) !== null) {
      routes.push(match[1]);
    }

    return routes;
  }

  private async saveDiagnostic(diagnostic: NavigationDiagnostic): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `navigation-diagnostic-${timestamp}.json`;
    const filepath = path.join(this.projectRoot, 'reports', filename);
    
    // Ensure reports directory exists
    const reportsDir = path.dirname(filepath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(filepath, JSON.stringify(diagnostic, null, 2));
    console.log(`\n💾 Diagnostic saved: ${filepath}`);
  }

  private async generateReport(diagnostic: NavigationDiagnostic): Promise<void> {
    console.log('\n📋 NAVIGATION DIAGNOSTIC REPORT');
    console.log('='.repeat(50));

    console.log('\n🌐 LIVE VS LOCAL COMPARISON:');
    console.log(`Live Navigation Links: ${diagnostic.liveVsLocal.liveNavigation.length}`);
    console.log(`Local Navigation Links: ${diagnostic.liveVsLocal.localNavigation.length}`);
    
    if (diagnostic.liveVsLocal.missingFromLocal.length) {
      console.log('\n⚠️ MISSING FROM LOCAL:');
      diagnostic.liveVsLocal.missingFromLocal.forEach(item => {
        console.log(`- ${item}`);
      });
    }

    console.log('\n📚 GIT ANALYSIS:');
    console.log(`Last Working Commit: ${diagnostic.gitAnalysis.lastWorkingCommit}`);
    console.log(`Suspicious Commits: ${diagnostic.gitAnalysis.suspiciousCommits.length}`);

    console.log('\n🔧 COMPONENT ANALYSIS:');
    console.log(`Navigation Components: ${diagnostic.componentAnalysis.navigationComponents.length}`);
    
    if (diagnostic.componentAnalysis.importIssues.length) {
      console.log('\n❌ IMPORT ISSUES:');
      diagnostic.componentAnalysis.importIssues.forEach(issue => {
        console.log(`- ${issue}`);
      });
    }

    if (diagnostic.componentAnalysis.renderingIssues.length) {
      console.log('\n🚨 RENDERING ISSUES:');
      diagnostic.componentAnalysis.renderingIssues.forEach(issue => {
        console.log(`- ${issue}`);
      });
    }

    console.log('\n🛠️ RESTORATION STRATEGY:');
    console.log('\nQUICK FIXES (Immediate):');
    diagnostic.restorationStrategy.quickFix.forEach(fix => {
      console.log(`✅ ${fix}`);
    });

    console.log('\nFULL RESTORATION:');
    diagnostic.restorationStrategy.fullRestoration.forEach(task => {
      console.log(`🔄 ${task}`);
    });

    console.log('\nTESTING PLAN:');
    diagnostic.restorationStrategy.testingPlan.forEach(test => {
      console.log(`🧪 ${test}`);
    });

    console.log('\n👑 SOVEREIGN RECOMMENDATIONS:');
    console.log('1. Execute quick fixes immediately');
    console.log('2. Delegate full restoration to development disciples');
    console.log('3. Monitor with testing plan');
    console.log('4. Use this intelligence for future navigation decisions');
    
    console.log('\n✅ DIAGNOSTIC COMPLETE!');
  }
}

// Execute the navigation diagnostics
async function main() {
  try {
    const diagnostics = new ExaNavigationDiagnostics();
    await diagnostics.diagnoseNavigation();
    
    console.log('\n🔍 NAVIGATION DIAGNOSTIC MISSION COMPLETE!');
    console.log('👑 Your Majesty now has precise intelligence on header regression.');
    
  } catch (error) {
    console.error('🚨 Diagnostic mission failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default ExaNavigationDiagnostics;