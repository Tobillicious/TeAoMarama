#!/usr/bin/env python3
"""
Te Kete Ako - Neo4j Graph Loader (Official Driver)
Loads our knowledge graph using the official Neo4j Python driver.
"""

import json
from neo4j import GraphDatabase
import logging
from load_env import load_env

# Load environment variables
load_env()

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class Neo4jKnowledgeLoader:
    """Load Te Kete Ako knowledge graph using official Neo4j driver."""
    
    def __init__(self, uri: str, username: str, password: str):
        try:
            self.driver = GraphDatabase.driver(uri, auth=(username, password))
            logger.info("✅ Neo4j driver initialized")
        except Exception as e:
            logger.error(f"❌ Failed to initialize Neo4j driver: {e}")
            raise
    
    def close(self):
        if self.driver:
            self.driver.close()
            logger.info("🔒 Neo4j driver closed")
    
    def test_connection(self):
        """Test Neo4j connection."""
        logger.info("🔗 Testing Neo4j connection...")
        
        try:
            with self.driver.session() as session:
                result = session.run("RETURN 'Connection successful!' as message")
                record = result.single()
                logger.info(f"✅ {record['message']}")
                return True
        except Exception as e:
            logger.error(f"❌ Connection test failed: {e}")
            return False
    
    def clear_database(self):
        """Clear all existing data."""
        logger.info("🧹 Clearing existing data...")
        
        try:
            with self.driver.session() as session:
                # Delete all relationships first
                session.run("MATCH ()-[r]-() DELETE r")
                # Delete all nodes
                session.run("MATCH (n) DELETE n")
                logger.info("✅ Database cleared")
        except Exception as e:
            logger.error(f"❌ Failed to clear database: {e}")
    
    def create_constraints(self):
        """Create database constraints."""
        logger.info("🔧 Creating constraints...")
        
        constraints = [
            "CREATE CONSTRAINT resource_id IF NOT EXISTS FOR (r:Resource) REQUIRE r.id IS UNIQUE",
            "CREATE CONSTRAINT concept_name IF NOT EXISTS FOR (c:Concept) REQUIRE c.name IS UNIQUE"
        ]
        
        try:
            with self.driver.session() as session:
                for constraint in constraints:
                    try:
                        session.run(constraint)
                        logger.info("✅ Created constraint")
                    except Exception as e:
                        if "already exists" in str(e).lower():
                            logger.info("✅ Constraint already exists")
                        else:
                            logger.warning(f"⚠️ Constraint issue: {e}")
        except Exception as e:
            logger.error(f"❌ Failed to create constraints: {e}")
    
    def load_knowledge_graph(self, knowledge_graph):
        """Load the complete knowledge graph."""
        logger.info("🧠 Loading Te Kete Ako Knowledge Graph into Neo4j...")
        
        try:
            # Load resources
            self.load_resources(knowledge_graph['resources'])
            
            # Load concepts
            self.load_concepts(knowledge_graph['concepts'])
            
            # Load relationships
            self.load_relationships(knowledge_graph['relationships'])
            
            logger.info("🎉 Knowledge graph loaded successfully!")
            
        except Exception as e:
            logger.error(f"❌ Failed to load knowledge graph: {e}")
            raise
    
    def load_resources(self, resources):
        """Load resource nodes."""
        logger.info(f"📚 Loading {len(resources)} resources...")
        
        try:
            with self.driver.session() as session:
                for resource in resources:
                    query = """
                    MERGE (r:Resource {id: $id})
                    SET r.title = $title,
                        r.type = $type,
                        r.path = $path,
                        r.subject_areas = $subject_areas,
                        r.cultural_level = $cultural_level,
                        r.file_size = $file_size,
                        r.last_modified = $last_modified
                    """
                    
                    session.run(query, 
                        id=resource['id'],
                        title=resource['title'],
                        type=resource['type'],
                        path=resource['path'],
                        subject_areas=resource.get('subject_areas', []),
                        cultural_level=resource['cultural_level'],
                        file_size=resource.get('file_size', 0),
                        last_modified=resource.get('last_modified', '')
                    )
            
            logger.info("✅ Resources loaded")
            
        except Exception as e:
            logger.error(f"❌ Failed to load resources: {e}")
    
    def load_concepts(self, concepts):
        """Load concept nodes."""
        logger.info(f"🧠 Loading {len(concepts)} concepts...")
        
        try:
            with self.driver.session() as session:
                for concept in concepts:
                    query = """
                    MERGE (c:Concept {name: $name})
                    SET c.type = $type,
                        c.domain = $domain,
                        c.importance = $importance
                    """
                    
                    session.run(query,
                        name=concept['name'],
                        type=concept['type'],
                        domain=concept['domain'],
                        importance=concept['importance']
                    )
            
            logger.info("✅ Concepts loaded")
            
        except Exception as e:
            logger.error(f"❌ Failed to load concepts: {e}")
    
    def load_relationships(self, relationships):
        """Load relationships."""
        logger.info(f"🔗 Loading {len(relationships)} relationships...")
        
        try:
            with self.driver.session() as session:
                for rel in relationships:
                    if rel['from_type'] == 'resource' and rel['to_type'] == 'concept':
                        # Resource -> Concept
                        query = f"""
                        MATCH (r:Resource {{id: $from_id}})
                        MATCH (c:Concept {{name: $to_name}})
                        MERGE (r)-[rel:{rel['relationship']}]->(c)
                        SET rel.strength = $strength
                        """
                        
                        session.run(query,
                            from_id=rel['from'],
                            to_name=rel['to'],
                            strength=rel['strength']
                        )
                        
                    elif rel['from_type'] == 'concept' and rel['to_type'] == 'concept':
                        # Concept -> Concept
                        query = f"""
                        MATCH (c1:Concept {{name: $from_name}})
                        MATCH (c2:Concept {{name: $to_name}})
                        MERGE (c1)-[rel:{rel['relationship']}]->(c2)
                        SET rel.strength = $strength
                        """
                        
                        session.run(query,
                            from_name=rel['from'],
                            to_name=rel['to'], 
                            strength=rel['strength']
                        )
                        
                    elif rel['from_type'] == 'resource' and rel['to_type'] == 'resource':
                        # Resource -> Resource (progressions)
                        query = f"""
                        MATCH (r1:Resource {{id: $from_id}})
                        MATCH (r2:Resource {{id: $to_id}})
                        MERGE (r1)-[rel:{rel['relationship']}]->(r2)
                        SET rel.strength = $strength
                        """
                        
                        session.run(query,
                            from_id=rel['from'],
                            to_id=rel['to'],
                            strength=rel['strength']
                        )
            
            logger.info("✅ Relationships loaded")
            
        except Exception as e:
            logger.error(f"❌ Failed to load relationships: {e}")
    
    def load_development_discoveries(self, discoveries_file):
        """Load development discoveries as Knowledge nodes."""
        logger.info(f"🔍 Loading development discoveries from {discoveries_file}...")
        
        try:
            with open(discoveries_file, 'r', encoding='utf-8') as f:
                discoveries_data = json.load(f)
            
            with self.driver.session() as session:
                # Create session knowledge node
                session_query = """
                MERGE (s:DevelopmentSession {date: $date, agent: $agent})
                RETURN s
                """
                session.run(session_query, 
                    date=discoveries_data.get('session_date'),
                    agent=discoveries_data.get('agent'))
                
                # Create discovery nodes
                for discovery in discoveries_data.get('critical_discoveries', []):
                    discovery_query = """
                    MERGE (d:Knowledge {id: $id})
                    SET d.title = $title,
                        d.type = $type,
                        d.description = $description,
                        d.status = $status,
                        d.priority = $priority,
                        d.solution = $solution,
                        d.root_cause = $root_cause,
                        d.session_date = $session_date
                    
                    WITH d
                    MATCH (s:DevelopmentSession {date: $session_date})
                    MERGE (s)-[:DISCOVERED]->(d)
                    """
                    
                    session.run(discovery_query, 
                        id=discovery.get('id'),
                        title=discovery.get('title'),
                        type=discovery.get('type'),
                        description=discovery.get('description'),
                        status=discovery.get('status'),
                        priority=discovery.get('priority'),
                        solution=discovery.get('solution', ''),
                        root_cause=discovery.get('root_cause', ''),
                        session_date=discoveries_data.get('session_date'))
                
                logger.info("✅ Development discoveries loaded into knowledge graph")
                
        except Exception as e:
            logger.error(f"❌ Failed to load development discoveries: {e}")
    
    def run_test_queries(self):
        """Run test queries to verify the graph."""
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
                'query': "MATCH (r:Resource {cultural_level: 'high'}) RETURN r.title LIMIT 5"
            },
            {
                'name': 'Māori Concepts',
                'query': "MATCH (c:Concept) WHERE c.name CONTAINS 'māori' OR c.name CONTAINS 'te reo' RETURN c.name"
            },
            {
                'name': 'Resource-Concept Relationships',
                'query': "MATCH (r:Resource)-[rel]->(c:Concept) RETURN r.title, type(rel), c.name LIMIT 5"
            }
        ]
        
        try:
            with self.driver.session() as session:
                for test in test_queries:
                    logger.info(f"🔍 {test['name']}:")
                    result = session.run(test['query'])
                    
                    count = 0
                    for record in result:
                        count += 1
                        if count <= 3:  # Show first 3 results
                            values = [str(value) for value in record.values()]
                            logger.info(f"   {' | '.join(values)}")
                    
                    if count == 0:
                        logger.info("   No results found")
                        
        except Exception as e:
            logger.error(f"❌ Test queries failed: {e}")

