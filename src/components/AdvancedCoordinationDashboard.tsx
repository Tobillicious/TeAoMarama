/**
 * 🤝 ADVANCED COORDINATION DASHBOARD
 *
 * Comprehensive dashboard for visualizing and managing advanced AI coordination
 * patterns, swarm intelligence, and collaborative behaviors.
 */

import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle,
  Crown,
  Heart,
  Layers,
  MessageSquare,
  Network,
  Pause,
  Play,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { coordinationPatterns } from '../utils/advanced-coordination-patterns';

interface CoordinationMetrics {
  activePatterns: number;
  totalEvents: number;
  successRate: number;
  swarmCount: number;
  averageEffectiveness: number;
  culturalAlignment: number;
}

interface PatternData {
  id: string;
  name: string;
  type: string;
  effectiveness: number;
  agents: string[];
  culturalAlignment: number;
}

const AdvancedCoordinationDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<CoordinationMetrics>({
    activePatterns: 0,
    totalEvents: 0,
    successRate: 0,
    swarmCount: 0,
    averageEffectiveness: 0,
    culturalAlignment: 0,
  });

  const [patterns, setPatterns] = useState<PatternData[]>([]);
  const [swarms, setSwarms] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedView, setSelectedView] = useState<
    'overview' | 'patterns' | 'swarms' | 'events' | 'metrics'
  >('overview');
  const [isCoordinating, setIsCoordinating] = useState(false);

  useEffect(() => {
    updateData();
    startMonitoring();
  }, []);

  const updateData = () => {
    // Get coordination metrics
    const coordinationMetrics = coordinationPatterns.getCoordinationMetrics();
    setMetrics(coordinationMetrics);

    // Get active patterns
    const activePatterns = coordinationPatterns.getActivePatterns();
    const patternData: PatternData[] = activePatterns.map((pattern) => ({
      id: pattern.id,
      name: pattern.name,
      type: pattern.type,
      effectiveness: pattern.effectiveness,
      agents: pattern.agents,
      culturalAlignment: pattern.culturalAlignment,
    }));
    setPatterns(patternData);

    // Get swarm intelligence
    const swarmData = coordinationPatterns.getSwarmIntelligence();
    setSwarms(swarmData);

    // Get coordination events
    const eventData = coordinationPatterns.getCoordinationEvents(20);
    setEvents(eventData);

    // Get coordination status
    const status = coordinationPatterns.getCoordinationStatus();
    setIsCoordinating(status.isActive);
  };

  const startMonitoring = () => {
    // Update data every 5 seconds
    const interval = setInterval(updateData, 5000);
    return () => clearInterval(interval);
  };

  const toggleCoordination = () => {
    if (isCoordinating) {
      coordinationPatterns.stopCoordination();
    } else {
      coordinationPatterns.startCoordination();
    }
    setIsCoordinating(!isCoordinating);
  };

  const getPatternIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      swarm: <Users className="w-4 h-4" />,
      hierarchical: <Crown className="w-4 h-4" />,
      mesh: <Network className="w-4 h-4" />,
      consensus: <MessageSquare className="w-4 h-4" />,
      adaptive: <Brain className="w-4 h-4" />,
      quantum: <Zap className="w-4 h-4" />,
    };
    return icons[type] || <Target className="w-4 h-4" />;
  };

  const getPatternColor = (type: string) => {
    const colors: { [key: string]: string } = {
      swarm: 'bg-blue-100 text-blue-600',
      hierarchical: 'bg-purple-100 text-purple-600',
      mesh: 'bg-green-100 text-green-600',
      consensus: 'bg-yellow-100 text-yellow-600',
      adaptive: 'bg-orange-100 text-orange-600',
      quantum: 'bg-pink-100 text-pink-600',
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'breakthrough':
        return 'text-blue-600 bg-blue-100';
      case 'partial':
        return 'text-yellow-600 bg-yellow-100';
      case 'failure':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">🤝 Advanced AI Coordination</h1>
              <p className="text-lg text-gray-600">
                Sophisticated coordination patterns for massive LLM society
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleCoordination}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  isCoordinating
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isCoordinating ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Coordination
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Coordination
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
                <p className="text-sm font-medium text-gray-600">Active Patterns</p>
                <p className="text-3xl font-bold text-blue-600">{metrics.activePatterns}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Network className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">Coordination active</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Swarm Intelligence</p>
                <p className="text-3xl font-bold text-purple-600">{metrics.swarmCount}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Activity className="w-4 h-4 text-purple-500 mr-2" />
              <span className="text-sm text-gray-600">Collective intelligence</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-green-600">
                  {metrics.successRate.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">Excellent coordination</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cultural Alignment</p>
                <p className="text-3xl font-bold text-pink-600">
                  {metrics.culturalAlignment.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-pink-100 rounded-full">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Shield className="w-4 h-4 text-pink-500 mr-2" />
              <span className="text-sm text-gray-600">Cultural safety</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'patterns', label: 'Patterns', icon: Layers },
              { id: 'swarms', label: 'Swarms', icon: Brain },
              { id: 'events', label: 'Events', icon: Activity },
              { id: 'metrics', label: 'Metrics', icon: TrendingUp },
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
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Coordination Overview</h3>

              {/* Pattern Types Distribution */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Active Pattern Types</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {['swarm', 'hierarchical', 'mesh', 'consensus', 'adaptive', 'quantum'].map(
                    (type) => {
                      const typePatterns = patterns.filter((p) => p.type === type);
                      const count = typePatterns.length;
                      return (
                        <div key={type} className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="flex items-center justify-center mb-2">
                            <span className={`p-2 rounded-full ${getPatternColor(type)}`}>
                              {getPatternIcon(type)}
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{count}</p>
                          <p className="text-sm text-gray-600 capitalize">{type}</p>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Recent Events */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Recent Coordination Events
                </h4>
                <div className="space-y-3">
                  {events.slice(0, 10).map((event, index) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{event.description}</p>
                          <p className="text-sm text-gray-600">
                            {event.participants.length} participants •{' '}
                            {event.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(
                            event.outcome,
                          )}`}
                        >
                          {event.outcome}
                        </span>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">
                            {event.culturalImpact.toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-600">Cultural Impact</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'patterns' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Coordination Patterns</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {patterns.map((pattern) => (
                  <div key={pattern.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className={`p-2 rounded-full ${getPatternColor(pattern.type)}`}>
                          {getPatternIcon(pattern.type)}
                        </span>
                        <h4 className="text-lg font-semibold text-gray-900">{pattern.name}</h4>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPatternColor(
                          pattern.type,
                        )}`}
                      >
                        {pattern.type}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Agents</span>
                        <span className="font-medium">{pattern.agents.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Effectiveness</span>
                        <span className="font-medium">{pattern.effectiveness.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cultural Alignment</span>
                        <span className="font-medium">{pattern.culturalAlignment.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${pattern.effectiveness}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'swarms' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Swarm Intelligence</h3>
              <div className="space-y-6">
                {swarms.map((swarm) => (
                  <div key={swarm.swarmId} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <Brain className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{swarm.objective}</h4>
                          <p className="text-sm text-gray-600">Swarm ID: {swarm.swarmId}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{swarm.agents.length} agents</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {swarm.collectiveIntelligence.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600">Collective Intelligence</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {swarm.performance.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600">Performance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-pink-600">
                          {swarm.culturalCoherence.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600">Cultural Coherence</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {swarm.adaptiveCapability.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600">Adaptive Capability</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Emergent Behaviors</h5>
                      <div className="flex flex-wrap gap-2">
                        {swarm.emergentBehavior.map((behavior: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {behavior.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'events' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Coordination Events</h3>
              <div className="space-y-3">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{event.description}</p>
                        <p className="text-sm text-gray-600">
                          {event.type} • {event.participants.length} participants •{' '}
                          {event.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(
                          event.outcome,
                        )}`}
                      >
                        {event.outcome}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          {event.culturalImpact.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600">Impact</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'metrics' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Coordination Metrics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Events</span>
                      <span className="font-medium">{metrics.totalEvents}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-medium text-green-600">
                        {metrics.successRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Average Effectiveness</span>
                      <span className="font-medium text-blue-600">
                        {metrics.averageEffectiveness.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Cultural Alignment</span>
                      <span className="font-medium text-pink-600">
                        {metrics.culturalAlignment.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Coordination Health</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Active Patterns</span>
                      <span className="font-medium text-blue-600">{metrics.activePatterns}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Swarm Count</span>
                      <span className="font-medium text-purple-600">{metrics.swarmCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Coordination Status</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isCoordinating ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {isCoordinating ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">System Health</span>
                      <span className="font-medium text-green-600">Optimal</span>
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

export default AdvancedCoordinationDashboard;
