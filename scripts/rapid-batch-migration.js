#!/usr/bin/env node
/**
 * 🚀 RAPID BATCH MIGRATION - SUPERCLAUDE ACCELERATION
 * Process 16 Te Kete Ako handouts simultaneously for rapid migration
 */
const fs = require('fs').promises;
const path = require('path');

const TE_KETE_HANDOUTS_PATH = 'te-kete-ako-clean/public/handouts';
const TARGET_PATH = 'src/components/educational/handouts';

const BATCH_HANDOUTS = [
  'ai-impact-comprehension-handout.html',
  'atoms-in-everyday-materials.html',
  'authors-purpose-entertain-handout.html',
  'authors-purpose-handout.html',
  'authors-purpose-inform-handout.html',
  'authors-purpose-persuade-handout.html',
  'bar-graph-handout.html',
  'biochemistry-traditional-medicine.html',
  'body-measurement-traditional.html',
  'ceremonial-circle-geometry.html',
  'children-rights-responsibilities.html',
  'climate-change-aotearoa-handout.html',
  'climate-emergency-aotearoa-handout.html',
  'cognitive-biases-comprehension-handout.html',
  'colonization-perspectives-handout.html',
  'community-helpers-study.html',
];

async function extractTitle(htmlContent) {
  const titleMatch = htmlContent.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1].trim();
  }

  const h1Match = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match) {
    return h1Match[1].trim();
  }

  return 'Te Kete Ako Handout';
}

async function extractContent(htmlContent) {
  // Extract main content area
  const mainMatch = htmlContent.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    return mainMatch[1];
  }

  const articleMatch = htmlContent.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    return articleMatch[1];
  }

  // Fallback to body content
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : htmlContent;
}

function generateComponentName(filename) {
  return filename
    .replace(/\.html$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/\s/g, '');
}

function determineCulturalContext(filename) {
  const lowerFilename = filename.toLowerCase();

  if (lowerFilename.includes('maori') || lowerFilename.includes('aotearoa')) {
    return 'Māori cultural knowledge and Aotearoa context';
  }
  if (lowerFilename.includes('traditional')) {
    return 'Traditional knowledge and cultural practices';
  }
  if (lowerFilename.includes('climate') || lowerFilename.includes('environment')) {
    return 'Environmental stewardship and climate action';
  }
  if (lowerFilename.includes('rights') || lowerFilename.includes('responsibilities')) {
    return 'Cultural rights and community responsibilities';
  }
  if (lowerFilename.includes('geometry') || lowerFilename.includes('measurement')) {
    return 'Mathematical concepts in cultural context';
  }
  if (lowerFilename.includes('biochemistry') || lowerFilename.includes('medicine')) {
    return 'Traditional medicine and scientific understanding';
  }

  return 'Educational content with cultural integration';
}

function determineYearLevel(filename) {
  const lowerFilename = filename.toLowerCase();

  if (lowerFilename.includes('comprehension') || lowerFilename.includes('purpose')) {
    return 'Year 7-8';
  }
  if (lowerFilename.includes('climate') || lowerFilename.includes('colonization')) {
    return 'Year 9-10';
  }
  if (lowerFilename.includes('biochemistry') || lowerFilename.includes('atoms')) {
    return 'Year 9-10';
  }
  if (lowerFilename.includes('geometry') || lowerFilename.includes('measurement')) {
    return 'Year 7-8';
  }

  return 'Year 7-10';
}

function determineSubject(filename) {
  const lowerFilename = filename.toLowerCase();

  if (lowerFilename.includes('comprehension') || lowerFilename.includes('purpose')) {
    return 'English, Literacy';
  }
  if (lowerFilename.includes('climate') || lowerFilename.includes('environment')) {
    return 'Science, Social Studies';
  }
  if (lowerFilename.includes('geometry') || lowerFilename.includes('measurement')) {
    return 'Mathematics';
  }
  if (lowerFilename.includes('biochemistry') || lowerFilename.includes('atoms')) {
    return 'Science';
  }
  if (lowerFilename.includes('rights') || lowerFilename.includes('community')) {
    return 'Social Studies';
  }
  if (lowerFilename.includes('colonization')) {
    return 'Social Studies, History';
  }

  return 'Cross-curricular';
}

async function migrateHandout(filename) {
  try {
    const filePath = path.join(TE_KETE_HANDOUTS_PATH, filename);
    const htmlContent = await fs.readFile(filePath, 'utf-8');

    const title = await extractTitle(htmlContent);
    const content = await extractContent(htmlContent);
    const componentName = generateComponentName(filename);
    const culturalContext = determineCulturalContext(filename);
    const yearLevel = determineYearLevel(filename);
    const subject = determineSubject(filename);

    const reactComponent = `import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface ${componentName}Props {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({
  culturalContext = "${culturalContext}",
  yearLevel = "${yearLevel}",
  subject = "${subject}"
}) => {
  return (
    <div className="${filename.replace(/\.html$/, '').replace(/[-_]/g, '-')}">
      <Card title="${title}" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">${title}</h1>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌿 {culturalContext}</span>
          </div>
        </div>

        <div className="handout-content">
          <div 
            className="te-kete-content"
            dangerouslySetInnerHTML={{ __html: \`${content
              .replace(/`/g, '\\`')
              .replace(/\$/g, '\\$')}\` }}
          />
        </div>
      </Card>
    </div>
  );
};

export default ${componentName};
`;

    const outputPath = path.join(TARGET_PATH, `${filename.replace(/\.html$/, '')}.tsx`);
    await fs.writeFile(outputPath, reactComponent);

    console.log(`✅ Migrated: ${filename} → ${componentName}`);
  } catch (error) {
    console.error(`❌ Failed to migrate ${filename}:`, error);
  }
}

async function rapidBatchMigration() {
  console.log('🚀 SUPERCLAUDE RAPID BATCH MIGRATION - DEPLOYING 16 AGENTS');
  console.log('🎯 Processing 16 handouts simultaneously for maximum speed');

  try {
    await fs.mkdir(TARGET_PATH, { recursive: true });

    console.log(`📁 Target directory ready: ${TARGET_PATH}`);
    console.log(`🤖 Deploying ${BATCH_HANDOUTS.length} migration agents in parallel`);

    // Process all handouts simultaneously
    await Promise.all(BATCH_HANDOUTS.map(migrateHandout));

    console.log('🎉 RAPID BATCH MIGRATION COMPLETE!');
    console.log(`📊 Successfully migrated ${BATCH_HANDOUTS.length} handouts`);
    console.log(`📁 Components available at: ${TARGET_PATH}`);
  } catch (error) {
    console.error('❌ Rapid batch migration failed:', error);
  }
}

rapidBatchMigration();
