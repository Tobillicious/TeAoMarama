const { exec } = require('child_process');

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { resources, query } = JSON.parse(event.body);
        
        if (!resources || !Array.isArray(resources)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Resources array is required' })
            };
        }

        // Try Neo4j connection first, fall back to local graph
        const pythonScript = `
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    # Try Neo4j first
    from neo4j import GraphDatabase
    
    NEO4J_URI = os.getenv('NEO4J_URI')
    NEO4J_USERNAME = os.getenv('NEO4J_USERNAME') 
    NEO4J_PASSWORD = os.getenv('NEO4J_PASSWORD')
    
    if NEO4J_URI and NEO4J_USERNAME and NEO4J_PASSWORD:
        driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD))
        
        enhanced_resources = []
        resource_ids = [${resources.map(r => `"${r.id}"`).join(', ')}]
        
        with driver.session() as session:
            for resource_id in resource_ids:
                # Find related concepts
                result = session.run("""
                    MATCH (r:Resource {id: $resource_id})-[rel]->(c:Concept)
                    RETURN c.name as concept, rel.strength as strength
                    ORDER BY rel.strength DESC
                    LIMIT 5
                """, resource_id=resource_id)
                
                concepts = [{"name": record["concept"], "strength": record["strength"]} 
                           for record in result]
                
                # Find related resources through concepts
                related_result = session.run("""
                    MATCH (r1:Resource {id: $resource_id})-[:RELATES_TO]->(c:Concept)<-[:RELATES_TO]-(r2:Resource)
                    WHERE r1 <> r2
                    RETURN r2.id as related_id, r2.title as related_title, count(c) as shared_concepts
                    ORDER BY shared_concepts DESC
                    LIMIT 3
                """, resource_id=resource_id)
                
                related = [{"id": record["related_id"], "title": record["related_title"], 
                           "shared_concepts": record["shared_concepts"]} 
                          for record in related_result]
                
                enhanced_resources.append({
                    "resource_id": resource_id,
                    "concepts": concepts,
                    "related_resources": related
                })
        
        driver.close()
        print(json.dumps({"success": True, "enhanced_resources": enhanced_resources, "source": "neo4j"}))
    
    else:
        raise Exception("Neo4j credentials not found, using local fallback")
        
except Exception as neo4j_error:
    # Fall back to local knowledge graph
    try:
        from standalone_graphrag_demo import StandaloneGraphRAG
        
        system = StandaloneGraphRAG()
        enhanced_resources = []
        
        resource_ids = [${resources.map(r => `"${r.id}"`).join(', ')}]
        
        for resource_id in resource_ids:
            concepts = system.resource_concepts.get(resource_id, [])
            
            # Find related resources through shared concepts
            related_resources = []
            seen_ids = {resource_id}
            
            for concept in concepts[:3]:  # Top 3 concepts
                if concept in system.concept_resources:
                    for related_id in system.concept_resources[concept][:2]:  # Top 2 per concept
                        if related_id not in seen_ids:
                            related_info = next(
                                (r for r in system.knowledge_graph['resources'] if r['id'] == related_id),
                                None
                            )
                            if related_info:
                                related_resources.append({
                                    "id": related_id,
                                    "title": related_info['title'],
                                    "shared_concepts": 1
                                })
                                seen_ids.add(related_id)
            
            enhanced_resources.append({
                "resource_id": resource_id,
                "concepts": [{"name": c, "strength": 0.8} for c in concepts[:5]],
                "related_resources": related_resources[:3]
            })
        
        print(json.dumps({"success": True, "enhanced_resources": enhanced_resources, "source": "local_graph"}))
        
    except Exception as local_error:
        print(json.dumps({"error": f"Both Neo4j and local graph failed: {str(local_error)}"}))
`;

        return new Promise((resolve, reject) => {
            exec(`cd /Users/admin/Documents/te-kete-ako-clean && python3 -c "${pythonScript}"`, 
                { timeout: 30000 }, // 30 second timeout
                (error, stdout, stderr) => {
                    if (error) {
                        resolve({
                            statusCode: 500,
                            headers,
                            body: JSON.stringify({ 
                                error: 'Neo4j bridge failed',
                                message: error.message 
                            })
                        });
                        return;
                    }
                    
                    try {
                        const results = JSON.parse(stdout);
                        if (results.error) {
                            resolve({
                                statusCode: 500,
                                headers,
                                body: JSON.stringify({ 
                                    error: 'GraphRAG processing error',
                                    message: results.error 
                                })
                            });
                            return;
                        }
                        
                        resolve({
                            statusCode: 200,
                            headers,
                            body: JSON.stringify(results)
                        });
                    } catch (parseError) {
                        resolve({
                            statusCode: 500,
                            headers,
                            body: JSON.stringify({ 
                                error: 'Parse error in Neo4j bridge',
                                message: parseError.message 
                            })
                        });
                    }
                }
            );
        });

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message 
            })
        };
    }
};