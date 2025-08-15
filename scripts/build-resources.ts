/*
 * Build Resources Script
 * - Scans migration/recovered_resources for markdown files
 * - Copies them to public/resources preserving structure
 * - Generates public/resources/index.json with metadata
 */

import { mkdir, readdir, readFile, stat, writeFile, copyFile } from 'fs/promises';
import path from 'path';

type ResourceIndexEntry = {
  id: string;
  title: string;
  relativePath: string; // path under public/resources
  category: string; // e.g., handouts/assessments
  sizeBytes: number;
  modifiedAt: string;
};

const PROJECT_ROOT = process.cwd();
const SOURCE_ROOT = path.join(PROJECT_ROOT, 'migration', 'recovered_resources');
const PUBLIC_ROOT = path.join(PROJECT_ROOT, 'public');
const DEST_ROOT = path.join(PUBLIC_ROOT, 'resources');

async function ensureDir(dirPath: string): Promise<void> {
  await mkdir(dirPath, { recursive: true });
}

function toId(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\-\_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function* walk(dir: string, relative = ''): AsyncGenerator<{ abs: string; rel: string }> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    const rel = path.join(relative, entry.name);
    if (entry.isDirectory()) {
      yield* walk(abs, rel);
    } else {
      yield { abs, rel };
    }
  }
}

async function extractTitleFromMarkdown(absFile: string): Promise<string> {
  try {
    const content = await readFile(absFile, 'utf-8');
    const lines = content.split(/\r?\n/);
    const heading = lines.find(l => l.trim().startsWith('# '));
    return heading ? heading.replace(/^#\s+/, '').trim() : path.basename(absFile);
  } catch {
    return path.basename(absFile);
  }
}

async function buildResources(): Promise<void> {
  await ensureDir(PUBLIC_ROOT);
  await ensureDir(DEST_ROOT);

  const index: ResourceIndexEntry[] = [];

  // Copy markdown files and build index
  try {
    for await (const file of walk(SOURCE_ROOT)) {
      if (!file.rel.toLowerCase().endsWith('.md')) continue;

      const src = file.abs;
      const dst = path.join(DEST_ROOT, file.rel);
      const dstDir = path.dirname(dst);
      await ensureDir(dstDir);
      await copyFile(src, dst);

      const st = await stat(src);
      const title = await extractTitleFromMarkdown(src);

      const relUnderPublic = path.join('resources', file.rel).replaceAll('\\', '/');
      const category = path.dirname(file.rel).split(path.sep)[0] || 'uncategorized';

      index.push({
        id: toId(title || path.basename(file.rel, '.md')),
        title,
        relativePath: relUnderPublic,
        category,
        sizeBytes: st.size,
        modifiedAt: new Date(st.mtimeMs).toISOString()
      });
    }
  } catch (err) {
    console.error('Error while scanning resources:', err);
    throw err;
  }

  // Write index.json
  const indexFile = path.join(DEST_ROOT, 'index.json');
  await writeFile(indexFile, JSON.stringify({ generatedAt: new Date().toISOString(), items: index }, null, 2), 'utf-8');
  console.log(`✅ Resources prepared: ${index.length} items -> ${path.relative(PROJECT_ROOT, indexFile)}`);
}

buildResources().catch(err => {
  console.error('❌ build-resources failed:', err);
  process.exitCode = 1;
});


