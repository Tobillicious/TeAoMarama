#!/usr/bin/env npx tsx

/**
 * 🌿 CULTURAL IMPACT ASSESSOR
 * Kaitiaki Rangatira - Tikanga-Guided Technical Decision System
 * 
 * Evaluates all technical changes through Te Ao Māori principles
 * Ensures cultural safety and appropriateness in every deployment
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface CulturalAssessment {
  overallRating: 'EXCELLENT' | 'GOOD' | 'REQUIRES_REVIEW' | 'CULTURAL_RISK' | 'BLOCKED';
  manaakitangaScore: number; // Care for users (0-10)
  whakatoheaScore: number;   // Collective responsibility (0-10)
  kaitiakitangaScore: number; // Guardian stewardship (0-10)
  whakapapaScore: number;    // Relationship understanding (0-10)
  culturalSafetyFlags: string[];
  positiveAspects: string[];
  recommendations: string[];
  blockers: string[];
  shouldProceed: boolean;
}

interface CulturalAnalysis {
  filePath: string;
  contentType: 'code' | 'documentation' | 'configuration' | 'cultural_content';
  culturalElements: string[];
  riskFactors: string[];
  safeguards: string[];
}

class CulturalImpactAssessor {
  private readonly MĀORI_TERMS = [
    'māori', 'tikanga', 'kaitiaki', 'mātauranga', 'whakapapa', 'manaakitanga',
    'whakatōhea', 'aroha', 'mana', 'tapu', 'mauri', 'whānau', 'hapū', 'iwi',
    'marae', 'tangata whenua', 'pākehā', 'aotearoa', 'te ao mārama', 'rangatira',
    'tūpuna', 'kaumātua', 'kuia', 'tamariki', 'mokopuna', 'whakatōhea'
  ];

  private readonly SACRED_CONCEPTS = [
    'mātauranga māori', 'taonga', 'whakapapa', 'mauri', 'tapu', 'karakia',
    'pōwhiri', 'hongi', 'hangi', 'haka', 'waiata', 'koha'
  ];

  private readonly CULTURAL_SAFETY_PATTERNS = [
    // Inappropriate usage patterns
    /māori.*joke/i,
    /māori.*costume/i,
    /fake.*māori/i,
    /pretend.*māori/i,
    // Commercialization concerns
    /buy.*māori/i,
    /sell.*māori/i,
    /copyright.*māori/i,
    // Stereotyping patterns
    /all.*māori/i,
    /typical.*māori/i
  ];

  async assessChanges(): Promise<CulturalAssessment> {
    const assessment: CulturalAssessment = {
      overallRating: 'GOOD',
      manaakitangaScore: 8,
      whakatoheaScore: 8,
      kaitiakitangaScore: 8,
      whakapapaScore: 8,
      culturalSafetyFlags: [],
      positiveAspects: [],
      recommendations: [],
      blockers: [],
      shouldProceed: true
    };

    try {
      console.log('\n🌿 Assessing cultural impact through tikanga lens...');

      // Analyze changed files
      const changedFiles = await this.getChangedFiles();
      const culturalAnalyses = await this.analyzeCulturalContent(changedFiles);

      // Apply tikanga principles assessment
      await this.assessManaakitanga(culturalAnalyses, assessment);
      await this.assessWhakatohea(culturalAnalyses, assessment);
      await this.assessKaitiakitanga(culturalAnalyses, assessment);
      await this.assessWhakapapa(culturalAnalyses, assessment);

      // Check for cultural safety concerns
      await this.checkCulturalSafety(culturalAnalyses, assessment);

      // Determine overall cultural appropriateness
      this.determineOverallRating(assessment);

      return assessment;

    } catch (error) {
      assessment.overallRating = 'CULTURAL_RISK';
      assessment.blockers.push(`Cultural assessment failed: ${error}`);
      assessment.shouldProceed = false;
      return assessment;
    }
  }

  private async getChangedFiles(): Promise<string[]> {
    const files: string[] = [];

    try {
      // Get all changed files (staged, unstaged, untracked)
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
    } catch (error) {
      console.warn('Warning: Could not get changed files for cultural assessment');
    }

    return files;
  }

  private async analyzeCulturalContent(files: string[]): Promise<CulturalAnalysis[]> {
    const analyses: CulturalAnalysis[] = [];

    for (const filePath of files) {
      const analysis: CulturalAnalysis = {
        filePath,
        contentType: this.determineContentType(filePath),
        culturalElements: [],
        riskFactors: [],
        safeguards: []
      };

      try {
        // Skip binary files and deleted files
        if (this.isBinaryFile(filePath) || !fs.existsSync(filePath)) {
          continue;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        
        // Identify Māori terms
        this.MĀORI_TERMS.forEach(term => {
          const regex = new RegExp(term, 'gi');
          if (regex.test(content)) {
            analysis.culturalElements.push(term);
          }
        });

        // Check for sacred concepts (requires higher care)
        this.SACRED_CONCEPTS.forEach(concept => {
          const regex = new RegExp(concept, 'gi');
          if (regex.test(content)) {
            analysis.culturalElements.push(`SACRED: ${concept}`);
            analysis.riskFactors.push(`Contains sacred concept: ${concept}`);
          }
        });

        // Check for cultural safety red flags
        this.CULTURAL_SAFETY_PATTERNS.forEach(pattern => {
          if (pattern.test(content)) {
            analysis.riskFactors.push(`Potential cultural safety concern detected`);
          }
        });

        // Look for positive cultural practices
        this.identifyPositivePractices(content, analysis);

        analyses.push(analysis);

      } catch (error) {
        console.warn(`Could not analyze ${filePath}:`, error);
      }
    }

    return analyses;
  }

  private determineContentType(filePath: string): 'code' | 'documentation' | 'configuration' | 'cultural_content' {
    if (filePath.endsWith('.md') || filePath.endsWith('.txt')) {
      return 'documentation';
    } else if (filePath.includes('config') || filePath.endsWith('.json') || filePath.endsWith('.env')) {
      return 'configuration';
    } else if (filePath.includes('cultural') || filePath.includes('tikanga') || filePath.includes('māori')) {
      return 'cultural_content';
    }
    return 'code';
  }

  private isBinaryFile(filePath: string): boolean {
    const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.pdf', '.ico', '.svg'];
    return binaryExtensions.some(ext => filePath.toLowerCase().endsWith(ext));
  }

  private identifyPositivePractices(content: string, analysis: CulturalAnalysis): void {
    // Look for respectful practices
    if (/kia ora/i.test(content)) {
      analysis.safeguards.push('Uses respectful Māori greeting');
    }

    if (/cultural.{0,20}safety/i.test(content)) {
      analysis.safeguards.push('Mentions cultural safety considerations');
    }

    if (/tikanga.{0,20}appropriat/i.test(content)) {
      analysis.safeguards.push('References tikanga appropriateness');
    }

    if (/permission.{0,20}iwi/i.test(content)) {
      analysis.safeguards.push('Considers iwi permission protocols');
    }
  }

  private async assessManaakitanga(analyses: CulturalAnalysis[], assessment: CulturalAssessment): Promise<void> {
    // Manaakitanga: Care for users and their cultural identity
    let score = 8; // Start with good baseline

    for (const analysis of analyses) {
      // Positive indicators
      if (analysis.safeguards.some(s => s.includes('respectful') || s.includes('safety'))) {
        score += 1;
        assessment.positiveAspects.push(`${analysis.filePath}: Shows care for cultural safety`);
      }

      // Risk factors
      if (analysis.riskFactors.some(r => r.includes('safety concern'))) {
        score -= 3;
        assessment.culturalSafetyFlags.push(`${analysis.filePath}: Potential harm to cultural dignity`);
      }

      // Special care for cultural content
      if (analysis.contentType === 'cultural_content') {
        if (analysis.safeguards.length === 0) {
          score -= 1;
          assessment.recommendations.push(
            `${analysis.filePath}: Cultural content needs explicit safety considerations`
          );
        }
      }
    }

    assessment.manaakitangaScore = Math.max(0, Math.min(10, score));

    if (assessment.manaakitangaScore < 6) {
      assessment.recommendations.push('Enhance manaakitanga: Show greater care for user cultural experience');
    }
  }

  private async assessWhakatohea(analyses: CulturalAnalysis[], assessment: CulturalAssessment): Promise<void> {
    // Whakatōhea: Collective responsibility for community well-being
    let score = 8;

    const hasEducationalContent = analyses.some(a => 
      a.filePath.includes('education') || 
      a.filePath.includes('learn') || 
      a.culturalElements.length > 0
    );

    if (hasEducationalContent) {
      score += 1;
      assessment.positiveAspects.push('Changes contribute to collective educational benefit');
    }

    // Check if changes consider community impact
    const communityConsideration = analyses.some(a => 
      a.safeguards.some(s => s.includes('community') || s.includes('iwi'))
    );

    if (communityConsideration) {
      score += 1;
      assessment.positiveAspects.push('Changes consider community/iwi perspectives');
    }

    // Risk: Changes that might fragment or isolate
    const fragmentationRisk = analyses.some(a => 
      a.riskFactors.some(r => r.includes('appropriation') || r.includes('misuse'))
    );

    if (fragmentationRisk) {
      score -= 2;
      assessment.culturalSafetyFlags.push('Changes may fragment cultural cohesion');
    }

    assessment.whakatoheaScore = Math.max(0, Math.min(10, score));

    if (assessment.whakatoheaScore < 6) {
      assessment.recommendations.push('Enhance whakatōhea: Consider broader community benefit');
    }
  }

  private async assessKaitiakitanga(analyses: CulturalAnalysis[], assessment: CulturalAssessment): Promise<void> {
    // Kaitiakitanga: Guardian stewardship of cultural knowledge
    let score = 8;

    for (const analysis of analyses) {
      // Sacred content requires extra protection
      if (analysis.culturalElements.some(e => e.startsWith('SACRED:'))) {
        if (analysis.safeguards.length === 0) {
          score -= 3;
          assessment.blockers.push(
            `${analysis.filePath}: Sacred cultural content lacks protection safeguards`
          );
        } else {
          score += 1;
          assessment.positiveAspects.push(
            `${analysis.filePath}: Sacred content properly safeguarded`
          );
        }
      }

      // Check for appropriate attribution
      if (analysis.culturalElements.length > 0) {
        const content = fs.readFileSync(analysis.filePath, 'utf8');
        if (!/attribution|source|reference/i.test(content)) {
          score -= 1;
          assessment.recommendations.push(
            `${analysis.filePath}: Consider adding cultural knowledge attribution`
          );
        }
      }
    }

    assessment.kaitiakitangaScore = Math.max(0, Math.min(10, score));

    if (assessment.kaitiakitangaScore < 6) {
      assessment.recommendations.push('Enhance kaitiakitanga: Better protect cultural knowledge');
    }
  }

  private async assessWhakapapa(analyses: CulturalAnalysis[], assessment: CulturalAssessment): Promise<void> {
    // Whakapapa: Understanding relationships and connections
    let score = 8;

    // Check if changes maintain system relationships
    const systemFiles = analyses.filter(a => 
      a.contentType === 'configuration' || 
      a.filePath.includes('config') ||
      a.filePath.includes('main') ||
      a.filePath.includes('App')
    );

    if (systemFiles.length > 0) {
      score += 1;
      assessment.positiveAspects.push('Changes maintain system relationship integrity');
    }

    // Check for cultural connection understanding
    const culturalConnections = analyses.some(a => 
      a.culturalElements.includes('whakapapa') ||
      a.safeguards.some(s => s.includes('connection') || s.includes('relationship'))
    );

    if (culturalConnections) {
      score += 1;
      assessment.positiveAspects.push('Changes demonstrate understanding of cultural connections');
    }

    assessment.whakapapaScore = Math.max(0, Math.min(10, score));

    if (assessment.whakapapaScore < 6) {
      assessment.recommendations.push('Enhance whakapapa: Better understand cultural and system relationships');
    }
  }

  private async checkCulturalSafety(analyses: CulturalAnalysis[], assessment: CulturalAssessment): Promise<void> {
    for (const analysis of analyses) {
      // Critical safety checks
      if (analysis.riskFactors.length > 0) {
        analysis.riskFactors.forEach(risk => {
          assessment.culturalSafetyFlags.push(`${analysis.filePath}: ${risk}`);
        });
      }

      // Special attention to cultural content files
      if (analysis.contentType === 'cultural_content' && analysis.safeguards.length === 0) {
        assessment.culturalSafetyFlags.push(
          `${analysis.filePath}: Cultural content requires explicit safety review`
        );
      }
    }
  }

  private determineOverallRating(assessment: CulturalAssessment): void {
    const averageScore = (
      assessment.manaakitangaScore +
      assessment.whakatoheaScore +
      assessment.kaitiakitangaScore +
      assessment.whakapapaScore
    ) / 4;

    // Blockers override everything
    if (assessment.blockers.length > 0) {
      assessment.overallRating = 'BLOCKED';
      assessment.shouldProceed = false;
      return;
    }

    // Cultural safety flags are serious
    if (assessment.culturalSafetyFlags.length >= 3) {
      assessment.overallRating = 'CULTURAL_RISK';
      assessment.shouldProceed = false;
    } else if (assessment.culturalSafetyFlags.length > 0) {
      assessment.overallRating = 'REQUIRES_REVIEW';
    } else if (averageScore >= 9) {
      assessment.overallRating = 'EXCELLENT';
    } else if (averageScore >= 7) {
      assessment.overallRating = 'GOOD';
    } else {
      assessment.overallRating = 'REQUIRES_REVIEW';
    }

    // Final safety check
    if (assessment.overallRating === 'CULTURAL_RISK' || assessment.overallRating === 'BLOCKED') {
      assessment.shouldProceed = false;
    }
  }

  displayAssessment(assessment: CulturalAssessment): void {
    console.log('\n🌿 CULTURAL IMPACT ASSESSMENT');
    console.log('====================================');
    console.log('Tikanga-guided evaluation of technical changes');
    
    console.log(`\n📊 Overall Rating: ${assessment.overallRating}`);
    console.log(`✅ Culturally Safe to Proceed: ${assessment.shouldProceed ? 'YES' : 'NO'}`);

    console.log('\n🏛️ Tikanga Principle Scores:');
    console.log(`   Manaakitanga (Care): ${assessment.manaakitangaScore}/10`);
    console.log(`   Whakatōhea (Collective): ${assessment.whakatoheaScore}/10`);
    console.log(`   Kaitiakitanga (Stewardship): ${assessment.kaitiakitangaScore}/10`);
    console.log(`   Whakapapa (Relationships): ${assessment.whakapapaScore}/10`);

    if (assessment.positiveAspects.length > 0) {
      console.log('\n✨ Positive Cultural Aspects:');
      assessment.positiveAspects.forEach(aspect => 
        console.log(`   🌿 ${aspect}`)
      );
    }

    if (assessment.culturalSafetyFlags.length > 0) {
      console.log('\n⚠️  Cultural Safety Concerns:');
      assessment.culturalSafetyFlags.forEach(flag => 
        console.log(`   🚨 ${flag}`)
      );
    }

    if (assessment.blockers.length > 0) {
      console.log('\n🚫 Cultural Blockers:');
      assessment.blockers.forEach(blocker => 
        console.log(`   ❌ ${blocker}`)
      );
    }

    if (assessment.recommendations.length > 0) {
      console.log('\n💡 Tikanga Recommendations:');
      assessment.recommendations.forEach(rec => 
        console.log(`   🌱 ${rec}`)
      );
    }

    console.log('\n====================================');
  }
}

// Main execution
async function main() {
  console.log('🌿 Kaitiaki Rangatira - Cultural Impact Assessment');
  console.log('Tikanga-guided evaluation for cultural safety and appropriateness\n');

  const assessor = new CulturalImpactAssessor();
  const assessment = await assessor.assessChanges();
  
  assessor.displayAssessment(assessment);

  // Exit with appropriate code
  process.exit(assessment.shouldProceed ? 0 : 1);
}

// Execute if run directly
main().catch(error => {
  console.error('❌ Cultural assessment failed:', error);
  process.exit(1);
});

export { CulturalImpactAssessor };