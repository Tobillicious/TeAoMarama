#!/usr/bin/env python3
"""
Te Kete Ako - Comprehensive Resource Indexer
Automatically scans the file system and generates a complete resource database
for the GraphRAG search system, ensuring no educational resource is left hidden.
"""

import json
import re
from pathlib import Path
from typing import Dict, List

class TeKeteResourceIndexer:
    """Automatically discover and index all educational resources."""
    
    def __init__(self, base_path: str = "."):
        self.base_path = Path(base_path)
        self.resources = []
        
        # Resource type classifications
        self.type_patterns = {
            'handout': ['handouts/', 'handout'],
            'lesson': ['lessons/', 'lesson'],
            'game': ['games/', 'game'],
            'unit-plan': ['units/', 'unit'],
            'interactive': ['interactive', 'tool'],
            'assessment': ['assessment', 'rubric', 'framework'],
            'video-activity': ['video-activities/'],
            'do-now-activity': ['do-now-activities/'],
            'enhanced-handout': ['handouts/enhanced/'],
            'major-platform': ['digital-purakau', 'living-whakapapa', 'virtual-marae', 'classroom-leaderboard']
        }
        
        # Subject classifications
        self.subject_patterns = {
            'Te Ao Māori': ['maori', 'te-reo', 'cultural', 'whakapapa', 'purakau', 'haka'],
            'English': ['writing', 'essay', 'writers-toolkit', 'english'],
            'Social Studies': ['society', 'systems', 'social', 'government', 'y8-systems'],
            'NZ History': ['treaty', 'waitangi', 'history', 'wars', 'dawn-raids', 'bastion'],
            'Science': ['climate', 'environmental', 'microplastic', 'astronomy'],
            'Mathematics': ['probability', 'statistical', 'mathematical'],
            'Digital Technology': ['ai-', 'digital', 'prompt-engineering', 'sovereignty']
        }
        
        # Cultural level indicators
        self.cultural_indicators = {
            'essential': ['māori', 'maori', 'te-reo', 'whakapapa', 'purakau', 'cultural', 'indigenous', 'decoloniz'],
            'high': ['new-zealand', 'aotearoa', 'tiriti', 'treaty', 'traditional'],
            'medium': ['nz-', 'pacific', 'cultural-'],
            'low': []  # Default
        }

    def scan_resources(self) -> List[Dict]:
        """Scan the file system for all HTML educational resources."""
        print("🔍 Scanning for educational resources...")
        
        # Directories to scan
        scan_dirs = [
            'handouts',
            'lessons', 
            'games',
            'units',
            'y8-systems',
            'guided-inquiry-unit',
            '.'  # Root level
        ]
        
        html_files = []
        
        for scan_dir in scan_dirs:
            dir_path = self.base_path / scan_dir
            if dir_path.exists():
                # Find all HTML files recursively
                html_files.extend(dir_path.rglob('*.html'))
        
        print(f"📁 Found {len(html_files)} HTML files")
        
        # Process each file
        for html_file in html_files:
            resource = self.analyze_resource(html_file)
            if resource:
                self.resources.append(resource)
        
        print(f"✅ Indexed {len(self.resources)} educational resources")
        return self.resources

    def analyze_resource(self, file_path: Path) -> Dict:
        """Analyze a single resource file and extract metadata."""
        try:
            # Get relative path from base
            rel_path = file_path.relative_to(self.base_path)
            
            # Skip non-educational files
            if self.should_skip_file(str(rel_path)):
                return None
            
            # Extract title from filename
            title = self.extract_title_from_path(str(rel_path))
            
            # Determine resource type
            resource_type = self.classify_resource_type(str(rel_path))
            
            # Determine subject area
            subject = self.classify_subject(str(rel_path), title)
            
            # Assess cultural level
            cultural_level = self.assess_cultural_level(str(rel_path), title)
            
            # Generate description
            description = self.generate_description(title, resource_type, subject, cultural_level)
            
            return {
                'title': title,
                'path': str(rel_path),
                'type': resource_type,
                'subject': subject,
                'cultural_level': cultural_level,
                'description': description,
                'similarity': 0.85  # Default similarity for demo
            }
            
        except Exception as e:
            print(f"⚠️  Error analyzing {file_path}: {e}")
            return None

    def should_skip_file(self, path: str) -> bool:
        """Check if file should be skipped (non-educational)."""
        skip_patterns = [
            'index.html',
            'backup',
            'old',
            'template',
            'test',
            'error',
            'offline',
            'login',
            'register',
            'privacy',
            'manifest'
        ]
        
        path_lower = path.lower()
        return any(pattern in path_lower for pattern in skip_patterns)

    def extract_title_from_path(self, path: str) -> str:
        """Extract a readable title from the file path."""
        # Get filename without extension
        filename = Path(path).stem
        
        # Remove common prefixes/suffixes
        filename = re.sub(r'^(handout-|lesson-|activity-)', '', filename)
        filename = re.sub(r'(-handout|-lesson|-activity)$', '', filename)
        
        # Convert hyphens/underscores to spaces
        title = filename.replace('-', ' ').replace('_', ' ')
        
        # Capitalize words
        title = ' '.join(word.capitalize() for word in title.split())
        
        # Handle special cases
        title = title.replace('Te Reo', 'Te Reo Māori')
        title = title.replace('Maori', 'Māori')
        title = title.replace('Y8', 'Year 8')
        title = title.replace('Nz', 'New Zealand')
        title = title.replace('Ai', 'AI')
        
        return title

    def classify_resource_type(self, path: str) -> str:
        """Classify the resource type based on path patterns."""
        path_lower = path.lower()
        
        for resource_type, patterns in self.type_patterns.items():
            if any(pattern in path_lower for pattern in patterns):
                return resource_type
        
        return 'handout'  # Default

    def classify_subject(self, path: str, title: str) -> str:
        """Classify the subject area."""
        text = f"{path} {title}".lower()
        
        for subject, patterns in self.subject_patterns.items():
            if any(pattern in text for pattern in patterns):
                return subject
        
        return 'General Education'  # Default

    def assess_cultural_level(self, path: str, title: str) -> str:
        """Assess the cultural integration level."""
        text = f"{path} {title}".lower()
        
        for level, patterns in self.cultural_indicators.items():
            if any(pattern in text for pattern in patterns):
                return level
        
        return 'low'  # Default

    def generate_description(self, title: str, resource_type: str, subject: str, cultural_level: str) -> str:
        """Generate a descriptive summary for the resource."""
        
        # Base description templates
        type_descriptions = {
            'handout': "Comprehensive resource for",
            'lesson': "Complete lesson plan exploring", 
            'game': "Interactive educational game focusing on",
            'unit-plan': "Complete unit covering",
            'interactive': "Interactive tool for",
            'assessment': "Assessment framework for",
            'video-activity': "Multimedia learning activity about",
            'do-now-activity': "Quick-start activity covering",
            'enhanced-handout': "Enhanced resource integrating",
            'major-platform': "Major educational platform for"
        }
        
        # Cultural indicators
        cultural_prefixes = {
            'essential': "🌿 ESSENTIAL CULTURAL RESOURCE: ",
            'high': "🔍 CULTURALLY INTEGRATED: ",
            'medium': "📚 INCLUDES CULTURAL ELEMENTS: ",
            'low': "📄 EDUCATIONAL RESOURCE: "
        }
        
        base_desc = type_descriptions.get(resource_type, "Educational resource about")
        cultural_prefix = cultural_prefixes.get(cultural_level, "")
        
        # Combine elements
        description = f"{cultural_prefix}{base_desc} {title.lower()} with focus on {subject.lower()} learning."
        
        return description

    def generate_graphrag_database(self) -> str:
        """Generate the JavaScript database for GraphRAG search."""
        
        # Group resources by category for better search
        categories = {}
        
        for resource in self.resources:
            # Determine category based on type and subject
            category = self.get_resource_category(resource)
            
            if category not in categories:
                categories[category] = {
                    'semantic': [],
                    'conceptual': [],
                    'progressions': []
                }
            
            categories[category]['semantic'].append(resource)
        
        # Generate JavaScript object
        js_code = "const comprehensiveResources = {\n"
        
        for category, resources in categories.items():
            js_code += f'    "{category}": {{\n'
            js_code += '        semantic: [\n'
            
            for resource in resources['semantic']:
                js_code += '            {\n'
                js_code += f'                title: "{resource["title"]}",\n'
                js_code += f'                path: "{resource["path"]}",\n'
                js_code += f'                type: "{resource["type"]}",\n'
                js_code += f'                subject: "{resource["subject"]}",\n'
                js_code += f'                similarity: {resource["similarity"]},\n'
                js_code += f'                cultural_level: "{resource["cultural_level"]}",\n'
                js_code += f'                description: "{resource["description"]}"\n'
                js_code += '            },\n'
            
            js_code += '        ],\n'
            js_code += '        conceptual: [],\n'
            js_code += '        progressions: []\n'
            js_code += '    },\n'
        
        js_code += "};"
        
        return js_code

    def get_resource_category(self, resource: Dict) -> str:
        """Determine the search category for a resource."""
        path = resource['path'].lower()
        title = resource['title'].lower()
        
        if 'enhanced' in path:
            return 'enhanced handouts'
        elif 'do-now' in path:
            return 'do now activities'
        elif 'video-activities' in path:
            return 'video activities'
        elif 'y8-systems' in path:
            return 'y8 systems resources'
        elif 'games' in path:
            return 'educational games'
        elif resource['type'] == 'assessment':
            return 'assessment frameworks'
        elif 'māori' in title or 'cultural' in title:
            return 'cultural resources'
        elif 'writing' in title or 'essay' in title:
            return 'writing resources'
        else:
            return 'general resources'

    def save_results(self):
        """Save the indexed resources to files."""
        
        # Save JSON version
        with open('indexed_resources.json', 'w', encoding='utf-8') as f:
            json.dump(self.resources, f, indent=2, ensure_ascii=False)
        
        # Generate and save GraphRAG database
        js_database = self.generate_graphrag_database()
        with open('graphrag_resource_database.js', 'w', encoding='utf-8') as f:
            f.write(js_database)
        
        print("💾 Results saved:")
        print("  - indexed_resources.json")
        print("  - graphrag_resource_database.js")

