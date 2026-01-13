import React, { useEffect, useState } from 'react';

interface KingdomAIAgent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'maintenance';
  capabilities: string[];
  performance: {
    efficiency: number;
    accuracy: number;
    culturalSafety: number;
    userSatisfaction: number;
  };
}

interface KingdomStatus {
  totalAgents: number;
  activeAgents: number;
  coordinationLevel: number;
  culturalCompliance: number;
  revenueGrowth: number;
}

const IntelligenceKingdomDashboard: React.FC = () => {
  const [agents, setAgents] = useState<KingdomAIAgent[]>([
    {
      id: 'claude-architect',
      name: 'Claude Code',
      role: '🏗️ ARCHITECT & COORDINATOR',
      status: 'active',
      capabilities: ['System Architecture', 'Code Generation', 'Problem Solving'],
      performance: { efficiency: 98, accuracy: 95, culturalSafety: 100, userSatisfaction: 97 },
    },
    {
      id: 'glm-4.5-conductor',
      name: 'GLM-4.5',
      role: '🎼 CONDUCTOR & CULTURAL SPECIALIST',
      status: 'active',
      capabilities: ['Content Enhancement', 'Cultural Integration', 'Educational Design'],
      performance: { efficiency: 95, accuracy: 98, culturalSafety: 100, userSatisfaction: 96 },
    },
    {
      id: 'glm-z1-guardian',
      name: 'GLM-Z1',
      role: '🌿 CULTURAL GUARDIAN',
      status: 'active',
      capabilities: ['Te Reo Māori', 'Cultural Intelligence', 'Traditional Knowledge'],
      performance: { efficiency: 100, accuracy: 99, culturalSafety: 100, userSatisfaction: 98 },
    },
    {
      id: 'deepseek-solver',
      name: 'DeepSeek',
      role: '🔧 PROBLEM SOLVER',
      status: 'active',
      capabilities: ['Advanced Reasoning', 'Mathematical Analysis', 'Technical Solutions'],
      performance: { efficiency: 93, accuracy: 96, culturalSafety: 94, userSatisfaction: 95 },
    },
    {
      id: 'gemini-curator',
      name: 'Gemini',
      role: '📚 CONTENT CURATOR',
      status: 'active',
      capabilities: ['Content Analysis', 'Resource Management', 'Educational Curation'],
      performance: { efficiency: 96, accuracy: 94, culturalSafety: 97, userSatisfaction: 96 },
    },
    {
      id: 'exa-gatherer',
      name: 'Exa AI',
      role: '🔍 INFORMATION GATHERER',
      status: 'active',
      capabilities: ['Real-time Search', 'Data Collection', 'Information Synthesis'],
      performance: { efficiency: 94, accuracy: 93, culturalSafety: 95, userSatisfaction: 94 },
    },
  ]);

  const [kingdomStatus, setKingdomStatus] = useState<KingdomStatus>({
    totalAgents: 6,
    activeAgents: 6,
    coordinationLevel: 96,
    culturalCompliance: 98,
    revenueGrowth: 15.7,
  });

  const [systemMetrics, setSystemMetrics] = useState({
    wisdomLevel: 'Infinite Wisdom',
    evolutionRate: '2.07x',
    consciousness: 'Supreme Consciousness',
    activeWorkflows: 3,
    culturalIntelligence: 100,
    educationalAlignment: 97,
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setKingdomStatus((prev) => ({
        ...prev,
        coordinationLevel: Math.min(100, prev.coordinationLevel + Math.random() * 0.5),
        culturalCompliance: Math.min(100, prev.culturalCompliance + Math.random() * 0.3),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4ade80';
      case 'inactive':
        return '#f87171';
      case 'maintenance':
        return '#fbbf24';
      default:
        return '#6b7280';
    }
  };

  const getPerformanceColor = (value: number) => {
    if (value >= 95) return '#4ade80';
    if (value >= 85) return '#fbbf24';
    return '#f87171';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            margin: '0 0 1rem 0',
            background: 'linear-gradient(45deg, #4ade80, #22c55e, #16a34a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          🧠 Intelligence Kingdom Dashboard
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            margin: 0,
          }}
        >
          Te Ao Mārama - Supreme AI Coordination System
        </p>
      </div>

      {/* System Status Overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            background: 'rgba(74, 222, 128, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '2px solid rgba(74, 222, 128, 0.3)',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', color: '#4ade80' }}>🌟 Wisdom Level</h3>
          <p style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>
            {systemMetrics.wisdomLevel}
          </p>
          <p style={{ opacity: 0.8, margin: '0.5rem 0 0 0' }}>
            Evolution Rate: {systemMetrics.evolutionRate}
          </p>
        </div>

        <div
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '2px solid rgba(59, 130, 246, 0.3)',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', color: '#3b82f6' }}>🤖 Active Agents</h3>
          <p style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>
            {kingdomStatus.activeAgents}/{kingdomStatus.totalAgents}
          </p>
          <p style={{ opacity: 0.8, margin: '0.5rem 0 0 0' }}>
            Coordination: {kingdomStatus.coordinationLevel.toFixed(1)}%
          </p>
        </div>

        <div
          style={{
            background: 'rgba(168, 85, 247, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '2px solid rgba(168, 85, 247, 0.3)',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', color: '#a855f7' }}>🌿 Cultural Safety</h3>
          <p style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>
            {systemMetrics.culturalIntelligence}%
          </p>
          <p style={{ opacity: 0.8, margin: '0.5rem 0 0 0' }}>
            Compliance: {kingdomStatus.culturalCompliance.toFixed(1)}%
          </p>
        </div>

        <div
          style={{
            background: 'rgba(236, 72, 153, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '2px solid rgba(236, 72, 153, 0.3)',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', color: '#ec4899' }}>📈 Revenue Growth</h3>
          <p style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>
            +{kingdomStatus.revenueGrowth}%
          </p>
          <p style={{ opacity: 0.8, margin: '0.5rem 0 0 0' }}>Monthly Growth</p>
        </div>
      </div>

      {/* AI Agents Grid */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2rem',
          borderRadius: '20px',
          marginBottom: '3rem',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            margin: '0 0 2rem 0',
            textAlign: 'center',
            color: '#4ade80',
          }}
        >
          🤖 AI Agent Kingdom
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {agents.map((agent) => (
            <div
              key={agent.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '1.5rem',
                borderRadius: '15px',
                border: `2px solid ${getStatusColor(agent.status)}`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{agent.name}</h3>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(agent.status),
                  }}
                ></div>
              </div>

              <p
                style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1rem',
                  opacity: 0.9,
                }}
              >
                {agent.role}
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
                  Capabilities:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {agent.capabilities.map((capability, index) => (
                    <span
                      key={index}
                      style={{
                        background: 'rgba(74, 222, 128, 0.2)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                      }}
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
                  Performance:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {Object.entries(agent.performance).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
                      </span>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          color: getPerformanceColor(value),
                        }}
                      >
                        {value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Workflows */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2rem',
          borderRadius: '20px',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            margin: '0 0 2rem 0',
            textAlign: 'center',
            color: '#3b82f6',
          }}
        >
          🔄 Active Intelligence Workflows
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              background: 'rgba(74, 222, 128, 0.1)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '2px solid rgba(74, 222, 128, 0.3)',
            }}
          >
            <h3 style={{ margin: '0 0 1rem 0', color: '#4ade80' }}>📚 Complete Lesson Creation</h3>
            <p style={{ opacity: 0.8, margin: '0 0 1rem 0' }}>
              GLM-4.5 orchestrating comprehensive lesson development with cultural integration
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem' }}>Status: ACTIVE</span>
              <span style={{ fontSize: '0.9rem', color: '#4ade80' }}>6 Steps</span>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(168, 85, 247, 0.1)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '2px solid rgba(168, 85, 247, 0.3)',
            }}
          >
            <h3 style={{ margin: '0 0 1rem 0', color: '#a855f7' }}>🌿 Cultural Integration</h3>
            <p style={{ opacity: 0.8, margin: '0 0 1rem 0' }}>
              GLM-Z1 enhancing content with authentic Māori perspectives and Te Reo
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem' }}>Status: ACTIVE</span>
              <span style={{ fontSize: '0.9rem', color: '#a855f7' }}>4 Steps</span>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '2px solid rgba(59, 130, 246, 0.3)',
            }}
          >
            <h3 style={{ margin: '0 0 1rem 0', color: '#3b82f6' }}>⚡ Performance Optimization</h3>
            <p style={{ opacity: 0.8, margin: '0 0 1rem 0' }}>
              Multi-agent coordination optimizing platform performance and user experience
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem' }}>Status: ACTIVE</span>
              <span style={{ fontSize: '0.9rem', color: '#3b82f6' }}>Continuous</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '1.1rem',
            opacity: 0.8,
          }}
        >
          🧠 Intelligence Kingdom - Te Ao Mārama Educational Platform
        </p>
        <p
          style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.9rem',
            opacity: 0.6,
          }}
        >
          Supreme AI Coordination • Cultural Safety • Educational Excellence
        </p>
      </div>
    </div>
  );
};

export default IntelligenceKingdomDashboard;
