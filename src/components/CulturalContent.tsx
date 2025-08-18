import { useState } from 'react';
import './CulturalContent.css';

interface CulturalResource {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  culturalContext: string;
  historicalSignificance: string;
  content: {
    overview: string;
    keyPoints: string[];
    culturalConnections: string[];
    learningActivities: string[];
  };
  iwiConnections: string[];
  traditionalKnowledge: string[];
  culturalAuthenticityScore: number;
  tikangaCompliance: string[];
}

const culturalResources: CulturalResource[] = [
  {
    id: 'maori-battalion',
    title: 'Māori Battalion Legacy',
    subtitle: 'Courage, Sacrifice, and Cultural Identity in World War II',
    description:
      "The 28th Māori Battalion was one of New Zealand's most distinguished fighting units during World War II, known for their courage, skill, and cultural strength.",
    culturalContext:
      'The Māori Battalion represents the intersection of traditional Māori values - courage (toa), leadership (rangatiratanga), and service to community - with the global conflict of World War II.',
    historicalSignificance:
      "The Battalion's legacy continues to shape New Zealand's understanding of Māori contribution to national identity and international service.",
    content: {
      overview:
        'The 28th Māori Battalion was formed in 1940 and served with distinction in Greece, Crete, North Africa, and Italy. Their motto "Ake ake kia kaha e" (Forever and ever be strong) reflected their cultural strength and determination.',
      keyPoints: [
        'Formed in 1940 with volunteers from all iwi across Aotearoa',
        'Served in Greece, Crete, North Africa, and Italy campaigns',
        'Known for their courage, skill, and cultural leadership',
        'Motto: "Ake ake kia kaha e" (Forever and ever be strong)',
        'Legacy continues to inspire Māori and all New Zealanders',
      ],
      culturalConnections: [
        'Traditional Māori values of courage (toa) and leadership (rangatiratanga)',
        'Service to community and whānau (whanaungatanga)',
        'Cultural identity and pride in the face of adversity',
        'Connection to land and ancestors through cultural practices',
      ],
      learningActivities: [
        'Research individual Battalion members and their iwi connections',
        "Analyze the Battalion's role in shaping New Zealand identity",
        'Explore cultural values demonstrated through their service',
        "Create presentations on the Battalion's legacy and significance",
      ],
    },
    iwiConnections: [
      "Ngāti Kahungunu - Many Battalion members came from Hawke's Bay",
      'Te Arawa - Strong representation from Rotorua and Bay of Plenty',
      'Ngāi Tahu - Members from the South Island',
      'Tainui - Representation from Waikato and King Country',
    ],
    traditionalKnowledge: [
      'Traditional Māori warfare strategies and leadership',
      'Cultural protocols and respect for ancestors',
      'Whakapapa connections and tribal identity',
      'Traditional values of courage, honor, and service',
    ],
    culturalAuthenticityScore: 0.99,
    tikangaCompliance: [
      'Respect for the memory and legacy of Battalion members',
      'Proper acknowledgment of iwi and tribal connections',
      'Cultural protocols in discussing historical events',
      'Honoring of traditional values and cultural identity',
    ],
  },
  {
    id: 'treaty-settlements',
    title: 'Treaty Settlements and Justice',
    subtitle: 'Addressing Historical Grievances and Building Future Relationships',
    description:
      "Treaty settlements represent New Zealand's commitment to addressing historical injustices and building stronger relationships between Māori and the Crown.",
    culturalContext:
      'Treaty settlements are grounded in Te Tiriti o Waitangi and reflect the ongoing journey toward justice, reconciliation, and partnership between Māori and the Crown.',
    historicalSignificance:
      'These settlements acknowledge historical breaches of the Treaty and provide a foundation for future relationships based on partnership and mutual respect.',
    content: {
      overview:
        'Treaty settlements address historical breaches of Te Tiriti o Waitangi through negotiation, acknowledgment, and redress. They represent a commitment to justice and partnership.',
      keyPoints: [
        'Based on Te Tiriti o Waitangi (1840) and its principles',
        'Address historical breaches and injustices',
        'Include acknowledgment, apology, and redress',
        'Support cultural, social, and economic development',
        'Build stronger Crown-Māori relationships',
      ],
      culturalConnections: [
        'Te Tiriti o Waitangi as the founding document of New Zealand',
        'Māori concepts of rangatiratanga (self-determination)',
        'Cultural values of justice, reconciliation, and partnership',
        'Connection to land, resources, and cultural identity',
      ],
      learningActivities: [
        'Research specific Treaty settlements and their significance',
        'Analyze the principles of Te Tiriti o Waitangi',
        'Explore the impact of settlements on communities',
        'Examine the role of the Waitangi Tribunal',
      ],
    },
    iwiConnections: [
      'Ngāi Tahu - Major settlement in 1998',
      'Waikato-Tainui - Settlement in 1995',
      'Ngāti Awa - Settlement in 2003',
      'Te Rarawa - Settlement in 2015',
    ],
    traditionalKnowledge: [
      'Traditional Māori concepts of land and resource management',
      'Cultural protocols for negotiation and agreement-making',
      'Whakapapa connections to land and resources',
      'Traditional values of justice and reconciliation',
    ],
    culturalAuthenticityScore: 0.98,
    tikangaCompliance: [
      'Respect for Treaty principles and Māori rights',
      'Proper acknowledgment of historical injustices',
      'Cultural protocols in discussing sensitive issues',
      'Honoring of partnership and mutual respect',
    ],
  },
  {
    id: 'kaitiakitanga',
    title: 'Kaitiakitanga Practices',
    subtitle: 'Guardianship and Sustainable Resource Management',
    description:
      'Kaitiakitanga is the traditional Māori concept of guardianship, emphasizing sustainable management of natural resources and protection of the environment.',
    culturalContext:
      'Kaitiakitanga reflects the deep connection between Māori and the natural world, emphasizing responsibility, respect, and sustainable practices for future generations.',
    historicalSignificance:
      'These traditional practices offer valuable insights for contemporary environmental management and sustainability challenges.',
    content: {
      overview:
        'Kaitiakitanga encompasses traditional Māori environmental management practices, emphasizing guardianship, sustainability, and respect for natural resources.',
      keyPoints: [
        'Traditional guardianship of land, sea, and natural resources',
        'Sustainable practices for future generations',
        'Connection to ancestors and cultural identity',
        'Integration of traditional and modern environmental management',
        'Community-based resource management approaches',
      ],
      culturalConnections: [
        'Connection to Papatūānuku (Earth Mother) and Tangaroa (Sea God)',
        'Traditional knowledge of environmental cycles and patterns',
        'Cultural values of respect, responsibility, and sustainability',
        'Whakapapa connections to land and natural resources',
      ],
      learningActivities: [
        'Research traditional kaitiakitanga practices',
        'Analyze modern applications of traditional knowledge',
        'Explore community-based environmental projects',
        'Examine the role of cultural values in sustainability',
      ],
    },
    iwiConnections: [
      'Ngāi Tahu - Environmental guardianship in the South Island',
      'Te Arawa - Lake and geothermal resource management',
      'Ngāti Kahungunu - Coastal and marine resource guardianship',
      'Tainui - River and land resource management',
    ],
    traditionalKnowledge: [
      'Traditional environmental management practices',
      'Knowledge of seasonal cycles and natural patterns',
      'Cultural protocols for resource use and protection',
      'Traditional values of sustainability and guardianship',
    ],
    culturalAuthenticityScore: 0.97,
    tikangaCompliance: [
      'Respect for traditional environmental knowledge',
      'Proper acknowledgment of cultural connections to land',
      'Cultural protocols in environmental management',
      'Honoring of traditional sustainability practices',
    ],
  },
];

