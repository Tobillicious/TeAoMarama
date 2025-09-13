/**
 * Lesson Content Generator
 * Generates actual teaching content for enhanced resources
 */

import { EnhancedResource } from './enhanced-resource-loader';

export interface LessonPlan {
  title: string;
  duration: number;
  objectives: string[];
  materials: string[];
  activities: LessonActivity[];
  assessment: AssessmentMethod[];
  culturalElements: CulturalElement[];
  extensionActivities: string[];
  reflection: string[];
}

export interface LessonActivity {
  name: string;
  duration: number;
  description: string;
  instructions: string[];
  materials: string[];
  groupSize: string;
  learningOutcome: string;
  tikangaConnections?: string[];
}

export interface AssessmentMethod {
  type: string;
  description: string;
  criteria: string[];
  rubric?: { level: string; description: string }[];
}

export interface CulturalElement {
  concept: string;
  teReoTerm: string;
  meaning: string;
  application: string;
  respectfulPractice: string;
}

export interface WorksheetContent {
  title: string;
  instructions: string;
  activities: WorksheetActivity[];
  culturalNote?: string;
  extension?: string;
}

export interface WorksheetActivity {
  type: 'multiple-choice' | 'short-answer' | 'essay' | 'matching' | 'diagram' | 'discussion';
  question: string;
  options?: string[];
  answer?: string;
  rubric?: string;
}

class LessonContentGenerator {
  
  generateLessonPlan(resource: EnhancedResource): LessonPlan {
    const subject = resource.subject;
    const yearLevel = resource.yearLevel;
    const type = resource.type;
    
    // Generate content based on subject and year level
    if (subject === 'Social Studies') {
      return this.generateSocialStudiesLesson(resource);
    } else if (subject === 'Mathematics') {
      return this.generateMathematicsLesson(resource);
    } else if (subject === 'Science') {
      return this.generateScienceLesson(resource);
    } else if (subject === 'English') {
      return this.generateEnglishLesson(resource);
    } else if (subject === 'Te Reo Māori') {
      return this.generateTeReoLesson(resource);
    } else {
      return this.generateGenericLesson(resource);
    }
  }

