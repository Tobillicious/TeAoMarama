// REAL Year 8 English Resources - New Zealand Literature and Language
// Focus: Reading authentic New Zealand texts and developing critical literacy

import { type NZCResource } from './nz-curriculum-year8';

export const newZealandLiteratureResource: NZCResource = {
  id: "year8-nz-literature-001",
  title: "Voices of Aotearoa: Contemporary New Zealand Short Stories",
  learningArea: "English",
  yearLevel: 8,
  duration: "6 weeks (18 lessons)",
  objectives: [
    "Analyze how New Zealand authors use language to express cultural identity",
    "Compare perspectives across different cultural backgrounds in NZ literature", 
    "Develop critical thinking skills through literary analysis",
    "Create original writing inspired by New Zealand settings and themes"
  ],
  keyCompetencies: [
    "Using language, symbols and texts - Literary analysis and creative writing",
    "Thinking - Critical analysis of themes, characters, and cultural contexts",
    "Relating to others - Understanding diverse cultural perspectives in literature",
    "Managing self - Independent reading and research skills",
    "Participating and contributing - Respectful discussion of cultural representations"
  ],
  content: {
    overview: `This unit explores contemporary New Zealand short stories that reflect our diverse cultural landscape. Students read works by Māori, Pacific, Asian-New Zealand, and Pākehā authors, analyzing how each writer uses language, setting, and character to explore themes of identity, belonging, and cultural heritage. Through close reading, creative response, and critical discussion, students develop appreciation for New Zealand's rich literary tradition while building sophisticated literacy skills.`,
    activities: [
      {
        title: "Patricia Grace Short Story Analysis",
        description: "Close reading of 'A Way of Talking' exploring Māori perspectives on identity and family dynamics",
        duration: "3 x 50 minute lessons",
        materials: [
          "'A Way of Talking' by Patricia Grace (from Selected Stories)",
          "Audio recording of Patricia Grace reading the story",
          "Background information on Patricia Grace and her writing",
          "Character analysis worksheets",
          "Māori cultural context resources"
        ],
        instructions: [
          "Begin with mihi (introduction) and acknowledgment of Māori as tangata whenua",
          "Introduce Patricia Grace as pioneering Māori writer - first published Māori woman in English",
          "Read story aloud with students following text, pausing for vocabulary/cultural references",
          "Identify key themes: code-switching, cultural identity, generational differences",
          "Analyze Grace's use of dialogue to show character perspectives and cultural tensions",
          "Discuss how the story reflects real experiences of Māori families in New Zealand",
          "Students create character maps showing internal conflicts and motivations"
        ],
        differentiation: [
          "Provide audio version for students with reading difficulties",
          "Include visual cultural context materials and maps",
          "Offer choice in response format (written, oral, visual, digital)",
          "Support with guided reading questions for complex passages",
          "Extension: research other Patricia Grace works and themes"
        ]
      },
      {
        title: "Albert Wendt Pacific Voices Project", 
        description: "Exploring Pacific Island identity in New Zealand through Wendt's 'Flying-Fox in a Freedom Tree'",
        duration: "4 x 50 minute lessons",
        materials: [
          "Selected passages from 'Flying-Fox in a Freedom Tree'",
          "Map of Pacific Islands and migration patterns to NZ",
          "Pacific cultural artifacts and images",
          "Interview clips with Albert Wendt",
          "Comparative texts from other Pacific NZ authors"
        ],
        instructions: [
          "Context setting: Pacific migration to New Zealand and cultural adaptation",
          "Read key passages exploring themes of displacement and cultural preservation",
          "Analyze Wendt's use of Pacific imagery and mythology in New Zealand setting",
          "Compare with students' own experiences of cultural adaptation/identity",
          "Research other Pacific New Zealand authors (Sia Figiel, Toa Fraser, Selina Tusitala Marsh)",
          "Create multimedia presentations on Pacific voices in NZ literature",
          "Explore how Pacific languages influence New Zealand English"
        ],
        differentiation: [
          "Include Pacific students as cultural experts and discussion leaders",
          "Provide visual supports for complex cultural concepts",
          "Offer collaborative options for research and presentation",
          "Connect to students' own cultural heritage through comparative writing"
        ]
      },
      {
        title: "Contemporary Urban Voices - Multicultural Auckland Stories",
        description: "Analysis of short stories reflecting Auckland's diverse cultural communities",
        duration: "3 x 50 minute lessons", 
        materials: [
          "Stories by Witi Ihimaera, Alice Tawhai, Renee Liang, Rajorshi Chakraborti",
          "Auckland demographic data and suburb profiles",
          "Student interviews with family members about migration/settlement",
          "Digital storytelling tools for creative responses"
        ],
        instructions: [
          "Survey: students identify their own cultural heritage and family migration stories",
          "Read diverse short stories set in contemporary Auckland/New Zealand",
          "Map story settings to actual Auckland locations students know",
          "Analyze how authors represent cultural diversity and urban life",
          "Interview family members about their settlement experiences in New Zealand",
          "Write and share original short stories based on family migration narratives",
          "Create 'Auckland Stories' digital collection showcasing class writing"
        ],
        differentiation: [
          "Encourage use of heritage languages in creative writing",
          "Provide family interview templates and recording equipment",
          "Offer multiple formats for final presentations",
          "Support English language learners with collaborative writing opportunities"
        ]
      }
    ],
    assessments: [
      {
        type: 'summative',
        title: 'Cultural Identity Essay',
        description: 'Students write a 600-word critical essay analyzing how two NZ authors from different cultural backgrounds explore themes of identity and belonging',
        criteria: [
          'Demonstrates close reading of literary texts',
          'Analyzes specific language techniques and their effects',
          'Shows understanding of cultural contexts and perspectives', 
          'Makes thoughtful comparisons between texts and authors',
          'Uses appropriate literary terminology and essay structure'
        ],
        rubric: [
          {
            level: 'Excellence',
            description: 'Sophisticated literary analysis with cultural insight',
            indicators: [
              'Demonstrates perceptive understanding of how authors use language to express cultural identity',
              'Makes sophisticated connections between texts, contexts, and personal experience',
              'Shows nuanced appreciation for different cultural perspectives',
              'Uses advanced literary terminology accurately and effectively'
            ]
          },
          {
            level: 'Merit',
            description: 'Clear analysis with good cultural understanding',
            indicators: [
              'Shows good understanding of how language reflects cultural identity',
              'Makes clear connections between texts and cultural contexts',
              'Demonstrates respectful awareness of cultural diversity',
              'Uses literary terminology appropriately'
            ]
          },
          {
            level: 'Achieved',
            description: 'Basic literary analysis with some cultural awareness',
            indicators: [
              'Shows basic understanding of themes and characters',
              'Identifies some cultural elements in texts',
              'Demonstrates awareness that authors write from different perspectives',
              'Uses simple literary terminology correctly'
            ]
          }
        ]
      },
      {
        type: 'formative',
        title: 'Creative Writing Portfolio',
        description: 'Students create original short stories or poems inspired by New Zealand settings and cultural experiences',
        criteria: [
          'Shows creative engagement with New Zealand themes and settings',
          'Demonstrates understanding of literary techniques studied',
          'Reflects personal/cultural perspective authentically',
          'Shows development and improvement over time'
        ]
      }
    ],
    resources: [
      {
        title: "New Zealand Book Council - NZ Authors",
        url: "https://www.bookcouncil.org.nz/writers",
        type: "website", 
        description: "Comprehensive database of New Zealand authors with biographies, book lists, and teaching resources",
        source: "New Zealand Book Council"
      },
      {
        title: "Auckland Writers Festival Education Programme",
        url: "https://www.aucklandwritersfestival.co.nz/schools-programme/",
        type: "website",
        description: "Annual festival with school programmes, author visits, and educational resources for NZ literature",
        source: "Auckland Writers Festival"
      },
      {
        title: "Te Papa Press Short Story Collection",
        url: "https://www.tepapa.govt.nz/discover-collections/read-watch-play/new-zealand-literature",
        type: "website",
        description: "Curated collection of New Zealand short stories with cultural and historical context",
        source: "Te Papa Tongarewa Museum"
      },
      {
        title: "Poetry Archive of New Zealand",
        url: "https://www.poetryarchive.org/explore/nz-poets/",
        type: "website",
        description: "Audio recordings of New Zealand poets reading their work with biographical information",
        source: "Poetry Archive"
      },
      {
        title: "New Zealand Literature File",
        url: "https://www.nzliterature.com/",
        type: "website",
        description: "Academic resource with critical essays, author interviews, and teaching guides for NZ literature",
        source: "New Zealand Literature File"
      }
    ],
    culturalConnections: [
      {
        title: "Oral Storytelling Traditions in New Zealand",
        description: "Understanding how Māori pūrākau (traditional stories) and Pacific oral traditions influence contemporary New Zealand writing",
        tikangaAspect: "Pūrākau (traditional stories), whakapapa (genealogy), kōrero (storytelling)",
        teReoVocabulary: [
          "Pūrākau - Traditional Māori stories",
          "Kōrero - To speak, tell stories",
          "Whakatōhea - Welcome, introduction", 
          "Whakapapa - Genealogy, connections",
          "Tangata whenua - People of the land"
        ],
        culturalNarrative: "Traditional Māori and Pacific storytelling emphasizes oral transmission, communal sharing, and the interconnectedness of past and present. Contemporary New Zealand authors often blend these oral traditions with written forms, creating unique narrative styles that honor ancestral storytelling while addressing modern themes."
      }
    ]
  },
  realWorldConnections: [
    {
      title: "New Zealand Book Awards and Literary Recognition",
      location: "Nationwide literary events and festivals",
      description: "Annual recognition of New Zealand authors through various literary prizes including the Ockham New Zealand Book Awards",
      relevance: "Students can follow contemporary literary culture and understand how New Zealand literature is celebrated and promoted",
      connections: [
        "Student book award voting programmes",
        "Local library author events and readings",
        "School visits from New Zealand authors and poets"
      ]
    },
    {
      title: "Auckland's Cultural Diversity in Literature",
      location: "Auckland suburbs and communities", 
      description: "New Zealand's largest city as setting for multicultural literature reflecting Asian, Pacific, Māori, and European communities",
      relevance: "Students can connect literature to real places and communities they know or can visit",
      connections: [
        "Literary walking tours of Auckland settings",
        "Community cultural festivals featuring storytelling",
        "Local multicultural bookshops and cultural centers"
      ]
    },
    {
      title: "Digital New Zealand Literature Platforms",
      location: "Online literary communities and publications",
      description: "Emerging digital platforms showcasing contemporary New Zealand voices including Turbine, Landfall, and Sport magazines",
      relevance: "Students can engage with living literary culture and potentially contribute their own writing",
      connections: [
        "Online student writing competitions and publications",
        "Social media literary communities and book clubs",
        "Digital storytelling platforms and podcasts"
      ]
    }
  ],
  crossCurricularLinks: [
    {
      subject: "Social Studies",
      connection: "Migration and settlement histories in New Zealand",
      sharedLearning: "Students explore how historical migration patterns are reflected in contemporary literature and personal narratives"
    },
    {
      subject: "Te Reo Māori",
      connection: "Understanding Māori concepts and worldview in English-language texts",
      sharedLearning: "Students learn key Māori terms and concepts that appear in New Zealand literature, deepening cultural understanding"
    },
    {
      subject: "Health and Physical Education",
      connection: "Identity, relationships, and wellbeing themes in literature",
      sharedLearning: "Students explore how literature addresses issues of mental health, cultural identity, and social relationships"
    },
    {
      subject: "The Arts",
      connection: "Creative expression through visual and performance arts",
      sharedLearning: "Students create visual art, drama performances, or multimedia projects inspired by literary texts and themes"
    }
  ]
};

export const realEnglishResources = [newZealandLiteratureResource];