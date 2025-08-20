/*
 * Build Resources Script - Enhanced for Mihara
 * - Scans migration/recovered_resources for markdown files
 * - Copies them to public/resources preserving structure
 * - Generates public/resources/index.json with enhanced metadata
 * - Provides cultural content detection and priority assessment
 */
import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'fs/promises';
import path from 'path';

type ResourceIndexEntry = {
  id: string;
  title: string;
  relativePath: string; // path under public/resources
  category: string; // e.g., handouts/assessments
  sizeBytes: number;
  modifiedAt: string;
  // Enhanced metadata for Mihara
  subject?: string;
  yearLevel?: string;
  type?: string;
  culturalContent?: boolean;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  description?: string;
  tags?: string[];
};
const PROJECT_ROOT = process.cwd();
const SOURCE_ROOT = path.join(PROJECT_ROOT, 'migration', 'recovered_resources');
const PUBLIC_ROOT = path.join(PROJECT_ROOT, 'public');
const DEST_ROOT = path.join(PUBLIC_ROOT, 'resources');

// Subject mapping patterns
const SUBJECT_PATTERNS = {
  Mathematics: /math|mathematics|algebra|geometry|calculus|statistics/i,
  English: /english|literature|writing|reading|grammar|poetry/i,
  Science: /science|biology|chemistry|physics|experiment|lab/i,
  'Social Studies': /social|history|geography|civics|economics|society/i,
  'Te Reo Māori': /maori|te reo|tikanga|whakapapa|karakia/i,
  'Physical Education': /pe|physical|sport|fitness|health/i,
  Arts: /art|music|drama|dance|creative|visual/i,
  Technology: /technology|computing|digital|coding|programming/i,
  Languages: /language|french|spanish|german|japanese|chinese/i,
};

// Year level patterns
const YEAR_LEVEL_PATTERNS = {
  'Year 7': /year\s*7|y7|grade\s*7|level\s*7/i,
  'Year 8': /year\s*8|y8|grade\s*8|level\s*8/i,
  'Year 9': /year\s*9|y9|grade\s*9|level\s*9/i,
  'Year 10': /year\s*10|y10|grade\s*10|level\s*10/i,
  'Year 11': /year\s*11|y11|grade\s*11|level\s*11/i,
  'Year 12': /year\s*12|y12|grade\s*12|level\s*12/i,
  'Year 13': /year\s*13|y13|grade\s*13|level\s*13/i,
};

// Resource type patterns
const TYPE_PATTERNS = {
  lesson_plan: /lesson|plan|unit|curriculum/i,
  worksheet: /worksheet|activity|exercise|task/i,
  assessment: /assessment|test|quiz|exam|evaluation/i,
  handout: /handout|resource|material|guide/i,
  game: /game|interactive|play|fun/i,
  presentation: /presentation|slide|powerpoint/i,
};

// Cultural content indicators
const CULTURAL_INDICATORS = [
  /maori|māori/i,
  /tikanga/i,
  /whakapapa/i,
  /karakia/i,
  /waiata/i,
  /kapa haka/i,
  /marae/i,
  /iwi/i,
  /hapu/i,
  /whanau/i,
  /mana/i,
  /tapu/i,
  /noa/i,
  /aroha/i,
  /kia ora/i,
  /ka pai/i,
  /aotearoa/i,
  /te ao maori/i,
  /te reo/i,
  /cultural/i,
  /indigenous/i,
  /traditional/i,
];

async function ensureDir(dirPath: string): Promise<void> {
  await mkdir(dirPath, { recursive: true });
}

function toId(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\-_]+/g, '-')
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

function extractSubject(text: string): string | undefined {
  for (const [subject, pattern] of Object.entries(SUBJECT_PATTERNS)) {
    if (pattern.test(text)) {
      return subject;
    }
  }
  return undefined;
}

function extractYearLevel(text: string): string | undefined {
  for (const [yearLevel, pattern] of Object.entries(YEAR_LEVEL_PATTERNS)) {
    if (pattern.test(text)) {
      return yearLevel;
    }
  }
  return undefined;
}
function extractType(text: string): string | undefined {
  for (const [type, pattern] of Object.entries(TYPE_PATTERNS)) {
    if (pattern.test(text)) {
      return type;
    }
  }
  return undefined;
}

function detectCulturalContent(text: string): boolean {
  return CULTURAL_INDICATORS.some((pattern) => pattern.test(text));
}

