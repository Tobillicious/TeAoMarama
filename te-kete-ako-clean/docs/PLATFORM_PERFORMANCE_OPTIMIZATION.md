# 🚀 Platform Performance Optimization Plan

## 🎯 IDENTIFIED PERFORMANCE ISSUES

### **Critical Issues:**
1. **Massive HTML Files**: `curriculum-alignment.html` (171K, 2295 lines)
2. **1850+ Broken Links**: Causing 404 errors and poor UX
3. **Bloated File Structure**: Excessive historical files in root directory
4. **Search Performance**: GraphRAG search needs optimization

### **Site Loading Issues:**
- Large files block initial page render
- Multiple 404s slow down navigation
- Excessive DOM complexity in curriculum page
- Missing lazy loading for large content sections

## 🛠️ OPTIMIZATION STRATEGY

### **Phase 1: Large File Optimization**
**Target: `curriculum-alignment.html` (171K → <50K)**

**Problem Analysis:**
- 2295 lines of mostly repetitive curriculum data
- Should be split into manageable sections
- Needs lazy loading implementation
- Data should be JSON + dynamic rendering

**Solution:**
1. Extract curriculum data to `data/nz-curriculum.json`
2. Create lightweight HTML shell with dynamic loading
3. Implement section-based loading (English, Math, Science, etc.)
4. Add search/filter functionality for curriculum standards

### **Phase 2: Broken Link Mass Fix**
**Target: 1850+ broken links → <100**

**Strategy:**
- Run automated link fixing in batches of 200
- Focus on high-traffic pages first (index, unit pages, main handouts)
- Create redirect rules for commonly broken patterns
- Remove or replace dead external links

### **Phase 3: Search & Navigation Optimization**
**Target: Improve GraphRAG response time**

**Issues:**
- GraphRAG queries can be slow on large knowledge base
- Navigation menus have inconsistent behavior
- Search interface needs better UX

**Solutions:**
- Implement caching for common GraphRAG queries
- Pre-index frequently searched terms
- Optimize Neo4j query patterns
- Add progressive search suggestions

### **Phase 4: File Structure Cleanup**
**Target: Remove development bloat**

**Current Problems:**
- Multiple duplicate/backup files
- Development tools mixed with production content
- Excessive MD documentation files
- Large unused assets

## 🔧 IMPLEMENTATION TASKS

### **Immediate Actions (High Impact, Low Effort):**

1. **Split Curriculum File**
   ```bash
   # Extract sections into separate files
   - curriculum-english.html
   - curriculum-mathematics.html
   - curriculum-science.html
   - curriculum-social-studies.html
   ```

2. **Batch Link Fixing**
   ```bash
   python3 fix-broken-links.py --limit 200 --priority high-traffic
   ```

3. **Asset Optimization**
   - Compress large images
   - Minify CSS/JS for production
   - Remove unused font variants

### **Technical Improvements:**

1. **Lazy Loading Implementation**
   ```javascript
   // Add intersection observer for curriculum sections
   const observer = new IntersectionObserver(loadSection);
   ```

2. **GraphRAG Query Caching**
   ```python
   # Cache frequent queries for 15 minutes
   @cache(minutes=15)
   def common_queries()
   ```

3. **Progressive Enhancement**
   - Core content loads first
   - Enhanced features load progressively
   - Graceful degradation for slow connections

## 📊 SUCCESS METRICS

### **Before Optimization:**
- `curriculum-alignment.html`: 171K
- Broken links: 1850+
- Page load time: ~3-5 seconds
- GraphRAG query time: 2-4 seconds

### **Target Performance:**
- Largest HTML file: <50K
- Broken links: <100
- Page load time: <2 seconds
- GraphRAG query time: <1 second

## 🚨 CRITICAL USER IMPACT

**Current Problems:**
- Teachers can't quickly find curriculum standards
- Broken links create frustration and abandonment
- Slow search makes resource discovery difficult
- Large pages consume mobile data

**Post-Optimization Benefits:**
- Fast curriculum lookup by subject/level
- Reliable navigation throughout site
- Quick resource discovery via search
- Mobile-friendly performance

## 🎯 PRIORITY ORDER

1. **Authentication Fix** ✅ COMPLETED
2. **Split Large Curriculum File** (30 min task, huge impact)
3. **Mass Link Fixing** (automated, run in background)
4. **Search Optimization** (improve core functionality)
5. **File Structure Cleanup** (maintenance)

## 🔄 NEXT ACTIONS

**Immediate:** Split curriculum file into subject sections
**Continuous:** Run link fixing in batches during low usage
**Weekly:** Monitor performance metrics and user feedback

This performance optimization will transform the platform from sluggish to snappy - essential for teacher adoption and student engagement.