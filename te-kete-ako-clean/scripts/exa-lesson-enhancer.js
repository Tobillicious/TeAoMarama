/**
 * ================================================================
 * EXA.AI LESSON ENHANCER - TE KETE AKO
 * ================================================================
 * 
 * Automatically enhances lesson plans with high-quality external resources
 * Using EXA.ai for AI-powered educational content discovery
 * 
 * Target Sources:
 * - NZhistory.govt.nz (New Zealand historical content)
 * - RNZ.co.nz (Radio New Zealand educational content)
 * - TheGuardian.com/education (High-quality journalism)
 * - CrashCourse videos (YouTube educational content)
 * - Wikipedia articles (Encyclopedic content)
 * 
 * ================================================================
 */

import Exa from 'exa-js';

// Initialize EXA client (API key from environment)
const exa = new Exa(process.env.EXA_API_KEY);

/**
 * Enhanced search queries for different educational contexts
 */
const SEARCH_STRATEGIES = {
    'nz-history': {
        sites: ['nzhistory.govt.nz', 'teara.govt.nz'],
        keywords: ['New Zealand', 'Aotearoa', 'historical', 'treaty', 'colonial', 'indigenous']
    },
    'current-affairs': {
        sites: ['rnz.co.nz', 'stuff.co.nz/national/education'],
        keywords: ['education', 'schools', 'students', 'learning', 'policy']
    },
    'global-perspective': {
        sites: ['theguardian.com/education', 'bbc.com/news/education'],
        keywords: ['global', 'international', 'research', 'study', 'academic']
    },
    'video-content': {
        sites: ['youtube.com/c/crashcourse', 'ted.com'],
        keywords: ['educational', 'explained', 'tutorial', 'lesson']
    },
    'reference': {
        sites: ['wikipedia.org', 'britannica.com'],
        keywords: ['encyclopedia', 'definition', 'overview', 'comprehensive']
    }
};

/**
 * Extract lesson topic and context from HTML content
 */
function extractLessonContext(htmlContent) {
    // Parse HTML to extract key information
    const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const descriptionMatch = htmlContent.match(/<meta name="description" content="(.*?)"/i);
    const headingsMatch = htmlContent.match(/<h[2-6][^>]*>(.*?)<\/h[2-6]>/gi);
    
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : '';
    const description = descriptionMatch ? descriptionMatch[1] : '';
    const headings = headingsMatch ? headingsMatch.map(h => h.replace(/<[^>]*>/g, '')) : [];
    
    // Extract year level
    const yearLevelMatch = htmlContent.match(/year\s*(\d+)|y(\d+)/i);
    const yearLevel = yearLevelMatch ? (yearLevelMatch[1] || yearLevelMatch[2]) : null;
    
    // Extract subject area
    const subjectMatch = htmlContent.match(/subject[^>]*>([^<]+)/i) || 
                        htmlContent.match(/(english|mathematics|science|social|technology|arts)/i);
    const subject = subjectMatch ? subjectMatch[1].toLowerCase() : null;
    
    return {
        title,
        description,
        headings,
        yearLevel,
        subject,
        keywords: [...title.split(' '), ...description.split(' '), ...headings.join(' ').split(' ')]
            .filter(word => word.length > 3)
            .map(word => word.replace(/[^\w]/g, '').toLowerCase())
            .filter(word => word.length > 0)
    };
}

/**
 * Generate targeted search queries based on lesson content
 */
function generateSearchQueries(lessonContext) {
    const { title, subject, yearLevel, keywords } = lessonContext;
    const uniqueKeywords = [...new Set(keywords)].slice(0, 10);
    
    const queries = [];
    
    // Primary topic search
    queries.push({
        query: `${title} education resources`,
        type: 'primary',
        expectedResults: 3
    });
    
    // Subject-specific search
    if (subject) {
        queries.push({
            query: `${subject} ${uniqueKeywords.slice(0, 3).join(' ')} year ${yearLevel || '7-10'}`,
            type: 'subject',
            expectedResults: 2
        });
    }
    
    // NZ context search
    if (uniqueKeywords.some(k => ['new', 'zealand', 'aotearoa', 'maori', 'treaty'].includes(k))) {
        queries.push({
            query: `${uniqueKeywords.slice(0, 3).join(' ')} New Zealand education`,
            type: 'nz-context',
            expectedResults: 2
        });
    }
    
    return queries;
}

