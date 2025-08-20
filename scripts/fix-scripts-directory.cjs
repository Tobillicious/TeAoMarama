#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function fixScriptsDirectory() {
  console.log('🔧 Fixing Scripts Directory...');

  // Get all TypeScript files in scripts directory
  const scriptsDir = 'scripts';
  const files = [];

  function getTypeScriptFiles(dir) {
    try {
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
    } catch (error) {
      // Directory doesn't exist or is inaccessible
    }
  }

  getTypeScriptFiles(scriptsDir);

  console.log(`Found ${files.length} TypeScript files in scripts directory`);

  let totalFixed = 0;
  let totalFixes = 0;

  for (const filePath of files) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const beforeContent = content;
      let fixes = 0;

      // Fix common syntax patterns found in scripts

      // Fix malformed function declarations
      content = content.replace(/function\s+(\w+)\s*\(([^)]*)\)\s*\)\s*\{/g, 'function $1($2) {');

      // Fix malformed arrow functions
      content = content.replace(
        /const\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*\)\s*\{/g,
        'const $1 = ($2) => {',
      );

      // Fix malformed async functions
      content = content.replace(
        /async\s+function\s+(\w+)\s*\(([^)]*)\)\s*\)\s*\{/g,
        'async function $1($2) {',
      );

      // Fix malformed object properties
      content = content.replace(/(\w+):\s*\)\s*\{/g, '$1: {');

      // Fix malformed array declarations
      content = content.replace(/\[\s*\)\s*\{/g, '[{');

      // Fix malformed interface declarations
      content = content.replace(/interface\s+(\w+)\s*\)\s*\{/g, 'interface $1 {');

      // Fix malformed class declarations
      content = content.replace(/class\s+(\w+)\s*\)\s*\{/g, 'class $1 {');

      // Fix malformed export statements
      content = content.replace(/export\s+(\w+)\s*\)\s*\{/g, 'export $1 {');

      // Fix malformed import statements
      content = content.replace(/import\s+(\w+)\s*\)\s*\{/g, 'import $1 {');

      // Fix malformed variable declarations
      content = content.replace(/const\s+(\w+)\s*=\s*\)\s*\{/g, 'const $1 = {');
      content = content.replace(/let\s+(\w+)\s*=\s*\)\s*\{/g, 'let $1 = {');

      // Fix malformed method calls
      content = content.replace(/\.(\w+)\s*\(\s*\)\s*\{/g, '.$1() {');

      // Fix malformed conditional statements
      content = content.replace(/if\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'if ($1) {');

      // Fix malformed for loops
      content = content.replace(/for\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'for ($1) {');

      // Fix malformed while loops
      content = content.replace(/while\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'while ($1) {');

      // Fix malformed try-catch blocks
      content = content.replace(/try\s*\)\s*\{/g, 'try {');
      content = content.replace(/catch\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'catch ($1) {');

      // Fix malformed switch statements
      content = content.replace(/switch\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'switch ($1) {');

      // Fix malformed case statements
      content = content.replace(/case\s+([^:]*):\s*\)\s*\{/g, 'case $1: {');

      // Fix malformed default statements
      content = content.replace(/default:\s*\)\s*\{/g, 'default: {');

      if (content !== beforeContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        totalFixed++;
        fixes = 1;
        console.log(`✅ Fixed syntax in ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error fixing ${filePath}:`, error.message);
    }
  }

  console.log(`\n🎉 Fixed syntax in ${totalFixed} files in scripts directory`);
}

fixScriptsDirectory().catch(console.error);
