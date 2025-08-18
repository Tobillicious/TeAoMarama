const fs = require('fs');
const path = require('path');
const { glob } = require('fast-glob');

const issues = {
  missingAlt: [],
  emptyLinks: [],
  multipleH1: [],
  missingLandmarks: [],
  poorContrast: [],
  malformedLinks: []
};

async function scanFiles() {
  console.log('🔍 Starting accessibility and link hygiene sweep...');
  
  const files = await glob('public/**/*.html', { 
    ignore: ['**/node_modules/**', '**/backups/**']
  });
  
  let fixedCount = 0;
  
  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;
      const relativePath = path.relative('public', file);
      
      // 1. Check for images without alt text
      const imgMatches = content.match(/<img[^>]*>/gi) || [];
      for (const img of imgMatches) {
        if (!img.includes('alt=')) {
          issues.missingAlt.push(`${relativePath}: ${img.substring(0, 50)}...`);
          // Auto-fix: add empty alt for decorative images with common patterns
          if (img.includes('icon') || img.includes('decoration') || img.includes('avatar')) {
            const fixed = img.replace('>', ' alt="">');
            content = content.replace(img, fixed);
            modified = true;
          }
        }
      }
      
      // 2. Check for empty links
      const emptyLinkMatches = content.match(/<a[^>]*><\s*\/a>/gi) || [];
      if (emptyLinkMatches.length > 0) {
        issues.emptyLinks.push(`${relativePath}: ${emptyLinkMatches.length} empty links`);
        // Remove empty links
        content = content.replace(/<a[^>]*><\s*\/a>/gi, '');
        modified = true;
      }
      
      // 3. Check for multiple H1 tags
      const h1Matches = content.match(/<h1[^>]*>/gi) || [];
      if (h1Matches.length > 1) {
        issues.multipleH1.push(`${relativePath}: ${h1Matches.length} h1 tags`);
        // Auto-fix: convert extra h1s to h2s (keep first one)
        let h1Count = 0;
        content = content.replace(/<h1([^>]*)>/gi, (match, attrs) => {
          h1Count++;
          return h1Count === 1 ? match : `<h2${attrs}>`;
        });
        content = content.replace(/<\/h1>/gi, (match, offset) => {
          // Count h1 opens before this position to determine if this should be h2
          const beforeThis = content.substring(0, offset);
          const h1Opens = (beforeThis.match(/<h1[^>]*>/gi) || []).length;
          const h1Closes = (beforeThis.match(/<\/h1>/gi) || []).length;
          return h1Opens > 1 && h1Closes >= 1 ? '</h2>' : '</h1>';
        });
        modified = true;
      }
      
      // 4. Fix malformed href attributes
      const malformedLinks = content.match(/href="\/https?:\/\//gi) || [];
      if (malformedLinks.length > 0) {
        issues.malformedLinks.push(`${relativePath}: ${malformedLinks.length} malformed links`);
        content = content.replace(/href="\/https?:\/\//gi, 'href="https://');
        modified = true;
      }
      
      // 5. Normalize relative vs root-relative links for consistency
      // Convert ../path to /path for root-relative consistency
      content = content.replace(/href="\.\.\/([^"]+)"/g, 'href="/$1"');
      content = content.replace(/src="\.\.\/([^"]+)"/g, 'src="/$1"');
      
      // 6. Add rel="noopener" to external links for security
      const externalLinks = content.match(/<a[^>]*href="https?:\/\/[^"]*"[^>]*>/gi) || [];
      for (const link of externalLinks) {
        if (!link.includes('rel=')) {
          const fixed = link.replace('>', ' rel="noopener">');
          content = content.replace(link, fixed);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
      }
      
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n✨ Fixed issues in ${fixedCount} files`);
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    filesScanned: files.length,
    filesFixed: fixedCount,
    issues: issues
  };
  
  const reportPath = `reports/accessibility-sweep-${Date.now()}.json`;
  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`📊 Full report saved to: ${reportPath}`);
  console.log('\n🔍 Issues Summary:');
  console.log(`- Missing alt text: ${issues.missingAlt.length}`);
  console.log(`- Empty links: ${issues.emptyLinks.length}`);
  console.log(`- Multiple H1s: ${issues.multipleH1.length}`);
  console.log(`- Malformed links: ${issues.malformedLinks.length}`);
  
  return report;
}

if (require.main === module) {
  scanFiles().catch(console.error);
}

module.exports = { scanFiles };