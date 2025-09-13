#!/usr/bin/env tsx

/**
 * UPDATE RESOURCE LINKS SCRIPT
 *
 * Updates teaching resources with real, working external links
 * using Exa.ai integration to find authentic NZ sources
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { extname, join } from 'path';
import { exaLinkValidator } from '../src/utils/exa-link-validator';

interface LinkUpdate {
  originalUrl: string;
  newUrl?: string;
  status: 'working' | 'broken' | 'replaced' | 'not_found';
  title?: string;
  description?: string;
}

interface ResourceUpdate {
  file: string;
  links: LinkUpdate[];
  updated: boolean;
}

class ResourceLinkUpdater {
  private updates: ResourceUpdate[] = [];
  private stats = {
    filesProcessed: 0,
    linksFound: 0,
    linksUpdated: 0,
    linksWorking: 0,
    linksReplaced: 0,
    linksBroken: 0,
  };

  /**
   * Update all resource files with working links
   */
  async updateAllResources(): Promise<void> {
    console.log('🔍 Starting resource link update process...');

    const resourceDir = join(process.cwd(), 'src', 'content', 'lessons');
    const files = this.findMarkdownFiles(resourceDir);

    console.log(`📁 Found ${files.length} resource files to process`);

    for (const file of files) {
      await this.updateResourceFile(file);
    }

    this.printStats();
    this.saveUpdateReport();
  }

  /**
   * Find all markdown files in the resource directory
   */
  private findMarkdownFiles(dir: string): string[] {
    const files: string[] = [];

    try {
      const entries = readdirSync(dir);

      for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          files.push(...this.findMarkdownFiles(fullPath));
        } else if (extname(entry) === '.md') {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
    }

    return files;
  }

  /**
   * Update a single resource file
   */
  private async updateResourceFile(filePath: string): Promise<void> {
    try {
      console.log(`📄 Processing: ${filePath}`);

      const content = readFileSync(filePath, 'utf-8');
      const links = this.extractLinks(content);

      if (links.length === 0) {
        console.log(`   ⚪ No links found in ${filePath}`);
        return;
      }

      console.log(`   🔗 Found ${links.length} links to validate`);
      this.stats.linksFound += links.length;

      const linkUpdates: LinkUpdate[] = [];
      let updatedContent = content;

      for (const link of links) {
        const update = await this.updateLink(link);
        linkUpdates.push(update);

        if (update.status === 'replaced' && update.newUrl) {
          updatedContent = updatedContent.replace(link.url, update.newUrl);
          this.stats.linksUpdated++;
        } else if (update.status === 'working') {
          this.stats.linksWorking++;
        } else {
          this.stats.linksBroken++;
        }
      }

      // Write updated content if any links were replaced
      const hasUpdates = linkUpdates.some((update) => update.status === 'replaced');
      if (hasUpdates) {
        writeFileSync(filePath, updatedContent, 'utf-8');
        console.log(`   ✅ Updated ${filePath} with working links`);
      }

      this.updates.push({
        file: filePath,
        links: linkUpdates,
        updated: hasUpdates,
      });

      this.stats.filesProcessed++;
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }

  /**
   * Extract URLs from markdown content
   */
  private extractLinks(content: string): string[] {
    const urlRegex = /https?:\/\/[^\s\)]+/g;
    const links = content.match(urlRegex) || [];

    // Filter out common non-educational URLs
    return links.filter(
      (url) =>
        !url.includes('localhost') &&
        !url.includes('127.0.0.1') &&
        !url.includes('example.com') &&
        !url.includes('placeholder'),
    );
  }

  /**
   * Update a single link
   */
  private async updateLink(url: string): Promise<LinkUpdate> {
    try {
      const result = await exaLinkValidator.validateUrl(url);

      return {
        originalUrl: url,
        newUrl: result.workingUrl,
        status: result.status,
        title: result.title,
        description: result.description,
      };
    } catch (error) {
      console.error(`Error updating link ${url}:`, error);
      return {
        originalUrl: url,
        status: 'not_found',
      };
    }
  }

  /**
   * Print update statistics
   */
  private printStats(): void {
    console.log('\n📊 RESOURCE LINK UPDATE STATISTICS');
    console.log('=====================================');
    console.log(`📁 Files Processed: ${this.stats.filesProcessed}`);
    console.log(`🔗 Links Found: ${this.stats.linksFound}`);
    console.log(`✅ Links Working: ${this.stats.linksWorking}`);
    console.log(`🔄 Links Replaced: ${this.stats.linksReplaced}`);
    console.log(`❌ Links Broken: ${this.stats.linksBroken}`);
    console.log(`📝 Total Updates: ${this.stats.linksUpdated}`);

    const successRate =
      this.stats.linksFound > 0
        ? (
            ((this.stats.linksWorking + this.stats.linksReplaced) / this.stats.linksFound) *
            100
          ).toFixed(1)
        : '0';

    console.log(`📈 Success Rate: ${successRate}%`);
  }

  /**
   * Save detailed update report
   */
  private saveUpdateReport(): void {
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      updates: this.updates,
      cacheStats: exaLinkValidator.getCacheStats(),
    };

    const reportPath = join(process.cwd(), 'resource-link-update-report.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

    console.log(`\n📋 Detailed report saved to: ${reportPath}`);
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 RESOURCE LINK UPDATE SCRIPT');
  console.log('==============================');

  // Check for Exa API key
  if (!process.env.EXA_API_KEY) {
    console.log('⚠️  EXA_API_KEY not found in environment variables');
    console.log('   Some link validation may be limited');
    console.log('   Set EXA_API_KEY for full functionality');
  }

  const updater = new ResourceLinkUpdater();

  try {
    await updater.updateAllResources();
    console.log('\n🎉 Resource link update completed successfully!');
  } catch (error) {
    console.error('❌ Error during resource link update:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ResourceLinkUpdater };
