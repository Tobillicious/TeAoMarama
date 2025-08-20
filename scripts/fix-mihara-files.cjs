#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function fixMiharaFiles() {
  console.log('🔧 Fixing Mihara Files - Targeted Approach...');

  // Target the specific files causing the most errors
  const miharaFiles = [
    'scripts/comprehensive-audit.ts',
    'scripts/continuous-content-army.ts',
    'scripts/audit-resources.ts',
    'scripts/massive-parallel-migration.ts',
    'scripts/treasure-hunter-crawler.ts',
  ];

  let totalFixed = 0;

  for (const filePath of miharaFiles) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const beforeContent = content;

      // Fix 1: Malformed function declarations with extra parentheses
      content = content.replace(/function\s+(\w+)\s*\(([^)]*)\)\s*\)\s*\{/g, 'function $1($2) {');

      // Fix 2: Malformed async function declarations
      content = content.replace(
        /async\s+function\s+(\w+)\s*\(([^)]*)\)\s*\)\s*\{/g,
        'async function $1($2) {',
      );

      // Fix 3: Malformed arrow functions
      content = content.replace(
        /const\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*\)\s*\{/g,
        'const $1 = ($2) => {',
      );

      // Fix 4: Malformed object properties
      content = content.replace(/(\w+):\s*\)\s*\{/g, '$1: {');

      // Fix 5: Malformed array declarations
      content = content.replace(/\[\s*\)\s*\{/g, '[{');

      // Fix 6: Fix template literal syntax errors
      content = content.replace(/\$\)\s*\{/g, '${');

      // Fix 7: Fix malformed filter functions
      content = content.replace(/\.filter\((\w+)\)\s*=>/g, '.filter(($1) =>');

      // Fix 8: Fix malformed map functions
      content = content.replace(/\.map\((\w+)\)\s*=>/g, '.map(($1) =>');

      // Fix 9: Fix malformed reduce functions
      content = content.replace(/\.reduce\((\w+),\s*_(\w+)\)\s*=>/g, '.reduce(($1, $2) =>');

      // Fix 10: Fix malformed interface declarations
      content = content.replace(/interface\s+(\w+)\s*\)\s*\{/g, 'interface $1 {');

      // Fix 11: Fix malformed variable declarations
      content = content.replace(/const\s+(\w+)\s*=\s*\)\s*\{/g, 'const $1 = {');
      content = content.replace(/let\s+(\w+)\s*=\s*\)\s*\{/g, 'let $1 = {');

      // Fix 12: Fix malformed try-catch blocks
      content = content.replace(/try\s*\)\s*\{/g, 'try {');
      content = content.replace(/catch\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'catch ($1) {');

      // Fix 13: Fix malformed conditional statements
      content = content.replace(/if\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'if ($1) {');

      // Fix 14: Fix malformed for loops
      content = content.replace(/for\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'for ($1) {');

      // Fix 15: Fix malformed while loops
      content = content.replace(/while\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'while ($1) {');

      // Fix 16: Fix malformed switch statements
      content = content.replace(/switch\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'switch ($1) {');

      // Fix 17: Fix malformed case statements
      content = content.replace(/case\s+([^:]*):\s*\)\s*\{/g, 'case $1: {');

      // Fix 18: Fix malformed default statements
      content = content.replace(/default:\s*\)\s*\{/g, 'default: {');

      // Fix 19: Fix malformed export statements
      content = content.replace(/export\s+(\w+)\s*\)\s*\{/g, 'export $1 {');

      // Fix 20: Fix malformed import statements
      content = content.replace(/import\s+(\w+)\s*\)\s*\{/g, 'import $1 {');

      // Fix 21: Fix malformed class declarations
      content = content.replace(/class\s+(\w+)\s*\)\s*\{/g, 'class $1 {');

      // Fix 22: Fix malformed method calls
      content = content.replace(/\.(\w+)\s*\(\s*\)\s*\{/g, '.$1() {');

      // Fix 23: Fix malformed object literal syntax
      content = content.replace(/:\s*\)\s*\{/g, ': {');
      content = content.replace(/=\s*\)\s*\{/g, ' = {');

      // Fix 24: Fix malformed array literal syntax
      content = content.replace(/\[\s*\)\s*\{/g, '[{');

      // Fix 25: Fix malformed function calls with extra parentheses
      content = content.replace(/\(\s*\)\s*\{/g, '() {');

      if (content !== beforeContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        totalFixed++;
        console.log(`✅ Fixed syntax in ${filePath}`);
      } else {
        console.log(`ℹ️  No changes needed in ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error fixing ${filePath}:`, error.message);
    }
  }

  console.log(`\n🎉 Fixed syntax in ${totalFixed} Mihara files`);
}

fixMiharaFiles().catch(console.error);
