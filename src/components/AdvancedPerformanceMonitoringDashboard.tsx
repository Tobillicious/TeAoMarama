import React, { useEffect, useState } from 'react';
import './AdvancedPerformanceMonitoringDashboard.css';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  threshold: {
    warning: number;
    critical: number;
  };
  status: 'good' | 'warning' | 'critical';
}

interface SystemPerformance {
  cpu: PerformanceMetric;
  memory: PerformanceMetric;
  network: PerformanceMetric;
  storage: PerformanceMetric;
  responseTime: PerformanceMetric;
  throughput: PerformanceMetric;
  errorRate: PerformanceMetric;
  uptime: PerformanceMetric;
}

interface AgentPerformance {
  agentId: string;
  agentName: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR' | 'MAINTENANCE';
  performance: {
    responseTime: number;
    taskCompletionRate: number;
    errorRate: number;
    culturalCompliance: number;
  };
  lastUpdate: string;
  workload: number;
  efficiency: number;
}

interface PredictiveAnalytics {
  forecast: {
    cpuUsage: number[];
    memoryUsage: number[];
    responseTime: number[];
    errorRate: number[];
  };
  trends: {
    performance: 'improving' | 'stable' | 'declining';
    capacity: 'sufficient' | 'adequate' | 'insufficient';
    reliability: 'high' | 'medium' | 'low';
  };
  recommendations: string[];
  alerts: string[];
}

