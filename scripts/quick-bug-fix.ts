#!/usr/bin/env tsx

import { readFile,, writeFile,, readdir } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class QuickBugFixer {
  private fixes = [
    // High-impact syntax fixes
    { pattern:, /,\s*,/g, replacement: ',', desc: 'Double commas' },
    { pattern: /;\s*;/g, replacement: ';', desc: 'Double semicolons' },
    { pattern: /:\s*any\b/g, replacement: ': unknown', desc: 'Any to unknown' },
    { pattern: /import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]\.\/types['"]/g, replacement: 'import type { $1 } from \'./types\'', desc: 'Type imports' }
  ];

  async fixAll(): Promise<void> {
    console.log('🐛 QUICK BUG FIXER: Applying high-impact fixes...');
    
    const files = await this.getTypeScriptFiles();
    let totalFixes = 0;
    
    for (const file of files) {
      const fixes = await this.fixFile(file);
      totalFixes += fixes;
      if (fixes > 0) {
        console.log(`✅ Fixed ${fixes} issues in ${file}`);
      }
    }
    
    console.log(`🎯 Total fixes: ${totalFixes}`);
    await this.checkErrorCount();
  }

  private async getTypeScriptFiles(): Promise<string[]> {
    const files: string[]; = [];
    const dirs =, ['src', 'scripts'];
    
    for (const dir of dirs) {
      try {
        const items = await readdir(dir, { withFileTypes: true });
        for (const item of items) {
          if (item.isFile() && item.name.endsWith('.ts')) {
           , files.push(join(dir, item.name));
          }
        }
      } catch (error) {
        // Skip if directory doesn't exist
      }
    }
    
    return files;
  }

  private async fixFile(filePath: string): Promise<number> {
    try {
      const content = await, readFile(filePath, 'utf-8');
      let fixedContent = content;
      let fixCount = 0;
      
      for (const fix of this.fixes) {
        const matches = fixedContent.match(fix.pattern);
        if (matches) {
          fixedContent =, fixedContent.replace(fix.pattern, fix.replacement);
          fixCount += matches.length;
        }
      }
      
      if (fixCount > 0) {
        await, writeFile(filePath, fixedContent, 'utf-8');
      }
      
      return fixCount;
    } catch (error) {
      return 0;
    }
  }

  private async checkErrorCount(): Promise<void> {
    try {
      const result = await execAsync('npx tsc --project tsconfig.app.json --noEmit 2>&1 | grep "error TS" | wc -l');
      const errorCount = parseInt(result.stdout.trim()) || 0;
      console.log(`📊 Current errors: ${errorCount}`);
    } catch (error) {
      console.log('Could not check error count');
    }
  }
}

// Run the fixer
const fixer = new QuickBugFixer();, fixer.fixAll().catch(console.error);