/**
 * Search for educational resources using EXA.ai
 */
async function searchEducationalResources(query, searchType = 'primary') {
    try {
        const strategy = SEARCH_STRATEGIES[searchType] || {
            sites: [],
            keywords: []
        };
        
        // Construct enhanced query
        let enhancedQuery = query;
        if (strategy.sites.length > 0) {
            enhancedQuery += ` site:${strategy.sites.join(' OR site:')}`;
        }
        
        const searchResults = await exa.search({
            query: enhancedQuery,
            numResults: 8,
            useAutoprompt: true,
            category: 'educational',
            includeDomains: strategy.sites.length > 0 ? strategy.sites : undefined,
            startPublishedDate: '2020-01-01' // Prefer recent content
        });
        
        return searchResults.results.map(result => ({
            title: result.title,
            url: result.url,
            summary: result.text ? result.text.substring(0, 200) + '...' : '',
            domain: new URL(result.url).hostname,
            score: result.score,
            publishedDate: result.publishedDate,
            type: categorizeResource(result.url, result.title)
        }));
        
    } catch (error) {
        console.error(`EXA search failed for query "${query}":`, error);
        return [];
    }
}

/**
 * Categorize resources by type and quality
 */
function categorizeResource(url, title) {
    const domain = new URL(url).hostname.toLowerCase();
    
    if (domain.includes('nzhistory.gov') || domain.includes('teara.gov')) {
        return { category: 'official-nz', priority: 'high', icon: '🏛️' };
    }
    if (domain.includes('rnz.co')) {
        return { category: 'news-nz', priority: 'high', icon: '📻' };
    }
    if (domain.includes('theguardian.com') || domain.includes('bbc.com')) {
        return { category: 'international-news', priority: 'medium', icon: '📰' };
    }
    if (domain.includes('youtube.com') && title.toLowerCase().includes('crash course')) {
        return { category: 'educational-video', priority: 'high', icon: '🎥' };
    }
    if (domain.includes('ted.com')) {
        return { category: 'expert-talk', priority: 'medium', icon: '🎤' };
    }
    if (domain.includes('wikipedia.org')) {
        return { category: 'reference', priority: 'medium', icon: '📚' };
    }
    
    return { category: 'general', priority: 'low', icon: '🔗' };
}

/**
 * Enhance a single lesson file with external resources
 */
