/**
 * Research Inquiry Project Templates and Scaffolding
 * 
 * These templates support the inquiry learning process with:
 * - Scaffolded phases (Questioning, Gathering, Processing, Sharing)
 * - Multiple inquiry types for different subjects
 * - Cultural responsiveness embedded throughout
 * - Assessment integration
 * - Community connection opportunities
 */;
export interface InquiryScaffold {;,
phase: 'questioning' | 'gathering' | 'processing' | 'sharing';,
title: string;,
description: string;,
timeAllocation: string;,
keyActivities: ScaffoldActivity[];,
supportTools: SupportTool[];,
assessmentCheckpoints: AssessmentCheckpoint[];,
culturalConsiderations: string[];
};
export interface ScaffoldActivity {;,
id: string;,
name: string;,
purpose: string;,
instructions: string;,
materials: string[];,
timeMinutes: number;,
differentiation: string[];
};
export interface SupportTool {;,
id: string;,
name: string;,
type: 'template' | 'checklist' | 'rubric' | 'exemplar' | 'guide';,
description: string;,
content: string;,
whenToUse: string;
};
export interface AssessmentCheckpoint {;,
checkpoint: string;,
criteria: string[];,
evidence: string[];,
feedback_focus: string;
};
export interface InquiryProject {;,
id: string;,
title: string;,
subject: string;,
yearLevel: number[];,
duration: string;,
inquiryType: 'place_based' | 'issue_based' | 'historical' | 'scientific' | 'mathematical' | 'cultural';
  
  // Core inquiry components;,
overarchingQuestion: string;,
subsidiaryQuestions: string[];
  
  // Scaffolded phases;,
phases: InquiryScaffold[];
  
  // Resources and support;,
supportTools: SupportTool[];,
exemplars: string[];,
communityConnections: string[];
  
  // Assessment;,
assessmentCriteria: string[];,
rubric: InquiryRubric;
  
  // Cultural integration;,
culturalPerspectives: string[];,
matauraangaMaori: string[];
  localIwiConnections?: string;
};
export interface InquiryRubric {;,
criteria: RubricCriterion[];,
levels: string[]; // ["Beginning", "Developing", "Achieving", "Exceeding"]
};
export interface RubricCriterion {;,
name: string;,
description: string;,
indicators: { [level: string]: string };
};
export class InquiryProjectBuilder {;
private project: Partial<InquiryProject>;
;
constructor() {;
this.project = {;,
id: `inquiry_${Date.now()}`,;,
phases: [],;,
supportTools: [],;,
exemplars: [],;,
communityConnections: [],;,
culturalPerspectives: [],;,
matauraangaMaori: []
    };
  };
setBasicInfo(;,
title: string,;,
subject: string,;,
yearLevel: number[],;,
inquiryType: InquiryProject['inquiryType'],;,
duration: string
  ): InquiryProjectBuilder {;
this.project.title = title;
    this.project.subject = subject;
    this.project.yearLevel = yearLevel;
    this.project.inquiryType = inquiryType;
    this.project.duration = duration;
    return this;
  };
setInquiryQuestions(overarching: string, subsidiary: string[]): InquiryProjectBuilder {;
this.project.overarchingQuestion = overarching;
    this.project.subsidiaryQuestions = subsidiary;
    return this;
  };
addPhase(phase: InquiryScaffold): InquiryProjectBuilder {;
if (!this.project.phases) this.project.phases = [];
    this.project.phases.push(phase);
    return this;
  };
addSupportTool(tool: SupportTool): InquiryProjectBuilder {;
if (!this.project.supportTools) this.project.supportTools = [];
    this.project.supportTools.push(tool);
    return this;
  };
setCulturalIntegration(;,
perspectives: string[],;,
matauranga: string[],;
iwiConnections?: string
  ): InquiryProjectBuilder {;
this.project.culturalPerspectives = perspectives;
    this.project.matauraangaMaori = matauranga;
    this.project.localIwiConnections = iwiConnections;
    return this;
  };
setAssessment(criteria: string[], rubric: InquiryRubric): InquiryProjectBuilder {;
this.project.assessmentCriteria = criteria;
    this.project.rubric = rubric;
    return this;
  };
build(): InquiryProject {;
if (!this.project.title || !this.project.overarchingQuestion) {;
throw new Error('Title and overarching question are required');
    };
return this.project as InquiryProject;
  }
}

