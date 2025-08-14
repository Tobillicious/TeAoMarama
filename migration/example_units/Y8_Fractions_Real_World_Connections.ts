/**
 * EXAMPLE UNIT PLAN: Year 8 Fractions - Real World Connections
 * 
 * This demonstrates the full template system with:
 * - Explicit curriculum integration
 * - 15 complete lessons (full unit standard)
 * - Multiple rich texts with NZ cultural contexts
 * - Formative and summative assessments
 * - Research inquiry component
 * - Cultural safety and tikanga Māori integration
 */

import { 
  UnitPlanBuilder, 
  UnitPlan, 
  CurriculumJustification, 
  LessonReference, 
  Assessment,
  RichText,
  ResearchInquiryProject 
} from '../unit-plan-template';

// Explicit curriculum justification based on extracted standards
const curriculumJustification: CurriculumJustification = {
  primaryStandards: [
    "NZC_2007_MATH_NUM_4", // Number strategies and knowledge for fractions
    "NZC_2007_MATH_NUM_5", // Number sense with rational numbers
    "Te_Mataiaho_MATH_NUM_3", // Fractions, decimals, percentages
    "Te_Mataiaho_MATH_NUM_4"  // Proportional reasoning
  ],
  secondaryStandards: [
    "NZC_2007_MATH_STAT_3", // Statistical investigation (using fraction data)
    "Te_Mataiaho_MATH_PROB_2", // Problem solving with fractions
    "NZC_2007_KEY_COMP_THINKING" // Thinking (mathematical reasoning)
  ],
  explicitDescription: "This unit directly develops students' understanding of fractions as numbers, operators, and ratios through authentic New Zealand contexts. Students build conceptual understanding by working with cultural and community data, connecting fractions to their lived experiences while developing procedural fluency.",
  learningProgressions: [
    "Understand fractions as parts of wholes in cultural contexts",
    "Compare and order fractions using real-world references", 
    "Add and subtract fractions through practical applications",
    "Multiply and divide fractions in meaningful problems",
    "Connect fractions to decimals and percentages in data analysis",
    "Apply proportional reasoning to solve complex problems",
    "Use fractions to analyze and interpret community statistics"
  ],
  crossCurricularConnections: [
    "Social Studies: Analyzing demographic data and community statistics",
    "Science: Measurement and data collection in environmental studies", 
    "Health/PE: Nutritional analysis and sports statistics",
    "Arts: Proportions in traditional Māori design patterns"
  ],
  culturalConnections: "Integrates mātauranga Māori concepts of sharing and distribution, traditional measurement systems, and contemporary Māori statistical data for authentic fraction applications"
};

