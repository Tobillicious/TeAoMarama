/**
 * 75-Minute Lesson Plan Template System
 * 
 * Creates structured lesson plans with:
 * - WALT/WALA (Learning Intentions)
 * - Success Criteria/Exit Tickets
 * - Do Now activities
 * - Nested resources (activities, handouts, games, slides)
 * - Multiple variations for different classes
 */;
export interface LearningIntention {;,
type: 'WALT' | 'WALA'; // We Are Learning To / We Are Learning About;,
statement: string;,
success_criteria: string[];,
exit_ticket: string; // Quick assessment at lesson end
};
export interface DoNowActivity {;,
id: string;,
title: string;,
description: string;,
timeMinutes: number;,
materials: string[];,
instructions: string; // What teacher displays on whiteboard;,
purpose: 'review' | 'preview' | 'mindset' | 'skill_practice';
};
export interface LessonSegment {;,
id: string;,
name: string;,
timeMinutes: number;,
purpose: string;,
teacherActions: string[];,
studentActions: string[];,
resources: string[];
  differentiation?: string;
  culturalConnections?: string;
};
export interface LessonResource {;,
id: string;,
type: 'activity' | 'handout' | 'game' | 'slides' | 'external_link' | 'teaching_cards';,
title: string;,
description: string;
  fileLocation?: string;
  externalUrl?: string;,
materials: string[];,
timeRequired: number;,
instructions: string;
  adaptations?: string[];
};
export interface ExitTicket {;,
question: string;,
responseFormat: 'written' | 'verbal' | 'gesture' | 'drawing' | 'multiple_choice';,
purpose: 'understanding_check' | 'reflection' | 'next_steps' | 'feedback';,
expectedResponses: string[];
};
export interface ReflectiveExercise {;,
id: string;,
type: 'individual' | 'pair' | 'group';,
prompt: string;,
timeMinutes: number;,
shareOut: boolean;,
connectionToLearning: string;
};
export interface WhatAGoodOneLooksLike {;,
context: string; // When to use this example;,
exemplar: string;,
notThisButThis: Array<{ not_this: string; but_this: string; because: string }>;,
scaffoldingSteps: string[];
};
export interface LessonPlan {
  // Meta Information;,
id: string;,
title: string;,
unit_id: string;,
lesson_number: number;,
duration_minutes: 75;,
year_level: number[];,
subject: string;
  
  // Learning Design;,
learning_intention: LearningIntention;,
do_now: DoNowActivity;,
lesson_segments: LessonSegment[];,
exit_ticket: ExitTicket;
  reflective_exercise?: ReflectiveExercise;
  
  // Resources;,
resources: LessonResource[];,
materials_needed: string[];,
technology_required: string[];
  
  // Assessment;,
formative_assessment: string[];,
success_indicators: string[];,
what_good_looks_like: WhatAGoodOneLooksLike[];
  
  // Differentiation;,
support_strategies: string[];,
extension_activities: string[];,
multiple_means: {;,
representation: string[];,
engagement: string[];,
action_expression: string[];
  };
  
  // Cultural Integration;,
cultural_perspectives: string[];
  te_reo_integration?: string;
  local_context?: string;
  
  // Practical Information;,
preparation_notes: string[];
  safety_considerations?: string[];,
backup_activities: string[];
  
  // Metadata;,
created_by: string;,
created_date: string;,
last_modified: string;,
version: string;,
curriculum_alignment: string[];,
variations: LessonVariation[];
};
export interface LessonVariation {;,
id: string;,
variation_name: string; // e.g., "Advanced Learners", "Support Needed", "Mixed Ability";,
target_audience: string;
  
  // What changes in this variation;
modified_learning_intention?: LearningIntention;
  modified_segments?: Partial<LessonSegment>[];
  additional_resources?: LessonResource[];
  modified_assessment?: string[];
  
