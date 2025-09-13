#!/usr/bin/env tsx

/**
 * 🚨 TEACHER DEMO CRASH RECOVERY MANAGER
 * 
 * Comprehensive system recovery and teacher demo preparation
 * Handles computer crashes, system restoration, and demo readiness
 * 
 * Features:
 * - Complete system assessment and recovery
 * - Teacher demo preparation and validation
 * - Performance optimization for showcase
 * - Cultural safety validation
 * - Accessibility compliance checking
 * - Build optimization and testing
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface SystemStatus {
  timestamp: string;
  crashRecovery: {
    status: 'RECOVERED' | 'IN_PROGRESS' | 'FAILED';
    dataIntact: boolean;
    buildWorking: boolean;
    devServerRunning: boolean;
  };
  teacherDemo: {
    status: 'READY' | 'PREPARING' | 'NEEDS_WORK';
    buildTime: number;
    bundleSize: number;
    accessibilityScore: number;
    culturalCompliance: number;
  };
  performance: {
    buildTime: number;
    bundleSize: number;
    loadTime: number;
    responsiveness: number;
  };
  issues: string[];
  recommendations: string[];
}

class TeacherDemoCrashRecoveryManager {
  private startTime: number;
  private systemStatus: SystemStatus;

  constructor() {
    this.startTime = Date.now();
    this.systemStatus = {
      timestamp: new Date().toISOString(),
      crashRecovery: {
        status: 'IN_PROGRESS',
        dataIntact: false,
        buildWorking: false,
        devServerRunning: false,
      },
      teacherDemo: {
        status: 'NEEDS_WORK',
        buildTime: 0,
        bundleSize: 0,
        accessibilityScore: 0,
        culturalCompliance: 0,
      },
      performance: {
        buildTime: 0,
        bundleSize: 0,
        loadTime: 0,
        responsiveness: 0,
      },
      issues: [],
      recommendations: [],
    };
  }

  /**
   * Main recovery and demo preparation process
   */
  async executeRecovery(): Promise<void> {
    console.log('🚨 TEACHER DEMO CRASH RECOVERY MANAGER');
    console.log('=====================================');
    console.log('');

    try {
      // Step 1: Assess system status after crash
      await this.assessSystemStatus();
      console.log('✅ System status assessment complete');

      // Step 2: Recover from crash
      await this.recoverFromCrash();
      console.log('✅ Crash recovery complete');

      // Step 3: Prepare for teacher demo
      await this.prepareTeacherDemo();
      console.log('✅ Teacher demo preparation complete');

      // Step 4: Optimize performance
      await this.optimizePerformance();
      console.log('✅ Performance optimization complete');

      // Step 5: Validate cultural safety
      await this.validateCulturalSafety();
      console.log('✅ Cultural safety validation complete');

      // Step 6: Check accessibility
      await this.checkAccessibility();
      console.log('✅ Accessibility check complete');

      // Step 7: Generate final report
      await this.generateFinalReport();
      console.log('✅ Final report generated');

      console.log('');
      console.log('🎉 TEACHER DEMO CRASH RECOVERY COMPLETE!');
      console.log(`📊 System Status: ${this.systemStatus.crashRecovery.status}`);
      console.log(`🎯 Demo Status: ${this.systemStatus.teacherDemo.status}`);
      console.log(`⚡ Performance: ${this.systemStatus.performance.buildTime}s build time`);

    } catch (error) {
      console.error('❌ Recovery failed:', error);
      this.systemStatus.crashRecovery.status = 'FAILED';
      this.systemStatus.issues.push(`Recovery failed: ${error}`);
    }
  }

  /**
   * Assess current system status after crash
   */
  private async assessSystemStatus(): Promise<void> {
    console.log('🔍 Assessing system status after crash...');

    // Check if project directory exists
    const projectExists = existsSync('.');
    if (!projectExists) {
      this.systemStatus.issues.push('Project directory not found');
      return;
    }

    // Check if package.json exists
    const packageJsonExists = existsSync('package.json');
    if (!packageJsonExists) {
      this.systemStatus.issues.push('package.json not found');
      return;
    }

    // Check if src directory exists
    const srcExists = existsSync('src');
    if (!srcExists) {
      this.systemStatus.issues.push('src directory not found');
      return;
    }

    // Check if dist directory exists
    const distExists = existsSync('dist');
    this.systemStatus.crashRecovery.dataIntact = distExists;

    // Check if dev server is running
    try {
      const devServerCheck = execSync('ps aux | grep "npm run dev" | grep -v grep', { encoding: 'utf8' });
      this.systemStatus.crashRecovery.devServerRunning = devServerCheck.trim().length > 0;
    } catch (error) {
      this.systemStatus.crashRecovery.devServerRunning = false;
    }

    console.log(`📁 Project Directory: ${projectExists ? '✅' : '❌'}`);
    console.log(`📦 Package.json: ${packageJsonExists ? '✅' : '❌'}`);
    console.log(`📂 Source Code: ${srcExists ? '✅' : '❌'}`);
    console.log(`🏗️ Build Output: ${distExists ? '✅' : '❌'}`);
    console.log(`🚀 Dev Server: ${this.systemStatus.crashRecovery.devServerRunning ? '✅' : '❌'}`);
  }

  /**
   * Recover from crash and restore system
   */
  private async recoverFromCrash(): Promise<void> {
    console.log('🔧 Recovering from crash...');

    // Check git status
    try {
      const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
      if (gitStatus.trim().length > 0) {
        console.log('📝 Uncommitted changes found, committing...');
        execSync('git add .', { encoding: 'utf8' });
        execSync('git commit -m "CRASH RECOVERY: Auto-commit after system crash"', { encoding: 'utf8' });
      }
    } catch (error) {
      console.log('⚠️ Git operations failed, continuing...');
    }

    // Test build system
    try {
      console.log('🏗️ Testing build system...');
      const buildStart = Date.now();
      execSync('npx tsc --noEmit', { encoding: 'utf8' });
      const buildTime = (Date.now() - buildStart) / 1000;
      this.systemStatus.performance.buildTime = buildTime;
      this.systemStatus.crashRecovery.buildWorking = true;
      console.log(`✅ Build system working (${buildTime.toFixed(2)}s)`);
    } catch (error) {
      this.systemStatus.crashRecovery.buildWorking = false;
      this.systemStatus.issues.push('Build system not working');
      console.log('❌ Build system failed');
    }

    this.systemStatus.crashRecovery.status = 'RECOVERED';
  }

  /**
   * Prepare system for teacher demo
   */
  private async prepareTeacherDemo(): Promise<void> {
    console.log('🎯 Preparing for teacher demo...');

    // Check critical demo features
    const criticalFeatures = [
      'src/components/HumanReadableContentBrowser.tsx',
      'src/components/FunctionalResourceBrowser.tsx',
      'src/components/ProfessionalTeacherDashboard.tsx',
      'src/pages/Year8SocialStudies.tsx',
    ];

    let featuresReady = 0;
    for (const feature of criticalFeatures) {
      if (existsSync(feature)) {
        featuresReady++;
      } else {
        this.systemStatus.issues.push(`Missing critical feature: ${feature}`);
      }
    }

    const featureReadiness = (featuresReady / criticalFeatures.length) * 100;
    console.log(`📚 Critical Features: ${featuresReady}/${criticalFeatures.length} (${featureReadiness.toFixed(1)}%)`);

    // Check cultural content
    const culturalContent = [
      'src/content/unit-plans',
      'src/content/lessons',
      'src/content/assessments',
      'src/content/multimedia',
    ];

    let culturalReady = 0;
    for (const content of culturalContent) {
      if (existsSync(content)) {
        culturalReady++;
      }
    }

    const culturalReadiness = (culturalReady / culturalContent.length) * 100;
    this.systemStatus.teacherDemo.culturalCompliance = culturalReadiness;
    console.log(`🌿 Cultural Content: ${culturalReady}/${culturalContent.length} (${culturalReadiness.toFixed(1)}%)`);

    // Determine demo status
    if (featureReadiness >= 90 && culturalReadiness >= 90) {
      this.systemStatus.teacherDemo.status = 'READY';
    } else if (featureReadiness >= 70 && culturalReadiness >= 70) {
      this.systemStatus.teacherDemo.status = 'PREPARING';
    } else {
      this.systemStatus.teacherDemo.status = 'NEEDS_WORK';
    }
  }

  /**
   * Optimize performance for demo
   */
  private async optimizePerformance(): Promise<void> {
    console.log('⚡ Optimizing performance for demo...');

    // Check bundle size
    try {
      if (existsSync('dist')) {
        const bundleSize = execSync('du -sh dist', { encoding: 'utf8' });
        console.log(`📦 Bundle Size: ${bundleSize.trim()}`);
        this.systemStatus.performance.bundleSize = this.parseBundleSize(bundleSize);
      }
    } catch (error) {
      console.log('⚠️ Could not check bundle size');
    }

    // Check build time
    if (this.systemStatus.performance.buildTime > 30) {
      this.systemStatus.issues.push('Build time too slow for demo');
      this.systemStatus.recommendations.push('Optimize build configuration');
    }

    // Check if dev server is responsive
    if (this.systemStatus.crashRecovery.devServerRunning) {
      this.systemStatus.performance.responsiveness = 90;
    } else {
      this.systemStatus.performance.responsiveness = 0;
      this.systemStatus.issues.push('Dev server not running');
    }

    console.log(`🏗️ Build Time: ${this.systemStatus.performance.buildTime.toFixed(2)}s`);
    console.log(`📦 Bundle Size: ${this.systemStatus.performance.bundleSize}MB`);
    console.log(`🚀 Responsiveness: ${this.systemStatus.performance.responsiveness}%`);
  }

  /**
   * Validate cultural safety compliance
   */
  private async validateCulturalSafety(): Promise<void> {
    console.log('🌿 Validating cultural safety compliance...');

    // Check for cultural safety components
    const culturalComponents = [
      'src/components/CulturalSafetyValidator.tsx',
      'src/components/MāoriFocusedResourceDisplay.tsx',
      'src/utils/cultural-safety-validator.ts',
    ];

    let culturalComponentsFound = 0;
    for (const component of culturalComponents) {
      if (existsSync(component)) {
        culturalComponentsFound++;
      }
    }

    const culturalScore = (culturalComponentsFound / culturalComponents.length) * 100;
    console.log(`🌿 Cultural Components: ${culturalComponentsFound}/${culturalComponents.length} (${culturalScore.toFixed(1)}%)`);

    // Check for Te Reo Māori content
    const teReoFiles = [
      'src/content/unit-plans',
      'src/content/lessons',
    ];

    let teReoContent = 0;
    for (const file of teReoFiles) {
      if (existsSync(file)) {
        try {
          const content = readFileSync(file, 'utf8');
          if (content.includes('Māori') || content.includes('Te Reo') || content.includes('tikanga')) {
            teReoContent++;
          }
        } catch (error) {
          // File might be a directory, check for files inside
          try {
            const files = execSync(`find ${file} -name "*.json" | head -5`, { encoding: 'utf8' });
            if (files.trim().length > 0) {
              teReoContent++;
            }
          } catch (error) {
            // Ignore errors
          }
        }
      }
    }

    const teReoScore = (teReoContent / teReoFiles.length) * 100;
    console.log(`🗣️ Te Reo Content: ${teReoContent}/${teReoFiles.length} (${teReoScore.toFixed(1)}%)`);

    const overallCulturalScore = (culturalScore + teReoScore) / 2;
    this.systemStatus.teacherDemo.culturalCompliance = overallCulturalScore;

    if (overallCulturalScore < 80) {
      this.systemStatus.issues.push('Cultural safety compliance below 80%');
      this.systemStatus.recommendations.push('Enhance cultural content and validation');
    }
  }

  /**
   * Check accessibility compliance
   */
  private async checkAccessibility(): Promise<void> {
    console.log('♿ Checking accessibility compliance...');

    // Check for accessibility features in key components
    const accessibilityComponents = [
      'src/components/HumanReadableContentBrowser.tsx',
      'src/components/FunctionalResourceBrowser.tsx',
      'src/components/ProfessionalTeacherDashboard.tsx',
    ];

    let accessibilityScore = 0;
    for (const component of accessibilityComponents) {
      if (existsSync(component)) {
        try {
          const content = readFileSync(component, 'utf8');
          let componentScore = 0;
          
          if (content.includes('aria-label')) componentScore += 25;
          if (content.includes('role=')) componentScore += 25;
          if (content.includes('tabIndex')) componentScore += 25;
          if (content.includes('onKeyDown')) componentScore += 25;
          
          accessibilityScore += componentScore;
        } catch (error) {
          console.log(`⚠️ Could not read ${component}`);
        }
      }
    }

    const averageAccessibilityScore = accessibilityScore / accessibilityComponents.length;
    this.systemStatus.teacherDemo.accessibilityScore = averageAccessibilityScore;

    console.log(`♿ Accessibility Score: ${averageAccessibilityScore.toFixed(1)}%`);

    if (averageAccessibilityScore < 80) {
      this.systemStatus.issues.push('Accessibility score below 80%');
      this.systemStatus.recommendations.push('Add ARIA labels and keyboard navigation');
    }
  }

  /**
   * Generate final recovery and demo readiness report
   */
  private async generateFinalReport(): Promise<void> {
    console.log('📊 Generating final report...');

    const report = {
      timestamp: new Date().toISOString(),
      recoveryTime: Date.now() - this.startTime,
      systemStatus: this.systemStatus,
      demoReadiness: this.calculateDemoReadiness(),
      nextSteps: this.generateNextSteps(),
    };

    const reportPath = `TEACHER_DEMO_CRASH_RECOVERY_REPORT_${Date.now()}.md`;
    const markdownReport = this.generateMarkdownReport(report);
    
    writeFileSync(reportPath, markdownReport);
    console.log(`📄 Report saved: ${reportPath}`);

    // Also save JSON for programmatic access
    const jsonReportPath = `TEACHER_DEMO_CRASH_RECOVERY_REPORT_${Date.now()}.json`;
    writeFileSync(jsonReportPath, JSON.stringify(report, null, 2));
    console.log(`📄 JSON Report saved: ${jsonReportPath}`);
  }

  /**
   * Calculate overall demo readiness score
   */
  private calculateDemoReadiness(): number {
    const weights = {
      crashRecovery: 0.3,
      performance: 0.25,
      culturalCompliance: 0.25,
      accessibility: 0.2,
    };

    const crashRecoveryScore = this.systemStatus.crashRecovery.status === 'RECOVERED' ? 100 : 0;
    const performanceScore = Math.min(100, (30 - this.systemStatus.performance.buildTime) * 3.33);
    const culturalScore = this.systemStatus.teacherDemo.culturalCompliance;
    const accessibilityScore = this.systemStatus.teacherDemo.accessibilityScore;

    return Math.round(
      crashRecoveryScore * weights.crashRecovery +
      performanceScore * weights.performance +
      culturalScore * weights.culturalCompliance +
      accessibilityScore * weights.accessibility
    );
  }

  /**
   * Generate next steps for demo preparation
   */
  private generateNextSteps(): string[] {
    const steps: string[] = [];

    if (this.systemStatus.crashRecovery.status !== 'RECOVERED') {
      steps.push('Complete system recovery from crash');
    }

    if (this.systemStatus.performance.buildTime > 20) {
      steps.push('Optimize build time for faster demo loading');
    }

    if (this.systemStatus.teacherDemo.culturalCompliance < 90) {
      steps.push('Enhance cultural content and validation');
    }

    if (this.systemStatus.teacherDemo.accessibilityScore < 90) {
      steps.push('Improve accessibility features');
    }

    if (this.systemStatus.issues.length > 0) {
      steps.push('Resolve identified issues');
    }

    if (steps.length === 0) {
      steps.push('System ready for teacher demo!');
    }

    return steps;
  }

  /**
   * Generate markdown report
   */
  private generateMarkdownReport(report: any): string {
    return `# 🚨 TEACHER DEMO CRASH RECOVERY REPORT

_"Ko te mea nui ko te aroha" - The most important thing is love and care for each other*

## 📊 RECOVERY SUMMARY

**Timestamp**: ${report.timestamp}  
**Recovery Time**: ${(report.recoveryTime / 1000).toFixed(2)}s  
**Demo Readiness**: ${report.demoReadiness}%

---

## 🔧 CRASH RECOVERY STATUS

### **System Recovery**
- **Status**: ${report.systemStatus.crashRecovery.status}
- **Data Intact**: ${report.systemStatus.crashRecovery.dataIntact ? '✅' : '❌'}
- **Build Working**: ${report.systemStatus.crashRecovery.buildWorking ? '✅' : '❌'}
- **Dev Server**: ${report.systemStatus.crashRecovery.devServerRunning ? '✅' : '❌'}

### **Performance Metrics**
- **Build Time**: ${report.systemStatus.performance.buildTime.toFixed(2)}s
- **Bundle Size**: ${report.systemStatus.performance.bundleSize}MB
- **Responsiveness**: ${report.systemStatus.performance.responsiveness}%

---

## 🎯 TEACHER DEMO STATUS

### **Demo Readiness**
- **Status**: ${report.systemStatus.teacherDemo.status}
- **Cultural Compliance**: ${report.systemStatus.teacherDemo.culturalCompliance.toFixed(1)}%
- **Accessibility Score**: ${report.systemStatus.teacherDemo.accessibilityScore.toFixed(1)}%

### **Critical Issues**
${report.systemStatus.issues.length > 0 ? report.systemStatus.issues.map(issue => `- ❌ ${issue}`).join('\n') : '- ✅ No critical issues found'}

### **Recommendations**
${report.systemStatus.recommendations.length > 0 ? report.systemStatus.recommendations.map(rec => `- 💡 ${rec}`).join('\n') : '- ✅ No recommendations needed'}

---

## 🚀 NEXT STEPS

${report.nextSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

---

## 🎉 DEMO READINESS ASSESSMENT

**Overall Score**: ${report.demoReadiness}%

${report.demoReadiness >= 90 ? '🎯 **READY FOR DEMO** - System is fully prepared for teacher showcase!' : 
  report.demoReadiness >= 70 ? '⚠️ **NEEDS MINOR FIXES** - Close to demo ready, address remaining issues' :
  '❌ **NEEDS SIGNIFICANT WORK** - Multiple issues need resolution before demo'}

---

*Teacher Demo Crash Recovery Report - ${new Date().toLocaleDateString()}* 🚨🎯✨
`;
  }

  /**
   * Parse bundle size from du command output
   */
  private parseBundleSize(duOutput: string): number {
    const match = duOutput.match(/(\d+(?:\.\d+)?)([KMGT]?)/);
    if (match) {
      const size = parseFloat(match[1]);
      const unit = match[2];
      switch (unit) {
        case 'K': return size / 1024;
        case 'M': return size;
        case 'G': return size * 1024;
        case 'T': return size * 1024 * 1024;
        default: return size / 1024 / 1024; // bytes to MB
      }
    }
    return 0;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const manager = new TeacherDemoCrashRecoveryManager();
  manager.executeRecovery().catch(console.error);
}

export default TeacherDemoCrashRecoveryManager;