// Rich texts with multiple use pathways
const richTexts: RichText[] = [
  {
    id: "rich_text_nz_demographics",
    title: "Aotearoa Population Demographics 2023",
    textType: "statistics",
    content: `
    **New Zealand Population Breakdown (2023 Census)**
    
    | Ethnicity | Population | Fraction of Total | Percentage |
    |-----------|------------|------------------|------------|
    | European | 3,372,708 | 17/28 (approx) | 70.2% |
    | Māori | 892,476 | 3/16 (approx) | 17.8% |
    | Pacific | 381,642 | 1/13 (approx) | 8.1% |
    | Asian | 861,573 | 3/17 (approx) | 15.8% |
    | MELAA | 76,188 | 1/66 (approx) | 1.6% |
    
    **Regional Distribution of Māori Population**
    - Auckland: 1/4 of all Māori (142,770)
    - Bay of Plenty: 1/7 of all Māori (127,230)
    - Wellington: 1/12 of all Māori (74,592)
    - Waikato: 1/8 of all Māori (111,558)
    
    *Source: Stats NZ, adapted for educational use*
    `,
    useCases: [
      "Fraction comparison and ordering using real population data",
      "Converting between fractions, decimals, and percentages",
      "Addition and subtraction when analyzing combined populations",
      "Proportional reasoning with regional distributions",
      "Creating equivalent fractions from demographic ratios",
      "Problem-solving with authentic cultural statistics"
    ],
    scaffoldingQuestions: [
      "Which ethnic group represents the largest fraction of NZ's population?",
      "How might we express the Māori population as a simplified fraction?",
      "What patterns do you notice in the regional distribution data?",
      "How do these fractions help us understand our diverse communities?"
    ],
    extensionActivities: [
      "Research your local area demographics and create fraction comparisons",
      "Investigate how these proportions have changed over recent censuses",
      "Create visual representations of these fractions using Māori art patterns",
      "Calculate projected populations using proportional reasoning"
    ],
    culturalContext: "This data honors the tangata whenua while recognizing all peoples who call Aotearoa home. Discussions should include respect for diversity and the special place of Māori as indigenous peoples."
  },
  
  {
    id: "rich_text_traditional_kai",
    title: "Traditional Māori Kai Sharing - Powhiri Feast",
    textType: "infographic",
    content: `
    **Planning a Powhiri Feast for 120 Manuhiri (Visitors)**
    
    Traditional protocols require balanced portions:
    
    **Hangi portions per person:**
    - Kumara: 2/3 cup per person = ? cups total
    - Pork: 3/4 portion per person = ? portions total  
    - Chicken: 1/2 portion per person = ? portions total
    - Corn: 1/3 cob per person = ? cobs total
    - Cabbage: 1/4 head per person = ? heads total
    
    **Dessert portions:**
    - Hokey pokey ice cream: 2/5 litre serves 8 people
    - Pavlova: 1/6 of large pavlova per person
    - Rewena bread: 1/8 loaf per person
    
    **Cultural protocols:**
    - Kaumātua are served first (1/10 of all guests)
    - Children under 12 eat 3/5 of adult portion
    - Always prepare 1/4 extra food to ensure abundance
    `,
    useCases: [
      "Multiplication of fractions to calculate total quantities needed",
      "Division to determine number of items to purchase",
      "Addition of fractions when combining different food requirements",
      "Proportional reasoning for different group sizes",
      "Problem-solving with authentic cultural contexts",
      "Real-world applications of fraction operations"
    ],
    scaffoldingQuestions: [
      "How much kumara would we need in total for 120 people?",
      "If children eat 3/5 of an adult portion, how does this affect our calculations?",
      "Why might we prepare 1/4 extra food? How does this change our totals?",
      "How could we scale these recipes for different numbers of guests?"
    ],
    extensionActivities: [
      "Plan a class feast using these traditional proportions",
      "Research other cultural food sharing traditions and their mathematical aspects",
      "Create a digital calculator for scaling traditional recipes",
      "Interview kaumātua about traditional food preparation and sharing"
    ],
    culturalContext: "This scenario honors traditional Māori hospitality (manaakitanga) and the importance of kai in bringing people together. Students learn about cultural protocols while applying mathematical concepts."
  },

  {
    id: "rich_text_renewable_energy",
    title: "Aotearoa's Renewable Energy Breakdown",
    textType: "graph",
    content: `
    **New Zealand's Energy Generation (2023)**
    
    Renewable Sources (Total: 87/100 of all energy):
    - Hydro: 24/40 of renewable energy
    - Geothermal: 7/40 of renewable energy  
    - Wind: 8/40 of renewable energy
    - Solar: 1/40 of renewable energy
    
    Non-renewable Sources (13/100 of all energy):
    - Natural Gas: 9/13 of non-renewable
    - Coal: 3/13 of non-renewable
    - Oil: 1/13 of non-renewable
    
    **Regional Renewable Percentages:**
    - West Coast: 19/20 renewable (95%)
    - South Island: 9/10 renewable (90%)
    - North Island: 17/20 renewable (85%)
    - Taranaki: 3/5 renewable (60%) - includes oil/gas industry
    `,
    useCases: [
      "Fraction addition to verify totals add to 1 whole",
      "Converting fractions to percentages for comparison",
      "Comparing regional differences using fraction inequalities",
      "Calculating actual amounts using proportional reasoning",
      "Problem-solving with environmental data",
      "Creating visual representations of fractional data"
    ],
    scaffoldingQuestions: [
      "What fraction of NZ's energy comes from renewable sources?",
      "Which renewable source provides the largest fraction of renewable energy?",
      "How do the regions compare in their use of renewable energy?",
      "What does this data tell us about New Zealand's environmental goals?"
    ],
    extensionActivities: [
      "Calculate your school's potential solar energy generation",
      "Research how these fractions have changed over the past decade",
      "Design an infographic showing these energy fractions visually",
      "Compare NZ's renewable energy fractions with other countries"
    ],
    culturalContext: "Connects to Māori values of kaitiakitanga (environmental guardianship) and intergenerational responsibility for protecting natural resources."
  }
];

