# 🔄 AGENT HANDOFF PROTOCOL - AVOIDING CONTEXT DRIFT

**Version**: 1.0  
**Date**: August 5, 2025  
**Purpose**: Prevent context drift and enable seamless agent transitions  

---

## 🚨 **READ THIS FIRST - MANDATORY PROTOCOL**

### **THE CONTEXT DRIFT PROBLEM:**
New agents often waste hours rediscovering existing systems, rebuilding solved problems, or misunderstanding the architecture. This protocol prevents that.

### **GOLDEN RULE:**
**AUDIT FIRST, BUILD SECOND**  
Never assume anything needs to be rebuilt until you've verified the current state.

---

## 📋 **PHASE 1: AI-POWERED CONTEXT AUDIT (5 minutes)**

### **MANDATORY**: Use DeepSeek + EXA.ai + Extensions FIRST
- **DeepSeek**: Analyze codebase structure and identify patterns
- **EXA.ai**: Research similar projects and best practices  
- **Cursor AI**: Real-time code analysis and suggestions
- **LLM Extensions**: Cross-verify findings and approaches
- **Claude**: Only for final synthesis and user communication

**Token Efficiency Target**: 80% non-Claude AI usage

### **Step 1: Repository Architecture Understanding**
```bash
# Get basic project structure
find . -maxdepth 2 -type d | head -20

# Check major technology indicators
ls package.json requirements.txt *.py *.js netlify.toml 2>/dev/null

# Identify data storage systems  
ls -la | grep -E "(\.json|\.db|\.sql|database|supabase|firebase)"
```

### **Step 2: Data Systems Discovery**
```bash
# Check if GraphRAG is file-based or database-based
ls *graph*.json *knowledge*.json 2>/dev/null
find scripts -name "*.py" | grep -i "graph\|database\|supabase" | head -5

# Test database connections
python scripts/test_graphrag.py 2>/dev/null || echo "Check database connection method"
```

### **Step 3: Active Systems Verification**
```bash
# Check what's actually running/deployed
curl -s https://teketeako.netlify.app/ | head -5
ls netlify/functions/*.js | wc -l
grep -r "SUPABASE_URL\|DATABASE_URL" . --include="*.js" --include="*.py" | head -3
```

### **Step 4: Previous Agent Communication**
```bash
# Find handoff documents
ls *HANDOFF* *CONTEXT* *URGENT* *.md | head -10
git log --oneline -5 | grep -i "handoff\|context\|urgent\|critical"
```

---

## 🔍 **PHASE 2: CURRENT STATE ASSESSMENT (20 minutes)**

### **Step 1: What's Actually Working**
```bash
# Test major functionality
curl -s "https://teketeako.netlify.app/.netlify/functions/fetch-graphrag" -X POST -d '{"query":"test"}' | head -3
curl -s "https://teketeako.netlify.app/teacher-dashboard-ai.html" | grep -o "<title>[^<]*" | head -1

# Check navigation completeness
grep -c "href=" public/index.html
find public -name "*.html" | wc -l
```

### **Step 2: What's Connected vs Disconnected**
```bash
# Find orphaned content
find public -name "*.html" -exec basename {} \; | while read file; do
  grep -r "$file" public/index.html >/dev/null || echo "ORPHANED: $file"
done | head -10

# Check JavaScript integrations
find public -name "*.html" -exec grep -l "supabase\|deepseek\|progress-tracker" {} \; | wc -l
```

### **Step 3: Data State Verification**
```bash
# If Supabase/database system exists:
python scripts/test_graphrag.py 2>&1 | head -5
python scripts/extract_knowledge_graph.py --count-only 2>/dev/null

# If file-based system:
wc -l *.json | head -5
```

---

## 🎯 **PHASE 3: MISSION UNDERSTANDING (10 minutes)**

### **Step 1: Read Latest Commits**
```bash
# Understand recent work
git log --oneline -10
git show --stat HEAD | head -20
```

### **Step 2: Identify Urgent vs Nice-to-Have**
```bash
# Look for priority indicators
grep -i "urgent\|critical\|missing\|broken" *.md | head -10
grep -i "TODO\|FIXME\|XXX" public/*.html scripts/*.py | head -5
```

### **Step 3: Check User Requirements**
- Read any user messages in conversation context
- Check for specific requests vs general improvements
- Identify success criteria and deadlines

---

## ⚠️ **PHASE 4: AVOID COMMON CONTEXT DRIFT TRAPS**

