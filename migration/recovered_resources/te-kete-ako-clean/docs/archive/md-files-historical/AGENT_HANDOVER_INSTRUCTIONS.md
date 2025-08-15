# 🤖 Agent Handover Instructions - Te Kete Ako Development

## 📊 **Current Status Summary**

### ✅ **COMPLETED MAJOR WORK**
- **100% Header Consistency** - All 480+ files have proper navigation
- **Bilingual Navigation** - Te Reo Māori properly integrated sitewide  
- **Footer Consistency** - 32+ priority pages improved
- **Development Workflow** - Complete automation system deployed
- **Polish Improvements** - Critical user-facing TODOs resolved

### ⚠️ **REMAINING WORK (208 TODOs, 335 Broken Links)**

## 🎯 **PRIORITY TASKS FOR NEXT SESSION**

### **HIGH PRIORITY (Do First)**

1. **Broken Link Resolution** (335 items)
   ```bash
   python3 check-all-links.py  # Run to get current broken links
   ```
   - Focus on critical navigation links first
   - Many are template literal issues: `${resource.path}` in JS files
   - Some are missing resource pages that need creation

2. **Template Literal Fixes in JavaScript**
   - Found in: `graphrag-search.html`, `my-submissions.html`, other dynamic pages
   - Search pattern: `\\$\\{.*\\}` in HTML files
   - Replace with actual paths or fix JavaScript templating

3. **Complete Footer Deployment**
   ```bash
   python3 fix-footer-consistency.py  # Run on remaining 400+ files
   ```
   - Current script limited to 50 files
   - Remove limit and process all remaining pages

### **MEDIUM PRIORITY**

4. **Content Gap Resolution** (655 Gemini tasks available)
   ```bash
   # Review gap analysis
   cat content_gap_analysis.json | jq '.summary'
   
   # Use pre-built prompts
   cat templates/gemini_batch_prompts.json
   ```
   - 27 structured prompts ready for Gemini
   - Focus on high-traffic pages first
   - Ensure cultural accuracy review

5. **Missing Resource Creation**  
   - Use `analyze-content-gaps.py` output to identify priorities
   - Create placeholder pages for broken internal links
   - Use templates in `GEMINI_STYLE_GUIDE.md`

### **LOW PRIORITY**

6. **Advanced Polish**
   - Mobile responsiveness audit
   - Accessibility improvements  
   - Performance optimizations

## 🛠️ **AVAILABLE TOOLS & SCRIPTS**

### **Core Automation Scripts**
```bash
# Header consistency (COMPLETED)
python3 fix-sitewide-headers.py

# Footer consistency (PARTIALLY COMPLETE)  
python3 fix-footer-consistency.py

# Content gap analysis
python3 analyze-content-gaps.py

# Link validation
python3 check-all-links.py

# Bulk handout generation
python3 create-bulk-handouts.py
```

### **Development Workflow**
```bash
# Safe development
git checkout -b feature/your-task-name
# ... make changes ...
git commit -m "feat: description"
git checkout main
git merge feature/your-task-name
git push origin main
```

## 📋 **SPECIFIC TODO LOCATIONS**

### **JavaScript Template Issues**
- **graphrag-search.html**: Line ~465+ (search functionality)
- **my-submissions.html**: Lines 680+685 (PDF/file viewer functions)
- **Multiple files**: Search for `\\$\\{` pattern

### **Missing Pages** (From broken link analysis)
- `activities.html?type=warmup` → Create anchor-based navigation
- Various handout references → Use Gemini generation system
- Unit lesson pages → High priority for teachers

### **Placeholder Content** (1016 instances found)
- Empty `<p></p>` tags throughout site
- "Coming soon" messages  
- Lorem ipsum text
- Incomplete lesson content

## 🎨 **Design & Cultural Standards**

### **Cultural Requirements** (CRITICAL)
- All new content MUST include Te Reo Māori integration
- Use `lang="mi"` attributes for Māori text
- Include whakataukī (proverbs) where appropriate
- Validate cultural accuracy with community members

### **CSS Classes to Use**
- Reference: `GEMINI_STYLE_GUIDE.md`
- Key classes: `.cultural-emphasis`, `.technique-box`, `.assessment-box`
- Color scheme: Maintain existing Te Kete Ako cultural palette

### **Template Structure**
```html
<div class="handout-container">
    <div class="page-header">
        <h1 class="page-title">[TITLE]</h1>
        <p class="cultural-emphasis" lang="mi">[MĀORI SUBTITLE]</p>
    </div>
    <!-- Content sections -->
</div>
```

## 📊 **Success Metrics**

### **Immediate Goals**
- [ ] Reduce broken links from 335 to <50
- [ ] Complete footer consistency (480 files)
- [ ] Fix all JavaScript template literals
- [ ] Create 10+ missing high-priority pages

### **Session Goals** 
- [ ] Process 50+ TODO items
- [ ] Maintain 100% header consistency
- [ ] Deploy changes to production via git push
- [ ] Update this handover document

## 🚨 **CRITICAL REMINDERS**

1. **Always test changes locally first**
2. **Commit frequently with clear messages**  
3. **Maintain cultural sensitivity and accuracy**
4. **Use automation scripts rather than manual editing**
5. **Push to production when ready: `git push origin main`**
6. **Update progress in todo system using TodoWrite tool**

## 📈 **Resource Count Clarification**
- **480 total HTML files** (all site files)
- **~340 educational resources** (handouts, lessons, units, games)  
- **236 files processed** by header script
- **NOT 624+** - that included non-HTML assets

## 💡 **Smart Development Approach**
- Use bulk operations over individual file editing
- Leverage Gemini for content generation (with human review)
- Maintain systematic approach to consistency
- Focus on user-facing improvements first

---

**Good luck! The foundation is solid - you're building on a professionally polished, culturally authentic educational platform. Focus on the broken links and TODOs for maximum impact.**