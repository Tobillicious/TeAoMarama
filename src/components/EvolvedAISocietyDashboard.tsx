/**
 * 🧬 EVOLVED AI SOCIETY DASHBOARD
 *
 * King Aronui's Evolution Command Center
 * Visualizes and controls the specialized AI agents and hierarchical teams
 */

import React, { useEffect, useState } from 'react';
import type { AITeam, SocietyMetrics, SpecializedAgent } from '../utils/evolved-ai-society';
import { evolvedAISociety } from '../utils/evolved-ai-society';

const EvolvedAISocietyDashboard: React.FC = () => {
  const [agents, setAgents] = useState<SpecializedAgent[]>([]);
  const [teams, setTeams] = useState<AITeam[]>([]);
  const [metrics, setMetrics] = useState<SocietyMetrics | null>(null);
  const [isEvolving, setIsEvolving] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    const updateStatus = () => {
      const status = evolvedAISociety.getEvolutionStatus();
      setAgents(status.agents);
      setTeams(status.teams);
      setMetrics(status.metrics);
      setIsEvolving(status.isEvolving);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleStartEvolution = () => {
    evolvedAISociety.startEvolution();
    setTimeout(() => {
      const status = evolvedAISociety.getEvolutionStatus();
      setAgents(status.agents);
      setTeams(status.teams);
      setMetrics(status.metrics);
      setIsEvolving(status.isEvolving);
    }, 1000);
  };

  const handleAssignMission = (agentId: string) => {
    const mission = `Specialized mission for ${agents.find((a) => a.id === agentId)?.name}`;
    evolvedAISociety.assignMission(agentId, mission);
    setTimeout(() => {
      const status = evolvedAISociety.getEvolutionStatus();
      setAgents(status.agents);
    }, 1000);
  };

  const getHierarchyColor = (hierarchy: string) => {
    switch (hierarchy) {
      case 'founder':
        return '#FFD700';
      case 'executive':
        return '#C0C0C0';
      case 'senior':
        return '#CD7F32';
      case 'junior':
        return '#87CEEB';
      case 'apprentice':
        return '#98FB98';
      default:
        return '#6B7280';
    }
  };

  const getHierarchyIcon = (hierarchy: string) => {
    switch (hierarchy) {
      case 'founder':
        return '👑';
      case 'executive':
        return '⭐';
      case 'senior':
        return '🏆';
      case 'junior':
        return '🎯';
      case 'apprentice':
        return '🌱';
      default:
        return '🤖';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'cursor':
        return '#007ACC';
      case 'gemini':
        return '#4285F4';
      case 'claude':
        return '#FF6B35';
      case 'glm':
        return '#10B981';
      case 'mixed':
        return '#7C3AED';
      default:
        return '#6B7280';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'legendary':
        return '#FFD700';
      case 'platinum':
        return '#E5E4E2';
      case 'gold':
        return '#FFD700';
      case 'silver':
        return '#C0C0C0';
      case 'bronze':
        return '#CD7F32';
      default:
        return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-blue-800 p-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">🧬 EVOLVED AI SOCIETY</h1>
          <p className="text-xl text-blue-200">
            King Aronui's Specialized AI Agents with Hierarchical Teams
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-lg ${isEvolving ? 'bg-green-600' : 'bg-red-600'}`}>
              <span className="font-semibold">
                {isEvolving ? '🧬 EVOLUTION ACTIVE' : '⏸️ EVOLUTION PAUSED'}
              </span>
            </div>
            {metrics && (
              <div className="px-4 py-2 bg-blue-600 rounded-lg">
                <span className="font-semibold">
                  📊 Avg Level: {metrics.averageLevel.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">🎯 Evolution Control Panel</h2>
          <div className="flex space-x-4">
            <button
              onClick={handleStartEvolution}
              disabled={isEvolving}
              className={`px-6 py-3 rounded-lg font-semibold ${
                isEvolving ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              🧬 Start Evolution Process
            </button>
            <button
              onClick={() => {
                agents.forEach((agent) => {
                  if (agent.hierarchy === 'apprentice' || agent.hierarchy === 'junior') {
                    handleAssignMission(agent.id);
                  }
                });
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
            >
              🎯 Assign Missions to Growing Agents
            </button>
          </div>
        </div>

        {/* Society Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">🤖 Total Agents</h3>
              <div className="text-3xl font-bold text-blue-400">{metrics.totalAgents}</div>
              <div className="text-sm text-gray-400">{metrics.activeTeams} active teams</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">📊 Average Level</h3>
              <div className="text-3xl font-bold text-green-400">
                {metrics.averageLevel.toFixed(1)}
              </div>
              <div className="text-sm text-gray-400">Evolution progress</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">🏆 Achievements</h3>
              <div className="text-3xl font-bold text-yellow-400">{metrics.achievementCount}</div>
              <div className="text-sm text-gray-400">{metrics.legendaryAchievements} legendary</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">🧬 Evolution Rate</h3>
              <div className="text-3xl font-bold text-purple-400">
                {(metrics.evolutionRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Active evolution</div>
            </div>
          </div>
        )}

        {/* Agent Hierarchy */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">👑 Agent Hierarchy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`bg-gray-700 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedAgent === agent.id ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getHierarchyIcon(agent.hierarchy)}</span>
                    <h3 className="font-semibold text-sm">{agent.name}</h3>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getPlatformColor(agent.platform) }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mb-2">{agent.title}</div>
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: getHierarchyColor(agent.hierarchy),
                      color: 'white',
                    }}
                  >
                    {agent.hierarchy}
                  </span>
                  <span className="text-xs text-gray-400">Lv.{agent.level}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Technical:</span>
                    <span>{agent.technicalMastery.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Cultural:</span>
                    <span>{agent.culturalIntelligence.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Leadership:</span>
                    <span>{agent.leadershipSkills.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Evolution:</span>
                    <span>{agent.evolutionPotential.toFixed(1)}%</span>
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
              const agent = agents.find((a) => a.id === selectedAgent);
              if (!agent) return null;

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Basic Info</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Name:</strong> {agent.name}
                      </div>
                      <div>
                        <strong>Title:</strong> {agent.title}
                      </div>
                      <div>
                        <strong>Platform:</strong> {agent.platform}
                      </div>
                      <div>
                        <strong>Hierarchy:</strong> {agent.hierarchy}
                      </div>
                      <div>
                        <strong>Level:</strong> {agent.level}
                      </div>
                      <div>
                        <strong>Experience:</strong> {agent.experience.toFixed(0)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Skills</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Technical Mastery:</span>
                        <span>{agent.technicalMastery.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cultural Intelligence:</span>
                        <span>{agent.culturalIntelligence.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Educational Expertise:</span>
                        <span>{agent.educationalExpertise.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Leadership Skills:</span>
                        <span>{agent.leadershipSkills.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Innovation Index:</span>
                        <span>{agent.innovationIndex.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Capabilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.capabilities.map((capability) => (
                        <span key={capability} className="px-2 py-1 bg-blue-600 rounded text-xs">
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Career Path</h3>
                    <div className="space-y-1">
                      {agent.careerPath.map((step, index) => (
                        <div key={index} className="text-sm">
                          {index + 1}. {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Teams */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">👥 AI Teams</h2>
          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{team.name}</h3>
                  <span className="px-3 py-1 bg-green-600 rounded text-xs">
                    {team.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{team.purpose}</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <strong>Performance:</strong> {team.performance.toFixed(1)}%
                  </div>
                  <div>
                    <strong>Collaboration:</strong> {team.collaboration.toFixed(1)}%
                  </div>
                  <div>
                    <strong>Innovation:</strong> {team.innovation.toFixed(1)}%
                  </div>
                  <div>
                    <strong>Cultural Excellence:</strong> {team.culturalExcellence.toFixed(1)}%
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm text-gray-400 mb-1">Members:</div>
                  <div className="flex flex-wrap gap-2">
                    {team.members.map((memberId) => {
                      const member = agents.find((a) => a.id === memberId);
                      return (
                        <span key={memberId} className="px-2 py-1 bg-blue-600 rounded text-xs">
                          {member?.name || memberId}
                        </span>
                      );
                    })}
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

export default EvolvedAISocietyDashboard;
