import React, { useState } from 'react';
import './CulturalIntegrationEnhancer.css';

interface CulturalElement {
  id: string;
  name: string;
  nameTeReo: string;
  description: string;
  descriptionTeReo: string;
  category: 'tikanga' | 'whakapapa' | 'wairua' | 'taiao' | 'reo' | 'mahi';
  icon: string;
  color: string;
  significance: string;
  modernApplication: string;
}

interface CulturalIntegrationEnhancerProps {
  context: 'dashboard' | 'lesson' | 'assessment' | 'resource' | 'general';
  showTeReo?: boolean;
  onCulturalElementClick?: (element: CulturalElement) => void;
}

const CulturalIntegrationEnhancer: React.FC<CulturalIntegrationEnhancerProps> = ({
  context,
  showTeReo = false,
  onCulturalElementClick,
}) => {
  const [activeElement, setActiveElement] = useState<CulturalElement | null>(null);

  const culturalElements: CulturalElement[] = [
    {
      id: 'aroha',
      name: 'Aroha',
      nameTeReo: 'Aroha',
      description: 'Unconditional love, compassion, and care for all beings',
      descriptionTeReo: 'He aroha mutungakore, he ngākau aroha, he manaaki ki ngā mea katoa',
      category: 'wairua',
      icon: '❤️',
      color: '#ef4444',
      significance: 'The foundation of all relationships and learning in Te Ao Māori',
      modernApplication:
        'Creating safe, supportive learning environments where every student feels valued',
    },
    {
      id: 'mana',
      name: 'Mana',
      nameTeReo: 'Mana',
      description: 'Spiritual power, authority, and respect earned through actions',
      descriptionTeReo: 'He kaha wairua, he mana, he whakaute e whiwhi ai mā ngā mahi',
      category: 'wairua',
      icon: '⭐',
      color: '#f59e0b',
      significance: 'The spiritual power that comes from living with integrity and purpose',
      modernApplication:
        'Building student confidence and self-worth through meaningful achievements',
    },
    {
      id: 'whanaungatanga',
      name: 'Whanaungatanga',
      nameTeReo: 'Whanaungatanga',
      description: 'Building and maintaining relationships, family connections',
      descriptionTeReo: 'Te whakatipu me te tiaki i ngā hononga, ngā piringa whānau',
      category: 'tikanga',
      icon: '👥',
      color: '#3b82f6',
      significance: 'The importance of relationships and community in all learning',
      modernApplication: 'Creating collaborative learning environments and peer support systems',
    },
    {
      id: 'kaitiakitanga',
      name: 'Kaitiakitanga',
      nameTeReo: 'Kaitiakitanga',
      description: 'Guardianship and stewardship of the environment and knowledge',
      descriptionTeReo: 'Te tiaki me te manaaki i te taiao me te mātauranga',
      category: 'tikanga',
      icon: '🌿',
      color: '#10b981',
      significance: 'Responsible care for all that sustains us - land, sea, knowledge',
      modernApplication: 'Teaching environmental responsibility and knowledge preservation',
    },
    {
      id: 'rangatiratanga',
      name: 'Rangatiratanga',
      nameTeReo: 'Rangatiratanga',
      description: 'Self-determination, leadership, and autonomy',
      descriptionTeReo: 'Te mana motuhake, te rangatira, me te aukati',
      category: 'tikanga',
      icon: '👑',
      color: '#8b5cf6',
      significance: 'The right and responsibility to lead and make decisions',
      modernApplication: 'Encouraging student voice, choice, and leadership in learning',
    },
    {
      id: 'mātauranga',
      name: 'Mātauranga',
      nameTeReo: 'Mātauranga Māori',
      description: 'Māori knowledge, wisdom, and understanding',
      descriptionTeReo: 'Te mātauranga Māori, te mōhiotanga, me te māramatanga',
      category: 'reo',
      icon: '📚',
      color: '#6366f1',
      significance: 'The body of knowledge passed down through generations',
      modernApplication: 'Integrating traditional knowledge with modern learning approaches',
    },
    {
      id: 'wairua',
      name: 'Wairua',
      nameTeReo: 'Wairua',
      description: 'Spiritual essence, the life force within all things',
      descriptionTeReo: 'Te wairua, te mauri o ngā mea katoa',
      category: 'wairua',
      icon: '✨',
      color: '#ec4899',
      significance: 'The spiritual dimension that connects all living things',
      modernApplication: 'Honoring the whole person - mind, body, and spirit in learning',
    },
    {
      id: 'taiao',
      name: 'Taiao',
      nameTeReo: 'Taiao',
      description: 'The natural world, environment, and all living things',
      descriptionTeReo: 'Te ao tūroa, te taiao, me ngā mea ora katoa',
      category: 'taiao',
      icon: '🌍',
      color: '#059669',
      significance: 'Our connection to and responsibility for the natural world',
      modernApplication: 'Learning through nature and understanding environmental relationships',
    },
  ];

  const getContextualElements = () => {
    switch (context) {
      case 'dashboard':
        return culturalElements.filter((el) =>
          ['aroha', 'mana', 'whanaungatanga', 'rangatiratanga'].includes(el.id),
        );
      case 'lesson':
        return culturalElements.filter((el) =>
          ['mātauranga', 'kaitiakitanga', 'taiao', 'wairua'].includes(el.id),
        );
      case 'assessment':
        return culturalElements.filter((el) =>
          ['mana', 'rangatiratanga', 'aroha', 'mātauranga'].includes(el.id),
        );
      case 'resource':
        return culturalElements.filter((el) =>
          ['kaitiakitanga', 'mātauranga', 'taiao', 'wairua'].includes(el.id),
        );
      default:
        return culturalElements.slice(0, 4);
    }
  };

  const handleElementClick = (element: CulturalElement) => {
    setActiveElement(element);
    onCulturalElementClick?.(element);
  };

  const contextualElements = getContextualElements();

  return (
    <div className="cultural-integration-enhancer">
      <div className="cultural-header">
        <h3 className="cultural-title">
          {showTeReo ? 'Ngā Mātāpono Māori' : 'Te Ao Māori Principles'}
        </h3>
        <p className="cultural-subtitle">
          {showTeReo
            ? 'He mātāpono e arahina ai tātou i ngā mahi katoa'
            : 'Principles that guide us in all our learning and teaching'}
        </p>
      </div>

      <div className="cultural-elements-grid">
        {contextualElements.map((element) => (
          <div
            key={element.id}
            className={`cultural-element ${activeElement?.id === element.id ? 'active' : ''}`}
            onClick={() => handleElementClick(element)}
            data-color={element.color}
          >
            <div className="element-icon">
              <span className="emoji-icon">{element.icon}</span>
            </div>
            <div className="element-content">
              <h4 className="element-name">{showTeReo ? element.nameTeReo : element.name}</h4>
              <p className="element-description">
                {showTeReo ? element.descriptionTeReo : element.description}
              </p>
              <div className="element-category">
                <span className="category-badge">{element.category}</span>
              </div>
            </div>
            <div className="element-actions">
              <button
                className="learn-more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveElement(element);
                }}
              >
                {showTeReo ? 'Ako' : 'Learn More'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeElement && (
        <div className="cultural-detail-modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-icon">
                <span className="emoji-icon">{activeElement.icon}</span>
              </div>
              <div className="modal-title">
                <h3>{showTeReo ? activeElement.nameTeReo : activeElement.name}</h3>
                <p className="modal-category">{activeElement.category}</p>
              </div>
              <button className="close-btn" onClick={() => setActiveElement(null)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="significance-section">
                <h4>{showTeReo ? 'Te Hiranga' : 'Significance'}</h4>
                <p>{activeElement.significance}</p>
              </div>

              <div className="application-section">
                <h4>{showTeReo ? 'Te Whakamahinga' : 'Modern Application'}</h4>
                <p>{activeElement.modernApplication}</p>
              </div>

              <div className="cultural-connections">
                <h4>{showTeReo ? 'Ngā Hononga' : 'Cultural Connections'}</h4>
                <div className="connections-grid">
                  {culturalElements
                    .filter(
                      (el) => el.id !== activeElement.id && el.category === activeElement.category,
                    )
                    .slice(0, 3)
                    .map((related) => (
                      <div
                        key={related.id}
                        className="connection-item"
                        onClick={() => setActiveElement(related)}
                      >
                        <span className="connection-icon">{related.icon}</span>
                        <span className="connection-name">
                          {showTeReo ? related.nameTeReo : related.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="cultural-footer">
        <button
          className="toggle-te-reo-btn"
          onClick={() => {
            // This would need to be passed as a prop from parent component
            console.log('Toggle Te Reo clicked');
          }}
        >
          {showTeReo ? 'Switch to English' : 'Te Reo Māori'}
        </button>
        <p className="cultural-note">
          {showTeReo
            ? 'He mātāpono tēnei e arahina ai tātou i ngā mahi katoa'
            : 'These principles guide us in all our learning and teaching'}
        </p>
      </div>
    </div>
  );
};

export default CulturalIntegrationEnhancer;
