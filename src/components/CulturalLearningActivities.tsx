import React, { useState, useEffect } from 'react';
import { superintelligenceAssistanceCoordinator } from '../utils/superintelligence-assistance-coordinator';
import './CulturalLearningActivities.css';

interface CulturalActivity {
  id: string;
  title: string;
  type: 'traditional' | 'modern' | 'interactive' | 'workshop' | 'storytelling';
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  culturalElements: string[];
  materials: string[];
  learningOutcomes: string[];
  culturalSafetyScore: number;
  aiEnhanced: boolean;
  participants: number;
  rating: number;
  tags: string[];
}

const CulturalLearningActivities: React.FC = () => {
  const [activities, setActivities] = useState<CulturalActivity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<CulturalActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<CulturalActivity | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    difficulty: 'all',
    culturalElements: [] as string[],
  });
  const [searchTerm, setSearchTerm] = useState('');
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
    // Load cultural activities
    const loadActivities = () => {
      const mockActivities: CulturalActivity[] = [
        {
          id: '1',
          title: 'Te Reo Māori Language Immersion',
          type: 'interactive',
          description: 'An immersive language learning experience that combines traditional Māori language with modern interactive technology.',
          duration: 90,
          difficulty: 'intermediate',
          culturalElements: ['Te Reo Māori', 'Whakapapa', 'Tikanga'],
          materials: ['Interactive tablets', 'Traditional resources', 'Cultural artifacts'],
          learningOutcomes: ['Basic conversation skills', 'Cultural understanding', 'Pronunciation mastery'],
          culturalSafetyScore: 99.2,
          aiEnhanced: true,
          participants: 15,
          rating: 4.9,
          tags: ['Language', 'Immersion', 'Interactive'],
        },
        {
          id: '2',
          title: 'Traditional Māori Weaving Workshop',
          type: 'workshop',
          description: 'Learn the ancient art of Māori weaving using traditional techniques and natural materials.',
          duration: 120,
          difficulty: 'beginner',
          culturalElements: ['Raranga', 'Harakeke', 'Traditional crafts'],
          materials: ['Harakeke (flax)', 'Weaving tools', 'Traditional patterns'],
          learningOutcomes: ['Weaving techniques', 'Cultural significance', 'Material preparation'],
          culturalSafetyScore: 98.8,
          aiEnhanced: true,
          participants: 12,
          rating: 4.8,
          tags: ['Weaving', 'Traditional crafts', 'Harakeke'],
        },
        {
          id: '3',
          title: 'Māori Storytelling and Legends',
          type: 'storytelling',
          description: 'Explore the rich tradition of Māori storytelling through interactive sessions with cultural experts.',
          duration: 60,
          difficulty: 'beginner',
          culturalElements: ['Pūrākau', 'Whakapapa', 'Oral tradition'],
          materials: ['Storytelling props', 'Cultural artifacts', 'Digital resources'],
          learningOutcomes: ['Story appreciation', 'Cultural values', 'Oral tradition understanding'],
          culturalSafetyScore: 97.5,
          aiEnhanced: true,
          participants: 25,
          rating: 4.7,
          tags: ['Storytelling', 'Legends', 'Oral tradition'],
        },
        {
          id: '4',
          title: 'Traditional Māori Medicine Workshop',
          type: 'workshop',
          description: 'Discover the healing properties of traditional Māori plants and their cultural significance.',
          duration: 150,
          difficulty: 'intermediate',
          culturalElements: ['Rongoā Māori', 'Healing', 'Environmental knowledge'],
          materials: ['Traditional plants', 'Healing tools', 'Cultural knowledge resources'],
          learningOutcomes: ['Plant identification', 'Healing practices', 'Cultural respect'],
          culturalSafetyScore: 99.1,
          aiEnhanced: true,
          participants: 10,
          rating: 4.9,
          tags: ['Medicine', 'Healing', 'Traditional knowledge'],
        },
        {
          id: '5',
          title: 'Māori Art and Design',
          type: 'modern',
          description: 'Create contemporary Māori art while learning about traditional design principles and symbolism.',
          duration: 180,
          difficulty: 'advanced',
          culturalElements: ['Toi Māori', 'Koru patterns', 'Cultural symbolism'],
          materials: ['Art supplies', 'Digital tools', 'Traditional patterns'],
          learningOutcomes: ['Design principles', 'Cultural symbolism', 'Contemporary expression'],
          culturalSafetyScore: 96.9,
          aiEnhanced: true,
          participants: 8,
          rating: 4.6,
          tags: ['Art', 'Design', 'Contemporary'],
        },
        {
          id: '6',
          title: 'Environmental Stewardship - Kaitiakitanga',
          type: 'interactive',
          description: 'Learn about Māori environmental stewardship and sustainable practices through hands-on activities.',
          duration: 120,
          difficulty: 'intermediate',
          culturalElements: ['Kaitiakitanga', 'Environmental protection', 'Sustainability'],
          materials: ['Environmental tools', 'Traditional knowledge', 'Field guides'],
          learningOutcomes: ['Environmental awareness', 'Sustainable practices', 'Cultural responsibility'],
          culturalSafetyScore: 98.3,
          aiEnhanced: true,
          participants: 20,
          rating: 4.8,
          tags: ['Environment', 'Stewardship', 'Sustainability'],
        },
      ];

      setActivities(mockActivities);
      setFilteredActivities(mockActivities);
      setIsLoading(false);
    };

    loadActivities();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = activities;

    if (filters.type !== 'all') {
      filtered = filtered.filter(activity => activity.type === filters.type);
    }

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(activity => activity.difficulty === filters.difficulty);
    }

    if (filters.culturalElements.length > 0) {
      filtered = filtered.filter(activity =>
        filters.culturalElements.some(element =>
          activity.culturalElements.includes(element)
        )
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredActivities(filtered);
  }, [activities, filters, searchTerm]);

  const handleActivityClick = (activity: CulturalActivity) => {
    setSelectedActivity(activity);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'traditional': return '🏺';
      case 'modern': return '🎨';
      case 'interactive': return '🔄';
      case 'workshop': return '🔨';
      case 'storytelling': return '📖';
      default: return '🎯';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
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
      <div className="cultural-activities-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Cultural Learning Activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cultural-learning-activities">
      {/* Header with Superintelligence Metrics */}
      <div className="activities-header">
        <div className="header-content">
          <h1>🌿 Cultural Learning Activities</h1>
          <p>Traditional Māori knowledge and cultural practices enhanced by superintelligence</p>
          
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
      <div className="activities-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search cultural activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-section">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="filter-select"
            title="Activity Type Filter"
          >
            <option value="all">All Types</option>
            <option value="traditional">Traditional</option>
            <option value="modern">Modern</option>
            <option value="interactive">Interactive</option>
            <option value="workshop">Workshop</option>
            <option value="storytelling">Storytelling</option>
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
            className="filter-select"
            title="Difficulty Level Filter"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="activities-grid">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="activity-card"
            onClick={() => handleActivityClick(activity)}
          >
            <div className="activity-header">
              <div className="activity-type">
                {getTypeIcon(activity.type)} {activity.type}
              </div>
              <div className="activity-difficulty" style={{ color: getDifficultyColor(activity.difficulty) }}>
                {activity.difficulty}
              </div>
            </div>

            <h3 className="activity-title">{activity.title}</h3>
            <p className="activity-description">{activity.description}</p>

            <div className="activity-meta">
              <span className="activity-duration">{activity.duration} min</span>
              <span className="activity-participants">{activity.participants} participants</span>
              <span className="activity-rating">{activity.rating}/5</span>
            </div>

            <div className="activity-cultural-elements">
              {activity.culturalElements.map((element, index) => (
                <span key={index} className="cultural-tag">
                  {element}
                </span>
              ))}
            </div>

            <div className="activity-stats">
              <div className="stat">
                <span className="stat-label">Cultural Safety</span>
                <span className="stat-value" style={{ color: getStatusColor(activity.culturalSafetyScore) }}>
                  {activity.culturalSafetyScore}%
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Learning Outcomes</span>
                <span className="stat-value">{activity.learningOutcomes.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Materials</span>
                <span className="stat-value">{activity.materials.length}</span>
              </div>
            </div>

            {activity.aiEnhanced && (
              <div className="ai-enhanced-badge">
                🤖 AI Enhanced
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="activity-modal-overlay" onClick={() => setSelectedActivity(null)}>
          <div className="activity-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedActivity.title}</h2>
              <button className="close-button" onClick={() => setSelectedActivity(null)}>
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="activity-details">
                <div className="detail-row">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{getTypeIcon(selectedActivity.type)} {selectedActivity.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{selectedActivity.duration} minutes</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Difficulty:</span>
                  <span className="detail-value" style={{ color: getDifficultyColor(selectedActivity.difficulty) }}>
                    {selectedActivity.difficulty}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Participants:</span>
                  <span className="detail-value">{selectedActivity.participants} people</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Rating:</span>
                  <span className="detail-value">{selectedActivity.rating}/5</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Cultural Safety Score:</span>
                  <span className="detail-value" style={{ color: getStatusColor(selectedActivity.culturalSafetyScore) }}>
                    {selectedActivity.culturalSafetyScore}%
                  </span>
                </div>
              </div>

              <div className="activity-description-full">
                <h3>Description</h3>
                <p>{selectedActivity.description}</p>
              </div>

              <div className="activity-cultural-elements-full">
                <h3>Cultural Elements</h3>
                <div className="cultural-elements-grid">
                  {selectedActivity.culturalElements.map((element, index) => (
                    <span key={index} className="cultural-element-tag">
                      {element}
                    </span>
                  ))}
                </div>
              </div>

              <div className="activity-materials">
                <h3>Required Materials</h3>
                <ul className="materials-list">
                  {selectedActivity.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>

              <div className="activity-learning-outcomes">
                <h3>Learning Outcomes</h3>
                <ul className="outcomes-list">
                  {selectedActivity.learningOutcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>

              <div className="activity-tags">
                <h3>Tags</h3>
                <div className="tags-grid">
                  {selectedActivity.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="activity-actions">
                <button className="action-button primary">Start Activity</button>
                <button className="action-button secondary">Add to Favorites</button>
                <button className="action-button secondary">Share</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="results-summary">
        <p>Showing {filteredActivities.length} of {activities.length} cultural activities</p>
        {filteredActivities.length === 0 && (
          <p className="no-results">No activities match your current filters. Try adjusting your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default CulturalLearningActivities;
