#!/usr/bin/env tsx

// GLM Batch Enhancement Script for TeAoMarama Educational Resources
// Enhances existing educational content using GLM-4.5 and GLM-Z1 models

import { createGLMEnhancer, type EducationalEnhancementRequest } from '../src/utils/glm-integration';
import { loadRealEducationalContent } from '../src/utils/real-content-loader';

interface EnhancementConfig {
  apiKey: string;
  batchSize: number;
  maxResources: number;
  outputPath: string;
  models: ('glm-4.5' | 'glm-z1')[];
}

interface EnhancementResult {
  originalResource: any;
  glm45Enhanced?: string;
  glmZ1Enhanced?: string;
  enhancementMetrics: {
    glm45Score?: number;
    glmZ1Score?: number;
    culturalIntegration?: number;
    reasoningDepth?: number;
  };
  processingTime: number;
  status: 'success' | 'partial' | 'failed';
  errors?: string[];
}

class GLMBatchEnhancer {
  private config: EnhancementConfig;
  private glm45Enhancer?: any;
  private glmZ1Enhancer?: any;
  
  constructor(config: EnhancementConfig) {
    this.config = config;
    this.initializeEnhancers();
  }

  private initializeEnhancers() {
    try {
      if (this.config.models.includes('glm-4.5')) {
        this.glm45Enhancer = createGLMEnhancer('glm-4.5', this.config.apiKey);
        console.log('✅ GLM-4.5 enhancer initialized');
      }
      
      if (this.config.models.includes('glm-z1')) {
        this.glmZ1Enhancer = createGLMEnhancer('glm-z1', this.config.apiKey);
        console.log('✅ GLM-Z1 enhancer initialized');
      }
    } catch (error) {
      console.error('❌ Failed to initialize GLM enhancers:', error);
      throw error;
    }
  }

  async enhanceResourcesBatch(): Promise<EnhancementResult[]> {
    console.log('🚀 Starting GLM batch enhancement of TeAoMarama resources...');
    
    // Load existing enhanced resources
    const resources = await loadRealEducationalContent();
    const resourcesToProcess = resources.slice(0, this.config.maxResources);
    
    console.log(`📊 Processing ${resourcesToProcess.length} resources with GLM models`);
    
    const results: EnhancementResult[] = [];
    
    // Process in batches to avoid overwhelming the API
    for (let i = 0; i < resourcesToProcess.length; i += this.config.batchSize) {
      const batch = resourcesToProcess.slice(i, i + this.config.batchSize);
      console.log(`🔄 Processing batch ${Math.floor(i / this.config.batchSize) + 1}: resources ${i + 1}-${Math.min(i + this.config.batchSize, resourcesToProcess.length)}`);
      
      const batchPromises = batch.map(resource => this.enhanceResource(resource));
      const batchResults = await Promise.all(batchPromises);
      
      results.push(...batchResults);
      
      // Progress update
      console.log(`✅ Completed batch. Total enhanced: ${results.length}/${resourcesToProcess.length}`);
      
      // Rate limiting - pause between batches
      if (i + this.config.batchSize < resourcesToProcess.length) {
        console.log('⏳ Pausing between batches...');
        await this.delay(2000); // 2 second pause
      }
    }
    
    return results;
  }

  private async enhanceResource(resource: any): Promise<EnhancementResult> {
    const startTime = Date.now();
    const result: EnhancementResult = {
      originalResource: resource,
      enhancementMetrics: {},
      processingTime: 0,
      status: 'failed',
      errors: []
    };

    try {
      const enhancementRequest: EducationalEnhancementRequest = {
        content: resource.content || resource.description,
        subject: resource.subject,
        yearLevel: resource.yearLevel,
        culturalContext: this.determineCulturalContext(resource),
        enhancementType: this.determineEnhancementType(resource),
        requirements: this.generateRequirements(resource)
      };

      // Enhance with GLM-4.5 (creative enhancement)
      if (this.glm45Enhancer) {
        try {
          result.glm45Enhanced = await this.glm45Enhancer.enhanceEducationalContent(enhancementRequest);
          result.enhancementMetrics.glm45Score = this.calculateQualityScore(result.glm45Enhanced);
          console.log(`✅ GLM-4.5 enhanced: ${resource.id}`);
        } catch (error) {
          result.errors?.push(`GLM-4.5 failed: ${error.message}`);
          console.warn(`⚠️ GLM-4.5 failed for ${resource.id}:`, error.message);
        }
      }

      // Enhance with GLM-Z1 (reasoning enhancement)
      if (this.glmZ1Enhancer) {
        try {
          // For Z1, focus on reasoning and pedagogical depth
          const reasoningRequest = {
            ...enhancementRequest,
            enhancementType: 'pedagogical-depth' as const,
            requirements: [
              'Add deep reasoning and logical connections',
              'Include sophisticated assessment tasks',
              'Enhance critical thinking opportunities',
              ...enhancementRequest.requirements || []
            ]
          };
          
          result.glmZ1Enhanced = await this.glmZ1Enhancer.enhanceEducationalContent(reasoningRequest);
          result.enhancementMetrics.glmZ1Score = this.calculateQualityScore(result.glmZ1Enhanced);
          result.enhancementMetrics.reasoningDepth = this.calculateReasoningDepth(result.glmZ1Enhanced);
          console.log(`✅ GLM-Z1 enhanced: ${resource.id}`);
        } catch (error) {
          result.errors?.push(`GLM-Z1 failed: ${error.message}`);
          console.warn(`⚠️ GLM-Z1 failed for ${resource.id}:`, error.message);
        }
      }

      // Calculate cultural integration score
      const culturalScore = this.calculateCulturalIntegration(
        result.glm45Enhanced || result.glmZ1Enhanced || ''
      );
      result.enhancementMetrics.culturalIntegration = culturalScore;

      // Determine overall status
      if (result.glm45Enhanced || result.glmZ1Enhanced) {
        result.status = (result.glm45Enhanced && result.glmZ1Enhanced) ? 'success' : 'partial';
      }

    } catch (error) {
      result.errors?.push(`Enhancement failed: ${error.message}`);
      console.error(`❌ Failed to enhance ${resource.id}:`, error);
    }

    result.processingTime = Date.now() - startTime;
    return result;
  }

