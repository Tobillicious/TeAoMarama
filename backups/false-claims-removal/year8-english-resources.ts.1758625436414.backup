// Year 8 English Resources - Integrating Te Reo Māori
// Authentic New Zealand Curriculum content with cultural integration

export interface EnglishResource {
  id: string;
  title: string;
  focus: string;
  duration: string;
  objectives: string[];
  teReoTerms: string[];
  activities: EnglishActivity[];
  assessments: EnglishAssessment[];
  externalResources: ExternalResource[];
  culturalConnections: CulturalConnection[];
}

export interface EnglishActivity {
  title: string;
  description: string;
  duration: string;
  materials: string[];
  instructions: string[];
  teReoIntegration: string[];
}

export interface EnglishAssessment {
  type: 'formative' | 'summative' | 'creative';
  title: string;
  description: string;
  criteria: string[];
}

export interface ExternalResource {
  title: string;
  url: string;
  type: 'website' | 'video' | 'document' | 'interactive';
  description: string;
  verified: boolean;
}

export interface CulturalConnection {
  element: string;
  description: string;
  languageConnection: string;
  activities: string[];
}

export const realEnglishResources: EnglishResource[] = [
  {
    id: 'creative-writing-te-reo',
    title: 'Creative Writing: Integrating Te Reo Māori',
    focus: 'Creative Writing',
    duration: '4 weeks',
    objectives: [
      'Develop creative writing skills using Te Reo Māori elements',
      'Understand Māori storytelling traditions and techniques',
      'Create original stories incorporating cultural elements',
      'Build confidence in using Te Reo Māori in writing',
    ],
    teReoTerms: [
      'pūrākau - traditional story',
      'kōrero - to speak/tell',
      'whakapapa - genealogy',
      'mana - authority/power',
      'tupuna - ancestors',
      'whenua - land',
      'whānau - family',
    ],
    activities: [
      {
        title: 'Pūrākau (Traditional Stories) Analysis',
        description:
          'Students study traditional Māori stories to understand storytelling techniques',
        duration: '3 lessons',
        materials: [
          'Traditional Māori stories from Te Papa collections',
          'Story analysis worksheets',
          'Te Reo Māori vocabulary lists',
          'Digital recording tools',
          'Cultural reference materials',
        ],
        instructions: [
          'Read and analyze traditional Māori stories',
          'Identify storytelling techniques and structures',
          'Study the use of Te Reo Māori in stories',
          'Compare different storytelling traditions',
          'Create analysis presentations with cultural context',
        ],
        teReoIntegration: [
          'Use "pūrākau" when discussing traditional stories',
          'Apply "kōrero" when describing storytelling',
          'Include "whakapapa" in story analysis',
          'Discuss "mana" in character development',
        ],
      },
      {
        title: 'Contemporary Māori Fiction Writing',
        description:
          'Students create original stories incorporating Te Reo Māori and Māori cultural elements',
        duration: '4 lessons',
        materials: [
          'Writing journals',
          'Te Reo Māori dictionaries',
          'Cultural reference materials',
          'Peer review sheets',
          'Digital publishing tools',
        ],
        instructions: [
          'Plan original stories with Māori cultural elements',
          'Incorporate Te Reo Māori vocabulary naturally',
          'Write first drafts focusing on character and plot development',
          'Peer review and revise stories',
          'Present finished stories to the class',
        ],
        teReoIntegration: [
          'Include appropriate Te Reo Māori vocabulary',
          'Use cultural concepts authentically',
          'Apply storytelling traditions respectfully',
          'Integrate cultural elements naturally',
        ],
      },
    ],
    assessments: [
      {
        type: 'formative',
        title: 'Story Planning and Drafting',
        description: 'Students demonstrate planning and drafting skills for creative writing',
        criteria: [
          'Shows clear story planning',
          'Incorporates Māori cultural elements appropriately',
          'Uses Te Reo Māori vocabulary effectively',
          'Demonstrates creative thinking',
        ],
      },
      {
        type: 'summative',
        title: 'Original Creative Story',
        description: 'Students create and present original stories with Māori cultural integration',
        criteria: [
          'Creates engaging original story',
          'Incorporates Māori cultural elements authentically',
          'Uses Te Reo Māori appropriately and accurately',
          'Demonstrates strong writing skills',
          'Presents work effectively',
        ],
      },
    ],
    externalResources: [
      {
        title: 'Te Reo Māori Creative Writing Resources',
        url: 'https://tereomaori.tki.org.nz/Reo-Maori/He-Reo-Matapono/English',
        type: 'website',
        description: 'Official resources for integrating Te Reo Māori in English language learning',
        verified: true,
      },
      {
        title: 'Contemporary Māori Literature',
        url: 'https://www.natlib.govt.nz/collections/a-z/maori-literature',
        type: 'website',
        description: 'National Library resources on contemporary Māori literature',
        verified: true,
      },
      {
        title: 'Te Papa - Māori Storytelling Collections',
        url: 'https://collections.tepapa.govt.nz/topic/4454',
        type: 'website',
        description: 'Museum collections on Māori storytelling traditions',
        verified: true,
      },
    ],
    culturalConnections: [
      {
        element: 'Whakapapa',
        description: 'Understanding personal and cultural connections in storytelling',
        languageConnection:
          'Using genealogy and family connections to develop authentic characters and narratives',
        activities: [
          'Family story research and documentation',
          'Cultural identity exploration through writing',
          'Personal narrative development with cultural context',
        ],
      },
      {
        element: 'Mana',
        description: 'Exploring the power and authority of storytelling in Māori culture',
        languageConnection:
          'Understanding the responsibility and authority inherent in storytelling',
        activities: [
          'Storytelling protocols and cultural practices',
          'Cultural respect in writing and presentation',
          'Community storytelling and cultural sharing',
        ],
      },
    ],
  },

  {
    id: 'persuasive-writing-cultural-issues',
    title: 'Persuasive Writing: Contemporary Cultural Issues',
    focus: 'Persuasive Writing',
    duration: '3-4 weeks',
    objectives: [
      'Develop persuasive writing skills',
      'Understand contemporary Māori cultural issues',
      'Create compelling arguments with evidence',
      'Build awareness of cultural perspectives',
    ],
    teReoTerms: [
      'whakaaro - opinion/thought',
      'tautohe - to argue/debate',
      'mana - authority/credibility',
      'tika - right/correct',
      'he - wrong/incorrect',
      'tūmanako - hope/expectation',
    ],
    activities: [
      {
        title: 'Cultural Issues Research and Analysis',
        description:
          'Students research contemporary Māori cultural issues and develop informed opinions',
        duration: '3 lessons',
        materials: [
          'Current news articles and reports',
          'Cultural organization websites',
          'Research databases',
          'Note-taking templates',
          'Citation guides',
        ],
        instructions: [
          'Research contemporary Māori cultural issues',
          'Analyze different perspectives and viewpoints',
          'Develop informed personal opinions',
          'Collect evidence to support arguments',
          'Create research summaries with citations',
        ],
        teReoIntegration: [
          'Use "whakaaro" when discussing opinions',
          'Apply "tautohe" in argument development',
          'Consider "mana" when evaluating sources',
          'Discuss "tika" and "he" in moral arguments',
        ],
      },
    ],
    assessments: [
      {
        type: 'summative',
        title: 'Persuasive Essay on Cultural Issue',
        description: 'Students write persuasive essays on contemporary Māori cultural issues',
        criteria: [
          'Develops clear, compelling arguments',
          'Uses evidence effectively',
          'Incorporates Māori perspectives appropriately',
          'Demonstrates strong writing skills',
          'Shows cultural awareness and respect',
        ],
      },
    ],
    externalResources: [
      {
        title: 'Te Taura Whiri i te Reo Māori',
        url: 'https://www.tetaurawhiri.govt.nz/',
        type: 'website',
        description: 'Māori Language Commission resources and information',
        verified: true,
      },
      {
        title: 'Māori Television News',
        url: 'https://www.maoritelevision.com/news',
        type: 'website',
        description: 'Current news and issues from Māori perspective',
        verified: true,
      },
    ],
    culturalConnections: [
      {
        element: 'Mana',
        description: 'Understanding the authority and credibility in persuasive communication',
        languageConnection:
          'Building credibility and authority through respectful, informed argumentation',
        activities: [
          'Research credible sources and cultural authorities',
          'Develop respectful arguments that honor cultural perspectives',
          'Build authority through informed, culturally-aware writing',
        ],
      },
    ],
  },
];
