import React, { useState } from 'react';
import './SightWords.css';

interface SightWord {
  id: string;
  word: string;
  frequency: 'high' | 'medium' | 'low';
  list: 'dolch-pre' | 'dolch-primer' | 'dolch-1' | 'dolch-2' | 'dolch-3' | 'fry-1' | 'fry-2' | 'fry-3' | 'nz-common' | 'maori-blend';
  phonetic: boolean;
  category: 'function' | 'content' | 'cultural';
  meaning: string;
  sentence: string;
  culturalContext?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  yearLevel: string;
}

const sightWordsData: SightWord[] = [
  // Dolch Pre-Primer (Foundation)
  {
    id: 'a1',
    word: 'a',
    frequency: 'high',
    list: 'dolch-pre',
    phonetic: true,
    category: 'function',
    meaning: 'One of something',
    sentence: 'I see a kai.',
    culturalContext: 'Used with Māori words like "a kai" (a meal)',
    difficulty: 1,
    yearLevel: 'Year 1'
  },
  {
    id: 'and1',
    word: 'and',
    frequency: 'high',
    list: 'dolch-pre',
    phonetic: true,
    category: 'function',
    meaning: 'Joins two things together',
    sentence: 'Kai and wai are important.',
    culturalContext: 'Connects cultural concepts like "mana and mauri"',
    difficulty: 1,
    yearLevel: 'Year 1'
  },
  {
    id: 'away1',
    word: 'away',
    frequency: 'high',
    list: 'dolch-pre',
    phonetic: true,
    category: 'function',
    meaning: 'To go from this place',
    sentence: 'The kiwi flew away.',
    difficulty: 2,
    yearLevel: 'Year 1'
  },
  {
    id: 'big1',
    word: 'big',
    frequency: 'high',
    list: 'dolch-pre',
    phonetic: true,
    category: 'content',
    meaning: 'Large in size',
    sentence: 'The kauri tree is big.',
    culturalContext: 'Describes important NZ trees and landscapes',
    difficulty: 1,
    yearLevel: 'Year 1'
  },
  {
    id: 'blue1',
    word: 'blue',
    frequency: 'medium',
    list: 'dolch-pre',
    phonetic: false,
    category: 'content',
    meaning: 'The color of the sky',
    sentence: 'The moana is blue.',
    culturalContext: 'Color of our beautiful ocean/moana',
    difficulty: 2,
    yearLevel: 'Year 1'
  },

  // Dolch Primer
  {
    id: 'all2',
    word: 'all',
    frequency: 'high',
    list: 'dolch-primer',
    phonetic: false,
    category: 'function',
    meaning: 'Every one',
    sentence: 'All whānau are welcome.',
    culturalContext: 'Inclusivity concept important in Māori culture',
    difficulty: 2,
    yearLevel: 'Year 1-2'
  },
  {
    id: 'are2',
    word: 'are',
    frequency: 'high',
    list: 'dolch-primer',
    phonetic: false,
    category: 'function',
    meaning: 'To be (plural)',
    sentence: 'We are learning.',
    difficulty: 2,
    yearLevel: 'Year 1-2'
  },
  {
    id: 'at2',
    word: 'at',
    frequency: 'high',
    list: 'dolch-primer',
    phonetic: true,
    category: 'function',
    meaning: 'In the place of',
    sentence: 'We meet at the marae.',
    culturalContext: 'Important for describing cultural places',
    difficulty: 1,
    yearLevel: 'Year 1-2'
  },

  // Dolch Grade 1
  {
    id: 'after3',
    word: 'after',
    frequency: 'high',
    list: 'dolch-1',
    phonetic: true,
    category: 'function',
    meaning: 'Following in time',
    sentence: 'We eat after karakia.',
    culturalContext: 'Sequence important in cultural protocols',
    difficulty: 3,
    yearLevel: 'Year 2-3'
  },
  {
    id: 'again3',
    word: 'again',
    frequency: 'high',
    list: 'dolch-1',
    phonetic: false,
    category: 'function',
    meaning: 'One more time',
    sentence: 'Sing the waiata again.',
    culturalContext: 'Repetition important in oral tradition',
    difficulty: 3,
    yearLevel: 'Year 2-3'
  },

  // NZ Common Words
  {
    id: 'new-zealand1',
    word: 'new',
    frequency: 'high',
    list: 'nz-common',
    phonetic: false,
    category: 'content',
    meaning: 'Not old, recent',
    sentence: 'Aotearoa New Zealand is our home.',
    culturalContext: 'Part of our country name',
    difficulty: 2,
    yearLevel: 'Year 1-2'
  },
  {
    id: 'zealand1',
    word: 'zealand',
    frequency: 'medium',
    list: 'nz-common',
    phonetic: true,
    category: 'cultural',
    meaning: 'Part of our country name',
    sentence: 'New Zealand is beautiful.',
    culturalContext: 'Our country identity',
    difficulty: 3,
    yearLevel: 'Year 2-3'
  },

  // Māori-English Blend Words
  {
    id: 'kai1',
    word: 'kai',
    frequency: 'high',
    list: 'maori-blend',
    phonetic: true,
    category: 'cultural',
    meaning: 'Food, meal',
    sentence: 'We share kai together.',
    culturalContext: 'Central concept in Māori hospitality',
    difficulty: 1,
    yearLevel: 'Year 1+'
  },
  {
    id: 'whanau1',
    word: 'whānau',
    frequency: 'high',
    list: 'maori-blend',
    phonetic: true,
    category: 'cultural',
    meaning: 'Family, extended family',
    sentence: 'My whānau loves me.',
    culturalContext: 'Broader than nuclear family concept',
    difficulty: 2,
    yearLevel: 'Year 1+'
  },
  {
    id: 'marae1',
    word: 'marae',
    frequency: 'medium',
    list: 'maori-blend',
    phonetic: true,
    category: 'cultural',
    meaning: 'Traditional meeting place',
    sentence: 'We visited the marae.',
    culturalContext: 'Sacred gathering place for iwi',
    difficulty: 3,
    yearLevel: 'Year 2+'
  },
  {
    id: 'aroha1',
    word: 'aroha',
    frequency: 'high',
    list: 'maori-blend',
    phonetic: true,
    category: 'cultural',
    meaning: 'Love, compassion, care',
    sentence: 'Show aroha to everyone.',
    culturalContext: 'Core value in Māori worldview',
    difficulty: 2,
    yearLevel: 'Year 1+'
  },
  {
    id: 'mana1',
    word: 'mana',
    frequency: 'medium',
    list: 'maori-blend',
    phonetic: true,
    category: 'cultural',
    meaning: 'Spiritual power, authority',
    sentence: 'The kaumātua has mana.',
    culturalContext: 'Important spiritual concept',
    difficulty: 4,
    yearLevel: 'Year 3+'
  }
];

