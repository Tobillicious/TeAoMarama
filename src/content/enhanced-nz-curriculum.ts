/**
 * 🌿 ENHANCED NZ CURRICULUM CONTENT
 *
 * Comprehensive Year 8 Curriculum Lessons
 * Deep Cultural Integration & Authentic Educational Value
 * NZ Curriculum Statement Alignment
 */

export interface EnhancedCurriculumLesson {
  id: string;
  title: string;
  level: string;
  subject: string;
  curriculumArea: string;
  learningObjectives: string[];
  culturalConnections: {
    maoriPrinciples: string[];
    culturalValues: string[];
    communityConnections: string[];
  };
  activities: {
    title: string;
    description: string;
    duration: string;
    resources: string[];
    culturalIntegration: string;
  }[];
  assessmentCriteria: {
    achievementObjective: string;
    culturalAssessment: string;
    rubrics: {
      level: string;
      criteria: string;
      indicators: string[];
    }[];
  }[];
  resources: {
    type: 'text' | 'video' | 'audio' | 'interactive' | 'printable';
    title: string;
    description: string;
    url?: string;
    culturalRelevance: string;
  }[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  maoriPerspective: string;
  pacificPerspective: string;
  teacherNotes: {
    culturalConsiderations: string;
    differentiationStrategies: string;
    assessmentGuidance: string;
    communityConnections: string;
  };
}

export const enhancedNZCurriculum: EnhancedCurriculumLesson[] = [
  {
    id: 'enhanced-year8-reading-1',
    title: 'Te Ao Māori: Reading Through Cultural Lenses',
    level: 'Year 8',
    subject: 'English',
    curriculumArea: 'Reading',
    learningObjectives: [
      'Analyze how cultural context influences meaning in texts',
      'Apply tikanga Māori principles to text interpretation',
      'Evaluate the representation of Māori perspectives in literature',
      'Create culturally responsive reading responses',
      'Connect reading experiences to personal and community values',
    ],
    culturalConnections: {
      maoriPrinciples: ['manaakitanga', 'whanaungatanga', 'kotahitanga', 'rangatiratanga'],
      culturalValues: [
        'respect for cultural knowledge',
        'community responsibility',
        'intergenerational learning',
      ],
      communityConnections: [
        'local iwi partnerships',
        'cultural advisors',
        'community storytellers',
      ],
    },
    activities: [
      {
        title: 'Whakapapa Reading Journey',
        description:
          'Students trace the whakapapa (genealogy) of stories, understanding how narratives connect across generations and cultures.',
        duration: '45 minutes',
        resources: ['Traditional Māori stories', 'Family tree templates', 'Cultural mapping tools'],
        culturalIntegration:
          'Students explore how stories carry cultural knowledge and values across generations',
      },
      {
        title: 'Manaakitanga in Literature',
        description:
          'Analyze how hospitality and care are represented in texts, comparing Māori and Pākehā perspectives.',
        duration: '60 minutes',
        resources: [
          'Māori literature collection',
          'Comparative analysis frameworks',
          'Cultural value charts',
        ],
        culturalIntegration:
          'Deep exploration of manaakitanga as both cultural value and literary theme',
      },
      {
        title: 'Community Story Sharing',
        description:
          'Students share stories from their own cultural backgrounds, practicing respectful listening and cultural exchange.',
        duration: '90 minutes',
        resources: ['Storytelling guidelines', 'Cultural respect protocols', 'Recording equipment'],
        culturalIntegration:
          'Authentic cultural exchange and community building through shared stories',
      },
    ],
    assessmentCriteria: [
      {
        achievementObjective:
          'Students will demonstrate understanding of how cultural context shapes meaning',
        culturalAssessment:
          'Students show respect for diverse cultural perspectives and apply tikanga Māori principles in their analysis',
        rubrics: [
          {
            level: 'Achieved',
            criteria: 'Demonstrates basic understanding of cultural context',
            indicators: [
              'Identifies cultural elements in texts',
              'Shows respect for different perspectives',
              'Makes simple connections to personal experience',
            ],
          },
          {
            level: 'Merit',
            criteria: 'Applies cultural understanding to text analysis',
            indicators: [
              'Analyzes how culture influences meaning',
              'Demonstrates tikanga Māori principles',
              'Makes meaningful cultural connections',
            ],
          },
          {
            level: 'Excellence',
            criteria: 'Creates sophisticated cultural analysis with community connection',
            indicators: [
              'Synthesizes cultural perspectives',
              'Demonstrates deep cultural understanding',
              'Connects learning to community values',
            ],
          },
        ],
      },
    ],
    resources: [
      {
        type: 'text',
        title: 'Traditional Māori Stories Collection',
        description:
          'Curated collection of traditional stories with cultural context and teaching notes',
        culturalRelevance:
          'Authentic Māori narratives with proper cultural protocols and community approval',
      },
      {
        type: 'video',
        title: 'Elders Share Stories',
        description:
          'Video interviews with local elders sharing traditional stories and cultural knowledge',
        url: '/videos/elders-stories',
        culturalRelevance: 'Direct transmission of cultural knowledge from community elders',
      },
      {
        type: 'interactive',
        title: 'Cultural Context Explorer',
        description: 'Interactive tool for exploring how cultural context influences story meaning',
        culturalRelevance: 'Engages students in culturally responsive analysis methods',
      },
    ],
    duration: '4 weeks',
    difficulty: 'intermediate',
    maoriPerspective:
      'Reading is not just about decoding text, but about understanding the cultural knowledge and values embedded in stories. Traditional Māori stories carry important cultural teachings about relationships, responsibilities, and community values.',
    pacificPerspective:
      'Pacific cultures also emphasize the importance of oral storytelling and the transmission of cultural knowledge through narratives. Students explore connections between Māori and Pacific storytelling traditions.',
    teacherNotes: {
      culturalConsiderations:
        'Ensure all Māori content has proper cultural approval and community consultation. Respect cultural protocols around sharing traditional stories.',
      differentiationStrategies:
        'Provide multiple entry points for students from different cultural backgrounds. Use visual, auditory, and kinesthetic approaches to accommodate diverse learning styles.',
      assessmentGuidance:
        'Focus on cultural understanding and respect rather than just text analysis skills. Encourage students to share their own cultural perspectives.',
      communityConnections:
        'Partner with local iwi, cultural advisors, and community elders to provide authentic cultural experiences and validation.',
    },
  },
  {
    id: 'enhanced-year8-writing-1',
    title: 'Whakapapa Writing: Connecting Past, Present, and Future',
    level: 'Year 8',
    subject: 'English',
    curriculumArea: 'Writing',
    learningObjectives: [
      'Write narratives that honor cultural heritage and family stories',
      'Apply Māori writing conventions and cultural protocols',
      'Create texts that build community connections',
      'Use writing to explore and express cultural identity',
      'Develop voice and perspective in culturally responsive ways',
    ],
    culturalConnections: {
      maoriPrinciples: ['whakapapa', 'mana', 'tapu', 'noa'],
      culturalValues: [
        'respect for ancestors',
        'responsibility to future generations',
        'cultural continuity',
      ],
      communityConnections: ['family histories', 'cultural advisors', 'community archives'],
    },
    activities: [
      {
        title: 'Family Whakapapa Stories',
        description:
          'Students research and write about their family histories, connecting personal stories to broader cultural narratives.',
        duration: '120 minutes',
        resources: [
          'Family interview guides',
          'Cultural research protocols',
          'Digital storytelling tools',
        ],
        culturalIntegration:
          "Students learn about their own cultural heritage while respecting others' stories",
      },
      {
        title: 'Cultural Voice Development',
        description:
          'Students explore how to write authentically from their cultural perspective while respecting other cultures.',
        duration: '90 minutes',
        resources: ['Cultural voice examples', 'Writing style guides', 'Peer feedback protocols'],
        culturalIntegration: 'Development of authentic cultural voice in writing',
      },
      {
        title: 'Community Story Collection',
        description:
          'Students collect and document stories from community members, practicing respectful cultural documentation.',
        duration: '180 minutes',
        resources: ['Interview protocols', 'Recording equipment', 'Cultural consent forms'],
        culturalIntegration:
          'Students become cultural documentarians, learning protocols for respectful story collection',
      },
    ],
    assessmentCriteria: [
      {
        achievementObjective:
          'Students will write effectively for different purposes and audiences',
        culturalAssessment:
          'Students demonstrate cultural awareness and respect in their writing, connecting personal and community stories',
        rubrics: [
          {
            level: 'Achieved',
            criteria: 'Writes clear, engaging narratives with basic cultural awareness',
            indicators: [
              'Uses appropriate cultural language',
              'Shows respect for cultural differences',
              'Creates engaging personal stories',
            ],
          },
          {
            level: 'Merit',
            criteria: 'Writes sophisticated narratives with strong cultural connections',
            indicators: [
              'Integrates cultural knowledge effectively',
              'Demonstrates cultural sensitivity',
              'Creates meaningful community connections',
            ],
          },
          {
            level: 'Excellence',
            criteria:
              'Creates exceptional narratives that honor cultural heritage and inspire community connection',
            indicators: [
              'Demonstrates deep cultural understanding',
              'Creates powerful cultural connections',
              'Inspires others through authentic storytelling',
            ],
          },
        ],
      },
    ],
    resources: [
      {
        type: 'text',
        title: 'Cultural Writing Guidelines',
        description:
          'Comprehensive guide to writing respectfully about cultural topics and communities',
        culturalRelevance: 'Ensures students write with cultural sensitivity and respect',
      },
      {
        type: 'interactive',
        title: 'Digital Storytelling Platform',
        description: 'Interactive platform for creating multimedia cultural stories',
        culturalRelevance:
          'Allows students to create rich, culturally appropriate digital narratives',
      },
      {
        type: 'printable',
        title: 'Cultural Research Templates',
        description: 'Templates for conducting respectful cultural research and documentation',
        culturalRelevance:
          'Provides structured approach to cultural research with proper protocols',
      },
    ],
    duration: '5 weeks',
    difficulty: 'intermediate',
    maoriPerspective:
      'Writing is a way of preserving and transmitting cultural knowledge. Traditional Māori writing includes waiata (songs), whakataukī (proverbs), and pūrākau (stories) that carry important cultural teachings.',
    pacificPerspective:
      'Pacific cultures also have rich traditions of oral and written storytelling. Students explore how different Pacific cultures use writing to preserve and share cultural knowledge.',
    teacherNotes: {
      culturalConsiderations:
        'Ensure students understand the importance of cultural consent and respect when writing about cultural topics. Provide guidance on appropriate cultural protocols.',
      differentiationStrategies:
        'Allow students to choose their own cultural topics and writing formats. Provide support for students who may be hesitant to share personal cultural stories.',
      assessmentGuidance:
        'Focus on cultural respect and authentic voice development. Encourage students to explore their own cultural identity through writing.',
      communityConnections:
        'Partner with cultural advisors and community members to provide authentic cultural context and validation for student writing.',
    },
  },
  {
    id: 'enhanced-year8-social-studies-1',
    title: 'Te Tiriti o Waitangi: Understanding Our Shared History',
    level: 'Year 8',
    subject: 'Social Studies',
    curriculumArea: 'Identity, Culture, and Organisation',
    learningObjectives: [
      'Understand the historical context and significance of Te Tiriti o Waitangi',
      'Analyze how the Treaty affects contemporary New Zealand society',
      'Explore different perspectives on Treaty issues and relationships',
      'Develop skills in respectful dialogue about sensitive historical topics',
      'Connect Treaty learning to personal and community identity',
    ],
    culturalConnections: {
      maoriPrinciples: ['partnership', 'participation', 'protection', 'rangatiratanga'],
      culturalValues: ['honoring agreements', 'respectful relationships', 'justice and fairness'],
      communityConnections: [
        'local Treaty partnerships',
        'iwi relationships',
        'community dialogue',
      ],
    },
    activities: [
      {
        title: 'Treaty Timeline Investigation',
        description:
          'Students create comprehensive timelines showing Treaty events, impacts, and contemporary relevance.',
        duration: '90 minutes',
        resources: ['Historical documents', 'Timeline templates', 'Cultural context guides'],
        culturalIntegration:
          'Students understand Treaty history from both Māori and Crown perspectives',
      },
      {
        title: 'Contemporary Treaty Issues',
        description:
          'Students research and discuss current Treaty-related issues in New Zealand society.',
        duration: '120 minutes',
        resources: [
          'Current events sources',
          'Discussion protocols',
          'Multiple perspective guides',
        ],
        culturalIntegration:
          'Students engage with contemporary Treaty relationships and responsibilities',
      },
      {
        title: 'Community Treaty Relationships',
        description:
          'Students explore how their local community engages with Treaty relationships and partnerships.',
        duration: '150 minutes',
        resources: ['Community research guides', 'Interview protocols', 'Partnership examples'],
        culturalIntegration: 'Students connect Treaty learning to their own community context',
      },
    ],
    assessmentCriteria: [
      {
        achievementObjective: 'Students will understand how people organize themselves in groups',
        culturalAssessment:
          'Students demonstrate understanding of Treaty relationships and show respect for different cultural perspectives',
        rubrics: [
          {
            level: 'Achieved',
            criteria:
              'Demonstrates basic understanding of Treaty history and contemporary relevance',
            indicators: [
              'Identifies key Treaty events',
              'Shows respect for different perspectives',
              'Makes basic connections to contemporary issues',
            ],
          },
          {
            level: 'Merit',
            criteria: 'Analyzes Treaty relationships with cultural sensitivity',
            indicators: [
              'Analyzes Treaty impacts on society',
              'Demonstrates cultural respect',
              'Makes meaningful contemporary connections',
            ],
          },
          {
            level: 'Excellence',
            criteria:
              'Creates sophisticated analysis of Treaty relationships with community connection',
            indicators: [
              'Synthesizes complex Treaty issues',
              'Demonstrates deep cultural understanding',
              'Connects learning to community action',
            ],
          },
        ],
      },
    ],
    resources: [
      {
        type: 'text',
        title: 'Treaty of Waitangi Educational Resources',
        description:
          'Comprehensive collection of Treaty resources with multiple perspectives and cultural context',
        culturalRelevance: 'Provides balanced, culturally appropriate Treaty education materials',
      },
      {
        type: 'video',
        title: 'Contemporary Treaty Perspectives',
        description:
          'Video interviews with Māori and Pākehā perspectives on Treaty relationships today',
        url: '/videos/treaty-perspectives',
        culturalRelevance: 'Authentic contemporary voices on Treaty relationships',
      },
      {
        type: 'interactive',
        title: 'Treaty Impact Explorer',
        description:
          'Interactive tool for exploring Treaty impacts across different regions and communities',
        culturalRelevance:
          'Engages students in understanding local Treaty relationships and impacts',
      },
    ],
    duration: '6 weeks',
    difficulty: 'intermediate',
    maoriPerspective:
      'Te Tiriti o Waitangi represents a partnership between Māori and the Crown, establishing ongoing relationships and responsibilities. Understanding the Treaty is essential for understanding contemporary New Zealand society.',
    pacificPerspective:
      'Pacific peoples in New Zealand also have relationships with the Crown and understanding Treaty relationships helps inform broader discussions about cultural rights and responsibilities.',
    teacherNotes: {
      culturalConsiderations:
        'Treaty education requires careful cultural sensitivity and respect. Ensure all materials are culturally appropriate and provide balanced perspectives.',
      differentiationStrategies:
        'Provide multiple entry points for students from different cultural backgrounds. Use visual, interactive, and discussion-based approaches.',
      assessmentGuidance:
        'Focus on understanding and respect rather than memorization. Encourage students to explore their own connections to Treaty relationships.',
      communityConnections:
        'Partner with local iwi and cultural advisors to provide authentic Treaty education and community context.',
    },
  },
];

export default enhancedNZCurriculum;
