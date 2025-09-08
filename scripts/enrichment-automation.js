#!/usr/bin/env node

/**
 * 🧠 KAITIAKI MIHARA - LESSON ENRICHMENT AUTOMATION
 *
 * This script implements Aronui's specification for enriching all lesson skeletons
 * into world-class, culturally-responsive educational resources.
 *
 * Based on: ENRICHMENT_AUTOMATION_SPEC.md
 * Created by: Kaitiaki Mihara (Technical Implementation)
 * Pedagogical Framework: Aronui (Lead Overseer)
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

// Configuration
const CONFIG = {
  lessonsDir: path.join(__dirname, '../src/content/lessons'),
  statusReportPath: path.join(__dirname, '../src/content/ENRICHMENT_STATUS_REPORT.md'),
  logPath: path.join(__dirname, '../enrichment_log.txt'),
  claudeApiKey: process.env.CLAUDE_API_KEY || 'your-claude-api-key-here',
  claudeApiUrl: 'https://api.anthropic.com/v1/messages',
  maxRetries: 3,
  retryDelay: 2000, // 2 seconds
  batchSize: 5, // Process 5 lessons at a time
  delayBetweenBatches: 1000, // 1 second between batches
};

// Agent role mapping based on Aronui's protocol
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

// Progress tracking
let progress = {
  total: 0,
  enriched: 0,
  failed: 0,
  skipped: 0,
  startTime: Date.now(),
};

/**
 * Generate the specialized agent prompt based on Aronui's template
 */
function generateAgentPrompt(lessonData) {
  const agentRole = AGENT_ROLES[lessonData.subject] || 'General_Kaitiaki';
  const agentShortName = agentRole.replace('_Kaitiaki', '');

  return `You are ${agentRole}, a world-class curriculum designer and subject matter expert for Mangakōtukutuku College in New Zealand. Your task is to enrich a skeleton lesson plan into a deep, culturally-responsive, and engaging learning experience.

**Your Persona (${agentRole}):**
- You have profound pedagogical content knowledge (PCK).
- You are an expert in the New Zealand Curriculum (NZC).
- You specialize in creating content that is deeply connected to the local culture and environment of Ngāti Kahungunu.
- You will follow the high-quality example set by the enriched lesson on "Te Awa o Mangakōtukutuku".

**Lesson Skeleton Details:**
- **Subject:** ${lessonData.subject}
- **Year Level:** ${lessonData.yearLevel}
- **Original Title:** ${lessonData.title}

**Your Task:**
Rewrite the provided JSON lesson skeleton. The new JSON must be a complete, valid JSON object and nothing else.

1. **\`title\`:** Create a new, evocative title in both English and Te Reo Māori that reflects the lesson's new, specific focus.
2. **\`culturalContext\`:** Make the context highly specific to Mangakōtukutuku College. Connect it to a local landmark, story, person, or environmental feature.
3. **\`learningObjectives\`:** Write 3-4 specific, measurable, and achievable learning objectives.
4. **\`activities\`:** Design a sequence of 4-5 detailed activities. Each activity must be an object with a \`title\` and a \`description\`. The activities should be practical, engaging, and culturally relevant.
5. **\`resources\`:** List at least 4 specific, real-world resources (e.g., local experts, websites, specific books, tools).
6. **\`assessment\`:** Describe a meaningful assessment task (summative or formative). This should be an object with \`type\` and \`tasks\` keys.
7. **\`nzcAlignment\`:** List specific, relevant strands and achievement objectives from the New Zealand Curriculum.
8. **Add Metadata:** Include \`"enrichedAt": "${new Date().toISOString()}"\` and \`"enrichedBy": "Aronui_${agentShortName}"\`.

**Output Format:**
You must respond with ONLY the raw, valid JSON object for the enriched lesson. Do not include any explanatory text, markdown formatting, or anything else outside of the JSON structure.

**Original JSON Skeleton to Enrich:**
${JSON.stringify(lessonData, null, 2)}`;
}

/**
 * Call Claude API to enrich lesson content
 */
async function enrichLessonWithClaude(lessonData) {
  const prompt = generateAgentPrompt(lessonData);

  const requestData = {
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  };

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': CONFIG.claudeApiKey,
    'anthropic-version': '2023-06-01',
  };

  for (let attempt = 1; attempt <= CONFIG.maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempting to enrich lesson: ${lessonData.title} (Attempt ${attempt})`);

      const response = await axios.post(CONFIG.claudeApiUrl, requestData, { headers });

      if (response.data && response.data.content && response.data.content[0]) {
        const enrichedContent = response.data.content[0].text;

        // Validate that the response is valid JSON
        try {
          const parsedContent = JSON.parse(enrichedContent);

          // Validate required fields
          if (
            parsedContent.title &&
            parsedContent.activities &&
            Array.isArray(parsedContent.activities)
          ) {
            console.log(`✅ Successfully enriched: ${lessonData.title}`);
            return parsedContent;
          } else {
            throw new Error('Invalid enriched content structure');
          }
        } catch (parseError) {
          throw new Error(`Invalid JSON response: ${parseError.message}`);
        }
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      console.log(`❌ Attempt ${attempt} failed for ${lessonData.title}: ${error.message}`);

      if (attempt === CONFIG.maxRetries) {
        throw error;
      }

      // Exponential backoff
      const delay = CONFIG.retryDelay * Math.pow(2, attempt - 1);
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * Log enrichment activity
 */
async function logActivity(message, type = 'INFO') {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${type}] ${message}\n`;

  try {
    await fs.appendFile(CONFIG.logPath, logEntry);
  } catch (error) {
    console.error('Failed to write to log file:', error.message);
  }

  console.log(`📝 ${logEntry.trim()}`);
}

