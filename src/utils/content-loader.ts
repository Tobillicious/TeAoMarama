import { Calculator, BookOpen, Globe, FileText, Award, Users } from 'lucide-react';

export interface ContentItem {
  id: string;
  title: string;
  type: 'resource' | 'template' | 'lesson' | 'worksheet' | 'unit' | 'guide';
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
}

export const loadTeKeteAkoContent = async (): Promise<ContentItem[]> => {
  const content: ContentItem[] = [];

  // Math Worksheets
  content.push({
    id: 'math-fractions-decimals',
    title: 'Fractions, Decimals, and Percentages',
    type: 'worksheet',
    category: 'Mathematics',
    subject: 'Mathematics',
    yearLevel: 'Years 7-10',
    description:
      'Comprehensive worksheet covering conversions between fractions, decimals, and percentages with practice problems and answer key.',
    path: '/resources/te-kete-ako-clean/math_worksheets/fractions_decimals_percentages.md',
    icon: <Calculator className="w-6 h-6" />,
    culturalContext: 'Integrates Māori mathematical concepts and real-world applications',
    curriculumAlignment: 'NZ Curriculum Level 4-5',
    popularity: 95,
    lastUpdated: '2025-01-15',
    featured: true,
  });

  content.push({
    id: 'math-area-perimeter',
    title: 'Area and Perimeter Calculations',
    type: 'worksheet',
    category: 'Mathematics',
    subject: 'Mathematics',
    yearLevel: 'Years 7-9',
    description:
      'Interactive worksheet exploring area and perimeter calculations with real-world applications.',
    path: '/resources/te-kete-ako-clean/math_worksheets/area_and_perimeter.md',
    icon: <Calculator className="w-6 h-6" />,
    culturalContext: 'Connects to traditional Māori architecture and land measurement',
    curriculumAlignment: 'NZ Curriculum Level 4',
    popularity: 88,
    lastUpdated: '2025-01-10',
  });

  content.push({
    id: 'math-negative-numbers',
    title: 'Negative Numbers and Absolute Value',
    type: 'worksheet',
    category: 'Mathematics',
    subject: 'Mathematics',
    yearLevel: 'Years 8-10',
    description:
      'Comprehensive worksheet on negative numbers, absolute value, and their applications in real-world contexts.',
    path: '/resources/te-kete-ako-clean/math_worksheets/negative_numbers_and_absolute_value.md',
    icon: <Calculator className="w-6 h-6" />,
    culturalContext: 'Mathematical concepts in Māori navigation and astronomy',
    curriculumAlignment: 'NZ Curriculum Level 4-5',
    popularity: 82,
    lastUpdated: '2025-01-08',
  });

  content.push({
    id: 'math-order-operations',
    title: 'Order of Operations',
    type: 'worksheet',
    category: 'Mathematics',
    subject: 'Mathematics',
    yearLevel: 'Years 7-9',
    description:
      'Step-by-step guide to order of operations with practice problems and real-world applications.',
    path: '/resources/te-kete-ako-clean/math_worksheets/order_of_operations.md',
    icon: <Calculator className="w-6 h-6" />,
    culturalContext: 'Mathematical thinking in traditional Māori problem-solving',
    curriculumAlignment: 'NZ Curriculum Level 4',
    popularity: 85,
    lastUpdated: '2025-01-05',
  });

  content.push({
    id: 'math-linear-equations',
    title: 'Solving Linear Equations',
    type: 'worksheet',
    category: 'Mathematics',
    subject: 'Mathematics',
    yearLevel: 'Years 9-11',
    description:
      'Comprehensive guide to solving linear equations with step-by-step examples and practice problems.',
    path: '/resources/te-kete-ako-clean/math_worksheets/solving_linear_equations.md',
    icon: <Calculator className="w-6 h-6" />,
    culturalContext: 'Algebraic thinking in Māori patterns and designs',
    curriculumAlignment: 'NZ Curriculum Level 5-6',
    popularity: 90,
    lastUpdated: '2025-01-12',
  });

  // Unit Plans
  content.push({
    id: 'urds-decolonized-history',
    title: 'Decolonized Aotearoa History',
    type: 'unit',
    category: 'Social Studies',
    subject: 'Social Studies',
    yearLevel: 'Years 9-13',
    description:
      'Comprehensive unit centering Māori perspectives, agency, and resistance in Aotearoa history. Challenges colonial narratives.',
    path: '/resources/te-kete-ako-clean/dist/units/urds/URD-Unit2-Decolonized-History.md',
    icon: <Globe className="w-6 h-6" />,
    culturalContext: 'Authentic Māori perspectives and historical agency',
    curriculumAlignment: 'NZ Curriculum Level 6-8',
    popularity: 98,
    lastUpdated: '2025-01-20',
    featured: true,
  });

  content.push({
    id: 'urds-contemporary-issues',
    title: 'Contemporary Issues in Aotearoa',
    type: 'unit',
    category: 'Social Studies',
    subject: 'Social Studies',
    yearLevel: 'Years 10-13',
    description:
      'Exploring current social, political, and cultural issues in Aotearoa with critical analysis frameworks.',
    path: '/resources/te-kete-ako-clean/dist/units/urds/URD-Unit4-Contemporary-Issues.md',
    icon: <Globe className="w-6 h-6" />,
    culturalContext: 'Te Ao Māori perspectives on contemporary issues',
    curriculumAlignment: 'NZ Curriculum Level 6-8',
    popularity: 92,
    lastUpdated: '2025-01-18',
  });

  // Professional Guides
  content.push({
    id: 'lesson-template-guide',
    title: 'Professional Lesson Template Guide',
    type: 'guide',
    category: 'Teaching Resources',
    subject: 'Teaching Resources',
    yearLevel: 'All Levels',
    description:
      'Comprehensive guide for creating culturally authentic, pedagogically sound lessons with Te Ao Māori integration.',
    path: '/resources/te-kete-ako-clean/dist/guided-inquiry-unit/LESSON_TEMPLATE_GUIDE.md',
    icon: <BookOpen className="w-6 h-6" />,
    culturalContext: 'Te Ao Māori integration and cultural safety protocols',
    curriculumAlignment: 'NZ Curriculum Framework',
    popularity: 94,
    lastUpdated: '2025-01-12',
  });

  content.push({
    id: 'design-enhancement-report',
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
  });

  // Teacher Toolkits
  content.push({
    id: 'teacher-planning-toolkit',
    title: 'Teacher Planning & Reflection Toolkit',
    type: 'guide',
    category: 'Teaching Resources',
    subject: 'Teaching Resources',
    yearLevel: 'All Levels',
    description:
      'Comprehensive toolkit for teacher planning, reflection, and professional development with cultural integration.',
    path: '/resources/toolkits/MCC_Teacher_Planning_Reflection_Toolkit.md',
    icon: <Users className="w-6 h-6" />,
    culturalContext: 'Cultural safety in teaching practice and reflection',
    curriculumAlignment: 'Professional Teaching Standards',
    popularity: 91,
    lastUpdated: '2025-01-14',
  });

  // Template Collection
  content.push({
    id: 'cultural-safety-checklist',
    title: 'Cultural Safety Checklist',
    type: 'template',
    category: 'Teaching Resources',
    subject: 'Teaching Resources',
    yearLevel: 'All Levels',
    description:
      'Comprehensive checklist for ensuring cultural safety in educational materials and practices.',
    path: '/resources/toolkits/templates/Cultural_Safety_Checklist.md',
    icon: <FileText className="w-6 h-6" />,
    culturalContext: 'Cultural safety protocols and validation frameworks',
    curriculumAlignment: 'Cultural Safety Standards',
    popularity: 89,
    lastUpdated: '2025-01-11',
  });

  content.push({
    id: 'lesson-plan-template',
    title: 'Professional Lesson Plan Template',
    type: 'template',
    category: 'Teaching Resources',
    subject: 'Teaching Resources',
    yearLevel: 'All Levels',
    description:
      'Professional lesson plan template with cultural integration, learning objectives, and assessment criteria.',
    path: '/resources/toolkits/templates/Lesson_Plan_Template.md',
    icon: <FileText className="w-6 h-6" />,
    culturalContext: 'Te Ao Māori integration in lesson planning',
    curriculumAlignment: 'NZ Curriculum Framework',
    popularity: 93,
    lastUpdated: '2025-01-13',
  });

  content.push({
    id: 'unit-plan-template',
    title: 'Unit Plan Template',
    type: 'template',
    category: 'Teaching Resources',
    subject: 'Teaching Resources',
    yearLevel: 'All Levels',
    description:
      'Comprehensive unit plan template with cultural context, learning progressions, and assessment strategies.',
    path: '/resources/toolkits/templates/Unit_Plan_Template.md',
    icon: <FileText className="w-6 h-6" />,
    culturalContext: 'Cultural integration in unit planning and design',
    curriculumAlignment: 'NZ Curriculum Framework',
    popularity: 88,
    lastUpdated: '2025-01-10',
  });

  return content;
};

