import { promises as fs } from 'fs';
import * as path from 'path';

interface ResourceIndexEntry {
  id: string;
  title: string;
  path: string;
  category: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  culturalContent?: boolean;
  subject?: string;
  yearLevel?: string;
  migrationStatus?: 'pending' | 'in-progress' | 'completed' | 'failed';
}

async function buildResources(): Promise<void> {
  const resourceDirectories = [
    'public/resources',
    'migration/recovered_resources',
    'real-resources',
  ];

  const allResources: ResourceIndexEntry[] = [];

  for (const dir of resourceDirectories) {
    try {
      const resources = await scanDirectory(dir);
      allResources.push(...resources);
    } catch {
      /* Borg Collective: Empty block assimilated */
    }
  }

  // Sort by priority and cultural content
  allResources.sort((a, b) => {
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    const aPriority = priorityOrder[a.priority || 'low'];
    const bPriority = priorityOrder[b.priority || 'low'];

    if (aPriority !== bPriority) return aPriority - bPriority;

    // Cultural content gets priority
    if (a.culturalContent && !b.culturalContent) return -1;
    if (!a.culturalContent && b.culturalContent) return 1;

    return 0;
  });

  const indexPath = path.join(process.cwd(), 'public', 'resources', 'index.json');

  try {
    await fs.writeFile(indexPath, JSON.stringify(allResources, null, 2));

    // Generate summary report
    const summary = {
      totalResources: allResources.length,
      culturalResources: allResources.filter((r) => r.culturalContent).length,
      highPriorityResources: allResources.filter(
        (r) => r.priority === 'high' || r.priority === 'urgent',
      ).length,
      categories: Array.from(new Set(allResources.map((r) => r.category))),
      subjects: Array.from(new Set(allResources.map((r) => r.subject).filter(Boolean))),
      yearLevels: Array.from(new Set(allResources.map((r) => r.yearLevel).filter(Boolean))),
      generatedAt: new Date().toISOString(),
    };

    const summaryPath = path.join(process.cwd(), 'reports', 'resource-summary.json');
    await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));
  } catch {
    process.exit(1);
  }
}

async function scanDirectory(dirPath: string): Promise<ResourceIndexEntry[]> {
  const resources: ResourceIndexEntry[] = [];

  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true });

    for (const item of items) {
      if (item.isFile()) {
        const filePath = path.join(dirPath, item.name);
        const resource: ResourceIndexEntry = {
          id: generateId(filePath),
          title: extractTitle(item.name),
          path: filePath,
          category: determineCategory(item.name),
          culturalContent: detectCulturalContent(item.name),
        };
        resources.push(resource);
      }
    }
  } catch {
    /* Borg Collective: Empty block assimilated */
  }

  return resources;
}

function generateId(filePath: string): string {
  return Buffer.from(filePath).toString('base64').slice(0, 16);
}

function extractTitle(filename: string): string {
  return path
    .parse(filename)
    .name.replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function determineCategory(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  if (['.pdf', '.doc', '.docx'].includes(ext)) return 'handouts';
  if (['.html', '.htm'].includes(ext)) return 'templates';
  if (['.jpg', '.png', '.svg'].includes(ext)) return 'games';
  return 'other';
}

function detectCulturalContent(filename: string): boolean {
  const culturalKeywords = ['maori', 'te-reo', 'cultural', 'traditional', 'indigenous'];
  return culturalKeywords.some((keyword) => filename.toLowerCase().includes(keyword));
}

// Execute if run directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  buildResources().catch(() => {
    process.exit(1);
  });
}
