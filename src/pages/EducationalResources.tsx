import React, { useEffect, useState } from 'react';
import './EducationalResources.css';

interface EducationalResource {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'activity' | 'assessment' | 'multimedia' | 'handout' | 'toolkit';
  subject: string;
  year: number;
  duration: number;
  culturalElements: string[];
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'published' | 'draft' | 'archived';
  views: number;
  rating: number;
  lastUpdated: Date;
  author: string;
}

const EducationalResources: React.FC = () => {
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<EducationalResource[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'rating' | 'views'>('date');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading educational resources
    const mockResources: EducationalResource[] = [
      {
        id: '1',
        title: 'Te Reo Māori: Basic Greetings and Introductions',
        description:
          'Learn fundamental Māori greetings, introductions, and basic conversation skills with cultural context.',
        type: 'lesson',
        subject: 'Te Reo Māori',
        year: 7,
        duration: 45,
        culturalElements: ['Kōrero', 'Tikanga', 'Whakapapa'],
        tags: ['language', 'greetings', 'culture', 'basic'],
        difficulty: 'Beginner',
        status: 'published',
        views: 1250,
        rating: 4.8,
        lastUpdated: new Date(Date.now() - 86400000 * 2),
        author: 'Whaea Hine',
      },
      {
        id: '2',
        title: 'Traditional Māori Weaving Workshop',
        description:
          'Hands-on workshop teaching the art of harakeke weaving, creating traditional baskets and decorative items.',
        type: 'activity',
        subject: 'Arts',
        year: 8,
        duration: 120,
        culturalElements: ['Raranga', 'Harakeke', 'Tikanga'],
        tags: ['weaving', 'arts', 'traditional', 'hands-on'],
        difficulty: 'Intermediate',
        status: 'published',
        views: 890,
        rating: 4.9,
        lastUpdated: new Date(Date.now() - 86400000 * 5),
        author: 'Kuia Mārama',
      },
      {
        id: '3',
        title: 'Māori Astronomy: Matariki and Navigation',
        description:
          'Explore traditional Māori knowledge of the stars, navigation, and seasonal cycles through Matariki.',
        type: 'lesson',
        subject: 'Science',
        year: 9,
        duration: 60,
        culturalElements: ['Matariki', 'Navigation', 'Astronomy'],
        tags: ['astronomy', 'navigation', 'seasons', 'stars'],
        difficulty: 'Advanced',
        status: 'published',
        views: 1100,
        rating: 4.7,
        lastUpdated: new Date(Date.now() - 86400000 * 1),
        author: 'Dr. Tāne',
      },
      {
        id: '4',
        title: 'Kaitiakitanga: Environmental Guardianship Assessment',
        description:
          'Assessment exploring traditional Māori environmental practices and modern conservation principles.',
        type: 'assessment',
        subject: 'Social Studies',
        year: 10,
        duration: 90,
        culturalElements: ['Kaitiakitanga', 'Conservation', 'Sustainability'],
        tags: ['environment', 'conservation', 'sustainability', 'assessment'],
        difficulty: 'Intermediate',
        status: 'published',
        views: 750,
        rating: 4.6,
        lastUpdated: new Date(Date.now() - 86400000 * 3),
        author: 'Koro Wiremu',
      },
      {
        id: '5',
        title: 'Traditional Māori Medicine: Rongoā Practices',
        description:
          'Multimedia presentation on traditional Māori healing practices and native plant knowledge.',
        type: 'multimedia',
        subject: 'Science',
        year: 9,
        duration: 75,
        culturalElements: ['Rongoā', 'Botany', 'Healing'],
        tags: ['medicine', 'healing', 'plants', 'traditional'],
        difficulty: 'Intermediate',
        status: 'published',
        views: 980,
        rating: 4.8,
        lastUpdated: new Date(Date.now() - 86400000 * 4),
        author: 'Tohunga Rongoā',
      },
      {
        id: '6',
        title: 'Māori History: The Great Migration',
        description:
          'Comprehensive handout covering the historical journey of Māori ancestors to Aotearoa.',
        type: 'handout',
        subject: 'History',
        year: 8,
        duration: 30,
        culturalElements: ['Whakapapa', 'History', 'Migration'],
        tags: ['history', 'migration', 'ancestors', 'journey'],
        difficulty: 'Beginner',
        status: 'published',
        views: 1350,
        rating: 4.5,
        lastUpdated: new Date(Date.now() - 86400000 * 7),
        author: 'Dr. Aroha',
      },
      {
        id: '7',
        title: 'Cultural Competency Toolkit for Teachers',
        description:
          'Comprehensive toolkit for educators to integrate Māori cultural elements into their teaching.',
        type: 'toolkit',
        subject: 'Professional Development',
        year: 0,
        duration: 180,
        culturalElements: ['Tikanga', 'Cultural Competency', 'Education'],
        tags: ['professional development', 'cultural competency', 'teaching'],
        difficulty: 'Advanced',
        status: 'published',
        views: 650,
        rating: 4.9,
        lastUpdated: new Date(Date.now() - 86400000 * 10),
        author: 'Cultural Education Team',
      },
      {
        id: '8',
        title: 'Mathematical Patterns in Māori Art',
        description:
          'Interactive lesson exploring geometric patterns and mathematical concepts in traditional Māori art.',
        type: 'lesson',
        subject: 'Mathematics',
        year: 7,
        duration: 50,
        culturalElements: ['Kowhaiwhai', 'Geometry', 'Symmetry'],
        tags: ['mathematics', 'art', 'patterns', 'geometry'],
        difficulty: 'Intermediate',
        status: 'published',
        views: 720,
        rating: 4.4,
        lastUpdated: new Date(Date.now() - 86400000 * 6),
        author: 'Kaiako Mātauranga',
      },
    ];

    // Ensure data is properly set
    setResources(mockResources);
    setFilteredResources(mockResources);
    console.log('📚 Loaded', mockResources.length, 'educational resources');
  }, []);

  useEffect(() => {
    const filtered = resources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
      const matchesYear = selectedYear === 'all' || resource.year === selectedYear;
      const matchesDifficulty =
        selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
      return matchesSearch && matchesType && matchesSubject && matchesYear && matchesDifficulty;
    });

    // Sort resources
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
          return b.lastUpdated.getTime() - a.lastUpdated.getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

    setFilteredResources(sorted);
  }, [
    resources,
    selectedType,
    selectedSubject,
    selectedYear,
    selectedDifficulty,
    searchTerm,
    sortBy,
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return '📚';
      case 'activity':
        return '🎯';
      case 'assessment':
        return '📝';
      case 'multimedia':
        return '🎬';
      case 'handout':
        return '📄';
      case 'toolkit':
        return '🛠️';
      default:
        return '📖';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson':
        return '#667eea';
      case 'activity':
        return '#f093fb';
      case 'assessment':
        return '#4facfe';
      case 'multimedia':
        return '#43e97b';
      case 'handout':
        return '#f5576c';
      case 'toolkit':
        return '#ffa726';
      default:
        return '#667eea';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#10b981';
      case 'Intermediate':
        return '#f59e0b';
      case 'Advanced':
        return '#ef4444';
      default:
        return '#10b981';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getResourceStats = () => {
    const totalResources = resources.length;
    const publishedResources = resources.filter((r) => r.status === 'published').length;
    const totalViews = resources.reduce((sum, r) => sum + r.views, 0);
    const averageRating = resources.reduce((sum, r) => sum + r.rating, 0) / resources.length;

    return {
      totalResources,
      publishedResources,
      totalViews,
      averageRating: averageRating.toFixed(1),
    };
  };

  const stats = getResourceStats();

  return (
    <div className="educational-resources">
      <div className="resources-header">
        <h1>📚 Educational Resources</h1>
        <p>Comprehensive collection of Māori cultural educational content and learning materials</p>

        <div className="resources-stats">
          <div className="stat-item">
            <span className="stat-number">{stats.totalResources}</span>
            <span className="stat-label">Total Resources</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.publishedResources}</span>
            <span className="stat-label">Published</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.totalViews.toLocaleString()}</span>
            <span className="stat-label">Total Views</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.averageRating}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
        </div>
      </div>

      <div className="resources-filters">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
            aria-label="Filter by resource type"
          >
            <option value="all">All Types</option>
            <option value="lesson">📚 Lessons</option>
            <option value="activity">🎯 Activities</option>
            <option value="assessment">📝 Assessments</option>
            <option value="multimedia">🎬 Multimedia</option>
            <option value="handout">📄 Handouts</option>
            <option value="toolkit">🛠️ Toolkits</option>
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="filter-select"
            aria-label="Filter by subject"
          >
            <option value="all">All Subjects</option>
            <option value="Te Reo Māori">Te Reo Māori</option>
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
            <option value="Social Studies">Social Studies</option>
            <option value="Mathematics">Mathematics</option>
            <option value="History">History</option>
            <option value="Professional Development">Professional Development</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="filter-select"
            aria-label="Filter by year level"
          >
            <option value="all">All Years</option>
            <option value={7}>Year 7</option>
            <option value={8}>Year 8</option>
            <option value={9}>Year 9</option>
            <option value={10}>Year 10</option>
            <option value={0}>Professional Development</option>
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
            aria-label="Filter by difficulty level"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'title' | 'date' | 'rating' | 'views')}
            className="filter-select"
            aria-label="Sort by"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
            <option value="views">Sort by Views</option>
          </select>
        </div>
      </div>

      <div className="resources-grid">
        {isLoading ? (
          <div className="loading-state">
            <p>Loading educational resources...</p>
            <div className="spinner"></div>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="no-resources">
            <h3>No resources found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <div key={resource.id} className="resource-card">
              <div className="resource-header">
                <div
                  className="resource-type"
                  style={{ backgroundColor: getTypeColor(resource.type) }}
                >
                  {getTypeIcon(resource.type)} {resource.type}
                </div>
                <div
                  className="resource-status"
                  style={{
                    backgroundColor:
                      resource.status === 'published'
                        ? '#10b981'
                        : resource.status === 'draft'
                        ? '#f59e0b'
                        : '#6b7280',
                  }}
                >
                  {resource.status}
                </div>
              </div>

              <div className="resource-content">
                <h3>{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>

                <div className="resource-meta">
                  <div className="meta-item">
                    <span className="meta-label">Subject:</span>
                    <span className="meta-value">{resource.subject}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Year:</span>
                    <span className="meta-value">
                      {resource.year === 0 ? 'PD' : `Year ${resource.year}`}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Duration:</span>
                    <span className="meta-value">{resource.duration} min</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Difficulty:</span>
                    <span
                      className="meta-value difficulty"
                      style={{ color: getDifficultyColor(resource.difficulty) }}
                    >
                      {resource.difficulty}
                    </span>
                  </div>
                </div>

                <div className="resource-cultural-elements">
                  <h4>Cultural Elements:</h4>
                  <div className="cultural-tags">
                    {resource.culturalElements.map((element) => (
                      <span key={element} className="cultural-tag">
                        {element}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="resource-tags">
                  <div className="tags-list">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="resource-stats">
                  <div className="stat">
                    <span className="stat-label">Views</span>
                    <span className="stat-value">{resource.views.toLocaleString()}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Rating</span>
                    <span className="stat-value">{resource.rating}/5</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Updated</span>
                    <span className="stat-value">{formatDate(resource.lastUpdated)}</span>
                  </div>
                </div>

                <div className="resource-author">
                  <span className="author-label">By:</span>
                  <span className="author-name">{resource.author}</span>
                </div>
              </div>

              <div className="resource-actions">
                <button className="view-btn">View Resource</button>
                <button className="download-btn">Download</button>
                <button className="share-btn">Share</button>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredResources.length === 0 && !isLoading && (
        <div className="no-resources">
          <h3>No resources found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      )}

      <div className="resources-summary">
        <h3>📊 Resources Summary</h3>
        <div className="summary-stats">
          <div className="summary-item">
            <span className="summary-label">Showing:</span>
            <span className="summary-value">
              {filteredResources.length} of {resources.length} resources
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Most Popular:</span>
            <span className="summary-value">
              {resources.length > 0
                ? resources.reduce((max, r) => (r.views > max.views ? r : max)).title
                : 'N/A'}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Highest Rated:</span>
            <span className="summary-value">
              {resources.length > 0
                ? resources.reduce((max, r) => (r.rating > max.rating ? r : max)).title
                : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalResources;
