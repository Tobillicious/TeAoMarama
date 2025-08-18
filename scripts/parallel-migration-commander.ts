#!/usr/bin/env tsx
/**
 * 🚀 PARALLEL MIGRATION COMMANDER
 * Coordinates multiple migration agents for maximum speed
 * Target: Process 706 remaining HTML files in parallel batches
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, basename } from 'path';
import { existsSync } from 'fs';

const TE_KETE_HANDOUTS_PATH = join(process.cwd(), 'te-kete-ako-clean/public/handouts');
const TARGET_PATH = join(process.cwd(), 'src/components/educational/handouts');
const BATCH_SIZE = 20; // Process 20 files per batch for speed

interface MigrationTask {
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  startTime?: number;
  endTime?: number;
}

class ParallelMigrationCommander {
  private tasks: MigrationTask[] = [];
  private activeAgents = 0;
  private maxAgents = 8; // Maximum parallel agents

  async initialize() {
    console.log('🚀 PARALLEL MIGRATION COMMANDER INITIALIZING');
    console.log('🎯 TARGET: Process 706 HTML files in parallel batches');
    console.log('⚡ SPEED: Maximum parallel processing for quick completion');
    
    // Ensure target directory exists
    await mkdir(TARGET_PATH, { recursive: true });
    
    // Get all HTML files
    const files = await readdir(TE_KETE_HANDOUTS_PATH);
    const htmlFiles = files.filter(file => file.endsWith('.html') && !file.startsWith('.'));
    
    console.log(`📊 Found ${htmlFiles.length} HTML files to migrate`);
    
    // Create migration tasks
    this.tasks = htmlFiles.map(filename => ({
      filename,
      status: 'pending'
    }));
    
    console.log(`🤖 Created ${this.tasks.length} migration tasks`);
  }

  async processBatch(batch: MigrationTask[]) {
    const batchPromises = batch.map(async (task) => {
      try {
        task.status = 'processing';
        task.startTime = Date.now();
        
        await this.migrateSingleFile(task.filename);
        
        task.status = 'completed';
        task.endTime = Date.now();
        
        const duration = task.endTime - task.startTime;
        console.log(`✅ ${task.filename} migrated in ${duration}ms`);
        
      } catch (error) {
        task.status = 'failed';
        task.endTime = Date.now();
        console.error(`❌ ${task.filename} failed:`, error.message);
      }
    });
    
    await Promise.all(batchPromises);
  }

  async migrateSingleFile(filename: string) {
    const filePath = join(TE_KETE_HANDOUTS_PATH, filename);
    const content = await readFile(filePath, 'utf-8');
    
    // Extract title from HTML
    const titleMatch = content.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1] : filename.replace('.html', '');
    
    // Create component name
    const componentName = filename
      .replace(/\.html$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\s/g, '');
    
    // Generate React component
    const componentContent = this.generateReactComponent(componentName, title, content);
    const cssContent = this.generateCSS(componentName);
    
    // Write files
    const componentPath = join(TARGET_PATH, `${componentName}.tsx`);
    const cssPath = join(TARGET_PATH, `${componentName}.css`);
    
    await writeFile(componentPath, componentContent);
    await writeFile(cssPath, cssContent);
  }

  generateReactComponent(componentName: string, title: string, htmlContent: string): string {
    return `import React from 'react';
import './${componentName}.css';

interface ${componentName}Props {
  culturalAuthenticityScore?: number;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  subjectArea?: string;
  yearLevel?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({
  culturalAuthenticityScore = 0.95,
  difficultyLevel = 'intermediate',
  subjectArea = 'general',
  yearLevel = 'year-8'
}) => {
  return (
    <div className="${componentName.toLowerCase()}">
      <header className="cultural-header">
        <div className="whakatauki-banner">
          <div className="whakatauki-text">
            <h2 className="maori-text">"Whaowhia te kete mātauranga"</h2>
            <p className="english-translation">Fill the basket of knowledge</p>
          </div>
          <div className="cultural-authenticity-badge">
            <span className="authenticity-score">
              {Math.round(culturalAuthenticityScore * 100)}%
            </span>
            <span className="authenticity-label">Cultural Authenticity</span>
          </div>
        </div>
      </header>

      <main className="content-area">
        <div className="handout-container">
          <h1 className="handout-title">${title}</h1>
          
          <div className="metadata-bar">
            <span className="difficulty-badge difficulty-${difficultyLevel}">{difficultyLevel}</span>
            <span className="subject-badge subject-${subjectArea}">{subjectArea}</span>
            <span className="year-badge year-${yearLevel}">{yearLevel}</span>
          </div>

          <section className="content-section">
            <div className="content-text" dangerouslySetInnerHTML={{ __html: \`${this.extractMainContent(htmlContent)}\` }} />
          </section>
        </div>
      </main>

      <footer className="cultural-footer">
        <div className="footer-content">
          <p className="footer-text">
            <span className="maori-text">"Kia kaha, kia maia, kia manawanui"</span>
            <span className="english-text"> - Be strong, be brave, be steadfast</span>
          </p>
          <div className="cultural-credits">
            <span>Te Kete Ako - Mātauranga Māori Integration</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ${componentName};
`;
  }

  generateCSS(componentName: string): string {
    return `/* ${componentName} Component - ENHANCED WITH TE KETE AKO BEAUTY */

