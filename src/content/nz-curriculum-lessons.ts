/**
 * 📚 REAL NEW ZEALAND CURRICULUM LESSONS
 * 
 * Actual curriculum-aligned educational content for Te Ao Mārama
 * Based on NZ Curriculum Framework and Te Marautanga o Aotearoa
 * NO PLACEHOLDERS - Real educational value
 */

export interface CurriculumLesson {
  id: string;
  title: string;
  level: string; // Year 1-13
  subject: 'english' | 'mathematics' | 'science' | 'social-studies' | 'health-pe' | 'arts' | 'technology';
  curriculumArea: string;
  learningObjectives: string[];
  culturalConnections: string[];
  activities: LessonActivity[];
  assessmentCriteria: AssessmentCriterion[];
  resources: string[];
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  maoriPerspective: string;
  pacificPerspective?: string;
}

export interface LessonActivity {
  id: string;
  title: string;
  description: string;
  type: 'discussion' | 'practical' | 'research' | 'creative' | 'assessment';
  duration: number;
  instructions: string[];
  materials: string[];
  culturalContext?: string;
}

export interface AssessmentCriterion {
  id: string;
  description: string;
  level: 'achieved' | 'merit' | 'excellence';
  rubric: string[];
}

export class NZCurriculumContent {
  private lessons: CurriculumLesson[] = [
    {
      id: 'nz-hist-001',
      title: 'Early Māori Settlement in Aotearoa',
      level: 'Year 8',
      subject: 'social-studies',
      curriculumArea: 'Social Studies - Identity, Culture and Organisation',
      learningObjectives: [
        'Understand the migration patterns of early Polynesian settlers',
        'Identify key archaeological evidence of early Māori settlement',
        'Analyze the adaptation strategies used by early Māori communities',
        'Evaluate the impact of settlement on the environment and culture'
      ],
      culturalConnections: [
        'Whakapapa (genealogy) and connection to Pacific ancestors',
        'Traditional navigation methods using stars and ocean patterns',
        'Relationship between tangata whenua and the natural environment',
        'Development of distinct Māori cultural practices in Aotearoa'
      ],
      activities: [
        {
          id: 'act-001',
          title: 'Migration Map Creation',
          description: 'Students create detailed maps showing Polynesian migration routes to Aotearoa',
          type: 'practical',
          duration: 45,
          instructions: [
            'Research traditional Polynesian navigation techniques',
            'Plot migration routes from various Pacific islands',
            'Include seasonal wind patterns and ocean currents',
            'Add cultural artifacts found at different settlement sites'
          ],
          materials: ['Large paper or digital mapping tool', 'Colored pencils', 'Reference materials', 'Archaeological evidence sheets'],
          culturalContext: 'Emphasize the incredible navigation skills of Polynesian ancestors and their deep understanding of natural patterns'
        },
        {
          id: 'act-002',
          title: 'Archaeological Evidence Analysis',
          description: 'Examine real archaeological findings from early settlement sites',
          type: 'research',
          duration: 60,
          instructions: [
            'Study photographs and descriptions of artifacts from sites like Wairau Bar',
            'Categorize findings into tools, ornaments, food remains, and structural evidence',
            'Draw conclusions about daily life, trade networks, and cultural practices',
            'Present findings to class with cultural context'
          ],
          materials: ['Archaeological evidence database', 'Classification worksheets', 'Presentation materials'],
          culturalContext: 'Respect for tīpuna (ancestors) and understanding that these artifacts represent real people and their lives'
        }
      ],
      assessmentCriteria: [
        {
          id: 'assess-001',
          description: 'Understanding of Migration Patterns',
          level: 'achieved',
          rubric: [
            'Identifies major Pacific islands involved in migration',
            'Describes basic navigation methods used',
            'Shows understanding of time periods involved'
          ]
        },
        {
          id: 'assess-002',
          description: 'Analysis of Cultural Adaptation',
          level: 'merit',
          rubric: [
            'Explains how Māori culture adapted to New Zealand environment',
            'Provides specific examples of environmental adaptation',
            'Connects archaeological evidence to cultural practices'
          ]
        },
        {
          id: 'assess-003',
          description: 'Critical Evaluation of Evidence',
          level: 'excellence',
          rubric: [
            'Critically evaluates reliability of different types of evidence',
            'Makes sophisticated connections between evidence and historical interpretations',
            'Demonstrates understanding of ongoing cultural significance'
          ]
        }
      ],
      resources: [
        'Museum of New Zealand Te Papa Tongarewa online collections',
        'New Zealand Archaeological Association resources',
        'Traditional navigation society materials',
        'Local iwi historical accounts (with appropriate permissions)'
      ],
      duration: 180, // 3 hour unit
      difficulty: 'intermediate',
      maoriPerspective: 'This lesson honors the extraordinary achievements of Polynesian ancestors who navigated vast ocean distances using traditional knowledge. It emphasizes the connection between past and present, and the ongoing importance of cultural knowledge and practices.',
      pacificPerspective: 'Acknowledges the shared Pacific heritage and the continued connections between Aotearoa and Pacific island nations'
    },
    {
      id: 'sci-eco-001',
      title: 'Native Forest Ecosystems of Aotearoa',
      level: 'Year 9',
      subject: 'science',
      curriculumArea: 'Science - Living World',
      learningObjectives: [
        'Identify key native species in New Zealand forest ecosystems',
        'Understand ecological relationships and food webs',
        'Analyze human impacts on native forests',
        'Evaluate conservation strategies and their effectiveness'
      ],
      culturalConnections: [
        'Māori understanding of forest as source of rongoā (medicine)',
        'Traditional sustainable harvesting practices',
        'Spiritual connection between Māori and ngahere (forest)',
        'Role of forests in cultural practices and identity'
      ],
      activities: [
        {
          id: 'sci-act-001',
          title: 'Forest Ecosystem Mapping',
          description: 'Create detailed ecosystem maps showing species relationships',
          type: 'practical',
          duration: 90,
          instructions: [
            'Identify native tree species (kauri, rimu, tōtara, etc.)',
            'Map understory plants and their relationships',
            'Include native bird species and their food sources',
            'Show predator-prey relationships and energy flows'
          ],
          materials: ['Field guides', 'Measuring tools', 'Cameras', 'Recording sheets'],
          culturalContext: 'Incorporate Māori names and traditional uses for all species identified'
        },
        {
          id: 'sci-act-002',
          title: 'Rongoā Research Project',
          description: 'Research traditional Māori medicine from forest plants',
          type: 'research',
          duration: 120,
          instructions: [
            'Research native plants used in traditional Māori medicine',
            'Understand the science behind their medicinal properties',
            'Compare traditional knowledge with modern scientific understanding',
            'Present findings with appropriate cultural protocols'
          ],
          materials: ['Rongoā databases', 'Scientific journals', 'Cultural consultation guidelines'],
          culturalContext: 'Work with local iwi or cultural advisors to ensure appropriate handling of traditional knowledge'
        }
      ],
      assessmentCriteria: [
        {
          id: 'sci-assess-001',
          description: 'Species Identification and Classification',
          level: 'achieved',
          rubric: [
            'Correctly identifies major native species',
            'Uses appropriate scientific and Māori names',
            'Understands basic ecological roles'
          ]
        },
        {
          id: 'sci-assess-002',
          description: 'Ecosystem Analysis',
          level: 'merit',
          rubric: [
            'Explains complex ecological relationships',
            'Analyzes human impacts with specific examples',
            'Proposes realistic conservation strategies'
          ]
        },
        {
          id: 'sci-assess-003',
          description: 'Cultural and Scientific Integration',
          level: 'excellence',
          rubric: [
            'Synthesizes traditional and scientific knowledge systems',
            'Evaluates conservation approaches from multiple perspectives',
            'Demonstrates deep understanding of cultural-environmental connections'
          ]
        }
      ],
      resources: [
        'Department of Conservation species databases',
        'Local iwi environmental management plans',
        'New Zealand native plant society resources',
        'Scientific research papers on NZ ecology'
      ],
      duration: 240, // 4 hour unit
      difficulty: 'intermediate',
      maoriPerspective: 'The forest is not just a collection of individual species but a living ecosystem with spiritual significance. Traditional ecological knowledge provides valuable insights that complement scientific understanding.',
      pacificPerspective: 'Connections to Pacific plant species and traditional ecological knowledge across Polynesia'
    },
    {
      id: 'math-stat-001',
      title: 'Statistics in New Zealand Context',
      level: 'Year 10',
      subject: 'mathematics',
      curriculumArea: 'Mathematics and Statistics - Statistics',
      learningObjectives: [
        'Collect and analyze statistical data relevant to New Zealand',
        'Understand measures of central tendency and spread',
        'Create and interpret various types of graphs and charts',
        'Make informed conclusions based on statistical evidence'
      ],
      culturalConnections: [
        'Analysis of New Zealand census data including Māori and Pacific populations',
        'Traditional Māori counting systems and data recording',
        'Statistical representation in relation to Treaty of Waitangi settlements',
        'Understanding bias in data collection and representation'
      ],
      activities: [
        {
          id: 'math-act-001',
          title: 'New Zealand Census Analysis',
          description: 'Analyze real census data to understand population trends',
          type: 'practical',
          duration: 90,
          instructions: [
            'Access Statistics New Zealand census data',
            'Focus on demographic changes over time',
            'Create various graphs showing population trends',
            'Analyze regional differences and cultural group representation'
          ],
          materials: ['Computers with internet access', 'Graphing software', 'Census data worksheets'],
          culturalContext: 'Discuss the importance of accurate representation of all cultural groups in national statistics'
        },
        {
          id: 'math-act-002',
          title: 'Sports Statistics Project',
          description: 'Analyze performance statistics from New Zealand sports teams',
          type: 'research',
          duration: 120,
          instructions: [
            'Choose a New Zealand sports team or athlete',
            'Collect performance data over multiple seasons',
            'Calculate relevant statistics (averages, ranges, etc.)',
            'Create visual representations of performance trends'
          ],
          materials: ['Sports databases', 'Calculators', 'Graphing materials'],
          culturalContext: 'Include discussion of cultural diversity in New Zealand sports and representation'
        }
      ],
      assessmentCriteria: [
        {
          id: 'math-assess-001',
          description: 'Data Collection and Organization',
          level: 'achieved',
          rubric: [
            'Collects appropriate and accurate data',
            'Organizes data in suitable formats',
            'Uses appropriate mathematical language'
          ]
        },
        {
          id: 'math-assess-002',
          description: 'Statistical Analysis',
          level: 'merit',
          rubric: [
            'Calculates measures of central tendency correctly',
            'Creates appropriate graphs and charts',
            'Makes valid comparisons between data sets'
          ]
        },
        {
          id: 'math-assess-003',
          description: 'Interpretation and Communication',
          level: 'excellence',
          rubric: [
            'Makes sophisticated interpretations of statistical results',
            'Communicates findings clearly with appropriate mathematical reasoning',
            'Considers limitations and potential bias in data'
          ]
        }
      ],
      resources: [
        'Statistics New Zealand (stats.govt.nz)',
        'New Zealand sports statistics databases',
        'Graphing calculators or software',
        'Real-world data sets relevant to students'
      ],
      duration: 200, // Multiple lessons over 2-3 weeks
      difficulty: 'intermediate',
      maoriPerspective: 'Statistics can be used to advocate for fair representation and understand the impacts of historical and contemporary policies on Māori communities.',
      pacificPerspective: 'Understanding how statistical representation affects Pacific communities in New Zealand and the importance of cultural competency in data interpretation'
    }
  ];

