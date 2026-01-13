/**
 * 🌟 GLM INTEGRATION SYSTEM
 * 
 * This system integrates the GLM API key: 90f7738e0e734c13a201b5cb95bcbf64.znT6L8AUHI9ZoKrk
 * and ensures maximum utilization of GLM models for Te Ao Mārama platform.
 */

export interface GLMRequest {
  model: 'glm-4' | 'glm-4v' | 'glm-3-turbo';
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
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

class GLMIntegration {
  private apiKey: string = '90f7738e0e734c13a201b5cb95bcbf64.znT6L8AUHI9ZoKrk';
  private baseUrl: string = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
  private requestCount: number = 0;
  private totalTokens: number = 0;
  private isActive: boolean = true;

  constructor() {
    console.log('🌟 GLM Integration System initialized');
    console.log(`🔑 API Key: ${this.apiKey.substring(0, 20)}...`);
  }

  async makeRequest(request: GLMRequest): Promise<GLMResponse> {
    if (!this.isActive) {
      throw new Error('GLM Integration is not active');
    }

    try {
      this.requestCount++;
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: request.model,
          messages: request.messages,
          temperature: request.temperature || 0.7,
          max_tokens: request.max_tokens || 2000,
          stream: request.stream || false,
        }),
      });

      if (!response.ok) {
        throw new Error(`GLM API error: ${response.status} ${response.statusText}`);
      }

      const data: GLMResponse = await response.json();
      this.totalTokens += data.usage.total_tokens;
      
      console.log(`🌟 GLM Request #${this.requestCount} completed`);
      console.log(`📊 Tokens used: ${data.usage.total_tokens} (Total: ${this.totalTokens})`);
      
      return data;
    } catch (error) {
      console.error('❌ GLM API Error:', error);
      throw error;
    }
  }

  // Educational Content Generation
  async generateEducationalContent(subject: string, level: string, culturalElements: string[]): Promise<string> {
    const systemPrompt = `You are an expert educational content creator specializing in New Zealand curriculum and Te Ao Māori integration. 
    Create engaging, culturally appropriate educational content that aligns with NZ curriculum standards.
    
    Cultural Guidelines:
    - Always use "Māori" with macron, never "Maori"
    - Use "iwi" and "hapū" instead of "tribe"
    - Use "pūrākau" for traditional stories, not "myths" or "legends"
    - Ensure cultural safety and respect
    - Integrate Te Ao Māori perspectives authentically`;

    const userPrompt = `Create educational content for:
    Subject: ${subject}
    Level: ${level}
    Cultural Elements: ${culturalElements.join(', ')}
    
    Please provide:
    1. Learning objectives aligned with NZ curriculum
    2. Engaging activities with cultural integration
    3. Assessment criteria
    4. Resources and materials needed
    5. Cultural safety considerations`;

    const response = await this.makeRequest({
      model: 'glm-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 3000
    });

    return response.choices[0].message.content;
  }

  // Cultural Safety Validation
  async validateCulturalSafety(content: string): Promise<{
    isSafe: boolean;
    issues: string[];
    suggestions: string[];
    culturalElements: string[];
  }> {
    const systemPrompt = `You are a cultural safety expert specializing in Te Ao Māori and New Zealand cultural protocols.
    Analyze content for cultural appropriateness and provide detailed feedback.
    
    Check for:
    - Correct use of Māori language and terms
    - Respectful representation of Māori culture
    - Appropriate cultural protocols
    - Cultural safety considerations
    - Authentic cultural integration`;

    const userPrompt = `Please validate this content for cultural safety:
    
    ${content}
    
    Provide:
    1. Overall safety assessment (safe/caution/unsafe)
    2. Specific issues found
    3. Suggestions for improvement
    4. Cultural elements identified`;

    const response = await this.makeRequest({
      model: 'glm-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    // Parse the response to extract structured data
    const validationContent = response.choices[0].message.content;
    
    // Simple parsing - in production, use more sophisticated parsing
    const isSafe = !validationContent.toLowerCase().includes('unsafe');
    const issues = validationContent.match(/- Issue: (.+)/g)?.map(m => m.replace('- Issue: ', '')) || [];
    const suggestions = validationContent.match(/- Suggestion: (.+)/g)?.map(m => m.replace('- Suggestion: ', '')) || [];
    const culturalElements = validationContent.match(/- Cultural Element: (.+)/g)?.map(m => m.replace('- Cultural Element: ', '')) || [];

    return {
      isSafe,
      issues,
      suggestions,
      culturalElements
    };
  }

  // Te Reo Māori Translation and Validation
  async translateToTeReo(englishText: string): Promise<{
    teReo: string;
    pronunciation: string;
    culturalContext: string;
  }> {
    const systemPrompt = `You are a Te Reo Māori language expert and cultural advisor.
    Provide accurate translations with proper pronunciation guides and cultural context.
    
    Guidelines:
    - Use correct Māori grammar and sentence structure
    - Provide pronunciation guides using standard phonetic notation
    - Include cultural context and appropriate usage
    - Ensure translations are culturally appropriate`;

    const userPrompt = `Translate this English text to Te Reo Māori:
    
    "${englishText}"
    
    Provide:
    1. Accurate Te Reo Māori translation
    2. Pronunciation guide
    3. Cultural context and appropriate usage`;

    const response = await this.makeRequest({
      model: 'glm-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.5,
      max_tokens: 1500
    });

    const responseContent = response.choices[0].message.content;
    
    // Parse the response
    const teReo = responseContent.match(/Te Reo Māori: (.+)/)?.[1] || '';
    const pronunciation = responseContent.match(/Pronunciation: (.+)/)?.[1] || '';
    const culturalContext = responseContent.match(/Cultural Context: (.+)/)?.[1] || '';

    return {
      teReo,
      pronunciation,
      culturalContext
    };
  }

  // Assessment and Rubric Generation
  async generateAssessmentRubric(subject: string, level: string, learningObjectives: string[]): Promise<string> {
    const systemPrompt = `You are an expert in New Zealand educational assessment and curriculum design.
    Create comprehensive assessment rubrics that align with NZ curriculum standards and cultural values.
    
    Focus on:
    - NZ curriculum achievement objectives
    - Cultural competency assessment
    - Authentic assessment methods
    - Clear success criteria
    - Cultural safety in assessment`;

    const userPrompt = `Create an assessment rubric for:
    Subject: ${subject}
    Level: ${level}
    Learning Objectives: ${learningObjectives.join(', ')}
    
    Include:
    1. Achievement criteria (Achieved/Merit/Excellence)
    2. Cultural competency indicators
    3. Assessment methods
    4. Success criteria
    5. Cultural safety considerations`;

    const response = await this.makeRequest({
      model: 'glm-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.6,
      max_tokens: 2500
    });

    return response.choices[0].message.content;
  }

  // Parent Communication Templates
  async generateParentCommunication(topic: string, context: string, culturalElements: string[]): Promise<string> {
    const systemPrompt = `You are an expert in respectful parent communication for New Zealand schools.
    Create culturally appropriate communication that respects whānau and maintains cultural safety.
    
    Guidelines:
    - Use respectful, inclusive language
    - Acknowledge cultural diversity
    - Provide clear, actionable information
    - Maintain cultural safety
    - Use appropriate cultural protocols`;

    const userPrompt = `Create parent communication for:
    Topic: ${topic}
    Context: ${context}
    Cultural Elements: ${culturalElements.join(', ')}
    
    Provide:
    1. Respectful greeting and acknowledgment
    2. Clear information about the topic
    3. Cultural considerations
    4. Next steps or actions
    5. Appropriate closing`;

    const response = await this.makeRequest({
      model: 'glm-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.choices[0].message.content;
  }

  // Get usage statistics
  getUsageStats(): {
    requestCount: number;
    totalTokens: number;
    isActive: boolean;
    apiKey: string;
  } {
    return {
      requestCount: this.requestCount,
      totalTokens: this.totalTokens,
      isActive: this.isActive,
      apiKey: this.apiKey.substring(0, 20) + '...'
    };
  }

  // Activate/Deactivate the integration
  setActive(active: boolean): void {
    this.isActive = active;
    console.log(`🌟 GLM Integration ${active ? 'activated' : 'deactivated'}`);
  }

  // Test the integration
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.makeRequest({
        model: 'glm-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Hello! Please respond with "GLM Integration Test Successful" to confirm the connection is working.' }
        ],
        temperature: 0.1,
        max_tokens: 50
      });

      const responseContent = response.choices[0].message.content;
      console.log(`🌟 GLM Test Response: ${responseContent}`);
      return responseContent.includes('GLM Integration Test Successful');
    } catch (error) {
      console.error('❌ GLM Test Failed:', error);
      return false;
    }
  }
}

// Singleton instance
export const glmIntegration = new GLMIntegration();

// Export for use in components
export default glmIntegration;
