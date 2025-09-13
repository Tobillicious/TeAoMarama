#!/usr/bin/env tsx

/**
 * GLM Content Generator for TeAoMarama Platform
 * Advanced content generation using GLM-4.5 and GLM-Z1
 */

import { GLMEducationalEnhancer, createGLMEnhancer } from '../src/utils/glm-integration';

interface ContentGenerationRequest {
  type: 'lesson-plan' | 'assessment' | 'activity' | 'resource' | 'cultural-content';
  subject: string;
  yearLevel: string;
  topic: string;
  culturalContext: 'māori' | 'pacific' | 'multicultural' | 'general';
  requirements: string[];
  duration?: number; // in minutes
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface GeneratedContent {
  id: string;
  type: string;
  title: string;
  content: string;
  learningObjectives: string[];
  culturalElements: string[];
  assessmentCriteria: string[];
  resources: string[];
  duration: number;
  difficulty: string;
  nzcAlignment: string[];
  timestamp: string;
}

class GLMContentGenerator {
  private glmEnhancer: GLMEducationalEnhancer | null = null;
  private generatedContent: GeneratedContent[] = [];

  constructor() {
    this.initializeGLM();
  }

  private async initializeGLM() {
    try {
      const apiKey = process.env.GLM_API_KEY || 'demo-key';
      console.log(
        '🔍 Debug: API Key found:',
        apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined',
      );

      if (apiKey === 'demo-key') {
        console.log('🔑 GLM API Key not found. Using demo mode for content generation.');
        return;
      }

      this.glmEnhancer = createGLMEnhancer('glm-4.5', apiKey);

      console.log('✅ GLM Content Generator initialized');
    } catch (error) {
      console.error('❌ Failed to initialize GLM content generator:', error);
    }
  }

  async generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
    console.log(`\n🎯 Generating ${request.type} for ${request.subject}...`);
    console.log(`   Topic: ${request.topic}`);
    console.log(`   Year Level: ${request.yearLevel}`);
    console.log(`   Cultural Context: ${request.culturalContext}`);

    const contentId = `content-${Date.now()}`;
    let generatedContent: GeneratedContent;

    try {
      if (!this.glmEnhancer) {
        // Demo mode - generate mock content
        generatedContent = this.generateMockContent(request, contentId);
      } else {
        // Real GLM generation
        generatedContent = await this.generateWithGLM(request, contentId);
      }

      this.generatedContent.push(generatedContent);
      console.log(`✅ Content generated successfully: ${generatedContent.title}`);
      return generatedContent;
    } catch (error) {
      console.error('❌ Content generation failed:', error);
      throw error;
    }
  }

  private generateMockContent(request: ContentGenerationRequest, id: string): GeneratedContent {
    const baseContent = this.getBaseContentTemplate(request);

    return {
      id,
      type: request.type,
      title: `${request.subject}: ${request.topic}`,
      content: baseContent.content,
      learningObjectives: baseContent.learningObjectives,
      culturalElements: baseContent.culturalElements,
      assessmentCriteria: baseContent.assessmentCriteria,
      resources: baseContent.resources,
      duration: request.duration || 45,
      difficulty: request.difficulty || 'intermediate',
      nzcAlignment: baseContent.nzcAlignment,
      timestamp: new Date().toISOString(),
    };
  }

  private async generateWithGLM(
    request: ContentGenerationRequest,
    id: string,
  ): Promise<GeneratedContent> {
    if (!this.glmEnhancer) {
      throw new Error('GLM enhancer not initialized');
    }

    const prompt = this.buildGenerationPrompt(request);

    const enhancement = await this.glmEnhancer.enhanceEducationalContent({
      content: prompt,
      subject: request.subject,
      yearLevel: request.yearLevel,
      culturalContext: request.culturalContext,
      enhancementType: 'pedagogical-depth',
      requirements: request.requirements,
    });

    return this.parseGLMResponse(enhancement, request, id);
  }

  private buildGenerationPrompt(request: ContentGenerationRequest): string {
    const culturalContext =
      request.culturalContext === 'māori'
        ? 'with authentic Māori perspectives and tikanga compliance'
        : `with ${request.culturalContext} cultural context`;

    return `Generate a comprehensive ${request.type} for ${request.subject} at ${
      request.yearLevel
    } level.

Topic: ${request.topic}
Cultural Context: ${culturalContext}
Duration: ${request.duration || 45} minutes
Difficulty: ${request.difficulty || 'intermediate'}

Requirements:
${request.requirements.map((req) => `- ${req}`).join('\n')}

Please include:
1. Clear learning objectives aligned to NZC
2. Engaging activities and resources
3. Assessment criteria
4. Cultural elements and perspectives
5. Differentiated learning opportunities
6. Safety considerations

Format the response as structured educational content.`;
  }