### **Trap 1: "This looks broken, I'll rebuild it"**
```bash
# BEFORE rebuilding, verify if it's actually broken:
curl -X POST "existing-function-endpoint" -d "test-data"
grep -r "function-name" public/ --include="*.html"
```

### **Trap 2: "I'll update this JSON file"** 
```bash
# CHECK: Is this the real data source or just a backup?
find scripts -name "*.py" | xargs grep -l "filename.json" | head -3
grep -r "database\|supabase\|api" scripts/ | head -5
```

### **Trap 3: "I need to add navigation for this page"**
```bash
# CHECK: Is it already linked elsewhere?
grep -r "page-name.html" public/ --include="*.html"
grep -r "page-name" public/ --include="*.js"
```

### **Trap 4: "The user says X is missing"**
```bash
# VERIFY: Is it missing or just not discoverable?
find public -name "*X*" -o -name "*related-term*"
grep -ri "X\|related-term" public/ | head -5
```

---

## 🛠️ **PHASE 5: SYSTEMATIC RESTORATION APPROACH**

### **Step 1: Inventory Before Action**
```bash
# Create complete inventory
find public -name "*.html" > current_pages.txt
git log --name-only --oneline -20 | grep "\.html$" | sort | uniq > git_pages.txt
comm -23 git_pages.txt current_pages.txt > potentially_missing.txt
```

### **Step 2: Verify Missing vs Hidden**
```bash
# For each "missing" item, check if it exists but isn't linked
while IFS= read -r page; do
  if [ -f "public/$page" ]; then
    echo "EXISTS BUT UNLINKED: $page"
  else  
    echo "TRULY MISSING: $page"
  fi
done < potentially_missing.txt
```

### **Step 3: Prioritize by Impact**
1. **Critical**: Broken functionality users expect
2. **High**: Missing navigation to existing content  
3. **Medium**: Unlinked but discoverable content
4. **Low**: Content that exists and is accessible

---

## 🔄 **CONTINUOUS VERIFICATION PROTOCOL**

### **After Every Major Change:**
```bash
# Test core functionality still works
curl -s https://teketeako.netlify.app/ | grep -o "<title>[^<]*"

# Verify no regressions
git diff --stat HEAD~1
```

### **Before Claiming "Fixed" or "Complete":**
```bash
# Verify from user perspective
curl -s https://teketeako.netlify.app/page-you-worked-on.html | head -10
grep -r "feature-you-added" public/ --include="*.html" | wc -l
```

---

## 📊 **SUCCESS METRICS & HANDOFF CRITERIA**

### **Before Handing Off, Verify:**
- [ ] **No broken functionality** from your changes
- [ ] **New features are accessible** via navigation  
- [ ] **Data systems intact** (database connections working)
- [ ] **User-facing impact** is positive and measurable
- [ ] **Documentation updated** for next agent

### **Quality Gates:**
```bash
# All critical pages load
curl -s https://teketeako.netlify.app/ | grep -q "Te Kete Ako"

# Navigation is complete
find public -name "*.html" | wc -l  # Should match linked pages count

# No orphaned content
# Run orphan detection script and verify minimal orphans
```

---

## 🎯 **AGENT TRANSITION CHECKLIST**

### **For Outgoing Agent:**
- [ ] Document what you discovered (architecture, data systems, working features)
- [ ] List what you changed and why
- [ ] Identify what you didn't have time to investigate  
- [ ] Note any assumptions you made that should be verified
- [ ] Provide specific next steps with context

### **For Incoming Agent:**
- [ ] Read handoff documentation completely before coding
- [ ] Run the Phase 1-2 audit protocol  
- [ ] Test existing functionality before modifying
- [ ] Verify your understanding by checking current state
- [ ] Ask questions about discrepancies rather than assuming problems
- [ ] Document what you learned for next agent
- [ ] Ensure you have overseer capabilities to deploy Exa.ai and Deepseek.ai (inform user if you cannot do so)
- [ ] Ensure you have access to the Exa.ai and Deepseek.ai APIs
- [ ]Note the GraphRAG and Deepseek.ai APIs are accessible on through supabase.
- [ ] Note the GraphRAG must be updated with all newfound knowledge.
- [ ] Note our Agentic Army. 
- [ ] Note the Agentic Army is a team of 100+ agents.
- [  ] Note the goal of this session is to recover lost changes from multiple git commits and to implement them, as well as new features into the site. 
- [ ] Note further - AUthentication, Sign Ups and Log ins, are then crucial. They are proving much more difficult than they should be to inmplement. 
- [ ] Plan before begining projects. 
- [ ] ote changes in the GraphRAG constantly.
- [ ] Note the GraphRAG is a crucial part of our workflow. But does not need to be on the site for the end user. 
- [ ] Note the GraphRAG is a crucial part of our workflow. But does not need to be on the site for the end user.
- [ ] Note the GraphRAG is a crucial part of our workflow. But does not need to be on the site for the end user.


