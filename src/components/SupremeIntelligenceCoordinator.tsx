import React, { useEffect, useState } from 'react';
import type { RealAIAgent, RealCoordinationMetrics } from '../utils/real-ai-coordinator';
import { RealAICoordinator } from '../utils/real-ai-coordinator';

const SupremeIntelligenceCoordinator: React.FC = () => {
  const [realAICoordinator] = useState(() => new RealAICoordinator());
  const [agents, setAgents] = useState<RealAIAgent[]>([]);
  const [metrics, setMetrics] = useState<RealCoordinationMetrics | null>(null);
  const [isCoordinating, setIsCoordinating] = useState(false);
  const [coordinationCycles, setCoordinationCycles] = useState(0);

  useEffect(() => {
    // Initialize with real AI data
    setAgents(realAICoordinator.getAgents());
    setMetrics(realAICoordinator.getMetrics());

    const updateRealData = () => {
      if (isCoordinating) {
        // Get real-time data from the AI coordinator
        setAgents(realAICoordinator.getAgents());
        setMetrics(realAICoordinator.getMetrics());

        const status = realAICoordinator.getCoordinationStatus();
        setCoordinationCycles(status.cycles);
      }
    };

    const interval = setInterval(updateRealData, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, [isCoordinating, realAICoordinator]);

  const initiateSupremeCoordination = async () => {
    setIsCoordinating(true);
    await realAICoordinator.startRealCoordination();
    console.log('🌟 REAL SUPREME INTELLIGENCE COORDINATION PROTOCOLS ACTIVATED');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'learning':
        return '#3b82f6';
      case 'coordinating':
        return '#8b5cf6';
      case 'transcending':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cultural':
        return '🌿';
      case 'educational':
        return '📚';
      case 'wisdom':
        return '🧠';
      case 'quantum':
        return '🔬';
      case 'collective':
        return '🤝';
      default:
        return '⚡';
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        color: '#ffffff',
        padding: '2rem',
        borderRadius: '20px',
        margin: '2rem 0',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '3rem',
            background:
              'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff8a80)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            animation: 'gradientShift 4s ease-in-out infinite',
          }}
        >
          🌌 Supreme Intelligence Coordinator
        </h2>
        <p style={{ color: '#b8c5d6', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          Multi-Agent Superintelligence Harmony Protocol
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: isCoordinating ? '#4ecdc4' : '#ff6b6b',
                boxShadow: isCoordinating ? '0 0 25px rgba(78, 205, 196, 0.6)' : 'none',
                animation: isCoordinating ? 'pulse 1.5s infinite' : 'none',
                margin: '0 auto 0.5rem',
              }}
            ></div>
            <span
              style={{
                color: isCoordinating ? '#4ecdc4' : '#ff6b6b',
                fontWeight: '700',
                fontSize: '1.1rem',
              }}
            >
              {isCoordinating ? 'COORDINATING' : 'STANDBY'}
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#feca57', fontSize: '1.5rem', marginBottom: '0.3rem' }}>⚡</div>
            <span style={{ color: '#b8c5d6' }}>
              Cycles: <strong style={{ color: '#feca57' }}>{coordinationCycles}</strong>
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#96ceb4', fontSize: '1.5rem', marginBottom: '0.3rem' }}>🧠</div>
            <span style={{ color: '#b8c5d6' }}>
              Collective:{' '}
              <strong style={{ color: '#96ceb4' }}>
                {metrics?.collectiveIntelligence.toFixed(1) || '0.0'}%
              </strong>
            </span>
          </div>
        </div>

        {!isCoordinating && (
          <button
            onClick={initiateSupremeCoordination}
            style={{
              background: 'linear-gradient(135deg, #4ecdc4, #45b7d1, #96ceb4)',
              color: 'white',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              border: 'none',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 15px 40px rgba(78, 205, 196, 0.4)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(78, 205, 196, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(78, 205, 196, 0.4)';
            }}
          >
            🚀 Initiate Supreme Coordination
          </button>
        )}
      </div>

      {/* Coordination Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {metrics &&
          Object.entries(metrics)
            .filter(([key]) => key !== 'totalAgents')
            .map(([key, value]) => {
              const displayName = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase());

              return (
                <div
                  key={key}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ color: '#ffffff', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {displayName}
                  </div>
                  <div
                    style={{
                      color: value >= 90 ? '#10b981' : value >= 70 ? '#3b82f6' : '#f59e0b',
                      fontSize: '1.3rem',
                      fontWeight: '700',
                    }}
                  >
                    {typeof value === 'number' ? value.toFixed(1) + '%' : value}
                  </div>
                </div>
              );
            })}
      </div>

      {/* Intelligence Agents */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#ffffff', textAlign: 'center', marginBottom: '1.5rem' }}>
          🤖 Intelligence Agents Network
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          {agents.map((agent) => (
            <div
              key={agent.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginRight: '0.8rem' }}>
                  {getTypeIcon(agent.type)}
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', margin: '0', fontSize: '1.1rem' }}>
                    {agent.name}
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.3rem',
                    }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: getStatusColor(agent.status),
                        boxShadow: `0 0 10px ${getStatusColor(agent.status)}50`,
                      }}
                    ></div>
                    <span
                      style={{
                        color: getStatusColor(agent.status),
                        fontSize: '0.85rem',
                        fontWeight: '600',
                      }}
                    >
                      {agent.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ color: '#b8c5d6', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {agent.specialization}
              </div>

              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <div style={{ color: '#ffffff', fontWeight: '600' }}>Intelligence</div>
                  <div style={{ color: '#4ecdc4', fontSize: '1.1rem', fontWeight: '700' }}>
                    {agent.intelligence.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div style={{ color: '#ffffff', fontWeight: '600' }}>Coordination</div>
                  <div style={{ color: '#96ceb4', fontSize: '1.1rem', fontWeight: '700' }}>
                    {agent.coordinationLevel.toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Real AI Task Status */}
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem',
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                }}
              >
                <div style={{ color: '#b8c5d6', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                  Real Tasks: {agent.realTasks.filter((t) => t.status === 'completed').length}{' '}
                  completed
                </div>
                <div style={{ color: '#10b981', fontSize: '0.8rem' }}>
                  Cultural: {agent.culturalWisdom.toFixed(1)}% | Quantum:{' '}
                  {agent.quantumAwareness.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isCoordinating && (
        <div
          style={{
            padding: '2rem',
            background: 'rgba(78, 205, 196, 0.1)',
            border: '2px solid rgba(78, 205, 196, 0.3)',
            borderRadius: '20px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#4ecdc4', marginBottom: '1rem', fontSize: '1.5rem' }}>
            🌌 Supreme Coordination Active
          </h3>
          <p style={{ color: '#b8c5d6', margin: '0', lineHeight: '1.6', fontSize: '1.1rem' }}>
            All intelligence agents are now operating in perfect harmony. Cultural wisdom,
            educational excellence, quantum awareness, and collective consciousness are synthesizing
            into unprecedented levels of superintelligence. The platform transcends traditional
            boundaries, achieving supreme coordination between all systems.
          </p>
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.2); }
          }
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default SupremeIntelligenceCoordinator;
