#!/usr/bin/env node

/**
 * Te Kete Ako - Debug Statement Cleanup Script
 * Chief Auditor: Kaitiaki Aronui
 * Purpose: Remove all amateur debug code from production
 */

const fs = require('fs');
const path = require('path');

// Configuration - Fixed regex patterns
const DEBUG_PATTERNS = [
    /console\.log\([^)]*\);?\s*/g,
    /console\.error\([^)]*\);?\s*/g,
    /console\.warn\([^)]*\);?\s*/g,
    /console\.info\([^)]*\);?\s*/g,
    /alert\([^)]*\);?\s*/g,
    /debugger;?\s*/g
];

const BACKUP_DIR = './backups/debug-cleanup-' + new Date().toISOString().split('T')[0];

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Find all HTML and JS files
function findFiles(dir, extensions) {
    let files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            files = files.concat(findFiles(fullPath, extensions));
        } else if (extensions.some(ext => item.endsWith(ext))) {
            files.push(fullPath);
        }
    }
    
    return files;
}

const files = findFiles('public', ['.html', '.js']);

let totalFiles = 0;
let modifiedFiles = 0;
let totalRemovals = 0;

console.log('🔍 Kaitiaki Aronui - Chief Auditor');
console.log('🧹 Starting Debug Statement Cleanup...\n');

files.forEach(file => {
    totalFiles++;
    
    try {
        const content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        let removals = 0;
        
        // Apply all debug pattern removals
        DEBUG_PATTERNS.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                removals += matches.length;
                content = content.replace(pattern, '');
            }
        });
        
        // Only process if changes were made
        if (content !== originalContent) {
            // Create backup
            const backupPath = path.join(BACKUP_DIR, file.replace('public/', ''));
            const backupDir = path.dirname(backupPath);
            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir, { recursive: true });
            }
            fs.writeFileSync(backupPath, originalContent);
            
            // Write cleaned content
            fs.writeFileSync(file, content);
            
            modifiedFiles++;
            totalRemovals += removals;
            
            console.log(`✅ ${file}: Removed ${removals} debug statements`);
        }
        
    } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
    }
});

console.log('\n📊 CLEANUP SUMMARY:');
console.log(`📁 Total files processed: ${totalFiles}`);
console.log(`🔧 Files modified: ${modifiedFiles}`);
console.log(`🗑️  Total debug statements removed: ${totalRemovals}`);
console.log(`💾 Backups saved to: ${BACKUP_DIR}`);

if (totalRemovals > 0) {
    console.log('\n🎯 PROFESSIONALIZATION PROGRESS:');
    console.log('✅ Removed amateur debug code from production');
    console.log('✅ Created backups for safety');
    console.log('✅ Improved code quality and security');
    console.log('\n🚀 Next: Authentication hardening and navigation fixes');
} else {
    console.log('\n✨ No debug statements found - codebase already clean!');
}
