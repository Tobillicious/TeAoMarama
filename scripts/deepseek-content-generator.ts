#!/usr/bin/env tsx

/**
 * DeepSeek Content Generator for TeAoMarama
 * Generates culturally-safe educational content with Kaitiaki oversight
 */

import axios from 'axios';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

interface DeepSeekRequest {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  max_tokens: number;
  temperature: number;
}

class DeepSeekAgent {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
    this.baseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
    this.model = process.env.DEEPSEEK_MODEL || 'deepseek-chat';

    if (!this.apiKey) {
      throw new Error('DEEPSEEK_API_KEY environment variable required');
    }
  }

  async generateContent(prompt: string, culturalContext: string): Promise<string> {
    const request: DeepSeekRequest = {
      model: this.model,
      messages: [
        {
          role: 'system',
          content: `You are a specialized educational content creator for Te Ao Māori education in Aotearoa New Zealand. 

CRITICAL CULTURAL SAFETY PROTOCOLS:
- Always include cultural context appropriately
- Use Te Reo Māori terminology correctly
- Respect tikanga Māori in all content
- Flag any cultural content for Kaitiaki review
- Follow New Zealand Curriculum guidelines
- Ensure cultural authenticity and safety

Context: ${culturalContext}`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/v1/chat/completions`,
        request,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('DeepSeek API Error:', error);
      throw error;
    }
  }

  async generateResource(
    type: 'handout' | 'lesson' | 'activity' | 'assessment',
    subject: string,
    yearLevel: string,
    topic: string
  ): Promise<void> {
    console.log(`🎯 Generating ${type} for ${subject} Year ${yearLevel}: ${topic}`);

    const culturalContext = `
This content is for ${yearLevel} ${subject} students in Aotearoa New Zealand.
Must align with New Zealand Curriculum.
Include appropriate cultural connections to Te Ao Māori.
Ensure content is culturally safe and authentic.
`;

    const prompt = `Create a ${type} for ${subject} Year ${yearLevel} on the topic: ${topic}

Requirements:
- Educationally sound and curriculum-aligned
- Culturally responsive and inclusive
- Age-appropriate for Year ${yearLevel}
- Include clear learning objectives
- Provide engaging activities
- Include assessment criteria if applicable
- Use accessible language
- Include Te Reo Māori where appropriate

Format as markdown with proper structure and headings.`;

    try {
      const content = await this.generateContent(prompt, culturalContext);
      
      // Create directory if it doesn't exist
      const baseDir = join(process.cwd(), 'migration', 'recovered_resources', 'deepseek-generated');
      if (!existsSync(baseDir)) {
        mkdirSync(baseDir, { recursive: true });
      }

      const filename = `${type}_${subject}_Y${yearLevel}_${topic.replace(/\s+/g, '_').toLowerCase()}.md`;
      const filepath = join(baseDir, filename);

      // Add metadata header
      const metadata = `---
title: "${topic} - Year ${yearLevel} ${subject}"
type: ${type}
subject: ${subject}
year_level: ${yearLevel}
generated_by: deepseek-agent
generated_at: ${new Date().toISOString()}
cultural_safety: pending_review
status: draft
---

`;

      writeFileSync(filepath, metadata + content);
      console.log(`✅ Generated: ${filepath}`);
      
      // Log to provenance system
      console.log(`[PROVENANCE] agent:deepseek: generated_resource {
  timestamp: '${new Date().toISOString()}',
  agent: 'agent:deepseek',
  action: 'generated_resource',
  context: {
    type: '${type}',
    subject: '${subject}',
    year_level: '${yearLevel}',
    topic: '${topic}',
    filepath: '${filepath}',
    cultural_safety: 'pending_review'
  }
}`);

    } catch (error) {
      console.error(`❌ Failed to generate ${type}:`, error);
    }
  }
}

// Main execution
async function main() {
  const agent = new DeepSeekAgent();
  
  console.log('🚀 DeepSeek Content Generator Starting...');
  console.log('🛡️ Cultural safety protocols active');
  
  // Generate a batch of educational content
  const contentQueue = [
    { type: 'handout', subject: 'Mathematics', yearLevel: '8', topic: 'Ratios and Proportions in Traditional Māori Architecture' },
    { type: 'lesson', subject: 'Science', yearLevel: '9', topic: 'Native Plant Adaptation in Aotearoa Ecosystems' },
    { type: 'activity', subject: 'Social Studies', yearLevel: '10', topic: 'Economic Systems in Pre-Colonial Aotearoa' },
    { type: 'handout', subject: 'English', yearLevel: '7', topic: 'Narrative Structure in Māori Pūrākau' },
    { type: 'assessment', subject: 'Mathematics', yearLevel: '9', topic: 'Statistics Using New Zealand Census Data' }
  ];

  for (const item of contentQueue) {
    await agent.generateResource(
      item.type as any,
      item.subject,
      item.yearLevel,
      item.topic
    );
    
    // Respect API rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('✅ DeepSeek content generation complete');
  console.log('📋 Next: Run npm run prebuild to index new resources');
}

if (require.main === module) {
  main().catch(console.error);
}

export { DeepSeekAgent };