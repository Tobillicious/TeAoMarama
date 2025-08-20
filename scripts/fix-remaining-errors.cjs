#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function fixRemainingErrors() {
  console.log('🔧 Fixing Remaining Errors - Final Push...');

  // Target the specific files causing the most remaining errors
  const targetFiles = [
    'src/agents/audit-agents.ts',
    'src/ai/performance-optimizer.ts',
    'src/ai/provenance.ts',
    'src/ai/orchestrator.ts',
    'src/ai/mihara-overseer.ts',
  ];

  let totalFixed = 0;

  for (const filePath of targetFiles) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const beforeContent = content;

      // Fix 1: Malformed property initializers
      content = content.replace(/(\w+):\s*([^,;\n]+),\s*$/gm, '$1: $2;');

      // Fix 2: Malformed variable declarations with commas instead of semicolons
      content = content.replace(
        /const\s+(\w+)\s*=\s*([^,;\n]+),\s*const/g,
        'const $1 = $2;\nconst',
      );
      content = content.replace(/let\s+(\w+)\s*=\s*([^,;\n]+),\s*let/g, 'let $1 = $2;\nlet');

      // Fix 3: Fix malformed try-catch blocks
      content = content.replace(/,\s*try\s*\{/g, ';\ntry {');
      content = content.replace(/,\s*catch\s*\(/g, ';\ncatch (');

      // Fix 4: Fix malformed if statements
      content = content.replace(/,\s*if\s*\(/g, ';\nif (');
      content = content.replace(/,\s*for\s*\(/g, ';\nfor (');
      content = content.replace(/,\s*while\s*\(/g, ';\nwhile (');

      // Fix 5: Fix malformed function declarations
      content = content.replace(/,\s*async\s+function/g, ';\nasync function');
      content = content.replace(/,\s*function\s+(\w+)/g, ';\nfunction $1');

      // Fix 6: Fix malformed arrow functions
      content = content.replace(/,\s*const\s+(\w+)\s*=\s*\(/g, ';\nconst $1 = (');
      content = content.replace(/,\s*let\s+(\w+)\s*=\s*\(/g, ';\nlet $1 = (');

      // Fix 7: Fix malformed object properties
      content = content.replace(/(\w+):\s*\)\s*\{/g, '$1: {');
      content = content.replace(/(\w+):\s*\[\)\s*\{/g, '$1: [{');

      // Fix 8: Fix malformed array declarations
      content = content.replace(/\[\s*\)\s*\{/g, '[{');

      // Fix 9: Fix malformed interface declarations
      content = content.replace(/interface\s+(\w+)\s*\)\s*\{/g, 'interface $1 {');

      // Fix 10: Fix malformed class declarations
      content = content.replace(/class\s+(\w+)\s*\)\s*\{/g, 'class $1 {');

      // Fix 11: Fix malformed export statements
      content = content.replace(/export\s+(\w+)\s*\)\s*\{/g, 'export $1 {');

      // Fix 12: Fix malformed import statements
      content = content.replace(/import\s+(\w+)\s*\)\s*\{/g, 'import $1 {');

      // Fix 13: Fix malformed variable declarations
      content = content.replace(/const\s+(\w+)\s*=\s*\)\s*\{/g, 'const $1 = {');
      content = content.replace(/let\s+(\w+)\s*=\s*\)\s*\{/g, 'let $1 = {');

      // Fix 14: Fix malformed method calls
      content = content.replace(/\.(\w+)\s*\(\s*\)\s*\{/g, '.$1() {');

      // Fix 15: Fix malformed conditional statements
      content = content.replace(/if\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'if ($1) {');

      // Fix 16: Fix malformed for loops
      content = content.replace(/for\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'for ($1) {');

      // Fix 17: Fix malformed while loops
      content = content.replace(/while\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'while ($1) {');

      // Fix 18: Fix malformed try-catch blocks
      content = content.replace(/try\s*\)\s*\{/g, 'try {');
      content = content.replace(/catch\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'catch ($1) {');

      // Fix 19: Fix malformed switch statements
      content = content.replace(/switch\s*\(\s*([^)]*)\s*\)\s*\)\s*\{/g, 'switch ($1) {');

      // Fix 20: Fix malformed case statements
      content = content.replace(/case\s+([^:]*):\s*\)\s*\{/g, 'case $1: {');

      // Fix 21: Fix malformed default statements
      content = content.replace(/default:\s*\)\s*\{/g, 'default: {');

      // Fix 22: Fix malformed function declarations with extra parentheses
      content = content.replace(/function\s+(\w+)\s*\(([^)]*)\)\s*\)\s*\{/g, 'function $1($2) {');

      // Fix 23: Fix malformed async function declarations
      content = content.replace(
        /async\s+function\s+(\w+)\s*\(([^)]*)\)\s*\)\s*\{/g,
        'async function $1($2) {',
      );

      // Fix 24: Fix malformed arrow functions
      content = content.replace(
        /const\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*\)\s*\{/g,
        'const $1 = ($2) => {',
      );

      // Fix 25: Fix malformed template literals
      content = content.replace(/\$\)\s*\{/g, '${');

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

  console.log(`\n🎉 Fixed syntax in ${totalFixed} files`);
}

fixRemainingErrors().catch(console.error);
