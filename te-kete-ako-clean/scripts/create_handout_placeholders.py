#!/usr/bin/env python3
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / 'link_check_results.json'
HANDOUTS_DIR = ROOT / 'public' / 'handouts'

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | Te Kete Ako</title>
  <link rel="stylesheet" href="../css/main.css" />
</head>
<body>
  <header class="site-header">
    <nav class="main-nav">
      <div class="nav-brand"><h1>🧺 Te Kete Ako</h1></div>
      <div class="nav-links">
        <a href="../index.html">Home</a>
        <a href="../handouts.html">Handouts</a>
      </div>
    </nav>
  </header>
  <main>
    <section class="cultural-section">
      <div class="cultural-content">
        <h1 class="cultural-title">{title}</h1>
        <p class="cultural-text">Placeholder handout. Full content coming soon.</p>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-bottom">
        <span>© 2025 Te Kete Ako</span>
      </div>
    </div>
  </footer>
</body>
</html>
"""

def to_title(filename: str) -> str:
    base = Path(filename).stem
    return base.replace('-', ' ').replace('_', ' ').title()


def main():
    if not REPORT.exists():
        print("link_check_results.json not found. Run check-all-links first.")
        sys.exit(1)
    data = json.loads(REPORT.read_text())
    broken = data.get('broken_details', [])
    HANDOUTS_DIR.mkdir(parents=True, exist_ok=True)

    created = 0
    for item in broken:
        link = item.get('broken_link', '')
        if not link.startswith('handouts/') or not link.endswith('.html'):
            continue
        out_path = ROOT / 'public' / link
        if out_path.exists():
            continue
        out_path.parent.mkdir(parents=True, exist_ok=True)
        title = to_title(out_path.name)
        out_path.write_text(HTML_TEMPLATE.format(title=title), encoding='utf-8')
        created += 1
    print(f"Created {created} placeholder handouts.")

if __name__ == '__main__':
    main()