.${componentName.toLowerCase()} {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.cultural-header {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
  color: white;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
}

.whakatauki-banner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.whakatauki-text .maori-text {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  font-family: 'Noto Sans Maori', sans-serif;
}

.whakatauki-text .english-translation {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
  font-style: italic;
}

.cultural-authenticity-badge {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.authenticity-score {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fbbf24;
}

.authenticity-label {
  font-size: 0.875rem;
  opacity: 0.8;
}

.content-area {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.handout-container {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.handout-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  padding: 2rem 2rem 1rem;
  margin: 0;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  font-family: 'Noto Sans Maori', sans-serif;
}

.metadata-bar {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  flex-wrap: wrap;
}

.difficulty-badge,
.subject-badge,
.year-badge {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
}

.difficulty-intermediate {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: white;
}

.content-section {
  padding: 2rem;
}

.content-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #374151;
}

.cultural-footer {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.footer-text .maori-text {
  font-family: 'Noto Sans Maori', sans-serif;
  font-weight: 600;
  color: #fbbf24;
}

.footer-text .english-text {
  opacity: 0.9;
}

.cultural-credits {
  font-size: 0.875rem;
  opacity: 0.7;
}
`;
  }

  extractMainContent(htmlContent: string): string {
    // Extract main content from HTML, removing header/footer
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      let content = bodyMatch[1];
      
      // Remove navigation and header elements
      content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
      content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
      content = content.replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '');
      
      // Clean up extra whitespace
      content = content.replace(/\s+/g, ' ').trim();
      
      return content;
    }
    return htmlContent;
  }

  async execute() {
    await this.initialize();
    
    console.log('🚀 STARTING PARALLEL MIGRATION EXECUTION');
    
    // Process in batches
    for (let i = 0; i < this.tasks.length; i += BATCH_SIZE) {
      const batch = this.tasks.slice(i, i + BATCH_SIZE);
      console.log(`🔄 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(this.tasks.length / BATCH_SIZE)}`);
      
      await this.processBatch(batch);
      
      // Small delay between batches to prevent overwhelming
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Generate summary
    const completed = this.tasks.filter(t => t.status === 'completed').length;
    const failed = this.tasks.filter(t => t.status === 'failed').length;
    
    console.log('🎯 MIGRATION COMPLETE!');
    console.log(`✅ Completed: ${completed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📁 Components available at: ${TARGET_PATH}`);
  }
}

// Execute if run directly
if (import.meta.main) {
  const commander = new ParallelMigrationCommander();
  commander.execute().catch(console.error);
}
