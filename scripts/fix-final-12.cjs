#!/usr/bin/env node

const fs = require('fs');

async function fixFinal12() {
  console.log('🔧 Fixing Final 12 Errors - Last Push!');

  const targetFiles = [
    'src/ai/qa-overseer.ts',
    'src/pages/AssessmentFramework.tsx',
    'src/pages/LessonsIntegration.tsx',
    'src/pages/ScienceIntegration.tsx',
    'src/services/useAuth.ts',
    'src/supabaseClient.ts',
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

      // Fix missing semicolons in imports
      content = content.replace(
        /import\s+([^'"]+)\s+from\s+['"]([^'"]+)['"]/g,
        "import $1 from '$2';",
      );

      // Fix missing semicolons in const declarations
      content = content.replace(/const\s+(\w+)\s*=\s*([^;]+)(?!\s*;)/g, 'const $1 = $2;');

      // Fix missing semicolons in export statements
      content = content.replace(/export\s+([^;]+)(?!\s*;)/g, 'export $1;');

      // Fix missing commas in for loops
      content = content.replace(
        /for\s*\(\s*let\s+(\w+)\s*=\s*([^;]+)\s+(\w+)\s*<=\s*([^;]+)\s+(\w+)\+\+\)/g,
        'for (let $1 = $2; $3 <= $4; $5++)',
      );

      // Fix missing semicolons in function declarations
      content = content.replace(
        /export\s+function\s+(\w+)\s*\(([^)]*)\)\s*\{/g,
        'export function $1($2) {',
      );

      // Fix missing semicolons in if statements
      content = content.replace(/if\s*\(([^)]+)\)\s*\{/g, 'if ($1) {');

      // Fix missing semicolons in throw statements
      content = content.replace(/throw\s+new\s+Error\s*\(([^)]+)\)/g, 'throw new Error($1);');

      // Fix missing commas in function parameters
      content = content.replace(/useContext\s*\(([^)]+)\)/g, 'useContext($1)');

      // Fix missing semicolons in createClient calls
      content = content.replace(/createClient\s*\(([^)]+)\)/g, 'createClient($1)');

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

fixFinal12().catch(console.error);
