# 🎯 Session Plan: Authentication Priority + Quality Development

## 🚨 IMMEDIATE PRIORITY: Fix Authentication (Target: First 30 minutes)

### Current Status:
- API keys: ✅ Correct
- RLS policies: ✅ Fixed  
- **Issue**: Trigger `on_auth_user_created` failing on profile creation
- **Solution**: Disable trigger temporarily, allow basic auth to work

### Auth Fix Steps:
1. **Disable problematic trigger**: `DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;`
2. **Test signup immediately** - should work without profile auto-creation
3. **Users can create profiles manually** via dashboard later
4. **This unblocks**: Login, signup, user dashboard, saved resources, progress tracking

## 🎯 SESSION GOALS (Quality over Quantity)

### Phase 1: Authentication (30 min)
- Fix signup/login immediately
- Test core user features work
- Update GraphRAG with fix

### Phase 2: Platform Excellence (60 min)
- Continue curriculum optimization (split large files)
- Fix high-impact broken links  
- Enhance user experience for non-auth features

### Phase 3: Content Quality (Remaining time)
- Use Gemini for bulk handout creation (Unit 2 completion)
- Cross-curricular connections
- Assessment framework refinement

## 🧠 GraphRAG Integration Plan
- Fix GraphRAG query error first
- Use as institutional memory for all decisions
- Update with each major change
- Query before making architectural choices

## 🎯 Success Metrics for Session:
1. **Authentication working** ✅ (Users can signup/login)
2. **2-3 major platform improvements** ✅ 
3. **Quality enhancement of existing content** ✅
4. **Gemini productive on content creation** ✅

## 🚀 Cultural Responsiveness & Quality Focus:
- Every change respects Te Ao Māori values
- Professional presentation standards
- Cross-curricular integration maintained
- Teacher usability prioritized
- Student engagement enhanced

Let's get authentication fixed first, then scale with quality focus!