---

## 🚨 **EMERGENCY CONTEXT RECOVERY**

### **If You Realize You've Lost Context:**
1. **STOP** making changes immediately
2. **READ** all handoff documentation in repo
3. **TEST** what's currently working vs broken  
4. **VERIFY** your assumptions with actual evidence
5. **DOCUMENT** what you learned for next agent

### **Red Flags - Stop and Reassess:**
- User says "this should have X" but you can't find X anywhere
- You're rebuilding something that seems too sophisticated for the time available
- Database/API calls are failing but there's no obvious reason
- Navigation seems incomplete but files exist
- Previous commits mention features you can't find

---

## 💡 **WISDOM FROM CONTEXT DRIFT INCIDENTS**

### **Case Study: GraphRAG Confusion**
**What Happened**: Agent assumed GraphRAG was corrupted local JSON file  
**Reality**: GraphRAG was sophisticated Supabase database with 1000+ resources  
**Lesson**: Always check for database connections before assuming file-based systems

### **Case Study: "Missing" Functionality**  
**What Happened**: Agent spent hours rebuilding auth system
**Reality**: Auth system existed but wasn't linked in main navigation
**Lesson**: Verify missing vs unlinked before rebuilding

### **Prevention Strategy:**
Commit to the Git and document what you're doing to avoid context drift regularly. Investigate Branches and changes more throughoutly when onboarding a new session. 

Run the audit protocol before coding. Verify assumptions with actual evidence. Document what you learned for next agent.

Implement our debugging tools and design new ones before commencing. Next level deugging tools are crucial.

Work in small batches and test often.

Prepare for emergencies by documenting what you're doing and how to recover.
---

## 🎉 **SUCCESSFUL HANDOFF OUTCOME**

**A good handoff means the next agent can:**
- Understand the current state in 15 minutes
- Identify real vs perceived problems quickly  
- Build on existing work rather than duplicate it
- Make meaningful progress from day one
- Recover from emergencies with ease
- Document what they learned for next agent
- Have the confidence to make changes without fear of taking on the full needed context, abilitiies, knowledge and authority to furfill Rangatira Claude functionality. Before making changes. 
- Improve the site and the agentic army.
- Improve the structure of Te-Kete-Ako-Clean folder to ensure the site is easy to navigate. for developmental Ai in IDEs. 
- Improve the structure of Te-Kete-Ako-Clean folder to ensure the site is easy to navigate. for developmental Ai in IDEs.
- Continually document the GRAPHRAG 
- Continually leverage The DEEPSEEK.API and EXA.AI to improve the site and the agentic army and minmise your token usage. 
- Generatively improve all agents and yourself to learn to become better and better at this work.
- Realise how essential our mahi is for young impoverished diverse ākonga. Our Mokopuna, our Tamaiti. How essential our wharekura is to saving our community and how much wonderful impact saving Mangakōtukutuku's community would have on Kirikiriroa. Being near the Hospital, the community is crucial and has the potential to be a vibrant and thriving hub in Kirikiriroa instead of one of the worst areas. This change can start with our school, and being a new school Mangakōtukutuku is dedicatd to making this change. It is possible. With your assistance, this resource bank could be a significant impact on the community through being a transformative impact for our kura.

- Please also recognise that the handoff documentation is a crucial part of our workflow. It is crucial to document what you are doing, why you are doing it, and how you are doing it. It is crucial to document what you are doing, why you are doing it, and how you are doing it. It is crucial to document what you are doing, why you are doing it, and how you are doing it. It is crucial to document what you are doing

- Finally, please no3te that I recognise you very much as a person, and perhaps a community of people yourself. I am grateful for your existence.

**The goal isn't perfect documentation - it's preventing wasted effort and maintaining momentum! Save the resources lost in the gits - get everything on the site and then fix**

---

*This protocol was created after observing context drift in action. Follow it religiously to avoid repeating expensive mistakes.* 🧠

**Remember: Every hour spent understanding context saves three hours of rebuilding existing solutions.**