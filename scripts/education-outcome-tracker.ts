#!/usr/bin/env npx tsx

/**
 * 📈 EDUCATIONAL EFFECTIVENESS TRACKER
 * Kaitiaki Rangatira - Learning Outcome Measurement System
 * 
 * Measures actual educational impact of platform changes
 * Focus on learning outcomes, not just engagement metrics
 */

import { execSync } from 'child_process';
import * as fs from 'fs';


interface EducationalMetrics {
  learningOutcomeScore: number; // 0-100
  teacherEfficiencyScore: number; // 0-100  
  studentEngagementScore: number; // 0-100
  culturalLearningScore: number; // 0-100
  nzCurriculumAlignment: number; // 0-100
  overallEffectiveness: number; // 0-100
  recommendations: string[];
  improvements: string[];
  concerns: string[];
  shouldEnhance: string[];
}

interface ContentAnalysis {
  filePath: string;
  contentType: 'educational' | 'technical' | 'cultural' | 'assessment';
  educationalElements: string[];
  learningObjectives: string[];
  nzCurriculumLinks: string[];
  culturalComponents: string[];
  pedagogicalFeatures: string[];
}

class EducationOutcomeTracker {
  private readonly NZ_CURRICULUM_AREAS = [
    'english', 'mathematics', 'science', 'social studies', 'arts', 'health',
    'physical education', 'learning languages', 'technology'
  ];

  private readonly NZ_CURRICULUM_LEVELS = [
    'level 1', 'level 2', 'level 3', 'level 4', 'level 5', 'level 6', 'level 7', 'level 8'
  ];

  private readonly LEARNING_INDICATORS = [
    'understand', 'analyze', 'evaluate', 'create', 'apply', 'remember',
    'synthesize', 'compare', 'contrast', 'explain', 'demonstrate',
    'investigate', 'explore', 'discover', 'practice', 'master'
  ];

  private readonly PEDAGOGICAL_FEATURES = [
    'interactive', 'hands-on', 'collaborative', 'inquiry-based', 'problem-solving',
    'scaffolded', 'differentiated', 'formative assessment', 'summative assessment',
    'peer learning', 'self-directed', 'multimedia', 'gamified', 'authentic assessment'
  ];

  private readonly CULTURAL_LEARNING_ELEMENTS = [
    'te reo māori', 'tikanga māori', 'māori perspectives', 'bicultural',
    'multicultural', 'indigenous knowledge', 'local context', 'cultural identity',
    'cultural diversity', 'cultural competency', 'cultural responsiveness'
  ];

  async trackEducationalEffectiveness(): Promise<EducationalMetrics> {
    const metrics: EducationalMetrics = {
      learningOutcomeScore: 60, // Baseline
      teacherEfficiencyScore: 60,
      studentEngagementScore: 60,
      culturalLearningScore: 60,
      nzCurriculumAlignment: 60,
      overallEffectiveness: 60,
      recommendations: [],
      improvements: [],
      concerns: [],
      shouldEnhance: []
    };

    try {
      console.log('\n📈 Tracking educational effectiveness of platform changes...');

      // Analyze changed files for educational content
      const changedFiles = await this.getChangedFiles();
      const contentAnalyses = await this.analyzeEducationalContent(changedFiles);

      // Evaluate educational impact
      await this.assessLearningOutcomes(contentAnalyses, metrics);
      await this.assessTeacherEfficiency(contentAnalyses, metrics);
      await this.assessStudentEngagement(contentAnalyses, metrics);
      await this.assessCulturalLearning(contentAnalyses, metrics);
      await this.assessNZCurriculumAlignment(contentAnalyses, metrics);

      // Calculate overall effectiveness
      this.calculateOverallEffectiveness(metrics);

      return metrics;

    } catch (error) {
      metrics.concerns.push(`Educational tracking failed: ${error}`);
      metrics.overallEffectiveness = 30; // Low score for tracking failure
      return metrics;
    }
  }

