#!/usr/bin/env tsx
/**
 * 🚀 RAPID BATCH MIGRATION - PARALLEL PROCESSING
 * Process multiple Te Kete Ako handouts simultaneously for ERO Hui
 */

import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import { JSDOM } from 'jsdom';
import { basename, join } from 'path';

const TE_KETE_HANDOUTS_PATH = 'te-kete-ako-clean/public/handouts';
const TARGET_PATH = 'src/components/educational/handouts';

interface HandoutData {
  title: string;
  content: string;
  filename: string;
  culturalThemes: string[];
  subject: string;
  yearLevel: string;
}

async function extractHandoutData(filePath: string): Promise<HandoutData> {
  const html = await readFile(filePath, 'utf-8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Extract title
  const titleElement = document.querySelector('h1, .page-title, title');
  const title = titleElement?.textContent?.trim() || basename(filePath, '.html');

  // Extract main content
  const contentArea = document.querySelector('.content-area, main, .main-content');
  const content = contentArea?.textContent?.trim() || '';

  // Determine cultural themes and subject
  const culturalThemes = extractCulturalThemes(content, title);
  const subject = determineSubject(content, title);
  const yearLevel = determineYearLevel(content, title);

  return {
    title,
    content,
    filename: basename(filePath, '.html'),
    culturalThemes,
    subject,
    yearLevel,
  };
}

function extractCulturalThemes(content: string, title: string): string[] {
  const themes: string[] = [];
  const text = `${title} ${content}`.toLowerCase();

  if (text.includes('māori') || text.includes('maori')) themes.push('Māori Culture');
  if (text.includes('te reo') || text.includes('te reo māori')) themes.push('Te Reo Māori');
  if (text.includes('tikanga') || text.includes('kawa')) themes.push('Tikanga Māori');
  if (text.includes('whakapapa') || text.includes('genealogy')) themes.push('Whakapapa');
  if (text.includes('whenua') || text.includes('land')) themes.push('Whenua');
  if (text.includes('whānau') || text.includes('family')) themes.push('Whānau');
  if (text.includes('mana') || text.includes('prestige')) themes.push('Mana');
  if (text.includes('aroha') || text.includes('love')) themes.push('Aroha');
  if (text.includes('kaitiakitanga') || text.includes('guardianship')) themes.push('Kaitiakitanga');

  return themes.length > 0 ? themes : ['Cultural Integration'];
}

function determineSubject(content: string, title: string): string {
  const text = `${title} ${content}`.toLowerCase();

  if (text.includes('math') || text.includes('algebra') || text.includes('geometry'))
    return 'Mathematics';
  if (text.includes('science') || text.includes('biology') || text.includes('chemistry'))
    return 'Science';
  if (text.includes('english') || text.includes('writing') || text.includes('reading'))
    return 'English';
  if (text.includes('social studies') || text.includes('history') || text.includes('geography'))
    return 'Social Studies';
  if (text.includes('te reo') || text.includes('māori language')) return 'Te Reo Māori';
  if (text.includes('art') || text.includes('creative')) return 'Arts';
  if (text.includes('health') || text.includes('physical')) return 'Health & Physical Education';

  return 'Cross-Curricular';
}

function determineYearLevel(content: string, title: string): string {
  const text = `${title} ${content}`.toLowerCase();

  if (text.includes('year 7') || text.includes('year7')) return 'Year 7';
  if (text.includes('year 8') || text.includes('year8')) return 'Year 8';
  if (text.includes('year 9') || text.includes('year9')) return 'Year 9';
  if (text.includes('year 10') || text.includes('year10')) return 'Year 10';
  if (text.includes('year 11') || text.includes('year11')) return 'Year 11';
  if (text.includes('year 12') || text.includes('year12')) return 'Year 12';
  if (text.includes('year 13') || text.includes('year13')) return 'Year 13';

  return 'Year 8'; // Default for ERO Hui
}

function generateComponentName(filename: string): string {
  return filename
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/\s/g, '');
}

