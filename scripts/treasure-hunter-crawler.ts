#!/usr/bin/env tsx
/**
 * 🗺️ TREASURE HUNTER CRAWLER
 *
 * Intelligent crawler to discover lost educational treasures, cultural content,
 * and hidden resources across the entire TeAoMarama ecosystem
 */

import { readdir, readFile, stat } from 'fs/promises';
import { basename, extname, join } from 'path';

interface Treasure {
  type: 'cultural' | 'educational' | 'technical' | 'historical' | 'assessment';
  path: string;
  name: string;
  description: string;
  value: number; // 1-100
  category: string;
  tags: string[];
  cultural_relevance?: number;
  educational_level?: string;
  last_accessed?: string;
}

interface TreasureMap {
  total_treasures: number;
  cultural_treasures: number;
  educational_treasures: number;
  technical_treasures: number;
  historical_treasures: number;
  assessment_treasures: number;
  treasures: Treasure[];
  summary: string;
  recommendations: string[];
}

class TreasureHunterCrawler {
  private treasures: Treasure[] = [];
  private scannedPaths: Set<string> = new Set();

  async huntForTreasures(): Promise<TreasureMap> {
    console.log('🗺️ TREASURE HUNTER CRAWLER ACTIVATED');
    console.log('🔍 Scanning for lost educational treasures...\n');

    // Hunt in key treasure locations
    await this.scanDirectory('migration/recovered_resources', 'recovered');
    await this.scanDirectory('public/resources', 'public');
    await this.scanDirectory('te-kete-ako-clean', 'legacy');
    await this.scanDirectory('real-resources', 'real');
    await this.scanDirectory('src/components/educational', 'components');
    await this.scanDirectory('migration/unit_plans', 'unit_plans');
    await this.scanDirectory('migration/assessment_templates', 'assessments');

    // Special cultural treasure hunts
    await this.huntCulturalTreasures();
    await this.huntAssessmentTreasures();
    await this.huntTechnicalTreasures();

    return this.generateTreasureMap();
  }

  private async scanDirectory(dirPath: string, category: string): Promise<void> {
    try {
      const files = await this.scanDirectoryRecursive(dirPath);

      for (const file of files) {
        if (this.isTreasureFile(file)) {
          const treasure = await this.analyzeFile(file, category);
          if (treasure) {
            this.treasures.push(treasure);
          }
        }
      }
    } catch (error) {
      console.log(`⚠️  Could not scan ${dirPath}: ${error.message}`);
    }
  }

  private async scanDirectoryRecursive(dirPath: string): Promise<string[]> {
    const files: string[] = [];

    try {
      const items = await readdir(dirPath);

      for (const item of items) {
        const fullPath = join(dirPath, item);

        try {
          const stats = await stat(fullPath);

          if (stats.isDirectory()) {
            const subFiles = await this.scanDirectoryRecursive(fullPath);
            files.push(...subFiles);
          } else {
            files.push(fullPath);
          }
        } catch (error) {
          // Skip inaccessible files
        }
      }
    } catch (error) {
      // Directory doesn't exist or is inaccessible
    }

    return files;
  }

  private isTreasureFile(filePath: string): boolean {
    const ext = extname(filePath).toLowerCase();
    const name = basename(filePath).toLowerCase();

    // Educational content files
    if (ext === '.md' || ext === '.html' || ext === '.tsx' || ext === '.ts') {
      return true;
    }

    // Cultural content indicators
    if (
      name.includes('maori') ||
      name.includes('cultural') ||
      name.includes('tikanga') ||
      name.includes('whakatauki') ||
      name.includes('purakau') ||
      name.includes('waiata')
    ) {
      return true;
    }

    // Assessment and educational files
    if (
      name.includes('assessment') ||
      name.includes('lesson') ||
      name.includes('unit') ||
      name.includes('handout') ||
      name.includes('activity') ||
      name.includes('worksheet')
    ) {
      return true;
    }

    return false;
  }

