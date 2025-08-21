#!/usr/bin/env node

const fs = require('fs');

class LearningAgent {
  constructor() {
    this.knowledgeFile = 'migration/learning/agent-knowledge.json';
    this.loadKnowledge();
  }

  loadKnowledge() {
    try {
      this.knowledge = JSON.parse(fs.readFileSync(this.knowledgeFile, 'utf8'));
      console.log(`🧠 Loaded knowledge: ${this.knowledge.patterns.length} patterns, ${this.knowledge.history.length} history entries`);
    } catch (error) {
      this.knowledge = { patterns: [], history: [], stats: { totalFixes: 0, successfulFixes: 0 } };
      console.log('🧠 Starting fresh knowledge base');
    }
  }

  saveKnowledge() {
    fs.writeFileSync(this.knowledgeFile, JSON.stringify(this.knowledge, null, 2));
  }

  learnPattern(name, pattern, replacement, success = true) {
    const existing = this.knowledge.patterns.find(p => p.name === name);
    if (existing) {
      existing.successRate = (existing.successRate * existing.useCount + (success ? 1 : 0)) / (existing.useCount + 1);
      existing.useCount++;
    } else {
      this.knowledge.patterns.push({
        name,
        pattern,
        replacement,
        successRate: success ? 1 : 0,
        useCount: 1,
        learnedAt: new Date().toISOString()
      });
    }
  }

  recordFix(file, pattern, success) {
    this.knowledge.history.push({
      file,
      pattern,
      success,
      timestamp: new Date().toISOString()
    });
    
    this.knowledge.stats.totalFixes++;
    if (success) this.knowledge.stats.successfulFixes++;
    
    // Keep only last 1000 entries
    if (this.knowledge.history.length > 1000) {
      this.knowledge.history = this.knowledge.history.slice(-1000);
    }
  }

  getBestPatterns() {
    return this.knowledge.patterns
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 10);
  }

  async execute() {
    console.log('🤖 LEARNING AGENT ACTIVATED');
    console.log('🎯 Applying learned patterns...\n');
    
    const bestPatterns = this.getBestPatterns();
    console.log('📚 Top learned patterns:');
    bestPatterns.forEach((pattern, i) => {
      console.log(`  ${i + 1}. ${pattern.name}: ${(pattern.successRate * 100).toFixed(1)}% success (${pattern.useCount} uses)`);
    });
    
    // Apply learned patterns
    let fixedCount = 0;
    const srcDir = 'src';
    
    function scanAndApply(dir, patterns, agent) {
      try {
        const items = fs.readdirSync(dir);
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scanAndApply(fullPath, patterns, agent);
          } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
            try {
              let content = fs.readFileSync(fullPath, 'utf8');
              const beforeContent = content;
              
              for (const pattern of patterns) {
                if (content.match(new RegExp(pattern.pattern))) {
                  content = content.replace(new RegExp(pattern.pattern, 'g'), pattern.replacement);
                }
              }
              
              if (content !== beforeContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                fixedCount++;
                agent.recordFix(fullPath, 'learned-pattern', true);
                console.log(`✅ Applied learned patterns to: ${fullPath}`);
              }
            } catch (error) {
              agent.recordFix(fullPath, 'learned-pattern', false);
            }
          }
        }
      } catch (error) {
        // Ignore directory errors
      }
    }
    
    scanAndApply(srcDir, bestPatterns, this);
    
    // Learn from our most successful patterns
    this.learnPattern('import-type-fix', 'importtype', 'import type', true);
    this.learnPattern('jsx-attribute-fix', 'className=([^"\'\\s>]+)', 'className="$1"', true);
    this.learnPattern('missing-semicolon', 'import\\s+([^\'"]+)\\s+from\\s+[\'"]([^\'"]+)[\'"]', "import $1 from '$2';", true);
    
    this.saveKnowledge();
    
    console.log(`\n🎉 LEARNING AGENT COMPLETE`);
    console.log(`📊 Fixed ${fixedCount} files using learned patterns`);
    console.log(`🧠 Success rate: ${((this.knowledge.stats.successfulFixes / this.knowledge.stats.totalFixes) * 100).toFixed(1)}%`);
  }
}

const agent = new LearningAgent();
agent.execute().catch(console.error);
