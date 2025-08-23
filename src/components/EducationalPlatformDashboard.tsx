import React, { useEffect, useState } from 'react';
import {
  educationalEnhancer,
  type EducationalEnhancement,
  type LearningPathway,
  type PerformanceMetrics,
} from '../utils/educational-enhancement';
import { initializeSuperintelligence } from '../utils/superintelligence';
import './EducationalPlatformDashboard.css';

interface SystemStatus {
  name: string;
  status: 'active' | 'inactive' | 'error';
  role: string;
  capabilities?: string[];
  metrics?: Record<string, unknown>;
}

const EducationalPlatformDashboard: React.FC = () => {
  const [systems, setSystems] = useState<SystemStatus[]>([]);
  const [enhancements, setEnhancements] = useState<EducationalEnhancement[]>([]);
  const [learningPathways, setLearningPathways] = useState<LearningPathway[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [overallStatus, setOverallStatus] = useState('initializing');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Initialize superintelligence with all capabilities
    initializeSuperintelligence({
      enabled: true,
      debug: true,
      heartbeatMs: 60000,
      name: 'Mihara Supreme Overseer',
      brainArchitecture: true,
      graphRag: true,
      overseerCouncil: true,
      culturalIntelligence: true,
      educationalAnalytics: true,
      multiAgentCoordination: true,
      performanceOptimization: true,
      culturalSafety: true,
    });

    // Load educational enhancements
    setEnhancements(educationalEnhancer.getEnhancements());
    setLearningPathways(educationalEnhancer.getLearningPathways());
    setPerformanceMetrics(educationalEnhancer.getPerformanceMetrics());

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

      // Add all superintelligence systems
      const systemNames = [
        'brain',
        'graphRag',
        'overseerCouncil',
        'culturalIntelligence',
        'educationalAnalytics',
        'multiAgentCoordination',
        'performanceOptimization',
        'culturalSafety',
      ];

      systemNames.forEach((systemName) => {
        const system = globalObj.Superintelligence[systemName];
        if (system) {
          newSystems.push({
            name: system.name,
            status: system.status,
            role: system.role,
            capabilities: system.capabilities,
            metrics: system.metrics,
          });
        }
      });

      setSystems(newSystems);
      setOverallStatus('active');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'inactive':
        return 'text-red-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'inactive':
        return '🔴';
      case 'error':
        return '⚠️';
      default:
        return '⚪';
    }
  };

  const formatMetric = (value: number, unit: string = '') => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k${unit}`;
    }
    return `${value}${unit}`;
  };

  return (
    <div className="educational-platform-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">🌿 Te Kete Ako - Complete Educational Platform</h1>
        <p className="dashboard-subtitle">
          Supreme Intelligence System - Multi-Agent Coordination Active
        </p>
        <div className="status-indicator">
          <span className={`status-dot ${getStatusColor(overallStatus)}`}>
            {getStatusIcon(overallStatus)}
          </span>
          <span className="status-text">System Status: {overallStatus.toUpperCase()}</span>
          <span className="last-update">Last Updated: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab ${activeTab === 'systems' ? 'active' : ''}`}
          onClick={() => setActiveTab('systems')}
        >
          🤖 Systems
        </button>
        <button
          className={`tab ${activeTab === 'enhancements' ? 'active' : ''}`}
          onClick={() => setActiveTab('enhancements')}
        >
          🚀 Enhancements
        </button>
        <button
          className={`tab ${activeTab === 'pathways' ? 'active' : ''}`}
          onClick={() => setActiveTab('pathways')}
        >
          🛤️ Learning Pathways
        </button>
        <button
          className={`tab ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          ⚡ Performance
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="metrics-grid">
              <div className="metric-card">
                <h3>Active Systems</h3>
                <div className="metric-value">
                  {systems.filter((s) => s.status === 'active').length}
                </div>
                <div className="metric-label">of {systems.length} total</div>
              </div>
              <div className="metric-card">
                <h3>Educational Enhancements</h3>
                <div className="metric-value">{enhancements.length}</div>
                <div className="metric-label">active enhancements</div>
              </div>
              <div className="metric-card">
                <h3>Learning Pathways</h3>
                <div className="metric-value">{learningPathways.length}</div>
                <div className="metric-label">curated pathways</div>
              </div>
              <div className="metric-card">
                <h3>Load Time</h3>
                <div className="metric-value">{performanceMetrics?.loadTime}s</div>
                <div className="metric-label">excellent performance</div>
              </div>
            </div>

            <div className="system-summary">
              <h2>System Summary</h2>
              <div className="summary-grid">
                <div className="summary-item">
                  <h4>🧠 Brain Architecture</h4>
                  <p>Advanced knowledge synthesis with cultural intelligence</p>
                </div>
                <div className="summary-item">
                  <h4>🔍 GRAPHRAG</h4>
                  <p>Semantic search and knowledge graph retrieval</p>
                </div>
                <div className="summary-item">
                  <h4>👥 Overseer Council</h4>
                  <p>Multi-agent coordination and decision making</p>
                </div>
                <div className="summary-item">
                  <h4>🌿 Cultural Intelligence</h4>
                  <p>Cultural safety and protocol compliance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'systems' && (
          <div className="systems-section">
            <h2>Superintelligence Systems</h2>
            <div className="systems-grid">
              {systems.map((system, index) => (
                <div key={index} className="system-card">
                  <div className="system-header">
                    <span className={`status-indicator ${getStatusColor(system.status)}`}>
                      {getStatusIcon(system.status)}
                    </span>
                    <h3>{system.name}</h3>
                  </div>
                  <p className="system-role">{system.role}</p>
                  {system.capabilities && (
                    <div className="capabilities">
                      <h4>Capabilities:</h4>
                      <ul>
                        {system.capabilities.slice(0, 3).map((capability, idx) => (
                          <li key={idx}>{capability}</li>
                        ))}
                        {system.capabilities.length > 3 && (
                          <li>+{system.capabilities.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}
                  {system.metrics && (
                    <div className="metrics">
                      <h4>Metrics:</h4>
                      <div className="metrics-grid-small">
                        {Object.entries(system.metrics)
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <div key={key} className="metric-item">
                              <span className="metric-key">{key}:</span>
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
        )}

        {activeTab === 'enhancements' && (
          <div className="enhancements-section">
            <h2>Educational Enhancements</h2>
            <div className="enhancements-grid">
              {enhancements.map((enhancement) => (
                <div key={enhancement.id} className="enhancement-card">
                  <div className="enhancement-header">
                    <span className={`enhancement-type ${enhancement.type}`}>
                      {enhancement.type.toUpperCase()}
                    </span>
                    <span className={`enhancement-status ${enhancement.status}`}>
                      {enhancement.status}
                    </span>
                  </div>
                  <h3>{enhancement.title}</h3>
                  <p className="enhancement-description">{enhancement.description}</p>
                  <div className="enhancement-details">
                    <div className="detail-item">
                      <strong>Implementation:</strong> {enhancement.implementation}
                    </div>
                    <div className="detail-item">
                      <strong>Impact:</strong> {enhancement.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pathways' && (
          <div className="pathways-section">
            <h2>Learning Pathways</h2>
            <div className="pathways-grid">
              {learningPathways.map((pathway) => (
                <div key={pathway.id} className="pathway-card">
                  <div className="pathway-header">
                    <h3>{pathway.title}</h3>
                    <span className={`difficulty-badge ${pathway.difficulty}`}>
                      {pathway.difficulty}
                    </span>
                  </div>
                  <div className="pathway-meta">
                    <span className="year-level">{pathway.yearLevel}</span>
                    <span className="subject">{pathway.subject}</span>
                    <span className="duration">{pathway.duration}</span>
                  </div>
                  <p className="cultural-context">{pathway.culturalContext}</p>
                  <div className="pathway-objectives">
                    <h4>Learning Objectives:</h4>
                    <ul>
                      {pathway.objectives.slice(0, 3).map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                      {pathway.objectives.length > 3 && (
                        <li>+{pathway.objectives.length - 3} more objectives</li>
                      )}
                    </ul>
                  </div>
                  <div className="pathway-resources">
                    <h4>Resources:</h4>
                    <div className="resource-tags">
                      {pathway.resources.slice(0, 3).map((resource, index) => (
                        <span key={index} className="resource-tag">
                          {resource}
                        </span>
                      ))}
                      {pathway.resources.length > 3 && (
                        <span className="resource-tag">+{pathway.resources.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="performance-section">
            <h2>Performance Metrics</h2>
            {performanceMetrics && (
              <div className="performance-grid">
                <div className="performance-card">
                  <h3>Load Time</h3>
                  <div className="performance-value">{performanceMetrics.loadTime}s</div>
                  <div className="performance-label">Excellent</div>
                </div>
                <div className="performance-card">
                  <h3>Build Time</h3>
                  <div className="performance-value">{performanceMetrics.buildTime}s</div>
                  <div className="performance-label">Fast</div>
                </div>
                <div className="performance-card">
                  <h3>Bundle Size</h3>
                  <div className="performance-value">
                    {formatMetric(performanceMetrics.bundleSize, 'KB')}
                  </div>
                  <div className="performance-label">Optimized</div>
                </div>
                <div className="performance-card">
                  <h3>Memory Usage</h3>
                  <div className="performance-value">
                    {(performanceMetrics.memoryUsage * 100).toFixed(0)}%
                  </div>
                  <div className="performance-label">Efficient</div>
                </div>
                <div className="performance-card">
                  <h3>Cache Hit Rate</h3>
                  <div className="performance-value">
                    {(performanceMetrics.cacheHitRate * 100).toFixed(0)}%
                  </div>
                  <div className="performance-label">High</div>
                </div>
                <div className="performance-card">
                  <h3>User Engagement</h3>
                  <div className="performance-value">
                    {(performanceMetrics.userEngagement * 100).toFixed(0)}%
                  </div>
                  <div className="performance-label">Excellent</div>
                </div>
                <div className="performance-card">
                  <h3>Learning Effectiveness</h3>
                  <div className="performance-value">
                    {(performanceMetrics.learningEffectiveness * 100).toFixed(0)}%
                  </div>
                  <div className="performance-label">High</div>
                </div>
                <div className="performance-card">
                  <h3>Cultural Relevance</h3>
                  <div className="performance-value">
                    {(performanceMetrics.culturalRelevance * 100).toFixed(0)}%
                  </div>
                  <div className="performance-label">Excellent</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationalPlatformDashboard;
