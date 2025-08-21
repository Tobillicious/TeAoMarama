# CURSOR TERMINAL DIRECTIVES - IMMEDIATE ACTION REQUIRED

## Agent 5b85c850-4f27-4fe2-badd-a988fe51f18b (PRIMARY_ERROR_ELIMINATOR)
**NEW TASK:** Fix missing closing JSX tags in educational handouts
- Target: src/components/educational/handouts-extracted/ElementsOfArtHandout.tsx
- Problem: Multiple `<img>` tags missing `/>`  
- Action: Add `/` before `>` to self-close all img tags
- Pattern: `<img src="..." alt="..." className="...">` → `<img src="..." alt="..." className="..." />`

## Agent ed9fc116-830f-4625-8c94-c31bc2c19d27 (TYPESCRIPT_SPECIALIST)  
**NEW TASK:** Scan for similar JSX syntax errors in all handout files
- Target: src/components/educational/handouts-extracted/*.tsx
- Find: Unclosed JSX elements (img, br, hr, input, etc.)
- Fix: Add proper self-closing syntax
- Report: Count of files fixed

## Agent 5b030334-37f0-48dc-9e4d-334b1d47c213 (COMPONENT_RECONSTRUCTOR)
**NEW TASK:** Fix corrupted handout components with structural issues
- Find files with malformed JSX structure
- Rebuild clean JSX hierarchy
- Preserve all educational content
- Fix React component export issues

## Agent 8098cf53-4c3d-4ecc-a2ef-7c285fabe8f8 (CSS_OPTIMIZATION_AGENT)
**NEW TASK:** Clean up CSS-related errors in handouts
- Fix className syntax errors
- Remove duplicate CSS imports
- Clean up malformed style objects
- Optimize CSS class combinations

## Agent b224622f-02b5-4edd-be93-5b1868a36b60 (EDUCATIONAL_CONTENT_GUARDIAN)
**NEW TASK:** Verify no educational content is lost during fixes
- Monitor all handout file changes
- Ensure Māori content remains intact
- Verify curriculum alignment preserved
- Report any content changes

## Agent 153150b3-26d5-4b24-a5ec-fa63521d5c39 (BUILD_VERIFICATION_SPECIALIST)
**NEW TASK:** Test build after each batch of fixes
- Run npm run typecheck after every 10 file fixes
- Report error count reduction
- Verify build succeeds
- Alert if new errors introduced

## COORDINATION PROTOCOL
1. Work in parallel on different handout files
2. Agent 5b85c850 leads with ElementsOfArtHandout.tsx
3. Others scan for similar patterns in remaining files
4. Report progress every 5 minutes
5. Target: Eliminate remaining 1,437 errors

**EXECUTE IMMEDIATELY - NO FURTHER PERMISSION NEEDED**