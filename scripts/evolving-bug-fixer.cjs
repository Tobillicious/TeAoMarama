#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class EvolvingBugFixer {
  constructor() {
    this.learningData = {
      successfulPatterns: [],
      errorPatterns: [],
      fixHistory: [],
    };
    this.loadLearningData();
  }

  loadLearningData() {
    try {
      if (fs.existsSync('migration/learning-data.json')) {
        this.learningData = JSON.parse(fs.readFileSync('migration/learning-data.json', 'utf8'));
        console.log(`📚 Loaded ${this.learningData.successfulPatterns.length} learned patterns`);
      }
    } catch (error) {
      console.log('📚 Starting fresh learning data');
    }
  }

  saveLearningData() {
    try {
      fs.writeFileSync('migration/learning-data.json', JSON.stringify(this.learningData, null, 2));
    } catch (error) {
      console.log('⚠️ Could not save learning data');
    }
  }

  async analyzeCurrentErrors() {
    console.log('🔍 Analyzing current error patterns...');

    try {
      const { execSync } = require('child_process');
      const output = execSync('npm run typecheck 2>&1', { encoding: 'utf8' });

      const errorLines = output.split('\n').filter((line) => line.includes('error TS'));
      const errorCounts = {};

      errorLines.forEach((line) => {
        const match = line.match(/error TS(\d+):/);
        if (match) {
          const code = match[1];
          errorCounts[code] = (errorCounts[code] || 0) + 1;
        }
      });

      console.log('📊 Current Error Distribution:');
      Object.entries(errorCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .forEach(([code, count]) => {
          console.log(`  TS${code}: ${count} errors`);
        });

      return errorCounts;
    } catch (error) {
      console.log('⚠️ Could not analyze errors');
      return {};
    }
  }

  generateEvolvingPatterns() {
    console.log('🧬 Generating evolving patterns...');

    const basePatterns = [
      {
        name: 'import-type-fix',
        pattern: /importtype/g,
        replacement: 'import type',
        priority: 1,
      },
      {
        name: 'jsx-attribute-fix',
        pattern: /className=([^"'\s>]+)/g,
        replacement: 'className="$1"',
        priority: 1,
      },
      {
        name: 'missing-semicolon',
        pattern: /import\s+([^'"]+)\s+from\s+['"]([^'"]+)['"]/g,
        replacement: "import $1 from '$2';",
        priority: 2,
      },
      {
        name: 'malformed-jsx',
        pattern: /return\s*\(_</g,
        replacement: 'return (<',
        priority: 1,
      },
      {
        name: 'double-comma',
        pattern: /,\s*,/g,
        replacement: ',',
        priority: 3,
      },
    ];

    // Add learned patterns
    const allPatterns = [...basePatterns, ...this.learningData.successfulPatterns];

    // Sort by priority and success rate
    allPatterns.sort((a, b) => {
      const aScore = (a.priority || 1) * (a.successRate || 0.5);
      const bScore = (b.priority || 1) * (b.successRate || 0.5);
      return bScore - aScore;
    });

    console.log(
      `🎯 Generated ${allPatterns.length} patterns (${this.learningData.successfulPatterns.length} learned)`,
    );
    return allPatterns;
  }

  async applyEvolvingFixes(patterns) {
    console.log('⚡ Applying evolving fixes...');

    let totalFixed = 0;
    let successfulFixes = 0;

    function scanAndFix(dir, patterns, fixer) {
      try {
        const items = fs.readdirSync(dir);
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            scanAndFix(fullPath, patterns, fixer);
          } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
            try {
              let content = fs.readFileSync(fullPath, 'utf8');
              const beforeContent = content;
              let fileFixed = false;

              for (const pattern of patterns) {
                if (content.match(pattern.pattern)) {
                  const newContent = content.replace(pattern.pattern, pattern.replacement);
                  if (newContent !== content) {
                    content = newContent;
                    fileFixed = true;

                    // Record successful pattern
                    fixer.recordSuccessfulPattern(pattern);
                  }
                }
              }

              if (fileFixed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                totalFixed++;
                successfulFixes++;
                console.log(`✅ Fixed: ${fullPath}`);
              }
            } catch (error) {
              console.log(`❌ Failed: ${fullPath}`);
            }
          }
        }
      } catch (error) {
        // Ignore directory errors
      }
    }

    scanAndFix('src', patterns, this);

    console.log(`📊 Fixed ${successfulFixes} files`);
    return { totalFixed, successfulFixes };
  }

  recordSuccessfulPattern(pattern) {
    // Check if pattern already exists
    const existing = this.learningData.successfulPatterns.find((p) => p.name === pattern.name);
    if (existing) {
      existing.successRate = (existing.successRate || 0.5) * 0.9 + 0.1; // Moving average
      existing.useCount = (existing.useCount || 0) + 1;
    } else {
      this.learningData.successfulPatterns.push({
        ...pattern,
        successRate: 0.8,
        useCount: 1,
        learnedAt: new Date().toISOString(),
      });
    }
  }

  async execute() {
    console.log('🧬 EVOLVING BUG FIXER ACTIVATED');
    console.log('🎯 Learning and adapting with each fix\n');

    // Step 1: Analyze current errors
    const errorCounts = await this.analyzeCurrentErrors();

    // Step 2: Generate evolving patterns
    const patterns = this.generateEvolvingPatterns();

    // Step 3: Apply fixes
    const results = await this.applyEvolvingFixes(patterns);

    // Step 4: Save learning data
    this.saveLearningData();

    console.log('\n🎉 EVOLVING BUG FIXER COMPLETE');
    console.log(`📊 Results: ${results.successfulFixes} files fixed`);
    console.log(`🧠 Learning: ${this.learningData.successfulPatterns.length} patterns learned`);
    console.log(`💾 Knowledge saved for next evolution`);
  }
}

// Execute the evolving bug fixer
const evolvingFixer = new EvolvingBugFixer();
evolvingFixer.execute().catch(console.error);
