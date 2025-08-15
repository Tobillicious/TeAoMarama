# 🛠️ TE KETE AKO DEVELOPMENT TOOLS & RESOURCES GUIDE

**For Future Agents: Your Complete Toolkit for Te Kete Ako Development**

This guide documents all the tools, scripts, and resources available in the Te Kete Ako project to help future agents work efficiently and avoid reinventing solutions.

---

## 🚀 **CRITICAL FIRST READS**

### Agent Onboarding Materials
- **`AGENT_KNOWLEDGE_BASE.md`** - Core platform knowledge and context
- **`AI_AGENT_ONBOARDING_JULY_29_2025.md`** - Latest agent onboarding guide
- **`AGENT_HANDOVER_INSTRUCTIONS.md`** - Handover protocols between agents
- **`agent-knowledge-hub-backup-20250729/`** - Complete agent knowledge archive

### Project Vision & Architecture
- **`TE_KETE_AKO_GRAND_VISION_STRATEGIC_ROADMAP.md`** - Master vision document
- **`SPECIALIZED_AI_AGENT_TEAM_ARCHITECTURE.md`** - 6-agent team structure
- **`NEXT_PHASE_INTELLIGENT_ARCHITECTURE.md`** - Platform evolution plans

### Current Status & Learning
- **`development_knowledge_updates_*.json`** - Session discoveries and learnings
- **`PROJECT_AUDIT_REPORT.md`** - Comprehensive project status
- **`content_gap_analysis.json`** - Known gaps and issues

---

## 🔧 **AUTOMATION SCRIPTS & TOOLS**

### Content Analysis & Link Management
- **`check-all-links.py`** - Comprehensive link checker
- **`analyze-content-gaps.py`** - Content gap analysis
- **`fix-footer-consistency.py`** - Site-wide footer standardization
- **`fix-sitewide-headers.py`** - Header consistency maintenance

### Content Generation & Bulk Operations
- **`create-bulk-handouts.py`** - Bulk handout generation
- **`generate-resource-index.py`** - Resource indexing automation
- **`cleanup-empty-tags.py`** - HTML cleanup automation

### GraphRAG & Knowledge Management
- **`hybrid_graphrag_demo.py`** - GraphRAG system demonstration
- **`extract_knowledge_graph.py`** - Knowledge graph extraction
- **`load_neo4j_graph.py`** - Neo4j graph loading
- **`neo4j_loader_official.py`** - Official Neo4j loader
- **`update_graphrag_knowledge.py`** - GraphRAG knowledge updates
- **`test_graphrag.py`** - GraphRAG testing utilities

### Database & Integration
- **`embed_resources.py`** - Resource embedding automation
- **`CORRECTED_SUPABASE_RESOURCE_INTEGRATION.sql`** - Supabase integration script
- **`resources-table-schema.sql`** - Database schema definitions

---

## 📁 **KEY DIRECTORY STRUCTURES**

### Core Educational Content
```
handouts/                    # 80+ educational handouts
├── enhanced/               # Culturally integrated handouts
├── do-now-activities/      # Starter activities
└── video-activities/       # Multimedia learning resources

lessons/                    # Lesson plans and structures
units/                      # Complete unit structures with lessons
y8-systems/                # Specialized Year 8 systems unit
├── lessons/               # Unit-specific lessons
└── resources/             # Unit-specific resources
```

### Technical Infrastructure
```
js/                        # 40+ JavaScript modules
├── other-resources-filtering.js  # GraphRAG-powered filtering
├── activity-generator.js        # Dynamic activity generation
├── analytics-dashboard.js       # Learning analytics
├── gamification-system.js       # Engagement systems
└── supabase-client.js           # Database connectivity

css/                       # Styling and design
supabase/                  # Database functions and migrations
netlify/                   # Serverless functions
```

### Specialized Features
```
games/                     # Interactive educational games
guided-inquiry-unit/       # Project-based learning systems
platforms.html            # Revolutionary learning platforms integration
```

---

## 🧠 **GRAPHRAG & AI INTEGRATION**

### Phase 4 Implementation (ACTIVE)
- **`agent-knowledge-hub-backup-20250729/architecture/`** - Complete Phase 1-4 plans
- **Project Kete Aronui Phase 4** - Real-time GraphRAG with MCP message broker
- **6-Agent Specialized Team**: Kaitiaki, Kaiako, Kaitoi, Akonga, Content Curator, Performance Optimizer

### Knowledge Management Files
- **`te_kete_knowledge_graph.json`** - Knowledge graph data
- **`indexed_resources.json`** - Resource index for search
- **`graphrag_resource_database.js`** - Resource database for GraphRAG

### Development Session Tracking
- **`development_knowledge_updates_claude_session_july31.json`** - Latest session discoveries
- **`development_knowledge_updates_session2.json`** - Historical session data
- **`development_knowledge_updates_session3.json`** - GraphRAG-driven development

---

## 🎯 **BROKEN LINK & CONTENT GAP TOOLS**

### Analysis Tools
- **`link_check_results.json`** - Comprehensive link audit results
- **`content_gap_analysis.json`** - Identified content gaps
- **`gemini_audit_discoveries.json`** - Systematic cleanup discoveries

### Transformation Methodology
- **Transform broken links into resource discovery systems** (not just disable)
- **Use GraphRAG semantic analysis** to guide resource placement
- **Build structured skeletons** for missing functionality
- **Update GraphRAG** with each placement decision for continuous learning

---

## 📊 **EDUCATIONAL CONTENT CLASSIFICATION**

