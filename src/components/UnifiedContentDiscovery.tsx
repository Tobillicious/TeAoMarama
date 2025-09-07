import {
  Award,
  BookOpen,
  Calculator,
  Clock,
  Download,
  Eye,
  FileText,
  Globe,
  Heart,
  Search,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './UnifiedContentDiscovery.css';

interface ContentItem {
  id: string;
  title: string;
  type: 'resource' | 'template' | 'lesson' | 'worksheet' | 'unit' | 'guide';
  subject: string;
  yearLevel: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  category: string;
  culturalContext?: string;
  curriculumAlignment?: string;
  popularity?: number;
  lastUpdated?: string;
  featured?: boolean;
}

const UnifiedContentDiscovery: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popularity' | 'recent' | 'alphabetical'>('popularity');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Unified content from all our systems
    const unifiedContent: ContentItem[] = [
      // TeKeteAko Resources
      {
        id: 'fractions-decimals-percentages',
        title: 'Fractions, Decimals, and Percentages',
        type: 'worksheet',
        subject: 'Mathematics',
        yearLevel: 'Years 7-10',
        description:
          'Comprehensive worksheet covering conversions between fractions, decimals, and percentages with practice problems and answer key.',
        path: '/resources/te-kete-ako-clean/math_worksheets/fractions_decimals_percentages.md',
        icon: <Calculator className="w-6 h-6" />,
        category: 'Mathematics',
        culturalContext: 'Inclusive mathematical language and cultural mathematical practices',
        curriculumAlignment: 'NZ Curriculum Level 4-5',
        popularity: 95,
        lastUpdated: '2025-01-15',
        featured: true,
      },
      {
        id: 'area-perimeter',
        title: 'Area and Perimeter',
        type: 'worksheet',
        subject: 'Mathematics',
        yearLevel: 'Years 7-9',
        description:
          'Interactive worksheet exploring area and perimeter calculations with real-world applications.',
        path: '/resources/te-kete-ako-clean/math_worksheets/area_and_perimeter.md',
        icon: <Calculator className="w-6 h-6" />,
        category: 'Mathematics',
        culturalContext: 'Real-world applications from Aotearoa context',
        curriculumAlignment: 'NZ Curriculum Level 4',
        popularity: 88,
        lastUpdated: '2025-01-10',
      },
      {
        id: 'decolonized-history',
        title: 'Decolonized Aotearoa History',
        type: 'unit',
        subject: 'Social Studies',
        yearLevel: 'Years 9-13',
        description:
          'Comprehensive unit centering Māori perspectives, agency, and resistance in Aotearoa history. Challenges colonial narratives.',
        path: '/resources/te-kete-ako-clean/dist/units/urds/URD-Unit2-Decolonized-History.md',
        icon: <Globe className="w-6 h-6" />,
        category: 'Social Studies',
        culturalContext: 'Te Ao Māori perspectives, Tino Rangatiratanga',
        curriculumAlignment: 'NZ Curriculum Level 5-8',
        popularity: 98,
        lastUpdated: '2025-01-20',
        featured: true,
      },
      {
        id: 'contemporary-issues',
        title: 'Contemporary Issues',
        type: 'unit',
        subject: 'Social Studies',
        yearLevel: 'Years 10-13',
        description:
          'Exploring current social, political, and cultural issues in Aotearoa with critical analysis frameworks.',
        path: '/resources/te-kete-ako-clean/dist/units/urds/URD-Unit4-Contemporary-Issues.md',
        icon: <Globe className="w-6 h-6" />,
        category: 'Social Studies',
        culturalContext: 'Contemporary Māori perspectives',
        curriculumAlignment: 'NZ Curriculum Level 6-8',
        popularity: 92,
        lastUpdated: '2025-01-18',
      },

      // Professional Lesson Templates
      {
        id: 'decolonized-history-lesson',
        title: 'Decolonized Aotearoa History Lesson',
        type: 'template',
        subject: 'Social Studies',
        yearLevel: 'Years 9-13',
        description:
          'Complete 60-minute lesson template with cultural opening, learning phases, and assessment criteria.',
        path: '/professional-lesson-templates',
        icon: <FileText className="w-6 h-6" />,
        category: 'Teaching Resources',
        culturalContext: 'Whakataukī integration, cultural safety protocols',
        curriculumAlignment: 'NZ Curriculum Level 5-8',
        popularity: 96,
        lastUpdated: '2025-01-22',
        featured: true,
      },
      {
        id: 'fractions-math-lesson',
        title: 'Fractions, Decimals, and Percentages Lesson',
        type: 'template',
        subject: 'Mathematics',
        yearLevel: 'Years 7-10',
        description:
          '45-minute lesson template with real-world applications and cultural integration.',
        path: '/professional-lesson-templates',
        icon: <FileText className="w-6 h-6" />,
        category: 'Teaching Resources',
        culturalContext: 'Mathematics serving people and communities',
        curriculumAlignment: 'NZ Curriculum Level 4-5',
        popularity: 89,
        lastUpdated: '2025-01-21',
      },

      // Additional Resources
      {
        id: 'lesson-template-guide',
        title: 'Professional Lesson Template Guide',
        type: 'guide',
        subject: 'Teaching Resources',
        yearLevel: 'All Levels',
        description:
          'Comprehensive guide for creating culturally authentic, pedagogically sound lessons with Te Ao Māori integration.',
        path: '/resources/te-kete-ako-clean/dist/guided-inquiry-unit/LESSON_TEMPLATE_GUIDE.md',
        icon: <BookOpen className="w-6 h-6" />,
        category: 'Teaching Resources',
        culturalContext: 'Te Ao Māori integration protocols',
        curriculumAlignment: 'NZ Curriculum Framework',
        popularity: 94,
        lastUpdated: '2025-01-12',
      },
      {
        id: 'design-enhancement-report',
        title: 'Design Enhancement Report',
        type: 'guide',
        subject: 'Design System',
        yearLevel: 'All Levels',
        description:
          'Professional design system documentation with color palette, typography, and cultural integration guidelines.',
        path: '/resources/te-kete-ako-clean/dist/DESIGN_ENHANCEMENT_REPORT.md',
        icon: <Award className="w-6 h-6" />,
        category: 'Design System',
        culturalContext: 'Pounamu green, Kahurangi blue color palette',
        curriculumAlignment: 'Professional Standards',
        popularity: 87,
        lastUpdated: '2025-01-08',
      },
    ];

    setContentItems(unifiedContent);
    setFilteredContent(unifiedContent);
  }, []);

  useEffect(() => {
    let filtered = contentItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter((item) => item.subject === selectedSubject);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.culturalContext &&
            item.culturalContext.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    // Sort content
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.popularity || 0) - (a.popularity || 0);
        case 'recent':
          return new Date(b.lastUpdated || '').getTime() - new Date(a.lastUpdated || '').getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredContent(filtered);
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'worksheet':
        return <Calculator className="w-4 h-4" />;
      case 'unit':
        return <BookOpen className="w-4 h-4" />;
      case 'template':
        return <FileText className="w-4 h-4" />;
      case 'guide':
        return <Award className="w-4 h-4" />;
      case 'lesson':
        return <Users className="w-4 h-4" />;
      case 'resource':
        return <Globe className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
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

      {selectedItem && (
        <div className="content-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="content-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <h2>{selectedItem.title}</h2>
                <div className="modal-meta">
                  <span className={`modal-type ${getTypeColor(selectedItem.type)}`}>
                    {getTypeIcon(selectedItem.type)}
                    {selectedItem.type}
                  </span>
                  <span className="modal-subject">{selectedItem.subject}</span>
                  <span className="modal-year">{selectedItem.yearLevel}</span>
                </div>
              </div>
              <button onClick={() => setSelectedItem(null)} className="modal-close">
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-description">
                <p>{selectedItem.description}</p>
              </div>

              {selectedItem.culturalContext && (
                <div className="modal-cultural">
                  <h4>🌿 Cultural Context</h4>
                  <p>{selectedItem.culturalContext}</p>
                </div>
              )}

              {selectedItem.curriculumAlignment && (
                <div className="modal-curriculum">
                  <h4>📚 Curriculum Alignment</h4>
                  <p>{selectedItem.curriculumAlignment}</p>
                </div>
              )}

              <div className="modal-metrics">
                <div className="metric-card">
                  <TrendingUp className="metric-card-icon" />
                  <div className="metric-card-content">
                    <div className="metric-card-value">{selectedItem.popularity || 0}%</div>
                    <div className="metric-card-label">Popularity</div>
                  </div>
                </div>
                {selectedItem.lastUpdated && (
                  <div className="metric-card">
                    <Clock className="metric-card-icon" />
                    <div className="metric-card-content">
                      <div className="metric-card-value">
                        {new Date(selectedItem.lastUpdated).toLocaleDateString()}
                      </div>
                      <div className="metric-card-label">Last Updated</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={() => handleDownload(selectedItem)} className="modal-download">
                <Download className="action-icon" />
                Download Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedContentDiscovery;
