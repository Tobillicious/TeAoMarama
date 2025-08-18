#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Standard header HTML - extracted from the beautiful design
const STANDARD_HEADER = `    <header class="site-header no-print">
        <div class="nav-container">
            <a href="index.html" class="nav-brand">Te Kete Ako</a>
            <nav class="main-nav">
                <ul>
                    <li>
                        <a href="unit-plans.html">
                            <span class="nav-icon">📚</span>
                            <span class="nav-text-en">Unit Plans</span>
                            <span class="nav-text-mi" lang="mi">Ngā Waehere</span>
                        </a>
                    </li>
                    <li>
                        <a href="teachers/index.html">
                            <span class="nav-icon">🧑‍🏫</span>
                            <span class="nav-text-en">Teachers</span>
                            <span class="nav-text-mi" lang="mi">Ngā Kaiako</span>
                        </a>
                    </li>
                    <li>
                        <a href="lessons.html">
                            <span class="nav-icon">🎓</span>
                            <span class="nav-text-en">Lessons</span>
                            <span class="nav-text-mi" lang="mi">Ngā Akoranga</span>
                        </a>
                    </li>
                    <li>
                        <a href="handouts.html">
                            <span class="nav-icon">📄</span>
                            <span class="nav-text-en">Handouts</span>
                            <span class="nav-text-mi" lang="mi">Ngā Rauemi</span>
                        </a>
                    </li>
                    <li>
                        <a href="games.html">
                            <span class="nav-icon">🎮</span>
                            <span class="nav-text-en">Games</span>
                            <span class="nav-text-mi" lang="mi">Ngā Kēmu</span>  
                        </a>
                    </li>
                    <li class="auth-nav my-kete-link" style="display: none;">
                        <a href="my-kete.html">
                            <span class="nav-icon">🧺</span>
                            My Kete
                        </a>
                    </li>
                    <li class="auth-nav">
                        <a href="login.html" class="login-btn">
                            <span class="nav-icon">👤</span>
                            Login
                        </a>
                    </li>
                    <li class="auth-nav" style="display: none;">
                        <a href="register-simple.html" class="register-btn">
                            <span class="nav-icon">📝</span>
                            Register
                        </a>
                    </li>
                </ul>
            </nav>
            <nav class="breadcrumbs no-print" aria-label="Breadcrumb">
                <ol id="breadcrumbs" class="breadcrumbs-list"></ol>
            </nav>
        </div>
    </header>`;

// Standard footer HTML - clean and consistent
const STANDARD_FOOTER = `    <footer class="site-footer no-print">
        <div class="footer-content">
            <div class="footer-simple">
                <div class="footer-brand">
                    <h3>🧺 Te Kete Ako</h3>
                    <p>"Whaowhia te kete mātauranga" - Fill the basket of knowledge</p>
                </div>
                <div class="footer-links">
                    <a href="unit-plans.html">Unit Plans</a>
                    <a href="lessons.html">Lessons</a>
                    <a href="handouts.html">Handouts</a>
                    <a href="my-kete.html">My Kete</a>
                    <a href="sitemap.html">Sitemap</a>
                    <a href="orphans.html">Discover</a>
                </div>
            </div>
            <div class="footer-bottom">
                <span>© 2025 Te Kete Ako - Educational resources for Aotearoa New Zealand</span>
            </div>
        </div>
    </footer>`;

// Function to adjust relative paths based on directory depth
function adjustPaths(html, depth) {
    const prefix = '../'.repeat(depth);
    return html
        .replace(/href="(?!http|#)/g, `href="${prefix}`)
        .replace(/src="(?!http)/g, `src="${prefix}`);
}

// Function to process a single HTML file
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Calculate directory depth for relative path adjustment
        const relativePath = path.relative(process.cwd(), filePath);
        const depth = relativePath.split(path.sep).length - 1;
        
        // Replace header - look for various header patterns
        let newContent = content.replace(
            /<header[\s\S]*?<\/header>/gi,
            adjustPaths(STANDARD_HEADER, depth)
        );
        
        // Replace footer - look for various footer patterns  
        newContent = newContent.replace(
            /<footer[\s\S]*?<\/footer>/gi,
            adjustPaths(STANDARD_FOOTER, depth)
        );
        
        // Remove any keyboard shortcuts or extra footer content
        newContent = newContent.replace(
            /<div[^>]*keyboard[^>]*>[\s\S]*?<\/div>/gi,
            ''
        );
        
        // Only write if content actually changed
        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ Updated: ${relativePath}`);
            return true;
        } else {
            console.log(`⏭️  Skipped: ${relativePath} (no changes needed)`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

// Function to recursively find all HTML files
function findHtmlFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
            findHtmlFiles(fullPath, files);
        } else if (item.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Main execution
function main() {
    console.log('🔧 Te Kete Ako Header/Footer Consistency Fix');
    console.log('==================================================');
    
    const startTime = Date.now();
    const htmlFiles = findHtmlFiles(process.cwd());
    
    console.log(`📁 Found ${htmlFiles.length} HTML files to process`);
    console.log('');
    
    let updatedCount = 0;
    
    for (const file of htmlFiles) {
        if (processFile(file)) {
            updatedCount++;
        }
    }
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log('');
    console.log('==================================================');
    console.log(`🎉 Processing complete!`);
    console.log(`📊 Files processed: ${htmlFiles.length}`);
    console.log(`✨ Files updated: ${updatedCount}`);
    console.log(`⏱️  Duration: ${duration.toFixed(2)}s`);
    console.log('');
    console.log('🧺 All pages now have consistent Te Kete Ako branding!');
}

if (require.main === module) {
    main();
}

module.exports = { processFile, findHtmlFiles, adjustPaths };
