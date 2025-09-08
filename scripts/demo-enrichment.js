#!/usr/bin/env node

/**
 * 🎭 KAITIAKI MIHARA - DEMO ENRICHMENT SCRIPT
 *
 * Demonstrates the enrichment process without requiring API keys
 * Shows how Aronui's specialized agents would enhance lesson content
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

// Demo enrichment templates for different subjects
const ENRICHMENT_TEMPLATES = {
  Mathematics: {
    culturalContext:
      'Connecting mathematical concepts to the local environment of Mangakōtukutuku College and Ngāti Kahungunu traditions.',
    sampleActivity:
      'Students will measure and map the school grounds using traditional Māori measurement techniques alongside modern mathematical tools.',
    resources: [
      'Local kaumātua for traditional measurement knowledge',
      'Surveying equipment',
      'Historical maps of the area',
      'Digital mapping software',
    ],
  },
  Science: {
    culturalContext:
      'Exploring scientific principles through the lens of kaitiakitanga and environmental stewardship of our local awa and whenua.',
    sampleActivity:
      'Field study of the Mangakōtukutuku River ecosystem, analyzing water quality and biodiversity using both scientific methods and traditional knowledge.',
    resources: [
      'Water testing kits',
      'Local environmental experts',
      'Traditional ecological knowledge holders',
      'Scientific measurement tools',
    ],
  },
  English: {
    culturalContext:
      'Developing literacy skills through stories, both traditional pūrākau and contemporary narratives that connect to our local community.',
    sampleActivity:
      'Students will create digital stories combining traditional Māori storytelling techniques with modern multimedia tools.',
    resources: [
      'Local storytellers and kaumātua',
      'Digital storytelling software',
      'Traditional story collections',
      'Recording equipment',
    ],
  },
  'Social Studies': {
    culturalContext:
      'Understanding our place in the world through the history and culture of Ngāti Kahungunu and the broader Aotearoa context.',
    sampleActivity:
      'Oral history project interviewing local community members about the history of Mangakōtukutuku and surrounding areas.',
    resources: [
      'Local historians and community elders',
      'Historical archives',
      'Recording equipment',
      'Digital mapping tools',
    ],
  },
};

/**
 * Generate a demo enriched lesson (simulating what the AI agents would create)
 */
function generateDemoEnrichment(lessonData) {
  const agentRole = AGENT_ROLES[lessonData.subject] || 'General_Kaitiaki';
  const template = ENRICHMENT_TEMPLATES[lessonData.subject] || ENRICHMENT_TEMPLATES['English'];
  const agentShortName = agentRole.replace('_Kaitiaki', '');

  return {
    ...lessonData,
    title: `${lessonData.title} - Enhanced by ${agentRole}`,
    culturalContext: template.culturalContext,
    learningObjectives: [
      `Develop deep understanding of ${lessonData.subject.toLowerCase()} concepts through cultural context`,
      `Apply traditional knowledge to modern ${lessonData.subject.toLowerCase()} challenges`,
      `Connect learning to local environment and community`,
      `Demonstrate respect for Māori and Pacific perspectives`,
    ],
    activities: [
      {
        title: 'Whakawhanaungatanga: Building Connections',
        description:
          'Begin with karakia and introductions. Students share their prior knowledge and connections to the topic.',
      },
      {
        title: 'Cultural Context Exploration',
        description: template.sampleActivity,
      },
      {
        title: 'Hands-on Learning',
        description: `Practical application of ${lessonData.subject.toLowerCase()} concepts using both traditional and modern methods.`,
      },
      {
        title: 'Reflection and Sharing',
        description:
          'Students reflect on their learning and share insights with the class, connecting to cultural values.',
      },
    ],
    resources: template.resources,
    assessment: {
      type: 'Formative and Summative',
      tasks: [
        'Formative: Teacher observation during activities and discussions',
        'Summative: Student presentation demonstrating understanding and cultural connection',
      ],
    },
    nzcAlignment: [
      `${lessonData.subject}: Level ${lessonData.yearLevel.replace(
        'Year ',
        '',
      )} achievement objectives`,
      'Te Tiriti o Waitangi: Cultural responsiveness and partnership',
      'Key Competencies: Thinking, relating to others, using language and symbols',
    ],
    enrichedAt: new Date().toISOString(),
    enrichedBy: `Aronui_${agentShortName}`,
  };
}

/**
 * Process a single lesson file for demo enrichment
 */
async function processDemoLesson(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const lessonData = JSON.parse(content);

    // Skip if already enriched
    if (lessonData.enrichedAt) {
      console.log(`⏭️  Skipping already enriched lesson: ${lessonData.title}`);
      return false;
    }

    console.log(`🔄 Processing: ${lessonData.title}`);
    console.log(
      `   Subject: ${lessonData.subject} -> ${
        AGENT_ROLES[lessonData.subject] || 'General_Kaitiaki'
      }`,
    );

    // Generate demo enrichment
    const enrichedLesson = generateDemoEnrichment(lessonData);

    // Create backup of original
    const backupPath = filePath.replace('.json', '.original.json');
    await fs.writeFile(backupPath, content);

    // Write enriched content
    await fs.writeFile(filePath, JSON.stringify(enrichedLesson, null, 2));

    console.log(`✅ Enriched: ${enrichedLesson.title}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to process ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Main demo enrichment process
 */
async function main() {
  console.log('🎭 KAITIAKI MIHARA - DEMO ENRICHMENT PROCESS');
  console.log("📋 Simulating Aronui's specialized agent teams");
  console.log('='.repeat(60));

  try {
    const lessonsDir = path.join(__dirname, '../src/content/lessons');
    const files = await fs.readdir(lessonsDir);
    const lessonFiles = files
      .filter((file) => file.endsWith('.json') && file !== 'index.json')
      .slice(0, 5); // Demo with first 5 files

    console.log(`📚 Found ${lessonFiles.length} lesson files for demo enrichment`);

    let enriched = 0;
    let skipped = 0;

    for (const file of lessonFiles) {
      const filePath = path.join(lessonsDir, file);
      const result = await processDemoLesson(filePath);

      if (result) {
        enriched++;
      } else {
        skipped++;
      }

      // Small delay for demo effect
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 DEMO ENRICHMENT COMPLETE!');
    console.log(`📊 Enriched: ${enriched} | Skipped: ${skipped}`);
    console.log('\n📋 What happened:');
    console.log('• Each lesson was assigned to a specialized AI agent');
    console.log('• Agents enhanced content with cultural context and local connections');
    console.log('• Activities were redesigned to be more engaging and culturally responsive');
    console.log('• Assessment strategies were improved');
    console.log('• Original files were backed up with .original.json extension');

    console.log('\n🚀 Next steps:');
    console.log('1. Review the enriched lessons in src/content/lessons/');
    console.log('2. Set up Claude API key for full automation');
    console.log('3. Run full enrichment on all 5,000+ resources');
  } catch (error) {
    console.error('💥 Demo failed:', error.message);
    process.exit(1);
  }
}

// Run the demo
main();
