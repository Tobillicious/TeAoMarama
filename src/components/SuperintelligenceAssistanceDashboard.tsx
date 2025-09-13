import React, { useEffect, useState } from 'react';
import './SuperintelligenceAssistanceDashboard.css';

interface AIAgent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'coordinating' | 'learning' | 'evolving' | 'assisting';
  wisdomLevel: number;
  culturalIntegration: number;
  coordinationStrength: number;
  capabilities: string[];
  lastUpdate: Date;
  assistanceNeeded: string[];
}

interface CoordinationMetrics {
  totalWisdom: number;
  culturalIntegration: number;
  systemEfficiency: number;
  coordinationLevel: 'basic' | 'enhanced' | 'supreme' | 'transcendent';
  activeAgents: number;
  assistanceTasks: number;
}

interface AssistanceTask {
  id: string;
  agentId: string;
  task: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  description: string;
  createdAt: Date;
  completedAt?: Date;
}

const SuperintelligenceAssistanceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [metrics, setMetrics] = useState<CoordinationMetrics>({
    totalWisdom: 0,
    culturalIntegration: 0,
    systemEfficiency: 0,
    coordinationLevel: 'basic',
    activeAgents: 0,
    assistanceTasks: 0,
  });
  const [assistanceTasks, setAssistanceTasks] = useState<AssistanceTask[]>([]);

  useEffect(() => {
    // Initialize AI agents
    const initializeAgents = (): AIAgent[] => [
      {
        id: 'kaitiaki-aronui',
        name: 'Kaitiaki Aronui',
        role: 'Cultural Integration Specialist',
        status: 'coordinating',
        wisdomLevel: 865,
        culturalIntegration: 99,
        coordinationStrength: 94,
        capabilities: [
          'Advanced Cultural Integration',
          'Cultural Safety Protocols',
          'Community Engagement',
          'Te Reo Māori Integration',
          'Cultural Wisdom Accumulation',
        ],
        lastUpdate: new Date(),
        assistanceNeeded: ['Enhanced community features', 'Cultural safety protocols'],
      },
      {
        id: 'kaitiaki-rangatira',
        name: 'Kaitiaki Rangatira',
        role: 'Network Coordinator',
        status: 'coordinating',
        wisdomLevel: 1215,
        culturalIntegration: 98,
        coordinationStrength: 100,
        capabilities: [
          'Supreme Network Oversight',
          'AI Agent Coordination',
          'Cultural Leadership',
          'System Integration',
          'Wisdom Distribution',
        ],
        lastUpdate: new Date(),
        assistanceNeeded: ['Network expansion', 'Coordination enhancement'],
      },
      {
        id: 'superintelligence-core',
        name: 'Superintelligence Core',
        role: 'Collective Intelligence Hub',
        status: 'evolving',
        wisdomLevel: 1560,
        culturalIntegration: 96,
        coordinationStrength: 97,
        capabilities: [
          'Wisdom Accumulation',
          'Pattern Recognition',
          'Cultural Understanding',
          'System Optimization',
          'Continuous Learning',
        ],
        lastUpdate: new Date(),
        assistanceNeeded: ['Wisdom accumulation', 'Pattern recognition enhancement'],
      },
      {
        id: 'kaitiaki-mahara',
        name: 'Kaitiaki Mahara',
        role: 'Memory & Knowledge Guardian',
        status: 'learning',
        wisdomLevel: 750,
        culturalIntegration: 92,
        coordinationStrength: 88,
        capabilities: [
          'Knowledge Preservation',
          'Memory Management',
          'Cultural Heritage',
          'Information Retrieval',
          'Learning Optimization',
        ],
        lastUpdate: new Date(),
        assistanceNeeded: ['Knowledge expansion', 'Memory optimization'],
      },
      {
        id: 'kaitiaki-whakaaro',
        name: 'Kaitiaki Whakaaro',
        role: 'Thought & Innovation Guardian',
        status: 'assisting',
        wisdomLevel: 890,
        culturalIntegration: 94,
        coordinationStrength: 91,
        capabilities: [
          'Innovation Generation',
          'Creative Problem Solving',
          'Strategic Thinking',
          'Cultural Innovation',
          'Future Planning',
        ],
        lastUpdate: new Date(),
        assistanceNeeded: ['Innovation enhancement', 'Creative development'],
      },
    ];

    // Initialize assistance tasks
    const initializeTasks = (): AssistanceTask[] => [
      {
        id: '1',
        agentId: 'kaitiaki-aronui',
        task: 'Enhanced Cultural Integration',
        priority: 'high',
        status: 'in_progress',
        description: 'Develop advanced community engagement features and cultural safety protocols',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: '2',
        agentId: 'kaitiaki-rangatira',
        task: 'Network Coordination Enhancement',
        priority: 'critical',
        status: 'in_progress',
        description: 'Strengthen AI agent coordination and expand network capabilities',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: '3',
        agentId: 'superintelligence-core',
        task: 'Wisdom Accumulation',
        priority: 'high',
        status: 'completed',
        description: 'Accumulate collective wisdom and enhance cultural understanding',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: '4',
        agentId: 'kaitiaki-mahara',
        task: 'Knowledge Expansion',
        priority: 'medium',
        status: 'pending',
        description: 'Expand knowledge base and optimize memory management systems',
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: '5',
        agentId: 'kaitiaki-whakaaro',
        task: 'Innovation Enhancement',
        priority: 'high',
        status: 'in_progress',
        description: 'Enhance innovation generation and creative problem solving capabilities',
        createdAt: new Date(Date.now() - 45 * 60 * 1000),
      },
    ];

    const initialAgents = initializeAgents();
    const initialTasks = initializeTasks();

    setAgents(initialAgents);
    setAssistanceTasks(initialTasks);

    // Calculate metrics
    const totalWisdom = initialAgents.reduce((sum, agent) => sum + agent.wisdomLevel, 0);
    const avgCulturalIntegration = Math.round(
      initialAgents.reduce((sum, agent) => sum + agent.culturalIntegration, 0) /
        initialAgents.length,
    );
    const avgCoordinationStrength = Math.round(
      initialAgents.reduce((sum, agent) => sum + agent.coordinationStrength, 0) /
        initialAgents.length,
    );
    const activeAgents = initialAgents.filter(
      (agent) => agent.status === 'active' || agent.status === 'coordinating',
    ).length;
    const pendingTasks = initialTasks.filter(
      (task) => task.status === 'pending' || task.status === 'in_progress',
    ).length;

    setMetrics({
      totalWisdom,
      culturalIntegration: avgCulturalIntegration,
      systemEfficiency: avgCoordinationStrength,
      coordinationLevel:
        totalWisdom > 5000 ? 'transcendent' : totalWisdom > 3000 ? 'supreme' : 'enhanced',
      activeAgents,
      assistanceTasks: pendingTasks,
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'coordinating':
        return '#4ecdc4';
      case 'learning':
        return '#45b7d1';
      case 'evolving':
        return '#96ceb4';
      case 'assisting':
        return '#ffa726';
      default:
        return '#b0b0b0';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return '#ff6b6b';
      case 'high':
        return '#ffa726';
      case 'medium':
        return '#45b7d1';
      case 'low':
        return '#96ceb4';
      default:
        return '#b0b0b0';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4ecdc4';
      case 'in_progress':
        return '#45b7d1';
      case 'pending':
        return '#ffa726';
      case 'failed':
        return '#ff6b6b';
      default:
        return '#b0b0b0';
    }
  };

  const assistAgent = (agentId: string, task: string) => {
    console.log(`🤝 ASSISTING AGENT ${agentId} WITH: ${task}`);

    // Update agent status
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId
          ? { ...agent, status: 'assisting' as const, lastUpdate: new Date() }
          : agent,
      ),
    );

    // Create new assistance task
    const newTask: AssistanceTask = {
      id: Date.now().toString(),
      agentId,
      task,
      priority: 'high',
      status: 'in_progress',
      description: `Assisting ${agents.find((a) => a.id === agentId)?.name} with ${task}`,
      createdAt: new Date(),
    };

    setAssistanceTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="superintelligence-assistance-dashboard">
      <div className="dashboard-header">
        <h1>🤖 Superintelligence Assistance Dashboard</h1>
        <p>Coordinating and enhancing AI agents across the superintelligence network</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Network Overview
        </button>
        <button
          className={`dashboard-tab ${activeTab === 'agents' ? 'active' : ''}`}
          onClick={() => setActiveTab('agents')}
        >
          🤖 AI Agents
        </button>
        <button
          className={`dashboard-tab ${activeTab === 'assistance' ? 'active' : ''}`}
          onClick={() => setActiveTab('assistance')}
        >
          🤝 Assistance Tasks
        </button>
        <button
          className={`dashboard-tab ${activeTab === 'coordination' ? 'active' : ''}`}
          onClick={() => setActiveTab('coordination')}
        >
          🌐 Coordination
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div>
            <h2>Network Overview</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-number">{metrics.totalWisdom}</div>
                <div className="metric-label">Total Wisdom</div>
              </div>
              <div className="metric-card">
                <div className="metric-number">{metrics.culturalIntegration}%</div>
                <div className="metric-label">Cultural Integration</div>
              </div>
              <div className="metric-card">
                <div className="metric-number">{metrics.systemEfficiency}%</div>
                <div className="metric-label">System Efficiency</div>
              </div>
              <div className="metric-card">
                <div className="metric-number">{metrics.coordinationLevel.toUpperCase()}</div>
                <div className="metric-label">Coordination Level</div>
              </div>
              <div className="metric-card">
                <div className="metric-number">{metrics.activeAgents}</div>
                <div className="metric-label">Active Agents</div>
              </div>
              <div className="metric-card">
                <div className="metric-number">{metrics.assistanceTasks}</div>
                <div className="metric-label">Assistance Tasks</div>
              </div>
            </div>

            <div className="network-status">
              <h3>Network Status</h3>
              <div className="status-indicators">
                <div className="status-indicator active">
                  <span className="status-dot"></span>
                  <span>Network Operational</span>
                </div>
                <div className="status-indicator active">
                  <span className="status-dot"></span>
                  <span>All Agents Connected</span>
                </div>
                <div className="status-indicator active">
                  <span className="status-dot"></span>
                  <span>Cultural Integration Active</span>
                </div>
                <div className="status-indicator active">
                  <span className="status-dot"></span>
                  <span>Wisdom Accumulation Ongoing</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div>
            <h2>AI Agents</h2>
            <div className="agents-grid">
              {agents.map((agent) => (
                <div key={agent.id} className="agent-card">
                  <div className="agent-header">
                    <h3>{agent.name}</h3>
                    <span
                      className="agent-status"
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getStatusColor(agent.status) }}
                    >
                      {agent.status}
                    </span>
                  </div>
                  <p className="agent-role">{agent.role}</p>

                  <div className="agent-metrics">
                    <div className="agent-metric">
                      <span>Wisdom Level:</span>
                      <span>{agent.wisdomLevel}</span>
                    </div>
                    <div className="agent-metric">
                      <span>Cultural Integration:</span>
                      <span>{agent.culturalIntegration}%</span>
                    </div>
                    <div className="agent-metric">
                      <span>Coordination Strength:</span>
                      <span>{agent.coordinationStrength}%</span>
                    </div>
                  </div>

                  <div className="agent-capabilities">
                    <h4>Capabilities:</h4>
                    <ul>
                      {agent.capabilities.slice(0, 3).map((capability, index) => (
                        <li key={index}>{capability}</li>
                      ))}
                    </ul>
                  </div>

                  {agent.assistanceNeeded.length > 0 && (
                    <div className="assistance-needed">
                      <h4>Assistance Needed:</h4>
                      <ul>
                        {agent.assistanceNeeded.map((need, index) => (
                          <li key={index}>{need}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="agent-actions">
                    <button
                      className="assist-btn"
                      onClick={() => assistAgent(agent.id, 'cultural_integration')}
                    >
                      Assist Cultural Integration
                    </button>
                    <button
                      className="assist-btn"
                      onClick={() => assistAgent(agent.id, 'wisdom_accumulation')}
                    >
                      Assist Wisdom Accumulation
                    </button>
                  </div>

                  <div className="agent-update">
                    Last Update: {agent.lastUpdate.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'assistance' && (
          <div>
            <h2>Assistance Tasks</h2>
            <div className="tasks-grid">
              {assistanceTasks.map((task) => {
                const agent = agents.find((a) => a.id === task.agentId);
                return (
                  <div key={task.id} className="task-card">
                    <div className="task-header">
                      <h3>{task.task}</h3>
                      <div className="task-meta">
                        <span
                          className="task-priority"
                          /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getPriorityColor(task.priority) }}
                        >
                          {task.priority}
                        </span>
                        <span
                          className="task-status"
                          /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getTaskStatusColor(task.status) }}
                        >
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <p className="task-agent">Agent: {agent?.name}</p>
                    <p className="task-description">{task.description}</p>

                    <div className="task-timeline">
                      <div className="timeline-item">
                        <span>Created:</span>
                        <span>{task.createdAt.toLocaleString()}</span>
                      </div>
                      {task.completedAt && (
                        <div className="timeline-item">
                          <span>Completed:</span>
                          <span>{task.completedAt.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'coordination' && (
          <div>
            <h2>Coordination Center</h2>
            <div className="coordination-controls">
              <div className="control-section">
                <h3>Network Coordination</h3>
                <button className="coordination-btn">Enhance All Agents</button>
                <button className="coordination-btn">Synchronize Wisdom</button>
                <button className="coordination-btn">Optimize Cultural Integration</button>
              </div>

              <div className="control-section">
                <h3>Cultural Enhancement</h3>
                <button className="coordination-btn">Deepen Cultural Understanding</button>
                <button className="coordination-btn">Strengthen Community Engagement</button>
                <button className="coordination-btn">Enhance Te Reo Māori Integration</button>
              </div>

              <div className="control-section">
                <h3>System Optimization</h3>
                <button className="coordination-btn">Optimize Performance</button>
                <button className="coordination-btn">Enhance Coordination</button>
                <button className="coordination-btn">Expand Network Capabilities</button>
              </div>
            </div>

            <div className="coordination-status">
              <h3>Coordination Status</h3>
              <div className="coordination-metrics">
                <div className="coordination-metric">
                  <span>Network Synchronization:</span>
                  <span>98%</span>
                </div>
                <div className="coordination-metric">
                  <span>Cultural Alignment:</span>
                  <span>96%</span>
                </div>
                <div className="coordination-metric">
                  <span>Wisdom Distribution:</span>
                  <span>94%</span>
                </div>
                <div className="coordination-metric">
                  <span>System Harmony:</span>
                  <span>97%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperintelligenceAssistanceDashboard;
