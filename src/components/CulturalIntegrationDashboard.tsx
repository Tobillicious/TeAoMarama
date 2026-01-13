import type {
  AlertCircle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Download,
  Globe,
  Heart,
  Info,
  Languages,
  Search,
  Share2,
  Shield,
  Users,
} from 'lucide-react';
import {} from 'lucide-react';
import React, { useState } from 'react';
// import './CulturalIntegrationDashboard.css';

interface CulturalProtocol {
  id: string;
  title: string;
  description: string;
  category: 'opening' | 'closing' | 'safety' | 'language' | 'ceremony';
  importance: 'essential' | 'important' | 'recommended';
  implementation: string[];
  examples: string[];
  resources: string[];
}

interface CulturalLanguage {
  id: string;
  maori: string;
  english: string;
  pronunciation: string;
  context: string;
  category: 'greeting' | 'closing' | 'respect' | 'learning' | 'celebration';
  usage: string;
}

interface CulturalEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  significance: string;
  activities: string[];
  resources: string[];
  culturalNotes: string;
}

const CulturalIntegrationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'protocols' | 'language' | 'events' | 'safety'>(
    'protocols',
  );
  const [expandedProtocols, setExpandedProtocols] = useState<Set<string>>(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState<CulturalLanguage | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const culturalProtocols: CulturalProtocol[] = [
    {
      id: 'powhiri',
      title: 'Pōwhiri - Traditional Welcome Ceremony',
      description:
        'The traditional Māori welcome ceremony that establishes cultural safety and respect.',
      category: 'opening',
      importance: 'essential',
      implementation: [
        'Begin with karakia (prayer)',
        'Include mihi (greeting) and whakataukī (proverb)',
        'Acknowledge local iwi and whenua',
        'Establish cultural safety protocols',
      ],
      examples: [
        'Karakia: "Whakataka te hau ki te uru, Whakataka te hau ki te tonga"',
        'Mihi: "Tēnā koutou, tēnā koutou, tēnā koutou katoa"',
        'Whakataukī: "Ko te pae tawhiti whāia kia tata, ko te pae tata whakamaua kia tīna"',
      ],
      resources: ['Pōwhiri Guide PDF', 'Karakia Collection', 'Cultural Safety Checklist'],
    },
    {
      id: 'cultural-safety',
      title: 'Cultural Safety Protocols',
      description: 'Essential protocols to ensure all students feel culturally safe and respected.',
      category: 'safety',
      importance: 'essential',
      implementation: [
        'Establish cultural safety agreements',
        'Use inclusive language and examples',
        'Respect cultural boundaries',
        'Provide cultural support resources',
      ],
      examples: [
        'Cultural Safety Agreement: "We respect all cultural perspectives and create a safe space for learning"',
        'Inclusive Language: "When we discuss historical events, we acknowledge multiple perspectives"',
        'Cultural Boundaries: "Students may choose not to participate in certain cultural activities"',
      ],
      resources: [
        'Cultural Safety Guidelines',
        'Inclusive Language Guide',
        'Cultural Support Directory',
      ],
    },
    {
      id: 'whakatauki',
      title: 'Whakataukī Integration',
      description: 'Incorporating Māori proverbs to connect learning with cultural wisdom.',
      category: 'language',
      importance: 'important',
      implementation: [
        'Select relevant whakataukī for lesson themes',
        'Explain cultural context and meaning',
        'Connect to learning objectives',
        'Encourage reflection and discussion',
      ],
      examples: [
        'Learning: "He aha te mea nui o te ao? He tangata, he tangata, he tangata"',
        'Perseverance: "Ka pū te ruha, ka hao te rangatahi"',
        'Unity: "Ehara taku toa i te toa takitahi, engari he toa takitini"',
      ],
      resources: ['Whakataukī Collection', 'Cultural Context Guide', 'Lesson Integration Examples'],
    },
    {
      id: 'closing-ceremony',
      title: 'Cultural Closing Ceremony',
      description: 'Respectful ways to conclude lessons and sessions with cultural acknowledgment.',
      category: 'closing',
      importance: 'recommended',
      implementation: [
        'Summarize key learning points',
        'Acknowledge cultural contributions',
        'End with karakia or reflection',
        'Set intentions for next session',
      ],
      examples: [
        'Reflection: "What cultural insights did we discover today?"',
        'Acknowledgment: "We acknowledge the wisdom shared and connections made"',
        'Closing: "Kia ora koutou, kia ora koutou, kia ora koutou katoa"',
      ],
      resources: [
        'Closing Ceremony Guide',
        'Reflection Prompts',
        'Cultural Acknowledgment Templates',
      ],
    },
  ];

  const culturalLanguage: CulturalLanguage[] = [
    {
      id: 'kia-ora',
      maori: 'Kia ora',
      english: 'Hello, thank you, be well',
      pronunciation: 'Kee-ah or-ah',
      context: 'Universal greeting and expression of goodwill',
      category: 'greeting',
      usage: 'Use as a greeting, thank you, or to express agreement and support.',
    },
    {
      id: 'tena-koutou',
      maori: 'Tēnā koutou',
      english: 'Greetings to you all (3 or more people)',
      pronunciation: 'Teh-nah koh-toh',
      context: 'Formal greeting to a group',
      category: 'greeting',
      usage: 'Use at the beginning of lessons, presentations, or when addressing a class.',
    },
    {
      id: 'whakatauki',
      maori: 'Whakataukī',
      english: 'Proverb, saying, or traditional wisdom',
      pronunciation: 'Fah-kah-tow-kee',
      context: 'Traditional Māori wisdom passed down through generations',
      category: 'learning',
      usage:
        'Use to introduce cultural concepts, inspire reflection, or connect learning to cultural values.',
    },
    {
      id: 'mana',
      maori: 'Mana',
      english: 'Prestige, authority, spiritual power, charisma',
      pronunciation: 'Mah-nah',
      context: 'Core concept in Māori culture',
      category: 'respect',
      usage:
        'Use when discussing respect, authority, or the importance of treating others with dignity.',
    },
    {
      id: 'tino-rangatiratanga',
      maori: 'Tino Rangatiratanga',
      english: 'Self-determination, absolute sovereignty',
      pronunciation: 'Tee-noh rah-ngah-tee-rah-tah-ngah',
      context: 'Fundamental right in Te Tiriti o Waitangi',
      category: 'learning',
      usage:
        'Use when discussing rights, independence, or Māori perspectives on governance and decision-making.',
    },
    {
      id: 'aroha',
      maori: 'Aroha',
      english: 'Love, compassion, empathy, sympathy',
      pronunciation: 'Ah-roh-hah',
      context: 'Core value in Māori culture',
      category: 'celebration',
      usage: 'Use to express care, understanding, or when discussing relationships and community.',
    },
  ];

  const culturalEvents: CulturalEvent[] = [
    {
      id: 'matariki',
      name: 'Matariki - Māori New Year',
      description:
        'The Māori New Year celebration marking the rising of the Pleiades star cluster.',
      date: 'June-July (varies annually)',
      significance:
        'Time for reflection, remembrance, and planning for the future. Celebrates new life, growth, and the connection between people and the natural world.',
      activities: [
        'Star gazing and constellation learning',
        'Reflection on the past year',
        'Planning and goal setting',
        'Cultural storytelling and art',
        'Community feasting and celebration',
      ],
      resources: [
        'Matariki Lesson Plans',
        'Star Chart Activities',
        'Cultural Story Collection',
        'Celebration Guide',
      ],
      culturalNotes:
        'Matariki is a time of great cultural significance. Activities should be respectful and educational, focusing on the cultural and astronomical importance.',
    },
    {
      id: 'waitangi-day',
      name: 'Waitangi Day',
      description: 'Commemorates the signing of Te Tiriti o Waitangi (Treaty of Waitangi) in 1840.',
      date: 'February 6th',
      significance:
        'National day acknowledging the founding document of Aotearoa New Zealand and the partnership between Māori and the Crown.',
      activities: [
        'Treaty education and discussion',
        'Cultural performances and demonstrations',
        'Community discussions on partnership',
        'Historical reflection and learning',
        'Cultural celebration and unity',
      ],
      resources: [
        'Treaty Education Resources',
        'Historical Timeline',
        'Cultural Performance Guide',
        'Discussion Framework',
      ],
      culturalNotes:
        'Approach with cultural sensitivity. Focus on education, understanding, and building bridges between cultures rather than celebration alone.',
    },
    {
      id: 'te-reo-week',
      name: 'Te Wiki o te Reo Māori',
      description: 'Māori Language Week celebrating and promoting the use of te reo Māori.',
      date: 'September (varies annually)',
      significance:
        'Dedicated week to celebrate, learn, and promote the Māori language as a living, vibrant part of New Zealand culture.',
      activities: [
        'Language learning activities',
        'Cultural performances',
        'Community language challenges',
        'Storytelling in te reo',
        'Cultural workshops and demonstrations',
      ],
      resources: [
        'Te Reo Learning Materials',
        'Pronunciation Guides',
        'Cultural Activity Ideas',
        'Community Challenge Templates',
      ],
      culturalNotes:
        'Focus on celebration and learning. Encourage participation while being respectful of different comfort levels with the language.',
    },
  ];

  const toggleProtocol = (id: string) => {
    const newExpanded = new Set(expandedProtocols);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedProtocols(newExpanded);
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'essential':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'important':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'recommended':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'opening':
        return <Globe className="w-4 h-4" />;
      case 'closing':
        return <Award className="w-4 h-4" />;
      case 'safety':
        return <Shield className="w-4 h-4" />;
      case 'language':
        return <Languages className="w-4 h-4" />;
      case 'ceremony':
        return <Users className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const filteredProtocols = culturalProtocols.filter((protocol) => {
    if (selectedCategory !== 'all' && protocol.category !== selectedCategory) return false;
    if (
      searchTerm &&
      !protocol.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !protocol.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const categories = ['all', ...Array.from(new Set(culturalProtocols.map((p) => p.category)))];

  return (
    <div className="cultural-integration-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="dashboard-title">
              <Heart className="title-icon" />
              Cultural Integration Dashboard
            </h1>
            <p className="dashboard-subtitle">
              Integrate Te Ao Māori throughout your teaching practice with cultural protocols,
              language, and cultural safety
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-controls">
        <div className="search-section">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search cultural protocols, language, and events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <label className="filter-label" htmlFor="category-filter">
              Category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all'
                    ? 'All Categories'
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          onClick={() => setActiveTab('protocols')}
          className={`tab-button ${activeTab === 'protocols' ? 'active' : ''}`}
        >
          <Shield className="tab-icon" />
          Cultural Protocols
        </button>
        <button
          onClick={() => setActiveTab('language')}
          className={`tab-button ${activeTab === 'language' ? 'active' : ''}`}
        >
          <Languages className="tab-icon" />
          Te Reo Māori
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
        >
          <Calendar className="tab-icon" />
          Cultural Events
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`tab-button ${activeTab === 'safety' ? 'active' : ''}`}
        >
          <Shield className="tab-icon" />
          Cultural Safety
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'protocols' && (
          <div className="protocols-section">
            <div className="section-header">
              <h2>Cultural Protocols</h2>
              <p>
                Essential cultural protocols to integrate Te Ao Māori into your teaching practice
              </p>
            </div>

            <div className="protocols-grid">
              {filteredProtocols.map((protocol) => (
                <div key={protocol.id} className="protocol-card">
                  <div className="protocol-header">
                    <div className="protocol-icon">{getCategoryIcon(protocol.category)}</div>
                    <div className="protocol-meta">
                      <span
                        className={`importance-badge ${getImportanceColor(protocol.importance)}`}
                      >
                        {protocol.importance.charAt(0).toUpperCase() + protocol.importance.slice(1)}
                      </span>
                      <span className="protocol-category">{protocol.category}</span>
                    </div>
                  </div>

                  <div className="protocol-content">
                    <h3 className="protocol-title">{protocol.title}</h3>
                    <p className="protocol-description">{protocol.description}</p>

                    <button onClick={() => toggleProtocol(protocol.id)} className="expand-button">
                      {expandedProtocols.has(protocol.id) ? (
                        <>
                          <ChevronDown className="expand-icon" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronRight className="expand-icon" />
                          Show Details
                        </>
                      )}
                    </button>
                  </div>

                  {expandedProtocols.has(protocol.id) && (
                    <div className="protocol-details">
                      <div className="detail-section">
                        <h4>Implementation Steps</h4>
                        <ul>
                          {protocol.implementation.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="detail-section">
                        <h4>Examples</h4>
                        <ul>
                          {protocol.examples.map((example, index) => (
                            <li key={index}>{example}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="detail-section">
                        <h4>Resources</h4>
                        <div className="resources-list">
                          {protocol.resources.map((resource, index) => (
                            <button key={index} className="resource-button">
                              <Download className="resource-icon" />
                              {resource}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'language' && (
          <div className="language-section">
            <div className="section-header">
              <h2>Te Reo Māori Integration</h2>
              <p>Essential Māori language phrases and cultural concepts for your classroom</p>
            </div>

            <div className="language-grid">
              {culturalLanguage.map((language) => (
                <div key={language.id} className="language-card">
                  <div className="language-header">
                    <h3 className="language-maori">{language.maori}</h3>
                    <span className="language-category">{language.category}</span>
                  </div>

                  <div className="language-content">
                    <div className="language-translation">
                      <strong>English:</strong> {language.english}
                    </div>
                    <div className="language-pronunciation">
                      <strong>Pronunciation:</strong> {language.pronunciation}
                    </div>
                    <div className="language-context">
                      <strong>Context:</strong> {language.context}
                    </div>
                    <div className="language-usage">
                      <strong>Usage:</strong> {language.usage}
                    </div>
                  </div>

                  <div className="language-actions">
                    <button
                      onClick={() => setSelectedLanguage(language)}
                      className="action-button preview"
                    >
                      <Info className="action-icon" />
                      Learn More
                    </button>
                    <button className="action-button download">
                      <Download className="action-icon" />
                      Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-section">
            <div className="section-header">
              <h2>Cultural Events & Celebrations</h2>
              <p>Important cultural events and how to integrate them into your teaching</p>
            </div>

            <div className="events-grid">
              {culturalEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-header">
                    <Calendar className="event-icon" />
                    <div className="event-meta">
                      <h3 className="event-name">{event.name}</h3>
                      <span className="event-date">{event.date}</span>
                    </div>
                  </div>

                  <div className="event-content">
                    <p className="event-description">{event.description}</p>
                    <div className="event-significance">
                      <strong>Cultural Significance:</strong> {event.significance}
                    </div>

                    <div className="event-activities">
                      <h4>Suggested Activities</h4>
                      <ul>
                        {event.activities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="event-resources">
                      <h4>Available Resources</h4>
                      <div className="resources-list">
                        {event.resources.map((resource, index) => (
                          <button key={index} className="resource-button">
                            <Download className="resource-icon" />
                            {resource}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="event-notes">
                      <h4>Cultural Notes</h4>
                      <p>{event.culturalNotes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="safety-section">
            <div className="section-header">
              <h2>Cultural Safety & Best Practices</h2>
              <p>Essential guidelines to ensure cultural safety and respect in your classroom</p>
            </div>

            <div className="safety-grid">
              <div className="safety-card essential">
                <div className="safety-header">
                  <CheckCircle className="safety-icon" />
                  <h3>Cultural Safety Fundamentals</h3>
                </div>
                <div className="safety-content">
                  <ul>
                    <li>Always acknowledge local iwi and whenua</li>
                    <li>Use inclusive language and examples</li>
                    <li>Respect cultural boundaries and preferences</li>
                    <li>Provide cultural support and resources</li>
                    <li>Create safe spaces for cultural expression</li>
                  </ul>
                </div>
              </div>

              <div className="safety-card important">
                <div className="safety-header">
                  <AlertCircle className="safety-icon" />
                  <h3>Common Pitfalls to Avoid</h3>
                </div>
                <div className="safety-content">
                  <ul>
                    <li>Don't tokenize cultural elements</li>
                    <li>Avoid cultural appropriation</li>
                    <li>Don't make assumptions about cultural knowledge</li>
                    <li>Avoid stereotyping or generalizing</li>
                    <li>Don't force cultural participation</li>
                  </ul>
                </div>
              </div>

              <div className="safety-card recommended">
                <div className="safety-header">
                  <Info className="safety-icon" />
                  <h3>Building Cultural Competency</h3>
                </div>
                <div className="safety-content">
                  <ul>
                    <li>Engage with local Māori communities</li>
                    <li>Attend cultural workshops and events</li>
                    <li>Read and learn about Māori history and culture</li>
                    <li>Practice te reo Māori regularly</li>
                    <li>Seek cultural guidance when needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Language Detail Modal */}
      {selectedLanguage && (
        <div className="language-modal-overlay" onClick={() => setSelectedLanguage(null)}>
          <div className="language-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedLanguage.maori}</h2>
              <button onClick={() => setSelectedLanguage(null)} className="modal-close">
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-section">
                <h3>English Translation</h3>
                <p>{selectedLanguage.english}</p>
              </div>

              <div className="modal-section">
                <h3>Pronunciation</h3>
                <p className="pronunciation">{selectedLanguage.pronunciation}</p>
              </div>

              <div className="modal-section">
                <h3>Cultural Context</h3>
                <p>{selectedLanguage.context}</p>
              </div>

              <div className="modal-section">
                <h3>Usage Guidelines</h3>
                <p>{selectedLanguage.usage}</p>
              </div>

              <div className="modal-section">
                <h3>Category</h3>
                <span className="category-badge">{selectedLanguage.category}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="modal-download">
                <Download className="action-icon" />
                Download Guide
              </button>
              <button className="modal-share">
                <Share2 className="action-icon" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalIntegrationDashboard;