export default function SightWords() {
  const [selectedList, setSelectedList] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentWord, setCurrentWord] = useState<SightWord | null>(null);
  const [showMeaning, setShowMeaning] = useState(false);
  const [gameMode, setGameMode] = useState<'flashcard' | 'practice' | 'assessment'>('flashcard');
  const [practiceWords, setPracticeWords] = useState<SightWord[]>([]);
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [practiceScore, setPracticeScore] = useState({ correct: 0, total: 0 });

  const filteredWords = sightWordsData.filter(word => {
    if (selectedList !== 'all' && word.list !== selectedList) return false;
    if (selectedDifficulty !== 'all' && word.difficulty.toString() !== selectedDifficulty) return false;
    if (selectedCategory !== 'all' && word.category !== selectedCategory) return false;
    return true;
  });

  const selectRandomWord = () => {
    if (filteredWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      setCurrentWord(filteredWords[randomIndex]);
      setShowMeaning(false);
    }
  };

  const startPracticeMode = () => {
    if (filteredWords.length > 0) {
      const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);
      setPracticeWords(shuffled.slice(0, 10)); // Take first 10 for practice
      setCurrentPracticeIndex(0);
      setPracticeScore({ correct: 0, total: 0 });
      setGameMode('practice');
      setCurrentWord(shuffled[0]);
      setShowMeaning(false);
    }
  };

  const handlePracticeAnswer = (correct: boolean) => {
    setPracticeScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));

    if (currentPracticeIndex < practiceWords.length - 1) {
      setCurrentPracticeIndex(prev => prev + 1);
      setCurrentWord(practiceWords[currentPracticeIndex + 1]);
      setShowMeaning(false);
    } else {
      // Practice completed
      setGameMode('assessment');
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    const colors = {
      1: '#4caf50',
      2: '#8bc34a', 
      3: '#ff9800',
      4: '#ff5722',
      5: '#f44336'
    };
    return colors[difficulty as keyof typeof colors] || '#666';
  };

  const getListColor = (list: string) => {
    const colors = {
      'dolch-pre': '#e8f5e8',
      'dolch-primer': '#fff3e0',
      'dolch-1': '#e3f2fd',
      'dolch-2': '#f3e5f5',
      'dolch-3': '#fce4ec',
      'fry-1': '#e0f2f1',
      'fry-2': '#f1f8e9',
      'fry-3': '#fce4ec',
      'nz-common': '#fff8e1',
      'maori-blend': '#f3e5f5'
    };
    return colors[list as keyof typeof colors] || '#f5f5f5';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'function': return '🔧';
      case 'content': return '📝';
      case 'cultural': return '🌿';
      default: return '📚';
    }
  };

  const toggleMeaning = () => {
    setShowMeaning(!showMeaning);
  };

  return (
    <div className="sight-words-container">
      <header className="sight-words-header">
        <h1 className="sight-words-title">👁️ Sight Words - Kupu Atahua</h1>
        <p className="sight-words-subtitle">
          High-frequency words for fluent reading, including cultural vocabulary from Te Ao Māori
        </p>
      </header>

      {/* Cultural Framework */}
      <section className="cultural-framework">
        <h2>🌿 Sight Words & Cultural Identity</h2>
        <p>
          Sight words form the foundation of fluent reading. Our collection includes traditional 
          high-frequency English words alongside important Māori vocabulary that reflects our 
          unique New Zealand identity and cultural knowledge.
        </p>
        <div className="framework-highlight">
          <strong>Philosophy:</strong> "He kupu, he mana" - Words have power to connect us to culture and meaning.
        </div>
      </section>

      {/* Word Lists Overview */}
      <section className="lists-overview">
        <h3>📚 Word Lists & Categories</h3>
        <div className="lists-grid">
          <div className="list-card dolch">
            <h4>🎯 Dolch Lists</h4>
            <p>Classic high-frequency words for reading fluency</p>
            <ul>
              <li>Pre-Primer (40 words)</li>
              <li>Primer (52 words)</li>
              <li>Grade 1-3 (315 words)</li>
            </ul>
          </div>
          
          <div className="list-card fry">
            <h4>📊 Fry Lists</h4>
            <p>Most frequent words in written English</p>
            <ul>
              <li>First 100 words</li>
              <li>Second 100 words</li>
              <li>Third 100 words</li>
            </ul>
          </div>
          
          <div className="list-card nz">
            <h4>🇳🇿 NZ Common</h4>
            <p>Words specific to New Zealand context</p>
            <ul>
              <li>Place names</li>
              <li>Cultural terms</li>
              <li>Local vocabulary</li>
            </ul>
          </div>
          
          <div className="list-card maori">
            <h4>🌿 Māori Blend</h4>
            <p>Essential Māori words in everyday use</p>
            <ul>
              <li>Family & relationships</li>
              <li>Cultural concepts</li>
              <li>Values & beliefs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Game Mode Selector */}
      <section className="game-mode-section">
        <h3>🎮 Practice Modes</h3>
        <div className="mode-buttons">
          <button 
            className={`mode-btn ${gameMode === 'flashcard' ? 'active' : ''}`}
            onClick={() => setGameMode('flashcard')}
          >
            📚 Flashcard Mode
          </button>
          <button 
            className={`mode-btn ${gameMode === 'practice' ? 'active' : ''}`}
            onClick={startPracticeMode}
            disabled={filteredWords.length === 0}
          >
            🎯 Practice Mode
          </button>
          <button 
            className={`mode-btn ${gameMode === 'assessment' ? 'active' : ''}`}
            onClick={() => setGameMode('assessment')}
          >
            📊 Assessment
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <h3>🔍 Filter Words</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="list-filter">Word List:</label>
            <select 
              id="list-filter"
              value={selectedList} 
              onChange={(e) => setSelectedList(e.target.value)}
            >
              <option value="all">All Lists</option>
              <option value="dolch-pre">Dolch Pre-Primer</option>
              <option value="dolch-primer">Dolch Primer</option>
              <option value="dolch-1">Dolch Grade 1</option>
              <option value="dolch-2">Dolch Grade 2</option>
              <option value="dolch-3">Dolch Grade 3</option>
              <option value="fry-1">Fry 1st 100</option>
              <option value="fry-2">Fry 2nd 100</option>
              <option value="fry-3">Fry 3rd 100</option>
              <option value="nz-common">NZ Common</option>
              <option value="maori-blend">Māori Blend</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="difficulty-filter">Difficulty:</label>
            <select 
              id="difficulty-filter"
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="1">Level 1 (Easiest)</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5">Level 5 (Hardest)</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="category-filter">Category:</label>
            <select 
              id="category-filter"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="function">Function Words</option>
              <option value="content">Content Words</option>
              <option value="cultural">Cultural Words</option>
            </select>
          </div>

          {gameMode === 'flashcard' && (
            <button 
              className="random-word-btn"
              onClick={selectRandomWord}
              disabled={filteredWords.length === 0}
            >
              🎲 Random Word
            </button>
          )}
        </div>
        
        <div className="filter-results">
          <span className="results-count">{filteredWords.length} words available</span>
        </div>
      </section>

      {/* Current Word Display */}
      {currentWord && (
        <section className="word-display-section">
          <div 
            className="word-spotlight"
            style={{ backgroundColor: getListColor(currentWord.list) }}
          >
            <div className="word-header">
              <div className="word-badges">
                <span className="list-badge">{currentWord.list}</span>
                <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(currentWord.difficulty) }}
                >
                  Level {currentWord.difficulty}
                </span>
                <span className="category-badge">
                  {getCategoryIcon(currentWord.category)} {currentWord.category}
                </span>
                <span className="year-badge">{currentWord.yearLevel}</span>
                {!currentWord.phonetic && <span className="irregular-badge">Irregular</span>}
              </div>
              
              <h2 className="display-word">{currentWord.word}</h2>
              
              {gameMode === 'practice' && (
                <div className="practice-progress">
                  Word {currentPracticeIndex + 1} of {practiceWords.length} | 
                  Score: {practiceScore.correct}/{practiceScore.total}
                </div>
              )}
            </div>

            {!showMeaning ? (
              <div className="word-front">
                <button className="reveal-btn" onClick={toggleMeaning}>
                  👁️ Show Meaning
                </button>
                {gameMode === 'practice' && (
                  <div className="practice-buttons">
                    <button 
                      className="practice-btn correct"
                      onClick={() => handlePracticeAnswer(true)}
                    >
                      ✅ I Know This
                    </button>
                    <button 
                      className="practice-btn incorrect"
                      onClick={() => handlePracticeAnswer(false)}
                    >
                      ❌ Need Practice
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="word-back">
                <div className="word-meaning">
                  <h4>💡 Meaning</h4>
                  <p>{currentWord.meaning}</p>
                </div>

                <div className="word-sentence">
                  <h4>📝 Example Sentence</h4>
                  <p>"{currentWord.sentence}"</p>
                </div>

                {currentWord.culturalContext && (
                  <div className="cultural-context">
                    <h4>🌿 Cultural Context</h4>
                    <p>{currentWord.culturalContext}</p>
                  </div>
                )}

                <div className="word-details">
                  <div className="detail-item">
                    <strong>Frequency:</strong> {currentWord.frequency}
                  </div>
                  <div className="detail-item">
                    <strong>Phonetic:</strong> {currentWord.phonetic ? 'Yes' : 'No (irregular)'}
                  </div>
                </div>

                <button className="hide-btn" onClick={toggleMeaning}>
                  🔒 Hide Meaning
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Assessment Results */}
      {gameMode === 'assessment' && practiceScore.total > 0 && (
        <section className="assessment-results">
          <div className="results-card">
            <h3>📊 Practice Results</h3>
            <div className="score-display">
              <div className="score-number">
                {practiceScore.correct}/{practiceScore.total}
              </div>
              <div className="score-percentage">
                {Math.round((practiceScore.correct / practiceScore.total) * 100)}%
              </div>
            </div>
            <div className="score-feedback">
              {practiceScore.correct / practiceScore.total >= 0.8 ? (
                <p className="feedback-positive">Excellent work! You know these words well. 🌟</p>
              ) : practiceScore.correct / practiceScore.total >= 0.6 ? (
                <p className="feedback-neutral">Good progress! Keep practicing these words. 👍</p>
              ) : (
                <p className="feedback-needs-work">These words need more practice. Try again! 💪</p>
              )}
            </div>
            <button 
              className="restart-btn"
              onClick={() => {
                setGameMode('flashcard');
                setPracticeScore({ correct: 0, total: 0 });
              }}
            >
              🔄 Try Again
            </button>
          </div>
        </section>
      )}

      {/* Words Grid */}
      <section className="words-grid-section">
        <h3>📋 All Words ({filteredWords.length})</h3>
        <div className="words-grid">
          {filteredWords.map((word) => (
            <div 
              key={word.id} 
              className="word-card"
              style={{ backgroundColor: getListColor(word.list) }}
              onClick={() => setCurrentWord(word)}
            >
              <div className="card-header">
                <span 
                  className="card-difficulty-dot"
                  style={{ backgroundColor: getDifficultyColor(word.difficulty) }}
                ></span>
                <span className="card-category-icon">
                  {getCategoryIcon(word.category)}
                </span>
                {!word.phonetic && <span className="card-irregular">⚠️</span>}
              </div>
              
              <h4 className="card-word">{word.word}</h4>
              <p className="card-meaning">{word.meaning}</p>
              
              <div className="card-meta">
                <span className="card-list">{word.list}</span>
                <span className="card-year">{word.yearLevel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teaching Notes */}
      <section className="teaching-notes">
        <h3>📝 Teaching Strategies</h3>
        <div className="notes-grid">
          <div className="note-card">
            <h4>🎯 Introduction Strategy</h4>
            <ul>
              <li>Start with high-frequency, phonetic words</li>
              <li>Introduce 3-5 new words per week</li>
              <li>Use cultural context to aid memory</li>
              <li>Connect to students' experiences</li>
            </ul>
          </div>
          
          <div className="note-card">
            <h4>🔄 Practice Methods</h4>
            <ul>
              <li>Daily flashcard review</li>
              <li>Word wall activities</li>
              <li>Sentence building games</li>
              <li>Cultural story integration</li>
            </ul>
          </div>
          
          <div className="note-card">
            <h4>📊 Assessment Tips</h4>
            <ul>
              <li>Track speed and accuracy</li>
              <li>Monitor transfer to reading</li>
              <li>Use in authentic contexts</li>
              <li>Celebrate cultural connections</li>
            </ul>
          </div>

          <div className="note-card">
            <h4>🌿 Cultural Integration</h4>
            <ul>
              <li>Include Māori vocabulary naturally</li>
              <li>Respect pronunciation and meaning</li>
              <li>Connect to cultural values</li>
              <li>Build bicultural identity</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="sight-words-footer">
        <p className="cultural-motto">🌿 "He kupu hōhonu, he tangata hōhonu" - Deep words, deep people</p>
        <p className="platform-info">Te Kete Ako - Sight Word Excellence for Aotearoa</p>
      </footer>
    </div>
  );
}