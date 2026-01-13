import React, { useState, useEffect } from 'react';

interface Workspace {
  id: string;
  name: string;
  type: 'project' | 'lesson' | 'assessment' | 'resource' | 'cultural';
  description: string;
  collaborators: string[];
  status: 'active' | 'review' | 'completed' | 'archived';
  progress: number;
  lastActivity: Date;
  documents: number;
  discussions: number;
  culturalElements: string[];
  educationalFocus: string;
  yearLevel: string;
}

interface CollaborationActivity {
  id: string;
  agent: string;
  action: string;
  target: string;
  timestamp: Date;
  impact: 'high' | 'medium' | 'low';
}

const CollaborativeWorkspaceSystem: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activities, setActivities] = useState<CollaborationActivity[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>('all');
  const [isCollaborating, setIsCollaborating] = useState(true);

  useEffect(() => {
    initializeWorkspaceSystem();
    startCollaboration();
  }, []);

  const initializeWorkspaceSystem = () => {
    const initialWorkspaces: Workspace[] = [
      {
        id: 'workspace-1',
        name: 'Te Reo Māori Curriculum Development',
        type: 'project',
        description: 'Comprehensive Te Reo Māori curriculum for Years 1-13',
        collaborators: ['cursor-1', 'cursor-3', 'gemini-1'],
        status: 'active',
        progress: 78,
        lastActivity: new Date(Date.now() - 1800000),
        documents: 24,
        discussions: 12,
        culturalElements: ['tikanga', 'mana', 'whakapapa', 'manaakitanga'],
        educationalFocus: 'Language Acquisition',
        yearLevel: 'Years 1-13',
      },
      {
        id: 'workspace-2',
        name: 'Cultural Safety Assessment Framework',
        type: 'assessment',
        description: 'Developing comprehensive cultural safety assessment tools',
        collaborators: ['cursor-4', 'gemini-1', 'glm-1'],
        status: 'review',
        progress: 92,
        lastActivity: new Date(Date.now() - 900000),
        documents: 18,
        discussions: 8,
        culturalElements: ['tapu', 'noa', 'manaakitanga', 'kotahitanga'],
        educationalFocus: 'Cultural Competency',
        yearLevel: 'Years 9-13',
      },
      {
        id: 'workspace-3',
        name: 'Interactive Māori History Timeline',
        type: 'resource',
        description: 'Creating interactive digital timeline of Māori history',
        collaborators: ['cursor-2', 'cursor-3', 'claude-1'],
        status: 'active',
        progress: 65,
        lastActivity: new Date(Date.now() - 2700000),
        documents: 31,
        discussions: 15,
        culturalElements: ['whakapapa', 'whenua', 'moana', 'ngahere'],
        educationalFocus: 'Historical Understanding',
        yearLevel: 'Years 7-10',
      },
      {
        id: 'workspace-4',
        name: 'Matariki Celebration Activities',
        type: 'cultural',
        description: 'Community-focused Matariki celebration and learning activities',
        collaborators: ['cursor-1', 'cursor-3', 'gemini-1', 'glm-1'],
        status: 'active',
        progress: 85,
        lastActivity: new Date(Date.now() - 3600000),
        documents: 22,
        discussions: 19,
        culturalElements: ['tikanga', 'mana', 'whakapapa', 'whenua', 'moana'],
        educationalFocus: 'Cultural Celebration',
        yearLevel: 'All Levels',
      },
      {
        id: 'workspace-5',
        name: 'Sustainable Practices Education',
        type: 'lesson',
        description: 'Teaching sustainable practices through Māori perspectives',
        collaborators: ['cursor-2', 'cursor-4', 'claude-1'],
        status: 'active',
        progress: 58,
        lastActivity: new Date(Date.now() - 4500000),
        documents: 16,
        discussions: 11,
        culturalElements: ['kaitiakitanga', 'whenua', 'moana', 'ngahere'],
        educationalFocus: 'Environmental Education',
        yearLevel: 'Years 9-12',
      },
    ];

    const initialActivities: CollaborationActivity[] = [
      {
        id: 'activity-1',
        agent: 'Cursor Agent Alpha',
        action: 'created',
        target: 'Te Reo pronunciation guide',
        timestamp: new Date(Date.now() - 1800000),
        impact: 'high',
      },
      {
        id: 'activity-2',
        agent: 'Gemini Cultural Specialist',
        action: 'validated',
        target: 'cultural safety protocols',
        timestamp: new Date(Date.now() - 2400000),
        impact: 'high',
      },
      {
        id: 'activity-3',
        agent: 'Cursor Agent Gamma',
        action: 'enhanced',
        target: 'interactive timeline features',
        timestamp: new Date(Date.now() - 3000000),
        impact: 'medium',
      },
      {
        id: 'activity-4',
        agent: 'GLM Symphony Conductor',
        action: 'optimized',
        target: 'AI content generation',
        timestamp: new Date(Date.now() - 3600000),
        impact: 'high',
      },
      {
        id: 'activity-5',
        agent: 'Cursor Agent Delta',
        action: 'reviewed',
        target: 'system architecture',
        timestamp: new Date(Date.now() - 4200000),
        impact: 'medium',
      },
    ];

    setWorkspaces(initialWorkspaces);
    setActivities(initialActivities);
  };

  const startCollaboration = () => {
    const collaborationInterval = setInterval(() => {
      // Simulate new collaboration activities
      const newActivity: CollaborationActivity = {
        id: `activity-${Date.now()}`,
        agent: ['Cursor Agent Alpha', 'Cursor Agent Beta', 'Cursor Agent Gamma', 'Cursor Agent Delta', 'Gemini Cultural Specialist', 'GLM Symphony Conductor'][Math.floor(Math.random() * 6)],
        action: ['created', 'enhanced', 'reviewed', 'validated', 'optimized', 'collaborated on'][Math.floor(Math.random() * 6)],
        target: ['content', 'features', 'protocols', 'assessments', 'resources'][Math.floor(Math.random() * 5)],
        timestamp: new Date(),
        impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);

      // Update workspace progress
      setWorkspaces(prevWorkspaces => {
        return prevWorkspaces.map(workspace => {
          if (workspace.status === 'active' && Math.random() > 0.7) {
            return {
              ...workspace,
              progress: Math.min(100, workspace.progress + Math.floor(Math.random() * 3)),
              lastActivity: new Date(),
              documents: workspace.documents + Math.floor(Math.random() * 2),
              discussions: workspace.discussions + Math.floor(Math.random() * 2),
            };
          }
          return workspace;
        });
      });
    }, 3000);

    return () => clearInterval(collaborationInterval);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return '#3b82f6';
      case 'lesson': return '#10b981';
      case 'assessment': return '#f59e0b';
      case 'resource': return '#8b5cf6';
      case 'cultural': return '#ec4899';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'review': return '#f59e0b';
      case 'completed': return '#3b82f6';
      case 'archived': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const filteredWorkspaces = selectedWorkspace === 'all' 
    ? workspaces 
    : workspaces.filter(workspace => workspace.type === selectedWorkspace);

  const types = ['all', ...Array.from(new Set(workspaces.map(w => w.type)))];

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
            🤝 Collaborative Workspace System
          </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.2rem', margin: 0 }}>
                Multi-Agent Collaborative Development & Knowledge Sharing
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <select
                value={selectedWorkspace}
                onChange={(e) => setSelectedWorkspace(e.target.value)}
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
                background: isCollaborating ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                padding: '8px 16px',
                borderRadius: '20px'
              }}>
                <div style={{
                  width: '8px',
                    height: '8px',
                  borderRadius: '50%',
                  background: isCollaborating ? '#10b981' : '#ef4444',
                  animation: isCollaborating ? 'pulse 2s infinite' : 'none'
                }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {isCollaborating ? 'COLLABORATING' : 'STANDBY'}
                </span>
              </div>
                  </div>
                  </div>
                </div>

        {/* Collaboration Metrics */}
                <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {[
            { label: 'Active Workspaces', value: workspaces.filter(w => w.status === 'active').length, icon: '🏢', color: '#3b82f6' },
            { label: 'Total Collaborators', value: workspaces.reduce((sum, w) => sum + w.collaborators.length, 0), icon: '👥', color: '#10b981' },
            { label: 'Documents Created', value: workspaces.reduce((sum, w) => sum + w.documents, 0), icon: '📄', color: '#8b5cf6' },
            { label: 'Active Discussions', value: workspaces.reduce((sum, w) => sum + w.discussions, 0), icon: '💬', color: '#f59e0b' },
            { label: 'Avg Progress', value: `${Math.round(workspaces.reduce((sum, w) => sum + w.progress, 0) / workspaces.length)}%`, icon: '📈', color: '#ec4899' },
            { label: 'Recent Activities', value: activities.length, icon: '⚡', color: '#06b6d4' },
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

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Workspaces */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(15px)',
            borderRadius: '15px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#e2e8f0', fontSize: '1.5rem' }}>
              🏢 Collaborative Workspaces ({filteredWorkspaces.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {filteredWorkspaces.map((workspace) => (
                <div key={workspace.id} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <h4 style={{ margin: 0, color: '#e2e8f0', fontSize: '1.2rem' }}>{workspace.name}</h4>
                        <span style={{
                          background: getTypeColor(workspace.type),
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                        fontWeight: 'bold',
                          textTransform: 'uppercase'
                        }}>
                          {workspace.type}
                        </span>
                        <span style={{
                          background: getStatusColor(workspace.status),
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          textTransform: 'uppercase'
                        }}>
                          {workspace.status}
                        </span>
                      </div>
                      <p style={{ color: '#94a3b8', margin: '0 0 10px 0', fontSize: '0.9rem', lineHeight: '1.4' }}>
                        {workspace.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                        <span>🎓 {workspace.yearLevel}</span>
                        <span>📚 {workspace.educationalFocus}</span>
                        <span>📄 {workspace.documents} docs</span>
                        <span>💬 {workspace.discussions} discussions</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '100px' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '5px' }}>
                        {workspace.progress}%
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Progress</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <h5 style={{ margin: '0 0 8px 0', color: '#e2e8f0', fontSize: '0.9rem' }}>Cultural Elements:</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {workspace.culturalElements.map((element, index) => (
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

                  <div style={{
                    width: '100%',
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginBottom: '10px'
                  }}>
                    <div style={{
                      width: `${workspace.progress}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${getStatusColor(workspace.status)} 0%, ${getStatusColor(workspace.status)}80 100%)`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>

                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    Last activity: {workspace.lastActivity.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(15px)',
            borderRadius: '15px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#e2e8f0', fontSize: '1.5rem' }}>
              ⚡ Recent Activities
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activities.map((activity) => (
                <div key={activity.id} style={{
              background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  padding: '15px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{
                      background: getImpactColor(activity.impact),
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.6rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {activity.impact}
                    </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>
                      {activity.agent}
                    </span>
                  </div>
                  <p style={{ color: '#cbd5e1', margin: '0 0 5px 0', fontSize: '0.85rem' }}>
                    {activity.action} <span style={{ color: '#3b82f6' }}>{activity.target}</span>
                  </p>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                    {activity.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
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

export default CollaborativeWorkspaceSystem;