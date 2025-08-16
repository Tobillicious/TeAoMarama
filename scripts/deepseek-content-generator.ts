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

    const prompt = `Create a DEPTH-FOCUSED ${type} for ${subject} Year ${yearLevel} on the topic: ${topic}

CRITICAL: IMPLEMENT DEPTH OVER BREADTH PARADIGM
- Create DEEP understanding rather than surface coverage
- Build on previous learning with explicit connections
- Design for spiral curriculum - students will return to this concept multiple times
- Focus on WHY concepts matter, not just WHAT they are
- Create transfer opportunities to other domains
- Use cultural knowledge as deep anchor points

Requirements:
- DEPTH: Progressive complexity building on solid foundations
- CONNECTIONS: Explicit links to previous learning and future applications
- TRANSFER: Applications across contexts and domains
- CULTURAL ANCHORS: Deep connections to Māori worldview and practices
- SPIRAL DESIGN: Prepare for students to revisit this at higher levels
- UNDERSTANDING: Focus on conceptual grasp over memorization
- Age-appropriate for Year ${yearLevel} with extension challenges

Include:
- "Previous Learning Connections" section
- "Deep Investigation" core activities
- "Transfer Challenges" for applying understanding
- "Future Learning Pathways" showing where this leads
- "Cultural Wisdom Connections" section
- Assessment focused on understanding transfer

Format as markdown with depth-focused structure.`;

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

// Run main if called directly
main().catch(console.error);

export { DeepSeekAgent };