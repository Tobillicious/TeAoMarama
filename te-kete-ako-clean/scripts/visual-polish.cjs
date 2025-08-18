const fs = require('fs');
const path = require('path');
const { glob } = require('fast-glob');

const polishRules = [
  // Spacing standardization
  { pattern: /margin:\s*1\.5rem/g, replacement: 'margin: var(--space-6)' },
  { pattern: /margin:\s*2rem/g, replacement: 'margin: var(--space-8)' },
  { pattern: /margin:\s*1rem/g, replacement: 'margin: var(--space-4)' },
  { pattern: /padding:\s*1\.5rem/g, replacement: 'padding: var(--space-6)' },
  { pattern: /padding:\s*2rem/g, replacement: 'padding: var(--space-8)' },
  { pattern: /padding:\s*1rem/g, replacement: 'padding: var(--space-4)' },
  { pattern: /margin-bottom:\s*0\.75rem/g, replacement: 'margin-bottom: var(--space-3)' },
  { pattern: /margin-bottom:\s*0\.5rem/g, replacement: 'margin-bottom: var(--space-2)' },
  
  // Border radius standardization
  { pattern: /border-radius:\s*8px/g, replacement: 'border-radius: var(--radius-md)' },
  { pattern: /border-radius:\s*12px/g, replacement: 'border-radius: var(--radius-lg)' },
  { pattern: /border-radius:\s*0\.5rem/g, replacement: 'border-radius: var(--radius-md)' },
  { pattern: /border-radius:\s*0\.75rem/g, replacement: 'border-radius: var(--radius-lg)' },
  
  // Color standardization - avoid hardcoded colors
  { pattern: /#1B4332/g, replacement: 'var(--color-primary)' },
  { pattern: /#F18F01/g, replacement: 'var(--color-accent)' },
  { pattern: /#2E86AB/g, replacement: 'var(--color-secondary)' },
  { pattern: /rgba\(0\s*,\s*0\s*,\s*0\s*,\s*0\.1\)/g, replacement: 'var(--shadow-md)' },
  
  // Typography standardization  
  { pattern: /font-size:\s*0\.9rem/g, replacement: 'font-size: var(--text-sm)' },
  { pattern: /font-size:\s*0\.85rem/g, replacement: 'font-size: var(--text-xs)' },
  { pattern: /font-size:\s*1\.1rem/g, replacement: 'font-size: var(--text-lg)' },
  { pattern: /font-size:\s*1\.2rem/g, replacement: 'font-size: var(--text-xl)' },
  
  // Common spacing patterns
  { pattern: /gap:\s*0\.75rem/g, replacement: 'gap: var(--space-3)' },
  { pattern: /gap:\s*1\.25rem/g, replacement: 'gap: var(--space-5)' },
];

const componentStyles = {
  // Card component standardization
  card: {
    'background': 'var(--color-bg-primary)',
    'border': '1px solid var(--color-neutral-200)',
    'border-radius': 'var(--radius-lg)',
    'box-shadow': 'var(--shadow-sm)',
    'padding': 'var(--space-6)'
  },
  
  // Button component standardization
  'btn, .btn': {
    'border-radius': 'var(--radius-md)',
    'padding': 'var(--space-2) var(--space-4)',
    'font-weight': 'var(--weight-medium)',
    'transition': 'all 0.2s ease'
  },
  
  'btn-primary, .btn-primary': {
    'background': 'var(--color-primary)',
    'color': 'var(--color-text-inverse)',
    'border': '2px solid var(--color-primary)'
  },
  
  'btn-secondary, .btn-secondary': {
    'background': 'var(--color-accent)',
    'color': 'var(--color-text-inverse)',
    'border': '2px solid var(--color-accent)'
  },
  
  'btn-outline, .btn-outline': {
    'background': 'transparent',
    'color': 'var(--color-primary)',
    'border': '2px solid var(--color-primary)'
  }
};

async function polishFiles() {
  console.log('✨ Starting visual polish pass...');
  
  const files = await glob('public/**/*.html', { 
    ignore: ['**/node_modules/**', '**/backups/**']
  });
  
  let polishedCount = 0;
  let inlineStylesFound = 0;
  let inlineStylesFixed = 0;
  
  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;
      const relativePath = path.relative('public', file);
      
      // Apply polish rules to inline styles
      for (const rule of polishRules) {
        const matches = content.match(rule.pattern);
        if (matches) {
          inlineStylesFound += matches.length;
          content = content.replace(rule.pattern, rule.replacement);
          inlineStylesFixed += matches.length;
          modified = true;
        }
      }
      
      // Remove excessive inline styles where appropriate
      // Convert common inline style patterns to classes
      const commonInlinePatterns = [
        // Background patterns
        { 
          pattern: /style="background:\s*var\(--color-cultural-light\);[^"]*"/g,
          replacement: 'class="bg-cultural-light"'
        },
        { 
          pattern: /style="background:\s*white;[^"]*"/g,
          replacement: 'class="bg-white"'
        },
        // Text alignment
        { 
          pattern: /style="text-align:\s*center[^"]*"/g,
          replacement: 'class="text-center"'
        },
        // Display flex
        { 
          pattern: /style="display:\s*flex[^"]*"/g,
          replacement: 'class="flex"'
        }
      ];
      
      for (const pattern of commonInlinePatterns) {
        if (content.match(pattern.pattern)) {
          content = content.replace(pattern.pattern, pattern.replacement);
          modified = true;
        }
      }
      
      // Clean up empty style attributes
      content = content.replace(/style=""\s*/g, '');
      content = content.replace(/style=";\s*"/g, '');
      
      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        polishedCount++;
      }
      
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n✨ Visual polish complete!`);
  console.log(`📊 Files polished: ${polishedCount}`);
  console.log(`🎨 Inline styles standardized: ${inlineStylesFixed} patterns`);
  
  // Add utility classes to design-system-v3.css if they don't exist
  await addUtilityClasses();
  
  const report = {
    timestamp: new Date().toISOString(),
    filesProcessed: files.length,
    filesPolished: polishedCount,
    inlineStylesStandardized: inlineStylesFixed
  };
  
  const reportPath = `reports/visual-polish-${Date.now()}.json`;
  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`📊 Report saved: ${reportPath}`);
  
  return report;
}

async function addUtilityClasses() {
  const cssFile = 'public/css/design-system-v3.css';
  let css = fs.readFileSync(cssFile, 'utf8');
  
  // Add utility classes if they don't exist
  const utilities = `
