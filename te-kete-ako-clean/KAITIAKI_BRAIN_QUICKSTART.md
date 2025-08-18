# 🧠 Kaitiaki Aronui Brain - Quick Start Guide

## What is this?
The Kaitiaki Aronui Brain is a comprehensive AI system that transforms Te Kete Ako into an intelligent, culturally-aware educational platform. It consists of:

- **🧠 Cortex (Extractor)**: Processes content and extracts structured knowledge
- **🧠 Hippocampus (Memory)**: Indexes and remembers all created artifacts
- **🧠 Cerebellum (Coordination)**: Orchestrates complex document processing workflows
- **🧠 Brain Stem (Database)**: Stores knowledge graphs and relationships

## Quick Commands

### 1. Start the Brain System
```bash
# Start the extractor service
npm run brain:extractor

# Index your entire project (run once)  
npm run brain:index-all

# Process a PDF document
npm run brain:ingest path/to/document.pdf "Document Title"
```

### 2. Environment Setup
1. Copy `.env.example` to `.env`
2. Add your Supabase URL and service key
3. Add your DeepSeek API key: `sk-103cb83572a346e2aef89e2d2a4f7f89`
4. Optionally add OpenAI API key for better embeddings

### 3. Database Setup
Run this SQL in your Supabase SQL editor:
```sql
-- Execute the brain migration
\i migrations/20250810_kaitiaki_aronui_brain.sql
```

### 4. Test the System
```bash
# Health check
curl http://localhost:3001/health

# Test extraction
curl -X POST http://localhost:3001/extract \
  -H "Content-Type: application/json" \
  -d '{"chunkText":"This is a test lesson about fractions for Year 8 students..."}'

# Index current directory
npm run brain:indexer .
```

## Architecture Overview

```
📁 Kaitiaki Aronui Brain System
├── 🧠 src/brain/
│   ├── extractor/kaitiaki-cortex.ts     # Content → Knowledge extraction
│   ├── indexer/kaitiaki-memory.ts       # File cataloging & memory
│   ├── ingest/kaitiaki-cerebellum.ts    # PDF processing coordination
│   └── critic/                          # Quality assurance (future)
├── 📊 migrations/
│   └── 20250810_kaitiaki_aronui_brain.sql # Database schema
└── 🎯 Your existing te-kete-ako files...
```

## What Each Component Does

### Cortex (kaitiaki-cortex.ts)
- Runs as HTTP service on port 3001
- Takes text chunks and extracts structured knowledge
- Understands NZ Curriculum alignment
- Performs cultural safety checks
- Returns nodes (concepts) and edges (relationships)

### Memory (kaitiaki-memory.ts)
- Scans all files in your project
- Extracts metadata, keywords, cultural tags
- Creates searchable index in Supabase
- Detects duplicates and calculates quality scores
- Generates embeddings for semantic search

### Cerebellum (kaitiaki-cerebellum.ts)
- Processes whole PDF documents
- Chunks content intelligently
- Coordinates with Cortex for extraction
- Stores results in knowledge graph
- Provides batch processing capabilities

## Next Steps
1. Run the database migration
2. Configure your .env file
3. Start with `npm run brain:extractor`
4. Test with a small PDF using `npm run brain:ingest`
5. Explore the knowledge graph in Supabase

## Troubleshooting
- Check logs for detailed error messages
- Ensure all environment variables are set
- Verify Supabase connection with health check
- Test DeepSeek API key with simple curl request

🧺 "Whaowhia te kete mātauranga" - Fill the basket of knowledge!
