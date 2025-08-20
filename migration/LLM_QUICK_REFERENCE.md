# ⚡ LLM QUICK REFERENCE - TE AOMARAMA

**Date**: August 19, 2025  
**Version**: 2.0  
**Status**: Active

---

## 🎯 QUICK COMMANDS

### **Development**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Check code quality
npm run test         # Run tests
```

### **Audit & Cleanup**

```bash
node scripts/quick-audit.cjs    # Run comprehensive audit
npm run performance:audit        # Performance audit
npm run performance:report       # Performance report
```

---

## 📁 KEY FILES & LOCATIONS

### **Core Application**

- `src/App.tsx` - Main application component
- `src/firebaseConfig.ts` - Firebase configuration
- `src/components/auth/EnhancedFirebaseAuth.tsx` - Authentication
- `src/styles/globals.css` - Global styles

### **Documentation**

- `migration/AGENT_COORDINATION_BOARD.md` - Project coordination
- `migration/agent_coordination/agent_sync_status.md` - Status tracking
- `docs/FIREBASE_AUTHENTICATION_SETUP.md` - Auth setup guide

### **Scripts**

- `scripts/quick-audit.cjs` - Codebase audit
- `scripts/comprehensive-audit.ts` - Detailed audit
- `scripts/next-batch-migration.ts` - Migration automation

---

## 🔧 COMMON TASKS

### **Add New Component**

1. Create `src/components/ComponentName.tsx`
2. Create `src/components/ComponentName.css`
3. Import CSS in component
4. Add to routing if needed
5. Update navigation if needed

### **Fix Linting Issues**

1. Run `npm run lint`
2. Fix TypeScript errors first
3. Remove inline styles (move to CSS)
4. Fix unused imports/variables
5. Ensure proper error handling

### **Update Context Files**

1. Check `migration/LLM_UNIVERSAL_ONBOARDING.md`
2. Update `migration/LLM_QUICK_REFERENCE.md`
3. Update `migration/COMPLETE_SYNTHESIS_MISSION.md`
4. Commit changes with descriptive messages

---

## 🌿 CULTURAL GUIDELINES

### **Content Creation**

- Always respect Māori protocols
- Use appropriate cultural language
- Attribute traditional knowledge properly
- Ensure cultural safety in all content

### **Language Use**

- **Kaiako**: Teacher
- **Ākonga**: Student
- **Kaitiakitanga**: Environmental stewardship
- **Whanaungatanga**: Relationship building
- **Manaakitanga**: Hospitality and care

---

## 🚨 TROUBLESHOOTING

### **Build Issues**

- Check TypeScript errors
- Verify all imports are correct
- Ensure CSS files exist
- Check Firebase configuration

### **Performance Issues**

- Run performance audit
- Check bundle size
- Optimize images
- Implement lazy loading

### **Authentication Issues**

- Verify Firebase config
- Check environment variables
- Test auth flow
- Review error logs

---

## 📊 CURRENT STATUS

### **System Health**

- ✅ Build: Successful (30.455s)
- ⚠️ Performance: Needs optimization
- ⚠️ CSS Files: 20 missing
- ⚠️ Orphaned Files: 1 found

### **Next Priorities**

1. Optimize build performance
2. Create missing CSS files
3. Clean up orphaned files
4. Update documentation

---

**Remember**: This platform serves Aotearoa New Zealand's educational needs with deep cultural respect and technical excellence.
