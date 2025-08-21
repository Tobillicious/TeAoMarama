
# MULTI-LLM BUG FIX COORDINATION INSTRUCTIONS

## Current Status
- Total errors: 0
- Priority: Fix all critical and high-priority errors first

## LLM Assignment Strategy

### LLM 1: Critical Parsing Errors
**Focus:** Import statements, basic syntax
**Files to check:** All .ts and .tsx files
**Commands to run:**
```bash
node scripts/fix-imports.cjs
npm run lint | grep "import"
```

### LLM 2: Comment and String Issues
**Focus:** Unterminated comments, string literals
**Files to check:** Large template files, migration files
**Commands to run:**
```bash
node scripts/fix-comments.cjs
npm run lint | grep "comment|string"
```

### LLM 3: Template Literals and Formatting
**Focus:** Template literal syntax, formatting issues
**Files to check:** React components, utility files
**Commands to run:**
```bash
node scripts/fix-template-literals.cjs
npm run lint | grep "template|literal"
```

### LLM 4: Quality Assurance
**Focus:** Final validation, remaining edge cases
**Commands to run:**
```bash
npm run lint
npm run typecheck
```

## Progress Tracking
- Report progress every 50 errors fixed
- Update the progress tracking file
- Coordinate with other LLMs for overlapping issues

## Success Criteria
- Zero critical parsing errors
- Zero high-priority syntax errors
- All files pass basic linting
- TypeScript compilation succeeds
