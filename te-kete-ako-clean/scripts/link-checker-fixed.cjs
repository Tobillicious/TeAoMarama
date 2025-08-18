const fs = require('fs');
const path = require('path');
const { glob } = require('fast-glob');

const linkIssues = {
  broken: [],
  malformed: [],
  external: [],
  fragments: [],
  duplicates: []
};

// Common link patterns to fix automatically
const linkFixes = [
  // Convert relative paths to root-relative for consistency
  { pattern: /href="\.\.\/([^"]+)"/g, replacement: 'href="/$1"' },
  { pattern: /src="\.\.\/([^"]+)"/g, replacement: 'src="/$1"' },
  
  // Fix double slashes
  { pattern: /href="\/\/([^"]+)"/g, replacement: 'href="/$1"' },
  { pattern: /src="\/\/([^"]+)"/g, replacement: 'src="/$1"' },
  
  // Fix missing leading slash for internal links
  { pattern: /href="(?!https?:|mailto:|tel:|#|\/|\.)([^"]+\.html[^"]*)"/g, replacement: 'href="/$1"' },
  
  // Normalize fragment links
  { pattern: /href="#([^"]*)" /g, replacement: 'href="#$1" ' },
];

function isValidFile(filePath) {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch (error) {
    return false;
  }
}

function resolveInternalPath(href, sourceFile) {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return { type: 'external', resolved: href };
  }
  
  if (href.startsWith('#')) {
    return { type: 'fragment', resolved: href };
  }
  
  let resolvedPath;
  if (href.startsWith('/')) {
    // Root-relative path - should be in public/
    resolvedPath = path.join('public', href.substring(1));
  } else {
    // Relative to current file - sourceFile is already in public/ structure
    const sourceDir = path.dirname(sourceFile);
    resolvedPath = path.resolve(sourceDir, href);
  }
  
  // Remove fragment if present
  const cleanPath = resolvedPath.split('#')[0];
  
  return { 
    type: 'internal', 
    resolved: cleanPath,
    original: href
  };
}

function extractLinks(html) {
  const links = [];
  
  // Extract href links
  const hrefRegex = /<[^>]+href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    links.push({
      type: 'href',
      url: match[1],
      fullTag: match[0],
      index: match.index
    });
  }
  
  // Extract src links (images, scripts)
  const srcRegex = /<[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = srcRegex.exec(html)) !== null) {
    links.push({
      type: 'src', 
      url: match[1],
      fullTag: match[0],
      index: match.index
    });
  }
  
  return links;
}

async function checkFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const links = extractLinks(content);
  const relativePath = path.relative('public', file);
  let modified = false;
  let newContent = content;
  
  for (const link of links) {
    const resolution = resolveInternalPath(link.url, file);
    
    if (resolution.type === 'external') {
      linkIssues.external.push({
        file: relativePath,
        url: link.url,
        type: link.type
      });
      continue;
    }
    
    if (resolution.type === 'fragment') {
      linkIssues.fragments.push({
        file: relativePath,
        url: link.url,
        type: link.type
      });
      continue;
    }
    
    // Check if internal file exists
    if (!isValidFile(resolution.resolved)) {
      linkIssues.broken.push({
        file: relativePath,
        url: link.url,
        resolved: resolution.resolved,
        type: link.type,
        line: content.substring(0, link.index).split('\n').length
      });
    }
  }
  
  // Apply automatic fixes
  for (const fix of linkFixes) {
    if (newContent.match(fix.pattern)) {
      newContent = newContent.replace(fix.pattern, fix.replacement);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(file, newContent, 'utf8');
  }
  
  return { file: relativePath, linksFound: links.length, modified };
}

function findCommonIssues() {
  // Find broken links that appear in multiple files (likely systematic issues)
  const brokenUrls = {};
  for (const issue of linkIssues.broken) {
    if (!brokenUrls[issue.url]) brokenUrls[issue.url] = [];
    brokenUrls[issue.url].push(issue.file);
  }
  
  const commonBroken = Object.entries(brokenUrls)
    .filter(([url, files]) => files.length > 1)
    .map(([url, files]) => ({ url, files, count: files.length }))
    .sort((a, b) => b.count - a.count);
    
  return { commonBroken };
}

function generateSitemap() {
  // Generate a simple sitemap of all HTML files for reference
  const files = fs.readdirSync('public', { recursive: true })
    .filter(f => f.endsWith('.html'))
    .map(f => '/' + f.replace(/\\/g, '/'))
    .sort();
    
  return files;
}

async function checkAllLinks() {
  console.log('🔗 Starting CORRECTED comprehensive link check...');
  
  const files = await glob('public/**/*.html', { 
    ignore: ['**/node_modules/**', '**/backups/**']
  });
  
  let totalLinks = 0;
  let filesFixed = 0;
  const results = [];
  
  for (const file of files) {
    try {
      const result = await checkFile(file);
      results.push(result);
      totalLinks += result.linksFound;
      if (result.modified) filesFixed++;
      
      if (results.length % 100 === 0) {
        console.log(`📊 Processed ${results.length}/${files.length} files...`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  // Analyze results
  const commonIssues = findCommonIssues();
  const sitemap = generateSitemap();
  
  // Generate comprehensive report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      filesScanned: files.length,
      totalLinks: totalLinks,
      filesFixed: filesFixed,
      brokenLinks: linkIssues.broken.length,
      externalLinks: linkIssues.external.length,
      fragmentLinks: linkIssues.fragments.length
    },
    issues: linkIssues,
    commonIssues: commonIssues,
    sitemap: sitemap.slice(0, 50), // First 50 for report brevity
    recommendations: []
  };
  
  // Add smart recommendations
  if (linkIssues.broken.length > 0) {
    const topBroken = commonIssues.commonBroken.slice(0, 5);
    report.recommendations.push(
      `Fix ${topBroken.length} most common broken links first:`,
      ...topBroken.map(b => `  • "${b.url}" (${b.count} files affected)`)
    );
  }
  
  if (linkIssues.external.length > 20) {
    report.recommendations.push(
      `Consider adding rel="noopener" to ${linkIssues.external.length} external links for security`
    );
  }
  
  // Save report
  const reportPath = `reports/link-check-fixed-${Date.now()}.json`;
  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Console summary
  console.log(`\n🔗 CORRECTED Link check complete!`);
  console.log(`📊 Files scanned: ${files.length}`);
  console.log(`🔢 Total links: ${totalLinks}`);
  console.log(`🔧 Files auto-fixed: ${filesFixed}`);
  console.log(`💥 Broken links: ${linkIssues.broken.length}`);
  console.log(`🌐 External links: ${linkIssues.external.length}`);
  console.log(`📄 Report saved: ${reportPath}`);
  
  if (linkIssues.broken.length > 0) {
    console.log(`\n⚠️  Top broken links:`);
    commonIssues.commonBroken.slice(0, 10).forEach(issue => {
      console.log(`   • "${issue.url}" (${issue.count} files)`);
    });
  }
  
  return report;
}

if (require.main === module) {
  checkAllLinks().catch(console.error);
}

module.exports = { checkAllLinks };