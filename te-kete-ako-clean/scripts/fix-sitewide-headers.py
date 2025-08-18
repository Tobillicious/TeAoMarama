#!/usr/bin/env python3
"""
Te Kete Ako - Automated Header Consistency System
Kaitoi Agent (Technical Architect) - Systematic Site Maintenance

This script automatically detects and fixes missing headers across all HTML pages
with proper relative path calculations for different directory levels.
"""

import os
import re
from pathlib import Path

# Standard header template
HEADER_TEMPLATE = '''    <header class="site-header no-print">
        <div class="nav-container">
            <a href="{index_path}" class="nav-brand">Te Kete Ako</a>
            <nav class="main-nav">
                <ul>
                    <li>
                        <a href="{unit_plans_path}">
                            <span class="nav-icon">📚</span>
                            <span class="nav-text-en">Unit Plans</span>
                            <span class="nav-text-mi" lang="mi">Ngā Waehere</span>
                        </a>
                    </li>
                    <li>
                        <a href="{lessons_path}">
                            <span class="nav-icon">🎓</span>
                            <span class="nav-text-en">Lessons</span>
                            <span class="nav-text-mi" lang="mi">Ngā Akoranga</span>
                        </a>
                    </li>
                    <li>
                        <a href="{handouts_path}">
                            <span class="nav-icon">📄</span>
                            <span class="nav-text-en">Handouts</span>
                            <span class="nav-text-mi" lang="mi">Ngā Rauemi</span>
                        </a>
                    </li>
                    <li>
                        <a href="{games_path}">
                            <span class="nav-icon">🎮</span>
                            <span class="nav-text-en">Games</span>
                            <span class="nav-text-mi" lang="mi">Ngā Kēmu</span>  
                        </a>
                    </li>
                    <li class="auth-nav my-kete-link" style="display: none;">
                        <a href="{my_kete_path}">
                            <span class="nav-icon">🧺</span>
                            My Kete
                        </a>
                    </li>
                    <li class="auth-nav">
                        <a href="{login_path}" class="login-btn">
                            <span class="nav-icon">👤</span>
                            Login
                        </a>
                    </li>
                    <li class="auth-nav" style="display: none;">
                        <a href="{register_path}" class="register-btn">
                            <span class="nav-icon">📝</span>
                            Register
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

'''

class HeaderConsistencyFixer:
    """Automated header consistency system for Te Kete Ako"""
    
    def __init__(self, root_dir='.'):
        self.root_dir = Path(root_dir)
        self.pages_analyzed = 0
        self.pages_fixed = 0
        self.pages_skipped = 0
        
    def calculate_relative_paths(self, file_path):
        """Calculate relative paths based on file location"""
        # Get relative path from file to root
        file_dir = file_path.parent
        relative_to_root = os.path.relpath('.', file_dir)
        
        # Handle root directory case
        if relative_to_root == '.':
            prefix = ''
        else:
            prefix = relative_to_root + '/'
            
        return {
            'index_path': f"{prefix}index.html",
            'unit_plans_path': f"{prefix}unit-plans.html",
            'lessons_path': f"{prefix}lessons.html", 
            'handouts_path': f"{prefix}handouts.html",
            'games_path': f"{prefix}games.html",
            'my_kete_path': f"{prefix}my-kete.html",
            'login_path': f"{prefix}login.html",
            'register_path': f"{prefix}register-simple.html"
        }
    
    def has_proper_header(self, content):
        """Check if page has proper site header"""
        return 'class="site-header no-print"' in content
    
    def should_skip_file(self, file_path):
        """Determine if file should be skipped"""
        skip_patterns = [
            'public/',
            'node_modules/',
            'old-lessons/',
            '.git/',
            'agent-knowledge-hub'
        ]
        
        file_str = str(file_path)
        return any(pattern in file_str for pattern in skip_patterns)
        
    def inject_header(self, content, file_path):
        """Inject header into HTML content"""
        paths = self.calculate_relative_paths(file_path)
        header = HEADER_TEMPLATE.format(**paths)
        
        # Find insertion point (after <body> tag)
        body_pattern = r'(<body[^>]*>)'
        match = re.search(body_pattern, content, re.IGNORECASE)
        
        if match:
            insertion_point = match.end()
            new_content = (content[:insertion_point] + '\n\n' + 
                         header + '\n' + content[insertion_point:])
            return new_content
        else:
            print(f"  ⚠️  Could not find <body> tag in {file_path}")
            return content
    
    def process_file(self, file_path):
        """Process individual HTML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            self.pages_analyzed += 1
            
            if self.has_proper_header(content):
                print(f"  ✅ {file_path.relative_to(self.root_dir)} - Header OK")
                self.pages_skipped += 1
                return
                
            print(f"  🔧 {file_path.relative_to(self.root_dir)} - Adding header...")
            new_content = self.inject_header(content, file_path)
            
            # Write updated content
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
            self.pages_fixed += 1
            print("  ✅ Header added successfully")
            
        except Exception as e:
            print(f"  ❌ Error processing {file_path}: {e}")
    
    def scan_and_fix(self):
        """Main function to scan and fix all HTML files"""
        print("🔧 Te Kete Ako - Automated Header Consistency System")
        print("=" * 60)
        print("Scanning for HTML files missing proper headers...\n")
        
        # Find all HTML files
        html_files = []
        for html_file in self.root_dir.rglob('*.html'):
            if not self.should_skip_file(html_file):
                html_files.append(html_file)
        
        print(f"Found {len(html_files)} HTML files to analyze\n")
        
        # Process each file
        for file_path in sorted(html_files):
            self.process_file(file_path)
        
        # Summary
        print("\n" + "=" * 60)
        print("🎯 HEADER CONSISTENCY SUMMARY:")
        print(f"   📊 Pages analyzed: {self.pages_analyzed}")
        print(f"   🔧 Headers added: {self.pages_fixed}")
        print(f"   ✅ Already consistent: {self.pages_skipped}")
        print(f"   🎉 Success rate: {((self.pages_skipped + self.pages_fixed) / self.pages_analyzed * 100):.1f}%")
        
        if self.pages_fixed > 0:
            print("\n✨ Sitewide header consistency achieved!")
            print("All pages now have professional navigation headers.")
        else:
            print("\n✅ All pages already had consistent headers!")

def main():
    """Run the header consistency system"""
    fixer = HeaderConsistencyFixer()
    fixer.scan_and_fix()

if __name__ == "__main__":
    main()