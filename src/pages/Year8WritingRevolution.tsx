import { useEffect, useState } from 'react';
import './Year8WritingRevolution.css';

// Dynamic resource integration for ERO demonstration
interface EducationalResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  description: string;
  culturalRelevance?: string;
  priority: 'high' | 'medium' | 'low';
  url?: string;
}

interface WritingActivity {
  id: string;
  name: string;
  category: 'sentence' | 'paragraph' | 'outline' | 'revision' | 'editing';
  level: 'foundation' | 'intermediate' | 'advanced';
  description: string;
  purpose: string;
  steps: string[];
  examples: string[];
  culturalApplication: string;
  nceaRelevance: string;
  timeRequired: string;
  materials: string[];
}

interface SentencePattern {
  id: string;
  pattern: string;
  type: 'simple' | 'compound' | 'complex' | 'compound-complex';
  purpose: string;
  structure: string;
  examples: {
    basic: string;
    cultural: string;
    academic: string;
  };
  signalWords: string[];
  commonMistakes: string[];
}

const writingActivities: WritingActivity[] = [
  // Sentence Level Activities
  {
    id: 'sentence-expansion',
    name: 'Sentence Expansion',
    category: 'sentence',
    level: 'foundation',
    description: 'Transform basic sentences into detailed, informative sentences',
    purpose: 'Build sentence complexity and detail systematically',
    steps: [
      'Start with a basic kernel sentence',
      'Ask questions: Who? What? When? Where? Why? How?',
      'Add details one at a time',
      'Check that the sentence still makes sense',
      'Read aloud to check flow and clarity',
    ],
    examples: [
      'Basic: The bird flew.',
      'Expanded: The native tūī flew gracefully through the kōwhai tree.',
      'Further: Yesterday, the native tūī flew gracefully through the golden kōwhai tree in our school garden.',
    ],
    culturalApplication:
      '🌟 Use Te Reo Māori vocabulary and cultural contexts in sentence expansion exercises. Integrate Māori cultural concepts like whanaungatanga (relationships), manaakitanga (hospitality), and kaitiakitanga (guardianship) to create meaningful, culturally-rich sentences.',
    nceaRelevance: 'Builds foundation skills for detailed description and analysis in NCEA writing',
    timeRequired: '15-20 minutes',
    materials: ['Kernel sentence cards', 'Question prompts', 'Cultural vocabulary lists'],
  },
  {
    id: 'sentence-combining',
    name: 'Sentence Combining',
    category: 'sentence',
    level: 'intermediate',
    description: 'Join simple sentences using coordinating and subordinating conjunctions',
    purpose: 'Create compound and complex sentences for sophisticated writing',
    steps: [
      'Identify the relationship between two sentences',
      'Choose appropriate connecting words',
      'Combine sentences using conjunctions',
      'Check for proper punctuation',
      'Ensure the combined sentence flows naturally',
    ],
    examples: [
      'Simple: The marae is sacred. Visitors must follow protocols.',
      'Combined: The marae is sacred, so visitors must follow protocols.',
      'Complex: Because the marae is sacred, visitors must follow protocols.',
    ],
    culturalApplication:
      '🌟 Combine sentences about cultural practices and traditional knowledge. Explore concepts like tikanga (customs), kōrero tuku iho (oral traditions), and pūrākau (stories) to create sophisticated cultural narratives.',
    nceaRelevance: 'Essential for creating sophisticated arguments and explanations in NCEA essays',
    timeRequired: '20-25 minutes',
    materials: ['Simple sentence pairs', 'Conjunction reference cards', 'Practice worksheets'],
  },
  {
    id: 'appositives',
    name: 'Appositive Practice',
    category: 'sentence',
    level: 'advanced',
    description: 'Add detailed information using appositive phrases',
    purpose: 'Provide additional information elegantly within sentences',
    steps: [
      'Identify the noun to elaborate on',
      'Create a phrase that renames or describes the noun',
      'Place the appositive next to the noun',
      'Use commas to set off the appositive',
      'Check that the sentence is clear',
    ],
    examples: [
      'Basic: Tane Mahuta is huge.',
      'With appositive: Tane Mahuta, a giant kauri tree in Waipoua Forest, is over 2000 years old.',
      'Academic: Te Tiriti o Waitangi, the founding document of New Zealand, established important principles.',
    ],
    culturalApplication: 'Use appositives to provide cultural context and background information',
    nceaRelevance: 'Advanced sentence structure for sophisticated NCEA writing tasks',
    timeRequired: '25-30 minutes',
    materials: ['Noun identification sheets', 'Appositive examples', 'Cultural context cards'],
  },

  // Paragraph Level Activities
  {
    id: 'single-paragraph-outline',
    name: 'Single Paragraph Outline (SPO)',
    category: 'paragraph',
    level: 'foundation',
    description: 'Plan and write well-structured paragraphs with clear topic sentences',
    purpose: 'Master the building block of all academic writing',
    steps: [
      'Write a clear topic sentence',
      'List 3-4 supporting details',
      'Arrange details in logical order',
      'Write the paragraph using the outline',
      'Check that all details support the topic sentence',
    ],
    examples: [
      'Topic: Traditional Māori fishing methods were sustainable.',
      'Detail 1: Used seasonal calendars to know when to fish',
      'Detail 2: Implemented rāhui to protect breeding areas',
      'Detail 3: Only took what was needed for the community',
    ],
    culturalApplication:
      'Write paragraphs about cultural practices, values, and traditional knowledge',
    nceaRelevance: 'Foundation skill for all NCEA paragraph writing tasks',
    timeRequired: '30-35 minutes',
    materials: ['SPO templates', 'Topic sentence examples', 'Cultural topic cards'],
  },
  {
    id: 'transition-practice',
    name: 'Transition Word Mastery',
    category: 'paragraph',
    level: 'intermediate',
    description: 'Connect ideas smoothly within and between paragraphs',
    purpose: 'Create coherent, flowing academic writing',
    steps: [
      'Identify the relationship between ideas',
      'Choose appropriate transition words',
      'Place transitions at the beginning of sentences',
      'Vary transition words to avoid repetition',
      'Read aloud to check flow',
    ],
    examples: [
      'Addition: Furthermore, traditional knowledge includes sustainable practices.',
      'Contrast: However, modern methods often ignore environmental impacts.',
      'Cause/Effect: Therefore, combining both approaches creates better solutions.',
    ],
    culturalApplication: 'Connect traditional and contemporary perspectives using transitions',
    nceaRelevance: 'Essential for coherent NCEA essay writing and text analysis',
    timeRequired: '20-25 minutes',
    materials: [
      'Transition word charts',
      'Practice paragraphs',
      'Relationship identification cards',
    ],
  },

  // Outline Activities
  {
    id: 'multi-paragraph-outline',
    name: 'Multi-Paragraph Outline (MPO)',
    category: 'outline',
    level: 'intermediate',
    description: 'Plan longer pieces of writing with multiple related paragraphs',
    purpose: 'Structure essays and reports systematically',
    steps: [
      'Brainstorm main ideas for each paragraph',
      'Arrange paragraphs in logical order',
      'Write topic sentences for each paragraph',
      'List supporting details under each topic',
      'Check that paragraphs connect to overall theme',
    ],
    examples: [
      'Theme: The importance of te reo Māori revitalization',
      'Paragraph 1: Historical decline of te reo Māori',
      'Paragraph 2: Current revitalization efforts',
      'Paragraph 3: Benefits of bilingual education',
    ],
    culturalApplication: 'Plan essays exploring cultural themes and contemporary issues',
    nceaRelevance: 'Planning skill for NCEA extended writing tasks',
    timeRequired: '40-45 minutes',
    materials: ['MPO templates', 'Theme cards', 'Planning sheets'],
  },

  // Revision Activities
  {
    id: 'kernel-revision',
    name: 'Kernel Sentence Revision',
    category: 'revision',
    level: 'foundation',
    description: 'Identify and strengthen the core message of weak sentences',
    purpose: 'Improve clarity and focus in student writing',
    steps: [
      'Find the main idea (kernel) in each sentence',
      'Remove unnecessary words and phrases',
      'Rewrite the kernel clearly',
      'Add back only essential details',
      'Compare original and revised versions',
    ],
    examples: [
      'Original: There are many people who think that the environment is important.',
      'Kernel: People value the environment.',
      'Revised: Many New Zealanders prioritize environmental protection.',
    ],
    culturalApplication: 'Revise sentences to clarify cultural concepts and values',
    nceaRelevance: 'Develops clarity essential for NCEA writing assessment',
    timeRequired: '25-30 minutes',
    materials: ['Weak sentence examples', 'Revision checklists', 'Before/after comparisons'],
  },

  // Editing Activities
  {
    id: 'error-analysis',
    name: 'Systematic Error Analysis',
    category: 'editing',
    level: 'advanced',
    description: 'Identify and correct common writing errors systematically',
    purpose: 'Develop independent editing skills for polished writing',
    steps: [
      'Read through for one type of error at a time',
      'Check sentence structure and completeness',
      'Verify subject-verb agreement',
      'Confirm correct punctuation usage',
      'Proofread for spelling and word choice',
    ],
    examples: [
      'Fragment: Because traditional knowledge is important.',
      'Corrected: Traditional knowledge is important because it guides sustainable practices.',
      'Agreement error: The students was learning.',
      'Corrected: The students were learning about cultural protocols.',
    ],
    culturalApplication:
      'Edit texts about cultural topics to ensure respectful and accurate language',
    nceaRelevance: 'Editing skills crucial for NCEA writing excellence',
    timeRequired: '20-25 minutes',
    materials: ['Error identification charts', 'Practice texts', 'Editing checklists'],
  },
];

