#!/usr/bin/env tsx

import fs from 'fs/promises';

async function quickFix() {
  console.log('🔧 Quick syntax fix...');

  const files = [
    'src/App.tsx',
    'src/components/Hero.tsx',
    'src/components/LoadingSpinner.tsx',
    'src/components/Login.tsx',
    'src/components/MiharaNavigation.tsx',
    'src/components/PrivateRoute.tsx',
    'src/pages/About.tsx',
  ];

  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf8');
      const original = content;

      // Fix common issues
      content = content.replace(/from\s+'react;;;/g, "from 'react';");
      content = content.replace(/from\s+'react-router-dom;/g, "from 'react-router-dom';");
      content = content.replace(/React\.FC\s*=\s*\(\)\s*=>\s*{;/g, 'React.FC = () => {');
      content = content.replace(/;\s*};/g, '};');
      content = content.replace(/;\s*export/g, '\nexport');
      content = content.replace(/;;+/g, ';');
      content = content.replace(/;\s*$/gm, '');

      if (content !== original) {
        await fs.writeFile(file, content, 'utf8');
        console.log(`✅ Fixed ${file}`);
      }
    } catch (error) {
      console.log(`❌ Error fixing ${file}:`, error);
    }
  }

  console.log('✅ Quick fix complete');
}

quickFix().catch(console.error);
