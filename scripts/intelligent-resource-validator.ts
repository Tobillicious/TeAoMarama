#!/usr/bin/env npx tsx

/**
 * 🧠 INTELLIGENT RESOURCE VALIDATOR
 *
 * This script validates and enhances our teaching resources to ensure
 * they meet the highest quality standards and are truly usable by teachers.
 *
 * No more circular progress - we bank and build on our valuable mahi!
 */

import fs from 'fs';
import path from 'path';

interface ResourceQualityMetrics {
  id: string;
  title: string;
  path: string;
  qualityScore: number;
  culturalIntegration: number;
  nzcAlignment: number;
  realWorldExamples: number;
  crossCurricular: number;
  depthOfLearning: number;
  practicalUsefulness: number;
  completeness: number;
  accessibility: number;
  teacherReadiness: number;
  studentEngagement: number;
  assessmentQuality: number;
  resourceLinks: number;
  issues: string[];
  recommendations: string[];
  status: 'excellent' | 'good' | 'needs-work' | 'incomplete';
}

interface ValidationReport {
  timestamp: string;
  totalResources: number;
  averageQuality: number;
  excellentResources: number;
  goodResources: number;
  needsWorkResources: number;
  incompleteResources: number;
  topIssues: string[];
  topRecommendations: string[];
  resources: ResourceQualityMetrics[];
}

class IntelligentResourceValidator {
  private resources: ResourceQualityMetrics[] = [];
  private report: ValidationReport;

  constructor() {
    this.report = {
      timestamp: new Date().toISOString(),
      totalResources: 0,
      averageQuality: 0,
      excellentResources: 0,
      goodResources: 0,
      needsWorkResources: 0,
      incompleteResources: 0,
      topIssues: [],
      topRecommendations: [],
      resources: [],
    };
  }

  async validateAllResources(): Promise<ValidationReport> {
    console.log('🧠 Starting Intelligent Resource Validation...\n');

    // Find all resource files
    const resourceFiles = await this.findResourceFiles();
    console.log(`📚 Found ${resourceFiles.length} resource files to validate\n`);

    // Validate each resource
    for (const file of resourceFiles) {
      await this.validateResource(file);
    }

    // Generate comprehensive report
    this.generateReport();

    // Save detailed report
    await this.saveReport();

    // Create enhancement recommendations
    await this.createEnhancementPlan();

    return this.report;
  }

  private async findResourceFiles(): Promise<string[]> {
    const resourceDirs = ['src/content/lessons', 'src/data', 'src/components'];

    const files: string[] = [];

    for (const dir of resourceDirs) {
      if (fs.existsSync(dir)) {
        const dirFiles = this.getFilesRecursively(dir);
        files.push(
          ...dirFiles.filter(
            (file) =>
              file.endsWith('.md') ||
              file.endsWith('.tsx') ||
              file.endsWith('.ts') ||
              file.includes('curriculum') ||
              file.includes('resource'),
          ),
        );
      }
    }

    return files;
  }