// Pre-built inquiry scaffolds for common phases;
export const STANDARD_INQUIRY_PHASES: InquiryScaffold[] = [
  {;,
phase: 'questioning',;,
title: 'Developing Inquiry Questions',;,
description: 'Students develop focused, researchable questions that drive their investigation',;,
timeAllocation: '2-3 lessons',;,
keyActivities: [
      {;,
id: 'question_brainstorm',;,
name: 'Question Brainstorming',;,
purpose: 'Generate multiple inquiry questions from initial wonderings',;,
instructions: 'Use "I wonder..." stems to brainstorm questions, then categorize by type (factual, analytical, hypothetical)',;,
materials: ['Question stem charts', 'Sticky notes', 'Categorization boards'],;,
timeMinutes: 30,;,
differentiation: ['Provide question starters', 'Allow verbal or written responses', 'Pair support for ELL students']
      },
      {;,
id: 'question_refinement',;,
name: 'Question Refinement Workshop',;,
purpose: 'Refine questions for focus, research feasibility, and relevance',;,
instructions: 'Use criteria checklist to evaluate questions: Is it specific? Researchable? Important? Interesting?',;,
materials: ['Refinement criteria checklist', 'Peer feedback forms'],;,
timeMinutes: 45,;,
differentiation: ['Provide exemplar questions', 'Teacher conferencing for struggling students', 'Extension: community relevance check']
      }
    ],;,
supportTools: [
      {;,
id: 'question_stems',;,
name: 'Question Stem Chart',;,
type: 'template',;,
description: 'Scaffolded question starters for different inquiry types',;,
content: 'How might...? What if...? Why do...? How has... changed? What factors...?',;,
whenToUse: 'During initial brainstorming and throughout inquiry'
      }
    ],;,
assessmentCheckpoints: [
      {;,
checkpoint: 'Question Quality Check',;,
criteria: ['Question is specific and focused', 'Question is researchable', 'Question connects to bigger ideas'],;,
evidence: ['Written question with rationale', 'Peer feedback forms'],;,
feedback_focus: 'Clarity and research feasibility'
      }
    ],;,
culturalConsiderations: [
      'Ensure questions include diverse perspectives',
      'Consider mātauranga Māori viewpoints',
      'Connect to local community contexts'
    ]
  },
  
  {;,
phase: 'gathering',;,
title: 'Gathering and Evaluating Evidence',;,
description: 'Students collect relevant, reliable evidence from diverse sources',;,
timeAllocation: '4-5 lessons',;,
keyActivities: [
      {;,
id: 'source_exploration',;,
name: 'Source Hunt and Evaluation',;,
purpose: 'Find and evaluate diverse, reliable sources',;,
instructions: 'Use source evaluation criteria to assess credibility, relevance, and perspective of potential sources',;,
materials: ['Source evaluation checklist', 'Research databases', 'Community contact list'],;,
timeMinutes: 60,;,
differentiation: ['Pre-selected source lists for support', 'Advanced students find primary sources', 'Digital and print options']
      },
      {;,
id: 'evidence_collection',;,
name: 'Systematic Evidence Collection',;,
purpose: 'Organize and record evidence systematically',;,
instructions: 'Use evidence collection templates to record key information, source details, and personal reflections',;,
materials: ['Evidence collection templates', 'Citation guides', 'Digital note-taking tools'],;,
timeMinutes: 90,;,
differentiation: ['Graphic organizers for visual learners', 'Voice recording options', 'Collaborative collection tools']
      }
    ],;,
supportTools: [
      {;,
id: 'source_evaluation_checklist',;,
name: 'Source Credibility Checklist',;,
type: 'checklist',;,
description: 'Criteria for evaluating source reliability and usefulness',;,
content: 'Authority, Accuracy, Currency, Relevance, Purpose, Perspective',;,
whenToUse: 'Before using any source in research'
      }
    ],;,
assessmentCheckpoints: [
      {;,
checkpoint: 'Source Quality Review',;,
criteria: ['Uses diverse source types', 'Sources are credible and relevant', 'Evidence connects to inquiry question'],;,
evidence: ['Source evaluation forms', 'Evidence collection logs'],;,
feedback_focus: 'Source quality and evidence relevance'
      }
    ],;,
culturalConsiderations: [
      'Include oral sources and community knowledge',
      'Seek mātauranga Māori perspectives',
      'Acknowledge different ways of knowing'
    ]
  },

  {;,
phase: 'processing',;,
title: 'Processing and Analyzing Evidence',;,
description: 'Students analyze evidence, identify patterns, and draw conclusions',;,
timeAllocation: '3-4 lessons',;,
keyActivities: [
      {;,
id: 'pattern_analysis',;,
name: 'Evidence Pattern Analysis',;,
purpose: 'Identify patterns, connections, and contradictions in evidence',;,
instructions: 'Sort evidence by themes, look for patterns, note contradictions or gaps',;,
materials: ['Evidence sorting templates', 'Pattern identification guides', 'Analysis frameworks'],;,
timeMinutes: 75,;,
differentiation: ['Physical sorting with cards', 'Digital mind-mapping tools', 'Collaborative analysis groups']
      },
      {;,
id: 'conclusion_development',;,
name: 'Drawing Evidence-Based Conclusions',;,
purpose: 'Develop conclusions supported by evidence',;,
instructions: 'Use conclusion framework to connect evidence to claims, acknowledge limitations',;,
materials: ['Conclusion framework templates', 'Evidence-claim-warrant organizers'],;,
timeMinutes: 60,;,
differentiation: ['Sentence starters for conclusions', 'Peer feedback on reasoning', 'Visual conclusion maps']
      }
    ],;,
supportTools: [
      {;,
id: 'analysis_framework',;,
name: 'Evidence Analysis Framework',;,
type: 'template',;,
description: 'Structured approach to analyzing and interpreting evidence',;,
content: 'What does this tell me? How does this connect? What questions does this raise?',;,
whenToUse: 'When processing each piece of evidence'
      }
    ],;,
assessmentCheckpoints: [
      {;,
checkpoint: 'Analysis Quality Check',;,
criteria: ['Identifies clear patterns in evidence', 'Draws logical conclusions', 'Acknowledges limitations and gaps'],;,
evidence: ['Analysis worksheets', 'Conclusion statements with evidence'],;,
feedback_focus: 'Reasoning quality and evidence use'
      }
    ],;,
culturalConsiderations: [
      'Honor different interpretation frameworks',
      'Consider cultural context in analysis',
      'Acknowledge multiple valid perspectives'
    ]
  },

  {;,
phase: 'sharing',;,
title: 'Sharing Findings and Taking Action',;,
description: 'Students present findings and consider actions based on their learning',;,
timeAllocation: '3-4 lessons',;,
keyActivities: [
      {;,
id: 'presentation_development',;,
name: 'Creating Presentation for Audience',;,
purpose: 'Communicate findings effectively to authentic audience',;,
instructions: 'Choose appropriate format and tailor message to audience needs and interests',;,
materials: ['Presentation planning templates', 'Audience analysis guides', 'Various presentation tools'],;,
timeMinutes: 90,;,
differentiation: ['Multiple presentation formats', 'Technology support options', 'Collaborative presentations']
      },
      {;,
id: 'action_planning',;,
name: 'Planning for Action',;,
purpose: 'Consider how learning can lead to positive action',;,
instructions: 'Brainstorm possible actions, evaluate feasibility and impact, create action plan',;,
materials: ['Action planning templates', 'Impact assessment guides', 'Community connection resources'],;,
timeMinutes: 45,;,
differentiation: ['Individual or group action plans', 'Scaled action options', 'Community mentor connections']
      }
    ],;,
supportTools: [
      {;,
id: 'presentation_rubric',;,
name: 'Inquiry Presentation Rubric',;,
type: 'rubric',;,
description: 'Assessment criteria for inquiry presentations',;,
content: 'Clear communication, Evidence use, Audience engagement, Cultural responsiveness',;,
whenToUse: 'For self-assessment and peer feedback'
      }
    ],;,
assessmentCheckpoints: [
      {;,
checkpoint: 'Communication Effectiveness',;,
criteria: ['Clear communication of findings', 'Appropriate for audience', 'Proposes realistic actions'],;,
evidence: ['Presentation delivery', 'Action plan documents', 'Audience feedback'],;,
feedback_focus: 'Communication clarity and action feasibility'
      }
    ],;,
culturalConsiderations: [
      'Honor cultural presentation protocols',
      'Include community voice and participation',
      'Consider cultural impact of proposed actions'
    ]
  }
];

