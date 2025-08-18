import { useState } from 'react';
import './Year8ReadingStrategies.css';

interface ReadingStrategy {
  id: string;
  name: string;
  category: 'before-reading' | 'during-reading' | 'after-reading' | 'vocabulary' | 'comprehension';
  description: string;
  steps: string[];
  culturalApplication: string;
  textTypes: string[];
  difficulty: 'foundation' | 'developing' | 'advanced';
  nceaConnection: string;
  graphicOrganizer?: string;
  examples: string[];
}

interface TextSample {
  id: string;
  title: string;
  author: string;
  type: 'narrative' | 'informational' | 'poetry' | 'article' | 'speech';
  culturalContext: 'maori' | 'pacific' | 'multicultural' | 'nz-contemporary' | 'general';
  excerpt: string;
  comprehensionQuestions: {
    literal: string[];
    inferential: string[];
    evaluative: string[];
  };
  vocabularyFocus: string[];
  readingLevel: number;
}

const readingStrategies: ReadingStrategy[] = [
  // Before Reading Strategies
  {
    id: 'preview-predict',
    name: 'Preview and Predict',
    category: 'before-reading',
    description: 'Activate prior knowledge and make predictions about text content',
    steps: [
      'Look at title, headings, and images',
      'Skim the first and last paragraphs',
      'Activate background knowledge',
      'Make predictions about content',
      'Set a purpose for reading',
    ],
    culturalApplication: 'Connect to whakapapa and cultural knowledge before reading Māori texts',
    textTypes: ['All text types'],
    difficulty: 'foundation',
    nceaConnection: 'Builds critical thinking skills for text analysis',
    graphicOrganizer: 'Prediction Chart',
    examples: [
      'Predicting story outcomes from cover art',
      'Connecting article topics to personal experience',
      'Setting purpose before reading instructions',
    ],
  },
  {
    id: 'kwa-chart',
    name: 'KWA Chart (Know, Want, Acquired)',
    category: 'before-reading',
    description: 'Organize prior knowledge and learning goals',
    steps: [
      'What do I already Know about this topic?',
      'What do I Want to learn?',
      'What have I Acquired/learned after reading?',
    ],
    culturalApplication: 'Include mātauranga Māori and cultural knowledge in "Know" column',
    textTypes: ['Informational texts', 'Articles', 'Non-fiction'],
    difficulty: 'developing',
    nceaConnection: 'Demonstrates research and inquiry skills',
    graphicOrganizer: 'Three-column chart',
    examples: [
      'Researching traditional Māori navigation',
      'Learning about environmental issues',
      'Exploring historical events',
    ],
  },

  // During Reading Strategies
  {
    id: 'think-aloud',
    name: 'Think-Aloud Protocol',
    category: 'during-reading',
    description: 'Verbalize thinking processes while reading',
    steps: [
      'Read a section aloud',
      'Stop and share your thinking',
      'Make connections and predictions',
      'Ask questions about confusing parts',
      'Visualize what you read',
    ],
    culturalApplication: 'Share cultural connections and validate diverse perspectives',
    textTypes: ['Complex narratives', 'Academic texts'],
    difficulty: 'developing',
    nceaConnection: 'Develops metacognitive awareness for deep analysis',
    examples: [
      'Thinking through character motivations',
      'Processing scientific explanations',
      'Understanding poetic imagery',
    ],
  },
  {
    id: 'annotation',
    name: 'Text Annotation',
    category: 'during-reading',
    description: 'Mark up text with notes, questions, and connections',
    steps: [
      'Highlight key ideas and evidence',
      'Circle unfamiliar vocabulary',
      'Write questions in margins',
      'Note personal connections',
      'Mark important quotes',
    ],
    culturalApplication: 'Note cultural references and compare with own cultural knowledge',
    textTypes: ['All text types'],
    difficulty: 'advanced',
    nceaConnection: 'Essential skill for NCEA close reading tasks',
    examples: [
      'Annotating poems for literary devices',
      'Marking evidence in arguments',
      'Noting bias in historical accounts',
    ],
  },
  {
    id: 'questioning',
    name: 'Strategic Questioning',
    category: 'during-reading',
    description: 'Generate questions at different cognitive levels',
    steps: [
      'Ask literal questions (What happened?)',
      'Ask inferential questions (Why did this happen?)',
      'Ask evaluative questions (What do you think?)',
      'Ask connection questions (How does this relate?)',
      'Ask extension questions (What if?)',
    ],
    culturalApplication: 'Ask questions that honor different cultural perspectives',
    textTypes: ['All text types'],
    difficulty: 'developing',
    nceaConnection: 'Builds questioning skills for independent analysis',
    examples: [
      'Questioning character decisions',
      "Evaluating author's evidence",
      'Connecting themes to real life',
    ],
  },

  // After Reading Strategies
  {
    id: 'summarizing',
    name: 'Strategic Summarizing',
    category: 'after-reading',
    description: 'Identify and synthesize key information',
    steps: [
      'Identify main ideas and key details',
      'Remove unnecessary information',
      'Combine related ideas',
      'Use your own words',
      'Check against original text',
    ],
    culturalApplication: 'Include cultural significance and diverse perspectives in summaries',
    textTypes: ['All text types'],
    difficulty: 'developing',
    nceaConnection: 'Critical skill for NCEA written responses',
    examples: [
      'Summarizing scientific articles',
      'Condensing historical events',
      'Capturing story themes',
    ],
  },
  {
    id: 'text-to-connections',
    name: 'Text-to-Self/World/Text Connections',
    category: 'after-reading',
    description: 'Make meaningful connections to deepen understanding',
    steps: [
      'Text-to-Self: How does this relate to my life?',
      'Text-to-World: How does this connect to world events?',
      'Text-to-Text: How does this relate to other readings?',
      'Discuss connections with others',
      'Evaluate the strength of connections',
    ],
    culturalApplication: 'Honor connections to whānau, iwi, and cultural experiences',
    textTypes: ['All text types'],
    difficulty: 'foundation',
    nceaConnection: 'Demonstrates personal engagement with texts',
    examples: [
      'Connecting characters to family members',
      'Relating themes to current events',
      "Comparing different authors' styles",
    ],
  },

  // Vocabulary Strategies
  {
    id: 'context-clues',
    name: 'Context Clues Detective',
    category: 'vocabulary',
    description: 'Use surrounding text to determine word meaning',
    steps: [
      'Read the sentence containing the unknown word',
      'Look for definition clues in surrounding sentences',
      'Check for examples or synonyms nearby',
      'Consider word parts (prefix, root, suffix)',
      'Make an educated guess and check if it makes sense',
    ],
    culturalApplication: 'Apply knowledge of Te Reo Māori word patterns and meanings',
    textTypes: ['Academic texts', 'Literature'],
    difficulty: 'developing',
    nceaConnection: 'Essential for understanding complex texts independently',
    examples: [
      'Inferring scientific term meanings',
      'Understanding historical vocabulary',
      'Decoding literary language',
    ],
  },

  // Comprehension Strategies
  {
    id: 'main-idea-details',
    name: 'Main Idea and Supporting Details',
    category: 'comprehension',
    description: 'Identify central themes and supporting evidence',
    steps: [
      'Ask: What is this mostly about?',
      'Look for topic sentences',
      'Identify supporting details',
      'Distinguish between main ideas and details',
      'Create a visual organizer',
    ],
    culturalApplication: 'Recognize how cultural perspectives shape main ideas',
    textTypes: ['Informational texts', 'Articles'],
    difficulty: 'foundation',
    nceaConnection: 'Foundation skill for all NCEA reading tasks',
    graphicOrganizer: 'Main Idea Web',
    examples: [
      'Analyzing news articles',
      'Understanding textbook chapters',
      'Identifying themes in stories',
    ],
  },
];

