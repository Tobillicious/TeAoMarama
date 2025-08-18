# 🚀 Onboarding Guide for Claude: Te Kete Ako Phase 4 & Refactoring

**PROJECT:** Te Kete Ako Dynamic Platform Transformation  
**AUTHOR:** Gemini (Auditor)  
**RECIPIENT:** Claude (Implementer)

## 🎯 Mission Overview

Welcome back to Te Kete Ako. This document provides a comprehensive action plan based on a full-site audit. Your mission is to continue the transformation of the site into a dynamic, database-driven platform while also addressing key architectural improvements for long-term maintainability.

The work is divided into two main streams:
1.  **Dynamic Feature Implementation (Phase 4 Continuation):** Activating the backend connections for the teacher dashboard, project submissions, and authentication.
2.  **Architectural Refactoring:** Improving the frontend codebase by reducing duplication and modularizing CSS for better scalability.

---

## 📂 File-Specific Action Items

I have embedded detailed, actionable comment blocks directly within the files that require work. **These comments are your primary source of truth for the tasks.** Below is a summary of where to find them and what they entail.

### 1. Teacher & Student Dynamic Features (Highest Priority)

*   **`teacher-dashboard.html`**
    *   **Location:** Root directory.
    *   **Task:** Connect the static dashboard to the Supabase backend. Fetch and display real data for students, submissions, and analytics. Implement dynamic charts and activate the action buttons.
    *   **Reference:** See the `GEMINI-INSCRIBED TASK` comment at the bottom of the file.

*   **`project-submission.html`**
    *   **Location:** Root directory.
    *   **Task:** Create the backend logic to handle student project submissions. This involves creating a new Netlify function (`project-submit`), implementing file uploads to Supabase Storage, and saving all data to the `student_projects` table.
    *   **Reference:** See the `GEMINI-INSCRIBED TASK` comment at the bottom of the file.

*   **`netlify/functions/auth-login.js` & `auth-register.js`**
    *   **Location:** `netlify/functions/` directory.
    *   **Task:** These functions are structurally complete but need activation. Verify that the Supabase environment variables (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) are correctly configured in the Netlify deployment UI. Confirm the database trigger for profile creation is active.
    *   **Reference:** See the `GEMINI-INSCRIBED TASK` comments at the top of both files.

### 2. Architectural Refactoring (High-Impact Improvements)

*   **`js/main.js` (Two Tasks)**
    *   **Location:** `js/` directory.
    *   **Task 1 (Supabase Client):** Centralize the Supabase client initialization by creating a new `js/supabase-client.js` file. This will provide a single, importable client for the entire frontend, improving maintainability.
    *   **Task 2 (Shared Components):** Eliminate HTML duplication by creating a `js/shared-components.js` script to dynamically inject the site header and footer into all pages. This involves creating `_includes/header.html` and `_includes/footer.html` snippets.
    *   **Reference:** See the two `GEMINI-INSCRIBED TASK` comments at the top of the file.

*   **`css/main.css`**
    *   **Location:** `css/` directory.
    *   **Task:** The current CSS file is monolithic. Your task is to modularize it by breaking it down into smaller, component-based files (e.g., `_header.css`, `_cards.css`) stored in a new `css/components/` directory. The main `main.css` file will then use `@import` to assemble them.
    *   **Reference:** See the `GEMINI-INSCRIBED TASK` comment at the top of the file.

*   **`sw.js` (Service Worker)**
    *   **Location:** Root directory.
    *   **Task:** Enhance the offline experience by caching API GET requests. Modify the service worker's fetch handler to use a "Stale-While-Revalidate" strategy for API calls, allowing the app to display cached data when offline.
    *   **Reference:** See the `GEMINI-INSCRIBED TASK` comment at the top of the file.

---

## 🏆 Success Metrics

Your work will be considered successful when:

1.  **The Teacher Dashboard is fully dynamic**, displaying live data from the Supabase database.
2.  **Students can submit projects**, with their data and files correctly stored in Supabase.
3.  **The CSS and common HTML (header/footer) are modularized**, leading to a cleaner and more maintainable codebase.
4.  **The application provides a robust offline experience**, allowing users to view previously fetched dynamic data without a network connection.

This plan provides a clear path forward for both immediate feature implementation and long-term architectural health. Kia kaha!
