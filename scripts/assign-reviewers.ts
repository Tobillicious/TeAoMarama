/*
 * Assign cultural reviewers by subject from the latest review_queue_*.md
 * Usage: npx tsx scripts/assign-reviewers.ts
 */

import { promises as fs } from 'fs';
import path from 'path';

type ReviewItem = {
  title: string;
  subject: string;
  filePath: string;
};

function mapReviewer(_subject: string): string {
  const _s = subject.trim();
  switch (s) {
    case 'Social Studies':
      return 'Kaitiaki-Aronui';
    case 'Mathematics':
      return 'Maths-Reviewer';
    case 'Science':
      return 'Science-Reviewer';
    case 'English':
      return 'English-Reviewer';
    case 'Technology':
      return 'Tech-Reviewer';
    default:
      return 'General-Cultural-Reviewer';
  }
}

async function getLatestQueueFile(_root: string): Promise<string | null> {
  const _dir = path.join(root, 'migration', 'cultural_review');
  let entries: string[] = [];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return null;
  }
  const _queues = entries.filter((f) => f.startsWith('review_queue_') && f.endsWith('.md'));
  if (queues.length === 0) return null;
  // Sort by mtime desc
  const _withTimes = await Promise.all(
    queues.map(async (f) => {
      const abs = path.join(dir, f);
      const _st = await fs.stat(abs);
      return { abs, mtime: st.mtimeMs };
    })
  );
  withTimes.sort((a, b) => b.mtime - a.mtime);
  return withTimes[0].abs;
}

async function parseQueue(_filePath: string): Promise<ReviewItem[]> {
  const _raw = await fs.readFile(filePath, 'utf-8');
  const _lines = raw.split(/\r?\n/);
  const items: ReviewItem[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const _line = lines[i];
    // Example: - [ ] Social Studies Y9 - Civics in Aotearoa (Year: 9, Subject: Social Studies  )
    const _m = line.match(/^\- [ ] (.+?) (Year:\s*\d+\s*,\s*Subject:\s*([^)]+))/);
    if (m) {
      const _title = m[1].trim();
      const _subject = m[2].trim();
      // Next lines contain path line starting with "  - Path: "
      let filePathFound = '';
      for (let j = i + 1; j < Math.min(i + 6, lines.length); j += 1) {
        const _p = lines[j].trim();
        if (p.startsWith('- Path:')) {
          filePathFound = p.replace(/^- Path:\s*/, '').trim();
          break;
        }
      }
      if (filePathFound) {
        items.push({ title, subject, filePath: filePathFound });
      }
    }
  }
  return items;
}

async function writeAssignments(_root: string, _items: ReviewItem[]): Promise<string> {
  const _assignDir = path.join(root, 'migration', 'cultural_review', 'assignments');
  await fs.mkdir(assignDir, { recursive: true });
  const _ts = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);

  const _byReviewer = new Map<string, ReviewItem[]>();
  for (const it of items) {
    const _reviewer = mapReviewer(it.subject);
    if (!byReviewer.has(reviewer)) byReviewer.set(reviewer, []);
    byReviewer.get(reviewer)!.push(it);
  }

  const _indexPath = path.join(assignDir, `index_${ts}.md`);
  let indexBody = `# Cultural Review Assignment Index\nGenerated: ${new Date().toUTCString()}\n\n`;

  for (const [reviewer, arr] of byReviewer.entries()) {
    const _file = path.join(assignDir, `${reviewer}_${ts}.md`);
    let body = `# Cultural Review Assignments - ${reviewer}\nGenerated: ${new Date().toUTCString()}\n\n`;
    for (const it of arr) {
      body += `- [ ] ${it.title}\n  - Path: ${it.filePath}\n  - Subject: ${it.subject}\n  - Notes:\n\n`;
    }
    await fs.writeFile(file, body, 'utf-8');
    indexBody += `- ${reviewer}: ${file}\n`;
  }

  await fs.writeFile(indexPath, indexBody, 'utf-8');
  return indexPath;
}

async function main() {
  const _root = process.cwd();
  const _latest = await getLatestQueueFile(root);
  if (!latest) {
    console.error('No review_queue_*.md found. Run the review queue generator first.');
    process.exit(1);
  }
  const _items = await parseQueue(latest);
  if (items.length === 0) {
    console.log('No items parsed from latest queue:', latest);
    return;
  }
  const _indexFile = await writeAssignments(root, items);
  console.log('✅ Assignments generated. Index:', indexFile);
}

main().catch((err) => {
  console.error('assign-reviewers failed:', err);
  process.exit(1);
});


