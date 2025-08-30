#!/usr/bin/env tsx
/**
 * Targeted TypeScript Error Fixer
 * Fixes the specific TS errors blocking our build
 */

import * as fs from 'fs';
import { execSync } from 'child_process';

console.log('🔧 Targeted TypeScript Fix Starting...');

// Fix the remaining TypeScript errors
const fixes = [
  {
    file: 'src/middleware/security.ts',
    fixes: [
      {
        search: 'context.user?.id',
        replace: 'context.user?.id || null'
      }
    ]
  },
  {
    file: 'vite.config.ts',
    fixes: [
      {
        search: 'fastRefresh: true,',
        replace: '// fastRefresh: true,'
      },
      {
        search: 'algorithm: \'gzip\',',
        replace: 'algorithms: [\'gzip\'],'
      },
      {
        search: 'algorithm: \'brotliCompress\',',
        replace: 'algorithms: [\'brotliCompress\'],'
      }
    ]
  }
];

for (const file of fixes) {
  if (fs.existsSync(file.file)) {
    let content = fs.readFileSync(file.file, 'utf8');
    for (const fix of file.fixes) {
      content = content.replace(fix.search, fix.replace);
    }
    fs.writeFileSync(file.file, content);
    console.log(`✅ Fixed ${file.file}`);
  }
}

console.log('🎯 Targeted fixes complete. Running typecheck...');

try {
  execSync('npm run typecheck', { stdio: 'inherit' });
  console.log('✅ TypeScript errors resolved!');
} catch {
  console.log('⚠️  Some TypeScript errors remain. Manual fixes needed.');
}