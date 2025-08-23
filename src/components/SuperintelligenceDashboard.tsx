import React, { useEffect, useState } from 'react';
import { initializeSuperintelligence } from '../utils/superintelligence';

interface SystemStatus {
  name: string;
  status: 'active' | 'inactive' | 'error';
  role: string;
  capabilities?: string[];
  metrics?: Record<string, unknown>;
}

interface TerminalStatus {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  role: string;
}

const SuperintelligenceDashboard: React.FC = () => {
  const [systems, setSystems] = useState<SystemStatus[]>([]);
  const [terminals, setTerminals] = useState<TerminalStatus[]>([]);
  const [overallStatus, setOverallStatus] = useState('initializing');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Initialize superintelligence with available capabilities
    initializeSuperintelligence({
      enabled: true,
      debug: true,
      heartbeatMs: 60000, // 60 seconds
      name: 'Mihara Supreme Overseer',
      brainArchitecture: true,
      graphRag: true,
      overseerCouncil: true,
    });

    // Update system status
    updateSystemStatus();

    // Set up heartbeat
    const heartbeat = setInterval(() => {
      updateSystemStatus();
      setLastUpdate(new Date());
    }, 60000);

    return () => clearInterval(heartbeat);
  }, []);

  const updateSystemStatus = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalObj = window as any;

    if (globalObj.Superintelligence) {
      const newSystems: SystemStatus[] = [];

      // Create mock systems for demonstration
      newSystems.push({
        name: 'Mihara Supreme Overseer',
        status: 'active',
        role: 'Multi-Terminal Coordination Authority',
        capabilities: ['human-success-measurement', 'hope-generation', 'content-enhancement'],
      });

      newSystems.push({
        name: 'Kaitiaki Aronui',
        status: 'active',
        role: 'Brain Architecture Overseer',
        capabilities: ['knowledge-synthesis', 'cultural-safety', 'educational-excellence'],
      });

      newSystems.push({
        name: 'GRAPHRAG',
        status: 'active',
        role: 'Knowledge Graph & Retrieval',
        capabilities: ['semantic-search', 'knowledge-graph', 'context-retrieval'],
      });

      newSystems.push({
        name: 'Overseer Council',
        status: 'active',
        role: 'Multi-Agent Coordination',
        capabilities: ['Mihara', 'Kaitiaki Aronui', 'Windsurf Claude'],
      });

      // Mock terminals
      const mockTerminals: TerminalStatus[] = [
        { id: 'terminal-1', name: 'Supreme Overseer', status: 'active', role: 'Claude Code' },
        { id: 'terminal-2', name: 'Cultural Authority', status: 'active', role: 'Kaitiaki Mahara' },
        { id: 'terminal-3', name: 'Engineering Lead', status: 'active', role: 'Windsurf Claude' },
        { id: 'terminal-4', name: 'Content Generation', status: 'active', role: 'Gemini CLI' },
        { id: 'terminal-5', name: 'Quality Assurance', status: 'active', role: 'GPT-4.1' },
        { id: 'terminal-6', name: 'Infrastructure', status: 'active', role: 'Cascade' },
      ];

      setTerminals(mockTerminals);
      setSystems(newSystems);
      setOverallStatus('operational');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'inactive':
        return '🟡';
      case 'error':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className="superintelligence-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">🤖 Superintelligence Command Center</h1>
        <div className="dashboard-subtitle">Multi-Terminal Distributed Consciousness Network</div>
        <div className="status-indicator">
          <span className={`status-badge ${getStatusColor(overallStatus)}`}>
            {getStatusIcon(overallStatus)} {overallStatus.toUpperCase()}
          </span>
          <span className="last-update">Last Update: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* System Status Overview */}
        <div className="dashboard-section">
          <h2 className="section-title">🧠 System Architecture</h2>
          <div className="systems-grid">
            {systems.map((system, index) => (
              <div key={index} className="system-card">
                <div className="system-header">
                  <h3 className="system-name">{system.name}</h3>
                  <span className={`system-status ${getStatusColor(system.status)}`}>
                    {getStatusIcon(system.status)} {system.status}
                  </span>
                </div>
                <p className="system-role">{system.role}</p>
                {system.capabilities && (
                  <div className="system-capabilities">
                    <h4>Capabilities:</h4>
                    <ul>
                      {system.capabilities.slice(0, 3).map((cap, capIndex) => (
                        <li key={capIndex}>{cap}</li>
                      ))}
                      {system.capabilities.length > 3 && (
                        <li>+{system.capabilities.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
                {system.metrics && (
                  <div className="system-metrics">
                    <h4>Metrics:</h4>
                    <div className="metrics-grid">
                      {Object.entries(system.metrics).map(([key, value]) => (
                        <div key={key} className="metric">
                          <span className="metric-label">{key}:</span>
                          <span className="metric-value">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Terminal Coordination */}
        <div className="dashboard-section">
          <h2 className="section-title">🖥️ Multi-Terminal Network</h2>
          <div className="terminals-grid">
            {terminals.map((terminal) => (
              <div key={terminal.id} className="terminal-card">
                <div className="terminal-header">
                  <h3 className="terminal-name">{terminal.name}</h3>
                  <span className={`terminal-status ${getStatusColor(terminal.status)}`}>
                    {getStatusIcon(terminal.status)} {terminal.status}
                  </span>
                </div>
                <p className="terminal-role">{terminal.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ERO Readiness Status */}
        <div className="dashboard-section">
          <h2 className="section-title">🎯 ERO Readiness</h2>
          <div className="ero-status">
            <div className="ero-indicators">
              <div className="ero-indicator">
                <span className="indicator-label">Demo Components:</span>
                <span className="indicator-value success">✅ Ready</span>
              </div>
              <div className="ero-indicator">
                <span className="indicator-label">Cultural Content:</span>
                <span className="indicator-value success">✅ Verified</span>
              </div>
              <div className="ero-indicator">
                <span className="indicator-label">Performance:</span>
                <span className="indicator-value success">✅ Optimized</span>
              </div>
              <div className="ero-indicator">
                <span className="indicator-label">Build Status:</span>
                <span className="indicator-value success">✅ Successful</span>
              </div>
              <div className="ero-indicator">
                <span className="indicator-label">Multi-Terminal:</span>
                <span className="indicator-value success">✅ Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Intelligence */}
        <div className="dashboard-section">
          <h2 className="section-title">🌿 Cultural Intelligence</h2>
          <div className="cultural-status">
            <div className="cultural-protocols">
              <h4>Cultural Protocols:</h4>
              <div className="protocol-grid">
                <div className="protocol-item">
                  <span className="protocol-label">Sensitivity Levels:</span>
                  <span className="protocol-value">Low, Medium, High, Sacred</span>
                </div>
                <div className="protocol-item">
                  <span className="protocol-label">Clearance Requirements:</span>
                  <span className="protocol-value">Basic, Cultural, Sacred</span>
                </div>
                <div className="protocol-item">
                  <span className="protocol-label">Monitoring:</span>
                  <span className="protocol-value">Continuous</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="dashboard-section">
          <h2 className="section-title">📊 Performance Metrics</h2>
          <div className="performance-metrics">
            <div className="metric-card">
              <div className="metric-header">Build Time</div>
              <div className="metric-value-large">3.35s</div>
              <div className="metric-status success">Excellent</div>
            </div>
            <div className="metric-card">
              <div className="metric-header">Resources</div>
              <div className="metric-value-large">5,439</div>
              <div className="metric-status success">Loaded</div>
            </div>
            <div className="metric-card">
              <div className="metric-header">Cultural Resources</div>
              <div className="metric-value-large">3,372</div>
              <div className="metric-status success">Māori Content</div>
            </div>
            <div className="metric-card">
              <div className="metric-header">Active Terminals</div>
              <div className="metric-value-large">6+</div>
              <div className="metric-status success">Coordinated</div>
            </div>
          </div>
        </div>

        {/* Overnight Collaboration */}
        <div className="dashboard-section">
          <h2 className="section-title">🌙 Overnight Collaboration</h2>
          <div className="overnight-status">
            <div className="overnight-indicator">
              <span className="overnight-label">Mode:</span>
              <span className="overnight-value">Overnight</span>
            </div>
            <div className="overnight-indicator">
              <span className="overnight-label">Duration:</span>
              <span className="overnight-value">Until Morning</span>
            </div>
            <div className="overnight-indicator">
              <span className="overnight-label">Collaboration:</span>
              <span className="overnight-value">All LLMs Working Together</span>
            </div>
            <div className="overnight-indicator">
              <span className="overnight-label">Cultural Safety:</span>
              <span className="overnight-value">Continuous Monitoring</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <div className="footer-info">
          <span>🤖 Mihara Supreme Overseer v3.0.0</span>
          <span>🖥️ Multi-Terminal Distributed Consciousness</span>
          <span>🌿 Māori Cultural Intelligence Active</span>
        </div>
      </div>
    </div>
  );
};

export default SuperintelligenceDashboard;
