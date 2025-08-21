#!/usr/bin/env tsx

/*
 * Build Resources Script - Enhanced for 6k Changes
 * Creates a comprehensive resource index for the application
 */

import { readdir, readFile, stat, writeFile } from 'fs/promises';
import path from 'path';

type ResourceIndexEntry = {
  id: string;
  title: string;
  relativePath: string;
  category: string;
  sizeBytes: number;
  modifiedAt: string;
  subject?: string;
  yearLevel?: string;
  type?: string;
  culturalContent?: boolean;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  description?: string;
  tags?: string[];
  migrationStatus?: 'pending' | 'in-progress' | 'completed' | 'failed';
  culturalReviewStatus?: 'pending' | 'approved' | 'needs-revision' | 'rejected';
};

interface ResourceScanner {
  scanDirectory(dirPath: string): Promise<ResourceIndexEntry[]>;
  detectCulturalContent(content: string): boolean;
  categorizePriority(entry: ResourceIndexEntry): 'low' | 'medium' | 'high' | 'urgent';
  extractMetadata(filePath: string, content: string): Partial<ResourceIndexEntry>;
}

class EnhancedResourceScanner implements ResourceScanner {
  private culturalKeywords = [
    'maori',
    'māori',
    'tikanga',
    'kawa',
    'whakapapa',
    'mana',
    'tapu',
    'noa',
    'whānau',
    'iwi',
    'hapu',
    'marae',
    'kapa haka',
    'waiata',
    'karakia',
    'pūrākau',
    'kōrero',
    'te reo',
    'te ao māori',
    'mātauranga',
    'rāhui',
    'kaitiakitanga',
    'manaakitanga',
    'whanaungatanga',
    'kotahitanga',
  ];

  private subjectKeywords = {
    math: ['mathematics', 'math', 'algebra', 'geometry', 'calculus', 'statistics'],
    science: ['science', 'biology', 'chemistry', 'physics', 'experiment'],
    english: ['english', 'literature', 'writing', 'reading', 'grammar'],
    'social-studies': ['social studies', 'history', 'geography', 'civics'],
    'te-reo': ['te reo', 'māori language', 'te reo māori'],
    art: ['art', 'visual arts', 'drawing', 'painting', 'sculpture'],
    music: ['music', 'singing', 'instruments', 'composition'],
    pe: ['physical education', 'sport', 'fitness', 'health'],
  };

  private yearLevelPatterns = {
    'year-1': /year\s*1|y1|grade\s*1|level\s*1/i,
    'year-2': /year\s*2|y2|grade\s*2|level\s*2/i,
    'year-3': /year\s*3|y3|grade\s*3|level\s*3/i,
    'year-4': /year\s*4|y4|grade\s*4|level\s*4/i,
    'year-5': /year\s*5|y5|grade\s*5|level\s*5/i,
    'year-6': /year\s*6|y6|grade\s*6|level\s*6/i,
    'year-7': /year\s*7|y7|grade\s*7|level\s*7/i,
    'year-8': /year\s*8|y8|grade\s*8|level\s*8/i,
    'year-9': /year\s*9|y9|grade\s*9|level\s*9/i,
    'year-10': /year\s*10|y10|grade\s*10|level\s*10/i,
    'year-11': /year\s*11|y11|grade\s*11|level\s*11/i,
    'year-12': /year\s*12|y12|grade\s*12|level\s*12/i,
    'year-13': /year\s*13|y13|grade\s*13|level\s*13/i,
  };

