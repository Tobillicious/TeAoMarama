/**
 * 🔍 COMPREHENSIVE SEARCH INTERFACE
 *
 * Advanced search interface with cultural intelligence and Te Reo Māori support.
 * Integrates with the Comprehensive Search Engine and Supreme Overseer system.
 *
 * ASSIGNED LLM: DeepSeek (Problem Solver) - Leading search interface development
 * CULTURAL INTELLIGENCE: Gemini (Content Curator) - Ensuring cultural safety
 * TECHNICAL IMPLEMENTATION: Claude (Architect) - Handling component architecture
 */

import { BookOpen, ChevronDown, Filter, Globe, Search, Star, Target } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import type {
  SearchAnalytics,
  SearchFilters,
  SearchOptions,
  SearchResult,
  SearchSuggestion,
} from '../utils/comprehensive-search-engine';
import { comprehensiveSearchEngine } from '../utils/comprehensive-search-engine';

interface ComprehensiveSearchInterfaceProps {
  onSearchResults?: (results: SearchResult[], analytics: SearchAnalytics) => void;
  onSearchStart?: () => void;
  onSearchComplete?: () => void;
  placeholder?: string;
  showFilters?: boolean;
  showSuggestions?: boolean;
  maxResults?: number;
}

const ComprehensiveSearchInterface: React.FC<ComprehensiveSearchInterfaceProps> = ({
  onSearchResults,
  onSearchStart,
  onSearchComplete,
  placeholder = 'Search educational resources...',
  showFilters = true,
  showSuggestions = true,
  maxResults = 50,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [analytics, setAnalytics] = useState<SearchAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    maxResults: maxResults,
    sortBy: 'relevance',
    includeCulturalContext: true,
    prioritizeTeReo: true,
    fuzzySearch: true,
  });

  // Initialize search engine
  useEffect(() => {
    const initializeSearch = async () => {
      try {
        // Search engine is already initialized
        console.log('✅ Comprehensive Search Engine initialized');
      } catch (error) {
        console.error('❌ Search engine initialization failed:', error);
      }
    };

    initializeSearch();
  }, []);

  // Handle search input changes
  const handleQueryChange = useCallback(
    async (newQuery: string) => {
      setQuery(newQuery);

      if (newQuery.length > 2 && showSuggestions) {
        try {
          const newSuggestions = await comprehensiveSearchEngine.getSuggestions(newQuery);
          setSuggestions(newSuggestions);
          setShowSuggestionsList(true);
        } catch (error) {
          console.error('Error getting suggestions:', error);
        }
      } else {
        setShowSuggestionsList(false);
      }
    },
    [showSuggestions],
  );

  // Perform search
  const performSearch = useCallback(
    async (searchQuery: string = query) => {
      if (!searchQuery.trim()) return;

      setLoading(true);
      onSearchStart?.();

      try {
        console.log('🔍 Performing comprehensive search...');
        const searchResults = await comprehensiveSearchEngine.search(
          searchQuery,
          searchFilters,
          searchOptions,
        );

        setResults(searchResults.results);
        setAnalytics(searchResults.analytics);
        onSearchResults?.(searchResults.results, searchResults.analytics);

        console.log(`✅ Search complete: ${searchResults.results.length} results`);
      } catch (error) {
        console.error('❌ Search failed:', error);
      } finally {
        setLoading(false);
        onSearchComplete?.();
      }
    },
    [query, searchFilters, searchOptions, onSearchResults, onSearchStart, onSearchComplete],
  );

  // Handle search submission
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setShowSuggestionsList(false);
      performSearch();
    },
    [performSearch],
  );

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      setShowSuggestionsList(false);
      performSearch(suggestion);
    },
    [performSearch],
  );

  // Handle filter changes
  const handleFilterChange = useCallback((filterType: keyof SearchFilters, value: unknown) => {
    setSearchFilters((prev: SearchFilters) => ({
      ...prev,
      [filterType]: value,
    }));
  }, []);

  // Handle sort changes
  const handleSortChange = useCallback((sortBy: SearchOptions['sortBy']) => {
    setSearchOptions((prev: SearchOptions) => ({
      ...prev,
      sortBy,
    }));
  }, []);

  // Render search result item
  const renderSearchResult = (result: SearchResult) => (
    <div key={result.id} className="search-result-item">
      <div className="search-result-header">
        <h3 className="search-result-title">{result.title}</h3>
        <div className="search-result-badges">
          <span className="badge badge-subject">{result.subject}</span>
          <span className="badge badge-year">{result.yearLevel}</span>
          <span className="badge badge-type">{result.type}</span>
          {result.culturalRelevance > 0.5 && (
            <span className="badge badge-cultural">🌿 Cultural</span>
          )}
          {result.tags.includes('Te Reo Māori') && (
            <span className="badge badge-tereo">🗣️ Te Reo</span>
          )}
        </div>
      </div>

      <div className="search-result-content">
        <p className="search-result-description">{result.description}</p>
        <p className="search-result-content">{result.content}</p>
      </div>

      <div className="search-result-footer">
        <div className="search-result-scores">
          <span className="score relevance">
            <Star className="icon" />
            Relevance: {result.relevanceScore.toFixed(1)}
          </span>
          <span className="score cultural">
            <Globe className="icon" />
            Cultural: {result.culturalRelevance.toFixed(1)}
          </span>
          <span className="score quality">
            <Target className="icon" />
            Quality: {result.qualityScore}
          </span>
        </div>

        <div className="search-result-tags">
          {result.tags.slice(0, 5).map((tag: string) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  // Render analytics
  const renderAnalytics = () => {
    if (!analytics) return null;

    return (
      <div className="search-analytics">
        <h4>📊 Search Analytics</h4>
        <div className="analytics-grid">
          <div className="analytics-item">
            <span className="analytics-label">Total Results:</span>
            <span className="analytics-value">{analytics.totalResults}</span>
          </div>
          <div className="analytics-item">
            <span className="analytics-label">Search Time:</span>
            <span className="analytics-value">{analytics.searchTime}ms</span>
          </div>
          <div className="analytics-item">
            <span className="analytics-label">Cultural Results:</span>
            <span className="analytics-value">{analytics.culturalResults}</span>
          </div>
          <div className="analytics-item">
            <span className="analytics-label">Te Reo Results:</span>
            <span className="analytics-value">{analytics.teReoResults}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="comprehensive-search-interface">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <Search className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={placeholder}
            className="search-input"
            aria-label="Search educational resources"
          />
          {loading && <div className="search-loading">🔍</div>}
        </div>

        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>

        {showFilters && (
          <button
            type="button"
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            className="filters-toggle"
            aria-label="Toggle filters"
          >
            <Filter className="icon" />
            Filters
            <ChevronDown className={`chevron ${showFiltersPanel ? 'open' : ''}`} />
          </button>
        )}
      </form>

      {/* Search Suggestions */}
      {showSuggestionsList && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionSelect(suggestion.text)}
              className="suggestion-item"
            >
              {suggestion.text}
            </button>
          ))}
        </div>
      )}

      {/* Filters Panel */}
      {showFiltersPanel && (
        <div className="filters-panel">
          <h4>🔍 Search Filters</h4>

          <div className="filter-group">
            <label>Subject:</label>
            <select
              value={searchFilters.subjects?.[0] || ''}
              onChange={(e) =>
                handleFilterChange('subjects', e.target.value ? [e.target.value] : undefined)
              }
              title="Select subject filter"
            >
              <option value="">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Social Studies">Social Studies</option>
              <option value="English">English</option>
              <option value="Art">Art</option>
              <option value="Music">Music</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Year Level:</label>
            <select
              value={searchFilters.yearLevels?.[0] || ''}
              onChange={(e) =>
                handleFilterChange('yearLevels', e.target.value ? [e.target.value] : undefined)
              }
              title="Select year level filter"
            >
              <option value="">All Year Levels</option>
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
              <option value="Year 4">Year 4</option>
              <option value="Year 5">Year 5</option>
              <option value="Year 6">Year 6</option>
              <option value="Year 7">Year 7</option>
              <option value="Year 8">Year 8</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Cultural Elements:</label>
            <select
              value={searchFilters.culturalElements ? 'true' : 'all'}
              onChange={(e) =>
                handleFilterChange(
                  'culturalElements',
                  e.target.value === 'all' ? undefined : e.target.value === 'true',
                )
              }
              title="Select cultural elements filter"
            >
              <option value="all">All Levels</option>
              <option value="high">High Cultural Content</option>
              <option value="medium">Medium Cultural Content</option>
              <option value="low">Low Cultural Content</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Quality:</label>
            <select
              value={searchFilters.qualityThreshold || 'all'}
              onChange={(e) =>
                handleFilterChange(
                  'qualityThreshold',
                  e.target.value === 'all' ? undefined : parseInt(e.target.value),
                )
              }
              title="Select quality threshold filter"
            >
              <option value="all">All Quality Levels</option>
              <option value="80">High Quality (80+)</option>
              <option value="60">Medium Quality (60+)</option>
              <option value="40">Low Quality (40+)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={searchFilters.culturalElements || false}
                onChange={(e) =>
                  handleFilterChange('culturalElements', e.target.checked || undefined)
                }
              />
              Te Reo Māori Content
            </label>
          </div>

          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={searchFilters.culturalElements || false}
                onChange={(e) =>
                  handleFilterChange('culturalElements', e.target.checked || undefined)
                }
              />
              Cultural Context
            </label>
          </div>
        </div>
      )}

      {/* Sort Options */}
      <div className="sort-options">
        <label>Sort by:</label>
        <select
          value={searchOptions.sortBy}
          onChange={(e) => handleSortChange(e.target.value as SearchOptions['sortBy'])}
          title="Select sort option"
        >
          <option value="relevance">Relevance</option>
          <option value="cultural">Cultural Relevance</option>
          <option value="quality">Quality</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="search-results">
          <h3>🔍 Search Results ({results.length})</h3>
          <div className="results-list">{results.map((result) => renderSearchResult(result))}</div>
        </div>
      )}

      {/* Analytics */}
      {analytics && renderAnalytics()}

      {/* No Results */}
      {query && !loading && results.length === 0 && (
        <div className="no-results">
          <BookOpen className="icon" />
          <h3>No results found for "{query}"</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}

      <style>{`
        .comprehensive-search-interface {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .search-form {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          align-items: center;
        }

        .search-input-container {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #2e86ab;
        }

        .search-button {
          padding: 12px 24px;
          background: #2e86ab;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .search-button:hover:not(:disabled) {
          background: #1a4f66;
        }

        .search-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .filters-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .filters-toggle:hover {
          background: #e9ecef;
        }

        .chevron {
          transition: transform 0.3s;
        }

        .chevron.open {
          transform: rotate(180deg);
        }

        .search-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          margin-top: 4px;
        }

        .suggestion-item {
          display: block;
          width: 100%;
          padding: 12px 16px;
          text-align: left;
          border: none;
          background: none;
          cursor: pointer;
          transition: background 0.3s;
        }

        .suggestion-item:hover {
          background: #f8f9fa;
        }

        .filters-panel {
          background: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .filter-group {
          margin-bottom: 15px;
        }

        .filter-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .filter-group select,
        .filter-group input[type='text'] {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .filter-group input[type='checkbox'] {
          margin-right: 8px;
        }

        .sort-options {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .sort-options select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .search-results h3 {
          margin-bottom: 20px;
          color: #1b4332;
        }

        .search-result-item {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 16px;
          transition: box-shadow 0.3s;
        }

        .search-result-item:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .search-result-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .search-result-title {
          margin: 0;
          color: #1b4332;
          font-size: 18px;
        }

        .search-result-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .badge-subject {
          background: #e3f2fd;
          color: #1565c0;
        }

        .badge-year {
          background: #f3e5f5;
          color: #7b1fa2;
        }

        .badge-type {
          background: #e8f5e8;
          color: #2e7d32;
        }

        .badge-cultural {
          background: #fff3e0;
          color: #e65100;
        }

        .badge-tereo {
          background: #e0f2f1;
          color: #00695c;
        }

        .search-result-content {
          margin-bottom: 16px;
        }

        .search-result-description {
          margin: 0 0 8px 0;
          color: #495057;
        }

        .search-result-snippet {
          margin: 0 0 12px 0;
          color: #6c757d;
          font-style: italic;
        }

        .search-result-cultural,
        .search-result-tereo {
          margin: 8px 0;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 4px;
          font-size: 14px;
        }

        .search-result-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .search-result-scores {
          display: flex;
          gap: 16px;
        }

        .score {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          color: #6c757d;
        }

        .score .icon {
          width: 16px;
          height: 16px;
        }

        .search-result-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .tag {
          padding: 2px 6px;
          background: #e9ecef;
          color: #495057;
          border-radius: 3px;
          font-size: 12px;
        }

        .search-analytics {
          background: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
        }

        .search-analytics h4 {
          margin: 0 0 16px 0;
          color: #1b4332;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .analytics-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #dee2e6;
        }

        .analytics-label {
          font-weight: 500;
          color: #495057;
        }

        .analytics-value {
          font-weight: 600;
          color: #1b4332;
        }

        .no-results {
          text-align: center;
          padding: 40px 20px;
          color: #6c757d;
        }

        .no-results .icon {
          width: 48px;
          height: 48px;
          margin-bottom: 16px;
          color: #adb5bd;
        }

        .no-results h3 {
          margin: 0 0 8px 0;
          color: #495057;
        }

        .search-loading {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: translateY(-50%) rotate(0deg);
          }
          to {
            transform: translateY(-50%) rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .search-form {
            flex-direction: column;
            align-items: stretch;
          }

          .search-result-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .search-result-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .search-result-scores {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export default ComprehensiveSearchInterface;
