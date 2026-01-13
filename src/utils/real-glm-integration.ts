// Real GLM Integration for TeAoMarama Educational Platform
// Actual API integration with GLM-4.5 and GLM-Z1 models
// Version: 1.0.0

import { apiConfigManager } from './api-config-manager';

export interface GLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GLMResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface GLMRequestOptions {
  model?: 'glm-4.5' | 'glm-4.5v' | 'glm-4.5-air' | 'cogvideox-3' | 'search-std';
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export class RealGLMIntegration {
  private static instance: RealGLMIntegration;
  private config: any;
  private isInitialized: boolean = false;

  private constructor() {
    this.config = apiConfigManager.getGLMConfig();
    this.isInitialized = apiConfigManager.isGLMEnabled();
  }

  public static getInstance(): RealGLMIntegration {
    if (!RealGLMIntegration.instance) {
      RealGLMIntegration.instance = new RealGLMIntegration();
    }
    return RealGLMIntegration.instance;
  }

  public isReady(): boolean {
    return this.isInitialized && !!this.config.apiKey;
  }

  public async generateContent(
    messages: GLMMessage[],
    options: GLMRequestOptions = {},
  ): Promise<GLMResponse | null> {
    if (!this.isReady()) {
      console.warn('GLM integration not ready - API key missing');
      return null;
    }

    try {
      const requestBody = {
        model: options.model || 'glm-4.5',
        messages: messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 2000,
        stream: options.stream || false,
      };

      const response = await fetch(this.config.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`GLM API error: ${response.status} ${response.statusText}`);
      }

      const data: GLMResponse = await response.json();
      console.log('GLM API Response:', data);
      return data;
    } catch (error) {
      console.error('GLM API Error:', error);
      return null;
    }
  }

  public async generateEducationalContent(
    subject: string,
    yearLevel: string,
    topic: string,
    culturalContext: boolean = true,
  ): Promise<string | null> {
    const systemPrompt = `You are an expert New Zealand educator creating culturally-safe, engaging educational content. 
    Focus on ${subject} for ${yearLevel} students, covering ${topic}.
    ${
      culturalContext
        ? 'Include appropriate Te Ao Māori perspectives and cultural context where relevant.'
        : ''
    }
    Create content that is accurate, age-appropriate, and aligned with NZ curriculum standards.`;

    const userPrompt = `Create a comprehensive lesson plan for ${subject} - ${topic} for ${yearLevel} students.
    Include learning objectives, activities, assessment ideas, and cultural connections where appropriate.`;

    const messages: GLMMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    const response = await this.generateContent(messages, {
      model: 'glm-4.5',
      temperature: 0.7,
      max_tokens: 3000,
    });

    return response?.choices[0]?.message?.content || null;
  }

  public async enhanceExistingContent(
    content: string,
    enhancementType: 'cultural' | 'educational' | 'accessibility' | 'engagement',
  ): Promise<string | null> {
    const enhancementPrompts = {
      cultural:
        'Enhance this content with appropriate Te Ao Māori perspectives and cultural context while maintaining educational integrity.',
      educational:
        'Improve the educational value of this content by adding learning objectives, assessment ideas, and curriculum alignment.',
      accessibility:
        'Make this content more accessible by simplifying language, adding visual descriptions, and improving structure.',
      engagement:
        'Make this content more engaging for students by adding interactive elements, real-world examples, and student-centered activities.',
    };

    const messages: GLMMessage[] = [
      {
        role: 'system',
        content:
          'You are an expert educational content enhancer. Improve the provided content while maintaining its core message and accuracy.',
      },
      {
        role: 'user',
        content: `${enhancementPrompts[enhancementType]}\n\nContent to enhance:\n${content}`,
      },
    ];

    const response = await this.generateContent(messages, {
      model: 'glm-4.5',
      temperature: 0.6,
      max_tokens: 2500,
    });

    return response?.choices[0]?.message?.content || null;
  }

  public async validateCulturalSafety(
    content: string,
  ): Promise<{ isSafe: boolean; suggestions: string[]; score: number } | null> {
    const systemPrompt = `You are a cultural safety validator for New Zealand educational content. 
    Evaluate content for cultural appropriateness, accuracy, and sensitivity.
    Consider Te Ao Māori perspectives, avoid stereotypes, and ensure respectful representation.`;

    const userPrompt = `Please validate this educational content for cultural safety and provide suggestions for improvement:

${content}

Respond with a JSON object containing:
- isSafe: boolean
- suggestions: string[]
- score: number (0-100)`;

    const messages: GLMMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    const response = await this.generateContent(messages, {
      model: 'glm-4.5',
      temperature: 0.3,
      max_tokens: 1000,
    });

    if (response?.choices[0]?.message?.content) {
      try {
        return JSON.parse(response.choices[0].message.content);
      } catch (error) {
        console.error('Failed to parse cultural safety validation response:', error);
        return null;
      }
    }

    return null;
  }

  public async generateAssessmentQuestions(
    subject: string,
    yearLevel: string,
    topic: string,
    questionType: 'multiple-choice' | 'short-answer' | 'essay' | 'practical',
    count: number = 5,
  ): Promise<string[] | null> {
    const systemPrompt = `You are an expert assessment creator for New Zealand education. 
    Create high-quality assessment questions that are age-appropriate, culturally-safe, and aligned with NZ curriculum standards.`;

    const userPrompt = `Create ${count} ${questionType} assessment questions for ${subject} - ${topic} for ${yearLevel} students.
    Ensure questions are clear, fair, and test genuine understanding of the topic.`;

    const messages: GLMMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    const response = await this.generateContent(messages, {
      model: 'glm-4.5',
      temperature: 0.5,
      max_tokens: 2000,
    });

    if (response?.choices[0]?.message?.content) {
      // Parse the response to extract individual questions
      const content = response.choices[0].message.content;
      const questions = content.split(/\d+\./).filter((q) => q.trim().length > 0);
      return questions.map((q) => q.trim()).slice(0, count);
    }

    return null;
  }

  public getStatus(): {
    isReady: boolean;
    model: string;
    apiKeyConfigured: boolean;
    lastRequest?: Date;
  } {
    return {
      isReady: this.isReady(),
      model: 'glm-4.5',
      apiKeyConfigured: !!this.config.apiKey,
      lastRequest: undefined, // Could track this if needed
    };
  }
}

// Export singleton instance
export const realGLMIntegration = RealGLMIntegration.getInstance();
