#!/usr/bin/env tsx

/**
 * 🎨 CSS MIGRATION AGENT - Te Kete Ako Design Pattern Synthesizer
 * 
 * Mission: Extract and integrate Te Kete Ako's sophisticated cultural design patterns
 * while preserving current build performance and adding cultural excellence.
 * 
 * Agent Call Sign: css-migration-agent
 * Cultural Expertise: Māori design patterns, contemporary excellence
 * Performance Target: Zero impact on 9.61s build time
 */

import fs from 'fs/promises';
import path from 'path';

interface CulturalDesignTokens {
  colors: Record<string, string>;
  animations: Record<string, string>;
  shapes: Record<string, string>;
  gradients: Record<string, string>;
  typography: Record<string, string>;
}

interface MigrationResult {
  success: boolean;
  extractedTokens: number;
  performanceImpact: string;
  culturalPatterns: string[];
  errors: string[];
}

class CSSMigrationAgent {
  private sourceFile = '/Users/admin/gemini-react-app/te-kete-ako-clean/TeAoMarama-foundation/te-kete-unified.css';
  private targetFile = '/Users/admin/gemini-react-app/src/styles/cultural-excellence.css';
  private unifiedDesignFile = '/Users/admin/gemini-react-app/src/styles/unified-design-system.css';
  
  private culturalTokens: CulturalDesignTokens = {
    colors: {},
    animations: {},
    shapes: {},
    gradients: {},
    typography: {}
  };

  async execute(): Promise<MigrationResult> {
    console.log('🎨 CSS MIGRATION AGENT ACTIVATING...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const startTime = Date.now();
    const errors: string[] = [];
    let extractedTokens = 0;
    const culturalPatterns: string[] = [];

    try {
      // Phase 1: Extract Cultural Design Tokens
      console.log('📖 Phase 1: Reading Te Kete Ako unified CSS...');
      const sourceCSS = await this.readSourceCSS();
      console.log(`   ✅ Loaded ${Math.round(sourceCSS.length / 1024)}KB of cultural excellence`);

      // Phase 2: Parse Cultural Patterns
      console.log('🎭 Phase 2: Extracting cultural design patterns...');
      const extractionResult = this.extractCulturalPatterns(sourceCSS);
      extractedTokens = extractionResult.tokenCount;
      culturalPatterns.push(...extractionResult.patterns);
      console.log(`   ✅ Extracted ${extractedTokens} cultural design tokens`);

      // Phase 3: Generate Cultural CSS
      console.log('🌟 Phase 3: Generating cultural excellence CSS...');
      const culturalCSS = this.generateCulturalCSS();
      console.log(`   ✅ Generated ${Math.round(culturalCSS.length / 1024)}KB cultural enhancement`);

      // Phase 4: Safe Integration
      console.log('🔗 Phase 4: Integrating with unified design system...');
      await this.integrateWithUnifiedSystem(culturalCSS);
      console.log('   ✅ Cultural patterns safely integrated');

      // Phase 5: Performance Validation
      console.log('⚡ Phase 5: Performance impact validation...');
      const performanceImpact = await this.validatePerformanceImpact();
      console.log(`   ✅ Performance impact: ${performanceImpact}`);

      const duration = Date.now() - startTime;
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🎉 CSS MIGRATION AGENT SUCCESSFUL! (${duration}ms)`);
      console.log(`   🎨 Cultural patterns: ${culturalPatterns.length}`);
      console.log(`   🔧 Design tokens: ${extractedTokens}`);
      console.log(`   ⚡ Performance: ${performanceImpact}`);

      return {
        success: true,
        extractedTokens,
        performanceImpact,
        culturalPatterns,
        errors
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(errorMessage);
      console.error('❌ CSS Migration Agent failed:', errorMessage);
      
      return {
        success: false,
        extractedTokens: 0,
        performanceImpact: 'Failed',
        culturalPatterns: [],
        errors
      };
    }
  }

  private async readSourceCSS(): Promise<string> {
    try {
      return await fs.readFile(this.sourceFile, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read source CSS: ${error}`);\n    }
  }

