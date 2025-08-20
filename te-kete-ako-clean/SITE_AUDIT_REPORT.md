### Site Audit Report

- **Pages scanned**: 708
- **Missing includes**: 9402
- **Third-party references**: deepseek, exa, firebase, gcp, gemini, gtag, netlify, openai, supabase, vercel
- **Files with placeholders**: 589
- **TODO/FIXME files**: 4
- **Orphan asset candidates**: 40

### Recommendations
- **CSS include standard**: use `css/main.css` with correct relative path; fix any `/css/style.css` or `css/style.css` mismatches.
- **Auth standard**: Supabase is current; remove or archive Firebase/Auth0 remnants; ensure `js/supabase-client.js` and `js/auth-ui.js` are the only auth clients loaded.
- **Remove template placeholders**: replace any `${...}` tokens with final values.
- **Archive candidates**: move orphan assets and deprecated directories to `archive/` with a README.
- **Include paths**: convert root-relative `/css/*` to relative paths for static hosting consistency.

### Top Missing Includes (first 15)
- public/activities.html → src `js/activity-generator.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/activity-generator.js
- public/index.html → src `js/accessibility-enhancements.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/accessibility-enhancements.js
- public/other-resources.html → src `js/filtering-system.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/filtering-system.js
- public/other-resources.html → src `js/other-resources-filtering.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/other-resources-filtering.js
- public/about.html → src `js/simple-bookmarks.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/simple-bookmarks.js
- public/privacy-policy.html → src `js/global-feedback.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/global-feedback.js
- public/privacy-policy.html → src `js/streamlined-header.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/streamlined-header.js
- public/contact.html → src `js/simple-bookmarks.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/simple-bookmarks.js
- public/youtube.html → src `js/filtering-system.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/filtering-system.js
- public/youtube.html → src `js/advanced-youtube-search.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/advanced-youtube-search.js
- public/unit-plans.html → href `/units/y8-digital-kaitiakitanga/index.html` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/units/y8-digital-kaitiakitanga/index.html
- public/te-ao-maori.html → src `js/simple-bookmarks.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/simple-bookmarks.js
- public/tools.html → src `js/simple-bookmarks.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/simple-bookmarks.js
- public/search.html → src `js/search-system.js` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/js/search-system.js
- public/my-kete.html → href `favicon.ico` → /Users/admin/gemini-react-app/te-kete-ako-clean/public/favicon.ico

### Third-Party Reference Map
- **deepseek**: 103 files
- **exa**: 1859 files
- **firebase**: 29 files
- **gcp**: 1 files
- **gemini**: 2 files
- **gtag**: 18 files
- **netlify**: 165 files
- **openai**: 11 files
- **supabase**: 3122 files
- **vercel**: 1 files