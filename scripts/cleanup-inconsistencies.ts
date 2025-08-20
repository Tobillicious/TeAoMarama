#!/usr/bin/env tsx
/**
 * 🧹 CLEANUP INCONSISTENCIES - FIX LOST RESOURCES AND DUPLICATES
 */

import { readdir, unlink } from 'fs/promises';
import { join } from 'path';

const TARGET_PATH = 'src/components/educational/handouts';

async function cleanupInconsistencies(): Promise<void> {
  console.log('🧹 CLEANUP INCONSISTENCIES STARTED');

  try {
    const files = await readdir(TARGET_PATH);

    // Group files by base name
    const fileGroups = new Map<string, string[]>();

    for (const file of files) {
      const baseName = file.replace(/\.(tsx|css)$/, '');
      if (!fileGroups.has(baseName)) {
        fileGroups.set(baseName, []);
      }
      fileGroups.get(baseName)!.push(file);
    }

    console.log(`📊 Found ${fileGroups.size} unique component groups`);

    let duplicatesRemoved = 0;
    let orphanedFilesRemoved = 0;

    // Process each group
    for (const [baseName, groupFiles] of fileGroups) {
      const tsxFiles = groupFiles.filter((f) => f.endsWith('.tsx'));
      const cssFiles = groupFiles.filter((f) => f.endsWith('.css'));

      // If we have multiple .tsx files, keep the most recent one
      if (tsxFiles.length > 1) {
        console.log(`🔄 Multiple .tsx files found for ${baseName}: ${tsxFiles.join(', ')}`);

        // Keep the first one, remove the rest
        for (let i = 1; i < tsxFiles.length; i++) {
          const filePath = join(TARGET_PATH, tsxFiles[i]);
          await unlink(filePath);
          console.log(`🗑️ Removed duplicate: ${tsxFiles[i]}`);
          duplicatesRemoved++;
        }
      }

      // If we have multiple .css files, keep the most recent one
      if (cssFiles.length > 1) {
        console.log(`🔄 Multiple .css files found for ${baseName}: ${cssFiles.join(', ')}`);

        // Keep the first one, remove the rest
        for (let i = 1; i < cssFiles.length; i++) {
          const filePath = join(TARGET_PATH, cssFiles[i]);
          await unlink(filePath);
          console.log(`🗑️ Removed duplicate: ${cssFiles[i]}`);
          duplicatesRemoved++;
        }
      }

      // Check for orphaned files (CSS without TSX or vice versa)
      if (tsxFiles.length === 0 && cssFiles.length > 0) {
        console.log(`⚠️ Orphaned CSS files found for ${baseName}: ${cssFiles.join(', ')}`);
        for (const cssFile of cssFiles) {
          const filePath = join(TARGET_PATH, cssFile);
          await unlink(filePath);
          console.log(`🗑️ Removed orphaned CSS: ${cssFile}`);
          orphanedFilesRemoved++;
        }
      }

      if (cssFiles.length === 0 && tsxFiles.length > 0) {
        console.log(`⚠️ Orphaned TSX files found for ${baseName}: ${tsxFiles.join(', ')}`);
        for (const tsxFile of tsxFiles) {
          const filePath = join(TARGET_PATH, tsxFile);
          await unlink(filePath);
          console.log(`🗑️ Removed orphaned TSX: ${tsxFile}`);
          orphanedFilesRemoved++;
        }
      }
    }

    // Get final count
    const finalFiles = await readdir(TARGET_PATH);
    const finalComponents = finalFiles.filter((f) => f.endsWith('.tsx')).length;

    console.log('🎯 CLEANUP COMPLETE!');
    console.log(`📊 Final component count: ${finalComponents}`);
    console.log(`🗑️ Duplicates removed: ${duplicatesRemoved}`);
    console.log(`🗑️ Orphaned files removed: ${orphanedFilesRemoved}`);
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
  }
}

if (import.meta.main) {
  cleanupInconsistencies();
}