  private extractCulturalPatterns(css: string): { tokenCount: number; patterns: string[] } {
    const patterns: string[] = [];
    let tokenCount = 0;

    // Extract Cultural Color Palette
    const colorMatches = css.match(/--color-[^:]+:[^;]+;/g) || [];
    colorMatches.forEach(match => {
      if (match.includes('pounamu') || match.includes('kowhai') || 
          match.includes('moana') || match.includes('whenua')) {
        const [key, value] = match.split(':');
        this.culturalTokens.colors[key.trim()] = value.replace(';', '').trim();
        tokenCount++;
        patterns.push(`Cultural Color: ${key.trim()}`);
      }
    });

    // Extract Cultural Animations
    const animationMatches = css.match(/@keyframes\\s+[^{]+\\{[^}]+\\}/g) || [];
    animationMatches.forEach(match => {
      const animationName = match.match(/@keyframes\\s+([^\\s{]+)/)?.[1];
      if (animationName && (animationName.includes('mauri') || 
                           animationName.includes('tukutuku') ||
                           animationName.includes('kowhaiwhai'))) {
        this.culturalTokens.animations[animationName] = match;
        tokenCount++;
        patterns.push(`Cultural Animation: ${animationName}`);
      }
    });

    // Extract Organic Shapes
    const shapeMatches = css.match(/--radius-[^:]+:[^;]+;/g) || [];
    shapeMatches.forEach(match => {
      if (match.includes('organic') || match.includes('wharenui') || match.includes('carved')) {
        const [key, value] = match.split(':');
        this.culturalTokens.shapes[key.trim()] = value.replace(';', '').trim();
        tokenCount++;
        patterns.push(`Cultural Shape: ${key.trim()}`);
      }
    });

    // Extract Cultural Gradients
    const gradientMatches = css.match(/--gradient-[^:]+:[^;]+;/g) || [];
    gradientMatches.forEach(match => {
      if (match.includes('cultural') || match.includes('hero') || match.includes('primary')) {
        const [key, value] = match.split(':');
        this.culturalTokens.gradients[key.trim()] = value.replace(';', '').trim();
        tokenCount++;
        patterns.push(`Cultural Gradient: ${key.trim()}`);
      }
    });

    // Extract Typography Patterns
    const fontMatches = css.match(/--font-[^:]+:[^;]+;/g) || [];
    fontMatches.forEach(match => {
      const [key, value] = match.split(':');
      this.culturalTokens.typography[key.trim()] = value.replace(';', '').trim();
      tokenCount++;
      patterns.push(`Cultural Typography: ${key.trim()}`);
    });

    return { tokenCount, patterns };
  }

  private generateCulturalCSS(): string {
    return `/* =================================================================
   CULTURAL EXCELLENCE CSS - Te Kete Ako Design Pattern Integration
   Generated by CSS Migration Agent
   "Whaowhia te kete mātauranga" - Fill the basket of knowledge
   ================================================================= */

/* Cultural Color Palette - Te Ao Māori Contemporary */
:root {
${Object.entries(this.culturalTokens.colors).map(([key, value]) => 
    `    ${key}: ${value};`
  ).join('\\n')}

/* Cultural Typography System */
${Object.entries(this.culturalTokens.typography).map(([key, value]) => 
    `    ${key}: ${value};`
  ).join('\\n')}

/* Organic Shapes - Inspired by Natural Māori Forms */
${Object.entries(this.culturalTokens.shapes).map(([key, value]) => 
    `    ${key}: ${value};`
  ).join('\\n')}

/* Cultural Gradients - Sacred Beauty */
${Object.entries(this.culturalTokens.gradients).map(([key, value]) => 
    `    ${key}: ${value};`
  ).join('\\n')}
}

/* Cultural Animations - Māori-Inspired Movements */
${Object.values(this.culturalTokens.animations).join('\\n\\n')}

/* Cultural Component Enhancements */
.cultural-card {
    background: var(--gradient-cultural, linear-gradient(135deg, #f0f8f0 0%, #e8f4f8 100%));
    border-radius: var(--radius-organic, 0.75rem);
    position: relative;
    overflow: hidden;
}

.cultural-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-cultural);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.cultural-card:hover::before {
    opacity: 1;
}

.mauri-pulse {
    animation: mauriPulse 4s ease-in-out infinite;
}

.cultural-text-gradient {
    background: var(--gradient-cultural);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Cultural Button Enhancement */
.btn-cultural {
    background: var(--gradient-cultural);
    color: white;
    border-radius: var(--radius-organic);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.btn-cultural:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(27, 127, 90, 0.3);
}

/* Responsive Cultural Patterns */
@media (max-width: 768px) {
    .cultural-card {
        border-radius: var(--radius-md, 0.5rem);
    }
}

/* Performance Optimized Animations */
@media (prefers-reduced-motion: reduce) {
    .mauri-pulse {
        animation: none;
    }
    
    .cultural-card::before {
        transition: none;
    }
}`;
  }

  private async integrateWithUnifiedSystem(culturalCSS: string): Promise<void> {
    // Create cultural excellence file
    await fs.writeFile(this.targetFile, culturalCSS, 'utf-8');

    // Read unified design system
    let unifiedCSS = '';
    try {
      unifiedCSS = await fs.readFile(this.unifiedDesignFile, 'utf-8');
    } catch (error) {
      console.log('   📝 Creating new unified design system file...');
    }

    // Add import to unified system if not already present
    const importStatement = `@import url('./cultural-excellence.css');\\n`;
    if (!unifiedCSS.includes('cultural-excellence.css')) {
      const updatedCSS = importStatement + unifiedCSS;
      await fs.writeFile(this.unifiedDesignFile, updatedCSS, 'utf-8');
      console.log('   ✅ Cultural import added to unified design system');
    }
  }

  private async validatePerformanceImpact(): Promise<string> {
    try {
      const stats = await fs.stat(this.targetFile);
      const sizeKB = Math.round(stats.size / 1024);
      
      if (sizeKB < 10) {
        return `Excellent (${sizeKB}KB)`;
      } else if (sizeKB < 25) {
        return `Good (${sizeKB}KB)`;
      } else if (sizeKB < 50) {
        return `Acceptable (${sizeKB}KB)`;
      } else {
        return `Warning (${sizeKB}KB) - Consider optimization`;
      }
    } catch (error) {
      return 'Unable to assess';
    }
  }
}

// Agent Execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const agent = new CSSMigrationAgent();
  agent.execute()
    .then(result => {
      if (result.success) {
        console.log('🎨 CSS Migration Agent completed successfully!');
        process.exit(0);
      } else {
        console.error('❌ CSS Migration Agent failed');
        result.errors.forEach(error => console.error(`   ${error}`));
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('💥 CSS Migration Agent crashed:', error);
      process.exit(1);
    });
}

export { CSSMigrationAgent };
export type { MigrationResult, CulturalDesignTokens };