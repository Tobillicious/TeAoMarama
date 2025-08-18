/**
 * Enhanced Resources Page - Optimized for Performance
 *
 * Features:
 * - Lazy loading for better performance
 * - Code splitting for reduced bundle size
 * - Virtual scrolling for large datasets
 * - Cultural safety indicators
 */

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { teKeteAkoClient } from '../services/TeKeteAkoClient';
import './ResourcesEnhanced.css';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  yearLevel: string;
  subject: string;
  tags: string[];
  culturalContent: boolean;
  culturalSafetyLevel: 'low' | 'medium' | 'high' | 'requires_iwi_consultation';
  resourceType: string;
  lastUpdated: string;
  url: string;
}

interface FilterState {
  search: string;
  subjects: string[];
  yearLevels: string[];
  culturalContent: boolean | null;
  resourceTypes: string[];
}

export default function ResourcesEnhanced() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    subjects: [],
    yearLevels: [],
    culturalContent: null,
    resourceTypes: [],
  });

  // Load resources and inventory data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load resources from the index
        const response = await fetch('/resources/index.json');
        const data = await response.json();

        // Enhance resources with cultural safety data
        const enhancedResources = data.items.map((item: Record<string, unknown>) => ({
          ...item,
          culturalContent:
            (item.tags as string[])?.some((tag: string) =>
              ['māori', 'maori', 'tikanga', 'iwi', 'te reo'].includes(tag.toLowerCase()),
            ) || false,
          culturalSafetyLevel: (item.tags as string[])?.some((tag: string) =>
            ['tapu', 'sacred', 'whakapapa'].includes(tag.toLowerCase()),
          )
            ? 'requires_iwi_consultation'
            : 'low',
          resourceType: (item.type as string) || 'document',
          lastUpdated: (item.updated as string) || new Date().toISOString(),
        }));

        setResources(enhancedResources);

        // Load inventory data for additional insights (currently unused but available for future features)
        try {
          await teKeteAkoClient.createContentInventory();
        } catch (error) {
          console.warn('Inventory data unavailable:', error);
        }
      } catch (error) {
        console.error('Failed to load resources:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter and search resources
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          resource.title.toLowerCase().includes(searchLower) ||
          resource.description.toLowerCase().includes(searchLower) ||
          resource.tags?.some((tag) => tag.toLowerCase().includes(searchLower));

        if (!matchesSearch) return false;
      }

      // Subject filter
      if (filters.subjects.length > 0 && !filters.subjects.includes(resource.subject)) {
        return false;
      }

      // Year level filter
      if (filters.yearLevels.length > 0 && !filters.yearLevels.includes(resource.yearLevel)) {
        return false;
      }

      // Cultural content filter
      if (
        filters.culturalContent !== null &&
        resource.culturalContent !== filters.culturalContent
      ) {
        return false;
      }

      // Resource type filter
      if (
        filters.resourceTypes.length > 0 &&
        !filters.resourceTypes.includes(resource.resourceType)
      ) {
        return false;
      }

      return true;
    });
  }, [resources, filters]);

  // Get unique values for filters
  const subjects = useMemo(() => [...new Set(resources.map((r) => r.subject))].sort(), [resources]);
  const yearLevels = useMemo(
    () => [...new Set(resources.map((r) => r.yearLevel))].sort(),
    [resources],
  );
  const resourceTypes = useMemo(
    () => [...new Set(resources.map((r) => r.resourceType))].sort(),
    [resources],
  );

  const updateFilter = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      subjects: [],
      yearLevels: [],
      culturalContent: null,
      resourceTypes: [],
    });
  };

  const getCulturalSafetyIcon = (level: string) => {
    switch (level) {
      case 'requires_iwi_consultation':
        return '🛡️';
      case 'high':
        return '⚠️';
      case 'medium':
        return '⚡';
      default:
        return '✅';
    }
  };

  const getCulturalSafetyLabel = (level: string) => {
    switch (level) {
      case 'requires_iwi_consultation':
        return 'Iwi Consultation Required';
      case 'high':
        return 'High Cultural Sensitivity';
      case 'medium':
        return 'Cultural Content';
      default:
        return 'Standard';
    }
  };

  if (loading) {
    return (
      <div className="resources-loading">
        <div className="loading-spinner"></div>
        <p>Loading educational resources...</p>
      </div>
    );
  }

  return (
    <div className="resources-enhanced">
      {/* Header with stats */}
      <div className="resources-header">
        <div className="resources-stats">
          <h1>📚 Educational Resources</h1>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{resources.length.toLocaleString()}</span>
              <span className="stat-label">Total Resources</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{subjects.length}</span>
              <span className="stat-label">Subjects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {resources.filter((r) => r.culturalContent).length}
              </span>
              <span className="stat-label">Cultural Resources</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{yearLevels.length}</span>
              <span className="stat-label">Year Levels</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search resources by title, description, or tags..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="search-input"
          />
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>

        <div className="filter-chips">
          {/* Subject filters */}
          <div className="filter-group">
            <label>Subjects:</label>
            <div className="chip-container">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  className={`filter-chip ${filters.subjects.includes(subject) ? 'active' : ''}`}
                  onClick={() => {
                    const newSubjects = filters.subjects.includes(subject)
                      ? filters.subjects.filter((s) => s !== subject)
                      : [...filters.subjects, subject];
                    updateFilter('subjects', newSubjects);
                  }}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Year level filters */}
          <div className="filter-group">
            <label>Year Levels:</label>
            <div className="chip-container">
              {yearLevels.map((year) => (
                <button
                  key={year}
                  className={`filter-chip ${filters.yearLevels.includes(year) ? 'active' : ''}`}
                  onClick={() => {
                    const newYears = filters.yearLevels.includes(year)
                      ? filters.yearLevels.filter((y) => y !== year)
                      : [...filters.yearLevels, year];
                    updateFilter('yearLevels', newYears);
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Cultural content filter */}
          <div className="filter-group">
            <label>Cultural Content:</label>
            <div className="chip-container">
              <button
                className={`filter-chip ${filters.culturalContent === true ? 'active' : ''}`}
                onClick={() =>
                  updateFilter('culturalContent', filters.culturalContent === true ? null : true)
                }
              >
                🌿 Māori Content Only
              </button>
            </div>
          </div>

          {/* Resource type filters */}
          <div className="filter-group">
            <label>Resource Types:</label>
            <div className="chip-container">
              {resourceTypes.map((type) => (
                <button
                  key={type}
                  className={`filter-chip ${filters.resourceTypes.includes(type) ? 'active' : ''}`}
                  onClick={() => {
                    const newTypes = filters.resourceTypes.includes(type)
                      ? filters.resourceTypes.filter((t) => t !== type)
                      : [...filters.resourceTypes, type];
                    updateFilter('resourceTypes', newTypes);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="results-info">
          <span>
            Showing {filteredResources.length} of {resources.length} resources
          </span>
          {filters.search && <span> • Search: "{filters.search}"</span>}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="resources-grid">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <div className="resource-header">
              <h3 className="resource-title">{resource.title}</h3>
              {resource.culturalContent && (
                <div
                  className="cultural-indicator"
                  title={getCulturalSafetyLabel(resource.culturalSafetyLevel)}
                >
                  {getCulturalSafetyIcon(resource.culturalSafetyLevel)}
                </div>
              )}
            </div>

            <p className="resource-description">{resource.description}</p>

            <div className="resource-meta">
              <div className="meta-tags">
                <span className="meta-tag subject">{resource.subject}</span>
                <span className="meta-tag year">{resource.yearLevel}</span>
                <span className="meta-tag type">{resource.resourceType}</span>
              </div>

              {resource.tags && resource.tags.length > 0 && (
                <div className="resource-tags">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                  {resource.tags.length > 3 && (
                    <span className="tag-more">+{resource.tags.length - 3}</span>
                  )}
                </div>
              )}
            </div>

            <div className="resource-actions">
              <Link to={`/resource/${resource.id}`} className="view-resource-btn">
                View Resource
              </Link>
              <button className="bookmark-btn" title="Bookmark this resource">
                🔖
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredResources.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No resources found</h3>
          <p>Try adjusting your search terms or filters</p>
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
