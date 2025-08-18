// Execute the resource integration SQL using Node.js Supabase client
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Supabase configuration - SECURE: Using environment variables
require('dotenv').config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing required environment variables. Please check your .env file.');
    console.error('Required: SUPABASE_URL, SUPABASE_ANON_KEY');
    process.exit(1);
}

// Create client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function executeResourceIntegration() {
    console.log('🚀 Starting Resource Integration...');
    
    try {
        // First, test database connectivity and check existing resources
        console.log('🔍 Testing database connection...');
        const { data: existingResources, error: fetchError } = await supabase
            .from('resources')
            .select('title, path')
            .limit(5);
            
        if (fetchError) {
            console.error('❌ Database connection failed:', fetchError);
            return;
        }
        
        console.log(`✅ Database connected! Found ${existingResources?.length || 0} existing resources`);
        if (existingResources?.length > 0) {
            console.log('📋 Sample existing resources:', existingResources.map(r => r.title));
        }
        // Read the corrected SQL file
        const sqlContent = fs.readFileSync('./CORRECTED_SUPABASE_RESOURCE_INTEGRATION.sql', 'utf8');
        
        // Extract just the INSERT statements (remove CREATE INDEX and VIEW statements for now)
        const insertStatements = sqlContent
            .split(';')
            .filter(statement => statement.trim().startsWith('INSERT INTO resources'))
            .map(statement => statement.trim() + ';');
        
        console.log(`📝 Found ${insertStatements.length} INSERT statements to execute...`);
        
        // Execute each INSERT statement
        for (let i = 0; i < insertStatements.length; i++) {
            const statement = insertStatements[i];
            console.log(`📄 Executing statement ${i + 1}/${insertStatements.length}...`);
            
            // For Supabase client, we need to use individual inserts rather than raw SQL
            // Let's extract the values and use the client's insert method instead
            console.log('⚠️  Note: Raw SQL execution requires service role key. Using manual insert approach...');
            break;
        }
        
        // Alternative approach: Comprehensive resource discovery and insertion
        console.log('🔄 Starting comprehensive resource discovery and integration...');
        
        // Helper function to scan directories for HTML files
        const { glob } = require('glob');
        const path = require('path');
        
        // Scan for all HTML educational resources
        const htmlFiles = glob.sync('**/*.html', {
            ignore: ['node_modules/**', 'public/**', '.git/**'],
            cwd: process.cwd()
        });
        
        console.log(`📊 Discovered ${htmlFiles.length} HTML files for analysis...`);
        
        const resources = [];
        const seenPaths = new Set();
        
        for (const filePath of htmlFiles) {
            // Skip duplicates and non-educational files
            if (seenPaths.has(filePath) || 
                filePath.includes('index.html') && !filePath.includes('lessons/') ||
                filePath.includes('public/') ||
                filePath.includes('node_modules/')) {
                continue;
            }
            
            seenPaths.add(filePath);
            
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const title = extractTitle(fileContent, filePath);
                const description = extractDescription(fileContent, filePath);
                
                if (!title || title.length < 3) continue; // Skip files without proper titles
                
                const resource = {
                    title: title,
                    description: description,
                    path: filePath,
                    type: determineResourceType(filePath, fileContent),
                    subject: determineSubject(filePath, fileContent),
                    level: determineLevel(filePath, fileContent),
                    featured: isSpecialResource(filePath),
                    tags: extractTags(filePath, fileContent),
                    curriculum_alignment: extractCurriculumAlignment(filePath, fileContent),
                    cultural_elements: extractCulturalElements(filePath, fileContent),
                    difficulty_level: assessDifficulty(filePath, fileContent),
                    estimated_duration_minutes: estimateDuration(filePath, fileContent),
                    author: 'Te Kete Ako Team'
                };
                
                resources.push(resource);
                
            } catch (error) {
                console.warn(`⚠️ Could not process ${filePath}: ${error.message}`);
            }
        }
        
        // Helper functions for resource analysis
        function extractTitle(content, filePath) {
            // Try multiple title extraction methods
            let title = '';
            
            // Method 1: <title> tag
            const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i);
            if (titleMatch) {
                title = titleMatch[1].replace(/^\s*Te Kete Ako\s*[-|]\s*/, '').trim();
            }
            
            // Method 2: <h1> tag
            if (!title || title.length < 3) {
                const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
                if (h1Match) {
                    title = h1Match[1].replace(/<[^>]*>/g, '').trim();
                }
            }
            
            // Method 3: filename fallback
            if (!title || title.length < 3) {
                title = path.basename(filePath, '.html')
                    .replace(/-/g, ' ')
                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            }
            
            return title;
        }
        
        function extractDescription(content, filePath) {
            // Try meta description first
            const metaMatch = content.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"']*)["\'][^>]*>/i);
            if (metaMatch) return metaMatch[1];
            
            // Try first paragraph
            const pMatch = content.match(/<p[^>]*>(.*?)<\/p>/i);
            if (pMatch) {
                const desc = pMatch[1].replace(/<[^>]*>/g, '').trim();
                if (desc.length > 20) return desc.substring(0, 200) + '...';
            }
            
            // Fallback based on file path
            if (filePath.includes('handouts/')) return 'Educational handout with structured learning activities';
            if (filePath.includes('lessons/')) return 'Comprehensive lesson plan with learning objectives';
            if (filePath.includes('games/')) return 'Interactive educational game for engaging learning';
            if (filePath.includes('units/')) return 'Complete unit plan with multiple lessons and activities';
            
            return 'Te Kete Ako educational resource';
        }
        
        function determineResourceType(filePath, content) {
            if (filePath.includes('games/')) return 'game';
            if (filePath.includes('lessons/')) return 'lesson';
            if (filePath.includes('handouts/')) return 'handout';
            if (filePath.includes('units/')) return 'unit-plan';
            if (content.includes('interactive') || content.includes('click') || content.includes('button')) return 'interactive';
            return 'resource';
        }
        
        function determineSubject(filePath, content) {
            const pathAndContent = (filePath + ' ' + content.substring(0, 500)).toLowerCase();
            
            if (pathAndContent.includes('te-reo') || pathAndContent.includes('māori') || pathAndContent.includes('maori')) return 'Te Reo Māori';
            if (pathAndContent.includes('writing') || pathAndContent.includes('essay') || pathAndContent.includes('english')) return 'English';
            if (pathAndContent.includes('social') || pathAndContent.includes('systems') || pathAndContent.includes('society')) return 'Social Studies';
            if (pathAndContent.includes('science') || pathAndContent.includes('stem')) return 'Science';
            if (pathAndContent.includes('math') || pathAndContent.includes('probability')) return 'Mathematics';
            if (pathAndContent.includes('history') || pathAndContent.includes('treaty')) return 'New Zealand History';
            if (pathAndContent.includes('ai') || pathAndContent.includes('digital') || pathAndContent.includes('technology')) return 'Digital Technologies';
            
            return 'Cross-curricular';
        }
        
        function determineLevel(filePath, content) {
            if (filePath.includes('y8') || content.includes('Year 8')) return 'Year 8';
            if (filePath.includes('y7') || content.includes('Year 7')) return 'Year 7';
            if (filePath.includes('y9') || content.includes('Year 9')) return 'Year 9';
            if (filePath.includes('y10') || content.includes('Year 10')) return 'Year 10';
            return 'All Levels';
        }
        
        function isSpecialResource(filePath) {
            const specialResources = [
                'digital-purakau.html',
                'living-whakapapa.html', 
                'virtual-marae.html',
                'classroom-leaderboard.html',
                'ai-hub.html'
            ];
            return specialResources.some(special => filePath.includes(special));
        }
        
        function extractTags(filePath, content) {
            const tags = [];
            const pathAndContent = (filePath + ' ' + content.substring(0, 1000)).toLowerCase();
            
            // Cultural tags
            if (pathAndContent.includes('māori') || pathAndContent.includes('maori')) tags.push('māori-culture');
            if (pathAndContent.includes('te reo')) tags.push('te-reo-māori');
            if (pathAndContent.includes('whakapapa')) tags.push('whakapapa');
            if (pathAndContent.includes('cultural')) tags.push('cultural-learning');
            
            // Activity tags
            if (pathAndContent.includes('interactive')) tags.push('interactive');
            if (pathAndContent.includes('game')) tags.push('game');
            if (pathAndContent.includes('writing')) tags.push('writing');
            if (pathAndContent.includes('reading')) tags.push('reading');
            if (pathAndContent.includes('assessment')) tags.push('assessment');
            
            // Subject tags
            if (filePath.includes('handouts/')) tags.push('handout');
            if (filePath.includes('lessons/')) tags.push('lesson-plan');
            if (filePath.includes('units/')) tags.push('unit-plan');
            
            return tags.length > 0 ? tags : ['educational-resource'];
        }
        
        function extractCurriculumAlignment(filePath, content) {
            // Basic curriculum alignment based on content analysis
            const subject = determineSubject(filePath, content);
            return {
                achievement_objectives: [`${subject} curriculum objectives`],
                curriculum_areas: [subject],
                key_competencies: ['Using language, symbols, and texts', 'Thinking', 'Relating to others']
            };
        }
        
        function extractCulturalElements(filePath, content) {
            const pathAndContent = (filePath + ' ' + content.substring(0, 1000)).toLowerCase();
            
            const culturalConcepts = [];
            if (pathAndContent.includes('whakapapa')) culturalConcepts.push('whakapapa');
            if (pathAndContent.includes('manaakitanga')) culturalConcepts.push('manaakitanga');
            if (pathAndContent.includes('kaitiakitanga')) culturalConcepts.push('kaitiakitanga');
            if (pathAndContent.includes('tino rangatiratanga')) culturalConcepts.push('tino rangatiratanga');
            
            let culturalIntegration = 'low';
            let teReoUsage = 'low';
            
            if (pathAndContent.includes('māori') || pathAndContent.includes('maori') || pathAndContent.includes('te reo')) {
                culturalIntegration = 'high';
                teReoUsage = 'medium';
            }
            if (pathAndContent.includes('cultural') || culturalConcepts.length > 0) {
                culturalIntegration = 'medium';
            }
            
            return {
                maori_concepts: culturalConcepts,
                cultural_integration: culturalIntegration,
                te_reo_usage: teReoUsage
            };
        }
        
        function assessDifficulty(filePath, content) {
            if (filePath.includes('introduction') || filePath.includes('basic')) return 'beginner';
            if (filePath.includes('advanced') || filePath.includes('complex')) return 'advanced';
            return 'intermediate';
        }
        
        function estimateDuration(filePath, content) {
            if (filePath.includes('games/')) return 15;
            if (filePath.includes('handouts/')) return 30;
            if (filePath.includes('lessons/')) return 45;
            if (filePath.includes('units/')) return 180;
            return 30;
        }
        
        console.log(`📦 Inserting ${resources.length} critical resources...`);
        
        for (let i = 0; i < resources.length; i++) {
            const resource = resources[i];
            console.log(`🔄 Inserting: ${resource.title}...`);
            
            const { data, error } = await supabase
                .from('resources')
                .insert([resource]);
            
            if (error) {
                console.error(`❌ Error inserting ${resource.title}:`, error);
            } else {
                console.log(`✅ Successfully inserted: ${resource.title}`);
            }
        }
        
        console.log('🎉 Resource Integration Complete!');
        
    } catch (error) {
        console.error('💥 Execution error:', error);
    }
}

// Execute the integration
executeResourceIntegration();