// Complete lesson sequence (15 lessons for full unit)
const lessons: LessonReference[] = [
  {
    id: "lesson_01_intro",
    title: "Fractions in Our Community - Te Rōpū Tuatahi",
    sequenceNumber: 1,
    durationMinutes: 75,
    learningIntention: "WALT: Identify fractions in real-world contexts and understand fractions as parts of wholes",
    successCriteria: [
      "I can find examples of fractions in my community",
      "I can explain what the numerator and denominator represent",
      "I can connect fractions to sharing and distribution in Māori culture"
    ],
    variations: [
      {
        id: "lesson_01_advanced",
        variationName: "Advanced",
        targetAudience: "Students comfortable with basic fraction concepts",
        adaptations: [
          "Begin with improper fractions and mixed numbers",
          "Include complex real-world scenarios requiring fraction analysis",
          "Extension: Research project on mathematical systems in Pacific cultures"
        ],
        additionalResources: ["Advanced fraction scenario cards", "Cultural mathematics research template"]
      },
      {
        id: "lesson_01_support",
        variationName: "Support",
        targetAudience: "Students needing additional scaffolding",
        adaptations: [
          "Use physical manipulatives for all fraction work",
          "Start with unit fractions (1/2, 1/3, 1/4) only",
          "Pair with stronger mathematics student for peer support"
        ],
        additionalResources: ["Fraction strips", "Circle fraction sets", "Peer support protocol"]
      }
    ]
  },
  
  {
    id: "lesson_02_comparison",
    title: "Comparing Fractions Using NZ Demographics",
    sequenceNumber: 2,
    durationMinutes: 75,
    learningIntention: "WALT: Compare and order fractions using real population data from Aotearoa",
    successCriteria: [
      "I can compare fractions using common denominators",
      "I can order demographic fractions from least to greatest",
      "I can explain my comparisons using population contexts"
    ],
    variations: [
      {
        id: "lesson_02_mixed",
        variationName: "Mixed Ability",
        targetAudience: "Standard classroom with diverse abilities",
        adaptations: [
          "Use benchmark fractions (1/2, 1/4, 3/4) as reference points",
          "Provide both visual and numerical comparison methods",
          "Include group work with assigned roles"
        ],
        additionalResources: ["NZ demographics fraction cards", "Comparison strategy poster", "Group role cards"]
      }
    ]
  },

  {
    id: "lesson_03_equivalence",
    title: "Equivalent Fractions in Māori Design Patterns",
    sequenceNumber: 3,
    durationMinutes: 75,
    learningIntention: "WALT: Create equivalent fractions and connect them to traditional Māori patterns",
    successCriteria: [
      "I can find equivalent fractions by multiplying/dividing numerator and denominator by the same number",
      "I can identify equivalent fractions in traditional patterns",
      "I can create my own pattern showing equivalent fractions"
    ],
    variations: [
      {
        id: "lesson_03_cultural",
        variationName: "Cultural Integration Focus",
        targetAudience: "Classes with significant Māori enrollment or cultural focus",
        adaptations: [
          "Partner with local kaumātua or Māori artist if possible",
          "Use authentic Māori design patterns as fraction models",
          "Include stories behind the patterns and their mathematical properties"
        ],
        additionalResources: ["Traditional pattern templates", "Guest speaker contact", "Cultural protocol guide"]
      }
    ]
  },

  {
    id: "lesson_04_addition_subtraction",
    title: "Adding Fractions - Combining Kai Portions",
    sequenceNumber: 4,
    durationMinutes: 75,
    learningIntention: "WALT: Add and subtract fractions with like denominators using traditional food sharing contexts",
    successCriteria: [
      "I can add fractions with the same denominator",
      "I can subtract fractions with the same denominator", 
      "I can solve problems about combining food portions"
    ],
    variations: [
      {
        id: "lesson_04_practical",
        variationName: "Practical Application",
        targetAudience: "Students who learn best through hands-on activities",
        adaptations: [
          "Use actual food items or realistic models for calculations",
          "Include cooking/baking activity if facilities allow",
          "Document learning through photos and reflection journals"
        ],
        additionalResources: ["Food portion models", "Kitchen scales", "Recipe cards", "Reflection journal template"]
      }
    ]
  },

  {
    id: "lesson_05_unlike_denominators",
    title: "Finding Common Ground - Unlike Denominators",
    sequenceNumber: 5,
    durationMinutes: 75,
    learningIntention: "WALT: Add and subtract fractions with unlike denominators by finding common denominators",
    successCriteria: [
      "I can find the least common multiple to create common denominators",
      "I can add and subtract fractions with different denominators",
      "I can check my answers for reasonableness"
    ],
    variations: [
      {
        id: "lesson_05_systematic",
        variationName: "Systematic Approach",
        targetAudience: "Students who prefer structured methods",
        adaptations: [
          "Provide step-by-step algorithm cards",
          "Use graphic organizers for problem-solving process",
          "Include self-checking mechanisms"
        ],
        additionalResources: ["Algorithm reference cards", "Problem-solving graphic organizer", "Self-check rubric"]
      }
    ]
  },

  {
    id: "lesson_06_mixed_numbers",
    title: "Mixed Numbers in Energy Data",
    sequenceNumber: 6,
    durationMinutes: 75,
    learningIntention: "WALT: Work with mixed numbers and improper fractions using renewable energy data",
    successCriteria: [
      "I can convert between mixed numbers and improper fractions",
      "I can add and subtract mixed numbers",
      "I can interpret energy data expressed as mixed numbers"
    ],
    variations: [
      {
        id: "lesson_06_environmental",
        variationName: "Environmental Focus",
        targetAudience: "Classes interested in sustainability",
        adaptations: [
          "Connect to school sustainability projects",
          "Include local renewable energy examples",
          "Plan field trip to local renewable energy facility"
        ],
        additionalResources: ["Local energy data", "Sustainability project templates", "Field trip planning guide"]
      }
    ]
  },

  {
    id: "lesson_07_multiplication_intro",
    title: "Multiplying Fractions - Scaling Recipes",
    sequenceNumber: 7,
    durationMinutes: 75,
    learningIntention: "WALT: Multiply fractions and whole numbers to scale traditional recipes",
    successCriteria: [
      "I can multiply a fraction by a whole number",
      "I can multiply two fractions together",
      "I can solve scaling problems with traditional recipes"
    ],
    variations: [
      {
        id: "lesson_07_culinary",
        variationName: "Culinary Mathematics",
        targetAudience: "Students interested in cooking/hospitality",
        adaptations: [
          "Partner with food technology teacher if available",
          "Include cultural cooking demonstration",
          "Create class cookbook with scaled recipes"
        ],
        additionalResources: ["Traditional recipe collection", "Cooking demonstration supplies", "Cookbook template"]
      }
    ]
  },

  {
    id: "lesson_08_division_intro",
    title: "Dividing Fractions - Fair Sharing",
    sequenceNumber: 8,
    durationMinutes: 75,
    learningIntention: "WALT: Divide fractions using the 'multiply by reciprocal' method in fair sharing contexts",
    successCriteria: [
      "I can find the reciprocal of a fraction",
      "I can divide fractions by multiplying by the reciprocal",
      "I can solve fair sharing problems involving fractions"
    ],
    variations: [
      {
        id: "lesson_08_conceptual",
        variationName: "Conceptual Understanding",
        targetAudience: "Students needing strong conceptual foundation",
        adaptations: [
          "Use visual models extensively before algorithms",
          "Connect to repeated subtraction understanding",
          "Include real-world 'How many groups?' scenarios"
        ],
        additionalResources: ["Visual fraction models", "Conceptual understanding tasks", "Real-world scenario cards"]
      }
    ]
  },

  {
    id: "lesson_09_problem_solving",
    title: "Multi-Step Fraction Problems",
    sequenceNumber: 9,
    durationMinutes: 75,
    learningIntention: "WALT: Solve complex problems involving multiple fraction operations",
    successCriteria: [
      "I can break down complex problems into steps",
      "I can choose appropriate operations for each step",
      "I can check my solutions for reasonableness"
    ],
    variations: [
      {
        id: "lesson_09_collaborative",
        variationName: "Collaborative Problem Solving",
        targetAudience: "Students who work well in groups",
        adaptations: [
          "Use jigsaw method with different problem aspects",
          "Include group reflection and strategy sharing",
          "Assign presentation roles within groups"
        ],
        additionalResources: ["Jigsaw problem sets", "Group reflection templates", "Presentation guidelines"]
      }
    ]
  },

  {
    id: "lesson_10_decimals_connection",
    title: "Fractions, Decimals, and Percentages in Statistics",
    sequenceNumber: 10,
    durationMinutes: 75,
    learningIntention: "WALT: Convert between fractions, decimals, and percentages using real statistical data",
    successCriteria: [
      "I can convert fractions to decimals and percentages",
      "I can convert decimals and percentages to fractions",
      "I can choose appropriate representations for different contexts"
    ],
    variations: [
      {
        id: "lesson_10_technology",
        variationName: "Technology Enhanced",
        targetAudience: "Classes with good technology access",
        adaptations: [
          "Use spreadsheet software for conversions",
          "Create digital presentations of statistical findings",
          "Include online fraction/decimal/percentage tools"
        ],
        additionalResources: ["Spreadsheet templates", "Digital presentation tools", "Online conversion tools"]
      }
    ]
  },

  {
    id: "lesson_11_inquiry_intro",
    title: "Launching Our Fraction Investigation",
    sequenceNumber: 11,
    durationMinutes: 75,
    learningIntention: "WALT: Develop inquiry questions about fractions in our community and plan our investigation",
    successCriteria: [
      "I can ask meaningful questions about fractions in real contexts",
      "I can plan an investigation to answer my questions",
      "I can identify what data I need to collect"
    ],
    variations: [
      {
        id: "lesson_11_inquiry_focus",
        variationName: "Inquiry-Based Learning",
        targetAudience: "Students comfortable with independent research",
        adaptations: [
          "Allow students to choose their own investigation focus",
          "Provide minimal scaffolding to encourage independence",
          "Include peer mentoring partnerships"
        ],
        additionalResources: ["Inquiry question frameworks", "Investigation planning templates", "Peer mentoring guidelines"]
      }
    ]
  },

  {
    id: "lesson_12_data_collection",
    title: "Collecting Fraction Data in Our Community",
    sequenceNumber: 12,
    durationMinutes: 75,
    learningIntention: "WALT: Collect accurate data about fractions in our community using appropriate methods",
    successCriteria: [
      "I can use surveys and observations to collect fraction data",
      "I can record data accurately and systematically",
      "I can ensure my data collection is respectful and appropriate"
    ],
    variations: [
      {
        id: "lesson_12_community",
        variationName: "Community Engagement",
        targetAudience: "Classes with strong community connections",
        adaptations: [
          "Include community members as data sources",
          "Use culturally appropriate protocols for data collection",
          "Plan community presentation of findings"
        ],
        additionalResources: ["Community contact protocols", "Cultural sensitivity guidelines", "Data collection forms"]
      }
    ]
  },

  {
    id: "lesson_13_analysis",
    title: "Analyzing Our Fraction Findings",
    sequenceNumber: 13,
    durationMinutes: 75,
    learningIntention: "WALT: Analyze our collected data using fraction operations and draw conclusions",
    successCriteria: [
      "I can organize and analyze fraction data systematically",
      "I can use appropriate fraction operations in my analysis",
      "I can identify patterns and draw reasonable conclusions"
    ],
    variations: [
      {
        id: "lesson_13_analytical",
        variationName: "Deep Analysis",
        targetAudience: "Students ready for complex analytical thinking",
        adaptations: [
          "Include statistical measures beyond basic fractions",
          "Encourage critical evaluation of data quality",
          "Connect to broader mathematical concepts"
        ],
        additionalResources: ["Advanced analysis templates", "Statistical thinking guides", "Data quality checklists"]
      }
    ]
  },

  {
    id: "lesson_14_presentation_prep",
    title: "Preparing Our Fraction Investigation Presentations",
    sequenceNumber: 14,
    durationMinutes: 75,
    learningIntention: "WALT: Create effective presentations of our fraction investigations for authentic audiences",
    successCriteria: [
      "I can organize my findings into a clear presentation",
      "I can use appropriate visual representations of fraction data",
      "I can explain my methods and conclusions clearly"
    ],
    variations: [
      {
        id: "lesson_14_presentation",
        variationName: "Multiple Presentation Formats",
        targetAudience: "Diverse learners with different presentation preferences",
        adaptations: [
          "Offer choices: poster, digital presentation, video, infographic",
          "Include peer feedback and revision opportunities",
          "Accommodate different communication styles"
        ],
        additionalResources: ["Presentation format options", "Peer feedback forms", "Communication style guides"]
      }
    ]
  },

  {
    id: "lesson_15_celebration",
    title: "Celebrating Our Fraction Learning Journey",
    sequenceNumber: 15,
    durationMinutes: 75,
    learningIntention: "WALT: Present our investigations and reflect on our fraction learning journey",
    successCriteria: [
      "I can present my investigation findings confidently",
      "I can give constructive feedback to classmates",
      "I can reflect on my growth in understanding fractions"
    ],
    variations: [
      {
        id: "lesson_15_celebration",
        variationName: "Community Celebration",
        targetAudience: "Classes ready for authentic audience presentations",
        adaptations: [
          "Invite whānau and community members",
          "Include cultural protocols for presentations",
          "Plan follow-up actions based on investigations"
        ],
        additionalResources: ["Invitation templates", "Cultural protocol guidelines", "Action planning templates"]
      }
    ]
  }
];

