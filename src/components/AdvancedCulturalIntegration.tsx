import React, { useEffect, useState } from 'react';
import './AdvancedCulturalIntegration.css';

interface CulturalSafetyProtocol {
  id: string;
  name: string;
  maoriName: string;
  description: string;
  status: 'active' | 'pending' | 'review';
  lastUpdated: string;
  compliance: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface CulturalProtocol {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'implemented' | 'draft' | 'review';
  importance: number;
  lastUpdated: string;
  participants: number;
  effectiveness: number;
}

interface IntegrationModule {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'active' | 'development' | 'planned';
  culturalAlignment: number;
  lastUpdated: string;
}

interface CommunityActivity {
  id: string;
  title: string;
  description: string;
  date: string;
  participants: number;
  type: 'workshop' | 'ceremony' | 'discussion' | 'celebration';
  status: 'upcoming' | 'ongoing' | 'completed';
}

const AdvancedCulturalIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('safety');
  const [safetyProtocols, setSafetyProtocols] = useState<CulturalSafetyProtocol[]>([]);
  const [culturalProtocols, setCulturalProtocols] = useState<CulturalProtocol[]>([]);
  const [integrationModules, setIntegrationModules] = useState<IntegrationModule[]>([]);
  const [communityActivities, setCommunityActivities] = useState<CommunityActivity[]>([]);
  const [engagementStats, setEngagementStats] = useState({
    totalParticipants: 0,
    activeProtocols: 0,
    culturalEvents: 0,
    communityGrowth: 0,
  });

