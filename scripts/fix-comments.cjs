#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function fixUnterminatedComments() {
  console.log('🔧 FIXING UNTERMINATED COMMENTS');
  
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

          // Fix unterminated block comments
          const lines = content.split('\n');
          let inComment = false;
          let fixedLines = [];

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.includes('/**') && !line.includes('*/')) {
              inComment = true;
            }
            
            if (inComment && line.includes('*/')) {
              inComment = false;
            }
            
            // If we reach end of file and still in comment, add closing
            if (inComment && i === lines.length - 1) {
              fixedLines.push(line);
              fixedLines.push(' */');
            } else {
              fixedLines.push(line);
            }
          }

          const fixedContent = fixedLines.join('\n');
          if (fixedContent !== beforeContent) {
            fs.writeFileSync(fullPath, fixedContent, 'utf8');
            console.log(`✅ Fixed comments in ${fullPath}`);
          }
        } catch (error) {
          // Ignore file errors
        }
      }
    }
  }

  scanAndFix('src');
  scanAndFix('migration');
  console.log('🎉 Comment fixes completed');
}

fixUnterminatedComments().catch(console.error);
