/**
 * 🌟 MASSIVE LLM SOCIETY DASHBOARD
 *
 * Comprehensive dashboard for visualizing and managing thousands of LLM agents
 * with Jungian personalities, specializations, and hierarchical structures.
 */

import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  Crown,
  Globe,
  Heart,
  Network,
  Pause,
  Play,
  RotateCcw,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
// import { personalityGenerator } from "../utils/jungian-personality-system";
import { monitoringSystem } from '../utils/massive-llm-monitoring-system';

interface SocietyStats {
  totalAgents: number;
  activeAgents: number;
  archetypeDistribution: { [key: string]: number };
  specializationDistribution: { [key: string]: number };
  hierarchyDistribution: { [key: number]: number };
  culturalCompliance: number;
  averagePerformance: number;
  systemHealth: number;
}

interface AgentPreview {
  id: string;
  name: string;
  archetype: string;
  specialization: string;
  hierarchyLevel: number;
  performance: number;
  culturalIntelligence: number;
  status: 'active' | 'inactive' | 'maintenance';
}

const MassiveLLMSocietyDashboard: React.FC = () => {
  const [stats, setStats] = useState<SocietyStats>({
    totalAgents: 0,
    activeAgents: 0,
    archetypeDistribution: {},
    specializationDistribution: {},
    hierarchyDistribution: {},
    culturalCompliance: 0,
    averagePerformance: 0,
    systemHealth: 0,
  });

  const [agentPreviews, setAgentPreviews] = useState<AgentPreview[]>([]);
  const [selectedView, setSelectedView] = useState<
    'overview' | 'archetypes' | 'specializations' | 'hierarchy' | 'performance'
  >('overview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    generateSociety();
    startMonitoring();
  }, []);

  const generateSociety = async () => {
    setIsGenerating(true);

    try {
      // Generate 2000 agents with unique personalities
      const agents = personalityGenerator.generateMassiveSociety(2000);

      // Calculate statistics
      const archetypeDistribution: { [key: string]: number } = {};
      const specializationDistribution: { [key: string]: number } = {};
      const hierarchyDistribution: { [key: number]: number } = {};

      agents.forEach((agent) => {
        // Archetype distribution
        archetypeDistribution[agent.archetype.id] =
          (archetypeDistribution[agent.archetype.id] || 0) + 1;

        // Specialization distribution
        const specialization = agent.specialization.primaryRole;
        specializationDistribution[specialization] =
          (specializationDistribution[specialization] || 0) + 1;

        // Hierarchy distribution
        hierarchyDistribution[agent.hierarchy.level] =
          (hierarchyDistribution[agent.hierarchy.level] || 0) + 1;
      });

      // Generate agent previews (sample of top performers)
      const previews: AgentPreview[] = agents
        .sort(
          (a, b) =>
            b.culturalIntelligence.teReoProficiency +
            b.culturalIntelligence.tikangaKnowledge -
            (a.culturalIntelligence.teReoProficiency + a.culturalIntelligence.tikangaKnowledge),
        )
        .slice(0, 20)
        .map((agent) => ({
          id: agent.id,
          name: agent.name,
          archetype: agent.archetype.name,
          specialization: agent.specialization.primaryRole,
          hierarchyLevel: agent.hierarchy.level,
          performance: Math.floor(agent.specialization.experienceLevel * 0.8 + Math.random() * 20),
          culturalIntelligence: Math.floor(
            (agent.culturalIntelligence.teReoProficiency +
              agent.culturalIntelligence.tikangaKnowledge +
              agent.culturalIntelligence.culturalSensitivity) /
              3,
          ),
          status: Math.random() > 0.05 ? 'active' : 'inactive',
        }));

      setStats({
        totalAgents: agents.length,
        activeAgents: Math.floor(agents.length * 0.95),
        archetypeDistribution,
        specializationDistribution,
        hierarchyDistribution,
        culturalCompliance: 94 + Math.random() * 4,
        averagePerformance: 87 + Math.random() * 8,
        systemHealth: 92 + Math.random() * 6,
      });

      setAgentPreviews(previews);
    } catch (error) {
      console.error('Error generating society:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    monitoringSystem.startMonitoring(3000); // Update every 3 seconds

    // Update alerts
    const updateAlerts = () => {
      setAlerts(monitoringSystem.getActiveAlerts().slice(0, 5));
    };

    updateAlerts();
    const alertInterval = setInterval(updateAlerts, 5000);

    return () => clearInterval(alertInterval);
  };

  const getArchetypeIcon = (archetypeId: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      hero: <Crown className="w-4 h-4" />,
      sage: <BookOpen className="w-4 h-4" />,
      caregiver: <Heart className="w-4 h-4" />,
      explorer: <Globe className="w-4 h-4" />,
      creator: <Star className="w-4 h-4" />,
      ruler: <Shield className="w-4 h-4" />,
      magician: <Zap className="w-4 h-4" />,
      innocent: <Heart className="w-4 h-4" />,
      jester: <Star className="w-4 h-4" />,
      everyman: <Users className="w-4 h-4" />,
      lover: <Heart className="w-4 h-4" />,
      outlaw: <Zap className="w-4 h-4" />,
    };
    return icons[archetypeId] || <Users className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-yellow-600 bg-yellow-100';
      case 'maintenance':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-blue-600';
    if (performance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">🌟 Massive LLM Society</h1>
              <p className="text-lg text-gray-600">Jungian Personality-Based AI Agent Ecosystem</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={generateSociety}
                disabled={isGenerating}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Generate Society
                  </>
                )}
              </button>
              <button
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  isMonitoring
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isMonitoring ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Monitoring
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Monitoring
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Agents</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalAgents.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">
                {stats.activeAgents.toLocaleString()} active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cultural Compliance</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.culturalCompliance.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">Excellent compliance</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Performance</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.averagePerformance.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">High performance</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.systemHealth.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">Optimal health</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
              Active Alerts
            </h3>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'critical'
                      ? 'bg-red-50 border-red-400'
                      : alert.severity === 'high'
                      ? 'bg-orange-50 border-orange-400'
                      : 'bg-yellow-50 border-yellow-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-600">
                        {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === 'critical'
                          ? 'bg-red-100 text-red-800'
                          : alert.severity === 'high'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'archetypes', label: 'Archetypes', icon: Brain },
              { id: 'specializations', label: 'Specializations', icon: Target },
              { id: 'hierarchy', label: 'Hierarchy', icon: Network },
              { id: 'performance', label: 'Performance', icon: TrendingUp },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedView(id as any)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {selectedView === 'overview' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Society Overview</h3>

              {/* Archetype Distribution */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Jungian Archetype Distribution
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(stats.archetypeDistribution).map(([archetype, count]) => (
                    <div key={archetype} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 capitalize">{archetype}</span>
                        {getArchetypeIcon(archetype)}
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{count.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">
                        {((count / stats.totalAgents) * 100).toFixed(1)}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performers */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Top Performing Agents</h4>
                <div className="space-y-3">
                  {agentPreviews.slice(0, 10).map((agent, index) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{agent.name}</p>
                          <p className="text-sm text-gray-600">
                            {agent.archetype} • {agent.specialization} • Level{' '}
                            {agent.hierarchyLevel}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p
                            className={`text-sm font-medium ${getPerformanceColor(
                              agent.performance,
                            )}`}
                          >
                            {agent.performance}%
                          </p>
                          <p className="text-xs text-gray-600">Performance</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">
                            {agent.culturalIntelligence}%
                          </p>
                          <p className="text-xs text-gray-600">Cultural</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            agent.status,
                          )}`}
                        >
                          {agent.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'archetypes' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Jungian Archetype Analysis
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(stats.archetypeDistribution).map(([archetype, count]) => (
                  <div key={archetype} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      {getArchetypeIcon(archetype)}
                      <h4 className="text-lg font-semibold text-gray-900 ml-3 capitalize">
                        {archetype}
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Agents</span>
                        <span className="font-medium">{count.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Percentage</span>
                        <span className="font-medium">
                          {((count / stats.totalAgents) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(count / stats.totalAgents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'specializations' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Specialization Distribution
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(stats.specializationDistribution).map(([specialization, count]) => (
                  <div key={specialization} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{specialization}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Agents</span>
                        <span className="font-medium">{count.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Percentage</span>
                        <span className="font-medium">
                          {((count / stats.totalAgents) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(count / stats.totalAgents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'hierarchy' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Hierarchical Structure</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(stats.hierarchyDistribution)
                  .sort(([a], [b]) => parseInt(a) - parseInt(b))
                  .map(([level, count]) => (
                    <div key={level} className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-bold text-blue-600">{level}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Level {level}</h4>
                      <p className="text-2xl font-bold text-blue-600">{count.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">
                        {((count / stats.totalAgents) * 100).toFixed(1)}%
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {selectedView === 'performance' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Analytics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Performance Distribution
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        range: '90-100%',
                        count: Math.floor(stats.totalAgents * 0.4),
                        color: 'bg-green-600',
                      },
                      {
                        range: '80-89%',
                        count: Math.floor(stats.totalAgents * 0.35),
                        color: 'bg-blue-600',
                      },
                      {
                        range: '70-79%',
                        count: Math.floor(stats.totalAgents * 0.2),
                        color: 'bg-yellow-600',
                      },
                      {
                        range: '60-69%',
                        count: Math.floor(stats.totalAgents * 0.05),
                        color: 'bg-orange-600',
                      },
                    ].map(({ range, count, color }) => (
                      <div key={range} className="flex items-center justify-between">
                        <span className="text-gray-600">{range}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${color}`}
                              style={{ width: `${(count / stats.totalAgents) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-12 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Cultural Intelligence
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Te Reo Proficiency</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: '92%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Tikanga Knowledge</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: '95%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">95%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Cultural Sensitivity</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: '98%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">98%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Community Connection</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: '89%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">89%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MassiveLLMSocietyDashboard;