  useEffect(() => {
    // Generate mock data
    const generateMockSafetyProtocols = (): CulturalSafetyProtocol[] => [
      {
        id: '1',
        name: 'Cultural Consultation Protocol',
        maoriName: 'Tikanga Whakawhiti Kōrero',
        description:
          'Ensures all educational content undergoes proper cultural consultation with local iwi and cultural experts.',
        status: 'active',
        lastUpdated: '2024-01-15',
        compliance: 95,
        riskLevel: 'low',
      },
      {
        id: '2',
        name: 'Te Reo Māori Integration',
        maoriName: 'Te Reo Māori Whakauru',
        description:
          'Systematic integration of Te Reo Māori throughout all educational materials and interactions.',
        status: 'active',
        lastUpdated: '2024-01-10',
        compliance: 88,
        riskLevel: 'medium',
      },
      {
        id: '3',
        name: 'Cultural Safety Training',
        maoriName: 'Whakangungu Haumaru Tikanga',
        description:
          'Comprehensive training program for all staff on cultural safety and Māori cultural practices.',
        status: 'pending',
        lastUpdated: '2024-01-08',
        compliance: 72,
        riskLevel: 'medium',
      },
      {
        id: '4',
        name: 'Whakapapa Respect Protocol',
        maoriName: 'Tikanga Whakapapa',
        description:
          'Ensures proper respect and understanding of whakapapa (genealogy) in all educational contexts.',
        status: 'review',
        lastUpdated: '2024-01-05',
        compliance: 65,
        riskLevel: 'high',
      },
    ];

    const generateMockCulturalProtocols = (): CulturalProtocol[] => [
      {
        id: '1',
        title: 'Manaakitanga in Education',
        category: 'Cultural Values',
        description:
          'Implementation of manaakitanga (hospitality, kindness) principles in all educational interactions.',
        status: 'implemented',
        importance: 95,
        lastUpdated: '2024-01-15',
        participants: 45,
        effectiveness: 92,
      },
      {
        id: '2',
        title: 'Kaitiakitanga Learning',
        category: 'Environmental',
        description:
          'Teaching and practicing kaitiakitanga (guardianship) of natural resources and cultural heritage.',
        status: 'implemented',
        importance: 88,
        lastUpdated: '2024-01-12',
        participants: 38,
        effectiveness: 87,
      },
      {
        id: '3',
        title: 'Rangatiratanga Leadership',
        category: 'Leadership',
        description:
          'Developing rangatiratanga (leadership) skills and principles in educational leadership.',
        status: 'draft',
        importance: 82,
        lastUpdated: '2024-01-10',
        participants: 25,
        effectiveness: 75,
      },
      {
        id: '4',
        title: 'Whanaungatanga Building',
        category: 'Relationships',
        description:
          'Strengthening whanaungatanga (relationships) between students, teachers, and community.',
        status: 'review',
        importance: 90,
        lastUpdated: '2024-01-08',
        participants: 52,
        effectiveness: 85,
      },
    ];

    const generateMockIntegrationModules = (): IntegrationModule[] => [
      {
        id: '1',
        name: 'Te Reo Māori Curriculum',
        description: 'Comprehensive Te Reo Māori curriculum integration across all subjects.',
        progress: 85,
        status: 'active',
        culturalAlignment: 92,
        lastUpdated: '2024-01-15',
      },
      {
        id: '2',
        name: 'Cultural Assessment Framework',
        description:
          'Assessment framework that incorporates Māori cultural perspectives and values.',
        progress: 72,
        status: 'development',
        culturalAlignment: 88,
        lastUpdated: '2024-01-12',
      },
      {
        id: '3',
        name: 'Digital Cultural Resources',
        description: 'Digital platform for accessing and sharing cultural resources and knowledge.',
        progress: 60,
        status: 'development',
        culturalAlignment: 85,
        lastUpdated: '2024-01-10',
      },
      {
        id: '4',
        name: 'Community Partnership Portal',
        description: 'Portal for managing partnerships with local iwi and cultural organizations.',
        progress: 45,
        status: 'planned',
        culturalAlignment: 90,
        lastUpdated: '2024-01-08',
      },
    ];

    const generateMockCommunityActivities = (): CommunityActivity[] => [
      {
        id: '1',
        title: 'Te Reo Māori Workshop',
        description:
          'Interactive workshop for learning basic Te Reo Māori phrases and cultural context.',
        date: '2024-01-20',
        participants: 35,
        type: 'workshop',
        status: 'upcoming',
      },
      {
        id: '2',
        title: 'Matariki Celebration',
        description:
          'Community celebration of Matariki (Māori New Year) with traditional ceremonies.',
        date: '2024-01-18',
        participants: 120,
        type: 'celebration',
        status: 'ongoing',
      },
      {
        id: '3',
        title: 'Cultural Safety Discussion',
        description: 'Open discussion forum on cultural safety practices in education.',
        date: '2024-01-15',
        participants: 28,
        type: 'discussion',
        status: 'completed',
      },
      {
        id: '4',
        title: 'Whakapapa Ceremony',
        description: 'Traditional ceremony honoring whakapapa and ancestral connections.',
        date: '2024-01-12',
        participants: 45,
        type: 'ceremony',
        status: 'completed',
      },
    ];

    setSafetyProtocols(generateMockSafetyProtocols());
    setCulturalProtocols(generateMockCulturalProtocols());
    setIntegrationModules(generateMockIntegrationModules());
    setCommunityActivities(generateMockCommunityActivities());

    // Calculate engagement stats
    const totalParticipants = communityActivities.reduce(
      (sum, activity) => sum + activity.participants,
      0,
    );
    const activeProtocols = safetyProtocols.filter((p) => p.status === 'active').length;
    const culturalEvents = communityActivities.length;
    const communityGrowth = Math.round((totalParticipants / 100) * 15); // Mock growth calculation

    setEngagementStats({
      totalParticipants,
      activeProtocols,
      culturalEvents,
      communityGrowth,
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'implemented':
        return 'active';
      case 'pending':
      case 'draft':
        return 'pending';
      case 'review':
        return 'review';
      default:
        return 'pending';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return '#4ecdc4';
      case 'medium':
        return '#ffa726';
      case 'high':
        return '#ff6b6b';
      default:
        return '#b0b0b0';
    }
  };

  return (
    <div className="advanced-cultural-integration">
      <div className="cultural-header">
        <h1>Advanced Cultural Integration</h1>
        <p>
          Comprehensive cultural safety protocols, integration systems, and community engagement for
          authentic Māori cultural integration in education
        </p>
      </div>

      <div className="cultural-tabs">
        <button
          className={`cultural-tab ${activeTab === 'safety' ? 'active' : ''}`}
          onClick={() => setActiveTab('safety')}
        >
          🛡️ Cultural Safety
        </button>
        <button
          className={`cultural-tab ${activeTab === 'protocols' ? 'active' : ''}`}
          onClick={() => setActiveTab('protocols')}
        >
          📋 Cultural Protocols
        </button>
        <button
          className={`cultural-tab ${activeTab === 'integration' ? 'active' : ''}`}
          onClick={() => setActiveTab('integration')}
        >
          🔗 Integration Modules
        </button>
        <button
          className={`cultural-tab ${activeTab === 'community' ? 'active' : ''}`}
          onClick={() => setActiveTab('community')}
        >
          👥 Community Engagement
        </button>
      </div>

      <div className="cultural-content">
        {activeTab === 'safety' && (
          <div>
            <h2>Cultural Safety Protocols</h2>
            <div className="cultural-safety-grid">
              {safetyProtocols.map((protocol) => (
                <div key={protocol.id} className="safety-card">
                  <h3>
                    🛡️ {protocol.name}
                    <span className={`safety-status ${getStatusColor(protocol.status)}`}>
                      {protocol.status}
                    </span>
                  </h3>
                  <p style={{ color: '#d0d0d0', marginBottom: '1rem', fontStyle: 'italic' }}>
                    {protocol.maoriName}
                  </p>
                  <p style={{ color: '#b0b0b0', marginBottom: '1rem' }}>{protocol.description}</p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                      Compliance: {protocol.compliance}%
                    </span>
                    <span
                      style={{
                        color: getRiskColor(protocol.riskLevel),
                        fontSize: '0.9rem',
                        fontWeight: '600',
                      }}
                    >
                      Risk: {protocol.riskLevel}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: '0.5rem',
                      color: '#b0b0b0',
                      fontSize: '0.8rem',
                    }}
                  >
                    Updated: {protocol.lastUpdated}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'protocols' && (
          <div>
            <h2>Cultural Protocols</h2>
            <div className="protocols-list">
              {culturalProtocols.map((protocol) => (
                <div key={protocol.id} className="protocol-item">
                  <div className="protocol-header">
                    <span className="protocol-title">{protocol.title}</span>
                    <span className={`protocol-status ${getStatusColor(protocol.status)}`}>
                      {protocol.status}
                    </span>
                  </div>
                  <p className="protocol-description">{protocol.description}</p>
                  <div className="protocol-metrics">
                    <span className="protocol-metric">📊 Importance: {protocol.importance}%</span>
                    <span className="protocol-metric">
                      👥 Participants: {protocol.participants}
                    </span>
                    <span className="protocol-metric">
                      ✅ Effectiveness: {protocol.effectiveness}%
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: '0.5rem',
                      color: '#b0b0b0',
                      fontSize: '0.8rem',
                    }}
                  >
                    Updated: {protocol.lastUpdated}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'integration' && (
          <div>
            <h2>Integration Modules</h2>
            <div className="integration-grid">
              {integrationModules.map((module) => (
                <div key={module.id} className="integration-card">
                  <div className="integration-icon">🔗</div>
                  <h3 className="integration-title">{module.name}</h3>
                  <p className="integration-description">{module.description}</p>
                  <div className="integration-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${module.progress}%` }}></div>
                    </div>
                    <div className="progress-text">{module.progress}% Complete</div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '1rem',
                    }}
                  >
                    <span
                      style={{
                        color: '#4ecdc4',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                      }}
                    >
                      Cultural Alignment: {module.culturalAlignment}%
                    </span>
                    <span
                      style={{
                        color: '#b0b0b0',
                        fontSize: '0.8rem',
                      }}
                    >
                      {module.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div>
            <h2>Community Engagement</h2>
            <div className="engagement-stats">
              <div className="stat-card">
                <div className="stat-number">{engagementStats.totalParticipants}</div>
                <div className="stat-label">Total Participants</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{engagementStats.activeProtocols}</div>
                <div className="stat-label">Active Protocols</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{engagementStats.culturalEvents}</div>
                <div className="stat-label">Cultural Events</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{engagementStats.communityGrowth}%</div>
                <div className="stat-label">Community Growth</div>
              </div>
            </div>

            <div className="engagement-activities">
              {communityActivities.map((activity) => (
                <div key={activity.id} className="activity-card">
                  <div className="activity-header">
                    <span className="activity-title">{activity.title}</span>
                    <span className="activity-date">{activity.date}</span>
                  </div>
                  <p className="activity-description">{activity.description}</p>
                  <div className="activity-participants">
                    👥 {activity.participants} participants • {activity.type} • {activity.status}
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
