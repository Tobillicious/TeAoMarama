import React, { useEffect, useState } from 'react';
import './AdvancedCulturalIntegration.css';

interface CulturalProtocol {
  id: string;
  name: string;
  maoriName: string;
  description: string;
  category: 'tikanga' | 'manaakitanga' | 'kaitiakitanga' | 'rangatiratanga' | 'whakapapa' | 'mana';
  importance: 'critical' | 'high' | 'medium' | 'low';
  implementationStatus: 'active' | 'pending' | 'review' | 'archived';
  culturalAccuracy: number;
  communityApproval: number;
  lastUpdated: Date;
  guidelines: string[];
  examples: string[];
}

interface CulturalSafety {
  id: string;
  aspect: string;
  description: string;
  safetyLevel: 'excellent' | 'good' | 'warning' | 'critical';
  riskFactors: string[];
  mitigationStrategies: string[];
  lastAssessment: Date;
  nextReview: Date;
}

interface CommunityEngagement {
  id: string;
  initiative: string;
  description: string;
  status: 'active' | 'planned' | 'completed' | 'paused';
  participants: number;
  impact: 'high' | 'medium' | 'low';
  culturalValue: number;
  startDate: Date;
  endDate?: Date;
  outcomes: string[];
}

const AdvancedCulturalIntegration: React.FC = () => {
  const [protocols, setProtocols] = useState<CulturalProtocol[]>([]);
  const [safetyMeasures, setSafetyMeasures] = useState<CulturalSafety[]>([]);
  const [communityInitiatives, setCommunityInitiatives] = useState<CommunityEngagement[]>([]);
  const [selectedView, setSelectedView] = useState<
    'protocols' | 'safety' | 'community' | 'overview'
  >('overview');
  const [filterCategory, setFilterCategory] = useState<
    'all' | 'tikanga' | 'manaakitanga' | 'kaitiakitanga' | 'rangatiratanga' | 'whakapapa' | 'mana'
  >('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    initializeCulturalData();
  }, []);

  const initializeCulturalData = () => {
    // Initialize cultural protocols
    const initialProtocols: CulturalProtocol[] = [
      {
        id: 'karakia-protocols',
        name: 'Karakia and Prayer Protocols',
        maoriName: 'Ngā Tikanga Karakia',
        description: 'Guidelines for appropriate use of karakia in educational settings',
        category: 'tikanga',
        importance: 'critical',
        implementationStatus: 'active',
        culturalAccuracy: 98,
        communityApproval: 95,
        lastUpdated: new Date(),
        guidelines: [
          'Always seek permission before using karakia',
          'Understand the context and meaning',
          'Respect the spiritual significance',
          'Include appropriate cultural context',
        ],
        examples: [
          'Opening karakia for meetings',
          'Blessing of new facilities',
          'Cultural ceremonies and events',
        ],
      },
      {
        id: 'manaakitanga-practices',
        name: 'Manaakitanga Hospitality Practices',
        maoriName: 'Ngā Tikanga Manaakitanga',
        description: 'Comprehensive hospitality and care protocols',
        category: 'manaakitanga',
        importance: 'high',
        implementationStatus: 'active',
        culturalAccuracy: 96,
        communityApproval: 92,
        lastUpdated: new Date(),
        guidelines: [
          'Create welcoming environments',
          'Provide appropriate hospitality',
          'Show respect and care for visitors',
          'Maintain cultural protocols',
        ],
        examples: [
          'Visitor welcome ceremonies',
          'Food and refreshment protocols',
          'Cultural accommodation practices',
        ],
      },
      {
        id: 'kaitiakitanga-stewardship',
        name: 'Kaitiakitanga Environmental Stewardship',
        maoriName: 'Ngā Tikanga Kaitiakitanga',
        description: 'Environmental and resource stewardship protocols',
        category: 'kaitiakitanga',
        importance: 'high',
        implementationStatus: 'active',
        culturalAccuracy: 94,
        communityApproval: 88,
        lastUpdated: new Date(),
        guidelines: [
          'Respect and protect natural resources',
          'Practice sustainable resource use',
          'Maintain environmental balance',
          'Honor ancestral connections to land',
        ],
        examples: [
          'Environmental education programs',
          'Sustainable resource management',
          'Cultural land use practices',
        ],
      },
      {
        id: 'rangatiratanga-leadership',
        name: 'Rangatiratanga Leadership Principles',
        maoriName: 'Ngā Tikanga Rangatiratanga',
        description: 'Leadership and governance protocols',
        category: 'rangatiratanga',
        importance: 'high',
        implementationStatus: 'active',
        culturalAccuracy: 93,
        communityApproval: 90,
        lastUpdated: new Date(),
        guidelines: [
          'Lead with cultural wisdom',
          'Serve the community with integrity',
          'Make decisions with cultural consideration',
          'Maintain cultural authority',
        ],
        examples: [
          'Cultural leadership development',
          'Community decision-making processes',
          'Cultural governance structures',
        ],
      },
      {
        id: 'whakapapa-connections',
        name: 'Whakapapa Genealogical Connections',
        maoriName: 'Ngā Tikanga Whakapapa',
        description: 'Genealogical and ancestral connection protocols',
        category: 'whakapapa',
        importance: 'medium',
        implementationStatus: 'active',
        culturalAccuracy: 97,
        communityApproval: 85,
        lastUpdated: new Date(),
        guidelines: [
          'Respect genealogical knowledge',
          'Maintain family connections',
          'Honor ancestral wisdom',
          'Preserve cultural heritage',
        ],
        examples: [
          'Family history research',
          'Ancestral knowledge sharing',
          'Cultural heritage preservation',
        ],
      },
      {
        id: 'mana-respect',
        name: 'Mana and Cultural Respect',
        maoriName: 'Ngā Tikanga Mana',
        description: 'Protocols for maintaining and respecting mana',
        category: 'mana',
        importance: 'critical',
        implementationStatus: 'active',
        culturalAccuracy: 99,
        communityApproval: 96,
        lastUpdated: new Date(),
        guidelines: [
          'Always respect individual and collective mana',
          'Maintain cultural dignity',
          'Honor cultural authority',
          'Practice cultural humility',
        ],
        examples: [
          'Cultural respect training',
          'Mana-enhancing practices',
          'Cultural dignity protocols',
        ],
      },
    ];

    // Initialize cultural safety measures
    const initialSafety: CulturalSafety[] = [
      {
        id: 'cultural-appropriation',
        aspect: 'Cultural Appropriation Prevention',
        description:
          'Measures to prevent cultural appropriation and ensure respectful use of cultural elements',
        safetyLevel: 'excellent',
        riskFactors: [
          'Unauthorized use of cultural symbols',
          'Misrepresentation of cultural practices',
          'Commercial exploitation of cultural elements',
        ],
        mitigationStrategies: [
          'Cultural consultation protocols',
          'Permission-based usage systems',
          'Cultural accuracy validation',
          'Community feedback mechanisms',
        ],
        lastAssessment: new Date(),
        nextReview: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'cultural-sensitivity',
        aspect: 'Cultural Sensitivity Training',
        description: 'Ongoing training and development for cultural sensitivity',
        safetyLevel: 'good',
        riskFactors: [
          'Unconscious cultural bias',
          'Lack of cultural understanding',
          'Inappropriate cultural assumptions',
        ],
        mitigationStrategies: [
          'Regular cultural competency training',
          'Cultural awareness workshops',
          'Ongoing cultural education',
          'Cultural mentorship programs',
        ],
        lastAssessment: new Date(),
        nextReview: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'community-consultation',
        aspect: 'Community Consultation Protocols',
        description: 'Ensuring proper community consultation and engagement',
        safetyLevel: 'excellent',
        riskFactors: [
          'Insufficient community input',
          'Token consultation practices',
          'Lack of meaningful engagement',
        ],
        mitigationStrategies: [
          'Structured consultation processes',
          'Community partnership frameworks',
          'Regular community feedback sessions',
          'Cultural advisory committees',
        ],
        lastAssessment: new Date(),
        nextReview: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'cultural-representation',
        aspect: 'Cultural Representation Accuracy',
        description: 'Ensuring accurate and respectful cultural representation',
        safetyLevel: 'good',
        riskFactors: [
          'Stereotypical representations',
          'Inaccurate cultural information',
          'Misleading cultural portrayals',
        ],
        mitigationStrategies: [
          'Cultural accuracy review processes',
          'Expert cultural validation',
          'Community representation guidelines',
          'Cultural content standards',
        ],
        lastAssessment: new Date(),
        nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    ];

    // Initialize community engagement initiatives
    const initialInitiatives: CommunityEngagement[] = [
      {
        id: 'cultural-education-program',
        initiative: 'Cultural Education Enhancement Program',
        description: 'Comprehensive cultural education program for students and staff',
        status: 'active',
        participants: 450,
        impact: 'high',
        culturalValue: 95,
        startDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
        outcomes: [
          'Increased cultural awareness among participants',
          'Enhanced cultural competency skills',
          'Improved cultural safety practices',
          'Stronger community connections',
        ],
      },
      {
        id: 'community-partnership',
        initiative: 'Community Partnership Development',
        description: 'Building strong partnerships with local Māori communities',
        status: 'active',
        participants: 120,
        impact: 'high',
        culturalValue: 92,
        startDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
        outcomes: [
          'Established community advisory groups',
          'Regular community consultation processes',
          'Shared cultural knowledge exchange',
          'Enhanced community relationships',
        ],
      },
      {
        id: 'cultural-celebration',
        initiative: 'Cultural Celebration Events',
        description: 'Regular cultural celebration and recognition events',
        status: 'active',
        participants: 800,
        impact: 'medium',
        culturalValue: 88,
        startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        outcomes: [
          'Increased cultural visibility',
          'Enhanced cultural pride',
          'Improved cultural understanding',
          'Strengthened cultural identity',
        ],
      },
      {
        id: 'mentorship-program',
        initiative: 'Cultural Mentorship Program',
        description: 'Cultural mentorship and guidance program',
        status: 'active',
        participants: 60,
        impact: 'high',
        culturalValue: 94,
        startDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
        outcomes: [
          'Personal cultural development',
          'Enhanced cultural leadership skills',
          'Improved cultural knowledge transfer',
          'Strengthened cultural networks',
        ],
      },
    ];

    setProtocols(initialProtocols);
    setSafetyMeasures(initialSafety);
    setCommunityInitiatives(initialInitiatives);
  };

  const getFilteredProtocols = () => {
    let filtered = [...protocols];

    if (filterCategory !== 'all') {
      filtered = filtered.filter((protocol) => protocol.category === filterCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (protocol) =>
          protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          protocol.maoriName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          protocol.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tikanga':
        return '🌿';
      case 'manaakitanga':
        return '🤝';
      case 'kaitiakitanga':
        return '🌱';
      case 'rangatiratanga':
        return '👑';
      case 'whakapapa':
        return '🌳';
      case 'mana':
        return '✨';
      default:
        return '⚙️';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return '#ef4444';
      case 'high':
        return '#f59e0b';
      case 'medium':
        return '#3b82f6';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'excellent':
        return '#10b981';
      case 'good':
        return '#3b82f6';
      case 'warning':
      case 'pending':
        return '#f59e0b';
      case 'critical':
      case 'review':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="advanced-cultural-integration">
      <div className="integration-container">
        <div className="integration-header">
          <h1>🌿 Advanced Cultural Integration</h1>
          <p>Comprehensive Te Ao Māori integration, cultural safety, and community engagement</p>
        </div>

        {/* Navigation Tabs */}
        <div className="integration-tabs">
          <button
            className={`tab-btn ${selectedView === 'overview' ? 'active' : ''}`}
            onClick={() => setSelectedView('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`tab-btn ${selectedView === 'protocols' ? 'active' : ''}`}
            onClick={() => setSelectedView('protocols')}
          >
            📋 Cultural Protocols
          </button>
          <button
            className={`tab-btn ${selectedView === 'safety' ? 'active' : ''}`}
            onClick={() => setSelectedView('safety')}
          >
            🛡️ Cultural Safety
          </button>
          <button
            className={`tab-btn ${selectedView === 'community' ? 'active' : ''}`}
            onClick={() => setSelectedView('community')}
          >
            🤝 Community Engagement
          </button>
        </div>

        {/* Overview Section */}
        {selectedView === 'overview' && (
          <div className="overview-section">
            <div className="overview-stats">
              <div className="stat-card primary">
                <h3>Cultural Integration Score</h3>
                <div className="stat-value">96.2%</div>
                <div className="stat-trend up">↗️ +2.1%</div>
                <div className="stat-label">Overall Integration</div>
              </div>
              <div className="stat-card">
                <h3>Active Protocols</h3>
                <div className="stat-value">
                  {protocols.filter((p) => p.implementationStatus === 'active').length}
                </div>
                <div className="stat-trend stable">→ {protocols.length} Total</div>
                <div className="stat-label">Cultural Protocols</div>
              </div>
              <div className="stat-card">
                <h3>Safety Level</h3>
                <div className="stat-value">Excellent</div>
                <div className="stat-trend up">↗️ 98%</div>
                <div className="stat-label">Cultural Safety</div>
              </div>
              <div className="stat-card">
                <h3>Community Engagement</h3>
                <div className="stat-value">
                  {communityInitiatives.filter((c) => c.status === 'active').length}
                </div>
                <div className="stat-trend up">↗️ Active</div>
                <div className="stat-label">Initiatives</div>
              </div>
            </div>

            <div className="overview-grid">
              <div className="overview-card">
                <h3>🎯 Cultural Excellence Highlights</h3>
                <ul>
                  <li>✅ 98% cultural accuracy in protocols</li>
                  <li>✅ 96% community approval rating</li>
                  <li>✅ Excellent cultural safety standards</li>
                  <li>✅ Active community engagement</li>
                  <li>✅ Comprehensive cultural integration</li>
                </ul>
              </div>
              <div className="overview-card">
                <h3>🌿 Cultural Categories</h3>
                <div className="category-breakdown">
                  {[
                    'tikanga',
                    'manaakitanga',
                    'kaitiakitanga',
                    'rangatiratanga',
                    'whakapapa',
                    'mana',
                  ].map((category) => (
                    <div key={category} className="category-item">
                      <span className="category-icon">{getCategoryIcon(category)}</span>
                      <span className="category-name">{category}</span>
                      <span className="category-count">
                        {protocols.filter((p) => p.category === category).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Protocols Section */}
        {selectedView === 'protocols' && (
          <div className="protocols-section">
            <div className="protocols-controls">
              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Search protocols..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="category-filter">
                <select
                  value={filterCategory}
                  onChange={(e) =>
                    setFilterCategory(
                      e.target.value as
                        | 'all'
                        | 'tikanga'
                        | 'manaakitanga'
                        | 'kaitiakitanga'
                        | 'rangatiratanga'
                        | 'whakapapa'
                        | 'mana',
                    )
                  }
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  <option value="tikanga">Tikanga</option>
                  <option value="manaakitanga">Manaakitanga</option>
                  <option value="kaitiakitanga">Kaitiakitanga</option>
                  <option value="rangatiratanga">Rangatiratanga</option>
                  <option value="whakapapa">Whakapapa</option>
                  <option value="mana">Mana</option>
                </select>
              </div>
            </div>

            <div className="protocols-grid">
              {getFilteredProtocols().map((protocol) => (
                <div key={protocol.id} className="protocol-card">
                  <div className="protocol-header">
                    <div className="protocol-icon">{getCategoryIcon(protocol.category)}</div>
                    <div className="protocol-info">
                      <h3>{protocol.name}</h3>
                      <h4 className="maori-name">{protocol.maoriName}</h4>
                      <div className="protocol-meta">
                        <span
                          className="importance-badge"
                          style={{ backgroundColor: getImportanceColor(protocol.importance) }}
                        >
                          {protocol.importance}
                        </span>
                        <span
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(protocol.implementationStatus) }}
                        >
                          {protocol.implementationStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="protocol-content">
                    <p className="protocol-description">{protocol.description}</p>

                    <div className="protocol-metrics">
                      <div className="metric">
                        <span>Cultural Accuracy</span>
                        <span className="metric-value">{protocol.culturalAccuracy}%</span>
                      </div>
                      <div className="metric">
                        <span>Community Approval</span>
                        <span className="metric-value">{protocol.communityApproval}%</span>
                      </div>
                    </div>

                    <div className="protocol-guidelines">
                      <h4>Guidelines</h4>
                      <ul>
                        {protocol.guidelines.map((guideline, index) => (
                          <li key={index}>{guideline}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="protocol-examples">
                      <h4>Examples</h4>
                      <ul>
                        {protocol.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="protocol-footer">
                    <span className="last-updated">
                      Last updated: {protocol.lastUpdated.toLocaleDateString()}
                    </span>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety Section */}
        {selectedView === 'safety' && (
          <div className="safety-section">
            <div className="safety-grid">
              {safetyMeasures.map((safety) => (
                <div key={safety.id} className="safety-card">
                  <div className="safety-header">
                    <h3>{safety.aspect}</h3>
                    <span
                      className="safety-level"
                      style={{ backgroundColor: getStatusColor(safety.safetyLevel) }}
                    >
                      {safety.safetyLevel}
                    </span>
                  </div>

                  <div className="safety-content">
                    <p className="safety-description">{safety.description}</p>

                    <div className="safety-details">
                      <div className="risk-factors">
                        <h4>Risk Factors</h4>
                        <ul>
                          {safety.riskFactors.map((factor, index) => (
                            <li key={index}>{factor}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mitigation-strategies">
                        <h4>Mitigation Strategies</h4>
                        <ul>
                          {safety.mitigationStrategies.map((strategy, index) => (
                            <li key={index}>{strategy}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="safety-timeline">
                      <div className="timeline-item">
                        <span>Last Assessment</span>
                        <span>{safety.lastAssessment.toLocaleDateString()}</span>
                      </div>
                      <div className="timeline-item">
                        <span>Next Review</span>
                        <span>{safety.nextReview.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="safety-actions">
                    <button className="action-btn">Update Assessment</button>
                    <button className="action-btn">View Report</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Section */}
        {selectedView === 'community' && (
          <div className="community-section">
            <div className="community-grid">
              {communityInitiatives.map((initiative) => (
                <div key={initiative.id} className="community-card">
                  <div className="community-header">
                    <h3>{initiative.initiative}</h3>
                    <span
                      className="initiative-status"
                      style={{ backgroundColor: getStatusColor(initiative.status) }}
                    >
                      {initiative.status}
                    </span>
                  </div>

                  <div className="community-content">
                    <p className="initiative-description">{initiative.description}</p>

                    <div className="initiative-metrics">
                      <div className="metric">
                        <span>Participants</span>
                        <span className="metric-value">{initiative.participants}</span>
                      </div>
                      <div className="metric">
                        <span>Impact Level</span>
                        <span className="metric-value">{initiative.impact}</span>
                      </div>
                      <div className="metric">
                        <span>Cultural Value</span>
                        <span className="metric-value">{initiative.culturalValue}%</span>
                      </div>
                    </div>

                    <div className="initiative-timeline">
                      <div className="timeline-item">
                        <span>Start Date</span>
                        <span>{initiative.startDate.toLocaleDateString()}</span>
                      </div>
                      {initiative.endDate && (
                        <div className="timeline-item">
                          <span>End Date</span>
                          <span>{initiative.endDate.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="initiative-outcomes">
                      <h4>Outcomes</h4>
                      <ul>
                        {initiative.outcomes.map((outcome, index) => (
                          <li key={index}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="community-actions">
                    <button className="action-btn">View Details</button>
                    <button className="action-btn">Update Progress</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedCulturalIntegration;