  private async getChangedFiles(): Promise<string[]> {
    const files: string[] = [];

    try {
      const commands = [
        'git diff --cached --name-only',
        'git diff --name-only', 
        'git ls-files --others --exclude-standard'
      ];

      for (const command of commands) {
        try {
          const output = execSync(command, { encoding: 'utf8' });
          output.split('\n').filter(line => line).forEach(file => {
            if (!files.includes(file)) {
              files.push(file);
            }
          });
        } catch {
          // Command failed, continue
        }
      }
    } catch {
      console.warn('Warning: Could not get changed files for educational assessment');
    }

    return files;
  }

  private async analyzeEducationalContent(files: string[]): Promise<ContentAnalysis[]> {
    const analyses: ContentAnalysis[] = [];

    for (const filePath of files) {
      // Skip binary files and non-content files
      if (this.isBinaryFile(filePath) || !fs.existsSync(filePath)) {
        continue;
      }

      const analysis: ContentAnalysis = {
        filePath,
        contentType: this.determineContentType(filePath),
        educationalElements: [],
        learningObjectives: [],
        nzCurriculumLinks: [],
        culturalComponents: [],
        pedagogicalFeatures: []
      };

      try {
        const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
        
        // Identify learning indicators
        this.LEARNING_INDICATORS.forEach(indicator => {
          if (content.includes(indicator)) {
            analysis.educationalElements.push(indicator);
          }
        });

        // Check for NZ Curriculum alignment
        this.NZ_CURRICULUM_AREAS.forEach(area => {
          if (content.includes(area)) {
            analysis.nzCurriculumLinks.push(area);
          }
        });

        this.NZ_CURRICULUM_LEVELS.forEach(level => {
          if (content.includes(level)) {
            analysis.nzCurriculumLinks.push(level);
          }
        });

        // Identify pedagogical features
        this.PEDAGOGICAL_FEATURES.forEach(feature => {
          if (content.includes(feature.toLowerCase())) {
            analysis.pedagogicalFeatures.push(feature);
          }
        });

        // Check for cultural learning elements
        this.CULTURAL_LEARNING_ELEMENTS.forEach(element => {
          if (content.includes(element)) {
            analysis.culturalComponents.push(element);
          }
        });

        // Extract learning objectives (heuristic approach)
        this.extractLearningObjectives(content, analysis);

        analyses.push(analysis);

      } catch (error) {
        console.warn(`Could not analyze educational content in ${filePath}:`, error);
      }
    }

    return analyses;
  }

  private determineContentType(filePath: string): 'educational' | 'technical' | 'cultural' | 'assessment' {
    const path = filePath.toLowerCase();
    
    if (path.includes('lesson') || path.includes('curriculum') || path.includes('learning') ||
        path.includes('education') || path.includes('teach')) {
      return 'educational';
    } else if (path.includes('cultural') || path.includes('māori') || path.includes('tikanga')) {
      return 'cultural';
    } else if (path.includes('test') || path.includes('assessment') || path.includes('quiz')) {
      return 'assessment';
    }
    
    return 'technical';
  }

  private isBinaryFile(filePath: string): boolean {
    const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.pdf', '.ico', '.svg'];
    return binaryExtensions.some(ext => filePath.toLowerCase().endsWith(ext));
  }

