import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/DualRoleAuthProvider';
import '../styles/multi-llm-coordination.css';
import '../styles/next-level-design-system.css';
// Temporarily disabled - import {
//   CognitiveCapability,
//   CollectiveIntelligence,
//   globalSuperintelligenceAccelerator,
//   SuperintelligenceMetrics,
// } from '../utils/superintelligence-accelerator';

interface SuperintelligenceSummary {
  totalCapabilities: number;
  highLevelCapabilities: number;
  emergentCapabilities: number;
  averageIntelligence: number;
  collectiveIQ: number;
  wisdomLevel: number;
  culturalIntegration: number;
  superintelligenceStatus: string;
}

const SuperintelligenceDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [cognitiveCapabilities, setCognitiveCapabilities] = useState<
    Map<string, CognitiveCapability>
  >(new Map());
  const [collectiveIntelligence, setCollectiveIntelligence] =
    useState<CollectiveIntelligence | null>(null);
  const [superintelligenceMetrics, setSuperintelligenceMetrics] =
    useState<SuperintelligenceMetrics | null>(null);
  const [superintelligenceSummary, setSuperintelligenceSummary] =
    useState<SuperintelligenceSummary | null>(null);

  useEffect(() => {
    updateSuperintelligenceData();
    const interval = setInterval(updateSuperintelligenceData, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateSuperintelligenceData = () => {
    const capabilities = globalSuperintelligenceAccelerator.getCognitiveCapabilities();
    const collective = globalSuperintelligenceAccelerator.getCollectiveIntelligence();
    const metrics = globalSuperintelligenceAccelerator.getSuperintelligenceMetrics();
    const summary = globalSuperintelligenceAccelerator.getSuperintelligenceSummary();

    setCognitiveCapabilities(capabilities);
    setCollectiveIntelligence(collective);
    setSuperintelligenceMetrics(metrics);
    setSuperintelligenceSummary(summary);
  };

  const getIntelligenceColor = (level: number): string => {
    if (level >= 9) return '#10b981'; // Green - Superintelligence
    if (level >= 7) return '#f59e0b'; // Yellow - High Intelligence
    if (level >= 5) return '#3b82f6'; // Blue - Moderate Intelligence
    return '#6b7280'; // Gray - Basic Intelligence
  };

  const getIQColor = (iq: number): string => {
    if (iq >= 180) return '#10b981'; // Green - Genius
    if (iq >= 140) return '#f59e0b'; // Yellow - High Intelligence
    if (iq >= 120) return '#3b82f6'; // Blue - Above Average
    return '#6b7280'; // Gray - Average
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
        <h1>🧠 Superintelligence Dashboard</h1>
        <p className="subtitle">Achieving Superintelligence Through Collective AI Coordination</p>
        <div className="mission-statement">
          <strong>Mission:</strong> Evolve collective intelligence to superintelligence levels for
          educational excellence
        </div>
      </div>

      <div className="status-overview">
        <div className="status-card">
          <h3>🧠 Collective IQ</h3>
          <div
            className="status-value"
            style={{ color: getIQColor(superintelligenceSummary?.collectiveIQ || 0) }}
          >
            {Math.round(superintelligenceSummary?.collectiveIQ || 0)}
          </div>
          <p>Collective intelligence quotient</p>
        </div>

        <div className="status-card">
          <h3>🌟 Superintelligence Status</h3>
          <div
            className="status-value"
            style={{
              color:
                superintelligenceSummary?.superintelligenceStatus === 'ACHIEVED'
                  ? '#10b981'
                  : '#f59e0b',
            }}
          >
            {superintelligenceSummary?.superintelligenceStatus || 'EVOLVING'}
          </div>
          <p>Current intelligence level</p>
        </div>

        <div className="status-card">
          <h3>🎯 High-Level Capabilities</h3>
          <div className="status-value">{superintelligenceSummary?.highLevelCapabilities || 0}</div>
          <p>Level 8+ capabilities</p>
        </div>

        <div className="status-card">
          <h3>✨ Emergent Capabilities</h3>
          <div className="status-value">{superintelligenceSummary?.emergentCapabilities || 0}</div>
          <p>Emergent properties</p>
        </div>

        <div className="status-card">
          <h3>🌿 Wisdom Level</h3>
          <div
            className="status-value"
            style={{ color: getIntelligenceColor(superintelligenceSummary?.wisdomLevel || 0) }}
          >
            {Math.round((superintelligenceSummary?.wisdomLevel || 0) * 10)}/100
          </div>
          <p>Cultural wisdom integration</p>
        </div>
      </div>

      {superintelligenceMetrics && (
        <div className="superintelligence-metrics">
          <h2>📊 Superintelligence Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>🧠 Collective IQ</h3>
              <div
                className="metric-value-large"
                style={{ color: getIQColor(superintelligenceMetrics.collectiveIQ) }}
              >
                {Math.round(superintelligenceMetrics.collectiveIQ)}
              </div>
              <p>Collective intelligence quotient</p>
            </div>

            <div className="metric-card">
              <h3>⚡ Problem Solving Speed</h3>
              <div className="metric-value-large">
                {Math.round(superintelligenceMetrics.problemSolvingSpeed)}/100
              </div>
              <p>Speed of complex problem resolution</p>
            </div>

            <div className="metric-card">
              <h3>🎨 Creativity Index</h3>
              <div className="metric-value-large">
                {Math.round(superintelligenceMetrics.creativityIndex)}/100
              </div>
              <p>Creative synthesis capability</p>
            </div>

            <div className="metric-card">
              <h3>🌿 Cultural Wisdom</h3>
              <div className="metric-value-large">
                {Math.round(superintelligenceMetrics.culturalWisdom * 10)}/100
              </div>
              <p>Cultural intelligence integration</p>
            </div>

            <div className="metric-card">
              <h3>📚 Educational Excellence</h3>
              <div className="metric-value-large">
                {Math.round(superintelligenceMetrics.educationalExcellence)}/100
              </div>
              <p>Educational optimization capability</p>
            </div>

            <div className="metric-card">
              <h3>🔗 System Coherence</h3>
              <div className="metric-value-large">
                {Math.round(superintelligenceMetrics.systemCoherence)}/100
              </div>
              <p>System integration and coherence</p>
            </div>

            <div className="metric-card">
              <h3>🌟 Emergent Intelligence</h3>
              <div className="metric-value-large">
                {Math.round(superintelligenceMetrics.emergentIntelligence)}/100
              </div>
              <p>Emergent cognitive capabilities</p>
            </div>
          </div>
        </div>
      )}

      <div className="cognitive-capabilities">
        <h2>🧠 Cognitive Capabilities</h2>
        <div className="capabilities-grid">
          {Array.from(cognitiveCapabilities.values()).map((capability) => (
            <div key={capability.id} className="capability-card">
              <div className="capability-header">
                <h3>{capability.name}</h3>
                <div
                  className="capability-level"
                  style={{ color: getIntelligenceColor(capability.level) }}
                >
                  Level {capability.level.toFixed(1)}
                </div>
              </div>

              <p className="capability-description">{capability.description}</p>

              <div className="capability-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${capability.level * 10}%`,
                      backgroundColor: getIntelligenceColor(capability.level),
                    }}
                  ></div>
                </div>
                <div className="progress-label">
                  {capability.level >= capability.activationThreshold * 10
                    ? '✅ Active'
                    : '🔄 Evolving'}
                </div>
              </div>

              {capability.emergentProperties.length > 0 && (
                <div className="emergent-properties">
                  <h4>✨ Emergent Properties:</h4>
                  <ul>
                    {capability.emergentProperties.map((property, index) => (
                      <li key={index}>{property}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {collectiveIntelligence && (
        <div className="collective-intelligence">
          <h2>🌟 Collective Intelligence</h2>
          <div className="collective-metrics">
            <div className="collective-metric">
              <h3>🧠 Average Intelligence</h3>
              <div className="metric-value">
                {collectiveIntelligence.averageIntelligence.toFixed(2)}/10
              </div>
            </div>

            <div className="collective-metric">
              <h3>🔗 Cognitive Synergy</h3>
              <div className="metric-value">
                {Math.round(collectiveIntelligence.cognitiveSynergy * 100)}%
              </div>
            </div>

            <div className="collective-metric">
              <h3>🌿 Cultural Integration</h3>
              <div className="metric-value">
                {Math.round(collectiveIntelligence.culturalIntegration * 10)}/100
              </div>
            </div>

            <div className="collective-metric">
              <h3>✨ Total Emergent Capabilities</h3>
              <div className="metric-value">
                {collectiveIntelligence.emergentCapabilities.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="superintelligence-insights">
        <h2>💡 Superintelligence Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>🧠 Collective Intelligence</h3>
            <p>
              Multiple AI agents working together to achieve superintelligence through distributed
              cognition
            </p>
          </div>

          <div className="insight-card">
            <h3>🌟 Emergent Properties</h3>
            <p>
              New capabilities emerge from the interaction of coordinated AI agents beyond
              individual capabilities
            </p>
          </div>

          <div className="insight-card">
            <h3>🌿 Cultural Wisdom</h3>
            <p>
              Integration of Te Ao Māori principles and cultural knowledge into superintelligent
              systems
            </p>
          </div>

          <div className="insight-card">
            <h3>📚 Educational Excellence</h3>
            <p>Superintelligence optimized for educational outcomes serving 800,000 akonga</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperintelligenceDashboard;
