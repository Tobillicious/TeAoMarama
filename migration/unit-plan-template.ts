/**
 * Unit Plan Template System
 * 
 * Creates structured unit plans with explicit curriculum integration,
 * minimum 12 lessons for full units (5-6 for mini units),
 * formative and summative assessments, and Research Inquiry Projects.
 */

export interface CurriculumJustification {
  primaryStandards: string[]; // Curriculum standard IDs
  secondaryStandards: string[];
  explicitDescription: string; // Why this unit addresses these standards
  learningProgressions: string[]; // How learning builds through the unit
  crossCurricularConnections: string[];
  culturalConnections?: string;
}

export interface LessonReference {
  id: string;
  title: string;
  sequenceNumber: number;
  durationMinutes: 75;
  learningIntention: string;
  successCriteria: string[];
  variations: LessonVariation[]; // Different versions for different classes
}

export interface LessonVariation {
  id: string;
  variationName: string; // e.g., "Advanced", "Support", "Mixed Ability"
  targetAudience: string;
  adaptations: string[];
  additionalResources: string[];
}

export interface Assessment {
  id: string;
  type: 'formative' | 'summative';
  title: string;
  description: string;
  assessmentMethod: string;
  alignedStandards: string[];
  rubric?: string;
  exemplars?: string[];
  scaffoldingSupport?: string[];
}

export interface ResearchInquiryProject {
  id: string;
  title: string;
  description: string;
  inquiryQuestion: string;
  scaffoldingPhases: InquiryPhase[];
  assessmentCriteria: string[];
  exemplars: string[];
  supportResources: string[];
  culturalConsiderations?: string;
}

export interface InquiryPhase {
  phase: string; // e.g., "Questioning", "Gathering", "Processing", "Sharing"
  description: string;
  activities: string[];
  supportTools: string[];
  timeAllocation: string;
}

export interface RichText {
  id: string;
  title: string;
  textType: 'graph' | 'table' | 'statistics' | 'infographic' | 'primary_source' | 'multimodal';
  content: string;
  useCases: string[]; // Multiple ways to use this text
  scaffoldingQuestions: string[];
  extensionActivities: string[];
  culturalContext?: string;
}

export interface UnitPlan {
  // Meta Information
  id: string;
  title: string;
  subject: string;
  yearLevel: number[];
  duration: string; // e.g., "6-8 weeks"
  unitType: 'full' | 'mini'; // full = 12+ lessons, mini = 5-6 lessons
  
  // Curriculum Integration (EXPLICIT)
  curriculumJustification: CurriculumJustification;
  
  // Unit Overview
  bigIdea: string;
  essentialQuestions: string[];
  enduring: string; // What students will remember beyond the unit
  
  // Learning Design
  lessons: LessonReference[];
  assessments: Assessment[];
  researchInquiryProject?: ResearchInquiryProject;
  richTexts: RichText[];
  
  // Pedagogical Content Knowledge (PCK)
  commonMisconceptions: string[];
  scaffoldingStrategies: string[];
  differentiationApproaches: string[];
  prerequisiteKnowledge: string[];
  extensionOpportunities: string[];
  
  // Cultural Integration
  culturalPerspectives: string[];
  localConnections: string[];
  maoriWorldview?: string;
  
  // Resources
  keyResources: string[];
  additionalMaterials: string[];
  technologyRequirements: string[];
  
  // Assessment Overview
  assessmentOverview: string;
  progressionMapping: string; // How students progress through learning
  
  // Metadata
  createdBy: string;
  createdDate: string;
  lastModified: string;
  version: string;
  culturalReviewStatus: 'pending' | 'approved' | 'needs_review';
}

export class UnitPlanBuilder {
  private plan: Partial<UnitPlan>;
  
  constructor() {
    this.plan = {
      id: `unit_${Date.now()}`,
      createdDate: new Date().toISOString(),
      version: '1.0',
      culturalReviewStatus: 'pending',
      lessons: [],
      assessments: [],
      richTexts: [],
      culturalPerspectives: [],
      localConnections: []
    };
  }

