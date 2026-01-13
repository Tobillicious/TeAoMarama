/**
 * 📚 EDUCATIONAL CONTENT EXPANSION SPECIALIST
 *
 * Expands the existing educational content with more subjects, year levels,
 * and interactive components to create a comprehensive NZ curriculum platform
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

interface ExpandedLesson {
  id: string;
  title: string;
  level: string;
  subject: string;
  curriculumArea: string;
  learningObjectives: string[];
  culturalConnections: string[];
  activities: LessonActivity[];
  assessmentCriteria: AssessmentCriterion[];
  resources: string[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  maoriPerspective: string;
  pacificPerspective?: string;
}

interface LessonActivity {
  id: string;
  title: string;
  description: string;
  type: 'discussion' | 'practical' | 'research' | 'creative' | 'assessment';
  duration: number;
  instructions: string[];
  materials: string[];
  culturalContext?: string;
}

interface AssessmentCriterion {
  id: string;
  description: string;
  level: 'achieved' | 'merit' | 'excellence';
  rubric: string[];
}

class EducationalContentExpansionSpecialist {
  private expandedLessons: ExpandedLesson[] = [];

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    console.log('📚 EDUCATIONAL CONTENT EXPANSION SPECIALIST ACTIVATED');
    console.log('====================================================');

    await this.createExpandedLessons();
    await this.generateContentFiles();
    await this.createIntegrationComponents();
    await this.generateExpansionReport();
  }

  private async createExpandedLessons(): Promise<void> {
    console.log('🎯 CREATING EXPANDED EDUCATIONAL CONTENT...');

    this.expandedLessons = [
      // Year 7 English - Te Reo Māori Integration
      {
        id: 'eng-te-reo-001',
        title: 'Storytelling Traditions: Māori and Pākehā Narratives',
        level: 'Year 7',
        subject: 'english',
        curriculumArea: 'English - Speaking, Writing, and Presenting',
        learningObjectives: [
          'Compare storytelling traditions from different cultures',
          'Understand the role of oral tradition in Māori culture',
          'Create original narratives incorporating cultural elements',
          'Develop presentation skills for sharing stories',
        ],
        culturalConnections: [
          'Pūrākau (Māori legends and stories)',
          'Whakapapa storytelling traditions',
          'Oral tradition preservation',
          'Cultural identity through narrative',
        ],
        activities: [
          {
            id: 'eng-act-001',
            title: 'Pūrākau Research and Presentation',
            description: 'Research and present traditional Māori stories',
            type: 'research',
            duration: 90,
            instructions: [
              'Choose a traditional Māori story (pūrākau)',
              'Research its cultural significance and origins',
              'Prepare a respectful presentation',
              'Include appropriate cultural protocols',
            ],
            materials: [
              'Cultural story collections',
              'Presentation tools',
              'Cultural consultation guidelines',
            ],
            culturalContext:
              'Work with local iwi or cultural advisors to ensure appropriate handling of traditional stories',
          },
        ],
        assessmentCriteria: [
          {
            id: 'eng-assess-001',
            description: 'Cultural Storytelling Understanding',
            level: 'achieved',
            rubric: [
              'Demonstrates understanding of cultural storytelling traditions',
              'Shows respect for cultural protocols',
              'Presents information clearly',
            ],
          },
        ],
        resources: [
          'Te Ara Encyclopedia of New Zealand',
          'Local iwi story collections',
          'Māori language resources',
          'Cultural consultation guidelines',
        ],
        duration: 180,
        difficulty: 'beginner',
        maoriPerspective:
          'Storytelling is central to Māori culture, preserving knowledge, values, and identity across generations.',
        pacificPerspective:
          'Shared oral tradition practices across Pacific cultures and their importance in cultural preservation',
      },

      // Year 8 Mathematics - Cultural Patterns
      {
        id: 'math-patterns-001',
        title: 'Geometric Patterns in Māori Art and Architecture',
        level: 'Year 8',
        subject: 'mathematics',
        curriculumArea: 'Mathematics and Statistics - Geometry and Measurement',
        learningObjectives: [
          'Identify geometric patterns in traditional Māori art',
          'Understand symmetry and transformation concepts',
          'Create original patterns using mathematical principles',
          'Connect mathematical concepts to cultural practices',
        ],
        culturalConnections: [
          'Kowhaiwhai (traditional Māori decorative patterns)',
          'Wharenui (meeting house) architectural elements',
          'Traditional weaving patterns',
          'Mathematical principles in cultural design',
        ],
        activities: [
          {
            id: 'math-act-001',
            title: 'Kowhaiwhai Pattern Analysis',
            description: 'Analyze mathematical properties of traditional patterns',
            type: 'practical',
            duration: 75,
            instructions: [
              'Study traditional kowhaiwhai patterns',
              'Identify geometric shapes and transformations',
              'Measure angles and proportions',
              'Create mathematical descriptions of patterns',
            ],
            materials: ['Pattern examples', 'Measuring tools', 'Graph paper', 'Colored pencils'],
            culturalContext:
              'Understand the cultural significance of patterns and their connection to whakapapa and identity',
          },
        ],
        assessmentCriteria: [
          {
            id: 'math-assess-001',
            description: 'Geometric Pattern Analysis',
            level: 'achieved',
            rubric: [
              'Identifies geometric elements in cultural patterns',
              'Uses appropriate mathematical language',
              'Shows understanding of symmetry concepts',
            ],
          },
        ],
        resources: [
          'Museum collections of traditional art',
          'Mathematical pattern analysis tools',
          'Cultural art resources',
          'Geometry software',
        ],
        duration: 150,
        difficulty: 'intermediate',
        maoriPerspective:
          'Traditional patterns carry deep cultural meaning and mathematical principles that reflect Māori worldview and values.',
        pacificPerspective:
          'Similar geometric principles found in Pacific art and their cultural significance',
      },

      // Year 9 Science - Environmental Science
      {
        id: 'sci-env-001',
        title: 'Climate Change and Pacific Island Communities',
        level: 'Year 9',
        subject: 'science',
        curriculumArea: 'Science - Planet Earth and Beyond',
        learningObjectives: [
          'Understand climate change impacts on Pacific communities',
          'Analyze scientific data on climate change',
          'Evaluate adaptation strategies',
          'Connect global issues to local communities',
        ],
        culturalConnections: [
          'Pacific island nations and climate vulnerability',
          'Traditional environmental knowledge',
          'Community resilience strategies',
          'Interconnectedness of Pacific peoples',
        ],
        activities: [
          {
            id: 'sci-env-act-001',
            title: 'Climate Impact Research Project',
            description: 'Research climate change impacts on specific Pacific communities',
            type: 'research',
            duration: 120,
            instructions: [
              'Choose a Pacific island nation',
              'Research climate change impacts',
              'Analyze adaptation strategies',
              'Present findings with cultural sensitivity',
            ],
            materials: [
              'Climate data sources',
              'Research databases',
              'Cultural consultation guidelines',
            ],
            culturalContext:
              'Approach with respect for Pacific communities and their experiences with climate change',
          },
        ],
        assessmentCriteria: [
          {
            id: 'sci-env-assess-001',
            description: 'Climate Change Analysis',
            level: 'achieved',
            rubric: [
              'Demonstrates understanding of climate change impacts',
              'Uses scientific data appropriately',
              'Shows cultural sensitivity in presentation',
            ],
          },
        ],
        resources: [
          'IPCC climate reports',
          'Pacific climate change research',
          'Community adaptation case studies',
          'Scientific data visualization tools',
        ],
        duration: 200,
        difficulty: 'intermediate',
        maoriPerspective:
          'Understanding climate change through the lens of kaitiakitanga (environmental guardianship) and connection to Pacific whanaunga (relatives).',
        pacificPerspective:
          'Direct experience of Pacific communities with climate change and traditional adaptation knowledge',
      },

      // Year 10 Health & PE - Cultural Wellness
      {
        id: 'health-wellness-001',
        title: 'Hauora: Māori Model of Health and Wellbeing',
        level: 'Year 10',
        subject: 'health-pe',
        curriculumArea: 'Health and Physical Education - Personal Health and Physical Development',
        learningObjectives: [
          'Understand the Māori model of hauora (health)',
          'Compare different cultural approaches to wellness',
          'Develop personal wellness strategies',
          'Appreciate cultural diversity in health practices',
        ],
        culturalConnections: [
          'Te Whare Tapa Whā (four dimensions of health)',
          'Traditional Māori healing practices',
          'Community wellness approaches',
          'Cultural identity and wellbeing',
        ],
        activities: [
          {
            id: 'health-act-001',
            title: 'Personal Hauora Assessment',
            description: 'Assess personal wellbeing using Māori health model',
            type: 'practical',
            duration: 60,
            instructions: [
              'Learn about Te Whare Tapa Whā model',
              'Assess personal wellbeing in each dimension',
              'Develop improvement strategies',
              'Create personal wellness plan',
            ],
            materials: [
              'Hauora assessment tools',
              'Wellness planning worksheets',
              'Cultural health resources',
            ],
            culturalContext:
              'Approach hauora with respect for Māori cultural knowledge and practices',
          },
        ],
        assessmentCriteria: [
          {
            id: 'health-assess-001',
            description: 'Hauora Understanding and Application',
            level: 'achieved',
            rubric: [
              'Demonstrates understanding of hauora model',
              'Applies concepts to personal wellness',
              'Shows cultural respect and sensitivity',
            ],
          },
        ],
        resources: [
          'Māori health models and resources',
          'Wellness assessment tools',
          'Cultural health practitioners',
          'Community health resources',
        ],
        duration: 120,
        difficulty: 'intermediate',
        maoriPerspective:
          'Hauora represents a holistic approach to health that encompasses physical, mental, spiritual, and social wellbeing.',
        pacificPerspective:
          'Similar holistic health approaches found across Pacific cultures and their community-centered focus',
      },

      // Year 11 Arts - Visual Arts
      {
        id: 'arts-visual-001',
        title: 'Contemporary Māori Art and Cultural Expression',
        level: 'Year 11',
        subject: 'arts',
        curriculumArea: 'The Arts - Visual Arts',
        learningObjectives: [
          'Analyze contemporary Māori art and its cultural significance',
          'Understand the role of art in cultural expression',
          'Create original artwork incorporating cultural elements',
          'Develop critical analysis skills for cultural art',
        ],
        culturalConnections: [
          'Contemporary Māori artists and their work',
          'Cultural identity through visual expression',
          'Traditional and modern art techniques',
          'Art as cultural commentary and preservation',
        ],
        activities: [
          {
            id: 'arts-act-001',
            title: 'Contemporary Māori Artist Study',
            description: 'Research and analyze work of contemporary Māori artists',
            type: 'research',
            duration: 90,
            instructions: [
              'Choose a contemporary Māori artist',
              'Research their background and influences',
              'Analyze specific artworks',
              'Present findings with cultural sensitivity',
            ],
            materials: [
              'Artist databases',
              'Art analysis frameworks',
              'Cultural consultation guidelines',
            ],
            culturalContext:
              "Approach with respect for artists' cultural perspectives and artistic expression",
          },
        ],
        assessmentCriteria: [
          {
            id: 'arts-assess-001',
            description: 'Cultural Art Analysis',
            level: 'achieved',
            rubric: [
              'Demonstrates understanding of cultural art context',
              'Uses appropriate art analysis terminology',
              'Shows cultural sensitivity in interpretation',
            ],
          },
        ],
        resources: [
          'Contemporary Māori art collections',
          'Artist interviews and documentaries',
          'Art analysis resources',
          'Cultural art databases',
        ],
        duration: 180,
        difficulty: 'intermediate',
        maoriPerspective:
          'Contemporary Māori art continues traditional cultural expression while addressing modern issues and identity.',
        pacificPerspective:
          'Similar contemporary art movements across Pacific cultures and their cultural significance',
      },
    ];

    console.log(`✅ Created ${this.expandedLessons.length} additional lessons`);
  }

  private async generateContentFiles(): Promise<void> {
    console.log('📝 GENERATING EXPANDED CONTENT FILES...');

    // Create expanded curriculum content file
    const expandedContentPath = join(
      process.cwd(),
      'src',
      'content',
      'expanded-nz-curriculum-lessons.ts',
    );
    const expandedContent = `/**
 * 📚 EXPANDED NEW ZEALAND CURRICULUM LESSONS
 * 
 * Additional curriculum-aligned educational content for Te Ao Mārama
 * Expanding the platform with more subjects, year levels, and cultural integration
 */

