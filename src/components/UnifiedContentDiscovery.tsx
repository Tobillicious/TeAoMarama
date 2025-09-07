import { BookOpen, Clock, Download, Eye, Heart, Search, Star, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  filterContentByCategory,
  filterContentBySubject,
  loadAllIndexedContent,
  searchContent,
  sortContent,
  type ContentItem,
} from '../utils/content-indexer';
import { ContentPerformanceOptimizer, debounce } from '../utils/performance-optimizer';
import ContentPreviewModal from './ContentPreviewModal';
import './UnifiedContentDiscovery.css';

const UnifiedContentDiscovery: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popularity' | 'recent' | 'alphabetical' | 'featured'>(
    'featured',
  );
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const optimizer = ContentPerformanceOptimizer.getInstance();
        const realContent = await optimizer.loadContentWithCache(loadAllIndexedContent);
        setContentItems(realContent);
      } catch (error) {
        console.error('Error loading content:', error);
        // Fallback to some basic content if loading fails
        setContentItems([]);
      }
    };

    loadContent();
  }, []);

  // Debounced search function
  const debouncedSearch = debounce((term: string) => {
    const optimizer = ContentPerformanceOptimizer.getInstance();
    let filtered = contentItems;

    // Apply search filter with caching
    if (term) {
      filtered = optimizer.searchWithCache(filtered, term);
    }

    // Apply category filter with caching
    filtered = optimizer.filterWithCache(filtered, 'category', selectedCategory);

    // Apply subject filter with caching
    filtered = optimizer.filterWithCache(filtered, 'subject', selectedSubject);

    // Sort content
    filtered = sortContent(filtered, sortBy);

    setFilteredContent(filtered);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [contentItems, selectedCategory, selectedSubject, searchTerm, sortBy]);

  const categories = ['all', ...Array.from(new Set(contentItems.map((item) => item.category)))];
  const subjects = ['all', ...Array.from(new Set(contentItems.map((item) => item.subject)))];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'worksheet':
        return 'bg-blue-100 text-blue-800';
      case 'unit':
        return 'bg-green-100 text-green-800';
      case 'template':
        return 'bg-purple-100 text-purple-800';
      case 'guide':
        return 'bg-orange-100 text-orange-800';
      case 'lesson':
        return 'bg-pink-100 text-pink-800';
      case 'resource':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item);
  };

  const handleDownload = (item: ContentItem) => {
    console.log('Downloading:', item.title);
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 95) return 'text-green-600';
    if (popularity >= 85) return 'text-blue-600';
    if (popularity >= 75) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="unified-content-discovery">
      <div className="discovery-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="discovery-title">
              <BookOpen className="title-icon" />
              Unified Content Discovery
            </h1>
            <p className="discovery-subtitle">
              Discover all our beautiful educational resources, lesson templates, and TeKeteAko
              content in one place
            </p>
          </div>
        </div>
      </div>

      <div className="discovery-controls">
        <div className="search-section">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search resources, templates, and lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <label className="filter-label" htmlFor="category-select">
              Category:
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="subject-select">
              Subject:
            </label>
            <select
              id="subject-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="filter-select"
              aria-label="Filter by subject"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="sort-select">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="filter-select"
              aria-label="Sort content by"
            >
              <option value="featured">Featured First</option>
              <option value="popularity">Most Popular</option>
              <option value="recent">Recently Updated</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>

          <div className="view-toggle">
            <button
              onClick={() => setViewMode('grid')}
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              aria-label="Grid view"
              title="Grid view"
            >
              <div className="grid-icon"></div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="List view"
              title="List view"
            >
              <div className="list-icon"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="content-stats">
        <div className="stat-item">
          <BookOpen className="stat-icon" />
          <div className="stat-content">
            <div className="stat-number">{filteredContent.length}</div>
            <div className="stat-label">Resources Found</div>
          </div>
        </div>
        <div className="stat-item">
          <Star className="stat-icon" />
          <div className="stat-content">
            <div className="stat-number">
              {filteredContent.filter((item) => item.featured).length}
            </div>
            <div className="stat-label">Featured Resources</div>
          </div>
        </div>
        <div className="stat-item">
          <TrendingUp className="stat-icon" />
          <div className="stat-content">
            <div className="stat-number">
              {filteredContent.filter((item) => item.popularity && item.popularity >= 90).length}
            </div>
            <div className="stat-label">Highly Rated</div>
          </div>
        </div>
      </div>

      <div className={`content-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
        {filteredContent.map((item) => (
          <div key={item.id} className="content-card">
            {item.featured && (
              <div className="featured-badge">
                <Star className="featured-icon" />
                Featured
              </div>
            )}

            <div className="card-header">
              <div className="card-icon">{item.icon}</div>
              <div className="card-meta">
                <span className={`content-type ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                  {item.type}
                </span>
                <span className="content-subject">{item.subject}</span>
              </div>
            </div>

            <div className="card-content">
              <h3 className="content-title">{item.title}</h3>
              <p className="content-year">{item.yearLevel}</p>
              <p className="content-curriculum">{item.curriculumAlignment}</p>
              <p className="content-description">{item.description}</p>

              {item.culturalContext && (
                <div className="cultural-context">
                  <Heart className="cultural-icon" />
                  <span>{item.culturalContext}</span>
                </div>
              )}

              <div className="content-metrics">
                <div className="metric">
                  <TrendingUp className="metric-icon" />
                  <span className={`popularity ${getPopularityColor(item.popularity || 0)}`}>
                    {item.popularity || 0}%
                  </span>
                </div>
                {item.lastUpdated && (
                  <div className="metric">
                    <Clock className="metric-icon" />
                    <span>{new Date(item.lastUpdated).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="card-actions">
              <button onClick={() => handleItemClick(item)} className="action-button preview">
                <Eye className="action-icon" />
                Preview
              </button>
              <button onClick={() => handleDownload(item)} className="action-button download">
                <Download className="action-icon" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="no-content">
          <BookOpen className="no-content-icon" />
          <h3>No content found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      <ContentPreviewModal
        content={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default UnifiedContentDiscovery;
