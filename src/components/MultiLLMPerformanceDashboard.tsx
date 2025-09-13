import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/DualRoleAuthProvider';
import '../styles/multi-llm-coordination.css';
import '../styles/next-level-design-system.css';
// Temporarily disabled - import {
//   globalMultiLLMOptimizer,
//   OptimizationStrategy,
//   PerformanceMetrics,
// } from '../utils/multi-llm-performance-optimizer';

interface PerformanceSummary {
  totalNodes: number;
  activeOptimizations: number;
  averageResponseTime: number;
  averageThroughput: number;
  averageErrorRate: number;
  optimizationStrategies: Array<{
    id: string;
    name: string;
    enabled: boolean;
  }>;
}

const MultiLLMPerformanceDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [performanceMetrics, setPerformanceMetrics] = useState<Map<string, PerformanceMetrics>>(
    new Map(),
  );
  const [optimizationStrategies, setOptimizationStrategies] = useState<
    Map<string, OptimizationStrategy>
  >(new Map());
  const [performanceSummary, setPerformanceSummary] = useState<PerformanceSummary | null>(null);

  useEffect(() => {
    updatePerformanceData();
    const interval = setInterval(updatePerformanceData, 5000);
    return () => clearInterval(interval);
  }, []);

  const updatePerformanceData = () => {
    const metrics = globalMultiLLMOptimizer.getPerformanceMetrics();
    const strategies = globalMultiLLMOptimizer.getOptimizationStrategies();
    const summary = globalMultiLLMOptimizer.getPerformanceSummary();

    setPerformanceMetrics(metrics);
    setOptimizationStrategies(strategies);
    setPerformanceSummary(summary);
  };

  const toggleStrategy = (strategyId: string) => {
    const strategy = optimizationStrategies.get(strategyId);
    if (strategy) {
      if (strategy.enabled) {
        globalMultiLLMOptimizer.disableStrategy(strategyId);
      } else {
        globalMultiLLMOptimizer.enableStrategy(strategyId);
      }
      updatePerformanceData();
    }
  };

  const getPerformanceColor = (
    value: number,
    type: 'responseTime' | 'errorRate' | 'cpuUsage' | 'memoryUsage',
  ): string => {
    switch (type) {
      case 'responseTime':
        return value < 200 ? '#10b981' : value < 500 ? '#f59e0b' : '#ef4444';
      case 'errorRate':
        return value < 0.02 ? '#10b981' : value < 0.05 ? '#f59e0b' : '#ef4444';
      case 'cpuUsage':
      case 'memoryUsage':
        return value < 0.6 ? '#10b981' : value < 0.8 ? '#f59e0b' : '#ef4444';
      default:
        return '#6b7280';
    }
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
        <h1>⚡ Multi-LLM Performance Dashboard</h1>
        <p className="subtitle">Optimizing Performance Across All Coordinated LLMs</p>
        <div className="mission-statement">
          <strong>Mission:</strong> Ensure maximum performance and efficiency across all LLM nodes
        </div>
      </div>

      <div className="status-overview">
        <div className="status-card">
          <h3>📊 Total Nodes</h3>
          <div className="status-value">{performanceSummary?.totalNodes || 0}</div>
          <p>Monitored nodes</p>
        </div>

        <div className="status-card">
          <h3>🔧 Active Optimizations</h3>
          <div className="status-value">{performanceSummary?.activeOptimizations || 0}</div>
          <p>Running strategies</p>
        </div>

        <div className="status-card">
          <h3>⚡ Avg Response Time</h3>
          <div
            className="status-value"
            /* TODO: Move to external CSS */ style={{
              color: getPerformanceColor(
                performanceSummary?.averageResponseTime || 0,
                'responseTime',
              ),
            }}
          >
            {Math.round(performanceSummary?.averageResponseTime || 0)}ms
          </div>
          <p>System responsiveness</p>
        </div>

        <div className="status-card">
          <h3>📈 Avg Throughput</h3>
          <div className="status-value">
            {Math.round(performanceSummary?.averageThroughput || 0)}
          </div>
          <p>Tasks per minute</p>
        </div>

        <div className="status-card">
          <h3>❌ Avg Error Rate</h3>
          <div
            className="status-value"
            /* TODO: Move to external CSS */ style={{
              color: getPerformanceColor(performanceSummary?.averageErrorRate || 0, 'errorRate'),
            }}
          >
            {((performanceSummary?.averageErrorRate || 0) * 100).toFixed(1)}%
          </div>
          <p>System reliability</p>
        </div>
      </div>

      <div className="optimization-strategies">
        <h2>🔧 Optimization Strategies</h2>
        <div className="strategies-grid">
          {Array.from(optimizationStrategies.values()).map((strategy) => (
            <div
              key={strategy.id}
              className={`strategy-card ${strategy.enabled ? 'enabled' : 'disabled'}`}
            >
              <div className="strategy-header">
                <h3>{strategy.name}</h3>
                <button
                  onClick={() => toggleStrategy(strategy.id)}
                  className={`strategy-toggle ${strategy.enabled ? 'enabled' : 'disabled'}`}
                >
                  {strategy.enabled ? '✅' : '❌'}
                </button>
              </div>
              <p className="strategy-description">{strategy.description}</p>
              <div className="strategy-targets">
                <strong>Target Nodes:</strong> {strategy.targetNodes.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="performance-metrics">
        <h2>📊 Node Performance Metrics</h2>
        <div className="metrics-grid">
          {Array.from(performanceMetrics.values()).map((metric) => (
            <div key={metric.nodeId} className="metric-card">
              <div className="metric-header">
                <h3>{metric.nodeId}</h3>
                <span className="metric-timestamp">
                  {new Date(metric.lastOptimized).toLocaleTimeString()}
                </span>
              </div>

              <div className="metric-details">
                <div className="metric-row">
                  <span className="metric-label">Response Time:</span>
                  <span
                    className="metric-value"
                    /* TODO: Move to external CSS */ style={{ color: getPerformanceColor(metric.responseTime, 'responseTime') }}
                  >
                    {metric.responseTime}ms
                  </span>
                </div>

                <div className="metric-row">
                  <span className="metric-label">Throughput:</span>
                  <span className="metric-value">{metric.throughput} tasks/min</span>
                </div>

                <div className="metric-row">
                  <span className="metric-label">Error Rate:</span>
                  <span
                    className="metric-value"
                    /* TODO: Move to external CSS */ style={{ color: getPerformanceColor(metric.errorRate, 'errorRate') }}
                  >
                    {(metric.errorRate * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="metric-row">
                  <span className="metric-label">CPU Usage:</span>
                  <span
                    className="metric-value"
                    /* TODO: Move to external CSS */ style={{ color: getPerformanceColor(metric.cpuUsage, 'cpuUsage') }}
                  >
                    {(metric.cpuUsage * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="metric-row">
                  <span className="metric-label">Memory Usage:</span>
                  <span
                    className="metric-value"
                    /* TODO: Move to external CSS */ style={{ color: getPerformanceColor(metric.memoryUsage, 'memoryUsage') }}
                  >
                    {(metric.memoryUsage * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="performance-bars">
                <div className="performance-bar">
                  <div className="bar-label">CPU</div>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${metric.cpuUsage * 100}%`,
                        backgroundColor: getPerformanceColor(metric.cpuUsage, 'cpuUsage'),
                      }}
                    ></div>
                  </div>
                </div>

                <div className="performance-bar">
                  <div className="bar-label">Memory</div>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${metric.memoryUsage * 100}%`,
                        backgroundColor: getPerformanceColor(metric.memoryUsage, 'memoryUsage'),
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="optimization-insights">
        <h2>💡 Optimization Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>🚀 Performance Trends</h3>
            <p>Monitor response times and throughput to identify optimization opportunities</p>
          </div>

          <div className="insight-card">
            <h3>🧠 Resource Management</h3>
            <p>Optimize CPU and memory usage across all LLM nodes for maximum efficiency</p>
          </div>

          <div className="insight-card">
            <h3>🌿 Cultural Safety</h3>
            <p>Ensure cultural validation processes are optimized for speed and accuracy</p>
          </div>

          <div className="insight-card">
            <h3>📚 Educational Excellence</h3>
            <p>Optimize educational content processing and delivery for 800,000 akonga</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiLLMPerformanceDashboard;
