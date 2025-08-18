#!/usr/bin/env python3
"""
Te Kete Ako Empty Tag Cleanup
Removes empty paragraph tags and other placeholder content
"""

import re
from pathlib import Path

class EmptyTagCleaner:
    def __init__(self, root_dir):
        self.root_dir = Path(root_dir)
        self.cleaned_files = 0
        self.tags_removed = 0
        
    def clean_empty_tags(self, content):
        """Remove empty HTML tags and placeholder content"""
        original_content = content
        
        # Empty paragraph tags
        content = re.sub(r'<p>\s*</p>', '', content)
        content = re.sub(r'<p\s+[^>]*>\s*</p>', '', content)
        
        # Empty div tags
        content = re.sub(r'<div>\s*</div>', '', content)
        content = re.sub(r'<div\s+[^>]*>\s*</div>', '', content)
        
        # Empty sections
        content = re.sub(r'<section>\s*</section>', '', content)
        content = re.sub(r'<section\s+[^>]*>\s*</section>', '', content)
        
        # Placeholder text patterns
        placeholder_patterns = [
            r'<p[^>]*>\s*Lorem ipsum[^<]*</p>',
            r'<p[^>]*>\s*This is a placeholder[^<]*</p>',
            r'<p[^>]*>\s*Content coming soon[^<]*</p>',
            r'<p[^>]*>\s*Under construction[^<]*</p>',
            r'<p[^>]*>\s*More content needed[^<]*</p>',
        ]
        
        for pattern in placeholder_patterns:
            content = re.sub(pattern, '', content, flags=re.IGNORECASE)
        
        # Clean up multiple consecutive whitespace
        content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
        
        return content
    
    def process_file(self, file_path):
        """Process a single HTML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            cleaned_content = self.clean_empty_tags(original_content)
            
            if cleaned_content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(cleaned_content)
                
                # Count removed tags roughly
                original_tags = len(re.findall(r'<p>\s*</p>|<div>\s*</div>', original_content))
                self.tags_removed += original_tags
                self.cleaned_files += 1
                
                if original_tags > 0:
                    print(f"✅ Cleaned {file_path.relative_to(self.root_dir)}: removed {original_tags} empty tags")
                    
        except Exception as e:
            print(f"❌ Error cleaning {file_path}: {e}")
    
    def run(self):
        """Clean all HTML files"""
        html_files = list(self.root_dir.rglob("*.html"))
        
        # Focus on educational content first
        priority_patterns = [
            '**/handouts/**/*.html',
            '**/lessons/**/*.html', 
            '**/units/**/*.html',
            'index.html',
            'handouts.html',
            'lessons.html',
            'unit-plans.html'
        ]
        
        priority_files = []
        for pattern in priority_patterns:
            priority_files.extend(self.root_dir.glob(pattern))
        
        # Process priority files
        for file_path in priority_files[:100]:  # Limit for performance
            if file_path.is_file():
                self.process_file(file_path)
        
        print("\n📊 Empty Tag Cleanup Report:")
        print(f"   Files cleaned: {self.cleaned_files}")
        print(f"   Empty tags removed: {self.tags_removed}")

def main():
    cleaner = EmptyTagCleaner("/Users/admin/Documents/te-kete-ako-clean")
    cleaner.run()

if __name__ == "__main__":
    main()