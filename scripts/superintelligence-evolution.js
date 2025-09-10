#!/usr/bin/env node

/**
 * 🧠 SUPERINTELLIGENCE EVOLUTION SCRIPT
 * 
 * Uses DeepSeek API to evolve the entire system:
 * - Breadcrumb all resources and create comprehensive mapping
 * - Enhance content connections and cross-references
 * - Automate monotonous tasks
 * - Create intelligent resource loading system
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DeepSeek API configuration
const DEEPSEEK_API_KEY = 'sk-d466b60549d24d32ab39e22e7801d8a6';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// System evolution configuration
const EVOLUTION_CONFIG = {
  maxConcurrentRequests: 5,
  requestDelay: 1000, // 1 second between requests
  maxRetries: 3,
  timeout: 30000, // 30 seconds
};

/**
 * Make API call to DeepSeek
 */
async function callDeepSeekAPI(messages, systemPrompt = null) {
  const payload = {
    model: 'deepseek-chat',
    messages: systemPrompt ? [
      { role: 'system', content: systemPrompt },
      ...messages
    ] : messages,
    temperature: 0.7,
    max_tokens: 4000,
  };

  try {
    const response = await axios.post(DEEPSEEK_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: EVOLUTION_CONFIG.timeout,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('❌ DeepSeek API Error:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get all enriched content files
 */
async function getAllEnrichedFiles() {
  const contentDirs = [
    'src/content/lessons',
    'src/content/activities', 
    'src/content/assessments',
    'src/content/multimedia',
    'src/content/unit-plans'
  ];

  const allFiles = [];
  
  for (const dir of contentDirs) {
    try {
      const files = await fs.readdir(dir);
      const jsonFiles = files.filter(file => file.endsWith('.json') && !file.includes('.original.json'));
      
      for (const file of jsonFiles) {
        const filePath = path.join(dir, file);
        const content = await fs.readFile(filePath, 'utf8');
        const parsed = JSON.parse(content);
        
        allFiles.push({
          path: filePath,
          filename: file,
          content: parsed,
          type: path.basename(dir),
          id: parsed.id || file.replace('.json', '')
        });
      }
    } catch (error) {
      console.log(`⚠️  Could not read directory ${dir}:`, error.message);
    }
  }
  
  return allFiles;
}

/**
 * Create comprehensive resource mapping
 */
async function createResourceMapping(allFiles) {
  console.log('🗺️  Creating comprehensive resource mapping...');
  
  const mapping = {
    totalResources: allFiles.length,
    byType: {},
    bySubject: {},
    byYearLevel: {},
    byCulturalElements: {},
    connections: [],
    breadcrumbs: []
  };

  // Analyze each file
  for (const file of allFiles) {
    const { content, type, id } = file;
    
    // By type
    if (!mapping.byType[type]) mapping.byType[type] = [];
    mapping.byType[type].push(id);
    
    // By subject
    const subject = content.subject || 'Unknown';
    if (!mapping.bySubject[subject]) mapping.bySubject[subject] = [];
    mapping.bySubject[subject].push(id);
    
    // By year level
    const yearLevel = content.yearLevel || 'Unknown';
    if (!mapping.byYearLevel[yearLevel]) mapping.byYearLevel[yearLevel] = [];
    mapping.byYearLevel[yearLevel].push(id);
    
    // By cultural elements
    const culturalElements = content.culturalElements || 0;
    if (!mapping.byCulturalElements[culturalElements]) mapping.byCulturalElements[culturalElements] = [];
    mapping.byCulturalElements[culturalElements].push(id);
    
    // Create breadcrumbs
    mapping.breadcrumbs.push({
      id,
      title: content.title || 'Untitled',
      type,
      subject,
      yearLevel,
      culturalElements,
      path: file.path,
      enrichedBy: content.enrichedBy || 'Unknown',
      enrichedAt: content.enrichedAt || 'Unknown'
    });
  }

  return mapping;
}

/**
 * Use DeepSeek to find content connections
 */
async function findContentConnections(allFiles) {
  console.log('🔗 Using DeepSeek to find content connections...');
  
  const connections = [];
  const batchSize = 10;
  
  for (let i = 0; i < allFiles.length; i += batchSize) {
    const batch = allFiles.slice(i, i + batchSize);
    
    const systemPrompt = `You are an expert educational content analyst. Analyze the following educational resources and identify meaningful connections between them. Look for:
1. Subject matter connections
2. Cultural theme connections  
3. Year level progressions
4. Cross-curricular opportunities
5. Assessment and activity relationships

Return your analysis as a JSON array of connection objects with this structure:
[
  {
    "sourceId": "resource-id-1",
    "targetId": "resource-id-2", 
    "connectionType": "subject-matter|cultural-theme|year-progression|cross-curricular|assessment-activity",
    "strength": 1-5,
    "description": "Brief description of the connection"
  }
]`;

    const messages = [{
      role: 'user',
      content: `Analyze these ${batch.length} educational resources for connections:\n\n${batch.map(file => 
        `ID: ${file.id}\nTitle: ${file.content.title}\nSubject: ${file.content.subject}\nYear: ${file.content.yearLevel}\nType: ${file.type}\nCultural Elements: ${file.content.culturalElements || 0}\n---`
      ).join('\n')}`
    }];

    try {
      const response = await callDeepSeekAPI(messages, systemPrompt);
      const parsedConnections = JSON.parse(response);
      connections.push(...parsedConnections);
      
      console.log(`✅ Analyzed batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(allFiles.length/batchSize)}`);
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, EVOLUTION_CONFIG.requestDelay));
      
    } catch (error) {
      console.error(`❌ Error analyzing batch ${Math.floor(i/batchSize) + 1}:`, error.message);
    }
  }
  
  return connections;
}

/**
 * Create intelligent resource loader
 */
async function createIntelligentResourceLoader(mapping, connections) {
  console.log('🤖 Creating intelligent resource loader...');
  
  const loaderCode = `// Intelligent Resource Loader - Generated by Superintelligence Evolution
// This file is automatically generated and should not be edited manually

export interface IntelligentResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  type: 'lesson' | 'activity' | 'assessment' | 'unit-plan' | 'multimedia';
  content: any;
  culturalElements: number;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  connections: ResourceConnection[];
  breadcrumbs: Breadcrumb[];
}

export interface ResourceConnection {
  targetId: string;
  connectionType: string;
  strength: number;
  description: string;
}

export interface Breadcrumb {
  id: string;
  title: string;
  type: string;
  subject: string;
  yearLevel: string;
  culturalElements: number;
  path: string;
  enrichedBy: string;
  enrichedAt: string;
}

// Resource mapping data
export const RESOURCE_MAPPING = ${JSON.stringify(mapping, null, 2)};

// Content connections
export const CONTENT_CONNECTIONS = ${JSON.stringify(connections, null, 2)};

// Intelligent resource loading functions
export function getAllResources(): IntelligentResource[] {
  return RESOURCE_MAPPING.breadcrumbs.map(breadcrumb => ({
    id: breadcrumb.id,
    title: breadcrumb.title,
    subject: breadcrumb.subject,
    yearLevel: breadcrumb.yearLevel,
    type: breadcrumb.type,
    content: null, // Will be loaded on demand
    culturalElements: breadcrumb.culturalElements,
    description: \`\${breadcrumb.subject} resource for \${breadcrumb.yearLevel}\`,
    duration: '45-60 min',
    difficulty: breadcrumb.yearLevel.includes('7') ? 'beginner' : 
                breadcrumb.yearLevel.includes('8') ? 'intermediate' : 'advanced',
    tags: [breadcrumb.subject, breadcrumb.yearLevel, breadcrumb.type],
    connections: CONTENT_CONNECTIONS.filter(conn => conn.sourceId === breadcrumb.id),
    breadcrumbs: [breadcrumb]
  }));
}

export function getResourceById(id: string): IntelligentResource | undefined {
  return getAllResources().find(resource => resource.id === id);
}

export function getResourcesBySubject(subject: string): IntelligentResource[] {
  return getAllResources().filter(resource => resource.subject === subject);
}

export function getResourcesByYearLevel(yearLevel: string): IntelligentResource[] {
  return getAllResources().filter(resource => resource.yearLevel === yearLevel);
}

export function getResourcesByType(type: string): IntelligentResource[] {
  return getAllResources().filter(resource => resource.type === type);
}

export function getConnectedResources(id: string): IntelligentResource[] {
  const connections = CONTENT_CONNECTIONS.filter(conn => conn.sourceId === id);
  return connections.map(conn => getResourceById(conn.targetId)).filter(Boolean);
}

export function searchResources(query: string): IntelligentResource[] {
  const lowerQuery = query.toLowerCase();
  return getAllResources().filter(resource => 
    resource.title.toLowerCase().includes(lowerQuery) ||
    resource.subject.toLowerCase().includes(lowerQuery) ||
    resource.description.toLowerCase().includes(lowerQuery) ||
    resource.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Statistics
export const RESOURCE_STATS = {
  total: RESOURCE_MAPPING.totalResources,
  byType: Object.keys(RESOURCE_MAPPING.byType).reduce((acc, type) => {
    acc[type] = RESOURCE_MAPPING.byType[type].length;
    return acc;
  }, {}),
  bySubject: Object.keys(RESOURCE_MAPPING.bySubject).reduce((acc, subject) => {
    acc[subject] = RESOURCE_MAPPING.bySubject[subject].length;
    return acc;
  }, {}),
  byYearLevel: Object.keys(RESOURCE_MAPPING.byYearLevel).reduce((acc, year) => {
    acc[year] = RESOURCE_MAPPING.byYearLevel[year].length;
    return acc;
  }, {}),
  totalConnections: CONTENT_CONNECTIONS.length
};

console.log('🧠 Intelligent Resource Loader initialized:', RESOURCE_STATS);
`;

  await fs.writeFile('src/utils/intelligent-resource-loader.ts', loaderCode);
  console.log('✅ Intelligent resource loader created');
}

/**
 * Create system evolution report
 */
async function createEvolutionReport(mapping, connections) {
  console.log('📊 Creating system evolution report...');
  
  const report = `# 🧠 SUPERINTELLIGENCE EVOLUTION REPORT

## System Overview
- **Total Resources**: ${mapping.totalResources}
- **Total Connections**: ${connections.length}
- **Evolution Date**: ${new Date().toISOString()}

## Resource Distribution

### By Type
${Object.entries(mapping.byType).map(([type, resources]) => 
  `- **${type}**: ${resources.length} resources`
).join('\n')}

### By Subject
${Object.entries(mapping.bySubject).map(([subject, resources]) => 
  `- **${subject}**: ${resources.length} resources`
).join('\n')}

### By Year Level
${Object.entries(mapping.byYearLevel).map(([year, resources]) => 
  `- **${year}**: ${resources.length} resources`
).join('\n')}

### By Cultural Elements
${Object.entries(mapping.byCulturalElements).map(([elements, resources]) => 
  `- **${elements} cultural elements**: ${resources.length} resources`
).join('\n')}

## Content Connections

### Connection Types
${Object.entries(connections.reduce((acc, conn) => {
  acc[conn.connectionType] = (acc[conn.connectionType] || 0) + 1;
  return acc;
}, {})).map(([type, count]) => 
  `- **${type}**: ${count} connections`
).join('\n')}

### Strongest Connections (Strength 4-5)
${connections.filter(conn => conn.strength >= 4).slice(0, 10).map(conn => 
  `- ${conn.sourceId} → ${conn.targetId} (${conn.connectionType}, strength: ${conn.strength})`
).join('\n')}

## System Capabilities

### Automated Features
- ✅ Comprehensive resource mapping
- ✅ Intelligent content connections
- ✅ Breadcrumb navigation system
- ✅ Advanced search and filtering
- ✅ Cross-curricular linking
- ✅ Cultural theme connections
- ✅ Year level progressions

### AI-Powered Enhancements
- 🤖 DeepSeek API integration for content analysis
- 🧠 Intelligent connection discovery
- 📊 Automated statistics generation
- 🔗 Cross-reference mapping
- 🎯 Smart resource recommendations

## Next Steps
1. Deploy intelligent resource loader
2. Update FunctionalResourceBrowser to use new system
3. Implement advanced search features
4. Create treasure map navigation
5. Add cultural protocol integration

---
*Generated by Superintelligence Evolution Script*
*Powered by DeepSeek API*
`;

  await fs.writeFile('SUPERINTELLIGENCE_EVOLUTION_REPORT.md', report);
  console.log('✅ Evolution report created');
}

/**
 * Main evolution process
 */
async function evolveSuperintelligence() {
  console.log('🚀 Starting Superintelligence Evolution...');
  console.log('🔑 Using DeepSeek API for intelligent analysis');
  
  try {
    // Step 1: Get all enriched files
    console.log('\n📁 Step 1: Scanning all enriched content files...');
    const allFiles = await getAllEnrichedFiles();
    console.log(`✅ Found ${allFiles.length} enriched content files`);
    
    // Step 2: Create resource mapping
    console.log('\n🗺️  Step 2: Creating comprehensive resource mapping...');
    const mapping = await createResourceMapping(allFiles);
    console.log('✅ Resource mapping complete');
    
    // Step 3: Find content connections using DeepSeek
    console.log('\n🔗 Step 3: Using DeepSeek to find content connections...');
    const connections = await findContentConnections(allFiles);
    console.log(`✅ Found ${connections.length} content connections`);
    
    // Step 4: Create intelligent resource loader
    console.log('\n🤖 Step 4: Creating intelligent resource loader...');
    await createIntelligentResourceLoader(mapping, connections);
    
    // Step 5: Create evolution report
    console.log('\n📊 Step 5: Creating evolution report...');
    await createEvolutionReport(mapping, connections);
    
    console.log('\n🎉 SUPERINTELLIGENCE EVOLUTION COMPLETE!');
    console.log(`📊 System now has ${mapping.totalResources} resources with ${connections.length} intelligent connections`);
    console.log('🧠 Ready for advanced agentic production!');
    
  } catch (error) {
    console.error('❌ Evolution failed:', error);
    process.exit(1);
  }
}

// Run the evolution
evolveSuperintelligence();