const AdvancedPerformanceMonitoringDashboard: React.FC = () => {
  const [systemPerformance, setSystemPerformance] = useState<SystemPerformance | null>(null);
  const [agentPerformance, setAgentPerformance] = useState<AgentPerformance[]>([]);
  const [predictiveAnalytics, setPredictiveAnalytics] = useState<PredictiveAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);

  useEffect(() => {
    loadPerformanceData();
    const interval = setInterval(loadPerformanceData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const loadPerformanceData = async () => {
    try {
      setIsLoading(true);

      // Load system performance data
      const systemResponse = await fetch('/api/system-performance');
      if (systemResponse.ok) {
        const systemData = await systemResponse.json();
        setSystemPerformance(systemData);
      } else {
        // Load mock data for demonstration
        loadMockSystemData();
      }

      // Load agent performance data
      const agentsResponse = await fetch('/api/agent-performance');
      if (agentsResponse.ok) {
        const agentsData = await agentsResponse.json();
        setAgentPerformance(agentsData);
      } else {
        // Load mock data for demonstration
        loadMockAgentData();
      }

      // Load predictive analytics
      const analyticsResponse = await fetch('/api/predictive-analytics');
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setPredictiveAnalytics(analyticsData);
      } else {
        // Load mock data for demonstration
        loadMockAnalyticsData();
      }
    } catch (error) {
      console.error('Error loading performance data:', error);
      loadMockData();
    } finally {
      setIsLoading(false);
    }
  };

  const loadMockSystemData = () => {
    setSystemPerformance({
      cpu: {
        name: 'CPU Usage',
        value: 45.2,
        unit: '%',
        trend: 'stable',
        threshold: { warning: 70, critical: 85 },
        status: 'good',
      },
      memory: {
        name: 'Memory Usage',
        value: 62.8,
        unit: '%',
        trend: 'up',
        threshold: { warning: 80, critical: 90 },
        status: 'good',
      },
      network: {
        name: 'Network Latency',
        value: 12.5,
        unit: 'ms',
        trend: 'down',
        threshold: { warning: 50, critical: 100 },
        status: 'good',
      },
      storage: {
        name: 'Storage Usage',
        value: 34.7,
        unit: '%',
        trend: 'stable',
        threshold: { warning: 80, critical: 90 },
        status: 'good',
      },
      responseTime: {
        name: 'Response Time',
        value: 156,
        unit: 'ms',
        trend: 'down',
        threshold: { warning: 500, critical: 1000 },
        status: 'good',
      },
      throughput: {
        name: 'Throughput',
        value: 1250,
        unit: 'req/s',
        trend: 'up',
        threshold: { warning: 800, critical: 500 },
        status: 'good',
      },
      errorRate: {
        name: 'Error Rate',
        value: 0.12,
        unit: '%',
        trend: 'down',
        threshold: { warning: 1, critical: 5 },
        status: 'good',
      },
      uptime: {
        name: 'Uptime',
        value: 99.97,
        unit: '%',
        trend: 'stable',
        threshold: { warning: 99, critical: 95 },
        status: 'good',
      },
    });
  };

  const loadMockAgentData = () => {
    setAgentPerformance([
      {
        agentId: 'supreme-overseer',
        agentName: 'Supreme Intelligence Overseer',
        status: 'ACTIVE',
        performance: {
          responseTime: 45,
          taskCompletionRate: 98.5,
          errorRate: 0.05,
          culturalCompliance: 100,
        },
        lastUpdate: new Date().toISOString(),
        workload: 75,
        efficiency: 94,
      },
      {
        agentId: 'kaitiaki-mahara',
        agentName: 'Kaitiaki Mahara',
        status: 'ACTIVE',
        performance: {
          responseTime: 52,
          taskCompletionRate: 97.2,
          errorRate: 0.08,
          culturalCompliance: 100,
        },
        lastUpdate: new Date().toISOString(),
        workload: 68,
        efficiency: 92,
      },
      {
        agentId: 'best-overseer',
        agentName: 'Best Overseer',
        status: 'ACTIVE',
        performance: {
          responseTime: 38,
          taskCompletionRate: 99.1,
          errorRate: 0.03,
          culturalCompliance: 100,
        },
        lastUpdate: new Date().toISOString(),
        workload: 82,
        efficiency: 96,
      },
      {
        agentId: 'cascade-windsurf',
        agentName: 'Cascade (Windsurf)',
        status: 'ACTIVE',
        performance: {
          responseTime: 41,
          taskCompletionRate: 96.8,
          errorRate: 0.12,
          culturalCompliance: 100,
        },
        lastUpdate: new Date().toISOString(),
        workload: 71,
        efficiency: 89,
      },
      {
        agentId: 'cultural-safety-kaitiaki',
        agentName: 'Cultural Safety-Kaitiaki',
        status: 'ACTIVE',
        performance: {
          responseTime: 48,
          taskCompletionRate: 98.9,
          errorRate: 0.02,
          culturalCompliance: 100,
        },
        lastUpdate: new Date().toISOString(),
        workload: 65,
        efficiency: 95,
      },
    ]);
  };

  const loadMockAnalyticsData = () => {
    setPredictiveAnalytics({
      forecast: {
        cpuUsage: [45, 47, 49, 52, 48, 46, 44],
        memoryUsage: [62, 64, 66, 68, 65, 63, 61],
        responseTime: [156, 158, 162, 165, 160, 157, 155],
        errorRate: [0.12, 0.11, 0.13, 0.15, 0.14, 0.12, 0.1],
      },
      trends: {
        performance: 'improving',
        capacity: 'sufficient',
        reliability: 'high',
      },
      recommendations: [
        'Consider scaling memory allocation for peak usage periods',
        'Optimize database queries to reduce response time',
        'Implement caching for frequently accessed resources',
        'Monitor error rate trends for early issue detection',
      ],
      alerts: [
        'Memory usage approaching warning threshold',
        'Response time variance detected in agent coordination',
      ],
    });
  };

  const loadMockData = () => {
    loadMockSystemData();
    loadMockAgentData();
    loadMockAnalyticsData();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'critical':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      case 'stable':
        return '➡️';
      default:
        return '➡️';
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return '#10B981';
      case 'INACTIVE':
        return '#6B7280';
      case 'ERROR':
        return '#EF4444';
      case 'MAINTENANCE':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving':
        return '#10B981';
      case 'stable':
        return '#6B7280';
      case 'declining':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <div className="performance-monitoring-dashboard">
      <div className="dashboard-header">
        <h1>📊 Advanced Performance Monitoring Dashboard</h1>
        <p className="dashboard-subtitle">
          Real-time system performance monitoring with predictive analytics and agent coordination
          insights
        </p>
        <div className="header-controls">
          <button className="refresh-button" onClick={loadPerformanceData} disabled={isLoading}>
            {isLoading ? '🔄 Refreshing...' : '🔄 Refresh Data'}
          </button>
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="refresh-interval"
          >
            <option value={5000}>5 seconds</option>
            <option value={10000}>10 seconds</option>
            <option value={30000}>30 seconds</option>
            <option value={60000}>1 minute</option>
          </select>
        </div>
      </div>

      {systemPerformance && (
        <div className="system-performance">
          <h2>🖥️ System Performance Metrics</h2>
          <div className="metrics-grid">
            {Object.entries(systemPerformance).map(([key, metric]) => (
              <div key={key} className="metric-card">
                <div className="metric-header">
                  <h3>{metric.name}</h3>
                  <div className="metric-trend">
                    <span className="trend-icon">{getTrendIcon(metric.trend)}</span>
                    <span className="trend-text">{metric.trend}</span>
                  </div>
                </div>
                <div className="metric-value">
                  <span className="value">{metric.value}</span>
                  <span className="unit">{metric.unit}</span>
                </div>
                <div className="metric-status">
                  <span
                    className="status-indicator"
                    /* TODO: Move to external CSS */ style={{ backgroundColor: getStatusColor(metric.status) }}
                  >
                    {metric.status}
                  </span>
                </div>
                <div className="metric-thresholds">
                  <div className="threshold">
                    <span className="threshold-label">Warning:</span>
                    <span className="threshold-value">
                      {metric.threshold.warning}
                      {metric.unit}
                    </span>
                  </div>
                  <div className="threshold">
                    <span className="threshold-label">Critical:</span>
                    <span className="threshold-value">
                      {metric.threshold.critical}
                      {metric.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="agent-performance">
        <h2>🤖 Agent Performance Overview</h2>
        <div className="agents-table">
          <div className="table-header">
            <div className="header-cell">Agent</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Response Time</div>
            <div className="header-cell">Completion Rate</div>
            <div className="header-cell">Error Rate</div>
            <div className="header-cell">Cultural Compliance</div>
            <div className="header-cell">Workload</div>
            <div className="header-cell">Efficiency</div>
          </div>
          {agentPerformance.map((agent) => (
            <div key={agent.agentId} className="table-row">
              <div className="table-cell">
                <div className="agent-info">
                  <span className="agent-name">{agent.agentName}</span>
                  <span className="agent-id">{agent.agentId}</span>
                </div>
              </div>
              <div className="table-cell">
                <span
                  className="status-badge"
                  /* TODO: Move to external CSS */ style={{ backgroundColor: getAgentStatusColor(agent.status) }}
                >
                  {agent.status}
                </span>
              </div>
              <div className="table-cell">{agent.performance.responseTime}ms</div>
              <div className="table-cell">{agent.performance.taskCompletionRate}%</div>
              <div className="table-cell">{agent.performance.errorRate}%</div>
              <div className="table-cell">{agent.performance.culturalCompliance}%</div>
              <div className="table-cell">
                <div className="workload-bar">
                  <div className="workload-fill" style={{ width: `${agent.workload}%` }}></div>
                  <span className="workload-text">{agent.workload}%</span>
                </div>
              </div>
              <div className="table-cell">
                <div className="efficiency-bar">
                  <div className="efficiency-fill" style={{ width: `${agent.efficiency}%` }}></div>
                  <span className="efficiency-text">{agent.efficiency}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {predictiveAnalytics && (
        <div className="predictive-analytics">
          <h2>🔮 Predictive Analytics & Trends</h2>
          <div className="analytics-grid">
            <div className="trends-card">
              <h3>Performance Trends</h3>
              <div className="trends-list">
                <div className="trend-item">
                  <span className="trend-label">Overall Performance:</span>
                  <span
                    className="trend-value"
                    /* TODO: Move to external CSS */ style={{ color: getTrendColor(predictiveAnalytics.trends.performance) }}
                  >
                    {predictiveAnalytics.trends.performance}
                  </span>
                </div>
                <div className="trend-item">
                  <span className="trend-label">System Capacity:</span>
                  <span
                    className="trend-value"
                    /* TODO: Move to external CSS */ style={{ color: getTrendColor(predictiveAnalytics.trends.capacity) }}
                  >
                    {predictiveAnalytics.trends.capacity}
                  </span>
                </div>
                <div className="trend-item">
                  <span className="trend-label">Reliability:</span>
                  <span
                    className="trend-value"
                    /* TODO: Move to external CSS */ style={{ color: getTrendColor(predictiveAnalytics.trends.reliability) }}
                  >
                    {predictiveAnalytics.trends.reliability}
                  </span>
                </div>
              </div>
            </div>

            <div className="recommendations-card">
              <h3>Recommendations</h3>
              <div className="recommendations-list">
                {predictiveAnalytics.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-item">
                    <span className="recommendation-icon">💡</span>
                    <span className="recommendation-text">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {predictiveAnalytics.alerts.length > 0 && (
              <div className="alerts-card">
                <h3>Active Alerts</h3>
                <div className="alerts-list">
                  {predictiveAnalytics.alerts.map((alert, index) => (
                    <div key={index} className="alert-item">
                      <span className="alert-icon">⚠️</span>
                      <span className="alert-text">{alert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="performance-footer">
        <p>
          <strong>Performance Mission:</strong> Ensuring optimal system performance, agent
          coordination efficiency, and predictive analytics for proactive optimization.
        </p>
        <p className="footer-quote">
          "He waka eke noa" - We are all in this canoe together, performing at our best
        </p>
      </div>
    </div>
  );
};

export default AdvancedPerformanceMonitoringDashboard;
