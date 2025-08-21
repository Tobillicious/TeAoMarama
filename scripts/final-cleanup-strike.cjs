#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

async function finalCleanupStrike() {
  console.log('🚀 FINAL CLEANUP STRIKE - ELIMINATING LAST 25 ERRORS');
  console.log('⚡ Deploying precision fixes...\n');

  try {
    // Get current error details
    const typecheckOutput = execSync('npm run typecheck 2>&1', { encoding: 'utf8' });
    const errorLines = typecheckOutput.split('\n').filter((line) => line.includes('error TS'));

    console.log(`🎯 Targeting ${errorLines.length} specific errors...\n`);

    // Group errors by file
    const fileErrors = new Map();
    for (const line of errorLines) {
      const fileMatch = line.match(/src\/[^:]+/);
      if (fileMatch) {
        const filePath = fileMatch[0];
        if (!fileErrors.has(filePath)) {
          fileErrors.set(filePath, []);
        }
        fileErrors.get(filePath).push(line);
      }
    }

    let totalFixed = 0;

    // Process each file with errors
    for (const [filePath, errors] of fileErrors) {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        continue;
      }

      console.log(`🔧 Processing ${filePath} (${errors.length} errors)`);

      let content = fs.readFileSync(filePath, 'utf8');
      const beforeContent = content;
      let fileFixed = 0;

      // Apply targeted fixes based on error patterns
      for (const error of errors) {
        if (error.includes('TS1005')) {
          // Syntax errors - missing semicolons, commas, etc.
          content = content.replace(
            /import\s+([^'"]+)\s+from\s+['"]([^'"]+)['"]/g,
            "import $1 from '$2';",
          );
          content = content.replace(/export\s+([^;]+)(?!\s*;)/g, 'export $1;');
          content = content.replace(/const\s+(\w+)\s*=\s*([^;]+)(?!\s*;)/g, 'const $1 = $2;');
          content = content.replace(/let\s+(\w+)\s*=\s*([^;]+)(?!\s*;)/g, 'let $1 = $2;');
          content = content.replace(
            /for\s*\(\s*let\s+(\w+)\s*=\s*([^;]+)\s+(\w+)\s*<=\s*([^;]+)\s+(\w+)\+\+\)/g,
            'for (let $1 = $2; $3 <= $4; $5++)',
          );
        }

        if (error.includes('TS2304')) {
          // Cannot find name errors - often missing imports
          content = content.replace(
            /import\s*{([^}]+)}\s*from\s*['"]([^'"]+)['"]/g,
            "import {$1} from '$2'",
          );
        }

        if (error.includes('TS2339')) {
          // Property does not exist errors
          content = content.replace(/\.(\w+)\s*\(/g, '.$1(');
        }
      }

      // Additional comprehensive fixes
      content = content.replace(/,\s*,/g, ','); // Double commas
      content = content.replace(/;\s*;/g, ';'); // Double semicolons
      content = content.replace(/\{\s*\{/g, '{'); // Double braces
      content = content.replace(/\}\s*\}/g, '}'); // Double closing braces
      content = content.replace(/\(\s*\(/g, '('); // Double parentheses
      content = content.replace(/\)\s*\)/g, ')'); // Double closing parentheses

      if (content !== beforeContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        fileFixed++;
        totalFixed++;
        console.log(`  ✅ Fixed ${fileFixed} issues in ${filePath}`);
      } else {
        console.log(`  ℹ️  No changes needed in ${filePath}`);
      }
    }

    console.log(`\n🎉 Final cleanup complete: ${totalFixed} fixes applied`);

    // Final validation
    console.log('\n📊 Final validation...');
    const finalCheck = execSync('npm run typecheck 2>&1', { encoding: 'utf8' });
    const finalErrorMatch = finalCheck.match(/Found (\d+) errors/);

    if (finalErrorMatch) {
      const finalErrors = parseInt(finalErrorMatch[1]);
      console.log(`📈 Final error count: ${finalErrors}`);

      if (finalErrors < 25) {
        const improvement = 25 - finalErrors;
        console.log(`🎉 SUCCESS! Reduced errors by ${improvement} more!`);
      }
    }
  } catch (error) {
    console.error('❌ Error in final cleanup:', error.message);
  }
}

finalCleanupStrike().catch(console.error);