  setBasicInfo(title: string, subject: string, yearLevel: number[], unitType: 'full' | 'mini'): UnitPlanBuilder {
    this.plan.title = title;
    this.plan.subject = subject;
    this.plan.yearLevel = yearLevel;
    this.plan.unitType = unitType;
    this.plan.duration = unitType === 'full' ? '6-8 weeks' : '3-4 weeks';
    return this;
  }

  setCurriculumJustification(justification: CurriculumJustification): UnitPlanBuilder {
    this.plan.curriculumJustification = justification;
    return this;
  }

  setLearningDesign(bigIdea: string, essentialQuestions: string[], enduring: string): UnitPlanBuilder {
    this.plan.bigIdea = bigIdea;
    this.plan.essentialQuestions = essentialQuestions;
    this.plan.enduring = enduring;
    return this;
  }

  addLesson(lesson: LessonReference): UnitPlanBuilder {
    if (!this.plan.lessons) this.plan.lessons = [];
    this.plan.lessons.push(lesson);
    return this;
  }

  addAssessment(assessment: Assessment): UnitPlanBuilder {
    if (!this.plan.assessments) this.plan.assessments = [];
    this.plan.assessments.push(assessment);
    return this;
  }

  setResearchInquiry(project: ResearchInquiryProject): UnitPlanBuilder {
    this.plan.researchInquiryProject = project;
    return this;
  }

  addRichText(richText: RichText): UnitPlanBuilder {
    if (!this.plan.richTexts) this.plan.richTexts = [];
    this.plan.richTexts.push(richText);
    return this;
  }

  setPedagogicalKnowledge(
    misconceptions: string[],
    scaffolding: string[],
    differentiation: string[],
    prerequisites: string[]
  ): UnitPlanBuilder {
    this.plan.commonMisconceptions = misconceptions;
    this.plan.scaffoldingStrategies = scaffolding;
    this.plan.differentiationApproaches = differentiation;
    this.plan.prerequisiteKnowledge = prerequisites;
    return this;
  }

