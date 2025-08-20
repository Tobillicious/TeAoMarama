#!/usr/bin/env tsx
/**
 * 🔧 FIX INVALID NAMES SCRIPT
 *
 * Fixes all invalid component names in App.tsx that contain hyphens or other invalid characters
 */

import { readFile, writeFile } from 'fs/promises';
class InvalidNameFixer {
  private appTsxPath = 'src/App.tsx';

  async fixInvalidNames(): Promise<void> {
    console.log('🔧 Fixing invalid component names in App.tsx...\n');

    try {
      let appContent = await readFile(this.appTsxPath, 'utf8');

      // Fix all invalid component names with hyphens
      const _invalidNames = [
        'ai-impact-comprehension-handout',
        'atoms-in-everyday-materials',
        'authors-purpose-entertain-handout',
        'authors-purpose-handout',
        'authors-purpose-inform-handout',
        'authors-purpose-persuade-handout',
        'bar-graph-handout',
        'biochemistry-traditional-medicine',
        'body-measurement-traditional',
        'ceremonial-circle-geometry',
        'children-rights-responsibilities',
        'climate-change-aotearoa-handout',
        'climate-emergency-aotearoa-handout',
        'cognitive-biases-comprehension-handout',
        'colonization-perspectives-handout',
        'community-helpers-study',
        'community-needs-survey',
        'cultural-celebrations-comparison',
        'cultural-decision-making-traditions',
        'cultural-heroes-comprehension',
        'cultural-identity-deep-dive-comprehension',
        'cultural-practice-explanation',
        'cultural-preservation-essays',
        'cultural-safety-classroom-checklists-alpha',
        'cultural-stem-assessment-rubric',
        'cultural-stories-comprehension',
        'family-data-collection',
        'family-tree-writing',
        'future-visioning-creative-writing',
        'indigenous-rights-research',
        'iwi-economics-mathematics',
        'kaitiaki-generated-migration-student-handout',
        'kaitiakitanga-field-journal',
        'kaitiakitanga-kids',
        'kumara-storage-place-value',
        'maori-astronomy-navigation-handout',
        'maori-geometric-patterns-handout',
        'maori-navigation-wayfinding-handout',
        'marae-shapes-geometry',
        'mountain-navigation-trigonometry',
        'nature-observation-journal',
        'oral-storytelling-handout',
        'physics-of-traditional-games',
        'probability-handout',
        'renewable-energy-traditional',
        'research-methods-handout',
        'resource-sustainability-study',
        'scientific-method-handout',
        'star-navigation-coordinates',
        'sustainable-fishing-equations',
        'sustainable-technology-design-challenge',
        'traditional-counting-systems',
        'traditional-dye-chemistry',
        'traditional-ecological-indicators-handout',
        'traditional-materials-science',
        'traditional-navigation-mathematics-handout',
        'treaty-settlement-statistics',
        'tukutuku-patterns-maths',
        'unit-2-technology-definition-challenge',
        'weather-prediction-probability',
        'writers-toolkit-conclusion-handout',
        'writers-toolkit-diction-handout',
        'writers-toolkit-fluency-handout',
        'writers-toolkit-hook-handout',
        'writers-toolkit-inform-structure-handout',
        'writers-toolkit-peel-argument-handout',
        'writers-toolkit-revision-handout',
        'writers-toolkit-rhetorical-devices-handout',
        'writers-toolkit-show-dont-tell-handout',
        'writers-toolkit-suspense-handout',
        'writers-toolkit-tone-handout',
        'year-9-starter-pack-alpha-build',
        'year-9-starter-pack-essential-skills',
        'youth-vaping-comprehension-handout',
      ];

      for (const invalidName of invalidNames) {
        const _validName = this.convertToValidName(invalidName);
        
        // Fix the const declaration
        appContent = appContent.replace(
          new RegExp(`const ${invalidName} = lazy\(`, 'g'),
          `const ${validName} = lazy(`
        );

        // Fix the route element
        appContent = appContent.replace(
          new RegExp(`element: <${invalidName} />`, 'g'),
          `element: <${validName} />`
        );
      }

      // Write the fixed content
      await writeFile(this.appTsxPath, appContent, 'utf8');
      console.log('✅ Fixed all invalid component names in App.tsx');

    } catch (error) {
      console.error('Error fixing component names:', error);
    }
  }

  private convertToValidName(name: string): string {
    // Convert kebab-case to PascalCase
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}

// Run the invalid name fixer
const _fixer = new InvalidNameFixer();
fixer
  .fixInvalidNames()
  .then(() => {
    console.log('\n🔧 Invalid name fixing complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Invalid name fixing failed:', error);
    process.exit(1);
  });
