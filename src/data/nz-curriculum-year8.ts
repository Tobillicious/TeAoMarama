// REAL New Zealand Curriculum Year 8 Resources
// Based on official NZC learning areas and achievement objectives

export interface NZCResource {
  id: string;
  title: string;
  learningArea: string;
  yearLevel: number;
  duration: string;
  objectives: string[];
  keyCompetencies: string[];
  content: {
    overview: string;
    activities: Activity[];
    assessments: Assessment[];
    resources: ExternalResource[];
    culturalConnections: CulturalConnection[];
  };
  realWorldConnections: RealWorldExample[];
  crossCurricularLinks: CrossCurricularLink[];
}

export interface Activity {
  title: string;
  description: string;
  duration: string;
  materials: string[];
  instructions: string[];
  differentiation: string[];
}

export interface Assessment {
  type: 'formative' | 'summative' | 'peer' | 'self';
  title: string;
  description: string;
  criteria: string[];
  rubric?: RubricLevel[];
}

export interface RubricLevel {
  level: string;
  description: string;
  indicators: string[];
}

export interface ExternalResource {
  title: string;
  url: string;
  type: 'video' | 'website' | 'document' | 'interactive';
  description: string;
  source: string;
}

export interface CulturalConnection {
  title: string;
  description: string;
  tikangaAspect: string;
  teReoVocabulary: string[];
  culturalNarrative: string;
}

export interface RealWorldExample {
  title: string;
  location: string;
  description: string;
  relevance: string;
  connections: string[];
}

export interface CrossCurricularLink {
  subject: string;
  connection: string;
  sharedLearning: string;
}

