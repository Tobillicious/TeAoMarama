#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

// Get list of handout files with Card import
const files = execSync("find /Users/admin/gemini-react-app/src/components/educational/handouts -name '*.tsx' -exec grep -l \"import.*'../../ui/Card'\" {} \\;", { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(file => file.length > 0);

console.log(`Found ${files.length} files to fix...`);

files.forEach(filePath => {
  try {
    const content = readFileSync(filePath, 'utf8');
    
    // Fix the import statement casing
    const newContent = content.replace(/import.*from '\.\.\/\.\.\/ui\/Card';/, "import { Card } from '../../ui/card';");
    
    if (content !== newContent) {
      writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Fixed Card import in ${filePath.split('/').pop()}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
  }
});

console.log('✅ Card imports fixed successfully!');