/* =================================================================
   UTILITY CLASSES - Generated by visual-polish
   ================================================================= */

.bg-cultural-light { background: var(--color-pounamu-light) !important; }
.bg-white { background: var(--color-bg-primary) !important; }
.bg-surface { background: var(--color-bg-secondary) !important; }

.text-center { text-align: center !important; }
.text-left { text-align: left !important; }
.text-right { text-align: right !important; }

.flex { display: flex !important; }
.flex-col { flex-direction: column !important; }
.items-center { align-items: center !important; }
.justify-center { justify-content: center !important; }
.gap-2 { gap: var(--space-2) !important; }
.gap-3 { gap: var(--space-3) !important; }
.gap-4 { gap: var(--space-4) !important; }

.p-2 { padding: var(--space-2) !important; }
.p-3 { padding: var(--space-3) !important; }
.p-4 { padding: var(--space-4) !important; }
.p-6 { padding: var(--space-6) !important; }

.m-2 { margin: var(--space-2) !important; }
.m-3 { margin: var(--space-3) !important; }
.m-4 { margin: var(--space-4) !important; }
.mb-2 { margin-bottom: var(--space-2) !important; }
.mb-3 { margin-bottom: var(--space-3) !important; }
.mb-4 { margin-bottom: var(--space-4) !important; }

.shadow-sm { box-shadow: var(--shadow-sm) !important; }
.shadow-md { box-shadow: var(--shadow-md) !important; }
.rounded-md { border-radius: var(--radius-md) !important; }
.rounded-lg { border-radius: var(--radius-lg) !important; }
`;
  
  // Only add utilities if they don't already exist
  if (!css.includes('UTILITY CLASSES - Generated by visual-polish')) {
    css += utilities;
    fs.writeFileSync(cssFile, css, 'utf8');
    console.log('➕ Added utility classes to design-system-v3.css');
  }
}

if (require.main === module) {
  polishFiles().catch(console.error);
}

module.exports = { polishFiles };