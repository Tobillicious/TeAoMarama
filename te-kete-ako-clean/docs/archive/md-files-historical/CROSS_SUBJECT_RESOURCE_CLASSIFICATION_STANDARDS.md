# 📊 CROSS-SUBJECT RESOURCE CLASSIFICATION STANDARDS
**Te Kete Ako Platform - Intelligent Subject Organization Framework**  
**Version:** 1.0  
**Date:** July 29, 2025  
**Purpose:** Define clear standards for categorizing resources across multiple subject areas

---

## 🎯 **CLASSIFICATION PRINCIPLE**

### **Core Challenge:**
All quality New Zealand educational resources integrate:
- **Te Ao Māori perspectives** (cultural responsiveness requirement)
- **Literacy skills** (reading, writing, communication across all subjects)
- **Numeracy applications** (mathematical thinking in all contexts)

### **Solution Framework:**
**PRIMARY SUBJECT CLASSIFICATION** based on dominant learning objectives and content focus, with **secondary subject tags** for cross-curricular integration.

---

## 📏 **PRIMARY SUBJECT CLASSIFICATION CRITERIA**

### **🌿 Te Ao Māori (Primary Classification)**
**Criteria for PRIMARY Te Ao Māori classification:**
- **≥50% of content** focuses on Māori knowledge systems, cultural practices, or Te Reo Māori
- **Primary learning objective** is cultural understanding or traditional knowledge acquisition  
- **Essential or High cultural level** in our cultural integration rating
- **Māori concepts** are the central organizing principle, not supportive elements

**Examples:**
- ✅ **Digital Pūrākau** - Primary focus on Māori storytelling and cultural narratives
- ✅ **Māori Astronomy Navigation** - Traditional knowledge as primary content
- ✅ **Haka Cultural Significance** - Cultural understanding as main objective
- ❌ **Society Design with Māori Governance** - Social Studies primary, Māori perspective secondary

### **📖 English (Primary Classification)**
**Criteria for PRIMARY English classification:**
- **≥50% of learning time** spent on reading, writing, speaking, listening skills
- **Primary assessment** focuses on language arts achievement objectives
- **Text analysis, creative writing, or communication** as central organizing principle
- **Literature, poetry, or language mechanics** as main content focus

**Examples:**
- ✅ **Writer's Toolkit Unit** - Writing skills development as primary focus
- ✅ **Shakespeare Soliloquy Analysis** - Literary analysis as main objective  
- ✅ **Authors Purpose Handouts** - Reading comprehension as primary skill
- ❌ **Speech Analysis in Social Studies** - Social Studies primary, communication secondary

### **🏛️ Social Studies (Primary Classification)**
**Criteria for PRIMARY Social Studies classification:**
- **≥50% of content** addresses social organization, history, civics, or geography
- **Primary learning objective** relates to understanding societies, cultures, or historical processes
- **Inquiry into social issues** or cultural diversity as central organizing principle
- **Identity, culture, place, or participation** concepts as main focus

**Examples:**
- ✅ **Y8 Systems Unit** - How systems shape society as primary focus
- ✅ **Treaty of Waitangi Analysis** - Historical understanding as main objective
- ✅ **Dawn Raids Comprehension** - Social justice and historical analysis primary
- ❌ **Māori Governance Systems** - Could be Te Ao Māori primary if traditional knowledge focus

### **💻 Digital Technology (Primary Classification)**  
**Criteria for PRIMARY Digital Technology classification:**
- **≥50% of learning time** spent on technological design, digital systems, or computational thinking
- **Primary assessment** focuses on digital fluency or technological understanding
- **Technological outcomes** or digital citizenship as central organizing principle
- **AI, coding, digital design** as main content focus

**Examples:**
- ✅ **AI Ethics and Bias** - Digital citizenship as primary focus
- ✅ **Prompt Engineering 101** - Technological literacy as main objective
- ✅ **Sustainable Technology Design** - Technology design process primary
- ❌ **Digital Pūrākau Platform** - Cultural learning primary, technology secondary

### **🧮 Mathematics (Primary Classification)**
**Criteria for PRIMARY Mathematics classification:**
- **≥50% of learning time** spent on mathematical thinking, problem-solving, or quantitative reasoning
- **Primary assessment** focuses on mathematical achievement objectives
- **Number, algebra, geometry, statistics** as central organizing principle
- **Mathematical modeling** or quantitative analysis as main content

**Examples:**
- ✅ **Probability Handout** - Mathematical concepts as primary focus
- ✅ **Statistical Investigation** - Mathematical thinking as main objective
- ✅ **Traditional Navigation Mathematics** - Mathematics primary, cultural context secondary
- ❌ **Whakapapa Mathematical Thinking** - Could be Te Ao Māori primary if cultural focus dominant

### **🔬 Science (Primary Classification)**
**Criteria for PRIMARY Science classification:**
- **≥50% of content** addresses scientific inquiry, natural world understanding, or scientific literacy
- **Primary learning objective** relates to scientific knowledge or investigation skills
- **Scientific method** or evidence-based thinking as central organizing principle
- **Living world, material world, physical world** concepts as main focus

**Examples:**
- ✅ **Climate Science + Traditional Knowledge** - Scientific inquiry primary, cultural integration secondary
- ✅ **Microplastics Comprehension** - Environmental science as primary focus
- ✅ **Plate Tectonics** - Earth science as main objective
- ❌ **Traditional Ecological Indicators** - Could be Te Ao Māori primary if traditional knowledge focus

### **🎯 General Education (Primary Classification)**
**Criteria for PRIMARY General Education classification:**
- **Cross-curricular by design** - doesn't fit predominantly into one subject area
- **Transferable skills focus** (critical thinking, creativity, collaboration)
- **Generic competencies** as primary learning objective
- **Multiple subject integration** without one domain being dominant (≥50%)

**Examples:**
- ✅ **Design Thinking Process** - Transferable methodology across subjects
- ✅ **Critical Thinking Framework** - Generic thinking skills
- ✅ **Elements of Art** - Creative arts without specific subject focus
- ❌ **Film Scene Analysis for Literature** - English primary if text analysis focus

---

## 🏷️ **SECONDARY SUBJECT TAGGING SYSTEM**

### **Multi-Subject Resource Strategy:**
Every resource receives:
1. **ONE Primary Subject Classification** (main category for discovery)
2. **Multiple Secondary Subject Tags** (cross-curricular connections)
3. **Integration Level Indicators** (how deeply other subjects are integrated)

### **Secondary Tag Examples:**

#### **Writer's Toolkit Unit (Primary: English)**
- **Secondary Tags**: General Education (transferable skills), Te Ao Māori (cultural examples)
- **Integration Levels**: 
  - English: PRIMARY (90% - writing skills development)
  - General Education: HIGH (40% - transferable communication skills)
  - Te Ao Māori: MODERATE (15% - cultural examples in writing)

#### **Y8 Systems Unit (Primary: Social Studies)**
- **Secondary Tags**: Te Ao Māori (governance systems), Mathematics (systems modeling), English (comprehension)
- **Integration Levels**:
  - Social Studies: PRIMARY (75% - how systems shape society)
  - Te Ao Māori: HIGH (35% - Māori governance systems)
  - English: MODERATE (25% - reading comprehension activities)
  - Mathematics: LOW (10% - basic graphing and modeling)

#### **Digital Pūrākau (Primary: Te Ao Māori)**
- **Secondary Tags**: English (storytelling), Digital Technology (interactive platform), General Education (creativity)
- **Integration Levels**:
  - Te Ao Māori: PRIMARY (85% - cultural storytelling and traditional knowledge)
  - English: HIGH (40% - narrative structure and language arts)
  - Digital Technology: MODERATE (20% - platform interaction)
  - General Education: LOW (10% - creative expression)

---

## 📊 **RESOURCE CLASSIFICATION WORKFLOW**

### **Step 1: Primary Subject Determination**
```python
def determine_primary_subject(resource):
    content_analysis = analyze_learning_objectives(resource)
    time_allocation = calculate_subject_focus_percentage(resource)
    assessment_focus = identify_primary_assessment_domain(resource)
    
    if content_analysis['te_ao_maori'] >= 50 and cultural_level in ['essential', 'high']:
        return 'Te Ao Māori'
    elif content_analysis['english'] >= 50 and assessment_focus == 'language_arts':
        return 'English'  
    elif content_analysis['social_studies'] >= 50 and assessment_focus == 'social_inquiry':
        return 'Social Studies'
    # ... continue for all subjects
    else:
        return 'General Education'  # Default for cross-curricular resources
```

### **Step 2: Secondary Subject Tagging**
```python
def generate_secondary_tags(resource, primary_subject):
    secondary_tags = []
    integration_levels = {}
    
    for subject in ALL_SUBJECTS:
        if subject != primary_subject:
            integration_percentage = calculate_integration_level(resource, subject)
            if integration_percentage >= 30:
                secondary_tags.append(subject)
                integration_levels[subject] = categorize_integration_level(integration_percentage)
    
    return secondary_tags, integration_levels
```

### **Step 3: Integration Level Categorization**
- **HIGH Integration (30-49%)**: Substantial focus, could almost be primary
- **MODERATE Integration (15-29%)**: Clear connections and support
- **LOW Integration (5-14%)**: Basic connections or examples
- **MINIMAL Integration (<5%)**: Token mentions only

---

## 🎮 **SPECIAL CATEGORY HANDLING**

### **Educational Games**
**Primary Classification Rule**: Based on learning objectives, not format
- **Te Reo Wordle** → PRIMARY: Te Ao Māori (language learning focus)
- **English Wordle** → PRIMARY: English (vocabulary development focus)
- **Math Strategy Games** → PRIMARY: Mathematics (mathematical thinking focus)

### **Assessment Tools**
**Primary Classification Rule**: Based on assessment domain
- **Cultural Competency Rubrics** → PRIMARY: Te Ao Māori (cultural understanding assessment)
- **Writing Assessment Rubrics** → PRIMARY: English (language arts assessment)
- **Cross-Curricular Rubrics** → PRIMARY: General Education (transferable skills assessment)

### **Interactive Platforms**
**Primary Classification Rule**: Based on dominant content and learning objectives
- **Digital Pūrākau** → PRIMARY: Te Ao Māori (cultural storytelling focus)
- **Virtual Marae** → PRIMARY: Te Ao Māori (cultural protocol learning)
- **Society Design Tool** → PRIMARY: Social Studies (social organization focus)

---

## 🔍 **DISCOVERY IMPLICATIONS**

### **User Journey Scenarios:**

#### **Teacher Searching by Primary Subject:**
- **Te Ao Māori search** → Shows Digital Pūrākau, Māori Astronomy, Cultural Protocols
- **English search** → Shows Writer's Toolkit, Literary Analysis, Communication Skills
- **Social Studies search** → Shows Y8 Systems, Treaty Analysis, Social Justice units

#### **Teacher Searching by Secondary Integration:**
- **"Māori integration in English"** → Shows Writer's Toolkit resources with cultural examples
- **"Mathematics in Social Studies"** → Shows Y8 Systems modeling activities
- **"Cross-curricular literacy"** → Shows reading components in Science and Social Studies

#### **GraphRAG Semantic Search:**
- **"Traditional knowledge and mathematics"** → Finds Traditional Navigation Mathematics (Math primary) AND Whakapapa Mathematical Thinking (Te Ao Māori primary)
- **"Writing with cultural perspectives"** → Finds Writer's Toolkit (English primary) AND Cultural storytelling resources (Te Ao Māori primary)

---

## 📏 **QUALITY ASSURANCE STANDARDS**

### **Classification Review Process:**
1. **Cultural Guardian (Kaitiaki) Review**: Validates all Te Ao Māori primary classifications
2. **Master Teacher (Kaiako) Review**: Confirms educational alignment and curriculum connections
3. **Content Curator Review**: Ensures consistent application of classification standards
4. **Community Validation**: Te Ao Māori resources require community partnership validation

### **Edge Case Resolution:**
- **50/50 Split Resources**: Default to subject with strongest assessment focus
- **Three-Way Integration**: Choose subject with primary learning objective, tag other two as HIGH secondary
- **Cultural Sensitivity**: When in doubt, elevate to Te Ao Māori primary if cultural content is significant

### **Ongoing Maintenance:**
- **Quarterly Review**: Reassess classifications based on teacher usage patterns
- **Community Feedback**: Adjust Te Ao Māori classifications based on cultural community guidance  
- **Curriculum Alignment**: Update classifications when NZ Curriculum changes
- **Usage Analytics**: Refine secondary tagging based on actual cross-curricular discovery patterns

---

## 🎯 **IMPLEMENTATION STRATEGY**

### **Phase 1: Apply Standards to Existing 624 Resources**
- **Audit current classifications** using new standards
- **Reclassify edge cases** with clear documentation
- **Generate secondary tags** for all resources
- **Create integration level indicators**

### **Phase 2: Subject Landing Page Population**
- **Populate primary subject pages** with correctly classified resources
- **Create cross-reference systems** for secondary integrations
- **Implement "Also appears in" indicators** for multi-subject resources
- **Design discovery pathways** for cross-curricular exploration

### **Phase 3: GraphRAG Enhancement**
- **Update semantic search** to understand classification standards
- **Enhance relationship mapping** between primary and secondary subjects
- **Improve recommendation algorithms** using integration level data
- **Create intelligent cross-curricular suggestion system**

---

## 🌟 **EXPECTED OUTCOMES**

### **For Teachers:**
- **Clear Discovery Pathways**: Find resources by dominant subject focus
- **Cross-Curricular Awareness**: Discover integration opportunities through secondary tags
- **Cultural Confidence**: Understand level of Māori integration in any resource
- **Efficient Planning**: Locate resources that serve multiple curriculum areas

### **For Students:**
- **Coherent Learning**: Experience resources organized by logical subject progression
- **Cultural Integration**: See Māori perspectives woven appropriately throughout all subjects
- **Transfer Opportunities**: Connect learning across curriculum areas through secondary tags
- **Authentic Assessment**: Experience evaluation aligned with actual learning focus

### **For Platform:**
- **Intelligent Organization**: 624 resources systematically classified and discoverable
- **Scalable Framework**: Standards that work as resource library grows
- **Cultural Authenticity**: Proper elevation and protection of Māori knowledge systems
- **World-Class Discovery**: Revolutionary approach to educational resource organization

---

**🧺 "Whaowhia te kete mātauranga" - Fill the basket of knowledge with intelligent organization that serves both discovery and authentic cultural integration.**

**These standards ensure every resource finds its proper place while maintaining the cross-curricular richness that makes New Zealand education distinctive.** 🎯