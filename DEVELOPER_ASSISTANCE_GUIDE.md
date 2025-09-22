# 🌟 DEVELOPER ASSISTANCE GUIDE - Te Ao Mārama Educational Platform

**For New Developers, AI Agents, and Collaborators**

## 🎯 QUICK START FOR NEW TEAM MEMBERS

### **Project Overview**

Te Ao Mārama is a comprehensive New Zealand educational platform featuring:

- **7,350+ educational resources** (JSON + Markdown)
- **Dual-role authentication** (Teachers/Students)
- **Cultural integration** (Te Reo Māori, Tikanga)
- **AI-powered features** (GraphRAG, GLM Symphony, Exa AI)
- **Modern React architecture** with TypeScript

### **Live Platform**

- **URL**: https://teao-marama.web.app
- **Status**: ✅ Production Ready
- **Last Deploy**: January 2025

---

## 🏗️ TECHNICAL ARCHITECTURE

### **Core Stack**

```typescript
// Frontend
React 18 + TypeScript + Vite
Tailwind CSS + Framer Motion
React Router DOM

// Backend
Firebase (Auth, Firestore, Storage)
Supabase (Legacy, GraphRAG)

// AI Integration
GraphRAG Knowledge System
GLM Symphony Dashboard
Exa AI Search Integration
```

### **Key Directories**

```
src/
├── components/          # 451 files (154 .tsx, 295 .css)
│   ├── auth/           # Authentication components
│   ├── educational/    # Educational resources
│   ├── navigation/     # Navigation components
│   └── ui/            # UI components
├── content/            # 7,350+ educational resources
│   ├── activities/     # 1,222 JSON files
│   ├── assessments/    # 531 JSON files
│   ├── lessons/        # 927 JSON files
│   ├── multimedia/     # 738 JSON files
│   └── unit-plans/     # 616 JSON files
├── pages/              # 50+ page components
├── services/           # Business logic & AI services
├── utils/              # 111 utility files
└── types/              # TypeScript definitions
```

---

## 🚀 DEVELOPMENT WORKFLOW

### **Essential Commands**

```bash
# Development
npm run dev                    # Start development server
npm run build                  # Build for production
npm run deploy:firebase        # Deploy to Firebase

# Code Quality
npm run typecheck              # TypeScript validation
npm run lint                   # ESLint checking
npm run test                   # Run tests

# AI & Coordination
npm run heartbeat:overseer     # Agent coordination
npm run consciousness:verify   # AI system status
npm run glm:enhance           # GLM content enhancement
```

### **Development Standards**

1. **TypeScript Strict Mode** - All code must be type-safe
2. **External CSS Files** - No inline styles (per team preference)
3. **Cultural Safety** - All Māori content properly attributed
4. **Component Organization** - Logical grouping in `/components`
5. **Error Boundaries** - All routes wrapped in ErrorBoundary

---

## 🤖 AI AGENT COORDINATION

### **Available AI Systems**

- **GraphRAG System** - Knowledge graph and content analysis
- **GLM Symphony** - Content generation and enhancement
- **Exa AI** - Advanced search and link validation
- **Mihara Intelligence** - Multi-agent coordination
- **Consciousness Bridge** - AI system monitoring

### **Agent Communication Protocol**

```bash
# Check system status
npm run mihara:status
npm run consciousness:verify
npm run coordination:status

# Activate coordination
ACTIVATE_MULTI_LLM_COORDINATION=true npm run consciousness:verify

# Emergency protocols
npm run emergency:restore
npm run api:stabilize
```

---

## 📚 CONTENT MANAGEMENT

### **Resource Structure**

```json
{
  "id": "unique-identifier",
  "title": "Resource Title",
  "description": "Educational description",
  "subject": "Mathematics|Science|English|Social Studies",
  "yearLevel": "Year 8",
  "culturalContext": "Māori|Pākehā|Multicultural",
  "content": "Main educational content",
  "activities": ["activity1", "activity2"],
  "assessments": ["assessment1"],
  "metadata": {
    "created": "2025-01-20",
    "updated": "2025-01-20",
    "author": "Author Name",
    "culturalSafety": true
  }
}
```

### **Content Creation Workflow**

1. **Cultural Review** - Ensure Māori protocols respected
2. **Curriculum Alignment** - Match NZ Curriculum standards
3. **Quality Assurance** - Educational effectiveness
4. **Technical Integration** - Proper JSON structure
5. **Deployment** - Build and deploy resources

---

