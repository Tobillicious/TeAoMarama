import React, { useEffect, useState } from 'react';
import { chainOfAgentsCoordinator, type CoATrajectory } from '../utils/chain-of-agents-coordinator';

interface CoAStats {
  totalAgents: number;
  activeAgents: number;
  totalTrajectories: number;
  successRate: number;
  avgPerformance: number;
  culturalCompliance: number;
  trainingDataSize: number;
}

interface AgentMetric {
  id: string;
  name: string;
  role: string;
  performance: number;
  lastActivation: Date;
  isActive: boolean;
}

const ChainOfAgentsDashboard: React.FC = () => {
  const [stats, setStats] = useState<CoAStats | null>(null);
  const [agentMetrics, setAgentMetrics] = useState<AgentMetric[]>([]);
  const [recentTrajectories, setRecentTrajectories] = useState<CoATrajectory[]>([]);
  const [testTask, setTestTask] = useState<string>('');
  const [testResult, setTestResult] = useState<string>('');
  const [isRunningTest, setIsRunningTest] = useState<boolean>(false);
  const [afmCapabilities, setAfmCapabilities] = useState<string[]>([]);
  const [isActivatingAFM, setIsActivatingAFM] = useState<boolean>(false);

  useEffect(() => {
    loadCoAStatus();
    const interval = setInterval(loadCoAStatus, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadCoAStatus = () => {
    const coaStats = chainOfAgentsCoordinator.getCoAStats();
    const metrics = chainOfAgentsCoordinator.getAgentMetrics();
    const trajectories = chainOfAgentsCoordinator.getRecentTrajectories(5);

    setStats(coaStats);
    setAgentMetrics(metrics);
    setRecentTrajectories(trajectories);
  };

  const runCoATest = async () => {
    if (!testTask.trim()) return;

    setIsRunningTest(true);
    setTestResult('🔗 Executing Chain-of-Agents test...');

    try {
      const result = await chainOfAgentsCoordinator.executeChainOfAgents(testTask);

      if (result.success) {
        setTestResult(
          `✅ Chain-of-Agents Test PASSED!\n\nPerformance: ${Math.round(
            result.trajectory.performance * 100,
          )}%\nCultural Compliance: ${Math.round(
            result.trajectory.culturalCompliance * 100,
          )}%\nAgents Used: ${result.trajectory.agents.length}\nSteps: ${
            result.trajectory.steps.length
          }\n\nResult: ${result.result}`,
        );
      } else {
        setTestResult(`❌ Chain-of-Agents Test FAILED!\n\nError: ${result.result}`);
      }
    } catch (error) {
      setTestResult(`❌ Test Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunningTest(false);
      loadCoAStatus();
    }
  };

  const activateAFM = async () => {
    setIsActivatingAFM(true);

    try {
      const result = await chainOfAgentsCoordinator.activateAFMCapabilities();
      setAfmCapabilities(result.capabilities);
    } catch (error) {
      console.error('AFM activation failed:', error);
    } finally {
      setIsActivatingAFM(false);
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return 'text-green-400';
    if (performance >= 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 0.9) return 'text-green-400';
    if (rate >= 0.7) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">🔗 Initializing Chain-of-Agents Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            🔗 Chain-of-Agents Dashboard
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Revolutionary Agent Foundation Model (AFM) Implementation
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-400">
            <span>
              🤖 Agents: {stats.activeAgents}/{stats.totalAgents}
            </span>
            <span>📊 Trajectories: {stats.totalTrajectories}</span>
            <span>🎯 Success Rate: {Math.round(stats.successRate * 100)}%</span>
            <span>📚 Training Data: {stats.trainingDataSize}</span>
          </div>
        </div>

        {/* Chain-of-Agents Overview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">📊 Chain-of-Agents Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🤖</div>
              <div className="text-2xl font-bold text-blue-400">{stats.totalAgents}</div>
              <div className="text-xs text-gray-400">Total Agents</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-2xl font-bold text-green-400">{stats.activeAgents}</div>
              <div className="text-xs text-gray-400">Active Agents</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className={`text-2xl font-bold ${getSuccessRateColor(stats.successRate)}`}>
                {Math.round(stats.successRate * 100)}%
              </div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📈</div>
              <div
                className={`text-2xl font-bold ${getPerformanceColor(stats.avgPerformance * 100)}`}
              >
                {Math.round(stats.avgPerformance * 100)}%
              </div>
              <div className="text-xs text-gray-400">Avg Performance</div>
            </div>
          </div>
        </div>

        {/* AFM Capabilities */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-purple-400">🚀 Agent Foundation Model (AFM)</h2>
            <button
              onClick={activateAFM}
              disabled={isActivatingAFM}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isActivatingAFM ? '🚀 Activating...' : '🚀 Activate AFM'}
            </button>
          </div>
          {afmCapabilities.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {afmCapabilities.map((capability, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-3 text-sm">
                  ✅ {capability}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chain-of-Agents Test */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-400">🧪 Chain-of-Agents Test</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={testTask}
              onChange={(e) => setTestTask(e.target.value)}
              placeholder="Enter a task for Chain-of-Agents reasoning (e.g., 'Create a culturally appropriate lesson plan for Year 5 mathematics')"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={runCoATest}
              disabled={isRunningTest || !testTask.trim()}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunningTest ? '🔗 Running Chain-of-Agents...' : '🔗 Execute Chain-of-Agents'}
            </button>
            {testResult && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg text-sm">
                <h3 className="font-bold text-white mb-2">Test Result:</h3>
                <pre className="whitespace-pre-wrap text-gray-300">{testResult}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Agent Performance Metrics */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-400">🤖 Agent Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentMetrics.map((agent) => (
              <div
                key={agent.id}
                className={`bg-white/5 rounded-xl p-4 border ${
                  agent.isActive ? 'border-green-500/30' : 'border-gray-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-green-400">{agent.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      agent.isActive
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {agent.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-400">
                  <div>
                    <strong>Role:</strong> {agent.role}
                  </div>
                  <div>
                    <strong>Performance:</strong>{' '}
                    <span className={getPerformanceColor(agent.performance)}>
                      {Math.round(agent.performance)}%
                    </span>
                  </div>
                  <div>
                    <strong>Last Active:</strong> {agent.lastActivation.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Trajectories */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">📊 Recent Trajectories</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentTrajectories.map((trajectory) => (
              <div
                key={trajectory.id}
                className={`bg-white/5 rounded-lg p-4 border ${
                  trajectory.success ? 'border-green-500/30' : 'border-red-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-cyan-400">
                    {trajectory.task.substring(0, 60)}...
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      trajectory.success
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {trajectory.success ? 'SUCCESS' : 'FAILED'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs text-gray-400">
                  <div>Performance: {Math.round(trajectory.performance * 100)}%</div>
                  <div>Cultural: {Math.round(trajectory.culturalCompliance * 100)}%</div>
                  <div>Agents: {trajectory.agents.length}</div>
                  <div>Steps: {trajectory.steps.length}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {trajectory.timestamp.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">🔗 Chain-of-Agents Dashboard - Revolutionary AFM Implementation</p>
          <p className="text-sm">
            Based on research: "Chain-of-Agents: End-to-End Agent Foundation Models via Multi-Agent
            Distillation and Agentic RL"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChainOfAgentsDashboard;
