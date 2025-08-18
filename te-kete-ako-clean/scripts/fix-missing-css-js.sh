#!/bin/bash

# Fix missing CSS and JS links that were removed by the "performance fix"

echo "🔧 Fixing missing CSS/JS links across critical pages..."

# Files that likely have broken CSS/JS links
CRITICAL_FILES=(
    "public/lessons.html"
    "public/games.html" 
    "public/unit-plans.html"
    "public/dashboard.html"
    "public/login.html"
    "public/register.html"
)

# Standard CSS includes
CSS_INCLUDES='    <link rel="stylesheet" href="/css/design-system-v3.css"/>
    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="/css/mobile-revolution.css"/>
    <link rel="stylesheet" href="/css/print.css" media="print"/>'

# Standard JS includes  
JS_INCLUDES='    <!-- Core functionality -->
    <script src="js/shared-components.js"></script>
    <script src="js/mobile-revolution.js"></script>
    <script src="js/pwa-registration.js"></script>'

for file in "${CRITICAL_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo "Checking $file..."
        
        # Check if file has missing CSS (only design-system-v3.css and blank lines)
        if grep -q 'design-system-v3.css"/>' "$file" && ! grep -q 'main.css' "$file"; then
            echo "  → Fixing CSS links in $file"
            # Replace the broken CSS section
            sed -i '' 's|design-system-v3.css"/>.*</head>|design-system-v3.css"/>\
    <link rel="stylesheet" href="/css/main.css"/>\
    <link rel="stylesheet" href="/css/mobile-revolution.css"/>\
    <link rel="stylesheet" href="/css/print.css" media="print"/>\
</head>|' "$file"
        fi
        
        # Check if file is missing core JS
        if ! grep -q 'shared-components.js' "$file" && grep -q '</body>' "$file"; then
            echo "  → Adding missing JS to $file"
            # Add before closing body tag
            sed -i '' 's|</body>|    <!-- Core functionality -->\
    <script src="js/shared-components.js"></script>\
    <script src="js/mobile-revolution.js"></script>\
    <script src="js/pwa-registration.js"></script>\
</body>|' "$file"
        fi
    else
        echo "⚠️  File not found: $file"
    fi
done

echo "✅ CSS/JS links fixed for critical pages"

# Quick verification
echo ""
echo "📊 Verification - checking for main.css inclusion:"
for file in "${CRITICAL_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        if grep -q 'main.css' "$file"; then
            echo "  ✅ $file - CSS fixed"
        else
            echo "  ❌ $file - still missing CSS"
        fi
    fi
done