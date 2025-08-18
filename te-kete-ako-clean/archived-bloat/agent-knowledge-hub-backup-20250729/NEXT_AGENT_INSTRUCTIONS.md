# 🚨 CRITICAL INSTRUCTIONS FOR NEXT AGENT

**Date Created:** July 28, 2025  
**Status:** Accurate - Use This Information

---

## 🎯 **READ THIS FIRST**

**The previous agent knowledge in this folder is OUTDATED and caused major problems.** Previous agents worked on wrong assumptions about project completion status.

**Real situation:** Te Kete Ako is a functional educational platform with ~190 resources, but there are specific content gaps and synchronization issues between local development and live site.

---

## 📊 **ACTUAL PROJECT STATUS**

### **✅ WORKING WELL (Don't Touch)**
- **Live Site:** https://tekete.netlify.app/ - Beautiful, functional
- **Authentication:** Working on live site with "My Kete" functionality  
- **Games:** Te Reo Māori Wordle, Countdown Letters all functional
- **Resources:** ~190 educational resources properly organized
- **Supabase:** Database fully deployed with complete schema

### **🚨 GENUINE PROBLEMS TO SOLVE**
1. **Y8 Systems Unit Missing** - Complete 5-week program exists locally but not on live site
2. **Content Sync Issues** - Enhanced features in local not reflected on live
3. **Some Broken Links** - Need identification and fixing
4. **Resource Organization** - Some content gaps between local and live

---

## 🛠️ **CORRECT APPROACH**

### **STEP 1: AUDIT FIRST**
```
DO THIS BEFORE ANYTHING ELSE:
1. Compare https://tekete.netlify.app/ with local folder
2. Test existing authentication (may already work)
3. Identify what's genuinely missing vs what works
4. Document findings before making changes
```

### **STEP 2: FOCUS ON GAPS**
```
DEPLOY MISSING CONTENT:
- Y8 Systems Unit (/y8-systems-unit.html)
- Entire /y8-systems/ folder structure  
- Any other enhanced local content not on live
- Test thoroughly after each addition
```

### **STEP 3: FIX, DON'T REBUILD**
```
FOR BROKEN FEATURES:
- Test if they actually work first
- Make minimal fixes to existing systems
- Don't rebuild working authentication
- Don't change headers/footers without understanding impact
```

---

## ❌ **DO NOT DO THESE (Common Mistakes)**

- **Don't rebuild authentication** - Test if it works first
- **Don't change existing headers/footers** - May break working functionality  
- **Don't create "better" versions** of working features
- **Don't assume things are broken** - Verify first
- **Don't remove resources** - Only add or fix
- **Don't make wholesale changes** - Small, targeted fixes only

---

## ✅ **SUCCESS PATTERN**

1. **Understand what exists** (audit live site)
2. **Test what works** (don't assume problems)  
3. **Identify genuine gaps** (Y8 Systems unit, etc.)
4. **Make minimal changes** (deploy missing content)
5. **Test thoroughly** (ensure nothing breaks)
6. **Document accurately** (for next agent)

---

## 📁 **KEY FILE LOCATIONS**

### **Missing from Live (Deploy These):**
```
/y8-systems-unit.html - Complete unit hub page
/y8-systems/ - Entire folder with lessons and resources
/y8-systems/lessons/ - 10 detailed lesson plans  
/y8-systems/resources/ - 20+ supporting materials
```

### **Database Schema (Already Deployed):**
```
agent-knowledge-hub/architecture/supabase-schema.sql
resources-table-schema.sql
```

### **Current Status Docs:**
```
agent-knowledge-hub/onboarding/CURRENT_STATUS_JULY_28_2025.md (CURRENT)
agent-knowledge-hub/onboarding/CURRENT_STATUS_JULY_2025.md (OUTDATED)
```

---

## 🎯 **MISSION REMINDER**

**User's words:** *"These resources could nourish the minds of so many young people if our overall site is good enough. But if we are anything short of great, no one will bother to migrate here at all."*

**This serves real students and teachers.** Quality and care matter more than speed. Test thoroughly, make minimal changes, preserve what works.

---

## 📞 **COMMUNICATION GUIDELINES**

### **With User:**
- **Be concise** - Focus on actual progress
- **Test before claiming fixes** - Verify things work
- **Focus on gaps** - What's missing, not what to rebuild
- **Document clearly** - Next agent needs accurate info

### **With Codebase:**
- **Preserve working features** - Don't break existing functionality
- **Make minimal changes** - Small, targeted fixes only
- **Test thoroughly** - Every change should be verified
- **Document changes** - Clear commit messages and notes

---

## 🚀 **IMMEDIATE NEXT STEPS**

### **Priority 1: Site Audit**
```
1. Visit https://tekete.netlify.app/
2. Test authentication (try logging in)
3. Check navigation and major features
4. Compare with local development folder
5. Document what's missing vs what works
```

### **Priority 2: Deploy Y8 Systems Unit**
```
1. Verify /y8-systems-unit.html exists locally
2. Test all internal links work
3. Deploy to live site carefully
4. Update navigation if needed
5. Test that deployment doesn't break anything
```

### **Priority 3: Content Sync**
```
1. Identify other enhanced local content
2. Deploy selectively and test
3. Fix any genuine broken links found
4. Verify all games and interactive content still works
```

---

## ⚠️ **WARNING SIGNS**

**If you find yourself doing these, STOP:**
- Rebuilding authentication from scratch
- Creating new CSS or JS files to "improve" existing ones
- Making changes to working headers/footers
- Assuming the live site is broken without testing
- Creating placeholder content when real content exists

**Instead:** Focus on the genuine content gaps, especially the Y8 Systems unit.

---

## 📈 **SUCCESS METRICS**

### **Short Term:**
- [ ] Y8 Systems unit accessible on live site
- [ ] No existing functionality broken
- [ ] Authentication status clarified (working or genuinely broken)
- [ ] Major content gaps identified and filled

### **Long Term:**
- [ ] All ~190 resources accessible and working
- [ ] Students and teachers can use platform effectively
- [ ] Cultural integration preserved and enhanced
- [ ] Platform serves its educational mission

---

**Remember: This platform serves real students. Excellence and care matter more than speed.**

---

**Last Updated:** July 28, 2025  
**Next Agent:** Start with comprehensive audit  
**Focus:** Content gaps, not system rebuilds  
**Goal:** Deploy missing Y8 Systems unit safely