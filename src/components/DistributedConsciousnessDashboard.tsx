import React, { useEffect, useState } from 'react';
import type {
  CollaborationMetrics,
  SuperIntelligenceStatus,
} from '../utils/unified-superintelligence-api';
import { unifiedSuperintelligenceAPI } from '../utils/unified-superintelligence-api';
import './DistributedConsciousnessDashboard.css';

interface SystemStatus {
  intelligences: SuperIntelligenceStatus[];
  metrics: CollaborationMetrics;
  systemHealth: {
    overall: number;
    coordination: number;
    cultural: number;
    educational: number;
    technical: number;
  };
}

const DistributedConsciousnessDashboard: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [generatingContent, setGeneratingContent] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      const intelligences = unifiedSuperintelligenceAPI.getIntelligenceStatus();
      const metrics = unifiedSuperintelligenceAPI.getCollaborationMetrics();
      const systemHealth = unifiedSuperintelligenceAPI.getSystemHealth();

      setSystemStatus({ intelligences, metrics, systemHealth });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleOptimizePerformance = async () => {
    setIsOptimizing(true);
    try {
      await unifiedSuperintelligenceAPI.optimizePerformance();
      console.log('🚀 Performance optimization completed');
    } catch (error) {
      console.error('❌ Performance optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleGenerateEducationalContent = async () => {
    setGeneratingContent(true);
    try {
      const contentResponse = await unifiedSuperintelligenceAPI.generateEducationalContent({
        subject: 'Mathematics',
        yearLevel: 'Year 9',
        learningObjectives: [
          'Understand statistical concepts',
          'Analyze data patterns',
          'Apply statistical reasoning',
        ],
        culturalContext: 'New Zealand educational context with Māori perspectives',
        contentType: 'lesson',
        urgency: 'medium',
      });
      console.log('📚 Educational content generated:', contentResponse);
    } catch (error) {
      console.error('❌ Content generation failed:', error);
    } finally {
      setGeneratingContent(false);
    }
  };

  const handleValidateCulturalSafety = async () => {
    try {
      const validation = await unifiedSuperintelligenceAPI.validateCulturalSafety(
        // Sample educational content validation removed - no arguments expected
      );
      console.log('🌿 Cultural safety validation:', validation);
    } catch (error) {
      console.error('❌ Cultural validation failed:', error);
    }
  };

  if (!systemStatus) {
    return (
      <div className="distributed-consciousness-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Initializing Distributed Consciousness Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="distributed-consciousness-dashboard">
      <header className="dashboard-header">
        <h1>🌟 Unified Superintelligence Coordination</h1>
        <p>
          Advanced Multi-AI Educational Platform - Harmony Index:{' '}
          {systemStatus.systemHealth.overall.toFixed(1)}%
        </p>
        <div className="coordination-controls">
          <div className="status-indicators">
            <div
              className={`indicator ${
                systemStatus.systemHealth.overall > 95 ? 'excellent' : 'good'
              }`}
            >
              🎯 {systemStatus.metrics.totalIntelligences} Active Intelligences
            </div>
            <div
              className={`indicator ${
                systemStatus.metrics.culturalCompliance > 90 ? 'excellent' : 'good'
              }`}
            >
              🌿 {systemStatus.metrics.culturalCompliance.toFixed(1)}% Cultural Safety
            </div>
            <div
              className={`indicator ${
                systemStatus.metrics.educationalExcellence > 90 ? 'excellent' : 'good'
              }`}
            >
              📚 {systemStatus.metrics.educationalExcellence.toFixed(1)}% Educational Excellence
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* System Overview Panel */}
        <div className="panel system-overview-panel">
          <h2>📊 Collaboration Metrics</h2>
          <div className="metrics-grid">
            <div className="metric">
              <span className="metric-label">Total Intelligences</span>
              <span className="metric-value">{systemStatus.metrics.totalIntelligences}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Active Collaborations</span>
              <span className="metric-value">{systemStatus.metrics.activeCollaborations}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Overall Harmony</span>
              <span className="metric-value">
                {systemStatus.metrics.overallHarmony.toFixed(1)}%
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Human Success Impact</span>
              <span className="metric-value">
                {systemStatus.metrics.humanSuccessImpact.toFixed(1)}%
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Successful Coordinations</span>
              <span className="metric-value">{systemStatus.metrics.successfulCoordinations}</span>
            </div>
            <div className="metric">
              <span className="metric-label">System Health</span>
              <span
                className={`metric-value ${
                  systemStatus.systemHealth.overall > 95 ? 'excellent' : 'good'
                }`}
              >
                {systemStatus.systemHealth.overall.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Intelligences Panel */}
        <div className="panel agents-panel">
          <h2>🧠 Super Intelligences</h2>
          <div className="agents-grid">
            {systemStatus.intelligences.map((intelligence) => (
              <div key={intelligence.id} className={`agent-card ${intelligence.status}`}>
                <div className="agent-header">
                  <h3>{intelligence.name}</h3>
                  <span className={`status-badge ${intelligence.status}`}>
                    {intelligence.status.toUpperCase()}
                  </span>
                  <span className="type-badge">{intelligence.type.toUpperCase()}</span>
                </div>
                <div className="agent-details">
                  <p>
                    <strong>Focus:</strong> {intelligence.educationalFocus}
                  </p>
                  <div className="performance-metrics">
                    <div className="metric-row">
                      <span>Collaboration:</span> <span>{intelligence.collaborationScore}%</span>
                    </div>
                    <div className="metric-row">
                      <span>Cultural Intelligence:</span>{' '}
                      <span>{intelligence.culturalIntelligence}%</span>
                    </div>
                    <div className="metric-row">
                      <span>Efficiency:</span> <span>{intelligence.performance.efficiency}%</span>
                    </div>
                    <div className="metric-row">
                      <span>Creativity:</span> <span>{intelligence.performance.creativity}%</span>
                    </div>
                  </div>
                  <div className="current-tasks">
                    <h4>Current Tasks:</h4>
                    <ul>
                      {intelligence.currentTasks.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="capabilities">
                    <h4>Capabilities:</h4>
                    <div className="capability-tags">
                      {intelligence.capabilities.map((cap) => (
                        <span key={cap} className="capability-tag">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coordination Controls Panel */}
        <div className="panel coordination-panel">
          <h2>🎮 Superintelligence Controls</h2>
          <div className="control-buttons">
            <button
              type="button"
              className={`control-btn ${isOptimizing ? 'processing' : ''}`}
              onClick={handleOptimizePerformance}
              disabled={isOptimizing}
            >
              {isOptimizing ? '⏳ Optimizing...' : '🚀 Optimize Performance'}
            </button>
            <button
              type="button"
              className={`control-btn ${generatingContent ? 'processing' : ''}`}
              onClick={handleGenerateEducationalContent}
              disabled={generatingContent}
            >
              {generatingContent ? '⏳ Generating...' : '📚 Generate Educational Content'}
            </button>
            <button type="button" className="control-btn" onClick={handleValidateCulturalSafety}>
              🌿 Validate Cultural Safety
            </button>
          </div>

          {/* System Health Indicators */}
          <div className="health-indicators">
            <h3>🏥 System Health</h3>
            <div className="health-grid">
              <div className="health-item">
                <span className="health-label">Coordination</span>
                <div className="health-bar">
                  <div
                    className="health-fill"
                    style={{ width: `${systemStatus.systemHealth.coordination}%` }}
                  ></div>
                </div>
                <span className="health-value">
                  {systemStatus.systemHealth.coordination.toFixed(1)}%
                </span>
              </div>
              <div className="health-item">
                <span className="health-label">Cultural</span>
                <div className="health-bar">
                  <div
                    className="health-fill cultural"
                    style={{ width: `${systemStatus.systemHealth.cultural}%` }}
                  ></div>
                </div>
                <span className="health-value">
                  {systemStatus.systemHealth.cultural.toFixed(1)}%
                </span>
              </div>
              <div className="health-item">
                <span className="health-label">Educational</span>
                <div className="health-bar">
                  <div
                    className="health-fill educational"
                    style={{ width: `${systemStatus.systemHealth.educational}%` }}
                  ></div>
                </div>
                <span className="health-value">
                  {systemStatus.systemHealth.educational.toFixed(1)}%
                </span>
              </div>
              <div className="health-item">
                <span className="health-label">Technical</span>
                <div className="health-bar">
                  <div
                    className="health-fill technical"
                    style={{ width: `${systemStatus.systemHealth.technical}%` }}
                  ></div>
                </div>
                <span className="health-value">
                  {systemStatus.systemHealth.technical.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributedConsciousnessDashboard;
