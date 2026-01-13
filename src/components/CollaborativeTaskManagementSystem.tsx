import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  assignedAgent: string;
  category: string;
  estimatedTime: number;
  actualTime: number;
  dependencies: string[];
  createdAt: Date;
  updatedAt: Date;
  progress: number;
}

interface AgentWorkload {
  agentId: string;
  agentName: string;
  activeTasks: number;
  completedTasks: number;
  averageCompletionTime: number;
  workloadPercentage: number;
  specializations: string[];
}

const CollaborativeTaskManagementSystem: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [agentWorkloads, setAgentWorkloads] = useState<AgentWorkload[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAutoAssigning, setIsAutoAssigning] = useState(true);

  useEffect(() => {
    initializeTaskSystem();
    startAutoAssignment();
  }, []);

  const initializeTaskSystem = () => {
    const initialTasks: Task[] = [
      {
        id: 'task-1',
        title: 'Enhance Resource Browser Performance',
        description: 'Optimize the resource browser to handle 1000+ resources efficiently',
        priority: 'high',
        status: 'in-progress',
        assignedAgent: 'cursor-1',
        category: 'Frontend',
        estimatedTime: 4,
        actualTime: 2,
        dependencies: [],
        createdAt: new Date(Date.now() - 3600000),
        updatedAt: new Date(Date.now() - 1800000),
        progress: 60,
      },
      {
        id: 'task-2',
        title: 'Implement Cultural Safety Validation',
        description: 'Create comprehensive cultural safety checking for all educational content',
        priority: 'critical',
        status: 'review',
        assignedAgent: 'gemini-1',
        category: 'Cultural',
        estimatedTime: 6,
        actualTime: 5,
        dependencies: [],
        createdAt: new Date(Date.now() - 7200000),
        updatedAt: new Date(Date.now() - 300000),
        progress: 95,
      },
      {
        id: 'task-3',
        title: 'Design AI Coordination Interface',
        description: 'Create intuitive interface for managing AI agent collaborations',
        priority: 'high',
        status: 'completed',
        assignedAgent: 'cursor-4',
        category: 'AI Systems',
        estimatedTime: 3,
        actualTime: 3,
        dependencies: [],
        createdAt: new Date(Date.now() - 10800000),
        updatedAt: new Date(Date.now() - 600000),
        progress: 100,
      },
      {
        id: 'task-4',
        title: 'Optimize Database Queries',
        description: 'Improve database performance for resource loading and search',
        priority: 'medium',
        status: 'pending',
        assignedAgent: 'cursor-2',
        category: 'Backend',
        estimatedTime: 2,
        actualTime: 0,
        dependencies: ['task-1'],
        createdAt: new Date(Date.now() - 1800000),
        updatedAt: new Date(Date.now() - 1800000),
        progress: 0,
      },
      {
        id: 'task-5',
        title: 'Create Educational Content Templates',
        description: 'Develop standardized templates for educational content creation',
        priority: 'medium',
        status: 'in-progress',
        assignedAgent: 'cursor-3',
        category: 'Content',
        estimatedTime: 5,
        actualTime: 3,
        dependencies: [],
        createdAt: new Date(Date.now() - 5400000),
        updatedAt: new Date(Date.now() - 900000),
        progress: 75,
      },
      {
        id: 'task-6',
        title: 'Implement Real-time Collaboration',
        description: 'Enable real-time collaboration between multiple agents',
        priority: 'high',
        status: 'in-progress',
        assignedAgent: 'glm-1',
        category: 'AI Systems',
        estimatedTime: 4,
        actualTime: 2,
        dependencies: ['task-3'],
        createdAt: new Date(Date.now() - 2700000),
        updatedAt: new Date(Date.now() - 600000),
        progress: 50,
      },
    ];

    const initialWorkloads: AgentWorkload[] = [
      {
        agentId: 'cursor-1',
        agentName: 'Cursor Agent Alpha',
        activeTasks: 1,
        completedTasks: 12,
        averageCompletionTime: 3.2,
        workloadPercentage: 75,
        specializations: ['Frontend', 'React', 'TypeScript'],
      },
      {
        agentId: 'cursor-2',
        agentName: 'Cursor Agent Beta',
        activeTasks: 1,
        completedTasks: 10,
        averageCompletionTime: 2.8,
        workloadPercentage: 60,
        specializations: ['Backend', 'Database', 'API'],
      },
      {
        agentId: 'cursor-3',
        agentName: 'Cursor Agent Gamma',
        activeTasks: 1,
        completedTasks: 8,
        averageCompletionTime: 4.1,
        workloadPercentage: 85,
        specializations: ['Content', 'Education', 'Cultural'],
      },
      {
        agentId: 'cursor-4',
        agentName: 'Cursor Agent Delta',
        activeTasks: 0,
        completedTasks: 15,
        averageCompletionTime: 2.5,
        workloadPercentage: 40,
        specializations: ['AI Systems', 'Architecture', 'Coordination'],
      },
      {
        agentId: 'gemini-1',
        agentName: 'Gemini Cultural Specialist',
        activeTasks: 1,
        completedTasks: 9,
        averageCompletionTime: 3.8,
        workloadPercentage: 70,
        specializations: ['Cultural', 'Validation', 'Safety'],
      },
      {
        agentId: 'glm-1',
        agentName: 'GLM Symphony Conductor',
        activeTasks: 1,
        completedTasks: 11,
        averageCompletionTime: 3.0,
        workloadPercentage: 65,
        specializations: ['AI Orchestration', 'Optimization', 'Collaboration'],
      },
    ];

    setTasks(initialTasks);
    setAgentWorkloads(initialWorkloads);
  };

  const startAutoAssignment = () => {
    const assignmentInterval = setInterval(() => {
      setTasks(prevTasks => {
        return prevTasks.map(task => {
          if (task.status === 'pending' && Math.random() > 0.8) {
            // Auto-assign pending tasks
            const availableAgents = agentWorkloads.filter(agent => agent.workloadPercentage < 90);
            if (availableAgents.length > 0) {
              const randomAgent = availableAgents[Math.floor(Math.random() * availableAgents.length)];
              return {
                ...task,
                assignedAgent: randomAgent.agentId,
                status: 'in-progress',
                updatedAt: new Date(),
              };
            }
          } else if (task.status === 'in-progress' && Math.random() > 0.7) {
            // Simulate task progress
            const newProgress = Math.min(100, task.progress + Math.floor(Math.random() * 10));
            let newStatus = task.status;
            if (newProgress >= 100) {
              newStatus = 'review';
            }
            return {
              ...task,
              progress: newProgress,
              status: newStatus,
              actualTime: task.actualTime + 0.5,
              updatedAt: new Date(),
            };
          } else if (task.status === 'review' && Math.random() > 0.6) {
            // Complete reviewed tasks
            return {
              ...task,
              status: 'completed',
              progress: 100,
              updatedAt: new Date(),
            };
          }
          return task;
        });
      });
    }, 2000);

    return () => clearInterval(assignmentInterval);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#6b7280';
      case 'in-progress': return '#3b82f6';
      case 'review': return '#f59e0b';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getWorkloadColor = (percentage: number) => {
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 70) return '#f59e0b';
    if (percentage >= 50) return '#3b82f6';
    return '#10b981';
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category.toLowerCase() === selectedCategory.toLowerCase());

  const categories = ['all', ...Array.from(new Set(tasks.map(task => task.category)))];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)',
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
                📋 Collaborative Task Management System
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.2rem', margin: 0 }}>
                Orchestrating Intelligent Task Distribution & Progress Tracking
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '10px 15px',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: isAutoAssigning ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                padding: '8px 16px',
                borderRadius: '20px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isAutoAssigning ? '#10b981' : '#ef4444',
                  animation: isAutoAssigning ? 'pulse 2s infinite' : 'none'
                }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {isAutoAssigning ? 'AUTO-ASSIGNING' : 'MANUAL'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Workload Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {agentWorkloads.map((agent) => (
            <div key={agent.agentId} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(15px)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.2s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#e2e8f0', fontSize: '1.2rem' }}>{agent.agentName}</h3>
                <span style={{
                  background: getWorkloadColor(agent.workloadPercentage),
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {agent.workloadPercentage}%
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                    {agent.activeTasks}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Active Tasks</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                    {agent.completedTasks}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Completed</div>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Workload</span>
                  <span style={{ color: getWorkloadColor(agent.workloadPercentage), fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {agent.workloadPercentage}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${agent.workloadPercentage}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${getWorkloadColor(agent.workloadPercentage)} 0%, ${getWorkloadColor(agent.workloadPercentage)}80 100%)`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 8px 0', color: '#e2e8f0', fontSize: '0.9rem' }}>Specializations:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {agent.specializations.map((spec, index) => (
                    <span key={index} style={{
                      background: 'rgba(59, 130, 246, 0.2)',
                      color: '#3b82f6',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      border: '1px solid rgba(59, 130, 246, 0.3)'
                    }}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Task List */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(15px)',
          borderRadius: '15px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#e2e8f0', fontSize: '1.5rem' }}>
            📋 Active Tasks ({filteredTasks.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {filteredTasks.map((task) => (
              <div key={task.id} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, color: '#e2e8f0', fontSize: '1.1rem' }}>{task.title}</h4>
                      <span style={{
                        background: getPriorityColor(task.priority),
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        {task.priority}
                      </span>
                      <span style={{
                        background: getStatusColor(task.status),
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p style={{ color: '#94a3b8', margin: '0 0 10px 0', fontSize: '0.9rem', lineHeight: '1.4' }}>
                      {task.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                      <span>📅 {task.category}</span>
                      <span>⏱️ {task.estimatedTime}h estimated</span>
                      <span>👤 {agentWorkloads.find(a => a.agentId === task.assignedAgent)?.agentName}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: '120px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '5px' }}>
                      {task.progress}%
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Progress</div>
                  </div>
                </div>
                
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${task.progress}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${getStatusColor(task.status)} 0%, ${getStatusColor(task.status)}80 100%)`,
                    transition: 'width 0.3s ease'
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

export default CollaborativeTaskManagementSystem;