export interface ExpandedLesson {
  id: string;
  title: string;
  level: string;
  subject: string;
  curriculumArea: string;
  learningObjectives: string[];
  culturalConnections: string[];
  activities: LessonActivity[];
  assessmentCriteria: AssessmentCriterion[];
  resources: string[];
  duration: number;
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

export class ExpandedNZCurriculumContent {
  private lessons: ExpandedLesson[] = ${JSON.stringify(this.expandedLessons, null, 2)};

  getAllLessons(): ExpandedLesson[] {
    return this.lessons;
  }

  getLessonsByLevel(level: string): ExpandedLesson[] {
    return this.lessons.filter(lesson => lesson.level === level);
  }

  getLessonsBySubject(subject: string): ExpandedLesson[] {
    return this.lessons.filter(lesson => lesson.subject === subject);
  }

  getLesson(id: string): ExpandedLesson | undefined {
    return this.lessons.find(lesson => lesson.id === id);
  }

  searchLessons(query: string): ExpandedLesson[] {
    const searchTerm = query.toLowerCase();
    return this.lessons.filter(lesson => 
      lesson.title.toLowerCase().includes(searchTerm) ||
      lesson.subject.toLowerCase().includes(searchTerm) ||
      lesson.curriculumArea.toLowerCase().includes(searchTerm) ||
      lesson.learningObjectives.some(obj => obj.toLowerCase().includes(searchTerm)) ||
      lesson.culturalConnections.some(conn => conn.toLowerCase().includes(searchTerm))
    );
  }

