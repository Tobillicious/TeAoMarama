import type { Award, BookOpen, Clock, Compass, FileText, Heart, Map, Play, Search, Sparkles, Target, TrendingUp } from 'lucide-react';
import {  } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loadEnrichedResources } from '../utils/enriched-resource-loader';
import './TreasureNavigation.css';

interface TreasureCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  resources: unknown[];
}

interface TreasureNavigationProps {
  onResourceSelect?: (resource: unknown) => void;
  showQuickAccess?: boolean;
  showTrending?: boolean;
  showCultural?: boolean;
}

const TreasureNavigation: React.FC<TreasureNavigationProps> = ({
  onResourceSelect,
  showQuickAccess = true,
  showTrending = true,
  showCultural = true,
}) => {
  const [resources, setResources] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [trendingResources, setTrendingResources] = useState<any[]>([]);
  const [culturalResources, setCulturalResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadResources = async () => {
      try {
        const enrichedResources = loadEnrichedResources();
        setResources(enrichedResources);

        // Find trending resources (high cultural elements, recent enrichment)
        const trending = enrichedResources
          .filter((r) => r.culturalElements >= 4)
          .sort((a, b) => (b.culturalElements || 0) - (a.culturalElements || 0))
          .slice(0, 6);
        setTrendingResources(trending);

        // Find cultural resources
        const cultural = enrichedResources
          .filter((r) => r.culturalElements >= 3)
          .sort((a, b) => (b.culturalElements || 0) - (a.culturalElements || 0));
        setCulturalResources(cultural);
      } catch (error) {
        console.error('Error loading resources:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  // Create treasure categories
  const treasureCategories: TreasureCategory[] = [
    {
      id: 'all',
      title: 'All Treasures',
      description: 'Complete collection of enriched educational resources',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      count: resources.length,
      resources: resources,
    },
    {
      id: 'lessons',
      title: 'Rich Lessons',
      description: 'Comprehensive lesson plans with cultural integration',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      count: resources.filter((r) => r.type === 'lesson').length,
      resources: resources.filter((r) => r.type === 'lesson'),
    },
    {
      id: 'activities',
      title: 'Interactive Activities',
      description: 'Engaging hands-on learning experiences',
      icon: <Play className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      count: resources.filter((r) => r.type === 'activity').length,
      resources: resources.filter((r) => r.type === 'activity'),
    },
    {
      id: 'assessments',
      title: 'Smart Assessments',
      description: 'Culturally-responsive assessment tools',
      icon: <Target className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      count: resources.filter((r) => r.type === 'assessment').length,
      resources: resources.filter((r) => r.type === 'assessment'),
    },
    {
      id: 'cultural',
      title: 'Cultural Treasures',
      description: 'Resources rich in Māori and Pacific perspectives',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      count: culturalResources.length,
      resources: culturalResources,
    },
  ];

  // Filter resources based on search and category
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchTerm === '' ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'cultural'
        ? resource.culturalElements >= 3
        : resource.type === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const handleResourceClick = (resource: unknown) => {
    if (onResourceSelect) {
      onResourceSelect(resource);
    } else {
      navigate('/resources');
    }
  };

  if (loading) {
    return (
      <div className="treasure-navigation-loading">
        <div className="loading-spinner">
          <Compass className="w-8 h-8 animate-spin" />
        </div>
        <p>Discovering treasures...</p>
      </div>
    );
  }

  return (
    <div className="treasure-navigation">
      {/* Header */}
      <div className="treasure-header">
        <div className="treasure-title">
          <Map className="w-8 h-8" />
          <h2>Treasure Map</h2>
        </div>
        <p className="treasure-subtitle">
          Discover {resources.length} enriched educational resources
        </p>
      </div>

      {/* Search and Filter */}
      <div className="treasure-search">
        <div className="search-input-container">
          <Search className="w-5 h-5 search-icon" />
          <input
            type="text"
            placeholder="Search treasures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          {treasureCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
            >
              {category.icon}
              <span>{category.title}</span>
              <span className="count">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      {showQuickAccess && (
        <div className="quick-access">
          <h3>Quick Access</h3>
          <div className="quick-access-grid">
            <Link to="/resources" className="quick-access-item">
              <BookOpen className="w-6 h-6" />
              <span>All Resources</span>
            </Link>
            <Link to="/cultural-learning-modules" className="quick-access-item">
              <Heart className="w-6 h-6" />
              <span>Cultural Learning</span>
            </Link>
            <Link to="/assessment-framework" className="quick-access-item">
              <Target className="w-6 h-6" />
              <span>Assessments</span>
            </Link>
            <Link to="/enhanced-content-discovery" className="quick-access-item">
              <Compass className="w-6 h-6" />
              <span>Content Discovery</span>
            </Link>
          </div>
        </div>
      )}

      {/* Trending Treasures */}
      {showTrending && trendingResources.length > 0 && (
        <div className="trending-treasures">
          <div className="section-header">
            <TrendingUp className="w-6 h-6" />
            <h3>Trending Treasures</h3>
          </div>
          <div className="trending-grid">
            {trendingResources.map((resource) => (
              <div
                key={resource.id}
                className="trending-item"
                onClick={() => handleResourceClick(resource)}
              >
                <div className="trending-icon">
                  {resource.type === 'lesson' && <BookOpen className="w-5 h-5" />}
                  {resource.type === 'activity' && <Play className="w-5 h-5" />}
                  {resource.type === 'assessment' && <Target className="w-5 h-5" />}
                  {resource.type === 'handout' && <FileText className="w-5 h-5" />}
                </div>
                <div className="trending-content">
                  <h4>{resource.title}</h4>
                  <p>
                    {resource.subject} • {resource.yearLevel}
                  </p>
                  <div className="trending-stats">
                    <span className="cultural-elements">
                      <Heart className="w-4 h-4" />
                      {resource.culturalElements}
                    </span>
                    <span className="duration">
                      <Clock className="w-4 h-4" />
                      {resource.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cultural Treasures */}
      {showCultural && culturalResources.length > 0 && (
        <div className="cultural-treasures">
          <div className="section-header">
            <Heart className="w-6 h-6" />
            <h3>Cultural Treasures</h3>
            <span className="section-count">{culturalResources.length} resources</span>
          </div>
          <div className="cultural-grid">
            {culturalResources.slice(0, 8).map((resource) => (
              <div
                key={resource.id}
                className="cultural-item"
                onClick={() => handleResourceClick(resource)}
              >
                <div className="cultural-badge">
                  <Award className="w-4 h-4" />
                  {resource.culturalElements} cultural elements
                </div>
                <h4>{resource.title}</h4>
                <p>{resource.description}</p>
                <div className="cultural-tags">
                  {resource.tags.slice(0, 3).map((tag: string, index: number) => (
                    <span key={index} className="cultural-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resource Grid */}
      <div className="treasure-grid">
        <div className="grid-header">
          <h3>
            {selectedCategory === 'all'
              ? 'All Treasures'
              : treasureCategories.find((c) => c.id === selectedCategory)?.title}
          </h3>
          <span className="grid-count">{filteredResources.length} resources</span>
        </div>
        <div className="resource-grid">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="treasure-card"
              onClick={() => handleResourceClick(resource)}
            >
              <div className="card-header">
                <div className="card-type">
                  {resource.type === 'lesson' && <BookOpen className="w-4 h-4" />}
                  {resource.type === 'activity' && <Play className="w-4 h-4" />}
                  {resource.type === 'assessment' && <Target className="w-4 h-4" />}
                  {resource.type === 'handout' && <FileText className="w-4 h-4" />}
                  <span>{resource.type}</span>
                </div>
                <div className="card-difficulty">
                  <span className={`difficulty-badge ${resource.difficulty}`}>
                    {resource.difficulty}
                  </span>
                </div>
              </div>

              <div className="card-content">
                <h4>{resource.title}</h4>
                <p>{resource.description}</p>
                <div className="card-meta">
                  <span>{resource.subject}</span>
                  <span>•</span>
                  <span>{resource.yearLevel}</span>
                </div>
              </div>

              <div className="card-footer">
                <div className="card-stats">
                  <span className="cultural-count">
                    <Heart className="w-4 h-4" />
                    {resource.culturalElements}
                  </span>
                  <span className="duration">
                    <Clock className="w-4 h-4" />
                    {resource.duration}
                  </span>
                </div>
                <div className="card-tags">
                  {resource.tags.slice(0, 2).map((tag: string, index: number) => (
                    <span key={index} className="card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="empty-state">
          <Compass className="w-12 h-12" />
          <h3>No treasures found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default TreasureNavigation;
