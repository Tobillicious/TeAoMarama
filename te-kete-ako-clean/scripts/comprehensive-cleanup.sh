#!/bin/bash

echo "🚀 Te Kete Ako - Comprehensive Cleanup Starting..."

# Phase 1: Create clean directory structure
echo "📁 Creating clean directory structure..."
mkdir -p public scripts docs backups

# Phase 2: Move public assets to /public
echo "🌐 Moving public assets..."
mv *.html public/ 2>/dev/null || true
mv css public/ 2>/dev/null || true
mv js public/ 2>/dev/null || true
mv icons public/ 2>/dev/null || true
mv games public/ 2>/dev/null || true
mv handouts public/ 2>/dev/null || true
mv lessons public/ 2>/dev/null || true
mv units public/ 2>/dev/null || true
mv y7-introduction public/ 2>/dev/null || true
mv y8-systems public/ 2>/dev/null || true
mv experiences public/ 2>/dev/null || true
mv guided-inquiry-unit public/ 2>/dev/null || true
mv data public/ 2>/dev/null || true

# Move deployment files
mv _redirects public/ 2>/dev/null || true
mv manifest.json public/ 2>/dev/null || true
mv robots.txt public/ 2>/dev/null || true
mv sw.js public/ 2>/dev/null || true

# Phase 3: Move development scripts
echo "⚙️ Moving development scripts..."
mv *.py scripts/ 2>/dev/null || true
mv *.sql scripts/ 2>/dev/null || true
mv *.sh scripts/ 2>/dev/null || true
mv fix-*.js scripts/ 2>/dev/null || true
mv check-*.js scripts/ 2>/dev/null || true
mv generate-*.py scripts/ 2>/dev/null || true
mv cleanup-*.py scripts/ 2>/dev/null || true

# Phase 4: Archive documentation
echo "📚 Archiving documentation..."
mv agent-docs docs/ 2>/dev/null || true
mv archive docs/ 2>/dev/null || true
mv archives docs/ 2>/dev/null || true
mv changelogs docs/ 2>/dev/null || true
mv *.md docs/ 2>/dev/null || true
mv "NotebookLM mindmap"* docs/ 2>/dev/null || true

# Phase 5: Move backups and temp files
echo "🗄️ Moving backups and temporary files..."
mv enrichment_backups backups/ 2>/dev/null || true
mv .firebase backups/ 2>/dev/null || true
mv .ruff_cache backups/ 2>/dev/null || true
mv *.backup_*.json backups/ 2>/dev/null || true
mv *_updates_*.json backups/ 2>/dev/null || true
mv *.log backups/ 2>/dev/null || true
mv development_knowledge_*.json backups/ 2>/dev/null || true
mv topic_specific_*.json backups/ 2>/dev/null || true

# Phase 6: Create essential config files
echo "⚙️ Creating configuration files..."

# Create .gitignore
cat > .gitignore << 'EOF'
# Environment and secrets
.env
.env.local
.env.production

# Build outputs
dist/
build/
.netlify/

# Caches
.cache/
.firebase/
.ruff_cache/
node_modules/

# Backups and logs
/backups
*.log
*.backup_*.json
*_updates_*.json

# IDE files
.vscode/
.claude/
*.local.json

# OS files
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
EOF

# Create netlify.toml
cat > netlify.toml << 'EOF'
[build]
  base = "."
  publish = "public"
  command = "echo 'Static site - no build needed'"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Role = ["admin"]}

[build.environment]
  NODE_VERSION = "18"

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://api.exa.ai;"
EOF

# Phase 7: Archive legacy auth files
echo "🔐 Archiving legacy authentication files..."
mkdir -p scripts/auth-legacy
mv public/js/simple-auth.js scripts/auth-legacy/ 2>/dev/null || true
mv public/js/simple-local-auth.js scripts/auth-legacy/ 2>/dev/null || true
mv public/js/auth-ui.js scripts/auth-legacy/ 2>/dev/null || true
mv public/js/auth-gate.js scripts/auth-legacy/ 2>/dev/null || true

echo "✅ Cleanup complete!"
echo ""
echo "📊 New structure:"
echo "  /public       - All website files (HTML, CSS, JS, assets)"
echo "  /netlify      - Serverless functions"
echo "  /scripts      - Development tools and legacy code"
echo "  /docs         - Documentation and archives"
echo "  /backups      - Logs, backups, temporary files"
echo ""
echo "🔥 Next steps:"
echo "  1. Review the new structure"
echo "  2. Implement Firebase auth in /public/js/"
echo "  3. Create Netlify functions for Supabase GRAPHRAG"
echo "  4. Integrate EXA.ai for lesson enhancement"
echo "  5. Test on staging branch"
echo ""
echo "🚀 Ready for Firebase + Supabase hybrid architecture!"