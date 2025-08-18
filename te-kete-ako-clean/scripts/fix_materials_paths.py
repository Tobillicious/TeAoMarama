#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
MATERIALS_DIR = ROOT / 'public' / 'guided-inquiry-unit' / 'materials'

CSS_PATTERN = re.compile(r'href=["\"]\.{0,2}/?css/main\.css["\"]')
INDEX_PATTERN1 = re.compile(r'href=["\"]index\.html["\"]')
INDEX_PATTERN2 = re.compile(r'href=["\"]\.\./index\.html["\"]')

CSS_REPLACEMENT = 'href="../../css/main.css"'
INDEX_REPLACEMENT = 'href="../../index.html"'


def fix_file(file_path: Path) -> bool:
    text = file_path.read_text(encoding='utf-8')
    original = text
    text = CSS_PATTERN.sub(CSS_REPLACEMENT, text)
    text = INDEX_PATTERN1.sub(INDEX_REPLACEMENT, text)
    text = INDEX_PATTERN2.sub(INDEX_REPLACEMENT, text)
    if text != original:
        file_path.write_text(text, encoding='utf-8')
        return True
    return False


def main():
    if not MATERIALS_DIR.exists():
        print("Materials directory not found.")
        return
    changed = 0
    for file in MATERIALS_DIR.glob('*.html'):
        if fix_file(file):
            changed += 1
    print(f"Updated {changed} materials files.")

if __name__ == '__main__':
    main()
