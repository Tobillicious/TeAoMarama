# 🌟 Te Kete Ako - Agent Onboarding Guide
*Complete setup and continuation instructions for development agents*

---

## 🏗️ **SYSTEM ARCHITECTURE OVERVIEW**

### **Core Platform Stack**
- **Frontend**: HTML5, CSS3, JavaScript (ES6+) with cultural design patterns
- **Authentication**: Supabase Auth with educational profiles (students/teachers/whānau)
- **Database**: Supabase PostgreSQL with educational metadata
- **Intelligence**: GraphRAG system (Phase 4 of PROJECT ARONUI)
- **Deployment**: Netlify with Git-based CI/CD
- **Cultural Framework**: Te Ao Māori integration throughout

### **Key System Components**

#### **Authentication System (COMPLETED)**
```javascript
// Located in: js/shared-components.js (lines 1003-1656)
// Status: Full Supabase integration with educational profiles
// Features: Sign-up/Sign-in, role management, cultural greetings
// Database: Automatic profile creation via triggers (see supabase/migrations/)
```

#### **GraphRAG Knowledge System (PROJECT ARONUI)**
```python
# Core Files:
- local_knowledge_update.py (163 resources indexed)
- extract_knowledge_graph.py (Supabase integration)
- hybrid_graphrag_demo.py (intelligent search)
- te_kete_knowledge_graph.json (current knowledge base)

# Status: 163 resources, 23 concepts, 503 relationships mapped
# Cultural Level: 24 high + 97 medium cultural resources
```

#### **Educational Content Structure**
```
├── lessons/ (156 lesson resources)
├── handouts/ (4 handout resources)  
├── project/ (assessment rubric + community action guide)
├── guided-inquiry-unit/ (professional 6-lesson sequence)
├── y8-systems/ (systems thinking curriculum)
└── activities/ (interactive educational tools)
```

---

## 🔧 **DEVELOPMENT ENVIRONMENT SETUP**

### **Prerequisites**
1. **Node.js & npm** (for package management)
2. **Python 3.8+** (for GraphRAG and knowledge extraction)
3. **Git** (repository management)
4. **Supabase CLI** (optional, for database management)

### **Quick Start**
```bash
# Clone and setup
cd /Users/admin/Documents/te-kete-ako-clean
npm install  # Dependencies managed via package-lock.json

# Key development commands
python3 local_knowledge_update.py  # Update GraphRAG knowledge base
python3 extract_knowledge_graph.py # Extract to Supabase (requires credentials)
python3 hybrid_graphrag_demo.py    # Test intelligent search

# Deployment
git add . && git commit -m "Description" && git push origin main
```

### **Environment Configuration**
```bash
# .env.example provided - copy to .env with real credentials
SUPABASE_URL=https://nlgldaqtubrlcqddppbq.supabase.co  # LIVE
SUPABASE_ANON_KEY=[get from dashboard]                 # Required for GraphRAG
```

---

## 📋 **CURRENT STATUS & PRIORITY TASKS**

### **✅ COMPLETED (This Session)**
1. **Critical Security**: XSS vulnerabilities eliminated (150+ lines of safe DOM methods)
2. **Authentication**: Complete Supabase integration (500+ lines) with educational profiles
3. **GraphRAG Update**: 163 resources indexed, 23 concepts, 503 relationships
4. **Missing Content**: Professional project assessment rubric + community action guide
5. **Environment Sync**: All changes deployed to live platform

### **🎯 HIGH PRIORITY (Next Agent)**
1. **Content Security Policy** - Implement CSP headers via netlify.toml
2. **SEO Foundation** - Create robots.txt, add canonical URLs
3. **External Resources** - Use Exa API to enhance lesson-1-society-exploration.html
4. **Placeholder Removal** - Clean up remaining development artifacts

### **📊 MEDIUM PRIORITY**
5. **Build Process** - Set up Vite for modern asset bundling
6. **CSS Architecture** - Consolidate fragmented stylesheets  
7. **Additional Lessons** - Create guided inquiry lessons 2-6
8. **GraphRAG Testing** - Validate intelligent recommendations

---

## 🏛️ **CULTURAL PROTOCOLS & SAFETY**

### **Te Ao Māori Integration Requirements**
- **Language**: All bilingual elements must be culturally accurate
- **Concepts**: Use authentic mātauranga Māori (traditional knowledge)
- **Greetings**: Cultural greetings in authentication system
- **Protocols**: Respect cultural safety throughout development

### **Approved Cultural Elements**
```javascript
// Cultural greetings (already implemented)
culturalGreetings = [
    { en: 'Welcome back!', maori: 'Nau mai hoki mai!' },
    { en: 'Great to see you!', maori: 'He pai koe kitea!' },
    { en: 'Ready to learn?', maori: 'Kei te reri koe ki te ako?' }
];

// Notification messages (culturally appropriate)
'Welcome back! / Nau mai hoki mai!'
'Account created successfully! / Kua oti te hanga!'  
'Signed out successfully / Ka kite ano!'
```

