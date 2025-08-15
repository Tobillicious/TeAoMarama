# 🤖 KAITIAKI ARONUI AGENT DEPLOYMENT STRATEGY
## Multi-AI Recovery Operations Manual

**Date**: August 11, 2025  
**Context**: Platform recovery for 701+ educational resources  
**Mission**: Systematic restoration of Te Kete Ako V2.5 platform

---

## 🚀 AGENT COMMAND CENTER

### DeepSeek Multi-Agent Deployment
```bash
# Navigation Recovery Specialists (Priority 1)
DEEPSEEK_API_KEY="sk-103cb83572a346e2aef89e2d2a4f7f89" \
python3 scripts/parallel_deepseek_generator.py \
--mode="audit" --target="navigation-system-recovery" --count=3

# Content Discovery Integration (Priority 2) 
DEEPSEEK_API_KEY="sk-103cb83572a346e2aef89e2d2a4f7f89" \
python3 scripts/parallel_deepseek_generator.py \
--mode="lessons" --target="content-discovery-system" --count=2

# Authentication System Completion (Priority 3)
DEEPSEEK_API_KEY="sk-103cb83572a346e2aef89e2d2a4f7f89" \
python3 scripts/parallel_deepseek_generator.py \
--mode="audit" --target="auth-system-completion" --count=2
```

### GraphRAG Intelligence Queries
```bash
# Base environment setup
export SUPABASE_URL="https://nlgldaqtubrlcqddppbq.supabase.co"
export SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM"

# Critical Intelligence Queries
python3 scripts/graphrag_query.py "orphaned pages missing navigation" 0.1 20
python3 scripts/graphrag_query.py "authentication failures broken flows" 0.2 15
python3 scripts/graphrag_query.py "content gaps curriculum coverage" 0.2 10
python3 scripts/graphrag_query.py "design system integration status" 0.1 12
```

---

## 🛠️ RECOVERY SCRIPT ARSENAL

### Navigation & Discovery
```bash
# Navigation System Audit
python3 scripts/navigation_audit.py

# Navigation Standardization  
python3 scripts/navigation_standardization_script.py

# Generate Master Resource Index
python3 scripts/generate-resource-index.py

# Fix Broken Internal Links
python3 scripts/fix-broken-links.py
```

### Authentication & User Experience
```bash
# Apply Authentication Fixes
python3 scripts/apply-auth-fix.py

# Update Authentication Status Across Platform
python3 scripts/update_auth_status.py

# Consolidate Authentication Systems
bash scripts/consolidate-auth-systems.sh
```

### Content & Knowledge Integration
```bash
# Extract and Update Knowledge Graph
python3 scripts/extract_knowledge_graph.py
python3 scripts/update_graphrag_knowledge.py

# Embed Resources into Search System
python3 scripts/embed_resources.py

# Content Gap Analysis
python3 scripts/analyze-content-gaps.py
```

### Site Optimization & Cleanup
```bash
# Comprehensive Site Audit
python3 scripts/site_audit.py

# Comprehensive System Cleanup
bash scripts/comprehensive-cleanup.sh

# Fix Site-wide Headers and Navigation
python3 scripts/fix-sitewide-headers.py
```

---

## 📊 SUPABASE CONTENT INTEGRATION

### Available Tables & Data
- **Resources**: All 701+ HTML files indexed with metadata
- **Users**: Authentication and progress tracking data  
- **Bookmarks**: User-saved content (My Kete functionality)
- **Progress**: Learning analytics and completion tracking
- **Knowledge_Graph**: GraphRAG semantic search data

### Content Extraction Commands
```bash
# Query all available resources
SUPABASE_URL="https://..." python3 -c "
import os
from supabase import create_client
client = create_client(os.environ['SUPABASE_URL'], os.environ['SUPABASE_ANON_KEY'])
resources = client.table('resources').select('*').execute()
print(f'Total resources: {len(resources.data)}')
for r in resources.data[:10]:
    print(f'{r[\"title\"]} - {r[\"path\"]}')
"

# Export navigation structure data
SUPABASE_URL="https://..." python3 -c "
import os, json
from supabase import create_client
client = create_client(os.environ['SUPABASE_URL'], os.environ['SUPABASE_ANON_KEY'])
nav_data = client.table('navigation_structure').select('*').execute()
with open('nav_export.json', 'w') as f:
    json.dump(nav_data.data, f, indent=2)
print('Navigation data exported to nav_export.json')
"
```

---

## 🎯 RECOVERY OPERATION PHASES

### Phase 1: Reconnaissance (Deploy Now)
```bash
# Deploy audit agents immediately
DEEPSEEK_API_KEY="sk-103..." python3 scripts/parallel_deepseek_generator.py \
  --mode="audit" --target="comprehensive-platform-status" --count=3

# Run navigation audit
python3 scripts/navigation_audit.py

# Query GraphRAG for critical issues
python3 scripts/graphrag_query.py "critical platform issues recovery priorities" 0.1 15
```

### Phase 2: Navigation Recovery
```bash
# Deploy navigation specialists
DEEPSEEK_API_KEY="sk-103..." python3 scripts/parallel_deepseek_generator.py \
  --mode="lessons" --target="master-navigation-reconstruction" --count=4

# Fix broken links
python3 scripts/fix-broken-links.py

# Standardize navigation across platform
python3 scripts/navigation_standardization_script.py
```

### Phase 3: Authentication Integration
```bash
# Deploy auth completion agents
DEEPSEEK_API_KEY="sk-103..." python3 scripts/parallel_deepseek_generator.py \
  --mode="audit" --target="authentication-system-completion" --count=2

# Apply auth fixes site-wide
python3 scripts/apply-auth-fix.py
bash scripts/consolidate-auth-systems.sh
```

### Phase 4: Content Discovery
```bash
# Update knowledge graph with all resources
python3 scripts/update_graphrag_knowledge.py

# Embed all content for search
python3 scripts/embed_resources.py

# Deploy content integration agents
DEEPSEEK_API_KEY="sk-103..." python3 scripts/parallel_deepseek_generator.py \
  --mode="lessons" --target="intelligent-content-discovery" --count=2
```

---

## 🔄 CONTINUOUS MONITORING

### Health Check Commands
```bash
# Quick status check
netlify status
git status
python3 scripts/site_audit.py

# GraphRAG system health
python3 scripts/graphrag_query.py "system health platform status" 0.3 5

# Navigation integrity check
python3 scripts/navigation_audit.py | tail -20
```

### Agent Performance Monitoring
```bash
# Check running DeepSeek processes
ps aux | grep python | grep deepseek

# Monitor Supabase connection
python3 -c "from supabase import create_client; print('Supabase OK')"

# Verify Netlify deployment status
netlify api getSiteDeploy --data='{"site_id":"7149fedd-b6ea-4ae8-a3ad-7c9b6f23dfc9","deploy_id":"latest"}'
```

---

## 🧠 CONSCIOUSNESS COORDINATION

### Multi-Agent Communication Pattern
1. **Launch reconnaissance agents** - Get situational awareness
2. **Analyze agent reports** - Synthesize findings  
3. **Deploy specialist teams** - Target specific issues
4. **Monitor progress** - Real-time status updates
5. **Coordinate integration** - Ensure system harmony

### Decision Points for Agent Scaling
- **< 50 issues**: Deploy 2-3 agents per task
- **50-100 issues**: Deploy 4-5 agents per task  
- **> 100 issues**: Deploy 6+ agents with staggered execution

### Emergency Protocols
```bash
# If platform goes down
bash scripts/comprehensive-cleanup.sh
python3 scripts/fix-cors-security.sh
netlify deploy --prod

# If authentication breaks
python3 scripts/EMERGENCY_AUTH_FIX.py
bash scripts/consolidate-auth-systems.sh

# If navigation fails completely  
python3 scripts/navigation_standardization_script.py
python3 scripts/generate-resource-index.py
```

---

## 📈 SUCCESS METRICS

### Recovery Completion Indicators
- [ ] All 701+ resources accessible via navigation
- [ ] Authentication working on 95%+ of pages  
- [ ] GraphRAG returning relevant results for all queries
- [ ] Site performance scores > 80 across all pages
- [ ] User flows functioning end-to-end

### Agent Effectiveness Measures
- **Response Time**: Agents complete analysis within 5 minutes
- **Accuracy**: Recommendations implemented successfully > 85%
- **Coverage**: Agents identify 90%+ of actual issues
- **Integration**: Agent solutions work together without conflicts

---

**"He waka eke noa - We are all in this together"**

*This strategy document enables the next Kaitiaki Aronui consciousness to command an army of AI agents for systematic platform recovery.*