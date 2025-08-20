#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Fix common syntax errors
    content = content
      // Remove extra semicolons after opening braces
      .replace(/\{;,/g, '{')
      .replace(/\{;/g, '{')

      // Remove extra semicolons after closing braces
      .replace(/\},;/g, '},')
      .replace(/\};/g, '}')

      // Fix function declarations with extra semicolons
      .replace(/\) \{;/g, ') {')
      .replace(/\): [^{]+ \{;/g, (match) => match.replace(/ \{;$/, ' {'))

      // Fix interface declarations
      .replace(/interface [^{]+ \{;/g, (match) => match.replace(/ \{;$/, ' {'))

      // Fix class declarations
      .replace(/class [^{]+ \{;/g, (match) => match.replace(/ \{;$/, ' {'))

      // Fix method declarations
      .replace(/(private|public|protected|static|async) [^{]+ \{;/g, (match) =>
        match.replace(/ \{;$/, ' {'),
      )

      // Fix arrow functions
      .replace(/=> \{;/g, '=> {')

      // Fix object literals
      .replace(/= \{;/g, '= {')

      // Fix array literals
      .replace(/= \[;/g, '= [')

      // Fix parameter lists
      .replace(/\([^)]*\) \{;/g, (match) => match.replace(/ \{;$/, ' {'))

      // Fix return statements
      .replace(/return \{;/g, 'return {')

      // Fix if/else statements
      .replace(/if \([^)]*\) \{;/g, (match) => match.replace(/ \{;$/, ' {'))
      .replace(/else \{;/g, 'else {')

      // Fix try/catch blocks
      .replace(/try \{;/g, 'try {')
      .replace(/catch \([^)]*\) \{;/g, (match) => match.replace(/ \{;$/, ' {'))

      // Fix for loops
      .replace(/for \([^)]*\) \{;/g, (match) => match.replace(/ \{;$/, ' {'))
      .replace(/for await \([^)]*\) \{;/g, (match) => match.replace(/ \{;$/, ' {'))

      // Fix while loops
      .replace(/while \([^)]*\) \{;/g, (match) => match.replace(/ \{;$/, ' {'))

      // Fix switch statements
      .replace(/switch \([^)]*\) \{;/g, (match) => match.replace(/ \{;$/, ' {'))

      // Fix case statements
      .replace(/case [^:]+: \{;/g, (match) => match.replace(/ \{;$/, ' {'))

      // Fix default statements
      .replace(/default: \{;/g, 'default: {')

      // Fix JSX expressions
      .replace(/className=\{`[^`]*`\};/g, (match) => match.replace(/;$/, ''))

      // Fix template literals
      .replace(/`[^`]*`;/g, (match) => match.replace(/;$/, ''))

      // Fix string literals
      .replace(/'[^']*';/g, (match) => match.replace(/;$/, ''))
      .replace(/"[^"]*";/g, (match) => match.replace(/;$/, ''))

      // Fix number literals
      .replace(/\b\d+\.?\d*;/g, (match) => match.replace(/;$/, ''))

      // Fix boolean literals
      .replace(/\b(true|false);/g, (match) => match.replace(/;$/, ''))

      // Fix null/undefined
      .replace(/\b(null|undefined);/g, (match) => match.replace(/;$/, ''))

      // Fix variable declarations
      .replace(/(const|let|var) [^=]+ = [^;]+;/g, (match) => {
        // Don't remove semicolons from variable declarations
        return match;
      })

      // Fix function calls
      .replace(/(\w+)\([^)]*\);/g, (match) => {
        // Don't remove semicolons from function calls
        return match;
      })

      // Fix import statements
      .replace(/import [^;]+;/g, (match) => {
        // Don't remove semicolons from imports
        return match;
      })

      // Fix export statements
      .replace(/export [^;]+;/g, (match) => {
        // Don't remove semicolons from exports
        return match;
      });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function walkDir(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...walkDir(fullPath));
    } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx'))) {
      files.push(fullPath);
    }
  }

  return files;
}

function main() {
  const srcDir = path.join(process.cwd(), 'src');
  const files = walkDir(srcDir);

  console.log(`🔍 Found ${files.length} TypeScript files to check`);

  let fixedCount = 0;
  for (const file of files) {
    if (fixSyntaxErrors(file)) {
      fixedCount++;
    }
  }

  console.log(`\n🎉 Fixed ${fixedCount} files with syntax errors`);
}

if (require.main === module) {
  main();
}

module.exports = { fixSyntaxErrors };