export const loadDeepSeekContent = async (): Promise<ContentItem[]> => {
  const content: ContentItem[] = [];

  // DeepSeek Generated Content
  content.push({
    id: 'deepseek-social-studies-economic',
    title: 'Economic Systems in Pre-Colonial Aotearoa',
    type: 'activity',
    category: 'Social Studies',
    subject: 'Social Studies',
    yearLevel: 'Year 10',
    description:
      'Interactive activity exploring traditional Māori economic systems and trade networks.',
    path: '/resources/deepseek-generated/activity_Social Studies_Y10_economic_systems_in_pre-colonial_aotearoa.md',
    icon: <Globe className="w-6 h-6" />,
    culturalContext: 'Traditional Māori economic practices and trade relationships',
    curriculumAlignment: 'NZ Curriculum Level 6',
    popularity: 85,
    lastUpdated: '2025-01-16',
  });

  content.push({
    id: 'deepseek-math-statistics',
    title: 'Statistics Using New Zealand Census Data',
    type: 'assessment',
    category: 'Mathematics',
    subject: 'Mathematics',
    yearLevel: 'Year 9',
    description:
      'Assessment activity using real New Zealand census data to explore statistical concepts.',
    path: '/resources/deepseek-generated/assessment_Mathematics_Y9_statistics_using_new_zealand_census_data.md',
    icon: <Calculator className="w-6 h-6" />,
    culturalContext: 'Statistical analysis of Aotearoa demographics and communities',
    curriculumAlignment: 'NZ Curriculum Level 5',
    popularity: 87,
    lastUpdated: '2025-01-17',
  });

  content.push({
    id: 'deepseek-english-narrative',
    title: 'Narrative Structure in Māori Pūrākau',
    type: 'handout',
    category: 'English',
    subject: 'English',
    yearLevel: 'Year 7',
    description:
      'Educational handout exploring narrative structure through traditional Māori stories and legends.',
    path: '/resources/deepseek-generated/handout_English_Y7_narrative_structure_in_māori_pūrākau.md',
    icon: <BookOpen className="w-6 h-6" />,
    culturalContext: 'Traditional Māori storytelling and narrative traditions',
    curriculumAlignment: 'NZ Curriculum Level 4',
    popularity: 90,
    lastUpdated: '2025-01-15',
  });

  content.push({
    id: 'deepseek-math-architecture',
    title: 'Ratios and Proportions in Traditional Māori Architecture',
    type: 'handout',
    category: 'Mathematics',
    subject: 'Mathematics',
    yearLevel: 'Year 8',
    description:
      'Mathematical concepts explored through traditional Māori building and architectural practices.',
    path: '/resources/deepseek-generated/handout_Mathematics_Y8_ratios_and_proportions_in_traditional_māori_architecture.md',
    icon: <Calculator className="w-6 h-6" />,
    culturalContext: 'Mathematical principles in traditional Māori architecture',
    curriculumAlignment: 'NZ Curriculum Level 4-5',
    popularity: 84,
    lastUpdated: '2025-01-14',
  });

  content.push({
    id: 'deepseek-science-adaptation',
    title: 'Native Plant Adaptation in Aotearoa Ecosystems',
    type: 'lesson',
    category: 'Science',
    subject: 'Science',
    yearLevel: 'Year 9',
    description:
      'Science lesson exploring native plant adaptations and their role in Aotearoa ecosystems.',
    path: '/resources/deepseek-generated/lesson_Science_Y9_native_plant_adaptation_in_aotearoa_ecosystems.md',
    icon: <Globe className="w-6 h-6" />,
    culturalContext: 'Traditional Māori knowledge of native plants and ecosystems',
    curriculumAlignment: 'NZ Curriculum Level 5',
    popularity: 86,
    lastUpdated: '2025-01-13',
  });

  return content;
};

export const loadAllContent = async (): Promise<ContentItem[]> => {
  try {
    const [teKeteAkoContent, deepSeekContent] = await Promise.all([
      loadTeKeteAkoContent(),
      loadDeepSeekContent(),
    ]);

    return [...teKeteAkoContent, ...deepSeekContent];
  } catch (error) {
    console.error('Error loading content:', error);
    return [];
  }
};
