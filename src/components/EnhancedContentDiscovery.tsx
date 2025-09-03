import React, { useEffect, useMemo, useState } from 'react';
import {
  educationalContentManager,
  type EducationalResource,
} from '../utils/educational-content-manager';
import './EnhancedContentDiscovery.css';

interface SmartSearchFilters {
  query: string;
  subject: string;
  yearLevel: number | 'all';
  type: string;
  difficulty: string;
  culturalContext: boolean;
  duration: 'any' | 'short' | 'medium' | 'long';
  sortBy: 'relevance' | 'recent' | 'rating' | 'cultural-score';
}

interface ContentRecommendation {
  resource: EducationalResource;
  score: number;
  reason: string;
  culturalRelevance: number;
}

// Interface for resources with search scores during processing
interface ResourceWithSearchScore extends EducationalResource {
  searchScore: number;
}

const EnhancedContentDiscovery: React.FC = () => {
  const [filteredResources, setFilteredResources] = useState<EducationalResource[]>([]);
  const [recommendations, setRecommendations] = useState<ContentRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [filters, setFilters] = useState<SmartSearchFilters>({
    query: '',
    subject: 'all',
    yearLevel: 'all',
    type: 'all',
    difficulty: 'all',
    culturalContext: false,
    duration: 'any',
    sortBy: 'relevance',
  });

  // Enhanced search suggestions based on Māori educational context
  const searchSuggestionPool = useMemo(
    () => [
      'Te Reo Māori basics',
      'Māori customs and traditions',
      'Whakapapa genealogy',
      'Kaitiakitanga environmental care',
      'Matariki celebrations',
      'Treaty of Waitangi',
      'Māori art and crafts',
      'Traditional storytelling',
      'Tikanga protocols',
      'Māori mathematics patterns',
      'Indigenous science',
      'Cultural identity',
      'Māori mythology',
      'Hongi greeting',
      'Marae protocols',
      'Whakataukī proverbs',
      'Sustainable practices',
      'Cultural diversity',
      'Pacific peoples',
      'Migration stories',
    ],
    [],
  );

  // Smart search suggestions
  const generateSearchSuggestions = useMemo(() => {
    return (query: string) => {
      if (!query || query.length < 2) return [];

      return searchSuggestionPool
        .filter(
          (suggestion) =>
            suggestion.toLowerCase().includes(query.toLowerCase()) ||
            query
              .toLowerCase()
              .split(' ')
              .some((word) => suggestion.toLowerCase().includes(word)),
        )
        .slice(0, 6);
    };
  }, [searchSuggestionPool]);

  // Enhanced content scoring algorithm
  const calculateContentScore = useMemo(() => {
    return (resource: EducationalResource, query: string): number => {
      let score = 0;
      const queryLower = query.toLowerCase();
      const queryWords = queryLower.split(' ');

      // Title matching (highest weight)
      if (resource.title.toLowerCase().includes(queryLower)) score += 50;
      queryWords.forEach((word) => {
        if (resource.title.toLowerCase().includes(word)) score += 20;
      });

      // Description matching
      if (resource.description.toLowerCase().includes(queryLower)) score += 30;
      queryWords.forEach((word) => {
        if (resource.description.toLowerCase().includes(word)) score += 10;
      });

      // Keywords matching
      resource.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(queryLower)) score += 25;
        queryWords.forEach((word) => {
          if (keyword.toLowerCase().includes(word)) score += 15;
        });
      });

      // Cultural context bonus
      if (resource.maoriIntegration && filters.culturalContext) score += 30;

      // Learning objectives matching
      resource.learningObjectives.forEach((objective) => {
        if (objective.toLowerCase().includes(queryLower)) score += 20;
        queryWords.forEach((word) => {
          if (objective.toLowerCase().includes(word)) score += 8;
        });
      });

      // Cultural content bonus
      if (resource.culturalContext && resource.culturalContext !== 'general-educational') {
        score += 20;
      }

      return score;
    };
  }, [filters.culturalContext]);

  // Advanced filtering logic
  const applyAdvancedFilters = useMemo(() => {
    return (resourceList: EducationalResource[]) => {
      return resourceList.filter((resource) => {
        // Subject filter
        if (filters.subject !== 'all' && resource.subject !== filters.subject) return false;

        // Year level filter
        if (filters.yearLevel !== 'all' && !resource.yearLevel.includes(filters.yearLevel))
          return false;

        // Type filter
        if (filters.type !== 'all' && resource.type !== filters.type) return false;

        // Difficulty filter
        if (filters.difficulty !== 'all' && resource.difficulty !== filters.difficulty)
          return false;

        // Duration filter
        if (filters.duration !== 'any') {
          const duration = resource.duration;
          switch (filters.duration) {
            case 'short':
              if (duration > 30) return false;
              break;
            case 'medium':
              if (duration <= 30 || duration > 60) return false;
              break;
            case 'long':
              if (duration <= 60) return false;
              break;
          }
        }

        // Cultural context filter
        if (filters.culturalContext && !resource.maoriIntegration) return false;

        return true;
      });
    };
  }, [filters]);

  // Smart content recommendations
  const generateRecommendations = useMemo(() => {
    return (baseResources: EducationalResource[]) => {
      const recs: ContentRecommendation[] = baseResources
        .slice(0, 12) // Limit to top 12
        .map((resource) => {
          let score = Math.random() * 30 + 70; // Base score 70-100
          let reason = 'Recommended based on your interests';
          let culturalRelevance = 0;

          // Cultural integration bonus
          if (resource.maoriIntegration) {
            score += 10;
            culturalRelevance += 40;
            reason = 'High cultural integration and educational value';
          }

          // Cultural context analysis
          if (resource.culturalContext) {
            switch (resource.culturalContext) {
              case 'te-reo-integration':
                culturalRelevance += 30;
                reason = 'Excellent Te Reo Māori integration';
                break;
              case 'tikanga-protocol':
                culturalRelevance += 35;
                reason = 'Strong tikanga and cultural protocols';
                break;
              case 'traditional-knowledge':
                culturalRelevance += 25;
                reason = 'Traditional mātauranga integration';
                break;
              default:
                culturalRelevance += 20;
            }
          }

          // Recent content bonus
          const daysSinceCreated =
            (Date.now() - new Date(resource.createdAt).getTime()) / (1000 * 60 * 60 * 24);
          if (daysSinceCreated < 30) {
            score += 5;
            reason = 'Recently created content with cultural focus';
          }

          // Quality indicators
          if (resource.status === 'published' && resource.culturalReviewStatus === 'approved') {
            score += 15;
            culturalRelevance += 20;
            reason = 'Culturally approved and high-quality content';
          }

          return {
            resource,
            score: Math.min(100, score),
            reason,
            culturalRelevance: Math.min(100, culturalRelevance),
          };
        })
        .sort((a, b) => b.score - a.score);

      return recs;
    };
  }, []);

  // Main search and filter function
  const searchAndFilter = useMemo(() => {
    return async () => {
      setIsLoading(true);
      try {
        let results: EducationalResource[] = [];

        if (filters.query.trim()) {
          // Perform smart search
          results = await educationalContentManager.searchResources(
            filters.query,
            filters.culturalContext,
          );

          // Enhanced scoring for search results
          const scoredResults: ResourceWithSearchScore[] = results.map((resource) => ({
            ...resource,
            searchScore: calculateContentScore(resource, filters.query),
          }));

          // Sort by search score and remove the searchScore property
          results = scoredResults
            .sort((a, b) => b.searchScore - a.searchScore)
            .map((scoredResource) => {
              const { searchScore, ...resource } = scoredResource;
              return resource;
            });
        } else {
          // Get all resources with filters
          results = await educationalContentManager.getResourcesByFilters({
            subject: filters.subject !== 'all' ? filters.subject : undefined,
            yearLevel: filters.yearLevel !== 'all' ? filters.yearLevel : undefined,
            type: filters.type !== 'all' ? filters.type : undefined,
            difficulty: filters.difficulty !== 'all' ? filters.difficulty : undefined,
            culturalContext: filters.culturalContext,
          });
        }

        // Apply additional filters
        results = applyAdvancedFilters(results);

        // Sort results
        switch (filters.sortBy) {
          case 'recent':
            results.sort(
              (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
            );
            break;
          case 'cultural-score':
            results.sort((a, b) => {
              const aScore = a.maoriIntegration ? 1 : 0;
              const bScore = b.maoriIntegration ? 1 : 0;
              return bScore - aScore;
            });
            break;
          case 'rating':
            // In a real system, this would sort by actual ratings
            results.sort((a, b) => a.title.localeCompare(b.title));
            break;
          default: // relevance
            // Already sorted by search score if there's a query
            break;
        }

        setFilteredResources(results);
        setRecommendations(generateRecommendations(results));
      } catch (error) {
        console.error('Search failed:', error);
        setFilteredResources([]);
      } finally {
        setIsLoading(false);
      }
    };
  }, [filters, calculateContentScore, applyAdvancedFilters, generateRecommendations]);

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, query: value }));

    if (value.length > 1) {
      const suggestions = generateSearchSuggestions(value);
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof SmartSearchFilters, value: string | number | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setShowSuggestions(false);
  };

  // Load initial content
  useEffect(() => {
    const loadInitialContent = async () => {
      setIsLoading(true);
      try {
        const allResources = await educationalContentManager.getResourcesByFilters({});
        setFilteredResources(allResources);
        setRecommendations(generateRecommendations(allResources));
      } catch (error) {
        console.error('Failed to load resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialContent();
  }, [generateRecommendations]);

  // Apply search and filters
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAndFilter();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchAndFilter]);

  return (
    <div className="enhanced-content-discovery">
      {/* Smart Search Header */}
      <div className="discovery-header">
        <h1>🔍 Smart Content Discovery</h1>
        <p>AI-powered search with cultural integration and personalized recommendations</p>
      </div>

      {/* Advanced Search Interface */}
      <div className="smart-search-section">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search educational content... (e.g., 'Te Reo basics', 'Matariki', 'Treaty of Waitangi')"
            value={filters.query}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="smart-search-input"
          />
          <div className="search-actions">
            <button
              className={`cultural-toggle ${filters.culturalContext ? 'active' : ''}`}
              onClick={() => handleFilterChange('culturalContext', !filters.culturalContext)}
              title="Prioritize culturally integrated content"
            >
              🌿 Cultural Focus
            </button>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && (
            <div className="search-suggestions">
              {searchSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  className="suggestion-item"
                  onClick={() => {
                    handleSearchChange(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Advanced Filters */}
        <div className="advanced-filters">
          <div className="filter-row">
            <select
              value={filters.subject}
              onChange={(e) => handleFilterChange('subject', e.target.value)}
              className="filter-select"
              aria-label="Select subject"
            >
              <option value="all">All Subjects</option>
              <option value="Te Reo Māori">Te Reo Māori</option>
              <option value="Social Studies">Social Studies</option>
              <option value="Arts">Arts</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="History">History</option>
              <option value="English">English</option>
            </select>

            <select
              value={filters.yearLevel}
              onChange={(e) =>
                handleFilterChange(
                  'yearLevel',
                  e.target.value === 'all' ? 'all' : parseInt(e.target.value),
                )
              }
              className="filter-select"
              aria-label="Select year level"
            >
              <option value="all">All Years</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
              <option value="5">Year 5</option>
              <option value="6">Year 6</option>
              <option value="7">Year 7</option>
              <option value="8">Year 8</option>
              <option value="9">Year 9</option>
              <option value="10">Year 10</option>
              <option value="11">Year 11</option>
              <option value="12">Year 12</option>
              <option value="13">Year 13</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="filter-select"
              aria-label="Select resource type"
            >
              <option value="all">All Types</option>
              <option value="lesson">Lesson</option>
              <option value="activity">Activity</option>
              <option value="assessment">Assessment</option>
              <option value="resource">Resource</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="interactive">Interactive</option>
            </select>

            <select
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="filter-select"
              aria-label="Select difficulty level"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={filters.duration}
              onChange={(e) =>
                handleFilterChange(
                  'duration',
                  e.target.value as 'any' | 'short' | 'medium' | 'long',
                )
              }
              className="filter-select"
              aria-label="Select duration"
            >
              <option value="any">Any Duration</option>
              <option value="short">Short (&lt;30 min)</option>
              <option value="medium">Medium (30-60 min)</option>
              <option value="long">&gt;60 min</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) =>
                handleFilterChange(
                  'sortBy',
                  e.target.value as 'relevance' | 'recent' | 'rating' | 'cultural-score',
                )
              }
              className="filter-select"
              aria-label="Select sort order"
            >
              <option value="relevance">Relevance</option>
              <option value="recent">Most Recent</option>
              <option value="rating">Rating</option>
              <option value="cultural-score">Cultural Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <div className="results-count">
          {isLoading ? (
            <span>🔍 Searching...</span>
          ) : (
            <span>
              📊 Found {filteredResources.length} resources
              {filters.culturalContext && (
                <span className="cultural-indicator"> • 🌿 Cultural focus active</span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Smart Recommendations */}
      {recommendations.length > 0 && (
        <div className="smart-recommendations">
          <h3>🎯 Smart Recommendations</h3>
          <div className="recommendations-grid">
            {recommendations.slice(0, 6).map((rec) => (
              <div key={rec.resource.id} className="recommendation-card">
                <div className="rec-header">
                  <span className="rec-score">{Math.round(rec.score)}%</span>
                  <span className="cultural-score">🌿 {Math.round(rec.culturalRelevance)}%</span>
                </div>
                <h4>{rec.resource.title}</h4>
                <p className="rec-reason">{rec.reason}</p>
                <div className="rec-meta">
                  <span>{rec.resource.subject}</span>
                  <span>Year {rec.resource.yearLevel.join(', ')}</span>
                  <span>{rec.resource.duration} min</span>
                </div>
                <button className="explore-rec-btn">Explore</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="search-results">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Searching for the best educational content...</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No content found</h3>
            <p>Try adjusting your search terms or filters</p>
            <div className="search-tips">
              <h4>💡 Search Tips:</h4>
              <ul>
                <li>Try broader terms like "Māori culture" or "mathematics"</li>
                <li>Use the cultural focus toggle for culturally integrated content</li>
                <li>Adjust year level or subject filters</li>
                <li>Browse our suggested search terms above</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="results-grid">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="enhanced-resource-card">
                <div className="resource-header">
                  <div className="resource-type">
                    {resource.type === 'lesson' && '📚'}
                    {resource.type === 'activity' && '🎯'}
                    {resource.type === 'assessment' && '📝'}
                    {resource.type === 'handout' && '📄'}
                    <span>{resource.type}</span>
                  </div>
                  {resource.maoriIntegration && <div className="cultural-badge">🌿 Cultural</div>}
                </div>

                <div className="resource-content">
                  <h3>{resource.title}</h3>
                  <p className="resource-description">{resource.description}</p>

                  <div className="resource-details">
                    <div className="detail-item">
                      <span className="detail-label">Subject:</span>
                      <span className="detail-value">{resource.subject}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Year:</span>
                      <span className="detail-value">Year {resource.yearLevel.join(', ')}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">{resource.duration} min</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Difficulty:</span>
                      <span className={`difficulty-badge ${resource.difficulty}`}>
                        {resource.difficulty}
                      </span>
                    </div>
                  </div>

                  {resource.culturalContext && (
                    <div className="cultural-context">
                      <h4>🌿 Cultural Context:</h4>
                      <span className="cultural-context-badge">
                        {resource.culturalContext.replace('-', ' ')}
                      </span>
                    </div>
                  )}

                  <div className="resource-keywords">
                    {resource.keywords.slice(0, 4).map((keyword) => (
                      <span key={keyword} className="keyword-tag">
                        #{keyword}
                      </span>
                    ))}
                    {resource.keywords.length > 4 && (
                      <span className="keyword-more">+{resource.keywords.length - 4} more</span>
                    )}
                  </div>
                </div>

                <div className="resource-actions">
                  <button className="primary-action">View Resource</button>
                  <button className="secondary-action">Save</button>
                  <button className="secondary-action">Share</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedContentDiscovery;
