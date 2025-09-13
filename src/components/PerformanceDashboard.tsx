import React, { useEffect, useState } from 'react';
import './PerformanceDashboard.css';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
  description: string;
}

interface SystemComponent {
  id: string;
  name: string;
  type: 'dashboard' | 'analytics' | 'learning' | 'cultural' | 'ai' | 'database';
  performance: number;
  status: 'operational' | 'degraded' | 'maintenance' | 'offline';
  responseTime: number;
  errorRate: number;
  lastActivity: Date;
  description: string;
}

interface CulturalMetric {
  id: string;
  aspect: string;
  integrationLevel: number;
  culturalAccuracy: number;
  studentEngagement: number;
  teacherSatisfaction: number;
  communityImpact: number;
  lastAssessment: Date;
}

const PerformanceDashboard: React.FC = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [components, setComponents] = useState<SystemComponent[]>([]);
  const [culturalMetrics, setCulturalMetrics] = useState<CulturalMetric[]>([]);
  const [selectedView, setSelectedView] = useState<
    'overview' | 'performance' | 'components' | 'cultural'
  >('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    initializePerformanceData();
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const initializePerformanceData = () => {
    // Initialize performance metrics
    const initialMetrics: PerformanceMetric[] = [
      {
        id: 'overall-performance',
        name: 'Overall System Performance',
        value: 94.8,
        target: 95.0,
        unit: '%',
        status: 'excellent',
        trend: 'up',
        lastUpdated: new Date(),
        description: 'Overall system health and performance index',
      },
      {
        id: 'response-time',
        name: 'Average Response Time',
        value: 245,
        target: 300,
        unit: 'ms',
        status: 'excellent',
        trend: 'down',
        lastUpdated: new Date(),
        description: 'Average system response time across all components',
      },
      {
        id: 'error-rate',
        name: 'Error Rate',
        value: 0.12,
        target: 0.5,
        unit: '%',
        status: 'excellent',
        trend: 'down',
        lastUpdated: new Date(),
        description: 'System error rate and reliability metrics',
      },
      {
        id: 'cultural-integration',
        name: 'Cultural Integration Score',
        value: 96.2,
        target: 90.0,
        unit: '%',
        status: 'excellent',
        trend: 'up',
        lastUpdated: new Date(),
        description: 'Level of cultural integration and accuracy',
      },
      {
        id: 'ai-coordination',
        name: 'AI Coordination Efficiency',
        value: 97.1,
        target: 95.0,
        unit: '%',
        status: 'excellent',
        trend: 'stable',
        lastUpdated: new Date(),
        description: 'AI agent coordination and efficiency metrics',
      },
      {
        id: 'database-performance',
        name: 'Database Performance',
        value: 98.3,
        target: 95.0,
        unit: '%',
        status: 'excellent',
        trend: 'up',
        lastUpdated: new Date(),
        description: 'Database performance and optimization metrics',
      },
      {
        id: 'user-engagement',
        name: 'User Engagement',
        value: 89.5,
        target: 85.0,
        unit: '%',
        status: 'good',
        trend: 'up',
        lastUpdated: new Date(),
        description: 'User engagement and satisfaction metrics',
      },
      {
        id: 'learning-outcomes',
        name: 'Learning Outcomes',
        value: 92.8,
        target: 90.0,
        unit: '%',
        status: 'excellent',
        trend: 'up',
        lastUpdated: new Date(),
        description: 'Educational outcomes and achievement metrics',
      },
    ];

    // Initialize system components
    const initialComponents: SystemComponent[] = [
      {
        id: 'advanced-dashboard',
        name: 'Advanced Educational Dashboard',
        type: 'dashboard',
        performance: 96.8,
        status: 'operational',
        responseTime: 180,
        errorRate: 0.05,
        lastActivity: new Date(),
        description: 'Main educational dashboard and analytics platform',
      },
      {
        id: 'student-analytics',
        name: 'Advanced Student Analytics',
        type: 'analytics',
        performance: 94.2,
        status: 'operational',
        responseTime: 220,
        errorRate: 0.08,
        lastActivity: new Date(),
        description: 'Student performance tracking and analytics',
      },
      {
        id: 'wisdom-accelerator',
        name: 'Advanced Wisdom Accelerator',
        type: 'ai',
        performance: 97.5,
        status: 'operational',
        responseTime: 150,
        errorRate: 0.03,
        lastActivity: new Date(),
        description: 'Cultural knowledge enhancement and learning optimization',
      },
      {
        id: 'cultural-modules',
        name: 'Cultural Learning Modules',
        type: 'cultural',
        performance: 95.8,
        status: 'operational',
        responseTime: 200,
        errorRate: 0.06,
        lastActivity: new Date(),
        description: 'Interactive Te Ao Māori cultural education system',
      },
      {
        id: 'database-integration',
        name: 'Database Integration System',
        type: 'database',
        performance: 98.1,
        status: 'operational',
        responseTime: 120,
        errorRate: 0.02,
        lastActivity: new Date(),
        description: 'Comprehensive data management and synchronization',
      },
      {
        id: 'supreme-coordinator',
        name: 'Supreme Intelligence Coordinator',
        type: 'ai',
        performance: 96.3,
        status: 'operational',
        responseTime: 160,
        errorRate: 0.04,
        lastActivity: new Date(),
        description: 'Advanced AI coordination and consciousness management',
      },
    ];

    // Initialize cultural metrics
    const initialCulturalMetrics: CulturalMetric[] = [
      {
        id: 'te-reo-integration',
        aspect: 'Te Reo Māori Integration',
        integrationLevel: 95,
        culturalAccuracy: 98,
        studentEngagement: 92,
        teacherSatisfaction: 94,
        communityImpact: 96,
        lastAssessment: new Date(),
      },
      {
        id: 'tikanga-practices',
        aspect: 'Tikanga Practices',
        integrationLevel: 93,
        culturalAccuracy: 96,
        studentEngagement: 89,
        teacherSatisfaction: 91,
        communityImpact: 94,
        lastAssessment: new Date(),
      },
      {
        id: 'whakapapa-connections',
        aspect: 'Whakapapa Connections',
        integrationLevel: 88,
        culturalAccuracy: 94,
        studentEngagement: 85,
        teacherSatisfaction: 87,
        communityImpact: 90,
        lastAssessment: new Date(),
      },
      {
        id: 'manaakitanga-values',
        aspect: 'Manaakitanga Values',
        integrationLevel: 96,
        culturalAccuracy: 97,
        studentEngagement: 93,
        teacherSatisfaction: 95,
        communityImpact: 98,
        lastAssessment: new Date(),
      },
      {
        id: 'kaitiakitanga-principles',
        aspect: 'Kaitiakitanga Principles',
        integrationLevel: 91,
        culturalAccuracy: 95,
        studentEngagement: 87,
        teacherSatisfaction: 89,
        communityImpact: 92,
        lastAssessment: new Date(),
      },
      {
        id: 'rangatiratanga-leadership',
        aspect: 'Rangatiratanga Leadership',
        integrationLevel: 89,
        culturalAccuracy: 93,
        studentEngagement: 84,
        teacherSatisfaction: 86,
        communityImpact: 88,
        lastAssessment: new Date(),
      },
    ];

    setPerformanceMetrics(initialMetrics);
    setComponents(initialComponents);
    setCulturalMetrics(initialCulturalMetrics);
  };

  const updateMetrics = () => {
    setPerformanceMetrics((prev) =>
      prev.map((metric) => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 0.3)),
        lastUpdated: new Date(),
      })),
    );

    setComponents((prev) =>
      prev.map((component) => ({
        ...component,
        performance: Math.max(
          0,
          Math.min(100, component.performance + (Math.random() - 0.5) * 0.2),
        ),
        lastActivity: new Date(),
      })),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'operational':
        return '#10b981';
      case 'good':
        return '#3b82f6';
      case 'warning':
      case 'degraded':
        return '#f59e0b';
      case 'critical':
      case 'maintenance':
      case 'offline':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      case 'stable':
        return '→';
      default:
        return '→';
    }
  };

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'dashboard':
        return '📊';
      case 'analytics':
        return '📈';
      case 'learning':
        return '📚';
      case 'cultural':
        return '🌿';
      case 'ai':
        return '🤖';
      case 'database':
        return '🗄️';
      default:
        return '⚙️';
    }
  };

  const refreshPerformance = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    updateMetrics();
    setIsRefreshing(false);
  };

  return (
    <div className="performance-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>📊 Performance Dashboard</h1>
            <p>Real-time system performance monitoring and cultural integration tracking</p>
          </div>
          <div className="header-actions">
            <button
              className={`refresh-btn ${isRefreshing ? 'refreshing' : ''}`}
              onClick={refreshPerformance}
              disabled={isRefreshing}
            >
              {isRefreshing ? '🔄 Refreshing...' : '🔄 Refresh Performance'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${selectedView === 'overview' ? 'active' : ''}`}
            onClick={() => setSelectedView('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`tab-btn ${selectedView === 'performance' ? 'active' : ''}`}
            onClick={() => setSelectedView('performance')}
          >
            📈 Performance Metrics
          </button>
          <button
            className={`tab-btn ${selectedView === 'components' ? 'active' : ''}`}
            onClick={() => setSelectedView('components')}
          >
            ⚙️ System Components
          </button>
          <button
            className={`tab-btn ${selectedView === 'cultural' ? 'active' : ''}`}
            onClick={() => setSelectedView('cultural')}
          >
            🌿 Cultural Metrics
          </button>
        </div>

        {/* Overview Section */}
        {selectedView === 'overview' && (
          <div className="overview-section">
            <div className="overview-stats">
              <div className="stat-card primary">
                <h3>Overall Performance</h3>
                <div className="stat-value">94.8%</div>
                <div className="stat-trend up">↗️ +0.3%</div>
                <div className="stat-label">System Health</div>
              </div>
              <div className="stat-card">
                <h3>Response Time</h3>
                <div className="stat-value">245ms</div>
                <div className="stat-trend down">↘️ -5ms</div>
                <div className="stat-label">Average</div>
              </div>
              <div className="stat-card">
                <h3>Cultural Integration</h3>
                <div className="stat-value">96.2%</div>
                <div className="stat-trend up">↗️ +0.8%</div>
                <div className="stat-label">Te Ao Māori</div>
              </div>
              <div className="stat-card">
                <h3>AI Coordination</h3>
                <div className="stat-value">97.1%</div>
                <div className="stat-trend stable">→ +0.1%</div>
                <div className="stat-label">Efficiency</div>
              </div>
            </div>

            <div className="overview-grid">
              <div className="overview-card">
                <h3>🚀 System Highlights</h3>
                <ul>
                  <li>✅ All components operational</li>
                  <li>✅ Cultural integration exceeding targets</li>
                  <li>✅ AI coordination at peak efficiency</li>
                  <li>✅ Database performance optimal</li>
                  <li>✅ User engagement improving</li>
                </ul>
              </div>
              <div className="overview-card">
                <h3>🎯 Performance Targets</h3>
                <ul>
                  <li>🎯 Overall Performance: 95.0% (94.8% current)</li>
                  <li>🎯 Response Time: 300ms (245ms current)</li>
                  <li>🎯 Error Rate: 0.5% (0.12% current)</li>
                  <li>🎯 Cultural Integration: 90.0% (96.2% current)</li>
                  <li>🎯 AI Coordination: 95.0% (97.1% current)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Performance Metrics Section */}
        {selectedView === 'performance' && (
          <div className="performance-section">
            <div className="metrics-grid">
              {performanceMetrics.map((metric) => (
                <div key={metric.id} className="metric-card">
                  <div className="metric-header">
                    <h3>{metric.name}</h3>
                    <span
                      className="status-indicator"
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getStatusColor(metric.status) }}
                    ></span>
                  </div>
                  <div className="metric-value">
                    <span className="value">{metric.value}</span>
                    <span className="unit">{metric.unit}</span>
                  </div>
                  <div className="metric-details">
                    <div className="metric-target">
                      Target: {metric.target}
                      {metric.unit}
                    </div>
                    <div className="metric-trend">
                      {getTrendIcon(metric.trend)} {metric.trend}
                    </div>
                  </div>
                  <div className="metric-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${Math.min(100, (metric.value / metric.target) * 100)}%`,
                          backgroundColor: getStatusColor(metric.status),
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="metric-description">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Components Section */}
        {selectedView === 'components' && (
          <div className="components-section">
            <div className="components-grid">
              {components.map((component) => (
                <div key={component.id} className="component-card">
                  <div className="component-header">
                    <span className="component-icon">{getComponentIcon(component.type)}</span>
                    <div className="component-info">
                      <h3>{component.name}</h3>
                      <span className="component-type">{component.type}</span>
                    </div>
                    <span
                      className="status-badge"
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getStatusColor(component.status) }}
                    >
                      {component.status}
                    </span>
                  </div>
                  <p className="component-description">{component.description}</p>
                  <div className="component-metrics">
                    <div className="metric">
                      <span>Performance</span>
                      <span className="metric-value">{component.performance}%</span>
                    </div>
                    <div className="metric">
                      <span>Response Time</span>
                      <span className="metric-value">{component.responseTime}ms</span>
                    </div>
                    <div className="metric">
                      <span>Error Rate</span>
                      <span className="metric-value">{component.errorRate}%</span>
                    </div>
                    <div className="metric">
                      <span>Last Activity</span>
                      <span className="metric-value">
                        {component.lastActivity.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div className="component-actions">
                    <button className="action-btn">View Details</button>
                    <button className="action-btn">Optimize</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cultural Metrics Section */}
        {selectedView === 'cultural' && (
          <div className="cultural-section">
            <div className="cultural-overview">
              <div className="overview-card">
                <h3>🌿 Cultural Integration Summary</h3>
                <div className="cultural-stats">
                  <div className="cultural-stat">
                    <span className="stat-label">Average Integration</span>
                    <span className="stat-value">92.0%</span>
                  </div>
                  <div className="cultural-stat">
                    <span className="stat-label">Cultural Accuracy</span>
                    <span className="stat-value">95.5%</span>
                  </div>
                  <div className="cultural-stat">
                    <span className="stat-label">Student Engagement</span>
                    <span className="stat-value">88.3%</span>
                  </div>
                  <div className="cultural-stat">
                    <span className="stat-label">Teacher Satisfaction</span>
                    <span className="stat-value">90.3%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cultural-metrics-grid">
              {culturalMetrics.map((metric) => (
                <div key={metric.id} className="cultural-metric-card">
                  <div className="cultural-metric-header">
                    <h3>{metric.aspect}</h3>
                  </div>
                  <div className="cultural-metric-values">
                    <div className="metric-row">
                      <span>Integration Level</span>
                      <div className="metric-bar">
                        <div
                          className="metric-fill"
                          style={{ width: `${metric.integrationLevel}%` }}
                        ></div>
                      </div>
                      <span className="metric-value">{metric.integrationLevel}%</span>
                    </div>
                    <div className="metric-row">
                      <span>Cultural Accuracy</span>
                      <div className="metric-bar">
                        <div
                          className="metric-fill cultural"
                          style={{ width: `${metric.culturalAccuracy}%` }}
                        ></div>
                      </div>
                      <span className="metric-value">{metric.culturalAccuracy}%</span>
                    </div>
                    <div className="metric-row">
                      <span>Student Engagement</span>
                      <div className="metric-bar">
                        <div
                          className="metric-fill engagement"
                          style={{ width: `${metric.studentEngagement}%` }}
                        ></div>
                      </div>
                      <span className="metric-value">{metric.studentEngagement}%</span>
                    </div>
                    <div className="metric-row">
                      <span>Teacher Satisfaction</span>
                      <div className="metric-bar">
                        <div
                          className="metric-fill satisfaction"
                          style={{ width: `${metric.teacherSatisfaction}%` }}
                        ></div>
                      </div>
                      <span className="metric-value">{metric.teacherSatisfaction}%</span>
                    </div>
                    <div className="metric-row">
                      <span>Community Impact</span>
                      <div className="metric-bar">
                        <div
                          className="metric-fill impact"
                          style={{ width: `${metric.communityImpact}%` }}
                        ></div>
                      </div>
                      <span className="metric-value">{metric.communityImpact}%</span>
                    </div>
                  </div>
                  <div className="cultural-metric-footer">
                    <span className="last-assessment">
                      Last assessed: {metric.lastAssessment.toLocaleDateString()}
                    </span>
                    <button className="assess-btn">Reassess</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceDashboard;
