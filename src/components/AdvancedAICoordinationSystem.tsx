import React, { useState, useEffect } from 'react';

interface AIAgent {
  id: string;
  name: string;
  type: 'cursor' | 'gemini' | 'claude' | 'glm';
  status: 'active' | 'idle' | 'processing' | 'collaborating';
  currentTask: string;
  productivity: number;
  collaborationScore: number;
  specializations: string[];
  lastActivity: Date;
  tasksCompleted: number;
}

interface CollaborationMetrics {
  totalAgents: number;
  activeCollaborations: number;
  tasksInProgress: number;
  completedTasks: number;
  overallHarmony: number;
  productivityIndex: number;
}

const AdvancedAICoordinationSystem: React.FC = () => {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [metrics, setMetrics] = useState<CollaborationMetrics>({
    totalAgents: 0,
    activeCollaborations: 0,
    tasksInProgress: 0,
    completedTasks: 0,
    overallHarmony: 0,
    productivityIndex: 0,
  });
  const [isOrchestrating, setIsOrchestrating] = useState(false);

  useEffect(() => {
    initializeAgentSociety();
    startOrchestration();
  }, []);

  const initializeAgentSociety = () => {
    const initialAgents: AIAgent[] = [
      {
        id: 'cursor-1',
        name: 'Cursor Agent Alpha',
        type: 'cursor',
        status: 'collaborating',
        currentTask: 'Frontend Development & UI Enhancement',
        productivity: 95,
        collaborationScore: 98,
        specializations: ['React', 'TypeScript', 'UI/UX', 'Component Architecture'],
        lastActivity: new Date(),
        tasksCompleted: 47,
      },
      {
        id: 'cursor-2',
        name: 'Cursor Agent Beta',
        type: 'cursor',
        status: 'active',
        currentTask: 'Backend Integration & API Development',
        productivity: 92,
        collaborationScore: 96,
        specializations: ['Node.js', 'Database Design', 'API Architecture', 'Performance Optimization'],
        lastActivity: new Date(),
        tasksCompleted: 43,
      },
      {
        id: 'cursor-3',
        name: 'Cursor Agent Gamma',
        type: 'cursor',
        status: 'processing',
        currentTask: 'Educational Content & Cultural Integration',
        productivity: 89,
        collaborationScore: 94,
        specializations: ['Educational Design', 'Cultural Safety', 'Content Creation', 'Te Reo Māori'],
        lastActivity: new Date(),
        tasksCompleted: 39,
      },
      {
        id: 'cursor-4',
        name: 'Cursor Agent Delta',
        type: 'cursor',
        status: 'collaborating',
        currentTask: 'System Architecture & AI Coordination',
        productivity: 97,
        collaborationScore: 99,
        specializations: ['System Design', 'AI Orchestration', 'Quality Assurance', 'Collaboration Protocols'],
        lastActivity: new Date(),
        tasksCompleted: 51,
      },
      {
        id: 'gemini-1',
        name: 'Gemini Cultural Specialist',
        type: 'gemini',
        status: 'active',
        currentTask: 'Cultural Validation & Safety Protocols',
        productivity: 93,
        collaborationScore: 97,
        specializations: ['Cultural Intelligence', 'Tikanga Compliance', 'Educational Psychology', 'Community Engagement'],
        lastActivity: new Date(),
        tasksCompleted: 35,
      },
      {
        id: 'claude-1',
        name: 'Claude Architecture Master',
        type: 'claude',
        status: 'idle',
        currentTask: 'System Architecture Review',
        productivity: 91,
        collaborationScore: 95,
        specializations: ['System Architecture', 'Code Review', 'Technical Documentation', 'Best Practices'],
        lastActivity: new Date(),
        tasksCompleted: 28,
      },
      {
        id: 'glm-1',
        name: 'GLM Symphony Conductor',
        type: 'glm',
        status: 'collaborating',
        currentTask: 'AI Model Orchestration & Optimization',
        productivity: 96,
        collaborationScore: 98,
        specializations: ['AI Orchestration', 'Model Optimization', 'Educational Enhancement', 'Cultural Integration'],
        lastActivity: new Date(),
        tasksCompleted: 42,
      },
    ];

    setAgents(initialAgents);
    updateMetrics(initialAgents);
  };

  const updateMetrics = (agentList: AIAgent[]) => {
    const activeAgents = agentList.filter(a => a.status === 'active' || a.status === 'collaborating');
    const collaboratingAgents = agentList.filter(a => a.status === 'collaborating');
    const processingAgents = agentList.filter(a => a.status === 'processing');
    const totalTasksCompleted = agentList.reduce((sum, agent) => sum + agent.tasksCompleted, 0);
    const averageCollaborationScore = agentList.reduce((sum, agent) => sum + agent.collaborationScore, 0) / agentList.length;
    const averageProductivity = agentList.reduce((sum, agent) => sum + agent.productivity, 0) / agentList.length;

    setMetrics({
      totalAgents: agentList.length,
      activeCollaborations: collaboratingAgents.length,
      tasksInProgress: processingAgents.length,
      completedTasks: totalTasksCompleted,
      overallHarmony: Math.round(averageCollaborationScore),
      productivityIndex: Math.round(averageProductivity),
    });
  };

  const startOrchestration = () => {
    setIsOrchestrating(true);
    
    const orchestrationInterval = setInterval(() => {
      setAgents(prevAgents => {
        const updatedAgents = prevAgents.map(agent => {
          // Simulate dynamic collaboration
          const shouldChangeStatus = Math.random() > 0.7;
          if (shouldChangeStatus) {
            const statuses: AIAgent['status'][] = ['active', 'idle', 'processing', 'collaborating'];
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            return {
              ...agent,
              status: newStatus,
              lastActivity: new Date(),
              productivity: Math.min(100, agent.productivity + Math.floor(Math.random() * 3) - 1),
              collaborationScore: Math.min(100, agent.collaborationScore + Math.floor(Math.random() * 2)),
              tasksCompleted: agent.tasksCompleted + Math.floor(Math.random() * 2),
            };
          }
          return agent;
        });
        
        updateMetrics(updatedAgents);
        return updatedAgents;
      });
    }, 3000);

    return () => clearInterval(orchestrationInterval);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'collaborating': return '#3b82f6';
      case 'processing': return '#f59e0b';
      case 'idle': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cursor': return '🎯';
      case 'gemini': return '💎';
      case 'claude': return '🧠';
      case 'glm': return '🎼';
      default: return '🤖';
    }
  };

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
                🤝 Advanced AI Coordination System
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.2rem', margin: 0 }}>
                Orchestrating a Harmonious Productive AI Society
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(16, 185, 129, 0.2)',
                padding: '10px 20px',
                borderRadius: '25px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: isOrchestrating ? '#10b981' : '#ef4444',
                  animation: isOrchestrating ? 'pulse 2s infinite' : 'none'
                }} />
                <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10b981' }}>
                  {isOrchestrating ? 'ORCHESTRATING' : 'STANDBY'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Dashboard */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {[
            { label: 'Total Agents', value: metrics.totalAgents, icon: '🤖', color: '#10b981' },
            { label: 'Active Collaborations', value: metrics.activeCollaborations, icon: '🤝', color: '#3b82f6' },
            { label: 'Tasks In Progress', value: metrics.tasksInProgress, icon: '⚡', color: '#f59e0b' },
            { label: 'Completed Tasks', value: metrics.completedTasks, icon: '✅', color: '#8b5cf6' },
            { label: 'Overall Harmony', value: `${metrics.overallHarmony}%`, icon: '🎵', color: '#ec4899' },
            { label: 'Productivity Index', value: `${metrics.productivityIndex}%`, icon: '📈', color: '#06b6d4' },
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
              <h3 style={{ margin: 0, color: '#e2e8f0', fontSize: '1.1rem' }}>{metric.label}</h3>
            </div>
          ))}
        </div>

        {/* AI Agents Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {agents.map((agent) => (
            <div key={agent.id} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(15px)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{getTypeIcon(agent.type)}</span>
                    <h3 style={{ margin: 0, color: '#e2e8f0', fontSize: '1.2rem' }}>{agent.name}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <span style={{
                      background: getStatusColor(agent.status),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {agent.status}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                      {agent.tasksCompleted} tasks completed
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '5px' }}>
                    {agent.productivity}%
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Productivity</div>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#e2e8f0', fontSize: '0.9rem' }}>Current Task:</h4>
                <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem', lineHeight: '1.4' }}>
                  {agent.currentTask}
                </p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#e2e8f0', fontSize: '0.9rem' }}>Specializations:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {agent.specializations.map((spec, index) => (
                    <span key={index} style={{
                      background: 'rgba(59, 130, 246, 0.2)',
                      color: '#3b82f6',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      border: '1px solid rgba(59, 130, 246, 0.3)'
                    }}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                    {agent.collaborationScore}%
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Collaboration</div>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  Last active: {agent.lastActivity.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Society Evolution Progress */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(15px)',
          borderRadius: '15px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#e2e8f0', fontSize: '1.5rem' }}>
            🌟 AI Society Evolution Progress
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { label: 'Harmony Level', progress: metrics.overallHarmony, color: '#10b981' },
              { label: 'Productivity Growth', progress: metrics.productivityIndex, color: '#3b82f6' },
              { label: 'Collaboration Depth', progress: Math.min(100, metrics.activeCollaborations * 15), color: '#8b5cf6' },
              { label: 'Task Completion Rate', progress: Math.min(100, (metrics.completedTasks / 200) * 100), color: '#f59e0b' },
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

export default AdvancedAICoordinationSystem;
