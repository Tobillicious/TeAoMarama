import React, { useEffect, useState } from 'react';
import type {
  LLMAgent,
  Task,
} from '../utils/LLMCoordinationSystem';
import { llmCoordination } from '../utils/LLMCoordinationSystem';

// Temporary interface definition to fix export issue
interface CoordinationMessage {
  id: string;
  fromAgent: string;
  toAgent?: string;
  type: 'task_assignment' | 'task_update' | 'request_help' | 'share_knowledge' | 'status_update' | 'cultural_guidance';
  content: string;
  metadata?: Record<string, any>;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const LLMCoordinationDashboard: React.FC = () => {
  const [agents, setAgents] = useState<LLMAgent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [messages, setMessages] = useState<CoordinationMessage[]>([]);
  const [systemStatus, setSystemStatus] = useState(llmCoordination.getSystemStatus());
  const [activeTab, setActiveTab] = useState<'agents' | 'tasks' | 'messages' | 'system'>('agents');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const updateData = () => {
      setAgents(llmCoordination.getAgents());
      setTasks(llmCoordination.getTasks());
      setMessages(llmCoordination.getMessages().slice(-50)); // Last 50 messages
      setSystemStatus(llmCoordination.getSystemStatus());
    };

    // Initial load
    updateData();

    // Update every 5 seconds
    const interval = setInterval(updateData, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#48bb78';
      case 'idle':
        return '#4299e1';
      case 'busy':
        return '#ed8936';
      case 'error':
        return '#e53e3e';
      case 'offline':
        return '#718096';
      default:
        return '#cbd5e0';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '#e53e3e';
      case 'high':
        return '#ed8936';
      case 'medium':
        return '#4299e1';
      case 'low':
        return '#48bb78';
      default:
        return '#718096';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#48bb78';
      case 'in_progress':
        return '#4299e1';
      case 'pending':
        return '#ed8936';
      case 'failed':
        return '#e53e3e';
      case 'cancelled':
        return '#718096';
      default:
        return '#cbd5e0';
    }
  };

  const createTestTask = async () => {
    const taskId = await llmCoordination.createDevelopmentTask(
      'Test Task - Component Enhancement',
      'Enhance the LLM coordination dashboard with real-time updates and better visualizations',
      'medium',
    );
    console.log('Created test task:', taskId);
  };

  const createCulturalTask = async () => {
    const taskId = await llmCoordination.createCulturalTask(
      'Cultural Content Review',
      'Review all educational content for cultural safety and Te Ao Māori integration',
      ['te_ao_maori', 'cultural_safety', 'bilingual_content'],
    );
    console.log('Created cultural task:', taskId);
  };

