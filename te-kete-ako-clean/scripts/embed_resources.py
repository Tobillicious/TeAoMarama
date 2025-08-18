#!/usr/bin/env python3
"""
Te Kete Ako - GraphRAG Phase 1: Resource Embedding Generation
Creates vector embeddings for all educational resources to enable semantic search.
"""

import sys
import os
from supabase import create_client, Client
from sentence_transformers import SentenceTransformer
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Supabase configuration - SECURE: Using environment variables
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    logger.error("❌ Missing required environment variables. Please check your .env file.")
    logger.error("Required: SUPABASE_URL, SUPABASE_ANON_KEY")
    sys.exit(1)

def create_embeddings():
    """Generate and store embeddings for all educational resources."""
    
    logger.info("🚀 Starting Te Kete Ako Resource Embedding Process...")
    
    # Initialize Supabase client
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        logger.info("✅ Connected to Supabase")
    except Exception as e:
        logger.error(f"❌ Failed to connect to Supabase: {e}")
        return False
    
    # Load the embedding model
    try:
        logger.info("📥 Loading sentence-transformers model...")
        model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        logger.info("✅ Model loaded successfully")
    except Exception as e:
        logger.error(f"❌ Failed to load model: {e}")
        return False
    
    # Fetch all resources
    try:
        logger.info("📚 Fetching all educational resources...")
        response = supabase.table('resources').select('id, title, description, type, path').execute()
        
        if not response.data:
            logger.warning("⚠️ No resources found in database")
            return False
            
        resources = response.data
        logger.info(f"📊 Found {len(resources)} resources to process")
        
    except Exception as e:
        logger.error(f"❌ Failed to fetch resources: {e}")
        return False
    
    # Process each resource
    success_count = 0
    error_count = 0
    
    for i, resource in enumerate(resources, 1):
        try:
            resource_id = resource['id']
            title = resource.get('title', '')
            description = resource.get('description', '')
            resource_type = resource.get('type', '')
            path = resource.get('path', '')
            
            # Create comprehensive text for embedding
            # Combine title, description, type, and path for rich semantic understanding
            content_parts = [
                f"Title: {title}",
                f"Description: {description}",
                f"Type: {resource_type}",
                f"Subject area: {extract_subject_from_path(path)}"
            ]
            
            # Add cultural context markers
            cultural_markers = extract_cultural_markers(title, description)
            if cultural_markers:
                content_parts.append(f"Cultural elements: {cultural_markers}")
            
            content_text = " | ".join(filter(None, content_parts))
            
            logger.info(f"🔄 Processing ({i}/{len(resources)}): {title[:50]}...")
            
            # Generate embedding
            embedding = model.encode(content_text).tolist()
            
            # Check if embedding already exists
            existing = supabase.table('resource_embeddings').select('id').eq('resource_id', resource_id).execute()
            
            if existing.data:
                # Update existing embedding
                result = supabase.table('resource_embeddings').update({
                    'embedding': embedding
                }).eq('resource_id', resource_id).execute()
                logger.info(f"🔄 Updated embedding for: {title[:30]}")
            else:
                # Insert new embedding
                result = supabase.table('resource_embeddings').insert({
                    'resource_id': resource_id,
                    'embedding': embedding
                }).execute()
                logger.info(f"✅ Created embedding for: {title[:30]}")
            
            success_count += 1
            
        except Exception as e:
            logger.error(f"❌ Error processing resource {resource.get('title', 'Unknown')}: {e}")
            error_count += 1
            continue
    
    # Final report
    logger.info("=" * 60)
    logger.info("🎉 Embedding Generation Complete!")
    logger.info(f"✅ Successfully processed: {success_count} resources")
    logger.info(f"❌ Errors encountered: {error_count} resources")
    logger.info(f"📊 Total resources: {len(resources)}")
    logger.info("=" * 60)
    
    return error_count == 0

def extract_subject_from_path(path):
    """Extract subject area from file path for better categorization."""
    if not path:
        return ""
    
    path_lower = path.lower()
    
    # Map path patterns to subjects
    subject_mappings = {
        'te-reo': 'Te Reo Māori',
        'maori': 'Te Ao Māori',
        'haka': 'Cultural Studies',
        'treaty': 'New Zealand History',
        'waitangi': 'New Zealand History',
        'writers-toolkit': 'English Writing',
        'peel': 'English Writing',
        'math': 'Mathematics',
        'science': 'Science',
        'social': 'Social Studies',
        'y8-systems': 'Social Studies Systems',
        'games': 'Interactive Learning',
        'handouts': 'Learning Resources'
    }
    
    for keyword, subject in subject_mappings.items():
        if keyword in path_lower:
            return subject
    
    return "General Education"

def extract_cultural_markers(title, description):
    """Identify cultural elements for enhanced semantic understanding."""
    text = f"{title} {description}".lower()
    
    cultural_keywords = [
        'māori', 'maori', 'te reo', 'whakapapa', 'haka', 'marae', 'iwi',
        'tangata whenua', 'tino rangatiratanga', 'kaitiakitanga', 'manaakitanga',
        'treaty of waitangi', 'te tiriti', 'cultural', 'indigenous', 'traditional',
        'karakia', 'hongi', 'powhiri', 'whakataukī'
    ]
    
    found_markers = [keyword for keyword in cultural_keywords if keyword in text]
    return ", ".join(found_markers) if found_markers else ""

if __name__ == "__main__":
    print("🌟 Te Kete Ako - GraphRAG Phase 1: Resource Embeddings")
    print("=" * 60)
    
    # Check dependencies
    try:
        import sentence_transformers
        import supabase
        print("✅ All dependencies available")
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Please install: pip install sentence-transformers supabase")
        sys.exit(1)
    
    # Run embedding generation
    success = create_embeddings()
    
    if success:
        print("🎉 GraphRAG Phase 1 foundation complete!")
        print("Next steps:")
        print("1. Create the match_resources SQL function")
        print("2. Build the find-similar-resources Edge Function")
        print("3. Implement frontend semantic search")
    else:
        print("❌ Embedding generation failed. Check logs above.")
        sys.exit(1)