  // Specific adaptations;,
adaptations: {;,
content: string[];,
process: string[];,
product: string[];,
environment: string[];
  };
};
export class LessonPlanBuilder {;
private lesson: Partial<LessonPlan>;
  ;
constructor() {;
this.lesson = {;,
id: `lesson_${Date.now()}`,;,
duration_minutes: 75,;,
created_date: new Date().toISOString(),;,
version: '1.0',;,
lesson_segments: [],;,
resources: [],;,
variations: [],;,
what_good_looks_like: [],;,
multiple_means: {;,
representation: [],;,
engagement: [],;,
action_expression: []
      }
    };
  };
setBasicInfo(;,
title: string,;,
unit_id: string,;,
lesson_number: number,;,
year_level: number[],;,
subject: string
  ): LessonPlanBuilder {;
this.lesson.title = title;
    this.lesson.unit_id = unit_id;
    this.lesson.lesson_number = lesson_number;
    this.lesson.year_level = year_level;
    this.lesson.subject = subject;
    return this;
  };
setLearningIntention(;,
type: 'WALT' | 'WALA',;,
statement: string,;,
success_criteria: string[],;,
exit_ticket: string
  ): LessonPlanBuilder {;
this.lesson.learning_intention = {;
type,;
statement,;
success_criteria,;
exit_ticket
    };
    return this;
  };
setDoNow(activity: DoNowActivity): LessonPlanBuilder {;
this.lesson.do_now = activity;
    return this;
  };
addSegment(segment: LessonSegment): LessonPlanBuilder {;
if (!this.lesson.lesson_segments) this.lesson.lesson_segments = [];
    this.lesson.lesson_segments.push(segment);
    return this;
  };
addResource(resource: LessonResource): LessonPlanBuilder {;
if (!this.lesson.resources) this.lesson.resources = [];
    this.lesson.resources.push(resource);
    return this;
  };
setExitTicket(question: string, format: ExitTicket['responseFormat']): LessonPlanBuilder {;
this.lesson.exit_ticket = {;
question,;,
responseFormat: format,;,
purpose: 'understanding_check',;,
expectedResponses: []
    };
    return this;
  };
addVariation(variation: LessonVariation): LessonPlanBuilder {;
if (!this.lesson.variations) this.lesson.variations = [];
    this.lesson.variations.push(variation);
    return this;
  };
addWhatGoodLooksLike(example: WhatAGoodOneLooksLike): LessonPlanBuilder {;
if (!this.lesson.what_good_looks_like) this.lesson.what_good_looks_like = [];
    this.lesson.what_good_looks_like.push(example);
    return this;
  };
setCulturalIntegration(;,
perspectives: string[],;
te_reo?: string,;
local_context?: string
  ): LessonPlanBuilder {;
this.lesson.cultural_perspectives = perspectives;
    this.lesson.te_reo_integration = te_reo;
    this.lesson.local_context = local_context;
    return this;
  };
validate(): { isValid: boolean; errors: string[] } {;
const errors: string[] = [];
    
    // Basic validation;
if (!this.lesson.title) errors.push('Title is required');
    if (!this.lesson.learning_intention) errors.push('Learning intention (WALT/WALA) is required');
    if (!this.lesson.do_now) errors.push('Do Now activity is required');
    if (!this.lesson.exit_ticket) errors.push('Exit ticket is required');
    
    // Time validation;
const totalTime = (this.lesson.lesson_segments || []).reduce(_(sum,  _segment) => sum + segment.timeMinutes, 0);
    const doNowTime = this.lesson.do_now?.timeMinutes || 0;
    if (totalTime + doNowTime > 75) {;
errors.push(`Total lesson time (${totalTime + doNowTime} minutes) exceeds 75 minutes`);
    }
    
    // Success criteria validation;
if (this.lesson.learning_intention && (!this.lesson.learning_intention.success_criteria || this.lesson.learning_intention.success_criteria.length === 0)) {;
errors.push('Success criteria are required');
    };
return {;,
isValid: errors.length === 0,;
errors
    };
  };
build(): LessonPlan {;
const validation = this.validate();
    if (!validation.isValid) {;
throw new Error(`Lesson plan validation failed: ${validation.errors.join(', ')}`);
    };
return this.lesson as LessonPlan;
  }
}

