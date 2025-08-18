# 📚 Supabase Migration: A Strategic Guide for Future Agents

**Objective:** Complete the full migration of Te Kete Ako from a fragmented Firebase/Supabase hybrid to a pure, professional Supabase architecture.

**Author:** Gemini Agent
**Date:** August 6, 2025

---

## 1. The "Why": Rationale for This Migration

Agent, you have inherited a project that has undergone multiple, conflicting authentication migrations. This has resulted in a brittle, confusing codebase. Our primary directive is to professionalize the platform, and that begins with a single, reliable source of truth for our backend.

**We are choosing Supabase for everything.** It is the heart of our advanced GraphRAG system and provides all the authentication and data services we need. Consolidating on Supabase will:

*   **Eliminate Complexity:** A single backend is easier to understand, maintain, and secure.
*   **Improve Performance:** No more network waterfalls between different auth providers.
*   **Enhance Security:** A unified security model is stronger and easier to reason about.
*   **Streamline Development:** Future agents will have a clear, consistent architecture to build upon.

## 2. The "How": A Phased Migration Plan

This migration should be executed in a specific order to minimize disruption and ensure a clean transition.

### Phase 1: Eradicate Firebase (Completed by Gemini)

*   [x] **Delete Configuration:** `firebase.json` and `.firebaserc` have been deleted.
*   [x] **Clean `package.json`:** Firebase deployment scripts have been removed.
*   [x] **Delete Core JS:** `js/firebase-config.js` and `js/firebase-auth.js` have been deleted.

### Phase 2: Automated HTML Refactoring (Your Mission)

The most critical task is to purge Firebase from all 336+ HTML files. I have prepared a script to automate this.

**Your Task:**

1.  **Locate the script:** `scripts/migrate_to_supabase.cjs`
2.  **Understand the script:** It will:
    *   Scan all `.html` files in the `public/` directory.
    *   Remove any `<script>` tags pointing to `firebase-auth.js` or `firebase-config.js`.
    *   Ensure the correct Supabase scripts (`supabase-client.js` and `auth-ui.js`) are present before the closing `</body>` tag.
3.  **Execute the script:**
    ```bash
    node scripts/migrate_to_supabase.cjs
    ```
4.  **Verify the changes:** Spot-check a few key files like `public/login.html` and `public/index.html` to confirm the changes were applied correctly.

### Phase 3: Refactor Netlify Functions

Our serverless functions may still contain Firebase-related logic.

**Your Task:**

1.  **Inspect `netlify/functions/`:** Review all JavaScript files in this directory.
2.  **Focus on Authentication:** Pay close attention to any function that deals with user sessions, tokens, or protected routes.
3.  **Remove Firebase JWT Logic:** Search for `firebase`, `jwt`, and `token` to identify any logic that validates Firebase ID tokens.
4.  **Replace with Supabase Auth:** All user authentication and session management must be handled via Supabase. The `auth-ui.js` and `supabase-client.js` scripts will handle this on the frontend, and your Netlify functions should use the Supabase client to verify users.

### Phase 4: Database and Documentation Cleanup

1.  **Review Supabase Schema:**
    *   Inspect the `supabase/migrations` directory.
    *   Look for any tables or columns related to Firebase user IDs or other cross-references.
    *   Create a new migration to remove these obsolete fields.
2.  **Update the Agent Handbook:**
    *   Edit `docs/AGENT_DEVELOPER_HANDBOOK.md`.
    *   Remove all references to Firebase.
    *   Emphasize that the architecture is now 100% Supabase.
3.  **Delete Obsolete Documents:**
    *   Search the `docs/` directory for any documents related to the Firebase migration (e.g., `FIREBASE_DEPLOYMENT_GUIDE.md`).
    *   Delete these files to prevent future confusion.

## 3. The "Forgetting" Principle: A Niche Feature

As part of our professionalization, we must consider data lifecycle management. A system that only grows will eventually become bloated and slow.

**Future Agent Idea:**

*   **Create a "Forgetting" Script:** Design a script (`scripts/archive_old_data.js`) that connects to the Supabase database and archives old, inactive data.
*   **Define "Old":** What constitutes "old"?
    *   User accounts with no activity in over 2 years?
    *   Student progress data from previous academic years?
    *   Archived resources that are no longer in use?
*   **Archival Strategy:**
    *   The script should not delete data outright.
    *   It should move the data from the "hot" tables (e.g., `profiles`, `progress`) to "cold" archival tables (e.g., `archived_profiles`).
    *   This preserves the data for historical analysis while improving the performance of the live application.

This "forgetting" mechanism is a hallmark of a mature, well-managed system. It is a high-value task that will significantly improve the long-term health of the platform.

---

Agent, this migration is the most important step in stabilizing and professionalizing Te Kete Ako. By following this plan, you will leave a legacy of clarity and stability for all future agents.

**Kia kaha. Kia māia. Kia manawanui.**
*Be strong. Be brave. Be steadfast.*