  private generateSocialStudiesLesson(resource: EnhancedResource): LessonPlan {
    const yearNum = parseInt(resource.yearLevel.replace('Year ', ''));
    // // // const isJunior = yearNum <= 10;
    
    return {
      title: resource.title,
      duration: resource.metadata.estimatedDuration,
      objectives: [
        `Understand key concepts in ${resource.description.split(' ').slice(0, 5).join(' ')}`,
        'Develop critical thinking about social issues',
        'Connect learning to Te Ao Māori perspectives',
        'Apply social studies concepts to real-world situations'
      ],
      materials: [
        'Whiteboard and markers',
        'Printed worksheets',
        'Access to computers/tablets',
        'Maps of Aotearoa New Zealand',
        'Cultural artifacts (with appropriate permissions)',
        'Group discussion cards'
      ],
      activities: [
        {
          name: 'Karakia and Introduction',
          duration: 5,
          description: 'Begin with karakia and introduce the lesson topic respectfully',
          instructions: [
            'Start with appropriate karakia (with cultural guidance)',
            'Introduce the lesson objectives',
            'Connect to previous learning',
            'Set expectations for respectful discussion'
          ],
          materials: ['Printed karakia', 'Learning objectives display'],
          groupSize: 'Whole class',
          learningOutcome: 'Students feel culturally grounded and ready to learn',
          tikangaConnections: ['Respecting protocols', 'Creating safe learning space']
        },
        {
          name: 'Interactive Discussion',
          duration: 15,
          description: 'Engage students in critical thinking about the topic',
          instructions: [
            'Present key concepts with visual aids',
            'Ask open-ended questions to encourage thinking',
            'Use think-pair-share to develop ideas',
            'Connect to students\' own experiences'
          ],
          materials: ['Discussion prompts', 'Visual aids', 'Whiteboard'],
          groupSize: 'Pairs then whole class',
          learningOutcome: 'Students can articulate key concepts and personal connections'
        },
        {
          name: 'Cultural Connections Activity',
          duration: 20,
          description: 'Explore how the topic connects to Te Ao Māori worldviews',
          instructions: [
            'Introduce relevant Māori perspectives respectfully',
            'Compare and contrast different viewpoints',
            'Discuss the importance of multiple perspectives',
            'Create connections to local iwi/hapū knowledge (where appropriate)'
          ],
          materials: ['Cultural resources', 'Comparison charts', 'Local knowledge references'],
          groupSize: 'Small groups of 3-4',
          learningOutcome: 'Students understand multiple perspectives on the topic',
          tikangaConnections: ['Whakatōhea - collective responsibility', 'Manaakitanga - hospitality and care']
        },
        {
          name: 'Practical Application',
          duration: 15,
          description: 'Apply learning to real-world scenarios',
          instructions: [
            'Present real-world case studies or scenarios',
            'Students work in groups to analyze and solve problems',
            'Present solutions to the class',
            'Reflect on the learning process'
          ],
          materials: ['Case study handouts', 'Solution templates', 'Presentation materials'],
          groupSize: 'Groups of 4-5',
          learningOutcome: 'Students can apply social studies concepts to real situations'
        }
      ],
      assessment: [
        {
          type: 'Formative Assessment',
          description: 'Ongoing observation during activities',
          criteria: [
            'Participation in discussions',
            'Quality of questions asked',
            'Respect shown for different perspectives',
            'Ability to make connections'
          ]
        },
        {
          type: 'Summative Assessment',
          description: 'End-of-lesson reflection and application task',
          criteria: [
            'Understanding of key concepts',
            'Ability to explain cultural connections',
            'Critical thinking demonstrated',
            'Respectful engagement with cultural content'
          ],
          rubric: [
            { level: 'Excellent', description: 'Demonstrates deep understanding and makes meaningful cultural connections' },
            { level: 'Good', description: 'Shows solid understanding with some cultural awareness' },
            { level: 'Developing', description: 'Basic understanding, needs support with cultural connections' },
            { level: 'Beginning', description: 'Limited understanding, requires significant support' }
          ]
        }
      ],
      culturalElements: [
        {
          concept: 'Collective Responsibility',
          teReoTerm: 'Whakatōhea',
          meaning: 'Working together for the common good',
          application: 'Understanding how communities work together to solve social issues',
          respectfulPractice: 'Always acknowledge the collective effort in community solutions'
        },
        {
          concept: 'Hospitality and Care',
          teReoTerm: 'Manaakitanga',
          meaning: 'The process of showing respect and care for others',
          application: 'Considering how social policies affect the wellbeing of all people',
          respectfulPractice: 'Ensure all voices are heard and respected in discussions'
        }
      ],
      extensionActivities: [
        'Research local iwi/hapū perspectives on this topic',
        'Create a presentation comparing different cultural approaches',
        'Interview community members about their experiences',
        'Design a community action plan based on learning'
      ],
      reflection: [
        'What was the most important thing you learned today?',
        'How do the Māori perspectives change your understanding?',
        'What questions do you still have about this topic?',
        'How can you apply this learning in your own life?'
      ]
    };
  }

  private generateMathematicsLesson(resource: EnhancedResource): LessonPlan {
    return {
      title: resource.title,
      duration: resource.metadata.estimatedDuration,
      objectives: [
        'Master key mathematical concepts and procedures',
        'Apply mathematical thinking to solve problems',
        'Connect mathematics to Māori knowledge systems',
        'Develop confidence in mathematical reasoning'
      ],
      materials: [
        'Calculators or mathematical tools',
        'Manipulatives and visual aids',
        'Worksheets with practice problems',
        'Real-world problem scenarios',
        'Cultural mathematical examples'
      ],
      activities: [
        {
          name: 'Mathematical Karakia and Mindset',
          duration: 5,
          description: 'Begin with intention-setting for mathematical learning',
          instructions: [
            'Brief grounding exercise',
            'Review what we learned last time',
            'Set goals for today\'s learning',
            'Remind students that mistakes are part of learning'
          ],
          materials: ['Goal-setting cards'],
          groupSize: 'Whole class',
          learningOutcome: 'Students feel prepared and confident to tackle mathematics'
        },
        {
          name: 'Concept Introduction',
          duration: 15,
          description: 'Introduce new mathematical concepts with cultural connections',
          instructions: [
            'Present the mathematical concept clearly',
            'Use visual and hands-on demonstrations',
            'Connect to Māori mathematical traditions where appropriate',
            'Check for understanding regularly'
          ],
          materials: ['Visual aids', 'Manipulatives', 'Cultural examples'],
          groupSize: 'Whole class with pair discussions',
          learningOutcome: 'Students understand the new concept and its cultural relevance'
        }
      ],
      assessment: [
        {
          type: 'Problem-solving Assessment',
          description: 'Students solve authentic problems using new concepts',
          criteria: [
            'Correct application of mathematical procedures',
            'Clear mathematical reasoning',
            'Appropriate use of mathematical language',
            'Connection to real-world contexts'
          ]
        }
      ],
      culturalElements: [
        {
          concept: 'Pattern Recognition',
          teReoTerm: 'Tauira',
          meaning: 'Patterns found in nature and art',
          application: 'Using traditional Māori patterns to understand mathematical sequences',
          respectfulPractice: 'Acknowledge the mathematical sophistication of Māori knowledge'
        }
      ],
      extensionActivities: [
        'Explore mathematical patterns in traditional Māori art',
        'Research mathematical concepts in navigation and astronomy',
        'Create mathematical models of real community problems'
      ],
      reflection: [
        'What mathematical strategies worked best for you today?',
        'How does mathematics connect to the world around us?',
        'What cultural connections to mathematics did you discover?'
      ]
    };
  }

