const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up remaining CSS/JS issues...\n');

function findAllHtmlFiles() {
    const publicDir = './public';
    const htmlFiles = [];
    
    function walkDir(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory() && !file.startsWith('.')) {
                walkDir(fullPath);
            } else if (file.endsWith('.html')) {
                htmlFiles.push(fullPath);
            }
        }
    }
    
    walkDir(publicDir);
    return htmlFiles;
}

// Issues to fix:
// 1. Remove breadcrumbs.js references (causes 404)
// 2. Ensure main.css is included
// 3. Add missing core JS where needed

const htmlFiles = findAllHtmlFiles();
let issuesFixed = 0;

for (const filePath of htmlFiles) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;
        
        // Fix 1: Remove broken breadcrumbs.js
        if (content.includes('breadcrumbs.js')) {
            console.log(`🔧 Removing broken breadcrumbs.js from ${filePath}`);
            content = content.replace(/<script src="\/js\/breadcrumbs\.js" defer><\/script>/g, '');
            content = content.replace(/<script src="\/js\/breadcrumbs\.js"><\/script>/g, '');
            changed = true;
        }
        
        // Fix 2: Ensure main.css is included (if has design-system but not main)
        if (content.includes('design-system-v3.css') && !content.includes('main.css')) {
            console.log(`🔧 Adding missing main.css to ${filePath}`);
            content = content.replace(
                '<link rel="stylesheet" href="/css/design-system-v3.css"/>',
                `<link rel="stylesheet" href="/css/design-system-v3.css"/>
    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="/css/mobile-revolution.css"/>`
            );
            changed = true;
        }
        
        // Fix 3: Add missing core JS to key pages (if has closing body but no shared-components)
        const criticalPages = ['index.html', 'handouts.html', 'lessons.html', 'games.html', 'unit-plans.html', 'login.html', 'register.html'];
        const isCriticalPage = criticalPages.some(page => filePath.includes(page));
        
        if (isCriticalPage && content.includes('</body>') && !content.includes('shared-components.js')) {
            console.log(`🔧 Adding core JS to critical page ${filePath}`);
            content = content.replace(
                '</body>',
                `    <!-- Core functionality -->
    <script src="js/shared-components.js"></script>
    <script src="js/mobile-revolution.js"></script>
    <script src="js/pwa-registration.js"></script>
</body>`
            );
            changed = true;
        }
        
        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            issuesFixed++;
        }
        
    } catch (error) {
        console.log(`⚠️  Error processing ${filePath}: ${error.message}`);
    }
}

console.log(`\n✅ Cleanup complete! Fixed issues in ${issuesFixed} files`);
console.log('🧹 Remaining issues cleaned up:');
console.log('   • Removed broken breadcrumbs.js references');  
console.log('   • Ensured main.css is loaded everywhere');
console.log('   • Added core JS to critical pages');