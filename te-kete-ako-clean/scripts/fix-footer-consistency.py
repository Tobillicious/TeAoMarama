#!/usr/bin/env python3
"""
Te Kete Ako Footer Consistency Script
Adds consistent site footer to pages missing it
"""

import re
from pathlib import Path

FOOTER_TEMPLATE = '''    <footer class="site-footer no-print">
        <div class="footer-content">
            <div class="footer-simple">
                <div class="footer-brand">
                    <h3>🧺 Te Kete Ako</h3>
                    <p>"Whaowhia te kete mātauranga" - Fill the basket of knowledge</p>
                </div>
                <div class="footer-links">
                    <a href="{root}unit-plans.html">Unit Plans</a>
                    <a href="{root}lessons.html">Lessons</a>
                    <a href="{root}handouts.html">Handouts</a>
                    <a href="{root}my-kete.html">My Kete</a>
                </div>
            </div>
            <div class="footer-bottom">
                <span>© 2025 Te Kete Ako - Educational resources for Aotearoa New Zealand</span>
            </div>
        </div>
    </footer>'''

class FooterInjector:
    def __init__(self, root_dir):
        self.root_dir = Path(root_dir)
        self.processed = 0
        self.added_footer = 0
        
    def calculate_relative_root(self, file_path):
        """Calculate relative path back to root"""
        file_path = Path(file_path)
        depth = len(file_path.relative_to(self.root_dir).parts) - 1
        return "../" * depth if depth > 0 else ""
    
    def needs_footer(self, content):
        """Check if file needs footer"""
        return 'site-footer' not in content and '</body>' in content
    
    def inject_footer(self, content, file_path):
        """Inject footer before closing body tag"""
        root_path = self.calculate_relative_root(file_path)
        footer = FOOTER_TEMPLATE.format(root=root_path)
        
        # Insert footer before </body>
        pattern = r'(\s*)</body>'
        replacement = f'{footer}\n\\1</body>'
        return re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    def process_file(self, file_path):
        """Process a single HTML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            self.processed += 1
            
            if self.needs_footer(content):
                updated_content = self.inject_footer(content, file_path)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                
                self.added_footer += 1
                print(f"✅ Added footer: {file_path.relative_to(self.root_dir)}")
            
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    def run(self):
        """Process all HTML files"""
        html_files = list(self.root_dir.rglob("*.html"))
        
        # Prioritize key pages
        priority_patterns = [
            '**/handouts/**/*.html',
            '**/units/**/*.html', 
            '**/lessons/**/*.html',
            'login.html',
            'register*.html',
            'handouts.html'
        ]
        
        priority_files = []
        for pattern in priority_patterns:
            priority_files.extend(self.root_dir.glob(pattern))
        
        # Process all priority files
        for file_path in priority_files:
            if file_path.is_file():
                self.process_file(file_path)
        
        # Process remaining HTML files
        processed_files = set(priority_files)
        for file_path in html_files:
            if file_path not in processed_files:
                self.process_file(file_path)
        
        print("\n📊 Footer Consistency Report:")
        print(f"   Files processed: {self.processed}")
        print(f"   Footers added: {self.added_footer}")

if __name__ == "__main__":
    injector = FooterInjector("/Users/admin/Documents/te-kete-ako-clean")
    injector.run()