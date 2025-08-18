const fs = require('fs');
const path = require('path');
const { glob } = require('fast-glob');

// Patterns to fix malformed links created by the first link checker
const malformedLinkFixes = [
  // Fix paths that start with /../ (invalid)
  { pattern: /href="\/\.\.\/([^"]+)"/g, replacement: 'href="/$1"' },
  { pattern: /src="\/\.\.\/([^"]+)"/g, replacement: 'src="/$1"' },
  
  // Fix paths that start with /../../ (invalid)
  { pattern: /href="\/\.\.\/\.\.\/([^"]+)"/g, replacement: 'href="/$1"' },
  { pattern: /src="\/\.\.\/\.\.\/([^"]+)"/g, replacement: 'src="/$1"' },
  
  // Fix paths that start with /../../../ (invalid)
  { pattern: /href="\/\.\.\/\.\.\/\.\.\/([^"]+)"/g, replacement: 'href="/$1"' },
  { pattern: /src="\/\.\.\/\.\.\/\.\.\/([^"]+)"/g, replacement: 'src="/$1"' },
  
  // Fix any remaining patterns with multiple ../
  { pattern: /href="\/(\.\.\/)+(.*?)"/g, replacement: 'href="/$2"' },
  { pattern: /src="\/(\.\.\/)+(.*?)"/g, replacement: 'src="/$2"' },
];

async function fixMalformedLinks() {
  console.log('🔧 Starting malformed link repair...');
  
  const files = await glob('public/**/*.html', { 
    ignore: ['**/node_modules/**', '**/backups/**']
  });
  
  let filesModified = 0;
  let totalFixes = 0;
  
  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;
      let fileFixes = 0;
      
      for (const fix of malformedLinkFixes) {
        const matches = content.match(fix.pattern);
        if (matches) {
          content = content.replace(fix.pattern, fix.replacement);
          modified = true;
          fileFixes += matches.length;
          totalFixes += matches.length;
        }
      }
      
      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        filesModified++;
        const relativePath = path.relative('public', file);
        console.log(`✅ Fixed ${fileFixes} links in ${relativePath}`);
      }
      
      if (filesModified % 50 === 0 && filesModified > 0) {
        console.log(`📊 Progress: ${filesModified} files repaired...`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Malformed link repair complete!`);
  console.log(`📊 Files scanned: ${files.length}`);
  console.log(`🔧 Files modified: ${filesModified}`);
  console.log(`🔗 Total fixes applied: ${totalFixes}`);
  
  return { filesScanned: files.length, filesModified, totalFixes };
}

if (require.main === module) {
  fixMalformedLinks().catch(console.error);
}

module.exports = { fixMalformedLinks };