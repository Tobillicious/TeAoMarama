/**
 * 📚 EXPANDED NEW ZEALAND CURRICULUM CONTENT
 *
 * Comprehensive curriculum-aligned educational content for Te Ao Mārama
 * Based on NZ Curriculum Framework and Te Marautanga o Aotearoa
 * Real educational value for 20,000+ New Zealand teachers
 */

import { CurriculumLesson } from './nz-curriculum-lessons';

export class ExpandedNZCurriculum {
  private lessons: CurriculumLesson[] = [
    // YEAR 7-8 SOCIAL STUDIES
    {
      id: 'nz-hist-001',
      title: 'Early Māori Settlement in Aotearoa',
      level: 'Year 8',
      subject: 'social-studies',
      curriculumArea: 'Identity, Culture and Organisation',
      learningObjectives: [
        'Understand the patterns of early Māori settlement in Aotearoa',
        'Analyse the relationship between environment and settlement patterns',
        'Evaluate the impact of early settlement on the environment',
      ],
      culturalConnections: ['Whakapapa', 'Whenua', 'Tangata whenua', 'Kaitiakitanga'],
      activities: [
        {
          id: 'act-001',
          title: 'Migration Map Creation',
          description:
            'Students create detailed maps showing early migration routes and settlement patterns',
          type: 'creative',
          duration: 45,
          instructions: [
            'Research early Māori migration routes using archaeological evidence',
            'Create a detailed map showing major settlement areas',
            'Include environmental factors that influenced settlement choices',
            'Present findings to the class with cultural context',
          ],
          materials: ['Large paper', 'Coloured pencils', 'Research materials', 'Computer access'],
          culturalContext: 'Understanding the deep connection between Māori and the land (whenua)',
        },
      ],
      assessmentCriteria: [
        {
          id: 'assess-001',
          description: 'Demonstrates understanding of early Māori settlement patterns',
          level: 'achieved',
          rubric: [
            'Identifies major settlement areas',
            'Shows basic understanding of migration routes',
          ],
        },
      ],
      resources: ['NZ History website', 'Te Ara Encyclopedia', 'Local iwi resources'],
      duration: 180,
      difficulty: 'intermediate',
      maoriPerspective:
        'Explores the deep spiritual and practical connection between Māori and the land, emphasizing kaitiakitanga (guardianship)',
      pacificPerspective:
        'Connects to broader Pacific migration patterns and shared cultural values',
    },

    // YEAR 9-10 SCIENCE
    {
      id: 'nz-sci-001',
      title: 'Climate Change Impacts on Aotearoa',
      level: 'Year 10',
      subject: 'science',
      curriculumArea: 'Planet Earth and Beyond',
      learningObjectives: [
        'Understand the science behind climate change',
        'Analyse specific impacts on New Zealand ecosystems',
        'Evaluate adaptation and mitigation strategies',
      ],
      culturalConnections: ['Kaitiakitanga', 'Mauri', 'Whakapapa', 'Whenua'],
      activities: [
        {
          id: 'act-002',
          title: 'Local Climate Impact Study',
          description: 'Students investigate climate change impacts on their local environment',
          type: 'research',
          duration: 60,
          instructions: [
            'Research historical climate data for your region',
            'Interview local community members about environmental changes',
            'Document observed changes in local flora and fauna',
            'Create a presentation with recommendations for action',
          ],
          materials: [
            'Climate data access',
            'Interview equipment',
            'Camera',
            'Presentation software',
          ],
          culturalContext: 'Understanding our role as kaitiaki (guardians) of the environment',
        },
      ],
      assessmentCriteria: [
        {
          id: 'assess-002',
          description: 'Demonstrates understanding of climate change science and local impacts',
          level: 'achieved',
          rubric: [
            'Explains basic climate change mechanisms',
            'Identifies local impacts',
            'Suggests practical solutions',
          ],
        },
      ],
      resources: [
        'NIWA climate data',
        'Ministry for Environment resources',
        'Local council reports',
      ],
      duration: 240,
      difficulty: 'intermediate',
      maoriPerspective:
        'Emphasizes the Māori concept of kaitiakitanga and our responsibility to protect the environment for future generations',
      pacificPerspective:
        'Connects to Pacific Island nations facing immediate climate threats and adaptation strategies',
    },

    // YEAR 7-8 MATHEMATICS
    {
      id: 'nz-math-001',
      title: 'Probability and Statistics in Sports',
      level: 'Year 8',
      subject: 'mathematics',
      curriculumArea: 'Statistics and Probability',
      learningObjectives: [
        'Understand basic probability concepts',
        'Analyse sports statistics using appropriate methods',
        'Make predictions based on statistical data',
      ],
      culturalConnections: ['Whanaungatanga', 'Manaakitanga', 'Aroha'],
      activities: [
        {
          id: 'act-003',
          title: 'All Blacks Statistics Analysis',
          description: 'Students analyse All Blacks performance data to understand probability',
          type: 'practical',
          duration: 50,
          instructions: [
            'Collect All Blacks match statistics from recent seasons',
            'Calculate win probabilities for different scenarios',
            'Create graphs and charts to visualise the data',
            'Present findings with cultural context about teamwork',
          ],
          materials: ['All Blacks statistics', 'Calculator', 'Graph paper', 'Computer access'],
          culturalContext:
            'Understanding the importance of whanaungatanga (relationships) in team success',
        },
      ],
      assessmentCriteria: [
        {
          id: 'assess-003',
          description: 'Demonstrates understanding of probability and statistical analysis',
          level: 'achieved',
          rubric: [
            'Calculates basic probabilities correctly',
            'Creates appropriate graphs',
            'Makes reasonable predictions',
          ],
        },
      ],
      resources: ['All Blacks official statistics', 'NZ Rugby website', 'Statistical software'],
      duration: 150,
      difficulty: 'beginner',
      maoriPerspective:
        'Uses sports as a context to explore Māori values of teamwork, respect, and excellence',
      pacificPerspective: 'Connects to Pacific Island rugby traditions and community values',
    },

    // YEAR 9-10 ENGLISH
    {
      id: 'nz-eng-001',
      title: 'New Zealand Literature and Identity',
      level: 'Year 10',
      subject: 'english',
      curriculumArea: 'Making Meaning',
      learningObjectives: [
        'Analyse how New Zealand literature reflects national identity',
        'Understand the role of cultural perspectives in storytelling',
        'Create original writing that reflects New Zealand themes',
      ],
      culturalConnections: ['Whakapapa', 'Whanaungatanga', 'Mana', 'Tikanga'],
      activities: [
        {
          id: 'act-004',
          title: 'Cultural Storytelling Workshop',
          description:
            'Students explore storytelling traditions from different cultures in Aotearoa',
          type: 'creative',
          duration: 70,
          instructions: [
            'Read examples of Māori, Pākehā, and Pacific Island literature',
            'Identify common themes and unique perspectives',
            'Write a short story that reflects your cultural background',
            'Share stories with the class and discuss cultural themes',
          ],
          materials: [
            'NZ literature anthology',
            'Writing materials',
            'Cultural reference materials',
          ],
          culturalContext:
            'Understanding the importance of storytelling in preserving culture and identity',
        },
      ],
      assessmentCriteria: [
        {
          id: 'assess-004',
          description: 'Demonstrates understanding of NZ literature and cultural identity',
          level: 'achieved',
          rubric: [
            'Identifies cultural themes in literature',
            'Creates original writing with NZ themes',
            'Reflects on cultural identity',
          ],
        },
      ],
      resources: ['NZ literature anthology', 'Te Ara Encyclopedia', 'Local library resources'],
      duration: 200,
      difficulty: 'intermediate',
      maoriPerspective:
        'Emphasizes the oral tradition of Māori storytelling and its role in preserving culture',
      pacificPerspective:
        'Includes Pacific Island storytelling traditions and their influence on NZ literature',
    },

    // YEAR 7-8 HEALTH & PE
    {
      id: 'nz-health-001',
      title: 'Mental Health and Wellbeing in Aotearoa',
      level: 'Year 8',
      subject: 'health-pe',
      curriculumArea: 'Personal Health and Physical Development',
      learningObjectives: [
        'Understand factors that contribute to mental health and wellbeing',
        'Develop strategies for maintaining positive mental health',
        'Recognise when and how to seek help',
      ],
      culturalConnections: ['Wairua', 'Hauora', 'Mana', 'Aroha'],
      activities: [
        {
          id: 'act-005',
          title: 'Hauora Wheel Creation',
          description:
            'Students create personal hauora wheels showing their wellbeing across four dimensions',
          type: 'creative',
          duration: 40,
          instructions: [
            'Learn about the four dimensions of hauora (physical, mental, spiritual, social)',
            'Create a personal hauora wheel showing your current wellbeing',
            'Identify areas for improvement and set goals',
            'Share strategies for maintaining wellbeing with peers',
          ],
          materials: ['Paper', 'Coloured pencils', 'Hauora resources', 'Goal-setting templates'],
          culturalContext: 'Understanding the holistic Māori concept of health and wellbeing',
        },
      ],
      assessmentCriteria: [
        {
          id: 'assess-005',
          description: 'Demonstrates understanding of mental health and wellbeing concepts',
          level: 'achieved',
          rubric: [
            'Explains hauora concepts',
            'Creates personal wellbeing plan',
            'Identifies support strategies',
          ],
        },
      ],
      resources: [
        'Ministry of Health resources',
        'Mental Health Foundation',
        'School guidance counsellor',
      ],
      duration: 120,
      difficulty: 'beginner',
      maoriPerspective:
        'Uses the Māori concept of hauora to understand holistic health and wellbeing',
      pacificPerspective: 'Includes Pacific perspectives on mental health and community support',
    },

    // YEAR 9-10 ARTS
    {
      id: 'nz-arts-001',
      title: 'Contemporary Māori Art and Culture',
      level: 'Year 10',
      subject: 'arts',
      curriculumArea: 'Understanding Arts in Context',
      learningObjectives: [
        'Understand the evolution of Māori art from traditional to contemporary',
        'Analyse how contemporary Māori artists express cultural identity',
        'Create artwork that reflects personal and cultural identity',
      ],
      culturalConnections: ['Toi Māori', 'Whakapapa', 'Mana', 'Tikanga'],
      activities: [
        {
          id: 'act-006',
          title: 'Contemporary Māori Artist Study',
          description: 'Students research and present on contemporary Māori artists',
          type: 'research',
          duration: 60,
          instructions: [
            'Select a contemporary Māori artist to research',
            'Analyse their artwork and cultural themes',
            'Create a presentation about their artistic journey',
            'Create your own artwork inspired by their style and themes',
          ],
          materials: [
            'Artist resources',
            'Presentation software',
            'Art materials',
            'Computer access',
          ],
          culturalContext:
            'Understanding how contemporary Māori artists maintain cultural connection while expressing modern identity',
        },
      ],
      assessmentCriteria: [
        {
          id: 'assess-006',
          description:
            'Demonstrates understanding of contemporary Māori art and cultural expression',
          level: 'achieved',
          rubric: [
            'Analyses artist work and themes',
            'Creates original artwork with cultural elements',
            'Reflects on cultural identity in art',
          ],
        },
      ],
      resources: [
        'Te Papa collections',
        'Contemporary Māori artist websites',
        'Art galleries',
        'Cultural advisors',
      ],
      duration: 180,
      difficulty: 'intermediate',
      maoriPerspective:
        'Explores the continuity and evolution of Māori artistic traditions in contemporary contexts',
      pacificPerspective:
        'Includes Pacific art traditions and their influence on contemporary Māori art',
    },
  ];

  // Get all lessons
  getAllLessons(): CurriculumLesson[] {
    return this.lessons;
  }

  // Get lessons by level
  getLessonsByLevel(level: string): CurriculumLesson[] {
    return this.lessons.filter((lesson) => lesson.level === level);
  }

  // Get lessons by subject
  getLessonsBySubject(subject: string): CurriculumLesson[] {
    return this.lessons.filter((lesson) => lesson.subject === subject);
  }

  // Get lesson by ID
  getLessonById(id: string): CurriculumLesson | undefined {
    return this.lessons.find((lesson) => lesson.id === id);
  }

  // Search lessons
  searchLessons(query: string): CurriculumLesson[] {
    const lowerQuery = query.toLowerCase();
    return this.lessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(lowerQuery) ||
        lesson.curriculumArea.toLowerCase().includes(lowerQuery) ||
        lesson.learningObjectives.some((obj) => obj.toLowerCase().includes(lowerQuery)) ||
        lesson.culturalConnections.some((conn) => conn.toLowerCase().includes(lowerQuery)),
    );
  }

  // Get cultural content summary
  getCulturalContent(): Array<{ id: string; title: string; cultural: string[] }> {
    return this.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      cultural: lesson.culturalConnections,
    }));
  }

  // Get assessment summary
  getAssessmentSummary(): Array<{ id: string; title: string; assessments: number }> {
    return this.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      assessments: lesson.assessmentCriteria.length,
    }));
  }

  // Get curriculum coverage
  getCurriculumCoverage(): Record<string, number> {
    const coverage: Record<string, number> = {};
    this.lessons.forEach((lesson) => {
      coverage[lesson.curriculumArea] = (coverage[lesson.curriculumArea] || 0) + 1;
    });
    return coverage;
  }
}

// Export singleton instance
export const expandedNZCurriculum = new ExpandedNZCurriculum();