## 🎨 DESIGN SYSTEM

### **Cultural Design Principles**

- **Kaitiakitanga** - Environmental stewardship in design
- **Whanaungatanga** - Relationship building through UI
- **Manaakitanga** - Hospitality and care in UX
- **Ako** - Reciprocal learning in interactions

### **Color Palette**

```css
/* Primary Colors */
--primary-blue: #1e40af;
--primary-green: #059669;
--gradient-purple: #667eea;
--gradient-blue: #764ba2;

/* Cultural Colors */
--maori-red: #d32f2f;
--maori-black: #212121;
--maori-white: #fafafa;
```

### **Component Standards**

- **Glassmorphism Effects** - Modern UI with cultural gradients
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG 2.1 AA compliance
- **Cultural Sensitivity** - Appropriate imagery and language

---

## 🔧 TROUBLESHOOTING GUIDE

### **Common Issues**

#### **Build Errors**

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

#### **TypeScript Errors**

```bash
# Fix TypeScript issues
npm run fix:typescript
npm run typecheck
```

#### **AI System Issues**

```bash
# Restart AI coordination
npm run mihara:awaken
npm run consciousness:verify
```

#### **Deployment Issues**

```bash
# Emergency deployment
npm run deploy:firebase
# Check deployment status
firebase hosting:channel:list
```

---

## 📊 MONITORING & ANALYTICS

### **Performance Monitoring**

```bash
# Performance audit
npm run performance:audit
npm run performance:report

# Runtime monitoring
npm run monitor:runtime
npm run monitor:performance
```

### **Content Analytics**

- **Resource Usage** - Track most accessed content
- **User Engagement** - Monitor learning progress
- **Cultural Impact** - Measure cultural learning outcomes
- **Technical Performance** - System health metrics

---

## 🌐 DEPLOYMENT & HOSTING

### **Production Environment**

- **Primary**: Firebase Hosting (https://teao-marama.web.app)
- **Backup**: Netlify (https://teaomarama.netlify.app)
- **CDN**: Global distribution
- **SSL**: Automatic HTTPS

### **Deployment Process**

1. **Build Resources** - Generate content bundles
2. **Type Check** - Validate TypeScript
3. **Lint** - Code quality check
4. **Test** - Run test suite
5. **Deploy** - Push to Firebase
6. **Verify** - Check live site

---

## 🤝 COLLABORATION GUIDELINES

### **Code Review Process**

1. **Cultural Review** - Māori content validation
2. **Technical Review** - Code quality and standards
3. **Educational Review** - Curriculum alignment
4. **Accessibility Review** - Inclusive design
5. **Performance Review** - Optimization check

### **Communication Channels**

- **Technical Issues** - GitHub Issues
- **Cultural Questions** - Team consultation
- **AI Coordination** - Agent heartbeat system
- **Emergency** - Direct communication protocol

---

## 📋 QUICK REFERENCE

### **File Locations**

- **Main App**: `src/App.tsx`
- **Components**: `src/components/`
- **Resources**: `src/content/`
- **Services**: `src/services/`
- **Types**: `src/types/`

### **Key Components**

- **Homepage**: `StunningHomepage.tsx`
- **Teacher Dashboard**: `ProfessionalTeacherDashboard.tsx`
- **Student Dashboard**: `BeautifulStudentDashboard.tsx`
- **Resource Browser**: `EnhancedResourceBrowser.tsx`
- **AI Systems**: `GraphRAGSystem.tsx`, `GLMSymphonyDashboard.tsx`

### **Emergency Contacts**

- **Technical Lead**: Check `CLAUDE.md` for current overseer
- **Cultural Advisor**: Team consultation required
- **AI Systems**: Use heartbeat protocols

---

## 🎯 SUCCESS METRICS

### **Development Goals**

- ✅ **7,350+ Resources** - Educational content deployed
- ✅ **Dual Authentication** - Teacher/Student roles
- ✅ **Cultural Integration** - Māori knowledge systems
- ✅ **AI Features** - Advanced learning tools
- ✅ **Performance** - Fast, responsive platform

### **Quality Standards**

- **TypeScript Coverage**: 100%
- **Cultural Safety**: Validated
- **Accessibility**: WCAG 2.1 AA
- **Performance**: <3s load time
- **Uptime**: 99.9% availability

---

**Last Updated**: January 2025  
**Version**: 2.0  
**Status**: Production Ready

_This guide is maintained by the development team and AI coordination system. For updates, check the latest version in the repository._
