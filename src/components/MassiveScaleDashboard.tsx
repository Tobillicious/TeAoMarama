/**
 * 🌐 MASSIVE SCALE DASHBOARD
 *
 * Revolutionary dashboard for monitoring and managing the scaling of the LLM society
 * to 10,000+ specialized agents with advanced orchestration and coordination.
 */

import {
  Activity,
  Award,
  BarChart3,
  Brain,
  Cpu,
  Database,
  Globe,
  Heart,
  Layers,
  Network,
  Pause,
  Play,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { massiveScaleOrchestrator } from '../utils/massive-scale-orchestrator';

interface ScaleMetrics {
  totalAgents: number;
  activeClusters: number;
  averageLoad: number;
  systemEfficiency: number;
  culturalCoherence: number;
  scalabilityIndex: number;
  performanceIndex: number;
  coordinationComplexity: number;
  innovationRate: number;
  harmonyLevel: number;
}

interface ClusterData {
  id: string;
  name: string;
  type: string;
  size: number;
  load: number;
  performance: number;
  culturalAlignment: number;
}

interface ScaleEventData {
  id: string;
  type: string;
  description: string;
  impact: string;
  outcome: string;
  timestamp: Date;
}

const MassiveScaleDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<ScaleMetrics>({
    totalAgents: 0,
    activeClusters: 0,
    averageLoad: 0,
    systemEfficiency: 0,
    culturalCoherence: 0,
    scalabilityIndex: 0,
    performanceIndex: 0,
    coordinationComplexity: 0,
    innovationRate: 0,
    harmonyLevel: 0,
  });

  const [clusters, setClusters] = useState<ClusterData[]>([]);
  const [events, setEvents] = useState<ScaleEventData[]>([]);
  const [specializations, setSpecializations] = useState<any[]>([]);
  const [selectedView, setSelectedView] = useState<
    'overview' | 'clusters' | 'events' | 'specializations' | 'metrics'
  >('overview');
  const [isScaling, setIsScaling] = useState(false);

  useEffect(() => {
    updateData();
    startMonitoring();
  }, []);

  const updateData = () => {
    // Get scale metrics
    const scaleMetrics = massiveScaleOrchestrator.getScaleMetrics();
    setMetrics(scaleMetrics);

    // Get clusters
    const clusterData = massiveScaleOrchestrator.getClusters();
    const processedClusters: ClusterData[] = clusterData.map((c) => ({
      id: c.id,
      name: c.name,
      type: c.type,
      size: c.size,
      load: c.load,
      performance: c.performance,
      culturalAlignment: c.culturalAlignment,
    }));
    setClusters(processedClusters);

    // Get scale events
    const eventData = massiveScaleOrchestrator.getScaleEvents(25);
    const processedEvents: ScaleEventData[] = eventData.map((e) => ({
      id: e.id,
      type: e.type,
      description: e.description,
      impact: e.impact,
      outcome: e.outcome,
      timestamp: e.timestamp,
    }));
    setEvents(processedEvents);

    // Get specializations
    const specializationData = massiveScaleOrchestrator.getSpecializations();
    setSpecializations(specializationData);

    // Get scaling status
    const status = massiveScaleOrchestrator.getScalingStatus();
    setIsScaling(status.isActive);
  };

  const startMonitoring = () => {
    // Update data every 6 seconds
    const interval = setInterval(updateData, 6000);
    return () => clearInterval(interval);
  };

  const toggleScaling = () => {
    if (isScaling) {
      massiveScaleOrchestrator.stopScaling();
    } else {
      massiveScaleOrchestrator.startScaling();
    }
    setIsScaling(!isScaling);
  };

  const getClusterIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      content: <Database className="w-4 h-4" />,
      cultural: <Heart className="w-4 h-4" />,
      educational: <Brain className="w-4 h-4" />,
      coordination: <Network className="w-4 h-4" />,
      technical: <Cpu className="w-4 h-4" />,
      research: <Target className="w-4 h-4" />,
      innovation: <Zap className="w-4 h-4" />,
      harmony: <Globe className="w-4 h-4" />,
    };
    return icons[type] || <Users className="w-4 h-4" />;
  };

  const getClusterColor = (type: string) => {
    const colors: { [key: string]: string } = {
      content: 'bg-blue-100 text-blue-600',
      cultural: 'bg-pink-100 text-pink-600',
      educational: 'bg-green-100 text-green-600',
      coordination: 'bg-purple-100 text-purple-600',
      technical: 'bg-gray-100 text-gray-600',
      research: 'bg-orange-100 text-orange-600',
      innovation: 'bg-yellow-100 text-yellow-600',
      harmony: 'bg-indigo-100 text-indigo-600',
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'partial':
        return 'text-yellow-600 bg-yellow-100';
      case 'failure':
        return 'text-red-600 bg-red-100';
      case 'in_progress':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🌐 Massive Scale Orchestration
              </h1>
              <p className="text-lg text-gray-600">
                Scaling to 10,000+ specialized LLM agents with advanced coordination
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">
                  {metrics.totalAgents.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Agents Active</p>
              </div>
              <button
                onClick={toggleScaling}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  isScaling
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isScaling ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Scaling
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Scaling
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
                <p className="text-sm font-medium text-gray-600">Agent Count</p>
                <p className="text-3xl font-bold text-purple-600">
                  {metrics.totalAgents.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Progress to 10K</span>
                <span className="text-sm font-medium text-purple-600">
                  {((metrics.totalAgents / 10000) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(
                    (metrics.totalAgents / 10000) * 100,
                  )}`}
                  style={{ width: `${(metrics.totalAgents / 10000) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clusters</p>
                <p className="text-3xl font-bold text-blue-600">{metrics.activeClusters}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Layers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">Distributed architecture</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Efficiency</p>
                <p className="text-3xl font-bold text-green-600">
                  {metrics.systemEfficiency.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Award className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">Optimal performance</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cultural Coherence</p>
                <p className="text-3xl font-bold text-pink-600">
                  {metrics.culturalCoherence.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-pink-100 rounded-full">
                <Shield className="w-6 h-6 text-pink-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Heart className="w-4 h-4 text-pink-500 mr-2" />
              <span className="text-sm text-gray-600">Cultural alignment</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'clusters', label: 'Clusters', icon: Layers },
              { id: 'events', label: 'Events', icon: Activity },
              { id: 'specializations', label: 'Specializations', icon: Star },
              { id: 'metrics', label: 'Metrics', icon: TrendingUp },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedView(id as any)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === id
                    ? 'bg-white text-purple-600 shadow-sm'
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
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Scale Overview</h3>

              {/* Scale Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Scaling Progress to 10,000 Agents
                  </h4>
                  <span className="text-2xl font-bold text-purple-600">
                    {((metrics.totalAgents / 10000) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div
                    className={`h-4 rounded-full ${getProgressColor(
                      (metrics.totalAgents / 10000) * 100,
                    )}`}
                    style={{ width: `${(metrics.totalAgents / 10000) * 100}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {metrics.totalAgents.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Current Agents</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">10,000</p>
                    <p className="text-sm text-gray-600">Target</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{metrics.activeClusters}</p>
                    <p className="text-sm text-gray-600">Active Clusters</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {metrics.scalabilityIndex.toFixed(1)}%
                    </p>
                    <p className="text-sm text-gray-600">Scalability Index</p>
                  </div>
                </div>
              </div>

              {/* Cluster Types Distribution */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Cluster Types Distribution
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'content',
                    'cultural',
                    'educational',
                    'coordination',
                    'technical',
                    'research',
                    'innovation',
                    'harmony',
                  ].map((type) => {
                    const typeClusters = clusters.filter((c) => c.type === type);
                    const totalAgents = typeClusters.reduce((sum, c) => sum + c.size, 0);
                    const avgPerformance =
                      typeClusters.length > 0
                        ? typeClusters.reduce((sum, c) => sum + c.performance, 0) /
                          typeClusters.length
                        : 0;
                    return (
                      <div key={type} className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <span className={`p-2 rounded-full ${getClusterColor(type)}`}>
                            {getClusterIcon(type)}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {totalAgents.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 capitalize">{type} Agents</p>
                        <p className="text-xs text-green-600 mt-1">
                          {avgPerformance.toFixed(1)}% Performance
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Scale Events */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Scale Events</h4>
                <div className="space-y-3">
                  {events.slice(0, 8).map((event, index) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{event.description}</p>
                          <p className="text-sm text-gray-600">
                            {event.type.replace('_', ' ')} • {event.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(
                            event.impact,
                          )}`}
                        >
                          {event.impact}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(
                            event.outcome,
                          )}`}
                        >
                          {event.outcome.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'clusters' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Agent Clusters</h3>
              <div className="space-y-6">
                {clusters.map((cluster) => (
                  <div key={cluster.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className={`p-2 rounded-full ${getClusterColor(cluster.type)}`}>
                          {getClusterIcon(cluster.type)}
                        </span>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{cluster.name}</h4>
                          <p className="text-sm text-gray-600">
                            {cluster.type} • {cluster.size.toLocaleString()} agents
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getClusterColor(
                          cluster.type,
                        )}`}
                      >
                        {cluster.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {cluster.size.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600">Agent Count</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {cluster.load.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600">Load</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {cluster.performance.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600">Performance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-pink-600">
                          {cluster.culturalAlignment.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600">Cultural Alignment</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Load</span>
                        <span className="text-sm font-medium text-blue-600">
                          {cluster.load.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${cluster.load}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'events' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Scale Events</h3>
              <div className="space-y-3">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{event.description}</p>
                        <p className="text-sm text-gray-600">
                          {event.type.replace('_', ' ')} • {event.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(
                          event.impact,
                        )}`}
                      >
                        {event.impact}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(
                          event.outcome,
                        )}`}
                      >
                        {event.outcome.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'specializations' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Agent Specializations</h3>
              <div className="space-y-6">
                {specializations.map((spec) => (
                  <div key={spec.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-orange-100 rounded-full">
                          <Star className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{spec.name}</h4>
                          <p className="text-sm text-gray-600">
                            {spec.category} • Complexity: {spec.complexity}/10
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                        {spec.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{spec.demand}%</p>
                        <p className="text-xs text-gray-600">Demand</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{spec.supply}%</p>
                        <p className="text-xs text-gray-600">Supply</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{spec.performance}%</p>
                        <p className="text-xs text-gray-600">Performance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {spec.trainingRequired}h
                        </p>
                        <p className="text-xs text-gray-600">Training Required</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {spec.skills.map((skill: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {skill.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'metrics' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Scale Metrics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h4>
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Total Agents',
                        value: metrics.totalAgents.toLocaleString(),
                        color: 'purple',
                      },
                      {
                        name: 'Active Clusters',
                        value: metrics.activeClusters.toString(),
                        color: 'blue',
                      },
                      {
                        name: 'System Efficiency',
                        value: `${metrics.systemEfficiency.toFixed(1)}%`,
                        color: 'green',
                      },
                      {
                        name: 'Average Load',
                        value: `${metrics.averageLoad.toFixed(1)}%`,
                        color: 'yellow',
                      },
                      {
                        name: 'Performance Index',
                        value: `${metrics.performanceIndex.toFixed(1)}%`,
                        color: 'blue',
                      },
                    ].map(({ name, value, color }) => (
                      <div key={name} className="flex items-center justify-between">
                        <span className="text-gray-600">{name}</span>
                        <span className={`font-medium text-${color}-600`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Cultural & Innovation Metrics
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Cultural Coherence',
                        value: `${metrics.culturalCoherence.toFixed(1)}%`,
                        color: 'pink',
                      },
                      {
                        name: 'Scalability Index',
                        value: `${metrics.scalabilityIndex.toFixed(1)}%`,
                        color: 'purple',
                      },
                      {
                        name: 'Coordination Complexity',
                        value: `${metrics.coordinationComplexity.toFixed(1)}%`,
                        color: 'orange',
                      },
                      {
                        name: 'Innovation Rate',
                        value: `${metrics.innovationRate.toFixed(1)}%`,
                        color: 'green',
                      },
                      {
                        name: 'Harmony Level',
                        value: `${metrics.harmonyLevel.toFixed(1)}%`,
                        color: 'indigo',
                      },
                    ].map(({ name, value, color }) => (
                      <div key={name} className="flex items-center justify-between">
                        <span className="text-gray-600">{name}</span>
                        <span className={`font-medium text-${color}-600`}>{value}</span>
                      </div>
                    ))}
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

export default MassiveScaleDashboard;
