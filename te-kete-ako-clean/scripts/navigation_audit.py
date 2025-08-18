#!/usr/bin/env python3
"""
Comprehensive Navigation Audit for Te Kete Ako
Professional navigation consistency checker for teachers and students at Mangakotukutuku College
"""

import os
import re
from bs4 import BeautifulSoup
import json
from pathlib import Path
import urllib.parse

class NavigationAuditor:
    def __init__(self, public_dir="/Users/admin/Documents/te-kete-ako-clean/public"):
        self.public_dir = public_dir
        self.report = {
            "navigation_inconsistencies": [],
            "missing_pages": [],
            "broken_links": [],
            "placeholder_content": [],
            "mobile_nav_issues": [],
            "standard_nav_items": [],
            "pages_analyzed": 0,
            "critical_issues": [],
            "professional_issues": []
        }
        
        # Standard navigation from index.html - what teachers expect to see
        self.expected_nav_items = [
            "Learning Pathways", "Subjects", "Unit Plans", "Lessons", 
            "Handouts", "Games", "Platforms", "AI Hub", "Leaderboard", 
            "AI Search", "AI Teacher Tools", "Adaptive Learning", "Activities"
        ]
        
        # Standard navigation links that should exist
        self.expected_nav_links = {
            "learning-pathways.html": "Learning Pathways",
            "subjects.html": "Subjects", 
            "unit-plans.html": "Unit Plans",
            "lessons.html": "Lessons",
            "handouts.html": "Handouts",
            "games.html": "Games", 
            "platforms.html": "Platforms",
            "ai-hub.html": "AI Hub",
            "classroom-leaderboard.html": "Leaderboard",
            "graphrag-search.html": "AI Search",
            "teacher-dashboard-ai.html": "AI Teacher Tools",
            "interactive-learning-demo.html": "Adaptive Learning",
            "activities.html": "Activities"
        }

    def get_html_files(self):
        """Get all HTML files in the public directory"""
        html_files = []
        for root, dirs, files in os.walk(self.public_dir):
            for file in files:
                if file.endswith('.html'):
                    html_files.append(os.path.join(root, file))
        return html_files

    def extract_navigation(self, soup):
        """Extract navigation elements from HTML"""
        nav_elements = {
            'main_nav': [],
            'mobile_nav': [],
            'sidebar_links': [],
            'footer_links': [],
            'has_mobile_toggle': False,
            'has_mobile_overlay': False
        }
        
        # Main navigation
        main_nav = soup.find('nav', class_='main-nav')
        if main_nav:
            for link in main_nav.find_all('a'):
                href = link.get('href', '')
                text = link.get_text(strip=True)
                nav_elements['main_nav'].append({'href': href, 'text': text})
        
        # Mobile navigation
        mobile_nav = soup.find('ul', class_='mobile-nav-list')
        if mobile_nav:
            for link in mobile_nav.find_all('a'):
                href = link.get('href', '')
                text = link.get_text(strip=True)
                nav_elements['mobile_nav'].append({'href': href, 'text': text})
        
        # Check for mobile toggle button
        nav_elements['has_mobile_toggle'] = bool(soup.find('button', class_='mobile-nav-toggle'))
        nav_elements['has_mobile_overlay'] = bool(soup.find('div', class_='mobile-nav-overlay'))
        
        # Sidebar navigation
        sidebar = soup.find('aside', class_='left-sidebar')
        if sidebar:
            for link in sidebar.find_all('a'):
                href = link.get('href', '')
                text = link.get_text(strip=True)
                if href and text:
                    nav_elements['sidebar_links'].append({'href': href, 'text': text})
        
        # Footer navigation
        footer = soup.find('footer')
        if footer:
            for link in footer.find_all('a'):
                href = link.get('href', '')
                text = link.get_text(strip=True)
                if href and text:
                    nav_elements['footer_links'].append({'href': href, 'text': text})
        
        return nav_elements

    def check_placeholder_content(self, soup, file_path):
        """Check for placeholder content that looks unprofessional"""
        placeholders_found = []
        
        # Common placeholder patterns
        placeholder_patterns = [
            r'lorem ipsum',
            r'placeholder',
            r'coming soon',
            r'under construction',
            r'TODO',
            r'FIXME',
            r'test content',
            r'sample text',
            r'dummy content',
            r'[^]]*\[placeholder\]',
            r'example\.com',
        ]
        
        text_content = soup.get_text().lower()
        
        for pattern in placeholder_patterns:
            if re.search(pattern, text_content, re.IGNORECASE):
                placeholders_found.append({
                    'file': file_path,
                    'type': 'placeholder_text',
                    'pattern': pattern,
                    'severity': 'high'
                })
        
        # Check for empty titles or missing content
        title = soup.find('title')
        if not title or not title.get_text().strip():
            placeholders_found.append({
                'file': file_path,
                'type': 'missing_title',
                'severity': 'critical'
            })
        
        # Check for missing h1 tags
        h1_tags = soup.find_all('h1')
        if not h1_tags:
            placeholders_found.append({
                'file': file_path,
                'type': 'missing_h1',
                'severity': 'medium'
            })
        
        return placeholders_found

    def validate_links(self, nav_elements, current_file):
        """Validate that navigation links point to existing files"""
        broken_links = []
        
        all_links = []
        all_links.extend(nav_elements['main_nav'])
        all_links.extend(nav_elements['mobile_nav'])
        all_links.extend(nav_elements['sidebar_links'])
        all_links.extend(nav_elements['footer_links'])
        
        for link in all_links:
            href = link['href']
            if href and not href.startswith(('http://', 'https://', '#', 'mailto:', 'tel:')):
                # Convert relative path to absolute
                if href.startswith('./'):
                    href = href[2:]
                
                target_path = os.path.join(self.public_dir, href)
                
                if not os.path.exists(target_path):
                    broken_links.append({
                        'file': current_file,
                        'broken_link': href,
                        'link_text': link['text'],
                        'severity': 'critical' if href in self.expected_nav_links else 'medium'
                    })
        
        return broken_links

    def check_nav_consistency(self, nav_elements, file_path):
        """Check if navigation is consistent with the standard"""
        inconsistencies = []
        
        main_nav_texts = [item['text'] for item in nav_elements['main_nav']]
        mobile_nav_texts = [item['text'] for item in nav_elements['mobile_nav']]
        
        # Check if main navigation has expected items
        missing_items = []
        for expected_item in self.expected_nav_items:
            if not any(expected_item.lower() in text.lower() for text in main_nav_texts):
                missing_items.append(expected_item)
        
        if missing_items:
            inconsistencies.append({
                'file': file_path,
                'type': 'missing_nav_items',
                'missing_items': missing_items,
                'severity': 'high'
            })
        
        # Check if mobile nav matches desktop nav
        if len(main_nav_texts) > 0 and len(mobile_nav_texts) > 0:
            if len(main_nav_texts) != len(mobile_nav_texts):
                inconsistencies.append({
                    'file': file_path,
                    'type': 'mobile_desktop_mismatch',
                    'desktop_count': len(main_nav_texts),
                    'mobile_count': len(mobile_nav_texts),
                    'severity': 'medium'
                })
        
        # Check for mobile navigation requirements
        if not nav_elements['has_mobile_toggle']:
            inconsistencies.append({
                'file': file_path,
                'type': 'missing_mobile_toggle',
                'severity': 'high'
            })
        
        if not nav_elements['has_mobile_overlay']:
            inconsistencies.append({
                'file': file_path,
                'type': 'missing_mobile_overlay',
                'severity': 'high'
            })
        
        return inconsistencies

    def audit_file(self, file_path):
        """Audit a single HTML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            nav_elements = self.extract_navigation(soup)
            
            # Run all checks
            inconsistencies = self.check_nav_consistency(nav_elements, file_path)
            broken_links = self.validate_links(nav_elements, file_path)
            placeholders = self.check_placeholder_content(soup, file_path)
            
            return {
                'nav_elements': nav_elements,
                'inconsistencies': inconsistencies,
                'broken_links': broken_links,
                'placeholders': placeholders
            }
            
        except Exception as e:
            self.report['critical_issues'].append({
                'file': file_path,
                'error': str(e),
                'type': 'file_read_error'
            })
            return None

    def run_audit(self):
        """Run the complete navigation audit"""
        print("🔍 Starting comprehensive navigation audit for Te Kete Ako...")
        print("📍 Focus: Professional consistency for Mangakotukutuku College")
        
        html_files = self.get_html_files()
        self.report['pages_analyzed'] = len(html_files)
        
        print(f"📊 Found {len(html_files)} HTML files to analyze")
        
        for file_path in html_files:
            relative_path = os.path.relpath(file_path, self.public_dir)
            print(f"🔍 Auditing: {relative_path}")
            
            audit_result = self.audit_file(file_path)
            
            if audit_result:
                # Collect results
                self.report['navigation_inconsistencies'].extend(audit_result['inconsistencies'])
                self.report['broken_links'].extend(audit_result['broken_links'])
                self.report['placeholder_content'].extend(audit_result['placeholders'])
        
        # Check for missing standard pages
        for expected_file, name in self.expected_nav_links.items():
            full_path = os.path.join(self.public_dir, expected_file)
            if not os.path.exists(full_path):
                self.report['missing_pages'].append({
                    'file': expected_file,
                    'name': name,
                    'severity': 'critical'
                })
        
        self.generate_report()

    def generate_report(self):
        """Generate the comprehensive audit report"""
        
        print("\n" + "="*80)
        print("🏫 TE KETE AKO PROFESSIONAL NAVIGATION AUDIT REPORT")
        print("📍 For: Mangakotukutuku College Teachers & Students")
        print("="*80)
        
        # Summary
        critical_count = len([x for x in self.report['broken_links'] if x.get('severity') == 'critical'])
        critical_count += len([x for x in self.report['navigation_inconsistencies'] if x.get('severity') == 'critical'])
        critical_count += len([x for x in self.report['missing_pages'] if x.get('severity') == 'critical'])
        critical_count += len([x for x in self.report['placeholder_content'] if x.get('severity') == 'critical'])
        
        print(f"\n📊 AUDIT SUMMARY:")
        print(f"   • Pages analyzed: {self.report['pages_analyzed']}")
        print(f"   • Critical issues: {critical_count}")
        print(f"   • Navigation inconsistencies: {len(self.report['navigation_inconsistencies'])}")
        print(f"   • Broken links: {len(self.report['broken_links'])}")
        print(f"   • Missing pages: {len(self.report['missing_pages'])}")
        print(f"   • Placeholder content: {len(self.report['placeholder_content'])}")
        
        # Critical Issues
        if critical_count > 0:
            print(f"\n🚨 CRITICAL ISSUES (MUST FIX BEFORE USE):")
            
            # Critical broken links
            for issue in self.report['broken_links']:
                if issue.get('severity') == 'critical':
                    relative_file = os.path.relpath(issue['file'], self.public_dir)
                    print(f"   ❌ BROKEN LINK: {relative_file}")
                    print(f"      → Missing: {issue['broken_link']} (\"{issue['link_text']}\")")
            
            # Missing critical pages  
            for page in self.report['missing_pages']:
                if page.get('severity') == 'critical':
                    print(f"   ❌ MISSING PAGE: {page['file']}")
                    print(f"      → Teachers expect: \"{page['name']}\"")
            
            # Critical placeholder content
            for placeholder in self.report['placeholder_content']:
                if placeholder.get('severity') == 'critical':
                    relative_file = os.path.relpath(placeholder['file'], self.public_dir)
                    print(f"   ❌ CRITICAL CONTENT ISSUE: {relative_file}")
                    print(f"      → {placeholder['type']}")
        
        # Navigation Inconsistencies
        if self.report['navigation_inconsistencies']:
            print(f"\n🔄 NAVIGATION INCONSISTENCIES:")
            for issue in self.report['navigation_inconsistencies']:
                relative_file = os.path.relpath(issue['file'], self.public_dir)
                print(f"   ⚠️  {relative_file}")
                print(f"      → {issue['type']}: {issue.get('missing_items', issue.get('desktop_count', 'See details'))}")
        
        # Professional UX Issues
        print(f"\n👩‍🏫 PROFESSIONAL UX FOR TEACHERS:")
        mobile_issues = [x for x in self.report['navigation_inconsistencies'] if 'mobile' in x.get('type', '')]
        if mobile_issues:
            print(f"   📱 Mobile navigation issues found in {len(mobile_issues)} files")
            print("      → Students on Chromebooks may struggle with navigation")
        
        broken_nav_links = len([x for x in self.report['broken_links'] if x['broken_link'] in self.expected_nav_links])
        if broken_nav_links > 0:
            print(f"   🔗 {broken_nav_links} broken links in main navigation")
            print("      → Teachers cannot access core curriculum sections")
        
        # Specific Missing Pages That Teachers Need
        missing_critical = [x for x in self.report['missing_pages'] if x.get('severity') == 'critical']
        if missing_critical:
            print(f"\n📚 MISSING CURRICULUM PAGES:")
            for page in missing_critical:
                print(f"   📖 {page['name']} ({page['file']})")
        
        # Placeholder Content That Looks Unprofessional  
        high_priority_placeholders = [x for x in self.report['placeholder_content'] if x.get('severity') in ['high', 'critical']]
        if high_priority_placeholders:
            print(f"\n🎭 UNPROFESSIONAL CONTENT:")
            for placeholder in high_priority_placeholders[:5]:  # Show first 5
                relative_file = os.path.relpath(placeholder['file'], self.public_dir)
                print(f"   📝 {relative_file}: {placeholder['type']}")
        
        # Recommendations
        print(f"\n🎯 IMMEDIATE ACTIONS REQUIRED:")
        print("   1. 🔧 Create missing critical pages (unit-plans.html, lessons.html, etc.)")
        print("   2. 🔗 Fix all broken navigation links")
        print("   3. 📱 Ensure mobile navigation works on all pages")
        print("   4. 🎨 Replace placeholder content with professional content")
        print("   5. ✅ Test with slow Chromebook to verify student experience")
        
        # Real-world impact
        print(f"\n🏫 REAL-WORLD IMPACT:")
        print("   • Teacher preparing lesson on desktop → Navigation must be consistent")
        print("   • Student on slow Chromebook → Mobile nav must work reliably") 
        print("   • Principal reviewing site → No placeholder content visible")
        print("   • Parent accessing resources → All links must work")
        
        # Save detailed report
        report_file = os.path.join(os.path.dirname(self.public_dir), 'navigation_audit_report.json')
        with open(report_file, 'w') as f:
            json.dump(self.report, f, indent=2, default=str)
        
        print(f"\n💾 Detailed report saved: {report_file}")
        print("\n" + "="*80)

if __name__ == "__main__":
    auditor = NavigationAuditor()
    auditor.run_audit()