def main():
    """Main execution function."""
    print("🚀 Te Kete Ako - Comprehensive Resource Indexer")
    print("=" * 60)
    
    indexer = TeKeteResourceIndexer()
    
    # Scan and analyze all resources
    resources = indexer.scan_resources()
    
    # Generate reports
    print("\n📊 INDEXING SUMMARY:")
    print("=" * 40)
    
    # Count by type
    types = {}
    subjects = {}
    cultural_levels = {}
    
    for resource in resources:
        types[resource['type']] = types.get(resource['type'], 0) + 1
        subjects[resource['subject']] = subjects.get(resource['subject'], 0) + 1
        cultural_levels[resource['cultural_level']] = cultural_levels.get(resource['cultural_level'], 0) + 1
    
    print("📋 Resource Types:")
    for type_name, count in sorted(types.items()):
        print(f"   {type_name}: {count}")
    
    print("\n📚 Subject Areas:")
    for subject, count in sorted(subjects.items()):
        print(f"   {subject}: {count}")
    
    print("\n🌿 Cultural Integration:")
    for level, count in sorted(cultural_levels.items()):
        print(f"   {level}: {count}")
    
    # Save results
    indexer.save_results()
    
    print(f"\n🎉 SUCCESS: Indexed {len(resources)} educational resources!")
    print("All hidden resources are now discoverable through GraphRAG search.")

if __name__ == "__main__":
    main()