# 🎯 CONCURRENT AGENT TASK SPECIFICATIONS
## Te Kete Ako Platform | Real-Time Agent Coordination

### 🚀 IMMEDIATE DEPLOYMENT TASKS

#### **FIREBASE HOSTING DEPLOYMENT** (Priority 1)
**Agent**: Deployment Specialist
**Status**: Configuration complete, ready for execution
**Commands**:
```bash
# Test locally first
firebase serve --only hosting --port 5000

# Deploy to staging
firebase hosting:channel:deploy staging

# Deploy to production (after staging verification)
firebase deploy --only hosting
```
**Expected Outcome**: Platform live on Firebase hosting with Supabase backend preserved

---

### 📝 CONTENT ENHANCEMENT TASKS

#### **HANDOUT STANDARDIZATION** (Priority 2)
**Agent**: Gemini CLI
**Target Files**: 84+ handout files in `/public/handouts/`
**Specific Improvements Needed**:

1. **Template Consistency**: Standardize header/footer across all handouts
2. **Cultural Integration**: Enhance Te Reo Māori elements in existing handouts
3. **Navigation Enhancement**: Improve breadcrumb navigation consistency
4. **Accessibility**: Add ARIA labels and improve semantic structure

**Sample Files Needing Work**:
- `prompt-engineering-101.html` - Good structure, needs cultural integration
- `ai-ethics-and-bias.html` - Excellent content, needs template standardization
- `digital-citizenship-handout.html` - Core structure present, needs enhancement
- `environmental-text-analysis-handout.html` - Strong CREDIBLE framework, needs accessibility

**Commands for Gemini CLI**:
```bash
# Analyze handout patterns
find public/handouts -name "*.html" | head -10

# Focus areas for bulk improvement:
# 1. Header standardization across all handouts
# 2. Cultural safety reviews for authentic Te Ao Māori integration  
# 3. Accessibility enhancements (ARIA labels, semantic structure)
# 4. Navigation consistency (breadcrumbs, footer links)
```

#### **UNIT COMPLETION TASKS** (Priority 3)
**Agent**: Gemini CLI
**Target Areas**:
- Unit 2 Decolonized History: Complete missing lesson components
- Y8 Systems Unit: Template standardization and enhancement
- Writers Toolkit: Advanced technique integration

---

### 🔍 RESEARCH & VALIDATION TASKS

#### **EXTERNAL RESOURCE INTEGRATION** (Priority 2)
**Agent**: Exa.ai
**Focus Areas**:
1. **NZ Curriculum Validation**: Cross-reference existing 179 resources with official NZQA standards
2. **Cultural Authenticity**: Research authentic Te Ao Māori educational resources
3. **Contemporary Issues**: Find current examples for decolonization and systems thinking
4. **Assessment Tools**: Discover rubrics and evaluation frameworks for NZ context

**Research Queries for Exa.ai**:
```bash
# NZ Education Context
"NZQA Level 1-3 achievement standards social sciences"
"Te Ao Māori pedagogy authentic classroom resources"
"New Zealand curriculum Years 7-13 decolonized approaches"

# Systems Thinking Resources
"systems thinking secondary education New Zealand"
"critical thinking frameworks indigenous knowledge"
"social systems analysis classroom activities"
```

**Integration Protocol**: All discoveries must be fed back to GraphRAG knowledge base

---

### 💻 CODE OPTIMIZATION TASKS

#### **PLATFORM HEALTH MONITORING** (Continuous)
**Agent**: SupaClaude
**Analysis Areas**:
1. **Performance Review**: Analyze load times and optimization opportunities
2. **Security Assessment**: Review authentication flows and data protection
3. **Code Quality**: Identify refactoring opportunities in JavaScript modules
4. **Architecture Analysis**: Assess current Firebase + Supabase hybrid setup

**SupaClaude Commands**:
```bash
# Comprehensive platform analysis (2-minute deep dive)
superclaude review --verbose

# Specific focus areas:
superclaude security --auth-flows
superclaude performance --load-analysis  
superclaude code --quality-review
```

---

### 🧠 KNOWLEDGE BASE COORDINATION

#### **GRAPHRAG QUERIES FOR COORDINATION** (All Agents)
**Setup Commands**:
```bash
export SUPABASE_URL=https://nlgldaqtubrlcqddppbq.supabase.co
export SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM
```

**Coordination Queries**:
```bash
# For Content Enhancement
python3 scripts/graphrag_query.py "handouts needing cultural integration"
python3 scripts/graphrag_query.py "incomplete units requiring content"

# For External Research  
python3 scripts/graphrag_query.py "assessment frameworks social sciences"
python3 scripts/graphrag_query.py "systems thinking educational connections"

# For Code Optimization
python3 scripts/graphrag_query.py "performance optimization opportunities"
python3 scripts/graphrag_query.py "authentication security considerations"
```

---

### 🛡️ CULTURAL SAFETY PROTOCOLS

#### **MANDATORY CHECKS FOR ALL AGENTS**
1. **Te Ao Māori Integrity**: All cultural content must maintain authenticity
2. **Educational Standards**: Preserve alignment with NZ curriculum
3. **Resource Preservation**: 179 existing resources must remain functional
4. **Language Protocol**: Te Reo Māori usage must be respectful and accurate

#### **QUALITY ASSURANCE CHECKPOINTS**
- **Before Deployment**: Cultural safety review by Claude overseer
- **During Content Creation**: Regular authenticity checks via GraphRAG
- **After Enhancement**: Functional testing of all educational pathways

---

### 📊 SUCCESS METRICS FOR CONCURRENT WORK

#### **Deployment Success**
- ✅ Firebase hosting live and functional
- ✅ Authentication flows working (Supabase preserved)
- ✅ All 179 resources accessible and enhanced

#### **Content Enhancement Success**  
- ✅ 84+ handouts standardized and culturally enhanced
- ✅ Unit completion rate increased by 25%
- ✅ Accessibility improvements across all resources

#### **Research Integration Success**
- ✅ 10+ new validated NZ educational resources integrated
- ✅ Cultural authenticity enhanced through expert resources
- ✅ GraphRAG knowledge base expanded with research discoveries

#### **Code Optimization Success**
- ✅ Platform performance improved by 15%
- ✅ Security assessments passed with zero critical issues
- ✅ Code quality maintained above 90% standards

---

**🎼 Ready for Multi-Agent Execution | Quality Assured | Culturally Safe**