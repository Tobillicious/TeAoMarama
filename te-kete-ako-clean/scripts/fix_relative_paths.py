#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
TARGET_DIRS = [PUBLIC / 'handouts', PUBLIC / 'lesson-plans']

CSS_BAD = re.compile(r'href=["\']css/main\.css["\']')
INDEX_BAD = re.compile(r'href=["\']index\.html["\']')

CSS_GOOD = 'href="../css/main.css"'
INDEX_GOOD = 'href="../index.html"'


def fix_file(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    new = CSS_BAD.sub(CSS_GOOD, text)
    new = INDEX_BAD.sub(INDEX_GOOD, new)
    if new != text:
        path.write_text(new, encoding='utf-8')
        return True
    return False


def main():
    changed = 0
    for d in TARGET_DIRS:
        if not d.exists():
            continue
        for f in d.glob('*.html'):
            if fix_file(f):
                changed += 1
    print(f"Updated {changed} files in handouts/ and lesson-plans/.")

if __name__ == '__main__':
    main()
