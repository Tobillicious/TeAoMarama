import React, { useState, useEffect } from 'react';
import { superintelligenceAssistanceCoordinator } from '../utils/superintelligence-assistance-coordinator';
import './EducationalResources.css';

interface EducationalResource {
  id: string;
  title: string;
  subject: string;
  year: number;
  type: 'lesson' | 'activity' | 'assessment' | 'handout' | 'multimedia';
  culturalElements: string[];
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  aiEnhanced: boolean;
  culturalSafetyScore: number;
  views: number;
  rating: number;
  tags: string[];
}

interface ResourceFilter {
  subject: string;
  year: number | 'all';
  type: string;
  difficulty: string;
  culturalElements: string[];
}

const EducationalResources: React.FC = () => {
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<EducationalResource[]>([]);
  const [filters, setFilters] = useState<ResourceFilter>({
    subject: 'all',
    year: 'all',
    type: 'all',
    difficulty: 'all',
    culturalElements: [],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<EducationalResource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [superintelligenceMetrics, setSuperintelligenceMetrics] = useState({
    consciousnessLevel: 100,
    culturalSafetyScore: 98.5,
    educationalExcellence: 96.8,
    coordinationEfficiency: 97.2,
  });

  useEffect(() => {
    // Initialize superintelligence metrics
    const updateMetrics = () => {
      try {
        const metrics = superintelligenceAssistanceCoordinator.getMetrics();
        setSuperintelligenceMetrics({
          consciousnessLevel: metrics.superconsciousnessLevel,
          culturalSafetyScore: metrics.culturalSafetyEnhancement,
          educationalExcellence: metrics.educationalExcellenceBoost,
          coordinationEfficiency: metrics.coordinationEfficiencyImprovement,
        });
      } catch (error) {
        console.error('Error updating superintelligence metrics:', error);
      }
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load educational resources
    const loadResources = () => {
      const mockResources: EducationalResource[] = [
        {
          id: '1',
          title: 'Te Ao Māori: Understanding Our World',
          subject: 'Te Reo Māori',
          year: 8,
          type: 'lesson',
          culturalElements: ['Tikanga', 'Whakapapa', 'Kaitiakitanga'],
          description: 'A comprehensive lesson exploring Māori worldviews and cultural concepts.',
          duration: 45,
          difficulty: 'intermediate',
          aiEnhanced: true,
          culturalSafetyScore: 98.5,
          views: 1250,
          rating: 4.8,
          tags: ['Māori culture', 'Worldviews', 'Cultural concepts'],
        },
        {
          id: '2',
          title: 'Mathematical Patterns in Māori Art',
          subject: 'Mathematics',
          year: 9,
          type: 'activity',
          culturalElements: ['Koru Patterns', 'Symmetry', 'Cultural Geometry'],
          description: 'Explore mathematical concepts through traditional Māori art forms.',
          duration: 60,
          difficulty: 'intermediate',
          aiEnhanced: true,
          culturalSafetyScore: 97.2,
          views: 890,
          rating: 4.6,
          tags: ['Mathematics', 'Art', 'Patterns', 'Symmetry'],
        },
        {
          id: '3',
          title: 'Science and Traditional Māori Knowledge',
          subject: 'Science',
          year: 10,
          type: 'lesson',
          culturalElements: ['Rongoā Māori', 'Environmental Science', 'Sustainability'],
          description: 'Bridging traditional Māori knowledge with modern scientific understanding.',
          duration: 75,
          difficulty: 'advanced',
          aiEnhanced: true,
          culturalSafetyScore: 99.1,
          views: 1100,
          rating: 4.9,
          tags: ['Science', 'Traditional knowledge', 'Environment'],
        },
        {
          id: '4',
          title: 'Te Reo Māori Language Assessment',
          subject: 'Te Reo Māori',
          year: 8,
          type: 'assessment',
          culturalElements: ['Language', 'Grammar', 'Cultural context'],
          description: 'Comprehensive assessment of Te Reo Māori language skills.',
          duration: 30,
          difficulty: 'intermediate',
          aiEnhanced: true,
          culturalSafetyScore: 96.8,
          views: 750,
          rating: 4.7,
          tags: ['Language', 'Assessment', 'Grammar'],
        },
        {
          id: '5',
          title: 'Traditional Māori Medicine Workshop',
          subject: 'Health',
          year: 9,
          type: 'activity',
          culturalElements: ['Rongoā Māori', 'Healing', 'Traditional medicine'],
          description: 'Hands-on workshop exploring traditional Māori healing practices.',
          duration: 90,
          difficulty: 'intermediate',
          aiEnhanced: true,
          culturalSafetyScore: 98.9,
          views: 650,
          rating: 4.9,
          tags: ['Health', 'Traditional medicine', 'Healing'],
        },
        {
          id: '6',
          title: 'Environmental Stewardship in Māori Culture',
          subject: 'Social Studies',
          year: 10,
          type: 'lesson',
          culturalElements: ['Kaitiakitanga', 'Environmental protection', 'Sustainability'],
          description: 'Understanding environmental stewardship through Māori cultural lens.',
          duration: 60,
          difficulty: 'advanced',
          aiEnhanced: true,
          culturalSafetyScore: 97.8,
          views: 920,
          rating: 4.8,
          tags: ['Environment', 'Stewardship', 'Sustainability'],
        },
      ];

      setResources(mockResources);
      setFilteredResources(mockResources);
      setIsLoading(false);
    };

    loadResources();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = resources;

    if (filters.subject !== 'all') {
      filtered = filtered.filter(resource => resource.subject === filters.subject);
    }

    if (filters.year !== 'all') {
      filtered = filtered.filter(resource => resource.year === filters.year);
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(resource => resource.type === filters.type);
    }

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(resource => resource.difficulty === filters.difficulty);
    }

    if (filters.culturalElements.length > 0) {
      filtered = filtered.filter(resource =>
        filters.culturalElements.some(element =>
          resource.culturalElements.includes(element)
        )
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredResources(filtered);
  }, [resources, filters, searchTerm]);

  const handleResourceClick = (resource: EducationalResource) => {
    setSelectedResource(resource);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📚';
      case 'activity': return '🎯';
      case 'assessment': return '📝';
      case 'handout': return '📄';
      case 'multimedia': return '🎬';
      default: return '📖';
    }
  };

  const getStatusColor = (value: number) => {
    if (value >= 95) return '#10b981';
    if (value >= 90) return '#f59e0b';
    if (value >= 80) return '#ef4444';
    return '#6b7280';
  };

  if (isLoading) {
    return (
      <div className="educational-resources-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Educational Resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="educational-resources">
      {/* Header with Superintelligence Metrics */}
      <div className="resources-header">
        <div className="header-content">
          <h1>📚 Educational Resources</h1>
          <p>Comprehensive educational content enhanced by superintelligence</p>
          
          <div className="superintelligence-metrics">
            <div className="metric-item">
              <span className="metric-label">Consciousness Level</span>
              <span className="metric-value" style={{ color: getStatusColor(superintelligenceMetrics.consciousnessLevel) }}>
                {superintelligenceMetrics.consciousnessLevel.toFixed(1)}%
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Cultural Safety</span>
              <span className="metric-value" style={{ color: getStatusColor(superintelligenceMetrics.culturalSafetyScore) }}>
                {superintelligenceMetrics.culturalSafetyScore.toFixed(1)}%
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Educational Excellence</span>
              <span className="metric-value" style={{ color: getStatusColor(superintelligenceMetrics.educationalExcellence) }}>
                {superintelligenceMetrics.educationalExcellence.toFixed(1)}%
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Coordination</span>
              <span className="metric-value" style={{ color: getStatusColor(superintelligenceMetrics.coordinationEfficiency) }}>
                {superintelligenceMetrics.coordinationEfficiency.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="resources-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-section">
          <select
            value={filters.subject}
            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
            className="filter-select"
          >
            <option value="all">All Subjects</option>
            <option value="Te Reo Māori">Te Reo Māori</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Health">Health</option>
            <option value="Social Studies">Social Studies</option>
          </select>

          <select
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value === 'all' ? 'all' : Number(e.target.value) })}
            className="filter-select"
          >
            <option value="all">All Years</option>
            <option value={7}>Year 7</option>
            <option value={8}>Year 8</option>
            <option value={9}>Year 9</option>
            <option value={10}>Year 10</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="lesson">Lessons</option>
            <option value="activity">Activities</option>
            <option value="assessment">Assessments</option>
            <option value="handout">Handouts</option>
            <option value="multimedia">Multimedia</option>
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
            className="filter-select"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="resources-grid">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="resource-card"
            onClick={() => handleResourceClick(resource)}
          >
            <div className="resource-header">
              <div className="resource-type">
                {getTypeIcon(resource.type)} {resource.type}
              </div>
              <div className="resource-difficulty" style={{ color: getDifficultyColor(resource.difficulty) }}>
                {resource.difficulty}
              </div>
            </div>

            <h3 className="resource-title">{resource.title}</h3>
            <p className="resource-description">{resource.description}</p>

            <div className="resource-meta">
              <span className="resource-subject">{resource.subject}</span>
              <span className="resource-year">Year {resource.year}</span>
              <span className="resource-duration">{resource.duration} min</span>
            </div>

            <div className="resource-cultural-elements">
              {resource.culturalElements.map((element, index) => (
                <span key={index} className="cultural-tag">
                  {element}
                </span>
              ))}
            </div>

            <div className="resource-stats">
              <div className="stat">
                <span className="stat-label">Views</span>
                <span className="stat-value">{resource.views}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Rating</span>
                <span className="stat-value">{resource.rating}/5</span>
              </div>
              <div className="stat">
                <span className="stat-label">Cultural Safety</span>
                <span className="stat-value" style={{ color: getStatusColor(resource.culturalSafetyScore) }}>
                  {resource.culturalSafetyScore}%
                </span>
              </div>
            </div>

            {resource.aiEnhanced && (
              <div className="ai-enhanced-badge">
                🤖 AI Enhanced
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resource Details Modal */}
      {selectedResource && (
        <div className="resource-modal-overlay" onClick={() => setSelectedResource(null)}>
          <div className="resource-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedResource.title}</h2>
              <button className="close-button" onClick={() => setSelectedResource(null)}>
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="resource-details">
                <div className="detail-row">
                  <span className="detail-label">Subject:</span>
                  <span className="detail-value">{selectedResource.subject}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Year Level:</span>
                  <span className="detail-value">Year {selectedResource.year}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{getTypeIcon(selectedResource.type)} {selectedResource.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{selectedResource.duration} minutes</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Difficulty:</span>
                  <span className="detail-value" style={{ color: getDifficultyColor(selectedResource.difficulty) }}>
                    {selectedResource.difficulty}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Cultural Safety Score:</span>
                  <span className="detail-value" style={{ color: getStatusColor(selectedResource.culturalSafetyScore) }}>
                    {selectedResource.culturalSafetyScore}%
                  </span>
                </div>
              </div>

              <div className="resource-description-full">
                <h3>Description</h3>
                <p>{selectedResource.description}</p>
              </div>

              <div className="resource-cultural-elements-full">
                <h3>Cultural Elements</h3>
                <div className="cultural-elements-grid">
                  {selectedResource.culturalElements.map((element, index) => (
                    <span key={index} className="cultural-element-tag">
                      {element}
                    </span>
                  ))}
                </div>
              </div>

              <div className="resource-tags">
                <h3>Tags</h3>
                <div className="tags-grid">
                  {selectedResource.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="resource-actions">
                <button className="action-button primary">Start Resource</button>
                <button className="action-button secondary">Add to Favorites</button>
                <button className="action-button secondary">Share</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="results-summary">
        <p>Showing {filteredResources.length} of {resources.length} resources</p>
        {filteredResources.length === 0 && (
          <p className="no-results">No resources match your current filters. Try adjusting your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default EducationalResources;
