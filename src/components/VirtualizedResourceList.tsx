import React, { useCallback, useMemo, useState } from 'react';
import './VirtualizedResourceList.css';

interface ResourceItem {
  id: string;
  title: string;
  category: string;
  relativePath: string;
  sizeBytes: number;
  modifiedAt: string;
}

interface VirtualizedResourceListProps {
  resources: ResourceItem[];
  onResourceSelect: (resource: ResourceItem) => void;
}

const ITEM_HEIGHT = 80;
const CONTAINER_HEIGHT = 600;
const VISIBLE_ITEMS = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);
const BUFFER_SIZE = 5;

export default function VirtualizedResourceList({
  resources,
  onResourceSelect,
}: VirtualizedResourceListProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter resources based on search and category
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [resources, searchTerm, selectedCategory]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(resources.map((r) => r.category))];
    return cats;
  }, [resources]);

  // Calculate visible items based on scroll position
  const visibleItems = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_SIZE);
    const endIndex = Math.min(
      filteredResources.length,
      startIndex + VISIBLE_ITEMS + BUFFER_SIZE * 2,
    );

    return {
      startIndex,
      endIndex,
      items: filteredResources.slice(startIndex, endIndex),
    };
  }, [filteredResources, scrollTop]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NZ');
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'deepseek-generated': '🤖',
      handouts: '📄',
      games: '🎮',
      'te-kete-ako-clean': '🌿',
      toolkits: '🛠️',
    };
    return icons[category] || '📚';
  };

  return (
    <div className="virtualized-resource-container">
      {/* Search and Filter Controls */}
      <div className="resource-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'All' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="results-count">{filteredResources.length.toLocaleString()} resources</div>
      </div>

      {/* Virtualized List */}
      <div className="virtual-list-container virtual-list-container-height" onScroll={handleScroll}>
        <div
          className="virtual-list-spacer"
          style={{ height: filteredResources.length * ITEM_HEIGHT }}
        >
          <div
            className="virtual-list-content"
            style={{
              transform: `translateY(${visibleItems.startIndex * ITEM_HEIGHT}px)`,
              height: visibleItems.items.length * ITEM_HEIGHT,
            }}
          >
            {visibleItems.items.map((resource) => (
              <div
                key={resource.id}
                className="resource-item resource-item-height"
                onClick={() => onResourceSelect(resource)}
              >
                <div className="resource-icon">{getCategoryIcon(resource.category)}</div>

                <div className="resource-content">
                  <h3 className="resource-title">{resource.title}</h3>
                  <div className="resource-meta">
                    <span className="resource-category">{resource.category}</span>
                    <span className="resource-size">{formatFileSize(resource.sizeBytes)}</span>
                    <span className="resource-date">{formatDate(resource.modifiedAt)}</span>
                  </div>
                </div>

                <div className="resource-actions">
                  <button
                    type="button"
                    className="view-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onResourceSelect(resource);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Info */}
      <div className="performance-info">
        <small>
          Showing {visibleItems.items.length} of {filteredResources.length} resources (Virtualized
          for performance)
        </small>
      </div>
    </div>
  );
}
