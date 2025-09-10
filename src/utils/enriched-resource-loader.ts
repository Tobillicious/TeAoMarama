// Enriched Resource Loader - Loads actual enriched content for display

import lesson1755683030316 from '../content/lessons/lesson-1755683030316-kqepwjlxz.json';

export interface EnrichedResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  type: 'lesson' | 'activity' | 'assessment' | 'unit-plan' | 'multimedia';
  content: any; // The enriched JSON content
  culturalElements: number;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

// Sample enriched resources with actual content
export const SAMPLE_ENRICHED_RESOURCES: EnrichedResource[] = [
  {
    id: 'lesson-1755683030316-kqepwjlxz',
    title: "Year 8 Pāngarau: Te Awa o Mangakōtukutuku - Mapping Our River's Health",
    subject: 'Mathematics',
    yearLevel: 'Year 8',
    type: 'lesson',
    content: lesson1755683030316,
    culturalElements: 5,
    description:
      'A comprehensive mathematics lesson integrating kaitiakitanga and local environmental data collection.',
    duration: '3 weeks',
    difficulty: 'intermediate',
    tags: ['mathematics', 'environmental', 'kaitiakitanga', 'data-collection', 'local-context'],
  },
  {
    id: 'sample-social-studies',
    title: 'Year 9 Social Studies: Treaty of Waitangi - Understanding Our Foundation',
    subject: 'Social Studies',
    yearLevel: 'Year 9',
    type: 'lesson',
    content: {
      id: 'sample-social-studies',
      title: 'Year 9 Social Studies: Treaty of Waitangi - Understanding Our Foundation',
      type: 'lesson',
      subject: 'Social Studies',
      yearLevel: 'Year 9',
      culturalContext:
        'Understanding the Treaty of Waitangi as the foundation document of Aotearoa New Zealand, with specific focus on Ngāti Kahungunu perspectives and local historical connections.',
      learningObjectives: [
        'Understand the historical context and significance of the Treaty of Waitangi',
        'Analyze different perspectives on the Treaty and its implications',
        'Connect Treaty principles to contemporary New Zealand society',
        'Develop critical thinking skills about historical interpretation',
      ],
      activities: [
        {
          title: 'Whakawhanaungatanga: Our Connection to History',
          description:
            'Begin with a karakia and introduction to the significance of the Treaty in our local context. Students share what they already know about the Treaty.',
        },
        {
          title: 'Historical Context: Before the Treaty',
          description:
            'Explore the situation in Aotearoa in 1840, including Māori society, British interests, and the events leading to the Treaty.',
        },
        {
          title: 'Treaty Analysis: The Three Articles',
          description:
            'Examine the three articles of the Treaty, comparing English and Māori versions, and discussing different interpretations.',
        },
        {
          title: 'Contemporary Connections: Treaty Today',
          description:
            'Investigate how Treaty principles apply in modern New Zealand, including local examples and current issues.',
        },
        {
          title: 'Reflection: Our Understanding',
          description:
            'Students create a visual representation of their learning and discuss how the Treaty affects their lives today.',
        },
      ],
      resources: [
        'Treaty of Waitangi text (English and Māori versions)',
        'Historical maps and images',
        'Local kaumātua or historian (guest speaker)',
        'Contemporary news articles about Treaty issues',
        'Interactive timeline of Treaty events',
        'Video: "The Treaty Today" documentary',
      ],
      assessment: {
        type: 'Formative and Summative',
        tasks: [
          'Formative: Participation in discussions and activities',
          'Summative: Create a visual timeline showing key Treaty events and their significance',
          'Summative: Write a reflection on how Treaty principles apply to their community',
        ],
      },
      nzcAlignment: [
        'Social Sciences: Identity, Culture, and Organisation (Level 5)',
        'Social Sciences: Continuity and Change (Level 5)',
        'Te Tiriti o Waitangi: Partnership, Participation, and Protection',
      ],
      enrichedAt: new Date().toISOString(),
      enrichedBy: 'Aronui_Social_Studies_Specialist',
    },
    culturalElements: 5,
    description:
      'A comprehensive exploration of the Treaty of Waitangi with local Ngāti Kahungunu perspectives.',
    duration: '2 weeks',
    difficulty: 'intermediate',
    tags: [
      'social-studies',
      'treaty-of-waitangi',
      'history',
      'ngāti-kahungunu',
      'contemporary-issues',
    ],
  },
  {
    id: 'sample-science',
    title: 'Year 7 Science: Forces and Motion - Traditional Māori Engineering',
    subject: 'Science',
    yearLevel: 'Year 7',
    type: 'lesson',
    content: {
      id: 'sample-science',
      title: 'Year 7 Science: Forces and Motion - Traditional Māori Engineering',
      type: 'lesson',
      subject: 'Science',
      yearLevel: 'Year 7',
      culturalContext:
        'Exploring forces and motion through traditional Māori engineering and construction techniques, connecting scientific principles to cultural knowledge.',
      learningObjectives: [
        'Understand basic concepts of forces and motion',
        'Apply scientific principles to traditional Māori engineering',
        'Investigate how forces work in everyday objects',
        'Connect scientific learning to cultural knowledge and practices',
      ],
      activities: [
        {
          title: 'Whakawhanaungatanga: Forces in Our World',
          description:
            'Begin with observation of forces in the classroom and discussion of how Māori ancestors used forces in their engineering.',
        },
        {
          title: 'Traditional Engineering: Waka and Whare',
          description:
            'Explore how traditional waka and whare construction used forces and motion principles.',
        },
        {
          title: 'Hands-on Investigation: Building and Testing',
          description:
            'Students build simple structures and test how different forces affect them.',
        },
        {
          title: 'Modern Connections: Engineering Today',
          description:
            'Compare traditional and modern engineering techniques, identifying the same scientific principles.',
        },
        {
          title: 'Presentation: Our Engineering Solutions',
          description:
            'Students present their findings and explain how scientific principles apply to both traditional and modern engineering.',
        },
      ],
      resources: [
        'Traditional waka and whare construction videos',
        'Building materials for hands-on activities',
        'Local engineer or builder (guest speaker)',
        'Scientific equipment for measuring forces',
        'Books about traditional Māori engineering',
        'Digital tools for recording observations',
      ],
      assessment: {
        type: 'Formative and Summative',
        tasks: [
          'Formative: Observation during hands-on activities',
          'Summative: Design and test a simple structure using scientific principles',
          'Summative: Explain how traditional Māori engineering used the same scientific principles',
        ],
      },
      nzcAlignment: [
        'Science: Physical World - Forces and Motion (Level 4)',
        'Science: Nature of Science - Investigating in Science (Level 4)',
        'Technology: Technological Practice (Level 4)',
      ],
      enrichedAt: new Date().toISOString(),
      enrichedBy: 'Aronui_Science_Specialist',
    },
    culturalElements: 4,
    description:
      'A hands-on science lesson connecting forces and motion to traditional Māori engineering.',
    duration: '1 week',
    difficulty: 'beginner',
    tags: ['science', 'forces', 'motion', 'engineering', 'traditional-knowledge'],
  },
];

