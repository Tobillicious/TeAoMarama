import React, { useState, useEffect } from 'react';

interface ContentPiece {
  id: string;
  title: string;
  type: 'lesson' | 'activity' | 'assessment' | 'resource' | 'cultural';
  subject: string;
  yearLevel: string;
  culturalElements: string[];
  educationalValue: number;
  culturalCompliance: number;
  engagementScore: number;
  lastUpdated: Date;
  version: number;
  status: 'draft' | 'review' | 'published' | 'archived';
  aiEnhancements: string[];
  communityFeedback: number;
}

interface EvolutionMetrics {
  totalContent: number;
  publishedContent: number;
  averageEducationalValue: number;
  averageCulturalCompliance: number;
  totalEngagement: number;
  aiEnhancements: number;
  communityContributions: number;
}

const EducationalContentEvolutionSystem: React.FC = () => {
  const [content, setContent] = useState<ContentPiece[]>([]);
  const [metrics, setMetrics] = useState<EvolutionMetrics>({
    totalContent: 0,
    publishedContent: 0,
    averageEducationalValue: 0,
    averageCulturalCompliance: 0,
    totalEngagement: 0,
    aiEnhancements: 0,
    communityContributions: 0,
  });
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isEvolving, setIsEvolving] = useState(true);

  useEffect(() => {
    initializeContentSystem();
    startEvolution();
  }, []);

  const initializeContentSystem = () => {
    const initialContent: ContentPiece[] = [
      {
        id: 'content-1',
        title: 'Te Reo Māori Fundamentals',
        type: 'lesson',
        subject: 'Languages',
        yearLevel: 'Year 7-8',
        culturalElements: ['tikanga', 'mana', 'whakapapa'],
        educationalValue: 95,
        culturalCompliance: 98,
        engagementScore: 87,
        lastUpdated: new Date(Date.now() - 3600000),
        version: 3,
        status: 'published',
        aiEnhancements: ['pronunciation-guide', 'cultural-context', 'interactive-exercises'],
        communityFeedback: 4.8,
      },
      {
        id: 'content-2',
        title: 'Traditional Māori Arts & Crafts',
        type: 'activity',
        subject: 'Arts',
        yearLevel: 'Year 5-6',
        culturalElements: ['manaakitanga', 'kotahitanga', 'whanaungatanga'],
        educationalValue: 92,
        culturalCompliance: 96,
        engagementScore: 94,
        lastUpdated: new Date(Date.now() - 7200000),
        version: 2,
        status: 'published',
        aiEnhancements: ['step-by-step-guides', 'cultural-stories', 'safety-protocols'],
        communityFeedback: 4.9,
      },
      {
        id: 'content-3',
        title: 'Māori History Timeline',
        type: 'resource',
        subject: 'Social Studies',
        yearLevel: 'Year 9-10',
        culturalElements: ['whakapapa', 'whenua', 'moana'],
        educationalValue: 89,
        culturalCompliance: 94,
        engagementScore: 82,
        lastUpdated: new Date(Date.now() - 1800000),
        version: 4,
        status: 'review',
        aiEnhancements: ['interactive-timeline', 'cultural-context', 'multimedia-integration'],
        communityFeedback: 4.6,
      },
      {
        id: 'content-4',
        title: 'Cultural Safety Assessment',
        type: 'assessment',
        subject: 'Health',
        yearLevel: 'Year 11-13',
        culturalElements: ['tapu', 'noa', 'manaakitanga'],
        educationalValue: 97,
        culturalCompliance: 99,
        engagementScore: 91,
        lastUpdated: new Date(Date.now() - 900000),
        version: 2,
        status: 'published',
        aiEnhancements: ['scenario-based-questions', 'cultural-validation', 'feedback-system'],
        communityFeedback: 4.7,
      },
      {
        id: 'content-5',
        title: 'Matariki Celebration Guide',
        type: 'cultural',
        subject: 'Cultural Studies',
        yearLevel: 'All Levels',
        culturalElements: ['tikanga', 'mana', 'whakapapa', 'whenua'],
        educationalValue: 93,
        culturalCompliance: 97,
        engagementScore: 96,
        lastUpdated: new Date(Date.now() - 2700000),
        version: 1,
        status: 'published',
        aiEnhancements: ['celebration-activities', 'cultural-protocols', 'family-guides'],
        communityFeedback: 4.9,
      },
      {
        id: 'content-6',
        title: 'Sustainable Practices in Te Ao Māori',
        type: 'lesson',
        subject: 'Science',
        yearLevel: 'Year 9-10',
        culturalElements: ['kaitiakitanga', 'whenua', 'moana', 'ngahere'],
        educationalValue: 88,
        culturalCompliance: 95,
        engagementScore: 85,
        lastUpdated: new Date(Date.now() - 5400000),
        version: 2,
        status: 'draft',
        aiEnhancements: ['environmental-data', 'cultural-perspectives', 'action-plans'],
        communityFeedback: 4.5,
      },
    ];

    setContent(initialContent);
    updateMetrics(initialContent);
  };

  const updateMetrics = (contentList: ContentPiece[]) => {
    const publishedContent = contentList.filter(c => c.status === 'published');
    const averageEducationalValue = contentList.reduce((sum, c) => sum + c.educationalValue, 0) / contentList.length;
    const averageCulturalCompliance = contentList.reduce((sum, c) => sum + c.culturalCompliance, 0) / contentList.length;
    const totalEngagement = contentList.reduce((sum, c) => sum + c.engagementScore, 0);
    const totalAIEnhancements = contentList.reduce((sum, c) => sum + c.aiEnhancements.length, 0);
    const totalCommunityFeedback = contentList.reduce((sum, c) => sum + c.communityFeedback, 0);

    setMetrics({
      totalContent: contentList.length,
      publishedContent: publishedContent.length,
      averageEducationalValue: Math.round(averageEducationalValue),
      averageCulturalCompliance: Math.round(averageCulturalCompliance),
      totalEngagement: totalEngagement,
      aiEnhancements: totalAIEnhancements,
      communityContributions: Math.round(totalCommunityFeedback * 10) / 10,
    });
  };

  const startEvolution = () => {
    const evolutionInterval = setInterval(() => {
      setContent(prevContent => {
        return prevContent.map(contentPiece => {
          // Simulate content evolution
          if (Math.random() > 0.7) {
            const newEducationalValue = Math.min(100, contentPiece.educationalValue + Math.floor(Math.random() * 3) - 1);
            const newCulturalCompliance = Math.min(100, contentPiece.culturalCompliance + Math.floor(Math.random() * 2));
            const newEngagementScore = Math.min(100, contentPiece.engagementScore + Math.floor(Math.random() * 2) - 1);
            const newCommunityFeedback = Math.min(5, contentPiece.communityFeedback + (Math.random() * 0.1) - 0.05);

            return {
              ...contentPiece,
              educationalValue: newEducationalValue,
              culturalCompliance: newCulturalCompliance,
              engagementScore: newEngagementScore,
              communityFeedback: Math.round(newCommunityFeedback * 10) / 10,
              lastUpdated: new Date(),
              version: contentPiece.version + 0.1,
            };
          }
          return contentPiece;
        });
      });
    }, 4000);

    return () => clearInterval(evolutionInterval);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return '#3b82f6';
      case 'activity': return '#10b981';
      case 'assessment': return '#f59e0b';
      case 'resource': return '#8b5cf6';
      case 'cultural': return '#ec4899';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#6b7280';
      case 'review': return '#f59e0b';
      case 'published': return '#10b981';
      case 'archived': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const filteredContent = selectedType === 'all' 
    ? content 
    : content.filter(contentPiece => contentPiece.type === selectedType);

  const types = ['all', ...Array.from(new Set(content.map(c => c.type)))];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                fontSize: '3rem', 
                margin: '0 0 10px 0',
                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold'
              }}>
                📚 Educational Content Evolution System
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.2rem', margin: 0 }}>
                AI-Enhanced Content Creation & Cultural Validation
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '10px 15px',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: isEvolving ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                padding: '8px 16px',
                borderRadius: '20px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isEvolving ? '#10b981' : '#ef4444',
                  animation: isEvolving ? 'pulse 2s infinite' : 'none'
                }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {isEvolving ? 'EVOLVING' : 'STANDBY'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Evolution Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {[
            { label: 'Total Content', value: metrics.totalContent, icon: '📚', color: '#3b82f6' },
            { label: 'Published', value: metrics.publishedContent, icon: '✅', color: '#10b981' },
            { label: 'Avg Educational Value', value: `${metrics.averageEducationalValue}%`, icon: '🎯', color: '#8b5cf6' },
            { label: 'Avg Cultural Compliance', value: `${metrics.averageCulturalCompliance}%`, icon: '🌿', color: '#f59e0b' },
            { label: 'Total Engagement', value: metrics.totalEngagement, icon: '📈', color: '#ec4899' },
            { label: 'AI Enhancements', value: metrics.aiEnhancements, icon: '🤖', color: '#06b6d4' },
          ].map((metric, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(15px)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '2rem' }}>{metric.icon}</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: metric.color }}>
                  {metric.value}
                </span>
              </div>
              <h3 style={{ margin: 0, color: '#e2e8f0', fontSize: '1rem' }}>{metric.label}</h3>
            </div>
          ))}
        </div>

        {/* Content Evolution Timeline */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(15px)',
          borderRadius: '15px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '30px'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#e2e8f0', fontSize: '1.5rem' }}>
            📈 Content Evolution Progress
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { label: 'Educational Value Growth', progress: metrics.averageEducationalValue, color: '#3b82f6' },
              { label: 'Cultural Compliance', progress: metrics.averageCulturalCompliance, color: '#10b981' },
              { label: 'Engagement Enhancement', progress: Math.round(metrics.totalEngagement / filteredContent.length), color: '#8b5cf6' },
              { label: 'AI Integration', progress: Math.min(100, (metrics.aiEnhancements / filteredContent.length) * 20), color: '#f59e0b' },
            ].map((item, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{item.label}</span>
                  <span style={{ color: item.color, fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {Math.round(item.progress)}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${item.progress}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}80 100%)`,
                    transition: 'width 0.5s ease',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Library */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(15px)',
          borderRadius: '15px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#e2e8f0', fontSize: '1.5rem' }}>
            📚 Content Library ({filteredContent.length} items)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
            {filteredContent.map((contentPiece) => (
              <div key={contentPiece.id} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, color: '#e2e8f0', fontSize: '1.1rem' }}>{contentPiece.title}</h4>
                      <span style={{
                        background: getTypeColor(contentPiece.type),
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        {contentPiece.type}
                      </span>
                      <span style={{
                        background: getStatusColor(contentPiece.status),
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        {contentPiece.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '10px' }}>
                      <span>📅 {contentPiece.subject}</span>
                      <span>🎓 {contentPiece.yearLevel}</span>
                      <span>v{contentPiece.version}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: '80px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '5px' }}>
                      ⭐ {contentPiece.communityFeedback}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Rating</div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <h5 style={{ margin: '0 0 8px 0', color: '#e2e8f0', fontSize: '0.9rem' }}>Cultural Elements:</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {contentPiece.culturalElements.map((element, index) => (
                      <span key={index} style={{
                        background: 'rgba(16, 185, 129, 0.2)',
                        color: '#10b981',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        border: '1px solid rgba(16, 185, 129, 0.3)'
                      }}>
                        {element}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h5 style={{ margin: '0 0 8px 0', color: '#e2e8f0', fontSize: '0.9rem' }}>AI Enhancements:</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {contentPiece.aiEnhancements.map((enhancement, index) => (
                      <span key={index} style={{
                        background: 'rgba(59, 130, 246, 0.2)',
                        color: '#3b82f6',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        border: '1px solid rgba(59, 130, 246, 0.3)'
                      }}>
                        {enhancement.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#3b82f6' }}>
                      {contentPiece.educationalValue}%
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Educational Value</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10b981' }}>
                      {contentPiece.culturalCompliance}%
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Cultural Compliance</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                      {contentPiece.engagementScore}%
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Engagement</div>
                  </div>
                </div>

                <div style={{ color: '#94a3b8', fontSize: '0.8rem', textAlign: 'center' }}>
                  Last updated: {contentPiece.lastUpdated.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
};

export default EducationalContentEvolutionSystem;
