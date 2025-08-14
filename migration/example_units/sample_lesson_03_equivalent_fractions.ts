/**
 * SAMPLE LESSON PLAN: Lesson 3 - Equivalent Fractions in Māori Design Patterns
 * 
 * This demonstrates the complete 75-minute lesson template with:
 * - WALT/Success Criteria/Exit Ticket
 * - Cultural integration with authentic Māori patterns
 * - Multiple learning segments with timing
 * - Differentiated resources and activities
 * - Assessment opportunities throughout
 */

import type { 
  LessonPlan, 
  LessonSegment, 
  LessonResource, 
  WhatAGoodOneLooksLike,
  LessonVariation 
} from '../lesson-plan-template';
import { LessonPlanBuilder } from '../lesson-plan-template';

// Create the detailed lesson plan
export function createEquivalentFractionsLesson(): LessonPlan {
  const builder = new LessonPlanBuilder()
    .setBasicInfo(
      "Equivalent Fractions in Māori Design Patterns - Ōrite Hautau",
      "unit_y8_fractions_real_world", 
      3, 
      [8], 
      "Mathematics"
    )
    .setLearningIntention(
      'WALT',
      'We are learning to create equivalent fractions and connect them to traditional Māori patterns',
      [
        'I can find equivalent fractions by multiplying/dividing numerator and denominator by the same number',
        'I can identify equivalent fractions in traditional Māori patterns',
        'I can create my own pattern showing equivalent fractions',
        'I can explain why fractions are equivalent using mathematical reasoning'
      ],
      'Draw one pattern that shows equivalent fractions and explain why they are equal'
    )
    .setDoNow({
      id: 'do_now_pattern_observation',
      title: 'Pattern Observation - He Kitea i nga Raina',
      description: 'Students observe authentic Māori patterns and identify mathematical relationships',
      timeMinutes: 7,
      materials: [
        'Displayed kōwhaiwhai patterns on board',
        'Student observation sheets',
        'Colored pencils'
      ],
      instructions: `On the board are three traditional kōwhaiwhai patterns. In your notebook:
      1. Sketch what you notice about the repeating elements
      2. Circle parts that look like fractions of the whole pattern
      3. Write down any mathematical relationships you see`,
      purpose: 'preview'
    })
    .setCulturalIntegration(
      [
        'Authentic Māori kōwhaiwhai and tukutuku patterns as mathematical models',
        'Respectful use of cultural designs with proper acknowledgment',
        'Local iwi connections where appropriate'
      ],
      'hautau (fraction), ōrite (equal/equivalent), kōwhaiwhai (painted scroll patterns)',
      'Connect to local marae or cultural center if possible for authentic patterns'
    );

  // Lesson segments with detailed timing and activities
  const lessonSegments: LessonSegment[] = [
    {
      id: 'introduction_cultural_context',
      name: 'Introduction & Cultural Context - Whakatōhinga',
      timeMinutes: 10,
      purpose: 'Connect mathematical learning to cultural context with respect',
      teacherActions: [
        'Share WALT and success criteria clearly on board',
        'Acknowledge the cultural significance of Māori patterns',
        'Explain how mathematics and art connect in many cultures',
        'Show examples of equivalent fractions in simple patterns'
      ],
      studentActions: [
        'Listen respectfully to cultural context',
        'Ask clarifying questions about learning goals',
        'Make connections between math and art in their own cultures',
        'Discuss Do Now observations with a partner'
      ],
      resources: [
        'Slides with cultural protocols and pattern examples',
        'Equivalent fractions introduction cards',
        'Student reflection journals'
      ],
      culturalConnections: 'Emphasize that we are learning WITH these patterns, not copying sacred designs. Focus on geometric and mathematical properties with cultural respect.'
    },

    {
      id: 'guided_practice_equivalent_fractions',
      name: 'Guided Practice - Equivalent Fractions Discovery',
      timeMinutes: 20,
      purpose: 'Develop conceptual understanding of equivalent fractions through pattern analysis',
      teacherActions: [
        'Model finding equivalent fractions using pattern sections',
        'Think aloud about why fractions are equivalent',
        'Guide students through systematic approach',
        'Check understanding through targeted questioning'
      ],
      studentActions: [
        'Work alongside teacher with their own pattern examples',
        'Practice finding equivalent fractions systematically',
        'Explain their reasoning to a partner',
        'Ask questions when confused'
      ],
      resources: [
        'Large pattern displays for modeling',
        'Student practice sheets with pattern sections',
        'Equivalent fraction manipulatives (fraction bars)',
        'Guided practice recording sheet'
      ],
      differentiation: 'Provide fraction bars for students needing concrete support; advanced students explore mixed numbers in complex patterns'
    },

    {
      id: 'collaborative_investigation',
      name: 'Collaborative Investigation - Pattern Analysis Teams',
      timeMinutes: 25,
      purpose: 'Apply equivalent fraction skills in authentic cultural pattern contexts',
      teacherActions: [
        'Facilitate team rotations through pattern stations',
        'Provide feedback and ask probing questions',
        'Support struggling teams with targeted scaffolding',
        'Document student thinking for assessment'
      ],
      studentActions: [
        'Work in teams of 3-4 to analyze different pattern types',
        'Find and record equivalent fractions within patterns',
        'Create their own equivalent fraction patterns',
        'Prepare to share findings with class'
      ],
      resources: [
        'Station rotation materials (4 different pattern types)',
        'Team recording sheets',
        'Pattern creation supplies (grid paper, colored pencils)',
        'Equivalent fraction reference charts'
      ],
      culturalConnections: 'Each station features different pattern types: kōwhaiwhai, tukutuku, geometric borders, and contemporary Māori art'
    },

    {
      id: 'sharing_and_connections',
      name: 'Sharing & Mathematical Connections - Whakatōhinga',
      timeMinutes: 10,
      purpose: 'Consolidate learning through peer sharing and mathematical reflection',
      teacherActions: [
        'Facilitate structured sharing protocol',
        'Highlight key mathematical insights from teams',
        'Connect back to success criteria',
        'Address any misconceptions that emerged'
      ],
      studentActions: [
        'Share one key finding from their team investigation',
        'Listen actively to other teams\' discoveries',
        'Ask questions about different strategies',
        'Reflect on their own understanding'
      ],
      resources: [
        'Sharing protocol poster',
        'Document camera for displaying student work',
        'Class reflection chart'
      ]
    },

    {
      id: 'closure_exit_ticket',
      name: 'Closure & Exit Ticket - Whakamutunga',
      timeMinutes: 3,
      purpose: 'Quick assessment of understanding and preview next lesson',
      teacherActions: [
        'Distribute exit tickets',
        'Preview tomorrow\'s learning about adding fractions',
        'Collect exit tickets for formative assessment',
        'Thank students for respectful cultural engagement'
      ],
      studentActions: [
        'Complete exit ticket independently',
        'Pack up materials appropriately',
        'Reflect on their learning journey'
      ],
      resources: [
        'Exit ticket slips',
        'Collection box',
        'Next lesson preview slide'
      ]
    }
  ];

  // Add all segments to lesson
  lessonSegments.forEach(segment => builder.addSegment(segment));

  // Detailed resources with clear instructions
  const resources: LessonResource[] = [
    {
      id: 'station_kowhaiwhai_patterns',
      type: 'activity',
      title: 'Kōwhaiwhai Pattern Analysis Station',
      description: 'Analyze traditional painted scroll patterns for equivalent fractions',
      fileLocation: 'migration/resources/patterns/kowhaiwhai_fraction_analysis.pdf',
      timeRequired: 6,
      materials: [
        'Laminated kōwhaiwhai pattern sheets',
        'Equivalent fraction recording charts',
        'Colored pencils for marking sections',
        'Magnifying glasses for detail work'
      ],
      instructions: `
      1. Choose one kōwhaiwhai pattern from the selection
      2. Identify a repeating unit (this is your "whole")
      3. Find sections that represent fractions of this whole
      4. Record equivalent fractions you discover (e.g., 2/8 = 1/4)
      5. Explain your reasoning on the recording chart
      6. Create one new equivalent fraction using your pattern`,
      adaptations: [
        'Provide pre-marked pattern sections for students needing support',
        'Advanced: Find equivalent fractions across different pattern scales',
        'Visual learners: Use physical pattern pieces to manipulate'
      ]
    },

    {
      id: 'station_tukutuku_geometric',
      type: 'activity', 
      title: 'Tukutuku Panel Fraction Investigation',
      description: 'Explore woven panel patterns for geometric equivalent fractions',
      fileLocation: 'migration/resources/patterns/tukutuku_fraction_grids.pdf',
      timeRequired: 6,
      materials: [
        'Tukutuku pattern grids (various sizes)',
        'Fraction tiles for overlay',
        'Grid recording sheets',
        'Calculators for verification'
      ],
      instructions: `
      1. Examine the tukutuku panel patterns on your grid
      2. Use fraction tiles to cover different sections 
      3. Find multiple ways to represent the same fraction of the panel
      4. Record equivalent fractions (e.g., 4/16 = 1/4 = 2/8)
      5. Challenge: Create your own tukutuku-inspired pattern showing equivalent fractions`,
      adaptations: [
        'Simplified grids (4x4) for students needing support',
        'Complex grids (8x8 or larger) for advanced students',
        'Physical tiles available for hands-on learners'
      ]
    },

    {
      id: 'station_contemporary_creation',
      type: 'activity',
      title: 'Create Your Own Equivalent Fraction Pattern',
      description: 'Design original patterns inspired by Māori geometry showing equivalent fractions',
      timeRequired: 6,
      materials: [
        'Grid paper (various sizes)',
        'Colored pencils and markers',
        'Pattern inspiration cards',
        'Equivalent fraction checklist'
      ],
      instructions: `
      1. Design your own geometric pattern inspired by Māori design principles
      2. Ensure your pattern clearly shows at least 3 equivalent fractions
      3. Use the checklist to verify your equivalent fractions are correct
      4. Write explanations for why your fractions are equivalent
      5. Prepare to teach your pattern to another team`,
      adaptations: [
        'Provide pattern templates for students needing structure',
        'Advanced students include improper fractions and mixed numbers',
        'Digital design option using pattern-making software'
      ]
    },

    {
      id: 'station_real_world_applications',
      type: 'activity',
      title: 'Equivalent Fractions in Māori Arts & Crafts',
      description: 'Apply equivalent fraction concepts to real-world Māori artistic practices',
      fileLocation: 'migration/resources/activities/maori_arts_fractions.pdf',
      timeRequired: 6,
      materials: [
        'Photos of traditional crafts (weaving, carving, etc.)',
        'Measurement tools (rulers, fraction strips)',
        'Real-world problem cards',
        'Calculator for verification'
      ],
      instructions: `
      1. Examine photos of traditional Māori crafts and artworks
      2. Identify fraction relationships in proportions and measurements
      3. Solve real-world problems about scaling traditional designs
      4. Find equivalent fractions in craft measurements
      5. Discuss: How might understanding equivalent fractions help traditional artists?`,
      adaptations: [
        'Provide measurement scaffolding for struggling students',
        'Include complex multi-step problems for advanced learners',
        'Guest speaker option: Local Māori artist or craftsperson'
      ]
    },

    {
      id: 'fraction_manipulation_kit',
      type: 'teaching_cards',
      title: 'Equivalent Fraction Manipulation Kit',
      description: 'Physical and visual supports for understanding equivalent fractions',
      timeRequired: 0, // Available throughout lesson
      materials: [
        'Fraction bars (halves through twelfths)',
        'Fraction circles with common denominators',
        'Equivalent fraction reference chart',
        'Pattern overlay transparencies'
      ],
      instructions: 'Available at all stations for students who need concrete support for visualizing equivalent fractions',
      adaptations: [
        'Essential for visual and kinesthetic learners',
        'Helpful for ELL students to connect visual and symbolic representations'
      ]
    }
  ];

  // Add all resources
  resources.forEach(resource => builder.addResource(resource));

  // "What a good one looks like" examples
  builder
    .addWhatGoodLooksLike({
      context: 'When finding equivalent fractions in patterns',
      exemplar: 'Clear identification of the whole, accurate fraction notation, and mathematical explanation of why fractions are equivalent',
      notThisButThis: [
        {
          not_this: '2/4 = 1/2 because they look the same',
          but_this: '2/4 = 1/2 because if I divide both the top and bottom by 2, I get 1/2',
          because: 'We need to explain the mathematical reason, not just the visual similarity'
        },
        {
          not_this: 'Just listing equivalent fractions',
          but_this: 'Showing how you found them and checking your work',
          because: 'Understanding the process is more important than just getting answers'
        },
        {
          not_this: 'Using patterns without understanding their cultural significance',
          but_this: 'Appreciating the mathematical beauty while respecting the cultural context',
          because: 'We want to honor the culture while learning mathematics'
        }
      ],
      scaffoldingSteps: [
        'Identify what represents the "whole" in your pattern',
        'Count the equal parts to determine denominators',
        'Find different ways to group the same parts',
        'Write the fractions and check they are equal',
        'Explain your reasoning clearly'
      ]
    })
    .addWhatGoodLooksLike({
      context: 'When creating your own equivalent fraction pattern',
      exemplar: 'Original design that clearly shows equivalent fractions with accurate mathematical labeling',
      notThisButThis: [
        {
          not_this: 'Copying a pattern exactly',
          but_this: 'Creating your own design inspired by Māori geometric principles',
          because: 'Original thinking shows deeper understanding'
        },
        {
          not_this: 'Random shapes with fraction labels',
          but_this: 'Intentional design where the equivalent fractions make visual sense',
          because: 'The mathematics should be clear in your visual design'
        }
      ],
      scaffoldingSteps: [
        'Sketch your design idea first',
        'Plan where equivalent fractions will be shown',
        'Create your pattern carefully with equal sections',
        'Label all equivalent fractions clearly',
        'Check your math and make corrections'
      ]
    });

  // Lesson variations for different needs
  const variations: LessonVariation[] = [
    {
      id: 'variation_cultural_focus',
      variation_name: 'Deep Cultural Integration',
      target_audience: 'Classes with significant Māori enrollment or cultural focus schools',
      adaptations: {
        content: [
          'Include more detailed cultural context about each pattern type',
          'Discuss the spiritual and cultural significance alongside mathematical properties',
          'Include te reo Māori mathematical terminology throughout'
        ],
        process: [
          'Begin with karakia if culturally appropriate',
          'Include community cultural advisor or kaumātua if possible',
          'Use traditional protocols for sharing and learning'
        ],
        product: [
          'Students create presentations that honor both mathematical and cultural learning',
          'Include reflection on cultural respect and mathematical discovery',
          'Consider sharing with local iwi or cultural center'
        ],
        environment: [
          'Display authentic cultural artifacts respectfully',
          'Create calm, respectful learning environment',
          'Include cultural music or natural sounds if appropriate'
        ]
      },
      additional_resources: [
        {
          id: 'cultural_advisor_guide',
          type: 'external_link',
          title: 'Cultural Advisor Collaboration Guide',
          description: 'Guidelines for working with cultural advisors in mathematics lessons',
          timeRequired: 0,
          materials: ['Cultural protocol checklist', 'Collaboration planning template'],
          instructions: 'Review before lesson and follow all cultural protocols for authentic cultural integration'
        }
      ]
    },

    {
      id: 'variation_support_needs',
      variation_name: 'Additional Learning Support',
      target_audience: 'Students requiring additional scaffolding or learning support',
      adaptations: {
        content: [
          'Focus on simpler fraction relationships (halves, quarters, eighths)',
          'Use larger, clearer visual patterns',
          'Reduce number of equivalent fractions required'
        ],
        process: [
          'Provide additional guided practice time',
          'Use peer support partnerships',
          'Include more hands-on manipulation opportunities'
        ],
        product: [
          'Allow demonstration of understanding through various formats',
          'Provide sentence starters for explanations',
          'Accept drawings and verbal explanations alongside written work'
        ],
        environment: [
          'Reduce visual distractions in workspace',
          'Provide quiet work areas if needed',
          'Ensure access to manipulative materials'
        ]
      },
      additional_resources: [
        {
          id: 'simplified_patterns',
          type: 'handout',
          title: 'Simplified Pattern Analysis Sheets',
          description: 'Clearer, simpler patterns focusing on basic equivalent fractions',
          timeRequired: 0,
          materials: ['Large print pattern sheets', 'Highlighted section guides'],
          instructions: 'Use these instead of complex patterns for students needing additional support'
        }
      ]
    },

    {
      id: 'variation_advanced_learners',
      variation_name: 'Advanced Mathematical Thinking',
      target_audience: 'Students ready for mathematical extension and deeper thinking',
      adaptations: {
        content: [
          'Include complex equivalent fractions with larger numbers',
          'Explore connections to ratio and proportion',
          'Investigate mathematical patterns across different cultural traditions'
        ],
        process: [
          'Encourage independent investigation and discovery',
          'Provide minimal scaffolding to promote problem-solving',
          'Include peer teaching opportunities'
        ],
        product: [
          'Create mathematical presentations for younger students',
          'Design equivalent fraction games or activities',
          'Research mathematical concepts in other cultural art forms'
        ],
        environment: [
          'Provide access to additional mathematical resources',
          'Create collaboration space for peer discussion',
          'Allow flexible pacing for deep exploration'
        ]
      },
      additional_resources: [
        {
          id: 'extension_investigations',
          type: 'activity',
          title: 'Mathematical Pattern Research Project',
          description: 'Independent research into mathematical patterns in various cultural traditions',
          timeRequired: 30,
          materials: ['Research templates', 'Access to online resources', 'Presentation materials'],
          instructions: 'Students choose a cultural tradition and investigate mathematical patterns, presenting findings to class'
        }
      ]
    }
  ];

  // Add variations
  variations.forEach(variation => builder.addVariation(variation));

  // Set exit ticket
  builder.setExitTicket(
    'Draw one pattern that shows equivalent fractions and explain why they are equal',
    'drawing'
  );

  // Complete the lesson plan
  return builder.build();
}

// Export the sample lesson
export const SAMPLE_LESSON_EQUIVALENT_FRACTIONS = createEquivalentFractionsLesson();