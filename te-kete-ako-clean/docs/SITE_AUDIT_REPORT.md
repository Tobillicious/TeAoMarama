### Site Audit Report

- **Pages scanned**: 647
- **Missing includes**: 966
- **Third-party references**: deepseek, exa, firebase, gcp, gtag, netlify, openai, supabase, vercel
- **Files with placeholders**: 695
- **TODO/FIXME files**: 70
- **Orphan asset candidates**: 17

### Recommendations
- **CSS include standard**: use `css/main.css` with correct relative path; fix any `/css/style.css` or `css/style.css` mismatches.
- **Auth standard**: Supabase is current; remove or archive Firebase/Auth0 remnants; ensure `js/supabase-client.js` and `js/auth-ui.js` are the only auth clients loaded.
- **Remove template placeholders**: replace any `${...}` tokens with final values.
- **Archive candidates**: move orphan assets and deprecated directories to `archive/` with a README.
- **Include paths**: convert root-relative `/css/*` to relative paths for static hosting consistency.

### Top Missing Includes (first 15)
- public/activities.html → src `js/activity-generator.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/activity-generator.js
- public/activities.html → src `js/shared-components.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/shared-components.js
- public/activities.html → src `js/footer.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/footer.js
- public/curriculum-science.html → src `js/shared-components.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/shared-components.js
- public/my-submissions.html → src `js/main.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/main.js
- public/resource-connections.html → src `js/main.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/main.js
- public/other-resources.html → src `js/filtering-system.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/filtering-system.js
- public/other-resources.html → src `js/shared-components.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/shared-components.js
- public/other-resources.html → src `js/footer.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/footer.js
- public/other-resources.html → src `js/other-resources-filtering.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/other-resources-filtering.js
- public/about.html → src `js/simple-bookmarks.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/simple-bookmarks.js
- public/about.html → src `js/main.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/main.js
- public/about.html → src `js/shared-components.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/shared-components.js
- public/about.html → src `js/footer.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/footer.js
- public/privacy-policy.html → src `js/global-feedback.js` → /Users/admin/Documents/te-kete-ako-clean/public/js/global-feedback.js

### Third-Party Reference Map
- **deepseek**: 39 files
- **exa**: 781 files
- **firebase**: 15 files
- **gcp**: 2 files
- **gtag**: 64 files
- **netlify**: 67 files
- **openai**: 182 files
- **supabase**: 930 files
- **vercel**: 3 files