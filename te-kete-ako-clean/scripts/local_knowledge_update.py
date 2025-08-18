#!/usr/bin/env python3
"""
Te Kete Ako - Local Knowledge Graph Update
Scans filesystem for new educational resources and updates knowledge graph.
"""

import os
import json
import re
from pathlib import Path
from typing import List, Dict, Set
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class LocalKnowledgeUpdater:
    """Update knowledge graph by scanning local filesystem for educational resources."""
    
    def __init__(self):
        self.base_path = Path("/Users/admin/Documents/te-kete-ako-clean")
        self.knowledge_graph_file = self.base_path / "te_kete_knowledge_graph.json"
        
        # Cultural concept patterns
        self.cultural_patterns = {
            'whakataukī': {'importance': 'high', 'domain': 'cultural_wisdom'},
            'mātauranga': {'importance': 'high', 'domain': 'knowledge_systems'},
            'te ao māori': {'importance': 'high', 'domain': 'worldview'},
            'tikanga': {'importance': 'high', 'domain': 'customs'},
            'manaakitanga': {'importance': 'high', 'domain': 'relationships'},
            'kaitiakitanga': {'importance': 'high', 'domain': 'environment'},
            'whakapapa': {'importance': 'high', 'domain': 'identity'},
            'tino rangatiratanga': {'importance': 'high', 'domain': 'governance'},
            'kotahitanga': {'importance': 'high', 'domain': 'unity'},
            'treaty of waitangi': {'importance': 'high', 'domain': 'history'},
            'bicultural': {'importance': 'medium', 'domain': 'society'},
            'indigenous': {'importance': 'medium', 'domain': 'identity'},
        }
        
        # Educational concept patterns
        self.educational_patterns = {
            'critical thinking': {'importance': 'high', 'domain': 'thinking_skills'},
            'systems thinking': {'importance': 'high', 'domain': 'thinking_skills'},
            'design thinking': {'importance': 'medium', 'domain': 'thinking_skills'},
            'media literacy': {'importance': 'high', 'domain': 'literacy'},
            'digital citizenship': {'importance': 'medium', 'domain': 'technology'},
            'community action': {'importance': 'high', 'domain': 'civic_engagement'},
            'social justice': {'importance': 'high', 'domain': 'social_studies'},
            'environmental sustainability': {'importance': 'high', 'domain': 'environment'},
            'collaborative learning': {'importance': 'medium', 'domain': 'pedagogy'},
            'project-based learning': {'importance': 'medium', 'domain': 'pedagogy'},
            'assessment rubric': {'importance': 'medium', 'domain': 'assessment'},
            'guided inquiry': {'importance': 'medium', 'domain': 'pedagogy'},
        }
        
    def scan_for_new_resources(self) -> List[Dict]:
        """Scan filesystem for HTML educational resources."""
        resources = []
        
        # Define paths to scan
        scan_paths = [
            self.base_path / "lessons",
            self.base_path / "handouts", 
            self.base_path / "project",
            self.base_path / "guided-inquiry-unit",
            self.base_path / "y8-systems",
            self.base_path / "activities",
        ]
        
        for scan_path in scan_paths:
            if scan_path.exists():
                logger.info(f"🔍 Scanning: {scan_path}")
                resources.extend(self._scan_directory(scan_path))
        
        logger.info(f"📚 Found {len(resources)} resources")
        return resources
    
    def _scan_directory(self, directory: Path) -> List[Dict]:
        """Recursively scan directory for HTML files."""
        resources = []
        
        for html_file in directory.rglob("*.html"):
            try:
                with open(html_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                resource = self._analyze_html_file(html_file, content)
                if resource:
                    resources.append(resource)
                    
            except Exception as e:
                logger.warning(f"⚠️ Could not process {html_file}: {e}")
        
        return resources
    
    def _analyze_html_file(self, file_path: Path, content: str) -> Dict:
        """Analyze HTML file to extract educational metadata."""
        
        # Extract title
        title_match = re.search(r'<title>([^<]+)</title>', content, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else file_path.stem
        
        # Clean up title
        title = re.sub(r'\s*\|\s*Te Kete Ako.*$', '', title)
        
        # Determine resource type based on path and content
        resource_type = self._determine_resource_type(file_path, content)
        
        # Extract key concepts
        concepts = self._extract_concepts(content)
        
        # Assess cultural integration
        cultural_level = self._assess_cultural_level(content)
        
        # Determine subject areas
        subject_areas = self._determine_subject_areas(content, concepts)
        
        return {
            'id': str(file_path.relative_to(self.base_path)),
            'title': title,
            'path': str(file_path.relative_to(self.base_path)),
            'type': resource_type,
            'concepts': concepts,
            'cultural_level': cultural_level,
            'subject_areas': subject_areas,
            'content_preview': content[:500].replace('\n', ' ').strip(),
            'file_size': len(content),
            'last_modified': datetime.fromtimestamp(file_path.stat().st_mtime).isoformat()
        }
    
    def _determine_resource_type(self, file_path: Path, content: str) -> str:
        """Determine type of educational resource."""
        path_str = str(file_path).lower()
        content_lower = content.lower()
        
        if 'lesson' in path_str or 'lesson' in content_lower:
            return 'lesson'
        elif 'handout' in path_str or 'worksheet' in content_lower:
            return 'handout'
        elif 'project' in path_str or 'assessment' in content_lower:
            return 'project_resource'
        elif 'activity' in path_str or 'game' in content_lower:
            return 'activity'
        elif 'unit' in path_str:
            return 'unit_plan'
        else:
            return 'resource'
    
    def _extract_concepts(self, content: str) -> List[Dict]:
        """Extract educational and cultural concepts from content."""
        concepts = []
        content_lower = content.lower()
        
        # Check for cultural concepts
        for concept, metadata in self.cultural_patterns.items():
            if concept in content_lower:
                concepts.append({
                    'name': concept,
                    'type': 'cultural',
                    'importance': metadata['importance'],
                    'domain': metadata['domain'],
                    'frequency': content_lower.count(concept)
                })
        
        # Check for educational concepts
        for concept, metadata in self.educational_patterns.items():
            if concept in content_lower:
                concepts.append({
                    'name': concept,
                    'type': 'educational',
                    'importance': metadata['importance'],
                    'domain': metadata['domain'],
                    'frequency': content_lower.count(concept)
                })
        
        return concepts
    
    def _assess_cultural_level(self, content: str) -> str:
        """Assess level of cultural integration in content."""
        content_lower = content.lower()
        
        cultural_indicators = [
            'te reo', 'māori', 'whakataukī', 'tikanga', 'mātauranga',
            'bicultural', 'indigenous', 'treaty', 'iwi', 'hapū'
        ]
        
        cultural_count = sum(1 for indicator in cultural_indicators if indicator in content_lower)
        
        if cultural_count >= 5:
            return 'high'
        elif cultural_count >= 2:
            return 'medium'
        else:
            return 'low'
    
    def _determine_subject_areas(self, content: str, concepts: List[Dict]) -> List[str]:
        """Determine which subject areas this resource covers."""
        subject_areas = set()
        content_lower = content.lower()
        
        # Subject area indicators
        subject_indicators = {
            'social_sciences': ['social', 'history', 'geography', 'society', 'government', 'politics', 'culture'],
            'english': ['literacy', 'writing', 'reading', 'communication', 'language', 'text'],
            'te_reo_maori': ['te reo', 'māori language', 'reo māori'],
            'technology': ['digital', 'computer', 'technology', 'coding', 'programming'],
            'science': ['science', 'environment', 'biology', 'physics', 'chemistry'],
            'mathematics': ['math', 'statistics', 'data', 'number', 'measurement'],
            'arts': ['art', 'creative', 'design', 'visual', 'performance', 'drama'],
            'health_pe': ['health', 'wellbeing', 'physical', 'sport', 'exercise']
        }
        
        for subject, indicators in subject_indicators.items():
            for indicator in indicators:
                if indicator in content_lower:
                    subject_areas.add(subject)
                    break
        
        # Add subject areas based on concepts
        for concept in concepts:
            if concept['domain'] in ['history', 'social_studies', 'governance']:
                subject_areas.add('social_sciences')
            elif concept['domain'] in ['literacy', 'communication']:
                subject_areas.add('english')
            elif concept['domain'] in ['technology']:
                subject_areas.add('technology')
        
        return list(subject_areas)
    
    def update_knowledge_graph(self):
        """Update the knowledge graph with newly discovered resources."""
        logger.info("🧠 Starting Local Knowledge Graph Update...")
        
        # Load existing knowledge graph if it exists
        if self.knowledge_graph_file.exists():
            with open(self.knowledge_graph_file, 'r', encoding='utf-8') as f:
                knowledge_graph = json.load(f)
            logger.info(f"📖 Loaded existing knowledge graph with {len(knowledge_graph.get('resources', []))} resources")
        else:
            knowledge_graph = {
                'resources': [],
                'concepts': [],
                'relationships': [],
                'statistics': {}
            }
            logger.info("🆕 Creating new knowledge graph")
        
        # Scan for new resources
        new_resources = self.scan_for_new_resources()
        
        # Get existing resource IDs
        existing_ids = {r['id'] for r in knowledge_graph['resources']}
        
        # Add new resources
        added_count = 0
        updated_count = 0
        
        for resource in new_resources:
            if resource['id'] in existing_ids:
                # Update existing resource
                for i, existing_resource in enumerate(knowledge_graph['resources']):
                    if existing_resource['id'] == resource['id']:
                        knowledge_graph['resources'][i] = resource
                        updated_count += 1
                        break
            else:
                # Add new resource
                knowledge_graph['resources'].append(resource)
                added_count += 1
        
        logger.info(f"✅ Added {added_count} new resources, updated {updated_count} existing resources")
        
        # Update concepts and relationships
        self._update_concepts_and_relationships(knowledge_graph)
        
        # Update statistics
        knowledge_graph['statistics'] = self._generate_statistics(knowledge_graph)
        
        # Save updated knowledge graph
        with open(self.knowledge_graph_file, 'w', encoding='utf-8') as f:
            json.dump(knowledge_graph, f, indent=2, ensure_ascii=False)
        
        logger.info(f"💾 Updated knowledge graph saved to {self.knowledge_graph_file}")
        
        # Print statistics
        stats = knowledge_graph['statistics']
        logger.info("📊 Updated Knowledge Graph Statistics:")
        for key, value in stats.items():
            logger.info(f"   {key}: {value}")
        
        return knowledge_graph
    
    def _update_concepts_and_relationships(self, knowledge_graph: Dict):
        """Update concepts and relationships based on resources."""
        all_concepts = {}
        relationships = []
        
        for resource in knowledge_graph['resources']:
            for concept in resource.get('concepts', []):
                concept_key = concept['name']
                
                if concept_key not in all_concepts:
                    all_concepts[concept_key] = {
                        'name': concept['name'],
                        'type': concept['type'],
                        'importance': concept['importance'],
                        'domain': concept['domain'],
                        'total_frequency': 0,
                        'resource_count': 0
                    }
                
                all_concepts[concept_key]['total_frequency'] += concept['frequency']
                all_concepts[concept_key]['resource_count'] += 1
                
                # Create relationship between resource and concept
                relationships.append({
                    'from': resource['id'],
                    'from_type': 'resource',
                    'to': concept['name'],
                    'to_type': 'concept',
                    'relationship': 'CONTAINS',
                    'strength': concept['frequency']
                })
        
        knowledge_graph['concepts'] = list(all_concepts.values())
        knowledge_graph['relationships'] = relationships
    
    def _generate_statistics(self, knowledge_graph: Dict) -> Dict:
        """Generate comprehensive statistics about the knowledge graph."""
        resources = knowledge_graph['resources']
        concepts = knowledge_graph['concepts']
        
        # Resource type distribution
        resource_types = {}
        cultural_levels = {}
        subject_areas = {}
        
        for resource in resources:
            # Count resource types
            resource_type = resource.get('type', 'unknown')
            resource_types[resource_type] = resource_types.get(resource_type, 0) + 1
            
            # Count cultural levels
            cultural_level = resource.get('cultural_level', 'unknown')
            cultural_levels[cultural_level] = cultural_levels.get(cultural_level, 0) + 1
            
            # Count subject areas
            for subject in resource.get('subject_areas', []):
                subject_areas[subject] = subject_areas.get(subject, 0) + 1
        
        # Concept domain distribution
        concept_domains = {}
        for concept in concepts:
            domain = concept.get('domain', 'unknown')
            concept_domains[domain] = concept_domains.get(domain, 0) + 1
        
        return {
            'total_resources': len(resources),
            'total_concepts': len(concepts),
            'total_relationships': len(knowledge_graph['relationships']),
            'resource_types': resource_types,
            'cultural_levels': cultural_levels,
            'subject_areas': subject_areas,
            'concept_domains': concept_domains,
            'high_cultural_resources': cultural_levels.get('high', 0),
            'last_updated': datetime.now().isoformat()
        }

def main():
    """Main execution function."""
    print("🧠 Te Kete Ako - Local Knowledge Graph Update")
    print("=" * 60)
    
    updater = LocalKnowledgeUpdater()
    knowledge_graph = updater.update_knowledge_graph()
    
    print("\n" + "=" * 60)
    print("🎉 Knowledge Graph Update Complete!")
    print(f"📊 Total Resources: {knowledge_graph['statistics']['total_resources']}")
    print(f"🔬 Total Concepts: {knowledge_graph['statistics']['total_concepts']}")
    print(f"🔗 Total Relationships: {knowledge_graph['statistics']['total_relationships']}")
    print(f"🌏 High Cultural Resources: {knowledge_graph['statistics']['high_cultural_resources']}")

if __name__ == "__main__":
    main()