  private determineCulturalContext(resource: any): 'māori' | 'pacific' | 'multicultural' | 'general' {
    if (resource.culturalElements >= 3) return 'māori';
    if (resource.tags?.includes('pacific') || resource.subject === 'Pacific Studies') return 'pacific';
    if (resource.tags?.includes('multicultural')) return 'multicultural';
    return 'general';
  }

  private determineEnhancementType(resource: any): 'cultural-integration' | 'pedagogical-depth' | 'assessment-design' | 'accessibility' {
    if (resource.culturalElements < 2) return 'cultural-integration';
    if (resource.type === 'assessment') return 'assessment-design';
    if (resource.tags?.includes('accessibility')) return 'accessibility';
    return 'pedagogical-depth';
  }

  private generateRequirements(resource: any): string[] {
    const requirements = [
      'Align with New Zealand Curriculum',
      'Include clear learning objectives',
      'Provide assessment opportunities'
    ];

    if (resource.culturalElements > 0) {
      requirements.push('Respect cultural protocols and authenticity');
      requirements.push('Include appropriate Te Reo Māori');
    }

    if (resource.yearLevel.includes('Year 9') || resource.yearLevel.includes('Year 10')) {
      requirements.push('Include advanced critical thinking tasks');
      requirements.push('Connect to real-world applications');
    }

    return requirements;
  }

  private calculateQualityScore(content: string): number {
    if (!content) return 0;
    
    const indicators = [
      'learning objectives', 'assessment', 'māori', 'cultural', 'critical thinking',
      'success criteria', 'differentiation', 'real-world', 'curriculum'
    ];
    
    const lowerContent = content.toLowerCase();
    const matches = indicators.filter(indicator => lowerContent.includes(indicator));
    
    return Math.min(100, 60 + (matches.length * 5) + (content.length / 100));
  }

  private calculateReasoningDepth(content: string): number {
    if (!content) return 0;
    
    const reasoningIndicators = [
      'analyze', 'evaluate', 'compare', 'contrast', 'justify', 'explain',
      'reasoning', 'logic', 'evidence', 'conclusion', 'hypothesis'
    ];
    
    const lowerContent = content.toLowerCase();
    const matches = reasoningIndicators.filter(indicator => lowerContent.includes(indicator));
    
    return Math.min(10, 3 + (matches.length * 0.5));
  }

  private calculateCulturalIntegration(content: string): number {
    if (!content) return 0;
    
    const culturalIndicators = [
      'māori', 'te reo', 'tikanga', 'cultural', 'iwi', 'whakapapa',
      'mātauranga', 'aotearoa', 'pacific', 'cultural safety'
    ];
    
    const lowerContent = content.toLowerCase();
    const matches = culturalIndicators.filter(indicator => lowerContent.includes(indicator));
    
    return Math.min(10, matches.length * 1.2);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async saveResults(results: EnhancementResult[]): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${this.config.outputPath}/glm-enhancement-results-${timestamp}.json`;
    
    const summary = {
      timestamp,
      totalResources: results.length,
      successful: results.filter(r => r.status === 'success').length,
      partial: results.filter(r => r.status === 'partial').length,
      failed: results.filter(r => r.status === 'failed').length,
      averageProcessingTime: results.reduce((sum, r) => sum + r.processingTime, 0) / results.length,
      averageQualityImprovement: this.calculateAverageImprovement(results),
      results
    };

    try {
      const fs = await import('fs').then(m => m.promises);
      await fs.writeFile(filename, JSON.stringify(summary, null, 2));
      console.log(`📁 Results saved to: ${filename}`);
    } catch (error) {
      console.error('❌ Failed to save results:', error);
    }
  }

  private calculateAverageImprovement(results: EnhancementResult[]): number {
    const validResults = results.filter(r => r.status !== 'failed');
    if (validResults.length === 0) return 0;
    
    const improvements = validResults.map(r => 
      Math.max(r.enhancementMetrics.glm45Score || 0, r.enhancementMetrics.glmZ1Score || 0)
    );
    
    return improvements.reduce((sum, score) => sum + score, 0) / improvements.length;
  }
}

// Main execution
async function main() {
  const config: EnhancementConfig = {
    apiKey: process.env.GLM_API_KEY || '',
    batchSize: 5,
    maxResources: 100, // Process first 100 resources
    outputPath: './public/glm-enhanced-output',
    models: ['glm-4.5', 'glm-z1']
  };

  if (!config.apiKey) {
    console.error('❌ GLM_API_KEY environment variable required');
    console.log('Usage: GLM_API_KEY=your_key_here npm run glm:enhance');
    process.exit(1);
  }

  try {
    const enhancer = new GLMBatchEnhancer(config);
    const results = await enhancer.enhanceResourcesBatch();
    await enhancer.saveResults(results);
    
    console.log('\n🎉 GLM Enhancement Complete!');
    console.log(`✅ Successfully enhanced: ${results.filter(r => r.status === 'success').length}`);
    console.log(`⚠️ Partially enhanced: ${results.filter(r => r.status === 'partial').length}`);
    console.log(`❌ Failed: ${results.filter(r => r.status === 'failed').length}`);
    
  } catch (error) {
    console.error('❌ GLM Enhancement failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { GLMBatchEnhancer };