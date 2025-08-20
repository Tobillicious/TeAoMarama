#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function deleteCorruptedFiles() {
  console.log('🔍 Finding and deleting massively corrupted files...');

  const srcDir = 'src';
  const files = [];

  function getTypeScriptFiles(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        getTypeScriptFiles(fullPath);
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }

  getTypeScriptFiles(srcDir);

  let deletedCount = 0;

  for (const filePath of files) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // Check if file is massively corrupted (all on one line with no proper formatting)
      const lines = content.split('\n');
      const firstLine = lines[0];

      // If the first line is extremely long (over 500 characters) and contains multiple statements
      // without proper line breaks, it's likely corrupted
      if (
        (firstLine.length > 500 &&
          firstLine.includes('export') &&
          firstLine.includes('import') &&
          firstLine.includes('function')) ||
        (firstLine.includes('interface') &&
          firstLine.includes('class') &&
          firstLine.includes('export'))
      ) {
        console.log(`🗑️  Deleting corrupted file: ${filePath}`);
        fs.unlinkSync(filePath);
        deletedCount++;
      }
    } catch (error) {
      console.error(`❌ Error checking ${filePath}:`, error.message);
    }
  }

  console.log(`\n🎉 Deleted ${deletedCount} corrupted files`);
}

deleteCorruptedFiles().catch(console.error);
