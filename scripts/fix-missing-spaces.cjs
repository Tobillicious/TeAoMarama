#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function fixMissingSpaces() {
  console.log('🔧 FIXING MISSING SPACES BETWEEN KEYWORDS');

  const patterns = [
    // Fix missing spaces in import statements
    {
      pattern: /importtype/g,
      replacement: 'import type',
    },
    {
      pattern: /import\s+type\s*\{/g,
      replacement: 'import type {',
    },
    // Fix missing spaces in interface declarations
    {
      pattern: /interface\s*(\w+)/g,
      replacement: 'interface $1',
    },
    // Fix missing spaces in function declarations
    {
      pattern: /function\s*(\w+)/g,
      replacement: 'function $1',
    },
    // Fix missing spaces in const declarations
    {
      pattern: /const\s*(\w+)/g,
      replacement: 'const $1',
    },
    // Fix missing spaces in let declarations
    {
      pattern: /let\s*(\w+)/g,
      replacement: 'let $1',
    },
    // Fix missing spaces in export statements
    {
      pattern: /export\s*(\w+)/g,
      replacement: 'export $1',
    },
    // Fix missing spaces in return statements
    {
      pattern: /return\s*\(/g,
      replacement: 'return (',
    },
    // Fix missing spaces in if statements
    {
      pattern: /if\s*\(/g,
      replacement: 'if (',
    },
    // Fix missing spaces in for statements
    {
      pattern: /for\s*\(/g,
      replacement: 'for (',
    },
    // Fix missing spaces in while statements
    {
      pattern: /while\s*\(/g,
      replacement: 'while (',
    },
    // Fix missing spaces in switch statements
    {
      pattern: /switch\s*\(/g,
      replacement: 'switch (',
    },
    // Fix missing spaces in catch statements
    {
      pattern: /catch\s*\(/g,
      replacement: 'catch (',
    },
    // Fix missing spaces in try statements
    {
      pattern: /try\s*\{/g,
      replacement: 'try {',
    },
  ];

  let totalFixed = 0;

  function scanAndFix(dir) {
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanAndFix(fullPath);
        } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
          try {
            let content = fs.readFileSync(fullPath, 'utf8');
            const beforeContent = content;

            // Apply patterns
            for (const pattern of patterns) {
              content = content.replace(pattern.pattern, pattern.replacement);
            }

            if (content !== beforeContent) {
              fs.writeFileSync(fullPath, content, 'utf8');
              console.log(`✅ Fixed missing spaces in ${fullPath}`);
              totalFixed++;
            }
          } catch (error) {
            // Ignore file errors
          }
        }
      }
    } catch (error) {
      // Ignore directory access errors
    }
  }

  scanAndFix('src');
  console.log(`🎉 Fixed missing spaces in ${totalFixed} files`);
}

fixMissingSpaces().catch(console.error);
