# Te Kete Ako Style Guide for Gemini Content Generation

## 🎨 **CSS Classes & Components Reference**

### **Core Layout Structure**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[PAGE TITLE] | Te Kete Ako</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <!-- Header will be auto-injected by our scripts -->
    
    <div class="main-container">
        <aside class="left-sidebar">
            <!-- Sidebar content -->
        </aside>
        
        <main class="content-area">
            <!-- Main content here -->
        </main>
    </div>
    
    <!-- Footer will be auto-injected by our scripts -->
</body>
</html>
```

### **Essential CSS Classes for Content**

#### **Typography & Headings**
```css
/* Use these heading classes */
.page-title          /* Main page heading */
.section-title       /* Section headings */
.subsection-title    /* Subsection headings */

/* Text styles */
.cultural-emphasis   /* For Te Reo Māori terms */
.highlight          /* Important terms */
.muted-text         /* Secondary information */
```

#### **Content Containers**
```css
.handout-container    /* Wrapper for handout content */
.lesson-container     /* Wrapper for lesson content */
.unit-container       /* Wrapper for unit content */

.content-section      /* Major content sections */
.activity-box         /* Individual activities */
.assessment-box       /* Assessment sections */
.cultural-protocol-box /* Cultural guidance sections */
```

#### **Interactive Elements**
```css
.technique-box        /* Individual techniques/concepts */
.example-box          /* Example sections */
.question-box         /* Discussion questions */
.reflection-box       /* Reflection activities */

.grid                 /* Grid layout container */
.grid-cols-2          /* 2-column grid */
.grid-cols-3          /* 3-column grid */
```

#### **Cultural Design Elements**
```css
.cultural-accent      /* Cultural background styling */
.maori-pattern        /* Traditional pattern backgrounds */
.bicultural-section   /* Sections with both languages */
.whakataukī          /* Traditional saying styling */
```

#### **Color System Variables**
```css
/* Primary colors for backgrounds and text */
var(--color-primary)      /* #1a1a1a - Deep Charcoal */
var(--color-secondary)    /* #00b0b9 - Turquoise Blue */
var(--color-accent)       /* #f5a623 - Golden Yellow */
var(--color-maori-red)    /* #d83c3e - Traditional Red */
var(--color-earth)        /* #8b6f47 - Earth Brown */
var(--color-forest)       /* #2C5F41 - Forest Green */

/* Background colors */
var(--color-background)   /* #ffffff - White */
var(--color-surface)      /* #ffffff - Card backgrounds */
var(--color-cultural-light) /* #f0f8f0 - Light cultural bg */
```

## 📝 **Content Templates for Gemini**

### **Handout Template**
```html
<div class="handout-container">
    <div class="page-header">
        <h1 class="page-title">[TITLE]</h1>
        <p class="cultural-emphasis" lang="mi">[TE REO MĀORI SUBTITLE]</p>
        <p class="handout-description">[DESCRIPTION]</p>
    </div>

    <section class="content-section">
        <h2 class="section-title">[SECTION TITLE]</h2>
        <div class="technique-box">
            <h3>[TECHNIQUE NAME]</h3>
            <p>[EXPLANATION]</p>
            <div class="example-box">
                <strong>Example:</strong> [EXAMPLE TEXT]
            </div>
        </div>
    </section>

    <section class="assessment-box">
        <h2>Assessment Activities</h2>
        <div class="grid grid-cols-2">
            <div class="question-box">
                <h3>Critical Thinking</h3>
                <ul>
                    <li>[QUESTION 1]</li>
                    <li>[QUESTION 2]</li>
                </ul>
            </div>
            <div class="reflection-box">
                <h3>Cultural Connections</h3>
                <p>[CULTURAL REFLECTION PROMPT]</p>
            </div>
        </div>
    </section>
</div>
```

### **Cultural Integration Requirements**

#### **Te Reo Māori Integration**
- Always include Te Reo Māori terms with proper `lang="mi"` attributes
- Use `.cultural-emphasis` class for Māori terms
- Include glossary sections with bilingual definitions

#### **Whakataukī (Proverbs)**
```html
<div class="cultural-protocol-box">
    <p class="whakataukī" lang="mi">"[MĀORI PROVERB]"</p>
    <p class="proverb-translation">[ENGLISH TRANSLATION]</p>
    <p class="cultural-context">[CULTURAL CONTEXT EXPLANATION]</p>
</div>
```

#### **Assessment Integration**
- Always include both formative and summative assessment options
- Use PEEL paragraph structure for writing activities
- Include peer collaboration opportunities
- Connect to Te Ao Māori perspectives

## 🎯 **Subject-Specific Guidelines**

### **English/Literacy**
- Focus on author's purpose, rhetorical devices, media literacy
- Include diverse cultural perspectives in text selection
- Integrate oral tradition and storytelling elements

### **Social Studies**
- Center Indigenous perspectives and decolonized history
- Include contemporary social justice connections
- Use primary sources from Māori perspectives when possible

### **Science/STEM**
- Connect traditional Māori knowledge (mātauranga Māori) with Western science
- Include environmental stewardship (kaitiakitanga) concepts
- Use place-based learning examples from Aotearoa

## 📊 **Quality Checklist for Generated Content**

### **Technical Requirements**
- [ ] Proper HTML structure with semantic elements
- [ ] CSS classes from this style guide used correctly
- [ ] Mobile-responsive design considerations
- [ ] Print-friendly formatting (no-print classes where needed)

### **Cultural Requirements**
- [ ] Te Reo Māori terms included with proper attributes
- [ ] Cultural context provided for all Māori concepts
- [ ] Respectful representation of Indigenous knowledge
- [ ] Contemporary relevance clearly established

### **Educational Requirements**
- [ ] Clear learning objectives stated
- [ ] Multiple assessment options provided
- [ ] Differentiation strategies included
- [ ] Connection to NZ Curriculum standards

### **Accessibility Requirements**
- [ ] Alt text for all images
- [ ] Proper heading hierarchy (h1, h2, h3...)
- [ ] High contrast color combinations
- [ ] Clear, readable font sizes

## 🔄 **Workflow Integration**

1. **Generate Content**: Use templates and style guide
2. **Cultural Review**: Human review for cultural accuracy
3. **Technical Processing**: Automated scripts add headers/footers
4. **Quality Assurance**: Link checking and validation
5. **Deployment**: Push to development branch first

This style guide ensures all Gemini-generated content maintains the high cultural and technical standards of Te Kete Ako while enabling efficient bulk content creation.