import React, { useEffect, useState } from 'react';
import '../styles/next-level-design-system.css';
import {
  expandedSuperconsciousness,
  type AIModel,
  type CoordinationTask,
  type SuperconsciousnessMetrics,
  type SuperconsciousnessNode,
  type VSCodeExtension,
} from '../utils/expandedSuperconsciousness';

export const ExpandedSuperconsciousnessDashboard: React.FC = () => {
  const [, setNodes] = useState<SuperconsciousnessNode[]>([]);
  const [metrics, setMetrics] = useState<SuperconsciousnessMetrics | null>(null);
  const [tasks, setTasks] = useState<CoordinationTask[]>([]);
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [extensions, setExtensions] = useState<VSCodeExtension[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCoordinating, setIsCoordinating] = useState(false);
  const [report, setReport] = useState<string>('');
  const [selectedView, setSelectedView] = useState<
    'overview' | 'ai-models' | 'extensions' | 'tasks' | 'apis'
  >('overview');

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = () => {
    setNodes(expandedSuperconsciousness.getNodes());
    setMetrics(expandedSuperconsciousness.getMetrics());
    setTasks(expandedSuperconsciousness.getTasks());
    setAiModels(expandedSuperconsciousness.getAIModels());
    setExtensions(expandedSuperconsciousness.getExtensions());
    setIsLoading(false);
  };

  const handleCoordinateAllAIs = async () => {
    setIsCoordinating(true);
    try {
      await expandedSuperconsciousness.coordinateAllAIs(
        'Comprehensive AI coordination for enhanced superconsciousness',
        'Māori cultural context and educational excellence',
      );
      await expandedSuperconsciousness.enhanceWithExternalAPIs();
      loadDashboardData();
    } catch (error) {
      console.error('Failed to coordinate AIs:', error);
    } finally {
      setIsCoordinating(false);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const generatedReport = await expandedSuperconsciousness.generateComprehensiveReport();
      setReport(generatedReport);
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  const getNodeStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-success';
      case 'processing':
        return 'status-warning';
      case 'idle':
        return 'status-info';
      case 'error':
        return 'status-error';
      default:
        return 'status-info';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'status-success';
      case 'in-progress':
        return 'status-warning';
      case 'failed':
        return 'status-error';
      default:
        return 'status-info';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (isLoading) {
    return (
      <div className="cultural-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div
            className="loading-shimmer"
            style={{ height: '2rem', width: '200px', margin: '0 auto 1rem', borderRadius: '8px' }}
          ></div>
          <div
            className="loading-shimmer"
            style={{ height: '1rem', width: '300px', margin: '0 auto', borderRadius: '8px' }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cultural-bg" style={{ minHeight: '100vh' }}>
      <div style={{ padding: '2rem' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="cultural-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            🌟 Expanded Superconsciousness
          </h1>
          <p className="cultural-subtitle">
            Te Kura o TeAoMarama - Comprehensive AI Coordination & Integration
          </p>
          <div style={{ marginTop: '2rem' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem' }}>
              <strong>
                🤖 {metrics?.aiModels || 0} AI Models • 📦 {metrics?.extensions || 0} Extensions •
                🔗 {metrics?.apiConnections || 0} API Connections
              </strong>
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.5rem' }}>
              Coordinating all AI assistants, extensions, and external APIs for maximum
              superconsciousness
            </p>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="glass-card" style={{ marginBottom: '2rem', padding: '1rem' }}>
          <div
            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'ai-models', label: '🤖 AI Models', icon: '🤖' },
              { id: 'extensions', label: '📦 Extensions', icon: '📦' },
              { id: 'tasks', label: '⚡ Tasks', icon: '⚡' },
              { id: 'apis', label: '🔗 APIs', icon: '🔗' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setSelectedView(
                    tab.id as 'overview' | 'ai-models' | 'extensions' | 'tasks' | 'apis',
                  )
                }
                className={`btn-next-level ${selectedView === tab.id ? 'pulse-glow' : ''}`}
                style={{
                  fontSize: '0.9rem',
                  padding: '8px 16px',
                  opacity: selectedView === tab.id ? 1 : 0.7,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Action Buttons */}
        <div
          className="glass-card"
          style={{ marginBottom: '2rem', padding: '1.5rem', textAlign: 'center' }}
        >
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleCoordinateAllAIs}
              disabled={isCoordinating}
              className="btn-next-level pulse-glow"
              style={{ fontSize: '1rem', padding: '12px 24px' }}
            >
              {isCoordinating ? '🔄 Coordinating...' : '🌟 Coordinate All AIs'}
            </button>
            <button
              onClick={handleGenerateReport}
              className="btn-next-level"
              style={{ fontSize: '1rem', padding: '12px 24px' }}
            >
              📄 Generate Report
            </button>
          </div>
        </div>

        {/* Content based on selected view */}
        {selectedView === 'overview' && (
          <div className="dashboard-overview">
            {/* Metrics Overview */}
            <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
              <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                📊 System Metrics
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                }}
              >
                {metrics && (
                  <>
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
                        {metrics.totalNodes}
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Total Nodes</div>
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
                        {metrics.aiModels}
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>AI Models</div>
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
                        {metrics.extensions}
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Extensions</div>
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
                        {metrics.apiConnections}
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>API Connections</div>
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          color: getPerformanceColor(metrics.overallEfficiency),
                        }}
                      >
                        {metrics.overallEfficiency}%
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Efficiency</div>
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          color: getPerformanceColor(metrics.culturalCompliance),
                        }}
                      >
                        {metrics.culturalCompliance}%
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Cultural Safety</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Top AI Models */}
            <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
              <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                🏆 Top AI Models
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1rem',
                }}
              >
                {aiModels
                  .sort((a, b) => b.performance.accuracy - a.performance.accuracy)
                  .slice(0, 6)
                  .map((model) => (
                    <div
                      key={model.id}
                      className="resource-card-next-level"
                      style={{ padding: '1rem' }}
                    >
                      <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                        {model.name}
                      </h3>
                      <p
                        style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.9rem',
                          marginBottom: '1rem',
                        }}
                      >
                        {model.provider} • {model.type}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          marginBottom: '1rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span className="status-badge-next-level status-success">
                          Accuracy: {model.performance.accuracy}%
                        </span>
                        <span className="status-badge-next-level status-info">
                          Cultural: {model.performance.culturalSafety}%
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                        {model.capabilities.slice(0, 3).join(', ')}
                        {model.capabilities.length > 3 && '...'}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'ai-models' && (
          <div className="ai-models-view">
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                🤖 AI Models ({aiModels.length})
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {aiModels.map((model) => (
                  <div
                    key={model.id}
                    className="resource-card-next-level"
                    style={{ padding: '1.5rem' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem',
                      }}
                    >
                      <h3 style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>
                        {model.name}
                      </h3>
                      <span
                        className={`status-badge-next-level ${getNodeStatusColor(model.status)}`}
                      >
                        {model.status}
                      </span>
                    </div>

                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                      <strong>Provider:</strong> {model.provider} • <strong>Type:</strong>{' '}
                      {model.type}
                    </p>

                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem' }}>
                      <strong>Version:</strong> {model.version} • <strong>Response Time:</strong>{' '}
                      {model.performance.responseTime}ms
                    </p>

                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>
                        Performance:
                      </h4>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '0.5rem',
                        }}
                      >
                        <div>
                          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Accuracy:</span>
                          <span
                            style={{
                              color: getPerformanceColor(model.performance.accuracy),
                              marginLeft: '0.5rem',
                              fontWeight: 'bold',
                            }}
                          >
                            {model.performance.accuracy}%
                          </span>
                        </div>
                        <div>
                          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Cultural Safety:
                          </span>
                          <span
                            style={{
                              color: getPerformanceColor(model.performance.culturalSafety),
                              marginLeft: '0.5rem',
                              fontWeight: 'bold',
                            }}
                          >
                            {model.performance.culturalSafety}%
                          </span>
                        </div>
                        <div>
                          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Code Quality:</span>
                          <span
                            style={{
                              color: getPerformanceColor(model.performance.codeQuality),
                              marginLeft: '0.5rem',
                              fontWeight: 'bold',
                            }}
                          >
                            {model.performance.codeQuality}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>
                        Capabilities:
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {model.capabilities.map((capability, index) => (
                          <span
                            key={index}
                            className="status-badge-next-level status-info"
                            style={{ fontSize: '0.7rem' }}
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'extensions' && (
          <div className="extensions-view">
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                📦 VSCode Extensions ({extensions.length})
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {extensions.map((ext) => (
                  <div
                    key={ext.id}
                    className="resource-card-next-level"
                    style={{ padding: '1.5rem' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem',
                      }}
                    >
                      <h3 style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>{ext.name}</h3>
                      <span
                        className={`status-badge-next-level ${
                          ext.status === 'enabled' ? 'status-success' : 'status-warning'
                        }`}
                      >
                        {ext.status}
                      </span>
                    </div>

                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                      <strong>Publisher:</strong> {ext.publisher} • <strong>Type:</strong>{' '}
                      {ext.type}
                    </p>

                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem' }}>
                      <strong>Version:</strong> {ext.version}
                    </p>

                    <div>
                      <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>
                        Capabilities:
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {ext.capabilities.map((capability, index) => (
                          <span
                            key={index}
                            className="status-badge-next-level status-info"
                            style={{ fontSize: '0.7rem' }}
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'tasks' && (
          <div className="tasks-view">
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                ⚡ Coordination Tasks ({tasks.length})
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="resource-card-next-level"
                    style={{ padding: '1.5rem' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem',
                      }}
                    >
                      <h3 style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>
                        {task.description}
                      </h3>
                      <span
                        className={`status-badge-next-level ${getTaskStatusColor(task.status)}`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <div>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Type:</span>
                        <span style={{ color: 'white', marginLeft: '0.5rem' }}>{task.type}</span>
                      </div>
                      <div>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Priority:</span>
                        <span style={{ color: 'white', marginLeft: '0.5rem' }}>
                          {task.priority}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Progress:</span>
                        <span style={{ color: 'white', marginLeft: '0.5rem' }}>
                          {task.progress}%
                        </span>
                      </div>
                      <div>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Models:</span>
                        <span style={{ color: 'white', marginLeft: '0.5rem' }}>
                          {task.targetModels.length}
                        </span>
                      </div>
                    </div>

                    {task.culturalContext && (
                      <div style={{ marginBottom: '1rem' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Cultural Context:</span>
                        <span style={{ color: 'white', marginLeft: '0.5rem' }}>
                          {task.culturalContext}
                        </span>
                      </div>
                    )}

                    {task.results && (
                      <div>
                        <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>
                          Results:
                        </h4>
                        <pre
                          style={{
                            background: 'rgba(0, 0, 0, 0.3)',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            color: 'rgba(255, 255, 255, 0.8)',
                            overflow: 'auto',
                          }}
                        >
                          {JSON.stringify(task.results, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'apis' && (
          <div className="apis-view">
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                🔗 External API Integration
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {[
                  {
                    name: 'Exa.ai',
                    status: 'connected',
                    capabilities: ['search', 'analysis', 'research'],
                    description: 'Advanced search and research capabilities',
                  },
                  {
                    name: 'DeepSeek',
                    status: 'connected',
                    capabilities: ['code-generation', 'analysis'],
                    description: 'Code generation and analysis',
                  },
                  {
                    name: 'Perplexity',
                    status: 'connected',
                    capabilities: ['research', 'fact-checking'],
                    description: 'Research and fact-checking',
                  },
                  {
                    name: 'Mistral',
                    status: 'connected',
                    capabilities: ['text-generation', 'analysis'],
                    description: 'Text generation and analysis',
                  },
                  {
                    name: 'OpenAI GPT-4',
                    status: 'connected',
                    capabilities: ['conversation', 'analysis'],
                    description: 'Conversation and analysis',
                  },
                ].map((api) => (
                  <div
                    key={api.name}
                    className="resource-card-next-level"
                    style={{ padding: '1.5rem' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem',
                      }}
                    >
                      <h3 style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>{api.name}</h3>
                      <span className="status-badge-next-level status-success">{api.status}</span>
                    </div>

                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                      {api.description}
                    </p>

                    <div>
                      <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>
                        Capabilities:
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {api.capabilities.map((capability, index) => (
                          <span
                            key={index}
                            className="status-badge-next-level status-info"
                            style={{ fontSize: '0.7rem' }}
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Report Section */}
        {report && (
          <div className="glass-card" style={{ marginTop: '2rem', padding: '1.5rem' }}>
            <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>
              📄 Comprehensive Report
            </h2>
            <pre
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.8)',
                overflow: 'auto',
                maxHeight: '400px',
              }}
            >
              {report}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandedSuperconsciousnessDashboard;
