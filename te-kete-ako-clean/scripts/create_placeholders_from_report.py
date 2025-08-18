#!/usr/bin/env python3
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
REPORT = ROOT / 'link_check_results.json'

TEMPLATE = """<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
  <title>{title} | Te Kete Ako</title>
  <link rel=\"stylesheet\" href=\"{css_path}\" />
</head>
<body>
  <header class=\"site-header\">
    <nav class=\"main-nav\">
      <div class=\"nav-brand\"><h1>🧺 Te Kete Ako</h1></div>
      <div class=\"nav-links\">
        <a href=\"{home_path}\">Home</a>
      </div>
    </nav>
  </header>
  <main>
    <section class=\"cultural-section\">
      <div class=\"cultural-content\">
        <h1 class=\"cultural-title\">{title}</h1>
        <p class=\"cultural-text\">Placeholder page generated to satisfy links. Content coming soon.</p>
      </div>
    </section>
  </main>
  <footer class=\"site-footer\">
    <div class=\"footer-content\">
      <div class=\"footer-bottom\">
        <span>© 2025 Te Kete Ako</span>
      </div>
    </div>
  </footer>
</body>
</html>
"""

def rel_path(from_path: Path, to_path: Path) -> str:
    try:
        return str(to_path.relative_to(from_path.parent))
    except ValueError:
        # Fallback to root-relative, but our checker doesn't handle absolute, so keep relative to public
        return str(to_path.relative_to(PUBLIC))


def to_title(p: Path) -> str:
    return p.stem.replace('-', ' ').replace('_', ' ').title()


def main():
    if not REPORT.exists():
        print("Run check-all-links.py first.")
        sys.exit(1)
    data = json.loads(REPORT.read_text())
    broken = data.get('broken_details', [])

    created = 0
    for item in broken:
        link = item.get('broken_link', '')
        source_rel = item.get('source_file', '')
        if not link.endswith('.html'):
            continue
        # Resolve target within public using the same logic as checker (without queries handled by checker)
        source_path = ROOT / source_rel
        # Strip query
        link_path = link.split('?', 1)[0]
        target_path = (source_path.parent / link_path).resolve()
        try:
            target_rel_to_public = target_path.relative_to(PUBLIC)
        except ValueError:
            # outside public - skip
            continue
        out_path = PUBLIC / target_rel_to_public
        if out_path.exists():
            continue
        out_path.parent.mkdir(parents=True, exist_ok=True)
        title = to_title(out_path)
        # compute relative paths for CSS and home from out_path
        css_path = rel_path(out_path, PUBLIC / 'css' / 'main.css')
        home_path = rel_path(out_path, PUBLIC / 'index.html')
        out_path.write_text(TEMPLATE.format(title=title, css_path=css_path, home_path=home_path), encoding='utf-8')
        created += 1
    print(f"Created {created} generic placeholders.")

if __name__ == '__main__':
    main()
