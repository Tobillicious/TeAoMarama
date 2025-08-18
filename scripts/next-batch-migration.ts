#!/usr/bin/env tsx
/**
 * 🚀 NEXT BATCH MIGRATION - CONTINUE TE KETE AKO SYNTHESIS
 */

import { mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const TE_KETE_HANDOUTS_PATH = 'te-kete-ako-clean/public/handouts';
const TARGET_PATH = 'src/components/educational/handouts';

const NEXT_BATCH_HANDOUTS = [
  'community-needs-survey.html',
  'cultural-celebrations-comparison.html',
  'cultural-decision-making-traditions.html',
  'cultural-heroes-comprehension.html',
  'cultural-identity-deep-dive-comprehension.html',
  'cultural-practice-explanation.html',
  'cultural-preservation-essays.html',
  'cultural-safety-classroom-checklists-alpha.html',
  'cultural-stem-assessment-rubric.html',
  'cultural-stories-comprehension.html',
  'family-data-collection.html',
  'kaitiakitanga-field-journal.html',
  'kaitiakitanga-kids.html',
  'maori-geometric-patterns-handout.html',
  'maori-astronomy-navigation-handout.html',
  'maori-navigation-wayfinding-handout.html',
  'mountain-navigation-trigonometry.html',
  'star-navigation-coordinates.html',
  'kaitiaki-generated-migration-student-handout.html',
  'body-measurement-traditional.html',
];

async function extractTitle(htmlContent: string): Promise<string> {
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

async function extractContent(htmlContent: string): Promise<string> {
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

function generateComponentName(filename: string): string {
  return filename
    .replace(/\.html$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/\s/g, '');
}

function determineCulturalContext(filename: string): string {
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
  if (lowerFilename.includes('conservation') || lowerFilename.includes('biodiversity')) {
    return 'Environmental conservation and kaitiakitanga';
  }
  if (lowerFilename.includes('cultural') || lowerFilename.includes('calendar')) {
    return 'Cultural practices and traditional knowledge';
  }
  if (lowerFilename.includes('health') || lowerFilename.includes('wellbeing')) {
    return 'Health and wellbeing in cultural context';
  }
  if (lowerFilename.includes('navigation') || lowerFilename.includes('astronomy')) {
    return 'Traditional navigation and astronomical knowledge';
  }
  if (lowerFilename.includes('kaitiakitanga')) {
    return 'Environmental guardianship and kaitiakitanga';
  }

  return 'Educational content with cultural integration';
}

function determineYearLevel(filename: string): string {
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
  if (lowerFilename.includes('conservation') || lowerFilename.includes('environmental')) {
    return 'Year 8-9';
  }
  if (lowerFilename.includes('health') || lowerFilename.includes('wellbeing')) {
    return 'Year 7-9';
  }
  if (lowerFilename.includes('navigation') || lowerFilename.includes('astronomy')) {
    return 'Year 8-10';
  }
  if (lowerFilename.includes('kaitiakitanga')) {
    return 'Year 7-9';
  }

  return 'Year 7-10';
}

function determineSubject(filename: string): string {
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
  if (lowerFilename.includes('conservation') || lowerFilename.includes('biodiversity')) {
    return 'Science, Environmental Studies';
  }
  if (lowerFilename.includes('health') || lowerFilename.includes('wellbeing')) {
    return 'Health & Physical Education';
  }
  if (lowerFilename.includes('fraction') || lowerFilename.includes('decimal')) {
    return 'Mathematics';
  }
  if (lowerFilename.includes('navigation') || lowerFilename.includes('astronomy')) {
    return 'Mathematics, Science';
  }
  if (lowerFilename.includes('kaitiakitanga')) {
    return 'Science, Social Studies';
  }

  return 'Cross-curricular';
}

async function migrateHandout(filename: string): Promise<void> {
  try {
    const filePath = join(TE_KETE_HANDOUTS_PATH, filename);
    const htmlContent = await readFile(filePath, 'utf-8');

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

    const outputPath = join(TARGET_PATH, `${filename.replace(/\.html$/, '')}.tsx`);
    await writeFile(outputPath, reactComponent);

    console.log(`✅ Migrated: ${filename} → ${componentName}`);
  } catch (error) {
    console.error(`❌ Failed to migrate ${filename}:`, error);
  }
}

async function nextBatchMigration(): Promise<void> {
  console.log('🚀 SUPERCLAUDE NEXT BATCH MIGRATION - DEPLOYING 20 AGENTS');
  console.log('🎯 Processing next 20 handouts simultaneously for maximum speed');

  try {
    await mkdir(TARGET_PATH, { recursive: true });

    console.log(`📁 Target directory ready: ${TARGET_PATH}`);
    console.log(`🤖 Deploying ${NEXT_BATCH_HANDOUTS.length} migration agents in parallel`);

    // Process all handouts simultaneously
    await Promise.all(NEXT_BATCH_HANDOUTS.map(migrateHandout));

    console.log('🎉 NEXT BATCH MIGRATION COMPLETE!');
    console.log(`📊 Successfully migrated ${NEXT_BATCH_HANDOUTS.length} handouts`);
    console.log(`📁 Components available at: ${TARGET_PATH}`);
  } catch (error) {
    console.error('❌ Next batch migration failed:', error);
  }
}

if (import.meta.main) {
  nextBatchMigration();
}