// Comprehensive assessment plan
const assessments: Assessment[] = [
  {
    id: "formative_01_entry",
    type: "formative",
    title: "Fraction Knowledge Entry Assessment",
    description: "Low-stakes assessment to determine student starting points with fractions",
    assessmentMethod: "Quick diagnostic tasks covering basic fraction concepts",
    alignedStandards: ["NZC_2007_MATH_NUM_4"],
    scaffoldingSupport: [
      "Visual fraction representations available",
      "Can be completed over multiple sessions if needed",
      "No grades assigned - information gathering only"
    ]
  },
  
  {
    id: "formative_02_ongoing",
    type: "formative",
    title: "Weekly Fraction Check-ins",
    description: "Regular brief assessments to monitor understanding throughout unit",
    assessmentMethod: "Exit tickets, quick quizzes, observation checklists",
    alignedStandards: ["NZC_2007_MATH_NUM_4", "NZC_2007_MATH_NUM_5"],
    scaffoldingSupport: [
      "Immediate feedback provided",
      "Re-teaching opportunities based on results",
      "Peer support partnerships"
    ]
  },

  {
    id: "formative_03_self_assessment",
    type: "formative",
    title: "Student Self-Assessment of Fraction Understanding",
    description: "Students reflect on their own fraction learning and identify areas for growth",
    assessmentMethod: "Self-reflection rubrics and goal-setting conferences",
    alignedStandards: ["NZC_2007_KEY_COMP_THINKING"],
    scaffoldingSupport: [
      "Guided reflection questions",
      "Examples of learning goals",
      "Teacher-student conferences"
    ]
  },

  {
    id: "summative_01_performance",
    type: "summative",
    title: "Fraction Operations Performance Assessment",
    description: "Multi-part assessment demonstrating fraction operation skills in real contexts",
    assessmentMethod: "Written assessment with real-world fraction problems",
    alignedStandards: [
      "NZC_2007_MATH_NUM_4", 
      "NZC_2007_MATH_NUM_5", 
      "Te_Mataiaho_MATH_NUM_3"
    ],
    rubric: "4-point rubric covering accuracy, strategy selection, explanation quality, and real-world application",
    exemplars: [
      "Exemplar A: Strong performance across all areas",
      "Exemplar B: Good understanding with minor calculation errors", 
      "Exemplar C: Developing understanding with scaffolding needed"
    ],
    scaffoldingSupport: [
      "Choice of problem contexts", 
      "Visual supports available",
      "Extended time for students with learning needs"
    ]
  },

  {
    id: "summative_02_inquiry",
    type: "summative",
    title: "Community Fraction Investigation Project",
    description: "Student-designed investigation applying fraction concepts to real community contexts",
    assessmentMethod: "Investigation report and presentation to authentic audience",
    alignedStandards: [
      "NZC_2007_MATH_NUM_4",
      "NZC_2007_MATH_NUM_5", 
      "NZC_2007_KEY_COMP_THINKING",
      "NZC_2007_MATH_STAT_3"
    ],
    rubric: "Multi-criteria rubric covering investigation design, mathematical accuracy, cultural responsiveness, and communication",
    exemplars: [
      "Investigation A: School lunch program fraction analysis",
      "Investigation B: Local business demographic study",
      "Investigation C: Environmental impact using fraction data"
    ],
    scaffoldingSupport: [
      "Investigation planning templates",
      "Regular checkpoint conferences",
      "Peer feedback opportunities"
    ]
  }
];

