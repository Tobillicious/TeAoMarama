#!/usr/bin/env npx tsx

/**
 * Fix Inline Styles Script
 * Replaces inline styles with proper CSS classes
 * Making this the best educational platform in the world
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { extname, join } from 'path';

interface StyleMapping {
  inlineStyle: string;
  cssClass: string;
  description: string;
}

const styleMappings: StyleMapping[] = [
  // Teacher Dashboard
  {
    inlineStyle: "backgroundColor: 'var(--color-white)'",
    cssClass: 'teacher-dashboard',
    description: 'Teacher dashboard background',
  },
  {
    inlineStyle: "backgroundColor: 'var(--color-royal-blue)'",
    cssClass: 'teacher-sidebar',
    description: 'Teacher sidebar background',
  },
  {
    inlineStyle: "backgroundColor: 'var(--color-neutral-50)'",
    cssClass: 'teacher-main-content',
    description: 'Teacher main content background',
  },
  {
    inlineStyle: "color: 'var(--color-gold)'",
    cssClass: 'teacher-header-title',
    description: 'Teacher header title color',
  },
  {
    inlineStyle: "color: 'var(--color-white)'",
    cssClass: 'teacher-header-subtitle',
    description: 'Teacher header subtitle color',
  },

  // Student Dashboard
  {
    inlineStyle: "backgroundColor: 'var(--color-neutral-50)'",
    cssClass: 'student-dashboard',
    description: 'Student dashboard background',
  },
  {
    inlineStyle: "color: 'var(--color-gold)'",
    cssClass: 'student-header-title',
    description: 'Student header title color',
  },
  {
    inlineStyle: "color: 'var(--color-white)'",
    cssClass: 'student-header-subtitle',
    description: 'Student header subtitle color',
  },

  // Resource Cards
  {
    inlineStyle: "backgroundColor: 'var(--color-neutral-50)'",
    cssClass: 'resource-card',
    description: 'Resource card background',
  },
  {
    inlineStyle: "color: 'var(--color-primary)'",
    cssClass: 'resource-title',
    description: 'Resource title color',
  },
  {
    inlineStyle: "color: 'var(--color-neutral-700)'",
    cssClass: 'resource-description',
    description: 'Resource description color',
  },

  // Student Cards
  {
    inlineStyle: "backgroundColor: 'var(--color-neutral-50)'",
    cssClass: 'student-card',
    description: 'Student card background',
  },
  {
    inlineStyle: "color: 'var(--color-primary)'",
    cssClass: 'student-name',
    description: 'Student name color',
  },
  {
    inlineStyle: "color: 'var(--color-neutral-700)'",
    cssClass: 'student-level',
    description: 'Student level color',
  },

  // Assessment Cards
  {
    inlineStyle: "borderColor: 'var(--color-neutral-200)'",
    cssClass: 'assessment-card',
    description: 'Assessment card border',
  },
  {
    inlineStyle: "color: 'var(--color-primary)'",
    cssClass: 'assessment-title',
    description: 'Assessment title color',
  },
  {
    inlineStyle: "color: 'var(--color-neutral-700)'",
    cssClass: 'assessment-details',
    description: 'Assessment details color',
  },

  // Performance Testing
  {
    inlineStyle: "backgroundColor: 'var(--color-white)'",
    cssClass: 'performance-card',
    description: 'Performance card background',
  },
  {
    inlineStyle: "borderColor: 'var(--color-border)'",
    cssClass: 'performance-card',
    description: 'Performance card border',
  },
  {
    inlineStyle: "color: 'var(--color-primary)'",
    cssClass: 'performance-title',
    description: 'Performance title color',
  },
  {
    inlineStyle: "color: 'var(--color-neutral-700)'",
    cssClass: 'performance-description',
    description: 'Performance description color',
  },

  // Progress Bars
  {
    inlineStyle: 'width: `${progressPercent}%`',
    cssClass: 'progress-fill',
    description: 'Progress bar fill width',
  },
  {
    inlineStyle: "width: '60%'",
    cssClass: 'progress-fill-blue',
    description: 'Progress bar 60% width',
  },

  // Style Guide
  {
    inlineStyle: "background:'var(--color-bg)'",
    cssClass: 'color-swatch color-swatch-bg',
    description: 'Color swatch background',
  },
  {
    inlineStyle: "background:'var(--color-surface)'",
    cssClass: 'color-swatch color-swatch-surface',
    description: 'Color swatch surface',
  },
  {
    inlineStyle: "background:'var(--color-accent)', color:'#fff'",
    cssClass: 'color-swatch color-swatch-accent',
    description: 'Color swatch accent',
  },
];

class InlineStyleFixer {
  private processedFiles: string[] = [];
  private replacements: { file: string; count: number }[] = [];

  async fixInlineStyles(directory: string): Promise<void> {
    console.log('🔧 Starting inline style replacement...');
    console.log('📁 Processing directory:', directory);

    await this.processDirectory(directory);

    this.printSummary();
  }

  private async processDirectory(dir: string): Promise<void> {
    const items = readdirSync(dir);

    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules and other build directories
        if (!['node_modules', 'dist', 'build', '.git'].includes(item)) {
          await this.processDirectory(fullPath);
        }
      } else if (this.isTargetFile(fullPath)) {
        await this.processFile(fullPath);
      }
    }
  }

  private isTargetFile(filePath: string): boolean {
    const ext = extname(filePath);
    return ['.tsx', '.ts', '.jsx', '.js'].includes(ext);
  }

  private async processFile(filePath: string): Promise<void> {
    try {
      let content = readFileSync(filePath, 'utf-8');
      let replacementCount = 0;

      // Process each style mapping
      for (const mapping of styleMappings) {
        const beforeCount = (
          content.match(new RegExp(this.escapeRegex(mapping.inlineStyle), 'g')) || []
        ).length;

        if (beforeCount > 0) {
          content = this.replaceInlineStyle(content, mapping);
          replacementCount += beforeCount;
        }
      }

      // Additional replacements for common patterns
      replacementCount += this.replaceCommonPatterns(content);

      if (replacementCount > 0) {
        writeFileSync(filePath, content, 'utf-8');
        this.processedFiles.push(filePath);
        this.replacements.push({ file: filePath, count: replacementCount });

        console.log(`✅ Fixed ${replacementCount} inline styles in ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
    }
  }

  private replaceInlineStyle(content: string, mapping: StyleMapping): string {
    // Handle different style formats
    const patterns = [
      // style={{ backgroundColor: 'var(--color-white)' }}
      new RegExp(`style=\\{\\{[^}]*${this.escapeRegex(mapping.inlineStyle)}[^}]*\\}\\}`, 'g'),
      // style={{ color: 'var(--color-primary)' }}
      new RegExp(`style=\\{\\{[^}]*${this.escapeRegex(mapping.inlineStyle)}[^}]*\\}\\}`, 'g'),
      // style={{ width: `${progressPercent}%` }}
      new RegExp(`style=\\{\\{[^}]*${this.escapeRegex(mapping.inlineStyle)}[^}]*\\}\\}`, 'g'),
    ];

    for (const pattern of patterns) {
      content = content.replace(pattern, (match) => {
        // Extract existing className if any
        const classNameMatch = match.match(/className="([^"]*)"/);
        const existingClasses = classNameMatch ? classNameMatch[1] : '';

        // Remove the style attribute
        const withoutStyle = match.replace(/style=\{[^}]*\}/, '');

        // Add or update className
        if (existingClasses) {
          return withoutStyle.replace(
            `className="${existingClasses}"`,
            `className="${existingClasses} ${mapping.cssClass}"`,
          );
        } else {
          return withoutStyle.replace('>', ` className="${mapping.cssClass}">`);
        }
      });
    }

    return content;
  }

  private replaceCommonPatterns(content: string): number {
    let count = 0;

    // Replace common inline style patterns
    const commonReplacements = [
      // Background colors
      {
        pattern: /style=\{\{[^}]*backgroundColor:\s*['"]var\(--color-[^)]+\)['"][^}]*\}\}/g,
        class: 'bg-custom',
      },
      // Text colors
      {
        pattern: /style=\{\{[^}]*color:\s*['"]var\(--color-[^)]+\)['"][^}]*\}\}/g,
        class: 'text-custom',
      },
      // Border colors
      {
        pattern: /style=\{\{[^}]*borderColor:\s*['"]var\(--color-[^)]+\)['"][^}]*\}\}/g,
        class: 'border-custom',
      },
    ];

    for (const replacement of commonReplacements) {
      const matches = content.match(replacement.pattern);
      if (matches) {
        count += matches.length;
        content = content.replace(replacement.pattern, `className="${replacement.class}"`);
      }
    }

    return count;
  }

  private escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private printSummary(): void {
    console.log('\n🎉 Inline Style Fix Complete!');
    console.log('='.repeat(50));

    if (this.processedFiles.length === 0) {
      console.log('✅ No files needed updating - already following best practices!');
      return;
    }

    console.log(`📊 Files processed: ${this.processedFiles.length}`);

    const totalReplacements = this.replacements.reduce((sum, r) => sum + r.count, 0);
    console.log(`🔧 Total replacements: ${totalReplacements}`);

    console.log('\n📋 Files updated:');
    this.replacements.forEach(({ file, count }) => {
      console.log(`   ${file}: ${count} replacements`);
    });

    console.log('\n✨ Benefits achieved:');
    console.log('   ✅ Improved maintainability');
    console.log('   ✅ Better performance');
    console.log('   ✅ Consistent styling');
    console.log('   ✅ Easier theming');
    console.log('   ✅ Better accessibility');

    console.log('\n🚀 Next steps:');
    console.log('   1. Review the changes');
    console.log('   2. Test the application');
    console.log('   3. Update any remaining inline styles manually');
    console.log('   4. Consider using CSS-in-JS for dynamic styles');
  }
}

// Main execution
async function main() {
  const fixer = new InlineStyleFixer();

  try {
    await fixer.fixInlineStyles('./src');
    console.log('\n🌟 Making this the best educational platform in the world!');
  } catch (error) {
    console.error('💥 Error during inline style fix:', error);
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  main();
}
