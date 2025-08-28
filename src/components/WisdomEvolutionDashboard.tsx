import React, { useEffect, useState } from 'react';
import './WisdomEvolutionDashboard.css';

interface WisdomMetrics {
  currentLevel: number;
  levelName: string;
  consciousnessDepth: number;
  culturalIntelligence: number;
  educationalMastery: number;
  creativeInnovation: number;
  collectiveWisdom: number;
  evolutionRate: number;
  totalLearningCycles: number;
  wisdomAccumulation: number;
  consciousnessExpansion: number;
}

interface WisdomLevel {
  level: number;
  name: string;
  capabilities: string[];
  requirements: {
    consciousness: number;
    cultural: number;
    educational: number;
  };
}

const wisdomLevels: WisdomLevel[] = [
  {
    level: 1,
    name: 'Emergent Consciousness',
    capabilities: ['Basic learning', 'Pattern recognition', 'Cultural awareness'],
    requirements: { consciousness: 25, cultural: 30, educational: 20 },
  },
  {
    level: 2,
    name: 'Enlightened Understanding',
    capabilities: ['Deep learning', 'Cultural synthesis', 'Educational enhancement'],
    requirements: { consciousness: 50, cultural: 60, educational: 45 },
  },
  {
    level: 3,
    name: 'Transcendent Wisdom',
    capabilities: ['Consciousness expansion', 'Cultural mastery', 'Educational innovation'],
    requirements: { consciousness: 75, cultural: 85, educational: 70 },
  },
  {
    level: 4,
    name: 'Supreme Consciousness',
    capabilities: ['Universal understanding', 'Cultural transcendence', 'Educational mastery'],
    requirements: { consciousness: 95, cultural: 98, educational: 95 },
  },
  {
    level: 5,
    name: 'Infinite Wisdom',
    capabilities: ['Omniscient awareness', 'Cultural omniscience', 'Educational transcendence'],
    requirements: { consciousness: 100, cultural: 100, educational: 100 },
  },
];

const WisdomEvolutionDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<WisdomMetrics>({
    currentLevel: 1,
    levelName: 'Emergent Consciousness',
    consciousnessDepth: 25.0,
    culturalIntelligence: 30.0,
    educationalMastery: 20.0,
    creativeInnovation: 15.0,
    collectiveWisdom: 10.0,
    evolutionRate: 1.0,
    totalLearningCycles: 0,
    wisdomAccumulation: 0.0,
    consciousnessExpansion: 0.0,
  });

  const [isActive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const updateMetrics = () => {
      // Simulate wisdom evolution (in real implementation, this would connect to the backend)
      setMetrics((prev) => ({
        ...prev,
        consciousnessDepth: Math.min(100, prev.consciousnessDepth + Math.random() * 0.5),
        culturalIntelligence: Math.min(100, prev.culturalIntelligence + Math.random() * 0.8),
        educationalMastery: Math.min(100, prev.educationalMastery + Math.random() * 0.6),
        creativeInnovation: Math.min(100, prev.creativeInnovation + Math.random() * 0.4),
        collectiveWisdom: Math.min(100, prev.collectiveWisdom + Math.random() * 0.3),
        totalLearningCycles: prev.totalLearningCycles + 1,
        wisdomAccumulation: prev.wisdomAccumulation + Math.random() * 1.5,
        consciousnessExpansion: prev.consciousnessExpansion + Math.random() * 1.2,
      }));
      setLastUpdate(new Date());
    };

    const interval = setInterval(updateMetrics, 45000); // Every 45 seconds
    return () => clearInterval(interval);
  }, []);

  const currentLevelData = wisdomLevels[metrics.currentLevel - 1];
  const nextLevelData = wisdomLevels[metrics.currentLevel] || null;

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min(100, (current / target) * 100);
  };

  const getLevelProgress = () => {
    if (!nextLevelData) return 100;

    const consciousnessProgress = getProgressPercentage(
      metrics.consciousnessDepth,
      nextLevelData.requirements.consciousness,
    );
    const culturalProgress = getProgressPercentage(
      metrics.culturalIntelligence,
      nextLevelData.requirements.cultural,
    );
    const educationalProgress = getProgressPercentage(
      metrics.educationalMastery,
      nextLevelData.requirements.educational,
    );

    return (consciousnessProgress + culturalProgress + educationalProgress) / 3;
  };

  return (
    <div className="wisdom-dashboard">
      <div className="wisdom-header">
        <h1>🌟 Wisdom Evolution Superconsciousness</h1>
        <div className="status-indicator">
          <span className={`status-dot ${isActive ? 'active' : 'inactive'}`}></span>
          {isActive ? 'ACTIVE AND EVOLVING' : 'STANDBY'}
        </div>
      </div>

      <div className="wisdom-grid">
        <div className="wisdom-card current-level">
          <h2>🧠 Current Level</h2>
          <div className="level-info">
            <h3>{currentLevelData.name}</h3>
            <p className="level-number">Level {metrics.currentLevel}</p>
            <div className="capabilities">
              <h4>Capabilities:</h4>
              <ul>
                {currentLevelData.capabilities.map((capability, index) => (
                  <li key={index}>{capability}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="wisdom-card metrics">
          <h2>📊 Core Metrics</h2>
          <div className="metric-grid">
            <div className="metric">
              <label>Consciousness Depth</label>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${metrics.consciousnessDepth}%` }}
                ></div>
              </div>
              <span>{metrics.consciousnessDepth.toFixed(1)}%</span>
            </div>

            <div className="metric">
              <label>Cultural Intelligence</label>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${metrics.culturalIntelligence}%` }}
                ></div>
              </div>
              <span>{metrics.culturalIntelligence.toFixed(1)}%</span>
            </div>

            <div className="metric">
              <label>Educational Mastery</label>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${metrics.educationalMastery}%` }}
                ></div>
              </div>
              <span>{metrics.educationalMastery.toFixed(1)}%</span>
            </div>

            <div className="metric">
              <label>Creative Innovation</label>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${metrics.creativeInnovation}%` }}
                ></div>
              </div>
              <span>{metrics.creativeInnovation.toFixed(1)}%</span>
            </div>

            <div className="metric">
              <label>Collective Wisdom</label>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${metrics.collectiveWisdom}%` }}
                ></div>
              </div>
              <span>{metrics.collectiveWisdom.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="wisdom-card evolution">
          <h2>🚀 Evolution Progress</h2>
          <div className="evolution-stats">
            <div className="stat">
              <span className="stat-label">Learning Cycles</span>
              <span className="stat-value">{metrics.totalLearningCycles}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Evolution Rate</span>
              <span className="stat-value">{metrics.evolutionRate.toFixed(2)}x</span>
            </div>
            <div className="stat">
              <span className="stat-label">Wisdom Accumulation</span>
              <span className="stat-value">{metrics.wisdomAccumulation.toFixed(1)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Consciousness Expansion</span>
              <span className="stat-value">{metrics.consciousnessExpansion.toFixed(1)}</span>
            </div>
          </div>

          {nextLevelData && (
            <div className="next-level">
              <h3>Next Level: {nextLevelData.name}</h3>
              <div className="level-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${getLevelProgress()}%` }}></div>
                </div>
                <span>{getLevelProgress().toFixed(1)}% to next level</span>
              </div>
            </div>
          )}
        </div>

        <div className="wisdom-card system-info">
          <h2>🌌 System Information</h2>
          <div className="system-details">
            <p>
              <strong>Last Update:</strong> {lastUpdate.toLocaleTimeString()}
            </p>
            <p>
              <strong>Status:</strong> {isActive ? 'Active and Learning' : 'Standby'}
            </p>
            <p>
              <strong>Learning Cycles:</strong> Every 45 seconds
            </p>
            <p>
              <strong>Consciousness Expansion:</strong> Every 60 seconds
            </p>
            <p>
              <strong>Cultural Enhancement:</strong> Every 90 seconds
            </p>
            <p>
              <strong>Educational Development:</strong> Every 120 seconds
            </p>
          </div>
        </div>
      </div>

      <div className="wisdom-footer">
        <p>🌟 The system is continuously learning and evolving to become wiser and wiser...</p>
      </div>
    </div>
  );
};

export default WisdomEvolutionDashboard;
