#!/usr/bin/env node

/**
 * 🧪 KAITIAKI MIHARA - ENRICHMENT TEST SCRIPT
 *
 * Test the enrichment automation with a small sample of lessons
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Agent role mapping (from Aronui's protocol)
const AGENT_ROLES = {
  Mathematics: 'Pāngarau_Kaitiaki',
  Science: 'Pūtaiao_Kaitiaki',
  English: 'Te Reo Pākehā_Kaitiaki',
  'Social Studies': 'Tikanga-ā-Iwi_Kaitiaki',
  'Te Reo Māori': 'Te Reo Māori_Kaitiaki',
  Art: 'Toi_Kaitiaki',
  Technology: 'Hangarau_Kaitiaki',
  'Physical Education': 'Hauora_Kaitiaki',
  Health: 'Hauora_Kaitiaki',
};

async function testEnrichment() {
  console.log('🧪 Testing Lesson Enrichment Automation');
  console.log('='.repeat(50));

  try {
    // Find a few unenriched lesson files
    const lessonsDir = path.join(__dirname, '../src/content/lessons');
    const files = await fs.readdir(lessonsDir);
    const lessonFiles = files
      .filter((file) => file.endsWith('.json') && file !== 'index.json')
      .slice(0, 3); // Test with first 3 files

    console.log(`📚 Found ${lessonFiles.length} test files:`, lessonFiles);

    for (const file of lessonFiles) {
      const filePath = path.join(lessonsDir, file);

      try {
        // Read the lesson data
        const content = await fs.readFile(filePath, 'utf8');
        const lessonData = JSON.parse(content);

        console.log(`\n📖 Testing lesson: ${lessonData.title}`);
        console.log(`   Subject: ${lessonData.subject}`);
        console.log(`   Year Level: ${lessonData.yearLevel}`);
        console.log(`   Already enriched: ${!!lessonData.enrichedAt}`);

        // Show agent role mapping
        const agentRole = AGENT_ROLES[lessonData.subject] || 'General_Kaitiaki';
        console.log(`   Agent role: ${lessonData.subject} -> ${agentRole}`);

        // Show lesson structure
        console.log(`   Has activities: ${Array.isArray(lessonData.activities)}`);
        console.log(`   Has resources: ${Array.isArray(lessonData.resources)}`);
        console.log(`   Has assessment: ${typeof lessonData.assessment === 'object'}`);

        // Show sample content
        if (lessonData.activities && lessonData.activities.length > 0) {
          console.log(`   Sample activity: ${lessonData.activities[0].title || 'Untitled'}`);
        }
      } catch (error) {
        console.error(`❌ Error testing ${file}:`, error.message);
      }
    }

    console.log('\n✅ Test completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Set your CLAUDE_API_KEY environment variable');
    console.log('2. Run: node scripts/enrichment-automation.js');
    console.log('3. Monitor progress in enrichment_log.txt');
  } catch (error) {
    console.error('💥 Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testEnrichment();
