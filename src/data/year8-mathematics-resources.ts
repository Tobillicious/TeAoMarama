// Year 8 Mathematics Resources - Māori Mathematical Thinking
// Authentic New Zealand Curriculum content with cultural integration

export interface MathResource {
  id: string;
  title: string;
  topic: string;
  duration: string;
  objectives: string[];
  teReoTerms: string[];
  activities: MathActivity[];
  assessments: MathAssessment[];
  externalResources: ExternalResource[];
  culturalConnections: CulturalConnection[];
}

export interface MathActivity {
  title: string;
  description: string;
  duration: string;
  materials: string[];
  instructions: string[];
  teReoIntegration: string[];
}

export interface MathAssessment {
  type: 'formative' | 'summative' | 'peer';
  title: string;
  description: string;
  criteria: string[];
}

export interface ExternalResource {
  title: string;
  url: string;
  type: 'website' | 'video' | 'interactive' | 'document';
  description: string;
  verified: boolean;
}

export interface CulturalConnection {
  element: string;
  description: string;
  mathematicalConnection: string;
  activities: string[];
}

export const realMathematicsResources: MathResource[] = [
  {
    id: 'maori-algebra-patterns',
    title: 'Algebra and Patterns: Māori Mathematical Thinking',
    topic: 'Algebra',
    duration: '4-5 weeks',
    objectives: [
      'Solve linear equations using algebraic methods',
      'Understand Māori mathematical concepts and terminology',
      'Apply algebraic thinking to real-world problems',
      'Explore mathematical patterns in Māori culture',
    ],
    teReoTerms: [
      'tātai - to calculate',
      'raupapa - sequence/pattern',
      'whakawhiti - to solve',
      'tatau - to count',
      'tau - number',
      'tauranga - equation',
    ],
    activities: [
      {
        title: 'Whakairo Patterns and Algebra',
        description:
          'Students identify mathematical patterns in traditional Māori carving and express them algebraically',
        duration: '3 lessons',
        materials: [
          'Images of whakairo from Te Papa',
          'Pattern worksheets',
          'Algebra manipulatives',
          'Te Reo Māori mathematical terms list',
        ],
        instructions: [
          'Study traditional whakairo patterns from museum collections',
          'Identify repeating sequences and mathematical relationships',
          'Create algebraic expressions (n + 2, 2n + 1) for patterns',
          'Design new patterns using algebraic rules',
          'Present findings using Te Reo Māori mathematical vocabulary',
        ],
        teReoIntegration: [
          'Use "raupapa" when discussing patterns',
          'Explain "tātai" when calculating values',
          'Apply "whakawhiti" when solving equations',
        ],
      },
      {
        title: 'Whenua (Land) Measurement Problems',
        description:
          'Students solve algebraic equations related to traditional and contemporary land use',
        duration: '2 lessons',
        materials: [
          'Local land use data from Statistics NZ',
          'Traditional measurement information',
          'Calculator',
          'Māori land tenure information',
        ],
        instructions: [
          'Research traditional Māori land measurement methods',
          'Compare with contemporary land use patterns',
          'Create algebraic equations for land area calculations',
          'Solve problems involving land division and allocation',
          'Present solutions with cultural context',
        ],
        teReoIntegration: [
          'Use "whenua" for land-related problems',
          'Apply "tatau" when counting measurements',
          'Discuss "mana" in relation to land authority',
        ],
      },
    ],
    assessments: [
      {
        type: 'formative',
        title: 'Algebraic Pattern Recognition',
        description: 'Students demonstrate understanding of patterns through algebraic expression',
        criteria: [
          'Identifies patterns accurately',
          'Creates correct algebraic expressions',
          'Explains mathematical relationships',
          'Uses appropriate Te Reo Māori terminology',
        ],
      },
      {
        type: 'summative',
        title: 'Māori Mathematics Project',
        description: 'Students create a mathematical project incorporating Māori cultural elements',
        criteria: [
          'Demonstrates algebraic understanding',
          'Incorporates authentic Māori cultural elements',
          'Shows real-world application',
          'Presents work professionally',
        ],
      },
    ],
    externalResources: [
      {
        title: 'Te Reo Māori Mathematical Terms',
        url: 'https://tereomaori.tki.org.nz/Reo-Maori/He-Reo-Matapono/Mathematics',
        type: 'website',
        description: 'Official Te Reo Māori mathematical vocabulary and concepts',
        verified: true,
      },
      {
        title: 'Māori Mathematics in Traditional Culture',
        url: 'https://nzmaths.co.nz/maori-mathematics',
        type: 'website',
        description: 'Resources on traditional Māori mathematical thinking and applications',
        verified: true,
      },
      {
        title: 'Statistics NZ - Māori Population Data',
        url: 'https://www.stats.govt.nz/topics/maori',
        type: 'website',
        description: 'Official statistics for Māori population and demographics',
        verified: true,
      },
    ],
    culturalConnections: [
      {
        element: 'Whakapapa',
        description: 'Understanding mathematical relationships in genealogy and family connections',
        mathematicalConnection: 'Algebraic sequences and patterns in family trees',
        activities: [
          'Family tree mathematics',
          'Generational calculations',
          'Relationship mapping using algebraic formulas',
        ],
      },
      {
        element: 'Tikanga',
        description: 'Applying mathematical thinking within cultural protocols and practices',
        mathematicalConnection: 'Mathematical patterns in cultural ceremonies and protocols',
        activities: [
          'Counting protocols in ceremonies',
          'Measurement in traditional practices',
          'Mathematical patterns in cultural traditions',
        ],
      },
    ],
  },

  {
    id: 'geometry-maori-art',
    title: 'Geometry in Māori Art and Architecture',
    topic: 'Geometry',
    duration: '3-4 weeks',
    objectives: [
      'Identify and classify geometric shapes and patterns',
      'Understand symmetry in Māori art and design',
      'Calculate area and perimeter of traditional shapes',
      'Explore geometric principles in wharenui (meeting houses)',
    ],
    teReoTerms: [
      'tapa - side/edge',
      'pou - post/pillar',
      'whakairo - carving',
      'kōwhaiwhai - painted scroll patterns',
      'tukutuku - lattice work',
      'maunga - mountain/triangle',
    ],
    activities: [
      {
        title: 'Kōwhaiwhai Pattern Analysis',
        description: 'Students analyze geometric patterns in traditional Māori painted scroll work',
        duration: '2 lessons',
        materials: [
          'Images of kōwhaiwhai patterns',
          'Geometric shape templates',
          'Measuring tools',
          'Colored pencils and paper',
        ],
        instructions: [
          'Study traditional kōwhaiwhai patterns',
          'Identify geometric shapes and symmetry',
          'Measure angles and dimensions',
          'Create mathematical descriptions of patterns',
          'Design new patterns using geometric principles',
        ],
        teReoIntegration: [
          'Use "kōwhaiwhai" when discussing patterns',
          'Apply "tapa" when measuring sides',
          'Describe "pou" in architectural contexts',
        ],
      },
    ],
    assessments: [
      {
        type: 'summative',
        title: 'Geometric Art Project',
        description: 'Students create geometric art inspired by Māori traditions',
        criteria: [
          'Demonstrates understanding of geometric concepts',
          'Incorporates authentic Māori design elements',
          'Shows accurate mathematical calculations',
          'Presents work professionally',
        ],
      },
    ],
    externalResources: [
      {
        title: 'Te Papa - Māori Art Collections',
        url: 'https://collections.tepapa.govt.nz/topic/4451',
        type: 'website',
        description: 'Museum of New Zealand Te Papa Tongarewa Māori art collections',
        verified: true,
      },
    ],
    culturalConnections: [
      {
        element: 'Mana',
        description: 'Understanding the authority and power expressed through geometric design',
        mathematicalConnection: 'Geometric principles that convey cultural authority',
        activities: [
          'Study geometric patterns in chiefly regalia',
          'Analyze symmetry in ceremonial objects',
          'Explore geometric expressions of mana',
        ],
      },
    ],
  },
];
