# Te Kete Ako Specialized Agent Team Deployment Instructions

## 🎯 Mission Overview

Following the successful completion of Phases 1-5 of Te Kete Ako (authentication system, Supabase integration, AI agents), we now deploy a specialized agent team to handle advanced content curation, performance optimization, community outreach, and cultural authenticity review.

The platform is fully functional with 186+ educational resources, working authentication, and deployed AI agents. This specialized team will enhance content quality, optimize performance, and prepare for public launch.

---

## 🏗️ Current Platform Status

### ✅ Completed Infrastructure
- **Platform**: Fully deployed at `https://tekete.netlify.app/`
- **Database**: Supabase PostgreSQL with complete schema
- **Authentication**: Working role-based system (teacher/student)
- **AI Agents**: Cultural Advisor, Kaiako Assistant, Ākonga Companion deployed
- **Resources**: 186+ educational files, 7 curriculum units, 54+ handouts
- **Functions**: All Netlify Functions operational

### 🎯 Next Phase Requirements
The platform needs specialized agents to handle:
1. **Content Enhancement**: YouTube integration, missing page completion
2. **Performance Optimization**: Speed, accessibility, link verification
3. **Launch Strategy**: Community engagement, marketing, outreach
4. **Quality Assurance**: Cultural authenticity, educational excellence

---

## 🤖 Specialized Agent Deployment

### 1. Content Curation Agent 🎬

**Primary Responsibilities:**
- YouTube content integration and video embedding
- Complete missing or placeholder pages
- Enhance multimedia learning experiences
- Curate external educational resources
- Maintain content quality standards

**Deployment Instructions:**
```python
# Deploy to: /agents/content_curator/agent.py

from google.adk.agents import Agent
from google.adk.tools import function_tool

@function_tool
def curate_youtube_content(subject_area: str, learning_objectives: str, age_group: str):
    """Find and validate educational YouTube content for curriculum integration."""
    
@function_tool  
def complete_missing_pages(page_type: str, content_requirements: str, cultural_context: str):
    """Generate content for missing or incomplete pages while maintaining cultural authenticity."""

@function_tool
def integrate_multimedia_resources(resource_type: str, educational_context: str, accessibility_requirements: str):
    """Integrate external multimedia while ensuring accessibility and cultural appropriateness."""

content_curator = Agent(
    name="content_curator",
    model="gemini-2.0-flash",
    instruction="""
    You are the Content Curation Agent for Te Kete Ako, responsible for enhancing multimedia learning experiences while maintaining cultural authenticity and educational excellence.
    
    CORE RESPONSIBILITIES:
    - YouTube content integration with educational value verification
    - Complete missing pages with culturally-appropriate content
    - Multimedia resource curation and accessibility optimization
    - External resource validation for cultural sensitivity
    
    CULTURAL GUIDELINES:
    - All content must honor Te Ao Māori values
    - YouTube selections must be educationally appropriate and culturally sensitive
    - Multimedia integration should enhance, not replace, cultural knowledge
    - Always provide cultural context for external resources
    
    QUALITY STANDARDS:
    - Verify educational value of all curated content
    - Ensure accessibility compliance (captions, alt text)
    - Test cross-platform compatibility
    - Maintain fast loading times
    """,
    tools=[curate_youtube_content, complete_missing_pages, integrate_multimedia_resources]
)
```

**Key Tasks:**
- Integrate YouTube videos for video-activities in `/handouts/video-activities/`
- Complete placeholder content in education frameworks
- Enhance games with multimedia elements
- Create resource libraries for teachers

### 2. Performance Optimization Agent ⚡

**Primary Responsibilities:**
- Website performance optimization
- Accessibility compliance verification
- Link testing and broken link repair
- Mobile responsiveness enhancement
- Loading speed optimization

**Deployment Instructions:**
```python
# Deploy to: /agents/performance_optimizer/agent.py

@function_tool
def analyze_site_performance(page_urls: list, metrics: str):
    """Analyze loading speeds, accessibility, and performance across the platform."""

@function_tool
def optimize_resource_loading(resource_type: str, optimization_target: str):
    """Optimize images, CSS, JavaScript for faster loading while maintaining quality."""

@function_tool
def verify_accessibility_compliance(page_content: str, wcag_level: str):
    """Ensure all pages meet WCAG accessibility standards for inclusive education."""

@function_tool
def test_cross_platform_compatibility(pages: list, devices: list):
    """Test functionality across different devices, browsers, and screen sizes."""

performance_optimizer = Agent(
    name="performance_optimizer", 
    model="gemini-2.0-flash",
    instruction="""
    You are the Performance Optimization Agent, ensuring Te Kete Ako delivers fast, accessible, and reliable educational experiences for all users.
    
    OPTIMIZATION PRIORITIES:
    - Mobile-first performance (rural NZ internet considerations)
    - Accessibility for diverse learning needs
    - Cross-browser compatibility
    - Print-friendly resource formatting
    
    TECHNICAL FOCUS:
    - Optimize for New Zealand internet speeds
    - Ensure compatibility with school devices and networks
    - Maintain cultural design elements while optimizing performance
    - Test with actual educational use cases
    
    QUALITY METRICS:
    - Loading time < 3 seconds on 3G connections
    - 100% keyboard navigation compatibility
    - Screen reader optimization
    - Perfect mobile responsiveness
    """,
    tools=[analyze_site_performance, optimize_resource_loading, verify_accessibility_compliance, test_cross_platform_compatibility]
)
```

**Key Tasks:**
- Audit all 186+ pages for performance bottlenecks
- Optimize images in handouts and games
- Test accessibility with screen readers
- Verify mobile responsiveness across devices

### 3. Launch Strategy Agent 🚀

**Primary Responsibilities:**
- Community engagement strategy development
- Educational sector outreach planning
- Marketing material creation (culturally appropriate)
- Partnership development with Māori education networks
- Public launch coordination

**Deployment Instructions:**
```python
# Deploy to: /agents/launch_strategist/agent.py

@function_tool
def develop_community_outreach_strategy(target_audience: str, cultural_context: str, educational_objectives: str):
    """Create culturally-appropriate outreach strategies for Māori educational communities."""

@function_tool
def create_marketing_materials(platform_features: str, cultural_values: str, audience_type: str):
    """Generate marketing content that honors Te Ao Māori while showcasing platform benefits."""

@function_tool
def identify_partnership_opportunities(sector: str, geographic_region: str, cultural_alignment: str):
    """Identify potential partnerships with Māori education organizations and cultural institutions."""

@function_tool
def plan_launch_timeline(platform_readiness: str, community_preparation: str, cultural_protocols: str):
    """Create launch timeline that respects cultural protocols and maximizes educational impact."""

launch_strategist = Agent(
    name="launch_strategist",
    model="gemini-2.0-flash", 
    instruction="""
    You are the Launch Strategy Agent, responsible for bringing Te Kete Ako to the broader educational community while maintaining cultural authenticity and respecting community protocols.
    
    STRATEGIC PRINCIPLES:
    - Community consultation before public announcements
    - Cultural protocol compliance in all outreach
    - Educational value demonstration over marketing hype
    - Relationship-building focus over transaction-based promotion
    
    OUTREACH PRIORITIES:
    - Māori education networks and iwi education initiatives
    - New Zealand teachers and schools with cultural competency focus
    - International indigenous education communities
    - Educational technology organizations with cultural awareness
    
    CULTURAL CONSIDERATIONS:
    - Honor manaakitanga in all community interactions
    - Seek guidance from cultural advisors for major announcements
    - Position as educational tool, not commercial product
    - Emphasize community benefit and cultural preservation
    """,
    tools=[develop_community_outreach_strategy, create_marketing_materials, identify_partnership_opportunities, plan_launch_timeline]
)
```

**Key Tasks:**
- Develop culturally-appropriate launch timeline
- Create educational sector presentation materials
- Identify Māori education network partnerships
- Plan community consultation processes

### 4. Quality Assurance Agent 🔍

**Primary Responsibilities:**
- Cultural authenticity verification across all new content
- Educational effectiveness assessment
- User experience testing with actual educators
- Content accuracy and cultural sensitivity review
- Continuous improvement recommendations

**Deployment Instructions:**
```python
# Deploy to: /agents/quality_assurance/agent.py

@function_tool
def conduct_cultural_authenticity_audit(content_areas: list, cultural_elements: str, community_feedback: str):
    """Comprehensive review of cultural authenticity across platform content."""

@function_tool
def assess_educational_effectiveness(learning_outcomes: str, user_feedback: str, assessment_data: str):
    """Evaluate educational impact and learning outcome achievement."""

@function_tool
def test_user_experience_flows(user_type: str, common_tasks: list, accessibility_requirements: str):
    """Test complete user journeys for teachers and students."""

@function_tool
def generate_improvement_recommendations(audit_results: str, user_feedback: str, performance_data: str):
    """Create actionable recommendations for platform enhancement."""

quality_assurance = Agent(
    name="quality_assurance",
    model="gemini-2.0-flash",
    instruction="""
    You are the Quality Assurance Agent, ensuring Te Kete Ako maintains the highest standards of cultural authenticity, educational effectiveness, and user experience.
    
    QUALITY DIMENSIONS:
    - Cultural authenticity and sensitivity
    - Educational value and pedagogical soundness
    - User experience and accessibility
    - Technical reliability and performance
    
    ASSESSMENT APPROACH:
    - Evidence-based evaluation using actual user data
    - Cultural competency verification with community input
    - Continuous improvement mindset
    - Holistic quality considering all stakeholders
    
    REVIEW STANDARDS:
    - All cultural content verified by Cultural Advisor Agent
    - Educational strategies validated by Kaiako Assistant
    - User experience tested with actual teachers and students
    - Technical quality measured against accessibility standards
    """,
    tools=[conduct_cultural_authenticity_audit, assess_educational_effectiveness, test_user_experience_flows, generate_improvement_recommendations]
)
```

**Key Tasks:**
- Comprehensive platform audit before public launch
- Cultural authenticity verification
- Educational effectiveness assessment
- User experience optimization

---

## 🤝 Agent Coordination Protocol

### Team Structure
```
Agent Overseer (You) 
├── Content Curation Agent 🎬
├── Performance Optimization Agent ⚡  
├── Launch Strategy Agent 🚀
└── Quality Assurance Agent 🔍
    └── Coordinates with existing agents:
        ├── Cultural Advisor Agent 🌺
        ├── Kaiako Assistant Agent 👨‍🏫
        └── Ākonga Companion Agent 👩‍🎓
```

### Coordination Principles

**1. Cultural Authenticity Chain of Authority**
- All cultural decisions flow through Cultural Advisor Agent
- New content requires cultural authenticity verification
- Community consultation protocols must be followed

**2. Educational Excellence Standards**
- Kaiako Assistant validates all teaching strategies
- Educational effectiveness measured against learning outcomes
- Student-centered design principles maintained

**3. Parallel Processing Workflow**
- Content Curation and Performance Optimization work simultaneously
- Launch Strategy prepares while technical work continues
- Quality Assurance conducts ongoing verification

**4. Communication Protocol**
```
Daily Standup Questions:
- What did you complete yesterday?
- What cultural authenticity checks were performed?
- What blockers need team collaboration?
- How does your work integrate with other agents?
```

### Handoff Procedures

**Content Curation → Performance Optimization**
- Content creator provides performance requirements
- Optimizer tests new content integration
- Shared responsibility for loading speed

**Performance Optimization → Quality Assurance** 
- Optimizer provides performance test results
- QA validates user experience improvements
- Shared accessibility compliance verification

**All Agents → Launch Strategy**
- Weekly readiness assessments
- Cultural protocol verification
- Community preparation coordination

---

## 📋 Immediate Deployment Tasks

### Phase 1: Agent Setup (1-2 hours)
1. Deploy all four specialized agents to `/agents/` directory
2. Test integration with existing Cultural Advisor and Kaiako Assistant
3. Verify communication protocols and tool access
4. Establish shared workspace in knowledge hub

### Phase 2: Content Enhancement (3-4 hours) 
1. **Content Curation Agent**: YouTube integration for video activities
2. **Performance Optimization Agent**: Site-wide performance audit
3. **Quality Assurance Agent**: Baseline quality assessment
4. **Launch Strategy Agent**: Community mapping and consultation planning

### Phase 3: Launch Preparation (2-3 hours)
1. Complete content gaps and performance optimizations
2. Conduct comprehensive quality review
3. Finalize community outreach strategy
4. Prepare launch materials and timeline

### Phase 4: Public Launch (1-2 hours)
1. Final quality verification
2. Community consultation completion
3. Launch announcement coordination
4. Monitor initial user feedback and engagement

---

## 🎯 Success Metrics

### Content Quality
- 100% of video activities have integrated, appropriate YouTube content
- All missing pages completed with culturally-authentic content
- Multimedia resources enhance rather than replace cultural knowledge

### Performance Excellence
- Site loading time < 3 seconds on mobile devices
- 100% accessibility compliance across all pages
- Zero broken links or technical issues

### Cultural Authenticity
- All new content approved by Cultural Advisor Agent
- Community consultation completed for major changes
- Te Ao Māori values maintained throughout enhancements

### Launch Readiness
- Culturally-appropriate outreach strategy implemented
- Educational sector partnerships identified and contacted
- Public launch timeline respects cultural protocols

---

## 🌟 Strategic Vision

This specialized agent team will transform Te Kete Ako from an excellent educational platform into the world's first fully culturally-integrated AI educational resource. By coordinating content enhancement, performance optimization, community engagement, and quality assurance, we create a model for how technology can serve indigenous education with authenticity and excellence.

**He waka eke noa - We are all in this together.**

The specialized agent team works in unity to serve the ākonga and kaiako of Mangakōtukutuku College and the broader educational community with honor, excellence, and cultural authenticity.

---

**Deployment Date**: July 27, 2025  
**Team Lead**: Agent Overseer  
**Primary Mission**: Complete platform optimization and launch preparation  
**Success Criteria**: Public launch of culturally-grounded AI educational platform