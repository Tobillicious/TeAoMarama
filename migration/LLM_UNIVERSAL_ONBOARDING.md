# 🤖 LLM UNIVERSAL ONBOARDING - TE AOMARAMA EDUCATIONAL PLATFORM

**Date**: August 19, 2025  
**Version**: 2.0  
**Status**: Active  
**Project**: TeAoMarama Educational Platform

---

## 🎯 MISSION OVERVIEW

Welcome to the TeAoMarama educational platform! This is a comprehensive New Zealand curriculum-aligned educational system that integrates Māori cultural knowledge with modern pedagogical approaches.

### **Core Mission**

- Provide culturally-responsive educational resources
- Support both teachers (Kaiako) and students (Ākonga)
- Integrate Te Ao Māori principles throughout the curriculum
- Deliver world-class educational technology

---

## 🏗️ ARCHITECTURE OVERVIEW

### **Technology Stack**

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: CSS with design system variables
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Deployment**: Netlify
- **Cultural Integration**: Māori knowledge systems

### **Key Directories**

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── educational/    # Educational resources
│   ├── navigation/     # Navigation components
│   └── ui/            # UI components
├── pages/              # Page components
├── services/           # Business logic
├── styles/             # Global styles
└── types/              # TypeScript definitions
```

---

## 🌿 CULTURAL CONTEXT

### **Te Ao Māori Integration**

- **Kaitiakitanga**: Environmental stewardship
- **Whanaungatanga**: Relationship building
- **Manaakitanga**: Hospitality and care
- **Ako**: Reciprocal learning
- **Tikanga**: Cultural protocols

### **Cultural Safety**

- All content respects Māori protocols
- Cultural knowledge is properly attributed
- Language use is appropriate and respectful
- Traditional knowledge is preserved and honored

---

## 🔧 DEVELOPMENT GUIDELINES

### **Code Quality Standards**

- ✅ TypeScript strict mode enabled
- ✅ ESLint configuration active
- ✅ No inline styles (use CSS files)
- ✅ Proper error handling
- ✅ Cultural sensitivity in all content

### **File Naming Conventions**

- Components: PascalCase (e.g., `EnhancedFirebaseAuth.tsx`)
- CSS files: Same name as component (e.g., `EnhancedFirebaseAuth.css`)
- Pages: PascalCase (e.g., `AssessmentFramework.tsx`)
- Services: camelCase (e.g., `authService.ts`)

### **Component Structure**

```typescript
import React from 'react';
import './ComponentName.css';

interface ComponentNameProps {
  // Props definition
}

const ComponentName: React.FC<ComponentNameProps> = ({ props }) => {
  // Component logic
  return <div className="component-name">{/* JSX content */}</div>;
};

export default ComponentName;
```

---

## 📚 EDUCATIONAL CONTENT

### **Resource Categories**

1. **Unit Plans**: Complete curriculum units
2. **Lesson Plans**: Individual lesson resources
3. **Handouts**: Student-facing materials
4. **Assessments**: Evaluation tools
5. **Cultural Resources**: Māori knowledge integration
6. **Games**: Interactive learning activities

### **Curriculum Alignment**

- **New Zealand Curriculum**: All content aligned
- **Te Marautanga o Aotearoa**: Māori-medium curriculum
- **Year Levels**: Y7-Y13 coverage
- **Subjects**: All learning areas represented

---

## 🚀 QUICK START

### **Development Setup**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

### **Key Commands**

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Check code quality
- `npm run test`: Run tests (if configured)

---

## 🔍 TROUBLESHOOTING

### **Common Issues**

1. **Build Failures**: Check TypeScript errors first
2. **Styling Issues**: Ensure CSS files exist and are imported
3. **Authentication**: Verify Firebase configuration
4. **Cultural Content**: Ensure proper attribution and respect

### **Performance Optimization**

- Use React.memo for expensive components
- Implement lazy loading for large resources
- Optimize images and assets
- Monitor bundle size

---

## 📖 FURTHER READING

- [Firebase Authentication Setup](./docs/FIREBASE_AUTHENTICATION_SETUP.md)
- [Agent Coordination Board](./AGENT_COORDINATION_BOARD.md)
- [Migration Status](./agent_coordination/agent_sync_status.md)
- [Cultural Review Process](./cultural_review/REVIEW_LOG.md)

---

**Remember**: This platform serves the educational needs of Aotearoa New Zealand with deep respect for Māori knowledge and cultural protocols. Always prioritize cultural safety and educational excellence.
