/**
 * 👑 UNIFIED AGENT COORDINATION DASHBOARD
 * 
 * King Aronui's Command Center for All AI Agents
 * Visualizes and controls the unified coordination of Cursor, Gemini, Claude, and GLM agents
 */

import React, { useState, useEffect } from 'react';
import { unifiedAgentCoordination } from '../utils/unified-agent-coordination';
import { supremeOverseerCoordinator } from '../utils/supreme-overseer-coordinator';
import type { 
  UnifiedAgent, 
  CoordinationMission, 
  UnifiedProgress 
} from '../utils/unified-agent-coordination';

const UnifiedAgentCoordinationDashboard: React.FC = () => {
  const [agents, setAgents] = useState<UnifiedAgent[]>([]);
  const [missions, setMissions] = useState<CoordinationMission[]>([]);
  const [progress, setProgress] = useState<UnifiedProgress | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    const updateStatus = () => {
      const status = unifiedAgentCoordination.getCoordinationStatus();
      setAgents(status.agents);
      setMissions(status.missions);
      setProgress(status.progress);
      setIsActive(status.isActive);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleStartCoordination = () => {
    unifiedAgentCoordination.startUnifiedCoordination();
    setTimeout(() => {
      const status = unifiedAgentCoordination.getCoordinationStatus();
      setAgents(status.agents);
      setMissions(status.missions);
      setProgress(status.progress);
      setIsActive(status.isActive);
    }, 1000);
  };

  const handleMaximizeAcceleration = () => {
    unifiedAgentCoordination.maximizeAcceleration();
    setTimeout(() => {
      const status = unifiedAgentCoordination.getCoordinationStatus();
      setAgents(status.agents);
      setMissions(status.missions);
      setProgress(status.progress);
      setIsActive(status.isActive);
    }, 1000);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'cursor': return '#007ACC';
      case 'gemini': return '#4285F4';
      case 'claude': return '#FF6B35';
      case 'glm': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synchronized': return '#10B981';
      case 'active': return '#3B82F6';
      case 'coordinating': return '#F59E0B';
      case 'idle': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#DC2626';
      case 'high': return '#EA580C';
      case 'medium': return '#D97706';
      case 'low': return '#059669';
      default: return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-blue-800 p-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">👑 UNIFIED AGENT COORDINATION</h1>
          <p className="text-xl text-blue-200">
            King Aronui's Command Center - All AI Agents Working Together
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-lg ${isActive ? 'bg-green-600' : 'bg-red-600'}`}>
              <span className="font-semibold">
                {isActive ? '🟢 COORDINATION ACTIVE' : '🔴 COORDINATION INACTIVE'}
              </span>
            </div>
            {progress && (
              <div className="px-4 py-2 bg-blue-600 rounded-lg">
                <span className="font-semibold">
                  ⚡ Acceleration: {progress.accelerationFactor.toFixed(2)}x
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">🎯 Control Panel</h2>
          <div className="flex space-x-4">
            <button
              onClick={handleStartCoordination}
              disabled={isActive}
              className={`px-6 py-3 rounded-lg font-semibold ${
                isActive 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              🚀 Start Unified Coordination
            </button>
            <button
              onClick={handleMaximizeAcceleration}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
            >
              ⚡ Maximize Acceleration
            </button>
            <button
              onClick={() => {
                const missionId = `mission-${Date.now()}`;
                unifiedAgentCoordination.createCoordinationMission(missionId, {
                  name: 'Custom Coordination Mission',
                  description: 'User-initiated coordination mission',
                  priority: 'high'
                });
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
            >
              🎯 Create Mission
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        {progress && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">🤖 Total Agents</h3>
              <div className="text-3xl font-bold text-blue-400">{progress.totalAgents}</div>
              <div className="text-sm text-gray-400">
                {progress.activeAgents} active, {progress.synchronizedAgents} synchronized
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">🎯 Missions</h3>
              <div className="text-3xl font-bold text-green-400">{progress.totalMissions}</div>
              <div className="text-sm text-gray-400">
                {progress.activeMissions} active, {progress.completedMissions} completed
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">⚡ Coordination</h3>
              <div className="text-3xl font-bold text-purple-400">
                {progress.coordinationEfficiency.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">
                Efficiency rating
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">🚀 Acceleration</h3>
              <div className="text-3xl font-bold text-yellow-400">
                {progress.accelerationFactor.toFixed(2)}x
              </div>
              <div className="text-sm text-gray-400">
                Speed multiplier
              </div>
            </div>
          </div>
        )}

        {/* Agents Grid */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">🤖 Unified Agent Army</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`bg-gray-700 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedAgent === agent.id ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{agent.name}</h3>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getPlatformColor(agent.platform) }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mb-2">{agent.platform.toUpperCase()}</div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs px-2 py-1 rounded" style={{ 
                    backgroundColor: getStatusColor(agent.status),
                    color: 'white'
                  }}>
                    {agent.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Performance:</span>
                    <span>{agent.performance.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Coordination:</span>
                    <span>{agent.coordinationLevel.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Cultural:</span>
                    <span>{agent.culturalAlignment.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Agent Details */}
        {selectedAgent && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">🔍 Agent Details</h2>
            {(() => {
              const agent = agents.find(a => a.id === selectedAgent);
              if (!agent) return null;
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Basic Info</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {agent.name}</div>
                      <div><strong>Platform:</strong> {agent.platform}</div>
                      <div><strong>Status:</strong> {agent.status}</div>
                      <div><strong>Current Task:</strong> {agent.currentTask || 'None'}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Capabilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.capabilities.map((capability) => (
                        <span
                          key={capability}
                          className="px-2 py-1 bg-blue-600 rounded text-xs"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Collaborators</h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.collaborators.map((collaborator) => (
                        <span
                          key={collaborator}
                          className="px-2 py-1 bg-green-600 rounded text-xs"
                        >
                          {collaborator}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Dependencies</h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.dependencies.map((dependency) => (
                        <span
                          key={dependency}
                          className="px-2 py-1 bg-yellow-600 rounded text-xs"
                        >
                          {dependency}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Active Missions */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">🎯 Active Missions</h2>
          <div className="space-y-4">
            {missions.map((mission) => (
              <div key={mission.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{mission.name}</h3>
                  <span
                    className="px-3 py-1 rounded text-xs font-semibold"
                    style={{ 
                      backgroundColor: getPriorityColor(mission.priority),
                      color: 'white'
                    }}
                  >
                    {mission.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{mission.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <strong>Progress:</strong> {mission.progress.toFixed(1)}%
                  </div>
                  <div>
                    <strong>Cultural:</strong> {mission.culturalCompliance.toFixed(1)}%
                  </div>
                  <div>
                    <strong>Educational:</strong> {mission.educationalImpact.toFixed(1)}%
                  </div>
                  <div>
                    <strong>Technical:</strong> {mission.technicalExcellence.toFixed(1)}%
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${mission.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedAgentCoordinationDashboard;
