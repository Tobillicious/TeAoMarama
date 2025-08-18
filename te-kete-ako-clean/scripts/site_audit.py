#!/usr/bin/env python3
import re
import json
from pathlib import Path
from collections import Counter, defaultdict
from typing import Optional

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
OUTPUT_JSON = ROOT / 'site_audit_report.json'
OUTPUT_MD = ROOT / 'SITE_AUDIT_REPORT.md'

THIRD_PARTY_TOKENS = [
    'supabase', 'firebase', 'auth0', 'netlify', 'vercel', 'aws-amplify', 'gcp',
    'exa', 'deepseek', 'gemini', 'openai', 'anthropic', 'stripe', 'plausible', 'gtag', 'google-analytics'
]

FILE_TYPES_TO_SCAN = ('.html', '.js', '.ts', '.css')

HREF_RE = re.compile(r'href="([^"]+)"')
SRC_RE = re.compile(r'src="([^"]+)"')
TITLE_RE = re.compile(r'<title>(.*?)</title>', re.IGNORECASE | re.DOTALL)
PLACEHOLDER_RE = re.compile(r'\$\{[^}]+\}')


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding='utf-8', errors='ignore')
    except Exception:
        return ''


def resolve_path(base: Path, link: str) -> Optional[Path]:
    if not link or link.startswith('#'):
        return None
    if link.startswith(('http://', 'https://', 'mailto:', 'tel:', 'javascript:')):
        return None
    # strip query/fragment
    link = link.split('?', 1)[0].split('#', 1)[0]
    if link.startswith('/'):
        # site-root relative (under public)
        return (PUBLIC / link.lstrip('/')).resolve()
    return (base.parent / link).resolve()


def audit_public_html():
    pages = []
    link_counts = Counter()
    script_counts = Counter()
    stylesheet_counts = Counter()
    missing_includes = []

    for html in PUBLIC.rglob('*.html'):
        content = read_text(html)
        title_match = TITLE_RE.search(content)
        title = title_match.group(1).strip() if title_match else ''

        hrefs = HREF_RE.findall(content)
        srcs = SRC_RE.findall(content)
        stylesheets = [h for h in hrefs if h.lower().endswith('.css')]
        scripts = [s for s in srcs if s.lower().endswith(('.js', '.mjs'))]

        for h in hrefs:
            link_counts[h] += 1
            target = resolve_path(html, h)
            if target and not target.exists():
                missing_includes.append({'page': str(html.relative_to(ROOT)), 'missing_href': h, 'resolved': str(target)})
        for s in scripts:
            script_counts[s] += 1
            target = resolve_path(html, s)
            if target and not target.exists():
                missing_includes.append({'page': str(html.relative_to(ROOT)), 'missing_src': s, 'resolved': str(target)})
        for css in stylesheets:
            stylesheet_counts[css] += 1

        pages.append({
            'path': str(html.relative_to(ROOT)),
            'title': title,
            'stylesheets': stylesheets,
            'scripts': scripts,
        })

    return pages, link_counts, script_counts, stylesheet_counts, missing_includes


def scan_third_parties():
    occurrences = defaultdict(list)
    for path in ROOT.rglob('*'):
        if not path.is_file():
            continue
        if path.suffix.lower() not in FILE_TYPES_TO_SCAN:
            continue
        text = read_text(path).lower()
        if not text:
            continue
        for token in THIRD_PARTY_TOKENS:
            if token in text:
                occurrences[token].append(str(path.relative_to(ROOT)))
    return occurrences


def scan_placeholders_and_todos():
    placeholders = []
    todos = []
    for path in ROOT.rglob('*'):
        if not path.is_file():
            continue
        if path.suffix.lower() not in FILE_TYPES_TO_SCAN:
            continue
        text = read_text(path)
        if PLACEHOLDER_RE.search(text):
            placeholders.append(str(path.relative_to(ROOT)))
        if 'TODO' in text or 'FIXME' in text:
            todos.append(str(path.relative_to(ROOT)))
    return placeholders, todos


