import { useState } from 'react';
import './LessonsIntegration.css';

interface LessonSegment {
  id: string;
  name: string;
  timeMinutes: number;
  purpose: string;
  teacherActions: string[];
  studentActions: string[];
  resources: string[];
}

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  yearLevel: number;
  duration: number;
  learningIntention: {
    type: 'WALT' | 'WALA';
    statement: string;
    successCriteria: string[];
  };
  doNow: {
    title: string;
    description: string;
    timeMinutes: number;
    instructions: string;
  };
  segments: LessonSegment[];
  culturalIntegration: string[];
  assessment: string[];
  resources: string[];
}

interface CriticalThinkingModule {
  id: string;
  title: string;
  description: string;
  focus: string;
  activities: {
    title: string;
    description: string;
    timeMinutes: number;
    materials: string[];
  }[];
  culturalConnections: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const lessonPlans: LessonPlan[] = [
  {
    id: 'sentence-expansion',
    title: 'Sentence Expansion with Cultural Context',
    subject: 'Structured Literacy',
    yearLevel: 8,
    duration: 75,
    learningIntention: {
      type: 'WALT',
      statement: 'Expand basic sentences by adding details about who, what, when, where, why, and how, using cultural contexts and te reo Māori vocabulary',
      successCriteria: [
        'I can transform a basic kernel sentence into a detailed, informative sentence',
        'I can include cultural context and answer multiple question words',
        'I can use te reo Māori vocabulary appropriately in sentence expansion',
      ],
    },
    doNow: {
      title: 'Cultural Connection Warm-up',
      description: 'Display image of a tūī bird and ask students to share what they know about this native bird',
      timeMinutes: 10,
      instructions: 'Show a simple sentence "The tūī flew" and ask students to think about what questions they could ask to add more detail',
    },
    segments: [
      {
        id: 'intro',
        name: 'Introduction to Sentence Expansion',
        timeMinutes: 10,
        purpose: 'Explain the concept of sentence expansion using the Writing Revolution methodology',
        teacherActions: [
          'Demonstrate the question words: Who? What? When? Where? Why? How?',
          'Show cultural example: "The kaumātua spoke" → "The respected kaumātua spoke about whakapapa during the hui"',
          'Discuss how cultural knowledge adds meaning and detail to sentences',
        ],
        studentActions: [
          'Listen and ask clarifying questions',
          'Make connections to prior knowledge',
          'Engage with cultural examples',
        ],
        resources: ['Whiteboard', 'Cultural vocabulary lists', 'Example sentences'],
      },
      {
        id: 'guided',
        name: 'Guided Practice',
        timeMinutes: 20,
        purpose: 'Work through examples together as a class using cultural contexts',
        teacherActions: [
          'Model sentence expansion process step by step',
          'Provide scaffolding for te reo Māori vocabulary',
          'Encourage cultural knowledge sharing',
        ],
        studentActions: [
          'Participate in guided practice',
          'Contribute cultural knowledge',
          'Practice using question words',
        ],
        resources: ['Sentence expansion templates', 'Cultural vocabulary lists', 'Te reo Māori dictionaries'],
      },
      {
        id: 'independent',
        name: 'Independent Practice',
        timeMinutes: 15,
        purpose: 'Students work in pairs to expand kernel sentences with cultural contexts',
        teacherActions: [
          'Monitor student work and provide support',
          'Encourage use of te reo Māori vocabulary',
          'Facilitate peer collaboration',
        ],
        studentActions: [
          'Work in pairs to expand sentences',
          'Add at least 3 details using question words',
          'Use te reo Māori vocabulary and cultural contexts',
        ],
        resources: ['Sentence cards', 'Cultural image cards', 'Peer feedback forms'],
      },
    ],
    culturalIntegration: [
      'Use of te reo Māori vocabulary in sentence expansion',
      'Cultural concepts like whakapapa and mana in examples',
      'Native bird (tūī) as cultural context',
      'Traditional practices (karakia, hui) as sentence content',
    ],
    assessment: [
      'Student demonstration of expanded sentences',
      'Formative assessment of sentence complexity',
      'Cultural knowledge application evaluation',
      'Homework assignment on personal whakapapa',
    ],
    resources: [
      'Tūī bird image',
      'Sentence expansion templates',
      'Cultural vocabulary lists',
      'Te reo Māori dictionaries',
      'Example sentences on cards',
    ],
  },
  {
    id: 'phonological-awareness',
    title: 'Phonological Awareness with Te Reo Māori',
    subject: 'Structured Literacy',
    yearLevel: 7,
    duration: 60,
    learningIntention: {
      type: 'WALT',
      statement: 'Develop phonological awareness through te reo Māori sounds and patterns',
      successCriteria: [
        'I can identify and produce te reo Māori phonemes',
        'I can blend and segment Māori words',
        'I can recognize sound patterns in cultural vocabulary',
      ],
    },
    doNow: {
      title: 'Sound Warm-up',
      description: 'Practice te reo Māori vowel sounds with hand signals',
      timeMinutes: 8,
      instructions: 'Students practice a, e, i, o, u sounds with corresponding hand movements',
    },
    segments: [
      {
        id: 'intro',
        name: 'Te Reo Māori Phonemes',
        timeMinutes: 15,
        purpose: 'Introduce te reo Māori sound system and cultural significance',
        teacherActions: [
          'Demonstrate te reo Māori vowel sounds',
          'Explain cultural significance of sound patterns',
          'Connect sounds to traditional words and names',
        ],
        studentActions: [
          'Practice vowel sounds with hand signals',
          'Repeat after teacher with correct pronunciation',
          'Make connections to familiar Māori words',
        ],
        resources: ['Phoneme charts', 'Audio recordings', 'Cultural vocabulary cards'],
      },
      {
        id: 'practice',
        name: 'Blending and Segmenting',
        timeMinutes: 20,
        purpose: 'Practice blending and segmenting te reo Māori words',
        teacherActions: [
          'Model blending sounds to form words',
          'Guide students in segmenting words into sounds',
          'Provide feedback on pronunciation',
        ],
        studentActions: [
          'Blend sounds to read Māori words',
          'Segment words into individual sounds',
          'Practice with partner using word cards',
        ],
        resources: ['Word cards', 'Sound tiles', 'Partner practice sheets'],
      },
    ],
    culturalIntegration: [
      'Te reo Māori vowel sounds and pronunciation',
      'Cultural significance of sound patterns',
      'Traditional words and names as examples',
      'Hand signals for vowel sounds',
    ],
    assessment: [
      'Phoneme identification accuracy',
      'Blending and segmenting proficiency',
      'Pronunciation assessment',
      'Cultural vocabulary recognition',
    ],
    resources: [
      'Te reo Māori phoneme charts',
      'Audio recordings',
      'Cultural vocabulary cards',
      'Word cards',
      'Sound tiles',
    ],
  },
];

const criticalThinkingModules: CriticalThinkingModule[] = [
  {
    id: 'decision-making',
    title: 'Decision Making in Cultural Contexts',
    description: 'Develop critical thinking skills through culturally-grounded decision-making scenarios',
    focus: 'Logical reasoning, evidence evaluation, cultural perspective-taking',
    activities: [
      {
        title: 'Cultural Dilemma Analysis',
        description: 'Analyze decision-making scenarios that involve cultural considerations',
        timeMinutes: 25,
        materials: ['Scenario cards', 'Analysis framework', 'Discussion prompts'],
      },
      {
        title: 'Evidence Evaluation Workshop',
        description: 'Practice evaluating evidence from multiple cultural perspectives',
        timeMinutes: 20,
        materials: ['Evidence cards', 'Evaluation rubrics', 'Cultural context guides'],
      },
      {
        title: 'Perspective-Taking Exercise',
        description: 'Explore how different cultural perspectives influence decision-making',
        timeMinutes: 15,
        materials: ['Perspective cards', 'Role-play scenarios', 'Reflection sheets'],
      },
    ],
    culturalConnections: [
      'Māori decision-making processes (hui, consensus-building)',
      'Cultural values in decision-making (mana, whakapapa)',
      'Traditional knowledge systems in modern contexts',
      'Community consultation and collective wisdom',
    ],
    difficulty: 'intermediate',
  },
  {
    id: 'logical-fallacies',
    title: 'Identifying Logical Fallacies in Cultural Discourse',
    description: 'Learn to recognize and avoid logical fallacies in discussions about culture and society',
    focus: 'Critical analysis, argument evaluation, respectful discourse',
    activities: [
      {
        title: 'Fallacy Identification Game',
        description: 'Identify logical fallacies in cultural and social arguments',
        timeMinutes: 30,
        materials: ['Fallacy cards', 'Example scenarios', 'Identification guides'],
      },
      {
        title: 'Constructive Argument Building',
        description: 'Practice building strong, respectful arguments about cultural topics',
        timeMinutes: 25,
        materials: ['Argument templates', 'Evidence sources', 'Peer feedback forms'],
      },
      {
        title: 'Cultural Sensitivity in Debate',
        description: 'Learn to engage in critical discussion while respecting cultural protocols',
        timeMinutes: 20,
        materials: ['Discussion protocols', 'Cultural guidelines', 'Reflection prompts'],
      },
    ],
    culturalConnections: [
      'Respectful discourse in Māori culture (kōrero)',
      'Avoiding cultural appropriation in arguments',
      'Recognizing bias in cultural discussions',
      'Building bridges between different perspectives',
    ],
    difficulty: 'advanced',
  },
  {
    id: 'evidence-evaluation',
    title: 'Evidence Evaluation with Cultural Intelligence',
    description: 'Develop skills in evaluating evidence while considering cultural contexts and perspectives',
    focus: 'Evidence analysis, cultural intelligence, critical evaluation',
    activities: [
      {
        title: 'Multi-Perspective Evidence Analysis',
        description: 'Evaluate evidence from multiple cultural and disciplinary perspectives',
        timeMinutes: 35,
        materials: ['Evidence packets', 'Analysis frameworks', 'Cultural context guides'],
      },
      {
        title: 'Source Reliability Assessment',
        description: 'Assess the reliability of sources with cultural sensitivity',
        timeMinutes: 25,
        materials: ['Source evaluation checklists', 'Reliability criteria', 'Cultural protocols'],
      },
      {
        title: 'Evidence Synthesis Workshop',
        description: 'Synthesize evidence from diverse sources and perspectives',
        timeMinutes: 30,
        materials: ['Synthesis templates', 'Evidence organizers', 'Collaboration tools'],
      },
    ],
    culturalConnections: [
      'Traditional knowledge as evidence (mātauranga Māori)',
      'Oral tradition and written evidence',
      'Cultural protocols in evidence gathering',
      'Respecting diverse ways of knowing',
    ],
    difficulty: 'advanced',
  },
];

export default function LessonsIntegration() {
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan>(lessonPlans[0]);
  const [selectedModule, setSelectedModule] = useState<CriticalThinkingModule>(criticalThinkingModules[0]);
  const [activeTab, setActiveTab] = useState<'lessons' | 'critical-thinking' | 'cultural'>('lessons');

  return (
    <div className="lessons-container">
      <header className="lessons-header">
        <div className="header-content">
          <div className="badge">🎓 ERO DEMONSTRATION READY</div>
          <h1 className="title">📚 Lessons Integration</h1>
          <h2 className="subtitle">Structured literacy + critical thinking excellence</h2>
          <div className="meta">
            <span className="meta-item">🎓 Years 7-8 • 75-Minute Lessons</span>
            <span className="meta-item">🌿 Te Ao Māori • Western Academic</span>
            <span className="meta-item">✅ Cultural Safety: 100%</span>
          </div>
          <p className="description">
            Sophisticated lesson plans that integrate structured literacy with critical thinking, honoring both indigenous and Western educational approaches.
          </p>
        </div>
      </header>

      <section className="tabs">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'lessons' ? 'active' : ''}`}
            onClick={() => setActiveTab('lessons')}
          >
            📖 Structured Literacy
          </button>
          <button
            className={`tab-button ${activeTab === 'critical-thinking' ? 'active' : ''}`}
            onClick={() => setActiveTab('critical-thinking')}
          >
            🧠 Critical Thinking
          </button>
          <button
            className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
            onClick={() => setActiveTab('cultural')}
          >
            🌿 Cultural Integration
          </button>
        </div>
      </section>

      {activeTab === 'lessons' && (
        <section className="lessons">
          <h2>📖 Structured Literacy Lessons</h2>
          
          <div className="lesson-selector">
            {lessonPlans.map((lesson) => (
              <button
                key={lesson.id}
                className={`lesson-pill ${selectedLesson.id === lesson.id ? 'active' : ''}`}
                onClick={() => setSelectedLesson(lesson)}
              >
                {lesson.title}
              </button>
            ))}
          </div>

          <div className="lesson-details">
            <h3>{selectedLesson.title}</h3>
            <div className="lesson-meta">
              <span className="meta-badge">Year {selectedLesson.yearLevel}</span>
              <span className="meta-badge">{selectedLesson.duration} minutes</span>
              <span className="meta-badge">{selectedLesson.subject}</span>
            </div>

            <div className="learning-intention">
              <h4>{selectedLesson.learningIntention.type}</h4>
              <p>{selectedLesson.learningIntention.statement}</p>
              <ul>
                {selectedLesson.learningIntention.successCriteria.map((criterion, index) => (
                  <li key={index}>{criterion}</li>
                ))}
              </ul>
            </div>

            <div className="lesson-structure">
              <h4>Lesson Structure</h4>
              
              <div className="do-now">
                <h5>Do Now ({selectedLesson.doNow.timeMinutes} minutes)</h5>
                <p><strong>{selectedLesson.doNow.title}</strong></p>
                <p>{selectedLesson.doNow.description}</p>
                <p><em>{selectedLesson.doNow.instructions}</em></p>
              </div>

              <div className="segments">
                {selectedLesson.segments.map((segment) => (
                  <div key={segment.id} className="segment">
                    <h5>{segment.name} ({segment.timeMinutes} minutes)</h5>
                    <p><strong>Purpose:</strong> {segment.purpose}</p>
                    
                    <div className="segment-details">
                      <div className="teacher-actions">
                        <h6>Teacher Actions:</h6>
                        <ul>
                          {segment.teacherActions.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="student-actions">
                        <h6>Student Actions:</h6>
                        <ul>
                          {segment.studentActions.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lesson-resources">
              <h4>Resources</h4>
              <ul>
                {selectedLesson.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'critical-thinking' && (
        <section className="critical-thinking">
          <h2>🧠 Critical Thinking Modules</h2>
          
          <div className="module-selector">
            {criticalThinkingModules.map((module) => (
              <button
                key={module.id}
                className={`module-pill ${selectedModule.id === module.id ? 'active' : ''}`}
                onClick={() => setSelectedModule(module)}
              >
                {module.title}
              </button>
            ))}
          </div>

          <div className="module-details">
            <h3>{selectedModule.title}</h3>
            <p className="module-description">{selectedModule.description}</p>
            
            <div className="difficulty-badge">
              Difficulty: {selectedModule.difficulty.charAt(0).toUpperCase() + selectedModule.difficulty.slice(1)}
            </div>

            <div className="module-focus">
              <h4>Focus Areas</h4>
              <p>{selectedModule.focus}</p>
            </div>

            <div className="activities">
              <h4>Activities</h4>
              {selectedModule.activities.map((activity, index) => (
                <div key={index} className="activity">
                  <h5>{activity.title} ({activity.timeMinutes} minutes)</h5>
                  <p>{activity.description}</p>
                  <div className="materials">
                    <strong>Materials:</strong>
                    <ul>
                      {activity.materials.map((material, i) => (
                        <li key={i}>{material}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="cultural-connections">
              <h4>Cultural Connections</h4>
              <ul>
                {selectedModule.culturalConnections.map((connection, index) => (
                  <li key={index}>{connection}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'cultural' && (
        <section className="cultural">
          <h2>🌿 Cultural Integration Framework</h2>
          
          <div className="cultural-principles">
            <h3>🌟 Cultural Foundation</h3>
            <p>Our lessons honor diverse ways of knowing and being:</p>
            
            <div className="principles-grid">
              <div className="principle">
                <h4>🌿 Te Ao Māori</h4>
                <p>Indigenous Māori worldview and knowledge systems integrated throughout</p>
              </div>
              <div className="principle">
                <h4>🔬 Western Academic</h4>
                <p>Evidence-based structured literacy and critical thinking methodologies</p>
              </div>
              <div className="principle">
                <h4>🌍 Multicultural</h4>
                <p>Diverse cultural approaches to learning and thinking</p>
              </div>
              <div className="principle">
                <h4>💫 Holistic</h4>
                <p>Whole person learning (tinana, hinengaro, wairua, whānau)</p>
              </div>
            </div>
          </div>

          <div className="integration-examples">
            <h3>📋 Integration Examples</h3>
            
            <div className="example-grid">
              <div className="example">
                <h4>Structured Literacy</h4>
                <ul>
                  <li>Te reo Māori phonemes and pronunciation</li>
                  <li>Cultural vocabulary in sentence expansion</li>
                  <li>Traditional stories as reading materials</li>
                  <li>Whakataukī as writing models</li>
                </ul>
              </div>
              
              <div className="example">
                <h4>Critical Thinking</h4>
                <ul>
                  <li>Māori decision-making processes</li>
                  <li>Cultural perspective-taking</li>
                  <li>Traditional knowledge as evidence</li>
                  <li>Respectful discourse protocols</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="cultural-guidelines">
            <h3>📋 Implementation Guidelines</h3>
            <ul>
              <li>All cultural content requires cultural advisor validation</li>
              <li>Maintain cultural safety protocols throughout implementation</li>
              <li>Honor diverse learning styles and cultural expressions</li>
              <li>Include community consultation in lesson design</li>
              <li>Provide culturally responsive feedback and support</li>
            </ul>
          </div>
        </section>
      )}

      <footer className="footer">
        <p className="motto">🌿 "Whaowhia te kete mātauranga" — Fill the basket of knowledge</p>
        <p className="platform">TeAoMarama — World's Best Teaching Bank with Cultural Excellence</p>
      </footer>
    </div>
  );
}
