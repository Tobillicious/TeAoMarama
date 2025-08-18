import React, { useState, useEffect } from 'react';
import './PhoneticsCards.css';

interface PhoneticsCard {
  id: string;
  letter: string;
  sound: string;
  keywords: string[];
  phase: '1' | '2' | '3' | '4' | '5' | '6';
  type: 'consonant' | 'vowel' | 'digraph' | 'trigraph' | 'split-digraph';
  culturalConnection?: string;
  exampleWords: string[];
  handwriting: string;
  difficulty: 'foundation' | 'developing' | 'secure';
}

const phoneticsCardsData: PhoneticsCard[] = [
  // Phase 1 - Foundation
  {
    id: 'a1',
    letter: 'a',
    sound: '/a/',
    keywords: ['apple', 'ant'],
    phase: '1',
    type: 'vowel',
    culturalConnection: 'Similar to Māori short "a" in "kai"',
    exampleWords: ['cat', 'bat', 'hat', 'kai', 'man'],
    handwriting: 'Start at 2 o\'clock, round and down, up and over',
    difficulty: 'foundation'
  },
  {
    id: 't1',
    letter: 't',
    sound: '/t/',
    keywords: ['tiger', 'top'],
    phase: '1',
    type: 'consonant',
    culturalConnection: 'Strong stop sound like in "taonga"',
    exampleWords: ['top', 'tin', 'sit', 'taonga', 'mat'],
    handwriting: 'Down, lift, cross at the top',
    difficulty: 'foundation'
  },
  {
    id: 'i1',
    letter: 'i',
    sound: '/i/',
    keywords: ['insect', 'ink'],
    phase: '1',
    type: 'vowel',
    culturalConnection: 'Like Māori "i" sound in "kiwi"',
    exampleWords: ['sit', 'pin', 'big', 'kiwi', 'bin'],
    handwriting: 'Down, lift, dot',
    difficulty: 'foundation'
  },
  {
    id: 'p1',
    letter: 'p',
    sound: '/p/',
    keywords: ['pig', 'pen'],
    phase: '1',
    type: 'consonant',
    culturalConnection: 'Puff of air like "paua"',
    exampleWords: ['pen', 'cap', 'top', 'paua', 'map'],
    handwriting: 'Down, up, round',
    difficulty: 'foundation'
  },
  {
    id: 'n1',
    letter: 'n',
    sound: '/n/',
    keywords: ['net', 'nail'],
    phase: '1',
    type: 'consonant',
    culturalConnection: 'Nose sound like "ngā"',
    exampleWords: ['net', 'sun', 'can', 'ngā', 'pen'],
    handwriting: 'Down, up, round and down',
    difficulty: 'foundation'
  },

  // Phase 2 - CVC patterns
  {
    id: 'ck2',
    letter: 'ck',
    sound: '/k/',
    keywords: ['duck', 'sock'],
    phase: '2',
    type: 'digraph',
    culturalConnection: 'Sharp sound like "kōkako"',
    exampleWords: ['duck', 'sock', 'back', 'rock', 'neck'],
    handwriting: 'c then k, close together',
    difficulty: 'developing'
  },
  {
    id: 'e2',
    letter: 'e',
    sound: '/e/',
    keywords: ['elephant', 'egg'],
    phase: '2',
    type: 'vowel',
    culturalConnection: 'Like Māori "e" in "whare"',
    exampleWords: ['bed', 'red', 'ten', 'whare', 'net'],
    handwriting: 'Start in the middle, round and back',
    difficulty: 'foundation'
  },
  {
    id: 'u2',
    letter: 'u',
    sound: '/u/',
    keywords: ['umbrella', 'up'],
    phase: '2',
    type: 'vowel',
    culturalConnection: 'Like Māori "u" in "kupu"',
    exampleWords: ['cup', 'run', 'sun', 'kupu', 'nut'],
    handwriting: 'Down, curve, up, down',
    difficulty: 'foundation'
  },
  {
    id: 'r2',
    letter: 'r',
    sound: '/r/',
    keywords: ['rabbit', 'red'],
    phase: '2',
    type: 'consonant',
    culturalConnection: 'Rolling sound like "reo"',
    exampleWords: ['red', 'car', 'run', 'reo', 'star'],
    handwriting: 'Down, up, round',
    difficulty: 'developing'
  },

  // Phase 3 - Consonant digraphs
  {
    id: 'ch3',
    letter: 'ch',
    sound: '/ch/',
    keywords: ['chair', 'chip'],
    phase: '3',
    type: 'digraph',
    culturalConnection: 'Like "tch" sound in some Te Reo words',
    exampleWords: ['chair', 'much', 'chip', 'lunch', 'such'],
    handwriting: 'c then h, close together',
    difficulty: 'developing'
  },
  {
    id: 'sh3',
    letter: 'sh',
    sound: '/sh/',
    keywords: ['ship', 'shell'],
    phase: '3',
    type: 'digraph',
    culturalConnection: 'Quiet sound like "whispering to ancestors"',
    exampleWords: ['ship', 'fish', 'shop', 'wash', 'shell'],
    handwriting: 's then h, close together',
    difficulty: 'developing'
  },
  {
    id: 'th3',
    letter: 'th',
    sound: '/th/',
    keywords: ['think', 'thumb'],
    phase: '3',
    type: 'digraph',
    culturalConnection: 'Tongue between teeth - not in Māori',
    exampleWords: ['think', 'path', 'thumb', 'with', 'both'],
    handwriting: 't then h, close together',
    difficulty: 'secure'
  },
  {
    id: 'ng3',
    letter: 'ng',
    sound: '/ng/',
    keywords: ['ring', 'song'],
    phase: '3',
    type: 'digraph',
    culturalConnection: 'Like "ng" in "ngā" - very familiar sound',
    exampleWords: ['ring', 'song', 'long', 'ngā', 'king'],
    handwriting: 'n then g, close together',
    difficulty: 'foundation'
  }
];