  getAllLessons(): CurriculumLesson[] {
    return this.lessons;
  }

  getLessonsByLevel(level: string): CurriculumLesson[] {
    return this.lessons.filter(lesson => lesson.level === level);
  }

  getLessonsBySubject(subject: string): CurriculumLesson[] {
    return this.lessons.filter(lesson => lesson.subject === subject);
  }

  getLesson(id: string): CurriculumLesson | undefined {
    return this.lessons.find(lesson => lesson.id === id);
  }

  searchLessons(query: string): CurriculumLesson[] {
    const searchTerm = query.toLowerCase();
    return this.lessons.filter(lesson => 
      lesson.title.toLowerCase().includes(searchTerm) ||
      lesson.subject.toLowerCase().includes(searchTerm) ||
      lesson.curriculumArea.toLowerCase().includes(searchTerm) ||
      lesson.learningObjectives.some(obj => obj.toLowerCase().includes(searchTerm)) ||
      lesson.culturalConnections.some(conn => conn.toLowerCase().includes(searchTerm))
    );
  }

  getLessonDuration(id: string): number {
    const lesson = this.getLesson(id);
    return lesson ? lesson.duration : 0;
  }

  getCulturalContent(): Array<{id: string; title: string; cultural: string[]}> {
    return this.lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      cultural: lesson.culturalConnections
    }));
  }
}

export const nzCurriculumContent = new NZCurriculumContent();