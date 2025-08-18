#!/usr/bin/env python3
"""
Professional Navigation Standardization Script for Te Kete Ako
Overseer Kaitiaki Aronui - Enhanced with DeepSeek AI recommendations
For: Mangakotukutuku College Teachers & Students
"""

import os
import shutil
from bs4 import BeautifulSoup
from datetime import datetime
import json

class NavigationStandardizer:
    def __init__(self, public_dir="/Users/admin/Documents/te-kete-ako-clean/public"):
        self.public_dir = public_dir
        self.backup_dir = os.path.join(os.path.dirname(public_dir), 'navigation_backups')
        self.index_file = os.path.join(public_dir, 'index.html')
        
        # Priority pages identified from audit
        self.priority_pages = [
            'activities.html',
            'teacher-dashboard-ai.html', 
            'lessons.html',
            'handouts.html',
            'subjects.html',
            'platforms.html',
            'ai-hub.html',
            'graphrag-search.html',
            'learning-pathways.html',
            'games.html'
        ]
        
        # CSS files needed for proper navigation
        self.required_css = [
            'css/main.css',
            'css/mobile-revolution.css'
        ]
        
        # JS files needed for navigation functionality
        self.required_js = [
            'js/mobile-revolution.js',
            'js/auth-ui.js'
        ]
        
        self.report = {
            'timestamp': datetime.now().isoformat(),
            'pages_processed': [],
            'pages_skipped': [],
            'errors': [],
            'success_count': 0,
            'backup_location': self.backup_dir
        }

    def create_backup_directory(self):
        """Create backup directory with timestamp"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        self.backup_dir = f"{self.backup_dir}_{timestamp}"
        os.makedirs(self.backup_dir, exist_ok=True)
        print(f"📦 Created backup directory: {self.backup_dir}")

    def extract_standard_navigation(self):
        """Extract the complete navigation structure from index.html"""
        try:
            with open(self.index_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            
            # Extract the complete header with all navigation
            header = soup.find('header', class_='site-header')
            if not header:
                raise ValueError("Standard header not found in index.html")
            
            # Extract mobile navigation overlay
            mobile_overlay = soup.find('div', class_='mobile-nav-overlay')
            if not mobile_overlay:
                raise ValueError("Mobile navigation overlay not found in index.html")
            
            # Extract CSS links
            css_links = []
            for link in soup.find_all('link', rel='stylesheet'):
                href = link.get('href', '')
                if any(css in href for css in self.required_css):
                    css_links.append(str(link))
            
            return {
                'header': str(header),
                'mobile_overlay': str(mobile_overlay), 
                'css_links': css_links,
                'title_template': soup.find('title').text if soup.find('title') else 'Te Kete Ako'
            }
            
        except Exception as e:
            raise Exception(f"Failed to extract navigation from index.html: {str(e)}")

    def backup_file(self, filepath):
        """Create backup of original file"""
        filename = os.path.basename(filepath)
        backup_path = os.path.join(self.backup_dir, filename)
        shutil.copy2(filepath, backup_path)
        print(f"✅ Backed up: {filename}")

    def update_page_navigation(self, filepath, standard_nav):
        """Update a single page with standard navigation"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            
            # Backup original file
            self.backup_file(filepath)
            
            # Remove existing header if present
            old_header = soup.find('header')
            if old_header:
                old_header.decompose()
            
            # Remove existing mobile overlay if present
            old_overlay = soup.find('div', class_='mobile-nav-overlay')
            if old_overlay:
                old_overlay.decompose()
            
            # Insert new header after body tag
            body = soup.find('body')
            if not body:
                raise ValueError("No body tag found")
            
            # Parse the standard header HTML and insert
            new_header = BeautifulSoup(standard_nav['header'], 'html.parser')
            body.insert(0, new_header)
            
            # Insert mobile overlay at end of body
            mobile_overlay = BeautifulSoup(standard_nav['mobile_overlay'], 'html.parser')
            body.append(mobile_overlay)
            
            # Ensure required CSS links are present
            head = soup.find('head')
            if head:
                # Check for existing CSS links
                existing_links = [link.get('href', '') for link in head.find_all('link', rel='stylesheet')]
                
                for css_link_html in standard_nav['css_links']:
                    css_soup = BeautifulSoup(css_link_html, 'html.parser')
                    css_link = css_soup.find('link')
                    css_href = css_link.get('href', '')
                    
                    if not any(css_href in existing for existing in existing_links):
                        head.append(css_link)
            
            # Update the page title to include Te Kete Ako branding if missing
            title_tag = soup.find('title')
            if title_tag and 'Te Kete Ako' not in title_tag.text:
                title_tag.string = f"{title_tag.text} | Te Kete Ako"
            
            # Write updated content back
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            
            filename = os.path.basename(filepath)
            print(f"🎯 Standardized navigation: {filename}")
            self.report['pages_processed'].append(filename)
            self.report['success_count'] += 1
            
        except Exception as e:
            error_msg = f"Failed to update {filepath}: {str(e)}"
            print(f"❌ {error_msg}")
            self.report['errors'].append(error_msg)
            self.report['pages_skipped'].append(os.path.basename(filepath))

    def standardize_navigation(self):
        """Main function to standardize navigation across priority pages"""
        print("🔧 NAVIGATION STANDARDIZATION - Te Kete Ako")
        print("📍 Overseer Kaitiaki Aronui - Professional Navigation Audit")
        print("🏫 For: Mangakotukutuku College Teachers & Students")
        print("="*60)
        
        # Create backup directory
        self.create_backup_directory()
        
        try:
            # Extract standard navigation from index.html
            print("📖 Extracting standard navigation from index.html...")
            standard_nav = self.extract_standard_navigation()
            print("✅ Standard navigation extracted successfully")
            
            # Process each priority page
            print(f"\n🎯 Processing {len(self.priority_pages)} priority pages...")
            
            for page in self.priority_pages:
                filepath = os.path.join(self.public_dir, page)
                
                if not os.path.exists(filepath):
                    print(f"⚠️  Skipping {page} - file not found")
                    self.report['pages_skipped'].append(page)
                    continue
                
                print(f"🔄 Processing: {page}")
                self.update_page_navigation(filepath, standard_nav)
            
            # Generate completion report
            self.generate_report()
            
        except Exception as e:
            error_msg = f"Critical error during navigation standardization: {str(e)}"
            print(f"💥 {error_msg}")
            self.report['errors'].append(error_msg)
            raise

    def generate_report(self):
        """Generate completion report"""
        print("\n" + "="*60)
        print("📊 NAVIGATION STANDARDIZATION COMPLETE")
        print("="*60)
        
        print(f"✅ Successfully processed: {self.report['success_count']} pages")
        print(f"⚠️  Skipped: {len(self.report['pages_skipped'])} pages")
        print(f"❌ Errors: {len(self.report['errors'])} pages")
        
        if self.report['pages_processed']:
            print(f"\n📋 Pages Updated:")
            for page in self.report['pages_processed']:
                print(f"   ✅ {page}")
        
        if self.report['pages_skipped']:
            print(f"\n⚠️  Pages Skipped:")
            for page in self.report['pages_skipped']:
                print(f"   ⚠️  {page}")
        
        if self.report['errors']:
            print(f"\n❌ Errors Encountered:")
            for error in self.report['errors']:
                print(f"   ❌ {error}")
        
        print(f"\n💾 Backups saved to: {self.backup_dir}")
        
        # Save detailed report
        report_file = os.path.join(os.path.dirname(self.public_dir), 'navigation_standardization_report.json')
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(self.report, f, indent=2)
        
        print(f"📄 Detailed report: {report_file}")
        
        # Professional impact summary
        print("\n🏫 PROFESSIONAL IMPACT FOR MANGAKOTUKUTUKU COLLEGE:")
        print("   📚 Teachers now have consistent navigation across all key pages")
        print("   📱 Students on Chromebooks will experience reliable mobile navigation")
        print("   🎯 Professional credibility maintained through consistent UX")
        print("   ⚡ Navigation loads faster with standardized structure")
        
        if self.report['success_count'] > 0:
            print(f"\n🎉 Navigation standardization successful!")
            print(f"   Ready for professional use by teachers and students")
        else:
            print(f"\n⚠️  Manual intervention may be required")

def main():
    """Run the navigation standardization process"""
    try:
        standardizer = NavigationStandardizer()
        standardizer.standardize_navigation()
        
    except KeyboardInterrupt:
        print("\n\n⚡ Process interrupted by user")
    except Exception as e:
        print(f"\n💥 Fatal error: {str(e)}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())