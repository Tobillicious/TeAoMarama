// Quality Content Filter - Separates ready content from skeletons

export interface QualityMetrics {
  isReady: boolean;
  qualityScore: number;
  completeness: number;
  hasRealContent: boolean;
  authenticityLevel: 'skeleton' | 'template' | 'enhanced' | 'complete';
}

export function assessContentQuality(resource: any): QualityMetrics {
  let qualityScore = 0;
  let completeness = 0;
  
  // Check for actual content vs templates
  const hasSubstantiveContent = resource.content && 
    resource.content.length > 500 && 
    !isTemplateContent(resource.content);
  
  // Check for specific local references (not generic)
  const hasLocalContext = hasSpecificPlaceReferences(resource);
  
  // Check for authentic cultural integration
  const hasCulturalDepth = hasAuthenticCulturalContent(resource);
  
  // Check for complete lesson structure
  const hasCompleteStructure = hasFullLessonStructure(resource);
  
  // Calculate scores
  if (hasSubstantiveContent) qualityScore += 30;
  if (hasLocalContext) qualityScore += 25;
  if (hasCulturalDepth) qualityScore += 25;
  if (hasCompleteStructure) qualityScore += 20;
  
  // Calculate completeness
  completeness = Math.min(100, qualityScore + 10);
  
  // Determine authenticity level
  let authenticityLevel: 'skeleton' | 'template' | 'enhanced' | 'complete' = 'skeleton';
  if (qualityScore >= 80) authenticityLevel = 'complete';
  else if (qualityScore >= 60) authenticityLevel = 'enhanced';
  else if (qualityScore >= 30) authenticityLevel = 'template';
  
  // Ready if score is above 70
  const isReady = qualityScore >= 70;
  
  return {
    isReady,
    qualityScore,
    completeness,
    hasRealContent: hasSubstantiveContent,
    authenticityLevel
  };
}

function isTemplateContent(content: string): boolean {
  const templateIndicators = [
    'Generic problem-solving templates',
    'Traditional knowledge workshop',
    'Environmental investigation',
    'Cultural mapping',
    'Community presentation',
    '[Insert specific examples]',
    'Placeholder content'
  ];
  
  const lowerContent = content.toLowerCase();
  return templateIndicators.some(indicator => 
    lowerContent.includes(indicator.toLowerCase())
  );
}

function hasSpecificPlaceReferences(resource: any): boolean {
  const specificPlaces = [
    'Mangakōtukutuku',
    'Te Awa Tūpuna', 
    'specific waterway',
    'local kaumātua',
    'community elder',
    '[specific school/area name]'
  ];
  
  const content = (resource.content + resource.description + resource.title).toLowerCase();
  return specificPlaces.some(place => content.includes(place.toLowerCase()));
}

function hasAuthenticCulturalContent(resource: any): boolean {
  if (resource.culturalElements < 3) return false;
  
  const authenticIndicators = [
    'karakia',
    'whakapapa',
    'kaumātua',
    'tikanga',
    'te reo māori',
    'traditional ecological knowledge',
    'mātauranga māori'
  ];
  
  const content = (resource.content + resource.description).toLowerCase();
  const authCount = authenticIndicators.filter(indicator => 
    content.includes(indicator)
  ).length;
  
  return authCount >= 3;
}

function hasFullLessonStructure(resource: any): boolean {
  if (!resource.content) return false;
  
  const requiredElements = [
    'learning objectives',
    'materials',
    'activities',
    'assessment',
    'duration'
  ];
  
  const lowerContent = resource.content.toLowerCase();
  const presentElements = requiredElements.filter(element =>
    lowerContent.includes(element)
  ).length;
  
  return presentElements >= 4;
}

// Filter resources by quality
export function filterByQuality(resources: any[], minQuality: number = 70): any[] {
  return resources
    .map(resource => ({
      ...resource,
      qualityMetrics: assessContentQuality(resource)
    }))
    .filter(resource => resource.qualityMetrics.qualityScore >= minQuality)
    .sort((a, b) => b.qualityMetrics.qualityScore - a.qualityMetrics.qualityScore);
}

// Get quality stats
export function getQualityStats(resources: any[]) {
  const metrics = resources.map(assessContentQuality);
  
  const ready = metrics.filter(m => m.isReady).length;
  const enhanced = metrics.filter(m => m.authenticityLevel === 'enhanced').length;
  const templates = metrics.filter(m => m.authenticityLevel === 'template').length;
  const skeletons = metrics.filter(m => m.authenticityLevel === 'skeleton').length;
  
  return {
    total: resources.length,
    ready,
    enhanced, 
    templates,
    skeletons,
    percentReady: Math.round((ready / resources.length) * 100)
  };
}