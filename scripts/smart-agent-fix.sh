#!/bin/bash

echo "🤖 SMART AGENT FIX - BULLETPROOF VERSION"
echo "=========================================="
echo "Fixing corruption patterns without creating new files..."

# Fix all the corruption patterns we've identified
find . -name "*.ts" -o -name "*.tsx" | while read file; do
    if [ -f "$file" ]; then
        # Fix import statements
        sed -i '' "s/fromfs/from 'fs'/g" "$file"
        sed -i '' "s/frompath/from 'path'/g" "$file"
        sed -i '' "s/fromchild_process/from 'child_process'/g" "$file"
        sed -i '' "s/fromfs\/promises/from 'fs\/promises'/g" "$file"
        
        # Fix unterminated strings
        sed -i '' "s/const \([a-zA-Z_][a-zA-Z0-9_]*\) = process\.env\.\([a-zA-Z_][a-zA-Z0-9_]*\) || ';/const \1 = process.env.\2 || '';/g" "$file"
        
        # Fix extra quotes
        sed -i '' "s/''';/';/g" "$file"
        sed -i '' "s/';$/';/g" "$file"
        
        # Fix shebang lines
        sed -i '' "s/^#!\/usr\/bin\/env tsx;/#!/usr/bin/env tsx/g" "$file"
        
        # Fix missing quotes in imports
        sed -i '' "s/import \([a-zA-Z_][a-zA-Z0-9_]*\) from \([^;]*\);/import \1 from '\2';/g" "$file"
    fi
done

echo "✅ Corruption patterns fixed!"
echo "🔍 Checking current error count..."

# Count errors
ERROR_COUNT=$(npm run lint 2>&1 | grep -c "error" || echo "0")
echo "📊 Current error count: $ERROR_COUNT"

echo "🎯 Smart agent fix complete!"
