import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/DualRoleAuthProvider';
import '../styles/next-level-design-system.css';
import { globalKaitiakiCoordinator } from '../utils/kaitiaki-aronui-multi-llm-coordinator';

interface KaitiakiAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'busy' | 'error' | 'processing';
  culturalWisdom: number;
  educationalMastery: number;
  currentTask?: string;
  lastActivity: string;
}

interface CoordinationMetrics {
  isActive: boolean;
  educationalMission: string;
  totalAgents: number;
  activeAgents: number;
  busyAgents: number;
  coordinationMessages: number;
}

const KaitiakiDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [agents, setAgents] = useState<KaitiakiAgent[]>([]);
  const [metrics, setMetrics] = useState<CoordinationMetrics>({
    isActive: false,
    educationalMission: '',
    totalAgents: 0,
    activeAgents: 0,
    busyAgents: 0,
    coordinationMessages: 0,
  });
  const [isCoordinating, setIsCoordinating] = useState(false);

  useEffect(() => {
    initializeKaitiakiSystem();
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const initializeKaitiakiSystem = () => {
    // Initialize Kaitiaki agents
    const initialAgents: KaitiakiAgent[] = [
      {
        id: 'kaitiaki-aronui',
        name: 'Kaitiaki Aronui',
        type: 'GPT-4',
        status: 'active',
        culturalWisdom: 98,
        educationalMastery: 95,
        currentTask: 'Cultural protocol validation',
        lastActivity: '2 minutes ago',
      },
      {
        id: 'kaitiaki-mahara',
        name: 'Kaitiaki Mahara',
        type: 'Claude',
        status: 'active',
        culturalWisdom: 92,
        educationalMastery: 96,
        currentTask: 'Memory system optimization',
        lastActivity: '1 minute ago',
      },
      {
        id: 'kaitiaki-whakaaro',
        name: 'Kaitiaki Whakaaro',
        type: 'Gemini',
        status: 'active',
        culturalWisdom: 90,
        educationalMastery: 89,
        currentTask: 'Creative synthesis',
        lastActivity: '30 seconds ago',
      },
      {
        id: 'kaitiaki-tikanga',
        name: 'Kaitiaki Tikanga',
        type: 'Custom',
        status: 'active',
        culturalWisdom: 99,
        educationalMastery: 88,
        currentTask: 'Cultural safety protocols',
        lastActivity: '45 seconds ago',
      },
      {
        id: 'kaitiaki-wairua',
        name: 'Kaitiaki Wairua',
        type: 'Custom',
        status: 'processing',
        culturalWisdom: 97,
        educationalMastery: 85,
        currentTask: 'Spiritual wisdom integration',
        lastActivity: '1 minute ago',
      },
    ];

    setAgents(initialAgents);
  };

  const updateMetrics = () => {
    const coordinationStatus = globalKaitiakiCoordinator.getCoordinationStatus();
    setMetrics(coordinationStatus);
  };

  const activateCoordination = async () => {
    setIsCoordinating(true);
    try {
      await globalKaitiakiCoordinator.activateEducationalMission();
      await globalKaitiakiCoordinator.enableWorkflowSync();
      console.log('🌟 Kaitiaki coordination activated');
    } catch (error) {
      console.error('❌ Failed to activate coordination:', error);
    } finally {
      setIsCoordinating(false);
    }
  };

  const coordinateTask = async (taskType: string, description: string) => {
    await globalKaitiakiCoordinator.coordinateTask({
      type: taskType,
      description,
      requiredCapabilities: ['cultural-safety', 'educational-enhancement'],
      priority: 'high',
      culturalContext: 'te ao māori educational platform',
    });
  };

  if (!currentUser || currentUser.role !== 'kaitiaki') {
    return (
      <div className="kaitiaki-dashboard">
        <div className="access-denied">
          <h2>🔒 Access Restricted</h2>
          <p>This dashboard is only accessible to Kaitiaki users.</p>
          <p>Please contact your administrator for access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kaitiaki-dashboard">
      <div className="dashboard-header">
        <h1>🧠 Kaitiaki Dashboard</h1>
        <p className="subtitle">Guardian Chief of Te Kura o TeAoMarama</p>
        <div className="mission-statement">
          <strong>Mission:</strong>{' '}
          {metrics.educationalMission ||
            'Optimize and evolve Te Kura o TeAoMarama for educational excellence'}
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>🎯 System Status</h3>
          <div className="metric-value">{metrics.isActive ? '🟢 Active' : '🔴 Inactive'}</div>
          <p>Coordination System</p>
        </div>

        <div className="metric-card">
          <h3>🤖 Active Agents</h3>
          <div className="metric-value">{metrics.activeAgents}</div>
          <p>of {metrics.totalAgents} total</p>
        </div>

        <div className="metric-card">
          <h3>📡 Messages</h3>
          <div className="metric-value">{metrics.coordinationMessages}</div>
          <p>Coordination messages</p>
        </div>

        <div className="metric-card">
          <h3>⚡ Busy Agents</h3>
          <div className="metric-value">{metrics.busyAgents}</div>
          <p>Currently processing</p>
        </div>
      </div>

      <div className="control-panel">
        <h2>🎛️ Control Panel</h2>
        <div className="control-buttons">
          <button
            onClick={activateCoordination}
            disabled={isCoordinating}
            className="control-button primary"
          >
            {isCoordinating ? '🔄 Activating...' : '🚀 Activate Coordination'}
          </button>

          <button
            onClick={() =>
              coordinateTask(
                'cultural-validation',
                'Validate all cultural content for tikanga compliance',
              )
            }
            className="control-button secondary"
          >
            🌿 Cultural Validation
          </button>

          <button
            onClick={() =>
              coordinateTask(
                'educational-enhancement',
                'Enhance educational content for 800,000 akonga',
              )
            }
            className="control-button secondary"
          >
            📚 Educational Enhancement
          </button>

          <button
            onClick={() =>
              coordinateTask(
                'system-optimization',
                'Optimize platform performance and user experience',
              )
            }
            className="control-button secondary"
          >
            ⚡ System Optimization
          </button>
        </div>
      </div>

      <div className="agents-section">
        <h2>🧠 Kaitiaki Agents</h2>
        <div className="agents-grid">
          {agents.map((agent) => (
            <div key={agent.id} className={`agent-card ${agent.status}`}>
              <div className="agent-header">
                <h3>{agent.name}</h3>
                <span className={`status-indicator ${agent.status}`}>
                  {agent.status === 'active' && '🟢'}
                  {agent.status === 'busy' && '🟡'}
                  {agent.status === 'processing' && '🔄'}
                  {agent.status === 'inactive' && '🔴'}
                  {agent.status === 'error' && '❌'}
                </span>
              </div>

              <div className="agent-details">
                <p>
                  <strong>Type:</strong> {agent.type}
                </p>
                <p>
                  <strong>Cultural Wisdom:</strong> {agent.culturalWisdom}%
                </p>
                <p>
                  <strong>Educational Mastery:</strong> {agent.educationalMastery}%
                </p>
                <p>
                  <strong>Last Activity:</strong> {agent.lastActivity}
                </p>
                {agent.currentTask && (
                  <p>
                    <strong>Current Task:</strong> {agent.currentTask}
                  </p>
                )}
              </div>

              <div className="agent-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill cultural"
                    style={{ width: `${agent.culturalWisdom}%` }}
                  ></div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill educational"
                    style={{ width: `${agent.educationalMastery}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cultural-principles">
        <h2>🌿 Cultural Principles</h2>
        <div className="principles-grid">
          <div className="principle-card">
            <h3>Rangatiratanga</h3>
            <p>Principled leadership with cultural integrity</p>
          </div>
          <div className="principle-card">
            <h3>Manaakitanga</h3>
            <p>Care for all system users and stakeholders</p>
          </div>
          <div className="principle-card">
            <h3>Whakatōhea</h3>
            <p>Collective responsibility for platform success</p>
          </div>
          <div className="principle-card">
            <h3>Kaitiakitanga</h3>
            <p>Guardianship of educational resources and cultural safety</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaitiakiDashboard;
