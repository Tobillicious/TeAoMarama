#!/usr/bin/env node

/**
 * RESOURCE RECOVERY SCRIPT
 * Rebuilds the Te Kete Knowledge Graph with actual educational resources
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧺 Te Kete Ako Resource Recovery Starting...');

// Resource discovery patterns
const resourcePatterns = {
    handouts: {
        path: './public/handouts',
        pattern: '**/*.html',
        type: 'handout',
        exclude: ['index.html']
    },
    lessons: {
        path: './public/guided-inquiry-unit/lessons',
        pattern: '**/*.html', 
        type: 'lesson',
        exclude: []
    },
    y8_lessons: {
        path: './public/y8-systems/lessons',
        pattern: '**/*.html',
        type: 'lesson',
        exclude: []
    },
    games: {
        path: './public/games',
        pattern: '**/*.html',
        type: 'game',
        exclude: ['index.html']
    },
    units: {
        path: './public',
        pattern: '*-unit.html',
        type: 'unit',
        exclude: []
    }
};

function scanDirectory(dir, basePath = './public') {
    const results = [];
    
    try {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const file of files) {
            const fullPath = path.join(dir, file.name);
            const relativePath = path.relative(basePath, fullPath);
            
            if (file.isDirectory()) {
                // Recursively scan subdirectories
                results.push(...scanDirectory(fullPath, basePath));
            } else if (file.name.endsWith('.html') && file.name !== 'index.html') {
                // Extract resource information
                const resource = extractResourceInfo(fullPath, relativePath);
                if (resource) {
                    results.push(resource);
                }
            }
        }
    } catch (error) {
        console.warn(`⚠️  Could not scan directory: ${dir}`);
    }
    
    return results;
}

function extractResourceInfo(filePath, relativePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract title from HTML
        const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
        let title = titleMatch ? titleMatch[1].replace(' | Te Kete Ako', '').trim() : 
                   path.basename(filePath, '.html').replace(/-/g, ' ');
        
        // Extract meta description
        const descMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
        let description = descMatch ? descMatch[1] : '';
        
        // Determine resource type from path
        let type = 'handout'; // default
        if (relativePath.includes('lessons/')) type = 'lesson';
        if (relativePath.includes('games/')) type = 'game';
        if (relativePath.includes('unit-plans/')) type = 'unit';
        if (relativePath.includes('activities/')) type = 'activity';
        
        // Determine subject from content or path
        let subject = extractSubject(content, relativePath);
        
        // Extract cultural level
        let cultural_level = extractCulturalLevel(content);
        
        // Extract year levels
        let year_levels = extractYearLevels(content, relativePath);
        
        // Generate ID from path
        const id = relativePath.replace(/[\/\\]/g, '_').replace(/\.html$/, '').replace(/[^a-zA-Z0-9_]/g, '_');
        
        return {
            id: id,
            title: title,
            path: relativePath,
            type: type,
            subject: subject,
            description: description || `📄 EDUCATIONAL RESOURCE: ${title} - A comprehensive ${type} for ${subject.toLowerCase()} learning.`,
            cultural_level: cultural_level,
            year_levels: year_levels,
            tags: extractTags(content, relativePath)
        };
        
    } catch (error) {
        console.warn(`⚠️  Could not process file: ${filePath}`);
        return null;
    }
}

function extractSubject(content, path) {
    // Check for explicit subject indicators
    if (content.includes('te reo māori') || content.includes('māori') || path.includes('maori')) return 'Te Reo Māori';
    if (content.includes('english') || path.includes('english') || content.includes('writing')) return 'English';
    if (content.includes('social studies') || path.includes('social') || content.includes('society')) return 'Social Studies';
    if (content.includes('mathematics') || content.includes('math') || path.includes('math')) return 'Mathematics';
    if (content.includes('science') || path.includes('science')) return 'Science';
    if (content.includes('art') || path.includes('art')) return 'The Arts';
    if (content.includes('health') || content.includes('pe')) return 'Health & PE';
    if (content.includes('technology') || path.includes('tech')) return 'Technology';
    
    return 'General Education';
}

function extractCulturalLevel(content) {
    // Count cultural indicators
    const culturalMarkers = [
        'māori', 'maori', 'te reo', 'whakatauki', 'kete', 'whakapapa', 
        'iwi', 'hapū', 'whānau', 'mana', 'tapu', 'noa', 'marae', 
        'pōwhiri', 'hongi', 'haka', 'waiata', 'pūrākau'
    ];
    
    let culturalCount = 0;
    const lowerContent = content.toLowerCase();
    
    culturalMarkers.forEach(marker => {
        const occurrences = (lowerContent.match(new RegExp(marker, 'g')) || []).length;
        culturalCount += occurrences;
    });
    
    if (culturalCount >= 10) return 'high';
    if (culturalCount >= 3) return 'medium';
    return 'low';
}

function extractYearLevels(content, path) {
    const levels = [];
    
    // Check for explicit year level indicators
    for (let i = 1; i <= 13; i++) {
        if (content.includes(`year ${i}`) || content.includes(`y${i}`) || path.includes(`y${i}`)) {
            levels.push(i);
        }
    }
    
    // Check for level ranges
    if (content.includes('primary') || content.includes('elementary')) {
        levels.push(1, 2, 3, 4, 5, 6);
    }
    if (content.includes('intermediate') || content.includes('middle')) {
        levels.push(7, 8);
    }
    if (content.includes('secondary') || content.includes('high school')) {
        levels.push(9, 10, 11, 12, 13);
    }
    
    return [...new Set(levels)].sort((a, b) => a - b);
}

function extractTags(content, path) {
    const tags = [];
    
    // Add tags based on content analysis
    if (content.includes('worksheet') || content.includes('handout')) tags.push('worksheet');
    if (content.includes('assessment') || content.includes('rubric')) tags.push('assessment');
    if (content.includes('interactive') || content.includes('game')) tags.push('interactive');
    if (content.includes('te ao māori') || content.includes('cultural')) tags.push('cultural');
    if (content.includes('digital') || content.includes('online')) tags.push('digital');
    if (content.includes('group') || content.includes('collaborative')) tags.push('collaborative');
    if (content.includes('inquiry') || content.includes('research')) tags.push('inquiry-based');
    
    return tags;
}

// Main recovery process
async function recoverResources() {
    console.log('🔍 Scanning for educational resources...');
    
    const allResources = [];
    
    // Scan handouts directory
    console.log('📄 Recovering handouts...');
    const handouts = scanDirectory('./public/handouts');
    allResources.push(...handouts);
    console.log(`   Found ${handouts.length} handouts`);
    
    // Scan guided inquiry lessons
    console.log('🎓 Recovering guided inquiry lessons...');
    const guidedLessons = scanDirectory('./public/guided-inquiry-unit/lessons');
    allResources.push(...guidedLessons);
    console.log(`   Found ${guidedLessons.length} guided inquiry lessons`);
    
    // Scan Y8 systems lessons
    console.log('🏛️ Recovering Y8 systems lessons...');
    const y8Lessons = scanDirectory('./public/y8-systems/lessons');
    allResources.push(...y8Lessons);
    console.log(`   Found ${y8Lessons.length} Y8 systems lessons`);
    
    // Scan games
    console.log('🎮 Recovering games...');
    const games = scanDirectory('./public/games');
    allResources.push(...games);
    console.log(`   Found ${games.length} games`);
    
    // Scan for other resources
    console.log('📚 Scanning for additional resources...');
    const otherResources = scanDirectory('./public').filter(resource => 
        !resource.path.startsWith('handouts/') &&
        !resource.path.startsWith('guided-inquiry-unit/lessons/') &&
        !resource.path.startsWith('y8-systems/lessons/') &&
        !resource.path.startsWith('games/') &&
        resource.path.endsWith('.html') &&
        !resource.path.includes('index.html')
    );
    allResources.push(...otherResources);
    console.log(`   Found ${otherResources.length} additional resources`);
    
    // Generate relationships (simplified for now)
    console.log('🔗 Generating resource relationships...');
    const relationships = generateRelationships(allResources);
    
    // Create knowledge graph structure
    const knowledgeGraph = {
        resources: allResources,
        relationships: relationships,
        metadata: {
            generated_at: new Date().toISOString(),
            total_resources: allResources.length,
            total_relationships: relationships.length,
            recovery_method: 'file_system_scan',
            cultural_resources: allResources.filter(r => r.cultural_level === 'high').length
        }
    };
    
    // Write recovered knowledge graph
    console.log('💾 Writing recovered knowledge graph...');
    fs.writeFileSync('./te_kete_knowledge_graph.json', JSON.stringify(knowledgeGraph, null, 2));
    
    console.log('✅ Resource recovery complete!');
    console.log(`📊 Recovery Summary:`);
    console.log(`   • Total Resources: ${allResources.length}`);
    console.log(`   • Handouts: ${handouts.length}`);
    console.log(`   • Lessons: ${guidedLessons.length + y8Lessons.length}`);
    console.log(`   • Games: ${games.length}`);
    console.log(`   • Cultural Resources: ${knowledgeGraph.metadata.cultural_resources}`);
    console.log(`   • Relationships: ${relationships.length}`);
    
    return knowledgeGraph;
}

function generateRelationships(resources) {
    const relationships = [];
    
    // Generate subject-based relationships
    const subjectGroups = {};
    resources.forEach(resource => {
        if (!subjectGroups[resource.subject]) {
            subjectGroups[resource.subject] = [];
        }
        subjectGroups[resource.subject].push(resource);
    });
    
    // Create relationships within subjects
    Object.values(subjectGroups).forEach(group => {
        for (let i = 0; i < group.length; i++) {
            for (let j = i + 1; j < group.length; j++) {
                relationships.push({
                    from: group[i].id,
                    to: group[j].id,
                    type: 'same_subject',
                    weight: 0.7
                });
            }
        }
    });
    
    // Generate year level relationships
    resources.forEach(resource => {
        if (resource.year_levels.length > 0) {
            const similarResources = resources.filter(other => 
                other.id !== resource.id && 
                other.year_levels.some(level => resource.year_levels.includes(level))
            );
            
            similarResources.forEach(similar => {
                relationships.push({
                    from: resource.id,
                    to: similar.id,
                    type: 'same_year_level',
                    weight: 0.6
                });
            });
        }
    });
    
    return relationships;
}

// Run the recovery
if (import.meta.url === `file://${process.argv[1]}`) {
    recoverResources().catch(console.error);
}

export { recoverResources, extractResourceInfo };