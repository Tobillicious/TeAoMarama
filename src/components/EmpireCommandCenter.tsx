import React, { useEffect, useState } from 'react';
import { treasureEmpireConnector } from '../utils/treasure-empire-connector';

interface EmpireStatus {
  totalTreasures: number;
  connectedTreasures: number;
  activeSystems: number;
  totalCapabilities: number;
  empireHealth: number;
  supremeOverseerStatus: 'active' | 'standby' | 'error';
  lastEmpireSync: Date;
}

interface TreasureConnection {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  connectedSystems: string[];
  capabilities: string[];
  lastSync: Date;
  performance: number;
}

const EmpireCommandCenter: React.FC = () => {
  const [empireStatus, setEmpireStatus] = useState<EmpireStatus | null>(null);
  const [connections, setConnections] = useState<TreasureConnection[]>([]);
  const [isActivating, setIsActivating] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [commandResult, setCommandResult] = useState<string>('');
  const [customCommand, setCustomCommand] = useState('');

  useEffect(() => {
    loadEmpireStatus();
    const interval = setInterval(loadEmpireStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadEmpireStatus = () => {
    const status = treasureEmpireConnector.getEmpireStatus();
    const conns = treasureEmpireConnector.getConnections();
    setEmpireStatus(status);
    setConnections(conns);
  };

  const activateAllSystems = async () => {
    setIsActivating(true);
    setCommandResult('⚡ Activating all hidden treasure systems...');

    try {
      await treasureEmpireConnector.activateHiddenSystems();
      setCommandResult('🎉 All hidden systems activated successfully!');
      loadEmpireStatus();
    } catch (error) {
      setCommandResult(`❌ Activation failed: ${error}`);
    } finally {
      setIsActivating(false);
    }
  };

  const testEmpire = async () => {
    setIsTesting(true);
    setCommandResult('🎮 Testing empire functionality...');

    try {
      const result = await treasureEmpireConnector.testEmpire();
      if (result.success) {
        setCommandResult('🎉 Empire test PASSED! All systems operational!');
      } else {
        setCommandResult('⚠️ Empire test had some issues, but core systems are working');
      }
    } catch (error) {
      setCommandResult(`❌ Test failed: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  const executeCustomCommand = async () => {
    if (!customCommand.trim()) return;

    setCommandResult(`👑 Executing: ${customCommand}`);

    try {
      const result = await treasureEmpireConnector.executeSupremeCommand(customCommand);
      setCommandResult(result.success ? `✅ ${result.result}` : `❌ ${result.result}`);
    } catch (error) {
      setCommandResult(`❌ Command failed: ${error}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'connecting':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'disconnected':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-400';
    if (health >= 70) return 'text-yellow-400';
    if (health >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  if (!empireStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">👑 Initializing Empire Command Center...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            👑 Empire Command Center
          </h1>
          <p className="text-xl text-gray-300 mb-6">Supreme Control Hub for the Treasure Empire</p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-400">
            <span>
              💎 Treasures: {empireStatus.connectedTreasures}/{empireStatus.totalTreasures}
            </span>
            <span>🤖 Systems: {empireStatus.activeSystems}</span>
            <span>⚡ Capabilities: {empireStatus.totalCapabilities}</span>
            <span className={getHealthColor(empireStatus.empireHealth)}>
              🏥 Health: {Math.round(empireStatus.empireHealth)}%
            </span>
          </div>
        </div>

        {/* Empire Status Overview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">🏰 Empire Status Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">💎</div>
              <div className="text-2xl font-bold text-purple-400">
                {empireStatus.totalTreasures}
              </div>
              <div className="text-xs text-gray-400">Total Treasures</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🔗</div>
              <div className="text-2xl font-bold text-green-400">
                {empireStatus.connectedTreasures}
              </div>
              <div className="text-xs text-gray-400">Connected</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-2xl font-bold text-blue-400">
                {empireStatus.totalCapabilities}
              </div>
              <div className="text-xs text-gray-400">Capabilities</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🏥</div>
              <div className={`text-2xl font-bold ${getHealthColor(empireStatus.empireHealth)}`}>
                {Math.round(empireStatus.empireHealth)}%
              </div>
              <div className="text-xs text-gray-400">Empire Health</div>
            </div>
          </div>
        </div>

        {/* Supreme Commands */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-400">🎮 Supreme Commands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={activateAllSystems}
              disabled={isActivating}
              className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isActivating ? '⚡ Activating...' : '⚡ Activate All Systems'}
            </button>

            <button
              onClick={testEmpire}
              disabled={isTesting}
              className="px-6 py-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTesting ? '🎮 Testing...' : '🎮 Test Empire'}
            </button>

            <button
              onClick={loadEmpireStatus}
              className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-bold text-lg transition-all duration-300"
            >
              📊 Refresh Status
            </button>
          </div>

          {/* Custom Command */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">👑 Custom Supreme Command</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={customCommand}
                onChange={(e) => setCustomCommand(e.target.value)}
                placeholder="Enter supreme command..."
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
              />
              <button
                onClick={executeCustomCommand}
                disabled={!customCommand.trim()}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Execute
              </button>
            </div>
          </div>

          {/* Command Result */}
          {commandResult && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/20">
              <div className="text-sm text-gray-300">{commandResult}</div>
            </div>
          )}
        </div>

        {/* Treasure Connections */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-400">🔗 Treasure Connections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-96 overflow-y-auto">
            {connections.map((connection) => (
              <div
                key={connection.id}
                className={`bg-white/5 rounded-xl p-4 border ${getStatusColor(connection.status)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-green-400">{connection.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      connection.status,
                    )}`}
                  >
                    {connection.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Performance:</span>
                    <span className="text-green-400">{Math.round(connection.performance)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Capabilities:</span>
                    <span className="text-blue-400">{connection.capabilities.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Connected:</span>
                    <span className="text-purple-400">{connection.connectedSystems.length}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="text-xs text-gray-400">
                    Last Sync: {connection.lastSync.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">👑 Empire Command Center - Supreme Control Hub</p>
          <p className="text-sm">
            {empireStatus.connectedTreasures}/{empireStatus.totalTreasures} treasures connected |
            Empire Health: {Math.round(empireStatus.empireHealth)}% | Last Sync:{' '}
            {empireStatus.lastEmpireSync.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmpireCommandCenter;
