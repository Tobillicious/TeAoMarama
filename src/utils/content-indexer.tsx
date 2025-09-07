import { Activity, Award, BookOpen, Brain, Calculator, FileText, Globe, Users } from 'lucide-react';

export interface ContentItem {
  id: string;
  title: string;
  type:
    | 'resource'
    | 'template'
    | 'lesson'
    | 'worksheet'
    | 'unit'
    | 'guide'
    | 'activity'
    | 'assessment'
    | 'handout';
  subject: string;
  yearLevel: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  category: string;
  culturalContext?: string;
  curriculumAlignment?: string;
  popularity?: number;
  lastUpdated?: string;
  featured?: boolean;
  tags?: string[];
  fileSize?: string;
  estimatedDuration?: string;
}

// Content index for all available resources
export const CONTENT_INDEX = {
  // Math Worksheets (6 files)
  mathWorksheets: [
    'fractions_decimals_percentages.md',
    'area_and_perimeter.md',
    'negative_numbers_and_absolute_value.md',
    'order_of_operations.md',
    'order_of_operations_advanced.md',
    'solving_linear_equations.md',
  ],

  // Unit Plans (3 files)
  unitPlans: ['URD-Unit2-Decolonized-History.md', 'URD-Unit4-Contemporary-Issues.md'],

  // Professional Guides (2 files)
  professionalGuides: ['LESSON_TEMPLATE_GUIDE.md', 'DESIGN_ENHANCEMENT_REPORT.md'],

  // Teacher Toolkits (1 file)
  teacherToolkits: ['MCC_Teacher_Planning_Reflection_Toolkit.md'],

  // Template Collection (6 files)
  templates: [
    'Cultural_Safety_Checklist.md',
    'Lesson_Plan_Template.md',
    'Reflective_Practice_Log.md',
    'Student_Profile_Snapshot.md',
    'Unit_Plan_Template.md',
    'Weekly_Planner.md',
    'Whanau_Engagement_Log.md',
  ],

  // DeepSeek Generated Content (5 files)
  deepSeekContent: [
    'activity_Social Studies_Y10_economic_systems_in_pre-colonial_aotearoa.md',
    'assessment_Mathematics_Y9_statistics_using_new_zealand_census_data.md',
    'handout_English_Y7_narrative_structure_in_māori_pūrākau.md',
    'handout_Mathematics_Y8_ratios_and_proportions_in_traditional_māori_architecture.md',
    'lesson_Science_Y9_native_plant_adaptation_in_aotearoa_ecosystems.md',
  ],

  // Games Collection (1 file)
  games: ['Y7-9_Maths_Games_Collection.md'],
};

