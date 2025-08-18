import React, { useState } from 'react';
import './AdvancedMorphology.css';

interface MorphemeData {
  id: string;
  morpheme: string;
  type: 'prefix' | 'suffix' | 'root' | 'combining-form';
  meaning: string;
  origin: 'latin' | 'greek' | 'anglo-saxon' | 'french' | 'maori' | 'other';
  examples: string[];
  difficulty: 'year7' | 'year8' | 'year9' | 'year10' | 'advanced';
  academicDomain: string[];
  culturalConnection?: string;
  pronunciation: string;
  wordFamily: string[];
}

const morphologyData: MorphemeData[] = [
  // Year 7-8 Foundation Morphemes
  {
    id: 'un-prefix',
    morpheme: 'un-',
    type: 'prefix',
    meaning: 'not, opposite of',
    origin: 'anglo-saxon',
    examples: ['unfair', 'undo', 'unwise', 'unclear'],
    difficulty: 'year7',
    academicDomain: ['General', 'Literature'],
    pronunciation: '/ʌn/',
    wordFamily: ['un-', 'in-', 'dis-', 'non-']
  },
  {
    id: 're-prefix',
    morpheme: 're-',
    type: 'prefix',
    meaning: 'again, back',
    origin: 'latin',
    examples: ['rebuild', 'return', 'revise', 'reconsider'],
    difficulty: 'year7',
    academicDomain: ['General', 'Science', 'Social Studies'],
    pronunciation: '/riː/',
    wordFamily: ['re-', 'retro-', 'redux']
  },
  {
    id: '-tion-suffix',
    morpheme: '-tion',
    type: 'suffix',
    meaning: 'action, state, result',
    origin: 'latin',
    examples: ['nation', 'education', 'creation', 'exploration'],
    difficulty: 'year7',
    academicDomain: ['Social Studies', 'Science', 'Literature'],
    pronunciation: '/ʃən/',
    wordFamily: ['-tion', '-sion', '-ation', '-ition']
  },

  // Year 8-9 Intermediate Morphemes
  {
    id: 'bio-root',
    morpheme: 'bio-',
    type: 'combining-form',
    meaning: 'life',
    origin: 'greek',
    examples: ['biology', 'biography', 'biodiversity', 'biosphere'],
    difficulty: 'year8',
    academicDomain: ['Science', 'Geography'],
    pronunciation: '/baɪoʊ/',
    wordFamily: ['bio-', 'vita-', 'viv-']
  },
  {
    id: 'geo-root',
    morpheme: 'geo-',
    type: 'combining-form',
    meaning: 'earth',
    origin: 'greek',
    examples: ['geography', 'geology', 'geometry', 'geothermal'],
    difficulty: 'year8',
    academicDomain: ['Geography', 'Science', 'Mathematics'],
    culturalConnection: 'Connected to Māori concepts of whenua (land) and Papatūānuku (Earth mother)',
    pronunciation: '/dʒiːoʊ/',
    wordFamily: ['geo-', 'terra-', 'telluric']
  },
  {
    id: '-ology-suffix',
    morpheme: '-ology',
    type: 'suffix',
    meaning: 'study of, science of',
    origin: 'greek',
    examples: ['biology', 'psychology', 'sociology', 'archaeology'],
    difficulty: 'year8',
    academicDomain: ['Science', 'Social Studies', 'Psychology'],
    pronunciation: '/ɒlədʒi/',
    wordFamily: ['-ology', '-ography', '-metry', '-sophy']
  },

  // Year 9-10 Advanced Morphemes
  {
    id: 'photo-root',
    morpheme: 'photo-',
    type: 'combining-form',
    meaning: 'light',
    origin: 'greek',
    examples: ['photograph', 'photosynthesis', 'photon', 'photocopier'],
    difficulty: 'year9',
    academicDomain: ['Science', 'Technology', 'Art'],
    pronunciation: '/foʊtoʊ/',
    wordFamily: ['photo-', 'lumi-', 'lumin-']
  },
  {
    id: 'micro-prefix',
    morpheme: 'micro-',
    type: 'prefix',
    meaning: 'small, minute',
    origin: 'greek',
    examples: ['microscope', 'microorganism', 'microwave', 'microbiology'],
    difficulty: 'year9',
    academicDomain: ['Science', 'Technology'],
    pronunciation: '/maɪkroʊ/',
    wordFamily: ['micro-', 'mini-', 'nano-']
  },
  {
    id: 'democracy-root',
    morpheme: 'demo-',
    type: 'combining-form',
    meaning: 'people',
    origin: 'greek',
    examples: ['democracy', 'demographic', 'epidemic', 'endemic'],
    difficulty: 'year9',
    academicDomain: ['Social Studies', 'History', 'Politics'],
    culturalConnection: 'Relates to Māori concepts of iwi (people/tribe) and collective decision-making',
    pronunciation: '/diːmoʊ/',
    wordFamily: ['demo-', 'pop-', 'ethno-']
  },

  // Advanced/NCEA Level Morphemes
  {
    id: 'pseudo-prefix',
    morpheme: 'pseudo-',
    type: 'prefix',
    meaning: 'false, fake',
    origin: 'greek',
    examples: ['pseudonym', 'pseudoscience', 'pseudo-intellectual', 'pseudopod'],
    difficulty: 'year10',
    academicDomain: ['Literature', 'Science', 'Critical Thinking'],
    pronunciation: '/suːdoʊ/',
    wordFamily: ['pseudo-', 'quasi-', 'semi-']
  },
  {
    id: 'meta-prefix',
    morpheme: 'meta-',
    type: 'prefix',
    meaning: 'beyond, about, self-referential',
    origin: 'greek',
    examples: ['metaphor', 'metabolism', 'metacognition', 'metamorphosis'],
    difficulty: 'year10',
    academicDomain: ['Literature', 'Science', 'Philosophy', 'Psychology'],
    pronunciation: '/metə/',
    wordFamily: ['meta-', 'trans-', 'ultra-']
  },
  {
    id: 'anthropo-root',
    morpheme: 'anthropo-',
    type: 'combining-form',
    meaning: 'human',
    origin: 'greek',
    examples: ['anthropology', 'anthropomorphic', 'philanthropy', 'misanthropy'],
    difficulty: 'year10',
    academicDomain: ['Social Studies', 'History', 'Literature'],
    culturalConnection: 'Connects to Māori concepts of tangata (people) and whakapapa (genealogy)',
    pronunciation: '/ænθroʊpoʊ/',
    wordFamily: ['anthropo-', 'homo-', 'human-']
  },

  // Māori Morphology Integration
  {
    id: 'wha-prefix',
    morpheme: 'wha-',
    type: 'prefix',
    meaning: 'to cause, to make',
    origin: 'maori',
    examples: ['whakatauki', 'whakapapa', 'whakatōhea', 'whakawhetai'],
    difficulty: 'year8',
    academicDomain: ['Cultural Studies', 'Te Reo Māori'],
    culturalConnection: 'Causative prefix in Te Reo Māori - transforms verbs and adjectives',
    pronunciation: '/faka/',
    wordFamily: ['wha-', 'whaka-', 'causative markers']
  },
  {
    id: '-tanga-suffix',
    morpheme: '-tanga',
    type: 'suffix',
    meaning: 'state of being, condition',
    origin: 'maori',
    examples: ['rangatiratanga', 'whakatōheatanga', 'manaakitanga', 'kotahitanga'],
    difficulty: 'year9',
    academicDomain: ['Cultural Studies', 'Te Reo Māori', 'Social Studies'],
    culturalConnection: 'Creates abstract nouns expressing cultural concepts and values',
    pronunciation: '/taŋa/',
    wordFamily: ['-tanga', '-nga', 'nominalizing suffixes']
  }
];

