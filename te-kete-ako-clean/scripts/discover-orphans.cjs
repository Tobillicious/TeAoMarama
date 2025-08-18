#!/usr/bin/env node
/*
 Crawl public/ HTML files, build a simple internal link graph, and report:
 - total pages
 - orphan pages (no inbound links)
 - pages with zero outbound links
 - pages missing <head>, </head>, or <title>
 - directories with many unlinked pages (potential "lost" sections)

 Outputs a JSON report to reports/site-discovery-YYYYMMDD-HHMMSS.json
 and prints a concise summary to stdout.
*/

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');

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

function read(file) { return fs.readFileSync(file, 'utf8'); }

function isInternalHref(href) {
  if (!href) return false;
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  if (href.startsWith('#')) return false;
  return true;
}

function normalizeHref(fromFile, href) {
  // Convert relative href to absolute filesystem path within public/
  const fromDir = path.dirname(fromFile);
  let target = href;
  // remove query/hash
  target = target.split('#')[0].split('?')[0];
  // handle root-based /path
  if (target.startsWith('/')) {
    target = path.join(PUBLIC_DIR, target.replace(/^\//, ''));
  } else {
    target = path.join(fromDir, target);
  }
  // if target is a directory path (ending with /), append index.html
  try {
    const stat = fs.existsSync(target) ? fs.statSync(target) : null;
    if (stat && stat.isDirectory()) {
      const idx = path.join(target, 'index.html');
      if (fs.existsSync(idx)) return path.normalize(idx);
    }
  } catch (_) {}
  // ensure .html if linking to a file without extension
  if (!/\.html?$/i.test(target)) {
    const htmlCandidate = `${target}.html`;
    if (fs.existsSync(htmlCandidate)) return path.normalize(htmlCandidate);
  }
  return path.normalize(target);
}

function extractLinks(file, html) {
  const linkRe = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  const hrefs = [];
  let m;
  while ((m = linkRe.exec(html)) !== null) {
    hrefs.push(m[1]);
  }
  const internal = hrefs.filter(isInternalHref).map(h => normalizeHref(file, h));
  // Only keep links that point to existing HTML files under public
  const valid = internal.filter(p => p.startsWith(PUBLIC_DIR) && fs.existsSync(p) && p.endsWith('.html'));
  return [...new Set(valid)];
}

function analyze() {
  const files = listHtmlFiles(PUBLIC_DIR);
  const graph = new Map(); // file -> { out: Set, in: Set }
  const meta = new Map(); // file -> { hasHead, hasTitle }

  for (const f of files) {
    graph.set(f, { out: new Set(), in: new Set() });
    const html = read(f);
    const hasHead = /<head[\s>]/i.test(html) && /<\/head>/i.test(html);
    const hasTitle = /<title>[\s\S]*?<\/title>/i.test(html);
    meta.set(f, { hasHead, hasTitle });
    const outLinks = extractLinks(f, html);
    outLinks.forEach(t => graph.get(f).out.add(t));
  }

  // Build inbound links
  for (const [from, { out }] of graph.entries()) {
    for (const to of out) {
      if (!graph.has(to)) continue; // link to non-html or outside public
      graph.get(to).in.add(from);
    }
  }

  const orphan = [];
  const zeroOutbound = [];
  const missingHead = [];
  const missingTitle = [];

  for (const [f, { out, in: inSet }] of graph.entries()) {
    if (inSet.size === 0) orphan.push(f);
    if (out.size === 0) zeroOutbound.push(f);
    const m = meta.get(f);
    if (m && !m.hasHead) missingHead.push(f);
    if (m && !m.hasTitle) missingTitle.push(f);
  }

  // Group orphan pages by directory to spot “lost” clusters
  const orphanDirs = {};
  for (const f of orphan) {
    const rel = path.relative(PUBLIC_DIR, path.dirname(f));
    orphanDirs[rel] = (orphanDirs[rel] || 0) + 1;
  }
  const orphanHotspots = Object.entries(orphanDirs)
    .sort((a,b) => b[1]-a[1])
    .slice(0, 20)
    .map(([dir, count]) => ({ dir, count }));

  const summary = {
    totalPages: files.length,
    orphanCount: orphan.length,
    zeroOutboundCount: zeroOutbound.length,
    missingHeadCount: missingHead.length,
    missingTitleCount: missingTitle.length,
    orphanHotspots,
  };

  const report = {
    summary,
    orphan,
    zeroOutbound,
    missingHead,
    missingTitle,
  };

  const ts = new Date().toISOString().replace(/[-:T]/g, '').slice(0,15);
  const reportsDir = path.join(ROOT, 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const outFile = path.join(reportsDir, `site-discovery-${ts}.json`);
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2));

  console.log(JSON.stringify({ ...summary, report: path.relative(ROOT, outFile) }, null, 2));
}

analyze();
