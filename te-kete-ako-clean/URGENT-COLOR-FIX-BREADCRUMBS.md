# 🚨 CRITICAL: White-on-White Text Emergency Fix Guide

## IMMEDIATE ISSUE
- Homepage displays but ALL TEXT IS WHITE ON WHITE BACKGROUNDS
- Content exists but invisible due to color inheritance problems
- Site technically functional but completely unusable

## ROOT CAUSE INVESTIGATION PLAN

### 1. CSS CASCADE CONFLICT ANALYSIS
**Check these files in order:**
1. `/public/css/critical.css` (lines 1-25 - color variables)
2. `/public/css/design-system-v3.css` (lines 54-75 - text color definitions)
3. `/public/index.html` (lines 11-14 - CSS loading order)

**Suspected Issues:**
- critical.css may be overriding design-system-v3.css colors
- CSS loading order causing cascade problems
- Missing color declarations in layout components I added (lines 690-774 in design-system-v3.css)

### 2. SPECIFIC INVESTIGATIONS

#### A. Text Color Variables
```bash
# Check if text color variables are properly defined
grep -n "color-text" /Users/admin/Documents/te-kete-ako-clean/public/css/*.css
```

#### B. Layout Components Color Check
My layout fixes (lines 690-774 in design-system-v3.css) may lack color:
- `.main-container` - no color specified
- `.content-area` - no color specified  
- `.sidebar-widget` - has background but may need text color

#### C. CSS Loading Order
index.html loads:
1. design-system-v3.css
2. award-winning-polish.css
3. print.css

**CRITICAL:** No critical.css in index.html but it may be loaded elsewhere!

### 3. EMERGENCY FIXES TO TRY

#### QUICK FIX #1: Add explicit colors to layout components
```css
.main-container {
    color: var(--color-text-primary);
}

.content-area {
    color: var(--color-text-primary);
}

.left-sidebar {
    color: var(--color-text-primary);
}
```

#### QUICK FIX #2: Check for white color overrides
```bash
grep -r "color.*white\|color.*#fff\|color.*#ffffff" /Users/admin/Documents/te-kete-ako-clean/public/css/
```

#### QUICK FIX #3: Body color inheritance
Check if body color is being overridden:
```css
body {
    color: var(--color-text-primary) !important;
}
```

### 4. TESTING PROTOCOL
1. Fix one CSS file at a time
2. Check live site after each change: https://tekete.netlify.app
3. Test these pages specifically:
   - Homepage (/)
   - Handouts (/handouts.html)
   - Lessons (/lessons.html)

### 5. LIKELY CULPRITS RANKED BY PROBABILITY

**🥇 MOST LIKELY:** Layout components I added lack color declarations
**🥈 SECOND:** CSS loading order causing critical.css to override
**🥉 THIRD:** award-winning-polish.css has white color overrides
**🏅 FOURTH:** Print styles bleeding into screen display

### 6. NUCLEAR OPTION (Last Resort)
If all else fails, add to design-system-v3.css:
```css
/* EMERGENCY COLOR FIX */
* {
    color: var(--color-text-primary) !important;
}

h1, h2, h3, h4, h5, h6 {
    color: var(--color-primary) !important;
}
```

### 7. FILES TO EXAMINE IMMEDIATELY
1. `/public/css/design-system-v3.css` (lines 690-774 - my layout additions)
2. `/public/css/award-winning-polish.css` (potential white overrides)
3. `/public/css/critical.css` (check if loaded and conflicting)
4. `/public/index.html` (CSS loading order)

## 🎯 SMOKING GUN FOUND! 

**CRITICAL DISCOVERY:** main.css lines 3532-3534 contain:
```css
--color-text-primary: #ffffff;
--color-text-secondary: #ffff00;  
--color-border: #ffffff;
```

**Plus IMPORTANT overrides at lines 3542 & 3546:**
```css
color: #ffffff !important;
color: #ffff00 !important;
```

**THIS IS THE ROOT CAUSE!** main.css is overriding text colors to white.

**IMMEDIATE FIX:** Comment out or delete lines 3528-3550 in main.css

**EMERGENCY COMMAND:**
```bash
sed -i '' '3528,3550s/^/\/\* DISABLED /' /Users/admin/Documents/te-kete-ako-clean/public/css/main.css
```

## SUCCESS CRITERIA
✅ All text visible with proper contrast
✅ Headings showing in primary color
✅ Body text readable
✅ Navigation functional and visible

## TIME ESTIMATE: 15-30 minutes if following this guide

**Start with Quick Fix #1 - it's most likely to work!** 🎯