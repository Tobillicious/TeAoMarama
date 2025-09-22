// Year 8 Science Resources - Māori Perspectives on Science
// Authentic New Zealand Curriculum content with cultural integration

export interface ScienceResource {
  id: string;
  topic: string;
  title: string;
  duration: string;
  objectives: string[];
  teReoTerms: string[];
  activities: ScienceActivity[];
  assessments: ScienceAssessment[];
  externalResources: ExternalResource[];
  culturalConnections: CulturalConnection[];
}

export interface ScienceActivity {
  title: string;
  description: string;
  duration: string;
  materials: string[];
  instructions: string[];
  scientificMethod: string[];
}

export interface ScienceAssessment {
  type: 'formative' | 'summative' | 'practical';
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
  scientificConnection: string;
  activities: string[];
}

export const realScienceResources: ScienceResource[] = [
  {
    id: 'environmental-science-kaitiakitanga',
    title: 'Environmental Science: Māori Perspectives on Sustainability',
    topic: 'Environmental Science',
    duration: '5-6 weeks',
    objectives: [
      'Understand environmental systems and human impact',
      'Explore Māori environmental knowledge and practices',
      'Investigate sustainable solutions to environmental problems',
      'Develop critical thinking about environmental issues',
    ],
    teReoTerms: [
      'kaitiakitanga - guardianship',
      'taiao - environment',
      'mātauranga taiao - environmental knowledge',
      'whenua - land',
      'moana - sea/ocean',
      'rākau - trees/plants',
      'ngārara - insects/animals',
    ],
    activities: [
      {
        title: 'Kaitiakitanga in Action',
        description: 'Students investigate traditional and contemporary guardianship practices',
        duration: '4 lessons',
        materials: [
          'Local environmental data from DOC',
          'Traditional knowledge resources',
          'Field study equipment',
          'Digital recording devices',
          'Soil testing kits',
        ],
        instructions: [
          'Research traditional kaitiakitanga practices using DOC resources',
          'Identify local environmental challenges in the community',
          'Design solutions incorporating Māori environmental knowledge',
          'Create action plans for environmental protection',
          'Present findings to local community groups',
        ],
        scientificMethod: [
          'Observation of environmental conditions',
          'Hypothesis formation about environmental problems',
          'Data collection using scientific instruments',
          'Analysis of environmental data',
          'Conclusion and recommendations',
        ],
      },
      {
        title: 'Māra Kai (Traditional Gardens) Science',
        description: 'Students study the science behind traditional Māori gardening practices',
        duration: '3 lessons',
        materials: [
          'Traditional gardening tools',
          'Soil testing kits',
          'Plant specimens',
          'Māori gardening guides',
          'Composting materials',
        ],
        instructions: [
          'Study traditional Māori gardening techniques',
          'Analyze soil composition and plant relationships',
          'Experiment with companion planting methods',
          'Document scientific observations',
          'Compare traditional and modern approaches',
        ],
        scientificMethod: [
          'Observation of traditional gardening methods',
          'Hypothesis about plant relationships',
          'Experimental design for companion planting',
          'Data collection on plant growth',
          'Analysis and comparison of results',
        ],
      },
    ],
    assessments: [
      {
        type: 'formative',
        title: 'Environmental Knowledge Quiz',
        description:
          'Students demonstrate understanding of environmental concepts and Māori perspectives',
        criteria: [
          'Shows understanding of environmental systems',
          'Demonstrates knowledge of Māori environmental practices',
          'Explains connections between traditional and modern approaches',
          'Uses appropriate scientific vocabulary',
        ],
      },
      {
        type: 'summative',
        title: 'Environmental Action Project',
        description:
          'Students develop and present environmental solutions incorporating Māori knowledge',
        criteria: [
          'Identifies environmental problems accurately',
          'Incorporates Māori environmental knowledge',
          'Develops practical solutions',
          'Presents work effectively',
        ],
      },
    ],
    externalResources: [
      {
        title: 'DOC - Māori Environmental Knowledge',
        url: 'https://www.doc.govt.nz/about-us/science-publications/conservation-publications/nature/maori-environmental-knowledge/',
        type: 'website',
        description: 'Department of Conservation resources on Māori environmental knowledge',
        verified: true,
      },
      {
        title: 'Te Papa - Environmental Collections',
        url: 'https://collections.tepapa.govt.nz/topic/4452',
        type: 'website',
        description: 'Museum of New Zealand Te Papa Tongarewa environmental collections',
        verified: true,
      },
      {
        title: 'Landcare Research - Māori Environmental Research',
        url: 'https://www.landcareresearch.co.nz/science/maori-research',
        type: 'website',
        description: 'Scientific research on Māori environmental knowledge and practices',
        verified: true,
      },
    ],
    culturalConnections: [
      {
        element: 'Kaitiakitanga',
        description: 'Understanding guardianship and responsibility for the environment',
        scientificConnection:
          'Environmental science principles applied through cultural guardianship',
        activities: [
          'Environmental monitoring using traditional and modern methods',
          'Conservation planning incorporating cultural values',
          'Community action projects for environmental protection',
        ],
      },
      {
        element: 'Mana',
        description: 'Exploring the authority and respect inherent in environmental relationships',
        scientificConnection: 'Scientific authority balanced with cultural respect and protocols',
        activities: [
          'Respect protocols in environmental research',
          'Environmental ceremonies and cultural practices',
          'Community leadership in environmental action',
        ],
      },
    ],
  },

  {
    id: 'physics-maori-navigation',
    title: 'Physics and Māori Navigation',
    topic: 'Physics',
    duration: '3-4 weeks',
    objectives: [
      'Understand principles of waves and motion',
      'Explore traditional Māori navigation techniques',
      'Investigate the physics behind ocean navigation',
      'Connect scientific principles to cultural practices',
    ],
    teReoTerms: [
      'moana - ocean',
      'waka - canoe',
      'tai - tide',
      'noke - wave',
      'rā - sun',
      'marama - moon',
      'whetū - stars',
    ],
    activities: [
      {
        title: 'Ocean Waves and Traditional Navigation',
        description: 'Students investigate wave physics and traditional Māori ocean navigation',
        duration: '3 lessons',
        materials: [
          'Wave tank or large container',
          'Water and wave-making tools',
          'Traditional navigation charts',
          'Compass and navigation instruments',
          'Star charts and astronomical data',
        ],
        instructions: [
          'Study traditional Māori navigation techniques',
          'Investigate wave properties using wave tanks',
          'Measure wave frequency, amplitude, and wavelength',
          'Connect wave physics to ocean navigation',
          'Create models of traditional navigation methods',
        ],
        scientificMethod: [
          'Observation of wave properties',
          'Hypothesis about navigation techniques',
          'Experimental measurement of wave characteristics',
          'Data analysis of navigation accuracy',
          'Conclusion about physics in traditional navigation',
        ],
      },
    ],
    assessments: [
      {
        type: 'practical',
        title: 'Navigation Physics Experiment',
        description: 'Students conduct experiments on wave physics and navigation',
        criteria: [
          'Demonstrates understanding of wave properties',
          'Shows knowledge of traditional navigation',
          'Conducts accurate scientific measurements',
          'Connects physics to cultural practices',
        ],
      },
    ],
    externalResources: [
      {
        title: 'Te Papa - Māori Navigation Collections',
        url: 'https://collections.tepapa.govt.nz/topic/4453',
        type: 'website',
        description: 'Museum collections on traditional Māori navigation',
        verified: true,
      },
    ],
    culturalConnections: [
      {
        element: 'Mana',
        description: 'Understanding the authority and skill in traditional navigation',
        scientificConnection: 'Scientific knowledge combined with cultural authority in navigation',
        activities: [
          'Study navigation protocols and cultural practices',
          'Explore the mana of navigators and their knowledge',
          'Connect scientific understanding to cultural respect',
        ],
      },
    ],
  },
];
