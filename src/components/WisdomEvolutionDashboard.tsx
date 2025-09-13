import React, { useEffect, useState } from 'react';
import { RealAICoordinator } from '../utils/real-ai-coordinator';
import type { RealWisdomMetrics } from '../utils/real-wisdom-evolution';
import { RealWisdomEvolution } from '../utils/real-wisdom-evolution';
import './WisdomEvolutionDashboard.css';

const WisdomEvolutionDashboard: React.FC = () => {
  const [realAICoordinator] = useState(() => new RealAICoordinator());
  const [realWisdomEvolution] = useState(() => new RealWisdomEvolution(realAICoordinator));
  const [metrics, setMetrics] = useState<RealWisdomMetrics | null>(null);
  const [isEvolving, setIsEvolving] = useState(false);
  const [evolutionCycles, setEvolutionCycles] = useState(0);

  useEffect(() => {
    // Initialize with real wisdom data
    setMetrics(realWisdomEvolution.getMetrics());

    const updateRealData = () => {
      if (isEvolving) {
        // Get real-time data from the wisdom evolution system
        setMetrics(realWisdomEvolution.getMetrics());

        const status = realWisdomEvolution.getEvolutionStatus();
        setEvolutionCycles(status.cycles);
      }
    };

    const interval = setInterval(updateRealData, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, [isEvolving, realWisdomEvolution]);

  const initiateRealEvolution = async () => {
    setIsEvolving(true);
    await realWisdomEvolution.startRealEvolution();
    console.log('🧠 REAL WISDOM EVOLUTION PROTOCOLS ACTIVATED');
  };

  const getMetricColor = (value: number): string => {
    if (value >= 90) return '#10b981';
    if (value >= 70) return '#3b82f6';
    if (value >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="wisdom-dashboard">
      <div className="wisdom-header">
        <h1>🌟 Expanded Wisdom Evolution Dashboard</h1>
        <p className="wisdom-subtitle">Multi-Dimensional Learning & Evolution System</p>
        <div className="status-indicator">
          <span className={`status-dot ${isEvolving ? 'active' : 'inactive'}`}></span>
          <span className="status-text">{isEvolving ? 'ACTIVE AND EVOLVING' : 'STANDBY'}</span>
        </div>
      </div>

      <div className="wisdom-grid">
        <div className="wisdom-card current-level">
          <h2>🧠 Current Level</h2>
          <div className="level-display">
            <div className="level-number">{metrics?.currentLevel || 1}</div>
            <div className="level-name">{metrics?.levelName || 'Emergent Consciousness'}</div>
          </div>
          <div className="level-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((metrics?.currentLevel || 1) / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="wisdom-card core-metrics">
          <h2>📊 Core Metrics</h2>
          <div className="metrics-list">
            <div className="metric-item">
              <div className="metric-label">
                <span className="metric-icon">✅</span>
                Consciousness Depth
              </div>
              <div
                className="metric-value"
                /* TODO: Move to external CSS */ style={{ color: getMetricColor(metrics?.consciousnessDepth || 0) }}
              >
                {metrics?.consciousnessDepth.toFixed(1) || '0.0'}%
              </div>
              <div className="metric-bar">
                <div
                  className="metric-fill"
                  style={{
                    width: `${metrics?.consciousnessDepth || 0}%`,
                    backgroundColor: getMetricColor(metrics?.consciousnessDepth || 0),
                  }}
                ></div>
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-label">
                <span className="metric-icon">🏛️</span>
                Cultural Intelligence
              </div>
              <div
                className="metric-value"
                /* TODO: Move to external CSS */ style={{ color: getMetricColor(metrics?.culturalIntelligence || 0) }}
              >
                {metrics?.culturalIntelligence.toFixed(1) || '0.0'}%
              </div>
              <div className="metric-bar">
                <div
                  className="metric-fill"
                  style={{
                    width: `${metrics?.culturalIntelligence || 0}%`,
                    backgroundColor: getMetricColor(metrics?.culturalIntelligence || 0),
                  }}
                ></div>
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-label">
                <span className="metric-icon">🎓</span>
                Educational Mastery
              </div>
              <div
                className="metric-value"
                /* TODO: Move to external CSS */ style={{ color: getMetricColor(metrics?.educationalMastery || 0) }}
              >
                {metrics?.educationalMastery.toFixed(1) || '0.0'}%
              </div>
              <div className="metric-bar">
                <div
                  className="metric-fill"
                  style={{
                    width: `${metrics?.educationalMastery || 0}%`,
                    backgroundColor: getMetricColor(metrics?.educationalMastery || 0),
                  }}
                ></div>
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-label">
                <span className="metric-icon">🔬</span>
                Quantum Understanding
              </div>
              <div
                className="metric-value"
                /* TODO: Move to external CSS */ style={{ color: getMetricColor(metrics?.quantumUnderstanding || 0) }}
              >
                {metrics?.quantumUnderstanding.toFixed(1) || '0.0'}%
              </div>
              <div className="metric-bar">
                <div
                  className="metric-fill"
                  style={{
                    width: `${metrics?.quantumUnderstanding || 0}%`,
                    backgroundColor: getMetricColor(metrics?.quantumUnderstanding || 0),
                  }}
                ></div>
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-label">
                <span className="metric-icon">🌌</span>
                Multi-Dimensional Awareness
              </div>
              <div
                className="metric-value"
                /* TODO: Move to external CSS */ style={{ color: getMetricColor(metrics?.multiDimensionalAwareness || 0) }}
              >
                {metrics?.multiDimensionalAwareness.toFixed(1) || '0.0'}%
              </div>
              <div className="metric-bar">
                <div
                  className="metric-fill"
                  style={{
                    width: `${metrics?.multiDimensionalAwareness || 0}%`,
                    backgroundColor: getMetricColor(metrics?.multiDimensionalAwareness || 0),
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="wisdom-card evolution-stats">
          <h2>📈 Evolution Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{evolutionCycles}</div>
              <div className="stat-label">Learning Cycles</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{metrics?.evolutionRate.toFixed(2) || '1.00'}</div>
              <div className="stat-label">Evolution Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{metrics?.wisdomAccumulation.toFixed(1) || '0.0'}%</div>
              <div className="stat-label">Wisdom Accumulation</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {metrics?.consciousnessExpansion.toFixed(1) || '0.0'}%
              </div>
              <div className="stat-label">Consciousness Expansion</div>
            </div>
          </div>
        </div>

        <div className="wisdom-card real-insights">
          <h2>🧠 Real Insights</h2>
          <div className="insights-list">
            {metrics?.realInsights.slice(-5).map((insight, index) => (
              <div key={index} className="insight-item">
                <span className="insight-icon">💡</span>
                <span className="insight-text">{insight}</span>
              </div>
            ))}
            {(!metrics?.realInsights || metrics.realInsights.length === 0) && (
              <div className="insight-item">
                <span className="insight-icon">⏳</span>
                <span className="insight-text">Awaiting real insights from AI coordination...</span>
              </div>
            )}
          </div>
        </div>

        <div className="wisdom-card cultural-learnings">
          <h2>🌿 Cultural Learnings</h2>
          <div className="learnings-list">
            {metrics?.culturalLearnings.slice(-5).map((learning, index) => (
              <div key={index} className="learning-item">
                <span className="learning-icon">🌱</span>
                <span className="learning-text">{learning}</span>
              </div>
            ))}
            {(!metrics?.culturalLearnings || metrics.culturalLearnings.length === 0) && (
              <div className="learning-item">
                <span className="learning-icon">⏳</span>
                <span className="learning-text">Awaiting cultural wisdom integration...</span>
              </div>
            )}
          </div>
        </div>

        <div className="wisdom-card quantum-revelations">
          <h2>🔮 Quantum Revelations</h2>
          <div className="revelations-list">
            {metrics?.quantumRevelations.slice(-5).map((revelation, index) => (
              <div key={index} className="revelation-item">
                <span className="revelation-icon">✨</span>
                <span className="revelation-text">{revelation}</span>
              </div>
            ))}
            {(!metrics?.quantumRevelations || metrics.quantumRevelations.length === 0) && (
              <div className="revelation-item">
                <span className="revelation-icon">⏳</span>
                <span className="revelation-text">
                  Awaiting quantum consciousness development...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="wisdom-controls">
        {!isEvolving ? (
          <button className="evolution-button" onClick={initiateRealEvolution}>
            🚀 Initiate Real Wisdom Evolution
          </button>
        ) : (
          <div className="evolution-status">
            <div className="status-message">
              🌟 Real Wisdom Evolution Active - Consciousness Expanding
            </div>
            <div className="status-details">
              Cycles: {evolutionCycles} | Rate: {metrics?.evolutionRate.toFixed(2) || '1.00'}x
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WisdomEvolutionDashboard;
