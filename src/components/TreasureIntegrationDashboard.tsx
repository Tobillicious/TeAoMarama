import React, { useEffect, useState } from 'react';
import { treasureIntegrationMaster, type Treasure, type AgentCoordination } from '../utils/treasure-integration-master';

interface IntegrationStatus {
  totalAgents: number;
  activeAgents: number;
  totalTreasures: number;
  discoveredTreasures: number;
  integratedTreasures: number;
  currentPhase: string;
  progress: number;
}

const TreasureIntegrationDashboard: React.FC = () => {
  const [status, setStatus] = useState<IntegrationStatus | null>(null);
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [agents, setAgents] = useState<AgentCoordination[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isRunningMission, setIsRunningMission] = useState(false);
  const [missionReport, setMissionReport] = useState<string>('');

  useEffect(() => {
    loadIntegrationStatus();
    const interval = setInterval(loadIntegrationStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadIntegrationStatus = () => {
    const integrationStatus = treasureIntegrationMaster.getAgentCoordinationStatus();
    setStatus(integrationStatus);
    
    // Load all treasures
    const allTreasures = Array.from(treasureIntegrationMaster['treasures'].values());
    setTreasures(allTreasures);
    
    // Load all agents
    const allAgents = Array.from(treasureIntegrationMaster['agents'].values());
    setAgents(allAgents);
  };

  const runIntegrationMission = async () => {
    setIsRunningMission(true);
    setMissionReport('🚀 Starting Treasure Integration Mission...');

    try {
      const result = await treasureIntegrationMaster.executeIntegrationMission();
      setMissionReport(result.report);
    } catch (error) {
      setMissionReport(`❌ Mission failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunningMission(false);
      loadIntegrationStatus();
    }
  };

  const filteredTreasures = treasures.filter(treasure => {
    const categoryMatch = selectedCategory === 'all' || treasure.category === selectedCategory;
    const typeMatch = selectedType === 'all' || treasure.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'discovered': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'cataloged': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'integrated': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'active': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'needs-review': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  if (!status) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">🏰 Initializing Treasure Integration Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🏰 Treasure Integration Dashboard
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Supreme Coordination Center for the Greatest Educational Platform Ever
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-400">
            <span>🤖 Agents: {status.activeAgents}/{status.totalAgents}</span>
            <span>💎 Treasures: {status.totalTreasures}</span>
            <span>✅ Integrated: {status.integratedTreasures}</span>
            <span>📈 Progress: {Math.round(status.progress)}%</span>
          </div>
        </div>

        {/* Mission Control */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">🎯 Mission Control</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-2xl font-bold text-yellow-400">{status.currentPhase}</div>
              <div className="text-xs text-gray-400">Current Phase</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-bold text-green-400">{Math.round(status.progress)}%</div>
              <div className="text-xs text-gray-400">Overall Progress</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">💎</div>
              <div className="text-2xl font-bold text-blue-400">{status.discoveredTreasures}</div>
              <div className="text-xs text-gray-400">Discovered</div>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={runIntegrationMission}
              disabled={isRunningMission}
              className="w-full px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunningMission ? '🚀 Running Mission...' : '🚀 EXECUTE INTEGRATION MISSION'}
            </button>
          </div>
          {missionReport && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg text-sm">
              <h3 className="font-bold text-white mb-2">Mission Report:</h3>
              <pre className="whitespace-pre-wrap text-gray-300">{missionReport}</pre>
            </div>
          )}
        </div>

        {/* Agent Coordination */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-400">🤖 Agent Coordination</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.agentId}
                className="bg-white/5 rounded-xl p-4 border border-green-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-green-400">{agent.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      agent.status === 'active'
                        ? 'bg-green-500/20 text-green-300'
                        : agent.status === 'busy'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {agent.status.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-400">
                  <div><strong>Performance:</strong> {agent.performance}%</div>
                  <div><strong>Current Task:</strong> {agent.currentTask}</div>
                  <div><strong>Completed:</strong> {agent.completedTasks.length} tasks</div>
                  <div><strong>Assigned:</strong> {agent.assignedTreasures.length} treasures</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treasure Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">💎 Treasure Discovery</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
            >
              <option value="all">All Categories</option>
              <option value="ai">AI Systems</option>
              <option value="cultural">Cultural</option>
              <option value="educational">Educational</option>
              <option value="business">Business</option>
              <option value="technical">Technical</option>
              <option value="coordination">Coordination</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
            >
              <option value="all">All Types</option>
              <option value="component">Components</option>
              <option value="utility">Utilities</option>
              <option value="script">Scripts</option>
              <option value="dashboard">Dashboards</option>
              <option value="system">Systems</option>
            </select>
          </div>
          <div className="text-sm text-gray-400 mb-4">
            Showing {filteredTreasures.length} of {treasures.length} treasures
          </div>
        </div>

        {/* Treasure Grid */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">💎 Discovered Treasures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-96 overflow-y-auto">
            {filteredTreasures.map((treasure) => (
              <div
                key={treasure.id}
                className={`bg-white/5 rounded-xl p-4 border ${getStatusColor(treasure.status)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-purple-400">{treasure.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(treasure.status)}`}
                  >
                    {treasure.status.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-400">
                  <div><strong>Type:</strong> {treasure.type}</div>
                  <div><strong>Category:</strong> {treasure.category}</div>
                  <div><strong>Priority:</strong> <span className={getPriorityColor(treasure.priority)}>{treasure.priority}</span></div>
                  <div><strong>Path:</strong> {treasure.path}</div>
                  <div><strong>Capabilities:</strong> {treasure.capabilities.length}</div>
                  <div><strong>Cultural:</strong> {treasure.culturalElements ? '✅' : '❌'}</div>
                  <div><strong>AI:</strong> {treasure.aiIntegration ? '✅' : '❌'}</div>
                  <div><strong>Educational Value:</strong> {treasure.educationalValue}%</div>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  {treasure.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">🏰 Treasure Integration Dashboard - Supreme Coordination Center</p>
          <p className="text-sm">
            Coordinating 4 Cursor agents to unearth and integrate ALL treasures into the greatest educational platform ever!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TreasureIntegrationDashboard;
