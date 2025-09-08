// enrichment-engine.mjs
// The engine for transforming our educational resources, guided by Aronui's vision.

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Replicate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const LESSONS_DIR = path.join(__dirname, 'src', 'content', 'lessons');
const STATUS_REPORT_PATH = path.join(__dirname, 'src', 'content', 'ENRICHMENT_STATUS_REPORT.md');
const LOG_FILE_PATH = path.join(__dirname, 'enrichment_log.txt');
const INDEX_FILE_NAME = 'index.json';

// --- AGENT PERSONAS (from ARONUI_AGENT_HIRING_PROTOCOL.md) ---
const AGENT_ROLES = {
    'Mathematics': 'Pāngarau_Kaitiaki',
    'Science': 'Pūtaiao_Kaitiaki',
    'English': 'Te_Reo_Pākehā_Kaitiaki',
    'Social Studies': 'Tikanga-ā-Iwi_Kaitiaki',
    'Te Reo Māori': 'Te_Reo_Māori_Kaitiaki',
    'Technology': 'Hangarau_Kaitiaki',
    'The Arts': 'Toi_Kaitiaki',
    'Health & Physical Education': 'Hauora_Kaitiaki',
    // Add other subjects as needed
};

/**
 * Logs a message to both the console and the log file.
 * @param {string} message The message to log.
 */
async function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}
`;
    console.log(logMessage.trim());
    await fs.appendFile(LOG_FILE_PATH, logMessage);
}

/**
 * Identifies all lesson files that have not yet been enriched.
 * @returns {Promise<string[]>} A list of absolute paths to unenriched lesson files.
 */
async function identifyTargetFiles() {
    await log('Starting identification of target files...');
    const allFiles = await fs.readdir(LESSONS_DIR);
    const lessonFiles = allFiles.filter(file => file.endsWith('.json') && file !== INDEX_FILE_NAME);
    await log(`Found ${lessonFiles.length} total lesson files.`);

    const unenrichedFiles = [];
    for (const file of lessonFiles) {
        const filePath = path.join(LESSONS_DIR, file);
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(content);
            if (!data.enrichedAt) {
                unenrichedFiles.push(filePath);
            }
        } catch (error) {
            await log(`ERROR: Could not read or parse ${file}. Skipping. Error: ${error.message}`);
        }
    }

    await log(`Identified ${unenrichedFiles.length} files to be enriched.`);
    return unenrichedFiles;
}

const PROMPT_TEMPLATE_PATH = path.join(__dirname, 'prompt-template.txt');
let promptTemplate = ''; // Cache the template

/**
 * Generates a detailed prompt for the LLM based on the lesson skeleton.
 * @param {object} lessonData The parsed JSON data of the lesson skeleton.
 * @returns {Promise<string>} The generated prompt.
 */
async function generateEnrichmentPrompt(lessonData) {
    // Read and cache the template file if not already done
    if (!promptTemplate) {
        try {
            promptTemplate = await fs.readFile(PROMPT_TEMPLATE_PATH, 'utf-8');
        } catch (error) {
            await log(`FATAL ERROR: Could not read prompt template file at ${PROMPT_TEMPLATE_PATH}.`);
            throw error; // Stop execution if the template is missing
        }
    }

    const agentRole = AGENT_ROLES[lessonData.subject] || 'Kaitiaki';
    const agentRoleShortName = agentRole.split('_')[0];
    const currentTimestamp = new Date().toISOString();

    // Replace all placeholders
    let finalPrompt = promptTemplate
        .replace(/{AGENT_ROLE}/g, agentRole)
        .replace(/{SUBJECT}/g, lessonData.subject)
        .replace(/{YEAR_LEVEL}/g, lessonData.yearLevel)
        .replace(/{TITLE}/g, lessonData.title)
        .replace(/{CURRENT_ISO_TIMESTAMP}/g, currentTimestamp)
        .replace(/{AGENT_ROLE_SHORTNAME}/g, agentRoleShortName)
        .replace(/{ORIGINAL_JSON_CONTENT}/g, JSON.stringify(lessonData));

    return finalPrompt;
}




/**
 * Calls the LLM API to get the enriched lesson content.
 * @param {string} prompt The prompt to send to the LLM.
 * @returns {Promise<object|null>} The enriched lesson data as a JSON object, or null on failure.
 */
async function getEnrichedContentFromLLM(prompt) {
    // This function will be implemented later.
    // It will handle the API call, validation, and error handling.
    await log('Placeholder: Calling LLM API...');
    return null; // Placeholder
}

/**
 * Updates the progress in the status report markdown file.
 * @param {string} subject The subject of the enriched lesson.
 */
async function updateStatusReport(subject) {
    // This function will be implemented later.
    // It will read the markdown file, update the counters, and write it back.
    await log(`Placeholder: Updating status report for ${subject}.`);
}


/**
 * Main orchestration function.
 */
async function main() {
    await log('--- Aronui Enrichment Engine: Activated ---');
    const targetFiles = await identifyTargetFiles();

    if (targetFiles.length === 0) {
        await log('No files to enrich. Mission complete for now.');
        return;
    }

    // Loop through each file and process it (currently a placeholder loop)
    for (const filePath of targetFiles.slice(0, 1)) { // Process only the first file for now as a test
        await log(`--- Processing: ${path.basename(filePath)} ---`);
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const lessonData = JSON.parse(fileContent);

            const prompt = await generateEnrichmentPrompt(lessonData);
            // For now, we'll just log the generated prompt
            await log(`Generated Prompt:
---
${prompt}
---`);

            const enrichedContent = await getEnrichedContentFromLLM(prompt);

            if (enrichedContent) {
                // Overwrite the file with enriched content (to be implemented)
                // await fs.writeFile(filePath, JSON.stringify(enrichedContent, null, 2));
                // await log(`Successfully enriched and saved ${path.basename(filePath)}`);
                // await updateStatusReport(lessonData.subject);
            } else {
                await log(`Failed to get enriched content for ${path.basename(filePath)}. Skipping.`);
            }

        } catch (error) {
            await log(`FATAL ERROR processing ${path.basename(filePath)}: ${error.message}`);
        }
    }

    await log('--- Aronui Enrichment Engine: Cycle Complete ---');
}

main().catch(err => {
    console.error("An unexpected error occurred:", err);
    log(`CRITICAL FAILURE: The engine has stopped unexpectedly. Error: ${err.message}`);
});