  async scanDirectory(dirPath: string): Promise<ResourceIndexEntry[]> {
    const resources: ResourceIndexEntry[] = [];

    try {
      const items = await readdir(dirPath, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dirPath, item.name);
        const relativePath = path.relative(process.cwd(), fullPath);

        if (item.isDirectory()) {
          // Recursively scan subdirectories
          const subResources = await this.scanDirectory(fullPath);
          resources.push(...subResources);
        } else if (item.isFile() && this.isResourceFile(item.name)) {
          try {
            const stats = await stat(fullPath);
            const content = await this.readFileContent(fullPath);

            const entry: ResourceIndexEntry = {
              id: this.generateId(relativePath),
              title: this.extractTitle(item.name, content),
              relativePath,
              category: this.determineCategory(relativePath),
              sizeBytes: stats.size,
              modifiedAt: stats.mtime.toISOString(),
              culturalContent: this.detectCulturalContent(content),
              migrationStatus: 'pending',
              culturalReviewStatus: 'pending',
              ...this.extractMetadata(fullPath, content),
            };

            entry.priority = this.categorizePriority(entry);
            resources.push(entry);
          } catch (error) {
            console.warn(`⚠️  Could not process file: ${fullPath}`, error);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error scanning directory: ${dirPath}`, error);
    }

    return resources;
  }

  private isResourceFile(filename: string): boolean {
    const resourceExtensions = ['.md', '.html', '.json', '.txt', '.pdf'];
    const ext = path.extname(filename).toLowerCase();
    return resourceExtensions.includes(ext);
  }

  private async readFileContent(filePath: string): Promise<string> {
    try {
      const content = await readFile(filePath, 'utf-8');
      return content;
    } catch {
      return '';
    }
  }

  private generateId(relativePath: string): string {
    return relativePath.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  }

  private extractTitle(filename: string, content: string): string {
    // Try to extract title from content first
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      return titleMatch[1].trim();
    }

    // Fall back to filename
    return path
      .basename(filename, path.extname(filename))
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  private determineCategory(relativePath: string): string {
    const pathParts = relativePath.toLowerCase().split(path.sep);

    if (pathParts.includes('activities')) return 'activities';
    if (pathParts.includes('assessments')) return 'assessments';
    if (pathParts.includes('lessons')) return 'lessons';
    if (pathParts.includes('unit-plans')) return 'unit-plans';
    if (pathParts.includes('handouts')) return 'handouts';
    if (pathParts.includes('games')) return 'games';
    if (pathParts.includes('templates')) return 'templates';

    return 'other';
  }

  detectCulturalContent(content: string): boolean {
    const lowerContent = content.toLowerCase();
    return this.culturalKeywords.some((keyword) => lowerContent.includes(keyword.toLowerCase()));
  }

  categorizePriority(entry: ResourceIndexEntry): 'low' | 'medium' | 'high' | 'urgent' {
    // Cultural content gets high priority
    if (entry.culturalContent) return 'high';

    // Large files might need attention
    if (entry.sizeBytes > 100000) return 'medium';

    // Unit plans and assessments are important
    if (entry.category === 'unit-plans' || entry.category === 'assessments') {
      return 'high';
    }

    // Recent modifications might be urgent
    const modifiedDate = new Date(entry.modifiedAt);
    const daysSinceModified = (Date.now() - modifiedDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceModified < 7) return 'medium';

    return 'low';
  }

  extractMetadata(filePath: string, content: string): Partial<ResourceIndexEntry> {
    const metadata: Partial<ResourceIndexEntry> = {};
    const lowerContent = content.toLowerCase();

    // Detect subject
    for (const [subject, keywords] of Object.entries(this.subjectKeywords)) {
      if (keywords.some((keyword) => lowerContent.includes(keyword))) {
        metadata.subject = subject;
        break;
      }
    }

    // Detect year level
    for (const [yearLevel, pattern] of Object.entries(this.yearLevelPatterns)) {
      if (pattern.test(content)) {
        metadata.yearLevel = yearLevel;
        break;
      }
    }

    // Detect type
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case '.md':
        metadata.type = 'markdown';
        break;
      case '.html':
        metadata.type = 'html';
        break;
      case '.json':
        metadata.type = 'json';
        break;
      case '.txt':
        metadata.type = 'text';
        break;
      case '.pdf':
        metadata.type = 'pdf';
        break;
    }

    // Extract tags from content
    const tagMatches = content.match(/#(\w+)/g);
    if (tagMatches) {
      metadata.tags = tagMatches.map((tag) => tag.slice(1));
    }

    return metadata;
  }
}

async function buildResources(): Promise<void> {
  console.log('🚀 Building enhanced resource index for 6k changes...');

  const scanner = new EnhancedResourceScanner();
  const resourceDirectories = [
    'public/resources',
    'migration/recovered_resources',
    'real-resources',
  ];

  let allResources: ResourceIndexEntry[] = [];

  for (const dir of resourceDirectories) {
    try {
      console.log(`📁 Scanning directory: ${dir}`);
      const resources = await scanner.scanDirectory(dir);
      allResources.push(...resources);
      console.log(`   Found ${resources.length} resources`);
    } catch (error) {
      console.warn(`⚠️  Could not scan directory: ${dir}`, error);
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
    await writeFile(indexPath, JSON.stringify(allResources, null, 2));
    console.log(
      `✅ Resources prepared: ${allResources.length} items -> public/resources/index.json`,
    );

    // Log enhanced metadata
    const culturalCount = allResources.filter((r) => r.culturalContent).length;
    const highPriorityCount = allResources.filter(
      (r) => r.priority === 'high' || r.priority === 'urgent',
    ).length;
    const subjects = [...new Set(allResources.map((r) => r.subject).filter(Boolean))];
    const yearLevels = [...new Set(allResources.map((r) => r.yearLevel).filter(Boolean))];
    const categories = [...new Set(allResources.map((r) => r.category))];

    console.log('📊 Enhanced Metadata:');
    console.log(`   - Total Resources: ${allResources.length}`);
    console.log(`   - Cultural Resources: ${culturalCount}`);
    console.log(`   - High Priority: ${highPriorityCount}`);
    console.log(`   - Categories: ${categories.length} (${categories.join(', ')})`);
    console.log(`   - Subjects: ${subjects.length} (${subjects.join(', ')})`);
    console.log(`   - Year Levels: ${yearLevels.length} (${yearLevels.join(', ')})`);

    // Generate summary report
    const summary = {
      totalResources: allResources.length,
      culturalResources: culturalCount,
      highPriorityResources: highPriorityCount,
      categories: categories,
      subjects: subjects,
      yearLevels: yearLevels,
      generatedAt: new Date().toISOString(),
      migrationStatus: {
        pending: allResources.filter((r) => r.migrationStatus === 'pending').length,
        inProgress: allResources.filter((r) => r.migrationStatus === 'in-progress').length,
        completed: allResources.filter((r) => r.migrationStatus === 'completed').length,
        failed: allResources.filter((r) => r.migrationStatus === 'failed').length,
      },
    };

    const summaryPath = path.join(process.cwd(), 'reports', 'resource-summary.json');
    await writeFile(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`📋 Summary report generated: reports/resource-summary.json`);
  } catch (error) {
    console.error('❌ Failed to build resources:', error);
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildResources().catch((error) => {
    console.error('Fatal error in resource building:', error);
    process.exit(1);
  });
}
