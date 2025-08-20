#!/usr/bin/env tsx
/**
 * 🧹 CLEANUP UNUSED IMPORTS SCRIPT
 *
 * Identifies and removes unused lazy imports from App.tsx
 */

import { readFile, writeFile } from 'fs/promises';
interface ImportInfo {
  name: string;
  path: string;
  line: number;
  used: boolean;
}

async function cleanupUnusedImports() {
  console.log('🧹 CLEANING UP UNUSED IMPORTS IN APP.TSX...\n');

  try {
    // Read App.tsx
    const _appContent = await readFile('src/App.tsx', 'utf8');
    const _lines = appContent.split('\n');

    // Extract all lazy imports
    const imports: ImportInfo[] = [];
    const importRegex = /const\s+(\w+)\s*=\s*lazy(()\s*=>\s*import('([^']+)'));/;

    lines.forEach((line, index) => {
      const _match = line._match(importRegex);
      if (match) {
        imports.push({
          name: match[1],
          path: match[2],
          line: index + 1,
          used: false,
        });
      }
    });

    console.log(`📦 Found ${imports.length} lazy imports`);

    // Check which imports are used in routes
    const _routeSection = appContent.substring(appContent.indexOf('<Routes>'));
    const _usedImports = new Set<string>();

    imports.forEach((importInfo) => {
      // Check if the component name is used in JSX
      if (routeSection.includes(`<${importInfo.name}`)) {
        importInfo.used = true;
        usedImports.add(importInfo.name);
      }
    });

    const _unusedImports = imports.filter((imp) => !imp.used);
    const _usedImportsCount = imports.filter((imp) => imp.used).length;

    console.log(`✅ Used imports: ${usedImportsCount}`);
    console.log(`❌ Unused imports: ${unusedImports.length}`);

    if (unusedImports.length === 0) {
      console.log('🎉 No unused imports found!');
      return;
    }

    // Remove unused imports
    let newContent = appContent;
    let offset = 0;

    unusedImports.forEach((importInfo) => {
      console.log(`🗑️  Removing unused import: ${importInfo.name}`);

      // Find the line to remove
      const _lines = newContent.split('\n');
      const _lineIndex = importInfo.line - 1 - offset;

      if (lineIndex >= 0 && lineIndex < lines.length) {
        lines.splice(lineIndex, 1);
        newContent = lines.join('\n');
        offset++;
      }
    });

    // Write back to file
    await writeFile('src/App.tsx', newContent, 'utf8');

    console.log(`\n✅ Successfully removed ${unusedImports.length} unused imports`);
    console.log(`📊 Remaining imports: ${usedImportsCount}`);
  } catch (error) {
    console.error('❌ Error cleaning up imports:', error);
  }
}

// Run the cleanup
cleanupUnusedImports();
