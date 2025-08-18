import React, { useState, useEffect } from 'react';
import { Card } from '../Card';

const TE_REO_WORDS = [
  'AROHA', 'WHANAU', 'MAURI', 'TUHOE', 'NGATI', 
  'TAONGA', 'MAORI', 'AOTEAROA', 'WHENUA', 'MOANA'
];

interface GuessResult {
  letter: string;
  status: 'correct' | 'present' | 'absent';
}

export const TeReoWordle: React.FC = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  useEffect(() => {
    if (!targetWord) {
      const randomWord = TE_REO_WORDS[Math.floor(Math.random() * TE_REO_WORDS.length)];
      setTargetWord(randomWord);
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
    const randomWord = TE_REO_WORDS[Math.floor(Math.random() * TE_REO_WORDS.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
  };

  return (
    <Card className="te-reo-wordle">
      <div className="wordle-header">
        <h2>Te Reo Māori Wordle</h2>
        <p className="cultural-context">
          🌿 Ako i te reo rangatira - Learn the language of the land
        </p>
      </div>

      <div className="wordle-grid">
        {Array.from({ length: 6 }, (_, rowIndex) => (
          <div key={rowIndex} className="wordle-row">
            {Array.from({ length: targetWord.length || 5 }, (_, colIndex) => {
              const guess = guesses[rowIndex];
              const letter = guess ? guess[colIndex] : '';
              const result = guess ? checkGuess(guess)[colIndex] : null;
              
              return (
                <div 
                  key={colIndex}
                  className={`wordle-cell ${result?.status || ''}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {gameStatus === 'playing' && (
        <div className="wordle-input">
          <input
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitGuess()}
            maxLength={targetWord.length}
            placeholder="Tāuru kupu..."
          />
          <button onClick={handleSubmitGuess}>Whakaū</button>
        </div>
      )}

      {gameStatus !== 'playing' && (
        <div className="game-result">
          <h3>{gameStatus === 'won' ? 'Kia ora! He pai!' : `Ka mutu - ${targetWord}`}</h3>
          <button onClick={resetGame}>Tīmata anō</button>
        </div>
      )}
      
      <div className="cultural-footer">
        <p>Ngā kupu: {TE_REO_WORDS.join(' • ')}</p>
      </div>
    </Card>
  );
};