// Generate content items from the index
export const generateContentFromIndex = (): ContentItem[] => {
  const content: ContentItem[] = [];

  // Math Worksheets
  CONTENT_INDEX.mathWorksheets.forEach((filename, index) => {
    const title = filename
      .replace(/_/g, ' ')
      .replace('.md', '')
      .replace(/\b\w/g, (l) => l.toUpperCase());
    content.push({
      id: `math-worksheet-${index}`,
      title: title,
      type: 'worksheet',
      category: 'Mathematics',
      subject: 'Mathematics',
      yearLevel: getYearLevelFromFilename(filename),
      description: `Comprehensive mathematics worksheet covering ${title.toLowerCase()} with practice problems and real-world applications.`,
      path: `/resources/te-kete-ako-clean/math_worksheets/${filename}`,
      icon: <Calculator className="w-6 h-6" />,
      culturalContext: 'Integrates Māori mathematical concepts and Aotearoa contexts',
      curriculumAlignment: 'NZ Curriculum Level 4-6',
      popularity: 85 + Math.floor(Math.random() * 15),
      lastUpdated: '2025-01-15',
      featured: index < 2,
      tags: ['mathematics', 'worksheet', 'practice', 'nz-curriculum'],
      fileSize: '2-5 MB',
      estimatedDuration: '45-60 minutes',
    });
  });

  // Unit Plans
  CONTENT_INDEX.unitPlans.forEach((filename, index) => {
    const title = filename
      .replace(/-/g, ' ')
      .replace('.md', '')
      .replace(/\b\w/g, (l) => l.toUpperCase());
    content.push({
      id: `unit-plan-${index}`,
      title: title,
      type: 'unit',
      category: 'Social Studies',
      subject: 'Social Studies',
      yearLevel: 'Years 9-13',
      description: `Comprehensive unit plan with ${title.toLowerCase()} focusing on Māori perspectives and cultural authenticity.`,
      path: `/resources/te-kete-ako-clean/dist/units/urds/${filename}`,
      icon: <Globe className="w-6 h-6" />,
      culturalContext: 'Authentic Māori perspectives and historical agency',
      curriculumAlignment: 'NZ Curriculum Level 6-8',
      popularity: 90 + Math.floor(Math.random() * 10),
      lastUpdated: '2025-01-20',
      featured: true,
      tags: ['social-studies', 'unit-plan', 'māori-perspectives', 'history'],
      fileSize: '5-10 MB',
      estimatedDuration: '4-6 weeks',
    });
  });

  // Professional Guides
  CONTENT_INDEX.professionalGuides.forEach((filename, index) => {
    const title = filename
      .replace(/_/g, ' ')
      .replace('.md', '')
      .replace(/\b\w/g, (l) => l.toUpperCase());
    content.push({
      id: `guide-${index}`,
      title: title,
      type: 'guide',
      category: 'Teaching Resources',
      subject: 'Teaching Resources',
      yearLevel: 'All Levels',
      description: `Professional guide for ${title.toLowerCase()} with cultural integration and best practices.`,
      path: `/resources/te-kete-ako-clean/dist/guided-inquiry-unit/${filename}`,
      icon: <BookOpen className="w-6 h-6" />,
      culturalContext: 'Te Ao Māori integration and cultural safety protocols',
      curriculumAlignment: 'NZ Curriculum Framework',
      popularity: 88 + Math.floor(Math.random() * 12),
      lastUpdated: '2025-01-12',
      featured: index === 0,
      tags: ['teaching-resources', 'guide', 'cultural-integration', 'best-practices'],
      fileSize: '3-7 MB',
      estimatedDuration: '2-3 hours',
    });
  });

  // Teacher Toolkits
  CONTENT_INDEX.teacherToolkits.forEach((filename, index) => {
    const title = filename
      .replace(/_/g, ' ')
      .replace('.md', '')
      .replace(/\b\w/g, (l) => l.toUpperCase());
    content.push({
      id: `toolkit-${index}`,
      title: title,
      type: 'guide',
      category: 'Teaching Resources',
      subject: 'Teaching Resources',
      yearLevel: 'All Levels',
      description: `Comprehensive toolkit for teacher planning, reflection, and professional development with cultural integration.`,
      path: `/resources/toolkits/${filename}`,
      icon: <Users className="w-6 h-6" />,
      culturalContext: 'Cultural safety in teaching practice and reflection',
      curriculumAlignment: 'Professional Teaching Standards',
      popularity: 91,
      lastUpdated: '2025-01-14',
      featured: true,
      tags: ['teacher-toolkit', 'planning', 'reflection', 'professional-development'],
      fileSize: '4-8 MB',
      estimatedDuration: '3-4 hours',
    });
  });

  // Templates
  CONTENT_INDEX.templates.forEach((filename, index) => {
    const title = filename
      .replace(/_/g, ' ')
      .replace('.md', '')
      .replace(/\b\w/g, (l) => l.toUpperCase());
    content.push({
      id: `template-${index}`,
      title: title,
      type: 'template',
      category: 'Teaching Resources',
      subject: 'Teaching Resources',
      yearLevel: 'All Levels',
      description: `Professional template for ${title.toLowerCase()} with cultural integration and best practices.`,
      path: `/resources/toolkits/templates/${filename}`,
      icon: <FileText className="w-6 h-6" />,
      culturalContext: 'Cultural safety protocols and validation frameworks',
      curriculumAlignment: 'Cultural Safety Standards',
      popularity: 85 + Math.floor(Math.random() * 15),
      lastUpdated: '2025-01-11',
      featured: index < 3,
      tags: ['template', 'teaching-resources', 'cultural-safety', 'planning'],
      fileSize: '1-3 MB',
      estimatedDuration: '30-60 minutes',
    });
  });

  // DeepSeek Generated Content
  CONTENT_INDEX.deepSeekContent.forEach((filename, index) => {
    const parts = filename.split('_');
    const type = parts[0];
    const subject = parts[1] + ' ' + parts[2];
    const yearLevel = parts[3];
    const title = parts
      .slice(4)
      .join(' ')
      .replace('.md', '')
      .replace(/\b\w/g, (l) => l.toUpperCase());

    content.push({
      id: `deepseek-${index}`,
      title: title,
      type: type as any,
      category: subject,
      subject: subject,
      yearLevel: `Year ${yearLevel}`,
      description: `AI-generated ${type} content for ${subject} focusing on Māori perspectives and cultural integration.`,
      path: `/resources/deepseek-generated/${filename}`,
      icon: getIconForType(type),
      culturalContext: 'Traditional Māori knowledge and contemporary applications',
      curriculumAlignment: 'NZ Curriculum Level 4-6',
      popularity: 80 + Math.floor(Math.random() * 20),
      lastUpdated: '2025-01-16',
      featured: index < 2,
      tags: ['ai-generated', 'māori-perspectives', 'cultural-integration', type],
      fileSize: '2-4 MB',
      estimatedDuration: '45-90 minutes',
    });
  });

  // Games Collection
  CONTENT_INDEX.games.forEach((filename, index) => {
    const title = filename
      .replace(/_/g, ' ')
      .replace('.md', '')
      .replace(/\b\w/g, (l) => l.toUpperCase());
    content.push({
      id: `game-${index}`,
      title: title,
      type: 'activity',
      category: 'Mathematics',
      subject: 'Mathematics',
      yearLevel: 'Years 7-9',
      description: `Interactive mathematics games collection designed for engaging learning with cultural contexts.`,
      path: `/resources/games/${filename}`,
      icon: <Activity className="w-6 h-6" />,
      culturalContext: 'Mathematical games with Māori cultural elements',
      curriculumAlignment: 'NZ Curriculum Level 4-5',
      popularity: 87,
      lastUpdated: '2025-01-13',
      featured: true,
      tags: ['mathematics', 'games', 'interactive', 'engagement'],
      fileSize: '3-6 MB',
      estimatedDuration: '60-90 minutes',
    });
  });

  return content;
};