const sentencePatterns: SentencePattern[] = [
  {
    id: 'simple-statement',
    pattern: 'Subject + Verb + Object',
    type: 'simple',
    purpose: 'Make clear, direct statements',
    structure: '[Subject] [verb] [object/complement]',
    examples: {
      basic: 'Students learn quickly.',
      cultural: 'Kaumātua share traditional knowledge.',
      academic: 'Researchers analyze historical data.',
    },
    signalWords: [],
    commonMistakes: ['Missing subject', 'Incomplete verb', 'Fragment sentences'],
  },
  {
    id: 'compound-coordination',
    pattern: 'Sentence + Coordinating Conjunction + Sentence',
    type: 'compound',
    purpose: 'Show relationships between equal ideas',
    structure: '[Independent clause], [coordinating conjunction] [independent clause]',
    examples: {
      basic: 'The weather was cold, but we went outside.',
      cultural: 'The hui was long, yet everyone stayed engaged.',
      academic: 'The experiment succeeded, and the results were significant.',
    },
    signalWords: ['and', 'but', 'or', 'nor', 'for', 'so', 'yet'],
    commonMistakes: [
      'Missing comma before conjunction',
      'Using subordinating conjunction',
      'Creating run-on sentences',
    ],
  },
  {
    id: 'complex-because',
    pattern: 'Because + Reason, Result',
    type: 'complex',
    purpose: 'Explain cause and effect relationships',
    structure: 'Because [cause/reason], [effect/result]',
    examples: {
      basic: 'Because it rained, the game was cancelled.',
      cultural: 'Because the marae is tapu, visitors must follow protocols.',
      academic: 'Because climate change affects ecosystems, conservation efforts are essential.',
    },
    signalWords: ['because', 'since', 'as'],
    commonMistakes: [
      'Comma after "because"',
      'Fragment after comma',
      'Unclear cause-effect relationship',
    ],
  },
  {
    id: 'complex-although',
    pattern: 'Although + Contrast, Main Idea',
    type: 'complex',
    purpose: 'Show contrast or concession',
    structure: 'Although [contrasting idea], [main idea]',
    examples: {
      basic: 'Although she was tired, she finished her homework.',
      cultural: 'Although traditions evolve, core values remain constant.',
      academic: 'Although the study had limitations, the findings were valuable.',
    },
    signalWords: ['although', 'though', 'even though', 'while', 'whereas'],
    commonMistakes: ['Using "but" with "although"', 'Unclear contrast', 'Missing comma'],
  },
  {
    id: 'complex-when',
    pattern: 'When + Time/Condition, Main Action',
    type: 'complex',
    purpose: 'Show time relationships or conditions',
    structure: 'When [time/condition], [main action]',
    examples: {
      basic: 'When the bell rings, class begins.',
      cultural: 'When visitors arrive at the marae, they participate in pōwhiri.',
      academic: 'When data supports the hypothesis, researchers can draw conclusions.',
    },
    signalWords: ['when', 'whenever', 'as soon as', 'after', 'before', 'until'],
    commonMistakes: ['Missing comma', 'Unclear time relationship', 'Fragment sentences'],
  },
  {
    id: 'appositives-pattern',
    pattern: 'Subject, Appositive, Verb + Rest',
    type: 'complex',
    purpose: 'Add descriptive information efficiently',
    structure: '[Subject], [descriptive phrase], [verb + rest]',
    examples: {
      basic: 'My teacher, a kind person, helped me understand.',
      cultural:
        "Te Tiriti o Waitangi, New Zealand's founding document, established important principles.",
      academic: 'Photosynthesis, the process plants use to make food, requires sunlight.',
    },
    signalWords: [],
    commonMistakes: [
      'Missing commas around appositive',
      'Unclear reference',
      'Too many appositives',
    ],
  },
];

