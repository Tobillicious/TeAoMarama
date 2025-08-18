#!/usr/bin/env python3
"""
GraphRAG Query Script - Interface between Netlify functions and Python GraphRAG
"""

import json
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'Query parameter is required', 'success': False}))
        return
    
    query = sys.argv[1]
    match_threshold = float(sys.argv[2]) if len(sys.argv) > 2 else 0.3
    match_count = int(sys.argv[3]) if len(sys.argv) > 3 else 10

    try:
        # Try Supabase semantic search first
        try:
            from supabase import create_client
            from sentence_transformers import SentenceTransformer
            
            SUPABASE_URL = os.getenv('SUPABASE_URL')
            SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY')
            
            if SUPABASE_URL and SUPABASE_KEY:
                supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
                model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
                
                embedding = model.encode(query).tolist()
                result = supabase.rpc('match_resources', {
                    'query_embedding': embedding,
                    'match_threshold': match_threshold,
                    'match_count': match_count
                }).execute()
                
                if result.data:
                    print(json.dumps({
                        'success': True,
                        'results': result.data,
                        'source': 'supabase_semantic',
                        'count': len(result.data)
                    }))
                    return
        except Exception as supabase_error:
            # Fall through to local graph
            pass
        
        # Fall back to local knowledge graph
        from standalone_graphrag_demo import StandaloneGraphRAG
        import logging
        
        # Suppress logging output to avoid JSON parsing issues
        logging.getLogger().setLevel(logging.ERROR)
        
        system = StandaloneGraphRAG()
        
        # Capture the results without the interactive display
        import io
        import contextlib
        
        f = io.StringIO()
        with contextlib.redirect_stdout(f):
            results = system.contextual_recommendations(query)
        
        # Handle case where results is None
        if results is None:
            results = {'keyword_results': [], 'related_resources': []}
        
        # Format results to match Supabase structure
        formatted_results = []
        
        # Add keyword results
        for result in results.get('keyword_results', []):
            formatted_results.append({
                'id': result.get('id', result.get('path', 'unknown')),
                'title': result.get('title', 'Unknown Resource'),
                'type': result.get('type', 'resource'),
                'path': result.get('path', result.get('id', 'unknown')),
                'similarity': result.get('similarity', 0.0),
                'cultural_level': result.get('cultural_level', 'unknown'), 
                'subject_areas': result.get('subject_areas', [])
            })
        
        # Add related resources  
        remaining_slots = max(0, match_count - len(formatted_results))
        for result in results.get('related_resources', [])[:remaining_slots]:
            formatted_results.append({
                'id': result['id'],
                'title': result['title'],
                'type': result['type'],
                'path': result['path'],
                'similarity': result['connection_strength'],
                'cultural_level': result.get('cultural_level', 'unknown'),
                'subject_areas': result.get('subject_areas', []),
                'related_through': result.get('related_through_concept', '')
            })
        
        print(json.dumps({
            'success': True,
            'results': formatted_results[:match_count],
            'source': 'local_knowledge_graph',
            'count': len(formatted_results[:match_count])
        }))
        
    except Exception as e:
        print(json.dumps({'error': str(e), 'success': False}))

if __name__ == "__main__":
    main()