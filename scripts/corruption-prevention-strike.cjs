#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🔥 CORRUPTION PREVENTION STRIKE - CONTINUOUS MODE');

// Fix patterns to apply
const fixPatterns = [
  // Fix import statements
  { from: /import\s+([^'"\n]+)\s+from\s*'([^']*)'?$/, to: "import $1 from '$2';" },
  { from: /import\s+([^'"\n]+)\s+from\s*"([^"]*)"?$/, to: 'import $1 from "$2";' },
  
  // Fix export statements  
  { from: /export\s+default\s+([^;'\n]+);?'?$/, to: "export default $1;" },
  
  // Fix string literals
  { from: /console\.log\(\s*([^')]+)\s*\)?;?'?$/, to: "console.log('$1');" },
  
  // Fix object properties
  { from: /:\s*'([^']*);/, to: ": '$1';" },
  
  // Remove stray quotes
  { from: /([^'"])'$/, to: '$1' },
  { from: /^'([^']*)$/, to: '$1' },
  
  // Fix function calls
  { from: /\(\s*'([^']*)\s*\)?\s*;?'?$/, to: "('$1');" }
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let fixed = content;
    let changes = 0;
    
    // Apply all fix patterns
    for (const pattern of fixPatterns) {
      const before = fixed;
      fixed = fixed.replace(pattern.from, pattern.to);
      if (before !== fixed) changes++;
    }
    
    // Line-by-line fixes
    const lines = fixed.split('\n');
    const fixedLines = lines.map(line => {
      let fixedLine = line;
      
      // Remove trailing quotes that corrupt syntax
      if (fixedLine.endsWith("';") && !fixedLine.includes('import') && !fixedLine.includes('from')) {
        fixedLine = fixedLine.slice(0, -1);
        changes++;
      }
      
      // Fix missing quotes in imports
      if (fixedLine.includes('from ') && !fixedLine.includes("'") && !fixedLine.includes('"')) {
        fixedLine = fixedLine.replace(/from\s+([^\s;]+)/, "from '$1'");
        changes++;
      }
      
      // Fix broken string literals
      if (fixedLine.match(/^[^']*'[^']*$/)) {
        if (!fixedLine.includes('import') && !fixedLine.includes('export')) {
          fixedLine = fixedLine.replace(/'/g, '');
          changes++;
        }
      }
      
      return fixedLine;
    });
    
    const finalContent = fixedLines.join('\n');
    
    if (content !== finalContent) {
      fs.writeFileSync(filePath, finalContent, 'utf-8');
      console.log(`✅ Fixed ${filePath} (${changes} changes)`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}: ${error.message}`);
    return false;
  }
}

function runContinuousCleanup() {
  const patterns = [
    'src/**/*.{ts,tsx,js,jsx}',
    '*.{ts,tsx,js,jsx}',
    'scripts/**/*.{ts,tsx,js,jsx}'
  ];
  
  let totalFixed = 0;
  
  patterns.forEach(pattern => {
    try {
      const { execSync } = require('child_process');
      const files = execSync(`find . -name "${pattern.replace('**/', '')}" -type f | grep -v node_modules`, { encoding: 'utf-8' })
        .split('\n')
        .filter(f => f.trim());
      
      files.forEach(file => {
        if (fixFile(file.trim())) {
          totalFixed++;
        }
      });
    } catch (error) {
      // Ignore find errors
    }
  });
  
  console.log(`🎯 Round complete: Fixed ${totalFixed} files`);
  
  // Schedule next round
  setTimeout(runContinuousCleanup, 2000);
}

// Start continuous cleanup
runContinuousCleanup();