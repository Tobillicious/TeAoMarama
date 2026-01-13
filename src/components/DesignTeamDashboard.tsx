/**
 * 🎨 DESIGN TEAM DASHBOARD
 *
 * King Aronui's Design Team Command Center
 * Visualizes and controls the specialized design agents and projects
 */

import React, { useEffect, useState } from 'react';
import type {
  DesignAgent,
  DesignProject,
  DesignTeamMetrics,
} from '../utils/design-team-coordinator';
import { designTeamCoordinator } from '../utils/design-team-coordinator';

const DesignTeamDashboard: React.FC = () => {
  const [agents, setAgents] = useState<DesignAgent[]>([]);
  const [projects, setProjects] = useState<DesignProject[]>([]);
  const [metrics, setMetrics] = useState<DesignTeamMetrics | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      const status = designTeamCoordinator.getDesignTeamStatus();
      setAgents(status.agents);
      setProjects(status.projects);
      setMetrics(status.metrics);
      setIsActive(status.isActive);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleActivateTeam = () => {
    designTeamCoordinator.activateDesignTeam();
    designTeamCoordinator.integrateWithEvolvedSociety();
    setTimeout(() => {
      const status = designTeamCoordinator.getDesignTeamStatus();
      setAgents(status.agents);
      setProjects(status.projects);
      setMetrics(status.metrics);
      setIsActive(status.isActive);
    }, 1000);
  };

  const getSpecializationColor = (specialization: string) => {
    switch (specialization) {
      case 'cultural':
        return '#10B981';
      case 'educational':
        return '#3B82F6';
      case 'accessibility':
        return '#F59E0B';
      case 'visual':
        return '#8B5CF6';
      case 'technical':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getSpecializationIcon = (specialization: string) => {
    switch (specialization) {
      case 'cultural':
        return '🌿';
      case 'educational':
        return '📚';
      case 'accessibility':
        return '♿';
      case 'visual':
        return '🎨';
      case 'technical':
        return '⚙️';
      default:
        return '🎯';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return '#6B7280';
      case 'designing':
        return '#F59E0B';
      case 'reviewing':
        return '#3B82F6';
      case 'implementing':
        return '#10B981';
      case 'completed':
        return '#059669';
      default:
        return '#6B7280';
    }
  };

  const getProjectPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return '#EF4444';
      case 'high':
        return '#F59E0B';
      case 'medium':
        return '#3B82F6';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-pink-800 p-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">🎨 DESIGN TEAM DASHBOARD</h1>
          <p className="text-xl text-pink-200">
            King Aronui's Dedicated Design Team for Treasure Integration
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-lg ${isActive ? 'bg-green-600' : 'bg-red-600'}`}>
              <span className="font-semibold">
                {isActive ? '🎨 TEAM ACTIVE' : '⏸️ TEAM INACTIVE'}
              </span>
            </div>
            {metrics && (
              <div className="px-4 py-2 bg-pink-600 rounded-lg">
                <span className="font-semibold">
                  📊 Projects: {metrics.activeProjects} active, {metrics.completedProjects}{' '}
                  completed
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">🎯 Design Team Control Panel</h2>
          <div className="flex space-x-4">
            <button
              onClick={handleActivateTeam}
              disabled={isActive}
              className={`px-6 py-3 rounded-lg font-semibold ${
                isActive ? 'bg-gray-600 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
              }`}
            >
              🎨 Activate Design Team
            </button>
            <button
              onClick={() => {
                designTeamCoordinator.integrateWithEvolvedSociety();
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
            >
              🔗 Integrate with AI Society
            </button>
          </div>
        </div>

        {/* Design Team Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">🎨 Design Agents</h3>
              <div className="text-3xl font-bold text-pink-400">{metrics.totalAgents}</div>
              <div className="text-sm text-gray-400">
                {metrics.innovationIndex.toFixed(1)}% innovation
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">📋 Active Projects</h3>
              <div className="text-3xl font-bold text-blue-400">{metrics.activeProjects}</div>
              <div className="text-sm text-gray-400">{metrics.completedProjects} completed</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">🌿 Cultural Excellence</h3>
              <div className="text-3xl font-bold text-green-400">
                {metrics.culturalExcellence.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">
                {metrics.averageDesignQuality.toFixed(1)}% design quality
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">♿ Accessibility</h3>
              <div className="text-3xl font-bold text-yellow-400">
                {metrics.accessibilityScore.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">{metrics.achievementCount} achievements</div>
            </div>
          </div>
        )}

        {/* Design Agents */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">🎨 Design Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getSpecializationIcon(agent.specialization)}</span>
                    <h3 className="font-semibold text-sm">{agent.name}</h3>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getSpecializationColor(agent.specialization) }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mb-2 capitalize">
                  {agent.specialization} Specialist • Level {agent.level}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Cultural:</span>
                    <span>{agent.culturalIntelligence.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Educational:</span>
                    <span>{agent.educationalImpact.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Accessibility:</span>
                    <span>{agent.accessibilityMastery.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Performance:</span>
                    <span>{agent.performance.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-400 mb-1">Expertise:</div>
                  <div className="flex flex-wrap gap-1">
                    {agent.expertise.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-blue-600 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {agent.expertise.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600 rounded text-xs">
                        +{agent.expertise.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design Projects */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">📋 Design Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span
                      className="px-3 py-1 rounded text-xs"
                      style={{ backgroundColor: getProjectStatusColor(project.status) }}
                    >
                      {project.status.toUpperCase()}
                    </span>
                    <span
                      className="px-3 py-1 rounded text-xs"
                      style={{ backgroundColor: getProjectPriorityColor(project.priority) }}
                    >
                      {project.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3">{project.description}</p>

                {/* Project Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-600 rounded p-2">
                    <div className="text-xs text-gray-400">Cultural Alignment</div>
                    <div className="text-lg font-bold text-green-400">
                      {project.culturalAlignment.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-gray-600 rounded p-2">
                    <div className="text-xs text-gray-400">Educational Value</div>
                    <div className="text-lg font-bold text-blue-400">
                      {project.educationalValue.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-gray-600 rounded p-2">
                    <div className="text-xs text-gray-400">Accessibility</div>
                    <div className="text-lg font-bold text-yellow-400">
                      {project.accessibilityScore.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-gray-600 rounded p-2">
                    <div className="text-xs text-gray-400">Design Quality</div>
                    <div className="text-lg font-bold text-purple-400">
                      {project.designQuality.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-2 mb-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Cultural Alignment</span>
                      <span>{project.culturalAlignment.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: `${project.culturalAlignment}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Design Quality</span>
                      <span>{project.designQuality.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-purple-400 h-2 rounded-full"
                        style={{ width: `${project.designQuality}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="mb-3">
                  <div className="text-sm text-gray-400 mb-1">Deliverables:</div>
                  <div className="flex flex-wrap gap-2">
                    {project.deliverables.map((deliverable) => (
                      <span key={deliverable} className="px-2 py-1 bg-purple-600 rounded text-xs">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Team */}
                <div>
                  <div className="text-sm text-gray-400 mb-1">Team:</div>
                  <div className="flex flex-wrap gap-2">
                    {project.team.map((memberId) => {
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

export default DesignTeamDashboard;