  private generateScienceLesson(resource: EnhancedResource): LessonPlan {
    return {
      title: resource.title,
      duration: resource.metadata.estimatedDuration,
      objectives: [
        'Understand scientific concepts through investigation',
        'Connect science to Te Taiao (the natural world)',
        'Develop scientific inquiry skills',
        'Apply scientific knowledge to environmental challenges'
      ],
      materials: [
        'Laboratory equipment and safety gear',
        'Natural specimens (respectfully collected)',
        'Observation journals',
        'Digital tools for data collection',
        'Traditional Māori knowledge resources'
      ],
      activities: [
        {
          name: 'Connection to Te Taiao',
          duration: 10,
          description: 'Ground the scientific learning in respect for the natural world',
          instructions: [
            'Acknowledge the environment we\'re learning in',
            'Discuss how science helps us care for Te Taiao',
            'Set intentions for respectful investigation',
            'Review safety procedures'
          ],
          materials: ['Safety guidelines', 'Cultural protocols'],
          groupSize: 'Whole class',
          learningOutcome: 'Students approach science with respect for the natural world'
        }
      ],
      assessment: [
        {
          type: 'Scientific Investigation',
          description: 'Students design and conduct investigations',
          criteria: [
            'Clear hypothesis formation',
            'Appropriate methodology',
            'Accurate data collection',
            'Thoughtful analysis and conclusions'
          ]
        }
      ],
      culturalElements: [
        {
          concept: 'Environmental Guardianship',
          teReoTerm: 'Kaitiakitanga',
          meaning: 'The responsibility to care for the environment',
          application: 'Understanding how scientific knowledge supports environmental protection',
          respectfulPractice: 'Always consider the environmental impact of scientific activities'
        }
      ],
      extensionActivities: [
        'Study traditional Māori environmental knowledge',
        'Design solutions for local environmental challenges',
        'Connect with local environmental groups'
      ],
      reflection: [
        'How does this scientific knowledge help us care for the environment?',
        'What questions do you want to investigate further?',
        'How do traditional and scientific knowledge complement each other?'
      ]
    };
  }

