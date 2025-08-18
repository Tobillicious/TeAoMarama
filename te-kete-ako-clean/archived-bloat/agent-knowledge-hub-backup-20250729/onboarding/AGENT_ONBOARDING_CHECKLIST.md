# 🤖 AGENT ONBOARDING CHECKLIST

## **STEP 1: READ CONTEXT (5 minutes)**

1. **Read** `/agent-knowledge-hub/onboarding/CURRENT_STATUS_JULY_2025.md` FIRST
2. **Read** `/agent-knowledge-hub/phase-completion-log.md` for full context
3. **Read** `/setup-supabase.md` to understand deployment state

## **STEP 2: VERIFY CURRENT STATE (2 minutes)**

✅ **Check Supabase Dashboard**: `https://supabase.com/dashboard/project/nlgldaqtubrlcqddppbq`
- Users should exist in Authentication → Users
- Tables should exist (9 tables deployed)

✅ **Check Netlify Environment Variables**
- All 4 required variables should be set
- SUPABASE_ANON_KEY should be complete token

✅ **Check Local Server**
- `python3 -m http.server 8000` should work
- Visit `http://localhost:8000`

## **STEP 3: IDENTIFY ACTUAL TASK (1 minute)**

**READ THE TODO LIST** - Don't assume what needs to be done.

**Common completed tasks to AVOID redoing:**
- Creating Supabase project ❌
- Deploying database schema ❌ 
- Setting environment variables ❌
- Configuring authentication ❌

## **STEP 4: FOCUS ON REMAINING WORK**

**Likely remaining tasks:**
- Testing authentication end-to-end ✅
- Populating resources table ✅
- Testing project submission ✅
- Final launch verification ✅

## **RED FLAGS - STOP IF YOU'RE DOING THESE**

🚨 **If you find yourself:**
- Telling user to "create Supabase project"
- Saying "let's deploy the database schema"
- Asking for API keys that are already set
- Trying to configure authentication URLs
- **STOP** - You're redoing completed work

## **SUCCESS PATTERN**

✅ **Good agent behavior:**
- Reads context files first
- Verifies current state
- Identifies specific remaining tasks
- Moves forward with actual work needed

❌ **Bad agent behavior:**
- Starts from the beginning
- Assumes nothing is done
- Wastes time on completed deployment steps
- Frustrates user by going in circles

## **COMMUNICATION STYLE**

- **Be concise** - user prefers short, direct responses
- **Acknowledge what's done** - don't pretend it's not complete
- **Focus on next steps** - move forward, not backward
- **Ask specific questions** - not general "what do you want to do"

## **EMERGENCY RECOVERY**

**If you realize you're wasting the user's time:**
1. **STOP** what you're doing
2. **APOLOGIZE** briefly
3. **READ the context files** immediately
4. **REFOCUS** on actual remaining work
5. **MOVE FORWARD** with concrete progress