export function loadEnrichedResources(): EnrichedResource[] {
  // Add more sample resources to demonstrate the enrichment system
  const additionalResources: EnrichedResource[] = [
    {
      id: 'sample-reading-strategies',
      title: 'Year 8 Reading Strategies: Whakawhanaungatanga Through Literature',
      subject: 'English',
      yearLevel: 'Year 8',
      type: 'lesson',
      content: {
        id: 'sample-reading-strategies',
        title: 'Year 8 Reading Strategies: Whakawhanaungatanga Through Literature',
        type: 'lesson',
        subject: 'English',
        yearLevel: 'Year 8',
        culturalContext:
          'Building relationships through literature, connecting students to Māori and Pacific texts that reflect their identities and experiences.',
        learningObjectives: [
          'Develop critical reading strategies for diverse texts',
          'Connect personal experiences to literature',
          'Understand cultural perspectives in storytelling',
          'Build empathy through reading diverse voices',
        ],
        activities: [
          {
            title: 'Whakawhanaungatanga: Our Reading Stories',
            description:
              'Students share their reading experiences and connect to the power of storytelling in their own lives.',
          },
          {
            title: 'Cultural Text Analysis',
            description:
              'Analyze Māori and Pacific literature for cultural themes and perspectives.',
          },
          {
            title: 'Reading Strategy Workshop',
            description:
              'Learn and practice effective reading strategies for different text types.',
          },
          {
            title: 'Literature Circles',
            description:
              'Small group discussions about texts, focusing on cultural connections and personal responses.',
          },
        ],
        resources: [
          'Māori and Pacific literature collection',
          'Reading strategy guides',
          'Cultural context materials',
          'Discussion prompts and questions',
          'Reflection journals',
        ],
        assessment: {
          type: 'Formative and Summative',
          tasks: [
            'Formative: Participation in literature circles',
            'Summative: Analysis of cultural themes in selected texts',
            'Summative: Personal reflection on reading journey',
          ],
        },
        nzcAlignment: [
          'English: Reading (Level 5)',
          'English: Speaking, Writing, and Presenting (Level 5)',
          'Te Tiriti o Waitangi: Partnership and Participation',
        ],
        enrichedAt: new Date().toISOString(),
        enrichedBy: 'Aronui_English_Specialist',
      },
      culturalElements: 4,
      description:
        'A comprehensive reading program that builds relationships through literature and cultural understanding.',
      duration: '2 weeks',
      difficulty: 'intermediate',
      tags: ['english', 'reading', 'literature', 'cultural-connection', 'whakawhanaungatanga'],
    },
    {
      id: 'sample-art-cultural-expression',
      title: 'Year 7 Art: Cultural Expression Through Visual Arts',
      subject: 'Art',
      yearLevel: 'Year 7',
      type: 'lesson',
      content: {
        id: 'sample-art-cultural-expression',
        title: 'Year 7 Art: Cultural Expression Through Visual Arts',
        type: 'lesson',
        subject: 'Art',
        yearLevel: 'Year 7',
        culturalContext:
          'Exploring cultural identity through visual arts, connecting students to traditional and contemporary Māori and Pacific art forms.',
        learningObjectives: [
          'Understand cultural significance of visual arts',
          'Develop skills in traditional and contemporary art techniques',
          'Express personal cultural identity through art',
          'Respect and honor cultural art traditions',
        ],
        activities: [
          {
            title: 'Cultural Art Exploration',
            description:
              'Study traditional Māori and Pacific art forms and their cultural significance.',
          },
          {
            title: 'Contemporary Art Connections',
            description:
              'Explore how contemporary artists express cultural identity through modern techniques.',
          },
          {
            title: 'Personal Art Creation',
            description: 'Students create their own art pieces expressing their cultural identity.',
          },
          {
            title: 'Art Gallery and Sharing',
            description: 'Display and share artwork with the school community.',
          },
        ],
        resources: [
          'Traditional art examples and materials',
          'Contemporary art resources',
          'Art supplies and tools',
          'Cultural art books and videos',
          'Guest artist or cultural expert',
        ],
        assessment: {
          type: 'Formative and Summative',
          tasks: [
            'Formative: Participation in art exploration activities',
            'Summative: Creation of personal cultural art piece',
            'Summative: Reflection on cultural expression through art',
          ],
        },
        nzcAlignment: [
          'The Arts: Visual Arts (Level 4)',
          'The Arts: Understanding the Arts in Context (Level 4)',
          'Te Tiriti o Waitangi: Cultural Expression',
        ],
        enrichedAt: new Date().toISOString(),
        enrichedBy: 'Kaitiaki_Arts_Specialist',
      },
      culturalElements: 5,
      description:
        'An art program that honors cultural traditions while encouraging personal expression.',
      duration: '3 weeks',
      difficulty: 'beginner',
      tags: ['art', 'visual-arts', 'cultural-expression', 'identity', 'tradition'],
    },
  ];

  return [...SAMPLE_ENRICHED_RESOURCES, ...additionalResources];
}

export function getEnrichedResourceById(id: string): EnrichedResource | undefined {
  const allResources = loadEnrichedResources();
  return allResources.find((resource) => resource.id === id);
}
