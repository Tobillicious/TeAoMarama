#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function fixImportStatements() {
  console.log('🔧 FIXING IMPORT STATEMENTS');
  
  const patterns = [
    { pattern: /import\w+from/g, replacement: 'import from' },
    { pattern: /import\s+\w+from/g, replacement: 'import from' },
    { pattern: /from\s+['"]/g, replacement: "from '" },
  ];

  function scanAndFix(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanAndFix(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        try {
          let content = fs.readFileSync(fullPath, 'utf8');
          const beforeContent = content;

          for (const pattern of patterns) {
            content = content.replace(pattern.pattern, pattern.replacement);
          }

          if (content !== beforeContent) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`✅ Fixed imports in ${fullPath}`);
          }
        } catch (error) {
          // Ignore file errors
        }
      }
    }
  }

  scanAndFix('src');
  scanAndFix('migration');
  console.log('🎉 Import statement fixes completed');
}

fixImportStatements().catch(console.error);
