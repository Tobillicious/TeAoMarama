/*
 Standardize HEAD CSS includes across all public HTML files.
 - Ensures base pair appears first:
   /css/design-system-v3.css
   /css/award-winning-polish.css
 - Removes conflicting legacy themes (kehinde-wiley-*, showcase-design-system.css, enhanced-beauty-system.css, mobile-revolution.css, simple-fix.css, critical.css)
 - Preserves page-specific styles (e.g., lesson-plan.css, resource-hub.css) placed after base pair
 - Creates timestamped backups under backups/css-standardize-YYYYMMDD-HHMMSS/

 Usage:
   node scripts/standardize-head-css.cjs --dry      # audit only
   node scripts/standardize-head-css.cjs            # apply changes
*/

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const DRY_RUN = process.argv.includes('--dry');

const BASE_STYLES = [
  '/css/design-system-v3.css',
  '/css/award-winning-polish.css',
  '/css/print.css',
];

const CONFLICT_PATTERNS = [
  /css\/(kehinde-wiley-[^"']+\.css)/i,
  /css\/showcase-design-system\.css/i,
  /css\/enhanced-beauty-system\.css/i,
  /css\/mobile-revolution\.css/i,
  /css\/critical\.css/i,
  /css\/curriculum-style\.css/i,
  /css\/main\.css/i, // old global
  /https?:\/\/fonts\.googleapis\.com\//i, // remove external Google Fonts now that we use system Helvetica
];

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

function ensureBaseFirst(html) {
  const linkRegex = /<link[^>]+rel=["']stylesheet["'][^>]*>/gi;
  const links = [...html.matchAll(linkRegex)].map(m => ({ html: m[0], idx: m.index }));
  if (!links.length) {
    // No existing stylesheet links: inject base pair before </head>
    const headCloseIdx = html.search(/<\/head>/i);
    if (headCloseIdx !== -1) {
      const before = html.slice(0, headCloseIdx);
      const after = html.slice(headCloseIdx);
      const indentMatch = before.match(/(^|\n)([\t ]*)[^\n]*$/);
      const indent = (indentMatch && indentMatch[2]) || '    ';
      const newBlock = BASE_STYLES.map(h => {
        const media = h.endsWith('/print.css') ? ' media="print"' : '';
        return `${indent}<link rel="stylesheet" href="${h}"${media}/>`;
      }).join('\n');
      // Add breadcrumbs script if not already present
      let newBlockWithScript = newBlock;
      if (!html.includes('js/breadcrumbs.js')) {
        const breadcrumbsScript = `${indent}<script src="/js/breadcrumbs.js" defer></script>`;
        newBlockWithScript = newBlock + '\n' + breadcrumbsScript;
      }
      const nextHtml = before + newBlockWithScript + '\n' + after;
      return { html: nextHtml, changed: true, report: 'inserted-base-before-head-close' };
    }
    return { html, changed: false, report: 'no-styles-no-head' };
  }

  const hrefRegex = /href=["']([^"']+)["']/i;
  const existing = links.map(l => ({ ...l, href: (l.html.match(hrefRegex) || [])[1] || '' }));

  const keep = [];
  for (const l of existing) {
    const href = l.href;
    if (!href) continue;
    const isConflict = CONFLICT_PATTERNS.some(p => p.test(href));
    const normalized = href.startsWith('/') ? href : ('/' + href.replace(/^\.\//, ''));
    const isBase = BASE_STYLES.includes(normalized);
    if (isConflict && !isBase) continue; // drop
    keep.push(normalized);
  }

  const normalizedKeep = [...new Set(keep)];
  const nonBase = normalizedKeep.filter(h => !BASE_STYLES.includes(h));
  const ordered = [...BASE_STYLES, ...nonBase];

  const firstIdx = links[0].idx;
  const last = links[links.length - 1];
  const lastEnd = last.idx + last.html.length;

  const before = html.slice(0, firstIdx);
  const after = html.slice(lastEnd);
  const indentMatch = before.match(/(^|\n)([\t ]*)[^\n]*$/);
  const indent = (indentMatch && indentMatch[2]) || '    ';
  const newBlock = ordered.map(h => {
    const media = h.endsWith('/print.css') ? ' media="print"' : '';
    return `${indent}<link rel="stylesheet" href="${h}"${media}/>`;
  }).join('\n');
  
  // Add breadcrumbs script if not already present
  let newBlockWithScript = newBlock;
  if (!html.includes('js/breadcrumbs.js')) {
    const breadcrumbsScript = `${indent}<script src="/js/breadcrumbs.js" defer></script>`;
    newBlockWithScript = newBlock + '\n' + breadcrumbsScript;
  }

  const nextHtml = before + newBlockWithScript + after;
  const changed = nextHtml !== html;
  return { html: nextHtml, changed, report: { beforeCount: links.length, afterCount: ordered.length, removed: links.length - ordered.length } };
}

function auditConflicts(html) {
  const linkRegex = /<link[^>]+rel=["']stylesheet["'][^>]*>/gi;
  const hrefRegex = /href=["']([^"']+)["']/i;
  const matches = [...html.matchAll(linkRegex)];
  const hrefs = matches.map(m => (m[0].match(hrefRegex) || [])[1]).filter(Boolean);
  const conflicts = hrefs.filter(h => CONFLICT_PATTERNS.some(p => p.test(h)));
  const basePresent = BASE_STYLES.every(b => hrefs.some(h => h.endsWith(b.replace('/css/','css/')) || h === b));
  return { hrefs, conflicts, basePresent };
}

function backupAndWrite(file, content, backupDir) {
  const rel = path.relative(ROOT, file);
  const dest = path.join(backupDir, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(file, dest);
  // sanitize stray closing noscript tags
  let sanitized = content.replace(/<\/noscript>/gi, '');
  // remove Google Fonts preconnect links
  sanitized = sanitized.replace(/\n?\s*<link[^>]*rel=["']preconnect["'][^>]*href=["']https?:\/\/fonts\.(?:googleapis|gstatic)\.com["'][^>]*>\s*/gi, '');
  fs.writeFileSync(file, sanitized, 'utf8');
}

function run() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error('public/ directory not found');
    process.exit(1);
  }

  const files = listHtmlFiles(PUBLIC_DIR);
  const ts = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 13) + '00';
  const backupDir = path.join(ROOT, 'backups', `css-standardize-${ts}`);
  if (!DRY_RUN) fs.mkdirSync(backupDir, { recursive: true });

  let changed = 0; let audited = 0; let conflictFiles = 0; let missingBase = 0;

  for (const f of files) {
    const html = fs.readFileSync(f, 'utf8');
    const audit = auditConflicts(html);
    audited++;
    if (audit.conflicts.length) conflictFiles++;
    if (!audit.basePresent) missingBase++;

    const { html: nextHtml, changed: didChange } = ensureBaseFirst(html);
    if (!DRY_RUN && didChange) {
      backupAndWrite(f, nextHtml, backupDir);
      changed++;
    }
  }

  const summary = {
    files: files.length,
    changed,
    conflictFiles,
    missingBase,
    mode: DRY_RUN ? 'dry-run' : 'apply',
    backupDir: DRY_RUN ? null : backupDir,
  };
  console.log(JSON.stringify(summary, null, 2));
}

run();