  setCulturalIntegration(
    perspectives: string[],
    localConnections: string[],
    maoriWorldview?: string
  ): UnitPlanBuilder {
    this.plan.culturalPerspectives = perspectives;
    this.plan.localConnections = localConnections;
    this.plan.maoriWorldview = maoriWorldview;
    return this;
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Basic validation
    if (!this.plan.title) errors.push('Title is required');
    if (!this.plan.subject) errors.push('Subject is required');
    if (!this.plan.yearLevel || this.plan.yearLevel.length === 0) errors.push('Year level is required');
    if (!this.plan.curriculumJustification) errors.push('Curriculum justification is required');
    
    // Lesson count validation
    const lessonCount = this.plan.lessons?.length || 0;
    if (this.plan.unitType === 'full' && lessonCount < 12) {
      errors.push('Full units require minimum 12 lessons');
    }
    if (this.plan.unitType === 'mini' && lessonCount < 5) {
      errors.push('Mini units require minimum 5 lessons');
    }
    
    // Assessment validation
    const hasFormative = this.plan.assessments?.some(a => a.type === 'formative');
    const hasSummative = this.plan.assessments?.some(a => a.type === 'summative');
    if (!hasFormative) errors.push('At least one formative assessment required');
    if (!hasSummative) errors.push('At least one summative assessment required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  build(): UnitPlan {
    const validation = this.validate();
    if (!validation.isValid) {
      throw new Error(`Unit plan validation failed: ${validation.errors.join(', ')}`);
    }
    
    return this.plan as UnitPlan;
  }
}

// Example factory functions for common unit types
export function createMathematicsUnit(
  title: string,
  yearLevel: number[],
  strand: string,
  curriculumStandards: string[]
): UnitPlanBuilder {
  const builder = new UnitPlanBuilder()
    .setBasicInfo(title, 'Mathematics', yearLevel, 'full')
    .setCurriculumJustification({
      primaryStandards: curriculumStandards,
      secondaryStandards: [],
      explicitDescription: `This unit directly addresses ${strand} learning by building understanding through multiple representations and real-world contexts.`,
      learningProgressions: [
        'Students build conceptual understanding',
        'Apply strategies in various contexts', 
        'Connect to other mathematical concepts',
        'Solve complex problems independently'
      ],
      crossCurricularConnections: ['Science (data analysis)', 'Social Studies (statistics)']
    });

  // Add rich mathematical texts with multiple uses
  builder.addRichText({
    id: `rich_text_${Date.now()}`,
    title: 'Population Growth Statistics NZ',
    textType: 'statistics',
    content: 'Statistical data about NZ population growth with graphs and tables',
    useCases: [
      'Fraction and percentage calculations',
      'Graph interpretation and creation',
      'Rate of change analysis',
      'Cultural demographic discussions'
    ],
    scaffoldingQuestions: [
      'What patterns do you notice in the data?',
      'How could we represent this information differently?',
      'What questions does this data raise?'
    ],
    extensionActivities: [
      'Create predictions for future growth',
      'Compare with other countries',
      'Investigate factors affecting growth'
    ],
    culturalContext: 'Includes Māori population statistics and iwi distributions'
  });

  return builder;
}

export function createSocialStudiesUnit(
  title: string,
  yearLevel: number[],
  inquiryFocus: string,
  curriculumStandards: string[]
): UnitPlanBuilder {
  const builder = new UnitPlanBuilder()
    .setBasicInfo(title, 'Social Studies', yearLevel, 'full')
    .setCurriculumJustification({
      primaryStandards: curriculumStandards,
      secondaryStandards: [],
      explicitDescription: `This inquiry-based unit develops ${inquiryFocus} through critical thinking and multiple perspective analysis.`,
      learningProgressions: [
        'Develop inquiry questions',
        'Gather and evaluate sources',
        'Analyze multiple perspectives',
        'Draw evidence-based conclusions',
        'Take informed action'
      ],
      crossCurricularConnections: ['English (critical literacy)', 'Mathematics (data analysis)'],
      culturalConnections: 'Integrates mātauranga Māori and diverse cultural perspectives throughout'
    });

  // Add research inquiry project
  builder.setResearchInquiry({
    id: `inquiry_${Date.now()}`,
    title: `${inquiryFocus} Investigation`,
    description: 'Student-driven inquiry project with scaffolded support',
    inquiryQuestion: `How does ${inquiryFocus} impact our community?`,
    scaffoldingPhases: [
      {
        phase: 'Questioning',
        description: 'Develop focused inquiry questions',
        activities: ['Question brainstorming', 'Question refinement workshop'],
        supportTools: ['Question stems chart', 'Inquiry planning template'],
        timeAllocation: '2 lessons'
      },
      {
        phase: 'Gathering',
        description: 'Collect relevant evidence',
        activities: ['Source evaluation', 'Interview planning', 'Data collection'],
        supportTools: ['Source evaluation checklist', 'Interview question guide'],
        timeAllocation: '4 lessons'
      },
      {
        phase: 'Processing',
        description: 'Analyze and synthesize findings',
        activities: ['Evidence sorting', 'Pattern identification', 'Conclusion drawing'],
        supportTools: ['Analysis frameworks', 'Synthesis templates'],
        timeAllocation: '3 lessons'
      },
      {
        phase: 'Sharing',
        description: 'Present findings and take action',
        activities: ['Presentation creation', 'Peer feedback', 'Action planning'],
        supportTools: ['Presentation rubrics', 'Action plan templates'],
        timeAllocation: '3 lessons'
      }
    ],
    assessmentCriteria: [
      'Quality of inquiry questions',
      'Use of relevant evidence',
      'Analysis of multiple perspectives',
      'Clarity of conclusions',
      'Proposed actions'
    ],
    exemplars: [
      'Example A: Community housing investigation',
      'Example B: Environmental impact study',
      'Example C: Cultural preservation project'
    ],
    supportResources: [
      'Inquiry scaffold documents',
      'Research method guides',
      'Presentation tools and templates'
    ],
    culturalConsiderations: 'Ensure all perspectives include mātauranga Māori and local iwi viewpoints'
  });

  return builder;
}