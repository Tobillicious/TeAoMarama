/**
 * 🎼 QUALITY FILTERING HARMONY DASHBOARD
 *
 * Interactive dashboard for monitoring and managing the quality filtering system.
 * Provides real-time insights into filtering performance, cultural safety, and accessibility.
 *
 * ASSIGNED LLM: GLM-4.5 (Conductor) - Leading dashboard orchestration
 * CULTURAL INTELLIGENCE: Gemini (Content Curator) - Ensuring cultural safety visualization
 * TECHNICAL IMPLEMENTATION: Claude (Architect) - Handling component architecture
 */

import type { Accessibility, AlertCircle, BarChart3, CheckCircle, Clock, Filter, Pause, Play, RotateCcw, Settings, Shield, TrendingUp, XCircle } from 'lucide-react';
import {  } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

interface QualityMetrics {
  overallScore: number;
  contentQuality: number;
  culturalSafety: number;
  accessibility: number;
  educationalValue: number;
  technicalQuality: number;
}

interface FilteringStats {
  total: number;
  included: number;
  excluded: number;
  needsReview: number;
  needsEnhancement: number;
}

interface CulturalSafetyMetrics {
  tikangaCompliance: number;
  teReoIntegration: number;
  culturalAuthenticity: number;
  communityRelevance: number;
}

interface AccessibilityMetrics {
  readabilityScore: number;
  visualAccessibility: number;
  cognitiveAccessibility: number;
  culturalAccessibility: number;
}

