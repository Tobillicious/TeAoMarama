#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

interface DeepLearningResource {
  id: string;
  title: string;
  type: string;
  subject: string;
  yearLevel: string;
  path: string;
  culturalContent: boolean;
  generated_by?: string;
  generated_at?: string;
  cultural_safety?: string;
  status?: string;
  description: string;
  tags: string[];
}

async function integrateDeepLearningContent() {
  console.log('🌟 Integrating deep, beautiful learning experiences...');
  
  const deepContentPaths = [
    './dist/resources/deepseek-generated',
    './public/resources/deepseek-generated',
    './dist/resources/te-kete-ako-clean/dist/units',
    './public/resources/te-kete-ako-clean/public/units',
    './migration/unit_plans'
  ];

  const deepResources: DeepLearningResource[] = [];
  let totalFound = 0;

  for (const contentPath of deepContentPaths) {
    if (fs.existsSync(contentPath)) {
      console.log(`📖 Processing: ${contentPath}`);
      
      const processDirectory = (dir: string) => {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const item of items) {
          if (item.isDirectory()) {
            processDirectory(path.join(dir, item.name));
          } else if (item.name.endsWith('.md')) {
            const filePath = path.join(dir, item.name);
            const relativePath = path.relative('.', filePath);
            
            try {
              const content = fs.readFileSync(filePath, 'utf-8');
              const lines = content.split('\n');
              
              // Extract metadata from frontmatter or content
              const metadata: any = {};
              let inFrontmatter = false;
              let title = '';
              let description = '';
              
              // Parse frontmatter if present
              if (content.startsWith('---')) {
                inFrontmatter = true;
                for (let i = 1; i < lines.length; i++) {
                  if (lines[i] === '---') {
                    inFrontmatter = false;
                    break;
                  }
                  const [key, ...valueParts] = lines[i].split(':');
                  if (key && valueParts.length > 0) {
                    metadata[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
                  }
                }
              }

              // Extract title from filename or content
              if (metadata.title) {
                title = metadata.title;
              } else if (item.name.includes('_')) {
                const parts = item.name.replace('.md', '').split('_');
                if (parts.length >= 4) {
                  const [type, subject, year, ...topicParts] = parts;
                  title = `${year} ${subject}: ${topicParts.join(' ').replace(/-/g, ' ')}`;
                }
              } else {
                // Look for first heading
                const headingMatch = content.match(/^#\s+(.+)$/m);
                title = headingMatch ? headingMatch[1] : item.name.replace('.md', '').replace(/_/g, ' ');
              }

              // Extract description from content
              const bigIdeaMatch = content.match(/## Big Idea\s*\n(.+?)(?=\n##|\n---|\n$)/s);
              const visionMatch = content.match(/## Unit Vision\s*\n(.+?)(?=\n##|\n---|\n$)/s);
              description = bigIdeaMatch?.[1]?.trim() || visionMatch?.[1]?.trim() || 
                          content.split('\n').find(line => line.length > 100 && !line.startsWith('#'))?.substring(0, 200) + '...' || 
                          'Deep learning experience with cultural integration';

              // Determine content type
              let type = 'lesson';
              if (item.name.startsWith('handout_')) type = 'handout';
              else if (item.name.startsWith('activity_')) type = 'activity';
              else if (item.name.startsWith('assessment_')) type = 'assessment';
              else if (item.name.includes('URD-Unit')) type = 'unit';
              else if (item.name.includes('lesson_')) type = 'lesson';

              // Extract subject and year
              let subject = metadata.subject || 'General';
              let yearLevel = metadata.year_level ? `Y${metadata.year_level}` : 'Y7-Y10';
              
              if (item.name.includes('_')) {
                const parts = item.name.split('_');
                if (parts.length >= 3) {
                  subject = parts[1]?.replace(/-/g, ' ') || subject;
                  if (parts[2]?.startsWith('Y')) {
                    yearLevel = parts[2];
                  }
                }
              }

              // Determine cultural content
              const culturalKeywords = ['māori', 'maori', 'aotearoa', 'tikanga', 'whakapapa', 'kaitiakitanga', 'te reo', 'mātauranga'];
              const hasCulturalContent = culturalKeywords.some(keyword => 
                content.toLowerCase().includes(keyword) || title.toLowerCase().includes(keyword)
              );

              // Generate tags
              const tags = [
                type,
                subject.toLowerCase().replace(/\s+/g, '-'),
                yearLevel.toLowerCase(),
                ...(hasCulturalContent ? ['cultural', 'te-ao-maori', 'indigenous'] : []),
                ...(content.includes('rongoā') ? ['traditional-medicine'] : []),
                ...(content.includes('whakataukī') ? ['proverbs'] : []),
                ...(content.includes('Deep Investigation') ? ['inquiry-based'] : []),
                ...(content.includes('Transfer Challenge') ? ['authentic-assessment'] : []),
                ...(metadata.status === 'draft' ? ['draft'] : ['ready'])
              ];

              const resource: DeepLearningResource = {
                id: `deep-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                title: title.charAt(0).toUpperCase() + title.slice(1),
                type,
                subject,
                yearLevel,
                path: relativePath,
                culturalContent: hasCulturalContent,
                generated_by: metadata.generated_by,
                generated_at: metadata.generated_at,
                cultural_safety: metadata.cultural_safety,
                status: metadata.status || 'ready',
                description: description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
                tags: [...new Set(tags)]
              };

              deepResources.push(resource);
              totalFound++;
            } catch (error) {
              console.warn(`⚠️ Could not process ${filePath}:`, error);
            }
          }
        }
      };

      processDirectory(contentPath);
    }
  }

  console.log(`\n🎯 DEEP LEARNING CONTENT DISCOVERED:`);
  console.log(`   Total resources: ${totalFound}`);
  console.log(`   Cultural content: ${deepResources.filter(r => r.culturalContent).length}`);
  console.log(`   Subjects: ${[...new Set(deepResources.map(r => r.subject))].join(', ')}`);
  
  // Group by type
  const byType = deepResources.reduce((acc, resource) => {
    acc[resource.type] = (acc[resource.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('\n📚 RESOURCE TYPES:');
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`   ${type}: ${count} resources`);
  });

  // Update the main index to prioritize deep learning content
  const existingIndex = JSON.parse(fs.readFileSync('./public/resources/index.json', 'utf-8'));
  
  // Place deep learning content at the top
  const enhancedIndex = [
    ...deepResources.slice(0, 20), // Top 20 deep learning resources
    ...existingIndex.filter((item: any) => !item.id?.startsWith('deep-')).slice(0, 30) // Keep some existing
  ];

  fs.writeFileSync('./public/resources/index.json', JSON.stringify(enhancedIndex, null, 2));

  // Create a separate deep learning index
  const deepLearningIndex = {
    metadata: {
      title: 'Te Kura o TeAoMarama - Deep Learning Experiences',
      description: 'Culturally-responsive, inquiry-based learning experiences for Aotearoa New Zealand',
      totalResources: deepResources.length,
      culturalResources: deepResources.filter(r => r.culturalContent).length,
      lastUpdated: new Date().toISOString()
    },
    resources: deepResources
  };

  fs.writeFileSync('./public/resources/deep-learning-index.json', JSON.stringify(deepLearningIndex, null, 2));

  // Update the resource summary
  const summary = {
    totalResources: totalFound + existingIndex.length,
    deepLearningResources: totalFound,
    culturalResources: deepResources.filter(r => r.culturalContent).length,
    subjects: [...new Set(deepResources.map(r => r.subject))],
    yearLevels: [...new Set(deepResources.map(r => r.yearLevel))].sort(),
    resourceTypes: Object.keys(byType),
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync('./reports/resource-summary.json', JSON.stringify(summary, null, 2));

  console.log('\n✨ INTEGRATION COMPLETE!');
  console.log('📁 Files created/updated:');
  console.log('   ./public/resources/index.json (enhanced with deep learning)');
  console.log('   ./public/resources/deep-learning-index.json (new)');
  console.log('   ./reports/resource-summary.json (updated)');
  
  console.log('\n🌟 Your beautiful, deep learning content is now discoverable!');
  console.log('Students can now access inquiry-based, culturally-responsive learning experiences.');
}

// Run the integration
integrateDeepLearningContent().catch(console.error);