// Factory functions for common inquiry types;
export function createPlaceBasedInquiry(_;, 
__title: string,  _;, 
__yearLevel: number[],  _;, 
__localPlace: string
): InquiryProjectBuilder {;
const builder = new InquiryProjectBuilder()
    .setBasicInfo(title, 'Social Studies', yearLevel, 'place_based', '8-10 weeks')
    .setInquiryQuestions(
      `How has ${localPlace} changed over time and what does this mean for our community?`,
      [
        `What stories do people tell about ${localPlace}?`,
        `How do different groups of people view ${localPlace}?`,
        `What changes would improve ${localPlace} for everyone?`
      ]
    );

  // Add all standard phases;
STANDARD_INQUIRY_PHASES.forEach(phase => builder.addPhase(phase));

  // Add place-based cultural integration;
builder.setCulturalIntegration(
    ['Tangata whenua perspectives', 'Multiple community voices', 'Historical and contemporary views'],
    ['Traditional place names and meanings', 'Māori connection to place', 'Environmental relationships'],
    'Connect with local iwi for place-based knowledge'
  );
;
return builder;
};
export function createIssueBasedInquiry(_;, 
__title: string,  _;, 
__yearLevel: number[],  _;, 
__issue: string
): InquiryProjectBuilder {;
const builder = new InquiryProjectBuilder()
    .setBasicInfo(title, 'Social Studies', yearLevel, 'issue_based', '6-8 weeks')
    .setInquiryQuestions(
      `How can our community address ${issue} in ways that benefit everyone?`,
      [
        `What causes ${issue} in our community?`,
        `Who is most affected by ${issue}?`,
        `What solutions have other communities tried?`,
        `What would a good solution look like for us?`
      ]
    );
;
STANDARD_INQUIRY_PHASES.forEach(phase => builder.addPhase(phase));
;
builder.setCulturalIntegration(
    ['Multiple stakeholder perspectives', 'Cultural values in decision-making', 'Community solutions'],
    ['Māori approaches to community issues', 'Collective decision-making', 'Environmental considerations'],
    'Involve community members in inquiry process'
  );
;
return builder;
}

