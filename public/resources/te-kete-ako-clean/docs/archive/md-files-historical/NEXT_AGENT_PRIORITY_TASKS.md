# 🎯 Next Agent Priority Tasks
*Converted from source control notes and handoff instructions*

## 🚨 **CRITICAL INFRASTRUCTURE ISSUES**

### **1. Public Folder Sync Problem (URGENT)**
- **Issue**: Duplicate content between root and `/public/` folder causing deployment sync issues
- **Impact**: Changes not reflected on live site (tekete.netlify.app)
- **Root Cause**: Netlify build process may be using `/public/` as source instead of root
- **Solution Required**: 
  - Check netlify.toml publish directory setting
  - Consolidate or eliminate duplicate public folder structure
  - Ensure single source of truth for deployment

### **2. Authentication System Fix (CRITICAL)**
- **Current Error**: `Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)`
- **Issue**: Supabase integration not fully working, Firebase references still present
- **Files to Fix**:
  - Remove any remaining Firebase references in HTML files
  - Complete Supabase authentication integration testing
  - Verify shared-components.js Supabase client initialization

## 📋 **HIGH PRIORITY CONTENT TASKS**

### **3. Dictionary API Integration (From TODO Notes)**
- **File**: `js/spelling-bee-game.js` line 66
- **Current Status**: Placeholder dictionary system
- **Required Integration**:
  - Merriam-Webster API for English words
  - Authentic Māori dictionary API for Te Reo words
  - Remove hardcoded word arrays and replace with API calls

### **4. Constant Folder Sweep System**
- **Need**: Automated system to keep root and public folders in sync
- **Create**: Script to continuously monitor and sync content
- **Prevent**: Future content duplication and deployment issues

## 🛠️ **IMMEDIATE ACTION PLAN**

### **Step 1: Fix Deployment (URGENT)**
```bash
# Check netlify.toml configuration
cat netlify.toml | grep -i publish

# If publish = "public", change to publish = "."
# OR eliminate duplicate public folder content
```

### **Step 2: Authentication Testing**
```bash
# Test Supabase connection
# Check browser console for authentication errors
# Verify user registration/login flows work
```

### **Step 3: Content Sync Solution**
```bash
# Create sync script to maintain consistency
# Set up automated folder monitoring
# Implement deployment verification checks
```

## 📚 **CONVERTED FROM SOURCE CONTROL NOTES**

### **Original Note Locations Addressed**:
1. **KAITIAKI_CLAUDE_SESSION_HANDOFF_JULY_31_2025.md** → External resource integration priorities
2. **GRAPHRAG_COORDINATION_UPDATE.md** → Next agent GraphRAG enhancement tasks  
3. **DEVELOPMENT_TOOLS_AND_RESOURCES_GUIDE.md** → Focus area recommendations
4. **TODO_create-missing-files.md** → Missing content creation tasks

### **Key Discoveries Requiring Follow-up**:
- **GraphRAG System**: 163 resources indexed, ready for intelligent recommendations
- **Cultural Content**: 24 high-cultural resources need validation and enhancement
- **Interactive Tools**: Government power matching tool needs expansion
- **Assessment Framework**: Rubrics and project briefs ready for teacher feedback

## 🎭 **CULTURAL SAFETY REMINDERS**

### **Authentication Cultural Integration**:
- Maintain bilingual Te Reo Māori greetings
- Preserve educational profile structure (student/teacher/whānau)
- Test cultural greeting rotation system

### **Content Enhancement Priorities**:
- Validate existing whakataukī for cultural accuracy
- Ensure authentic Te Reo pronunciation guides
- Maintain cultural authenticity protocols in all new content

## ⚡ **SUCCESS CRITERIA**

### **Infrastructure Fixed When**:
- [ ] Live site reflects local changes immediately after git push
- [ ] Authentication system works without Firebase errors
- [ ] Public folder sync issue resolved permanently
- [ ] No duplicate content between root and public directories

### **Content Enhanced When**:
- [ ] Dictionary APIs integrated and working
- [ ] Constant sweep system monitoring folder consistency
- [ ] All placeholder content replaced with production-ready alternatives
- [ ] Cultural authenticity maintained throughout all changes

---

**Ready for next agent to tackle these priority infrastructure and content issues!** 

*These tasks build on the solid foundation established (GraphRAG, security, cultural integration) and focus on resolving the final technical barriers to seamless deployment and user experience.*