import React, { useEffect, useState } from 'react';
import './CulturalLearningModules.css';

interface CulturalModule {
  id: string;
  title: string;
  maoriTitle: string;
  description: string;
  category:
    | 'tikanga'
    | 'te-reo'
    | 'whakapapa'
    | 'manaakitanga'
    | 'kaitiakitanga'
    | 'rangatiratanga';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  completionRate: number;
  culturalAccuracy: number;
  studentEngagement: number;
  learningOutcomes: string[];
  culturalElements: string[];
  activities: string[];
  resources: string[];
  lastUpdated: Date;
  isActive: boolean;
}

const CulturalLearningModules: React.FC = () => {
  const [modules, setModules] = useState<CulturalModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<CulturalModule | null>(null);
  const [filterCategory, setFilterCategory] = useState<
    'all' | 'tikanga' | 'te-reo' | 'whakapapa' | 'manaakitanga' | 'kaitiakitanga' | 'rangatiratanga'
  >('all');
  const [filterDifficulty, setFilterDifficulty] = useState<
    'all' | 'beginner' | 'intermediate' | 'advanced'
  >('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    generateMockModules();
  }, []);

  const generateMockModules = () => {
    const mockModules: CulturalModule[] = [
      {
        id: 'tikanga-basics',
        title: 'Tikanga Fundamentals',
        maoriTitle: 'Ngā Tikanga Matua',
        description: 'Learn the fundamental principles and protocols of Māori culture and customs',
        category: 'tikanga',
        difficulty: 'beginner',
        duration: 45,
        completionRate: 87,
        culturalAccuracy: 95,
        studentEngagement: 92,
        learningOutcomes: [
          'Understand basic tikanga principles',
          'Recognize cultural protocols',
          'Apply respectful behavior in cultural contexts',
          'Develop cultural sensitivity',
        ],
        culturalElements: [
          'Marae protocols',
          'Whakatau and powhiri',
          'Cultural greetings',
          'Respectful behavior',
        ],
        activities: [
          'Virtual marae visit',
          'Cultural greeting practice',
          'Protocol role-play',
          'Reflection journal',
        ],
        resources: [
          'Video tutorials',
          'Interactive simulations',
          'Cultural expert interviews',
          'Traditional stories',
        ],
        lastUpdated: new Date(),
        isActive: true,
      },
      {
        id: 'te-reo-conversation',
        title: 'Te Reo Conversation Skills',
        maoriTitle: 'Ngā Pūkenga Kōrero',
        description: 'Develop practical conversation skills in Te Reo Māori for everyday use',
        category: 'te-reo',
        difficulty: 'intermediate',
        duration: 60,
        completionRate: 78,
        culturalAccuracy: 98,
        studentEngagement: 89,
        learningOutcomes: [
          'Hold basic conversations in Te Reo',
          'Use appropriate greetings and farewells',
          'Ask and answer simple questions',
          'Build vocabulary and confidence',
        ],
        culturalElements: [
          'Greetings and farewells',
          'Family relationships',
          'Daily activities',
          'Cultural expressions',
        ],
        activities: [
          'Conversation practice',
          'Role-playing scenarios',
          'Vocabulary building games',
          'Cultural immersion exercises',
        ],
        resources: [
          'Audio pronunciation guides',
          'Interactive conversation tools',
          'Native speaker recordings',
          'Cultural context videos',
        ],
        lastUpdated: new Date(Date.now() - 86400000),
        isActive: true,
      },
      {
        id: 'whakapapa-exploration',
        title: 'Whakapapa Exploration',
        maoriTitle: 'Te Rangahau Whakapapa',
        description: 'Discover the importance of genealogy and family connections in Māori culture',
        category: 'whakapapa',
        difficulty: 'intermediate',
        duration: 90,
        completionRate: 82,
        culturalAccuracy: 96,
        studentEngagement: 85,
        learningOutcomes: [
          'Understand whakapapa concepts',
          'Create personal family tree',
          'Connect to ancestral knowledge',
          'Appreciate cultural heritage',
        ],
        culturalElements: [
          'Family genealogy',
          'Ancestral connections',
          'Cultural inheritance',
          'Identity formation',
        ],
        activities: [
          'Family tree creation',
          'Ancestral story research',
          'Cultural identity reflection',
          'Community connection projects',
        ],
        resources: [
          'Genealogy databases',
          'Family history guides',
          'Cultural expert consultations',
          'Historical documents',
        ],
        lastUpdated: new Date(Date.now() - 172800000),
        isActive: true,
      },
      {
        id: 'manaakitanga-practice',
        title: 'Manaakitanga in Practice',
        maoriTitle: 'Te Mahi Manaakitanga',
        description: 'Learn and practice the art of hospitality, kindness, and caring for others',
        category: 'manaakitanga',
        difficulty: 'beginner',
        duration: 40,
        completionRate: 91,
        culturalAccuracy: 94,
        studentEngagement: 88,
        learningOutcomes: [
          'Practice hospitality skills',
          'Show kindness and care',
          'Create welcoming environments',
          'Build community connections',
        ],
        culturalElements: [
          'Hospitality protocols',
          'Caring for visitors',
          'Community support',
          'Kindness practices',
        ],
        activities: [
          'Hospitality role-play',
          'Community service projects',
          'Kindness challenges',
          'Cultural sharing events',
        ],
        resources: [
          'Hospitality guides',
          'Community service resources',
          'Cultural sharing templates',
          'Reflection tools',
        ],
        lastUpdated: new Date(Date.now() - 259200000),
        isActive: true,
      },
      {
        id: 'kaitiakitanga-stewardship',
        title: 'Kaitiakitanga - Environmental Stewardship',
        maoriTitle: 'Te Kaitiakitanga o te Taiao',
        description: 'Understand and practice environmental guardianship and sustainability',
        category: 'kaitiakitanga',
        difficulty: 'advanced',
        duration: 75,
        completionRate: 76,
        culturalAccuracy: 97,
        studentEngagement: 83,
        learningOutcomes: [
          'Understand environmental guardianship',
          'Practice sustainable living',
          'Connect with natural world',
          'Protect cultural resources',
        ],
        culturalElements: [
          'Environmental protection',
          'Sustainable practices',
          'Natural resource management',
          'Cultural preservation',
        ],
        activities: [
          'Environmental projects',
          'Sustainability challenges',
          'Nature connection exercises',
          'Cultural resource mapping',
        ],
        resources: [
          'Environmental guides',
          'Sustainability resources',
          'Cultural preservation tools',
          'Community project templates',
        ],
        lastUpdated: new Date(Date.now() - 345600000),
        isActive: true,
      },
      {
        id: 'rangatiratanga-leadership',
        title: 'Rangatiratanga - Leadership and Self-Determination',
        maoriTitle: 'Te Rangatiratanga me te Mana Motuhake',
        description: 'Develop leadership skills and understanding of self-determination principles',
        category: 'rangatiratanga',
        difficulty: 'advanced',
        duration: 80,
        completionRate: 71,
        culturalAccuracy: 93,
        studentEngagement: 87,
        learningOutcomes: [
          'Develop leadership qualities',
          'Understand self-determination',
          'Build confidence and autonomy',
          'Practice cultural leadership',
        ],
        culturalElements: [
          'Leadership principles',
          'Self-determination',
          'Cultural autonomy',
          'Community leadership',
        ],
        activities: [
          'Leadership development',
          'Cultural leadership projects',
          'Community initiatives',
          'Self-reflection exercises',
        ],
        resources: [
          'Leadership guides',
          'Cultural leadership models',
          'Community project resources',
          'Reflection and assessment tools',
        ],
        lastUpdated: new Date(Date.now() - 432000000),
        isActive: true,
      },
    ];

    setModules(mockModules);
  };

  const getFilteredModules = () => {
    let filtered = [...modules];

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter((module) => module.category === filterCategory);
    }

    // Apply difficulty filter
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter((module) => module.difficulty === filterDifficulty);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (module) =>
          module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          module.maoriTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          module.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tikanga':
        return '🏛️';
      case 'te-reo':
        return '🗣️';
      case 'whakapapa':
        return '🌳';
      case 'manaakitanga':
        return '🤝';
      case 'kaitiakitanga':
        return '🌿';
      case 'rangatiratanga':
        return '👑';
      default:
        return '📚';
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
      default:
        return '#6b7280';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tikanga':
        return '#8b5cf6';
      case 'te-reo':
        return '#3b82f6';
      case 'whakapapa':
        return '#10b981';
      case 'manaakitanga':
        return '#f59e0b';
      case 'kaitiakitanga':
        return '#059669';
      case 'rangatiratanga':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="cultural-learning-modules">
      <div className="modules-container">
        <div className="modules-header">
          <h1>🌿 Cultural Learning Modules</h1>
          <div className="maori-subtitle">Ngā Akoranga Ahurea - Te Kura o TeAoMarama</div>
          <p>
            Interactive cultural education with Te Ao Māori integration, tikanga protocols,
            and modern pedagogical approaches designed for authentic cultural learning
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="modules-controls">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              aria-label="Search cultural learning modules"
            />
          </div>

          <div className="filter-section">
            <div className="filter-group">
              <label htmlFor="category-filter">Category:</label>
              <select
                id="category-filter"
                value={filterCategory}
                onChange={(e) =>
                  setFilterCategory(
                    e.target.value as
                      | 'all'
                      | 'tikanga'
                      | 'te-reo'
                      | 'whakapapa'
                      | 'manaakitanga'
                      | 'kaitiakitanga'
                      | 'rangatiratanga',
                  )
                }
                aria-label="Filter by cultural category"
              >
                <option value="all">All Categories</option>
                <option value="tikanga">Tikanga (Customs)</option>
                <option value="te-reo">Te Reo (Language)</option>
                <option value="whakapapa">Whakapapa (Genealogy)</option>
                <option value="manaakitanga">Manaakitanga (Hospitality)</option>
                <option value="kaitiakitanga">Kaitiakitanga (Stewardship)</option>
                <option value="rangatiratanga">Rangatiratanga (Leadership)</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="difficulty-filter">Difficulty:</label>
              <select
                id="difficulty-filter"
                value={filterDifficulty}
                onChange={(e) =>
                  setFilterDifficulty(
                    e.target.value as 'all' | 'beginner' | 'intermediate' | 'advanced',
                  )
                }
                aria-label="Filter by difficulty level"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              📊 Grid
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              📋 List
            </button>
          </div>
        </div>

        {/* Modules Display */}
        <div className={`modules-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
          {getFilteredModules().map((module) => (
            <div key={module.id} className="module-card" onClick={() => setSelectedModule(module)}>
              <div className="module-header">
                <div className="module-icon">{getCategoryIcon(module.category)}</div>
                <div className="module-info">
                  <h3>{module.title}</h3>
                  <h4 className="maori-title">{module.maoriTitle}</h4>
                  <div className="module-meta">
                    <span
                      className="category-badge"
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getCategoryColor(module.category) }}
                    >
                      {module.category}
                    </span>
                    <span
                      className="difficulty-badge"
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getDifficultyColor(module.difficulty) }}
                    >
                      {module.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="module-content">
                <p className="module-description">{module.description}</p>

                <div className="module-stats">
                  <div className="stat-item">
                    <span className="stat-label">Duration</span>
                    <span className="stat-value">{module.duration} min</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Completion</span>
                    <span className="stat-value">{module.completionRate}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Engagement</span>
                    <span className="stat-value">{module.studentEngagement}%</span>
                  </div>
                </div>

                <div className="module-outcomes">
                  <h5>Learning Outcomes:</h5>
                  <ul>
                    {module.learningOutcomes.slice(0, 2).map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                    {module.learningOutcomes.length > 2 && (
                      <li className="more-outcomes">+{module.learningOutcomes.length - 2} more</li>
                    )}
                  </ul>
                </div>

                <div className="module-activities">
                  <h5>Activities:</h5>
                  <div className="activity-tags">
                    {module.activities.slice(0, 3).map((activity, index) => (
                      <span key={index} className="activity-tag">
                        {activity}
                      </span>
                    ))}
                    {module.activities.length > 3 && (
                      <span className="more-activities">+{module.activities.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="module-footer">
                <span className="last-updated">
                  Updated: {module.lastUpdated.toLocaleDateString()}
                </span>
                <button className="start-module-btn">Start Module</button>
              </div>
            </div>
          ))}
        </div>

        {/* Module Detail Modal */}
        {selectedModule && (
          <div className="module-modal-overlay" onClick={() => setSelectedModule(null)}>
            <div className="module-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">
                  <span className="modal-icon">{getCategoryIcon(selectedModule.category)}</span>
                  <div>
                    <h2>{selectedModule.title}</h2>
                    <h3 className="modal-maori-title">{selectedModule.maoriTitle}</h3>
                  </div>
                </div>
                <button
                  className="close-modal"
                  onClick={() => setSelectedModule(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="modal-content">
                <div className="modal-description">
                  <p>{selectedModule.description}</p>
                </div>

                <div className="modal-stats">
                  <div className="stat-card">
                    <span className="stat-number">{selectedModule.duration}</span>
                    <span className="stat-label">Minutes</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{selectedModule.completionRate}%</span>
                    <span className="stat-label">Completion Rate</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{selectedModule.culturalAccuracy}%</span>
                    <span className="stat-label">Cultural Accuracy</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{selectedModule.studentEngagement}%</span>
                    <span className="stat-label">Student Engagement</span>
                  </div>
                </div>

                <div className="modal-sections">
                  <div className="section">
                    <h4>Learning Outcomes</h4>
                    <ul>
                      {selectedModule.learningOutcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="section">
                    <h4>Cultural Elements</h4>
                    <div className="element-tags">
                      {selectedModule.culturalElements.map((element, index) => (
                        <span key={index} className="element-tag">
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="section">
                    <h4>Activities</h4>
                    <ul>
                      {selectedModule.activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="section">
                    <h4>Resources</h4>
                    <ul>
                      {selectedModule.resources.map((resource, index) => (
                        <li key={index}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="primary-btn">Start Learning</button>
                  <button className="secondary-btn">Preview Module</button>
                  <button className="secondary-btn">Download Resources</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalLearningModules;