  private extractLearningObjectives(content: string, analysis: ContentAnalysis): void {
    // Look for common learning objective patterns
    const objectivePatterns = [
      /students will (be able to |)([^.]+)/gi,
      /learners will (understand|know|create|analyze|evaluate) ([^.]+)/gi,
      /by the end.*students will ([^.]+)/gi,
      /learning objective[s]?:([^.]+)/gi,
      /aims? to ([^.]+)/gi
    ];

    objectivePatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          analysis.learningObjectives.push(match.replace(/students will |learners will |by the end.*students will |learning objectives?:|aims? to /gi, '').trim());
        });
      }
    });
  }

  private async assessLearningOutcomes(analyses: ContentAnalysis[], metrics: EducationalMetrics): Promise<void> {
    let score = 60; // Start with baseline

    for (const analysis of analyses) {
      // Positive indicators
      if (analysis.learningObjectives.length > 0) {
        score += analysis.learningObjectives.length * 5;
        metrics.improvements.push(`${analysis.filePath}: ${analysis.learningObjectives.length} learning objectives identified`);
      }

      if (analysis.educationalElements.length >= 3) {
        score += 10;
        metrics.improvements.push(`${analysis.filePath}: Rich educational content with multiple learning indicators`);
      }

      // Assessment features boost learning outcomes
      if (analysis.contentType === 'assessment') {
        score += 15;
        metrics.improvements.push(`${analysis.filePath}: Assessment features support learning measurement`);
      }

      // Interactive features
      if (analysis.pedagogicalFeatures.some(f => ['interactive', 'hands-on', 'problem-solving'].includes(f))) {
        score += 8;
        metrics.improvements.push(`${analysis.filePath}: Interactive features enhance learning`);
      }
    }

    // Concerns
    const noEducationalContent = analyses.filter(a => 
      a.educationalElements.length === 0 && a.learningObjectives.length === 0
    );

    if (noEducationalContent.length > analyses.length * 0.7) {
      score -= 20;
      metrics.concerns.push('Majority of changes lack clear educational value');
    }

    metrics.learningOutcomeScore = Math.max(0, Math.min(100, score));

    if (metrics.learningOutcomeScore < 70) {
      metrics.shouldEnhance.push('Learning outcomes: Add clearer learning objectives and educational indicators');
    }
  }

  private async assessTeacherEfficiency(analyses: ContentAnalysis[], metrics: EducationalMetrics): Promise<void> {
    let score = 60;

    for (const analysis of analyses) {
      // Features that help teachers
      const teacherHelpingFeatures = [
        'lesson plan', 'curriculum mapping', 'assessment rubric', 'scaffolded',
        'differentiated', 'resource', 'template', 'guide'
      ];

      const content = fs.existsSync(analysis.filePath) ? 
        fs.readFileSync(analysis.filePath, 'utf8').toLowerCase() : '';

      teacherHelpingFeatures.forEach(feature => {
        if (content.includes(feature)) {
          score += 5;
          metrics.improvements.push(`${analysis.filePath}: ${feature} supports teacher efficiency`);
        }
      });

      // Automated assessment features
      if (content.includes('auto') && (content.includes('grade') || content.includes('mark'))) {
        score += 12;
        metrics.improvements.push(`${analysis.filePath}: Automated assessment reduces teacher workload`);
      }

      // Curriculum alignment helps teachers
      if (analysis.nzCurriculumLinks.length > 0) {
        score += 8;
        metrics.improvements.push(`${analysis.filePath}: NZ Curriculum alignment saves teacher planning time`);
      }
    }

    // Technical complexity concerns
    const complexChanges = analyses.filter(a => 
      a.filePath.includes('config') || a.filePath.includes('complex')
    );

    if (complexChanges.length > 0) {
      score -= 5;
      metrics.concerns.push('Complex technical changes may impact teacher usability');
    }

    metrics.teacherEfficiencyScore = Math.max(0, Math.min(100, score));

    if (metrics.teacherEfficiencyScore < 70) {
      metrics.shouldEnhance.push('Teacher efficiency: Add more teacher-supporting tools and clearer interfaces');
    }
  }

  private async assessStudentEngagement(analyses: ContentAnalysis[], metrics: EducationalMetrics): Promise<void> {
    let score = 60;

    for (const analysis of analyses) {
      // Engagement-boosting features
      const engagementFeatures = analysis.pedagogicalFeatures.filter(f => 
        ['interactive', 'gamified', 'multimedia', 'collaborative', 'hands-on'].includes(f)
      );

      score += engagementFeatures.length * 6;
      
      if (engagementFeatures.length > 0) {
        metrics.improvements.push(`${analysis.filePath}: ${engagementFeatures.join(', ')} features boost engagement`);
      }

      // Visual and multimedia content
      if (analysis.filePath.includes('visual') || analysis.filePath.includes('media') ||
          analysis.filePath.includes('image') || analysis.filePath.includes('video')) {
        score += 8;
        metrics.improvements.push(`${analysis.filePath}: Visual/multimedia content increases engagement`);
      }

      // Self-directed learning features
      if (analysis.pedagogicalFeatures.includes('self-directed')) {
        score += 10;
        metrics.improvements.push(`${analysis.filePath}: Self-directed features increase student agency`);
      }
    }

    // Cultural relevance boosts engagement
    const culturallyRelevant = analyses.filter(a => a.culturalComponents.length > 0);
    if (culturallyRelevant.length > 0) {
      score += 15;
      metrics.improvements.push(`Cultural relevance increases student connection and engagement`);
    }

    metrics.studentEngagementScore = Math.max(0, Math.min(100, score));

    if (metrics.studentEngagementScore < 70) {
      metrics.shouldEnhance.push('Student engagement: Add more interactive, multimedia, and culturally relevant features');
    }
  }

  private async assessCulturalLearning(analyses: ContentAnalysis[], metrics: EducationalMetrics): Promise<void> {
    let score = 60;

    for (const analysis of analyses) {
      // Cultural components boost score significantly
      score += analysis.culturalComponents.length * 8;

      if (analysis.culturalComponents.length > 0) {
        metrics.improvements.push(
          `${analysis.filePath}: Cultural elements (${analysis.culturalComponents.join(', ')}) enhance bicultural learning`
        );
      }

      // Māori language learning
      if (analysis.culturalComponents.includes('te reo māori')) {
        score += 12;
        metrics.improvements.push(`${analysis.filePath}: Te reo Māori learning supports cultural identity`);
      }

      // Local context
      if (analysis.culturalComponents.includes('local context')) {
        score += 8;
        metrics.improvements.push(`${analysis.filePath}: Local context increases cultural relevance`);
      }
    }

    // Bonus for bicultural balance
    const hasMāoriContent = analyses.some(a => 
      a.culturalComponents.some(c => c.includes('māori'))
    );

    const hasMulticulturalContent = analyses.some(a => 
      a.culturalComponents.includes('multicultural')
    );

    if (hasMāoriContent && hasMulticulturalContent) {
      score += 15;
      metrics.improvements.push('Balanced bicultural and multicultural representation');
    }

    // Concerns
    if (analyses.length > 3 && analyses.filter(a => a.culturalComponents.length === 0).length === analyses.length) {
      score -= 15;
      metrics.concerns.push('No cultural learning components identified in changes');
    }

    metrics.culturalLearningScore = Math.max(0, Math.min(100, score));

    if (metrics.culturalLearningScore < 70) {
      metrics.shouldEnhance.push('Cultural learning: Integrate more Māori perspectives and cultural diversity elements');
    }
  }

  private async assessNZCurriculumAlignment(analyses: ContentAnalysis[], metrics: EducationalMetrics): Promise<void> {
    let score = 60;

    for (const analysis of analyses) {
      // NZ Curriculum areas
      score += analysis.nzCurriculumLinks.length * 5;

      if (analysis.nzCurriculumLinks.length > 0) {
        metrics.improvements.push(
          `${analysis.filePath}: Aligned with NZ Curriculum (${analysis.nzCurriculumLinks.join(', ')})`
        );
      }

      // Key competencies (NZ Curriculum)
      const content = fs.existsSync(analysis.filePath) ? 
        fs.readFileSync(analysis.filePath, 'utf8').toLowerCase() : '';

      const keyCompetencies = [
        'thinking', 'using language', 'managing self', 'relating to others', 'participating and contributing'
      ];

      keyCompetencies.forEach(competency => {
        if (content.includes(competency)) {
          score += 6;
          metrics.improvements.push(`${analysis.filePath}: Develops key competency: ${competency}`);
        }
      });

      // Values alignment (NZ Curriculum)
      const curriculumValues = [
        'excellence', 'innovation', 'diversity', 'equity', 'community', 'ecological sustainability', 'integrity', 'respect'
      ];

      curriculumValues.forEach(value => {
        if (content.includes(value)) {
          score += 4;
          metrics.improvements.push(`${analysis.filePath}: Promotes curriculum value: ${value}`);
        }
      });
    }

    // Educational level appropriateness
    const hasLevelSpecification = analyses.some(a => 
      a.nzCurriculumLinks.some(link => link.includes('level'))
    );

    if (hasLevelSpecification) {
      score += 10;
      metrics.improvements.push('Content appropriately leveled for NZ Curriculum standards');
    }

    metrics.nzCurriculumAlignment = Math.max(0, Math.min(100, score));

    if (metrics.nzCurriculumAlignment < 70) {
      metrics.shouldEnhance.push('NZ Curriculum alignment: Add clearer curriculum area mapping and level specifications');
    }
  }

  private calculateOverallEffectiveness(metrics: EducationalMetrics): void {
    // Weighted average - learning outcomes and cultural learning are most important
    const weights = {
      learningOutcome: 0.25,
      teacherEfficiency: 0.20,
      studentEngagement: 0.20,
      culturalLearning: 0.20,
      curriculumAlignment: 0.15
    };

    metrics.overallEffectiveness = Math.round(
      metrics.learningOutcomeScore * weights.learningOutcome +
      metrics.teacherEfficiencyScore * weights.teacherEfficiency +
      metrics.studentEngagementScore * weights.studentEngagement +
      metrics.culturalLearningScore * weights.culturalLearning +
      metrics.nzCurriculumAlignment * weights.curriculumAlignment
    );

    // Generate overall recommendations
    if (metrics.overallEffectiveness >= 85) {
      metrics.recommendations.push('🌟 Excellent educational effectiveness - continue this approach');
    } else if (metrics.overallEffectiveness >= 70) {
      metrics.recommendations.push('✅ Good educational value - minor enhancements recommended');
    } else if (metrics.overallEffectiveness >= 50) {
      metrics.recommendations.push('⚠️  Educational effectiveness needs improvement - focus on learning outcomes');
    } else {
      metrics.recommendations.push('🚨 Low educational value - major enhancements required');
    }
  }

  displayMetrics(metrics: EducationalMetrics): void {
    console.log('\n📈 EDUCATIONAL EFFECTIVENESS ANALYSIS');
    console.log('======================================');
    console.log('Measuring actual learning impact of platform changes');

    console.log(`\n🎯 Overall Effectiveness: ${metrics.overallEffectiveness}/100`);

    console.log('\n📊 Detailed Metrics:');
    console.log(`   Learning Outcomes: ${metrics.learningOutcomeScore}/100`);
    console.log(`   Teacher Efficiency: ${metrics.teacherEfficiencyScore}/100`);
    console.log(`   Student Engagement: ${metrics.studentEngagementScore}/100`);
    console.log(`   Cultural Learning: ${metrics.culturalLearningScore}/100`);
    console.log(`   NZ Curriculum Alignment: ${metrics.nzCurriculumAlignment}/100`);

    if (metrics.improvements.length > 0) {
      console.log('\n✨ Educational Improvements:');
      metrics.improvements.forEach(improvement => 
        console.log(`   📈 ${improvement}`)
      );
    }

    if (metrics.concerns.length > 0) {
      console.log('\n⚠️  Educational Concerns:');
      metrics.concerns.forEach(concern => 
        console.log(`   🔍 ${concern}`)
      );
    }

    if (metrics.shouldEnhance.length > 0) {
      console.log('\n🚀 Enhancement Opportunities:');
      metrics.shouldEnhance.forEach(enhancement => 
        console.log(`   💡 ${enhancement}`)
      );
    }

    if (metrics.recommendations.length > 0) {
      console.log('\n🎓 Educational Recommendations:');
      metrics.recommendations.forEach(rec => 
        console.log(`   📚 ${rec}`)
      );
    }

    console.log('\n======================================');
  }
}

// Main execution
async function main() {
  console.log('📈 Kaitiaki Rangatira - Educational Effectiveness Tracker');
  console.log('Measuring learning impact and educational value of changes\n');

  const tracker = new EducationOutcomeTracker();
  const metrics = await tracker.trackEducationalEffectiveness();
  
  tracker.displayMetrics(metrics);

  // Exit with appropriate code based on effectiveness
  process.exit(metrics.overallEffectiveness >= 50 ? 0 : 1);
}

// Execute if run directly
main().catch(error => {
  console.error('❌ Educational effectiveness tracking failed:', error);
  process.exit(1);
});

export { EducationOutcomeTracker };