// Research inquiry component
const researchInquiry: ResearchInquiryProject = {
  id: "inquiry_fractions_community",
  title: "Fractions in Our Community Investigation",
  description: "Students design and conduct investigations exploring how fractions appear and are used in their local community",
  inquiryQuestion: "How do fractions help us understand and describe our community?",
  scaffoldingPhases: [
    {
      phase: "Questioning",
      description: "Students develop focused questions about fractions in their community",
      activities: [
        "Community fraction walk to identify potential investigation topics",
        "Question brainstorming using 'I wonder' stems",
        "Question refinement workshop with peer feedback"
      ],
      supportTools: [
        "Question development framework",
        "Community fraction observation sheet",
        "Peer feedback protocols"
      ],
      timeAllocation: "1.5 lessons"
    },
    {
      phase: "Gathering",
      description: "Students collect data about fractions in their chosen community context",
      activities: [
        "Data collection planning",
        "Surveys, interviews, or observations as appropriate",
        "Secondary source research for context"
      ],
      supportTools: [
        "Data collection planning template", 
        "Interview question guides",
        "Survey design support",
        "Source evaluation checklist"
      ],
      timeAllocation: "2 lessons"
    },
    {
      phase: "Processing",
      description: "Students analyze their fraction data and draw conclusions",
      activities: [
        "Data organization and fraction calculations",
        "Pattern identification and analysis",
        "Conclusion development with evidence"
      ],
      supportTools: [
        "Data analysis frameworks",
        "Calculation support sheets",
        "Conclusion development templates"
      ],
      timeAllocation: "1.5 lessons"
    },
    {
      phase: "Sharing",
      description: "Students present findings and consider actions based on learning",
      activities: [
        "Presentation creation for authentic audience",
        "Peer feedback and revision",
        "Community presentation event"
      ],
      supportTools: [
        "Presentation planning templates",
        "Peer feedback forms", 
        "Community presentation protocols"
      ],
      timeAllocation: "1 lesson"
    }
  ],
  assessmentCriteria: [
    "Quality and focus of investigation question",
    "Appropriateness of data collection methods",
    "Accuracy of fraction calculations and analysis",
    "Clarity of conclusions and evidence support",
    "Effectiveness of presentation to authentic audience",
    "Cultural sensitivity and respect in community engagement"
  ],
  exemplars: [
    "School Nutrition Investigation: Analyzing fraction content of school lunch portions",
    "Local Business Study: Examining demographic fractions of customer base",
    "Environmental Impact Research: Using fraction data to understand recycling rates"
  ],
  supportResources: [
    "Investigation planning templates",
    "Data collection method guides",
    "Community contact protocols",
    "Presentation tool options"
  ],
  culturalConsiderations: "All community engagement must follow appropriate cultural protocols. Students should seek permission before collecting data about people and should consider the cultural significance of any information they gather."
};