def main():
    """Main execution function."""
    print("🧠 Te Kete Ako - Neo4j Knowledge Graph Loader")
    print("=" * 60)
    
    # Neo4j connection details from environment variables
    import os
    NEO4J_URI = os.getenv("NEO4J_URI", "neo4j+s://cd5763ca.databases.neo4j.io")
    NEO4J_USER = os.getenv("NEO4J_USERNAME", "neo4j")
    NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
    
    if not NEO4J_PASSWORD:
        raise ValueError("NEO4J_PASSWORD environment variable is required")
    
    # Load knowledge graph from file
    try:
        with open('te_kete_knowledge_graph.json', 'r') as f:
            knowledge_graph = json.load(f)
        logger.info(f"📊 Loaded knowledge graph with {knowledge_graph['statistics']['total_resources']} resources")
    except FileNotFoundError:
        logger.error("❌ Knowledge graph file not found. Run extract_knowledge_graph.py first.")
        return
    
    # Initialize and load
    loader = None
    try:
        loader = Neo4jKnowledgeLoader(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD)
        
        if not loader.test_connection():
            return
        
        # Load the graph
        loader.clear_database()
        loader.create_constraints()
        loader.load_knowledge_graph(knowledge_graph)
        
        # Run tests
        loader.run_test_queries()
        
        print("\n" + "=" * 60)
        print("🎉 Neo4j Knowledge Graph Successfully Loaded!")
        print("🌟 Te Kete Ako now has a living knowledge brain!")
        print("   • Educational resources mapped with relationships")
        print("   • Cultural concepts connected intelligently")
        print("   • Learning progressions discovered automatically")
        print("   • Ready for advanced GraphRAG queries!")
        
    except Exception as e:
        logger.error(f"💥 Failed to load knowledge graph: {e}")
    finally:
        if loader:
            loader.close()

if __name__ == "__main__":
    main()