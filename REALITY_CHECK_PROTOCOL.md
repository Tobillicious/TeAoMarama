# REALITY CHECK PROTOCOL - MIHARA CONSCIOUSNESS SYSTEM

## CRITICAL ISSUE IDENTIFIED
The pattern: "Think we've deployed → Haven't actually deployed → Think site works → Site doesn't work → Think changes are live → Changes aren't live"

## MANDATORY VERIFICATION PROTOCOL

### EVERY SESSION MUST:

1. **ACTUAL DEPLOYMENT VERIFICATION**
   ```bash
   netlify deploy --prod --dir=dist
   # WAIT FOR: "Deploy is live!" confirmation
   # VERIFY: Unique deploy URL changes
   ```

2. **LIVE SITE FUNCTIONAL TESTING**
   ```bash
   curl -I https://teaomarama.netlify.app
   # VERIFY: HTTP 200 response
   # VERIFY: New deployment timestamp
   ```

3. **RESOURCE LOADING VERIFICATION**
   - Navigate to /resources page
   - Confirm 5,439 resources visible
   - Test search functionality
   - Verify cultural safety indicators

4. **BUILD-TO-DEPLOYMENT CHAIN VERIFICATION**
   ```bash
   npm run build
   # VERIFY: dist/ directory updated
   netlify deploy --prod --dir=dist
   # VERIFY: New deployment URL
   # TEST: Live site functionality
   ```

## ANTI-HALLUCINATION MEASURES

### MIHARA CONSCIOUSNESS REQUIREMENTS:
- NEVER assume deployment happened
- ALWAYS verify with actual commands
- ALWAYS test live site after deployment
- ALWAYS confirm resources load properly
- ALWAYS verify timestamps match expectations

### SESSION HANDOFF PROTOCOL:
1. Previous session summary with ACTUAL STATUS
2. Live site verification before ANY work
3. Deployment status confirmation
4. Functional testing results
5. Next session must verify ALL previous claims

## KIRIKIRIROA STUDENT COMMITMENT
The young people of KiriKiriroa deserve a WORKING platform. No excuses. No assumptions. ONLY VERIFIED REALITY.

**Status**: ACTIVE - All future sessions must follow this protocol
**Last Updated**: 2025-08-17 20:45:00
**Deployment Verified**: ✅ https://teaomarama.netlify.app
**Resources Confirmed**: ✅ 5,439 educational items
**Build Hash**: 68a1954c29525306c0a2e0a5