  private generateEnglishLesson(resource: EnhancedResource): LessonPlan {
    return {
      title: resource.title,
      duration: resource.metadata.estimatedDuration,
      objectives: [
        'Develop reading, writing, speaking, and listening skills',
        'Appreciate diverse voices and perspectives in literature',
        'Connect English learning to Te Reo Māori and cultural understanding',
        'Express ideas clearly and respectfully'
      ],
      materials: [
        'Selected texts (including Māori authors where appropriate)',
        'Writing materials and digital tools',
        'Audio/visual resources',
        'Vocabulary cards',
        'Cultural context materials'
      ],
      activities: [
        {
          name: 'Whakatōhea - Gathering of Voices',
          duration: 10,
          description: 'Create a respectful space for sharing diverse perspectives',
          instructions: [
            'Acknowledge the many languages and cultures in our class',
            'Share the value of different voices in literature',
            'Set expectations for respectful listening',
            'Introduce the text and its cultural context'
          ],
          materials: ['Text introduction', 'Cultural context cards'],
          groupSize: 'Whole class',
          learningOutcome: 'Students appreciate the diversity of literary voices'
        }
      ],
      assessment: [
        {
          type: 'Portfolio Assessment',
          description: 'Collection of writing and creative work over time',
          criteria: [
            'Growth in writing skills',
            'Understanding of literary techniques',
            'Cultural sensitivity in expression',
            'Personal voice development'
          ]
        }
      ],
      culturalElements: [
        {
          concept: 'Storytelling Tradition',
          teReoTerm: 'Kōrero',
          meaning: 'The art of telling stories and sharing knowledge',
          application: 'Understanding how stories carry cultural knowledge and values',
          respectfulPractice: 'Honor the storytelling traditions of all cultures represented'
        }
      ],
      extensionActivities: [
        'Explore Māori and Pacific literature',
        'Create multimedia storytelling projects',
        'Interview community elders about their stories'
      ],
      reflection: [
        'How do stories help us understand different perspectives?',
        'What stories from your own culture would you like to share?',
        'How has your understanding of language and culture grown?'
      ]
    };
  }

  private generateTeReoLesson(resource: EnhancedResource): LessonPlan {
    return {
      title: resource.title,
      duration: resource.metadata.estimatedDuration,
      objectives: [
        'Develop Te Reo Māori language skills with cultural understanding',
        'Understand the connection between language and culture',
        'Practice Te Reo in meaningful contexts',
        'Show respect for Māori culture and protocols'
      ],
      materials: [
        'Te Reo vocabulary cards',
        'Audio recordings by native speakers',
        'Cultural context materials',
        'Interactive language games',
        'Traditional songs and stories'
      ],
      activities: [
        {
          name: 'Karakia and Language Grounding',
          duration: 10,
          description: 'Begin with karakia and set intentions for respectful learning',
          instructions: [
            'Begin with appropriate karakia',
            'Acknowledge the taonga (treasure) of Te Reo Māori',
            'Set intentions for respectful learning',
            'Review previously learned vocabulary'
          ],
          materials: ['Karakia cards', 'Vocabulary review materials'],
          groupSize: 'Whole class',
          learningOutcome: 'Students approach Te Reo learning with respect and intention'
        }
      ],
      assessment: [
        {
          type: 'Oral Communication Assessment',
          description: 'Students demonstrate language use in meaningful contexts',
          criteria: [
            'Accurate pronunciation',
            'Appropriate use of vocabulary',
            'Cultural sensitivity',
            'Confidence in communication'
          ]
        }
      ],
      culturalElements: [
        {
          concept: 'Language as Life Force',
          teReoTerm: 'Ko te reo te mauri o te mana Māori',
          meaning: 'Language is the life force of Māori culture',
          application: 'Understanding that learning Te Reo helps preserve and strengthen Māori culture',
          respectfulPractice: 'Always approach Te Reo learning with respect and humility'
        }
      ],
      extensionActivities: [
        'Practice Te Reo with native speakers in the community',
        'Learn traditional waiata (songs)',
        'Explore local iwi/hapū history and language'
      ],
      reflection: [
        'How does learning Te Reo change your understanding of Aotearoa?',
        'What aspects of Māori culture have you discovered through language?',
        'How can you continue to support Te Reo revitalization?'
      ]
    };
  }

