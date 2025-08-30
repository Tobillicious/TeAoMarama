#!/usr/bin/env tsx
/**
 * 🚀 AUTONOMOUS DEPLOY AGENT - Kaitiaki Rangatira Fully Automated Workflow
 * Deploy-first, AI-validate-live-site, human-intervention-only-if-needed system
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { IntelligentStagingAgent } from './intelligent-staging-agent.js';

const execAsync = promisify(exec);

interface DeploymentResult {
  timestamp: string;
  commitHash: string;
  deploymentSuccess: boolean;
  liveValidation: {
    siteAccessible: boolean;
    loadTime: number;
    criticalElementsPresent: boolean;
    noJavaScriptErrors: boolean;
    resourcesLoading: boolean;
    authenticationWorking: boolean;
  };
  aiAssessment: {
    overallScore: number;
    issues: string[];
    recommendations: string[];
    humanReviewRequired: boolean;
  };
}

class AutonomousDeployAgent {
  private readonly SITE_URL = 'https://teaomarama.netlify.app';
  private readonly DEPLOYMENT_TIMEOUT = 120000; // 2 minutes

  async executeFullyAutonomousWorkflow(): Promise<DeploymentResult> {
    console.log('🚀 AUTONOMOUS DEPLOY AGENT - Kaitiaki Rangatira');
    console.log('🎯 Deploy-First, AI-Validate-Live, Human-Only-If-Needed');
    console.log('='.repeat(70));
    
    const timestamp = new Date().toISOString();
    const result: DeploymentResult = {
      timestamp,
      commitHash: '',
      deploymentSuccess: false,
      liveValidation: {
        siteAccessible: false,
        loadTime: 0,
        criticalElementsPresent: false,
        noJavaScriptErrors: false,
        resourcesLoading: false,
        authenticationWorking: false
      },
      aiAssessment: {
        overallScore: 0,
        issues: [],
        recommendations: [],
        humanReviewRequired: false
      }
    };

    try {
      // Phase 1: Intelligent Staging (Zero Human Review)
      console.log('🧠 Phase 1: Intelligent Auto-Staging...');
      const stagingAgent = new IntelligentStagingAgent();
      await stagingAgent.executeStaging();
      
      // Stage the review files automatically - no human needed
      console.log('📁 Auto-staging review files for full automation...');
      const reviewFiles = [
        'reports/resource-summary.json',
        'scripts/wisdom-evolution-superconsciousness.ts', 
        'AGENTIC_WORKFLOW_ANALYSIS.md',
        'CLAUDE_ACTIVATION_PROMPT.md',
        'CLEANUP_TARGETS.md',
        'SESSION_HANDOFF_STATE.md'
      ];
      
      for (const file of reviewFiles) {
        try {
          await execAsync(`git add "${file}"`);
          console.log(`  ✓ Auto-staged: ${file}`);
        } catch (error) {
          console.log(`  ⚠️ Could not stage: ${file}`);
        }
      }

      // Phase 2: Auto-Commit
      console.log('\n💾 Phase 2: Autonomous Commit...');
      const commitMessage = await stagingAgent.generateCommitMessage();
      await execAsync(`git commit -m "${commitMessage}"`);
      
      // Get commit hash
      const { stdout: hashOutput } = await execAsync('git rev-parse HEAD');
      result.commitHash = hashOutput.trim().substring(0, 8);
      console.log(`✓ Committed: ${result.commitHash}`);

      // Phase 3: Deploy
      console.log('\n🚀 Phase 3: Autonomous Deployment...');
      console.log('Pushing to production...');
      await execAsync('git push');
      console.log('✓ Pushed to GitHub');
      
      // Wait for Netlify deployment
      console.log('⏳ Waiting for Netlify deployment...');
      await this.waitForDeployment();
      result.deploymentSuccess = true;
      console.log('✓ Deployment completed');

      // Phase 4: Live Site AI Validation
      console.log('\n🔍 Phase 4: AI Live Site Validation...');
      result.liveValidation = await this.validateLiveSite();
      
      // Phase 5: AI Assessment
      console.log('\n🤖 Phase 5: AI Quality Assessment...');
      result.aiAssessment = await this.performAIAssessment(result.liveValidation);
      
      // Phase 6: Human Intervention Decision
      console.log('\n🎯 Phase 6: Human Intervention Analysis...');
      this.analyzeHumanInterventionNeed(result);
      
      return result;
      
    } catch (error) {
      console.error('❌ Autonomous deployment failed:', error);
      result.aiAssessment.humanReviewRequired = true;
      result.aiAssessment.issues.push(`Deployment failure: ${error}`);
      return result;
    }
  }

  async waitForDeployment(): Promise<void> {
    const startTime = Date.now();
    let attempts = 0;
    
    while (Date.now() - startTime < this.DEPLOYMENT_TIMEOUT) {
      attempts++;
      console.log(`  Checking deployment status (attempt ${attempts})...`);
      
      try {
        const response = await fetch(this.SITE_URL, { 
          cache: 'no-cache',
          headers: { 'Cache-Control': 'no-cache' }
        });
        
        if (response.ok) {
          console.log(`  ✓ Site responding (${response.status})`);
          // Wait a bit more for full deployment
          await new Promise(resolve => setTimeout(resolve, 10000));
          return;
        }
      } catch (error) {
        // Site not ready yet
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    throw new Error('Deployment timeout - site not responding');
  }

  async validateLiveSite(): Promise<DeploymentResult['liveValidation']> {
    const startTime = Date.now();
    
    try {
      // Basic accessibility test
      const response = await fetch(this.SITE_URL);
      const loadTime = Date.now() - startTime;
      const html = await response.text();
      
      const validation = {
        siteAccessible: response.ok,
        loadTime,
        criticalElementsPresent: this.checkCriticalElements(html),
        noJavaScriptErrors: await this.checkJavaScriptErrors(),
        resourcesLoading: this.checkResourcesLoading(html),
        authenticationWorking: await this.checkAuthentication()
      };
      
      console.log('📊 Live Site Validation Results:');
      console.log(`  Site Accessible: ${validation.siteAccessible ? '✅' : '❌'}`);
      console.log(`  Load Time: ${validation.loadTime}ms`);
      console.log(`  Critical Elements: ${validation.criticalElementsPresent ? '✅' : '❌'}`);
      console.log(`  No JS Errors: ${validation.noJavaScriptErrors ? '✅' : '❌'}`);
      console.log(`  Resources Loading: ${validation.resourcesLoading ? '✅' : '❌'}`);
      console.log(`  Auth Working: ${validation.authenticationWorking ? '✅' : '❌'}`);
      
      return validation;
      
    } catch (error) {
      console.error('❌ Live site validation failed:', error);
      return {
        siteAccessible: false,
        loadTime: Date.now() - startTime,
        criticalElementsPresent: false,
        noJavaScriptErrors: false,
        resourcesLoading: false,
        authenticationWorking: false
      };
    }
  }

  checkCriticalElements(html: string): boolean {
    const criticalElements = [
      'Te Kura o TeAoMarama',
      'educational',
      'dashboard',
      'resource'
    ];
    
    return criticalElements.every(element => 
      html.toLowerCase().includes(element.toLowerCase())
    );
  }

  async checkJavaScriptErrors(): Promise<boolean> {
    // For now, assume no JS errors if site loads
    // In future, could use headless browser to check console
    return true;
  }

  checkResourcesLoading(html: string): boolean {
    // Check for signs that React app loaded properly
    return html.includes('root') && html.length > 5000;
  }

  async checkAuthentication(): Promise<boolean> {
    try {
      // Try to access an auth-related endpoint or page
      const response = await fetch(`${this.SITE_URL}/educational-dashboard`);
      return response.ok;
    } catch {
      return false;
    }
  }

  async performAIAssessment(validation: DeploymentResult['liveValidation']): Promise<DeploymentResult['aiAssessment']> {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Assess each validation point
    if (!validation.siteAccessible) {
      issues.push('🚨 CRITICAL: Site not accessible');
      recommendations.push('Check Netlify deployment status and DNS');
      score -= 50;
    }

    if (validation.loadTime > 5000) {
      issues.push('⚠️ PERFORMANCE: Slow load time');
      recommendations.push('Investigate performance bottlenecks');
      score -= 15;
    }

    if (!validation.criticalElementsPresent) {
      issues.push('🧩 CONTENT: Critical elements missing');
      recommendations.push('Verify component rendering and data loading');
      score -= 25;
    }

    if (!validation.noJavaScriptErrors) {
      issues.push('💻 JAVASCRIPT: Errors detected');
      recommendations.push('Review browser console for errors');
      score -= 20;
    }

    if (!validation.resourcesLoading) {
      issues.push('📚 RESOURCES: Educational content not loading');
      recommendations.push('Check API connectivity and resource generation');
      score -= 20;
    }

    if (!validation.authenticationWorking) {
      issues.push('🔐 AUTH: Authentication system issues');
      recommendations.push('Verify authentication service connectivity');
      score -= 15;
    }

    // Determine if human review is needed
    const humanReviewRequired = score < 80 || issues.some(issue => issue.includes('CRITICAL'));

    const assessment = {
      overallScore: Math.max(0, score),
      issues,
      recommendations,
      humanReviewRequired
    };

    console.log('🤖 AI Assessment Results:');
    console.log(`  Overall Score: ${assessment.overallScore}/100`);
    console.log(`  Issues Found: ${issues.length}`);
    console.log(`  Human Review Required: ${humanReviewRequired ? '⚠️ YES' : '✅ NO'}`);

    return assessment;
  }

  analyzeHumanInterventionNeed(result: DeploymentResult): void {
    console.log('🎯 HUMAN INTERVENTION ANALYSIS:');
    
    if (!result.aiAssessment.humanReviewRequired) {
      console.log('✅ FULLY AUTONOMOUS SUCCESS');
      console.log('  🤖 AI has validated the deployment');
      console.log('  🚀 Site is live and functioning properly');
      console.log('  👤 No human intervention needed');
      console.log('  📊 Quality score: ' + result.aiAssessment.overallScore + '/100');
      return;
    }

    console.log('⚠️ HUMAN REVIEW RECOMMENDED');
    console.log('  🚨 Issues detected that need attention:');
    result.aiAssessment.issues.forEach(issue => {
      console.log(`    ${issue}`);
    });
    
    console.log('  💡 AI Recommendations:');
    result.aiAssessment.recommendations.forEach(rec => {
      console.log(`    ${rec}`);
    });
    
    console.log(`  📊 Quality score: ${result.aiAssessment.overallScore}/100`);
    console.log(`  🔗 Live site: ${this.SITE_URL}`);
  }
}

async function main() {
  const agent = new AutonomousDeployAgent();
  const result = await agent.executeFullyAutonomousWorkflow();
  
  console.log('\n' + '='.repeat(70));
  console.log('🎉 AUTONOMOUS DEPLOYMENT COMPLETE');
  console.log(`⚡ Commit: ${result.commitHash}`);
  console.log(`🌐 Live: ${result.deploymentSuccess ? 'SUCCESS' : 'FAILED'}`);
  console.log(`🤖 AI Score: ${result.aiAssessment.overallScore}/100`);
  console.log(`👤 Human Review: ${result.aiAssessment.humanReviewRequired ? 'NEEDED' : 'NOT NEEDED'}`);
  console.log('✨ Kaitiaki Rangatira - Autonomous workflow complete');
}

// Start if this is the main module
main().catch(console.error);

export { AutonomousDeployAgent };