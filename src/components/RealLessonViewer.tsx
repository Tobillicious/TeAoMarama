import { ArrowLeft, BookOpen, Clock, Download, FileText, Target } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { EnhancedResource } from '../utils/enhanced-resource-loader';
import { getResourceById } from '../utils/enhanced-resource-loader';
import './RealLessonViewer.css';

const RealLessonViewer: React.FC = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<EnhancedResource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResource = async () => {
      if (!resourceId) {
        setError('No resource ID provided');
        setLoading(false);
        return;
      }

      try {
        const enhancedResource = await getResourceById(resourceId);
        if (!enhancedResource) {
          setError('Resource not found');
        } else {
          setResource(enhancedResource);
        }
      } catch (err) {
        setError('Failed to load resource');
        console.error('Error loading resource:', err);
      } finally {
        setLoading(false);
      }
    };

    loadResource();
  }, [resourceId]);

  const generateLessonPlan = (resource: EnhancedResource) => {
    const subject = resource.subject.toLowerCase();
    const yearLevel = resource.yearLevel;

    if (subject.includes('social studies')) {
      return generateSocialStudiesLesson(resource);
    } else if (subject.includes('mathematics') || subject.includes('math')) {
      return generateMathematicsLesson(resource);
    } else if (
      subject.includes('english') ||
      subject.includes('reading') ||
      subject.includes('writing')
    ) {
      return generateEnglishLesson(resource);
    } else if (subject.includes('science')) {
      return generateScienceLesson(resource);
    } else {
      return generateGenericLesson(resource);
    }
  };

  const generateSocialStudiesLesson = (resource: EnhancedResource) => ({
    title: resource.title,
    duration: 50,
    objectives: [
      `Understand key concepts in ${resource.title}`,
      'Analyze different perspectives on the topic',
      'Connect learning to personal experiences and community',
      'Develop critical thinking and analysis skills',
    ],
    activities: [
      {
        title: 'Whakawhanaungatanga - Building Connections',
        duration: 10,
        description:
          'Begin with karakia and sharing circle. Students share what they already know about the topic and make connections to their own experiences.',
        materials: ['Karakia sheet', 'Discussion prompts', 'Circle seating arrangement'],
        instructions: [
          'Begin with appropriate karakia for learning',
          'Students sit in a circle',
          'Each student shares one thing they know about the topic',
          'Teacher records key ideas on whiteboard',
        ],
      },
      {
        title: 'Core Learning Activity',
        duration: 25,
        description: `Explore ${resource.title} through interactive activities, group work, and multimedia resources.`,
        materials: ['Textbooks', 'Digital resources', 'Group work materials', 'Whiteboard'],
        instructions: [
          'Present key concepts using visual aids',
          'Students work in small groups to explore different aspects',
          'Groups share their findings with the class',
          'Teacher facilitates discussion and adds expert knowledge',
        ],
      },
      {
        title: 'Cultural Perspective Integration',
        duration: 10,
        description: 'Connect learning to Te Ao Māori perspectives and local community context.',
        materials: ['Cultural resources', 'Local community materials', 'Maps'],
        instructions: [
          'Explore how this topic relates to Māori worldviews',
          'Discuss local community connections',
          'Students identify cultural elements in the topic',
          "Connect to students' own cultural backgrounds",
        ],
      },
      {
        title: 'Reflection and Sharing',
        duration: 5,
        description: 'Students reflect on their learning and share key insights with the class.',
        materials: ['Reflection sheets', 'Exit tickets'],
        instructions: [
          'Students write one key learning on exit ticket',
          'Volunteers share insights with class',
          'Teacher summarizes main learning points',
          'Set homework or extension activity',
        ],
      },
    ],
    assessment: {
      description:
        'Formative assessment through observation and discussion, with summative reflection task.',
      criteria: [
        'Participates actively in discussions and group work',
        'Demonstrates understanding of key concepts',
        'Shows cultural awareness and respect',
        'Makes connections to personal experience and community',
        'Uses critical thinking skills effectively',
      ],
      rubric: {
        'Exceeds Expectations':
          'Consistently demonstrates deep understanding, makes sophisticated connections, shows strong cultural awareness',
        'Meets Expectations':
          'Demonstrates solid understanding, makes appropriate connections, shows cultural awareness',
        Developing:
          'Shows basic understanding, makes some connections, developing cultural awareness',
        'Needs Support':
          'Requires additional support to demonstrate understanding and make connections',
      },
    },
    homework:
      'Research one aspect of the topic that interests you and prepare a 2-minute presentation for next class.',
    culturalIntegration: `This lesson integrates ${resource.culturalElements} cultural elements, connecting ${resource.subject} learning to Te Ao Māori worldviews and practices. Students will explore how traditional knowledge and contemporary understanding intersect in this topic, fostering respect for diverse perspectives.`,
  });

  const generateMathematicsLesson = (resource: EnhancedResource) => ({
    title: resource.title,
    duration: 50,
    objectives: [
      `Master mathematical concepts in ${resource.title}`,
      'Apply problem-solving strategies effectively',
      'Connect mathematics to real-world situations',
      'Develop mathematical reasoning and communication skills',
    ],
    activities: [
      {
        title: 'Mathematical Warm-up',
        duration: 5,
        description:
          'Quick mental math or problem-solving activity to engage students and activate prior knowledge.',
        materials: ['Math warm-up sheets', 'Timer'],
        instructions: [
          'Present 3-5 quick problems on the board',
          'Students solve individually for 3 minutes',
          'Discuss solutions as a class',
          "Connect to today's learning objectives",
        ],
      },
      {
        title: 'Core Mathematical Learning',
        duration: 30,
        description: `Teach and practice ${resource.title} concepts through hands-on activities and problem-solving.`,
        materials: ['Math manipulatives', 'Workbooks', 'Digital tools', 'Whiteboard'],
        instructions: [
          'Introduce new concept with concrete examples',
          'Students practice with manipulatives or visual aids',
          'Move to abstract problem-solving',
          'Provide guided practice with immediate feedback',
        ],
      },
      {
        title: 'Application and Practice',
        duration: 12,
        description:
          'Students apply learning to solve real-world problems and mathematical challenges.',
        materials: ['Problem-solving worksheets', 'Calculators', 'Real-world scenarios'],
        instructions: [
          'Present real-world problems involving the concept',
          'Students work in pairs to solve problems',
          'Groups share solutions and strategies',
          'Discuss different approaches and solutions',
        ],
      },
      {
        title: 'Reflection and Review',
        duration: 3,
        description: 'Review key concepts and address any questions.',
        materials: ['Summary sheet'],
        instructions: [
          'Students write one thing they learned',
          'Address any remaining questions',
          "Preview next lesson's content",
          'Set practice homework',
        ],
      },
    ],
    assessment: {
      description:
        'Continuous assessment through observation, practice problems, and mini-quizzes.',
      criteria: [
        'Demonstrates understanding of mathematical concepts',
        'Applies problem-solving strategies effectively',
        'Shows mathematical reasoning and communication',
        'Connects learning to real-world applications',
        'Works collaboratively with peers',
      ],
      rubric: {
        'Exceeds Expectations':
          'Solves complex problems independently, explains reasoning clearly, makes sophisticated connections',
        'Meets Expectations':
          'Solves standard problems correctly, explains reasoning, makes appropriate connections',
        Developing: 'Solves basic problems with support, explains reasoning with prompting',
        'Needs Support': 'Requires significant support to solve problems and explain reasoning',
      },
    },
    homework:
      'Complete practice problems 1-10 on page 45. Choose one problem to explain your solution method.',
    culturalIntegration: `This mathematics lesson incorporates cultural contexts where appropriate, showing how mathematical thinking appears in traditional Māori practices and contemporary applications. Students will see mathematics as a universal language that connects cultures.`,
  });

  const generateEnglishLesson = (resource: EnhancedResource) => ({
    title: resource.title,
    duration: 50,
    objectives: [
      `Develop ${resource.title} skills`,
      'Enhance reading comprehension and analysis',
      'Improve written and oral communication',
      'Connect literature to personal and cultural experiences',
    ],
    activities: [
      {
        title: 'Reading and Analysis',
        duration: 20,
        description: `Engage with ${resource.title} through close reading, discussion, and analysis.`,
        materials: ['Texts', 'Analysis worksheets', 'Discussion questions', 'Highlighters'],
        instructions: [
          'Students read text independently',
          'Use highlighters to mark key passages',
          'Complete analysis worksheet in pairs',
          'Share findings in small group discussions',
        ],
      },
      {
        title: 'Writing and Creation',
        duration: 15,
        description: 'Students create their own written responses or creative pieces.',
        materials: ['Writing materials', 'Computers', 'Creative prompts', 'Dictionaries'],
        instructions: [
          'Present writing prompt or creative task',
          'Students plan their response',
          'Write first draft',
          'Peer review and feedback session',
        ],
      },
      {
        title: 'Sharing and Feedback',
        duration: 10,
        description: 'Students share their work and provide peer feedback.',
        materials: ['Sharing protocols', 'Feedback forms'],
        instructions: [
          'Students share work in small groups',
          'Provide constructive feedback using protocols',
          'Students revise based on feedback',
          'Volunteers share with whole class',
        ],
      },
      {
        title: 'Reflection',
        duration: 5,
        description: 'Reflect on learning and set goals for improvement.',
        materials: ['Reflection journals'],
        instructions: [
          'Students write reflection in journals',
          'Set one goal for next lesson',
          'Teacher collects journals for review',
          "Preview next lesson's focus",
        ],
      },
    ],
    assessment: {
      description:
        'Portfolio assessment including written work, participation, and self-reflection.',
      criteria: [
        'Demonstrates reading comprehension and analysis',
        'Shows analytical thinking and interpretation',
        'Produces quality written work',
        'Participates actively in discussions',
        'Provides constructive peer feedback',
      ],
      rubric: {
        'Exceeds Expectations':
          'Produces sophisticated analysis, writes with clarity and insight, contributes meaningfully to discussions',
        'Meets Expectations':
          'Demonstrates solid comprehension, writes clearly, participates actively',
        Developing: 'Shows basic comprehension, writes with support, participates with prompting',
        'Needs Support': 'Requires significant support for comprehension and written expression',
      },
    },
    homework:
      "Complete the reading response paragraph. Choose one theme from today's text and explain how it connects to your own experience.",
    culturalIntegration: `This English lesson includes diverse texts and perspectives, ensuring students see themselves and their communities reflected in the literature they study. Students will explore how language and storytelling connect cultures.`,
  });

  const generateScienceLesson = (resource: EnhancedResource) => ({
    title: resource.title,
    duration: 50,
    objectives: [
      `Understand scientific concepts in ${resource.title}`,
      'Develop scientific inquiry skills',
      'Apply scientific thinking to real-world problems',
      'Connect science to cultural and environmental contexts',
    ],
    activities: [
      {
        title: 'Scientific Investigation',
        duration: 25,
        description: `Conduct hands-on investigation of ${resource.title} concepts.`,
        materials: ['Lab equipment', 'Safety materials', 'Investigation sheets', 'Data tables'],
        instructions: [
          'Review safety procedures and equipment',
          'Students work in groups to conduct investigation',
          'Record observations and data carefully',
          'Follow scientific method procedures',
        ],
      },
      {
        title: 'Data Analysis and Discussion',
        duration: 15,
        description: 'Analyze results and discuss findings as a class.',
        materials: ['Data analysis tools', 'Discussion prompts', 'Graph paper'],
        instructions: [
          'Groups analyze their data and create graphs',
          'Present findings to the class',
          'Compare results across groups',
          'Discuss patterns and anomalies',
        ],
      },
      {
        title: 'Real-world Connections',
        duration: 8,
        description: 'Connect scientific learning to environmental and cultural contexts.',
        materials: ['Environmental resources', 'Cultural context materials'],
        instructions: [
          'Explore how this concept applies in nature',
          'Discuss cultural perspectives on the topic',
          'Connect to environmental issues',
          'Students share personal connections',
        ],
      },
      {
        title: 'Conclusion and Reflection',
        duration: 2,
        description: 'Summarize learning and reflect on the scientific process.',
        materials: ['Summary sheets'],
        instructions: [
          'Students write conclusion statements',
          'Reflect on the scientific process',
          'Identify questions for further investigation',
          "Set up next lesson's focus",
        ],
      },
    ],
    assessment: {
      description: 'Assessment through lab reports, observations, and scientific reasoning tasks.',
      criteria: [
        'Follows scientific method correctly',
        'Demonstrates understanding of concepts',
        'Shows scientific reasoning and analysis',
        'Makes connections to real-world applications',
        'Works safely and collaboratively',
      ],
      rubric: {
        'Exceeds Expectations':
          'Conducts thorough investigation, analyzes data sophisticatedly, makes insightful connections',
        'Meets Expectations':
          'Follows procedures correctly, analyzes data appropriately, makes relevant connections',
        Developing: 'Follows procedures with support, analyzes data with guidance',
        'Needs Support': 'Requires significant support to follow procedures and analyze data',
      },
    },
    homework:
      'Write a lab report summarizing your investigation. Include hypothesis, procedure, results, and conclusion.',
    culturalIntegration: `This science lesson acknowledges traditional knowledge systems and shows how scientific understanding can be enriched through cultural perspectives. Students will see how different ways of knowing can complement each other.`,
  });

  const generateGenericLesson = (resource: EnhancedResource) => ({
    title: resource.title,
    duration: 50,
    objectives: [
      `Master key concepts in ${resource.title}`,
      'Develop critical thinking skills',
      'Apply learning to new situations',
      'Connect learning to personal experiences',
    ],
    activities: [
      {
        title: 'Introduction and Engagement',
        duration: 10,
        description:
          'Introduce the topic and engage students with relevant questions and activities.',
        materials: ['Introduction materials', 'Engagement activities', 'Visual aids'],
        instructions: [
          'Present engaging hook or question',
          'Students discuss in pairs',
          'Share ideas with class',
          'Connect to learning objectives',
        ],
      },
      {
        title: 'Core Learning',
        duration: 25,
        description: `Explore ${resource.title} through various learning activities and resources.`,
        materials: ['Learning resources', 'Activity materials', 'Digital tools'],
        instructions: [
          'Present key concepts with examples',
          'Students engage in hands-on activities',
          'Small group discussions and sharing',
          'Teacher facilitates and adds expertise',
        ],
      },
      {
        title: 'Application and Practice',
        duration: 12,
        description: 'Students apply their learning through practical activities and exercises.',
        materials: ['Practice materials', 'Application activities'],
        instructions: [
          'Students work on application tasks',
          'Peer collaboration and support',
          'Share solutions and strategies',
          'Address questions and misconceptions',
        ],
      },
      {
        title: 'Review and Reflection',
        duration: 3,
        description: 'Review key learning points and reflect on the lesson.',
        materials: ['Summary materials'],
        instructions: [
          'Students summarize key learning',
          'Address any remaining questions',
          'Set goals for next lesson',
          'Preview upcoming content',
        ],
      },
    ],
    assessment: {
      description: 'Assessment through participation, practical application, and reflection.',
      criteria: [
        'Demonstrates understanding of key concepts',
        'Applies learning effectively',
        'Shows critical thinking',
        'Participates actively in activities',
        'Works collaboratively with peers',
      ],
      rubric: {
        'Exceeds Expectations':
          'Demonstrates deep understanding, applies learning creatively, shows sophisticated thinking',
        'Meets Expectations':
          'Shows solid understanding, applies learning appropriately, demonstrates good thinking',
        Developing: 'Shows basic understanding, applies learning with support',
        'Needs Support': 'Requires additional support to demonstrate understanding and application',
      },
    },
    homework:
      "Complete the reflection questions and prepare one question about today's topic for next class.",
    culturalIntegration: `This lesson incorporates cultural perspectives where relevant, ensuring learning is meaningful and connected to students' experiences and backgrounds.`,
  });

  const downloadLessonPlan = (resource: EnhancedResource) => {
    const lesson = generateLessonPlan(resource);
    const content = `# ${lesson.title}

**Subject:** ${resource.subject}  
**Year Level:** ${resource.yearLevel}  
**Duration:** ${lesson.duration} minutes  
**Cultural Elements:** ${resource.culturalElements}/5

## Learning Objectives
${lesson.objectives.map((obj) => `- ${obj}`).join('\n')}

## Lesson Activities

${lesson.activities
  .map(
    (activity) => `
### ${activity.title} (${activity.duration} minutes)

**Description:** ${activity.description}

**Materials Needed:**
${activity.materials.map((material) => `- ${material}`).join('\n')}

**Instructions:**
${activity.instructions.map((instruction) => `- ${instruction}`).join('\n')}
`,
  )
  .join('\n')}

## Assessment

**Description:** ${lesson.assessment.description}

### Success Criteria
${lesson.assessment.criteria.map((criterion) => `- ${criterion}`).join('\n')}

### Assessment Rubric
${Object.entries(lesson.assessment.rubric)
  .map(([level, description]) => `**${level}:** ${description}`)
  .join('\n')}

## Homework
${lesson.homework}

## Cultural Integration
${lesson.culturalIntegration}

---
*Generated by Te Kete Ako Enhanced Resource System*  
*Quality Score: ${resource.enhancement?.qualityScore?.toFixed(1) || 'N/A'}/15*  
*Cultural Authenticity: ${resource.enhancement?.culturalAuthenticity?.toFixed(1) || 'N/A'}/10*
    `;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.title.replace(/[^a-z0-9]/gi, '_')}_complete_lesson_plan.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="lesson-viewer loading">
        <div className="loading-spinner">
          <BookOpen className="animate-spin" size={48} />
          <p>Loading complete lesson plan...</p>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="lesson-viewer error">
        <div className="error-message">
          <h2>Lesson Not Found</h2>
          <p>{error || 'The requested lesson could not be found.'}</p>
          <button onClick={() => navigate('/enhanced-resources')} className="btn primary">
            <ArrowLeft size={20} />
            Back to Enhanced Resources
          </button>
        </div>
      </div>
    );
  }

  const lesson = generateLessonPlan(resource);

  return (
    <div className="lesson-viewer">
      {/* Header */}
      <div className="lesson-header">
        <div className="header-controls">
          <button onClick={() => navigate('/enhanced-resources')} className="btn secondary">
            <ArrowLeft size={20} />
            Back to Resources
          </button>

          <button onClick={() => downloadLessonPlan(resource)} className="btn primary">
            <Download size={20} />
            Download Complete Lesson Plan
          </button>
        </div>

        <div className="lesson-title-section">
          <h1>📚 {lesson.title}</h1>
          <div className="lesson-meta">
            <span className="subject">{resource.subject}</span>
            <span className="year-level">{resource.yearLevel}</span>
            <span className="duration">
              <Clock size={16} />
              {lesson.duration} minutes
            </span>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="lesson-section">
        <h2>
          <Target size={24} /> Learning Objectives
        </h2>
        <ul className="objectives-list">
          {lesson.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </div>

      {/* Lesson Activities */}
      <div className="lesson-section">
        <h2>
          <BookOpen size={24} /> Lesson Activities
        </h2>
        {lesson.activities.map((activity, index) => (
          <div key={index} className="activity-card">
            <div className="activity-header">
              <h3>{activity.title}</h3>
              <span className="duration">{activity.duration} minutes</span>
            </div>
            <p className="activity-description">{activity.description}</p>

            <div className="activity-details">
              <div className="materials">
                <h4>Materials Needed:</h4>
                <ul>
                  {activity.materials.map((material, i) => (
                    <li key={i}>{material}</li>
                  ))}
                </ul>
              </div>

              <div className="instructions">
                <h4>Instructions:</h4>
                <ol>
                  {activity.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assessment */}
      <div className="lesson-section">
        <h2>
          <FileText size={24} /> Assessment
        </h2>
        <p className="assessment-description">{lesson.assessment.description}</p>

        <div className="assessment-details">
          <div className="criteria">
            <h4>Success Criteria:</h4>
            <ul>
              {lesson.assessment.criteria.map((criterion, index) => (
                <li key={index}>{criterion}</li>
              ))}
            </ul>
          </div>

          <div className="rubric">
            <h4>Assessment Rubric:</h4>
            {Object.entries(lesson.assessment.rubric).map(([level, description]) => (
              <div key={level} className="rubric-level">
                <strong>{level}:</strong> {description}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Homework */}
      <div className="lesson-section">
        <h2>📝 Homework</h2>
        <p>{lesson.homework}</p>
      </div>

      {/* Cultural Integration */}
      <div className="lesson-section cultural">
        <h2>🌿 Cultural Integration</h2>
        <p>{lesson.culturalIntegration}</p>
      </div>

      {/* Quality Indicators */}
      <div className="quality-section">
        <div className="quality-badges">
          <div className="quality-badge">
            <span className="label">Quality Score:</span>
            <span className="value">
              {resource.enhancement?.qualityScore?.toFixed(1) || 'N/A'}/15
            </span>
          </div>
          <div className="quality-badge">
            <span className="label">Cultural Authenticity:</span>
            <span className="value">
              {resource.enhancement?.culturalAuthenticity?.toFixed(1) || 'N/A'}/10
            </span>
          </div>
          <div className="quality-badge">
            <span className="label">Cultural Elements:</span>
            <span className="value">{resource.culturalElements}/5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealLessonViewer;
