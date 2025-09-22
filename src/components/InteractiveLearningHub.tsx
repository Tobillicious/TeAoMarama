import React, { useState } from 'react';
import { InteractiveLearningWidget } from './InteractiveLearningWidget';
import { Play, BookOpen, Brain, Trophy, Users } from 'lucide-react';

interface LearningActivity {
  id: string;
  title: string;
  titleTe: string;
  type: 'drag-drop' | 'matching' | 'timeline' | 'scenario';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  culturalElements: string[];
  instructions: string;
  content?: any;
}

const InteractiveLearningHub: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<LearningActivity | null>(null);

  const sampleActivities: LearningActivity[] = [
    {
      id: '1',
      title: 'Māori History Timeline',
      titleTe: 'Taima Hītori Māori',
      type: 'timeline',
      difficulty: 'intermediate',
      culturalElements: ['whakapapa', 'tikanga', 'whenua'],
      instructions: 'Arrange important events in Māori history in chronological order.',
      content: {
        events: [
          { year: 1350, event: 'First Polynesian settlers arrive', eventTe: 'Ka tae mai ngā tangata tuatahi' },
          { year: 1642, event: 'Abel Tasman arrives', eventTe: 'Ka tae mai a Abel Tasman' },
          { year: 1840, event: 'Treaty of Waitangi signed', eventTe: 'Ka waitohua te Tiriti o Waitangi' }
        ]
      }
    },
    {
      id: '2',
      title: 'Ecosystem Matching',
      titleTe: 'Whakataurite Taiao',
      type: 'matching',
      difficulty: 'beginner',
      culturalElements: ['taiao', 'kaitiakitanga'],
      instructions: 'Match native NZ animals with their habitats.',
      content: {
        pairs: [
          { item: 'Kiwi', match: 'Forest floor', itemTe: 'Kiwi', matchTe: 'Papa ngahere' },
          { item: 'Tui', match: 'Tree canopy', itemTe: 'Tui', matchTe: 'Kauru rakau' },
          { item: 'Tuatara', match: 'Rocky areas', itemTe: 'Tuatara', matchTe: 'Wāhi kōhatu' }
        ]
      }
    },
    {
      id: '3',
      title: 'Te Reo Pronunciation',
      titleTe: 'Whakahua Te Reo',
      type: 'drag-drop',
      difficulty: 'beginner',
      culturalElements: ['te reo Māori', 'whakatōhea'],
      instructions: 'Drag the correct pronunciation to each Te Reo word.',
      content: {
        words: [
          { word: 'Kia ora', pronunciation: 'Key-ah or-ah', meaning: 'Hello/Be well' },
          { word: 'Whānau', pronunciation: 'Fan-oh', meaning: 'Family' },
          { word: 'Aroha', pronunciation: 'Ah-roh-hah', meaning: 'Love' }
        ]
      }
    },
    {
      id: '4',
      title: 'Treaty Negotiations',
      titleTe: 'Kōrero Tiriti',
      type: 'scenario',
      difficulty: 'advanced',
      culturalElements: ['tiriti', 'rangatiratanga', 'kāwanatanga'],
      instructions: 'Navigate through different perspectives during Treaty negotiations.',
      content: {
        scenarios: [
          {
            situation: 'Chief Hōne Heke questions British intentions',
            options: [
              'Emphasize mutual benefits',
              'Discuss sovereignty concerns',
              'Focus on trade opportunities'
            ]
          }
        ]
      }
    }
  ];

  const difficultyColors = {
    beginner: '#10b981',
    intermediate: '#f59e0b',
    advanced: '#ef4444'
  };

  const typeIcons = {
    'drag-drop': Brain,
    'matching': Users,
    'timeline': BookOpen,
    'scenario': Trophy
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            Interactive Learning Hub
          </h1>
          <h2 style={{
            fontSize: '2rem',
            color: '#94a3b8',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            Taiao Ako Ritenga
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#cbd5e1',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Engage with interactive activities designed for NZ curriculum learning with authentic cultural integration.
          </p>
        </div>

        {!selectedActivity ? (
          /* Activity Selection Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {sampleActivities.map((activity) => {
              const IconComponent = typeIcons[activity.type];
              return (
                <div
                  key={activity.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '32px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => setSelectedActivity(activity)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: `linear-gradient(135deg, ${difficultyColors[activity.difficulty]}40, ${difficultyColors[activity.difficulty]}80)`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComponent size={24} color={difficultyColors[activity.difficulty]} />
                    </div>
                    <div>
                      <h3 style={{
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                        marginBottom: '4px'
                      }}>
                        {activity.title}
                      </h3>
                      <p style={{
                        color: '#94a3b8',
                        fontSize: '1rem',
                        fontStyle: 'italic'
                      }}>
                        {activity.titleTe}
                      </p>
                    </div>
                  </div>

                  <p style={{
                    color: '#cbd5e1',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    {activity.instructions}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      background: difficultyColors[activity.difficulty],
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {activity.difficulty}
                    </div>
                    <div style={{
                      color: '#94a3b8',
                      fontSize: '14px',
                      textTransform: 'capitalize'
                    }}>
                      {activity.type.replace('-', ' ')}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '20px'
                  }}>
                    {activity.culturalElements.map((element, index) => (
                      <span
                        key={index}
                        style={{
                          background: 'rgba(59, 130, 246, 0.2)',
                          color: '#93c5fd',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        {element}
                      </span>
                    ))}
                  </div>

                  <button style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    justifyContent: 'center'
                  }}>
                    <Play size={16} />
                    Start Activity
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* Selected Activity */
          <div>
            <button
              onClick={() => setSelectedActivity(null)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '32px'
              }}
            >
              ← Back to Activities
            </button>
            <InteractiveLearningWidget activity={selectedActivity} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveLearningHub;