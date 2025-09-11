import React from 'react';
import { Clock, Users, BookOpen, Download, Printer } from 'lucide-react';
import './ActualLessonContent.css';

interface ActualLessonContentProps {
  resourceId: string;
  title: string;
  subject: string;
  yearLevel: string;
}

const ActualLessonContent: React.FC<ActualLessonContentProps> = ({
  resourceId,
  title,
  subject,
  yearLevel
}) => {
  
  // Generate actual lesson content based on the resource
  const generateLessonContent = () => {
    if (subject === 'Social Studies' && yearLevel === 'Year 8') {
      return {
        duration: '50 minutes',
        learningObjectives: [
          'Understand the structure of New Zealand\'s government system',
          'Identify the roles of different branches of government',
          'Connect government structure to democratic principles',
          'Relate government systems to Te Ao Māori governance concepts'
        ],
        materials: [
          'Whiteboard and markers',
          'Student worksheets (printed)',
          'New Zealand government structure diagram',
          'Computers/tablets for research',
          'Sticky notes for group activities'
        ],
        activities: [
          {
            time: '5 minutes',
            activity: 'Karakia and Introduction',
            description: 'Begin with karakia to create a respectful learning environment. Introduce today\'s topic: "How does our government work for all New Zealanders?"',
            instructions: [
              'Lead appropriate karakia with class',
              'Write learning objectives on the board',
              'Ask: "What do you already know about how New Zealand is governed?"',
              'Record initial ideas on whiteboard'
            ],
            materials: ['Whiteboard', 'markers']
          },
          {
            time: '15 minutes',
            activity: 'Government Structure Exploration',
            description: 'Interactive introduction to the three branches of government',
            instructions: [
              'Display New Zealand government structure diagram',
              'Explain Executive, Legislative, and Judicial branches',
              'Use real examples: Prime Minister, Parliament, Courts',
              'Ask students to identify which branch affects them most directly'
            ],
            materials: ['Government diagram', 'examples handout']
          },
          {
            time: '20 minutes',
            activity: 'Democratic Principles Investigation',
            description: 'Small group activity exploring how democracy works in practice',
            instructions: [
              'Divide class into groups of 3-4 students',
              'Each group investigates one democratic principle: voting, representation, accountability, or participation',
              'Groups research how their principle works in New Zealand',
              'Prepare 2-minute presentation for class'
            ],
            materials: ['Research worksheets', 'computers/tablets', 'sticky notes']
          },
          {
            time: '8 minutes',
            activity: 'Group Presentations',
            description: 'Students share their findings about democratic principles',
            instructions: [
              'Each group presents their democratic principle',
              'Other students ask questions and make connections',
              'Teacher facilitates discussion about how principles work together',
              'Highlight examples of these principles in action'
            ],
            materials: ['Presentation space', 'timer']
          },
          {
            time: '2 minutes',
            activity: 'Reflection and Homework Assignment',
            description: 'Consolidate learning and set expectations for next lesson',
            instructions: [
              'Ask: "How does understanding government help us as citizens?"',
              'Assign homework: Interview a family member about their experience with voting',
              'Preview next lesson on local government',
              'Close with karakia or moment of reflection'
            ],
            materials: ['Homework sheet']
          }
        ],
        culturalConnections: {
          concept: 'Rangatiratanga (Leadership and Governance)',
          explanation: 'Connect government concepts to Māori leadership traditions',
          application: 'Discuss how traditional Māori governance complements modern democratic systems',
          respectfulPractice: 'Acknowledge that Māori had sophisticated governance systems long before European arrival'
        },
        assessment: {
          formative: [
            'Observe student participation in group discussions',
            'Check understanding through questioning during activities',
            'Review group presentation content for accuracy'
          ],
          summative: [
            'Exit ticket: Name one way you can participate in New Zealand\'s democracy',
            'Homework interview demonstrates understanding of voting process'
          ]
        },
        differentiation: [
          'Visual learners: Government structure diagrams and flow charts',
          'Kinesthetic learners: Role-playing government roles',
          'Advanced students: Research additional democratic principles',
          'Support needed: Pair with confident partner, provide sentence starters'
        ],
        homework: {
          task: 'Democracy Interview',
          instructions: 'Interview a family member or adult about their experience voting in New Zealand. Ask: What was voting like? Why do you think voting is important? What would you tell young people about participating in democracy?',
          timeRequired: '15 minutes',
          materials: 'Interview question sheet'
        },
        extensionActivities: [
          'Research how other countries organize their governments',
          'Create a poster showing New Zealand\'s democratic principles',
          'Write a letter to your local MP about an issue you care about',
          'Visit Parliament\'s website to explore how laws are made'
        ]
      };
    }
    
    // For other subjects/year levels, return appropriate content
    return {
      duration: '50 minutes',
      learningObjectives: [
        `Understand key concepts in ${subject} for ${yearLevel} students`,
        'Apply learning to real-world situations',
        'Develop critical thinking skills',
        'Connect learning to personal experiences'
      ],
      materials: [
        'Whiteboard and markers',
        'Student worksheets',
        'Relevant textbooks or resources',
        'Interactive materials'
      ],
      activities: [
        {
          time: '10 minutes',
          activity: 'Introduction and Warm-up',
          description: 'Engage students and review previous learning',
          instructions: [
            'Welcome students and outline lesson objectives',
            'Quick review of previous lesson connections',
            'Introduce today\'s main topic with engaging question',
            'Activate prior knowledge through discussion'
          ],
          materials: ['Whiteboard', 'discussion prompts']
        },
        {
          time: '30 minutes',
          activity: 'Main Learning Activity',
          description: 'Core teaching and student engagement',
          instructions: [
            'Present key concepts with clear explanations',
            'Use interactive methods to maintain engagement',
            'Provide opportunities for student practice',
            'Check understanding throughout activity'
          ],
          materials: ['Teaching materials', 'student worksheets']
        },
        {
          time: '10 minutes',
          activity: 'Conclusion and Assessment',
          description: 'Consolidate learning and assess understanding',
          instructions: [
            'Summarize key learning points',
            'Quick assessment of student understanding',
            'Preview next lesson',
            'Assign relevant homework'
          ],
          materials: ['Assessment tools', 'homework sheets']
        }
      ],
      culturalConnections: {
        concept: 'Respectful Learning',
        explanation: 'Honor diverse ways of knowing and learning',
        application: 'Include different cultural perspectives in learning',
        respectfulPractice: 'Create inclusive learning environment for all students'
      },
      assessment: {
        formative: ['Ongoing observation', 'Questioning', 'Student discussions'],
        summative: ['Exit ticket', 'Homework task', 'Quick quiz']
      },
      differentiation: [
        'Visual: Use diagrams and charts',
        'Auditory: Include discussions and explanations',
        'Kinesthetic: Hands-on activities',
        'Support: Provide additional scaffolding'
      ],
      homework: {
        task: 'Reflection and Practice',
        instructions: 'Complete practice exercises and reflect on today\'s learning',
        timeRequired: '20 minutes',
        materials: 'Homework worksheet'
      },
      extensionActivities: [
        'Research related topics',
        'Create presentations or projects',
        'Connect to real-world applications',
        'Explore additional resources'
      ]
    };
  };

  const lesson = generateLessonContent();

  const handleDownload = () => {
    const lessonPlan = `
# ${title}
## ${subject} - ${yearLevel}

### Duration: ${lesson.duration}

### Learning Objectives:
${lesson.learningObjectives.map(obj => `- ${obj}`).join('\n')}

### Materials:
${lesson.materials.map(material => `- ${material}`).join('\n')}

### Lesson Activities:

${lesson.activities.map(activity => `
#### ${activity.activity} (${activity.time})
${activity.description}

**Instructions:**
${activity.instructions.map(instruction => `- ${instruction}`).join('\n')}

**Materials:** ${activity.materials?.join(', ')}
`).join('\n')}

### Cultural Connections:
**Concept:** ${lesson.culturalConnections.concept}
**Explanation:** ${lesson.culturalConnections.explanation}
**Application:** ${lesson.culturalConnections.application}
**Respectful Practice:** ${lesson.culturalConnections.respectfulPractice}

### Assessment:
**Formative:** ${lesson.assessment.formative.join(', ')}
**Summative:** ${lesson.assessment.summative.join(', ')}

### Differentiation:
${lesson.differentiation.map(diff => `- ${diff}`).join('\n')}

### Homework:
**Task:** ${lesson.homework.task}
**Instructions:** ${lesson.homework.instructions}
**Time Required:** ${lesson.homework.timeRequired}

### Extension Activities:
${lesson.extensionActivities.map(ext => `- ${ext}`).join('\n')}

---
Generated by TeAoMarama Educational Platform
    `;

    const blob = new Blob([lessonPlan], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_')}_lesson_plan.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="actual-lesson-content">
      <div className="lesson-header">
        <div className="lesson-title">
          <h1>{title}</h1>
          <div className="lesson-meta">
            <span className="subject">{subject}</span>
            <span className="year-level">{yearLevel}</span>
            <div className="duration">
              <Clock size={16} />
              {lesson.duration}
            </div>
          </div>
        </div>
        
        <div className="lesson-actions">
          <button onClick={handleDownload} className="action-btn download">
            <Download size={20} />
            Download Lesson Plan
          </button>
          <button onClick={handlePrint} className="action-btn print">
            <Printer size={20} />
            Print Lesson
          </button>
        </div>
      </div>

      <div className="lesson-content">
        {/* Learning Objectives */}
        <section className="lesson-section">
          <h2>🎯 Learning Objectives</h2>
          <ul className="objectives-list">
            {lesson.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </section>

        {/* Materials */}
        <section className="lesson-section">
          <h2>📚 Materials Needed</h2>
          <ul className="materials-list">
            {lesson.materials.map((material, index) => (
              <li key={index}>{material}</li>
            ))}
          </ul>
        </section>

        {/* Lesson Activities */}
        <section className="lesson-section activities">
          <h2>⏰ Lesson Activities</h2>
          {lesson.activities.map((activity, index) => (
            <div key={index} className="activity">
              <div className="activity-header">
                <h3>{activity.activity}</h3>
                <span className="activity-time">{activity.time}</span>
              </div>
              <p className="activity-description">{activity.description}</p>
              
              <div className="activity-instructions">
                <h4>Instructions:</h4>
                <ol>
                  {activity.instructions.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ol>
              </div>
              
              {activity.materials && (
                <div className="activity-materials">
                  <strong>Materials:</strong> {activity.materials.join(', ')}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Cultural Connections */}
        <section className="lesson-section cultural">
          <h2>🌿 Cultural Connections</h2>
          <div className="cultural-content">
            <div className="cultural-item">
              <strong>Concept:</strong> {lesson.culturalConnections.concept}
            </div>
            <div className="cultural-item">
              <strong>Explanation:</strong> {lesson.culturalConnections.explanation}
            </div>
            <div className="cultural-item">
              <strong>Application:</strong> {lesson.culturalConnections.application}
            </div>
            <div className="cultural-item">
              <strong>Respectful Practice:</strong> {lesson.culturalConnections.respectfulPractice}
            </div>
          </div>
        </section>

        {/* Assessment */}
        <section className="lesson-section">
          <h2>📊 Assessment</h2>
          <div className="assessment-content">
            <div className="assessment-type">
              <h4>Formative Assessment:</h4>
              <ul>
                {lesson.assessment.formative.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="assessment-type">
              <h4>Summative Assessment:</h4>
              <ul>
                {lesson.assessment.summative.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Differentiation */}
        <section className="lesson-section">
          <h2>🎨 Differentiation</h2>
          <ul className="differentiation-list">
            {lesson.differentiation.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Homework */}
        <section className="lesson-section homework">
          <h2>📝 Homework Assignment</h2>
          <div className="homework-content">
            <h4>{lesson.homework.task}</h4>
            <p><strong>Instructions:</strong> {lesson.homework.instructions}</p>
            <p><strong>Time Required:</strong> {lesson.homework.timeRequired}</p>
            <p><strong>Materials:</strong> {lesson.homework.materials}</p>
          </div>
        </section>

        {/* Extension Activities */}
        <section className="lesson-section">
          <h2>🚀 Extension Activities</h2>
          <ul className="extension-list">
            {lesson.extensionActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ActualLessonContent;