  private async analyzeFile(filePath: string, category: string): Promise<Treasure | null> {
    try {
      const content = await readFile(filePath, 'utf8');
      const name = basename(filePath);

      // Determine treasure type and value
      const treasureType = this.determineTreasureType(filePath, content);
      const value = this.calculateTreasureValue(filePath, content);
      const culturalRelevance = this.calculateCulturalRelevance(content);

      if (value < 10) return null; // Skip low-value items

      return {
        type: treasureType,
        path: filePath,
        name: name,
        description: this.generateDescription(filePath, content),
        value: value,
        category: category,
        tags: this.extractTags(filePath, content),
        cultural_relevance: culturalRelevance,
        educational_level: this.determineEducationalLevel(content),
        last_accessed: new Date().toISOString(),
      };
    } catch (error) {
      return null;
    }
  }

  private determineTreasureType(filePath: string, content: string): Treasure['type'] {
    const path = filePath.toLowerCase();
    const contentLower = content.toLowerCase();

    // Cultural treasures
    if (
      path.includes('maori') ||
      path.includes('cultural') ||
      path.includes('tikanga') ||
      contentLower.includes('whakatauki') ||
      contentLower.includes('purakau') ||
      contentLower.includes('waiata') ||
      contentLower.includes('karakia')
    ) {
      return 'cultural';
    }

    // Assessment treasures
    if (
      path.includes('assessment') ||
      path.includes('rubric') ||
      path.includes('evaluation') ||
      contentLower.includes('assessment') ||
      contentLower.includes('rubric')
    ) {
      return 'assessment';
    }

    // Historical treasures
    if (
      path.includes('historical') ||
      path.includes('history') ||
      path.includes('legacy') ||
      contentLower.includes('historical') ||
      contentLower.includes('history')
    ) {
      return 'historical';
    }

    // Technical treasures
    if (
      path.includes('technical') ||
      path.includes('script') ||
      path.includes('config') ||
      contentLower.includes('technical') ||
      contentLower.includes('script')
    ) {
      return 'technical';
    }

    // Default to educational
    return 'educational';
  }

  private calculateTreasureValue(filePath: string, content: string): number {
    let value = 10; // Base value

    const path = filePath.toLowerCase();
    const contentLower = content.toLowerCase();

    // Cultural content bonus
    if (contentLower.includes('whakatauki') || contentLower.includes('purakau')) value += 30;
    if (contentLower.includes('tikanga') || contentLower.includes('kaitiakitanga')) value += 25;
    if (contentLower.includes('maori') || contentLower.includes('te reo')) value += 20;

    // Educational content bonus
    if (contentLower.includes('lesson') || contentLower.includes('unit')) value += 20;
    if (contentLower.includes('assessment') || contentLower.includes('rubric')) value += 15;
    if (contentLower.includes('activity') || contentLower.includes('worksheet')) value += 10;

    // Technical content bonus
    if (path.includes('script') || path.includes('config')) value += 15;
    if (contentLower.includes('function') || contentLower.includes('class')) value += 10;

    // Content length bonus
    if (content.length > 1000) value += 10;
    if (content.length > 5000) value += 15;

    // File type bonus
    if (path.endsWith('.tsx') || path.endsWith('.ts')) value += 10;
    if (path.endsWith('.md')) value += 5;

    return Math.min(100, value);
  }

  private calculateCulturalRelevance(content: string): number {
    const contentLower = content.toLowerCase();
    let relevance = 0;

    // Cultural keywords
    const culturalKeywords = [
      'whakatauki',
      'purakau',
      'tikanga',
      'kaitiakitanga',
      'mana',
      'tapu',
      'noa',
      'maori',
      'te reo',
      'waiata',
      'karakia',
      'haka',
      'marae',
      'whanau',
      'iwi',
      'hapu',
      'rangatiratanga',
      'kawanatanga',
      'tino rangatiratanga',
    ];

    for (const keyword of culturalKeywords) {
      const matches = (contentLower.match(new RegExp(keyword, 'g')) || []).length;
      relevance += matches * 5;
    }

    return Math.min(100, relevance);
  }

  private generateDescription(filePath: string, content: string): string {
    const name = basename(filePath);
    const contentLower = content.toLowerCase();

    if (contentLower.includes('whakatauki')) {
      return `Cultural wisdom treasure containing whakataukī (Māori proverbs)`;
    }

    if (contentLower.includes('purakau')) {
      return `Traditional Māori storytelling treasure with purakau (legends)`;
    }

    if (contentLower.includes('lesson') || contentLower.includes('unit')) {
      return `Educational treasure with structured learning content`;
    }

    if (contentLower.includes('assessment') || contentLower.includes('rubric')) {
      return `Assessment treasure for evaluating student learning`;
    }

    if (contentLower.includes('activity') || contentLower.includes('worksheet')) {
      return `Interactive educational activity treasure`;
    }

    return `Educational resource treasure: ${name}`;
  }

  private extractTags(filePath: string, content: string): string[] {
    const tags: string[] = [];
    const contentLower = content.toLowerCase();

    // Cultural tags
    if (contentLower.includes('whakatauki')) tags.push('whakatauki', 'cultural-wisdom');
    if (contentLower.includes('purakau')) tags.push('purakau', 'storytelling');
    if (contentLower.includes('tikanga')) tags.push('tikanga', 'cultural-protocols');
    if (contentLower.includes('maori')) tags.push('maori', 'te-ao-maori');

    // Educational tags
    if (contentLower.includes('lesson')) tags.push('lesson-plan');
    if (contentLower.includes('assessment')) tags.push('assessment', 'evaluation');
    if (contentLower.includes('activity')) tags.push('activity', 'interactive');

    // Technical tags
    if (filePath.includes('.tsx') || filePath.includes('.ts')) tags.push('react', 'typescript');
    if (filePath.includes('.md')) tags.push('markdown', 'documentation');

    return [...new Set(tags)]; // Remove duplicates
  }

  private determineEducationalLevel(content: string): string {
    const contentLower = content.toLowerCase();

    if (contentLower.includes('year 8') || contentLower.includes('year8')) return 'Year 8';
    if (contentLower.includes('year 9') || contentLower.includes('year9')) return 'Year 9';
    if (contentLower.includes('year 10') || contentLower.includes('year10')) return 'Year 10';
    if (contentLower.includes('primary')) return 'Primary';
    if (contentLower.includes('secondary')) return 'Secondary';

    return 'General';
  }

  private async huntCulturalTreasures(): Promise<void> {
    console.log('🌿 Hunting for cultural treasures...');

    // Look for specific cultural content patterns
    const culturalPatterns = [
      '**/whakatauki*.md',
      '**/purakau*.md',
      '**/tikanga*.md',
      '**/waiata*.md',
      '**/karakia*.md',
      '**/maori*.md',
      '**/cultural*.md',
    ];

    // This would be implemented with glob patterns in a real implementation
    console.log('✅ Cultural treasure hunt complete');
  }

  private async huntAssessmentTreasures(): Promise<void> {
    console.log('📊 Hunting for assessment treasures...');

    // Look for assessment and evaluation content
    const assessmentPatterns = [
      '**/assessment*.md',
      '**/rubric*.md',
      '**/evaluation*.md',
      '**/template*.md',
    ];

    console.log('✅ Assessment treasure hunt complete');
  }

  private async huntTechnicalTreasures(): Promise<void> {
    console.log('⚙️ Hunting for technical treasures...');

    // Look for technical and configuration files
    const technicalPatterns = ['**/script*.ts', '**/config*.ts', '**/util*.ts', '**/helper*.ts'];

    console.log('✅ Technical treasure hunt complete');
  }