const textSamples: TextSample[] = [
  {
    id: 'sample-1',
    title: 'The Whakatōhea Migration',
    author: 'Traditional account (adapted)',
    type: 'narrative',
    culturalContext: 'maori',
    excerpt: `Long ago, the Whakatōhea people lived in Hawaiki, the ancestral homeland. Overcrowding and conflicts led them to seek new lands across the vast ocean. Their leader, Toi, gathered the strongest navigators and most seaworthy waka for the dangerous journey.

The voyage tested every skill they possessed. Using traditional navigation methods—reading the stars, following ocean currents, and watching for land birds—they sailed for many days. When storms threatened to overwhelm them, they called upon their spiritual strength and the protection of their ancestors.

Finally, they reached the shores of Aotearoa. The land was rich with forests, rivers, and harbors perfect for their new settlement. This migration became part of their whakapapa, connecting future generations to their brave ancestors who crossed the ocean to establish their people in this new homeland.`,
    comprehensionQuestions: {
      literal: [
        'Where did the Whakatōhea people originally live?',
        'Who was their leader during the migration?',
        'What navigation methods did they use?',
      ],
      inferential: [
        'Why might overcrowding have led to conflicts?',
        'What does "called upon their spiritual strength" suggest about Māori beliefs?',
        'How did this journey affect future generations?',
      ],
      evaluative: [
        'What qualities made this migration successful?',
        'How does this account reflect Māori values?',
        'What can modern people learn from this story?',
      ],
    },
    vocabularyFocus: ['migration', 'whakapapa', 'seaworthy', 'navigation', 'ancestors'],
    readingLevel: 8,
  },
  {
    id: 'sample-2',
    title: 'Climate Change in the Pacific',
    author: 'Dr. Maria Santos',
    type: 'article',
    culturalContext: 'pacific',
    excerpt: `Pacific Island nations face unprecedented challenges from climate change. Rising sea levels threaten to submerge entire communities, while changing weather patterns disrupt traditional fishing and farming practices that have sustained these cultures for centuries.

The impact extends beyond environmental concerns. Traditional knowledge systems, passed down through generations, must now adapt to rapidly changing conditions. Elders who once could predict weather patterns from natural signs find their wisdom challenged by unpredictable climate shifts.

However, Pacific communities are not passive victims. They combine traditional ecological knowledge with modern science to develop innovative solutions. Community-led conservation projects, sustainable fishing practices, and renewable energy initiatives demonstrate the resilience and adaptability of Pacific peoples.`,
    comprehensionQuestions: {
      literal: [
        'What environmental challenges do Pacific Islands face?',
        'How are traditional practices being affected?',
        'What solutions are communities developing?',
      ],
      inferential: [
        'Why might traditional knowledge be "challenged" by climate change?',
        'What does "unprecedented" suggest about these challenges?',
        'How do communities show resilience?',
      ],
      evaluative: [
        'How effective might combining traditional and modern knowledge be?',
        'What responsibility do other nations have to help?',
        'What lessons can other communities learn from Pacific responses?',
      ],
    },
    vocabularyFocus: ['unprecedented', 'submerge', 'disrupt', 'resilience', 'innovative'],
    readingLevel: 9,
  },
];

