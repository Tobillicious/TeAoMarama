# 🚨 CRITICAL: Authentication Fix Required

## Problem
Authentication is **completely broken** due to mismatched Supabase project URL and API keys.

### Current State
- **Supabase URL**: `https://nlgldaqtubrlcqddppbq.supabase.co` ✅ CORRECT
- **API Key**: From project `kpawkfxdqzhrhumlutjw` ❌ WRONG PROJECT

This mismatch means **NO users can login or register**.

## Solution
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select the **nlgldaqtubrlcqddppbq** project
3. Navigate to Settings → API
4. Copy the **anon/public** key
5. Replace the API key in `js/env-config.js` line 19

## Expected API Key Format
The correct key should decode to show `"ref":"nlgldaqtubrlcqddppbq"` instead of `"ref":"kpawkfxdqzhrhumlutjw"`

## Files to Update
- `js/env-config.js` - Line 19 (SUPABASE_ANON_KEY)

## Testing
After updating the API key:
1. Open `auth-diagnostics.html` to verify the fix
2. Test login/signup functionality
3. Confirm user authentication works

## Priority
**CRITICAL** - Users cannot access authenticated features until this is fixed.

## Technical Details
Current JWT payload shows wrong project:
```json
{
  "iss": "supabase", 
  "ref": "kpawkfxdqzhrhumlutjw",  // ❌ Should be "nlgldaqtubrlcqddppbq"
  "role": "anon",
  "iat": 1721781435,
  "exp": 2037357435
}
```

The correct JWT should show `"ref": "nlgldaqtubrlcqddppbq"` to match the URL.