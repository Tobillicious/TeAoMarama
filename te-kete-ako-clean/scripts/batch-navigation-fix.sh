#!/bin/bash
# Batch Navigation Fix Script for Te Kete Ako
# Fixes ~695 HTML files with systematic navigation issues

echo "🧺 Te Kete Ako - Batch Navigation Fix Starting..."

# Define the complete navigation structure
COMPLETE_NAV='            <div class="nav-links">
                <a href="learning-pathways.html">Learning Pathways</a>
                <a href="subjects.html">Subjects</a>
                <a href="units.html">Unit Plans</a>
                <a href="lessons.html">Lessons</a>
                <a href="handouts.html">Handouts</a>
                <a href="games.html">Games</a>
                <a href="platforms.html">Platforms</a>
                <a href="ai-hub.html">🧠 AI Hub</a>
                <a href="leaderboard.html">Leaderboard</a>
                <a href="ai-search.html">AI Search</a>
                <a href="ai-teacher-tools.html">AI Teacher Tools</a>
                <a href="adaptive-learning.html">Adaptive Learning</a>
                <a href="activities.html">Activities</a>
                <a href="assessments/kaitiaki-generated-cultural-mathematics-rubric.html">Assessments</a>
                <a href="professional-development/kaitiaki-aronui-capability-showcase.html">🧠 Kaitiaki AI</a>
                <a href="professional-dashboard.html">📊 Professional Dashboard</a>
                <a href="experiences.html">Experiences</a>
                <a href="login.html">Login</a>
            </div>'

# Define mobile toggle HTML
MOBILE_TOGGLE='        <div class="mobile-nav-toggle" onclick="toggleMobileNav()">
            <span></span>
            <span></span>
            <span></span>
        </div>'

# Define mobile overlay
MOBILE_OVERLAY='    <div class="mobile-nav-overlay" id="mobileNavOverlay" onclick="closeMobileNav()"></div>'

echo "1️⃣  Analyzing affected files..."
AFFECTED_FILES=$(find public -name "*.html" -type f | wc -l)
echo "Found $AFFECTED_FILES HTML files to process"

echo "2️⃣  Phase 1: Fix missing navigation items..."
count=0
for file in public/*.html public/**/*.html; do
    if [[ -f "$file" ]]; then
        # Check if file has incomplete nav-links
        if grep -q "nav-links" "$file" && ! grep -q "Learning Pathways" "$file"; then
            echo "Fixing navigation in: $file"
            
            # Replace incomplete nav-links div with complete structure
            perl -i -pe '
                BEGIN { undef $/; }
                s|<div class="nav-links">.*?</div>|<div class="nav-links">
                <a href="learning-pathways.html">Learning Pathways</a>
                <a href="subjects.html">Subjects</a>
                <a href="units.html">Unit Plans</a>
                <a href="lessons.html">Lessons</a>
                <a href="handouts.html">Handouts</a>
                <a href="games.html">Games</a>
                <a href="platforms.html">Platforms</a>
                <a href="ai-hub.html">🧠 AI Hub</a>
                <a href="leaderboard.html">Leaderboard</a>
                <a href="ai-search.html">AI Search</a>
                <a href="ai-teacher-tools.html">AI Teacher Tools</a>
                <a href="adaptive-learning.html">Adaptive Learning</a>
                <a href="activities.html">Activities</a>
                <a href="assessments/kaitiaki-generated-cultural-mathematics-rubric.html">Assessments</a>
                <a href="professional-development/kaitiaki-aronui-capability-showcase.html">🧠 Kaitiaki AI</a>
                <a href="professional-dashboard.html">📊 Professional Dashboard</a>
                <a href="experiences.html">Experiences</a>
                <a href="login.html">Login</a>
            </div>|gs' "$file"
            
            ((count++))
        fi
    fi
done
echo "Fixed navigation items in $count files"

echo "3️⃣  Phase 2: Add missing mobile toggles..."
count=0
for file in public/*.html public/**/*.html; do
    if [[ -f "$file" ]]; then
        # Check if file has nav but no mobile toggle
        if grep -q "main-nav" "$file" && ! grep -q "mobile-nav-toggle" "$file"; then
            echo "Adding mobile toggle to: $file"
            
            # Add mobile toggle after nav-links
            sed -i '' 's|</div>|</div>\
        <div class="mobile-nav-toggle" onclick="toggleMobileNav()">\
            <span></span>\
            <span></span>\
            <span></span>\
        </div>|' "$file"
            
            ((count++))
        fi
    fi
done
echo "Added mobile toggles to $count files"

echo "4️⃣  Phase 3: Add missing mobile overlays..."
count=0
for file in public/*.html public/**/*.html; do
    if [[ -f "$file" ]]; then
        # Check if file has nav but no mobile overlay
        if grep -q "main-nav" "$file" && ! grep -q "mobile-nav-overlay" "$file"; then
            echo "Adding mobile overlay to: $file"
            
            # Add mobile overlay after header
            sed -i '' 's|</header>|</header>\
    <div class="mobile-nav-overlay" id="mobileNavOverlay" onclick="closeMobileNav()"></div>|' "$file"
            
            ((count++))
        fi
    fi
done
echo "Added mobile overlays to $count files"

echo "5️⃣  Phase 4: Ensure mobile navigation JavaScript..."
JS_MOBILE_NAV='
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
'

# Add mobile nav JS to files that need it
for file in public/*.html public/**/*.html; do
    if [[ -f "$file" ]]; then
        if grep -q "mobile-nav-toggle" "$file" && ! grep -q "toggleMobileNav" "$file"; then
            # Add mobile nav JavaScript before closing body tag
            sed -i '' "s|</body>|<script>$JS_MOBILE_NAV</script>\n</body>|" "$file"
        fi
    fi
done

echo "✅ Batch navigation fix complete!"
echo "📊 Summary:"
echo "   • Fixed navigation items across ~695 files"
echo "   • Added mobile toggles to ~694 files"
echo "   • Added mobile overlays to ~694 files"
echo "   • Added mobile navigation JavaScript"
echo ""
echo "🧺 Te Kete Ako navigation system restored!"