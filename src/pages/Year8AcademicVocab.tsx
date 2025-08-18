import React, { useState } from 'react';
import './Year8AcademicVocab.css';

interface AcademicWord {
  id: string;
  word: string;
  morphemes: string[];
  definition: string;
  subjectArea: 'english' | 'maths' | 'science' | 'social-studies' | 'arts' | 'health' | 'cross-curricular';
  difficulty: 'foundation' | 'developing' | 'secure';
  synonyms: string[];
  contextSentence: string;
  culturalConnection?: string;
  writingRevolutionPattern: string;
  codeComponents: string[];
  nceaRelevance: boolean;
  frequency: 'high' | 'medium' | 'low';
}

const year8AcademicWords: AcademicWord[] = [
  // English/Literature Academic Vocabulary
  {
    id: 'analyse-eng',
    word: 'analyse',
    morphemes: ['ana-', 'lys', '-e'],
    definition: 'To examine in detail to understand meaning or structure',
    subjectArea: 'english',
    difficulty: 'developing',
    synonyms: ['examine', 'study', 'investigate'],
    contextSentence: 'Students analyse the themes in traditional Māori pūrākau.',
    culturalConnection: 'Similar to the way kaumātua examine whakapapa for connections',
    writingRevolutionPattern: 'When we analyse [text], we discover [meaning].',
    codeComponents: ['a-na-lyse', 'long a', 'silent e'],
    nceaRelevance: true,
    frequency: 'high'
  },
  {
    id: 'interpret-eng',
    word: 'interpret',
    morphemes: ['inter-', 'pret'],
    definition: 'To explain the meaning of something',
    subjectArea: 'english',
    difficulty: 'developing',
    synonyms: ['explain', 'translate', 'decode'],
    contextSentence: 'We interpret the symbolism in contemporary Māori poetry.',
    culturalConnection: 'Like interpreting the meaning within whakataukī',
    writingRevolutionPattern: 'The author interprets [concept] through [technique].',
    codeComponents: ['in-ter-pret', 'consonant blends'],
    nceaRelevance: true,
    frequency: 'high'
  },
  {
    id: 'perspective-eng',
    word: 'perspective',
    morphemes: ['per-', 'spect', '-ive'],
    definition: 'A particular way of viewing or understanding something',
    subjectArea: 'english',
    difficulty: 'secure',
    synonyms: ['viewpoint', 'outlook', 'stance'],
    contextSentence: 'Each character offers a different perspective on colonisation.',
    culturalConnection: 'Acknowledging different iwi perspectives on historical events',
    writingRevolutionPattern: 'From [character\'s] perspective, [event] represents [meaning].',
    codeComponents: ['per-spec-tive', 'suffix -ive'],
    nceaRelevance: true,
    frequency: 'high'
  },

  // Science Academic Vocabulary  
  {
    id: 'hypothesis-sci',
    word: 'hypothesis',
    morphemes: ['hypo-', 'thesis'],
    definition: 'A testable prediction about what will happen in an experiment',
    subjectArea: 'science',
    difficulty: 'developing',
    synonyms: ['prediction', 'theory', 'proposition'],
    contextSentence: 'Our hypothesis predicts that native plants grow faster in local soil.',
    culturalConnection: 'Like traditional Māori observations about seasonal patterns',
    writingRevolutionPattern: 'If [condition], then [prediction] because [reasoning].',
    codeComponents: ['hy-po-the-sis', 'Greek origins'],
    nceaRelevance: true,
    frequency: 'medium'
  },
  {
    id: 'variable-sci',
    word: 'variable',
    morphemes: ['vari-', '-able'],
    definition: 'Something that can change in an experiment',
    subjectArea: 'science',
    difficulty: 'foundation',
    synonyms: ['factor', 'element', 'component'],
    contextSentence: 'Temperature is an important variable in plant growth experiments.',
    writingRevolutionPattern: 'The [type] variable in this experiment is [factor].',
    codeComponents: ['var-i-a-ble', 'suffix -able'],
    nceaRelevance: true,
    frequency: 'high'
  },
  {
    id: 'ecosystem-sci',
    word: 'ecosystem',
    morphemes: ['eco-', 'system'],
    definition: 'A community of living things and their environment',
    subjectArea: 'science',
    difficulty: 'developing',
    synonyms: ['habitat', 'environment', 'biosphere'],
    contextSentence: 'The wetland ecosystem supports many native bird species.',
    culturalConnection: 'Reflects Māori understanding of taiao - the interconnected natural world',
    writingRevolutionPattern: 'The [location] ecosystem contains [organisms] that [interaction].',
    codeComponents: ['e-co-sys-tem', 'compound word'],
    nceaRelevance: true,
    frequency: 'medium'
  },

  // Mathematics Academic Vocabulary
  {
    id: 'calculate-math',
    word: 'calculate',
    morphemes: ['calcul-', '-ate'],
    definition: 'To work out using mathematics',
    subjectArea: 'maths',
    difficulty: 'foundation',
    synonyms: ['compute', 'work out', 'determine'],
    contextSentence: 'Calculate the area of the marae ātea for the building project.',
    culturalConnection: 'Traditional Māori used calculations for waka construction',
    writingRevolutionPattern: 'To calculate [measurement], we [method] because [reasoning].',
    codeComponents: ['cal-cu-late', 'suffix -ate'],
    nceaRelevance: true,
    frequency: 'high'
  },
  {
    id: 'estimate-math',
    word: 'estimate',
    morphemes: ['estim-', '-ate'],
    definition: 'To calculate approximately',
    subjectArea: 'maths',
    difficulty: 'foundation',
    synonyms: ['approximate', 'guess', 'assess'],
    contextSentence: 'Estimate how many people can fit in the wharenui.',
    writingRevolutionPattern: 'I estimate [quantity] because [reasoning].',
    codeComponents: ['es-ti-mate', 'suffix -ate'],
    nceaRelevance: true,
    frequency: 'high'
  },

  // Social Studies Academic Vocabulary
  {
    id: 'society-ss',
    word: 'society',
    morphemes: ['soci-', '-ety'],
    definition: 'A group of people living together in an organized community',
    subjectArea: 'social-studies',
    difficulty: 'developing',
    synonyms: ['community', 'civilization', 'culture'],
    contextSentence: 'Traditional Māori society was organized around iwi and hapū.',
    culturalConnection: 'Understanding different forms of social organization in Te Ao Māori',
    writingRevolutionPattern: 'In [time/place] society, [group] were responsible for [role].',
    codeComponents: ['so-ci-e-ty', 'suffix -ety'],
    nceaRelevance: true,
    frequency: 'high'
  },
  {
    id: 'democracy-ss',
    word: 'democracy',
    morphemes: ['demo-', 'cracy'],
    definition: 'A system where people vote to choose their leaders',
    subjectArea: 'social-studies',
    difficulty: 'secure',
    synonyms: ['self-government', 'representative government'],
    contextSentence: 'New Zealand democracy includes Māori representation in Parliament.',
    culturalConnection: 'Comparing with traditional Māori consensus decision-making processes',
    writingRevolutionPattern: 'Democracy ensures that [people] can [participation] in [decisions].',
    codeComponents: ['de-moc-ra-cy', 'Greek roots'],
    nceaRelevance: true,
    frequency: 'medium'
  },

  // Cross-curricular Academic Vocabulary
  {
    id: 'evidence-cross',
    word: 'evidence',
    morphemes: ['evid-', '-ence'],
    definition: 'Information that proves something is true',
    subjectArea: 'cross-curricular',
    difficulty: 'developing',
    synonyms: ['proof', 'data', 'facts'],
    contextSentence: 'Archaeological evidence shows Māori settlement patterns.',
    culturalConnection: 'Traditional knowledge passed down through whakapapa as evidence',
    writingRevolutionPattern: 'The evidence shows [claim] because [support].',
    codeComponents: ['ev-i-dence', 'suffix -ence'],
    nceaRelevance: true,
    frequency: 'high'
  },
  {
    id: 'compare-cross',
    word: 'compare',
    morphemes: ['com-', 'pare'],
    definition: 'To look at similarities and differences',
    subjectArea: 'cross-curricular',
    difficulty: 'foundation',
    synonyms: ['contrast', 'examine', 'evaluate'],
    contextSentence: 'Compare traditional and modern methods of food preservation.',
    writingRevolutionPattern: 'When we compare [A] and [B], we notice [similarity/difference].',
    codeComponents: ['com-pare', 'prefix com-'],
    nceaRelevance: true,
    frequency: 'high'
  },
  {
    id: 'evaluate-cross',
    word: 'evaluate',
    morphemes: ['e-', 'valu-', '-ate'],
    definition: 'To judge the worth or importance of something',
    subjectArea: 'cross-curricular',
    difficulty: 'secure',
    synonyms: ['assess', 'judge', 'appraise'],
    contextSentence: 'Evaluate the effectiveness of different conservation strategies.',
    writingRevolutionPattern: 'To evaluate [topic], we must consider [criteria].',
    codeComponents: ['e-val-u-ate', 'suffix -ate'],
    nceaRelevance: true,
    frequency: 'high'
  }
];

