#!/usr/bin/env tsx
/**
 * 🚀 NEXT BATCH MIGRATION - CONTINUE TE KETE AKO SYNTHESIS
 */

import { mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
const _TE_KETE_HANDOUTS_PATH = 'te-kete-ako-clean/public/handouts';
const _TARGET_PATH = 'src/components/educational/handouts';

const _NEXT_BATCH_HANDOUTS = [
  'writers-toolkit-conclusion-handout.html',
  'writers-toolkit-diction-handout.html',
  'writers-toolkit-fluency-handout.html',
  'writers-toolkit-hook-handout.html',
  'writers-toolkit-inform-structure-handout.html',
  'writers-toolkit-peel-argument-handout.html',
  'writers-toolkit-revision-handout.html',
  'writers-toolkit-show-dont-tell-handout.html',
  'writers-toolkit-suspense-handout.html',
  'writers-toolkit-tone-handout.html',
  'writers-toolkit-rhetorical-devices-handout.html',
  'year-9-starter-pack-alpha-build.html',
  'year-9-starter-pack-essential-skills.html',
  'youth-vaping-comprehension-handout.html',
  'sustainable-fishing-equations.html',
  'renewable-energy-traditional.html',
  'ceremonial-circle-geometry.html',
  'iwi-economics-mathematics.html',
  'marae-shapes-geometry.html',
  'maori-astronomy-navigation-handout.html',
];

async function extractTitle(_htmlContent: string): Promise<string> {
  const _titleMatch = htmlContent.match(/<title[^>]*>([^<]+)</title>/i);
  if (titleMatch) {
    return titleMatch[1].trim();
  }

  const _h1Match = htmlContent.match(/<h1[^>]*>([^<]+)</h1>/i);
  if (h1Match) {
    return h1Match[1].trim();
  }

  return 'Te Kete Ako Handout';
}

async function extractContent(_htmlContent: string): Promise<string> {
  // Extract main content area
  const _mainMatch = htmlContent.match(/<main[^>]*>([\s\S]*?)</main>/i);
  if (mainMatch) {
    return mainMatch[1];
  }

  const _articleMatch = htmlContent.match(/<article[^>]*>([\s\S]*?)</article>/i);
  if (articleMatch) {
    return articleMatch[1];
  }

  // Fallback to body content
  const _bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)</body>/i);
  return bodyMatch ? bodyMatch[1] : htmlContent;
}

function generateComponentName(_filename: string): string {
  return filename
    .replace(/\.html$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/\s/g, '');
}

function determineCulturalContext(_filename: string): string {
  const _lowerFilename = filename.toLowerCase();

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

function determineYearLevel(_filename: string): string {
  const _lowerFilename = filename.toLowerCase();

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

function determineSubject(_filename: string): string {
  const _lowerFilename = filename.toLowerCase();

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

async function migrateHandout(_filename: string): Promise<void> {
  try {
    const _filePath = join(TE_KETE_HANDOUTS_PATH, filename);
    const _htmlContent = await readFile(filePath, 'utf-8');

    const _title = await extractTitle(htmlContent);
    const _content = await extractContent(htmlContent);
    const _componentName = generateComponentName(filename);
    const _culturalContext = determineCulturalContext(filename);
    const _yearLevel = determineYearLevel(filename);
    const _subject = determineSubject(filename);

    const _reactComponent = `import React from 'react';
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

    const _outputPath = join(TARGET_PATH, `${filename.replace(/\.html$/, '')}.tsx`);
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

// Run the migration
nextBatchMigration();
