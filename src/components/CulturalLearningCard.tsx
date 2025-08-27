import React, { useState } from 'react';
import { Heart, Volume2, BookOpen, Users, Leaf, Star } from 'lucide-react';

interface CulturalConcept {
  id: string;
  term: string;
  termTe: string;
  pronunciation: string;
  meaning: string;
  meaningTe: string;
  culturalContext: string;
  examples: string[];
  relatedConcepts: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'tikanga' | 'whakapapa' | 'te-reo' | 'values' | 'practices';
}

interface CulturalLearningCardProps {
  concept: CulturalConcept;
  onLearned?: (conceptId: string) => void;
  onFavorite?: (conceptId: string) => void;
  isLearned?: boolean;
  isFavorite?: boolean;
  showTeReo?: boolean;
}

export function CulturalLearningCard({
  concept,
  onLearned,
  onFavorite,
  isLearned = false,
  isFavorite = false,
  showTeReo = false
}: CulturalLearningCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showingExamples, setShowingExamples] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tikanga': return <Leaf className="w-4 h-4" />;
      case 'whakapapa': return <Users className="w-4 h-4" />;
      case 'te-reo': return <Volume2 className="w-4 h-4" />;
      case 'values': return <Heart className="w-4 h-4" />;
      case 'practices': return <BookOpen className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const playPronunciation = () => {
    // In a real implementation, this would use Web Speech API
    // or connect to a pronunciation service
    console.log(`Playing pronunciation for: ${concept.termTe} (${concept.pronunciation})`);
    
    // Mock pronunciation announcement
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(concept.termTe);
      utterance.lang = 'mi-NZ'; // Māori language code
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div 
      className={`cultural-learning-card relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-l-4 ${
        isLearned ? 'border-green-500' : 'border-orange-400'
      }`}
      role="article"
      aria-labelledby={`concept-title-${concept.id}`}
    >
      {/* Card Header */}
      <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-orange-600">
              {getCategoryIcon(concept.category)}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(concept.difficulty)}`}>
              {concept.difficulty}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onFavorite?.(concept.id)}
              className={`p-1 rounded-full transition-colors ${
                isFavorite 
                  ? 'text-red-600 bg-red-100' 
                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            
            {isLearned && (
              <div className="text-green-600 bg-green-100 p-1 rounded-full">
                <BookOpen className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        <h3 
          id={`concept-title-${concept.id}`}
          className="text-xl font-bold text-gray-800 mb-1"
        >
          {showTeReo ? concept.termTe : concept.term}
        </h3>

        {concept.termTe !== concept.term && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">
              {showTeReo ? concept.term : concept.termTe}
            </span>
            <button
              onClick={playPronunciation}
              className="text-orange-600 hover:text-orange-700 p-1 rounded-full hover:bg-orange-100"
              aria-label="Play pronunciation"
            >
              <Volume2 className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="text-xs text-gray-500 mb-2">
          Pronunciation: /{concept.pronunciation}/
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div 
          className={`transition-all duration-500 ${isFlipped ? 'opacity-0 h-0' : 'opacity-100'}`}
        >
          <p className="text-gray-700 mb-4 leading-relaxed">
            {showTeReo ? concept.meaningTe : concept.meaning}
          </p>

          <div className="mb-4 p-3 bg-orange-50 rounded-lg border-l-3 border-orange-300">
            <h4 className="text-sm font-semibold text-orange-800 mb-2">
              🌿 Cultural Context / Horopaki Ahurea
            </h4>
            <p className="text-sm text-orange-700 leading-relaxed">
              {concept.culturalContext}
            </p>
          </div>

          {!showingExamples && concept.examples.length > 0 && (
            <button
              onClick={() => setShowingExamples(true)}
              className="text-sm text-blue-600 hover:underline mb-2"
            >
              Show examples ({concept.examples.length})
            </button>
          )}

          {showingExamples && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Examples:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {concept.examples.map((example, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowingExamples(false)}
                className="text-sm text-blue-600 hover:underline mt-2"
              >
                Hide examples
              </button>
            </div>
          )}

          {concept.relatedConcepts.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Related Concepts / Ariā Hāngai:
              </h4>
              <div className="flex flex-wrap gap-2">
                {concept.relatedConcepts.map((related, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200 cursor-pointer"
                  >
                    {related}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Learning Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex-1 px-3 py-2 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
          >
            {isFlipped ? 'Show Details' : 'Test Knowledge'}
          </button>
          
          {!isLearned && (
            <button
              onClick={() => onLearned?.(concept.id)}
              className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Mark as Learned
            </button>
          )}
        </div>

        {/* Knowledge Test (when flipped) */}
        {isFlipped && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Test Your Understanding:
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-700 mb-2">
                  What does "{concept.termTe}" mean?
                </p>
                <textarea
                  className="w-full p-2 text-sm border border-gray-300 rounded resize-none"
                  rows={2}
                  placeholder="Write your understanding here..."
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-700 mb-2">
                  Can you think of a situation where you might use this concept?
                </p>
                <textarea
                  className="w-full p-2 text-sm border border-gray-300 rounded resize-none"
                  rows={2}
                  placeholder="Describe a practical example..."
                />
              </div>
              
              <button
                onClick={() => setIsFlipped(false)}
                className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Check Answer & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}