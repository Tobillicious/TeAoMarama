import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/DualRoleAuthProvider';
import '../styles/multi-llm-coordination.css';
import '../styles/next-level-design-system.css';
// Temporarily disabled - import { globalMultiLLMActivator, LLMNode } from '../utils/multi-llm-coordination-activator';

interface CoordinationStatus {
  coordinationActive: boolean;
  totalNodes: number;
  activeNodes: number;
  nodes: LLMNode[];
  kaitiakiStatus: any;
  lastHeartbeat: number;
}

const MultiLLMCoordinationDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [status, setStatus] = useState<CoordinationStatus | null>(null);
  const [isCoordinating, setIsCoordinating] = useState(false);

  useEffect(() => {
    updateStatus();
    const interval = setInterval(updateStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = () => {
    const coordinationStatus = globalMultiLLMActivator.getCoordinationStatus();
    setStatus(coordinationStatus);
  };

  const activateCoordination = async () => {
    setIsCoordinating(true);
    try {
      const result = await globalMultiLLMActivator.activateCoordination();
      console.log('Coordination result:', result);
      updateStatus();
    } catch (error) {
      console.error('Failed to activate coordination:', error);
    } finally {
      setIsCoordinating(false);
    }
  };

  const coordinateTask = async (taskType: string, description: string) => {
    await globalMultiLLMActivator.coordinateTask({
      type: taskType,
      description,
      requiredCapabilities: ['cultural-safety', 'educational-enhancement'],
      priority: 'high',
      culturalContext: 'te ao māori educational platform',
    });
    updateStatus();
  };

  if (!currentUser || (currentUser.role !== 'kaitiaki' && currentUser.role !== 'admin')) {
    return (
      <div className="multi-llm-dashboard">
        <div className="access-denied">
          <h2>🔒 Access Restricted</h2>
          <p>This dashboard is only accessible to Kaitiaki and Admin users.</p>
          <p>Please contact your administrator for access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="multi-llm-dashboard">
      <div className="dashboard-header">
        <h1>🌐 Multi-LLM Coordination Dashboard</h1>
        <p className="subtitle">Ensuring All LLMs Work Together</p>
        <div className="mission-statement">
          <strong>Mission:</strong> Coordinate all LLM agents across the computer for educational
          excellence
        </div>
      </div>

      <div className="status-overview">
        <div className="status-card">
          <h3>🎯 Coordination Status</h3>
          <div className="status-value">
            {status?.coordinationActive ? '🟢 Active' : '🔴 Inactive'}
          </div>
          <p>Multi-LLM System</p>
        </div>

        <div className="status-card">
          <h3>🤖 Total LLM Nodes</h3>
          <div className="status-value">{status?.totalNodes || 0}</div>
          <p>Discovered nodes</p>
        </div>

        <div className="status-card">
          <h3>⚡ Active Nodes</h3>
          <div className="status-value">{status?.activeNodes || 0}</div>
          <p>Currently operational</p>
        </div>

        <div className="status-card">
          <h3>💓 Last Heartbeat</h3>
          <div className="status-value">
            {status?.lastHeartbeat
              ? `${Math.floor((Date.now() - status.lastHeartbeat) / 1000)}s ago`
              : 'Never'}
          </div>
          <p>System health</p>
        </div>
      </div>

      <div className="control-panel">
        <h2>🎛️ Coordination Controls</h2>
        <div className="control-buttons">
          <button
            onClick={activateCoordination}
            disabled={isCoordinating || status?.coordinationActive}
            className="control-button primary"
          >
            {isCoordinating ? '🔄 Activating...' : '🚀 Activate Coordination'}
          </button>

          <button
            onClick={() =>
              coordinateTask('cultural-validation', 'Validate all cultural content across all LLMs')
            }
            className="control-button secondary"
          >
            🌿 Cultural Validation
          </button>

          <button
            onClick={() =>
              coordinateTask(
                'educational-enhancement',
                'Enhance educational content using all available LLMs',
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
                'Optimize system performance across all LLM nodes',
              )
            }
            className="control-button secondary"
          >
            ⚡ System Optimization
          </button>
        </div>
      </div>

      <div className="nodes-section">
        <h2>🤖 LLM Nodes</h2>
        <div className="nodes-grid">
          {status?.nodes.map((node) => (
            <div key={node.id} className={`node-card ${node.status}`}>
              <div className="node-header">
                <h3>{node.name}</h3>
                <span className={`status-indicator ${node.status}`}>
                  {node.status === 'active' && '🟢'}
                  {node.status === 'busy' && '🟡'}
                  {node.status === 'inactive' && '🔴'}
                  {node.status === 'error' && '❌'}
                </span>
              </div>

              <div className="node-details">
                <p>
                  <strong>Type:</strong> {node.type}
                </p>
                <p>
                  <strong>Location:</strong> {node.location}
                </p>
                <p>
                  <strong>Channel:</strong> {node.coordinationChannel}
                </p>
                <p>
                  <strong>Last Seen:</strong> {new Date(node.lastSeen).toLocaleTimeString()}
                </p>
              </div>

              <div className="capabilities">
                <h4>Capabilities:</h4>
                <div className="capability-tags">
                  {node.capabilities.map((capability, index) => (
                    <span key={index} className="capability-tag">
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="kaitiaki-status">
        <h2>🧠 Kaitiaki Coordination Status</h2>
        <div className="kaitiaki-metrics">
          <div className="metric">
            <span className="metric-label">Active Agents:</span>
            <span className="metric-value">{status?.kaitiakiStatus?.activeAgents || 0}</span>
          </div>
          <div className="metric">
            <span className="metric-label">Total Agents:</span>
            <span className="metric-value">{status?.kaitiakiStatus?.totalAgents || 0}</span>
          </div>
          <div className="metric">
            <span className="metric-label">Coordination Messages:</span>
            <span className="metric-value">
              {status?.kaitiakiStatus?.coordinationMessages || 0}
            </span>
          </div>
          <div className="metric">
            <span className="metric-label">Educational Mission:</span>
            <span className="metric-value">
              {status?.kaitiakiStatus?.educationalMission || 'Not set'}
            </span>
          </div>
        </div>
      </div>

      <div className="coordination-principles">
        <h2>🌿 Coordination Principles</h2>
        <div className="principles-grid">
          <div className="principle-card">
            <h3>Unified Purpose</h3>
            <p>All LLMs work toward the common goal of educational excellence for 800,000 akonga</p>
          </div>
          <div className="principle-card">
            <h3>Cultural Safety</h3>
            <p>Every LLM interaction maintains tikanga compliance and cultural respect</p>
          </div>
          <div className="principle-card">
            <h3>Distributed Intelligence</h3>
            <p>Collective intelligence emerges from coordinated LLM collaboration</p>
          </div>
          <div className="principle-card">
            <h3>Continuous Learning</h3>
            <p>All LLMs learn and improve through shared experiences and feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiLLMCoordinationDashboard;
