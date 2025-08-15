# Agent Onboarding Guide - Te Kete Ako

**Kia ora! Welcome to the Te Kete Ako development team.**

## 🎯 Essential Context

### The Mission
Transform Te Kete Ako from a static educational website into a dynamic, collaborative learning platform that serves the **ākonga (students) and kaiako (teachers) of Mangakōtukutuku College** with cultural authenticity and technical excellence.

### The Why
These aren't just users - they're **phenomenal young minds** who deserve technology that empowers rather than frustrates, and **dedicated educators** who need tools that amplify their cultural wisdom and pedagogical expertise.

## 🏛️ Project Architecture Overview

### Current Tech Stack
- **Frontend**: Static HTML/CSS/JavaScript
- **Hosting**: Netlify with automatic deployments
- **Content**: File-based curriculum resources, handouts, games
- **Status**: Highly functional static site with 186+ educational resources

### Planned Evolution
- **Backend**: Supabase (PostgreSQL) + Netlify Functions
- **Authentication**: Role-based (teacher/student) with Supabase Auth
- **Features**: Project submissions, teacher dashboards, peer collaboration
- **Deployment**: Continuous integration with security-first approach

## 📁 Codebase Navigation

### Key Directories
```
te-kete-ako-clean/
├── css/main.css                 # 3000+ lines of well-organized styles
├── js/                         # 20+ JavaScript modules
│   ├── activity-generator.js   # Do NOW activities (recently fixed modal bug)
│   ├── analytics-dashboard.js  # Learning analytics
│   └── main.js                # Core functionality
├── handouts/                   # 54 educational handouts
├── games/                      # 6 interactive learning games  
├── units/                      # 7 complete curriculum units
├── y8-systems/                 # Year 8 Systems Unit (enhanced with collaboration)
└── agent-knowledge-hub/        # This documentation system
```

### Navigation Patterns
- **Consistent Header**: All pages use same navigation structure (recently fixed on other-resources.html)
- **Cultural Integration**: Whakataukī (proverbs) and Te Reo Māori throughout
- **Responsive Design**: Mobile-first approach with print-friendly styles

## 🌺 Cultural Principles (Non-Negotiable)

### Te Ao Māori Values
- **Manaakitanga**: Hospitality and care for users in every interaction
- **Whakatōhia**: Working together, building relationships
- **Kaitiakitanga**: Guardianship of knowledge and student data

### Implementation Guidelines
1. **Cultural Consultation**: Major cultural integrations require community input
2. **Respectful Language**: Use correct Te Reo Māori with appropriate macrons
3. **Inclusive Design**: Technology that welcomes all cultural backgrounds
4. **Data Sovereignty**: Students and communities own their cultural knowledge

## 🔧 Development Workflow

### Pre-Work Checklist
1. **Read Recent Context**: Check [Phase Completion Log](../project-status/phase-completion-log.md)
2. **Understand Current Issues**: Review [Known Issues](../project-status/known-issues.md)  
3. **Follow Code Standards**: Adhere to [coding conventions](code-standards.md)
4. **Plan Cultural Impact**: Consider how changes affect Te Ao Māori integration

### During Development
1. **Test Responsively**: Verify mobile, tablet, desktop, and print layouts
2. **Accessibility First**: Screen readers, keyboard navigation, color contrast
3. **Cultural Sensitivity**: No stereotypes, appropriate cultural integration
4. **Performance Monitoring**: Keep load times fast for all users

### Post-Development
1. **Document Changes**: Update relevant knowledge hub sections
2. **Test Thoroughly**: Verify cross-browser compatibility
3. **Cultural Review**: Ensure authentic and respectful implementation
4. **Handoff Preparation**: Document context for next agent

## 🚨 Critical Bug Patterns to Avoid

### Recently Fixed Issues (Learn From These)
1. **Modal Overlay Problems**: Always implement proper body scroll lock/unlock
2. **Navigation Inconsistency**: Use the standard header template across all pages
3. **Broken Link References**: Verify all internal links point to existing resources

### Common Pitfalls
- **Missing Cultural Context**: Don't add features without understanding cultural impact
- **Accessibility Oversights**: Always test with screen readers and keyboard navigation
- **Mobile Responsiveness**: Test on actual mobile devices, not just browser dev tools
- **Print Styles**: Many educators print resources - ensure print layouts work

## 🎯 Current Priorities

### Immediate (Phase 3 Completion)
- Knowledge Hub documentation completion
- Backend architecture finalization
- Security protocol establishment

### Short-term (Phase 4)
- User authentication system implementation
- Student project submission system
- Teacher dashboard development

### Medium-term (Phase 5)
- Real-time collaboration features
- Advanced analytics implementation
- Community showcase platform

## 📋 Quality Standards

### Code Quality
- **Clean, Readable Code**: Future developers (human or AI) should understand your work
- **Consistent Patterns**: Follow existing code conventions and naming patterns
- **Security First**: Never expose sensitive data, always sanitize inputs
- **Performance Conscious**: Optimize for New Zealand internet speeds

### Cultural Quality
- **Authentic Integration**: Te Ao Māori elements should be meaningful, not decorative
- **Community-Centered**: Every feature should directly benefit ākonga and kaiako
- **Respectful Implementation**: Cultural elements integrated with appropriate reverence
- **Inclusive Design**: Welcoming to all cultures while honoring Te Ao Māori

## 🤝 Communication Protocols

### Documentation Requirements
- **Decision Rationale**: Why did you make specific technical choices?
- **Cultural Considerations**: How do changes impact Te Ao Māori integration?
- **User Impact**: How do changes improve ākonga and kaiako experience?
- **Future Maintenance**: What does the next developer need to know?

### Handoff Protocols
1. **Update Todo List**: Mark completed tasks, add new discoveries
2. **Document Context**: Add significant findings to knowledge hub
3. **Flag Issues**: Highlight any problems or concerns discovered
4. **Provide Guidance**: Suggest next steps or priorities for subsequent agents

## 🎓 Learning Philosophy

Remember: Every line of code, every design decision, every feature serves the goal of empowering rangatahi (young people) to see themselves as capable, culturally-grounded leaders who can shape their communities and their world.

### Student-Centered Questions
- Does this feature make learning more engaging and accessible?
- Will this help students see connections between their culture and academic content?
- Does this support different learning styles and abilities?
- Would I be proud to show this to the students of Mangakōtukutuku College?

## 🔍 Testing Protocols

### Functional Testing
- **Cross-Browser**: Chrome, Firefox, Safari, Edge
- **Mobile Devices**: iOS Safari, Android Chrome
- **Accessibility**: Screen readers, keyboard navigation, color contrast
- **Performance**: Page load times, mobile data usage

### Cultural Testing
- **Language Accuracy**: Correct Te Reo Māori with proper macrons
- **Cultural Sensitivity**: No appropriation, stereotypes, or misrepresentation
- **Community Relevance**: Content applicable to New Zealand context
- **Respectful Integration**: Cultural elements enhance rather than tokenize

## 📞 When You Need Help

### Technical Challenges
- Reference existing code patterns in similar components
- Check browser compatibility requirements for new features
- Review accessibility guidelines for inclusive implementation

### Cultural Questions
- Consult existing Te Ao Māori integrations for respectful patterns
- Reference New Zealand educational standards and contexts
- Consider community impact and cultural appropriateness

### Strategic Decisions
- Review project mission and goals in main README
- Consider impact on Mangakōtukutuku College stakeholders
- Align with long-term vision for platform evolution

---

**Welcome to the team! Your contribution matters enormously to the ākonga and kaiako who will benefit from your work.**

**He waka eke noa - we are all in this together.**