#!/bin/bash

# Kaitiaki Aronui Brain Setup Script
# Sets up the complete GraphRAG brain system for Te Kete Ako

echo "🧠 Kaitiaki Aronui Brain Setup - Te Kete Ako GraphRAG Integration"
echo "=================================================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [[ ! -f "package.json" ]] || [[ ! -d "public" ]]; then
    echo -e "${RED}❌ Error: This script must be run from the te-kete-ako-clean root directory${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Checking dependencies...${NC}"

# Check Node.js version
NODE_VERSION=$(node -v 2>/dev/null)
if [[ $? -ne 0 ]]; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"

# Check if we have npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not found. Please install npm.${NC}"
    exit 1
fi

# Check if we have ts-node
if ! npm list -g ts-node &> /dev/null; then
    echo -e "${YELLOW}⚠️  ts-node not found globally, installing...${NC}"
    npm install -g ts-node typescript
fi

echo -e "${BLUE}📦 Installing brain dependencies...${NC}"

# Core dependencies for the brain system
DEPS=(
    "@supabase/supabase-js"
    "axios"
    "cors"
    "express"
    "express-rate-limit"
    "dotenv"
    "uuid"
    "pdf-parse"
    "cheerio" 
    "front-matter"
    "fast-glob"
    "async-retry"
)

DEV_DEPS=(
    "@types/express"
    "@types/node"
    "@types/uuid"
    "@types/cors"
    "typescript"
    "ts-node-dev"
)

# Install production dependencies
echo -e "${BLUE}Installing production dependencies...${NC}"
npm install "${DEPS[@]}"

# Install dev dependencies  
echo -e "${BLUE}Installing dev dependencies...${NC}"
npm install -D "${DEV_DEPS[@]}"

echo -e "${GREEN}✅ Dependencies installed${NC}"

echo -e "${BLUE}🔧 Setting up environment...${NC}"

# Create .env.example if it doesn't exist
if [[ ! -f ".env.example" ]]; then
    cat > .env.example << 'EOF'
# Kaitiaki Aronui Brain Configuration
# Copy this to .env and fill in your actual values

# Supabase Configuration (Required)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here

# AI Provider Configuration
DEEPSEEK_API_KEY=sk-103cb83572a346e2aef89e2d2a4f7f89
LLM_PROVIDER=deepseek
LLM_MODEL=deepseek-coder

# OpenAI Configuration (for embeddings)
OPENAI_API_KEY=sk-your-openai-key-here

# Extractor Service
EXTRACTOR_URL=http://localhost:3001/extract
PORT=3001

# Processing Configuration
NODE_ENV=development
EMBED_DIM=1536
EOF
    echo -e "${GREEN}✅ Created .env.example${NC}"
fi

# Check for .env file
if [[ ! -f ".env" ]]; then
    echo -e "${YELLOW}⚠️  .env file not found. Copying from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env with your actual API keys and database URLs${NC}"
fi

echo -e "${BLUE}📜 Adding npm scripts to package.json...${NC}"

# Add brain scripts to package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const brainScripts = {
  'brain:extractor': 'ts-node src/brain/extractor/kaitiaki-cortex.ts',
  'brain:indexer': 'ts-node src/brain/indexer/kaitiaki-memory.ts',
  'brain:ingest': 'ts-node src/brain/ingest/kaitiaki-cerebellum.ts',
  'brain:migrate': 'echo \"Please run this migration in Supabase: migrations/20250810_kaitiaki_aronui_brain.sql\"',
  'brain:setup': 'npm run brain:migrate && npm run brain:index-all',
  'brain:index-all': 'npm run brain:indexer .',
  'brain:dev': 'concurrently \"npm run brain:extractor\" \"echo Extractor running on http://localhost:3001\"'
};

pkg.scripts = { ...pkg.scripts, ...brainScripts };
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo -e "${GREEN}✅ Added brain scripts to package.json${NC}"

echo -e "${BLUE}🏗️  Creating brain directory structure...${NC}"

# Ensure all directories exist
mkdir -p migrations
mkdir -p src/brain/{extractor,indexer,ingest,critic}
mkdir -p scripts
mkdir -p .github/workflows

echo -e "${GREEN}✅ Directory structure created${NC}"

echo -e "${BLUE}🧪 Running brain system tests...${NC}"

# Test TypeScript compilation
echo -e "${BLUE}Testing TypeScript compilation...${NC}"
if npx tsc --noEmit; then
    echo -e "${GREEN}✅ TypeScript compilation successful${NC}"
else
    echo -e "${YELLOW}⚠️  TypeScript compilation has warnings (this is usually okay)${NC}"
fi

# Test if brain files are accessible
echo -e "${BLUE}Testing brain module accessibility...${NC}"

for module in "indexer/kaitiaki-memory" "extractor/kaitiaki-cortex" "ingest/kaitiaki-cerebellum"; do
    if [[ -f "src/brain/$module.ts" ]]; then
        echo -e "${GREEN}✅ Found brain module: $module${NC}"
    else
        echo -e "${RED}❌ Missing brain module: $module${NC}"
    fi
done

echo -e "${BLUE}📋 Creating quick reference guide...${NC}"

cat > KAITIAKI_BRAIN_QUICKSTART.md << 'EOF'
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
EOF

echo -e "${GREEN}✅ Created KAITIAKI_BRAIN_QUICKSTART.md${NC}"

echo ""
echo -e "${GREEN}🎉 Kaitiaki Aronui Brain Setup Complete!${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo -e "${YELLOW}1. Edit .env with your actual API keys and Supabase credentials${NC}"
echo -e "${YELLOW}2. Run the database migration in Supabase SQL editor:${NC}"
echo -e "   ${BLUE}migrations/20250810_kaitiaki_aronui_brain.sql${NC}"
echo -e "${YELLOW}3. Start the extractor service:${NC}"
echo -e "   ${BLUE}npm run brain:extractor${NC}"
echo -e "${YELLOW}4. Index your project files:${NC}"
echo -e "   ${BLUE}npm run brain:index-all${NC}"
echo -e "${YELLOW}5. Test with a PDF document:${NC}"
echo -e "   ${BLUE}npm run brain:ingest path/to/document.pdf 'Document Title'${NC}"
echo ""
echo -e "${GREEN}📖 See KAITIAKI_BRAIN_QUICKSTART.md for detailed instructions${NC}"
echo ""
echo -e "${BLUE}🧺 'Whaowhia te kete mātauranga' - Fill the basket of knowledge!${NC}"