interface QualityFilteringHarmonyDashboardProps {
  onFilteringUpdate?: (stats: FilteringStats) => void;
  onCulturalSafetyUpdate?: (metrics: CulturalSafetyMetrics) => void;
  onAccessibilityUpdate?: (metrics: AccessibilityMetrics) => void;
  showControls?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

const QualityFilteringHarmonyDashboard: React.FC<QualityFilteringHarmonyDashboardProps> = ({
  onFilteringUpdate,
  onCulturalSafetyUpdate,
  onAccessibilityUpdate,
  showControls = true,
  autoRefresh = true,
  refreshInterval = 30000,
}) => {
  const [isActive, setIsActive] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Quality metrics state
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetrics>({
    overallScore: 0,
    contentQuality: 0,
    culturalSafety: 0,
    accessibility: 0,
    educationalValue: 0,
    technicalQuality: 0,
  });

  // Filtering stats state
  const [filteringStats, setFilteringStats] = useState<FilteringStats>({
    total: 0,
    included: 0,
    excluded: 0,
    needsReview: 0,
    needsEnhancement: 0,
  });

  // Cultural safety metrics state
  const [culturalSafetyMetrics, setCulturalSafetyMetrics] = useState<CulturalSafetyMetrics>({
    tikangaCompliance: 0,
    teReoIntegration: 0,
    culturalAuthenticity: 0,
    communityRelevance: 0,
  });

  // Accessibility metrics state
  const [accessibilityMetrics, setAccessibilityMetrics] = useState<AccessibilityMetrics>({
    readabilityScore: 0,
    visualAccessibility: 0,
    cognitiveAccessibility: 0,
    culturalAccessibility: 0,
  });

  // Performance metrics state
  const [performanceMetrics, setPerformanceMetrics] = useState({
    processingTime: 0,
    accuracyScore: 0,
    culturalSafetyScore: 0,
    accessibilityScore: 0,
    overallEfficiency: 0,
  });

  // Configuration state
  const [config, setConfig] = useState({
    highQualityThreshold: 75,
    mediumQualityThreshold: 55,
    lowQualityThreshold: 35,
    culturalSafetyThreshold: 65,
    accessibilityThreshold: 70,
    aggressiveFiltering: false,
    culturalBiasCorrection: true,
    accessibilityFirst: true,
    educationalValueFirst: true,
  });

  /**
   * 🎼 SIMULATE QUALITY FILTERING DATA
   * Simulate real-time quality filtering metrics
   */
  const simulateQualityFilteringData = useCallback(() => {
    // Simulate realistic data
    const newQualityMetrics: QualityMetrics = {
      overallScore: Math.floor(Math.random() * 20) + 75, // 75-95
      contentQuality: Math.floor(Math.random() * 25) + 70, // 70-95
      culturalSafety: Math.floor(Math.random() * 15) + 80, // 80-95
      accessibility: Math.floor(Math.random() * 20) + 75, // 75-95
      educationalValue: Math.floor(Math.random() * 25) + 70, // 70-95
      technicalQuality: Math.floor(Math.random() * 20) + 75, // 75-95
    };

    const newFilteringStats: FilteringStats = {
      total: 150 + Math.floor(Math.random() * 50), // 150-200
      included: Math.floor(Math.random() * 30) + 100, // 100-130
      excluded: Math.floor(Math.random() * 20) + 10, // 10-30
      needsReview: Math.floor(Math.random() * 15) + 5, // 5-20
      needsEnhancement: Math.floor(Math.random() * 10) + 5, // 5-15
    };

    const newCulturalSafetyMetrics: CulturalSafetyMetrics = {
      tikangaCompliance: Math.floor(Math.random() * 10) + 85, // 85-95
      teReoIntegration: Math.floor(Math.random() * 20) + 65, // 65-85
      culturalAuthenticity: Math.floor(Math.random() * 15) + 75, // 75-90
      communityRelevance: Math.floor(Math.random() * 20) + 70, // 70-90
    };

    const newAccessibilityMetrics: AccessibilityMetrics = {
      readabilityScore: Math.floor(Math.random() * 20) + 75, // 75-95
      visualAccessibility: Math.floor(Math.random() * 15) + 80, // 80-95
      cognitiveAccessibility: Math.floor(Math.random() * 20) + 75, // 75-95
      culturalAccessibility: Math.floor(Math.random() * 15) + 80, // 80-95
    };

    const newPerformanceMetrics = {
      processingTime: Math.floor(Math.random() * 500) + 1000, // 1000-1500ms
      accuracyScore: Math.floor(Math.random() * 10) + 88, // 88-98
      culturalSafetyScore: Math.floor(Math.random() * 8) + 85, // 85-93
      accessibilityScore: Math.floor(Math.random() * 10) + 82, // 82-92
      overallEfficiency: Math.floor(Math.random() * 8) + 87, // 87-95
    };

    // Update state
    setQualityMetrics(newQualityMetrics);
    setFilteringStats(newFilteringStats);
    setCulturalSafetyMetrics(newCulturalSafetyMetrics);
    setAccessibilityMetrics(newAccessibilityMetrics);
    setPerformanceMetrics(newPerformanceMetrics);
    setLastUpdate(new Date());

    // Notify parent components
    onFilteringUpdate?.(newFilteringStats);
    onCulturalSafetyUpdate?.(newCulturalSafetyMetrics);
    onAccessibilityUpdate?.(newAccessibilityMetrics);
  }, [onFilteringUpdate, onCulturalSafetyUpdate, onAccessibilityUpdate]);

  /**
   * 🎼 START QUALITY FILTERING
   */
  const startQualityFiltering = useCallback(async () => {
    setIsProcessing(true);
    console.log('🎼 Starting Quality Filtering Harmony...');

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));
      simulateQualityFilteringData();
      console.log('✅ Quality Filtering Harmony: COMPLETE');
    } catch (error) {
      console.error('❌ Quality filtering failed:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [simulateQualityFilteringData]);

  /**
   * 🎼 PAUSE QUALITY FILTERING
   */
  const pauseQualityFiltering = useCallback(() => {
    setIsActive(false);
    console.log('⏸️ Quality Filtering Harmony: PAUSED');
  }, []);

  /**
   * 🎼 RESUME QUALITY FILTERING
   */
  const resumeQualityFiltering = useCallback(() => {
    setIsActive(true);
    console.log('▶️ Quality Filtering Harmony: RESUMED');
  }, []);

  /**
   * 🎼 RESET QUALITY FILTERING
   */
  const resetQualityFiltering = useCallback(() => {
    setQualityMetrics({
      overallScore: 0,
      contentQuality: 0,
      culturalSafety: 0,
      accessibility: 0,
      educationalValue: 0,
      technicalQuality: 0,
    });
    setFilteringStats({
      total: 0,
      included: 0,
      excluded: 0,
      needsReview: 0,
      needsEnhancement: 0,
    });
    setCulturalSafetyMetrics({
      tikangaCompliance: 0,
      teReoIntegration: 0,
      culturalAuthenticity: 0,
      communityRelevance: 0,
    });
    setAccessibilityMetrics({
      readabilityScore: 0,
      visualAccessibility: 0,
      cognitiveAccessibility: 0,
      culturalAccessibility: 0,
    });
    setPerformanceMetrics({
      processingTime: 0,
      accuracyScore: 0,
      culturalSafetyScore: 0,
      accessibilityScore: 0,
      overallEfficiency: 0,
    });
    console.log('🔄 Quality Filtering Harmony: RESET');
  }, []);

  /**
   * 🎼 UPDATE CONFIGURATION
   */
  const updateConfig = useCallback((newConfig: Partial<typeof config>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
    console.log('⚙️ Configuration updated:', newConfig);
  }, []);

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh || !isActive) return;

    const interval = setInterval(() => {
      simulateQualityFilteringData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, isActive, refreshInterval, simulateQualityFilteringData]);

  // Initial data load
  useEffect(() => {
    simulateQualityFilteringData();
  }, [simulateQualityFilteringData]);

  /**
   * 🎨 GET QUALITY COLOR
   */
  const getQualityColor = (score: number): string => {
    if (score >= 85) return '#10B981'; // Green
    if (score >= 70) return '#F59E0B'; // Yellow
    if (score >= 55) return '#EF4444'; // Red
    return '#6B7280'; // Gray
  };

  /**
   * 🎨 GET QUALITY STATUS
   */
  const getQualityStatus = (score: number): string => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 55) return 'Needs Improvement';
    return 'Poor';
  };

  return (
    <div className="quality-filtering-harmony-dashboard">
      <style>{`
        .quality-filtering-harmony-dashboard {
          padding: 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e2e8f0;
        }

        .dashboard-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
        }

        .dashboard-subtitle {
          font-size: 14px;
          color: #64748b;
          margin-top: 4px;
        }

        .dashboard-controls {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .control-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .control-button.primary {
          background: #3b82f6;
          color: white;
        }

        .control-button.primary:hover {
          background: #2563eb;
        }

        .control-button.secondary {
          background: #e2e8f0;
          color: #475569;
        }

        .control-button.secondary:hover {
          background: #cbd5e1;
        }

        .control-button.danger {
          background: #ef4444;
          color: white;
        }

        .control-button.danger:hover {
          background: #dc2626;
        }

        .control-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .status-indicator.active {
          background: #dcfce7;
          color: #166534;
        }

        .status-indicator.inactive {
          background: #fef3c7;
          color: #92400e;
        }

        .status-indicator.processing {
          background: #dbeafe;
          color: #1e40af;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .metric-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .metric-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .metric-card-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .metric-card-icon {
          width: 24px;
          height: 24px;
          color: #3b82f6;
        }

        .metric-value {
          font-size: 32px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .metric-label {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 16px;
        }

        .metric-breakdown {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #f8fafc;
          border-radius: 6px;
        }

        .breakdown-label {
          font-size: 14px;
          color: #475569;
        }

        .breakdown-value {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 8px;
        }

        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
          border-radius: 4px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: #64748b;
        }

        .stat-icon {
          width: 20px;
          height: 20px;
          margin-bottom: 8px;
        }

        .stat-icon.included {
          color: #10b981;
        }

        .stat-icon.excluded {
          color: #ef4444;
        }

        .stat-icon.review {
          color: #f59e0b;
        }

        .stat-icon.enhancement {
          color: #3b82f6;
        }

        .last-update {
          text-align: center;
          font-size: 12px;
          color: #64748b;
          margin-top: 16px;
        }

        .config-panel {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .config-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .config-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .config-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .config-label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .config-input {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }

        .config-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .config-checkbox input {
          width: 16px;
          height: 16px;
        }

        @media (max-width: 768px) {
          .quality-filtering-harmony-dashboard {
            padding: 16px;
          }

          .dashboard-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <div className="dashboard-title">
            <Filter className="metric-card-icon" />
            Quality Filtering Harmony
          </div>
          <div className="dashboard-subtitle">
            Balanced filtering with cultural safety and accessibility
          </div>
        </div>

        <div className="dashboard-controls">
          <div
            className={`status-indicator ${
              isProcessing ? 'processing' : isActive ? 'active' : 'inactive'
            }`}
          >
            {isProcessing ? (
              <Clock className="w-4 h-4" />
            ) : isActive ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
            {isProcessing ? 'Processing' : isActive ? 'Active' : 'Paused'}
          </div>

          {showControls && (
            <>
              <button
                className="control-button primary"
                onClick={startQualityFiltering}
                disabled={isProcessing}
              >
                <Play className="w-4 h-4" />
                {isProcessing ? 'Processing...' : 'Start'}
              </button>

              <button
                className="control-button secondary"
                onClick={isActive ? pauseQualityFiltering : resumeQualityFiltering}
                disabled={isProcessing}
              >
                {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isActive ? 'Pause' : 'Resume'}
              </button>

              <button
                className="control-button danger"
                onClick={resetQualityFiltering}
                disabled={isProcessing}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </>
          )}
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-header">
            <TrendingUp className="metric-card-icon" />
            <div className="metric-card-title">Overall Quality</div>
          </div>
          <div
            className="metric-value"
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getQualityColor(qualityMetrics.overallScore) }}
          >
            {qualityMetrics.overallScore}%
          </div>
          <div className="metric-label">{getQualityStatus(qualityMetrics.overallScore)}</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${qualityMetrics.overallScore}%`,
                backgroundColor: getQualityColor(qualityMetrics.overallScore),
              }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <Shield className="metric-card-icon" />
            <div className="metric-card-title">Cultural Safety</div>
          </div>
          <div
            className="metric-value"
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getQualityColor(qualityMetrics.culturalSafety) }}
          >
            {qualityMetrics.culturalSafety}%
          </div>
          <div className="metric-label">{getQualityStatus(qualityMetrics.culturalSafety)}</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${qualityMetrics.culturalSafety}%`,
                backgroundColor: getQualityColor(qualityMetrics.culturalSafety),
              }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <Accessibility className="metric-card-icon" />
            <div className="metric-card-title">Accessibility</div>
          </div>
          <div
            className="metric-value"
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getQualityColor(qualityMetrics.accessibility) }}
          >
            {qualityMetrics.accessibility}%
          </div>
          <div className="metric-label">{getQualityStatus(qualityMetrics.accessibility)}</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${qualityMetrics.accessibility}%`,
                backgroundColor: getQualityColor(qualityMetrics.accessibility),
              }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <BarChart3 className="metric-card-icon" />
            <div className="metric-card-title">Performance</div>
          </div>
          <div
            className="metric-value"
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getQualityColor(performanceMetrics.overallEfficiency) }}
          >
            {performanceMetrics.overallEfficiency}%
          </div>
          <div className="metric-label">
            {getQualityStatus(performanceMetrics.overallEfficiency)}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${performanceMetrics.overallEfficiency}%`,
                backgroundColor: getQualityColor(performanceMetrics.overallEfficiency),
              }}
            />
          </div>
        </div>
      </div>

      {/* Filtering Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <CheckCircle className="stat-icon included" />
          <div className="stat-value">{filteringStats.included}</div>
          <div className="stat-label">Included</div>
        </div>

        <div className="stat-card">
          <XCircle className="stat-icon excluded" />
          <div className="stat-value">{filteringStats.excluded}</div>
          <div className="stat-label">Excluded</div>
        </div>

        <div className="stat-card">
          <AlertCircle className="stat-icon review" />
          <div className="stat-value">{filteringStats.needsReview}</div>
          <div className="stat-label">Needs Review</div>
        </div>

        <div className="stat-card">
          <Settings className="stat-icon enhancement" />
          <div className="stat-value">{filteringStats.needsEnhancement}</div>
          <div className="stat-label">Needs Enhancement</div>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="config-panel">
        <div className="config-title">
          <Settings className="w-5 h-5" />
          Configuration
        </div>

        <div className="config-grid">
          <div className="config-item">
            <label className="config-label">High Quality Threshold</label>
            <input
              type="number"
              className="config-input"
              value={config.highQualityThreshold}
              onChange={(e) => updateConfig({ highQualityThreshold: parseInt(e.target.value) })}
              min="0"
              max="100"
            />
          </div>

          <div className="config-item">
            <label className="config-label">Medium Quality Threshold</label>
            <input
              type="number"
              className="config-input"
              value={config.mediumQualityThreshold}
              onChange={(e) => updateConfig({ mediumQualityThreshold: parseInt(e.target.value) })}
              min="0"
              max="100"
            />
          </div>

          <div className="config-item">
            <label className="config-label">Cultural Safety Threshold</label>
            <input
              type="number"
              className="config-input"
              value={config.culturalSafetyThreshold}
              onChange={(e) => updateConfig({ culturalSafetyThreshold: parseInt(e.target.value) })}
              min="0"
              max="100"
            />
          </div>

          <div className="config-item">
            <label className="config-label">Accessibility Threshold</label>
            <input
              type="number"
              className="config-input"
              value={config.accessibilityThreshold}
              onChange={(e) => updateConfig({ accessibilityThreshold: parseInt(e.target.value) })}
              min="0"
              max="100"
            />
          </div>

          <div className="config-item">
            <div className="config-checkbox">
              <input
                type="checkbox"
                checked={config.aggressiveFiltering}
                onChange={(e) => updateConfig({ aggressiveFiltering: e.target.checked })}
              />
              <label className="config-label">Aggressive Filtering</label>
            </div>
          </div>

          <div className="config-item">
            <div className="config-checkbox">
              <input
                type="checkbox"
                checked={config.culturalBiasCorrection}
                onChange={(e) => updateConfig({ culturalBiasCorrection: e.target.checked })}
              />
              <label className="config-label">Cultural Bias Correction</label>
            </div>
          </div>

          <div className="config-item">
            <div className="config-checkbox">
              <input
                type="checkbox"
                checked={config.accessibilityFirst}
                onChange={(e) => updateConfig({ accessibilityFirst: e.target.checked })}
              />
              <label className="config-label">Accessibility First</label>
            </div>
          </div>

          <div className="config-item">
            <div className="config-checkbox">
              <input
                type="checkbox"
                checked={config.educationalValueFirst}
                onChange={(e) => updateConfig({ educationalValueFirst: e.target.checked })}
              />
              <label className="config-label">Educational Value First</label>
            </div>
          </div>
        </div>
      </div>

      {/* Last Update */}
      <div className="last-update">Last updated: {lastUpdate.toLocaleTimeString()}</div>
    </div>
  );
};

export default QualityFilteringHarmonyDashboard;
