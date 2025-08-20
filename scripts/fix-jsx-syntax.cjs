#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function fixJSXSyntax() {
  console.log('🔧 Fixing JSX Syntax Issues...');

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
      let fixes = 0;

      // Fix malformed arrow functions in map
      const beforeContent = content;

      // Fix: .map(item) => should be .map((item) =>
      content = content.replace(/\.map\((\w+)\) =>/g, '.map(($1) =>');

      // Fix: .map(item, _index) => should be .map((item, index) =>
      content = content.replace(/\.map\((\w+),\s*_(\w+)\) =>/g, '.map(($1, $2) =>');

      // Fix: return (_<div should be return (<div
      content = content.replace(/return \(_</g, 'return (<');

      // Fix: && (_<div should be && (<div
      content = content.replace(/&& \(_</g, '&& (<');

      // Fix: => (_<div should be => (<div
      content = content.replace(/=> \(_</g, '=> (<');

      // Fix: {/* ... */} comments in wrong places
      content = content.replace(/\{\s*\/\*.*?\*\/\s*\}/g, '');

      // Fix filter syntax: .filter(item) => should be .filter((item) =>
      content = content.replace(/\.filter\((\w+)\) =>/g, '.filter(($1) =>');

      // Fix reduce syntax: .reduce(acc, _item) => should be .reduce((acc, item) =>
      content = content.replace(/\.reduce\((\w+),\s*_(\w+)\) =>/g, '.reduce(($1, $2) =>');

      if (content !== beforeContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        fixes = 1;
        totalFixed++;
        console.log(`✅ Fixed JSX syntax in ${filePath}`);
      } else {
        console.log(`ℹ️  No changes needed in ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error fixing ${filePath}:`, error.message);
    }
  }

  console.log(`\n🎉 Fixed JSX syntax in ${totalFixed} files`);
}

fixJSXSyntax().catch(console.error);
