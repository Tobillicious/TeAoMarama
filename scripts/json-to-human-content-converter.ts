#!/usr/bin/env tsx

/**
 * JSON to Human Content Converter
 *
 * This script converts the restored JSON content files into human-readable
 * markdown documents that teachers and students can easily use.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface ContentFile {
  id: string;
  title: string;
  type: string;
  subject: string;
  yearLevel: string;
  culturalContext: string;
  depth: string;
  learningObjectives: string[];
  activities: string[];
  resources: string[];
  assessment: {
    type: string;
    tasks: string[];
  };
  duration: string;
  nzcAlignment: string[];
  createdAt: string;
  enrichedAt?: string;
  enrichedBy?: string;
  [key: string]: any; // For additional properties
}

class JSONToHumanContentConverter {
  private inputDir: string;
  private outputDir: string;
  private convertedCount: number = 0;
  private errorCount: number = 0;

  constructor() {
    this.inputDir = join(process.cwd(), 'src', 'content');
    this.outputDir = join(process.cwd(), 'human-readable-content');
    this.setupOutputDirectory();
  }

  private setupOutputDirectory(): void {
    if (!existsSync(this.outputDir)) {
      mkdirSync(this.outputDir, { recursive: true });
    }

    // Create subdirectories
    const subdirs = ['multimedia', 'unit-plans', 'lesson-plans', 'assessments'];
    subdirs.forEach((subdir) => {
      const subdirPath = join(this.outputDir, subdir);
      if (!existsSync(subdirPath)) {
        mkdirSync(subdirPath, { recursive: true });
      }
    });
  }

  public async convertAllContent(): Promise<void> {
    console.log('🔄 Starting conversion of JSON content to human-readable format...');

    try {
      // Convert multimedia content
      await this.convertContentType('multimedia');

      // Convert unit plans
      await this.convertContentType('unit-plans');

      // Generate index files
      await this.generateIndexFiles();

      console.log(`\n✅ Conversion complete!`);
      console.log(`📊 Converted: ${this.convertedCount} files`);
      console.log(`❌ Errors: ${this.errorCount} files`);
      console.log(`📁 Output directory: ${this.outputDir}`);
    } catch (error) {
      console.error('❌ Error during conversion:', error);
    }
  }

  private async convertContentType(contentType: string): Promise<void> {
    const typeDir = join(this.inputDir, contentType);
    if (!existsSync(typeDir)) {
      console.log(`⚠️ Directory not found: ${typeDir}`);
      return;
    }

    console.log(`\n📚 Converting ${contentType}...`);

    const files = readdirSync(typeDir).filter(
      (file) =>
        file.endsWith('.json') && !file.includes('index') && !file.includes('.original.json'),
    );

    for (const file of files) {
      try {
        const filePath = join(typeDir, file);
        const content = JSON.parse(readFileSync(filePath, 'utf8'));
        await this.convertFile(content, contentType);
        this.convertedCount++;
      } catch (error) {
        console.error(`❌ Error converting ${file}:`, error);
        this.errorCount++;
      }
    }
  }

  private async convertFile(content: ContentFile, contentType: string): Promise<void> {
    const markdown = this.generateMarkdown(content, contentType);
    const outputPath = join(this.outputDir, contentType, `${content.id}.md`);
    writeFileSync(outputPath, markdown);
  }

  private generateMarkdown(content: ContentFile, contentType: string): string {
    const typeEmoji = this.getTypeEmoji(contentType);
    const subjectEmoji = this.getSubjectEmoji(content.subject);
    const yearEmoji = this.getYearEmoji(content.yearLevel);

    let markdown = `# ${typeEmoji} ${content.title}\n\n`;

    // Basic Information
    markdown += `## 📋 Basic Information\n\n`;
    markdown += `- **Type**: ${content.type}\n`;
    markdown += `- **Subject**: ${subjectEmoji} ${content.subject}\n`;
    markdown += `- **Year Level**: ${yearEmoji} ${content.yearLevel}\n`;
    markdown += `- **Duration**: ${content.duration}\n`;
    markdown += `- **Depth**: ${content.depth}\n`;
    markdown += `- **Created**: ${new Date(content.createdAt).toLocaleDateString()}\n`;

    if (content.enrichedAt) {
      markdown += `- **Enhanced**: ${new Date(content.enrichedAt).toLocaleDateString()}\n`;
    }

    markdown += `\n`;

    // Cultural Context
    markdown += `## 🌺 Cultural Context\n\n`;
    markdown += `${content.culturalContext}\n\n`;

    // Learning Objectives
    markdown += `## 🎯 Learning Objectives\n\n`;
    if (content.learningObjectives && Array.isArray(content.learningObjectives)) {
      content.learningObjectives.forEach((objective, index) => {
        markdown += `${index + 1}. ${objective}\n`;
      });
    } else {
      markdown += `No learning objectives specified.\n`;
    }
    markdown += `\n`;

    // Activities
    markdown += `## 🚀 Activities\n\n`;
    if (content.activities && Array.isArray(content.activities)) {
      content.activities.forEach((activity, index) => {
        markdown += `${index + 1}. ${activity}\n`;
      });
    } else {
      markdown += `No activities specified.\n`;
    }
    markdown += `\n`;

    // Resources
    markdown += `## 📚 Resources\n\n`;
    if (content.resources && Array.isArray(content.resources)) {
      content.resources.forEach((resource, index) => {
        markdown += `${index + 1}. ${resource}\n`;
      });
    } else {
      markdown += `No resources specified.\n`;
    }
    markdown += `\n`;

    // Assessment
    markdown += `## 📊 Assessment\n\n`;
    if (content.assessment) {
      markdown += `**Type**: ${content.assessment.type || 'Not specified'}\n\n`;
      markdown += `**Tasks**:\n`;
      if (content.assessment.tasks && Array.isArray(content.assessment.tasks)) {
        content.assessment.tasks.forEach((task, index) => {
          markdown += `${index + 1}. ${task}\n`;
        });
      } else {
        markdown += `No assessment tasks specified.\n`;
      }
    } else {
      markdown += `No assessment information available.\n`;
    }
    markdown += `\n`;

    // NZC Alignment
    markdown += `## 🏛️ New Zealand Curriculum Alignment\n\n`;
    if (content.nzcAlignment && Array.isArray(content.nzcAlignment)) {
      content.nzcAlignment.forEach((alignment, index) => {
        markdown += `${index + 1}. ${alignment}\n`;
      });
    } else {
      markdown += `No NZC alignment specified.\n`;
    }
    markdown += `\n`;

    // Type-specific content
    if (contentType === 'multimedia') {
      markdown += this.generateMultimediaContent(content);
    } else if (contentType === 'unit-plans') {
      markdown += this.generateUnitPlanContent(content);
    }

    // Footer
    markdown += `---\n\n`;
    markdown += `*This content was automatically converted from JSON format for human readability.*\n`;
    markdown += `*Original ID: ${content.id}*\n`;

    return markdown;
  }

  private generateMultimediaContent(content: ContentFile): string {
    let markdown = `## 🎬 Multimedia Features\n\n`;

    if (content.multimediaFeatures) {
      content.multimediaFeatures.forEach((feature: any, index: number) => {
        markdown += `### ${index + 1}. ${feature.title}\n\n`;
        markdown += `**Description**: ${feature.description}\n\n`;
        markdown += `**Duration**: ${feature.duration}\n\n`;

        if (feature.tools) {
          markdown += `**Tools**:\n`;
          feature.tools.forEach((tool: string, toolIndex: number) => {
            markdown += `${toolIndex + 1}. ${tool}\n`;
          });
          markdown += `\n`;
        }
      });
    }

    if (content.technicalRequirements) {
      markdown += `## 💻 Technical Requirements\n\n`;
      markdown += `- **Devices**: ${content.technicalRequirements.devices}\n`;
      markdown += `- **Software**: ${content.technicalRequirements.software}\n`;
      markdown += `- **Accessibility**: ${content.technicalRequirements.accessibility}\n`;
      markdown += `- **Bandwidth**: ${content.technicalRequirements.bandwidth}\n\n`;
    }

    if (content.accessibility) {
      markdown += `## ♿ Accessibility Features\n\n`;
      markdown += `- **Visual**: ${content.accessibility.visual}\n`;
      markdown += `- **Auditory**: ${content.accessibility.auditory}\n`;
      markdown += `- **Motor**: ${content.accessibility.motor}\n`;
      markdown += `- **Cognitive**: ${content.accessibility.cognitive}\n\n`;
    }

    return markdown;
  }

  private generateUnitPlanContent(content: ContentFile): string {
    let markdown = `## 📅 Unit Structure\n\n`;

    if (content.unitStructure) {
      content.unitStructure.forEach((section: any, index: number) => {
        markdown += `### ${index + 1}. ${section.title}\n\n`;
        markdown += `**Description**: ${section.description}\n\n`;
        markdown += `**Duration**: ${section.duration}\n\n`;

        if (section.materials) {
          markdown += `**Materials**:\n`;
          section.materials.forEach((material: string, materialIndex: number) => {
            markdown += `${materialIndex + 1}. ${material}\n`;
          });
          markdown += `\n`;
        }
      });
    }

    if (content.differentiation) {
      markdown += `## 🎯 Differentiation\n\n`;
      markdown += `- **Support**: ${content.differentiation.support}\n`;
      markdown += `- **Extension**: ${content.differentiation.extension}\n`;
      markdown += `- **Cultural**: ${content.differentiation.cultural}\n\n`;
    }

    if (content.crossCurricularConnections) {
      markdown += `## 🔗 Cross-Curricular Connections\n\n`;
      Object.entries(content.crossCurricularConnections).forEach(([key, value]) => {
        markdown += `- **${key}**: ${value}\n`;
      });
      markdown += `\n`;
    }

    if (content.communityConnections) {
      markdown += `## 🤝 Community Connections\n\n`;
      Object.entries(content.communityConnections).forEach(([key, value]) => {
        markdown += `- **${key}**: ${value}\n`;
      });
      markdown += `\n`;
    }

    return markdown;
  }

  private getTypeEmoji(type: string): string {
    const emojiMap: { [key: string]: string } = {
      multimedia: '🎬',
      'unit-plans': '📅',
      'lesson-plans': '📝',
      assessments: '📊',
    };
    return emojiMap[type] || '📄';
  }

  private getSubjectEmoji(subject: string): string {
    const emojiMap: { [key: string]: string } = {
      'Te Reo Māori': '🌺',
      'Social Studies': '🏛️',
      Science: '🔬',
      Mathematics: '🔢',
      English: '📚',
      Arts: '🎨',
      Technology: '💻',
      Health: '🏥',
      'Physical Education': '🏃',
    };
    return emojiMap[subject] || '📖';
  }

  private getYearEmoji(yearLevel: string): string {
    const emojiMap: { [key: string]: string } = {
      'Year 1': '1️⃣',
      'Year 2': '2️⃣',
      'Year 3': '3️⃣',
      'Year 4': '4️⃣',
      'Year 5': '5️⃣',
      'Year 6': '6️⃣',
      'Year 7': '7️⃣',
      'Year 8': '8️⃣',
      'Year 9': '9️⃣',
      'Year 10': '🔟',
      'Year 11': '1️⃣1️⃣',
      'Year 12': '1️⃣2️⃣',
      'Year 13': '1️⃣3️⃣',
    };
    return emojiMap[yearLevel] || '📚';
  }

  private async generateIndexFiles(): Promise<void> {
    console.log('\n📋 Generating index files...');

    // Generate main index
    const mainIndex = this.generateMainIndex();
    writeFileSync(join(this.outputDir, 'README.md'), mainIndex);

    // Generate type-specific indexes
    const types = ['multimedia', 'unit-plans'];
    for (const type of types) {
      const typeIndex = this.generateTypeIndex(type);
      writeFileSync(join(this.outputDir, type, 'README.md'), typeIndex);
    }
  }

  private generateMainIndex(): string {
    return `# 📚 Human-Readable Educational Content

This directory contains educational content that has been converted from JSON format into human-readable markdown documents.

## 📁 Content Types

- [🎬 Multimedia Content](./multimedia/) - Interactive multimedia experiences
- [📅 Unit Plans](./unit-plans/) - Comprehensive unit planning resources

## 🌺 Cultural Context

All content has been developed with cultural safety and tikanga protocols in mind, ensuring authentic integration of Te Reo Māori and Māori perspectives.

## 📊 Statistics

- **Total Files Converted**: ${this.convertedCount}
- **Conversion Errors**: ${this.errorCount}
- **Content Types**: 2 (Multimedia, Unit Plans)

## 🚀 Usage

Each markdown file contains:
- Clear learning objectives
- Detailed activities and resources
- Assessment information
- New Zealand Curriculum alignment
- Cultural context and protocols

## 📝 Notes

- All content is designed for New Zealand educational contexts
- Cultural protocols and tikanga are integrated throughout
- Content supports differentiated learning approaches
- Accessibility features are included where applicable

---

*Generated by JSON to Human Content Converter*
*Last updated: ${new Date().toLocaleString()}*
`;
  }

  private generateTypeIndex(type: string): string {
    const typeDir = join(this.outputDir, type);
    if (!existsSync(typeDir)) {
      return `# ${this.getTypeEmoji(type)} ${type}\n\nNo content available.`;
    }

    const files = readdirSync(typeDir).filter(
      (file) => file.endsWith('.md') && file !== 'README.md',
    );

    let index = `# ${this.getTypeEmoji(type)} ${type.charAt(0).toUpperCase() + type.slice(1)}\n\n`;
    index += `This directory contains ${type} content converted to human-readable format.\n\n`;
    index += `## 📋 Available Content\n\n`;

    if (files.length === 0) {
      index += `No content files available.\n`;
    } else {
      files.forEach((file) => {
        const fileName = file.replace('.md', '');
        index += `- [${fileName}](./${file})\n`;
      });
    }

    index += `\n## 📊 Statistics\n\n`;
    index += `- **Total Files**: ${files.length}\n`;
    index += `- **Type**: ${type}\n`;

    index += `\n---\n\n`;
    index += `*Generated by JSON to Human Content Converter*\n`;

    return index;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const converter = new JSONToHumanContentConverter();

  console.log('🔄 Starting JSON to Human Content Conversion...');
  converter.convertAllContent().catch(console.error);
}

export default JSONToHumanContentConverter;
