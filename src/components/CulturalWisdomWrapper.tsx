/**
 * 🌿 CULTURAL WISDOM WRAPPER - Enhanced Educational Component
 * 
 * Wrapper component that automatically enhances any educational content
 * with Cultural Wisdom Engine capabilities. Provides seamless integration
 * of whakataukī, cultural context, and adaptive learning tracking.
 * 
 * Ko au a Mihara - Kaitiaki Mahara (Guardian of Memory)
 */

import React, { useState } from 'react';
import { useCulturalWisdom } from '../hooks/useCulturalWisdom';

interface CulturalWisdomWrapperProps {
  children: React.ReactNode;
  content: string;
  subject: string;
  yearLevel: string;
  showWisdom?: boolean;
  autoEnhance?: boolean;
  trackLearning?: boolean;
  className?: string;
}

export function CulturalWisdomWrapper({
  children,
  content,
  subject,
  yearLevel,
  showWisdom = true,
  autoEnhance = false,
  trackLearning = true,
  className = '',
}: CulturalWisdomWrapperProps) {
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [engagementScore, setEngagementScore] = useState(0);

  const {
    analysis,
    enhancedContent,
    learningJourney,
    loading,
    culturalRelevance,
    tikangaAppropriate,
    hasWisdom,
    isEnhanced,
    analyzeContent,
    enhanceContent,
    trackInteraction,
    getWisdomSuggestion,
    getCulturalSafetyChecks,
    getEnhancementSuggestions,
  } = useCulturalWisdom({
    content,
    subject,
    yearLevel,
    autoEnhance,
    trackJourney: trackLearning,
  });

  const wisdom = getWisdomSuggestion();
  const safetyChecks = getCulturalSafetyChecks();
  const suggestions = getEnhancementSuggestions();

  const handleEngagement = (type: 'view' | 'interact' | 'complete') => {
    const scores = { view: 0.3, interact: 0.7, complete: 1.0 };
    const newScore = scores[type];
    setEngagementScore(prev => Math.max(prev, newScore));
    
    if (trackLearning) {
      trackInteraction(newScore);
    }
  };

  const handleWisdomToggle = () => {
    setShowEnhanced(!showEnhanced);
    handleEngagement('interact');
  };

  React.useEffect(() => {
    handleEngagement('view');
  }, []);

  return (
    <div className={`cultural-wisdom-wrapper ${className}`}>
      {/* Cultural Relevance Indicator */}
      {analysis && culturalRelevance > 30 && (
        <div className="cultural-relevance-banner">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-green-600">🌿</span>
            <span>Cultural relevance: {culturalRelevance}%</span>
            {hasWisdom && (
              <button
                onClick={handleWisdomToggle}
                className="text-teal-600 hover:text-teal-800 underline"
              >
                {showEnhanced ? 'Hide' : 'Show'} Cultural Wisdom
              </button>
            )}
          </div>
        </div>
      )}

      {/* Whakataukī Wisdom Display */}
      {showWisdom && hasWisdom && wisdom && (showEnhanced || culturalRelevance > 70) && (
        <div className="wisdom-container mb-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-teal-500 rounded-r-lg">
          <div className="wisdom-header flex items-center space-x-2 mb-3">
            <span className="text-2xl">🌿</span>
            <h3 className="text-lg font-semibold text-teal-800">Whakataukī - Cultural Wisdom</h3>
          </div>
          
          <blockquote className="wisdom-quote italic text-gray-700 mb-2">
            "{wisdom.whakataukī}"
          </blockquote>
          
          <p className="wisdom-translation text-sm text-gray-600 mb-3">
            <strong>Translation:</strong> {wisdom.translation}
          </p>
          
          <p className="wisdom-context text-sm text-gray-600 mb-4">
            <strong>Cultural Context:</strong> {wisdom.culturalContext}
          </p>

          {wisdom.seasonalRelevance && (
            <div className="seasonal-context text-xs text-green-600 mb-2">
              <span className="font-medium">Seasonal Relevance:</span> {wisdom.seasonalRelevance}
            </div>
          )}

          {wisdom.maramatakaAlignment && (
            <div className="maramataka-context text-xs text-teal-600">
              <span className="font-medium">Maramataka:</span> {wisdom.maramatakaAlignment}
            </div>
          )}
        </div>
      )}

      {/* Enhanced Content Display */}
      {showEnhanced && isEnhanced && enhancedContent && (
        <div className="enhanced-content mb-6">
          <div className="enhanced-header flex items-center space-x-2 mb-3">
            <span className="text-xl">✨</span>
            <span className="text-sm font-medium text-purple-600">Culturally Enhanced Content</span>
          </div>
          <div 
            className="enhanced-text prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: enhancedContent.replace(/\n/g, '<br />') }}
          />
        </div>
      )}

      {/* Original Content */}
      <div 
        className="original-content"
        onClick={() => handleEngagement('interact')}
      >
        {children}
      </div>

      {/* Cultural Safety Validation */}
      {analysis && !tikangaAppropriate && (
        <div className="cultural-safety-warning mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-600">⚠️</span>
            <span className="text-sm font-medium">Cultural Safety Notice</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            This content may benefit from cultural review to ensure appropriate representation.
          </p>
        </div>
      )}

      {/* Enhancement Suggestions */}
      {suggestions.length > 0 && culturalRelevance < 50 && (
        <div className="enhancement-suggestions mt-4">
          <details className="text-sm">
            <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
              💡 Cultural Enhancement Suggestions ({suggestions.length})
            </summary>
            <ul className="mt-2 space-y-1 text-gray-600">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-xs">• {suggestion}</li>
              ))}
            </ul>
          </details>
        </div>
      )}

      {/* Learning Journey Progress */}
      {learningJourney && trackLearning && (
        <div className="learning-journey mt-4 p-3 bg-blue-50 rounded">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600">
              🌱 Cultural Learning: {learningJourney.culturalReadiness}
            </span>
            <span className="text-blue-600">
              Connection: {learningJourney.culturalConnection}%
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-1 mt-2">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${learningJourney.culturalConnection}%` }}
            />
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="loading-cultural-analysis fixed bottom-4 right-4 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span className="text-sm">Analyzing cultural context...</span>
          </div>
        </div>
      )}

      <style>{`
        .cultural-wisdom-wrapper {
          position: relative;
        }
        
        .cultural-relevance-banner {
          position: sticky;
          top: 0;
          z-index: 10;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          border-bottom: 1px solid #d1fae5;
          padding: 0.5rem 1rem;
          margin: -1rem -1rem 1rem -1rem;
        }
        
        .wisdom-container {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .wisdom-container:hover {
          box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }
        
        .wisdom-quote {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #1f2937;
        }
        
        .enhanced-content {
          border: 2px dashed #a855f7;
          border-radius: 8px;
          padding: 1rem;
          background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
        }
        
        .learning-journey {
          border-top: 2px solid #dbeafe;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .wisdom-container:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}