  getCulturalContent(): Array<{id: string; title: string; cultural: string[]}> {
    return this.lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      cultural: lesson.culturalConnections
    }));
  }
}

export const expandedNZCurriculumContent = new ExpandedNZCurriculumContent();
`;

    writeFileSync(expandedContentPath, expandedContent);
    console.log('✅ Generated expanded curriculum content file');

    // Create interactive lesson component
    const interactiveLessonPath = join(
      process.cwd(),
      'src',
      'components',
      'InteractiveLessonViewer.tsx',
    );
    const interactiveLesson = `import React, { useState, useEffect } from 'react';
import { expandedNZCurriculumContent, ExpandedLesson } from '../content/expanded-nz-curriculum-lessons';

interface InteractiveLessonViewerProps {
  lessonId: string;
  onComplete?: (lessonId: string) => void;
}

const InteractiveLessonViewer: React.FC<InteractiveLessonViewerProps> = ({ 
  lessonId, 
  onComplete 
}) => {
  const [lesson, setLesson] = useState<ExpandedLesson | null>(null);
  const [currentActivity, setCurrentActivity] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLesson = () => {
      const foundLesson = expandedNZCurriculumContent.getLesson(lessonId);
      setLesson(foundLesson);
      setIsLoading(false);
    };

    loadLesson();
  }, [lessonId]);

  const handleActivityComplete = (activityIndex: number) => {
    setCompletedActivities(prev => new Set([...prev, activityIndex]));
    
    if (activityIndex === lesson!.activities.length - 1) {
      onComplete?.(lessonId);
    }
  };

  const nextActivity = () => {
    if (currentActivity < lesson!.activities.length - 1) {
      setCurrentActivity(currentActivity + 1);
    }
  };

  const prevActivity = () => {
    if (currentActivity > 0) {
      setCurrentActivity(currentActivity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pounamu mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h2>
          <p className="text-gray-600">The requested lesson could not be found.</p>
        </div>
      </div>
    );
  }

  const currentActivityData = lesson.activities[currentActivity];
  const progress = ((currentActivity + 1) / lesson.activities.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
              <p className="text-gray-600">{lesson.level} • {lesson.subject}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-pounamu h-2 rounded-full transition-all duration-300"
                  style={{ width: \`\${progress}%\` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {currentActivity + 1} of {lesson.activities.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {currentActivityData.title}
              </h2>
              <p className="text-gray-600 mb-4">{currentActivityData.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  {currentActivityData.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>

              {currentActivityData.materials.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Materials Needed:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {currentActivityData.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentActivityData.culturalContext && (
                <div className="bg-pounamu-50 border border-pounamu-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-pounamu-800 mb-2">🌿 Cultural Context:</h3>
                  <p className="text-pounamu-700">{currentActivityData.culturalContext}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <button
                  onClick={prevActivity}
                  disabled={currentActivity === 0}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <button
                  onClick={() => handleActivityComplete(currentActivity)}
                  className="px-6 py-2 bg-pounamu text-white rounded-md hover:bg-pounamu-dark"
                >
                  {completedActivities.has(currentActivity) ? 'Completed ✓' : 'Mark Complete'}
                </button>
                
                <button
                  onClick={nextActivity}
                  disabled={currentActivity === lesson.activities.length - 1}
                  className="px-4 py-2 bg-pounamu text-white rounded-md hover:bg-pounamu-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Lesson Overview</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Duration:</span>
                  <span className="ml-2 text-gray-600">{lesson.duration} minutes</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Difficulty:</span>
                  <span className="ml-2 text-gray-600 capitalize">{lesson.difficulty}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Subject:</span>
                  <span className="ml-2 text-gray-600">{lesson.curriculumArea}</span>
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Learning Objectives</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {lesson.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-pounamu mr-2">•</span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cultural Connections */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Cultural Connections</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {lesson.culturalConnections.map((connection, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-pounamu mr-2">🌿</span>
                    {connection}
                  </li>
                ))}
              </ul>
            </div>

            {/* Māori Perspective */}
            <div className="bg-pounamu-50 border border-pounamu-200 rounded-lg p-6">
              <h3 className="font-semibold text-pounamu-800 mb-4">Māori Perspective</h3>
              <p className="text-sm text-pounamu-700">{lesson.maoriPerspective}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLessonViewer;
`;

    writeFileSync(interactiveLessonPath, interactiveLesson);
    console.log('✅ Generated interactive lesson viewer component');
  }

  private async createIntegrationComponents(): Promise<void> {
    console.log('🔗 CREATING INTEGRATION COMPONENTS...');

    // Create lesson browser integration
    const lessonBrowserPath = join(process.cwd(), 'src', 'components', 'ExpandedLessonBrowser.tsx');
    const lessonBrowser = `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { expandedNZCurriculumContent, ExpandedLesson } from '../content/expanded-nz-curriculum-lessons';

const ExpandedLessonBrowser: React.FC = () => {
  const [lessons, setLessons] = useState<ExpandedLesson[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<ExpandedLesson[]>([]);
  const [filters, setFilters] = useState({
    level: 'all',
    subject: 'all',
    difficulty: 'all',
    search: ''
  });

  useEffect(() => {
    const allLessons = expandedNZCurriculumContent.getAllLessons();
    setLessons(allLessons);
    setFilteredLessons(allLessons);
  }, []);

  useEffect(() => {
    let filtered = lessons;

    if (filters.level !== 'all') {
      filtered = filtered.filter(lesson => lesson.level === filters.level);
    }

    if (filters.subject !== 'all') {
      filtered = filtered.filter(lesson => lesson.subject === filters.subject);
    }

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(lesson => lesson.difficulty === filters.difficulty);
    }

    if (filters.search) {
      filtered = filtered.filter(lesson =>
        lesson.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        lesson.curriculumArea.toLowerCase().includes(filters.search.toLowerCase()) ||
        lesson.learningObjectives.some(obj => obj.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    setFilteredLessons(filtered);
  }, [filters, lessons]);

  const levels = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'];
  const subjects = ['english', 'mathematics', 'science', 'social-studies', 'health-pe', 'arts'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📚 Expanded NZ Curriculum Lessons
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive educational content with authentic cultural integration
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year Level</label>
              <select
                value={filters.level}
                onChange={(e) => setFilters({...filters, level: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pounamu"
              >
                <option value="all">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={filters.subject}
                onChange={(e) => setFilters({...filters, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pounamu"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject.replace('-', ' ').toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pounamu"
              >
                <option value="all">All Levels</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                placeholder="Search lessons..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pounamu"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredLessons.length} of {lessons.length} lessons
          </p>
        </div>

        {/* Lesson Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-pounamu-100 text-pounamu-800 text-xs font-medium rounded">
                    {lesson.level}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded capitalize">
                    {lesson.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{lesson.curriculumArea}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Learning Objectives:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {lesson.learningObjectives.slice(0, 2).map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-pounamu mr-1">•</span>
                        {objective}
                      </li>
                    ))}
                    {lesson.learningObjectives.length > 2 && (
                      <li className="text-gray-500">+{lesson.learningObjectives.length - 2} more...</li>
                    )}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cultural Connections:</h4>
                  <div className="flex flex-wrap gap-1">
                    {lesson.culturalConnections.slice(0, 2).map((connection, index) => (
                      <span key={index} className="px-2 py-1 bg-pounamu-50 text-pounamu-700 text-xs rounded">
                        {connection.split(' ')[0]}
                      </span>
                    ))}
                    {lesson.culturalConnections.length > 2 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded">
                        +{lesson.culturalConnections.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{lesson.duration} minutes</span>
                  <span>{lesson.activities.length} activities</span>
                </div>

                <Link
                  to={\`/lesson/\${lesson.id}\`}
                  className="w-full bg-pounamu text-white py-2 px-4 rounded-md hover:bg-pounamu-dark transition-colors text-center block"
                >
                  Start Lesson
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No lessons found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandedLessonBrowser;
`;

    writeFileSync(lessonBrowserPath, lessonBrowser);
    console.log('✅ Generated expanded lesson browser component');
  }

  private async generateExpansionReport(): Promise<void> {
    console.log('📊 GENERATING EXPANSION REPORT...');

    const report = {
      timestamp: new Date().toISOString(),
      mission: 'Educational Content Expansion',
      status: 'Complete',
      summary:
        'Successfully expanded the educational platform with additional curriculum-aligned lessons across multiple subjects and year levels.',
      expansionMetrics: {
        totalNewLessons: this.expandedLessons.length,
        subjectsCovered: [...new Set(this.expandedLessons.map((l) => l.subject))],
        yearLevelsCovered: [...new Set(this.expandedLessons.map((l) => l.level))],
        totalActivities: this.expandedLessons.reduce(
          (sum, lesson) => sum + lesson.activities.length,
          0,
        ),
        totalAssessmentCriteria: this.expandedLessons.reduce(
          (sum, lesson) => sum + lesson.assessmentCriteria.length,
          0,
        ),
        culturalConnections: this.expandedLessons.reduce(
          (sum, lesson) => sum + lesson.culturalConnections.length,
          0,
        ),
      },
      newLessons: this.expandedLessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        level: lesson.level,
        subject: lesson.subject,
        duration: lesson.duration,
        activities: lesson.activities.length,
        culturalConnections: lesson.culturalConnections.length,
      })),
      componentsCreated: [
        'expanded-nz-curriculum-lessons.ts - Additional curriculum content',
        'InteractiveLessonViewer.tsx - Interactive lesson experience',
        'ExpandedLessonBrowser.tsx - Enhanced lesson browsing',
      ],
      integrationPoints: [
        'Integrate with existing RealLessonBrowser component',
        'Add routes for new lesson viewer',
        'Update navigation to include expanded content',
        'Connect with assessment and progress tracking systems',
      ],
      nextSteps: [
        'Add more year levels (Year 12-13)',
        'Create subject-specific lesson collections',
        'Implement progress tracking for interactive lessons',
        'Add multimedia resources and activities',
        'Create teacher guides and assessment rubrics',
      ],
      culturalExcellence: [
        'All lessons include authentic Māori perspectives',
        'Cultural connections integrated throughout',
        'Respectful handling of cultural knowledge',
        'Pacific perspectives included where appropriate',
      ],
    };

    const reportPath = join(process.cwd(), 'reports', 'educational-content-expansion-report.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log('✅ Expansion report generated');

    console.log('');
    console.log('📊 EXPANSION SUMMARY:');
    console.log(`   New Lessons Created: ${this.expandedLessons.length}`);
    console.log(
      `   Subjects Covered: ${[...new Set(this.expandedLessons.map((l) => l.subject))].join(', ')}`,
    );
    console.log(
      `   Year Levels: ${[...new Set(this.expandedLessons.map((l) => l.level))].join(', ')}`,
    );
    console.log(
      `   Total Activities: ${this.expandedLessons.reduce(
        (sum, lesson) => sum + lesson.activities.length,
        0,
      )}`,
    );
    console.log(
      `   Cultural Connections: ${this.expandedLessons.reduce(
        (sum, lesson) => sum + lesson.culturalConnections.length,
        0,
      )}`,
    );
    console.log('');
    console.log('🎯 NEXT STEPS:');
    report.nextSteps.forEach((step, index) => console.log(`   ${index + 1}. ${step}`));
    console.log('');
    console.log('👑 King Aronui coordinates educational content expansion!');
    console.log('🎯 Mission: Create comprehensive NZ curriculum platform');
  }
}

export default EducationalContentExpansionSpecialist;

