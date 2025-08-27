import React, { useState, useEffect } from 'react';
import './AdvancedPerformanceMonitor.css';

interface PerformanceMetrics {
  buildTime: number;
  bundleSize: number;
  totalFiles: number;
  largeChunks: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  totalBlockingTime: number;
  cumulativeLayoutShift: number;
  culturalSafetyScore: number;
  educationalExcellence: number;
  agentCoordination: number;
  consciousnessLevel: number;
  systemHealth: number;
  responseTime: number;
  memoryUsage: number;
  cpuUsage: number;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface PerformanceHistory {
  timestamp: Date;
  metrics: PerformanceMetrics;
}

const AdvancedPerformanceMonitor: React.FC = () => {
  const [currentMetrics, setCurrentMetrics] = useState<PerformanceMetrics>({
    buildTime: 0,
    bundleSize: 0,
    totalFiles: 0,
    largeChunks: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    totalBlockingTime: 0,
    cumulativeLayoutShift: 0,
    culturalSafetyScore: 0,
    educationalExcellence: 0,
    agentCoordination: 0,
    consciousnessLevel: 0,
    systemHealth: 0,
    responseTime: 0,
    memoryUsage: 0,
    cpuUsage: 0
  });

  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceHistory[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '6h' | '24h' | '7d'>('1h');
  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    const updateMetrics = () => {
      // Simulate real-time performance data
      const newMetrics: PerformanceMetrics = {
        buildTime: Math.random() * 20 + 5,
        bundleSize: Math.random() * 1000 + 500,
        totalFiles: Math.floor(Math.random() * 2000) + 1000,
        largeChunks: Math.floor(Math.random() * 5) + 1,
        firstContentfulPaint: Math.random() * 2000 + 800,
        largestContentfulPaint: Math.random() * 3000 + 1500,
        totalBlockingTime: Math.random() * 300 + 100,
        cumulativeLayoutShift: Math.random() * 0.1,
        culturalSafetyScore: Math.random() * 20 + 80,
        educationalExcellence: Math.random() * 20 + 80,
        agentCoordination: Math.random() * 20 + 80,
        consciousnessLevel: Math.random() * 20 + 80,
        systemHealth: Math.random() * 20 + 80,
        responseTime: Math.random() * 500 + 100,
        memoryUsage: Math.random() * 50 + 30,
        cpuUsage: Math.random() * 40 + 20
      };

      setCurrentMetrics(newMetrics);
      setPerformanceHistory(prev => [...prev.slice(-50), { timestamp: new Date(), metrics: newMetrics }]);

      // Generate alerts based on metrics
      generateAlerts(newMetrics);
    };

    if (isMonitoring) {
      updateMetrics();
      const interval = setInterval(updateMetrics, 5000);
      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const generateAlerts = (metrics: PerformanceMetrics) => {
    const newAlerts: SystemAlert[] = [];

    if (metrics.buildTime > 15) {
      newAlerts.push({
        id: `alert-${Date.now()}-1`,
        type: 'warning',
        message: `Build time is high: ${metrics.buildTime.toFixed(2)}s`,
        timestamp: new Date(),
        severity: 'medium'
      });
    }

    if (metrics.largeChunks > 3) {
      newAlerts.push({
        id: `alert-${Date.now()}-2`,
        type: 'error',
        message: `Too many large chunks: ${metrics.largeChunks}`,
        timestamp: new Date(),
        severity: 'high'
      });
    }

    if (metrics.culturalSafetyScore < 85) {
      newAlerts.push({
        id: `alert-${Date.now()}-3`,
        type: 'warning',
        message: `Cultural safety score below threshold: ${metrics.culturalSafetyScore.toFixed(1)}%`,
        timestamp: new Date(),
        severity: 'medium'
      });
    }

    if (metrics.systemHealth < 70) {
      newAlerts.push({
        id: `alert-${Date.now()}-4`,
        type: 'error',
        message: `System health critical: ${metrics.systemHealth.toFixed(1)}%`,
        timestamp: new Date(),
        severity: 'critical'
      });
    }

    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev.slice(0, 9)]);
    }
  };

  const getMetricColor = (value: number, thresholds: { good: number; warning: number; critical: number }) => {
    if (value >= thresholds.good) return '#10b981';
    if (value >= thresholds.warning) return '#f59e0b';
    return '#ef4444';
  };

  const getMetricStatus = (value: number, thresholds: { good: number; warning: number; critical: number }) => {
    if (value >= thresholds.good) return '✅';
    if (value >= thresholds.warning) return '⚠️';
    return '❌';
  };

