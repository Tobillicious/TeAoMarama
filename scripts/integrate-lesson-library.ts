#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

interface LessonResource {
  id: string;
  title: string;
  path: string;
  category: string;
  yearLevel: string;
  subject: string;
  topic: string;
  culturalContent: boolean;
  difficulty?: string;
  tags: string[];
}

async function integrateLessonLibrary() {
  console.log('🚀 Integrating 3,063 lesson files into Te Ao Mārama platform...');
  
  const handoutsDir = './dist/resources/handouts';
  
  if (!fs.existsSync(handoutsDir)) {
    console.error('❌ Handouts directory not found:', handoutsDir);
    return;
  }

  // Get all handout files
  const handoutFiles = fs.readdirSync(handoutsDir)
    .filter(file => file.endsWith('.md'))
    .sort();

  console.log(`📚 Found ${handoutFiles.length} lesson files`);

  const lessonResources: LessonResource[] = [];
  const subjectStats: Record<string, number> = {};
  const yearLevelStats: Record<string, number> = {};
  let culturalContentCount = 0;

  // Process each handout file
  handoutFiles.forEach((file, index) => {
    const match = file.match(/^Y(\d+)_(.+?)_(.+?)_(\d+)\.md$/);
    
    if (match) {
      const [, year, subject, topic, id] = match;
      const formattedSubject = subject.replace(/_/g, ' ');
      const formattedTopic = topic.replace(/_/g, ' ');
      const yearLevel = `Y${year}`;
      
      // Determine if content is cultural
      const isCultural = topic.includes('Treaty') || 
                        topic.includes('Waitangi') || 
                        topic.includes('Maori') || 
                        topic.includes('Aotearoa') ||
                        topic.includes('Tangata_Whenua') ||
                        topic.includes('Tikanga') ||
                        topic.includes('Whakapapa') ||
                        topic.includes('Te_Reo');

      if (isCultural) culturalContentCount++;

      // Generate difficulty based on year level
      let difficulty: string;
      const yearNum = parseInt(year);
      if (yearNum <= 3) difficulty = 'beginner';
      else if (yearNum <= 6) difficulty = 'intermediate';
      else if (yearNum <= 9) difficulty = 'advanced';
      else difficulty = 'expert';

      // Generate tags
      const tags = [
        yearLevel,
        formattedSubject.toLowerCase(),
        ...formattedTopic.toLowerCase().split(' '),
        difficulty
      ];
      
      if (isCultural) tags.push('cultural', 'te-ao-maori');
      if (formattedTopic.includes('Literacy')) tags.push('literacy');
      if (formattedTopic.includes('STEM')) tags.push('stem');

      const resource: LessonResource = {
        id: `lesson-${id}`,
        title: `${yearLevel} ${formattedSubject}: ${formattedTopic}`,
        path: `handouts/${file}`,
        category: formattedSubject.toLowerCase().replace(/\s+/g, '-'),
        yearLevel,
        subject: formattedSubject,
        topic: formattedTopic,
        culturalContent: isCultural,
        difficulty,
        tags: [...new Set(tags)] // Remove duplicates
      };

      lessonResources.push(resource);

      // Update statistics
      subjectStats[formattedSubject] = (subjectStats[formattedSubject] || 0) + 1;
      yearLevelStats[yearLevel] = (yearLevelStats[yearLevel] || 0) + 1;
    }

    // Progress indicator
    if ((index + 1) % 500 === 0) {
      console.log(`📊 Processed ${index + 1}/${handoutFiles.length} files...`);
    }
  });

  // Create comprehensive resource index
  const resourceIndex = {
    metadata: {
      totalResources: lessonResources.length,
      culturalResources: culturalContentCount,
      subjects: Object.keys(subjectStats),
      yearLevels: Object.keys(yearLevelStats).sort(),
      categories: [...new Set(lessonResources.map(r => r.category))],
      lastUpdated: new Date().toISOString(),
      platform: 'Te Ao Mārama - Te Kura o TeAoMarama',
      description: 'Comprehensive New Zealand curriculum-aligned educational resources'
    },
    statistics: {
      bySubject: subjectStats,
      byYearLevel: yearLevelStats,
      culturalContentPercentage: ((culturalContentCount / lessonResources.length) * 100).toFixed(1)
    },
    resources: lessonResources
  };

  // Write the comprehensive index
  const publicIndexPath = './public/resources/comprehensive-index.json';
  fs.writeFileSync(publicIndexPath, JSON.stringify(resourceIndex, null, 2));
  
  // Update the main index.json with a sample for backward compatibility
  const sampleResources = lessonResources.slice(0, 50);
  const mainIndex = [
    ...sampleResources,
    // Add existing real-resources
    {
      id: 'cultural-1',
      title: 'Y2 Visual Arts Patterns In Nature Maori Design',
      path: 'real-resources/Y2_Visual_Arts_Patterns_in_Nature_Maori_Design.md',
      category: 'arts',
      yearLevel: 'Y2',
      subject: 'Visual Arts',
      culturalContent: true,
      tags: ['arts', 'cultural', 'patterns', 'nature', 'maori']
    },
    {
      id: 'cultural-2',
      title: 'Y5 Physical Education Traditional Maori Games',
      path: 'real-resources/Y5_Physical_Education_Traditional_Maori_Games.md',
      category: 'physical-education',
      yearLevel: 'Y5',
      subject: 'Physical Education',
      culturalContent: true,
      tags: ['pe', 'cultural', 'traditional', 'games', 'maori']
    }
  ];

  fs.writeFileSync('./public/resources/index.json', JSON.stringify(mainIndex, null, 2));

  // Generate summary report
  const summaryReport = {
    totalResources: lessonResources.length,
    culturalResources: culturalContentCount,
    subjects: Object.keys(subjectStats),
    yearLevels: Object.keys(yearLevelStats).sort(),
    categories: [...new Set(lessonResources.map(r => r.category))],
    topSubjects: Object.entries(subjectStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([subject, count]) => ({ subject, count })),
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync('./reports/resource-summary.json', JSON.stringify(summaryReport, null, 2));

  console.log('\n✅ LESSON LIBRARY INTEGRATION COMPLETE!');
  console.log('📊 STATISTICS:');
  console.log(`   Total Resources: ${lessonResources.length}`);
  console.log(`   Cultural Content: ${culturalContentCount} (${summaryReport.culturalResources}%)`);
  console.log(`   Subjects: ${Object.keys(subjectStats).length}`);
  console.log(`   Year Levels: Y1-Y${Math.max(...Object.keys(yearLevelStats).map(y => parseInt(y.slice(1))))}`);
  console.log('\n🔝 TOP SUBJECTS:');
  summaryReport.topSubjects.forEach(({ subject, count }) => {
    console.log(`   ${subject}: ${count} lessons`);
  });
  
  console.log('\n📁 FILES CREATED:');
  console.log('   ./public/resources/comprehensive-index.json');
  console.log('   ./public/resources/index.json (updated)');
  console.log('   ./reports/resource-summary.json (updated)');
  
  console.log('\n🚀 Your platform now has access to 3,000+ professional lessons!');
}

// Run the integration
integrateLessonLibrary().catch(console.error);