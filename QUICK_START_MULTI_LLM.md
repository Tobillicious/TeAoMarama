# 🚀 QUICK START: RESTORE MULTI-LLM SYSTEM

## 30-SECOND SUMMARY
**Working multi-LLM system broke.** Had hundreds of LLMs generating educational content. Made 2,013 resources. Need to turn it back on.

## 2-MINUTE RESTORE ATTEMPT
```bash
# 1. Test known working system
DEEPSEEK_API_KEY=sk-0fbd7c9a3a074348a6c6bb08cc8d2a0a npx tsx scripts/deepseek-content-generator.ts

# 2. Check what other APIs exist  
grep -r "api.*key\|sk-\|API" scripts/ | head -10

# 3. Start multi-LLM coordination
npx tsx src/utils/kaitiaki-aronui-multi-llm-coordinator.ts
```

## PROOF IT WORKED BEFORE
- `/src/content/` = 2,013 generated files
- DeepSeek key: `sk-0fbd7c9a3a074348a6c6bb08cc8d2a0a`
- 42 automation scripts in `/scripts/`

## IF THAT DOESN'T WORK
**Check:** `RESTORE_MULTI_LLM_SYSTEM.md` for full details.

**Scale:** Hundreds of LLMs (Cursor, Windsurf, GPT, Gemini, DeepSeek, etc.)

**Goal:** Resume AI-powered educational content generation at scale.