// Factory functions for common lesson types;
export function createMathematicsLesson(_;, 
__title: string,  _;, 
__unit_id: string,  _;, 
__lesson_number: number,  _;, 
__year_level: number[],  _;, 
__concept: string
): LessonPlanBuilder {;
const builder = new LessonPlanBuilder()
    .setBasicInfo(title, unit_id, lesson_number, year_level, 'Mathematics')
    .setLearningIntention(
      'WALT',
      `We are learning to understand and apply ${concept}`,
      [
        `I can explain what ${concept} means`,
        `I can use ${concept} to solve problems`,
        `I can connect ${concept} to real-world situations`
      ],
      `Show me one way you used ${concept} today`
    );

  // Standard mathematics Do Now;
builder.setDoNow({;,
id: `do_now_${Date.now()}`,;,
title: 'Mathematical Warm-up',;,
description: 'Review previous learning and activate prior knowledge',;,
timeMinutes: 5,;,
materials: ['Whiteboard display', 'Student notebooks'],;,
instructions: `Display on board: "In your notebook, solve these 3 problems using any strategy that works for you..."`,;,
purpose: 'review'
  });

  // Add rich mathematical task as main activity;
builder.addResource({;,
id: `math_task_${Date.now()}`,;,
type: 'activity',;,
title: `${concept} Investigation`,;,
description: 'Rich mathematical task with multiple entry points and solution pathways',;,
timeRequired: 30,;,
materials: ['Problem sheets', 'Manipulatives', 'Chart paper', 'Markers'],;,
instructions: 'Students work in pairs to explore the problem, try different approaches, and prepare to share their thinking',;,
adaptations: [
      'Provide concrete materials for visual learners',
      'Offer simplified number ranges for support',
      'Include extension questions for advanced learners'
    ]
  });

  // Add "What a good one looks like" example;
builder.addWhatGoodLooksLike({;,
context: `When solving ${concept} problems`,;,
exemplar: 'Clear mathematical reasoning with multiple representations',;,
notThisButThis: [
      {;,
not_this: 'Just showing the final answer',;,
but_this: 'Showing your thinking step by step',;,
because: 'Others can learn from your strategy'
      },
      {;,
not_this: 'Using only one method',;,
but_this: 'Trying different approaches',;,
because: 'Multiple methods deepen understanding'
      }
    ],;,
scaffoldingSteps: [
      'Start with what you know',
      'Draw or model the problem',
      'Try a strategy',
      'Check if it makes sense',
      'Explain your thinking'
    ]
  });
;
return builder;
};
export function createSocialStudiesLesson(_;, 
__title: string,  _;, 
__unit_id: string,  _;, 
__lesson_number: number,  _;, 
__year_level: number[],  _;, 
__inquiry_focus: string
): LessonPlanBuilder {;
const builder = new LessonPlanBuilder()
    .setBasicInfo(title, unit_id, lesson_number, year_level, 'Social Studies')
    .setLearningIntention(
      'WALA',
      `We are learning about ${inquiry_focus} through multiple perspectives`,
      [
        `I can identify different perspectives on ${inquiry_focus}`,
        `I can explain why people might have different views`,
        `I can use evidence to support my thinking`
      ],
      `What's one new perspective you discovered today?`
    );

  // Social studies Do Now with current events connection;
builder.setDoNow({;,
id: `do_now_${Date.now()}`,;,
title: 'Perspective Warm-up',;,
description: 'Activate thinking about multiple perspectives',;,
timeMinutes: 7,;,
materials: ['Image/headline on board', 'Think-Pair-Share setup'],;,
instructions: `Display image/headline related to ${inquiry_focus}. Think: What different groups of people might view this differently? Why?`,;,
purpose: 'mindset'
  });

  // Add source analysis activity;
builder.addResource({;,
id: `source_analysis_${Date.now()}`,;,
type: 'activity',;,
title: 'Multiple Perspective Source Analysis',;,
description: 'Students examine different sources representing various viewpoints',;,
timeRequired: 25,;,
materials: ['Source packets', 'Analysis framework', 'Perspective recording sheet'],;,
instructions: 'Groups rotate through different sources, recording perspectives and evidence using the analysis framework',;,
adaptations: [
      'Provide graphic organizers for recording',
      'Include visual sources for different learning styles',
      'Offer sentence starters for discussion'
    ]
  });

  // Cultural integration emphasis;
builder.setCulturalIntegration(
    [`Include mātauranga Māori perspectives on ${inquiry_focus}`, 'Local iwi viewpoints', 'Pacific perspectives'],
    'Key te reo terms displayed and used throughout',
    'Connect to local community examples and experiences'
  );
;
return builder;
}

// Utility function to create common lesson segments;
export function createLessonSegments(): {;,
introduction: LessonSegment;,
mainActivity: LessonSegment;,
reflection: LessonSegment;,
closure: LessonSegment;
} {;
return {;,
introduction: {;,
id: 'intro',;,
name: 'Introduction & Hook',;,
timeMinutes: 10,;,
purpose: 'Engage students and connect to learning intention',;,
teacherActions: [
        'Share learning intention and success criteria',
        'Connect to previous learning',
        'Present engaging hook or problem'
      ],;,
studentActions: [
        'Listen and ask clarifying questions',
        'Make connections to prior knowledge',
        'Engage with hook activity'
      ],;,
resources: ['Slides/board display', 'Hook materials']
    },;,
mainActivity: {;,
id: 'main',;,
name: 'Main Learning Activity',;,
timeMinutes: 40,;,
purpose: 'Core learning experience with practice and application',;,
teacherActions: [
        'Facilitate learning activity',
        'Provide feedback and support',
        'Monitor understanding through questioning'
      ],;,
studentActions: [
        'Engage actively with learning task',
        'Collaborate and discuss with peers',
        'Apply new learning in context'
      ],;,
resources: ['Activity materials', 'Support resources', 'Extension tasks']
    },;,
reflection: {;,
id: 'reflection',;,
name: 'Reflection & Sharing',;,
timeMinutes: 15,;,
purpose: 'Process learning and make connections',;,
teacherActions: [
        'Facilitate reflection discussion',
        'Highlight key learning points',
        'Connect to success criteria'
      ],;,
studentActions: [
        'Reflect on their learning',
        'Share insights with others',
        'Ask questions about next steps'
      ],;,
resources: ['Reflection prompts', 'Sharing protocols']
    },;,
closure: {;,
id: 'closure',;,
name: 'Closure & Exit Ticket',;,
timeMinutes: 5,;,
purpose: 'Consolidate learning and check understanding',;,
teacherActions: [
        'Summarize key learning',
        'Preview next lesson',
        'Administer exit ticket'
      ],;,
studentActions: [
        'Complete exit ticket',
        'Pack up materials',
        'Prepare for transition'
      ],;,
resources: ['Exit ticket', 'Next lesson preview']
    }
  };
}