# 🤖 **AI TEAM COORDINATION - CROSS-PLATFORM DEVELOPMENT**

## 🌟 **PROJECT OVERVIEW**

**TeAo Marama Educational Platform** - A comprehensive Year 8 curriculum platform with cultural integration

## 🔗 **CRITICAL LINKS FOR ALL AI AGENTS**

- **Live Site**: https://teao-marama.web.app
- **Firebase Console**: https://console.firebase.google.com/project/teao-marama/overview
- **GitHub Repository**: [Your repo URL here]
- **Project ID**: teao-marama

## 🚨 **IMMEDIATE PRIORITIES - ALL AGENTS READ THIS**

### **COMPLETED COMPONENTS (PRIORITY 1) ✅**

1. **TeacherDashboard.tsx** - Complete dashboard for Kaiako (Teachers) ✅
2. **StudentDashboard.tsx** - Complete dashboard for Ākonga (Students) ✅
3. **KaitiakiDashboard.tsx** - Complete dashboard for Guardians ✅
4. **Role-based routing** - Users now have proper dashboard access! ✅

### **CURRENT STATUS**

- ✅ Authentication System - Working
- ✅ Year 8 Curriculum Pages - Complete
- ✅ Firebase Integration - Working
- ✅ Dashboard Pages - COMPLETE! (TeacherDashboard, StudentDashboard, KaitiakiDashboard)
- ✅ Role-based Navigation - WORKING!

## 🤝 **HOW TO COORDINATE**

### **For Claude Users:**

- Focus on **TeacherDashboard.tsx** and **StudentDashboard.tsx**
- Use the existing CSS files as reference
- Ensure cultural integration and Te Reo elements

### **For Gemini Users:**

- Focus on **KaitiakiDashboard.tsx** and role-based routing
- Work on the navigation system between dashboards
- Integrate with existing authentication flow

### **For Cursor Chat Users:**

- Focus on **performance optimization** and **bug fixes**
- Work on **responsive design** improvements
- Handle **linter errors** and **code quality**

## 📋 **DEVELOPMENT STANDARDS**

### **File Structure:**

```
src/
├── pages/
│   ├── TeacherDashboard.tsx     ← CLAUDE: Create this
│   ├── StudentDashboard.tsx     ← CLAUDE: Create this
│   ├── KaitiakiDashboard.tsx    ← GEMINI: Create this
│   └── [existing Year 8 pages]
├── components/
│   ├── [existing components]
│   └── [new dashboard components]
└── services/
    └── DualRoleAuthProvider.tsx
```

### **Cultural Integration Requirements:**

- Include Te Reo Māori throughout
- Cultural safety protocols
- Indigenous knowledge integration
- Community partnership elements

### **Technical Requirements:**

- TypeScript with proper typing
- React hooks (useState, useEffect, useCallback)
- Firebase integration
- Responsive CSS (no inline styles)
- Accessibility compliance

## 🚀 **IMMEDIATE ACTION ITEMS**

### **CLAUDE - Create TeacherDashboard.tsx:**

```typescript
// src/pages/TeacherDashboard.tsx
// Include: Class management, student progress, lesson planning
// Cultural elements: Kaiako protocols, community partnerships
```

### **GEMINI - Create KaitiakiDashboard.tsx:**

```typescript
// src/pages/KaitiakiDashboard.tsx
// Include: Cultural oversight, community coordination
// Cultural elements: Kaitiaki protocols, cultural safety
```

### **CURSOR CHATS - Fix Role-based Routing:**

```typescript
// Update App.tsx routing
// Fix authentication flow
// Ensure proper dashboard navigation
```

## 📞 **COMMUNICATION PROTOCOLS**

### **When Starting Work:**

1. Check this document for current status
2. Comment your work with your AI platform name
3. Update progress in this document
4. Test your changes before marking complete

### **When Completing Work:**

1. Update this document with completion status
2. Note any new issues discovered
3. Suggest next priorities
4. Test the live site functionality

## 🎯 **SUCCESS METRICS**

### **Minimum Viable Product (MVP):**

- Users can login and see appropriate dashboard
- All Year 8 content accessible
- Basic navigation between sections
- Cultural elements present throughout

### **Full Platform:**

- Complete dashboard functionality
- Student progress tracking
- Teacher lesson planning tools
- Cultural integration throughout
- Performance optimized

## 🚨 **EMERGENCY CONTACTS**

### **If You Encounter Critical Issues:**

1. **Authentication Problems**: Check `src/firebaseConfig.ts`
2. **Build Errors**: Run `npm run build` and check output
3. **Deployment Issues**: Use `firebase deploy --only hosting`
4. **Cultural Protocol Issues**: Reference `src/content/cultural-protocols/`

## 🌟 **LET'S BUILD SOMETHING AMAZING TOGETHER!**

**Remember**: We're building for REAL HUMANS, not demos. Every feature should be functional and user-friendly.

**Kia kaha! Kia manawanui!** (Be strong! Be patient!)

---

**Last Updated**: $(date)
**Status**: 🚧 In Development - Dashboards Missing
**Next Priority**: Create missing dashboard components
