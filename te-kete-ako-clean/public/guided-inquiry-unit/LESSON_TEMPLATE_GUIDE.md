# 🎓 Te Kete Ako Lesson Template Guide

**For Rapid, Professional Lesson Development**  
*Version 1.0 - Based on Guided Inquiry Unit Success*

---

## 🎯 Template Purpose

This guide enables **rapid creation of professional-quality lessons** that match the established standards in the Guided Inquiry Unit. Use this template to create lessons that are:

- **Culturally authentic** with proper Te Ao Māori integration
- **Pedagogically sound** with clear learning progressions
- **Student-centered** with engaging activities and materials
- **Print-ready** with downloadable resources
- **Curriculum-aligned** to NZ standards

---

## 📋 Required Lesson Components

### 1. **Cultural Opening** (Required)
```html
<div class="cultural-opening">
    <h2>Whakataukī | Proverb</h2>
    <p class="proverb">[Māori proverb relevant to lesson theme]</p>
    <p class="translation">[English translation]</p>
    <p class="context">[Connection to lesson learning - 1-2 sentences]</p>
</div>
```

**Guidelines:**
- Choose whakataukī that genuinely connects to lesson content
- Provide accurate translation and pronunciation guide if needed
- Explain relevance respectfully, not tokenistically

### 2. **Lesson Header Structure**
```html
<div class="lesson-header">
    <div class="lesson-meta">
        <h1>[Icon] Lesson [Number]: [Title]</h1>
        <div class="lesson-details">
            <span class="duration">⏱️ [X] minutes</span>
            <span class="year-level">📚 Years [X-Y]</span>
            <span class="curriculum">🇳🇿 NZ Curriculum: [Subject] Level [X-Y]</span>
        </div>
    </div>
</div>
```

### 3. **Learning Objectives** (3-Column Format)
```html
<div class="objectives-grid">
    <div class="objective-card">
        <h3>Knowledge</h3>
        <ul>
            <li>[Content students will understand]</li>
            <li>[Facts, concepts, principles they'll learn]</li>
        </ul>
    </div>
    <div class="objective-card">
        <h3>Skills</h3>
        <ul>
            <li>[What students will be able to do]</li>
            <li>[Processes, techniques they'll develop]</li>
        </ul>
    </div>
    <div class="objective-card">
        <h3>Values</h3>
        <ul>
            <li>[Attitudes and dispositions to develop]</li>
            <li>[Cultural perspectives to appreciate]</li>
        </ul>
    </div>
</div>
```

### 4. **Lesson Structure** (Detailed Phases)

**Template for each phase:**
```html
<div class="lesson-phase">
    <h3>[Icon] Phase Name ([X] minutes)</h3>
    <div class="phase-content">
        <h4>Main Activity</h4>
        <ul>
            <li><strong>Activity 1:</strong> Clear description with timing ([X] minutes)</li>
            <li><strong>Activity 2:</strong> Step-by-step instructions ([X] minutes)</li>
        </ul>
        <div class="teacher-note">
            <strong>Teacher Note:</strong> Practical implementation guidance
        </div>
        <div class="differentiation">
            <strong>Differentiation:</strong> Support strategies for diverse learners
        </div>
    </div>
</div>
```

**Standard Lesson Phases:**
1. **Opening/Karakia** (5-10 minutes)
2. **Main Learning Activities** (20-30 minutes)
3. **Application/Practice** (10-15 minutes)
4. **Reflection/Consolidation** (5-10 minutes)

---

## 📚 Materials & Resources Section

### Required Components:
```html
<div class="materials-grid">
    <div class="material-card">
        <h3>📄 Downloadable Materials</h3>
        <ul>
            <li><a href="../materials/[filename].html">[Material Name]</a></li>
        </ul>
    </div>
    <div class="material-card">
        <h3>🔗 Digital Resources</h3>
        <ul>
            <li><a href="[internal-link]">[Resource Name]</a></li>
        </ul>
    </div>
    <div class="material-card">
        <h3>🎯 Assessment Tools</h3>
        <ul>
            <li>[Assessment tool or rubric name]</li>
        </ul>
    </div>
</div>
```

---

## 🌿 Cultural Safety Requirements

### Mandatory Elements:
1. **Cultural Safety Section** at bottom of lesson
2. **Community Partnership References** where appropriate
3. **Accurate Cultural Content** - no tokenism or stereotypes
4. **Respectful Language** throughout all materials
5. **Cultural Context** - explain significance, don't just decorate

### Template:
```html
<section class="lesson-section cultural-safety">
    <h2>🌿 Cultural Safety & Teaching Notes</h2>
    <div class="safety-guidelines">
        <h3>Cultural Safety Protocols</h3>
        <ul>
            <li><strong>[Specific cultural consideration]:</strong> [Explanation]</li>
        </ul>
    </div>
</section>
```

---

## 📊 Assessment Framework

### Required Assessment Elements:
1. **Clear Success Criteria** aligned to learning objectives
2. **Formative Assessment** opportunities throughout lesson
3. **Differentiated Assessment** options for diverse learners
4. **Cultural Responsiveness** in assessment approaches

### Assessment Template:
```html
<section class="lesson-section">
    <h2>📊 Assessment & Next Steps</h2>
    <div class="assessment-section">
        <h3>Assessment Criteria</h3>
        <ul>
            <li><strong>[Criterion]:</strong> [Description of what success looks like]</li>
        </ul>
    </div>
</section>
```

---

## 🔗 File Structure & Naming

### Lesson Files:
- **Location:** `/guided-inquiry-unit/lessons/`
- **Naming:** `lesson-[number]-[short-title].html`
- **Example:** `lesson-5-culture-integration.html`

### Material Files:
- **Location:** `/guided-inquiry-unit/materials/`
- **Naming:** `[descriptive-name].html`
- **Example:** `cultural-lens-analysis-template.html`

### CSS Classes to Use:
- `.lesson-phase` - for main lesson sections
- `.teacher-note` - for implementation guidance
- `.differentiation` - for inclusive teaching strategies
- `.cultural-note` - for cultural safety reminders
- `.assessment-opportunity` - to highlight assessment moments

---

## ⚡ Quick Development Checklist

### Before Starting:
- [ ] Choose appropriate whakataukī with cultural consultation
- [ ] Identify 3-4 main learning objectives
- [ ] Plan 4-5 lesson phases with specific timings
- [ ] Design 2-3 downloadable materials

### During Development:
- [ ] Include cultural opening with meaningful connection
- [ ] Provide detailed timing for each activity
- [ ] Add teacher notes for practical implementation
- [ ] Include differentiation strategies
- [ ] Link to existing Te Kete Ako resources
- [ ] Create assessment opportunities throughout

### Before Publishing:
- [ ] Check all internal links work
- [ ] Ensure cultural content is accurate and respectful
- [ ] Verify timing adds up to lesson duration
- [ ] Test downloadable materials
- [ ] Add to main lessons.html page for discoverability

---

## 🌟 Success Standards

**A successful Te Kete Ako lesson:**
1. **Engages** students from the cultural opening
2. **Scaffolds** learning through clear phases
3. **Includes** everyone through differentiation
4. **Connects** to Te Ao Māori authentically
5. **Provides** practical materials teachers can use immediately
6. **Aligns** with NZ Curriculum requirements
7. **Builds** toward clear learning outcomes

---

## 📖 Examples to Study

**Best Practice Examples:**
- `lesson-1-society-exploration.html` - Excellent cultural integration
- `lesson-5-culture-integration.html` - Strong differentiation strategies
- `lesson-6-presentations.html` - Comprehensive assessment framework

**Material Examples:**
- `cultural-lens-analysis-template.html` - Student-friendly worksheet design
- `society-exploration-gallery-walk-stations.html` - Printable classroom materials

---

## 🚀 Scaling Strategy

**For Rapid Unit Development:**
1. **Use this template** for consistent quality
2. **Adapt existing materials** rather than creating from scratch
3. **Create material templates** that can be reused across lessons
4. **Build assessment frameworks** that span multiple lessons
5. **Connect to existing resources** in Te Kete Ako ecosystem

**Quality Control:**
- Every lesson should be usable by a teacher with minimal prep
- All cultural content should be reviewed for authenticity
- Materials should print clearly and be accessible
- Assessment should provide clear evidence of learning

---

*This template enables the "truck tonne of progress" approach by ensuring every new lesson meets established professional standards while allowing for rapid, efficient development.*

**Ready to scale! 🚀**