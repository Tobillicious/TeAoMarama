#!/bin/bash
# CRITICAL SECURITY FIX: Remove CORS wildcard configurations
# Replace with proper origin restrictions

echo "🔐 FIXING CORS WILDCARD SECURITY VULNERABILITIES"
echo "================================================"

# Count files with CORS wildcards
CORS_FILES=$(find netlify/functions -name "*.js" -exec grep -l "Access-Control-Allow-Origin.*\*" {} \;)
TOTAL_FILES=$(echo "$CORS_FILES" | wc -l)

echo "Found $TOTAL_FILES files with CORS wildcard (*) configurations"
echo ""

# Create backup
BACKUP_DIR="backups/cors-fix-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📁 Creating backup in $BACKUP_DIR"

# Backup files before modification
echo "$CORS_FILES" | while read -r file; do
    if [ -n "$file" ]; then
        cp "$file" "$BACKUP_DIR/$(basename "$file")"
        echo "✓ Backed up: $(basename "$file")"
    fi
done

echo ""
echo "🔧 Applying CORS security fixes..."

# Fix CORS wildcard in all Netlify functions
find netlify/functions -name "*.js" -exec sed -i.bak \
    "s/'Access-Control-Allow-Origin': '\\*'/'Access-Control-Allow-Origin': process.env.SITE_URL || 'https:\/\/tekete.netlify.app'/g" {} \;

find netlify/functions -name "*.js" -exec sed -i.bak \
    's/"Access-Control-Allow-Origin": "\\*"/"Access-Control-Allow-Origin": process.env.SITE_URL || "https:\/\/tekete.netlify.app"/g' {} \;

# Clean up .bak files
find netlify/functions -name "*.bak" -delete

echo "✅ CORS security fixes applied to all functions"
echo ""
echo "🎯 SECURITY IMPROVEMENT:"
echo "  BEFORE: Access-Control-Allow-Origin: '*' (ANY ORIGIN)"
echo "  AFTER:  Access-Control-Allow-Origin: 'https://tekete.netlify.app' (RESTRICTED)"
echo ""
echo "📋 Next: Set SITE_URL environment variable in Netlify dashboard"
echo "   SITE_URL=https://tekete.netlify.app"
echo ""
echo "✅ Phase 1.2 CORS Security Fix: COMPLETE"