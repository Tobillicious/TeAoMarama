#!/usr/bin/env python3
"""
Te Kete Ako - GraphRAG Phase 3 Demo: Hybrid System
Demonstrates the power of combining semantic search with relationship knowledge
using our existing Supabase infrastructure.
"""

import json
import sys
from sentence_transformers import SentenceTransformer
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

class HybridGraphRAG:
    """Hybrid GraphRAG system combining semantic search with relationship knowledge."""
    
    def __init__(self):
        self.supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        
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
    
    def semantic_search(self, query: str, threshold: float = 0.3, limit: int = 5):
        """Step 1: Semantic search to find relevant resources."""
        logger.info(f"🔍 Semantic search: '{query}'")
        
        # Generate query embedding
        embedding = self.model.encode(query).tolist()
        
        # Search using our existing system
        result = self.supabase.rpc('match_resources', {
            'query_embedding': embedding,
            'match_threshold': threshold,
            'match_count': limit
        }).execute()
        
        if result.data:
            logger.info(f"📊 Found {len(result.data)} semantically similar resources")
            return result.data
        else:
            logger.info("📊 No semantically similar resources found")
            return []
    
    def find_related_by_concepts(self, initial_resources: list):
        """Step 2: Use knowledge graph to find related resources."""
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
        return related_resources
    
    def find_learning_progressions(self, initial_resources: list):
        """Step 3: Find learning sequence relationships."""
        logger.info("📚 Finding learning progressions...")
        
        progressions = []
        
        # Group by subject area
        subjects = set()
        for resource in initial_resources:
            resource_id = resource['id']
            if resource_id in self.resource_subjects:
                subjects.add(self.resource_subjects[resource_id])
        
        # Find lesson sequences within each subject
        for subject in subjects:
            subject_resources = [
                r for r in self.knowledge_graph['resources'] 
                if subject in r.get('subject_areas', []) and 'lesson' in r['path'].lower()
            ]
            
            # Sort by path to find sequences
            subject_resources.sort(key=lambda x: x['path'])
            
            for resource in subject_resources:
                if not any(r['id'] == resource['id'] for r in initial_resources):
                    progressions.append({
                        **resource,
                        'progression_type': f'{subject} sequence',
                        'connection_strength': 0.8,
                        'subject_area': resource.get('subject_areas', ['General'])[0] if resource.get('subject_areas') else 'General',
                        'difficulty_level': 'intermediate'  # Default value
                    })
        
        logger.info(f"📈 Found {len(progressions)} progression resources")
        return progressions[:5]  # Limit to top 5
    
    def contextual_recommendations(self, query: str):
        """Main function: Hybrid GraphRAG recommendations."""
        logger.info("🌟 Starting Hybrid GraphRAG Query...")
        print(f"\n🔍 Query: '{query}'")
        print("=" * 60)
        
        # Step 1: Semantic search
        initial_resources = self.semantic_search(query)
        
        if not initial_resources:
            print("❌ No relevant resources found")
            return
        
        print("\n📊 SEMANTIC SEARCH RESULTS:")
        for i, resource in enumerate(initial_resources, 1):
            similarity = round(resource['similarity'] * 100)
            print(f"{i}. {resource['title']} ({similarity}% match)")
            print(f"   Type: {resource['type']} | Path: {resource['path']}")
        
        # Step 2: Find conceptually related resources
        related_resources = self.find_related_by_concepts(initial_resources)
        
        if related_resources:
            print("\n🧠 CONCEPTUALLY RELATED RESOURCES:")
            for i, resource in enumerate(related_resources[:5], 1):
                print(f"{i}. {resource['title']}")
                print(f"   Connected through: {resource['related_through_concept']}")
                print(f"   Subject: {resource['subject_area']} | Cultural level: {resource['cultural_level']}")
        
        # Step 3: Find learning progressions
        progressions = self.find_learning_progressions(initial_resources)
        
        if progressions:
            print("\n📚 LEARNING PROGRESSION SUGGESTIONS:")
            for i, resource in enumerate(progressions, 1):
                print(f"{i}. {resource['title']}")
                print(f"   Progression: {resource['progression_type']}")
                print(f"   Difficulty: {resource['difficulty_level']}")
        
        # Summary
        total_recommendations = len(initial_resources) + len(related_resources) + len(progressions)
        print("\n🎯 SUMMARY:")
        print(f"   • {len(initial_resources)} semantically similar resources")
        print(f"   • {len(related_resources)} conceptually related resources")
        print(f"   • {len(progressions)} learning progression suggestions")
        print(f"   • {total_recommendations} total recommendations")
        
        return {
            'semantic_results': initial_resources,
            'related_resources': related_resources,
            'progressions': progressions,
            'total_count': total_recommendations
        }

def main():
    """Demonstrate the Hybrid GraphRAG system."""
    print("🌟 Te Kete Ako - Hybrid GraphRAG Demo")
    print("=" * 60)
    print("This demonstrates the power of combining:")
    print("• Semantic search (Phase 1) - finds similar content")
    print("• Knowledge graph (Phase 2) - finds related concepts")
    print("• Learning progressions - suggests next steps")
    print()
    
    # Initialize system
    try:
        hybrid_rag = HybridGraphRAG()
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
        results = hybrid_rag.contextual_recommendations(query)
        input("\nPress Enter to continue to next query...")
        print("\n" + "="*80 + "\n")
    
    print("🎉 Hybrid GraphRAG Demo Complete!")
    print("\nThis system provides:")
    print("• Intelligent content discovery beyond keyword matching")
    print("• Cultural context awareness") 
    print("• Learning pathway recommendations")
    print("• Cross-curricular connections")
    print("\nReady for full implementation with Neo4j!")

if __name__ == "__main__":
    main()