async function enhanceLesson(lessonFilePath, outputPath = null) {
    try {
        console.log(`🔍 Enhancing lesson: ${lessonFilePath}`);
        
        // Read lesson file
        const fs = await import('fs/promises');
        const htmlContent = await fs.readFile(lessonFilePath, 'utf-8');
        
        // Extract context
        const lessonContext = extractLessonContext(htmlContent);
        console.log(`📝 Lesson context:`, lessonContext.title);
        
        // Generate search queries
        const queries = generateSearchQueries(lessonContext);
        console.log(`🔍 Generated ${queries.length} search queries`);
        
        // Search for resources
        const allResources = [];
        for (const query of queries) {
            console.log(`   Searching: ${query.query}`);
            const resources = await searchEducationalResources(query.query, query.type);
            allResources.push(...resources);
            
            // Rate limiting - be nice to EXA.ai
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Deduplicate and rank resources
        const uniqueResources = deduplicateResources(allResources);
        const rankedResources = rankResources(uniqueResources, lessonContext);
        const topResources = rankedResources.slice(0, 6);
        
        console.log(`📚 Found ${topResources.length} high-quality resources`);
        
        // Generate HTML for resources section
        const resourcesHTML = generateResourcesHTML(topResources);
        
        // Insert into lesson HTML
        const enhancedHTML = insertResourcesIntoLesson(htmlContent, resourcesHTML);
        
        // Save enhanced lesson
        const finalOutputPath = outputPath || lessonFilePath;
        await fs.writeFile(finalOutputPath, enhancedHTML, 'utf-8');
        
        console.log(`✅ Enhanced lesson saved to: ${finalOutputPath}`);
        
        return {
            success: true,
            resourcesAdded: topResources.length,
            resources: topResources
        };
        
    } catch (error) {
        console.error(`❌ Failed to enhance lesson ${lessonFilePath}:`, error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Remove duplicate resources
 */
function deduplicateResources(resources) {
    const seen = new Set();
    return resources.filter(resource => {
        const key = resource.url;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

/**
 * Rank resources by relevance and quality
 */
function rankResources(resources, lessonContext) {
    return resources
        .map(resource => ({
            ...resource,
            relevanceScore: calculateRelevanceScore(resource, lessonContext)
        }))
        .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Calculate relevance score for a resource
 */
function calculateRelevanceScore(resource, lessonContext) {
    let score = resource.score || 0;
    
    // Boost official NZ sources
    if (resource.type.priority === 'high') {
        score += 0.3;
    }
    
    // Boost if title contains lesson keywords
    const titleWords = resource.title.toLowerCase().split(' ');
    const matchingKeywords = lessonContext.keywords.filter(keyword => 
        titleWords.some(word => word.includes(keyword.toLowerCase()))
    );
    score += matchingKeywords.length * 0.1;
    
    // Boost newer content
    if (resource.publishedDate) {
        const publishYear = new Date(resource.publishedDate).getFullYear();
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - publishYear;
        score += Math.max(0, (5 - yearDiff) * 0.05); // Boost content from last 5 years
    }
    
    return score;
}

/**
 * Generate HTML for resources section
 */
function generateResourcesHTML(resources) {
    if (resources.length === 0) return '';
    
    const resourceItems = resources.map(resource => `
        <div class="external-resource">
            <div class="resource-header">
                <span class="resource-icon">${resource.type.icon}</span>
                <h4 class="resource-title">
                    <a href="${resource.url}" target="_blank" rel="noopener noreferrer">
                        ${resource.title}
                    </a>
                </h4>
            </div>
            <p class="resource-summary">${resource.summary}</p>
            <div class="resource-meta">
                <span class="resource-domain">${resource.domain}</span>
                <span class="resource-category">${resource.type.category.replace('-', ' ')}</span>
            </div>
        </div>
    `).join('');
    
    return `
        <section class="external-resources" id="external-resources">
            <div class="cultural-opening" style="background: var(--color-cultural-light); border-left: 4px solid var(--color-secondary); padding: 1rem; margin: 2rem 0; border-radius: 8px;">
                <h3 style="color: var(--color-primary); margin-bottom: 0.5rem;">🌐 External Learning Resources</h3>
                <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin: 0;">
                    Discover additional perspectives and detailed information from trusted educational sources across Aotearoa and beyond.
                </p>
            </div>
            
            <div class="resources-grid">
                ${resourceItems}
            </div>
            
            <style>
            .external-resources {
                margin: 2rem 0;
                padding: 1.5rem;
                background: #f8f9fa;
                border-radius: 12px;
                border: 1px solid #e9ecef;
            }
            
            .resources-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .external-resource {
                background: white;
                padding: 1.25rem;
                border-radius: 8px;
                border: 1px solid #dee2e6;
                transition: box-shadow 0.2s ease, transform 0.1s ease;
            }
            
            .external-resource:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transform: translateY(-1px);
            }
            
            .resource-header {
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                margin-bottom: 0.75rem;
            }
            
            .resource-icon {
                font-size: 1.25rem;
                flex-shrink: 0;
                margin-top: 0.25rem;
            }
            
            .resource-title {
                margin: 0;
                font-size: 1rem;
                line-height: 1.3;
            }
            
            .resource-title a {
                color: var(--color-primary, #2c5aa0);
                text-decoration: none;
                font-weight: 600;
            }
            
            .resource-title a:hover {
                text-decoration: underline;
                color: var(--color-secondary, #8b4513);
            }
            
            .resource-summary {
                font-size: 0.9rem;
                color: #6c757d;
                line-height: 1.4;
                margin: 0 0 0.75rem 0;
            }
            
            .resource-meta {
                display: flex;
                gap: 1rem;
                font-size: 0.8rem;
                color: #868e96;
            }
            
            .resource-domain {
                font-weight: 500;
            }
            
            .resource-category {
                text-transform: capitalize;
            }
            </style>
        </section>
    `;
}

/**
 * Insert resources section into lesson HTML
 */
function insertResourcesIntoLesson(htmlContent, resourcesHTML) {
    // Remove existing external resources section
    const cleanedHTML = htmlContent.replace(
        /<section class="external-resources".*?<\/section>/gs, 
        ''
    );
    
    // Find insertion point (before footer or at end of main content)
    const footerMatch = cleanedHTML.match(/<footer/i);
    const mainEndMatch = cleanedHTML.match(/<\/main>/i);
    
    let insertionPoint;
    if (footerMatch) {
        insertionPoint = footerMatch.index;
    } else if (mainEndMatch) {
        insertionPoint = mainEndMatch.index;
    } else {
        // Insert before closing body tag
        const bodyEndMatch = cleanedHTML.match(/<\/body>/i);
        insertionPoint = bodyEndMatch ? bodyEndMatch.index : cleanedHTML.length;
    }
    
    return cleanedHTML.slice(0, insertionPoint) + 
           resourcesHTML + 
           cleanedHTML.slice(insertionPoint);
}

/**
 * Bulk enhance all lessons in a directory
 */
async function enhanceAllLessons(lessonsDirectory, options = {}) {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    console.log(`🚀 Starting bulk lesson enhancement in: ${lessonsDirectory}`);
    
    const results = {
        total: 0,
        enhanced: 0,
        failed: 0,
        errors: []
    };
    
    try {
        // Find all HTML files recursively
        const htmlFiles = await findHTMLFiles(lessonsDirectory);
        results.total = htmlFiles.length;
        
        console.log(`📁 Found ${htmlFiles.length} lesson files`);
        
        // Process each file
        for (const filePath of htmlFiles) {
            try {
                const result = await enhanceLesson(filePath);
                if (result.success) {
                    results.enhanced++;
                    console.log(`✅ Enhanced: ${path.basename(filePath)} (+${result.resourcesAdded} resources)`);
                } else {
                    results.failed++;
                    results.errors.push({ file: filePath, error: result.error });
                    console.log(`❌ Failed: ${path.basename(filePath)} - ${result.error}`);
                }
                
                // Rate limiting between files
                await new Promise(resolve => setTimeout(resolve, 2000));
                
            } catch (error) {
                results.failed++;
                results.errors.push({ file: filePath, error: error.message });
                console.error(`❌ Error processing ${filePath}:`, error);
            }
        }
        
        console.log(`🎉 Bulk enhancement complete!`);
        console.log(`   Enhanced: ${results.enhanced}/${results.total} files`);
        console.log(`   Failed: ${results.failed} files`);
        
        return results;
        
    } catch (error) {
        console.error('❌ Bulk enhancement failed:', error);
        throw error;
    }
}

/**
 * Find all HTML files in a directory recursively
 */
async function findHTMLFiles(directory) {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const files = [];
    
    async function scan(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            
            if (entry.isDirectory()) {
                await scan(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.html')) {
                files.push(fullPath);
            }
        }
    }
    
    await scan(directory);
    return files;
}

// Export functions for use
export {
    enhanceLesson,
    enhanceAllLessons,
    searchEducationalResources,
    extractLessonContext
};

// CLI interface if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const command = process.argv[2];
    const target = process.argv[3];
    
    if (command === 'enhance' && target) {
        enhanceLesson(target)
            .then(result => {
                console.log('Enhancement result:', result);
                process.exit(result.success ? 0 : 1);
            })
            .catch(error => {
                console.error('Enhancement failed:', error);
                process.exit(1);
            });
    } else if (command === 'bulk' && target) {
        enhanceAllLessons(target)
            .then(results => {
                console.log('Bulk enhancement results:', results);
                process.exit(results.failed === 0 ? 0 : 1);
            })
            .catch(error => {
                console.error('Bulk enhancement failed:', error);
                process.exit(1);
            });
    } else {
        console.log('Usage: node exa-lesson-enhancer.js <enhance|bulk> <path>');
        console.log('  enhance <file>     - Enhance single lesson file');
        console.log('  bulk <directory>   - Enhance all lessons in directory');
        process.exit(1);
    }
}

console.log('🎯 EXA.ai Lesson Enhancer loaded and ready!');