function assessPriority(text: string, sizeBytes: number): 'low' | 'medium' | 'high' | 'urgent' {
  const hasCultural = detectCulturalContent(text);
  const isLarge = sizeBytes > 10000;
  const hasUrgentKeywords = /urgent|critical|important|priority/i.test(text);

  if (hasUrgentKeywords) return 'urgent';
  if (hasCultural && isLarge) return 'high';
  if (hasCultural || isLarge) return 'medium';
  return 'low';
}

function extractDescription(content: string): string {
  const lines = content.split(/\r?\n/);
  const descriptionLines = lines
    .slice(0, 10) // Look at first 10 lines
    .filter((line) => line.trim() && !line.startsWith('#') && !line.startsWith('---'))
    .slice(0, 3); // Take first 3 non-empty lines
  return (
    descriptionLines.join(' ').substring(0, 200) +
    (descriptionLines.join(' ').length > 200 ? '...' : '')
  );
}

function extractTags(content: string): string[] {
  const tags: string[] = [];
  const lines = content.split(/\r?\n/);

  // Look for tags in frontmatter or markdown
  for (const line of lines) {
    if (line.includes('tags: ') || line.includes('keywords:')) {
      const match = line.match(/tags?:\s*\[(.*?)\]/i) || line.match(/keywords?:\s*\[(.*?)\]/i);
      if (match) {
        tags.push(...match[1].split(',').map((t) => t.trim().replace(/['"]/g, '')));
      }
    }
  }

  // Extract common educational terms
  const educationalTerms = [
    'assessment',
    'activity',
    'lesson',
    'worksheet',
    'resource',
    'guide',
    'maori',
    'cultural',
    'indigenous',
    'traditional',
    'modern',
    'digital',
    'interactive',
    'collaborative',
    'individual',
    'group',
    'project',
  ];

  educationalTerms.forEach((term) => {
    if (content.toLowerCase().includes(term) && !tags.includes(term)) {
      tags.push(term);
    }
  });

  return tags.slice(0, 10); // Limit to 10 tags
}

async function extractTitleFromMarkdown(absFile: string): Promise<string> {
  try {
    const content = await readFile(absFile, 'utf-8');
    const lines = content.split(/\r?\n/);
    const heading = lines.find((l) => l.trim().startsWith('# '));
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
      const content = await readFile(src, 'utf-8');

      const relUnderPublic = path.join('resources', file.rel).replaceAll('\\', '/');
      const category = path.dirname(file.rel).split(path.sep)[0] || 'uncategorized';

      // Enhanced metadata extraction
      const subject = extractSubject(title + ' ' + content);
      const yearLevel = extractYearLevel(title + ' ' + content);
      const type = extractType(title + ' ' + content);
      const culturalContent = detectCulturalContent(title + ' ' + content);
      const priority = assessPriority(title + ' ' + content, st.size);
      const description = extractDescription(content);
      const tags = extractTags(content);

      index.push({
        id: toId(title || path.basename(file.rel, '.md')),
        title,
        relativePath: relUnderPublic,
        category,
        sizeBytes: st.size,
        modifiedAt: new Date(st.mtimeMs).toISOString(),
        subject,
        yearLevel,
        type,
        culturalContent,
        priority,
        description,
        tags,
      });
    }
  } catch (err) {
    console.error('Error while scanning resources: ', err);
    throw err;
  }

  // Write index.json
  const indexFile = path.join(DEST_ROOT, 'index.json');
  await writeFile(
    indexFile,
    JSON.stringify({ generatedAt: new Date().toISOString(), items: index }, null, 2),
    'utf-8',
  );

  // Enhanced reporting for Mihara
  const culturalCount = index.filter((r) => r.culturalContent).length;
  const highPriorityCount = index.filter(
    (r) => r.priority === 'high' || r.priority === 'urgent',
  ).length;
  const subjects = [...new Set(index.map((r) => r.subject).filter(Boolean))];
  const yearLevels = [...new Set(index.map((r) => r.yearLevel).filter(Boolean))];

  console.log(
    `✅ Resources prepared: ${index.length} items -> ${path.relative(PROJECT_ROOT, indexFile)}`,
  );
  console.log(`📊 Enhanced Metadata: `);
  console.log(`   - Cultural Resources: ${culturalCount}`);
  console.log(`   - High Priority: ${highPriorityCount}`);
  console.log(`   - Subjects: ${subjects.length} (${subjects.join(', ')})`);
  console.log(`   - Year Levels: ${yearLevels.length} (${yearLevels.join(', ')})`);
}

buildResources().catch((err) => {
  console.error('❌ build-resources failed: ', err);
  process.exitCode = 1;
});