// Build the complete unit plan
export function createFractionsRealWorldUnit(): UnitPlan {
  const builder = new UnitPlanBuilder()
    .setBasicInfo(
      "Fractions: Real World Connections in Aotearoa",
      "Mathematics", 
      [8], 
      "full"
    )
    .setCurriculumJustification(curriculumJustification)
    .setLearningDesign(
      "Fractions are everywhere in our community and understanding them helps us make sense of our world",
      [
        "How do fractions help us understand data about our diverse communities?",
        "Why are equivalent fractions useful in real-world contexts?", 
        "How can we use fractions to solve problems that matter to us?",
        "What role do fractions play in traditional and contemporary New Zealand contexts?"
      ],
      "Students will remember that fractions are tools for understanding and describing the world around them, and that mathematics connects to their cultural identity and community"
    )
    .setPedagogicalKnowledge(
      [
        "Students often think fractions are just 'parts of pizzas' rather than numbers",
        "Many students struggle with the idea that fractions can be greater than 1",
        "Students may not connect decimal and percentage representations to fractions",
        "Addition of fractions is often confused with addition of whole numbers (adding numerators and denominators separately)"
      ],
      [
        "Use multiple representations (visual, symbolic, contextual) consistently",
        "Start with familiar contexts before moving to abstract representations",
        "Connect new fraction concepts to existing whole number understanding",
        "Provide frequent opportunities for mathematical discourse and explanation"
      ],
      [
        "Offer choice in problem contexts to match student interests",
        "Provide manipulatives and visual supports for concrete learners",
        "Include extension problems for advanced students",
        "Allow multiple solution methods and encourage sharing strategies"
      ],
      [
        "Understanding of whole numbers and place value",
        "Basic concepts of sharing and equal groups",
        "Experience with visual representations like circles and rectangles",
        "Familiarity with simple data collection and organization"
      ]
    )
    .setCulturalIntegration(
      [
        "Mātauranga Māori perspectives on sharing and distribution",
        "Pacific cultural traditions around community sharing",
        "Contemporary multicultural perspectives in Aotearoa",
        "Indigenous mathematical thinking and problem-solving approaches"
      ],
      [
        "Local demographic data and community statistics",
        "Traditional foods and preparation methods",
        "Regional environmental and energy data",
        "School and neighborhood contexts familiar to students"
      ],
      "Honors Māori values of sharing (whakatōhea), community care (manaakitanga), and guardianship (kaitiakitanga) while recognizing all cultural perspectives present in contemporary Aotearoa"
    )
    .setResearchInquiry(researchInquiry);

  // Add all lessons
  lessons.forEach(lesson => builder.addLesson(lesson));
  
  // Add all assessments
  assessments.forEach(assessment => builder.addAssessment(assessment));
  
  // Add all rich texts
  richTexts.forEach(richText => builder.addRichText(richText));

  return builder.build();
}

// Create and export the example unit
export const Y8_FRACTIONS_UNIT = createFractionsRealWorldUnit();