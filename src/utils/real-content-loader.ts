// Real Content Loader - Loads actual enhanced educational resources
import type { RealResource } from '../types';

export interface EnhancedResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  type: 'assessment' | 'lesson' | 'handout' | 'activity';
  description: string;
  culturalElements: number;
  currentPass: number;
  originalQuality: number;
  enhancement: {
    passesCompleted: number;
    culturalAuthenticity: number;
    pedagogicalDepth: number;
    progressiveIndex: number;
    qualityScore: number;
    passes: Array<{
      passNumber: number;
      kaiako: string;
      specialization: string;
      enhancedContent: {
        focus: string;
        elements: string[];
      };
      timeCompleted: string;
      qualityImprovement: number;
    }>;
  };
  content?: string;
  filename?: string;
  path?: string;
}

export interface BatchData {
  batchId: string;
  processedDate: string;
  resourceCount: number;
  enhancedCount: number;
  resources: EnhancedResource[];
}

let cachedResources: RealResource[] | null = null;
let loadingPromise: Promise<RealResource[]> | null = null;

export async function loadRealEducationalContent(): Promise<RealResource[]> {
  if (cachedResources) {
    return cachedResources;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = loadAllEnhancedResources();
  cachedResources = await loadingPromise;
  loadingPromise = null;

  return cachedResources;
}

async function loadAllEnhancedResources(): Promise<RealResource[]> {
  console.log('🎯 Loading real enhanced educational resources...');

  const allResources: RealResource[] = [];

  try {
    // Load initial batch for fast page load, then progressively load more
    const initialBatchCount = 50; // Load first 50 batches (~500 resources) for fast initial load
    const totalBatches = 607;

    console.log(
      `🚀 Initial load: ${initialBatchCount} batches, then progressively loading all ${totalBatches} batches...`,
    );

    // Phase 1: Fast initial load of first 50 batches
    const initialPromises = Array.from({ length: initialBatchCount }, (_, i) => i + 1).map(
      async (batchNum) => {
        try {
          const response = await fetch(
            `/enhanced-resources-output/batch-${batchNum}-enhanced.json`,
          );
          if (response.ok) {
            const batchData: BatchData = await response.json();
            return batchData.resources.map((enhancedResource) =>
              convertEnhancedToRealResource(enhancedResource, batchNum),
            );
          }
        } catch (error) {
          console.warn(`Failed to load batch ${batchNum}:`, error);
        }
        return [];
      },
    );

    const initialResults = await Promise.all(initialPromises);
    initialResults.forEach((batchResources) => {
      if (batchResources.length > 0) {
        allResources.push(...batchResources);
      }
    });

    console.log(`✅ Initial load complete: ${allResources.length} resources loaded`);

    // Phase 2: Background loading of remaining batches (async, won't block UI)
    setTimeout(async () => {
      console.log(`🔄 Background loading remaining ${totalBatches - initialBatchCount} batches...`);

      const chunkSize = 25;
      for (let i = initialBatchCount; i < totalBatches; i += chunkSize) {
        const chunkStart = i + 1;
        const chunkEnd = Math.min(i + chunkSize, totalBatches);
        const currentChunk = Array.from(
          { length: chunkEnd - chunkStart + 1 },
          (_, idx) => chunkStart + idx,
        );

        const chunkPromises = currentChunk.map(async (batchNum) => {
          try {
            const response = await fetch(
              `/enhanced-resources-output/batch-${batchNum}-enhanced.json`,
            );
            if (response.ok) {
              const batchData: BatchData = await response.json();
              return batchData.resources.map((enhancedResource) =>
                convertEnhancedToRealResource(enhancedResource, batchNum),
              );
            }
          } catch (error) {
            console.warn(`Failed to load batch ${batchNum}:`, error);
          }
          return [];
        });

        const chunkResults = await Promise.all(chunkPromises);
        chunkResults.forEach((batchResources) => {
          if (batchResources.length > 0) {
            allResources.push(...batchResources);
            // Update cached resources for next access
            cachedResources = [...allResources];
          }
        });

        console.log(`📈 Background progress: ${allResources.length} total resources loaded`);

        // Small delay to avoid overwhelming the browser
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      console.log(`🎉 All ${allResources.length} enhanced resources loaded!`);
    }, 1000); // Start background loading after 1 second

    // Load from comprehensive index
    try {
      const indexResponse = await fetch('/resources/comprehensive-index.json');
      if (indexResponse.ok) {
        const indexData = await indexResponse.json();
        if (Array.isArray(indexData)) {
          const indexResources = indexData.map((item, index) =>
            convertIndexItemToRealResource(item, index),
          );
          allResources.push(...indexResources);
        }
      }
    } catch (error) {
      console.warn('Failed to load comprehensive index:', error);
    }

    // Load from real-resources directory
    try {
      const realResourcesResponse = await fetch('/resources/index.json');
      if (realResourcesResponse.ok) {
        const realResourcesData = await realResourcesResponse.json();
        if (Array.isArray(realResourcesData)) {
          const realResources = realResourcesData.map((item, index) =>
            convertResourceItemToReal(item, index),
          );
          allResources.push(...realResources);
        }
      }
    } catch (error) {
      console.warn('Failed to load real resources index:', error);
    }

    console.log(`✅ Loaded ${allResources.length} real educational resources`);
    return deduplicateResources(allResources);
  } catch (error) {
    console.error('❌ Failed to load real educational content:', error);
    return [];
  }
}

function convertEnhancedToRealResource(enhanced: EnhancedResource, batchNum: number): RealResource {
  const qualityScore = Math.min(100, Math.round(enhanced.enhancement.qualityScore));

  return {
    id: enhanced.id,
    title: enhanced.title,
    subject: enhanced.subject,
    yearLevel: enhanced.yearLevel,
    type: enhanced.type,
    filename: `${enhanced.id}.md`,
    path: `/enhanced-resources-output/batch-${batchNum}-enhanced.json`,
    culturalElements: enhanced.culturalElements,
    description: enhanced.description,
    content: generateEnhancedContent(enhanced),
    duration: estimateDuration(enhanced),
    difficulty: determineDifficulty(enhanced),
    tags: generateTags(enhanced),
    qualityMetrics: {
      qualityScore,
      culturalAuthenticity: Math.round(enhanced.enhancement.culturalAuthenticity),
      pedagogicalDepth: Math.round(enhanced.enhancement.pedagogicalDepth),
      progressiveIndex: Math.round(enhanced.enhancement.progressiveIndex),
      passesCompleted: enhanced.enhancement.passesCompleted,
      isComplete: enhanced.enhancement.passesCompleted >= 4,
    },
  };
}

function convertIndexItemToRealResource(item: unknown, index: number): RealResource {
  return {
    id: item.id || `index-${index}`,
    title: item.title || `Educational Resource ${index + 1}`,
    subject: item.category || 'General',
    yearLevel: extractYearLevel(item.title) || 'Mixed',
    type: 'handout',
    filename: item.path ? item.path.split('/').pop() : `resource-${index}.md`,
    path: item.path || `/resources/item-${index}`,
    culturalElements: item.culturalContent ? 3 : 0,
    description: item.description || `Educational resource from comprehensive index`,
    duration: '45 mins',
    difficulty: 'intermediate',
    tags: generateTagsFromTitle(item.title),
  };
}

function convertResourceItemToReal(item: unknown, index: number): RealResource {
  return {
    id: item.id || `real-${index}`,
    title: item.title || `Real Resource ${index + 1}`,
    subject: extractSubject(item.title) || 'General',
    yearLevel: extractYearLevel(item.title) || 'Mixed',
    type: 'lesson',
    filename: item.path ? item.path.split('/').pop() : `real-resource-${index}.md`,
    path: item.path || `/real-resources/item-${index}`,
    culturalElements: item.culturalContent ? 4 : 1,
    description: item.description || `Real educational resource`,
    duration: '60 mins',
    difficulty: 'intermediate',
    tags: generateTagsFromTitle(item.title),
  };
}

function generateEnhancedContent(enhanced: EnhancedResource): string {
  const kaiakoPasses = enhanced.enhancement.passes
    .map(
      (pass) =>
        `### ${pass.specialization} (${pass.kaiako})
**Focus**: ${pass.focus}
**Elements**: ${pass.enhancedContent.elements.join(', ')}
**Quality Improvement**: +${pass.qualityImprovement.toFixed(1)}

`,
    )
    .join('');

  return `# ${enhanced.title}

*Enhanced through ${enhanced.enhancement.passesCompleted}-pass cultural enrichment system*

## Overview
${enhanced.description}

**Subject**: ${enhanced.subject}
**Year Level**: ${enhanced.yearLevel}
**Type**: ${enhanced.type}
**Cultural Elements**: ${enhanced.culturalElements}

## Quality Metrics
- **Overall Quality Score**: ${enhanced.enhancement.qualityScore.toFixed(1)}/100
- **Cultural Authenticity**: ${enhanced.enhancement.culturalAuthenticity.toFixed(1)}/10
- **Pedagogical Depth**: ${enhanced.enhancement.pedagogicalDepth.toFixed(1)}/10
- **Progressive Index**: ${enhanced.enhancement.progressiveIndex.toFixed(1)}/10

## Enhancement Passes Completed

${kaiakoPasses}

## Learning Objectives
Students will demonstrate understanding of key concepts through culturally responsive learning experiences that honor Te Ao Māori perspectives and contemporary educational practices.

## Cultural Integration
This resource has been enhanced through our 4-pass cultural authenticity system, ensuring appropriate integration of:
- Te Reo Māori vocabulary and concepts
- Tikanga Māori protocols and values
- Cultural safety and responsiveness
- Connection to local and indigenous knowledge systems

## Assessment Opportunities
- Formative assessment through cultural protocols
- Summative evaluation respecting diverse learning styles
- Portfolio evidence collection
- Peer and self-reflection opportunities

---

*This resource was enhanced through the TeAoMarama AI-Enhanced Educational Development System, ensuring cultural authenticity and pedagogical excellence.*`;
}

function estimateDuration(enhanced: EnhancedResource): string {
  const baseMinutes = enhanced.type === 'assessment' ? 90 : enhanced.type === 'lesson' ? 60 : 45;
  const complexity = enhanced.enhancement.pedagogicalDepth / 10;
  const totalMinutes = Math.round(baseMinutes * (0.8 + complexity * 0.4));

  return `${totalMinutes} mins`;
}

function determineDifficulty(enhanced: EnhancedResource): 'beginner' | 'intermediate' | 'advanced' {
  const score = enhanced.enhancement.progressiveIndex;
  if (score >= 8) return 'advanced';
  if (score >= 6) return 'intermediate';
  return 'beginner';
}

function generateTags(enhanced: EnhancedResource): string[] {
  const tags = [
    enhanced.subject.toLowerCase().replace(/\s+/g, '-'),
    enhanced.yearLevel.toLowerCase().replace(/\s+/g, '-'),
    enhanced.type,
  ];

  if (enhanced.culturalElements > 0) {
    tags.push('cultural-content', 'māori-perspectives');
  }

  if (enhanced.enhancement.culturalAuthenticity >= 8) {
    tags.push('culturally-authentic');
  }

  if (enhanced.enhancement.pedagogicalDepth >= 8) {
    tags.push('pedagogically-rich');
  }

  if (enhanced.enhancement.passesCompleted >= 4) {
    tags.push('fully-enhanced', 'production-ready');
  }

  return tags;
}

function generateTagsFromTitle(title: string): string[] {
  const tags = ['educational-resource'];

  if (title.toLowerCase().includes('māori') || title.toLowerCase().includes('maori')) {
    tags.push('cultural-content', 'māori-perspectives');
  }

  if (title.toLowerCase().includes('traditional')) {
    tags.push('traditional-knowledge');
  }

  return tags;
}

function extractYearLevel(title: string): string | null {
  const yearMatch = title.match(/Y(\d+)|Year\s*(\d+)/i);
  if (yearMatch) {
    const year = yearMatch[1] || yearMatch[2];
    return `Year ${year}`;
  }
  return null;
}

function extractSubject(title: string): string | null {
  const subjects = [
    'English',
    'Mathematics',
    'Science',
    'Social Studies',
    'Te Reo Māori',
    'Art',
    'Music',
    'Physical Education',
    'Health',
    'Technology',
    'Languages',
  ];

  for (const subject of subjects) {
    if (title.toLowerCase().includes(subject.toLowerCase())) {
      return subject;
    }
  }

  return null;
}

function deduplicateResources(resources: RealResource[]): RealResource[] {
  const seen = new Set<string>();
  return resources.filter((resource) => {
    const key = `${resource.title}-${resource.yearLevel}-${resource.subject}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export async function loadResourceContent(resourcePath: string): Promise<string | null> {
  try {
    const response = await fetch(resourcePath);
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.warn(`Failed to load resource content from ${resourcePath}:`, error);
  }
  return null;
}

export function getContentQualityStats(resources: RealResource[]) {
  const total = resources.length;
  const withQuality = resources.filter((r) => r.qualityMetrics?.qualityScore);
  const ready = resources.filter((r) => r.qualityMetrics?.qualityScore >= 70);
  const enhanced = resources.filter(
    (r) => r.qualityMetrics?.qualityScore >= 50 && r.qualityMetrics?.qualityScore < 70,
  );
  const templates = resources.filter(
    (r) => !r.qualityMetrics || r.qualityMetrics?.qualityScore < 50,
  );
  const skeletons = resources.filter((r) => !r.content || r.content.length < 500);

  return {
    total,
    ready: ready.length,
    enhanced: enhanced.length,
    templates: templates.length,
    skeletons: skeletons.length,
    percentReady: total > 0 ? Math.round((ready.length / total) * 100) : 0,
    averageQuality:
      withQuality.length > 0
        ? Math.round(
            withQuality.reduce((sum, r) => sum + (r.qualityMetrics?.qualityScore || 0), 0) /
              withQuality.length,
          )
        : 0,
  };
}

// Export a default content loader instance
export const realContentLoader = {
  loadResources: loadRealEducationalContent,
  getStats: getContentQualityStats,
};