  private parseGLMResponse(
    response: string,
    request: ContentGenerationRequest,
    id: string,
  ): GeneratedContent {
    // Parse the GLM response into structured content
    // This is a simplified parser - in production, you'd want more robust parsing
    const lines = response.split('\n');

    return {
      id,
      type: request.type,
      title: `${request.subject}: ${request.topic}`,
      content: response,
      learningObjectives: this.extractLearningObjectives(response),
      culturalElements: this.extractCulturalElements(response),
      assessmentCriteria: this.extractAssessmentCriteria(response),
      resources: this.extractResources(response),
      duration: request.duration || 45,
      difficulty: request.difficulty || 'intermediate',
      nzcAlignment: this.extractNZCAlignment(response),
      timestamp: new Date().toISOString(),
    };
  }

  private getBaseContentTemplate(request: ContentGenerationRequest) {
    const templates = {
      'lesson-plan': {
        content: `# ${request.subject} Lesson Plan: ${request.topic}

## Learning Objectives
- Students will understand key concepts in ${request.topic}
- Students will apply knowledge through practical activities
- Students will demonstrate cultural awareness and respect

## Activities
1. **Introduction** (10 minutes)
   - Cultural context discussion
   - Learning objectives overview

2. **Main Activity** (25 minutes)
   - Hands-on learning experience
   - Collaborative group work
   - Cultural integration

3. **Conclusion** (10 minutes)
   - Reflection and sharing
   - Assessment preparation

## Resources
- Digital resources and materials
- Cultural artifacts and references
- Assessment rubrics

## Assessment
- Formative assessment throughout
- Peer and self-assessment
- Cultural competency evaluation`,
        learningObjectives: [
          'Understand key concepts in the topic',
          'Apply knowledge through practical activities',
          'Demonstrate cultural awareness and respect',
        ],
        culturalElements: [
          'Cultural context discussion',
          'Authentic cultural perspectives',
          'Tikanga compliance',
        ],
        assessmentCriteria: [
          'Knowledge and understanding',
          'Application of skills',
          'Cultural competency',
        ],
        resources: [
          'Digital resources and materials',
          'Cultural artifacts and references',
          'Assessment rubrics',
        ],
        nzcAlignment: ['Key Competencies', 'Learning Areas', 'Cultural Principles'],
      },
      assessment: {
        content: `# ${request.subject} Assessment: ${request.topic}

## Assessment Overview
This assessment evaluates student understanding of ${request.topic} with emphasis on cultural competency and practical application.

## Assessment Criteria
- **Knowledge and Understanding** (40%)
- **Application and Analysis** (35%)
- **Cultural Competency** (25%)

## Assessment Tasks
1. **Written Response** - Demonstrate understanding
2. **Practical Application** - Apply knowledge in context
3. **Cultural Reflection** - Show cultural awareness

## Rubric
- **Excellence**: Comprehensive understanding with cultural insight
- **Merit**: Good understanding with cultural awareness
- **Achieved**: Basic understanding with cultural respect
- **Not Achieved**: Limited understanding or cultural insensitivity`,
        learningObjectives: [
          'Demonstrate understanding of key concepts',
          'Apply knowledge in practical contexts',
          'Show cultural competency and awareness',
        ],
        culturalElements: [
          'Cultural competency evaluation',
          'Authentic assessment contexts',
          'Cultural reflection requirements',
        ],
        assessmentCriteria: [
          'Knowledge and understanding',
          'Application and analysis',
          'Cultural competency',
        ],
        resources: ['Assessment rubrics', 'Cultural reference materials', 'Exemplar responses'],
        nzcAlignment: ['Assessment for Learning', 'Cultural Competency', 'Key Competencies'],
      },
      activity: {
        content: `# ${request.subject} Activity: ${request.topic}

## Activity Overview
An engaging, hands-on activity that explores ${request.topic} through cultural perspectives and practical application.

## Learning Outcomes
- Students will engage with the topic through multiple modalities
- Students will collaborate effectively in groups
- Students will demonstrate cultural respect and understanding

## Activity Steps
1. **Preparation** - Set up materials and cultural context
2. **Engagement** - Hands-on exploration and discovery
3. **Collaboration** - Group work and peer learning
4. **Reflection** - Share insights and cultural connections

## Materials Needed
- Activity-specific materials
- Cultural resources and references
- Digital tools and platforms

## Cultural Integration
- Authentic cultural perspectives
- Tikanga compliance
- Community connections`,
        learningObjectives: [
          'Engage with topic through multiple modalities',
          'Collaborate effectively in groups',
          'Demonstrate cultural respect and understanding',
        ],
        culturalElements: [
          'Authentic cultural perspectives',
          'Tikanga compliance',
          'Community connections',
        ],
        assessmentCriteria: [
          'Participation and engagement',
          'Collaboration and teamwork',
          'Cultural awareness and respect',
        ],
        resources: [
          'Activity-specific materials',
          'Cultural resources and references',
          'Digital tools and platforms',
        ],
        nzcAlignment: ['Key Competencies', 'Learning Areas', 'Cultural Principles'],
      },
    };

    return templates[request.type] || templates['lesson-plan'];
  }

  private extractLearningObjectives(content: string): string[] {
    // Simple extraction - look for objective patterns
    const objectives = content.match(/- Students will .+?\./g) || [];
    return objectives.map((obj) => obj.replace('- ', ''));
  }

  private extractCulturalElements(content: string): string[] {
    // Extract cultural elements
    const elements = content.match(/- .*cultural.*/gi) || [];
    return elements.map((el) => el.replace('- ', ''));
  }

  private extractAssessmentCriteria(content: string): string[] {
    // Extract assessment criteria
    const criteria = content.match(/- .*assessment.*/gi) || [];
    return criteria.map((c) => c.replace('- ', ''));
  }

  private extractResources(content: string): string[] {
    // Extract resources
    const resources = content.match(/- .*resource.*/gi) || [];
    return resources.map((r) => r.replace('- ', ''));
  }

  private extractNZCAlignment(content: string): string[] {
    // Extract NZC alignment
    const alignment = content.match(/- .*NZC.*/gi) || [];
    return alignment.map((a) => a.replace('- ', ''));
  }

  // Public methods
  getGeneratedContent(): GeneratedContent[] {
    return this.generatedContent;
  }

  getContentById(id: string): GeneratedContent | undefined {
    return this.generatedContent.find((content) => content.id === id);
  }

  generateReport(): void {
    console.log('\n📊 GLM Content Generation Report');
    console.log('================================');

    const totalContent = this.generatedContent.length;
    const contentTypes = this.generatedContent.reduce((acc, content) => {
      acc[content.type] = (acc[content.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log(`\n📈 Total Content Generated: ${totalContent}`);
    console.log('\n📝 Content by Type:');
    Object.entries(contentTypes).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });

    if (totalContent > 0) {
      console.log('\n🎯 Recent Content:');
      this.generatedContent.slice(-3).forEach((content) => {
        console.log(`\n   ${content.title}`);
        console.log(`   Type: ${content.type}`);
        console.log(`   Duration: ${content.duration} minutes`);
        console.log(`   Difficulty: ${content.difficulty}`);
        console.log(`   Cultural Elements: ${content.culturalElements.length}`);
      });
    }

    console.log('\n🚀 GLM Content Generator ready for production use!');
  }
}

// CLI interface
async function main() {
  const generator = new GLMContentGenerator();

  const command = process.argv[2];

  switch (command) {
    case 'generate':
      const type = process.argv[3] || 'lesson-plan';
      const subject = process.argv[4] || 'General';
      const yearLevel = process.argv[5] || 'Year 8';
      const topic = process.argv[6] || 'Sample Topic';
      const culturalContext = (process.argv[7] as any) || 'māori';

      const request: ContentGenerationRequest = {
        type: type as any,
        subject,
        yearLevel,
        topic,
        culturalContext,
        requirements: [
          'Align with New Zealand Curriculum',
          'Ensure cultural sensitivity',
          'Maintain educational rigor',
        ],
        duration: 45,
        difficulty: 'intermediate',
      };

      const content = await generator.generateContent(request);
      console.log('\n🎯 Generated Content:');
      console.log(`Title: ${content.title}`);
      console.log(`Type: ${content.type}`);
      console.log(`Duration: ${content.duration} minutes`);
      console.log(`Learning Objectives: ${content.learningObjectives.length}`);
      console.log(`Cultural Elements: ${content.culturalElements.length}`);
      break;

    case 'report':
      generator.generateReport();
      break;

    case 'list':
      const allContent = generator.getGeneratedContent();
      console.log('📚 Generated Content:');
      allContent.forEach((content) => {
        console.log(`\n   ${content.id}: ${content.title}`);
        console.log(`   Type: ${content.type} | Duration: ${content.duration}min`);
      });
      break;

    default:
      console.log('🎯 GLM Content Generator');
      console.log('Usage:');
      console.log('  npm run glm:generate     - Generate new content');
      console.log('  npm run glm:report       - Show generation report');
      console.log('  npm run glm:list         - List all generated content');
      console.log('');
      console.log('Environment Variables:');
      console.log('  GLM_API_KEY              - Your GLM API key for full functionality');
      break;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { GLMContentGenerator };
