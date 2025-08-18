#!/usr/bin/env node
/*
Generate sitewide discoverability pages:
 - public/sitemap.html: all pages grouped by directory
 - public/orphans.html: pages with no inbound links

Uses the latest report in reports/site-discovery-*.json if present;
otherwise recomputes a minimal listing of all pages without orphan detection.
*/

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const REPORTS_DIR = path.join(ROOT, 'reports');

function listHtmlFiles(dir) {
  const out = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const fp = path.join(dir, it.name);
    if (it.isDirectory()) out.push(...listHtmlFiles(fp));
    else if (it.isFile() && it.name.endsWith('.html')) out.push(fp);
  }
  return out;
}

function latestReport() {
  if (!fs.existsSync(REPORTS_DIR)) return null;
  const files = fs.readdirSync(REPORTS_DIR).filter(f => f.startsWith('site-discovery-') && f.endsWith('.json'));
  if (!files.length) return null;
  files.sort((a,b)=> fs.statSync(path.join(REPORTS_DIR,b)).mtimeMs - fs.statSync(path.join(REPORTS_DIR,a)).mtimeMs);
  return path.join(REPORTS_DIR, files[0]);
}

function rel(p) { return path.relative(PUBLIC_DIR, p).replace(/\\/g,'/'); }

function buildSitemap(groups) {
  const sections = Object.keys(groups).sort().map(dir => {
    const items = groups[dir].sort().map(f => `        <li><a href="/${f}">${f}</a></li>`).join('\n');
    return `    <section class="sitemap-section"><h2>${dir || 'root'}</h2>\n      <ul>\n${items}\n      </ul>\n    </section>`;
  }).join('\n');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Sitemap</title><link rel="stylesheet" href="/css/design-system-v3.css"/><link rel="stylesheet" href="/css/award-winning-polish.css"/></head><body><main class="container"><h1>Sitemap</h1>${sections}</main></body></html>`;
}

function buildOrphans(orphanList) {
  const items = orphanList.sort().map(f => `      <li><a href="/${f}">${f}</a></li>`).join('\n');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Discover Orphans</title><link rel="stylesheet" href="/css/design-system-v3.css"/><link rel="stylesheet" href="/css/award-winning-polish.css"/></head><body><main class="container"><h1>Discover: Unlinked Pages</h1><p>These pages currently have no inbound links. Consider linking them from hubs or units.</p><ul>\n${items}\n</ul></main></body></html>`;
}

function run() {
  const all = listHtmlFiles(PUBLIC_DIR).map(rel);
  const groups = {};
  for (const r of all) {
    const dir = r.includes('/') ? r.slice(0, r.lastIndexOf('/')) : '';
    groups[dir] = groups[dir] || [];
    groups[dir].push(r);
  }

  // Try to read latest discovery report for orphans
  let orphans = [];
  const rep = latestReport();
  if (rep) {
    try {
      const data = JSON.parse(fs.readFileSync(rep, 'utf8'));
      if (data && Array.isArray(data.orphan)) {
        orphans = data.orphan.map(p => path.relative(PUBLIC_DIR, p).replace(/\\/g,'/'));
      }
    } catch (e) {
      console.error('Failed to read discovery report:', e.message);
    }
  }

  const sitemapHtml = buildSitemap(groups);
  const orphansHtml = buildOrphans(orphans);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.html'), sitemapHtml, 'utf8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'orphans.html'), orphansHtml, 'utf8');
  console.log(JSON.stringify({ sitemap: 'public/sitemap.html', orphans: 'public/orphans.html', total: all.length, orphansCount: orphans.length }, null, 2));
}

run();