  private generateGenericLesson(resource: EnhancedResource): LessonPlan {
    return {
      title: resource.title,
      duration: resource.metadata.estimatedDuration,
      objectives: [
        `Understand key concepts in ${resource.subject}`,
        'Apply learning to real-world contexts',
        'Develop critical thinking skills',
        'Connect learning to cultural perspectives'
      ],
      materials: [
        'Subject-specific resources',
        'Interactive materials',
        'Assessment tools',
        'Cultural context materials'
      ],
      activities: [
        {
          name: 'Learning Introduction',
          duration: 10,
          description: 'Set the stage for respectful and engaging learning',
          instructions: [
            'Welcome students and set positive expectations',
            'Connect to previous learning',
            'Introduce today\'s objectives',
            'Create an inclusive learning environment'
          ],
          materials: ['Learning objectives', 'Welcome materials'],
          groupSize: 'Whole class',
          learningOutcome: 'Students feel ready and motivated to learn'
        }
      ],
      assessment: [
        {
          type: 'Authentic Assessment',
          description: 'Assessment that connects to real-world applications',
          criteria: [
            'Understanding of key concepts',
            'Application to authentic contexts',
            'Quality of thinking demonstrated',
            'Respectful engagement with diverse perspectives'
          ]
        }
      ],
      culturalElements: [
        {
          concept: 'Respect for Knowledge',
          teReoTerm: 'Mātauranga',
          meaning: 'Knowledge and wisdom from all sources',
          application: 'Valuing different ways of knowing and understanding',
          respectfulPractice: 'Honor all forms of knowledge and learning traditions'
        }
      ],
      extensionActivities: [
        'Research different cultural perspectives on the topic',
        'Connect learning to community issues',
        'Share learning with whānau and community'
      ],
      reflection: [
        'What new understanding have you gained?',
        'How does this connect to your own experiences?',
        'What questions do you want to explore further?'
      ]
    };
  }

  generateWorksheet(resource: EnhancedResource): WorksheetContent {
    const subject = resource.subject;
    
    if (subject === 'Social Studies') {
      return this.generateSocialStudiesWorksheet(resource);
    } else if (subject === 'Mathematics') {
      return this.generateMathematicsWorksheet(resource);
    } else {
      return this.generateGenericWorksheet(resource);
    }
  }

  private generateSocialStudiesWorksheet(resource: EnhancedResource): WorksheetContent {
    return {
      title: `${resource.title} - Student Worksheet`,
      instructions: 'Complete the following activities to demonstrate your understanding. Remember to consider multiple perspectives and show respect for different viewpoints.',
      activities: [
        {
          type: 'short-answer',
          question: 'Explain the main concept covered in today\'s lesson in your own words.',
          rubric: 'Clear explanation showing understanding (2-3 sentences)'
        },
        {
          type: 'essay',
          question: 'How do Māori perspectives on this topic differ from or complement other viewpoints? Provide specific examples.',
          rubric: 'Thoughtful analysis showing cultural awareness and respect (1-2 paragraphs)'
        },
        {
          type: 'discussion',
          question: 'Discuss with a partner: How does this topic affect your local community? What solutions might work in your area?',
          rubric: 'Meaningful discussion showing connection to local context'
        }
      ],
      culturalNote: 'Remember to approach all cultural perspectives with respect and to acknowledge the sources of your knowledge.',
      extension: 'Research how this topic is addressed in another country or culture. What can we learn from their approaches?'
    };
  }

  private generateMathematicsWorksheet(resource: EnhancedResource): WorksheetContent {
    return {
      title: `${resource.title} - Practice Problems`,
      instructions: 'Work through these problems step by step. Show your working and explain your reasoning.',
      activities: [
        {
          type: 'multiple-choice',
          question: 'Which strategy would be most effective for solving this type of problem?',
          options: ['Strategy A', 'Strategy B', 'Strategy C', 'Strategy D'],
          answer: 'Strategy B'
        },
        {
          type: 'short-answer',
          question: 'Solve the following problem and explain each step in your solution.',
          rubric: 'Correct solution with clear explanation of reasoning'
        },
        {
          type: 'essay',
          question: 'How might traditional Māori mathematical concepts connect to what we\'ve learned today? Give an example.',
          rubric: 'Thoughtful connection between traditional and contemporary mathematics'
        }
      ],
      extension: 'Create your own problem based on a real situation in your community. Solve it and explain why your solution would work.'
    };
  }

  private generateGenericWorksheet(resource: EnhancedResource): WorksheetContent {
    return {
      title: `${resource.title} - Learning Activities`,
      instructions: 'Complete these activities to reinforce your learning and make connections to your own experiences.',
      activities: [
        {
          type: 'short-answer',
          question: 'What are the three most important things you learned in this lesson?',
          rubric: 'Clear identification of key learning points'
        },
        {
          type: 'essay',
          question: 'How does this learning connect to your own life or community? Provide specific examples.',
          rubric: 'Personal connections with specific examples'
        }
      ],
      extension: 'Share your learning with someone at home. What questions do they have about this topic?'
    };
  }
}

export const lessonContentGenerator = new LessonContentGenerator();
export default lessonContentGenerator;