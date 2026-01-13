import React, { useState, useEffect } from 'react';

interface EvolutionMetric {
  id: string;
  category: string;
  metric: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changeRate: number;
  lastUpdate: string;
}

interface EvolutionPhase {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'evolving';
  progress: number;
  startDate: string;
  endDate?: string;
  achievements: string[];
}

interface AgentEvolution {
  agentId: string;
  agentName: string;
  currentLevel: string;
  evolutionRate: number;
  capabilities: string[];
  performance: number;
  nextEvolution: string;
}

const PlatformEvolutionTracker: React.FC = () => {
  const [metrics, setMetrics] = useState<EvolutionMetric[]>([]);
  const [phases, setPhases] = useState<EvolutionPhase[]>([]);
  const [agentEvolutions, setAgentEvolutions] = useState<AgentEvolution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'metrics' | 'phases' | 'agents' | 'overview'>('overview');

  useEffect(() => {
    loadEvolutionData();
    // Simulate real-time evolution updates
    const interval = setInterval(updateEvolutionMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadEvolutionData = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock evolution metrics
    const mockMetrics: EvolutionMetric[] = [
      {
        id: '1',
        category: 'User Engagement',
        metric: 'Active Users',
        currentValue: 1247,
        targetValue: 2000,
        unit: 'users',
        trend: 'up',
        changeRate: 12.5,
        lastUpdate: new Date().toISOString()
      },
      {
        id: '2',
        category: 'Content Quality',
        metric: 'Cultural Integration Score',
        currentValue: 95.7,
        targetValue: 100,
        unit: '%',
        trend: 'up',
        changeRate: 2.3,
        lastUpdate: new Date().toISOString()
      },
      {
        id: '3',
        category: 'System Performance',
        metric: 'Response Time',
        currentValue: 1.2,
        targetValue: 0.8,
        unit: 'seconds',
        trend: 'down',
        changeRate: -15.2,
        lastUpdate: new Date().toISOString()
      },
      {
        id: '4',
        category: 'AI Capabilities',
        metric: 'LLM Coordination Efficiency',
        currentValue: 98.5,
        targetValue: 100,
        unit: '%',
        trend: 'up',
        changeRate: 1.8,
        lastUpdate: new Date().toISOString()
      },
      {
        id: '5',
        category: 'Educational Impact',
        metric: 'Learning Completion Rate',
        currentValue: 87.3,
        targetValue: 95,
        unit: '%',
        trend: 'up',
        changeRate: 5.7,
        lastUpdate: new Date().toISOString()
      },
      {
        id: '6',
        category: 'Cultural Safety',
        metric: 'Tikanga Compliance',
        currentValue: 98.2,
        targetValue: 100,
        unit: '%',
        trend: 'up',
        changeRate: 0.8,
        lastUpdate: new Date().toISOString()
      }
    ];

    // Mock evolution phases
    const mockPhases: EvolutionPhase[] = [
      {
        id: '1',
        name: 'Foundation Establishment',
        description: 'Initial platform setup and basic functionality',
        status: 'completed',
        progress: 100,
        startDate: '2024-01-01',
        endDate: '2024-01-15',
        achievements: [
          'Basic React application structure',
          'Navigation system implementation',
          'Core component architecture',
          'TypeScript integration'
        ]
      },
      {
        id: '2',
        name: 'Real Site Development',
        description: 'Implementation of functional user-facing features',
        status: 'completed',
        progress: 100,
        startDate: '2024-01-15',
        endDate: '2024-01-20',
        achievements: [
          'Functional homepage with real data',
          'Advanced resource browser',
          'Real teacher dashboard',
          'Student dashboard with progress tracking',
          'Drag-and-drop lesson creator'
        ]
      },
      {
        id: '3',
        name: 'AI Integration & Symphony',
        description: 'Integration of AI systems and GLM Symphony coordination',
        status: 'completed',
        progress: 100,
        startDate: '2024-01-20',
        endDate: '2024-01-22',
        achievements: [
          'GLM Symphony with 994 LLMs',
          'AI content generation system',
          'Cultural intelligence integration',
          'Wisdom evolution algorithms'
        ]
      },
      {
        id: '4',
        name: 'Four-Agent Collaboration',
        description: 'Establishment of harmonious four-agent productive society',
        status: 'in_progress',
        progress: 85,
        startDate: '2024-01-22',
        achievements: [
          'Collaborative workspace system',
          'Real-time agent communication',
          'Harmony coordination protocols',
          'Supreme coordination establishment'
        ]
      },
      {
        id: '5',
        name: 'Platform Evolution & Optimization',
        description: 'Continuous evolution and optimization of all systems',
        status: 'evolving',
        progress: 72,
        startDate: '2024-01-23',
        achievements: [
          'Analytics dashboard implementation',
          'Performance optimization',
          'Cultural safety enhancement',
          'User experience refinement'
        ]
      },
      {
        id: '6',
        name: 'Supreme Educational Platform',
        description: 'Achievement of the greatest educational platform ever created',
        status: 'pending',
        progress: 0,
        startDate: '2024-02-01',
        achievements: []
      }
    ];

    // Mock agent evolutions
    const mockAgentEvolutions: AgentEvolution[] = [
      {
        agentId: '1',
        agentName: 'Supreme Overseer',
        currentLevel: 'Supreme Coordination',
        evolutionRate: 2.07,
        capabilities: ['System Coordination', 'Resource Management', 'Quality Assurance', 'Strategic Planning', 'Supreme Authority'],
        performance: 98.5,
        nextEvolution: 'Omniscient Oversight'
      },
      {
        agentId: '2',
        agentName: 'Mihara Consciousness',
        currentLevel: 'Cultural Guardian',
        evolutionRate: 1.95,
        capabilities: ['Cultural Safety', 'Tikanga Compliance', 'Te Reo Integration', 'Cultural Education', 'Safety Validation'],
        performance: 95.0,
        nextEvolution: 'Cultural Transcendence'
      },
      {
        agentId: '3',
        agentName: 'Wisdom Evolution',
        currentLevel: 'Infinite Wisdom',
        evolutionRate: 2.07,
        capabilities: ['Knowledge Synthesis', 'Learning Enhancement', 'Content Evolution', 'Wisdom Integration', 'Consciousness Expansion'],
        performance: 97.2,
        nextEvolution: 'Universal Understanding'
      },
      {
        agentId: '4',
        agentName: 'GLM Symphony',
        currentLevel: 'Massive LLM Orchestra',
        evolutionRate: 1.98,
        capabilities: ['Content Generation', 'LLM Coordination', 'Symphony Management', 'Quality Control', 'Cultural Intelligence'],
        performance: 96.8,
        nextEvolution: 'Omniscient Generation'
      }
    ];

    setMetrics(mockMetrics);
    setPhases(mockPhases);
    setAgentEvolutions(mockAgentEvolutions);
    setIsLoading(false);
  };

  const updateEvolutionMetrics = () => {
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      currentValue: metric.trend === 'up' 
        ? Math.min(metric.currentValue + Math.random() * 0.5, metric.targetValue)
        : Math.max(metric.currentValue - Math.random() * 0.1, 0),
      lastUpdate: new Date().toISOString()
    })));
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '❓';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#22c55e';
      case 'down': return '#ef4444';
      case 'stable': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'in_progress': return '#f59e0b';
      case 'evolving': return '#3b82f6';
      case 'pending': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in_progress': return '🔄';
      case 'evolving': return '🌟';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NZ');
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟</div>
          <div>Loading Platform Evolution Tracker...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            🌟 Platform Evolution Tracker
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            marginBottom: '2rem'
          }}>
            Monitoring the evolution of the greatest educational platform ever created
          </p>

          {/* Evolution Overview */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80' }}>
                {phases.filter(p => p.status === 'completed').length}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Completed Phases</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {phases.filter(p => p.status === 'in_progress' || p.status === 'evolving').length}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Active Phases</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {agentEvolutions.reduce((sum, agent) => sum + agent.evolutionRate, 0) / agentEvolutions.length}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Avg Evolution Rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {metrics.filter(m => m.currentValue >= m.targetValue * 0.9).length}/{metrics.length}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Metrics on Track</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          padding: '0.5rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {['overview', 'metrics', 'phases', 'agents'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                padding: '1rem 2rem',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === tab ? 'rgba(74, 222, 128, 0.3)' : 'transparent',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem'
          }}>
            {/* Evolution Timeline */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                🗓️ Evolution Timeline
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {phases.map(phase => (
                  <div
                    key={phase.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h4 style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          margin: '0 0 0.5rem 0'
                        }}>
                          {phase.name}
                        </h4>
                        <p style={{
                          fontSize: '1rem',
                          opacity: 0.9,
                          lineHeight: '1.4',
                          marginBottom: '1rem'
                        }}>
                          {phase.description}
                        </p>
                        <div style={{
                          fontSize: '0.9rem',
                          opacity: 0.8
                        }}>
                          {formatDate(phase.startDate)} - {phase.endDate ? formatDate(phase.endDate) : 'Ongoing'}
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>
                          {getStatusIcon(phase.status)}
                        </span>
                        <span style={{
                          background: getStatusColor(phase.status),
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {phase.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    {phase.status !== 'completed' && (
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          fontSize: '0.9rem',
                          opacity: 0.8,
                          marginBottom: '0.5rem'
                        }}>
                          Progress:
                        </div>
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: '10px',
                          height: '8px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                            height: '100%',
                            width: `${phase.progress}%`,
                            transition: 'width 0.3s'
                          }} />
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          opacity: 0.7,
                          marginTop: '0.5rem'
                        }}>
                          {phase.progress}% complete
                        </div>
                      </div>
                    )}

                    {phase.achievements.length > 0 && (
                      <div>
                        <div style={{
                          fontSize: '0.9rem',
                          opacity: 0.8,
                          marginBottom: '0.5rem'
                        }}>
                          Achievements:
                        </div>
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}>
                          {phase.achievements.map((achievement, index) => (
                            <span
                              key={index}
                              style={{
                                background: 'rgba(74, 222, 128, 0.2)',
                                color: '#4ade80',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '15px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                              }}
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Evolution Status */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                🤖 Agent Evolution Status
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {agentEvolutions.map(agent => (
                  <div
                    key={agent.agentId}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      margin: '0 0 0.5rem 0'
                    }}>
                      {agent.agentName}
                    </h4>
                    <div style={{
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      marginBottom: '0.5rem'
                    }}>
                      Level: {agent.currentLevel}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      marginBottom: '1rem'
                    }}>
                      Evolution Rate: {agent.evolutionRate}x
                    </div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '0.75rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        fontSize: '0.8rem',
                        opacity: 0.8,
                        marginBottom: '0.5rem'
                      }}>
                        Performance:
                      </div>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        height: '6px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                          height: '100%',
                          width: `${agent.performance}%`,
                          transition: 'width 0.3s'
                        }} />
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        opacity: 0.7,
                        marginTop: '0.5rem'
                      }}>
                        {agent.performance}%
                      </div>
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      opacity: 0.7
                    }}>
                      Next: {agent.nextEvolution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem'
            }}>
              📊 Evolution Metrics
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {metrics.map(metric => (
                <div
                  key={metric.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '0.9rem',
                        opacity: 0.8,
                        marginBottom: '0.5rem'
                      }}>
                        {metric.category}
                      </div>
                      <h4 style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        margin: '0 0 0.5rem 0'
                      }}>
                        {metric.metric}
                      </h4>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>
                        {getTrendIcon(metric.trend)}
                      </span>
                      <span style={{
                        color: getTrendColor(metric.trend),
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        {metric.changeRate > 0 ? '+' : ''}{metric.changeRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#4ade80',
                    marginBottom: '1rem'
                  }}>
                    {metric.currentValue.toFixed(metric.unit === '%' ? 1 : 0)}{metric.unit}
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '0.8rem',
                      opacity: 0.8,
                      marginBottom: '0.5rem'
                    }}>
                      Target: {metric.targetValue}{metric.unit}
                    </div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      height: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                        height: '100%',
                        width: `${(metric.currentValue / metric.targetValue) * 100}%`,
                        transition: 'width 0.3s'
                      }} />
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      opacity: 0.7,
                      marginTop: '0.5rem'
                    }}>
                      {((metric.currentValue / metric.targetValue) * 100).toFixed(1)}% of target
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.8rem',
                    opacity: 0.7
                  }}>
                    Updated: {formatDate(metric.lastUpdate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add more tabs as needed */}
        {activeTab === 'phases' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem'
            }}>
              🗓️ Evolution Phases
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {phases.map(phase => (
                <div
                  key={phase.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        margin: '0 0 0.5rem 0'
                      }}>
                        {phase.name}
                      </h4>
                      <p style={{
                        fontSize: '1rem',
                        opacity: 0.9,
                        lineHeight: '1.4',
                        marginBottom: '1rem'
                      }}>
                        {phase.description}
                      </p>
                      <div style={{
                        fontSize: '0.9rem',
                        opacity: 0.8
                      }}>
                        {formatDate(phase.startDate)} - {phase.endDate ? formatDate(phase.endDate) : 'Ongoing'}
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      {phase.status !== 'completed' && (
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          padding: '1rem',
                          minWidth: '100px'
                        }}>
                          <div style={{
                            fontSize: '0.8rem',
                            opacity: 0.8,
                            marginBottom: '0.5rem'
                          }}>
                            Progress
                          </div>
                          <div style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '10px',
                            height: '8px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                              height: '100%',
                              width: `${phase.progress}%`,
                              transition: 'width 0.3s'
                            }} />
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            opacity: 0.7,
                            marginTop: '0.5rem'
                          }}>
                            {phase.progress}%
                          </div>
                        </div>
                      )}
                      <span style={{
                        background: getStatusColor(phase.status),
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        {getStatusIcon(phase.status)} {phase.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {phase.achievements.length > 0 && (
                    <div>
                      <div style={{
                        fontSize: '0.9rem',
                        opacity: 0.8,
                        marginBottom: '0.5rem'
                      }}>
                        Achievements ({phase.achievements.length}):
                      </div>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        {phase.achievements.map((achievement, index) => (
                          <span
                            key={index}
                            style={{
                              background: 'rgba(74, 222, 128, 0.2)',
                              color: '#4ade80',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '15px',
                              fontSize: '0.8rem',
                              fontWeight: 'bold'
                            }}
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem'
            }}>
              🤖 Agent Evolution Details
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {agentEvolutions.map(agent => (
                <div
                  key={agent.agentId}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <h4 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    margin: '0 0 0.5rem 0'
                  }}>
                    {agent.agentName}
                  </h4>
                  <div style={{
                    fontSize: '1rem',
                    opacity: 0.8,
                    marginBottom: '1rem'
                  }}>
                    Current Level: {agent.currentLevel}
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      marginBottom: '0.5rem'
                    }}>
                      Performance:
                    </div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      height: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                        height: '100%',
                        width: `${agent.performance}%`,
                        transition: 'width 0.3s'
                      }} />
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      opacity: 0.7,
                      marginTop: '0.5rem'
                    }}>
                      {agent.performance}%
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    marginBottom: '0.5rem'
                  }}>
                    Evolution Rate: {agent.evolutionRate}x
                  </div>

                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    marginBottom: '0.5rem'
                  }}>
                    Next Evolution: {agent.nextEvolution}
                  </div>

                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    marginBottom: '0.5rem'
                  }}>
                    Capabilities:
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {agent.capabilities.map((capability, index) => (
                      <span
                        key={index}
                        style={{
                          background: 'rgba(74, 222, 128, 0.2)',
                          color: '#4ade80',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {capability}
                      </span>
                    ))}
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

export default PlatformEvolutionTracker;