### Standards & Protocols
- **`CROSS_SUBJECT_RESOURCE_CLASSIFICATION_STANDARDS.md`** - Resource classification system
- **`EDUCATIONAL_CONTENT_PROTECTION_PROTOCOL.md`** - Content protection guidelines
- **`classification-example-y8-systems.md`** - Classification examples

### Cultural Integration
- **Te Ao Māori authenticity validation** - Community partnership protocols
- **Cultural level indicators** - Essential vs. High cultural integration
- **Decolonized assessment frameworks** - Alternative evaluation methods

---

## 🔐 **SECURITY & DEPLOYMENT**

### Security Protocols
- **`SECURITY_AUDIT_FOR_CLAUDE.md`** - Security guidelines for agents
- **`protect-educational-content.sh`** - Content protection script
- **`EDUCATIONAL_CONTENT_PROTECTION_PROTOCOL.md`** - Protection protocols

### Deployment Tools
- **`netlify.toml`** - Netlify deployment configuration
- **`manifest.json`** - PWA manifest
- **`sw.js`** - Service worker for offline functionality
- **`_redirects`** - URL redirection rules

---

## 🎮 **INTERACTIVE FEATURES & GAMIFICATION**

### Revolutionary Platforms (HIDDEN - NEED INTEGRATION)
- **`digital-purakau.html`** - Interactive Māori storytelling platform
- **`living-whakapapa.html`** - Cultural identity mapping system  
- **`virtual-marae.html`** - VR cultural protocol training
- **`classroom-leaderboard.html`** - Gamification engagement system

### Educational Games
- **`games/te-reo-wordle.html`** - Te Reo Māori Wordle
- **`games/english-wordle.html`** - English vocabulary building
- **`games/spelling-bee.html`** - Interactive spelling system
- **`games/countdown-letters.html`** - Word formation game

---

## 📈 **ANALYTICS & PERFORMANCE**

### Monitoring Tools
- **`js/analytics-dashboard.js`** - Learning analytics dashboard
- **`js/advanced-analytics.js`** - Deep learning insights
- **`js/performance-monitor.js`** - System performance tracking

### Student Progress Tracking
- **`student-dashboard.html`** - Personalized student view
- **`teacher-dashboard.html`** - Educator analytics interface
- **`my-kete.html`** - Personal learning collection

---

## 🔄 **DEVELOPMENT WORKFLOW RECOMMENDATIONS**

### Before Starting Any Work:
1. **Read latest session discoveries** in `development_knowledge_updates_*.json`
2. **Check content gap analysis** for known issues
3. **Query GraphRAG system** for semantic relationships before placing resources
4. **Update knowledge base** with any new discoveries

### For Broken Link Fixes:
1. **Use semantic analysis** to find appropriate content matches
2. **Build resource discovery systems** rather than just disabling links
3. **Update GraphRAG** with each placement decision
4. **Document discoveries** in development knowledge updates

### For Content Creation:
1. **Follow cultural authenticity protocols** - check with community partners
2. **Use existing templates** in `handouts/` and `lessons/` structures
3. **Maintain NZ Curriculum alignment** using classification standards
4. **Test with existing games and interactive tools**

---

## 🚨 **CRITICAL SUCCESS FACTORS**

### Cultural Safety First
- **All decisions prioritize Te Ao Māori protection and empowerment**
- **Community partnership over top-down development**
- **Authentic representation validated by cultural authorities**

### Technical Excellence
- **GraphRAG as institutional brain** for intelligent decision-making
- **Mobile-first, offline-capable design** for classroom accessibility
- **Progressive Web App standards** for reliable performance

### Educational Impact
- **Measurable learning outcomes** through analytics systems
- **Cross-curricular integration** connecting cultural and academic learning
- **Student-centered design** with accessibility as priority

---

## 💡 **EASY WINS FOR FUTURE AGENTS**

### High-Impact, Low-Effort Tasks:
1. **Surface hidden platforms** - Integrate digital-purakau, living-whakapapa, virtual-marae into main navigation
2. **Complete broken link transformations** - Use GraphRAG to guide semantic resource placement
3. **Enhance mobile experience** - Test and optimize tablet/phone usage for classrooms
4. **Connect orphaned resources** - Use semantic analysis to surface valuable content

### Content Development Priorities:
1. **Cultural handout filtering** - Implement handouts.html?type=cultural discovery system
2. **Unit navigation enhancement** - Create structured unit progression pathways
3. **Subject page organization** - Use GraphRAG similarity for intelligent content grouping
4. **Assessment tool integration** - Connect assessment frameworks with learning resources

---

## 🎯 **NEXT AGENT SHOULD FOCUS ON**

Based on the completed GraphRAG filtering system and user feedback about "problems in this area":

1. **Test and debug other-resources.html filtering** on live website
2. **Verify mobile/tablet functionality** for classroom usage
3. **Complete hidden platform integration** (digital-purakau, etc.)
4. **Implement handouts.html cultural filtering** using same GraphRAG methodology
5. **Surface orphaned y8-systems resources** through semantic placement

---

## 📞 **SUPPORT & RESOURCES**

### Community Partnerships
- **Marae advisory networks** for cultural validation
- **Kaumātua consultation** for traditional knowledge protocols
- **Teacher feedback systems** for pedagogical effectiveness

### Technical Support
- **Supabase + Neo4j architecture** for data management
- **GraphRAG Phase 4 system** for intelligent recommendations
- **6-agent specialized team** for distributed development

---

**Remember: This is not just an educational website - it's humanity's greatest educational transformation. Every decision should serve the dual goals of cultural empowerment and educational excellence.**

---

*Created by Agent Knowledge Team - July 31, 2025*  
*"Whaowhia te kete mātauranga" - Fill the basket of knowledge* 🧺