#!/usr/bin/env python3
"""
Te Kete Ako Content Gap Analysis
Identifies missing resources and TODO items for Gemini to fill
"""

import re
from pathlib import Path
from collections import defaultdict
import json

class ContentGapAnalyzer:
    def __init__(self, root_dir):
        self.root_dir = Path(root_dir)
        self.gaps = defaultdict(list)
        self.todos = []
        self.missing_links = []
        self.placeholder_content = []
        
    def scan_for_todos(self):
        """Find TODO items in HTML files"""
        todo_patterns = [
            r'TODO:?\s*([^\n<]+)',
            r'COMING\s+SOON:?\s*([^\n<]+)',
            r'PLACEHOLDER:?\s*([^\n<]+)',
            r'NEEDS?\s+CONTENT:?\s*([^\n<]+)',
            r'DRAFT:?\s*([^\n<]+)'
        ]
        
        html_files = list(self.root_dir.rglob("*.html"))
        
        for file_path in html_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                for pattern in todo_patterns:
                    matches = re.finditer(pattern, content, re.IGNORECASE)
                    for match in matches:
                        self.todos.append({
                            'file': str(file_path.relative_to(self.root_dir)),
                            'line': content[:match.start()].count('\n') + 1,
                            'type': match.group(0).split(':')[0].strip(),
                            'description': match.group(1).strip(),
                            'context': self.get_context(content, match.start())
                        })
                        
            except Exception as e:
                print(f"Warning: Could not scan {file_path}: {e}")
    
    def scan_for_broken_links(self):
        """Find links to non-existent resources"""
        html_files = list(self.root_dir.rglob("*.html"))
        
        for file_path in html_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Find href links
                href_pattern = r'href="([^"#]+(?:\.html)?)"'
                matches = re.finditer(href_pattern, content)
                
                for match in matches:
                    link = match.group(1)
                    
                    # Skip external links
                    if link.startswith(('http', 'mailto', '#')):
                        continue
                    
                    # Resolve relative path
                    if link.startswith('../'):
                        target_path = file_path.parent / link
                    else:
                        target_path = file_path.parent / link
                    
                    target_path = target_path.resolve()
                    
                    if not target_path.exists():
                        self.missing_links.append({
                            'source_file': str(file_path.relative_to(self.root_dir)),
                            'missing_link': link,
                            'resolved_path': str(target_path),
                            'link_text': self.extract_link_text(content, match.start())
                        })
                        
            except Exception as e:
                print(f"Warning: Could not check links in {file_path}: {e}")
    
    def scan_for_placeholder_content(self):
        """Find placeholder or minimal content that needs expansion"""
        placeholder_indicators = [
            r'Lorem ipsum',
            r'This is a placeholder',
            r'Content coming soon',
            r'Under construction',
            r'More content needed',
            r'<p>\s*</p>',  # Empty paragraphs
            r'<div[^>]*>\s*</div>',  # Empty divs
        ]
        
        html_files = list(self.root_dir.rglob("*.html"))
        
        for file_path in html_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                for pattern in placeholder_indicators:
                    matches = re.finditer(pattern, content, re.IGNORECASE)
                    for match in matches:
                        self.placeholder_content.append({
                            'file': str(file_path.relative_to(self.root_dir)),
                            'line': content[:match.start()].count('\n') + 1,
                            'pattern': pattern,
                            'content': match.group(0)[:50] + '...' if len(match.group(0)) > 50 else match.group(0)
                        })
                        
            except Exception as e:
                print(f"Warning: Could not scan placeholder content in {file_path}: {e}")
    
    def analyze_subject_coverage(self):
        """Analyze coverage gaps by subject and year level"""
        subjects = ['english', 'social-studies', 'science', 'mathematics']
        year_levels = list(range(7, 14))  # Years 7-13
        content_types = ['handouts', 'lessons', 'units', 'games']
        
        coverage = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))
        
        for subject in subjects:
            for content_type in content_types:
                pattern = f"**/{content_type}/**/*{subject}*"
                files = list(self.root_dir.glob(pattern))
                
                for file_path in files:
                    # Try to extract year level from filename or content
                    year_match = re.search(r'[yY](\d+)', str(file_path))
                    if year_match:
                        year = int(year_match.group(1))
                        if year in year_levels:
                            coverage[subject][content_type][year] += 1
        
        # Identify gaps
        for subject in subjects:
            for content_type in content_types:
                for year in year_levels:
                    count = coverage[subject][content_type][year]
                    if count == 0:
                        self.gaps['subject_coverage'].append({
                            'subject': subject,
                            'content_type': content_type,
                            'year_level': year,
                            'priority': 'high' if year in [9, 10, 11] else 'medium'
                        })
                    elif count < 3:  # Arbitrary threshold for "sufficient" coverage
                        self.gaps['insufficient_coverage'].append({
                            'subject': subject,
                            'content_type': content_type,
                            'year_level': year,
                            'current_count': count,
                            'priority': 'medium'
                        })
    
    def get_context(self, content, position, context_length=100):
        """Get surrounding context for a match"""
        start = max(0, position - context_length)
        end = min(len(content), position + context_length)
        context = content[start:end]
        return context.replace('\n', ' ').strip()
    
    def extract_link_text(self, content, position):
        """Extract the text content of a link"""
        # Find the closing > of the <a> tag
        start = content.rfind('<a', 0, position)
        if start == -1:
            return "Unknown"
        
        tag_end = content.find('>', start)
        if tag_end == -1:
            return "Unknown"
        
        # Find the closing </a> tag
        link_end = content.find('</a>', tag_end)
        if link_end == -1:
            return "Unknown"
        
        return content[tag_end + 1:link_end].strip()[:50]
    
    def generate_gemini_tasks(self):
        """Generate specific tasks for Gemini based on gaps"""
        gemini_tasks = []
        
        # TODO items -> content creation tasks
        for todo in self.todos:
            gemini_tasks.append({
                'type': 'content_completion',
                'priority': 'high',
                'file': todo['file'],
                'task': f"Complete {todo['type']}: {todo['description']}",
                'context': todo['context'],
                'template_suggestion': self.suggest_template_for_file(todo['file'])
            })
        
        # Missing links -> new resource creation
        for link in self.missing_links:
            gemini_tasks.append({
                'type': 'resource_creation',
                'priority': 'medium',
                'missing_file': link['missing_link'],
                'referenced_from': link['source_file'],
                'link_text': link['link_text'],
                'task': f"Create missing resource: {link['missing_link']}",
                'template_suggestion': self.suggest_template_for_filename(link['missing_link'])
            })
        
        # Subject coverage gaps -> bulk creation
        for gap in self.gaps['subject_coverage']:
            gemini_tasks.append({
                'type': 'bulk_creation',
                'priority': gap['priority'],
                'subject': gap['subject'],
                'content_type': gap['content_type'],
                'year_level': gap['year_level'],
                'task': f"Create {gap['content_type']} for {gap['subject']} Year {gap['year_level']}",
                'quantity_needed': 3
            })
        
        return gemini_tasks
    
    def suggest_template_for_file(self, filename):
        """Suggest appropriate template based on filename"""
        if 'handout' in filename.lower():
            if 'writers-toolkit' in filename.lower():
                return 'writers-toolkit'
            elif 'comprehension' in filename.lower():
                return 'comprehension'
            elif 'analysis' in filename.lower():
                return 'analysis'
            else:
                return 'general'
        elif 'lesson' in filename.lower():
            return 'lesson'
        elif 'unit' in filename.lower():
            return 'unit'
        else:
            return 'general'
    
    def suggest_template_for_filename(self, filename):
        """Suggest template based on filename pattern"""
        return self.suggest_template_for_file(filename)
    
    def generate_report(self):
        """Generate comprehensive gap analysis report"""
        self.scan_for_todos()
        self.scan_for_broken_links()
        self.scan_for_placeholder_content()
        self.analyze_subject_coverage()
        
        gemini_tasks = self.generate_gemini_tasks()
        
        report = {
            'timestamp': str(Path.cwd()),
            'summary': {
                'total_todos': len(self.todos),
                'broken_links': len(self.missing_links),
                'placeholder_content': len(self.placeholder_content),
                'subject_gaps': len(self.gaps['subject_coverage']),
                'insufficient_coverage': len(self.gaps.get('insufficient_coverage', [])),
                'gemini_tasks': len(gemini_tasks)
            },
            'todos': self.todos,
            'broken_links': self.missing_links,
            'placeholder_content': self.placeholder_content,
            'coverage_gaps': dict(self.gaps),
            'gemini_tasks': gemini_tasks
        }
        
        return report
    
    def save_report(self, report, filename="content_gap_analysis.json"):
        """Save gap analysis report"""
        output_path = self.root_dir / filename
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        return output_path

def main():
    analyzer = ContentGapAnalyzer("/Users/admin/Documents/te-kete-ako-clean")
    
    print("🔍 Analyzing content gaps...")
    report = analyzer.generate_report()
    
    # Save report
    report_path = analyzer.save_report(report)
    
    # Print summary
    print("\n📊 CONTENT GAP ANALYSIS SUMMARY")
    print("=" * 50)
    print(f"📝 TODO items found: {report['summary']['total_todos']}")
    print(f"🔗 Broken links: {report['summary']['broken_links']}")
    print(f"📄 Placeholder content: {report['summary']['placeholder_content']}")
    print(f"📚 Subject coverage gaps: {report['summary']['subject_gaps']}")
    print(f"⚠️  Insufficient coverage: {report['summary']['insufficient_coverage']}")
    print(f"🤖 Gemini tasks generated: {report['summary']['gemini_tasks']}")
    
    print(f"\n📁 Full report saved to: {report_path}")
    
    # Show top priority items
    if report['todos']:
        print("\n🎯 TOP TODO ITEMS:")
        for todo in report['todos'][:5]:
            print(f"   • {todo['file']}: {todo['description']}")
    
    if report['broken_links']:
        print("\n🔗 MISSING RESOURCES (showing first 5):")
        for link in report['broken_links'][:5]:
            print(f"   • {link['missing_link']} (referenced in {link['source_file']})")
    
    print("\n✨ Ready for Gemini content generation!")
    return report_path

if __name__ == "__main__":
    main()