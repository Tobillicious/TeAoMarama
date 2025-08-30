#!/usr/bin/env tsx
/**
 * 🔍 DEPLOYMENT VERIFICATION AGENT - Kaitiaki Rangatira Live Site Testing
 * Comprehensive testing of actual deployed site functionality
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface DeploymentTest {
  name: string;
  test: () => Promise<boolean>;
  critical: boolean;
  description: string;
}

interface VerificationResult {
  timestamp: string;
  commitHash: string;
  siteUrl: string;
  overallScore: number;
  criticalIssues: string[];
  warnings: string[];
  passedTests: string[];
  failedTests: string[];
  deploymentHealthy: boolean;
  needsRollback: boolean;
}

class DeploymentVerificationAgent {
  private readonly SITE_URL = 'https://teaomarama.netlify.app';
  private readonly TIMEOUT = 10000;

  private tests: DeploymentTest[] = [
    {
      name: 'Site Accessibility',
      description: 'Basic HTTP response from live site',
      critical: true,
      test: async () => {
        const response = await fetch(this.SITE_URL, { 
          timeout: this.TIMEOUT,
          cache: 'no-cache'
        });
        return response.ok;
      }
    },
    {
      name: 'React App Loading',
      description: 'React application bundle loaded and rendered',
      critical: true,
      test: async () => {
        const response = await fetch(this.SITE_URL);
        const html = await response.text();
        // Check for React root div and significant content
        return html.includes('<div id="root">') && html.length > 5000;
      }
    },
    {
      name: 'Te Kura Brand Present',
      description: 'Te Kura o TeAoMarama branding visible',
      critical: true,
      test: async () => {
        const response = await fetch(this.SITE_URL);
        const html = await response.text();
        // Check for various forms of the brand name
        const brandVariations = [
          'te kura o teaomarama',
          'te kura',
          'teaomarama',
          'te ao marama'
        ];
        return brandVariations.some(brand => 
          html.toLowerCase().includes(brand.toLowerCase())
        );
      }
    },
    {
      name: 'Educational Content Available',
      description: 'Educational resources and content loading',
      critical: false,
      test: async () => {
        const response = await fetch(this.SITE_URL);
        const html = await response.text();
        const educationalTerms = ['educational', 'resource', 'lesson', 'learning'];
        return educationalTerms.some(term => 
          html.toLowerCase().includes(term.toLowerCase())
        );
      }
    },
    {
      name: 'Dashboard Functionality',
      description: 'Main dashboard components accessible',
      critical: false,
      test: async () => {
        try {
          const response = await fetch(`${this.SITE_URL}/educational-dashboard`);
          return response.ok;
        } catch {
          // Try checking if dashboard content is in main page
          const response = await fetch(this.SITE_URL);
          const html = await response.text();
          return html.toLowerCase().includes('dashboard');
        }
      }
    },
    {
      name: 'CSS Styling Working',
      description: 'Stylesheets loading and site not unstyled',
      critical: false,
      test: async () => {
        const response = await fetch(this.SITE_URL);
        const html = await response.text();
        // Check for CSS links or style tags
        return html.includes('stylesheet') || html.includes('<style') || html.includes('class=');
      }
    },
    {
      name: 'No JavaScript Errors',
      description: 'No obvious JavaScript errors breaking the site',
      critical: true,
      test: async () => {
        const response = await fetch(this.SITE_URL);
        const html = await response.text();
        // Check for common error indicators in HTML
        const errorIndicators = [
          'javascript error',
          'uncaught exception',
          'script error',
          'cannot read property',
          'undefined is not a function'
        ];
        return !errorIndicators.some(error => 
          html.toLowerCase().includes(error.toLowerCase())
        );
      }
    },
    {
      name: 'Performance Acceptable',
      description: 'Site loads within reasonable time',
      critical: false,
      test: async () => {
        const startTime = Date.now();
        const response = await fetch(this.SITE_URL);
        const loadTime = Date.now() - startTime;
        return response.ok && loadTime < 3000; // 3 second limit
      }
    },
    {
      name: 'Mobile Responsive Meta',
      description: 'Mobile viewport meta tag present',
      critical: false,
      test: async () => {
        const response = await fetch(this.SITE_URL);
        const html = await response.text();
        return html.includes('viewport') && html.includes('width=device-width');
      }
    },
    {
      name: 'Educational Platform Route',
      description: 'Educational platform page accessible',
      critical: false,
      test: async () => {
        try {
          const response = await fetch(`${this.SITE_URL}/educational-platform`);
          return response.ok;
        } catch {
          return false;
        }
      }
    }
  ];

  async runFullVerification(): Promise<VerificationResult> {
    console.log('🔍 DEPLOYMENT VERIFICATION AGENT - Kaitiaki Rangatira');
    console.log(`🌐 Testing Live Site: ${this.SITE_URL}`);
    console.log('='.repeat(70));

    const timestamp = new Date().toISOString();
    let commitHash = '';
    
    try {
      const { stdout } = await execAsync('git rev-parse HEAD');
      commitHash = stdout.trim().substring(0, 8);
    } catch {
      commitHash = 'unknown';
    }

    const result: VerificationResult = {
      timestamp,
      commitHash,
      siteUrl: this.SITE_URL,
      overallScore: 0,
      criticalIssues: [],
      warnings: [],
      passedTests: [],
      failedTests: [],
      deploymentHealthy: false,
      needsRollback: false
    };

    console.log(`📝 Running ${this.tests.length} deployment tests...\n`);

    let totalTests = 0;
    let passedTests = 0;
    let criticalFailures = 0;

    for (const test of this.tests) {
      totalTests++;
      console.log(`🧪 Testing: ${test.name}...`);
      
      try {
        const testResult = await test.test();
        
        if (testResult) {
          passedTests++;
          result.passedTests.push(test.name);
          console.log(`   ✅ PASS: ${test.description}`);
        } else {
          result.failedTests.push(test.name);
          
          if (test.critical) {
            criticalFailures++;
            result.criticalIssues.push(`CRITICAL: ${test.name} - ${test.description}`);
            console.log(`   ❌ CRITICAL FAIL: ${test.description}`);
          } else {
            result.warnings.push(`Warning: ${test.name} - ${test.description}`);
            console.log(`   ⚠️  WARNING: ${test.description}`);
          }
        }
      } catch (error) {
        result.failedTests.push(test.name);
        
        if (test.critical) {
          criticalFailures++;
          result.criticalIssues.push(`CRITICAL ERROR: ${test.name} - ${error}`);
          console.log(`   💥 CRITICAL ERROR: ${test.name} - ${error}`);
        } else {
          result.warnings.push(`Error: ${test.name} - ${error}`);
          console.log(`   ⚠️  ERROR: ${test.name} - ${error}`);
        }
      }
    }

    // Calculate score
    result.overallScore = Math.round((passedTests / totalTests) * 100);
    
    // Determine deployment health
    result.deploymentHealthy = criticalFailures === 0 && result.overallScore >= 70;
    result.needsRollback = criticalFailures > 0 || result.overallScore < 50;

    this.displayResults(result);
    
    return result;
  }

  displayResults(result: VerificationResult): void {
    console.log('\n' + '='.repeat(70));
    console.log('📊 DEPLOYMENT VERIFICATION RESULTS');
    console.log('='.repeat(70));
    console.log(`🏷️  Commit: ${result.commitHash}`);
    console.log(`🌐 Site: ${result.siteUrl}`);
    console.log(`📊 Score: ${result.overallScore}/100`);
    console.log(`✅ Passed: ${result.passedTests.length} tests`);
    console.log(`❌ Failed: ${result.failedTests.length} tests`);
    console.log(`🚨 Critical Issues: ${result.criticalIssues.length}`);
    console.log(`⚠️  Warnings: ${result.warnings.length}`);
    
    if (result.criticalIssues.length > 0) {
      console.log('\n🚨 CRITICAL ISSUES:');
      result.criticalIssues.forEach(issue => console.log(`  ${issue}`));
    }
    
    if (result.warnings.length > 0) {
      console.log('\n⚠️ WARNINGS:');
      result.warnings.forEach(warning => console.log(`  ${warning}`));
    }
    
    console.log('\n🎯 DEPLOYMENT ASSESSMENT:');
    
    if (result.deploymentHealthy) {
      console.log('✅ DEPLOYMENT HEALTHY - Site is functioning properly');
      console.log('👤 No human intervention required');
    } else if (result.needsRollback) {
      console.log('🚨 DEPLOYMENT FAILED - Critical issues detected');
      console.log('⏪ ROLLBACK RECOMMENDED');
      console.log('👤 IMMEDIATE human intervention required');
    } else {
      console.log('⚠️ DEPLOYMENT FUNCTIONAL - Minor issues detected');
      console.log('📋 Human review recommended but not urgent');
    }
    
    console.log('\n✨ Kaitiaki Rangatira - Deployment verification complete');
  }

  async performRollback(): Promise<void> {
    console.log('\n⏪ INITIATING ROLLBACK PROCEDURE...');
    
    try {
      // Get previous commit
      const { stdout } = await execAsync('git log --oneline -2');
      const commits = stdout.trim().split('\n');
      
      if (commits.length < 2) {
        console.log('❌ Cannot rollback - insufficient commit history');
        return;
      }
      
      const previousCommit = commits[1].split(' ')[0];
      console.log(`📋 Rolling back to: ${previousCommit}`);
      
      // Create rollback commit
      await execAsync(`git revert --no-edit HEAD`);
      console.log('✅ Created revert commit');
      
      // Push rollback
      await execAsync('git push');
      console.log('✅ Pushed rollback to production');
      
      console.log('⏪ ROLLBACK COMPLETE');
      console.log('⏳ Waiting for deployment...');
      
      // Wait for rollback deployment
      await new Promise(resolve => setTimeout(resolve, 30000));
      
      console.log('🔍 Verifying rollback deployment...');
      const verifyResult = await this.runFullVerification();
      
      if (verifyResult.deploymentHealthy) {
        console.log('✅ ROLLBACK SUCCESSFUL - Site restored');
      } else {
        console.log('❌ ROLLBACK ISSUES - Manual intervention required');
      }
      
    } catch (error) {
      console.error('💥 ROLLBACK FAILED:', error);
      console.log('🚨 MANUAL INTERVENTION REQUIRED IMMEDIATELY');
    }
  }
}

async function main() {
  const agent = new DeploymentVerificationAgent();
  const result = await agent.runFullVerification();
  
  // Auto-rollback if critical failure
  if (result.needsRollback) {
    console.log('\n🚨 CRITICAL FAILURE DETECTED - INITIATING AUTO-ROLLBACK');
    await agent.performRollback();
  }
}

// Start if this is the main module
main().catch(console.error);

export { DeploymentVerificationAgent };