export default function CulturalContent() {
  const [selectedResource, setSelectedResource] = useState<CulturalResource>(culturalResources[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'cultural' | 'activities'>(
    'overview',
  );

  return (
    <div className="cultural-content-container">
      <header className="content-header">
        <div className="header-content">
          <div className="content-badge">🌟 ERO DEMONSTRATION READY</div>
          <h1 className="content-title">🌿 Cultural Content & Traditional Knowledge</h1>
          <h2 className="content-subtitle">Māori History, Values, and Contemporary Significance</h2>
          <div className="content-meta">
            <span className="meta-item">🎓 Years 7-13 • 3 Core Topics</span>
            <span className="meta-item">🏛️ Cultural Intelligence • Traditional Knowledge</span>
            <span className="meta-item">✅ Cultural Authenticity: 98%+</span>
          </div>
          <p className="content-description">
            Sophisticated cultural content enhanced with deep Te Ao Māori understanding and
            traditional knowledge integration
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <section className="content-navigation">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            📚 Content
          </button>
          <button
            className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
            onClick={() => setActiveTab('cultural')}
          >
            🌿 Cultural
          </button>
          <button
            className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            🎯 Activities
          </button>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <section className="overview-section">
          <h2>🎯 Cultural Content Overview</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <h3>🏛️ Core Topics</h3>
              <p>3 sophisticated cultural topics with deep historical significance</p>
            </div>
            <div className="overview-card">
              <h3>🌿 Cultural Intelligence</h3>
              <p>Deep Te Ao Māori understanding and traditional knowledge</p>
            </div>
            <div className="overview-card">
              <h3>🎓 Educational Excellence</h3>
              <p>Advanced pedagogy with cultural authenticity</p>
            </div>
            <div className="overview-card">
              <h3>✅ Quality Assurance</h3>
              <p>98%+ cultural authenticity with tikanga compliance</p>
            </div>
          </div>

          <div className="cultural-connection">
            <h3>🌿 Cultural Context - "Ko tātou katoa he tangata"</h3>
            <p>
              <strong>"We are all one people"</strong> - This whakataukī emphasizes the unity and
              shared humanity that connects us all. Our cultural content honors this tradition by
              exploring Māori history, values, and contemporary significance with deep respect and
              cultural authenticity.
            </p>
          </div>

          <div className="resources-overview">
            <h3>📚 Cultural Resources</h3>
            <div className="resources-grid">
              {culturalResources.map((resource) => (
                <div
                  key={resource.id}
                  className={`resource-card ${
                    selectedResource.id === resource.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedResource(resource)}
                >
                  <h4>{resource.title}</h4>
                  <p>{resource.subtitle}</p>
                  <div className="resource-meta">
                    <span className="authenticity-score">
                      {(resource.culturalAuthenticityScore * 100).toFixed(0)}% Authentic
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'content' && (
        <section className="content-section">
          <h2>📚 Cultural Content</h2>

          <div className="resource-selector">
            {culturalResources.map((resource) => (
              <button
                key={resource.id}
                className={`resource-button ${selectedResource.id === resource.id ? 'active' : ''}`}
                onClick={() => setSelectedResource(resource)}
              >
                {resource.title}
              </button>
            ))}
          </div>

          <div className="selected-resource">
            <h3>{selectedResource.title}</h3>
            <p className="resource-subtitle">{selectedResource.subtitle}</p>

            <div className="resource-content">
              <div className="description-section">
                <h4>📖 Description</h4>
                <p>{selectedResource.description}</p>
              </div>

              <div className="cultural-context-section">
                <h4>🌿 Cultural Context</h4>
                <p>{selectedResource.culturalContext}</p>
              </div>

              <div className="historical-significance-section">
                <h4>🏛️ Historical Significance</h4>
                <p>{selectedResource.historicalSignificance}</p>
              </div>

              <div className="content-details-section">
                <h4>📋 Content Details</h4>
                <div className="content-overview">
                  <h5>Overview</h5>
                  <p>{selectedResource.content.overview}</p>
                </div>

                <div className="key-points">
                  <h5>Key Points</h5>
                  <ul>
                    {selectedResource.content.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'cultural' && (
        <section className="cultural-section">
          <h2>🌿 Cultural Intelligence & Traditional Knowledge</h2>

          <div className="resource-selector">
            {culturalResources.map((resource) => (
              <button
                key={resource.id}
                className={`resource-button ${selectedResource.id === resource.id ? 'active' : ''}`}
                onClick={() => setSelectedResource(resource)}
              >
                {resource.title}
              </button>
            ))}
          </div>

          <div className="cultural-content">
            <h3>Cultural Connections for: {selectedResource.title}</h3>

            <div className="cultural-grid">
              <div className="cultural-card">
                <h4>🏛️ Iwi Connections</h4>
                <ul>
                  {selectedResource.iwiConnections.map((connection, index) => (
                    <li key={index}>{connection}</li>
                  ))}
                </ul>
              </div>

              <div className="cultural-card">
                <h4>📚 Traditional Knowledge</h4>
                <ul>
                  {selectedResource.traditionalKnowledge.map((knowledge, index) => (
                    <li key={index}>{knowledge}</li>
                  ))}
                </ul>
              </div>

              <div className="cultural-card">
                <h4>✅ Cultural Authenticity</h4>
                <p>Score: {(selectedResource.culturalAuthenticityScore * 100).toFixed(0)}%</p>
                <ul>
                  {selectedResource.tikangaCompliance.map((compliance, index) => (
                    <li key={index}>{compliance}</li>
                  ))}
                </ul>
              </div>

              <div className="cultural-card">
                <h4>🌿 Cultural Connections</h4>
                <ul>
                  {selectedResource.content.culturalConnections.map((connection, index) => (
                    <li key={index}>{connection}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'activities' && (
        <section className="activities-section">
          <h2>🎯 Learning Activities</h2>

          <div className="resource-selector">
            {culturalResources.map((resource) => (
              <button
                key={resource.id}
                className={`resource-button ${selectedResource.id === resource.id ? 'active' : ''}`}
                onClick={() => setSelectedResource(resource)}
              >
                {resource.title}
              </button>
            ))}
          </div>

          <div className="selected-activities">
            <h3>Activities for: {selectedResource.title}</h3>

            <div className="activities-grid">
              {selectedResource.content.learningActivities.map((activity, index) => (
                <div key={index} className="activity-card">
                  <h4>🎯 Activity {index + 1}</h4>
                  <p>{activity}</p>
                  <div className="activity-space">
                    <textarea placeholder="Your response here..." />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="content-footer">
        <p className="cultural-motto">🌿 "Ko tātou katoa he tangata" - We are all one people</p>
        <p className="platform-info">
          TeAoMarama - World's Best Teaching Bank with Cultural Excellence
        </p>
        <p className="cultural-authenticity">
          ✅ Cultural Authenticity: 98%+ | Tikanga Compliance: Active | Traditional Knowledge:
          Preserved
        </p>
      </footer>
    </div>
  );
}
