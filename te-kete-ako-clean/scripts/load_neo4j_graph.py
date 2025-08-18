#!/usr/bin/env python3
from load_env import load_env
load_env()
"""
Te Kete Ako - GraphRAG Phase 2: Neo4j Graph Database Loader
Loads the extracted knowledge graph into Neo4j for relationship-based queries.
"""

import json
import requests
import base64
import logging
from typing import Dict, List

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class Neo4jGraphLoader:
    """Load Te Kete Ako knowledge graph into Neo4j database."""
    
    def __init__(self, uri: str, username: str, password: str):
        self.uri = uri.replace('neo4j+s://', 'https://').replace(':7687', ':7473')
        self.username = username  
        self.password = password
        self.auth_header = base64.b64encode(f"{username}:{password}".encode()).decode()
        
    def execute_cypher(self, query: str, parameters: Dict = None) -> Dict:
        """Execute a Cypher query via HTTP API."""
        if parameters is None:
            parameters = {}
            
        payload = {
            "statements": [{
                "statement": query,
                "parameters": parameters
            }]
        }
        
        headers = {
            'Authorization': f'Basic {self.auth_header}',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        try:
            response = requests.post(
                f"{self.uri}/db/data/transaction/commit",
                json=payload,
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                if result.get('errors'):
                    logger.error(f"Neo4j errors: {result['errors']}")
                    return {'success': False, 'errors': result['errors']}
                return {'success': True, 'data': result.get('results', [])}
            else:
                logger.error(f"HTTP error: {response.status_code} - {response.text}")
                return {'success': False, 'error': f"HTTP {response.status_code}"}
                
        except Exception as e:
            logger.error(f"Request failed: {e}")
            return {'success': False, 'error': str(e)}
    
    def test_connection(self) -> bool:
        """Test the Neo4j connection."""
        logger.info("🔗 Testing Neo4j connection...")
        
        result = self.execute_cypher("RETURN 1 as test")
        if result['success']:
            logger.info("✅ Neo4j connection successful!")
            return True
        else:
            logger.error(f"❌ Neo4j connection failed: {result.get('error', 'Unknown error')}")
            return False
    
    def clear_database(self):
        """Clear all existing data (for clean start)."""
        logger.info("🧹 Clearing existing graph data...")
        
        # Delete all relationships first
        result = self.execute_cypher("MATCH ()-[r]-() DELETE r")
        if result['success']:
            logger.info("✅ Cleared all relationships")
        
        # Delete all nodes
        result = self.execute_cypher("MATCH (n) DELETE n")
        if result['success']:
            logger.info("✅ Cleared all nodes")
    
    def create_constraints(self):
        """Create database constraints for performance."""
        logger.info("🔧 Creating database constraints...")
        
        constraints = [
            "CREATE CONSTRAINT resource_id IF NOT EXISTS FOR (r:Resource) REQUIRE r.id IS UNIQUE",
            "CREATE CONSTRAINT concept_name IF NOT EXISTS FOR (c:Concept) REQUIRE c.name IS UNIQUE",
        ]
        
        for constraint in constraints:
            result = self.execute_cypher(constraint)
            if result['success']:
                logger.info(f"✅ Created constraint: {constraint.split('FOR')[1].split('REQUIRE')[0].strip()}")
            else:
                logger.warning(f"⚠️ Constraint may already exist: {constraint}")
    
    def load_knowledge_graph(self, knowledge_graph: Dict):
        """Load the complete knowledge graph into Neo4j."""
        logger.info("🧠 Loading Te Kete Ako Knowledge Graph into Neo4j...")
        
        # Load resources as nodes
        self.load_resources(knowledge_graph['resources'])
        
        # Load concepts as nodes  
        self.load_concepts(knowledge_graph['concepts'])
        
        # Load relationships
        self.load_relationships(knowledge_graph['relationships'])
        
        logger.info("🎉 Knowledge graph loading complete!")
    
    def load_resources(self, resources: List[Dict]):
        """Load resource nodes into Neo4j."""
        logger.info(f"📚 Loading {len(resources)} resource nodes...")
        
        for resource in resources:
            query = """
            MERGE (r:Resource {id: $id})
            SET r.title = $title,
                r.type = $type,
                r.path = $path,
                r.subject_area = $subject_area,
                r.cultural_level = $cultural_level,
                r.difficulty_level = $difficulty_level
            """
            
            result = self.execute_cypher(query, resource)
            if not result['success']:
                logger.error(f"❌ Failed to load resource: {resource['title']}")
        
        logger.info("✅ Resource nodes loaded")
    
    def load_concepts(self, concepts: List[Dict]):
        """Load concept nodes into Neo4j."""
        logger.info(f"🧠 Loading {len(concepts)} concept nodes...")
        
        for concept in concepts:
            query = """
            MERGE (c:Concept {name: $name})
            SET c.type = $type,
                c.domain = $domain,
                c.importance = $importance
            """
            
            result = self.execute_cypher(query, concept)
            if not result['success']:
                logger.error(f"❌ Failed to load concept: {concept['name']}")
        
        logger.info("✅ Concept nodes loaded")
    
    def load_relationships(self, relationships: List[Dict]):
        """Load relationships into Neo4j."""
        logger.info(f"🔗 Loading {len(relationships)} relationships...")
        
        for rel in relationships:
            if rel['from_type'] == 'resource' and rel['to_type'] == 'concept':
                # Resource -> Concept relationship
                query = f"""
                MATCH (r:Resource {{id: $from_id}})
                MATCH (c:Concept {{name: $to_name}})
                MERGE (r)-[rel:{rel['relationship_type']}]->(c)
                SET rel.strength = $strength
                """
                
                params = {
                    'from_id': rel['from_id'],
                    'to_name': rel['to_name'],
                    'strength': rel['strength']
                }
                
            elif rel['from_type'] == 'concept' and rel['to_type'] == 'concept':
                # Concept -> Concept relationship
                query = f"""
                MATCH (c1:Concept {{name: $from_name}})
                MATCH (c2:Concept {{name: $to_name}})
                MERGE (c1)-[rel:{rel['relationship_type']}]->(c2)
                SET rel.strength = $strength
                """
                
                params = {
                    'from_name': rel['from_name'],
                    'to_name': rel['to_name'],
                    'strength': rel['strength']
                }
                
            elif rel['from_type'] == 'resource' and rel['to_type'] == 'resource':
                # Resource -> Resource relationship (learning progressions)
                query = f"""
                MATCH (r1:Resource {{id: $from_id}})
                MATCH (r2:Resource {{id: $to_id}})
                MERGE (r1)-[rel:{rel['relationship_type']}]->(r2)
                SET rel.strength = $strength
                """
                
                params = {
                    'from_id': rel['from_id'],
                    'to_id': rel['to_id'],
                    'strength': rel['strength']
                }
            else:
                continue
            
            result = self.execute_cypher(query, params)
            if not result['success']:
                logger.error(f"❌ Failed to create relationship: {rel}")
        
        logger.info("✅ Relationships loaded")
    
    def run_test_queries(self):
        """Run test queries to verify the graph is working."""
        logger.info("🧪 Running test queries...")
        
        test_queries = [
            {
                'name': 'Total Resources',
                'query': 'MATCH (r:Resource) RETURN count(r) as total'
            },
            {
                'name': 'Total Concepts', 
                'query': 'MATCH (c:Concept) RETURN count(c) as total'
            },
            {
                'name': 'Cultural Resources',
                'query': "MATCH (r:Resource {cultural_level: 'high'}) RETURN r.title as title LIMIT 5"
            },
            {
                'name': 'Y8 Systems Lessons',
                'query': "MATCH (r:Resource) WHERE r.subject_area = 'Social Studies' RETURN r.title as title LIMIT 5"
            },
            {
                'name': 'Concept Relationships',
                'query': "MATCH (c1:Concept)-[r]->(c2:Concept) RETURN c1.name, type(r), c2.name LIMIT 5"
            },
            {
                'name': 'Te Reo Learning Path',
                'query': """
                MATCH (r:Resource)-[:TEACHES|CONTAINS]->(c:Concept {name: 'te reo māori'})
                RETURN r.title as resource, r.type as type
                """
            }
        ]
        
        for test in test_queries:
            logger.info(f"🔍 {test['name']}:")
            result = self.execute_cypher(test['query'])
            
            if result['success'] and result['data']:
                data = result['data'][0].get('data', [])
                for row in data[:3]:  # Show first 3 results
                    logger.info(f"   {row['row']}")
            else:
                logger.warning("   No results or query failed")

def main():
    """Main execution function."""
    print("🧠 Te Kete Ako - Neo4j Graph Database Loader")
    print("=" * 60)
    
    # Neo4j AuraDB connection details - SECURE: Using environment variables
    NEO4J_URI = os.getenv("NEO4J_URI", "neo4j+s://your-instance.databases.neo4j.io")
    NEO4J_USER = os.getenv("NEO4J_USERNAME", "neo4j") 
    import os
    NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
    if not NEO4J_PASSWORD:
        raise ValueError("NEO4J_PASSWORD environment variable is required")
    
    if "your-instance" in NEO4J_URI:
        print("⚠️  Neo4j credentials not configured!")
        print("To complete Phase 2:")
        print("1. Sign up for free Neo4j AuraDB at: https://neo4j.com/cloud/aura/")
        print("2. Create a new database instance") 
        print("3. Update the credentials in this script")
        print("4. Re-run this script to load the knowledge graph")
        print()
        print("📊 Knowledge Graph Ready to Load:")
        
        # Show what we would load
        with open('te_kete_knowledge_graph.json', 'r') as f:
            kg = json.load(f)
            stats = kg['statistics']
            print(f"   • {stats['total_resources']} educational resources")
            print(f"   • {stats['total_concepts']} key concepts identified")
            print(f"   • {stats['total_relationships']} relationships mapped")
            print(f"   • {stats['cultural_resources']} culturally integrated resources")
        
        return
    
    # Load existing knowledge graph
    try:
        with open('te_kete_knowledge_graph.json', 'r') as f:
            knowledge_graph = json.load(f)
    except FileNotFoundError:
        logger.error("❌ Knowledge graph file not found. Run extract_knowledge_graph.py first.")
        return
    
    # Initialize Neo4j loader
    loader = Neo4jGraphLoader(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD)
    
    # Test connection
    if not loader.test_connection():
        return
    
    # Load the graph
    loader.clear_database()
    loader.create_constraints()
    loader.load_knowledge_graph(knowledge_graph)
    
    # Run tests
    loader.run_test_queries()
    
    print("\n" + "=" * 60)
    print("🎉 Neo4j Graph Database Ready!")
    print("Next steps:")
    print("1. Test complex graph queries")
    print("2. Move to GraphRAG Phase 3 (Hybrid System)")

if __name__ == "__main__":
    main()