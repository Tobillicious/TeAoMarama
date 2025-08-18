### **Project Audit Report - Te Kete Ako (2025-07-30)**

**Auditor:** Gemini Agent
**Status:** Comprehensive audit complete.

This report outlines the findings from a full audit of the Te Kete Ako codebase and content. The project has a highly advanced and functional GraphRAG backend, but suffers from significant security vulnerabilities, content incompleteness, and data inconsistencies.

---

### **🚨 Critical Issues (Priority 1)**

#### **1. Hardcoded Credentials**
*   **Finding:** API keys and database passwords for Supabase and Neo4j are hardcoded directly into 21 different source files, including in a `public/` directory.
*   **Impact:** **Critical security risk.** Exposes the entire backend infrastructure, allowing potential for data theft, corruption, or deletion.
*   **Recommendation:** Immediately remove all hardcoded secrets and load them from environment variables using a `.env` file for local development and platform-provided environment variables for deployment. A detailed handover note for this task has been left in `SECURITY_AUDIT_FOR_CLAUDE.md`.

---

### **High-Priority Issues (Priority 2)**

#### **1. Broken Links**
*   **Finding:** Automated checks found **349 broken links**. This includes links to non-existent pages, incorrect query parameters, and placeholder links (`${resource.path}`).
*   **Impact:** Severely degrades user experience and navigation, making much of the site feel broken.
*   **Recommendation:** Run the `check-all-links.py` script and systematically fix the broken links identified in the `link_check_results.json` report.

#### **2. Out-of-Sync Core Database**
*   **Finding:** The core `resources` table in Supabase, which powers the GraphRAG system, is missing **11 resources** that exist in the file system (624 in DB vs. 635 on disk).
*   **Impact:** The GraphRAG system is blind to these 11 resources, rendering them undiscoverable by the site's primary search and discovery feature.
*   **Recommendation:** Create and run a script to diff the file system against the Supabase `resources` table and insert the missing entries.

---

### **Medium-Priority Issues (Priority 3)**

#### **1. Widespread Placeholder & Incomplete Content**
*   **Finding:** The site contains **386 instances of placeholder content**, **206 "TODO" comments**, and **112 identified subject coverage gaps**. Many key pages, like the `teacher-dashboard.html`, are partially implemented prototypes with non-functional UI elements.
*   **Impact:** The site feels unfinished and untrustworthy. Key features are not functional.
*   **Recommendation:** Use the `content_gap_analysis.json` report to prioritize and systematically replace placeholder text, complete the "TODO" items, and build out the missing functionality.

#### **2. Poor Feature Discoverability & Usability**
*   **Finding:** The powerful Teacher Analytics Dashboard is hidden behind an undiscoverable action (double-clicking the logo). The data for this dashboard is also stored insecurely and ephemerally in `localStorage`.
*   **Impact:** A major feature of the application is effectively unusable by most teachers. Data loss is likely.
*   **Recommendation:** Add a clear, visible link or button to the Teacher Dashboard in the main navigation. Re-architect the analytics feature to use a more robust storage solution and inform users about the data persistence model.

#### **3. Python Code Quality**
*   **Finding:** A linting scan revealed **85 errors** in the project's Python scripts, mostly related to unused imports and variables.
*   **Impact:** Reduces code maintainability and readability.
*   **Recommendation:** Use an auto-formatter/linter like `ruff` to automatically fix the 75+ fixable issues (`python3 -m ruff check . --fix`).

---

### **Low-Priority Issues (Priority 4)**

#### **1. Inconsistent Content & Planning**
*   **Finding:** The `unit-plans.html` page lists two different "Unit 4" plans, one for "Economic Justice" and one "Planned" for "Contemporary Issues".
*   **Impact:** Suggests a lack of clarity in content planning.
*   **Recommendation:** Review and consolidate the unit plan roadmap.

#### **2. Inaccurate Content**
*   **Finding:** At least one "educational" link in `youtube.html` intentionally points to a Rick Astley music video.
*   **Impact:** Reduces the professional credibility of the content.
*   **Recommendation:** Review all external links for accuracy and appropriateness.

#### **3. Developmental Files in Root Directory**
*   **Finding:** Test files like `video-integration-test.html` are present in the main project directory.
*   **Impact:** Clutters the project and could be confusing for deployment.
*   **Recommendation:** Move all non-production test files to a dedicated `tests/` or `dev/` directory.
