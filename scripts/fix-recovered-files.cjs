#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function fixRecoveredFiles() {
  console.log('🔧 Fixing Recovered Year8 Files...');

  const filesToFix = [
    'src/pages/Year8ReadingUnits.tsx',
    'src/pages/Year8SocialStudies.tsx',
    'src/pages/Year8SocialStudiesUnits.tsx',
    'src/pages/Year8WritingRevolution.tsx',
    'src/pages/Year8ReadingStrategies.tsx',
    'src/pages/Year8CriticalLiteracy.tsx',
    'src/pages/Year8AcademicVocab.tsx',
  ];

  let totalFixed = 0;

  for (const filePath of filesToFix) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const beforeContent = content;

      // Fix object/array syntax with misplaced braces
      content = content.replace(/(\w+):\s*\) \{/g, '$1: {');
      content = content.replace(/(\w+):\s*\[\) \{/g, '$1: [{');

      // Fix arrow function parameters in callbacks
      content = content.replace(/\.map\((\w+)\) =>/g, '.map(($1) =>');
      content = content.replace(/\.filter\((\w+)\) =>/g, '.filter(($1) =>');
      content = content.replace(/\.reduce\((\w+),\s*_(\w+)\) =>/g, '.reduce(($1, $2) =>');
      content = content.replace(/\.map\((\w+),\s*_(\w+)\) =>/g, '.map(($1, $2) =>');

      // Fix JSX expressions
      content = content.replace(/return \(_</g, 'return (<');
      content = content.replace(/&& \(_</g, '&& (<');
      content = content.replace(/=> \(_</g, '=> (<');

      // Fix useState initialization
      content = content.replace(/useState<([^>]+)>\(\) \{\}\)/g, 'useState<$1>({})');

      // Fix function declarations with wrong brace syntax
      content = content.replace(/= \([^)]*\) => \) \{/g, (match) => {
        return match.replace(/ => \) \{/, ' => {');
      });

      // Fix object properties ending with commas instead of semicolons
      content = content.replace(/^(\s*)(\w+):\s*([^,;\n}]+),$/gm, '$1$2: $3;');

      // Fix malformed function parameters
      content = content.replace(/\([^)]*\) => \) \{/g, (match) => {
        return match.replace(/ => \) \{/, ' => {');
      });

      // Fix onClick handlers
      content = content.replace(/onClick=\) \{/g, 'onClick={');
      content = content.replace(/value=\) \{/g, 'value={');

      // Fix useEffect syntax
      content = content.replace(/useEffect_\(/g, 'useEffect(');

      // Fix object literal syntax
      content = content.replace(/: \) \{/g, ': {');
      content = content.replace(/= \) \{/g, ' = {');

      // Fix array syntax issues
      content = content.replace(/\[\) \{/g, '[{');

      // Fix interface/type definitions
      content = content.replace(/(\w+): \) \{/g, '$1: {');

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

fixRecoveredFiles().catch(console.error);