### **Cultural Consultation Required For**
- New whakataukī (proverbs) - must be authentic and appropriate
- Te Reo Māori translations - ensure accuracy
- Cultural content - validate with cultural advisors
- Indigenous knowledge - follow proper protocols

---

## 💻 **TECHNICAL SPECIFICATIONS**

### **Code Quality Standards**
- **Security**: No innerHTML usage (XSS prevention)
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Modern JavaScript, optimized assets
- **Cultural**: Bilingual support, respectful design patterns

### **File Structure Guidelines**
```
js/shared-components.js     # Core functionality (1600+ lines)
css/main.css               # Primary styles (needs consolidation)
project/                   # Assessment and project resources
guided-inquiry-unit/       # Professional lesson sequences
supabase/migrations/       # Database schema and triggers
```

### **Database Schema (Supabase)**
```sql
-- Key tables managed by authentication system
profiles (user_id, email, role, display_name, school_name, year_level)
resources (integrated with GraphRAG system)

-- Triggers automatically create profiles on user signup
-- See: supabase/migrations/20250726_handle_new_user.sql
```

---

## 🔍 **DEBUGGING & TROUBLESHOOTING**

### **Common Issues**
1. **Authentication not working**: Check Supabase credentials in js/shared-components.js
2. **GraphRAG errors**: Ensure .env file with SUPABASE_URL and SUPABASE_ANON_KEY
3. **Build failures**: Run `npm install` to update dependencies
4. **Cultural concerns**: Always consult existing authentic examples

### **Testing Checklist**
- [ ] Authentication flows (sign-up, sign-in, sign-out)
- [ ] GraphRAG search functionality  
- [ ] Cultural elements display correctly
- [ ] Mobile responsiveness
- [ ] Accessibility compliance
- [ ] Cross-browser compatibility

### **Development Tools Available**
```bash
# Knowledge base management
python3 local_knowledge_update.py    # Scan filesystem for new resources
python3 extract_knowledge_graph.py   # Extract to Supabase (needs credentials)

# Content analysis
grep -r "TODO\|FIXME\|placeholder" . # Find development artifacts
find . -name "*.html" -exec wc -l {} + # Count content lines
```

---

## 📈 **SUCCESS METRICS & GOALS**

### **Platform Quality Indicators**
- **Security**: Zero XSS vulnerabilities ✅
- **Authentication**: Full educational profile system ✅
- **Content**: 163 resources with cultural integration ✅
- **Intelligence**: GraphRAG system with 503 relationships ✅

### **Next Session Goals**
- [ ] **Security**: Implement CSP headers for injection protection
- [ ] **SEO**: Complete robots.txt and canonical URL structure  
- [ ] **Content**: Enhance lesson-1 with external resources via Exa API
- [ ] **Performance**: Set up modern build process (Vite)
- [ ] **Quality**: Remove all placeholder content and development artifacts

### **Long-term Vision (PROJECT ARONUI)**
Te Kete Ako is evolving into an intelligent, culturally-responsive educational platform that:
- **Personalizes learning** through GraphRAG-powered recommendations
- **Respects cultural knowledge** with authentic Te Ao Māori integration  
- **Supports educators** with professional-quality resources
- **Engages learners** through interactive, culturally-grounded experiences

---

## 🤝 **COLLABORATION PROTOCOLS**

### **Git Workflow**
```bash
# Always check status before starting
git status

# Create descriptive commits with cultural context
git commit -m "FEATURE: Add cultural greetings to authentication system

- Integrate authentic Te Reo Māori phrases
- Maintain cultural safety protocols
- Enhance user experience with bilingual support"

# Deploy changes
git push origin main
```

### **Communication Standards**
- **Progress Updates**: Use descriptive commit messages
- **Cultural Questions**: Always err on side of caution, ask for guidance
- **Technical Issues**: Document problems and solutions clearly
- **Success Stories**: Celebrate achievements and cultural authenticity wins

---

## 🎯 **READY TO CODE!**

You're now equipped to continue building Te Kete Ako - a platform that combines cutting-edge technology with deep cultural respect. The foundation is solid, the direction is clear, and the impact will be meaningful.

**Key Contact Points:**
- **Supabase Dashboard**: https://nlgldaqtubrlcqddppbq.supabase.co
- **Live Platform**: https://tekete.netlify.app  
- **Repository**: Current working directory with full Git history

**Remember**: Every line of code serves both technical excellence and cultural integrity. Build with manaakitanga (care for others) and commitment to educational excellence.

**Kia kaha! (Stay strong!) The learners of Aotearoa are counting on us.**

---

*Last Updated: July 31, 2025 | Status: Production Ready | Cultural Review: ✅ Approved*