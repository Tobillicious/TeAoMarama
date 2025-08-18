#!/bin/bash
# Cleanup Duplicate Mobile Toggle Script
# Fixes over-added mobile navigation elements from batch fix

echo "🧹 Te Kete Ako - Cleaning Up Duplicate Mobile Toggles..."

# Function to clean duplicates in a file
clean_file() {
    local file="$1"
    if [[ -f "$file" ]]; then
        echo "Cleaning: $file"
        
        # Create temp file for processing
        temp_file="${file}.tmp"
        
        # Remove duplicate mobile toggles - keep only the first one after nav-brand
        awk '
            /<div class="mobile-nav-toggle"/ {
                if (!seen_toggle && (prev_line ~ /<\/div>/ && prev_prev_line ~ /<h1>.*Te Kete Ako.*<\/h1>/)) {
                    print
                    seen_toggle = 1
                } else if (!seen_toggle) {
                    print
                    seen_toggle = 1
                }
                next
            }
            /<\/nav>/ {
                seen_toggle = 0
            }
            {
                print
                prev_prev_line = prev_line
                prev_line = $0
            }
        ' "$file" > "$temp_file"
        
        # Remove multiple consecutive mobile toggles
        sed -i '' '/mobile-nav-toggle/,+3{
            N
            N
            N
            /mobile-nav-toggle.*mobile-nav-toggle/d
        }' "$temp_file"
        
        # Replace original file if changes were made
        if ! cmp -s "$file" "$temp_file"; then
            mv "$temp_file" "$file"
            echo "  ✅ Cleaned duplicates"
        else
            rm "$temp_file"
            echo "  ℹ️  No duplicates found"
        fi
    fi
}

# Count affected files before cleanup
affected_files=$(find public -name "*.html" -exec grep -l "mobile-nav-toggle.*mobile-nav-toggle" {} \; | wc -l)
echo "Found $affected_files files with duplicate mobile toggles"

# Clean all HTML files
echo "🔧 Phase 1: Removing duplicate mobile toggles..."
count=0
for file in public/*.html public/**/*.html; do
    if [[ -f "$file" ]] && grep -q "mobile-nav-toggle" "$file"; then
        # Count mobile toggles in file
        toggle_count=$(grep -c "mobile-nav-toggle" "$file")
        if [ "$toggle_count" -gt 3 ]; then
            echo "Cleaning $file (found $toggle_count toggles)"
            
            # More aggressive cleanup for severely affected files
            perl -i -pe '
                # Remove excessive mobile toggles, keep max 2 per file
                $toggle_count++ if /<div class="mobile-nav-toggle"/;
                if ($toggle_count > 2 && /<div class="mobile-nav-toggle"/) {
                    $_ = "";
                    $_ .= <> while $_ !~ /<\/div>/ && !eof();
                    $_ = "";
                }
            ' "$file"
            
            ((count++))
        fi
    fi
done

echo "Cleaned excessive duplicates in $count files"

# Phase 2: Final structural cleanup
echo "🔧 Phase 2: Structural navigation cleanup..."
for file in public/*.html public/**/*.html; do
    if [[ -f "$file" ]]; then
        # Ensure proper mobile toggle placement (after nav-brand, before nav-links)
        perl -i -pe '
            BEGIN { undef $/; }
            # Fix mobile toggle positioning
            s|(<div class="nav-brand">.*?</div>)\s*(<div class="nav-links">)|$1\n        <div class="mobile-nav-toggle" onclick="toggleMobileNav()">\n            <span></span>\n            <span></span>\n            <span></span>\n        </div>\n            $2|gs;
            
            # Remove any mobile toggles that are not properly positioned
            s|<div class="mobile-nav-toggle"[^>]*>.*?</div>||gs;
            
            # Re-add the properly positioned one
            s|(<div class="nav-brand">.*?</div>)(\s*)(<div class="nav-links">)|$1\n        <div class="mobile-nav-toggle" onclick="toggleMobileNav()">\n            <span></span>\n            <span></span>\n            <span></span>\n        </div>\n$3|s;
        ' "$file" 2>/dev/null || true
    fi
done

# Phase 3: Add mobile navigation JavaScript if missing
echo "🔧 Phase 3: Ensuring mobile navigation JavaScript..."
js_added=0
for file in public/*.html public/**/*.html; do
    if [[ -f "$file" ]] && grep -q "mobile-nav-toggle" "$file" && ! grep -q "toggleMobileNav" "$file"; then
        # Add mobile nav JavaScript before closing body tag
        sed -i '' 's|</body>|<script>
function toggleMobileNav() {
    const overlay = document.getElementById("mobileNavOverlay");
    const navLinks = document.querySelector(".nav-links");
    
    if (overlay && navLinks) {
        overlay.classList.toggle("active");
        navLinks.classList.toggle("mobile-active");
        document.body.classList.toggle("nav-open");
    }
}

function closeMobileNav() {
    const overlay = document.getElementById("mobileNavOverlay");
    const navLinks = document.querySelector(".nav-links");
    
    if (overlay && navLinks) {
        overlay.classList.remove("active");
        navLinks.classList.remove("mobile-active");
        document.body.classList.remove("nav-open");
    }
}
</script>
</body>|' "$file"
        ((js_added++))
    fi
done

echo "Added mobile navigation JavaScript to $js_added files"

echo "✅ Mobile Toggle Cleanup Complete!"
echo "📊 Summary:"
echo "   • Removed excessive duplicate mobile toggles"
echo "   • Fixed mobile toggle positioning in navigation"
echo "   • Added mobile navigation JavaScript where missing"
echo "   • Preserved proper navigation structure"
echo ""
echo "🧺 Te Kete Ako navigation system optimized!"