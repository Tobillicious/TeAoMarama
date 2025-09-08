/**
 * 🧠 KAITIAKI MIHARA - ENRICHMENT CONFIGURATION
 *
 * Configuration settings for the lesson enrichment automation
 */

module.exports = {
  // API Configuration
  claudeApiKey: process.env.CLAUDE_API_KEY || 'your-claude-api-key-here',
  claudeApiUrl: 'https://api.anthropic.com/v1/messages',

  // Processing Settings
  maxRetries: parseInt(process.env.ENRICHMENT_MAX_RETRIES) || 3,
  retryDelay: parseInt(process.env.ENRICHMENT_DELAY) || 2000,
  batchSize: parseInt(process.env.ENRICHMENT_BATCH_SIZE) || 5,
  delayBetweenBatches: 1000,

  // File Paths
  lessonsDir: 'src/content/lessons',
  statusReportPath: 'src/content/ENRICHMENT_STATUS_REPORT.md',
  logPath: 'enrichment_log.txt',

  // Agent Role Mapping (from Aronui's protocol)
  agentRoles: {
    Mathematics: 'Pāngarau_Kaitiaki',
    Science: 'Pūtaiao_Kaitiaki',
    English: 'Te Reo Pākehā_Kaitiaki',
    'Social Studies': 'Tikanga-ā-Iwi_Kaitiaki',
    'Te Reo Māori': 'Te Reo Māori_Kaitiaki',
    Art: 'Toi_Kaitiaki',
    Technology: 'Hangarau_Kaitiaki',
    'Physical Education': 'Hauora_Kaitiaki',
    Health: 'Hauora_Kaitiaki',
  },
};