// Standard rubric for inquiry projects;
export const STANDARD_INQUIRY_RUBRIC: InquiryRubric = {;,
criteria: [
    {;,
name: 'Questioning',;,
description: 'Development and refinement of inquiry questions',;,
indicators: {
        'Beginning': 'Questions are general and may not be researchable',
        'Developing': 'Questions are focused but may lack depth or complexity',
        'Achieving': 'Questions are specific, researchable, and connect to bigger ideas',
        'Exceeding': 'Questions show sophisticated thinking and consider multiple perspectives'
      }
    },
    {;,
name: 'Evidence Use',;,
description: 'Collection, evaluation, and use of evidence',;,
indicators: {
        'Beginning': 'Uses limited sources with minimal evaluation',
        'Developing': 'Uses some diverse sources with basic evaluation',
        'Achieving': 'Uses diverse, credible sources with systematic evaluation',
        'Exceeding': 'Uses wide range of sources critically and creatively'
      }
    },
    {;,
name: 'Analysis and Reasoning',;,
description: 'Processing evidence and drawing conclusions',;,
indicators: {
        'Beginning': 'Limited analysis with conclusions not well supported',
        'Developing': 'Some analysis with conclusions partially supported',
        'Achieving': 'Clear analysis with well-supported conclusions',
        'Exceeding': 'Sophisticated analysis acknowledging complexity and limitations'
      }
    },
    {;,
name: 'Cultural Responsiveness',;,
description: 'Integration of diverse perspectives and cultural considerations',;,
indicators: {
        'Beginning': 'Limited awareness of cultural perspectives',
        'Developing': 'Some inclusion of diverse perspectives',
        'Achieving': 'Consistent integration of cultural perspectives',
        'Exceeding': 'Sophisticated understanding of cultural complexity and protocols'
      }
    }
  ],;,
levels: ['Beginning', 'Developing', 'Achieving', 'Exceeding']
};