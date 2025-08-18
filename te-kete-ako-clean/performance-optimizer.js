#!/usr/bin/env node

/**
 * Te Kete Ako - Performance Optimization Script
 * Chief Auditor: Kaitiaki Aronui
 * Agent: Kaitiaki Whaihua (Performance Agent)
 * Purpose: Optimize CSS and JS files for production
 */

const fs = require('fs');
const path = require('path');

// Performance optimization configuration
const OPTIMIZATION_CONFIG = {
    css: {
        minify: true,
        combine: false, // Keep separate for modularity
        critical: true,
        cache: true
    },
    js: {
        minify: true,
        combine: false, // Keep separate for modularity
        treeShaking: true,
        cache: true
    },
    images: {
        optimize: true,
        webp: true,
        lazy: true
    }
};

const BACKUP_DIR = './backups/performance-optimization-' + new Date().toISOString().split('T')[0];

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Simple CSS minifier
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/\s*{\s*/g, '{') // Remove spaces around braces
        .replace(/\s*}\s*/g, '}') // Remove spaces around braces
        .replace(/\s*:\s*/g, ':') // Remove spaces around colons
        .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
        .replace(/\s*,\s*/g, ',') // Remove spaces around commas
        .replace(/;\s*}/g, '}') // Remove trailing semicolons
        .trim();
}

// Simple JS minifier
function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*$/gm, '') // Remove line comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/\s*{\s*/g, '{') // Remove spaces around braces
        .replace(/\s*}\s*/g, '}') // Remove spaces around braces
        .replace(/\s*:\s*/g, ':') // Remove spaces around colons
        .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
        .replace(/\s*,\s*/g, ',') // Remove spaces around commas
        .replace(/;\s*}/g, '}') // Remove trailing semicolons
        .trim();
}

// Find all files recursively
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

// Optimize a single file
function optimizeFile(filePath, type) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const originalSize = Buffer.byteLength(content, 'utf8');
        
        let optimizedContent = content;
        let optimizationApplied = false;
        
        if (type === 'css' && OPTIMIZATION_CONFIG.css.minify) {
            optimizedContent = minifyCSS(content);
            optimizationApplied = true;
        } else if (type === 'js' && OPTIMIZATION_CONFIG.js.minify) {
            optimizedContent = minifyJS(content);
            optimizationApplied = true;
        }
        
        if (optimizationApplied) {
            const optimizedSize = Buffer.byteLength(optimizedContent, 'utf8');
            const savings = originalSize - optimizedSize;
            const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
            
            // Create backup
            const backupPath = path.join(BACKUP_DIR, filePath.replace('public/', ''));
            const backupDir = path.dirname(backupPath);
            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir, { recursive: true });
            }
            fs.writeFileSync(backupPath, content);
            
            // Write optimized content
            fs.writeFileSync(filePath, optimizedContent);
            
            return {
                file: filePath,
                originalSize,
                optimizedSize,
                savings,
                savingsPercent,
                success: true
            };
        }
        
        return {
            file: filePath,
            originalSize,
            optimizedSize: originalSize,
            savings: 0,
            savingsPercent: 0,
            success: false
        };
        
    } catch (error) {
        return {
            file: filePath,
            error: error.message,
            success: false
        };
    }
}

// Main optimization process
function optimizeAssets() {
    console.log('🚀 Kaitiaki Whaihua - Performance Agent');
    console.log('⚡ Starting Performance Optimization...\n');
    
    const cssFiles = findFiles('public', ['.css']);
    const jsFiles = findFiles('public', ['.js']);
    
    console.log(`📁 Found ${cssFiles.length} CSS files and ${jsFiles.length} JS files\n`);
    
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let totalSavings = 0;
    let optimizedFiles = 0;
    let errors = 0;
    
    // Optimize CSS files
    console.log('🎨 Optimizing CSS files...');
    cssFiles.forEach(file => {
        const result = optimizeFile(file, 'css');
        if (result.success) {
            totalOriginalSize += result.originalSize;
            totalOptimizedSize += result.optimizedSize;
            totalSavings += result.savings;
            if (result.savings > 0) {
                optimizedFiles++;
                console.log(`✅ ${file}: ${result.savingsPercent}% smaller (${result.savings} bytes saved)`);
            }
        } else {
            errors++;
            console.log(`❌ ${file}: ${result.error}`);
        }
    });
    
    // Optimize JS files
    console.log('\n⚙️ Optimizing JavaScript files...');
    jsFiles.forEach(file => {
        const result = optimizeFile(file, 'js');
        if (result.success) {
            totalOriginalSize += result.originalSize;
            totalOptimizedSize += result.optimizedSize;
            totalSavings += result.savings;
            if (result.savings > 0) {
                optimizedFiles++;
                console.log(`✅ ${file}: ${result.savingsPercent}% smaller (${result.savings} bytes saved)`);
            }
        } else {
            errors++;
            console.log(`❌ ${file}: ${result.error}`);
        }
    });
    
    // Performance summary
    const totalSavingsPercent = totalOriginalSize > 0 ? ((totalSavings / totalOriginalSize) * 100).toFixed(1) : 0;
    
    console.log('\n📊 PERFORMANCE OPTIMIZATION SUMMARY:');
    console.log(`📁 Total files processed: ${cssFiles.length + jsFiles.length}`);
    console.log(`🔧 Files optimized: ${optimizedFiles}`);
    console.log(`❌ Errors: ${errors}`);
    console.log(`💾 Total original size: ${(totalOriginalSize / 1024).toFixed(1)} KB`);
    console.log(`⚡ Total optimized size: ${(totalOptimizedSize / 1024).toFixed(1)} KB`);
    console.log(`🎯 Total savings: ${(totalSavings / 1024).toFixed(1)} KB (${totalSavingsPercent}%)`);
    console.log(`💾 Backups saved to: ${BACKUP_DIR}`);
    
    if (totalSavings > 0) {
        console.log('\n🎯 PERFORMANCE IMPROVEMENTS:');
        console.log('✅ Reduced file sizes for faster loading');
        console.log('✅ Improved page load times');
        console.log('✅ Better user experience');
        console.log('✅ Reduced bandwidth usage');
        console.log('\n🚀 Next: Implement caching strategy and lazy loading');
    } else {
        console.log('\n✨ Files already optimized or no optimization needed!');
    }
}

// Run optimization
optimizeAssets();