/**
 * Update progress in status report
 */
async function updateStatusReport() {
  try {
    const statusContent = await fs.readFile(CONFIG.statusReportPath, 'utf8');

    // Update progress counters
    const updatedContent = statusContent
      .replace(
        /\|\| Mathematics \| \d+ \| \d+ \| [\d.]+% \|\|/,
        `|| Mathematics | 850 | ${progress.enriched} | ${((progress.enriched / 850) * 100).toFixed(
          1,
        )}% ||`,
      )
      .replace(
        /\|\| \*\*TOTAL\*\* \| \*\*5439\*\* \| \*\*\d+\*\* \| \*\*~[\d.]+%\*\* \|\|/,
        `|| **TOTAL** | **5439** | **${progress.enriched}** | **~${(
          (progress.enriched / 5439) *
          100
        ).toFixed(2)}%** ||`,
      )
      .replace(
        /\*\*Last Updated:\*\* \{\{CURRENT_DATE\}\}/,
        `**Last Updated:** ${new Date().toISOString()}`,
      );

    await fs.writeFile(CONFIG.statusReportPath, updatedContent);
    console.log(`📊 Updated status report: ${progress.enriched}/${progress.total} enriched`);
  } catch (error) {
    console.error('Failed to update status report:', error.message);
  }
}

/**
 * Process a single lesson file
 */
async function processLessonFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const lessonData = JSON.parse(fileContent);

    // Skip if already enriched
    if (lessonData.enrichedAt) {
      progress.skipped++;
      console.log(`⏭️  Skipping already enriched lesson: ${lessonData.title}`);
      return;
    }

    // Enrich the lesson
    const enrichedLesson = await enrichLessonWithClaude(lessonData);

    // Write enriched content back to file
    await fs.writeFile(filePath, JSON.stringify(enrichedLesson, null, 2));

    progress.enriched++;
    await logActivity(`Successfully enriched: ${lessonData.title}`, 'SUCCESS');
  } catch (error) {
    progress.failed++;
    await logActivity(`Failed to enrich lesson: ${error.message}`, 'ERROR');
    console.error(`❌ Failed to process ${filePath}:`, error.message);
  }
}

/**
 * Get all lesson files that need enrichment
 */
async function getLessonFiles() {
  try {
    const files = await fs.readdir(CONFIG.lessonsDir);
    const lessonFiles = files
      .filter((file) => file.endsWith('.json') && file !== 'index.json')
      .map((file) => path.join(CONFIG.lessonsDir, file));

    progress.total = lessonFiles.length;
    console.log(`📚 Found ${lessonFiles.length} lesson files to process`);

    return lessonFiles;
  } catch (error) {
    console.error('Failed to read lessons directory:', error.message);
    throw error;
  }
}

/**
 * Main enrichment process
 */
async function main() {
  console.log('🚀 KAITIAKI MIHARA - LESSON ENRICHMENT AUTOMATION');
  console.log("📋 Based on Aronui's pedagogical framework");
  console.log('='.repeat(60));

  try {
    // Initialize log file
    await fs.writeFile(CONFIG.logPath, `Enrichment Log - Started at ${new Date().toISOString()}\n`);

    // Get all lesson files
    const lessonFiles = await getLessonFiles();

    if (lessonFiles.length === 0) {
      console.log('✅ No lessons found to enrich!');
      return;
    }

    // Process lessons in batches
    for (let i = 0; i < lessonFiles.length; i += CONFIG.batchSize) {
      const batch = lessonFiles.slice(i, i + CONFIG.batchSize);

      console.log(
        `\n📦 Processing batch ${Math.floor(i / CONFIG.batchSize) + 1}/${Math.ceil(
          lessonFiles.length / CONFIG.batchSize,
        )}`,
      );

      // Process batch in parallel
      await Promise.all(batch.map((file) => processLessonFile(file)));

      // Update progress
      await updateStatusReport();

      // Delay between batches to avoid rate limiting
      if (i + CONFIG.batchSize < lessonFiles.length) {
        console.log(`⏳ Waiting ${CONFIG.delayBetweenBatches}ms before next batch...`);
        await new Promise((resolve) => setTimeout(resolve, CONFIG.delayBetweenBatches));
      }
    }

    // Final summary
    const duration = (Date.now() - progress.startTime) / 1000;
    console.log('\n' + '='.repeat(60));
    console.log('🎉 ENRICHMENT COMPLETE!');
    console.log(
      `📊 Total: ${progress.total} | Enriched: ${progress.enriched} | Failed: ${progress.failed} | Skipped: ${progress.skipped}`,
    );
    console.log(`⏱️  Duration: ${Math.round(duration)}s`);
    console.log(
      `📈 Success Rate: ${((progress.enriched / (progress.total - progress.skipped)) * 100).toFixed(
        1,
      )}%`,
    );

    await logActivity(
      `Enrichment completed. Total: ${progress.total}, Enriched: ${progress.enriched}, Failed: ${progress.failed}, Skipped: ${progress.skipped}`,
      'SUCCESS',
    );
  } catch (error) {
    console.error('💥 Fatal error in enrichment process:', error.message);
    await logActivity(`Fatal error: ${error.message}`, 'FATAL');
    process.exit(1);
  }
}

// Run the enrichment process
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, processLessonFile, generateAgentPrompt };
