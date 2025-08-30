#!/usr/bin/env tsx
/**
 * 🛡️ PRE-DEPLOYMENT HEALTH CHECK - Kaitiaki Rangatira Production Pipeline
 * Automated error detection system to prevent white screen and broken functionality
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface HealthCheckResult {
  name: string;
  success: boolean;
  message: string;
  duration: number;
}

class ProductionHealthChecker {
  private results: HealthCheckResult[] = [];

  async runCheck(name: string, checkFn: () => Promise<void>): Promise<void> {
    const startTime = Date.now();
    console.log(`🔍 Running: ${name}...`);
    
    try {
      await checkFn();
      const duration = Date.now() - startTime;
      this.results.push({
        name,
        success: true,
        message: 'Passed',
        duration
      });
      console.log(`✅ ${name} - ${duration}ms`);
    } catch (error) {
      const duration = Date.now() - startTime;
      const message = error instanceof Error ? error.message : String(error);
      this.results.push({
        name,
        success: false,
        message,
        duration
      });
      console.log(`❌ ${name} - ${message} - ${duration}ms`);
    }
  }

  async checkBuild(): Promise<void> {
    const { stderr } = await execAsync('npm run build');
    if (stderr && stderr.includes('error')) {
      throw new Error(`Build errors: ${stderr}`);
    }
  }

  async checkTypeScript(): Promise<void> {
    await execAsync('npm run typecheck');
  }

  async checkLinting(): Promise<void> {
    try {
      await execAsync('npm run lint');
    } catch (error) {
      // Allow warnings but not errors
      if (error instanceof Error && error.message.includes('error')) {
        throw error;
      }
    }
  }

  async checkLiveSite(): Promise<void> {
    const response = await fetch('https://teaomarama.netlify.app/');
    if (!response.ok) {
      throw new Error(`Site returned ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Check for white screen indicators
    if (html.length < 1000) {
      throw new Error('Potential white screen - HTML too short');
    }
    
    // Check for critical elements
    if (!html.includes('Te Kura o TeAoMarama')) {
      throw new Error('Missing critical site title');
    }
    
    if (html.includes('error') || html.includes('Error')) {
      console.warn('⚠️ Site contains error text - manual review recommended');
    }
  }

  async checkEssentialRoutes(): Promise<void> {
    const routes = [
      '/',
      '/educational-dashboard', 
      '/educational-platform'
    ];
    
    for (const route of routes) {
      const response = await fetch(`https://teaomarama.netlify.app${route}`);
      if (!response.ok) {
        throw new Error(`Route ${route} returned ${response.status}`);
      }
    }
  }

  async checkResourcesLoading(): Promise<void> {
    const response = await fetch('https://teaomarama.netlify.app/educational-platform');
    const html = await response.text();
    
    // Check if resources are loading properly
    if (!html.includes('resource') && !html.includes('Resource')) {
      throw new Error('Resources may not be loading properly');
    }
  }

  async runAllChecks(): Promise<boolean> {
    console.log('🚀 KAITIAKI RANGATIRA - PRE-DEPLOYMENT HEALTH CHECK');
    console.log('='.repeat(60));
    
    // Core build checks
    await this.runCheck('Build Verification', () => this.checkBuild());
    await this.runCheck('TypeScript Check', () => this.checkTypeScript());
    await this.runCheck('Linting Check', () => this.checkLinting());
    
    // Live site checks
    await this.runCheck('Live Site Response', () => this.checkLiveSite());
    await this.runCheck('Essential Routes', () => this.checkEssentialRoutes());
    await this.runCheck('Resources Loading', () => this.checkResourcesLoading());
    
    // Results summary
    console.log('\n📊 HEALTH CHECK RESULTS');
    console.log('='.repeat(40));
    
    let allPassed = true;
    let totalDuration = 0;
    
    for (const result of this.results) {
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${result.name}: ${result.message} (${result.duration}ms)`);
      
      if (!result.success) {
        allPassed = false;
      }
      totalDuration += result.duration;
    }
    
    console.log('='.repeat(40));
    console.log(`Total duration: ${totalDuration}ms`);
    
    if (allPassed) {
      console.log('🎉 ALL CHECKS PASSED - DEPLOYMENT SAFE');
      return true;
    } else {
      console.log('🚨 SOME CHECKS FAILED - REVIEW REQUIRED');
      return false;
    }
  }
}

// Agent heartbeat integration
const AGENT_NAME = process.env.AGENT_NAME || 'health-checker-agent';
const CHAIN_ID = process.env.CHAIN_ID || 'production-safety';

async function main() {
  console.log(`🤖 Agent: ${AGENT_NAME}`);
  console.log(`⛓️ Chain: ${CHAIN_ID}`);
  console.log('');
  
  const checker = new ProductionHealthChecker();
  const success = await checker.runAllChecks();
  
  if (!success) {
    process.exit(1);
  }
  
  console.log('✨ Kaitiaki Rangatira - Production pipeline protected');
}

if (require.main === module) {
  main().catch(console.error);
}

export { ProductionHealthChecker };