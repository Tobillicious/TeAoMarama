import React, { useEffect, useState } from 'react';
import {
  mcpCommunicationBridge,
  MCPMessage,
  ResourceShare,
  TreasureDiscovery,
} from '../utils/mcp-communication-bridge';

const MCPCommunicationDashboard: React.FC = () => {
  const [messages, setMessages] = useState<MCPMessage[]>([]);
  const [treasureDiscoveries, setTreasureDiscoveries] = useState<TreasureDiscovery[]>([]);
  const [resourceShares, setResourceShares] = useState<ResourceShare[]>([]);
  const [communicationStatus, setCommunicationStatus] = useState<any>(null);
  const [nodeConnections, setNodeConnections] = useState<Map<string, boolean>>(new Map());
  const [selectedMessage, setSelectedMessage] = useState<MCPMessage | null>(null);
  const [selectedTreasure, setSelectedTreasure] = useState<TreasureDiscovery | null>(null);

  useEffect(() => {
    const updateData = () => {
      setMessages(mcpCommunicationBridge.getRecentMessages(50));
      setTreasureDiscoveries(mcpCommunicationBridge.getTreasureDiscoveries());
      setResourceShares(mcpCommunicationBridge.getResourceShares());
      setCommunicationStatus(mcpCommunicationBridge.getCommunicationStatus());
      setNodeConnections(mcpCommunicationBridge.getNodeConnections());
    };

    updateData();
    const interval = setInterval(updateData, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSimulateTreasureDiscovery = (nodeId: string) => {
    mcpCommunicationBridge.simulateTreasureDiscovery(nodeId);
  };

  const handleSimulateResourceShare = (nodeId: string, targetNodes: string[]) => {
    mcpCommunicationBridge.simulateResourceShare(nodeId, targetNodes);
  };

  const handleSendTestMessage = () => {
    const testMessage = prompt('Enter test message:');
    if (testMessage) {
      mcpCommunicationBridge.sendMessage(
        'harmony-coordinator',
        ['cursor-1', 'cursor-2', 'cursor-3', 'cursor-4', 'cursor-5'],
        'coordination',
        { message: testMessage, test: true },
        'medium',
        true,
      );
    }
  };

  const handleSendEmergencyAlert = () => {
    const emergencyMessage = prompt('Enter emergency message:');
    if (emergencyMessage) {
      mcpCommunicationBridge.sendEmergencyAlert('harmony-coordinator', emergencyMessage);
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'treasure-discovery':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'resource-sharing':
        return 'bg-blue-500/20 text-blue-300';
      case 'coordination':
        return 'bg-purple-500/20 text-purple-300';
      case 'status-update':
        return 'bg-green-500/20 text-green-300';
      case 'emergency':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getConnectionStatus = (connected: boolean) => {
    return connected ? 'text-green-400' : 'text-red-400';
  };

  const getTreasureTypeIcon = (type: string) => {
    switch (type) {
      case 'component':
        return '🧩';
      case 'script':
        return '🤖';
      case 'resource':
        return '📚';
      case 'utility':
        return '🛠️';
      case 'documentation':
        return '📄';
      default:
        return '💎';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            📡 MCP Communication Dashboard
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Real-time communication bridge between all Cursor nodes
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>📡 Success Rate: {communicationStatus?.successRate || 0}%</span>
            <span>🤖 Connected Nodes: {communicationStatus?.connectedNodes || 0}/5</span>
            <span>💎 Treasures Discovered: {treasureDiscoveries.length}</span>
            <span>📤 Resources Shared: {resourceShares.length}</span>
          </div>
        </div>

        {/* Communication Status */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">📡 Communication Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📡</div>
              <div className="text-2xl font-bold text-indigo-400">
                {communicationStatus?.successRate || 0}%
              </div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-2xl font-bold text-green-400">
                {communicationStatus?.successfulDeliveries || 0}
              </div>
              <div className="text-xs text-gray-400">Successful</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">❌</div>
              <div className="text-2xl font-bold text-red-400">
                {communicationStatus?.failedDeliveries || 0}
              </div>
              <div className="text-xs text-gray-400">Failed</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-2xl font-bold text-blue-400">
                {Math.round(communicationStatus?.averageResponseTime || 0)}ms
              </div>
              <div className="text-xs text-gray-400">Avg Response</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🤖</div>
              <div className="text-2xl font-bold text-purple-400">
                {communicationStatus?.connectedNodes || 0}/5
              </div>
              <div className="text-xs text-gray-400">Connected</div>
            </div>
          </div>
        </div>

        {/* Node Connections */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-400">🤖 Node Connections</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Array.from(nodeConnections.entries()).map(([nodeId, connected]) => (
              <div key={nodeId} className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🤖</div>
                <div className={`text-lg font-bold ${getConnectionStatus(connected)}`}>
                  {connected ? '✅ Connected' : '❌ Offline'}
                </div>
                <div className="text-xs text-gray-400">{nodeId}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-400">🎮 Control Panel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">
                Simulate Treasure Discovery
              </h3>
              <div className="space-y-2">
                {['cursor-1', 'cursor-2', 'cursor-3', 'cursor-4', 'cursor-5'].map((nodeId) => (
                  <button
                    key={nodeId}
                    onClick={() => handleSimulateTreasureDiscovery(nodeId)}
                    className="w-full px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-sm transition-colors"
                  >
                    💎 {nodeId} discovers treasure
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Simulate Resource Share</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleSimulateResourceShare('cursor-1', ['cursor-2', 'cursor-3'])}
                  className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-sm transition-colors"
                >
                  📤 cursor-1 → cursor-2,3
                </button>
                <button
                  onClick={() => handleSimulateResourceShare('cursor-2', ['cursor-4', 'cursor-5'])}
                  className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-sm transition-colors"
                >
                  📤 cursor-2 → cursor-4,5
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-red-400">Emergency Controls</h3>
              <div className="space-y-2">
                <button
                  onClick={handleSendTestMessage}
                  className="w-full px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-sm transition-colors"
                >
                  📡 Send Test Message
                </button>
                <button
                  onClick={handleSendEmergencyAlert}
                  className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm transition-colors"
                >
                  🚨 Send Emergency Alert
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">💬 Recent Messages</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm text-gray-400">
                    <strong>{message.source}</strong> → {message.target.join(', ')}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getMessageTypeColor(
                        message.type,
                      )}`}
                    >
                      {message.type.replace('-', ' ')}
                    </div>
                    {message.requiresAck && (
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          message.ackReceived
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}
                      >
                        {message.ackReceived ? 'ACK' : 'PENDING'}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-gray-200 text-sm">
                  {typeof message.content === 'string'
                    ? message.content
                    : JSON.stringify(message.content, null, 2).substring(0, 100) + '...'}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(message.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treasure Discoveries */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">💎 Treasure Discoveries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {treasureDiscoveries
              .slice(-9)
              .reverse()
              .map((treasure) => (
                <div
                  key={treasure.id}
                  onClick={() => setSelectedTreasure(treasure)}
                  className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-2xl">{getTreasureTypeIcon(treasure.type)}</div>
                    {treasure.culturalElements && <div className="text-green-400 text-sm">🌿</div>}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-yellow-400">{treasure.name}</h3>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>
                      <strong>Type:</strong> {treasure.type}
                    </div>
                    <div>
                      <strong>Discovered by:</strong> {treasure.discoveredBy}
                    </div>
                    <div>
                      <strong>Quality:</strong> {treasure.quality}%
                    </div>
                    <div>
                      <strong>Educational Value:</strong> {treasure.educationalValue}%
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(treasure.discoveredAt).toLocaleString()}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Message Detail Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-blue-400">Message Details</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <strong>ID:</strong> {selectedMessage.id}
                </div>
                <div>
                  <strong>From:</strong> {selectedMessage.source}
                </div>
                <div>
                  <strong>To:</strong> {selectedMessage.target.join(', ')}
                </div>
                <div>
                  <strong>Type:</strong> {selectedMessage.type}
                </div>
                <div>
                  <strong>Priority:</strong> {selectedMessage.priority}
                </div>
                <div>
                  <strong>Requires ACK:</strong> {selectedMessage.requiresAck ? 'Yes' : 'No'}
                </div>
                <div>
                  <strong>ACK Received:</strong> {selectedMessage.ackReceived ? 'Yes' : 'No'}
                </div>
                <div>
                  <strong>Timestamp:</strong> {new Date(selectedMessage.timestamp).toLocaleString()}
                </div>
                <div>
                  <strong>Content:</strong>
                  <pre className="bg-white/5 rounded p-4 mt-2 text-sm overflow-x-auto">
                    {JSON.stringify(selectedMessage.content, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Treasure Detail Modal */}
        {selectedTreasure && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-yellow-400">Treasure Details</h2>
                <button
                  onClick={() => setSelectedTreasure(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <strong>Name:</strong> {selectedTreasure.name}
                </div>
                <div>
                  <strong>Type:</strong> {selectedTreasure.type}
                </div>
                <div>
                  <strong>Path:</strong> {selectedTreasure.path}
                </div>
                <div>
                  <strong>Description:</strong> {selectedTreasure.description}
                </div>
                <div>
                  <strong>Discovered by:</strong> {selectedTreasure.discoveredBy}
                </div>
                <div>
                  <strong>Quality:</strong> {selectedTreasure.quality}%
                </div>
                <div>
                  <strong>Educational Value:</strong> {selectedTreasure.educationalValue}%
                </div>
                <div>
                  <strong>Cultural Elements:</strong>{' '}
                  {selectedTreasure.culturalElements ? 'Yes' : 'No'}
                </div>
                <div>
                  <strong>Tags:</strong> {selectedTreasure.tags.join(', ')}
                </div>
                <div>
                  <strong>Discovered at:</strong>{' '}
                  {new Date(selectedTreasure.discoveredAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">
            📡 MCP Communication Bridge - Facilitating harmony across all Cursor nodes
          </p>
          <p className="text-sm">
            Last updated:{' '}
            {communicationStatus?.lastCommunication
              ? new Date(communicationStatus.lastCommunication).toLocaleString()
              : 'Never'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MCPCommunicationDashboard;
