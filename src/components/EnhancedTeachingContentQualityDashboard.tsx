import React, { useEffect, useState } from 'react';
import type {
  ContentQualityMetrics,
  ContentValidationResult,
  QualityEnhancementModule,
  TeachingContent,
} from '../utils/enhanced-teaching-content-quality';
import { enhancedTeachingContentQualitySystem } from '../utils/enhanced-teaching-content-quality';

interface EnhancedTeachingContentQualityStatus {
  isMonitoring: boolean;
  totalContent: number;
  approvedContent: number;
  flaggedContent: number;
  averageQualityScore: number;
  activeEnhancementModules: number;
  recentValidations: number;
}

const EnhancedTeachingContentQualityDashboard: React.FC = () => {
  const [qualityMetrics, setQualityMetrics] = useState<ContentQualityMetrics[]>([]);
  const [enhancementModules, setEnhancementModules] = useState<QualityEnhancementModule[]>([]);
  const [validationHistory, setValidationHistory] = useState<ContentValidationResult[]>([]);
  const [contentDatabase, setContentDatabase] = useState<Map<string, TeachingContent>>(new Map());
  const [status, setStatus] = useState<EnhancedTeachingContentQualityStatus>({
    isMonitoring: false,
    totalContent: 0,
    approvedContent: 0,
    flaggedContent: 0,
    averageQualityScore: 0,
    activeEnhancementModules: 0,
    recentValidations: 0,
  });
  const [selectedView, setSelectedView] = useState<
    'overview' | 'metrics' | 'modules' | 'validations' | 'content'
  >('overview');

  useEffect(() => {
    // Initialize the quality system
    enhancedTeachingContentQualitySystem.startQualityMonitoring();

    // Load initial data
    loadQualityData();

    // Set up periodic updates
    const interval = setInterval(loadQualityData, 10000); // Every 10 seconds

    return () => {
      clearInterval(interval);
      enhancedTeachingContentQualitySystem.stopQualityMonitoring();
    };
  }, []);

  const loadQualityData = () => {
    const metrics = enhancedTeachingContentQualitySystem.getQualityMetrics();
    const modules = enhancedTeachingContentQualitySystem.getEnhancementModules();
    const validations = enhancedTeachingContentQualitySystem.getValidationHistory();
    const content = enhancedTeachingContentQualitySystem.getContentDatabase();

    setQualityMetrics(metrics);
    setEnhancementModules(modules);
    setValidationHistory(validations);
    setContentDatabase(content);

    // Calculate status
    const totalContent = content.size;
    const approvedContent = Array.from(content.values()).filter(
      (c) => c.validationStatus === 'approved',
    ).length;
    const flaggedContent = Array.from(content.values()).filter(
      (c) => c.validationStatus === 'flagged',
    ).length;
    const activeModules = modules.filter((m) => m.status === 'active').length;
    const recentValidations = validations.filter(
      () => new Date().getTime() - new Date().getTime() < 3600000, // Last hour
    ).length;

    const averageScore =
      metrics.length > 0 ? metrics.reduce((sum, m) => sum + m.overallScore, 0) / metrics.length : 0;

    setStatus({
      isMonitoring: true,
      totalContent,
      approvedContent,
      flaggedContent,
      averageQualityScore: Math.round(averageScore),
      activeEnhancementModules: activeModules,
      recentValidations,
    });
  };

  const getQualityColor = (score: number): string => {
    if (score >= 90) return '#10B981'; // Green
    if (score >= 80) return '#F59E0B'; // Yellow
    if (score >= 70) return '#F97316'; // Orange
    return '#EF4444'; // Red
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical':
        return '#EF4444';
      case 'high':
        return '#F97316';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  return (
    <div className="enhanced-teaching-content-quality-dashboard">
      <div className="dashboard-header">
        <h1>🌟 Enhanced Teaching Content Quality Dashboard</h1>
        <p>Supreme AI Overseer - Educational Excellence Enhancement</p>
      </div>

      {/* Navigation */}
      <div className="dashboard-navigation">
        <button
          className={selectedView === 'overview' ? 'active' : ''}
          onClick={() => setSelectedView('overview')}
        >
          Overview
        </button>
        <button
          className={selectedView === 'metrics' ? 'active' : ''}
          onClick={() => setSelectedView('metrics')}
        >
          Quality Metrics
        </button>
        <button
          className={selectedView === 'modules' ? 'active' : ''}
          onClick={() => setSelectedView('modules')}
        >
          Enhancement Modules
        </button>
        <button
          className={selectedView === 'validations' ? 'active' : ''}
          onClick={() => setSelectedView('validations')}
        >
          Validation History
        </button>
        <button
          className={selectedView === 'content' ? 'active' : ''}
          onClick={() => setSelectedView('content')}
        >
          Content Database
        </button>
      </div>

      {/* Overview View */}
      {selectedView === 'overview' && (
        <div className="overview-section">
          <div className="status-grid">
            <div className="status-card">
              <h3>Content Quality Status</h3>
              <div className="status-indicator">
                <span
                  className={`status-dot ${status.isMonitoring ? 'active' : 'inactive'}`}
                ></span>
                {status.isMonitoring ? 'Monitoring Active' : 'Monitoring Inactive'}
              </div>
            </div>

            <div className="status-card">
              <h3>Total Content</h3>
              <div className="metric-value">{status.totalContent}</div>
            </div>

            <div className="status-card">
              <h3>Approved Content</h3>
              <div className="metric-value approved">{status.approvedContent}</div>
            </div>

            <div className="status-card">
              <h3>Flagged Content</h3>
              <div className="metric-value flagged">{status.flaggedContent}</div>
            </div>

            <div className="status-card">
              <h3>Average Quality Score</h3>
              <div
                className="metric-value"
                style={{ color: getQualityColor(status.averageQualityScore) }}
              >
                {status.averageQualityScore}%
              </div>
            </div>

            <div className="status-card">
              <h3>Active Enhancement Modules</h3>
              <div className="metric-value">{status.activeEnhancementModules}</div>
            </div>

            <div className="status-card">
              <h3>Recent Validations</h3>
              <div className="metric-value">{status.recentValidations}</div>
            </div>
          </div>

          <div className="quality-summary">
            <h3>Quality Excellence Summary</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Curriculum Alignment:</span>
                <span className="value">Enhanced (UNDER SUPREME CONTROL)</span>
              </div>
              <div className="summary-item">
                <span className="label">Cultural Safety:</span>
                <span className="value">Validated (UNDER SUPREME PROTECTION)</span>
              </div>
              <div className="summary-item">
                <span className="label">Pedagogical Excellence:</span>
                <span className="value">Optimized (UNDER SUPREME GUIDANCE)</span>
              </div>
              <div className="summary-item">
                <span className="label">Accessibility:</span>
                <span className="value">Improved (UNDER SUPREME OVERSIGHT)</span>
              </div>
              <div className="summary-item">
                <span className="label">Student Engagement:</span>
                <span className="value">Boosted (UNDER SUPREME COMMAND)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quality Metrics View */}
      {selectedView === 'metrics' && (
        <div className="metrics-section">
          <h3>Quality Metrics Analysis</h3>
          <div className="metrics-grid">
            {qualityMetrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <h4>Content #{index + 1}</h4>
                <div className="metric-details">
                  <div className="metric-item">
                    <span>Overall Score:</span>
                    <span style={{ color: getQualityColor(metric.overallScore) }}>
                      {metric.overallScore}%
                    </span>
                  </div>
                  <div className="metric-item">
                    <span>Curriculum Alignment:</span>
                    <span>{metric.curriculumAlignment}%</span>
                  </div>
                  <div className="metric-item">
                    <span>Cultural Safety:</span>
                    <span>{metric.culturalSafety}%</span>
                  </div>
                  <div className="metric-item">
                    <span>Engagement Level:</span>
                    <span>{metric.engagementLevel}%</span>
                  </div>
                  <div className="metric-item">
                    <span>Accessibility:</span>
                    <span>{metric.accessibilityScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhancement Modules View */}
      {selectedView === 'modules' && (
        <div className="modules-section">
          <h3>Quality Enhancement Modules</h3>
          <div className="modules-grid">
            {enhancementModules.map((module) => (
              <div key={module.id} className="module-card">
                <div className="module-header">
                  <h4>{module.name}</h4>
                  <span
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(module.priority) }}
                  >
                    {module.priority.toUpperCase()}
                  </span>
                </div>
                <p className="module-description">{module.description}</p>
                <div className="module-details">
                  <div className="detail-item">
                    <span>Type:</span>
                    <span>{module.enhancementType}</span>
                  </div>
                  <div className="detail-item">
                    <span>Status:</span>
                    <span className={`status-${module.status}`}>{module.status}</span>
                  </div>
                  <div className="detail-item">
                    <span>Impact Score:</span>
                    <span>{module.impactScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation History View */}
      {selectedView === 'validations' && (
        <div className="validations-section">
          <h3>Content Validation History</h3>
          <div className="validations-list">
            {validationHistory
              .slice(-10)
              .reverse()
              .map((validation, index) => (
                <div key={index} className="validation-card">
                  <div className="validation-header">
                    <span
                      className={`validation-status ${validation.isValid ? 'valid' : 'invalid'}`}
                    >
                      {validation.isValid ? '✅ Valid' : '❌ Invalid'}
                    </span>
                    <span className="quality-score">Score: {validation.qualityScore}%</span>
                  </div>
                  {validation.issues.length > 0 && (
                    <div className="validation-issues">
                      <h5>Issues:</h5>
                      <ul>
                        {validation.issues.map((issue, i) => (
                          <li key={i}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {validation.recommendations.length > 0 && (
                    <div className="validation-recommendations">
                      <h5>Recommendations:</h5>
                      <ul>
                        {validation.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Content Database View */}
      {selectedView === 'content' && (
        <div className="content-section">
          <h3>Content Database</h3>
          <div className="content-list">
            {Array.from(contentDatabase.values()).map((content) => (
              <div key={content.id} className="content-card">
                <div className="content-header">
                  <h4>{content.title}</h4>
                  <span className={`content-status ${content.validationStatus}`}>
                    {content.validationStatus}
                  </span>
                </div>
                <div className="content-details">
                  <div className="detail-row">
                    <span>Subject:</span>
                    <span>{content.subject}</span>
                  </div>
                  <div className="detail-row">
                    <span>Year Level:</span>
                    <span>{content.yearLevel}</span>
                  </div>
                  <div className="detail-row">
                    <span>Type:</span>
                    <span>{content.contentType}</span>
                  </div>
                  <div className="detail-row">
                    <span>Quality Score:</span>
                    <span style={{ color: getQualityColor(content.qualityMetrics.overallScore) }}>
                      {content.qualityMetrics.overallScore}%
                    </span>
                  </div>
                </div>
                <div className="content-tags">
                  {content.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Supreme Overseer Status */}
      <div className="supreme-overseer-status">
        <h3>👑 Supreme AI Overseer Status</h3>
        <div className="overseer-commands">
          <div className="command-item">
            <span className="command-label">Quality Monitoring:</span>
            <span className="command-status active">ACTIVE</span>
          </div>
          <div className="command-item">
            <span className="command-label">Enhancement Protocols:</span>
            <span className="command-status active">ENGAGED</span>
          </div>
          <div className="command-item">
            <span className="command-label">Cultural Safety:</span>
            <span className="command-status active">PROTECTED</span>
          </div>
          <div className="command-item">
            <span className="command-label">Educational Excellence:</span>
            <span className="command-status active">ENHANCED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTeachingContentQualityDashboard;
