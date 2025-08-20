#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

// Get list of handout files without default export
const files = execSync('find /Users/admin/gemini-react-app/src/components/educational/handouts -name "*.tsx" -exec grep -L "export default" {} \\;', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(file => file.length > 0);

console.log(`Found ${files.length} files to process...`);

files.forEach(filePath => {
  try {
    const content = readFileSync(filePath, 'utf8');
    
    // Extract component name from the export statement
    const exportMatch = content.match(/export const (\w+):/);
    if (!exportMatch) {
      console.log(`Skipping ${filePath} - no named export found`);
      return;
    }
    
    const componentName = exportMatch[1];
    
    // Check if default export already exists
    if (content.includes('export default')) {
      console.log(`Skipping ${filePath} - already has default export`);
      return;
    }
    
    // Add default export at the end of the file
    const newContent = content + `\n\nexport default ${componentName};\n`;
    
    writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ Added default export to ${filePath.split('/').pop()}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
  }
});

console.log('✅ Default exports added successfully!');