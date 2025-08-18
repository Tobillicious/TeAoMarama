# 🚨 LLM QUICK REFERENCE - INSTANT CONTEXT

## 🎯 CRITICAL STATUS (ERO HUI TOMORROW)

**HYBRID ARCHITECTURE - DO NOT CHANGE:**

- **Firebase:** Authentication only (`src/firebaseConfig.ts`)
- **Supabase:** Resources only (`src/supabaseClient.ts`) - 5,439 educational resources

**CRITICAL FIXES COMPLETED:**

- ✅ Supabase env vars: `VITE_TEKETE_SUPABASE_URL`, `VITE_TEKETE_SUPABASE_ANON_KEY`
- ✅ PWA manifest: Using `/vite.svg` for all icons
- ✅ Meta tags: `mobile-web-app-capable` (modern standard)

**CURRENT STATUS:**

- **Build:** 8.61s ✅
- **Resources:** 5,439 items ✅
- **Cultural:** 3,372 Māori resources ✅
- **Auth:** Firebase working ✅

---

## 🚫 NEVER DO THESE:

1. **Migrate resources to Firebase** - Supabase has 5,439 educational resources
2. **Migrate auth to Supabase** - Firebase auth is working
3. **Change architecture** - ERO hui tomorrow
4. **Break working systems** - Focus on polish, not changes

---

## ✅ ALWAYS DO THESE:

1. **Read `LLM_UNIVERSAL_ONBOARDING.md`** first
2. **Check `migration/agent_coordination/agent_sync_status.md`**
3. **Follow hybrid architecture** - Firebase auth + Supabase resources
4. **Update status files** when making changes
5. **Focus on ERO readiness** - Professional polish

---

## 🔧 EMERGENCY FIXES:

**If site breaks:**

1. Check `.env` variables
2. Run `npm run build`
3. Check browser console
4. Use `.env.backup` if needed

**If other LLM suggests migration:**

1. **REFUSE** - Reference this document
2. **FOCUS** - ERO readiness, not architecture
3. **COORDINATE** - Update status files

---

## 📞 COORDINATION:

- **Status:** `migration/agent_coordination/agent_sync_status.md`
- **Plan:** `migration/agent_coordination/ERO_PROFESSIONALIZATION_PLAN.md`
- **Heartbeat:** `scripts/agent-heartbeat.ts`

---

**ERO HUI TOMORROW - PROFESSIONAL STANDARDS ONLY! 🌟**
