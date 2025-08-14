const fs = require('fs');
const path = require('path');
const { validateAndEnrichContent } = require('./content-validation-pipeline.ts');

async function runValidation() {
  console.log('🚀 Starting content validation process...');

  // 1. Read the markdown file
  const filePath = path.join(__dirname, 'recovered_resources/handouts/Y8_Fractions_Real_Life.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // 2. Parse the content to create a ContentItem
  // This is a simplified parser for this specific file format
  const lines = fileContent.split('\n');
  const title = lines.find(line => line.startsWith('# ')).replace('# ', '');
  const yearLine = lines.find(line => line.startsWith('- Year level:'));
  const yearLevel = yearLine ? [parseInt(yearLine.match(/\d+/)[0])] : [];
  const subjectLine = lines.find(line => line.includes('Maths'));
  const subject = subjectLine ? 'Mathematics' : 'Unknown';

  const contentItem = {
    id: 'Y8_Fractions_Real_Life_Handout',
    type: 'handout',
    title: title,
    content: fileContent,
    source: 'teketeako_migration',
    curriculum_alignment: ['NZC2007-M-L4-NA-1', 'SM-L4-Fractions-1'], // Example alignment
    year_level: yearLevel,
    subject: subject,
  };

  console.log(`📄 Created ContentItem: "${contentItem.title}"`);

  // 3. Execute the validation and enrichment pipeline
  try {
    const { validationResult, enrichedItem } = await validateAndEnrichContent(contentItem);

    // 4. Print the results
    console.log('\n--- VALIDATION RESULTS ---');
    console.log(JSON.stringify(validationResult, null, 2));
    console.log('\n--- END OF REPORT ---');

  } catch (error) {
    console.error('An error occurred during validation:', error);
  }
}

if (require.main === module) {
  runValidation();
}