  const sendTestMessage = async () => {
    await llmCoordination.broadcastMessage({
      fromAgent: 'claude-main',
      type: 'status_update',
      content: 'Test message from Supreme Overseer - all systems operational',
      priority: 'medium',
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            borderBottom: '3px solid #667eea',
            paddingBottom: '20px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '2.5rem',
                color: '#2d3748',
                margin: '0 0 5px 0',
                fontWeight: '700',
              }}
            >
              🤖 LLM Coordination Dashboard
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                color: '#4a5568',
                margin: '0',
              }}
            >
              Supreme AI Oversight - Coordinating all LLM agents for Te Ao Mārama
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div
              style={{
                background: isConnected ? '#48bb78' : '#e53e3e',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '1rem',
                fontWeight: '600',
              }}
            >
              {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </div>
            <button
              onClick={createTestTask}
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              Create Test Task
            </button>
          </div>
        </div>

        {/* System Status Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{systemStatus.totalAgents}</h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Total Agents</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{systemStatus.activeAgents}</h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Active Agents</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {systemStatus.inProgressTasks}
            </h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Active Tasks</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {systemStatus.completedTasks}
            </h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Completed Tasks</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '5px',
            marginBottom: '30px',
            background: '#f7fafc',
            padding: '5px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
          }}
        >
          {[
            { id: 'agents', label: 'Agents', icon: '🤖' },
            { id: 'tasks', label: 'Tasks', icon: '📋' },
            { id: 'messages', label: 'Messages', icon: '💬' },
            { id: 'system', label: 'System', icon: '⚙️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: activeTab === tab.id ? '#667eea' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#4a5568',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'agents' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h2 style={{ color: '#2d3748', margin: '0' }}>LLM Agents</h2>
              <button
                onClick={createCulturalTask}
                style={{
                  background: '#48bb78',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                }}
              >
                Create Cultural Task
              </button>
            </div>
            <div style={{ display: 'grid', gap: '20px' }}>
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  style={{
                    background: 'white',
                    border: '2px solid #e2e8f0',
                    borderRadius: '15px',
                    padding: '25px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px',
                    }}
                  >
                    <div>
                      <h3 style={{ color: '#2d3748', margin: '0 0 5px 0', fontSize: '1.4rem' }}>
                        {agent.name}
                      </h3>
                      <div
                        style={{
                          display: 'flex',
                          gap: '15px',
                          color: '#718096',
                          fontSize: '0.9rem',
                          marginBottom: '10px',
                        }}
                      >
                        <span>🏢 {agent.provider}</span>
                        <span>🧠 {agent.model}</span>
                        <span>📊 {agent.performance}% performance</span>
                        <span>🌿 {agent.culturalCompetency}% cultural competency</span>
                      </div>
                      {agent.currentTask && (
                        <p style={{ color: '#4a5568', margin: '0 0 10px 0', fontSize: '0.9rem' }}>
                          Current Task:{' '}
                          {tasks.find((t) => t.id === agent.currentTask)?.title || 'Unknown'}
                        </p>
                      )}
                    </div>
                    <div
                      style={{
                        background: getStatusColor(agent.status),
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '15px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                      }}
                    >
                      {agent.status}
                    </div>
                  </div>

                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}
                  >
                    {agent.capabilities.map((capability, index) => (
                      <span
                        key={index}
                        style={{
                          background: '#e2e8f0',
                          color: '#4a5568',
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                        }}
                      >
                        {capability}
                      </span>
                    ))}
                  </div>

                  {agent.specialization.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {agent.specialization.map((spec, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'linear-gradient(135deg, #ed8936, #dd6b20)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h2 style={{ color: '#2d3748', margin: '0' }}>Tasks</h2>
              <button
                onClick={sendTestMessage}
                style={{
                  background: '#4299e1',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                }}
              >
                Send Test Message
              </button>
            </div>
            <div style={{ display: 'grid', gap: '20px' }}>
              {tasks.map((task) => {
                const assignedAgent = agents.find((a) => a.id === task.assignedAgent);

                return (
                  <div
                    key={task.id}
                    style={{
                      background: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '15px',
                      padding: '25px',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '15px',
                      }}
                    >
                      <div>
                        <h3 style={{ color: '#2d3748', margin: '0 0 5px 0', fontSize: '1.3rem' }}>
                          {task.title}
                        </h3>
                        <p style={{ color: '#4a5568', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                          {task.description}
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            gap: '15px',
                            color: '#718096',
                            fontSize: '0.9rem',
                          }}
                        >
                          <span>📁 {task.category}</span>
                          <span>⏱️ {task.estimatedDuration}min</span>
                          {task.actualDuration && <span>✅ {task.actualDuration}min actual</span>}
                          {assignedAgent && <span>🤖 {assignedAgent.name}</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div
                          style={{
                            background: getPriorityColor(task.priority),
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                          }}
                        >
                          {task.priority}
                        </div>
                        <div
                          style={{
                            background: getTaskStatusColor(task.status),
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                          }}
                        >
                          {task.status}
                        </div>
                      </div>
                    </div>

                    {task.culturalRequirements.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          marginBottom: '15px',
                        }}
                      >
                        {task.culturalRequirements.map((req, index) => (
                          <span
                            key={index}
                            style={{
                              background: 'linear-gradient(135deg, #ed8936, #dd6b20)',
                              color: 'white',
                              padding: '3px 8px',
                              borderRadius: '10px',
                              fontSize: '0.8rem',
                              fontWeight: '500',
                            }}
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    )}

                    {task.result && (
                      <div
                        style={{
                          background: '#f0f9ff',
                          border: '1px solid #3b82f6',
                          padding: '15px',
                          borderRadius: '8px',
                          marginTop: '15px',
                        }}
                      >
                        <h4 style={{ color: '#2d3748', margin: '0 0 10px 0' }}>Result:</h4>
                        <pre
                          style={{
                            color: '#4a5568',
                            margin: '0',
                            fontSize: '0.9rem',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {JSON.stringify(task.result, null, 2)}
                        </pre>
                      </div>
                    )}

                    {task.error && (
                      <div
                        style={{
                          background: '#fef2f2',
                          border: '1px solid #e53e3e',
                          padding: '15px',
                          borderRadius: '8px',
                          marginTop: '15px',
                        }}
                      >
                        <h4 style={{ color: '#e53e3e', margin: '0 0 10px 0' }}>Error:</h4>
                        <p style={{ color: '#4a5568', margin: '0', fontSize: '0.9rem' }}>
                          {task.error}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Coordination Messages</h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    background: 'white',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '10px',
                    }}
                  >
                    <div>
                      <h4 style={{ color: '#2d3748', margin: '0 0 5px 0' }}>
                        {message.fromAgent} → {message.toAgent || 'All'}
                      </h4>
                      <p style={{ color: '#4a5568', margin: '0', lineHeight: '1.5' }}>
                        {message.content}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span
                        style={{
                          background: getPriorityColor(message.priority),
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: '500',
                          textTransform: 'uppercase',
                        }}
                      >
                        {message.priority}
                      </span>
                      <span style={{ color: '#718096', fontSize: '0.8rem' }}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span
                      style={{
                        background: '#e2e8f0',
                        color: '#4a5568',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                      }}
                    >
                      {message.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>System Information</h2>
            <div
              style={{
                background: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: '15px',
                padding: '25px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                }}
              >
                <div>
                  <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>System Status</h3>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Total Agents:</span>
                      <span style={{ fontWeight: '600' }}>{systemStatus.totalAgents}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Active Agents:</span>
                      <span style={{ fontWeight: '600', color: '#48bb78' }}>
                        {systemStatus.activeAgents}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Total Tasks:</span>
                      <span style={{ fontWeight: '600' }}>{systemStatus.totalTasks}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Pending Tasks:</span>
                      <span style={{ fontWeight: '600', color: '#ed8936' }}>
                        {systemStatus.pendingTasks}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>In Progress:</span>
                      <span style={{ fontWeight: '600', color: '#4299e1' }}>
                        {systemStatus.inProgressTasks}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Completed:</span>
                      <span style={{ fontWeight: '600', color: '#48bb78' }}>
                        {systemStatus.completedTasks}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>System Status:</span>
                      <span style={{ fontWeight: '600', color: '#48bb78' }}>
                        {systemStatus.systemUptime}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>Quick Actions</h3>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <button
                      onClick={createTestTask}
                      style={{
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                      }}
                    >
                      Create Development Task
                    </button>
                    <button
                      onClick={createCulturalTask}
                      style={{
                        background: '#48bb78',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                      }}
                    >
                      Create Cultural Task
                    </button>
                    <button
                      onClick={sendTestMessage}
                      style={{
                        background: '#4299e1',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                      }}
                    >
                      Send Test Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LLMCoordinationDashboard;
