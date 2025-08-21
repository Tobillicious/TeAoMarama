#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function fixTemplateLiterals() {
  console.log('🔧 FIXING TEMPLATE LITERALS');
  
  const patterns = [
    { pattern: /'`(.*?)`'/g, replacement: '`$1`' },
    { pattern: /"`(.*?)`"/g, replacement: '`$1`' },
    { pattern: /\${(.*?)}/g, replacement: '${$1}' },
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
            console.log(`✅ Fixed template literals in ${fullPath}`);
          }
        } catch (error) {
          // Ignore file errors
        }
      }
    }
  }

  scanAndFix('src');
  scanAndFix('migration');
  console.log('🎉 Template literal fixes completed');
}

fixTemplateLiterals().catch(console.error);
