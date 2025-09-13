import React, { useEffect, useState } from 'react';
import './ResourceUnlocker.css';

interface UnlockableResource {
  id: string;
  title: string;
  maoriTitle: string;
  description: string;
  category: 'cultural' | 'academic' | 'leadership' | 'wisdom' | 'community' | 'innovation';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  unlockRequirements: {
    culturalPoints: number;
    academicPoints: number;
    leadershipPoints: number;
    communityEngagement: number;
    specificAchievements: string[];
  };
  currentProgress: {
    culturalPoints: number;
    academicPoints: number;
    leadershipPoints: number;
    communityEngagement: number;
    achievementsCompleted: string[];
  };
  isUnlocked: boolean;
  culturalValue: number;
  learningOutcomes: string[];
  estimatedDuration: number; // in minutes
  lastUpdated: Date;
}

interface Achievement {
  id: string;
  title: string;
  maoriTitle: string;
  description: string;
  category: string;
  points: number;
  isCompleted: boolean;
  completedDate?: Date;
  culturalSignificance: string;
}

const ResourceUnlocker: React.FC = () => {
  const [resources, setResources] = useState<UnlockableResource[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedResource, setSelectedResource] = useState<UnlockableResource | null>(null);
  const [filterCategory, setFilterCategory] = useState<
    'all' | 'cultural' | 'academic' | 'leadership' | 'wisdom' | 'community' | 'innovation'
  >('all');
  const [filterDifficulty, setFilterDifficulty] = useState<
    'all' | 'beginner' | 'intermediate' | 'advanced' | 'expert'
  >('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  useEffect(() => {
    initializeResources();
    initializeAchievements();
  }, []);

  const initializeResources = () => {
    const mockResources: UnlockableResource[] = [
      {
        id: 'tikanga-advanced',
        title: 'Advanced Tikanga Protocols',
        maoriTitle: 'Ngā Tikanga Mātanga',
        description:
          'Deep dive into advanced cultural protocols and their application in modern contexts',
        category: 'cultural',
        difficulty: 'advanced',
        unlockRequirements: {
          culturalPoints: 500,
          academicPoints: 300,
          leadershipPoints: 200,
          communityEngagement: 400,
          specificAchievements: ['tikanga-basics', 'cultural-respect', 'protocol-mastery'],
        },
        currentProgress: {
          culturalPoints: 480,
          academicPoints: 320,
          leadershipPoints: 180,
          communityEngagement: 420,
          achievementsCompleted: ['tikanga-basics', 'cultural-respect'],
        },
        isUnlocked: false,
        culturalValue: 95,
        learningOutcomes: [
          'Master advanced cultural protocols',
          'Apply tikanga in complex situations',
          'Guide others in cultural practices',
          'Integrate traditional and modern approaches',
        ],
        estimatedDuration: 120,
        lastUpdated: new Date(),
      },
      {
        id: 'te-reo-fluency',
        title: 'Te Reo Māori Fluency',
        maoriTitle: 'Te Reo Māori Mātanga',
        description:
          'Achieve fluency in Te Reo Māori with advanced conversation and cultural expression',
        category: 'academic',
        difficulty: 'expert',
        unlockRequirements: {
          culturalPoints: 800,
          academicPoints: 600,
          leadershipPoints: 300,
          communityEngagement: 500,
          specificAchievements: ['te-reo-basics', 'conversation-skills', 'cultural-expression'],
        },
        currentProgress: {
          culturalPoints: 750,
          academicPoints: 580,
          leadershipPoints: 280,
          communityEngagement: 480,
          achievementsCompleted: ['te-reo-basics', 'conversation-skills'],
        },
        isUnlocked: false,
        culturalValue: 98,
        learningOutcomes: [
          'Achieve conversational fluency',
          'Understand cultural nuances',
          'Express complex ideas in Te Reo',
          'Connect with cultural heritage',
        ],
        estimatedDuration: 180,
        lastUpdated: new Date(),
      },
      {
        id: 'rangatira-leadership',
        title: 'Rangatira Leadership Development',
        maoriTitle: 'Te Whakatupu Rangatira',
        description: 'Develop authentic leadership skills based on Māori cultural principles',
        category: 'leadership',
        difficulty: 'advanced',
        unlockRequirements: {
          culturalPoints: 600,
          academicPoints: 400,
          leadershipPoints: 500,
          communityEngagement: 600,
          specificAchievements: ['leadership-basics', 'community-service', 'cultural-mentoring'],
        },
        currentProgress: {
          culturalPoints: 620,
          academicPoints: 420,
          leadershipPoints: 480,
          communityEngagement: 580,
          achievementsCompleted: ['leadership-basics', 'community-service'],
        },
        isUnlocked: false,
        culturalValue: 92,
        learningOutcomes: [
          'Develop authentic leadership style',
          'Apply cultural leadership principles',
          'Build community relationships',
          'Guide others with cultural wisdom',
        ],
        estimatedDuration: 150,
        lastUpdated: new Date(),
      },
      {
        id: 'whakapapa-mastery',
        title: 'Whakapapa Mastery',
        maoriTitle: 'Te Mātauranga Whakapapa',
        description: 'Master the art of genealogy and ancestral connections',
        category: 'wisdom',
        difficulty: 'expert',
        unlockRequirements: {
          culturalPoints: 700,
          academicPoints: 500,
          leadershipPoints: 400,
          communityEngagement: 700,
          specificAchievements: ['whakapapa-basics', 'family-research', 'cultural-heritage'],
        },
        currentProgress: {
          culturalPoints: 680,
          academicPoints: 520,
          leadershipPoints: 380,
          communityEngagement: 650,
          achievementsCompleted: ['whakapapa-basics', 'family-research'],
        },
        isUnlocked: false,
        culturalValue: 97,
        learningOutcomes: [
          'Master genealogical research',
          'Connect with ancestral knowledge',
          'Preserve family histories',
          'Share cultural heritage',
        ],
        estimatedDuration: 200,
        lastUpdated: new Date(),
      },
      {
        id: 'manaakitanga-excellence',
        title: 'Manaakitanga Excellence',
        maoriTitle: 'Te Manaakitanga Mātanga',
        description: 'Excel in the art of hospitality and caring for others',
        category: 'community',
        difficulty: 'intermediate',
        unlockRequirements: {
          culturalPoints: 400,
          academicPoints: 200,
          leadershipPoints: 300,
          communityEngagement: 500,
          specificAchievements: ['manaakitanga-basics', 'hospitality-skills', 'community-care'],
        },
        currentProgress: {
          culturalPoints: 420,
          academicPoints: 220,
          leadershipPoints: 320,
          communityEngagement: 480,
          achievementsCompleted: ['manaakitanga-basics', 'hospitality-skills'],
        },
        isUnlocked: false,
        culturalValue: 90,
        learningOutcomes: [
          'Excel in hospitality practices',
          'Create welcoming environments',
          'Care for community members',
          'Build lasting relationships',
        ],
        estimatedDuration: 90,
        lastUpdated: new Date(),
      },
      {
        id: 'innovation-culture',
        title: 'Cultural Innovation Hub',
        maoriTitle: 'Te Auahatanga Ahurea',
        description: 'Innovate while preserving and enhancing cultural traditions',
        category: 'innovation',
        difficulty: 'advanced',
        unlockRequirements: {
          culturalPoints: 600,
          academicPoints: 500,
          leadershipPoints: 400,
          communityEngagement: 600,
          specificAchievements: ['innovation-basics', 'cultural-creativity', 'traditional-modern'],
        },
        currentProgress: {
          culturalPoints: 580,
          academicPoints: 520,
          leadershipPoints: 420,
          communityEngagement: 580,
          achievementsCompleted: ['innovation-basics', 'cultural-creativity'],
        },
        isUnlocked: false,
        culturalValue: 94,
        learningOutcomes: [
          'Innovate within cultural frameworks',
          'Preserve traditional knowledge',
          'Create modern cultural expressions',
          'Bridge traditional and contemporary',
        ],
        estimatedDuration: 160,
        lastUpdated: new Date(),
      },
    ];

    setResources(mockResources);
  };

  const initializeAchievements = () => {
    const mockAchievements: Achievement[] = [
      {
        id: 'tikanga-basics',
        title: 'Tikanga Fundamentals',
        maoriTitle: 'Ngā Tikanga Matua',
        description: 'Complete basic cultural protocols training',
        category: 'cultural',
        points: 100,
        isCompleted: true,
        completedDate: new Date(Date.now() - 86400000),
        culturalSignificance: 'Foundation of cultural understanding and respect',
      },
      {
        id: 'cultural-respect',
        title: 'Cultural Respect Mastery',
        maoriTitle: 'Te Manaakitanga Ahurea',
        description: 'Demonstrate deep respect for cultural practices',
        category: 'cultural',
        points: 150,
        isCompleted: true,
        completedDate: new Date(Date.now() - 172800000),
        culturalSignificance: 'Essential for meaningful cultural engagement',
      },
      {
        id: 'te-reo-basics',
        title: 'Te Reo Basics',
        maoriTitle: 'Ngā Tīmatanga o Te Reo',
        description: 'Complete basic Te Reo Māori course',
        category: 'academic',
        points: 120,
        isCompleted: true,
        completedDate: new Date(Date.now() - 259200000),
        culturalSignificance: 'Language is the heart of cultural connection',
      },
      {
        id: 'conversation-skills',
        title: 'Conversation Skills',
        maoriTitle: 'Ngā Pūkenga Kōrero',
        description: 'Hold basic conversations in Te Reo Māori',
        category: 'academic',
        points: 180,
        isCompleted: true,
        completedDate: new Date(Date.now() - 345600000),
        culturalSignificance: 'Enables meaningful cultural communication',
      },
      {
        id: 'leadership-basics',
        title: 'Leadership Foundations',
        maoriTitle: 'Ngā Tīmatanga Rangatira',
        description: 'Complete basic leadership training',
        category: 'leadership',
        points: 200,
        isCompleted: true,
        completedDate: new Date(Date.now() - 432000000),
        culturalSignificance: 'Prepares for community leadership roles',
      },
      {
        id: 'community-service',
        title: 'Community Service',
        maoriTitle: 'Te Mahi Hapori',
        description: 'Complete community service project',
        category: 'leadership',
        points: 250,
        isCompleted: true,
        completedDate: new Date(Date.now() - 518400000),
        culturalSignificance: 'Demonstrates commitment to community wellbeing',
      },
      {
        id: 'whakapapa-basics',
        title: 'Whakapapa Basics',
        maoriTitle: 'Ngā Tīmatanga Whakapapa',
        description: 'Learn basic genealogical research',
        category: 'wisdom',
        points: 150,
        isCompleted: true,
        completedDate: new Date(Date.now() - 604800000),
        culturalSignificance: 'Connects to ancestral knowledge and identity',
      },
      {
        id: 'family-research',
        title: 'Family Research',
        maoriTitle: 'Te Rangahau Whānau',
        description: 'Complete family genealogy research',
        category: 'wisdom',
        points: 200,
        isCompleted: true,
        completedDate: new Date(Date.now() - 691200000),
        culturalSignificance: 'Preserves family history and connections',
      },
      {
        id: 'manaakitanga-basics',
        title: 'Manaakitanga Basics',
        maoriTitle: 'Ngā Tīmatanga Manaakitanga',
        description: 'Learn basic hospitality practices',
        category: 'community',
        points: 100,
        isCompleted: true,
        completedDate: new Date(Date.now() - 777600000),
        culturalSignificance: 'Foundation of community care and hospitality',
      },
      {
        id: 'hospitality-skills',
        title: 'Hospitality Skills',
        maoriTitle: 'Ngā Pūkenga Manaakitanga',
        description: 'Master hospitality and care practices',
        category: 'community',
        points: 150,
        isCompleted: true,
        completedDate: new Date(Date.now() - 864000000),
        culturalSignificance: 'Essential for creating welcoming communities',
      },
      {
        id: 'innovation-basics',
        title: 'Innovation Basics',
        maoriTitle: 'Ngā Tīmatanga Auahatanga',
        description: 'Learn basic innovation principles',
        category: 'innovation',
        points: 120,
        isCompleted: true,
        completedDate: new Date(Date.now() - 950400000),
        culturalSignificance: 'Enables cultural innovation and adaptation',
      },
      {
        id: 'cultural-creativity',
        title: 'Cultural Creativity',
        maoriTitle: 'Te Auahatanga Ahurea',
        description: 'Demonstrate cultural creativity',
        category: 'innovation',
        points: 180,
        isCompleted: true,
        completedDate: new Date(Date.now() - 1036800000),
        culturalSignificance: 'Preserves and enhances cultural expression',
      },
    ];

    setAchievements(mockAchievements);
  };

  const getFilteredResources = () => {
    let filtered = [...resources];

    if (filterCategory !== 'all') {
      filtered = filtered.filter((resource) => resource.category === filterCategory);
    }

    if (filterDifficulty !== 'all') {
      filtered = filtered.filter((resource) => resource.difficulty === filterDifficulty);
    }

    if (showUnlockedOnly) {
      filtered = filtered.filter((resource) => resource.isUnlocked);
    }

    return filtered;
  };

  const getProgressPercentage = (resource: UnlockableResource) => {
    const culturalProgress =
      (resource.currentProgress.culturalPoints / resource.unlockRequirements.culturalPoints) * 100;
    const academicProgress =
      (resource.currentProgress.academicPoints / resource.unlockRequirements.academicPoints) * 100;
    const leadershipProgress =
      (resource.currentProgress.leadershipPoints / resource.unlockRequirements.leadershipPoints) *
      100;
    const communityProgress =
      (resource.currentProgress.communityEngagement /
        resource.unlockRequirements.communityEngagement) *
      100;

    return Math.min(
      100,
      (culturalProgress + academicProgress + leadershipProgress + communityProgress) / 4,
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cultural':
        return '🌿';
      case 'academic':
        return '📚';
      case 'leadership':
        return '👑';
      case 'wisdom':
        return '🧠';
      case 'community':
        return '🤝';
      case 'innovation':
        return '🚀';
      default:
        return '⚙️';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#10b981';
      case 'intermediate':
        return '#f59e0b';
      case 'advanced':
        return '#ef4444';
      case 'expert':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultural':
        return '#8b5cf6';
      case 'academic':
        return '#3b82f6';
      case 'leadership':
        return '#dc2626';
      case 'wisdom':
        return '#059669';
      case 'community':
        return '#f59e0b';
      case 'innovation':
        return '#ec4899';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="resource-unlocker">
      <div className="unlocker-container">
        <div className="unlocker-header">
          <h1>🔓 Resource Unlocker</h1>
          <p>
            Unlock advanced cultural knowledge and educational resources through achievement and
            growth
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="unlocker-controls">
          <div className="filter-section">
            <div className="filter-group">
              <label htmlFor="category-filter">Category:</label>
              <select
                id="category-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                aria-label="Filter resources by category"
              >
                <option value="all">All Categories</option>
                <option value="cultural">Cultural</option>
                <option value="academic">Academic</option>
                <option value="leadership">Leadership</option>
                <option value="wisdom">Wisdom</option>
                <option value="community">Community</option>
                <option value="innovation">Innovation</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="difficulty-filter">Difficulty:</label>
              <select
                id="difficulty-filter"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value as any)}
                aria-label="Filter resources by difficulty"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          <div className="view-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showUnlockedOnly}
                onChange={(e) => setShowUnlockedOnly(e.target.checked)}
                aria-label="Show unlocked resources only"
              />
              <span className="toggle-text">Show Unlocked Only</span>
            </label>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="resources-grid">
          {getFilteredResources().map((resource) => (
            <div
              key={resource.id}
              className={`resource-card ${resource.isUnlocked ? 'unlocked' : 'locked'}`}
              onClick={() => setSelectedResource(resource)}
            >
              <div className="resource-header">
                <div className="resource-icon">{getCategoryIcon(resource.category)}</div>
                <div className="resource-info">
                  <h3>{resource.title}</h3>
                  <h4 className="maori-title">{resource.maoriTitle}</h4>
                  <div className="resource-meta">
                    <span
                      className="category-badge"
                      /* TODO: Move to external CSS */ style={{ backgroundColor: getCategoryColor(resource.category) }}
                    >
                      {resource.category}
                    </span>
                    <span
                      className="difficulty-badge"
                      /* TODO: Move to external CSS */ style={{ backgroundColor: getDifficultyColor(resource.difficulty) }}
                    >
                      {resource.difficulty}
                    </span>
                  </div>
                </div>
                <div className="unlock-status">
                  {resource.isUnlocked ? (
                    <span className="unlocked-icon">🔓</span>
                  ) : (
                    <span className="locked-icon">🔒</span>
                  )}
                </div>
              </div>

              <div className="resource-content">
                <p className="resource-description">{resource.description}</p>

                <div className="progress-section">
                  <div className="progress-header">
                    <span>Unlock Progress</span>
                    <span className="progress-percentage">
                      {Math.round(getProgressPercentage(resource))}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${getProgressPercentage(resource)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="requirements-grid">
                  <div className="requirement-item">
                    <span>Cultural Points</span>
                    <span className="requirement-value">
                      {resource.currentProgress.culturalPoints}/
                      {resource.unlockRequirements.culturalPoints}
                    </span>
                  </div>
                  <div className="requirement-item">
                    <span>Academic Points</span>
                    <span className="requirement-value">
                      {resource.currentProgress.academicPoints}/
                      {resource.unlockRequirements.academicPoints}
                    </span>
                  </div>
                  <div className="requirement-item">
                    <span>Leadership Points</span>
                    <span className="requirement-value">
                      {resource.currentProgress.leadershipPoints}/
                      {resource.unlockRequirements.leadershipPoints}
                    </span>
                  </div>
                  <div className="requirement-item">
                    <span>Community Engagement</span>
                    <span className="requirement-value">
                      {resource.currentProgress.communityEngagement}/
                      {resource.unlockRequirements.communityEngagement}
                    </span>
                  </div>
                </div>

                <div className="resource-stats">
                  <div className="stat-item">
                    <span>Cultural Value</span>
                    <span className="stat-value">{resource.culturalValue}%</span>
                  </div>
                  <div className="stat-item">
                    <span>Duration</span>
                    <span className="stat-value">{resource.estimatedDuration} min</span>
                  </div>
                </div>
              </div>

              <div className="resource-footer">
                <button className="view-details-btn">
                  {resource.isUnlocked ? 'Access Resource' : 'View Requirements'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resource Detail Modal */}
        {selectedResource && (
          <div className="resource-modal-overlay" onClick={() => setSelectedResource(null)}>
            <div className="resource-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">
                  <span className="modal-icon">{getCategoryIcon(selectedResource.category)}</span>
                  <div>
                    <h2>{selectedResource.title}</h2>
                    <h3 className="modal-maori-title">{selectedResource.maoriTitle}</h3>
                  </div>
                </div>
                <button
                  className="close-modal"
                  onClick={() => setSelectedResource(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="modal-content">
                <div className="modal-description">
                  <p>{selectedResource.description}</p>
                </div>

                <div className="modal-progress">
                  <h4>Unlock Progress</h4>
                  <div className="progress-details">
                    <div className="progress-item">
                      <span>Cultural Points</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${
                              (selectedResource.currentProgress.culturalPoints /
                                selectedResource.unlockRequirements.culturalPoints) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="progress-value">
                        {selectedResource.currentProgress.culturalPoints}/
                        {selectedResource.unlockRequirements.culturalPoints}
                      </span>
                    </div>
                    <div className="progress-item">
                      <span>Academic Points</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${
                              (selectedResource.currentProgress.academicPoints /
                                selectedResource.unlockRequirements.academicPoints) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="progress-value">
                        {selectedResource.currentProgress.academicPoints}/
                        {selectedResource.unlockRequirements.academicPoints}
                      </span>
                    </div>
                    <div className="progress-item">
                      <span>Leadership Points</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${
                              (selectedResource.currentProgress.leadershipPoints /
                                selectedResource.unlockRequirements.leadershipPoints) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="progress-value">
                        {selectedResource.currentProgress.leadershipPoints}/
                        {selectedResource.unlockRequirements.leadershipPoints}
                      </span>
                    </div>
                    <div className="progress-item">
                      <span>Community Engagement</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${
                              (selectedResource.currentProgress.communityEngagement /
                                selectedResource.unlockRequirements.communityEngagement) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="progress-value">
                        {selectedResource.currentProgress.communityEngagement}/
                        {selectedResource.unlockRequirements.communityEngagement}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="modal-requirements">
                  <h4>Required Achievements</h4>
                  <div className="achievements-list">
                    {selectedResource.unlockRequirements.specificAchievements.map(
                      (achievementId) => {
                        const achievement = achievements.find((a) => a.id === achievementId);
                        const isCompleted =
                          selectedResource.currentProgress.achievementsCompleted.includes(
                            achievementId,
                          );

                        return (
                          <div
                            key={achievementId}
                            className={`achievement-item ${isCompleted ? 'completed' : 'pending'}`}
                          >
                            <span className="achievement-icon">{isCompleted ? '✅' : '⏳'}</span>
                            <div className="achievement-info">
                              <span className="achievement-title">
                                {achievement?.title || achievementId}
                              </span>
                              <span className="achievement-description">
                                {achievement?.description || 'Achievement description'}
                              </span>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>

                <div className="modal-outcomes">
                  <h4>Learning Outcomes</h4>
                  <ul>
                    {selectedResource.learningOutcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-actions">
                  {selectedResource.isUnlocked ? (
                    <button className="access-btn">Access Resource</button>
                  ) : (
                    <button className="work-towards-btn">Work Towards Unlock</button>
                  )}
                  <button className="secondary-btn">View Similar Resources</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceUnlocker;
