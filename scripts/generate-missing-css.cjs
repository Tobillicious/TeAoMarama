#!/usr/bin/env node
/**
 * 🎨 GENERATE MISSING CSS FILES
 */

const fs = require('fs');
const path = require('path');

const basicCSSTemplate = (componentName) => `/* ${componentName} Component Styles */

.${componentName.toLowerCase()} {
  /* Add your styles here */
}

.${componentName.toLowerCase()}-container {
  /* Container styles */
}

.${componentName.toLowerCase()}-content {
  /* Content styles */
}

.${componentName.toLowerCase()}-header {
  /* Header styles */
}

.${componentName.toLowerCase()}-title {
  /* Title styles */
}

.${componentName.toLowerCase()}-description {
  /* Description styles */
}

.${componentName.toLowerCase()}-actions {
  /* Action buttons/styles */
}

@media (max-width: 768px) {
  .${componentName.toLowerCase()} {
    /* Mobile styles */
  }
}
`;

const specialTemplates = {
  LazyMarkdownRenderer: `/* LazyMarkdownRenderer Component Styles */

.lazy-markdown-renderer {
  /* Container styles */
}

.lazy-markdown-renderer-content {
  /* Content styles */
}

.lazy-markdown-renderer-loading {
  /* Loading state styles */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-8);
  color: var(--color-text-secondary);
}

.lazy-markdown-renderer-error {
  /* Error state styles */
  color: var(--color-danger);
  padding: var(--space-4);
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-md);
  background-color: var(--color-danger-light);
}
`,

  MarkdownRenderer: `/* MarkdownRenderer Component Styles */

.markdown-renderer {
  line-height: 1.6;
  color: var(--color-text);
}

.markdown-renderer h1,
.markdown-renderer h2,
.markdown-renderer h3,
.markdown-renderer h4,
.markdown-renderer h5,
.markdown-renderer h6 {
  margin-top: var(--space-6);
  margin-bottom: var(--space-3);
  color: var(--color-text);
  font-weight: bold;
}

.markdown-renderer h1 { font-size: var(--text-2xl); }
.markdown-renderer h2 { font-size: var(--text-xl); }
.markdown-renderer h3 { font-size: var(--text-lg); }
.markdown-renderer h4 { font-size: var(--text-base); }
.markdown-renderer h5 { font-size: var(--text-sm); }
.markdown-renderer h6 { font-size: var(--text-xs); }

.markdown-renderer p {
  margin-bottom: var(--space-4);
}

.markdown-renderer ul,
.markdown-renderer ol {
  margin-bottom: var(--space-4);
  padding-left: var(--space-6);
}

.markdown-renderer li {
  margin-bottom: var(--space-2);
}

.markdown-renderer code {
  background-color: var(--color-background-hover);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-family: monospace;
  font-size: var(--text-sm);
}

.markdown-renderer pre {
  background-color: var(--color-background-hover);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin-bottom: var(--space-4);
}

.markdown-renderer blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: var(--space-4);
  margin-bottom: var(--space-4);
  font-style: italic;
  color: var(--color-text-secondary);
}

.markdown-renderer a {
  color: var(--color-primary);
  text-decoration: underline;
}

.markdown-renderer a:hover {
  color: var(--color-primary-dark);
}

.markdown-renderer table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--space-4);
}

.markdown-renderer th,
.markdown-renderer td {
  border: 1px solid var(--color-border);
  padding: var(--space-2) var(--space-3);
  text-align: left;
}

.markdown-renderer th {
  background-color: var(--color-background-hover);
  font-weight: bold;
}
`,

  LightweightMarkdown: `/* LightweightMarkdown Component Styles */

.lightweight-markdown {
  line-height: 1.6;
  color: var(--color-text);
}

.lightweight-markdown h1,
.lightweight-markdown h2,
.lightweight-markdown h3 {
  margin-top: var(--space-4);
  margin-bottom: var(--space-2);
  color: var(--color-text);
  font-weight: bold;
}

.lightweight-markdown h1 { font-size: var(--text-xl); }
.lightweight-markdown h2 { font-size: var(--text-lg); }
.lightweight-markdown h3 { font-size: var(--text-base); }

.lightweight-markdown p {
  margin-bottom: var(--space-3);
}

.lightweight-markdown ul,
.lightweight-markdown ol {
  margin-bottom: var(--space-3);
  padding-left: var(--space-4);
}

.lightweight-markdown li {
  margin-bottom: var(--space-1);
}

.lightweight-markdown a {
  color: var(--color-primary);
  text-decoration: underline;
}

.lightweight-markdown a:hover {
  color: var(--color-primary-dark);
}
`,

  TeReoWordle: `/* TeReoWordle Component Styles */

.te-reo-wordle {
  max-width: 500px;
  margin: 0 auto;
  padding: var(--space-6);
}

.te-reo-wordle-header {
  text-align: center;
  margin-bottom: var(--space-6);
}

.te-reo-wordle-title {
  font-size: var(--text-2xl);
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: var(--space-2);
}

.te-reo-wordle-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.te-reo-wordle-game {
  margin-bottom: var(--space-6);
}

.te-reo-wordle-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.te-reo-wordle-cell {
  aspect-ratio: 1;
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  font-weight: bold;
  text-transform: uppercase;
  background-color: var(--color-background);
  transition: all 0.2s ease;
}

.te-reo-wordle-cell.filled {
  border-color: var(--color-text);
}

.te-reo-wordle-cell.correct {
  background-color: var(--color-success);
  color: white;
  border-color: var(--color-success);
}

.te-reo-wordle-cell.present {
  background-color: var(--color-warning);
  color: white;
  border-color: var(--color-warning);
}

.te-reo-wordle-cell.absent {
  background-color: var(--color-text-secondary);
  color: white;
  border-color: var(--color-text-secondary);
}

.te-reo-wordle-keyboard {
  display: grid;
  gap: var(--space-1);
}

.te-reo-wordle-keyboard-row {
  display: flex;
  gap: var(--space-1);
  justify-content: center;
}

.te-reo-wordle-key {
  padding: var(--space-3) var(--space-2);
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  text-transform: uppercase;
}

.te-reo-wordle-key:hover {
  background-color: var(--color-background-hover);
}

.te-reo-wordle-key.correct {
  background-color: var(--color-success);
  color: white;
  border-color: var(--color-success);
}

.te-reo-wordle-key.present {
  background-color: var(--color-warning);
  color: white;
  border-color: var(--color-warning);
}

.te-reo-wordle-key.absent {
  background-color: var(--color-text-secondary);
  color: white;
  border-color: var(--color-text-secondary);
}

.te-reo-wordle-message {
  text-align: center;
  margin-bottom: var(--space-4);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  font-weight: 500;
}

.te-reo-wordle-message.success {
  background-color: var(--color-success-light);
  color: var(--color-success-dark);
  border: 1px solid var(--color-success);
}

.te-reo-wordle-message.error {
  background-color: var(--color-danger-light);
  color: var(--color-danger-dark);
  border: 1px solid var(--color-danger);
}

.te-reo-wordle-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
}

@media (max-width: 768px) {
  .te-reo-wordle {
    padding: var(--space-4);
  }
  
  .te-reo-wordle-grid {
    gap: var(--space-1);
  }
  
  .te-reo-wordle-cell {
    font-size: var(--text-lg);
  }
  
  .te-reo-wordle-key {
    padding: var(--space-2) var(--space-1);
    min-width: 35px;
    font-size: var(--text-xs);
  }
}
`,
};

function generateMissingCSS() {
  console.log('🎨 GENERATING MISSING CSS FILES');
  console.log('='.repeat(50));

  const directories = ['src/components', 'src/pages'];

  let generatedCount = 0;
  let skippedCount = 0;

  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    const tsxFiles = files.filter((f) => f.endsWith('.tsx'));

    tsxFiles.forEach((tsxFile) => {
      const componentName = tsxFile.replace('.tsx', '');
      const cssFile = path.join(dir, `${componentName}.css`);

      if (!fs.existsSync(cssFile)) {
        // Check if we have a special template
        let cssContent = specialTemplates[componentName] || basicCSSTemplate(componentName);

        fs.writeFileSync(cssFile, cssContent);
        console.log(`✅ Generated: ${cssFile}`);
        generatedCount++;
      } else {
        console.log(`⏭️  Skipped: ${cssFile} (already exists)`);
        skippedCount++;
      }
    });
  });

  console.log('\n' + '='.repeat(50));
  console.log(`📊 SUMMARY:`);
  console.log(`  ✅ Generated: ${generatedCount} CSS files`);
  console.log(`  ⏭️  Skipped: ${skippedCount} existing files`);
  console.log(`  🎯 Total processed: ${generatedCount + skippedCount} components`);

  if (generatedCount > 0) {
    console.log('\n🚀 Next steps:');
    console.log('1. Review generated CSS files');
    console.log('2. Add specific styles as needed');
    console.log('3. Import CSS files in components');
    console.log('4. Test components for styling');
  }
}

generateMissingCSS();