// ACTUAL CONTENT - Year 8 Social Studies: Early New Zealand History
export const earlyNZHistoryResource: NZCResource = {
  id: "year8-early-nz-history-001",
  title: "Te Tiriti o Waitangi and Early Colonial New Zealand",
  learningArea: "Social Studies",
  yearLevel: 8,
  duration: "4 weeks (12 lessons)",
  objectives: [
    "Understand how the Treaty of Waitangi is foundational to New Zealand's development as a nation",
    "Explore different perspectives on the signing of Te Tiriti o Waitangi", 
    "Analyze the impact of European settlement on Māori communities",
    "Evaluate the ongoing significance of Te Tiriti in contemporary New Zealand"
  ],
  keyCompetencies: [
    "Thinking - Critical analysis of historical perspectives",
    "Using language, symbols and texts - Interpreting historical documents", 
    "Managing self - Independent research skills",
    "Relating to others - Understanding different cultural viewpoints",
    "Participating and contributing - Engaging in respectful debate"
  ],
  content: {
    overview: `This unit explores the pivotal period of early European contact with New Zealand, focusing on Te Tiriti o Waitangi as a foundational document. Students will examine multiple perspectives on this crucial historical event, understanding both Māori and European viewpoints. Through authentic documents, oral histories, and contemporary analysis, students develop critical thinking skills while gaining deep appreciation for New Zealand's bicultural foundation.`,
    activities: [
      {
        title: "Te Tiriti Document Analysis",
        description: "Students examine original Te Tiriti text alongside English Treaty version, identifying key differences and implications",
        duration: "90 minutes",
        materials: [
          "Facsimile copies of Te Tiriti o Waitangi (Māori text)",
          "English Treaty of Waitangi text", 
          "Magnifying glasses for document examination",
          "Translation comparison worksheets",
          "Access to Archives New Zealand online resources"
        ],
        instructions: [
          "Begin with karakia and acknowledgment of tangata whenua",
          "Present both documents side-by-side without initial explanation",
          "Students work in pairs to identify visible differences",
          "Use guided questions to analyze language, presentation, and cultural context",
          "Groups present findings on key discrepancies",
          "Teacher facilitates discussion on implications of these differences"
        ],
        differentiation: [
          "Provide simplified language versions for students with reading difficulties",
          "Use visual aids and diagrams for kinesthetic learners",
          "Offer extension activities for advanced students (treaty principles research)",
          "Include audio recordings of te reo pronunciation"
        ]
      },
      {
        title: "Waitangi Day Perspectives Project",
        description: "Students research and present different viewpoints on how Waitangi Day should be commemorated in New Zealand",
        duration: "3 x 50 minute lessons",
        materials: [
          "Access to newspapers, online articles from multiple sources",
          "Video interviews with diverse New Zealanders",
          "Presentation software or poster materials",
          "Recording equipment for oral presentations"
        ],
        instructions: [
          "Students choose from perspectives: Māori activist, Pākehā historian, recent immigrant, young New Zealander",
          "Research authentic viewpoints through interviews, articles, social media",
          "Create 5-minute presentations explaining their assigned perspective",
          "Include personal reflection on which viewpoint resonates most and why",
          "Class discussion on finding common ground while respecting differences"
        ],
        differentiation: [
          "Allow choice in presentation format (oral, visual, written, digital)",
          "Provide structured research templates for students needing guidance",
          "Encourage bilingual presentations incorporating te reo Māori",
          "Offer collaborative options for students who work better in groups"
        ]
      }
    ],
    assessments: [
      {
        type: 'summative',
        title: 'Treaty Impact Essay',
        description: 'Students write a 500-word essay analyzing the ongoing impact of Te Tiriti o Waitangi on contemporary New Zealand society',
        criteria: [
          'Demonstrates understanding of historical context',
          'Analyzes multiple perspectives on Treaty significance', 
          'Uses specific examples from New Zealand today',
          'Shows awareness of cultural sensitivities',
          'Uses appropriate historical terminology'
        ],
        rubric: [
          {
            level: 'Excellence',
            description: 'Sophisticated analysis with nuanced understanding',
            indicators: [
              'Demonstrates deep understanding of Treaty principles',
              'Skillfully analyzes contemporary Treaty settlements',
              'Shows sophisticated awareness of ongoing debates',
              'Uses advanced historical thinking skills'
            ]
          },
          {
            level: 'Merit', 
            description: 'Clear understanding with good analysis',
            indicators: [
              'Shows good understanding of Treaty significance',
              'Identifies key contemporary examples',
              'Demonstrates awareness of different perspectives',
              'Uses historical evidence appropriately'
            ]
          },
          {
            level: 'Achieved',
            description: 'Basic understanding of Treaty importance',
            indicators: [
              'Shows basic knowledge of Treaty signing',
              'Identifies some contemporary connections',
              'Shows some awareness of different viewpoints',
              'Uses simple historical evidence'
            ]
          }
        ]
      }
    ],
    resources: [
      {
        title: "Te Tiriti o Waitangi Original Documents",
        url: "https://www.archives.govt.nz/discover-our-stories/the-treaty-of-waitangi/the-sheets-and-signatures-of-te-tiriti-o-waitangi",
        type: "website", 
        description: "Official government archives with high-resolution images of original Treaty documents and detailed historical context",
        source: "Archives New Zealand"
      },
      {
        title: "What Te Tiriti o Waitangi Says in English and Te Reo Māori", 
        url: "https://www.archives.govt.nz/discover-our-stories/the-treaty-of-waitangi/what-te-tiriti-o-waitangi-says-in-english-and-te-reo-maori",
        type: "website",
        description: "Side-by-side comparison of the Māori and English versions with detailed analysis of differences",
        source: "Archives New Zealand"
      },
      {
        title: "Waitangi Tribunal Reports", 
        url: "https://www.waitangitribunal.govt.nz/en/publications/tribunal-reports",
        type: "website",
        description: "Contemporary Treaty settlement processes and Tribunal findings on historical and modern Treaty claims",
        source: "Waitangi Tribunal"
      },
      {
        title: "Te Papa Treaty Exhibition Online",
        url: "https://tepapa.govt.nz/discover-collections/read-watch-play/treaty-waitangi",
        type: "interactive",
        description: "Interactive online exhibition with artifacts, stories, and multimedia presentations about the Treaty",
        source: "Te Papa Tongarewa Museum"
      }
    ],
    culturalConnections: [
      {
        title: "Tikanga Māori in Treaty Negotiations",
        description: "Understanding how Māori customs and protocols influenced the Treaty signing process and continue to shape its interpretation",
        tikangaAspect: "Hui (gathering), whakapapa (genealogy), manaakitanga (hospitality)",
        teReoVocabulary: [
          "Te Tiriti o Waitangi - The Treaty of Waitangi",
          "Rangatira - Chief",
          "Tāngata whenua - People of the land", 
          "Kāwanatanga - Governance",
          "Tino rangatiratanga - Sovereignty/Self-determination"
        ],
        culturalNarrative: "From a Māori worldview, Te Tiriti was understood as creating a relationship between peoples, not a surrender of sovereignty. The concept of tino rangatiratanga encompasses not just political authority but spiritual and cultural autonomy over ancestral lands and taonga."
      }
    ]
  },
  realWorldConnections: [
    {
      title: "Waitangi Day Commemorations", 
      location: "Waitangi, Bay of Islands",
      description: "Annual February 6th commemorations at the Treaty Grounds, including dawn ceremony, cultural performances, and political speeches",
      relevance: "Students can observe how historical events continue to shape national identity and contemporary political discourse",
      connections: [
        "Media coverage of different perspectives on Waitangi Day celebrations",
        "Political speeches and debates about Treaty partnership",
        "Cultural protocols and ceremonies that honor the Treaty signing"
      ]
    },
    {
      title: "Contemporary Treaty Settlements",
      location: "Various iwi across New Zealand",
      description: "Ongoing Treaty settlement processes with iwi such as Tainui, Ngāi Tahu, and Tūhoe, addressing historical grievances",
      relevance: "Shows how historical injustices are being addressed through modern legal and political processes",
      connections: [
        "Legal processes in Treaty settlements",
        "Economic development through settlement assets",
        "Cultural revitalization and language preservation initiatives"
      ]
    }
  ],
  crossCurricularLinks: [
    {
      subject: "English",
      connection: "Language analysis of Treaty texts",
      sharedLearning: "Students analyze how word choice, translation, and cultural context affect meaning in historical documents"
    },
    {
      subject: "Te Reo Māori",
      connection: "Understanding te reo vocabulary and concepts in Treaty",
      sharedLearning: "Students learn key Māori terms and concepts that don't translate directly to English, deepening cultural understanding"
    },
    {
      subject: "Geography", 
      connection: "Mapping iwi territories and Treaty signing locations",
      sharedLearning: "Students create maps showing pre-European Māori territories and how these relate to modern boundaries and Treaty settlements"
    }
  ]
};

// Import other subject resources
import { realScienceResources } from './year8-science-resources';
import { realEnglishResources } from './year8-english-resources';
import { realMathematicsResources } from './year8-mathematics-resources';

// Export for immediate use - combining all real resources
export const realTeachingResources = [
  earlyNZHistoryResource,
  ...realScienceResources,
  ...realEnglishResources,
  ...realMathematicsResources
];