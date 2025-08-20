import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';

// Enhanced Te Reo Māori word list with cultural authenticity
const TE_REO_WORDS = [
  // Core vocabulary - spiritual and cultural
  { word: 'AROHA', meaning: 'Love, compassion, empathy', category: 'emotions' },
  { word: 'WHARE', meaning: 'House, building, home', category: 'places' },
  { word: 'MAURI', meaning: 'Life force, vital essence', category: 'spiritual' },
  { word: 'TAIAO', meaning: 'Environment, natural world', category: 'nature' },
  { word: 'RANGI', meaning: 'Sky, heaven, day', category: 'nature' },
  { word: 'MOANA', meaning: 'Ocean, sea, large lake', category: 'nature' },
  { word: 'MAUNGA', meaning: 'Mountain, large hill', category: 'nature' },
  { word: 'WHENUA', meaning: 'Land, country, birth place', category: 'nature' },
  { word: 'TAONGA', meaning: 'Treasure, precious thing', category: 'cultural' },
  { word: 'WAIRUA', meaning: 'Spirit, soul, spiritual essence', category: 'spiritual' },

  // Family and relationships - whānau
  { word: 'MATUA', meaning: 'Parent, father, elder', category: 'whanau' },
  { word: 'WHAEA', meaning: 'Mother, aunt, female elder', category: 'whanau' },
  { word: 'WHANAU', meaning: 'Family, extended family group', category: 'whanau' },

  // Cultural concepts - tikanga
  { word: 'HONGI', meaning: 'Traditional greeting - touching noses', category: 'cultural' },
  { word: 'HANGI', meaning: 'Earth oven, traditional cooking', category: 'cultural' },
  { word: 'MARAE', meaning: 'Ceremonial grounds, sacred place', category: 'cultural' },

  // Nature and environment
  { word: 'KOWHAI', meaning: 'Golden native tree, yellow', category: 'nature' },
  { word: 'KAURI', meaning: 'Native tree species, ancient giant', category: 'nature' },

  // Actions and movement
  { word: 'HAERE', meaning: 'Go, come, travel, proceed', category: 'actions' },
  { word: 'NOHO', meaning: 'Sit, stay, remain, live', category: 'actions' },
  { word: 'KORERO', meaning: 'Speak, talk, conversation', category: 'actions' },
  { word: 'AKO', meaning: 'Learn, teach, education', category: 'actions' },

  // Additional cultural words
  { word: 'MANA', meaning: 'Prestige, authority, spiritual power', category: 'spiritual' },
  { word: 'TAPU', meaning: 'Sacred, restricted, set apart', category: 'spiritual' },
  { word: 'NOA', meaning: 'Free from tapu, ordinary', category: 'spiritual' },
  { word: 'UTU', meaning: 'Reciprocity, balance, payment', category: 'cultural' },
  { word: 'MANAAKITANGA', meaning: 'Hospitality, kindness, care', category: 'cultural' },
];

interface GuessResult {
  letter: string;
  status: 'correct' | 'present' | 'absent';
}

export const TeReoWordle: React.FC = () => {
  const [targetWord, setTargetWord] = useState('');
  const [targetMeaning, setTargetMeaning] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!targetWord) {
      const randomWordData = TE_REO_WORDS[Math.floor(Math.random() * TE_REO_WORDS.length)];
      setTargetWord(randomWordData.word);
      setTargetMeaning(randomWordData.meaning);
    }
  }, [targetWord]);

  const checkGuess = (guess: string): GuessResult[] => {
    const target = targetWord.split('');
    const result: GuessResult[] = [];

    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (target[i] === letter) {
        result.push({ letter, status: 'correct' });
      } else if (target.includes(letter)) {
        result.push({ letter, status: 'present' });
      } else {
        result.push({ letter, status: 'absent' });
      }
    }

    return result;
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== targetWord.length) return;

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (currentGuess === targetWord) {
      setGameStatus('won');
    } else if (newGuesses.length >= 6) {
      setGameStatus('lost');
    }

    setCurrentGuess('');
  };

  const resetGame = () => {
    const randomWordData = TE_REO_WORDS[Math.floor(Math.random() * TE_REO_WORDS.length)];
    setTargetWord(randomWordData.word);
    setTargetMeaning(randomWordData.meaning);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setShowHint(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correct':
        return 'bg-green-500 text-white';
      case 'present':
        return 'bg-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Card title="Te Reo Māori Wordle" className="te-reo-wordle">
      <div className="wordle-header text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Te Reo Māori Wordle</h2>
        <p className="text-gray-600">🌿 Ako i te reo rangatira - Learn the language of the land</p>
      </div>

      <div className="wordle-grid mb-6">
        {Array.from({ length: 6 }, (_, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2 mb-2">
            {Array.from({ length: targetWord.length || 5 }, (_, colIndex) => {
              const guess = guesses[rowIndex];
              const letter = guess ? guess[colIndex] : '';
              const result = guess ? checkGuess(guess)[colIndex] : null;

              return (
                <div
                  key={colIndex}
                  className={`w-12 h-12 border-2 border-gray-300 flex items-center justify-center text-xl font-bold uppercase ${getStatusColor(
                    result?.status || '',
                  )}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {gameStatus === 'playing' && (
        <div className="wordle-input text-center mb-6">
          <div className="flex justify-center gap-2 mb-4">
            <input
              type="text"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitGuess()}
              maxLength={targetWord.length}
              placeholder="Tāuru kupu..."
              className="px-4 py-2 border border-gray-300 rounded-lg text-center text-lg uppercase"
            />
            <button
              onClick={handleSubmitGuess}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Whakaū
            </button>
          </div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          {showHint && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Hint:</strong> {targetMeaning}
              </p>
            </div>
          )}
        </div>
      )}

      {gameStatus !== 'playing' && (
        <div className="game-result text-center mb-6">
          <h3 className="text-xl font-bold mb-4">
            {gameStatus === 'won' ? 'Kia ora! He pai!' : `Ka mutu - ${targetWord}`}
          </h3>
          <p className="text-gray-600 mb-4">{targetMeaning}</p>
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Tīmata anō
          </button>
        </div>
      )}

      <div className="cultural-footer text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Ngā kupu:{' '}
          {TE_REO_WORDS.slice(0, 10)
            .map((w) => w.word)
            .join(' • ')}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          🌿 Cultural learning through play - Honouring te reo rangatira
        </p>
      </div>
    </Card>
  );
};
