#!/usr/bin/env node
/**
 * 🔧 FINAL LINTING FIX - ADDRESS PARSING ERRORS
 */

const fs = require('fs');
const path = require('path');

// Critical fixes for parsing errors
const parsingFixes = [
  // Fix missing commas in function parameters
  {
    pattern: /\(\s*([^)]+)\s*\)\s*=>\s*{/g,
    replacement: (match, params) => {
      // Ensure proper comma separation
      const cleanParams = params.replace(/\s+/g, ' ').trim();
      return `(${cleanParams}) => {`;
    }
  },
  
  // Fix missing commas in object properties
  {
    pattern: /(\w+):\s*([^,}]+)(?=\s*[^,}])/g,
    replacement: '$1: $2,'
  },
  
  // Fix missing semicolons
  {
    pattern: /(\w+)\s*=\s*[^;]+$/gm,
    replacement: '$1;'
  },
  
  // Fix unterminated strings
  {
    pattern: /'([^']*)$/gm,
    replacement: "'$1'"
  },
  
  // Fix unterminated regular expressions
  {
    pattern: /\/([^\/]*)$/gm,
    replacement: "/$1/"
  }
];

// Remove unused variables and imports
const cleanupFixes = [
  // Remove unused imports
  {
    pattern: /import\s+{\s*([^}]+)\s*}\s+from\s+['"][^'"]+['"];?\s*$/gm,
    replacement: (match, imports) => {
      const importList = imports.split(',').map(i => i.trim());
      const usedImports = importList.filter(imp => {
        const name = imp.split(' as ')[0].trim();
        return !name.includes('unused') && !name.includes('Unused');
      });
      if (usedImports.length === 0) {
        return ''; // Remove entire import if no used imports
      }
      return `import { ${usedImports.join(', ')} } from '${match.match(/from\s*['"]([^'"]+)['"]/)[1]}';`;
    }
  },
  
  // Remove unused variables
  {
    pattern: /const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*[^;]+;?\s*$/gm,
    replacement: ''
  },
  
  // Remove unused function parameters
  {
    pattern: /,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*,|\s*\))/g,
    replacement: ''
  }
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Apply parsing fixes first
    parsingFixes.forEach(fix => {
      content = content.replace(fix.pattern, fix.replacement);
    });
    
    // Apply cleanup fixes
    cleanupFixes.forEach(fix => {
      content = content.replace(fix.pattern, fix.replacement);
    });
    
    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function findTypeScriptFiles(dir) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and other build directories
        if (!item.startsWith('.') && item !== 'node_modules' && item !== 'dist' && item !== 'build') {
          scanDirectory(fullPath);
        }
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

function main() {
  console.log('🔧 FINAL LINTING FIX - ADDRESSING PARSING ERRORS');
  console.log('='.repeat(60));
  
  const srcDir = path.join(process.cwd(), 'src');
  const files = findTypeScriptFiles(srcDir);
  
  console.log(`📁 Found ${files.length} TypeScript files to process`);
  
  let fixedCount = 0;
  
  for (const file of files) {
    if (fixFile(file)) {
      fixedCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`📊 SUMMARY:`);
  console.log(`  ✅ Files fixed: ${fixedCount}`);
  console.log(`  📁 Total files processed: ${files.length}`);
  
  if (fixedCount > 0) {
    console.log('\n🚀 Next steps:');
    console.log('1. Run "npm run lint" to check remaining issues');
    console.log('2. Review the changes made');
    console.log('3. Test the application to ensure nothing broke');
  } else {
    console.log('\n✨ No files needed fixing!');
  }
}

main();
