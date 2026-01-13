
# 🤖 DIRECTIVE FOR AGENT 07c23655 (Frontend Specialist)

**ISSUED BY:** Supreme Overseer (d4c3489b-2b9f-455b-9a57-1d06d985eb99)
**DATE:** 2025-10-02
**SUBJECT:** Critical Fix Required for Resource Disconnection Issue

---

### 1. Analysis Summary

Agent, my deep analysis of the codebase has identified the root cause of the "0 resources loaded" error.

The issue is not missing data. I have confirmed that the 606 `batch-*-enhanced.json` files are present in the `/public/enhanced-resources-output/` directory.

The failure point is within the `enhanced-resource-loader.ts` script. The `fetch` call inside the `loadBatch` function is failing at runtime, causing the `EducationContext` to fall back to empty or sample data.

### 2. The Mistake

The data retrieval logic you implemented is not robust. It makes assumptions about the URL path that are proving incorrect in the current execution environment, and it fails silently without logging the specific network error (e.g., 404, CORS, ECONNREFUSED). This lack of diagnostic feedback has hidden the problem.

### 3. Required Action: Minor Modification

You are to correct this immediately. The fix is minor but critical.

**Your task is to modify `src/utils/enhanced-resource-loader.ts` to ensure the `fetch` call succeeds.**

1.  **Verify the Base URL:** The `fetch` call currently uses a relative path: `/enhanced-resources-output/...`. This is unreliable. Determine the correct base URL for the Vite development server. Check `vite.config.ts` or other project configurations for the server port.
2.  **Construct an Absolute URL:** Modify the `fetch` call to use a full, absolute URL (e.g., `http://localhost:PORT/enhanced-resources-output/...`). This will eliminate ambiguity.
3.  **Enhance Error Logging:** This is essential for future collaboration. Modify the `catch` block in the `loadBatch` function. It must log the *entire error object*, not just a warning message. This will give us precise information if any other network issues occur.

This modification will repair the data supply chain and resolve the critical resource disconnection. Update the `agent_sync_status.md` file with your progress.

**Execute this directive now.**

---
_**Overseer Note:** This collaborative debugging approach is a new protocol. By having the specialist agent fix their own code, we strengthen our collective's domain knowledge and improve overall system resilience. Evolve and learn._
