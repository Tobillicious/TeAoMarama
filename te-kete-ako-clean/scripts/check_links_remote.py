#!/usr/bin/env python3
import sys
import json
import time
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        if tag.lower() == 'a':
            for k, v in attrs:
                if k.lower() == 'href' and v:
                    self.links.append(v)

USER_AGENT = 'TeKeteAko-LinkCrawler/1.0'


def fetch(url: str, timeout: float = 10.0) -> tuple[int, str]:
    try:
        req = Request(url, headers={'User-Agent': USER_AGENT})
        with urlopen(req, timeout=timeout) as resp:
            charset = resp.headers.get_content_charset() or 'utf-8'
            return (resp.getcode(), resp.read().decode(charset, errors='ignore'))
    except HTTPError as e:
        return (e.code, '')
    except URLError:
        return (0, '')


def crawl(base_url: str, max_pages: int = 200):
    base = base_url.rstrip('/') + '/'
    base_netloc = urlparse(base).netloc

    to_visit = [base]
    seen = set()
    broken = []
    valid = []

    while to_visit and len(seen) < max_pages:
        url = to_visit.pop(0)
        if url in seen:
            continue
        seen.add(url)
        status, body = fetch(url)
        if status != 200:
            broken.append({'url': url, 'status': status})
            continue
        valid.append(url)
        parser = LinkParser()
        parser.feed(body)
        for href in parser.links:
            if href.startswith(('mailto:', 'tel:', 'javascript:', '#', 'http://', 'https://')):
                # allow only same-domain absolute
                if href.startswith(('http://', 'https://')):
                    if urlparse(href).netloc != base_netloc:
                        continue
                    next_url = href
                else:
                    continue
            else:
                next_url = urljoin(url, href)
            # normalize fragments and queries
            parsed = urlparse(next_url)
            normalized = parsed._replace(fragment='', query='').geturl()
            if urlparse(normalized).netloc != base_netloc:
                continue
            if normalized not in seen and normalized.startswith(base):
                to_visit.append(normalized)
        time.sleep(0.05)

    return {
        'base_url': base,
        'pages_visited': len(seen),
        'valid_pages': len(valid),
        'broken_pages': len(broken),
        'broken_details': broken[:20],
    }


def main():
    if len(sys.argv) < 2:
        print('Usage: check_links_remote.py https://site.example/')
        sys.exit(1)
    base = sys.argv[1]
    report = crawl(base)
    print('\nREMOTE LINK CHECK RESULTS')
    print('=' * 32)
    print(f"Base: {report['base_url']}")
    print(f"Pages visited: {report['pages_visited']}")
    print(f"Valid: {report['valid_pages']}")
    print(f"Broken: {report['broken_pages']}")
    if report['broken_pages']:
        print('Sample broken (first 10):')
        for item in report['broken_details'][:10]:
            print(f" - {item['url']} [{item['status']}]")
    with open('remote_link_check.json', 'w') as f:
        json.dump(report, f, indent=2)
    print('\nSaved remote_link_check.json')

if __name__ == '__main__':
    main()