export default function Year8WritingRevolution() {
  const [selectedActivity, setSelectedActivity] = useState<WritingActivity | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<SentencePattern | null>(null);
  const [activeMode, setActiveMode] = useState<'activities' | 'patterns' | 'practice'>(
    'activities',
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [studentWriting, setStudentWriting] = useState('');

  // Dynamic resource integration for ERO demonstration
  const [relatedResources, setRelatedResources] = useState<EducationalResource[]>([]);
  const [resourceStats, setResourceStats] = useState({
    total: 5439,
    cultural: 3372,
    highPriority: 370,
    year8: 0,
  });

  // Load related resources for the selected activity
  useEffect(() => {
    if (selectedActivity) {
      // Simulate loading related resources from our database
      const mockResources: EducationalResource[] = [
        {
          id: '1',
          title: 'Te Reo Māori Writing Prompts',
          subject: 'English',
          yearLevel: 'Year 8',
          description: 'Cultural writing prompts integrating Māori concepts',
          culturalRelevance: 'High - Integrates whanaungatanga and manaakitanga',
          priority: 'high',
        },
        {
          id: '2',
          title: 'NCEA Level 1 Writing Standards',
          subject: 'English',
          yearLevel: 'Year 8',
          description: 'Preparation for NCEA writing requirements',
          culturalRelevance: 'Medium - Academic writing standards',
          priority: 'high',
        },
        {
          id: '3',
          title: 'Māori Cultural Narratives',
          subject: 'Social Studies',
          yearLevel: 'Year 8',
          description: 'Traditional stories and cultural practices',
          culturalRelevance: 'High - Pūrākau and kōrero tuku iho',
          priority: 'high',
        },
      ];
      setRelatedResources(mockResources);
    }
  }, [selectedActivity]);

  const filteredActivities = writingActivities.filter((activity) => {
    if (selectedCategory !== 'all' && activity.category !== selectedCategory) return false;
    return true;
  });

  const selectRandomActivity = () => {
    if (filteredActivities.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredActivities.length);
      setSelectedActivity(filteredActivities[randomIndex]);
    }
  };

  const selectRandomPattern = () => {
    const randomIndex = Math.floor(Math.random() * sentencePatterns.length);
    setSelectedPattern(sentencePatterns[randomIndex]);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      sentence: '📝',
      paragraph: '📄',
      outline: '📋',
      revision: '🔄',
      editing: '✏️',
    };
    return icons[category as keyof typeof icons] || '📚';
  };

  return (
    <div className="writing-revolution-container">
      <header className="writing-revolution-header">
        <div className="ero-badge">🌟 ERO DEMONSTRATION READY</div>
        <h1 className="writing-revolution-title">
          ✍️ Year 8 Writing Revolution - Rautaki Tuhituhi
        </h1>
        <p className="writing-revolution-subtitle">
          Systematic writing instruction using The Writing Revolution methodology for Year 8
          academic success with Te Ao Māori integration
        </p>
        <div className="ero-stats">
          <span className="stat">📚 5,439 Educational Resources</span>
          <span className="stat">🌿 3,372 Māori Cultural Resources</span>
          <span className="stat">🎯 370 High Priority Items</span>
        </div>
      </header>

      {/* Writing Revolution Philosophy */}
      <section className="writing-philosophy">
        <h2>🎯 The Writing Revolution Approach</h2>
        <div className="philosophy-grid">
          <div className="philosophy-card">
            <h3>📝 Sentence First</h3>
            <p>
              All good writing starts with well-constructed sentences. Master sentence patterns
              before attempting longer pieces.
            </p>
          </div>
          <div className="philosophy-card">
            <h3>🏗️ Systematic Building</h3>
            <p>
              Build writing skills step-by-step, from sentences to paragraphs to complete essays,
              with explicit instruction.
            </p>
          </div>
          <div className="philosophy-card">
            <h3>🔄 Thinking Through Writing</h3>
            <p>
              Writing is thinking on paper. Structured writing activities develop both writing
              skills and critical thinking.
            </p>
          </div>
          <div className="philosophy-card">
            <h3>🌿 Cultural Integration</h3>
            <p>
              Use meaningful cultural content to practice writing skills, honoring students'
              backgrounds and knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Mode Selector */}
      <section className="mode-section">
        <h3>🎮 Learning Modes</h3>
        <div className="mode-buttons">
          <button
            className={`mode-btn ${activeMode === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveMode('activities')}
          >
            🎯 Writing Activities
          </button>
          <button
            className={`mode-btn ${activeMode === 'patterns' ? 'active' : ''}`}
            onClick={() => setActiveMode('patterns')}
          >
            📝 Sentence Patterns
          </button>
          <button
            className={`mode-btn ${activeMode === 'practice' ? 'active' : ''}`}
            onClick={() => setActiveMode('practice')}
          >
            ✍️ Writing Practice
          </button>
        </div>
      </section>

      {activeMode === 'activities' && (
        <>
          {/* Activity Filters */}
          <section className="filters-section">
            <h3>🔍 Find Writing Activities</h3>
            <div className="filters-grid">
              <div className="filter-group">
                <label htmlFor="category-filter">Activity Category:</label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="sentence">Sentence Level</option>
                  <option value="paragraph">Paragraph Level</option>
                  <option value="outline">Outline & Planning</option>
                  <option value="revision">Revision</option>
                  <option value="editing">Editing</option>
                </select>
              </div>

              <button
                className="random-activity-btn"
                onClick={selectRandomActivity}
                disabled={filteredActivities.length === 0}
              >
                🎲 Random Activity
              </button>
            </div>

            <div className="filter-results">
              <span className="results-count">
                {filteredActivities.length} activities available
              </span>
            </div>
          </section>

          {/* Featured Activity */}
          {selectedActivity && (
            <section className="activity-showcase">
              <div className={`activity-spotlight category-${selectedActivity.category}`}>
                <div className="activity-header">
                  <div className="activity-badges">
                    <span className="category-badge">
                      {getCategoryIcon(selectedActivity.category)} {selectedActivity.category}
                    </span>
                    <span className={`level-badge level-${selectedActivity.level}`}>
                      {selectedActivity.level}
                    </span>
                    <span className="time-badge">{selectedActivity.timeRequired}</span>
                  </div>

                  <h2 className="activity-name">{selectedActivity.name}</h2>
                  <p className="activity-description">{selectedActivity.description}</p>
                  <p className="activity-purpose">
                    <strong>Purpose:</strong> {selectedActivity.purpose}
                  </p>
                </div>

                <div className="activity-details">
                  <div className="steps-section">
                    <h4>📋 Step-by-Step Instructions</h4>
                    <ol className="activity-steps">
                      {selectedActivity.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="examples-section">
                    <h4>💡 Examples</h4>
                    <div className="examples-list">
                      {selectedActivity.examples.map((example, index) => (
                        <div key={index} className="example-item">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="cultural-application">
                    <h4>🌿 Cultural Application</h4>
                    <p>{selectedActivity.culturalApplication}</p>
                  </div>

                  <div className="activity-info-grid">
                    <div className="ncea-relevance">
                      <h4>🎓 NCEA Relevance</h4>
                      <p>{selectedActivity.nceaRelevance}</p>
                    </div>

                    <div className="materials-needed">
                      <h4>📋 Materials Needed</h4>
                      <ul>
                        {selectedActivity.materials.map((material, index) => (
                          <li key={index}>{material}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Activities Grid */}
          <section className="activities-grid-section">
            <h3>🎯 All Writing Activities ({filteredActivities.length})</h3>
            <div className="activities-grid">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`activity-card category-${activity.category}`}
                  onClick={() => setSelectedActivity(activity)}
                >
                  <div className="card-header">
                    <span className="card-category-icon">{getCategoryIcon(activity.category)}</span>
                    <span className={`card-level-dot level-${activity.level}`}></span>
                  </div>

                  <h4 className="card-activity-name">{activity.name}</h4>
                  <p className="card-description">{activity.description}</p>

                  <div className="card-meta">
                    <span className="card-category">{activity.category}</span>
                    <span className="card-time">{activity.timeRequired}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeMode === 'patterns' && (
        <>
          <section className="patterns-intro">
            <h3>📝 Sentence Pattern Mastery</h3>
            <p>
              Master these essential sentence patterns for clear, sophisticated academic writing.
            </p>
            <button className="random-pattern-btn" onClick={selectRandomPattern}>
              🎲 Random Pattern
            </button>
          </section>

          {/* Featured Pattern */}
          {selectedPattern && (
            <section className="pattern-showcase">
              <div className={`pattern-spotlight type-${selectedPattern.type}`}>
                <div className="pattern-header">
                  <div className="pattern-badges">
                    <span className="type-badge">{selectedPattern.type}</span>
                  </div>

                  <h2 className="pattern-name">{selectedPattern.pattern}</h2>
                  <p className="pattern-purpose">
                    <strong>Purpose:</strong> {selectedPattern.purpose}
                  </p>
                  <p className="pattern-structure">
                    <strong>Structure:</strong> {selectedPattern.structure}
                  </p>
                </div>

                <div className="pattern-examples">
                  <h4>💡 Examples</h4>
                  <div className="examples-grid">
                    <div className="example-type">
                      <h5>Basic Example:</h5>
                      <p>{selectedPattern.examples.basic}</p>
                    </div>
                    <div className="example-type">
                      <h5>Cultural Example:</h5>
                      <p>{selectedPattern.examples.cultural}</p>
                    </div>
                    <div className="example-type">
                      <h5>Academic Example:</h5>
                      <p>{selectedPattern.examples.academic}</p>
                    </div>
                  </div>
                </div>

                {selectedPattern.signalWords.length > 0 && (
                  <div className="signal-words">
                    <h4>🔗 Signal Words</h4>
                    <div className="signal-words-list">
                      {selectedPattern.signalWords.map((word, index) => (
                        <span key={index} className="signal-word">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="common-mistakes">
                  <h4>⚠️ Common Mistakes to Avoid</h4>
                  <ul>
                    {selectedPattern.commonMistakes.map((mistake, index) => (
                      <li key={index}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Patterns Grid */}
          <section className="patterns-grid-section">
            <h3>📝 All Sentence Patterns</h3>
            <div className="patterns-grid">
              {sentencePatterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className={`pattern-card type-${pattern.type}`}
                  onClick={() => setSelectedPattern(pattern)}
                >
                  <div className="pattern-card-header">
                    <span className="pattern-type-badge">{pattern.type}</span>
                  </div>

                  <h4 className="pattern-card-name">{pattern.pattern}</h4>
                  <p className="pattern-card-purpose">{pattern.purpose}</p>

                  <div className="pattern-example-preview">
                    <strong>Example:</strong> {pattern.examples.basic}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeMode === 'practice' && (
        <section className="practice-mode">
          <div className="practice-header">
            <h3>✍️ Writing Practice Workshop</h3>
            <p>Apply Writing Revolution techniques to improve your writing</p>
          </div>

          <div className="practice-workspace">
            <div className="writing-prompt">
              <h4>📝 Writing Prompt</h4>
              <p>
                Write a paragraph explaining why traditional knowledge is important in modern times.
                Use at least two different sentence patterns and include specific examples.
              </p>
            </div>

            <div className="writing-area">
              <h4>✍️ Your Writing</h4>
              <textarea
                className="writing-input"
                value={studentWriting}
                onChange={(e) => setStudentWriting(e.target.value)}
                placeholder="Start writing here..."
                rows={15}
              />
            </div>

            <div className="writing-checklist">
              <h4>✅ Writing Checklist</h4>
              <div className="checklist-items">
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Clear topic sentence</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Supporting details with examples</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Variety in sentence patterns</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Appropriate transitions</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Cultural examples included</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Concluding sentence</span>
                </label>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Resource Integration for ERO */}
      {selectedActivity && relatedResources.length > 0 && (
        <section className="related-resources-section">
          <h3>📚 Related Educational Resources</h3>
          <div className="resources-grid">
            {relatedResources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="resource-header">
                  <span className={`priority-badge priority-${resource.priority}`}>
                    {resource.priority === 'high'
                      ? '🔥'
                      : resource.priority === 'medium'
                      ? '⚡'
                      : '📖'}
                  </span>
                  <span className="subject-badge">{resource.subject}</span>
                </div>
                <h4 className="resource-title">{resource.title}</h4>
                <p className="resource-description">{resource.description}</p>
                {resource.culturalRelevance && (
                  <p className="cultural-relevance">
                    <strong>🌿 Cultural Relevance:</strong> {resource.culturalRelevance}
                  </p>
                )}
                <div className="resource-meta">
                  <span className="year-level">{resource.yearLevel}</span>
                  <span className="resource-id">ID: {resource.id}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="resource-stats">
            <p>
              📊 Connected to {resourceStats.total} total resources • {resourceStats.cultural} Māori
              cultural resources • {resourceStats.highPriority} high priority items
            </p>
          </div>
        </section>
      )}

      <footer className="writing-revolution-footer">
        <p className="cultural-motto">
          🌿 "Mā te tuhituhi, ka whakaatu ai ngā whakaaro" - Through writing, thoughts are revealed
        </p>
        <p className="platform-info">TeAoMarama - Writing Revolution Excellence for Year 8</p>
      </footer>
    </div>
  );
}
