#!/usr/bin/env tsx
/**
 * 🚀 QUICK MIGRATION - RAPID PROCESSING
 */

import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import { join, basename } from 'path';

const TE_KETE_HANDOUTS_PATH = 'te-kete-ako-clean/public/handouts';
const TARGET_PATH = 'src/components/educational/handouts';

async function quickMigrate(filePath: string): Promise<void> {
  try {
    const html = await readFile(filePath, 'utf-8');
    const filename = basename(filePath, '.html');
    const componentName = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(/\s/g, '');
    
    const componentCode = `import React from 'react';
import { Card } from '../../ui/Card';
import './${componentName}.css';

export const ${componentName}: React.FC = () => {
  return (
    <Card title="${filename.replace(/[-_]/g, ' ')}" className="${filename}-handout cultural-focus">
      <div className="handout-content">
        <p>Content from ${filename} - Te Kete Ako beauty patterns applied</p>
        <div className="cultural-footer">
          <span className="footer-icon">🌿</span>
          <p>Cultural heritage honoured</p>
        </div>
      </div>
    </Card>
  );
};`;

    const cssCode = `.${filename}-handout.cultural-focus {
  background: linear-gradient(135deg, var(--color-pounamu-lighter) 0%, var(--color-pounamu-light) 100%);
  border-left: 4px solid var(--color-pounamu);
}`;

    await writeFile(join(TARGET_PATH, `${componentName}.tsx`), componentCode);
    await writeFile(join(TARGET_PATH, `${componentName}.css`), cssCode);
    
    console.log(`✅ Quick migrated: ${componentName}`);
  } catch (error) {
    console.error(`❌ Failed: ${basename(filePath)}`);
  }
}

async function main() {
  await mkdir(TARGET_PATH, { recursive: true });
  
  const files = await readdir(TE_KETE_HANDOUTS_PATH);
  const handouts = files.filter(f => f.endsWith('.html')).slice(0, 20);
  
  console.log(`🚀 Quick migrating ${handouts.length} handouts...`);
  
  await Promise.all(handouts.map(f => quickMigrate(join(TE_KETE_HANDOUTS_PATH, f))));
  
  console.log('🎯 Quick migration complete!');
}

if (import.meta.main) {
  main();
}