interface WordAnalysis {
  word: string;
  morphemes: string[];
  meaning: string;
  example: string;
  difficulty: string;
}

const complexWords: WordAnalysis[] = [
  {
    word: 'unprecedented',
    morphemes: ['un-', 'pre-', 'cedent', '-ed'],
    meaning: 'never done or known before',
    example: 'The pandemic created unprecedented challenges for education.',
    difficulty: 'year10'
  },
  {
    word: 'biodegradable',
    morphemes: ['bio-', 'de-', 'grad', '-able'],
    meaning: 'able to be broken down by living organisms',
    example: 'We need more biodegradable packaging to protect our environment.',
    difficulty: 'year9'
  },
  {
    word: 'photosynthesis',
    morphemes: ['photo-', 'syn-', 'thesis'],
    meaning: 'process by which plants make food using light',
    example: 'Photosynthesis is essential for life on Earth.',
    difficulty: 'year8'
  },
  {
    word: 'rangatiratanga',
    morphemes: ['rangatira', '-tanga'],
    meaning: 'chieftainship, sovereignty, self-determination',
    example: 'Tino rangatiratanga is a fundamental principle in the Treaty of Waitangi.',
    difficulty: 'year10'
  }
];

export default function AdvancedMorphology() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [currentMorpheme, setCurrentMorpheme] = useState<MorphemeData | null>(null);
  const [analyzeMode, setAnalyzeMode] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<WordAnalysis | null>(null);
  const [studentInput, setStudentInput] = useState('');
  const [analysisResults, setAnalysisResults] = useState<string[]>([]);

  const filteredMorphemes = morphologyData.filter(morpheme => {
    if (selectedDifficulty !== 'all' && morpheme.difficulty !== selectedDifficulty) return false;
    if (selectedType !== 'all' && morpheme.type !== selectedType) return false;
    if (selectedDomain !== 'all' && !morpheme.academicDomain.includes(selectedDomain)) return false;
    return true;
  });

  const selectRandomMorpheme = () => {
    if (filteredMorphemes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMorphemes.length);
      setCurrentMorpheme(filteredMorphemes[randomIndex]);
    }
  };

  const selectRandomAnalysis = () => {
    const randomIndex = Math.floor(Math.random() * complexWords.length);
    setCurrentAnalysis(complexWords[randomIndex]);
    setStudentInput('');
    setAnalysisResults([]);
  };

  const handleWordAnalysis = () => {
    if (!currentAnalysis) return;
    
    const inputWords = studentInput.toLowerCase().split(/[\s,]+/).filter(word => word.length > 0);
    const correctMorphemes = currentAnalysis.morphemes.map(m => m.toLowerCase());
    
    const results = inputWords.map(word => {
      if (correctMorphemes.includes(word)) {
        return `✅ ${word} - Correct!`;
      } else {
        return `❌ ${word} - Not a morpheme in this word`;
      }
    });
    
    setAnalysisResults(results);
  };



  const getTypeIcon = (type: string) => {
    const icons = {
      'prefix': '⬅️',
      'suffix': '➡️',
      'root': '🌳',
      'combining-form': '🔗'
    };
    return icons[type as keyof typeof icons] || '📝';
  };

  const getOriginFlag = (origin: string) => {
    const flags = {
      'latin': '🏛️',
      'greek': '🏺',
      'anglo-saxon': '⚔️',
      'french': '🇫🇷',
      'maori': '🌿',
      'other': '🌍'
    };
    return flags[origin as keyof typeof flags] || '📚';
  };

  return (
    <div className="morphology-container">
      <header className="morphology-header">
        <h1 className="morphology-title">🔬 Advanced Morphology - Te Taiao Kupu</h1>
        <p className="morphology-subtitle">
          Master word structure and meaning for Years 7-10 academic success and NCEA preparation
        </p>
      </header>

      {/* Academic Importance */}
      <section className="academic-importance">
        <h2>🎓 Why Morphology Matters for Secondary Students</h2>
        <div className="importance-grid">
          <div className="importance-card">
            <h3>📚 Academic Vocabulary</h3>
            <p>80% of academic words contain Greek or Latin roots. Understanding morphology unlocks thousands of subject-specific terms across all learning areas.</p>
          </div>
          <div className="importance-card">
            <h3>📝 NCEA Success</h3>
            <p>Strong morphological awareness improves reading comprehension, spelling accuracy, and vocabulary development essential for NCEA assessments.</p>
          </div>
          <div className="importance-card">
            <h3>🧠 Critical Thinking</h3>
            <p>Breaking down complex words develops analytical skills and helps students tackle unfamiliar academic terminology with confidence.</p>
          </div>
          <div className="importance-card">
            <h3>🌿 Cultural Connections</h3>
            <p>Understanding both English and Te Reo Māori morphology builds bicultural literacy and deeper cultural understanding.</p>
          </div>
        </div>
      </section>

      {/* Mode Selector */}
      <section className="mode-section">
        <h3>🎯 Learning Modes</h3>
        <div className="mode-buttons">
          <button 
            className={`mode-btn ${!analyzeMode ? 'active' : ''}`}
            onClick={() => setAnalyzeMode(false)}
          >
            📖 Study Morphemes
          </button>
          <button 
            className={`mode-btn ${analyzeMode ? 'active' : ''}`}
            onClick={() => setAnalyzeMode(true)}
          >
            🔍 Analyze Complex Words
          </button>
        </div>
      </section>

      {!analyzeMode ? (
        <>
          {/* Filters */}
          <section className="filters-section">
            <h3>🔍 Filter Morphemes</h3>
            <div className="filters-grid">
              <div className="filter-group">
                <label htmlFor="difficulty-filter">Year Level:</label>
                <select 
                  id="difficulty-filter"
                  value={selectedDifficulty} 
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="all">All Years</option>
                  <option value="year7">Year 7</option>
                  <option value="year8">Year 8</option>
                  <option value="year9">Year 9</option>
                  <option value="year10">Year 10</option>
                  <option value="advanced">Advanced/NCEA</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="type-filter">Morpheme Type:</label>
                <select 
                  id="type-filter"
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="prefix">Prefixes</option>
                  <option value="suffix">Suffixes</option>
                  <option value="root">Roots</option>
                  <option value="combining-form">Combining Forms</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="domain-filter">Subject Area:</label>
                <select 
                  id="domain-filter"
                  value={selectedDomain} 
                  onChange={(e) => setSelectedDomain(e.target.value)}
                >
                  <option value="all">All Subjects</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Literature">Literature</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Geography">Geography</option>
                  <option value="Cultural Studies">Cultural Studies</option>
                </select>
              </div>

              <button 
                className="random-morpheme-btn"
                onClick={selectRandomMorpheme}
                disabled={filteredMorphemes.length === 0}
              >
                🎲 Random Morpheme
              </button>
            </div>
            
            <div className="filter-results">
              <span className="results-count">{filteredMorphemes.length} morphemes available</span>
            </div>
          </section>

          {/* Current Morpheme Display */}
          {currentMorpheme && (
            <section className="morpheme-display">
              <div className="morpheme-spotlight">
                <div className="morpheme-header">
                  <div className="morpheme-badges">
                    <span className="type-badge">
                      {getTypeIcon(currentMorpheme.type)} {currentMorpheme.type}
                    </span>
                    <span 
                      className={`difficulty-badge difficulty-${currentMorpheme.difficulty}`}
                    >
                      {currentMorpheme.difficulty}
                    </span>
                    <span className="origin-badge">
                      {getOriginFlag(currentMorpheme.origin)} {currentMorpheme.origin}
                    </span>
                  </div>
                  
                  <h2 className="morpheme-display-text">{currentMorpheme.morpheme}</h2>
                  <p className="morpheme-pronunciation">{currentMorpheme.pronunciation}</p>
                  <p className="morpheme-meaning">"{currentMorpheme.meaning}"</p>
                </div>

                <div className="morpheme-details">
                  <div className="examples-section">
                    <h4>📝 Examples in Words</h4>
                    <div className="examples-grid">
                      {currentMorpheme.examples.map((example, index) => (
                        <span key={index} className="example-word">{example}</span>
                      ))}
                    </div>
                  </div>

                  <div className="academic-domains">
                    <h4>📚 Academic Subjects</h4>
                    <div className="domains-list">
                      {currentMorpheme.academicDomain.map((domain, index) => (
                        <span key={index} className="domain-tag">{domain}</span>
                      ))}
                    </div>
                  </div>

                  {currentMorpheme.culturalConnection && (
                    <div className="cultural-connection">
                      <h4>🌿 Cultural Connection</h4>
                      <p>{currentMorpheme.culturalConnection}</p>
                    </div>
                  )}

                  <div className="word-family">
                    <h4>👥 Related Morphemes</h4>
                    <div className="family-list">
                      {currentMorpheme.wordFamily.map((related, index) => (
                        <span key={index} className="family-member">{related}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Morphemes Grid */}
          <section className="morphemes-grid-section">
            <h3>📋 All Morphemes ({filteredMorphemes.length})</h3>
            <div className="morphemes-grid">
              {filteredMorphemes.map((morpheme) => (
                <div 
                  key={morpheme.id} 
                  className="morpheme-card"
                  onClick={() => setCurrentMorpheme(morpheme)}
                >
                  <div className="card-header">
                    <span className="card-type-icon">{getTypeIcon(morpheme.type)}</span>
                    <span className="card-origin-flag">{getOriginFlag(morpheme.origin)}</span>
                    <span 
                      className={`card-difficulty-dot difficulty-${morpheme.difficulty}`}
                    ></span>
                  </div>
                  
                  <h4 className="card-morpheme">{morpheme.morpheme}</h4>
                  <p className="card-meaning">"{morpheme.meaning}"</p>
                  
                  <div className="card-examples">
                    {morpheme.examples.slice(0, 2).map((example, index) => (
                      <span key={index} className="card-example">{example}</span>
                    ))}
                  </div>
                  
                  <div className="card-meta">
                    <span className="card-difficulty">{morpheme.difficulty}</span>
                    <span className="card-type">{morpheme.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Word Analysis Mode */
        <section className="analysis-mode">
          <div className="analysis-header">
            <h3>🔍 Complex Word Analysis</h3>
            <p>Break down academic vocabulary into its component morphemes</p>
            <button 
              className="new-analysis-btn"
              onClick={selectRandomAnalysis}
            >
              🎲 New Word to Analyze
            </button>
          </div>

          {currentAnalysis && (
            <div className="analysis-workspace">
              <div className="target-word">
                <h2 className="analysis-word">{currentAnalysis.word}</h2>
                <p className="word-context">"{currentAnalysis.example}"</p>
                <p className="word-meaning">Meaning: {currentAnalysis.meaning}</p>
              </div>

              <div className="analysis-input">
                <h4>✏️ Break this word into its morphemes:</h4>
                <p className="analysis-hint">
                  Separate each meaningful part with commas (e.g., un-, happy, -ness)
                </p>
                <input
                  type="text"
                  value={studentInput}
                  onChange={(e) => setStudentInput(e.target.value)}
                  placeholder="Enter morphemes separated by commas..."
                  className="morpheme-input"
                />
                <button 
                  className="analyze-btn"
                  onClick={handleWordAnalysis}
                  disabled={!studentInput.trim()}
                >
                  🔍 Check Analysis
                </button>
              </div>

              {analysisResults.length > 0 && (
                <div className="analysis-results">
                  <h4>📊 Your Analysis Results:</h4>
                  <div className="results-list">
                    {analysisResults.map((result, index) => (
                      <div key={index} className="result-item">{result}</div>
                    ))}
                  </div>
                  
                  <div className="correct-answer">
                    <h5>✅ Correct Breakdown:</h5>
                    <div className="correct-morphemes">
                      {currentAnalysis.morphemes.map((morpheme, index) => (
                        <span key={index} className="correct-morpheme">{morpheme}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Study Strategies */}
      <section className="study-strategies">
        <h3>📚 Advanced Study Strategies for Secondary Students</h3>
        <div className="strategies-grid">
          <div className="strategy-card">
            <h4>🎯 Year 7-8 Foundation</h4>
            <ul>
              <li>Master common prefixes: un-, re-, pre-, dis-</li>
              <li>Learn frequent suffixes: -tion, -ness, -ment</li>
              <li>Practice with familiar vocabulary</li>
              <li>Connect to subject vocabulary</li>
            </ul>
          </div>
          
          <div className="strategy-card">
            <h4>🚀 Year 9-10 Advanced</h4>
            <ul>
              <li>Study Greek/Latin combining forms</li>
              <li>Analyze technical academic vocabulary</li>
              <li>Practice complex word deconstruction</li>
              <li>Build subject-specific morpheme banks</li>
            </ul>
          </div>
          
          <div className="strategy-card">
            <h4>📝 NCEA Preparation</h4>
            <ul>
              <li>Focus on literary and analytical terms</li>
              <li>Practice unfamiliar word strategies</li>
              <li>Build vocabulary for essay writing</li>
              <li>Develop morphological awareness</li>
            </ul>
          </div>

          <div className="strategy-card">
            <h4>🌿 Bicultural Literacy</h4>
            <ul>
              <li>Compare English and Te Reo morphology</li>
              <li>Study Māori word formation patterns</li>
              <li>Understand cultural concepts in language</li>
              <li>Build academic te reo vocabulary</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="morphology-footer">
        <p className="cultural-motto">🌿 "He kupu mārama, he hinengaro mārama" - Clear words, clear mind</p>
        <p className="platform-info">Te Kete Ako - Advanced Morphology for Secondary Excellence</p>
      </footer>
    </div>
  );
}