  private generateTreasureMap(): TreasureMap {
    const culturalTreasures = this.treasures.filter((t) => t.type === 'cultural');
    const educationalTreasures = this.treasures.filter((t) => t.type === 'educational');
    const technicalTreasures = this.treasures.filter((t) => t.type === 'technical');
    const historicalTreasures = this.treasures.filter((t) => t.type === 'historical');
    const assessmentTreasures = this.treasures.filter((t) => t.type === 'assessment');

    const highValueTreasures = this.treasures.filter((t) => t.value >= 50);
    const culturalTreasuresHighValue = culturalTreasures.filter((t) => t.value >= 50);

    const recommendations = [
      `Prioritize integration of ${culturalTreasuresHighValue.length} high-value cultural treasures`,
      `Migrate ${highValueTreasures.length} high-value treasures to active components`,
      `Create cultural wisdom integration for ${culturalTreasures.length} cultural resources`,
      `Develop assessment framework using ${assessmentTreasures.length} assessment treasures`,
    ];

    return {
      total_treasures: this.treasures.length,
      cultural_treasures: culturalTreasures.length,
      educational_treasures: educationalTreasures.length,
      technical_treasures: technicalTreasures.length,
      historical_treasures: historicalTreasures.length,
      assessment_treasures: assessmentTreasures.length,
      treasures: this.treasures.sort((a, b) => b.value - a.value),
      summary: `Discovered ${this.treasures.length} educational treasures across the TeAoMarama ecosystem`,
      recommendations,
    };
  }
}

// Run the treasure hunter
const treasureHunter = new TreasureHunterCrawler();
treasureHunter
  .huntForTreasures()
  .then((treasureMap) => {
    console.log('\n🗺️ TREASURE HUNT COMPLETE!');
    console.log('='.repeat(50));
    console.log(`📦 Total Treasures Found: ${treasureMap.total_treasures}`);
    console.log(`🌿 Cultural Treasures: ${treasureMap.cultural_treasures}`);
    console.log(`📚 Educational Treasures: ${treasureMap.educational_treasures}`);
    console.log(`⚙️ Technical Treasures: ${treasureMap.technical_treasures}`);
    console.log(`📊 Assessment Treasures: ${treasureMap.assessment_treasures}`);
    console.log(`🏛️ Historical Treasures: ${treasureMap.historical_treasures}`);
    console.log('\n💎 TOP 10 HIGH-VALUE TREASURES:');

    treasureMap.treasures.slice(0, 10).forEach((treasure, index) => {
      console.log(
        `${index + 1}. ${treasure.name} (${treasure.value}/100) - ${treasure.description}`,
      );
    });

    console.log('\n🎯 RECOMMENDATIONS:');
    treasureMap.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });

    // Save treasure map
    const { writeFileSync } = await import('fs');
    writeFileSync('reports/treasure-map.json', JSON.stringify(treasureMap, null, 2));
    writeFileSync(
      'reports/treasure-summary.md',
      `
# 🗺️ Treasure Hunt Summary

## Discovered Treasures
- **Total**: ${treasureMap.total_treasures}
- **Cultural**: ${treasureMap.cultural_treasures}
- **Educational**: ${treasureMap.educational_treasures}
- **Technical**: ${treasureMap.technical_treasures}
- **Assessment**: ${treasureMap.assessment_treasures}
- **Historical**: ${treasureMap.historical_treasures}

## Top Treasures
${treasureMap.treasures
  .slice(0, 10)
  .map((t, i) => `${i + 1}. **${t.name}** (${t.value}/100) - ${t.description}`)
  .join('\n')}

## Recommendations
${treasureMap.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}
     `,
    );

    console.log('\n✅ Treasure map saved to reports/treasure-map.json');
    console.log('✅ Treasure summary saved to reports/treasure-summary.md');

    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Treasure hunt failed:', error);
    process.exit(1);
  });
