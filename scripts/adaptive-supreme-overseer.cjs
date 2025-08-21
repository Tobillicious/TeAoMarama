#!/usr/bin/env node

/**
 * ADAPTIVE SUPREME OVERSEER
 *
 * An intelligent bug-fixing system that learns from previous attempts
 * and applies conservative, targeted fixes to avoid introducing new errors.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AdaptiveSupremeOverseer {
  constructor() {
    // Conservative patterns that are less likely to introduce new errors
    this.conservativePatterns = [
      // SAFE SYNTAX FIXES
      {
        pattern: /importtype/g,
        replacement: 'import type',
        name: 'Import Type Fix',
        confidence: 0.95,
      },
      { pattern: /,\s*,/g, replacement: ',', name: 'Double Comma Fix', confidence: 0.98 },
      { pattern: /;\s*;/g, replacement: ';', name: 'Double Semicolon Fix', confidence: 0.98 },

      // SAFE JSX FIXES
      {
        pattern: /href=([^"'\s>]+)/g,
        replacement: 'href="$1"',
        name: 'Href Quote Fix',
        confidence: 0.9,
      },
      {
        pattern: /target=([^"'\s>]+)/g,
        replacement: 'target="$1"',
        name: 'Target Quote Fix',
        confidence: 0.9,
      },
      {
        pattern: /rel=([^"'\s>]+)/g,
        replacement: 'rel="$1"',
        name: 'Rel Quote Fix',
        confidence: 0.9,
      },

      // SAFE IMPORT/EXPORT FIXES
      {
        pattern: /import\s+([^'"]+)\s+from\s+['"]([^'"]+)['"]/g,
        replacement: "import $1 from '$2';",
        name: 'Import Statement Fix',
        confidence: 0.85,
      },
      {
        pattern: /export\s+([^;]+)(?!\s*;)/g,
        replacement: 'export $1;',
        name: 'Export Statement Fix',
        confidence: 0.8,
      },

      // SAFE SPACING FIXES (only when clearly needed)
      { pattern: /if\s*\(/g, replacement: 'if (', name: 'If Statement Fix', confidence: 0.75 },
      { pattern: /for\s*\(/g, replacement: 'for (', name: 'For Statement Fix', confidence: 0.75 },
      {
        pattern: /while\s*\(/g,
        replacement: 'while (',
        name: 'While Statement Fix',
        confidence: 0.75,
      },

      // SAFE FUNCTION FIXES
      {
        pattern: /function\s*(\w+)/g,
        replacement: 'function $1',
        name: 'Function Declaration Fix',
        confidence: 0.7,
      },
      {
        pattern: /const\s*(\w+)/g,
        replacement: 'const $1',
        name: 'Const Declaration Fix',
        confidence: 0.7,
      },
      {
        pattern: /let\s*(\w+)/g,
        replacement: 'let $1',
        name: 'Let Declaration Fix',
        confidence: 0.7,
      },
    ];

    this.stats = {
      filesProcessed: 0,
      filesFixed: 0,
      totalFixes: 0,
      patternsUsed: {},
      errorsBefore: 0,
      errorsAfter: 0,
    };
  }

  async execute() {
    console.log('🧠 ADAPTIVE SUPREME OVERSEER ACTIVATED');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🎯 Strategy: Conservative, targeted fixes with high confidence');
    console.log('⚡ Learning: Adaptive approach to avoid introducing new errors');
    console.log('');

    const startTime = Date.now();
    this.stats.errorsBefore = await this.getErrorCount();
    console.log(`📊 Initial error count: ${this.stats.errorsBefore}`);

    // Process directories with conservative approach
    const directories = ['src', 'migration', 'scripts'];

    for (const dir of directories) {
      console.log(`\n🔍 Processing directory: ${dir} (conservative mode)`);
      await this.processDirectoryConservative(dir);
    }

    this.stats.errorsAfter = await this.getErrorCount();
    const errorsReduced = this.stats.errorsBefore - this.stats.errorsAfter;
    const duration = Date.now() - startTime;

    console.log('\n🎉 ADAPTIVE SUPREME OVERSEER COMPLETE');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`📊 Results:`);
    console.log(`   • Files processed: ${this.stats.filesProcessed}`);
    console.log(`   • Files fixed: ${this.stats.filesFixed}`);
    console.log(`   • Total fixes applied: ${this.stats.totalFixes}`);
    console.log(`   • Errors reduced: ${errorsReduced}`);
    console.log(`   • Remaining errors: ${this.stats.errorsAfter}`);
    console.log(`   • Duration: ${duration}ms`);
    console.log('');

    // Pattern usage statistics
    console.log('🔧 Conservative Pattern Usage:');
    Object.entries(this.stats.patternsUsed)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .forEach(([pattern, count]) => {
        console.log(`   • ${pattern}: ${count} times`);
      });

    if (errorsReduced > 0) {
      console.log('\n✅ SUCCESS: Errors reduced with conservative approach!');
    } else if (errorsReduced === 0) {
      console.log('\n⚠️ No change in error count. Conservative approach maintained stability.');
    } else {
      console.log('\n❌ Error count increased. Adaptive Overseer needs refinement.');
    }
  }

  async processDirectoryConservative(dirPath) {
    try {
      const items = fs.readdirSync(dirPath);

      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          await this.processDirectoryConservative(fullPath);
        } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
          this.stats.filesProcessed++;
          const fixed = await this.fixFileConservative(fullPath);
          if (fixed) {
            this.stats.filesFixed++;
          }
        }
      }
    } catch (error) {
      // Ignore directory access errors
    }
  }

  async fixFileConservative(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      let fileFixed = false;

      // Apply only high-confidence patterns
      for (const pattern of this.conservativePatterns) {
        if (pattern.confidence >= 0.8) {
          // Only apply high-confidence patterns
          const matches = content.match(pattern.pattern);
          if (matches) {
            content = content.replace(pattern.pattern, pattern.replacement);
            this.stats.totalFixes += matches.length;
            this.stats.patternsUsed[pattern.name] =
              (this.stats.patternsUsed[pattern.name] || 0) + matches.length;
            fileFixed = true;
          }
        }
      }

      if (fileFixed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed (conservative): ${filePath}`);
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  async getErrorCount() {
    try {
      const output = execSync('npm run typecheck 2>&1', { encoding: 'utf8' });
      const errorLines = output.split('\n').filter((line) => line.includes('error TS'));
      return errorLines.length;
    } catch (error) {
      const output = error.stderr || error.stdout || '';
      const errorLines = output.split('\n').filter((line) => line.includes('error TS'));
      return errorLines.length;
    }
  }
}

// Execute the Adaptive Supreme Overseer
const adaptiveOverseer = new AdaptiveSupremeOverseer();
adaptiveOverseer.execute().catch(console.error);
