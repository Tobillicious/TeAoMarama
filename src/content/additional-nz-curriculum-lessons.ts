/**
 * 📚 ADDITIONAL NEW ZEALAND CURRICULUM LESSONS
 * 
 * Extended curriculum-aligned educational content for Te Ao Mārama
 * Expanding coverage across all subjects and year levels
 * Authentic Te Ao Māori integration throughout
 */

import { CurriculumLesson } from './nz-curriculum-lessons';

export class AdditionalNZCurriculum {
  private lessons: CurriculumLesson[] = [
    // YEAR 7-8 MATHEMATICS
    {
      id: 'nz-math-002',
      title: 'Algebraic Patterns in Māori Art',
      level: 'Year 8',
      subject: 'mathematics',
      curriculumArea: 'Number and Algebra',
      learningObjectives: [
        'Identify and extend algebraic patterns',
        'Create algebraic expressions from visual patterns',
        'Connect mathematical concepts to cultural art forms'
      ],
      culturalConnections: ['Toi Māori', 'Whakapapa', 'Mana', 'Tikanga'],
      activities: [
        {
          id: 'act-math-001',
          title: 'Kōwhaiwhai Pattern Analysis',
          description: 'Students analyze traditional Māori kōwhaiwhai patterns to identify mathematical sequences',
          type: 'practical',
          duration: 50,
          instructions: [
            'Examine traditional kōwhaiwhai patterns from meeting houses',
            'Identify repeating sequences and mathematical patterns',
            'Create algebraic expressions for the patterns found',
            'Design your own kōwhaiwhai pattern using mathematical principles'
          ],
          materials: ['Kōwhaiwhai pattern examples', 'Graph paper', 'Coloured pencils', 'Calculator'],
          culturalContext: 'Understanding the mathematical beauty in traditional Māori art forms'
        }
      ],
      assessmentCriteria: [
        {
          id: 'assess-math-002',
          description: 'Demonstrates understanding of algebraic patterns in cultural context',
          level: 'achieved',
          rubric: [
            'Identifies patterns in kōwhaiwhai designs',
            'Creates basic algebraic expressions',
            'Shows cultural appreciation for Māori art'
          ]
        }
      ],
      resources: ['Te Papa kōwhaiwhai collection', 'Māori meeting house resources', 'Algebraic pattern worksheets'],
      duration: 120,
      difficulty: 'intermediate',
      maoriPerspective: 'Explores the mathematical principles embedded in traditional Māori art and design',
      pacificPerspective: 'Connects to Pacific Island geometric patterns and mathematical traditions'
    },

    // YEAR 9-10 SCIENCE
    {
      id: 'nz-sci-002',
      title: 'Traditional Māori Medicine and Modern Science',
      level: 'Year 10',
      subject: 'science',
      curriculumArea: 'Living World',
      learningObjectives: [
        'Understand the scientific basis of traditional rongoā (Māori medicine)',
        'Analyze the relationship between traditional knowledge and modern science',
        'Evaluate the importance of preserving traditional knowledge'
      ],
      culturalConnections: ['Rongoā', 'Kaitiakitanga', 'Mauri', 'Whenua'],
      activities: [
        {
          id: 'act-sci-002',
          title: 'Rongoā Plant Investigation',
          description: 'Students research traditional Māori medicinal plants and their scientific properties',
          type: 'research',
          duration: 70,
          instructions: [
            'Research traditional uses of native plants in Māori medicine',
            'Investigate the scientific compounds found in these plants',
            'Compare traditional knowledge with modern scientific understanding',
            'Create a presentation showing the connection between rongoā and science'
          ],
          materials: ['Native plant identification guides', 'Scientific research papers', 'Computer access', 'Presentation software'],
          culturalContext: 'Understanding the scientific wisdom embedded in traditional Māori knowledge'
        }
      ],
      assessmentCriteria: [
        {
          id: 'assess-sci-002',
          description: 'Demonstrates understanding of traditional knowledge and modern science',
          level: 'achieved',
          rubric: [
            'Explains traditional uses of medicinal plants',
            'Identifies scientific compounds and their effects',
            'Shows respect for traditional knowledge systems'
          ]
        }
      ],
      resources: ['Rongoā research papers', 'Native plant guides', 'Scientific databases', 'Cultural advisors'],
      duration: 180,
      difficulty: 'intermediate',
      maoriPerspective: 'Honors the deep scientific knowledge embedded in traditional Māori medicine and healing practices',
      pacificPerspective: 'Connects to broader Pacific traditional medicine systems and their scientific validation'
    },

    // YEAR 7-8 ENGLISH
    {
      id: 'nz-eng-002',
      title: 'Oral Traditions and Digital Storytelling',
      level: 'Year 8',
      subject: 'english',
      curriculumArea: 'Creating Meaning',
      learningObjectives: [
        'Understand the importance of oral traditions in Māori culture',
        'Create digital stories that honor traditional storytelling',
        'Develop skills in multimedia communication'
      ],
      culturalConnections: ['Kōrero', 'Whakapapa', 'Mana', 'Tikanga'],
      activities: [
        {
          id: 'act-eng-002',
          title: 'Digital Pūrākau Creation',
          description: 'Students create digital stories based on traditional Māori pūrākau (stories)',
          type: 'creative',
          duration: 90,
          instructions: [
            'Research traditional Māori pūrākau and their meanings',
            'Select a pūrākau to adapt for modern digital storytelling',
            'Create a multimedia presentation with images, audio, and text',
            'Present your digital pūrākau to the class'
          ],
          materials: ['Pūrākau resources', 'Digital storytelling software', 'Audio recording equipment', 'Image sources'],
          culturalContext: 'Understanding the importance of storytelling in preserving and sharing culture'
        }
      ],
      assessmentCriteria: [
        {
          id: 'assess-eng-002',
          description: 'Demonstrates understanding of oral traditions and digital storytelling',
          level: 'achieved',
          rubric: [
            'Shows understanding of traditional pūrākau',
            'Creates engaging digital content',
            'Demonstrates cultural sensitivity and respect'
          ]
        }
      ],
      resources: ['Māori pūrākau collections', 'Digital storytelling guides', 'Audio recording software', 'Cultural advisors'],
      duration: 240,
      difficulty: 'intermediate',
      maoriPerspective: 'Honors the oral tradition of Māori storytelling while embracing modern digital communication',
      pacificPerspective: 'Connects to broader Pacific oral traditions and their adaptation to digital media'
    },

    // YEAR 9-10 SOCIAL STUDIES
    {
      id: 'nz-ss-002',
      title: 'Te Tiriti o Waitangi in Contemporary New Zealand',
      level: 'Year 10',
      subject: 'social-studies',
      curriculumArea: 'Identity, Culture and Organisation',
      learningObjectives: [
        'Understand the historical significance of Te Tiriti o Waitangi',
        'Analyze contemporary issues related to the Treaty',
        'Evaluate different perspectives on Treaty relationships'
      ],
      culturalConnections: ['Te Tiriti', 'Tino rangatiratanga', 'Kāwanatanga', 'Partnership'],
      activities: [
        {
          id: 'act-ss-002',
          title: 'Treaty Perspectives Analysis',
          description: 'Students analyze different perspectives on contemporary Treaty issues',
          type: 'discussion',
          duration: 60,
          instructions: [
            'Research contemporary Treaty settlements and issues',
            'Analyze different perspectives from Māori and Pākehā viewpoints',
            'Participate in respectful classroom discussions about Treaty relationships',
            'Create a balanced presentation showing multiple perspectives'
          ],
          materials: ['Treaty settlement resources', 'News articles', 'Historical documents', 'Discussion guidelines'],
          culturalContext: 'Understanding the ongoing importance of Te Tiriti in shaping New Zealand society'
        }
      ],
      assessmentCriteria: [
        {
          id: 'assess-ss-002',
          description: 'Demonstrates understanding of Te Tiriti and contemporary issues',
          level: 'achieved',
          rubric: [
            'Explains historical context of Te Tiriti',
            'Identifies contemporary Treaty issues',
            'Shows respect for different perspectives'
          ]
        }
      ],
      resources: ['Te Tiriti resources', 'Waitangi Tribunal reports', 'Contemporary news articles', 'Cultural advisors'],
      duration: 180,
      difficulty: 'intermediate',
      maoriPerspective: 'Emphasizes the ongoing significance of Te Tiriti in protecting Māori rights and relationships',
      pacificPerspective: 'Connects to broader Pacific experiences with colonial treaties and indigenous rights'
    },

    // YEAR 7-8 HEALTH & PE
    {
      id: 'nz-health-002',
      title: 'Traditional Games and Modern Sports',
      level: 'Year 8',
      subject: 'health-pe',
      curriculumArea: 'Movement Concepts and Motor Skills',
      learningObjectives: [
        'Learn traditional Māori games and their cultural significance',
        'Understand the connection between traditional and modern physical activities',
        'Develop skills in both traditional and contemporary games'
      ],
      culturalConnections: ['Kī-o-rahi', 'Whanaungatanga', 'Manaakitanga', 'Aroha'],
      activities: [
        {
          id: 'act-health-002',
          title: 'Kī-o-rahi Tournament',
          description: 'Students learn and play the traditional Māori game of kī-o-rahi',
          type: 'practical',
          duration: 80,
          instructions: [
            'Learn the rules and cultural significance of kī-o-rahi',
            'Practice basic skills and game strategies',
            'Participate in a class tournament',
            'Reflect on the teamwork and cultural values embedded in the game'
          ],
          materials: ['Kī (traditional ball)', 'Playing field setup', 'Scoreboard', 'Cultural context materials'],
          culturalContext: 'Understanding the cultural values embedded in traditional Māori games'
        }
      ],
      assessmentCriteria: [
        {
          id: 'assess-health-002',
          description: 'Demonstrates understanding of traditional games and cultural values',
          level: 'achieved',
          rubric: [
            'Shows understanding of kī-o-rahi rules and cultural significance',
            'Demonstrates teamwork and sportsmanship',
            'Reflects on cultural values in physical activities'
          ]
        }
      ],
      resources: ['Kī-o-rahi rule guides', 'Traditional games resources', 'Cultural advisors', 'Sports equipment'],
      duration: 160,
      difficulty: 'beginner',
      maoriPerspective: 'Celebrates traditional Māori games and their role in building community and cultural identity',
      pacificPerspective: 'Connects to broader Pacific traditional games and their cultural significance'
    },

    // YEAR 9-10 ARTS
    {
      id: 'nz-arts-002',
      title: 'Music and Sound in Māori Culture',
      level: 'Year 10',
      subject: 'arts',
      curriculumArea: 'Understanding Arts in Context',
      learningObjectives: [
        'Understand the role of music and sound in traditional Māori culture',
        'Explore contemporary Māori music and its cultural significance',
        'Create original compositions that incorporate Māori musical elements'
      ],
      culturalConnections: ['Waiata', 'Haka', 'Taonga pūoro', 'Whakapapa'],
      activities: [
        {
          id: 'act-arts-002',
          title: 'Waiata Composition Project',
          description: 'Students create original waiata (songs) incorporating traditional Māori musical elements',
          type: 'creative',
          duration: 100,
          instructions: [
            'Research traditional waiata and their purposes',
            'Learn about taonga pūoro (traditional Māori instruments)',
            'Compose an original waiata with both traditional and contemporary elements',
            'Perform your waiata for the class'
          ],
          materials: ['Traditional waiata recordings', 'Taonga pūoro instruments', 'Music composition software', 'Audio recording equipment'],
          culturalContext: 'Understanding the spiritual and cultural significance of music in Māori culture'
        }
      ],
      assessmentCriteria: [
        {
          id: 'assess-arts-002',
          description: 'Demonstrates understanding of Māori music and cultural expression',
          level: 'achieved',
          rubric: [
            'Shows understanding of traditional waiata and their purposes',
            'Incorporates traditional musical elements appropriately',
            'Demonstrates cultural sensitivity and respect'
          ]
        }
      ],
      resources: ['Traditional waiata collections', 'Taonga pūoro resources', 'Contemporary Māori music', 'Cultural advisors'],
      duration: 200,
      difficulty: 'intermediate',
      maoriPerspective: 'Honors the deep spiritual and cultural significance of music in Māori traditions',
      pacificPerspective: 'Connects to broader Pacific musical traditions and their cultural importance'
    }
  ];

  // Get all additional lessons
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

  // Get curriculum coverage
  getCurriculumCoverage(): Record<string, number> {
    const coverage: Record<string, number> = {};
    this.lessons.forEach((lesson) => {
      coverage[lesson.curriculumArea] = (coverage[lesson.curriculumArea] || 0) + 1;
    });
    return coverage;
  }

  // Get cultural content summary
  getCulturalContent(): Array<{ id: string; title: string; cultural: string[] }> {
    return this.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      cultural: lesson.culturalConnections,
    }));
  }
}

// Export singleton instance
export const additionalNZCurriculum = new AdditionalNZCurriculum();