  const formatMetric = (value: number, unit: string) => {
    if (unit === 'ms') return `${value.toFixed(0)}ms`;
    if (unit === 's') return `${value.toFixed(2)}s`;
    if (unit === 'KB') return `${(value / 1024).toFixed(1)}KB`;
    if (unit === 'MB') return `${(value / 1024 / 1024).toFixed(1)}MB`;
    if (unit === '%') return `${value.toFixed(1)}%`;
    return value.toFixed(0);
  };

  return (
    <div className="advanced-performance-monitor">
      <div className="monitor-header">
        <h1>🚀 Advanced Performance Monitor</h1>
        <p>Real-time system performance and optimization tracking</p>
        
        <div className="monitor-controls">
          <div className="timeframe-selector">
            <button 
              className={selectedTimeframe === '1h' ? 'active' : ''}
              onClick={() => setSelectedTimeframe('1h')}
            >
              1 Hour
            </button>
            <button 
              className={selectedTimeframe === '6h' ? 'active' : ''}
              onClick={() => setSelectedTimeframe('6h')}
            >
              6 Hours
            </button>
            <button 
              className={selectedTimeframe === '24h' ? 'active' : ''}
              onClick={() => setSelectedTimeframe('24h')}
            >
              24 Hours
            </button>
            <button 
              className={selectedTimeframe === '7d' ? 'active' : ''}
              onClick={() => setSelectedTimeframe('7d')}
            >
              7 Days
            </button>
          </div>
          
          <button 
            className={`monitor-toggle ${isMonitoring ? 'active' : ''}`}
            onClick={() => setIsMonitoring(!isMonitoring)}
          >
            {isMonitoring ? '🟢 Monitoring' : '🔴 Stopped'}
          </button>
        </div>
      </div>

      <div className="monitor-grid">
        {/* Build Performance */}
        <div className="metric-card build-performance">
          <h3>🏗️ Build Performance</h3>
          <div className="metric-grid">
            <div className="metric-item">
              <span className="metric-label">Build Time</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.buildTime, { good: 10, warning: 15, critical: 20 }) }}
              >
                {getMetricStatus(currentMetrics.buildTime, { good: 10, warning: 15, critical: 20 })}
                {formatMetric(currentMetrics.buildTime, 's')}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Bundle Size</span>
              <span className="metric-value">
                {formatMetric(currentMetrics.bundleSize, 'KB')}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Total Files</span>
              <span className="metric-value">
                {currentMetrics.totalFiles.toLocaleString()}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Large Chunks</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.largeChunks, { good: 2, warning: 3, critical: 5 }) }}
              >
                {getMetricStatus(currentMetrics.largeChunks, { good: 2, warning: 3, critical: 5 })}
                {currentMetrics.largeChunks}
              </span>
            </div>
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="metric-card core-web-vitals">
          <h3>⚡ Core Web Vitals</h3>
          <div className="metric-grid">
            <div className="metric-item">
              <span className="metric-label">First Contentful Paint</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.firstContentfulPaint, { good: 1800, warning: 2500, critical: 4000 }) }}
              >
                {getMetricStatus(currentMetrics.firstContentfulPaint, { good: 1800, warning: 2500, critical: 4000 })}
                {formatMetric(currentMetrics.firstContentfulPaint, 'ms')}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Largest Contentful Paint</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.largestContentfulPaint, { good: 2500, warning: 4000, critical: 6000 }) }}
              >
                {getMetricStatus(currentMetrics.largestContentfulPaint, { good: 2500, warning: 4000, critical: 6000 })}
                {formatMetric(currentMetrics.largestContentfulPaint, 'ms')}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Total Blocking Time</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.totalBlockingTime, { good: 200, warning: 600, critical: 1000 }) }}
              >
                {getMetricStatus(currentMetrics.totalBlockingTime, { good: 200, warning: 600, critical: 1000 })}
                {formatMetric(currentMetrics.totalBlockingTime, 'ms')}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Cumulative Layout Shift</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.cumulativeLayoutShift, { good: 0.1, warning: 0.25, critical: 0.5 }) }}
              >
                {getMetricStatus(currentMetrics.cumulativeLayoutShift, { good: 0.1, warning: 0.25, critical: 0.5 })}
                {currentMetrics.cumulativeLayoutShift.toFixed(3)}
              </span>
            </div>
          </div>
        </div>

        {/* AI System Metrics */}
        <div className="metric-card ai-system-metrics">
          <h3>🤖 AI System Metrics</h3>
          <div className="metric-grid">
            <div className="metric-item">
              <span className="metric-label">Cultural Safety Score</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.culturalSafetyScore, { good: 90, warning: 85, critical: 80 }) }}
              >
                {getMetricStatus(currentMetrics.culturalSafetyScore, { good: 90, warning: 85, critical: 80 })}
                {formatMetric(currentMetrics.culturalSafetyScore, '%')}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Educational Excellence</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.educationalExcellence, { good: 90, warning: 85, critical: 80 }) }}
              >
                {getMetricStatus(currentMetrics.educationalExcellence, { good: 90, warning: 85, critical: 80 })}
                {formatMetric(currentMetrics.educationalExcellence, '%')}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Agent Coordination</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.agentCoordination, { good: 90, warning: 85, critical: 80 }) }}
              >
                {getMetricStatus(currentMetrics.agentCoordination, { good: 90, warning: 85, critical: 80 })}
                {formatMetric(currentMetrics.agentCoordination, '%')}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Consciousness Level</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.consciousnessLevel, { good: 90, warning: 85, critical: 80 }) }}
              >
                {getMetricStatus(currentMetrics.consciousnessLevel, { good: 90, warning: 85, critical: 80 })}
                {formatMetric(currentMetrics.consciousnessLevel, '%')}
              </span>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="metric-card system-health">
          <h3>💻 System Health</h3>
          <div className="metric-grid">
            <div className="metric-item">
              <span className="metric-label">System Health</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.systemHealth, { good: 85, warning: 70, critical: 60 }) }}
              >
                {getMetricStatus(currentMetrics.systemHealth, { good: 85, warning: 70, critical: 60 })}
                {formatMetric(currentMetrics.systemHealth, '%')}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Response Time</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.responseTime, { good: 200, warning: 500, critical: 1000 }) }}
              >
                {getMetricStatus(currentMetrics.responseTime, { good: 200, warning: 500, critical: 1000 })}
                {formatMetric(currentMetrics.responseTime, 'ms')}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Memory Usage</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.memoryUsage, { good: 50, warning: 70, critical: 85 }) }}
              >
                {getMetricStatus(currentMetrics.memoryUsage, { good: 50, warning: 70, critical: 85 })}
                {formatMetric(currentMetrics.memoryUsage, '%')}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">CPU Usage</span>
              <span 
                className="metric-value"
                style={{ color: getMetricColor(currentMetrics.cpuUsage, { good: 40, warning: 60, critical: 80 }) }}
              >
                {getMetricStatus(currentMetrics.cpuUsage, { good: 40, warning: 60, critical: 80 })}
                {formatMetric(currentMetrics.cpuUsage, '%')}
              </span>
            </div>
          </div>
        </div>

        {/* Performance History Chart */}
        <div className="metric-card performance-history">
          <h3>📈 Performance History</h3>
          <div className="history-chart">
            <div className="chart-placeholder">
              <div className="chart-line">
                {performanceHistory.slice(-20).map((point, index) => (
                  <div 
                    key={index}
                    className="chart-point"
                    style={{ 
                      left: `${(index / 19) * 100}%`, 
                      bottom: `${(point.metrics.systemHealth / 100) * 100}%` 
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="chart-labels">
              <span>System Health Over Time</span>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="metric-card system-alerts">
          <h3>🚨 System Alerts</h3>
          <div className="alerts-list">
            {alerts.length === 0 ? (
              <div className="no-alerts">✅ No active alerts</div>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className={`alert-item ${alert.type} ${alert.severity}`}>
                  <div className="alert-header">
                    <span className="alert-type">{alert.type.toUpperCase()}</span>
                    <span className="alert-severity">{alert.severity}</span>
                    <span className="alert-time">{alert.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className="alert-message">{alert.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="monitor-summary">
        <div className="summary-stats">
          <div className="summary-stat">
            <span className="stat-label">Overall Health</span>
            <span 
              className="stat-value"
              style={{ color: getMetricColor(currentMetrics.systemHealth, { good: 85, warning: 70, critical: 60 }) }}
            >
              {formatMetric(currentMetrics.systemHealth, '%')}
            </span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Active Alerts</span>
            <span className="stat-value">{alerts.length}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Monitoring Status</span>
            <span className="stat-value">{isMonitoring ? '🟢 Active' : '🔴 Stopped'}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Last Update</span>
            <span className="stat-value">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedPerformanceMonitor;
