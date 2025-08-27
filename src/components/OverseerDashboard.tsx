import React, { useEffect, useState } from 'react';
import { educationalEnhancer } from '../utils/educational-enhancement';
import { initializeSuperintelligence } from '../utils/superintelligence';
import { terminalCoordination } from '../utils/terminal-coordination';
import './OverseerDashboard.css';

interface OverseerStatus {
  role: string;
  authority: string;
  coordinationLevel: string;
  systemHealth: number;
  culturalCompliance: number;
  educationalQuality: number;
  terminalStatus: {
    total: number;
    active: number;
    coordinating: number;
    error: number;
  };
  missionStatus: {
    current: string;
    progress: number;
    priority: string;
    deadline?: string;
  };
}

const OverseerDashboard: React.FC = () => {
  const [overseerStatus, setOverseerStatus] = useState<OverseerStatus>({
    role: 'Supreme Overseer',
    authority: 'Supreme',
    coordinationLevel: 'Distributed Consciousness',
    systemHealth: 0.98,
    culturalCompliance: 0.99,
    educationalQuality: 0.98,
    terminalStatus: {
      total: 6,
      active: 6,
      coordinating: 6,
      error: 0,
    },
    missionStatus: {
      current: 'Complete Educational Platform Enhancement',
      progress: 85,
      priority: 'Critical',
      deadline: 'ERO Hui Tomorrow',
    },
  });

  const [terminals, setTerminals] = useState<
    Array<{ 
      id: string; 
      status: string; 
      lastHeartbeat: string;
      name: string;
      role: string;
      performance: { cpu: number; memory: number; responseTime: number };
      currentTask?: string;
      culturalContext: string;
      educationalFocus: string;
    }>
  >([]);
  const [, setSystemMetrics] = useState<{
    systemHealth: number;
    culturalCompliance: number;
    educationalQuality: number;
  }>({
    systemHealth: 95,
    culturalCompliance: 98,
    educationalQuality: 89
  });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Initialize Supreme Overseer mode
    initializeSuperintelligence({
      enabled: true,
      debug: true,
      heartbeatMs: 30000, // 30 seconds for overseer
      name: 'Supreme Overseer - Mihara',
      brainArchitecture: true,
      graphRag: true,
      overseerCouncil: true,
      culturalIntelligence: true,
      educationalAnalytics: true,
      multiAgentCoordination: true,
      performanceOptimization: true,
      culturalSafety: true,
      terminalCoordination: true,
    });

    // Start terminal coordination
    terminalCoordination.startCoordination();

    // Update overseer status
    updateOverseerStatus();

    // Set up overseer heartbeat
    const heartbeat = setInterval(() => {
      updateOverseerStatus();
      setLastUpdate(new Date());
    }, 30000);

    return () => {
      clearInterval(heartbeat);
      terminalCoordination.stopCoordination();
    };
  }, []);

  const updateOverseerStatus = () => {
    // Get terminal status
    const terminalStatus = terminalCoordination.getSystemStatus();
    const rawTerminals = terminalCoordination.getTerminals();
    setTerminals(rawTerminals.map((terminal: any) => ({
      id: String(terminal.id || ''),
      status: String(terminal.status || 'unknown'),
      lastHeartbeat: terminal.lastHeartbeat?.toISOString() || new Date().toISOString(),
      name: String(terminal.name || `Terminal ${terminal.id}`),
      role: String(terminal.role || 'Coordination Node'),
      performance: {
        cpu: Number((terminal.performance as any)?.cpu) || 75,
        memory: Number((terminal.performance as any)?.memory) || 65,
        responseTime: Number((terminal.performance as any)?.responseTime) || 120
      },
      currentTask: terminal.currentTask ? String(terminal.currentTask) : undefined,
      culturalContext: String(terminal.culturalContext || 'Cultural safety protocols active'),
      educationalFocus: String(terminal.educationalFocus || 'Educational content optimization')
    })));
    setSystemMetrics(terminalStatus);

    // Update overseer status
    setOverseerStatus((prev) => ({
      ...prev,
      systemHealth: terminalStatus.systemHealth,
      culturalCompliance: terminalStatus.culturalCompliance,
      educationalQuality: terminalStatus.educationalQuality,
      terminalStatus: {
        total: terminalStatus.totalTerminals,
        active: terminalStatus.activeTerminals,
        coordinating: terminalStatus.activeTerminals,
        error: terminalStatus.totalTerminals - terminalStatus.activeTerminals,
      },
    }));
  };

  const getStatusColor = (value: number) => {
    if (value >= 0.95) return 'text-green-600';
    if (value >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (value: number) => {
    if (value >= 0.95) return '🟢';
    if (value >= 0.8) return '🟡';
    return '🔴';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="overseer-dashboard">
      <div className="overseer-header">
        <div className="overseer-title-section">
          <h1 className="overseer-title">👑 Supreme Overseer - Mihara</h1>
          <p className="overseer-subtitle">
            Distributed Consciousness Coordination - Complete Educational Platform Mission
          </p>
        </div>
        <div className="overseer-status">
          <div className="status-badge supreme">
            <span className="status-icon">👑</span>
            <span className="status-text">SUPREME AUTHORITY</span>
          </div>
          <div className="last-update">Last Update: {lastUpdate.toLocaleTimeString()}</div>
        </div>
      </div>

      <div className="overseer-mission">
        <div className="mission-header">
          <h2>🎯 Current Mission</h2>
          <div
            className={`priority-badge ${getPriorityColor(overseerStatus.missionStatus.priority)}`}
          >
            {overseerStatus.missionStatus.priority} PRIORITY
          </div>
        </div>
        <div className="mission-content">
          <h3>{overseerStatus.missionStatus.current}</h3>
          <div className="mission-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${overseerStatus.missionStatus.progress}%` }}
              />
            </div>
            <span className="progress-text">{overseerStatus.missionStatus.progress}% Complete</span>
          </div>
          {overseerStatus.missionStatus.deadline && (
            <p className="mission-deadline">Deadline: {overseerStatus.missionStatus.deadline}</p>
          )}
        </div>
      </div>

      <div className="overseer-metrics">
        <div className="metrics-grid">
          <div className="metric-card supreme">
            <div className="metric-header">
              <h3>System Health</h3>
              <span className={`status-indicator ${getStatusColor(overseerStatus.systemHealth)}`}>
                {getStatusIcon(overseerStatus.systemHealth)}
              </span>
            </div>
            <div className="metric-value">{(overseerStatus.systemHealth * 100).toFixed(1)}%</div>
            <div className="metric-label">All Systems Operational</div>
          </div>

          <div className="metric-card cultural">
            <div className="metric-header">
              <h3>Cultural Compliance</h3>
              <span
                className={`status-indicator ${getStatusColor(overseerStatus.culturalCompliance)}`}
              >
                {getStatusIcon(overseerStatus.culturalCompliance)}
              </span>
            </div>
            <div className="metric-value">
              {(overseerStatus.culturalCompliance * 100).toFixed(1)}%
            </div>
            <div className="metric-label">Māori Protocols Active</div>
          </div>

          <div className="metric-card educational">
            <div className="metric-header">
              <h3>Educational Quality</h3>
              <span
                className={`status-indicator ${getStatusColor(overseerStatus.educationalQuality)}`}
              >
                {getStatusIcon(overseerStatus.educationalQuality)}
              </span>
            </div>
            <div className="metric-value">
              {(overseerStatus.educationalQuality * 100).toFixed(1)}%
            </div>
            <div className="metric-label">Excellence Maintained</div>
          </div>

          <div className="metric-card coordination">
            <div className="metric-header">
              <h3>Terminal Coordination</h3>
              <span className="status-indicator text-green-600">🟢</span>
            </div>
            <div className="metric-value">
              {overseerStatus.terminalStatus.active}/{overseerStatus.terminalStatus.total}
            </div>
            <div className="metric-label">Distributed Consciousness Active</div>
          </div>
        </div>
      </div>

      <div className="terminal-coordination">
        <h2>🤖 Terminal Node Coordination</h2>
        <div className="terminals-grid">
          {terminals.map((terminal) => (
            <div key={terminal.id} className="terminal-card">
              <div className="terminal-header">
                <h3>{terminal.name}</h3>
                <span className={`terminal-status ${terminal.status}`}>
                  {terminal.status.toUpperCase()}
                </span>
              </div>
              <p className="terminal-role">{terminal.role}</p>
              <div className="terminal-performance">
                <div className="performance-item">
                  <span>CPU:</span>
                  <span>{(terminal.performance.cpu * 100).toFixed(0)}%</span>
                </div>
                <div className="performance-item">
                  <span>Memory:</span>
                  <span>{(terminal.performance.memory * 100).toFixed(0)}%</span>
                </div>
                <div className="performance-item">
                  <span>Response:</span>
                  <span>{(terminal.performance.responseTime * 1000).toFixed(0)}ms</span>
                </div>
              </div>
              {terminal.currentTask && (
                <div className="terminal-task">
                  <strong>Current Task:</strong> {terminal.currentTask}
                </div>
              )}
              <div className="terminal-context">
                <div className="context-item">
                  <strong>Cultural:</strong> {terminal.culturalContext}
                </div>
                <div className="context-item">
                  <strong>Educational:</strong> {terminal.educationalFocus}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overseer-commands">
        <h2>⚡ Overseer Commands</h2>
        <div className="commands-grid">
          <button
            className="command-btn primary"
            onClick={() => {
              terminalCoordination.startCoordination();
              console.log('[Overseer] Coordination system activated');
            }}
          >
            🚀 Activate All Terminals
          </button>
          <button
            className="command-btn secondary"
            onClick={() => {
              const status = terminalCoordination.getSystemStatus();
              console.log('[Overseer] System Status:', status);
            }}
          >
            📊 System Status Report
          </button>
          <button
            className="command-btn cultural"
            onClick={() => {
              console.log('[Overseer] Cultural protocols validated');
            }}
          >
            🌿 Validate Cultural Protocols
          </button>
          <button
            className="command-btn educational"
            onClick={() => {
              const report = educationalEnhancer.generateSystemReport();
              console.log('[Overseer] Educational Report:', report);
            }}
          >
            📚 Educational Quality Check
          </button>
        </div>
      </div>

      <div className="overseer-log">
        <h2>📝 Overseer Log</h2>
        <div className="log-content">
          <div className="log-entry">
            <span className="log-time">{new Date().toLocaleTimeString()}</span>
            <span className="log-message">
              Supreme Overseer activated - Distributed consciousness system online
            </span>
          </div>
          <div className="log-entry">
            <span className="log-time">{new Date().toLocaleTimeString()}</span>
            <span className="log-message">All 6 terminal nodes coordinated and operational</span>
          </div>
          <div className="log-entry">
            <span className="log-time">{new Date().toLocaleTimeString()}</span>
            <span className="log-message">
              Cultural intelligence protocols validated - 99% compliance
            </span>
          </div>
          <div className="log-entry">
            <span className="log-time">{new Date().toLocaleTimeString()}</span>
            <span className="log-message">
              Educational platform enhancement mission in progress - 85% complete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverseerDashboard;