export default function PhoneticsCards() {
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentCard, setCurrentCard] = useState<PhoneticsCard | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [filteredCards, setFilteredCards] = useState<PhoneticsCard[]>(phoneticsCardsData);

  useEffect(() => {
    let filtered = phoneticsCardsData;
    
    if (selectedPhase !== 'all') {
      filtered = filtered.filter(card => card.phase === selectedPhase);
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(card => card.type === selectedType);
    }
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(card => card.difficulty === selectedDifficulty);
    }
    
    setFilteredCards(filtered);
  }, [selectedPhase, selectedType, selectedDifficulty]);

  const selectRandomCard = () => {
    if (filteredCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredCards.length);
      setCurrentCard(filteredCards[randomIndex]);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'foundation': return '#4caf50';
      case 'developing': return '#ff9800';
      case 'secure': return '#2196f3';
      default: return '#666';
    }
  };

  const getPhaseColor = (phase: string) => {
    const colors = {
      '1': '#e8f5e8',
      '2': '#fff3e0',
      '3': '#e3f2fd',
      '4': '#f3e5f5',
      '5': '#fce4ec',
      '6': '#e0f2f1'
    };
    return colors[phase as keyof typeof colors] || '#f5f5f5';
  };

  return (
    <div className="phonetics-container">
      <header className="phonetics-header">
        <h1 className="phonetics-title">📚 Phonetics Cards - Te Kōrero Tuatahi</h1>
        <p className="phonetics-subtitle">
          Systematic phonics instruction cards combining The Code methodology with cultural connections
        </p>
      </header>

      {/* Cultural Framework */}
      <section className="cultural-framework">
        <h2>🌿 Cultural Integration Approach</h2>
        <p>
          These phonetics cards honor both systematic phonics instruction and Te Reo Māori sound patterns, 
          helping ākonga make connections between their cultural language heritage and English literacy development.
        </p>
        <div className="framework-highlight">
          <strong>Kōrero Philosophy:</strong> "Every sound has whakapapa - connections that help learning stick."
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <h3>🎯 Filter Cards</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="phase-filter">Phase:</label>
            <select 
              id="phase-filter"
              value={selectedPhase} 
              onChange={(e) => setSelectedPhase(e.target.value)}
            >
              <option value="all">All Phases</option>
              <option value="1">Phase 1 - Foundation</option>
              <option value="2">Phase 2 - CVC</option>
              <option value="3">Phase 3 - Digraphs</option>
              <option value="4">Phase 4 - CVCC/CCVC</option>
              <option value="5">Phase 5 - Alternative spellings</option>
              <option value="6">Phase 6 - Prefixes/Suffixes</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="type-filter">Type:</label>
            <select 
              id="type-filter"
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="vowel">Vowels</option>
              <option value="consonant">Consonants</option>
              <option value="digraph">Digraphs</option>
              <option value="trigraph">Trigraphs</option>
              <option value="split-digraph">Split Digraphs</option>
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
              <option value="foundation">Foundation</option>
              <option value="developing">Developing</option>
              <option value="secure">Secure</option>
            </select>
          </div>

          <button 
            className="random-card-btn"
            onClick={selectRandomCard}
            disabled={filteredCards.length === 0}
          >
            🎲 Random Card
          </button>
        </div>
        
        <div className="filter-results">
          <span className="results-count">{filteredCards.length} cards available</span>
        </div>
      </section>

      {/* Current Card Display */}
      {currentCard && (
        <section className="card-display-section">
          <div 
            className="phonetics-card-large"
            style={{ backgroundColor: getPhaseColor(currentCard.phase) }}
          >
            <div className="card-header">
              <span className="phase-badge">Phase {currentCard.phase}</span>
              <span 
                className="difficulty-badge"
                style={{ backgroundColor: getDifficultyColor(currentCard.difficulty) }}
              >
                {currentCard.difficulty}
              </span>
              <span className="type-badge">{currentCard.type}</span>
            </div>

            <div className="card-main">
              <div className="letter-display">
                <h2 className="card-letter">{currentCard.letter}</h2>
                <p className="card-sound">{currentCard.sound}</p>
              </div>

              {!showAnswer ? (
                <div className="card-front">
                  <div className="keywords">
                    <h4>Keywords:</h4>
                    <div className="keyword-list">
                      {currentCard.keywords.map((keyword, index) => (
                        <span key={index} className="keyword">{keyword}</span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="reveal-btn" onClick={toggleAnswer}>
                    👁️ Reveal Details
                  </button>
                </div>
              ) : (
                <div className="card-back">
                  <div className="example-words">
                    <h4>Example Words:</h4>
                    <div className="word-grid">
                      {currentCard.exampleWords.map((word, index) => (
                        <span key={index} className="example-word">{word}</span>
                      ))}
                    </div>
                  </div>

                  {currentCard.culturalConnection && (
                    <div className="cultural-connection">
                      <h4>🌿 Cultural Connection:</h4>
                      <p>{currentCard.culturalConnection}</p>
                    </div>
                  )}

                  <div className="handwriting-guide">
                    <h4>✍️ Handwriting:</h4>
                    <p>{currentCard.handwriting}</p>
                  </div>

                  <button className="hide-btn" onClick={toggleAnswer}>
                    🔒 Hide Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Cards Grid */}
      <section className="cards-grid-section">
        <h3>📋 All Cards ({filteredCards.length})</h3>
        <div className="cards-grid">
          {filteredCards.map((card) => (
            <div 
              key={card.id} 
              className="phonetics-card-small"
              style={{ backgroundColor: getPhaseColor(card.phase) }}
              onClick={() => setCurrentCard(card)}
            >
              <div className="card-small-header">
                <span className="phase-indicator">P{card.phase}</span>
                <span 
                  className="difficulty-dot"
                  style={{ backgroundColor: getDifficultyColor(card.difficulty) }}
                ></span>
              </div>
              
              <div className="card-small-content">
                <h4 className="card-small-letter">{card.letter}</h4>
                <p className="card-small-sound">{card.sound}</p>
                <div className="card-small-keywords">
                  {card.keywords.slice(0, 2).map((keyword, index) => (
                    <span key={index} className="small-keyword">{keyword}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teaching Notes */}
      <section className="teaching-notes">
        <h3>📝 Teaching Notes</h3>
        <div className="notes-grid">
          <div className="note-card">
            <h4>🎯 Systematic Progression</h4>
            <ul>
              <li>Start with Phase 1 foundation sounds</li>
              <li>Ensure 80% accuracy before progressing</li>
              <li>Use cultural connections to aid memory</li>
              <li>Practice handwriting alongside sound recognition</li>
            </ul>
          </div>
          
          <div className="note-card">
            <h4>🌿 Cultural Integration</h4>
            <ul>
              <li>Connect English sounds to Te Reo Māori patterns</li>
              <li>Use familiar cultural vocabulary as examples</li>
              <li>Honor oral tradition while building written skills</li>
              <li>Celebrate bilingual sound awareness</li>
            </ul>
          </div>
          
          <div className="note-card">
            <h4>📊 Assessment Focus</h4>
            <ul>
              <li>Track sound-symbol correspondence</li>
              <li>Monitor handwriting formation</li>
              <li>Check application in reading/spelling</li>
              <li>Document cultural connection understanding</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="phonetics-footer">
        <p className="cultural-motto">🌿 "He kōrero, he titiro, he tuhi" - Speaking, seeing, writing together</p>
        <p className="platform-info">Te Kete Ako - Phonetics Excellence for Aotearoa</p>
      </footer>
    </div>
  );
}