function generateReactComponent(handout: HandoutData): string {
  const componentName = generateComponentName(handout.filename);
  const culturalClass = handout.culturalThemes.length > 0 ? 'cultural-focus' : '';

  return `import React from 'react';
import { Card } from '../../ui/Card';
import './${componentName}.css';

interface ${componentName}Props {
  className?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ className = '' }) => {
  return (
    <Card 
      title="${handout.title}"
      subtitle="${handout.subject} - ${handout.yearLevel}"
      className={\`${handout.filename.toLowerCase()}-handout ${culturalClass} \${className}\`}
    >
      <div className="handout-content">
        {/* Cultural Context */}
        ${
          handout.culturalThemes.length > 0
            ? `
        <div className="cultural-context">
          <h3 className="cultural-title">
            <span className="cultural-icon">🌿</span>
            Cultural Themes
          </h3>
          <div className="cultural-themes">
            ${handout.culturalThemes
              .map((theme) => `<span className="theme-tag">${theme}</span>`)
              .join('\n            ')}
          </div>
        </div>
        `
            : ''
        }

        {/* Main Content */}
        <div className="content-section">
          <div className="content-text">
            ${handout.content.substring(0, 500)}${handout.content.length > 500 ? '...' : ''}
          </div>
        </div>

        {/* Cultural Footer */}
        <div className="cultural-footer">
          <div className="footer-content">
            <span className="footer-icon">🌿</span>
            <p className="footer-text">
              This content honours the cultural heritage and educational traditions of Aotearoa New Zealand.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
`;
}

function generateCSS(handout: HandoutData): string {
  const componentName = generateComponentName(handout.filename);
  const hasCulturalThemes = handout.culturalThemes.length > 0;

  return `/* ${componentName} Handout - Te Kete Ako Beauty Patterns */

.${handout.filename.toLowerCase()}-handout.cultural-focus {
  background: linear-gradient(135deg, var(--color-pounamu-lighter) 0%, var(--color-pounamu-light) 100%);
  border-left: 4px solid var(--color-pounamu);
  position: relative;
  overflow: hidden;
}

.${handout.filename.toLowerCase()}-handout.cultural-focus::before {
  content: '🌿';
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  opacity: 0.1;
  animation: gentle-float 3s ease-in-out infinite;
}

.handout-content {
  padding: 2rem;
  position: relative;
}

/* Cultural Context */
.cultural-context {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 249, 255, 0.8) 100%);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(27, 127, 90, 0.2);
}

.cultural-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-pounamu);
  margin-bottom: 1rem;
}

.cultural-icon {
  font-size: 1.5rem;
  opacity: 0.8;
}

.cultural-themes {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.theme-tag {
  background: var(--color-pounamu);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Content Section */
.content-section {
  margin-bottom: 2rem;
}

.content-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  text-align: justify;
}

/* Cultural Footer */
.cultural-footer {
  background: linear-gradient(135deg, var(--color-pounamu) 0%, var(--color-moana) 100%);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.footer-content {
  position: relative;
  z-index: 1;
}

.footer-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.footer-text {
  color: white;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
}

/* Animations */
@keyframes gentle-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .handout-content {
    padding: 1rem;
  }
  
  .cultural-themes {
    flex-direction: column;
    gap: 0.25rem;
  }
}
`;
}

async function migrateHandout(filePath: string): Promise<void> {
  try {
    console.log(`🔄 Migrating: ${basename(filePath)}`);

    const handout = await extractHandoutData(filePath);
    const componentName = generateComponentName(handout.filename);

    // Generate React component
    const componentCode = generateReactComponent(handout);
    const componentPath = join(TARGET_PATH, `${componentName}.tsx`);
    await writeFile(componentPath, componentCode);

    // Generate CSS
    const cssCode = generateCSS(handout);
    const cssPath = join(TARGET_PATH, `${componentName}.css`);
    await writeFile(cssPath, cssCode);

    console.log(`✅ Migrated: ${componentName} (${handout.culturalThemes.join(', ')})`);
  } catch (error) {
    console.error(`❌ Failed to migrate ${basename(filePath)}:`, error);
  }
}

async function main() {
  try {
    console.log('🚀 RAPID BATCH MIGRATION STARTED');

    // Ensure target directory exists
    await mkdir(TARGET_PATH, { recursive: true });

    // Get first 20 handouts for rapid processing
    const files = await readdir(TE_KETE_HANDOUTS_PATH);
    const handoutFiles = files
      .filter((file) => file.endsWith('.html') && !file.startsWith('.'))
      .slice(0, 20);

    console.log(`📊 Processing ${handoutFiles.length} handouts in parallel`);

    // Process all handouts in parallel
    await Promise.all(
      handoutFiles.map((file) => migrateHandout(join(TE_KETE_HANDOUTS_PATH, file))),
    );

    console.log('🎯 RAPID BATCH MIGRATION COMPLETE!');
    console.log(`📁 Components available at: ${TARGET_PATH}`);
  } catch (error) {
    console.error('❌ Rapid migration failed:', error);
  }
}

if (import.meta.main) {
  main();
}
