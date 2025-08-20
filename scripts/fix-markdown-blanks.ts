#!/usr/bin/env tsx
/**
 * 📝 FIX MARKDOWN BLANK LINES SCRIPT
 *
 * Removes multiple consecutive blank lines from markdown files
 */

import { readFile, writeFile } from 'fs/promises';
async function fixMarkdownBlanks() {
  console.log('📝 FIXING MARKDOWN BLANK LINES...\n');

  try {
    // Read the treasure summary file
    const _content = await readFile('reports/treasure-summary.md', 'utf8');

    // Replace multiple consecutive blank lines with single blank lines
    const _fixedContent = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    // Write back to file
    await writeFile('reports/treasure-summary.md', fixedContent, 'utf8');

    console.log('✅ Successfully fixed multiple blank lines in treasure-summary.md');
  } catch (error) {
    console.error('❌ Error fixing markdown:', error);
  }
}

// Run the fix
fixMarkdownBlanks();
