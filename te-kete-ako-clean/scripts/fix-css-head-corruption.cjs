const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing CSS head corruption across HTML files...\n');

// Find all HTML files that have the corruption pattern
function findCorruptedFiles() {
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

// Check if file has corrupted CSS head (title tag merged with link tag)
function hasCorruptedCSS(content) {
    return content.includes('</title><link rel="stylesheet"') && 
           content.includes('design-system-v3.css"/>') &&
           !content.includes('main.css');
}

// Fix the corrupted CSS head section
function fixCorruptedCSS(content) {
    // Pattern: </title><link rel="stylesheet" href="/css/design-system-v3.css"/>\n\n\n\n</head>
    const corruptedPattern = /<\/title><link rel="stylesheet" href="\/css\/design-system-v3\.css"\/>\s*\n\s*\n\s*\n\s*<\/head>/g;
    
    const fixedHTML = `</title>
    <link rel="stylesheet" href="/css/design-system-v3.css"/>
    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="/css/mobile-revolution.css"/>
    <link rel="stylesheet" href="/css/print.css" media="print"/>
</head>`;

    return content.replace(corruptedPattern, fixedHTML);
}

// Process all HTML files
const htmlFiles = findCorruptedFiles();
let corruptedCount = 0;
let fixedCount = 0;

console.log(`Found ${htmlFiles.length} HTML files to check...\n`);

for (const filePath of htmlFiles) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (hasCorruptedCSS(content)) {
            console.log(`❌ CORRUPTED: ${filePath}`);
            corruptedCount++;
            
            const fixedContent = fixCorruptedCSS(content);
            fs.writeFileSync(filePath, fixedContent, 'utf8');
            
            console.log(`✅ FIXED: ${filePath}`);
            fixedCount++;
        }
    } catch (error) {
        console.log(`⚠️  Error processing ${filePath}: ${error.message}`);
    }
}

console.log(`\n📊 Results:`);
console.log(`   Found ${corruptedCount} corrupted files`);
console.log(`   Fixed ${fixedCount} files`);
console.log(`   ✅ All CSS heads should now be properly formatted`);