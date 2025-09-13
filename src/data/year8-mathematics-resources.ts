// REAL Year 8 Mathematics Resources - New Zealand Applications
// Focus: Statistics and Probability using real New Zealand data

import { type NZCResource } from './nz-curriculum-year8';

export const newZealandDataResource: NZCResource = {
  id: "year8-nz-data-statistics-001",
  title: "Making Sense of Aotearoa: Statistics with Real New Zealand Data",
  learningArea: "Mathematics",
  yearLevel: 8,
  duration: "4 weeks (12 lessons)",
  objectives: [
    "Collect, organize, and interpret real New Zealand statistical data",
    "Use statistical measures to compare different regions and demographics in NZ",
    "Create and interpret graphs and charts using authentic data sources",
    "Apply probability concepts to real-world New Zealand scenarios"
  ],
  keyCompetencies: [
    "Using language, symbols and texts - Mathematical notation and statistical vocabulary",
    "Thinking - Logical reasoning and problem-solving with data",
    "Managing self - Planning statistical investigations and data collection",
    "Relating to others - Collaborative data analysis and presentation",
    "Participating and contributing - Using data to inform community decisions"
  ],
  content: {
    overview: `This unit uses authentic data from Statistics New Zealand, councils, and environmental agencies to teach statistical concepts. Students investigate real questions about New Zealand society, environment, and culture, learning to collect, analyze, and present data that matters to their communities. Through hands-on investigations with genuine New Zealand datasets, students develop statistical literacy while gaining deeper understanding of their country.`,
    activities: [
      {
        title: "NZ Census Data Investigation",
        description: "Students analyze real Census 2018 data to compare demographics across different New Zealand regions",
        duration: "4 x 50 minute lessons",
        materials: [
          "Statistics NZ Census 2018 data tables (age, ethnicity, household composition)",
          "Calculators and computers with spreadsheet software",
          "Maps of New Zealand regions and territorial authorities",
          "Graph paper and drawing materials",
          "Access to Statistics NZ website and NZ.Stat database"
        ],
        instructions: [
          "Introduction: What can census data tell us about New Zealand communities?",
          "Students choose two contrasting regions (e.g., Auckland vs West Coast, Northland vs Canterbury)",
          "Download and examine census data tables for chosen regions",
          "Calculate statistical measures: mean age, median household size, modal ethnicity",
          "Create comparative bar graphs and pie charts showing demographic differences",
          "Investigate reasons for demographic patterns (geography, economy, history)",
          "Present findings to class with predictions about future trends"
        ],
        differentiation: [
          "Provide pre-selected data tables for students needing support",
          "Offer choice of regions based on student interest or heritage",
          "Include visual mapping activities for spatial learners",
          "Support with step-by-step calculation guides and templates"
        ]
      },
      {
        title: "Climate Data Analysis - Is New Zealand Getting Warmer?",
        description: "Using NIWA climate data to investigate temperature trends across New Zealand cities",
        duration: "3 x 50 minute lessons",
        materials: [
          "NIWA temperature data for major NZ cities (1900-2020)",
          "Graphing calculators or computer graphing software",
          "Climate change information from NIWA and MfE",
          "Thermometers for classroom temperature monitoring",
          "Maps showing climate monitoring stations across New Zealand"
        ],
        instructions: [
          "Students collect daily classroom temperature data for comparison",
          "Examine historical temperature records from Auckland, Wellington, Christchurch, Dunedin",
          "Calculate mean annual temperatures for different decades",
          "Create line graphs showing temperature trends over 120 years",
          "Identify patterns and calculate rates of change",
          "Compare New Zealand trends with global climate data",
          "Research causes of temperature variations and climate change impacts"
        ],
        differentiation: [
          "Provide different complexity levels of data sets",
          "Include hands-on temperature measurement activities",
          "Offer collaborative graphing for students needing support",
          "Extension: statistical significance testing for advanced students"
        ]
      },
      {
        title: "Sports Statistics - All Blacks vs Other Nations",
        description: "Probability and statistics investigation using real rugby and cricket performance data",
        duration: "3 x 50 minute lessons",
        materials: [
          "All Blacks match results 2010-2024",
          "Black Caps cricket statistics",
          "International rugby and cricket rankings",
          "Probability simulation materials (dice, cards, spinners)",
          "Sports statistics websites and databases"
        ],
        instructions: [
          "Students research All Blacks win/loss record against different countries",
          "Calculate win percentages and create probability models",
          "Use probability to predict outcomes of future matches",
          "Compare predictions with actual results and analyze accuracy",
          "Investigate home vs away performance statistics",
          "Create probability games based on sports scenarios",
          "Analyze batting averages and bowling figures for Black Caps cricketers"
        ],
        differentiation: [
          "Include different sports based on student interest",
          "Provide calculation templates and worked examples",
          "Use physical probability activities for kinesthetic learners",
          "Extension: advanced probability distributions and confidence intervals"
        ]
      }
    ],
    assessments: [
      {
        type: 'summative',
        title: 'Statistical Investigation Report',
        description: 'Students complete independent investigation using real NZ data, including data collection, analysis, interpretation, and communication of findings',
        criteria: [
          'Poses appropriate statistical questions about New Zealand',
          'Collects or sources reliable data from appropriate sources',
          'Calculates statistical measures correctly and appropriately',
          'Creates clear, accurate graphs and visual representations',
          'Interprets results in context and draws reasonable conclusions',
          'Communicates findings clearly to intended audience'
        ],
        rubric: [
          {
            level: 'Excellence',
            description: 'Sophisticated statistical investigation with insightful analysis',
            indicators: [
              'Poses complex statistical questions that lead to meaningful insights',
              'Demonstrates advanced understanding of statistical concepts and measures',
              'Creates sophisticated visual displays that enhance understanding',
              'Shows deep insight into patterns and trends in New Zealand context',
              'Communicates findings with precision and clarity to diverse audiences'
            ]
          },
          {
            level: 'Merit',
            description: 'Competent statistical investigation with good analysis',
            indicators: [
              'Poses clear statistical questions relevant to New Zealand context',
              'Demonstrates good understanding of statistical concepts',
              'Creates appropriate graphs and visual displays',
              'Identifies clear patterns and trends in data',
              'Communicates findings clearly and accurately'
            ]
          },
          {
            level: 'Achieved', 
            description: 'Basic statistical investigation with some analysis',
            indicators: [
              'Poses simple statistical questions about New Zealand',
              'Shows basic understanding of statistical measures',
              'Creates simple but accurate graphs',
              'Identifies obvious patterns in data',
              'Communicates basic findings with some accuracy'
            ]
          }
        ]
      },
      {
        type: 'formative',
        title: 'Data Interpretation Skills Check',
        description: 'Regular assessment of ability to read and interpret graphs, tables, and statistical summaries from NZ sources',
        criteria: [
          'Correctly reads data from tables and graphs',
          'Calculates appropriate statistical measures',
          'Interprets statistical information in context',
          'Identifies appropriate and inappropriate conclusions'
        ]
      }
    ],
    resources: [
      {
        title: "Statistics New Zealand - NZ.Stat",
        url: "https://nzdotstat.stats.govt.nz/",
        type: "interactive",
        description: "Official database with comprehensive New Zealand statistics including census, economic, and social data",
        source: "Statistics New Zealand"
      },
      {
        title: "NIWA Climate Data Online",
        url: "https://cliflo.niwa.co.nz/",
        type: "website",
        description: "National Institute of Water and Atmospheric Research climate database with historical weather data",
        source: "National Institute of Water and Atmospheric Research"
      },
      {
        title: "Reserve Bank of New Zealand Data",
        url: "https://www.rbnz.govt.nz/statistics",
        type: "website", 
        description: "Economic statistics including inflation, interest rates, and financial indicators",
        source: "Reserve Bank of New Zealand"
      },
      {
        title: "New Zealand Rugby Statistics",
        url: "https://www.allblacks.com/Statistics/",
        type: "website",
        description: "Comprehensive statistics for All Blacks matches, player records, and performance data",
        source: "New Zealand Rugby"
      },
      {
        title: "StatsNZ Education Statistics",
        url: "https://www.educationcounts.govt.nz/",
        type: "website",
        description: "Educational statistics including school rolls, achievement data, and participation rates",
        source: "Ministry of Education"
      }
    ],
    culturalConnections: [
      {
        title: "Māori Statistical Concepts and Traditional Knowledge",
        description: "Understanding how traditional Māori knowledge systems included statistical thinking and data collection for resource management",
        tikangaAspect: "Maramataka (lunar calendar), whakapapa (genealogy), rāhui (conservation practices)",
        teReoVocabulary: [
          "Tatau - To count, enumerate",
          "Ine - To measure", 
          "Maramataka - Lunar calendar with statistical patterns",
          "Whakapapa - Genealogical data and relationships",
          "Taiao - Natural environment and data collection"
        ],
        culturalNarrative: "Traditional Māori society relied on careful observation and recording of patterns in nature, population, and resources. The maramataka (lunar calendar) represents sophisticated statistical understanding of cyclical patterns. Modern statistical analysis of New Zealand data continues this tradition of using quantitative information to make informed decisions about community wellbeing."
      }
    ]
  },
  realWorldConnections: [
    {
      title: "Statistics New Zealand Census",
      location: "Nationwide data collection every 5 years",
      description: "The official count of New Zealand's population, providing comprehensive demographic and social statistics",
      relevance: "Students can understand how they and their families contribute to national statistics and policy decisions",
      connections: [
        "Participating in future census as citizens",
        "Understanding how census data influences school funding and community services",
        "Seeing their local area represented in national statistics"
      ]
    },
    {
      title: "Local Council Data and Decision Making",
      location: "Regional and city councils across New Zealand", 
      description: "Councils use statistical data to make decisions about infrastructure, services, and community planning",
      relevance: "Students can see how statistical analysis directly affects their daily lives and communities",
      connections: [
        "Annual resident surveys and community consultation",
        "Transport planning and infrastructure decisions based on usage data",
        "Budget allocation using demographic and needs analysis"
      ]
    },
    {
      title: "Environmental Monitoring and Conservation",
      location: "DOC monitoring sites and environmental research stations",
      description: "Scientists collect statistical data to track environmental health and guide conservation efforts",
      relevance: "Students can understand how data science contributes to protecting New Zealand's unique environment",
      connections: [
        "Citizen science projects students can join",
        "School environmental monitoring programs",
        "Career pathways in environmental science and data analysis"
      ]
    }
  ],
  crossCurricularLinks: [
    {
      subject: "Science",
      connection: "Data collection and analysis in scientific investigations",
      sharedLearning: "Students use statistical methods to analyze experimental results and environmental data"
    },
    {
      subject: "Social Studies",
      connection: "Demographic and economic data about New Zealand society",
      sharedLearning: "Students use census and survey data to understand social patterns and regional differences"
    },
    {
      subject: "Health and Physical Education",
      connection: "Health statistics and sports performance analysis",
      sharedLearning: "Students analyze health trends and sports data to understand fitness and wellbeing patterns"
    },
    {
      subject: "Technology",
      connection: "Data collection tools and statistical software",
      sharedLearning: "Students use digital tools and apps to collect, organize, and analyze data"
    }
  ]
};

export const realMathematicsResources = [newZealandDataResource];