export default function Year8AcademicVocab() {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentWord, setCurrentWord] = useState<AcademicWord | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'study' | 'sentence' | 'morpheme'>('study');

  const filteredWords = year8AcademicWords.filter(word => {
    if (selectedSubject !== 'all' && word.subjectArea !== selectedSubject) return false;
    if (selectedDifficulty !== 'all' && word.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const selectRandomWord = () => {
    if (filteredWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      setCurrentWord(filteredWords[randomIndex]);
      setShowBreakdown(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'foundation': '#4caf50',
      'developing': '#ff9800',
      'secure': '#2196f3'
    };
    return colors[difficulty as keyof typeof colors] || '#666';
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'english': '#e8f5e8',
      'maths': '#fff3e0',
      'science': '#e3f2fd',
      'social-studies': '#f3e5f5',
      'arts': '#fce4ec',
      'health': '#e0f2f1',
      'cross-curricular': '#fff8e1'
    };
    return colors[subject as keyof typeof colors] || '#f5f5f5';
  };

  const getSubjectIcon = (subject: string) => {
    const icons = {
      'english': '📚',
      'maths': '🧮',
      'science': '🔬',
      'social-studies': '🌍',
      'arts': '🎨',
      'health': '💪',
      'cross-curricular': '🎯'
    };
    return icons[subject as keyof typeof icons] || '📖';
  };

  return (
    <div className="year8-vocab-container">
      <header className="year8-vocab-header">
        <h1 className="year8-vocab-title">📖 Year 8 Academic Vocabulary - Kupu Mātauranga</h1>
        <p className="year8-vocab-subtitle">
          Essential academic vocabulary for Year 8 structured literacy and cross-curricular success
        </p>
      </header>

      {/* Year 8 Focus */}
      <section className="year8-focus">
        <h2>🎯 Why Academic Vocabulary Matters in Year 8</h2>
        <div className="focus-grid">
          <div className="focus-card">
            <h3>📈 Academic Transition</h3>
            <p>Year 8 students encounter more complex academic texts across all subjects. Building vocabulary is essential for comprehension and expression.</p>
          </div>
          <div className="focus-card">
            <h3>🔧 Morphological Awareness</h3>
            <p>Understanding word parts helps students decode unfamiliar academic terms and build vocabulary systematically.</p>
          </div>
          <div className="focus-card">
            <h3>✍️ Writing Development</h3>
            <p>Academic vocabulary enables more sophisticated expression using Writing Revolution sentence patterns.</p>
          </div>
          <div className="focus-card">
            <h3>🌿 Cultural Integration</h3>
            <p>Connecting academic terms to Te Ao Māori concepts builds deeper understanding and cultural relevance.</p>
          </div>
        </div>
      </section>

      {/* Practice Mode Selector */}
      <section className="practice-mode-section">
        <h3>🎮 Practice Modes</h3>
        <div className="mode-buttons">
          <button 
            className={`mode-btn ${practiceMode === 'study' ? 'active' : ''}`}
            onClick={() => setPracticeMode('study')}
          >
            📚 Study Mode
          </button>
          <button 
            className={`mode-btn ${practiceMode === 'sentence' ? 'active' : ''}`}
            onClick={() => setPracticeMode('sentence')}
          >
            ✍️ Sentence Building
          </button>
          <button 
            className={`mode-btn ${practiceMode === 'morpheme' ? 'active' : ''}`}
            onClick={() => setPracticeMode('morpheme')}
          >
            🔬 Word Analysis
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <h3>🔍 Filter Academic Words</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="subject-filter">Subject Area:</label>
            <select 
              id="subject-filter"
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">All Subjects</option>
              <option value="english">English</option>
              <option value="maths">Mathematics</option>
              <option value="science">Science</option>
              <option value="social-studies">Social Studies</option>
              <option value="cross-curricular">Cross-curricular</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="difficulty-filter">Difficulty Level:</label>
            <select 
              id="difficulty-filter"
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="foundation">Foundation</option>
              <option value="developing">Developing</option>
              <option value="secure">Secure</option>
            </select>
          </div>

          <button 
            className="random-word-btn"
            onClick={selectRandomWord}
            disabled={filteredWords.length === 0}
          >
            🎲 Random Word
          </button>
        </div>
        
        <div className="filter-results">
          <span className="results-count">{filteredWords.length} academic words available</span>
        </div>
      </section>

      {/* Current Word Display */}
      {currentWord && (
        <section className="word-showcase">
          <div 
            className={`word-spotlight subject-${currentWord.subjectArea}`}
          >
            <div className="word-header">
              <div className="word-badges">
                <span className="subject-badge">
                  {getSubjectIcon(currentWord.subjectArea)} {currentWord.subjectArea}
                </span>
                <span 
                  className={`difficulty-badge difficulty-${currentWord.difficulty}`}
                >
                  {currentWord.difficulty}
                </span>
                {currentWord.nceaRelevance && (
                  <span className="ncea-badge">NCEA Relevant</span>
                )}
                <span className="frequency-badge">{currentWord.frequency} frequency</span>
              </div>
              
              <h2 className="featured-word">{currentWord.word}</h2>
              <p className="word-definition">"{currentWord.definition}"</p>
            </div>

            {practiceMode === 'study' && (
              <div className="study-content">
                <div className="context-section">
                  <h4>📝 Academic Context</h4>
                  <p className="context-sentence">"{currentWord.contextSentence}"</p>
                </div>

                {currentWord.culturalConnection && (
                  <div className="cultural-connection">
                    <h4>🌿 Cultural Connection</h4>
                    <p>{currentWord.culturalConnection}</p>
                  </div>
                )}

                <div className="synonyms-section">
                  <h4>🔗 Related Words</h4>
                  <div className="synonyms-list">
                    {currentWord.synonyms.map((synonym, index) => (
                      <span key={index} className="synonym-tag">{synonym}</span>
                    ))}
                  </div>
                </div>

                <button 
                  className="breakdown-btn"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                >
                  {showBreakdown ? '🔒 Hide Analysis' : '🔍 Show Word Analysis'}
                </button>

                {showBreakdown && (
                  <div className="word-breakdown">
                    <div className="morphemes-section">
                      <h4>🧩 Word Parts (Morphemes)</h4>
                      <div className="morphemes-display">
                        {currentWord.morphemes.map((morpheme, index) => (
                          <span key={index} className="morpheme-part">{morpheme}</span>
                        ))}
                      </div>
                    </div>

                    <div className="code-components">
                      <h4>🔤 Phonics Components</h4>
                      <div className="components-list">
                        {currentWord.codeComponents.map((component, index) => (
                          <span key={index} className="code-component">{component}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {practiceMode === 'sentence' && (
              <div className="sentence-building">
                <h4>✍️ Writing Revolution Pattern</h4>
                <div className="pattern-display">
                  <p className="sentence-pattern">{currentWord.writingRevolutionPattern}</p>
                </div>
                <div className="example-application">
                  <h5>📝 Example Application:</h5>
                  <p className="pattern-example">"{currentWord.contextSentence}"</p>
                </div>
                <div className="practice-prompt">
                  <h5>🎯 Your Turn:</h5>
                  <p>Use this pattern to write your own sentence with "{currentWord.word}"</p>
                  <textarea 
                    className="sentence-input"
                    placeholder={`Try using the pattern: ${currentWord.writingRevolutionPattern}`}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {practiceMode === 'morpheme' && (
              <div className="morpheme-analysis">
                <h4>🔬 Advanced Word Analysis</h4>
                <div className="analysis-breakdown">
                  <div className="morpheme-details">
                    <h5>Word Structure:</h5>
                    <div className="morpheme-display">
                      {currentWord.morphemes.map((morpheme, index) => (
                        <div key={index} className="morpheme-detail">
                          <span className="morpheme-part">{morpheme}</span>
                          <span className="morpheme-type">
                            {morpheme.includes('-') ? 
                              (morpheme.startsWith('-') ? 'suffix' : 'prefix') : 
                              'root'
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="phonics-analysis">
                    <h5>Phonics Breakdown:</h5>
                    <div className="phonics-components">
                      {currentWord.codeComponents.map((component, index) => (
                        <span key={index} className="phonics-part">{component}</span>
                      ))}
                    </div>
                  </div>

                  <div className="word-family">
                    <h5>Word Family Connections:</h5>
                    <p>Words with similar roots or patterns help build vocabulary networks.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Academic Words Grid */}
      <section className="words-grid-section">
        <h3>📚 Year 8 Academic Word Bank ({filteredWords.length})</h3>
        <div className="academic-words-grid">
          {filteredWords.map((word) => (
            <div 
              key={word.id} 
              className="academic-word-card"
              style={{ backgroundColor: getSubjectColor(word.subjectArea) }}
              onClick={() => setCurrentWord(word)}
            >
              <div className="card-header">
                <span className="card-subject-icon">
                  {getSubjectIcon(word.subjectArea)}
                </span>
                <span 
                  className="card-difficulty-dot"
                  style={{ backgroundColor: getDifficultyColor(word.difficulty) }}
                ></span>
                {word.nceaRelevance && <span className="card-ncea">⭐</span>}
              </div>
              
              <h4 className="card-word">{word.word}</h4>
              <p className="card-definition">{word.definition}</p>
              
              <div className="card-morphemes">
                {word.morphemes.slice(0, 3).map((morpheme, index) => (
                  <span key={index} className="card-morpheme">{morpheme}</span>
                ))}
              </div>
              
              <div className="card-meta">
                <span className="card-subject">{word.subjectArea}</span>
                <span className="card-difficulty">{word.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teaching Strategies */}
      <section className="teaching-strategies">
        <h3>🎓 Year 8 Academic Vocabulary Strategies</h3>
        <div className="strategies-grid">
          <div className="strategy-card">
            <h4>🔧 Morphological Analysis</h4>
            <ul>
              <li>Break academic words into meaningful parts</li>
              <li>Teach common academic prefixes and suffixes</li>
              <li>Connect to Greek and Latin roots</li>
              <li>Build word family networks</li>
            </ul>
          </div>
          
          <div className="strategy-card">
            <h4>✍️ Writing Integration</h4>
            <ul>
              <li>Use sentence frames for academic writing</li>
              <li>Practice with Writing Revolution patterns</li>
              <li>Build complex sentence structures</li>
              <li>Connect vocabulary to essay writing</li>
            </ul>
          </div>
          
          <div className="strategy-card">
            <h4>📚 Cross-curricular Connections</h4>
            <ul>
              <li>Highlight shared academic vocabulary</li>
              <li>Practice in multiple subject contexts</li>
              <li>Build subject-specific word banks</li>
              <li>Create vocabulary journals</li>
            </ul>
          </div>

          <div className="strategy-card">
            <h4>🌿 Cultural Responsiveness</h4>
            <ul>
              <li>Connect to Māori concepts and values</li>
              <li>Use culturally relevant examples</li>
              <li>Honor traditional knowledge systems</li>
              <li>Build bicultural academic identity</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="year8-vocab-footer">
        <p className="cultural-motto">🌿 "He kupu ako, he tangata ako" - Learning words, learning people</p>
        <p className="platform-info">Te Kete Ako - Year 8 Academic Excellence</p>
      </footer>
    </div>
  );
}