export default function Year8ReadingStrategies() {
  const [selectedStrategy, setSelectedStrategy] = useState<ReadingStrategy | null>(null);
  const [selectedText, setSelectedText] = useState<TextSample | null>(null);
  const [activeMode, setActiveMode] = useState<'strategies' | 'practice' | 'assessment'>(
    'strategies',
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [practiceAnswers, setPracticeAnswers] = useState<{ [key: string]: string }>({});

  const filteredStrategies = readingStrategies.filter((strategy) => {
    if (selectedCategory !== 'all' && strategy.category !== selectedCategory) return false;
    return true;
  });

  const selectRandomStrategy = () => {
    if (filteredStrategies.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredStrategies.length);
      setSelectedStrategy(filteredStrategies[randomIndex]);
    }
  };

  const selectRandomText = () => {
    const randomIndex = Math.floor(Math.random() * textSamples.length);
    setSelectedText(textSamples[randomIndex]);
    setPracticeAnswers({});
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'before-reading': '🎯',
      'during-reading': '📖',
      'after-reading': '💭',
      vocabulary: '📝',
      comprehension: '🧠',
    };
    return icons[category as keyof typeof icons] || '📚';
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setPracticeAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  return (
    <div className="year8-reading-container">
      <header className="year8-reading-header">
        <h1 className="year8-reading-title">📚 Year 8 Reading Strategies - Rautaki Pānui</h1>
        <p className="year8-reading-subtitle">
          Advanced reading comprehension strategies for Year 8 academic success and critical
          thinking
        </p>
      </header>

      {/* Strategic Reading Framework */}
      <section className="reading-framework">
        <h2>🎯 Strategic Reading for Year 8 Success</h2>
        <div className="framework-grid">
          <div className="framework-card">
            <h3>🎯 Before Reading</h3>
            <p>
              Activate prior knowledge, set purposes, and make predictions to prepare for successful
              reading.
            </p>
            <ul>
              <li>Preview text features</li>
              <li>Connect to cultural knowledge</li>
              <li>Set reading goals</li>
            </ul>
          </div>
          <div className="framework-card">
            <h3>📖 During Reading</h3>
            <p>
              Monitor comprehension, ask questions, and make connections while actively engaging
              with text.
            </p>
            <ul>
              <li>Think aloud about meaning</li>
              <li>Ask strategic questions</li>
              <li>Annotate key ideas</li>
            </ul>
          </div>
          <div className="framework-card">
            <h3>💭 After Reading</h3>
            <p>Synthesize information, evaluate understanding, and make meaningful connections.</p>
            <ul>
              <li>Summarize main ideas</li>
              <li>Evaluate arguments</li>
              <li>Connect to world knowledge</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mode Selector */}
      <section className="mode-section">
        <h3>🎮 Learning Modes</h3>
        <div className="mode-buttons">
          <button
            className={`mode-btn ${activeMode === 'strategies' ? 'active' : ''}`}
            onClick={() => setActiveMode('strategies')}
          >
            🧠 Strategy Instruction
          </button>
          <button
            className={`mode-btn ${activeMode === 'practice' ? 'active' : ''}`}
            onClick={() => setActiveMode('practice')}
          >
            📖 Guided Practice
          </button>
          <button
            className={`mode-btn ${activeMode === 'assessment' ? 'active' : ''}`}
            onClick={() => setActiveMode('assessment')}
          >
            📊 Reading Assessment
          </button>
        </div>
      </section>

      {activeMode === 'strategies' && (
        <>
          {/* Strategy Filters */}
          <section className="filters-section">
            <h3>🔍 Find Reading Strategies</h3>
            <div className="filters-grid">
              <div className="filter-group">
                <label htmlFor="category-filter">Strategy Category:</label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="before-reading">Before Reading</option>
                  <option value="during-reading">During Reading</option>
                  <option value="after-reading">After Reading</option>
                  <option value="vocabulary">Vocabulary</option>
                  <option value="comprehension">Comprehension</option>
                </select>
              </div>

              <button
                className="random-strategy-btn"
                onClick={selectRandomStrategy}
                disabled={filteredStrategies.length === 0}
              >
                🎲 Random Strategy
              </button>
            </div>

            <div className="filter-results">
              <span className="results-count">
                {filteredStrategies.length} strategies available
              </span>
            </div>
          </section>

          {/* Featured Strategy */}
          {selectedStrategy && (
            <section className="strategy-showcase">
              <div className={`strategy-spotlight category-${selectedStrategy.category}`}>
                <div className="strategy-header">
                  <div className="strategy-badges">
                    <span className="category-badge">
                      {getCategoryIcon(selectedStrategy.category)} {selectedStrategy.category}
                    </span>
                    <span className={`difficulty-badge difficulty-${selectedStrategy.difficulty}`}>
                      {selectedStrategy.difficulty}
                    </span>
                  </div>

                  <h2 className="strategy-name">{selectedStrategy.name}</h2>
                  <p className="strategy-description">{selectedStrategy.description}</p>
                </div>

                <div className="strategy-details">
                  <div className="steps-section">
                    <h4>📝 Step-by-Step Process</h4>
                    <ol className="strategy-steps">
                      {selectedStrategy.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="cultural-application">
                    <h4>🌿 Cultural Application</h4>
                    <p>{selectedStrategy.culturalApplication}</p>
                  </div>

                  <div className="strategy-info-grid">
                    <div className="text-types">
                      <h4>📚 Best for Text Types</h4>
                      <div className="text-type-tags">
                        {selectedStrategy.textTypes.map((type, index) => (
                          <span key={index} className="text-type-tag">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="ncea-connection">
                      <h4>🎓 NCEA Connection</h4>
                      <p>{selectedStrategy.nceaConnection}</p>
                    </div>
                  </div>

                  {selectedStrategy.examples.length > 0 && (
                    <div className="examples-section">
                      <h4>💡 Examples in Practice</h4>
                      <div className="examples-grid">
                        {selectedStrategy.examples.map((example, index) => (
                          <div key={index} className="example-item">
                            {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Strategies Grid */}
          <section className="strategies-grid-section">
            <h3>🧠 All Reading Strategies ({filteredStrategies.length})</h3>
            <div className="strategies-grid">
              {filteredStrategies.map((strategy) => (
                <div
                  key={strategy.id}
                  className={`strategy-card category-${strategy.category}`}
                  onClick={() => setSelectedStrategy(strategy)}
                >
                  <div className="card-header">
                    <span className="card-category-icon">{getCategoryIcon(strategy.category)}</span>
                    <span
                      className={`card-difficulty-dot difficulty-${strategy.difficulty}`}
                    ></span>
                  </div>

                  <h4 className="card-strategy-name">{strategy.name}</h4>
                  <p className="card-description">{strategy.description}</p>

                  <div className="card-meta">
                    <span className="card-category">{strategy.category}</span>
                    <span className="card-difficulty">{strategy.difficulty}</span>
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
            <h3>📖 Guided Reading Practice</h3>
            <p>Apply reading strategies with authentic New Zealand texts</p>
            <button className="new-text-btn" onClick={selectRandomText}>
              📚 New Reading Passage
            </button>
          </div>

          {selectedText && (
            <div className="practice-workspace">
              <div className="text-info">
                <h3 className="text-title">{selectedText.title}</h3>
                <div className="text-meta">
                  <span className="text-author">by {selectedText.author}</span>
                  <span className="text-type">{selectedText.type}</span>
                  <span className="cultural-context">{selectedText.culturalContext}</span>
                  <span className="reading-level">Level {selectedText.readingLevel}</span>
                </div>
              </div>

              <div className="reading-passage">
                <h4>📝 Reading Passage</h4>
                <div className="passage-text">{selectedText.excerpt}</div>
              </div>

              <div className="vocabulary-focus">
                <h4>🔍 Vocabulary Focus</h4>
                <div className="vocab-words">
                  {selectedText.vocabularyFocus.map((word, index) => (
                    <span key={index} className="vocab-word">
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <div className="comprehension-questions">
                <h4>🧠 Comprehension Questions</h4>

                <div className="question-category">
                  <h5>📖 Literal Questions (What the text says)</h5>
                  {selectedText.comprehensionQuestions.literal.map((question, index) => (
                    <div key={`literal-${index}`} className="question-item">
                      <p className="question">{question}</p>
                      <textarea
                        className="answer-input"
                        placeholder="Your answer..."
                        value={practiceAnswers[`literal-${index}`] || ''}
                        onChange={(e) => handleAnswerChange(`literal-${index}`, e.target.value)}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>

                <div className="question-category">
                  <h5>🔍 Inferential Questions (What the text means)</h5>
                  {selectedText.comprehensionQuestions.inferential.map((question, index) => (
                    <div key={`inferential-${index}`} className="question-item">
                      <p className="question">{question}</p>
                      <textarea
                        className="answer-input"
                        placeholder="Your answer..."
                        value={practiceAnswers[`inferential-${index}`] || ''}
                        onChange={(e) => handleAnswerChange(`inferential-${index}`, e.target.value)}
                        rows={3}
                      />
                    </div>
                  ))}
                </div>

                <div className="question-category">
                  <h5>💭 Evaluative Questions (What you think)</h5>
                  {selectedText.comprehensionQuestions.evaluative.map((question, index) => (
                    <div key={`evaluative-${index}`} className="question-item">
                      <p className="question">{question}</p>
                      <textarea
                        className="answer-input"
                        placeholder="Your answer..."
                        value={practiceAnswers[`evaluative-${index}`] || ''}
                        onChange={(e) => handleAnswerChange(`evaluative-${index}`, e.target.value)}
                        rows={4}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {activeMode === 'assessment' && (
        <section className="assessment-mode">
          <h3>📊 Reading Strategy Assessment</h3>
          <div className="assessment-info">
            <p>
              Track your progress with reading comprehension strategies and identify areas for
              growth.
            </p>
          </div>

          <div className="assessment-categories">
            <div className="assessment-category">
              <h4>🎯 Before Reading Skills</h4>
              <ul>
                <li>Can activate prior knowledge effectively</li>
                <li>Makes relevant predictions</li>
                <li>Sets clear reading purposes</li>
                <li>Previews text features systematically</li>
              </ul>
            </div>

            <div className="assessment-category">
              <h4>📖 During Reading Skills</h4>
              <ul>
                <li>Monitors comprehension actively</li>
                <li>Uses fix-up strategies when confused</li>
                <li>Asks strategic questions</li>
                <li>Makes meaningful connections</li>
              </ul>
            </div>

            <div className="assessment-category">
              <h4>💭 After Reading Skills</h4>
              <ul>
                <li>Summarizes main ideas accurately</li>
                <li>Evaluates author's arguments</li>
                <li>Makes text-to-world connections</li>
                <li>Reflects on reading strategies used</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      <footer className="year8-reading-footer">
        <p className="cultural-motto">
          🌿 "Mā te pānui, ka mārama" - Through reading, understanding comes
        </p>
        <p className="platform-info">Te Kete Ako - Year 8 Reading Excellence</p>
      </footer>
    </div>
  );
}