  private getFilesRecursively(dir: string): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...this.getFilesRecursively(fullPath));
      } else {
        files.push(fullPath);
      }
    }

    return files;
  }

  private async validateResource(filePath: string): Promise<void> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const resource = this.analyzeResource(filePath, content);
      this.resources.push(resource);

      console.log(`✅ Validated: ${resource.title} (${resource.qualityScore}/100)`);
    } catch (error) {
      console.error(`❌ Error validating ${filePath}:`, error);
    }
  }

  private analyzeResource(filePath: string, content: string): ResourceQualityMetrics {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Basic content analysis
    const hasContent = content.length > 100;
    const hasStructure = content.includes('#') || content.includes('##');
    const hasActivities = content.includes('Activity') || content.includes('Lesson');
    const hasAssessment = content.includes('Assessment') || content.includes('Rubric');
    const hasResources = content.includes('Resource') || content.includes('Material');
    const hasLinks = content.includes('http') || content.includes('www.');
    const hasCulturalElements =
      content.includes('Māori') || content.includes('Te Reo') || content.includes('tikanga');
    const hasNZCAlignment =
      content.includes('NZC') ||
      content.includes('Curriculum') ||
      content.includes('Achievement Objective');
    const hasRealExamples =
      content.includes('New Zealand') ||
      content.includes('Aotearoa') ||
      content.includes('DOC') ||
      content.includes('Statistics NZ');

    // Quality scoring
    let qualityScore = 0;
    let culturalIntegration = 0;
    let nzcAlignment = 0;
    let realWorldExamples = 0;
    let crossCurricular = 0;
    let depthOfLearning = 0;
    let practicalUsefulness = 0;
    let completeness = 0;
    let accessibility = 0;
    let teacherReadiness = 0;
    let studentEngagement = 0;
    let assessmentQuality = 0;
    let resourceLinks = 0;

    // Content quality (20 points)
    if (hasContent) qualityScore += 10;
    if (hasStructure) qualityScore += 5;
    if (content.length > 1000) qualityScore += 5;

    // Cultural integration (15 points)
    if (hasCulturalElements) {
      culturalIntegration = 15;
      qualityScore += 15;
    } else {
      issues.push('Missing Māori cultural elements');
      recommendations.push('Add Māori perspectives and cultural context');
    }

    // NZC alignment (15 points)
    if (hasNZCAlignment) {
      nzcAlignment = 15;
      qualityScore += 15;
    } else {
      issues.push('Missing NZC alignment');
      recommendations.push('Add New Zealand Curriculum statements and objectives');
    }

    // Real-world examples (15 points)
    if (hasRealExamples) {
      realWorldExamples = 15;
      qualityScore += 15;
    } else {
      issues.push('Missing real-world New Zealand examples');
      recommendations.push('Add specific New Zealand case studies and examples');
    }

    // Activities and engagement (10 points)
    if (hasActivities) {
      studentEngagement = 10;
      qualityScore += 10;
    } else {
      issues.push('Missing learning activities');
      recommendations.push('Add specific learning activities and student engagement strategies');
    }

    // Assessment (10 points)
    if (hasAssessment) {
      assessmentQuality = 10;
      qualityScore += 10;
    } else {
      issues.push('Missing assessment criteria');
      recommendations.push('Add assessment rubrics and evaluation criteria');
    }

    // Resources and materials (10 points)
    if (hasResources) {
      resourceLinks = 10;
      qualityScore += 10;
    } else {
      issues.push('Missing resource lists');
      recommendations.push('Add materials lists and external resources');
    }

    // External links (5 points)
    if (hasLinks) {
      qualityScore += 5;
    } else {
      issues.push('Missing external links');
      recommendations.push('Add links to relevant websites and databases');
    }

    // Calculate other metrics
    completeness = Math.min(100, (qualityScore / 100) * 100);
    accessibility = hasStructure ? 80 : 40;
    teacherReadiness = hasActivities && hasAssessment ? 90 : 60;
    depthOfLearning = content.length > 2000 ? 85 : 60;
    crossCurricular =
      content.includes('cross-curricular') || content.includes('interdisciplinary') ? 80 : 50;
    practicalUsefulness = hasActivities && hasResources ? 90 : 60;

    // Determine status
    let status: 'excellent' | 'good' | 'needs-work' | 'incomplete';
    if (qualityScore >= 85) status = 'excellent';
    else if (qualityScore >= 70) status = 'good';
    else if (qualityScore >= 50) status = 'needs-work';
    else status = 'incomplete';

    return {
      id: path.basename(filePath, path.extname(filePath)),
      title: this.extractTitle(content, filePath),
      path: filePath,
      qualityScore,
      culturalIntegration,
      nzcAlignment,
      realWorldExamples,
      crossCurricular,
      depthOfLearning,
      practicalUsefulness,
      completeness,
      accessibility,
      teacherReadiness,
      studentEngagement,
      assessmentQuality,
      resourceLinks,
      issues,
      recommendations,
      status,
    };
  }

  private extractTitle(content: string, filePath: string): string {
    // Try to extract title from content
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      return titleMatch[1];
    }

    // Fallback to filename
    return path
      .basename(filePath, path.extname(filePath))
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private generateReport(): void {
    this.report.totalResources = this.resources.length;
    this.report.averageQuality =
      this.resources.reduce((sum, r) => sum + r.qualityScore, 0) / this.resources.length;
    this.report.excellentResources = this.resources.filter((r) => r.status === 'excellent').length;
    this.report.goodResources = this.resources.filter((r) => r.status === 'good').length;
    this.report.needsWorkResources = this.resources.filter((r) => r.status === 'needs-work').length;
    this.report.incompleteResources = this.resources.filter(
      (r) => r.status === 'incomplete',
    ).length;
    this.report.resources = this.resources;

    // Analyze top issues and recommendations
    const allIssues = this.resources.flatMap((r) => r.issues);
    const allRecommendations = this.resources.flatMap((r) => r.recommendations);

    const issueCounts = allIssues.reduce((acc, issue) => {
      acc[issue] = (acc[issue] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recommendationCounts = allRecommendations.reduce((acc, rec) => {
      acc[rec] = (acc[rec] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    this.report.topIssues = Object.entries(issueCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([issue]) => issue);

    this.report.topRecommendations = Object.entries(recommendationCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([rec]) => rec);
  }

  private async saveReport(): Promise<void> {
    const reportPath = 'INTELLIGENT_RESOURCE_VALIDATION_REPORT.md';

    const reportContent = `# 🧠 Intelligent Resource Validation Report

**Generated**: ${new Date().toLocaleString()}

## 📊 Executive Summary

- **Total Resources**: ${this.report.totalResources}
- **Average Quality Score**: ${this.report.averageQuality.toFixed(1)}/100
- **Excellent Resources**: ${this.report.excellentResources} (${(
      (this.report.excellentResources / this.report.totalResources) *
      100
    ).toFixed(1)}%)
- **Good Resources**: ${this.report.goodResources} (${(
      (this.report.goodResources / this.report.totalResources) *
      100
    ).toFixed(1)}%)
- **Needs Work**: ${this.report.needsWorkResources} (${(
      (this.report.needsWorkResources / this.report.totalResources) *
      100
    ).toFixed(1)}%)
- **Incomplete**: ${this.report.incompleteResources} (${(
      (this.report.incompleteResources / this.report.totalResources) *
      100
    ).toFixed(1)}%)

## 🎯 Top Issues to Address

${this.report.topIssues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

## 💡 Top Recommendations

${this.report.topRecommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

## 📚 Resource Details

${this.resources
  .map(
    (resource) => `
### ${resource.title}
- **Quality Score**: ${resource.qualityScore}/100
- **Status**: ${resource.status.toUpperCase()}
- **Cultural Integration**: ${resource.culturalIntegration}/15
- **NZC Alignment**: ${resource.nzcAlignment}/15
- **Real-World Examples**: ${resource.realWorldExamples}/15
- **Teacher Readiness**: ${resource.teacherReadiness}/100
- **Issues**: ${resource.issues.length > 0 ? resource.issues.join(', ') : 'None'}
- **Recommendations**: ${
      resource.recommendations.length > 0 ? resource.recommendations.join(', ') : 'None'
    }
`,
  )
  .join('\n')}

## 🚀 Next Steps

1. **Address Top Issues**: Focus on the most common issues first
2. **Enhance Quality**: Use recommendations to improve resource quality
3. **Validate Changes**: Re-run validation after improvements
4. **Continuous Improvement**: Regular validation cycles

---

*Generated by Intelligent Resource Validator - ${new Date().toISOString()}*
`;

    fs.writeFileSync(reportPath, reportContent);
    console.log(`📄 Detailed report saved to: ${reportPath}`);
  }

  private async createEnhancementPlan(): Promise<void> {
    const planPath = 'RESOURCE_ENHANCEMENT_PLAN.md';

    const planContent = `# 🚀 Resource Enhancement Plan

**Generated**: ${new Date().toLocaleString()}

## 🎯 Priority Actions

### 1. Immediate Fixes (High Impact, Low Effort)
${this.report.topIssues
  .slice(0, 3)
  .map((issue) => `- Fix: ${issue}`)
  .join('\n')}

### 2. Quality Improvements (High Impact, Medium Effort)
${this.report.topRecommendations
  .slice(0, 3)
  .map((rec) => `- Implement: ${rec}`)
  .join('\n')}

### 3. Resource Completion (Medium Impact, High Effort)
- Complete incomplete resources
- Add missing assessment criteria
- Enhance cultural integration

## 📈 Quality Targets

- **Target Average Quality**: 85/100
- **Target Excellent Resources**: 70%+
- **Target Cultural Integration**: 90%+
- **Target Teacher Readiness**: 95%+

## 🔄 Validation Schedule

- **Weekly**: Quick quality checks
- **Monthly**: Full validation cycle
- **Quarterly**: Comprehensive enhancement review

---

*Generated by Intelligent Resource Validator - ${new Date().toISOString()}*
`;

    fs.writeFileSync(planPath, planContent);
    console.log(`📋 Enhancement plan saved to: ${planPath}`);
  }
}

// Run the validator
async function main() {
  const validator = new IntelligentResourceValidator();
  const report = await validator.validateAllResources();

  console.log('\n🎉 Validation Complete!');
  console.log(`📊 Average Quality: ${report.averageQuality.toFixed(1)}/100`);
  console.log(`⭐ Excellent Resources: ${report.excellentResources}/${report.totalResources}`);
  console.log(`📄 Detailed report: INTELLIGENT_RESOURCE_VALIDATION_REPORT.md`);
  console.log(`📋 Enhancement plan: RESOURCE_ENHANCEMENT_PLAN.md`);
}

// Run the validator
main().catch(console.error);

export default IntelligentResourceValidator;
