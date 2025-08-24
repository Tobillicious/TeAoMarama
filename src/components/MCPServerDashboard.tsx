import React, { useEffect, useState } from 'react';
import type { MCPResource, MCPServerConfig, MCPTool } from '../utils/mcp-server';
import { globalMCPServer } from '../utils/mcp-server';
import './MCPServerDashboard.css';

interface MCPServerStatus {
  running: boolean;
  config: MCPServerConfig;
  tools: string[];
  resources: string[];
  server: Record<string, unknown> | null;
}

const MCPServerDashboard: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<MCPServerStatus | null>(null);
  const [tools, setTools] = useState<MCPTool[]>([]);
  const [resources, setMCPResources] = useState<MCPResource[]>([]);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>('');
  const [toolParams, setToolParams] = useState<string>('{}');
  const [toolResult, setToolResult] = useState<Record<string, unknown> | null>(null);
  const [isExecutingTool, setIsExecutingTool] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      const status = globalMCPServer.getStatus();
      setServerStatus(status);
      setTools(globalMCPServer.getTools());
      setMCPResources(globalMCPServer.getResources());
    };

    updateStatus();
    const interval = setInterval(updateStatus, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleStartServer = async () => {
    setIsStarting(true);
    try {
      await globalMCPServer.start();
      console.log('✅ MCP Server started successfully');
    } catch (error) {
      console.error('❌ Failed to start MCP Server:', error);
    } finally {
      setIsStarting(false);
    }
  };

  const handleStopServer = async () => {
    setIsStopping(true);
    try {
      await globalMCPServer.stop();
      console.log('✅ MCP Server stopped successfully');
    } catch (error) {
      console.error('❌ Failed to stop MCP Server:', error);
    } finally {
      setIsStopping(false);
    }
  };

  const handleExecuteTool = async () => {
    if (!selectedTool) return;

    setIsExecutingTool(true);
    try {
      const result = await globalMCPServer.callTool(selectedTool);
      setToolResult(result);
      console.log(`✅ Tool '${selectedTool}' executed successfully`);
    } catch (error) {
      console.error(`❌ Failed to execute tool '${selectedTool}':`, error);
      setToolResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsExecutingTool(false);
    }
  };

  if (!serverStatus) {
    return (
      <div className="mcp-server-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Initializing MCP Server Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mcp-server-dashboard">
      <header className="dashboard-header">
        <h1>🤖 MCP Server Dashboard</h1>
        <p>Model Context Protocol Server - Node 68198</p>
        <div className="server-status">
          <span className={`status-indicator ${serverStatus.running ? 'running' : 'stopped'}`}>
            {serverStatus.running ? '🟢 RUNNING' : '🔴 STOPPED'}
          </span>
          <span className="server-info">
            {serverStatus.config.protocol}://{serverStatus.config.host}:{serverStatus.config.port}
          </span>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Server Control Panel */}
        <div className="dashboard-panel server-control-panel">
          <h2>🚀 Server Control</h2>
          <div className="panel-content">
            <div className="control-buttons">
              {!serverStatus.running ? (
                <button className="start-button" onClick={handleStartServer} disabled={isStarting}>
                  {isStarting ? '🚀 Starting...' : '🚀 Start MCP Server'}
                </button>
              ) : (
                <button className="stop-button" onClick={handleStopServer} disabled={isStopping}>
                  {isStopping ? '🛑 Stopping...' : '🛑 Stop MCP Server'}
                </button>
              )}
            </div>

            <div className="server-config">
              <h3>Configuration</h3>
              <div className="config-item">
                <span className="config-label">Protocol:</span>
                <span className="config-value">{serverStatus.config.protocol}</span>
              </div>
              <div className="config-item">
                <span className="config-label">Host:</span>
                <span className="config-value">{serverStatus.config.host}</span>
              </div>
              <div className="config-item">
                <span className="config-label">Port:</span>
                <span className="config-value">{serverStatus.config.port}</span>
              </div>
              <div className="config-item">
                <span className="config-label">Cultural Safety:</span>
                <span className="config-value">
                  {serverStatus.config.culturalSafety ? '✅ Enabled' : '❌ Disabled'}
                </span>
              </div>
              <div className="config-item">
                <span className="config-label">Extensions:</span>
                <span className="config-value">
                  {serverStatus.config.enableExtensions ? '✅ Enabled' : '❌ Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Panel */}
        <div className="dashboard-panel tools-panel">
          <h2>🔧 MCP Tools</h2>
          <div className="panel-content">
            <div className="tools-list">
              {tools.map((tool) => (
                <div key={tool.name} className="tool-item">
                  <div className="tool-header">
                    <span className="tool-name">{tool.name}</span>
                    {tool.culturalContext && <span className="cultural-badge">🌿 Cultural</span>}
                  </div>
                  <div className="tool-description">{tool.description}</div>
                  <div className="tool-schemas">
                    <div className="schema-section">
                      <span className="schema-label">Input:</span>
                      <pre className="schema-code">{JSON.stringify(tool.inputSchema, null, 2)}</pre>
                    </div>
                    <div className="schema-section">
                      <span className="schema-label">Output:</span>
                      <pre className="schema-code">
                        {JSON.stringify(tool.outputSchema, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tool Execution Panel */}
        <div className="dashboard-panel tool-execution-panel">
          <h2>⚡ Tool Execution</h2>
          <div className="panel-content">
            <div className="tool-selector">
              <label htmlFor="tool-select">Select Tool:</label>
              <select
                id="tool-select"
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                disabled={!serverStatus.running}
              >
                <option value="">Choose a tool...</option>
                {tools.map((tool) => (
                  <option key={tool.name} value={tool.name}>
                    {tool.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedTool && (
              <>
                <div className="tool-params">
                  <label htmlFor="tool-params">Parameters (JSON):</label>
                  <textarea
                    id="tool-params"
                    value={toolParams}
                    onChange={(e) => setToolParams(e.target.value)}
                    placeholder='{"param1": "value1", "param2": "value2"}'
                    rows={4}
                    disabled={!serverStatus.running}
                  />
                </div>

                <button
                  className="execute-button"
                  onClick={handleExecuteTool}
                  disabled={!serverStatus.running || isExecutingTool}
                >
                  {isExecutingTool ? '⚡ Executing...' : '⚡ Execute Tool'}
                </button>

                {toolResult && (
                  <div className="tool-result">
                    <h3>Result:</h3>
                    <pre className="result-code">{JSON.stringify(toolResult, null, 2)}</pre>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Resources Panel */}
        <div className="dashboard-panel resources-panel">
          <h2>📚 MCP Resources</h2>
          <div className="panel-content">
            <div className="resources-list">
              {resources.map((resource) => (
                <div key={resource.uri} className="resource-item">
                  <div className="resource-header">
                    <span className="resource-name">{resource.name}</span>
                    {resource.culturalContext && (
                      <span className="cultural-badge">🌿 Cultural</span>
                    )}
                  </div>
                  <div className="resource-uri">{resource.uri}</div>
                  <div className="resource-description">{resource.description}</div>
                  <div className="resource-mime">MIME: {resource.mimeType}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Server Status Panel */}
        <div className="dashboard-panel status-panel">
          <h2>📊 Server Status</h2>
          <div className="panel-content">
            <div className="status-metrics">
              <div className="metric">
                <span className="metric-label">Status</span>
                <span className={`metric-value ${serverStatus.running ? 'running' : 'stopped'}`}>
                  {serverStatus.running ? '🟢 Running' : '🔴 Stopped'}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Tools Available</span>
                <span className="metric-value">{tools.length}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Resources Available</span>
                <span className="metric-value">{resources.length}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Cultural Safety</span>
                <span className="metric-value">
                  {serverStatus.config.culturalSafety ? '✅ Active' : '❌ Inactive'}
                </span>
              </div>
            </div>

            {serverStatus.server && (
              <div className="server-details">
                <h3>Server Details</h3>
                <pre className="server-info-code">
                  {JSON.stringify(serverStatus.server, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <div className="footer-info">
          <p>🔄 Last Updated: {new Date().toLocaleTimeString()}</p>
          <p>
            🌿 Cultural Safety Protocols:{' '}
            {serverStatus.config.culturalSafety ? 'Active' : 'Inactive'}
          </p>
          <p>🔧 Extensions: {serverStatus.config.enableExtensions ? 'Enabled' : 'Disabled'}</p>
          <p>🤖 MCP Server: {serverStatus.running ? 'Operational' : 'Stopped'}</p>
        </div>
      </footer>
    </div>
  );
};

export default MCPServerDashboard;
