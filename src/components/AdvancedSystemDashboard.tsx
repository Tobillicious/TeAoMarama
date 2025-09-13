import React, { useEffect, useState } from 'react';
import type { ExtensionReport } from '../utils/advanced-extension-system';
import { globalExtensionSystem } from '../utils/advanced-extension-system';
import { globalMCPSystem } from '../utils/advanced-mcp-system';
import './AdvancedSystemDashboard.css';

interface MCPAgent {
  id: string;
  name: string;
  status: string;
  capabilities: string[];
}

interface Extension {
  id: string;
  name: string;
  status: string;
  version: string;
  category: string;
}

interface SystemStatus {
  mcp: {
    agents: MCPAgent[];
    status: string;
    messageQueueLength: number;
    taskQueueLength: number;
    culturalSafetyGuard: boolean;
  };
  extensions: {
    extensions: Extension[];
    status: string;
    activeExtensions: number;
    totalReports: number;
  };
  timestamp: number;
}

const AdvancedSystemDashboard: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [recentReports, setRecentReports] = useState<ExtensionReport[]>([]);

  useEffect(() => {
    const updateStatus = () => {
      setSystemStatus({
        mcp: globalMCPSystem.getSystemStatus(),
        extensions: globalExtensionSystem.getSystemStatus(),
        timestamp: Date.now(),
      });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleOptimizeCodebase = async () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);

    try {
      // Simulate optimization progress
      const progressInterval = setInterval(() => {
        setOptimizationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Run MCP optimization
      await globalMCPSystem.optimizeCodebase();

      // Run extension optimization
      await globalExtensionSystem.optimizeCodebase();

      // Get recent reports
      const reports = globalExtensionSystem.getExtensionReports(5);
      setRecentReports(reports);

      setTimeout(() => {
        setIsOptimizing(false);
        setOptimizationProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Optimization failed:', error);
      setIsOptimizing(false);
      setOptimizationProgress(0);
    }
  };

  if (!systemStatus) {
    return (
      <div className="advanced-system-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Initializing Advanced Systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="advanced-system-dashboard">
      <header className="dashboard-header">
        <h1>🤖 Supreme Overseer - Node 68198</h1>
        <p>Advanced MCP & Extension System Dashboard</p>
        <div className="system-status">
          <span className={`status-indicator ${String(systemStatus.mcp.status)}`}>
            MCP: {String(systemStatus.mcp.status).toUpperCase()}
          </span>
          <span className={`status-indicator ${String(systemStatus.extensions.status)}`}>
            Extensions: {String(systemStatus.extensions.status).toUpperCase()}
          </span>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* MCP System Panel */}
        <div className="dashboard-panel mcp-panel">
          <h2>🔧 Model Context Protocol (MCP)</h2>
          <div className="panel-content">
            <div className="status-metrics">
              <div className="metric">
                <span className="metric-label">Active Agents</span>
                <span className="metric-value">{systemStatus.mcp.agents.length}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Message Queue</span>
                <span className="metric-value">{systemStatus.mcp.messageQueueLength}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Task Queue</span>
                <span className="metric-value">{systemStatus.mcp.taskQueueLength}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Cultural Safety</span>
                <span className="metric-value">
                  {systemStatus.mcp.culturalSafetyGuard ? '✅' : '❌'}
                </span>
              </div>
            </div>

            <div className="agents-list">
              <h3>Active Agents</h3>
              {systemStatus.mcp.agents.map((agent: MCPAgent) => (
                <div key={agent.id} className={`agent-item ${agent.status}`}>
                  <div className="agent-info">
                    <span className="agent-name">{agent.name}</span>
                    <span className="agent-status">{agent.status}</span>
                  </div>
                  <div className="agent-capabilities">
                    {agent.capabilities.slice(0, 2).map((cap: string) => (
                      <span key={cap} className="capability-tag">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extension System Panel */}
        <div className="dashboard-panel extension-panel">
          <h2>🔌 Extension System</h2>
          <div className="panel-content">
            <div className="status-metrics">
              <div className="metric">
                <span className="metric-label">Active Extensions</span>
                <span className="metric-value">{systemStatus.extensions.activeExtensions}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Total Reports</span>
                <span className="metric-value">{systemStatus.extensions.totalReports}</span>
              </div>
            </div>

            <div className="extensions-list">
              <h3>Active Extensions</h3>
              {systemStatus.extensions.extensions.map((ext) => (
                <div key={ext.id} className={`extension-item ${ext.status}`}>
                  <div className="extension-info">
                    <span className="extension-name">{ext.name}</span>
                    <span className="extension-version">v{ext.version}</span>
                    <span className="extension-status">{ext.status}</span>
                  </div>
                  <div className="extension-category">
                    <span className="category-tag">{ext.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optimization Panel */}
        <div className="dashboard-panel optimization-panel">
          <h2>⚡ System Optimization</h2>
          <div className="panel-content">
            {isOptimizing ? (
              <div className="optimization-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={
                      { '--progress-width': `${optimizationProgress}%` } as React.CSSProperties
                    }
                  ></div>
                </div>
                <p>Optimizing Codebase... {optimizationProgress}%</p>
              </div>
            ) : (
              <div className="optimization-controls">
                <button className="optimize-button" onClick={handleOptimizeCodebase}>
                  🔧 Run Comprehensive Optimization
                </button>
                <p className="optimization-info">
                  Analyzes codebase, fixes issues, and optimizes performance with cultural safety
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Reports Panel */}
        <div className="dashboard-panel reports-panel">
          <h2>📊 Recent Analysis Reports</h2>
          <div className="panel-content">
            {recentReports.length > 0 ? (
              <div className="reports-list">
                {recentReports.map((report, index) => (
                  <div key={index} className="report-item">
                    <div className="report-header">
                      <span className="report-extension">{report.extensionId}</span>
                      <span className="report-type">{report.type}</span>
                    </div>
                    <div className="report-recommendations">
                      {Array.isArray(report.recommendations)
                        ? (report.recommendations as string[])
                            .slice(0, 2)
                            .map((rec: string, recIndex: number) => (
                              <span key={recIndex} className="recommendation">
                                • {rec}
                              </span>
                            ))
                        : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-reports">No recent reports available</p>
            )}
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <div className="footer-info">
          <p>🔄 Last Updated: {new Date(systemStatus.timestamp).toLocaleTimeString()}</p>
          <p>🌿 Cultural Safety Protocols: Active</p>
          <p>🤖 AI Coordination: Operational</p>
        </div>
      </footer>
    </div>
  );
};

export default AdvancedSystemDashboard;