def find_orphan_assets(page_htmls):
    referenced = set()
    for page in page_htmls:
        for css in page['stylesheets']:
            referenced.add(css.split('?', 1)[0])
        for s in page['scripts']:
            referenced.add(s.split('?', 1)[0])

    # Normalize referenced relative to public for comparison
    normalized = set()
    for ref in referenced:
        if ref.startswith(('http://', 'https://')):
            continue
        if ref.startswith('/'):
            normalized.add(ref.lstrip('/'))
        else:
            normalized.add(ref)

    orphans = []
    for asset in PUBLIC.rglob('*'):
        if not asset.is_file():
            continue
        if asset.suffix.lower() not in ('.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'):
            continue
        rel = str(asset.relative_to(PUBLIC))
        # crude check: if exact rel not referenced, mark orphan candidate
        if rel not in normalized:
            orphans.append(str(asset.relative_to(ROOT)))
    return orphans


def write_markdown(report):
    lines = []
    lines.append('### Site Audit Report')
    lines.append('')
    lines.append(f"- **Pages scanned**: {len(report['pages'])}")
    lines.append(f"- **Missing includes**: {len(report['missing_includes'])}")
    lines.append(f"- **Third-party references**: {', '.join(sorted(report['third_parties'].keys())) or 'none'}")
    lines.append(f"- **Files with placeholders**: {len(report['placeholders'])}")
    lines.append(f"- **TODO/FIXME files**: {len(report['todos'])}")
    lines.append(f"- **Orphan asset candidates**: {len(report['orphans'])}")
    lines.append('')

    # Standardization recommendations
    lines.append('### Recommendations')
    lines.append('- **CSS include standard**: use `css/main.css` with correct relative path; fix any `/css/style.css` or `css/style.css` mismatches.')
    lines.append('- **Auth standard**: Supabase is current; remove or archive Firebase/Auth0 remnants; ensure `js/supabase-client.js` and `js/auth-ui.js` are the only auth clients loaded.')
    lines.append('- **Remove template placeholders**: replace any `${...}` tokens with final values.')
    lines.append('- **Archive candidates**: move orphan assets and deprecated directories to `archive/` with a README.')
    lines.append('- **Include paths**: convert root-relative `/css/*` to relative paths for static hosting consistency.')
    lines.append('')

    # Top offenders
    lines.append('### Top Missing Includes (first 15)')
    for miss in report['missing_includes'][:15]:
        if 'missing_href' in miss:
            lines.append(f"- {miss['page']} → href `{miss['missing_href']}` → {miss['resolved']}")
        else:
            lines.append(f"- {miss['page']} → src `{miss['missing_src']}` → {miss['resolved']}")

    lines.append('')
    lines.append('### Third-Party Reference Map')
    for k, files in sorted(report['third_parties'].items()):
        lines.append(f"- **{k}**: {len(files)} files")

    OUTPUT_MD.write_text('\n'.join(lines), encoding='utf-8')


def main():
    pages, link_counts, script_counts, stylesheet_counts, missing_includes = audit_public_html()
    third_parties = scan_third_parties()
    placeholders, todos = scan_placeholders_and_todos()
    orphans = find_orphan_assets(pages)

    report = {
        'pages': pages,
        'link_counts': link_counts.most_common(50),
        'script_counts': script_counts.most_common(50),
        'stylesheet_counts': stylesheet_counts.most_common(50),
        'missing_includes': missing_includes,
        'third_parties': third_parties,
        'placeholders': placeholders,
        'todos': todos,
        'orphans': orphans,
    }

    OUTPUT_JSON.write_text(json.dumps(report, indent=2), encoding='utf-8')
    write_markdown(report)
    print(f"Wrote {OUTPUT_JSON.name} and {OUTPUT_MD.name}")


if __name__ == '__main__':
    main()