// Helper function to determine year level from filename
const getYearLevelFromFilename = (filename: string): string => {
  if (filename.includes('advanced')) return 'Years 9-11';
  if (filename.includes('linear')) return 'Years 9-11';
  if (filename.includes('negative')) return 'Years 8-10';
  return 'Years 7-10';
};

// Helper function to get appropriate icon for content type
const getIconForType = (type: string): React.ReactNode => {
  switch (type) {
    case 'activity':
      return <Activity className="w-6 h-6" />;
    case 'assessment':
      return <Award className="w-6 h-6" />;
    case 'handout':
      return <FileText className="w-6 h-6" />;
    case 'lesson':
      return <BookOpen className="w-6 h-6" />;
    default:
      return <Brain className="w-6 h-6" />;
  }
};

// Load all content with comprehensive indexing
export const loadAllIndexedContent = async (): Promise<ContentItem[]> => {
  try {
    // Generate content from the comprehensive index
    const indexedContent = generateContentFromIndex();

    // Add some additional curated content
    const curatedContent: ContentItem[] = [
      {
        id: 'design-system-guide',
        title: 'Design Enhancement Report',
        type: 'guide',
        category: 'Design System',
        subject: 'Design System',
        yearLevel: 'All Levels',
        description:
          'Professional design system documentation with color palette, typography, and cultural integration guidelines.',
        path: '/resources/te-kete-ako-clean/dist/DESIGN_ENHANCEMENT_REPORT.md',
        icon: <Award className="w-6 h-6" />,
        culturalContext: 'Cultural design principles and Te Ao Māori aesthetics',
        curriculumAlignment: 'Professional Standards',
        popularity: 87,
        lastUpdated: '2025-01-08',
        featured: true,
        tags: ['design-system', 'cultural-design', 'professional-standards'],
        fileSize: '2-4 MB',
        estimatedDuration: '1-2 hours',
      },
    ];

    return [...indexedContent, ...curatedContent];
  } catch (error) {
    console.error('Error loading indexed content:', error);
    return [];
  }
};

// Search and filter functions
export const searchContent = (content: ContentItem[], query: string): ContentItem[] => {
  if (!query.trim()) return content;

  const searchTerm = query.toLowerCase();
  return content.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.subject.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      (item.culturalContext && item.culturalContext.toLowerCase().includes(searchTerm)) ||
      (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(searchTerm))),
  );
};

export const filterContentByCategory = (
  content: ContentItem[],
  category: string,
): ContentItem[] => {
  if (category === 'all') return content;
  return content.filter((item) => item.category === category);
};

export const filterContentBySubject = (content: ContentItem[], subject: string): ContentItem[] => {
  if (subject === 'all') return content;
  return content.filter((item) => item.subject === subject);
};

export const filterContentByType = (content: ContentItem[], type: string): ContentItem[] => {
  if (type === 'all') return content;
  return content.filter((item) => item.type === type);
};

export const sortContent = (
  content: ContentItem[],
  sortBy: 'popularity' | 'recent' | 'alphabetical' | 'featured',
): ContentItem[] => {
  const sorted = [...content];

  switch (sortBy) {
    case 'popularity':
      return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    case 'recent':
      return sorted.sort(
        (a, b) => new Date(b.lastUpdated || '').getTime() - new Date(a.lastUpdated || '').getTime(),
      );
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'featured':
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    default:
      return sorted;
  }
};
