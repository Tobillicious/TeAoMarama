#!/usr/bin/env python3
"""
Update GraphRAG with Development Discoveries
Integrates session learning into the persistent knowledge base.
"""

import sys
from neo4j_loader_official import Neo4jKnowledgeLoader
from load_env import load_env

# Load environment variables
load_env()

def update_development_knowledge():
    """Update GraphRAG with our development discoveries."""
    print("🧠 Updating GraphRAG with development discoveries...")
    
    # Neo4j connection details from environment variables
    import os
    uri = os.getenv("NEO4J_URI", "neo4j+s://cd5763ca.databases.neo4j.io")
    username = os.getenv("NEO4J_USERNAME", "neo4j") 
    password = os.getenv("NEO4J_PASSWORD")
    
    if not password:
        raise ValueError("NEO4J_PASSWORD environment variable is required")
    
    loader = None
    try:
        # Initialize loader
        loader = Neo4jKnowledgeLoader(uri, username, password)
        
        # Test connection
        if not loader.test_connection():
            print("❌ Failed to connect to Neo4j")
            return False
        
        # Load our development discoveries from multiple sessions
        loader.load_development_discoveries('development_knowledge_updates.json')
        
        # Load session 2 discoveries if exists
        try:
            loader.load_development_discoveries('development_knowledge_updates_session2.json')
            print("✅ Session 2 discoveries loaded")
        except FileNotFoundError:
            print("ℹ️ No session 2 discoveries file found")
        
        # Load Gemini's audit discoveries
        try:
            loader.load_development_discoveries('gemini_audit_discoveries.json')
            print("✅ Gemini audit discoveries loaded")
        except FileNotFoundError:
            print("ℹ️ No Gemini audit discoveries file found")
        
        # Load session 3 discoveries
        try:
            loader.load_development_discoveries('development_knowledge_updates_session3.json')
            print("✅ Session 3 discoveries loaded")
        except FileNotFoundError:
            print("ℹ️ No session 3 discoveries file found")
        
        # Test that our knowledge was added
        print("\n🔍 Verifying knowledge integration...")
        with loader.driver.session() as session:
            # Check development sessions
            result = session.run("MATCH (s:DevelopmentSession) RETURN count(s) as sessions")
            session_count = result.single()['sessions']
            print(f"📅 Development sessions: {session_count}")
            
            # Check knowledge discoveries
            result = session.run("MATCH (k:Knowledge) RETURN count(k) as discoveries")
            discovery_count = result.single()['discoveries']
            print(f"🔍 Knowledge discoveries: {discovery_count}")
            
            # Show recent discoveries
            result = session.run("""
                MATCH (k:Knowledge) 
                WHERE k.session_date = '2025-07-30'
                RETURN k.title as title, k.status as status, k.priority as priority
                ORDER BY k.priority DESC
            """)
            
            print("\n📋 Today's discoveries added to GraphRAG:")
            for record in result:
                status = record.get('status', 'unknown')
                title = record.get('title', 'Unknown')
                priority = record.get('priority', 'unknown')
                status_emoji = "✅" if status == 'resolved' else "⚠️" if status == 'identified' else "🔄"
                print(f"  {status_emoji} {title} ({priority} priority)")
        
        print("\n🎉 GraphRAG knowledge base successfully updated!")
        return True
        
    except Exception as e:
        print(f"❌ Error updating GraphRAG: {e}")
        return False
        
    finally:
        if loader:
            loader.close()

if __name__ == "__main__":
    success = update_development_knowledge()
    sys.exit(0 if success else 1)