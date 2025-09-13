// REAL Year 8 Science Resources - New Zealand Curriculum aligned
// Focus: Living World - New Zealand Ecosystems and Conservation

import { type NZCResource } from './nz-curriculum-year8';

export const newZealandEcosystemsResource: NZCResource = {
  id: "year8-nz-ecosystems-001",
  title: "Protecting Our Unique Ecosystems: Kakapo Conservation and Biodiversity",
  learningArea: "Science",
  yearLevel: 8,
  duration: "5 weeks (15 lessons)",
  objectives: [
    "Understand how organisms in New Zealand ecosystems are interconnected",
    "Analyze the impact of introduced species on native biodiversity",
    "Evaluate conservation strategies protecting endangered New Zealand species",
    "Investigate adaptations that make New Zealand species unique"
  ],
  keyCompetencies: [
    "Thinking - Scientific inquiry and evidence-based reasoning",
    "Using language, symbols and texts - Scientific terminology and data interpretation",
    "Managing self - Planning and conducting investigations",
    "Relating to others - Collaborative fieldwork and research",
    "Participating and contributing - Environmental stewardship and action"
  ],
  content: {
    overview: `This unit explores New Zealand's unique ecosystems through the lens of conservation science, using the critically endangered kakapo as a flagship species. Students investigate how New Zealand's geographic isolation created unique evolutionary pressures, resulting in flightless birds, giant insects, and plants found nowhere else on Earth. Through hands-on investigations, field studies, and real data from conservation programs, students develop scientific inquiry skills while gaining deep appreciation for New Zealand's biodiversity and the urgent need for its protection.`,
    activities: [
      {
        title: "Kakapo Conservation Data Analysis",
        description: "Students analyze real data from the Kakapo Recovery Programme, tracking population changes, breeding success, and genetic diversity over the last 30 years",
        duration: "2 x 50 minute lessons",
        materials: [
          "Kakapo Recovery Programme population data (1989-2024)",
          "Spreadsheet software or graph paper",
          "Calculators",
          "Digital microscopes for examining kakapo feathers (if available)",
          "Videos from Sirocco the kakapo and conservation team interviews"
        ],
        instructions: [
          "Begin with whakatōhea (introduction) acknowledging Māori as tangata whenua and first conservationists",
          "Present population crisis: from 200+ kakapo in 1840s to just 51 in 1995",
          "Students plot population data on graphs, identifying key intervention points",
          "Analyze breeding success data - why do some years show zero chicks?",
          "Calculate population growth rates and project future scenarios",
          "Research individual kakapo stories (Sirocco, Richard Henry, etc.)",
          "Connect to genetic bottleneck concepts and inbreeding depression"
        ],
        differentiation: [
          "Provide pre-made graphs for students needing support with data plotting",
          "Include video content for visual learners and those with reading difficulties",
          "Offer advanced analysis of genetic diversity data for extension students",
          "Include Te Reo Māori names and cultural stories for all kakapo"
        ]
      },
      {
        title: "Predator Impact Investigation",
        description: "Field investigation comparing native bird populations in predator-controlled vs. non-controlled areas, analyzing real data from DOC monitoring sites",
        duration: "4 x 50 minute lessons (includes field trip)",
        materials: [
          "DOC bird monitoring data from local reserves",
          "Binoculars for bird identification",
          "Field notebooks and pencils",
          "Bird identification guides (NZ native species)",
          "Audio recordings of native bird calls",
          "Stoat/possum tracking tunnels and ink pads (demonstration only)"
        ],
        instructions: [
          "Pre-trip preparation: Learn to identify 10 common NZ native birds by sight and sound",
          "Visit local predator-controlled reserve (e.g., Zealandia, Bushy Park, Tiritiri Matangi)",
          "Conduct standardized 5-minute bird counts in designated areas",
          "Compare your data with historical monitoring data from same sites",
          "Examine predator control devices and tracking tunnels with guide",
          "Interview conservation rangers about day-to-day predator management",
          "Research costs of predator control per hectare and funding sources"
        ],
        differentiation: [
          "Provide laminated bird ID cards for field use",
          "Include audio components for students who identify birds better by sound",
          "Offer photography tasks for students interested in visual documentation",
          "Create collaborative data recording for students uncomfortable with individual tasks"
        ]
      },
      {
        title: "Native Plant Adaptation Study",
        description: "Investigation of unique adaptations in NZ native plants, focusing on why many lack thorns/poisons and how this relates to absence of native land mammals",
        duration: "3 x 50 minute lessons",
        materials: [
          "Live specimens or high-quality photos of NZ native plants",
          "Magnifying glasses",
          "Measuring tools (rulers, calipers)",
          "Comparative specimens from other countries (photos)",
          "Access to NZ Plant Portal online database",
          "Seeds from native plants for germination experiment"
        ],
        instructions: [
          "Examine physical characteristics of kawakawa, nikau palm, pohutukawa, rata, totara",
          "Compare with spiny/toxic plants from other countries (acacia, roses, poison ivy)",
          "Hypothesize why NZ plants lack these defensive adaptations",
          "Connect to historical absence of native land mammals (except bats)",
          "Investigate how introduced browsing animals (deer, goats, possums) damage natives",
          "Design experiment testing how native vs. exotic plants respond to simulated browsing",
          "Research Māori traditional uses of native plants and sustainable harvesting"
        ],
        differentiation: [
          "Provide tactile exploration opportunities for kinesthetic learners",
          "Include digital plant database exploration for tech-savvy students",
          "Offer artistic documentation through botanical illustration",
          "Connect to cultural knowledge through whakapapa (genealogy) of plants"
        ]
      }
    ],
    assessments: [
      {
        type: 'summative',
        title: 'Conservation Action Plan',
        description: 'Students create a detailed conservation plan for a threatened NZ species, including scientific rationale, practical strategies, and budget considerations',
        criteria: [
          'Demonstrates understanding of ecological relationships and threats',
          'Uses scientific evidence to support conservation strategies',
          'Shows awareness of practical implementation challenges',
          'Incorporates both scientific and cultural perspectives',
          'Presents realistic timeline and resource requirements'
        ],
        rubric: [
          {
            level: 'Excellence',
            description: 'Comprehensive plan with sophisticated understanding',
            indicators: [
              'Demonstrates deep understanding of species ecology and habitat requirements',
              'Integrates multiple conservation strategies with clear scientific justification',
              'Shows sophisticated awareness of social, economic, and cultural factors',
              'Presents realistic budget and timeline with contingency planning',
              'Incorporates both Western science and mātauranga Māori approaches'
            ]
          },
          {
            level: 'Merit',
            description: 'Well-developed plan with good scientific understanding',
            indicators: [
              'Shows good understanding of species threats and habitat needs',
              'Proposes appropriate conservation strategies with some justification',
              'Demonstrates awareness of implementation challenges',
              'Includes reasonable budget and timeline estimates',
              'Shows respect for cultural perspectives on conservation'
            ]
          },
          {
            level: 'Achieved',
            description: 'Basic conservation plan with fundamental understanding',
            indicators: [
              'Identifies main threats to chosen species',
              'Suggests basic conservation strategies',
              'Shows some understanding of costs and challenges',
              'Demonstrates awareness that conservation involves multiple approaches',
              'Shows basic respect for different perspectives on species protection'
            ]
          }
        ]
      },
      {
        type: 'formative',
        title: 'Field Investigation Report',
        description: 'Scientific report on bird monitoring data collected during field trip, comparing results with historical data and drawing conclusions about conservation success',
        criteria: [
          'Accurately records and presents field data',
          'Compares current data with historical trends',
          'Draws appropriate conclusions from evidence',
          'Uses scientific terminology correctly',
          'Identifies limitations and sources of error'
        ]
      }
    ],
    resources: [
      {
        title: "Kakapo Recovery Programme",
        url: "https://www.doc.govt.nz/our-work/kakapo-recovery/",
        type: "website",
        description: "Official DOC site with current population data, individual bird profiles, and conservation updates",
        source: "Department of Conservation"
      },
      {
        title: "iNaturalist New Zealand",
        url: "https://www.inaturalist.org/places/new-zealand",
        type: "interactive",
        description: "Citizen science platform where students can contribute biodiversity observations and access real occurrence data",
        source: "iNaturalist"
      },
      {
        title: "ZEALANDIA Ecosanctuary",
        url: "https://visitzealandia.com/",
        type: "website",
        description: "Wellington's ecosanctuary showcasing successful conservation and native species recovery",
        source: "ZEALANDIA"
      },
      {
        title: "Zealandia Ecosystem Restoration",
        url: "https://www.visitzealandia.com/Conservation-Education",
        type: "website", 
        description: "Case study of successful ecosystem restoration with before/after data and educational resources",
        source: "Zealandia Te Māra a Tāne"
      },
      {
        title: "NZ Plant Portal",
        url: "https://nzplants.auckland.ac.nz/",
        type: "website",
        description: "Comprehensive database of NZ native plants with photos, distribution maps, and ecological information",
        source: "University of Auckland"
      },
      {
        title: "Te Ara Encyclopedia - Native Birds",
        url: "https://teara.govt.nz/en/native-land-birds",
        type: "website",
        description: "Authoritative information on New Zealand native birds with historical and cultural context",
        source: "Te Ara - The Encyclopedia of New Zealand"
      }
    ],
    culturalConnections: [
      {
        title: "Māori as First Conservationists",
        description: "Understanding how traditional Māori resource management practices (rahui, mauri, tapu) provided sustainable conservation frameworks",
        tikangaAspect: "Rahui (temporary restrictions), mauri (life force), kaitiakitanga (guardianship)",
        teReoVocabulary: [
          "Kākāpō - Night parrot",
          "Taonga - Treasured possessions (including native species)",
          "Kaitiaki - Guardian, protector",
          "Mauri - Life force present in all living things",
          "Whakapapa - Genealogical connections between all life forms"
        ],
        culturalNarrative: "From a Māori worldview, all species have whakapapa (genealogical connections) with humans and each other. The concept of kaitiakitanga places responsibility on people to act as guardians rather than owners of the natural world. Traditional rahui could protect breeding areas or allow populations to recover, demonstrating sophisticated ecological understanding."
      }
    ]
  },
  realWorldConnections: [
    {
      title: "Sirocco the Kakapo Ambassador",
      location: "Stewart Island/Rakiura and Fiordland",
      description: "The world-famous kakapo who became an conservation ambassador through his interactions with humans and media appearances",
      relevance: "Students can follow real conservation success stories and understand how individual animals can inspire broader conservation efforts",
      connections: [
        "BBC documentaries featuring Sirocco and the conservation team",
        "Social media updates from current kakapo breeding seasons",
        "Conservation funding campaigns inspired by charismatic species"
      ]
    },
    {
      title: "Predator Free 2050 Initiative", 
      location: "Nationwide community projects",
      description: "Ambitious national goal to eliminate introduced predators from New Zealand by 2050, with local community trapping groups",
      relevance: "Students can participate in local predator control efforts and see how scientific research informs national policy",
      connections: [
        "Local trapping groups and volunteer opportunities",
        "Schools participating in predator monitoring programs",
        "Technology development for humane predator control"
      ]
    },
    {
      title: "Tiritiri Matangi Island Success Story",
      location: "Hauraki Gulf, Auckland",
      description: "Former farmland transformed into thriving native ecosystem through community restoration efforts since 1984",
      relevance: "Demonstrates how dedicated conservation can reverse ecosystem damage within human timeframes",
      connections: [
        "Volunteer restoration weekends students can join",
        "Before/after photos showing 40-year transformation",
        "Breeding programs for endangered species like takahe and kokako"
      ]
    }
  ],
  crossCurricularLinks: [
    {
      subject: "Mathematics",
      connection: "Population modeling and statistical analysis",
      sharedLearning: "Students use exponential growth/decay models to predict species population futures and analyze conservation intervention success rates"
    },
    {
      subject: "Social Studies", 
      connection: "Treaty principles and environmental management",
      sharedLearning: "Students explore how Treaty of Waitangi principles guide co-management of conservation areas between Māori and Crown agencies"
    },
    {
      subject: "English",
      connection: "Persuasive writing and conservation advocacy",
      sharedLearning: "Students write compelling conservation proposals, media releases, and funding applications using scientific evidence and emotional appeals"
    },
    {
      subject: "Technology",
      connection: "Conservation technology and monitoring devices",
      sharedLearning: "Students explore GPS tracking, remote cameras, acoustic monitoring, and genetic analysis technologies used in modern conservation"
    }
  ]
};

export const realScienceResources = [newZealandEcosystemsResource];