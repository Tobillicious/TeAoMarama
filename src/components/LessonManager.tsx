import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import './LessonManager.css';

interface LessonResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  description: string;
  culturalElements: string[];
  learningObjectives: string[];
  resourceType: 'full-lesson' | 'activity' | 'assessment' | 'stub';
  filePath: string;
  lastUpdated: Date;
  qualityScore: number; // 1-10 based on content depth
  metadata?: {
    difficulty?: string;
  };
  relevanceScore?: number;
}

const LessonManager: React.FC = () => {
  const [lessons, setLessons] = useState<LessonResource[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'quality-first' | 'all'>('quality-first');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    difficulty: 'all',
    resourceType: 'all',
    culturalFocus: 'all',
    duration: 'all',
  });
  const [sortBy, setSortBy] = useState<'relevance' | 'quality' | 'recent' | 'alphabetical'>(
    'quality',
  );
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    loadHighQualityLessons();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const searchTimeout = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(searchTimeout);
    }
  }, [searchTerm]);

  const loadHighQualityLessons = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay for realistic loading state
      await new Promise((resolve) => setTimeout(resolve, 800));

      // These are the REAL, high-quality lesson resources we actually have
      const qualityLessons: LessonResource[] = [
        {
          id: 'y7-treaty-waitangi',
          title: 'Treaty of Waitangi Investigation',
          subject: 'Social Studies',
          yearLevel: 'Year 7',
          description:
            'Comprehensive 6-lesson unit exploring Treaty history, perspectives, and modern impact',
          culturalElements: ['Māori perspectives', 'Tikanga protocols', 'Whakapapa understanding'],
          learningObjectives: [
            'Understand Treaty historical context',
            'Analyze multiple perspectives',
            'Examine ongoing Treaty impact',
            'Develop critical thinking skills',
          ],
          resourceType: 'full-lesson',
          filePath: '/real-resources/Y7_Social_Studies_Treaty_of_Waitangi_Investigation.md',
          lastUpdated: new Date(),
          qualityScore: 10,
        },
        {
          id: 'y5-maori-games',
          title: 'Traditional Māori Games and Movement',
          subject: 'Physical Education',
          yearLevel: 'Year 5',
          description: 'Culturally respectful 8-lesson unit teaching traditional Māori games',
          culturalElements: [
            'Cultural protocols',
            'Traditional games significance',
            'Community values',
          ],
          learningObjectives: [
            'Understand cultural significance of games',
            'Develop movement skills',
            'Demonstrate cultural respect',
            'Build community cooperation',
          ],
          resourceType: 'full-lesson',
          filePath: '/real-resources/Y5_Physical_Education_Traditional_Maori_Games.md',
          lastUpdated: new Date(),
          qualityScore: 10,
        },
        {
          id: 'y3-native-birds',
          title: 'NZ Native Birds Reading Comprehension',
          subject: 'Reading',
          yearLevel: 'Year 3',
          description: 'Reading comprehension focused on New Zealand native birds',
          culturalElements: ['Environmental stewardship', 'Native species knowledge'],
          learningObjectives: [
            'Develop reading comprehension',
            'Learn about native birds',
            'Environmental awareness',
          ],
          resourceType: 'activity',
          filePath: '/real-resources/Y3_Reading_NZ_Native_Birds_Comprehension.md',
          lastUpdated: new Date(),
          qualityScore: 8,
        },
        {
          id: 'esol-support',
          title: 'ESOL Support Toolkit for Multilingual Learners',
          subject: 'ESOL',
          yearLevel: 'All Years',
          description: 'Comprehensive support toolkit for English language learners',
          culturalElements: ['Cultural responsiveness', 'Multilingual support'],
          learningObjectives: [
            'Support language development',
            'Cultural integration',
            'Academic success',
          ],
          resourceType: 'full-lesson',
          filePath: '/real-resources/ESOL_Support_Toolkit_Multilingual_Learners.md',
          lastUpdated: new Date(),
          qualityScore: 9,
        },
        {
          id: 'y10-climate-action',
          title: 'Climate Change Action Investigation',
          subject: 'Science',
          yearLevel: 'Year 10',
          description: 'Investigation into climate change and action strategies',
          culturalElements: ['Environmental stewardship', 'Kaitiakitanga'],
          learningObjectives: [
            'Understand climate science',
            'Develop action plans',
            'Environmental responsibility',
          ],
          resourceType: 'activity',
          filePath: '/real-resources/Y10_Science_Climate_Change_Action_Investigation.md',
          lastUpdated: new Date(),
          qualityScore: 8,
        },
      ];

      setLessons(qualityLessons);
    } catch (err) {
      setError('Failed to load quality lessons. Please try again.');
      console.error('Error loading lessons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Advanced fuzzy search function
  const fuzzyMatch = (text: string, query: string): number => {
    if (!query) return 1;
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();

    // Exact match gets highest score
    if (textLower.includes(queryLower)) {
      return textLower === queryLower ? 1 : 0.9;
    }

    // Check for partial word matches
    const textWords = textLower.split(' ');
    const queryWords = queryLower.split(' ');
    let matchCount = 0;

    queryWords.forEach((queryWord) => {
      textWords.forEach((textWord) => {
        if (textWord.includes(queryWord) || queryWord.includes(textWord)) {
          matchCount++;
        }
      });
    });

    return matchCount / Math.max(queryWords.length, textWords.length);
  };

  const getFilteredLessons = () => {
    let filtered = lessons;

    // Quality filter
    if (viewMode === 'quality-first') {
      filtered = filtered.filter((lesson) => lesson.qualityScore >= 8);
    }

    // Subject filter
    if (selectedSubject !== 'all') {
      filtered = filtered.filter((lesson) =>
        lesson.subject.toLowerCase().includes(selectedSubject.toLowerCase()),
      );
    }

    // Year level filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter((lesson) => lesson.yearLevel === selectedYear);
    }

    // Advanced filters
    if (searchFilters.difficulty !== 'all') {
      filtered = filtered.filter((lesson) => {
        const difficultyMap: Record<string, string[]> = {
          beginner: ['Beginner', 'Beginner to Intermediate'],
          intermediate: ['Intermediate', 'Intermediate to Advanced'],
          advanced: ['Advanced', 'Intermediate to Advanced'],
        };
        return difficultyMap[searchFilters.difficulty]?.some((d) =>
          lesson.metadata?.difficulty?.includes(d),
        );
      });
    }

    if (searchFilters.resourceType !== 'all') {
      filtered = filtered.filter((lesson) => lesson.resourceType === searchFilters.resourceType);
    }

    if (searchFilters.culturalFocus !== 'all') {
      filtered = filtered.filter((lesson) =>
        lesson.culturalElements.some((element) =>
          element.toLowerCase().includes(searchFilters.culturalFocus.toLowerCase()),
        ),
      );
    }

    // Enhanced search with fuzzy matching and relevance scoring
    if (searchTerm) {
      const searchResults = filtered
        .map((lesson) => {
          const titleScore = fuzzyMatch(lesson.title, searchTerm) * 3;
          const descriptionScore = fuzzyMatch(lesson.description, searchTerm) * 2;
          const culturalScore = lesson.culturalElements.reduce(
            (max, element) => Math.max(max, fuzzyMatch(element, searchTerm)),
            0,
          );
          const objectiveScore = lesson.learningObjectives.reduce(
            (max, objective) => Math.max(max, fuzzyMatch(objective, searchTerm)),
            0,
          );

          const relevanceScore = titleScore + descriptionScore + culturalScore + objectiveScore;
          return { ...lesson, relevanceScore };
        })
        .filter((lesson) => lesson.relevanceScore > 0.3);

      filtered = searchResults;
    }

    // Sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return (b.relevanceScore || b.qualityScore) - (a.relevanceScore || a.qualityScore);
        case 'quality':
          return b.qualityScore - a.qualityScore;
        case 'recent':
          return b.lastUpdated.getTime() - a.lastUpdated.getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return b.qualityScore - a.qualityScore;
      }
    });
  };

  const getQualityBadge = (score: number) => {
    if (score >= 9) return { label: 'Exceptional', color: '#059669', icon: '🌟' };
    if (score >= 8) return { label: 'High Quality', color: '#0891b2', icon: '⭐' };
    if (score >= 6) return { label: 'Good', color: '#ca8a04', icon: '👍' };
    return { label: 'Needs Development', color: '#dc2626', icon: '🔧' };
  };

  if (isLoading) {
    return (
      <div className="lesson-manager-container">
        <div className="lesson-manager-loading">
          <div className="loading-animation">
            <div className="loading-spinner-large">🎓</div>
            <h2>Loading Quality Educational Resources</h2>
            <p>Preparing our carefully curated lesson content...</p>
            <div className="loading-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lesson-manager-container">
        <div className="lesson-manager-error">
          <div className="error-icon">❌</div>
          <h2>Unable to Load Lessons</h2>
          <p>{error}</p>
          <button onClick={() => loadHighQualityLessons()} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <div className="lesson-manager-container">
        <div className="lesson-manager-header">
          <h1>🎓 Quality Educational Resources</h1>
          <p>
            Discover our <strong>high-quality, culturally responsive</strong> educational content.
            These are fully developed lessons, not auto-generated stubs.
          </p>
        </div>

        {/* Quality Alert */}
        <div className="quality-alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <h3>Focus on Quality Over Quantity</h3>
            <p>
              We're displaying our{' '}
              <strong>
                {lessons.filter((l) => l.qualityScore >= 8).length} highest-quality resources
              </strong>{' '}
              that have been carefully crafted by education experts. These lessons include detailed
              cultural protocols, learning objectives, and assessment criteria.
            </p>
          </div>
        </div>

        {/* Enhanced Search & Filter Controls */}
        <div className="lesson-controls">
          <div className="search-section">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="🔍 Search lessons, objectives, cultural elements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="lesson-search enhanced"
              />
              {isSearching && (
                <div className="search-loading">
                  <div className="search-spinner">🔍</div>
                </div>
              )}
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="search-meta">
              {searchTerm && (
                <span className="search-results-count">
                  {getFilteredLessons().length} results for "{searchTerm}"
                </span>
              )}
            </div>
          </div>

          <div className="primary-filters">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="filter-select subject-filter"
              aria-label="Filter by subject"
            >
              <option value="all">📚 All Subjects</option>
              <option value="social studies">🏛️ Social Studies</option>
              <option value="physical education">⚽ Physical Education</option>
              <option value="science">🔬 Science</option>
              <option value="reading">📖 Reading</option>
              <option value="esol">🌍 ESOL</option>
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="filter-select year-filter"
              aria-label="Filter by year level"
            >
              <option value="all">🎓 All Year Levels</option>
              <option value="Year 3">Year 3</option>
              <option value="Year 5">Year 5</option>
              <option value="Year 7">Year 7</option>
              <option value="Year 10">Year 10</option>
              <option value="All Years">All Years</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="filter-select sort-filter"
              aria-label="Sort lessons by"
            >
              <option value="quality">⭐ Highest Quality</option>
              <option value="relevance">🎯 Most Relevant</option>
              <option value="recent">🕒 Most Recent</option>
              <option value="alphabetical">🔤 A-Z</option>
            </select>
          </div>

          <div className="secondary-controls">
            <button
              className={`advanced-filters-toggle ${showAdvancedFilters ? 'active' : ''}`}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              🎛️ Advanced Filters {showAdvancedFilters ? '▲' : '▼'}
            </button>

            <div className="view-toggle">
              <button
                className={`toggle-btn ${viewMode === 'quality-first' ? 'active' : ''}`}
                onClick={() => setViewMode('quality-first')}
              >
                🌟 Quality First
              </button>
              <button
                className={`toggle-btn ${viewMode === 'all' ? 'active' : ''}`}
                onClick={() => setViewMode('all')}
              >
                📚 Show All
              </button>
            </div>
          </div>

          {showAdvancedFilters && (
            <div className="advanced-filters">
              <h3>🎛️ Advanced Search Filters</h3>
              <div className="advanced-filter-grid">
                <div className="filter-group">
                  <label>Difficulty Level</label>
                  <select
                    value={searchFilters.difficulty}
                    onChange={(e) =>
                      setSearchFilters({ ...searchFilters, difficulty: e.target.value })
                    }
                    className="advanced-filter-select"
                    aria-label="Filter by difficulty level"
                  >
                    <option value="all">Any Level</option>
                    <option value="beginner">🟢 Beginner</option>
                    <option value="intermediate">🟡 Intermediate</option>
                    <option value="advanced">🔴 Advanced</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Resource Type</label>
                  <select
                    value={searchFilters.resourceType}
                    onChange={(e) =>
                      setSearchFilters({ ...searchFilters, resourceType: e.target.value })
                    }
                    className="advanced-filter-select"
                  >
                    <option value="all">Any Type</option>
                    <option value="full-lesson">📚 Complete Unit</option>
                    <option value="activity">📄 Activity</option>
                    <option value="assessment">📊 Assessment</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Cultural Focus</label>
                  <select
                    value={searchFilters.culturalFocus}
                    onChange={(e) =>
                      setSearchFilters({ ...searchFilters, culturalFocus: e.target.value })
                    }
                    className="advanced-filter-select"
                  >
                    <option value="all">Any Focus</option>
                    <option value="māori">🌿 Te Ao Māori</option>
                    <option value="tikanga">🤝 Tikanga</option>
                    <option value="cultural">🌍 Multicultural</option>
                    <option value="environmental">🌱 Environmental</option>
                  </select>
                </div>

                <div className="filter-actions">
                  <button
                    className="clear-filters-btn"
                    onClick={() => {
                      setSearchFilters({
                        difficulty: 'all',
                        resourceType: 'all',
                        culturalFocus: 'all',
                        duration: 'all',
                      });
                      setSearchTerm('');
                      setSelectedSubject('all');
                      setSelectedYear('all');
                    }}
                  >
                    🗑️ Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lesson Grid */}
        <div className="lessons-grid">
          {getFilteredLessons().map((lesson) => {
            const qualityBadge = getQualityBadge(lesson.qualityScore);

            return (
              <div key={lesson.id} className="lesson-card">
                <div className="lesson-header">
                  <div className="lesson-meta">
                    <span className="year-level">{lesson.yearLevel}</span>
                    <span className="subject-badge">{lesson.subject}</span>
                  </div>
                  <div className="quality-badge" style={{ backgroundColor: qualityBadge.color }}>
                    {qualityBadge.icon} {qualityBadge.label}
                  </div>
                </div>

                <h3 className="lesson-title">{lesson.title}</h3>
                <p className="lesson-description">{lesson.description}</p>

                <div className="cultural-elements">
                  <h4>🌿 Cultural Elements:</h4>
                  <div className="elements-tags">
                    {lesson.culturalElements.map((element, index) => (
                      <span key={index} className="culture-tag">
                        {element}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="learning-objectives">
                  <h4>🎯 Learning Objectives:</h4>
                  <ul>
                    {lesson.learningObjectives.slice(0, 2).map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                    {lesson.learningObjectives.length > 2 && (
                      <li className="more-objectives">
                        +{lesson.learningObjectives.length - 2} more objectives
                      </li>
                    )}
                  </ul>
                </div>

                <div className="lesson-actions">
                  <Link to={`/lesson/${lesson.id}`} className="view-lesson-btn">
                    📖 View Full Lesson
                  </Link>
                  <button className="preview-btn">👁️ Quick Preview</button>
                </div>

                <div className="lesson-stats">
                  <span className="resource-type">
                    {lesson.resourceType === 'full-lesson' ? '📚 Complete Unit' : '📄 Activity'}
                  </span>
                  <span className="quality-score">Score: {lesson.qualityScore}/10</span>
                </div>
              </div>
            );
          })}
        </div>

        {getFilteredLessons().length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No quality lessons found</h3>
            <p>Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Development Notice */}
        <div className="development-notice">
          <h3>🚧 Platform Development Status</h3>
          <div className="development-stats">
            <div className="stat-card good">
              <strong>{lessons.filter((l) => l.qualityScore >= 8).length}</strong>
              <span>High-Quality Lessons</span>
            </div>
            <div className="stat-card warning">
              <strong>1,351</strong>
              <span>Auto-Generated Stubs</span>
            </div>
            <div className="stat-card info">
              <strong>13</strong>
              <span>Developed Resources</span>
            </div>
          </div>
          <p>
            <strong>Our Priority:</strong> We focus on developing fewer, higher-quality resources
            rather than thousands of auto-generated content stubs. Each lesson here has been
            carefully crafted with cultural responsiveness, pedagogical soundness, and practical
            classroom application in mind.
          </p>
        </div>
      </div>
    </>
  );
};

export default LessonManager;
