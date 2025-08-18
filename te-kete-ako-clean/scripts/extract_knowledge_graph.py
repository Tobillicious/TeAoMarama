#!/usr/bin/env python3
"""
Te Kete Ako - GraphRAG Phase 2: Knowledge Graph Construction
Extracts entities and relationships from educational resources to build an intelligent knowledge graph.
"""

import re
import json
import sys
from typing import List, Dict
from supabase import create_client
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Supabase configuration - SECURE: Using environment variables
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    logger.error("❌ Missing required environment variables. Please check your .env file.")
    logger.error("Required: SUPABASE_URL, SUPABASE_ANON_KEY")
    sys.exit(1)

class TeKeteKnowledgeExtractor:
    """Extract structured knowledge from Te Kete Ako educational resources."""
    
    def __init__(self):
        self.supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Define our knowledge ontology
        self.cultural_concepts = {
            # Core Māori concepts
            'whakapapa': {'type': 'cultural_concept', 'domain': 'identity', 'importance': 'high'},
            'manaakitanga': {'type': 'cultural_concept', 'domain': 'relationships', 'importance': 'high'},
            'kaitiakitanga': {'type': 'cultural_concept', 'domain': 'environment', 'importance': 'high'},
            'tino rangatiratanga': {'type': 'cultural_concept', 'domain': 'governance', 'importance': 'high'},
            'kotahitanga': {'type': 'cultural_concept', 'domain': 'unity', 'importance': 'high'},
            'whakatōhea': {'type': 'cultural_concept', 'domain': 'collective', 'importance': 'high'},
            
            # Language concepts
            'te reo māori': {'type': 'language', 'domain': 'communication', 'importance': 'high'},
            'karakia': {'type': 'cultural_practice', 'domain': 'spirituality', 'importance': 'medium'},
            'hongi': {'type': 'cultural_practice', 'domain': 'greeting', 'importance': 'medium'},
            'haka': {'type': 'cultural_practice', 'domain': 'expression', 'importance': 'high'},
            
            # Places and institutions
            'marae': {'type': 'cultural_place', 'domain': 'community', 'importance': 'high'},
            'iwi': {'type': 'social_structure', 'domain': 'identity', 'importance': 'high'},
            'tangata whenua': {'type': 'social_concept', 'domain': 'identity', 'importance': 'high'},
        }
        
        self.educational_concepts = {
            # Writing concepts
            'peel method': {'type': 'learning_technique', 'domain': 'writing', 'importance': 'high'},
            'essay writing': {'type': 'skill', 'domain': 'writing', 'importance': 'high'},
            'persuasive writing': {'type': 'skill', 'domain': 'writing', 'importance': 'medium'},
            'rhetorical devices': {'type': 'learning_concept', 'domain': 'writing', 'importance': 'medium'},
            
            # Systems thinking
            'systems thinking': {'type': 'learning_concept', 'domain': 'analysis', 'importance': 'high'},
            'governance systems': {'type': 'learning_concept', 'domain': 'social_studies', 'importance': 'high'},
            'social systems': {'type': 'learning_concept', 'domain': 'social_studies', 'importance': 'high'},
            
            # Historical concepts
            'treaty of waitangi': {'type': 'historical_concept', 'domain': 'nz_history', 'importance': 'high'},
            'te tiriti': {'type': 'historical_concept', 'domain': 'nz_history', 'importance': 'high'},
            'colonization': {'type': 'historical_concept', 'domain': 'nz_history', 'importance': 'high'},
            'decolonization': {'type': 'educational_approach', 'domain': 'pedagogy', 'importance': 'high'},
        }
        
        # Learning progression relationships
        self.progression_patterns = [
            ('introduction', 'basic', 'intermediate', 'advanced'),
            ('lesson 1', 'lesson 2', 'lesson 3', 'lesson 4', 'lesson 5'),
            ('foundation', 'application', 'analysis', 'synthesis'),
        ]

    def extract_all_knowledge(self):
        """Main function to extract and structure all knowledge."""
        logger.info("🧠 Starting Knowledge Graph Extraction...")
        
        # Fetch all resources
        resources = self.fetch_resources()
        
        # Extract entities and relationships
        knowledge_graph = {
            'resources': [],
            'concepts': [],
            'relationships': [],
            'statistics': {}
        }
        
        concept_registry = set()
        
        for resource in resources:
            logger.info(f"🔍 Analyzing: {resource['title'][:50]}...")
            
            # Extract concepts from this resource
            concepts = self.extract_concepts(resource)
            
            # Create resource node
            resource_node = {
                'id': resource['id'],
                'title': resource['title'],
                'type': resource['type'],
                'path': resource['path'],
                'subject_area': self.determine_subject_area(resource),
                'cultural_level': self.assess_cultural_integration(resource),
                'difficulty_level': self.assess_difficulty(resource)
            }
            knowledge_graph['resources'].append(resource_node)
            
            # Add concepts to registry
            for concept in concepts:
                if concept['name'] not in concept_registry:
                    knowledge_graph['concepts'].append(concept)
                    concept_registry.add(concept['name'])
                
                # Create relationship: Resource TEACHES/CONTAINS Concept
                relationship = {
                    'from_type': 'resource',
                    'from_id': resource['id'],
                    'to_type': 'concept', 
                    'to_name': concept['name'],
                    'relationship_type': 'TEACHES' if resource['type'] in ['lesson', 'unit-plan'] else 'CONTAINS',
                    'strength': concept['relevance_score']
                }
                knowledge_graph['relationships'].append(relationship)
        
        # Find concept-to-concept relationships
        self.find_concept_relationships(knowledge_graph)
        
        # Find learning progressions
        self.find_learning_progressions(knowledge_graph)
        
        # Generate statistics
        knowledge_graph['statistics'] = {
            'total_resources': len(knowledge_graph['resources']),
            'total_concepts': len(knowledge_graph['concepts']),
            'total_relationships': len(knowledge_graph['relationships']),
            'cultural_resources': len([r for r in knowledge_graph['resources'] if r['cultural_level'] == 'high']),
            'concept_domains': self.count_concept_domains(knowledge_graph['concepts'])
        }
        
        logger.info("📊 Knowledge Graph Statistics:")
        for key, value in knowledge_graph['statistics'].items():
            logger.info(f"   {key}: {value}")
        
        return knowledge_graph

    def fetch_resources(self):
        """Fetch all educational resources from Supabase."""
        try:
            response = self.supabase.table('resources').select('*').execute()
            logger.info(f"📚 Fetched {len(response.data)} resources")
            return response.data
        except Exception as e:
            logger.error(f"❌ Failed to fetch resources: {e}")
            return []

    def extract_concepts(self, resource: Dict) -> List[Dict]:
        """Extract relevant concepts from a resource."""
        text = f"{resource['title']} {resource.get('description', '')}".lower()
        concepts = []
        
        # Check cultural concepts
        for concept_name, concept_info in self.cultural_concepts.items():
            if self.concept_appears_in_text(concept_name, text):
                concepts.append({
                    'name': concept_name,
                    'type': concept_info['type'],
                    'domain': concept_info['domain'],
                    'importance': concept_info['importance'],
                    'relevance_score': self.calculate_relevance_score(concept_name, text, resource)
                })
        
        # Check educational concepts
        for concept_name, concept_info in self.educational_concepts.items():
            if self.concept_appears_in_text(concept_name, text):
                concepts.append({
                    'name': concept_name,
                    'type': concept_info['type'],
                    'domain': concept_info['domain'],
                    'importance': concept_info['importance'],
                    'relevance_score': self.calculate_relevance_score(concept_name, text, resource)
                })
        
        # Extract subject-specific concepts from path
        path_concepts = self.extract_path_concepts(resource['path'])
        concepts.extend(path_concepts)
        
        return concepts

    def concept_appears_in_text(self, concept: str, text: str) -> bool:
        """Check if a concept appears in text (with variations)."""
        # Handle variations and partial matches
        concept_variations = [
            concept,
            concept.replace('ā', 'a'),  # Handle macrons
            concept.replace('ō', 'o'),
            concept.replace(' ', '-'),  # Handle hyphenated versions
            concept.replace('-', ' '),  # Handle space versions
        ]
        
        return any(variation in text for variation in concept_variations)

    def calculate_relevance_score(self, concept: str, text: str, resource: Dict) -> float:
        """Calculate how relevant a concept is to a resource (0.0 to 1.0)."""
        score = 0.0
        
        # Base score for appearance
        if concept in text:
            score += 0.5
        
        # Bonus for title appearance (more important)
        if concept in resource['title'].lower():
            score += 0.3
        
        # Bonus for path relevance
        if concept.replace(' ', '-') in resource['path'].lower():
            score += 0.2
        
        # Type-specific bonuses
        if resource['type'] == 'lesson' and 'lesson' in concept:
            score += 0.1
        if resource['type'] == 'game' and any(word in concept for word in ['interactive', 'practice']):
            score += 0.1
        
        return min(score, 1.0)

    def extract_path_concepts(self, path: str) -> List[Dict]:
        """Extract concepts from resource path structure."""
        concepts = []
        path_lower = path.lower()
        
        # Y8 Systems unit concepts
        if 'y8-systems' in path_lower:
            concepts.append({
                'name': 'year 8 systems unit',
                'type': 'curriculum_unit',
                'domain': 'social_studies',
                'importance': 'high',
                'relevance_score': 1.0
            })
        
        # Writers toolkit concepts
        if 'writers-toolkit' in path_lower:
            concepts.append({
                'name': 'writers toolkit',
                'type': 'curriculum_unit',
                'domain': 'english',
                'importance': 'high',
                'relevance_score': 1.0
            })
        
        # Lesson progression concepts
        lesson_match = re.search(r'lesson-(\d+)-(\d+)', path_lower)
        if lesson_match:
            week, lesson = lesson_match.groups()
            concepts.append({
                'name': f'week {week} learning',
                'type': 'learning_sequence',
                'domain': 'curriculum',
                'importance': 'medium',
                'relevance_score': 0.8
            })
        
        return concepts

    def determine_subject_area(self, resource: Dict) -> str:
        """Determine the primary subject area for a resource."""
        path = resource['path'].lower()
        title = resource['title'].lower()
        
        if any(term in f"{path} {title}" for term in ['te-reo', 'māori', 'maori', 'cultural']):
            return 'Te Ao Māori'
        elif any(term in f"{path} {title}" for term in ['writing', 'essay', 'peel']):
            return 'English'
        elif any(term in f"{path} {title}" for term in ['systems', 'social', 'society']):
            return 'Social Studies'
        elif any(term in f"{path} {title}" for term in ['treaty', 'waitangi', 'history']):
            return 'New Zealand History'
        elif 'game' in path:
            return 'Interactive Learning'
        else:
            return 'General Education'

    def assess_cultural_integration(self, resource: Dict) -> str:
        """Assess the level of cultural integration in a resource."""
        text = f"{resource['title']} {resource.get('description', '')}".lower()
        
        high_indicators = ['māori', 'maori', 'te reo', 'whakapapa', 'tino rangatiratanga', 'cultural']
        medium_indicators = ['new zealand', 'aotearoa', 'indigenous', 'traditional']
        
        if any(indicator in text for indicator in high_indicators):
            return 'high'
        elif any(indicator in text for indicator in medium_indicators):
            return 'medium'
        else:
            return 'low'

    def assess_difficulty(self, resource: Dict) -> str:
        """Assess the difficulty level of a resource."""
        title = resource['title'].lower()
        path = resource['path'].lower()
        
        if any(term in f"{title} {path}" for term in ['introduction', 'basic', 'lesson-1']):
            return 'beginner'
        elif any(term in f"{title} {path}" for term in ['advanced', 'complex', 'analysis']):
            return 'advanced'
        else:
            return 'intermediate'

    def find_concept_relationships(self, knowledge_graph: Dict):
        """Find relationships between concepts."""
        concepts = knowledge_graph['concepts']
        
        for i, concept1 in enumerate(concepts):
            for j, concept2 in enumerate(concepts[i+1:], i+1):
                relationship_type = self.determine_concept_relationship(concept1, concept2)
                if relationship_type:
                    knowledge_graph['relationships'].append({
                        'from_type': 'concept',
                        'from_name': concept1['name'],
                        'to_type': 'concept',
                        'to_name': concept2['name'],
                        'relationship_type': relationship_type,
                        'strength': 0.7
                    })

    def determine_concept_relationship(self, concept1: Dict, concept2: Dict) -> str:
        """Determine if two concepts are related and how."""
        # Same domain concepts are related
        if concept1['domain'] == concept2['domain']:
            return 'RELATED_TO'
        
        # Cultural concepts build on each other
        if (concept1['type'] == 'cultural_concept' and concept2['type'] == 'cultural_concept'):
            return 'CONNECTS_TO'
        
        # Learning progressions
        if ('basic' in concept1['name'] and 'advanced' in concept2['name']) or \
           ('introduction' in concept1['name'] and concept2['name'].startswith('lesson')):
            return 'LEADS_TO'
        
        return None

    def find_learning_progressions(self, knowledge_graph: Dict):
        """Find learning progression relationships between resources."""
        resources = knowledge_graph['resources']
        
        # Group by subject area
        by_subject = {}
        for resource in resources:
            subject = resource['subject_area']
            if subject not in by_subject:
                by_subject[subject] = []
            by_subject[subject].append(resource)
        
        # Find progressions within each subject
        for subject, subject_resources in by_subject.items():
            # Sort by path to find lesson sequences
            lesson_resources = [r for r in subject_resources if 'lesson' in r['path'].lower()]
            lesson_resources.sort(key=lambda x: x['path'])
            
            # Create progression relationships
            for i in range(len(lesson_resources) - 1):
                current = lesson_resources[i]
                next_lesson = lesson_resources[i + 1]
                
                knowledge_graph['relationships'].append({
                    'from_type': 'resource',
                    'from_id': current['id'],
                    'to_type': 'resource',
                    'to_id': next_lesson['id'],
                    'relationship_type': 'FOLLOWED_BY',
                    'strength': 0.9
                })

    def count_concept_domains(self, concepts: List[Dict]) -> Dict:
        """Count concepts by domain."""
        domain_counts = {}
        for concept in concepts:
            domain = concept['domain']
            domain_counts[domain] = domain_counts.get(domain, 0) + 1
        return domain_counts

    def save_knowledge_graph(self, knowledge_graph: Dict, filename: str = 'te_kete_knowledge_graph.json'):
        """Save the knowledge graph to a JSON file."""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(knowledge_graph, f, indent=2, ensure_ascii=False)
        logger.info(f"💾 Knowledge graph saved to {filename}")

def main():
    """Main execution function."""
    print("🧠 Te Kete Ako - Knowledge Graph Construction")
    print("=" * 60)
    
    extractor = TeKeteKnowledgeExtractor()
    
    # Extract knowledge graph
    knowledge_graph = extractor.extract_all_knowledge()
    
    # Save to file
    extractor.save_knowledge_graph(knowledge_graph)
    
    print("\n" + "=" * 60)
    print("🎉 Knowledge Graph Construction Complete!")
    print("Next steps:")
    print("1. Set up Neo4j AuraDB instance")
    print("2. Load this knowledge graph into Neo4j")
    print("3. Test graph queries")
    print("4. Move to GraphRAG Phase 3 (Hybrid System)")

if __name__ == "__main__":
    main()