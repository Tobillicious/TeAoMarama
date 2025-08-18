# Te Kete Ako - Comprehensive Cleanup & Architecture Plan

## Current State Assessment
- **Authentication**: Broken dual system (Supabase + Firebase fragments)
- **Repo Structure**: 400+ files in root, archives/scripts/backups mixed with public assets
- **Security**: API keys potentially exposed, no proper .gitignore
- **Educational Content**: Static lesson plans need EXA.ai enhancement for external resources
- **Deployment**: Firebase hosting with potential file leakage

## Phase 1: Emergency Cleanup (Next 2 Hours)

### 1.1 Repo Structure Cleanup
```bash
# Create clean structure
mkdir -p {public,netlify/functions,scripts,docs,backups}

# Move public assets
mv *.html public/
mv {css,js,icons,games,handouts,lessons,units,y8-systems} public/
mv {_redirects,manifest.json,robots.txt,sw.js} public/

# Move development files
mv *.py scripts/
mv *.sql scripts/
mv *.sh scripts/

# Archive documentation and backups
mv {agent-docs,archive,archives,changelogs} docs/
mv enrichment_backups backups/
mv *.backup_*.json backups/
mv *_updates_*.json backups/
```

### 1.2 Security & Deployment
- **Create proper .gitignore**
- **Move API keys to Netlify environment variables**
- **Add netlify.toml to exclude private files from deployment**
- **Create staging branch for safe testing**

### 1.3 Authentication Unification
- **Remove all legacy auth scripts** (simple-auth.js, auth-ui.js, etc.)
- **Implement Firebase-only auth with Supabase GRAPHRAG bridge**
- **Add email verification and password reset flows**

## Phase 2: EXA.ai Educational Enhancement (Next 4 Hours)

### 2.1 Automated Resource Discovery
Using EXA.ai to enhance lesson plans with:
- **NZhistory.govt.nz specific articles** for historical content
- **RNZ educational content** for current affairs
- **CrashCourse videos** for concept reinforcement  
- **Wikipedia articles** for deeper context
- **Guardian education articles** for global perspectives

### 2.2 Implementation Strategy
```javascript
// scripts/exa-lesson-enhancer.js
async function enhanceLessonWithResources(lessonTopic, yearLevel) {
  const exaResults = await exa.search({
    query: `${lessonTopic} education resources site:nzhistory.govt.nz OR site:rnz.co.nz OR site:theguardian.com/education`,
    numResults: 5,
    category: "educational"
  });
  
  return formatResourcesForLesson(exaResults);
}
```

## Phase 3: Production Architecture (Next 6 Hours)

### 3.1 Firebase + Supabase Hybrid
```
[Browser] → Firebase Auth → Netlify Function → Supabase GRAPHRAG
```

### 3.2 Enhanced Security
- **HttpOnly cookies for auth tokens**
- **Rate limiting on GRAPHRAG queries**
- **Audit logging for teacher access**
- **CSP headers for XSS protection**

### 3.3 Educational Features
- **Teacher dashboards** with class analytics
- **Student progress tracking** with Māori wordle scores
- **Assignment creation** with EXA.ai suggested resources
- **Bulk resource enhancement** across all lesson plans

## Phase 4: Quality Assurance (Next 2 Hours)

### 4.1 Testing Checklist
- [ ] Firebase auth signup/login/logout flow
- [ ] Email verification process
- [ ] Password reset functionality
- [ ] Protected page access (My Kete, teacher dashboard)
- [ ] Supabase GRAPHRAG queries through Netlify functions
- [ ] EXA.ai resource enhancement
- [ ] Mobile responsive auth forms
- [ ] Cross-browser compatibility

### 4.2 Performance & SEO
- [ ] Lighthouse audit scores >90
- [ ] Core Web Vitals optimization
- [ ] Proper meta tags and Open Graph
- [ ] Structured data for educational content

## Immediate Next Steps (Right Now)

1. **Run repo cleanup script** to organize file structure
2. **Implement Firebase auth with email verification**
3. **Create Netlify function for Supabase GRAPHRAG bridge**
4. **Integrate EXA.ai for lesson plan enhancement**
5. **Deploy to staging for testing**
6. **Final cleanup and production deploy**

## API Keys & Environment
- **Deepseek API**: sk-65624cc9a6fa45c8a7eebe1834dc9587 (for development)
- **EXA.ai**: Available for educational resource discovery
- **Firebase**: Project configuration needed
- **Supabase**: Keep for GRAPHRAG only

## Success Metrics
- [ ] Authentication works 100% reliably across all browsers
- [ ] All lesson plans enhanced with 3-5 relevant external resources
- [ ] Teacher/student role differentiation functional
- [ ] Site-wide auth gate working (no access without login)
- [ ] GRAPHRAG accessible through secure serverless functions
- [ ] Clean, maintainable codebase with proper documentation