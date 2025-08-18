#!/usr/bin/env python3
"""
Te Kete Ako - Standalone GraphRAG Demo
Demonstrates the knowledge graph capabilities without external dependencies.
"""

import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class StandaloneGraphRAG:
    """Standalone GraphRAG system using local knowledge graph only."""
    
    def __init__(self):
        # Load our knowledge graph
        with open('te_kete_knowledge_graph.json', 'r') as f:
            self.knowledge_graph = json.load(f)
        
        # Create lookup structures for fast relationship queries
        self.resource_concepts = {}  # resource_id -> [concepts]
        self.concept_resources = {}  # concept -> [resource_ids]
        self.resource_subjects = {}  # resource_id -> subject_area
        
        self._build_relationship_cache()
    
    def _build_relationship_cache(self):
        """Build fast lookup structures from knowledge graph."""
        logger.info("🔗 Building relationship cache...")
        
        # Index resources
        for resource in self.knowledge_graph['resources']:
            resource_id = resource['id']
            # Handle subject_areas (plural) from actual data structure
            subject_areas = resource.get('subject_areas', [])
            self.resource_subjects[resource_id] = subject_areas[0] if subject_areas else 'General'
            self.resource_concepts[resource_id] = []
        
        # Index relationships
        for rel in self.knowledge_graph['relationships']:
            if rel['from_type'] == 'resource' and rel['to_type'] == 'concept':
                resource_id = rel['from']  # Using 'from' not 'from_id'
                concept_name = rel['to']   # Using 'to' not 'to_name'
                
                # Add concept to resource
                if resource_id not in self.resource_concepts:
                    self.resource_concepts[resource_id] = []
                self.resource_concepts[resource_id].append(concept_name)
                
                # Add resource to concept
                if concept_name not in self.concept_resources:
                    self.concept_resources[concept_name] = []
                self.concept_resources[concept_name].append(resource_id)
        
        logger.info(f"✅ Cached {len(self.resource_concepts)} resource-concept mappings")
    
    def keyword_search(self, query: str, limit: int = 5):
        """Simple keyword-based search through resources."""
        logger.info(f"🔍 Keyword search: '{query}'")
        
        query_lower = query.lower()
        matches = []
        
        for resource in self.knowledge_graph['resources']:
            score = 0
            
            # Check title match
            if any(word in resource['title'].lower() for word in query_lower.split()):
                score += 2
            
            # Check cultural concepts match
            for concept in resource.get('concepts', []):
                if any(word in concept['name'].lower() for word in query_lower.split()):
                    score += concept.get('importance_score', 1)
            
            # Check subject areas match
            for subject in resource.get('subject_areas', []):
                if any(word in subject.lower() for word in query_lower.split()):
                    score += 1
            
            if score > 0:
                matches.append({
                    **resource,
                    'similarity': score / 10.0,  # Normalize score
                    'type': resource['type'],
                    'subject': resource.get('subject_areas', ['General'])[0] if resource.get('subject_areas') else 'General'
                })
        
        # Sort by score and return top matches
        matches.sort(key=lambda x: x['similarity'], reverse=True)
        logger.info(f"📊 Found {len(matches[:limit])} matching resources")
        return matches[:limit]
    
    def find_related_by_concepts(self, initial_resources: list):
        """Find resources related through shared concepts."""
        logger.info("🧠 Finding conceptually related resources...")
        
        # Extract concepts from initial resources
        related_concepts = set()
        initial_ids = {r['id'] for r in initial_resources}
        
        for resource in initial_resources:
            resource_id = resource['id']
            if resource_id in self.resource_concepts:
                concepts = self.resource_concepts[resource_id]
                related_concepts.update(concepts)
                logger.info(f"   {resource['title'][:30]}... → {concepts}")
        
        # Find other resources that share these concepts
        related_resources = []
        seen_ids = set(initial_ids)  # Don't repeat initial resources
        
        for concept in related_concepts:
            if concept in self.concept_resources:
                for resource_id in self.concept_resources[concept]:
                    if resource_id not in seen_ids:
                        # Get resource details
                        resource_info = next(
                            (r for r in self.knowledge_graph['resources'] if r['id'] == resource_id),
                            None
                        )
                        if resource_info:
                            related_resources.append({
                                **resource_info,
                                'related_through_concept': concept,
                                'connection_strength': 0.7,  # Could be calculated
                                'subject_area': resource_info.get('subject_areas', ['General'])[0] if resource_info.get('subject_areas') else 'General'
                            })
                            seen_ids.add(resource_id)
        
        logger.info(f"🔗 Found {len(related_resources)} conceptually related resources")
        return related_resources[:10]  # Limit to top 10
    
    def find_cultural_resources(self, cultural_level='high'):
        """Find resources with specific cultural content level."""
        logger.info(f"🌿 Finding {cultural_level} cultural resources...")
        
        cultural_resources = [
            r for r in self.knowledge_graph['resources'] 
            if r.get('cultural_level') == cultural_level
        ]
        
        logger.info(f"📊 Found {len(cultural_resources)} {cultural_level} cultural resources")
        return cultural_resources[:10]
    
    def contextual_recommendations(self, query: str):
        """Main function: Knowledge graph-based recommendations."""
        logger.info("🌟 Starting Knowledge Graph Query...")
        print(f"\n🔍 Query: '{query}'")
        print("=" * 60)
        
        # Step 1: Keyword search
        initial_resources = self.keyword_search(query)
        
        if not initial_resources:
            print("❌ No relevant resources found")
            return
        
        print("\n📊 KEYWORD SEARCH RESULTS:")
        for i, resource in enumerate(initial_resources, 1):
            similarity = round(resource['similarity'] * 100)
            print(f"{i}. {resource['title']} ({similarity}% relevance)")
            print(f"   Type: {resource['type']} | Subjects: {', '.join(resource.get('subject_areas', ['General']))}")
            print(f"   Cultural Level: {resource.get('cultural_level', 'unknown')}")
        
        # Step 2: Find conceptually related resources
        related_resources = self.find_related_by_concepts(initial_resources)
        
        if related_resources:
            print("\n🧠 CONCEPTUALLY RELATED RESOURCES:")
            for i, resource in enumerate(related_resources[:5], 1):
                print(f"{i}. {resource['title']}")
                print(f"   Connected through: {resource['related_through_concept']}")
                print(f"   Subject: {resource['subject_area']} | Cultural level: {resource['cultural_level']}")
        
        # Step 3: Cultural resources if query mentions Māori/culture
        if any(word in query.lower() for word in ['māori', 'maori', 'cultural', 'culture', 'traditional']):
            cultural_resources = self.find_cultural_resources('high')
            
            if cultural_resources:
                print("\n🌿 HIGH CULTURAL CONTENT RESOURCES:")
                for i, resource in enumerate(cultural_resources[:5], 1):
                    print(f"{i}. {resource['title']}")
                    print(f"   Subjects: {', '.join(resource.get('subject_areas', ['General']))}")
                    concepts = [c['name'] for c in resource.get('concepts', [])][:3]
                    if concepts:
                        print(f"   Key concepts: {', '.join(concepts)}")
        
        # Summary
        total_recommendations = len(initial_resources) + len(related_resources)
        print("\n🎯 SUMMARY:")
        print(f"   • {len(initial_resources)} keyword matches")
        print(f"   • {len(related_resources)} conceptually related resources")
        print(f"   • {total_recommendations} total recommendations")
        
        return {
            'keyword_results': initial_resources,
            'related_resources': related_resources,
            'total_count': total_recommendations
        }

def main():
    """Demonstrate the Standalone Knowledge Graph system."""
    print("🌟 Te Kete Ako - Knowledge Graph Demo")
    print("=" * 60)
    print("This demonstrates knowledge graph analysis using:")
    print("• Local keyword search")
    print("• Concept relationship mapping")  
    print("• Cultural content filtering")
    print()
    
    # Initialize system
    try:
        graph_system = StandaloneGraphRAG()
    except FileNotFoundError:
        print("❌ Knowledge graph not found. Run extract_knowledge_graph.py first.")
        return
    
    # Demo queries
    demo_queries = [
        "I want to learn about Māori culture and traditions",
        "How can I improve my essay writing skills?",
        "What is systems thinking in social studies?", 
        "Teaching resources about the Treaty of Waitangi"
    ]
    
    for query in demo_queries:
        results = graph_system.contextual_recommendations(query)
        input("\nPress Enter to continue to next query...")
        print("\n" + "="*80 + "\n")
    
    print("🎉 Knowledge Graph Demo Complete!")
    print("\nThis system provides:")
    print("• Intelligent content discovery through relationships")
    print("• Cultural context awareness") 
    print("• Cross-curricular connections")
    print("• Ready for vector search integration!")

if __name__ == "__main__":
    main()