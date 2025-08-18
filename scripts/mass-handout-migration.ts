#!/usr/bin/env tsx
/**
 * MASS HANDOUT MIGRATION SYSTEM
 * Deploy 40 agents to migrate 140+ Te Kete Ako handouts
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';

interface HandoutData {
  filename: string;
  title: string;
  content: string;
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const TE_KETE_HANDOUTS_PATH = '/Users/admin/gemini-react-app/te-kete-ako-clean/public/handouts/';
const TARGET_PATH = '/Users/admin/gemini-react-app/src/components/educational/handouts/';

async function extractHandoutMetadata(htmlContent: string): Promise<Partial<HandoutData>> {
  // Extract title from h1 or h2 tags
  const titleMatch = htmlContent.match(/<h[12][^>]*>([^<]+)<\/h[12]>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Extract year level from content
  const yearMatch = htmlContent.match(/Year?\s*(\d+)|Y(\d+)/i);
  const yearLevel = yearMatch ? `Year ${yearMatch[1] || yearMatch[2]}` : undefined;

  // Extract subject from filename or content
  let subject = '';
  if (htmlContent.includes('māori') || htmlContent.includes('maori')) subject = 'Te Reo Māori';
  else if (htmlContent.includes('math')) subject = 'Mathematics';
  else if (htmlContent.includes('science')) subject = 'Science';
  else if (htmlContent.includes('english')) subject = 'English';
  else if (htmlContent.includes('social')) subject = 'Social Studies';

  // Extract cultural context
  const culturalContext = htmlContent.includes('māori') || htmlContent.includes('cultural') || htmlContent.includes('traditional')
    ? 'Culturally responsive content with Te Ao Māori integration'
    : undefined;

  return { title, yearLevel, subject, culturalContext };
}

function generateReactComponent(handout: HandoutData): string {
  const componentName = handout.filename
    .replace(/\.html$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\s/g, '');

  return `import React from 'react';
import { TeKeteHandout } from '../TeKeteHandout';

export const ${componentName}: React.FC = () => {
  return (
    <TeKeteHandout
      title="${handout.title.replace(/"/g, '\\"')}"
      content={\`${handout.content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}
      ${handout.culturalContext ? `culturalContext="${handout.culturalContext.replace(/"/g, '\\"')}"` : ''}
      ${handout.yearLevel ? `yearLevel="${handout.yearLevel}"` : ''}
      ${handout.subject ? `subject="${handout.subject}"` : ''}
    />
  );
};

export default ${componentName};
`;
}

async function migrateHandout(filename: string): Promise<void> {
  try {
    const htmlPath = join(TE_KETE_HANDOUTS_PATH, filename);
    const htmlContent = await readFile(htmlPath, 'utf-8');
    
    // Extract body content, removing HTML document structure
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const content = bodyMatch ? bodyMatch[1].trim() : htmlContent;
    
    const metadata = await extractHandoutMetadata(htmlContent);
    
    const handout: HandoutData = {
      filename,
      title: metadata.title || filename.replace(/\.html$/, '').replace(/[-_]/g, ' '),
      content,
      culturalContext: metadata.culturalContext,
      yearLevel: metadata.yearLevel,
      subject: metadata.subject
    };

    const reactComponent = generateReactComponent(handout);
    const componentFilename = filename.replace(/\.html$/, '.tsx');
    const outputPath = join(TARGET_PATH, componentFilename);
    
    await writeFile(outputPath, reactComponent);
    console.log(`✅ Migrated: ${filename} → ${componentFilename}`);
    
  } catch (error) {
    console.error(`❌ Failed to migrate ${filename}:`, error);
  }
}

async function deployMigrationArmy(): Promise<void> {
  console.log('🚀 DEPLOYING MASS HANDOUT MIGRATION ARMY');
  
  try {
    // Ensure target directory exists
    await mkdir(TARGET_PATH, { recursive: true });
    console.log(`📁 Target directory created: ${TARGET_PATH}`);
    
    // Get all handout files
    const files = await readdir(TE_KETE_HANDOUTS_PATH);
    const handoutFiles = files.filter(file => file.endsWith('.html') && !file.startsWith('.'));
    
    console.log(`📊 Found ${handoutFiles.length} handouts to migrate`);
    
    if (handoutFiles.length === 0) {
      console.log('❌ No handout files found');
      return;
    }
    
    // Deploy 40 parallel migration agents (simulate with Promise.all batching)
    const batchSize = Math.max(1, Math.ceil(handoutFiles.length / 40));
    const batches: string[][] = [];
    
    for (let i = 0; i < handoutFiles.length; i += batchSize) {
      batches.push(handoutFiles.slice(i, i + batchSize));
    }
    
    console.log(`🤖 Deploying ${batches.length} agent batches`);
    
    // Execute migrations in parallel
    await Promise.all(
      batches.map(async (batch, index) => {
        console.log(`🔄 Agent batch ${index + 1} processing ${batch.length} files`);
        await Promise.all(batch.map(migrateHandout));
      })
    );
    
    // Generate index file
    const successfulMigrations = handoutFiles.filter(file => {
      try {
        const componentFilename = file.replace(/\.html$/, '.tsx');
        require('fs').statSync(join(TARGET_PATH, componentFilename));
        return true;
      } catch {
        return false;
      }
    });
    
    const indexContent = successfulMigrations
      .map(file => {
        const componentName = file
          .replace(/\.html$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())
          .replace(/\s/g, '');
        const filename = file.replace(/\.html$/, '');
        return `export { default as ${componentName} } from './${filename}';`;
      })
      .join('\n');
    
    await writeFile(join(TARGET_PATH, 'index.ts'), indexContent);
    
    console.log(`🎯 MIGRATION COMPLETE: ${successfulMigrations.length}/${handoutFiles.length} handouts migrated successfully`);
    console.log(`📁 Components available at: ${TARGET_PATH}`);
    console.log('✅ Index file generated for easy imports');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

if (import.meta.main) {
  deployMigrationArmy().catch(console.error);
}