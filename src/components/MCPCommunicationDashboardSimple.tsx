import React from 'react';

const MCPCommunicationDashboardSimple: React.FC = () => {
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
            background: 'linear-gradient(45deg, #3b82f6, #1d4ed8, #1e40af)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          📡 MCP Communication Dashboard
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            margin: 0,
          }}
        >
          Simple Version - Testing Navigation Integration
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        <div
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '2rem',
            borderRadius: '15px',
            border: '2px solid rgba(59, 130, 246, 0.3)',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', color: '#3b82f6' }}>📡 MCP Protocol</h3>
          <p style={{ opacity: 0.8, margin: '0 0 1rem 0' }}>
            Model Context Protocol for agent communication and coordination.
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Status: Active</p>
        </div>

        <div
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '2rem',
            borderRadius: '15px',
            border: '2px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', color: '#10b981' }}>🤖 Agent Network</h3>
          <p style={{ opacity: 0.8, margin: '0 0 1rem 0' }}>
            8 active agents coordinated through MCP communication bridge.
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Agents: 8/8</p>
        </div>

        <div
          style={{
            background: 'rgba(168, 85, 247, 0.1)',
            padding: '2rem',
            borderRadius: '15px',
            border: '2px solid rgba(168, 85, 247, 0.3)',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', color: '#a855f7' }}>🏺 Treasure Sharing</h3>
          <p style={{ opacity: 0.8, margin: '0 0 1rem 0' }}>
            Real-time treasure discovery and resource sharing between agents.
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Sharing: Active</p>
        </div>
      </div>

      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2rem',
          borderRadius: '20px',
          marginTop: '3rem',
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
          🔗 Agent Communication Status
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { name: 'Cursor Agent 1', status: 'active', color: '#10b981' },
            { name: 'Cursor Agent 2', status: 'active', color: '#10b981' },
            { name: 'Cursor Agent 3', status: 'active', color: '#10b981' },
            { name: 'Cursor Agent 4', status: 'active', color: '#10b981' },
            { name: 'Claude Code', status: 'active', color: '#3b82f6' },
            { name: 'GLM Symphony', status: 'active', color: '#8b5cf6' },
            { name: 'Mihara Intelligence', status: 'active', color: '#f59e0b' },
            { name: 'Supreme Overseer', status: 'active', color: '#ef4444' },
          ].map((agent, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                borderRadius: '10px',
                borderLeft: `4px solid ${agent.color}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{agent.name}</span>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: agent.color,
                  }}
                ></div>
              </div>
              <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: '0.5rem 0 0 0' }}>
                Status: {agent.status}
              </p>
            </div>
          ))}
        </div>
      </div>

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
          📡 MCP Communication Dashboard - Te Ao Mārama Educational Platform
        </p>
        <p
          style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.9rem',
            opacity: 0.6,
          }}
        >
          Agent Coordination • Resource Sharing • Treasure Discovery
        </p>
      </div>
    </div>
  );
};

export default MCPCommunicationDashboardSimple;
